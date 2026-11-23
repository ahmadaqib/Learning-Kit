import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Doodle } from '@/components/fx/Doodle';
import { Bito, type BitoExpression } from '@/components/mascot/Bito';
import { Button } from '@/components/ui/Button';
import { levelLabel } from '@/app/modeConfig';
import { nextReward } from '@/content/mascotRewards';
import { playSound } from '@/engine/sound';
import { useMotionPrefs } from '@/motion/prefs';
import { runSequence } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';

export interface LevelUpOverlayProps {
  /** The level the learner has just reached. */
  level: number;
  /** The title that goes with that level. */
  title: string;
  /** Called once when the overlay closes: the button, Enter, Escape or a tap outside the card. */
  onClose: () => void;
}

/** Spec 5.9.5 C, Junior times in ms. Pro multiplies them by 0.7 inside runSequence and in CSS. */
const AT = {
  badge: 80,
  impact: 245,
  roll: 340,
  underline: 760,
  reward: 900,
  end: 1200,
} as const;

/**
 * Level-up (M32), a native <dialog> with a heading. The card enters in 200 ms and carries the title and the
 * button, which has focus from frame 0. Then: the badge stamps (impact at 245 ms, `unlock` sound), the rays draw
 * and Bito says `wow` on that frame, the level digit rolls, the title underline draws, and one line names the next
 * reward. A tap, Enter, Space or Escape anywhere skips the rest, and a tap on "Lanjut" skips and closes in one
 * press. Closing is same-frame. Pro has no overlay by design (a banner on the result): when one is shown anyway
 * it is the calm version, without rays or Bito.
 */
export const LevelUpOverlay: React.FC<LevelUpOverlayProps> = ({ level, title, onClose }) => {
  const { mode } = useMotionPrefs();
  const junior = mode === 'junior';
  const soundEnabled = useAppStore((s) => s.profiles[s.activeProfileId]?.settings.soundEnabled ?? false);
  const mascot = useAppStore((s) => s.profiles[s.activeProfileId]?.mascot);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [face, setFace] = useState<BitoExpression>('idle');
  const reward = nextReward(level);
  const previous = Math.max(1, level - 1);
  const closedRef = useRef(false);

  // Open as a modal and focus the primary button on the first frame, then start the sequence.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('button[data-primary]')?.focus({ preventScroll: true });

    const handle = runSequence(dialog, [
      {
        at: AT.impact,
        run: ({ skipped }) => {
          if (!skipped) playSound('unlock', soundEnabled);
          setFace('wow');
        },
      },
      // Keeps the sequence open until the last element has landed, so a tap can still skip it (data-seq="done")
      { at: AT.end, run: () => undefined },
    ]);
    return () => handle.cancel();
    // The sequence runs once per overlay. Sound is read when the cue fires.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // `close` fires for the button, Escape and a tap outside the card. Report it once.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const handleClose = () => {
      if (closedRef.current) return;
      closedRef.current = true;
      onClose();
    };
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  const labelId = 'level-up-title';
  const descId = 'level-up-desc';
  const label = levelLabel(level, mode);

  return (
    <dialog
      ref={dialogRef}
      className="pw-dialog pw-seq"
      data-rm="fade"
      aria-labelledby={labelId}
      aria-describedby={descId}
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-8 text-center pw-safe-bottom">
        {/* Badge, rays and Bito */}
        <div className="relative flex h-44 w-full max-w-[280px] items-end justify-center">
          {junior && (
            <Doodle
              name="rays"
              draw
              at={AT.impact}
              width={190}
              style={{ position: 'absolute', left: '50%', bottom: 58, translate: '-50% 0', color: 'var(--star-700)' }}
            />
          )}
          <div
            role="img"
            aria-label={label}
            className="pw-fx-stamp relative flex h-32 w-32 flex-col items-center justify-center rounded-full border-[3px] border-[var(--star-700)] bg-[var(--star)] text-[var(--on-star)]"
            style={{ '--at': `${AT.badge}ms`, '--stamp-from': 1.6 } as React.CSSProperties}
          >
            <span aria-hidden="true" className={junior ? 'pw-h3' : 'font-mono text-sm font-bold'}>
              {junior ? 'Level' : 'Lv'}
            </span>
            <span
              aria-hidden="true"
              className={`pw-fx-roll-box text-[3rem] font-extrabold leading-none ${junior ? '' : 'font-mono'}`}
              style={{ height: '1em' }}
            >
              <span className="pw-fx-roll" style={{ '--at': `${AT.roll}ms` } as React.CSSProperties}>
                <span>{previous}</span>
                <span>{level}</span>
              </span>
            </span>
          </div>
          {junior && (
            <div className="absolute bottom-0 right-0">
              <Bito expression={face} size={72} custom={mascot} />
            </div>
          )}
        </div>

        <div className="relative">
          <h2 id={labelId} className="pw-h2 m-0">
            Naik level!
          </h2>
          {junior && (
            <Doodle
              name="underline"
              draw
              at={AT.underline}
              width={120}
              style={{ display: 'block', margin: '2px auto 0' }}
            />
          )}
        </div>

        <p id={descId} className="pw-body m-0 text-[var(--ink-2)]">
          {junior ? 'Gelarmu sekarang: ' : `${label} · `}
          <strong className="text-[var(--ink)]">{title}</strong>
        </p>

        {reward && (
          <p
            className="pw-fx-fade pw-small m-0 text-[var(--ink-2)]"
            style={{ '--at': `${AT.reward}ms` } as React.CSSProperties}
          >
            {reward.text}
          </p>
        )}

        <Button
          fullWidth
          soundEnabled={soundEnabled}
          className="mt-2"
          onClick={() => dialogRef.current?.close()}
          data-primary="true"
        >
          Lanjut
        </Button>
      </div>
    </dialog>
  );
};
