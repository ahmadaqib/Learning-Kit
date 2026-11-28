import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ArrowUp, Check, Copy, SquarePen } from 'lucide-react';
import { Bito } from '@/components/mascot/Bito';

export type ChatMessage = { role: 'user' | 'assistant'; content: string; sig?: string; options?: string[] };

// Loaded on first reply, so lesson pages do not carry the Markdown parser.
const ChatMarkdown = lazy(() => import('./ChatMarkdown'));

/** Copies a reply's Markdown text, the way chat apps do. */
const CopyReply: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(text).then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }, () => {})}
      className="pw-pressable inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-[var(--radius-full)] px-2.5 text-xs font-bold text-[var(--ink-3)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)]"
    >
      {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
      {copied ? 'Disalin' : 'Salin'}
    </button>
  );
};

// Kept in memory only, per thread: a chat never reaches storage and is gone when the tab closes.
const threads = new Map<string, ChatMessage[]>();

interface ChatBoxProps {
  /** Separates conversations, e.g. one per lesson. */
  threadKey: string;
  endpoint: string;
  /** Request body for the chat so far; the last message is the learner's. Options are display-only and stay here. */
  buildBody: (messages: { role: 'user' | 'assistant'; content: string; sig?: string }[]) => object;
  /** At most three, so the empty state stays a quick choice (Hick's law). */
  starters: string[];
  greeting: string;
  notice: string;
  inputId: string;
  /** Title shown in the toolbar; the dialog already has its own. */
  title?: string;
  /** Keeps the conversation across reloads; without it the chat lives in memory for this tab only. */
  persist?: { load: () => ChatMessage[]; save: (messages: ChatMessage[]) => void };
}

/** Messaging-app layout: scrolling transcript, composer pinned at the bottom. Fills its parent's height. */
export const ChatBox: React.FC<ChatBoxProps> = ({ threadKey, endpoint, buildBody, starters, greeting, notice, inputId, title, persist }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => threads.get(threadKey) ?? persist?.load() ?? []);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  /** The reply as it streams in; replaced by the final cleaned reply when the stream ends. */
  const [live, setLive] = useState<string | null>(null);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // A restored conversation opens at its latest message, like a chat app.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, []);

  // Grow the composer with its text, up to about six lines.
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 168) + 'px';
  }, [draft]);

  const scrollToLast = () => requestAnimationFrame(() => {
    // Show the start of the newest message: long answers are read from the top.
    // Scroll the transcript only; scrollIntoView would also move the page or dialog around it.
    const list = listRef.current, last = lastRef.current;
    if (list && last) list.scrollTo({ top: last.offsetTop - 16, behavior: 'smooth' });
  });

  // While text streams in, keep following it, unless the learner has scrolled up to read.
  const followStream = () => requestAnimationFrame(() => {
    const list = listRef.current;
    if (list && list.scrollHeight - list.scrollTop - list.clientHeight < 120) list.scrollTop = list.scrollHeight;
  });

  /** Reads the server's NDJSON events, showing text as it arrives; returns the final event. */
  const readStream = async (body: ReadableStream<Uint8Array>) => {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let pending = '';
    let text = '';
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      pending += decoder.decode(value, { stream: true });
      let newline: number;
      while ((newline = pending.indexOf('\n')) >= 0) {
        const line = pending.slice(0, newline).trim();
        pending = pending.slice(newline + 1);
        if (!line) continue;
        const event = JSON.parse(line);
        if (event.t === 'd' && typeof event.v === 'string') {
          text += event.v;
          setLive(text);
          followStream();
        } else if (event.t === 'done') {
          return event as { reply?: unknown; options?: unknown; sig?: unknown };
        } else if (event.t === 'error') {
          throw new Error(event.error === 'busy' ? 'busy' : 'unavailable');
        }
      }
    }
    throw new Error('unavailable');
  };

  const update = (next: ChatMessage[]) => {
    threads.set(threadKey, next);
    persist?.save(next);
    setMessages(next);
    scrollToLast();
  };

  const ask = async (text: string) => {
    const question = text.trim().slice(0, 1200);
    if (!question || loading) return;
    const next: ChatMessage[] = [...messages, { role: 'user', content: question }];
    update(next);
    setDraft('');
    setError('');
    setLoading(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 60_000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        body: JSON.stringify(buildBody(next.slice(-10).map(({ role, content, sig }) => ({ role, content, sig })))),
      });
      const streamed = response.ok && response.body && (response.headers.get('content-type') ?? '').includes('ndjson');
      const data = streamed ? await readStream(response.body!) : response.ok ? await response.json() : null;
      if (typeof data?.reply !== 'string') throw new Error(response.status === 429 ? 'busy' : 'unavailable');
      const options = Array.isArray(data.options) ? data.options.filter((o: unknown): o is string => typeof o === 'string').slice(0, 3) : [];
      update([...next, { role: 'assistant', content: data.reply, sig: typeof data.sig === 'string' ? data.sig : undefined, options }]);
    } catch (e) {
      // Give the question back so nothing the learner typed is lost.
      update(messages);
      setDraft(question);
      setError(e instanceof Error && e.message === 'busy'
        ? 'Tutor sedang ramai. Tunggu sebentar, lalu kirim lagi.'
        : 'Tutor belum bisa dihubungi. Coba kirim lagi sebentar lagi.');
    } finally {
      window.clearTimeout(timeout);
      setLive(null);
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const reset = () => {
    update([]);
    setError('');
    setDraft('');
  };

  const last = messages[messages.length - 1];
  const showOptions = !loading && last?.role === 'assistant' && (last.options?.length ?? 0) > 0;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {(title || messages.length > 0) && (
        <div className="flex min-h-12 flex-shrink-0 items-center justify-between gap-2 border-b border-[var(--line)] px-4">
          {title ? <h1 className="pw-h3 m-0">{title}</h1> : <span />}
          {messages.length > 0 && (
            <button
              type="button"
              onClick={reset}
              disabled={loading}
              className="pw-pressable inline-flex min-h-[var(--touch-min)] cursor-pointer items-center gap-1.5 rounded-[var(--radius-full)] px-3 text-sm font-bold text-[var(--ink-2)] hover:bg-[var(--paper-2)] hover:text-[var(--ink)] disabled:opacity-50"
            >
              <SquarePen className="h-4 w-4" aria-hidden="true" />
              Percakapan baru
            </button>
          )}
        </div>
      )}

      {/* aria-busy holds screen-reader announcements until the streamed reply is complete. */}
      <div ref={listRef} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain" aria-live="polite" aria-busy={loading}>
        <div className="mx-auto flex min-h-full w-full max-w-[720px] flex-col px-4 py-5">
          {messages.length === 0 ? (
            <div className="my-auto flex flex-col items-center gap-5 py-6 text-center">
              <Bito size={72} expression="wave" />
              <p className="pw-h2 m-0 max-w-[28ch]">{greeting}</p>
              <div className="flex w-full max-w-[520px] flex-col gap-2">
                {starters.slice(0, 3).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => ask(s)}
                    className="pw-pressable min-h-[var(--touch-min)] cursor-pointer rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-left text-[15px] text-[var(--ink)] hover:border-[var(--line-strong)] hover:bg-[var(--paper-2)]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m, i) => (
                <div key={i} ref={i === messages.length - 1 ? lastRef : undefined}>
                  {m.role === 'user' ? (
                    <div className="flex justify-end">
                      <p className="m-0 max-w-[85%] whitespace-pre-wrap break-words rounded-[20px] rounded-br-md bg-[var(--paper-2)] px-4 py-2.5 text-[15px] leading-relaxed text-[var(--ink)]">
                        <span className="sr-only">Kamu: </span>{m.content}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex-shrink-0" aria-hidden="true"><Bito size={40} expression="idle" react={false} /></div>
                      <div className="min-w-0 flex-1">
                        <span className="sr-only">Tutor: </span>
                        <Suspense fallback={<p className="m-0 whitespace-pre-wrap break-words text-[15px] leading-7 text-[var(--ink)]">{m.content}</p>}>
                          <ChatMarkdown text={m.content} />
                        </Suspense>
                        <div className="-ml-2.5 mt-1"><CopyReply text={m.content} /></div>
                        {showOptions && i === messages.length - 1 && (
                          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Pilihan jawaban">
                            {m.options!.map((o) => (
                              <button
                                key={o}
                                type="button"
                                onClick={() => ask(o)}
                                className="pw-pressable min-h-[var(--touch-min)] cursor-pointer rounded-[var(--radius-full)] border border-[var(--world-600)] bg-transparent px-4 text-sm font-bold text-[var(--ink)] hover:bg-[var(--world-50)]"
                              >
                                {o}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {loading && live && (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0" aria-hidden="true"><Bito size={40} expression="idle" react={false} /></div>
                  <div className="min-w-0 flex-1">
                    <Suspense fallback={<p className="m-0 whitespace-pre-wrap break-words text-[15px] leading-7 text-[var(--ink)]">{live}</p>}>
                      <ChatMarkdown text={live} />
                    </Suspense>
                    <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[var(--ink-3)] motion-safe:animate-pulse" aria-hidden="true" />
                  </div>
                </div>
              )}
              {loading && !live && (
                <div className="flex items-center gap-3" role="status">
                  <div className="flex-shrink-0" aria-hidden="true"><Bito size={40} expression="think" react={false} /></div>
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="h-2 w-2 rounded-full bg-[var(--ink-3)] motion-safe:animate-bounce" style={{ animationDelay: d + 'ms' }} />
                    ))}
                  </span>
                  <span className="sr-only">Tutor sedang menyiapkan jawaban</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 px-4 pb-3 pt-2">
        <div className="mx-auto w-full max-w-[720px]">
          {error && <p role="alert" className="pw-small m-0 mb-2 font-bold text-[var(--err-600)]">{error}</p>}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(draft);
            }}
            className="flex items-end gap-2 rounded-[26px] border border-[var(--line-strong)] bg-[var(--paper)] py-2 pl-4 pr-2 shadow-sm focus-within:border-[var(--world-600)]"
          >
            <label htmlFor={inputId} className="visually-hidden">Pertanyaanmu</label>
            <textarea
              ref={inputRef}
              id={inputId}
              value={draft}
              maxLength={1200}
              rows={1}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  ask(draft);
                }
              }}
              placeholder="Tanya apa saja tentang pelajaranmu…"
              className="max-h-[168px] min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-[15px] leading-6 text-[var(--ink)] outline-none placeholder:text-[var(--ink-3)]"
            />
            <button
              type="submit"
              disabled={!draft.trim() || loading}
              aria-label="Kirim"
              className="pw-pressable flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--ink)] text-[var(--paper)] disabled:cursor-default disabled:opacity-30"
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
          <p className="m-0 mt-2 text-center text-xs leading-snug text-[var(--ink-3)]">{notice}</p>
        </div>
      </div>
    </div>
  );
};
