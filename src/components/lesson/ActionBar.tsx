import React, { useEffect, useRef } from 'react';
import { Lightbulb, Square, Volume2 } from 'lucide-react';
import type { Mode } from '@/content/schema';
import { Button, type ButtonVariant } from '@/components/ui/Button';

interface ReadAloudButtonProps {
  mode: Mode;
  /** True while this card, hint or feedback is being read. */
  speaking: boolean;
  onToggle: () => void;
  className?: string;
}

/**
 * "Dengar" (spec 8.5). Junior: a pill with a speaker icon and the visible label "Dengar", "Berhenti" while it
 * plays. Pro: a 44 px speaker icon with `aria-label="Bacakan"`. The page decides when to show it.
 */
export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({ mode, speaking, onToggle, className = '' }) => {
  const Icon = speaking ? Square : Volume2;
  if (mode === 'pro') {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-label={speaking ? 'Berhenti membaca' : 'Bacakan'}
        aria-pressed={speaking}
        className={`pw-pressable flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[var(--radius-full)] border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] cursor-pointer ${className}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  }
  return (
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={speaking}
        className={`pw-pressable inline-flex min-h-[var(--touch-min)] flex-shrink-0 items-center gap-2 rounded-[var(--radius-full)] border-2 border-[var(--line)] bg-[var(--paper)] px-4 font-bold text-[var(--ink)] cursor-pointer ${className}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span>{speaking ? 'Berhenti' : 'Dengar'}</span>
      </button>
  );
};

interface ActionBarProps {
  mode: Mode;
  /** The one primary action: "Lanjut →", "Periksa", "Apa bedanya? →". */
  primaryLabel: React.ReactNode;
  onPrimary: () => void;
  primaryDisabled?: boolean;
  primaryVariant?: ButtonVariant;
  soundEnabled?: boolean;
  /**
   * Questions only: a round "Petunjuk" button on the left. Leave undefined on cards, where there is nothing
   * to hint at (it used to open an unrelated dialog).
   */
  onHint?: () => void;
  /** M25: show "Butuh petunjuk?" next to the hint button. Junior only, when a missed question comes back. Never on a timer. */
  hintOffer?: boolean;
  /** True while the FeedbackSheet covers the bar: it is taken out of the tab order and the reading order. */
  covered?: boolean;
  /**
   * Change it when a new step appears. If nothing has focus then (the FeedbackSheet just closed), the primary
   * button takes it, so pressing Enter again carries on with the keyboard alone.
   */
  focusKey?: string | number;
}

/**
 * The bottom bar of the lesson player (spec 8.5): `--paper-raised`, a hairline on top, safe-area padding.
 * It renders its own spacer, so the page content never ends up behind it.
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  mode,
  primaryLabel,
  onPrimary,
  primaryDisabled = false,
  primaryVariant = 'primary',
  soundEnabled = false,
  onHint,
  hintOffer = false,
  covered = false,
  focusKey,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focusKey === undefined || covered) return;
    const active = document.activeElement;
    if (active && active !== document.body) return;
    barRef.current?.querySelector<HTMLButtonElement>('[data-primary]:not(:disabled)')?.focus({ preventScroll: true });
  }, [focusKey, covered]);

  return (
    <>
      <div aria-hidden="true" className="h-[calc(6.5rem+env(safe-area-inset-bottom))] flex-shrink-0" />
      <div
        ref={barRef}
        inert={covered || undefined}
        className="fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[var(--paper-raised)] shadow-[var(--elev-up)] pw-safe-bottom"
      >
        <div className="mx-auto flex max-w-[1080px] items-center gap-3 px-4 pt-3 sm:px-6">
          {onHint && (
            <div className="flex flex-shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={onHint}
                aria-label="Petunjuk"
                className="pw-pressable inline-flex min-h-[var(--touch-min)] min-w-[var(--touch-min)] items-center justify-center gap-2 rounded-[var(--radius-full)] border-2 border-[var(--line)] bg-[var(--paper)] px-3 font-bold text-[var(--warn-700)] cursor-pointer"
              >
                <Lightbulb className="h-5 w-5" aria-hidden="true" />
                <span>Petunjuk</span>
              </button>
              {hintOffer && mode === 'junior' && (
                <span data-from="left" className="pw-fx-reveal pw-small hidden font-bold text-[var(--ink-2)] min-[420px]:inline">
                  Butuh petunjuk?
                </span>
              )}
            </div>
          )}
          <Button
            variant={primaryVariant}
            fullWidth
            disabled={primaryDisabled}
            soundEnabled={soundEnabled}
            onClick={onPrimary}
            data-primary="true"
            className="min-w-0 flex-1"
          >
            {primaryLabel}
          </Button>
        </div>
      </div>
    </>
  );
};
