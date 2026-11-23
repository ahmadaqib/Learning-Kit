import React, { useLayoutEffect, useState } from 'react';
import {
  BookOpenText,
  CalendarCheck,
  Check,
  Ear,
  Eye,
  Info,
  Lock,
  Rocket,
  ShieldCheck,
  SunMoon,
  Trash2,
  Type,
  Volume2,
  ZapOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COLLECTION_LABEL, MODE_CHOICE_LABEL, xpWord } from '@/app/modeConfig';
import type { Mode } from '@/content/schema';
import { hasIndonesianVoiceAvailable } from '@/engine/speech';
import { getReadingComfort, setReadingComfort } from '@/engine/readingComfort';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { CompanionGate } from '@/components/ui/CompanionGate';
import { DialogModal } from '@/components/ui/DialogModal';

/* ------------------------------------------------------------------ controls (M09) */

interface SegmentedOption<T extends string | number> {
  value: T;
  label: React.ReactNode;
}

/**
 * A segmented control. One pill slides under the options with a 160 ms transform transition and the text colours
 * change in 140 ms (M09). The options are plain buttons with aria-pressed: Tab, Enter and Space all work.
 */
function Segmented<T extends string | number>({
  labelledBy,
  options,
  value,
  onChange,
}: {
  labelledBy: string;
  options: ReadonlyArray<SegmentedOption<T>>;
  value: T;
  onChange: (value: T) => void;
}) {
  const count = options.length;
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className="relative grid rounded-[var(--radius-md)] bg-[var(--surface-well)] p-1"
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="pw-t-move absolute bottom-1 left-1 top-1 rounded-[var(--radius-sm)] bg-[var(--world-600)]"
        style={{ width: `calc((100% - 0.5rem) / ${count})`, transform: `translateX(${index * 100}%)` }}
      />
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(o.value)}
            className={`pw-t-colors relative z-10 min-h-[calc(var(--touch-min)-0.5rem)] cursor-pointer rounded-[var(--radius-sm)] px-2 text-center text-sm font-extrabold leading-tight ${
              selected ? 'text-[var(--world-btn-text)]' : 'text-[var(--ink-2)] hover:text-[var(--ink)]'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * A switch. The knob slides with a 160 ms transform transition and the track changes colour in 140 ms (M09).
 * The state is also written out ("Nyala", "Mati"), so it never relies on colour alone.
 */
const Switch: React.FC<{
  checked: boolean;
  onChange: (next: boolean) => void;
  labelledBy: string;
  describedBy?: string;
  disabled?: boolean;
  onText?: string;
  offText?: string;
}> = ({ checked, onChange, labelledBy, describedBy, disabled = false, onText = 'Nyala', offText = 'Mati' }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-labelledby={labelledBy}
    aria-describedby={describedBy}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className="inline-flex min-h-[var(--touch-min)] cursor-pointer items-center gap-3 rounded-full disabled:cursor-not-allowed disabled:opacity-60"
  >
    <span
      aria-hidden="true"
      className={`pw-t-colors relative inline-block h-8 w-14 flex-shrink-0 rounded-full border-2 ${
        checked
          ? 'border-[var(--world-600)] bg-[var(--world-600)]'
          : 'border-[var(--line-strong)] bg-[var(--surface-well)]'
      }`}
    >
      <span
        className="pw-t-move absolute left-0.5 top-0.5 h-6 w-6 rounded-full border border-[var(--line-strong)] bg-[var(--paper-raised)]"
        style={{ transform: `translateX(${checked ? '1.5rem' : '0rem'})` }}
      />
    </span>
    <span className="pw-small min-w-[5.5rem] text-left font-bold text-[var(--ink)]">{checked ? onText : offText}</span>
  </button>
);

/** One setting: an icon, a label, one line that says what it does, and its control. */
const Row: React.FC<{
  id: string;
  icon: React.ElementType;
  label: string;
  effect: React.ReactNode;
  control?: React.ReactNode;
  below?: React.ReactNode;
}> = ({ id, icon: Icon, label, effect, control, below }) => (
  <div className="py-4 first:pt-0 last:pb-0">
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex min-w-[14rem] flex-1 items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[var(--radius-sm)] bg-[var(--world-50)] text-[var(--world-700)]"
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p id={`${id}-label`} className="font-bold text-[var(--ink)]">
            {label}
          </p>
          <p id={`${id}-effect`} className="pw-small text-[var(--ink-2)]">
            {effect}
          </p>
        </div>
      </div>
      {control}
    </div>
    {below && <div className="mt-3">{below}</div>}
  </div>
);

const Group: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section aria-labelledby={`group-${id}`}>
    <h2 id={`group-${id}`} className="pw-h3 mb-2">
      {title}
    </h2>
    <div className="pw-card divide-y divide-[var(--line)] p-[var(--space-card)]">{children}</div>
  </section>
);

/* ------------------------------------------------------------------ theme previews */

interface ThemeSample {
  page: string;
  paper: string;
  ink: string;
  line: string;
  accent: string;
}

/**
 * Reads the real token values of one theme. The token blocks are declared on :root only, so the page flips
 * data-theme for a moment, reads the five custom properties and puts it back. Nothing is painted in between.
 */
const BLANK_SAMPLE: ThemeSample = { page: '', paper: '', ink: '', line: '', accent: '' };

function sampleTheme(theme: 'light' | 'dark'): ThemeSample {
  if (typeof document === 'undefined') return BLANK_SAMPLE;
  const root = document.documentElement;
  const previous = root.dataset.theme;
  root.dataset.theme = theme;
  const cs = getComputedStyle(root);
  const read = (name: string) => cs.getPropertyValue(name).trim();
  const sample: ThemeSample = {
    page: read('--surface-page'),
    paper: read('--paper'),
    ink: read('--ink'),
    line: read('--line'),
    accent: read('--world-600'),
  };
  if (previous === undefined) delete root.dataset.theme;
  else root.dataset.theme = previous;
  return sample;
}

const MiniCard: React.FC<{ sample: ThemeSample }> = ({ sample }) => (
  <span className="block h-full w-full p-2" style={{ backgroundColor: sample.page }}>
    <span
      className="block h-full rounded-[var(--radius-xs)] p-1.5"
      style={{ backgroundColor: sample.paper, border: `1px solid ${sample.line}` }}
    >
      <span className="block h-1.5 w-3/4 rounded-full" style={{ backgroundColor: sample.ink }} />
      <span className="mt-1.5 block h-1.5 w-1/2 rounded-full" style={{ backgroundColor: sample.line }} />
      <span className="mt-1.5 block h-2 w-1/3 rounded-full" style={{ backgroundColor: sample.accent }} />
    </span>
  </span>
);

/* ------------------------------------------------------------------ page */

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const updateProfileMode = useAppStore((s) => s.updateProfileMode);
  const resetActiveProfileData = useAppStore((s) => s.resetActiveProfileData);

  const [modeGateOpen, setModeGateOpen] = useState(false);
  const [deleteGateOpen, setDeleteGateOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [comfort, setComfort] = useState(() => (profile ? getReadingComfort(profile.id) : false));
  const [sampled, setSampled] = useState<{ light: ThemeSample; dark: ThemeSample } | null>(null);

  // Before the first paint: read both themes' real tokens for the three preview cards
  useLayoutEffect(() => {
    setSampled({ light: sampleTheme('light'), dark: sampleTheme('dark') });
  }, []);
  const themes = sampled ?? { light: BLANK_SAMPLE, dark: BLANK_SAMPLE };

  if (!profile) return null;

  const { settings, mode } = profile;
  const voiceAvailable = hasIndonesianVoiceAvailable();

  const changeComfort = (on: boolean) => {
    setReadingComfort(profile.id, on);
    setComfort(on);
  };

  // Takes effect at once: the root attribute is written here, AppShell keeps it in sync afterwards
  const changeReducedMotion = (on: boolean) => {
    const next = on ? 'always' : 'system';
    document.documentElement.dataset.reducedMotion = next;
    updateSettings({ reducedMotion: next });
  };

  const changeMode = (next: Mode) => {
    if (next === mode) return;
    if (next === 'pro') setModeGateOpen(true);
    else updateProfileMode(next);
  };

  const themeOptions = [
    { value: 'light' as const, label: 'Terang' },
    { value: 'dark' as const, label: 'Gelap' },
    { value: 'system' as const, label: 'Ikuti perangkat' },
  ];

  const unit = COLLECTION_LABEL[mode].unit;

  return (
    <div className="mx-auto max-w-[720px] space-y-[var(--gap-group)] px-4 py-6 sm:px-6">
      <h1 className="pw-h1">Pengaturan</h1>

      <Group id="tampilan" title="Tampilan">
        <Row
          id="theme"
          icon={SunMoon}
          label="Tema"
          effect="Pilih terang, gelap, atau ikuti perangkat."
          below={
            <div role="group" aria-labelledby="theme-label" className="grid grid-cols-3 gap-2">
              {themeOptions.map((o) => {
                const selected = settings.theme === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => updateSettings({ theme: o.value })}
                    className={`pw-pressable pw-t-colors cursor-pointer rounded-[var(--radius-md)] border-2 p-1.5 text-center ${
                      selected ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)] bg-[var(--paper)]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-14 overflow-hidden rounded-[var(--radius-sm)] border border-[var(--line)]"
                    >
                      {o.value === 'system' ? (
                        <>
                          <span className="block w-1/2 overflow-hidden">
                            <MiniCard sample={themes.light} />
                          </span>
                          <span className="block w-1/2 overflow-hidden">
                            <MiniCard sample={themes.dark} />
                          </span>
                        </>
                      ) : (
                        <MiniCard sample={themes[o.value]} />
                      )}
                    </span>
                    <span className="pw-small mt-1.5 flex items-center justify-center gap-1 font-bold text-[var(--ink)]">
                      {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />}
                      {o.label}
                    </span>
                  </button>
                );
              })}
            </div>
          }
        />

        <Row
          id="textsize"
          icon={Type}
          label="Ukuran teks"
          effect="Huruf di semua halaman jadi lebih besar atau lebih kecil."
          below={
            <Segmented
              labelledBy="textsize-label"
              value={settings.textScale}
              onChange={(v) => updateSettings({ textScale: v })}
              options={[
                { value: 100, label: <>Normal<span className="block text-xs font-bold">100%</span></> },
                { value: 115, label: <>Besar<span className="block text-xs font-bold">115%</span></> },
                { value: 130, label: <>Sangat besar<span className="block text-xs font-bold">130%</span></> },
              ]}
            />
          }
        />

        <Row
          id="comfort"
          icon={BookOpenText}
          label="Teks nyaman dibaca"
          effect="Huruf dan baris lebih renggang. Tanpa tulisan miring dan huruf bergerak."
          control={
            <Switch
              checked={comfort}
              onChange={changeComfort}
              labelledBy="comfort-label"
              describedBy="comfort-effect"
            />
          }
        />

        <Row
          id="motion"
          icon={ZapOff}
          label="Kurangi animasi"
          effect="Mematikan gerakan, konfeti, dan getar. Perubahan layar jadi pudar halus."
          control={
            <Switch
              checked={settings.reducedMotion === 'always'}
              onChange={changeReducedMotion}
              labelledBy="motion-label"
              describedBy="motion-effect"
              offText="Ikut perangkat"
            />
          }
        />
      </Group>

      <Group id="suara" title="Suara & Bacakan">
        <Row
          id="sound"
          icon={Volume2}
          label="Suara efek"
          effect="Bunyi lembut saat menjawab dan mendapat bintang."
          control={
            <Switch
              checked={settings.soundEnabled}
              onChange={(on) => updateSettings({ soundEnabled: on })}
              labelledBy="sound-label"
              describedBy="sound-effect"
            />
          }
        />

        <Row
          id="autoread"
          icon={Ear}
          label="Bacakan otomatis"
          effect="Bito membacakan cerita, soal, pilihan, dan penjelasan."
          control={
            <Switch
              checked={settings.autoReadAloud}
              onChange={(on) => updateSettings({ autoReadAloud: on })}
              labelledBy="autoread-label"
              describedBy="autoread-effect"
              disabled={!voiceAvailable && !settings.autoReadAloud}
            />
          }
          below={
            !voiceAvailable ? (
              <div className="pw-well flex items-start gap-2.5" role="note">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--ink-2)]" aria-hidden="true" />
                <p className="pw-small text-[var(--ink)]">
                  Perangkat ini belum punya suara Bahasa Indonesia. Pasang lewat pengaturan suara di perangkat,
                  lalu buka lagi halaman ini.
                </p>
              </div>
            ) : undefined
          }
        />
      </Group>

      <Group id="belajar" title="Belajar">
        <Row
          id="mode"
          icon={Rocket}
          label="Mode belajar"
          effect={
            <>
              Saat ini: <strong>{MODE_CHOICE_LABEL[mode]}</strong>. Progres tetap terbawa saat kamu pindah mode.
            </>
          }
          below={
            <Segmented
              labelledBy="mode-label"
              value={mode}
              onChange={changeMode}
              options={[
                { value: 'junior' as Mode, label: MODE_CHOICE_LABEL.junior },
                { value: 'pro' as Mode, label: MODE_CHOICE_LABEL.pro },
              ]}
            />
          }
        />

        <Row
          id="weekly"
          icon={CalendarCheck}
          label="Target mingguan"
          effect="Berapa hari kamu ingin belajar tiap minggu."
          below={
            <Segmented
              labelledBy="weekly-label"
              value={settings.weeklyTarget}
              onChange={(v) => updateSettings({ weeklyTarget: v })}
              options={[
                { value: 2, label: '2 hari' },
                { value: 3, label: '3 hari' },
                { value: 5, label: '5 hari' },
              ]}
            />
          }
        />

        {mode === 'junior' && (
          <Row
            id="break"
            icon={Eye}
            label="Pengingat istirahat"
            effect="Mengingatkan kamu istirahat mata setelah belajar beberapa menit."
            below={
              <Segmented
                labelledBy="break-label"
                value={settings.breakReminderMinutes}
                onChange={(v) => updateSettings({ breakReminderMinutes: v })}
                options={[
                  { value: 0, label: 'Mati' },
                  { value: 15, label: '15 mnt' },
                  { value: 20, label: '20 mnt' },
                  { value: 30, label: '30 mnt' },
                ]}
              />
            }
          />
        )}

        <Row
          id="companion"
          icon={ShieldCheck}
          label="Mode pendamping"
          effect="Grafik kemajuan, bahan obrolan tanpa layar, dan sertifikat untuk dicetak."
          control={
            <Button variant="secondary" onClick={() => navigate('/pendamping')}>
              Buka
            </Button>
          }
        />
      </Group>

      <Group id="data" title="Data">
        <Row
          id="privacy"
          icon={Lock}
          label="Privasi"
          effect="Semua kemajuanmu hanya ada di perangkat ini. Tidak ada akun, tidak ada pelacak."
        />
        <Row
          id="reset"
          icon={Trash2}
          label="Hapus progres profil ini"
          effect={`Menghapus bintang, ${xpWord(mode)}, dan ${unit} di profil ini. Tidak bisa dibatalkan.`}
          control={
            <Button variant="danger" onClick={() => setDeleteGateOpen(true)}>
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              Hapus progres
            </Button>
          }
        />
      </Group>

      <CompanionGate
        open={modeGateOpen}
        onClose={() => setModeGateOpen(false)}
        onUnlock={() => {
          setModeGateOpen(false);
          updateProfileMode('pro');
        }}
        description="Pro membuka materi dengan istilah asli dan kode sungguhan. Progres tetap terbawa."
      />

      <CompanionGate
        open={deleteGateOpen}
        onClose={() => setDeleteGateOpen(false)}
        onUnlock={() => {
          setDeleteGateOpen(false);
          setDeleteConfirmOpen(true);
        }}
        description="Langkah 1 dari 2 sebelum menghapus progres profil ini."
      />

      <p className="pw-small mt-2 text-center text-[var(--ink-3)]">
        {mode === 'pro' ? (
          <>
            Dibuat dengan ♥ oleh{' '}
            <a
              href="https://github.com/ahmadaqib"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              ahmadaqib
            </a>
          </>
        ) : (
          'Dibuat dengan ♥ oleh ahmadaqib'
        )}
      </p>

      <DialogModal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Hapus semua progres?"
      >
        <div className="space-y-4">
          <p className="pw-body">
            Semua bintang, {xpWord(mode)}, dan {unit} milik <strong>{profile.nickname}</strong> akan dihapus. Ini tidak
            bisa dibatalkan.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setDeleteConfirmOpen(false)} className="flex-1">
              Batal
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                resetActiveProfileData();
                setDeleteConfirmOpen(false);
                navigate('/beranda');
              }}
              className="flex-1"
            >
              Ya, hapus
            </Button>
          </div>
        </div>
      </DialogModal>
    </div>
  );
};
