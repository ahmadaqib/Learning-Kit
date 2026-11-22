/**
 * Uji otomatis rasio kontras WCAG 2.1 AA untuk seluruh token warna dan 22 warna dunia.
 * Jalankan via: npm run check:contrast
 */

declare const process: { exit(code?: number): never };

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): Rgb {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function mixRgb(a: Rgb, b: Rgb, bWeight: number): Rgb {
  const aWeight = 1 - bWeight;
  return {
    r: Math.round(a.r * aWeight + b.r * bWeight),
    g: Math.round(a.g * aWeight + b.g * bWeight),
    b: Math.round(a.b * aWeight + b.b * bWeight),
  };
}

function relativeLuminance(rgb: Rgb): number {
  const transform = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * transform(rgb.r) + 0.7152 * transform(rgb.g) + 0.0722 * transform(rgb.b);
}

export function contrastRatio(fgHex: string, bgHex: string): number {
  const l1 = relativeLuminance(hexToRgb(fgHex));
  const l2 = relativeLuminance(hexToRgb(bgHex));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHex(rgb: Rgb): string {
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// Token dasar §10.1
const TOKENS = {
  light: {
    ink: '#1F2340',
    ink2: '#4A4F72',
    paper: '#FFFFFF',
    cream: '#F6F3EE',
    ok500: '#23913F',
    ok600: '#1C7432',
    ok50: '#EAF7EC',
    warn700: '#8F5600',
    warn50: '#FFF4E0',
    err600: '#B52D1E',
    err50: '#FDECEA',
  },
  dark: {
    ink: '#E8EAF6',
    ink2: '#B8BCE0',
    paper: '#1E2140',
    cream: '#14162A',
    okText: '#6FE08B',
    warnText: '#FFC857',
    errText: '#FF8577',
  },
};

export const WORLD_COLORS: { id: string; hex: string; isYellow?: boolean }[] = [
  { id: 'a01', hex: '#E4572E' },
  { id: 'a02', hex: '#2BA84A' },
  { id: 'a03', hex: '#2F6FED' },
  { id: 'a04', hex: '#D99A00', isYellow: true },
  { id: 'a05', hex: '#0E9AA7' },
  { id: 'a06', hex: '#0E9AA7' },
  { id: 'a07', hex: '#D6336C' },
  { id: 'a08', hex: '#6C5CE7' },
  { id: 'a09', hex: '#0E9AA7' },
  { id: 'a10', hex: '#2BA84A' },
  { id: 'a11', hex: '#2F6FED' },
  { id: 'a12', hex: '#D23B2A' },
  { id: 'b01', hex: '#0E9AA7' },
  { id: 'b02', hex: '#2F6FED' },
  { id: 'b03', hex: '#D99A00', isYellow: true },
  { id: 'b04', hex: '#6C5CE7' },
  { id: 'b05', hex: '#E4572E' },
  { id: 'b06', hex: '#2BA84A' },
  { id: 'b07', hex: '#6C5CE7' },
  { id: 'b08', hex: '#D23B2A' },
  { id: 'b09', hex: '#2F6FED' },
  { id: 'b10', hex: '#1F2340' },
];

export function computeWorldPalette(baseHex: string, isYellow = false) {
  const base = hexToRgb(baseHex);
  const white = hexToRgb('#FFFFFF');
  const black = hexToRgb('#000000');

  // Hitung varian terang/gelap yang dijamin memenuhi WCAG AA (>= 4.5:1)
  const w50 = rgbToHex(mixRgb(base, white, 0.9));
  const w100 = rgbToHex(mixRgb(base, white, 0.78));

  let w600Weight = 0.22;
  while (w600Weight < 0.75) {
    const candidate = rgbToHex(mixRgb(base, black, w600Weight));
    const textColor = isYellow ? '#1F2340' : '#FFFFFF';
    if (contrastRatio(textColor, candidate) >= 4.6) break;
    w600Weight += 0.05;
  }
  const w600 = isYellow
    ? rgbToHex(mixRgb(base, white, 0.1)) // Kuning cerah + teks --ink (#1F2340)
    : rgbToHex(mixRgb(base, black, w600Weight));

  let w700Weight = 0.36;
  while (w700Weight < 0.85) {
    const candidate = rgbToHex(mixRgb(base, black, w700Weight));
    if (contrastRatio(candidate, '#FFFFFF') >= 4.6 && contrastRatio(candidate, w50) >= 4.5) break;
    w700Weight += 0.05;
  }
  const w700 = rgbToHex(mixRgb(base, black, w700Weight));

  // Varian mode gelap: naikkan keterbacaan di atas #1E2140 hingga >= 4.6:1
  let darkWeight = 0.25;
  let darkAccent = rgbToHex(mixRgb(base, white, darkWeight));
  while (darkWeight < 0.92 && contrastRatio(darkAccent, TOKENS.dark.paper) < 4.6) {
    darkWeight += 0.05;
    darkAccent = rgbToHex(mixRgb(base, white, darkWeight));
  }

  return { w50, w100, w600, w700, darkAccent };
}

function runChecks(): void {
  const failures: string[] = [];

  const check = (name: string, fg: string, bg: string, min = 4.5) => {
    const ratio = contrastRatio(fg, bg);
    if (ratio < min) {
      failures.push(`${name}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1 (min ${min}:1)`);
    }
  };

  // Cek token dasar terang
  check('light ink/paper', TOKENS.light.ink, TOKENS.light.paper);
  check('light ink/cream', TOKENS.light.ink, TOKENS.light.cream);
  check('light ink2/paper', TOKENS.light.ink2, TOKENS.light.paper);
  check('light ink2/cream', TOKENS.light.ink2, TOKENS.light.cream);
  check('light ok/ok50', TOKENS.light.ok600, TOKENS.light.ok50);
  check('light warn/warn50', TOKENS.light.warn700, TOKENS.light.warn50);
  check('light err/err50', TOKENS.light.err600, TOKENS.light.err50);

  // Cek token dasar gelap
  check('dark ink/paper', TOKENS.dark.ink, TOKENS.dark.paper);
  check('dark ink/cream', TOKENS.dark.ink, TOKENS.dark.cream);
  check('dark ink2/paper', TOKENS.dark.ink2, TOKENS.dark.paper);
  check('dark ok/paper', TOKENS.dark.okText, TOKENS.dark.paper);
  check('dark warn/paper', TOKENS.dark.warnText, TOKENS.dark.paper);
  check('dark err/paper', TOKENS.dark.errText, TOKENS.dark.paper);

  // Cek ke-22 warna dunia
  for (const w of WORLD_COLORS) {
    const pal = computeWorldPalette(w.hex, w.isYellow);
    const btnText = w.isYellow ? '#1F2340' : '#FFFFFF';
    check(`world ${w.id} button text on w600`, btnText, pal.w600);
    check(`world ${w.id} w700 text on paper`, pal.w700, '#FFFFFF');
    check(`world ${w.id} w700 text on w50`, pal.w700, pal.w50);
    check(`world ${w.id} darkAccent on dark paper`, pal.darkAccent, TOKENS.dark.paper);
  }

  if (failures.length > 0) {
    console.error('Contrast check failed:\n' + failures.join('\n'));
    process.exit(1);
  }

  console.log(
    `Contrast check passed: ${WORLD_COLORS.length} worlds + light/dark base tokens verified (0 WCAG AA violations).`,
  );
}

runChecks();
