import { z } from 'zod';
import { CONTENT_ICONS } from './icons';

export type Mode = 'junior' | 'pro';

export const TxtSchema = z.object({
  junior: z.string().optional(),
  pro: z.string().min(1),
});
export type Txt = z.infer<typeof TxtSchema>;

const RichModesSchema = z.array(z.enum(['junior', 'pro'])).optional();

export const RichSchema = z.discriminatedUnion('t', [
  z.object({ t: z.literal('text'), v: TxtSchema, modes: RichModesSchema }),
  z.object({ t: z.literal('bold'), v: TxtSchema, modes: RichModesSchema }),
  z.object({ t: z.literal('term'), termId: z.string().min(1), v: TxtSchema, modes: RichModesSchema }),
  z.object({ t: z.literal('code'), v: z.string().min(1), modes: RichModesSchema }),
]);
export type Rich = z.infer<typeof RichSchema>;

export const ChoiceSchema = z.object({
  id: z.string().min(1),
  label: TxtSchema,
  icon: z.enum(CONTENT_ICONS).optional(),
});
export type Choice = z.infer<typeof ChoiceSchema>;

export const ItemSchema = z.object({
  id: z.string().min(1),
  label: TxtSchema,
  icon: z.enum(CONTENT_ICONS).optional(),
});
export type Item = z.infer<typeof ItemSchema>;

export const BinSchema = z.object({
  id: z.string().min(1),
  label: TxtSchema,
  color: z.string().optional(),
  icon: z.enum(CONTENT_ICONS).optional(),
});
export type Bin = z.infer<typeof BinSchema>;

export const RegionSchema = z.object({
  id: z.string().min(1),
  shape: z.enum(['rect', 'circle']),
  coords: z.array(z.number()),
  label: z.string().min(1),
});
export type Region = z.infer<typeof RegionSchema>;

export const CodeSnippetSchema = z.object({
  lang: z.enum(['html', 'css', 'js', 'json', 'http', 'text']),
  code: z.string().min(1),
  highlight: z.array(z.number()).optional(),
});
export type CodeSnippet = z.infer<typeof CodeSnippetSchema>;

export const VisualSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('svg'), src: z.string().min(1), alt: TxtSchema }),
  z.object({
    type: z.literal('component'),
    name: z.string().min(1),
    props: z.record(z.unknown()).optional(),
    alt: TxtSchema,
  }),
]);
export type Visual = z.infer<typeof VisualSchema>;

const QuestionBaseSchema = z.object({
  id: z.string().min(1),
  prompt: TxtSchema,
  modes: z.array(z.enum(['junior', 'pro'])).optional(),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  explainCorrect: TxtSchema,
  explainIncorrect: z.record(TxtSchema).optional(),
  hints: z.tuple([TxtSchema, TxtSchema.optional()]).optional(),
  tags: z.array(z.string().min(1)).min(1),
});

export const QuestionSchema = z.discriminatedUnion('type', [
  QuestionBaseSchema.extend({
    type: z.literal('mcq'),
    choices: z.array(ChoiceSchema).min(2),
    answer: z.string().min(1),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('tf'),
    answer: z.boolean(),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('analogy'),
    choices: z.array(ChoiceSchema).min(2),
    answer: z.string().min(1),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('sort'),
    items: z.array(ItemSchema).min(2),
    bins: z.array(BinSchema).min(2),
    answer: z.record(z.string()),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('order'),
    items: z.array(ItemSchema).min(2),
    answer: z.array(z.string()).min(2),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('match'),
    left: z.array(ItemSchema).min(2),
    right: z.array(ItemSchema).min(2),
    answer: z.record(z.string()),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('hotspot'),
    image: z.string().min(1),
    regions: z.array(RegionSchema).min(2),
    answer: z.string().min(1),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('spotbug'),
    lines: z.array(z.string()).min(2),
    answer: z.array(z.number()).min(1),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('fill'),
    template: z.string().min(1),
    bank: z.array(z.string()).min(2),
    answer: z.array(z.string()).min(1),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('type'),
    accept: z.array(z.string()).min(1),
    caseSensitive: z.boolean().optional(),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('why'),
    base: z.string().min(1),
    choices: z.array(ChoiceSchema).min(2),
    answer: z.string().min(1),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('scenario'),
    story: TxtSchema,
    choices: z.array(ChoiceSchema).min(2),
    answer: z.string().min(1),
  }),
  QuestionBaseSchema.extend({
    type: z.literal('limit'),
    analogy: TxtSchema,
    choices: z.array(ChoiceSchema).min(2),
    answer: z.string().min(1),
  }),
]);
export type Question = z.infer<typeof QuestionSchema>;

export const StepSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('story'),
    illustration: z.string().min(1),
    body: z.array(RichSchema).min(1),
  }),
  z.object({
    kind: z.literal('concept'),
    title: TxtSchema,
    visual: VisualSchema,
    body: z.array(RichSchema).min(1),
    code: CodeSnippetSchema.optional(),
    modes: z.array(z.enum(['junior', 'pro'])).optional(),
  }),
  z.object({
    kind: z.literal('limit'),
    analogy: TxtSchema,
    same: z.array(TxtSchema).min(1),
    different: z.array(TxtSchema).min(1),
    illustration: z.string().optional(),
    riskyAnalogy: z.boolean().optional(),
  }),
  z.object({
    kind: z.literal('sim'),
    simId: z.string().min(1),
    props: z.record(z.unknown()).optional(),
    instructions: TxtSchema,
  }),
  z.object({
    kind: z.literal('question'),
    q: QuestionSchema,
  }),
]);
export type Step = z.infer<typeof StepSchema>;

export const LessonSchema = z.object({
  id: z.string().min(1),
  worldId: z.string().min(1),
  title: z.string().min(1),
  modes: z.array(z.enum(['junior', 'pro'])).min(1),
  isSideQuest: z.boolean().optional(),
  external: z.boolean().optional(),
  externalLinks: z
    .array(
      z.object({
        label: z.string().min(1),
        url: z.string().url(),
      }),
    )
    .optional(),
  objective: TxtSchema,
  estMinutes: z.number().min(1).max(15),
  introducesTerms: z.array(z.string()),
  usesTerms: z.array(z.string()),
  stickerId: z.string().optional(),
  warmupFrom: z.string().optional(),
  steps: z.array(StepSchema).min(4),
  reviewCards: z.array(QuestionSchema).min(2),
  recap: TxtSchema,
  atWork: z.string().min(1).optional(),
  companion: z
    .object({
      talkPrompts: z.array(z.string()).min(1),
      offlineActivity: z.string().min(1),
    })
    .optional(),
});
export type Lesson = z.infer<typeof LessonSchema>;

export const BossConfigSchema = z.object({
  title: z.string().min(1),
  greeting: TxtSchema,
  guardianName: z.string().min(1),
  junior: z.object({ count: z.literal(8), pool: z.literal('world') }),
  pro: z.object({ count: z.literal(12), pool: z.literal('world') }),
  passRatio: z.number().min(0.5).max(1),
});
export type BossConfig = z.infer<typeof BossConfigSchema>;

export const WorldSchema = z.object({
  id: z.string().min(1),
  track: z.enum(['A', 'B']),
  order: z.number().int().positive(),
  title: z.string().min(1),
  tagline: TxtSchema,
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  illustration: z.string().min(1),
  sourceChapters: z.array(z.string()).min(1),
  requires: z.array(z.string()),
  lessons: z.array(z.string()).min(1),
  sideQuests: z.array(z.string()),
  boss: BossConfigSchema,
  anchors: z.object({
    junior: z.array(QuestionSchema).length(5),
    pro: z.array(QuestionSchema).length(6),
  }),
});
export type World = z.infer<typeof WorldSchema>;

export const GlossaryTermSchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1),
  pronunciation: z.string().optional(),
  shortDef: TxtSchema,
  stickerId: z.string().optional(),
  introducedIn: z.string().min(1),
});
export type GlossaryTerm = z.infer<typeof GlossaryTermSchema>;

export const StickerSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  concept: z.string().min(1),
  track: z.enum(['A', 'B']),
  worldId: z.string().min(1),
  lessonId: z.string().min(1),
  illustration: z.string().min(1),
  summary: TxtSchema,
  quizQuestion: QuestionSchema,
});
export type Sticker = z.infer<typeof StickerSchema>;

export const BadgeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
});
export type Badge = z.infer<typeof BadgeSchema>;

export const SettingsSchema = z.object({
  soundEnabled: z.boolean(),
  autoReadAloud: z.boolean(),
  textScale: z.union([z.literal(100), z.literal(115), z.literal(130)]),
  reducedMotion: z.enum(['system', 'always']),
  theme: z.enum(['light', 'dark', 'system']),
  weeklyTarget: z.union([z.literal(2), z.literal(3), z.literal(5)]),
  breakReminderMinutes: z.union([z.literal(0), z.literal(15), z.literal(20), z.literal(30)]),
});
export type Settings = z.infer<typeof SettingsSchema>;

export const AssessmentRecordSchema = z.object({
  score: z.number().int().min(0),
  max: z.number().int().positive(),
  at: z.string(),
  answers: z.record(z.string()),
});
export type AssessmentRecord = z.infer<typeof AssessmentRecordSchema>;

export const MascotCustomSchema = z.object({
  color: z.string(),
  accessory: z.enum(['none', 'cap', 'glasses', 'scarf']),
});
export type MascotCustom = z.infer<typeof MascotCustomSchema>;

export const ProfileSchema = z.object({
  id: z.string().min(1),
  nickname: z.string().max(12),
  avatar: z.string().min(1),
  mode: z.enum(['junior', 'pro']),
  createdAt: z.string(),
  settings: SettingsSchema,
  xp: z.number().int().min(0),
  lessons: z.record(
    z.object({
      stars: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
      completedAt: z.string().optional(),
      stepIndex: z.number().int().min(0).optional(),
      attempts: z.number().int().min(0),
    }),
  ),
  bosses: z.record(
    z.object({
      passed: z.boolean(),
      best: z.number().min(0),
      attempts: z.number().int().min(0),
    }),
  ),
  assessments: z.record(
    z.object({
      pre: AssessmentRecordSchema.optional(),
      post: AssessmentRecordSchema.optional(),
      retain: AssessmentRecordSchema.optional(),
      retainDue: z.string().optional(),
    }),
  ),
  leitner: z.record(
    z.object({
      box: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
      due: z.string(),
      lastResult: z.boolean().optional(),
      masteredCount: z.number().int().min(0).optional(),
    }),
  ),
  stickers: z.array(z.string()),
  badges: z.array(z.string()),
  weeks: z.record(z.array(z.string())),
  mistakes: z.record(z.number().int().min(0)),
  limitMistakes: z.record(z.number().int().min(0)).default({}),
  seenQuestionGuides: z.array(z.string()).default([]),
  mascot: MascotCustomSchema.default({ color: '#E4572E', accessory: 'none' }),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const PersistedStateSchema = z.object({
  schemaVersion: z.literal(1),
  activeProfileId: z.string(),
  profiles: z.record(ProfileSchema),
});
export type PersistedState = z.infer<typeof PersistedStateSchema>;

export function resolveTxt(txt: Txt, mode: Mode): string {
  if (mode === 'junior') {
    return txt.junior ?? txt.pro;
  }
  return txt.pro;
}
