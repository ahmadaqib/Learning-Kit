import React from 'react';
import { WORLD_METAS, WORLD_META_BY_ID } from '@/content/worldMeta';

/**
 * Attributes that re-resolve the world scale (--world-50 ... --illus-accent) on an svg root. tokens.css declares
 * the scale on :root and on every [data-world-id], so setting --world next to the attribute is enough.
 */
function worldScope(
  worldId: string,
  color: string | undefined,
  isYellow: boolean | undefined,
  extra?: Record<string, string>,
) {
  return {
    'data-world-id': worldId,
    'data-world-yellow': isYellow ? ('true' as const) : undefined,
    style: { ...(color ? { '--world': color } : null), ...extra } as React.CSSProperties,
  };
}

interface WorldIslandIllustrationProps {
  worldId: string;
  size?: number;
  locked?: boolean;
  label?: string;
}

/**
 * Ilustrasi pulau/bangunan SVG Flat 2.0 untuk setiap dari 22 dunia (§9.3 & §10.5).
 */
export const WorldIslandIllustration: React.FC<WorldIslandIllustrationProps> = ({
  worldId,
  size = 110,
  locked = false,
  label,
}) => {
  const meta = WORLD_META_BY_ID[worldId];
  const fillBg = locked ? 'var(--illus-shade)' : 'var(--world-50)';
  // The svg carries its own world, so a pulau drawn outside its WorldThemeWrapper (the map, the sticker book)
  // still resolves --illus-accent and --world-50 to its own colours. A locked island is grey.
  const scope = worldScope(worldId, meta?.color, meta?.isYellow, locked ? { '--illus-accent': 'var(--ink-3)' } : undefined);

  const renderLandmark = () => {
    switch (worldId) {
      case 'a01':
      case 'b01':
        return (
          <g>
            {/* Restoran */}
            <rect x="24" y="42" width="52" height="32" rx="6" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <path d="M20 42 L50 24 L80 42 Z" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="43" y="54" width="14" height="20" rx="2" fill="var(--bito-screen)" />
            <rect x="29" y="49" width="10" height="10" rx="2" fill="var(--illus-accent)" opacity="0.4" stroke="var(--illus-line)" strokeWidth="1.5" />
            <rect x="61" y="49" width="10" height="10" rx="2" fill="var(--illus-accent)" opacity="0.4" stroke="var(--illus-line)" strokeWidth="1.5" />
          </g>
        );
      case 'a02':
        return (
          <g>
            {/* Pohon berlabel HTML */}
            <rect x="45" y="52" width="10" height="22" rx="2" fill="var(--warn-700)" stroke="var(--illus-line)" strokeWidth="2.2" />
            <circle cx="50" cy="40" r="18" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <rect x="33" y="34" width="34" height="13" rx="4" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2" />
            <text x="50" y="44" textAnchor="middle" fontSize="8.5" fontWeight="800" fill="var(--illus-line)">&lt;HTML&gt;</text>
          </g>
        );
      case 'a03':
        return (
          <g>
            {/* Bengkel CSS / kuas dan palet */}
            <rect x="26" y="34" width="48" height="36" rx="8" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <rect x="33" y="41" width="34" height="22" rx="4" fill="var(--illus-accent)" opacity="0.25" stroke="var(--illus-accent)" strokeWidth="2.5" strokeDasharray="3 2" />
            <rect x="40" y="47" width="20" height="10" rx="2" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2" />
          </g>
        );
      case 'a04':
        return (
          <g>
            {/* Pabrik JS dengan gir */}
            <rect x="24" y="40" width="52" height="34" rx="6" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <circle cx="43" cy="57" r="9" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2.2" />
            <circle cx="60" cy="53" r="6.5" fill="var(--illus-line)" />
            <rect x="32" y="25" width="10" height="15" rx="2" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2" />
          </g>
        );
      case 'a05':
        return (
          <g>
            {/* Pulau Responsif: HP + Tablet */}
            <rect x="25" y="33" width="36" height="40" rx="6" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <rect x="52" y="42" width="22" height="32" rx="5" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <rect x="57" y="48" width="12" height="16" rx="2" fill="var(--illus-fill)" />
          </g>
        );
      case 'b02':
        return (
          <g>
            {/* Kantor Pos Amplop */}
            <rect x="22" y="34" width="56" height="38" rx="7" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <path d="M24 36 L50 56 L76 36" fill="none" stroke="var(--illus-accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="72" cy="36" r="8" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2" />
          </g>
        );
      case 'b03':
        return (
          <g>
            {/* Gudang Kardus JSON */}
            <rect x="24" y="38" width="24" height="34" rx="4" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <rect x="52" y="30" width="24" height="42" rx="4" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <text x="64" y="55" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--illus-line)">{'{}'}</text>
          </g>
        );
      case 'b05':
        return (
          <g>
            {/* Menara Radio Realtime */}
            <path d="M36 74 L50 32 L64 74 Z" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" strokeLinejoin="round" />
            <circle cx="50" cy="30" r="5" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2" />
            <path d="M37 25 A16 16 0 0 1 63 25" fill="none" stroke="var(--illus-accent)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M31 19 A24 24 0 0 1 69 19" fill="none" stroke="var(--illus-accent)" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        );
      case 'a12':
      case 'b07':
      case 'b08':
        return (
          <g>
            {/* Perisai / Benteng Keamanan */}
            <path
              d="M50 24 L74 33 V51 C74 64 62 73 50 78 C38 73 26 64 26 51 V33 Z"
              fill="var(--illus-fill)"
              stroke="var(--illus-line)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <rect x="41" y="47" width="18" height="15" rx="3" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2.2" />
            <path d="M44 47 V42 A6 6 0 0 1 56 42 V47" fill="none" stroke="var(--illus-line)" strokeWidth="2.5" />
          </g>
        );
      case 'b10':
        return (
          <g>
            {/* Puncak Gunung + Bendera Emas */}
            <path d="M18 74 L46 32 L62 54 L70 42 L84 74 Z" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" strokeLinejoin="round" />
            <line x1="46" y1="32" x2="46" y2="16" stroke="var(--illus-line)" strokeWidth="2.5" />
            <path d="M46 16 L64 22 L46 28 Z" fill="var(--illus-sun)" stroke="var(--illus-line)" strokeWidth="2" />
          </g>
        );
      default:
        return (
          <g>
            {/* Gedung / Galeri / Menara Alat */}
            <rect x="26" y="34" width="48" height="40" rx="10" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
            <rect x="34" y="42" width="32" height="12" rx="4" fill="var(--illus-accent)" stroke="var(--illus-line)" strokeWidth="2" />
            <circle cx="42" cy="64" r="4" fill="var(--illus-line)" />
            <circle cx="58" cy="64" r="4" fill="var(--illus-accent)" />
          </g>
        );
    }
  };

  return (
    <svg
      {...scope}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {/* Dasar pulau */}
      <ellipse cx="50" cy="76" rx="38" ry="12" fill={fillBg} stroke="var(--illus-line)" strokeWidth="2.2" />
      {renderLandmark()}
    </svg>
  );
};

interface ConceptVisualProps {
  name: string;
  props?: Record<string, unknown>;
  alt: string;
  worldColor?: string;
}

/**
 * Komponen visual diagram beranotasi untuk kartu cerita & kartu konsep (Mayer contiguity).
 */
export const ConceptVisual: React.FC<ConceptVisualProps> = ({
  name,
  props = {},
  alt,
  worldColor,
}) => {
  const topic = String(props.topic ?? props.preset ?? name);
  const worldId = String(props.worldId ?? 'a01');
  // An explicit props.worldId wins. Otherwise the page's own world colour (worldColor) is used, as the lesson does.
  const worldMeta = props.worldId ? WORLD_META_BY_ID[worldId] : undefined;
  const color = worldMeta?.color ?? worldColor ?? WORLD_META_BY_ID[worldId]?.color;
  const yellow = worldMeta?.isYellow ?? WORLD_METAS.find((w) => w.color === color)?.isYellow;
  const scope = worldScope(worldId, color, yellow);

  if (topic === 'empat-jenis-huruf') {
    return (
      <div role="img" aria-label={alt} className="grid w-full max-w-[320px] grid-cols-2 gap-3 text-center">
        {[
          { label: 'Berkaki', family: 'Georgia, serif' },
          { label: 'Tanpa kaki', family: 'Arial, sans-serif' },
        ].map(({ label, family }) => (
          <div key={label} aria-hidden="true" className="rounded-[var(--radius-md)] bg-[var(--paper)] px-2 py-3 text-[var(--ink)]">
            <span className="block text-6xl" style={{ fontFamily: family }}>n</span>
            <span className="pw-small">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (name === 'RestoranDiagram' || topic.includes('restoran') || topic.includes('api')) {
    return (
      <svg {...scope} viewBox="0 0 360 190" className="w-full max-w-[360px]" role="img" aria-label={alt}>
        <rect x="8" y="12" width="102" height="145" rx="14" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.5" />
        <text x="59" y="38" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--illus-line)">Ruang Makan</text>
        <text x="59" y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--world-700)">FRONTEND</text>
        <rect x="24" y="72" width="70" height="32" rx="6" fill="var(--illus-shade)" stroke="var(--illus-line)" strokeWidth="1.8" />
        <text x="59" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--illus-line)">Menu (UI)</text>
        <text x="59" y="132" textAnchor="middle" fontSize="10" fill="var(--ink-2)">Dilihat tamu</text>

        {/* Panah tengah */}
        <path d="M118 68 H240" stroke="var(--illus-accent)" strokeWidth="3" strokeDasharray="5 3" />
        <polygon points="240,62 250,68 240,74" fill="var(--illus-accent)" />
        <rect x="142" y="38" width="76" height="22" rx="6" fill="var(--world-600)" />
        <text x="180" y="53" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--on-poster)">Pelayan / API</text>

        <path d="M242 114 H120" stroke="var(--illus-line)" strokeWidth="2.5" />
        <polygon points="120,108 110,114 120,120" fill="var(--illus-line)" />
        <text x="180" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--illus-line)">Jawaban (Response)</text>

        <rect x="252" y="12" width="100" height="145" rx="14" fill="var(--bito-screen)" stroke="var(--illus-line)" strokeWidth="2.5" />
        <text x="302" y="38" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--on-boss)">Dapur</text>
        <text x="302" y="56" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--illus-sun)">BACKEND</text>
        <rect x="268" y="72" width="68" height="32" rx="6" fill="color-mix(in srgb, var(--bito-screen), white 12%)" />
        <text x="302" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--on-boss)">Server &amp; DB</text>
        <text x="302" y="132" textAnchor="middle" fontSize="10" fill="var(--on-boss)" opacity="0.75">Olah data</text>
      </svg>
    );
  }

  if (name === 'BoxModelDiagram' || topic.includes('box') || topic.includes('padding') || topic.includes('margin')) {
    return (
      <svg {...scope} viewBox="0 0 340 195" className="w-full max-w-[340px]" role="img" aria-label={alt}>
        {/* Margin */}
        <rect x="18" y="10" width="304" height="175" rx="14" fill="var(--warn-50)" stroke="var(--warn-500)" strokeWidth="2.2" strokeDasharray="6 4" />
        <text x="32" y="28" fontSize="11" fontWeight="800" fill="var(--warn-700)">MARGIN (jarak luar)</text>
        {/* Border */}
        <rect x="44" y="38" width="252" height="125" rx="10" fill="var(--bito-screen)" />
        <text x="58" y="54" fontSize="11" fontWeight="800" fill="var(--illus-sun)">BORDER (bingkai)</text>
        {/* Padding */}
        <rect x="64" y="64" width="212" height="83" rx="8" fill="var(--ok-50)" stroke="var(--ok-500)" strokeWidth="2" />
        <text x="76" y="81" fontSize="11" fontWeight="800" fill="var(--ok-600)">PADDING (ruang dalam)</text>
        {/* Content */}
        <rect x="92" y="92" width="156" height="40" rx="6" fill="var(--world-600)" stroke="var(--illus-line)" strokeWidth="2" />
        <text x="170" y="116" textAnchor="middle" fontSize="13" fontWeight="800" fill="var(--on-poster)">CONTENT (Isi)</text>
      </svg>
    );
  }

  if (name === 'SequenceDiagram' || topic.includes('sse') || topic.includes('websocket') || topic.includes('request') || topic.includes('oauth') || topic.includes('polling')) {
    return (
      <svg {...scope} viewBox="0 0 340 190" className="w-full max-w-[340px]" role="img" aria-label={alt}>
        <rect x="26" y="12" width="96" height="34" rx="8" fill="var(--bito-screen)" />
        <text x="74" y="33" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--on-boss)">Client / Browser</text>
        <line x1="74" y1="46" x2="74" y2="174" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="4 4" />

        <rect x="218" y="12" width="96" height="34" rx="8" fill="var(--world-600)" stroke="var(--illus-line)" strokeWidth="2" />
        <text x="266" y="33" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--on-poster)">Server</text>
        <line x1="266" y1="46" x2="266" y2="174" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="4 4" />

        <line x1="74" y1="74" x2="256" y2="74" stroke="var(--illus-line)" strokeWidth="2.5" />
        <polygon points="256,69 265,74 256,79" fill="var(--illus-line)" />
        <text x="170" y="66" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--illus-line)">1. Permintaan / Langganan</text>

        <line x1="266" y1="112" x2="84" y2="112" stroke="var(--illus-accent)" strokeWidth="2.5" />
        <polygon points="84,107 75,112 84,117" fill="var(--illus-accent)" />
        <text x="170" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--world-700)">2. Kabar / Data Mengalir</text>

        <line x1="266" y1="148" x2="84" y2="148" stroke="var(--illus-accent)" strokeWidth="2.5" />
        <polygon points="84,143 75,148 84,153" fill="var(--illus-accent)" />
        <text x="170" y="140" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--world-700)">3. Pembaruan Berikutnya</text>
      </svg>
    );
  }

  if (name === 'HtmlTreeDiagram' || topic.includes('dom') || topic.includes('html') || topic.includes('semantik')) {
    return (
      <svg {...scope} viewBox="0 0 340 185" className="w-full max-w-[340px]" role="img" aria-label={alt}>
        <rect x="115" y="12" width="110" height="32" rx="8" fill="var(--world-600)" stroke="var(--illus-line)" strokeWidth="2.2" />
        <text x="170" y="32" textAnchor="middle" fontSize="12" fontWeight="800" fill="var(--on-poster)">&lt;html&gt; / &lt;body&gt;</text>

        <line x1="170" y1="44" x2="85" y2="76" stroke="var(--illus-line)" strokeWidth="2" />
        <line x1="170" y1="44" x2="170" y2="76" stroke="var(--illus-line)" strokeWidth="2" />
        <line x1="170" y1="44" x2="255" y2="76" stroke="var(--illus-line)" strokeWidth="2" />

        <rect x="35" y="76" width="95" height="34" rx="8" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.2" />
        <text x="82" y="97" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--illus-line)">&lt;header&gt;</text>

        <rect x="137" y="76" width="76" height="34" rx="8" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.2" />
        <text x="175" y="97" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--illus-line)">&lt;main&gt;</text>

        <rect x="222" y="76" width="92" height="34" rx="8" fill="var(--illus-fill)" stroke="var(--illus-line)" strokeWidth="2.2" />
        <text x="268" y="97" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--illus-line)">&lt;footer&gt;</text>

        <rect x="75" y="132" width="190" height="36" rx="8" fill="var(--illus-shade)" stroke="var(--illus-line)" strokeWidth="2" strokeDasharray="4 3" />
        <text x="170" y="154" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink-2)">Setiap tag punya peran jelas</text>
      </svg>
    );
  }

  // Fallback diagram konsep rapi berwarna dunia + ikon pulau dunia
  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <WorldIslandIllustration worldId={worldId} size={120} label={alt} />
      <div
        className="rounded-full border-2 border-[var(--illus-line)] bg-[var(--paper)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[var(--ink)]"
      >
        {topic.replace(/[-_]/g, ' ')}
      </div>
    </div>
  );
};
