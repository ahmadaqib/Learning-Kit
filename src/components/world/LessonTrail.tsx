import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Check, Flag, CircleHelp, Lock } from 'lucide-react';
import type { Mode } from '@/content/schema';
import { COLLECTION_LABEL, xpWord } from '@/app/modeConfig';
import { StarRow } from '@/components/ui/StarRow';
import { playSound } from '@/engine/sound';
import { getMotionPrefs } from '@/motion/prefs';
import { EASE } from '@/motion/tokens';
import { fx, runSequence } from '@/motion/waapi';

export type TrailRowState = 'done' | 'active' | 'locked';

export interface TrailRow {
  id: string;
  title: string;
  estMinutes: number;
  /** 1-based number on the stamp. */
  number: number;
  state: TrailRowState;
  stars: 0 | 1 | 2 | 3;
  /** The lesson was started and left: the pill says "Lanjut" instead of "Mulai". */
  resume: boolean;
  /** Name of the sticker (Junior) or concept card (Pro) this lesson awards, if any. */
  rewardName?: string;
  /** Junior: the "Tantangan Kode" was solved (seen.ts key bonus:{lessonId}). */
  bonus: boolean;
  /** Unlocked, and seen.ts has no unlock:lesson:{id} yet. */
  unseen: boolean;
}

export interface TrailSideQuest {
  id: string;
  title: string;
  state: 'done' | 'open' | 'locked';
}

interface LessonTrailProps {
  rows: TrailRow[];
  sideQuests: TrailSideQuest[];
  mode: Mode;
  soundEnabled: boolean;
  onOpen: (lessonId: string) => void;
  /** Called with an `unlock:lesson:{id}` flag's lesson id once its reveal is over (or at once for a quiet one). */
  onSeen: (lessonId: string) => void;
}

/** M35 starts 250 ms after mount, so the route entrance has finished (spec 5.9.5 F). Times are Junior ms. */
const T0 = 250;
const NODE = 40;

/** One connector piece between two stamps. Dashed while the lower stamp is locked, solid once it is open. */
const Connector: React.FC<{ solid: boolean; drawAt?: number; className?: string }> = ({ solid, drawAt, className = '' }) => (
  <span aria-hidden="true" className={`relative block w-[3px] ${className}`}>
    <span
      className="absolute inset-0 border-l-[3px] border-dashed border-[var(--line-strong)]"
      style={{ opacity: solid && drawAt === undefined ? 0 : 1 }}
    />
    {solid && (
      <svg
        className="absolute inset-0 h-full w-[3px]"
        viewBox="0 0 3 100"
        preserveAspectRatio="none"
        fill="none"
        focusable="false"
      >
        <path
          d="M1.5 0 V100"
          stroke="var(--world-600)"
          strokeWidth={3}
          {...(drawAt !== undefined
            ? {
                pathLength: 1,
                className: 'pw-draw',
                style: { '--fx-dur': '210ms', '--at': `${drawAt}ms` } as React.CSSProperties,
              }
            : null)}
        />
      </svg>
    )}
  </span>
);

/**
 * The lesson trail of a world (spec 8.4): a vertical path on the left joins numbered stamps, with one row per
 * lesson. Completed rows are compact, exactly one row is active and raised, locked rows are flat and are not
 * buttons. Rows do not stagger in.
 *
 * A lesson that has just unlocked (no `unlock:lesson:{id}` yet) plays 5.9.5 F once, 250 ms after mount: the trail
 * draws to the node, the lock leaves, the number lands, "Baru terbuka" fades in, the ring pulses twice and stays.
 * A pointer or key press anywhere in the trail skips it. Nothing here blocks a press.
 */
export const LessonTrail: React.FC<LessonTrailProps> = ({ rows, sideQuests, mode, soundEnabled, onOpen, onSeen }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  // Decided once, on mount: marking things seen must not switch the reveal off while it plays.
  const [freshId] = useState(() => rows.find((r) => r.state === 'active' && r.unseen)?.id);
  const [lockGone, setLockGone] = useState(() => getMotionPrefs().reduced);
  const quiet = useRef(rows.filter((r) => r.unseen && r.id !== freshId).map((r) => r.id));

  useEffect(() => {
    quiet.current.forEach(onSeen);
    // Mount only: the list of quiet rows was fixed above.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Both animations are created before the first paint, so nothing flashes before its start time.
  useLayoutEffect(() => {
    if (!freshId) return;
    const lock = lockRef.current
      ? fx(
          lockRef.current,
          [
            { opacity: 1, transform: 'rotate(0deg)' },
            { opacity: 0, transform: 'rotate(20deg)' },
          ],
          { duration: 160, easing: EASE.out, delay: T0 + 360 },
        )
      : null;
    lock?.effect?.updateTiming({ fill: 'both' });
    const num = numRef.current
      ? fx(
          numRef.current,
          [
            { opacity: 0, transform: 'scale(0.8)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 240, easing: EASE.spring, delay: T0 + 440 },
        )
      : null;
    if (!lock) setLockGone(true);
    return () => {
      lock?.cancel();
      num?.cancel();
    };
  }, [freshId]);

  useEffect(() => {
    if (!freshId || !rootRef.current) return;
    const seq = runSequence(
      rootRef.current,
      [
        { at: T0 + 360, run: ({ skipped }) => { if (!skipped) playSound('star', soundEnabled); } },
        { at: T0 + 520, run: () => setLockGone(true) },
        { at: T0 + 1000, run: () => {} },
      ],
      { onDone: () => onSeen(freshId) },
    );
    return () => seq.cancel();
    // The sequence belongs to this mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freshId]);

  const sqUnit = COLLECTION_LABEL[mode].unit;

  return (
    <div ref={rootRef} className="pw-seq">
      <ol className="m-0 list-none p-0" aria-label="Pelajaran">
        {rows.map((row, i) => {
          const prev = rows[i - 1];
          const next = rows[i + 1];
          const isFresh = row.id === freshId;
          const nextFresh = next?.id === freshId;
          const open = row.state !== 'locked';
          const nextOpen = next ? next.state !== 'locked' : false;

          const node = (
            <span
              className={`relative flex flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                row.state === 'done'
                  ? 'bg-[var(--ok-500)] text-white'
                  : row.state === 'active'
                    ? 'bg-[var(--world-600)] text-[var(--world-btn-text)]'
                    : 'border-2 border-dashed border-[var(--line-strong)] bg-[var(--surface-page)] text-[var(--ink-2)]'
              }`}
              style={{ width: NODE, height: NODE }}
              aria-hidden="true"
            >
              {row.state === 'done' ? (
                <Check className="h-5 w-5" strokeWidth={3} />
              ) : row.state === 'locked' ? (
                <Lock className="h-4 w-4" />
              ) : (
                <span ref={isFresh ? numRef : undefined} className="block">
                  {row.number}
                </span>
              )}
              {isFresh && !lockGone && (
                <span
                  ref={lockRef}
                  className="absolute inset-0 flex items-center justify-center rounded-full border-2 border-dashed border-[var(--line-strong)] bg-[var(--surface-page)] text-[var(--ink-2)]"
                >
                  <Lock className="h-4 w-4" />
                </span>
              )}
            </span>
          );

          return (
            <li key={row.id} className="flex gap-3">
              {/* The path: the piece above the stamp, the stamp, the piece below it */}
              <div className="flex flex-shrink-0 flex-col items-center" style={{ width: NODE }}>
                {prev ? (
                  <Connector solid={open} drawAt={isFresh ? T0 + 210 : undefined} className="h-3 flex-none" />
                ) : (
                  <span className="block h-3 flex-none" aria-hidden="true" />
                )}
                {node}
                {next ? (
                  <Connector solid={nextOpen} drawAt={nextFresh ? T0 : undefined} className="min-h-[12px] flex-1" />
                ) : (
                  <span className="block flex-1" aria-hidden="true" />
                )}
              </div>

              <div className="min-w-0 flex-1 pb-2">
                {row.state === 'locked' ? (
                  <div
                    aria-disabled="true"
                    className="flex min-h-[64px] items-center justify-between gap-3 rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-[var(--line-strong)] px-4 py-3 text-[var(--ink-2)]"
                  >
                    <div className="min-w-0">
                      <div className="font-bold">{row.title}</div>
                    </div>
                    <span className="pw-small inline-flex flex-shrink-0 items-center gap-1 font-bold">
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      Terkunci
                    </span>
                  </div>
                ) : row.state === 'done' ? (
                  <button
                    type="button"
                    onClick={() => onOpen(row.id)}
                    className="pw-card pw-pressable flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-3 px-4 py-2 text-left"
                    data-press="lg"
                  >
                    <span className="min-w-0">
                      <span className="block font-bold text-[var(--ink)]">{row.title}</span>
                      {row.bonus && (
                        <span className="pw-small mt-0.5 inline-flex items-center gap-1.5 font-bold text-[var(--ink-2)]">
                          <span
                            aria-hidden="true"
                            className="pw-code rounded-[var(--radius-xs)] border-[1.5px] border-[var(--star)] bg-[var(--star-50)] px-1.5 text-[var(--star-700)]"
                          >
                            &lt;/&gt;
                          </span>
                          Tantangan Kode
                        </span>
                      )}
                    </span>
                    <StarRow stars={row.stars} size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpen(row.id)}
                    className={`pw-card-raised pw-pressable relative flex w-full cursor-pointer flex-col gap-2 border-2 border-[var(--world-600)] bg-[var(--world-50)] p-[var(--space-card)] text-left ${
                      isFresh ? 'pw-fx-ring' : ''
                    }`}
                    data-press="lg"
                    data-ring={isFresh ? '2' : undefined}
                    style={
                      isFresh
                        ? ({ '--ring-color': 'var(--world-600)', '--at': `${T0 + 600}ms` } as React.CSSProperties)
                        : undefined
                    }
                  >
                    {isFresh && (
                      <span
                        className="pw-fx-fade inline-flex w-fit rounded-full bg-[var(--star)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--on-star)]"
                        style={{ '--fx-dur': '200ms', '--at': `${T0 + 520}ms` } as React.CSSProperties}
                      >
                        Baru terbuka
                      </span>
                    )}
                    <span className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="pw-h3 block text-[var(--ink)]">{row.title}</span>
                        <span className="pw-small mt-0.5 block text-[var(--ink-2)]">± {row.estMinutes} menit</span>
                      </span>
                      {row.rewardName && (
                        <span
                          className="pw-sticker pw-sticker-card flex h-12 w-12 flex-shrink-0 items-center justify-center text-[var(--ink-2)]"
                          data-locked="true"
                        >
                          <CircleHelp className="h-5 w-5" aria-hidden="true" />
                          <span className="visually-hidden">
                            {sqUnit} berikutnya: {row.rewardName}
                          </span>
                        </span>
                      )}
                    </span>
                    <span className="inline-flex min-h-[var(--touch-min)] w-fit items-center rounded-full bg-[var(--world-600)] px-5 font-extrabold text-[var(--world-btn-text)]">
                      {row.resume ? 'Lanjut' : 'Mulai'} →
                    </span>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {sideQuests.length > 0 && (
        <ul className="m-0 mt-[var(--gap-stack)] list-none space-y-[var(--gap-stack)] p-0">
          {sideQuests.map((sq) => {
            const inner = (
              <>
                <span className="flex min-w-0 items-center gap-3">
                  <Flag className="h-5 w-5 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block font-bold text-[var(--ink)]">{sq.title}</span>
                    <span className="pw-small block text-[var(--ink-2)]">
                      Misi Bonus · opsional · +25 {xpWord(mode)}
                    </span>
                  </span>
                </span>
                <span className="pw-small inline-flex flex-shrink-0 items-center gap-1 font-extrabold text-[var(--world-700)]">
                  {sq.state === 'done' ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Selesai
                    </>
                  ) : sq.state === 'open' ? (
                    'Buka →'
                  ) : (
                    <>
                      <Lock className="h-4 w-4" aria-hidden="true" />
                      Terkunci
                    </>
                  )}
                </span>
              </>
            );
            return (
              <li key={sq.id}>
                {sq.state === 'locked' ? (
                  <div
                    aria-disabled="true"
                    className="flex min-h-[64px] items-center justify-between gap-3 rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-[var(--line-strong)] p-4 text-[var(--ink-2)]"
                  >
                    {inner}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpen(sq.id)}
                    data-press="lg"
                    className="pw-pressable flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-lg)] border-[1.5px] border-dashed border-[var(--line-strong)] p-4 text-left hover:border-[var(--world-600)]"
                  >
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
