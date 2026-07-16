import { describe, it, expect } from "vitest";
import { lcTr, findInlineMatch, WORD_RE, type InlinePhrase } from "./inline-linker";
import { INLINE_LINK_INDEX } from "@/data/blog";

// Regression suite guarding the Turkish "İ"/"I" lowercasing bug that used to
// shift indexOf offsets and slice anchors one character off (e.g. "genleşme" →
// "enleşme"), producing broken anchor text while the href stayed correct.
//
// The invariants under test:
//   1. lcTr is LENGTH-PRESERVING (unlike String.toLowerCase for "İ").
//   2. findInlineMatch offsets slice the ORIGINAL text into the exact anchor.
//   3. The resolved slug (→ href) matches regardless of surrounding "İ"/"I".

describe("lcTr — length-preserving Turkish lowercase", () => {
  it("keeps the same length when text contains 'İ' (the bug trigger)", () => {
    const s = "İşlemi her zaman kombi soğukken yapın.";
    // The native lowercase EXPANDS "İ" to i + combining dot -> longer string.
    expect(s.toLowerCase().length).toBeGreaterThan(s.length);
    // lcTr must NOT expand — this is what keeps indexOf offsets aligned.
    expect(lcTr(s)).toHaveLength(s.length);
  });

  it("maps İ→i and I→ı (Turkish dotless) correctly", () => {
    expect(lcTr("İ")).toBe("i");
    expect(lcTr("I")).toBe("ı");
    expect(lcTr("İSTANBUL")).toBe("istanbul");
    expect(lcTr("ISI")).toBe("ısı");
  });

  it("is length-preserving for every uppercase Turkish letter", () => {
    const upper = "AÂBCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";
    expect(lcTr(upper)).toHaveLength(upper.length);
  });
});

describe("findInlineMatch — anchor slicing stays aligned after 'İ'", () => {
  const allow = () => false; // nothing disabled

  it("slices the FULL anchor even when an 'İ' precedes it", () => {
    const index: InlinePhrase[] = [{ phrase: "genleşme tankı", slug: "genlesme-tanki" }];
    const text =
      "İşlemi her zaman kombi soğukken yapın. Basınç düşüyorsa tesisatta kaçak veya genleşme tankı arızası olabilir.";
    const m = findInlineMatch(text, index, allow);
    expect(m).not.toBeNull();
    // The regression: this used to be "enleşme tankı" (leading 'g' dropped).
    expect(text.slice(m!.start, m!.start + m!.len)).toBe("genleşme tankı");
    expect(m!.slug).toBe("genlesme-tanki");
  });

  it("aligns correctly with multiple 'İ'/'I' characters before the anchor", () => {
    const index: InlinePhrase[] = [{ phrase: "petek temizliği", slug: "petek-temizligi" }];
    const text = "İSTANBUL'da ISITMA sorunları İçin İlk adım petek temizliği yaptırmaktır.";
    const m = findInlineMatch(text, index, allow);
    expect(m).not.toBeNull();
    expect(text.slice(m!.start, m!.start + m!.len)).toBe("petek temizliği");
    expect(m!.slug).toBe("petek-temizligi");
  });

  it("matches a phrase that itself contains 'İ'", () => {
    const index: InlinePhrase[] = [{ phrase: "istanbul su kaçağı", slug: "su-kacagi" }];
    // Source uses the capital dotted 'İ' — must still resolve to the phrase.
    const text = "Bir müşteri İstanbul su kaçağı tespiti için aradı.";
    const m = findInlineMatch(text, index, allow);
    expect(m).not.toBeNull();
    expect(text.slice(m!.start, m!.start + m!.len).toLowerCase()).toContain("stanbul su kaçağı");
    expect(m!.slug).toBe("su-kacagi");
  });

  it("respects word boundaries (no partial-word links) even with 'İ' present", () => {
    const index: InlinePhrase[] = [{ phrase: "kombi", slug: "kombi" }];
    // "kombiyi" should NOT match "kombi" — the trailing 'y' is a word char.
    const text = "İşlem bittiğinde kombiyi resetleyin.";
    expect(findInlineMatch(text, index, allow)).toBeNull();
  });

  it("skips disabled slugs (current post / already used)", () => {
    const index: InlinePhrase[] = [{ phrase: "genleşme tankı", slug: "genlesme-tanki" }];
    const text = "İşlem sonrası genleşme tankı kontrol edilir.";
    expect(findInlineMatch(text, index, (slug) => slug === "genlesme-tanki")).toBeNull();
  });

  it("prefers the earliest match, then the longest phrase on a tie", () => {
    const index: InlinePhrase[] = [
      { phrase: "kombi arıza", slug: "short" },
      { phrase: "kombi arıza kodları", slug: "long" },
    ];
    const text = "İlk olarak kombi arıza kodları tablosuna bakın.";
    const m = findInlineMatch(text, index, allow);
    expect(m!.slug).toBe("long");
    expect(text.slice(m!.start, m!.start + m!.len)).toBe("kombi arıza kodları");
  });
});

describe("WORD_RE — Turkish letters count as word characters", () => {
  it.each(["a", "z", "ç", "ğ", "ı", "ö", "ş", "ü", "â", "î", "û", "5"])(
    "treats %s as a word char",
    (ch) => expect(WORD_RE.test(ch)).toBe(true),
  );
  it.each([" ", ".", ",", ";", "-"])("treats %s as a boundary", (ch) =>
    expect(WORD_RE.test(ch)).toBe(false),
  );
});

describe("INLINE_LINK_INDEX — real data invariants", () => {
  it("stores every phrase already length-preserving-lowercased", () => {
    for (const { phrase } of INLINE_LINK_INDEX) {
      expect(phrase).toBe(lcTr(phrase));
    }
  });

  it("has no phrase that expands under native toLowerCase (would misalign)", () => {
    for (const { phrase } of INLINE_LINK_INDEX) {
      expect(phrase.toLowerCase()).toHaveLength(phrase.length);
    }
  });

  it("resolves a real keyword to the correct slug through 'İ'-heavy prose", () => {
    const target = INLINE_LINK_INDEX.find((e) => e.phrase === "genleşme tankı");
    expect(target, "expected a 'genleşme tankı' anchor in the index").toBeTruthy();
    const text = `İstanbul'da İlk kontrol: ${target!.phrase} basıncı düşürüyor mu?`;
    const m = findInlineMatch(text, INLINE_LINK_INDEX, () => false);
    expect(m).not.toBeNull();
    // The sliced anchor must round-trip exactly to one of the index phrases
    // registered for the resolved slug (a slug can own keyword + alias phrases).
    const anchor = lcTr(text.slice(m!.start, m!.start + m!.len));
    const phrasesForSlug = INLINE_LINK_INDEX.filter((e) => e.slug === m!.slug).map((e) => e.phrase);
    expect(phrasesForSlug).toContain(anchor);

  });
});
