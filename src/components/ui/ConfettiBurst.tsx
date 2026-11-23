import React, { useLayoutEffect, useState } from 'react';
import { CONFETTI_COUNT } from '@/motion/tokens';
import { useMotionPrefs } from '@/motion/prefs';

interface ConfettiBurstProps {
  active: boolean;
  /** Piece count. Defaults to 28 (tier full) or 12 (tier lite). Never more than 28. */
  pieces?: number;
  /** The element the burst leaves from (the star row, the gate seam). Without it the burst leaves the upper middle. */
  origin?: React.RefObject<HTMLElement | null>;
}

/** Colours are tokens, so the burst follows the theme and the world. */
const COLORS = ['var(--star)', 'var(--world-600)', 'var(--world-100)', 'var(--ok-500)'] as const;

/** Fractional part of i * k: a cheap, deterministic spread that covers the range for any prefix of pieces. */
const spread = (i: number, k: number, offset = 0) => (((i * k + offset) % 1) + 1) % 1;

/**
 * Per-piece custom properties by index (spec 5.9.4 M28): --dx -160..160 px, --peak -80..-220 px,
 * --fall 240..420 px, --rot +-540 deg, --dur 1000..1300 ms, --at 0..90 ms. Nothing is random per render.
 */
function pieceStyle(i: number): React.CSSProperties {
  return {
    '--dx': `${Math.round(-160 + 320 * spread(i, 0.618034, 0.12))}px`,
    '--peak': `${Math.round(-80 - 140 * spread(i, 0.381966, 0.2))}px`,
    '--fall': `${Math.round(240 + 180 * spread(i, 0.754878))}px`,
    '--rot': `${Math.round((spread(i, 0.569840, 0.3) * 2 - 1) * 540)}deg`,
    '--dur': `${Math.round(1000 + 300 * spread(i, 0.707107))}ms`,
    '--at': `${(i % 7) * 15}ms`,
    '--c': COLORS[i % COLORS.length],
  } as React.CSSProperties;
}

/** Rectangles, dots and four strokes ("sparks") in a full burst. */
function pieceShape(i: number): 'rect' | 'dot' | 'spark' {
  if (i % 7 === 3) return 'spark';
  if (i % 3 === 1) return 'dot';
  return 'rect';
}

interface Anchor {
  x: number;
  y: number;
  ended: number;
}

/**
 * Confetti (M28): pieces leave the centre of `origin`, out fast and then gravity. The keyframe and the piece
 * look live in motion.css (`.pw-confetti-piece`). Not rendered at all when the effect tier is `off`
 * (reduced motion, OS or in-app). Pieces count their own `animationend` and the layer unmounts after the last one.
 */
export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ active, pieces, origin }) => {
  const { tier } = useMotionPrefs();
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  useLayoutEffect(() => {
    if (!active || tier === 'off') {
      setAnchor(null);
      return;
    }
    const el = origin?.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setAnchor({ x: r.left + r.width / 2, y: r.top + r.height / 2, ended: 0 });
    } else {
      setAnchor({ x: window.innerWidth / 2, y: window.innerHeight * 0.4, ended: 0 });
    }
  }, [active, tier, origin]);

  if (!active || tier === 'off' || !anchor) return null;

  const max = tier === 'full' ? CONFETTI_COUNT.full : CONFETTI_COUNT.lite;
  const count = Math.max(0, Math.min(pieces ?? max, CONFETTI_COUNT.full));
  if (anchor.ended >= count) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div className="absolute h-0 w-0" style={{ left: anchor.x, top: anchor.y }}>
        {Array.from({ length: count }, (_, i) => {
          const shape = pieceShape(i);
          return (
            <span
              key={i}
              className="pw-confetti-piece"
              data-shape={shape === 'rect' ? undefined : shape}
              style={pieceStyle(i)}
              onAnimationEnd={() => setAnchor((a) => (a ? { ...a, ended: a.ended + 1 } : a))}
            />
          );
        })}
      </div>
    </div>
  );
};
