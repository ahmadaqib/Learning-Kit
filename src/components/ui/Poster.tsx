import React from 'react';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';

interface PosterProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render. Default 'section'. */
  as?: 'section' | 'div' | 'header' | 'article';
}

/**
 * The one saturated, world-coloured block of a screen (spec 4.1). Text and icons on it use
 * `--on-poster` at full opacity: never reduce its opacity, never put text on an illustration inside it.
 * Place it inside a WorldThemeWrapper so --world-600 and --on-poster follow the world. No sheen, no float.
 * Add `pw-stagger` or children with `pw-enter` only on the screens that spec 5.9.4 M07 allows.
 */
export const Poster: React.FC<PosterProps> = ({ as: Tag = 'section', className = '', children, ...rest }) => (
  <Tag className={`pw-poster p-[var(--space-card)] ${className}`.trim()} {...rest}>
    {children}
  </Tag>
);

interface PosterHeadingProps {
  worldId: string;
  worldTitle: string;
  locked?: boolean;
  tilt?: number;
  children: React.ReactNode;
}

/** Reserve a column and rotation clearance for the world sticker within the poster. */
export const PosterHeading: React.FC<PosterHeadingProps> = ({ worldId, worldTitle, locked, tilt = 4, children }) => (
  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
    <div className="min-w-0">{children}</div>
    <span className="pw-sticker block" style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}>
      <WorldIslandIllustration worldId={worldId} size={96} locked={locked} label={`Pulau ${worldTitle}`} />
    </span>
  </div>
);
