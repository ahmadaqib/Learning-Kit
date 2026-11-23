import React from 'react';
import { WORLD_META_BY_ID } from '@/content/worldMeta';

interface WorldThemeWrapperProps {
  worldId?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Sets the world on a subtree. The scale (--world-50 to --world-700) and the aliases (--surface-stage,
 * --on-poster, --doodle, --illus-accent) are declared for every `[data-world-id]` in tokens.css, so setting
 * `--world` here is all it takes, in light and dark. An unknown world keeps the default accent from `:root`.
 */
export const WorldThemeWrapper: React.FC<WorldThemeWrapperProps> = ({
  worldId = 'a01',
  children,
  className = '',
}) => {
  const meta = WORLD_META_BY_ID[worldId];
  const isYellow = Boolean(meta?.isYellow);

  return (
    <div
      data-world-id={worldId}
      data-world-yellow={isYellow ? 'true' : undefined}
      style={meta ? ({ '--world': meta.color } as React.CSSProperties) : undefined}
      className={`w-full ${className}`.trim()}
    >
      {children}
    </div>
  );
};
