import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDefaultSettings } from '@/store/useAppStore';

/** Records which sample each played buffer came from, and which tones were synthesized. */
function fakeAudio(missing: string[] = []) {
  const played: string[] = [];
  const tones: number[] = [];
  class Ctx {
    currentTime = 0;
    state = 'running';
    destination = {};
    createGain() {
      return { gain: { value: 1, setTargetAtTime: vi.fn(), setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() }, connect: vi.fn() };
    }
    createOscillator() {
      const frequency = { value: 0, setValueAtTime: (v: number) => { frequency.value = v; } };
      return { frequency, type: '', connect: vi.fn(), start: () => tones.push(frequency.value), stop: vi.fn() };
    }
    createBufferSource() {
      const source = { buffer: null as { name: string } | null, connect: vi.fn(), start: () => played.push(source.buffer!.name) };
      return source;
    }
    decodeAudioData(data: ArrayBuffer) {
      return Promise.resolve({ name: new TextDecoder().decode(data) });
    }
    resume() { return Promise.resolve(); }
  }
  vi.stubGlobal('AudioContext', Ctx);
  vi.stubGlobal('fetch', vi.fn(async (url: string) => {
    const name = url.replace('/audio/ui/', '').replace('.mp3', '');
    return missing.includes(name) ? new Response('', { status: 404 }) : new Response(new TextEncoder().encode(name));
  }));
  return { played, tones };
}

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
  document.body.innerHTML = '';
});

describe('recorded UI sounds', () => {
  it('plays the matching file for taps, back, switches, choices and chat cues', async () => {
    const { played } = fakeAudio();
    const sound = await import('@/engine/sound');
    sound.configureSound({ ...createDefaultSettings('pro'), soundEnabled: true });
    const stop = sound.listenForInterfaceSounds();
    try {
      const button = document.createElement('button');
      document.body.append(button);
      button.click();
      await flush();
      played.length = 0;

      button.click();
      button.dataset.sfx = 'back';
      button.click();

      const toggle = document.createElement('button');
      toggle.setAttribute('role', 'switch');
      toggle.setAttribute('aria-checked', 'true');
      document.body.append(toggle);
      toggle.click();
      toggle.setAttribute('aria-checked', 'false');
      toggle.click();

      const choice = document.createElement('button');
      choice.setAttribute('role', 'radio');
      document.body.append(choice);
      choice.click();

      sound.playSound('send', true);
      sound.playSound('receive', true);
      sound.playSound('levelup', true);
      expect(played).toEqual(['press', 'back', 'toggle-on', 'toggle-off', 'select', 'send', 'receive', 'level-up']);
    } finally {
      stop();
    }
  });

  it('falls back to a synthesized tone when a file is missing, and keeps the pet sounds synthesized', async () => {
    const { played, tones } = fakeAudio(['success']);
    const sound = await import('@/engine/sound');
    sound.configureSound({ ...createDefaultSettings('pro'), soundEnabled: true });
    sound.markUserInteraction();
    sound.playSound('tap', true);
    await flush();
    played.length = 0;
    tones.length = 0;

    sound.playSound('correct', true);
    sound.playSound('bip', true);
    expect(played).toEqual([]);
    expect(tones).toEqual([523.25, 659.25, 659.25, 987.77]);
  });
});
