/**
 * Personal records (spec 8.5, 8.11). Pro only: a learner is compared with nobody but their own best.
 * localStorage key `petualang-web-records-v1`, one entry per profile, then one per record key
 * (`lesson:{lessonId}` or `kilat:{sessionSize}`).
 *
 * A record keeps the best first-try score and the best (shortest) time separately, because either one can
 * be beaten on its own. Time counts only while the document is visible (see createVisibleTimer).
 */

export const RECORDS_STORAGE_KEY = 'petualang-web-records-v1';

export interface PersonalRecord {
  /** Best number of first-try correct answers. */
  bestFirstTry: number;
  /** The number of questions that best score was out of. */
  total: number;
  /** Shortest time in milliseconds, or null when no timed attempt has been stored. */
  bestMs: number | null;
  /** ISO date of the last update. */
  updatedAt: string;
}

export interface RecordAttempt {
  firstTry: number;
  total: number;
  /** Visible time in milliseconds. 0 or less means "not timed". */
  ms: number;
}

export interface RecordResult {
  /** The stored record before this attempt, or null on a first attempt. */
  previous: PersonalRecord | null;
  /** The stored record after this attempt. */
  best: PersonalRecord;
  newScoreRecord: boolean;
  newTimeRecord: boolean;
  /** True only when an earlier record existed and this attempt beat it. A first attempt is not a record. */
  isNew: boolean;
}

type RecordsState = Record<string, Record<string, PersonalRecord>>;

let memory: RecordsState = {};

export function lessonRecordKey(lessonId: string): string {
  return `lesson:${lessonId}`;
}

export function kilatRecordKey(sessionSize: number): string {
  return `kilat:${sessionSize}`;
}

function isRecord(value: unknown): value is PersonalRecord {
  if (!value || typeof value !== 'object') return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.bestFirstTry === 'number' &&
    typeof r.total === 'number' &&
    (r.bestMs === null || typeof r.bestMs === 'number') &&
    typeof r.updatedAt === 'string'
  );
}

function readState(): RecordsState {
  let raw: string | null;
  try {
    raw = localStorage.getItem(RECORDS_STORAGE_KEY);
  } catch {
    return memory;
  }
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const clean: RecordsState = {};
    for (const [profileId, entries] of Object.entries(parsed as Record<string, unknown>)) {
      if (!entries || typeof entries !== 'object' || Array.isArray(entries)) continue;
      const kept: Record<string, PersonalRecord> = {};
      for (const [key, rec] of Object.entries(entries as Record<string, unknown>)) {
        if (isRecord(rec)) kept[key] = rec;
      }
      clean[profileId] = kept;
    }
    return clean;
  } catch {
    return {};
  }
}

function writeState(state: RecordsState): void {
  memory = state;
  try {
    localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or blocked: the in-memory copy answers for this session
  }
}

export function getRecord(profileId: string, key: string): PersonalRecord | null {
  return readState()[profileId]?.[key] ?? null;
}

function ratio(firstTry: number, total: number): number {
  return total > 0 ? firstTry / total : 0;
}

/**
 * Store an attempt and say whether it beat the earlier best. The score is compared as a ratio, so a lesson
 * that gained a question does not read as a loss. A time of 0 or less is "not timed" and never counts.
 */
export function recordAttempt(
  profileId: string,
  key: string,
  attempt: RecordAttempt,
  now: Date = new Date(),
): RecordResult {
  const state = readState();
  const previous = state[profileId]?.[key] ?? null;
  const timed = attempt.ms > 0;

  const scoreBeats =
    previous !== null && ratio(attempt.firstTry, attempt.total) > ratio(previous.bestFirstTry, previous.total);
  const timeBeats = previous !== null && timed && previous.bestMs !== null && attempt.ms < previous.bestMs;

  let best: PersonalRecord;
  if (!previous) {
    best = {
      bestFirstTry: attempt.firstTry,
      total: attempt.total,
      bestMs: timed ? Math.round(attempt.ms) : null,
      updatedAt: now.toISOString(),
    };
  } else {
    best = {
      bestFirstTry: scoreBeats ? attempt.firstTry : previous.bestFirstTry,
      total: scoreBeats ? attempt.total : previous.total,
      bestMs: timed && (previous.bestMs === null || attempt.ms < previous.bestMs) ? Math.round(attempt.ms) : previous.bestMs,
      updatedAt: scoreBeats || timeBeats ? now.toISOString() : previous.updatedAt,
    };
  }

  writeState({ ...state, [profileId]: { ...(state[profileId] ?? {}), [key]: best } });

  return {
    previous,
    best,
    newScoreRecord: scoreBeats,
    newTimeRecord: timeBeats,
    isNew: scoreBeats || timeBeats,
  };
}

/** "45 dtk", "4 mnt 10 dtk", "4 mnt", "75 mnt". */
export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  if (totalSeconds < 60) return `${totalSeconds} dtk`;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes >= 60 || seconds === 0) return `${minutes} mnt`;
  return `${minutes} mnt ${seconds} dtk`;
}

/** "4 dari 5 benar di percobaan pertama" */
export function formatScore(firstTry: number, total: number): string {
  return `${firstTry} dari ${total} benar di percobaan pertama`;
}

export interface VisibleTimer {
  /** Milliseconds counted so far, only while the document was visible. */
  elapsedMs(): number;
  /** Replace the counted time (restoring a saved session). */
  reset(ms?: number): void;
  /** Stop listening to visibility changes. The counted time stays readable. */
  dispose(): void;
}

/**
 * A stopwatch that counts up and pauses while the tab is hidden. It never counts down and never ends a
 * session. `initialMs` lets a resumed lesson carry its earlier time.
 */
export function createVisibleTimer(initialMs = 0, nowFn: () => number = () => Date.now()): VisibleTimer {
  const hasDocument = typeof document !== 'undefined';
  let acc = Math.max(0, initialMs);
  let startedAt: number | null = !hasDocument || !document.hidden ? nowFn() : null;

  const pause = () => {
    if (startedAt !== null) {
      acc += Math.max(0, nowFn() - startedAt);
      startedAt = null;
    }
  };
  const resume = () => {
    if (startedAt === null) startedAt = nowFn();
  };
  const onVisibility = () => {
    if (document.hidden) pause();
    else resume();
  };
  if (hasDocument) document.addEventListener('visibilitychange', onVisibility);

  return {
    elapsedMs() {
      return acc + (startedAt !== null ? Math.max(0, nowFn() - startedAt) : 0);
    },
    reset(ms = 0) {
      acc = Math.max(0, ms);
      startedAt = !hasDocument || !document.hidden ? nowFn() : null;
    },
    dispose() {
      pause();
      if (hasDocument) document.removeEventListener('visibilitychange', onVisibility);
    },
  };
}

/** Tests only: forget the in-memory fallback. */
export function resetRecordsMemory(): void {
  memory = {};
}
