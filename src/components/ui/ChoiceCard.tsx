import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export type ChoiceCardState = 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled';

interface ChoiceCardProps {
  label: string;
  state?: ChoiceCardState;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  prefixLabel?: string;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  label,
  state = 'default',
  icon,
  onClick,
  disabled = false,
  prefixLabel,
}) => {
  const styleMap: Record<ChoiceCardState, string> = {
    default:
      'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] shadow-[0_3px_0_var(--line)] hover:border-[var(--world-600)]',
    selected:
      'pw-squish-pop border-[3px] border-[var(--world-600)] bg-[var(--world-50)] text-[var(--ink)] font-semibold shadow-[0_4px_0_var(--world-700)]',
    correct:
      'pw-squish-pop border-[3px] border-[var(--ok-500)] bg-[var(--ok-50)] text-[var(--ink)] font-semibold shadow-[0_4px_0_var(--ok-600)]',
    incorrect:
      'border-[3px] border-[var(--warn-500)] bg-[var(--warn-50)] text-[var(--ink)] pw-anim-shake',
    disabled: 'border-[var(--line)] bg-[var(--cream)] text-[var(--ink-3)] opacity-75 cursor-not-allowed',
  };

  return (
    <button
      type="button"
      disabled={disabled || state === 'disabled'}
      aria-pressed={state === 'selected'}
      onClick={onClick}
      className={`pw-pressable flex min-h-[56px] w-full items-center gap-3 rounded-[var(--radius-md)] border-2 px-4 py-3 text-left cursor-pointer ${styleMap[state]}`}
    >
      <span className="flex-shrink-0 text-[var(--world-700)]" aria-hidden="true">
        {icon ??
          (state === 'correct' ? (
            <CheckCircle2 className="h-5 w-5 text-[var(--ok-600)]" />
          ) : state === 'selected' ? (
            <CheckCircle2 className="h-5 w-5 text-[var(--world-700)]" />
          ) : (
            <Circle className="h-5 w-5 text-[var(--ink-3)]" />
          ))}
      </span>
      <span className="flex-1 pw-body leading-snug">
        {prefixLabel && (
          <span className="mr-2 inline-block rounded bg-[var(--cream)] px-2 py-0.5 text-xs font-extrabold text-[var(--ink-2)]">
            {prefixLabel}
          </span>
        )}
        {label}
      </span>
    </button>
  );
};
