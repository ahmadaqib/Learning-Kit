import React, { useEffect, useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { WORLD_METAS, WORLD_META_BY_ID } from '@/content/worldMeta';
import { resolveTxt, type Profile } from '@/content/schema';
import { STICKERS_BY_ID } from '@/content/stickers';
import { prefetchWorldBundle, loadWorldBundle } from '@/content/worldLoader';
import { getWorldStarStats, isBossUnlocked, isLessonUnlocked, isWorldUnlocked } from '@/engine/unlock';
import { hasSeen, markSeen } from '@/engine/seen';
import { xpWord } from '@/app/modeConfig';
import { useAppStore } from '@/store/useAppStore';
import { LESSON_STUBS, WORLD_STUBS } from '@/components/map/MapPath';
import { Annot } from '@/components/fx/Annot';
import { BossCard } from '@/components/world/BossCard';
import { LessonTrail, type TrailRow, type TrailSideQuest } from '@/components/world/LessonTrail';
import { Button } from '@/components/ui/Button';
import { Poster, PosterHeading } from '@/components/ui/Poster';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StorageWarningBanner } from '@/components/ui/StorageWarningBanner';
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
      <div className="mx-auto max-w-[640px] space-y-4 p-6 text-center">
        <h1 className="pw-h1">Dunia tidak ditemukan</h1>
        <Button variant="primary" onClick={() => navigate('/peta/A')}>
          Kembali ke Peta
        </Button>
      </div>
    );
  }

  return <WorldDetailContent profile={profile} worldId={meta.id} chunkError={chunkError} />;
};

const WorldDetailContent: React.FC<{ profile: Profile; worldId: string; chunkError: boolean }> = ({
  profile,
  worldId,
  chunkError,
}) => {
  const navigate = useNavigate();
  const meta = WORLD_META_BY_ID[worldId];
  const junior = profile.mode === 'junior';
  const soundEnabled = profile.settings.soundEnabled;

  const [offerHidden, setOfferHidden] = useState(false);

  const worldStub = WORLD_STUBS.find((w) => w.id === meta.id)!;
  const worldUnlocked = isWorldUnlocked(worldStub, profile, WORLD_STUBS);
  const visibleLessons = meta.lessons.filter((l) => l.modes.includes(profile.mode));
  const visibleSideQuests = meta.sideQuests.filter((l) => l.modes.includes(profile.mode));
  const stats = getWorldStarStats(worldStub, LESSON_STUBS, profile);
  const bossOpen = isBossUnlocked(worldStub, LESSON_STUBS, profile, WORLD_STUBS);
  const bossPassed = Boolean(profile.bosses[meta.id]?.passed);
  const preDone = Boolean(profile.assessments[meta.id]?.pre);

  const rows: TrailRow[] = visibleLessons.map((lesson, idx) => {
    const rec = profile.lessons[lesson.id];
    const completed = Boolean(rec?.completedAt);
    const unlocked = preDone && isLessonUnlocked(lesson.id, worldStub, LESSON_STUBS, profile, WORLD_STUBS);
    const sticker = lesson.stickerId ? STICKERS_BY_ID[lesson.stickerId] : undefined;
    return {
      id: lesson.id,
      title: lesson.title,
      estMinutes: lesson.estMinutes,
      number: idx + 1,
      state: completed ? 'done' : unlocked ? 'active' : 'locked',
      stars: (rec?.stars ?? 0) as TrailRow['stars'],
      resume: rec?.stepIndex !== undefined,
      rewardName: sticker ? (junior ? sticker.title : sticker.concept) : undefined,
      bonus: junior && completed && hasSeen(profile.id, `bonus:${lesson.id}`),
      unseen: (completed || unlocked) && !hasSeen(profile.id, `unlock:lesson:${lesson.id}`),
    };
  });

  const sideQuests: TrailSideQuest[] = visibleSideQuests.map((sq) => {
    const done = Boolean(profile.lessons[sq.id]?.completedAt);
    const unlocked = preDone && isLessonUnlocked(sq.id, worldStub, LESSON_STUBS, profile, WORLD_STUBS);
    return { id: sq.id, title: sq.title, state: done ? 'done' : unlocked ? 'open' : 'locked' };
  });

  // "Siap naik ke Pro?": Junior only, once per profile, after this world's guardian with 2.5 stars a lesson or more
  const avgStars = visibleLessons.length
    ? visibleLessons.reduce((sum, l) => sum + (profile.lessons[l.id]?.stars ?? 0), 0) / visibleLessons.length
    : 0;
  const showProOffer = junior && bossPassed && avgStars >= 2.5 && !offerHidden && !hasSeen(profile.id, 'offer:pro');
  const dismissOffer = () => {
    markSeen(profile.id, 'offer:pro');
    setOfferHidden(true);
  };

  const bossBest = profile.bosses[meta.id]?.best;

  return (
    <WorldThemeWrapper worldId={meta.id} className="mx-auto max-w-[920px] px-[var(--screen-pad)] py-6 sm:px-6">
      <StorageWarningBanner />

      <div className="mb-4 flex items-center justify-between">
        <Link
          to={`/peta/${meta.track}`}
          className="pw-pressable -ml-2 inline-flex min-h-[var(--touch-min)] items-center gap-2 rounded-[var(--radius-md)] px-2 font-bold text-[var(--ink)]"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          <span>Peta Jalur {meta.track}</span>
        </Link>
      </div>

      {chunkError && (
        <div
          role="alert"
          className="mb-4 flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--warn-500)] bg-[var(--warn-50)] p-4"
        >
          <span className="pw-small font-bold">Bito tersesat sebentar. Periksa koneksi, lalu coba lagi.</span>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Coba lagi
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-[var(--gap-group)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-start">
        {/* World poster: the one saturated block, with the world's progress */}
        <Poster className="space-y-[var(--gap-stack)] lg:sticky lg:top-6">
          <PosterHeading worldId={meta.id} worldTitle={meta.title} locked={!worldUnlocked}>
            <span className="pw-kicker">{junior ? 'Dunia' : `Dunia ${meta.id.toUpperCase()}`}</span>
            <h1 className="pw-h1 mt-1 text-balance">{meta.title}</h1>
          </PosterHeading>
          <p className="pw-body">{resolveTxt(meta.tagline, profile.mode)}</p>

          <div className="space-y-2">
            <p className="pw-small m-0 font-bold">
              {stats.completedLessons} dari {stats.totalLessons} pelajaran · {stats.earned}/{stats.max} ★
            </p>
            <ProgressBar
              variant="poster"
              segments={stats.totalLessons}
              value={stats.totalLessons ? (stats.completedLessons / stats.totalLessons) * 100 : 0}
              label="Progres dunia"
            />
          </div>

          {/* Tes Penempatan: Pro only (spec 4.2 rule 6) */}
          {!junior && worldUnlocked && !bossPassed && !bossOpen && (
            <div className="space-y-2 border-t border-[var(--on-poster)] pt-[var(--gap-stack)]">
              <p className="pw-small m-0">Sudah menguasai seluruh materi {meta.title}? Langsung ke Penjaga.</p>
              <Button variant="inverse" fullWidth onClick={() => navigate(`/penjaga/${meta.id}?placement=1`)}>
                Tes Penempatan
              </Button>
            </div>
          )}
        </Poster>

        <div className="space-y-[var(--gap-group)]">
          {showProOffer && (
            <section aria-label="Siap naik ke Pro?" className="pw-card space-y-[var(--gap-stack)] p-[var(--space-card)]">
              <h2 className="pw-h3">Siap naik ke Pro?</h2>
              <p className="pw-body m-0 text-[var(--ink-2)]">
                Kamu sudah jago di sini. Mau coba mode Pro? Ada istilah asli dan kode sungguhan.
              </p>
              <div className="flex flex-wrap gap-[var(--gap-stack)]">
                <Button
                  variant="primary"
                  soundEnabled={soundEnabled}
                  onClick={() => {
                    dismissOffer();
                    navigate('/pengaturan#mode');
                  }}
                >
                  Lihat mode Pro
                </Button>
                <Button variant="ghost" onClick={dismissOffer}>
                  Nanti saja
                </Button>
              </div>
            </section>
          )}

          {/* Pre-test */}
          {!preDone && worldUnlocked && (
            <button
              type="button"
              onClick={() => navigate(`/tes/${meta.id}/awal`)}
              data-press="lg"
              className="pw-card pw-pressable flex min-h-[72px] w-full cursor-pointer items-stretch gap-0 overflow-hidden p-0 text-left"
            >
              <span aria-hidden="true" className="flex w-14 flex-shrink-0 items-center justify-center bg-[var(--world-50)]">
                <Sparkles className="h-6 w-6 text-[var(--world-700)]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-4">
                <span className="font-extrabold text-[var(--ink)]">{junior ? 'Tebak-tebakan Awal' : 'Cek Titik Awal'}</span>
                <span className="pw-small text-[var(--ink-2)]">
                  {junior ? 5 : 6} pertanyaan singkat sebelum belajar (+10 {xpWord(profile.mode)})
                </span>
                <Annot>{junior ? 'belum tahu? tidak apa-apa' : 'belum tahu? lewati saja'}</Annot>
              </span>
              <span className="flex flex-shrink-0 items-center pr-4 font-extrabold text-[var(--world-700)]">Mulai →</span>
            </button>
          )}

          {/* Lesson trail and side quests */}
          <LessonTrail
            rows={rows}
            sideQuests={sideQuests}
            mode={profile.mode}
            soundEnabled={soundEnabled}
            onOpen={(id) => navigate(`/belajar/${id}`)}
            onSeen={(id) => markSeen(profile.id, `unlock:lesson:${id}`)}
          />

          {/* Boss */}
          <BossCard
            guardianName={meta.guardianName}
            state={bossPassed ? 'passed' : bossOpen ? 'open' : 'locked'}
            mode={profile.mode}
            totalLessons={stats.totalLessons}
            doneLessons={stats.completedLessons}
            worldLocked={!worldUnlocked}
            best={bossBest}
            soundEnabled={soundEnabled}
            onOpen={() => navigate(`/penjaga/${meta.id}`)}
          />
        </div>
      </div>

    </WorldThemeWrapper>
  );
};
