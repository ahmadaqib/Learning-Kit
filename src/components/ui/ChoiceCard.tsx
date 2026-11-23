import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Doodle } from '@/components/fx/Doodle';
import { useMotionPrefs } from '@/motion/prefs';

export type ChoiceCardState = 'default' | 'selected' | 'correct' | 'incorrect' | 'almost' | 'disabled';

interface ChoiceCardProps {
  label: string;
  state?: ChoiceCardState;
  /** A content icon (28 px) shown to the left of the label. Resolve the name with ContentIcon first. */
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  prefixLabel?: string;
  /** Read-aloud is speaking this card: a static ring, no motion (M49). */
  reading?: boolean;
  /** Another card was judged: this one dims to 60% with a 140 ms opacity transition (M20). */
  dimmed?: boolean;
  /** Visually hidden text for a judged card. Defaults to "benar" and "belum pas". */
  statusText?: string;
}

/**
 * Edge pressable (M01): `.pw-edge` swaps face and edge in the same frame on :active. Selection is a
 * transition only (M17): border and background 140 ms, check dot opacity and scale 120 ms.
 * Judged cards never rely on colour or motion (spec 5.5): a solid outline and a tick for a right part,
 * a dashed amber outline and the "belum pas" icon for a part that is not there yet, each with hidden text.
 */
const STATE_CLASS: Record<ChoiceCardState, string> = {
  default:
    'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] [--edge-color:var(--line)] hover:border-[var(--world-600)]',
  selected:
    'border-[var(--world-600)] bg-[var(--world-50)] text-[var(--ink)] [--edge-color:var(--world-700)]',
  correct:
    'pw-fx-correct pw-fx-ring border-[var(--ok-500)] bg-[var(--ok-50)] text-[var(--ink)] [--edge-color:var(--ok-600)] [--ring-color:var(--ok-500)]',
  incorrect:
    'pw-fx-almost border-dashed border-[var(--warn-500)] bg-[var(--warn-50)] text-[var(--ink)] [--edge-color:var(--warn-700)]',
  almost:
    'pw-fx-almost border-dashed border-[var(--warn-500)] bg-[var(--warn-50)] text-[var(--ink)] [--edge-color:var(--warn-700)]',
  disabled: 'border-[var(--line)] bg-[var(--cream)] text-[var(--ink-3)] cursor-not-allowed shadow-none',
};

/* .pw-t-colors / .pw-t-opacity carry the 140 ms timing and the 120 ms reduced-motion floor; the inline
   property list adds opacity (the dim) and scale (the check dot) on top of them. */
const CARD_TRANSITION: React.CSSProperties = { transitionProperty: 'background-color, border-color, color, opacity' };
const DOT_TRANSITION: React.CSSProperties = { transitionProperty: 'opacity, scale' };

export const ChoiceCard: React.FC<ChoiceCardProps> = ({
  label,
  state = 'default',
  icon,
  onClick,
  disabled = false,
  prefixLabel,
  reading = false,
  dimmed = false,
  statusText,
}) => {
  const { mode } = useMotionPrefs();
  const judgedRight = state === 'correct';
  const judgedWrong = state === 'incorrect' || state === 'almost';
  const checked = state === 'selected' || judgedRight;

  const indicator = judgedWrong ? (
    <RotateCcw className="h-5 w-5 text-[var(--warn-700)]" aria-hidden="true" />
  ) : (
    <span
      aria-hidden="true"
      className={`relative inline-flex h-5 w-5 items-center justify-center rounded-full border-2 pw-t-colors ${
        judgedRight
          ? 'border-[var(--ok-600)] bg-[var(--ok-50)]'
          : state === 'selected'
            ? 'border-[var(--world-700)] bg-[var(--world-100)]'
            : 'border-[var(--line-strong)] bg-transparent'
      }`}
    >
      {/* Check dot: opacity and scale(.9 to 1), 120 ms. The correct tick draws itself instead (M19). */}
      {judgedRight ? (
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[var(--ok-600)]" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M5 12.5 L10 17.5 L19 7"
            pathLength={1}
            className="pw-draw"
            style={{ '--at': '60ms', '--fx-dur': '200ms' } as React.CSSProperties}
          />
        </svg>
      ) : (
        <span
          className={`pw-t-opacity block h-2.5 w-2.5 rounded-full bg-[var(--world-700)] ${
            checked ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          style={DOT_TRANSITION}
        />
      )}
    </span>
  );

  const hidden = statusText ?? (judgedRight ? 'benar' : judgedWrong ? 'belum pas' : null);

  return (
    <button
      type="button"
      disabled={disabled || state === 'disabled'}
      aria-pressed={checked || judgedWrong}
      data-state={state}
      data-speaking={reading ? 'true' : undefined}
      onClick={onClick}
      style={CARD_TRANSITION}
      className={[
        'pw-edge pw-t-colors relative flex min-h-[56px] w-full items-center gap-3 rounded-[var(--radius-md)] border-2 px-4 py-3 text-left cursor-pointer',
        STATE_CLASS[state],
        dimmed ? 'opacity-60' : '',
        reading
          ? "before:pointer-events-none before:absolute before:-inset-[5px] before:rounded-[calc(var(--radius-md)+4px)] before:border-[3px] before:border-[var(--world-600)] before:content-['']"
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="flex-shrink-0" aria-hidden="true">
        {indicator}
      </span>
      {icon && (
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-[var(--world-700)] [&>svg]:h-7 [&>svg]:w-7" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="pw-body min-w-0 flex-1 leading-snug [overflow-wrap:anywhere]">
        {prefixLabel && (
          <span className="mr-2 inline-block rounded-[var(--radius-xs)] bg-[var(--paper-2)] px-2 py-0.5 text-xs font-extrabold text-[var(--ink-2)]">
            {prefixLabel}
          </span>
        )}
        {label}
        {hidden && <span className="visually-hidden"> ({hidden})</span>}
      </span>
      {judgedWrong && mode === 'junior' && (
        <Doodle name="curl" width={26} style={{ color: 'var(--warn-700)' }} />
      )}
    </button>
  );
};
