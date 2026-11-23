import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bito } from '@/components/mascot/Bito';
import { Button } from '@/components/ui/Button';
import { useAppStore } from '@/store/useAppStore';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const mode = useAppStore((s) => s.profiles[s.activeProfileId]?.mode);
  const pro = mode === 'pro';

  return (
    <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col items-center justify-center gap-[var(--gap-stack)] px-[var(--screen-pad)] py-8 text-center">
      <div className="pw-stage flex items-center justify-center p-6">
        <Bito expression="think" size={128} decorative={false} />
      </div>
      <h1 className="pw-h1">{pro ? 'Halaman tidak ditemukan' : 'Peta ini tidak ada'}</h1>
      <p className="pw-body m-0 text-[var(--ink-2)]">
        {pro
          ? 'Alamat ini tidak ada di Petualang Web. Kembali ke Beranda untuk melanjutkan.'
          : 'Sepertinya Bito salah belok. Alamat halaman ini tidak ada di peta Petualang Web.'}
      </p>
      <Button variant="primary" data-sfx="back" onClick={() => navigate('/beranda')}>
        Kembali ke Beranda →
      </Button>
    </div>
  );
};
