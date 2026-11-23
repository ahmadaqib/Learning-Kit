/**
 * Warns about hex colour literals in src/components and src/pages (spec 4.9, 13).
 * Every colour comes from a token in src/styles/tokens.css; a hex literal breaks dark mode.
 *
 * Warn mode (default): prints every finding and exits 0. Packages 1 to 4 are still migrating their files.
 * Strict mode (`CHECK_COLORS_STRICT=1`): exits 1 when anything is found. The integration pass flips
 * `npm run check:colors` to strict and adds it to `npm run build`.
 *
 * Jalankan via: npm run check:colors
 */

export {};

declare const process: {
  exit(code?: number): never;
  cwd(): string;
  env: Record<string, string | undefined>;
};

interface DirEntry {
  name: string;
  isDirectory(): boolean;
}
interface FsLike {
  readdirSync(path: string, opts: { withFileTypes: true }): DirEntry[];
  readFileSync(path: string, encoding: 'utf8'): string;
}

// A variable specifier keeps this script free of @types/node
const fsModule = 'node:fs';
const fs = (await import(fsModule)) as unknown as FsLike;

const ROOTS = ['src/components', 'src/pages'];

/** Files where hex colours are content, not theme (spec 4.9). Path suffixes. */
const ALLOW_LIST = [
  'src/components/mascot/CharacterAvatar.tsx', // avatar skin, hair and clothing palette
  'src/components/ui/WorldThemeWrapper.tsx', // default world colour
  'src/components/mascot/Bito.tsx', // BITO_COLORS
];

const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g;

function walk(dir: string, out: string[]): void {
  let entries: DirEntry[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(path, out);
    else if (/\.(tsx?|css)$/.test(entry.name)) out.push(path);
  }
}

const files: string[] = [];
ROOTS.forEach((root) => walk(root, files));

interface Finding {
  file: string;
  line: number;
  text: string;
}
const findings: Finding[] = [];

for (const file of files) {
  if (ALLOW_LIST.some((allowed) => file.endsWith(allowed))) continue;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((text, i) => {
    // url(#id) and href="#id" are anchors, not colours
    const cleaned = text.replace(/url\(#[^)]*\)/g, '').replace(/href=["']#[^"']*["']/g, '');
    if (HEX.test(cleaned)) findings.push({ file, line: i + 1, text: text.trim().slice(0, 110) });
    HEX.lastIndex = 0;
  });
}

const strict = process.env.CHECK_COLORS_STRICT === '1';

if (findings.length === 0) {
  console.log(`check:colors passed: no hex literals in ${files.length} files (allow-list: ${ALLOW_LIST.length}).`);
} else {
  const byFile = new Map<string, Finding[]>();
  findings.forEach((f) => byFile.set(f.file, [...(byFile.get(f.file) ?? []), f]));
  const label = strict ? 'ERROR' : 'WARN';
  console.log(`check:colors ${label}: ${findings.length} hex literal(s) in ${byFile.size} file(s).`);
  for (const [file, list] of byFile) {
    console.log(`\n${file} (${list.length})`);
    list.slice(0, 5).forEach((f) => console.log(`  ${f.line}: ${f.text}`));
    if (list.length > 5) console.log(`  ... and ${list.length - 5} more`);
  }
  console.log(
    strict
      ? '\nStrict mode: failing.'
      : '\nWarn mode: exit 0. Set CHECK_COLORS_STRICT=1 to make this fail (integration pass).',
  );
}

process.exit(strict && findings.length > 0 ? 1 : 0);
