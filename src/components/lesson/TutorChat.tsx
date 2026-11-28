import React, { useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { DialogModal } from '@/components/ui/DialogModal';
import { Button } from '@/components/ui/Button';
import { resolveTxt, type Step } from '@/content/schema';
import { richToPlainText } from '@/content/rich';

type Message = { role: 'user' | 'assistant'; content: string };
type CardStep = Exclude<Step, { kind: 'question' }>;

// Kept in memory only, per lesson: a chat never reaches storage and is gone when the tab closes.
const threads = new Map<string, Message[]>();

const STARTERS = [
  'Jelaskan kartu ini dengan analogi sederhana.',
  'Uji pemahamanku dengan satu pertanyaan.',
  'Beri contoh pemakaiannya di dunia kerja.',
];

/** The visible Pro text of a card, so the tutor explains what the learner is reading. */
export function tutorCardText(step: CardStep): string {
  const parts = step.kind === 'story' ? [richToPlainText(step.body, 'pro')]
    : step.kind === 'concept' ? [resolveTxt(step.title, 'pro'), richToPlainText(step.body, 'pro'), step.code?.code ?? '']
    : step.kind === 'limit' ? [
      'Perumpamaan: ' + resolveTxt(step.analogy, 'pro'),
      'Mirip: ' + step.same.map((s) => resolveTxt(s, 'pro')).join(' '),
      'Berbeda: ' + step.different.map((s) => resolveTxt(s, 'pro')).join(' '),
    ]
    : ['Simulasi: ' + resolveTxt(step.instructions, 'pro')];
  return parts.filter(Boolean).join('\n').slice(0, 2400);
}

export const TutorChat: React.FC<{ lessonId: string; card: string }> = ({ lessonId, card }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => threads.get(lessonId) ?? []);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);

  const update = (next: Message[]) => {
    threads.set(lessonId, next);
    setMessages(next);
    // Show the start of the newest message: long tutor answers are read from the top.
    // Scroll the transcript only; scrollIntoView would also scroll the dialog and hide the notice and form.
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
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        body: JSON.stringify({ lessonId, card, messages: next.slice(-10) }),
      });
      const data = response.ok ? await response.json() : null;
      if (typeof data?.reply !== 'string') throw new Error(response.status === 429 ? 'busy' : 'unavailable');
      update([...next, { role: 'assistant', content: data.reply }]);
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
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="pw-pressable inline-flex h-11 flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--radius-full)] border border-[var(--line)] bg-[var(--paper)] px-3 text-sm font-bold text-[var(--ink)]"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        Tanya AI
      </button>

      <DialogModal open={open} onClose={() => setOpen(false)} title="Tanya Tutor AI">
        {open && (
          <div className="space-y-3">
            <p className="pw-small m-0 text-[var(--ink-2)]">
              Pesanmu dan isi kartu ini dikirim ke AI 1Inference dan tidak disimpan di aplikasi. Jangan tulis data pribadi.
              Jawaban AI bisa keliru.
            </p>

            {messages.length === 0 ? (
              <div className="flex flex-col gap-2">
                {STARTERS.map((s) => (
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
                // Height left in the dialog body (70dvh - header) after the notice and the form.
                className="relative max-h-[max(9rem,calc(70dvh-76px-17rem))] space-y-3 overflow-y-auto overscroll-contain rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-well)] p-3"
                aria-live="polite"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    ref={i === messages.length - 1 ? lastRef : undefined}
                    className={`${m.role === 'user' ? 'ml-10' : ''}`}
                  >
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
              <label htmlFor={`tutor-${lessonId}`} className="visually-hidden">Pertanyaanmu</label>
              <textarea
                id={`tutor-${lessonId}`}
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
        )}
      </DialogModal>
    </>
  );
};
