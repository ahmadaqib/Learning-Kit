/**
 * Read-aloud (spec 8.5, "Dengar"; 5.4 M49). Replaces the old getReadableText.
 *
 * A card, a question, a hint or a piece of feedback becomes a queue of sentences. Each sentence knows which
 * element on screen it belongs to (`el`) and its number inside that element (`part`), so the page can mark
 * the sentence being read. The queue is spoken one sentence at a time by chaining `speakText(sentence, onEnd)`
 * from speech.ts. A session token cancels the chain when the learner stops it, checks an answer or moves on,
 * so a cancelled sentence can never start the next one. Highlight is per sentence, because word-boundary
 * events are unreliable on Android voices.
 */
import { resolveTxt, type Mode, type Question, type Rich, type Step, type Txt } from '@/content/schema';
import { richToPlainText } from '@/content/rich';
import { speakText, stopSpeaking } from '@/engine/speech';

export interface ReadSentence {
  /** Plain text handed to the speech engine. */
  text: string;
  /**
   * The element this sentence belongs to: 'title', 'body', 'context', 'prompt', 'hint', 'explanation',
   * 'instructions', 'same:{i}', 'different:{i}', 'choice:{id}', 'item:{id}', 'bin:{id}', 'left:{id}',
   * 'right:{id}', 'region:{id}'.
   */
  el: string;
  /** The sentence's number inside its element, from 0. */
  part: number;
}

/** The sentence being read right now. QuestionRenderer and the cards use it to draw the highlight. */
export interface ReadingMark {
  el: string;
  part: number;
}

export type LimitStep = Extract<Step, { kind: 'limit' }>;

export type ReadTarget =
  | { kind: 'story'; title: string; body: Rich[] }
  | { kind: 'concept'; title: Txt; body: Rich[] }
  | { kind: 'limit'; step: LimitStep; revealed: boolean }
  | { kind: 'sim'; instructions: Txt }
  | { kind: 'question'; question: Question }
  | { kind: 'hint'; text: Txt | string }
  | { kind: 'feedback'; title: string; explanation: string }
  | { kind: 'text'; text: string; el?: string };

// ---------------------------------------------------------------------------------------------
// Sentences
// ---------------------------------------------------------------------------------------------

/** A sentence ends at . ! ? or an ellipsis (plus closing quotes or brackets) that is followed by white space. */
const BOUNDARY = /[.!?…]+["')\]]*(?=\s)/g;

export interface SentenceRange {
  start: number;
  end: number;
}

/**
 * Where each sentence of `raw` starts and ends (end is exclusive, white space is trimmed). A number such as
 * "1." does not end a sentence. The same ranges are used to speak the text and to mark it on screen, so a
 * sentence on screen is always the one being read.
 */
export function splitSentenceRanges(raw: string): SentenceRange[] {
  const ranges: SentenceRange[] = [];
  let start = 0;
  const push = (from: number, to: number) => {
    let a = from;
    let b = to;
    while (a < b && /\s/.test(raw[a])) a += 1;
    while (b > a && /\s/.test(raw[b - 1])) b -= 1;
    if (b > a) ranges.push({ start: a, end: b });
  };

  BOUNDARY.lastIndex = 0;
  let match: RegExpExecArray | null = BOUNDARY.exec(raw);
  while (match) {
    const end = match.index + match[0].length;
    const sentence = raw.slice(start, end).trim();
    if (!/^\d+[.]$/.test(sentence)) {
      push(start, end);
      start = end;
    }
    match = BOUNDARY.exec(raw);
  }
  push(start, raw.length);
  return ranges;
}

/** The sentences of a text, white space collapsed. */
export function splitSentences(raw: string): string[] {
  return splitSentenceRanges(raw).map((r) => raw.slice(r.start, r.end).replace(/\s+/g, ' '));
}

function sentencesFor(text: string, el: string): ReadSentence[] {
  return splitSentences(text).map((s, part) => ({ text: s, el, part }));
}

function single(text: string, el: string): ReadSentence[] {
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean ? [{ text: clean, el, part: 0 }] : [];
}

function txt(value: Txt | string, mode: Mode): string {
  return typeof value === 'string' ? value : resolveTxt(value, mode);
}

// ---------------------------------------------------------------------------------------------
// Building the queue
// ---------------------------------------------------------------------------------------------

function ordered<T extends { id: string }>(items: T[], shownOrder?: string[]): T[] {
  if (!shownOrder || shownOrder.length === 0) return items;
  const byId = new Map(items.map((i) => [i.id, i]));
  const first = shownOrder.map((id) => byId.get(id)).filter((i): i is T => Boolean(i));
  const rest = items.filter((i) => !shownOrder.includes(i.id));
  return [...first, ...rest];
}

function questionQueue(q: Question, mode: Mode, shownOrder?: string[]): ReadSentence[] {
  const out: ReadSentence[] = [];

  if (q.type === 'scenario') out.push(...sentencesFor(resolveTxt(q.story, mode), 'context'));
  if (q.type === 'why') out.push(...sentencesFor(q.base, 'context'));
  if (q.type === 'limit') out.push(...sentencesFor(`Batas analogi: ${resolveTxt(q.analogy, mode)}`, 'context'));

  out.push(...sentencesFor(resolveTxt(q.prompt, mode), 'prompt'));

  switch (q.type) {
    case 'mcq':
    case 'analogy':
    case 'why':
    case 'scenario':
    case 'limit':
      ordered(q.choices, shownOrder).forEach((c, i) => {
        out.push(...single(`Pilihan ${i + 1}: ${resolveTxt(c.label, mode)}`, `choice:${c.id}`));
      });
      break;
    case 'tf':
      out.push(...single('Pilihan 1: Benar', 'choice:true'));
      out.push(...single('Pilihan 2: Salah', 'choice:false'));
      break;
    case 'sort':
      ordered(q.items, shownOrder).forEach((it, i) => {
        out.push(...single(`Kartu ${i + 1}: ${resolveTxt(it.label, mode)}`, `item:${it.id}`));
      });
      q.bins.forEach((b) => {
        out.push(...single(`Keranjang: ${resolveTxt(b.label, mode)}`, `bin:${b.id}`));
      });
      break;
    case 'order':
      ordered(q.items, shownOrder).forEach((it, i) => {
        out.push(...single(`Kartu ${i + 1}: ${resolveTxt(it.label, mode)}`, `item:${it.id}`));
      });
      break;
    case 'match':
      ordered(q.left, shownOrder).forEach((l, i) => {
        out.push(...single(`Kiri ${i + 1}: ${resolveTxt(l.label, mode)}`, `left:${l.id}`));
      });
      q.right.forEach((r, i) => {
        out.push(...single(`Kanan ${i + 1}: ${resolveTxt(r.label, mode)}`, `right:${r.id}`));
      });
      break;
    case 'hotspot':
      q.regions.forEach((r, i) => {
        out.push(...single(`Bagian ${i + 1}: ${r.label}`, `region:${r.id}`));
      });
      break;
    // spotbug, fill and type are code bodies: only the prompt is read
    default:
      break;
  }
  return out;
}

/**
 * The sentences to speak for a target, in order. `shownOrder` is the order of choice, item or left-hand ids
 * on screen, so "Pilihan 1" is always the first card the learner sees.
 */
export function buildReadQueue(target: ReadTarget, mode: Mode, shownOrder?: string[]): ReadSentence[] {
  switch (target.kind) {
    case 'story':
      return [...single(target.title, 'title'), ...sentencesFor(richToPlainText(target.body, mode), 'body')];
    case 'concept':
      return [
        ...single(resolveTxt(target.title, mode), 'title'),
        ...sentencesFor(richToPlainText(target.body, mode), 'body'),
      ];
    case 'limit': {
      const { step } = target;
      const out: ReadSentence[] = [...single(resolveTxt(step.analogy, mode), 'title')];
      out.push(...single('Mirip', 'same-heading'));
      step.same.forEach((item, i) => out.push(...sentencesFor(resolveTxt(item, mode), `same:${i}`)));
      if (target.revealed) {
        out.push(...single('Bedanya', 'different-heading'));
        step.different.forEach((item, i) => out.push(...sentencesFor(resolveTxt(item, mode), `different:${i}`)));
      }
      return out;
    }
    case 'sim':
      return sentencesFor(resolveTxt(target.instructions, mode), 'instructions');
    case 'question':
      return questionQueue(target.question, mode, shownOrder);
    case 'hint':
      return sentencesFor(txt(target.text, mode), 'hint');
    case 'feedback':
      return [...single(target.title, 'title'), ...sentencesFor(target.explanation, 'explanation')];
    case 'text':
      return sentencesFor(target.text, target.el ?? 'body');
    default:
      return [];
  }
}

// ---------------------------------------------------------------------------------------------
// Playing the queue
// ---------------------------------------------------------------------------------------------

export type SentenceListener = (sentence: ReadSentence | null, index: number) => void;

let token = 0;
let activeListener: SentenceListener | null = null;

/** True while a queue is being spoken. */
export function isQueuePlaying(): boolean {
  return activeListener !== null;
}

/**
 * Speak the queue one sentence at a time. `onSentence` gets each sentence when it starts and `null` when
 * the queue ends or is stopped, so the page can clear its highlight. Starting a queue stops the previous one.
 */
export function playQueue(queue: ReadSentence[], onSentence?: SentenceListener): void {
  stopQueue();
  const mine = token;
  const listener = onSentence ?? (() => {});

  if (queue.length === 0) {
    listener(null, -1);
    return;
  }
  activeListener = listener;

  const finish = () => {
    if (mine !== token) return;
    activeListener = null;
    listener(null, -1);
  };

  const speak = (index: number) => {
    if (mine !== token) return;
    // A sentence the engine refuses (unsupported, empty) is skipped, not retried
    for (let i = index; i < queue.length; i += 1) {
      const sentence = queue[i];
      listener(sentence, i);
      const started = speakText(sentence.text, () => {
        if (mine !== token) return;
        speak(i + 1);
      });
      if (started) return;
      if (mine !== token) return;
    }
    finish();
  };

  speak(0);
}

/** Stop speaking now. The sentence that was being read cannot start the next one. */
export function stopQueue(): void {
  token += 1;
  const listener = activeListener;
  activeListener = null;
  stopSpeaking();
  listener?.(null, -1);
}

/** Tests only. */
export function getQueueToken(): number {
  return token;
}
