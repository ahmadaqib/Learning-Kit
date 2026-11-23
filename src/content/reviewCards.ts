import { useEffect, useState } from 'react';
import type { Lesson, Mode, Profile } from './schema';
import { loadWorldBundle } from './worldLoader';

export function visibleReviewCards(lesson: Lesson, mode: Mode) {
  return lesson.modes.includes(mode)
    ? lesson.reviewCards.filter((card) => !card.modes || card.modes.includes(mode))
    : [];
}

/** Read only worlds with due cards, so a new learner's Home does not load the curriculum. */
export function useDueReviewCount(profile: Profile | undefined, today: string): number {
  const due = Object.entries(profile?.leitner ?? {}).filter(([, state]) => state.due <= today).map(([id]) => id);
  const ids = due.join(',');
  const mode = profile?.mode ?? 'junior';
  const [result, setResult] = useState({ ids: '', mode, count: 0 });
  useEffect(() => {
    if (!ids) return;
    let active = true;
    const dueIds = new Set(ids.split(','));
    const worlds = new Set([...dueIds].map((id) => id.split('-')[0]));
    Promise.all([...worlds].map(async (worldId) => {
      const bundle = await loadWorldBundle(worldId).catch(() => null);
      return (bundle?.lessons ?? []).flatMap((l) => visibleReviewCards(l, mode)).filter((q) => dueIds.has(q.id)).length;
    })).then((counts) => {
      if (active) setResult({ ids, mode, count: counts.reduce((a, b) => a + b, 0) });
    });
    return () => { active = false; };
  }, [ids, mode]);
  return result.ids === ids && result.mode === mode ? result.count : 0;
}
