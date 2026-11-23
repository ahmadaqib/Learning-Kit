import React, { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GLOSSARY_TERMS } from '@/content/glossary';
import { WORLD_META_BY_ID } from '@/content/worldMeta';
import { resolveTxt } from '@/content/schema';
import { useAppStore } from '@/store/useAppStore';

const SEARCH_ALIASES: Record<string, string[]> = {
  fe: ['frontend'],
  be: ['backend'],
  db: ['database'],
  js: ['javascript'],
  a11y: ['aksesibilitas', 'accessibility'],
  auth: ['autentikasi', 'oauth', 'jwt'],
  ui: ['user interface'],
  ux: ['user experience'],
  api: ['rest', 'graphql', 'endpoint'],
  css: ['flexbox', 'grid', 'box model'],
  html: ['tag', 'semantik', 'dom'],
};

const QUICK_CHIPS = [
  { id: 'all', label: 'Semua', query: '' },
  { id: 'febe', label: 'FE & BE', query: 'fe' },
  { id: 'htmlcss', label: 'HTML & CSS', query: 'html' },
  { id: 'js', label: 'JavaScript', query: 'javascript' },
  { id: 'api', label: 'API & HTTP', query: 'api' },
  { id: 'sec', label: 'Keamanan', query: 'keamanan' },
] as const;

export const GlossaryPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<'all' | 'learned'>('all');

  const learnedLessonIds = useMemo(() => {
    const ids = new Set<string>(profile ? Object.keys(profile.lessons) : []);
    return ids;
  }, [profile]);

  if (!profile) return null;

  const visibleTerms = GLOSSARY_TERMS.filter((term) => {
    const isLearned = learnedLessonIds.has(term.introducedIn);
    if (scope === 'learned' && !isLearned) return false;

    const rawQ = query.trim().toLowerCase();
    if (!rawQ) return true;

    const aliases = SEARCH_ALIASES[rawQ] ?? [];
    const candidates = [rawQ, ...aliases];
    const termText = term.term.toLowerCase();
    const idText = term.id.toLowerCase();
    const defText = resolveTxt(term.shortDef, profile.mode).toLowerCase();

    if (rawQ === 'fe') {
      return idText === 'frontend' || termText.includes('frontend') || defText.includes('frontend');
    }
    if (rawQ === 'be') {
      return idText === 'backend' || termText.includes('backend') || defText.includes('backend');
    }

    return candidates.some(
      (c) => termText.includes(c) || idText.includes(c) || defText.includes(c),
    );
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto w-full max-w-[840px] px-4 py-6 sm:px-6 space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="pw-kicker">Kamus Petualang</span>
          <h1 className="pw-h1">Kamus Istilah ({GLOSSARY_TERMS.length})</h1>
          <p className="pw-small text-[var(--ink-2)]">
            {profile.mode === 'junior'
              ? 'Cari istilah apa saja (contoh: FE, BE, API, CSS, DNS). Tidak perlu dihafal!'
              : 'Cari istilah apa saja (contoh: FE, BE, API, CSS, DNS).'}
          </p>
        </div>

        {/* Switch filter Semua vs Sudah Dipelajari */}
        <div className="inline-flex gap-1 rounded-full border-2 border-[var(--line)] bg-[var(--paper)] p-1" role="group" aria-label="Tampilkan istilah">
          <button
            type="button"
            onClick={() => setScope('all')}
            aria-pressed={scope === 'all'}
            className={`pw-pressable pw-t-colors min-h-[var(--touch-min)] cursor-pointer rounded-full px-3.5 text-xs font-extrabold ${
              scope === 'all'
                ? 'bg-[var(--world-600)] text-[var(--world-btn-text)]'
                : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            Semua ({GLOSSARY_TERMS.length})
          </button>
          <button
            type="button"
            onClick={() => setScope('learned')}
            aria-pressed={scope === 'learned'}
            className={`pw-pressable pw-t-colors min-h-[var(--touch-min)] cursor-pointer rounded-full px-3.5 text-xs font-extrabold ${
              scope === 'learned'
                ? 'bg-[var(--world-600)] text-[var(--world-btn-text)]'
                : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            Sudah dipelajari
          </button>
        </div>
      </header>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-3.5 h-5 w-5 text-[var(--ink-3)]" aria-hidden="true" />
        <label htmlFor="glossary-search" className="visually-hidden">
          Cari istilah
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari istilah (FE, BE, API, CSS, DNS, JWT)..."
          className="pw-t-colors min-h-[var(--touch-min)] w-full rounded-[var(--radius-md)] border-2 border-[var(--line-strong)] bg-[var(--paper)] py-3 pl-11 pr-4 text-[var(--ink)] focus:border-[var(--world-600)]"
        />
      </div>

      {/* Cip cepat kategori */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter cepat kategori istilah">
        {QUICK_CHIPS.map((chip) => {
          const active = query.toLowerCase() === chip.query;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setQuery(chip.query)}
              className={`pw-pressable pw-t-colors min-h-[var(--touch-min)] cursor-pointer rounded-full border-2 px-3.5 text-xs font-extrabold ${
                active
                  ? 'border-[var(--world-600)] bg-[var(--world-50)] text-[var(--world-700)]'
                  : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--world-600)]'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {visibleTerms.length === 0 ? (
        <div className="pw-card space-y-2 p-[var(--space-card)] text-center">
          <BookOpen className="mx-auto h-8 w-8 text-[var(--ink-3)]" aria-hidden="true" />
          <p className="pw-body font-bold">
            {scope === 'learned'
              ? 'Kamu belum menuntaskan pelajaran di filter ini.'
              : 'Belum ada istilah yang cocok dengan pencarianmu.'}
          </p>
          <p className="pw-small text-[var(--ink-2)]">
            {scope === 'learned'
              ? 'Tekan tombol "Semua" di atas untuk melihat seluruh {GLOSSARY_TERMS.length} istilah, atau selesaikan pelajaran pertamamu.'
              : 'Coba kata kunci lain seperti FE, BE, API, JSON, atau tekan chip "Semua".'}
          </p>
        </div>
      ) : (
        <div className="space-y-[var(--gap-stack)]">
          {visibleTerms.map((item) => {
            const worldId = item.introducedIn.split('-')[0];
            const worldMeta = WORLD_META_BY_ID[worldId];
            const learned = learnedLessonIds.has(item.introducedIn);
            return (
              <article key={item.id} className="pw-card space-y-2 p-[var(--space-card)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="pw-h3">{item.term}</h2>
                    {worldMeta && (
                      <span className="rounded-full bg-[var(--cream)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--ink-2)]">
                        {worldMeta.id.toUpperCase()} · {worldMeta.title}
                      </span>
                    )}
                    {learned && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ok-50)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--ok-600)]">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                        Dipahami
                      </span>
                    )}
                  </div>
                  {profile.mode === 'junior' && item.pronunciation && (
                    <span className="rounded-full bg-[var(--cream)] px-2.5 py-0.5 text-xs font-bold text-[var(--ink-2)]">
                      Dibaca: {item.pronunciation}
                    </span>
                  )}
                </div>
                <p className="pw-body text-[var(--ink-2)]">
                  {resolveTxt(item.shortDef, profile.mode)}
                </p>
                <Link
                  to={`/belajar/${item.introducedIn}`}
                  className="pw-pressable inline-flex min-h-[var(--touch-min)] items-center gap-1 pt-1 text-xs font-extrabold text-[var(--world-700)] underline underline-offset-4"
                >
                  Buka pelajaran terkait →
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
