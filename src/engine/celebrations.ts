/**
 * A module-level queue of full-screen celebrations. Not persisted.
 * The weekly target is never an overlay: it is always inline in the week strip (spec 5.9.5 G).
 */
import { useMemo, useSyncExternalStore } from 'react';

export type CelebrationEvent =
  | { kind: 'levelUp'; level: number; title: string }
  | { kind: 'worldUnlock'; worldId: string };

const PRIORITY: Record<CelebrationEvent['kind'], number> = {
  levelUp: 0,
  worldUnlock: 1,
};

let queue: CelebrationEvent[] = [];
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((listener) => listener());
}

/** Add a celebration. A level-up always shows before a world unlock, whatever the call order. */
export function celebrate(event: CelebrationEvent): void {
  queue = [...queue, event].sort((a, b) => PRIORITY[a.kind] - PRIORITY[b.kind]);
  emit();
}

/** Close the celebration that is showing and move to the next one. */
export function dismissCelebration(): void {
  if (queue.length === 0) return;
  queue = queue.slice(1);
  emit();
}

/** The celebration that should be showing now, or null. */
export function getCurrentCelebration(): CelebrationEvent | null {
  return queue[0] ?? null;
}

/** Drop everything. For tests and for sign-out style resets. */
export function clearCelebrations(): void {
  if (queue.length === 0) return;
  queue = [];
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useCelebrations(): { current: CelebrationEvent | null; dismiss: () => void } {
  const current = useSyncExternalStore(subscribe, getCurrentCelebration, getCurrentCelebration);
  return useMemo(() => ({ current, dismiss: dismissCelebration }), [current]);
}
