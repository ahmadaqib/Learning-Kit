import { beforeEach, describe, expect, it } from 'vitest';
import { hasSeen, isPrimed, markSeen, primeSeen, SEEN_STORAGE_KEY } from '../src/engine/seen';

describe('seen flags', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with nothing seen and remembers what is marked', () => {
    expect(hasSeen('p1', 'unlock:world:a02')).toBe(false);
    markSeen('p1', 'unlock:world:a02');
    expect(hasSeen('p1', 'unlock:world:a02')).toBe(true);
    expect(hasSeen('p1', 'unlock:world:a03')).toBe(false);
  });

  it('keeps profiles apart', () => {
    markSeen('p1', 'flip:s1');
    expect(hasSeen('p2', 'flip:s1')).toBe(false);
  });

  it('marking twice stores the key once', () => {
    markSeen('p1', 'day:2026-11-23');
    markSeen('p1', 'day:2026-11-23');
    const stored = JSON.parse(localStorage.getItem(SEEN_STORAGE_KEY) ?? '{}');
    expect(stored.p1.keys).toEqual(['day:2026-11-23']);
  });

  it('primeSeen marks the keys on the first call for a profile', () => {
    expect(isPrimed('p1')).toBe(false);
    primeSeen('p1', ['unlock:world:a01', 'unlock:lesson:l1']);
    expect(isPrimed('p1')).toBe(true);
    expect(hasSeen('p1', 'unlock:world:a01')).toBe(true);
    expect(hasSeen('p1', 'unlock:lesson:l1')).toBe(true);
  });

  it('primeSeen has no effect the second time for the same profile', () => {
    primeSeen('p1', ['unlock:world:a01']);
    primeSeen('p1', ['unlock:world:a02', 'unlock:lesson:l9']);
    expect(hasSeen('p1', 'unlock:world:a01')).toBe(true);
    expect(hasSeen('p1', 'unlock:world:a02')).toBe(false);
    expect(hasSeen('p1', 'unlock:lesson:l9')).toBe(false);
  });

  it('primeSeen is per profile: another profile still gets its first priming', () => {
    primeSeen('p1', ['unlock:world:a01']);
    primeSeen('p2', ['unlock:world:a05']);
    expect(hasSeen('p2', 'unlock:world:a05')).toBe(true);
    expect(hasSeen('p2', 'unlock:world:a01')).toBe(false);
  });

  it('marking after priming still works, and priming keeps keys that were marked before it', () => {
    markSeen('p1', 'offer:pro');
    primeSeen('p1', ['unlock:world:a01']);
    expect(hasSeen('p1', 'offer:pro')).toBe(true);
    markSeen('p1', 'bonus:l1');
    expect(hasSeen('p1', 'bonus:l1')).toBe(true);
  });

  it('survives corrupt storage', () => {
    localStorage.setItem(SEEN_STORAGE_KEY, '{not json');
    expect(hasSeen('p1', 'x')).toBe(false);
    markSeen('p1', 'x');
    expect(hasSeen('p1', 'x')).toBe(true);
  });
});
