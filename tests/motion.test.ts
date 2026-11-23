import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { COLLECTION_LABEL, levelLabel, MODE_LABEL, WARMUP_CAP, xpWord } from '../src/app/modeConfig';
import { MASCOT_ACCESSORIES, nextReward } from '../src/content/mascotRewards';
import {
  celebrate,
  clearCelebrations,
  dismissCelebration,
  getCurrentCelebration,
} from '../src/engine/celebrations';
import { DUR, EASE, MOTION_SCALE, scaled, stickerTilt } from '../src/motion/tokens';
import { getMotionPrefs } from '../src/motion/prefs';
import { easeOutCubic, useCountUp } from '../src/motion/useCountUp';
import { finishFly, flyTo, fx, runSequence } from '../src/motion/waapi';
import { getRouteDepth, getRouteVariant } from '../src/components/fx/RouteTransition';

// ---- helpers --------------------------------------------------------------------------------

const root = document.documentElement;

function setMatchMedia(reduce: boolean, fine = true): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-reduced-motion') ? reduce : fine,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
      onchange: null,
    }),
  });
}

function setCores(n: number): void {
  Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: n });
}

function resetEnvironment(): void {
  setMatchMedia(false);
  setCores(8);
  delete root.dataset.reducedMotion;
  delete root.dataset.mode;
  delete root.dataset.input;
}

// Read the CSS as text. A variable specifier keeps tsc free of @types/node.
const fsModule = 'node:fs';
const { readFileSync } = (await import(/* @vite-ignore */ fsModule)) as {
  readFileSync(path: string, encoding: 'utf8'): string;
};
const tokensCss = readFileSync('src/styles/tokens.css', 'utf8');
const motionCss = readFileSync('src/styles/motion.css', 'utf8');
const globalCss = readFileSync('src/styles/global.css', 'utf8');
const stripComments = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const squash = (value: string) => value.replace(/\s+/g, ' ').trim();

// ---- tokens ---------------------------------------------------------------------------------

describe('motion tokens mirror tokens.css', () => {
  const css = stripComments(tokensCss);
  const cssVar = (name: string) => {
    const match = css.match(new RegExp(`${name}:\\s*([^;]+);`));
    return match ? squash(match[1]) : undefined;
  };

  it('durations match the --dur-* custom properties', () => {
    for (const [name, ms] of Object.entries(DUR)) {
      expect(cssVar(`--dur-${name}`), `--dur-${name}`).toBe(`${ms}ms`);
    }
  });

  it('easings match the --ease-* custom properties', () => {
    const names: Record<keyof typeof EASE, string> = {
      out: '--ease-out',
      inOut: '--ease-in-out',
      drawer: '--ease-drawer',
      outExpo: '--ease-out-expo',
      spring: '--ease-spring',
      impact: '--ease-impact',
    };
    for (const [key, cssName] of Object.entries(names)) {
      expect(cssVar(cssName), cssName).toBe(squash(EASE[key as keyof typeof EASE]));
    }
  });

  it('keeps the three existing curves and does not add the rejected ones', () => {
    expect(cssVar('--ease-out')).toBe('cubic-bezier(0.23, 1, 0.32, 1)');
    expect(cssVar('--ease-in-out')).toBe('cubic-bezier(0.77, 0, 0.175, 1)');
    expect(cssVar('--ease-drawer')).toBe('cubic-bezier(0.32, 0.72, 0, 1)');
    expect(css).not.toContain('--ease-out-quint');
    expect(css).not.toContain('--ease-in-quick');
  });

  it('Pro scales motion by 0.7 and swaps the pop curve for ease-out', () => {
    expect(MOTION_SCALE.pro).toBe(0.7);
    expect(css).toMatch(/:root\[data-mode='pro'\]\s*\{[^}]*--motion-scale:\s*0\.7/);
    expect(css).toMatch(/:root\[data-mode='pro'\]\s*\{[^}]*--ease-pop:\s*var\(--ease-out\)/);
  });

  it('scaled() rounds to whole milliseconds', () => {
    expect(scaled(480, 0.7)).toBe(336);
    expect(scaled(220, 1)).toBe(220);
  });

  it('sticker tilt cycles deterministically', () => {
    expect([0, 1, 2, 3, 4].map(stickerTilt)).toEqual([-3, 2, -1.5, 3, -3]);
    expect(stickerTilt(-1)).toBe(3);
  });
});

describe('motion.css rules (spec 5.9.2, 9)', () => {
  const css = stripComments(motionCss) + stripComments(globalCss);

  it('has no transition: all, no ease-in keyword, no scale(0) start, no backdrop-filter', () => {
    expect(css).not.toMatch(/transition:\s*all/);
    expect(css).not.toMatch(/(?<![\w-])ease-in(?![\w-])/);
    expect(css).not.toMatch(/scale\(\s*0\s*[),]/);
    expect(css).not.toContain('backdrop-filter');
  });

  it('does not animate box-shadow or filter', () => {
    expect(css).not.toMatch(/transition:[^;]*\b(box-shadow|filter)\b/);
    const keyframes = stripComments(motionCss).match(/@keyframes[^{]+\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g) ?? [];
    expect(keyframes.length).toBeGreaterThan(30);
    for (const block of keyframes) {
      expect(block).not.toMatch(/box-shadow|filter:/);
    }
  });

  it('ends with the reduced-motion contract for both triggers', () => {
    const tail = stripComments(motionCss);
    const mediaAt = tail.lastIndexOf('@media (prefers-reduced-motion: reduce)');
    const attrAt = tail.lastIndexOf(":root[data-reduced-motion='always'] *,");
    expect(mediaAt).toBeGreaterThan(0);
    expect(attrAt).toBeGreaterThan(mediaAt);
    // nothing but the contract after the media query starts
    const after = tail.slice(mediaAt);
    expect(after).not.toMatch(/@keyframes/);
    expect(after.match(/animation-duration:\s*0\.01ms\s*!important/g)).toHaveLength(2);
    expect(after.match(/animation-iteration-count:\s*1\s*!important/g)).toHaveLength(2);
    expect(after).toContain("[data-rm='fade']");
  });

  it('defines the whole class contract of 5.9.7', () => {
    const required = [
      '.pw-enter[data-enter=\'rise\']',
      '.pw-enter[data-enter=\'right\']',
      '.pw-enter[data-enter=\'fade\']',
      '.pw-enter[data-enter=\'pop\']',
      '.pw-enter[data-enter=\'deal\']',
      '.pw-enter[data-enter=\'retry\']',
      '.pw-stagger',
      '.pw-seq',
      '.pw-draw',
      '.pw-boil',
      '.pw-fx-correct',
      '.pw-fx-almost',
      '.pw-fx-ring',
      '.pw-fx-bump',
      '.pw-fx-stamp',
      '.pw-fx-slap',
      '.pw-fx-thump',
      '.pw-fx-sheen',
      '.pw-fx-rise',
      '.pw-fx-fade',
      '.pw-fx-hop',
      '.pw-fx-hit',
      '.pw-fx-grow',
      '.pw-fx-roll',
      '.pw-fx-lock',
      '.pw-fx-peel',
      '.pw-fx-gate',
      '.pw-confetti-piece',
      ".bito[data-react='wave']",
      ".bito[data-react='happy']",
      ".bito[data-react='cheer']",
      ".bito[data-react='think']",
      ".bito[data-react='wow']",
      ".bito[data-react='spin']",
      ".bito[data-react='bounce']",
      ".bito[data-idle='on']",
      '.pw-flip',
      '.pw-flip-inner',
      '.pw-anim-slide-up',
      '.pw-anim-pop',
      '.pw-anim-star',
      '.pw-anim-shake',
      '.pw-anim-pulse',
      '.pw-squish-pop',
      '.pw-float',
      ":root[data-input='keyboard']",
    ];
    for (const selector of required) {
      expect(motionCss, selector).toContain(selector);
    }
  });

  it('every effect class reads --at and the motion scale', () => {
    const stampRule = motionCss.match(/\.pw-fx-stamp\s*\{[^}]*\}/)?.[0] ?? '';
    expect(stampRule).toContain('var(--at, 0ms)');
    expect(stampRule).toContain('var(--motion-scale)');
  });
});

// ---- prefs ----------------------------------------------------------------------------------

describe('getMotionPrefs', () => {
  beforeEach(resetEnvironment);
  afterEach(resetEnvironment);

  it('is full and unreduced by default', () => {
    expect(getMotionPrefs()).toEqual({ reduced: false, tier: 'full', scale: 1, mode: 'junior' });
  });

  it('reduced by the OS setting gives tier off', () => {
    setMatchMedia(true);
    expect(getMotionPrefs()).toMatchObject({ reduced: true, tier: 'off' });
  });

  it('reduced by the in-app setting gives tier off', () => {
    root.dataset.reducedMotion = 'always';
    expect(getMotionPrefs()).toMatchObject({ reduced: true, tier: 'off' });
    root.dataset.reducedMotion = 'system';
    expect(getMotionPrefs().reduced).toBe(false);
  });

  it('tier is lite on four cores or fewer, from the device, not the mode', () => {
    setCores(4);
    expect(getMotionPrefs().tier).toBe('lite');
    root.dataset.mode = 'pro';
    expect(getMotionPrefs().tier).toBe('lite');
    setCores(8);
    expect(getMotionPrefs().tier).toBe('full');
  });

  it('tier is lite on a 2 GB device', () => {
    Object.defineProperty(navigator, 'deviceMemory', { configurable: true, value: 2 });
    expect(getMotionPrefs().tier).toBe('lite');
    Object.defineProperty(navigator, 'deviceMemory', { configurable: true, value: undefined });
  });

  it('Pro scales motion by 0.7', () => {
    root.dataset.mode = 'pro';
    expect(getMotionPrefs()).toMatchObject({ mode: 'pro', scale: 0.7 });
  });

  it('returns a stable object while nothing changes', () => {
    expect(getMotionPrefs()).toBe(getMotionPrefs());
  });
});

// ---- runSequence ----------------------------------------------------------------------------

describe('runSequence', () => {
  beforeEach(() => {
    resetEnvironment();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    resetEnvironment();
  });

  const makeRoot = () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    return el;
  };

  it('runs each cue at its time, scaled by the motion scale', () => {
    const el = makeRoot();
    const log: string[] = [];
    runSequence(el, [
      { at: 100, run: () => log.push('a') },
      { at: 1000, run: () => log.push('b') },
    ]);
    expect(el.dataset.seq).toBe('run');
    vi.advanceTimersByTime(99);
    expect(log).toEqual([]);
    vi.advanceTimersByTime(1);
    expect(log).toEqual(['a']);
    vi.advanceTimersByTime(900);
    expect(log).toEqual(['a', 'b']);
  });

  it('Pro multiplies times by 0.7', () => {
    root.dataset.mode = 'pro';
    const el = makeRoot();
    const run = vi.fn();
    runSequence(el, [{ at: 1000, run }]);
    vi.advanceTimersByTime(699);
    expect(run).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(run).toHaveBeenCalledTimes(1);
  });

  it('runs a cue at 0 at once and calls onDone after the last cue', () => {
    const el = makeRoot();
    const first = vi.fn();
    const onDone = vi.fn();
    runSequence(el, [{ at: 0, run: first }, { at: 50, run: () => {} }], { onDone });
    expect(first).toHaveBeenCalledWith({ skipped: false });
    expect(onDone).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('a pointerdown skips: data-seq done, the rest run at once with skipped true, onDone once', () => {
    const el = makeRoot();
    const log: Array<[string, boolean]> = [];
    const onDone = vi.fn();
    runSequence(
      el,
      [
        { at: 100, run: (c) => log.push(['a', c.skipped]) },
        { at: 500, run: (c) => log.push(['b', c.skipped]) },
      ],
      { onDone },
    );
    vi.advanceTimersByTime(100);
    el.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(el.dataset.seq).toBe('done');
    expect(log).toEqual([
      ['a', false],
      ['b', true],
    ]);
    expect(onDone).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(5000);
    expect(log).toHaveLength(2);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('does not cancel the event that skipped it', () => {
    const el = makeRoot();
    runSequence(el, [{ at: 500, run: () => {} }]);
    const event = new Event('pointerdown', { bubbles: true, cancelable: true });
    el.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(false);
  });

  it('Enter, Space and Escape skip; other keys do not', () => {
    for (const [key, skips] of [
      ['Enter', true],
      [' ', true],
      ['Escape', true],
      ['a', false],
    ] as const) {
      const el = makeRoot();
      const run = vi.fn();
      runSequence(el, [{ at: 800, run }]);
      el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
      expect(run.mock.calls.length > 0, key).toBe(skips);
      expect(run.mock.calls[0]?.[0]).toEqual(skips ? { skipped: true } : undefined);
    }
  });

  it('a hidden document skips it', () => {
    const el = makeRoot();
    const run = vi.fn();
    runSequence(el, [{ at: 800, run }]);
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    expect(run).toHaveBeenCalledWith({ skipped: true });
    expect(el.dataset.seq).toBe('done');
  });

  it('cancel clears the timers and runs nothing, not even onDone', () => {
    const el = makeRoot();
    const run = vi.fn();
    const onDone = vi.fn();
    const handle = runSequence(el, [{ at: 200, run }], { onDone });
    handle.cancel();
    vi.advanceTimersByTime(1000);
    el.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(run).not.toHaveBeenCalled();
    expect(onDone).not.toHaveBeenCalled();
  });

  it('reduced motion runs every cue at once, silent (skipped true)', () => {
    root.dataset.reducedMotion = 'always';
    const el = makeRoot();
    const log: boolean[] = [];
    const onDone = vi.fn();
    runSequence(
      el,
      [
        { at: 100, run: (c) => log.push(c.skipped) },
        { at: 900, run: (c) => log.push(c.skipped) },
      ],
      { onDone },
    );
    expect(log).toEqual([true, true]);
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('an empty sequence finishes at once', () => {
    const onDone = vi.fn();
    runSequence(makeRoot(), [], { onDone });
    expect(onDone).toHaveBeenCalledTimes(1);
  });
});

// ---- fx and flyTo ---------------------------------------------------------------------------

type AnimateMock = ReturnType<typeof vi.fn>;

describe('fx', () => {
  let animate: AnimateMock;
  beforeEach(() => {
    resetEnvironment();
    animate = vi.fn(() => ({ cancel: vi.fn() }));
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, writable: true, value: animate });
  });
  afterEach(() => {
    // @ts-expect-error remove the mock
    delete HTMLElement.prototype.animate;
    resetEnvironment();
  });

  it('scales duration and delay by the motion scale and defaults to ease-out', () => {
    root.dataset.mode = 'pro';
    const el = document.createElement('div');
    fx(el, [{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 100 });
    expect(animate).toHaveBeenCalledTimes(1);
    const options = animate.mock.calls[0][1];
    expect(options).toMatchObject({ duration: 140, delay: 70, easing: EASE.out });
  });

  it('returns null when motion is reduced', () => {
    root.dataset.reducedMotion = 'always';
    expect(fx(document.createElement('div'), [{ opacity: 0 }], { duration: 100 })).toBeNull();
    expect(animate).not.toHaveBeenCalled();
  });

  it('returns null when the browser cannot animate', () => {
    // @ts-expect-error remove the mock
    delete HTMLElement.prototype.animate;
    expect(fx(document.createElement('div'), [{ opacity: 0 }], { duration: 100 })).toBeNull();
  });
});

describe('flyTo', () => {
  let animate: AnimateMock;
  const makeAnimation = () => ({
    cancel: vi.fn(),
    finished: new Promise<void>(() => {}),
    onfinish: null as null | (() => void),
  });

  const attach = (cls: string) => {
    const el = document.createElement('div');
    el.className = cls;
    document.body.appendChild(el);
    return el;
  };

  beforeEach(() => {
    resetEnvironment();
    document.body.innerHTML = '<div id="fx-layer"></div>';
    animate = vi.fn(() => makeAnimation());
    Object.defineProperty(HTMLElement.prototype, 'animate', { configurable: true, writable: true, value: animate });
  });
  afterEach(() => {
    finishFly();
    // @ts-expect-error remove the mock
    delete HTMLElement.prototype.animate;
    document.body.innerHTML = '';
    resetEnvironment();
  });

  it('calls onArrive at once when motion is reduced and draws nothing', () => {
    root.dataset.reducedMotion = 'always';
    const onArrive = vi.fn();
    flyTo(attach('a'), attach('b'), { onArrive });
    expect(onArrive).toHaveBeenCalledTimes(1);
    expect(document.getElementById('fx-layer')?.children).toHaveLength(0);
  });

  it('calls onArrive at once when an element is missing', () => {
    const onArrive = vi.fn();
    flyTo(attach('a'), null, { onArrive });
    flyTo(null, attach('b'), { onArrive });
    expect(onArrive).toHaveBeenCalledTimes(2);
  });

  it('flies a clone in #fx-layer on two nested elements: x on the outer, y and scale on the inner', () => {
    const onArrive = vi.fn();
    flyTo(attach('a'), attach('b'), { onArrive });
    const layer = document.getElementById('fx-layer')!;
    expect(layer.children).toHaveLength(1);
    const outer = layer.children[0] as HTMLElement;
    expect(outer.firstElementChild).not.toBeNull();
    // outer: translateX with ease-in-out. inner: translateY with ease-out, plus scale and opacity
    const transforms = animate.mock.calls.map((c) => (c[0] as Keyframe[])[0].transform ?? (c[0] as Keyframe[])[0].scale);
    expect(transforms).toContain('translateX(0px)');
    expect(transforms).toContain('translateY(0px)');
    const easings = animate.mock.calls.map((c) => c[1].easing);
    expect(easings).toContain(EASE.inOut);
    expect(easings).toContain(EASE.out);
    expect(onArrive).not.toHaveBeenCalled();
  });

  it('lasts 480 ms in Junior and 336 ms in Pro', () => {
    flyTo(attach('a'), attach('b'));
    expect(animate.mock.calls[0][1].duration).toBe(480);
    finishFly();
    animate.mockClear();
    root.dataset.mode = 'pro';
    flyTo(attach('a'), attach('b'));
    expect(animate.mock.calls[0][1].duration).toBe(336);
  });

  it('only one fly is in flight: a new one lands the current one at once', () => {
    const first = vi.fn();
    const second = vi.fn();
    flyTo(attach('a'), attach('b'), { onArrive: first });
    expect(first).not.toHaveBeenCalled();
    flyTo(attach('c'), attach('d'), { onArrive: second });
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).not.toHaveBeenCalled();
    expect(document.getElementById('fx-layer')?.children).toHaveLength(1);
  });

  it('finish() lands it: onArrive once, clone removed', () => {
    const onArrive = vi.fn();
    const handle = flyTo(attach('a'), attach('b'), { onArrive });
    handle.finish();
    handle.finish();
    expect(onArrive).toHaveBeenCalledTimes(1);
    expect(document.getElementById('fx-layer')?.children).toHaveLength(0);
  });

  it('a hidden document lands it', () => {
    const onArrive = vi.fn();
    flyTo(attach('a'), attach('b'), { onArrive });
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    expect(onArrive).toHaveBeenCalledTimes(1);
  });

  it('trail 2 adds two small stars on the same path', () => {
    flyTo(attach('a'), attach('b'), { trail: 2 });
    expect(document.getElementById('fx-layer')?.children).toHaveLength(3);
  });
});

// ---- count-up -------------------------------------------------------------------------------

describe('useCountUp', () => {
  beforeEach(resetEnvironment);
  afterEach(() => {
    // unmount first, so resetting <html> does not re-render a mounted hook outside act()
    cleanup();
    resetEnvironment();
  });

  it('easeOutCubic runs 0 to 1 and is fast at the start', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
    expect(easeOutCubic(2)).toBe(1);
  });

  it('shows the final number at once when motion is reduced', () => {
    root.dataset.reducedMotion = 'always';
    const { result } = renderHook(() => useCountUp(30));
    expect(result.current).toBe(30);
  });

  it('shows the final number at once when skipped or disabled', () => {
    expect(renderHook(() => useCountUp(20, { skip: true })).result.current).toBe(20);
    expect(renderHook(() => useCountUp(20, { enabled: false })).result.current).toBe(20);
  });

  it('counts up from 0 to the target and stops', async () => {
    const { result } = renderHook(() => useCountUp(12, { duration: 60 }));
    expect(result.current).toBeLessThanOrEqual(12);
    await waitFor(() => expect(result.current).toBe(12), { timeout: 2000 });
  });

  it('retargets from the number on screen', async () => {
    const { result, rerender } = renderHook(({ n }) => useCountUp(n, { duration: 40 }), {
      initialProps: { n: 5 },
    });
    await waitFor(() => expect(result.current).toBe(5), { timeout: 2000 });
    rerender({ n: 9 });
    await waitFor(() => expect(result.current).toBe(9), { timeout: 2000 });
  });
});

// ---- route depth ----------------------------------------------------------------------------

describe('RouteTransition depth table (M11)', () => {
  it('maps every route to its depth', () => {
    expect(getRouteDepth('/')).toBe(0);
    expect(getRouteDepth('/mulai')).toBe(0);
    for (const path of ['/beranda', '/peta/web', '/ulang', '/stiker', '/profil']) {
      expect(getRouteDepth(path), path).toBe(1);
    }
    for (const path of ['/dunia/a01', '/pengaturan', '/glosarium', '/pendamping']) {
      expect(getRouteDepth(path), path).toBe(2);
    }
    for (const path of ['/belajar/x', '/penjaga/a01', '/tes/a01/pre']) {
      expect(getRouteDepth(path), path).toBe(3);
    }
  });

  it('deeper rises, same depth does nothing, shallower fades, depth 0 adds nothing', () => {
    expect(getRouteVariant(1, 2)).toBe('rise');
    expect(getRouteVariant(2, 3)).toBe('rise');
    expect(getRouteVariant(1, 1)).toBe('none');
    expect(getRouteVariant(3, 1)).toBe('fade');
    expect(getRouteVariant(1, 0)).toBe('none');
    expect(getRouteVariant(0, 1)).toBe('rise');
  });
});

// ---- celebrations ---------------------------------------------------------------------------

describe('celebrations queue', () => {
  beforeEach(clearCelebrations);
  afterEach(clearCelebrations);

  it('is empty by default', () => {
    expect(getCurrentCelebration()).toBeNull();
    dismissCelebration();
    expect(getCurrentCelebration()).toBeNull();
  });

  it('shows a level-up before a world unlock, whatever the call order', () => {
    celebrate({ kind: 'worldUnlock', worldId: 'a02' });
    celebrate({ kind: 'levelUp', level: 4, title: 'Penata Warna' });
    expect(getCurrentCelebration()).toEqual({ kind: 'levelUp', level: 4, title: 'Penata Warna' });
    dismissCelebration();
    expect(getCurrentCelebration()).toEqual({ kind: 'worldUnlock', worldId: 'a02' });
    dismissCelebration();
    expect(getCurrentCelebration()).toBeNull();
  });

  it('keeps call order within the same kind', () => {
    celebrate({ kind: 'levelUp', level: 2, title: 'a' });
    celebrate({ kind: 'levelUp', level: 3, title: 'b' });
    expect(getCurrentCelebration()).toMatchObject({ level: 2 });
  });
});

// ---- modeConfig and mascot rewards ----------------------------------------------------------

describe('modeConfig', () => {
  it('names the modes and the reward word per mode', () => {
    expect(MODE_LABEL).toEqual({ junior: 'Petualang', pro: 'Pro' });
    expect(xpWord('junior')).toBe('poin');
    expect(xpWord('pro')).toBe('XP');
    expect(levelLabel(3, 'junior')).toBe('Level 3');
    expect(levelLabel(3, 'pro')).toBe('Lv 3');
  });

  it('the collection is a sticker book in Junior and concept cards in Pro, and Pro never says stiker', () => {
    expect(COLLECTION_LABEL.junior.title).toBe('Buku Stiker');
    expect(COLLECTION_LABEL.junior.nav).toBe('Stiker');
    expect(COLLECTION_LABEL.pro.title).toBe('Koleksi Konsep');
    expect(COLLECTION_LABEL.pro.nav).toBe('Koleksi');
    expect(JSON.stringify(COLLECTION_LABEL.pro).toLowerCase()).not.toContain('stiker');
  });

  it('warm-up caps are 3 and 5', () => {
    expect(WARMUP_CAP).toEqual({ junior: 3, pro: 5 });
  });
});

describe('mascotRewards', () => {
  it('keeps the accessory data that ProfilePage had', () => {
    expect(MASCOT_ACCESSORIES.map((a) => [a.id, a.label, a.minLv])).toEqual([
      ['none', 'Polos', 1],
      ['cap', 'Topi (Lv 2)', 2],
      ['glasses', 'Kacamata (Lv 3)', 3],
      ['scarf', 'Syal (Lv 4)', 4],
    ]);
  });

  it('nextReward names the next accessory above the level', () => {
    expect(nextReward(1)?.text).toBe('Di Level 2: topi untuk Bito');
    expect(nextReward(3)).toMatchObject({ id: 'scarf', minLv: 4, text: 'Di Level 4: syal untuk Bito' });
    expect(nextReward(4)).toBeNull();
    expect(nextReward(9)).toBeNull();
  });
});
