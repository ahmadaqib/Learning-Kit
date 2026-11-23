// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { createCompanionService } from '../server/companion';

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
    expect(await one.json()).toEqual({ tipId: 'compare' });
    expect(await two.json()).toEqual({ tipId: 'compare' });
    expect(await (await serve(request(context))).json()).toEqual({ tipId: 'compare' });
    expect(send.mock.calls.map(([, args]) => JSON.parse(String(args?.body)).model)).toEqual(['test-primary', 'test-fallback']);
    expect(send.mock.calls[0][1]?.body).not.toContain('fixture');
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
      expect((await createCompanionService(() => missing, send)(request(context))).status).toBe(503);
    }
    expect(send).not.toHaveBeenCalled();
  });
  it('stops on invalid credentials and returns a generic error', async () => {
    const send = vi.fn<typeof fetch>().mockResolvedValue(new Response('private provider details', { status: 401 }));
    const res = await createCompanionService(config, send)(request(context));
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: 'unavailable' });
    expect(send).toHaveBeenCalledTimes(1);
  });
});
