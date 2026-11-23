import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Briefcase, Star, Users } from 'lucide-react';
import type { MascotCustom, Mode, Sticker } from '@/content/schema';
import { resolveTxt } from '@/content/schema';
import { COLLECTION_LABEL, levelLabel, xpWord } from '@/app/modeConfig';
import { celebrate } from '@/engine/celebrations';
import { formatDuration, formatScore, type RecordResult } from '@/engine/records';
import { XP_RULES, getLevelFromXp, type LevelInfo } from '@/engine/scoring';
import { playSound } from '@/engine/sound';
import { EASE } from '@/motion/tokens';
import { fx, runSequence, type Cue } from '@/motion/waapi';
import { Annot } from '@/components/fx/Annot';
import { Burst } from '@/components/fx/Burst';
import { CountUp } from '@/components/fx/CountUp';
import { Doodle } from '@/components/fx/Doodle';
import { KineticText } from '@/components/fx/KineticText';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { Bito, type BitoExpression } from '@/components/mascot/Bito';
import { Button } from '@/components/ui/Button';
import { ConfettiBurst } from '@/components/ui/ConfettiBurst';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StickerCard } from '@/components/ui/StickerCard';

export interface LessonResultProps {
  mode: Mode;
  lessonTitle: string;
  /** For "Kembali ke {dunia}". */
  worldTitle: string;
  mascot?: MascotCustom;
  stars: 0 | 1 | 2 | 3;
  firstTryCount: number;
  retryCount: number;
  totalCount: number;
  isSideQuest?: boolean;
  xpEarned: number;
  /** The profile's XP before completeLesson ran. The level is compared before and after without touching the store. */
  xpBefore: number;
  recap: string;
  /** Pro: the lesson's `atWork` sentence. */
  atWork?: string;
  reflection?: React.ReactNode;
  /** Junior: the first `companion.talkPrompts` entry. The recap is used when the lesson has none. */
  talkPrompt?: string;
  /** The sticker of this lesson. `isNew` is false when the learner already had it: nothing slaps in then. */
  sticker?: { data: Sticker; isNew: boolean };
  /** Pro: this attempt against the stored personal best. */
  record?: { result: RecordResult; attemptMs: number } | null;
  soundEnabled: boolean;
  /** The second lesson of this sitting, or the break reminder came due: "Selesai untuk hari ini" becomes primary. */
  stopping: boolean;
  /** The next lesson of the world, or null for "Kembali ke {dunia}". */
  hasNextLesson: boolean;
  /** Junior, three stars, and the lesson has a Pro fill or spotbug question at difficulty 1 or 2. */
  bonusAvailable: boolean;
  /** "Tantangan Kode" was answered right before: the lesson row carries `</>`. */
  bonusDone: boolean;
  onNext: () => void;
  onWorld: () => void;
  onHome: () => void;
  onAgain: () => void;
  onBonus: () => void;
}

/** Start of each earned star (Junior ms) and the offset of its impact frame (spec 5.9.5 B). */
const STAR_AT = [120, 280, 420] as const;
const IMPACT = 165;

const at = (ms: number, extra?: Record<string, string>): React.CSSProperties =>
  ({ '--at': `${ms}ms`, ...extra }) as React.CSSProperties;

/** The recap with its key phrase in `.pw-mark`: the first sentence of a longer recap, else the part after the last comma. */
function splitRecap(recap: string): Array<{ text: string; mark: boolean }> {
  const text = recap.trim();
  const sentences = text.match(/[^.!?…]+[.!?…]+\s*|[^.!?…]+$/g)?.map((s) => s.trim()) ?? [text];
  if (sentences.length > 1) {
    return [
      { text: sentences[0], mark: true },
      { text: ` ${sentences.slice(1).join(' ')}`, mark: false },
    ];
  }
  const comma = text.lastIndexOf(', ');
  if (comma > 0 && text.slice(comma + 2).split(' ').length >= 3) {
    return [
      { text: text.slice(0, comma + 2), mark: false },
      { text: text.slice(comma + 2), mark: true },
    ];
  }
  return [{ text, mark: false }];
}

/** Level before and after an XP gain, computed from numbers only: the store is not touched (spec 8.5). */
export function detectLevelUp(
  xpBefore: number,
  gained: number,
  mode: Mode,
): { before: LevelInfo; after: LevelInfo; leveledUp: boolean } {
  const before = getLevelFromXp(xpBefore, mode);
  const after = getLevelFromXp(xpBefore + gained, mode);
  return { before, after, leveledUp: after.level > before.level };
}

/**
 * Pro's level-up: a toast banner on the result screen, no overlay (spec 5.9.5 C). It slides down with opacity and
 * translateY(-100% to 0) in 300 ms and its level number counts up in 400 ms. Fixed, so it shifts nothing.
 */
export const LevelUpBanner: React.FC<{ before: LevelInfo; after: LevelInfo }> = ({ before, after }) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    fx(el, [{ opacity: 0, transform: 'translateY(-100%)' }, { opacity: 1, transform: 'none' }], {
      duration: 300,
      easing: EASE.out,
    });
  }, []);
  return (
    <div
      ref={ref}
      role="status"
      className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center px-4 pt-[max(12px,env(safe-area-inset-top))]"
    >
      <div className="pw-card-raised flex items-center gap-3 px-5 py-3 font-mono text-sm font-bold tabular-nums text-[var(--ink)]">
        <span aria-hidden="true">
          LEVEL <CountUp value={after.level} from={before.level} duration={400} /> · {after.title}
        </span>
        <span className="visually-hidden">
          Naik ke level {after.level}, {after.title}
        </span>
      </div>
    </div>
  );
};

export const LessonResult: React.FC<LessonResultProps> = (props) => {
  const {
    mode,
    lessonTitle,
    worldTitle,
    mascot,
    stars,
    firstTryCount,
    retryCount,
    totalCount,
    isSideQuest,
    xpEarned,
    xpBefore,
    recap,
    atWork,
    talkPrompt,
    sticker,
    record,
    soundEnabled,
    stopping,
    hasNextLesson,
    bonusAvailable,
    bonusDone,
    onNext,
    onWorld,
    onHome,
    onAgain,
    onBonus,
  } = props;

  const pro = mode === 'pro';
  const earned = Math.max(0, Math.min(3, stars)) as 0 | 1 | 2 | 3;
  // T: the impact frame of the last earned star (285, 445 or 585)
  const T = earned > 0 ? STAR_AT[earned - 1] + IMPACT : 0;

  const { before, after, leveledUp } = detectLevelUp(xpBefore, xpEarned, mode);

  // XP lines. If they ever disagree with the store's number, only the total is shown.
  const answersXp = firstTryCount * XP_RULES.FIRST_TRY_CORRECT + retryCount * XP_RULES.RETRY_CORRECT;
  const finishXp = isSideQuest ? XP_RULES.SIDE_QUEST : XP_RULES.LESSON_COMPLETE;
  const bonusXp = !isSideQuest && earned === 3 ? XP_RULES.THREE_STAR_BONUS : 0;
  const linesAdd = answersXp + finishXp + bonusXp === xpEarned;

  // Sequence state. Everything is in the DOM from frame 0: a state change here only moves a number or mounts a banner.
  const rootRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const [skipped, setSkipped] = useState(false);
  const [done, setDone] = useState(false);
  const [bitoExpression, setBitoExpression] = useState<BitoExpression>('cheer');
  const [confetti, setConfetti] = useState(false);
  const [levelStage, setLevelStage] = useState<0 | 1 | 2>(0);
  const [banner, setBanner] = useState(false);

  const latest = useRef({ soundEnabled, leveledUp, after, mode, sticker, earned });
  latest.current = { soundEnabled, leveledUp, after, mode, sticker, earned };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const cur = latest.current;
    const cues: Cue[] = [];

    // Each earned star: the `star` sound on its impact frame
    for (let i = 0; i < cur.earned; i += 1) {
      cues.push({
        at: STAR_AT[i] + IMPACT,
        run: ({ skipped: s }) => {
          if (!s) playSound('star', cur.soundEnabled);
        },
      });
    }
    if (cur.earned === 3) {
      cues.push({
        at: T,
        run: ({ skipped: s }) => {
          setBitoExpression('wow');
          if (!s) setConfetti(true);
        },
      });
    }
    cues.push({ at: T + 520, run: () => setLevelStage(1) });
    if (cur.sticker?.isNew && cur.mode === 'junior') {
      // The slap lands at 228 ms into its 380 ms: the sound is on the impact frame
      cues.push({
        at: T + 870 + 228,
        run: ({ skipped: s }) => {
          if (!s) playSound('slap', cur.soundEnabled);
        },
      });
    }
    if (cur.leveledUp && cur.mode === 'pro') {
      cues.push({ at: T + 840, run: () => setBanner(true) });
    }
    // The last cue: the overlay waits until the sticker has landed, or comes at once on a skip
    cues.push({
      at: T + 1420,
      run: ({ skipped: s }) => {
        if (s) setSkipped(true);
        setLevelStage(2);
        setDone(true);
        if (cur.leveledUp && cur.mode === 'junior') {
          celebrate({ kind: 'levelUp', level: cur.after.level, title: cur.after.title });
        }
      },
    });

    const handle = runSequence(root, cues);
    return () => handle.cancel();
    // The result is built once per mount: "Ulangi" mounts a new one
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const word = xpWord(mode);
  const unit = COLLECTION_LABEL[mode].unit;
  const n = Math.max(0, totalCount - firstTryCount);

  const headline = pro ? 'Pelajaran selesai' : 'Pelajaran selesai!';
  const sub = (() => {
    if (pro) {
      if (earned === 3) return 'Semua benar di percobaan pertama.';
      if (earned === 2) return `${firstTryCount} dari ${totalCount} benar di percobaan pertama. ${n} lagi untuk ★★★.`;
      return `Selesai. ${firstTryCount} dari ${totalCount} benar di percobaan pertama.`;
    }
    if (earned === 3) return 'Semua benar di percobaan pertama!';
    if (earned === 2) return `Hampir sempurna. Benar ${n} soal lagi di percobaan pertama, dapat ★★★.`;
    return 'Kamu selesai! Soal yang diulang membuatmu makin ingat.';
  })();

  // Level bar: the before values, then (cause and effect) the bar moves once the XP lines have arrived
  const levelInfo = levelStage === 2 ? after : before;
  const barRatio =
    levelStage === 0 ? before.progressRatio : levelStage === 1 ? (leveledUp ? 1 : after.progressRatio) : after.progressRatio;
  const barXp =
    levelStage === 1 && leveledUp
      ? before.nextLevelXp
      : levelStage === 0
        ? before.currentXp
        : after.currentXp;
  const levelText = `${levelLabel(levelInfo.level, mode)} · ${barXp} / ${levelInfo.nextLevelXp} ${word}`;

  const recapParts = splitRecap(recap);
  const newSticker = sticker?.isNew ? sticker.data : null;
  const gold = earned === 3;

  // The two result buttons: only their order changes at a stopping point (nothing is locked)
  const nextButton = (variant: 'primary' | 'secondary') => (
    <Button
      key="next"
      variant={variant}
      fullWidth
      soundEnabled={soundEnabled}
      data-sfx={hasNextLesson ? undefined : 'back'}
      onClick={hasNextLesson ? onNext : onWorld}
    >
      {hasNextLesson ? 'Pelajaran berikutnya →' : `Kembali ke ${worldTitle} →`}
    </Button>
  );
  const restButton = (variant: 'primary' | 'secondary') => (
    <Button key="rest" variant={variant} fullWidth soundEnabled={soundEnabled} onClick={onHome}>
      {!pro && <Bito expression="sleep" size={48} react={false} className="-my-2 flex-shrink-0" />}
      Selesai untuk hari ini
    </Button>
  );

  const showAgain = earned < 3;
  const showBonus = !pro && earned === 3 && bonusAvailable;

  return (
    <div
      ref={rootRef}
      data-rm="fade"
      className="pw-seq mx-auto flex w-full max-w-[600px] flex-col items-center px-5 py-8 text-center"
    >
      <ConfettiBurst active={confetti} origin={starsRef} />

      {banner && <LevelUpBanner before={before} after={after} />}

      {/* Stage: Bito and the stars. The container has no entrance of its own, so its children can be choreographed. */}
      <div
        className={`pw-stage flex w-full flex-col items-center px-4 py-6 ${earned === 3 ? 'pw-fx-thump' : ''}`}
        style={earned === 3 ? at(T) : undefined}
      >
        <Bito
          expression={bitoExpression}
          size={pro ? 96 : 128}
          custom={mascot}
          pokeable={!pro && done}
          onPoke={() => playSound('bip', soundEnabled)}
        />
        <div ref={starsRef} role="img" aria-label={`Mendapat ${earned} dari 3 bintang`} className="mt-3 inline-flex gap-2">
          {[0, 1, 2].map((i) =>
            i < earned ? (
              <span
                key={i}
                aria-hidden="true"
                className="pw-fx-stamp relative inline-flex"
                style={at(STAR_AT[i])}
              >
                <Star className="h-11 w-11 text-[var(--star)]" fill="currentColor" strokeWidth={1.75} />
                {!pro && (
                  <span className="pointer-events-none absolute -right-3 -top-3">
                    <Doodle name="spark" draw at={STAR_AT[i] + IMPACT} width={22} />
                  </span>
                )}
              </span>
            ) : (
              <span key={i} aria-hidden="true" className="inline-flex">
                <Star className="h-11 w-11 text-[var(--ink-3)]" fill="none" strokeWidth={1.75} strokeDasharray="3 3" />
              </span>
            ),
          )}
        </div>
      </div>

      {/* Headline and the line under it */}
      <div className="relative mt-5">
        {!pro && earned === 3 ? (
          <KineticText as="h1" text={headline} className="pw-display" at={T + 60} boil />
        ) : (
          <h1 className="pw-display pw-fx-rise" style={at(T + 60, { '--fx-dur': '260ms' })}>
            {headline}
          </h1>
        )}
        {!pro && earned >= 2 && (
          <div className="pointer-events-none mt-1 flex justify-center">
            <Doodle name={earned === 3 ? 'scribble' : 'underline'} draw at={T + 280} width={earned === 3 ? 150 : 120} />
          </div>
        )}
      </div>
      <p className="pw-h3 pw-fx-rise mt-1 text-[var(--ink-2)]" style={at(T + 100)}>
        {lessonTitle}
      </p>
      <p className="pw-body pw-fx-rise mt-2 max-w-[44ch]" style={at(T + 180)}>
        {sub}
      </p>

      {/* XP lines, top to bottom, then the level bar */}
      <div className="pw-card mt-5 w-full space-y-2 p-4 text-left">
        {linesAdd ? (
          <>
            <XpLine label="Jawaban benar" value={answersXp} start={T + 320} skip={skipped} pro={pro} />
            <XpLine label="Pelajaran selesai" value={finishXp} start={T + 380} skip={skipped} pro={pro} />
            {bonusXp > 0 && <XpLine label="Bonus ★★★" value={bonusXp} start={T + 430} skip={skipped} pro={pro} />}
          </>
        ) : null}
        <div
          className="pw-fx-rise flex items-baseline justify-between gap-3 border-t border-[var(--line)] pt-2"
          style={at(T + 430)}
        >
          <span className="font-extrabold">Total</span>
          <span className={`pw-h2 text-[var(--star-700)] ${pro ? 'font-mono tabular-nums' : ''}`}>
            <CountUp value={xpEarned} prefix="+" suffix={` ${word}`} delay={T + 430} duration={600} skip={skipped} />
          </span>
        </div>
        <div className="pw-fx-rise space-y-1.5 pt-1" style={at(T + 520)}>
          <ProgressBar variant="xp" value={barRatio * 100} label={levelText} />
          <p className={`pw-small m-0 text-[var(--ink-2)] ${pro ? 'font-mono tabular-nums' : ''}`}>{levelText}</p>
        </div>
      </div>

      {/* "Inti hari ini" and the mode line beside it */}
      <div className="mt-4 w-full space-y-3 text-left">
        <div className="pw-card pw-fx-rise p-4" style={at(T + 670)}>
          <span className="pw-kicker">Inti hari ini</span>
          <p className="pw-body mt-1 font-semibold">
            {recapParts.map((part, i) =>
              part.mark ? (
                <span key={i} className="pw-mark">
                  {part.text}
                </span>
              ) : (
                <React.Fragment key={i}>{part.text}</React.Fragment>
              ),
            )}
          </p>
        </div>

        {!pro && (
          <div className="pw-well pw-fx-fade flex items-start gap-3" style={at(T + 670, { '--fx-dur': '180ms' })}>
            <Users className="mt-0.5 h-6 w-6 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
            <p className="pw-body m-0">
              <span className="font-bold">Ceritakan ke kakak atau temanmu:</span> {talkPrompt ?? recap}
            </p>
          </div>
        )}

        {pro && atWork && (
          <div className="pw-well pw-fx-fade flex items-start gap-3" style={at(T + 670, { '--fx-dur': '180ms' })}>
            <Briefcase className="mt-0.5 h-6 w-6 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
            <p className="pw-body m-0">
              <span className="font-bold">Di tempat kerja:</span> {atWork}
            </p>
          </div>
        )}

        {props.reflection}

        {pro && record && (
          <div className="pw-well pw-fx-fade space-y-1" style={at(T + 670, { '--fx-dur': '180ms' })}>
            <p className="pw-body m-0 font-mono tabular-nums">
              {formatScore(firstTryCount, totalCount)}
              {record.attemptMs > 0 ? ` · ${formatDuration(record.attemptMs)}` : ''}
              {record.result.isNew && (
                <>
                  {' '}
                  <Annot label="rekor baru">rekor baru</Annot>
                </>
              )}
            </p>
            {record.result.previous && !record.result.isNew && (
              <p className="pw-small m-0 font-mono tabular-nums text-[var(--ink-3)]">
                terbaik: {record.result.best.bestFirstTry} dari {record.result.best.total}
                {record.result.best.bestMs ? ` · ${formatDuration(record.result.best.bestMs)}` : ''}
              </p>
            )}
          </div>
        )}
      </div>

      {/* The reward comes last: a new sticker (Junior) or concept card (Pro) */}
      {newSticker && (
        <div className="mt-5 w-full max-w-[260px]">
          <div
            className={`relative ${pro ? 'pw-enter' : 'pw-fx-slap'}`}
            data-enter={pro ? 'pop' : undefined}
            style={at(T + 870, pro ? { '--fx-dur': '200ms' } : undefined)}
          >
            <StickerCard
              title={newSticker.title}
              conceptName={newSticker.concept}
              art={<WorldIslandIllustration worldId={newSticker.worldId} size={96} />}
              summary={resolveTxt(newSticker.summary, mode)}
              finish={gold ? 'gold' : 'plain'}
              sheen={!pro}
              sheenAt={T + 870 + 308}
            />
            {!pro && (
              <span className="pointer-events-none absolute inset-0" aria-hidden="true">
                <Burst count={4} at={T + 870 + 228} duration={240} radius={60} travel={14} />
              </span>
            )}
          </div>
          <div className="mt-2">
            <Annot effect="fade" at={T + 1180} label={`${unit} baru`}>
              {unit} baru{pro ? '' : '!'}
            </Annot>
          </div>
        </div>
      )}

      {/* Actions: in the DOM and focusable from frame 0. One tap skips the sequence and activates the button. */}
      <div className="mt-6 w-full space-y-2.5">
        {stopping ? (
          <>
            <p className="pw-body text-[var(--ink-2)]">
              {pro ? 'Kamu bisa berhenti di sini. Tidur membantu memperkuat ingatan dari latihan hari ini.' : 'Kamu boleh berhenti di sini. Saat tidur, otakmu menyimpan yang kamu pelajari.'}
            </p>
            {restButton('primary')}
            {nextButton('secondary')}
          </>
        ) : (
          <>
            {nextButton('primary')}
          </>
        )}
        {showAgain &&
          (pro ? (
            <Button variant="ghost" fullWidth soundEnabled={soundEnabled} onClick={onAgain}>
              Ulangi untuk ★★★
            </Button>
          ) : (
            <button
              type="button"
              onClick={onAgain}
              className="pw-pressable inline-flex min-h-[var(--touch-min)] w-full items-center justify-center rounded-[var(--radius-md)] px-4 font-bold text-[var(--world-700)] underline underline-offset-4 cursor-pointer"
            >
              Ulangi untuk ★★★
            </button>
          ))}
        {showBonus && (
          <button
            type="button"
            onClick={onBonus}
            className="pw-pressable inline-flex min-h-[var(--touch-min)] w-full items-center justify-center gap-2 rounded-[var(--radius-md)] px-4 font-bold text-[var(--world-700)] underline underline-offset-4 cursor-pointer"
          >
            <span aria-hidden="true" className="font-mono">
              {'</>'}
            </span>
            Tantangan Kode
            {bonusDone && <span className="visually-hidden"> (sudah selesai)</span>}
          </button>
        )}
      </div>
    </div>
  );
};

const XpLine: React.FC<{ label: string; value: number; start: number; skip: boolean; pro: boolean }> = ({
  label,
  value,
  start,
  skip,
  pro,
}) => (
  <div className="pw-fx-rise flex items-baseline justify-between gap-3" style={at(start)}>
    <span className="pw-body">{label}</span>
    <span className={`font-extrabold ${pro ? 'font-mono tabular-nums' : ''}`}>
      <CountUp value={value} prefix="+" delay={start} duration={600} skip={skip} />
    </span>
  </div>
);
