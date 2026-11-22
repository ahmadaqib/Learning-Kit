import { describe, expect, it } from 'vitest';
import {
  XP_RULES,
  calculateLessonXp,
  calculateNormalizedGain,
  calculateRetention,
  calculateStars,
  getLevelFromXp,
} from '../src/engine/scoring';

describe('scoring engine', () => {
  it('menghitung bintang pelajaran dengan benar (§7.2)', () => {
    expect(calculateStars(5, 5)).toBe(3);
    expect(calculateStars(4, 5)).toBe(2);
    expect(calculateStars(3, 5)).toBe(1);
    expect(calculateStars(0, 5)).toBe(1);
  });

  it('menghitung XP pelajaran dan bonus bintang 3 (§7.3)', () => {
    expect(
      calculateLessonXp({
        firstTryCorrect: 5,
        retryCorrect: 0,
        stars: 3,
      }),
    ).toBe(5 * XP_RULES.FIRST_TRY_CORRECT + XP_RULES.LESSON_COMPLETE + XP_RULES.THREE_STAR_BONUS);

    expect(
      calculateLessonXp({
        firstTryCorrect: 3,
        retryCorrect: 2,
        stars: 1,
      }),
    ).toBe(3 * 10 + 2 * 3 + 20);
  });

  it('menghitung level berdasarkan rumus 50 * n * (n + 1) (§7.4)', () => {
    expect(getLevelFromXp(0, 'junior').level).toBe(1);
    expect(getLevelFromXp(99, 'junior').level).toBe(1);
    expect(getLevelFromXp(100, 'junior')).toMatchObject({ level: 2, title: 'Penjelajah' });
    expect(getLevelFromXp(300, 'pro')).toMatchObject({ level: 3, title: 'Perakit Halaman' });
    expect(getLevelFromXp(2800, 'pro')).toMatchObject({ level: 8, title: 'Arsitek Frontend' });
    expect(getLevelFromXp(3600, 'junior')).toMatchObject({ level: 9, title: 'Petualang Web Sejati' });
  });

  it('menghitung kenaikan ternormalisasi Hake dan retensi termasuk skor awal maksimal (§7.10)', () => {
    expect(calculateNormalizedGain(1, 5, 5)).toBe(1);
    expect(calculateNormalizedGain(1, 3, 5)).toBe(0.5);
    expect(calculateNormalizedGain(5, 5, 5)).toBe(1);
    expect(calculateNormalizedGain(5, 4, 5)).toBe(0);
    expect(calculateRetention(5, 4)).toBe(0.8);
    expect(calculateRetention(0, 0)).toBe(0);
  });
});
