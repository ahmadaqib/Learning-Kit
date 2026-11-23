import React, { useRef, useState } from 'react';
import { Lock, Star } from 'lucide-react';
import { useMotionPrefs } from '@/motion/prefs';
import { stickerTilt } from '@/motion/tokens';
import { useSheen } from '@/motion/useSheen';

export interface StickerCardProps {
  /** Sticker title, shown under the art. */
  title: string;
  /** Pro shows this under the art instead of the title (the concept name). */
  conceptName?: string;
  /** The art: a ConceptVisual or any illustration. */
  art: React.ReactNode;
  /** Optional status shown above the illustration on the front. */
  badge?: React.ReactNode;
  /** The back of the card: the analogy summary. */
  summary: React.ReactNode;
  /** `gold` for a lesson with three stars: gold outline, a star and "emas" on the back. */
  finish?: 'plain' | 'gold';
  /** Unowned: flat, dashed, not tappable. */
  locked?: boolean;
  /** What unlocks it, e.g. the lesson name. Shown when locked. */
  lockedHint?: string;
  /** Position in a grid. Picks the deterministic tilt (-3, 2, -1.5, 3 degrees). */
  index?: number;
  /** An explicit tilt in degrees, overriding `index`. */
  tilt?: number;
  /** Controlled flip state. Leave undefined for an uncontrolled card. */
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
  /** Play the one-shot sheen sweep (M30): after the slap lands, or the first time a gold card is shown. */
  sheen?: boolean;
  /** When the sheen starts, Junior ms (80 ms after the slap's impact at 228 ms is 308). */
  sheenAt?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A collectible sticker (Junior) or upright concept card (Pro): the same component, restyled by `[data-mode]`
 * (spec 4.8). Tapping flips it (M31): a real <button aria-pressed>, a transition that retargets if tapped again
 * mid-flip, and a 120 ms cross-fade under reduced motion. Owned cards move a soft highlight with the pointer
 * (M03, `useSheen`). A locked card is flat and not a button.
 */
export const StickerCard: React.FC<StickerCardProps> = ({
  title,
  conceptName,
  art,
  badge,
  summary,
  finish = 'plain',
  locked = false,
  lockedHint,
  index = 0,
  tilt,
  flipped: flippedProp,
  onFlip,
  sheen = false,
  sheenAt = 0,
  className = '',
  style,
}) => {
  const { mode } = useMotionPrefs();
  const [inner, setInner] = useState(false);
  const frontRef = useRef<HTMLSpanElement>(null);
  useSheen(frontRef);

  const flipped = flippedProp ?? inner;
  const gold = finish === 'gold';
  const label = mode === 'pro' ? (conceptName ?? title) : title;
  const cardStyle = { '--tilt': `${tilt ?? stickerTilt(index)}deg`, ...style } as React.CSSProperties;

  if (locked) {
    return (
      <div
        className={`pw-sticker pw-sticker-card flex flex-col items-center gap-2 p-3 text-center ${className}`.trim()}
        data-locked="true"
        style={cardStyle}
      >
        <Lock className="h-6 w-6 text-[var(--ink-3)]" aria-hidden="true" />
        <span className="pw-small font-bold text-[var(--ink-2)]">Terkunci</span>
        {lockedHint && <span className="pw-small text-[var(--ink-3)]">{lockedHint}</span>}
      </div>
    );
  }

  const toggle = () => {
    const next = !flipped;
    if (flippedProp === undefined) setInner(next);
    onFlip?.(next);
  };

  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={toggle}
      data-finish={gold ? 'gold' : undefined}
      data-press="lg"
      className={`pw-sticker pw-sticker-card pw-flip pw-pressable pw-lift relative block w-full cursor-pointer text-left ${className}`.trim()}
      style={cardStyle}
    >
      <span className="pw-flip-inner block rounded-[inherit]">
        <span
          ref={frontRef}
          aria-hidden={flipped || undefined}
          className="pw-flip-face pw-flip-front pw-sheen-host block rounded-[inherit] bg-[var(--paper)] p-3"
        >
          {badge && <span className="mb-1 flex justify-end">{badge}</span>}
          <span className="block">{art}</span>
          <span className="pw-small mt-2 flex items-center justify-between gap-2 font-bold text-[var(--ink)]">
            <span>{label}</span>
            {gold && (
              <Star
                className="h-4 w-4 flex-shrink-0 text-[var(--star)]"
                fill="currentColor"
                aria-hidden="true"
              />
            )}
          </span>
          <span className="pw-sheen-blob" aria-hidden="true" />
          {sheen && (
            <>
              <span className="pw-fx-sheen" style={{ '--at': `${sheenAt}ms` } as React.CSSProperties} />
              {gold && (
                <span
                  className="pw-fx-sheen"
                  data-tone="gold"
                  style={{ '--at': `${sheenAt + 200}ms` } as React.CSSProperties}
                />
              )}
            </>
          )}
        </span>
        <span
          aria-hidden={!flipped || undefined}
          className="pw-flip-face pw-flip-back flex flex-col justify-center gap-2 overflow-auto rounded-[inherit] bg-[var(--paper)] p-3"
        >
          <span className="pw-small block text-[var(--ink)]">{summary}</span>
          {gold && (
            <span className="pw-small inline-flex items-center gap-1 font-bold text-[var(--star-700)]">
              <Star className="h-4 w-4" fill="currentColor" aria-hidden="true" />
              {mode === 'pro' ? 'tiga bintang' : 'emas'}
            </span>
          )}
        </span>
      </span>
    </button>
  );
};
