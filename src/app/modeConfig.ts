/**
 * Everything the UI says about a mode comes from here. No page hard-codes "Junior", "XP", "Lv" or
 * "Buku Stiker" (spec 7). The internal mode ids stay 'junior' and 'pro'.
 */
import type { Mode } from '@/content/schema';

/** Names shown in the UI. 'junior' is called "Petualang". */
export const MODE_LABEL: Record<Mode, string> = {
  junior: 'Petualang',
  pro: 'Pro',
};

/** The label where a learner chooses a mode. Pro always says it starts from zero. */
export const MODE_CHOICE_LABEL: Record<Mode, string> = {
  junior: 'Petualang',
  pro: 'Pro (mulai dari nol)',
};

/** Reward word: Junior never says "XP". */
export function xpWord(mode: Mode): string {
  return mode === 'junior' ? 'poin' : 'XP';
}

/** "Level 3" in Junior, "Lv 3" in Pro. */
export function levelLabel(level: number, mode: Mode): string {
  return mode === 'junior' ? `Level ${level}` : `Lv ${level}`;
}

export interface CollectionLabel {
  /** Bottom-nav label. */
  nav: string;
  /** Page title and tile title. */
  title: string;
  /** What one item is called, lower case: "stiker" or "konsep". */
  unit: string;
}

/** The collection route: "Buku Stiker" for Petualang, "Koleksi Konsep" for Pro. Pro never says "stiker". */
export const COLLECTION_LABEL: Record<Mode, CollectionLabel> = {
  junior: { nav: 'Stiker', title: 'Buku Stiker', unit: 'stiker' },
  pro: { nav: 'Koleksi', title: 'Koleksi Konsep', unit: 'konsep' },
};

/** How many due Leitner cards a warm-up before a lesson draws (it used to be 5 and 10). */
export const WARMUP_CAP: Record<Mode, number> = {
  junior: 3,
  pro: 5,
};
