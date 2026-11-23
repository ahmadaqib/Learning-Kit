import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  Bug,
  Check,
  CircleHelp,
  Crosshair,
  Keyboard,
  LayoutGrid,
  Link2,
  ListChecks,
  RotateCcw,
  TextCursorInput,
  ToggleLeft,
  type LucideIcon,
} from 'lucide-react';
import { resolveTxt, type Choice, type Mode, type Question } from '@/content/schema';
import { evaluateQuestionAnswer } from '@/engine/queue';
import {
  buildReadQueue,
  playQueue,
  splitSentenceRanges,
  stopQueue,
  type ReadTarget,
  type ReadingMark,
} from '@/engine/readAloud';
import { useIndonesianVoiceAvailable } from '@/engine/speech';
import { EASE } from '@/motion/tokens';
import { fx } from '@/motion/waapi';
import { Doodle } from '@/components/fx/Doodle';
import { Burst } from '@/components/fx/Burst';
import { Bito } from '@/components/mascot/Bito';
import { ChoiceCard, type ChoiceCardState } from '@/components/ui/ChoiceCard';
import { ContentIcon } from '@/components/ui/ContentIcon';
import type { ContentIconName } from '@/content/icons';

/* ------------------------------------------------------------------------------------------------
 * Judging (spec 5.5)
 * ---------------------------------------------------------------------------------------------- */

export type Verdict = 'right' | 'wrong';

export interface PartsJudgement {
  /** How many parts are right. */
  right: number;
  total: number;
  /** True for sort, order, match and fill: the types where "Hampir!" can apply. */
  partial: boolean;
  /**
   * One verdict per judged part. Keys: the chosen choice id, a sort item id, an order item id, a match left id,
   * a fill slot index, a spotbug line number, a hotspot region id, or `input` for a typed answer.
   * A part the learner did not touch is never marked, so a wrong answer does not reveal the right one.
   */
  verdicts: Record<string, Verdict>;
}

/** Which of the learner's parts are right and wrong. Pure: the same input always gives the same marks. */
export function judgeParts(q: Question, value: unknown): PartsJudgement {
  const verdicts: Record<string, Verdict> = {};
  const v = (ok: boolean): Verdict => (ok ? 'right' : 'wrong');

  switch (q.type) {
    case 'mcq':
    case 'analogy':
    case 'why':
    case 'scenario':
    case 'limit': {
      if (typeof value === 'string' && value) verdicts[value] = v(value === q.answer);
      const ok = value === q.answer;
      return { right: ok ? 1 : 0, total: 1, partial: false, verdicts };
    }
    case 'tf': {
      if (typeof value === 'boolean') verdicts[String(value)] = v(value === q.answer);
      const ok = value === q.answer;
      return { right: ok ? 1 : 0, total: 1, partial: false, verdicts };
    }
    case 'hotspot': {
      if (typeof value === 'string' && value) verdicts[value] = v(value === q.answer);
      const ok = value === q.answer;
      return { right: ok ? 1 : 0, total: 1, partial: false, verdicts };
    }
    case 'sort': {
      const rec = value && typeof value === 'object' ? (value as Record<string, string>) : {};
      let right = 0;
      for (const item of q.items) {
        const ok = rec[item.id] === q.answer[item.id];
        verdicts[item.id] = v(ok);
        if (ok) right += 1;
      }
      return { right, total: q.items.length, partial: true, verdicts };
    }
    case 'order': {
      const current =
        Array.isArray(value) && value.length === q.items.length ? (value as string[]) : q.items.map((i) => i.id);
      let right = 0;
      current.forEach((id, idx) => {
        const ok = q.answer[idx] === id;
        verdicts[id] = v(ok);
        if (ok) right += 1;
      });
      return { right, total: q.items.length, partial: true, verdicts };
    }
    case 'match': {
      const rec = value && typeof value === 'object' ? (value as Record<string, string>) : {};
      let right = 0;
      for (const left of q.left) {
        const ok = rec[left.id] === q.answer[left.id];
        verdicts[left.id] = v(ok);
        if (ok) right += 1;
      }
      return { right, total: q.left.length, partial: true, verdicts };
    }
    case 'fill': {
      const picked = Array.isArray(value) ? (value as string[]) : [];
      let right = 0;
      q.answer.forEach((ans, idx) => {
        const ok = picked[idx] === ans;
        verdicts[String(idx)] = v(ok);
        if (ok) right += 1;
      });
      return { right, total: q.answer.length, partial: true, verdicts };
    }
    case 'spotbug': {
      const chosen = Array.isArray(value) ? [...new Set((value as unknown[]).map(Number))] : [];
      let right = 0;
      for (const n of chosen) {
        const ok = q.answer.includes(n);
        verdicts[String(n)] = v(ok);
        if (ok) right += 1;
      }
      return { right, total: Math.max(q.answer.length, chosen.length), partial: false, verdicts };
    }
    case 'type': {
      const ok = evaluateQuestionAnswer(q, value);
      if (typeof value === 'string' && value.trim()) verdicts.input = v(ok);
      return { right: ok ? 1 : 0, total: 1, partial: false, verdicts };
    }
    default:
      return { right: 0, total: 0, partial: false, verdicts };
  }
}

/** The ratio at which a wrong answer reads "Hampir!" (spec 5.5). */
export const ALMOST_RATIO = 0.7;

/* ------------------------------------------------------------------------------------------------
 * Read-aloud for a screen that shows one question at a time (Boss, Review Box, Assessment)
 * ---------------------------------------------------------------------------------------------- */

/**
 * "Dengar" for a question screen: a button state, the sentence being read (M49) and auto-read. Each new
 * `stepKey` stops the old chain and, with auto-read on, reads the new question. The lesson player has its own
 * version because it also reads cards, hints and feedback.
 */
export function useQuestionReader(opts: {
  mode: Mode;
  autoRead: boolean;
  question: Question | null;
  /** Change it for every new question. */
  stepKey: string | number;
  /** The order of the choices or items on screen, when it can differ from the question's own. */
  shownOrder?: string[];
}) {
  const { mode, autoRead, question, stepKey, shownOrder } = opts;
  const [reading, setReading] = useState<ReadingMark | null>(null);
  const voiceAvailable = useIndonesianVoiceAvailable();
  const canSpeak = (mode === 'junior' || autoRead) && voiceAvailable;

  const speak = (target: ReadTarget) =>
    playQueue(buildReadQueue(target, mode, shownOrder), (s) => setReading(s ? { el: s.el, part: s.part } : null));

  useEffect(() => {
    if (autoRead && canSpeak && question) speak({ kind: 'question', question });
    return () => stopQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepKey, autoRead, canSpeak]);

  return {
    reading,
    speaking: reading !== null,
    canSpeak,
    speak,
    stop: () => stopQueue(),
    toggle: () => {
      if (reading) stopQueue();
      else if (question) speak({ kind: 'question', question });
    },
  };
}

/* ------------------------------------------------------------------------------------------------
 * Small shared pieces
 * ---------------------------------------------------------------------------------------------- */

const at = (index: number, step: number, cap = 200): React.CSSProperties =>
  ({ '--at': `${Math.min(index * step, cap)}ms` }) as React.CSSProperties;

/** A tick or a "belum pas" icon with visually hidden text. Never colour alone (spec 10.2). */
const JudgeMark: React.FC<{ verdict: Verdict; className?: string }> = ({ verdict, className = '' }) =>
  verdict === 'right' ? (
    <span className={`inline-flex flex-shrink-0 items-center text-[var(--ok-600)] ${className}`}>
      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
      <span className="visually-hidden">benar</span>
    </span>
  ) : (
    <span className={`inline-flex flex-shrink-0 items-center text-[var(--warn-700)] ${className}`}>
      <RotateCcw className="h-4 w-4" strokeWidth={2.75} aria-hidden="true" />
      <span className="visually-hidden">belum pas</span>
    </span>
  );

/** Right is solid and green, wrong is dashed and amber (colour-blind safe, survives reduced motion). */
const verdictFrame = (verdict: Verdict | undefined): string => {
  if (verdict === 'right') return 'border-solid border-[var(--ok-500)] bg-[var(--ok-50)]';
  if (verdict === 'wrong') return 'border-dashed border-[var(--warn-500)] bg-[var(--warn-50)]';
  return '';
};

/** The sentence being read gets `.pw-mark` (M49). Without an active part the text is plain. */
export const MarkedText: React.FC<{ text: string; activePart: number | null }> = ({ text, activePart }) => {
  if (activePart === null) return <>{text}</>;
  const ranges = splitSentenceRanges(text);
  if (ranges.length === 0) return <>{text}</>;
  const pieces: React.ReactNode[] = [];
  let cursor = 0;
  ranges.forEach((r, i) => {
    if (r.start > cursor) pieces.push(text.slice(cursor, r.start));
    const slice = text.slice(r.start, r.end);
    pieces.push(
      i === activePart ? (
        <mark key={i} className="pw-mark bg-transparent text-inherit">
          {slice}
        </mark>
      ) : (
        slice
      ),
    );
    cursor = r.end;
  });
  if (cursor < text.length) pieces.push(text.slice(cursor));
  return <>{pieces}</>;
};

const partOf = (reading: ReadingMark | null | undefined, el: string): number | null =>
  reading && reading.el === el ? reading.part : null;

const isReading = (reading: ReadingMark | null | undefined, el: string): boolean => Boolean(reading && reading.el === el);

const READING_RING = 'ring-2 ring-[var(--world-700)] ring-offset-2 ring-offset-[var(--paper)]';

/* ------------------------------------------------------------------------------------------------
 * Type chip, context note and the prompt block (kicker, chip, note, prompt)
 * ---------------------------------------------------------------------------------------------- */

const TYPE_CHIP: Record<Question['type'], { label: string; Icon: LucideIcon }> = {
  mcq: { label: 'Pilih satu', Icon: ListChecks },
  analogy: { label: 'Pilih satu', Icon: ListChecks },
  why: { label: 'Pilih satu', Icon: ListChecks },
  scenario: { label: 'Pilih satu', Icon: ListChecks },
  limit: { label: 'Pilih satu', Icon: ListChecks },
  tf: { label: 'Benar atau salah?', Icon: ToggleLeft },
  sort: { label: 'Kelompokkan', Icon: LayoutGrid },
  order: { label: 'Urutkan', Icon: ArrowDownUp },
  match: { label: 'Pasangkan', Icon: Link2 },
  hotspot: { label: 'Ketuk bagian yang tepat', Icon: Crosshair },
  spotbug: { label: 'Ketuk baris yang salah', Icon: Bug },
  fill: { label: 'Lengkapi', Icon: TextCursorInput },
  type: { label: 'Ketik jawaban', Icon: Keyboard },
};

/** "Pilih satu", "Urutkan" ...: tells the learner what to do, with an icon. */
export const QuestionTypeChip: React.FC<{ type: Question['type'] }> = ({ type }) => {
  const { label, Icon } = TYPE_CHIP[type];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--radius-full)] bg-[var(--surface-well)] px-3 py-1 pw-small font-bold text-[var(--ink-2)]">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </span>
  );
};

/**
 * The note above the prompt: the scenario story (in a well with a small character), the `why` base statement,
 * or the analogy chip of a `limit` question. Other types have none.
 */
export const QuestionContext: React.FC<{ question: Question; mode: Mode; reading?: ReadingMark | null }> = ({
  question,
  mode,
  reading,
}) => {
  if (question.type === 'scenario') {
    return (
      <div className="pw-well flex items-start gap-3">
        {mode === 'junior' && <Bito expression="idle" size={48} react={false} className="flex-shrink-0" />}
        <p className="pw-body m-0">
          <MarkedText text={resolveTxt(question.story, mode)} activePart={partOf(reading, 'context')} />
        </p>
      </div>
    );
  }
  if (question.type === 'why') {
    return (
      <div className="pw-well">
        <p className="pw-body m-0">
          <MarkedText text={question.base} activePart={partOf(reading, 'context')} />
        </p>
      </div>
    );
  }
  if (question.type === 'limit') {
    return (
      <div className="inline-flex items-center gap-2 rounded-[var(--radius-full)] bg-[var(--warn-50)] px-3 py-1.5 pw-small font-bold text-[var(--warn-700)]">
        <CircleHelp className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        <span>
          {mode === 'junior' ? 'Analogi' : 'Batas analogi'}:{' '}
          <MarkedText text={resolveTxt(question.analogy, mode)} activePart={partOf(reading, 'context')} />
        </span>
      </div>
    );
  }
  return null;
};

interface QuestionIntroProps {
  question: Question;
  mode: Mode;
  /** "Soal 2 dari 4", "Cek cepat", "Ingat lagi!" / "Pemanasan", "Coba lagi". Sentence case: Pro capitalises it in CSS. */
  kicker: string;
  /** A requeued question: Junior adds the `curl` doodle (drawn already, never animated). */
  retry?: boolean;
  /** The right end of the kicker row: the "Dengar" button. */
  action?: React.ReactNode;
  /** The sentence being read (M49). */
  reading?: ReadingMark | null;
  /** The heading level of the prompt. Default h2. */
  as?: 'h1' | 'h2' | 'h3';
  /** Text shown above the kicker, for example where the card comes from. */
  eyebrow?: React.ReactNode;
}

/** Kicker row, type chip, context note and prompt (`.pw-prompt`). The answers go below it. */
export const QuestionIntro: React.FC<QuestionIntroProps> = ({
  question,
  mode,
  kicker,
  retry = false,
  action,
  reading,
  as: Tag = 'h2',
  eyebrow,
}) => (
  <div className="space-y-3">
    {eyebrow}
    <div className="flex min-h-[var(--touch-min)] flex-wrap items-center justify-between gap-x-3 gap-y-2">
      <span className="pw-kicker inline-flex min-w-0 items-center gap-1.5 [overflow-wrap:anywhere]">
        <CircleHelp className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
        {kicker}
        {retry && mode === 'junior' && <Doodle name="curl" width={18} />}
      </span>
      {action}
    </div>
    <QuestionTypeChip type={question.type} />
    <QuestionContext question={question} mode={mode} reading={reading} />
    <Tag className="pw-prompt">
      <MarkedText text={resolveTxt(question.prompt, mode)} activePart={partOf(reading, 'prompt')} />
    </Tag>
  </div>
);

/* ------------------------------------------------------------------------------------------------
 * The renderer
 * ---------------------------------------------------------------------------------------------- */

interface QuestionRendererProps {
  question: Question;
  mode: Mode;
  value: unknown;
  onChange: (val: unknown) => void;
  disabled?: boolean;
  isSubmitted?: boolean;
  isCorrect?: boolean;
  /** Sparks after a first-try right answer: 6, or 8 from a combo of five. 0 (default) means none. */
  sparks?: 0 | 6 | 8;
  /**
   * Reports how many parts are right once the answer is checked, for sort, order, match and fill. The page
   * uses it for the "Hampir!" title (at least 70%). Called once per submitted answer.
   */
  onPartsJudged?: (partsRight: number, partsTotal: number) => void;
  /** The sentence being read aloud: the choice or item being read gets a static ring (M49). */
  reading?: ReadingMark | null;
  /**
   * Show the context note (scenario story, why statement, limit chip) above the answers. Default true.
   * Pages that use QuestionIntro pass false.
   */
  withContext?: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  mode,
  value,
  onChange,
  disabled = false,
  isSubmitted = false,
  isCorrect = false,
  sparks = 0,
  onPartsJudged,
  reading = null,
  withContext = true,
}) => {
  const judged = useMemo(
    () => (isSubmitted ? judgeParts(question, value) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isSubmitted, question.id, value],
  );

  // Report the partial-credit ratio in the same commit as the submit, before the browser paints
  const reportedFor = useRef<string | null>(null);
  useLayoutEffect(() => {
    if (!isSubmitted) {
      reportedFor.current = null;
      return;
    }
    if (reportedFor.current === question.id || !judged || !judged.partial) return;
    reportedFor.current = question.id;
    onPartsJudged?.(judged.right, judged.total);
  }, [isSubmitted, judged, question.id, onPartsJudged]);

  const renderChoicesList = (choices: Choice[], selectedId: string | undefined) => {
    const compactLabels = choices.every((c) => resolveTxt(c.label, mode).length <= 24);
    return (
      <div className="pw-choice-container">
        <div className="pw-choices-grid" data-compact-labels={compactLabels ? 'true' : 'false'}>
          {choices.map((choice) => {
            const label = resolveTxt(choice.label, mode);
            const chosen = selectedId === choice.id;
            const verdict: Verdict | null = isSubmitted && chosen ? (isCorrect ? 'right' : 'wrong') : null;

            let cardState: ChoiceCardState = chosen ? 'selected' : 'default';
            if (verdict === 'right') cardState = 'correct';
            else if (verdict === 'wrong') cardState = 'almost';

            return (
              <div key={choice.id} className="relative" data-judge={verdict ?? undefined}>
                <ChoiceCard
                  label={label}
                  state={cardState}
                  icon={choice.icon ? <ContentIcon name={choice.icon as ContentIconName} size={28} /> : undefined}
                  disabled={disabled}
                  // M20: the other choices dim to 60% after a wrong answer
                  dimmed={isSubmitted && !isCorrect && !chosen}
                  reading={isReading(reading, `choice:${choice.id}`)}
                  onClick={() => onChange(question.type === 'tf' ? choice.id === 'true' : choice.id)}
                />
                {verdict === 'right' && sparks !== 0 && (
                  <span aria-hidden="true" className="pointer-events-none absolute left-[26px] top-1/2 h-0 w-0">
                    <Burst count={sparks} at={80} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const context = withContext ? <QuestionContext question={question} mode={mode} reading={reading} /> : null;

  if (
    question.type === 'mcq' ||
    question.type === 'analogy' ||
    question.type === 'why' ||
    question.type === 'scenario' ||
    question.type === 'limit'
  ) {
    return (
      <div className="space-y-4">
        {context}
        {renderChoicesList(question.choices, value as string | undefined)}
      </div>
    );
  }

  if (question.type === 'tf') {
    const tfChoices: Choice[] = [
      { id: 'true', label: { junior: 'Benar', pro: 'Benar' } },
      { id: 'false', label: { junior: 'Salah', pro: 'Salah' } },
    ];
    const selectedId = typeof value === 'boolean' ? String(value) : undefined;
    return renderChoicesList(tfChoices, selectedId);
  }

  if (question.type === 'sort') {
    return (
      <SortInteractive
        question={question}
        mode={mode}
        value={(value as Record<string, string>) ?? {}}
        onChange={onChange}
        disabled={disabled}
        judged={judged}
        isCorrect={isCorrect}
        reading={reading}
      />
    );
  }

  if (question.type === 'order') {
    return (
      <OrderInteractive
        question={question}
        mode={mode}
        value={Array.isArray(value) ? (value as string[]) : question.items.map((i) => i.id)}
        onChange={onChange}
        disabled={disabled}
        judged={judged}
        isCorrect={isCorrect}
        reading={reading}
      />
    );
  }

  if (question.type === 'match') {
    return (
      <MatchInteractive
        question={question}
        mode={mode}
        value={(value as Record<string, string>) ?? {}}
        onChange={onChange}
        disabled={disabled}
        judged={judged}
        isCorrect={isCorrect}
        reading={reading}
      />
    );
  }

  if (question.type === 'hotspot') {
    return (
      <HotspotInteractive
        question={question}
        value={value as string | undefined}
        onChange={onChange}
        disabled={disabled}
        judged={judged}
        reading={reading}
      />
    );
  }

  if (question.type === 'spotbug') {
    const selected = Array.isArray(value) ? (value as number[]) : [];
    const toggleLine = (lineNum: number) => {
      if (disabled) return;
      if (selected.includes(lineNum)) {
        onChange(selected.filter((n) => n !== lineNum));
      } else {
        onChange([...selected, lineNum]);
      }
    };
    return (
      <div className="space-y-2">
        <p className="pw-small m-0 text-[var(--ink-2)]">Ketuk baris yang menurutmu bermasalah.</p>
        <div className="overflow-hidden rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--boss)] p-2 text-[var(--on-boss)]">
          {question.lines.map((line, idx) => {
            const num = idx + 1;
            const active = selected.includes(num);
            const verdict = judged?.verdicts[String(num)];
            return (
              <button
                key={num}
                type="button"
                disabled={disabled}
                aria-pressed={active}
                onClick={() => toggleLine(num)}
                data-judge={verdict}
                style={verdict === 'wrong' ? at(idx, 40) : verdict === 'right' ? at(idx, 50) : undefined}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded-[var(--radius-xs)] border-2 px-3 py-2 text-left pw-code cursor-pointer transition-colors ${
                  verdict
                    ? `${verdictFrame(verdict)} text-[var(--ink)] ${verdict === 'wrong' ? 'pw-fx-almost' : ''}`
                    : active
                      ? 'border-transparent bg-[var(--star)] font-bold text-[var(--on-star)]'
                      : 'border-transparent hover:bg-white/10'
                }`}
              >
                <span className="flex w-8 flex-shrink-0 items-center justify-end gap-1 opacity-90">
                  {verdict && <JudgeMark verdict={verdict} />}
                  <span className="opacity-80">{num}</span>
                </span>
                <span className="flex-1 break-all">{line}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (question.type === 'fill') {
    return (
      <FillInteractive
        question={question}
        value={Array.isArray(value) ? (value as string[]) : []}
        onChange={onChange}
        disabled={disabled}
        judged={judged}
        isCorrect={isCorrect}
      />
    );
  }

  if (question.type === 'type') {
    const verdict = judged?.verdicts.input;
    return (
      <div className="space-y-2">
        <label htmlFor={`type-q-${question.id}`} className="block pw-small font-bold text-[var(--ink-2)]">
          Ketik jawaban singkatmu
        </label>
        <div
          className={`relative ${verdict === 'wrong' ? 'pw-fx-almost' : verdict === 'right' ? 'pw-fx-correct' : ''}`}
          data-judge={verdict}
        >
          <input
            id={`type-q-${question.id}`}
            type="text"
            disabled={disabled}
            value={typeof value === 'string' ? value : ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Tulis di sini..."
            autoComplete="off"
            className={`pw-code w-full rounded-[var(--radius-md)] border-2 px-4 py-3.5 pr-12 text-[var(--ink)] ${
              verdict ? verdictFrame(verdict) : 'border-[var(--line)] bg-[var(--paper)]'
            }`}
          />
          {verdict && (
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <JudgeMark verdict={verdict} />
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

/* --- Sub-komponen interaktif dengan dukungan ketuk-ketuk + seret + keyboard --- */

interface JudgedProps {
  judged: PartsJudgement | null;
  isCorrect: boolean;
  reading: ReadingMark | null | undefined;
}

const SortInteractive: React.FC<
  {
    question: Extract<Question, { type: 'sort' }>;
    mode: Mode;
    value: Record<string, string>;
    onChange: (val: Record<string, string>) => void;
    disabled: boolean;
  } & JudgedProps
> = ({ question, mode, value, onChange, disabled, judged, isCorrect, reading }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [flashBin, setFlashBin] = useState<string | null>(null);
  const unassigned = question.items.filter((it) => !value[it.id]);

  const assignToBin = (itemId: string, binId: string) => {
    if (disabled) return;
    onChange({ ...value, [itemId]: binId });
    setSelectedItemId(null);
    setFlashBin(binId);
  };

  const removeFromBin = (itemId: string) => {
    if (disabled) return;
    const copy = { ...value };
    delete copy[itemId];
    onChange(copy);
  };

  const itemLabel = (id: string) => {
    const it = question.items.find((i) => i.id === id);
    return it ? resolveTxt(it.label, mode) : '';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="pw-small m-0 font-semibold text-[var(--ink-2)]">
          Ketuk atau seret kartu, lalu pilih keranjang tujuannya.
        </p>
        <div className="flex min-h-[56px] flex-wrap gap-2.5 rounded-[var(--radius-md)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-well)] p-3">
          {unassigned.length === 0 ? (
            <span className="pw-small text-[var(--ink-2)]">Semua kartu sudah masuk keranjang.</span>
          ) : (
            unassigned.map((item, i) => {
              const isSelected = selectedItemId === item.id;
              const verdict = judged?.verdicts[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  draggable={!disabled}
                  data-dragging={isSelected || draggingId === item.id ? 'true' : undefined}
                  data-judge={verdict}
                  style={verdict === 'wrong' ? at(i, 40) : undefined}
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', item.id);
                    setDraggingId(item.id);
                  }}
                  onDragEnd={() => setDraggingId(null)}
                  onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                  aria-pressed={isSelected}
                  className={`pw-drag-item inline-flex min-h-[48px] items-center gap-2 rounded-[var(--radius-md)] border-2 px-3.5 py-2 font-bold cursor-pointer ${
                    verdict
                      ? `${verdictFrame(verdict)} text-[var(--ink)] ${verdict === 'wrong' ? 'pw-fx-almost' : ''}`
                      : isSelected
                        ? 'border-[var(--world-600)] bg-[var(--world-50)] text-[var(--world-700)]'
                        : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]'
                  } ${isReading(reading, `item:${item.id}`) ? READING_RING : ''}`}
                >
                  {item.icon && <ContentIcon name={item.icon as ContentIconName} size={20} />}
                  {resolveTxt(item.label, mode)}
                  {verdict && <JudgeMark verdict={verdict} />}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.bins.map((bin, binIdx) => {
          const binItems = question.items.filter((it) => value[it.id] === bin.id);
          const binLabel = resolveTxt(bin.label, mode);
          return (
            <div
              key={bin.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain');
                setDraggingId(null);
                if (draggedId) assignToBin(draggedId, bin.id);
              }}
              onAnimationEnd={(e) => {
                if (e.target === e.currentTarget && flashBin === bin.id) setFlashBin(null);
              }}
              style={isCorrect ? at(binIdx, 60) : undefined}
              className={`rounded-[var(--radius-md)] border-2 p-3 transition-colors ${
                flashBin === bin.id ? 'pw-fx-flash' : ''
              } ${isCorrect ? 'pw-fx-correct' : ''} ${
                selectedItemId
                  ? 'border-dashed border-[var(--world-600)] bg-[var(--world-50)]'
                  : 'border-[var(--line)] bg-[var(--paper)]'
              } ${isReading(reading, `bin:${bin.id}`) ? READING_RING : ''}`}
            >
              <button
                type="button"
                disabled={disabled || !selectedItemId}
                onClick={() => selectedItemId && assignToBin(selectedItemId, bin.id)}
                className={`mb-2 flex min-h-[44px] w-full cursor-pointer text-left font-extrabold text-[var(--ink)] disabled:cursor-default ${
                  bin.icon && mode === 'junior' ? 'flex-col items-start gap-1' : 'items-center justify-between'
                }`}
              >
                {bin.icon && mode === 'junior' && <ContentIcon name={bin.icon as ContentIconName} size={40} />}
                <span className="flex w-full items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2">
                    {bin.icon && mode !== 'junior' && <ContentIcon name={bin.icon as ContentIconName} size={20} />}
                    {binLabel}
                  </span>
                  {selectedItemId && (
                    <span className="rounded-[var(--radius-xs)] bg-[var(--world-600)] px-2 py-0.5 text-xs text-[var(--world-btn-text)]">
                      Taruh sini
                    </span>
                  )}
                </span>
              </button>
              <div className="flex flex-wrap gap-2">
                {binItems.map((it, i) => {
                  const verdict = judged?.verdicts[it.id];
                  return (
                    <button
                      key={it.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => removeFromBin(it.id)}
                      aria-label={`Keluarkan ${itemLabel(it.id)} dari ${binLabel}`}
                      data-judge={verdict}
                      style={verdict === 'wrong' ? at(i, 40) : undefined}
                      className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-[var(--radius-sm)] border-2 px-3 py-1.5 text-sm font-bold text-[var(--ink)] cursor-pointer ${
                        verdict
                          ? `${verdictFrame(verdict)} ${verdict === 'wrong' ? 'pw-fx-almost' : ''}`
                          : 'border-[var(--world-600)] bg-[var(--world-50)]'
                      }`}
                    >
                      {resolveTxt(it.label, mode)}
                      {verdict ? <JudgeMark verdict={verdict} /> : <span aria-hidden="true">✕</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderInteractive: React.FC<
  {
    question: Extract<Question, { type: 'order' }>;
    mode: Mode;
    value: string[];
    onChange: (val: string[]) => void;
    disabled: boolean;
  } & JudgedProps
> = ({ question, mode, value, onChange, disabled, judged, isCorrect, reading }) => {
  const itemMap = useMemo(
    () => Object.fromEntries(question.items.map((it) => [it.id, it])),
    [question.items],
  );

  // Pastikan initial value selalu tersinkronisasi saat pertama kali render
  const currentOrder = value.length === question.items.length ? value : question.items.map((i) => i.id);

  const rowRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [moved, setMoved] = useState<{ id: string; n: number; dir: -1 | 1 } | null>(null);

  const move = (idx: number, delta: -1 | 1) => {
    if (disabled) return;
    const target = idx + delta;
    if (target < 0 || target >= currentOrder.length) return;
    const next = [...currentOrder];
    [next[idx], next[target]] = [next[target], next[idx]];
    setMoved((m) => ({ id: currentOrder[idx], n: (m?.n ?? 0) + 1, dir: delta }));
    onChange(next);
  };

  // Arrow-button reorder (M18): the rows swap in the same frame, with no bump.
  // Focus follows the row so the learner can keep pressing the same arrow.
  useEffect(() => {
    if (!moved) return;
    const row = rowRefs.current.get(moved.id);
    if (!row) return;
    const wanted = row.querySelector<HTMLButtonElement>(`[data-dir="${moved.dir}"]:not(:disabled)`);
    const other = row.querySelector<HTMLButtonElement>('button:not(:disabled)');
    const focused = document.activeElement;
    if (!focused || focused === document.body || !row.contains(focused)) {
      (wanted ?? other)?.focus({ preventScroll: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moved?.n]);

  const lineRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (!isCorrect || !judged || !lineRef.current) return;
    // "A solid green line draws down the left edge" (clip-path is the one non-transform property allowed)
    fx(lineRef.current, [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
      duration: 400,
      easing: EASE.outExpo,
    });
  }, [isCorrect, judged]);

  return (
    <div className="space-y-2.5">
      <p className="pw-small m-0 text-[var(--ink-2)]">Susun dengan tombol panah, dari langkah pertama sampai terakhir.</p>
      <div className="relative space-y-2.5">
        {judged && isCorrect && (
          <span
            ref={lineRef}
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 bottom-0 top-0 w-1 rounded-[var(--radius-full)] bg-[var(--ok-500)]"
          />
        )}
        {currentOrder.map((id, idx) => {
          const item = itemMap[id];
          if (!item) return null;
          const verdict = judged?.verdicts[id];
          return (
            <div
              key={id}
              ref={(el) => {
                if (el) rowRefs.current.set(id, el);
                else rowRefs.current.delete(id);
              }}
              data-judge={verdict}
              style={verdict === 'right' && isCorrect ? at(idx, 50) : verdict === 'wrong' ? at(idx, 40) : undefined}
              className={`flex min-h-[56px] items-center justify-between gap-3 rounded-[var(--radius-md)] border-2 px-3.5 py-2 ${
                verdict
                  ? `${verdictFrame(verdict)} ${
                      verdict === 'wrong' ? 'border-l-[6px] pw-fx-almost' : isCorrect ? 'pw-fx-correct' : ''
                    }`
                  : 'border-[var(--line)] bg-[var(--paper)]'
              } ${isReading(reading, `item:${id}`) ? READING_RING : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--world-50)] text-xs font-extrabold text-[var(--world-700)]">
                  {idx + 1}
                </span>
                {item.icon && <ContentIcon name={item.icon as ContentIconName} size={24} />}
                <span className="pw-body font-semibold">{resolveTxt(item.label, mode)}</span>
                {verdict && <JudgeMark verdict={verdict} />}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  data-dir="-1"
                  disabled={disabled || idx === 0}
                  onClick={() => move(idx, -1)}
                  aria-label={`Naikkan ${resolveTxt(item.label, mode)}`}
                  className="pw-pressable flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-well)] cursor-pointer disabled:opacity-35"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  data-dir="1"
                  disabled={disabled || idx === currentOrder.length - 1}
                  onClick={() => move(idx, 1)}
                  aria-label={`Turunkan ${resolveTxt(item.label, mode)}`}
                  className="pw-pressable flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-well)] cursor-pointer disabled:opacity-35"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MatchInteractive: React.FC<
  {
    question: Extract<Question, { type: 'match' }>;
    mode: Mode;
    value: Record<string, string>;
    onChange: (val: Record<string, string>) => void;
    disabled: boolean;
  } & JudgedProps
> = ({ question, mode, value, onChange, disabled, judged, isCorrect, reading }) => {
  const [activeLeftId, setActiveLeftId] = useState<string | null>(null);

  const pairWithRight = (rightId: string) => {
    if (disabled || !activeLeftId) return;
    onChange({ ...value, [activeLeftId]: rightId });
    setActiveLeftId(null);
  };

  const rightMap = useMemo(
    () => Object.fromEntries(question.right.map((r) => [r.id, r])),
    [question.right],
  );

  return (
    <div className="space-y-3">
      <p className="pw-small m-0 text-[var(--ink-2)]">Ketuk satu di kiri, lalu ketuk pasangannya di kanan.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          {question.left.map((l, idx) => {
            const pairedId = value[l.id];
            const isSelected = activeLeftId === l.id;
            const verdict = judged?.verdicts[l.id];
            return (
              <button
                key={l.id}
                type="button"
                disabled={disabled}
                data-judge={verdict}
                style={verdict === 'wrong' ? at(idx, 40) : isCorrect ? at(idx, 50) : undefined}
                onClick={() => setActiveLeftId(isSelected ? null : l.id)}
                className={`flex min-h-[56px] w-full flex-col items-start justify-center rounded-[var(--radius-md)] border-2 px-3.5 py-2 text-left cursor-pointer transition-colors ${
                  verdict
                    ? `${verdictFrame(verdict)} ${verdict === 'wrong' ? 'pw-fx-almost' : isCorrect ? 'pw-fx-correct' : ''}`
                    : isSelected
                      ? 'border-[var(--world-600)] bg-[var(--world-50)]'
                      : pairedId
                        ? 'border-[var(--world-600)] bg-[var(--paper)]'
                        : 'border-[var(--line)] bg-[var(--paper)]'
                } ${isReading(reading, `left:${l.id}`) ? READING_RING : ''}`}
              >
                <span className="inline-flex items-center gap-2 font-bold">
                  {l.icon && <ContentIcon name={l.icon as ContentIconName} size={20} />}
                  {resolveTxt(l.label, mode)}
                  {verdict && <JudgeMark verdict={verdict} />}
                </span>
                {pairedId && rightMap[pairedId] && (
                  <span className="text-xs font-semibold text-[var(--ink-2)]">
                    <span aria-hidden="true">→ </span>
                    <span className="visually-hidden">dipasangkan dengan </span>
                    {resolveTxt(rightMap[pairedId].label, mode)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {question.right.map((r) => {
            const isUsed = Object.values(value).includes(r.id);
            return (
              <button
                key={r.id}
                type="button"
                disabled={disabled || !activeLeftId}
                onClick={() => pairWithRight(r.id)}
                className={`flex min-h-[56px] w-full items-center justify-between gap-2 rounded-[var(--radius-md)] border-2 px-3.5 py-2 text-left transition-colors ${
                  activeLeftId
                    ? 'cursor-pointer border-dashed border-[var(--world-600)] bg-[var(--world-50)]'
                    : isUsed
                      ? 'border-[var(--line)] bg-[var(--surface-well)] opacity-85'
                      : 'border-[var(--line)] bg-[var(--paper)] opacity-80'
                } ${isReading(reading, `right:${r.id}`) ? READING_RING : ''}`}
              >
                <span className="inline-flex items-center gap-2 font-semibold">
                  {r.icon && <ContentIcon name={r.icon as ContentIconName} size={20} />}
                  {resolveTxt(r.label, mode)}
                </span>
                {isUsed && <Check className="h-4 w-4 flex-shrink-0 text-[var(--ink-2)]" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const HotspotInteractive: React.FC<{
  question: Extract<Question, { type: 'hotspot' }>;
  value: string | undefined;
  onChange: (val: string) => void;
  disabled: boolean;
  judged: PartsJudgement | null;
  reading: ReadingMark | null | undefined;
}> = ({ question, value, onChange, disabled, judged, reading }) => {
  return (
    <div className="space-y-3">
      <div className="rounded-[var(--radius-lg)] border-2 border-[var(--line)] bg-[var(--surface-well)] p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ink-2)]">Ketuk area diagram yang tepat</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {question.regions.map((reg) => {
            const selected = value === reg.id;
            const verdict = judged?.verdicts[reg.id];
            return (
              <button
                key={reg.id}
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                data-judge={verdict}
                onClick={() => onChange(reg.id)}
                style={
                  verdict
                    ? ({ '--ring-color': verdict === 'right' ? 'var(--ok-500)' : 'var(--warn-500)' } as React.CSSProperties)
                    : undefined
                }
                className={`flex min-h-[60px] items-center justify-center gap-2 rounded-[var(--radius-md)] border-2 px-4 py-3 font-extrabold cursor-pointer transition-colors ${
                  verdict
                    ? `pw-fx-ring text-[var(--ink)] ${verdictFrame(verdict)} ${verdict === 'wrong' ? 'pw-fx-almost' : ''}`
                    : selected
                      ? 'border-[var(--world-600)] bg-[var(--world-600)] text-[var(--world-btn-text)]'
                      : 'border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--world-50)]'
                } ${isReading(reading, `region:${reg.id}`) ? READING_RING : ''}`}
              >
                {reg.label}
                {verdict && (
                  <span className={verdict === 'right' ? 'pw-fx-stamp' : undefined} style={{ '--stamp-from': 1.4 } as React.CSSProperties}>
                    <JudgeMark verdict={verdict} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FillInteractive: React.FC<
  {
    question: Extract<Question, { type: 'fill' }>;
    value: string[];
    onChange: (val: string[]) => void;
    disabled: boolean;
  } & Pick<JudgedProps, 'judged' | 'isCorrect'>
> = ({ question, value, onChange, disabled, judged, isCorrect }) => {
  const parts = question.template.split('___');
  const slotCount = Math.max(1, parts.length - 1);

  const pickToken = (tok: string) => {
    if (disabled || value.length >= slotCount) return;
    onChange([...value, tok]);
  };

  const clearSlot = (idx: number) => {
    if (disabled) return;
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="pw-code rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--boss)] p-4 leading-loose text-[var(--on-boss)]">
        {parts.map((part, idx) => {
          const verdict = judged?.verdicts[String(idx)];
          return (
            <React.Fragment key={idx}>
              <span>{part}</span>
              {idx < slotCount && (
                <button
                  type="button"
                  disabled={disabled || !value[idx]}
                  onClick={() => clearSlot(idx)}
                  data-judge={verdict}
                  style={verdict ? (isCorrect ? at(idx, 50) : at(idx, 40)) : undefined}
                  className={`mx-1 inline-flex min-h-[36px] min-w-[72px] items-center justify-center gap-1.5 rounded-[var(--radius-xs)] border-2 px-2.5 py-0.5 font-bold cursor-pointer ${
                    verdict
                      ? `${verdictFrame(verdict)} text-[var(--ink)] ${verdict === 'wrong' ? 'pw-fx-almost' : isCorrect ? 'pw-fx-correct' : ''}`
                      : 'border-dashed border-[var(--star)] bg-white/10 text-[var(--star)]'
                  }`}
                >
                  {value[idx] ?? '___'}
                  {verdict && <JudgeMark verdict={verdict} />}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {question.bank.map((tok, idx) => {
          const used = value.includes(tok);
          return (
            <button
              key={`${tok}-${idx}`}
              type="button"
              disabled={disabled || used || value.length >= slotCount}
              onClick={() => pickToken(tok)}
              className="pw-code min-h-[48px] rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--paper)] px-4 py-2 font-bold text-[var(--ink)] transition-colors hover:border-[var(--world-600)] disabled:opacity-40 cursor-pointer"
            >
              {tok}
            </button>
          );
        })}
      </div>
    </div>
  );
};
