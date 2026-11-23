import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ListChecks, Shield, Star, Target, X } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { WORLD_METAS } from '@/content/worldMeta';
import { loadWorldBundle } from '@/content/worldLoader';
import { resolveTxt, type Lesson, type Mode, type Profile, type Question, type Step, type World } from '@/content/schema';
import { xpWord } from '@/app/modeConfig';
import { celebrate } from '@/engine/celebrations';
import { evaluateQuestionAnswer, shuffleArray } from '@/engine/queue';
import { playSound } from '@/engine/sound';
import { isWorldUnlocked } from '@/engine/unlock';
import { runSequence, type Cue } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';
import { CountUp } from '@/components/fx/CountUp';
import { KineticText } from '@/components/fx/KineticText';
import { PageLoader } from '@/components/fx/PageLoader';
import { ActionBar, ReadAloudButton } from '@/components/lesson/ActionBar';
import { LevelUpBanner, detectLevelUp } from '@/components/lesson/LessonResult';
import { Bito, type BitoExpression } from '@/components/mascot/Bito';
import { QuestionIntro, QuestionRenderer, useQuestionReader } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { ConfettiBurst } from '@/components/ui/ConfettiBurst';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

interface BossQuestionEntry {
  lessonId: string;
  lessonTitle: string;
  q: Question;
}

interface BossFinish {
  correctCount: number;
  total: number;
  passed: boolean;
  /** Right answers still missing to pass. 0 when passed. */
  gap: number;
  xpEarned: number;
  xpBefore: number;
  reviewLessons: { id: string; title: string }[];
  /** The first world this pass opened, if any. The Map keeps playing its own reveal for it. */
  unlockedWorldId: string | null;
}

type PipState = 'idle' | 'right' | 'wrong';

const at = (ms: number, extra?: Record<string, string>): React.CSSProperties =>
  ({ '--at': `${ms}ms`, ...extra }) as React.CSSProperties;

/** One pip per question: gold and filled when right, dashed when not yet, a thin outline before the answer. */
const Pips: React.FC<{
  states: PipState[];
  /** The Junior wave along the row on a pass (5.9.5 E): each pip hops, 0 then every min(45, 360 / n) ms. */
  wave?: boolean;
  /** A pip that turns gold bumps once (M39). Off on the result, where the wave plays instead. */
  bump?: boolean;
  className?: string;
}> = ({ states, wave = false, bump = false, className = '' }) => {
  const step = Math.min(45, 360 / Math.max(1, states.length));
  return (
    <ol className={`m-0 flex list-none flex-wrap gap-1.5 p-0 ${className}`}>
      {states.map((state, i) => (
        <li
          key={`${i}-${state}`}
          style={wave ? at(Math.round(i * step)) : undefined}
          className={`h-3.5 w-3.5 rounded-[var(--radius-full)] border-2 ${
            state === 'right'
              ? `border-[var(--star)] bg-[var(--star)] ${bump ? 'pw-fx-bump' : ''}`
              : state === 'wrong'
                ? 'border-dashed border-[var(--star)] bg-transparent'
                : 'border-solid border-[var(--line-strong)] bg-transparent'
          } ${wave ? 'pw-fx-hop' : ''}`}
        >
          <span className="visually-hidden">
            Soal {i + 1}: {state === 'right' ? 'benar' : state === 'wrong' ? 'belum tepat' : 'belum dijawab'}
          </span>
        </li>
      ))}
    </ol>
  );
};

/** Which worlds this pass opened: those that require this world and were locked before and are open now. */
function findUnlockedWorld(worldId: string, before: Profile, after: Profile | undefined): string | null {
  if (!after) return null;
  // isWorldUnlocked reads only id, track, order and requires, which WorldMeta has too
  const all = WORLD_METAS as unknown as World[];
  const opened = all.filter(
    (w) => w.requires.includes(worldId) && !isWorldUnlocked(w, before, all) && isWorldUnlocked(w, after, all),
  );
  return opened[0]?.id ?? null;
}

export const BossQuizPage: React.FC = () => {
  const { duniaId = 'a01' } = useParams<{ duniaId: string }>();
  const [searchParams] = useSearchParams();
  const isPlacement = searchParams.get('placement') === '1';
  const navigate = useNavigate();

  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const completeBoss = useAppStore((s) => s.completeBoss);

  const [world, setWorld] = useState<World | null>(null);
  const [worldLessons, setWorldLessons] = useState<Lesson[]>([]);
  const [bank, setBank] = useState<BossQuestionEntry[]>([]);
  const [started, setStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  /** Each answer is judged when the learner moves on, so the pips can show it (M39). Nothing explains it yet. */
  const [judged, setJudged] = useState<Record<string, boolean>>({});
  const [shieldHit, setShieldHit] = useState(0);
  const [finishedResult, setFinishedResult] = useState<BossFinish | null>(null);

  const mode: Mode = profile?.mode ?? 'junior';

  const buildBossBank = (w: World, lessonsList: Lesson[]): BossQuestionEntry[] => {
    const visibleLessons = lessonsList.filter((l) => !l.isSideQuest && l.modes.includes(mode));
    const targetCount = mode === 'junior' ? w.boss.junior.count : w.boss.pro.count;
    const picked: BossQuestionEntry[] = [];
    const seenIds = new Set<string>();

    // Minimal 1 soal per pelajaran (7.5)
    for (const l of visibleLessons) {
      const qs = l.steps
        .filter((s): s is Extract<Step, { kind: 'question' }> => s.kind === 'question')
        .map((s) => s.q)
        .filter((q) => !q.modes || q.modes.includes(mode));
      const shuffled = shuffleArray(qs);
      if (shuffled[0]) {
        picked.push({ lessonId: l.id, lessonTitle: l.title, q: shuffled[0] });
        seenIds.add(shuffled[0].id);
      }
    }

    // Lengkapi dari sisa bank soal dunia
    const pool: BossQuestionEntry[] = [];
    for (const l of visibleLessons) {
      for (const s of l.steps) {
        if (s.kind === 'question' && (!s.q.modes || s.q.modes.includes(mode)) && !seenIds.has(s.q.id)) {
          pool.push({ lessonId: l.id, lessonTitle: l.title, q: s.q });
        }
      }
    }
    for (const extra of shuffleArray(pool)) {
      if (picked.length >= targetCount) break;
      picked.push(extra);
    }

    return shuffleArray(picked).slice(0, targetCount);
  };

  useEffect(() => {
    loadWorldBundle(duniaId).then((bundle) => {
      setWorld(bundle.world);
      setWorldLessons(bundle.lessons);
      setBank(buildBossBank(bundle.world, bundle.lessons));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duniaId, mode]);

  const currentEntry = bank[currentIdx];
  const reader = useQuestionReader({
    mode,
    autoRead: Boolean(profile?.settings.autoReadAloud),
    question: started && !finishedResult ? (currentEntry?.q ?? null) : null,
    stepKey: `${started}-${currentIdx}-${bank.length}`,
    shownOrder: currentEntry?.q.type === 'order' && Array.isArray(answers[currentEntry.q.id]) ? (answers[currentEntry.q.id] as string[]) : undefined,
  });

  if (!profile) return null;
  if (!world) return <PageLoader label="Bito sedang menyiapkan tantangan…" />;

  const handleNextOrFinish = () => {
    if (!currentEntry) return;
    reader.stop();
    const ok = evaluateQuestionAnswer(currentEntry.q, answers[currentEntry.q.id]);
    const nextJudged = { ...judged, [currentEntry.q.id]: ok };
    setJudged(nextJudged);
    if (ok) setShieldHit((n) => n + 1);

    if (currentIdx + 1 < bank.length) {
      setCurrentIdx((i) => i + 1);
      return;
    }

    let correctCount = 0;
    const wrongLessonsMap = new Map<string, string>();
    for (const item of bank) {
      if (evaluateQuestionAnswer(item.q, answers[item.q.id])) {
        correctCount += 1;
      } else {
        wrongLessonsMap.set(item.lessonId, item.lessonTitle);
      }
    }

    const ratio = bank.length > 0 ? correctCount / bank.length : 0;
    const passed = ratio >= world.boss.passRatio;
    const needed = Math.ceil(world.boss.passRatio * bank.length - 1e-9);

    const allTrackAPassed =
      world.track === 'A' &&
      ['a01', 'a02', 'a03', 'a04', 'a05', 'a06', 'a07', 'a08', 'a09', 'a10', 'a11', 'a12']
        .filter((id) => id !== world.id)
        .every((id) => profile.bosses[id]?.passed) &&
      passed;

    const xpBefore = profile.xp;
    const res = completeBoss({
      worldId: world.id,
      scoreRatio: ratio,
      passed,
      isPlacement,
      worldLessonIds: world.lessons,
      anchorMaxCount: world.anchors[mode].length,
      allTrackAPassed,
      isFinalB10Passed: world.id === 'b10' && passed,
    });

    // World-unlock detection (8.5): the worlds that need this one and open now. Not marked seen: the Map plays its reveal.
    const state = useAppStore.getState();
    const unlockedWorldId = passed
      ? findUnlockedWorld(world.id, profile, state.profiles[state.activeProfileId])
      : null;

    setFinishedResult({
      correctCount,
      total: bank.length,
      passed,
      gap: passed ? 0 : Math.max(1, needed - correctCount),
      xpEarned: res.xpEarned,
      xpBefore,
      reviewLessons: [...wrongLessonsMap.entries()].map(([id, title]) => ({ id, title })).slice(0, 3),
      unlockedWorldId,
    });
  };

  const retry = () => {
    setBank(buildBossBank(world, worldLessons));
    setAnswers({});
    setJudged({});
    setShieldHit(0);
    setCurrentIdx(0);
    setFinishedResult(null);
  };

  /* ---- Result ---- */
  if (finishedResult) {
    return (
      <WorldThemeWrapper worldId={world.id} className="mx-auto max-w-[680px] px-4 py-8">
        <BossResult
          world={world}
          mode={mode}
          bank={bank}
          answers={answers}
          result={finishedResult}
          soundEnabled={profile.settings.soundEnabled}
          mascot={profile.mascot}
          onContinue={() =>
            navigate(
              isPlacement || profile.assessments[world.id]?.post ? `/peta/${world.track}` : `/tes/${world.id}/akhir`,
            )
          }
          onRetry={retry}
          onBack={() => navigate(`/dunia/${world.id}`)}
          onLesson={(id) => navigate(`/belajar/${id}`)}
          isPlacement={isPlacement}
        />
      </WorldThemeWrapper>
    );
  }

  /* ---- Intro (M38) ---- */
  if (!started) {
    const pass = Math.round(world.boss.passRatio * 100);
    const chips = [
      { Icon: ListChecks, text: `${bank.length} soal` },
      { Icon: Target, text: `Lulus ${pass}%` },
      { Icon: Star, text: `+50 ${xpWord(mode)}` },
    ];
    return (
      <WorldThemeWrapper worldId={world.id}>
        <div className="pw-boss flex min-h-[100dvh] flex-col items-center justify-center gap-5 !rounded-none px-5 py-10 text-center">
          <div
            className="pw-sticker pw-fx-stamp flex h-28 w-28 items-center justify-center bg-[var(--boss)] text-[var(--star)]"
            style={at(0, { '--stamp-from': '1.4' })}
          >
            <Shield className="h-16 w-16" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span className="pw-kicker">Tantangan penjaga</span>
          {mode === 'junior' ? (
            <KineticText as="h1" text={world.boss.title} className="pw-h1" at={200} />
          ) : (
            <h1 className="pw-h1 pw-fx-rise" style={at(200, { '--fx-dur': '220ms' })}>
              {world.boss.title}
            </h1>
          )}
          <div className="max-w-[44ch] rounded-[var(--radius-lg)] bg-[var(--paper-raised)] px-5 py-4 text-left text-[var(--ink)]">
            <p className="pw-small m-0 font-extrabold text-[var(--ink-2)]">{world.boss.guardianName}</p>
            <p className="pw-body m-0">{resolveTxt(world.boss.greeting, mode)}</p>
          </div>
          <ul className="pw-stagger m-0 flex list-none flex-wrap justify-center gap-2 p-0">
            {chips.map(({ Icon, text }, i) => (
              <li
                key={text}
                style={at(420 + [0, 50, 90][i])}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-full)] border border-[var(--line-strong)] px-3 py-1.5 pw-small font-bold"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
          <div className="w-full max-w-[360px] space-y-2.5">
            <Button
              variant="primary"
              fullWidth
              soundEnabled={profile.settings.soundEnabled}
              onClick={() => setStarted(true)}
              className="!bg-[var(--star)] !text-[var(--on-star)] [--edge-color:var(--star-700)]"
            >
              Mulai Tantangan →
            </Button>
            <Button
              variant="ghost"
              fullWidth
              onClick={() => navigate(`/dunia/${world.id}`)}
              className="!text-[var(--on-boss)]"
            >
              Nanti saja
            </Button>
          </div>
        </div>
      </WorldThemeWrapper>
    );
  }

  if (!currentEntry) return <PageLoader label="Bito sedang menyiapkan tantangan…" />;

  /* ---- Quiz ---- */
  const currentVal = answers[currentEntry.q.id];
  const hasVal =
    (currentVal !== undefined && currentVal !== '' && !(Array.isArray(currentVal) && currentVal.length === 0)) ||
    currentEntry.q.type === 'order';
  const pipStates: PipState[] = bank.map((b) =>
    b.q.id in judged ? (judged[b.q.id] ? 'right' : 'wrong') : 'idle',
  );
  const lastRight = shieldHit > 0;

  return (
    <WorldThemeWrapper worldId={world.id} className="mx-auto flex min-h-[100dvh] max-w-[720px] flex-col px-4 py-4">
      <header className="mb-5 flex items-center gap-3 pw-safe-top">
        <button
          type="button"
          onClick={() => navigate(`/dunia/${world.id}`)}
          aria-label="Keluar Tantangan Penjaga"
          data-sfx="back"
          className="pw-pressable flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[var(--radius-full)] border border-[var(--line)] bg-[var(--paper)] cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <span
          key={shieldHit}
          className={`pw-sticker flex h-10 w-10 flex-shrink-0 items-center justify-center bg-[var(--boss)] text-[var(--star)] ${
            lastRight ? 'pw-fx-hit' : ''
          }`}
        >
          <Shield className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <Pips states={pipStates} bump />
        </div>
        <span className="pw-small flex-shrink-0 font-extrabold text-[var(--ink-2)]">
          Soal {currentIdx + 1} dari {bank.length}
        </span>
      </header>

      <main className="flex flex-1 flex-col">
        <div
          key={currentEntry.q.id}
          data-enter={currentIdx > 0 ? 'right' : undefined}
          data-rm="fade"
          className={`flex flex-1 flex-col gap-5 ${currentIdx > 0 ? 'pw-enter' : ''}`}
        >
          <QuestionIntro
            question={currentEntry.q}
            mode={mode}
            kicker={`${world.boss.guardianName} · soal ${currentIdx + 1}`}
            reading={reader.reading}
            action={reader.canSpeak ? <ReadAloudButton mode={mode} speaking={reader.speaking} onToggle={reader.toggle} /> : undefined}
          />
          <QuestionRenderer
            question={currentEntry.q}
            mode={mode}
            value={currentVal}
            onChange={(val) => setAnswers((a) => ({ ...a, [currentEntry.q.id]: val }))}
            reading={reader.reading}
            withContext={false}
          />
        </div>
      </main>

      <ActionBar
        mode={mode}
        primaryLabel={currentIdx + 1 < bank.length ? 'Soal berikutnya →' : 'Selesaikan Tantangan ✓'}
        onPrimary={handleNextOrFinish}
        primaryDisabled={!hasVal}
        soundEnabled={profile.settings.soundEnabled}
        focusKey={currentIdx}
      />
    </WorldThemeWrapper>
  );
};

/* ------------------------------------------------------------------------------------------------
 * The result: the gate opens (M40) or "Sedikit lagi!" rises calmly (M41)
 * ---------------------------------------------------------------------------------------------- */

const BossResult: React.FC<{
  world: World;
  mode: Mode;
  bank: BossQuestionEntry[];
  answers: Record<string, unknown>;
  result: BossFinish;
  soundEnabled: boolean;
  mascot: Profile['mascot'];
  isPlacement: boolean;
  onContinue: () => void;
  onRetry: () => void;
  onBack: () => void;
  onLesson: (id: string) => void;
}> = ({ world, mode, bank, answers, result, soundEnabled, mascot, isPlacement, onContinue, onRetry, onBack, onLesson }) => {
  const pro = mode === 'pro';
  const rootRef = useRef<HTMLDivElement>(null);
  const seamRef = useRef<HTMLSpanElement>(null);
  const [skipped, setSkipped] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [bito, setBito] = useState<BitoExpression>(result.passed ? 'cheer' : 'think');
  const [banner, setBanner] = useState(false);

  const verdicts = useMemo(() => bank.map((b) => evaluateQuestionAnswer(b.q, answers[b.q.id])), [bank, answers]);
  const pips: PipState[] = verdicts.map((ok) => (ok ? 'right' : 'wrong'));
  const level = detectLevelUp(result.xpBefore, result.xpEarned, mode);
  const word = xpWord(mode);
  const pct = result.total > 0 ? Math.round((result.correctCount / result.total) * 100) : 0;

  // Times are Junior ms (runSequence and the CSS scale them for Pro). Pro: the gate opens from 0 and there is no wave.
  const GATE_AT = pro ? 0 : 420;
  const CONFETTI_AT = pro ? 200 : 700;
  const HEADLINE_AT = pro ? 0 : 760;
  const XP_AT = pro ? 360 : 900;
  const END_AT = pro ? 1100 : 1700;

  const latest = useRef({ result, level, soundEnabled, pro });
  latest.current = { result, level, soundEnabled, pro };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const cur = latest.current;
    const cues: Cue[] = [];

    if (cur.result.passed) {
      cues.push({
        at: GATE_AT,
        run: ({ skipped: s }) => {
          if (!s) playSound('unlock', cur.soundEnabled);
        },
      });
      cues.push({
        at: CONFETTI_AT,
        run: ({ skipped: s }) => {
          if (!s) setConfetti(true);
        },
      });
    } else {
      // "Bito goes think, then happy": the second face arrives once the first has been seen
      cues.push({ at: 700, run: () => setBito('happy') });
    }
    // The last cue: celebrations are queued here, after the sequence, level-up before world unlock (celebrations.ts)
    cues.push({
      at: END_AT,
      run: ({ skipped: s }) => {
        if (s) setSkipped(true);
        if (cur.level.leveledUp) {
          if (cur.pro) setBanner(true);
          else celebrate({ kind: 'levelUp', level: cur.level.after.level, title: cur.level.after.title });
        }
        if (cur.result.passed && cur.result.unlockedWorldId) {
          celebrate({ kind: 'worldUnlock', worldId: cur.result.unlockedWorldId });
        }
      },
    });

    const handle = runSequence(root, cues);
    return () => handle.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const missed = bank.map((entry, idx) => ({ entry, idx, ok: verdicts[idx] })).filter((r) => !r.ok);
  const reviewRows = result.passed ? bank.map((entry, idx) => ({ entry, idx, ok: verdicts[idx] })) : missed;

  return (
    <div ref={rootRef} data-rm="fade" className="pw-seq">
      <ConfettiBurst active={confetti} origin={seamRef} />
      {banner && <LevelUpBanner before={level.before} after={level.after} />}

      {result.passed && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
          <div
            data-side="l"
            style={at(GATE_AT)}
            className="pw-fx-gate absolute inset-y-0 left-0 w-1/2 border-r-2 border-[var(--star)] bg-[var(--boss)]"
          />
          <div
            data-side="r"
            style={at(GATE_AT)}
            className="pw-fx-gate absolute inset-y-0 right-0 w-1/2 border-l-2 border-[var(--star)] bg-[var(--boss)]"
          />
          <span ref={seamRef} className="absolute left-1/2 top-[38dvh] h-0 w-0" />
        </div>
      )}

      <div className={`space-y-4 text-center ${result.passed ? '' : 'pw-stagger'}`}>
        <div className="flex flex-col items-center gap-3">
          <Bito expression={bito} size={pro ? 96 : 112} custom={mascot} />
          {result.passed && !pro && (
            <span
              className="pw-sticker pw-fx-bump flex h-14 w-14 items-center justify-center bg-[var(--boss)] text-[var(--star)]"
              style={at(300, { '--bump': '1.15', '--fx-dur': '320ms' })}
            >
              <Shield className="h-8 w-8" aria-hidden="true" />
            </span>
          )}
        </div>

        {result.passed ? (
          <>
            {pro ? (
              <h1 className="pw-display pw-fx-rise" style={at(HEADLINE_AT, { '--fx-dur': '220ms' })}>
                Gerbang terbuka
              </h1>
            ) : (
              <KineticText as="h1" text="Gerbang terbuka!" className="pw-display" at={HEADLINE_AT} />
            )}
            <p className="pw-body-l m-0">
              Kamu menjawab benar {result.correctCount} dari {result.total} soal ({pct}%).
            </p>
            {result.xpEarned > 0 && (
              <p
                className={`pw-fx-rise m-0 inline-block rounded-[var(--radius-full)] bg-[var(--star)] px-4 py-1 font-extrabold text-[var(--on-star)] ${
                  pro ? 'font-mono tabular-nums' : ''
                }`}
                style={at(XP_AT)}
              >
                <CountUp value={result.xpEarned} prefix="+" suffix={` ${word}`} delay={XP_AT} duration={600} skip={skipped} />
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="pw-display">{pro ? 'Sedikit lagi' : 'Sedikit lagi!'}</h1>
            <p className="pw-body-l m-0">
              {pro
                ? `Kurang ${result.gap} jawaban benar.`
                : `Kurang ${result.gap} jawaban benar untuk membuka gerbang.`}
            </p>
            <Pips states={pips} className="justify-center" />
            <p className="pw-small m-0 text-[var(--ink-2)]">
              Kamu menjawab benar {result.correctCount} dari {result.total} soal ({pct}%).
            </p>
          </>
        )}
      </div>

      {result.passed && (
        <div className="mt-4 flex justify-center">
          <Pips states={pips} wave={!pro} />
        </div>
      )}

      {/* Pembahasan lengkap di akhir (9.6): a well per question, with an icon and a word for its status */}
      <div className={`mt-6 space-y-3 ${result.passed ? '' : 'pw-stagger'}`}>
        <h2 className="pw-h3">Pembahasan Soal</h2>
        {reviewRows.length === 0 && <p className="pw-small m-0 text-[var(--ink-2)]">Semua soal sudah benar.</p>}
        {reviewRows.map(({ entry, idx, ok }) => (
          <div
            key={entry.q.id}
            className={`pw-well border-2 ${ok ? 'border-solid border-[var(--ok-500)]' : 'border-dashed border-[var(--warn-500)]'}`}
          >
            <div className="pw-small inline-flex items-center gap-1.5 font-extrabold">
              <span aria-hidden="true">{ok ? '✓' : '↺'}</span>
              Soal {idx + 1} · {ok ? 'Benar' : 'Belum tepat'}
            </div>
            <div className="mt-1 font-bold">{resolveTxt(entry.q.prompt, mode)}</div>
            <p className="pw-small m-0 mt-1 text-[var(--ink-2)]">{resolveTxt(entry.q.explainCorrect, mode)}</p>
          </div>
        ))}
      </div>

      {!result.passed && result.reviewLessons.length > 0 && (
        <div className="pw-card mt-6 space-y-2 p-4">
          <h3 className="pw-h3">Pelajaran yang bisa kamu lihat lagi:</h3>
          <div className="flex flex-wrap gap-2">
            {result.reviewLessons.map((rl) => (
              <Button key={rl.id} variant="secondary" onClick={() => onLesson(rl.id)}>
                {rl.title} →
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* The buttons are in the DOM and focusable from frame 0. One tap skips the sequence and activates the button. */}
      <div className="mt-6 space-y-3 pb-8">
        {result.passed ? (
          <Button variant="primary" fullWidth soundEnabled={soundEnabled} onClick={onContinue}>
            {isPlacement ? 'Lanjut ke Peta Dunia →' : 'Lanjut ke Cek Kemajuan Akhir →'}
          </Button>
        ) : (
          <>
            <Button variant="primary" fullWidth soundEnabled={soundEnabled} onClick={onRetry}>
              Coba lagi
            </Button>
            <Button variant="secondary" fullWidth data-sfx="back" onClick={onBack}>
              Kembali ke {world.title}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
