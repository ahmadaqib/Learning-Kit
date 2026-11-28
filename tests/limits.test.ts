import { describe, expect, it } from 'vitest';
import { createLimiter } from '../server/aiGuard';
import { deviceId } from '@/engine/deviceId';

describe('AI request limits', () => {
  it('counts each device on a shared IP separately, caps the hour, and frees in-flight slots', () => {
    const limiter = createLimiter({ perMinute: 2, perHour: 3, perInstanceMinute: 100, inFlight: 100 });
    const take = (id: string, t: number) => {
      const ok = limiter.take(id, t);
      if (ok) limiter.release();
      return ok;
    };
    expect([take('1.2.3.4|a', 0), take('1.2.3.4|a', 1), take('1.2.3.4|a', 2)]).toEqual([true, true, false]);
    expect(take('1.2.3.4|b', 3)).toBe(true);
    expect(take('1.2.3.4|a', 61_000)).toBe(true);
    expect(take('1.2.3.4|a', 122_000)).toBe(false);

    const busy = createLimiter({ perMinute: 10, perHour: 10, perInstanceMinute: 10, inFlight: 1 });
    expect(busy.take('x', 0)).toBe(true);
    expect(busy.take('y', 0)).toBe(false);
    busy.release();
    expect(busy.take('y', 0)).toBe(true);
  });

  it('gives this browser one stable random id', () => {
    localStorage.clear();
    const id = deviceId();
    expect(id).toMatch(/^[a-z0-9-]{16,64}$/);
    expect(deviceId()).toBe(id);
  });
});
