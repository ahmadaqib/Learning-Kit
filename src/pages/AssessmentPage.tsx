import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadWorldBundle } from '@/content/worldLoader';
import { resolveTxt, type Lesson, type Question, type World } from '@/content/schema';
import { evaluateQuestionAnswer, shuffleArray } from '@/engine/queue';
import { XP_RULES } from '@/engine/scoring';
import { useAppStore } from '@/store/useAppStore';
import { Bito } from '@/components/mascot/Bito';
import { QuestionRenderer } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

export const AssessmentPage: React.FC = () => {
  const { duniaId = 'a01', jenis = 'awal' } = useParams<{ duniaId: string; jenis: string }>();
  const kind: 'pre' | 'post' | 'retain' =
    jenis === 'akhir' ? 'post' : jenis === 'ingat' ? 'retain' : 'pre';

  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const completeAssessment = useAppStore((s) => s.completeAssessment);

  const [world, setWorld] = useState<World | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ score: number; max: number; forgotTags: string[] } | null>(null);

  const mode = profile?.mode ?? 'junior';

  useEffect(() => {
    loadWorldBundle(duniaId).then((bundle) => {
      setWorld(bundle.world);
      setLessons(bundle.lessons);
      const rawAnchors = bundle.world.anchors[mode];
      setQuestions(kind === 'pre' ? rawAnchors : shuffleArray(rawAnchors));
    });
  }, [duniaId, mode, kind]);

  if (!profile || !world || questions.length === 0) {
    return (
      <div className="flex min-h-[60dvh] items-center justify-center p-6">
        <p className="pw-body font-bold text-[var(--ink-2)]">Menyiapkan soal...</p>
      </div>
    );
  }

  const titleText =
    kind === 'pre'
      ? mode === 'junior'
        ? 'Tebak-tebakan Awal'
        : 'Cek Titik Awal'
      : kind === 'post'
        ? mode === 'junior'
          ? 'Tebak-tebakan Lagi'
          : 'Cek Kemajuan'
        : mode === 'junior'
          ? 'Masih Ingat?'
          : 'Cek Ingatan 7 Hari';

  const introText =
    kind === 'pre'
      ? 'Belum belajar? Tidak apa-apa salah atau pilih "Belum tahu". Ini cuma untuk melihat nanti kamu tambah pintar sebanyak apa.'
      : kind === 'post'
        ? 'Ingat soal-soal di awal dunia ini? Sekarang coba jawab lagi setelah belajar!'
        : `Seminggu lalu kamu menuntaskan ${world.title}. Yuk cek bagian mana yang masih menempel!`;

  const handleNext = () => {
    if (idx + 1 < questions.length) {
      setIdx((i) => i + 1);
      return;
    }

    let score = 0;
    const forgotTags: string[] = [];
    const wrongCardIds: string[] = [];

    for (const q of questions) {
      const ok = evaluateQuestionAnswer(q, answers[q.id]);
      if (ok) {
        score += 1;
      } else {
        forgotTags.push(...q.tags);
        // Jika salah di Tes Ingat, masukkan reviewCard terkait ke Kotak Ulang kotak 1 (§7.10, F17)
        if (kind === 'retain') {
          for (const l of lessons) {
            for (const rc of l.reviewCards) {
              if (rc.tags.some((tag) => q.tags.includes(tag))) {
                wrongCardIds.push(rc.id);
              }
            }
          }
        }
      }
    }

    completeAssessment({
      worldId: world.id,
      kind,
      score,
      max: questions.length,
      answers,
      wrongAnchorReviewCardIds: [...new Set(wrongCardIds)],
    });

    setDone({ score, max: questions.length, forgotTags: [...new Set(forgotTags)] });
  };

  if (done) {
    const rec = profile.assessments[world.id];
    const preScore = kind === 'pre' ? done.score : rec?.pre?.score ?? 0;
    const postScore = kind === 'post' ? done.score : rec?.post?.score;
    const retainScore = kind === 'retain' ? done.score : rec?.retain?.score;

    const xpMsg =
      kind === 'pre'
        ? `+${XP_RULES.PRE_TEST} XP karena sudah mencoba!`
        : kind === 'post'
          ? `+${XP_RULES.POST_TEST} XP Cek Kemajuan!`
          : `+${XP_RULES.RETAIN_TEST} XP Cek Ingatan!`;

    return (
      <WorldThemeWrapper worldId={world.id} className="mx-auto max-w-[600px] px-5 py-8 space-y-6">
        <div className="text-center space-y-3">
          <Bito expression="happy" size={112} className="mx-auto" />
          <h1 className="pw-h1">
            {kind === 'pre'
              ? 'Bagus! Sekarang kita pelajari jawabannya bersama.'
              : `Kemajuanmu di ${world.title}`}
          </h1>
          <span className="inline-block rounded-full bg-[var(--star)] px-4 py-1 text-sm font-extrabold text-[#1F2340]">
            {xpMsg}
          </span>
        </div>

        {/* Grafik Batang 3 Tahap (§7.10) untuk Tes Akhir & Tes Ingat */}
        {kind !== 'pre' && (
          <div className="pw-card p-5 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span>Awal</span>
                <span>{preScore}/{done.max}</span>
              </div>
              <ProgressBar value={(preScore / done.max) * 100} label="Skor awal" color="var(--ink-3)" />
            </div>

            {postScore !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Akhir</span>
                  <span>{postScore}/{done.max}</span>
                </div>
                <ProgressBar value={(postScore / done.max) * 100} label="Skor akhir" color="var(--ok-500)" />
              </div>
            )}

            {retainScore !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>7 Hari</span>
                  <span>{retainScore}/{done.max}</span>
                </div>
                <ProgressBar value={(retainScore / done.max) * 100} label="Skor 7 hari" color="var(--world-600)" />
              </div>
            )}

            {postScore !== undefined && postScore > preScore && (
              <p className="pw-body font-extrabold text-[var(--ok-600)] pt-2">
                Kamu naik dari {preScore} ke {postScore}!
              </p>
            )}

            {kind === 'retain' && done.forgotTags.length > 0 && (
              <div className="rounded-xl bg-[var(--cream)] p-3 text-sm">
                <p className="font-bold">Wajar ada yang mulai lupa. Itulah gunanya Kotak Ulang!</p>
                <p className="text-[var(--ink-2)] mt-1">
                  Topik yang dimasukkan ke Kotak Ulang: {done.forgotTags.join(', ')}.
                </p>
              </div>
            )}
          </div>
        )}

        <Button
          variant="primary"
          fullWidth
          onClick={() =>
            navigate(
              kind === 'pre'
                ? `/belajar/${world.lessons[0]}`
                : kind === 'retain' && done.forgotTags.length > 0
                  ? '/ulang'
                  : `/peta/${world.track}`,
            )
          }
        >
          {kind === 'pre'
            ? 'Mulai Pelajaran Pertama →'
            : kind === 'retain' && done.forgotTags.length > 0
              ? 'Ulang yang mulai lupa →'
              : 'Lanjut ke Peta Dunia →'}
        </Button>
      </WorldThemeWrapper>
    );
  }

  const curQ = questions[idx];

  return (
    <WorldThemeWrapper worldId={world.id} className="mx-auto flex min-h-[100dvh] max-w-[680px] flex-col px-4 py-5">
      <header className="mb-5 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/dunia/${world.id}`)}
          aria-label="Kembali"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-1">
          <ProgressBar value={((idx + 1) / questions.length) * 100} label="Progres tes" />
        </div>
        <span className="text-xs font-extrabold text-[var(--ink-2)]">
          {idx + 1}/{questions.length}
        </span>
      </header>

      <div className="mb-4 rounded-xl bg-[var(--world-50)] p-3.5">
        <div className="pw-kicker">{titleText} · {world.title}</div>
        <p className="pw-small mt-1 text-[var(--ink)]">{introText}</p>
      </div>

      <div className="flex-1 flex flex-col justify-between gap-6 pb-6">
        <div className="space-y-4">
          <h1 className="pw-h2">{resolveTxt(curQ.prompt, mode)}</h1>
          <QuestionRenderer
            question={curQ}
            mode={mode}
            value={answers[curQ.id]}
            onChange={(val) => setAnswers((a) => ({ ...a, [curQ.id]: String(val) }))}
          />
        </div>

        <Button
          variant="primary"
          fullWidth
          disabled={!answers[curQ.id]}
          onClick={handleNext}
        >
          {idx + 1 < questions.length ? 'Lanjut →' : 'Selesai ✓'}
        </Button>
      </div>
    </WorldThemeWrapper>
  );
};
