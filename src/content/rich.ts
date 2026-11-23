/**
 * Helpers that decide which parts of a Rich body a learner sees in a given mode, and how to turn them
 * into plain text (read-aloud, aria labels).
 */
import { resolveTxt, type Mode, type Rich } from './schema';

const SENTENCE_END = /[.!?…]$/;
const HAS_LETTER_OR_DIGIT = /[\p{L}\p{N}]/u;

function segmentText(seg: Rich, mode: Mode): string {
  return seg.t === 'code' ? seg.v : resolveTxt(seg.v, mode);
}

/**
 * The segments a learner of `mode` should see.
 *
 * 1. A segment whose `modes` excludes the mode is hidden. A text segment whose resolved string is empty is hidden.
 * 2. Junior guard: an inline code segment with no explicit `modes` is dropped when the visible text before it
 *    ends a sentence (. ! ? or ...) and the next visible segment is missing, is another code segment, or is a text
 *    segment without a letter or digit. Letterless text segments that follow a dropped code segment go too.
 *    This keeps a Pro-flavoured code token from dangling at the end of a Junior sentence.
 *    A code segment whose `modes` includes 'junior' is never dropped. The guard does not apply in Pro.
 */
export function visibleSegments(segments: Rich[], mode: Mode): Rich[] {
  const visible = segments.filter((seg) => {
    if (seg.modes && !seg.modes.includes(mode)) return false;
    if (seg.t === 'text' && resolveTxt(seg.v, mode) === '') return false;
    return true;
  });
  if (mode !== 'junior') return visible;

  const out: Rich[] = [];
  let skipLetterless = false;
  for (let i = 0; i < visible.length; i += 1) {
    const seg = visible[i];

    if (skipLetterless && seg.t === 'text' && !HAS_LETTER_OR_DIGIT.test(resolveTxt(seg.v, mode))) {
      continue;
    }
    skipLetterless = false;

    if (seg.t === 'code' && !seg.modes) {
      const before = out.map((s) => segmentText(s, mode)).join('').trimEnd();
      const next = visible[i + 1];
      const nextDangles =
        !next ||
        next.t === 'code' ||
        (next.t === 'text' && !HAS_LETTER_OR_DIGIT.test(resolveTxt(next.v, mode)));
      if (SENTENCE_END.test(before) && nextDangles) {
        skipLetterless = true;
        continue;
      }
    }
    out.push(seg);
  }
  return out;
}

/** The visible segments as one plain string, whitespace collapsed. Code is included as written. */
export function richToPlainText(segments: Rich[], mode: Mode): string {
  return visibleSegments(segments, mode)
    .map((seg) => segmentText(seg, mode))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}
