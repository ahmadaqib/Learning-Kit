import React from 'react';
import type { CodeSnippet } from '@/content/schema';

interface CodeBlockProps {
  snippet: CodeSnippet;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ snippet }) => {
  const lines = snippet.code.split('\n');
  const highlightSet = new Set(snippet.highlight ?? []);

  return (
    <div className="overflow-hidden rounded-[var(--radius-md)] border border-[#2e3258] bg-[#1f2340] text-[#e8eaf6]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#b8bce0]">
        <span>{snippet.lang}</span>
      </div>
      <pre className="pw-code m-0 overflow-x-auto p-3">
        <code>
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = highlightSet.has(lineNum);
            return (
              <div
                key={lineNum}
                className={`flex gap-3 px-2 py-0.5 rounded ${
                  isHighlighted ? 'bg-white/10 font-bold text-[#ffd466]' : ''
                }`}
              >
                <span className="select-none text-[#8c91ba] w-5 text-right flex-shrink-0">
                  {lineNum}
                </span>
                <span className="whitespace-pre">{line}</span>
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
};
