import { clearLessonNotes } from '@/engine/lessonNotes';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  DEFAULT_AUDIO_SETTINGS,
  ProfileSchema,
  type MascotCustom,
  type Mode,
  type PersistedState,
  type Profile,
  type Settings,
} from '@/content/schema';
import { addDaysLocal, formatLocalDate, getIsoWeekKey } from '@/engine/date';
import { scheduleNextCard, type LeitnerBox } from '@/engine/leitner';
import { XP_RULES, calculateLessonXp, calculateStars } from '@/engine/scoring';

const STORAGE_KEY = 'petualang-web';
export const MAX_PROFILES = 4;

export function createDefaultSettings(mode: Mode): Settings {
  return {
    ...DEFAULT_AUDIO_SETTINGS,
    soundEnabled: mode === 'junior',
    autoReadAloud: false,
    textScale: 100,
    reducedMotion: 'system',
    theme: 'light',
    weeklyTarget: 3,
    breakReminderMinutes: mode === 'junior' ? 20 : 0,
  };
}

export function createNewProfile(params: {
  id?: string;
  nickname: string;
  avatar: string;
  mode: Mode;
  weeklyTarget?: 2 | 3 | 5;
}): Profile {
  const id = params.id ?? `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
  const settings = createDefaultSettings(params.mode);
  if (params.weeklyTarget) {
    settings.weeklyTarget = params.weeklyTarget;
  }
  return {
    id,
    nickname: params.nickname.trim().slice(0, 12),
    avatar: params.avatar,
    mode: params.mode,
    createdAt: formatLocalDate(),
    settings,
    xp: 0,
    lessons: {},
    bosses: {},
    assessments: {},
    leitner: {},
    stickers: [],
    badges: [],
    weeks: {},
    mistakes: {},
    limitMistakes: {},
    seenQuestionGuides: [],
    mascot: { color: '#E4572E', accessory: 'none' },
  };
}

let storageErrorFlag = false;
export function hasStorageError(): boolean {
  return storageErrorFlag;
}

const safeLocalStorage = {
  getItem: (name: string): string | null => {
    try {
      return window.localStorage.getItem(name);
    } catch {
      storageErrorFlag = true;
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      window.localStorage.setItem(name, value);
      storageErrorFlag = false;
    } catch {
      storageErrorFlag = true;
    }
  },
  removeItem: (name: string): void => {
    try {
      window.localStorage.removeItem(name);
    } catch {
      storageErrorFlag = true;
    }
  },
};

export interface AppActions {
  createProfile: (params: {
    nickname: string;
    avatar: string;
    mode: Mode;
    weeklyTarget?: 2 | 3 | 5;
  }) => string | null;
  selectProfile: (profileId: string) => void;
  deleteProfile: (profileId: string) => void;
  resetActiveProfileData: () => void;
  updateProfileMode: (mode: Mode) => void;
  updateSettings: (partial: Partial<Settings>) => void;
  updateMascot: (partial: Partial<MascotCustom>) => void;
  markQuestionGuideSeen: (questionType: string) => void;
  saveLessonStep: (lessonId: string, stepIndex: number) => void;
  recordQuestionMistake: (tags: string[], isLimitQuestion: boolean, limitId?: string) => void;
  completeLesson: (params: {
    lessonId: string;
    firstTryCorrect: number;
    retryCorrect: number;
    totalQuestions: number;
    stickerId?: string;
    reviewCardIds: string[];
    isSideQuest?: boolean;
    allWorldLessonsCompletedInA8With3Stars?: boolean;
    spotbugCorrectTotalIncrement?: number;
  }) => { xpEarned: number; stars: 0 | 1 | 2 | 3; newBadges: string[] };
  completeBoss: (params: {
    worldId: string;
    scoreRatio: number;
    passed: boolean;
    isPlacement?: boolean;
    worldLessonIds?: string[];
    anchorMaxCount?: number;
    stickerId?: string;
    allTrackAPassed?: boolean;
    isFinalB10Passed?: boolean;
  }) => { xpEarned: number; newBadges: string[] };
  completeAssessment: (params: {
    worldId: string;
    kind: 'pre' | 'post' | 'retain';
    score: number;
    max: number;
    answers: Record<string, string>;
    wrongAnchorReviewCardIds?: string[];
  }) => { xpEarned: number };
  answerLeitnerCard: (cardId: string, correct: boolean, todayStr?: string) => {
    prevBox: LeitnerBox;
    nextBox: LeitnerBox;
  };
  completeLeitnerSession: (reviewedCount: number, todayStr?: string) => number;
  markStudyDay: (todayStr?: string) => void;
  evaluateAndGrantBadges: (extra?: { spotbugTotal?: number; a8All3Stars?: boolean; allTrackA?: boolean; finalB10?: boolean }) => string[];
  exportActiveProfile: () => { text: string; json: string } | null;
  importToActiveProfile: (rawInput: string, validLessonIds?: Set<string>) => { ok: boolean; message: string };
}

export type AppStore = PersistedState & AppActions;

function recordDayOnProfile(profile: Profile, dateStr: string): Record<string, string[]> {
  const weekKey = getIsoWeekKey(dateStr);
  const existing = profile.weeks[weekKey] ?? [];
  if (existing.includes(dateStr)) return profile.weeks;
  return {
    ...profile.weeks,
    [weekKey]: [...existing, dateStr].sort(),
  };
}

function encodeBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (const b of bytes) {
    bin += String.fromCharCode(b);
  }
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(b64: string): string {
  const normalized = b64.trim().replace(/-/g, '+').replace(/_/g, '/');
  const pad = normalized.length % 4 === 0 ? '' : '='.repeat(4 - (normalized.length % 4));
  const bin = atob(normalized + pad);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    bytes[i] = bin.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function migratePersistedState(persisted: unknown): PersistedState {
  if (!persisted || typeof persisted !== 'object') {
    return { schemaVersion: 1, activeProfileId: '', profiles: {} };
  }
  const obj = persisted as Record<string, unknown>;
  const profilesRaw = (obj.profiles && typeof obj.profiles === 'object' ? obj.profiles : {}) as Record<string, unknown>;
  const cleanProfiles: Record<string, Profile> = {};
  for (const [id, p] of Object.entries(profilesRaw)) {
    const parsed = ProfileSchema.safeParse(p);
    if (parsed.success) {
      cleanProfiles[id] = parsed.data;
    }
  }
  const activeId = typeof obj.activeProfileId === 'string' && cleanProfiles[obj.activeProfileId]
    ? obj.activeProfileId
    : Object.keys(cleanProfiles)[0] ?? '';
  return {
    schemaVersion: 1,
    activeProfileId: activeId,
    profiles: cleanProfiles,
  };
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      schemaVersion: 1,
      activeProfileId: '',
      profiles: {},

      createProfile: (params) => {
        const state = get();
        if (Object.keys(state.profiles).length >= MAX_PROFILES) {
          return null;
        }
        const profile = createNewProfile(params);
        set({
          activeProfileId: profile.id,
          profiles: {
            ...state.profiles,
            [profile.id]: profile,
          },
        });
        return profile.id;
      },

      selectProfile: (profileId) => {
        const state = get();
        if (!state.profiles[profileId]) return;
        set({ activeProfileId: profileId });
      },

      deleteProfile: (profileId) => {
        const state = get();
        if (!state.profiles[profileId]) return;
        const nextProfiles = { ...state.profiles };
        delete nextProfiles[profileId];
        clearLessonNotes(profileId);
        const remainingIds = Object.keys(nextProfiles);
        set({
          profiles: nextProfiles,
          activeProfileId:
            state.activeProfileId === profileId ? (remainingIds[0] ?? '') : state.activeProfileId,
        });
      },

      resetActiveProfileData: () => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return;
        clearLessonNotes(cur.id);
        const fresh = createNewProfile({
          id: cur.id,
          nickname: cur.nickname,
          avatar: cur.avatar,
          mode: cur.mode,
          weeklyTarget: cur.settings.weeklyTarget,
        });
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: fresh,
          },
        });
      },

      updateProfileMode: (mode) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return;
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              mode,
            },
          },
        });
      },

      updateSettings: (partial) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return;
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              settings: { ...cur.settings, ...partial },
            },
          },
        });
      },

      updateMascot: (partial) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return;
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              mascot: { ...cur.mascot, ...partial },
            },
          },
        });
      },

      markQuestionGuideSeen: (questionType) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur || cur.seenQuestionGuides.includes(questionType)) return;
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              seenQuestionGuides: [...cur.seenQuestionGuides, questionType],
            },
          },
        });
      },

      saveLessonStep: (lessonId, stepIndex) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return;
        const prev = cur.lessons[lessonId] ?? { stars: 0 as const, attempts: 0 };
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              lessons: {
                ...cur.lessons,
                [lessonId]: {
                  ...prev,
                  stepIndex,
                },
              },
            },
          },
        });
      },

      recordQuestionMistake: (tags, isLimitQuestion, limitId) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return;
        const nextMistakes = { ...cur.mistakes };
        for (const tag of tags) {
          nextMistakes[tag] = (nextMistakes[tag] ?? 0) + 1;
        }
        const nextLimitMistakes = { ...cur.limitMistakes };
        if (isLimitQuestion && limitId) {
          nextLimitMistakes[limitId] = (nextLimitMistakes[limitId] ?? 0) + 1;
        }
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              mistakes: nextMistakes,
              limitMistakes: nextLimitMistakes,
            },
          },
        });
      },

      completeLesson: (params) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return { xpEarned: 0, stars: 0 as const, newBadges: [] };

        const todayStr = formatLocalDate();
        const stars = calculateStars(params.firstTryCorrect, params.totalQuestions);
        const xpEarned = calculateLessonXp({
          firstTryCorrect: params.firstTryCorrect,
          retryCorrect: params.retryCorrect,
          stars,
          isSideQuest: params.isSideQuest,
        });

        const prevLesson = cur.lessons[params.lessonId];
        const bestStars = Math.max(prevLesson?.stars ?? 0, stars) as 0 | 1 | 2 | 3;

        const nextStickers =
          params.stickerId && !cur.stickers.includes(params.stickerId)
            ? [...cur.stickers, params.stickerId]
            : cur.stickers;

        // Masukkan kartu Kotak Ulang baru ke kotak 1 untuk besok (§7.7)
        const nextLeitner = { ...cur.leitner };
        const tomorrow = addDaysLocal(todayStr, 1);
        for (const cardId of params.reviewCardIds) {
          if (!nextLeitner[cardId]) {
            nextLeitner[cardId] = { box: 1, due: tomorrow };
          }
        }

        const updatedProfile: Profile = {
          ...cur,
          xp: cur.xp + xpEarned,
          lessons: {
            ...cur.lessons,
            [params.lessonId]: {
              stars: bestStars,
              completedAt: prevLesson?.completedAt ?? todayStr,
              stepIndex: undefined,
              attempts: (prevLesson?.attempts ?? 0) + 1,
            },
          },
          stickers: nextStickers,
          leitner: nextLeitner,
          weeks: recordDayOnProfile(cur, todayStr),
        };

        set({
          profiles: {
            ...state.profiles,
            [cur.id]: updatedProfile,
          },
        });

        const newBadges = get().evaluateAndGrantBadges({
          a8All3Stars: params.allWorldLessonsCompletedInA8With3Stars,
        });

        return { xpEarned, stars, newBadges };
      },

      completeBoss: (params) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return { xpEarned: 0, newBadges: [] };

        const todayStr = formatLocalDate();
        const prevBoss = cur.bosses[params.worldId];
        const xpEarned = params.passed ? XP_RULES.BOSS_PASS : 0;

        let nextLessons = { ...cur.lessons };
        let nextAssessments = { ...cur.assessments };

        // Tes penempatan Pro (§4.2 & §7.10)
        if (params.passed && params.isPlacement && params.worldLessonIds) {
          for (const lid of params.worldLessonIds) {
            if (!nextLessons[lid]?.completedAt) {
              nextLessons[lid] = {
                stars: 1,
                completedAt: todayStr,
                attempts: 1,
              };
            }
          }
          const maxScore = params.anchorMaxCount ?? 6;
          const equalScore = Math.round(params.scoreRatio * maxScore);
          const placementRecord = {
            score: equalScore,
            max: maxScore,
            at: todayStr,
            answers: { placement: '1' },
          };
          nextAssessments[params.worldId] = {
            ...nextAssessments[params.worldId],
            pre: placementRecord,
            post: placementRecord,
          };
        }

        const nextStickers =
          params.passed && params.stickerId && !cur.stickers.includes(params.stickerId)
            ? [...cur.stickers, params.stickerId]
            : cur.stickers;

        const updatedProfile: Profile = {
          ...cur,
          xp: cur.xp + xpEarned,
          lessons: nextLessons,
          assessments: nextAssessments,
          stickers: nextStickers,
          bosses: {
            ...cur.bosses,
            [params.worldId]: {
              passed: Boolean(prevBoss?.passed || params.passed),
              best: Math.max(prevBoss?.best ?? 0, params.scoreRatio),
              attempts: (prevBoss?.attempts ?? 0) + 1,
            },
          },
          weeks: params.passed ? recordDayOnProfile(cur, todayStr) : cur.weeks,
        };

        set({
          profiles: {
            ...state.profiles,
            [cur.id]: updatedProfile,
          },
        });

        const newBadges = get().evaluateAndGrantBadges({
          allTrackA: params.allTrackAPassed,
          finalB10: params.isFinalB10Passed,
        });

        return { xpEarned, newBadges };
      },

      completeAssessment: (params) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return { xpEarned: 0 };

        const todayStr = formatLocalDate();
        const prevWorldAssess = cur.assessments[params.worldId] ?? {};
        const record = {
          score: params.score,
          max: params.max,
          at: todayStr,
          answers: params.answers,
        };

        let xpEarned = 0;
        const nextWorldAssess = { ...prevWorldAssess };
        const nextLeitner = { ...cur.leitner };

        if (params.kind === 'pre') {
          if (!prevWorldAssess.pre) xpEarned = XP_RULES.PRE_TEST;
          nextWorldAssess.pre = record;
        } else if (params.kind === 'post') {
          if (!prevWorldAssess.post) xpEarned = XP_RULES.POST_TEST;
          nextWorldAssess.post = record;
          nextWorldAssess.retainDue = addDaysLocal(todayStr, 7);
        } else {
          if (!prevWorldAssess.retain) xpEarned = XP_RULES.RETAIN_TEST;
          nextWorldAssess.retain = record;
          // Soal jangkar yang salah di Tes Ingat otomatis masuk Kotak Ulang kotak 1 (§7.10, F17)
          for (const cardId of params.wrongAnchorReviewCardIds ?? []) {
            nextLeitner[cardId] = {
              box: 1,
              due: addDaysLocal(todayStr, 1),
              lastResult: false,
            };
          }
        }

        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              xp: cur.xp + xpEarned,
              assessments: {
                ...cur.assessments,
                [params.worldId]: nextWorldAssess,
              },
              leitner: nextLeitner,
            },
          },
        });

        return { xpEarned };
      },

      answerLeitnerCard: (cardId, correct, todayStr = formatLocalDate()) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return { prevBox: 1 as const, nextBox: 1 as const };

        const existing = cur.leitner[cardId];
        const prevBox: LeitnerBox = existing?.box ?? 1;
        const updated = scheduleNextCard(existing, correct, todayStr);

        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              leitner: {
                ...cur.leitner,
                [cardId]: updated,
              },
            },
          },
        });

        return { prevBox, nextBox: updated.box };
      },

      completeLeitnerSession: (reviewedCount, todayStr = formatLocalDate()) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return 0;

        const xpEarned = reviewedCount >= 5 ? XP_RULES.LEITNER_SESSION : reviewedCount * 3;
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              xp: cur.xp + xpEarned,
              weeks: recordDayOnProfile(cur, todayStr),
            },
          },
        });
        get().evaluateAndGrantBadges();
        return xpEarned;
      },

      markStudyDay: (todayStr = formatLocalDate()) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return;
        set({
          profiles: {
            ...state.profiles,
            [cur.id]: {
              ...cur,
              weeks: recordDayOnProfile(cur, todayStr),
            },
          },
        });
      },

      evaluateAndGrantBadges: (extra) => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return [];
        const earned = new Set(cur.badges);
        const newlyAdded: string[] = [];

        const grant = (badgeId: string) => {
          if (!earned.has(badgeId)) {
            earned.add(badgeId);
            newlyAdded.push(badgeId);
          }
        };

        const completedLessonsCount = Object.values(cur.lessons).filter((l) => l.completedAt).length;
        const passedBossCount = Object.values(cur.bosses).filter((b) => b.passed).length;
        const box5Count = Object.values(cur.leitner).filter((c) => c.box === 5).length;

        if (completedLessonsCount >= 1) grant('langkah-pertama');
        if (passedBossCount >= 1) grant('penjaga-pertama');
        if (box5Count >= 30) grant('ingatan-gajah');
        if (cur.stickers.length >= 15) grant('kolektor-analogi');
        if (cur.bosses['a05']?.passed) grant('arsitek-responsif');
        if (cur.bosses['a12']?.passed) grant('penjaga-benteng');
        if (extra?.a8All3Stars) grant('penguasa-warna');
        if (extra?.allTrackA) grant('jalur-a-tuntas');
        if (extra?.finalB10 || cur.bosses['b10']?.passed) grant('penghubung');
        if (completedLessonsCount >= 50) grant('petualang-tekun');
        if (passedBossCount >= 10) grant('penakluk-dunia');
        if (cur.xp >= 2800) grant('arsitek-sejati');

        if (newlyAdded.length > 0) {
          set({
            profiles: {
              ...state.profiles,
              [cur.id]: {
                ...cur,
                badges: [...earned],
              },
            },
          });
        }

        return newlyAdded;
      },

      exportActiveProfile: () => {
        const state = get();
        const cur = state.profiles[state.activeProfileId];
        if (!cur) return null;
        const payload = {
          schemaVersion: 1,
          exportedAt: formatLocalDate(),
          profile: cur,
        };
        const json = JSON.stringify(payload, null, 2);
        const text = `PW1.${encodeBase64Url(JSON.stringify(payload))}`;
        return { text, json };
      },

      importToActiveProfile: (rawInput, validLessonIds) => {
        const state = get();
        const trimmed = rawInput.trim();
        let jsonStr = trimmed;
        try {
          if (trimmed.startsWith('PW1.')) {
            jsonStr = decodeBase64Url(trimmed.slice(4));
          }
          const rawObj = JSON.parse(jsonStr) as { profile?: unknown; schemaVersion?: number };
          const candidate = rawObj.profile ?? rawObj;
          const parsed = ProfileSchema.safeParse(candidate);
          if (!parsed.success) {
            return {
              ok: false,
              message: 'Kode progres tidak bisa dibaca. Pastikan menyalin seluruh kodenya.',
            };
          }

          const imported = { ...parsed.data };
          if (validLessonIds) {
            const filteredLessons: Profile['lessons'] = {};
            for (const [lid, val] of Object.entries(imported.lessons)) {
              if (validLessonIds.has(lid)) {
                filteredLessons[lid] = val;
              }
            }
            imported.lessons = filteredLessons;
          }

          const targetId = state.activeProfileId || imported.id;
          const finalProfile: Profile = {
            ...imported,
            id: targetId,
          };

          set({
            activeProfileId: targetId,
            profiles: {
              ...state.profiles,
              [targetId]: finalProfile,
            },
          });

          return { ok: true, message: 'Progres berhasil dimuat!' };
        } catch {
          return {
            ok: false,
            message: 'Kode progres tidak bisa dibaca. Pastikan menyalin seluruh kodenya.',
          };
        }
      },
    }),
    {
      name: STORAGE_KEY,
      version: 2,
      storage: createJSONStorage(() => safeLocalStorage),
      migrate: (persisted) => migratePersistedState(persisted) as unknown as AppStore,
      partialize: (state) => ({
        schemaVersion: state.schemaVersion,
        activeProfileId: state.activeProfileId,
        profiles: state.profiles,
      }),
    },
  ),
);
