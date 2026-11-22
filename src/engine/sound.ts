/**
 * 5 efek suara lembut (volume maksimal -12 dB ≈ gain 0.25) dengan Web Audio API
 * tanpa file eksternal dan tidak pernah berbunyi sebelum interaksi pengguna.
 */

export type SoundEffect = 'tap' | 'correct' | 'incorrect' | 'star' | 'unlock';

let audioCtx: AudioContext | null = null;
let hasUserInteracted = false;

export function markUserInteraction(): void {
  hasUserInteracted = true;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || !hasUserInteracted) return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    audioCtx = new Ctx();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  ctx: AudioContext,
  freq: number,
  duration: number,
  type: OscillatorType,
  gainPeak: number,
  delay = 0,
): void {
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.min(0.22, gainPeak), now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playSound(effect: SoundEffect, enabled: boolean): void {
  hasUserInteracted = true;
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  switch (effect) {
    case 'tap':
      playTone(ctx, 520, 0.045, 'sine', 0.08);
      break;
    case 'correct':
      playTone(ctx, 523.25, 0.12, 'triangle', 0.14, 0);
      playTone(ctx, 659.25, 0.18, 'triangle', 0.16, 0.08);
      break;
    case 'incorrect':
      // Lembut, bukan suara alarm
      playTone(ctx, 329.63, 0.14, 'sine', 0.1, 0);
      playTone(ctx, 293.66, 0.18, 'sine', 0.09, 0.09);
      break;
    case 'star':
      playTone(ctx, 587.33, 0.12, 'triangle', 0.14, 0);
      playTone(ctx, 783.99, 0.18, 'triangle', 0.16, 0.08);
      break;
    case 'unlock':
      playTone(ctx, 523.25, 0.12, 'triangle', 0.14, 0);
      playTone(ctx, 659.25, 0.12, 'triangle', 0.15, 0.09);
      playTone(ctx, 783.99, 0.14, 'triangle', 0.16, 0.18);
      playTone(ctx, 1046.5, 0.28, 'triangle', 0.18, 0.27);
      break;
  }
}
