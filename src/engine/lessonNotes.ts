import type { Mode } from '@/content/schema';

interface LessonNotes {
  focus?: boolean;
  reflections?: Record<string, string>;
}

const key = (profileId: string) => `petualang-web-notes-v1:${profileId}`;
const temporary = new Map<string, LessonNotes>();

function read(profileId: string): LessonNotes {
  const fallback = temporary.get(profileId);
  if (fallback) return fallback;
  try {
    const value = JSON.parse(localStorage.getItem(key(profileId)) ?? '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function save(profileId: string, notes: LessonNotes): boolean {
  try {
    localStorage.setItem(key(profileId), JSON.stringify(notes));
    temporary.delete(profileId);
    return true;
  } catch {
    temporary.set(profileId, notes);
    return false;
  }
}

export function clearLessonNotes(profileId: string): void {
  try {
    localStorage.removeItem(key(profileId));
    temporary.delete(profileId);
  } catch {
    temporary.set(profileId, {});
  }
}

export const getLessonFocus = (profileId: string) => read(profileId).focus === true;
export const setLessonFocus = (profileId: string, focus: boolean) => save(profileId, { ...read(profileId), focus });

export function getReflection(profileId: string, mode: Mode, lessonId: string): string {
  const value = read(profileId).reflections?.[`${mode}:${lessonId}`];
  return typeof value === 'string' ? value : '';
}

export function saveReflection(profileId: string, mode: Mode, lessonId: string, text: string): boolean {
  const notes = read(profileId);
  const reflections = { ...notes.reflections };
  const id = `${mode}:${lessonId}`;
  if (text.trim()) reflections[id] = text.trim().slice(0, 240);
  else delete reflections[id];
  return save(profileId, { ...notes, reflections });
}
