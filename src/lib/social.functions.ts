import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type MediaType = "image" | "carousel" | "video" | "reels";

export type SocialPost = {
  id: string;
  platform: string;
  idea: string | null;
  caption: string;
  hashtags: string | null;
  image_url: string | null;
  image_path: string | null;
  media_type: MediaType;
  media_paths: string[];
  media_urls: string[];
  status: "draft" | "pending_review" | "approved" | "rejected" | "scheduled" | "posted" | "failed";
  scheduled_for: string | null;
  posted_at: string | null;
  fb_post_id: string | null;
  ig_post_id: string | null;
  error: string | null;
  campaign_id: string | null;
  voice_profile_id: string | null;
  platform_variants: Record<string, { caption: string; hashtags: string }>;
  reviewed_by: string | null;
  reviewed_at: string | null;
  review_note: string | null;
  created_at: string;
  updated_at: string;
};

const BUCKET = "social-media";
const SIGNED_TTL = 60 * 60 * 6; // 6 hours

async function assertAdmin(context: unknown): Promise<void> {
  const { userId, supabase } = context as {
    userId: string;
    supabase: { rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }> };
  };
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Response("Forbidden", { status: 403 });
}

type AdminClient = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

type RawPost = Omit<SocialPost, "image_url" | "media_urls">;

/** Sign a single storage path; pass through values that are already http(s) URLs. */
async function signOne(admin: AdminClient, path: string): Promise<string | null> {
  if (/^https?:\/\//i.test(path)) return path;
  const { data } = await admin.storage.from(BUCKET).createSignedUrl(path, SIGNED_TTL);
  return data?.signedUrl ?? null;
}

async function withSignedUrls(admin: AdminClient, rows: RawPost[]): Promise<SocialPost[]> {
  return Promise.all(
    rows.map(async (r) => {
      const paths = r.media_paths?.length ? r.media_paths : r.image_path ? [r.image_path] : [];
      const media_urls = (await Promise.all(paths.map((p) => signOne(admin, p)))).filter(
        (u): u is string => Boolean(u),
      );
      return { ...r, image_url: media_urls[0] ?? null, media_urls };
    }),
  );
}

async function writeLog(
  admin: AdminClient,
  postId: string | null,
  action: string,
  level: "info" | "warn" | "error",
  message: string,
): Promise<void> {
  try {
    await admin.from("social_logs").insert({ post_id: postId, action, level, message } as never);
  } catch {
    /* logging must never break the main flow */
  }
}

/**
 * Compute scheduled timestamps for N posts. When autoSchedule is on, spread
 * them across upcoming days at the brand's configured best-time slots.
 */
async function computeSchedule(
  admin: AdminClient,
  _brand: unknown,
  count: number,
  autoSchedule: boolean,
): Promise<(string | null)[]> {
  if (!autoSchedule) return Array.from({ length: count }, () => null);
  const { data: settings } = await admin
    .from("brand_settings")
    .select("best_times")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  const rawTimes = (settings as { best_times?: string[] } | null)?.best_times;
  const times = (rawTimes && rawTimes.length ? rawTimes : ["09:00", "18:00"])
    .filter((t) => /^\d{2}:\d{2}$/.test(t))
    .sort();
  const slots: (string | null)[] = [];
  const now = new Date();
  let dayOffset = 0;
  let timeIdx = 0;
  while (slots.length < count) {
    const [h, m] = times[timeIdx].split(":").map(Number);
    const d = new Date(now);
    d.setDate(now.getDate() + dayOffset);
    d.setHours(h, m, 0, 0);
    if (d.getTime() > now.getTime()) slots.push(d.toISOString());
    timeIdx++;
    if (timeIdx >= times.length) {
      timeIdx = 0;
      dayOffset++;
    }
    if (dayOffset > 120) break; // safety
  }
  return slots;
}



export const listSocialPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SocialPost[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("social_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return withSignedUrls(supabaseAdmin, (data ?? []) as unknown as RawPost[]);
  });

/** Generate a full AI post (text + image) and store it as a draft. */
export const generateSocialPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { topic?: string; platform?: string; voiceProfileId?: string | null }) => ({
    topic: typeof data?.topic === "string" ? data.topic.slice(0, 300) : "",
    platform: ["facebook", "instagram", "both"].includes(data?.platform ?? "")
      ? (data.platform as string)
      : "both",
    voiceProfileId: typeof data?.voiceProfileId === "string" ? data.voiceProfileId : null,
  }))
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateContentAI, generateImageAI, loadBrandProfile, loadVoiceProfile } = await import(
      "@/lib/social.server"
    );

    const brand = await loadBrandProfile();
    const persona = await loadVoiceProfile(data.voiceProfileId);
    const content = await generateContentAI(data.topic, brand, persona);
    const bytes = await generateImageAI(content.imagePrompt);

    const path = `posts/${crypto.randomUUID()}.png`;
    const { error: upErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`Görsel yüklenemedi: ${upErr.message}`);

    const { data: inserted, error } = await supabaseAdmin
      .from("social_posts")
      .insert({
        platform: data.platform,
        idea: content.idea,
        caption: content.caption,
        hashtags: content.hashtags,
        image_path: path,
        media_paths: [path],
        status: "draft",
        voice_profile_id: persona?.id ?? null,
      } as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await writeLog(supabaseAdmin, (inserted as { id: string }).id, "generate", "info", "AI içeriği üretildi");
    const [withUrl] = await withSignedUrls(supabaseAdmin, [inserted as unknown as RawPost]);
    return withUrl;
  });

/**
 * Bulk-generate N posts for a theme, spread across upcoming best-time slots.
 * Returns the created batch id; posts are inserted as scheduled drafts.
 */
export const generateContentBatch = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { theme?: string; platform?: string; count?: number; autoSchedule?: boolean }) => ({
    theme: typeof data?.theme === "string" ? data.theme.slice(0, 300) : "",
    platform: ["facebook", "instagram", "both"].includes(data?.platform ?? "")
      ? (data.platform as string)
      : "both",
    count: Math.min(Math.max(Number(data?.count) || 7, 1), 30),
    autoSchedule: data?.autoSchedule !== false,
  }))
  .handler(async ({ context, data }): Promise<{ batchId: string; created: number; failed: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateContentAI, generateImageAI, loadBrandProfile, CONTENT_ANGLES } = await import(
      "@/lib/social.server"
    );

    const brand = await loadBrandProfile();

    const { data: batch, error: batchErr } = await supabaseAdmin
      .from("content_batches")
      .insert({ theme: data.theme, platform: data.platform, total: data.count, status: "generating" } as never)
      .select("id")
      .single();
    if (batchErr || !batch) throw new Error(batchErr?.message ?? "Batch oluşturulamadı");
    const batchId = (batch as { id: string }).id;

    const slots = await computeSchedule(supabaseAdmin, brand, data.count, data.autoSchedule);

    let created = 0;
    let failed = 0;
    for (let i = 0; i < data.count; i++) {
      try {
        const angle = data.theme || CONTENT_ANGLES[i % CONTENT_ANGLES.length];
        const content = await generateContentAI(angle, brand);
        const bytes = await generateImageAI(content.imagePrompt);
        const path = `posts/${crypto.randomUUID()}.png`;
        const { error: upErr } = await supabaseAdmin.storage
          .from(BUCKET)
          .upload(path, bytes, { contentType: "image/png", upsert: true });
        if (upErr) throw new Error(upErr.message);

        const scheduledFor = slots[i] ?? null;
        await supabaseAdmin.from("social_posts").insert({
          platform: data.platform,
          idea: content.idea,
          caption: content.caption,
          hashtags: content.hashtags,
          image_path: path,
          media_paths: [path],
          batch_id: batchId,
          status: scheduledFor ? "scheduled" : "draft",
          scheduled_for: scheduledFor,
        } as never);
        created++;
        await supabaseAdmin
          .from("content_batches")
          .update({ completed: created } as never)
          .eq("id", batchId);
      } catch (e) {
        failed++;
        await writeLog(
          supabaseAdmin,
          null,
          "batch_generate",
          "error",
          e instanceof Error ? e.message : "Bilinmeyen hata",
        );
      }
    }

    await supabaseAdmin
      .from("content_batches")
      .update({ status: "done", completed: created } as never)
      .eq("id", batchId);

    await writeLog(supabaseAdmin, null, "batch_generate", "info", `${created} içerik üretildi (${failed} hata)`);
    return { batchId, created, failed };
  });

/** Re-generate the caption + image for an existing post (keeps the same row). */
export const regeneratePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; topic?: string; textOnly?: boolean }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id, topic: data.topic?.slice(0, 300) ?? "", textOnly: data.textOnly === true };
  })
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateContentAI, generateImageAI, loadBrandProfile, loadVoiceProfile } = await import(
      "@/lib/social.server"
    );

    const { data: existing } = await supabaseAdmin
      .from("social_posts")
      .select("id, idea, image_path, voice_profile_id")
      .eq("id", data.id)
      .single();
    const prev = existing as
      | { id: string; idea: string | null; image_path: string | null; voice_profile_id: string | null }
      | null;
    if (!prev) throw new Error("Gönderi bulunamadı");

    const brand = await loadBrandProfile();
    const persona = await loadVoiceProfile(prev.voice_profile_id);
    const content = await generateContentAI(data.topic || prev.idea || "", brand, persona);

    const patch: Record<string, unknown> = {
      idea: content.idea,
      caption: content.caption,
      hashtags: content.hashtags,
    };

    if (!data.textOnly) {
      const bytes = await generateImageAI(content.imagePrompt);
      const path = `posts/${crypto.randomUUID()}.png`;
      const { error: upErr } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(path, bytes, { contentType: "image/png", upsert: true });
      if (upErr) throw new Error(`Görsel yüklenemedi: ${upErr.message}`);
      if (prev.image_path) await supabaseAdmin.storage.from(BUCKET).remove([prev.image_path]);
      patch.image_path = path;
      patch.media_paths = [path];
    }

    const { data: updated, error } = await supabaseAdmin
      .from("social_posts")
      .update(patch as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await writeLog(supabaseAdmin, data.id, "regenerate", "info", "İçerik yeniden üretildi");
    const [withUrl] = await withSignedUrls(supabaseAdmin, [updated as unknown as RawPost]);
    return withUrl;
  });

/** Generate an extra AI image and append it to the post (turns it into a carousel). */
export const addPostImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; prompt?: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id, prompt: data.prompt?.slice(0, 400) ?? "" };
  })
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateImageAI, generateContentAI, loadBrandProfile } = await import("@/lib/social.server");

    const { data: existing } = await supabaseAdmin
      .from("social_posts")
      .select("id, idea, image_path, media_paths")
      .eq("id", data.id)
      .single();
    const prev = existing as { idea: string | null; image_path: string | null; media_paths: string[] | null } | null;
    if (!prev) throw new Error("Gönderi bulunamadı");

    let prompt = data.prompt;
    if (!prompt) {
      const brand = await loadBrandProfile();
      const content = await generateContentAI(prev.idea || "", brand);
      prompt = content.imagePrompt;
    }
    const bytes = await generateImageAI(prompt);
    const path = `posts/${crypto.randomUUID()}.png`;
    const { error: upErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`Görsel yüklenemedi: ${upErr.message}`);

    const current = prev.media_paths?.length ? prev.media_paths : prev.image_path ? [prev.image_path] : [];
    const media_paths = [...current, path].slice(0, 10);

    const { data: updated, error } = await supabaseAdmin
      .from("social_posts")
      .update({ media_paths, media_type: media_paths.length > 1 ? "carousel" : "image" } as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await writeLog(supabaseAdmin, data.id, "media", "info", "Karusele görsel eklendi");
    const [withUrl] = await withSignedUrls(supabaseAdmin, [updated as unknown as RawPost]);
    return withUrl;
  });

/** Remove one media item from a post by its storage path / url. */
export const removePostMedia = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; path: string }) => {
    if (!data?.id || !data?.path) throw new Error("id ve path gerekli");
    return { id: data.id, path: data.path };
  })
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("social_posts")
      .select("image_path, media_paths")
      .eq("id", data.id)
      .single();
    const prev = existing as { image_path: string | null; media_paths: string[] | null } | null;
    if (!prev) throw new Error("Gönderi bulunamadı");

    const current = prev.media_paths?.length ? prev.media_paths : prev.image_path ? [prev.image_path] : [];
    const media_paths = current.filter((p) => p !== data.path);
    if (!/^https?:\/\//i.test(data.path)) {
      await supabaseAdmin.storage.from(BUCKET).remove([data.path]).catch(() => undefined);
    }

    const { data: updated, error } = await supabaseAdmin
      .from("social_posts")
      .update({
        media_paths,
        image_path: media_paths[0] && !/^https?:\/\//i.test(media_paths[0]) ? media_paths[0] : prev.image_path,
        media_type: media_paths.length > 1 ? "carousel" : "image",
      } as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    const [withUrl] = await withSignedUrls(supabaseAdmin, [updated as unknown as RawPost]);
    return withUrl;
  });

/** Attach an external video URL and set the post as a Reel/Video. */
export const setPostVideo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; videoUrl: string; type?: "video" | "reels" }) => {
    if (!data?.id) throw new Error("id gerekli");
    if (!/^https?:\/\/.+/i.test(data.videoUrl)) throw new Error("Geçerli bir video URL girin (https://...)");
    return { id: data.id, videoUrl: data.videoUrl.trim(), type: data.type === "video" ? "video" : "reels" };
  })
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: updated, error } = await supabaseAdmin
      .from("social_posts")
      .update({ media_paths: [data.videoUrl], media_type: data.type } as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await writeLog(supabaseAdmin, data.id, "media", "info", `Video/Reels ayarlandı (${data.type})`);
    const [withUrl] = await withSignedUrls(supabaseAdmin, [updated as unknown as RawPost]);
    return withUrl;
  });



/** Update editable fields / status / schedule of a post. */
export const saveSocialPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id: string;
      platform?: string;
      caption?: string;
      hashtags?: string;
      status?: SocialPost["status"];
      scheduled_for?: string | null;
    }) => {
      if (!data?.id) throw new Error("id gerekli");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (data.platform && ["facebook", "instagram", "both"].includes(data.platform))
      patch.platform = data.platform;
    if (typeof data.caption === "string") patch.caption = data.caption;
    if (typeof data.hashtags === "string") patch.hashtags = data.hashtags;
    if (data.status) patch.status = data.status;
    if (data.scheduled_for !== undefined) patch.scheduled_for = data.scheduled_for;
    const { error } = await supabaseAdmin
      .from("social_posts")
      .update(patch as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteSocialPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("social_posts")
      .select("image_path")
      .eq("id", data.id)
      .maybeSingle();
    const imagePath = (row as { image_path?: string } | null)?.image_path;
    if (imagePath) await supabaseAdmin.storage.from(BUCKET).remove([imagePath]);
    const { error } = await supabaseAdmin.from("social_posts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Publish a single post immediately to Facebook/Instagram. */
export const publishSocialPostNow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: boolean; error?: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { publishToMeta } = await import("@/lib/social.server");

    const { data: post, error } = await supabaseAdmin
      .from("social_posts")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error || !post) throw new Error(error?.message ?? "Gönderi bulunamadı");
    const p = post as unknown as RawPost;

    const paths = p.media_paths?.length ? p.media_paths : p.image_path ? [p.image_path] : [];
    if (paths.length === 0) throw new Error("Gönderinin medyası yok");
    const mediaUrls = (await Promise.all(paths.map((path) => signOne(supabaseAdmin, path)))).filter(
      (u): u is string => Boolean(u),
    );
    if (mediaUrls.length === 0) throw new Error("Medya adresi oluşturulamadı");

    try {
      const res = await publishToMeta({
        platform: p.platform,
        caption: p.caption,
        hashtags: p.hashtags,
        mediaType: p.media_type,
        mediaUrls,
        variants: p.platform_variants ?? null,
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
        .eq("id", p.id);
      return { ok: true };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Bilinmeyen hata";
      await supabaseAdmin.from("social_posts").update({ status: "failed", error: msg }).eq("id", p.id);
      await writeLog(supabaseAdmin, p.id, "publish", "error", msg);
      return { ok: false, error: msg };
    }
  });

export type SocialLog = {
  id: string;
  post_id: string | null;
  action: string;
  level: string;
  message: string;
  created_at: string;
};

/** Recent automation activity log. */
export const listSocialLogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SocialLog[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("social_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return (data ?? []) as SocialLog[];
  });

export type MetaConnectionStatus = {
  hasPageToken: boolean;
  hasInstagramId: boolean;
  pageName?: string;
  pageId?: string;
  expiresAt?: string | null;
  error?: string;
};

/** Check whether Meta tokens are present and valid. */
export const checkMetaConnection = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MetaConnectionStatus> => {
    await assertAdmin(context);
    const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
    const igId = process.env.META_INSTAGRAM_BUSINESS_ID;
    const status: MetaConnectionStatus = {
      hasPageToken: Boolean(pageToken),
      hasInstagramId: Boolean(igId),
    };
    if (!pageToken) return status;
    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/me?fields=name,id&access_token=${encodeURIComponent(pageToken)}`,
      );
      const data = (await res.json()) as { name?: string; id?: string; error?: { message?: string } };
      if (data.error) {
        status.error = data.error.message;
      } else {
        status.pageName = data.name;
        status.pageId = data.id;
      }
    } catch (e) {
      status.error = e instanceof Error ? e.message : "Bağlantı hatası";
    }
    return status;
  });

export type PostAnalytics = {
  post_id: string;
  idea: string | null;
  platform: string;
  image_url: string | null;
  posted_at: string | null;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
  engagement: number;
  fetched_at: string | null;
};

export type AnalyticsSummary = {
  totals: { likes: number; comments: number; shares: number; reach: number; engagement: number; posts: number };
  rows: PostAnalytics[];
};

/** Read stored analytics for all posted posts (latest snapshot per post). */
export const getAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AnalyticsSummary> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: posts } = await supabaseAdmin
      .from("social_posts")
      .select("id, idea, platform, image_path, posted_at, analytics")
      .eq("status", "posted")
      .order("posted_at", { ascending: false })
      .limit(100);

    const rows: PostAnalytics[] = [];
    const totals = { likes: 0, comments: 0, shares: 0, reach: 0, engagement: 0, posts: 0 };

    for (const raw of (posts ?? []) as Array<{
      id: string;
      idea: string | null;
      platform: string;
      image_path: string | null;
      posted_at: string | null;
      analytics: Record<string, number> | null;
    }>) {
      const a = raw.analytics ?? {};
      let image_url: string | null = null;
      if (raw.image_path) {
        const { data: signed } = await supabaseAdmin.storage
          .from(BUCKET)
          .createSignedUrl(raw.image_path, SIGNED_TTL);
        image_url = signed?.signedUrl ?? null;
      }
      const row: PostAnalytics = {
        post_id: raw.id,
        idea: raw.idea,
        platform: raw.platform,
        image_url,
        posted_at: raw.posted_at,
        likes: a.likes ?? 0,
        comments: a.comments ?? 0,
        shares: a.shares ?? 0,
        reach: a.reach ?? 0,
        impressions: a.impressions ?? 0,
        engagement: a.engagement ?? 0,
        fetched_at: (a.fetched_at as unknown as string) ?? null,
      };
      rows.push(row);
      totals.likes += row.likes;
      totals.comments += row.comments;
      totals.shares += row.shares;
      totals.reach += row.reach;
      totals.engagement += row.engagement;
      totals.posts += 1;
    }

    return { totals, rows };
  });

/** Pull fresh metrics from Meta for every posted post and store them. */
export const refreshAnalytics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ updated: number; failed: number }> => {
    await assertAdmin(context);
    const { refreshAllAnalytics } = await import("@/lib/social.server");
    return refreshAllAnalytics();
  });

// ────────────────────────────────────────────────────────────────────────────
// Step 8: Auto-reply — settings, rules, and logs management
// ────────────────────────────────────────────────────────────────────────────

export type AutoReplySettings = {
  id: string;
  enabled: boolean;
  reply_to_comments: boolean;
  reply_to_messages: boolean;
  ai_enabled: boolean;
  fallback_reply: string;
};

export type AutoReplyRule = {
  id: string;
  keyword: string;
  response: string;
  platform: string;
  match_type: string;
  channel: string;
  active: boolean;
  priority: number;
  created_at: string;
};

export type AutoReplyLog = {
  id: string;
  platform: string;
  kind: string;
  sender_id: string | null;
  incoming_text: string | null;
  reply_text: string | null;
  matched_rule_id: string | null;
  status: string;
  error: string | null;
  created_at: string;
};

/** Load auto-reply settings (creates the singleton row if missing). */
export const getAutoReplySettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AutoReplySettings> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("auto_reply_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (data) return data as unknown as AutoReplySettings;
    const { data: created, error } = await supabaseAdmin
      .from("auto_reply_settings")
      .insert({ enabled: false } as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return created as unknown as AutoReplySettings;
  });

/** Update auto-reply settings. */
export const saveAutoReplySettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id: string;
      enabled: boolean;
      reply_to_comments: boolean;
      reply_to_messages: boolean;
      ai_enabled: boolean;
      fallback_reply: string;
    }) => {
      if (!data.id) throw new Error("id gerekli");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("auto_reply_settings")
      .update({
        enabled: data.enabled,
        reply_to_comments: data.reply_to_comments,
        reply_to_messages: data.reply_to_messages,
        ai_enabled: data.ai_enabled,
        fallback_reply: data.fallback_reply,
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** List all auto-reply rules ordered by priority. */
export const listAutoReplyRules = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AutoReplyRule[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("auto_reply_rules")
      .select("*")
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as AutoReplyRule[];
  });

/** Create or update an auto-reply rule. */
export const saveAutoReplyRule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      keyword: string;
      response: string;
      platform?: string;
      match_type?: string;
      channel?: string;
      active?: boolean;
      priority?: number;
    }) => {
      if (!data.keyword?.trim()) throw new Error("Anahtar kelime gerekli");
      if (!data.response?.trim()) throw new Error("Yanıt metni gerekli");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      keyword: data.keyword.trim(),
      response: data.response.trim(),
      platform: data.platform ?? "both",
      match_type: data.match_type ?? "contains",
      channel: data.channel ?? "both",
      active: data.active ?? true,
      priority: data.priority ?? 0,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("auto_reply_rules").update(row as never).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("auto_reply_rules").insert(row as never);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/** Delete an auto-reply rule. */
export const deleteAutoReplyRule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("auto_reply_rules").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Read the auto-reply audit log. */
export const listAutoReplyLogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AutoReplyLog[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("auto_reply_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as AutoReplyLog[];
  });

// ────────────────────────────────────────────────────────────────────────────
// Overview dashboard — aggregate health of the whole automation system
// ────────────────────────────────────────────────────────────────────────────

export type DashboardStats = {
  posts: { draft: number; scheduled: number; posted: number; failed: number; total: number };
  upcoming: { id: string; platform: string; caption: string; scheduled_for: string | null }[];
  engagement: { likes: number; comments: number; shares: number; reach: number; total: number };
  autoReply: { enabled: boolean; total: number; last24h: number; errors: number };
  connection: { hasPageToken: boolean; hasInstagramId: boolean };
  lastPostedAt: string | null;
};

/** One-shot aggregate snapshot for the admin command-center overview. */
export const getDashboardStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DashboardStats> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const countBy = async (status: string) => {
      const { count } = await supabaseAdmin
        .from("social_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", status);
      return count ?? 0;
    };

    const [draft, scheduled, posted, failed] = await Promise.all([
      countBy("draft"),
      countBy("scheduled"),
      countBy("posted"),
      countBy("failed"),
    ]);

    // Upcoming scheduled posts
    const { data: upcomingRows } = await supabaseAdmin
      .from("social_posts")
      .select("id, platform, caption, scheduled_for")
      .eq("status", "scheduled")
      .order("scheduled_for", { ascending: true })
      .limit(5);
    const upcoming = ((upcomingRows ?? []) as Array<{
      id: string;
      platform: string;
      caption: string;
      scheduled_for: string | null;
    }>).map((r) => ({ ...r, caption: r.caption?.slice(0, 80) ?? "" }));

    // Last posted timestamp
    const { data: lastPosted } = await supabaseAdmin
      .from("social_posts")
      .select("posted_at")
      .eq("status", "posted")
      .order("posted_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    // Engagement totals from analytics snapshots
    const { data: analyticsRows } = await supabaseAdmin
      .from("post_analytics")
      .select("likes, comments, shares, reach")
      .limit(1000);
    const engagement: DashboardStats["engagement"] = { likes: 0, comments: 0, shares: 0, reach: 0, total: 0 };
    for (const r of (analyticsRows ?? []) as Array<{
      likes: number | null;
      comments: number | null;
      shares: number | null;
      reach: number | null;
    }>) {
      engagement.likes += r.likes ?? 0;
      engagement.comments += r.comments ?? 0;
      engagement.shares += r.shares ?? 0;
      engagement.reach += r.reach ?? 0;
    }
    engagement.total = engagement.likes + engagement.comments + engagement.shares;

    // Auto-reply settings + activity
    const { data: arSettings } = await supabaseAdmin
      .from("auto_reply_settings")
      .select("enabled")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    const { count: arTotal } = await supabaseAdmin
      .from("auto_reply_logs")
      .select("id", { count: "exact", head: true });
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count: arLast24 } = await supabaseAdmin
      .from("auto_reply_logs")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since);
    const { count: arErrors } = await supabaseAdmin
      .from("auto_reply_logs")
      .select("id", { count: "exact", head: true })
      .eq("status", "error");

    return {
      posts: { draft, scheduled, posted, failed, total: draft + scheduled + posted + failed },
      upcoming,
      engagement,
      autoReply: {
        enabled: Boolean((arSettings as { enabled?: boolean } | null)?.enabled),
        total: arTotal ?? 0,
        last24h: arLast24 ?? 0,
        errors: arErrors ?? 0,
      },
      connection: {
        hasPageToken: Boolean(process.env.META_PAGE_ACCESS_TOKEN),
        hasInstagramId: Boolean(process.env.META_INSTAGRAM_BUSINESS_ID),
      },
      lastPostedAt: (lastPosted as { posted_at?: string | null } | null)?.posted_at ?? null,
    };
  });



// ────────────────────────────────────────────────────────────────────────────
// Phase 1 — Campaigns
// ────────────────────────────────────────────────────────────────────────────

export type Campaign = {
  id: string;
  name: string;
  goal: string | null;
  description: string | null;
  target_service: string | null;
  target_district: string | null;
  color: string;
  status: "active" | "paused" | "completed";
  require_approval: boolean;
  starts_on: string | null;
  ends_on: string | null;
  created_at: string;
  updated_at: string;
};

export type CampaignWithStats = Campaign & {
  stats: {
    total: number;
    draft: number;
    scheduled: number;
    posted: number;
    failed: number;
    engagement: number;
  };
};

/** List all campaigns with aggregate post + engagement stats. */
export const listCampaigns = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CampaignWithStats[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: camps, error: cErr }, { data: posts }, { data: analytics }] = await Promise.all([
      supabaseAdmin.from("campaigns").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("social_posts").select("id, campaign_id, status"),
      supabaseAdmin.from("post_analytics").select("post_id, engagement"),
    ]);
    if (cErr) throw new Error(cErr.message);

    const postRows = (posts ?? []) as { id: string; campaign_id: string | null; status: string }[];
    const engByPost = new Map<string, number>();
    for (const a of (analytics ?? []) as { post_id: string; engagement: number | null }[]) {
      engByPost.set(a.post_id, (engByPost.get(a.post_id) ?? 0) + (a.engagement ?? 0));
    }

    return ((camps ?? []) as unknown as Campaign[]).map((c) => {
      const mine = postRows.filter((p) => p.campaign_id === c.id);
      const stats = {
        total: mine.length,
        draft: mine.filter((p) => p.status === "draft").length,
        scheduled: mine.filter((p) => p.status === "scheduled").length,
        posted: mine.filter((p) => p.status === "posted").length,
        failed: mine.filter((p) => p.status === "failed").length,
        engagement: mine.reduce((sum, p) => sum + (engByPost.get(p.id) ?? 0), 0),
      };
      return { ...c, stats };
    });
  });

/** Create or update a campaign. */
export const saveCampaign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      name: string;
      goal?: string | null;
      description?: string | null;
      target_service?: string | null;
      target_district?: string | null;
      color?: string;
      status?: string;
      require_approval?: boolean;
      starts_on?: string | null;
      ends_on?: string | null;
    }) => {
      if (!data.name?.trim()) throw new Error("Kampanya adı gerekli");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true; id: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      name: data.name.trim(),
      goal: data.goal?.trim() || null,
      description: data.description?.trim() || null,
      target_service: data.target_service?.trim() || null,
      target_district: data.target_district?.trim() || null,
      color: data.color || "#ef4444",
      status: data.status || "active",
      require_approval: data.require_approval ?? false,
      starts_on: data.starts_on || null,
      ends_on: data.ends_on || null,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("campaigns").update(row as never).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("campaigns")
      .insert(row as never)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: (inserted as { id: string }).id };
  });

/** Delete a campaign (posts are unlinked, not deleted). */
export const deleteCampaign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("campaigns").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Assign (or clear) the campaign of a single post. */
export const assignPostCampaign = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { postId: string; campaignId: string | null }) => {
    if (!data.postId) throw new Error("postId gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("social_posts")
      .update({ campaign_id: data.campaignId } as never)
      .eq("id", data.postId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 2 — Voice Profiles (AI Personas)
// ────────────────────────────────────────────────────────────────────────────

export type VoiceProfile = {
  id: string;
  name: string;
  description: string | null;
  tone: string;
  do_rules: string | null;
  dont_rules: string | null;
  sample_phrases: string | null;
  emoji_level: string;
  cta_style: string | null;
  language: string;
  is_default: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
};

/** List all voice profiles, default first. */
export const listVoiceProfiles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<VoiceProfile[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("voice_profiles")
      .select("*")
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as VoiceProfile[];
  });

/** Create or update a voice profile. Setting one default clears the others. */
export const saveVoiceProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      name: string;
      description?: string | null;
      tone?: string;
      do_rules?: string | null;
      dont_rules?: string | null;
      sample_phrases?: string | null;
      emoji_level?: string;
      cta_style?: string | null;
      language?: string;
      is_default?: boolean;
      active?: boolean;
    }) => {
      if (!data.name?.trim()) throw new Error("Persona adı gerekli");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true; id: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      name: data.name.trim(),
      description: data.description?.trim() || null,
      tone: data.tone?.trim() || "Güven veren, premium, samimi ama profesyonel",
      do_rules: data.do_rules?.trim() || null,
      dont_rules: data.dont_rules?.trim() || null,
      sample_phrases: data.sample_phrases?.trim() || null,
      emoji_level: data.emoji_level || "medium",
      cta_style: data.cta_style?.trim() || null,
      language: data.language || "tr",
      is_default: data.is_default ?? false,
      active: data.active ?? true,
    };

    let id = data.id ?? "";
    if (data.id) {
      const { error } = await supabaseAdmin.from("voice_profiles").update(row as never).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { data: inserted, error } = await supabaseAdmin
        .from("voice_profiles")
        .insert(row as never)
        .select("id")
        .single();
      if (error) throw new Error(error.message);
      id = (inserted as { id: string }).id;
    }

    // Enforce a single default persona.
    if (row.is_default) {
      await supabaseAdmin
        .from("voice_profiles")
        .update({ is_default: false } as never)
        .neq("id", id);
    }
    return { ok: true, id };
  });

/** Delete a voice profile (cannot delete the default one). */
export const deleteVoiceProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("voice_profiles")
      .select("is_default")
      .eq("id", data.id)
      .maybeSingle();
    if ((row as { is_default?: boolean } | null)?.is_default) {
      throw new Error("Varsayılan persona silinemez");
    }
    const { error } = await supabaseAdmin.from("voice_profiles").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Assign (or clear) the voice profile of a single post. */
export const assignPostVoiceProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { postId: string; voiceProfileId: string | null }) => {
    if (!data.postId) throw new Error("postId gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("social_posts")
      .update({ voice_profile_id: data.voiceProfileId } as never)
      .eq("id", data.postId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 3 — Autopilot Queue & Smart Scheduling
// ────────────────────────────────────────────────────────────────────────────

export type ScheduleSlot = {
  id: string;
  platform: string;
  day_of_week: number;
  time_of_day: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type AutopilotSettings = {
  id: string;
  enabled: boolean;
  cadence_per_week: number;
  min_queue: number;
  batch_size: number;
  theme: string | null;
  platform: string;
  voice_profile_id: string | null;
  campaign_id: string | null;
  last_run_at: string | null;
  last_run_summary: string | null;
};

/** List the weekly posting slots, ordered by weekday then time. */
export const listScheduleSlots = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ScheduleSlot[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("posting_schedule")
      .select("*")
      .order("day_of_week", { ascending: true })
      .order("time_of_day", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as ScheduleSlot[];
  });

/** Create or update a weekly posting slot. */
export const saveScheduleSlot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id?: string; platform?: string; day_of_week: number; time_of_day: string; active?: boolean }) => {
    const dow = Number(data?.day_of_week);
    if (!Number.isInteger(dow) || dow < 0 || dow > 6) throw new Error("Geçerli bir gün seçin");
    if (!/^\d{2}:\d{2}$/.test(data?.time_of_day ?? "")) throw new Error("Saat formatı SS:DD olmalı");
    return {
      id: data.id,
      platform: ["facebook", "instagram", "both"].includes(data.platform ?? "") ? (data.platform as string) : "both",
      day_of_week: dow,
      time_of_day: data.time_of_day,
      active: data.active ?? true,
    };
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      platform: data.platform,
      day_of_week: data.day_of_week,
      time_of_day: data.time_of_day,
      active: data.active,
    };
    if (data.id) {
      const { error } = await supabaseAdmin.from("posting_schedule").update(row as never).eq("id", data.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabaseAdmin.from("posting_schedule").insert(row as never);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/** Delete a weekly posting slot. */
export const deleteScheduleSlot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("posting_schedule").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Load autopilot settings (creates the singleton row if missing). */
export const getAutopilotSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AutopilotSettings & { queueDepth: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let { data } = await supabaseAdmin
      .from("autopilot_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (!data) {
      const { data: created, error } = await supabaseAdmin
        .from("autopilot_settings")
        .insert({ enabled: false } as never)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      data = created;
    }
    const { count } = await supabaseAdmin
      .from("social_posts")
      .select("id", { count: "exact", head: true })
      .eq("status", "scheduled")
      .gte("scheduled_for", new Date().toISOString());
    return { ...(data as unknown as AutopilotSettings), queueDepth: count ?? 0 };
  });

/** Update autopilot settings. */
export const saveAutopilotSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id: string;
      enabled?: boolean;
      cadence_per_week?: number;
      min_queue?: number;
      batch_size?: number;
      theme?: string | null;
      platform?: string;
      voice_profile_id?: string | null;
      campaign_id?: string | null;
    }) => {
      if (!data?.id) throw new Error("id gerekli");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (typeof data.enabled === "boolean") patch.enabled = data.enabled;
    if (data.cadence_per_week != null) patch.cadence_per_week = Math.min(Math.max(Number(data.cadence_per_week), 1), 30);
    if (data.min_queue != null) patch.min_queue = Math.min(Math.max(Number(data.min_queue), 1), 30);
    if (data.batch_size != null) patch.batch_size = Math.min(Math.max(Number(data.batch_size), 1), 10);
    if (data.theme !== undefined) patch.theme = data.theme?.trim() || null;
    if (data.platform && ["facebook", "instagram", "both"].includes(data.platform)) patch.platform = data.platform;
    if (data.voice_profile_id !== undefined) patch.voice_profile_id = data.voice_profile_id || null;
    if (data.campaign_id !== undefined) patch.campaign_id = data.campaign_id || null;
    const { error } = await supabaseAdmin.from("autopilot_settings").update(patch as never).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Run the autopilot queue-fill immediately (manual trigger). */
export const runAutopilotNow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { runAutopilot } = await import("@/lib/social.server");
    return runAutopilot({ force: true });
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 4 — Approval Workflow
// ────────────────────────────────────────────────────────────────────────────

/** List posts awaiting review (with signed media urls), oldest first. */
export const listPendingReview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SocialPost[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("social_posts")
      .select("*")
      .eq("status", "pending_review")
      .order("scheduled_for", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: true })
      .limit(100);
    if (error) throw new Error(error.message);
    return withSignedUrls(supabaseAdmin, (data ?? []) as unknown as RawPost[]);
  });

/** Send a draft into the review queue. */
export const submitForReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("social_posts")
      .update({ status: "pending_review", reviewed_by: null, reviewed_at: null, review_note: null } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    await writeLog(supabaseAdmin, data.id, "review", "info", "Onaya gönderildi");
    return { ok: true };
  });

/**
 * Approve a post. If it has a future scheduled time it returns to `scheduled`
 * (cron publishes at that time); otherwise it becomes `approved` for the next
 * cron run to publish immediately.
 */
export const approvePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; note?: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id, note: data.note?.slice(0, 500) ?? "" };
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { userId } = context as { userId: string };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("social_posts")
      .select("scheduled_for")
      .eq("id", data.id)
      .maybeSingle();
    const scheduledFor = (row as { scheduled_for?: string | null } | null)?.scheduled_for ?? null;
    const future = scheduledFor && new Date(scheduledFor).getTime() > Date.now();
    const { error } = await supabaseAdmin
      .from("social_posts")
      .update({
        status: future ? "scheduled" : "approved",
        // Approved-now posts get a due timestamp so the publish cron picks them up.
        scheduled_for: future ? scheduledFor : new Date().toISOString(),
        reviewed_by: userId,
        reviewed_at: new Date().toISOString(),
        review_note: data.note || null,
      } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    await writeLog(supabaseAdmin, data.id, "review", "info", "Gönderi onaylandı");
    return { ok: true };
  });

/** Reject a post with a reviewer note. */
export const rejectPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; note?: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id, note: data.note?.slice(0, 500) ?? "" };
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { userId } = context as { userId: string };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("social_posts")
      .update({
        status: "rejected",
        reviewed_by: userId,
        reviewed_at: new Date().toISOString(),
        review_note: data.note || null,
      } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    await writeLog(supabaseAdmin, data.id, "review", "warn", `Gönderi reddedildi${data.note ? `: ${data.note}` : ""}`);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 5 — Media Library & Asset Control
// ────────────────────────────────────────────────────────────────────────────

export type MediaAsset = {
  id: string;
  path: string;
  name: string;
  alt_text: string | null;
  tags: string[];
  source: "upload" | "ai" | string;
  mime_type: string;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  usage_count: number;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  url: string | null;
};

type RawAsset = Omit<MediaAsset, "url">;

async function withAssetUrls(admin: AdminClient, rows: RawAsset[]): Promise<MediaAsset[]> {
  return Promise.all(
    rows.map(async (r) => ({ ...r, url: await signOne(admin, r.path) })),
  );
}

/** List all library assets, newest first. */
export const listMediaAssets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MediaAsset[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("media_assets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw new Error(error.message);
    return withAssetUrls(supabaseAdmin, (data ?? []) as unknown as RawAsset[]);
  });

/** Upload a base64 image into the library. */
export const uploadMediaAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: { dataUrl: string; name?: string; mimeType?: string; tags?: string[]; altText?: string }) => {
      if (!data?.dataUrl) throw new Error("Dosya verisi gerekli");
      return {
        dataUrl: data.dataUrl,
        name: data.name?.slice(0, 120) || "Görsel",
        mimeType: data.mimeType || "image/png",
        tags: Array.isArray(data.tags) ? data.tags.slice(0, 20).map((t) => String(t).slice(0, 40)) : [],
        altText: data.altText?.slice(0, 300) ?? null,
      };
    },
  )
  .handler(async ({ context, data }): Promise<MediaAsset> => {
    await assertAdmin(context);
    const { userId } = context as { userId: string };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const base64 = data.dataUrl.includes(",") ? data.dataUrl.split(",")[1] : data.dataUrl;
    const bytes = Uint8Array.from(Buffer.from(base64, "base64"));
    if (bytes.byteLength > 8 * 1024 * 1024) throw new Error("Görsel 8MB'den büyük olamaz");

    const ext = (data.mimeType.split("/")[1] || "png").replace(/[^a-z0-9]/gi, "") || "png";
    const path = `library/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: data.mimeType, upsert: true });
    if (upErr) throw new Error(`Yüklenemedi: ${upErr.message}`);

    const { data: inserted, error } = await supabaseAdmin
      .from("media_assets")
      .insert({
        path,
        name: data.name,
        alt_text: data.altText,
        tags: data.tags,
        source: "upload",
        mime_type: data.mimeType,
        size_bytes: bytes.byteLength,
        created_by: userId,
      } as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    const [withUrl] = await withAssetUrls(supabaseAdmin, [inserted as unknown as RawAsset]);
    return withUrl;
  });

/** Generate an AI image straight into the library. */
export const generateMediaAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { prompt: string; name?: string; tags?: string[] }) => {
    if (!data?.prompt?.trim()) throw new Error("Görsel açıklaması gerekli");
    return {
      prompt: data.prompt.slice(0, 600),
      name: data.name?.slice(0, 120) || data.prompt.slice(0, 60),
      tags: Array.isArray(data.tags) ? data.tags.slice(0, 20).map((t) => String(t).slice(0, 40)) : [],
    };
  })
  .handler(async ({ context, data }): Promise<MediaAsset> => {
    await assertAdmin(context);
    const { userId } = context as { userId: string };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateImageAI } = await import("@/lib/social.server");

    const bytes = await generateImageAI(data.prompt);
    const path = `library/${crypto.randomUUID()}.png`;
    const { error: upErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: "image/png", upsert: true });
    if (upErr) throw new Error(`Yüklenemedi: ${upErr.message}`);

    const { data: inserted, error } = await supabaseAdmin
      .from("media_assets")
      .insert({
        path,
        name: data.name,
        tags: data.tags,
        source: "ai",
        mime_type: "image/png",
        size_bytes: bytes.byteLength,
        created_by: userId,
      } as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await writeLog(supabaseAdmin, null, "media", "info", "Kütüphaneye AI görseli üretildi");
    const [withUrl] = await withAssetUrls(supabaseAdmin, [inserted as unknown as RawAsset]);
    return withUrl;
  });

/** Update an asset's name, alt text or tags. */
export const updateMediaAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; name?: string; altText?: string | null; tags?: string[] }) => {
    if (!data?.id) throw new Error("id gerekli");
    return {
      id: data.id,
      name: data.name?.slice(0, 120),
      altText: data.altText === undefined ? undefined : (data.altText?.slice(0, 300) ?? null),
      tags: Array.isArray(data.tags) ? data.tags.slice(0, 20).map((t) => String(t).slice(0, 40)) : undefined,
    };
  })
  .handler(async ({ context, data }): Promise<MediaAsset> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (data.name !== undefined) patch.name = data.name;
    if (data.altText !== undefined) patch.alt_text = data.altText;
    if (data.tags !== undefined) patch.tags = data.tags;
    const { data: updated, error } = await supabaseAdmin
      .from("media_assets")
      .update(patch as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    const [withUrl] = await withAssetUrls(supabaseAdmin, [updated as unknown as RawAsset]);
    return withUrl;
  });

/** Delete a library asset (removes the stored file too). */
export const deleteMediaAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing } = await supabaseAdmin
      .from("media_assets")
      .select("path")
      .eq("id", data.id)
      .single();
    const path = (existing as { path: string } | null)?.path;
    const { error } = await supabaseAdmin.from("media_assets").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (path && !/^https?:\/\//i.test(path)) {
      await supabaseAdmin.storage.from(BUCKET).remove([path]).catch(() => undefined);
    }
    return { ok: true };
  });

/** Attach a library asset to a post and bump its usage count. */
export const attachLibraryAssetToPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { postId: string; assetId: string }) => {
    if (!data?.postId || !data?.assetId) throw new Error("postId ve assetId gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: asset } = await supabaseAdmin
      .from("media_assets")
      .select("id, path, usage_count")
      .eq("id", data.assetId)
      .single();
    const a = asset as { id: string; path: string; usage_count: number } | null;
    if (!a) throw new Error("Görsel bulunamadı");

    const { data: existing } = await supabaseAdmin
      .from("social_posts")
      .select("image_path, media_paths")
      .eq("id", data.postId)
      .single();
    const prev = existing as { image_path: string | null; media_paths: string[] | null } | null;
    if (!prev) throw new Error("Gönderi bulunamadı");

    const current = prev.media_paths?.length ? prev.media_paths : prev.image_path ? [prev.image_path] : [];
    if (current.includes(a.path)) throw new Error("Bu görsel zaten ekli");
    const media_paths = [...current, a.path].slice(0, 10);

    const { data: updated, error } = await supabaseAdmin
      .from("social_posts")
      .update({
        media_paths,
        image_path: prev.image_path || a.path,
        media_type: media_paths.length > 1 ? "carousel" : "image",
      } as never)
      .eq("id", data.postId)
      .select("*")
      .single();
    if (error) throw new Error(error.message);

    await supabaseAdmin
      .from("media_assets")
      .update({ usage_count: (a.usage_count ?? 0) + 1 } as never)
      .eq("id", a.id);

    await writeLog(supabaseAdmin, data.postId, "media", "info", "Kütüphaneden görsel eklendi");
    const [withUrl] = await withSignedUrls(supabaseAdmin, [updated as unknown as RawPost]);
    return withUrl;
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 6 — Multi-Platform Expansion
// ────────────────────────────────────────────────────────────────────────────

export type ProviderStatus = {
  id: string;
  label: string;
  kind: "live" | "soon";
  configured: boolean;
  detail: string;
};

/** List publishing providers and whether each is configured. */
export const getPublishProviders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ProviderStatus[]> => {
    await assertAdmin(context);
    const { getProviderStatuses } = await import("@/lib/social.server");
    return getProviderStatuses() as unknown as ProviderStatus[];
  });

/** Generate platform-tailored caption/hashtag variants for a post. */
export const generatePostVariants = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; platforms?: string[] }) => {
    if (!data?.id) throw new Error("id gerekli");
    const allowed = ["facebook", "instagram", "google_business", "x", "linkedin", "tiktok"];
    const platforms = Array.isArray(data.platforms)
      ? data.platforms.filter((p) => allowed.includes(p))
      : [];
    return { id: data.id, platforms };
  })
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generatePlatformVariantsAI, loadBrandProfile } = await import("@/lib/social.server");

    const { data: existing } = await supabaseAdmin
      .from("social_posts")
      .select("id, idea, caption, hashtags, platform_variants")
      .eq("id", data.id)
      .single();
    const prev = existing as
      | { idea: string | null; caption: string; hashtags: string | null; platform_variants: Record<string, unknown> | null }
      | null;
    if (!prev) throw new Error("Gönderi bulunamadı");

    const targets = (data.platforms.length ? data.platforms : ["facebook", "instagram"]) as (
      | "facebook"
      | "instagram"
      | "google_business"
      | "x"
      | "linkedin"
      | "tiktok"
    )[];
    const brand = await loadBrandProfile();
    const variants = await generatePlatformVariantsAI(
      { idea: prev.idea || prev.caption, caption: prev.caption, hashtags: prev.hashtags, platforms: targets },
      brand,
    );
    const merged = { ...(prev.platform_variants ?? {}), ...variants };

    const { data: updated, error } = await supabaseAdmin
      .from("social_posts")
      .update({ platform_variants: merged } as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await writeLog(supabaseAdmin, data.id, "variants", "info", `${Object.keys(variants).length} platform varyantı üretildi`);
    const [withUrl] = await withSignedUrls(supabaseAdmin, [updated as unknown as RawPost]);
    return withUrl;
  });

/** Manually edit (or clear) a single platform variant. */
export const savePostVariant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; platform: string; caption: string; hashtags?: string }) => {
    if (!data?.id || !data?.platform) throw new Error("id ve platform gerekli");
    return {
      id: data.id,
      platform: data.platform,
      caption: data.caption?.slice(0, 3000) ?? "",
      hashtags: data.hashtags?.slice(0, 600) ?? "",
    };
  })
  .handler(async ({ context, data }): Promise<SocialPost> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing } = await supabaseAdmin
      .from("social_posts")
      .select("platform_variants")
      .eq("id", data.id)
      .single();
    const prev = (existing as { platform_variants: Record<string, unknown> | null } | null)?.platform_variants ?? {};
    const next = { ...prev } as Record<string, unknown>;
    if (!data.caption.trim()) {
      delete next[data.platform];
    } else {
      next[data.platform] = { caption: data.caption.trim(), hashtags: data.hashtags.trim() };
    }
    const { data: updated, error } = await supabaseAdmin
      .from("social_posts")
      .update({ platform_variants: next } as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    const [withUrl] = await withSignedUrls(supabaseAdmin, [updated as unknown as RawPost]);
    return withUrl;
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 7: Advanced Analytics & Insights
// Turn stored snapshots into trends, breakdowns, and actionable auto-insights.
// ────────────────────────────────────────────────────────────────────────────

export type TrendPoint = { date: string; engagement: number; reach: number; posts: number };
export type Breakdown = { key: string; label: string; engagement: number; reach: number; posts: number; avg: number };
export type AutoInsight = { kind: "format" | "time" | "day" | "persona" | "campaign" | "trend"; text: string; tone: "good" | "info" | "warn" };

export type InsightsReport = {
  totals: { posts: number; engagement: number; reach: number; likes: number; comments: number; shares: number; avgEngagement: number };
  trend: TrendPoint[];
  byFormat: Breakdown[];
  byHour: Breakdown[];
  byDay: Breakdown[];
  byPersona: Breakdown[];
  byCampaign: Breakdown[];
  insights: AutoInsight[];
};

const TR_MEDIA: Record<string, string> = { image: "Görsel", carousel: "Kaydırmalı", video: "Video", reels: "Reels" };
const TR_DAYS = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

/** Compute trend dashboards, breakdowns, and auto-insights from stored snapshots. */
export const getInsights = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<InsightsReport> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: posts }, { data: profiles }, { data: campaigns }] = await Promise.all([
      supabaseAdmin
        .from("social_posts")
        .select("id, idea, media_type, posted_at, voice_profile_id, campaign_id, analytics")
        .eq("status", "posted")
        .not("posted_at", "is", null)
        .order("posted_at", { ascending: true })
        .limit(500),
      supabaseAdmin.from("voice_profiles").select("id, name"),
      supabaseAdmin.from("campaigns").select("id, name"),
    ]);

    const personaName = new Map<string, string>(
      ((profiles ?? []) as Array<{ id: string; name: string }>).map((p) => [p.id, p.name]),
    );
    const campaignName = new Map<string, string>(
      ((campaigns ?? []) as Array<{ id: string; name: string }>).map((c) => [c.id, c.name]),
    );

    type Row = {
      id: string;
      idea: string | null;
      media_type: string | null;
      posted_at: string | null;
      voice_profile_id: string | null;
      campaign_id: string | null;
      analytics: Record<string, number> | null;
    };
    const rows = (posts ?? []) as Row[];

    const totals = { posts: 0, engagement: 0, reach: 0, likes: 0, comments: 0, shares: 0, avgEngagement: 0 };
    const trendMap = new Map<string, TrendPoint>();
    const acc = (m: Map<string, Breakdown>, key: string, label: string, eng: number, reach: number) => {
      const cur = m.get(key) ?? { key, label, engagement: 0, reach: 0, posts: 0, avg: 0 };
      cur.engagement += eng;
      cur.reach += reach;
      cur.posts += 1;
      m.set(key, cur);
    };
    const fmtMap = new Map<string, Breakdown>();
    const hourMap = new Map<string, Breakdown>();
    const dayMap = new Map<string, Breakdown>();
    const personaMap = new Map<string, Breakdown>();
    const campaignMap = new Map<string, Breakdown>();

    for (const r of rows) {
      const a = r.analytics ?? {};
      const eng = a.engagement ?? (a.likes ?? 0) + (a.comments ?? 0) + (a.shares ?? 0);
      const reach = a.reach ?? 0;
      totals.posts += 1;
      totals.engagement += eng;
      totals.reach += reach;
      totals.likes += a.likes ?? 0;
      totals.comments += a.comments ?? 0;
      totals.shares += a.shares ?? 0;

      if (r.posted_at) {
        const d = new Date(r.posted_at);
        const day = d.toISOString().slice(0, 10);
        const tp = trendMap.get(day) ?? { date: day, engagement: 0, reach: 0, posts: 0 };
        tp.engagement += eng;
        tp.reach += reach;
        tp.posts += 1;
        trendMap.set(day, tp);

        const h = d.getHours();
        acc(hourMap, String(h).padStart(2, "0"), `${String(h).padStart(2, "0")}:00`, eng, reach);
        acc(dayMap, String(d.getDay()), TR_DAYS[d.getDay()], eng, reach);
      }
      const mt = r.media_type ?? "image";
      acc(fmtMap, mt, TR_MEDIA[mt] ?? mt, eng, reach);
      if (r.voice_profile_id) acc(personaMap, r.voice_profile_id, personaName.get(r.voice_profile_id) ?? "Persona", eng, reach);
      if (r.campaign_id) acc(campaignMap, r.campaign_id, campaignName.get(r.campaign_id) ?? "Kampanya", eng, reach);
    }
    totals.avgEngagement = totals.posts ? Math.round(totals.engagement / totals.posts) : 0;

    const finalize = (m: Map<string, Breakdown>, sortByAvg = true): Breakdown[] =>
      Array.from(m.values())
        .map((b) => ({ ...b, avg: b.posts ? Math.round(b.engagement / b.posts) : 0 }))
        .sort((x, y) => (sortByAvg ? y.avg - x.avg : y.engagement - x.engagement));

    const trend = Array.from(trendMap.values()).sort((a, b) => a.date.localeCompare(b.date));
    const byFormat = finalize(fmtMap);
    const byHour = finalize(hourMap);
    const byDay = finalize(dayMap);
    const byPersona = finalize(personaMap);
    const byCampaign = finalize(campaignMap);

    // ── Auto-insights ──────────────────────────────────────────────────────
    const insights: AutoInsight[] = [];
    if (totals.posts === 0) {
      insights.push({ kind: "trend", tone: "info", text: "Henüz yayınlanmış gönderi yok. Yayınlayıp 'Meta'dan Güncelle' ile istatistik çek." });
    } else {
      if (byFormat.length >= 2 && byFormat[0].avg > 0) {
        const top = byFormat[0];
        const next = byFormat[1];
        if (next.avg > 0) {
          const mult = (top.avg / next.avg).toFixed(1);
          insights.push({ kind: "format", tone: "good", text: `${top.label} biçimi ${next.label} biçimine göre ${mult}x daha fazla etkileşim alıyor.` });
        } else {
          insights.push({ kind: "format", tone: "good", text: `En iyi performans gösteren biçim: ${top.label} (ort. ${top.avg} etkileşim).` });
        }
      }
      if (byHour.length && byHour[0].posts >= 2) {
        insights.push({ kind: "time", tone: "good", text: `En iyi yayın saatin ${byHour[0].label} (ort. ${byHour[0].avg} etkileşim).` });
      }
      if (byDay.length && byDay[0].posts >= 2) {
        insights.push({ kind: "day", tone: "good", text: `${byDay[0].label} günleri en yüksek etkileşimi getiriyor.` });
      }
      if (byPersona.length >= 1 && byPersona[0].avg > 0) {
        insights.push({ kind: "persona", tone: "info", text: `"${byPersona[0].label}" personası ortalama ${byPersona[0].avg} etkileşim ile öne çıkıyor.` });
      }
      if (byCampaign.length >= 1) {
        insights.push({ kind: "campaign", tone: "info", text: `En çok etkileşim alan kampanya: "${byCampaign[0].label}" (toplam ${byCampaign[0].engagement.toLocaleString("tr-TR")}).` });
      }
      // Trend direction: compare last 3 vs previous 3 days of activity
      if (trend.length >= 4) {
        const recent = trend.slice(-3);
        const prior = trend.slice(-6, -3);
        const rAvg = recent.reduce((s, t) => s + t.engagement, 0) / (recent.length || 1);
        const pAvg = prior.length ? prior.reduce((s, t) => s + t.engagement, 0) / prior.length : 0;
        if (pAvg > 0) {
          const pct = Math.round(((rAvg - pAvg) / pAvg) * 100);
          if (pct >= 10) insights.push({ kind: "trend", tone: "good", text: `Son günlerde etkileşim %${pct} arttı — momentum yakaladın.` });
          else if (pct <= -10) insights.push({ kind: "trend", tone: "warn", text: `Son günlerde etkileşim %${Math.abs(pct)} düştü — içerik biçimini/saatini gözden geçir.` });
        }
      }
    }

    return { totals, trend, byFormat, byHour, byDay, byPersona, byCampaign, insights };
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 8: Unified Inbox & AI Engagement
// Aggregated comment/DM conversations with AI-suggested replies.
// ────────────────────────────────────────────────────────────────────────────

export type Conversation = {
  id: string;
  platform: string;
  channel: "comment" | "message";
  participant_id: string;
  participant_name: string | null;
  last_message_at: string;
  last_message_preview: string | null;
  last_direction: string;
  status: "open" | "handled";
  sentiment: "positive" | "neutral" | "negative" | null;
  intent: string | null;
  is_lead: boolean;
  escalated: boolean;
  unread_count: number;
  created_at: string;
};

export type ConversationMessage = {
  id: string;
  conversation_id: string;
  direction: "inbound" | "outbound";
  body: string;
  author: string | null;
  created_at: string;
};

export type InboxFilter = "all" | "open" | "handled" | "escalated" | "leads";

export const listConversations = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data?: { filter?: InboxFilter }) => ({ filter: data?.filter ?? "all" }))
  .handler(async ({ context, data }): Promise<{ conversations: Conversation[]; counts: Record<string, number> }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let q = supabaseAdmin
      .from("conversations")
      .select("*")
      .order("last_message_at", { ascending: false })
      .limit(200);
    if (data.filter === "open") q = q.eq("status", "open");
    else if (data.filter === "handled") q = q.eq("status", "handled");
    else if (data.filter === "escalated") q = q.eq("escalated", true);
    else if (data.filter === "leads") q = q.eq("is_lead", true);

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    const conversations = (rows ?? []) as unknown as Conversation[];

    const { data: allRows } = await supabaseAdmin
      .from("conversations")
      .select("status, escalated, is_lead, unread_count");
    const all = (allRows ?? []) as Array<{ status: string; escalated: boolean; is_lead: boolean; unread_count: number }>;
    const counts = {
      all: all.length,
      open: all.filter((r) => r.status === "open").length,
      handled: all.filter((r) => r.status === "handled").length,
      escalated: all.filter((r) => r.escalated).length,
      leads: all.filter((r) => r.is_lead).length,
      unread: all.reduce((s, r) => s + (r.unread_count ?? 0), 0),
    };
    return { conversations, counts };
  });

export const getConversation = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<{ conversation: Conversation; messages: ConversationMessage[] }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Mark read on open
    await supabaseAdmin.from("conversations").update({ unread_count: 0 } as never).eq("id", data.id);

    const { data: convo, error } = await supabaseAdmin
      .from("conversations")
      .select("*")
      .eq("id", data.id)
      .single();
    if (error) throw new Error(error.message);

    const { data: msgs } = await supabaseAdmin
      .from("conversation_messages")
      .select("id, conversation_id, direction, body, author, created_at")
      .eq("conversation_id", data.id)
      .order("created_at", { ascending: true });

    return {
      conversation: convo as unknown as Conversation,
      messages: (msgs ?? []) as unknown as ConversationMessage[],
    };
  });

export const suggestConversationReply = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<{ suggestion: string }> => {
    await assertAdmin(context);
    const { suggestConversationReplyServer } = await import("@/lib/social.server");
    return { suggestion: await suggestConversationReplyServer(data.id) };
  });

export const sendConversationReply = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; text: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    if (!data?.text?.trim()) throw new Error("Mesaj boş olamaz");
    return { id: data.id, text: data.text.slice(0, 2000) };
  })
  .handler(async ({ context, data }): Promise<{ conversation: Conversation; messages: ConversationMessage[] }> => {
    await assertAdmin(context);
    const { sendConversationReplyServer } = await import("@/lib/social.server");
    await sendConversationReplyServer(data.id, data.text);
    return getConversation({ data: { id: data.id } });
  });

export const updateConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status?: "open" | "handled"; is_lead?: boolean; escalated?: boolean }) => {
    if (!data?.id) throw new Error("id gerekli");
    return data;
  })
  .handler(async ({ context, data }): Promise<Conversation> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (data.status !== undefined) patch.status = data.status;
    if (data.is_lead !== undefined) patch.is_lead = data.is_lead;
    if (data.escalated !== undefined) patch.escalated = data.escalated;
    if (data.status === "handled") patch.unread_count = 0;
    const { data: updated, error } = await supabaseAdmin
      .from("conversations")
      .update(patch as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return updated as unknown as Conversation;
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 9: A/B Testing & Optimization
// Generate competing caption variants for one idea, publish & track winners.
// ────────────────────────────────────────────────────────────────────────────

export type ExperimentVariant = {
  id: string;
  label: string;
  is_control: boolean;
  post_id: string | null;
  post: SocialPost | null;
  engagement: number;
};

export type Experiment = {
  id: string;
  name: string;
  hypothesis: string | null;
  status: "running" | "completed";
  base_idea: string | null;
  metric: string;
  winner_post_id: string | null;
  created_at: string;
  updated_at: string;
  variants: ExperimentVariant[];
};

/** List all experiments with their variants, posts, and engagement scores. */
export const listExperiments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<Experiment[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: exps, error: eErr }, { data: vars }, { data: analytics }] = await Promise.all([
      supabaseAdmin.from("experiments").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("experiment_variants").select("*").order("created_at", { ascending: true }),
      supabaseAdmin.from("post_analytics").select("post_id, engagement"),
    ]);
    if (eErr) throw new Error(eErr.message);

    const variantRows = (vars ?? []) as {
      id: string;
      experiment_id: string;
      post_id: string | null;
      label: string;
      is_control: boolean;
    }[];

    const engByPost = new Map<string, number>();
    for (const a of (analytics ?? []) as { post_id: string; engagement: number | null }[]) {
      engByPost.set(a.post_id, (engByPost.get(a.post_id) ?? 0) + (a.engagement ?? 0));
    }

    const postIds = Array.from(new Set(variantRows.map((v) => v.post_id).filter(Boolean))) as string[];
    let postsById = new Map<string, SocialPost>();
    if (postIds.length) {
      const { data: posts } = await supabaseAdmin.from("social_posts").select("*").in("id", postIds);
      const signed = await withSignedUrls(supabaseAdmin, (posts ?? []) as unknown as RawPost[]);
      postsById = new Map(signed.map((p) => [p.id, p]));
    }

    return ((exps ?? []) as unknown as Omit<Experiment, "variants">[]).map((e) => ({
      ...e,
      variants: variantRows
        .filter((v) => v.experiment_id === e.id)
        .map((v) => ({
          id: v.id,
          label: v.label,
          is_control: v.is_control,
          post_id: v.post_id,
          post: v.post_id ? postsById.get(v.post_id) ?? null : null,
          engagement: v.post_id ? engByPost.get(v.post_id) ?? 0 : 0,
        })),
    }));
  });

/**
 * Create an A/B experiment: generate N caption variants for one idea (sharing a
 * single AI image), insert them as draft posts, and record the experiment.
 */
export const createExperiment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      name?: string;
      idea?: string;
      hypothesis?: string;
      variantCount?: number;
      platform?: string;
      voiceProfileId?: string | null;
      campaignId?: string | null;
      withImage?: boolean;
    }) => ({
      name: typeof data?.name === "string" && data.name.trim() ? data.name.trim().slice(0, 160) : "",
      idea: typeof data?.idea === "string" ? data.idea.slice(0, 300) : "",
      hypothesis: typeof data?.hypothesis === "string" ? data.hypothesis.slice(0, 500) : "",
      variantCount: Math.min(Math.max(Number(data?.variantCount) || 2, 2), 4),
      platform: ["facebook", "instagram", "both"].includes(data?.platform ?? "")
        ? (data!.platform as string)
        : "both",
      voiceProfileId: typeof data?.voiceProfileId === "string" ? data.voiceProfileId : null,
      campaignId: typeof data?.campaignId === "string" ? data.campaignId : null,
      withImage: data?.withImage !== false,
    }),
  )
  .handler(async ({ context, data }): Promise<Experiment> => {
    await assertAdmin(context);
    if (!data.name) throw new Error("Deney adı gerekli");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateCaptionVariantsAI, generateImageAI, loadBrandProfile, loadVoiceProfile, generateContentAI } =
      await import("@/lib/social.server");

    const brand = await loadBrandProfile();
    const persona = await loadVoiceProfile(data.voiceProfileId);

    let idea = data.idea.trim();
    let imagePrompt = "";
    if (!idea || data.withImage) {
      const content = await generateContentAI(idea || undefined, brand, persona);
      if (!idea) idea = content.idea;
      imagePrompt = content.imagePrompt;
    }

    let sharedPath: string | null = null;
    if (data.withImage) {
      const bytes = await generateImageAI(imagePrompt || idea);
      const path = `posts/${crypto.randomUUID()}.png`;
      const { error: upErr } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(path, bytes, { contentType: "image/png", upsert: true });
      if (upErr) throw new Error(`Görsel yüklenemedi: ${upErr.message}`);
      sharedPath = path;
    }

    const variants = await generateCaptionVariantsAI({ idea, count: data.variantCount }, brand, persona);

    const { data: expRow, error: expErr } = await supabaseAdmin
      .from("experiments")
      .insert({
        name: data.name,
        hypothesis: data.hypothesis || null,
        base_idea: idea,
        status: "running",
        metric: "engagement",
      } as never)
      .select("*")
      .single();
    if (expErr) throw new Error(expErr.message);
    const experimentId = (expRow as { id: string }).id;

    const labels = ["A", "B", "C", "D"];
    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      const { data: post, error: pErr } = await supabaseAdmin
        .from("social_posts")
        .insert({
          platform: data.platform,
          idea,
          caption: v.caption,
          hashtags: v.hashtags,
          image_path: sharedPath,
          media_paths: sharedPath ? [sharedPath] : [],
          status: "draft",
          voice_profile_id: persona?.id ?? null,
          campaign_id: data.campaignId,
        } as never)
        .select("id")
        .single();
      if (pErr) throw new Error(pErr.message);
      const postId = (post as { id: string }).id;
      await supabaseAdmin.from("experiment_variants").insert({
        experiment_id: experimentId,
        post_id: postId,
        label: labels[i] ?? `V${i + 1}`,
        is_control: i === 0,
      } as never);
      await writeLog(supabaseAdmin, postId, "experiment", "info", `A/B varyantı ${labels[i] ?? i + 1} oluşturuldu`);
    }

    const list = await listExperiments();
    const created = list.find((e) => e.id === experimentId);
    if (!created) throw new Error("Deney oluşturuldu ancak yüklenemedi");
    return created;
  });

/**
 * Mark an experiment complete and record its winning post. Optionally promote
 * the winning caption into a voice profile's sample phrases (opt-in learning).
 */
export const completeExperiment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; winnerPostId: string; promoteToVoiceProfileId?: string | null }) => {
    if (!data?.id) throw new Error("id gerekli");
    if (!data?.winnerPostId) throw new Error("Kazanan gönderi gerekli");
    return {
      id: data.id,
      winnerPostId: data.winnerPostId,
      promoteToVoiceProfileId:
        typeof data.promoteToVoiceProfileId === "string" ? data.promoteToVoiceProfileId : null,
    };
  })
  .handler(async ({ context, data }): Promise<Experiment> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin
      .from("experiments")
      .update({ status: "completed", winner_post_id: data.winnerPostId } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    if (data.promoteToVoiceProfileId) {
      const { data: winner } = await supabaseAdmin
        .from("social_posts")
        .select("caption")
        .eq("id", data.winnerPostId)
        .maybeSingle();
      const caption = (winner as { caption?: string } | null)?.caption?.trim();
      if (caption) {
        const { data: vp } = await supabaseAdmin
          .from("voice_profiles")
          .select("sample_phrases")
          .eq("id", data.promoteToVoiceProfileId)
          .maybeSingle();
        const prev = (vp as { sample_phrases?: string | null } | null)?.sample_phrases ?? "";
        const snippet = caption.slice(0, 200);
        const next = prev ? `${prev}\n${snippet}` : snippet;
        await supabaseAdmin
          .from("voice_profiles")
          .update({ sample_phrases: next.slice(0, 2000) } as never)
          .eq("id", data.promoteToVoiceProfileId);
      }
    }

    const list = await listExperiments();
    const updated = list.find((e) => e.id === data.id);
    if (!updated) throw new Error("Deney bulunamadı");
    return updated;
  });

/** Reopen a completed experiment for further testing. */
export const reopenExperiment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<Experiment> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("experiments")
      .update({ status: "running", winner_post_id: null } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    const list = await listExperiments();
    const updated = list.find((e) => e.id === data.id);
    if (!updated) throw new Error("Deney bulunamadı");
    return updated;
  });

/** Delete an experiment. Its draft variant posts (never published) are removed too. */
export const deleteExperiment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: vars } = await supabaseAdmin
      .from("experiment_variants")
      .select("post_id")
      .eq("experiment_id", data.id);
    const postIds = ((vars ?? []) as { post_id: string | null }[]).map((v) => v.post_id).filter(Boolean) as string[];
    if (postIds.length) {
      await supabaseAdmin.from("social_posts").delete().in("id", postIds).eq("status", "draft");
    }
    const { error } = await supabaseAdmin.from("experiments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ────────────────────────────────────────────────────────────────────────────
// Phase 10: Automation Rules Engine, Alerts & Audit
// ────────────────────────────────────────────────────────────────────────────

export type AutomationSettings = {
  id: string;
  master_enabled: boolean;
  email_alerts: boolean;
  alert_email: string | null;
};

export type AutomationRule = {
  id: string;
  name: string;
  trigger: string;
  threshold: number;
  action: string;
  action_param: string | null;
  active: boolean;
  last_triggered_at: string | null;
  trigger_count: number;
  created_at: string;
  updated_at: string;
};

export type AutomationAlert = {
  id: string;
  rule_id: string | null;
  severity: "info" | "warn" | "critical";
  title: string;
  body: string | null;
  read: boolean;
  created_at: string;
};

export type AuditEntry = {
  id: string;
  actor: string;
  action: string;
  entity: string | null;
  entity_id: string | null;
  detail: string | null;
  created_at: string;
};

/** Load (or create) the singleton automation settings. */
export const getAutomationSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AutomationSettings> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("automation_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (data) return data as unknown as AutomationSettings;
    const { data: created, error } = await supabaseAdmin
      .from("automation_settings")
      .insert({ master_enabled: true } as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return created as unknown as AutomationSettings;
  });

/** Update automation settings (kill-switch + email alerts). */
export const saveAutomationSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; master_enabled: boolean; email_alerts: boolean; alert_email?: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return {
      id: data.id,
      master_enabled: Boolean(data.master_enabled),
      email_alerts: Boolean(data.email_alerts),
      alert_email: typeof data.alert_email === "string" ? data.alert_email.slice(0, 200) : null,
    };
  })
  .handler(async ({ context, data }): Promise<AutomationSettings> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { writeAudit } = await import("@/lib/social.server");
    const { data: updated, error } = await supabaseAdmin
      .from("automation_settings")
      .update({
        master_enabled: data.master_enabled,
        email_alerts: data.email_alerts,
        alert_email: data.alert_email,
      } as never)
      .eq("id", data.id)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await writeAudit(
      context.userId,
      data.master_enabled ? "automation_enabled" : "automation_halted",
      "settings",
      data.id,
      data.master_enabled ? "Otomasyon ana şalteri açıldı" : "Otomasyon ana şalteri kapatıldı (acil durdurma)",
    );
    return updated as unknown as AutomationSettings;
  });

/** List all automation rules. */
export const listAutomationRules = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AutomationRule[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("automation_rules")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as AutomationRule[];
  });

/** Create or update an automation rule. */
export const saveAutomationRule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      name?: string;
      trigger?: string;
      threshold?: number;
      action?: string;
      action_param?: string;
      active?: boolean;
    }) => {
      const triggers = ["failed_publish", "low_engagement", "negative_comment", "milestone"];
      const actions = ["notify", "pause_autopilot"];
      if (!data?.name?.trim()) throw new Error("Kural adı gerekli");
      return {
        id: typeof data.id === "string" ? data.id : null,
        name: data.name.trim().slice(0, 160),
        trigger: triggers.includes(data.trigger ?? "") ? (data.trigger as string) : "failed_publish",
        threshold: Math.max(Number(data.threshold) || 0, 0),
        action: actions.includes(data.action ?? "") ? (data.action as string) : "notify",
        action_param: typeof data.action_param === "string" ? data.action_param.slice(0, 200) : null,
        active: data.active !== false,
      };
    },
  )
  .handler(async ({ context, data }): Promise<AutomationRule> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { writeAudit } = await import("@/lib/social.server");
    const row = {
      name: data.name,
      trigger: data.trigger,
      threshold: data.threshold,
      action: data.action,
      action_param: data.action_param,
      active: data.active,
    };
    if (data.id) {
      const { data: updated, error } = await supabaseAdmin
        .from("automation_rules")
        .update(row as never)
        .eq("id", data.id)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      await writeAudit(context.userId, "rule_updated", "rule", data.id, data.name);
      return updated as unknown as AutomationRule;
    }
    const { data: created, error } = await supabaseAdmin
      .from("automation_rules")
      .insert(row as never)
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    await writeAudit(context.userId, "rule_created", "rule", (created as { id: string }).id, data.name);
    return created as unknown as AutomationRule;
  });

/** Delete an automation rule. */
export const deleteAutomationRule = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { writeAudit } = await import("@/lib/social.server");
    const { error } = await supabaseAdmin.from("automation_rules").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    await writeAudit(context.userId, "rule_deleted", "rule", data.id, null);
    return { ok: true };
  });

/** Manually evaluate all active rules right now. */
export const runAutomationNow = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ evaluated: number; triggered: number; alerts: number }> => {
    await assertAdmin(context);
    const { runAutomationRules, writeAudit } = await import("@/lib/social.server");
    const res = await runAutomationRules();
    await writeAudit(context.userId, "rules_run_manual", null, null, `${res.triggered} kural tetiklendi`);
    return res;
  });

/** List recent alerts (with unread count). */
export const listAlerts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ alerts: AutomationAlert[]; unread: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("automation_alerts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    const alerts = (data ?? []) as unknown as AutomationAlert[];
    return { alerts, unread: alerts.filter((a) => !a.read).length };
  });

/** Mark a single alert (or all alerts) as read. */
export const markAlertsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id?: string; all?: boolean }) => ({
    id: typeof data?.id === "string" ? data.id : null,
    all: Boolean(data?.all),
  }))
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.all) {
      await supabaseAdmin.from("automation_alerts").update({ read: true } as never).eq("read", false);
    } else if (data.id) {
      await supabaseAdmin.from("automation_alerts").update({ read: true } as never).eq("id", data.id);
    }
    return { ok: true };
  });

/** Delete all alerts. */
export const clearAlerts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("automation_alerts").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    return { ok: true };
  });

/** List recent audit-log entries. */
export const listAuditLog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AuditEntry[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("audit_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as AuditEntry[];
  });

// ============= Idea & Topic Bank =============

export type ContentIdea = {
  id: string;
  title: string;
  notes: string | null;
  status: "idea" | "approved" | "drafted" | "done";
  service: string | null;
  platform: string | null;
  priority: "low" | "medium" | "high";
  ai_generated: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/** List all content ideas (newest sort order first within each column). */
export const listContentIdeas = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ContentIdea[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("content_ideas")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as ContentIdea[];
  });

/** Create or update a single content idea. */
export const saveContentIdea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      title: string;
      notes?: string | null;
      status?: string;
      service?: string | null;
      platform?: string | null;
      priority?: string;
      sort_order?: number;
    }) => {
      if (!data.title?.trim()) throw new Error("Idea title is required");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true; id: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      title: data.title.trim(),
      notes: data.notes?.trim() || null,
      status: ["idea", "approved", "drafted", "done"].includes(data.status ?? "")
        ? data.status
        : "idea",
      service: data.service?.trim() || null,
      platform: data.platform?.trim() || null,
      priority: ["low", "medium", "high"].includes(data.priority ?? "") ? data.priority : "medium",
      ...(data.sort_order !== undefined ? { sort_order: data.sort_order } : {}),
    };
    if (data.id) {
      const { error } = await supabaseAdmin
        .from("content_ideas")
        .update(row as never)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("content_ideas")
      .insert(row as never)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: (inserted as { id: string }).id };
  });

/** Move an idea to a new status column (and optionally reorder). */
export const moveContentIdea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: string; sort_order?: number }) => {
    if (!data.id) throw new Error("Idea id is required");
    if (!["idea", "approved", "drafted", "done"].includes(data.status))
      throw new Error("Invalid status");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("content_ideas")
      .update({
        status: data.status,
        ...(data.sort_order !== undefined ? { sort_order: data.sort_order } : {}),
      } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Delete a content idea. */
export const deleteContentIdea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Idea id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("content_ideas").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Use AI to brainstorm ideas and insert them into the Idea Bank. */
export const brainstormContentIdeas = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { topic?: string; service?: string; count?: number }) => ({
    topic: typeof data?.topic === "string" ? data.topic.slice(0, 200) : "",
    service: typeof data?.service === "string" ? data.service.slice(0, 120) : "",
    count: Math.min(Math.max(Number(data?.count) || 6, 1), 12),
  }))
  .handler(async ({ context, data }): Promise<{ created: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateIdeasAI } = await import("@/lib/social.server");
    const ideas = await generateIdeasAI(data);
    if (!ideas.length) return { created: 0 };
    const rows = ideas.map((i) => ({
      title: i.title,
      notes: i.notes,
      service: i.service || null,
      platform: i.platform,
      priority: i.priority,
      status: "idea",
      ai_generated: true,
    }));
    const { error } = await supabaseAdmin.from("content_ideas").insert(rows as never);
    if (error) throw new Error(error.message);
    return { created: rows.length };
  });

/** Convert an idea into a draft social post, then mark the idea as drafted. */
export const convertIdeaToPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Idea id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true; postId: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateContentAI, loadBrandProfile } = await import("@/lib/social.server");

    const { data: idea, error: iErr } = await supabaseAdmin
      .from("content_ideas")
      .select("*")
      .eq("id", data.id)
      .single();
    if (iErr || !idea) throw new Error(iErr?.message ?? "Idea not found");
    const row = idea as unknown as ContentIdea;

    const brand = await loadBrandProfile();
    const topic = [row.title, row.notes].filter(Boolean).join(" — ");
    const content = await generateContentAI(topic, brand);

    const platform = row.platform && ["facebook", "instagram"].includes(row.platform)
      ? row.platform
      : "both";

    const { data: post, error: pErr } = await supabaseAdmin
      .from("social_posts")
      .insert({
        platform,
        idea: content.idea,
        caption: content.caption,
        hashtags: content.hashtags,
        status: "draft",
      } as never)
      .select("id")
      .single();
    if (pErr || !post) throw new Error(pErr?.message ?? "Post could not be created");

    await supabaseAdmin
      .from("content_ideas")
      .update({ status: "drafted" } as never)
      .eq("id", data.id);

    return { ok: true, postId: (post as { id: string }).id };
  });

// ============= Hashtag & Keyword Studio =============

export type HashtagSet = {
  id: string;
  name: string;
  service: string | null;
  platform: string;
  hashtags: string[];
  keywords: string[];
  notes: string | null;
  ai_generated: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/** List all saved hashtag/keyword sets. */
export const listHashtagSets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<HashtagSet[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("hashtag_sets")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as HashtagSet[];
  });

function cleanTags(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  return Array.from(
    new Set(
      list
        .map((t) => (typeof t === "string" ? t.trim().replace(/^#+/, "").replace(/\s+/g, "") : ""))
        .filter(Boolean)
        .map((t) => `#${t}`),
    ),
  ).slice(0, 60);
}

function cleanKeywords(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  return Array.from(
    new Set(list.map((k) => (typeof k === "string" ? k.trim() : "")).filter(Boolean)),
  ).slice(0, 40);
}

/** Create or update a saved hashtag/keyword set. */
export const saveHashtagSet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      name: string;
      service?: string | null;
      platform?: string;
      hashtags?: string[];
      keywords?: string[];
      notes?: string | null;
      ai_generated?: boolean;
    }) => {
      if (!data.name?.trim()) throw new Error("Set name is required");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true; id: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      name: data.name.trim(),
      service: data.service?.trim() || null,
      platform: ["facebook", "instagram", "both"].includes(data.platform ?? "")
        ? data.platform
        : "both",
      hashtags: cleanTags(data.hashtags),
      keywords: cleanKeywords(data.keywords),
      notes: data.notes?.trim() || null,
      ...(data.ai_generated !== undefined ? { ai_generated: data.ai_generated } : {}),
    };
    if (data.id) {
      const { error } = await supabaseAdmin
        .from("hashtag_sets")
        .update(row as never)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("hashtag_sets")
      .insert(row as never)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: (inserted as { id: string }).id };
  });

/** Delete a saved hashtag/keyword set. */
export const deleteHashtagSet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Set id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("hashtag_sets").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Generate (but don't save) an AI hashtag + keyword set for review. */
export const generateHashtagSet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { topic?: string; service?: string; platform?: string }) => ({
    topic: typeof data?.topic === "string" ? data.topic.slice(0, 200) : "",
    service: typeof data?.service === "string" ? data.service.slice(0, 120) : "",
    platform: typeof data?.platform === "string" ? data.platform : "both",
  }))
  .handler(
    async ({
      context,
      data,
    }): Promise<{ name: string; hashtags: string[]; keywords: string[]; notes: string }> => {
      await assertAdmin(context);
      const { generateHashtagSetAI } = await import("@/lib/social.server");
      return generateHashtagSetAI(data);
    },
  );

/** Append a set's hashtags to an existing post (deduped). */
export const attachHashtagSetToPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { postId: string; setId: string }) => {
    if (!data.postId || !data.setId) throw new Error("postId and setId are required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true; hashtags: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: set, error: sErr } = await supabaseAdmin
      .from("hashtag_sets")
      .select("hashtags")
      .eq("id", data.setId)
      .single();
    if (sErr || !set) throw new Error(sErr?.message ?? "Set not found");

    const { data: post, error: pErr } = await supabaseAdmin
      .from("social_posts")
      .select("hashtags")
      .eq("id", data.postId)
      .single();
    if (pErr || !post) throw new Error(pErr?.message ?? "Post not found");

    const existing = ((post as { hashtags: string | null }).hashtags ?? "")
      .split(/\s+/)
      .map((t) => t.trim())
      .filter(Boolean);
    const setTags = (set as { hashtags: string[] }).hashtags ?? [];
    const merged = Array.from(new Set([...existing, ...setTags]));
    const hashtags = merged.join(" ");

    const { error: uErr } = await supabaseAdmin
      .from("social_posts")
      .update({ hashtags } as never)
      .eq("id", data.postId);
    if (uErr) throw new Error(uErr.message);

    return { ok: true, hashtags };
  });

// ============= Content Templates Library =============

export type ContentTemplate = {
  id: string;
  name: string;
  category: string;
  service: string | null;
  platform: string;
  description: string | null;
  structure: string;
  example_caption: string | null;
  hashtags: string[];
  cta: string | null;
  ai_generated: boolean;
  use_count: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

const TEMPLATE_CATEGORIES = [
  "tips",
  "promo",
  "before-after",
  "emergency",
  "education",
  "testimonial",
  "seasonal",
  "general",
];

/** List all saved content templates. */
export const listContentTemplates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ContentTemplate[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("content_templates")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as ContentTemplate[];
  });

/** Create or update a content template. */
export const saveContentTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      name: string;
      category?: string;
      service?: string | null;
      platform?: string;
      description?: string | null;
      structure?: string;
      example_caption?: string | null;
      hashtags?: string[];
      cta?: string | null;
      ai_generated?: boolean;
    }) => {
      if (!data.name?.trim()) throw new Error("Template name is required");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true; id: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      name: data.name.trim(),
      category: TEMPLATE_CATEGORIES.includes(data.category ?? "")
        ? data.category
        : "general",
      service: data.service?.trim() || null,
      platform: ["facebook", "instagram", "both"].includes(data.platform ?? "")
        ? data.platform
        : "both",
      description: data.description?.trim() || null,
      structure: (data.structure ?? "").trim(),
      example_caption: data.example_caption?.trim() || null,
      hashtags: cleanTags(data.hashtags),
      cta: data.cta?.trim() || null,
      ...(data.ai_generated !== undefined ? { ai_generated: data.ai_generated } : {}),
    };
    if (data.id) {
      const { error } = await supabaseAdmin
        .from("content_templates")
        .update(row as never)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: inserted, error } = await supabaseAdmin
      .from("content_templates")
      .insert(row as never)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true, id: (inserted as { id: string }).id };
  });

/** Delete a content template. */
export const deleteContentTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Template id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("content_templates").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Generate (but don't save) an AI content template for review. */
export const generateContentTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { category?: string; service?: string; goal?: string }) => ({
    category: typeof data?.category === "string" ? data.category.slice(0, 40) : "",
    service: typeof data?.service === "string" ? data.service.slice(0, 120) : "",
    goal: typeof data?.goal === "string" ? data.goal.slice(0, 200) : "",
  }))
  .handler(
    async ({
      context,
      data,
    }): Promise<{
      name: string;
      category: string;
      description: string;
      structure: string;
      example_caption: string;
      hashtags: string[];
      cta: string;
    }> => {
      await assertAdmin(context);
      const { generateTemplateAI } = await import("@/lib/social.server");
      return generateTemplateAI(data);
    },
  );

/** Create a new draft post from a template (AI fills in the structure). */
export const createPostFromTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Template id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true; postId: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generatePostFromTemplateAI } = await import("@/lib/social.server");

    const { data: tpl, error: tErr } = await supabaseAdmin
      .from("content_templates")
      .select("*")
      .eq("id", data.id)
      .single();
    if (tErr || !tpl) throw new Error(tErr?.message ?? "Template not found");
    const row = tpl as unknown as ContentTemplate;

    const content = await generatePostFromTemplateAI({
      name: row.name,
      category: row.category,
      service: row.service,
      structure: row.structure,
      example_caption: row.example_caption,
      cta: row.cta,
    });

    const platform = ["facebook", "instagram"].includes(row.platform) ? row.platform : "both";
    const tplTags = (row.hashtags ?? []).join(" ");
    const mergedTags = Array.from(
      new Set(
        [content.hashtags, tplTags]
          .join(" ")
          .split(/\s+/)
          .map((t) => t.trim())
          .filter(Boolean),
      ),
    ).join(" ");

    const { data: post, error: pErr } = await supabaseAdmin
      .from("social_posts")
      .insert({
        platform,
        idea: content.idea,
        caption: content.caption,
        hashtags: mergedTags,
        status: "draft",
      } as never)
      .select("id")
      .single();
    if (pErr || !post) throw new Error(pErr?.message ?? "Post could not be created");

    await supabaseAdmin
      .from("content_templates")
      .update({ use_count: (row.use_count ?? 0) + 1 } as never)
      .eq("id", data.id);

    return { ok: true, postId: (post as { id: string }).id };
  });

// ============= Repurpose Engine =============

export type RepurposeVariant = { platform: string; caption: string; hashtags: string };

const REPURPOSE_PLATFORMS = [
  "facebook",
  "instagram",
  "google_business",
  "x",
  "linkedin",
  "tiktok",
];

/**
 * Take a piece of source content (pasted text OR an existing post) and generate
 * platform-tailored variants for the selected channels. Does NOT save.
 */
export const repurposeContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { source?: string; sourcePostId?: string; platforms?: string[] }) => {
    const platforms = Array.isArray(data.platforms)
      ? data.platforms.filter((p) => REPURPOSE_PLATFORMS.includes(p))
      : [];
    return {
      source: typeof data.source === "string" ? data.source.slice(0, 6000) : "",
      sourcePostId: typeof data.sourcePostId === "string" ? data.sourcePostId : "",
      platforms,
    };
  })
  .handler(async ({ context, data }): Promise<{ idea: string; variants: RepurposeVariant[] }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generatePlatformVariantsAI, loadBrandProfile } = await import("@/lib/social.server");

    let idea = data.source.trim();
    let caption = data.source.trim();
    let hashtags = "";

    if (data.sourcePostId) {
      const { data: post, error } = await supabaseAdmin
        .from("social_posts")
        .select("idea, caption, hashtags")
        .eq("id", data.sourcePostId)
        .single();
      if (error || !post) throw new Error(error?.message ?? "Source post not found");
      const p = post as { idea: string | null; caption: string; hashtags: string | null };
      idea = (p.idea || p.caption || "").trim();
      caption = p.caption.trim();
      hashtags = (p.hashtags ?? "").trim();
    }

    if (!idea) throw new Error("Source content is required");

    const targets = (data.platforms.length ? data.platforms : ["facebook", "instagram"]) as (
      | "facebook"
      | "instagram"
      | "google_business"
      | "x"
      | "linkedin"
      | "tiktok"
    )[];

    const brand = await loadBrandProfile();
    const variantMap = await generatePlatformVariantsAI(
      { idea, caption, hashtags, platforms: targets },
      brand,
    );

    const variants: RepurposeVariant[] = targets
      .filter((p) => variantMap[p]?.caption)
      .map((p) => ({
        platform: p,
        caption: variantMap[p].caption,
        hashtags: variantMap[p].hashtags ?? "",
      }));

    return { idea, variants };
  });

/**
 * Create one draft post that carries all repurposed platform variants.
 * The primary caption/hashtags come from Facebook (or the first variant).
 */
export const createDraftFromRepurpose = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { idea?: string; variants?: RepurposeVariant[] }) => {
    if (!Array.isArray(data.variants) || data.variants.length === 0)
      throw new Error("At least one variant is required");
    return {
      idea: typeof data.idea === "string" ? data.idea.slice(0, 600) : "",
      variants: data.variants
        .filter((v) => v && typeof v.platform === "string" && typeof v.caption === "string")
        .map((v) => ({
          platform: v.platform,
          caption: v.caption.slice(0, 3000),
          hashtags: typeof v.hashtags === "string" ? v.hashtags.slice(0, 600) : "",
        })),
    };
  })
  .handler(async ({ context, data }): Promise<{ ok: true; postId: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const primary =
      data.variants.find((v) => v.platform === "facebook") ?? data.variants[0];

    const platform_variants: Record<string, { caption: string; hashtags: string }> = {};
    for (const v of data.variants) {
      platform_variants[v.platform] = { caption: v.caption.trim(), hashtags: v.hashtags.trim() };
    }

    const { data: post, error } = await supabaseAdmin
      .from("social_posts")
      .insert({
        platform: "both",
        idea: data.idea || primary.caption.slice(0, 120),
        caption: primary.caption,
        hashtags: primary.hashtags,
        platform_variants,
        status: "draft",
      } as never)
      .select("id")
      .single();
    if (error || !post) throw new Error(error?.message ?? "Post could not be created");

    return { ok: true, postId: (post as { id: string }).id };
  });

// ============= UTM Link Builder & Click Tracking =============

export type TrackedLink = {
  id: string;
  code: string;
  name: string;
  destination_url: string;
  target_url: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  platform: string;
  post_id: string | null;
  clicks: number;
  last_clicked_at: string | null;
  created_at: string;
  updated_at: string;
};

function normalizeDestination(raw: string): string {
  const v = (raw ?? "").trim();
  if (!v) throw new Error("Destination URL is required");
  const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  // Validate
  // eslint-disable-next-line no-new
  new URL(withProto);
  return withProto;
}

function buildTargetUrl(
  destination: string,
  utm: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_term?: string | null;
    utm_content?: string | null;
  },
): string {
  const url = new URL(destination);
  const pairs: [string, string | null | undefined][] = [
    ["utm_source", utm.utm_source],
    ["utm_medium", utm.utm_medium],
    ["utm_campaign", utm.utm_campaign],
    ["utm_term", utm.utm_term],
    ["utm_content", utm.utm_content],
  ];
  for (const [k, val] of pairs) {
    const clean = (val ?? "").trim();
    if (clean) url.searchParams.set(k, clean);
    else url.searchParams.delete(k);
  }
  return url.toString();
}

function genCode(): string {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 7; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

/** List all tracked links, newest first. */
export const listTrackedLinks = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TrackedLink[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("tracked_links")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as TrackedLink[];
  });

/** Create or update a tracked link (builds the full UTM target URL + short code). */
export const saveTrackedLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id?: string;
      name: string;
      destination_url: string;
      utm_source?: string | null;
      utm_medium?: string | null;
      utm_campaign?: string | null;
      utm_term?: string | null;
      utm_content?: string | null;
      platform?: string;
      post_id?: string | null;
    }) => {
      if (!data.name?.trim()) throw new Error("Link name is required");
      if (!data.destination_url?.trim()) throw new Error("Destination URL is required");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true; id: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const destination = normalizeDestination(data.destination_url);
    const utm = {
      utm_source: data.utm_source?.trim() || null,
      utm_medium: data.utm_medium?.trim() || null,
      utm_campaign: data.utm_campaign?.trim() || null,
      utm_term: data.utm_term?.trim() || null,
      utm_content: data.utm_content?.trim() || null,
    };
    const target_url = buildTargetUrl(destination, utm);

    const base = {
      name: data.name.trim(),
      destination_url: destination,
      target_url,
      ...utm,
      platform: ["facebook", "instagram", "both"].includes(data.platform ?? "")
        ? data.platform
        : "both",
      post_id: data.post_id || null,
    };

    if (data.id) {
      const { error } = await supabaseAdmin
        .from("tracked_links")
        .update(base as never)
        .eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }

    // Insert with a unique short code (retry on collision)
    let lastErr = "";
    for (let attempt = 0; attempt < 6; attempt++) {
      const code = genCode();
      const { data: inserted, error } = await supabaseAdmin
        .from("tracked_links")
        .insert({ ...base, code } as never)
        .select("id")
        .single();
      if (!error && inserted) return { ok: true, id: (inserted as { id: string }).id };
      lastErr = error?.message ?? "Insert failed";
      if (!/duplicate|unique/i.test(lastErr)) break;
    }
    throw new Error(lastErr);
  });

/** Delete a tracked link (its click rows cascade away). */
export const deleteTrackedLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Link id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("tracked_links").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Daily click counts for a single link over the last N days. */
export type ClickPoint = { date: string; clicks: number };

export const getLinkClickSeries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; days?: number }) => {
    if (!data.id) throw new Error("Link id is required");
    return { id: data.id, days: Math.min(Math.max(data.days ?? 30, 7), 90) };
  })
  .handler(async ({ context, data }): Promise<ClickPoint[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - data.days * 24 * 60 * 60 * 1000).toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from("link_clicks")
      .select("created_at")
      .eq("link_id", data.id)
      .gte("created_at", since)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    const counts = new Map<string, number>();
    for (const r of (rows ?? []) as { created_at: string }[]) {
      const day = r.created_at.slice(0, 10);
      counts.set(day, (counts.get(day) ?? 0) + 1);
    }
    const out: ClickPoint[] = [];
    for (let i = data.days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      out.push({ date: d, clicks: counts.get(d) ?? 0 });
    }
    return out;
  });

/** Append a tracked short link to an existing post's caption. */
export const attachLinkToPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { postId: string; linkId: string; shortUrl: string }) => {
    if (!data.postId || !data.linkId || !data.shortUrl)
      throw new Error("postId, linkId and shortUrl are required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: post, error: pErr } = await supabaseAdmin
      .from("social_posts")
      .select("caption")
      .eq("id", data.postId)
      .single();
    if (pErr || !post) throw new Error(pErr?.message ?? "Post not found");
    const caption = ((post as { caption: string | null }).caption ?? "").trim();
    if (caption.includes(data.shortUrl)) return { ok: true };
    const next = caption ? `${caption}\n\n${data.shortUrl}` : data.shortUrl;
    const { error } = await supabaseAdmin
      .from("social_posts")
      .update({ caption: next } as never)
      .eq("id", data.postId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ============= Trend Radar & Mentions =============

export type TrendSignal = {
  id: string;
  title: string;
  summary: string | null;
  category: string;
  source: string | null;
  score: number;
  keywords: string[];
  suggested_angle: string | null;
  sentiment: string;
  platform: string;
  status: "new" | "saved" | "dismissed" | "converted";
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
};

/** List trend signals, highest score first within newest. */
export const listTrendSignals = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<TrendSignal[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("trend_signals")
      .select("*")
      .order("created_at", { ascending: false })
      .order("score", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as TrendSignal[];
  });

/** Use AI to scan for new content opportunities and store them as signals. */
export const generateTrendSignals = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { topic?: string; count?: number }) => ({
    topic: typeof data?.topic === "string" ? data.topic.slice(0, 200) : "",
    count: Math.min(Math.max(Number(data?.count) || 6, 1), 12),
  }))
  .handler(async ({ context, data }): Promise<{ created: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { generateTrendRadarAI } = await import("@/lib/social.server");
    const signals = await generateTrendRadarAI(data);
    if (!signals.length) return { created: 0 };
    const rows = signals.map((s) => ({
      title: s.title,
      summary: s.summary,
      category: s.category,
      score: s.score,
      keywords: s.keywords,
      suggested_angle: s.suggested_angle,
      sentiment: s.sentiment,
      platform: s.platform,
      source: "AI radar",
      status: "new",
      ai_generated: true,
    }));
    const { error } = await supabaseAdmin.from("trend_signals").insert(rows as never);
    if (error) throw new Error(error.message);
    return { created: rows.length };
  });

/** Update a signal's workflow status (saved / dismissed / new). */
export const updateTrendSignalStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: string }) => {
    if (!data.id) throw new Error("Signal id is required");
    if (!["new", "saved", "dismissed", "converted"].includes(data.status))
      throw new Error("Invalid status");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("trend_signals")
      .update({ status: data.status } as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Delete a trend signal. */
export const deleteTrendSignal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Signal id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("trend_signals").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Push a trend signal into the Idea Bank, then mark it converted. */
export const convertTrendToIdea = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data.id) throw new Error("Signal id is required");
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true; ideaId: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: sig, error: sErr } = await supabaseAdmin
      .from("trend_signals")
      .select("*")
      .eq("id", data.id)
      .single();
    if (sErr || !sig) throw new Error(sErr?.message ?? "Signal not found");
    const row = sig as unknown as TrendSignal;

    const notes = [row.summary, row.suggested_angle].filter(Boolean).join(" — ");
    const { data: idea, error: iErr } = await supabaseAdmin
      .from("content_ideas")
      .insert({
        title: row.title,
        notes: notes || null,
        platform: row.platform,
        priority: row.score >= 70 ? "high" : row.score >= 40 ? "medium" : "low",
        status: "idea",
        ai_generated: true,
      } as never)
      .select("id")
      .single();
    if (iErr || !idea) throw new Error(iErr?.message ?? "Idea could not be created");

    await supabaseAdmin
      .from("trend_signals")
      .update({ status: "converted" } as never)
      .eq("id", data.id);

    return { ok: true, ideaId: (idea as { id: string }).id };
  });

// ────────────────────────────────────────────────────────────────────────────
// Step 8 — Social → Leads Bridge
// Turn inbox conversations into business leads (public.bookings).
// ────────────────────────────────────────────────────────────────────────────

export type LeadCandidate = {
  id: string;
  platform: string;
  channel: string;
  participant_name: string | null;
  last_message_preview: string | null;
  last_message_at: string;
  sentiment: string | null;
  intent: string | null;
  is_lead: boolean;
  lead_score: number;
  lead_reason: string | null;
  lead_scanned_at: string | null;
  converted_booking_id: string | null;
  status: string;
};

export type LeadDraftResult = {
  name: string;
  phone: string;
  service_slug: string | null;
  district_slug: string | null;
  notes: string;
  summary: string;
};

/** List inbox conversations relevant to the leads pipeline. */
export const listLeadCandidates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data?: { filter?: "candidates" | "converted" | "all" }) => ({
    filter: data?.filter ?? "candidates",
  }))
  .handler(async ({ context, data }): Promise<{ candidates: LeadCandidate[]; counts: Record<string, number> }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const cols =
      "id, platform, channel, participant_name, last_message_preview, last_message_at, sentiment, intent, is_lead, lead_score, lead_reason, lead_scanned_at, converted_booking_id, status";

    let q = supabaseAdmin
      .from("conversations")
      .select(cols)
      .order("lead_score", { ascending: false })
      .order("last_message_at", { ascending: false })
      .limit(200);

    if (data.filter === "candidates") q = q.is("converted_booking_id", null).gt("lead_score", 0);
    else if (data.filter === "converted") q = q.not("converted_booking_id", "is", null);

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    const candidates = (rows ?? []) as unknown as LeadCandidate[];

    const { data: allRows } = await supabaseAdmin
      .from("conversations")
      .select("lead_score, converted_booking_id");
    const all = (allRows ?? []) as Array<{ lead_score: number; converted_booking_id: string | null }>;
    const counts = {
      candidates: all.filter((r) => (r.lead_score ?? 0) > 0 && !r.converted_booking_id).length,
      converted: all.filter((r) => r.converted_booking_id).length,
      all: all.length,
    };
    return { candidates, counts };
  });

/** AI-scan recent conversations for lead intent and persist scores. */
export const analyzeLeadCandidates = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data?: { limit?: number }) => ({
    limit: Math.min(Math.max(Number(data?.limit) || 30, 1), 60),
  }))
  .handler(async ({ context, data }): Promise<{ scanned: number; qualified: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { scoreLeadCandidatesAI } = await import("@/lib/social.server");

    const { data: rows, error } = await supabaseAdmin
      .from("conversations")
      .select("id, participant_name, last_message_preview, last_direction")
      .is("converted_booking_id", null)
      .order("last_message_at", { ascending: false })
      .limit(data.limit);
    if (error) throw new Error(error.message);

    const items = ((rows ?? []) as Array<{
      id: string;
      participant_name: string | null;
      last_message_preview: string | null;
    }>)
      .filter((r) => (r.last_message_preview ?? "").trim().length > 0)
      .map((r) => ({
        id: r.id,
        name: r.participant_name ?? "Müşteri",
        text: r.last_message_preview ?? "",
      }));

    if (!items.length) return { scanned: 0, qualified: 0 };

    const scores = await scoreLeadCandidatesAI(items);
    const now = new Date().toISOString();
    let qualified = 0;
    for (const s of scores) {
      const isLead = s.score >= 50;
      if (isLead) qualified++;
      await supabaseAdmin
        .from("conversations")
        .update({
          lead_score: s.score,
          lead_reason: s.reason,
          intent: s.intent,
          sentiment: s.sentiment,
          is_lead: isLead,
          lead_scanned_at: now,
        } as never)
        .eq("id", s.id);
    }
    return { scanned: items.length, qualified };
  });

/** Extract structured lead fields from a conversation transcript (no DB write). */
export const extractLeadFromConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("Conversation id is required");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<LeadDraftResult> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { extractLeadDetailsAI } = await import("@/lib/social.server");

    const { data: convo } = await supabaseAdmin
      .from("conversations")
      .select("participant_name")
      .eq("id", data.id)
      .single();

    const { data: msgs } = await supabaseAdmin
      .from("conversation_messages")
      .select("direction, body, author, created_at")
      .eq("conversation_id", data.id)
      .order("created_at", { ascending: true })
      .limit(40);

    const transcript = ((msgs ?? []) as Array<{ direction: string; body: string; author: string | null }>)
      .map((m) => `${m.direction === "inbound" ? (m.author ?? "Müşteri") : "Biz"}: ${m.body}`)
      .join("\n");

    const name = (convo as { participant_name: string | null } | null)?.participant_name ?? null;
    const draft = await extractLeadDetailsAI(transcript, name);
    if (!draft.name && name) draft.name = name;
    return draft;
  });

/** Create a booking (lead) from a conversation and mark it converted. */
export const createLeadFromConversation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: {
    conversationId: string;
    name: string;
    phone: string;
    service_slug: string;
    district_slug: string;
    notes?: string;
  }) => {
    if (!data?.conversationId) throw new Error("Conversation id is required");
    if (!data?.name?.trim()) throw new Error("İsim gerekli");
    if (!data?.phone?.trim()) throw new Error("Telefon gerekli");
    if (!data?.service_slug) throw new Error("Hizmet seçin");
    if (!data?.district_slug) throw new Error("İlçe seçin");
    return {
      conversationId: data.conversationId,
      name: data.name.trim().slice(0, 120),
      phone: data.phone.trim().slice(0, 40),
      service_slug: data.service_slug,
      district_slug: data.district_slug,
      notes: (data.notes ?? "").trim().slice(0, 1000),
    };
  })
  .handler(async ({ context, data }): Promise<{ ok: true; bookingId: string }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { SERVICES } = await import("@/data/services");
    const { DISTRICTS } = await import("@/data/districts");

    const service = SERVICES.find((s) => s.slug === data.service_slug);
    const district = DISTRICTS.find((d) => d.slug === data.district_slug);
    if (!service) throw new Error("Geçersiz hizmet");
    if (!district) throw new Error("Geçersiz ilçe");

    const { data: booking, error: bErr } = await supabaseAdmin
      .from("bookings")
      .insert({
        name: data.name,
        phone: data.phone,
        service_key: service.slug,
        service_label: service.name,
        district_name: district.name,
        district_slug: district.slug,
        notes: data.notes ? `[Sosyal medya lead] ${data.notes}` : "[Sosyal medya lead]",
        status: "new",
      } as never)
      .select("id")
      .single();
    if (bErr || !booking) throw new Error(bErr?.message ?? "Lead oluşturulamadı");

    const bookingId = (booking as { id: string }).id;
    await supabaseAdmin
      .from("conversations")
      .update({
        converted_booking_id: bookingId,
        is_lead: true,
        status: "handled",
        unread_count: 0,
      } as never)
      .eq("id", data.conversationId);

    return { ok: true, bookingId };
  });

// ────────────────────────────────────────────────────────────────────────────
// Step 9 — Reports & Export Center
// Date-ranged performance aggregation across posts, engagement, leads & clicks.
// ────────────────────────────────────────────────────────────────────────────

export type ReportData = {
  range: { from: string; to: string; days: number };
  posts: {
    total: number;
    byPlatform: { platform: string; count: number }[];
    byDay: { date: string; count: number }[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    impressions: number;
    total: number;
  };
  leads: {
    total: number;
    fromSocial: number;
    byStatus: { status: string; count: number }[];
    byService: { service: string; count: number }[];
  };
  clicks: {
    total: number;
    topLinks: { label: string; clicks: number }[];
  };
  topPosts: {
    id: string;
    platform: string;
    caption: string;
    engagement: number;
    posted_at: string | null;
  }[];
};

function clampRange(from?: string, to?: string): { from: string; to: string; days: number } {
  const toDate = to ? new Date(to) : new Date();
  const fromDate = from ? new Date(from) : new Date(Date.now() - 29 * 24 * 60 * 60 * 1000);
  const f = isNaN(fromDate.getTime()) ? new Date(Date.now() - 29 * 86400000) : fromDate;
  const t = isNaN(toDate.getTime()) ? new Date() : toDate;
  const start = new Date(Math.min(f.getTime(), t.getTime()));
  const end = new Date(Math.max(f.getTime(), t.getTime()));
  end.setHours(23, 59, 59, 999);
  const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
  return { from: start.toISOString(), to: end.toISOString(), days };
}

/** Aggregate a full performance report for the selected date range. */
export const getReportData = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data?: { from?: string; to?: string }) => ({
    from: data?.from,
    to: data?.to,
  }))
  .handler(async ({ context, data }): Promise<ReportData> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const range = clampRange(data.from, data.to);

    // Posts published in range
    const { data: postRows } = await supabaseAdmin
      .from("social_posts")
      .select("id, platform, caption, posted_at")
      .eq("status", "posted")
      .gte("posted_at", range.from)
      .lte("posted_at", range.to)
      .order("posted_at", { ascending: true })
      .limit(1000);
    const posts = (postRows ?? []) as Array<{
      id: string;
      platform: string;
      caption: string | null;
      posted_at: string | null;
    }>;
    const platformMap = new Map<string, number>();
    const dayMap = new Map<string, number>();
    for (const p of posts) {
      platformMap.set(p.platform, (platformMap.get(p.platform) ?? 0) + 1);
      const day = (p.posted_at ?? "").slice(0, 10);
      if (day) dayMap.set(day, (dayMap.get(day) ?? 0) + 1);
    }

    // Engagement snapshots in range
    const { data: anRows } = await supabaseAdmin
      .from("post_analytics")
      .select("post_id, platform, likes, comments, shares, reach, impressions, engagement, created_at")
      .gte("created_at", range.from)
      .lte("created_at", range.to)
      .limit(5000);
    const analytics = (anRows ?? []) as Array<{
      post_id: string;
      platform: string;
      likes: number | null;
      comments: number | null;
      shares: number | null;
      reach: number | null;
      impressions: number | null;
      engagement: number | null;
    }>;
    const engagement = { likes: 0, comments: 0, shares: 0, reach: 0, impressions: 0, total: 0 };
    const postEng = new Map<string, number>();
    for (const a of analytics) {
      engagement.likes += a.likes ?? 0;
      engagement.comments += a.comments ?? 0;
      engagement.shares += a.shares ?? 0;
      engagement.reach += a.reach ?? 0;
      engagement.impressions += a.impressions ?? 0;
      const eng = a.engagement ?? (a.likes ?? 0) + (a.comments ?? 0) + (a.shares ?? 0);
      postEng.set(a.post_id, Math.max(postEng.get(a.post_id) ?? 0, eng));
    }
    engagement.total = engagement.likes + engagement.comments + engagement.shares;

    // Top posts by engagement
    const topIds = [...postEng.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    let topPosts: ReportData["topPosts"] = [];
    if (topIds.length) {
      const { data: tpRows } = await supabaseAdmin
        .from("social_posts")
        .select("id, platform, caption, posted_at")
        .in("id", topIds.map(([id]) => id));
      const byId = new Map(
        ((tpRows ?? []) as Array<{ id: string; platform: string; caption: string | null; posted_at: string | null }>).map(
          (r) => [r.id, r],
        ),
      );
      topPosts = topIds
        .map(([id, eng]) => {
          const r = byId.get(id);
          if (!r) return null;
          return {
            id,
            platform: r.platform,
            caption: (r.caption ?? "").slice(0, 120),
            engagement: eng,
            posted_at: r.posted_at,
          };
        })
        .filter(Boolean) as ReportData["topPosts"];
    }

    // Leads (bookings) created in range
    const { data: bookingRows } = await supabaseAdmin
      .from("bookings")
      .select("id, status, service_label, created_at")
      .gte("created_at", range.from)
      .lte("created_at", range.to)
      .limit(2000);
    const bookings = (bookingRows ?? []) as Array<{
      id: string;
      status: string;
      service_label: string | null;
    }>;
    const statusMap = new Map<string, number>();
    const serviceMap = new Map<string, number>();
    for (const b of bookings) {
      statusMap.set(b.status, (statusMap.get(b.status) ?? 0) + 1);
      const svc = b.service_label ?? "Diğer";
      serviceMap.set(svc, (serviceMap.get(svc) ?? 0) + 1);
    }
    // Social-sourced leads: conversations converted to bookings in this range
    const bookingIds = new Set(bookings.map((b) => b.id));
    let fromSocial = 0;
    if (bookingIds.size) {
      const { data: convRows } = await supabaseAdmin
        .from("conversations")
        .select("converted_booking_id")
        .not("converted_booking_id", "is", null);
      for (const c of (convRows ?? []) as Array<{ converted_booking_id: string | null }>) {
        if (c.converted_booking_id && bookingIds.has(c.converted_booking_id)) fromSocial++;
      }
    }

    // Link clicks in range
    const { data: clickRows } = await supabaseAdmin
      .from("link_clicks")
      .select("link_id, created_at")
      .gte("created_at", range.from)
      .lte("created_at", range.to)
      .limit(5000);
    const clicks = (clickRows ?? []) as Array<{ link_id: string }>;
    const clickMap = new Map<string, number>();
    for (const c of clicks) clickMap.set(c.link_id, (clickMap.get(c.link_id) ?? 0) + 1);
    let topLinks: ReportData["clicks"]["topLinks"] = [];
    if (clickMap.size) {
      const { data: linkRows } = await supabaseAdmin
        .from("tracked_links")
        .select("id, name, code")
        .in("id", [...clickMap.keys()]);
      const labelById = new Map(
        ((linkRows ?? []) as Array<{ id: string; name: string | null; code: string }>).map((l) => [
          l.id,
          l.name || l.code,
        ]),
      );
      topLinks = [...clickMap.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([id, n]) => ({ label: labelById.get(id) ?? "Link", clicks: n }));
    }

    const sortDesc = (m: Map<string, number>) =>
      [...m.entries()].sort((a, b) => b[1] - a[1]);

    return {
      range,
      posts: {
        total: posts.length,
        byPlatform: sortDesc(platformMap).map(([platform, count]) => ({ platform, count })),
        byDay: [...dayMap.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count })),
      },
      engagement,
      leads: {
        total: bookings.length,
        fromSocial,
        byStatus: sortDesc(statusMap).map(([status, count]) => ({ status, count })),
        byService: sortDesc(serviceMap).slice(0, 8).map(([service, count]) => ({ service, count })),
      },
      clicks: {
        total: clicks.length,
        topLinks,
      },
      topPosts,
    };
  });

// ────────────────────────────────────────────────────────────────────────────
// Step 10 — Team Collaboration & Notifications
// Internal post notes (@mentions) + a studio notification center.
// ────────────────────────────────────────────────────────────────────────────

export type StudioNotification = {
  id: string;
  type: "info" | "approval" | "failed" | "lead" | "mention" | "inbox";
  title: string;
  body: string | null;
  section: string | null;
  entity_id: string | null;
  read: boolean;
  created_at: string;
};

export type PostComment = {
  id: string;
  post_id: string;
  author_id: string | null;
  author_name: string;
  body: string;
  mentions: string[];
  created_at: string;
};

export type ActivityComment = PostComment & { post_caption: string | null };

function adminName(context: unknown): string {
  const { claims } = context as { claims?: { email?: string; name?: string } };
  return claims?.name || claims?.email?.split("@")[0] || "Admin";
}

function adminUserId(context: unknown): string | null {
  const { userId } = context as { userId?: string };
  return userId ?? null;
}

/** List studio notifications, newest first. */
export const listStudioNotifications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data?: { onlyUnread?: boolean }) => ({ onlyUnread: !!data?.onlyUnread }))
  .handler(async ({ context, data }): Promise<{ items: StudioNotification[]; unread: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin
      .from("studio_notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data.onlyUnread) q = q.eq("read", false);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    const { count } = await supabaseAdmin
      .from("studio_notifications")
      .select("id", { count: "exact", head: true })
      .eq("read", false);
    return { items: (rows ?? []) as unknown as StudioNotification[], unread: count ?? 0 };
  });

/** Mark one or all notifications as read. */
export const markNotificationsRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data?: { id?: string; all?: boolean }) => ({ id: data?.id, all: !!data?.all }))
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let q = supabaseAdmin.from("studio_notifications").update({ read: true } as never);
    if (data.all) q = q.eq("read", false);
    else if (data.id) q = q.eq("id", data.id);
    else return { ok: true };
    const { error } = await q;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Delete a single notification. */
export const deleteStudioNotification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("studio_notifications").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/**
 * Scan current studio state and create notifications for things that need
 * attention: pending approvals, failed posts, new social leads, unread inbox.
 * Skips items that already have an open (unread) notification.
 */
export const syncStudioNotifications = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ created: number }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existingRows } = await supabaseAdmin
      .from("studio_notifications")
      .select("entity_id, type")
      .eq("read", false);
    const seen = new Set(
      ((existingRows ?? []) as Array<{ entity_id: string | null; type: string }>).map(
        (r) => `${r.type}:${r.entity_id ?? ""}`,
      ),
    );

    const toCreate: Array<{
      type: string;
      title: string;
      body: string | null;
      section: string | null;
      entity_id: string | null;
    }> = [];
    const add = (n: { type: string; title: string; body: string | null; section: string | null; entity_id: string | null }) => {
      if (seen.has(`${n.type}:${n.entity_id ?? ""}`)) return;
      seen.add(`${n.type}:${n.entity_id ?? ""}`);
      toCreate.push(n);
    };

    // Pending approvals
    const { data: pending } = await supabaseAdmin
      .from("social_posts")
      .select("id, platform, caption")
      .eq("status", "pending_review")
      .limit(50);
    for (const p of (pending ?? []) as Array<{ id: string; platform: string; caption: string | null }>) {
      add({
        type: "approval",
        title: "Onay bekleyen gönderi",
        body: `${p.platform} · ${(p.caption ?? "").slice(0, 60)}`,
        section: "approval",
        entity_id: p.id,
      });
    }

    // Failed posts
    const { data: failed } = await supabaseAdmin
      .from("social_posts")
      .select("id, platform, error")
      .eq("status", "failed")
      .limit(50);
    for (const p of (failed ?? []) as Array<{ id: string; platform: string; error: string | null }>) {
      add({
        type: "failed",
        title: "Gönderi başarısız",
        body: `${p.platform} · ${(p.error ?? "Bilinmeyen hata").slice(0, 60)}`,
        section: "logs",
        entity_id: p.id,
      });
    }

    // New unconverted leads (high score)
    const { data: leads } = await supabaseAdmin
      .from("conversations")
      .select("id, participant_name, lead_score")
      .is("converted_booking_id", null)
      .gte("lead_score", 60)
      .limit(50);
    for (const c of (leads ?? []) as Array<{ id: string; participant_name: string | null; lead_score: number }>) {
      add({
        type: "lead",
        title: "Yeni potansiyel müşteri",
        body: `${c.participant_name ?? "Müşteri"} · skor ${c.lead_score}`,
        section: "leads",
        entity_id: c.id,
      });
    }

    // Unread inbox conversations
    const { data: unreadConv } = await supabaseAdmin
      .from("conversations")
      .select("id, participant_name, unread_count")
      .gt("unread_count", 0)
      .limit(50);
    for (const c of (unreadConv ?? []) as Array<{ id: string; participant_name: string | null; unread_count: number }>) {
      add({
        type: "inbox",
        title: "Okunmamış mesaj",
        body: `${c.participant_name ?? "Müşteri"} · ${c.unread_count} yeni`,
        section: "inbox",
        entity_id: c.id,
      });
    }

    if (!toCreate.length) return { created: 0 };
    const { error } = await supabaseAdmin.from("studio_notifications").insert(toCreate as never);
    if (error) throw new Error(error.message);
    return { created: toCreate.length };
  });

/** Recent internal post notes across all posts (activity feed). */
export const listActivityComments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ActivityComment[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("post_comments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(60);
    if (error) throw new Error(error.message);
    const comments = (rows ?? []) as unknown as PostComment[];
    const ids = [...new Set(comments.map((c) => c.post_id))];
    const captionById = new Map<string, string | null>();
    if (ids.length) {
      const { data: postRows } = await supabaseAdmin
        .from("social_posts")
        .select("id, caption")
        .in("id", ids);
      for (const p of (postRows ?? []) as Array<{ id: string; caption: string | null }>) {
        captionById.set(p.id, p.caption);
      }
    }
    return comments.map((c) => ({
      ...c,
      post_caption: captionById.get(c.post_id) ?? null,
    }));
  });

/** Comments for a single post (oldest first). */
export const listPostComments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { postId: string }) => {
    if (!data?.postId) throw new Error("postId gerekli");
    return { postId: data.postId };
  })
  .handler(async ({ context, data }): Promise<PostComment[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("post_comments")
      .select("*")
      .eq("post_id", data.postId)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as PostComment[];
  });

/** Add an internal note to a post; @mentions create notifications. */
export const addPostComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { postId: string; body: string }) => {
    if (!data?.postId) throw new Error("postId gerekli");
    if (!data?.body?.trim()) throw new Error("Not boş olamaz");
    return { postId: data.postId, body: data.body.trim().slice(0, 1500) };
  })
  .handler(async ({ context, data }): Promise<PostComment> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const mentions = [...data.body.matchAll(/@([\p{L}0-9_.-]+)/gu)].map((m) => m[1]).slice(0, 10);
    const author_name = adminName(context);

    const { data: inserted, error } = await supabaseAdmin
      .from("post_comments")
      .insert({
        post_id: data.postId,
        author_id: adminUserId(context),
        author_name,
        body: data.body,
        mentions,
      } as never)
      .select("*")
      .single();
    if (error || !inserted) throw new Error(error?.message ?? "Not eklenemedi");

    if (mentions.length) {
      await supabaseAdmin.from("studio_notifications").insert({
        type: "mention",
        title: `${author_name} sizi etiketledi`,
        body: data.body.slice(0, 80),
        section: "activity",
        entity_id: data.postId,
      } as never);
    }

    return inserted as unknown as PostComment;
  });

/** Delete an internal post note. */
export const deletePostComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("id gerekli");
    return { id: data.id };
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("post_comments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
