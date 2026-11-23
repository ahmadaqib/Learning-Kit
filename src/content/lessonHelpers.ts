import type { ContentIconName } from './icons';
import type {
  Choice,
  CodeSnippet,
  Lesson,
  Mode,
  Question,
  Rich,
  Step,
  Txt,
  Visual,
} from './schema';

/**
 * Authoring slips that the helpers below fix or ignore silently. The helpers cannot throw (a throw would
 * break the app at import time), so they leave a trace here and `scripts/validate-content.ts` reports it
 * (copydeck C11 and C15). Nothing in the app reads this object.
 */
export const COPYDECK_TRACE = {
  /** `explainWrong` was written on the correct choice of a makeMcq question. It never shows, so it is dropped. */
  wrongOnCorrect: [] as { questionId: string; choiceId: string }[],
  /** Wrong choices of a makeMcq question written without `explainWrong`. The safety-net text would show, so the validator reports X14 as an error. */
  fallbackExplain: [] as { questionId: string; choiceId: string }[],
  /** limit steps built without an explicit `riskyAnalogy` (the default is now false, copydeck 6.6). */
  implicitRisky: new WeakSet<object>(),
};

export function t(junior: string, pro: string = junior): Txt {
  return { junior, pro };
}

export function rText(junior: string, pro: string = junior): Rich {
  return { t: 'text', v: { junior, pro } };
}

export function rBold(junior: string, pro: string = junior): Rich {
  return { t: 'bold', v: { junior, pro } };
}

export function rTerm(termId: string, junior: string, pro: string = junior): Rich {
  return { t: 'term', termId, v: { junior, pro } };
}

export function rCode(v: string, modes?: Mode[]): Rich {
  return modes ? { t: 'code', v, modes } : { t: 'code', v };
}

/** A sentence part that only Petualang (Junior) learners see. Pro skips it. */
export function rJunior(text: string): Rich {
  return { t: 'text', v: { junior: text, pro: text }, modes: ['junior'] };
}

/** A sentence part that only Pro learners see. Junior skips it. */
export function rPro(text: string): Rich {
  return { t: 'text', v: { pro: text }, modes: ['pro'] };
}

export function storyStep(illustration: string, body: Rich[]): Step {
  return { kind: 'story', illustration, body };
}

export function conceptStep(params: {
  title: Txt;
  visualName: string;
  visualProps?: Record<string, unknown>;
  alt: Txt;
  body: Rich[];
  code?: CodeSnippet;
  modes?: Mode[];
}): Step {
  const visual: Visual = {
    type: 'component',
    name: params.visualName,
    props: params.visualProps,
    alt: params.alt,
  };
  return {
    kind: 'concept',
    title: params.title,
    visual,
    body: params.body,
    code: params.code,
    modes: params.modes,
  };
}

export function limitStep(params: {
  analogy: Txt;
  same: Txt[];
  different: Txt[];
  illustration?: string;
  /**
   * Write this on every limit card (copydeck 6.6). true: children easily carry a wrong trait of the analogy
   * over to the real thing, so Junior sees the "Mirip, tetapi berbeda" card. When left out it is false, which
   * hides the card from Junior, and the validator reports C15.
   */
  riskyAnalogy?: boolean;
}): Step {
  const step: Step = {
    kind: 'limit',
    analogy: params.analogy,
    same: params.same,
    different: params.different,
    illustration: params.illustration,
    riskyAnalogy: params.riskyAnalogy ?? false,
  };
  if (params.riskyAnalogy === undefined) COPYDECK_TRACE.implicitRisky.add(step);
  return step;
}

export function simStep(
  simId: string,
  instructions: Txt,
  props?: Record<string, unknown>,
): Step {
  return {
    kind: 'sim',
    simId,
    instructions,
    props,
  };
}

export function makeMcq(params: {
  id: string;
  prompt: Txt;
  choices: { id: string; label: Txt; explainWrong?: Txt; icon?: ContentIconName }[];
  answer: string;
  explainCorrect: Txt;
  hints?: [Txt, Txt?];
  tags: string[];
  difficulty?: 1 | 2 | 3;
  modes?: Mode[];
  type?: 'mcq' | 'analogy' | 'why' | 'scenario' | 'limit';
  story?: Txt;
  base?: string;
  analogy?: Txt;
}): Question {
  const choices: Choice[] = params.choices.map((c) => ({
    id: c.id,
    label: c.label,
    icon: c.icon,
  }));
  const explainIncorrect: Record<string, Txt> = {};
  for (const c of params.choices) {
    if (c.id === params.answer && c.explainWrong) {
      // Never shown, so it is dropped (copydeck 6.3 rule 4). The validator reports it as C11.
      COPYDECK_TRACE.wrongOnCorrect.push({ questionId: params.id, choiceId: c.id });
    }
    if (c.id !== params.answer && c.id !== 'unknown') {
      if (!c.explainWrong) COPYDECK_TRACE.fallbackExplain.push({ questionId: params.id, choiceId: c.id });
      // The feedback panel already carries the verdict, so the safety-net text has no "Hampir!" prefix.
      explainIncorrect[c.id] =
        c.explainWrong ??
        t(
          `Pilihan itu belum pas. ${params.explainCorrect.junior ?? params.explainCorrect.pro}`,
          `Belum tepat. ${params.explainCorrect.pro}`,
        );
    }
  }

  const normalizedHints: [Txt, Txt | undefined] | undefined = params.hints
    ? [params.hints[0], params.hints[1]]
    : undefined;

  const base = {
    id: params.id,
    prompt: params.prompt,
    modes: params.modes,
    difficulty: params.difficulty ?? 1,
    explainCorrect: params.explainCorrect,
    explainIncorrect,
    hints: normalizedHints,
    tags: params.tags,
  };

  if (params.type === 'analogy') {
    return { ...base, type: 'analogy', choices, answer: params.answer };
  }
  if (params.type === 'why') {
    return { ...base, type: 'why', base: params.base ?? '', choices, answer: params.answer };
  }
  if (params.type === 'scenario') {
    return {
      ...base,
      type: 'scenario',
      story: params.story ?? params.prompt,
      choices,
      answer: params.answer,
    };
  }
  if (params.type === 'limit') {
    return {
      ...base,
      type: 'limit',
      analogy: params.analogy ?? t('Batas analogi', 'Batas analogi'),
      choices,
      answer: params.answer,
    };
  }
  return { ...base, type: 'mcq', choices, answer: params.answer };
}

export function makeAnchorMcq(params: {
  id: string;
  prompt: Txt;
  choices: { id: string; label: Txt; explainWrong?: Txt }[];
  answer: string;
  explainCorrect: Txt;
  tags: string[];
  type?: 'mcq' | 'analogy' | 'scenario' | 'limit';
  story?: Txt;
  analogy?: Txt;
}): Question {
  return makeMcq({
    ...params,
    choices: [
      ...params.choices,
      { id: 'unknown', label: { junior: 'Belum tahu', pro: 'Belum tahu' } },
    ],
  });
}

export function makeTf(params: {
  id: string;
  prompt: Txt;
  answer: boolean;
  explainCorrect: Txt;
  explainWrong: Txt;
  hints?: [Txt, Txt?];
  tags: string[];
  difficulty?: 1 | 2 | 3;
  modes?: Mode[];
}): Question {
  return {
    id: params.id,
    type: 'tf',
    prompt: params.prompt,
    modes: params.modes,
    difficulty: params.difficulty ?? 1,
    answer: params.answer,
    explainCorrect: params.explainCorrect,
    explainIncorrect: {
      [String(!params.answer)]: params.explainWrong,
    },
    hints: params.hints ? [params.hints[0], params.hints[1]] : undefined,
    tags: params.tags,
  };
}

export function qStep(q: Question): Step {
  return { kind: 'question', q };
}

export function makeLesson(lesson: Lesson): Lesson {
  return lesson;
}
