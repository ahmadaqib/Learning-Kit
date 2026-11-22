import React, { useEffect, useRef, useState } from 'react';
import { Check, Lock, Sparkles } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { WORLD_METAS } from '@/content/worldMeta';
import type { Lesson, World } from '@/content/schema';
import { resolveTxt } from '@/content/schema';
import { getWorldStarStats, isWorldUnlocked } from '@/engine/unlock';
import { useAppStore } from '@/store/useAppStore';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { Button } from '@/components/ui/Button';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

export const MapPage: React.FC = () => {
  const { jalur = 'A' } = useParams<{ jalur: string }>();
  const track = jalur.toUpperCase() === 'B' ? 'B' : 'A';
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);

  const [selectedWorldId, setSelectedWorldId] = useState<string>(track === 'A' ? 'a01' : 'b01');
  const [lockedTip, setLockedTip] = useState<string | null>(null);
  const activeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedWorldId(track === 'A' ? 'a01' : 'b01');
    setLockedTip(null);
  }, [track]);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [track]);

  if (!profile) return null;

  const worldsAsStubs: World[] = WORLD_METAS.map((wm) => ({
    id: wm.id,
    track: wm.track,
    order: wm.order,
    title: wm.title,
    tagline: wm.tagline,
    color: wm.color,
    illustration: wm.illustration,
    sourceChapters: [],
    requires: wm.requires,
    lessons: wm.lessons.map((l) => l.id),
    sideQuests: wm.sideQuests.map((l) => l.id),
    boss: {
      title: wm.guardianName,
      greeting: wm.tagline,
      guardianName: wm.guardianName,
      junior: { count: 8, pool: 'world' },
      pro: { count: 12, pool: 'world' },
      passRatio: 0.8,
    },
    anchors: { junior: [], pro: [] },
  }));

  const lessonsStub: Record<string, Lesson> = {};
  for (const wm of WORLD_METAS) {
    for (const lm of [...wm.lessons, ...wm.sideQuests]) {
      lessonsStub[lm.id] = {
        id: lm.id,
        worldId: lm.worldId,
        title: lm.title,
        modes: lm.modes,
        isSideQuest: lm.isSideQuest,
        objective: { pro: '' },
        estMinutes: lm.estMinutes,
        introducesTerms: [],
        usesTerms: [],
        steps: [],
        reviewCards: [],
        recap: { pro: '' },
      };
    }
  }

  // Jalan berkelok vertikal dari bawah ke atas (reverse order untuk visual naik gunung)
  const trackWorlds = WORLD_METAS.filter((w) => w.track === track).sort((a, b) => b.order - a.order);
  const selectedMeta = WORLD_METAS.find((w) => w.id === selectedWorldId) ?? trackWorlds[trackWorlds.length - 1];

  return (
    <WorldThemeWrapper worldId={selectedMeta?.id ?? 'a01'} className="mx-auto max-w-[1080px] px-4 py-6 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="pw-kicker">PETA PETUALANGAN</span>
          <h1 className="pw-h1">
            {track === 'A' ? 'Jalur A: Membangun Tampilan' : 'Jalur B: Aplikasi Saling Bicara'}
          </h1>
        </div>
        <div className="inline-flex rounded-full border-2 border-[var(--line)] bg-[var(--paper)] p-1">
          <Link
            to="/peta/A"
            className={`min-h-[42px] inline-flex items-center rounded-full px-4 text-sm font-extrabold ${
              track === 'A' ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink-2)]'
            }`}
          >
            Jalur A
          </Link>
          <Link
            to="/peta/B"
            className={`min-h-[42px] inline-flex items-center rounded-full px-4 text-sm font-extrabold ${
              track === 'B' ? 'bg-[var(--ink)] text-white' : 'text-[var(--ink-2)]'
            }`}
          >
            Jalur B
          </Link>
        </div>
      </header>

      {lockedTip && (
        <div role="status" className="mb-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 pw-small font-bold">
          <Lock className="mr-2 inline h-4 w-4" aria-hidden="true" />
          {lockedTip}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Jalur Berkelok Vertikal */}
        <div className="flex flex-col items-center gap-8 py-4">
          {trackWorlds.map((wm, index) => {
            const stub = worldsAsStubs.find((s) => s.id === wm.id)!;
            const unlocked = isWorldUnlocked(stub, profile, worldsAsStubs);
            const passed = Boolean(profile.bosses[wm.id]?.passed);
            const isActive = unlocked && !passed;
            const stars = getWorldStarStats(stub, lessonsStub, profile);
            const zigOffset = index % 2 === 0 ? '-translate-x-8 sm:-translate-x-12' : 'translate-x-8 sm:translate-x-12';

            return (
              <div
                key={wm.id}
                ref={isActive ? activeRef : undefined}
                className={`flex flex-col items-center ${zigOffset}`}
              >
                <WorldThemeWrapper worldId={wm.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (!unlocked) {
                        const prevTitle = wm.id === 'b01'
                          ? profile.mode === 'junior'
                            ? 'Penjaga Dunia A1'
                            : 'Penjaga Dunia A1 & A4'
                          : `Penjaga Dunia ${wm.requires.join(', ').toUpperCase()}`;
                        setLockedTip(`Terkunci · Selesaikan ${prevTitle} untuk membuka ${wm.title}.`);
                        return;
                      }
                      setLockedTip(null);
                      setSelectedWorldId(wm.id);
                      if (window.innerWidth < 1024) {
                        navigate(`/dunia/${wm.id}`);
                      }
                    }}
                    className={`pw-pressable group flex flex-col items-center gap-2 rounded-3xl p-3 cursor-pointer ${
                      isActive ? 'pw-anim-pulse ring-4 ring-[var(--world-100)] bg-[var(--paper)]' : ''
                    } ${!unlocked ? 'opacity-70' : ''}`}
                  >
                    <div className="relative">
                      <WorldIslandIllustration worldId={wm.id} size={104} locked={!unlocked} />
                      {passed && (
                        <span
                          aria-label="Dunia selesai"
                          className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ok-500)] text-white shadow"
                        >
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                      {!unlocked && (
                        <span
                          aria-label="Dunia terkunci"
                          className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--ink-3)] text-white"
                        >
                          <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[var(--ink-2)]">
                        {wm.id.toUpperCase()} {isActive ? '· Kamu di sini' : ''}
                      </div>
                      <div className="font-extrabold text-[var(--ink)]">{wm.title}</div>
                      {unlocked && (
                        <div className="text-xs font-bold text-[var(--ink-2)]">
                          {stars.earned}/{stars.max} ★
                        </div>
                      )}
                    </div>
                  </button>
                </WorldThemeWrapper>
              </div>
            );
          })}
        </div>

        {/* Panel Detail Dunia di Desktop / iPad Mendatar */}
        {selectedMeta && (
          <aside className="hidden lg:block">
            <div className="pw-card sticky top-6 p-6 space-y-4">
              <div className="flex items-center gap-4">
                <WorldIslandIllustration worldId={selectedMeta.id} size={88} />
                <div>
                  <span className="pw-kicker">DUNIA {selectedMeta.id.toUpperCase()}</span>
                  <h2 className="pw-h2">{selectedMeta.title}</h2>
                </div>
              </div>
              <p className="pw-body text-[var(--ink-2)]">
                {resolveTxt(selectedMeta.tagline, profile.mode)}
              </p>
              <div className="space-y-1.5">
                {selectedMeta.lessons
                  .filter((l) => l.modes.includes(profile.mode))
                  .map((l, i) => {
                    const done = Boolean(profile.lessons[l.id]?.completedAt);
                    return (
                      <div key={l.id} className="flex items-center justify-between text-sm py-1 border-b border-[var(--line)]">
                        <span className="font-semibold">
                          {done ? '✓' : `${i + 1}.`} {l.title}
                        </span>
                        <span className="text-xs text-[var(--ink-2)]">±{l.estMinutes} mnt</span>
                      </div>
                    );
                  })}
              </div>
              <Button variant="primary" fullWidth onClick={() => navigate(`/dunia/${selectedMeta.id}`)}>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Buka Dunia {selectedMeta.title} →
              </Button>
            </div>
          </aside>
        )}
      </div>
    </WorldThemeWrapper>
  );
};
