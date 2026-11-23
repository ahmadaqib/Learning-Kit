import React from 'react';
import { Check, Lock } from 'lucide-react';
import type { WorldMeta } from '@/content/worldMeta';
import type { Mode } from '@/content/schema';
import { WorldIslandIllustration } from '@/components/illustrations/ConceptVisuals';
import { Bito } from '@/components/mascot/Bito';
import { Annot } from '@/components/fx/Annot';
import { Doodle } from '@/components/fx/Doodle';
import { WorldThemeWrapper } from '@/components/ui/WorldThemeWrapper';
import { playSound } from '@/engine/sound';
import { stickerTilt } from '@/motion/tokens';

export type WorldNodeState = 'done' | 'current' | 'locked';

interface WorldNodeProps {
  meta: WorldMeta;
  /** Position in the track: picks the deterministic sticker tilt. */
  index: number;
  /** Which side of the path the island sits on. The label goes towards the centre line. */
  side: 'left' | 'right';
  state: WorldNodeState;
  earned: number;
  max: number;
  mode: Mode;
  /** The world shown in the side poster (wide screens). */
  selected: boolean;
  /** Unlocked but not yet seen: grey layer, then the colour fades in, then one pop (M37). */
  reveal: boolean;
  soundEnabled: boolean;
  /** Centre of the island, in px from the centre line and from the top of the map. */
  cx: number;
  cy: number;
  onPress: () => void;
  nodeRef?: React.Ref<HTMLDivElement>;
}

const ISLAND = 104;
const ISLAND_CURRENT = 116;

/**
 * One world on the map (spec 8.3). The island is a die-cut sticker at a fixed centre, so the path (computed from
 * constants) always passes through it. The label sits beside the island on a plain page-coloured chip: text never
 * sits on the dotted map.
 *
 * Motion: hover lift and the flat press on open nodes only (M02, M01). A locked node is flat and still (PRD V14).
 * The current node plays its ring twice and then keeps a static ring. A newly unlocked node plays M37.
 */
export const WorldNode: React.FC<WorldNodeProps> = ({
  meta,
  index,
  side,
  state,
  earned,
  max,
  mode,
  selected,
  reveal,
  soundEnabled,
  cx,
  cy,
  onPress,
  nodeRef,
}) => {
  const locked = state === 'locked';
  const current = state === 'current';
  const done = state === 'done';
  const size = current ? ISLAND_CURRENT : ISLAND;
  // CSS offset of the label from the button: `left: 100% + 8px` puts it to the right of a left-hand island, and the
  // other way round. Bito stands on the outer side, with the same property name.
  const labelEdge = side === 'left' ? 'left' : 'right';
  const outerEdge = side === 'left' ? 'left' : 'right';

  const island = (
    <WorldIslandIllustration worldId={meta.id} size={size} locked={locked} label={`Pulau ${meta.title}`} />
  );

  return (
    <div
      ref={nodeRef}
      data-world-node={meta.id}
      className="absolute"
      style={{ left: `calc(50% + ${cx}px)`, top: cy, width: 0, height: 0 }}
    >
      <WorldThemeWrapper worldId={meta.id} className="w-auto!">
        <button
          type="button"
          onClick={onPress}
          aria-current={current ? 'step' : undefined}
          className={`absolute block rounded-[var(--radius-lg)] ${
            locked ? 'cursor-pointer' : 'pw-pressable pw-lift cursor-pointer'
          }`}
          style={{ width: size, height: size, left: -size / 2, top: -size / 2 }}
        >
          {/* Island sticker. Locked: flat, no tilt, dashed outline (4.8). A revealed node pops once at 660 ms (M37). */}
          <span
            className={`pw-sticker relative block h-full w-full ${reveal ? 'pw-fx-bump' : ''}`}
            data-locked={locked ? 'true' : undefined}
            style={
              {
                '--tilt': `${stickerTilt(index)}deg`,
                ...(reveal ? { '--bump': 1.08, '--fx-dur': '320ms', '--at': '660ms' } : null),
              } as React.CSSProperties
            }
          >
            {reveal ? (
              <>
                <span className="absolute inset-0 block" aria-hidden="true">
                  <WorldIslandIllustration worldId={meta.id} size={size} locked />
                </span>
                <span
                  className="pw-fx-fade absolute inset-0 block"
                  style={{ '--fx-dur': '480ms', '--at': '420ms' } as React.CSSProperties}
                >
                  {island}
                </span>
              </>
            ) : (
              island
            )}
            {/* Two pulses, then a static ring (the current node only). After the pop when it was just revealed. */}
            {current && (
              <span
                aria-hidden="true"
                data-ring="2"
                className="pw-fx-ring pointer-events-none absolute inset-0 block rounded-[var(--radius-lg)]"
                style={{ '--ring-color': 'var(--world-600)', '--at': reveal ? '1000ms' : '0ms' } as React.CSSProperties}
              />
            )}
          </span>

          {done && (
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--paper)] bg-[var(--ok-500)] text-white"
            >
              <Check className="h-4 w-4" strokeWidth={3} />
            </span>
          )}
          {locked && (
            <span
              aria-hidden="true"
              className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--paper)] bg-[var(--ink-3)] text-[var(--paper)]"
            >
              <Lock className="h-4 w-4" />
            </span>
          )}
          {current && (
            <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-7">
              <Doodle name="flag" width={30} />
            </span>
          )}

          {/* Label */}
          <span
            className={`absolute top-1/2 flex w-[min(136px,40vw)] -translate-y-1/2 flex-col gap-0.5 rounded-[var(--radius-sm)] border-2 bg-[var(--surface-page)] px-1.5 py-1.5 min-[350px]:px-2.5 ${
              side === 'left' ? 'items-start text-left' : 'items-end text-right'
            } ${selected ? 'border-[var(--world-600)]' : 'border-transparent'}`}
            style={{ [labelEdge]: 'calc(100% + 8px)' }}
          >
            {mode === 'pro' && <span className="pw-kicker">{meta.id.toUpperCase()}</span>}
            <span className="pw-small font-extrabold leading-tight text-[var(--ink)]">{meta.title}</span>
            {current && (
              <Annot label="Kamu di sini" className="whitespace-nowrap">
                kamu di sini
              </Annot>
            )}
            {locked ? (
              <span className="pw-small inline-flex items-center gap-1 font-bold text-[var(--ink-2)]">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                Terkunci
              </span>
            ) : (
              <span className="pw-small inline-flex items-center gap-1 font-bold text-[var(--ink-2)]">
                {done && <Check className="h-3.5 w-3.5 text-[var(--ok-600)]" aria-hidden="true" />}
                {earned}/{max} ★
                {done && <span className="visually-hidden">, selesai</span>}
              </span>
            )}
          </span>
        </button>
      </WorldThemeWrapper>

      {/* Junior: Bito stands beside the current node and can be poked (M47). Not inside the button: no nested buttons. */}
      {current && mode === 'junior' && (
        <span
          className="absolute h-14 w-14 [&_svg]:h-full [&_svg]:w-full"
          style={{ [outerEdge]: -(size / 2) - 22, top: size / 2 - 44 }}
        >
          <Bito expression="idle" size={96} pokeable onPoke={() => playSound('bip', soundEnabled)} />
        </span>
      )}
    </div>
  );
};
