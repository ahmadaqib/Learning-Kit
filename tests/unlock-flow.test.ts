import { describe, expect, it } from 'vitest';
import { addDaysLocal } from '../src/engine/date';
import {
  getDueRetainWorlds,
  getVisibleLessonsForWorld,
  isWorldUnlocked,
} from '../src/engine/unlock';
import { createNewProfile } from '../src/store/useAppStore';
import type { Lesson, World } from '../src/content/schema';
import { mockFetch } from '../src/content/mock-api/mockFetch';

const mockWorlds: World[] = [
  {
    id: 'a01',
    track: 'A',
    order: 1,
    title: 'Kota Web',
    tagline: { junior: 't', pro: 't' },
    color: '#E4572E',
    illustration: 'a01',
    sourceChapters: ['J1-01'],
    requires: [],
    lessons: ['a01-l01', 'a01-l03'],
    sideQuests: [],
    boss: {
      title: 'Boss',
      greeting: { pro: 'hi' },
      guardianName: 'Penjaga',
      junior: { count: 8, pool: 'world' },
      pro: { count: 12, pool: 'world' },
      passRatio: 0.8,
    },
    anchors: { junior: [], pro: [] },
  },
  {
    id: 'b01',
    track: 'B',
    order: 1,
    title: 'Restoran API',
    tagline: { junior: 't', pro: 't' },
    color: '#0E9AA7',
    illustration: 'b01',
    sourceChapters: ['J2-01'],
    requires: ['a01'],
    lessons: ['b01-l01'],
    sideQuests: [],
    boss: {
      title: 'Boss',
      greeting: { pro: 'hi' },
      guardianName: 'Penjaga',
      junior: { count: 8, pool: 'world' },
      pro: { count: 12, pool: 'world' },
      passRatio: 0.8,
    },
    anchors: { junior: [], pro: [] },
  },
];

const mockLessonsMap: Record<string, Lesson> = {
  'a01-l01': {
    id: 'a01-l01',
    worldId: 'a01',
    title: 'L1',
    modes: ['junior', 'pro'],
    objective: { junior: 'o', pro: 'o' },
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: [],
    steps: [],
    reviewCards: [],
    recap: { junior: 'r', pro: 'r' },
  },
  'a01-l03': {
    id: 'a01-l03',
    worldId: 'a01',
    title: 'L3 Pro Only',
    modes: ['pro'],
    objective: { pro: 'o' },
    estMinutes: 5,
    introducesTerms: [],
    usesTerms: [],
    steps: [],
    reviewCards: [],
    recap: { pro: 'r' },
  },
};

describe('unlock rules, junior filter, dan mockFetch', () => {
  it('menyembunyikan pelajaran khusus Pro di mode Junior (F6)', () => {
    const juniorLessons = getVisibleLessonsForWorld(mockWorlds[0], mockLessonsMap, 'junior');
    expect(juniorLessons.map((l) => l.id)).toEqual(['a01-l01']);

    const proLessons = getVisibleLessonsForWorld(mockWorlds[0], mockLessonsMap, 'pro');
    expect(proLessons.map((l) => l.id)).toEqual(['a01-l01', 'a01-l03']);
  });

  it('membuka Jalur B saat A1 lulus (Junior) atau A1 & A4 lulus (Pro)', () => {
    const junior = createNewProfile({ nickname: 'Raka', avatar: 'kurir', mode: 'junior' });
    expect(isWorldUnlocked(mockWorlds[1], junior, mockWorlds)).toBe(false);
    junior.bosses['a01'] = { passed: true, best: 0.9, attempts: 1 };
    expect(isWorldUnlocked(mockWorlds[1], junior, mockWorlds)).toBe(true);

    const pro = createNewProfile({ nickname: 'Nadia', avatar: 'kurir', mode: 'pro' });
    pro.bosses['a01'] = { passed: true, best: 0.9, attempts: 1 };
    expect(isWorldUnlocked(mockWorlds[1], pro, mockWorlds)).toBe(false);
    pro.bosses['a04'] = { passed: true, best: 0.85, attempts: 1 };
    expect(isWorldUnlocked(mockWorlds[1], pro, mockWorlds)).toBe(true);
  });

  it('memunculkan Tes Ingat pada hari ke-7 sampai hari ke-21 setelah Tes Akhir (F14)', () => {
    const p = createNewProfile({ nickname: 'Raka', avatar: 'kurir', mode: 'junior' });
    const postDate = '2026-11-01';
    p.assessments['a01'] = {
      post: { score: 4, max: 5, at: postDate, answers: {} },
    };

    expect(getDueRetainWorlds(p, mockWorlds, addDaysLocal(postDate, 6))).toHaveLength(0);
    expect(getDueRetainWorlds(p, mockWorlds, addDaysLocal(postDate, 7))).toHaveLength(1);
    expect(getDueRetainWorlds(p, mockWorlds, addDaysLocal(postDate, 21))).toHaveLength(1);
    expect(getDueRetainWorlds(p, mockWorlds, addDaysLocal(postDate, 22))).toHaveLength(0);
  });

  it('mockFetch mengembalikan status 200, 404, 401, dan 403 tanpa panggilan jaringan luar', async () => {
    const ok = await mockFetch('GET', '/produk', undefined, { delayMs: 0 });
    expect(ok.status).toBe(200);

    const notFound = await mockFetch('GET', '/produk/999', undefined, { delayMs: 0 });
    expect(notFound.status).toBe(404);

    const unauth = await mockFetch('GET', '/profil', undefined, { delayMs: 0 });
    expect(unauth.status).toBe(401);

    const forbidden = await mockFetch('GET', '/profil', undefined, {
      delayMs: 0,
      headers: { Authorization: 'Bearer tamu-token' },
    });
    expect(forbidden.status).toBe(403);
  });
});
