import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { PetLauncher } from '@/components/pet/PetLauncher';
import { PetPortrait } from '@/components/pet/PetPortrait';
import { PET_IDS } from '@/content/petContract';
import { useAppStore } from '@/store/useAppStore';

const animate = vi.fn((_frames: Keyframe[]) => ({ cancel: vi.fn(), onfinish: null as (() => void) | null }));
const originalAnimate = Object.getOwnPropertyDescriptor(Element.prototype, 'animate');
const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
let hidden = false;

beforeEach(() => {
  vi.useFakeTimers();
  animate.mockClear();
  hidden = false;
  vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  vi.spyOn(document, 'hasFocus').mockReturnValue(true);
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate });
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value(this: HTMLDialogElement) { this.setAttribute('open', ''); },
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  delete document.documentElement.dataset.reducedMotion;
  Reflect.deleteProperty(Element.prototype, 'animate');
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
  if (originalAnimate) Object.defineProperty(Element.prototype, 'animate', originalAnimate);
  if (originalShowModal) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal);
});

function advance(ms: number) {
  act(() => vi.advanceTimersByTime(ms));
}

function figure(container: HTMLElement) {
  return container.querySelector<HTMLElement>('[data-pet-figure]');
}

describe('pet gestures', () => {
  it('gives each of the five full portraits an individual entrance in a fixed frame', () => {
    const poses = PET_IDS.map((petId) => {
      const { container, unmount } = render(<PetPortrait petId={petId} size={46} motion={{ arrival: 'greet' }} />);
      advance(300);
      const frames = animate.mock.lastCall?.[0];
      expect(frames?.at(-1)?.transform).toBe('none');
      expect(animate.mock.contexts.at(-1)).toBe(figure(container));
      expect(figure(container)?.dataset.petMotion).toBe('greet');
      expect(container.querySelector('img')).toHaveAttribute('src', `/pets/${petId}.webp`);
      expect(container.firstElementChild).toHaveStyle({ width: '46px', height: '46px' });
      unmount();
      return frames?.map((frame) => frame.transform).join();
    });
    expect(new Set(poses).size).toBe(PET_IDS.length);
  });

  it('looks around and settles after two idle gestures, postponing movement on interaction', () => {
    const { container } = render(<PetPortrait petId="ruru" size={46} motion={{ arrival: 'greet', ambient: true }} />);
    advance(300);
    advance(4_500);
    fireEvent.keyDown(document, { key: 'Tab' });
    advance(4_799);
    expect(animate).toHaveBeenCalledTimes(1);
    advance(1);
    expect(figure(container)?.dataset.petMotion).toBe('idle-look');
    advance(10_000);
    expect(figure(container)?.dataset.petMotion).toBe('idle-settle');
    animate.mock.results.at(-1)?.value.onfinish?.();
    advance(100_000);
    expect(animate).toHaveBeenCalledTimes(3);
    expect(figure(container)?.dataset.petMotion).toBeUndefined();
  });

  it('cancels an active gesture for hidden tabs, app reduced motion, and lesson suspension', async () => {
    const { container, rerender } = render(<PetPortrait petId="mobi" size={46} motion={{ arrival: 'advance', ambient: true }} />);
    advance(300);
    expect(figure(container)?.dataset.petMotion).toBe('advance');
    hidden = true;
    fireEvent(document, new Event('visibilitychange'));
    expect(animate.mock.results[0].value.cancel).toHaveBeenCalledOnce();
    advance(20_000);
    expect(animate).toHaveBeenCalledTimes(1);

    hidden = false;
    fireEvent(document, new Event('visibilitychange'));
    advance(4_800);
    expect(figure(container)?.dataset.petMotion).toBe('idle-look');
    await act(async () => { document.documentElement.dataset.reducedMotion = 'always'; });
    expect(figure(container)?.dataset.petMotion).toBeUndefined();
    advance(20_000);
    expect(animate).toHaveBeenCalledTimes(2);

    rerender(<PetPortrait petId="mobi" size={46} motion={{ ambient: true, suspended: true }} />);
    await act(async () => { delete document.documentElement.dataset.reducedMotion; });
    advance(20_000);
    expect(animate).toHaveBeenCalledTimes(2);
  });

  it('keeps the launcher clickable while moving and gives the dialog its own entrance', () => {
    useAppStore.setState({ activeProfileId: '', profiles: {} });
    useAppStore.getState().createProfile({ nickname: 'Ari', avatar: 'star', mode: 'junior' });
    const { container } = render(<MemoryRouter><PetLauncher context={{ surface: 'home' }} /></MemoryRouter>);
    advance(300);
    const launcher = screen.getByRole('button', { name: 'Buka Piko' });
    expect(figure(launcher)?.dataset.petMotion).toBe('greet');
    fireEvent.click(launcher);
    advance(0);
    const dialog = screen.getByRole('dialog', { name: 'Piko' });
    expect(figure(dialog)?.dataset.petMotion).toBe('engage');
    expect(figure(launcher)?.dataset.petMotion).toBeUndefined();
    expect(container.querySelectorAll('[data-pet-motion]')).toHaveLength(1);
  });

  it('keeps the lesson travel lane mounted across steps and removes it in Focus', () => {
    const props = {
      mode: 'junior' as const, sessionXp: 0, xpChipRef: null, bumpKey: 0, combo: 0,
      onToggleFocus: () => {}, onExit: () => {},
    };
    const step = (progress: number, focus = false, petTravelPaused = false) => (
      <LessonHeader
        {...props}
        progress={progress}
        focus={focus}
        petTravelPaused={petTravelPaused}
        pet={!focus && <button key={progress}>Buka Piko</button>}
      />
    );

    const { container, rerender } = render(step(0));
    const traveler = container.querySelector('[data-pet-travel]');
    expect(traveler).toHaveStyle({ transform: 'translateX(0%)' });
    const exit = screen.getByRole('button', { name: 'Keluar pelajaran' });
    rerender(step(38));
    expect(container.querySelector('[data-pet-travel]')).toBe(traveler);
    expect(screen.getByRole('button', { name: 'Keluar pelajaran' })).toBe(exit);
    expect(traveler).toHaveStyle({ transform: 'translateX(38%)' });
    expect(traveler).toHaveAttribute('data-pet-travel', 'on');

    rerender(step(38, false, true));
    expect(traveler).toHaveAttribute('data-pet-travel', 'off');
    rerender(step(38, true));
    expect(container.querySelector('[data-pet-lane]')).toBeNull();
    expect(screen.getByRole('progressbar', { name: 'Kemajuan pelajaran' })).toHaveAttribute('aria-valuenow', '38');
  });
});
