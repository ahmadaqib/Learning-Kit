import { describe, expect, it } from 'vitest';
import { judgeParts } from '../src/components/questions/QuestionRenderer';
import { advanceQuizSession, createQuizSession, evaluateQuestionAnswer } from '../src/engine/queue';
import type { Question } from '../src/content/schema';

const sampleQuestions: Question[] = [
  {
    id: 'q1',
    type: 'mcq',
    prompt: { junior: 'Pelayan itu ibarat?', pro: 'Pelayan itu ibarat?' },
    difficulty: 1,
    choices: [
      { id: 'a', label: { junior: 'API', pro: 'API' } },
      { id: 'b', label: { junior: 'Dapur', pro: 'Dapur' } },
    ],
    answer: 'a',
    explainCorrect: { junior: 'Benar', pro: 'Benar' },
    explainIncorrect: { b: { junior: 'Dapur adalah backend', pro: 'Dapur adalah backend' } },
    tags: ['api'],
  },
  {
    id: 'q2',
    type: 'tf',
    prompt: { junior: 'JWT terenkripsi', pro: 'JWT terenkripsi' },
    difficulty: 1,
    answer: false,
    explainCorrect: { junior: 'Benar', pro: 'Benar' },
    tags: ['jwt'],
  },
];

const orderQuestion: Extract<Question, { type: 'order' }> = {
  id: 'order',
  type: 'order',
  prompt: { pro: 'Urutkan langkah.' },
  difficulty: 1,
  items: [
    { id: 'first', label: { pro: 'Langkah pertama' } },
    { id: 'last', label: { pro: 'Langkah terakhir' } },
  ],
  answer: ['first', 'last'],
  explainCorrect: { pro: 'Langkah pertama mendahului langkah terakhir.' },
  tags: ['order'],
};

describe('quiz queue & mastery learning', () => {
  it('memasukkan soal salah ke akhir antrean dan baru selesai jika semua benar (§5.2, F3)', () => {
    let session = createQuizSession(sampleQuestions);
    expect(session.queue).toHaveLength(2);

    // Jawab q1 salah -> masuk ulang ke akhir antrean
    session = advanceQuizSession(session, 'q1', false, () => 0.2);
    expect(session.queue).toHaveLength(2);
    expect(session.queue[0].question.id).toBe('q2');
    expect(session.queue[1].question.id).toBe('q1');
    expect(session.queue[1].isRetry).toBe(true);

    // Jawab q2 benar pada percobaan pertama
    session = advanceQuizSession(session, 'q2', true);
    expect(session.firstTryCorrectIds).toEqual(['q2']);
    expect(session.queue).toHaveLength(1);

    // Jawab q1 benar pada percobaan ulang
    session = advanceQuizSession(session, 'q1', true);
    expect(session.queue).toHaveLength(0);
    expect(session.firstTryCorrectIds).toEqual(['q2']);
    expect(session.retryCorrectIds).toEqual(['q1']);
  });

  it('mengevaluasi berbagai tipe soal dengan benar', () => {
    expect(evaluateQuestionAnswer(sampleQuestions[0], 'a')).toBe(true);
    expect(evaluateQuestionAnswer(sampleQuestions[0], 'b')).toBe(false);
    expect(evaluateQuestionAnswer(sampleQuestions[1], false)).toBe(true);
  });

  it('menilai urutan awal yang dikirim tanpa memindahkan item', () => {
    expect(evaluateQuestionAnswer(orderQuestion, undefined)).toBe(true);
    expect(judgeParts(orderQuestion, undefined).verdicts).toEqual({ first: 'right', last: 'right' });
  });

  it('menolak urutan awal yang berbeda dari kunci', () => {
    const question = { ...orderQuestion, items: [...orderQuestion.items].reverse() };
    expect(evaluateQuestionAnswer(question, undefined)).toBe(false);
  });

  it('menilai urutan yang dipilih pemain', () => {
    expect(evaluateQuestionAnswer(orderQuestion, ['last', 'first'])).toBe(false);
    const question = { ...orderQuestion, items: [...orderQuestion.items].reverse() };
    expect(evaluateQuestionAnswer(question, ['first', 'last'])).toBe(true);
  });

  it.each([
    ['tidak lengkap', ['first']],
    ['berisi duplikat', ['first', 'first']],
    ['berisi item asing', ['first', 'unknown']],
  ])('menolak urutan eksplisit yang %s', (_case, answer) => {
    expect(evaluateQuestionAnswer(orderQuestion, answer)).toBe(false);
    expect(judgeParts(orderQuestion, answer).verdicts).toEqual({});
  });
});
