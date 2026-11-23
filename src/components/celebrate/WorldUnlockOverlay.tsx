import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Burst } from '@/components/fx/Burst';
import { Doodle } from '@/components/fx/Doodle';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { Button } from '@/components/ui/Button';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';
import { resolveTxt } from '@/content/schema';
import { WORLD_META_BY_ID } from '@/content/worldMeta';
import { playSound } from '@/engine/sound';
import { useMotionPrefs } from '@/motion/prefs';
import { runSequence } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';

export interface WorldUnlockOverlayProps {
  worldId: string;
  /** Called once when the overlay closes, whichever way. */
  onClose: () => void;
}

/** Spec 5.9.5 D, Junior times in ms. */
const AT = {
  path: 100,
  lock: 420,
  island: 520,
  name: 760,
  sparks: 900,
  end: 1200,
} as const;

/** One padlock drawn twice and clipped to its left and right halves, so the halves can fly apart. */
const LockHalf: React.FC<{ side: 'l' | 'r' }> = ({ side }) => (
  <span
    aria-hidden="true"
    data-side={side}
    className="pw-fx-lock absolute inset-0 flex items-center justify-center"
    style={
      {
        '--at': `${AT.lock}ms`,
        clipPath: side === 'l' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
      } as React.CSSProperties
    }
  >
    <Lock className="h-14 w-14 text-[var(--ink)]" strokeWidth={2.4} fill="var(--paper-raised)" />
  </span>
);

/**
 * World unlock (M36), a native <dialog> with a heading. Junior: a dashed trail draws towards the island, the
 * padlock wiggles and splits into two halves that fly apart (`unlock` sound), the island peels in underneath it,
 * the name rises and four sparks leave as it settles. Pro: no trail, no wiggle, no peel rotation and no sparks.
 * The padlock fades, the island enters with opacity and scale, the name fades (about 700 ms).
 * "Lihat di peta" goes to /peta/{jalur}?baru={worldId}; the map reads that parameter. The primary button has
 * focus from frame 0 and a tap, Enter or Escape anywhere skips the rest. Closing is same-frame.
 */
export const WorldUnlockOverlay: React.FC<WorldUnlockOverlayProps> = ({ worldId, onClose }) => {
  const { mode } = useMotionPrefs();
  const junior = mode === 'junior';
  const navigate = useNavigate();
  const meta = WORLD_META_BY_ID[worldId];
  const soundEnabled = useAppStore((s) => s.profiles[s.activeProfileId]?.settings.soundEnabled ?? false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closedRef = useRef(false);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !meta) return undefined;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('button[data-primary]')?.focus({ preventScroll: true });

    const handle = runSequence(dialog, [
      {
        at: junior ? AT.lock : 0,
        run: ({ skipped }) => {
          if (!skipped) playSound('unlock', soundEnabled);
        },
      },
      // Keeps the sequence open until the last element has landed, so a tap can still skip it (data-seq="done")
      { at: AT.end, run: () => undefined },
    ]);
    return () => handle.cancel();
    // The sequence runs once per overlay. Sound is read when the cue fires.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // A world that no longer exists has nothing to show. Drop it instead of leaving the queue stuck.
  useEffect(() => {
    if (!meta && !closedRef.current) {
      closedRef.current = true;
      onClose();
    }
  }, [meta, onClose]);

  if (!meta) return null;

  const seeMap = () => {
    dialogRef.current?.close();
    navigate(`/peta/${meta.track}?baru=${encodeURIComponent(worldId)}`);
  };

  return (
    <dialog
      ref={dialogRef}
      className="pw-dialog pw-seq"
      data-rm="fade"
      aria-labelledby="world-unlock-title"
      aria-describedby="world-unlock-desc"
      {...({ closedby: 'any' } as Record<string, string>)}
    >
      <WorldThemeWrapper worldId={worldId}>
        <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-8 text-center pw-safe-bottom">
          <h2 id="world-unlock-title" className="pw-h2 m-0">
            Dunia baru terbuka!
          </h2>

          {/* The island, the padlock on top of it, the trail and the sparks */}
          <div className="relative flex h-44 w-full max-w-[300px] items-center justify-center">
            {junior && (
              <Doodle
                name="dash-path"
                draw
                at={AT.path}
                width={110}
                style={{ position: 'absolute', left: 0, bottom: 18, color: 'var(--world-700)' }}
              />
            )}

            <div
              className={`relative flex h-36 w-36 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--world-50)] ${
                junior ? 'pw-sticker pw-fx-peel' : 'pw-enter'
              }`}
              data-enter={junior ? undefined : 'pop'}
              style={
                {
                  '--at': `${junior ? AT.island : 100}ms`,
                  '--tilt': '-3deg',
                } as React.CSSProperties
              }
            >
              <WorldIslandIllustration worldId={worldId} size={120} />
              {junior && <Burst count={4} at={AT.sparks} />}
            </div>

            {/* Padlock */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
              {junior ? (
                <div className="relative h-14 w-14">
                  <LockHalf side="l" />
                  <LockHalf side="r" />
                </div>
              ) : (
                <span className="pw-fx-out" style={{ '--at': '0ms' } as React.CSSProperties}>
                  <Lock className="h-14 w-14 text-[var(--ink)]" strokeWidth={2.4} fill="var(--paper-raised)" />
                </span>
              )}
            </div>
          </div>

          <div
            id="world-unlock-desc"
            className="pw-fx-rise"
            style={{ '--at': `${junior ? AT.name : 300}ms` } as React.CSSProperties}
          >
            <p className="pw-h3 m-0">{meta.title}</p>
            <p className="pw-small m-0 mt-1 text-[var(--ink-2)]">{resolveTxt(meta.tagline, mode)}</p>
          </div>

          <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row-reverse">
            <Button fullWidth soundEnabled={soundEnabled} data-primary="true" onClick={seeMap}>
              Lihat di peta →
            </Button>
            <Button
              variant="secondary"
              fullWidth
              soundEnabled={soundEnabled}
              onClick={() => dialogRef.current?.close()}
            >
              Nanti saja
            </Button>
          </div>
        </div>
      </WorldThemeWrapper>
    </dialog>
  );
};
