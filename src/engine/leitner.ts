import type { Mode } from '@/content/schema';
import { addDaysLocal } from './date';

export type LeitnerBox = 1 | 2 | 3 | 4 | 5;

export interface LeitnerCardState {
  box: LeitnerBox;
  due: string;
  lastResult?: boolean;
  masteredCount?: number;
}

export const LEITNER_INTERVALS: Record<LeitnerBox, number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 14,
};

export const MASTERED_REFRESH_DAYS = 30;

export function scheduleNextCard(
  current: LeitnerCardState | undefined,
  correct: boolean,
  todayStr: string,
): LeitnerCardState {
  const prevBox: LeitnerBox = current?.box ?? 1;
  if (!correct) {
    return {
      box: 1,
      due: addDaysLocal(todayStr, LEITNER_INTERVALS[1]),
      lastResult: false,
      masteredCount: current?.masteredCount ?? 0,
    };
  }

  if (prevBox === 5) {
    return {
      box: 5,
      due: addDaysLocal(todayStr, MASTERED_REFRESH_DAYS),
      lastResult: true,
      masteredCount: (current?.masteredCount ?? 0) + 1,
    };
  }

  const nextBox = Math.min(5, prevBox + 1) as LeitnerBox;
  return {
    box: nextBox,
    due: addDaysLocal(todayStr, LEITNER_INTERVALS[nextBox]),
    lastResult: true,
    masteredCount: current?.masteredCount ?? 0,
  };
}

export function getDueLeitnerCards(
  leitner: Record<string, LeitnerCardState>,
  todayStr: string,
  mode: Mode,
): { cardId: string; state: LeitnerCardState }[] {
  const limit = mode === 'junior' ? 5 : 10;
  return Object.entries(leitner)
    .filter(([, state]) => state.due <= todayStr)
    .sort(([, a], [, b]) => a.due.localeCompare(b.due))
    .slice(0, limit)
    .map(([cardId, state]) => ({ cardId, state }));
}

export function countAllDueCards(
  leitner: Record<string, LeitnerCardState>,
  todayStr: string,
): number {
  return Object.values(leitner).filter((state) => state.due <= todayStr).length;
}

export function getBoxDistribution(
  leitner: Record<string, LeitnerCardState>,
): Record<LeitnerBox, number> {
  const counts: Record<LeitnerBox, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const state of Object.values(leitner)) {
    counts[state.box] = (counts[state.box] || 0) + 1;
  }
  return counts;
}
