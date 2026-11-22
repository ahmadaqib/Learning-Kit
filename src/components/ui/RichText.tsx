import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { GLOSSARY_BY_ID } from '@/content/glossary';
import { resolveTxt, type Mode, type Rich } from '@/content/schema';
import { DialogModal } from './DialogModal';

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
        {segments.map((seg, idx) => {
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
                className="pw-code rounded bg-[var(--cream)] px-1.5 py-0.5 text-[var(--ink)]"
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
              className="inline-flex items-center gap-0.5 rounded px-0.5 font-extrabold text-[var(--world-700)] underline decoration-dashed underline-offset-4 hover:bg-[var(--world-50)] cursor-pointer"
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
        title={activeTerm ? activeTerm.term : 'Arti Istilah'}
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
