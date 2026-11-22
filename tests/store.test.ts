import { beforeEach, describe, expect, it } from 'vitest';
import { MAX_PROFILES, useAppStore } from '../src/store/useAppStore';

describe('useAppStore profiles & export/import', () => {
  beforeEach(() => {
    localStorage.clear();
    useAppStore.setState({
      schemaVersion: 1,
      activeProfileId: '',
      profiles: {},
    });
  });

  it('membatasi maksimal 4 profil per perangkat dan menjaga isolasi data (F9)', () => {
    const store = useAppStore.getState();
    const p1 = store.createProfile({ nickname: 'Raka', avatar: 'robot', mode: 'junior' });
    const p2 = store.createProfile({ nickname: 'Nadia', avatar: 'rocket', mode: 'pro' });
    const p3 = store.createProfile({ nickname: 'Rani', avatar: 'star', mode: 'pro' });
    const p4 = store.createProfile({ nickname: 'Dimas', avatar: 'compass', mode: 'junior' });
    const p5 = store.createProfile({ nickname: 'Sari', avatar: 'book', mode: 'junior' });

    expect(p1).toBeTruthy();
    expect(p2).toBeTruthy();
    expect(p3).toBeTruthy();
    expect(p4).toBeTruthy();
    expect(p5).toBeNull();
    expect(Object.keys(useAppStore.getState().profiles)).toHaveLength(MAX_PROFILES);

    // Tambah XP pada p4, p1 tetap 0
    useAppStore.getState().completeAssessment({
      worldId: 'a01',
      kind: 'pre',
      score: 2,
      max: 5,
      answers: { q1: 'a' },
    });
    expect(useAppStore.getState().profiles[p4!].xp).toBe(10);
    expect(useAppStore.getState().profiles[p1!].xp).toBe(0);
  });

  it('ekspor dan impor kode progres menghasilkan state identik (F8)', () => {
    const store = useAppStore.getState();
    const p1 = store.createProfile({ nickname: 'Raka', avatar: 'robot', mode: 'junior' })!;
    store.completeLesson({
      lessonId: 'a01-l01',
      firstTryCorrect: 4,
      retryCorrect: 0,
      totalQuestions: 4,
      stickerId: 'restoran',
      reviewCardIds: ['a01-l01-r1'],
    });

    const exported = useAppStore.getState().exportActiveProfile();
    expect(exported).toBeTruthy();
    expect(exported!.text.startsWith('PW1.')).toBe(true);

    // Buat profil kosong dan impor ke sana
    const p2 = useAppStore.getState().createProfile({ nickname: 'Baru', avatar: 'star', mode: 'junior' })!;
    const res = useAppStore
      .getState()
      .importToActiveProfile(exported!.text, new Set(['a01-l01']));
    expect(res.ok).toBe(true);

    const restored = useAppStore.getState().profiles[p2];
    const original = useAppStore.getState().profiles[p1];
    expect(restored.xp).toBe(original.xp);
    expect(restored.lessons).toEqual(original.lessons);
    expect(restored.stickers).toEqual(original.stickers);
  });
});
