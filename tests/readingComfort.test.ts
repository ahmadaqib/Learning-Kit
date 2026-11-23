import { beforeEach, describe, expect, it } from 'vitest';
import {
  applyReadingComfort,
  getReadingComfort,
  READING_STORAGE_KEY,
  setReadingComfort,
} from '../src/engine/readingComfort';

describe('reading comfort', () => {
  beforeEach(() => {
    localStorage.clear();
    delete document.documentElement.dataset.reading;
  });

  it('is off by default', () => {
    expect(getReadingComfort('p1')).toBe(false);
    expect(applyReadingComfort('p1')).toBe(false);
    expect(document.documentElement.dataset.reading).toBeUndefined();
  });

  it('is stored per profile in its own key', () => {
    setReadingComfort('p1', true);
    expect(getReadingComfort('p1')).toBe(true);
    expect(getReadingComfort('p2')).toBe(false);
    expect(JSON.parse(localStorage.getItem(READING_STORAGE_KEY) ?? '{}')).toEqual({ p1: true });
  });

  it('setting it applies data-reading="comfort" at once', () => {
    setReadingComfort('p1', true);
    expect(document.documentElement.dataset.reading).toBe('comfort');
    setReadingComfort('p1', false);
    expect(document.documentElement.dataset.reading).toBeUndefined();
  });

  it('applyReadingComfort follows the active profile', () => {
    setReadingComfort('p1', true);
    expect(applyReadingComfort('p2')).toBe(false);
    expect(document.documentElement.dataset.reading).toBeUndefined();
    expect(applyReadingComfort('p1')).toBe(true);
    expect(document.documentElement.dataset.reading).toBe('comfort');
  });

  it('does not touch the profile store key', () => {
    setReadingComfort('p1', true);
    expect(localStorage.getItem('petualang-web')).toBeNull();
  });

  it('survives corrupt storage', () => {
    localStorage.setItem(READING_STORAGE_KEY, 'oops');
    expect(getReadingComfort('p1')).toBe(false);
    setReadingComfort('p1', true);
    expect(getReadingComfort('p1')).toBe(true);
  });
});
