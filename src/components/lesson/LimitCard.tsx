import React from 'react';
import { ArrowLeftRight, Check, Scale } from 'lucide-react';
import { resolveTxt, type Mode, type Step } from '@/content/schema';
import type { ReadingMark } from '@/engine/readAloud';
import { MarkedText } from '@/components/questions/QuestionRenderer';

interface LimitCardProps {
  step: Extract<Step, { kind: 'limit' }>;
  mode: Mode;
  /**
   * False: only the "Mirip" column shows. True: "Bedanya" appears beside it (M26). The page flips it when the
   * learner presses "Apa bedanya? →", and the primary button then reads "Paham →".
   */
  revealed: boolean;
  /** The sentence being read aloud (M49). */
  reading?: ReadingMark | null;
}

const READING_RING = 'ring-2 ring-[var(--world-700)] ring-offset-2 ring-offset-[var(--paper)]';

export const LimitCard: React.FC<LimitCardProps> = ({ step, mode, revealed, reading }) => {
  const readingEl = (el: string) => (reading && reading.el === el ? reading.part : null);
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-[var(--radius-full)] bg-[var(--warn-50)] px-3 py-1 pw-kicker text-[var(--warn-700)]">
        <Scale className="h-4 w-4" aria-hidden="true" />
        <span>{mode === 'junior' ? 'Mirip, tetapi berbeda' : 'Batas analogi'}</span>
      </div>

      <h2 className="pw-h2">{resolveTxt(step.analogy, mode)}</h2>

      <div className={`grid gap-3 ${revealed ? 'sm:grid-cols-2' : ''}`}>
        <div
          className={`rounded-[var(--radius-md)] border-2 border-solid border-[var(--ok-500)] bg-[var(--ok-50)] p-4 ${
            reading && /^same/.test(reading.el) ? READING_RING : ''
          }`}
        >
          <div className="mb-2 flex items-center gap-2 font-extrabold text-[var(--ok-600)]">
            <Check className="h-5 w-5" aria-hidden="true" />
            <span>Mirip</span>
          </div>
          <ul className="list-disc space-y-2 pl-4 pw-body text-[var(--ink)]">
            {step.same.map((item, idx) => (
              <li key={idx}>
                <MarkedText text={resolveTxt(item, mode)} activePart={readingEl(`same:${idx}`)} />
              </li>
            ))}
          </ul>
        </div>

        {revealed && (
          <div
            className={`pw-fx-reveal rounded-[var(--radius-md)] border-2 border-dashed border-[var(--warn-500)] bg-[var(--warn-50)] p-4 ${
              reading && /^different/.test(reading.el) ? READING_RING : ''
            }`}
          >
            <div className="mb-2 flex items-center gap-2 font-extrabold text-[var(--warn-700)]">
              <ArrowLeftRight className="h-5 w-5" aria-hidden="true" />
              <span>Bedanya</span>
            </div>
            <ul className="list-disc space-y-2 pl-4 pw-body text-[var(--ink)]">
              {step.different.map((item, idx) => (
                <li key={idx}>
                  <MarkedText text={resolveTxt(item, mode)} activePart={readingEl(`different:${idx}`)} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
