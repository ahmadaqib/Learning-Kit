import React from 'react';

interface BrandLogoProps {
  size?: number;
  className?: string;
}

/**
 * Logo vektor resmi Petualang Web (PW) — ramah, ekspresif, dan tajam di segala ukuran.
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
      <rect x="4" y="6" width="56" height="54" rx="18" fill="#1F2340" />
      <rect x="4" y="3" width="56" height="54" rx="18" fill="#E4572E" stroke="#1F2340" strokeWidth="2.5" />

      {/* Aksen lengkung cahaya di dalam lencana */}
      <path d="M12 15 C18 9, 46 9, 52 15" stroke="#FF8D6B" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />

      {/* Antena kurir bersinar */}
      <line x1="32" y1="6" x2="32" y2="12" stroke="#1F2340" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="32" cy="5.5" r="3.2" fill="#F5B400" stroke="#1F2340" strokeWidth="1.8" />

      {/* Kepala Bito ceria */}
      <rect x="14" y="13" width="36" height="27" rx="10" fill="#FFFFFF" stroke="#1F2340" strokeWidth="2.4" />
      <rect x="19" y="18" width="26" height="14" rx="5.5" fill="#1F2340" />

      {/* Mata bahagia melengkung */}
      <path d="M23.5 25 C24.8 22.4, 27.8 22.4, 29 25" stroke="#F5B400" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M35 25 C36.2 22.4, 39.2 22.4, 40.5 25" stroke="#F5B400" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* Pipi imut & senyum kecil */}
      <circle cx="20.5" cy="35.5" r="2.2" fill="#FF9E8A" />
      <circle cx="43.5" cy="35.5" r="2.2" fill="#FF9E8A" />
      <path d="M28.5 34.8 Q32 38 35.5 34.8" stroke="#1F2340" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      {/* Pita inisial PW di bagian bawah */}
      <rect x="14" y="42" width="36" height="14" rx="7" fill="#1F2340" stroke="#FFFFFF" strokeWidth="1.8" />
      <text
        x="32"
        y="52"
        textAnchor="middle"
        fontSize="10"
        fontWeight="900"
        fill="#F5B400"
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
        letterSpacing="1"
      >
        PW
      </text>
    </svg>
  );
};
