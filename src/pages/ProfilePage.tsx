import React, { useState } from 'react';
import { Award, Download, Settings, Upload, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { BADGES } from '@/content/badges';
import { WORLD_METAS } from '@/content/worldMeta';
import { getConsecutiveTargetWeeks } from '@/engine/date';
import { getLevelFromXp } from '@/engine/scoring';
import { useAppStore } from '@/store/useAppStore';
import { Bito, BITO_COLORS } from '@/components/mascot/Bito';
import { CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { Button } from '@/components/ui/Button';
import { CompanionGate } from '@/components/ui/CompanionGate';
import { DialogModal } from '@/components/ui/DialogModal';
import { ProgressBar } from '@/components/ui/ProgressBar';

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

  if (!profile) return null;

  const lvl = getLevelFromXp(profile.xp, profile.mode);
  const completedLessons = Object.values(profile.lessons).filter((l) => l.completedAt).length;
  const totalStars = Object.values(profile.lessons).reduce((acc, l) => acc + l.stars, 0);
  const masteredCards = Object.values(profile.leitner).filter((c) => c.box === 5).length;
  const consecutiveWeeks = getConsecutiveTargetWeeks(profile.weeks, profile.settings.weeklyTarget);

  const validLessonIds = new Set(
    WORLD_METAS.flatMap((w) => [...w.lessons, ...w.sideQuests].map((l) => l.id)),
  );

  const exported = exportOpen ? exportActiveProfile() : null;

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

  return (
    <div className="mx-auto max-w-[900px] px-4 py-6 sm:px-6 space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="pw-h1">Profil Petualang</h1>
        <div className="flex gap-2">
          <Link to="/glosarium" className="pw-btn-secondary inline-flex items-center px-3 text-sm">
            Kamus Istilah
          </Link>
          <Link to="/pengaturan" className="pw-btn-secondary inline-flex items-center gap-1.5 px-3 text-sm">
            <Settings className="h-4 w-4" aria-hidden="true" />
            Pengaturan
          </Link>
        </div>
      </header>

      {/* Kartu Identitas & Level */}
      <section className="pw-card p-5 flex flex-col sm:flex-row items-center gap-5">
        <div className="relative flex items-end gap-1">
          <Bito expression="happy" size={112} custom={profile.mascot} className="pw-float" />
          <CharacterAvatar avatarId={profile.avatar} size={48} className="-ml-4 shadow-md rounded-full" />
        </div>
        <div className="flex-1 w-full space-y-2 text-center sm:text-left">
          <div className="pw-kicker">LEVEL {lvl.level} · {lvl.title}</div>
          <h2 className="pw-h1">{profile.nickname || 'Petualang'}</h2>
          <p className="pw-small text-[var(--ink-2)]">
            {profile.xp} XP total · Mode {profile.mode === 'junior' ? 'Junior' : 'Pro'}
          </p>
          <ProgressBar
            variant="xp"
            value={lvl.progressRatio * 100}
            label="Progres menuju level berikutnya"
          />
        </div>
      </section>

      {/* Statistik 4 kartu */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="pw-card p-4 text-center">
          <div className="pw-h2">{completedLessons}</div>
          <div className="pw-small text-[var(--ink-2)]">Pelajaran selesai</div>
        </div>
        <div className="pw-card p-4 text-center">
          <div className="pw-h2">{totalStars} ★</div>
          <div className="pw-small text-[var(--ink-2)]">Total bintang</div>
        </div>
        <div className="pw-card p-4 text-center">
          <div className="pw-h2">{masteredCards}</div>
          <div className="pw-small text-[var(--ink-2)]">Kartu Kotak 5</div>
        </div>
        <div className="pw-card p-4 text-center">
          <div className="pw-h2">{consecutiveWeeks}</div>
          <div className="pw-small text-[var(--ink-2)]">Minggu target</div>
        </div>
      </section>

      {/* Kustomisasi Maskot Bito (v1.1 §10.6) */}
      <section className="pw-card p-5 space-y-4">
        <h2 className="pw-h3">Kustomisasi Maskot Bito</h2>
        <div>
          <span className="pw-small font-bold block mb-2">Warna tali selempang:</span>
          <div className="flex flex-wrap gap-2.5">
            {BITO_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={c.label}
                aria-pressed={profile.mascot.color === c.id}
                onClick={() => updateMascot({ color: c.id })}
                style={{ backgroundColor: c.id }}
                className={`pw-pressable h-11 w-11 rounded-full border-2 cursor-pointer ${
                  profile.mascot.color === c.id ? 'pw-squish-pop border-[var(--ink)] scale-110 shadow-md' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>
        <div>
          <span className="pw-small font-bold block mb-2">Aksesori (terbuka saat naik level):</span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'none', label: 'Polos', minLv: 1 },
              { id: 'cap', label: 'Topi (Lv 2)', minLv: 2 },
              { id: 'glasses', label: 'Kacamata (Lv 3)', minLv: 3 },
              { id: 'scarf', label: 'Syal (Lv 4)', minLv: 4 },
            ].map((acc) => {
              const unlocked = lvl.level >= acc.minLv;
              return (
                <button
                  key={acc.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => updateMascot({ accessory: acc.id as 'none' | 'cap' | 'glasses' | 'scarf' })}
                  className={`pw-pressable min-h-[44px] rounded-xl border-2 px-3.5 text-xs font-extrabold cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed ${
                    profile.mascot.accessory === acc.id
                      ? 'pw-squish-pop border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_3px_0_var(--world-700)]'
                      : 'border-[var(--line)]'
                  }`}
                >
                  {acc.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lencana (v1.1 §7.9) */}
      <section className="pw-card p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-[var(--star)]" aria-hidden="true" />
          <h2 className="pw-h3">Lencana Pencapaian ({profile.badges.length}/{BADGES.length})</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => {
            const has = profile.badges.includes(b.id);
            return (
              <div
                key={b.id}
                className={`rounded-xl border p-3 ${
                  has ? 'border-[var(--ok-500)] bg-[var(--ok-50)]' : 'border-[var(--line)] bg-[var(--cream)] opacity-65'
                }`}
              >
                <div className="font-extrabold text-sm">{has ? '🏅 ' : '🔒 '}{b.title}</div>
                <p className="text-xs text-[var(--ink-2)] mt-1">{b.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ekspor, Impor, Ganti Profil (§9.9 & §13.6) */}
      <section className="flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => setExportOpen(true)}>
          <Download className="h-4 w-4" aria-hidden="true" />
          Ekspor Progres
        </Button>
        <Button variant="secondary" onClick={() => setImportGateOpen(true)}>
          <Upload className="h-4 w-4" aria-hidden="true" />
          Impor Progres
        </Button>
        <Button variant="ghost" onClick={() => navigate('/')}>
          <Users className="h-4 w-4" aria-hidden="true" />
          Ganti Profil
        </Button>
      </section>

      {/* Modal Ekspor */}
      <DialogModal open={exportOpen} onClose={() => setExportOpen(false)} title="Ekspor Progres">
        {exported && (
          <div className="space-y-4">
            <p className="pw-small text-[var(--ink-2)]">
              Salin kode ini atau unduh file JSON untuk memindahkan progres ke perangkat lain:
            </p>
            <textarea
              readOnly
              rows={4}
              value={exported.text}
              aria-label="Kode ekspor progres"
              className="pw-code w-full rounded-xl border border-[var(--line)] bg-[var(--cream)] p-3 text-xs"
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
                {copied ? 'Tersalin ✓' : 'Salin Kode'}
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleDownloadJson}>
                Unduh .JSON
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

      {/* Modal Impor */}
      <DialogModal open={importOpen} onClose={() => setImportOpen(false)} title="Impor Progres">
        <form onSubmit={handleImportSubmit} className="space-y-4">
          <label htmlFor="import-code-input" className="block pw-small font-bold">
            Tempel kode ekspor (PW1....) atau pilih file .json:
          </label>
          <textarea
            id="import-code-input"
            rows={4}
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Tempel kode di sini..."
            className="pw-code w-full rounded-xl border-2 border-[var(--line)] p-3 text-xs"
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
            Timpa Profil Ini & Muat Progres
          </Button>
        </form>
      </DialogModal>
    </div>
  );
};
