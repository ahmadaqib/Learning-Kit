import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadWorldBundle } from '@/content/worldLoader';
import type { Lesson, Mode, Question, World } from '@/content/schema';
import { xpWord } from '@/app/modeConfig';
import { celebrate } from '@/engine/celebrations';
import { evaluateQuestionAnswer, shuffleArray } from '@/engine/queue';
import { XP_RULES } from '@/engine/scoring';
import { runSequence } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';
import { Annot } from '@/components/fx/Annot';
import { CountUp } from '@/components/fx/CountUp';
import { PageLoader } from '@/components/fx/PageLoader';
import { ActionBar, ReadAloudButton } from '@/components/lesson/ActionBar';
import { LevelUpBanner, detectLevelUp } from '@/components/lesson/LessonResult';
import { Bito } from '@/components/mascot/Bito';
import { QuestionIntro, QuestionRenderer, useQuestionReader } from '@/components/questions/QuestionRenderer';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';

interface AssessmentDone {
  score: number;
  max: number;
  forgotTags: string[];
  xpEarned: number;
  xpBefore: number;
}

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
  // Kept as the renderer gives them (a true/false answer is a boolean), and stored as text
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [done, setDone] = useState<AssessmentDone | null>(null);

  const mode: Mode = profile?.mode ?? 'junior';

  useEffect(() => {
    loadWorldBundle(duniaId).then((bundle) => {
      setWorld(bundle.world);
      setLessons(bundle.lessons);
      const rawAnchors = bundle.world.anchors[mode];
      setQuestions(kind === 'pre' ? rawAnchors : shuffleArray(rawAnchors));
    });
  }, [duniaId, mode, kind]);

  const curQ: Question | undefined = questions[idx];
  const reader = useQuestionReader({
    mode,
    autoRead: Boolean(profile?.settings.autoReadAloud),
    question: done ? null : (curQ ?? null),
    stepKey: `${duniaId}-${kind}-${idx}-${questions.length}`,
    shownOrder: undefined,
  });

  if (!profile || !world || questions.length === 0 || !curQ) return <PageLoader label="Bito sedang menyiapkan soal…" />;

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

  // Pro reads the facts and nothing else: no comfort, no comment on how learning works (copydeck 2.2)
  const introText =
    kind === 'pre'
      ? mode === 'junior'
        ? 'Belum belajar? Tidak apa-apa salah atau pilih "Belum tahu". Kita catat apa yang kamu tahu sekarang. Nanti kamu bisa melihat kemajuanmu.'
        : 'Soal titik awal untuk dunia ini. Pilih "Belum tahu" bila belum yakin.'
      : kind === 'post'
        ? mode === 'junior'
          ? 'Ingat soal-soal di awal dunia ini? Sekarang coba jawab lagi setelah belajar!'
          : 'Soal yang sama dengan di awal dunia ini.'
        : mode === 'junior'
          ? `Seminggu lalu kamu menuntaskan ${world.title}. Yuk cek bagian mana yang masih menempel!`
          : `Tujuh hari setelah ${world.title}: seberapa banyak yang masih kamu ingat.`;

  const handleNext = () => {
    reader.stop();
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
        // Jika salah di Tes Ingat, masukkan reviewCard terkait ke Kotak Ulang kotak 1 (7.10, F17)
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

    const xpBefore = profile.xp;
    const res = completeAssessment({
      worldId: world.id,
      kind,
      score,
      max: questions.length,
      answers: Object.fromEntries(Object.entries(answers).map(([id, v]) => [id, String(v)])),
      wrongAnchorReviewCardIds: [...new Set(wrongCardIds)],
    });

    setDone({ score, max: questions.length, forgotTags: [...new Set(forgotTags)], xpEarned: res.xpEarned, xpBefore });
  };

  /* ---- Result ---- */
  if (done) {
    const rec = profile.assessments[world.id];
    return (
      <AssessmentResult
        world={world}
        mode={mode}
        kind={kind}
        done={done}
        preScore={kind === 'pre' ? done.score : (rec?.pre?.score ?? 0)}
        postScore={kind === 'post' ? done.score : rec?.post?.score}
        retainScore={kind === 'retain' ? done.score : rec?.retain?.score}
        mascot={profile.mascot}
        soundEnabled={profile.settings.soundEnabled}
        onNavigate={navigate}
      />
    );
  }

  /* ---- A question ---- */
  const given = answers[curQ.id];
  const hasAnswer = (given !== undefined && given !== '') || curQ.type === 'order';

  return (
    <WorldThemeWrapper worldId={world.id} className="mx-auto flex min-h-[100dvh] max-w-[680px] flex-col px-4 py-5">
      <header className="mb-5 flex items-center gap-3 pw-safe-top">
        <button
          type="button"
          onClick={() => navigate(`/dunia/${world.id}`)}
          aria-label="Kembali"
          data-sfx="back"
          className="pw-pressable flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[var(--radius-full)] border border-[var(--line)] bg-[var(--paper)] cursor-pointer"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="min-w-0 flex-1">
          <ProgressBar value={(idx / questions.length) * 100} label="Kemajuan tes" />
        </div>
        <span className="text-xs font-extrabold text-[var(--ink-2)]">
          {idx + 1}/{questions.length}
        </span>
      </header>

      <div className="mb-4 rounded-[var(--radius-md)] bg-[var(--world-50)] p-3.5">
        <div className="pw-kicker">
          {titleText} · {world.title}
        </div>
        <p className="pw-small m-0 mt-1 text-[var(--ink)]">{introText}</p>
        {kind === 'pre' && (
          <p className="m-0 mt-1">
            <Annot>{mode === 'junior' ? 'belum tahu? tidak apa-apa' : 'belum tahu? lewati saja'}</Annot>
          </p>
        )}
      </div>

      <main
        key={curQ.id}
        data-enter={idx > 0 ? 'right' : undefined}
        data-rm="fade"
        className={`flex flex-1 flex-col gap-5 ${idx > 0 ? 'pw-enter' : ''}`}
      >
        <QuestionIntro
          question={curQ}
          mode={mode}
          kicker={`Soal ${idx + 1} dari ${questions.length}`}
          as="h1"
          reading={reader.reading}
          action={
            reader.canSpeak ? <ReadAloudButton mode={mode} speaking={reader.speaking} onToggle={reader.toggle} /> : undefined
          }
        />
        <QuestionRenderer
          question={curQ}
          mode={mode}
          value={answers[curQ.id]}
          onChange={(val) => setAnswers((a) => ({ ...a, [curQ.id]: val }))}
          reading={reader.reading}
          withContext={false}
        />
      </main>

      <ActionBar
        mode={mode}
        primaryLabel={idx + 1 < questions.length ? 'Lanjut →' : 'Selesai ✓'}
        onPrimary={handleNext}
        primaryDisabled={!hasAnswer}
        soundEnabled={profile.settings.soundEnabled}
        focusKey={idx}
      />
    </WorldThemeWrapper>
  );
};

/* ------------------------------------------------------------------------------------------------
 * The result: the score counts up and the bars fill (the before and after pair for the post-test)
 * ---------------------------------------------------------------------------------------------- */

const AssessmentResult: React.FC<{
  world: World;
  mode: Mode;
  kind: 'pre' | 'post' | 'retain';
  done: AssessmentDone;
  preScore: number;
  postScore: number | undefined;
  retainScore: number | undefined;
  mascot: React.ComponentProps<typeof Bito>['custom'];
  soundEnabled: boolean;
  onNavigate: (to: string) => void;
}> = ({ world, mode, kind, done, preScore, postScore, retainScore, mascot, soundEnabled, onNavigate }) => {
  const pro = mode === 'pro';
  const rootRef = useRef<HTMLDivElement>(null);
  const [skipped, setSkipped] = useState(false);
  const [filled, setFilled] = useState(false);
  const [banner, setBanner] = useState(false);
  const level = detectLevelUp(done.xpBefore, done.xpEarned, mode);
  const word = xpWord(mode);
  const at = (ms: number) => ({ '--at': `${ms}ms` }) as React.CSSProperties;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const handle = runSequence(root, [
      // The bars fill once the numbers have started to count: cause, then effect
      { at: 300, run: () => setFilled(true) },
      {
        at: 1100,
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

  const xpMsg =
    kind === 'pre'
      ? `+${XP_RULES.PRE_TEST} ${word} karena sudah mencoba`
      : kind === 'post'
        ? `+${XP_RULES.POST_TEST} ${word} untuk Cek Kemajuan`
        : `+${XP_RULES.RETAIN_TEST} ${word} untuk Cek Ingatan`;

  const bar = (label: string, score: number, barLabel: string, color: string, start: number) => (
    <div className="pw-fx-rise space-y-2" style={at(start)}>
      <div className="flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span className={pro ? 'font-mono tabular-nums' : ''}>
          <CountUp value={score} delay={start} duration={600} skip={skipped} />/{done.max}
        </span>
      </div>
      <ProgressBar value={filled ? (score / done.max) * 100 : 0} label={barLabel} color={color} />
    </div>
  );

  return (
    <WorldThemeWrapper worldId={world.id} className="mx-auto max-w-[600px] px-5 py-8">
      <div ref={rootRef} data-rm="fade" className="pw-seq space-y-6">
        {banner && <LevelUpBanner before={level.before} after={level.after} />}
        <div className="space-y-3 text-center">
          <div className="pw-stage flex justify-center py-4">
            <Bito expression="happy" size={pro ? 96 : 112} custom={mascot} />
          </div>
          <h1 className="pw-h1">
            {kind === 'pre'
              ? pro
                ? 'Titik awalmu tercatat. Lanjut ke pelajaran pertama.'
                : 'Bagus! Sekarang kita pelajari jawabannya bersama.'
              : `Kemajuanmu di ${world.title}`}
          </h1>
          <span className="inline-block rounded-[var(--radius-full)] bg-[var(--star)] px-4 py-1 text-sm font-extrabold text-[var(--on-star)]">
            {xpMsg}
          </span>
        </div>

        {/* Grafik Batang 3 Tahap (7.10) untuk Tes Akhir & Tes Ingat */}
        {kind !== 'pre' && (
          <div className="pw-card space-y-3 p-5">
            {bar('Awal', preScore, 'Skor awal', 'var(--ink-3)', 200)}
            {postScore !== undefined && bar('Akhir', postScore, 'Skor akhir', 'var(--ok-500)', 320)}
            {retainScore !== undefined && bar('7 Hari', retainScore, 'Skor 7 hari', 'var(--world-600)', 440)}

            {postScore !== undefined && postScore > preScore && (
              <p className="pw-body pw-fx-rise m-0 pt-2 font-extrabold text-[var(--ok-600)]" style={at(560)}>
                {pro ? `Naik dari ${preScore} ke ${postScore}.` : `Kamu naik dari ${preScore} ke ${postScore}!`}
              </p>
            )}

            {kind === 'retain' && done.forgotTags.length > 0 && (
              <div className="pw-well pw-fx-fade text-sm" style={at(560)}>
                <p className="m-0 font-bold">
                  {pro ? 'Topik berikut masuk ke Kotak Ulang.' : 'Wajar ada yang mulai lupa. Itulah gunanya Kotak Ulang!'}
                </p>
                <p className="m-0 mt-1 text-[var(--ink-2)]">
                  {pro ? '' : 'Topik yang dimasukkan ke Kotak Ulang: '}
                  {done.forgotTags.join(', ')}.
                </p>
              </div>
            )}
          </div>
        )}

        <Button
          variant="primary"
          fullWidth
          soundEnabled={soundEnabled}
          onClick={() =>
            onNavigate(
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
      </div>
    </WorldThemeWrapper>
  );
};
