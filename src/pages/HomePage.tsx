import React, { useEffect, useRef, useState } from 'react';
import { Check, Layers, Shield, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { WORLD_METAS, WORLD_META_BY_ID } from '@/content/worldMeta';
import { STICKERS, STICKERS_BY_ID } from '@/content/stickers';
import { resolveTxt } from '@/content/schema';
import { loadWorldBundle, prefetchWorldBundle } from '@/content/worldLoader';
import { COLLECTION_LABEL, MODE_LABEL, WARMUP_CAP, levelLabel, xpWord } from '@/app/modeConfig';
import { formatLocalDate, getConsecutiveTargetWeeks } from '@/engine/date';
import { useDueReviewCount } from '@/content/reviewCards';
import { getLevelFromXp } from '@/engine/scoring';
import { playSound } from '@/engine/sound';
import { getDueRetainWorlds, getNextRecommendedAction } from '@/engine/unlock';
import { fx } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';
import { LESSON_STUBS, WORLD_STUBS } from '@/components/map/MapPath';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { Annot } from '@/components/fx/Annot';
import { Doodle } from '@/components/fx/Doodle';
import { Bito } from '@/components/mascot/Bito';
import { CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { PetLauncher } from '@/components/pet/PetLauncher';
import { Button } from '@/components/ui/Button';
import { Poster, PosterHeading } from '@/components/ui/Poster';
import { StorageWarningBanner } from '@/components/ui/StorageWarningBanner';
import { WeekDots } from '@/components/ui/WeekDots';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

/** Bito waves on the first Home mount after the app opens, and not again until the next page load (M45). */
let homeWaveDone = false;

/** "Aku bisa …" and "Kamu bisa …" lose their opening, so it reads "Setelah ini kamu bisa: …". */
function objectiveClause(text: string): string {
  const clause = text.replace(/^\s*(aku|kamu)\s+bisa\s+/i, '').trim();
  return clause.charAt(0).toLowerCase() + clause.slice(1);
}

/** Small round pips: one per step, filled up to the step the learner left. Decorative. */
const StepPips: React.FC<{ done: number; total: number }> = ({ done, total }) => (
  <span aria-hidden="true" className="inline-flex items-center gap-1">
    {Array.from({ length: total }, (_, i) => (
      <span
        key={i}
        className={`h-2 w-2 rounded-full border border-[var(--on-poster)] ${i < done ? 'bg-[var(--on-poster)]' : ''}`}
      />
    ))}
  </span>
);

/** The prompt glyph's caret (Pro): blinks four times, then rests. WAAPI, so it is a one-off and honours reduced motion. */
const Caret: React.FC = () => {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const blinks = [0, 1, 2, 3].map((i) =>
      fx(
        el,
        [
          { opacity: 1, offset: 0 },
          { opacity: 0, offset: 0.5 },
          { opacity: 1, offset: 1 },
        ],
        { duration: 800, easing: 'steps(1, end)', delay: 600 + i * 800 },
      ),
    );
    return () => blinks.forEach((a) => a?.cancel());
  }, []);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="ml-1 inline-block h-[0.9em] w-[0.12em] translate-y-[0.1em] bg-current align-baseline"
    />
  );
};

export const HomePage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  if (!profile) return null;
  return <HomeContent />;
};

const HomeContent: React.FC = () => {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId])!;
  const junior = profile.mode === 'junior';
  const soundEnabled = profile.settings.soundEnabled;

  const nextAction = getNextRecommendedAction(profile, WORLD_STUBS, LESSON_STUBS);
  const heroWorld = WORLD_META_BY_ID[nextAction.worldId] ?? WORLD_METAS[0];
  const heroLesson = nextAction.lessonId ? heroWorld.lessons.find((l) => l.id === nextAction.lessonId) : undefined;

  const todayStr = formatLocalDate();
  const dueCardsCount = useDueReviewCount(profile, todayStr);
  const studiedToday = Object.values(profile.weeks).some((dates) => dates.includes(todayStr));
  const dueRetainWorlds = getDueRetainWorlds(profile, WORLD_STUBS, todayStr);
  const levelInfo = getLevelFromXp(profile.xp, profile.mode);
  const consecutiveWeeks = getConsecutiveTargetWeeks(profile.weeks, profile.settings.weeklyTarget);
  const completedLessons = Object.values(profile.lessons).filter((l) => l.completedAt).length;
  const collection = COLLECTION_LABEL[profile.mode];

  const warmup = dueCardsCount > 0 && !studiedToday && nextAction.type === 'lesson';
  const warmupCount = Math.min(dueCardsCount, WARMUP_CAP[profile.mode]);
  const resuming = nextAction.type === 'lesson' && nextAction.stepIndex !== undefined;

  // Lesson details that need the world chunk: the objective (Pro hook) and the step count (resume pips).
  // The chunk is the one the lesson opens anyway, so this adds no new kind of request.
  const [lessonInfo, setLessonInfo] = useState<{ id: string; steps: number; objective: string } | null>(null);
  const heroLessonId = heroLesson?.id;
  const needsLessonInfo = Boolean(heroLessonId) && (!junior || resuming);
  useEffect(() => {
    if (!heroLessonId || !needsLessonInfo) return;
    let cancelled = false;
    loadWorldBundle(heroWorld.id)
      .then((bundle) => {
        const lesson = bundle.lessons.find((l) => l.id === heroLessonId);
        if (!cancelled && lesson) {
          setLessonInfo({
            id: heroLessonId,
            steps: lesson.steps.length,
            objective: resolveTxt(lesson.objective, profile.mode),
          });
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [heroLessonId, heroWorld.id, needsLessonInfo, profile.mode]);
  const info = lessonInfo && lessonInfo.id === heroLessonId ? lessonInfo : null;

  // Idle prefetch of the world of the next action and the world after it (8.2). Skipped on Data Saver.
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    const ordered = [...WORLD_STUBS].sort((a, b) =>
      a.track !== b.track ? a.track.localeCompare(b.track) : a.order - b.order,
    );
    const at = ordered.findIndex((w) => w.id === heroWorld.id);
    const ids = [heroWorld.id, ordered[at + 1]?.id].filter((id): id is string => Boolean(id));
    const run = () => ids.forEach(prefetchWorldBundle);
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(run, { timeout: 2000 });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = window.setTimeout(run, 2000);
    return () => window.clearTimeout(timer);
  }, [heroWorld.id]);

  // Bito waves once on the first Home mount after the app opens (Junior)
  const [bitoExpression, setBitoExpression] = useState<'idle' | 'wave'>('idle');
  useEffect(() => {
    if (!junior || homeWaveDone) return;
    const start = window.setTimeout(() => {
      homeWaveDone = true;
      setBitoExpression('wave');
    }, 400);
    const stop = window.setTimeout(() => setBitoExpression('idle'), 1500);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(stop);
    };
  }, [junior]);

  const goToLesson = () => navigate(`/belajar/${nextAction.lessonId}`);

  const handlePrimaryAction = () => {
    if (warmup) {
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
      goToLesson();
    } else {
      navigate('/peta/A');
    }
  };

  // The pre/post-test name lives in the kicker; the title is the world's own name.
  const heroTitle =
    nextAction.type === 'pretest' || nextAction.type === 'posttest'
      ? heroWorld.title
      : nextAction.type === 'boss'
        ? `Tantangan ${heroWorld.guardianName}`
        : nextAction.type === 'done'
          ? junior
            ? 'Semua dunia selesai!'
            : 'Semua Dunia Selesai'
          : (heroLesson?.title ?? heroWorld.title);

  const testKicker =
    nextAction.type === 'pretest'
      ? junior
        ? 'Tebak-tebakan Awal'
        : 'Cek Titik Awal'
      : nextAction.type === 'posttest'
        ? junior
          ? 'Tebak-tebakan Lagi'
          : 'Cek Kemajuan'
        : null;
  const kickerText =
    nextAction.type === 'done'
      ? 'Selesai'
      : testKicker
        ? junior
          ? testKicker
          : `${testKicker} · ${heroWorld.id.toUpperCase()}`
        : junior
          ? `Lanjutkan · ${heroWorld.title}`
          : `Lanjut · ${heroWorld.id.toUpperCase()}`;

  // Junior labels are four words at most. Pro keeps its existing labels, except the warm-up one.
  let primaryCtaText: string;
  if (warmup) {
    primaryCtaText = junior ? 'Pemanasan dulu →' : `Ulang ${warmupCount} kartu, lalu lanjut →`;
  } else if (nextAction.type === 'pretest') {
    primaryCtaText = junior ? 'Mulai tebak-tebakan →' : 'Mulai Cek Titik Awal →';
  } else if (nextAction.type === 'posttest') {
    primaryCtaText = junior ? 'Lihat kemajuanmu →' : 'Lihat Kemajuanmu →';
  } else if (nextAction.type === 'boss') {
    primaryCtaText = junior ? 'Hadapi Penjaga →' : 'Hadapi Penjaga Dunia →';
  } else if (nextAction.type === 'done') {
    primaryCtaText = junior ? 'Jelajahi peta →' : 'Jelajahi Peta Dunia →';
  } else if (junior) {
    primaryCtaText = completedLessons === 0 && !resuming ? 'Ayo mulai →' : 'Lanjut belajar →';
  } else {
    primaryCtaText = nextAction.stepIndex ? `Lanjutkan (Langkah ${nextAction.stepIndex + 1}) →` : 'Lanjutkan →';
  }

  // One hook, by mode (8.2)
  const heroLessonsVisible = heroWorld.lessons.filter((l) => l.modes.includes(profile.mode));
  const lessonsLeft = heroLessonsVisible.filter((l) => !profile.lessons[l.id]?.completedAt).length;
  let hook: React.ReactNode = null;
  if (junior) {
    const text =
      nextAction.type === 'boss'
        ? 'Penjaga menunggu!'
        : nextAction.type === 'lesson' || nextAction.type === 'pretest'
          ? `${lessonsLeft} pelajaran lagi → Penjaga`
          : nextAction.type === 'posttest'
            ? 'Lihat seberapa jauh kamu melangkah.'
            : 'Kamu sudah menjelajahi semuanya!';
    const showMeter = (nextAction.type === 'lesson' || nextAction.type === 'pretest' || nextAction.type === 'boss') && heroLessonsVisible.length > 0;
    hook = (
      <div className="min-w-0 flex-1 space-y-2">
        <p className="pw-body m-0 flex items-center gap-2 font-extrabold">
          <Shield className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <span>{text}</span>
        </p>
        {showMeter && (
          <div
            role="img"
            aria-label={`${heroLessonsVisible.length - lessonsLeft} dari ${heroLessonsVisible.length} pelajaran selesai`}
            className="flex gap-1.5"
          >
            {heroLessonsVisible.map((l, i) => (
              <span
                key={l.id}
                aria-hidden="true"
                className={`h-2 flex-1 rounded-full border border-[var(--on-poster)] ${
                  i < heroLessonsVisible.length - lessonsLeft ? 'bg-[var(--on-poster)]' : ''
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  } else if (nextAction.type === 'lesson' && info?.objective) {
    hook = (
      <p className="pw-body m-0 min-w-0 flex-1">
        <span className="font-extrabold">Setelah ini kamu bisa:</span> {objectiveClause(info.objective)}
      </p>
    );
  }

  const estMinutes = heroLesson?.estMinutes;
  const showResumePips = resuming && info && info.steps > 0 && info.steps <= 16;

  // Fan of the three most recent stickers (Junior) or concept cards (Pro)
  const recent = profile.stickers.slice(-3).map((id) => STICKERS_BY_ID[id]).filter(Boolean);
  const showStartHere = completedLessons < 3;

  // Junior sticker tile names the next sticker when it is known: the one the next lesson earns, if not owned yet.
  const nextSticker = junior
    ? STICKERS.find((st) => st.lessonId === nextAction.lessonId && !profile.stickers.includes(st.id))
    : undefined;

  const [showAllRetain, setShowAllRetain] = useState(false);
  const retainShown = showAllRetain ? dueRetainWorlds : dueRetainWorlds.slice(0, 1);
  const retainHidden = dueRetainWorlds.length - retainShown.length;

  return (
    <WorldThemeWrapper
      worldId={heroWorld.id}
      className="mx-auto max-w-[1080px] px-[var(--screen-pad)] py-6 sm:px-6"
    >
      <StorageWarningBanner />

      {/* 1. Greeting row */}
      <header className="mb-[var(--gap-group)] flex flex-wrap items-center justify-between gap-[var(--gap-stack)]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="pw-sticker inline-flex flex-shrink-0" style={{ '--tilt': '-3deg' } as React.CSSProperties}>
            <CharacterAvatar avatarId={profile.avatar} size={48} />
          </span>
          <div className="min-w-0">
            <h1 className="pw-h2">Hai, {profile.nickname || MODE_LABEL[profile.mode]}!</h1>
            <p className="pw-small m-0 text-[var(--ink-2)]">{levelInfo.title}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/profil"
            className={`pw-pressable inline-flex min-h-[44px] flex-col justify-center gap-1 rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--paper)] px-3.5 py-1.5 font-extrabold text-[var(--ink)] hover:border-[var(--world-600)] ${
              junior ? '' : 'font-mono tabular-nums'
            }`}
          >
            <span className="pw-small font-extrabold">
              {junior ? levelLabel(levelInfo.level, 'junior') : `${levelLabel(levelInfo.level, 'pro')} · ${profile.xp} ${xpWord('pro')}`}
            </span>
            {!junior && (
              <span aria-hidden="true" className="block h-1 w-full overflow-hidden rounded-full bg-[var(--line)]">
                <span
                  className="pw-fill block h-full w-full rounded-full bg-[var(--star)]"
                  style={{ '--p': levelInfo.progressRatio } as React.CSSProperties}
                />
              </span>
            )}
            {!junior && (
              <span className="text-xs font-bold text-[var(--ink-2)]">
                {levelInfo.nextLevelXp - levelInfo.currentXp} XP lagi ke {levelLabel(levelInfo.level + 1, 'pro')}
              </span>
            )}
          </Link>
          <PetLauncher context={{ surface: 'home' }} />
        </div>
      </header>

      {/* Compact: one column. Expanded (>= 1024 px): poster on the left, the rest on the right. */}
      <div className="grid grid-cols-1 gap-[var(--gap-group)] lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-start">
        {/* 2. Hero poster: the one saturated block and the one primary button */}
        <Poster
          aria-label="Berikutnya"
          className="flex flex-col gap-[var(--gap-stack)]"
        >
          <PosterHeading worldId={heroWorld.id} worldTitle={heroWorld.title}>
            <span className="pw-kicker">{kickerText}</span>
            <h2 className="pw-display mt-1 text-balance">
              {!junior && (
                <span aria-hidden="true" className="mr-2 font-mono font-extrabold">
                  &gt;
                </span>
              )}
              {heroTitle}
              {!junior && <Caret />}
            </h2>
            {(!junior && estMinutes) || showResumePips || (resuming && junior) ? (
              <p className="pw-small mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-bold">
                {!junior && estMinutes ? (
                  <span>± {warmup ? estMinutes + 2 : estMinutes} menit{warmup ? ' dengan pemanasan' : ''}</span>
                ) : null}
                {resuming && (
                  <span className="inline-flex items-center gap-2">
                    langkah {(nextAction.stepIndex ?? 0) + 1}
                    {info && info.steps > 0 ? ` dari ${info.steps}` : ''}
                    {showResumePips && <StepPips done={nextAction.stepIndex ?? 0} total={info!.steps} />}
                  </span>
                )}
              </p>
            ) : null}
          </PosterHeading>

          {/* The hook. Junior: Bito and the quest line to the Guardian. Pro: what you can do after this. */}
          {(junior || hook) && (
            <div className="flex items-end gap-3">
              {junior && (
                <span
                  className="pw-sticker flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center bg-[var(--paper)] [&_svg]:h-full [&_svg]:w-full"
                  style={{ '--tilt': '-4deg' } as React.CSSProperties}
                >
                  <Bito
                    expression={bitoExpression}
                    size={96}
                    pokeable
                    onPoke={() => playSound('bip', soundEnabled)}
                  />
                </span>
              )}
              {hook}
            </div>
          )}

          <div>
            {showStartHere && (
              <div aria-hidden="true" className="flex min-h-11 items-center justify-end gap-2 pr-6">
                <Annot effect="fade" at={700} className="text-[var(--on-poster)]!">
                  {junior ? 'mulai dari sini!' : 'mulai di sini'}
                </Annot>
                {junior ? (
                  <Doodle name="arrow-loop" draw at={400} width={44} rotate={90} style={{ color: 'var(--on-poster)' }} />
                ) : (
                  <Doodle name="arrow" draw at={400} width={44} style={{ color: 'var(--on-poster)' }} />
                )}
              </div>
            )}
            <Button variant="inverse" fullWidth soundEnabled={soundEnabled} onClick={handlePrimaryAction}>
              {primaryCtaText}
            </Button>
            {warmup && junior && (
              <p className="pw-small m-0 mt-2 text-center font-bold">{warmupCount} kartu, lalu lanjut pelajaran</p>
            )}
            {warmup && (
              <div className="mt-1 text-center">
                <Link
                  to={`/belajar/${nextAction.lessonId}`}
                  className="pw-pressable inline-flex min-h-[var(--touch-min)] items-center justify-center rounded-[var(--radius-md)] px-4 font-bold underline underline-offset-4"
                >
                  Langsung ke pelajaran
                </Link>
              </div>
            )}
          </div>
        </Poster>

        {/* Secondary column */}
        <div className="space-y-[var(--gap-group)]">
          {/* 3. Week strip. The consecutive count exists only in Pro, so Junior has no number that can fall to zero. */}
          <WeekDots
            weeks={profile.weeks}
            weeklyTarget={profile.settings.weeklyTarget}
            consecutiveWeeks={junior ? 0 : consecutiveWeeks}
          />

          {/* 4. Two tiles */}
          <div className="grid grid-cols-2 gap-[var(--gap-stack)]">
            <Link
              to="/ulang"
              className="pw-card pw-pressable pw-lift flex flex-col justify-between gap-3 p-4"
              data-press="lg"
            >
              <Layers className="h-5 w-5 text-[var(--world-700)]" aria-hidden="true" />
              <div>
                <div className="font-extrabold">Kotak Ulang</div>
                {dueCardsCount > 0 ? (
                  <>
                    <div className="pw-h1 text-[var(--ink)]">{dueCardsCount}</div>
                    <div className="pw-small text-[var(--ink-2)]">kartu siap diulang</div>
                  </>
                ) : (
                  <div className="pw-small mt-1 inline-flex items-center gap-1 font-bold text-[var(--ok-600)]">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Semua aman
                  </div>
                )}
                {junior && <div className="pw-small mt-1 text-[var(--ink-2)]">ulang supaya tidak lupa</div>}
              </div>
            </Link>

            <Link
              to="/stiker"
              className="pw-card pw-pressable pw-lift flex flex-col justify-between gap-3 p-4"
              data-press="lg"
            >
              <span aria-hidden="true" className="relative block h-14 w-full">
                {(recent.length > 0 ? recent : [undefined, undefined, undefined]).map((st, i) => (
                  <span
                    key={st?.id ?? i}
                    className="pw-sticker pw-sticker-card absolute top-1 flex h-12 w-12 items-center justify-center overflow-hidden bg-[var(--paper)]"
                    data-locked={st ? undefined : 'true'}
                    style={
                      {
                        left: i * 26,
                        '--tilt': `${(i - 1) * 7}deg`,
                      } as React.CSSProperties
                    }
                  >
                    {st && <WorldIslandIllustration worldId={st.worldId} size={40} />}
                  </span>
                ))}
              </span>
              <div>
                <div className="font-extrabold">{collection.title}</div>
                <div className="pw-small text-[var(--ink-2)]">
                  {nextSticker
                    ? `Stiker berikutnya: ${nextSticker.title}`
                    : `${profile.stickers.length} dari ${STICKERS.length} ${collection.unit}`}
                </div>
              </div>
            </Link>
          </div>

          {/* 5. Retention test cards: at most one, the rest behind "+N lagi" */}
          {retainShown.length > 0 && (
            <div className="space-y-[var(--gap-stack)]">
              {retainShown.map((w) => (
                <WorldThemeWrapper key={w.id} worldId={w.id}>
                  <Link
                    to={`/tes/${w.id}/ingat`}
                    className="pw-card pw-pressable flex items-stretch overflow-hidden"
                    data-press="lg"
                  >
                    <span
                      aria-hidden="true"
                      className="flex w-14 flex-shrink-0 items-center justify-center bg-[var(--world-50)]"
                    >
                      <Sparkles className="h-5 w-5 text-[var(--world-700)]" />
                    </span>
                    <span className="flex min-w-0 flex-1 items-center justify-between gap-3 p-4">
                      <span className="min-w-0">
                        <span className="block font-extrabold">Masih ingat {w.title}?</span>
                        <span className="pw-small block text-[var(--ink-2)]">
                          Sudah 7 hari. Cek ingatanmu (+30 {xpWord(profile.mode)}).
                        </span>
                      </span>
                      <span className="flex-shrink-0 font-extrabold text-[var(--world-700)]">Mulai →</span>
                    </span>
                  </Link>
                </WorldThemeWrapper>
              ))}
              {retainHidden > 0 && (
                <button
                  type="button"
                  aria-expanded={showAllRetain}
                  onClick={() => setShowAllRetain(true)}
                  className="pw-btn-ghost"
                >
                  +{retainHidden} lagi
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </WorldThemeWrapper>
  );
};
