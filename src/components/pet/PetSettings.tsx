import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PET_IDS, PET_PERSONALITIES, type PetPersonality } from '@/content/petContract';
import { getPetId, getPetPersonality, PET_DETAILS, PET_PERSONALITY_LABELS } from '@/content/petTips';
import { useAppStore } from '@/store/useAppStore';
import { PetPortrait } from './PetPortrait';

export function PetSettings() {
  const mode = useAppStore((s) => s.profiles[s.activeProfileId]?.mode);
  const settings = useAppStore((s) => s.profiles[s.activeProfileId]?.settings);
  const updateSettings = useAppStore((s) => s.updateSettings);
  const { hash, key } = useLocation();
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hash === '#pet') section.current?.focus();
  }, [hash, key]);

  if (!mode || !settings) return null;

  const selected = getPetId(settings.petId);
  const personality = getPetPersonality(mode, settings.petPersonality);

  return (
    <section
      id="pet"
      ref={section}
      tabIndex={-1}
      aria-labelledby="pet-settings-heading"
      className="pw-card scroll-mt-4 space-y-4 p-[var(--space-card)]"
    >
      <h2 id="pet-settings-heading" className="pw-h3">Hewan pendamping</h2>

      <fieldset className="min-w-0 space-y-2">
        <legend className="pw-small font-extrabold">Pilih hewan</legend>
        <div className="grid grid-cols-2 gap-2 min-[440px]:grid-cols-3 sm:grid-cols-5">
          {PET_IDS.map((id) => (
            <label key={id} className="min-w-0 cursor-pointer">
              <input
                type="radio"
                name="pet-id"
                className="peer sr-only"
                value={id}
                checked={selected === id}
                onChange={() => updateSettings({ petId: id })}
              />
              <span className="flex h-full min-w-0 flex-col items-center justify-start gap-1 rounded-[var(--radius-md)] border border-[var(--line-strong)] p-2 text-center peer-checked:border-[var(--world-700)] peer-checked:bg-[var(--world-50)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--world-700)]">
                <PetPortrait petId={id} size={42} />
                <span className="pw-small font-extrabold">{PET_DETAILS[id].name}</span>
                <span className="pw-small text-[var(--ink-2)]">{PET_DETAILS[id].species}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-wrap items-center justify-between gap-2">
        <span className="pw-small font-extrabold">Kepribadian</span>
        <select
          value={personality}
          onChange={(event) => updateSettings({ petPersonality: event.currentTarget.value as PetPersonality })}
          className="min-h-11 max-w-full rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--paper)] px-3 font-bold text-[var(--ink)]"
        >
          {PET_PERSONALITIES.map((id) => <option key={id} value={id}>{PET_PERSONALITY_LABELS[id]}</option>)}
        </select>
      </label>

      <div className="flex flex-col gap-1 border-t border-[var(--line)] pt-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 font-bold">
          <input
            type="checkbox"
            checked={settings.petMuted === true}
            onChange={(event) => updateSettings({ petMuted: event.currentTarget.checked })}
            className="h-5 w-5 shrink-0 accent-[var(--world-700)]"
          />
          Bisukan hewan pendamping
        </label>
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 font-bold">
          <input
            type="checkbox"
            checked={settings.petHidden === true}
            onChange={(event) => updateSettings({ petHidden: event.currentTarget.checked })}
            className="h-5 w-5 shrink-0 accent-[var(--world-700)]"
          />
          Sembunyikan hewan pendamping
        </label>
        <p className="pw-small m-0 text-[var(--ink-2)]">Tombol Fokus menyembunyikan hewan sementara saat belajar.</p>
      </div>
    </section>
  );
}
