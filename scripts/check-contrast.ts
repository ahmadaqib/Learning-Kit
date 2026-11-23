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

// Token dasar (spec 2026-11-22 §4.2 dan §10.1). Harus sama dengan src/styles/tokens.css.
const TOKENS = {
  light: {
    ink: '#1F2340',
    ink2: '#4A4F72',
    ink3: '#646886',
    paper: '#FFFDF8',
    paper2: '#F3E9D6',
    paperRaised: '#FFFFFF',
    cream: '#FBF3E4',
    lineStrong: '#8E8672',
    ok500: '#23913F',
    ok600: '#1C7432',
    ok50: '#EAF7EC',
    warn700: '#8F5600',
    warn50: '#FFF4E0',
    err500: '#D23B2A',
    err600: '#B52D1E',
    err50: '#FDECEA',
    star: '#F5B400',
    star50: '#FFF3CC',
    star700: '#7A5200',
    onStar: '#1F2340',
    boss: '#1F2340',
    onBoss: '#FFFDF8',
  },
  dark: {
    ink: '#E8EAF6',
    ink2: '#B8BCE0',
    ink3: '#9499C2',
    paper: '#1E2140',
    paper2: '#171A33',
    paperRaised: '#262A4F',
    cream: '#14162A',
    lineStrong: '#6F75A3',
    ok50: '#132A1D',
    okText: '#6FE08B',
    warn50: '#2C200D',
    warnText: '#FFC857',
    err50: '#331618',
    errText: '#FF8577',
    star: '#F5B400',
    star50: '#33290F',
    star700: '#FFD466',
    onStar: '#14162A',
    boss: '#0F1122',
    onBoss: '#E8EAF6',
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
    if (
      contrastRatio(candidate, TOKENS.light.paper) >= 4.6 &&
      contrastRatio(candidate, TOKENS.light.cream) >= 4.5 &&
      contrastRatio(candidate, w50) >= 4.5
    ) {
      break;
    }
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

/**
 * The world scale exactly as tokens.css computes it with color-mix(in srgb, ...), including the yellow and
 * B10 overrides. The adjusted palette above is a safety net; these are the values the app really paints.
 */
export function realWorldPalette(baseHex: string, opts: { isYellow?: boolean; isB10?: boolean } = {}) {
  const base = hexToRgb(baseHex);
  const white = hexToRgb('#FFFFFF');
  const black = hexToRgb('#000000');
  const darkBg = hexToRgb('#14162A');

  const light = {
    w50: rgbToHex(mixRgb(base, white, 0.9)),
    w100: rgbToHex(mixRgb(base, white, 0.78)),
    w600: rgbToHex(mixRgb(base, black, 0.22)),
    w700: rgbToHex(mixRgb(base, black, 0.36)),
    btnText: '#FFFFFF',
  };
  const dark = {
    w50: rgbToHex(mixRgb(base, darkBg, 0.78)),
    w100: rgbToHex(mixRgb(base, darkBg, 0.62)),
    w600: light.w600,
    w700: rgbToHex(mixRgb(base, white, 0.42)),
    btnText: '#FFFFFF',
  };
  if (opts.isYellow) {
    light.w600 = rgbToHex(mixRgb(base, white, 0.1));
    light.w700 = '#785300';
    light.btnText = '#1F2340';
    dark.w600 = '#D99A00';
    dark.w700 = '#FFD466';
    dark.btnText = '#14162A';
  }
  if (opts.isB10) {
    dark.w600 = '#F5B400';
    dark.w700 = '#FFD466';
    dark.btnText = '#14162A';
  }
  return { light, dark };
}

function runChecks(): void {
  const failures: string[] = [];

  const check = (name: string, fg: string, bg: string, min = 4.5) => {
    const ratio = contrastRatio(fg, bg);
    if (ratio < min) {
      failures.push(`${name}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1 (min ${min}:1)`);
    }
  };

  const L = TOKENS.light;
  const D = TOKENS.dark;

  // Teks utama dan sekunder pada setiap permukaan (§10.1)
  for (const [name, bg] of [
    ['paper', L.paper],
    ['cream', L.cream],
    ['paper2', L.paper2],
    ['paperRaised', L.paperRaised],
  ] as const) {
    check(`light ink/${name}`, L.ink, bg);
    check(`light ink2/${name}`, L.ink2, bg);
  }
  check('light ink3/paper', L.ink3, L.paper);
  check('light ink3/cream', L.ink3, L.cream);
  check('light ink3/paper2', L.ink3, L.paper2);
  check('light ok/ok50', L.ok600, L.ok50);
  check('light warn/warn50', L.warn700, L.warn50);
  check('light err/err50', L.err600, L.err50);
  check('light star700/star50', L.star700, L.star50);
  check('light onStar/star', L.onStar, L.star);
  check('light onBoss/boss', L.onBoss, L.boss);
  check('light star/boss', L.star, L.boss);
  check('light white/err500 (danger button)', '#FFFFFF', L.err500);
  // Batas non-teks 3:1 (input, zona taruh, area hotspot)
  check('light lineStrong/paper (non-text)', L.lineStrong, L.paper, 3);
  check('light lineStrong/cream (non-text)', L.lineStrong, L.cream, 3);

  for (const [name, bg] of [
    ['paper', D.paper],
    ['cream', D.cream],
    ['paper2', D.paper2],
    ['paperRaised', D.paperRaised],
  ] as const) {
    check(`dark ink/${name}`, D.ink, bg);
    check(`dark ink2/${name}`, D.ink2, bg);
  }
  check('dark ink3/paper', D.ink3, D.paper);
  check('dark ink3/cream', D.ink3, D.cream);
  check('dark ink3/paper2', D.ink3, D.paper2);
  check('dark ok/ok50', D.okText, D.ok50);
  check('dark warn/warn50', D.warnText, D.warn50);
  check('dark err/err50', D.errText, D.err50);
  check('dark ok/paper', D.okText, D.paper);
  check('dark warn/paper', D.warnText, D.paper);
  check('dark err/paper', D.errText, D.paper);
  check('dark star700/star50', D.star700, D.star50);
  check('dark onStar/star', D.onStar, D.star);
  check('dark onBoss/boss', D.onBoss, D.boss);
  check('dark star/boss', D.star, D.boss);
  check('dark lineStrong/paper (non-text)', D.lineStrong, D.paper, 3);
  check('dark lineStrong/cream (non-text)', D.lineStrong, D.cream, 3);

  // Cek ke-22 warna dunia
  for (const w of WORLD_COLORS) {
    const pal = computeWorldPalette(w.hex, w.isYellow);
    const btnText = w.isYellow ? '#1F2340' : '#FFFFFF';
    check(`world ${w.id} button text on w600`, btnText, pal.w600);
    check(`world ${w.id} w700 text on paper`, pal.w700, L.paper);
    check(`world ${w.id} w700 text on cream`, pal.w700, L.cream);
    check(`world ${w.id} w700 text on w50`, pal.w700, pal.w50);
    check(`world ${w.id} darkAccent on dark paper`, pal.darkAccent, D.paper);

    // Nilai asli CSS (tokens.css): poster, teks di atas poster, dan teks berwarna di atas permukaan netral
    const real = realWorldPalette(w.hex, { isYellow: w.isYellow, isB10: w.id === 'b10' });
    check(`world ${w.id} real: on-poster on w600 (light)`, real.light.btnText, real.light.w600);
    check(`world ${w.id} real: w700 on paper (light)`, real.light.w700, L.paper);
    check(`world ${w.id} real: w700 on cream (light)`, real.light.w700, L.cream);
    check(`world ${w.id} real: w700 on w50 (light)`, real.light.w700, real.light.w50);
    check(`world ${w.id} real: w700 on w100 (light)`, real.light.w700, real.light.w100);
    check(`world ${w.id} real: on-poster on w600 (dark)`, real.dark.btnText, real.dark.w600);
    check(`world ${w.id} real: w700 on paper (dark)`, real.dark.w700, D.paper);
    check(`world ${w.id} real: w700 on cream (dark)`, real.dark.w700, D.cream);
    check(`world ${w.id} real: w700 on w50 (dark)`, real.dark.w700, real.dark.w50);
    check(`world ${w.id} real: w700 on w100 (dark)`, real.dark.w700, real.dark.w100);
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
