import React, { useEffect, useRef, useState } from 'react';
import { Annot } from '@/components/fx/Annot';
import { useMotionPrefs } from '@/motion/prefs';

interface ProgressBarProps {
  value: number; // 0..100
  variant?: 'lesson' | 'xp' | 'world' | 'poster';
  label: string;
  color?: string;
  /** Number of equal segments (poster meter). Without it the bar is continuous. */
  segments?: number;
  /** Show the "setengah jalan!" note when the bar passes 50% (Junior, M50). Once per mount. */
  halfwayNote?: boolean;
}

const NOTE_VISIBLE_MS = 2600;

/**
 * The fill is a `transform: scaleX()` transition (M24, `.pw-fill`), so it retargets when two steps finish close
 * together and only the compositor works. The glint plays once when the bar reaches 100%, and at 50% with the
 * halfway note (Junior). `poster` sits on a coloured poster: paper fill on a translucent track.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  variant = 'lesson',
  label,
  color,
  segments,
  halfwayNote = false,
}) => {
  const { mode } = useMotionPrefs();
  const clamped = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  const onPoster = variant === 'poster';
  const heightClass = variant === 'xp' ? 'h-2' : onPoster ? 'h-3' : 'h-2.5';
  const fillColor =
    color ?? (onPoster ? 'var(--on-poster)' : variant === 'xp' ? 'var(--star)' : 'var(--world-600)');
  const segmentCount = segments && segments > 1 ? Math.floor(segments) : 0;

  // Glint (M24) and halfway note (M50): both fire when the bar crosses a threshold upwards.
  const prev = useRef(clamped);
  const noteShown = useRef(false);
  const [glint, setGlint] = useState(false);
  const [note, setNote] = useState<'off' | 'in' | 'out'>('off');

  useEffect(() => {
    const before = prev.current;
    prev.current = clamped;
    if (clamped >= 100 && before < 100) {
      setGlint(true);
      return;
    }
    if (halfwayNote && mode === 'junior' && !noteShown.current && before < 50 && clamped >= 50 && clamped < 100) {
      noteShown.current = true;
      setGlint(true);
      setNote('in');
    }
  }, [clamped, halfwayNote, mode]);

  useEffect(() => {
    if (note !== 'in') return undefined;
    const t = setTimeout(() => setNote('out'), NOTE_VISIBLE_MS);
    return () => clearTimeout(t);
  }, [note]);

  const trackClass = onPoster
    ? 'bg-[color-mix(in_srgb,var(--on-poster)_28%,transparent)]'
    : 'border border-[var(--line)] bg-[var(--paper-2)]';

  const fill = (p: number, key?: number) => (
    <div
      key={key}
      className={`pw-fill h-full w-full ${segmentCount ? 'rounded-full' : ''}`}
      style={{ '--p': p, backgroundColor: fillColor } as React.CSSProperties}
    />
  );

  return (
    <div className="relative w-full">
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
        data-variant={variant}
        onAnimationEnd={() => setGlint(false)}
        className={`w-full rounded-full ${heightClass} ${
          segmentCount ? 'flex gap-1' : `overflow-hidden ${trackClass}`
        } ${glint && !segmentCount ? 'pw-fx-glint' : ''}`}
        style={segmentCount ? undefined : { boxShadow: onPoster ? undefined : 'var(--elev-inset)' }}
      >
        {segmentCount
          ? Array.from({ length: segmentCount }, (_, i) => (
              <div
                key={i}
                className={`h-full flex-1 overflow-hidden rounded-full ${trackClass} ${
                  glint && i === segmentCount - 1 && clamped >= 100 ? 'pw-fx-glint' : ''
                }`}
              >
                {fill(Math.max(0, Math.min(1, (clamped / 100) * segmentCount - i)))}
              </div>
            ))
          : fill(clamped / 100)}
      </div>

      {note !== 'off' && (
        <span
          className={`pointer-events-none absolute right-1 top-full z-10 mt-1 ${note === 'out' ? 'pw-fx-out' : ''}`}
          onAnimationEnd={(e) => {
            e.stopPropagation();
            if (note === 'out') setNote('off');
          }}
        >
          <Annot effect="note">setengah jalan!</Annot>
        </span>
      )}
    </div>
  );
};
