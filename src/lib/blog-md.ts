// ---------------------------------------------------------------------------
// Markdown-mode blog loader (hybrid with legacy TS array in src/data/blog.ts)
// ---------------------------------------------------------------------------
// Loads every *.md file under src/content/blog/ at build time via
// import.meta.glob (eager + ?raw), parses YAML frontmatter with js-yaml
// (browser-safe — gray-matter requires Node's Buffer which is not defined
// in Vite's browser bundle), and returns fully-formed BlogPost objects.
// ---------------------------------------------------------------------------

import yaml from "js-yaml";
import type { BlogPost } from "@/data/blog";

const RAW_MD_FILES = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

// Minimal frontmatter splitter: expects a file starting with `---\n`,
// followed by YAML, then a closing `---` on its own line.
function extractFrontmatter(raw: string): string | null {
  if (!raw.startsWith("---")) return null;
  const rest = raw.slice(3).replace(/^\r?\n/, "");
  const end = rest.search(/\r?\n---\s*(\r?\n|$)/);
  if (end === -1) return null;
  return rest.slice(0, end);
}

// Required top-level frontmatter keys for a renderable post. If any are
// missing, we log a clear warning and skip the file instead of letting the
// blog detail route crash at click-time (e.g. `p.faq.map` when `faq` is
// undefined). Keep this list in sync with what src/routes/blog.$slug.tsx
// and src/data/blog.ts actually read.
const REQUIRED_FIELDS = [
  "slug", "title", "seoTitle", "keyword", "category", "readMin",
  "published", "excerpt", "metaDescription", "serviceSlug",
  "sections", "faq",
] as const;

type MutableRecord = Record<string, unknown>;

function isRecord(value: unknown): value is MutableRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value === undefined || value === null) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function toTextArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(toText).filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(",", ".").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function normalizeTable(block: unknown): void {
  if (!isRecord(block)) return;
  block.headers = toTextArray(block.headers);
  const rows = Array.isArray(block.rows) ? block.rows : [];
  block.rows = rows
    .map((row) => {
      if (Array.isArray(row)) return row.map(toText).filter(Boolean);
      if (isRecord(row)) return Object.values(row).map(toText).filter(Boolean);
      const text = toText(row);
      return text ? [text] : [];
    })
    .filter((row) => row.length > 0);
}

function normalizeChart(block: unknown): void {
  if (!isRecord(block)) return;
  const source = Array.isArray(block.bars)
    ? block.bars
    : Array.isArray(block.data)
      ? block.data
      : [];
  block.bars = source
    .map((item) => {
      if (Array.isArray(item)) {
        const label = toText(item[0]);
        return { label, value: toNumber(item[1]) };
      }
      if (isRecord(item)) {
        const label = toText(item.label ?? item.name ?? item.title);
        const value = toNumber(item.value ?? item.amount ?? item.count ?? item.percent);
        const note = toText(item.note ?? item.description);
        return { label, value, ...(note ? { note } : {}) };
      }
      return { label: "", value: 0 };
    })
    .filter((item) => item.label && Number.isFinite(item.value));
}

function normalizeProsCons(block: unknown): void {
  if (!isRecord(block)) return;
  block.pros = toTextArray(block.pros);
  block.cons = toTextArray(block.cons);
}

function normalizeMaterials(block: unknown): void {
  if (!isRecord(block)) return;
  const items = Array.isArray(block.items) ? block.items : [];
  block.items = items
    .map((item) => {
      if (isRecord(item)) {
        const name = toText(item.name ?? item.title ?? item.label);
        const note = toText(item.note ?? item.body ?? item.description);
        return { name, ...(note ? { note } : {}) };
      }
      return { name: toText(item) };
    })
    .filter((item) => item.name);
}

function normalizeQuestionList(block: unknown): void {
  if (!isRecord(block)) return;
  const items = Array.isArray(block.items) ? block.items : [];
  block.items = items
    .map((item) => {
      if (!isRecord(item)) return { q: toText(item), a: "" };
      return {
        q: toText(item.q ?? item.question ?? item.title),
        a: toText(item.a ?? item.answer ?? item.body ?? item.text),
      };
    })
    .filter((item) => item.q && item.a);
}

function normalizeSources(block: unknown): void {
  if (!isRecord(block)) return;
  const items = Array.isArray(block.items) ? block.items : [];
  block.items = items
    .map((item) => {
      if (!isRecord(item)) return { label: toText(item), url: "" };
      return { label: toText(item.label ?? item.title ?? item.name), url: toText(item.url ?? item.href) };
    })
    .filter((item) => item.label && item.url);
}

function normalizeSteps(block: unknown): void {
  if (!isRecord(block)) return;
  const source = Array.isArray(block.steps)
    ? block.steps
    : Array.isArray(block.items)
      ? block.items
      : [];
  block.steps = source
    .filter(isRecord)
    .map((item, index) => {
      const body = toText(item.body ?? item.detail ?? item.text ?? item.description);
      return {
        title: toText(item.title ?? item.name) || `Adım ${index + 1}`,
        ...(body ? { body } : {}),
        ...(isRecord(item.image) ? { image: item.image } : {}),
      };
    });
}

function normalizeTimeline(block: unknown): void {
  if (!isRecord(block) || !Array.isArray(block.items)) return;
  block.items = block.items
    .filter(isRecord)
    .map((item, index) => {
      const time = toText(item.time ?? item.date ?? item.month ?? item.label);
      const title = toText(item.title ?? item.text ?? item.name) || `Aşama ${index + 1}`;
      const body = toText(item.body ?? item.detail ?? item.description);
      return {
        time: time || `${index + 1}`,
        title,
        ...(body && body !== title ? { body } : {}),
      };
    });
}

function normalizePriceTable(block: unknown): void {
  if (!isRecord(block) || !Array.isArray(block.rows)) return;
  block.rows = block.rows
    .map((row) => {
      if (Array.isArray(row)) {
        const note = toText(row[2]);
        return {
          service: toText(row[0]),
          price: toText(row[1]),
          ...(note ? { note } : {}),
        };
      }
      if (isRecord(row)) {
        const note = toText(row.note ?? row.detail ?? row.description);
        return {
          service: toText(row.service ?? row.label ?? row.name ?? row.title),
          price: toText(row.price ?? row.amount ?? row.cost),
          ...(note ? { note } : {}),
        };
      }
      return { service: toText(row), price: "" };
    })
    .filter((row) => isRecord(row) && (Boolean(row.service) || Boolean(row.price)));
}

function normalizeSections(sections: unknown): unknown {
  if (!Array.isArray(sections)) return sections;
  return sections.filter(isRecord).map((section) => {
    const normalized: MutableRecord = { ...section };
    normalized.heading = toText(normalized.heading) || "Bölüm";
    normalized.paragraphs = toTextArray(normalized.paragraphs);

    if (normalized.bullets !== undefined) normalized.bullets = toTextArray(normalized.bullets);
    if (isRecord(normalized.table)) normalizeTable(normalized.table);
    if (isRecord(normalized.chart)) normalizeChart(normalized.chart);
    if (isRecord(normalized.keyTakeaways)) {
      normalized.keyTakeaways = {
        ...normalized.keyTakeaways,
        points: toTextArray(normalized.keyTakeaways.points),
      };
    }
    if (isRecord(normalized.checklist)) {
      normalized.checklist = {
        ...normalized.checklist,
        items: toTextArray(normalized.checklist.items),
      };
    }
    if (isRecord(normalized.prosCons)) normalizeProsCons(normalized.prosCons);
    if (isRecord(normalized.materials)) normalizeMaterials(normalized.materials);
    if (isRecord(normalized.gallery) && !Array.isArray(normalized.gallery.images)) normalized.gallery.images = [];
    if (isRecord(normalized.accordion)) normalizeQuestionList(normalized.accordion);
    if (isRecord(normalized.sources)) normalizeSources(normalized.sources);
    normalizeSteps(normalized.steps);
    normalizeTimeline(normalized.timeline);
    normalizePriceTable(normalized.priceTable);

    return normalized;
  });
}

function normalizeFaq(faq: unknown): unknown {
  if (!Array.isArray(faq)) return faq;
  return faq
    .filter(isRecord)
    .map((item) => ({
      q: toText(item.q ?? item.question ?? item.title),
      a: toText(item.a ?? item.answer ?? item.body ?? item.text),
    }))
    .filter((item) => item.q && item.a);
}

function parseOne(path: string, raw: string): BlogPost | null {
  try {
    const fm = extractFrontmatter(raw);
    if (!fm) return null;
    // Use JSON_SCHEMA so unquoted ISO dates (e.g. 2026-01-15) stay as strings
    // instead of being auto-converted to JS Date objects, which would break
    // downstream `.localeCompare()` calls on `published` / `updated`.
    const data = yaml.load(fm, { schema: yaml.JSON_SCHEMA }) as Record<string, unknown> | null;
    if (!data || typeof data.slug !== "string" || !data.slug) return null;

    // ---- Field-name aliasing --------------------------------------------
    // Accept common plural/singular variants so a typo in one MD file never
    // crashes the whole blog. Add new aliases here rather than in the route.
    if (data.faq === undefined && Array.isArray(data.faqs)) data.faq = data.faqs;
    if (data.section === undefined && Array.isArray(data.sections)) {
      // no-op — canonical name is already `sections`; kept for symmetry
    }
    if (data.sections === undefined && Array.isArray(data.section)) data.sections = data.section;

    // ---- Required-field validation --------------------------------------
    const missing = REQUIRED_FIELDS.filter((k) => data[k] === undefined || data[k] === null);
    if (missing.length > 0) {
      // eslint-disable-next-line no-console
      console.error(
        `[blog-md] Skipping ${path} — missing required frontmatter field(s): ${missing.join(", ")}. ` +
          `Fix the YAML (note: use singular \`faq:\`, not \`faqs:\`) and reload.`,
      );
      return null;
    }

    if (!Array.isArray(data.sections) || !Array.isArray(data.faq)) {
      // eslint-disable-next-line no-console
      console.error(
        `[blog-md] Skipping ${path} — \`sections\` and \`faq\` must be YAML arrays.`,
      );
      return null;
    }

    // ---- Shape normalization --------------------------------------------
    // External AI/manual MD files often use friendly aliases like
    // `steps.items[].detail`, `timeline.items[].date/text`, or price-table
    // string rows. Convert those to the exact render shape once at load time so
    // a single block typo can never crash `/blog/$slug` again.
    data.sections = normalizeSections(data.sections);
    data.faq = normalizeFaq(data.faq);
    data.published = toText(data.published);
    if (data.updated !== undefined) data.updated = toText(data.updated);
    if (data.intro === undefined) data.intro = toText(data.excerpt);

    return data as unknown as BlogPost;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[blog-md] Failed to parse ${path}:`, err);
    return null;
  }
}


export const MD_BLOG_POSTS: BlogPost[] = Object.entries(RAW_MD_FILES)
  // Skip templates & files whose basename starts with "_" (drafts / examples).
  .filter(([path]) => !path.includes("/_templates/") && !/\/_[^/]+\.md$/.test(path))
  .map(([path, raw]) => parseOne(path, raw))
  .filter((p): p is BlogPost => p !== null);
