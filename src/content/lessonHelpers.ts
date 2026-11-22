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

export function rCode(v: string): Rich {
  return { t: 'code', v };
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
  riskyAnalogy?: boolean;
}): Step {
  return {
    kind: 'limit',
    analogy: params.analogy,
    same: params.same,
    different: params.different,
    illustration: params.illustration,
    riskyAnalogy: params.riskyAnalogy ?? true,
  };
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
  choices: { id: string; label: Txt; explainWrong?: Txt; icon?: string }[];
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
    if (c.id !== params.answer && c.id !== 'unknown') {
      explainIncorrect[c.id] =
        c.explainWrong ??
        t(
          `Hampir! Pilihan itu belum pas. ${params.explainCorrect.junior ?? params.explainCorrect.pro}`,
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
