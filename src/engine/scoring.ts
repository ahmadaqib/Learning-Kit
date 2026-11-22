import type { Mode } from '@/content/schema';

export const XP_RULES = {
  FIRST_TRY_CORRECT: 10,
  RETRY_CORRECT: 3,
  LESSON_COMPLETE: 20,
  THREE_STAR_BONUS: 15,
  LEITNER_SESSION: 15,
  BOSS_PASS: 50,
  SIDE_QUEST: 25,
  PRE_TEST: 10,
  POST_TEST: 20,
  RETAIN_TEST: 30,
  OPEN_APP: 0,
} as const;

export function calculateStars(firstTryCorrect: number, totalQuestions: number): 0 | 1 | 2 | 3 {
  if (totalQuestions <= 0) return 1;
  const ratio = firstTryCorrect / totalQuestions;
  if (ratio >= 1) return 3;
  if (ratio >= 0.8) return 2;
  return 1;
}

export function calculateLessonXp(params: {
  firstTryCorrect: number;
  retryCorrect: number;
  stars: 0 | 1 | 2 | 3;
  isSideQuest?: boolean;
}): number {
  const qXp =
    params.firstTryCorrect * XP_RULES.FIRST_TRY_CORRECT +
    params.retryCorrect * XP_RULES.RETRY_CORRECT;
  const finishXp = params.isSideQuest ? XP_RULES.SIDE_QUEST : XP_RULES.LESSON_COMPLETE;
  const starBonus = !params.isSideQuest && params.stars === 3 ? XP_RULES.THREE_STAR_BONUS : 0;
  return qXp + finishXp + starBonus;
}

export function xpRequiredForLevel(level: number): number {
  if (level <= 1) return 0;
  const n = level - 1;
  return 50 * n * (n + 1);
}

const JUNIOR_TITLES: Record<number, string> = {
  1: 'Penjelajah Kecil',
  2: 'Penjelajah',
  3: 'Pembuat Halaman',
  4: 'Penata Warna',
  5: 'Penjaga Pintu',
  6: 'Pengantar Pesan',
  7: 'Penjaga Benteng',
  8: 'Arsitek Muda',
};

const PRO_TITLES: Record<number, string> = {
  1: 'Pemula',
  2: 'Pelajar',
  3: 'Perakit Halaman',
  4: 'Penata Tampilan',
  5: 'Perancang Antarmuka',
  6: 'Penghubung API',
  7: 'Penjaga Keamanan',
  8: 'Arsitek Frontend',
};

export interface LevelInfo {
  level: number;
  title: string;
  currentXp: number;
  levelFloorXp: number;
  nextLevelXp: number;
  progressRatio: number;
}

export function getLevelFromXp(xp: number, mode: Mode): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp));
  let level = 1;
  while (xpRequiredForLevel(level + 1) <= safeXp) {
    level += 1;
  }
  const floorXp = xpRequiredForLevel(level);
  const nextXp = xpRequiredForLevel(level + 1);
  const span = Math.max(1, nextXp - floorXp);
  const title =
    level >= 9
      ? 'Petualang Web Sejati'
      : mode === 'junior'
        ? JUNIOR_TITLES[level] ?? 'Petualang Web Sejati'
        : PRO_TITLES[level] ?? 'Petualang Web Sejati';

  return {
    level,
    title,
    currentXp: safeXp,
    levelFloorXp: floorXp,
    nextLevelXp: nextXp,
    progressRatio: Math.min(1, Math.max(0, (safeXp - floorXp) / span)),
  };
}

/**
 * Kenaikan ternormalisasi Hake: (Akhir - Awal) / (Maks - Awal)
 */
export function calculateNormalizedGain(pre: number, post: number, max: number): number {
  if (max <= 0) return 0;
  if (pre >= max) {
    return post >= max ? 1 : 0;
  }
  return Number(((post - pre) / (max - pre)).toFixed(2));
}

export function getNormalizedGainCategory(gain: number): 'tinggi' | 'sedang' | 'rendah' {
  if (gain >= 0.7) return 'tinggi';
  if (gain >= 0.3) return 'sedang';
  return 'rendah';
}

/**
 * Retensi = Tes Ingat / Tes Akhir
 */
export function calculateRetention(post: number, retain: number): number {
  if (post <= 0) return retain > 0 ? 1 : 0;
  return Number((retain / post).toFixed(2));
}
