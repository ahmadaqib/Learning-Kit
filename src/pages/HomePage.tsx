import React from 'react';
import { BookOpen, Layers, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { WORLD_METAS, WORLD_META_BY_ID } from '@/content/worldMeta';
import { STICKERS } from '@/content/stickers';
import { formatLocalDate, getConsecutiveTargetWeeks } from '@/engine/date';
import { countAllDueCards } from '@/engine/leitner';
import { getLevelFromXp } from '@/engine/scoring';
import { getDueRetainWorlds, getNextRecommendedAction } from '@/engine/unlock';
import type { Lesson, World } from '@/content/schema';
import { useAppStore } from '@/store/useAppStore';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StorageWarningBanner } from '@/components/ui/StorageWarningBanner';
import { WeekDots } from '@/components/ui/WeekDots';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);

  if (!profile) {
    return null;
  }

  // Gunakan metadata ringan untuk menentukan langkah berikutnya tanpa mengunduh seluruh chunk dunia
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

  const lessonsMapStub: Record<string, Lesson> = {};
  for (const wm of WORLD_METAS) {
    for (const lm of [...wm.lessons, ...wm.sideQuests]) {
      lessonsMapStub[lm.id] = {
        id: lm.id,
        worldId: lm.worldId,
        title: lm.title,
        modes: lm.modes,
        isSideQuest: lm.isSideQuest,
        objective: { pro: '' },
        estMinutes: lm.estMinutes,
        introducesTerms: [],
        usesTerms: [],
        stickerId: lm.stickerId,
        steps: [],
        reviewCards: [],
        recap: { pro: '' },
      };
    }
  }

  const nextAction = getNextRecommendedAction(profile, worldsAsStubs, lessonsMapStub);
  const heroWorld = WORLD_META_BY_ID[nextAction.worldId] ?? WORLD_METAS[0];
  const heroLesson = nextAction.lessonId
    ? heroWorld.lessons.find((l) => l.id === nextAction.lessonId)
    : undefined;

  const todayStr = formatLocalDate();
  const dueCardsCount = countAllDueCards(profile.leitner, todayStr);
  const studiedToday = Object.values(profile.weeks).some((dates) => dates.includes(todayStr));
  const dueRetainWorlds = getDueRetainWorlds(profile, worldsAsStubs, todayStr);
  const levelInfo = getLevelFromXp(profile.xp, profile.mode);
  const consecutiveWeeks = getConsecutiveTargetWeeks(profile.weeks, profile.settings.weeklyTarget);

  const handlePrimaryAction = () => {
    if (dueCardsCount > 0 && !studiedToday && nextAction.type === 'lesson') {
      navigate('/ulang?next=' + encodeURIComponent(`/belajar/${nextAction.lessonId}`));
      return;
    }
    if (nextAction.type === 'pretest') {
      navigate(`/tes/${nextAction.worldId}/awal`);
    } else if (nextAction.type === 'posttest') {
      navigate(`/tes/${nextAction.worldId}/akhir`);
    } else if (nextAction.type === 'boss') {
      navigate(`/penjaga/${nextAction.worldId}`);
    } else if (nextAction.type === 'lesson' && nextAction.lessonId) {
      navigate(`/belajar/${nextAction.lessonId}`);
    } else {
      navigate('/peta/A');
    }
  };

  const heroTitle =
    nextAction.type === 'pretest'
      ? profile.mode === 'junior'
        ? `Tebak-tebakan Awal: ${heroWorld.title}`
        : `Cek Titik Awal: ${heroWorld.title}`
      : nextAction.type === 'posttest'
        ? profile.mode === 'junior'
          ? `Tebak-tebakan Lagi: ${heroWorld.title}`
          : `Cek Kemajuan: ${heroWorld.title}`
        : nextAction.type === 'boss'
          ? `Tantangan ${heroWorld.guardianName}`
          : nextAction.type === 'done'
            ? 'Semua Dunia Selesai!'
            : heroLesson?.title ?? heroWorld.title;

  const primaryCtaText =
    dueCardsCount > 0 && !studiedToday && nextAction.type === 'lesson'
      ? `Pemanasan Kotak Ulang (${Math.min(dueCardsCount, profile.mode === 'junior' ? 5 : 10)}) → Lanjut pelajaran`
      : nextAction.type === 'pretest'
        ? 'Mulai Tebak-tebakan Awal →'
        : nextAction.type === 'posttest'
          ? 'Lihat Kemajuanmu →'
          : nextAction.type === 'boss'
            ? 'Hadapi Penjaga Dunia →'
            : nextAction.type === 'done'
              ? 'Jelajahi Peta Dunia →'
              : nextAction.stepIndex
                ? `Lanjutkan (Langkah ${nextAction.stepIndex + 1}) →`
                : 'Lanjutkan →';

  return (
    <WorldThemeWrapper worldId={heroWorld.id} className="mx-auto max-w-[1080px] px-4 py-6 sm:px-6">
      <StorageWarningBanner />

      {/* Header sapaan & XP */}
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CharacterAvatar avatarId={profile.avatar} size={48} className="pw-pressable" />
          <div>
            <h1 className="pw-h2">Hai, {profile.nickname || 'Petualang'}!</h1>
            <p className="pw-small text-[var(--ink-2)]">{levelInfo.title}</p>
          </div>
        </div>
        <Link
          to="/profil"
          className="pw-pressable inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-[var(--line)] bg-[var(--paper)] px-3.5 py-1.5 text-sm font-extrabold text-[var(--ink)] shadow-[0_2px_0_var(--line)] hover:border-[var(--world-600)]"
        >
          <span>Lv {levelInfo.level}</span>
          <span className="text-[var(--ink-3)]">·</span>
          <span>{profile.xp} XP</span>
        </Link>
      </header>

      <div className="mb-6 max-w-[420px]">
        <ProgressBar
          variant="xp"
          value={levelInfo.progressRatio * 100}
          label={`Progres level ${levelInfo.level}`}
        />
      </div>

      {/* Tata letak Expanded (2 kolom) vs Compact/Medium (1 kolom) */}
      <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
        {/* Kartu Utama (Hero) - satu tombol primer solid (Von Restorff) */}
        <section aria-label="Pelajaran berikutnya" className="pw-card overflow-hidden p-5 sm:p-6 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="pw-float flex justify-center rounded-2xl bg-[var(--world-50)] p-3 sm:flex-shrink-0">
              <WorldIslandIllustration worldId={heroWorld.id} size={116} />
            </div>
            <div className="space-y-2">
              <span className="pw-kicker">
                DUNIA {heroWorld.id.toUpperCase()} · {heroWorld.title}
              </span>
              <h2 className="pw-h1">{heroTitle}</h2>
              {nextAction.stepIndex !== undefined && (
                <p className="pw-small font-bold text-[var(--world-700)]">
                  Sedang berlangsung · Lanjut dari langkah {nextAction.stepIndex + 1}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="primary"
              fullWidth
              soundEnabled={profile.settings.soundEnabled}
              onClick={handlePrimaryAction}
            >
              {primaryCtaText}
            </Button>
          </div>
        </section>

        {/* Kolom Sekunder */}
        <div className="space-y-4">
          <WeekDots
            weeks={profile.weeks}
            weeklyTarget={profile.settings.weeklyTarget}
            consecutiveWeeks={consecutiveWeeks}
          />

          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/ulang"
              className="pw-card pw-pressable flex flex-col justify-between p-4 hover:border-[var(--world-600)]"
            >
              <div className="flex items-center justify-between">
                <Layers className="h-5 w-5 text-[var(--world-700)]" aria-hidden="true" />
                {dueCardsCount > 0 && (
                  <span className="rounded-full bg-[var(--warn-500)] px-2 py-0.5 text-xs font-extrabold text-white">
                    {dueCardsCount}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <div className="font-extrabold">Kotak Ulang</div>
                <div className="pw-small text-[var(--ink-2)]">
                  {dueCardsCount > 0
                    ? `${Math.min(dueCardsCount, profile.mode === 'junior' ? 5 : 10)} kartu menunggu`
                    : 'Sudah aman!'}
                </div>
              </div>
            </Link>

            <Link
              to="/stiker"
              className="pw-card pw-pressable flex flex-col justify-between p-4 hover:border-[var(--world-600)]"
            >
              <BookOpen className="h-5 w-5 text-[var(--world-700)]" aria-hidden="true" />
              <div className="mt-3">
                <div className="font-extrabold">Buku Stiker</div>
                <div className="pw-small text-[var(--ink-2)]">
                  {profile.stickers.length} / {STICKERS.length} stiker
                </div>
              </div>
            </Link>
          </div>

          {/* Kartu Tes Ingat 7 hari (§9.2 & §7.10) */}
          {dueRetainWorlds.map((w) => (
            <Link
              key={w.id}
              to={`/tes/${w.id}/ingat`}
              className="pw-card flex items-center justify-between gap-3 border-[var(--world-600)] bg-[var(--world-50)] p-4"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[var(--world-700)]" aria-hidden="true" />
                <div>
                  <div className="font-extrabold">Masih ingat {w.title}?</div>
                  <div className="pw-small text-[var(--ink-2)]">
                    Sudah 7 hari berlalu. Cek ingatanmu (+30 XP)!
                  </div>
                </div>
              </div>
              <span className="font-extrabold text-[var(--world-700)]">Mulai →</span>
            </Link>
          ))}
        </div>
      </div>
    </WorldThemeWrapper>
  );
};
