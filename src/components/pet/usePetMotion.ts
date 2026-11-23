import { useEffect, useRef, useState } from 'react';
import type { PetId } from '@/content/petContract';
import { useMotionPrefs } from '@/motion/prefs';
import { DUR, EASE } from '@/motion/tokens';
import { fx } from '@/motion/waapi';

type PetArrival = 'greet' | 'engage' | 'selected' | 'advance' | 'correct' | 'retry';
type PetReaction = 'offer' | 'talk';
type PetGesture = PetArrival | PetReaction | 'idle-look' | 'idle-settle';

export interface PetMotion {
  arrival?: PetArrival;
  reaction?: PetReaction;
  ambient?: boolean;
  suspended?: boolean;
}

// Each animal has its own path. The same path becomes a smaller gesture for a
// lesson transition or a quiet repositioning, with the print kept in its frame.
type Pose = readonly [x: number, y: number, turn: number, width?: number, height?: number];
const REST = [0, 0, 0] as const;
const MOVES: Record<PetId, { greet: readonly Pose[]; look: Pose; rest: Pose }> = {
  piko: {
    greet: [[0, 6, 0, 1.05, 0.91], [2, -12, -9, 0.97, 1.04], [0, 4, 4, 1.04, 0.96]],
    look: [4, -2, 10],
    rest: [3, 6, -5, 1.04, 0.95],
  },
  mobi: {
    greet: [[-9, 4, -8, 1.03, 0.94], [10, -4, 8], [5, 1, 5]],
    look: [-6, 0, -10],
    rest: [-5, 5, 5, 1.04, 0.94],
  },
  lumba: {
    greet: [[-10, 4, -5], [1, -11, -12], [10, 1, 8]],
    look: [7, -5, 9],
    rest: [-8, 4, -6],
  },
  ruru: {
    greet: [[-5, -5, -10], [5, -8, 11, 0.97, 1.05], [0, 3, -4, 1.03, 0.96]],
    look: [0, -2, -12],
    rest: [0, 5, 6, 1.04, 0.95],
  },
  kora: {
    greet: [[-8, 4, -4, 1.02, 0.94], [7, -3, 7], [11, 4, 3, 1.02, 0.96]],
    look: [6, 1, 7],
    rest: [7, 5, -3, 1.04, 0.95],
  },
};

function frames(poses: readonly Pose[], intensity: number): Keyframe[] {
  return [REST, ...poses, REST].map(([x, y, turn, width = 1, height = 1], index) => ({
    transform: index === poses.length + 1
      ? 'none'
      : `translate(${x * intensity}%, ${y * intensity}%) rotate(${turn * intensity}deg) scale(${1 + (width - 1) * intensity}, ${1 + (height - 1) * intensity})`,
    easing: EASE.inOut,
  }));
}

function playGesture(element: HTMLElement, pet: PetId, gesture: PetGesture, strength: number) {
  const { greet, look, rest } = MOVES[pet];
  const play = (poses: readonly Pose[], intensity: number, duration: number) =>
    fx(element, frames(poses, strength * intensity), { duration, easing: 'linear' });

  switch (gesture) {
    case 'idle-look':
      return play([look, look], 0.77, 760);
    case 'idle-settle':
      return play([look, rest, rest], 0.73, 920);
    case 'advance':
      return play(greet, 0.75, DUR.draw);
    case 'correct':
      return play([...greet, [0, -5, 0]], 1, 620);
    case 'retry':
      return play([rest, look, REST], 0.75, DUR.travel);
    case 'offer':
      return play([look, rest, look], 1, DUR.travel);
    case 'talk':
      return play([look, rest, look, rest, look], 1, 1_400);
    default:
      return play(greet, 1, 560);
  }
}

const IDLE_GESTURES = [
  { after: 4_800, gesture: 'idle-look' },
  { after: 10_000, gesture: 'idle-settle' },
] as const;

function isForeground() {
  return !document.hidden && document.hasFocus();
}

export function usePetForeground() {
  const [foreground, setForeground] = useState(isForeground);

  useEffect(() => {
    const update = () => setForeground(isForeground());
    document.addEventListener('visibilitychange', update);
    window.addEventListener('focus', update);
    window.addEventListener('blur', update);
    return () => {
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('focus', update);
      window.removeEventListener('blur', update);
    };
  }, []);

  return foreground;
}

export function usePetMotion(pet: PetId, { arrival, reaction, ambient = false, suspended = false }: PetMotion) {
  const figure = useRef<HTMLSpanElement>(null);
  const arrived = useRef(false);
  const lastReaction = useRef<PetReaction>(undefined);
  const idleIndex = useRef(0);
  const { reduced, mode } = useMotionPrefs();
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');
  const foreground = usePetForeground();

  useEffect(() => {
    const element = figure.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.intersectionRatio >= 0.5), { threshold: 0.5 });
    // Observe the still frame, rather than the pixels whose transform is animated.
    observer.observe(element.parentElement ?? element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!reaction) lastReaction.current = undefined;
    const element = figure.current;
    if (reduced || suspended || !inView || !foreground || !element || typeof element.animate !== 'function') return;

    let animation: Animation | null = null;
    let timer: number | undefined;
    const stop = () => {
      animation?.cancel();
      animation = null;
      delete element.dataset.petMotion;
    };
    const play = (gesture: PetGesture) => {
      if (!isForeground()) return;
      stop();
      const next = playGesture(element, pet, gesture, mode === 'pro' ? 0.88 : 1);
      if (!next) return;
      element.dataset.petMotion = gesture;
      animation = next;
      next.onfinish = () => {
        if (animation === next) stop();
      };
    };
    const scheduleIdle = () => {
      const idle = IDLE_GESTURES[idleIndex.current];
      if (!ambient || !idle) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        idleIndex.current += 1;
        play(idle.gesture);
        scheduleIdle();
      }, idle.after);
    };

    if (reaction && lastReaction.current !== reaction) {
      lastReaction.current = reaction;
      arrived.current = true;
      play(reaction);
      scheduleIdle();
    } else if (arrival && !arrived.current) {
      timer = window.setTimeout(() => {
        arrived.current = true;
        play(arrival);
        scheduleIdle();
      }, arrival === 'engage' || arrival === 'selected' ? 0 : 300);
    } else {
      scheduleIdle();
    }

    const postponeIdle = () => {
      if (element.dataset.petMotion?.startsWith('idle-')) stop();
      if (!arrival || arrived.current) scheduleIdle();
    };
    if (ambient) {
      document.addEventListener('pointerdown', postponeIdle);
      document.addEventListener('keydown', postponeIdle);
    }
    return () => {
      window.clearTimeout(timer);
      stop();
      document.removeEventListener('pointerdown', postponeIdle);
      document.removeEventListener('keydown', postponeIdle);
    };
  }, [ambient, arrival, foreground, inView, mode, pet, reaction, reduced, suspended]);

  return figure;
}
