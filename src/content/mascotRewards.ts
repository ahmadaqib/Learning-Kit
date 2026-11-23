/**
 * Bito's accessories and the level that unlocks each one. Moved out of ProfilePage.tsx so the level-up
 * overlay can name the next reward ("Di Level 4: syal untuk Bito").
 */
import type { MascotCustom } from './schema';

export type MascotAccessory = MascotCustom['accessory'];

export interface MascotReward {
  id: MascotAccessory;
  /** Button label as ProfilePage shows it today, e.g. "Topi (Lv 2)". */
  label: string;
  /** Short noun used in sentences, lower case. "Polos" has none. */
  noun: string;
  minLv: number;
}

export const MASCOT_ACCESSORIES: readonly MascotReward[] = [
  { id: 'none', label: 'Polos', noun: 'polos', minLv: 1 },
  { id: 'cap', label: 'Topi (Lv 2)', noun: 'topi', minLv: 2 },
  { id: 'glasses', label: 'Kacamata (Lv 3)', noun: 'kacamata', minLv: 3 },
  { id: 'scarf', label: 'Syal (Lv 4)', noun: 'syal', minLv: 4 },
];

export interface NextReward {
  id: MascotAccessory;
  minLv: number;
  noun: string;
  /** "Di Level 4: syal untuk Bito" */
  text: string;
}

/** The first accessory that unlocks above `level`, or null when every accessory is already open. */
export function nextReward(level: number): NextReward | null {
  const next = MASCOT_ACCESSORIES.find((a) => a.minLv > level);
  if (!next) return null;
  return {
    id: next.id,
    minLv: next.minLv,
    noun: next.noun,
    text: `Di Level ${next.minLv}: ${next.noun} untuk Bito`,
  };
}
