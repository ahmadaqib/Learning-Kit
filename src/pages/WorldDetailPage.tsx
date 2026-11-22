import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, Flag, Lock, Play, Shield, Sparkles } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { WORLD_METAS, WORLD_META_BY_ID } from '@/content/worldMeta';
import { resolveTxt, type Lesson, type World } from '@/content/schema';
import { prefetchWorldBundle, loadWorldBundle } from '@/content/worldLoader';
import { getWorldStarStats, isBossUnlocked, isLessonUnlocked, isWorldUnlocked } from '@/engine/unlock';
import { useAppStore } from '@/store/useAppStore';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StarRow } from '@/components/ui/StarRow';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

export const WorldDetailPage: React.FC = () => {
  const { duniaId = 'a01' } = useParams<{ duniaId: string }>();
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const [chunkError, setChunkError] = useState(false);

  const meta = WORLD_META_BY_ID[duniaId];

  useEffect(() => {
    if (!meta) return;
    loadWorldBundle(meta.id).catch(() => setChunkError(true));
    // Prefetch dunia berikutnya saat membuka dunia aktif (§13.8)
    const idx = WORLD_METAS.findIndex((w) => w.id === meta.id);
    if (idx >= 0 && idx + 1 < WORLD_METAS.length) {
      prefetchWorldBundle(WORLD_METAS[idx + 1].id);
    }
  }, [meta]);

  if (!profile || !meta) {
    return (
      <div className="mx-auto max-w-[640px] p-6 text-center space-y-4">
        <h1 className="pw-h1">Dunia tidak ditemukan</h1>
        <Button variant="primary" onClick={() => navigate('/peta/A')}>
          Kembali ke Peta
        </Button>
      </div>
    );
  }

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

  const worldStub = worldsAsStubs.find((w) => w.id === meta.id)!;
  const worldUnlocked = isWorldUnlocked(worldStub, profile, worldsAsStubs);
  const visibleLessons = meta.lessons.filter((l) => l.modes.includes(profile.mode));
  const visibleSideQuests = meta.sideQuests.filter((l) => l.modes.includes(profile.mode));
  const stats = getWorldStarStats(worldStub, lessonsStub, profile);
  const bossOpen = isBossUnlocked(worldStub, lessonsStub, profile, worldsAsStubs);
  const preDone = Boolean(profile.assessments[meta.id]?.pre);

  return (
    <WorldThemeWrapper worldId={meta.id} className="mx-auto max-w-[920px] px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          to={`/peta/${meta.track}`}
          className="inline-flex min-h-[44px] items-center gap-2 font-bold text-[var(--ink)]"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span>Peta Jalur {meta.track}</span>
        </Link>
      </div>

      {chunkError && (
        <div role="alert" className="mb-4 rounded-xl border border-[var(--warn-500)] bg-[var(--warn-50)] p-4 flex items-center justify-between">
          <span className="pw-small font-bold">Bito tersesat sebentar. Periksa koneksi, lalu coba lagi.</span>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Coba lagi
          </Button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
        {/* Header dunia */}
        <section className="pw-card overflow-hidden">
          <div className="flex flex-col items-center justify-center bg-[var(--world-50)] p-6">
            <WorldIslandIllustration worldId={meta.id} size={140} locked={!worldUnlocked} />
          </div>
          <div className="p-5 space-y-3">
            <span className="pw-kicker">DUNIA {meta.id.toUpperCase()}</span>
            <h1 className="pw-h1">{meta.title}</h1>
            <p className="pw-body text-[var(--ink-2)]">{resolveTxt(meta.tagline, profile.mode)}</p>
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-bold text-[var(--ink-2)]">
                <span>{stats.completedLessons} dari {stats.totalLessons} pelajaran</span>
                <span>{stats.earned}/{stats.max} ★</span>
              </div>
              <ProgressBar
                value={stats.totalLessons ? (stats.completedLessons / stats.totalLessons) * 100 : 0}
                label="Progres dunia"
              />
            </div>

            {/* Tes Penempatan Pro (§4.2 aturan 6) */}
            {profile.mode === 'pro' && worldUnlocked && !profile.bosses[meta.id]?.passed && !bossOpen && (
              <div className="pt-3 border-t border-[var(--line)]">
                <p className="pw-small text-[var(--ink-2)] mb-2">
                  Sudah menguasai seluruh materi {meta.title}?
                </p>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => navigate(`/penjaga/${meta.id}?placement=1`)}
                >
                  Tes Penempatan (Langsung Tantangan Penjaga)
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Daftar pelajaran */}
        <section className="space-y-3">
          {!preDone && worldUnlocked && (
            <button
              type="button"
              onClick={() => navigate(`/tes/${meta.id}/awal`)}
              className="pw-card flex min-h-[68px] w-full items-center justify-between gap-3 border-2 border-[var(--world-600)] bg-[var(--world-50)] p-4 text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[var(--world-700)]" aria-hidden="true" />
                <div>
                  <div className="font-extrabold">
                    {profile.mode === 'junior' ? 'Tebak-tebakan Awal' : 'Cek Titik Awal'}
                  </div>
                  <div className="pw-small text-[var(--ink-2)]">
                    5–6 pertanyaan singkat sebelum belajar (+10 XP)
                  </div>
                </div>
              </div>
              <span className="font-extrabold text-[var(--world-700)]">Mulai →</span>
            </button>
          )}

          {visibleLessons.map((lesson, idx) => {
            const rec = profile.lessons[lesson.id];
            const completed = Boolean(rec?.completedAt);
            const unlocked =
              preDone && isLessonUnlocked(lesson.id, worldStub, lessonsStub, profile, worldsAsStubs);
            const active = unlocked && !completed;

            return (
              <button
                key={lesson.id}
                type="button"
                disabled={!unlocked}
                onClick={() => navigate(`/belajar/${lesson.id}`)}
                className={`pw-card pw-pressable flex min-h-[68px] w-full items-center justify-between gap-3 p-4 text-left ${
                  active ? 'border-2 border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_3px_0_var(--world-700)] cursor-pointer' : ''
                } ${unlocked ? 'cursor-pointer hover:border-[var(--world-600)]' : 'opacity-65 cursor-not-allowed'}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                      completed
                        ? 'bg-[var(--ok-500)] text-white'
                        : active
                          ? 'bg-[var(--world-600)] text-[var(--world-btn-text)]'
                          : 'bg-[var(--cream)] text-[var(--ink-2)]'
                    }`}
                  >
                    {completed ? <Check className="h-4 w-4" /> : unlocked ? idx + 1 : <Lock className="h-4 w-4" />}
                  </span>
                  <div>
                    <div className="font-bold text-[var(--ink)]">{lesson.title}</div>
                    <div className="text-xs text-[var(--ink-2)]">± {lesson.estMinutes} menit</div>
                  </div>
                </div>
                {completed ? (
                  <StarRow stars={rec?.stars ?? 1} size={18} />
                ) : active ? (
                  <span className="inline-flex items-center gap-1 text-sm font-extrabold text-[var(--world-700)]">
                    <Play className="h-4 w-4" aria-hidden="true" />
                    Lanjut
                  </span>
                ) : (
                  <span className="text-xs font-bold text-[var(--ink-3)]">Terkunci</span>
                )}
              </button>
            );
          })}

          {/* Side quests */}
          {visibleSideQuests.map((sq) => {
            const sqDone = Boolean(profile.lessons[sq.id]?.completedAt);
            const sqUnlocked =
              preDone && isLessonUnlocked(sq.id, worldStub, lessonsStub, profile, worldsAsStubs);
            return (
              <button
                key={sq.id}
                type="button"
                disabled={!sqUnlocked}
                onClick={() => navigate(`/belajar/${sq.id}`)}
                className="pw-card flex min-h-[64px] w-full items-center justify-between gap-3 border-dashed p-4 text-left disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <Flag className="h-5 w-5 text-[var(--world-700)]" aria-hidden="true" />
                  <div>
                    <div className="font-bold">{sq.title} (Misi Bonus)</div>
                    <div className="text-xs text-[var(--ink-2)]">Opsional · +25 XP</div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[var(--world-700)]">
                  {sqDone ? 'Selesai ✓' : sqUnlocked ? 'Buka →' : 'Terkunci'}
                </span>
              </button>
            );
          })}

          {/* Boss Quiz */}
          <button
            type="button"
            disabled={!bossOpen}
            onClick={() => navigate(`/penjaga/${meta.id}`)}
            className={`pw-card flex min-h-[72px] w-full items-center justify-between gap-3 p-4 text-left ${
              bossOpen ? 'border-2 border-[var(--ink)] bg-[var(--paper)] cursor-pointer' : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-[var(--world-700)]" aria-hidden="true" />
              <div>
                <div className="font-extrabold">{meta.guardianName}</div>
                <div className="text-xs text-[var(--ink-2)]">
                  Ujian campuran dunia · Lulus ≥ 80% (+50 XP)
                </div>
              </div>
            </div>
            <span className="text-sm font-extrabold text-[var(--world-700)]">
              {profile.bosses[meta.id]?.passed ? 'Lulus ✓' : bossOpen ? 'Mulai →' : 'Terkunci'}
            </span>
          </button>
        </section>
      </div>
    </WorldThemeWrapper>
  );
};
