/**
 * Validasi seluruh konten kurikulum terhadap skema Zod dan aturan §14.3.
 * Jalankan via: npm run validate:content
 */

import {
  GlossaryTermSchema,
  LessonSchema,
  StickerSchema,
  WorldSchema,
  type Lesson,
  type Question,
  type Rich,
  type Txt,
  type World,
} from '../src/content/schema';
import { WORLDS, LESSONS_BY_ID } from '../src/content/curriculum';

declare const process: { exit(code?: number): never };
import { GLOSSARY_TERMS } from '../src/content/glossary';
import { STICKERS } from '../src/content/stickers';

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

function extractRichText(rich: Rich[], mode: 'junior' | 'pro'): string {
  return rich
    .map((seg) => {
      if (seg.t === 'code') return seg.v;
      return mode === 'junior' ? seg.v.junior ?? seg.v.pro : seg.v.pro;
    })
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
    }

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

  if (warnings.length > 0) {
    console.warn(`Warnings (${warnings.length}):\n` + warnings.slice(0, 10).join('\n'));
  }

  if (errors.length > 0) {
    console.error(`Content validation failed with ${errors.length} error(s):\n` + errors.slice(0, 40).join('\n'));
    process.exit(1);
  }

  console.log(
    `Content validation passed: ${WORLDS.length} worlds, ${Object.keys(LESSONS_BY_ID).length} lessons/side-quests, ${STICKERS.length} stickers, ${GLOSSARY_TERMS.length} glossary terms (0 errors).`,
  );
}

main();
