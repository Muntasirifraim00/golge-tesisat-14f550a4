// Pure, framework-free core of the in-content auto-linker so it can be unit
// tested without rendering React or the router. `blog.$slug.tsx` builds the JSX
// on top of `findInlineMatch`; `blog.ts` builds `INLINE_LINK_INDEX` with the
// same `lcTr`. Keeping both sides on one length-preserving lowercase is what
// guarantees anchor slicing and href matching stay correct for Turkish text.

export type InlinePhrase = { phrase: string; slug: string };

// Turkish letters count as "word" characters so we never link a phrase that is
// glued to a longer word (e.g. "xgenleşme tankı").
export const WORD_RE = /[0-9a-zçğıöşüâîû]/i;

/**
 * Length-preserving Turkish lowercase.
 *
 * Plain `String.prototype.toLowerCase()` maps "İ" (U+0130, capital dotted I) to
 * "i" + combining dot above (U+0307) — TWO code units. That makes the lowercased
 * haystack longer than the original text, so every `indexOf` offset after an "İ"
 * is shifted and `text.slice(start, …)` lands one character early (dropping the
 * first letter of the anchor, e.g. "genleşme" → "enleşme"). Mapping İ→i and I→ı
 * up front, before `toLowerCase()`, keeps the result the exact same length as the
 * input so offsets stay aligned.
 */
export const lcTr = (s: string): string =>
  s.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase();

/**
 * Find the best inline-link match in `text`:
 *  - earliest position wins; on a tie the longest (most specific) phrase wins,
 *  - word-boundary aware on both sides (Turkish letters included),
 *  - skips any phrase whose target slug is disabled (current post / already used).
 *
 * Returns byte-aligned `{ start, len, slug }` into the ORIGINAL `text`, or null.
 */
export function findInlineMatch(
  text: string,
  index: InlinePhrase[],
  isDisabled: (slug: string) => boolean,
): { start: number; len: number; slug: string } | null {
  const lower = lcTr(text);
  let best: { start: number; len: number; slug: string } | null = null;
  for (const { phrase, slug } of index) {
    if (isDisabled(slug)) continue;
    const idx = lower.indexOf(phrase);
    if (idx === -1) continue;
    const before = idx === 0 ? "" : lower[idx - 1];
    const after = idx + phrase.length >= lower.length ? "" : lower[idx + phrase.length];
    if ((before && WORD_RE.test(before)) || (after && WORD_RE.test(after))) continue;
    if (!best || idx < best.start || (idx === best.start && phrase.length > best.len)) {
      best = { start: idx, len: phrase.length, slug };
    }
  }
  return best;
}
