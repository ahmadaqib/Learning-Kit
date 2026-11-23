import React from 'react';
import type { CodeSnippet } from '@/content/schema';

interface CodeBlockProps {
  snippet: CodeSnippet;
  wrapLines?: boolean;
}

/**
 * A code block is a dark surface in both themes (`--boss` and `--on-boss`), like an editor. The highlighted
 * line is also bold, so it never depends on colour alone.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ snippet, wrapLines = false }) => {
  const lines = snippet.code.split('\n');
  const highlightSet = new Set(snippet.highlight ?? []);

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--on-boss)_16%,transparent)] bg-[var(--boss)] text-[var(--on-boss)]">
      <div className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--on-boss)_12%,transparent)] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[color-mix(in_srgb,var(--on-boss)_75%,transparent)]">
        <span>{snippet.lang}</span>
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
