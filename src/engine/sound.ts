import { DEFAULT_AUDIO_SETTINGS, type Settings } from '@/content/schema';

export type SoundEffect = 'tap' | 'back' | 'correct' | 'incorrect' | 'star' | 'unlock' | 'slap' | 'bip';
type SoundPreferences = Pick<Settings, 'soundEnabled' | 'soundVolume' | 'musicEnabled' | 'musicVolume'>;

let audioCtx: AudioContext | null = null;
let effectsGain: GainNode | null = null;
let musicGain: GainNode | null = null;
let preferences: SoundPreferences | undefined;
let hasUserInteracted = false;
let speechPlaying = false;
let musicTimer: ReturnType<typeof setInterval> | null = null;
let activeClick: { event: MouseEvent; played: boolean; effect: 'tap' | 'back' | null; beforeProfile: boolean } | null = null;

export function configureSound(settings?: SoundPreferences): void {
  preferences = settings;
  updateEffectsVolume();
  syncMusic();
}

export function markUserInteraction(): void {
  hasUserInteracted = true;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || !hasUserInteracted) return null;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  try {
    if (!audioCtx) {
      audioCtx = new Ctx();
      effectsGain = audioCtx.createGain();
      musicGain = audioCtx.createGain();
      effectsGain.connect(audioCtx.destination);
      musicGain.connect(audioCtx.destination);
      musicGain.gain.value = 0;
      updateEffectsVolume();
    }
    if (audioCtx.state !== 'running') void audioCtx.resume().catch(() => {});
  } catch {
    return null;
  }
  return audioCtx;
}

function updateEffectsVolume(): void {
  if (!audioCtx || !effectsGain) return;
  const volume = (preferences?.soundVolume ?? DEFAULT_AUDIO_SETTINGS.soundVolume) / 100;
  effectsGain.gain.setTargetAtTime(preferences?.soundEnabled === false ? 0 : volume * (speechPlaying ? 0.35 : 1), audioCtx.currentTime, 0.012);
}

function playTone(ctx: AudioContext, freq: number, duration: number, type: OscillatorType, gainPeak: number, delay = 0): void {
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.min(0.22, gainPeak), now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gain);
  gain.connect(effectsGain!);
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
  noiseGain.connect(effectsGain!);
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
  gain.connect(effectsGain!);
  osc.start(now);
  osc.stop(now + 0.11);
}

export function playSound(effect: SoundEffect, enabled: boolean): void {
  if (!enabled || preferences?.soundEnabled === false || activeClick?.played) return;
  if (activeClick) activeClick.played = true;
  if (preferences?.soundVolume === 0) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  switch (effect) {
    case 'tap':
      playTone(ctx, 640, 0.046, 'sine', 0.10);
      break;
    case 'back':
      playTone(ctx, 440, 0.06, 'sine', 0.11);
      playTone(ctx, 329.63, 0.08, 'sine', 0.08, 0.045);
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

// A spare, original loop. Each row is a beat: low note, then an optional plucked note.
const MUSIC = [
  [48, 64], [0, 67], [0, 0], [0, 62],
  [45, 60], [0, 64], [0, 0], [0, 67],
  [41, 65], [0, 64], [0, 0], [0, 60],
  [43, 62], [0, 67], [0, 0], [0, 59],
  [48, 60], [0, 64], [0, 67], [0, 0],
  [40, 71], [0, 67], [0, 0], [0, 64],
  [41, 65], [0, 69], [0, 64], [0, 0],
  [43, 62], [0, 59], [0, 67], [0, 0],
];

function musicNote(ctx: AudioContext, note: number, at: number, bass: boolean): void {
  if (note === 0 || !musicGain) return;
  const duration = bass ? 2.5 : 1.05;
  const osc = ctx.createOscillator();
  const envelope = ctx.createGain();
  osc.type = bass ? 'sine' : 'triangle';
  osc.frequency.value = 440 * 2 ** ((note - 69) / 12);
  envelope.gain.setValueAtTime(0.0001, at);
  envelope.gain.linearRampToValueAtTime(bass ? 0.12 : 0.13, at + (bass ? 0.35 : 0.048));
  envelope.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  osc.connect(envelope);
  envelope.connect(musicGain);
  osc.start(at);
  osc.stop(at + duration);
}

function syncMusic(): void {
  if (typeof document === 'undefined') return;
  const enabled = Boolean(preferences?.musicEnabled && preferences.musicVolume > 0 && !document.hidden);
  if (!enabled && musicTimer !== null) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  const ctx = enabled && musicTimer === null ? getAudioContext() : audioCtx;
  if (!ctx || !musicGain) return;

  const volume = enabled ? (preferences?.musicVolume ?? 0) / 100 : 0;
  musicGain.gain.setTargetAtTime(volume * (speechPlaying ? 0.025 : 0.32), ctx.currentTime, speechPlaying ? 0.035 : 0.16);
  if (!enabled || musicTimer !== null) return;

  let beat = 0;
  let at = ctx.currentTime + 0.04;
  const schedule = () => {
    if (at < ctx.currentTime) at = ctx.currentTime + 0.04;
    if (at > ctx.currentTime + 0.2) return;
    const [bass, melody] = MUSIC[beat];
    musicNote(ctx, bass, at, true);
    musicNote(ctx, melody, at, false);
    beat = (beat + 1) % MUSIC.length;
    at += 0.9;
  };
  schedule();
  musicTimer = setInterval(schedule, 120);
}

export function setMusicSpeaking(speaking: boolean): void {
  if (speechPlaying === speaking) return;
  speechPlaying = speaking;
  updateEffectsVolume();
  syncMusic();
}

const CLICKABLE = 'button, a[href], summary, [role="button"], [role="link"], input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"]';

/** Listen after React handles the click so an explicit cue takes precedence over a tap. */
export function listenForInterfaceSounds(): () => void {
  let historyIndex: number | undefined = window.history.state?.idx ?? 0;
  let resetClick: ReturnType<typeof setTimeout>;
  const onClickCapture = (event: MouseEvent) => {
    const target = event.target instanceof Element ? event.target.closest(CLICKABLE) : null;
    const cue = target?.getAttribute('data-sfx');
    const interactive = Boolean(target && !target.closest('[inert], [aria-disabled="true"], :disabled') && cue !== 'off');
    activeClick = {
      event,
      played: false,
      effect: interactive ? (cue === 'back' ? 'back' : 'tap') : null,
      beforeProfile: target?.getAttribute('data-sfx-enabled') === 'true',
    };
    markUserInteraction();
    syncMusic();
    // A stopped click never reaches the bubble handler. Clear its marker before timers can play.
    clearTimeout(resetClick);
    resetClick = setTimeout(() => {
      if (activeClick?.event === event) activeClick = null;
    }, 0);
  };
  const onClick = (event: MouseEvent) => {
    const click = activeClick;
    if (click?.event !== event) return;
    clearTimeout(resetClick);
    if (click.effect) {
      playSound(click.effect, preferences?.soundEnabled ?? click.beforeProfile);
    }
    activeClick = null;
    historyIndex = window.history.state?.idx ?? historyIndex;
  };
  const onPop = () => {
    const next: number | undefined = window.history.state?.idx;
    if (historyIndex !== undefined && next !== undefined && next < historyIndex) {
      playSound('back', Boolean(preferences?.soundEnabled));
    }
    historyIndex = next;
  };
  window.addEventListener('click', onClickCapture, true);
  window.addEventListener('click', onClick);
  window.addEventListener('popstate', onPop);
  document.addEventListener('visibilitychange', syncMusic);
  return () => {
    window.removeEventListener('click', onClickCapture, true);
    window.removeEventListener('click', onClick);
    window.removeEventListener('popstate', onPop);
    document.removeEventListener('visibilitychange', syncMusic);
    clearTimeout(resetClick);
    activeClick = null;
  };
}
