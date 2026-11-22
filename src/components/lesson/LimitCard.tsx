import React from 'react';
import { Check, Scale, X } from 'lucide-react';
import { resolveTxt, type Mode, type Step } from '@/content/schema';

interface LimitCardProps {
  step: Extract<Step, { kind: 'limit' }>;
  mode: Mode;
}

export const LimitCard: React.FC<LimitCardProps> = ({ step, mode }) => {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-[var(--warn-50)] px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[var(--warn-700)]">
        <Scale className="h-4 w-4" aria-hidden="true" />
        <span>Batas Analogi</span>
      </div>

      <h2 className="pw-h2">{resolveTxt(step.analogy, mode)}</h2>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border-2 border-[var(--ok-500)] bg-[var(--ok-50)] p-4">
          <div className="mb-2 flex items-center gap-2 font-extrabold text-[var(--ok-600)]">
            <Check className="h-5 w-5" aria-hidden="true" />
            <span>MIRIP</span>
          </div>
          <ul className="space-y-2 pl-4 list-disc pw-body text-[var(--ink)]">
            {step.same.map((item, idx) => (
              <li key={idx}>{resolveTxt(item, mode)}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-[var(--radius-md)] border-2 border-[var(--warn-500)] bg-[var(--warn-50)] p-4">
          <div className="mb-2 flex items-center gap-2 font-extrabold text-[var(--warn-700)]">
            <X className="h-5 w-5" aria-hidden="true" />
            <span>BEDANYA</span>
          </div>
          <ul className="space-y-2 pl-4 list-disc pw-body text-[var(--ink)]">
            {step.different.map((item, idx) => (
              <li key={idx}>{resolveTxt(item, mode)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
