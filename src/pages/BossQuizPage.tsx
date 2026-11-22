import React, { useEffect, useState } from 'react';
import { Shield, X } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { loadWorldBundle } from '@/content/worldLoader';
import { resolveTxt, type Lesson, type Question, type Step, type World } from '@/content/schema';
import { evaluateQuestionAnswer, shuffleArray } from '@/engine/queue';
import { playSound } from '@/engine/sound';
import { useAppStore } from '@/store/useAppStore';
import { Bito } from '@/components/mascot/Bito';
import { QuestionRenderer } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { ConfettiBurst } from '@/components/ui/ConfettiBurst';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

interface BossQuestionEntry {
  lessonId: string;
  lessonTitle: string;
  q: Question;
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
  const [finishedResult, setFinishedResult] = useState<{
    correctCount: number;
    total: number;
    passed: boolean;
    xpEarned: number;
    reviewLessons: { id: string; title: string }[];
  } | null>(null);

  const mode = profile?.mode ?? 'junior';

  const buildBossBank = (w: World, lessonsList: Lesson[]): BossQuestionEntry[] => {
    const visibleLessons = lessonsList.filter((l) => !l.isSideQuest && l.modes.includes(mode));
    const targetCount = mode === 'junior' ? w.boss.junior.count : w.boss.pro.count;
    const picked: BossQuestionEntry[] = [];
    const seenIds = new Set<string>();

    // Minimal 1 soal per pelajaran (§7.5)
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
  }, [duniaId, mode]);

  if (!profile || !world) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center p-6">
        <p className="pw-body font-bold text-[var(--ink-2)]">Menyiapkan Tantangan Penjaga...</p>
      </div>
    );
  }

  const handleNextOrFinish = () => {
    if (currentIdx + 1 < bank.length) {
      setCurrentIdx((i) => i + 1);
      return;
    }

    let correctCount = 0;
    const wrongLessonsMap = new Map<string, string>();
    for (const item of bank) {
      const ok = evaluateQuestionAnswer(item.q, answers[item.q.id]);
      if (ok) {
        correctCount += 1;
      } else {
        wrongLessonsMap.set(item.lessonId, item.lessonTitle);
      }
    }

    const ratio = bank.length > 0 ? correctCount / bank.length : 0;
    const passed = ratio >= world.boss.passRatio;

    const allTrackAPassed =
      world.track === 'A' &&
      ['a01','a02','a03','a04','a05','a06','a07','a08','a09','a10','a11','a12']
        .filter((id) => id !== world.id)
        .every((id) => profile.bosses[id]?.passed) &&
      passed;

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

    playSound(passed ? 'unlock' : 'incorrect', profile.settings.soundEnabled);
    setFinishedResult({
      correctCount,
      total: bank.length,
      passed,
      xpEarned: res.xpEarned,
      reviewLessons: [...wrongLessonsMap.entries()].map(([id, title]) => ({ id, title })).slice(0, 3),
    });
  };

  if (finishedResult) {
    return (
      <WorldThemeWrapper worldId={world.id} className="mx-auto max-w-[680px] px-4 py-8">
        <ConfettiBurst active={finishedResult.passed} />
        <div className="text-center space-y-4">
          <Bito expression={finishedResult.passed ? 'cheer' : 'think'} size={112} className="mx-auto" />
          <h1 className="pw-display">
            {finishedResult.passed ? 'Gerbang Terbuka!' : 'Sedikit lagi!'}
          </h1>
          <p className="pw-body-l">
            Kamu menjawab benar {finishedResult.correctCount} dari {finishedResult.total} soal (
            {Math.round((finishedResult.correctCount / finishedResult.total) * 100)}%).
          </p>
          {finishedResult.passed && finishedResult.xpEarned > 0 && (
            <span className="inline-block rounded-full bg-[var(--star)] px-4 py-1 font-extrabold text-[#1F2340]">
              +{finishedResult.xpEarned} XP Bonus Penjaga!
            </span>
          )}
        </div>

        {/* Pembahasan lengkap di akhir (§9.6) */}
        <div className="mt-6 space-y-3">
          <h2 className="pw-h3">Pembahasan Soal</h2>
          {bank.map((entry, idx) => {
            const ok = evaluateQuestionAnswer(entry.q, answers[entry.q.id]);
            return (
              <div
                key={entry.q.id}
                className={`rounded-xl border-2 p-3.5 ${
                  ok ? 'border-[var(--ok-500)] bg-[var(--ok-50)]' : 'border-[var(--warn-500)] bg-[var(--warn-50)]'
                }`}
              >
                <div className="text-xs font-extrabold uppercase">
                  Soal {idx + 1} · {ok ? '✓ Benar' : 'Belum tepat'}
                </div>
                <div className="font-bold mt-1">{resolveTxt(entry.q.prompt, mode)}</div>
                <p className="pw-small mt-1 text-[var(--ink-2)]">
                  {resolveTxt(entry.q.explainCorrect, mode)}
                </p>
              </div>
            );
          })}
        </div>

        {!finishedResult.passed && finishedResult.reviewLessons.length > 0 && (
          <div className="pw-card mt-6 p-4 space-y-2">
            <h3 className="pw-h3">Pelajaran yang dianjurkan dilihat lagi:</h3>
            <div className="flex flex-wrap gap-2">
              {finishedResult.reviewLessons.map((rl) => (
                <Button
                  key={rl.id}
                  variant="secondary"
                  onClick={() => navigate(`/belajar/${rl.id}`)}
                >
                  {rl.title} →
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 space-y-3 pb-8">
          {finishedResult.passed ? (
            <Button
              variant="primary"
              fullWidth
              onClick={() =>
                navigate(
                  isPlacement || profile.assessments[world.id]?.post
                    ? `/peta/${world.track}`
                    : `/tes/${world.id}/akhir`,
                )
              }
            >
              {isPlacement ? 'Lanjut ke Peta Dunia →' : 'Lanjut ke Cek Kemajuan Akhir →'}
            </Button>
          ) : (
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setBank(buildBossBank(world, worldLessons));
                setAnswers({});
                setCurrentIdx(0);
                setFinishedResult(null);
              }}
            >
              Coba lagi (Soal Diacak Ulang)
            </Button>
          )}
        </div>
      </WorldThemeWrapper>
    );
  }

  if (!started) {
    return (
      <WorldThemeWrapper worldId={world.id} className="mx-auto flex min-h-[100dvh] max-w-[540px] flex-col justify-center px-5 py-8 text-center">
        <div className="pw-card p-6 space-y-5">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--world-50)] text-[var(--world-700)]">
            <Shield className="h-10 w-10" aria-hidden="true" />
          </div>
          <span className="pw-kicker">TANTANGAN PENJAGA</span>
          <h1 className="pw-h1">{world.boss.title}</h1>
          <p className="pw-body text-[var(--ink-2)]">{resolveTxt(world.boss.greeting, mode)}</p>
          <div className="rounded-xl bg-[var(--cream)] p-3 pw-small font-bold">
            {bank.length} soal campuran · Lulus minimal 80% · Tanpa batas waktu
          </div>
          <Button variant="primary" fullWidth onClick={() => setStarted(true)}>
            Mulai Tantangan →
          </Button>
          <Button variant="ghost" fullWidth onClick={() => navigate(`/dunia/${world.id}`)}>
            Kembali ke Dunia
          </Button>
        </div>
      </WorldThemeWrapper>
    );
  }

  const currentEntry = bank[currentIdx];
  const currentVal = answers[currentEntry.q.id];
  const hasVal = currentVal !== undefined && currentVal !== '' || currentEntry.q.type === 'order';

  return (
    <WorldThemeWrapper worldId={world.id} className="mx-auto flex min-h-[100dvh] max-w-[720px] flex-col px-4 py-4">
      <header className="mb-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/dunia/${world.id}`)}
          aria-label="Keluar Tantangan Penjaga"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-1">
          <ProgressBar value={((currentIdx + 1) / bank.length) * 100} label="Progres Tantangan Penjaga" />
        </div>
        <span className="text-xs font-extrabold text-[var(--ink-2)]">
          {currentIdx + 1}/{bank.length}
        </span>
      </header>

      <div className="flex-1 flex flex-col justify-between gap-6 pb-6">
        <div className="space-y-4">
          <span className="pw-kicker">{world.boss.guardianName} · SOAL {currentIdx + 1}</span>
          <h2 className="pw-h2">{resolveTxt(currentEntry.q.prompt, mode)}</h2>
          <QuestionRenderer
            question={currentEntry.q}
            mode={mode}
            value={currentVal}
            onChange={(val) => setAnswers((a) => ({ ...a, [currentEntry.q.id]: val }))}
          />
        </div>

        <Button
          variant="primary"
          fullWidth
          disabled={!hasVal}
          onClick={handleNextOrFinish}
        >
          {currentIdx + 1 < bank.length ? 'Soal berikutnya →' : 'Selesaikan Tantangan ✓'}
        </Button>
      </div>
    </WorldThemeWrapper>
  );
};
