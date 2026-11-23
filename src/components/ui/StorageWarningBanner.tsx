import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { hasStorageError } from '@/store/useAppStore';

export const StorageWarningBanner: React.FC = () => {
  if (!hasStorageError()) return null;

  return (
    <div
      role="alert"
      className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-[var(--radius-md)] border-2 border-dashed border-[var(--warn-500)] bg-[var(--warn-50)] px-4 py-2 text-[var(--ink)]"
    >
      <div className="flex items-center gap-2.5 py-1">
        <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[var(--warn-700)]" aria-hidden="true" />
        <p className="pw-small m-0 font-semibold">
          Progres belum bisa disimpan di browser ini. Ekspor progresmu secara berkala.
        </p>
      </div>
      <Link
        to="/profil"
        className="pw-small inline-flex min-h-[var(--touch-min)] items-center rounded-[var(--radius-xs)] font-extrabold text-[var(--world-700)] underline underline-offset-4"
      >
        Ke Profil →
      </Link>
    </div>
  );
};
