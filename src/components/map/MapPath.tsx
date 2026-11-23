import React from 'react';
import { WORLD_METAS, type WorldMeta } from '@/content/worldMeta';
import type { Lesson, Profile, World } from '@/content/schema';

/**
 * The map path (spec 8.3). One SVG behind the nodes. Geometry comes from constants, never from the DOM:
 * the row height is 148 px and the node centres alternate left and right of the centre line.
 * Two strokes share one curve per segment: a dotted `--line-strong` trail for the whole track, and a solid 6 px
 * stroke in the world's own colour for the part that is completed. When the completed part has grown since the
 * last visit (seen.ts key `path:{worldId}:{count}`), only the new part draws (M15, 600 ms, `--ease-out-expo`).
 */

export const ROW_H = 148;
/** Distance of the node centres from the centre line: 56 px, and 88 px from 640 px wide. */
export const SPREAD_NARROW = 56;
export const SPREAD_WIDE = 88;
const DRAW_MS = 600;

interface Pt {
  x: number;
  y: number;
}
type Cubic = [Pt, Pt, Pt, Pt];

/** Centres of the nodes, in track order (index 0 is the first world, at the bottom). Relative to the centre line. */
export function getNodeCenters(count: number, spread: number): Pt[] {
  return Array.from({ length: count }, (_, k) => ({
    x: k % 2 === 0 ? -spread : spread,
    y: (count - 1 - k) * ROW_H + ROW_H / 2,
  }));
}

export function getMapHeight(count: number): number {
  return count * ROW_H;
}

const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

function splitCubic(c: Cubic, t: number): [Cubic, Cubic] {
  const [p0, p1, p2, p3] = c;
  const a = lerp(p0, p1, t);
  const b = lerp(p1, p2, t);
  const d = lerp(p2, p3, t);
  const e = lerp(a, b, t);
  const f = lerp(b, d, t);
  const g = lerp(e, f, t);
  return [
    [p0, a, e, g],
    [g, f, d, p3],
  ];
}

/** The part of a cubic between parameters t0 and t1 (de Casteljau). */
function subCubic(c: Cubic, t0: number, t1: number): Cubic {
  const [head] = splitCubic(c, t1);
  if (t0 <= 0) return head;
  const [, tail] = splitCubic(head, t0 / t1);
  return tail;
}

const f1 = (n: number) => Math.round(n * 10) / 10;
const toPath = ([p0, p1, p2, p3]: Cubic) =>
  `M${f1(p0.x)} ${f1(p0.y)} C${f1(p1.x)} ${f1(p1.y)} ${f1(p2.x)} ${f1(p2.y)} ${f1(p3.x)} ${f1(p3.y)}`;

export interface MapPathSegment {
  /** The world the segment leaves from. Its colour is the segment's colour. */
  world: WorldMeta;
  /** Completed share now, 0 to 1. */
  progress: number;
  /** Completed share at the last visit. Equal to `progress` when nothing is new. */
  prevProgress: number;
}

interface MapPathProps {
  /** Segment k joins world k and world k + 1 of the track. */
  segments: MapPathSegment[];
  /** World count of the track. */
  count: number;
  spread: number;
}

export const MapPath: React.FC<MapPathProps> = ({ segments, count, spread }) => {
  const centers = getNodeCenters(count, spread);
  const width = spread * 2 + 40;
  const height = getMapHeight(count);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`${-width / 2} 0 ${width} ${height}`}
      width={width}
      height={height}
      fill="none"
      style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        marginLeft: -width / 2,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      {segments.map((seg, k) => {
        const a = centers[k];
        const b = centers[k + 1];
        if (!a || !b) return null;
        const mid = (a.y + b.y) / 2;
        const curve: Cubic = [a, { x: a.x, y: mid }, { x: b.x, y: mid }, b];
        const grown = seg.progress > seg.prevProgress;
        const staticTo = grown ? seg.prevProgress : seg.progress;
        return (
          <g
            key={seg.world.id}
            data-world-id={seg.world.id}
            data-world-yellow={seg.world.isYellow ? 'true' : undefined}
            style={{ '--world': seg.world.color } as React.CSSProperties}
          >
            <path
              d={toPath(curve)}
              stroke="var(--line-strong)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="1 13"
            />
            {staticTo > 0 && (
              <path
                d={toPath(subCubic(curve, 0, Math.min(1, staticTo)))}
                stroke="var(--world-600)"
                strokeWidth={6}
                strokeLinecap="round"
              />
            )}
            {grown && (
              <path
                d={toPath(subCubic(curve, seg.prevProgress, Math.min(1, seg.progress)))}
                pathLength={1}
                stroke="var(--world-600)"
                strokeWidth={6}
                strokeLinecap="round"
                className="pw-draw"
                style={{ '--fx-dur': `${DRAW_MS}ms`, '--at': '0ms' } as React.CSSProperties}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------------------------
// Shared, static navigation data. Built once: the world list never changes at runtime. Home, Map, World Detail
// and the shell all need the same stubs for the unlock engine, without downloading any world chunk.
// ---------------------------------------------------------------------------------------------

export const WORLD_STUBS: World[] = WORLD_METAS.map((wm) => ({
  id: wm.id,
  track: wm.track,
  order: wm.order,
  title: wm.title,
  tagline: wm.tagline,
  color: wm.color,
  illustration: wm.illustration,
  sourceChapters: [],
  requires: wm.requires,
  lessons: wm.lessons.map((l) => l.id),
  sideQuests: wm.sideQuests.map((l) => l.id),
  boss: {
    title: wm.guardianName,
    greeting: wm.tagline,
    guardianName: wm.guardianName,
    junior: { count: 8, pool: 'world' },
    pro: { count: 12, pool: 'world' },
    passRatio: 0.8,
  },
  anchors: { junior: [], pro: [] },
}));

export const LESSON_STUBS: Record<string, Lesson> = (() => {
  const out: Record<string, Lesson> = {};
  for (const wm of WORLD_METAS) {
    for (const lm of [...wm.lessons, ...wm.sideQuests]) {
      out[lm.id] = {
        id: lm.id,
        worldId: lm.worldId,
        title: lm.title,
        modes: lm.modes,
        isSideQuest: lm.isSideQuest,
        objective: { pro: '' },
        estMinutes: lm.estMinutes,
        introducesTerms: [],
        usesTerms: [],
        stickerId: lm.stickerId,
        steps: [],
        reviewCards: [],
        recap: { pro: '' },
      };
    }
  }
  return out;
})();

/**
 * How much of a world's stretch of path is completed: its visible lessons plus the guardian. `count` is the number in
 * the seen.ts key `path:{worldId}:{count}`.
 */
export function getPathCount(meta: WorldMeta, profile: Profile): { count: number; total: number } {
  const visible = meta.lessons.filter((l) => l.modes.includes(profile.mode));
  const done = visible.filter((l) => Boolean(profile.lessons[l.id]?.completedAt)).length;
  const passed = profile.bosses[meta.id]?.passed ? 1 : 0;
  return { count: done + passed, total: visible.length + 1 };
}

export const pathSeenKey = (worldId: string, count: number) => `path:${worldId}:${count}`;
