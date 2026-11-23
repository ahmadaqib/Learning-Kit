import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePetLessonOffer } from '@/engine/usePetLessonOffer';

describe('optional lesson help', () => {
  let hidden = false;

  beforeEach(() => {
    hidden = false;
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date', 'performance'] });
    vi.spyOn(document, 'hasFocus').mockReturnValue(true);
    vi.spyOn(document, 'hidden', 'get').mockImplementation(() => hidden);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  function advance(ms: number) {
    act(() => { vi.advanceTimersByTime(ms); });
  }

  function setTabHidden(value: boolean) {
    hidden = value;
    act(() => { document.dispatchEvent(new Event('visibilitychange')); });
  }

  it('counts only visible time and pauses when focus mode is on', () => {
    const initialProps = { profileId: 'timer-profile', stepKey: '1', enabled: true, blocked: false };
    const { result, rerender } = renderHook(usePetLessonOffer, { initialProps });
    advance(25_000);
    setTabHidden(true);
    advance(90_000);
    expect(result.current.offer).toBeUndefined();
    setTabHidden(false);
    advance(25_000);
    rerender({ ...initialProps, enabled: false });
    advance(90_000);
    expect(result.current.offer).toBeUndefined();
    rerender(initialProps);
    advance(24_999);
    expect(result.current.offer).toBeUndefined();
    advance(1);
    expect(result.current.offer).toBe('taking_time');
  });

  it('offers help after two consecutive misses once feedback closes, with a cooldown across visits', () => {
    const initialProps = { profileId: 'misses-profile', stepKey: '1', enabled: true, blocked: false };
    const first = renderHook(usePetLessonOffer, { initialProps });
    first.result.current.recordAttempt(false);
    first.rerender({ ...initialProps, stepKey: '2' });
    advance(0);
    expect(first.result.current.offer).toBeUndefined();
    first.result.current.recordAttempt(false);
    first.rerender({ ...initialProps, stepKey: '2', blocked: true });
    advance(1_000);
    expect(first.result.current.offer).toBeUndefined();
    first.rerender({ ...initialProps, stepKey: '3' });
    advance(0);
    expect(first.result.current.offer).toBe('stuck');
    act(() => { first.result.current.dismiss(); });
    expect(first.result.current.offer).toBeUndefined();
    first.unmount();

    const second = renderHook(usePetLessonOffer, { initialProps });
    advance(75_000);
    expect(second.result.current.offer).toBeUndefined();
    advance(45_000);
    expect(second.result.current.offer).toBe('taking_time');
  });
});
