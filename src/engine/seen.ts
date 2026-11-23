/**
 * "Has this learner already seen this reveal?" flags, per profile, in their own localStorage key
 * (not in the profile store). Key names used by the packages:
 *   unlock:world:{worldId}   unlock:lesson:{lessonId}   path:{worldId}:{completedCount}
 *   flip:{stickerId}         gold:{stickerId}           day:{date}        week:{isoWeek}
 *   bonus:{lessonId}         offer:autoread             offer:pro
 */

export const SEEN_STORAGE_KEY = 'petualang-web-seen-v1';

interface SeenEntry {
  primed: boolean;
  keys: string[];
}

type SeenState = Record<string, SeenEntry>;

let memory: SeenState = {};

function readState(): SeenState {
  let raw: string | null;
  try {
    raw = localStorage.getItem(SEEN_STORAGE_KEY);
  } catch {
    // storage blocked: the in-memory copy answers for this session
    return memory;
  }
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as SeenState;
    }
  } catch {
    // corrupt JSON: start again from empty
  }
  return {};
}

function writeState(state: SeenState): void {
  memory = state;
  try {
    localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or blocked: the in-memory copy still answers for this session
  }
}

function entryOf(state: SeenState, profileId: string): SeenEntry {
  const entry = state[profileId];
  if (entry && Array.isArray(entry.keys)) return entry;
  return { primed: false, keys: [] };
}

export function hasSeen(profileId: string, key: string): boolean {
  return entryOf(readState(), profileId).keys.includes(key);
}

export function markSeen(profileId: string, key: string): void {
  const state = readState();
  const entry = entryOf(state, profileId);
  if (entry.keys.includes(key)) return;
  writeState({ ...state, [profileId]: { ...entry, keys: [...entry.keys, key] } });
}

/**
 * Mark everything that is already unlocked as seen, so no reveal replays for an existing learner.
 * Only has an effect the first time it is called for a profile. Later calls do nothing, even with other keys.
 */
export function primeSeen(profileId: string, keys: string[]): void {
  const state = readState();
  const entry = entryOf(state, profileId);
  if (entry.primed) return;
  const merged = Array.from(new Set([...entry.keys, ...keys]));
  writeState({ ...state, [profileId]: { primed: true, keys: merged } });
}

/** Whether primeSeen has already run for this profile. */
export function isPrimed(profileId: string): boolean {
  return entryOf(readState(), profileId).primed;
}
