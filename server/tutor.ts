import { z } from 'zod';
import { AI_CHAT_URL } from './aiProvider.js';
import { TUTOR_SYSTEM_PROMPT } from './tutorSystemPrompt.js';
import { WORLD_METAS } from '../src/content/worldMeta.js';

export const TUTOR_DEFAULT_MODEL = 'deepseek-v4.1-flash';
export const TUTOR_MAX_BYTES = 24_000;

const messageSchema = z.object({ role: z.enum(['user', 'assistant']), content: z.string().trim().min(1).max(1200) }).strict();
const requestSchema = z.object({
  lessonId: z.string().max(16),
  card: z.string().max(2400),
  messages: z.array(messageSchema).min(1).max(16),
}).strict();

const lessons = new Map(WORLD_METAS.flatMap(world => [...world.lessons, ...world.sideQuests])
  .filter(lesson => lesson.modes.includes('pro'))
  .map(lesson => [lesson.id, lesson] as const));

export interface TutorConfig {
  apiKey?: string;
  model?: string;
}

function json(status: number, value: object) {
  return new Response(JSON.stringify(value), {
    status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

/** Pro-only study chat. The key stays here; the browser sends only the lesson id, the visible card text and the chat. */
export function createTutorService(getConfig: () => TutorConfig, send: typeof fetch = fetch, now = () => Date.now()) {
  // shortcut: limits are per warm instance, not global; move to a shared store (e.g. Vercel KV) if abuse shows up.
  const perClient = new Map<string, number[]>();
  let recent: number[] = [];
  let inFlight = 0;
  let retryGatewayAt = 0;
  // First questions repeat (the three starter buttons on the same card), so their answers are reused.
  const firstTurn = new Map<string, string>();

  return async (request: Request, clientId = 'unknown'): Promise<Response> => {
    if (request.method !== 'POST') return json(405, { error: 'method' });
    const origin = request.headers.get('origin');
    if ((origin && origin !== new URL(request.url).origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
      return json(403, { error: 'origin' });
    }
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) return json(415, { error: 'format' });
    const text = await request.text();
    if (text.length > TUTOR_MAX_BYTES) return json(413, { error: 'size' });
    let body: unknown;
    try { body = JSON.parse(text); } catch { return json(400, { error: 'context' }); }
    const parsed = requestSchema.safeParse(body);
    const lesson = parsed.success ? lessons.get(parsed.data.lessonId) : undefined;
    if (!parsed.success || !lesson || parsed.data.messages.at(-1)?.role !== 'user') return json(400, { error: 'context' });

    const { apiKey, model } = getConfig();
    if (!apiKey) {
      console.warn('tutor.configuration_missing');
      return json(503, { error: 'unavailable' });
    }
    const firstKey = parsed.data.messages.length === 1 ? [lesson.id, parsed.data.card, parsed.data.messages[0].content].join('\n') : '';
    const reused = firstKey && firstTurn.get(firstKey);
    if (reused) return json(200, { reply: reused });

    const t = now();
    if (t < retryGatewayAt) return json(503, { error: 'unavailable' });
    recent = recent.filter(at => t - at < 60_000);
    const mine = (perClient.get(clientId) ?? []).filter(at => t - at < 3_600_000);
    const lastMinute = mine.filter(at => t - at < 60_000).length;
    // Per learner: 12 a minute, 60 an hour. Per instance: 60 a minute, 6 at once. The WAF rule caps each IP across instances.
    if (lastMinute >= 12 || mine.length >= 60 || recent.length >= 60 || inFlight >= 6) return json(429, { error: 'busy' });
    mine.push(t);
    perClient.set(clientId, mine);
    recent.push(t);
    if (perClient.size > 500) perClient.clear();

    const context = `Pelajaran: ${lesson.title}\nIsi kartu yang sedang dibaca:\n"""\n${parsed.data.card}\n"""`;
    inFlight++;
    try {
      const response = await send(AI_CHAT_URL, {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(25_000),
        headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model?.trim() || TUTOR_DEFAULT_MODEL,
          reasoning_effort: 'none',
          // A tutor turn is about 150 words; 700 leaves room without paying for runaway output.
          max_tokens: 700,
          messages: [
            { role: 'system', content: TUTOR_SYSTEM_PROMPT + '\n\n' + context },
            ...parsed.data.messages.slice(-6),
          ],
        }),
      });
      if (!response.ok) {
        const challenged = response.headers.get('cf-mitigated') === 'challenge';
        console.warn('tutor.provider_http', response.status, challenged ? 'challenge' : 'response');
        if (challenged) retryGatewayAt = t + 120_000;
        return json(response.status === 429 ? 429 : 503, { error: response.status === 429 ? 'busy' : 'unavailable' });
      }
      const result = await response.json();
      const reply = result?.choices?.[0]?.message?.content;
      if (typeof reply !== 'string' || !reply.trim()) {
        console.warn('tutor.provider_unusable_response');
        return json(503, { error: 'unavailable' });
      }
      const answer = reply.trim().slice(0, 4000);
      if (firstKey) {
        if (firstTurn.size >= 300) firstTurn.delete(firstTurn.keys().next().value!);
        firstTurn.set(firstKey, answer);
      }
      return json(200, { reply: answer });
    } catch (error) {
      console.warn('tutor.provider_fetch', error instanceof Error ? error.name : 'failed');
      return json(503, { error: 'unavailable' });
    } finally {
      inFlight--;
    }
  };
}
