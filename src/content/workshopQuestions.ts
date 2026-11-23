import { makeMcq } from './lessonHelpers';
import type { Question } from './schema';

const pro = (text: string) => ({ pro: text });

export function workshopQuestions(lessonId: string, topic: string) {
  return function question(
    suffix: string, prompt: string, choices: [string, string, string], answer: 0 | 1 | 2,
    explanations: [string, string, string], hint: string, analogy?: string,
  ): Question {
    return makeMcq({
      id: `${lessonId}-${suffix}`, prompt: pro(prompt), modes: ['pro'], tags: [topic],
      type: analogy ? 'limit' : 'mcq', analogy: analogy ? pro(analogy) : undefined,
      choices: choices.map((label, i) => ({
        id: String(i), label: pro(label), explainWrong: i === answer ? undefined : pro(explanations[i]),
      })),
      answer: String(answer), explainCorrect: pro(explanations[answer]), hints: [pro(hint)],
    });
  };
}
