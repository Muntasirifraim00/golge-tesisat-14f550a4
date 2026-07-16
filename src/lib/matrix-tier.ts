// Programmatic-SEO tiering for the district × service matrix (~500 pages).
//
// WHY: A young/low-authority domain cannot get 500 near-identical
// template pages indexed. Google parks most as "Crawled/Discovered –
// currently not indexed". The fix is to concentrate crawl budget on the
// pages most likely to earn rankings and to `noindex` the thinnest,
// lowest-demand combinations so they stop diluting the site's quality
// signal.
//
// Tiers:
//   1 — flagship: high-demand district × core service. Index + enrich
//       with genuinely unique local content (reviews, pricing, landmarks).
//   2 — supporting: still indexable, lower sitemap priority, enriched later.
//   3 — thin long-tail: `noindex, follow` + excluded from the sitemap so
//       crawl budget flows to Tier 1/2. Pages stay live for users and keep
//       passing link equity onward.
//
// Everything is centralized here so the split point is a single knob:
// widen/narrow the sets or move THRESHOLDs to make pruning more or less
// aggressive without touching route or sitemap code.

import type { District } from "@/data/districts";
import type { Service } from "@/data/services";

export type MatrixTier = 1 | 2 | 3;

// High-demand İstanbul districts (largest population / highest local search
// for "ilçe + tesisat" queries). Rank weight 3.
const TIER1_DISTRICTS = new Set<string>([
  "kadikoy",
  "uskudar",
  "besiktas",
  "sisli",
  "bakirkoy",
  "atasehir",
  "umraniye",
  "maltepe",
  "kartal",
  "pendik",
  "beylikduzu",
  "sariyer",
  "beyoglu",
  "fatih",
  "esenyurt",
  "kucukcekmece",
]);

// Outer / low-population / seasonal districts — thin local demand. Rank weight 1.
const SMALL_DISTRICTS = new Set<string>([
  "adalar",
  "sile",
  "catalca",
  "silivri",
  "buyukcekmece",
  "arnavutkoy",
]);

// Core, highest-volume services people actively search + call for. Rank weight 3.
const CORE_SERVICES = new Set<string>([
  "su-kacagi-tespiti",
  "tikaniklik-acma",
  "kombi-servisi",
  "petek-temizligi",
  "kanalizasyon-acma",
  "tuvalet-tikanikligi-acma",
]);

// Niche / low-volume services. Rank weight 1. Everything not listed here or in
// CORE is treated as secondary (rank weight 2).
const NICHE_SERVICES = new Set<string>([
  "dusakabin-vitrifiye-montaji",
  "hidrofor-kurulumu",
]);

function districtRank(slug: string): 1 | 2 | 3 {
  if (TIER1_DISTRICTS.has(slug)) return 3;
  if (SMALL_DISTRICTS.has(slug)) return 1;
  return 2;
}

function serviceRank(slug: string): 1 | 2 | 3 {
  if (CORE_SERVICES.has(slug)) return 3;
  if (NICHE_SERVICES.has(slug)) return 1;
  return 2;
}

/**
 * Tier of a single district × service combination.
 *   score = districtRank + serviceRank  (range 2..6)
 *   >= 5 → Tier 1   (index + enrich)
 *   == 4 → Tier 2   (index, lower priority)
 *   <= 3 → Tier 3   (noindex, excluded from sitemap)
 */
export function matrixTier(d: Pick<District, "slug">, s: Pick<Service, "slug">): MatrixTier {
  const score = districtRank(d.slug) + serviceRank(s.slug);
  if (score >= 5) return 1;
  if (score === 4) return 2;
  return 3;
}

/** Convenience: is this combo indexable (Tier 1 or 2)? */
export function isMatrixIndexable(d: Pick<District, "slug">, s: Pick<Service, "slug">): boolean {
  return matrixTier(d, s) !== 3;
}

/** Sitemap priority string per tier. */
export function matrixPriority(tier: MatrixTier): string {
  return tier === 1 ? "0.6" : "0.5";
}

// Neighborhood (mahalle) pages are ultra-long-tail and the thinnest of all —
// keep them out of the index and the sitemap for now, same rationale as Tier 3.
export const NEIGHBORHOOD_INDEXABLE = false;
