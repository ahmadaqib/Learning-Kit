/**
 * Resume inside a lesson (spec 8.5, "Resume inside the quiz").
 *
 * After every answer and every "Lanjut" the player saves a snapshot under `petualang-web-session-v1`, one
 * entry per profile and lesson. When a lesson opens, a snapshot for the same lesson and mode that is less than
 * 7 days old and whose question ids all still exist is restored. Any other snapshot is dropped.
 * The snapshot is cleared by completing the lesson and by "Ulangi". The store is not involved.
 */
import type { Lesson, Mode, Question, Step } from '@/content/schema';
import { shuffleQuestionChoices, type QuizSessionState } from '@/engine/queue';

export const SESSION_STORAGE_KEY = 'petualang-web-session-v1';
export const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export interface SessionSnapshot {
  lessonId: string;
  mode: Mode;
  /** Position on the lesson's timeline: cards and quick checks. The timeline length means "in the closing quiz". */
  stepIndex: number;
  /** What is left to answer, in order. A missed question is at the end with isRetry true. */
  queue: Array<{ id: string; isRetry: boolean }>;
  attemptedFirstTry: Record<string, boolean>;
  firstTryCorrectIds: string[];
  retryCorrectIds: string[];
  completedIds: string[];
  /** Visible time spent so far (Pro records). */
  elapsedMs: number;
  /** Epoch milliseconds. */
  savedAt: number;
  /** How many wrong answers were requeued so far. Keeps the progress bar from moving backwards after a resume. */
  misses?: number;
  predictionDone?: boolean;
}

export interface RestoredSession {
  predictionDone: boolean;
  session: QuizSessionState;
  stepIndex: number;
  elapsedMs: number;
  misses: number;
}

type SessionStore = Record<string, Record<string, SessionSnapshot>>;

let memory: SessionStore = {};

function readStore(): SessionStore {
  let raw: string | null;
  try {
    raw = localStorage.getItem(SESSION_STORAGE_KEY);
  } catch {
    return memory;
  }
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed as SessionStore;
  } catch {
    // corrupt JSON: start again from empty
  }
  return {};
}

function writeStore(store: SessionStore): void {
  memory = store;
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // storage full or blocked: the in-memory copy answers for this session
  }
}

export function snapshotFromSession(params: {
  lessonId: string;
  mode: Mode;
  stepIndex: number;
  session: QuizSessionState;
  elapsedMs: number;
  misses: number;
  now?: number;
  predictionDone?: boolean;
}): SessionSnapshot {
  const { session } = params;
  return {
    lessonId: params.lessonId,
    mode: params.mode,
    stepIndex: params.stepIndex,
    queue: session.queue.map((item) => ({ id: item.question.id, isRetry: item.isRetry })),
    attemptedFirstTry: { ...session.attemptedFirstTry },
    firstTryCorrectIds: [...session.firstTryCorrectIds],
    retryCorrectIds: [...session.retryCorrectIds],
    completedIds: [...session.completedIds],
    elapsedMs: Math.max(0, Math.round(params.elapsedMs)),
    savedAt: params.now ?? Date.now(),
    misses: params.misses,
    ...(params.predictionDone ? { predictionDone: true } : {}),
  };
}

export function saveSnapshot(profileId: string, snapshot: SessionSnapshot): void {
  const store = readStore();
  writeStore({
    ...store,
    [profileId]: { ...(store[profileId] ?? {}), [snapshot.lessonId]: snapshot },
  });
}

export function loadSnapshot(profileId: string, lessonId: string): SessionSnapshot | null {
  return readStore()[profileId]?.[lessonId] ?? null;
}

export function clearSnapshot(profileId: string, lessonId: string): void {
  const store = readStore();
  const entries = store[profileId];
  if (!entries || !(lessonId in entries)) return;
  const rest = { ...entries };
  delete rest[lessonId];
  writeStore({ ...store, [profileId]: rest });
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

/** Shape check only. Ages and ids are checked in restoreSession. */
function isSnapshot(value: unknown): value is SessionSnapshot {
  if (!value || typeof value !== 'object') return false;
  const s = value as Record<string, unknown>;
  return (
    typeof s.lessonId === 'string' &&
    (s.mode === 'junior' || s.mode === 'pro') &&
    typeof s.stepIndex === 'number' &&
    Number.isInteger(s.stepIndex) &&
    s.stepIndex >= 0 &&
    Array.isArray(s.queue) &&
    s.queue.every(
      (q) =>
        q &&
        typeof q === 'object' &&
        typeof (q as Record<string, unknown>).id === 'string' &&
        typeof (q as Record<string, unknown>).isRetry === 'boolean',
    ) &&
    s.attemptedFirstTry !== null &&
    typeof s.attemptedFirstTry === 'object' &&
    !Array.isArray(s.attemptedFirstTry) &&
    Object.values(s.attemptedFirstTry as Record<string, unknown>).every((v) => typeof v === 'boolean') &&
    isStringArray(s.firstTryCorrectIds) &&
    isStringArray(s.retryCorrectIds) &&
    isStringArray(s.completedIds) &&
    typeof s.elapsedMs === 'number' &&
    typeof s.savedAt === 'number'
  );
}

/**
 * Rebuild the quiz session from a saved snapshot, using the lesson's own questions. Returns null (and removes
 * the stored snapshot) when there is none, or when it is for another mode, older than 7 days, malformed, or
 * mentions a question id that no longer exists in `questions`.
 *
 * Questions that were requeued get their choices reshuffled, as advanceQuizSession does. The first pass keeps
 * the authored order.
 */
export function restoreSession(params: {
  profileId: string;
  lessonId: string;
  mode: Mode;
  questions: Question[];
  /** The highest stepIndex that exists on the lesson's timeline. A larger saved index is dropped. */
  maxStepIndex?: number;
  now?: number;
  rng?: () => number;
}): RestoredSession | null {
  const { profileId, lessonId, mode, questions } = params;
  const now = params.now ?? Date.now();
  const stored = loadSnapshot(profileId, lessonId);
  if (!stored) return null;

  const drop = (): null => {
    clearSnapshot(profileId, lessonId);
    return null;
  };

  if (!isSnapshot(stored)) return drop();
  if (stored.lessonId !== lessonId || stored.mode !== mode) return drop();
  const age = now - stored.savedAt;
  if (age >= SESSION_MAX_AGE_MS || age < -24 * 60 * 60 * 1000) return drop();
  if (params.maxStepIndex !== undefined && stored.stepIndex > params.maxStepIndex) return drop();

  const byId = new Map(questions.map((q) => [q.id, q]));
  const allIds = [
    ...stored.queue.map((q) => q.id),
    ...stored.firstTryCorrectIds,
    ...stored.retryCorrectIds,
    ...stored.completedIds,
    ...Object.keys(stored.attemptedFirstTry),
  ];
  if (!allIds.every((id) => byId.has(id))) return drop();

  const queue = stored.queue.map((item) => {
    const question = byId.get(item.id) as Question;
    return {
      question: item.isRetry ? shuffleQuestionChoices(question, params.rng) : question,
      isRetry: item.isRetry,
    };
  });

  const session: QuizSessionState = {
    queue,
    attemptedFirstTry: { ...stored.attemptedFirstTry },
    firstTryCorrectIds: [...stored.firstTryCorrectIds],
    retryCorrectIds: [...stored.retryCorrectIds],
    completedIds: [...stored.completedIds],
  };

  // Older snapshots have no miss count: a question answered wrong on its first try was missed at least once
  const fallbackMisses = Object.values(stored.attemptedFirstTry).filter((v) => v === false).length;
  return {
    session,
    stepIndex: stored.stepIndex,
    predictionDone: stored.predictionDone === true,
    elapsedMs: stored.elapsedMs,
    misses: typeof stored.misses === 'number' ? stored.misses : fallbackMisses,
  };
}

/** Tests only: forget the in-memory fallback. */
export function resetSessionMemory(): void {
  memory = {};
}

// ---------------------------------------------------------------------------------------------
// The lesson's timeline (spec 8.5, "Step order: read, then do")
// ---------------------------------------------------------------------------------------------

export type CardStep = Extract<Step, { kind: 'story' | 'concept' | 'limit' | 'sim' }>;

export type TimelineItem =
  | { kind: 'warmup'; q: Question }
  | { kind: 'card'; step: CardStep }
  /** A question placed between cards: a quick check. It answers the head of the quiz queue. */
  | { kind: 'check' };

export interface LessonPlan {
  /** Warm-up, cards and quick checks in authored order. The closing quiz comes after the last item. */
  timeline: TimelineItem[];
  /** Every question visible in the mode, in authored order: the one quiz session of the lesson. */
  questions: Question[];
  /** The questions after the last card. "Soal 2 dari 4" counts only these. */
  closingIds: string[];
}

/**
 * The player follows the authored order of `lesson.steps`. A question that sits before the last card is a
 * quick check ("Cek cepat"). The questions after the last card form the closing quiz. A lesson that still has
 * every question at the end has no quick check and plays exactly as before.
 */
export function buildLessonPlan(lesson: Lesson, mode: Mode, warmup: Question | null = null): LessonPlan {
  const visible = lesson.steps.filter((s) => {
    if (s.kind === 'question') return !s.q.modes || s.q.modes.includes(mode);
    if (s.kind === 'concept') return !s.modes || s.modes.includes(mode);
    if (s.kind === 'limit') return mode !== 'junior' || Boolean(s.riskyAnalogy);
    return true;
  });

  let lastCard = -1;
  visible.forEach((s, i) => {
    if (s.kind !== 'question') lastCard = i;
  });

  const timeline: TimelineItem[] = [];
  if (warmup) timeline.push({ kind: 'warmup', q: warmup });
  const questions: Question[] = [];
  const closingIds: string[] = [];
  visible.forEach((s, i) => {
    if (s.kind === 'question') {
      questions.push(s.q);
      if (i < lastCard) timeline.push({ kind: 'check' });
      else closingIds.push(s.q.id);
    } else {
      timeline.push({ kind: 'card', step: s });
    }
  });
  return { timeline, questions, closingIds };
}

/**
 * Before this change `stepIndex` counted the warm-up and the cards only (questions were played after them).
 * Turn such an index into a position on the new timeline: right after that many warm-up and cards.
 */
export function legacyStepToTimelineIndex(legacyIndex: number, timeline: TimelineItem[]): number {
  if (legacyIndex <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < timeline.length; i += 1) {
    if (timeline[i].kind !== 'check') seen += 1;
    if (seen >= legacyIndex) return i + 1;
  }
  return timeline.length;
}
