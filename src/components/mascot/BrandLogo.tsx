import React from 'react';
import { BITO_COLORS } from './Bito';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

/** The brand orange is Bito's default colour: one source for it, in Bito.tsx. */
const BRAND = BITO_COLORS[0].id;
const BRAND_LIGHT = `color-mix(in srgb, ${BRAND}, white 38%)`;
const CHEEK = `color-mix(in srgb, ${BRAND}, white 55%)`;

/**
 * Logo vektor resmi Petualang Web (PW) — ramah, ekspresif, dan tajam di segala ukuran.
 * Badge oranye tetap oranye di mode gelap. Garis dan badan Bito mengikuti tema lewat token --bito-* dan --illus-*.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 48, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`flex-shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Bayangan lembut & bingkai membulat */}
      <rect x="4" y="6" width="56" height="54" rx="18" fill="var(--bito-screen)" />
      <rect x="4" y="3" width="56" height="54" rx="18" fill={BRAND} stroke="var(--illus-line)" strokeWidth="2.5" />

      {/* Aksen lengkung cahaya di dalam lencana */}
      <path d="M12 15 C18 9, 46 9, 52 15" stroke={BRAND_LIGHT} strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />

      {/* Antena kurir bersinar */}
      <line x1="32" y1="6" x2="32" y2="12" stroke="var(--illus-line)" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="32" cy="5.5" r="3.2" fill="var(--bito-eye)" stroke="var(--illus-line)" strokeWidth="1.8" />

      {/* Kepala Bito ceria */}
      <rect x="14" y="13" width="36" height="27" rx="10" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2.4" />
      <rect x="19" y="18" width="26" height="14" rx="5.5" fill="var(--bito-screen)" />

      {/* Mata bahagia melengkung */}
      <path d="M23.5 25 C24.8 22.4, 27.8 22.4, 29 25" stroke="var(--bito-eye)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M35 25 C36.2 22.4, 39.2 22.4, 40.5 25" stroke="var(--bito-eye)" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* Pipi imut & senyum kecil */}
      <circle cx="20.5" cy="35.5" r="2.2" fill={CHEEK} />
      <circle cx="43.5" cy="35.5" r="2.2" fill={CHEEK} />
      <path d="M28.5 34.8 Q32 38 35.5 34.8" stroke="var(--illus-line)" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Pita inisial PW di bagian bawah */}
      <rect x="14" y="42" width="36" height="14" rx="7" fill="var(--bito-screen)" stroke="var(--on-boss)" strokeWidth="1.8" />
      <text
        x="32"
        y="52"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="var(--bito-eye)"
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        PW
      </text>
    </svg>
  );
};
