import React, { useState } from 'react';
import { ArrowLeft, Printer, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_LESSONS, WORLDS_BY_ID } from '@/content/curriculum';
import { calculateNormalizedGain, calculateRetention, getNormalizedGainCategory } from '@/engine/scoring';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/Button';
import { CompanionGate } from '@/components/ui/CompanionGate';
import { ProgressBar } from '@/components/ui/ProgressBar';

export const CompanionPage: React.FC = () => {
  const profile = useAppStore((s) => s.profiles[s.activeProfileId]);
  const updateProfileMode = useAppStore((s) => s.updateProfileMode);
  const updateSettings = useAppStore((s) => s.updateSettings);

  const [unlocked, setUnlocked] = useState(false);
  const [certificateWorldId, setCertificateWorldId] = useState<string | null>(null);

  if (!profile) return null;

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-[540px] px-4 py-10 text-center space-y-4">
        <ShieldCheck className="mx-auto h-12 w-12 text-[var(--world-700)]" aria-hidden="true" />
        <h1 className="pw-h1">Mode Pendamping</h1>
        <p className="pw-body text-[var(--ink-2)]">
          Halaman ini berisi ringkasan kemajuan belajar, grafik tes, bahan obrolan diskusi, serta cetak sertifikat dunia.
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
      <div className="mx-auto max-w-[780px] p-6 space-y-6">
        <div className="no-print flex justify-between">
          <Button variant="secondary" onClick={() => setCertificateWorldId(null)}>
            ← Kembali
          </Button>
          <Button variant="primary" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            Cetak Sertifikat (A4)
          </Button>
        </div>

        <div className="rounded-3xl border-8 border-[#1F2340] bg-white p-10 text-center text-[#1F2340] space-y-5">
          <div className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#E4572E]">
            SERTIFIKAT KELULUSAN DUNIA · PETUALANG WEB
          </div>
          <h1 className="text-3xl font-extrabold">Diberikan kepada {profile.nickname || 'Petualang'}</h1>
          <p className="text-lg">
            Telah menuntaskan seluruh pelajaran dan lulus Tantangan Penjaga pada:
          </p>
          <div className="text-2xl font-extrabold text-[#2F6FED]">
            Dunia {certWorld?.id.toUpperCase()} — {certWorld?.title}
          </div>
          <p className="text-sm text-[#4A4F72]">
            Teruslah berlatih sedikit demi sedikit dan ingat perumpamaannya!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[960px] px-4 py-6 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/pengaturan" className="inline-flex items-center gap-2 font-bold text-[var(--ink)]">
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          Pengaturan
        </Link>
        <span className="rounded-full bg-[var(--ok-50)] px-3 py-1 text-xs font-extrabold text-[var(--ok-600)]">
          Mode Pendamping Terbuka
        </span>
      </div>

      <h1 className="pw-h1">Ringkasan Pendamping untuk {profile.nickname || 'Pelajar'}</h1>

      {/* Ringkasan & Kontrol Anak */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="pw-card p-5 space-y-2">
          <span className="pw-kicker">RINGKASAN BELAJAR</span>
          <div className="pw-h2">{completedLessons} pelajaran selesai</div>
          <p className="pw-small text-[var(--ink-2)]">
            Perkiraan waktu belajar ± {approxMinutes} menit · {passedWorlds.length} dunia lulus.
          </p>
        </div>

        <div className="pw-card p-5 space-y-3">
          <span className="pw-kicker">PENGATURAN ANAK</span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={profile.mode === 'junior' ? 'primary' : 'secondary'}
              onClick={() => updateProfileMode('junior')}
            >
              Mode Junior
            </Button>
            <Button
              variant={profile.mode === 'pro' ? 'primary' : 'secondary'}
              onClick={() => updateProfileMode('pro')}
            >
              Mode Pro
            </Button>
          </div>
          <div className="flex gap-2">
            {([2, 3, 5] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => updateSettings({ weeklyTarget: t })}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold cursor-pointer ${
                  profile.settings.weeklyTarget === t ? 'border-[var(--world-600)] bg-[var(--world-50)]' : 'border-[var(--line)]'
                }`}
              >
                Target {t} hari/minggu
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kemajuan per Dunia (Tes Awal -> Tes Akhir -> 7 Hari) (§7.10) */}
      <section className="pw-card p-5 space-y-4">
        <h2 className="pw-h3">Kemajuan Terukur per Dunia (Awal · Akhir · 7 Hari)</h2>
        {assessedWorlds.length === 0 ? (
          <p className="pw-small text-[var(--ink-2)]">
            Belum ada dunia yang selesai diukur. Grafik akan muncul setelah pelajar mengerjakan Tes Awal / Akhir.
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
                <div key={world.id} className="rounded-xl border border-[var(--line)] bg-[var(--cream)] p-4 space-y-2">
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
      <section className="pw-card p-5 space-y-4">
        <h2 className="pw-h3">Konsep yang Perlu Dibantu & Bahan Obrolan Tanpa Layar</h2>
        {topMistakeTags.length === 0 ? (
          <p className="pw-small text-[var(--ink-2)]">
            Belum ada catatan kesalahan soal. Berikut contoh bahan obrolan untuk dunia awal:
          </p>
        ) : (
          <div className="space-y-3">
            {topMistakeTags.map(([tag, count]) => {
              const matchingLesson = ALL_LESSONS.find((l) => l.introducesTerms.includes(tag));
              return (
                <div key={tag} className="rounded-xl border border-[var(--line)] p-3.5 space-y-1.5">
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
        <div className="rounded-xl bg-[var(--cream)] p-3.5 text-xs space-y-1">
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
        <section className="pw-card p-5 space-y-3">
          <h2 className="pw-h3">Cetak Sertifikat Dunia</h2>
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
