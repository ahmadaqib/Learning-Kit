import { useEffect, useRef, useState } from 'react';
import { useMotionPrefs } from './prefs';

export interface CountUpOptions {
  /** Junior milliseconds. 300 for the session chip, 600 for result lines. Capped at 900 (spec 9.5). */
  duration?: number;
  /** Start time inside a sequence, Junior milliseconds. */
  delay?: number;
  /** The value shown before the first count. Defaults to 0. Pass the current value for a chip that retargets. */
  from?: number;
  /** Jump to the final number (a skipped sequence, data-seq="done"). */
  skip?: boolean;
  /** False shows the final number at once. */
  enabled?: boolean;
}

export const MAX_COUNT_UP_MS = 900;

/** Cubic ease-out, 0..1. */
export function easeOutCubic(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return 1 - (1 - c) ** 3;
}

/**
 * The displayed value of a number that counts up to `target` with a requestAnimationFrame loop and a cubic
 * ease-out. Reduced motion, a hidden document, `skip` and `enabled: false` show the final number at once.
 * When `target` changes the count restarts from the number that is on screen. The loop stops by itself.
 */
export function useCountUp(target: number, opts: CountUpOptions = {}): number {
  const { duration = 600, delay = 0, from = 0, skip = false, enabled = true } = opts;
  const prefs = useMotionPrefs();
  const immediate = prefs.reduced || skip || !enabled;
  const [value, setValue] = useState<number>(immediate ? target : from);
  const shown = useRef<number>(value);

  useEffect(() => {
    const finalValue = target;
    const show = (v: number) => {
      shown.current = v;
      setValue(v);
    };

    if (immediate) {
      // The hook already returns `target` while immediate, so no state update is needed
      shown.current = finalValue;
      return undefined;
    }
    if (typeof document !== 'undefined' && document.hidden) {
      show(finalValue);
      return undefined;
    }

    const startValue = shown.current;
    if (startValue === finalValue) return undefined;

    const total = Math.min(duration, MAX_COUNT_UP_MS) * prefs.scale;
    const wait = delay * prefs.scale;
    let frame = 0;
    let startedAt: number | null = null;
    let cancelled = false;

    const tick = (now: number) => {
      if (cancelled) return;
      if (typeof document !== 'undefined' && document.hidden) {
        show(finalValue);
        return;
      }
      if (startedAt === null) startedAt = now;
      const elapsed = now - startedAt - wait;
      if (elapsed < 0) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const t = total <= 0 ? 1 : elapsed / total;
      if (t >= 1) {
        show(finalValue);
        return;
      }
      show(Math.round(startValue + (finalValue - startValue) * easeOutCubic(t)));
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [target, duration, delay, immediate, prefs.scale]);

  return immediate ? target : value;
}
