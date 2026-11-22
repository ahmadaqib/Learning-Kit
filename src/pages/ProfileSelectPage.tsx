import React, { useEffect } from 'react';
import { Plus, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Bito } from '@/components/mascot/Bito';
import { AVATAR_MAP, CharacterAvatar } from '@/components/mascot/CharacterAvatar';
import { Button } from '@/components/ui/Button';
import { StorageWarningBanner } from '@/components/ui/StorageWarningBanner';
import { getLevelFromXp } from '@/engine/scoring';
import { MAX_PROFILES, useAppStore } from '@/store/useAppStore';

export { AVATAR_MAP };

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
    <div className="mx-auto flex min-h-[100dvh] max-w-[600px] flex-col justify-center px-5 py-8">
      <StorageWarningBanner />
      <div className="mb-6 flex flex-col items-center text-center">
        <Bito expression="wave" size={96} />
        <h1 className="pw-h1 mt-3">Siapa yang mau belajar?</h1>
        <p className="pw-small mt-1 text-[var(--ink-2)]">
          Semua kemajuan tersimpan aman di perangkat ini saja (maksimal 4 profil).
        </p>
      </div>

      <div className="space-y-3">
        {profileList.map((p) => {
          const lvl = getLevelFromXp(p.xp, p.mode);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                selectProfile(p.id);
                navigate('/beranda');
              }}
              className="pw-card pw-pressable flex min-h-[76px] w-full items-center justify-between gap-4 p-4 text-left hover:border-[var(--world-600)] cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <CharacterAvatar avatarId={p.avatar} size={52} />
                <div>
                  <div className="pw-h3">{p.nickname || 'Petualang'}</div>
                  <div className="pw-small text-[var(--ink-2)]">
                    Mode {p.mode === 'junior' ? 'Junior' : 'Pro'} · Lv {lvl.level} ({p.xp} XP)
                  </div>
                </div>
              </div>
              <UserCheck className="h-5 w-5 text-[var(--world-700)]" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {profileList.length < MAX_PROFILES && (
        <div className="mt-6">
          <Button variant="primary" fullWidth onClick={() => navigate('/mulai')}>
            <Plus className="h-5 w-5" aria-hidden="true" />
            Tambah Profil Baru ({profileList.length}/{MAX_PROFILES})
          </Button>
        </div>
      )}
    </div>
  );
};
