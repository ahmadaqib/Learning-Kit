import React from 'react';
import { Check, Shield } from 'lucide-react';
import type { Mode } from '@/content/schema';
import { xpWord } from '@/app/modeConfig';
import { Doodle } from '@/components/fx/Doodle';
import { Button } from '@/components/ui/Button';

export type BossCardState = 'locked' | 'open' | 'passed';

interface BossCardProps {
  guardianName: string;
  state: BossCardState;
  mode: Mode;
  /** Visible lessons of the world, and how many are completed. */
  totalLessons: number;
  doneLessons: number;
  /** The world itself is still locked: the card asks for that instead of for lessons. */
  worldLocked: boolean;
  /** Best score, 0 to 1. */
  best?: number;
  soundEnabled: boolean;
  onOpen: () => void;
}

/**
 * The guardian of a world (spec 8.4): a `--boss` surface with `--on-boss` text, the shield as a sticker and
 * gold (`--star`) accents.
 *  - Locked: flat and still. How many lessons are left, and a small meter.
 *  - Open: a gold edge, a static `rays` doodle behind the shield (Junior), "Siap ditantang!" and a gold button.
 *  - Passed: a check stamp, "Lulus" and the best score.
 * Nothing on this card loops or moves by itself.
 */
export const BossCard: React.FC<BossCardProps> = ({
  guardianName,
  state,
  mode,
  totalLessons,
  doneLessons,
  worldLocked,
  best,
  soundEnabled,
  onOpen,
}) => {
  const locked = state === 'locked';
  const open = state === 'open';
  const passed = state === 'passed';
  const remaining = Math.max(0, totalLessons - doneLessons);
  const junior = mode === 'junior';

  const lockedText = worldLocked
    ? `Buka dunia ini dulu untuk menantang ${guardianName}.`
    : `Selesaikan ${remaining} pelajaran lagi untuk menantang ${guardianName}.`;

  return (
    <section
      aria-label={guardianName}
      className={`pw-boss relative flex flex-col gap-[var(--gap-stack)] p-[var(--space-card)] ${
        open ? 'border-2 border-[var(--star)]' : 'border-2 border-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          {/* Static rays behind the shield: Junior only, and only while the card is open */}
          {open && junior && (
            <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Doodle name="rays" width={132} style={{ color: 'var(--star)' }} />
            </span>
          )}
          <span
            className="pw-sticker relative flex h-[72px] w-[72px] items-center justify-center"
            data-locked={locked ? 'true' : undefined}
            style={{ '--tilt': '-3deg' } as React.CSSProperties}
          >
            {passed ? (
              <Check className="h-9 w-9 text-[var(--ok-500)]" strokeWidth={3} aria-hidden="true" />
            ) : (
              <Shield
                className={`h-9 w-9 ${locked ? 'text-[var(--on-boss)]' : 'text-[var(--star)]'}`}
                fill={locked ? 'none' : 'currentColor'}
                aria-hidden="true"
              />
            )}
          </span>
        </div>

        <div className="min-w-0">
          <span className="pw-kicker">{junior ? 'Penjaga' : 'Penjaga dunia'}</span>
          <h2 className="pw-h3 text-[var(--on-boss)]">{guardianName}</h2>
          {open && <p className="pw-body font-extrabold text-[var(--star)]">Siap ditantang!</p>}
          {passed && (
            <p className="pw-body font-extrabold text-[var(--star)]">
              Lulus
              {best !== undefined && best > 0 && (
                <span className="pw-small ml-2 font-bold text-[var(--on-boss)]">
                  Skor terbaik {Math.round(best * 100)}%
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      {locked && (
        <>
          <p className="pw-small m-0 text-[var(--on-boss)]">{lockedText}</p>
          {!worldLocked && totalLessons > 0 && (
            <div
              role="img"
              aria-label={`${doneLessons} dari ${totalLessons} pelajaran selesai`}
              className="flex gap-1.5"
            >
              {Array.from({ length: totalLessons }, (_, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className={`h-2 flex-1 rounded-full ${
                    i < doneLessons ? 'bg-[var(--star)]' : 'border border-[var(--line-strong)]'
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {open && (
        <>
          <p className="pw-small m-0 text-[var(--on-boss)]">
            Ujian campuran dunia. Lulus dengan 80% benar (+50 {xpWord(mode)}).
          </p>
          <Button
            fullWidth
            soundEnabled={soundEnabled}
            onClick={onOpen}
            style={
              {
                backgroundColor: 'var(--star)',
                color: 'var(--on-star)',
                '--edge-color': 'var(--star-700)',
              } as React.CSSProperties
            }
          >
            Hadapi Penjaga →
          </Button>
        </>
      )}

      {passed && (
        <Button
          variant="ghost"
          soundEnabled={soundEnabled}
          onClick={onOpen}
          className="self-start hover:bg-[color-mix(in_srgb,var(--on-boss)_14%,transparent)]!"
          style={{ color: 'var(--on-boss)' }}
        >
          {junior ? 'Coba lagi →' : 'Ulangi tantangan →'}
        </Button>
      )}
    </section>
  );
};
