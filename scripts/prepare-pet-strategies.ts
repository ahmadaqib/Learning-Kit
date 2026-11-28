import { rename, writeFile } from 'node:fs/promises';
import { AI_CHAT_URL } from '../server/aiProvider';
import { WORLD_METAS } from '../src/content/worldMeta';
import { PET_AI_STEP_KINDS, PET_AI_TIP_IDS } from '../src/content/petContract';

const models = [...new Set((process.env.ONEINFERENCE_MODELS ?? '').split(',').map(id => id.trim()).filter(Boolean))].slice(0, 4);
const key = process.env.ONEINFERENCE_API_KEY;
if (!key || !models.length) throw new Error('Configure ONEINFERENCE_API_KEY and ONEINFERENCE_MODELS before preparing the catalog.');

const lessons = WORLD_METAS.flatMap(world => [...world.lessons, ...world.sideQuests])
  .filter(lesson => lesson.modes.includes('pro'));
const prompt = `Pilih strategi belajar untuk setiap judul pelajaran web. Untuk setiap judul, pilih satu strategi untuk masing-masing jenis kartu dalam urutan concept, story, sim, limit. recall mengajak peserta menjelaskan satu gagasan dari ingatan, compare membandingkan dua contoh, predict memperkirakan akibat sebuah perubahan. Pilih berdasarkan topik dan tindakan yang mungkin di kartu. Untuk simulasi utamakan prediksi atau perbandingan yang dapat diuji. Untuk batas analogi utamakan perbandingan. Keluarkan JSON object tanpa penjelasan: setiap key adalah ID persis dari input; nilainya array empat string, setiap string recall, compare, atau predict.`;

type LessonSummary = Pick<(typeof lessons)[number], 'id' | 'title'>;
const unavailableModels = new Set<string>();
async function prepare(batch: LessonSummary[]) {
  for (const model of models.filter(id => !unavailableModels.has(id))) {
    const response = await fetch(AI_CHAT_URL, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(90_000),
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: prompt }, { role: 'user', content: JSON.stringify(batch) }], max_tokens: 4096 }),
    });
    if ([401, 402, 429].includes(response.status) || response.headers.get('cf-mitigated') === 'challenge') {
      throw new Error('1Inference cannot serve the editorial request (HTTP ' + response.status + ').');
    }
    if (!response.ok) {
      if (response.status === 404) unavailableModels.add(model);
      console.warn('Skipping model', model, 'HTTP', response.status);
      continue;
    }
    const result = await response.json();
    const content = result?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') continue;
    let rows;
    try {
      rows = JSON.parse(content.trim().replace(/^```(?:json)?\s*|\s*```$/g, ''));
    } catch {
      continue;
    }
    const valid = rows && batch.every(({ id }) => Array.isArray(rows[id]) && rows[id].length === PET_AI_STEP_KINDS.length &&
      rows[id].every((entry: unknown) => PET_AI_TIP_IDS.some(allowed => allowed === entry)));
    if (valid) return rows as Record<string, string[]>;
  }
  throw new Error('No configured model returned a complete valid batch. The published catalog was left intact.');
}

const lines = [
  '// Generated from published curriculum titles by scripts/prepare-pet-strategies.ts.',
  "import type { PetAiStepKind, PetAiTipId } from '../src/content/petContract.js';",
  '',
  'export const preparedPetStrategies: Readonly<Record<string, Readonly<Record<PetAiStepKind, PetAiTipId>>>> = {',
];
for (let start = 0; start < lessons.length; start += 20) {
  const batch = lessons.slice(start, start + 20).map(({ id, title }) => ({ id, title }));
  const rows = await prepare(batch);
  for (const { id } of batch) {
    const fields = PET_AI_STEP_KINDS.map((kind, i) => kind + ": '" + rows[id][i] + "'").join(', ');
    lines.push("  '" + id + "': { " + fields + ' },');
  }
  console.log('Prepared', start + batch.length, '/', lessons.length);
}
lines.push('};', '');
const destination = new URL('../server/preparedPetStrategies.ts', import.meta.url);
const temporary = new URL(destination.href + '.' + process.pid + '.tmp');
await writeFile(temporary, lines.join('\n'));
await rename(temporary, destination);
