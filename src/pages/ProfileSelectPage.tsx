import React, { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { levelLabel, MODE_LABEL } from '@/app/modeConfig';
import { Bito } from '@/components/mascot/Bito';
import { AVATAR_MAP, CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { StorageWarningBanner } from '@/components/ui/StorageWarningBanner';
import { getLevelFromXp } from '@/engine/scoring';
import { stickerTilt } from '@/motion/tokens';
import { MAX_PROFILES, useAppStore } from '@/store/useAppStore';

export { AVATAR_MAP };

/** Profile deal-in start times (M42): 0, 60, 110, 150 ms, then +30 ms per card up to 240 ms. */
function dealStart(index: number): number {
  const first = [0, 60, 110, 150];
  return index < first.length ? first[index] : Math.min(150 + (index - 3) * 30, 240);
}

const dealStyle = (index: number, extra?: Record<string, string>) =>
  ({ '--at': `${dealStart(index)}ms`, ...extra }) as React.CSSProperties;

export const ProfileSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const profiles = useAppStore((s) => s.profiles);
  const activeProfileId = useAppStore((s) => s.activeProfileId);
  const selectProfile = useAppStore((s) => s.selectProfile);

  const profileList = Object.values(profiles);

  useEffect(() => {
    if (profileList.length === 0) {
      navigate('/mulai', { replace: true });
    } else if (profileList.length === 1 && activeProfileId) {
      navigate('/beranda', { replace: true });
    }
  }, [profileList.length, activeProfileId, navigate]);

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-[600px] flex-col justify-center px-[var(--screen-pad,1.25rem)] py-8">
      <StorageWarningBanner />
      <div className="mb-[var(--gap-group,1.5rem)] flex flex-col items-center text-center">
        <Bito expression="idle" size={96} idle />
        <h1 className="pw-h1 mt-3">Siapa yang mau belajar?</h1>
        <p className="pw-small mt-1 text-[var(--ink-2)]">
          Semua kemajuan tersimpan aman di perangkat ini saja (paling banyak {MAX_PROFILES} profil).
        </p>
      </div>

      {/* The only entrance on this screen: the route wrapper adds none here (M42) */}
      <ul className="grid list-none grid-cols-1 gap-[var(--gap-stack)] p-0 min-[360px]:grid-cols-2">
        {profileList.map((p, i) => {
          const lvl = getLevelFromXp(p.xp, p.mode);
          return (
            <li
              key={p.id}
              data-enter="deal"
              className="pw-enter pw-sticker bg-[var(--paper)]"
              style={dealStyle(i, { '--tilt': `${stickerTilt(i)}deg` })}
            >
              <button
                type="button"
                onClick={() => {
                  selectProfile(p.id);
                  navigate('/beranda');
                }}
                data-press="lg"
                className="pw-pressable flex min-h-[var(--touch-min)] w-full cursor-pointer flex-col items-center gap-2 rounded-[inherit] p-[var(--space-card)] text-center"
              >
                <CharacterAvatar avatarId={p.avatar} size={72} />
                <span className="pw-h3 max-w-full break-words">{p.nickname || MODE_LABEL.junior}</span>
                <span className="pw-small text-[var(--ink-2)]">
                  {MODE_LABEL[p.mode]} · {levelLabel(lvl.level, p.mode)}
                </span>
              </button>
            </li>
          );
        })}

        {profileList.length < MAX_PROFILES && (
          <li data-enter="deal" className="pw-enter" style={dealStyle(profileList.length)}>
            <button
              type="button"
              onClick={() => navigate('/mulai')}
              data-press="lg"
              className="pw-pressable pw-t-colors flex h-full min-h-[11rem] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--line-strong)] p-[var(--space-card)] text-center text-[var(--ink-2)] hover:border-[var(--world-600)] hover:text-[var(--ink)]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-dashed border-[var(--line-strong)]">
                <Plus className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="pw-h3">Tambah profil</span>
              <span className="pw-small">
                {profileList.length} dari {MAX_PROFILES}
              </span>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
