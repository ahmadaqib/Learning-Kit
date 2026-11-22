import React from 'react';
import type { MascotCustom } from '@/content/schema';

export type BitoExpression = 'idle' | 'happy' | 'think' | 'cheer' | 'wave' | 'sleep';

interface BitoProps {
  expression?: BitoExpression;
  size?: 48 | 96 | 112 | 128 | 160;
  custom?: MascotCustom;
  className?: string;
  decorative?: boolean;
}

export const BITO_COLORS = [
  { id: '#E4572E', label: 'Oranye Kurir' },
  { id: '#2F6FED', label: 'Biru Bengkel' },
  { id: '#2BA84A', label: 'Hijau Hutan' },
  { id: '#6C5CE7', label: 'Ungu Studio' },
  { id: '#0E9AA7', label: 'Toska Pulau' },
  { id: '#D6336C', label: 'Merah Muda Galeri' },
] as const;

export const Bito: React.FC<BitoProps> = ({
  expression = 'idle',
  size = 96,
  custom = { color: '#E4572E', accessory: 'none' },
  className = '',
  decorative = true,
}) => {
  const accent = custom.color || '#E4572E';

  const renderEyes = () => {
    if (expression === 'happy' || expression === 'cheer') {
      return (
        <>
          <path d="M36 47 C38 43, 43 43, 45 47" stroke="#F5B400" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <path d="M55 47 C57 43, 62 43, 64 47" stroke="#F5B400" strokeWidth="3.2" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (expression === 'sleep') {
      return (
        <>
          <path d="M36 47 H44" stroke="#8C91BA" strokeWidth="3" strokeLinecap="round" />
          <path d="M56 47 H64" stroke="#8C91BA" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    }
    if (expression === 'think') {
      return (
        <>
          <circle cx="41" cy="46" r="3.5" fill="#F5B400" />
          <circle cx="60" cy="44" r="2.5" fill="#F5B400" />
        </>
      );
    }
    return (
      <>
        <circle cx="40.5" cy="46.5" r="3.6" fill="#F5B400" />
        <circle cx="59.5" cy="46.5" r="3.6" fill="#F5B400" />
      </>
    );
  };

  const renderMouth = () => {
    switch (expression) {
      case 'happy':
      case 'cheer':
        return <path d="M40 62 Q50 70 60 62" stroke="#1F2340" strokeWidth="3" strokeLinecap="round" fill="none" />;
      case 'think':
        return <path d="M44 64 Q50 61 56 64" stroke="#1F2340" strokeWidth="2.8" strokeLinecap="round" fill="none" />;
      case 'sleep':
        return <circle cx="50" cy="64" r="3" fill="#1F2340" />;
      default:
        return <path d="M42 62 Q50 67 58 62" stroke="#1F2340" strokeWidth="2.8" strokeLinecap="round" fill="none" />;
    }
  };

  const ariaProps = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': `Maskot Bito berekspresi ${expression}` };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      {...ariaProps}
    >
      {/* Antena kurir */}
      <line x1="50" y1="12" x2="50" y2="23" stroke="#1F2340" strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="10" r="4.5" fill="#F5B400" stroke="#1F2340" strokeWidth="2" />

      {/* Lengan melambai / ceria */}
      {expression === 'wave' || expression === 'cheer' ? (
        <path
          d="M21 52 Q10 42 15 30"
          stroke="#1F2340"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      ) : (
        <path d="M21 55 Q13 58 14 66" stroke="#1F2340" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      )}

      {expression === 'cheer' ? (
        <path d="M79 52 Q90 42 85 30" stroke="#1F2340" strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M79 55 Q87 58 86 66" stroke="#1F2340" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      )}

      {/* Badan kotak paket membulat */}
      <rect
        x="21"
        y="23"
        width="58"
        height="54"
        rx="15"
        fill="#FFFFFF"
        stroke="#1F2340"
        strokeWidth="3"
      />

      {/* Tali tas selempang */}
      <path d="M24 62 L76 34" stroke={accent} strokeWidth="6" strokeLinecap="round" opacity="0.9" />

      {/* Layar wajah */}
      <rect x="30" y="34" width="40" height="22" rx="7" fill="#1F2340" />
      {renderEyes()}
      {renderMouth()}

      {/* Aksesori kustom v1.1 */}
      {custom.accessory === 'cap' && (
        <g>
          <path d="M31 25 C31 15, 69 15, 69 25 Z" fill={accent} stroke="#1F2340" strokeWidth="2.4" />
          <path d="M26 25 H76" stroke="#1F2340" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {custom.accessory === 'glasses' && (
        <g>
          <rect x="33" y="40" width="14" height="11" rx="3" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
          <rect x="53" y="40" width="14" height="11" rx="3" stroke="#FFFFFF" strokeWidth="2.2" fill="none" />
          <line x1="47" y1="45" x2="53" y2="45" stroke="#FFFFFF" strokeWidth="2.2" />
        </g>
      )}
      {custom.accessory === 'scarf' && (
        <g>
          <rect x="23" y="71" width="54" height="9" rx="4.5" fill={accent} stroke="#1F2340" strokeWidth="2" />
          <path d="M60 76 L67 89 L56 89 Z" fill={accent} stroke="#1F2340" strokeWidth="2" />
        </g>
      )}

      {/* Kaki */}
      <rect x="34" y="77" width="10" height="9" rx="4" fill="#1F2340" />
      <rect x="56" y="77" width="10" height="9" rx="4" fill="#1F2340" />
    </svg>
  );
};
