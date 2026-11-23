import { beforeEach, describe, expect, it, vi } from 'vitest';

const spoken: Array<{ text: string; end: () => void }> = [];
const speakMock = vi.fn((text: string, onEnd?: () => void) => {
  spoken.push({ text, end: onEnd ?? (() => {}) });
  return true;
});
const stopMock = vi.fn();

vi.mock('@/engine/speech', () => ({
  speakText: (text: string, onEnd?: () => void) => speakMock(text, onEnd),
  stopSpeaking: () => stopMock(),
}));

import {
  buildReadQueue,
  isQueuePlaying,
  playQueue,
  splitSentenceRanges,
  splitSentences,
  stopQueue,
  type ReadSentence,
} from '../src/engine/readAloud';
import type { Question, Rich } from '../src/content/schema';

beforeEach(() => {
  spoken.length = 0;
  speakMock.mockClear();
  stopMock.mockClear();
  stopQueue();
  stopMock.mockClear();
});

const t = (pro: string, junior?: string) => ({ pro, junior });

describe('splitSentences', () => {
  it('splits at . ! ? and an ellipsis, and collapses white space', () => {
    expect(splitSentences('Satu.  Dua! Tiga? Empat… Lima')).toEqual(['Satu.', 'Dua!', 'Tiga?', 'Empat…', 'Lima']);
  });

  it('does not split on a decimal point or on a bare list number', () => {
    expect(splitSentences('Versi 3.5 sudah rilis. 1. Ketuk kartunya.')).toEqual([
      'Versi 3.5 sudah rilis.',
      '1. Ketuk kartunya.',
    ]);
  });

  it('gives ranges that cut the same sentences as splitSentences', () => {
    const raw = '  Halo dunia.   Apa kabar?  Baik ';
    const ranges = splitSentenceRanges(raw);
    expect(ranges.map((r) => raw.slice(r.start, r.end))).toEqual(['Halo dunia.', 'Apa kabar?', 'Baik']);
    expect(splitSentences(raw)).toEqual(['Halo dunia.', 'Apa kabar?', 'Baik']);
  });

  it('returns nothing for an empty text', () => {
    expect(splitSentences('   ')).toEqual([]);
  });
});

describe('buildReadQueue', () => {
  const body: Rich[] = [
    { t: 'text', v: t('Server menyimpan halaman. ') },
    { t: 'bold', v: t('Browser') },
    { t: 'text', v: t(' memintanya. Lalu halaman tampil.') },
  ];

  it('reads the title, then the visible body of a story card', () => {
    const queue = buildReadQueue({ kind: 'story', title: 'Toko Online', body }, 'junior');
    expect(queue.map((s) => [s.el, s.part, s.text])).toEqual([
      ['title', 0, 'Toko Online'],
      ['body', 0, 'Server menyimpan halaman.'],
      ['body', 1, 'Browser memintanya.'],
      ['body', 2, 'Lalu halaman tampil.'],
    ]);
  });

  it('leaves out text that is hidden in the mode (richToPlainText)', () => {
    const rich: Rich[] = [
      { t: 'text', v: t('Untuk semua. ') },
      { t: 'text', v: t('Hanya Pro. '), modes: ['pro'] },
      { t: 'text', v: t('Hanya Petualang.'), modes: ['junior'] },
    ];
    const junior = buildReadQueue({ kind: 'concept', title: t('Judul'), body: rich }, 'junior');
    const pro = buildReadQueue({ kind: 'concept', title: t('Judul'), body: rich }, 'pro');
    expect(junior.map((s) => s.text)).toEqual(['Judul', 'Untuk semua.', 'Hanya Petualang.']);
    expect(pro.map((s) => s.text)).toEqual(['Judul', 'Untuk semua.', 'Hanya Pro.']);
  });

  const mcq: Question = {
    id: 'q1',
    type: 'mcq',
    prompt: t('Apa tugas server?'),
    choices: [
      { id: 'a', label: t('Menyimpan halaman') },
      { id: 'b', label: t('Menggambar layar') },
      { id: 'c', label: t('Mengetik surat') },
    ],
    answer: 'a',
    difficulty: 1,
    explainCorrect: t('Server menyimpan.'),
    tags: ['server'],
  };

  it('reads the prompt, then each choice in the order shown on screen', () => {
    const queue = buildReadQueue({ kind: 'question', question: mcq }, 'junior', ['c', 'a', 'b']);
    expect(queue.map((s) => s.text)).toEqual([
      'Apa tugas server?',
      'Pilihan 1: Mengetik surat',
      'Pilihan 2: Menyimpan halaman',
      'Pilihan 3: Menggambar layar',
    ]);
    expect(queue.map((s) => s.el)).toEqual(['prompt', 'choice:c', 'choice:a', 'choice:b']);
  });

  it('reads the scenario story before the prompt and the why statement before the prompt', () => {
    const scenario: Question = {
      id: 'q2',
      type: 'scenario',
      story: t('Rina membuka toko. Pesanannya tidak masuk.'),
      prompt: t('Apa yang harus dicek?'),
      choices: [
        { id: 'a', label: t('Koneksi') },
        { id: 'b', label: t('Warna') },
      ],
      answer: 'a',
      difficulty: 1,
      explainCorrect: t('Koneksi.'),
      tags: ['x'],
    };
    const why: Question = {
      id: 'q3',
      type: 'why',
      base: 'Kata sandi harus panjang.',
      prompt: t('Mengapa?'),
      choices: [
        { id: 'a', label: t('Sulit ditebak') },
        { id: 'b', label: t('Indah') },
      ],
      answer: 'a',
      difficulty: 1,
      explainCorrect: t('Sulit ditebak.'),
      tags: ['x'],
    };
    const s = buildReadQueue({ kind: 'question', question: scenario }, 'junior').map((x) => x.el);
    expect(s.slice(0, 3)).toEqual(['context', 'context', 'prompt']);
    const w = buildReadQueue({ kind: 'question', question: why }, 'junior').map((x) => x.text);
    expect(w[0]).toBe('Kata sandi harus panjang.');
    expect(w[1]).toBe('Mengapa?');
  });

  it('reads sort items and bins, and does not read code bodies', () => {
    const sort: Question = {
      id: 'q4',
      type: 'sort',
      prompt: t('Kelompokkan.'),
      items: [
        { id: 'i1', label: t('Gambar') },
        { id: 'i2', label: t('Teks') },
      ],
      bins: [
        { id: 'b1', label: t('Media') },
        { id: 'b2', label: t('Tulisan') },
      ],
      answer: { i1: 'b1', i2: 'b2' },
      difficulty: 1,
      explainCorrect: t('Ok.'),
      tags: ['x'],
    };
    expect(buildReadQueue({ kind: 'question', question: sort }, 'junior').map((s) => s.text)).toEqual([
      'Kelompokkan.',
      'Kartu 1: Gambar',
      'Kartu 2: Teks',
      'Keranjang: Media',
      'Keranjang: Tulisan',
    ]);

    const fill: Question = {
      id: 'q5',
      type: 'fill',
      prompt: t('Lengkapi kodenya.'),
      template: '<___>Halo</___>',
      bank: ['h1', 'p'],
      answer: ['h1', 'h1'],
      difficulty: 1,
      explainCorrect: t('Ok.'),
      tags: ['x'],
    };
    expect(buildReadQueue({ kind: 'question', question: fill }, 'pro').map((s) => s.text)).toEqual([
      'Lengkapi kodenya.',
    ]);
  });

  it('reads the Mirip point first and Bedanya only once it is revealed', () => {
    const step = {
      kind: 'limit' as const,
      analogy: t('Server seperti dapur'),
      same: [t('Keduanya menyiapkan pesanan.')],
      different: [t('Server tidak bisa dimasuki pelanggan.')],
    };
    const closed = buildReadQueue({ kind: 'limit', step, revealed: false }, 'junior').map((s) => s.text);
    expect(closed).toEqual(['Server seperti dapur', 'Mirip', 'Keduanya menyiapkan pesanan.']);
    const open = buildReadQueue({ kind: 'limit', step, revealed: true }, 'junior').map((s) => s.text);
    expect(open.slice(-2)).toEqual(['Bedanya', 'Server tidak bisa dimasuki pelanggan.']);
  });

  it('reads a hint and a feedback title with its explanation', () => {
    expect(buildReadQueue({ kind: 'hint', text: t('Ingat dapurnya.') }, 'pro').map((s) => s.text)).toEqual([
      'Ingat dapurnya.',
    ]);
    expect(
      buildReadQueue({ kind: 'feedback', title: 'Belum pas', explanation: 'Server menyimpan. Jadi jawabannya A.' }, 'junior').map(
        (s) => [s.el, s.text],
      ),
    ).toEqual([
      ['title', 'Belum pas'],
      ['explanation', 'Server menyimpan.'],
      ['explanation', 'Jadi jawabannya A.'],
    ]);
  });
});

describe('playQueue', () => {
  const queue: ReadSentence[] = [
    { text: 'Satu.', el: 'body', part: 0 },
    { text: 'Dua.', el: 'body', part: 1 },
    { text: 'Tiga.', el: 'body', part: 2 },
  ];

  it('chains the sentences and reports each one, then null at the end', () => {
    const seen: Array<string | null> = [];
    playQueue(queue, (s) => seen.push(s ? s.text : null));
    expect(spoken.map((s) => s.text)).toEqual(['Satu.']);
    expect(isQueuePlaying()).toBe(true);

    spoken[0].end();
    expect(spoken.map((s) => s.text)).toEqual(['Satu.', 'Dua.']);
    spoken[1].end();
    spoken[2].end();
    expect(seen).toEqual(['Satu.', 'Dua.', 'Tiga.', null]);
    expect(isQueuePlaying()).toBe(false);
  });

  it('a cancelled sentence cannot start the next one', () => {
    const seen: Array<string | null> = [];
    playQueue(queue, (s) => seen.push(s ? s.text : null));
    const first = spoken[0];
    stopQueue();
    expect(stopMock).toHaveBeenCalled();
    // the engine fires onend for the cancelled utterance
    first.end();
    expect(spoken).toHaveLength(1);
    expect(seen).toEqual(['Satu.', null]);
  });

  it('starting a new queue cancels the old chain (session token)', () => {
    const a: Array<string | null> = [];
    const b: Array<string | null> = [];
    playQueue(queue, (s) => a.push(s ? s.text : null));
    const oldEnd = spoken[0].end;
    playQueue([{ text: 'Baru.', el: 'hint', part: 0 }], (s) => b.push(s ? s.text : null));
    oldEnd();
    expect(spoken.map((s) => s.text)).toEqual(['Satu.', 'Baru.']);
    expect(a).toEqual(['Satu.', null]);
    expect(b).toEqual(['Baru.']);
  });

  it('skips a sentence the engine refuses to speak', () => {
    speakMock.mockImplementationOnce(() => false);
    const seen: Array<string | null> = [];
    playQueue(queue, (s) => seen.push(s ? s.text : null));
    expect(seen.slice(0, 2)).toEqual(['Satu.', 'Dua.']);
    expect(spoken.map((s) => s.text)).toEqual(['Dua.']);
  });

  it('an empty queue reports null at once', () => {
    const seen: Array<string | null> = [];
    playQueue([], (s) => seen.push(s ? s.text : null));
    expect(seen).toEqual([null]);
    expect(isQueuePlaying()).toBe(false);
  });
});
