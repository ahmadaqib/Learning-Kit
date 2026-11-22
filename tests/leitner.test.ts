import { describe, expect, it } from 'vitest';
import {
  LEITNER_INTERVALS,
  countAllDueCards,
  getDueLeitnerCards,
  scheduleNextCard,
} from '../src/engine/leitner';
import { addDaysLocal, formatLocalDate, getConsecutiveTargetWeeks } from '../src/engine/date';

describe('Leitner spaced repetition & tanggal lokal', () => {
  it('menjadwal ulang sesuai interval 1, 2, 4, 7, 14, dan 30 hari (§7.7)', () => {
    const today = '2026-11-22';
    const b1 = scheduleNextCard(undefined, true, today);
    expect(b1.box).toBe(2);
    expect(b1.due).toBe(addDaysLocal(today, LEITNER_INTERVALS[2]));

    const b2 = scheduleNextCard(b1, true, b1.due);
    expect(b2.box).toBe(3);
    expect(b2.due).toBe(addDaysLocal(b1.due, LEITNER_INTERVALS[3]));

    const b4 = scheduleNextCard({ box: 4, due: today }, true, today);
    expect(b4.box).toBe(5);
    expect(b4.due).toBe(addDaysLocal(today, 14));

    const b5 = scheduleNextCard({ box: 5, due: today }, true, today);
    expect(b5.box).toBe(5);
    expect(b5.due).toBe(addDaysLocal(today, 30));

    // Salah -> kembali ke kotak 1 (besok)
    const wrong = scheduleNextCard({ box: 4, due: today }, false, today);
    expect(wrong.box).toBe(1);
    expect(wrong.due).toBe('2026-11-23');
  });

  it('membatasi jumlah kartu sesi: Junior 5, Pro 10, mendahulukan yang paling terlambat', () => {
    const cards: Record<string, { box: 1 | 2 | 3 | 4 | 5; due: string }> = {};
    for (let i = 1; i <= 15; i += 1) {
      const day = String(i).padStart(2, '0');
      cards[`c-${i}`] = { box: 1, due: `2026-11-${day}` };
    }
    const today = '2026-11-20';
    expect(countAllDueCards(cards, today)).toBe(15);

    const juniorQueue = getDueLeitnerCards(cards, today, 'junior');
    expect(juniorQueue).toHaveLength(5);
    expect(juniorQueue[0].cardId).toBe('c-1');

    const proQueue = getDueLeitnerCards(cards, today, 'pro');
    expect(proQueue).toHaveLength(10);
  });

  it('menghitung minggu target berturut-turut secara lokal', () => {
    const ref = new Date(2026, 10, 22); // 2026-11-22 (Minggu)
    const todayStr = formatLocalDate(ref);
    expect(todayStr).toBe('2026-11-22');
    const weeks = {
      '2026-W47': ['2026-11-17', '2026-11-19', '2026-11-22'],
      '2026-W46': ['2026-11-10', '2026-11-12', '2026-11-14'],
    };
    expect(getConsecutiveTargetWeeks(weeks, 3, ref)).toBe(2);
  });
});
