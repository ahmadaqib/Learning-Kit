import { resolveTxt, type Mode, type Question } from '@/content/schema';

export function getAnswerExplanation(question: Question, answer: unknown, correct: boolean, mode: Mode): string {
  const alternatives = question.explainIncorrect;
  if (!correct && alternatives && (typeof answer === 'string' || typeof answer === 'boolean')) {
    const key = String(answer);
    if (Object.hasOwn(alternatives, key)) return resolveTxt(alternatives[key], mode);
  }
  return resolveTxt(question.explainCorrect, mode);
}
