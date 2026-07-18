// ---------------------------------------------------------------------------
// Markdown-mode blog loader (hybrid with legacy TS array in src/data/blog.ts)
// ---------------------------------------------------------------------------
// Loads every *.md file under src/content/blog/ at build time via
// import.meta.glob (eager + ?raw), parses YAML frontmatter with gray-matter,
// and returns fully-formed BlogPost objects. These get merged into BLOG_POSTS
// so every downstream consumer (findPost, INLINE_LINK_INDEX, relatedPostsFor,
// sitemap.xml, blog index page, hub pages) picks them up automatically — the
// site does NOT care whether a post came from TS or MD.
//
// Authoring: drop a new file at src/content/blog/<slug>.md following the
// example in src/content/blog/README.md. Images go in public/blog-images/
// and are referenced by absolute URL path like "/blog-images/foo.jpg".
// ---------------------------------------------------------------------------

import matter from "gray-matter";
import type { BlogPost } from "@/data/blog";

// Raw string contents of every markdown file, keyed by absolute path.
// { eager: true, query: '?raw', import: 'default' } inlines the file body
// into the bundle at build time — no runtime fetch, works in SSR + client.
const RAW_MD_FILES = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseOne(path: string, raw: string): BlogPost | null {
  try {
    const { data } = matter(raw);
    // Skip files without a slug (e.g. README, _example templates).
    if (!data || typeof data.slug !== "string" || !data.slug) return null;
    // Trust the frontmatter shape — authors follow the template. Any missing
    // required field will surface as a build/runtime error at the consumer,
    // which is the correct signal (we do NOT want to silently render a broken
    // post).
    return data as unknown as BlogPost;
  } catch (err) {
    // Log but don't throw — one malformed MD shouldn't take down the whole
    // site build. The missing post simply won't appear.
    // eslint-disable-next-line no-console
    console.error(`[blog-md] Failed to parse ${path}:`, err);
    return null;
  }
}

export const MD_BLOG_POSTS: BlogPost[] = Object.entries(RAW_MD_FILES)
  .map(([path, raw]) => parseOne(path, raw))
  .filter((p): p is BlogPost => p !== null);
