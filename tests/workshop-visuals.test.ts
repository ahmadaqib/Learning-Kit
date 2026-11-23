import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import { resolveTxt } from '@/content/schema';
import { loadWorldBundle } from '@/content/worldLoader';
import { workshopVisual } from '@/components/illustrations/workshopVisual';

// Authored visual names and props cross a string-keyed content boundary.
it.each([
  ['a04-sq1', ['Daftar awal']],
  ['a04-sq2', ['Periksa berkas']],
  ['a11-sq1', ['npm run build']],
  ['a11-sq2', ['404 Not Found']],
  ['a11-sq3', ['Rp100.000']],
  ['a11-sq4', ['Alamat publik']],
  ['b09-sq1', ['KartuProduk', 'Tambah barang (1)']],
] as const)('renders the worked examples authored for %s', async (id, expectedLabels) => {
  const [worldId] = id.split('-');
  const bundle = await loadWorldBundle(worldId);
  const lesson = bundle.lessons.find(item => item.id === id);
  expect(lesson).toBeDefined();
  const rendered = lesson!.steps.flatMap(step => {
    if (step.kind !== 'concept' || step.visual.type !== 'component') return [];
    const { name, alt, props } = step.visual;
    const diagram = workshopVisual(name, resolveTxt(alt, 'pro'), props);
    return diagram ? [renderToStaticMarkup(diagram)] : [];
  });
  expect(rendered).toHaveLength(expectedLabels.length);
  expectedLabels.forEach((label, index) => expect(rendered[index]).toContain(label));
});
