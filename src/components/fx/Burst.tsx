import React, { useState } from 'react';
import { useMotionPrefs } from '@/motion/prefs';

export interface BurstProps {
  /** Strokes: 4 (dust), 6 (correct sparks) or 8 (a combo of five). */
  count?: 4 | 6 | 8;
  /** Start time inside a sequence, Junior ms. */
  at?: number;
  /** Distance from the centre where the strokes start, px. */
  radius?: number;
  /** How far each stroke travels outward, px. */
  travel?: number;
  /** Junior ms. 320 for sparks (default), 240 for dust. */
  duration?: number;
  /** Any CSS colour. Defaults to var(--star). */
  color?: string;
  className?: string;
}

const START_ANGLE: Record<4 | 6 | 8, number> = { 4: 45, 6: 30, 8: 22.5 };

/**
 * Sparks and dust: short strokes that leave a centre point along their own angle and fade (M19, M30, M36).
 * It is absolutely positioned at the centre of its (positioned) parent, aria-hidden, and removes itself when
 * the last stroke ends. Not rendered at all when tier is `off` (reduced motion). The caller decides whether
 * the moment earns sparks (Junior, tier full, first try).
 */
export const Burst: React.FC<BurstProps> = ({
  count = 6,
  at = 0,
  radius = 18,
  travel = 14,
  duration = 320,
  color,
  className = '',
}) => {
  const prefs = useMotionPrefs();
  const [ended, setEnded] = useState(0);
  if (prefs.tier === 'off' || ended >= count) return null;

  return (
    <span
      aria-hidden="true"
      className={['pw-burst', className].filter(Boolean).join(' ')}
      style={color ? { color } : undefined}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="pw-burst-s"
          onAnimationEnd={() => setEnded((n) => n + 1)}
          style={
            {
              '--a': `${START_ANGLE[count] + (360 / count) * i}deg`,
              '--r': `${radius}px`,
              '--travel': `${travel}px`,
              '--fx-dur': `${duration}ms`,
              '--at': `${at}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
};
