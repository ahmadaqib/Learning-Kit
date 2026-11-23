import React, { useId } from 'react';

/**
 * Bito's marker-pen doodles: twelve original inline-SVG strokes (spec 4.7).
 *
 * - Stroke 2.5 to 3 px, round caps and joins, `currentColor` (default `var(--doodle)`), no fill.
 * - Each stroke has pathLength="1", so drawing in is stroke-dashoffset 1 to 0 (`.pw-draw` in motion.css).
 *   The exception is `dash-path`, whose visible path is dashed: it is drawn in through a mask instead.
 * - Always aria-hidden and pointer-events: none.
 * - Doodles are drawn already. They animate only when `draw` is set: first-run guidance, inside a
 *   celebration, and the correct tick (spec 5.9.4 M05).
 * - Rules for callers: at most two per screen in Junior, one in Pro (only underline, arrow and check), anchored to a
 *   real element and never over text.
 */

export type DoodleName =
  | 'underline'
  | 'scribble'
  | 'circle'
  | 'arrow'
  | 'arrow-loop'
  | 'spark'
  | 'rays'
  | 'check'
  | 'curl'
  | 'sprout'
  | 'flag'
  | 'dash-path';

/** The three doodles that Pro may use. */
export const PRO_DOODLES: readonly DoodleName[] = ['underline', 'arrow', 'check'];

interface Stroke {
  d: string;
  /** Start offset inside the doodle, Junior ms. */
  at?: number;
  /** Draw duration, Junior ms. Defaults to the class default (400). */
  dur?: number;
}

interface DoodleDef {
  w: number;
  h: number;
  /** Default rendered width in px. */
  width: number;
  strokes: Stroke[];
}

/** Seven strokes fanning out from the bottom centre. Deterministic, slightly irregular lengths. */
function raysStrokes(): Stroke[] {
  const angles = [-78, -52, -26, 0, 26, 52, 78];
  const outer = [50, 56, 52, 58, 52, 56, 50];
  // Centre three first, then the next two, then the outermost two: "three groups 20 ms apart"
  const group = [2, 1, 0, 0, 0, 1, 2];
  return angles.map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const cx = 60;
    const cy = 66;
    const x1 = cx + Math.sin(rad) * 30;
    const y1 = cy - Math.cos(rad) * 30;
    const x2 = cx + Math.sin(rad) * outer[i];
    const y2 = cy - Math.cos(rad) * outer[i];
    return {
      d: `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`,
      at: group[i] * 20,
      dur: 280,
    };
  });
}

const DEFS: Record<DoodleName, DoodleDef> = {
  underline: {
    w: 120,
    h: 14,
    width: 120,
    strokes: [{ d: 'M3 9 C18 3 30 12 48 7 S80 3 96 9 S111 7 117 5' }],
  },
  scribble: {
    w: 120,
    h: 24,
    width: 120,
    strokes: [{ d: 'M5 7 C40 3 80 5 114 4 C86 9 40 10 8 13 C45 11 85 13 112 15 C80 19 40 19 14 21', dur: 520 }],
  },
  circle: {
    w: 100,
    h: 70,
    width: 100,
    strokes: [{ d: 'M50 8 C20 6 5 28 10 45 C15 62 45 67 68 60 C92 53 98 30 85 17 C74 7 52 3 34 10', dur: 480 }],
  },
  arrow: {
    w: 80,
    h: 60,
    width: 80,
    strokes: [
      { d: 'M6 12 C24 5 52 14 66 44', dur: 320 },
      { d: 'M52 40 L67 46 L71 30', at: 260, dur: 160 },
    ],
  },
  'arrow-loop': {
    w: 110,
    h: 70,
    width: 110,
    strokes: [
      { d: 'M6 54 C24 56 36 38 25 29 C16 22 8 33 19 41 C36 53 70 55 93 27', dur: 460 },
      { d: 'M80 24 L94 25 L89 40', at: 380, dur: 160 },
    ],
  },
  spark: {
    w: 40,
    h: 40,
    width: 28,
    strokes: [
      { d: 'M20 3 L20.5 12', dur: 200 },
      { d: 'M20 28 L19.5 37', at: 30, dur: 200 },
      { d: 'M3 20 L12 19.5', at: 60, dur: 200 },
      { d: 'M28 20.5 L37 20', at: 90, dur: 200 },
    ],
  },
  rays: {
    w: 120,
    h: 70,
    width: 120,
    strokes: raysStrokes(),
  },
  check: {
    w: 40,
    h: 40,
    width: 24,
    strokes: [{ d: 'M6 22 C11 26 14 30 17 34 C22 22 28 14 35 7', dur: 200 }],
  },
  curl: {
    w: 40,
    h: 50,
    width: 32,
    strokes: [
      { d: 'M9 16 C9 6 30 5 30 16 C30 26 20 27 20 36', dur: 360 },
      { d: 'M20 44 L20.3 44.4', at: 300, dur: 80 },
    ],
  },
  sprout: {
    w: 50,
    h: 60,
    width: 40,
    strokes: [
      { d: 'M25 56 C25 44 24 32 26 20', dur: 300 },
      { d: 'M26 30 C14 30 8 22 8 12 C20 12 26 20 26 30', at: 200, dur: 260 },
      { d: 'M26 22 C30 12 38 8 44 8 C44 18 36 24 26 22', at: 260, dur: 260 },
    ],
  },
  flag: {
    w: 40,
    h: 50,
    width: 32,
    strokes: [
      { d: 'M10 46 L10 6', dur: 240 },
      { d: 'M10 7 C18 4 24 12 34 8 C32 16 32 20 34 26 C24 30 18 22 10 26', at: 180, dur: 320 },
    ],
  },
  'dash-path': {
    w: 120,
    h: 40,
    width: 120,
    strokes: [{ d: 'M4 30 C30 8 60 36 116 10', dur: 400 }],
  },
};

export interface DoodleProps {
  name: DoodleName;
  /** Draw the strokes in (stroke-dashoffset 1 to 0). Default false: the doodle is shown already drawn. */
  draw?: boolean;
  /** Start time inside a sequence, Junior ms. Scaled by the motion scale in CSS. */
  at?: number;
  /** Rendered width. A number is px. Height follows the aspect ratio. */
  width?: number | string;
  /** Degrees. Used by `arrow` to point somewhere else. */
  rotate?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Doodle: React.FC<DoodleProps> = ({
  name,
  draw = false,
  at = 0,
  width,
  rotate,
  strokeWidth = 2.75,
  className = '',
  style,
}) => {
  const def = DEFS[name];
  const maskId = `pw-doodle-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const dashed = name === 'dash-path';

  const svgStyle: React.CSSProperties = {
    color: 'var(--doodle)',
    width: width ?? def.width,
    height: 'auto',
    overflow: 'visible',
    pointerEvents: 'none',
    flexShrink: 0,
    ...(rotate ? { rotate: `${rotate}deg` } : null),
    ...style,
  };

  const strokeProps = (stroke: Stroke) =>
    draw
      ? {
          className: 'pw-draw',
          style: {
            '--at': `${at + (stroke.at ?? 0)}ms`,
            ...(stroke.dur ? { '--fx-dur': `${stroke.dur}ms` } : null),
          } as React.CSSProperties,
        }
      : {};

  return (
    <svg
      viewBox={`0 0 ${def.w} ${def.h}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={svgStyle}
    >
      {dashed ? (
        <>
          {draw && (
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={def.w} height={def.h}>
              {def.strokes.map((stroke, i) => (
                <path
                  key={i}
                  d={stroke.d}
                  pathLength={1}
                  stroke="white"
                  strokeWidth={strokeWidth * 3}
                  {...strokeProps(stroke)}
                />
              ))}
            </mask>
          )}
          {def.strokes.map((stroke, i) => (
            <path
              key={i}
              d={stroke.d}
              strokeDasharray="6 7"
              mask={draw ? `url(#${maskId})` : undefined}
            />
          ))}
        </>
      ) : (
        def.strokes.map((stroke, i) => (
          <path key={i} d={stroke.d} pathLength={1} {...strokeProps(stroke)} />
        ))
      )}
    </svg>
  );
};
