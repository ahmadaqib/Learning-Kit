import React, { useEffect, useState } from 'react';
import { ArrowLeft, Printer, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MODE_CHOICE_LABEL, MODE_LABEL } from '@/app/modeConfig';
import { ALL_LESSONS, WORLDS_BY_ID } from '@/content/curriculum';
import type { Mode } from '@/content/schema';
import { calculateNormalizedGain, calculateRetention, getNormalizedGainCategory } from '@/engine/scoring';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { CompanionGate } from '@/components/ui/CompanionGate';
import { ProgressBar } from '@/components/ui/ProgressBar';

/** The one place the internal id appears in the UI: this page is for the adult, who may know the old name. */
const JUNIOR_ID: Mode = 'junior';
const JUNIOR_BUTTON = `Mode ${MODE_LABEL[JUNIOR_ID]} (${JUNIOR_ID[0].toUpperCase()}${JUNIOR_ID.slice(1)})`;

/**
 * Companion stays calm and adult: the Pro skin whatever the child's mode (spec 8.11). The mode tokens live on
 * <html>, so the attribute is set while this page is open, put back if AppShell rewrites it, and restored
 * to the profile's own mode when the page closes.
 */
function useProSkin(): void {
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (root.dataset.mode !== 'pro') root.dataset.mode = 'pro';
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { attributes: true, attributeFilter: ['data-mode'] });
    return () => {
      observer.disconnect();
      const state = useAppStore.getState();
      const own = state.profiles[state.activeProfileId]?.mode;
      if (own) root.dataset.mode = own;
    };
  }, []);
}

export const CompanionPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const updateProfileMode = useAppStore((s) => s.updateProfileMode);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const [unlocked, setUnlocked] = useState(false);
  const [certificateWorldId, setCertificateWorldId] = useState<string | null>(null);

  useProSkin();

  if (!profile) return null;

  if (!unlocked) {
    return (
      <div data-mode="pro" className="mx-auto max-w-[540px] space-y-4 px-4 py-10 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-[var(--world-700)]" aria-hidden="true" />
        <h1 className="pw-h1">Mode Pendamping</h1>
        <p className="pw-body text-[var(--ink-2)]">
          Halaman ini berisi ringkasan kemajuan belajar, grafik tes, bahan obrolan, dan sertifikat dunia yang bisa dicetak.
        </p>
        <CompanionGate
          open={!unlocked}
          onClose={() => window.history.back()}
          onUnlock={() => setUnlocked(true)}
        />
      </div>
    );
  }

  const completedLessons = Object.values(profile.lessons).filter((l) => l.completedAt).length;
  const approxMinutes = completedLessons * 5;
  const passedWorlds = Object.entries(profile.bosses)
    .filter(([, b]) => b.passed)
    .map(([id]) => WORLDS_BY_ID[id])
    .filter(Boolean);

  const assessedWorlds = Object.entries(profile.assessments)
    .map(([id, rec]) => ({ world: WORLDS_BY_ID[id], rec }))
    .filter((x) => x.world && x.rec.pre);

  const topMistakeTags = Object.entries(profile.mistakes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topLimitMistakes = Object.entries(profile.limitMistakes ?? {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([lid, count]) => ({ lesson: ALL_LESSONS.find((l) => l.id === lid), count }))
    .filter((x) => x.lesson);

  const masteredCards = Object.entries(profile.leitner)
    .filter(([, st]) => st.box >= 4)
    .map(([cid]) => cid);

  if (certificateWorldId) {
    const certWorld = WORLDS_BY_ID[certificateWorldId];
    return (
      <div data-mode="pro" className="mx-auto max-w-[780px] space-y-6 p-6">
        <div className="no-print flex justify-between">
          <Button variant="secondary" onClick={() => setCertificateWorldId(null)}>
            ← Kembali
          </Button>
          <Button variant="primary" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Cetak sertifikat (A4)
          </Button>
        </div>

        {/* A printed page: always dark ink on white, whatever the theme. --boss is dark navy in both themes. */}
        <div className="space-y-5 rounded-[var(--radius-xl)] border-8 border-[var(--boss)] bg-white p-10 text-center text-[var(--boss)]">
          <div className="text-xs font-extrabold uppercase tracking-[0.2em]">
            Sertifikat kelulusan dunia · Petualang Web
          </div>
          <h1 className="text-3xl font-extrabold">Diberikan kepada {profile.nickname || 'Petualang'}</h1>
          <p className="text-lg">
            Telah menuntaskan seluruh pelajaran dan lulus Tantangan Penjaga pada:
          </p>
          <div className="text-2xl font-extrabold text-[var(--world)]">
            Dunia {certWorld?.id.toUpperCase()} — {certWorld?.title}
          </div>
          <p className="text-sm text-[color-mix(in_srgb,var(--boss)_80%,white)]">
            Teruslah berlatih sedikit demi sedikit dan ingat perumpamaannya.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div data-mode="pro" className="mx-auto max-w-[960px] space-y-[var(--gap-group)] px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <Link to="/pengaturan" className="inline-flex items-center gap-2 font-bold text-[var(--ink)]">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Pengaturan
        </Link>
        <span className="rounded-full bg-[var(--ok-50)] px-3 py-1 text-xs font-extrabold text-[var(--ok-600)]">
          Mode pendamping terbuka
        </span>
      </div>

      <h1 className="pw-h1">Ringkasan Pendamping untuk {profile.nickname || 'Pelajar'}</h1>

      {/* Ringkasan & Kontrol Anak */}
      <div className="grid gap-[var(--gap-stack)] sm:grid-cols-2">
        <div className="pw-card space-y-2 p-[var(--space-card)]">
          <span className="pw-kicker">Ringkasan belajar</span>
          <div className="pw-h2">{completedLessons} pelajaran selesai</div>
          <p className="pw-small text-[var(--ink-2)]">
            Perkiraan waktu belajar ± {approxMinutes} menit · {passedWorlds.length} dunia lulus.
          </p>
        </div>

        <div className="pw-card space-y-3 p-[var(--space-card)]">
          <span className="pw-kicker">Pengaturan anak</span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={profile.mode === 'junior' ? 'primary' : 'secondary'}
              onClick={() => updateProfileMode('junior')}
            >
              {JUNIOR_BUTTON}
            </Button>
            <Button
              variant={profile.mode === 'pro' ? 'primary' : 'secondary'}
              onClick={() => updateProfileMode('pro')}
            >
              Mode {MODE_CHOICE_LABEL.pro}
            </Button>
          </div>
          <div className="flex gap-2">
            {([2, 3, 5] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateSettings({ weeklyTarget: t })}
                aria-pressed={profile.settings.weeklyTarget === t}
                className={`pw-t-colors min-h-[var(--touch-min)] cursor-pointer rounded-[var(--radius-sm)] border-2 px-3 text-xs font-bold ${
                  profile.settings.weeklyTarget === t
                    ? 'border-[var(--world-600)] bg-[var(--world-50)] text-[var(--ink)]'
                    : 'border-[var(--line)] text-[var(--ink-2)]'
                }`}
              >
                Target {t} hari/minggu
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kemajuan per Dunia (Tes Awal -> Tes Akhir -> 7 Hari) (§7.10) */}
      <section className="pw-card space-y-4 p-[var(--space-card)]">
        <h2 className="pw-h3">Kemajuan terukur per dunia (awal, akhir, 7 hari)</h2>
        {assessedWorlds.length === 0 ? (
          <p className="pw-small text-[var(--ink-2)]">
            Belum ada dunia yang selesai diukur. Grafik muncul setelah pelajar mengerjakan tes awal dan tes akhir.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {assessedWorlds.map(({ world, rec }) => {
              const pre = rec.pre!.score;
              const max = rec.pre!.max;
              const post = rec.post?.score;
              const retain = rec.retain?.score;
              const gain = post !== undefined ? calculateNormalizedGain(pre, post, max) : null;
              const ret = post !== undefined && retain !== undefined ? calculateRetention(post, retain) : null;
              return (
                <div key={world.id} className="space-y-2 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--cream)] p-4">
                  <div className="font-extrabold">{world.title}</div>
                  <div className="text-xs">Awal: {pre}/{max}</div>
                  <ProgressBar value={(pre / max) * 100} label="Awal" color="var(--ink-3)" />
                  {post !== undefined && (
                    <>
                      <div className="text-xs">Akhir: {post}/{max}</div>
                      <ProgressBar value={(post / max) * 100} label="Akhir" color="var(--ok-500)" />
                    </>
                  )}
                  {retain !== undefined && (
                    <>
                      <div className="text-xs">7 Hari: {retain}/{max}</div>
                      <ProgressBar value={(retain / max) * 100} label="7 hari" color="var(--world-600)" />
                    </>
                  )}
                  {gain !== null && (
                    <div className="text-xs font-bold text-[var(--ink-2)] pt-1">
                      Kenaikan ternormalisasi: {gain} ({getNormalizedGainCategory(gain)})
                      {ret !== null && ` · Retensi 7 hari: ${ret}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <p className="text-xs italic text-[var(--ink-2)]">
          Catatan: Angka ini menunjukkan kecenderungan, bukan nilai rapor. Soalnya sedikit, jadi satu jawaban bisa mengubah hasil cukup banyak. Lihat polanya dari beberapa dunia sekaligus.
        </p>
      </section>

      {/* Yang perlu dibantu & Bahan Obrolan (§9.10) */}
      <section className="pw-card space-y-4 p-[var(--space-card)]">
        <h2 className="pw-h3">Konsep yang perlu dibantu dan bahan obrolan tanpa layar</h2>
        {topMistakeTags.length === 0 ? (
          <p className="pw-small text-[var(--ink-2)]">
            Belum ada catatan kesalahan soal. Berikut contoh bahan obrolan untuk dunia awal:
          </p>
        ) : (
          <div className="space-y-3">
            {topMistakeTags.map(([tag, count]) => {
              const matchingLesson = ALL_LESSONS.find((l) => l.introducesTerms.includes(tag));
              return (
                <div key={tag} className="space-y-1.5 rounded-[var(--radius-md)] border border-[var(--line)] p-3.5">
                  <div className="font-extrabold">
                    Topik: {tag} ({count}× perlu diulang)
                  </div>
                  {matchingLesson?.companion && (
                    <>
                      <p className="text-xs text-[var(--ink-2)]">
                        <strong>Tanya saat santai:</strong> {matchingLesson.companion.talkPrompts[0]}
                      </p>
                      <p className="text-xs text-[var(--ink-2)]">
                        <strong>Kegiatan tanpa layar:</strong> {matchingLesson.companion.offlineActivity}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <div className="space-y-1 rounded-[var(--radius-md)] bg-[var(--cream)] p-3.5 text-xs">
          <strong>Yang sudah dikuasai kuat (Kotak 4–5):</strong> {masteredCards.length} kartu konsep.
          {topLimitMistakes.length > 0 && (
            <div className="mt-1">
              <strong>Batas analogi yang sering keliru:</strong>{' '}
              {topLimitMistakes.map((x) => x.lesson?.title).join(', ')}
            </div>
          )}
        </div>
      </section>

      {/* Sertifikat Cetak Dunia (§9.10) */}
      {passedWorlds.length > 0 && (
        <section className="pw-card space-y-3 p-[var(--space-card)]">
          <h2 className="pw-h3">Cetak sertifikat dunia</h2>
          <div className="flex flex-wrap gap-2">
            {passedWorlds.map((w) => (
              <Button key={w.id} variant="secondary" onClick={() => setCertificateWorldId(w.id)}>
                <Printer className="h-4 w-4" aria-hidden="true" />
                Sertifikat {w.title}
              </Button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
