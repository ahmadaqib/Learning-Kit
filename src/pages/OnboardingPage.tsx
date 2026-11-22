import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Mode } from '@/content/schema';
import { Bito } from '@/components/mascot/Bito';
import { AVATAR_LIST, CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { Button } from '@/components/ui/Button';
import { markUserInteraction, playSound } from '@/engine/sound';
import { useAppStore } from '@/store/useAppStore';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const createProfile = useAppStore((s) => s.createProfile);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('kurir');
  const [mode, setMode] = useState<Mode>('junior');
  const [weeklyTarget, setWeeklyTarget] = useState<2 | 3 | 5>(3);

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
      navigate('/beranda', { replace: true });
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-64px)] max-w-[560px] flex-col justify-between px-5 py-6">
      <div className="flex justify-center gap-2 pt-2" aria-label={`Langkah ${step} dari 3`}>
        {[1, 2, 3].map((idx) => (
          <span
            key={idx}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              idx === step ? 'w-10 bg-[var(--world-600)]' : 'w-2.5 bg-[var(--line)]'
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div key="step-1" className="pw-anim-pop my-auto flex flex-col items-center text-center space-y-4 py-6">
          <div className="pw-float">
            <Bito expression="wave" size={160} decorative={false} />
          </div>
          <h1 className="pw-display">Halo! Aku Bito.</h1>
          <p className="pw-body-l pw-prose text-[var(--ink-2)]">
            Aku kurir pesan di dunia web. Ayo kita jelajahi cara website dibuat dan cara aplikasi saling bicara lewat cerita seru!
          </p>
        </div>
      )}

      {step === 2 && (
        <div key="step-2" className="pw-anim-pop my-auto space-y-6 py-4">
          <div className="text-center">
            <h1 className="pw-h1">Siapa namamu?</h1>
            <p className="pw-small mt-1 text-[var(--ink-2)]">
              Hanya disimpan di perangkat ini saja (maksimal 12 huruf).
            </p>
          </div>

          <div>
            <label htmlFor="nickname-input" className="block pw-small font-bold mb-1.5">
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
              className="w-full rounded-[var(--radius-md)] border-2 border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-[var(--ink)] font-bold transition-colors focus:border-[var(--world-600)]"
            />
          </div>

          <div>
            <span className="block pw-small font-bold mb-2.5">Pilih karakter avatarmu:</span>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {AVATAR_LIST.map((item) => {
                const selected = avatar === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectWithFeedback(() => setAvatar(item.id))}
                    aria-label={`${item.label} — ${item.subtitle}`}
                    aria-pressed={selected}
                    className={`pw-card pw-pressable relative flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-2.5 text-center cursor-pointer ${
                      selected
                        ? 'pw-squish-pop border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_4px_0_var(--world-700)]'
                        : 'border-[var(--line)] bg-[var(--paper)] hover:border-[var(--world-600)]'
                    }`}
                  >
                    {selected && (
                      <span
                        aria-hidden="true"
                        className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--world-600)] text-white"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    )}
                    <CharacterAvatar avatarId={item.id} size={56} />
                    <span className="text-xs font-extrabold leading-tight text-[var(--ink)]">
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
        <div key="step-3" className="pw-anim-pop my-auto space-y-6 py-4">
          <div className="text-center">
            <h1 className="pw-h1">Pilih mode belajarmu</h1>
            <p className="pw-small mt-1 text-[var(--ink-2)]">
              Bisa diganti lagi nanti di Pengaturan.
            </p>
          </div>

          <div className="grid gap-3.5">
            {[
              {
                id: 'junior' as const,
                title: 'Masih SD (Mode Junior)',
                desc: 'Kalimat pendek, huruf lebih besar, tanpa mengetik kode, dan tombol Bacakan selalu siap.',
                badge: 'Ramah Anak',
              },
              {
                id: 'pro' as const,
                title: 'SMP ke atas / Pemula (Mode Pro)',
                desc: 'Seluruh 113 pelajaran lengkap beserta contoh kode HTML, CSS, JavaScript, dan API.',
                badge: 'Kode Lengkap',
              },
            ].map((opt) => {
              const selected = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectWithFeedback(() => setMode(opt.id))}
                  aria-pressed={selected}
                  className={`pw-card pw-pressable w-full p-4 text-left border-2 cursor-pointer ${
                    selected
                      ? 'pw-squish-pop border-[var(--world-600)] bg-[var(--world-50)] shadow-[0_4px_0_var(--world-700)]'
                      : 'border-[var(--line)] bg-[var(--paper)] hover:border-[var(--world-600)]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="pw-h3 flex items-center gap-2">
                      {selected && <Sparkles className="h-4 w-4 text-[var(--world-700)]" aria-hidden="true" />}
                      <span>{opt.title}</span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold whitespace-nowrap ${
                        selected
                          ? 'bg-[var(--world-600)] text-[var(--world-btn-text)]'
                          : 'bg-[var(--cream)] text-[var(--ink-2)]'
                      }`}
                    >
                      {selected ? '✓ Dipilih' : opt.badge}
                    </span>
                  </div>
                  <p className="pw-small mt-1.5 text-[var(--ink-2)]">{opt.desc}</p>
                </button>
              );
            })}
          </div>

          <div>
            <span className="block pw-small font-bold mb-2">Target hari belajar tiap minggu:</span>
            <div className="grid grid-cols-3 gap-2.5">
              {([2, 3, 5] as const).map((days) => {
                const selected = weeklyTarget === days;
                return (
                  <button
                    key={days}
                    type="button"
                    onClick={() => handleSelectWithFeedback(() => setWeeklyTarget(days))}
                    aria-pressed={selected}
                    className={`pw-pressable min-h-[52px] rounded-[var(--radius-md)] border-2 font-extrabold cursor-pointer ${
                      selected
                        ? 'pw-squish-pop border-[var(--world-600)] bg-[var(--world-50)] text-[var(--world-700)] shadow-[0_3px_0_var(--world-700)]'
                        : 'border-[var(--line)] bg-[var(--paper)] shadow-[0_2px_0_var(--line)] hover:border-[var(--world-600)]'
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

      <div className="space-y-2 pw-safe-bottom pt-4">
        {step < 3 ? (
          <Button
            variant="primary"
            fullWidth
            soundEnabled
            onClick={() => setStep((step + 1) as 2 | 3)}
          >
            {step === 1 ? 'Ayo mulai' : 'Lanjut →'}
          </Button>
        ) : (
          <Button variant="primary" fullWidth soundEnabled onClick={handleFinish}>
            Masuk ke Petualangan! →
          </Button>
        )}
        {step > 1 && (
          <Button variant="ghost" fullWidth soundEnabled onClick={() => setStep((step - 1) as 1 | 2)}>
            ← Kembali
          </Button>
        )}
      </div>
    </div>
  );
};
