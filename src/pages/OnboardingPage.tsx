import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BookOpen, Check, Code2, Sparkles, Target, Users, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Mode } from '@/content/schema';
import { MODE_CHOICE_LABEL } from '@/app/modeConfig';
import { Bito } from '@/components/mascot/Bito';
import { AVATAR_LIST, CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { Doodle } from '@/components/fx/Doodle';
import { KineticText } from '@/components/fx/KineticText';
import { Button } from '@/components/ui/Button';
import { markUserInteraction, playSound } from '@/engine/sound';
import { stickerTilt } from '@/motion/tokens';
import { runSequence } from '@/motion/waapi';
import { useAppStore } from '@/store/useAppStore';

/**
 * The two mode cards preview their own skin (spec 8.7). The page has no `data-mode` yet, so each card re-declares
 * the radius and spacing tokens of its mode on itself. The values mirror tokens.css (spec 4.5).
 */
const JUNIOR_SKIN = {
  '--radius-xs': '8px',
  '--radius-sm': '12px',
  '--radius-md': '18px',
  '--radius-lg': '26px',
  '--radius-xl': '34px',
  '--space-card': '20px',
  '--gap-stack': '16px',
} as React.CSSProperties;

const PRO_SKIN = {
  '--radius-xs': '6px',
  '--radius-sm': '10px',
  '--radius-md': '14px',
  '--radius-lg': '20px',
  '--radius-xl': '28px',
  '--space-card': '16px',
  '--gap-stack': '12px',
} as React.CSSProperties;

/** Avatar pick (M43): the pick grows and takes its tilt in 200 ms, the others flatten in 140 ms. */
const PICK_ON =
  'transform 120ms var(--ease-out), scale 200ms var(--ease-pop), rotate 200ms var(--ease-pop), background-color 140ms ease, border-color 140ms ease';
const PICK_OFF =
  'transform 120ms var(--ease-out), scale 140ms var(--ease-out), rotate 140ms var(--ease-out), background-color 140ms ease, border-color 140ms ease';

/** The three stops sit on the dash-path doodle (viewBox 120 x 40, curve M4 30 C30 8 60 36 116 10). */
const STOPS = [
  { left: '3.3%', top: '75%' },
  { left: '40.6%', top: '53.8%' },
  { left: '96.7%', top: '25%' },
] as const;

const setAt = (ms: number, dur?: number) =>
  ({
    '--at': `${ms}ms`,
    ...(dur ? { '--fx-dur': `${dur}ms` } : null),
  }) as React.CSSProperties;

const STEP_NAMES = ['Kenalan', 'Nama dan avatar', 'Gaya belajar'] as const;

const StepStops: React.FC<{ step: 1 | 2 | 3 }> = ({ step }) => {
  const stepLabel = `Langkah ${step} dari 3 · ${STEP_NAMES[step - 1]}`;
  return (
    <div className="flex flex-col items-center">
      <ol aria-label={stepLabel} className="relative isolate mt-2 aspect-[3/1] w-44 list-none p-0">
        <Doodle name="dash-path" width="100%" className="absolute inset-0 -z-10" />
        {STOPS.map((pos, i) => {
          const n = i + 1;
          const current = n === step;
          const done = n < step;
          const tone = current
            ? 'border-[var(--world-700)] bg-[var(--world-600)] text-[var(--world-btn-text)] shadow-[var(--elev-sticker)]'
            : done
              ? 'border-[var(--world-600)] bg-[var(--world-50)] text-[var(--world-700)]'
              : 'border-[var(--line-strong)] bg-[var(--paper)] text-[var(--ink-3)]';
          return (
            <li
              key={n}
              aria-current={current ? 'step' : undefined}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.left, top: pos.top }}
            >
              <span
                className={`pw-t-colors grid h-8 w-8 place-items-center rounded-full border-2 text-sm font-extrabold ${tone}`}
              >
                {done ? (
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{n}</span>
                )}
              </span>
              <span className="visually-hidden">
                Langkah {n}
                {done ? ', selesai' : current ? ', sekarang' : ''}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="pw-small mt-2 text-center text-[var(--ink-2)]" aria-hidden="true">
        {stepLabel}
      </p>
    </div>
  );
};

interface ModeLine {
  icon: React.ElementType;
  text: string;
}

const JUNIOR_LINES: ModeLine[] = [
  { icon: BookOpen, text: 'Cerita dan gambar di tiap pelajaran' },
  { icon: Volume2, text: 'Semua bisa dibacakan' },
  { icon: Users, text: 'Boleh ditemani kakak atau orang tua' },
];

const PRO_LINES: ModeLine[] = [
  { icon: Code2, text: 'Istilah dan kode yang dipakai di dunia kerja' },
  { icon: Target, text: 'Untuk remaja dan dewasa' },
  { icon: Sparkles, text: 'Langsung ke inti' },
];

/** Spans only: the card is a <button>, which may hold phrasing content only. */
const ModeLines: React.FC<{ lines: ModeLine[]; id: string }> = ({ lines, id }) => (
  <span id={id} className="mt-[var(--gap-stack)] block space-y-2">
    {lines.map(({ icon: Icon, text }) => (
      <span key={text} className="pw-small flex items-start gap-2.5 text-[var(--ink)]">
        <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--world-700)]" aria-hidden="true" />
        <span>{text}</span>
      </span>
    ))}
  </span>
);

const SelectedTag: React.FC = () => (
  <span className="pw-small inline-flex items-center gap-1 rounded-full bg-[var(--world-600)] px-2.5 py-0.5 font-extrabold text-[var(--world-btn-text)]">
    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
    Dipilih
  </span>
);

const modeCardClass = (selected: boolean) =>
  `pw-card pw-pressable pw-t-colors relative block w-full cursor-pointer border-2 p-[var(--space-card)] text-left ${
    selected
      ? 'border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_4px_0_var(--world-700)]'
      : 'border-[var(--line)] bg-[var(--paper)]'
  }`;

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const createProfile = useAppStore((s) => s.createProfile);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('kurir');
  const [mode, setMode] = useState<Mode>('junior');
  const [weeklyTarget, setWeeklyTarget] = useState<2 | 3 | 5>(3);
  const [waving, setWaving] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  /** The first-run choreography (5.9.5 H) plays once: coming back to step 1 shows it at rest. */
  const firstRun = useRef(true);
  const intro = step === 1 && firstRun.current;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!intro || !root) return undefined;
    // Bito waves from 200 ms. A tap or Enter anywhere on step 1 skips the rest and still presses the button.
    const handle = runSequence(root, [{ at: 200, run: () => setWaving(true) }]);
    return () => {
      handle.cancel();
      delete root.dataset.seq;
    };
  }, [intro]);

  useEffect(() => {
    if (step !== 1) firstRun.current = false;
  }, [step]);

  const handleSelectWithFeedback = (apply: () => void) => {
    markUserInteraction();
    playSound('tap', true);
    apply();
  };

  const handleFinish = () => {
    markUserInteraction();
    playSound('star', true);
    const cleanName = nickname.trim().slice(0, 12) || (mode === 'junior' ? 'Raka' : 'Nadia');
    const createdId = createProfile({
      nickname: cleanName,
      avatar,
      mode,
      weeklyTarget,
    });
    if (createdId) {
      // Petualang reads aloud by default (spec 8.5). The new profile is already the active one.
      if (mode === 'junior') updateSettings({ autoReadAloud: true });
      navigate('/beranda', { replace: true });
    }
  };

  return (
    <div
      ref={rootRef}
      className={`mx-auto flex min-h-[calc(100dvh-64px)] max-w-[560px] flex-col justify-between px-[var(--screen-pad,1.25rem)] py-6 ${
        intro ? 'pw-seq' : ''
      }`}
    >
      <StepStops step={step} />

      {step === 1 && (
        <div className="my-auto flex flex-col items-center space-y-4 pb-10 pt-6 text-center">
          <div
            className={intro ? 'pw-enter' : undefined}
            data-enter={intro ? 'pop' : undefined}
            style={intro ? setAt(0, 320) : undefined}
          >
            <Bito expression={waving ? 'wave' : 'idle'} size={160} idle />
          </div>
          {intro ? (
            <KineticText as="h1" text="Halo! Aku Bito." className="pw-display" at={80} boil />
          ) : (
            <h1 className="pw-display">Halo! Aku Bito.</h1>
          )}
          <p
            className={`pw-body-l pw-prose text-[var(--ink-2)] ${intro ? 'pw-fx-rise' : ''}`}
            style={intro ? setAt(160) : undefined}
          >
            Aku robot pengantar pesan. Yuk, kita jelajahi cara kerja web.
          </p>
        </div>
      )}

      {step === 2 && (
        <div
          key="step-2"
          className="pw-enter my-auto space-y-[var(--gap-group)] py-4"
          data-enter="right"
          data-rm="fade"
        >
          <div className="text-center">
            <h1 className="pw-h1">Siapa namamu?</h1>
            <p className="pw-small mt-1 text-[var(--ink-2)]">
              Hanya disimpan di perangkat ini (paling banyak 12 huruf).
            </p>
          </div>

          <div>
            <label htmlFor="nickname-input" className="pw-small mb-1.5 block font-bold">
              Nama panggilan
            </label>
            <input
              id="nickname-input"
              type="text"
              maxLength={12}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nama panggilan"
              autoFocus
              className="pw-t-colors min-h-[var(--touch-min)] w-full rounded-[var(--radius-md)] border-2 border-[var(--line-strong)] bg-[var(--paper)] px-4 py-3 font-bold text-[var(--ink)] focus:border-[var(--world-600)]"
            />
          </div>

          <div>
            <span id="avatar-label" className="pw-small mb-2.5 block font-bold">
              Pilih avatarmu
            </span>
            <div
              role="group"
              aria-labelledby="avatar-label"
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {AVATAR_LIST.map((item, i) => {
                const selected = avatar === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectWithFeedback(() => setAvatar(item.id))}
                    aria-label={`${item.label} — ${item.subtitle}`}
                    aria-pressed={selected}
                    data-press="lg"
                    className={`pw-pressable relative flex min-h-[112px] cursor-pointer flex-col items-center justify-center gap-2 border-2 p-2.5 text-center ${
                      selected
                        ? 'pw-sticker border-[var(--world-600)] bg-[var(--world-50)]'
                        : 'pw-card border-[var(--line)] bg-[var(--paper)]'
                    }`}
                    style={
                      {
                        '--tilt': `${stickerTilt(i)}deg`,
                        rotate: selected ? undefined : '0deg',
                        scale: selected ? '1.06' : '1',
                        transition: selected ? PICK_ON : PICK_OFF,
                      } as React.CSSProperties
                    }
                  >
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--world-600)] text-[var(--world-btn-text)]"
                      >
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </span>
                    )}
                    <CharacterAvatar avatarId={item.id} size={56} />
                    <span className="pw-small font-extrabold leading-tight text-[var(--ink)]">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div
          key="step-3"
          className="pw-enter my-auto space-y-[var(--gap-group)] py-4"
          data-enter="right"
          data-rm="fade"
        >
          <div className="text-center">
            <h1 className="pw-h1">Pilih gaya belajarmu</h1>
          </div>

          <div className="grid gap-[var(--gap-stack)]">
            {/* Petualang: the soft radius, a doodle, a handwritten note and the "Dengar" pill */}
            <button
              type="button"
              onClick={() => handleSelectWithFeedback(() => setMode('junior'))}
              aria-pressed={mode === 'junior'}
              aria-labelledby="mode-junior-title"
              aria-describedby="mode-junior-lines"
              data-press="lg"
              style={JUNIOR_SKIN}
              className={modeCardClass(mode === 'junior')}
            >
              <span className="flex items-start justify-between gap-2">
                <span id="mode-junior-title" className="pw-h3">
                  {MODE_CHOICE_LABEL.junior}
                </span>
                {mode === 'junior' && <SelectedTag />}
              </span>
              <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="pw-hand" aria-hidden="true">
                  banyak gambar dan cerita
                </span>
                <span
                  aria-hidden="true"
                  className="pw-small inline-flex items-center gap-1 rounded-full border-2 border-[var(--world-600)] bg-[var(--paper)] px-2.5 py-0.5 font-bold text-[var(--world-700)]"
                >
                  <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Dengar
                </span>
                <Doodle name="spark" width={26} />
              </span>
              <ModeLines lines={JUNIOR_LINES} id="mode-junior-lines" />
            </button>

            {/* Pro: Pro radius and the code-comment skin, with a static code and result pair */}
            <button
              type="button"
              onClick={() => handleSelectWithFeedback(() => setMode('pro'))}
              aria-pressed={mode === 'pro'}
              aria-labelledby="mode-pro-title mode-pro-note"
              aria-describedby="mode-pro-lines"
              data-press="lg"
              style={PRO_SKIN}
              className={modeCardClass(mode === 'pro')}
            >
              <span className="flex items-start justify-between gap-2">
                <span id="mode-pro-title" className="pw-h3">
                  Pro
                </span>
                {mode === 'pro' && <SelectedTag />}
              </span>
              <span className="mt-1 block font-mono text-[0.8125rem] leading-snug text-[var(--ink-3)]">
                <span aria-hidden="true">// </span>
                <span id="mode-pro-note">mulai dari nol</span>
              </span>
              <span aria-hidden="true" className="mt-[var(--gap-stack)] grid grid-cols-[1.4fr_1fr] gap-2">
                <span className="pw-boss pw-code block overflow-hidden rounded-[var(--radius-md)] p-3 text-xs leading-relaxed">
                  <span className="block whitespace-nowrap">
                    <span className="text-[var(--star)]">&lt;h1&gt;</span>
                    <span>Halo</span>
                    <span className="text-[var(--star)]">&lt;/h1&gt;</span>
                  </span>
                  <span className="block whitespace-nowrap">
                    <span className="text-[var(--star)]">&lt;p&gt;</span>
                    <span>Belajar web</span>
                    <span className="text-[var(--star)]">&lt;/p&gt;</span>
                  </span>
                  <span className="block whitespace-nowrap">
                    <span className="text-[var(--star)]">&lt;button&gt;</span>
                    <span>Mulai</span>
                    <span className="text-[var(--star)]">&lt;/button&gt;</span>
                  </span>
                </span>
                <span className="flex flex-col justify-center gap-1 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--paper)] p-3">
                  <span className="text-base font-extrabold leading-tight text-[var(--ink)]">Halo</span>
                  <span className="text-xs text-[var(--ink-2)]">Belajar web</span>
                  <span className="mt-1 w-fit rounded-[var(--radius-xs)] bg-[var(--world-600)] px-2 py-0.5 text-xs font-bold text-[var(--world-btn-text)]">
                    Mulai
                  </span>
                </span>
              </span>
              <ModeLines lines={PRO_LINES} id="mode-pro-lines" />
            </button>
            <p className="pw-small text-[var(--ink-2)]">
              Tanda <span className="pw-code font-bold">//</span> adalah catatan di dalam kode. Kamu akan
              sering melihatnya.
            </p>
          </div>

          <p className="pw-small text-[var(--ink-2)]">Bisa diganti kapan saja di Pengaturan.</p>

          <div>
            <span id="target-label" className="pw-small mb-2 block font-bold">
              Target hari belajar tiap minggu
            </span>
            <div role="group" aria-labelledby="target-label" className="grid grid-cols-3 gap-2.5">
              {([2, 3, 5] as const).map((days) => {
                const selected = weeklyTarget === days;
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => handleSelectWithFeedback(() => setWeeklyTarget(days))}
                    aria-pressed={selected}
                    className={`pw-pressable pw-t-colors min-h-[var(--touch-min)] cursor-pointer rounded-[var(--radius-md)] border-2 font-extrabold ${
                      selected
                        ? 'border-[var(--world-600)] bg-[var(--world-50)] text-[var(--world-700)] shadow-[0_3px_0_var(--world-700)]'
                        : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] shadow-[0_2px_0_var(--line)]'
                    }`}
                  >
                    {days} hari
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="pw-safe-bottom sticky bottom-0 -mx-[var(--screen-pad,1.25rem)] space-y-2 bg-[var(--surface-page)] px-[var(--screen-pad,1.25rem)] pt-3">
        {step < 3 ? (
          <Button variant="primary" fullWidth soundEnabled onClick={() => setStep((step + 1) as 2 | 3)}>
            {step === 1 ? 'Ayo mulai' : 'Lanjut →'}
          </Button>
        ) : (
          <Button variant="primary" fullWidth soundEnabled onClick={handleFinish}>
            Masuk ke petualangan →
          </Button>
        )}
        {step > 1 && (
          <Button variant="ghost" fullWidth soundEnabled data-sfx="back" onClick={() => setStep((step - 1) as 1 | 2)}>
            ← Kembali
          </Button>
        )}
      </div>
    </div>
  );
};
