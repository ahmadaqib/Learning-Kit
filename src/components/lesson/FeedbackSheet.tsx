import React, { useLayoutEffect, useRef } from 'react';
import { CheckCircle2, Repeat, Sparkles } from 'lucide-react';
import type { Mode } from '@/content/schema';
import type { ReadingMark } from '@/engine/readAloud';
import { xpWord } from '@/app/modeConfig';
import { EASE } from '@/motion/tokens';
import { fx } from '@/motion/waapi';
import { Doodle } from '@/components/fx/Doodle';
import { ReadAloudButton } from '@/components/lesson/ActionBar';
import { Bito, type BitoExpression } from '@/components/mascot/Bito';
import { MarkedText } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';

interface FeedbackSheetProps {
  open: boolean;
  isCorrect: boolean;
  /** A wrong answer where at least 70% of the parts were right. Only then does the title read "Hampir!". */
  almost?: boolean;
  /** First-try correct. Decides the default XP badge (+10) when `xp` is not given. */
  isFirstTry: boolean;
  /** The XP this answer earned: 10 for a first try, 3 for a retry, 0 or undefined for none. */
  xp?: number;
  explanation: string;
  mode: Mode;
  onContinue: () => void;
  /** The XP badge. It is the source element of the XP fly that starts when the learner presses "Lanjut". */
  xpBadgeRef?: React.Ref<HTMLSpanElement>;
  /** Show "Soal ini muncul lagi nanti." on a wrong answer. Default true. */
  showRepeat?: boolean;
  /** Its own "Dengar" button. The page decides whether it shows (voice available, Pro with auto-read on). */
  canSpeak?: boolean;
  speaking?: boolean;
  onToggleSpeak?: () => void;
  /** The sentence being read (M49). */
  reading?: ReadingMark | null;
  /** Override Bito's face: `happy` for a right answer and `think` for a wrong one by default. */
  bitoExpression?: BitoExpression;
}

const PRAISE_TITLES = ['Tepat!', 'Betul!', 'Pas!'];

export const feedbackTitle = (opts: {
  isCorrect: boolean;
  almost?: boolean;
  mode: Mode;
  seed?: number;
}): string => {
  if (opts.isCorrect) return PRAISE_TITLES[(opts.seed ?? 0) % PRAISE_TITLES.length];
  if (opts.almost) return opts.mode === 'junior' ? 'Hampir!' : 'Hampir';
  return opts.mode === 'junior' ? 'Belum pas' : 'Belum tepat';
};

/**
 * The verdict, as ONE object (spec 5.9.4 M21, 5.9.5 A). It rises 280 ms on `--ease-drawer`, 120 ms after
 * "Periksa", and carries Bito, the title, the doodle, the explanation and the button with it. Nothing inside
 * it animates: Bito does not react, the underline is drawn already, and the XP badge stays still until the
 * learner presses "Lanjut". Closing is the parent unmounting it in the same frame.
 */
export const FeedbackSheet: React.FC<FeedbackSheetProps> = ({
  open,
  isCorrect,
  almost = false,
  isFirstTry,
  xp,
  explanation,
  mode,
  onContinue,
  xpBadgeRef,
  showRepeat = true,
  canSpeak = false,
  speaking = false,
  onToggleSpeak,
  reading = null,
  bitoExpression,
}) => {
  const activeProfile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const sheetRef = useRef<HTMLDivElement>(null);

  // The one entrance. Before paint, so the first frame already has the sheet below the edge.
  useLayoutEffect(() => {
    const el = sheetRef.current;
    if (!open || !el) return undefined;
    const animation = fx(el, [{ transform: 'translateY(100%)' }, { transform: 'none' }], {
      duration: 240,
      easing: EASE.drawer,
    });
    return () => animation?.cancel();
  }, [open]);

  if (!open) return null;

  const xpValue = xp ?? (isFirstTry ? 10 : 0);
  const title = feedbackTitle({ isCorrect, almost, mode, seed: explanation.length });

  return (
    <div
      ref={sheetRef}
      role="region"
      aria-live="polite"
      aria-label="Penjelasan jawaban"
      data-rm="fade"
      className={`fixed inset-x-0 bottom-0 z-40 flex max-h-[calc(100dvh-max(2.25rem,env(safe-area-inset-top)))] rounded-t-[var(--radius-xl)] border-t-[3px] px-4 pt-5 shadow-[var(--elev-up)] pw-safe-bottom ${
        isCorrect
          ? 'border-[var(--ok-500)] bg-[var(--ok-50)]'
          : 'border-[var(--warn-500)] bg-[var(--warn-50)]'
      }`}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[720px] flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="flex min-h-0 min-w-0 items-start gap-3">
          <Bito
            size={mode === 'junior' ? 72 : 40}
            expression={bitoExpression ?? (isCorrect ? 'happy' : 'think')}
            custom={activeProfile?.mascot}
            react={false}
            className={`flex-shrink-0 ${mode === 'junior' ? '-mt-11' : ''}`}
          />
          <div
            role="group"
            aria-label="Isi penjelasan"
            tabIndex={0}
            className="min-w-0 flex-1 space-y-1.5 self-stretch overflow-y-auto overscroll-contain [overflow-wrap:anywhere] focus-visible:outline-offset-[-3px]"
          >
            <div className="flex flex-wrap items-center gap-2">
              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 text-[var(--ok-600)]" aria-hidden="true" />
              ) : (
                <Sparkles className="h-5 w-5 text-[var(--warn-700)]" aria-hidden="true" />
              )}
              <span
                className={`pw-h3 relative inline-block ${isCorrect ? 'text-[var(--ok-600)]' : 'text-[var(--warn-700)]'}`}
              >
                {title}
                <Doodle
                  name="underline"
                  width={72}
                  className="absolute -bottom-2 left-0"
                  style={{ color: isCorrect ? 'var(--ok-500)' : 'var(--warn-500)' }}
                />
              </span>
              {isCorrect && xpValue > 0 && (
                <span
                  ref={xpBadgeRef}
                  className="rounded-[var(--radius-full)] bg-[var(--star)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--on-star)]"
                >
                  +{xpValue} {xpWord(mode)}
                </span>
              )}
            </div>
            <p className="pw-body pw-prose m-0 text-[var(--ink)]">
              <MarkedText text={explanation} activePart={reading && reading.el === 'explanation' ? reading.part : null} />
            </p>
            {!isCorrect && showRepeat && (
              <p className="pw-small m-0 inline-flex items-center gap-1.5 rounded-[var(--radius-full)] bg-[var(--paper)] px-3 py-1 font-semibold text-[var(--ink-2)]">
                <Repeat className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                Soal ini muncul lagi nanti.
              </p>
            )}
            {canSpeak && onToggleSpeak && (
              <div>
                <ReadAloudButton mode={mode} speaking={speaking} onToggle={onToggleSpeak} />
              </div>
            )}
          </div>
        </div>

        <Button
          variant="primary"
          onClick={onContinue}
          soundEnabled={activeProfile?.settings.soundEnabled}
          className="shrink-0 sm:min-w-[160px] sm:self-center"
          autoFocus
        >
          Lanjut →
        </Button>
      </div>
    </div>
  );
};
