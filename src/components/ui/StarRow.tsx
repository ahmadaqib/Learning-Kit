import React from 'react';
import { Star } from 'lucide-react';
import { Doodle } from '@/components/fx/Doodle';
import { useMotionPrefs } from '@/motion/prefs';

interface StarRowProps {
  stars: 0 | 1 | 2 | 3;
  size?: number;
  /** Older name for `stamp`. Either one plays the stamp. */
  animated?: boolean;
  /** Stamp the earned stars in one after another (M27): each accelerates into the page and settles. */
  stamp?: boolean;
  /** Start of the first stamp inside a sequence, Junior ms. Earned stars then start at +0, +160 and +300. */
  at?: number;
  /** Junior only: a small spark draws next to each earned star on its impact frame (165 ms after its start). */
  sparks?: boolean;
}

/** Start of each earned star relative to the first (spec 5.9.4 M27). The impact frame is 165 ms after a start. */
const STAMP_OFFSETS = [0, 160, 300] as const;
const IMPACT_MS = 165;

export const StarRow: React.FC<StarRowProps> = ({
  stars,
  size = 28,
  animated = false,
  stamp = false,
  at = 0,
  sparks = false,
}) => {
  const { mode, tier } = useMotionPrefs();
  const stamping = stamp || animated;
  const showSparks = sparks && mode === 'junior' && tier !== 'off';

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`Mendapat ${stars} dari 3 bintang`} role="img">
      {[1, 2, 3].map((idx) => {
        const filled = idx <= stars;
        const start = at + STAMP_OFFSETS[idx - 1];
        return (
          <span
            key={idx}
            className={`relative inline-flex ${stamping && filled ? 'pw-fx-stamp' : ''}`}
            style={stamping && filled ? ({ '--at': `${start}ms` } as React.CSSProperties) : undefined}
          >
            <Star
              width={size}
              height={size}
              aria-hidden="true"
              strokeWidth={filled ? 2 : 2.25}
              strokeDasharray={filled ? undefined : '3.2 3.2'}
              style={{
                fill: filled ? 'var(--star)' : 'transparent',
                color: filled ? 'var(--star-700)' : 'var(--ink-3)',
              }}
            />
            {showSparks && filled && (
              <Doodle
                name="spark"
                draw
                at={start + IMPACT_MS}
                width={Math.round(size * 0.55)}
                style={{ position: 'absolute', right: -size * 0.3, top: -size * 0.3, color: 'var(--star-700)' }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};
