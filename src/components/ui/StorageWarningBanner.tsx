import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasStorageError } from '@/store/useAppStore';

export const StorageWarningBanner: React.FC = () => {
  if (!hasStorageError()) return null;

  return (
    <div
      role="alert"
      className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-md)] border-2 border-[var(--warn-500)] bg-[var(--warn-50)] px-4 py-3 text-[var(--ink)]"
    >
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[var(--warn-700)]" aria-hidden="true" />
        <p className="pw-small font-semibold">
          Progres tidak bisa disimpan otomatis di browser ini. Gunakan Ekspor progres secara berkala.
        </p>
      </div>
      <Link to="/profil" className="pw-small font-extrabold text-[var(--world-700)] underline">
        Ke Profil →
      </Link>
    </div>
  );
};
