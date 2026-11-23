import { beforeEach, describe, expect, it } from 'vitest';
import {
  RECORDS_STORAGE_KEY,
  createVisibleTimer,
  formatDuration,
  formatScore,
  getRecord,
  kilatRecordKey,
  lessonRecordKey,
  recordAttempt,
  resetRecordsMemory,
} from '../src/engine/records';

beforeEach(() => {
  localStorage.clear();
  resetRecordsMemory();
});

describe('personal records (Pro)', () => {
  it('stores the first attempt without calling it a record', () => {
    const res = recordAttempt('p1', lessonRecordKey('a01-l01'), { firstTry: 4, total: 5, ms: 250_000 });
    expect(res.previous).toBeNull();
    expect(res.isNew).toBe(false);
    expect(res.best.bestFirstTry).toBe(4);
    expect(res.best.bestMs).toBe(250_000);
    expect(getRecord('p1', lessonRecordKey('a01-l01'))?.bestFirstTry).toBe(4);
  });

  it('flags a better score as a new record', () => {
    recordAttempt('p1', 'lesson:x', { firstTry: 3, total: 5, ms: 200_000 });
    const res = recordAttempt('p1', 'lesson:x', { firstTry: 4, total: 5, ms: 260_000 });
    expect(res.newScoreRecord).toBe(true);
    expect(res.newTimeRecord).toBe(false);
    expect(res.isNew).toBe(true);
    expect(res.best.bestFirstTry).toBe(4);
    // the slower time does not replace the best time
    expect(res.best.bestMs).toBe(200_000);
  });

  it('flags a faster time as a new record on its own', () => {
    recordAttempt('p1', 'lesson:x', { firstTry: 5, total: 5, ms: 220_000 });
    const res = recordAttempt('p1', 'lesson:x', { firstTry: 4, total: 5, ms: 200_000 });
    expect(res.newScoreRecord).toBe(false);
    expect(res.newTimeRecord).toBe(true);
    expect(res.isNew).toBe(true);
    expect(res.best.bestFirstTry).toBe(5);
    expect(res.best.bestMs).toBe(200_000);
  });

  it('says nothing special when neither number is beaten and keeps the best', () => {
    recordAttempt('p1', 'lesson:x', { firstTry: 5, total: 5, ms: 200_000 });
    const res = recordAttempt('p1', 'lesson:x', { firstTry: 4, total: 5, ms: 300_000 });
    expect(res.isNew).toBe(false);
    expect(res.best.bestFirstTry).toBe(5);
    expect(res.best.bestMs).toBe(200_000);
  });

  it('compares scores as a ratio, so a lesson that gained a question is not a loss', () => {
    recordAttempt('p1', 'lesson:x', { firstTry: 4, total: 5, ms: 0 });
    const res = recordAttempt('p1', 'lesson:x', { firstTry: 4, total: 6, ms: 0 });
    expect(res.newScoreRecord).toBe(false);
    expect(res.best.total).toBe(5);
  });

  it('ignores a time of zero', () => {
    recordAttempt('p1', 'lesson:x', { firstTry: 4, total: 5, ms: 180_000 });
    const res = recordAttempt('p1', 'lesson:x', { firstTry: 4, total: 5, ms: 0 });
    expect(res.newTimeRecord).toBe(false);
    expect(res.best.bestMs).toBe(180_000);
  });

  it('keeps one record per profile and per key, and the kilat key carries the session size', () => {
    recordAttempt('p1', lessonRecordKey('a'), { firstTry: 2, total: 3, ms: 1000 });
    recordAttempt('p2', lessonRecordKey('a'), { firstTry: 3, total: 3, ms: 2000 });
    recordAttempt('p1', kilatRecordKey(5), { firstTry: 5, total: 5, ms: 40_000 });
    expect(getRecord('p1', lessonRecordKey('a'))?.bestFirstTry).toBe(2);
    expect(getRecord('p2', lessonRecordKey('a'))?.bestFirstTry).toBe(3);
    expect(getRecord('p1', kilatRecordKey(5))?.bestMs).toBe(40_000);
    expect(getRecord('p1', kilatRecordKey(10))).toBeNull();
  });

  it('survives corrupt storage', () => {
    localStorage.setItem(RECORDS_STORAGE_KEY, '{not json');
    expect(getRecord('p1', 'lesson:x')).toBeNull();
    const res = recordAttempt('p1', 'lesson:x', { firstTry: 1, total: 2, ms: 10 });
    expect(res.best.bestFirstTry).toBe(1);
  });
});

describe('formatting', () => {
  it('formats durations in Indonesian', () => {
    expect(formatDuration(45_000)).toBe('45 dtk');
    expect(formatDuration(250_000)).toBe('4 mnt 10 dtk');
    expect(formatDuration(240_000)).toBe('4 mnt');
    expect(formatDuration(0)).toBe('0 dtk');
  });

  it('formats the first-try score', () => {
    expect(formatScore(4, 5)).toBe('4 dari 5 benar di percobaan pertama');
  });
});

describe('visible timer', () => {
  it('counts up from a starting value and never goes down', () => {
    let now = 1_000;
    const timer = createVisibleTimer(5_000, () => now);
    now += 2_000;
    expect(timer.elapsedMs()).toBe(7_000);
    now += 1_000;
    expect(timer.elapsedMs()).toBe(8_000);
    timer.dispose();
  });

  it('stops counting while the document is hidden', () => {
    let now = 0;
    const timer = createVisibleTimer(0, () => now);
    now += 3_000;
    Object.defineProperty(document, 'hidden', { value: true, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    now += 60_000;
    expect(timer.elapsedMs()).toBe(3_000);
    Object.defineProperty(document, 'hidden', { value: false, configurable: true });
    document.dispatchEvent(new Event('visibilitychange'));
    now += 2_000;
    expect(timer.elapsedMs()).toBe(5_000);
    timer.dispose();
  });

  it('can be reset to a restored value', () => {
    let now = 0;
    const timer = createVisibleTimer(0, () => now);
    now += 1_000;
    timer.reset(9_000);
    now += 500;
    expect(timer.elapsedMs()).toBe(9_500);
    timer.dispose();
  });
});
