import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Layers, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { WORLDS_BY_ID, ALL_LESSONS } from '@/content/curriculum';
import type { Mode, Question } from '@/content/schema';
import { visibleReviewCards } from '@/content/reviewCards';
import { WARMUP_CAP, xpWord } from '@/app/modeConfig';
import { getAnswerExplanation } from '@/engine/answerFeedback';
import { celebrate } from '@/engine/celebrations';
import { formatLocalDate } from '@/engine/date';
import { getBoxDistribution, getDueLeitnerCards } from '@/engine/leitner';
import { evaluateQuestionAnswer, shuffleArray } from '@/engine/queue';
import {
  createVisibleTimer,
  formatDuration,
  kilatRecordKey,
  recordAttempt,
  type RecordResult,
  type VisibleTimer,
} from '@/engine/records';
import { playSound } from '@/engine/sound';
import { runSequence } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';
import { Annot } from '@/components/fx/Annot';
import { CountUp } from '@/components/fx/CountUp';
import { ActionBar, ReadAloudButton } from '@/components/lesson/ActionBar';
import { FeedbackSheet, feedbackTitle } from '@/components/lesson/FeedbackSheet';
import { LevelUpBanner, detectLevelUp } from '@/components/lesson/LessonResult';
import { Bito } from '@/components/mascot/Bito';
import { PetLauncher } from '@/components/pet/PetLauncher';
import {
  ALMOST_RATIO,
  QuestionIntro,
  QuestionRenderer,
  judgeParts,
  useQuestionReader,
} from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface ReviewEntry {
  cardId: string;
  originLabel: string;
  q: Question;
}

interface SessionDone {
  reviewed: number;
  xpEarned: number;
  xpBefore: number;
  upgraded: number;
  free: boolean;
  /** Pro "Kilat": the stopwatch time and this attempt against the best for the same session size. */
  kilat: { ms: number; result: RecordResult } | null;
}

const BOX_INTERVAL = ['1 hr', '2 hr', '4 hr', '7 hr', '14+ hr'] as const;

/** Five box shelves, each drawn as a stack of card sticks with its count (8.11). */
const BoxStacks: React.FC<{ boxes: Record<1 | 2 | 3 | 4 | 5, number> }> = ({ boxes }) => (
  <ol className="m-0 grid list-none grid-cols-5 gap-2 p-0 text-center">
    {([1, 2, 3, 4, 5] as const).map((boxNum) => {
      const count = boxes[boxNum];
      const sticks = Math.min(count, 4);
      return (
        <li key={boxNum} className="flex flex-col items-center gap-1">
          <div className="relative h-[52px] w-full" aria-hidden="true">
            {sticks === 0 ? (
              <span className="absolute inset-x-1 bottom-0 h-3 rounded-[var(--radius-xs)] border-2 border-dashed border-[var(--line-strong)]" />
            ) : (
              Array.from({ length: sticks }, (_, i) => (
                <span
                  key={i}
                  className="absolute inset-x-1 h-3 rounded-[var(--radius-xs)] border border-[var(--line-strong)] bg-[var(--paper)] shadow-[var(--elev-1)]"
                  style={{ bottom: i * 10 }}
                />
              ))
            )}
          </div>
          <div className="pw-h2">{count}</div>
          <div className="text-xs font-extrabold text-[var(--ink-2)]">Kotak {boxNum}</div>
          <div className="text-[11px] text-[var(--ink-3)]">{BOX_INTERVAL[boxNum - 1]}</div>
        </li>
      );
    })}
  </ol>
);

const formatClock = (ms: number): string => {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const ReviewBoxPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nextRoute = searchParams.get('next');

  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const answerLeitnerCard = useAppStore((s) => s.answerLeitnerCard);
  const completeLeitnerSession = useAppStore((s) => s.completeLeitnerSession);

  const [sessionCards, setSessionCards] = useState<ReviewEntry[]>([]);
  const [isFreePractice, setIsFreePractice] = useState(false);
  const [activeSession, setActiveSession] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answerVal, setAnswerVal] = useState<unknown>(undefined);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string; almost: boolean } | null>(null);
  const [upgradedCount, setUpgradedCount] = useState(0);
  const [sessionDone, setSessionDone] = useState<SessionDone | null>(null);

  // Pro "Kilat": a stopwatch that counts up. Never a countdown, nothing is cut short. Junior has no clock.
  const [kilat, setKilat] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<VisibleTimer | null>(null);
  const correctRef = useRef(0);
  const promptRef = useRef<HTMLHeadingElement>(null);

  const mode: Mode = profile?.mode ?? 'junior';
  const current = activeSession ? sessionCards[idx] : undefined;

  const reader = useQuestionReader({
    mode,
    autoRead: Boolean(profile?.settings.autoReadAloud),
    question: current && !feedback ? current.q : null,
    stepKey: `${activeSession}-${idx}`,
    shownOrder: current?.q.type === 'order' && Array.isArray(answerVal) ? (answerVal as string[]) : undefined,
  });

  const library = useMemo(() => {
    const cards = new Map<string, ReviewEntry>();
    const lessonByCard = new Map<string, string>();
    for (const lesson of ALL_LESSONS) {
      const world = WORLDS_BY_ID[lesson.worldId];
      for (const q of visibleReviewCards(lesson, mode)) {
        cards.set(q.id, { cardId: q.id, originLabel: `${world?.title ?? lesson.worldId} · ${lesson.title}`, q });
        lessonByCard.set(q.id, lesson.id);
      }
    }
    return { cards, lessonByCard };
  }, [mode]);
  const dueCards = profile
    ? getDueLeitnerCards(profile.leitner, formatLocalDate(), mode, library.lessonByCard)
        .map(({ cardId }) => library.cards.get(cardId)!)
    : [];

  // The stopwatch ticks once a second: it is only a display, and it runs only while the session does
  useEffect(() => {
    if (!kilat || !activeSession || sessionDone) return undefined;
    const tick = setInterval(() => setElapsed(timerRef.current?.elapsedMs() ?? 0), 1000);
    return () => clearInterval(tick);
  }, [kilat, activeSession, sessionDone]);

  useEffect(() => () => timerRef.current?.dispose(), []);

  useLayoutEffect(() => {
    const prompt = promptRef.current;
    if (!prompt) {
      window.scrollTo(0, 0);
      return;
    }
    prompt.focus({ preventScroll: true });
    prompt.scrollIntoView({ block: 'start', behavior: 'instant' });
  }, [activeSession, idx, sessionDone]);

  if (!profile) return null;

  const boxes = getBoxDistribution(Object.fromEntries(Object.entries(profile.leitner).filter(([id]) => library.cards.has(id))));
  // A warm-up (opened with ?next=) takes WARMUP_CAP cards: 3 in Junior, 5 in Pro. The tile keeps its size.
  const cap = nextRoute ? WARMUP_CAP[mode] : Number.POSITIVE_INFINITY;
  const sessionSize = Math.min(dueCards.length, cap);

  const beginSession = (cards: ReviewEntry[], free: boolean) => {
    setSessionCards(cards);
    setIsFreePractice(free);
    setActiveSession(true);
    setIdx(0);
    setUpgradedCount(0);
    correctRef.current = 0;
    setElapsed(0);
    timerRef.current?.dispose();
    timerRef.current = mode === 'pro' && kilat ? createVisibleTimer(0) : null;
  };

  const freePool = [...library.cards.values()].filter(({ cardId }) => {
    const lessonId = library.lessonByCard.get(cardId);
    return lessonId && Boolean(profile.lessons[lessonId]?.completedAt);
  });
  const practiceCount = Math.min(10, freePool.length);
  const startFreePractice = () => beginSession(shuffleArray(freePool).slice(0, practiceCount), true);

  /* ---- Result ---- */
  if (sessionDone) {
    return (
      <ReviewDone
        done={sessionDone}
        mode={mode}
        soundEnabled={profile.settings.soundEnabled}
        mascot={profile.mascot}
        nextRoute={nextRoute}
        onNavigate={navigate}
      />
    );
  }

  /* ---- A card ---- */
  if (activeSession && current) {
    const cur = current;

    const leaveSession = () => {
      reader.stop();
      timerRef.current?.dispose();
      timerRef.current = null;
      setAnswerVal(undefined);
      setFeedback(null);
      setActiveSession(false);
    };

    const checkCard = () => {
      reader.stop();
      const ok = evaluateQuestionAnswer(cur.q, answerVal);

      if (!isFreePractice) {
        const res = answerLeitnerCard(cur.cardId, ok);
        if (ok && res.nextBox > res.prevBox) setUpgradedCount((u) => u + 1);
      }
      if (ok) correctRef.current += 1;

      const judged = judgeParts(cur.q, answerVal);
      const almost = !ok && judged.partial && judged.total > 0 && judged.right / judged.total >= ALMOST_RATIO;

      playSound(ok ? 'correct' : 'incorrect', profile.settings.soundEnabled);
      setFeedback({ correct: ok, almost, explanation: getAnswerExplanation(cur.q, answerVal, ok, mode) });
    };

    const nextCard = () => {
      reader.stop();
      setFeedback(null);
      setAnswerVal(undefined);
      if (idx + 1 < sessionCards.length) {
        setIdx((i) => i + 1);
        return;
      }

      const xpBefore = profile.xp;
      const xpEarned = isFreePractice ? 0 : completeLeitnerSession(sessionCards.length);

      let kilatResult: SessionDone['kilat'] = null;
      if (timerRef.current) {
        const ms = timerRef.current.elapsedMs();
        timerRef.current.dispose();
        timerRef.current = null;
        kilatResult = {
          ms,
          result: recordAttempt(profile.id, kilatRecordKey(sessionCards.length), {
            firstTry: correctRef.current,
            total: sessionCards.length,
            ms,
          }),
        };
      }
      setSessionDone({
        reviewed: sessionCards.length,
        xpEarned,
        xpBefore,
        upgraded: upgradedCount,
        free: isFreePractice,
        kilat: kilatResult,
      });
    };

    const hasAnswer =
      (answerVal !== undefined && answerVal !== '' && !(Array.isArray(answerVal) && answerVal.length === 0)) ||
      cur.q.type === 'order';

    return (
      <div key="review-session" data-review-in-progress className="mx-auto flex min-h-[85dvh] w-full max-w-[680px] flex-col px-4 py-6">
        <Button variant="ghost" data-sfx="back" onClick={leaveSession} className="mb-3 self-start">
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Kembali ke Kotak Ulang</span>
        </Button>
        <div className="mb-4 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <ProgressBar value={(idx / sessionCards.length) * 100} label="Kemajuan Kotak Ulang" />
          </div>
          {mode === 'pro' && kilat && (
            <span role="timer" aria-label="Stopwatch" className="font-mono text-sm font-bold tabular-nums text-[var(--ink-2)]">
              {formatClock(elapsed)}
            </span>
          )}
          <span className="text-xs font-extrabold text-[var(--ink-2)]">
            {idx + 1}/{sessionCards.length}
          </span>
        </div>

        <main
          key={cur.cardId}
          data-enter={idx > 0 ? 'right' : undefined}
          data-rm="fade"
          className={`flex flex-1 flex-col gap-5 ${idx > 0 ? 'pw-enter' : ''}`}
        >
          <QuestionIntro
            question={cur.q}
            mode={mode}
            kicker={`Soal ${idx + 1} dari ${sessionCards.length}`}
            as="h1"
            headingRef={promptRef}
            reading={reader.reading}
            eyebrow={<p className="pw-small m-0 text-[var(--ink-3)]">Dari {cur.originLabel}</p>}
            action={
              reader.canSpeak ? (
                <ReadAloudButton mode={mode} speaking={reader.speaking} onToggle={reader.toggle} />
              ) : undefined
            }
          />
          <QuestionRenderer
            question={cur.q}
            mode={mode}
            value={answerVal}
            onChange={setAnswerVal}
            disabled={Boolean(feedback)}
            isSubmitted={Boolean(feedback)}
            isCorrect={feedback?.correct}
            reading={reader.reading}
            withContext={false}
          />
        </main>

        <ActionBar
          mode={mode}
          primaryLabel="Periksa"
          onPrimary={checkCard}
          primaryDisabled={!hasAnswer}
          soundEnabled={profile.settings.soundEnabled}
          covered={Boolean(feedback)}
          focusKey={idx}
        />

        <FeedbackSheet
          open={Boolean(feedback)}
          isCorrect={Boolean(feedback?.correct)}
          almost={Boolean(feedback?.almost)}
          isFirstTry={false}
          explanation={feedback?.explanation ?? ''}
          mode={mode}
          showRepeat={!isFreePractice}
          onContinue={nextCard}
          canSpeak={reader.canSpeak}
          speaking={reader.speaking}
          reading={reader.reading}
          onToggleSpeak={() => {
            if (reader.speaking) {
              reader.stop();
            } else if (feedback) {
              reader.speak({
                kind: 'feedback',
                title: feedbackTitle({
                  isCorrect: feedback.correct,
                  almost: feedback.almost,
                  mode,
                  seed: feedback.explanation.length,
                }),
                explanation: feedback.explanation,
              });
            }
          }}
        />
      </div>
    );
  }

  /* ---- Landing ---- */
  return (
    <div className="mx-auto max-w-[720px] space-y-6 px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-center gap-3">
        <Layers className="h-7 w-7 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
        <div className="min-w-[min(100%,12rem)] flex-1">
          <h1 className="pw-h1">Kotak Ulang</h1>
          <p className="pw-small m-0 text-[var(--ink-2)]">
            {sessionSize > 0
              ? `Ada ${dueCards.length} kartu menunggu untuk diingat kembali hari ini.`
              : 'Kotak Ulang kosong hari ini. Ingatanmu aman!'}
          </p>
          {mode === 'junior' && (
            <p className="pw-small m-0 mt-1 text-[var(--ink-2)]">Soal lama muncul lagi di sini supaya kamu tidak lupa.</p>
          )}
        </div>
        <PetLauncher context={{ surface: 'review' }} />
      </header>

      <div className="pw-card p-5">
        <BoxStacks boxes={boxes} />
      </div>

      {sessionSize > 0 ? (
        <div className="space-y-3">
          {mode === 'pro' && (
            <button
              type="button"
              role="switch"
              aria-checked={kilat}
              onClick={() => setKilat((k) => !k)}
              className="pw-pressable inline-flex min-h-[var(--touch-min)] items-center gap-3 rounded-[var(--radius-md)] px-1 text-left cursor-pointer"
            >
              <span
                aria-hidden="true"
                className={`relative h-6 w-11 flex-shrink-0 rounded-[var(--radius-full)] border-2 transition-colors ${
                  kilat
                    ? 'border-[var(--world-600)] bg-[var(--world-600)]'
                    : 'border-[var(--line-strong)] bg-[var(--surface-well)]'
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-[var(--radius-full)] bg-[var(--paper-raised)] shadow-[var(--elev-1)] transition-transform duration-[160ms] ease-[var(--ease-out)] ${
                    kilat ? 'translate-x-5' : ''
                  }`}
                />
              </span>
              <Annot label="kilat: pakai stopwatch">kilat: pakai stopwatch</Annot>
            </button>
          )}
          <Button
            variant="primary"
            fullWidth
            soundEnabled={profile.settings.soundEnabled}
            onClick={() => beginSession(dueCards.slice(0, cap), false)}
          >
            Mulai ulang ({sessionSize} kartu) →
          </Button>
          {nextRoute && (
            <Button variant="ghost" fullWidth onClick={() => navigate(nextRoute)}>
              Langsung ke pelajaran
            </Button>
          )}
        </div>
      ) : (
        <div className="pw-card space-y-4 p-6 text-center">
          <div className="pw-stage mx-auto flex w-full justify-center py-4">
            <Bito expression="happy" size={96} custom={profile.mascot} />
          </div>
          <p className="pw-body m-0">
            Selesaikan pelajaran baru untuk mengisi kartu di Kotak Ulang, atau coba latihan bebas.
          </p>
          <Button
            variant="secondary"
            fullWidth
            disabled={freePool.length === 0}
            onClick={startFreePractice}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Latihan bebas{practiceCount > 0 ? ` (${practiceCount} soal acak)` : ''}
          </Button>
          {nextRoute && (
            <Button variant="ghost" fullWidth onClick={() => navigate(nextRoute)}>
              Langsung ke pelajaran
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * The end of a session: numbers that count up, then the level-up (Junior overlay, Pro banner)
 * ---------------------------------------------------------------------------------------------- */

const ReviewDone: React.FC<{
  done: SessionDone;
  mode: Mode;
  soundEnabled: boolean;
  mascot: React.ComponentProps<typeof Bito>['custom'];
  nextRoute: string | null;
  onNavigate: (to: string) => void;
}> = ({ done, mode, soundEnabled, mascot, nextRoute, onNavigate }) => {
  const pro = mode === 'pro';
  const rootRef = useRef<HTMLDivElement>(null);
  const [skipped, setSkipped] = useState(false);
  const [banner, setBanner] = useState(false);
  const level = detectLevelUp(done.xpBefore, done.xpEarned, mode);
  const at = (ms: number) => ({ '--at': `${ms}ms` }) as React.CSSProperties;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    // The level-up is queued by the last cue, so it never opens over the numbers while they count
    const handle = runSequence(root, [
      {
        at: 900,
        run: ({ skipped: s }) => {
          if (s) setSkipped(true);
          if (!level.leveledUp) return;
          if (pro) setBanner(true);
          else celebrate({ kind: 'levelUp', level: level.after.level, title: level.after.title });
        },
      },
    ]);
    return () => handle.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} data-rm="fade" className="pw-seq mx-auto max-w-[540px] space-y-5 px-5 py-10 text-center">
      {banner && <LevelUpBanner before={level.before} after={level.after} />}
      <div className="pw-stage flex justify-center py-4">
        <Bito expression="cheer" size={pro ? 96 : 112} custom={mascot} />
      </div>
      <h1 className="pw-h1">{pro ? 'Kotak Ulang selesai' : 'Kotak Ulang selesai!'}</h1>
      <p className="pw-body-l pw-fx-rise m-0" style={at(120)}>
        <CountUp value={done.reviewed} delay={120} duration={600} skip={skipped} /> kartu diulang.
        {!done.free && (
          <>
            {' '}
            <CountUp value={done.upgraded} delay={200} duration={600} skip={skipped} /> kartu naik ke kotak lebih tinggi.
          </>
        )}
      </p>
      {done.xpEarned > 0 && (
        <p
          className={`pw-fx-rise m-0 inline-block rounded-[var(--radius-full)] bg-[var(--star)] px-4 py-1 font-extrabold text-[var(--on-star)] ${
            pro ? 'font-mono tabular-nums' : ''
          }`}
          style={at(300)}
        >
          <CountUp value={done.xpEarned} prefix="+" suffix={` ${xpWord(mode)}`} delay={300} duration={600} skip={skipped} />
        </p>
      )}

      {pro && done.kilat && (
        <div className="pw-well pw-fx-fade space-y-1" style={at(420)}>
          <p className="pw-body m-0 font-mono tabular-nums">
            {done.reviewed} kartu · {formatDuration(done.kilat.ms)}
            {done.kilat.result.isNew && (
              <>
                {' '}
                <Annot label="rekor baru">rekor baru</Annot>
              </>
            )}
          </p>
          {done.kilat.result.previous && !done.kilat.result.isNew && done.kilat.result.best.bestMs && (
            <p className="pw-small m-0 font-mono tabular-nums text-[var(--ink-3)]">
              terbaik: {formatDuration(done.kilat.result.best.bestMs)}
            </p>
          )}
        </div>
      )}

      <Button variant="primary" fullWidth soundEnabled={soundEnabled} data-sfx={nextRoute ? undefined : 'back'} onClick={() => onNavigate(nextRoute ?? '/beranda')}>
        {nextRoute ? 'Lanjut ke pelajaran →' : 'Kembali ke Beranda'}
      </Button>
    </div>
  );
};
