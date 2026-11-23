import { z } from 'zod';
import { PET_SYSTEM_PROMPT } from './petSystemPrompt.js';
import { PET_HINT_CUES, PET_AI_STEP_KINDS, PET_PERSONALITIES, type PetAiTipId, type PetHintRequest } from '../src/content/petContract.js';
import { WORLD_METAS } from '../src/content/worldMeta.js';

const requestSchema = z.object({
  worldId: z.string().max(4), topicId: z.string().max(16),
  cue: z.enum(PET_HINT_CUES).optional(),
  intent: z.literal('study_hint'), personality: z.enum(PET_PERSONALITIES), stepKind: z.enum(PET_AI_STEP_KINDS),
}).strict();

const lessons = new Map(WORLD_METAS.flatMap(world => [...world.lessons, ...world.sideQuests]
  .filter(lesson => lesson.modes.includes('pro'))
  .map(lesson => [lesson.id, lesson] as const)));

export interface CompanionConfig {
  apiKey?: string;
  models?: string;
}

function readTip(answer: unknown): PetAiTipId | null {
  if (typeof answer !== 'string') return null;
  const match = answer.trim().match(/^(recall|compare|predict)[.!]?$/i);
  return match ? match[1].toLowerCase() as PetAiTipId : null;
}

async function selectTip(input: PetHintRequest, key: string, models: string[], send: typeof fetch): Promise<PetAiTipId | null> {
  const lesson = lessons.get(input.topicId)!;
  for (const model of models) {
    try {
      const response = await send('https://tokenportal.id/v1/chat/completions', {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(5200),
        headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model, messages: [
            { role: 'system', content: PET_SYSTEM_PROMPT },
            { role: 'user', content: JSON.stringify({ pelajaran: lesson.title, kartu: input.stepKind, gaya: input.personality, isyarat: input.cue ?? 'requested' }) },
          ], max_tokens: 64,
        }),
      });
      if (response.status === 401 || response.status === 403) return null;
      if (!response.ok) continue;
      const json = await response.json();
      const tip = readTip(json?.choices?.[0]?.message?.content);
      if (tip) return tip;
    } catch {
      // A model can be offline even when the next model is available.
    }
  }
  return null;
}

function json(status: number, value: object) {
  return new Response(JSON.stringify(value), {
    status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

/** Bounded editorial selector. A warm process shares decisions for identical lesson contexts. */
export function createCompanionService(getConfig: () => CompanionConfig, send: typeof fetch = fetch) {
  const choices = new Map<string, PetAiTipId>();
  const inFlight = new Map<string, Promise<PetAiTipId | null>>();
  let windowStart = 0;
  let calls = 0;
  return async (request: Request): Promise<Response> => {
    if (request.method !== 'POST') return json(405, { error: 'method' });
    const origin = request.headers.get('origin');
    if ((origin && origin !== new URL(request.url).origin) || request.headers.get('sec-fetch-site') === 'cross-site') {
      return json(403, { error: 'origin' });
    }
    if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') ?? '')) return json(415, { error: 'format' });
    const text = await request.text();
    if (text.length > 512) return json(413, { error: 'size' });
    let body: unknown;
    try { body = JSON.parse(text); } catch { return json(400, { error: 'context' }); }
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success || lessons.get(parsed.data.topicId)?.worldId !== parsed.data.worldId) return json(400, { error: 'context' });
    const input = parsed.data;
    const context = [input.topicId, input.stepKind, input.personality, input.cue ?? 'requested'].join('/');
    const cached = choices.get(context);
    if (cached) return json(200, { tipId: cached });
    const { apiKey, models } = getConfig();
    const chain = [...new Set((models ?? '').split(',').map(id => id.trim()).filter(id => /^[a-z\d][a-z\d./_-]{0,79}$/i.test(id)))].slice(0, 4);
    if (!apiKey || !chain.length) return json(503, { error: 'unavailable' });
    let pending = inFlight.get(context);
    if (!pending) {
      if (Date.now() - windowStart >= 60000) { windowStart = Date.now(); calls = 0; }
      if (calls >= 12 || inFlight.size >= 3) return json(429, { error: 'busy' });
      calls++;
      pending = selectTip(input, apiKey, chain, send).then(tip => {
        if (tip) choices.set(context, tip);
        return tip;
      }).finally(() => inFlight.delete(context));
      inFlight.set(context, pending);
    }
    const tip = await pending;
    return tip ? json(200, { tipId: tip }) : json(503, { error: 'unavailable' });
  };
}
