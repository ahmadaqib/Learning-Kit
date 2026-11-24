import type { Choice, Mode, Question } from '@/content/schema';

export function shuffleArray<T>(items: readonly T[], rng: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function shuffleQuestionChoices(q: Question, rng: () => number = Math.random): Question {
  if ('choices' in q && Array.isArray(q.choices)) {
    // Pertahankan "unknown" (Belum tahu) di akhir jika soal jangkar
    const unknown = q.choices.find((c) => c.id === 'unknown');
    const regulars = q.choices.filter((c) => c.id !== 'unknown');
    const shuffled = shuffleArray(regulars, rng);
    return {
      ...q,
      choices: unknown ? [...shuffled, unknown] : shuffled,
    };
  }
  return q;
}

export interface QuizQueueItem {
  question: Question;
  isRetry: boolean;
}

export interface QuizSessionState {
  queue: QuizQueueItem[];
  attemptedFirstTry: Record<string, boolean>;
  firstTryCorrectIds: string[];
  retryCorrectIds: string[];
  completedIds: string[];
}

export function createQuizSession(questions: Question[]): QuizSessionState {
  return {
    queue: questions.map((question) => ({ question, isRetry: false })),
    attemptedFirstTry: {},
    firstTryCorrectIds: [],
    retryCorrectIds: [],
    completedIds: [],
  };
}

export function advanceQuizSession(
  state: QuizSessionState,
  questionId: string,
  isCorrect: boolean,
  rng: () => number = Math.random,
): QuizSessionState {
  const [current, ...rest] = state.queue;
  if (!current || current.question.id !== questionId) {
    return state;
  }

  const seenBefore = questionId in state.attemptedFirstTry;
  const attemptedFirstTry = seenBefore
    ? state.attemptedFirstTry
    : { ...state.attemptedFirstTry, [questionId]: isCorrect };

  if (isCorrect) {
    const firstTryCorrectIds = !seenBefore
      ? [...state.firstTryCorrectIds, questionId]
      : state.firstTryCorrectIds;
    const retryCorrectIds = seenBefore
      ? [...state.retryCorrectIds, questionId]
      : state.retryCorrectIds;

    return {
      queue: rest,
      attemptedFirstTry,
      firstTryCorrectIds,
      retryCorrectIds,
      completedIds: [...state.completedIds, questionId],
    };
  }

  // Salah: masukkan lagi ke akhir antrean dengan pilihan jawaban diacak ulang
  const reQueued: QuizQueueItem = {
    question: shuffleQuestionChoices(current.question, rng),
    isRetry: true,
  };

  return {
    ...state,
    attemptedFirstTry,
    queue: [...rest, reQueued],
  };
}

type OrderQuestion = Extract<Question, { type: 'order' }>;

export function getInitialOrder(question: OrderQuestion): string[] {
  return question.items.map(({ id }) => id);
}

export function getOrderSequence(question: OrderQuestion, value: unknown): string[] | null {
  if (value === undefined) return getInitialOrder(question);
  if (!Array.isArray(value) || value.length !== question.items.length) return null;

  const remaining = new Set(getInitialOrder(question));
  for (const id of value) {
    if (!remaining.delete(id)) return null;
  }
  return value;
}

export function evaluateQuestionAnswer(q: Question, userAnswer: unknown): boolean {
  switch (q.type) {
    case 'mcq':
    case 'analogy':
    case 'hotspot':
    case 'why':
    case 'scenario':
    case 'limit':
      return userAnswer === q.answer;
    case 'tf':
      return userAnswer === q.answer;
    case 'type': {
      if (typeof userAnswer !== 'string') return false;
      const trimmed = userAnswer.trim();
      if (q.caseSensitive) {
        return q.accept.some((a) => a.trim() === trimmed);
      }
      const lower = trimmed.toLowerCase();
      return q.accept.some((a) => a.trim().toLowerCase() === lower);
    }
    case 'fill': {
      if (!Array.isArray(userAnswer) || userAnswer.length !== q.answer.length) return false;
      return q.answer.every((ans, idx) => userAnswer[idx] === ans);
    }
    case 'order': {
      const order = getOrderSequence(q, userAnswer);
      return order !== null && order.length === q.answer.length && q.answer.every((ans, idx) => order[idx] === ans);
    }
    case 'spotbug': {
      if (!Array.isArray(userAnswer)) return false;
      const expected = [...q.answer].sort((a, b) => a - b);
      const actual = [...new Set(userAnswer.map(Number))].sort((a, b) => a - b);
      return expected.length === actual.length && expected.every((v, idx) => v === actual[idx]);
    }
    case 'sort':
    case 'match': {
      if (!userAnswer || typeof userAnswer !== 'object') return false;
      const rec = userAnswer as Record<string, string>;
      const keys = Object.keys(q.answer);
      return keys.every((k) => rec[k] === q.answer[k]);
    }
    default:
      return false;
  }
}

export function getQuestionChoicesForMode(choices: Choice[], mode: Mode): Choice[] {
  return choices.map((c) => ({
    ...c,
    label: {
      junior: c.label.junior ?? c.label.pro,
      pro: c.label.pro,
    },
  }));
  void mode;
}
