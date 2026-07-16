#!/usr/bin/env node
/**
 * Internal-link audit (report-only, non-blocking).
 *
 * Validates and measures the internal link graph that drives SEO:
 *  - every blog post points at a real service hub (no broken silo links)
 *  - every service hub has at least one supporting blog guide (no thin hubs)
 *  - inbound internal links (inlinks) per post: silo siblings + hub + prose
 *  - orphan detection (posts with ~0 inbound internal links)
 *  - click depth from the home page (BFS over the hub/cluster graph)
 *
 * Writes a human-readable report to .lovable/internal-linking-report.md.
 *
 * Run: node scripts/internal-link-audit.mjs
 * Exits 0 always (advisory). Use --strict to exit 1 on errors (CI gate).
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const strict = process.argv.includes("--strict");
const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const deaccent = (s) =>
  s
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/û/g, "u");

const blogSrc = read("src/data/blog.ts");
const serviceSrc = read("src/data/services.ts");
const districtSrc = read("src/data/districts.ts");

const slugsFrom = (src) => [...src.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

const serviceSlugs = new Set(slugsFrom(serviceSrc));
const districtCount = slugsFrom(districtSrc).length;

// --- Parse blog posts (top-level, 4-space-indented fields, in source order) ---
const postSlugs = [...blogSrc.matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
const postKeywords = [...blogSrc.matchAll(/^\s+keyword:\s*"([^"]+)"/gm)].map((m) => m[1]);
const postServices = [...blogSrc.matchAll(/^\s+serviceSlug:\s*"([^"]+)"/gm)].map((m) => m[1]);
const postCategories = [...blogSrc.matchAll(/^\s+category:\s*"([^"]+)"/gm)].map((m) => m[1]);

const aligned =
  postSlugs.length === postKeywords.length &&
  postSlugs.length === postServices.length &&
  postSlugs.length === postCategories.length;

// Dedup by slug (runtime keeps the last definition) — keep last occurrence.
const bySlug = new Map();
for (let i = 0; i < postSlugs.length; i++) {
  bySlug.set(postSlugs[i], {
    slug: postSlugs[i],
    keyword: aligned ? postKeywords[i] : "",
    serviceSlug: aligned ? postServices[i] : "",
    category: aligned ? postCategories[i] : "",
  });
}
const posts = [...bySlug.values()];

const errors = [];
const warnings = [];

// 1. broken service references from blog
for (const p of posts) {
  if (p.serviceSlug && !serviceSlugs.has(p.serviceSlug))
    errors.push(`Blog post "${p.slug}" references unknown service hub: "${p.serviceSlug}"`);
}

// 2. thin / unsupported service hubs
const supportCount = {};
for (const p of posts) supportCount[p.serviceSlug] = (supportCount[p.serviceSlug] ?? 0) + 1;
for (const s of serviceSlugs) {
  const n = supportCount[s] ?? 0;
  if (n === 0) warnings.push(`Service hub "${s}" has 0 supporting blog guides (add cluster content / cross-link).`);
  else if (n === 1) warnings.push(`Service hub "${s}" has only 1 supporting guide (aim for 3+).`);
}

// 3. Inbound internal links (inlinks) per post.
//    a) silo siblings: posts sharing serviceSlug surface each other via related/hub
//    b) hub inlink: each post with a real hub is listed on that hub page
//    c) prose inlinks: natural mentions of the post's keyword in other posts' body
const bodyText = deaccent(blogSrc);
const inlinks = new Map(posts.map((p) => [p.slug, 0]));
const detail = new Map(posts.map((p) => [p.slug, { silo: 0, hub: 0, prose: 0 }]));

// Per-post source block (slug → next slug) so we can subtract a post's OWN
// keyword occurrences (keyword field, title, seoTitle, intro, etc.) and count
// only genuine mentions inside OTHER posts' prose as inbound prose links.
const selfText = new Map();
{
  const marks = [...blogSrc.matchAll(/^\s+slug:\s*"([^"]+)"/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].idx;
    const end = i + 1 < marks.length ? marks[i + 1].idx : blogSrc.length;
    const seg = deaccent(blogSrc.slice(start, end));
    selfText.set(marks[i].slug, (selfText.get(marks[i].slug) || "") + seg);
  }
}

for (const p of posts) {
  const d = detail.get(p.slug);
  // a) silo siblings (capped at 4, mirroring relatedPostsFor limit)
  d.silo = Math.min(4, (supportCount[p.serviceSlug] ?? 1) - 1);
  // b) hub inlink
  d.hub = serviceSlugs.has(p.serviceSlug) ? 1 : 0;
  // c) prose: total keyword occurrences minus the post's own block occurrences,
  //    i.e. natural mentions inside OTHER posts' prose (real inbound links).
  const phrase = deaccent((p.keyword || "").trim());
  if (phrase.length >= 8) {
    const re = new RegExp(`(^|[^0-9a-z])${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^0-9a-z]|$)`, "g");
    const total = (bodyText.match(re) || []).length;
    const own = ((selfText.get(p.slug) || "").match(re) || []).length;
    d.prose = Math.max(0, total - own);
  }
  inlinks.set(p.slug, d.silo + d.hub + d.prose);
}

const orphans = posts.filter((p) => (inlinks.get(p.slug) ?? 0) <= 1);
const weakInline = posts.filter((p) => (detail.get(p.slug)?.prose ?? 0) === 0);

// 4. Click depth (BFS): home(0) → hubs(1) → posts(2). Posts only reachable via
//    prose from another post are depth 3. Posts with no inbound = unreachable.
const depth = new Map();
for (const p of posts) {
  if (serviceSlugs.has(p.serviceSlug)) depth.set(p.slug, 2);
  else if ((detail.get(p.slug)?.prose ?? 0) > 0) depth.set(p.slug, 3);
  else depth.set(p.slug, Infinity);
}
const unreachable = posts.filter((p) => depth.get(p.slug) === Infinity);
const tooDeep = posts.filter((p) => (depth.get(p.slug) ?? 0) > 3);

// --- Console summary ---
console.log("\n=== Internal Link Audit ===");
console.log(`Services: ${serviceSlugs.size} | Districts: ${districtCount} | Blog posts: ${posts.length}`);
console.log(`Service hubs with blog support: ${Object.keys(supportCount).filter((k) => serviceSlugs.has(k)).length}/${serviceSlugs.size}`);
const avgInlinks = posts.length ? (([...inlinks.values()].reduce((a, b) => a + b, 0)) / posts.length).toFixed(1) : "0";
console.log(`Avg inlinks/post: ${avgInlinks} | Orphans (≤1 inlink): ${orphans.length} | No prose mentions: ${weakInline.length} | Unreachable: ${unreachable.length}\n`);

if (errors.length) {
  console.log("ERRORS:");
  errors.forEach((e) => console.log(`  ✗ ${e}`));
}
if (warnings.length) {
  console.log("WARNINGS:");
  warnings.forEach((w) => console.log(`  ! ${w}`));
}
if (!errors.length && !warnings.length) console.log("All internal-link checks passed ✓");
console.log("");

// --- Markdown report ---
const fmtList = (arr, f) => (arr.length ? arr.map(f).join("\n") : "_(none)_");
const report = `# Internal Linking Report

_Generated by \`scripts/internal-link-audit.mjs\` — ${new Date().toISOString().slice(0, 10)}_

## Summary
- **Services:** ${serviceSlugs.size}
- **Districts:** ${districtCount}
- **Blog posts:** ${posts.length}
- **Avg inlinks / post:** ${avgInlinks}
- **Orphans (≤1 inbound link):** ${orphans.length}
- **Posts with no prose mentions:** ${weakInline.length}
- **Unreachable posts:** ${unreachable.length}

## KPI targets
| Metric | Target | Current |
| --- | --- | --- |
| Inlinks per post | ≥ 3 | avg ${avgInlinks} |
| Cluster guides per hub | ≥ 3 | see hub support below |
| Orphan posts | 0 | ${orphans.length} |
| Max click depth | 3 | ${Math.max(0, ...posts.map((p) => (depth.get(p.slug) === Infinity ? 0 : depth.get(p.slug))))} |

## Hub support (cluster size)
${[...serviceSlugs]
  .map((s) => `- \`${s}\`: ${supportCount[s] ?? 0} guide(s)${(supportCount[s] ?? 0) < 3 ? " ⚠️" : ""}`)
  .join("\n")}

## Orphan / weak posts (≤1 inbound link)
${fmtList(orphans, (p) => `- \`${p.slug}\` (silo ${detail.get(p.slug).silo}, hub ${detail.get(p.slug).hub}, prose ${detail.get(p.slug).prose})`)}

## Posts with no prose mentions (add a natural keyword mention elsewhere)
${fmtList(weakInline.slice(0, 40), (p) => `- \`${p.slug}\` — keyword: "${p.keyword}"`)}${weakInline.length > 40 ? `\n- …and ${weakInline.length - 40} more` : ""}

## Unreachable posts
${fmtList(unreachable, (p) => `- \`${p.slug}\``)}

${errors.length ? `## Errors\n${errors.map((e) => `- ${e}`).join("\n")}\n` : ""}${warnings.length ? `## Warnings\n${warnings.map((w) => `- ${w}`).join("\n")}\n` : ""}`;

mkdirSync(new URL("../.lovable/", import.meta.url), { recursive: true });
writeFileSync(new URL("../.lovable/internal-linking-report.md", import.meta.url), report, "utf8");
console.log("Report written to .lovable/internal-linking-report.md\n");

process.exit(strict && errors.length ? 1 : 0);
