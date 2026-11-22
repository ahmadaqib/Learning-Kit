import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp, Check, HelpCircle } from 'lucide-react';
import { resolveTxt, type Choice, type Mode, type Question } from '@/content/schema';
import { ChoiceCard } from '@/components/ui/ChoiceCard';

interface QuestionRendererProps {
  question: Question;
  mode: Mode;
  value: unknown;
  onChange: (val: unknown) => void;
  disabled?: boolean;
  isSubmitted?: boolean;
  isCorrect?: boolean;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  mode,
  value,
  onChange,
  disabled = false,
  isSubmitted = false,
  isCorrect = false,
}) => {
  // Helper 1-or-2 column grid sesuai aturan §10.10: 2 kolom jika label <= 24 karakter
  const renderChoicesList = (choices: Choice[], selectedId: string | undefined, correctId: string) => {
    const compactLabels = choices.every((c) => resolveTxt(c.label, mode).length <= 24);
    return (
      <div className="pw-choice-container">
        <div
          className="pw-choices-grid"
          data-compact-labels={compactLabels ? 'true' : 'false'}
        >
          {choices.map((choice) => {
            const label = resolveTxt(choice.label, mode);
            let cardState: 'default' | 'selected' | 'correct' | 'incorrect' | 'disabled' =
              selectedId === choice.id ? 'selected' : 'default';

            if (isSubmitted) {
              if (choice.id === correctId && isCorrect) {
                cardState = 'correct';
              } else if (selectedId === choice.id && !isCorrect) {
                cardState = 'incorrect';
              }
            }

            return (
              <ChoiceCard
                key={choice.id}
                label={label}
                state={cardState}
                disabled={disabled}
                onClick={() => onChange(choice.id)}
              />
            );
          })}
        </div>
      </div>
    );
  };

  if (
    question.type === 'mcq' ||
    question.type === 'analogy' ||
    question.type === 'why' ||
    question.type === 'scenario' ||
    question.type === 'limit'
  ) {
    return (
      <div className="space-y-4">
        {question.type === 'scenario' && (
          <div className="rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-3.5 pw-body">
            {resolveTxt(question.story, mode)}
          </div>
        )}
        {question.type === 'limit' && (
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--warn-50)] px-3 py-1 text-xs font-extrabold text-[var(--warn-700)]">
            <HelpCircle className="h-4 w-4" aria-hidden="true" />
            <span>Batas Analogi: {resolveTxt(question.analogy, mode)}</span>
          </div>
        )}
        {renderChoicesList(question.choices, value as string | undefined, question.answer)}
      </div>
    );
  }

  if (question.type === 'tf') {
    const tfChoices: Choice[] = [
      { id: 'true', label: { junior: 'Benar', pro: 'Benar' } },
      { id: 'false', label: { junior: 'Salah', pro: 'Salah' } },
    ];
    const selectedId = typeof value === 'boolean' ? String(value) : undefined;
    return renderChoicesList(tfChoices, selectedId, String(question.answer));
  }

  if (question.type === 'sort') {
    return (
      <SortInteractive
        question={question}
        mode={mode}
        value={(value as Record<string, string>) ?? {}}
        onChange={onChange}
        disabled={disabled}
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
        <p className="pw-small text-[var(--ink-2)]">Ketuk baris yang menurutmu bermasalah:</p>
        <div className="overflow-hidden rounded-[var(--radius-md)] border-2 border-[#2e3258] bg-[#1f2340] p-2">
          {question.lines.map((line, idx) => {
            const num = idx + 1;
            const active = selected.includes(num);
            return (
              <button
                key={num}
                type="button"
                disabled={disabled}
                aria-pressed={active}
                onClick={() => toggleLine(num)}
                className={`flex min-h-[48px] w-full items-center gap-3 rounded px-3 py-2 text-left pw-code transition-colors cursor-pointer ${
                  active
                    ? 'bg-[var(--warn-500)] text-[#1f2340] font-bold'
                    : 'text-[#e8eaf6] hover:bg-white/10'
                }`}
              >
                <span className="w-6 text-right opacity-70">{num}</span>
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
      />
    );
  }

  if (question.type === 'type') {
    return (
      <div className="space-y-2">
        <label htmlFor={`type-q-${question.id}`} className="block pw-small font-bold text-[var(--ink-2)]">
          Ketik jawaban singkatmu:
        </label>
        <input
          id={`type-q-${question.id}`}
          type="text"
          disabled={disabled}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tulis di sini..."
          autoComplete="off"
          className="pw-code w-full rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--paper)] px-4 py-3.5 text-[var(--ink)]"
        />
      </div>
    );
  }

  return null;
};

/* --- Sub-komponen interaktif dengan dukungan ketuk-ketuk + seret + keyboard --- */

const SortInteractive: React.FC<{
  question: Extract<Question, { type: 'sort' }>;
  mode: Mode;
  value: Record<string, string>;
  onChange: (val: Record<string, string>) => void;
  disabled: boolean;
}> = ({ question, mode, value, onChange, disabled }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const unassigned = question.items.filter((it) => !value[it.id]);

  const assignToBin = (itemId: string, binId: string) => {
    if (disabled) return;
    onChange({ ...value, [itemId]: binId });
    setSelectedItemId(null);
  };

  const removeFromBin = (itemId: string) => {
    if (disabled) return;
    const copy = { ...value };
    delete copy[itemId];
    onChange(copy);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="pw-small font-semibold text-[var(--ink-2)]">
          1. Ketuk (atau seret) kartu di bawah, lalu ketuk keranjang tujuannya:
        </p>
        <div className="flex flex-wrap gap-2.5 min-h-[56px] rounded-[var(--radius-md)] border border-dashed border-[var(--line)] bg-[var(--cream)] p-3">
          {unassigned.length === 0 ? (
            <span className="pw-small text-[var(--ink-2)]">Semua kartu sudah masuk keranjang.</span>
          ) : (
            unassigned.map((item) => {
              const isSelected = selectedItemId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={disabled}
                  draggable={!disabled}
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', item.id)}
                  onClick={() => setSelectedItemId(isSelected ? null : item.id)}
                  aria-pressed={isSelected}
                  className={`pw-drag-item min-h-[48px] rounded-[var(--radius-md)] border-2 px-3.5 py-2 font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'scale-[1.03] border-[var(--world-600)] bg-[var(--world-50)] text-[var(--world-700)] shadow-md'
                      : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]'
                  }`}
                >
                  {resolveTxt(item.label, mode)}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {question.bins.map((bin) => {
          const binItems = question.items.filter((it) => value[it.id] === bin.id);
          return (
            <div
              key={bin.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain');
                if (draggedId) assignToBin(draggedId, bin.id);
              }}
              className={`rounded-[var(--radius-md)] border-2 p-3 transition-colors ${
                selectedItemId
                  ? 'border-dashed border-[var(--world-600)] bg-[var(--world-50)]'
                  : 'border-[var(--line)] bg-[var(--paper)]'
              }`}
            >
              <button
                type="button"
                disabled={disabled || !selectedItemId}
                onClick={() => selectedItemId && assignToBin(selectedItemId, bin.id)}
                className="mb-2 flex min-h-[44px] w-full items-center justify-between text-left font-extrabold text-[var(--ink)] cursor-pointer disabled:cursor-default"
              >
                <span>{resolveTxt(bin.label, mode)}</span>
                {selectedItemId && (
                  <span className="rounded bg-[var(--world-600)] px-2 py-0.5 text-xs text-[var(--world-btn-text)]">
                    Taruh sini
                  </span>
                )}
              </button>
              <div className="flex flex-wrap gap-2">
                {binItems.map((it) => (
                  <button
                    key={it.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => removeFromBin(it.id)}
                    aria-label={`Keluarkan ${resolveTxt(it.label, mode)} dari ${resolveTxt(bin.label, mode)}`}
                    className="min-h-[40px] rounded-lg border border-[var(--world-600)] bg-[var(--world-50)] px-3 py-1.5 text-sm font-bold text-[var(--ink)] cursor-pointer"
                  >
                    {resolveTxt(it.label, mode)} ✕
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderInteractive: React.FC<{
  question: Extract<Question, { type: 'order' }>;
  mode: Mode;
  value: string[];
  onChange: (val: string[]) => void;
  disabled: boolean;
}> = ({ question, mode, value, onChange, disabled }) => {
  const itemMap = useMemo(
    () => Object.fromEntries(question.items.map((it) => [it.id, it])),
    [question.items],
  );

  // Pastikan initial value selalu tersinkronisasi saat pertama kali render
  const currentOrder =
    value.length === question.items.length ? value : question.items.map((i) => i.id);

  const move = (idx: number, delta: -1 | 1) => {
    if (disabled) return;
    const target = idx + delta;
    if (target < 0 || target >= currentOrder.length) return;
    const next = [...currentOrder];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="space-y-2.5">
      <p className="pw-small text-[var(--ink-2)]">
        Susun dari langkah pertama sampai terakhir memakai tombol panah:
      </p>
      {currentOrder.map((id, idx) => {
        const item = itemMap[id];
        if (!item) return null;
        return (
          <div
            key={id}
            className="flex min-h-[56px] items-center justify-between gap-3 rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--paper)] px-3.5 py-2"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[var(--world-50)] text-xs font-extrabold text-[var(--world-700)]">
                {idx + 1}
              </span>
              <span className="pw-body font-semibold">{resolveTxt(item.label, mode)}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={disabled || idx === 0}
                onClick={() => move(idx, -1)}
                aria-label={`Naikkan ${resolveTxt(item.label, mode)}`}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--cream)] disabled:opacity-35 cursor-pointer"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                disabled={disabled || idx === currentOrder.length - 1}
                onClick={() => move(idx, 1)}
                aria-label={`Turunkan ${resolveTxt(item.label, mode)}`}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--cream)] disabled:opacity-35 cursor-pointer"
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const MatchInteractive: React.FC<{
  question: Extract<Question, { type: 'match' }>;
  mode: Mode;
  value: Record<string, string>;
  onChange: (val: Record<string, string>) => void;
  disabled: boolean;
}> = ({ question, mode, value, onChange, disabled }) => {
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
      <p className="pw-small text-[var(--ink-2)]">
        Ketuk satu di kiri, lalu ketuk pasangannya di kanan:
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          {question.left.map((l) => {
            const pairedId = value[l.id];
            const isSelected = activeLeftId === l.id;
            return (
              <button
                key={l.id}
                type="button"
                disabled={disabled}
                onClick={() => setActiveLeftId(isSelected ? null : l.id)}
                className={`flex min-h-[56px] w-full flex-col items-start justify-center rounded-[var(--radius-md)] border-2 px-3.5 py-2 text-left cursor-pointer ${
                  isSelected
                    ? 'border-[var(--world-600)] bg-[var(--world-50)]'
                    : pairedId
                      ? 'border-[var(--ok-500)] bg-[var(--ok-50)]'
                      : 'border-[var(--line)] bg-[var(--paper)]'
                }`}
              >
                <span className="font-bold">{resolveTxt(l.label, mode)}</span>
                {pairedId && rightMap[pairedId] && (
                  <span className="text-xs font-semibold text-[var(--ok-600)]">
                    → {resolveTxt(rightMap[pairedId].label, mode)}
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
                className={`flex min-h-[56px] w-full items-center justify-between rounded-[var(--radius-md)] border-2 px-3.5 py-2 text-left transition-colors ${
                  activeLeftId
                    ? 'border-dashed border-[var(--world-600)] bg-[var(--world-50)] cursor-pointer'
                    : isUsed
                      ? 'border-[var(--ok-500)] bg-[var(--ok-50)] opacity-85'
                      : 'border-[var(--line)] bg-[var(--paper)] opacity-80'
                }`}
              >
                <span className="font-semibold">{resolveTxt(r.label, mode)}</span>
                {isUsed && <Check className="h-4 w-4 text-[var(--ok-600)]" aria-hidden="true" />}
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
}> = ({ question, value, onChange, disabled }) => {
  return (
    <div className="space-y-3">
      <div className="rounded-[var(--radius-lg)] border-2 border-[var(--line)] bg-[var(--cream)] p-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ink-2)]">
          Ketuk area diagram yang tepat:
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {question.regions.map((reg) => {
            const selected = value === reg.id;
            return (
              <button
                key={reg.id}
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                onClick={() => onChange(reg.id)}
                className={`flex min-h-[60px] items-center justify-center rounded-[var(--radius-md)] border-2 px-4 py-3 font-extrabold transition-all cursor-pointer ${
                  selected
                    ? 'border-[var(--world-600)] bg-[var(--world-600)] text-[var(--world-btn-text)] shadow-md'
                    : 'border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--world-50)]'
                }`}
              >
                {reg.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const FillInteractive: React.FC<{
  question: Extract<Question, { type: 'fill' }>;
  value: string[];
  onChange: (val: string[]) => void;
  disabled: boolean;
}> = ({ question, value, onChange, disabled }) => {
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
      <div className="pw-code rounded-[var(--radius-md)] border border-[#2e3258] bg-[#1f2340] p-4 text-[#e8eaf6] leading-loose">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            <span>{part}</span>
            {idx < slotCount && (
              <button
                type="button"
                disabled={disabled || !value[idx]}
                onClick={() => clearSlot(idx)}
                className="mx-1 inline-flex min-h-[36px] min-w-[72px] items-center justify-center rounded border-2 border-dashed border-[#f5b400] bg-white/10 px-2.5 py-0.5 font-bold text-[#ffd466] cursor-pointer"
              >
                {value[idx] ?? '___'}
              </button>
            )}
          </React.Fragment>
        ))}
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
              className="pw-code min-h-[48px] rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--paper)] px-4 py-2 font-bold text-[var(--ink)] hover:border-[var(--world-600)] disabled:opacity-40 cursor-pointer"
            >
              {tok}
            </button>
          );
        })}
      </div>
    </div>
  );
};
