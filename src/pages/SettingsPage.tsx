import React, { useState } from 'react';
import { ShieldCheck, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { hasIndonesianVoiceAvailable } from '@/engine/speech';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { CompanionGate } from '@/components/ui/CompanionGate';
import { DialogModal } from '@/components/ui/DialogModal';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const updateProfileMode = useAppStore((s) => s.updateProfileMode);
  const resetActiveProfileData = useAppStore((s) => s.resetActiveProfileData);

  const [modeGateOpen, setModeGateOpen] = useState(false);
  const [deleteGateOpen, setDeleteGateOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  if (!profile) return null;

  const voiceAvailable = hasIndonesianVoiceAvailable();

  return (
    <div className="mx-auto max-w-[720px] px-4 py-6 sm:px-6 space-y-6">
      <h1 className="pw-h1">Pengaturan</h1>

      {/* Mode Pendamping */}
      <section className="pw-card flex items-center justify-between gap-4 p-5">
        <div>
          <h2 className="pw-h3">Mode Pendamping & Orang Tua</h2>
          <p className="pw-small text-[var(--ink-2)]">
            Lihat grafik kemajuan, bahan obrolan tanpa layar, dan cetak sertifikat.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/pendamping')}>
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Buka
        </Button>
      </section>

      {/* Mode Junior vs Pro (§9.11) */}
      <section className="pw-card p-5 space-y-3">
        <h2 className="pw-h3">Mode Belajar</h2>
        <p className="pw-small text-[var(--ink-2)]">
          Saat ini: <strong>{profile.mode === 'junior' ? 'Mode Junior (SD)' : 'Mode Pro (Pemula / Remaja+)'}</strong>.
          Progres tetap terbawa bila berpindah mode.
        </p>
        <div className="flex gap-3">
          <Button
            variant={profile.mode === 'junior' ? 'primary' : 'secondary'}
            onClick={() => updateProfileMode('junior')}
          >
            Mode Junior
          </Button>
          <Button
            variant={profile.mode === 'pro' ? 'primary' : 'secondary'}
            onClick={() => {
              if (profile.mode === 'junior') {
                setModeGateOpen(true);
              } else {
                updateProfileMode('pro');
              }
            }}
          >
            Mode Pro
          </Button>
        </div>
      </section>

      {/* Suara, Bacakan, Tema, Teks, Animasi */}
      <section className="pw-card p-5 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-bold">Suara Efek</div>
            <div className="pw-small text-[var(--ink-2)]">5 suara lembut saat menjawab dan mendapat bintang.</div>
          </div>
          <Button
            variant={profile.settings.soundEnabled ? 'primary' : 'secondary'}
            onClick={() => updateSettings({ soundEnabled: !profile.settings.soundEnabled })}
          >
            {profile.settings.soundEnabled ? 'Nyala' : 'Mati'}
          </Button>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-bold">Bacakan Otomatis</div>
            <div className="pw-small text-[var(--ink-2)]">
              {voiceAvailable
                ? 'Membacakan judul dan isi kartu secara otomatis.'
                : 'Perangkat ini tidak memiliki suara Bahasa Indonesia bawaan.'}
            </div>
          </div>
          <Button
            variant={profile.settings.autoReadAloud ? 'primary' : 'secondary'}
            disabled={!voiceAvailable}
            onClick={() => updateSettings({ autoReadAloud: !profile.settings.autoReadAloud })}
          >
            {profile.settings.autoReadAloud ? 'Nyala' : 'Mati'}
          </Button>
        </div>

        <div>
          <span className="font-bold block mb-2">Ukuran Teks</span>
          <div className="grid grid-cols-3 gap-2">
            {([
              [100, 'Normal (100%)'],
              [115, 'Besar (115%)'],
              [130, 'Sangat Besar (130%)'],
            ] as const).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => updateSettings({ textScale: val })}
                className={`pw-pressable min-h-[48px] rounded-xl border-2 px-2 text-xs font-extrabold cursor-pointer ${
                  profile.settings.textScale === val
                    ? 'pw-squish-pop border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_3px_0_var(--world-700)]'
                    : 'border-[var(--line)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="font-bold block mb-2">Tema Tampilan</span>
          <div className="grid grid-cols-3 gap-2">
            {([
              ['light', 'Terang'],
              ['dark', 'Gelap'],
              ['system', 'Ikut Sistem'],
            ] as const).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => updateSettings({ theme: val })}
                className={`pw-pressable min-h-[48px] rounded-xl border-2 px-2 text-xs font-extrabold cursor-pointer ${
                  profile.settings.theme === val
                    ? 'pw-squish-pop border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_3px_0_var(--world-700)]'
                    : 'border-[var(--line)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-bold">Kurangi Animasi</div>
            <div className="pw-small text-[var(--ink-2)]">Matikan getar, denyut, dan konfeti.</div>
          </div>
          <Button
            variant={profile.settings.reducedMotion === 'always' ? 'primary' : 'secondary'}
            onClick={() =>
              updateSettings({
                reducedMotion: profile.settings.reducedMotion === 'always' ? 'system' : 'always',
              })
            }
          >
            {profile.settings.reducedMotion === 'always' ? 'Selalu Aktif' : 'Ikut Sistem'}
          </Button>
        </div>

        <div>
          <span className="font-bold block mb-2">Target Mingguan</span>
          <div className="grid grid-cols-3 gap-2">
            {([2, 3, 5] as const).map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => updateSettings({ weeklyTarget: days })}
                className={`pw-pressable min-h-[44px] rounded-xl border-2 text-xs font-extrabold cursor-pointer ${
                  profile.settings.weeklyTarget === days
                    ? 'pw-squish-pop border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_3px_0_var(--world-700)]'
                    : 'border-[var(--line)]'
                }`}
              >
                {days} hari / minggu
              </button>
            ))}
          </div>
        </div>

        {profile.mode === 'junior' && (
          <div>
            <span className="font-bold block mb-2">Pengingat Istirahat Mata</span>
            <div className="grid grid-cols-4 gap-2">
              {([0, 15, 20, 30] as const).map((min) => (
                <button
                  key={min}
                  type="button"
                  onClick={() => updateSettings({ breakReminderMinutes: min })}
                  className={`min-h-[44px] rounded-xl border-2 text-xs font-extrabold cursor-pointer ${
                    profile.settings.breakReminderMinutes === min
                      ? 'border-[var(--world-600)] bg-[var(--world-50)]'
                      : 'border-[var(--line)]'
                  }`}
                >
                  {min === 0 ? 'Mati' : `${min} mnt`}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Privasi & Hapus Data */}
      <section className="pw-card p-5 space-y-3">
        <h2 className="pw-h3">Tentang & Privasi</h2>
        <p className="pw-small text-[var(--ink-2)]">
          Semua kemajuanmu disimpan di perangkat ini saja. Aplikasi ini tidak memiliki akun server, tidak mengirim data ke luar perangkat, dan bebas pelacak.
        </p>
        <Button variant="danger" onClick={() => setDeleteGateOpen(true)}>
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Hapus Semua Progres Profil Ini
        </Button>
      </section>

      <CompanionGate
        open={modeGateOpen}
        onClose={() => setModeGateOpen(false)}
        onUnlock={() => {
          setModeGateOpen(false);
          updateProfileMode('pro');
        }}
        description="Memindahkan Mode Junior ke Mode Pro akan membuka materi kode."
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

      <DialogModal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        title="Konfirmasi Akhir Hapus Progres"
      >
        <div className="space-y-4">
          <p className="pw-body">
            Yakin menghapus seluruh bintang, XP, dan stiker pada profil <strong>{profile.nickname}</strong>? Tindakan ini tidak bisa dibatalkan.
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
              Ya, Hapus Semua
            </Button>
          </div>
        </div>
      </DialogModal>
    </div>
  );
};
