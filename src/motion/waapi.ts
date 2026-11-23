/**
 * Imperative motion helpers: choreographed sequences, one-off effects and the XP fly.
 * Spec 5.9.5 A, 5.9.6 and 5.9.7. CSS handles everything that can be a class; this file is for timing
 * (cues), for effects that need measured geometry (flyTo) and for one-offs (fx).
 */
import { EASE, DUR } from './tokens';
import { getMotionPrefs } from './prefs';

// ---------------------------------------------------------------------------------------------
// runSequence
// ---------------------------------------------------------------------------------------------

/** `at` is in Junior milliseconds from the start of the sequence. */
export interface Cue {
  at: number;
  run: (ctx: { skipped: boolean }) => void;
}

export interface SequenceHandle {
  /** Finish now: remaining cues run at once with skipped: true, and data-seq becomes "done". */
  skip(): void;
  /** Leave the screen: timers are cleared and nothing else runs. */
  cancel(): void;
}

/**
 * Schedule cues inside a `.pw-seq` container. Every time is multiplied by the motion scale.
 *
 * - A pointerdown, or Enter, Space or Escape, anywhere in the container skips the sequence. The event is
 *   not cancelled, so a tap on the primary button skips and activates the button.
 * - A hidden document skips it too.
 * - When motion is reduced every cue runs at once with skipped: true, so sound cues stay silent and
 *   state cues (count-ups, queueing a celebration) still apply.
 * - Skipped cues receive skipped: true. Sound cues must check it. State cues must not.
 * - onDone runs once, after the last cue, also after skip(). It does not run after cancel().
 */
export function runSequence(
  root: HTMLElement,
  cues: Cue[],
  opts: { onDone?: () => void } = {},
): SequenceHandle {
  const prefs = getMotionPrefs();
  const ordered = [...cues].sort((a, b) => a.at - b.at);
  const pending = new Set<number>();
  const timers: Array<ReturnType<typeof setTimeout>> = [];
  let finished = false;
  let cancelled = false;

  const hasDocument = typeof document !== 'undefined';

  const detach = () => {
    root.removeEventListener('pointerdown', onSkipEvent, true);
    root.removeEventListener('keydown', onKeyEvent, true);
    if (hasDocument) document.removeEventListener('visibilitychange', onVisibility);
  };

  const finish = () => {
    if (finished || cancelled) return;
    finished = true;
    detach();
    opts.onDone?.();
  };

  const runCue = (index: number, skipped: boolean) => {
    if (!pending.has(index) || cancelled) return;
    pending.delete(index);
    ordered[index].run({ skipped });
    if (pending.size === 0) finish();
  };

  const skip = () => {
    if (finished || cancelled) return;
    root.dataset.seq = 'done';
    timers.forEach(clearTimeout);
    timers.length = 0;
    const rest = Array.from(pending).sort((a, b) => a - b);
    detach();
    for (const index of rest) {
      if (cancelled) return;
      pending.delete(index);
      ordered[index].run({ skipped: true });
    }
    finish();
  };

  const cancel = () => {
    if (cancelled || finished) return;
    cancelled = true;
    timers.forEach(clearTimeout);
    timers.length = 0;
    pending.clear();
    detach();
  };

  function onSkipEvent() {
    skip();
  }
  function onKeyEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') skip();
  }
  function onVisibility() {
    if (document.hidden) skip();
  }

  ordered.forEach((_, index) => pending.add(index));

  if (ordered.length === 0) {
    finish();
    return { skip, cancel };
  }

  if (prefs.reduced) {
    // Everything at once, silent. Reduced motion does not set data-seq, the CSS contract already collapses it.
    for (let i = 0; i < ordered.length; i += 1) {
      if (cancelled) break;
      pending.delete(i);
      ordered[i].run({ skipped: true });
    }
    finish();
    return { skip, cancel };
  }

  root.dataset.seq = 'run';
  root.addEventListener('pointerdown', onSkipEvent, true);
  root.addEventListener('keydown', onKeyEvent, true);
  if (hasDocument) {
    document.addEventListener('visibilitychange', onVisibility);
    if (document.hidden) {
      skip();
      return { skip, cancel };
    }
  }

  ordered.forEach((cue, index) => {
    const delay = Math.round(cue.at * prefs.scale);
    if (delay <= 0) {
      runCue(index, false);
    } else {
      timers.push(setTimeout(() => runCue(index, false), delay));
    }
  });

  return { skip, cancel };
}

// ---------------------------------------------------------------------------------------------
// fx
// ---------------------------------------------------------------------------------------------

/**
 * A one-off Web Animation for an effect that has no class. `duration` and `delay` are Junior values and are
 * multiplied by the motion scale. Returns null when motion is reduced, the document is hidden or the
 * browser cannot animate. Fill is `backwards`: the element returns to its own style when it ends.
 */
export function fx(
  el: Element,
  keyframes: Keyframe[],
  opts: { duration: number; easing?: string; delay?: number },
): Animation | null {
  const prefs = getMotionPrefs();
  if (prefs.reduced || typeof el.animate !== 'function') return null;
  if (typeof document !== 'undefined' && document.hidden) return null;
  return el.animate(keyframes, {
    duration: Math.max(1, Math.round(opts.duration * prefs.scale)),
    delay: Math.round((opts.delay ?? 0) * prefs.scale),
    easing: opts.easing ?? EASE.out,
    fill: 'backwards',
  });
}

// ---------------------------------------------------------------------------------------------
// flyTo
// ---------------------------------------------------------------------------------------------

export interface FlyOptions {
  /** 2 adds two small stars on the same path (combo of three or more, Junior, tier full). */
  trail?: 0 | 2;
  onArrive?: () => void;
}

export interface FlyHandle {
  /** Land now: the clone is removed and onArrive runs at once (once only). */
  finish(): void;
}

let activeFly: FlyHandle | null = null;

/** Land the fly that is in flight, if any. Call it on route changes. */
export function finishFly(): void {
  activeFly?.finish();
}

const NOOP_HANDLE: FlyHandle = { finish() {} };

function center(rect: DOMRect): { x: number; y: number } {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function makeChip(source: Element, rect: DOMRect, scale: number, trailStar: boolean): HTMLElement {
  const outer = document.createElement('div');
  outer.setAttribute('aria-hidden', 'true');
  Object.assign(outer.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: '0',
    pointerEvents: 'none',
    zIndex: '100',
  });
  const inner = document.createElement('div');
  Object.assign(inner.style, { width: '100%', height: '100%', transformOrigin: 'center' });
  if (trailStar) {
    inner.textContent = '★';
    Object.assign(inner.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--star)',
      fontSize: `${Math.max(10, rect.height * scale)}px`,
      lineHeight: '1',
    });
  } else {
    const clone = source.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');
    clone.style.margin = '0';
    clone.style.width = '100%';
    clone.style.height = '100%';
    inner.appendChild(clone);
    const computed = getComputedStyle(source);
    Object.assign(inner.style, {
      fontFamily: computed.fontFamily,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      lineHeight: computed.lineHeight,
      color: computed.color,
    });
  }
  outer.appendChild(inner);
  return outer;
}

/**
 * The XP chip arrives at the header counter on an arc (spec 5.9.5 A). Two nested elements keep every
 * animated property on transform and opacity: the outer one travels on x with ease-in-out, the inner one on y
 * with ease-out while it swells to 1.15 at 30% and shrinks to 0.6. Opacity stays 1 until 80%.
 *
 * Only one fly is in flight: a new call lands the current one first. When motion is reduced, the document is
 * hidden, or either element is missing, onArrive runs at once and nothing is drawn.
 */
export function flyTo(source: Element | null, target: Element | null, opts: FlyOptions = {}): FlyHandle {
  finishFly();
  const prefs = getMotionPrefs();
  const hidden = typeof document !== 'undefined' && document.hidden;
  if (
    !source ||
    !target ||
    !source.isConnected ||
    !target.isConnected ||
    prefs.reduced ||
    hidden ||
    typeof document === 'undefined' ||
    typeof HTMLElement.prototype.animate !== 'function'
  ) {
    opts.onArrive?.();
    return NOOP_HANDLE;
  }

  const sourceRect = source.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const from = center(sourceRect);
  const to = center(targetRect);
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const duration = Math.max(1, Math.round(DUR.travel * prefs.scale));

  const layer = document.getElementById('fx-layer') ?? document.body;
  const trail = opts.trail === 2 ? [{ delay: 50, size: 0.7 }, { delay: 90, size: 0.5 }] : [];

  const elements: HTMLElement[] = [];
  const animations: Animation[] = [];

  const launch = (chip: HTMLElement, delay: number, size: number) => {
    layer.appendChild(chip);
    elements.push(chip);
    const inner = chip.firstElementChild as HTMLElement;
    const base = { duration, delay: Math.round(delay * prefs.scale), fill: 'both' as const };
    const outer = chip.animate(
      [{ transform: 'translateX(0px)' }, { transform: `translateX(${dx}px)` }],
      { ...base, easing: EASE.inOut },
    );
    const lift = inner.animate(
      [{ transform: 'translateY(0px)' }, { transform: `translateY(${dy}px)` }],
      { ...base, easing: EASE.out },
    );
    // Swell and shrink on the individual scale property so it composes with translateY
    const swell = inner.animate(
      [
        { scale: '1', opacity: 1, offset: 0 },
        { scale: String(1.15 * size), opacity: 1, offset: 0.3 },
        { scale: String(0.9 * size), opacity: 1, offset: 0.8 },
        { scale: String(0.6 * size), opacity: 0, offset: 1 },
      ],
      { ...base, easing: 'linear' },
    );
    animations.push(outer, lift, swell);
    return outer;
  };

  const main = launch(makeChip(source, sourceRect, 1, false), 0, 1);
  trail.forEach((t) => launch(makeChip(source, sourceRect, t.size, true), t.delay, t.size));

  let arrived = false;
  let cleaned = false;
  const arrive = () => {
    if (arrived) return;
    arrived = true;
    opts.onArrive?.();
  };
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    animations.forEach((a) => {
      try {
        a.cancel();
      } catch {
        // already gone
      }
    });
    elements.forEach((el) => el.remove());
    document.removeEventListener('visibilitychange', onVisibility);
    if (activeFly === handle) activeFly = null;
  };
  const land = () => {
    arrive();
    cleanup();
  };

  const handle: FlyHandle = { finish: land };
  function onVisibility() {
    if (document.hidden) land();
  }
  document.addEventListener('visibilitychange', onVisibility);
  // The counter reacts when the main chip lands. The trail may still be a few frames behind it.
  main.onfinish = arrive;
  void Promise.all(animations.map((a) => a.finished.catch(() => undefined))).then(cleanup);
  activeFly = handle;
  return handle;
}
