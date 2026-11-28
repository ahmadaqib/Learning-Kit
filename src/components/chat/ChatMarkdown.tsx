import React from 'react';
import Markdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/components/ui/CodeBlock';
import type { CodeSnippet } from '@/content/schema';

const LANGS: Record<string, CodeSnippet['lang']> = {
  html: 'html', xml: 'html', svg: 'html', css: 'css', scss: 'css',
  js: 'js', javascript: 'js', jsx: 'js', ts: 'js', typescript: 'js', tsx: 'js',
  json: 'json', http: 'http',
};

/**
 * Tutor replies as Markdown: lists, emphasis, tables (GFM) and code blocks with a copy button.
 * react-markdown never renders raw HTML and sanitises link URLs, so model output cannot inject markup.
 */
const components: Components = {
  pre: ({ children }) => {
    const child = React.Children.toArray(children)[0] as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;
    const name = /language-([\w-]+)/.exec(child?.props.className ?? '')?.[1]?.toLowerCase();
    const code = String(child?.props.children ?? '').replace(/\n$/, '');
    return (
      <div className="my-3">
        <CodeBlock snippet={{ lang: (name && LANGS[name]) || 'text', code }} label={name} copyable wrapLines />
      </div>
    );
  },
  code: ({ children }) => (
    <code className="rounded-[var(--radius-xs)] bg-[var(--paper-2)] px-1.5 py-0.5 font-mono text-[0.9em]">{children}</code>
  ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--line)]" tabIndex={0} role="region" aria-label="Tabel">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-[var(--line)] bg-[var(--paper-2)] px-3 py-2 font-bold">{children}</th>,
  td: ({ children }) => <td className="border-b border-[var(--line)] px-3 py-2 align-top">{children}</td>,
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-[var(--world-700)] underline">{children}</a>
  ),
  ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-6">{children}</ol>,
  p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
  // The prompt asks for no headings; if one slips through it reads as bold text, not a page title.
  h1: ({ children }) => <p className="my-2 font-bold">{children}</p>,
  h2: ({ children }) => <p className="my-2 font-bold">{children}</p>,
  h3: ({ children }) => <p className="my-2 font-bold">{children}</p>,
  hr: () => null,
  img: () => null,
};

const ChatMarkdown: React.FC<{ text: string }> = ({ text }) => (
  <div className="break-words text-[15px] leading-7 text-[var(--ink)]">
    <Markdown remarkPlugins={[remarkGfm]} components={components}>{text}</Markdown>
  </div>
);

export default ChatMarkdown;
