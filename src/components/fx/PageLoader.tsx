import React, { useEffect, useState } from 'react';
import { Bito } from '@/components/mascot/Bito';
import { useMotionPrefs } from '@/motion/prefs';

/**
 * Suspense fallback and lesson fetch (M14). Nothing is shown for 150 ms, then a 120 ms fade. Bito bobs
 * (900 ms loop, 4 px) next to a parcel on a dashed line whose dashes march (600 ms, linear). Under reduced
 * motion the CSS contract stops the loops: a still Bito and the text. After 3 s the loops stop and the text
 * becomes a patience message. `aria-busy` marks the region.
 */
export const PageLoader: React.FC<{ label?: string }> = ({ label = 'Bito sedang mengantar halaman…' }) => {
  const { mode } = useMotionPrefs();
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSlow(true), 3000);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <div
      role="status"
      aria-busy="true"
      aria-live="polite"
      data-slow={slow ? '' : undefined}
      className="pw-loader flex min-h-[50dvh] flex-1 flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <div className="pw-loader-bob">
        <Bito expression="idle" size={mode === 'pro' ? 96 : 112} />
      </div>
      <svg width="180" height="28" viewBox="0 0 180 28" fill="none" aria-hidden="true" className="text-[var(--doodle)]">
        <rect x="4" y="6" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="2.5" />
        <path d="M12 6 V20 M4 13 H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path
          className="pw-loader-dash"
          d="M30 14 H176"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <p className="pw-body m-0 text-[var(--ink-2)]">{slow ? 'Sebentar ya, sedang menyiapkan…' : label}</p>
    </div>
  );
};
