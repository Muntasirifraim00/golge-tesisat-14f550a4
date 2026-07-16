// Public (no-auth) read access to AI-generated, published blog posts.
// Used by the public blog routes to merge generated posts with the static
// BLOG_POSTS catalog. Reads go through the server publishable client and rely
// on the "Public can read published generated posts" RLS policy (anon, published=true).
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { BlogPost } from "@/data/blog";

function publicClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

function asPost(data: unknown): BlogPost | null {
  if (!data || typeof data !== "object") return null;
  const p = data as Partial<BlogPost>;
  if (!p.slug || !p.title || !Array.isArray(p.sections)) return null;
  return p as BlogPost;
}

export const listGeneratedPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ posts: BlogPost[] }> => {
    try {
      const supabase = publicClient();
      const { data, error } = await supabase
        .from("blog_posts_generated")
        .select("data")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(500);
      if (error) return { posts: [] };
      const posts = (data ?? [])
        .map((r) => asPost(r.data))
        .filter((p): p is BlogPost => p !== null);
      return { posts };
    } catch {
      return { posts: [] };
    }
  },
);

export const getGeneratedPost = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => {
    if (!data?.slug) throw new Error("slug gerekli");
    return { slug: data.slug };
  })
  .handler(async ({ data }): Promise<{ post: BlogPost | null }> => {
    try {
      const supabase = publicClient();
      const { data: row, error } = await supabase
        .from("blog_posts_generated")
        .select("data")
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();
      if (error || !row) return { post: null };
      return { post: asPost(row.data) };
    } catch {
      return { post: null };
    }
  });
