import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SettingsSchema } from '@/content/schema';
import { PET_VOICE_SAMPLE, petVoiceFiles } from '@/content/petVoiceClips';
import { createDefaultSettings, createNewProfile, migratePersistedState } from '@/store/useAppStore';
import { canSpeakCompanion, playQueue, speakCompanion, stopQueue } from '@/engine/readAloud';
import { configureSpeech, getIndonesianVoice, playRecordedSpeech, speakText, stopSpeaking } from '@/engine/speech';
import { configureSound, listenForInterfaceSounds, markUserInteraction, playSound, setMusicSpeaking } from '@/engine/sound';

class FakeUtterance {
  lang = '';
  rate = 1;
  pitch = 1;
  volume = 1;
  voice: SpeechSynthesisVoice | null = null;
  onstart?: () => void;
  onend?: () => void;
  onerror?: (event: { error: string }) => void;

  constructor(readonly text: string) {}
}

const voice = (voiceURI: string, lang: string, localService = true): SpeechSynthesisVoice => ({
  voiceURI, lang, localService, name: voiceURI, default: false,
});
const localVoice = voice('Damayanti', 'id-ID');
const enhancedVoice = voice('Damayanti Enhanced', 'id_ID');
const remoteVoice = voice('Indonesian Natural Online', 'id-ID', false);
const englishVoice = voice('English', 'en-US');

let voices: SpeechSynthesisVoice[];
let utterances: FakeUtterance[];

beforeEach(() => {
  stopQueue();
  stopSpeaking();
  voices = [remoteVoice, englishVoice, localVoice, enhancedVoice];
  utterances = [];
  vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance);
  vi.stubGlobal('speechSynthesis', {
    getVoices: () => voices,
    speak: (utterance: FakeUtterance) => utterances.push(utterance),
    cancel: vi.fn(),
  });
  configureSpeech(createDefaultSettings('junior'));
});

afterEach(() => {
  stopQueue();
  stopSpeaking();
  vi.unstubAllGlobals();
});

describe('audio settings', () => {
  it('gives older profiles safe audio defaults when parsed', () => {
    const { musicEnabled, musicVolume, soundVolume, speechVoice, speechRate, speechVolume, petVoice, ...old } = createDefaultSettings('junior');
    expect(SettingsSchema.parse(old)).toMatchObject({
      soundEnabled: true,
      musicEnabled: false,
      musicVolume: 35,
      soundVolume: 65,
      speechVoice: '',
      speechRate: 1,
      speechVolume: 90,
      petVoice: 'studio',
    });
  });

  it('preserves older profiles and their existing sound preference during rehydration', () => {
    const profile = createNewProfile({ id: 'old', nickname: 'Kak', avatar: 'orange', mode: 'pro' });
    const { musicEnabled, musicVolume, soundVolume, speechVoice, speechRate, speechVolume, petVoice, ...settings } = profile.settings;
    const migrated = migratePersistedState({ activeProfileId: 'old', profiles: { old: { ...profile, xp: 120, settings } } });
    expect(migrated.profiles.old.xp).toBe(120);
    expect(migrated.profiles.old.settings).toMatchObject({ ...settings, soundVolume: 65, musicEnabled: false });
  });
});

const frequencies: number[] = [];
const gains: Array<{ setTargetAtTime: ReturnType<typeof vi.fn> }> = [];

class FakeAudioContext {
  currentTime = 0;
  state = 'running';
  destination = {};

  createGain() {
    const gain = {
      value: 1,
      setTargetAtTime: vi.fn(),
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
      linearRampToValueAtTime: vi.fn(),
    };
    gains.push(gain);
    return { gain, connect: vi.fn() };
  }

  createOscillator() {
    const frequency = { value: 0, setValueAtTime: (value: number) => { frequency.value = value; } };
    return { frequency, connect: vi.fn(), start: () => frequencies.push(frequency.value), stop: vi.fn() };
  }
}

describe('interface audio', () => {
  beforeEach(() => {
    vi.stubGlobal('AudioContext', FakeAudioContext);
    frequencies.length = 0;
  });

  it('plays one click for a plain button, a distinct back cue, and only the explicit answer cue', () => {
    configureSound(createDefaultSettings('junior'));
    const stopListening = listenForInterfaceSounds();
    try {
      const button = document.createElement('button');
      document.body.append(button);
      button.click();
      expect(frequencies.splice(0)).toEqual([640]);

      button.dataset.sfx = 'back';
      button.click();
      expect(frequencies.splice(0)).toEqual([440, 329.63]);

      delete button.dataset.sfx;
      button.addEventListener('click', () => playSound('correct', true), { once: true });
      button.click();
      expect(frequencies.splice(0)).toEqual([523.25, 659.25]);

      button.dataset.sfx = 'off';
      button.click();
      expect(frequencies).toEqual([]);

      delete button.dataset.sfx;
      configureSound({ ...createDefaultSettings('junior'), soundVolume: 0 });
      button.click();
      expect(frequencies).toEqual([]);

      configureSound(createDefaultSettings('pro'));
      button.dataset.sfxEnabled = 'true';
      button.click();
      expect(frequencies).toEqual([]);
      button.remove();
    } finally {
      stopListening();
      configureSound();
    }
  });

  it('lowers an enabled music channel while speaking and restores its own volume afterwards', () => {
    const settings = { ...createDefaultSettings('junior'), musicEnabled: true, musicVolume: 50 };
    markUserInteraction();
    configureSound(settings);
    try {
      const musicGain = gains[1].setTargetAtTime;
      expect(musicGain.mock.lastCall?.[0]).toBeCloseTo(0.16);
      setMusicSpeaking(true);
      expect(musicGain.mock.lastCall?.[0]).toBeCloseTo(0.0125);
      setMusicSpeaking(false);
      expect(musicGain.mock.lastCall?.[0]).toBeCloseTo(0.16);
      configureSound({ ...settings, musicEnabled: false });
      expect(musicGain.mock.lastCall?.[0]).toBe(0);
    } finally {
      configureSound();
    }
  });
});

const audioPlayers: FakeAudio[] = [];

class FakeAudio {
  src = '';
  volume = 1;
  defaultPlaybackRate = 1;
  playbackRate = 1;
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  play = vi.fn(() => Promise.resolve());
  pause = vi.fn();
  removeAttribute = vi.fn();

  constructor() {
    audioPlayers.push(this);
  }
}

describe('recorded speech', () => {
  beforeEach(() => {
    audioPlayers.length = 0;
    vi.stubGlobal('Audio', FakeAudio);
  });

  it('plays recorded clips in order using a single player and configured preferences', () => {
    const done = vi.fn();
    configureSpeech({ ...createDefaultSettings('junior'), speechRate: 0.85, speechVolume: 55 });
    expect(playRecordedSpeech(['/first.mp3', '/second.mp3'], done)).toBe(true);
    const player = audioPlayers[0];
    expect(player).toMatchObject({ src: '/first.mp3', volume: 0.55, playbackRate: 0.85 });
    player.onended?.();
    expect(player.src).toBe('/second.mp3');
    player.onended?.();
    expect(player.play).toHaveBeenCalledTimes(2);
    expect(done).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('preempts the companion when narration starts and ignores stale media end events', () => {
    const companionDone = vi.fn();
    const tryFallback = vi.fn();
    playRecordedSpeech(['/first.mp3', '/second.mp3'], companionDone, 'companion', tryFallback);
    const player = audioPlayers[0];
    const ended = player.onended;
    expect(speakText('Ini pelajaran.')).toBe(true);
    ended?.();
    expect(player.play).toHaveBeenCalledTimes(1);
    expect(player.pause).toHaveBeenCalled();
    expect(companionDone).toHaveBeenCalledExactlyOnceWith(false);
    expect(tryFallback).not.toHaveBeenCalled();
  });

  it('uses device speech as fallback if a studio clip fails to play', () => {
    const done = vi.fn();
    playRecordedSpeech(['/not-found.mp3'], done, 'companion', () => speakText('Ayo belajar.', done, 'companion'));
    audioPlayers[0].onerror?.();
    expect(utterances[0].text).toBe('Ayo belajar.');
    utterances[0].onend?.();
    expect(done).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('can use studio speech with no system voices and gives an active lesson priority', () => {
    voices = [];
    expect(canSpeakCompanion(PET_VOICE_SAMPLE)).toBe(true);
    expect(speakCompanion(PET_VOICE_SAMPLE)).toBe(true);
    expect(audioPlayers[0].src).toBe(petVoiceFiles(PET_VOICE_SAMPLE)[0]);

    voices = [localVoice];
    playQueue([{ text: 'Baca pelajaran.', el: 'body', part: 0 }]);
    expect(audioPlayers[0].pause).toHaveBeenCalled();
    expect(speakCompanion(PET_VOICE_SAMPLE)).toBe(false);
    expect(audioPlayers).toHaveLength(1);
    expect(utterances.map((utterance) => utterance.text)).toEqual(['Baca pelajaran.']);
  });
});

describe('speech playback', () => {
  it('prefers a higher-quality local Indonesian voice and respects an explicitly selected remote voice', () => {
    expect(getIndonesianVoice()).toBe(enhancedVoice);
    configureSpeech({ ...createDefaultSettings('junior'), speechVoice: remoteVoice.voiceURI });
    expect(getIndonesianVoice()).toBe(remoteVoice);
  });

  it('applies profile pacing and voice volume and falls back to a local Indonesian voice when a remote one fails', () => {
    const onEnd = vi.fn();
    configureSpeech({ ...createDefaultSettings('junior'), speechVoice: remoteVoice.voiceURI, speechRate: 0.85, speechVolume: 55 });
    expect(speakText('Bagaimana kabarmu?', onEnd)).toBe(true);
    expect(utterances[0]).toMatchObject({ lang: 'id-ID', rate: 0.85, volume: 0.55, voice: remoteVoice });
    utterances[0].onerror?.({ error: 'network' });
    expect(utterances[1].voice).toBe(enhancedVoice);
    utterances[1].onend?.();
    expect(onEnd).toHaveBeenCalledExactlyOnceWith(true);
  });

  it('ignores stale events after cancellation and never falls back to a non-Indonesian voice', () => {
    const onEnd = vi.fn();
    expect(speakText('Coba lagi.', onEnd)).toBe(true);
    const previousEnd = utterances[0].onend;
    stopSpeaking();
    previousEnd?.();
    expect(onEnd).toHaveBeenCalledExactlyOnceWith(false);
    voices = [englishVoice];
    expect(speakText('Coba lagi.')).toBe(false);
    expect(utterances).toHaveLength(1);
  });
});
