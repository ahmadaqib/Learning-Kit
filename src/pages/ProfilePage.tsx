import React, { useEffect, useRef, useState } from 'react';
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  Check,
  Compass,
  Crown,
  Download,
  Flame,
  Footprints,
  Layers,
  Lock,
  Palette,
  Plug,
  Settings,
  ShieldCheck,
  Smartphone,
  Star,
  Upload,
  Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BADGES } from '@/content/badges';
import { MASCOT_ACCESSORIES } from '@/content/mascotRewards';
import { WORLD_METAS } from '@/content/worldMeta';
import { COLLECTION_LABEL, levelLabel, xpWord } from '@/app/modeConfig';
import { getConsecutiveTargetWeeks } from '@/engine/date';
import { getLevelFromXp } from '@/engine/scoring';
import { stickerTilt } from '@/motion/tokens';
import { useAppStore } from '@/store/useAppStore';
import { CountUp } from '@/components/fx/CountUp';
import { Bito, BITO_COLORS } from '@/components/mascot/Bito';
import { CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { Button } from '@/components/ui/Button';
import { CompanionGate } from '@/components/ui/CompanionGate';
import { DialogModal } from '@/components/ui/DialogModal';
import { Poster } from '@/components/ui/Poster';
import { ProgressBar } from '@/components/ui/ProgressBar';

/** Badge icon names come from content/badges.ts. Anything unknown falls back to the award medal. */
const BADGE_ICONS: Record<string, React.ElementType> = {
  award: Award,
  'book-open': BookOpen,
  brain: Brain,
  compass: Compass,
  crown: Crown,
  flame: Flame,
  footprints: Footprints,
  lock: Lock,
  palette: Palette,
  plug: Plug,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
};

/** Profiles whose stat numbers already counted up in this session: a later visit shows them at once. */
const countedProfiles = new Set<string>();

/** How long Bito stays "happy" after a change, so the next change starts a new reaction (M45). */
const HAPPY_MS = 700;

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const updateMascot = useAppStore((s) => s.updateMascot);
  const exportActiveProfile = useAppStore((s) => s.exportActiveProfile);
  const importToActiveProfile = useAppStore((s) => s.importToActiveProfile);

  const [exportOpen, setExportOpen] = useState(false);
  const [importGateOpen, setImportGateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [happy, setHappy] = useState(false);
  // Decided once, on the first render, so the count-up is not cut short by the re-render after it
  const [skipCount] = useState(() => countedProfiles.has(profile?.id ?? ''));

  const happyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const profileId = profile?.id;

  useEffect(() => {
    if (profileId) countedProfiles.add(profileId);
  }, [profileId]);

  useEffect(
    () => () => {
      clearTimeout(happyTimer.current);
    },
    [],
  );

  if (!profile) return null;

  const mode = profile.mode;
  const lvl = getLevelFromXp(profile.xp, mode);
  const nextTitle = lvl.level < 9 ? getLevelFromXp(lvl.nextLevelXp, mode).title : null;
  const completedLessons = Object.values(profile.lessons).filter((l) => l.completedAt).length;
  const totalStars = Object.values(profile.lessons).reduce((acc, l) => acc + l.stars, 0);
  const masteredCards = Object.values(profile.leitner).filter((c) => c.box === 5).length;
  const consecutiveWeeks = getConsecutiveTargetWeeks(profile.weeks, profile.settings.weeklyTarget);

  const validLessonIds = new Set(
    WORLD_METAS.flatMap((w) => [...w.lessons, ...w.sideQuests].map((l) => l.id)),
  );

  const exported = exportOpen ? exportActiveProfile() : null;

  // Four tiles. The weekly streak is a Pro number (spec 7); Petualang counts what they collected instead.
  const tiles: Array<{ key: string; icon: React.ElementType; value: number; label: string }> = [
    { key: 'lessons', icon: CheckCircle2, value: completedLessons, label: 'Pelajaran selesai' },
    { key: 'stars', icon: Star, value: totalStars, label: 'Bintang' },
    { key: 'box5', icon: Layers, value: masteredCards, label: 'Kartu di Kotak 5' },
    mode === 'pro'
      ? { key: 'weeks', icon: Flame, value: consecutiveWeeks, label: 'Minggu berturut-turut' }
      : {
          key: 'collection',
          icon: Award,
          value: profile.stickers.length,
          label: `${COLLECTION_LABEL.junior.unit[0].toUpperCase()}${COLLECTION_LABEL.junior.unit.slice(1)} terkumpul`,
        },
  ];

  const handleDownloadJson = () => {
    if (!exported) return;
    const blob = new Blob([exported.json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `petualang-web-${profile.nickname || 'profil'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = importToActiveProfile(importText, validLessonIds);
    setImportStatus({ ok: res.ok, msg: res.message });
    if (res.ok) {
      setImportText('');
    }
  };

  /** Bito previews the change and reacts happy (M45). A second change during the reaction is ignored. */
  const changeMascot = (partial: Parameters<typeof updateMascot>[0]) => {
    updateMascot(partial);
    setHappy(true);
    clearTimeout(happyTimer.current);
    happyTimer.current = setTimeout(() => setHappy(false), HAPPY_MS);
  };

  const numberFont = mode === 'pro' ? 'font-mono tabular-nums' : '';
  const earnedCount = profile.badges.length;

  return (
    <div className="mx-auto max-w-[900px] space-y-[var(--gap-group)] px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="pw-h1">Profil</h1>
        <div className="flex flex-wrap gap-2">
          <Link to="/glosarium" className="pw-btn-secondary inline-flex items-center px-3 text-sm">
            Kamus istilah
          </Link>
          <Link to="/pengaturan" className="pw-btn-secondary inline-flex items-center gap-1.5 px-3 text-sm">
            <Settings className="h-4 w-4" aria-hidden="true" />
            Pengaturan
          </Link>
        </div>
      </header>

      {/* Identity poster: the one saturated block of the screen */}
      <Poster as="section" aria-labelledby="profile-name" className="flex flex-col items-center gap-5 sm:flex-row">
        <div
          className="pw-sticker flex-shrink-0 bg-[var(--paper)] p-2"
          style={{ '--tilt': `${stickerTilt(0)}deg` } as React.CSSProperties}
        >
          <CharacterAvatar avatarId={profile.avatar} size={72} />
        </div>
        <div className="w-full min-w-0 flex-1 space-y-2 text-center sm:text-left">
          <div className="pw-kicker">
            {levelLabel(lvl.level, mode)} · {lvl.title}
          </div>
          <h2 id="profile-name" className="pw-h1 break-words">
            {profile.nickname || 'Petualang'}
          </h2>
          <ProgressBar variant="poster" value={lvl.progressRatio * 100} label="Kemajuan menuju level berikutnya" />
          <p className={`pw-small font-bold ${numberFont}`}>
            {lvl.currentXp} / {lvl.nextLevelXp} {xpWord(mode)}
          </p>
          {nextTitle && (
            <p className="pw-small inline-block rounded-full border-2 border-dashed border-[var(--on-poster)] px-3 py-1 font-bold">
              Berikutnya: {nextTitle}
            </p>
          )}
        </div>
      </Poster>

      {/* Four stat tiles, 2 x 2 */}
      <ul className="grid list-none grid-cols-2 gap-[var(--gap-stack)] p-0">
        {tiles.map(({ key, icon: Icon, value, label }) => (
          <li key={key} className="pw-card flex flex-col items-start gap-1 p-[var(--space-card)]">
            <Icon className="h-6 w-6 text-[var(--world-700)]" aria-hidden="true" />
            <CountUp value={value} skip={skipCount} className={`pw-h1 ${numberFont}`} />
            <span className="pw-small text-[var(--ink-2)]">{label}</span>
          </li>
        ))}
      </ul>

      {/* Badges as stickers; the ones not earned yet are dashed outlines with the requirement as text */}
      <section className="pw-card space-y-[var(--gap-stack)] p-[var(--space-card)]" aria-labelledby="badges-title">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 id="badges-title" className="pw-h3">
            Lencana
          </h2>
          <span className="pw-small font-bold text-[var(--ink-2)]">
            {earnedCount} dari {BADGES.length}
          </span>
        </div>
        <ul className="grid list-none grid-cols-1 gap-[var(--gap-stack)] p-0 min-[420px]:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b, i) => {
            const has = profile.badges.includes(b.id);
            const Icon = BADGE_ICONS[b.icon] ?? Award;
            return has ? (
              <li
                key={b.id}
                className="pw-sticker bg-[var(--paper)] p-3"
                style={{ '--tilt': `${stickerTilt(i)}deg` } as React.CSSProperties}
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-[var(--star-50)] text-[var(--star-700)]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="pw-small font-extrabold text-[var(--ink)]">{b.title}</p>
                    <p className="pw-small text-[var(--ink-2)]">{b.description}</p>
                    <p className="pw-small mt-1 inline-flex items-center gap-1 font-bold text-[var(--ok-600)]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                      Didapat
                    </p>
                  </div>
                </div>
              </li>
            ) : (
              <li
                key={b.id}
                className="rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--line-strong)] p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border-2 border-dashed border-[var(--line-strong)] text-[var(--ink-3)]">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="pw-small font-extrabold text-[var(--ink-2)]">{b.title}</p>
                    <p className="pw-small text-[var(--ink-2)]">{b.description}</p>
                    <p className="pw-small mt-1 font-bold text-[var(--ink-3)]">Belum didapat</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Bito and the things he wears (v1.1 10.6): colour swatches and accessory chips */}
      <section className="pw-card space-y-[var(--gap-stack)] p-[var(--space-card)]" aria-labelledby="mascot-title">
        <div className="flex items-center gap-4">
          <Bito expression={happy ? 'happy' : 'idle'} size={112} custom={profile.mascot} />
          <div className="min-w-0">
            <h2 id="mascot-title" className="pw-h3">
              Gaya Bito
            </h2>
            <p className="pw-small text-[var(--ink-2)]">Pilih warna dan aksesori. Bito langsung mencobanya.</p>
          </div>
        </div>

        <div role="group" aria-labelledby="swatch-label">
          <span id="swatch-label" className="pw-small mb-2 block font-bold">
            Warna tali selempang
          </span>
          <div className="flex flex-wrap gap-2.5">
            {BITO_COLORS.map((c) => {
              const selected = profile.mascot.color === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.label}
                  aria-pressed={selected}
                  onClick={() => changeMascot({ color: c.id })}
                  style={{ backgroundColor: c.id }}
                  className={`pw-pressable pw-t-colors relative grid h-12 w-12 cursor-pointer place-items-center rounded-full border-[3px] ${
                    selected ? 'border-[var(--ink)]' : 'border-[var(--paper)] shadow-[var(--elev-1)]'
                  }`}
                >
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="grid h-5 w-5 place-items-center rounded-full bg-[var(--paper)] text-[var(--ink)]"
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div role="group" aria-labelledby="acc-label">
          <span id="acc-label" className="pw-small mb-2 block font-bold">
            Aksesori (terbuka saat naik level)
          </span>
          <div className="flex flex-wrap gap-2.5">
            {MASCOT_ACCESSORIES.map((acc) => {
              const unlocked = lvl.level >= acc.minLv;
              const selected = profile.mascot.accessory === acc.id;
              const name = acc.id === 'none' ? 'Polos' : `${acc.noun[0].toUpperCase()}${acc.noun.slice(1)}`;
              const tone = !unlocked
                ? 'border-dashed border-[var(--line-strong)] bg-transparent text-[var(--ink-2)] cursor-not-allowed'
                : selected
                  ? 'border-[var(--world-600)] bg-[var(--world-50)] text-[var(--ink)] shadow-[var(--elev-sticker)] cursor-pointer'
                  : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] cursor-pointer';
              return (
                <button
                  key={acc.id}
                  type="button"
                  disabled={!unlocked}
                  aria-pressed={selected}
                  onClick={() => changeMascot({ accessory: acc.id })}
                  className={`pw-pressable pw-t-colors inline-flex min-h-[var(--touch-min)] items-center gap-2 rounded-[var(--radius-md)] border-2 px-4 font-extrabold ${tone}`}
                >
                  {selected && <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />}
                  {!unlocked && <Lock className="h-4 w-4" aria-hidden="true" />}
                  <span>{name}</span>
                  {!unlocked && <span className="pw-small font-bold">{levelLabel(acc.minLv, mode)}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Export, import, switch profile (9.9 and 13.6) */}
      <section className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setExportOpen(true)}>
          <Download className="h-4 w-4" aria-hidden="true" />
          Ekspor progres
        </Button>
        <Button variant="secondary" onClick={() => setImportGateOpen(true)}>
          <Upload className="h-4 w-4" aria-hidden="true" />
          Impor progres
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          <Users className="h-4 w-4" aria-hidden="true" />
          Ganti profil
        </Button>
      </section>

      <DialogModal open={exportOpen} onClose={() => setExportOpen(false)} title="Ekspor progres">
        {exported && (
          <div className="space-y-4">
            <p className="pw-small text-[var(--ink-2)]">
              Salin kode ini atau unduh file JSON untuk memindahkan progres ke perangkat lain.
            </p>
            <textarea
              readOnly
              rows={4}
              value={exported.text}
              aria-label="Kode ekspor progres"
              className="pw-code w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-3 text-xs"
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  void navigator.clipboard?.writeText(exported.text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? 'Tersalin' : 'Salin kode'}
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleDownloadJson}>
                Unduh .json
              </Button>
            </div>
          </div>
        )}
      </DialogModal>

      <CompanionGate
        open={importGateOpen}
        onClose={() => setImportGateOpen(false)}
        onUnlock={() => {
          setImportGateOpen(false);
          setImportOpen(true);
        }}
        description="Impor progres akan menimpa kemajuan profil ini."
      />

      <DialogModal open={importOpen} onClose={() => setImportOpen(false)} title="Impor progres">
        <form onSubmit={handleImportSubmit} className="space-y-4">
          <label htmlFor="import-code-input" className="pw-small block font-bold">
            Tempel kode ekspor (PW1....) atau pilih file .json
          </label>
          <textarea
            id="import-code-input"
            rows={4}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Tempel kode di sini..."
            className="pw-code w-full rounded-[var(--radius-md)] border-2 border-[var(--line-strong)] bg-[var(--paper)] p-3 text-xs"
          />
          <input
            type="file"
            accept=".json,application/json"
            aria-label="Unggah file JSON progres"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              file.text().then((txt) => setImportText(txt));
            }}
            className="text-sm"
          />
          {importStatus && (
            <p className={`pw-small font-bold ${importStatus.ok ? 'text-[var(--ok-600)]' : 'text-[var(--warn-700)]'}`}>
              {importStatus.msg}
            </p>
          )}
          <Button type="submit" variant="primary" fullWidth disabled={!importText.trim()}>
            Timpa dan muat progres
          </Button>
        </form>
      </DialogModal>
    </div>
  );
};
