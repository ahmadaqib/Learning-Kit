import type { Lesson, Mode, Profile, World } from '@/content/schema';
import { diffDaysLocal, formatLocalDate } from './date';

export function getVisibleLessonsForWorld(
  world: World,
  lessonsMap: Record<string, Lesson>,
  mode: Mode,
): Lesson[] {
  return world.lessons
    .map((id) => lessonsMap[id])
    .filter((lesson): lesson is Lesson => Boolean(lesson && lesson.modes.includes(mode)));
}

export function getVisibleSideQuestsForWorld(
  world: World,
  lessonsMap: Record<string, Lesson>,
  mode: Mode,
): Lesson[] {
  return world.sideQuests
    .map((id) => lessonsMap[id])
    .filter((lesson): lesson is Lesson => Boolean(lesson && lesson.modes.includes(mode)));
}

export function isWorldUnlocked(world: World, profile: Profile, worlds: World[]): boolean {
  if (world.order === 1 && world.track === 'A') return true;

  // Untuk Jalur B, prasyarat bergantung mode (§4.2 aturan 3):
  // Junior cukup A1, Pro membutuhkan A1 dan A4.
  if (world.id === 'b01') {
    const a1Passed = Boolean(profile.bosses['a01']?.passed);
    if (profile.mode === 'junior') return a1Passed;
    return a1Passed && Boolean(profile.bosses['a04']?.passed);
  }

  for (const reqId of world.requires) {
    if (!profile.bosses[reqId]?.passed) {
      return false;
    }
  }

  // Pastikan dunia sebelumnya dalam jalur yang sama lulus
  const sameTrack = worlds
    .filter((w) => w.track === world.track && w.order < world.order)
    .sort((a, b) => b.order - a.order);

  if (sameTrack.length > 0) {
    const prevWorld = sameTrack[0];
    if (!profile.bosses[prevWorld.id]?.passed) {
      return false;
    }
  }

  return true;
}

export function isLessonUnlocked(
  lessonId: string,
  world: World,
  lessonsMap: Record<string, Lesson>,
  profile: Profile,
  worlds: World[],
): boolean {
  if (!isWorldUnlocked(world, profile, worlds)) return false;

  const lesson = lessonsMap[lessonId];
  if (!lesson || !lesson.modes.includes(profile.mode)) return false;

  if (lesson.isSideQuest) {
    // Side quest terbuka setelah pelajaran pertama dunia atau pelajaran induknya selesai
    const visible = getVisibleLessonsForWorld(world, lessonsMap, profile.mode);
    const parentId = lesson.warmupFrom ?? visible[visible.length - 1]?.id;
    return parentId ? Boolean(profile.lessons[parentId]?.completedAt) : true;
  }

  const visible = getVisibleLessonsForWorld(world, lessonsMap, profile.mode);
  const idx = visible.findIndex((l) => l.id === lessonId);
  if (idx <= 0) return idx === 0;

  const prevLesson = visible[idx - 1];
  return Boolean(profile.lessons[prevLesson.id]?.completedAt);
}

export function isBossUnlocked(
  world: World,
  lessonsMap: Record<string, Lesson>,
  profile: Profile,
  worlds: World[],
): boolean {
  if (!isWorldUnlocked(world, profile, worlds)) return false;
  const visible = getVisibleLessonsForWorld(world, lessonsMap, profile.mode);
  return visible.every((l) => Boolean(profile.lessons[l.id]?.completedAt));
}

export function isPreTestPending(world: World, profile: Profile, worlds: World[]): boolean {
  if (!isWorldUnlocked(world, profile, worlds)) return false;
  return !profile.assessments[world.id]?.pre;
}

export function isPostTestPending(world: World, profile: Profile): boolean {
  const passedBoss = Boolean(profile.bosses[world.id]?.passed);
  const hasPost = Boolean(profile.assessments[world.id]?.post);
  return passedBoss && !hasPost;
}

/**
 * Tes Ingat muncul 7 hari setelah Tes Akhir dan berlaku sampai hari ke-21 (§7.10, F14).
 */
export function getDueRetainWorlds(
  profile: Profile,
  worlds: World[],
  todayStr: string = formatLocalDate(),
): World[] {
  return worlds.filter((world) => {
    const rec = profile.assessments[world.id];
    if (!rec?.post || rec.retain) return false;
    const daysElapsed = diffDaysLocal(rec.post.at, todayStr);
    return daysElapsed >= 7 && daysElapsed <= 21;
  });
}

export interface NextAction {
  type: 'pretest' | 'lesson' | 'boss' | 'posttest' | 'done';
  worldId: string;
  lessonId?: string;
  stepIndex?: number;
}

export function getNextRecommendedAction(
  profile: Profile,
  worlds: World[],
  lessonsMap: Record<string, Lesson>,
): NextAction {
  const ordered = [...worlds].sort((a, b) => {
    if (a.track !== b.track) return a.track.localeCompare(b.track);
    return a.order - b.order;
  });

  // Prioritaskan Tes Akhir yang tertunda jika Boss baru saja lulus
  for (const w of ordered) {
    if (isPostTestPending(w, profile)) {
      return { type: 'posttest', worldId: w.id };
    }
  }

  for (const w of ordered) {
    if (!isWorldUnlocked(w, profile, worlds)) continue;
    const bossPassed = Boolean(profile.bosses[w.id]?.passed);
    if (bossPassed) continue;

    if (!profile.assessments[w.id]?.pre) {
      return { type: 'pretest', worldId: w.id };
    }

    const visible = getVisibleLessonsForWorld(w, lessonsMap, profile.mode);
    const nextLesson = visible.find((l) => !profile.lessons[l.id]?.completedAt);
    if (nextLesson) {
      return {
        type: 'lesson',
        worldId: w.id,
        lessonId: nextLesson.id,
        stepIndex: profile.lessons[nextLesson.id]?.stepIndex,
      };
    }

    return { type: 'boss', worldId: w.id };
  }

  return { type: 'done', worldId: 'b10' };
}

export function getWorldStarStats(
  world: World,
  lessonsMap: Record<string, Lesson>,
  profile: Profile,
): { earned: number; max: number; completedLessons: number; totalLessons: number } {
  const visible = getVisibleLessonsForWorld(world, lessonsMap, profile.mode);
  let earned = 0;
  let completedLessons = 0;
  for (const lesson of visible) {
    const rec = profile.lessons[lesson.id];
    if (rec?.completedAt) completedLessons += 1;
    earned += rec?.stars ?? 0;
  }
  return {
    earned,
    max: visible.length * 3,
    completedLessons,
    totalLessons: visible.length,
  };
}
