import React from 'react';
import { Star } from 'lucide-react';

interface StarRowProps {
  stars: 0 | 1 | 2 | 3;
  size?: number;
  animated?: boolean;
}

export const StarRow: React.FC<StarRowProps> = ({ stars, size = 28, animated = false }) => {
  return (
    <div
      className="inline-flex items-center gap-1.5"
      aria-label={`Mendapat ${stars} dari 3 bintang`}
    >
      {[1, 2, 3].map((idx) => {
        const filled = idx <= stars;
        return (
          <Star
            key={idx}
            width={size}
            height={size}
            aria-hidden="true"
            className={animated && filled ? 'pw-anim-star' : ''}
            style={{
              animationDelay: animated ? `${(idx - 1) * 180}ms` : undefined,
              fill: filled ? 'var(--star)' : 'transparent',
              color: filled ? 'var(--star)' : 'var(--ink-3)',
            }}
          />
        );
      })}
    </div>
  );
};
