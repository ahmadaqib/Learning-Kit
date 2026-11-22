import React, { useEffect, useMemo, useState } from 'react';
import { Lightbulb, Volume2, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { STICKERS_BY_ID } from '@/content/stickers';
import { WORLD_META_BY_ID } from '@/content/worldMeta';
import { loadWorldBundle } from '@/content/worldLoader';
import { resolveTxt, type Lesson, type Question, type Step } from '@/content/schema';
import { advanceQuizSession, createQuizSession, evaluateQuestionAnswer, type QuizSessionState } from '@/engine/queue';
import { playSound } from '@/engine/sound';
import { hasIndonesianVoiceAvailable, speakText, stopSpeaking } from '@/engine/speech';
import { useAppStore } from '@/store/useAppStore';
import { ConceptVisual } from '@/components/illustrations/ConceptVisuals';
import { FeedbackSheet } from '@/components/lesson/FeedbackSheet';
import { LimitCard } from '@/components/lesson/LimitCard';
import { QuestionGuideOverlay } from '@/components/lesson/QuestionGuideOverlay';
import { Bito } from '@/components/mascot/Bito';
import { QuestionRenderer } from '@/components/questions/QuestionRenderer';
import { SimulatorHost } from '@/components/sims/SimulatorHost';
import { Button } from '@/components/ui/Button';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { ConfettiBurst } from '@/components/ui/ConfettiBurst';
import { DialogModal } from '@/components/ui/DialogModal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RichText } from '@/components/ui/RichText';
import { StarRow } from '@/components/ui/StarRow';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

export const LessonPlayerPage: React.FC = () => {
  const { pelajaranId = 'a01-l01' } = useParams<{ pelajaranId: string }>();
  const navigate = useNavigate();

  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const saveLessonStep = useAppStore((s) => s.saveLessonStep);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const recordQuestionMistake = useAppStore((s) => s.recordQuestionMistake);
  const markQuestionGuideSeen = useAppStore((s) => s.markQuestionGuideSeen);

  const worldId = pelajaranId.split('-')[0];
  const worldMeta = WORLD_META_BY_ID[worldId];

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [warmupQuestion, setWarmupQuestion] = useState<Question | null>(null);
  const [loadError, setLoadError] = useState(false);

  // Fase: 0 = konten berurutan (warmup + non-question steps), lalu kuis dengan antrean ulang, lalu summary
  const [introIndex, setIntroIndex] = useState(0);
  const [inQuizPhase, setInQuizPhase] = useState(false);
  const [quizSession, setQuizSession] = useState<QuizSessionState | null>(null);
  const [answerVal, setAnswerVal] = useState<unknown>(undefined);
  const [submitted, setSubmitted] = useState<{ correct: boolean; explanation: string; isFirstTry: boolean } | null>(null);
  const [usedHintLevel, setUsedHintLevel] = useState<0 | 1 | 2>(0);
  const [hintModalOpen, setHintModalOpen] = useState(false);
  const [guideTypeOpen, setGuideTypeOpen] = useState<Question['type'] | null>(null);
  const [exitConfirmOpen, setExitConfirmOpen] = useState(false);
  const [breakModalOpen, setBreakModalOpen] = useState(false);
  const [resultSummary, setResultSummary] = useState<{
    stars: 0 | 1 | 2 | 3;
    xpEarned: number;
    firstTryCount: number;
    totalCount: number;
    stickerId?: string;
  } | null>(null);

  useEffect(() => {
    let active = true;
    setLoadError(false);
    setLesson(null);
    setResultSummary(null);
    setInQuizPhase(false);
    setSubmitted(null);
    setAnswerVal(undefined);

    loadWorldBundle(worldId)
      .then(async (bundle) => {
        if (!active) return;
        const found = bundle.lessons.find((l) => l.id === pelajaranId);
        if (!found) {
          setLoadError(true);
          return;
        }
        setLesson(found);

        // Muat soal pemanasan dari pelajaran sebelumnya (§5 bagian 1)
        if (found.warmupFrom) {
          const prevWorldId = found.warmupFrom.split('-')[0];
          const prevBundle =
            prevWorldId === worldId ? bundle : await loadWorldBundle(prevWorldId).catch(() => null);
          const prevLesson = prevBundle?.lessons.find((l) => l.id === found.warmupFrom);
          const candidateQ =
            prevLesson?.reviewCards[0] ??
            prevLesson?.steps.find((s): s is Extract<Step, { kind: 'question' }> => s.kind === 'question')?.q ??
            null;
          if (active && candidateQ) {
            setWarmupQuestion(candidateQ);
          }
        }

        const savedIdx = profile?.lessons[found.id]?.stepIndex ?? 0;
        setIntroIndex(savedIdx);
      })
      .catch(() => {
        if (active) setLoadError(true);
      });

    return () => {
      active = false;
      stopSpeaking();
    };
  }, [worldId, pelajaranId]);

  // Pengingat istirahat opsional untuk Mode Junior (§12.3)
  useEffect(() => {
    if (!profile || profile.mode !== 'junior' || profile.settings.breakReminderMinutes <= 0) return;
    const ms = profile.settings.breakReminderMinutes * 60 * 1000;
    const timer = setTimeout(() => setBreakModalOpen(true), ms);
    return () => clearTimeout(timer);
  }, [profile?.mode, profile?.settings.breakReminderMinutes]);

  const mode = profile?.mode ?? 'junior';

  const introSteps = useMemo(() => {
    if (!lesson) return [];
    const list: ({ kind: 'warmup'; q: Question } | Step)[] = [];
    if (warmupQuestion) {
      list.push({ kind: 'warmup', q: warmupQuestion });
    }
    for (const s of lesson.steps) {
      if (s.kind === 'question') continue;
      if (s.kind === 'concept' && s.modes && !s.modes.includes(mode)) continue;
      if (s.kind === 'limit' && mode === 'junior' && !s.riskyAnalogy) continue;
      list.push(s);
    }
    return list;
  }, [lesson, warmupQuestion, mode]);

  const lessonQuestions = useMemo(() => {
    if (!lesson) return [];
    return lesson.steps
      .filter((s): s is Extract<Step, { kind: 'question' }> => s.kind === 'question')
      .map((s) => s.q)
      .filter((q) => !q.modes || q.modes.includes(mode));
  }, [lesson, mode]);

  const currentIntro = !inQuizPhase ? introSteps[introIndex] : undefined;
  const currentQuizItem = inQuizPhase ? quizSession?.queue[0] : undefined;
  const activeQuestion: Question | undefined =
    currentIntro?.kind === 'warmup' ? currentIntro.q : currentQuizItem?.question;

  // Panduan pertama kali per tipe soal (V13 / F18)
  useEffect(() => {
    if (!activeQuestion || !profile) return;
    if (!profile.seenQuestionGuides.includes(activeQuestion.type)) {
      setGuideTypeOpen(activeQuestion.type);
      markQuestionGuideSeen(activeQuestion.type);
    }
  }, [activeQuestion?.type, profile?.seenQuestionGuides]);

  // Bacakan otomatis jika dinyalakan di pengaturan
  useEffect(() => {
    if (!profile?.settings.autoReadAloud) return;
    const txt = getReadableText();
    if (txt) speakText(txt);
    return () => stopSpeaking();
  }, [introIndex, inQuizPhase, currentQuizItem?.question.id]);

  if (!profile) return null;

  if (loadError) {
    return (
      <div className="mx-auto max-w-[540px] p-6 text-center space-y-4">
        <Bito expression="think" size={96} className="mx-auto" />
        <h1 className="pw-h2">Bito tersesat sebentar</h1>
        <p className="pw-body text-[var(--ink-2)]">Periksa koneksi internet, lalu coba lagi.</p>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Coba lagi
        </Button>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="mx-auto flex min-h-[60dvh] max-w-[640px] flex-col items-center justify-center gap-4 p-6">
        <Bito expression="idle" size={96} />
        <p className="pw-body font-bold text-[var(--ink-2)]">Memuat pelajaran...</p>
      </div>
    );
  }

  function getReadableText(): string {
    if (currentIntro) {
      if (currentIntro.kind === 'warmup') return resolveTxt(currentIntro.q.prompt, mode);
      if (currentIntro.kind === 'story') {
        return currentIntro.body.map((b) => (b.t === 'code' ? b.v : resolveTxt(b.v, mode))).join('');
      }
      if (currentIntro.kind === 'concept') {
        return `${resolveTxt(currentIntro.title, mode)}. ${currentIntro.body
          .map((b) => (b.t === 'code' ? b.v : resolveTxt(b.v, mode)))
          .join('')}`;
      }
      if (currentIntro.kind === 'limit') {
        return `Batas analogi ${resolveTxt(currentIntro.analogy, mode)}.`;
      }
      if (currentIntro.kind === 'sim') {
        return resolveTxt(currentIntro.instructions, mode);
      }
    }
    if (currentQuizItem) {
      return resolveTxt(currentQuizItem.question.prompt, mode);
    }
    return lesson?.title ?? '';
  }

  const handleAdvanceIntro = () => {
    stopSpeaking();
    setSubmitted(null);
    setAnswerVal(undefined);
    setUsedHintLevel(0);

    if (introIndex + 1 < introSteps.length) {
      const nextIdx = introIndex + 1;
      setIntroIndex(nextIdx);
      saveLessonStep(lesson.id, nextIdx);
    } else {
      setInQuizPhase(true);
      setQuizSession(createQuizSession(lessonQuestions));
      saveLessonStep(lesson.id, introSteps.length);
    }
  };

  const handleCheckAnswer = () => {
    if (!activeQuestion) return;
    const isCorrect = evaluateQuestionAnswer(activeQuestion, answerVal);

    let explanation = resolveTxt(activeQuestion.explainCorrect, mode);
    if (!isCorrect) {
      const wrongKey = typeof answerVal === 'string' || typeof answerVal === 'boolean' ? String(answerVal) : '';
      const specific = wrongKey && activeQuestion.explainIncorrect?.[wrongKey];
      explanation = specific
        ? resolveTxt(specific, mode)
        : mode === 'junior'
          ? `Hampir! Jawaban itu belum tepat. ${resolveTxt(activeQuestion.explainCorrect, mode)}`
          : `Belum tepat. ${resolveTxt(activeQuestion.explainCorrect, mode)}`;

      recordQuestionMistake(
        activeQuestion.tags,
        activeQuestion.type === 'limit',
        activeQuestion.type === 'limit' ? lesson.id : undefined,
      );
    }

    playSound(isCorrect ? 'correct' : 'incorrect', profile.settings.soundEnabled);

    const seenBefore = Boolean(quizSession && activeQuestion.id in quizSession.attemptedFirstTry);
    const hintPenalty = mode === 'pro' && usedHintLevel > 0;
    const isFirstTry = !seenBefore && !hintPenalty && inQuizPhase;

    setSubmitted({ correct: isCorrect, explanation, isFirstTry });
  };

  const handleContinueAfterFeedback = () => {
    stopSpeaking();
    if (!inQuizPhase) {
      handleAdvanceIntro();
      return;
    }

    if (!quizSession || !currentQuizItem || !submitted) return;
    const nextSession = advanceQuizSession(quizSession, currentQuizItem.question.id, submitted.correct);
    setSubmitted(null);
    setAnswerVal(undefined);
    setUsedHintLevel(0);

    if (nextSession.queue.length === 0) {
      // Pelajaran selesai!
      const totalQ = lessonQuestions.length;
      const firstTryCount = nextSession.firstTryCorrectIds.length;
      const retryCount = nextSession.retryCorrectIds.length;
      const res = completeLesson({
        lessonId: lesson.id,
        firstTryCorrect: firstTryCount,
        retryCorrect: retryCount,
        totalQuestions: totalQ,
        stickerId: lesson.stickerId,
        reviewCardIds: lesson.reviewCards.map((rc) => rc.id),
        isSideQuest: lesson.isSideQuest,
      });
      playSound('star', profile.settings.soundEnabled);
      setResultSummary({
        stars: res.stars,
        xpEarned: res.xpEarned,
        firstTryCount,
        totalCount: totalQ,
        stickerId: lesson.stickerId,
      });
    } else {
      setQuizSession(nextSession);
    }
  };

  // Hitung progress bar langkah
  const totalEstimatedSteps = introSteps.length + lessonQuestions.length;
  const completedStepsCount = inQuizPhase
    ? introSteps.length + (quizSession?.completedIds.length ?? 0)
    : introIndex;
  const progressPct = totalEstimatedSteps > 0 ? (completedStepsCount / totalEstimatedSteps) * 100 : 0;

  // Layar hasil pelajaran (§9.5.5)
  if (resultSummary) {
    const earnedSticker = resultSummary.stickerId ? STICKERS_BY_ID[resultSummary.stickerId] : undefined;
    const nextLessonList = worldMeta?.lessons.filter((l) => l.modes.includes(profile.mode)) ?? [];
    const curIdx = nextLessonList.findIndex((l) => l.id === lesson.id);
    const nextLesson = curIdx >= 0 && curIdx + 1 < nextLessonList.length ? nextLessonList[curIdx + 1] : null;

    return (
      <WorldThemeWrapper worldId={worldId} className="mx-auto flex min-h-[100dvh] max-w-[600px] flex-col items-center justify-center px-5 py-8 text-center">
        <ConfettiBurst active={resultSummary.stars === 3} />
        <Bito expression="cheer" size={128} custom={profile.mascot} />
        <div className="mt-4">
          <StarRow stars={resultSummary.stars} size={36} animated />
        </div>
        <h1 className="pw-display mt-4">Pelajaran selesai!</h1>
        <p className="pw-h3 mt-1 text-[var(--ink-2)]">{lesson.title}</p>

        <div className="mt-6 grid w-full grid-cols-2 gap-3">
          <div className="pw-card p-4">
            <div className="pw-h1 text-[var(--star)]">+{resultSummary.xpEarned} XP</div>
            <div className="pw-small text-[var(--ink-2)]">Poin pengalaman</div>
          </div>
          <div className="pw-card p-4">
            <div className="pw-h1">
              {resultSummary.firstTryCount}/{resultSummary.totalCount}
            </div>
            <div className="pw-small text-[var(--ink-2)]">Benar percobaan ke-1</div>
          </div>
        </div>

        <div className="pw-card mt-4 w-full p-4 text-left">
          <span className="pw-kicker">INTI HARI INI</span>
          <p className="pw-body mt-1 font-semibold">{resolveTxt(lesson.recap, mode)}</p>
        </div>

        {earnedSticker && (
          <div className="pw-card mt-4 w-full border-2 border-[var(--world-600)] bg-[var(--world-50)] p-4 text-left">
            <span className="pw-kicker">STIKER BARU TERBUKA!</span>
            <div className="mt-1 font-extrabold text-[var(--ink)]">{earnedSticker.title}</div>
            <p className="pw-small text-[var(--ink-2)]">{resolveTxt(earnedSticker.summary, mode)}</p>
          </div>
        )}

        <div className="mt-6 w-full space-y-2.5">
          {nextLesson ? (
            <Button variant="primary" fullWidth onClick={() => navigate(`/belajar/${nextLesson.id}`)}>
              Pelajaran berikutnya →
            </Button>
          ) : (
            <Button variant="primary" fullWidth onClick={() => navigate(`/dunia/${worldId}`)}>
              Kembali ke Dunia {worldMeta?.title} →
            </Button>
          )}
          {resultSummary.stars < 3 && (
            <Button variant="ghost" fullWidth onClick={() => window.location.reload()}>
              Ulangi untuk ★★★
            </Button>
          )}
        </div>
      </WorldThemeWrapper>
    );
  }

  const canShowSpeak = (mode === 'junior' || profile.settings.autoReadAloud) && hasIndonesianVoiceAvailable();
  const hasAnswer =
    answerVal !== undefined &&
    answerVal !== '' &&
    !(Array.isArray(answerVal) && answerVal.length === 0) &&
    !(
      typeof answerVal === 'object' &&
      !Array.isArray(answerVal) &&
      Object.keys(answerVal as Record<string, unknown>).length === 0
    );

  // Untuk tipe order, nilai default sudah tersedia
  const isOrderReady = activeQuestion?.type === 'order';

  return (
    <WorldThemeWrapper worldId={worldId} className="mx-auto flex min-h-[100dvh] max-w-[1080px] flex-col px-4 py-3 sm:px-6">
      {/* Header Fokus Pemutar Pelajaran (§9.5) */}
      <header className="mb-4 flex items-center gap-3 pw-safe-top">
        <button
          type="button"
          onClick={() => setExitConfirmOpen(true)}
          aria-label="Keluar pelajaran"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex-1">
          <ProgressBar value={progressPct} label="Kemajuan langkah pelajaran" />
        </div>

        {canShowSpeak && (
          <button
            type="button"
            onClick={() => speakText(getReadableText())}
            aria-label="Bacakan kartu ini"
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] cursor-pointer"
          >
            <Volume2 className="h-5 w-5" aria-hidden="true" />
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            if (activeQuestion?.hints && usedHintLevel < 2) {
              setUsedHintLevel((l) => (l === 0 ? 1 : 2) as 1 | 2);
              setHintModalOpen(true);
            } else if (activeQuestion) {
              setGuideTypeOpen(activeQuestion.type);
            } else {
              setHintModalOpen(true);
            }
          }}
          aria-label="Petunjuk dan cara menjawab"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-[var(--warn-700)] cursor-pointer"
        >
          <Lightbulb className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      {/* Konten Utama: 1 kolom di HP/iPad tegak, 2 kolom di iPad mendatar/Desktop (§10.10) */}
      <div className="flex-1 flex flex-col justify-between pb-6">
        {currentIntro && currentIntro.kind !== 'warmup' && (
          <div className="grid flex-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            {/* Area Visual */}
            <div className="pw-card flex min-h-[200px] items-center justify-center bg-[var(--world-50)] p-5">
              {currentIntro.kind === 'story' && (
                <div className="flex flex-col items-center gap-3 text-center">
                  {mode === 'junior' && <Bito expression="wave" size={96} custom={profile.mascot} />}
                  <ConceptVisual
                    name="DiagramConcept"
                    props={{ worldId, topic: currentIntro.illustration }}
                    alt={lesson.title}
                    worldColor={worldMeta?.color}
                  />
                </div>
              )}
              {currentIntro.kind === 'concept' && (
                <div className="w-full space-y-3 flex flex-col items-center">
                  {currentIntro.visual.type === 'component' ? (
                    <ConceptVisual
                      name={currentIntro.visual.name}
                      props={currentIntro.visual.props}
                      alt={resolveTxt(currentIntro.visual.alt, mode)}
                      worldColor={worldMeta?.color}
                    />
                  ) : (
                    <ConceptVisual
                      name="DiagramConcept"
                      props={{ worldId, topic: currentIntro.visual.src }}
                      alt={resolveTxt(currentIntro.visual.alt, mode)}
                      worldColor={worldMeta?.color}
                    />
                  )}
                  {currentIntro.code && mode === 'pro' && (
                    <div className="w-full">
                      <CodeBlock snippet={currentIntro.code} />
                    </div>
                  )}
                </div>
              )}
              {currentIntro.kind === 'limit' && (
                <ConceptVisual
                  name="DiagramConcept"
                  props={{ worldId, topic: 'batas-analogi' }}
                  alt="Perbandingan hal yang mirip dan berbeda dari analogi"
                  worldColor={worldMeta?.color}
                />
              )}
              {currentIntro.kind === 'sim' && (
                <div className="w-full">
                  <SimulatorHost simId={currentIntro.simId} mode={mode} props={currentIntro.props} />
                </div>
              )}
            </div>

            {/* Area Teks & Tombol Lanjut */}
            <div className="flex flex-col justify-between gap-6">
              <div className="space-y-4">
                {currentIntro.kind === 'story' && (
                  <>
                    <span className="pw-kicker">CERITA PEMBUKA · {lesson.title}</span>
                    <h1 className="pw-h2">{lesson.title}</h1>
                    <p className="pw-body-l">
                      <RichText segments={currentIntro.body} mode={mode} />
                    </p>
                    <div className="inline-block rounded-xl bg-[var(--world-50)] px-3.5 py-2 pw-small font-bold text-[var(--world-700)]">
                      Tujuan: {resolveTxt(lesson.objective, mode)}
                    </div>
                  </>
                )}

                {currentIntro.kind === 'concept' && (
                  <>
                    <span className="pw-kicker">{worldMeta?.title}</span>
                    <h2 className="pw-h2">{resolveTxt(currentIntro.title, mode)}</h2>
                    <p className="pw-body">
                      <RichText segments={currentIntro.body} mode={mode} />
                    </p>
                  </>
                )}

                {currentIntro.kind === 'limit' && <LimitCard step={currentIntro} mode={mode} />}

                {currentIntro.kind === 'sim' && (
                  <>
                    <span className="pw-kicker">COBA SENDIRI</span>
                    <h2 className="pw-h2">Simulasi Interaktif</h2>
                    <p className="pw-body pw-prose">{resolveTxt(currentIntro.instructions, mode)}</p>
                  </>
                )}
              </div>

              <div className="pw-safe-bottom">
                <Button variant="primary" fullWidth soundEnabled={profile.settings.soundEnabled} onClick={handleAdvanceIntro}>
                  {currentIntro.kind === 'limit' ? 'Paham →' : 'Lanjut →'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Kartu Soal (Pemanasan atau Kuis Utama) */}
        {activeQuestion && (
          <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col justify-between gap-6">
            <div className="space-y-5">
              <div>
                <span className="pw-kicker">
                  {currentIntro?.kind === 'warmup'
                    ? 'PEMANASAN PELAJARAN LALU'
                    : currentQuizItem?.isRetry
                      ? 'ULANGI SOAL INI'
                      : `SOAL ${(quizSession?.completedIds.length ?? 0) + 1} DARI ${lessonQuestions.length}`}
                </span>
                <h2 className="pw-h2 mt-1">{resolveTxt(activeQuestion.prompt, mode)}</h2>
              </div>

              <QuestionRenderer
                question={activeQuestion}
                mode={mode}
                value={answerVal}
                onChange={setAnswerVal}
                disabled={Boolean(submitted)}
                isSubmitted={Boolean(submitted)}
                isCorrect={submitted?.correct}
              />
            </div>

            {!submitted && (
              <div className="pw-safe-bottom">
                <Button
                  variant="primary"
                  fullWidth
                  disabled={!hasAnswer && !isOrderReady}
                  soundEnabled={profile.settings.soundEnabled}
                  onClick={handleCheckAnswer}
                >
                  Periksa
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <FeedbackSheet
        open={Boolean(submitted)}
        isCorrect={Boolean(submitted?.correct)}
        isFirstTry={Boolean(submitted?.isFirstTry)}
        explanation={submitted?.explanation ?? ''}
        mode={mode}
        onContinue={handleContinueAfterFeedback}
      />

      {/* Dialog Petunjuk 2 Tingkat */}
      <DialogModal
        open={hintModalOpen}
        onClose={() => setHintModalOpen(false)}
        title={`Petunjuk${usedHintLevel === 2 ? ' (Tingkat 2)' : ''}`}
      >
        <div className="space-y-3">
          <p className="pw-body">
            {activeQuestion?.hints
              ? resolveTxt(
                  activeQuestion.hints[usedHintLevel === 2 && activeQuestion.hints[1] ? 1 : 0]!,
                  mode,
                )
              : resolveTxt(lesson.objective, mode)}
          </p>
          {activeQuestion && (
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setHintModalOpen(false);
                setGuideTypeOpen(activeQuestion.type);
              }}
            >
              Putar ulang panduan cara menjawab
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

      {/* Konfirmasi Keluar Pelajaran (§9.5) */}
      <DialogModal
        open={exitConfirmOpen}
        onClose={() => setExitConfirmOpen(false)}
        title="Keluar sekarang?"
      >
        <div className="space-y-4">
          <p className="pw-body text-[var(--ink-2)]">
            Kemajuanmu di pelajaran ini sudah disimpan. Kamu bisa melanjutkannya kapan saja.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setExitConfirmOpen(false)} className="flex-1">
              Tetap belajar
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/dunia/${worldId}`)}
              className="flex-1"
            >
              Keluar
            </Button>
          </div>
        </div>
      </DialogModal>

      {/* Pengingat Istirahat Opsional Junior (§12.3) */}
      <DialogModal
        open={breakModalOpen}
        onClose={() => setBreakModalOpen(false)}
        title="Waktunya istirahat sebentar!"
      >
        <div className="space-y-4 text-center">
          <Bito expression="sleep" size={96} className="mx-auto" />
          <p className="pw-body">
            Kamu sudah belajar {profile.settings.breakReminderMinutes} menit. Istirahatkan mata sebentar, yuk!
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate('/beranda')} className="flex-1">
              Istirahat
            </Button>
            <Button variant="primary" onClick={() => setBreakModalOpen(false)} className="flex-1">
              Lanjut belajar
            </Button>
          </div>
        </div>
      </DialogModal>
    </WorldThemeWrapper>
  );
};
