import React from 'react';
import { WORLD_META_BY_ID } from '@/content/worldMeta';

interface WorldThemeWrapperProps {
  worldId?: string;
  children: React.ReactNode;
  className?: string;
}

export const WorldThemeWrapper: React.FC<WorldThemeWrapperProps> = ({
  worldId = 'a01',
  children,
  className = '',
}) => {
  const meta = WORLD_META_BY_ID[worldId];
  const color = meta?.color ?? '#E4572E';
  const isYellow = Boolean(meta?.isYellow);

  return (
    <div
      data-world-id={worldId}
      data-world-yellow={isYellow ? 'true' : undefined}
      style={{ '--world': color } as React.CSSProperties}
      className={`w-full ${className}`.trim()}
    >
      {children}
    </div>
  );
};
