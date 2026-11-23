/**
 * 7 efek suara lembut (volume maksimal -12 dB ≈ gain 0.25) dengan Web Audio API
 * tanpa file eksternal dan tidak pernah berbunyi sebelum interaksi pengguna.
 * 'slap' (tempel stiker) dan 'bip' (colek Bito) disintesis dengan cara yang sama.
 */

export type SoundEffect = 'tap' | 'correct' | 'incorrect' | 'star' | 'unlock' | 'slap' | 'bip';

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

/** 90 ms filtered noise burst over a low thump: the sound of a sticker landing. */
function playSlap(ctx: AudioContext): void {
  const now = ctx.currentTime;
  const length = Math.max(1, Math.floor(ctx.sampleRate * 0.09));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, now);
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.14, now + 0.008);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.1);

  // Low thump under the noise
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.09);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.11);
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
    case 'slap':
      playSlap(ctx);
      break;
    case 'bip':
      // Two short square-wave notes a fifth apart, 140 ms in total
      playTone(ctx, 659.25, 0.065, 'square', 0.05, 0);
      playTone(ctx, 987.77, 0.07, 'square', 0.05, 0.07);
      break;
  }
}
