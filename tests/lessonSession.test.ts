import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { Lesson, Question, Step } from '../src/content/schema';
import { advanceQuizSession, createQuizSession } from '../src/engine/queue';
import { ALMOST_RATIO, QuestionRenderer, judgeParts } from '../src/components/questions/QuestionRenderer';
import {
  SESSION_MAX_AGE_MS,
  buildLessonPlan,
  legacyStepToTimelineIndex,
  SESSION_STORAGE_KEY,
  clearSnapshot,
  loadSnapshot,
  resetSessionMemory,
  restoreSession,
  saveSnapshot,
  snapshotFromSession,
} from '../src/engine/lessonSession';

const t = (pro: string) => ({ pro });

function mcq(id: string): Question {
  return {
    id,
    type: 'mcq',
    prompt: t(`Soal ${id}?`),
    choices: [
      { id: 'a', label: t('A') },
      { id: 'b', label: t('B') },
      { id: 'c', label: t('C') },
      { id: 'unknown', label: t('Belum tahu') },
    ],
    answer: 'a',
    difficulty: 1,
    explainCorrect: t('Karena A.'),
    tags: ['x'],
  };
}

const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5'].map(mcq);
const NOW = Date.UTC(2026, 10, 23, 10, 0, 0);

beforeEach(() => {
  localStorage.clear();
  resetSessionMemory();
});

describe('lesson snapshot', () => {
  it('saves one entry per profile and lesson and clears it', () => {
    const s = createQuizSession(QUESTIONS);
    saveSnapshot('p1', snapshotFromSession({ lessonId: 'l1', mode: 'junior', stepIndex: 2, session: s, elapsedMs: 0, misses: 0, now: NOW }));
    saveSnapshot('p1', snapshotFromSession({ lessonId: 'l2', mode: 'junior', stepIndex: 1, session: s, elapsedMs: 0, misses: 0, now: NOW }));
    saveSnapshot('p2', snapshotFromSession({ lessonId: 'l1', mode: 'pro', stepIndex: 5, session: s, elapsedMs: 0, misses: 0, now: NOW }));
    expect(loadSnapshot('p1', 'l1')?.stepIndex).toBe(2);
    expect(loadSnapshot('p1', 'l2')?.stepIndex).toBe(1);
    expect(loadSnapshot('p2', 'l1')?.mode).toBe('pro');
    clearSnapshot('p1', 'l1');
    expect(loadSnapshot('p1', 'l1')).toBeNull();
    expect(loadSnapshot('p1', 'l2')).not.toBeNull();
  });

  it('stores exactly the fields of the spec', () => {
    const s = createQuizSession(QUESTIONS.slice(0, 2));
    const snap = snapshotFromSession({ lessonId: 'l1', mode: 'junior', stepIndex: 3, session: s, elapsedMs: 1234.4, misses: 1, now: NOW });
    expect(Object.keys(snap).sort()).toEqual(
      [
        'attemptedFirstTry',
        'completedIds',
        'elapsedMs',
        'firstTryCorrectIds',
        'lessonId',
        'misses',
        'mode',
        'queue',
        'retryCorrectIds',
        'savedAt',
        'stepIndex',
      ].sort(),
    );
    expect(snap.queue).toEqual([
      { id: 'q1', isRetry: false },
      { id: 'q2', isRetry: false },
    ]);
    expect(snap.elapsedMs).toBe(1234);
  });
});

describe('resume test: leave on the third question, open it again', () => {
  it('continues on the third question with the same first-try record', () => {
    // q1 right, q2 wrong (requeued), q3 is now the head of the queue
    let session = createQuizSession(QUESTIONS);
    session = advanceQuizSession(session, 'q1', true);
    session = advanceQuizSession(session, 'q2', false, () => 0.5);
    expect(session.queue[0].question.id).toBe('q3');

    saveSnapshot('p1', snapshotFromSession({ lessonId: 'l1', mode: 'junior', stepIndex: 4, session, elapsedMs: 61_000, misses: 1, now: NOW }));
    // the tab is closed: a new page load only has the lesson's own questions
    const restored = restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS, now: NOW + 60_000 });

    expect(restored).not.toBeNull();
    const r = restored!;
    expect(r.stepIndex).toBe(4);
    expect(r.elapsedMs).toBe(61_000);
    expect(r.misses).toBe(1);
    expect(r.session.queue.map((i) => [i.question.id, i.isRetry])).toEqual([
      ['q3', false],
      ['q4', false],
      ['q5', false],
      ['q2', true],
    ]);
    expect(r.session.attemptedFirstTry).toEqual({ q1: true, q2: false });
    expect(r.session.firstTryCorrectIds).toEqual(['q1']);
    expect(r.session.retryCorrectIds).toEqual([]);
    expect(r.session.completedIds).toEqual(['q1']);

    // and the learner can carry on from the restored state
    const next = advanceQuizSession(r.session, 'q3', true);
    expect(next.firstTryCorrectIds).toEqual(['q1', 'q3']);
  });

  it('also holds after leaving on a quick check between cards (step index on the timeline)', () => {
    let session = createQuizSession(QUESTIONS);
    session = advanceQuizSession(session, 'q1', true);
    // quick check q2 is the head of the queue, the player is on timeline step 3
    saveSnapshot('p1', snapshotFromSession({ lessonId: 'l1', mode: 'pro', stepIndex: 3, session, elapsedMs: 0, misses: 0, now: NOW }));
    const r = restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'pro', questions: QUESTIONS, maxStepIndex: 6, now: NOW + 1000 });
    expect(r?.stepIndex).toBe(3);
    expect(r?.session.queue[0].question.id).toBe('q2');
    expect(r?.session.firstTryCorrectIds).toEqual(['q1']);
  });

  it('reshuffles the choices of a requeued question and keeps "Belum tahu" last', () => {
    let session = createQuizSession(QUESTIONS.slice(0, 2));
    session = advanceQuizSession(session, 'q1', false, () => 0.5);
    saveSnapshot('p1', snapshotFromSession({ lessonId: 'l1', mode: 'junior', stepIndex: 2, session, elapsedMs: 0, misses: 1, now: NOW }));
    let n = 0;
    const rng = () => {
      n += 0.37;
      return n % 1;
    };
    const r = restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS.slice(0, 2), now: NOW, rng });
    const retry = r!.session.queue.find((i) => i.isRetry)!;
    const ids = (retry.question as Extract<Question, { type: 'mcq' }>).choices.map((c) => c.id);
    expect([...ids].sort()).toEqual(['a', 'b', 'c', 'unknown']);
    expect(ids[ids.length - 1]).toBe('unknown');
  });
});

describe('a snapshot that must not be restored', () => {
  const save = (over: Partial<ReturnType<typeof snapshotFromSession>> = {}) => {
    const session = createQuizSession(QUESTIONS);
    saveSnapshot('p1', { ...snapshotFromSession({ lessonId: 'l1', mode: 'junior', stepIndex: 1, session, elapsedMs: 0, misses: 0, now: NOW }), ...over });
  };

  it('is dropped when it is older than 7 days', () => {
    save();
    const r = restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS, now: NOW + SESSION_MAX_AGE_MS + 1 });
    expect(r).toBeNull();
    expect(loadSnapshot('p1', 'l1')).toBeNull();
  });

  it('is kept just under 7 days', () => {
    save();
    const r = restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS, now: NOW + SESSION_MAX_AGE_MS - 1000 });
    expect(r).not.toBeNull();
  });

  it('is dropped when the mode differs', () => {
    save();
    expect(restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'pro', questions: QUESTIONS, now: NOW })).toBeNull();
    expect(loadSnapshot('p1', 'l1')).toBeNull();
  });

  it('is dropped when a question id no longer exists', () => {
    save();
    const fewer = QUESTIONS.filter((q) => q.id !== 'q4');
    expect(restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: fewer, now: NOW })).toBeNull();
    expect(loadSnapshot('p1', 'l1')).toBeNull();
  });

  it('is dropped when the saved step is past the end of the timeline', () => {
    save({ stepIndex: 9 });
    expect(restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS, maxStepIndex: 5, now: NOW })).toBeNull();
  });

  it('is dropped when it is malformed', () => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ p1: { l1: { lessonId: 'l1', mode: 'junior', stepIndex: 'x' } } }));
    expect(restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS, now: NOW })).toBeNull();
  });

  it('is ignored when the storage holds broken JSON', () => {
    localStorage.setItem(SESSION_STORAGE_KEY, '{oops');
    expect(restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS, now: NOW })).toBeNull();
  });

  it('returns null when there is nothing saved', () => {
    expect(restoreSession({ profileId: 'p1', lessonId: 'l1', mode: 'junior', questions: QUESTIONS, now: NOW })).toBeNull();
  });
});

describe('the lesson timeline (authored order with quick checks)', () => {
  const story: Step = { kind: 'story', illustration: 'x', body: [{ t: 'text', v: t('Cerita.') }] };
  const concept = (modes?: Array<'junior' | 'pro'>): Step => ({
    kind: 'concept',
    title: t('Konsep'),
    visual: { type: 'svg', src: 'x', alt: t('x') },
    body: [{ t: 'text', v: t('Isi.') }],
    modes,
  });
  const limit = (riskyAnalogy?: boolean): Step => ({
    kind: 'limit',
    analogy: t('A'),
    same: [t('s')],
    different: [t('d')],
    riskyAnalogy,
  });
  const q = (id: string, modes?: Array<'junior' | 'pro'>): Step => ({ kind: 'question', q: { ...mcq(id), modes } });
  const lesson = (steps: Step[]): Lesson =>
    ({ id: 'l1', worldId: 'a01', title: 'T', modes: ['junior', 'pro'], steps }) as unknown as Lesson;

  it('plays questions between cards as quick checks, and the trailing ones as the closing quiz', () => {
    const plan = buildLessonPlan(lesson([story, q('q1'), concept(), q('q2'), q('q3')]), 'junior');
    expect(plan.timeline.map((i) => i.kind)).toEqual(['card', 'check', 'card']);
    expect(plan.questions.map((x) => x.id)).toEqual(['q1', 'q2', 'q3']);
    expect(plan.closingIds).toEqual(['q2', 'q3']);
  });

  it('a lesson with every question at the end has no quick check', () => {
    const plan = buildLessonPlan(lesson([story, concept(), q('q1'), q('q2')]), 'pro');
    expect(plan.timeline.map((i) => i.kind)).toEqual(['card', 'card']);
    expect(plan.closingIds).toEqual(['q1', 'q2']);
  });

  it('puts the warm-up first and keeps mode rules (concept modes, limit cards, question modes)', () => {
    const warm = mcq('w1');
    const steps = [story, concept(['pro']), limit(false), limit(true), q('q1', ['pro']), q('q2')];
    const junior = buildLessonPlan(lesson(steps), 'junior', warm);
    expect(junior.timeline.map((i) => i.kind)).toEqual(['warmup', 'card', 'card']);
    expect(junior.questions.map((x) => x.id)).toEqual(['q2']);
    const pro = buildLessonPlan(lesson(steps), 'pro');
    expect(pro.timeline.map((i) => i.kind)).toEqual(['card', 'card', 'card', 'card']);
    expect(pro.questions.map((x) => x.id)).toEqual(['q1', 'q2']);
  });

  it('a lesson with no cards goes straight to the closing quiz', () => {
    const plan = buildLessonPlan(lesson([q('q1'), q('q2')]), 'pro');
    expect(plan.timeline).toEqual([]);
    expect(plan.closingIds).toEqual(['q1', 'q2']);
  });

  it('maps an old step index (warm-up and cards only) onto the new timeline', () => {
    const plan = buildLessonPlan(lesson([story, q('q1'), concept(), q('q2'), limit(true), q('q3')]), 'pro');
    // timeline: card, check, card, check, card
    expect(plan.timeline.map((i) => i.kind)).toEqual(['card', 'check', 'card', 'check', 'card']);
    expect(legacyStepToTimelineIndex(0, plan.timeline)).toBe(0);
    expect(legacyStepToTimelineIndex(1, plan.timeline)).toBe(1);
    expect(legacyStepToTimelineIndex(2, plan.timeline)).toBe(3);
    expect(legacyStepToTimelineIndex(3, plan.timeline)).toBe(5);
    expect(legacyStepToTimelineIndex(9, plan.timeline)).toBe(5);
  });
});

/* ------------------------------------------------------------------------------------------------
 * Colour-blindness test (spec 5.5, 10.2, 13): a wrong answer on sort, order, match, fill, spotbug and type
 * still tells right parts from wrong parts without colour and without motion: an icon, visually hidden text,
 * and a solid (right) or dashed (wrong) outline.
 * ---------------------------------------------------------------------------------------------- */

const base = { difficulty: 1 as const, explainCorrect: t('Ok.'), tags: ['x'] };
const FIXTURES: Record<string, { q: Question; wrong: unknown; right: unknown }> = {
  sort: {
    q: {
      ...base,
      id: 's',
      type: 'sort',
      prompt: t('Kelompokkan.'),
      items: [
        { id: 'i1', label: t('Gambar') },
        { id: 'i2', label: t('Teks') },
        { id: 'i3', label: t('Video') },
      ],
      bins: [
        { id: 'b1', label: t('Media') },
        { id: 'b2', label: t('Tulisan') },
      ],
      answer: { i1: 'b1', i2: 'b2', i3: 'b1' },
    },
    wrong: { i1: 'b1', i2: 'b1', i3: 'b1' },
    right: { i1: 'b1', i2: 'b2', i3: 'b1' },
  },
  order: {
    q: {
      ...base,
      id: 'o',
      type: 'order',
      prompt: t('Urutkan.'),
      items: [
        { id: 'a', label: t('Satu') },
        { id: 'b', label: t('Dua') },
        { id: 'c', label: t('Tiga') },
      ],
      answer: ['a', 'b', 'c'],
    },
    wrong: ['b', 'a', 'c'],
    right: ['a', 'b', 'c'],
  },
  match: {
    q: {
      ...base,
      id: 'm',
      type: 'match',
      prompt: t('Pasangkan.'),
      left: [
        { id: 'l1', label: t('HTML') },
        { id: 'l2', label: t('CSS') },
      ],
      right: [
        { id: 'r1', label: t('Struktur') },
        { id: 'r2', label: t('Gaya') },
      ],
      answer: { l1: 'r1', l2: 'r2' },
    },
    wrong: { l1: 'r1', l2: 'r1' },
    right: { l1: 'r1', l2: 'r2' },
  },
  fill: {
    q: {
      ...base,
      id: 'f',
      type: 'fill',
      prompt: t('Lengkapi.'),
      template: '<___>Halo</___>',
      bank: ['h1', 'p'],
      answer: ['h1', 'h1'],
    },
    wrong: ['h1', 'p'],
    right: ['h1', 'h1'],
  },
  spotbug: {
    q: {
      ...base,
      id: 'b',
      type: 'spotbug',
      prompt: t('Cari.'),
      lines: ['a = 1', 'b = 2', 'c = 3'],
      answer: [2],
    },
    wrong: [1, 2],
    right: [2],
  },
  type: {
    q: { ...base, id: 't', type: 'type', prompt: t('Ketik.'), accept: ['halo'] },
    wrong: 'salah',
    right: 'halo',
  },
};

describe('colour-blindness test: judged parts need no colour and no motion', () => {
  afterEach(() => cleanup());

  const renderSubmitted = (q: Question, value: unknown, isCorrect: boolean) =>
    render(
      React.createElement(QuestionRenderer, {
        question: q,
        mode: 'pro',
        value,
        onChange: () => {},
        disabled: true,
        isSubmitted: true,
        isCorrect,
      }),
    );

  for (const [name, fx] of Object.entries(FIXTURES)) {
    it(`${name}: every judged part has an icon and hidden text, dashed when wrong`, () => {
      const { container } = renderSubmitted(fx.q, fx.wrong, false);
      const judged = Array.from(container.querySelectorAll<HTMLElement>('[data-judge]'));
      expect(judged.length).toBeGreaterThan(0);
      const verdicts = new Set(judged.map((el) => el.dataset.judge));
      for (const el of judged) {
        const right = el.dataset.judge === 'right';
        expect(el.querySelector('svg'), `${name}: a judged part has an icon`).not.toBeNull();
        const hidden = el.querySelector('.visually-hidden');
        // the card's own hidden text reads " (belum pas)", ours reads "belum pas"
        expect(hidden?.textContent?.replace(/[()]/g, '').trim()).toBe(right ? 'benar' : 'belum pas');
      }
      // wrong parts are dashed, right parts are solid (the pair that survives red-green colour blindness)
      for (const el of judged) {
        const frame = el.dataset.judge === 'right' ? 'border-solid' : 'border-dashed';
        const holder = el.matches('[class*="border-"]') ? el : (el.querySelector('[class*="border-"]') as HTMLElement | null);
        expect(holder?.className ?? el.className).toContain(frame);
      }
      expect(verdicts.has('wrong')).toBe(true);
    });
  }

  it('a fully right answer marks every part as right', () => {
    for (const fx of Object.values(FIXTURES)) {
      const j = judgeParts(fx.q, fx.right);
      expect(Object.values(j.verdicts).every((v) => v === 'right')).toBe(true);
      expect(j.right).toBe(j.total);
    }
  });

  it('does not reveal the right answer: an untouched part is never marked', () => {
    const spot = judgeParts(FIXTURES.spotbug.q, [1]);
    expect(Object.keys(spot.verdicts)).toEqual(['1']);
    expect(spot.verdicts['1']).toBe('wrong');
    const match = judgeParts(FIXTURES.match.q, {});
    expect(Object.values(match.verdicts).every((v) => v === 'wrong')).toBe(true);
  });

  it('a multiple-choice card marks only the chosen choice', () => {
    const { container } = renderSubmitted(mcq('q9'), 'b', false);
    const judged = container.querySelectorAll('[data-judge]');
    expect(judged).toHaveLength(1);
    expect(judged[0].querySelector('.visually-hidden')?.textContent?.replace(/[()]/g, '').trim()).toBe('belum pas');
  });
});

describe('partial credit decides the title', () => {
  it('reports parts right over parts total for sort, order, match and fill only', () => {
    expect(judgeParts(FIXTURES.sort.q, FIXTURES.sort.wrong)).toMatchObject({ right: 2, total: 3, partial: true });
    expect(judgeParts(FIXTURES.order.q, FIXTURES.order.wrong)).toMatchObject({ right: 1, total: 3, partial: true });
    expect(judgeParts(FIXTURES.match.q, FIXTURES.match.wrong)).toMatchObject({ right: 1, total: 2, partial: true });
    expect(judgeParts(FIXTURES.fill.q, FIXTURES.fill.wrong)).toMatchObject({ right: 1, total: 2, partial: true });
    expect(judgeParts(FIXTURES.spotbug.q, FIXTURES.spotbug.wrong).partial).toBe(false);
    expect(judgeParts(mcq('q'), 'b').partial).toBe(false);
  });

  it('"Hampir!" needs at least 70% of the parts right', () => {
    const sort = judgeParts(FIXTURES.sort.q, FIXTURES.sort.wrong);
    expect(sort.right / sort.total >= ALMOST_RATIO).toBe(false); // 2 of 3 = 0.67
    expect(ALMOST_RATIO).toBe(0.7);
    const nearly = judgeParts(
      { ...(FIXTURES.sort.q as Extract<Question, { type: 'sort' }>), items: [...Array(10)].map((_, i) => ({ id: `x${i}`, label: t('x') })), answer: Object.fromEntries([...Array(10)].map((_, i) => [`x${i}`, 'b1'])) },
      Object.fromEntries([...Array(10)].map((_, i) => [`x${i}`, i < 7 ? 'b1' : 'b2'])),
    );
    expect(nearly.right / nearly.total >= ALMOST_RATIO).toBe(true); // 7 of 10
  });
});
