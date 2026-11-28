import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { DialogModal } from '@/components/ui/DialogModal';
import { ChatBox } from '@/components/chat/ChatBox';
import { resolveTxt, type Step } from '@/content/schema';
import { richToPlainText } from '@/content/rich';

type CardStep = Exclude<Step, { kind: 'question' }>;

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
          <ChatBox
            threadKey={'lesson:' + lessonId}
            endpoint="/api/tutor"
            buildBody={(messages) => ({ lessonId, card, messages })}
            starters={STARTERS}
            notice="Pesanmu dan isi kartu ini dikirim ke AI 1Inference dan tidak disimpan di aplikasi. Jangan tulis data pribadi. Jawaban AI bisa keliru."
            // Height left in the dialog body (70dvh - header) after the notice and the form.
            listHeight="max-h-[max(9rem,calc(70dvh-76px-17rem))]"
            inputId={`tutor-${lessonId}`}
          />
        )}
      </DialogModal>
    </>
  );
};
