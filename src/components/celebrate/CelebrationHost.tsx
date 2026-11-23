import React, { Suspense, lazy, useRef } from 'react';
import { useCelebrations, type CelebrationEvent } from '@/engine/celebrations';

// The overlays are rare. They load only when the first celebration is shown.
const LevelUpOverlay = lazy(() =>
  import('./LevelUpOverlay').then((m) => ({ default: m.LevelUpOverlay })),
);
const WorldUnlockOverlay = lazy(() =>
  import('./WorldUnlockOverlay').then((m) => ({ default: m.WorldUnlockOverlay })),
);

/**
 * Mounted once inside AppShell. Shows the celebration at the head of the queue from `useCelebrations()`:
 * a level-up always before a world unlock (the queue sorts that). Closing an overlay dismisses it, and the next
 * one mounts fresh, so two level-ups in a row each play their own sequence.
 */
export const CelebrationHost: React.FC = () => {
  const { current, dismiss } = useCelebrations();

  // A new queue head is a new overlay instance, even when it has the same kind.
  const lastEvent = useRef<CelebrationEvent | null>(null);
  const instance = useRef(0);
  if (current !== lastEvent.current) {
    lastEvent.current = current;
    instance.current += 1;
  }

  if (!current) return null;

  return (
    <Suspense fallback={null}>
      {current.kind === 'levelUp' ? (
        <LevelUpOverlay
          key={instance.current}
          level={current.level}
          title={current.title}
          onClose={dismiss}
        />
      ) : (
        <WorldUnlockOverlay key={instance.current} worldId={current.worldId} onClose={dismiss} />
      )}
    </Suspense>
  );
};
