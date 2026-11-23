import React from 'react';

export interface CharacterAvatarInfo {
  id: string;
  label: string;
  subtitle: string;
  bg: string;
  bgSoft: string;
  ring: string;
}

/**
 * The named palette: each avatar's background, soft background and ring are content, not theme, so they stay
 * as hex values here (spec 4.9). The skin, hair and clothing colours inside the art below are content too.
 * Only outlines (`--illus-line`), details drawn in the dark ink (`--bito-screen`) and large neutral fills
 * (`--bito-body`) follow the theme.
 */
export const AVATAR_LIST: CharacterAvatarInfo[] = [
  {
    id: 'kurir',
    label: 'Bito Kurir',
    subtitle: 'Si pengantar paket web',
    bg: '#E4572E',
    bgSoft: '#FCE3DB',
    ring: '#B83D18',
  },
  {
    id: 'roket',
    label: 'Kapten Roket',
    subtitle: 'Penjelajah orbit cepat',
    bg: '#2F6FED',
    bgSoft: '#DCE8FF',
    ring: '#1E4DB5',
  },
  {
    id: 'daun',
    label: 'Rimba HTML',
    subtitle: 'Penjaga struktur pohon',
    bg: '#2BA84A',
    bgSoft: '#DCF5E2',
    ring: '#1C7432',
  },
  {
    id: 'kuas',
    label: 'Mochi CSS',
    subtitle: 'Perancang warna ceria',
    bg: '#6C5CE7',
    bgSoft: '#E7E3FF',
    ring: '#4B3CB8',
  },
  {
    id: 'kompas',
    label: 'Nakhoda Peta',
    subtitle: 'Pemandu arah rute',
    bg: '#0E9AA7',
    bgSoft: '#D7F4F7',
    ring: '#096E78',
  },
  {
    id: 'bintang',
    label: 'Nova Juara',
    subtitle: 'Pengejar target harian',
    bg: '#D99A00',
    bgSoft: '#FFF3CC',
    ring: '#9E6E00',
  },
  {
    id: 'buku',
    label: 'Penyihir Kode',
    subtitle: 'Pembaca mantra logika',
    bg: '#D6336C',
    bgSoft: '#FCE0EB',
    ring: '#A31F4E',
  },
  {
    id: 'perisai',
    label: 'Ksatria API',
    subtitle: 'Penjaga gerbang aman',
    bg: '#262C52',
    bgSoft: '#E3E6F4',
    ring: '#1F2340',
  },
];

export const AVATAR_MAP: Record<string, CharacterAvatarInfo> = Object.fromEntries(
  AVATAR_LIST.map((item) => [item.id, item]),
);

interface CharacterAvatarProps {
  avatarId: string;
  size?: number;
  className?: string;
  decorative?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  avatarId,
  size = 56,
  className = '',
  decorative = true,
}) => {
  const info = AVATAR_MAP[avatarId] ?? AVATAR_MAP.kurir;
  const id = info.id;

  const ariaProps = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': `Karakter ${info.label}` };

  const renderCharacterArt = () => {
    switch (id) {
      case 'roket':
        return (
          <g>
            {/* Helm luar angkasa */}
            <circle cx="40" cy="42" r="21" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2.6" />
            {/* Sirip roket di topi */}
            <path d="M40 12 L47 23 H33 Z" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Visor kaca */}
            <rect x="24" y="31" width="32" height="20" rx="10" fill="var(--bito-screen)" />
            {/* Pantulan kaca */}
            <path d="M29 36 C32 34, 37 34, 40 35" stroke="#7CC4FF" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
            {/* Mata bersinar */}
            <circle cx="33.5" cy="41.5" r="3" fill="#7CC4FF" />
            <circle cx="46.5" cy="41.5" r="3" fill="#7CC4FF" />
            {/* Senyum kecil */}
            <path d="M36.5 55 Q40 58 43.5 55" stroke="var(--bito-screen)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            {/* Kerah baju */}
            <path d="M25 63 C29 58, 51 58, 55 63" stroke="#E4572E" strokeWidth="4" strokeLinecap="round" />
            <circle cx="54" cy="24" r="2.2" fill="#FFFFFF" />
          </g>
        );

      case 'daun':
        return (
          <g>
            {/* Tunas daun kembar */}
            <path d="M40 23 C33 13, 22 14, 24 23 C28 26, 36 25, 40 23 Z" fill="#7CE38B" stroke="var(--illus-line)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M40 23 C47 13, 58 14, 56 23 C52 26, 44 25, 40 23 Z" fill="#A6F4B1" stroke="var(--illus-line)" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Kepala bulat lembut */}
            <circle cx="40" cy="44" r="20" fill="#F3FFF4" stroke="var(--illus-line)" strokeWidth="2.6" />
            {/* Pipi merona */}
            <circle cx="29" cy="48" r="3.4" fill="#FFA4A4" opacity="0.7" />
            <circle cx="51" cy="48" r="3.4" fill="#FFA4A4" opacity="0.7" />
            {/* Mata bahagia melengkung */}
            <path d="M30 42 C31.5 39, 35 39, 36.5 42" stroke="var(--bito-screen)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <path d="M43.5 42 C45 39, 48.5 39, 50 42" stroke="var(--bito-screen)" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            {/* Senyum ceria */}
            <path d="M35 49 Q40 54 45 49" stroke="var(--bito-screen)" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            {/* Lencana kode HTML */}
            <rect x="30" y="57" width="20" height="10" rx="5" fill="#1C7432" stroke="var(--illus-line)" strokeWidth="1.8" />
            <text x="40" y="64.5" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#FFFFFF" fontFamily="monospace">
              &lt;/&gt;
            </text>
          </g>
        );

      case 'kuas':
        return (
          <g>
            {/* Kepala */}
            <circle cx="40" cy="46" r="19" fill="#FFF7F2" stroke="var(--illus-line)" strokeWidth="2.6" />
            {/* Topi baret seniman */}
            <path d="M20 35 C22 20, 56 17, 61 32 C55 37, 26 38, 20 35 Z" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M41 21 L44 15" stroke="var(--bito-screen)" strokeWidth="2.6" strokeLinecap="round" />
            {/* Mata berkilau */}
            <circle cx="33.5" cy="45" r="3.1" fill="var(--bito-screen)" />
            <circle cx="46.5" cy="45" r="3.1" fill="var(--bito-screen)" />
            <circle cx="34.5" cy="43.8" r="1.1" fill="#FFFFFF" />
            <circle cx="47.5" cy="43.8" r="1.1" fill="#FFFFFF" />
            {/* Pipi warna-warni */}
            <circle cx="28" cy="50" r="2.8" fill="#FF87B2" opacity="0.85" />
            <circle cx="52" cy="50" r="2.8" fill="#63E6BE" opacity="0.85" />
            {/* Mulut tersenyum */}
            <path d="M36 52 Q40 56 44 52" stroke="var(--bito-screen)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Palet mini di bahu */}
            <ellipse cx="56" cy="60" rx="8" ry="6" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2" />
            <circle cx="53.5" cy="59" r="1.4" fill="#E4572E" />
            <circle cx="57" cy="57.5" r="1.4" fill="#2F6FED" />
            <circle cx="59" cy="60.5" r="1.4" fill="#2BA84A" />
          </g>
        );

      case 'kompas':
        return (
          <g>
            {/* Wajah petualang */}
            <circle cx="40" cy="45" r="19" fill="#FFE6C9" stroke="var(--illus-line)" strokeWidth="2.6" />
            {/* Topi nakhoda */}
            <path d="M21 34 C24 21, 56 21, 59 34 Z" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2.4" />
            <path d="M18 35 H62" stroke="var(--bito-screen)" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="40" cy="27" r="3.4" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="1.6" />
            {/* Mata */}
            <circle cx="33.5" cy="44" r="2.9" fill="var(--bito-screen)" />
            <circle cx="46.5" cy="44" r="2.9" fill="var(--bito-screen)" />
            <circle cx="34.5" cy="42.8" r="1" fill="#FFFFFF" />
            <circle cx="47.5" cy="42.8" r="1" fill="#FFFFFF" />
            {/* Senyum */}
            <path d="M35 51 Q40 56 45 51" stroke="var(--bito-screen)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Lencana kompas */}
            <circle cx="56" cy="59" r="8" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2" />
            <polygon points="56,53 58,59 56,65 54,59" fill="#E4572E" />
            <circle cx="56" cy="59" r="1.6" fill="var(--bito-screen)" />
          </g>
        );

      case 'bintang':
        return (
          <g>
            {/* Bentuk karakter bintang membulat */}
            <path
              d="M40 14 L47 28 L63 30 L51 41 L54 57 L40 49 L26 57 L29 41 L17 30 L33 28 Z"
              fill="#FFE066"
              stroke="var(--illus-line)"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Wajah */}
            <circle cx="34.5" cy="37" r="2.7" fill="var(--bito-screen)" />
            <circle cx="45.5" cy="37" r="2.7" fill="var(--bito-screen)" />
            <circle cx="35.3" cy="36" r="0.9" fill="#FFFFFF" />
            <circle cx="46.3" cy="36" r="0.9" fill="#FFFFFF" />
            <circle cx="30" cy="41.5" r="2.5" fill="#FF8787" opacity="0.65" />
            <circle cx="50" cy="41.5" r="2.5" fill="#FF8787" opacity="0.65" />
            <path d="M36 42.5 Q40 46.5 44 42.5" stroke="var(--bito-screen)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            {/* Kilauan */}
            <path d="M18 19 L20 22 L23 23 L20 24 L18 27 L16 24 L13 23 L16 22 Z" fill="#FFFFFF" />
            <path d="M62 52 L63.5 54.5 L66 55.5 L63.5 56.5 L62 59 L60.5 56.5 L58 55.5 L60.5 54.5 Z" fill="#FFFFFF" />
          </g>
        );

      case 'buku':
        return (
          <g>
            {/* Kepala */}
            <circle cx="40" cy="48" r="18" fill="#FFF1F6" stroke="var(--illus-line)" strokeWidth="2.6" />
            {/* Topi penyihir kode */}
            <path d="M22 36 L40 13 L56 36 Z" fill="#4B3CB8" stroke="var(--illus-line)" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M17 37 Q40 32 63 37" stroke="var(--bito-screen)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M29 31 H50" stroke="#F5B400" strokeWidth="3" strokeLinecap="round" />
            {/* Kacamata bundar */}
            <circle cx="33.5" cy="46.5" r="5.5" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2.2" />
            <circle cx="46.5" cy="46.5" r="5.5" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2.2" />
            <line x1="39" y1="46.5" x2="41" y2="46.5" stroke="var(--bito-screen)" strokeWidth="2.2" />
            <circle cx="33.5" cy="46.5" r="2.2" fill="var(--bito-screen)" />
            <circle cx="46.5" cy="46.5" r="2.2" fill="var(--bito-screen)" />
            {/* Senyum */}
            <path d="M36.5 55 Q40 58 43.5 55" stroke="var(--bito-screen)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            {/* Lencana kurung kurawal */}
            <circle cx="58" cy="59" r="7.5" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="2" />
            <text x="58" y="61.5" textAnchor="middle" fontSize="8" fontWeight="900" fill="var(--bito-screen)" fontFamily="monospace">
              {'{}'}
            </text>
          </g>
        );

      case 'perisai':
        return (
          <g>
            {/* Helm ksatria */}
            <path
              d="M21 38 C21 22, 59 22, 59 38 V52 C59 60, 40 67, 40 67 C40 67, 21 60, 21 52 Z"
              fill="#DCE3FA"
              stroke="var(--illus-line)"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Jambul emas */}
            <path d="M36 15 H44 L42 25 H38 Z" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="2" strokeLinejoin="round" />
            {/* Visor gelap */}
            <rect x="26" y="34" width="28" height="15" rx="6.5" fill="var(--bito-screen)" />
            {/* Mata menyala */}
            <rect x="31" y="39" width="5" height="4" rx="2" fill="#63E6BE" />
            <rect x="44" y="39" width="5" height="4" rx="2" fill="#63E6BE" />
            {/* Lambang gembok/perisai di dagu */}
            <path d="M35 53 H45 V57 C45 60, 40 62, 40 62 C40 62, 35 60, 35 57 Z" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="1.8" />
          </g>
        );

      case 'kurir':
      default:
        return (
          <g>
            {/* Antena */}
            <line x1="40" y1="12" x2="40" y2="21" stroke="var(--bito-screen)" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="40" cy="11" r="3.8" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="2" />
            {/* Kepala paket Bito */}
            <rect x="19" y="21" width="42" height="40" rx="13" fill="var(--bito-body)" stroke="var(--illus-line)" strokeWidth="2.6" />
            {/* Topi kurir miring */}
            <path d="M23 23 C25 14, 55 14, 57 23 Z" fill="#F5B400" stroke="var(--illus-line)" strokeWidth="2.2" />
            <path d="M21 23 H60" stroke="var(--bito-screen)" strokeWidth="2.6" strokeLinecap="round" />
            {/* Layar wajah */}
            <rect x="26" y="31" width="28" height="16" rx="6" fill="var(--bito-screen)" />
            {/* Mata senang */}
            <path d="M30.5 39.5 C32 36.5, 35.5 36.5, 37 39.5" stroke="#F5B400" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            <path d="M43 39.5 C44.5 36.5, 48 36.5, 49.5 39.5" stroke="#F5B400" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            {/* Mulut ramah */}
            <path d="M34 52 Q40 57 46 52" stroke="var(--bito-screen)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Tali selempang kurir */}
            <path d="M22 57 L58 46" stroke="#E4572E" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
          </g>
        );
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      className={`flex-shrink-0 ${className}`}
      {...ariaProps}
    >
      {!decorative && <title>{info.label}</title>}
      {/* Latar lingkaran karakter dengan ring halus */}
      <circle cx="40" cy="40" r="38" fill={info.bg} stroke={info.ring} strokeWidth="2.5" />
      <circle cx="40" cy="40" r="33" fill={info.bgSoft} opacity="0.22" />
      {renderCharacterArt()}
    </svg>
  );
};
