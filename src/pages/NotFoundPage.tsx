import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bito } from '@/components/mascot/Bito';
import { Button } from '@/components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-[520px] flex-col items-center justify-center px-5 py-8 text-center space-y-5">
      <Bito expression="think" size={160} decorative={false} />
      <h1 className="pw-h1">Peta ini tidak ada</h1>
      <p className="pw-body text-[var(--ink-2)]">
        Sepertinya Bito salah belok. Alamat halaman ini tidak ditemukan di peta Petualang Web.
      </p>
      <Button variant="primary" onClick={() => navigate('/beranda')}>
        Kembali ke Beranda →
      </Button>
    </div>
  );
};
