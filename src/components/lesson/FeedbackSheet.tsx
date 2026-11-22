import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import type { Mode } from '@/content/schema';
import { Bito } from '@/components/mascot/Bito';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';

interface FeedbackSheetProps {
  open: boolean;
  isCorrect: boolean;
  isFirstTry: boolean;
  explanation: string;
  mode: Mode;
  onContinue: () => void;
}

const PRAISE_TITLES = ['Tepat!', 'Keren!', 'Betul!'];

export const FeedbackSheet: React.FC<FeedbackSheetProps> = ({
  open,
  isCorrect,
  isFirstTry,
  explanation,
  mode,
  onContinue,
}) => {
  const activeProfile = useAppStore((s) => s.profiles[s.activeProfileId]);
  if (!open) return null;

  const title = isCorrect
    ? PRAISE_TITLES[explanation.length % PRAISE_TITLES.length]
    : mode === 'junior'
      ? 'Hampir!'
      : 'Belum tepat';

  return (
    <div
      role="region"
      aria-live="polite"
      className={`pw-anim-slide-up fixed inset-x-0 bottom-0 z-40 border-t-2 px-4 py-4 shadow-2xl pw-safe-bottom ${
        isCorrect
          ? 'border-[var(--ok-500)] bg-[var(--ok-50)]'
          : 'border-[var(--warn-500)] bg-[var(--warn-50)]'
      }`}
    >
      <div className="mx-auto flex max-w-[720px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Bito
            size={48}
            expression={isCorrect ? 'happy' : 'think'}
            custom={activeProfile?.mascot}
            className="flex-shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-[var(--ok-600)]" aria-hidden="true" />
              ) : (
                <Sparkles className="h-5 w-5 text-[var(--warn-700)]" aria-hidden="true" />
              )}
              <span
                className={`pw-h3 ${
                  isCorrect ? 'text-[var(--ok-600)]' : 'text-[var(--warn-700)]'
                }`}
              >
                {title}
              </span>
              {isCorrect && isFirstTry && (
                <span className="rounded-full bg-[var(--star)] px-2.5 py-0.5 text-xs font-extrabold text-[#1F2340]">
                  +10 XP
                </span>
              )}
            </div>
            <p className="pw-small pw-prose text-[var(--ink)]">{explanation}</p>
            {!isCorrect && (
              <p className="text-xs font-semibold text-[var(--ink-2)]">
                Soal ini akan muncul lagi di akhir pelajaran supaya makin ingat.
              </p>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          onClick={onContinue}
          soundEnabled={activeProfile?.settings.soundEnabled}
          className="sm:min-w-[160px]"
          autoFocus
        >
          Lanjut →
        </Button>
      </div>
    </div>
  );
};
