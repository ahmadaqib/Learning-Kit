import { describe, expect, it } from 'vitest';
import { richToPlainText, visibleSegments } from '../src/content/rich';
import { rBold, rCode, rJunior, rPro, rTerm, rText } from '../src/content/lessonHelpers';
import { CONTENT_ICONS } from '../src/content/icons';
import {
  BinSchema,
  ChoiceSchema,
  ItemSchema,
  LessonSchema,
  RichSchema,
  type Rich,
} from '../src/content/schema';

const types = (segments: Rich[]) => segments.map((s) => s.t);

describe('visibleSegments: modes', () => {
  it('shows segments without modes in both modes', () => {
    const segments = [rText('Halo', 'Hello'), rBold('dunia', 'world')];
    expect(visibleSegments(segments, 'junior')).toHaveLength(2);
    expect(visibleSegments(segments, 'pro')).toHaveLength(2);
  });

  it('hides a segment whose modes exclude the mode', () => {
    const segments = [rText('Kita mulai. '), rJunior('Ayo, Petualang! '), rPro('Mulai. ')];
    expect(richToPlainText(segments, 'junior')).toBe('Kita mulai. Ayo, Petualang!');
    expect(richToPlainText(segments, 'pro')).toBe('Kita mulai. Mulai.');
  });

  it('hides a text segment whose resolved string is empty', () => {
    const segments: Rich[] = [rText('', 'Hanya Pro. '), rText('Untuk semua.')];
    expect(visibleSegments(segments, 'junior').map((s) => (s.t === 'text' ? s.v.pro : ''))).toEqual([
      'Untuk semua.',
    ]);
    expect(visibleSegments(segments, 'pro')).toHaveLength(2);
  });

  it('keeps an empty bold or code segment decision to the schema, not to this function', () => {
    expect(visibleSegments([rBold('', 'Pro')], 'junior')).toHaveLength(1);
  });
});

describe('visibleSegments: Junior guard', () => {
  it('drops a code segment that dangles after a finished sentence', () => {
    const segments = [rText('Itu alamat server. '), rCode('GET /api')];
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text']);
  });

  it('drops it when the next text has no letter or digit, and drops that text too', () => {
    const segments = [rText('Selesai! '), rCode('npm run dev'), rText(' .'), rText(' ')];
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text']);
  });

  it('drops it when the next visible segment is another code segment', () => {
    const segments = [rText('Coba ini? '), rCode('a'), rCode('b')];
    // the first code dangles and goes, then the second has no next segment and goes too
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text']);
  });

  it('treats an ellipsis as the end of a sentence', () => {
    expect(types(visibleSegments([rText('Tunggu...'), rCode('x')], 'junior'))).toEqual(['text']);
    expect(types(visibleSegments([rText('Tunggu…'), rCode('x')], 'junior'))).toEqual(['text']);
  });

  it('keeps code that sits inside a sentence', () => {
    const segments = [rText('Ketik '), rCode('npm install'), rText(' lalu tekan Enter.')];
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text', 'code', 'text']);
  });

  it('keeps code when the text before does not end a sentence', () => {
    const segments = [rText('Perintahnya: '), rCode('ls')];
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text', 'code']);
  });

  it('keeps code that is the first visible segment', () => {
    expect(types(visibleSegments([rCode('x'), rText(' ')], 'junior'))).toEqual(['code', 'text']);
  });

  it('keeps code followed by a text that has letters', () => {
    const segments = [rText('Selesai. '), rCode('npm run build'), rText(' membuat folder dist.')];
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text', 'code', 'text']);
  });

  it('never drops a code segment whose modes includes junior', () => {
    const segments = [rText('Itu alamat server. '), rCode('GET /api', ['junior']), rCode('x', ['junior', 'pro'])];
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text', 'code', 'code']);
  });

  it('does not count a code that was hidden by modes as visible text before it', () => {
    const segments = [rText('Lihat '), rCode('hidden', ['pro']), rText('. '), rCode('x')];
    // visible: "Lihat" + ". " then code x with no next segment: the sentence ended, so x is dropped
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['text', 'text']);
  });

  it('measures the text before a code segment after earlier segments were dropped', () => {
    const segments = [rText('Selesai. '), rCode('a'), rCode('b')];
    expect(visibleSegments(segments, 'junior')).toHaveLength(1);
  });

  it('only runs for Junior: Pro keeps the same code', () => {
    const segments = [rText('Itu alamat server. '), rCode('GET /api')];
    expect(types(visibleSegments(segments, 'pro'))).toEqual(['text', 'code']);
  });

  it('terms and bold count as visible text before the code', () => {
    const segments = [rBold('Hebat.'), rCode('x')];
    expect(types(visibleSegments(segments, 'junior'))).toEqual(['bold']);
    expect(types(visibleSegments([rTerm('api', 'API'), rCode('x')], 'junior'))).toEqual(['term', 'code']);
  });
});

describe('richToPlainText', () => {
  it('joins text, bold, term and code and collapses whitespace', () => {
    const segments = [rText('Kirim  '), rBold('pesan'), rText(' ke '), rTerm('api', 'API'), rText(': '), rCode('GET /')];
    expect(richToPlainText(segments, 'pro')).toBe('Kirim pesan ke API: GET /');
  });

  it('uses the mode text', () => {
    expect(richToPlainText([rText('kurir', 'courier')], 'junior')).toBe('kurir');
    expect(richToPlainText([rText('kurir', 'courier')], 'pro')).toBe('courier');
  });

  it('applies the Junior guard before joining', () => {
    expect(richToPlainText([rText('Selesai. '), rCode('npm run dev')], 'junior')).toBe('Selesai.');
    expect(richToPlainText([rText('Selesai. '), rCode('npm run dev')], 'pro')).toBe('Selesai. npm run dev');
  });
});

describe('lesson helpers and schema (Package 0 additions)', () => {
  it('rCode without modes is unchanged', () => {
    expect(rCode('x')).toEqual({ t: 'code', v: 'x' });
    expect('modes' in rCode('x')).toBe(false);
    expect(rCode('x', ['pro'])).toEqual({ t: 'code', v: 'x', modes: ['pro'] });
  });

  it('rJunior and rPro produce valid mode-limited text', () => {
    expect(rJunior('Halo')).toMatchObject({ t: 'text', modes: ['junior'] });
    expect(rPro('Hello')).toMatchObject({ t: 'text', modes: ['pro'] });
    expect(RichSchema.safeParse(rJunior('Halo')).success).toBe(true);
    expect(RichSchema.safeParse(rPro('Hello')).success).toBe(true);
  });

  it('every Rich variant accepts modes and rejects a bad one', () => {
    const modes = ['pro'];
    expect(RichSchema.safeParse({ t: 'text', v: { pro: 'a' }, modes }).success).toBe(true);
    expect(RichSchema.safeParse({ t: 'bold', v: { pro: 'a' }, modes }).success).toBe(true);
    expect(RichSchema.safeParse({ t: 'term', termId: 'x', v: { pro: 'a' }, modes }).success).toBe(true);
    expect(RichSchema.safeParse({ t: 'code', v: 'a', modes }).success).toBe(true);
    expect(RichSchema.safeParse({ t: 'code', v: 'a', modes: ['kid'] }).success).toBe(false);
  });

  it('icon is an optional enum on choices, items and bins', () => {
    const label = { pro: 'A' };
    for (const schema of [ChoiceSchema, ItemSchema, BinSchema]) {
      expect(schema.safeParse({ id: 'a', label }).success).toBe(true);
      expect(schema.safeParse({ id: 'a', label, icon: 'truck' }).success).toBe(true);
      expect(schema.safeParse({ id: 'a', label, icon: 'not-an-icon' }).success).toBe(false);
    }
  });

  it('has 40 distinct icon names', () => {
    expect(CONTENT_ICONS).toHaveLength(40);
    expect(new Set(CONTENT_ICONS).size).toBe(40);
  });

  it('atWork is an optional non-empty string on lessons', () => {
    const shape = LessonSchema.shape.atWork;
    expect(shape.safeParse(undefined).success).toBe(true);
    expect(shape.safeParse('Di tab Network.').success).toBe(true);
    expect(shape.safeParse('').success).toBe(false);
  });
});
