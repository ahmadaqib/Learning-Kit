import { z } from 'zod';
import { TUTOR_SYSTEM_PROMPT } from './tutorSystemPrompt.js';
import { WORLD_METAS } from '../src/content/worldMeta.js';

export const TUTOR_DEFAULT_MODEL = 'deepseek-v4.1-flash-fast';
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
    const t = now();
    if (t < retryGatewayAt) return json(503, { error: 'unavailable' });
    recent = recent.filter(at => t - at < 60_000);
    const mine = (perClient.get(clientId) ?? []).filter(at => t - at < 60_000);
    if (mine.length >= 8 || recent.length >= 40 || inFlight >= 4) return json(429, { error: 'busy' });
    mine.push(t);
    perClient.set(clientId, mine);
    recent.push(t);
    if (perClient.size > 500) perClient.clear();

    const context = `Pelajaran: ${lesson.title}\nIsi kartu yang sedang dibaca:\n"""\n${parsed.data.card}\n"""`;
    inFlight++;
    try {
      const response = await send('https://tokenportal.id/v1/chat/completions', {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(25_000),
        headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: model?.trim() || TUTOR_DEFAULT_MODEL,
          reasoning_effort: 'none',
          max_tokens: 1500,
          messages: [
            { role: 'system', content: TUTOR_SYSTEM_PROMPT + '\n\n' + context },
            ...parsed.data.messages.slice(-10),
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
      return json(200, { reply: reply.trim().slice(0, 4000) });
    } catch (error) {
      console.warn('tutor.provider_fetch', error instanceof Error ? error.name : 'failed');
      return json(503, { error: 'unavailable' });
    } finally {
      inFlight--;
    }
  };
}
