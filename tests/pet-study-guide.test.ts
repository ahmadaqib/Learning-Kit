import { createHash } from 'node:crypto';
import { statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { ALL_LESSONS, LESSONS_BY_ID } from '../src/content/curriculum';
import { getPetStudyExercise, getPetStudyGuide } from '../src/content/petStudyGuide';
import { petVoiceFiles } from '../src/content/petVoiceClips';

describe('local companion study guide', () => {
  it('gives every lesson its own exercise across the existing curriculum', () => {
    const exercises = ALL_LESSONS.map((lesson) => {
      const card = lesson.steps.find((step) => step.kind !== 'question');
      if (!card) throw new Error(`No study card in ${lesson.id}`);
      return getPetStudyGuide({ lesson, card, mode: lesson.modes[0] });
    });

    expect(new Set(exercises).size).toBe(ALL_LESSONS.length);
  });

  it('keeps exercises readable across lesson cards in both modes', () => {
    for (const lesson of ALL_LESSONS) {
      const spokenExercise = getPetStudyExercise(lesson);
      for (const mode of lesson.modes) {
        for (const card of lesson.steps) {
          if (card.kind === 'question') continue;
          if (card.kind === 'concept' && card.modes && !card.modes.includes(mode)) continue;
          const exercise = getPetStudyGuide({ lesson, card, mode });
          expect(exercise, `${lesson.id} ${card.kind} ${mode}`).toContain(spokenExercise);
          expect(exercise.length, `${lesson.id} ${card.kind} ${mode}`).toBeGreaterThan(40);
          expect(exercise.length, `${lesson.id} ${card.kind} ${mode}`).toBeLessThanOrEqual(270);
        }
      }
    }
  });

  it('ships one studio recording for the exact base exercise of every lesson', () => {
    const files = ALL_LESSONS.map((lesson) => {
      const exercise = getPetStudyExercise(lesson);
      const digest = createHash('sha256').update(exercise).digest('hex').slice(0, 12);
      const file = `/audio/pet/${digest}.mp3`;

      expect(petVoiceFiles(exercise), lesson.id).toEqual([file]);
      expect(statSync(`public${file}`).size, lesson.id).toBeGreaterThan(1_000);
      return file;
    });

    expect(new Set(files).size).toBe(ALL_LESSONS.length);
  });

  it('grounds an exercise in the active concept title the learner can see', () => {
    const lesson = LESSONS_BY_ID['a01-l04'];
    const concept = lesson.steps.find((step) => step.kind === 'concept');
    if (!concept) throw new Error('Missing concept card');
    const card = { ...concept, title: { junior: 'Buku alamat', pro: 'Resolusi DNS' } };

    expect(getPetStudyGuide({ lesson, card, mode: 'junior' })).toContain('Buku alamat');
    expect(getPetStudyGuide({ lesson, card, mode: 'junior' })).not.toContain('Resolusi DNS');
    expect(getPetStudyGuide({ lesson, card, mode: 'pro' })).toContain('Resolusi DNS');
  });

  it('adds an observation for the active simulator', () => {
    const lesson = LESSONS_BY_ID['a05-l01'];
    const card = lesson.steps.find((step) => step.kind === 'sim');
    if (!card) throw new Error('Missing simulator card');

    expect(getPetStudyGuide({ lesson, card, mode: 'junior' })).toMatch(/geser|penggeser/i);
  });

  it('changes the activity after revealing an analogy without copying either side', () => {
    const lesson = LESSONS_BY_ID['a02-l01'];
    const limit = lesson.steps.find((step) => step.kind === 'limit');
    if (!limit) throw new Error('Missing analogy card');
    const card = {
      ...limit,
      same: [{ pro: 'CONCEALED_SIMILARITY' }],
      different: [{ pro: 'CONCEALED_DIFFERENCE' }],
    };

    const before = getPetStudyGuide({ lesson, card, mode: 'junior' });
    const after = getPetStudyGuide({ lesson, card, mode: 'junior', limitRevealed: true });

    expect(before).toMatch(/sebelum membuka/i);
    expect(after).toMatch(/cocokkan/i);
    expect(before + after).not.toMatch(/CONCEALED/);
  });
});
