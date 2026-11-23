/**
 * Validasi seluruh konten kurikulum terhadap skema Zod, aturan §14.3, dan aturan copydeck C01-C34
 * (docs/superpowers/specs/2026-11-22-copydeck-guide.md §12).
 *
 * Jalankan via: npm run validate:content
 *
 * Aturan copydeck mulai sebagai PERINGATAN dan dicetak sebagai hitungan per dunia. Dunia yang punya file
 * penanda `src/content/worlds/<folder-dunia>/copydeck.done` memperlakukan aturan itu sebagai GALAT.
 * Aturan "peringatan tetap" (C31, C32, C33, kode M..) tidak pernah menjadi galat.
 *
 * Opsi:
 *   --details            cetak setiap temuan copydeck (semua dunia)
 *   --world=a01,b02      batasi daftar temuan ke dunia tertentu
 *   --code=C01,C25       batasi daftar temuan ke aturan tertentu
 *   --strict             semua dunia dianggap selesai (atau COPYDECK_STRICT=1); dipakai di integration pass
 *   --done=a01,b02       anggap dunia ini sudah selesai tanpa membuat file penanda (uji coba)
 */

import {
  GlossaryTermSchema,
  LessonSchema,
  StickerSchema,
  WorldSchema,
  resolveTxt,
  type Lesson,
  type Mode,
  type Question,
  type Rich,
  type Txt,
  type World,
} from '../src/content/schema';
import { WORLDS, LESSONS_BY_ID } from '../src/content/curriculum';
import { WORLD_METAS } from '../src/content/worldMeta';
import { CONTENT_ICONS } from '../src/content/icons';
import { visibleSegments } from '../src/content/rich';
import { COPYDECK_TRACE } from '../src/content/lessonHelpers';

declare const process: {
  exit(code?: number): never;
  cwd(): string;
  argv: string[];
  env: Record<string, string | undefined>;
};
import { GLOSSARY_TERMS } from '../src/content/glossary';
import { STICKERS } from '../src/content/stickers';

interface FsLike {
  existsSync(path: string): boolean;
}
// A variable specifier keeps this script free of @types/node
const fsModule = 'node:fs';
const fs = (await import(fsModule)) as unknown as FsLike;

const FORBIDDEN_NAMES = ['intan', 'sulistiya'];
const ALLOWED_EXTERNAL_HOSTS = new Set([
  'developer.mozilla.org',
  'web.dev',
  'w3.org',
  'www.w3.org',
  'jsonplaceholder.typicode.com',
  'pokeapi.co',
]);

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
  } else if (value && typeof value === 'object') {
    for (const v of Object.values(value)) collectStrings(v, out);
  }
  return out;
}

/** Teks kartu yang tampil di satu mode (potongan berpenanda mode lain tidak ikut). Kode ikut dihitung. */
function extractRichText(rich: Rich[], mode: 'junior' | 'pro'): string {
  return visibleSegments(rich, mode)
    .map((seg) => (seg.t === 'code' ? seg.v : resolveTxt(seg.v, mode)))
    .join('');
}

function checkForbiddenAndDomains(
  label: string,
  obj: unknown,
  allowExternal: boolean,
  errors: string[],
) {
  const strings = collectStrings(obj);
  for (const s of strings) {
    const lower = s.toLowerCase();
    for (const bad of FORBIDDEN_NAMES) {
      const re = new RegExp(`\\b${bad}\\b`, 'i');
      if (re.test(lower)) {
        errors.push(`${label}: mengandung nama terlarang "${bad}" dalam "${s.slice(0, 80)}"`);
      }
    }

    // Cek URL / domain selain *.example
    const urlMatches = s.match(/https?:\/\/([a-z0-9.-]+)/gi) ?? [];
    for (const u of urlMatches) {
      const host = u.replace(/^https?:\/\//i, '').toLowerCase();
      if (!host.endsWith('.example')) {
        if (!allowExternal || !ALLOWED_EXTERNAL_HOSTS.has(host)) {
          errors.push(`${label}: domain eksternal terlarang "${host}" pada "${s.slice(0, 80)}"`);
        }
      }
    }
  }
}

function validateQuestion(
  ctx: string,
  q: Question,
  isJuniorLesson: boolean,
  errors: string[],
) {
  if (isJuniorLesson && (!q.modes || q.modes.includes('junior'))) {
    if (!q.prompt.junior) errors.push(`${ctx} (${q.id}): prompt.junior wajib diisi`);
    if (!q.explainCorrect.junior) errors.push(`${ctx} (${q.id}): explainCorrect.junior wajib diisi`);
  }

  if (q.type === 'mcq' || q.type === 'analogy' || q.type === 'why' || q.type === 'scenario' || q.type === 'limit') {
    const choiceIds = new Set(q.choices.map((c) => c.id));
    if (!choiceIds.has(q.answer)) {
      errors.push(`${ctx} (${q.id}): answer "${q.answer}" tidak ada di choices`);
    }
    for (const c of q.choices) {
      if (isJuniorLesson && (!q.modes || q.modes.includes('junior')) && !c.label.junior) {
        errors.push(`${ctx} (${q.id}): pilihan ${c.id} tidak punya label.junior`);
      }
      if (c.id !== q.answer && c.id !== 'unknown') {
        if (!q.explainIncorrect || !q.explainIncorrect[c.id]) {
          errors.push(`${ctx} (${q.id}): pilihan salah "${c.id}" belum punya explainIncorrect`);
        }
      }
    }
  }

  if (q.type === 'sort') {
    const binIds = new Set(q.bins.map((b) => b.id));
    for (const item of q.items) {
      const target = q.answer[item.id];
      if (!target || !binIds.has(target)) {
        errors.push(`${ctx} (${q.id}): sort answer untuk item "${item.id}" merujuk bin tidak valid`);
      }
    }
  }

  if (q.type === 'order') {
    const itemIds = new Set(q.items.map((i) => i.id));
    if (q.answer.length !== q.items.length || q.answer.some((id) => !itemIds.has(id))) {
      errors.push(`${ctx} (${q.id}): order answer tidak cocok dengan items`);
    }
  }

  if (q.type === 'match') {
    const rightIds = new Set(q.right.map((r) => r.id));
    for (const l of q.left) {
      const target = q.answer[l.id];
      if (!target || !rightIds.has(target)) {
        errors.push(`${ctx} (${q.id}): match answer untuk "${l.id}" merujuk sisi kanan tidak valid`);
      }
    }
  }

  if (q.type === 'hotspot') {
    const regIds = new Set(q.regions.map((r) => r.id));
    if (!regIds.has(q.answer)) {
      errors.push(`${ctx} (${q.id}): hotspot answer "${q.answer}" tidak ada di regions`);
    }
  }
}

function validateTxtPair(
  ctx: string,
  txt: Txt,
  requireJunior: boolean,
  errors: string[],
) {
  if (requireJunior && !txt.junior) {
    errors.push(`${ctx}: wajib memiliki versi junior`);
  }
}

// ---------------------------------------------------------------------------------------------------------
// Aturan copydeck C01-C34 (+ X.. dan M..). Lihat docs/superpowers/specs/2026-11-22-copydeck-guide.md §12.
// ---------------------------------------------------------------------------------------------------------

const MARK = '\u0000'; // pengganti potongan kode: tidak dihitung sebagai kata

/** Aturan yang butuh penilaian manusia atau data sinkronisasi: tidak pernah menjadi galat. */
const FIXED_CODES = new Set(['C31', 'C32', 'C33', 'M01', 'M02', 'M03', 'X10']);
/** Aturan yang selalu galat, juga di dunia tanpa copydeck.done: keduanya menyembunyikan teks dari pembaca tanpa tanda. */
const ALWAYS_ERROR_CODES = new Set(['C15', 'X14']);

interface Finding {
  bucket: string; // id dunia ("a01") atau "global"
  code: string;
  msg: string;
}
const findings: Finding[] = [];
const findingKeys = new Set<string>();

function note(bucket: string, code: string, msg: string): void {
  const key = `${bucket}|${code}|${msg}`;
  if (findingKeys.has(key)) return;
  findingKeys.add(key);
  findings.push({ bucket, code, msg });
}

function ex(s: string): string {
  const t1 = s.replace(/\s+/g, ' ').replace(new RegExp(MARK, 'g'), '`…`').trim();
  return t1.length > 70 ? `${t1.slice(0, 67)}…` : t1;
}

function words(text: string): number {
  return text
    .split(/\s+/)
    .filter((tok) => tok !== MARK && /[\p{L}\p{N}]/u.test(tok)).length;
}

function sentencesOf(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?…])\s+/)
    .filter((s1) => /[\p{L}\p{N}]/u.test(s1));
}

/** Teks kartu untuk satu mode. Kode diganti penanda supaya tidak dihitung (guide §12). */
function richPlain(body: Rich[], mode: Mode): string {
  return visibleSegments(body, mode)
    .map((seg) => (seg.t === 'code' ? ` ${MARK} ` : resolveTxt(seg.v, mode)))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordRe(src: string, caseSensitive = false): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])(?:${src})(?![\\p{L}\\p{N}])`, caseSensitive ? 'gu' : 'giu');
}

interface WordEntry {
  re: RegExp;
}
const entries = (list: (string | [string, boolean])[]): WordEntry[] =>
  list.map((e) => (typeof e === 'string' ? { re: wordRe(e) } : { re: wordRe(e[0], e[1]) }));

/** §9.1 istilah teknis */
const WORDS_91 = entries([
  'requests?',
  'respon(?:se)?s?',
  'clients?',
  'endpoints?',
  'database',
  'autentikasi',
  'otorisasi',
  'enkripsi',
  'protokol',
  'parameter',
  'query',
  'headers?',
  'body',
  'payload',
  'kode status',
  'rate limit(?:ing)?',
  'tokens?',
  'cache',
  'timeout',
  'render',
  'deploy',
  'microservices?',
  'over-?fetching',
  'under-?fetching',
  'rasio kontras',
  'kode heks',
  'piksel',
  'milidetik',
  'Doherty Threshold',
  "Fitts(?:['’]s)?(?: Law)?",
  'Continuity',
  'Closure',
  'Figure[–-]ground',
  'Proximity',
  'Alignment',
  'server',
  'browser',
  'frontend',
  'backend',
  'website',
  'long polling',
  'websocket',
  'paket data',
  ['API', true],
  ['DOM', true],
  ['SSE', true],
]);
/** §9.2 kata baku yang terlalu berat */
const WORDS_92 = entries([
  'pengguna',
  'antarmuka',
  'interaksi',
  'paralel',
  'simultan',
  'mayoritas',
  'drastis',
  'signifikan',
  'destruktif',
  'mengaburkan',
  'memandu',
  'penerapan',
  'sehingga',
  'apabila',
  'jika',
  'sedangkan',
  'namun',
  'melainkan',
  'manakah',
  'dikarenakan',
  'oleh karena itu',
  'merupakan',
  'tersebut',
  'berdasarkan',
  'menurut',
  'melambangkan',
  'mewakili',
  'beserta',
  'berikut(?: ini)?',
  'mengolah',
  'perantara',
  'nyata',
  'ribuan',
  'kategori',
  'cerdas',
  'efisien',
  'menuntaskan',
]);
/** §9.3 kata buku teks */
const WORDS_93 = entries([
  'anatomi',
  'menguraikan',
  'metadata',
  'muatan',
  'entitas',
  'implementasi',
  'tersusun (?:atas|dari)',
  'berkinerja tinggi',
  'alih-alih',
  'memicu',
  'terpetakan',
  'terdefinisi',
]);
const WORDS_PAYLOAD = entries(['payload']);
/** §9.4 kata cakapan */
const WORDS_94 = entries([
  'tapi',
  'cuma',
  'gampang',
  'bikin',
  'nggak',
  'gak',
  'enggak',
  'gimana',
  'kenapa',
  'enaknya',
  'banget',
  'kayak',
  'udah',
  'aja',
  'ngobrol',
]);
const JUNIOR_WORD_LISTS = [...WORDS_91, ...WORDS_92, ...WORDS_93];
const PRO_WORD_LISTS = [...WORDS_92, ...WORDS_93, ...WORDS_PAYLOAD];

// ---- Glosarium ----
interface TermMatcher {
  id: string;
  res: RegExp[];
  tokens: Set<string>;
}

function termVariants(term: string): string[] {
  const out: string[] = [];
  for (const raw of term.split(/[()&/,]|\s+vs\s+/)) {
    const v = raw.trim();
    if (!v) continue;
    if (v.length < 2) continue;
    if (v.length === 2 && v !== v.toUpperCase()) continue;
    out.push(v);
  }
  return out;
}

function tokensOf(variants: string[]): Set<string> {
  const tokens = new Set<string>();
  for (const v of variants) {
    const lower = v.toLowerCase();
    tokens.add(lower);
    const ws = lower.split(/\s+/).map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''));
    for (let i = 0; i < ws.length; i += 1) {
      if (ws[i]) tokens.add(ws[i]);
      if (i + 1 < ws.length) tokens.add(`${ws[i]} ${ws[i + 1]}`);
    }
  }
  return tokens;
}

const escapeRe = (s1: string) => s1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const TERM_MATCHERS: TermMatcher[] = GLOSSARY_TERMS.map((g) => {
  const variants = termVariants(g.term);
  const res = variants.map((v) => {
    const cs = v === v.toUpperCase() && /[A-Z]/.test(v);
    return wordRe(escapeRe(v).replace(/\s+/g, '\\s+'), cs);
  });
  return { id: g.id, res, tokens: tokensOf(variants) };
});
const TERM_BY_ID = new Map(TERM_MATCHERS.map((m) => [m.id, m]));
const GLOSSARY_BY_ID = new Map(GLOSSARY_TERMS.map((g) => [g.id, g]));

function termsIn(text: string): Set<string> {
  const found = new Set<string>();
  for (const m of TERM_MATCHERS) {
    if (m.res.some((re) => re.test(text))) found.add(m.id);
    for (const re of m.res) re.lastIndex = 0;
  }
  return found;
}

/** Kecocokan pertama sebuah istilah di teks, atau -1. */
function termIndex(text: string, id: string): number {
  const m = TERM_BY_ID.get(id);
  if (!m) return -1;
  let best = -1;
  for (const re of m.res) {
    re.lastIndex = 0;
    const r = re.exec(text);
    re.lastIndex = 0;
    if (r && (best === -1 || r.index < best)) best = r.index;
  }
  return best;
}

// ---- Konteks teks ----
type Kind =
  | 'title'
  | 'objective'
  | 'recap'
  | 'story'
  | 'concept'
  | 'concept-title'
  | 'alt'
  | 'limit'
  | 'sim'
  | 'prompt'
  | 'qstory'
  | 'choice'
  | 'label'
  | 'explainC'
  | 'explainW'
  | 'hint'
  | 'tagline'
  | 'boss'
  | 'atWork'
  | 'talk'
  | 'def';

type Scope = 'card' | 'q' | 'review' | 'meta';

interface Item {
  where: string;
  kind: Kind;
  mode: Mode;
  scope: Scope;
  text: string;
}

interface Ctx {
  bucket: string;
  lesson?: Lesson;
  /** Istilah yang sudah dikenalkan sampai pelajaran ini (termasuk pelajaran ini). Himpunan hidup. */
  introduced: Set<string>;
  /** introducesTerms pelajaran ini + termId potongan rTerm di pelajaran ini + displayText rTerm. */
  lessonTokens: Set<string>;
  lessonTermIds: Set<string>;
}

function lessonRTerms(lesson: Lesson): { ids: Set<string>; display: Set<string> } {
  const ids = new Set<string>();
  const display = new Set<string>();
  const visit = (body: Rich[]) => {
    for (const seg of body) {
      if (seg.t !== 'term') continue;
      ids.add(seg.termId);
      for (const txt of [seg.v.junior, seg.v.pro]) {
        if (!txt) continue;
        const lower = txt.toLowerCase();
        display.add(lower);
        for (const w of lower.split(/\s+/)) display.add(w.replace(/[^\p{L}\p{N}-]/gu, ''));
      }
    }
  };
  for (const st of lesson.steps) {
    if (st.kind === 'story' || st.kind === 'concept') visit(st.body);
  }
  return { ids, display };
}

function buildLessonCtx(bucket: string, lesson: Lesson, introduced: Set<string>): Ctx {
  const { ids, display } = lessonRTerms(lesson);
  const lessonTermIds = new Set<string>([...lesson.introducesTerms, ...ids]);
  const lessonTokens = new Set<string>(display);
  for (const id of lessonTermIds) {
    for (const tk of TERM_BY_ID.get(id)?.tokens ?? []) lessonTokens.add(tk);
  }
  return { bucket, lesson, introduced, lessonTokens, lessonTermIds };
}

function exemptCandidates(w: string): string[] {
  const lower = w.toLowerCase();
  return [lower, lower.replace(/s$/, ''), `${lower}e`, lower.replace(/ing$/, ''), lower.replace(/ing$/, 'e')];
}

function isExemptWord(w: string, ctx: Ctx, lessonOnly: boolean): boolean {
  const cands = exemptCandidates(w);
  if (cands.some((c) => ctx.lessonTokens.has(c))) return true;
  if (lessonOnly) return false;
  for (const id of ctx.introduced) {
    const tk = TERM_BY_ID.get(id)?.tokens;
    if (tk && cands.some((c) => tk.has(c))) return true;
  }
  return false;
}

// ---- Pemeriksaan satu teks ----
const QUOTED = /"[^"]*"|“[^”]*”/g;
const EXPLAIN_VERDICT = /^[\s"“'(]*(?:benar|tepat|betul|hebat|jeli|mantap|hampir|salah(?!\s+satu))(?![\p{L}-])/iu;
const SARCASTIC = wordRe('tentu saja|jelas|masa sih');
const MULTI_AFFIX = /(?<![\p{L}\p{N}])(?:memper|diper)\p{L}{3,}(?:kan|i)(?![\p{L}\p{N}])/giu;
const HEX = /#[0-9a-fA-F]{3,8}(?![\p{L}\p{N}])/gu;
const PX = wordRe('px');
const RATIO = /\d+(?:[.,]\d+)?\s*:\s*1(?![\p{L}\p{N}])/gu;
const HTTP_VER = /HTTP\/\d/gi;
const STATUS_NUM = /(?<![\d.,])(?:20[0-9]|30[0-9]|40[0-9]|42[2-9]|50[0-4])(?![\d]|[.,]\d)/g;

function syllables(word: string): number {
  return (word.toLowerCase().match(/ai|au|oi|ei|[aeiou]/g) ?? []).length;
}

function runItem(item: Item, ctx: Ctx): void {
  const b = ctx.bucket;
  const text = item.text;
  if (!text) return;
  const sents = sentencesOf(text);
  const jun = item.mode === 'junior';

  for (const s1 of sents) {
    const n = words(s1);
    if (jun && n > 12) note(b, 'C01', `${item.where}: kalimat Junior ${n} kata (> 12): "${ex(s1)}"`);
    if (!jun && n > 20) note(b, 'C02', `${item.where}: kalimat Pro ${n} kata (> 20): "${ex(s1)}"`);
  }

  // C19 kata cakapan di luar tanda kutip
  const unquoted = text.replace(QUOTED, ' ');
  for (const e of WORDS_94) {
    for (const m of unquoted.matchAll(e.re)) {
      note(b, 'C19', `${item.where}: kata cakapan "${m[0]}" (${item.mode}): "${ex(text)}"`);
    }
  }

  if (jun) {
    for (const e of JUNIOR_WORD_LISTS) {
      for (const m of text.matchAll(e.re)) {
        if (isExemptWord(m[0], ctx, false)) continue;
        note(b, 'C07', `${item.where}: kata "${m[0]}" dari daftar ganti kata di teks Junior: "${ex(text)}"`);
      }
    }
    for (const re of [HEX, RATIO, HTTP_VER]) {
      for (const m of text.matchAll(re)) {
        note(b, 'C08', `${item.where}: angka teknis "${m[0]}" di teks Junior`);
      }
    }
    for (const m of text.matchAll(PX)) note(b, 'C08', `${item.where}: "${m[0]}" di teks Junior`);
    for (const m of text.matchAll(MULTI_AFFIX)) {
      if (syllables(m[0]) >= 4) note(b, 'C33', `${item.where}: kata berimbuhan ganda "${m[0]}"`);
    }
  } else {
    for (const e of PRO_WORD_LISTS) {
      for (const m of text.matchAll(e.re)) {
        if (isExemptWord(m[0], ctx, true)) continue;
        note(b, 'C20', `${item.where}: kata "${m[0]}" dari daftar ganti kata di teks Pro: "${ex(text)}"`);
      }
    }
    // Judul, label, dan pilihan bukan kalimat: daftar istilah di dalamnya wajar.
    const isLabel = ['choice', 'label', 'title', 'concept-title'].includes(item.kind);
    for (const s1 of isLabel ? [] : sents) {
      const found = termsIn(s1);
      if (found.size > 2) {
        note(b, 'C21', `${item.where}: ${found.size} istilah glosarium dalam satu kalimat Pro (${[...found].join(', ')}): "${ex(s1)}"`);
      }
      if (ctx.lesson) {
        const intro = [...found].filter((id) => ctx.lesson!.introducesTerms.includes(id));
        if (intro.length > 1) {
          note(b, 'C21', `${item.where}: ${intro.length} istilah baru dalam satu kalimat Pro (${intro.join(', ')}): "${ex(s1)}"`);
        }
      }
    }
  }

  if (item.kind === 'explainC' || item.kind === 'explainW') {
    if (EXPLAIN_VERDICT.test(text)) note(b, 'C12', `${item.where}: penjelasan diawali pujian atau vonis: "${ex(text)}"`);
    for (const m of text.matchAll(SARCASTIC)) {
      note(b, 'C31', `${item.where}: kata penegas "${m[0]}": "${ex(text)}"`);
    }
    if (sents.length > 2) note(b, 'C14', `${item.where}: penjelasan ${sents.length} kalimat (> 2) (${item.mode})`);
  }
  if (item.kind === 'prompt' && sents.length > 2) {
    note(b, 'C14', `${item.where}: pertanyaan ${sents.length} kalimat (> 2) (${item.mode})`);
  }
  if (item.kind === 'qstory') {
    const max = jun ? 3 : 2;
    if (sents.length > max) note(b, 'X11', `${item.where}: cerita soal ${sents.length} kalimat (> ${max}) (${item.mode})`);
  }
}

// ---- Soal ----
const MCQ_LIKE = new Set(['mcq', 'analogy', 'why', 'scenario', 'limit']);

function choicesOf(q: Question): { id: string; label: Txt; icon?: string }[] | undefined {
  return 'choices' in q ? q.choices : undefined;
}

function questionShown(q: Question, mode: Mode, lessonModes: Mode[] | undefined): boolean {
  if (lessonModes && !lessonModes.includes(mode)) return false;
  return !q.modes || q.modes.includes(mode);
}

function questionItems(q: Question, mode: Mode, where: string, scope: Scope): Item[] {
  const out: Item[] = [];
  const add = (kind: Kind, txt: Txt | undefined, tag = '') => {
    if (!txt) return;
    out.push({ where: `${where} ${kind}${tag}`, kind, mode, scope, text: resolveTxt(txt, mode) });
  };
  add('prompt', q.prompt);
  if (q.type === 'scenario') add('qstory', q.story);
  add('explainC', q.explainCorrect);
  for (const [k, v] of Object.entries(q.explainIncorrect ?? {})) add('explainW', v, `[${k}]`);
  q.hints?.forEach((h, i) => add('hint', h, `[${i}]`));
  for (const c of choicesOf(q) ?? []) add('choice', c.label, `[${c.id}]`);
  if (q.type === 'sort') {
    q.items.forEach((i) => add('label', i.label, `[${i.id}]`));
    q.bins.forEach((i) => add('label', i.label, `[bin ${i.id}]`));
  }
  if (q.type === 'order') q.items.forEach((i) => add('label', i.label, `[${i.id}]`));
  if (q.type === 'match') {
    q.left.forEach((i) => add('label', i.label, `[${i.id}]`));
    q.right.forEach((i) => add('label', i.label, `[${i.id}]`));
  }
  return out;
}

const CODE_IN_QUESTION = /`|<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?>/;

function checkQuestion(
  q: Question,
  ctx: Ctx,
  where: string,
  opts: { shownJ: boolean; shownP: boolean; scope: Scope; isAnchor: boolean; limitCardRisky?: boolean },
): void {
  const b = ctx.bucket;
  const { shownJ, shownP } = opts;

  // Teks per mode
  for (const mode of ['junior', 'pro'] as const) {
    if (mode === 'junior' ? !shownJ : !shownP) continue;
    for (const item of questionItems(q, mode, where, opts.scope)) runItem(item, ctx);
  }

  const ans: unknown = 'answer' in q ? q.answer : undefined;
  const answerKey = typeof ans === 'string' ? ans : typeof ans === 'boolean' ? String(ans) : undefined;
  if (answerKey !== undefined && q.explainIncorrect?.[answerKey]) {
    note(b, 'C11', `${where}: explainWrong ditulis pada pilihan yang benar ("${answerKey}")`);
  }

  // C28 kepanjangan singkatan, C18 pertanyaan pilihan harus bertanya
  for (const mode of ['junior', 'pro'] as const) {
    if (mode === 'junior' ? !shownJ : !shownP) continue;
    const prompt = resolveTxt(q.prompt, mode);
    const story = q.type === 'scenario' ? resolveTxt(q.story, mode) : '';
    if (/kepanjangan|singkatan dari|kependekan/i.test(`${prompt} ${story}`)) {
      note(b, 'C28', `${where}: soal menanyakan kepanjangan singkatan (${mode}): "${ex(prompt)}"`);
    }
    if (MCQ_LIKE.has(q.type)) {
      const trimmed = prompt.trim();
      if (!/[?]["”')\]]*$/.test(trimmed)) {
        note(b, 'C18', `${where}: pertanyaan tidak diakhiri "?" (${mode}): "${ex(prompt)}"`);
      }
    }
    // pilihan
    const choices = (choicesOf(q) ?? []).filter((c) => c.id !== 'unknown');
    if (choices.length >= 2 && typeof ans === 'string') {
      const lens = choices.map((c) => ({ id: c.id, n: words(resolveTxt(c.label, mode)) }));
      const max = Math.max(...lens.map((l) => l.n));
      const min = Math.min(...lens.map((l) => l.n));
      const limit = mode === 'junior' ? 3 : 5;
      if (max - min > limit) {
        note(b, 'C09', `${where}: selisih panjang pilihan ${max - min} kata (> ${limit}) (${mode})`);
      }
      const correct = lens.find((l) => l.id === ans);
      if (correct) {
        const others = lens.filter((l) => l.id !== ans);
        const maxOther = Math.max(...others.map((l) => l.n));
        if (others.length >= 1 && correct.n - maxOther >= 3) {
          note(b, 'C10', `${where}: pilihan benar satu-satunya yang terpanjang (${correct.n} vs ${maxOther} kata) (${mode})`);
        }
      }
    }
  }

  // C24 istilah di pilihan sudah dikenalkan
  const allowed = new Set<string>([...ctx.introduced, ...(ctx.lesson?.usesTerms ?? [])]);
  if (!opts.isAnchor) {
    const seen = new Set<string>();
    for (const mode of ['junior', 'pro'] as const) {
      if (mode === 'junior' ? !shownJ : !shownP) continue;
      for (const c of choicesOf(q) ?? []) {
        for (const id of termsIn(resolveTxt(c.label, mode).replace(/<\/?[a-z][a-z0-9]*>/gi, ' '))) {
          if (allowed.has(id) || seen.has(id)) continue;
          seen.add(id);
          note(b, 'C24', `${where}: pilihan "${ex(resolveTxt(c.label, mode))}" memuat istilah "${id}" yang belum dikenalkan`);
        }
      }
    }
  }

  // ikon: daftar tetap dan konsisten
  const iconLists: { icon?: string; label: Txt }[][] = [];
  const cs = choicesOf(q);
  if (cs) iconLists.push(cs);
  if (q.type === 'sort') iconLists.push(q.items, q.bins);
  if (q.type === 'order') iconLists.push(q.items);
  if (q.type === 'match') iconLists.push(q.left, q.right);
  const allowedIcons = new Set<string>(CONTENT_ICONS);
  for (const list of iconLists) {
    for (const el of list) {
      if (el.icon && !allowedIcons.has(el.icon)) note(b, 'X02', `${where}: ikon "${el.icon}" tidak ada di icons.ts`);
    }
    const withIcon = list.filter((el) => el.icon).length;
    if (withIcon > 0 && withIcon < list.length) {
      note(b, 'X02', `${where}: sebagian pilihan memakai ikon (${withIcon} dari ${list.length}); beri ikon pada semuanya atau tidak sama sekali`);
    }
  }

  if (shownJ) {
    if (q.type === 'spotbug' || q.type === 'fill' || q.type === 'type') {
      note(b, 'C03', `${where}: soal ${q.type} tampil di Junior (beri modes: ['pro'])`);
    }
    if (!opts.isAnchor && !q.hints?.[0]) note(b, 'C04', `${where}: soal Junior tanpa hints[0]`);

    // C05 teks Junior = teks Pro dan > 12 kata
    const same = (field: string, txt: Txt | undefined) => {
      if (!txt) return;
      if ((txt.junior === undefined || txt.junior === txt.pro) && words(txt.pro) > 12) {
        note(b, 'C05', `${where}: ${field} Junior sama dengan Pro (${words(txt.pro)} kata): "${ex(txt.pro)}"`);
      }
    };
    same('prompt', q.prompt);
    if (q.type === 'scenario') same('story', q.story);
    same('explainCorrect', q.explainCorrect);
    for (const [k, v] of Object.entries(q.explainIncorrect ?? {})) same(`explainIncorrect[${k}]`, v);

    // C27 angka status di soal Junior
    const texts: string[] = questionItems(q, 'junior', where, opts.scope).map((i) => i.text);
    const nums = new Set<string>();
    for (const tx of texts) for (const m of tx.matchAll(STATUS_NUM)) nums.add(m[0]);
    if (nums.size > 0 && ctx.lesson) {
      const cardText = ctx.lesson.steps
        .flatMap((st) =>
          st.kind === 'concept' && (!st.modes || st.modes.includes('junior'))
            ? [resolveTxt(st.title, 'junior'), extractRichText(st.body, 'junior')]
            : [],
        )
        .join(' ');
      for (const n of nums) {
        if (!new RegExp(`(?<![\\d.,])${n}(?![\\d])`).test(cardText)) {
          note(b, 'C27', `${where}: angka status ${n} di soal Junior, tidak ada di kartu konsep Junior pelajaran ini`);
        }
      }
    }

    // C29 wadah sort Junior
    if (q.type === 'sort') {
      for (const bin of q.bins) {
        const n = words(resolveTxt(bin.label, 'junior'));
        if (!bin.icon) note(b, 'C29', `${where}: wadah "${bin.id}" tanpa icon`);
        if (n < 1 || n > 2) note(b, 'C29', `${where}: label wadah "${bin.id}" ${n} kata (harus 1-2)`);
      }
    }

    // X05 tiga pilihan, X07 pertanyaan negatif, X12 kode di soal Junior
    const nChoices = (choicesOf(q) ?? []).filter((c) => c.id !== 'unknown').length;
    if (MCQ_LIKE.has(q.type) && nChoices !== 3) {
      note(b, 'X05', `${where}: soal Junior punya ${nChoices} pilihan (harus 3)`);
    }
    if (/(?<![\p{L}])TIDAK(?![\p{L}])/u.test(resolveTxt(q.prompt, 'junior'))) {
      note(b, 'X07', `${where}: pertanyaan negatif di Junior: "${ex(resolveTxt(q.prompt, 'junior'))}"`);
    }
    if (texts.some((tx) => CODE_IN_QUESTION.test(tx)) && q.type !== 'spotbug' && q.type !== 'fill' && q.type !== 'type') {
      note(b, 'X12', `${where}: soal Junior memuat kode atau tag (beri modes: ['pro'])`);
    }
    if (q.type === 'limit' && opts.limitCardRisky === false) {
      note(b, 'X01', `${where}: soal limit tampil di Junior padahal kartu Batas Analogi pelajaran ini riskyAnalogy: false`);
    }
  }

  if (shownP && !opts.isAnchor && (q.difficulty ?? 1) >= 2 && !q.hints?.[0]) {
    note(b, 'X04', `${where}: soal Pro tingkat ${q.difficulty} tanpa petunjuk`);
  }
}

// ---- Pelajaran ----
interface WorldAgg {
  long: Record<Mode, { n: number; hit: number }>;
}

function countJuniorIntroductions(lesson: Lesson, items: Item[]): number {
  if (lesson.introducesTerms.length <= 2 || !lesson.modes.includes('pro')) {
    return lesson.introducesTerms.length;
  }

  const proOnlyLinks = new Set<string>();
  const juniorLinks = new Set<string>();
  const juniorText = items.map((item) => item.text);
  const questions = [...lesson.reviewCards];
  if (lesson.companion?.offlineActivity) juniorText.push(lesson.companion.offlineActivity);

  for (const step of lesson.steps) {
    if (step.kind === 'question') questions.push(step.q);
    if (step.kind !== 'story' && step.kind !== 'concept') continue;
    const modes = step.kind === 'concept' ? step.modes : undefined;
    if (!modes || modes.includes('junior')) {
      juniorText.push(extractRichText(step.body, 'junior'));
      for (const segment of visibleSegments(step.body, 'junior')) {
        if (segment.t === 'term') juniorLinks.add(segment.termId);
      }
    }
    if (modes && !modes.includes('pro')) continue;
    for (const segment of visibleSegments(step.body, 'pro')) {
      if (segment.t === 'term' && (modes?.includes('junior') === false || segment.modes?.includes('junior') === false)) {
        proOnlyLinks.add(segment.termId);
      }
    }
  }
  for (const question of questions.filter((q) => questionShown(q, 'junior', lesson.modes))) {
    juniorText.push(...questionItems(question, 'junior', '', 'q').map((item) => item.text));
    if (question.type === 'limit') juniorText.push(resolveTxt(question.analogy, 'junior'));
  }

  // Count declarations by default. Only an explicitly Pro-only lesson link can justify an exemption.
  const shown = juniorText.join('\n');
  return lesson.introducesTerms.filter(
    (id) => !proOnlyLinks.has(id) || juniorLinks.has(id) || termIndex(shown, id) >= 0,
  ).length;
}

function checkLessonCopydeck(lesson: Lesson, world: World, ctx: Ctx, agg: WorldAgg): void {
  const b = world.id;
  const hasJ = lesson.modes.includes('junior');
  const hasP = lesson.modes.includes('pro');
  const lw = `Lesson ${lesson.id}`;
  const limitStepEntry = lesson.steps.find((st) => st.kind === 'limit');
  const limitRisky =
    limitStepEntry && limitStepEntry.kind === 'limit' ? Boolean(limitStepEntry.riskyAnalogy) : undefined;

  const itemsByMode: Record<Mode, Item[]> = { junior: [], pro: [] };
  const push = (mode: Mode, where: string, kind: Kind, scope: Scope, text: string | undefined) => {
    if (text) itemsByMode[mode].push({ where: `${lw} ${where}`, kind, mode, scope, text });
  };

  for (const mode of ['junior', 'pro'] as const) {
    if (!lesson.modes.includes(mode)) continue;
    push(mode, 'title', 'title', 'meta', lesson.title);
    push(mode, 'objective', 'objective', 'meta', resolveTxt(lesson.objective, mode));
    push(mode, 'recap', 'recap', 'meta', resolveTxt(lesson.recap, mode));
  }
  if (hasP) push('pro', 'atWork', 'atWork', 'meta', lesson.atWork);
  if (hasJ) lesson.companion?.talkPrompts.forEach((tp, i) => push('junior', `talkPrompts[${i}]`, 'talk', 'meta', tp));

  // ---- Langkah ----
  const readRuns: Record<Mode, { run: number; flagged: boolean }> = {
    junior: { run: 0, flagged: false },
    pro: { run: 0, flagged: false },
  };
  const stepIsRead = (mode: Mode, kind: 'read' | 'do') => {
    const st = readRuns[mode];
    if (kind === 'do') {
      st.run = 0;
      st.flagged = false;
    } else {
      st.run += 1;
      if (st.run > 2 && !st.flagged) {
        st.flagged = true;
        note(b, 'C25', `${lw}: lebih dari 2 kartu baca berturut-turut di mode ${mode} (kartu ke-${st.run}); pindahkan satu soal sebagai "Cek cepat"`);
      }
    }
  };
  const modeCounts: Record<Mode, { concepts: number; questions: number; sims: number }> = {
    junior: { concepts: 0, questions: 0, sims: 0 },
    pro: { concepts: 0, questions: 0, sims: 0 },
  };

  lesson.steps.forEach((st, idx) => {
    const sw = `step ${idx}`;
    for (const mode of ['junior', 'pro'] as const) {
      if (!lesson.modes.includes(mode)) continue;
      if (st.kind === 'story') {
        push(mode, `${sw} story`, 'story', 'card', richPlain(st.body, mode));
        stepIsRead(mode, 'read');
      } else if (st.kind === 'concept') {
        if (st.modes && !st.modes.includes(mode)) continue;
        push(mode, `${sw} concept-title`, 'concept-title', 'card', resolveTxt(st.title, mode));
        push(mode, `${sw} concept`, 'concept', 'card', richPlain(st.body, mode));
        push(mode, `${sw} alt`, 'alt', 'card', resolveTxt(st.visual.alt, mode));
        modeCounts[mode].concepts += 1;
        stepIsRead(mode, 'read');
      } else if (st.kind === 'limit') {
        if (mode === 'junior' && !st.riskyAnalogy) continue;
        push(mode, `${sw} limit-analogy`, 'limit', 'card', resolveTxt(st.analogy, mode));
        st.same.forEach((x, i) => push(mode, `${sw} same[${i}]`, 'limit', 'card', resolveTxt(x, mode)));
        st.different.forEach((x, i) => push(mode, `${sw} different[${i}]`, 'limit', 'card', resolveTxt(x, mode)));
        stepIsRead(mode, 'read');
      } else if (st.kind === 'sim') {
        push(mode, `${sw} sim`, 'sim', 'card', resolveTxt(st.instructions, mode));
        modeCounts[mode].sims += 1;
        stepIsRead(mode, 'do');
      } else if (st.kind === 'question') {
        if (!questionShown(st.q, mode, lesson.modes)) continue;
        modeCounts[mode].questions += 1;
        stepIsRead(mode, 'do');
      }
    }

    if (st.kind === 'limit' && COPYDECK_TRACE.implicitRisky.has(st)) {
      note(b, 'C15', `${lw} ${sw}: limitStep tanpa riskyAnalogy yang ditulis jelas`);
    }

    if (st.kind === 'story' || st.kind === 'concept') {
      // C06 dan C17: teks Junior hasil gabungan
      if (hasJ && (st.kind === 'story' || !st.modes || st.modes.includes('junior'))) {
        const vis = visibleSegments(st.body, 'junior');
        const codes = vis.filter((sg) => sg.t === 'code');
        if (codes.length > 1) note(b, 'C06', `${lw} ${sw}: ${codes.length} potongan kode di kartu Junior (maks 1)`);
        for (const c of codes) {
          if (c.t === 'code' && c.v.length > 12) {
            note(b, 'C06', `${lw} ${sw}: potongan kode Junior ${c.v.length} karakter (maks 12): "${ex(c.v)}"`);
          }
        }
        const parts = vis.map((sg) => (sg.t === 'code' ? sg.v : resolveTxt(sg.v, 'junior')));
        const joined = parts.join('');
        if (/(?<!\.)\.\.(?!\.)/.test(joined)) note(b, 'C17', `${lw} ${sw}: titik ganda di teks Junior: "${ex(joined)}"`);
        if (/ {2,}/.test(joined)) note(b, 'C17', `${lw} ${sw}: spasi ganda di teks Junior: "${ex(joined)}"`);
        if (/\p{Ll}[.!?]\p{Lu}/u.test(joined)) note(b, 'C17', `${lw} ${sw}: tanda baca menempel pada kata berikutnya: "${ex(joined)}"`);
        if (/\s[.,;:](?=\s|$)/.test(joined)) note(b, 'C17', `${lw} ${sw}: tanda baca terlepas dari kata sebelumnya: "${ex(joined)}"`);
        for (let i = 0; i + 1 < parts.length; i += 1) {
          const a = parts[i];
          const nx = parts[i + 1];
          if (/[.!?…]$/.test(a) && /^[\p{L}\p{N}`<]/u.test(nx)) {
            note(b, 'C17', `${lw} ${sw}: kalimat bersambung tanpa spasi pada pertemuan potongan: "…${ex(a.slice(-20))}" + "${ex(nx.slice(0, 20))}…"`);
          }
        }
      }
      if (st.kind === 'concept' && st.code) {
        const proWords = words(richPlain(st.body, 'pro'));
        if (hasP && (!st.modes || st.modes.includes('pro')) && proWords > 60) {
          note(b, 'X13', `${lw} ${sw}: kartu Pro dengan blok kode ${proWords} kata (maks 60)`);
        }
      }
    }

    if (st.kind === 'question') {
      const shownJ = hasJ && questionShown(st.q, 'junior', lesson.modes);
      const shownP = hasP && questionShown(st.q, 'pro', lesson.modes);
      checkQuestion(st.q, ctx, `${lw} ${sw} (${st.q.id})`, {
        shownJ,
        shownP,
        scope: 'q',
        isAnchor: false,
        limitCardRisky: limitRisky,
      });
      // C26 bahan
      const cs = (choicesOf(st.q) ?? []).filter((c) => c.id !== 'unknown');
      const stAns: unknown = 'answer' in st.q ? st.q.answer : undefined;
      if (cs.length >= 3 && typeof stAns === 'string') {
        for (const mode of ['junior', 'pro'] as const) {
          if (mode === 'junior' ? !shownJ : !shownP) continue;
          const lens = cs.map((c) => ({ id: c.id, n: resolveTxt(c.label, mode).length }));
          const correct = lens.find((l) => l.id === stAns);
          if (!correct) continue;
          agg.long[mode].n += 1;
          if (lens.every((l) => l.id === stAns || l.n < correct.n)) agg.long[mode].hit += 1;
        }
      }
      // items for estimate
      for (const mode of ['junior', 'pro'] as const) {
        if (!lesson.modes.includes(mode) || !questionShown(st.q, mode, lesson.modes)) continue;
        for (const item of questionItems(st.q, mode, `${lw} ${sw}`, 'q')) {
          if (['prompt', 'qstory', 'choice', 'label'].includes(item.kind)) itemsByMode[mode].push({ ...item, scope: 'q' });
        }
      }
    }
  });

  lesson.reviewCards.forEach((rc, i) => {
    const shownJ = hasJ && questionShown(rc, 'junior', lesson.modes);
    const shownP = hasP && questionShown(rc, 'pro', lesson.modes);
    checkQuestion(rc, ctx, `${lw} reviewCard[${i}] (${rc.id})`, { shownJ, shownP, scope: 'review', isAnchor: false });
  });

  // Teks kartu dan meta (pertanyaan sudah diperiksa di checkQuestion)
  for (const mode of ['junior', 'pro'] as const) {
    for (const item of itemsByMode[mode]) {
      if (item.scope === 'q') continue;
      runItem(item, ctx);
    }
  }

  // C13, C32 (Junior)
  if (hasJ) {
    const jq = modeCounts.junior.questions;
    if (!lesson.isSideQuest && jq < 4) note(b, 'C13', `${lw}: hanya ${jq} soal yang tampil di Junior (minimal 4)`);
    if (modeCounts.junior.concepts > 2 || jq > 5) {
      note(b, 'C32', `${lw}: ${modeCounts.junior.concepts} kartu konsep dan ${jq} soal di Junior (maks 2 dan 5)`);
    }
    const juniorIntroductions = countJuniorIntroductions(lesson, itemsByMode.junior);
    if (juniorIntroductions > 2) {
      note(b, 'X08', `${lw}: ${juniorIntroductions} istilah baru (maks 2 untuk Junior)`);
    }
    // C16 istilah yang dipakai di pelajaran Junior
    const used = new Set<string>([...lesson.introducesTerms, ...lesson.usesTerms, ...ctx.lessonTermIds]);
    for (const id of used) {
      const g = GLOSSARY_BY_ID.get(id);
      if (!g) continue;
      if (!g.pronunciation) note(b, 'C16', `${lw}: istilah "${id}" tanpa pronunciation di glossary.ts`);
      if (!g.shortDef.junior) note(b, 'C16', `${lw}: istilah "${id}" tanpa shortDef.junior di glossary.ts`);
    }
    if (!/^Aku bisa/.test(resolveTxt(lesson.objective, 'junior'))) {
      note(b, 'X09', `${lw}: tujuan Junior tidak diawali "Aku bisa"`);
    }
  }
  if (hasP) {
    if (lesson.introducesTerms.length > 3) {
      note(b, 'X08', `${lw}: ${lesson.introducesTerms.length} istilah baru (maks 3)`);
    }
    if (!/^Kamu bisa/.test(resolveTxt(lesson.objective, 'pro'))) {
      note(b, 'X09', `${lw}: tujuan Pro tidak diawali "Kamu bisa"`);
    }
    // C23 dan C22
    for (const id of lesson.introducesTerms) {
      const g = GLOSSARY_BY_ID.get(id);
      if (!g) continue;
      if (!g.pronunciation) note(b, 'C23', `${lw}: istilah "${id}" tanpa pronunciation di glossary.ts`);
      if (!g.shortDef.pro) note(b, 'C23', `${lw}: istilah "${id}" tanpa shortDef.pro di glossary.ts`);
    }
    const proCards = itemsByMode.pro.filter((it) => it.kind === 'story' || it.kind === 'concept');
    for (const id of lesson.introducesTerms) {
      for (const card of proCards) {
        if (termIndex(card.text, id) < 0) continue;
        const sentence = sentencesOf(card.text).find((s1) => termIndex(s1, id) >= 0) ?? '';
        if (!/[(]|disebut|adalah|yaitu/i.test(sentence)) {
          note(b, 'C22', `${lw}: istilah "${id}" muncul pertama kali tanpa arti di kalimat yang sama: "${ex(sentence)}"`);
        }
        break;
      }
    }
    // C30 atWork
    if (!lesson.atWork) note(b, 'C30', `${lw}: pelajaran Pro tanpa atWork`);
    else {
      const n = words(lesson.atWork);
      if (n > 20 || sentencesOf(lesson.atWork).length > 1) {
        note(b, 'C30', `${lw}: atWork ${n} kata dalam ${sentencesOf(lesson.atWork).length} kalimat (1 kalimat, maks 20 kata)`);
      }
    }
  }
  if (lesson.title.split(/\s+/).length > 6) {
    note(b, 'X10', `${lw}: judul ${lesson.title.split(/\s+/).length} kata (maks 6): "${lesson.title}"`);
  }

  // C34 perkiraan waktu
  const estMode: Mode = hasJ ? 'junior' : 'pro';
  const readWords = itemsByMode[estMode]
    .filter((it) => it.scope === 'card' || it.scope === 'q')
    .reduce((sum, it) => sum + (it.kind === 'concept-title' || it.kind === 'alt' ? 0 : words(it.text)), 0);
  const { questions, sims } = modeCounts[estMode];
  const wpm = estMode === 'junior' ? 70 : 150;
  const perQ = estMode === 'junior' ? 25 : 20;
  const est = (readWords / wpm) * 60 + questions * perQ + sims * 60;
  const estMin = Math.round(est / 60);
  if (lesson.estMinutes < estMin) {
    note(
      b,
      'C34',
      `${lw}: estMinutes ${lesson.estMinutes} < perkiraan ${(est / 60).toFixed(1)} menit (mode ${estMode}: ${readWords} kata, ${questions} soal, ${sims} simulasi)`,
    );
  }
}

function copydeckWorldTexts(
  world: World,
  taglineMeta: Txt | undefined,
  agg: WorldAgg,
  introduced: Set<string>,
): void {
  const ctx: Ctx = { bucket: world.id, introduced, lessonTokens: new Set(), lessonTermIds: new Set() };
  for (const mode of ['junior', 'pro'] as const) {
    if (taglineMeta) {
      runItem(
        { where: `World ${world.id} tagline (worldMeta)`, kind: 'tagline', mode, scope: 'meta', text: resolveTxt(taglineMeta, mode) },
        ctx,
      );
    }
    runItem(
      { where: `World ${world.id} boss.greeting`, kind: 'boss', mode, scope: 'meta', text: resolveTxt(world.boss.greeting, mode) },
      ctx,
    );
    // Soal jangkar: hanya daftar mode itu
    for (const aq of world.anchors[mode]) {
      checkQuestion(aq, ctx, `World ${world.id} anchor ${aq.id}`, {
        shownJ: mode === 'junior',
        shownP: mode === 'pro',
        scope: 'q',
        isAnchor: true,
      });
    }
  }

  // C26 per dunia, per mode
  for (const mode of ['junior', 'pro'] as const) {
    const { n, hit } = agg.long[mode];
    if (n >= 5 && hit / n > 0.3) {
      note(
        world.id,
        'C26',
        `World ${world.id} (${mode}): pilihan benar adalah yang terpanjang pada ${hit} dari ${n} soal pilihan (${Math.round((hit / n) * 100)}%, batas 30%)`,
      );
    }
  }
}

const WORLD_ID_FROM_QUESTION = /^([ab]\d{2})-/;

function copydeckGlobalTexts(): void {
  for (const g of GLOSSARY_TERMS) {
    for (const mode of ['junior', 'pro'] as const) {
      const txt = mode === 'junior' ? g.shortDef.junior : g.shortDef.pro;
      if (!txt) continue;
      const item: Item = { where: `Glossary ${g.id} shortDef`, kind: 'def', mode, scope: 'meta', text: txt };
      // Hanya aturan panjang kalimat dan kata cakapan; daftar kata dan istilah dinilai di pelajaran.
      for (const s1 of sentencesOf(txt)) {
        const n = words(s1);
        if (mode === 'junior' && n > 12) note('global', 'C01', `${item.where}: kalimat Junior ${n} kata (> 12): "${ex(s1)}"`);
        if (mode === 'pro' && n > 20) note('global', 'C02', `${item.where}: kalimat Pro ${n} kata (> 20): "${ex(s1)}"`);
      }
      for (const e of WORDS_94) {
        for (const m of txt.replace(QUOTED, ' ').matchAll(e.re)) {
          note('global', 'C19', `${item.where}: kata cakapan "${m[0]}" (${mode})`);
        }
      }
    }
  }
  for (const st of STICKERS) {
    for (const mode of ['junior', 'pro'] as const) {
      const txt = resolveTxt(st.summary, mode);
      for (const s1 of sentencesOf(txt)) {
        const n = words(s1);
        if (mode === 'junior' && n > 12) note('global', 'C01', `Sticker ${st.id} summary: kalimat Junior ${n} kata (> 12): "${ex(s1)}"`);
        if (mode === 'pro' && n > 20) note('global', 'C02', `Sticker ${st.id} summary: kalimat Pro ${n} kata (> 20): "${ex(s1)}"`);
      }
      for (const e of WORDS_94) {
        for (const m of txt.replace(QUOTED, ' ').matchAll(e.re)) {
          note('global', 'C19', `Sticker ${st.id} summary: kata cakapan "${m[0]}" (${mode})`);
        }
      }
    }
  }
}

function copydeckTraces(worldIds: Set<string>): void {
  for (const { questionId, choiceId } of COPYDECK_TRACE.wrongOnCorrect) {
    const w = WORLD_ID_FROM_QUESTION.exec(questionId)?.[1];
    note(w && worldIds.has(w) ? w : 'global', 'C11', `Question ${questionId}: explainWrong ditulis pada pilihan yang benar ("${choiceId}"), tidak pernah tampil`);
  }
  for (const { questionId, choiceId } of COPYDECK_TRACE.fallbackExplain) {
    const w = WORLD_ID_FROM_QUESTION.exec(questionId)?.[1];
    note(w && worldIds.has(w) ? w : 'global', 'X14', `Question ${questionId}: pilihan salah "${choiceId}" tanpa explainWrong, teks bawaan makeMcq akan tampil`);
  }
}

function copydeckMetaSync(world: World): void {
  const meta = WORLD_METAS.find((m) => m.id === world.id);
  if (!meta) {
    note(world.id, 'M01', `World ${world.id}: tidak ada di worldMeta.ts`);
    return;
  }
  if (meta.title !== world.title) {
    note(world.id, 'M03', `World ${world.id}: judul worldMeta "${meta.title}" berbeda dari index.ts "${world.title}"`);
  }
  if (meta.tagline.junior !== world.tagline.junior || meta.tagline.pro !== world.tagline.pro) {
    note(world.id, 'M02', `World ${world.id}: tagline di index.ts berbeda dari worldMeta.ts; salin dari worldMeta.ts`);
  }
  const all = [...world.lessons, ...world.sideQuests];
  const metaLessons = [...meta.lessons, ...meta.sideQuests];
  if (all.join() !== metaLessons.map((l) => l.id).join()) {
    note(world.id, 'M01', `World ${world.id}: daftar pelajaran worldMeta.ts berbeda dari index.ts`);
  }
  for (const ml of metaLessons) {
    const lesson = LESSONS_BY_ID[ml.id];
    if (!lesson) continue;
    if (lesson.title !== ml.title) note(world.id, 'M03', `Lesson ${ml.id}: judul worldMeta "${ml.title}" berbeda dari index.ts "${lesson.title}"`);
    if (lesson.estMinutes !== ml.estMinutes) {
      note(world.id, 'M03', `Lesson ${ml.id}: estMinutes worldMeta ${ml.estMinutes} berbeda dari index.ts ${lesson.estMinutes}`);
    }
    if (lesson.modes.join() !== ml.modes.join()) note(world.id, 'M01', `Lesson ${ml.id}: modes worldMeta berbeda dari index.ts`);
  }
}

const CLI = process.argv.slice(2);
const cliValue = (name: string): string[] =>
  (CLI.find((a) => a.startsWith(`--${name}=`)) ?? '').split('=')[1]?.split(',').filter(Boolean) ?? [];

function worldHasMarker(worldId: string): boolean {
  const dir = WORLD_METAS.find((m) => m.id === worldId)?.dir;
  if (!dir) return false;
  return fs.existsSync(`${process.cwd()}/src/content/worlds/${dir}/copydeck.done`);
}

function reportCopydeck(errors: string[], worldOrder: string[]): void {
  const strict = CLI.includes('--strict') || process.env.COPYDECK_STRICT === '1';
  const assumed = cliValue('done');
  const done = new Set(worldOrder.filter((id) => strict || assumed.includes(id) || worldHasMarker(id)));
  const byBucket = new Map<string, { codes: Map<string, number>; errors: number; warnings: number }>();
  let totalErr = 0;
  for (const f of findings) {
    const row = byBucket.get(f.bucket) ?? { codes: new Map<string, number>(), errors: 0, warnings: 0 };
    row.codes.set(f.code, (row.codes.get(f.code) ?? 0) + 1);
    if (ALWAYS_ERROR_CODES.has(f.code) || (done.has(f.bucket) && !FIXED_CODES.has(f.code))) {
      errors.push(`[copydeck ${f.code}] ${f.bucket}: ${f.msg}`);
      row.errors += 1;
      totalErr += 1;
    } else {
      row.warnings += 1;
    }
    byBucket.set(f.bucket, row);
  }

  const lines = ['  dunia   galat   peringatan   aturan'];
  for (const id of [...worldOrder, 'global']) {
    const row = byBucket.get(id);
    if (!row && id === 'global') continue;
    const codes = [...(row?.codes ?? [])].sort(([a], [b]) => a.localeCompare(b));
    lines.push(`  ${id.padEnd(7)} ${String(row?.errors ?? 0).padStart(5)}   ${String(row?.warnings ?? 0).padStart(10)}   ${codes.map(([c, n]) => `${c}x${n}`).join(' ')}`.trimEnd());
  }
  console.log(
    `Copydeck C01-C34 per dunia (${done.size} dari ${worldOrder.length} dunia sudah ditandai copydeck.done${strict ? ', mode strict' : ''}):\n${lines.join('\n')}\n  total: ${findings.length - totalErr} peringatan, ${totalErr} galat copydeck.`,
  );

  const wantWorlds = cliValue('world');
  const wantCodes = cliValue('code');
  if (CLI.includes('--details') || wantWorlds.length > 0 || wantCodes.length > 0) {
    const shown = findings.filter(
      (f) => (wantWorlds.length === 0 || wantWorlds.includes(f.bucket)) && (wantCodes.length === 0 || wantCodes.includes(f.code)),
    );
    console.log(`\nTemuan copydeck (${shown.length}):`);
    for (const f of shown) console.log(`  [${f.code}] ${f.bucket}: ${f.msg}`);
  } else {
    console.log('  (tambahkan --details, --world=a01 atau --code=C01 untuk daftar temuan)');
  }
}

function main(): void {
  const errors: string[] = [];
  const warnings: string[] = [];

  const worldIds = new Set<string>();
  const lessonIds = new Set<string>();
  const introducedTerms = new Set<string>();
  const glossaryIds = new Set(GLOSSARY_TERMS.map((g) => g.id));

  // Validasi glosarium & stiker
  for (const g of GLOSSARY_TERMS) {
    const parsed = GlossaryTermSchema.safeParse(g);
    if (!parsed.success) {
      errors.push(`Glossary ${g.id}: ${parsed.error.message}`);
    }
    checkForbiddenAndDomains(`Glossary ${g.id}`, g, false, errors);
  }

  const stickerIds = new Set<string>();
  for (const st of STICKERS) {
    const parsed = StickerSchema.safeParse(st);
    if (!parsed.success) {
      errors.push(`Sticker ${st.id}: ${parsed.error.message}`);
    }
    if (stickerIds.has(st.id)) {
      errors.push(`Sticker ID duplikat: ${st.id}`);
    }
    stickerIds.add(st.id);
    checkForbiddenAndDomains(`Sticker ${st.id}`, st, false, errors);
  }

  // Urutkan dunia A1..A12 lalu B1..B10
  const orderedWorlds: World[] = [...WORLDS].sort((a, b) => {
    if (a.track !== b.track) return a.track.localeCompare(b.track);
    return a.order - b.order;
  });

  for (const world of orderedWorlds) {
    const wParsed = WorldSchema.safeParse(world);
    if (!wParsed.success) {
      errors.push(`World ${world.id}: ${wParsed.error.message}`);
    }
    if (worldIds.has(world.id)) {
      errors.push(`World ID duplikat: ${world.id}`);
    }
    worldIds.add(world.id);
    checkForbiddenAndDomains(`World ${world.id}`, world, false, errors);

    // Kumpulkan semua soal pelajaran & bank soal dunia untuk cek keunikan soal jangkar
    const worldPromptSet = new Set<string>();

    const agg: WorldAgg = { long: { junior: { n: 0, hit: 0 }, pro: { n: 0, hit: 0 } } };

    const allWorldLessonIds = [...world.lessons, ...world.sideQuests];
    for (const lid of allWorldLessonIds) {
      const lesson: Lesson | undefined = LESSONS_BY_ID[lid];
      if (!lesson) {
        errors.push(`World ${world.id}: lesson "${lid}" tidak ditemukan di curriculum`);
        continue;
      }

      const lParsed = LessonSchema.safeParse(lesson);
      if (!lParsed.success) {
        errors.push(`Lesson ${lesson.id}: ${lParsed.error.message}`);
      }
      if (lessonIds.has(lesson.id)) {
        errors.push(`Lesson ID duplikat: ${lesson.id}`);
      }
      lessonIds.add(lesson.id);

      const hasJunior = lesson.modes.includes('junior');
      checkForbiddenAndDomains(`Lesson ${lesson.id}`, lesson, Boolean(lesson.external), errors);

      validateTxtPair(`Lesson ${lesson.id} objective`, lesson.objective, hasJunior, errors);
      validateTxtPair(`Lesson ${lesson.id} recap`, lesson.recap, hasJunior, errors);

      if (lesson.estMinutes > 7) {
        warnings.push(`Lesson ${lesson.id}: estMinutes = ${lesson.estMinutes} (> 7 menit)`);
      }

      // Aturan istilah: usesTerms harus sudah ada di introducesTerms sebelumnya atau milik pelajaran ini
      for (const termId of lesson.introducesTerms) {
        if (!glossaryIds.has(termId)) {
          errors.push(`Lesson ${lesson.id}: introducesTerms "${termId}" tidak ada di glossary.ts`);
        }
        introducedTerms.add(termId);
      }
      for (const termId of lesson.usesTerms) {
        if (!introducedTerms.has(termId)) {
          errors.push(
            `Lesson ${lesson.id}: usesTerms "${termId}" dipakai sebelum diperkenalkan di pelajaran sebelumnya`,
          );
        }
      }

      let hasStory = false;
      let hasLimitCard = false;
      let hasLimitQuestion = false;
      let questionCount = 0;

      for (let idx = 0; idx < lesson.steps.length; idx += 1) {
        const step = lesson.steps[idx];
        if (step.kind === 'story') {
          hasStory = true;
        }
        if (step.kind === 'concept') {
          if (!step.visual) {
            errors.push(`Lesson ${lesson.id} step ${idx}: kartu concept wajib punya visual`);
          }
          const isJuniorStep = hasJunior && (!step.modes || step.modes.includes('junior'));
          if (isJuniorStep) {
            const jWords = countWords(extractRichText(step.body, 'junior'));
            if (jWords > 40) {
              errors.push(`Lesson ${lesson.id} step ${idx}: teks Junior ${jWords} kata (> 40)`);
            }
          }
          const pWords = countWords(extractRichText(step.body, 'pro'));
          if (pWords > 80) {
            errors.push(`Lesson ${lesson.id} step ${idx}: teks Pro ${pWords} kata (> 80)`);
          }
        }
        if (step.kind === 'limit') {
          hasLimitCard = true;
        }
        if (step.kind === 'question') {
          questionCount += 1;
          if (step.q.type === 'limit') hasLimitQuestion = true;
          validateQuestion(`Lesson ${lesson.id} step ${idx}`, step.q, hasJunior, errors);
          worldPromptSet.add(step.q.prompt.pro.trim().toLowerCase());
          if (step.q.prompt.junior) {
            worldPromptSet.add(step.q.prompt.junior.trim().toLowerCase());
          }
        }
      }

      if (hasStory && !hasLimitCard) {
        errors.push(`Lesson ${lesson.id}: punya kartu story tetapi tidak punya kartu Batas Analogi (limit)`);
      }
      if (hasLimitCard && !hasLimitQuestion) {
        errors.push(`Lesson ${lesson.id}: punya kartu limit tetapi belum punya minimal 1 soal tipe limit`);
      }
      if (!lesson.isSideQuest && questionCount < 6) {
        errors.push(`Lesson ${lesson.id}: jumlah soal ${questionCount} (< 6)`);
      }
      if (lesson.reviewCards.length < 2) {
        errors.push(`Lesson ${lesson.id}: reviewCards < 2`);
      }
      for (const rc of lesson.reviewCards) {
        validateQuestion(`Lesson ${lesson.id} reviewCard`, rc, hasJunior, errors);
      }

      checkLessonCopydeck(lesson, world, buildLessonCtx(world.id, lesson, introducedTerms), agg);
    }

    copydeckWorldTexts(world, WORLD_METAS.find((m) => m.id === world.id)?.tagline, agg, introducedTerms);
    copydeckMetaSync(world);

    // Validasi soal jangkar dunia (§14.3)
    for (const mode of ['junior', 'pro'] as const) {
      const anchors = world.anchors[mode];
      const expectedLen = mode === 'junior' ? 5 : 6;
      if (anchors.length !== expectedLen) {
        errors.push(`World ${world.id} anchors.${mode}: jumlah ${anchors.length} (wajib ${expectedLen})`);
      }
      for (const aq of anchors) {
        if (!('choices' in aq) || !aq.choices.some((c) => c.id === 'unknown' && c.label.pro === 'Belum tahu')) {
          errors.push(`World ${world.id} anchor ${aq.id}: wajib punya pilihan "Belum tahu" (id: "unknown")`);
        }
        const pLower = (mode === 'junior' ? aq.prompt.junior ?? aq.prompt.pro : aq.prompt.pro)
          .trim()
          .toLowerCase();
        if (worldPromptSet.has(pLower)) {
          errors.push(
            `World ${world.id} anchor ${aq.id}: pertanyaan jangkar sama persis dengan soal pelajaran di dunia ini`,
          );
        }
      }
    }
  }

  copydeckGlobalTexts();
  copydeckTraces(worldIds);
  reportCopydeck(
    errors,
    orderedWorlds.map((w) => w.id),
  );

  if (warnings.length > 0) {
    console.warn(`Warnings (${warnings.length}):\n` + warnings.slice(0, 10).join('\n'));
  }

  if (errors.length > 0) {
    console.error(`Content validation failed with ${errors.length} error(s):\n` + errors.slice(0, 60).join('\n'));
    process.exit(1);
  }

  console.log(
    `Content validation passed: ${WORLDS.length} worlds, ${Object.keys(LESSONS_BY_ID).length} lessons/side-quests, ${STICKERS.length} stickers, ${GLOSSARY_TERMS.length} glossary terms (0 errors).`,
  );
}

main();
