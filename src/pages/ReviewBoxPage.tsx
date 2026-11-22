import React, { useEffect, useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { WORLDS_BY_ID, ALL_LESSONS } from '@/content/curriculum';
import { resolveTxt, type Question } from '@/content/schema';
import { formatLocalDate } from '@/engine/date';
import { getBoxDistribution, getDueLeitnerCards } from '@/engine/leitner';
import { shuffleArray } from '@/engine/queue';
import { playSound } from '@/engine/sound';
import { useAppStore } from '@/store/useAppStore';
import { FeedbackSheet } from '@/components/lesson/FeedbackSheet';
import { Bito } from '@/components/mascot/Bito';
import { QuestionRenderer } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface ReviewEntry {
  cardId: string;
  originLabel: string;
  q: Question;
}

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
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [upgradedCount, setUpgradedCount] = useState(0);
  const [sessionDone, setSessionDone] = useState<{ reviewed: number; xpEarned: number } | null>(null);

  useEffect(() => {
    if (!profile) return;
    const due = getDueLeitnerCards(profile.leitner, formatLocalDate(), profile.mode);
    const cardLookup = new Map<string, ReviewEntry>();
    for (const l of ALL_LESSONS) {
      const w = WORLDS_BY_ID[l.worldId];
      for (const rc of l.reviewCards) {
        cardLookup.set(rc.id, {
          cardId: rc.id,
          originLabel: `${w?.title ?? l.worldId} · ${l.title}`,
          q: rc,
        });
      }
    }
    const entries = due
      .map((d) => cardLookup.get(d.cardId))
      .filter((e): e is ReviewEntry => Boolean(e));
    setSessionCards(entries);
  }, [profile?.id]);

  if (!profile) return null;

  const boxes = getBoxDistribution(profile.leitner);
  const mode = profile.mode;

  const startFreePractice = () => {
    const completedIds = new Set(
      Object.entries(profile.lessons)
        .filter(([, rec]) => rec.completedAt)
        .map(([id]) => id),
    );
    const pool: ReviewEntry[] = [];
    for (const l of ALL_LESSONS) {
      if (!completedIds.has(l.id)) continue;
      const w = WORLDS_BY_ID[l.worldId];
      for (const rc of l.reviewCards) {
        pool.push({
          cardId: rc.id,
          originLabel: `${w?.title ?? l.worldId} · ${l.title}`,
          q: rc,
        });
      }
    }
    setSessionCards(shuffleArray(pool).slice(0, 10));
    setIsFreePractice(true);
    setActiveSession(true);
    setIdx(0);
  };

  if (sessionDone) {
    return (
      <div className="mx-auto max-w-[540px] px-5 py-10 text-center space-y-5">
        <Bito expression="cheer" size={112} className="mx-auto" />
        <h1 className="pw-h1">Kotak Ulang Selesai!</h1>
        <p className="pw-body-l">
          {sessionDone.reviewed} kartu diulang.{' '}
          {!isFreePractice && `${upgradedCount} kartu naik ke kotak lebih tinggi!`}
        </p>
        {sessionDone.xpEarned > 0 && (
          <span className="inline-block rounded-full bg-[var(--star)] px-4 py-1 font-extrabold text-[#1F2340]">
            +{sessionDone.xpEarned} XP
          </span>
        )}
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate(nextRoute ?? '/beranda')}
        >
          {nextRoute ? 'Lanjut ke Pelajaran Baru →' : 'Kembali ke Beranda'}
        </Button>
      </div>
    );
  }

  if (activeSession && sessionCards[idx]) {
    const cur = sessionCards[idx];
    const checkCard = () => {
      const ok =
        cur.q.type === 'tf'
          ? answerVal === cur.q.answer
          : 'answer' in cur.q && answerVal === cur.q.answer;

      if (!isFreePractice) {
        const res = answerLeitnerCard(cur.cardId, ok);
        if (ok && res.nextBox > res.prevBox) {
          setUpgradedCount((u) => u + 1);
        }
      }

      playSound(ok ? 'correct' : 'incorrect', profile.settings.soundEnabled);
      setFeedback({
        correct: ok,
        explanation: resolveTxt(cur.q.explainCorrect, mode),
      });
    };

    const nextCard = () => {
      setFeedback(null);
      setAnswerVal(undefined);
      if (idx + 1 < sessionCards.length) {
        setIdx((i) => i + 1);
      } else {
        const xpEarned = isFreePractice ? 10 : completeLeitnerSession(sessionCards.length);
        setSessionDone({ reviewed: sessionCards.length, xpEarned });
      }
    };

    return (
      <div className="mx-auto flex min-h-[85dvh] max-w-[680px] flex-col px-4 py-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar value={((idx + 1) / sessionCards.length) * 100} label="Progres Kotak Ulang" />
          </div>
          <span className="text-xs font-extrabold text-[var(--ink-2)]">
            {idx + 1}/{sessionCards.length}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <span className="pw-kicker">Dari: {cur.originLabel}</span>
            <h1 className="pw-h2">{resolveTxt(cur.q.prompt, mode)}</h1>
            <QuestionRenderer
              question={cur.q}
              mode={mode}
              value={answerVal}
              onChange={setAnswerVal}
              disabled={Boolean(feedback)}
              isSubmitted={Boolean(feedback)}
              isCorrect={feedback?.correct}
            />
          </div>

          {!feedback && (
            <Button variant="primary" fullWidth disabled={answerVal === undefined} onClick={checkCard}>
              Periksa
            </Button>
          )}
        </div>

        <FeedbackSheet
          open={Boolean(feedback)}
          isCorrect={Boolean(feedback?.correct)}
          isFirstTry={false}
          explanation={feedback?.explanation ?? ''}
          mode={mode}
          onContinue={nextCard}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[720px] px-4 py-6 sm:px-6 space-y-6">
      <header className="flex items-center gap-3">
        <Layers className="h-7 w-7 text-[var(--world-700)]" aria-hidden="true" />
        <div>
          <h1 className="pw-h1">Kotak Ulang</h1>
          <p className="pw-small text-[var(--ink-2)]">
            {sessionCards.length > 0
              ? `Ada ${sessionCards.length} kartu menunggu untuk diingat kembali hari ini.`
              : 'Kotak Ulang kosong hari ini. Ingatanmu aman!'}
          </p>
        </div>
      </header>

      {/* Visualisasi 5 Kotak Leitner (§9.7) */}
      <div className="pw-card p-5">
        <div className="grid grid-cols-5 gap-2 text-center">
          {([1, 2, 3, 4, 5] as const).map((boxNum) => (
            <div key={boxNum} className="rounded-xl border border-[var(--line)] bg-[var(--cream)] p-3">
              <div className="text-xs font-extrabold text-[var(--ink-2)]">Kotak {boxNum}</div>
              <div className="pw-h2 mt-1">{boxes[boxNum]}</div>
              <div className="text-[11px] text-[var(--ink-3)]">
                {boxNum === 1 ? '1 hr' : boxNum === 2 ? '2 hr' : boxNum === 3 ? '4 hr' : boxNum === 4 ? '7 hr' : '14+ hr'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {sessionCards.length > 0 ? (
        <Button variant="primary" fullWidth onClick={() => setActiveSession(true)}>
          Mulai ulang ({sessionCards.length} kartu) →
        </Button>
      ) : (
        <div className="pw-card p-6 text-center space-y-4">
          <Bito expression="happy" size={96} className="mx-auto" />
          <p className="pw-body">
            Selesaikan pelajaran baru untuk mengisi kartu di Kotak Ulang, atau coba latihan bebas.
          </p>
          <Button
            variant="secondary"
            fullWidth
            disabled={Object.keys(profile.lessons).length === 0}
            onClick={startFreePractice}
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Latihan bebas (10 soal acak)
          </Button>
        </div>
      )}
    </div>
  );
};
