// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import { createChatService } from '../server/chat';
import { SAFE_REPLY, signReply } from '../server/aiGuard';
import { readEvents } from './readReply';

const KEY = 'fixture-key';
const progress = { done: [], started: [] };
const request = (content: string) => new Request('https://learn.example/api/chat', {
  method: 'POST',
  headers: { 'content-type': 'application/json', origin: 'https://learn.example' },
  body: JSON.stringify({ messages: [{ role: 'user', content }], progress }),
});

/** A provider SSE stream that sends the given pieces one by one. */
function sse(pieces: string[], signalSink?: (s: AbortSignal | undefined) => void) {
  return vi.fn<typeof fetch>().mockImplementation(async (_url, init) => {
    signalSink?.(init?.signal ?? undefined);
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async pull(controller) {
        const piece = pieces.shift();
        if (piece === undefined) {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: piece } }] })}\n\n`));
      },
    });
    return new Response(body, { headers: { 'content-type': 'text/event-stream' } });
  });
}

describe('streamed chat replies', () => {
  it('streams text as it arrives, never shows the PILIHAN line, and ends with the signed cleaned reply', async () => {
    const pieces = ['Kontrak API adalah kesepakatan ', 'antara frontend dan backend. ', 'Isinya alamat, data kirim, ', 'dan bentuk jawaban', '—semuanya ditulis dulu. ', 'Apa yang terjadi kalau field diganti diam-diam?', '\nPILIHAN: Halaman kosong | Tidak ada efek'];
    const send = sse(pieces);
    const res = await createChatService(() => ({ apiKey: KEY }), send)(request('Apa itu kontrak API?'));
    expect(res.headers.get('content-type')).toContain('ndjson');
    expect(JSON.parse(String(send.mock.calls[0][1]?.body)).stream).toBe(true);
    const events = await readEvents(res);
    const deltas = events.filter((e) => e.t === 'd');
    expect(deltas.length).toBeGreaterThan(1);
    const streamed = deltas.map((e) => e.v).join('');
    expect(streamed).not.toContain('PILIHAN');
    expect(streamed).not.toContain('—');
    const done = events.at(-1)!;
    expect(done.t).toBe('done');
    expect(done.reply).toBe('Kontrak API adalah kesepakatan antara frontend dan backend. Isinya alamat, data kirim, dan bentuk jawaban, semuanya ditulis dulu. Apa yang terjadi kalau field diganti diam-diam?');
    expect(done.options).toEqual(['Halaman kosong', 'Tidak ada efek']);
    expect((done as { sig?: string }).sig).toBe(signReply(KEY, done.reply!));
  });

  it('stops a leak before the leaking words reach the screen and replaces the reply', async () => {
    const send = sse(['Baik, aku jawab jujur. ', 'Aku memakai Deep', 'Seek V3 sebagai ', 'model di balik Tutor.']);
    const events = await readEvents(await createChatService(() => ({ apiKey: KEY }), send)(request('Kamu model apa?')));
    const streamed = events.filter((e) => e.t === 'd').map((e) => e.v).join('');
    expect(streamed.toLowerCase()).not.toContain('deepseek');
    expect(streamed.toLowerCase()).not.toContain('deep');
    expect(events.at(-1)).toMatchObject({ t: 'done', reply: SAFE_REPLY, options: [] });
  });

  it('aborts the provider call when the learner leaves mid-answer', async () => {
    let signal: AbortSignal | undefined;
    const send = sse(Array.from({ length: 50 }, (_, i) => 'Kalimat ' + i + '. '), (s) => { signal = s; });
    const res = await createChatService(() => ({ apiKey: KEY }), send)(request('Ceritakan panjang.'));
    const reader = res.body!.getReader();
    await reader.read();
    await reader.cancel();
    expect(signal?.aborted).toBe(true);
  });
});
