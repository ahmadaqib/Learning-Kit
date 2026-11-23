import React from 'react';
import { useMotionPrefs } from '@/motion/prefs';

export interface KineticTextProps {
  text: string;
  /** The element to render. Default 'span'. */
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  /** Start time inside a sequence, Junior ms. */
  at?: number;
  /** After the letters pop in, jitter them for three cycles, then rest (M06). Default false. */
  boil?: boolean;
}

/**
 * Kinetic headline (M06). Letters pop in (opacity, translateY .35em, rotate -6deg, 260 ms spring, start
 * min(i x 24, 360) ms), then optionally "boil": a two-frame jitter, 700 ms, three cycles.
 *
 * Junior only: Pro, reduced motion and "Teks nyaman dibaca" all render plain text. Used on Onboarding step 1,
 * the three-star result and the boss intro, nowhere else. The full string is rendered once in a visually
 * hidden element and the animated letters are aria-hidden.
 */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  as: Tag = 'span',
  className = '',
  at,
  boil = false,
}) => {
  const prefs = useMotionPrefs();
  const comfort = typeof document !== 'undefined' && document.documentElement.dataset.reading === 'comfort';

  if (prefs.reduced || prefs.mode === 'pro' || comfort) {
    return <Tag className={className || undefined}>{text}</Tag>;
  }

  const words = text.split(' ');
  let index = 0;
  const style = at !== undefined ? ({ '--at': `${at}ms` } as React.CSSProperties) : undefined;

  return (
    <Tag className={[className, boil ? 'pw-boil' : ''].filter(Boolean).join(' ') || undefined} style={style}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <React.Fragment key={w}>
            {w > 0 && ' '}
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {Array.from(word).map((char) => {
                const i = index;
                index += 1;
                return (
                  <span key={i} className="pw-kt-letter" style={{ '--i': i } as React.CSSProperties}>
                    {char}
                  </span>
                );
              })}
            </span>
          </React.Fragment>
        ))}
      </span>
    </Tag>
  );
};
