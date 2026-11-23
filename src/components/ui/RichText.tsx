import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { GLOSSARY_BY_ID } from '@/content/glossary';
import { resolveTxt, type Mode, type Rich } from '@/content/schema';
import { visibleSegments } from '@/content/rich';
import { DialogModal } from './DialogModal';

const SENTENCE_END = /[.!?…]$/;
const STARTS_AS_FRAGMENT = /^\s*(?:[^\p{L}\p{N}\s]|\p{Ll})/u;

function plain(seg: Rich, mode: Mode): string {
  return seg.t === 'code' ? seg.v : resolveTxt(seg.v, mode);
}

/**
 * What a learner of `mode` reads, from `visibleSegments` and nothing else.
 *
 * Junior has its own complete text (rJunior) and Pro code is marked modes ['pro']. `visibleSegments` already
 * drops the hidden segments and a dangling untagged code token. This adds one more guard, local to the renderer:
 * a text or bold segment that sits right after a segment hidden for this mode, and that would continue a sentence
 * that is already finished (it starts with punctuation or a lower-case letter), is dropped. Without it a Pro
 * connecting word or a closing mark would be glued to the end of the Junior sentence.
 */
export function renderableSegments(segments: Rich[], mode: Mode): Rich[] {
  const visible = visibleSegments(segments, mode);
  if (mode !== 'junior') return visible;

  const rawIndex = new Map<Rich, number>();
  segments.forEach((seg, i) => rawIndex.set(seg, i));

  const out: Rich[] = [];
  let lastRaw = -1;
  let dropped = false;
  for (const seg of visible) {
    const idx = rawIndex.get(seg) ?? lastRaw + 1;
    const hiddenBetween = segments
      .slice(lastRaw + 1, idx)
      .some((s) => s.modes !== undefined && !s.modes.includes(mode));
    lastRaw = idx;

    // Closing marks that belonged to a dropped fragment go with it
    if (dropped && seg.t === 'text' && !/[\p{L}\p{N}]/u.test(resolveTxt(seg.v, mode))) continue;
    dropped = false;

    if (hiddenBetween && (seg.t === 'text' || seg.t === 'bold')) {
      const before = out.map((s) => plain(s, mode)).join('').trimEnd();
      if (SENTENCE_END.test(before) && STARTS_AS_FRAGMENT.test(resolveTxt(seg.v, mode))) {
        dropped = true;
        continue;
      }
    }
    out.push(seg);
  }
  return out;
}

interface RichTextProps {
  segments: Rich[];
  mode: Mode;
  className?: string;
}

export const RichText: React.FC<RichTextProps> = ({ segments, mode, className = '' }) => {
  const [activeTermId, setActiveTermId] = useState<string | null>(null);
  const activeTerm = activeTermId ? GLOSSARY_BY_ID[activeTermId] : null;

  return (
    <>
      <span className={`pw-prose ${className}`}>
        {renderableSegments(segments, mode).map((seg, idx) => {
          if (seg.t === 'text') {
            return <React.Fragment key={idx}>{resolveTxt(seg.v, mode)}</React.Fragment>;
          }
          if (seg.t === 'bold') {
            return (
              <strong key={idx} className="font-bold text-[var(--ink)]">
                {resolveTxt(seg.v, mode)}
              </strong>
            );
          }
          if (seg.t === 'code') {
            return (
              <code
                key={idx}
                className="pw-code rounded-[var(--radius-xs)] bg-[var(--paper-2)] px-1.5 py-0.5 text-[var(--ink)]"
              >
                {seg.v}
              </code>
            );
          }
          const label = resolveTxt(seg.v, mode);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTermId(seg.termId)}
              className="pw-t-colors inline-flex items-center gap-0.5 rounded-[var(--radius-xs)] px-0.5 font-extrabold text-[var(--world-700)] underline decoration-dashed underline-offset-4 hover:bg-[var(--world-50)] cursor-pointer"
            >
              <span>{label}</span>
              <Info className="inline h-3.5 w-3.5" aria-hidden="true" />
              <span className="visually-hidden"> (ketuk untuk arti istilah)</span>
            </button>
          );
        })}
      </span>

      <DialogModal
        open={Boolean(activeTerm)}
        onClose={() => setActiveTermId(null)}
        title={activeTerm ? activeTerm.term : 'Arti istilah'}
        variant="sheet"
      >
        {activeTerm && (
          <div className="space-y-3">
            {mode === 'junior' && activeTerm.pronunciation && (
              <p className="pw-small text-[var(--ink-2)]">
                Cara baca: <strong>{activeTerm.pronunciation}</strong>
              </p>
            )}
            <p className="pw-body">{resolveTxt(activeTerm.shortDef, mode)}</p>
          </div>
        )}
      </DialogModal>
    </>
  );
};
