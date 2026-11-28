// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { createCompanionService } from '../server/companion';
import { petHintQuery } from '../src/content/petContract';

import { preparedPetStrategies } from '../server/preparedPetStrategies';
import { WORLD_METAS } from '../src/content/worldMeta';
import { PET_AI_STEP_KINDS, PET_AI_TIP_IDS } from '../src/content/petContract';

const config = () => ({ apiKey: 'fixture', models: 'test-primary, test-fallback' });
const context = { worldId: 'a04', topicId: 'a04-sq1', intent: 'study_hint', stepKind: 'concept', personality: 'sinis', cue: 'stuck' };
const request = (payload: unknown, origin = 'https://learn.example') => new Request('https://learn.example/api/companion', {
  method: 'POST', headers: { 'content-type': 'application/json', origin }, body: JSON.stringify(payload),
});
const answer = (content: string) => Response.json({ choices: [{ message: { content } }] });

describe('server-side pet hints', () => {
  it('uses configured order, rejects off-menu prose and coalesces requests for the same context', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValueOnce(answer('Ini jawaban soal.')).mockResolvedValueOnce(answer('compare'));
    const serve = createCompanionService(config, send);
    const [one, two] = await Promise.all([serve(request(context)), serve(request(context))]);
    expect(await one.json()).toEqual({ tipId: 'compare', source: 'live' });
    expect(await two.json()).toEqual({ tipId: 'compare', source: 'live' });
    expect(await (await serve(request(context))).json()).toEqual({ tipId: 'compare', source: 'live' });
    expect(send.mock.calls.map(([, args]) => JSON.parse(String(args?.body)).model)).toEqual(['test-primary', 'test-fallback']);
    expect(send.mock.calls[0][1]?.body).not.toContain('fixture');
  });
  it('answers GET from the query with CDN cache headers: long for live picks, short for prepared, none for errors', async () => {
    const get = (query: Record<string, string>, site = 'same-origin') => new Request('https://learn.example/api/companion?' + petHintQuery(query) + ('extra' in query ? '&extra=' + query.extra : ''), {
      headers: { 'sec-fetch-site': site },
    });
    const serve = createCompanionService(config, vi.fn<typeof fetch>().mockResolvedValue(answer('predict')));
    const live = await serve(get(context));
    expect(await live.json()).toEqual({ tipId: 'predict', source: 'live' });
    expect(live.headers.get('cache-control')).toContain('s-maxage=2592000');
    const prepared = await createCompanionService(() => ({}), vi.fn<typeof fetch>())(get(context));
    expect((await prepared.json()).source).toBe('prepared');
    expect(prepared.headers.get('cache-control')).toContain('s-maxage=600');
    // The same context in another parameter order would be a new cache entry, so it is refused.
    const reordered = new Request('https://learn.example/api/companion?topicId=a04-sq1&worldId=a04&stepKind=concept&personality=sinis&intent=study_hint&cue=stuck', { headers: { 'sec-fetch-site': 'same-origin' } });
    expect((await serve(reordered)).status).toBe(400);
    for (const bad of [await serve(get({ ...context, extra: 'x' })), await serve(get(context, 'cross-site'))]) {
      expect(bad.headers.get('cache-control')).toBe('no-store');
    }
  });
  it('covers every Pro lesson and card kind with an allowed prepared strategy', () => {
    const ids = WORLD_METAS.flatMap(world => [...world.lessons, ...world.sideQuests]).filter(l => l.modes.includes('pro')).map(l => l.id);
    expect(Object.keys(preparedPetStrategies).sort()).toEqual(ids.sort());
    for (const lesson of ids) {
      for (const kind of PET_AI_STEP_KINDS) expect(PET_AI_TIP_IDS).toContain(preparedPetStrategies[lesson][kind]);
    }
  });
  it('requires valid known curriculum context and rejects any added personal fields', async () => {
    const send = vi.fn<typeof fetch>();
    const serve = createCompanionService(config, send);
    for (const invalid of [{ ...context, reflection: 'private' }, { ...context, worldId: 'a03' }, { ...context, stepKind: 'question' }, { ...context, topicId: 'a04-other' }]) {
      expect((await serve(request(invalid))).status).toBe(400);
    }
    expect((await serve(request(context, 'https://elsewhere.example'))).status).toBe(403);
    expect(send).not.toHaveBeenCalled();
  });
  it('remains available for local-only use when server credentials or models are missing', async () => {
    const send = vi.fn<typeof fetch>();
    for (const missing of [{}, { apiKey: 'fixture' }, { models: 'test' }]) {
      expect(await (await createCompanionService(() => missing, send)(request(context))).json()).toEqual({ source: 'prepared', tipId: preparedPetStrategies['a04-sq1'].concept });
    }
    expect(send).not.toHaveBeenCalled();
  });
  it('tries the next configured model when access to one model is denied', async () => {
    const send = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 403 }))
      .mockResolvedValueOnce(answer('predict'));
    const res = await createCompanionService(config, send)(request(context));
    expect(await res.json()).toEqual({ tipId: 'predict', source: 'live' });
    expect(send).toHaveBeenCalledTimes(2);
  });
  it('uses local help without trying more models when the gateway challenges the server', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, {
      status: 403, headers: { 'cf-mitigated': 'challenge' },
    }));
    const serve = createCompanionService(config, send);
    const res = await serve(request(context));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ source: 'prepared', tipId: preparedPetStrategies['a04-sq1'].concept });
    await serve(request({ ...context, cue: 'taking_time' }));
    expect(send).toHaveBeenCalledTimes(1);
  });
  it('stops on invalid credentials and serves the prepared choice without provider details', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response('private provider details', { status: 401 }));
    const res = await createCompanionService(config, send)(request(context));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ source: 'prepared', tipId: preparedPetStrategies['a04-sq1'].concept });
    expect(send).toHaveBeenCalledTimes(1);
  });
});
