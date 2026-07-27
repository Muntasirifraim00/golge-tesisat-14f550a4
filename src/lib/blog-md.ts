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

function parseOne(path: string, raw: string): BlogPost | null {
  try {
    const fm = extractFrontmatter(raw);
    if (!fm) return null;
    // Use JSON_SCHEMA so unquoted ISO dates (e.g. 2026-01-15) stay as strings
    // instead of being auto-converted to JS Date objects, which would break
    // downstream `.localeCompare()` calls on `published` / `updated`.
    const data = yaml.load(fm, { schema: yaml.JSON_SCHEMA }) as Record<string, unknown> | null;
    if (!data || typeof data.slug !== "string" || !data.slug) return null;
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
