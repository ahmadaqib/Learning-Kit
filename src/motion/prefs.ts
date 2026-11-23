import { useSyncExternalStore } from 'react';
import { MOTION_SCALE } from './tokens';

export type FxTier = 'off' | 'lite' | 'full';
export type MotionMode = 'junior' | 'pro';

export interface MotionPrefs {
  reduced: boolean;
  tier: FxTier;
  scale: number;
  mode: MotionMode;
}

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function getRoot(): HTMLElement | null {
  return typeof document === 'undefined' ? null : document.documentElement;
}

function osReduced(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia(REDUCED_QUERY).matches;
  } catch {
    return false;
  }
}

/** True when the OS asks for reduced motion or the in-app "Kurangi animasi" is `always`. */
export function isReducedMotion(): boolean {
  return osReduced() || getRoot()?.dataset.reducedMotion === 'always' || getRoot()?.hasAttribute('data-lesson-focus') === true;
}

/** Device capability. `off` is decided by `reduced`, not here. */
export function detectDeviceTier(): 'lite' | 'full' {
  if (typeof navigator === 'undefined') return 'full';
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = typeof nav.hardwareConcurrency === 'number' ? nav.hardwareConcurrency : undefined;
  if (cores !== undefined && cores <= 4) return 'lite';
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2) return 'lite';
  return 'full';
}

function getMode(): MotionMode {
  return getRoot()?.dataset.mode === 'pro' ? 'pro' : 'junior';
}

let cachedKey = '';
let cachedPrefs: MotionPrefs = { reduced: false, tier: 'full', scale: 1, mode: 'junior' };

/**
 * The current motion preferences. The returned object is stable until a value changes,
 * so it is safe to use as a useSyncExternalStore snapshot.
 */
export function getMotionPrefs(): MotionPrefs {
  const reduced = isReducedMotion();
  const tier: FxTier = reduced ? 'off' : detectDeviceTier();
  const mode = getMode();
  const key = `${reduced}|${tier}|${mode}`;
  if (key !== cachedKey) {
    cachedKey = key;
    cachedPrefs = { reduced, tier, scale: MOTION_SCALE[mode], mode };
  }
  return cachedPrefs;
}

function subscribe(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  let mql: MediaQueryList | null = null;
  try {
    mql = typeof window.matchMedia === 'function' ? window.matchMedia(REDUCED_QUERY) : null;
  } catch {
    mql = null;
  }
  mql?.addEventListener?.('change', onChange);

  // data-reduced-motion and data-mode are written by AppShell on <html>
  const root = getRoot();
  let observer: MutationObserver | null = null;
  if (root && typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver(onChange);
    observer.observe(root, { attributes: true, attributeFilter: ['data-reduced-motion', 'data-mode', 'data-lesson-focus'] });
  }
  return () => {
    mql?.removeEventListener?.('change', onChange);
    observer?.disconnect();
  };
}

/** Re-renders when the OS setting, the in-app setting or the mode changes. */
export function useMotionPrefs(): MotionPrefs {
  return useSyncExternalStore(subscribe, getMotionPrefs, getMotionPrefs);
}
