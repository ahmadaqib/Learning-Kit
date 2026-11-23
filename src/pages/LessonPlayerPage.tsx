import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Hand, Pencil, Target, Volume2 } from 'lucide-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { STICKERS_BY_ID } from '@/content/stickers';
import { GLOSSARY_BY_ID } from '@/content/glossary';
import { WORLD_META_BY_ID } from '@/content/worldMeta';
import { loadWorldBundle } from '@/content/worldLoader';
import { visibleSegments } from '@/content/rich';
import { resolveTxt, type Lesson, type Mode, type Question, type Rich } from '@/content/schema';
import {
  buildLessonPlan,
  clearSnapshot,
  legacyStepToTimelineIndex,
  restoreSession,
  saveSnapshot,
  snapshotFromSession,
  type CardStep,
} from '@/engine/lessonSession';
import { advanceQuizSession, createQuizSession, evaluateQuestionAnswer, type QuizSessionState } from '@/engine/queue';
import {
  buildReadQueue,
  playQueue,
  splitSentenceRanges,
  stopQueue,
  type ReadTarget,
  type ReadingMark,
} from '@/engine/readAloud';
import { createVisibleTimer, lessonRecordKey, recordAttempt, type RecordResult, type VisibleTimer } from '@/engine/records';
import { XP_RULES } from '@/engine/scoring';
import { getLessonFocus, setLessonFocus } from '@/engine/lessonNotes';
import { LessonReflection } from '@/components/lesson/LessonReflection';
import { LESSON_STUBS, WORLD_STUBS } from '@/components/map/MapPath';
import { isLessonUnlocked } from '@/engine/unlock';
import { hasSeen, markSeen } from '@/engine/seen';
import { isStoppingPoint, noteLessonFinished } from '@/engine/sitting';
import { playSound } from '@/engine/sound';
import { hasIndonesianVoiceAvailable } from '@/engine/speech';
import { finishFly, flyTo } from '@/motion/waapi';
import { useMotionPrefs } from '@/motion/prefs';
import { useAppStore } from '@/store/useAppStore';
import { PageLoader } from '@/components/fx/PageLoader';
import { ConceptVisual } from '@/components/illustrations/ConceptVisuals';
import { ActionBar, ReadAloudButton } from '@/components/lesson/ActionBar';
import { FeedbackSheet, feedbackTitle } from '@/components/lesson/FeedbackSheet';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { LessonResult } from '@/components/lesson/LessonResult';
import { LimitCard } from '@/components/lesson/LimitCard';
import { QuestionGuideOverlay } from '@/components/lesson/QuestionGuideOverlay';
import { Bito } from '@/components/mascot/Bito';
import { ALMOST_RATIO, QuestionIntro, QuestionRenderer, judgeParts } from '@/components/questions/QuestionRenderer';
import { SimulatorHost } from '@/components/sims/SimulatorHost';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { DialogModal } from '@/components/ui/DialogModal';
import { RichText } from '@/components/ui/RichText';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

/* ------------------------------------------------------------------------------------------------
 * Read-along text (M49): the sentence being read gets `.pw-mark`
 * ---------------------------------------------------------------------------------------------- */

const segmentText = (seg: Rich, mode: Mode): string => (seg.t === 'code' ? seg.v : resolveTxt(seg.v, mode));

/**
 * The body of a card. While nobody is reading it renders RichText as usual (glossary terms stay tappable).
 * While a sentence of it is being read, the same visible segments are drawn with that sentence marked.
 * The sentence boundaries come from the same function that built the read queue.
 */
const ReadAlongRich: React.FC<{ segments: Rich[]; mode: Mode; reading: ReadingMark | null; className?: string }> = ({
  segments,
  mode,
  reading,
  className = '',
}) => {
  if (!reading || reading.el !== 'body') return <RichText segments={segments} mode={mode} className={className} />;

  const visible = visibleSegments(segments, mode);
  const full = visible.map((s) => segmentText(s, mode)).join('');
  const range = splitSentenceRanges(full)[reading.part];
  let offset = 0;
  return (
    <span className={`pw-prose ${className}`}>
      {visible.map((seg, i) => {
        const text = segmentText(seg, mode);
        const start = offset;
        offset += text.length;
        const end = offset;
        const a = range ? Math.max(range.start, start) : 0;
        const b = range ? Math.min(range.end, end) : 0;
        const inside = range !== undefined && a < b;

        const wrap = (node: React.ReactNode) =>
          inside ? (
            <mark key={i} className="pw-mark bg-transparent text-inherit">
              {node}
            </mark>
          ) : (
            <React.Fragment key={i}>{node}</React.Fragment>
          );

        if (seg.t === 'text') {
          if (!inside) return <React.Fragment key={i}>{text}</React.Fragment>;
          return (
            <React.Fragment key={i}>
              {text.slice(0, a - start)}
              <mark className="pw-mark bg-transparent text-inherit">{text.slice(a - start, b - start)}</mark>
              {text.slice(b - start)}
            </React.Fragment>
          );
        }
        if (seg.t === 'bold') return wrap(<strong className="font-bold text-[var(--ink)]">{text}</strong>);
        if (seg.t === 'code') {
          return wrap(<code className="pw-code rounded-[var(--radius-xs)] bg-[var(--surface-well)] px-1.5 py-0.5">{text}</code>);
        }
        return wrap(
          <span
            className="font-extrabold text-[var(--world-700)] underline decoration-dashed underline-offset-4"
            title={GLOSSARY_BY_ID[seg.termId]?.term}
          >
            {text}
          </span>,
        );
      })}
    </span>
  );
};

/* ------------------------------------------------------------------------------------------------
 * Cards
 * ---------------------------------------------------------------------------------------------- */

const KickerRow: React.FC<{ icon: React.ReactNode; label: string; action?: React.ReactNode }> = ({
  icon,
  label,
  action,
}) => (
  <div className="flex min-h-[var(--touch-min)] items-center justify-between gap-3">
    <span className="pw-kicker inline-flex items-center gap-1.5">
      {icon}
      {label}
    </span>
    {action}
  </div>
);

interface CardProps {
  lesson: Lesson;
  worldId: string;
  worldColor?: string;
  mode: Mode;
  mascot: React.ComponentProps<typeof Bito>['custom'];
  reading: ReadingMark | null;
  /** The "Dengar" button, or null when it is not shown. */
  readButton: React.ReactNode;
}

const StoryCard: React.FC<CardProps & { step: Extract<CardStep, { kind: 'story' }> }> = ({
  lesson,
  step,
  worldId,
  worldColor,
  mode,
  mascot,
  reading,
  readButton,
}) => (
  <div className="grid w-full flex-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
    <div className="pw-stage flex min-h-[200px] items-center justify-center p-5">
      <div className="flex flex-col items-center gap-3 text-center">
        {mode === 'junior' && <Bito expression="wave" size={96} custom={mascot} />}
        <ConceptVisual name="DiagramConcept" props={{ worldId, topic: step.illustration }} alt={lesson.title} worldColor={worldColor} />
      </div>
    </div>
    <div className="space-y-4">
      <KickerRow icon={<BookOpen className="h-4 w-4" aria-hidden="true" />} label="Cerita" action={readButton} />
      <h1 className="pw-h2">{lesson.title}</h1>
      <div className="pw-body-l m-0">
        <ReadAlongRich segments={step.body} mode={mode} reading={reading} />
      </div>
      <div className="pw-well flex items-start gap-2.5">
        <Target className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
        <p className="pw-small m-0 font-bold text-[var(--world-700)]">
          {mode === 'junior' ? 'Tujuan' : 'Setelah ini'}: {resolveTxt(lesson.objective, mode)}
        </p>
      </div>
    </div>
  </div>
);

const ConceptCard: React.FC<CardProps & { step: Extract<CardStep, { kind: 'concept' }> }> = ({
  step,
  worldId,
  worldColor,
  mode,
  reading,
  readButton,
}) => {
  const visual =
    step.visual.type === 'component' ? (
      <ConceptVisual
        name={step.visual.name}
        props={step.visual.props}
        alt={resolveTxt(step.visual.alt, mode)}
        worldColor={worldColor}
      />
    ) : (
      <ConceptVisual
        name="DiagramConcept"
        props={{ worldId, topic: step.visual.src }}
        alt={resolveTxt(step.visual.alt, mode)}
        worldColor={worldColor}
      />
    );
  const code = step.code && mode === 'pro' ? step.code : null;

  return (
    <div className="grid w-full flex-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      {/* From 640 px the code sits in the stage with the illustration. Under 640 px the stage gives way to a small sticker by the title. */}
      <div
        className={`pw-stage min-h-[200px] items-center justify-center p-5 ${code ? 'hidden min-[640px]:flex' : 'flex'} flex-col gap-3`}
      >
        {visual}
        {code && (
          <div className="w-full">
            <CodeBlock snippet={code} />
          </div>
        )}
      </div>
      <div className="space-y-4">
        <KickerRow
          icon={<Pencil className="h-4 w-4" aria-hidden="true" />}
          label={mode === 'junior' ? 'Belajar' : 'Konsep'}
          action={readButton}
        />
        <div className="flex items-center gap-3">
          {code && (
            <div className="pw-stage flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center overflow-hidden !rounded-[var(--radius-md)] min-[640px]:hidden">
              <div className="w-[160px] origin-center scale-[0.4]">{visual}</div>
            </div>
          )}
          <h2 className="pw-h2">{resolveTxt(step.title, mode)}</h2>
        </div>
        <div className="pw-body m-0">
          <ReadAlongRich segments={step.body} mode={mode} reading={reading} />
        </div>
        {code && (
          <div className="min-[640px]:hidden">
            <CodeBlock snippet={code} />
          </div>
        )}
      </div>
    </div>
  );
};

const SimCard: React.FC<CardProps & { step: Extract<CardStep, { kind: 'sim' }> }> = ({ step, mode, readButton, reading }) => {
  const text = resolveTxt(step.instructions, mode);
  return (
    <div className="grid w-full flex-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div className="pw-stage flex min-h-[200px] items-center justify-center p-4">
        <div className="w-full">
          <SimulatorHost simId={step.simId} mode={mode} props={step.props} />
        </div>
      </div>
      <div className="space-y-4">
        <KickerRow icon={<Hand className="h-4 w-4" aria-hidden="true" />} label="Coba sendiri" action={readButton} />
        <h2 className="pw-h2">
          {reading && reading.el === 'instructions' ? (
            <mark className="pw-mark bg-transparent text-inherit">{text}</mark>
          ) : (
            text
          )}
        </h2>
      </div>
    </div>
  );
};

const LimitStepCard: React.FC<CardProps & { step: Extract<CardStep, { kind: 'limit' }>; revealed: boolean }> = ({
  step,
  worldId,
  worldColor,
  mode,
  revealed,
  reading,
  readButton,
}) => (
  <div className="grid w-full flex-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
    <div className="pw-stage flex min-h-[200px] items-center justify-center p-5">
      <ConceptVisual
        name="DiagramConcept"
        props={{ worldId, topic: 'batas-analogi' }}
        alt="Perbandingan hal yang mirip dan berbeda dari analogi"
        worldColor={worldColor}
      />
    </div>
    <div className="space-y-3">
      {readButton && <div className="flex justify-end">{readButton}</div>}
      <LimitCard step={step} mode={mode} revealed={revealed} reading={reading} />
    </div>
  </div>
);

/* ------------------------------------------------------------------------------------------------
 * Tantangan Kode (Junior, after three stars, optional): one real Pro question. No XP, no stars, never requeued.
 * It sits over the result, so the result (and its sequence) is not replayed when the learner comes back.
 * ---------------------------------------------------------------------------------------------- */

const BonusChallenge: React.FC<{
  question: Question;
  lessonId: string;
  profileId: string;
  soundEnabled: boolean;
  autoRead: boolean;
  canSpeak: boolean;
  onClose: () => void;
}> = ({ question, lessonId, profileId, soundEnabled, autoRead, canSpeak, onClose }) => {
  const [answer, setAnswer] = useState<unknown>(undefined);
  const [verdict, setVerdict] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0);
  const [reading, setReading] = useState<ReadingMark | null>(null);

  const speak = (target: ReadTarget) =>
    playQueue(buildReadQueue(target, 'pro'), (s) => setReading(s ? { el: s.el, part: s.part } : null));
  const toggleSpeak = (target: ReadTarget) => (reading ? stopQueue() : speak(target));

  useEffect(() => {
    if (autoRead && canSpeak) speak({ kind: 'question', question });
    return () => stopQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasAnswer = Array.isArray(answer) ? answer.length > 0 : answer !== undefined && answer !== '';

  const check = () => {
    stopQueue();
    const correct = evaluateQuestionAnswer(question, answer);
    playSound(correct ? 'correct' : 'incorrect', soundEnabled);
    const base = resolveTxt(question.explainCorrect, 'pro');
    if (correct) markSeen(profileId, `bonus:${lessonId}`);
    const result = {
      correct,
      explanation: correct ? base : `${base} Kode seperti ini ada di mode Pro. Kamu bisa coba lagi kapan saja.`,
    };
    setVerdict(result);
    if (autoRead && canSpeak) {
      speak({ kind: 'feedback', title: feedbackTitle({ isCorrect: correct, mode: 'junior' }), explanation: result.explanation });
    }
  };

  const openHint = () => {
    const hints = question.hints;
    if (!hints) return;
    const next: 1 | 2 = hintLevel === 0 || !hints[1] ? 1 : 2;
    setHintLevel(next);
    setHintOpen(true);
    if (autoRead && canSpeak) speak({ kind: 'hint', text: resolveTxt(hints[next - 1]!, 'pro') });
  };
  const hintText = question.hints ? resolveTxt(question.hints[hintLevel === 2 && question.hints[1] ? 1 : 0]!, 'pro') : '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tantangan Kode"
      className="fixed inset-0 z-40 overflow-y-auto bg-[var(--surface-page)]"
    >
      <div className="mx-auto flex min-h-full max-w-[720px] flex-col px-4 py-3 sm:px-6">
        <div className="mb-4 flex items-center justify-between gap-3 pw-safe-top">
          <Button variant="ghost" onClick={onClose}>
            ← Kembali
          </Button>
        </div>
        <div className="flex-1 space-y-5">
          <QuestionIntro
            question={question}
            mode="pro"
            kicker="Tantangan Kode"
            reading={reading}
            action={
              canSpeak ? (
                <ReadAloudButton mode="junior" speaking={reading !== null} onToggle={() => toggleSpeak({ kind: 'question', question })} />
              ) : undefined
            }
          />
          <QuestionRenderer
            question={question}
            mode="pro"
            value={answer}
            onChange={setAnswer}
            disabled={Boolean(verdict)}
            isSubmitted={Boolean(verdict)}
            isCorrect={verdict?.correct}
            reading={reading}
            withContext={false}
          />
        </div>
        <ActionBar
          mode="junior"
          primaryLabel="Periksa"
          onPrimary={check}
          primaryDisabled={!hasAnswer && question.type !== 'order'}
          soundEnabled={soundEnabled}
          onHint={question.hints ? openHint : undefined}
          covered={Boolean(verdict)}
        />
        <FeedbackSheet
          open={Boolean(verdict)}
          isCorrect={Boolean(verdict?.correct)}
          isFirstTry={false}
          xp={0}
          explanation={verdict?.explanation ?? ''}
          mode="junior"
          showRepeat={false}
          bitoExpression={verdict?.correct ? 'wow' : undefined}
          onContinue={onClose}
          canSpeak={canSpeak}
          speaking={reading !== null}
          reading={reading}
          onToggleSpeak={() =>
            toggleSpeak({
              kind: 'feedback',
              title: feedbackTitle({ isCorrect: Boolean(verdict?.correct), mode: 'junior' }),
              explanation: verdict?.explanation ?? '',
            })
          }
        />
      </div>
      <DialogModal
        open={hintOpen}
        onClose={() => {
          setHintOpen(false);
          stopQueue();
        }}
        title={hintLevel === 2 ? 'Petunjuk 2' : 'Petunjuk'}
      >
        <div className="space-y-3">
          <p className="pw-body m-0">
            <span className={reading?.el === 'hint' ? 'pw-mark' : undefined}>{hintText}</span>
          </p>
          {canSpeak && (
            <ReadAloudButton
              mode="junior"
              speaking={reading !== null}
              onToggle={() => toggleSpeak({ kind: 'hint', text: hintText })}
            />
          )}
        </div>
      </DialogModal>
    </div>
  );
};

/* ------------------------------------------------------------------------------------------------
 * The page
 * ---------------------------------------------------------------------------------------------- */

interface Submitted {
  correct: boolean;
  explanation: string;
  /** XP this answer earns: 10 on the first pass, 3 on a retry, 0 for the warm-up and a wrong answer. */
  xp: number;
  /** First-pass correct answer (no hint in Pro): counts towards the combo and earns sparks. */
  cleanFirstTry: boolean;
  /** The streak after this answer. */
  comboAfter: number;
  sparks: 0 | 6 | 8;
  /** A wrong answer where at least 70% of the parts were right: the title reads "Hampir!". */
  almost: boolean;
  /** Where the player goes on "Lanjut". Computed when the answer is checked, so the snapshot matches the progress. */
  pending: { session: QuizSessionState; stepIndex: number; misses: number; complete: boolean };
}

interface ResultSummary {
  stars: 0 | 1 | 2 | 3;
  xpEarned: number;
  xpBefore: number;
  firstTryCount: number;
  retryCount: number;
  totalCount: number;
  stickerIsNew: boolean;
  record: { result: RecordResult; attemptMs: number } | null;
  stopping: boolean;
}

const CHOICE_TYPES: Array<Question['type']> = ['mcq', 'analogy', 'why', 'scenario', 'limit', 'tf', 'hotspot'];

export const LessonPlayerPage: React.FC = () => {
  const { pelajaranId = 'a01-l01' } = useParams<{ pelajaranId: string }>();
  const profile = useAppStore((state) => state.profiles[state.activeProfileId]);
  if (!profile) return null;
  const meta = LESSON_STUBS[pelajaranId];
  if (meta) {
    const world = WORLD_STUBS.find((w) => w.id === meta.worldId);
    const lockedWorkshop = meta.isSideQuest && !profile.lessons[meta.id]?.completedAt &&
      (!world || !profile.assessments[meta.worldId]?.pre || !isLessonUnlocked(meta.id, world, LESSON_STUBS, profile, WORLD_STUBS));
    if (!meta.modes.includes(profile.mode) || lockedWorkshop) return <Navigate replace to={`/dunia/${meta.worldId}`} />;
  }
  return <LessonPlayer key={`${profile.id}:${profile.mode}:${pelajaranId}`} pelajaranId={pelajaranId} profileId={profile.id} />;
};

function LessonPlayer({ pelajaranId, profileId }: { pelajaranId: string; profileId: string }) {
  const [focus, setFocus] = useState(() => getLessonFocus(profileId));
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute('data-lesson-focus', focus);
    return () => root.removeAttribute('data-lesson-focus');
  }, [focus]);
  const navigate = useNavigate();
  const prefs = useMotionPrefs();

  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const saveLessonStep = useAppStore((s) => s.saveLessonStep);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const recordQuestionMistake = useAppStore((s) => s.recordQuestionMistake);
  const markQuestionGuideSeen = useAppStore((s) => s.markQuestionGuideSeen);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const worldId = pelajaranId.split('-')[0];
  const worldMeta = WORLD_META_BY_ID[worldId];
  const mode: Mode = profile?.mode ?? 'junior';

  // Loading
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [warmupQuestion, setWarmupQuestion] = useState<Question | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [predictionDone, setPredictionDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [runKey, setRunKey] = useState(0);

  // The player
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [session, setSession] = useState<QuizSessionState | null>(null);
  const [misses, setMisses] = useState(0);
  const [stepNumber, setStepNumber] = useState(0);
  const [answerVal, setAnswerVal] = useState<unknown>(undefined);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);
  const [usedHintLevel, setUsedHintLevel] = useState<0 | 1 | 2>(0);
  const [selectionChanges, setSelectionChanges] = useState(0);
  const [limitRevealed, setLimitRevealed] = useState(false);
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [guideTypeOpen, setGuideTypeOpen] = useState<Question['type'] | null>(null);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const [breakModalOpen, setBreakModalOpen] = useState(false);
  const [resultSummary, setResultSummary] = useState<ResultSummary | null>(null);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);

  // Header chips (M22, M23, M48)
  const [sessionXp, setSessionXp] = useState(0);
  const [bumpKey, setBumpKey] = useState(0);
  const [comboShown, setComboShown] = useState(0);
  const streakRef = useRef(0);
  const xpChipRef = useRef<HTMLSpanElement>(null);
  const xpBadgeRef = useRef<HTMLSpanElement>(null);

  // Read aloud
  const [reading, setReading] = useState<ReadingMark | null>(null);

  const timerRef = useRef<VisibleTimer | null>(null);
  const breakDueRef = useRef(false);
  const finishedRef = useRef<string | null>(null);

  const plan = useMemo(
    () => (lesson ? buildLessonPlan(lesson, mode, warmupQuestion) : null),
    [lesson, mode, warmupQuestion],
  );

  const resetPlayer = () => {
    setTimelineIndex(0);
    setSession(null);
    setMisses(0);
    setStepNumber(0);
    setAnswerVal(undefined);
    setSubmitted(null);
    setUsedHintLevel(0);
    setSelectionChanges(0);
    setLimitRevealed(false);
    setHintModalOpen(false);
    setSessionXp(0);
    setBumpKey(0);
    setComboShown(0);
    streakRef.current = 0;
    breakDueRef.current = false;
    setResultSummary(null);
    setBonusOpen(false);
    setPredictionDone(false);
    setReady(false);
  };

  // Load the lesson. "Coba lagi" runs this again in place, so nothing else on the page is lost.
  useEffect(() => {
    let active = true;
    stopQueue();
    setLoadError(false);
    setLesson(null);
    setWarmupQuestion(null);
    setLoaded(false);
    resetPlayer();
    finishedRef.current = null;

    loadWorldBundle(worldId)
      .then(async (bundle) => {
        if (!active) return;
        const found = bundle.lessons.find((l) => l.id === pelajaranId);
        if (!found) {
          setLoadError(true);
          return;
        }

        // Warm-up question from the previous lesson (section 5, part 1)
        let candidate: Question | null = null;
        if (found.warmupFrom) {
          const prevWorldId = found.warmupFrom.split('-')[0];
          const prevBundle = prevWorldId === worldId ? bundle : await loadWorldBundle(prevWorldId).catch(() => null);
          let previous = prevBundle?.lessons.find((l) => l.id === found.warmupFrom);
          if (!previous?.modes.includes(mode)) {
            const preceding = bundle.world.lessons.slice(0, Math.max(0, bundle.world.lessons.indexOf(found.id)));
            previous = preceding.reverse().map((id) => bundle.lessons.find((l) => l.id === id)).find((l) => l?.modes.includes(mode));
          }
          if (previous) {
            const visible = (q: Question) => !q.modes || q.modes.includes(mode);
            const quiz = previous.steps.flatMap((step) => step.kind === 'question' ? [step.q] : []);
            candidate = previous.reviewCards.find(visible) ?? quiz.find(visible) ?? null;
          }
        }
        if (!active) return;
        setWarmupQuestion(candidate);
        setLesson(found);
        setLoaded(true);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
      stopQueue();
      finishFly();
    };
    // resetPlayer only calls state setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [worldId, pelajaranId, loadAttempt]);

  // Resume (spec 8.5): a snapshot for this lesson and mode that is under 7 days old and still matches the questions
  useEffect(() => {
    if (!loaded || !lesson || !plan || !profile) return undefined;
    const restored = restoreSession({
      profileId: profile.id,
      lessonId: lesson.id,
      mode,
      questions: plan.questions,
      maxStepIndex: plan.timeline.length,
    });
    const timer = createVisibleTimer(restored?.elapsedMs ?? 0);
    timerRef.current = timer;

    if (restored) {
      setPredictionDone(restored.predictionDone);
      setSession(restored.session);
      setTimelineIndex(restored.stepIndex);
      setMisses(restored.misses);
    } else {
      const rec = profile.lessons[lesson.id];
      const savedStep = rec?.completedAt ? 0 : (rec?.stepIndex ?? 0);
      setTimelineIndex(legacyStepToTimelineIndex(savedStep, plan.timeline));
      setSession(createQuizSession(plan.questions));
      setMisses(0);
    }
    setOfferOpen(
      mode === 'junior' &&
        !profile.settings.autoReadAloud &&
        !hasSeen(profile.id, 'offer:autoread') &&
        hasIndonesianVoiceAvailable(),
    );
    setReady(true);
    return () => timer.dispose();
    // The plan follows the lesson. The profile changes on every save and must not restart the player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, lesson, runKey]);

  // Optional break reminder for Junior (12.3). The learner chose it in Settings.
  useEffect(() => {
    if (!profile || profile.mode !== 'junior' || profile.settings.breakReminderMinutes <= 0) return undefined;
    const ms = profile.settings.breakReminderMinutes * 60 * 1000;
    const timer = setTimeout(() => {
      breakDueRef.current = true;
      setBreakModalOpen(true);
    }, ms);
    return () => clearTimeout(timer);
  }, [profile?.mode, profile?.settings.breakReminderMinutes]);

  // Stop speaking and land a flying chip when the page goes
  useEffect(
    () => () => {
      stopQueue();
      finishFly();
    },
    [],
  );

  const timeline = plan?.timeline ?? [];
  const inClosing = ready && timelineIndex >= timeline.length;
  const item = ready && !inClosing ? timeline[timelineIndex] : undefined;
  const head = session?.queue[0];
  const inQuiz = item?.kind === 'check' || inClosing;
  const firstConcept = timeline.findIndex((t) => t.kind === 'card' && t.step.kind === 'concept');
  const prediction = !predictionDone && ready && firstConcept >= 0 && timelineIndex === firstConcept
    ? lesson?.reviewCards.find((q) => 'choices' in q && (!q.modes || q.modes.includes(mode)))
    : undefined;
  const activeQuestion: Question | undefined = prediction ?? (
    item?.kind === 'warmup' ? item.q : inQuiz ? head?.question : undefined);
  const isRetryQ = inQuiz && head?.isRetry === true;
  const card = !prediction && item?.kind === 'card' ? item.step : null;

  // First time a question type shows up: how to answer it (V13 / F18)
  useEffect(() => {
    if (!activeQuestion || !profile) return;
    if (!profile.seenQuestionGuides.includes(activeQuestion.type)) {
      setGuideTypeOpen(activeQuestion.type);
      markQuestionGuideSeen(activeQuestion.type);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeQuestion?.type]);

  // An empty closing quiz (everything was a quick check, or the snapshot was taken at the very end), or a quick
  // check with nothing left in the queue: carry on instead of showing a blank step
  useEffect(() => {
    if (!ready || !lesson || !session || resultSummary) return;
    if (inClosing && session.queue.length === 0) finishLesson(session);
    else if (item?.kind === 'check' && session.queue.length === 0) setTimelineIndex((i) => i + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, inClosing, session, item?.kind, resultSummary]);

  /* ---------------------------------------------------------------- read aloud */

  const speakTarget = (target: ReadTarget, shownOrder?: string[]) =>
    playQueue(buildReadQueue(target, mode, shownOrder), (s) => setReading(s ? { el: s.el, part: s.part } : null));

  const shownOrder =
    activeQuestion?.type === 'order' && Array.isArray(answerVal) ? (answerVal as string[]) : undefined;

  const readTarget: ReadTarget | null = (() => {
    if (!lesson || !ready) return null;
    if (activeQuestion) return { kind: 'question', question: activeQuestion };
    if (!card) return null;
    switch (card.kind) {
      case 'story':
        return { kind: 'story', title: lesson.title, body: card.body };
      case 'concept':
        return { kind: 'concept', title: card.title, body: card.body };
      case 'limit':
        return { kind: 'limit', step: card, revealed: limitRevealed };
      case 'sim':
        return { kind: 'sim', instructions: card.instructions };
      default:
        return null;
    }
  })();

  const autoRead = Boolean(profile?.settings.autoReadAloud);
  const canSpeak = Boolean(profile && (mode === 'junior' || autoRead) && hasIndonesianVoiceAvailable());
  const speaking = reading !== null;

  const toggleSpeak = () => {
    if (speaking) stopQueue();
    else if (readTarget) speakTarget(readTarget, shownOrder);
  };

  // The feedback sheet's own "Dengar" reads its title and explanation
  const toggleFeedbackSpeak = () => {
    if (speaking) {
      stopQueue();
      return;
    }
    if (!submitted) return;
    speakTarget({
      kind: 'feedback',
      title: feedbackTitle({
        isCorrect: submitted.correct,
        almost: submitted.almost,
        mode,
        seed: submitted.explanation.length,
      }),
      explanation: submitted.explanation,
    });
  };

  // Auto-read: each new step is read when it appears. A session token (readAloud.ts) cancels the chain on a new step.
  useEffect(() => {
    if (!ready || resultSummary || !autoRead || !canSpeak || !readTarget) return undefined;
    speakTarget(readTarget, shownOrder);
    return () => stopQueue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, stepNumber, runKey, autoRead, Boolean(resultSummary)]);

  // Auto-read: the feedback is read when its sheet appears
  useEffect(() => {
    if (!submitted || !autoRead || !canSpeak) return;
    speakTarget({
      kind: 'feedback',
      title: feedbackTitle({
        isCorrect: submitted.correct,
        almost: submitted.almost,
        mode,
        seed: submitted.explanation.length,
      }),
      explanation: submitted.explanation,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  // The one-time offer to turn auto-read on is closed by moving on
  useEffect(() => {
    if (offerOpen && stepNumber > 0 && profile) {
      markSeen(profile.id, 'offer:autoread');
      setOfferOpen(false);
    }
  }, [offerOpen, stepNumber, profile]);

  /* ---------------------------------------------------------------- the lesson's flow */

  const resetQuestionState = () => {
    setAnswerVal(undefined);
    setSubmitted(null);
    setUsedHintLevel(0);
    setSelectionChanges(0);
    setLimitRevealed(false);
  };

  const persist = (stepIndex: number, sess: QuizSessionState, missCount: number, didPredict = predictionDone) => {
    if (!lesson || !profile) return;
    saveSnapshot(
      profile.id,
      snapshotFromSession({
        lessonId: lesson.id,
        mode,
        stepIndex,
        session: sess,
        elapsedMs: timerRef.current?.elapsedMs() ?? 0,
        misses: missCount,
        predictionDone: didPredict,
      }),
    );
  };

  const advanceCard = () => {
    stopQueue();
    if (!lesson || !session) return;
    const next = timelineIndex + 1;
    setTimelineIndex(next);
    setStepNumber((n) => n + 1);
    resetQuestionState();
    saveLessonStep(lesson.id, next);
    persist(next, session, misses);
  };

  const handlePrimaryOnCard = () => {
    if (card?.kind === 'limit' && !limitRevealed) {
      setLimitRevealed(true);
      // "Bedanya" is read once it is revealed
      if (autoRead && canSpeak && lesson) {
        const queue = buildReadQueue({ kind: 'limit', step: card, revealed: true }, mode).filter((s) =>
          /^different/.test(s.el),
        );
        playQueue(queue, (s) => setReading(s ? { el: s.el, part: s.part } : null));
      } else {
        stopQueue();
      }
      return;
    }
    advanceCard();
  };

  const finishLesson = (finalSession: QuizSessionState) => {
    if (!lesson || !profile || !plan) return;
    const guard = `${runKey}:${lesson.id}`;
    if (finishedRef.current === guard) return;
    finishedRef.current = guard;

    const store = useAppStore.getState();
    const cur = store.profiles[store.activeProfileId];
    const xpBefore = cur?.xp ?? 0;
    const stickerIsNew = Boolean(lesson.stickerId && !cur?.stickers.includes(lesson.stickerId));

    const totalQ = plan.questions.length;
    const firstTryCount = finalSession.firstTryCorrectIds.length;
    const retryCount = finalSession.retryCorrectIds.length;
    const res = completeLesson({
      lessonId: lesson.id,
      firstTryCorrect: firstTryCount,
      retryCorrect: retryCount,
      totalQuestions: totalQ,
      stickerId: lesson.stickerId,
      reviewCardIds: lesson.reviewCards.map((rc) => rc.id),
      isSideQuest: lesson.isSideQuest,
    });
    clearSnapshot(profile.id, lesson.id);

    const elapsed = timerRef.current?.elapsedMs() ?? 0;
    const record =
      mode === 'pro'
        ? {
            result: recordAttempt(profile.id, lessonRecordKey(lesson.id), {
              firstTry: firstTryCount,
              total: totalQ,
              ms: elapsed,
            }),
            attemptMs: elapsed,
          }
        : null;
    const stopping = isStoppingPoint({ mode, finishedCount: noteLessonFinished(), breakDue: breakDueRef.current });

    // The star sound belongs to each star's impact frame inside LessonResult
    setResultSummary({
      stars: res.stars,
      xpEarned: res.xpEarned,
      xpBefore,
      firstTryCount,
      retryCount,
      totalCount: totalQ,
      stickerIsNew,
      record,
      stopping,
    });
  };

  const handleCheckAnswer = () => {
    if (!activeQuestion || !session || !lesson) return;
    stopQueue();
    const isCorrect = evaluateQuestionAnswer(activeQuestion, answerVal);

    // The title already carries the verdict, so the fallback explanation is just the explanation
    let explanation = resolveTxt(activeQuestion.explainCorrect, mode);
    if (!isCorrect) {
      const wrongKey = typeof answerVal === 'string' || typeof answerVal === 'boolean' ? String(answerVal) : '';
      const specific = wrongKey && activeQuestion.explainIncorrect?.[wrongKey];
      if (specific) explanation = resolveTxt(specific, mode);
      if (inQuiz) recordQuestionMistake(
        activeQuestion.tags,
        activeQuestion.type === 'limit',
        activeQuestion.type === 'limit' ? lesson.id : undefined,
      );
    }

    playSound(isCorrect ? 'correct' : 'incorrect', Boolean(profile?.settings.soundEnabled));

    // Partial credit decides the title: "Hampir!" only when at least 70% of the parts were right
    const judged = judgeParts(activeQuestion, answerVal);
    const almost = !isCorrect && judged.partial && judged.total > 0 && judged.right / judged.total >= ALMOST_RATIO;

    const seenBefore = inQuiz && Boolean(head && head.question.id in session.attemptedFirstTry);
    const hintPenalty = mode === 'pro' && usedHintLevel > 0;
    const cleanFirstTry = inQuiz && isCorrect && !seenBefore && !hintPenalty;
    if (inQuiz) {
      if (cleanFirstTry) streakRef.current += 1;
      else if (!isCorrect) streakRef.current = 0;
    }
    const comboAfter = streakRef.current;
    const sparks: 0 | 6 | 8 =
      cleanFirstTry && mode === 'junior' && prefs.tier === 'full' ? (comboAfter >= 5 ? 8 : 6) : 0;
    const xp = inQuiz && isCorrect ? (seenBefore ? XP_RULES.RETRY_CORRECT : XP_RULES.FIRST_TRY_CORRECT) : 0;

    // Where "Lanjut" goes. The snapshot is saved now, so leaving mid-feedback keeps this answer.
    let nextSession = session;
    let nextMisses = misses;
    let nextIndex = timelineIndex;
    let complete = false;
    if (inQuiz && head) {
      nextSession = advanceQuizSession(session, head.question.id, isCorrect);
      if (!isCorrect) nextMisses += 1;
      if (item?.kind === 'check') nextIndex = timelineIndex + 1;
      complete = inClosing && nextSession.queue.length === 0;
    } else if (!prediction) {
      nextIndex = timelineIndex + 1;
    }
    if (!complete) persist(nextIndex, nextSession, nextMisses, predictionDone || Boolean(prediction));

    setSubmitted({
      correct: isCorrect,
      explanation,
      xp,
      cleanFirstTry,
      comboAfter,
      sparks,
      almost,
      pending: { session: nextSession, stepIndex: nextIndex, misses: nextMisses, complete },
    });
  };

  const handleContinueAfterFeedback = () => {
    stopQueue();
    if (!submitted || !lesson) return;
    const { pending } = submitted;

    // The XP chip flies only after "Lanjut", never while the explanation is on screen. It leaves from the
    // sheet's badge, so it is cloned before the sheet unmounts. Nothing flies into a result screen.
    if (submitted.correct && submitted.xp > 0 && !pending.complete) {
      const gain = submitted.xp;
      const combo = submitted.cleanFirstTry ? submitted.comboAfter : null;
      flyTo(xpBadgeRef.current, xpChipRef.current, {
        trail: mode === 'junior' && prefs.tier === 'full' && submitted.comboAfter >= 3 ? 2 : 0,
        onArrive: () => {
          setSessionXp((x) => x + gain);
          setBumpKey((k) => k + 1);
          if (combo !== null) setComboShown(combo);
          playSound('tap', Boolean(profile?.settings.soundEnabled));
        },
      });
    } else if (submitted.correct && submitted.xp > 0) {
      setSessionXp((x) => x + submitted.xp);
    }
    if (!submitted.correct && inQuiz) setComboShown(0);

    if (prediction) setPredictionDone(true);
    setSession(pending.session);
    setMisses(pending.misses);
    setTimelineIndex(pending.stepIndex);
    setStepNumber((n) => n + 1);
    resetQuestionState();
    saveLessonStep(lesson.id, pending.stepIndex);
    if (pending.complete) finishLesson(pending.session);
  };

  const restartLesson = () => {
    if (!lesson || !profile) return;
    stopQueue();
    finishFly();
    clearSnapshot(profile.id, lesson.id);
    finishedRef.current = null;
    resetPlayer();
    setRunKey((k) => k + 1);
  };

  const handleHint = () => {
    if (!activeQuestion) return;
    const hints = activeQuestion.hints;
    if (!hints) {
      setGuideTypeOpen(activeQuestion.type);
      return;
    }
    const next: 1 | 2 = usedHintLevel === 0 || !hints[1] ? 1 : 2;
    setUsedHintLevel(next);
    setHintModalOpen(true);
    if (autoRead && canSpeak) {
      speakTarget({ kind: 'hint', text: resolveTxt(hints[next - 1]!, mode) });
    }
  };

  const hintText = (() => {
    const hints = activeQuestion?.hints;
    if (!hints) return '';
    return resolveTxt(hints[usedHintLevel === 2 && hints[1] ? 1 : 0]!, mode);
  })();

  const handleAnswerChange = (val: unknown) => {
    setAnswerVal(val);
    if (activeQuestion && CHOICE_TYPES.includes(activeQuestion.type)) setSelectionChanges((c) => c + 1);
  };

  /* ---------------------------------------------------------------- screens */

  if (!profile) return null;

  if (loadError) {
    return (
      <div className="mx-auto flex max-w-[540px] flex-col items-center gap-4 p-6 text-center">
        <div className="pw-stage flex w-full justify-center p-6">
          <Bito expression="think" size={96} custom={profile.mascot} />
        </div>
        <h1 className="pw-h2">Bito tersesat sebentar</h1>
        <p className="pw-body m-0 text-[var(--ink-2)]">
          Sinyal putus? Pelajaran ini belum tersimpan di HP-mu. Coba lagi saat sinyal kembali.
        </p>
        <Button
          variant="primary"
          onClick={() => {
            setLoadError(false);
            setLoadAttempt((a) => a + 1);
          }}
        >
          Coba lagi
        </Button>
      </div>
    );
  }

  if (!lesson || !plan || !ready) return <PageLoader />;

  const readButton = canSpeak ? <ReadAloudButton mode={mode} speaking={speaking} onToggle={toggleSpeak} /> : null;

  // Progress: one continuous bar. A miss lengthens the track by one step, and the fill keeps its length, so it never moves backwards.
  const cardsPassed = timeline.slice(0, Math.min(timelineIndex, timeline.length)).filter((t) => t.kind !== 'check').length;
  const cardsTotal = timeline.filter((t) => t.kind !== 'check').length;
  const doneSteps = cardsPassed + (session?.completedIds.length ?? 0) + misses;
  const totalSteps = cardsTotal + plan.questions.length + misses;
  const progress = totalSteps > 0 ? Math.min(100, (doneSteps / totalSteps) * 100) : 0;

  /* ---- Result ---- */
  if (resultSummary) {
    const sticker = lesson.stickerId ? STICKERS_BY_ID[lesson.stickerId] : undefined;
    const nextLessonList = worldMeta?.lessons.filter((l) => l.modes.includes(profile.mode)) ?? [];
    const curIdx = nextLessonList.findIndex((l) => l.id === lesson.id);
    const nextLesson = curIdx >= 0 && curIdx + 1 < nextLessonList.length ? nextLessonList[curIdx + 1] : null;
    const bonusQuestion = lesson.steps
      .map((s) => (s.kind === 'question' ? s.q : null))
      .find(
        (q): q is Question =>
          q !== null &&
          Boolean(q.modes?.includes('pro')) &&
          !q.modes?.includes('junior') &&
          (q.type === 'fill' || q.type === 'spotbug') &&
          q.difficulty <= 2,
      );

    return (
      <WorldThemeWrapper worldId={worldId} className="flex min-h-[100dvh] flex-col justify-center">
        <LessonResult
          key={runKey}
          mode={mode}
          lessonTitle={lesson.title}
          worldTitle={worldMeta?.title ?? 'Dunia'}
          mascot={profile.mascot}
          stars={resultSummary.stars}
          firstTryCount={resultSummary.firstTryCount}
          retryCount={resultSummary.retryCount}
          totalCount={resultSummary.totalCount}
          isSideQuest={lesson.isSideQuest}
          xpEarned={resultSummary.xpEarned}
          xpBefore={resultSummary.xpBefore}
          recap={resolveTxt(lesson.recap, mode)}
          atWork={lesson.atWork}
          reflection={<LessonReflection profileId={profileId} lesson={lesson} mode={mode} />}
          talkPrompt={lesson.companion?.talkPrompts[0]}
          sticker={sticker ? { data: sticker, isNew: resultSummary.stickerIsNew } : undefined}
          record={resultSummary.record}
          soundEnabled={profile.settings.soundEnabled}
          stopping={resultSummary.stopping}
          hasNextLesson={Boolean(nextLesson)}
          bonusAvailable={Boolean(bonusQuestion)}
          bonusDone={hasSeen(profile.id, `bonus:${lesson.id}`)}
          onNext={() => nextLesson && navigate(`/belajar/${nextLesson.id}`)}
          onWorld={() => navigate(`/dunia/${worldId}`)}
          onHome={() => navigate('/beranda')}
          onAgain={restartLesson}
          onBonus={() => setBonusOpen(true)}
        />
        {bonusOpen && bonusQuestion && (
          <BonusChallenge
            question={bonusQuestion}
            lessonId={lesson.id}
            profileId={profile.id}
            soundEnabled={profile.settings.soundEnabled}
            autoRead={autoRead}
            canSpeak={hasIndonesianVoiceAvailable()}
            onClose={() => setBonusOpen(false)}
          />
        )}
      </WorldThemeWrapper>
    );
  }

  /* ---- The step ---- */
  const hasAnswer =
    answerVal !== undefined &&
    answerVal !== '' &&
    !(Array.isArray(answerVal) && answerVal.length === 0) &&
    !(
      typeof answerVal === 'object' &&
      !Array.isArray(answerVal) &&
      Object.keys(answerVal as Record<string, unknown>).length === 0
    );
  // The order type always has a value to check
  const isOrderReady = activeQuestion?.type === 'order';

  const questionKicker = (() => {
    if (prediction) return mode === 'junior' ? 'Tebak dulu!' : 'Prediksi awal';
    if (item?.kind === 'warmup') return mode === 'junior' ? 'Ingat-ingat' : 'Pemanasan';
    if (isRetryQ) return 'Coba lagi';
    if (item?.kind === 'check') return 'Cek cepat';
    const at = activeQuestion ? plan.closingIds.indexOf(activeQuestion.id) : -1;
    return at >= 0 ? `Soal ${at + 1} dari ${plan.closingIds.length}` : 'Soal';
  })();

  const cardProps: CardProps = {
    lesson,
    worldId,
    worldColor: worldMeta?.color,
    mode,
    mascot: profile.mascot,
    reading,
    readButton,
  };

  const hintOffer =
    mode === 'junior' && Boolean(activeQuestion?.hints) && usedHintLevel === 0 && !submitted && (isRetryQ || selectionChanges >= 3);

  const primaryLabel = activeQuestion
    ? 'Periksa'
    : card?.kind === 'limit'
      ? limitRevealed
        ? 'Paham →'
        : 'Apa bedanya? →'
      : 'Lanjut →';

  // The first step has no entrance (the route already carries it). A returning question plays M13, every other step M12.
  const enter = stepNumber > 0 ? (isRetryQ ? 'retry' : 'right') : undefined;

  return (
    <WorldThemeWrapper worldId={worldId} className="mx-auto flex min-h-[100dvh] max-w-[1080px] flex-col px-4 py-3 sm:px-6">
      <LessonHeader
        mode={mode}
        focus={focus}
        onToggleFocus={() => {
          setLessonFocus(profileId, !focus);
          setFocus(!focus);
        }}
        progress={progress}
        sessionXp={sessionXp}
        xpChipRef={xpChipRef}
        bumpKey={bumpKey}
        combo={comboShown}
        onExit={() => setExitConfirmOpen(true)}
      />

      <main className="flex flex-1 flex-col">
        {offerOpen && card && (
          <div className="pw-well mb-4 flex flex-wrap items-center gap-3" role="group" aria-label="Bacakan otomatis">
            <Volume2 className="h-6 w-6 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
            <p className="pw-body m-0 flex-1 font-bold">Mau dibacakan?</p>
            <Button
              variant="primary"
              onClick={() => {
                updateSettings({ autoReadAloud: true });
                markSeen(profile.id, 'offer:autoread');
                setOfferOpen(false);
              }}
            >
              Nyalakan
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                markSeen(profile.id, 'offer:autoread');
                setOfferOpen(false);
              }}
            >
              Tidak usah
            </Button>
          </div>
        )}

        <div
          key={`${runKey}-${stepNumber}`}
          data-enter={enter}
          data-rm="fade"
          className={`flex w-full flex-1 flex-col ${enter ? 'pw-enter' : ''}`}
        >
          {card?.kind === 'story' && <StoryCard {...cardProps} step={card} />}
          {card?.kind === 'concept' && <ConceptCard {...cardProps} step={card} />}
          {card?.kind === 'sim' && <SimCard {...cardProps} step={card} />}
          {card?.kind === 'limit' && <LimitStepCard {...cardProps} step={card} revealed={limitRevealed} />}

          {activeQuestion && (
            <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-center gap-5 pb-[6vh]">
              <QuestionIntro
                question={activeQuestion}
                mode={mode}
                kicker={questionKicker}
                retry={isRetryQ}
                reading={reading}
                action={readButton}
              />
              {prediction && !submitted && (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="pw-small">Coba tebak. Poinmu tetap sama.</span>
                  <Button variant="ghost" onClick={() => {
                    if (!session) return;
                    stopQueue();
                    persist(timelineIndex, session, misses, true);
                    setPredictionDone(true);
                    resetQuestionState();
                    setStepNumber((n) => n + 1);
                  }}>Langsung ke konsep</Button>
                </div>
              )}
              <QuestionRenderer
                question={activeQuestion}
                mode={mode}
                value={answerVal}
                onChange={handleAnswerChange}
                disabled={Boolean(submitted)}
                isSubmitted={Boolean(submitted)}
                isCorrect={submitted?.correct}
                sparks={submitted?.correct ? submitted.sparks : 0}
                reading={reading}
                withContext={false}
              />
            </div>
          )}
        </div>
      </main>

      <ActionBar
        mode={mode}
        primaryLabel={primaryLabel}
        onPrimary={activeQuestion ? handleCheckAnswer : handlePrimaryOnCard}
        primaryDisabled={activeQuestion ? !hasAnswer && !isOrderReady : false}
        soundEnabled={profile.settings.soundEnabled}
        onHint={activeQuestion ? handleHint : undefined}
        hintOffer={hintOffer}
        covered={Boolean(submitted)}
        focusKey={`${runKey}-${stepNumber}`}
      />

      <FeedbackSheet
        open={Boolean(submitted)}
        isCorrect={Boolean(submitted?.correct)}
        almost={Boolean(submitted?.almost)}
        isFirstTry={Boolean(submitted?.cleanFirstTry)}
        xp={submitted?.xp ?? 0}
        explanation={submitted?.explanation ?? ''}
        mode={mode}
        showRepeat={inQuiz}
        onContinue={handleContinueAfterFeedback}
        xpBadgeRef={xpBadgeRef}
        canSpeak={canSpeak}
        speaking={speaking}
        reading={reading}
        onToggleSpeak={toggleFeedbackSpeak}
      />

      {/* Dialog Petunjuk 2 Tingkat */}
      <DialogModal
        open={hintModalOpen}
        onClose={() => {
          setHintModalOpen(false);
          stopQueue();
        }}
        title={usedHintLevel === 2 ? 'Petunjuk 2' : 'Petunjuk'}
      >
        <div className="space-y-3">
          <p className="pw-body m-0">
            <span className={reading?.el === 'hint' ? 'pw-mark' : undefined}>{hintText}</span>
          </p>
          {canSpeak && (
            <ReadAloudButton
              mode={mode}
              speaking={speaking}
              onToggle={() => (speaking ? stopQueue() : speakTarget({ kind: 'hint', text: hintText }))}
            />
          )}
          {activeQuestion && (
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setHintModalOpen(false);
                stopQueue();
                setGuideTypeOpen(activeQuestion.type);
              }}
            >
              Lihat cara menjawab
            </Button>
          )}
        </div>
      </DialogModal>

      {/* Panduan Pertama Kali Tipe Soal (V13 / F18) */}
      {guideTypeOpen && (
        <QuestionGuideOverlay
          questionType={guideTypeOpen}
          open={Boolean(guideTypeOpen)}
          onClose={() => setGuideTypeOpen(null)}
        />
      )}

      {/* Konfirmasi Keluar Pelajaran (9.5) */}
      <DialogModal open={exitConfirmOpen} onClose={() => setExitConfirmOpen(false)} title="Keluar sekarang?">
        <div className="space-y-4">
          <p className="pw-body m-0 text-[var(--ink-2)]">
            Kemajuanmu di pelajaran ini sudah disimpan. Kamu bisa melanjutkannya kapan saja.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setExitConfirmOpen(false)} className="flex-1">
              Tetap belajar
            </Button>
            <Button variant="primary" onClick={() => navigate(`/dunia/${worldId}`)} className="flex-1">
              Keluar
            </Button>
          </div>
        </div>
      </DialogModal>

      {/* Pengingat Istirahat Opsional Junior (12.3): "Istirahat dulu" is the primary button */}
      <DialogModal
        open={breakModalOpen}
        onClose={() => setBreakModalOpen(false)}
        title="Waktunya istirahat sebentar!"
      >
        <div className="space-y-4 text-center">
          <Bito expression="sleep" size={96} className="mx-auto" />
          <p className="pw-body m-0">
            Kamu sudah belajar {profile.settings.breakReminderMinutes} menit. Istirahatkan mata sebentar, yuk!
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setBreakModalOpen(false)} className="flex-1">
              Lanjut belajar
            </Button>
            <Button variant="primary" onClick={() => navigate('/beranda')} className="flex-1">
              Istirahat dulu
            </Button>
          </div>
        </div>
      </DialogModal>
    </WorldThemeWrapper>
  );
};
