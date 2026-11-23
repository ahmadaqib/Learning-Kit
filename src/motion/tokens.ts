/**
 * Motion tokens for WAAPI code. Mirrors spec 5.9.2 and the custom properties in src/styles/tokens.css.
 * Names and values must stay identical to the CSS: tests/motion.test.ts compares them.
 */

export const EASE = {
  out: 'cubic-bezier(0.23, 1, 0.32, 1)',
  inOut: 'cubic-bezier(0.77, 0, 0.175, 1)',
  drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
  outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  impact: 'cubic-bezier(0.55, 0, 0.9, 0.4)',
} as const;

/** Gravity segment of a confetti piece (spec 5.9.4 M28). */
export const EASE_GRAVITY = 'cubic-bezier(0.45, 0, 0.9, 0.55)';

/** Milliseconds. `press` and `fast` are never scaled by the motion scale. */
export const DUR = {
  press: 120,
  fast: 140,
  base: 180,
  pop: 220,
  slow: 280,
  draw: 400,
  travel: 480,
  celebrate: 1200,
} as const;

export type EaseName = keyof typeof EASE;
export type DurName = keyof typeof DUR;

/** Durations that are not multiplied by the motion scale. */
export const UNSCALED_DURATIONS: readonly DurName[] = ['press', 'fast'];

export const MOTION_SCALE = { junior: 1, pro: 0.7 } as const;

/** Particle caps (spec 9.3). */
export const CONFETTI_COUNT = { full: 28, lite: 12 } as const;
export const MAX_ANIMATED_ELEMENTS = 40;

/** `--ease-pop` is the spring in Junior and plain ease-out in Pro. */
export function easePop(mode: 'junior' | 'pro'): string {
  return mode === 'pro' ? EASE.out : EASE.spring;
}

/** Scale a duration or a start time by the motion scale. Returns whole milliseconds. */
export function scaled(ms: number, scale: number): number {
  return Math.round(ms * scale);
}

/** Deterministic sticker tilt cycle in degrees (spec 4.8). Never random per render. Pro halves it in CSS. */
export const STICKER_TILTS = [-3, 2, -1.5, 3] as const;

export function stickerTilt(index: number): number {
  const n = STICKER_TILTS.length;
  return STICKER_TILTS[((Math.floor(index) % n) + n) % n];
}
