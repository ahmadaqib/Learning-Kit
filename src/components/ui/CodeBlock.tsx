import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { CodeSnippet } from '@/content/schema';

interface CodeBlockProps {
  snippet: CodeSnippet;
  wrapLines?: boolean;
  /** Shows a copy button in the header (used for code in tutor replies). */
  copyable?: boolean;
  /** Header text when it should differ from `snippet.lang`, e.g. "bash". */
  label?: string;
}

/**
 * A code block is a dark surface in both themes (`--boss` and `--on-boss`), like an editor. The highlighted
 * line is also bold, so it never depends on colour alone.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ snippet, wrapLines = false, copyable = false, label }) => {
  const lines = snippet.code.split('\n');
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(snippet.code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }, () => {});
  };
  const highlightSet = new Set(snippet.highlight ?? []);

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--on-boss)_16%,transparent)] bg-[var(--boss)] text-[var(--on-boss)]">
      <div className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--on-boss)_12%,transparent)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[color-mix(in_srgb,var(--on-boss)_75%,transparent)]">
        <span>{label ?? snippet.lang}</span>
        {copyable && (
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-8 cursor-pointer items-center gap-1 rounded-[var(--radius-sm)] px-2 normal-case tracking-normal hover:bg-[color-mix(in_srgb,var(--on-boss)_12%,transparent)]"
          >
            {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
            {copied ? 'Disalin' : 'Salin kode'}
          </button>
        )}
      </div>
      {/* A scrollable region must be reachable by keyboard */}
      <pre
        className="pw-code m-0 overflow-x-auto p-3"
        tabIndex={0}
        role="region"
        aria-label={`Kode ${snippet.lang}`}
      >
        <code>
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = highlightSet.has(lineNum);
            return (
              <div
                key={lineNum}
                className={`flex gap-3 rounded-[var(--radius-xs)] px-2 py-0.5 ${
                  isHighlighted
                    ? 'bg-[color-mix(in_srgb,var(--on-boss)_12%,transparent)] font-bold text-[var(--star)]'
                    : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="w-5 flex-shrink-0 select-none text-right text-[color-mix(in_srgb,var(--on-boss)_55%,transparent)]"
                >
                  {lineNum}
                </span>
                <span className={wrapLines ? 'min-w-0 whitespace-pre-wrap wrap-anywhere' : 'whitespace-pre'}>{line}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
};
