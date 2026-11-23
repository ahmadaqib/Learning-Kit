/**
 * The stopping point (spec 5.6, "A stopping point"). In memory only: it lasts as long as the app stays open,
 * so closing the tab starts a new sitting. Nothing here locks anything. It only decides which of the two
 * result buttons is the primary one.
 */
import type { Mode } from '@/content/schema';

let finishedThisSitting = 0;

/** Call once when a lesson is completed. Returns how many lessons have been finished since the app opened. */
export function noteLessonFinished(): number {
  finishedThisSitting += 1;
  return finishedThisSitting;
}

export function lessonsFinishedThisSitting(): number {
  return finishedThisSitting;
}

export function resetSitting(): void {
  finishedThisSitting = 0;
}

/** The lesson count at which "Selesai untuk hari ini" becomes the primary button. */
export const STOPPING_POINT_AFTER = 2;

/**
 * True when "Selesai untuk hari ini" should be primary: this is the second lesson finished in this sitting
 * (or a later one), or, in Junior, the break reminder came due during the lesson.
 */
export function isStoppingPoint(opts: { mode: Mode; finishedCount: number; breakDue: boolean }): boolean {
  if (opts.finishedCount >= STOPPING_POINT_AFTER) return true;
  return opts.mode === 'junior' && opts.breakDue;
}
