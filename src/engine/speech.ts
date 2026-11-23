import { useSyncExternalStore } from 'react';
import { DEFAULT_AUDIO_SETTINGS, type Settings } from '@/content/schema';
import { setMusicSpeaking } from '@/engine/sound';

type SpeechPreferences = Pick<Settings, 'speechVoice' | 'speechRate' | 'speechVolume' | 'petVoice'>;
type SpeechOwner = 'reader' | 'companion' | 'preview';
type SpeechEnd = (completed: boolean) => void;

const RETRIABLE_ERRORS = new Set(['network', 'language-unavailable', 'voice-unavailable', 'synthesis-failed', 'synthesis-unavailable']);
const ENHANCED_VOICE = /\b(enhanced|natural|neural|premium)\b/i;
let preferences: SpeechPreferences = DEFAULT_AUDIO_SETTINGS;
interface SpeechPlayback {
  owner: SpeechOwner;
  finish: (completed: boolean, cancel?: boolean, tryFallback?: () => boolean) => void;
}
let activeSpeech: SpeechPlayback | null = null;

export function configureSpeech(settings?: SpeechPreferences): void {
  preferences = settings ?? DEFAULT_AUDIO_SETTINGS;
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && Boolean(window.speechSynthesis) && typeof SpeechSynthesisUtterance === 'function';
}

function locale(voice: SpeechSynthesisVoice): string {
  return voice.lang.toLowerCase().replace(/_/g, '-');
}

function scoreVoice(voice: SpeechSynthesisVoice): number {
  return (voice.localService ? 10 : 0) + (ENHANCED_VOICE.test(voice.name) ? 4 : 0)
    + (locale(voice) === 'id-id' ? 2 : 0) + (voice.default ? 1 : 0);
}

function orderedIndonesianVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return voices.filter((voice) => /^(id|in)(-|$)/.test(locale(voice)))
    .sort((a, b) => scoreVoice(b) - scoreVoice(a))
    .filter((voice, i, sorted) => sorted.findIndex((other) => other.voiceURI === voice.voiceURI) === i);
}

export function getIndonesianVoices(): SpeechSynthesisVoice[] {
  return isSpeechSupported() ? orderedIndonesianVoices(window.speechSynthesis.getVoices()) : [];
}

export function subscribeToVoices(onChange: () => void): () => void {
  if (!isSpeechSupported()) return () => {};
  const synth = window.speechSynthesis;
  synth.addEventListener('voiceschanged', onChange);
  return () => synth.removeEventListener('voiceschanged', onChange);
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  return voices.find((voice) => voice.voiceURI === preferences.speechVoice)
    ?? voices.find((voice) => voice.localService)
    ?? null;
}

export function getIndonesianVoice(): SpeechSynthesisVoice | null {
  return pickVoice(getIndonesianVoices());
}

export function hasIndonesianVoiceAvailable(): boolean {
  return getIndonesianVoice() !== null;
}

export function useIndonesianVoiceAvailable(): boolean {
  return useSyncExternalStore(subscribeToVoices, hasIndonesianVoiceAvailable, () => false);
}

export function usesStudioPetVoice(): boolean {
  return preferences.petVoice === 'studio';
}

export function stopSpeaking(owner?: SpeechOwner): void {
  const speech = activeSpeech;
  if (!speech || (owner && owner !== speech.owner)) return;
  speech.finish(false, true);
}

function beginPlayback(owner: SpeechOwner, onEnd: SpeechEnd | undefined, cleanUp: (cancel: boolean) => void): SpeechPlayback {
  stopSpeaking();
  const speech: SpeechPlayback = {
    owner,
    finish(completed, cancel = false, tryFallback) {
      if (activeSpeech !== speech) return;
      activeSpeech = null;
      cleanUp(cancel);
      if (!tryFallback?.()) onEnd?.(completed);
      if (!activeSpeech) setMusicSpeaking(false);
    },
  };
  activeSpeech = speech;
  setMusicSpeaking(true);
  return speech;
}

export function speakText(text: string, onEnd?: SpeechEnd, owner: SpeechOwner = 'reader'): boolean {
  const words = text.trim();
  if (!isSpeechSupported() || !words) return false;
  const voices = getIndonesianVoices();
  const preferred = pickVoice(voices);
  if (!preferred) return false;
  const fallback = voices.find((voice) => voice.localService && voice !== preferred);
  const synth = window.speechSynthesis;
  let timeout: ReturnType<typeof setTimeout>;
  const speech = beginPlayback(owner, onEnd, (cancel) => {
    clearTimeout(timeout);
    if (cancel) synth.cancel();
  });

  const start = (voice: SpeechSynthesisVoice, retry: boolean) => {
    const utterance = new SpeechSynthesisUtterance(words);
    let started = false;
    utterance.voice = voice;
    utterance.lang = locale(voice) === 'id-id' ? 'id-ID' : voice.lang;
    utterance.rate = preferences.speechRate;
    utterance.pitch = owner === 'companion' ? 1.08 : 1;
    utterance.volume = preferences.speechVolume / 100;
    const timeoutMs = Math.max(9000, words.length * 180 / utterance.rate);
    // Hold the utterance until its events arrive. Some Web Speech implementations drop weakly held references.
    timeout = setTimeout(() => {
      utterance.onend = null;
      stopSpeaking(owner);
    }, timeoutMs);
    utterance.onstart = () => { started = true; };
    utterance.onend = () => speech.finish(true);
    utterance.onerror = ({ error }) => {
      if (activeSpeech !== speech) return;
      if (retry && !started && fallback && RETRIABLE_ERRORS.has(error)) {
        clearTimeout(timeout);
        utterance.onend = null;
        utterance.onerror = null;
        start(fallback, false);
      } else {
        speech.finish(false);
      }
    };
    try {
      synth.speak(utterance);
    } catch {
      speech.finish(false);
    }
  };
  start(preferred, true);
  return true;
}

export function playRecordedSpeech(
  files: string[],
  onEnd?: SpeechEnd,
  owner: SpeechOwner = 'companion',
  tryFallback?: () => boolean,
): boolean {
  if (!files.length || typeof Audio !== 'function') return false;
  let audio: HTMLAudioElement;
  try {
    audio = new Audio();
  } catch {
    return false;
  }
  audio.volume = preferences.speechVolume / 100;
  const rate = preferences.speechRate;
  audio.defaultPlaybackRate = rate;
  let timeout: ReturnType<typeof setTimeout>;
  const speech = beginPlayback(owner, onEnd, () => {
    clearTimeout(timeout);
    audio.onended = null;
    audio.onerror = null;
    audio.pause();
    audio.removeAttribute('src');
  });
  const fail = () => speech.finish(false, false, tryFallback);

  const next = (index: number) => {
    if (activeSpeech !== speech) return;
    clearTimeout(timeout);
    if (index >= files.length) {
      speech.finish(true);
      return;
    }
    audio.src = files[index];
    audio.playbackRate = rate;
    audio.onended = () => next(index + 1);
    audio.onerror = fail;
    timeout = setTimeout(fail, 20000);
    try {
      void audio.play()?.catch(fail);
    } catch {
      fail();
    }
  };
  next(0);
  return true;
}
