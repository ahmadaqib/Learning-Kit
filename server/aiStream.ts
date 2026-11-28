import { AI_CHAT_URL } from './aiProvider.js';
import { SAFE_REPLY, leaks, noLongDashes, signReply, splitOptions } from './aiGuard.js';

/**
 * Streams a tutor reply to the browser as NDJSON while keeping the server-side guards:
 * - the last HOLD characters are held back, so the leak check and the "PILIHAN:" line are seen before
 *   that text reaches the screen;
 * - a final "done" event carries the cleaned reply, the answer buttons and the history signature,
 *   and the client swaps it in for what was streamed.
 * Events: {"t":"d","v":text} | {"t":"done","reply","options","sig"} | {"t":"error","error"}.
 */
const HOLD = 80;
const OPTIONS_LINE = /\n[ \t]*PILIHAN[ \t]*:/i;

export interface StreamReplyArgs {
  send: typeof fetch;
  apiKey: string;
  /** The chat completion request, without `stream`. */
  request: Record<string, unknown>;
  /** The fixed rules only, for the leak check. */
  rules: string;
  modelIds: string[];
  tag: string;
  /** Called exactly once when the stream ends, fails or is cancelled (e.g. to free an in-flight slot). */
  release: () => void;
  onProviderError?: (response: Response) => void;
  onFinal?: (reply: string, options: string[]) => void;
}

export function finalizeReply(raw: string, rules: string, modelIds: string[], tag: string) {
  let { reply, options } = splitOptions(raw.trim());
  reply = noLongDashes(reply).slice(0, 4000);
  options = options.map(noLongDashes);
  if (!reply || leaks([reply, ...options].join('\n'), rules, modelIds)) {
    if (reply) console.warn(tag + '.blocked_leak');
    return { reply: SAFE_REPLY, options: [] as string[] };
  }
  return { reply, options };
}

const ndjson = { 'Content-Type': 'application/x-ndjson; charset=utf-8', 'Cache-Control': 'no-store', 'X-Accel-Buffering': 'no' };
const errorJson = (status: number, error: string) => new Response(JSON.stringify({ error }), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

export async function streamReply(args: StreamReplyArgs): Promise<Response> {
  const { send, apiKey, request, rules, modelIds, tag } = args;
  let released = false;
  const release = () => {
    if (!released) { released = true; args.release(); }
  };
  const stop = new AbortController();

  let response: Response;
  try {
    response = await send(AI_CHAT_URL, {
      method: 'POST', redirect: 'error',
      signal: AbortSignal.any([AbortSignal.timeout(45_000), stop.signal]),
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...request, stream: true }),
    });
  } catch (error) {
    console.warn(tag + '.provider_fetch', error instanceof Error ? error.name : 'failed');
    release();
    return errorJson(503, 'unavailable');
  }
  if (!response.ok) {
    console.warn(tag + '.provider_http', response.status);
    args.onProviderError?.(response);
    release();
    return errorJson(response.status === 429 ? 429 : 503, response.status === 429 ? 'busy' : 'unavailable');
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (event: object) => controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
      let raw = '';
      let sent = 0;
      let optionsAt = -1;
      let blocked = false;

      const flush = (final: boolean) => {
        if (optionsAt < 0) {
          const found = raw.search(OPTIONS_LINE);
          if (found >= 0) optionsAt = found;
        }
        // Check everything received, including the held-back tail, before any of it is shown.
        if (leaks(raw, rules, modelIds)) {
          blocked = true;
          return;
        }
        const limit = optionsAt >= 0 ? optionsAt : final ? raw.length : raw.length - HOLD;
        if (limit > sent) {
          emit({ t: 'd', v: raw.slice(sent, limit).replace(/—/g, ', ') });
          sent = limit;
        }
      };

      try {
        const isSse = (response.headers.get('content-type') ?? '').includes('event-stream');
        if (!isSse || !response.body) {
          // The gateway answered without streaming: treat the whole reply as one piece.
          const result = await response.json();
          raw = typeof result?.choices?.[0]?.message?.content === 'string' ? result.choices[0].message.content : '';
        } else {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let pending = '';
          read: for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            pending += decoder.decode(value, { stream: true });
            let newline: number;
            while ((newline = pending.indexOf('\n')) >= 0) {
              const line = pending.slice(0, newline).trim();
              pending = pending.slice(newline + 1);
              if (!line.startsWith('data:')) continue;
              const data = line.slice(5).trim();
              if (data === '[DONE]') break read;
              try {
                const delta = JSON.parse(data)?.choices?.[0]?.delta?.content;
                if (typeof delta === 'string' && delta) raw += delta;
              } catch {
                // A keep-alive or malformed line: skip it.
              }
            }
            flush(false);
            if (blocked || raw.length > 12_000) {
              await reader.cancel().catch(() => {});
              break;
            }
          }
        }
        if (!raw.trim()) {
          console.warn(tag + '.provider_unusable_response');
          emit({ t: 'error', error: 'unavailable' });
        } else {
          if (!blocked) flush(true);
          const { reply, options } = blocked ? { reply: SAFE_REPLY, options: [] as string[] } : finalizeReply(raw, rules, modelIds, tag);
          if (blocked) console.warn(tag + '.blocked_leak');
          args.onFinal?.(reply, options);
          emit({ t: 'done', reply, options, sig: signReply(apiKey, reply) });
        }
      } catch (error) {
        // An abort after the learner left is expected, not a provider failure.
        if (!stop.signal.aborted) console.warn(tag + '.provider_stream', error instanceof Error ? error.name : 'failed');
        try { emit({ t: 'error', error: 'unavailable' }); } catch { /* already closed */ }
      } finally {
        release();
        try { controller.close(); } catch { /* cancelled */ }
      }
    },
    cancel() {
      // The learner left: stop paying for tokens nobody will read.
      stop.abort();
      release();
    },
  });
  return new Response(stream, { status: 200, headers: ndjson });
}
