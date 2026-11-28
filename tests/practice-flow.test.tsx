import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, expect, it } from 'vitest';
import { LessonPlayerPage } from '@/pages/LessonPlayerPage';
import { LessonReflection } from '@/components/lesson/LessonReflection';
import { getDueLeitnerCards, type LeitnerCardState } from '@/engine/leitner';
import { getReflection } from '@/engine/lessonNotes';
import { buildLessonPlan, loadSnapshot, saveSnapshot, snapshotFromSession } from '@/engine/lessonSession';
import { createQuizSession } from '@/engine/queue';
import { loadWorldBundle } from '@/content/worldLoader';
import { useAppStore } from '@/store/useAppStore';

beforeEach(() => {
  localStorage.clear();
  useAppStore.setState({ activeProfileId: '', profiles: {} });
  document.documentElement.dataset.reducedMotion = 'always';
});
afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.reducedMotion;
});

const profile = () => useAppStore.getState().createProfile({ nickname: 'Ari', avatar: 'star', mode: 'junior' })!;

function mountPlayer() {
  return render(<MemoryRouter initialEntries={['/belajar/a01-l01']}>
    <Routes><Route path="/belajar/:pelajaranId" element={<LessonPlayerPage />} /></Routes>
  </MemoryRouter>);
}

it('keeps a wrong prediction outside scoring and restores the concept on reload', async () => {
  const id = profile();
  useAppStore.getState().markQuestionGuideSeen('mcq');
  useAppStore.getState().updateSettings({ soundEnabled: false, autoReadAloud: false });
  const lesson = (await loadWorldBundle('a01')).lessons.find((l) => l.id === 'a01-l01')!;
  const plan = buildLessonPlan(lesson, 'junior');
  const index = plan.timeline.findIndex((t) => t.kind === 'card' && t.step.kind === 'concept');
  const session = createQuizSession(plan.questions);
  const original = snapshotFromSession({ lessonId: lesson.id, mode: 'junior', stepIndex: index, session, elapsedMs: 0, misses: 0 });
  saveSnapshot(id, original);
  const view = mountPlayer();

  await screen.findByText('Tebak dulu!');
  const prediction = lesson.reviewCards.find((q) => q.type === 'mcq' && (!q.modes || q.modes.includes('junior')))!;
  if (prediction.type !== 'mcq') throw new Error('Expected a choice question');
  const wrong = prediction.choices.find((c) => c.id !== prediction.answer)!;
  fireEvent.click(screen.getByRole('button', { name: wrong.label.junior ?? wrong.label.pro }));
  fireEvent.click(screen.getByRole('button', { name: 'Periksa' }));
  expect(await screen.findByRole('region', { name: 'Penjelasan jawaban' })).toBeTruthy();
  expect(useAppStore.getState().profiles[id]).toMatchObject({ xp: 0, mistakes: {}, leitner: {} });
  expect(loadSnapshot(id, lesson.id)).toMatchObject({ queue: original.queue, attemptedFirstTry: {}, stepIndex: index, predictionDone: true, misses: 0 });
  view.unmount();
  const again = mountPlayer();
  const focus = await screen.findByRole('button', { name: 'Fokus' });
  expect(screen.queryByText('Tebak dulu!')).toBeNull();
  fireEvent.click(focus);
  expect(document.documentElement).toHaveAttribute('data-lesson-focus');
  again.unmount();
  expect(document.documentElement).not.toHaveAttribute('data-lesson-focus');
  mountPlayer();
  expect(await screen.findByRole('button', { name: 'Fokus' })).toHaveAttribute('aria-pressed', 'true');
});

it('retains a reflection for its own learner and mode and clears it on profile reset', async () => {
  const lesson = (await loadWorldBundle('a01')).lessons[0];
  const id = profile();
  const junior = render(<LessonReflection profileId={id} lesson={lesson} mode="junior" />);
  fireEvent.click(screen.getByRole('button', { name: 'Gambarkan' }));
  junior.unmount();
  render(<LessonReflection profileId={id} lesson={lesson} mode="pro" />);
  const notes = screen.getByRole('textbox');
  expect(notes).toHaveValue('');
  fireEvent.change(notes, { target: { value: 'Periksa dulu asumsi saya.' } });
  fireEvent.click(screen.getByRole('button', { name: 'Simpan catatan' }));
  expect(getReflection(id, 'junior', 'a01-l01')).toBe('draw');
  expect(getReflection(id, 'pro', 'a01-l01')).toBe('Periksa dulu asumsi saya.');
  expect(getReflection('other', 'pro', 'a01-l01')).toBe('');
  useAppStore.getState().resetActiveProfileData();
  expect(getReflection(id, 'pro', 'a01-l01')).toBe('');
});

it('interleaves overdue lessons after filtering mode and before capping the review', () => {
  const state: Record<string, LeitnerCardState> = {};
  const topics = new Map<string, string>();
  for (let i = 0; i < 12; i++) {
    state[String(i)] = { box: 1, due: '2026-11-' + String(i + 1).padStart(2, '0') };
    if (i >= 3) topics.set(String(i), i < 9 ? 'a' : 'b');
  }
  expect(getDueLeitnerCards(state, '2026-11-11', 'junior', topics).map((c) => c.cardId)).toEqual(['3', '9', '4', '10', '5']);
});

it('keeps all seven workshops accessible as optional Pro work outside the main path', async () => {
  const { WORLD_META_BY_ID } = await import('@/content/worldMeta');
  for (const [worldId, ids] of Object.entries({
    a04: ['a04-sq1', 'a04-sq2'], a11: ['a11-sq1', 'a11-sq2', 'a11-sq3', 'a11-sq4'], b09: ['b09-sq1'],
  })) {
    const bundle = await loadWorldBundle(worldId);
    const meta = WORLD_META_BY_ID[worldId];
    for (const id of ids) {
      const lesson = bundle.lessons.find((l) => l.id === id)!;
      expect(lesson.modes).toEqual(['pro']);
      expect(bundle.world.lessons).not.toContain(id);
      expect(bundle.world.sideQuests).toContain(id);
      expect(meta.sideQuests.find((l) => l.id === id)).toMatchObject({
        modes: ['pro'], isSideQuest: true, title: lesson.title, estMinutes: lesson.estMinutes,
      });
      expect(lesson.warmupFrom).toBe(meta.lessons.filter((l) => l.modes.includes('pro')).at(-1)?.id);
      const plan = buildLessonPlan(lesson, 'pro');
      expect(plan.questions.length).toBeGreaterThanOrEqual(6);
      expect(lesson.atWork).toBeTruthy();
      expect(lesson.reviewCards.length).toBeGreaterThanOrEqual(2);
      for (const q of [...plan.questions, ...lesson.reviewCards]) expect(q.hints?.[0]?.pro).toBeTruthy();
    }
  }
});

it('sends Junior back to the world map from a locked lesson, but lets Pro open it', () => {
  for (const mode of ['junior', 'pro'] as const) {
    cleanup();
    useAppStore.setState({ activeProfileId: '', profiles: {} });
    useAppStore.getState().createProfile({ nickname: 'Ari', avatar: 'star', mode });
    render(<MemoryRouter initialEntries={['/belajar/a01-l04']}>
      <Routes>
        <Route path="/belajar/:pelajaranId" element={<LessonPlayerPage />} />
        <Route path="/dunia/:id" element={<p>peta dunia</p>} />
      </Routes>
    </MemoryRouter>);
    expect(Boolean(screen.queryByText('peta dunia')), mode).toBe(mode === 'junior');
  }
});

it('offers the AI tutor on reading cards in Pro only', async () => {
  for (const mode of ['junior', 'pro'] as const) {
    cleanup();
    useAppStore.setState({ activeProfileId: '', profiles: {} });
    useAppStore.getState().createProfile({ nickname: 'Ari', avatar: 'star', mode });
    mountPlayer();
    await screen.findByText('Situs web itu seperti restoran');
    expect(Boolean(screen.queryByRole('button', { name: 'Tanya AI' })), mode).toBe(mode === 'pro');
  }
});
