/**
 * "Teks nyaman dibaca": a per-profile reading setting kept in its own localStorage key, not in the
 * profile store. It sets or removes data-reading="comfort" on <html> (see the comfort block in global.css).
 * Independent of "Kurangi animasi".
 */

export const READING_STORAGE_KEY = 'petualang-web-reading-v1';

let memory: Record<string, boolean> = {};

function readAll(): Record<string, boolean> {
  let raw: string | null;
  try {
    raw = localStorage.getItem(READING_STORAGE_KEY);
  } catch {
    // storage blocked: the in-memory copy answers for this session
    return memory;
  }
  if (!raw) return {};
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, boolean>;
    }
  } catch {
    // corrupt JSON: start again from empty
  }
  return {};
}

export function getReadingComfort(profileId: string): boolean {
  return readAll()[profileId] === true;
}

/** Store the setting and apply it to the page at once. */
export function setReadingComfort(profileId: string, on: boolean): void {
  const next = { ...readAll(), [profileId]: on };
  memory = next;
  try {
    localStorage.setItem(READING_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage full or blocked: the in-memory copy still applies for this session
  }
  applyReadingComfort(profileId);
}

/** Set or remove data-reading="comfort" on <html> for this profile. Returns the value applied. */
export function applyReadingComfort(profileId: string): boolean {
  const on = getReadingComfort(profileId);
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    if (on) root.dataset.reading = 'comfort';
    else delete root.dataset.reading;
  }
  return on;
}
