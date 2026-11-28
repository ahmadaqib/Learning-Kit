import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';

export type ChatMessage = { role: 'user' | 'assistant'; content: string; sig?: string };

// Kept in memory only, per thread: a chat never reaches storage and is gone when the tab closes.
const threads = new Map<string, ChatMessage[]>();

interface ChatBoxProps {
  /** Separates conversations, e.g. one per lesson. */
  threadKey: string;
  endpoint: string;
  /** Request body for the chat so far; the last message is the learner's. */
  buildBody: (messages: ChatMessage[]) => object;
  starters: string[];
  notice: React.ReactNode;
  /** Tailwind max-height for the transcript, sized to where the box lives. */
  listHeight: string;
  inputId: string;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ threadKey, endpoint, buildBody, starters, notice, listHeight, inputId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => threads.get(threadKey) ?? []);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);

  const update = (next: ChatMessage[]) => {
    threads.set(threadKey, next);
    setMessages(next);
    // Show the start of the newest message: long answers are read from the top.
    // Scroll the transcript only; scrollIntoView would also scroll the page or dialog around it.
    requestAnimationFrame(() => {
      const list = listRef.current, last = lastRef.current;
      if (list && last) list.scrollTo({ top: last.offsetTop - 12, behavior: 'smooth' });
    });
  };

  const ask = async (text: string) => {
    const question = text.trim().slice(0, 1200);
    if (!question || loading) return;
    const next = [...messages, { role: 'user' as const, content: question }];
    update(next);
    setDraft('');
    setError('');
    setLoading(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 30_000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        body: JSON.stringify(buildBody(next.slice(-10))),
      });
      const data = response.ok ? await response.json() : null;
      if (typeof data?.reply !== 'string') throw new Error(response.status === 429 ? 'busy' : 'unavailable');
      update([...next, { role: 'assistant', content: data.reply, sig: typeof data.sig === 'string' ? data.sig : undefined }]);
    } catch (e) {
      // Give the question back so nothing the learner typed is lost.
      update(messages);
      setDraft(question);
      setError(e instanceof Error && e.message === 'busy'
        ? 'Tutor sedang ramai. Tunggu sebentar, lalu kirim lagi.'
        : 'Tutor belum bisa dihubungi. Coba kirim lagi sebentar lagi.');
    } finally {
      window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="pw-small m-0 text-[var(--ink-2)]">{notice}</p>

      {messages.length === 0 ? (
        <div className="flex flex-col gap-2">
          {starters.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => ask(s)}
              className="pw-pressable min-h-[var(--touch-min)] cursor-pointer rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-left text-sm font-bold text-[var(--ink)]"
            >
              {s}
            </button>
          ))}
        </div>
      ) : (
        <div
          ref={listRef}
          className={`relative ${listHeight} space-y-3 overflow-y-auto overscroll-contain rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-well)] p-3`}
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <div key={i} ref={i === messages.length - 1 ? lastRef : undefined} className={m.role === 'user' ? 'ml-10' : ''}>
              <p className={`pw-small m-0 mb-1 font-bold text-[var(--ink-2)] ${m.role === 'user' ? 'text-right' : ''}`}>
                {m.role === 'user' ? 'Kamu' : 'Tutor'}
              </p>
              <div
                className={`whitespace-pre-wrap break-words rounded-[var(--radius-md)] px-3 py-2 text-[15px] leading-relaxed text-[var(--ink)] ${
                  m.role === 'user' ? 'bg-[var(--world-50)]' : 'border border-[var(--line)] bg-[var(--paper)]'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && <p className="pw-small m-0 text-[var(--ink-2)]">Tutor sedang menyiapkan jawaban…</p>}
        </div>
      )}

      {error && <p role="alert" className="pw-small m-0 font-bold text-[var(--err-600)]">{error}</p>}

      <form
        className="space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
      >
        <label htmlFor={inputId} className="visually-hidden">Pertanyaanmu</label>
        <textarea
          id={inputId}
          value={draft}
          maxLength={1200}
          rows={2}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              ask(draft);
            }
          }}
          placeholder="Tulis pertanyaan atau jawabanmu…"
          className="w-full rounded-[var(--radius-md)] border-2 border-[var(--line-strong)] bg-[var(--paper)] px-3 py-2 text-[var(--ink)] focus:border-[var(--world-600)]"
        />
        <div className="flex items-center justify-between gap-2">
          {messages.length > 0 ? (
            <Button variant="ghost" disabled={loading} onClick={() => { update([]); setError(''); }}>Mulai ulang</Button>
          ) : <span />}
          <Button type="submit" loading={loading} disabled={!draft.trim()}>Kirim</Button>
        </div>
      </form>
    </div>
  );
};
