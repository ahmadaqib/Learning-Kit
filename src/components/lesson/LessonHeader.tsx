import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';
import type { Mode } from '@/content/schema';
import { useCountUp } from '@/motion/useCountUp';
import { Annot } from '@/components/fx/Annot';
import { usePetForeground } from '@/components/pet/usePetMotion';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface LessonHeaderProps {
  mode: Mode;
  /** 0 to 100. One continuous bar: it never moves backwards, a requeue only lengthens the track (spec 8.5). */
  progress: number;
  /** The session XP shown on the chip. The page raises it when the XP fly lands, not before. */
  sessionXp: number;
  /** The XP fly's target element. */
  xpChipRef: React.Ref<HTMLSpanElement>;
  /** Raise it by one each time the chip is hit by the fly: the chip bumps (M23). 0 means no bump yet. */
  bumpKey: number;
  /** First-try correct answers in a row (M48). The chip shows from 3 and fades out when it drops to 0. */
  combo: number;
  focus: boolean;
  pet?: React.ReactNode;
  petTravelPaused?: boolean;
  onToggleFocus: () => void;
  onExit: () => void;
}

const COMBO_MIN = 3;

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  mode,
  progress,
  sessionXp,
  xpChipRef,
  bumpKey,
  combo,
  onExit,
  focus,
  pet,
  petTravelPaused = false,
  onToggleFocus,
}) => {
  const shown = useCountUp(sessionXp, { duration: 300, from: sessionXp });
  const foreground = usePetForeground();

  // The combo chip stays mounted for a moment after a miss so it can fade out (M48)
  const [display, setDisplay] = useState(combo >= COMBO_MIN ? combo : 0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (combo >= COMBO_MIN) {
      setDisplay(combo);
      setLeaving(false);
    } else if (display >= COMBO_MIN) {
      setLeaving(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [combo]);

  const label = mode === 'junior' ? `Poin sesi ini: ${sessionXp}` : `XP sesi ini: ${sessionXp}`;

  return (
    <header className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-2 pw-safe-top sm:gap-x-3">
      <button
        type="button"
        data-sfx="back"
        onClick={onExit}
        aria-label="Keluar pelajaran"
        className="pw-pressable order-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[var(--radius-full)] border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] cursor-pointer"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      <button type="button" aria-pressed={focus} onClick={onToggleFocus}
        className={`pw-pressable order-3 min-h-11 rounded-[var(--radius-full)] border border-[var(--line)] bg-[var(--paper)] px-3 font-bold aria-pressed:border-[var(--world-700)] aria-pressed:bg-[var(--world-50)] ${pet ? 'ml-auto' : ''}`}>
        Fokus
      </button>

      <span
        ref={xpChipRef}
        role="img"
        aria-label={label}
        className="order-4 inline-flex min-h-[32px] flex-shrink-0 items-center rounded-[var(--radius-full)] border-[1.5px] border-[var(--star)] bg-[var(--star-50)] px-3 text-[var(--star-700)]"
      >
        <span key={bumpKey} aria-hidden="true" className={`inline-flex items-center gap-1 font-extrabold ${bumpKey > 0 ? 'pw-fx-bump' : ''} ${mode === 'pro' ? 'font-mono tabular-nums' : ''}`}>
          <Star className="h-4 w-4" fill="currentColor" aria-hidden="true" />
          {shown}
        </span>
      </span>

      {display >= COMBO_MIN && (
        <span
          data-enter={leaving ? undefined : 'pop'}
          style={{ '--fx-dur': '200ms' } as React.CSSProperties}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget && leaving) {
              setLeaving(false);
              setDisplay(0);
            }
          }}
          className={`order-5 flex-shrink-0 ${leaving ? 'pw-fx-out' : 'pw-enter'}`}
        >
          <Annot label={`${display} beruntun`}>
            <span key={display} className="pw-fx-bump inline-block">
              {display}
            </span>{' '}
            beruntun
          </Annot>
        </span>
      )}

      <div className={pet ? 'relative order-last min-w-0 basis-full' : 'order-2 min-w-[96px] flex-1'}>
        <div className={pet ? 'pointer-events-none absolute inset-x-7 top-1/2 -translate-y-1/2 print:static print:translate-y-0' : undefined}>
          <ProgressBar value={progress} label="Kemajuan pelajaran" halfwayNote={mode === 'junior'} />
        </div>
        {pet && (
          <div data-pet-lane="" className="no-print pointer-events-none relative h-14 overflow-clip [overflow-clip-margin:4px]">
            {/* The traveler spans the distance between the first and last safe positions of the button. */}
            <div
              data-pet-travel={foreground && !petTravelPaused ? 'on' : 'off'}
              className="pw-pet-travel pointer-events-none absolute inset-y-0 left-1 right-[3.25rem] flex items-center [&_dialog]:pointer-events-auto"
              style={{ transform: `translateX(${Math.max(0, Math.min(100, progress))}%)` }}
            >
              {pet}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
