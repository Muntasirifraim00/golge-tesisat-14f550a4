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
