// Latest blog posts for the homepage blog section.
// Merges AI-generated published posts (Supabase) with the static BLOG_POSTS
// catalog, newest first, and returns only small summaries — so the homepage
// never ships the full blog corpus to the browser.
import { createServerFn } from "@tanstack/react-start";
import { BLOG_POSTS, type BlogPost } from "@/data/blog";
import { listGeneratedPosts } from "@/lib/seo-writer/blog-public.functions";

export type HomePost = {
  t: string; // title
  x: string; // excerpt
  cat: string;
  min: number;
  href: string;
  img?: string; // real featured image, when the post has one
  alt?: string;
  fb: string; // fallback work-photo key (homepage image map) when there is no featured image
  date?: string;
};

// Pick a matching real job photo for posts without their own featured image.
function fallbackKey(p: BlogPost): string {
  const s = `${p.category} ${p.title} ${p.keyword ?? ""}`.toLocaleLowerCase("tr");
  if (/petek|kalorifer|radyat/.test(s)) return "boilerCommercial";
  if (/kombi|ısıtma|isitma|şofben|sofben|termosifon/.test(s)) return "boilerWiring";
  if (/doğalgaz|dogalgaz|gaz/.test(s)) return "gasInstall";
  if (/kaçak|kacak|nem|rutubet/.test(s)) return "bathLeak";
  if (/tıkan|tikan|gider|lavabo|klozet|tuvalet|rögar|rogar/.test(s)) return "floorDetail";
  if (/çatı|cati|yağmur|yagmur|oluk/.test(s)) return "roof";
  if (/banyo|duş|dus|musluk|batarya|taharet/.test(s)) return "bath";
  return "cleanHome";
}

const ts = (d?: string) => {
  const t = d ? new Date(d).getTime() : 0;
  return Number.isFinite(t) ? t : 0;
};

export const listLatestHomePosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: HomePost[] }> => {
    const { posts: generated } = await listGeneratedPosts().catch(() => ({ posts: [] as BlogPost[] }));
    const staticSlugs = new Set(BLOG_POSTS.map((p) => p.slug));
    const extras = (generated || []).filter((p) => !staticSlugs.has(p.slug));
    const all = [...extras, ...BLOG_POSTS]
      .map((p, i) => ({ p, i }))
      // newest first; same publish day → most recently updated first
      .sort((a, b) => ts(b.p.published) - ts(a.p.published) || ts(b.p.updated) - ts(a.p.updated) || a.i - b.i)
      .slice(0, 6)
      .map(({ p }) => ({
        t: p.title,
        x: p.excerpt || p.metaDescription || "",
        cat: (p.category || "Blog").replace(/\s+ve\s+/gi, " & "), // "Musluk ve Batarya" = "Musluk & Batarya"
        min: p.readMin || 5,
        href: `/blog/${p.slug}`,
        img: p.featuredImage?.src,
        alt: p.featuredImage?.alt,
        fb: fallbackKey(p),
        date: p.published ? String(p.published) : undefined,
      }));
    return { posts: all };
  },
);
