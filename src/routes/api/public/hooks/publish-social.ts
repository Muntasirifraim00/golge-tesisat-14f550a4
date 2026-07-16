import { createFileRoute } from "@tanstack/react-router";

type MediaType = "image" | "carousel" | "video" | "reels";

type SocialPostRow = {
  id: string;
  platform: string;
  caption: string;
  hashtags: string | null;
  image_path: string | null;
  media_type: MediaType | null;
  media_paths: string[] | null;
  platform_variants: Record<string, { caption: string; hashtags: string }> | null;
  retry_count: number | null;
};

async function signOne(admin: AdminClient, path: string): Promise<string | null> {
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = await admin.storage.from("social-media").createSignedUrl(path, 60 * 60);
  return data?.signedUrl ?? null;
}

const MAX_RETRIES = 3;

type AdminClient = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

async function log(admin: AdminClient, postId: string | null, level: string, message: string): Promise<void> {
  try {
    await admin.from("social_logs").insert({ post_id: postId, action: "cron_publish", level, message } as never);
  } catch {
    /* never break the loop on log failure */
  }
}



async function handle(request: Request): Promise<Response> {
  // Lightweight auth: require the project anon key in the apikey header.
  const apikey = request.headers.get("apikey") ?? "";
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY ?? "";
  if (!expected || apikey !== expected) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { publishToMeta, isAutomationEnabled } = await import("@/lib/social.server");

  // Respect the global automation kill-switch.
  if (!(await isAutomationEnabled())) {
    return new Response(JSON.stringify({ ok: true, halted: true, processed: 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const nowIso = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from("social_posts")
    .select("id, platform, caption, hashtags, image_path, media_type, media_paths, platform_variants, retry_count")
    .in("status", ["scheduled", "approved"])
    .lte("scheduled_for", nowIso)
    .limit(10);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const posts = (data ?? []) as unknown as SocialPostRow[];
  let published = 0;
  let retried = 0;
  let failed = 0;

  for (const post of posts) {
    try {
      const paths = post.media_paths?.length ? post.media_paths : post.image_path ? [post.image_path] : [];
      if (paths.length === 0) throw new Error("Medya yok");
      const mediaUrls = (await Promise.all(paths.map((p) => signOne(supabaseAdmin, p)))).filter(
        (u): u is string => Boolean(u),
      );
      if (mediaUrls.length === 0) throw new Error("Medya adresi oluşturulamadı");

      const res = await publishToMeta({
        platform: post.platform,
        caption: post.caption,
        hashtags: post.hashtags,
        mediaType: post.media_type ?? undefined,
        mediaUrls,
        variants: post.platform_variants ?? null,
      });


      await supabaseAdmin
        .from("social_posts")
        .update({
          status: "posted",
          posted_at: new Date().toISOString(),
          fb_post_id: res.fb_post_id ?? null,
          ig_post_id: res.ig_post_id ?? null,
          error: null,
        })
        .eq("id", post.id);
      await log(supabaseAdmin, post.id, "info", "Otomatik yayınlandı");
      published++;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Bilinmeyen hata";
      const attempts = (post.retry_count ?? 0) + 1;
      if (attempts < MAX_RETRIES) {
        // back off ~10 min and keep it scheduled for another attempt
        const nextTry = new Date(Date.now() + 10 * 60 * 1000).toISOString();
        await supabaseAdmin
          .from("social_posts")
          .update({ retry_count: attempts, scheduled_for: nextTry, error: msg } as never)
          .eq("id", post.id);
        await log(supabaseAdmin, post.id, "warn", `Deneme ${attempts}/${MAX_RETRIES} başarısız: ${msg}`);
        retried++;
      } else {
        await supabaseAdmin
          .from("social_posts")
          .update({ status: "failed", retry_count: attempts, error: msg } as never)
          .eq("id", post.id);
        await log(supabaseAdmin, post.id, "error", `Kalıcı hata (${attempts} deneme): ${msg}`);
        failed++;
      }
    }
  }

  return new Response(JSON.stringify({ ok: true, processed: posts.length, published, retried, failed }), {
    headers: { "Content-Type": "application/json" },
  });
}

export const Route = createFileRoute("/api/public/hooks/publish-social")({
  server: {
    handlers: {
      POST: async ({ request }) => handle(request),
      GET: async ({ request }) => handle(request),
    },
  },
});
