import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GLOSSARY_TERMS } from '@/content/glossary';
import { resolveTxt } from '@/content/schema';
import { useAppStore } from '@/store/useAppStore';

export const GlossaryPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const [query, setQuery] = useState('');

  if (!profile) return null;

  const unlockedLessons = new Set(Object.keys(profile.lessons));

  // Sesuai §9.12: hanya tampilkan istilah yang sudah diperkenalkan kepada pelajar
  // (atau seluruhnya jika sudah selesai banyak / dicari tidak kosong? Tidak: aturan §9.12 ketat: "Istilah yang belum dipelajari tidak muncul")
  const visibleTerms = GLOSSARY_TERMS.filter((term) => {
    const isIntroduced = unlockedLessons.has(term.introducedIn) || Boolean(profile.lessons[term.introducedIn]);
    if (!isIntroduced) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      term.term.toLowerCase().includes(q) ||
      resolveTxt(term.shortDef, profile.mode).toLowerCase().includes(q)
    );
  }).sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="mx-auto max-w-[820px] px-4 py-6 sm:px-6 space-y-6">
      <header>
        <h1 className="pw-h1">Kamus Istilah</h1>
        <p className="pw-small text-[var(--ink-2)]">
          Kumpulan istilah dari pelajaran yang sudah kamu buka. Tidak perlu dihafal!
        </p>
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
          placeholder="Cari istilah (misalnya API, CSS, DNS)..."
          className="w-full rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--paper)] py-3 pl-11 pr-4 text-[var(--ink)]"
        />
      </div>

      {visibleTerms.length === 0 ? (
        <div className="pw-card p-6 text-center space-y-2">
          <p className="pw-body font-bold">Belum ada istilah yang cocok atau belum dipelajari.</p>
          <p className="pw-small text-[var(--ink-2)]">
            Selesaikan pelajaran di Peta agar istilah-istilah baru terbuka di sini!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleTerms.map((item) => (
            <article key={item.id} className="pw-card p-4 space-y-1.5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="pw-h3">{item.term}</h2>
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
                className="inline-block text-xs font-extrabold text-[var(--world-700)] underline pt-1"
              >
                Buka pelajarannya →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
