import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { MascotCustom } from '@/content/schema';
import { useMotionPrefs } from '@/motion/prefs';
import { EASE } from '@/motion/tokens';
import { fx } from '@/motion/waapi';

export type BitoExpression = 'idle' | 'happy' | 'think' | 'cheer' | 'wave' | 'sleep' | 'wow';

type BitoReaction = 'wave' | 'happy' | 'cheer' | 'think' | 'wow' | 'spin' | 'bounce';

interface BitoProps {
  expression?: BitoExpression;
  size?: 40 | 48 | 56 | 72 | 96 | 112 | 128 | 160;
  custom?: MascotCustom;
  /** With `pokeable` the class goes on the button that wraps Bito, so layout classes such as `mx-auto` still work. */
  className?: string;
  decorative?: boolean;
  /** Blink and antenna sway while idle (M44): first blink at 2.5 s, then every 6 s, four cycles. Any pointer or key event stops it. Default false. */
  idle?: boolean;
  /** Play the one-shot reaction on mount and when `expression` changes (M45). Default true. Pass false inside the FeedbackSheet. */
  react?: boolean;
  /** Render inside a button and play M47 on tap (Junior). Default false. */
  pokeable?: boolean;
  /** Called when a poke starts a reaction; the page uses it to play the `bip` sound. Taps during a reaction are ignored. */
  onPoke?: () => void;
}

/** The only place for Bito's brand colours. `custom.color` is content, not theme. */
export const BITO_COLORS = [
  { id: '#E4572E', label: 'Oranye Kurir' },
  { id: '#2F6FED', label: 'Biru Bengkel' },
  { id: '#2BA84A', label: 'Hijau Hutan' },
  { id: '#6C5CE7', label: 'Ungu Studio' },
  { id: '#0E9AA7', label: 'Toska Pulau' },
  { id: '#D6336C', label: 'Merah Muda Galeri' },
] as const;

const DEFAULT_CUSTOM: MascotCustom = { color: BITO_COLORS[0].id, accessory: 'none' };

/** Expressions that have a one-shot reaction in motion.css. `idle` and `sleep` have none. */
const EXPRESSION_REACTION: Partial<Record<BitoExpression, BitoReaction>> = {
  wave: 'wave',
  happy: 'happy',
  cheer: 'cheer',
  think: 'think',
  wow: 'wow',
};

/** M47: a fixed order, not random. */
const POKE_ORDER: ReadonlyArray<{ reaction: BitoReaction; face: BitoExpression }> = [
  { reaction: 'happy', face: 'happy' },
  { reaction: 'spin', face: 'happy' },
  { reaction: 'bounce', face: 'happy' },
  { reaction: 'wow', face: 'wow' },
];

/** The reaction lasts at most 900 ms (Junior). If animationend never arrives (a hidden tab), this clears it. */
const REACTION_FALLBACK_MS = 1600;

const EYE = 'var(--bito-eye)';
const LINE = 'var(--bito-line)';

export const Bito: React.FC<BitoProps> = ({
  expression = 'idle',
  size = 96,
  custom = DEFAULT_CUSTOM,
  className = '',
  decorative = true,
  idle = false,
  react = true,
  pokeable = false,
  onPoke,
}) => {
  const prefs = useMotionPrefs();
  const accent = custom.color || BITO_COLORS[0].id;
  const rootRef = useRef<SVGSVGElement>(null);
  const [reaction, setReaction] = useState<BitoReaction | null>(null);
  const [pokeFace, setPokeFace] = useState<BitoExpression | null>(null);
  const [idleStopped, setIdleStopped] = useState(false);
  const pokeCount = useRef(0);
  const motionOk = !prefs.reduced;
  const face: BitoExpression = pokeFace ?? expression;

  // One-shot reaction (M45): on mount and whenever the expression changes. Not played under reduced motion.
  useEffect(() => {
    if (!react || !motionOk) return;
    const next = EXPRESSION_REACTION[expression];
    if (next) setReaction(next);
  }, [expression, react, motionOk]);

  // Safety net: clear a reaction whose animationend never fired.
  useEffect(() => {
    if (!reaction) return undefined;
    const t = setTimeout(() => {
      setReaction(null);
      setPokeFace(null);
    }, REACTION_FALLBACK_MS);
    return () => clearTimeout(t);
  }, [reaction]);

  // Idle (M44) stops at the first pointer or key event.
  useEffect(() => {
    if (!idle || idleStopped) return undefined;
    const stop = () => setIdleStopped(true);
    window.addEventListener('pointerdown', stop, { once: true });
    window.addEventListener('keydown', stop, { once: true });
    return () => {
      window.removeEventListener('pointerdown', stop);
      window.removeEventListener('keydown', stop);
    };
  }, [idle, idleStopped]);

  // Thinking dots appear one by one above the antenna (5.7). WAAPI one-off, nothing when reduced.
  useEffect(() => {
    if (face !== 'think' || !react) return;
    rootRef.current?.querySelectorAll('.bito-think-dot').forEach((dot, i) => {
      fx(
        dot,
        [
          { opacity: 0, transform: 'scale(0.9)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 180, delay: 120 + i * 80, easing: EASE.out },
      );
    });
  }, [face, react]);

  // A small "z" rises and fades in Junior while Bito sleeps (5.7).
  useEffect(() => {
    if (face !== 'sleep' || prefs.mode !== 'junior') return;
    const z = rootRef.current?.querySelector('.bito-z');
    if (!z) return;
    const anim = fx(
      z,
      [
        { opacity: 0, transform: 'translateY(0)' },
        { opacity: 1, transform: 'translateY(-3px)', offset: 0.3 },
        { opacity: 0, transform: 'translateY(-9px)' },
      ],
      { duration: 2400, easing: EASE.out },
    );
    anim?.effect?.updateTiming({ iterations: 3 });
    return () => anim?.cancel();
  }, [face, prefs.mode]);

  const onRootAnimationEnd = useCallback((e: React.AnimationEvent<SVGSVGElement>) => {
    if (e.target !== e.currentTarget) return;
    setReaction(null);
    setPokeFace(null);
  }, []);

  const poke = () => {
    if (reaction) return; // taps during a reaction are ignored
    const step = POKE_ORDER[pokeCount.current % POKE_ORDER.length];
    pokeCount.current += 1;
    onPoke?.();
    setPokeFace(step.face);
    if (motionOk) {
      setReaction(step.reaction);
    } else {
      // Reduced motion: the face swaps and rests again, the sound still plays.
      window.setTimeout(() => setPokeFace(null), 900);
    }
  };

  const renderEyes = () => {
    if (face === 'happy' || face === 'cheer') {
      return (
        <>
          <path d="M36 47 C38 43, 43 43, 45 47" stroke={EYE} strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M55 47 C57 43, 62 43, 64 47" stroke={EYE} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (face === 'sleep') {
      return (
        <>
          <path d="M36 47 H44" stroke={EYE} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <path d="M56 47 H64" stroke={EYE} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        </>
      );
    }
    if (face === 'think') {
      return (
        <>
          <circle cx="41" cy="46" r="3.5" fill={EYE} />
          <circle cx="60" cy="44" r="2.5" fill={EYE} />
        </>
      );
    }
    if (face === 'wow') {
      return (
        <>
          <circle cx="40.5" cy="46" r="4.6" fill={EYE} />
          <circle cx="59.5" cy="46" r="4.6" fill={EYE} />
        </>
      );
    }
    return (
      <>
        <circle cx="40.5" cy="46.5" r="3.6" fill={EYE} />
        <circle cx="59.5" cy="46.5" r="3.6" fill={EYE} />
      </>
    );
  };

  const renderMouth = () => {
    switch (face) {
      case 'happy':
      case 'cheer':
        return <path d="M40 62 Q50 70 60 62" stroke={LINE} strokeWidth="3" strokeLinecap="round" fill="none" />;
      case 'think':
        return <path d="M44 64 Q50 61 56 64" stroke={LINE} strokeWidth="2.8" strokeLinecap="round" fill="none" />;
      case 'sleep':
        return <circle cx="50" cy="64" r="3" fill={LINE} />;
      case 'wow':
        return <ellipse cx="50" cy="64.5" rx="3.2" ry="3.8" fill={LINE} />;
      default:
        return <path d="M42 62 Q50 67 58 62" stroke={LINE} strokeWidth="2.8" strokeLinecap="round" fill="none" />;
    }
  };

  const armsUpLeft = face === 'wave' || face === 'cheer';
  const armsUpRight = face === 'cheer';

  const ariaProps =
    decorative || pokeable
      ? { 'aria-hidden': true as const }
      : { role: 'img' as const, 'aria-label': `Maskot Bito berekspresi ${expression}` };

  const rootClass = [
    'bito',
    face === 'sleep' ? 'pw-fx-breathe' : '',
    pokeable ? '' : className,
  ]
    .filter(Boolean)
    .join(' ');

  const svg = (
    <svg
      ref={rootRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={rootClass}
      data-react={reaction ?? undefined}
      data-idle={idle && motionOk && !idleStopped ? 'on' : undefined}
      onAnimationEnd={onRootAnimationEnd}
      {...ariaProps}
    >
      {/* Antena kurir */}
      <g className="bito-antenna">
        <line x1="50" y1="12" x2="50" y2="23" stroke={LINE} strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="10" r="4.5" fill={EYE} stroke={LINE} strokeWidth="2" />
      </g>

      {/* Lengan melambai / ceria */}
      <g className="bito-arm-l">
        {armsUpLeft ? (
          <path d="M21 52 Q10 42 15 30" stroke={LINE} strokeWidth="4" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M21 55 Q13 58 14 66" stroke={LINE} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        )}
      </g>
      <g className="bito-arm-r">
        {armsUpRight ? (
          <path d="M79 52 Q90 42 85 30" stroke={LINE} strokeWidth="4" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M79 55 Q87 58 86 66" stroke={LINE} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        )}
      </g>

      {/* Badan kotak paket membulat, tali tas, layar wajah, kaki */}
      <g className="bito-body">
        <rect x="21" y="23" width="58" height="54" rx="15" fill="var(--bito-body)" stroke={LINE} strokeWidth="3" />
        <path d="M24 62 L76 34" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
        <rect x="30" y="34" width="40" height="22" rx="7" fill="var(--bito-screen)" />
        <rect x="34" y="77" width="10" height="9" rx="4" fill={LINE} />
        <rect x="56" y="77" width="10" height="9" rx="4" fill={LINE} />
      </g>

      <g className="bito-eyes">{renderEyes()}</g>
      <g>{renderMouth()}</g>

      {/* Aksesori kustom v1.1 */}
      {custom.accessory === 'cap' && (
        <g>
          <path d="M31 25 C31 15, 69 15, 69 25 Z" fill={accent} stroke={LINE} strokeWidth="2.4" />
          <path d="M26 25 H76" stroke={LINE} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {custom.accessory === 'glasses' && (
        <g>
          <rect x="33" y="40" width="14" height="11" rx="3" stroke="var(--on-boss)" strokeWidth="2.2" fill="none" />
          <rect x="53" y="40" width="14" height="11" rx="3" stroke="var(--on-boss)" strokeWidth="2.2" fill="none" />
          <line x1="47" y1="45" x2="53" y2="45" stroke="var(--on-boss)" strokeWidth="2.2" />
        </g>
      )}
      {custom.accessory === 'scarf' && (
        <g>
          <rect x="23" y="71" width="54" height="9" rx="4.5" fill={accent} stroke={LINE} strokeWidth="2" />
          <path d="M60 76 L67 89 L56 89 Z" fill={accent} stroke={LINE} strokeWidth="2" />
        </g>
      )}

      {/* Tiga titik berpikir, muncul satu per satu */}
      {face === 'think' && (
        <g>
          {[
            [64, 9, 1.8],
            [71, 5.5, 2.2],
            [79, 2.5, 2.7],
          ].map(([cx, cy, r], i) => (
            <circle
              key={i}
              className="bito-think-dot"
              cx={cx}
              cy={cy}
              r={r}
              fill={LINE}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}
        </g>
      )}

      {/* "z" kecil saat tidur (Junior) */}
      {face === 'sleep' && prefs.mode === 'junior' && (
        <text
          className="bito-z"
          x="74"
          y="18"
          fontSize="13"
          fontWeight="800"
          fill={LINE}
          opacity="0"
          style={{ fontFamily: 'var(--font-hand, inherit)' }}
        >
          z
        </text>
      )}
    </svg>
  );

  if (!pokeable) return svg;

  return (
    <button
      type="button"
      aria-label="Sapa Bito"
      onClick={poke}
      className={`pw-pressable inline-flex min-h-12 min-w-12 flex-shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-lg)] border-0 bg-transparent p-0 ${className}`.trim()}
    >
      {svg}
    </button>
  );
};
