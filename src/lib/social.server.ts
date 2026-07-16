// Server-only helpers for social media automation.
// Blocked from client bundles by the *.server.ts filename convention.

import { SERVICES } from "@/data/services";
import { DISTRICTS } from "@/data/districts";

const AI_BASE = "https://ai.gateway.lovable.dev/v1";
const GRAPH = "https://graph.facebook.com/v21.0";

export type GeneratedContent = {
  idea: string;
  caption: string;
  hashtags: string;
  imagePrompt: string;
};

export type BrandProfile = {
  business_name: string;
  tone: string;
  phone: string;
  default_hashtags: string;
  language: string;
};

const DEFAULT_BRAND: BrandProfile = {
  business_name: "Gölge Tesisat",
  tone: "Güven veren, premium, samimi ama profesyonel",
  phone: "",
  default_hashtags: "#tesisat #istanbul #kombi #suTesisatı",
  language: "tr",
};

export type VoiceProfile = {
  id: string;
  name: string;
  tone: string;
  do_rules: string | null;
  dont_rules: string | null;
  sample_phrases: string | null;
  emoji_level: string;
  cta_style: string | null;
  language: string;
};

const EMOJI_GUIDE: Record<string, string> = {
  none: "Hiç emoji kullanma.",
  low: "Çok az (en fazla 1-2) emoji kullan.",
  medium: "Emoji kullan ama abartma.",
  high: "Bolca, enerjik emoji kullan.",
};

/** Load a single voice profile by id (or the default persona when id is null). */
export async function loadVoiceProfile(id?: string | null): Promise<VoiceProfile | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const cols = "id, name, tone, do_rules, dont_rules, sample_phrases, emoji_level, cta_style, language";
  if (id) {
    const { data } = await supabaseAdmin.from("voice_profiles").select(cols).eq("id", id).maybeSingle();
    if (data) return data as unknown as VoiceProfile;
  }
  const { data } = await supabaseAdmin
    .from("voice_profiles")
    .select(cols)
    .eq("is_default", true)
    .eq("active", true)
    .limit(1)
    .maybeSingle();
  return (data as unknown as VoiceProfile) ?? null;
}

/** Build the persona-specific portion of the system prompt. */
function personaPrompt(persona: VoiceProfile | null): string {
  if (!persona) return "";
  const parts = [` Persona: '${persona.name}'. Ton: ${persona.tone}.`];
  if (persona.do_rules) parts.push(` Mutlaka uy: ${persona.do_rules}.`);
  if (persona.dont_rules) parts.push(` Kaçın: ${persona.dont_rules}.`);
  if (persona.sample_phrases) parts.push(` Örnek ifadeler: ${persona.sample_phrases}.`);
  if (persona.cta_style) parts.push(` Çağrı-aksiyon tarzı: ${persona.cta_style}.`);
  parts.push(` ${EMOJI_GUIDE[persona.emoji_level] ?? EMOJI_GUIDE.medium}`);
  return parts.join("");
}

/**
 * Generate a full post (idea + caption + hashtags + image prompt) tailored to
 * the brand profile of the plumbing business.
 */
export async function generateContentAI(
  topic?: string,
  brand: BrandProfile = DEFAULT_BRAND,
  persona: VoiceProfile | null = null,
): Promise<GeneratedContent> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const phoneLine = brand.phone ? ` İletişim telefonu: ${brand.phone}.` : "";
  const emojiDefault = persona ? "" : "Emoji kullan ama abartma.";
  const system =
    `Sen İstanbul'da faaliyet gösteren '${brand.business_name}' adlı profesyonel su tesisatı, ` +
    "kombi, petek, tıkanıklık açma ve kaçak tespiti firması için sosyal medya içerik " +
    `uzmanısın. Dil tonu: ${brand.tone}. ` +
    `Tüm metinler ${brand.language === "tr" ? "Türkçe" : brand.language} olmalı. ${emojiDefault}` +
    personaPrompt(persona) +
    phoneLine;

  const user =
    (topic && topic.trim()
      ? `Konu: ${topic.trim()}. Bu konu hakkında `
      : "Tesisat hizmetleriyle ilgili çekici bir konu seçerek ") +
    "Facebook ve Instagram için tek bir gönderi üret. " +
    `Önerilen marka etiketleri: ${brand.default_hashtags}. ` +
    "Şu JSON formatında dön: {\"idea\": \"içerik fikri kısa\", \"caption\": \"gönderi metni, " +
    "çağrı-aksiyon ve telefon daveti içersin\", \"hashtags\": \"#etiket1 #etiket2 ...\", " +
    "\"imagePrompt\": \"görsel üretimi için İngilizce, detaylı, fotogerçekçi prompt\"}";

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI content failed [${res.status}]: ${body}`);
  }

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = json.choices?.[0]?.message?.content ?? "{}";
  let parsed: Partial<GeneratedContent>;
  try {
    parsed = JSON.parse(content);
  } catch {
    parsed = {};
  }

  return {
    idea: parsed.idea?.trim() || "Tesisat hizmeti tanıtımı",
    caption: parsed.caption?.trim() || "Gölge Tesisat — İstanbul'un güvenilir tesisat çözümü.",
    hashtags: parsed.hashtags?.trim() || "#tesisat #istanbul #kombi #suTesisatı",
    imagePrompt:
      parsed.imagePrompt?.trim() ||
      "Professional plumber fixing a modern boiler, clean uniform, photorealistic, bright",
  };
}

/** Load the saved brand profile (falls back to defaults). */
export async function loadBrandProfile(): Promise<BrandProfile> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("brand_settings")
    .select("business_name, tone, phone, default_hashtags, language")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!data) return DEFAULT_BRAND;
  return { ...DEFAULT_BRAND, ...(data as Partial<BrandProfile>) };
}

/** Add a short, varied creative angle so batches don't repeat each other. */
export const CONTENT_ANGLES = [
  "müşteri güveni ve hızlı servis",
  "kış kombi bakımı ipuçları",
  "tıkanıklık açma ve önleme",
  "su kaçağı tespiti teknolojisi",
  "acil 7/24 servis vurgusu",
  "petek temizliği ve verimlilik",
  "banyo/mutfak tesisat yenileme",
  "uygun fiyat ve garanti",
  "müşteri yorumu / başarı hikayesi",
  "mevsimsel kampanya duyurusu",
] as const;

/** Generate a single PNG image and return raw bytes. */
export async function generateImageAI(prompt: string): Promise<Uint8Array> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const res = await fetch(`${AI_BASE}/images/generations`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openai/gpt-image-2",
      prompt,
      size: "1024x1024",
      quality: "low",
      n: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI image failed [${res.status}]: ${body}`);
  }

  const json = (await res.json()) as { data?: { b64_json?: string }[] };
  const b64 = json.data?.[0]?.b64_json;
  if (!b64) throw new Error("AI image returned no data");

  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export type PublishResult = {
  fb_post_id?: string;
  ig_post_id?: string;
};

export type PostInsights = {
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  impressions: number;
  engagement: number;
};

/** Best-effort fetch of engagement metrics for a published FB/IG post. */
export async function fetchPostInsights(opts: {
  fbPostId?: string | null;
  igPostId?: string | null;
}): Promise<PostInsights> {
  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  if (!pageToken) throw new Error("META_PAGE_ACCESS_TOKEN eksik");

  const out: PostInsights = { likes: 0, comments: 0, shares: 0, reach: 0, impressions: 0, engagement: 0 };

  if (opts.fbPostId) {
    const url =
      `${GRAPH}/${opts.fbPostId}?fields=likes.summary(true),comments.summary(true),shares` +
      `&access_token=${encodeURIComponent(pageToken)}`;
    const res = await fetch(url);
    const data = (await res.json()) as {
      likes?: { summary?: { total_count?: number } };
      comments?: { summary?: { total_count?: number } };
      shares?: { count?: number };
      error?: { message?: string };
    };
    if (data.error) throw new Error(`Facebook insights: ${data.error.message}`);
    out.likes += data.likes?.summary?.total_count ?? 0;
    out.comments += data.comments?.summary?.total_count ?? 0;
    out.shares += data.shares?.count ?? 0;
  }

  if (opts.igPostId) {
    // basic counts
    const baseUrl =
      `${GRAPH}/${opts.igPostId}?fields=like_count,comments_count` +
      `&access_token=${encodeURIComponent(pageToken)}`;
    const baseRes = await fetch(baseUrl);
    const baseData = (await baseRes.json()) as {
      like_count?: number;
      comments_count?: number;
      error?: { message?: string };
    };
    if (!baseData.error) {
      out.likes += baseData.like_count ?? 0;
      out.comments += baseData.comments_count ?? 0;
    }
    // reach insight (best-effort, may be unavailable)
    const insUrl =
      `${GRAPH}/${opts.igPostId}/insights?metric=reach` +
      `&access_token=${encodeURIComponent(pageToken)}`;
    const insRes = await fetch(insUrl);
    const insData = (await insRes.json()) as {
      data?: { name?: string; values?: { value?: number }[] }[];
    };
    for (const m of insData.data ?? []) {
      const v = m.values?.[0]?.value ?? 0;
      if (m.name === "reach") out.reach += v;
    }
  }

  out.engagement = out.likes + out.comments + out.shares;
  return out;
}


export type MediaType = "image" | "carousel" | "video" | "reels";

async function igCreateContainer(
  igUserId: string,
  pageToken: string,
  params: Record<string, string>,
): Promise<string> {
  const res = await fetch(`${GRAPH}/${igUserId}/media`, {
    method: "POST",
    body: new URLSearchParams({ ...params, access_token: pageToken }),
  });
  const data = (await res.json()) as { id?: string; error?: { message?: string } };
  if (!res.ok || data.error || !data.id)
    throw new Error(`Instagram (container): ${data.error?.message ?? res.status}`);
  return data.id;
}

async function igPublish(igUserId: string, pageToken: string, creationId: string): Promise<string> {
  // Video/reels containers need time to process before publishing.
  for (let i = 0; i < 20; i++) {
    const statusRes = await fetch(
      `${GRAPH}/${creationId}?fields=status_code&access_token=${encodeURIComponent(pageToken)}`,
    );
    const status = (await statusRes.json()) as { status_code?: string };
    if (status.status_code === "FINISHED") break;
    if (status.status_code === "ERROR") throw new Error("Instagram medya işleme hatası");
    if (status.status_code === undefined) break; // images: no processing
    await new Promise((r) => setTimeout(r, 3000));
  }
  const pubRes = await fetch(`${GRAPH}/${igUserId}/media_publish`, {
    method: "POST",
    body: new URLSearchParams({ creation_id: creationId, access_token: pageToken }),
  });
  const pubData = (await pubRes.json()) as { id?: string; error?: { message?: string } };
  if (!pubRes.ok || pubData.error || !pubData.id)
    throw new Error(`Instagram (publish): ${pubData.error?.message ?? pubRes.status}`);
  return pubData.id;
}

/**
 * Publish a post to Facebook and/or Instagram via the Meta Graph API.
 * Supports single image, multi-image carousel, and video/reels.
 */
export async function publishToMeta(opts: {
  platform: string;
  caption: string;
  hashtags?: string | null;
  mediaType?: MediaType;
  mediaUrls: string[];
  variants?: Record<string, { caption: string; hashtags: string }> | null;
}): Promise<PublishResult> {
  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  const igUserId = process.env.META_INSTAGRAM_BUSINESS_ID;

  const composeFor = (platform: "facebook" | "instagram"): string => {
    const v = opts.variants?.[platform];
    const caption = v?.caption?.trim() || opts.caption;
    const hashtags = v?.hashtags?.trim() || opts.hashtags || "";
    return [caption, hashtags].filter(Boolean).join("\n\n");
  };

  const result: PublishResult = {};
  const urls = opts.mediaUrls.filter(Boolean);
  if (urls.length === 0) throw new Error("Yayınlanacak medya bulunamadı");
  const mediaType: MediaType = opts.mediaType ?? (urls.length > 1 ? "carousel" : "image");
  const isVideo = mediaType === "video" || mediaType === "reels";

  const wantsFacebook = opts.platform === "facebook" || opts.platform === "both";
  const wantsInstagram = opts.platform === "instagram" || opts.platform === "both";
  const fbMessage = composeFor("facebook");
  const igMessage = composeFor("instagram");

  if (wantsFacebook) {
    if (!pageToken) throw new Error("META_PAGE_ACCESS_TOKEN eksik — Facebook paylaşımı yapılamıyor.");

    if (isVideo) {
      const res = await fetch(`${GRAPH}/me/videos`, {
        method: "POST",
        body: new URLSearchParams({ file_url: urls[0], description: fbMessage, access_token: pageToken }),
      });
      const data = (await res.json()) as { id?: string; error?: { message?: string } };
      if (!res.ok || data.error) throw new Error(`Facebook video: ${data.error?.message ?? res.status}`);
      result.fb_post_id = data.id;
    } else if (mediaType === "carousel") {
      // Upload each photo unpublished, then attach to a single post.
      const mediaFbids: string[] = [];
      for (const url of urls) {
        const upRes = await fetch(`${GRAPH}/me/photos`, {
          method: "POST",
          body: new URLSearchParams({ url, published: "false", access_token: pageToken }),
        });
        const upData = (await upRes.json()) as { id?: string; error?: { message?: string } };
        if (!upRes.ok || upData.error || !upData.id)
          throw new Error(`Facebook (foto): ${upData.error?.message ?? upRes.status}`);
        mediaFbids.push(upData.id);
      }
      const attached: Record<string, string> = { message: fbMessage, access_token: pageToken };
      mediaFbids.forEach((id, i) => {
        attached[`attached_media[${i}]`] = JSON.stringify({ media_fbid: id });
      });
      const postRes = await fetch(`${GRAPH}/me/feed`, { method: "POST", body: new URLSearchParams(attached) });
      const postData = (await postRes.json()) as { id?: string; error?: { message?: string } };
      if (!postRes.ok || postData.error) throw new Error(`Facebook: ${postData.error?.message ?? postRes.status}`);
      result.fb_post_id = postData.id;
    } else {
      const res = await fetch(`${GRAPH}/me/photos`, {
        method: "POST",
        body: new URLSearchParams({ url: urls[0], caption: fbMessage, access_token: pageToken }),
      });
      const data = (await res.json()) as { id?: string; post_id?: string; error?: { message?: string } };
      if (!res.ok || data.error) throw new Error(`Facebook: ${data.error?.message ?? res.status}`);
      result.fb_post_id = data.post_id ?? data.id;
    }
  }

  if (wantsInstagram) {
    if (!pageToken || !igUserId)
      throw new Error("META_INSTAGRAM_BUSINESS_ID / token eksik — Instagram paylaşımı yapılamıyor.");

    let creationId: string;
    if (isVideo) {
      creationId = await igCreateContainer(igUserId, pageToken, {
        media_type: "REELS",
        video_url: urls[0],
        caption: igMessage,
      });
    } else if (mediaType === "carousel") {
      const childIds: string[] = [];
      for (const url of urls) {
        childIds.push(
          await igCreateContainer(igUserId, pageToken, { image_url: url, is_carousel_item: "true" }),
        );
      }
      creationId = await igCreateContainer(igUserId, pageToken, {
        media_type: "CAROUSEL",
        caption: igMessage,
        children: childIds.join(","),
      });
    } else {
      creationId = await igCreateContainer(igUserId, pageToken, { image_url: urls[0], caption: igMessage });
    }
    result.ig_post_id = await igPublish(igUserId, pageToken, creationId);
  }

  return result;
}

// ────────────────────────────────────────────────────────────────────────────
// Step 8: Auto-reply (Meta webhook)
// ────────────────────────────────────────────────────────────────────────────

export type AutoReplySettings = {
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
  platform: string; // both | facebook | instagram
  match_type: string; // contains | exact | starts_with
  channel: string; // both | comment | message
  active: boolean;
  priority: number;
};

const DEFAULT_REPLY_SETTINGS: AutoReplySettings = {
  enabled: false,
  reply_to_comments: true,
  reply_to_messages: true,
  ai_enabled: true,
  fallback_reply: "Merhaba! Mesajınız için teşekkürler. En kısa sürede size dönüş yapacağız. 📞",
};

/** Normalise Turkish-aware lowercase for keyword matching. */
function normalize(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/i̇/g, "i")
    .trim();
}

/** Pick the first matching active rule for an incoming text. */
export function matchRule(
  rules: AutoReplyRule[],
  text: string,
  platform: "facebook" | "instagram",
  channel: "comment" | "message",
): AutoReplyRule | null {
  const t = normalize(text);
  const sorted = [...rules]
    .filter((r) => r.active)
    .filter((r) => r.platform === "both" || r.platform === platform)
    .filter((r) => r.channel === "both" || r.channel === channel)
    .sort((a, b) => b.priority - a.priority);
  for (const r of sorted) {
    const kw = normalize(r.keyword);
    if (!kw) continue;
    const hit =
      r.match_type === "exact"
        ? t === kw
        : r.match_type === "starts_with"
          ? t.startsWith(kw)
          : t.includes(kw);
    if (hit) return r;
  }
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// Unified Inbox: classify incoming text and record conversations/messages.
// ────────────────────────────────────────────────────────────────────────────

export type Sentiment = "positive" | "neutral" | "negative";
export type Intent = "lead" | "question" | "complaint" | "praise" | "spam" | "other";

const NEG_WORDS = ["kötü", "berbat", "rezalet", "şikayet", "memnun değil", "iğrenç", "dolandır", "çöp", "para iadesi", "iade", "geç kaldı", "gelmedi", "kandır", "pahalı", "sorun", "arıza giderilmedi", "yanıt yok", "ilgilenmiyor"];
const POS_WORDS = ["teşekkür", "harika", "süper", "mükemmel", "çok iyi", "memnun", "eline sağlık", "tavsiye", "kaliteli", "bayıldım", "muhteşem", "sağ olun", "helal"];
const LEAD_WORDS = ["fiyat", "ne kadar", "kaç para", "ücret", "randevu", "ne zaman gelir", "gelebilir misiniz", "teklif", "keşif", "numara", "telefon", "ararsanız", "iletişim", "adres", "bölgenize", "yapıyor musunuz", "bakıyor musunuz", "kombi", "tıkanık", "kaçak", "su kaçağı", "acil"];
const QUESTION_WORDS = ["mı", "mi", "mu", "mü", "nasıl", "nedir", "ne zaman", "nerede", "?"];
const SPAM_WORDS = ["takipçi", "follow", "bitcoin", "kazan", "tıkla", "link", "http://", "https://", "promosyon kodu", "casino", "bahis"];

/** Lightweight Turkish keyword heuristics for sentiment + intent (no AI cost). */
export function classifyIncoming(text: string): { sentiment: Sentiment; intent: Intent } {
  const t = normalize(text);
  const has = (arr: string[]) => arr.some((w) => t.includes(normalize(w)));

  let sentiment: Sentiment = "neutral";
  if (has(NEG_WORDS)) sentiment = "negative";
  else if (has(POS_WORDS)) sentiment = "positive";

  let intent: Intent = "other";
  if (has(SPAM_WORDS)) intent = "spam";
  else if (has(LEAD_WORDS)) intent = "lead";
  else if (sentiment === "negative") intent = "complaint";
  else if (sentiment === "positive") intent = "praise";
  else if (has(QUESTION_WORDS)) intent = "question";

  return { sentiment, intent };
}

type InboxAdmin = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

/**
 * Upsert a conversation and append a message. Inbound messages classify the
 * thread (sentiment/intent), bump unread, and flag negative/lead threads for
 * escalation. Best-effort: never throws.
 */
export async function recordInboxMessage(opts: {
  platform: "facebook" | "instagram";
  channel: "comment" | "message";
  participantId: string | null;
  participantName?: string | null;
  direction: "inbound" | "outbound";
  body: string;
  externalId?: string | null;
  author?: string | null;
}): Promise<string | null> {
  if (!opts.participantId || !opts.body.trim()) return null;
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const admin = supabaseAdmin as InboxAdmin;

    const { data: existing } = await admin
      .from("conversations")
      .select("id, unread_count")
      .eq("platform", opts.platform)
      .eq("channel", opts.channel)
      .eq("participant_id", opts.participantId)
      .maybeSingle();

    const preview = opts.body.slice(0, 180);
    let convoId = (existing as { id?: string } | null)?.id ?? null;

    if (!convoId) {
      const base: Record<string, unknown> = {
        platform: opts.platform,
        channel: opts.channel,
        participant_id: opts.participantId,
        participant_name: opts.participantName ?? null,
        last_message_at: new Date().toISOString(),
        last_message_preview: preview,
        last_direction: opts.direction,
      };
      if (opts.direction === "inbound") {
        const { sentiment, intent } = classifyIncoming(opts.body);
        base.sentiment = sentiment;
        base.intent = intent;
        base.unread_count = 1;
        base.escalated = sentiment === "negative" || intent === "lead";
        base.is_lead = intent === "lead";
      }
      const { data: created } = await admin.from("conversations").insert(base as never).select("id").single();
      convoId = (created as { id?: string } | null)?.id ?? null;
    } else {
      const update: Record<string, unknown> = {
        last_message_at: new Date().toISOString(),
        last_message_preview: preview,
        last_direction: opts.direction,
      };
      if (opts.participantName) update.participant_name = opts.participantName;
      if (opts.direction === "inbound") {
        const { sentiment, intent } = classifyIncoming(opts.body);
        update.sentiment = sentiment;
        update.intent = intent;
        update.status = "open";
        update.unread_count = ((existing as { unread_count?: number } | null)?.unread_count ?? 0) + 1;
        if (sentiment === "negative" || intent === "lead") update.escalated = true;
        if (intent === "lead") update.is_lead = true;
      } else {
        update.unread_count = 0;
      }
      await admin.from("conversations").update(update as never).eq("id", convoId);
    }

    if (convoId) {
      await admin.from("conversation_messages").insert({
        conversation_id: convoId,
        direction: opts.direction,
        body: opts.body,
        external_id: opts.externalId ?? null,
        author: opts.author ?? null,
      } as never);
    }
    return convoId;
  } catch {
    return null;
  }
}

/** Generate an AI reply to a customer comment/message, brand-aware. */
export async function generateReplyAI(
  incoming: string,
  channel: "comment" | "message",
  brand: BrandProfile,
): Promise<string> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const phoneLine = brand.phone ? ` Telefon: ${brand.phone}.` : "";
  const system =
    `Sen İstanbul'daki '${brand.business_name}' su tesisatı firmasının ` +
    `sosyal medya müşteri temsilcisisin. Ton: ${brand.tone}. ` +
    `Tüm yanıtlar ${brand.language === "tr" ? "Türkçe" : brand.language} olmalı.` +
    phoneLine +
    ` Yanıt KISA olmalı (en fazla 2 cümle), samimi ve yardımsever. ` +
    (channel === "comment"
      ? "Bu bir herkese açık yorum yanıtı; nazik teşekkür et ve gerekirse DM/telefona yönlendir."
      : "Bu bir özel mesaj yanıtı; soruyu yanıtla ve randevu/telefon için davet et.");

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: incoming.slice(0, 800) },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI reply failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return json.choices?.[0]?.message?.content?.trim() || brand.default_hashtags;
}

/** Reply to a Facebook/Instagram comment by comment id. */
export async function replyToComment(commentId: string, message: string): Promise<void> {
  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  if (!pageToken) throw new Error("META_PAGE_ACCESS_TOKEN eksik");
  const res = await fetch(`${GRAPH}/${commentId}/comments`, {
    method: "POST",
    body: new URLSearchParams({ message, access_token: pageToken }),
  });
  const data = (await res.json()) as { error?: { message?: string } };
  if (!res.ok || data.error) throw new Error(`Yorum yanıtı: ${data.error?.message ?? res.status}`);
}

/** Send a Facebook Messenger / Instagram DM reply via the Send API. */
export async function sendDirectMessage(recipientId: string, message: string): Promise<void> {
  const pageToken = process.env.META_PAGE_ACCESS_TOKEN;
  if (!pageToken) throw new Error("META_PAGE_ACCESS_TOKEN eksik");
  const res = await fetch(`${GRAPH}/me/messages?access_token=${encodeURIComponent(pageToken)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text: message },
      messaging_type: "RESPONSE",
    }),
  });
  const data = (await res.json()) as { error?: { message?: string } };
  if (!res.ok || data.error) throw new Error(`DM gönderimi: ${data.error?.message ?? res.status}`);
}

type AutoReplyAdmin = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

/**
 * Send an operator reply to a conversation through Meta and record it as an
 * outbound message. Comments reply to the last inbound comment id; DMs send to
 * the participant. Marks the thread read.
 */
export async function sendConversationReplyServer(convoId: string, text: string): Promise<void> {
  const body = text.trim();
  if (!body) throw new Error("Boş mesaj gönderilemez");
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const admin = supabaseAdmin as InboxAdmin;

  const { data: convo } = await admin
    .from("conversations")
    .select("id, platform, channel, participant_id")
    .eq("id", convoId)
    .maybeSingle();
  const c = convo as { platform: string; channel: string; participant_id: string } | null;
  if (!c) throw new Error("Sohbet bulunamadı");

  if (c.channel === "comment") {
    const { data: lastInbound } = await admin
      .from("conversation_messages")
      .select("external_id")
      .eq("conversation_id", convoId)
      .eq("direction", "inbound")
      .not("external_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    const commentId = (lastInbound as { external_id?: string } | null)?.external_id;
    if (!commentId) throw new Error("Yanıtlanacak yorum bulunamadı");
    await replyToComment(commentId, body);
  } else {
    await sendDirectMessage(c.participant_id, body);
  }

  const brand = await loadBrandProfile();
  await recordInboxMessage({
    platform: c.platform as "facebook" | "instagram",
    channel: c.channel as "comment" | "message",
    participantId: c.participant_id,
    direction: "outbound",
    body,
    author: brand.business_name,
  });
}

/** AI-suggest a reply for the latest inbound message of a conversation. */
export async function suggestConversationReplyServer(convoId: string): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const admin = supabaseAdmin as InboxAdmin;
  const { data: convo } = await admin
    .from("conversations")
    .select("channel")
    .eq("id", convoId)
    .maybeSingle();
  const channel = ((convo as { channel?: string } | null)?.channel ?? "message") as "comment" | "message";
  const { data: lastInbound } = await admin
    .from("conversation_messages")
    .select("body")
    .eq("conversation_id", convoId)
    .eq("direction", "inbound")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const incoming = (lastInbound as { body?: string } | null)?.body ?? "";
  if (!incoming) throw new Error("Yanıtlanacak gelen mesaj yok");
  const brand = await loadBrandProfile();
  return generateReplyAI(incoming, channel, brand);
}



/** Resolve the reply text for an incoming event (rule first, then AI, then fallback). */
async function resolveReply(
  settings: AutoReplySettings,
  rules: AutoReplyRule[],
  brand: BrandProfile,
  text: string,
  platform: "facebook" | "instagram",
  channel: "comment" | "message",
): Promise<{ reply: string; ruleId: string | null }> {
  const rule = matchRule(rules, text, platform, channel);
  if (rule) return { reply: rule.response, ruleId: rule.id };
  if (settings.ai_enabled) {
    try {
      return { reply: await generateReplyAI(text, channel, brand), ruleId: null };
    } catch {
      /* fall through to fallback */
    }
  }
  return { reply: settings.fallback_reply, ruleId: null };
}

/**
 * Process one decoded Meta webhook payload. Loads settings/rules/brand from DB,
 * matches/generates a reply, sends it, and logs the outcome. Best-effort: never
 * throws so the webhook always returns 200.
 */
export async function processWebhookPayload(payload: unknown): Promise<{ handled: number }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const admin = supabaseAdmin as AutoReplyAdmin;

  const { data: settingsRow } = await admin
    .from("auto_reply_settings")
    .select("enabled, reply_to_comments, reply_to_messages, ai_enabled, fallback_reply")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  const settings: AutoReplySettings = { ...DEFAULT_REPLY_SETTINGS, ...(settingsRow as Partial<AutoReplySettings> | null) };
  // Note: we no longer early-return when auto-reply is off — the unified inbox
  // must capture every incoming comment/DM regardless of auto-reply settings.

  const { data: ruleRows } = await admin
    .from("auto_reply_rules")
    .select("id, keyword, response, platform, match_type, channel, active, priority")
    .eq("active", true);
  const rules = (ruleRows ?? []) as unknown as AutoReplyRule[];
  const brand = await loadBrandProfile();

  const logRow = async (row: Record<string, unknown>) => {
    try {
      await admin.from("auto_reply_logs").insert(row as never);
    } catch {
      /* ignore log errors */
    }
  };

  const root = payload as { object?: string; entry?: unknown[] };
  const entries = Array.isArray(root.entry) ? root.entry : [];
  const isInstagram = root.object === "instagram";
  const platform: "facebook" | "instagram" = isInstagram ? "instagram" : "facebook";
  let handled = 0;

  for (const entryRaw of entries) {
    const entry = entryRaw as {
      changes?: { field?: string; value?: Record<string, unknown> }[];
      messaging?: Record<string, unknown>[];
    };

    // Comments (feed/comments changes)
    if (Array.isArray(entry.changes)) {
      for (const change of entry.changes) {
        const v = change.value ?? {};
        const item = (v.item as string) ?? "";
        const verb = (v.verb as string) ?? "";
        const isComment = (change.field === "feed" && item === "comment") || change.field === "comments";
        if (!isComment || (verb && verb !== "add")) continue;
        const commentId = (v.comment_id as string) ?? (v.id as string) ?? "";
        const text = (v.message as string) ?? (v.text as string) ?? "";
        const fromId =
          (v.from as { id?: string } | undefined)?.id ?? (v.sender_id as string) ?? null;
        // skip our own page's comments to avoid loops
        const fromName = (v.from as { name?: string } | undefined)?.name ?? "";
        if (!commentId || !text) continue;
        if (fromName && brand.business_name && normalize(fromName) === normalize(brand.business_name)) continue;

        // Always capture the inbound comment in the unified inbox.
        await recordInboxMessage({
          platform, channel: "comment", participantId: fromId, participantName: fromName || null,
          direction: "inbound", body: text, externalId: commentId, author: fromName || null,
        });

        if (!settings.enabled || !settings.reply_to_comments) continue;
        try {
          const { reply, ruleId } = await resolveReply(settings, rules, brand, text, platform, "comment");
          await replyToComment(commentId, reply);
          await logRow({ platform, kind: "comment", sender_id: fromId, incoming_text: text, reply_text: reply, matched_rule_id: ruleId, status: "sent" });
          await recordInboxMessage({ platform, channel: "comment", participantId: fromId, direction: "outbound", body: reply, author: brand.business_name });
          handled++;
        } catch (e) {
          await logRow({ platform, kind: "comment", sender_id: fromId, incoming_text: text, status: "error", error: e instanceof Error ? e.message : "hata" });
        }
      }
    }

    // Direct messages (Messenger / IG DMs)
    if (Array.isArray(entry.messaging)) {
      for (const m of entry.messaging) {
        const msg = m as {
          sender?: { id?: string };
          message?: { text?: string; is_echo?: boolean };
        };
        if (msg.message?.is_echo) continue;
        const senderId = msg.sender?.id ?? null;
        const text = msg.message?.text ?? "";
        if (!senderId || !text) continue;

        // Always capture the inbound DM in the unified inbox.
        await recordInboxMessage({
          platform, channel: "message", participantId: senderId,
          direction: "inbound", body: text, author: null,
        });

        if (!settings.enabled || !settings.reply_to_messages) continue;
        try {
          const { reply, ruleId } = await resolveReply(settings, rules, brand, text, platform, "message");
          await sendDirectMessage(senderId, reply);
          await logRow({ platform, kind: "message", sender_id: senderId, incoming_text: text, reply_text: reply, matched_rule_id: ruleId, status: "sent" });
          await recordInboxMessage({ platform, channel: "message", participantId: senderId, direction: "outbound", body: reply, author: brand.business_name });
          handled++;
        } catch (e) {
          await logRow({ platform, kind: "message", sender_id: senderId, incoming_text: text, status: "error", error: e instanceof Error ? e.message : "hata" });
        }
      }
    }
  }

  return { handled };
}

/**
 * Refresh engagement metrics for all posted posts. Shared by the admin
 * server function and the scheduled cron hook. Best-effort: logs failures
 * per-post and never throws.
 */
export async function refreshAllAnalytics(): Promise<{ updated: number; failed: number }> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: posts } = await supabaseAdmin
    .from("social_posts")
    .select("id, platform, fb_post_id, ig_post_id")
    .eq("status", "posted")
    .limit(200);

  let updated = 0;
  let failed = 0;
  for (const raw of (posts ?? []) as Array<{
    id: string;
    platform: string;
    fb_post_id: string | null;
    ig_post_id: string | null;
  }>) {
    if (!raw.fb_post_id && !raw.ig_post_id) continue;
    try {
      const insights = await fetchPostInsights({ fbPostId: raw.fb_post_id, igPostId: raw.ig_post_id });
      const snapshot = { ...insights, fetched_at: new Date().toISOString() };
      await supabaseAdmin.from("social_posts").update({ analytics: snapshot } as never).eq("id", raw.id);
      await supabaseAdmin.from("post_analytics").insert({
        post_id: raw.id,
        platform: raw.platform,
        likes: insights.likes,
        comments: insights.comments,
        shares: insights.shares,
        reach: insights.reach,
        impressions: insights.impressions,
        engagement: insights.engagement,
      } as never);
      updated++;
    } catch (e) {
      failed++;
      try {
        await supabaseAdmin.from("social_logs").insert({
          post_id: raw.id,
          action: "analytics",
          level: "error",
          message: e instanceof Error ? e.message : "İstatistik alınamadı",
        } as never);
      } catch {
        /* ignore log failure */
      }
    }
  }

  try {
    await supabaseAdmin.from("social_logs").insert({
      post_id: null,
      action: "analytics",
      level: "info",
      message: `Otomatik: ${updated} gönderi güncellendi (${failed} hata)`,
    } as never);
  } catch {
    /* ignore */
  }

  return { updated, failed };
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 3 — Autopilot Queue & Smart Scheduling
// ────────────────────────────────────────────────────────────────────────────

type ScheduleSlot = { platform: string; day_of_week: number; time_of_day: string };

/**
 * Compute the next `count` posting datetimes from the recurring weekly slots
 * in `posting_schedule`, starting strictly after `after`. Falls back to
 * brand best_times if no slots are defined.
 */
export async function nextScheduleSlots(count: number, after: Date = new Date()): Promise<string[]> {
  if (count <= 0) return [];
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data } = await supabaseAdmin
    .from("posting_schedule")
    .select("platform, day_of_week, time_of_day")
    .eq("active", true);

  let slots = ((data ?? []) as unknown as ScheduleSlot[])
    .filter((s) => /^\d{2}:\d{2}$/.test(s.time_of_day))
    .map((s) => ({ dow: Number(s.day_of_week), time: s.time_of_day }));

  // Fallback: brand best_times spread Mon-Sat if no schedule rows exist.
  if (slots.length === 0) {
    const { data: brand } = await supabaseAdmin
      .from("brand_settings")
      .select("best_times")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();
    const times = ((brand as { best_times?: string[] } | null)?.best_times ?? ["09:00", "18:00"]).filter((t) =>
      /^\d{2}:\d{2}$/.test(t),
    );
    slots = [1, 2, 3, 4, 5, 6].flatMap((dow) => times.map((time) => ({ dow, time })));
  }

  const out: string[] = [];
  for (let dayOffset = 0; dayOffset <= 90 && out.length < count; dayOffset++) {
    const day = new Date(after);
    day.setDate(after.getDate() + dayOffset);
    const dow = day.getDay();
    const todays = slots
      .filter((s) => s.dow === dow)
      .map((s) => {
        const [h, m] = s.time.split(":").map(Number);
        const d = new Date(day);
        d.setHours(h, m, 0, 0);
        return d;
      })
      .filter((d) => d.getTime() > after.getTime())
      .sort((a, b) => a.getTime() - b.getTime());
    for (const d of todays) {
      if (out.length >= count) break;
      out.push(d.toISOString());
    }
  }
  return out;
}

export type AutopilotRunResult = {
  ran: boolean;
  reason: string;
  generated: number;
  failed: number;
  queueBefore: number;
  queueAfter: number;
};

/**
 * Core autopilot routine: when the upcoming scheduled queue falls below the
 * configured threshold, generate fresh posts and schedule them into the next
 * available weekly slots. Safe to call from cron or manually.
 */
export async function runAutopilot(opts: { force?: boolean } = {}): Promise<AutopilotRunResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data: settingsRow } = await supabaseAdmin
    .from("autopilot_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const settings = settingsRow as {
    id: string;
    enabled: boolean;
    min_queue: number;
    batch_size: number;
    theme: string | null;
    platform: string;
    voice_profile_id: string | null;
    campaign_id: string | null;
  } | null;

  const nowIso = new Date().toISOString();

  if (!settings) {
    return { ran: false, reason: "no_settings", generated: 0, failed: 0, queueBefore: 0, queueAfter: 0 };
  }

  // Count upcoming scheduled posts.
  const { count: queueBefore } = await supabaseAdmin
    .from("social_posts")
    .select("id", { count: "exact", head: true })
    .eq("status", "scheduled")
    .gte("scheduled_for", nowIso);
  const before = queueBefore ?? 0;

  const stamp = async (summary: string, generated: number) => {
    await supabaseAdmin
      .from("autopilot_settings")
      .update({ last_run_at: nowIso, last_run_summary: summary } as never)
      .eq("id", settings.id);
    return generated;
  };

  // Global kill-switch halts all automation regardless of the autopilot toggle.
  if (!(await isAutomationEnabled())) {
    await stamp("Otomasyon ana şalteri kapalı — üretim yapılmadı", 0);
    return { ran: false, reason: "halted", generated: 0, failed: 0, queueBefore: before, queueAfter: before };
  }

  if (!settings.enabled && !opts.force) {
    return { ran: false, reason: "disabled", generated: 0, failed: 0, queueBefore: before, queueAfter: before };
  }


  if (before >= settings.min_queue && !opts.force) {
    await stamp(`Kuyruk dolu (${before}/${settings.min_queue}) — üretim yapılmadı`, 0);
    return { ran: true, reason: "queue_full", generated: 0, failed: 0, queueBefore: before, queueAfter: before };
  }

  // How many to generate: top the queue back up, capped by batch_size.
  const needed = Math.max(settings.min_queue - before, 0);
  const toMake = Math.min(Math.max(needed, opts.force ? settings.batch_size : 0) || settings.batch_size, settings.batch_size, 10);

  const brand = await loadBrandProfile();
  const persona = await loadVoiceProfile(settings.voice_profile_id);
  const slots = await nextScheduleSlots(toMake);

  // When the target campaign requires approval, queue posts for review instead
  // of scheduling them straight to the publisher.
  let requireApproval = false;
  if (settings.campaign_id) {
    const { data: camp } = await supabaseAdmin
      .from("campaigns")
      .select("require_approval")
      .eq("id", settings.campaign_id)
      .maybeSingle();
    requireApproval = Boolean((camp as { require_approval?: boolean } | null)?.require_approval);
  }

  let generated = 0;
  let failed = 0;
  for (let i = 0; i < toMake; i++) {
    try {
      const angle = settings.theme || CONTENT_ANGLES[Math.floor(Math.random() * CONTENT_ANGLES.length)];
      const content = await generateContentAI(angle, brand, persona);
      const bytes = await generateImageAI(content.imagePrompt);
      const path = `posts/${crypto.randomUUID()}.png`;
      const { error: upErr } = await supabaseAdmin.storage
        .from("social-media")
        .upload(path, bytes, { contentType: "image/png", upsert: true });
      if (upErr) throw new Error(upErr.message);

      const scheduledFor = slots[i] ?? null;
      const status = requireApproval ? "pending_review" : scheduledFor ? "scheduled" : "draft";
      await supabaseAdmin.from("social_posts").insert({
        platform: settings.platform,
        idea: content.idea,
        caption: content.caption,
        hashtags: content.hashtags,
        image_path: path,
        media_paths: [path],
        status,
        scheduled_for: scheduledFor,
        voice_profile_id: settings.voice_profile_id,
        campaign_id: settings.campaign_id,
      } as never);
      generated++;
    } catch (e) {
      failed++;
      try {
        await supabaseAdmin.from("social_logs").insert({
          post_id: null,
          action: "autopilot",
          level: "error",
          message: e instanceof Error ? e.message : "Otomatik üretim hatası",
        } as never);
      } catch {
        /* ignore */
      }
    }
  }

  const queueAfter = before + generated;
  const summary = `${generated} içerik üretildi ve kuyruğa eklendi (${failed} hata)`;
  await stamp(summary, generated);
  try {
    await supabaseAdmin.from("social_logs").insert({
      post_id: null,
      action: "autopilot",
      level: "info",
      message: summary,
    } as never);
  } catch {
    /* ignore */
  }

  return { ran: true, reason: "filled", generated, failed, queueBefore: before, queueAfter };
}





// ────────────────────────────────────────────────────────────────────────────
// Phase 6 — Multi-Platform Expansion
// ────────────────────────────────────────────────────────────────────────────

export type PlatformId = "facebook" | "instagram" | "google_business" | "x" | "linkedin" | "tiktok";

export type ProviderStatus = {
  id: PlatformId;
  label: string;
  /** "live" = wired to a real publisher, "soon" = planned, needs a connector/secret */
  kind: "live" | "soon";
  configured: boolean;
  detail: string;
};

/** Per-platform formatting rules used when generating caption variants. */
const PLATFORM_RULES: Record<PlatformId, string> = {
  facebook:
    "Facebook: 1-2 kısa paragraf, samimi ve bilgilendirici, net çağrı-aksiyon ve telefon daveti. 1-3 hashtag yeterli.",
  instagram:
    "Instagram: enerjik ve görsel odaklı, kısa satırlar, emojiler, 8-15 isabetli hashtag. Çağrı-aksiyon biyografi/DM odaklı.",
  google_business:
    "Google İşletme Profili: yerel SEO odaklı, hizmet + ilçe adı geçsin, profesyonel ve kısa, hashtag yok, net çağrı-aksiyon.",
  x: "X (Twitter): 280 karakter sınırı, tek vurucu cümle, en fazla 2 hashtag, link/telefon kısa.",
  linkedin:
    "LinkedIn: profesyonel ve güven veren ton, uzmanlık vurgusu, 1-2 paragraf, en fazla 3 kurumsal hashtag.",
  tiktok:
    "TikTok: çok kısa, eğlenceli/merak uyandıran caption, trend dili, 3-5 hashtag, çağrı-aksiyon takip odaklı.",
};

const PROVIDER_LABELS: Record<PlatformId, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  google_business: "Google İşletme",
  x: "X (Twitter)",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};

/** Report which publishing providers are configured and which are planned. */
export function getProviderStatuses(): ProviderStatus[] {
  const pageToken = Boolean(process.env.META_PAGE_ACCESS_TOKEN);
  const igId = Boolean(process.env.META_INSTAGRAM_BUSINESS_ID);
  return [
    {
      id: "facebook",
      label: PROVIDER_LABELS.facebook,
      kind: "live",
      configured: pageToken,
      detail: pageToken ? "Bağlı — yayına hazır" : "Meta sayfa erişim anahtarı eksik",
    },
    {
      id: "instagram",
      label: PROVIDER_LABELS.instagram,
      kind: "live",
      configured: pageToken && igId,
      detail: pageToken && igId ? "Bağlı — yayına hazır" : "Instagram iş hesabı kimliği eksik",
    },
    {
      id: "google_business",
      label: PROVIDER_LABELS.google_business,
      kind: "soon",
      configured: false,
      detail: "Yakında — Google İşletme bağlantısı gerekiyor",
    },
    { id: "x", label: PROVIDER_LABELS.x, kind: "soon", configured: false, detail: "Yakında — X API bağlantısı gerekiyor" },
    {
      id: "linkedin",
      label: PROVIDER_LABELS.linkedin,
      kind: "soon",
      configured: false,
      detail: "Yakında — LinkedIn bağlantısı gerekiyor",
    },
    { id: "tiktok", label: PROVIDER_LABELS.tiktok, kind: "soon", configured: false, detail: "Yakında — TikTok bağlantısı gerekiyor" },
  ];
}

export type PlatformVariant = { caption: string; hashtags: string };

/**
 * Generate platform-tailored caption/hashtag variants from one post idea.
 * Returns a map keyed by platform id.
 */
export async function generatePlatformVariantsAI(
  opts: { idea: string; caption: string; hashtags?: string | null; platforms: PlatformId[] },
  brand: BrandProfile = DEFAULT_BRAND,
): Promise<Record<string, PlatformVariant>> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const targets = opts.platforms.length ? opts.platforms : (["facebook", "instagram"] as PlatformId[]);
  const rules = targets.map((p) => `- ${p}: ${PLATFORM_RULES[p]}`).join("\n");
  const phoneLine = brand.phone ? ` İletişim telefonu: ${brand.phone}.` : "";

  const system =
    `Sen '${brand.business_name}' adlı İstanbul tesisat firması için çok platformlu sosyal medya editörüsün. ` +
    `Dil tonu: ${brand.tone}. Tüm metinler ${brand.language === "tr" ? "Türkçe" : brand.language}.${phoneLine} ` +
    "Aynı fikri her platformun kurallarına göre yeniden yaz, kopyala-yapıştır yapma.";

  const user =
    `Fikir: ${opts.idea}\nMevcut metin: ${opts.caption}\nMevcut etiketler: ${opts.hashtags ?? ""}\n\n` +
    `Şu platformlar için ayrı varyant üret. Platform kuralları:\n${rules}\n\n` +
    "Şu JSON formatında dön: { \"" +
    targets[0] +
    "\": {\"caption\": \"...\", \"hashtags\": \"#a #b\"}, ... } sadece istenen platform anahtarlarıyla.";

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI variants failed [${res.status}]: ${body}`);
  }

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: Record<string, { caption?: string; hashtags?: string }> = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }

  const out: Record<string, PlatformVariant> = {};
  for (const p of targets) {
    const v = parsed[p];
    if (v?.caption?.trim()) {
      out[p] = { caption: v.caption.trim(), hashtags: (v.hashtags ?? "").trim() };
    }
  }
  return out;
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 9: A/B Testing — generate distinct caption variants for one idea.
// ────────────────────────────────────────────────────────────────────────────

export type CaptionVariant = { caption: string; hashtags: string };

/**
 * Produce `count` meaningfully different caption variants for a single idea —
 * different hooks, angles, and CTA styles — so they can be A/B tested.
 */
export async function generateCaptionVariantsAI(
  opts: { idea: string; count: number },
  brand: BrandProfile = DEFAULT_BRAND,
  persona: VoiceProfile | null = null,
): Promise<CaptionVariant[]> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const count = Math.min(Math.max(opts.count, 2), 4);
  const phoneLine = brand.phone ? ` İletişim telefonu: ${brand.phone}.` : "";

  const system =
    `Sen '${brand.business_name}' adlı İstanbul tesisat firması için A/B test uzmanı sosyal medya editörüsün. ` +
    `Dil tonu: ${brand.tone}. Tüm metinler ${brand.language === "tr" ? "Türkçe" : brand.language}.${phoneLine}` +
    personaPrompt(persona) +
    " Aynı fikir için belirgin şekilde FARKLI varyantlar üret: her birinde farklı bir açılış kancası, " +
    "farklı duygusal açı (ör. güven, aciliyet, tasarruf, uzmanlık) ve farklı çağrı-aksiyon tarzı olsun. Kopyala-yapıştır yapma.";

  const user =
    `Fikir: ${opts.idea}\n\n` +
    `Bu fikir için ${count} adet birbirinden farklı gönderi varyantı üret. ` +
    `Önerilen marka etiketleri: ${brand.default_hashtags}. ` +
    "Şu JSON formatında dön: {\"variants\": [{\"caption\": \"...\", \"hashtags\": \"#a #b\"}, ...]} " +
    `tam olarak ${count} öğe içersin.`;

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI variants failed [${res.status}]: ${body}`);
  }

  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: { variants?: { caption?: string; hashtags?: string }[] } = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }

  const out: CaptionVariant[] = [];
  for (const v of parsed.variants ?? []) {
    if (v?.caption?.trim()) {
      out.push({ caption: v.caption.trim(), hashtags: (v.hashtags ?? brand.default_hashtags).trim() });
    }
  }
  while (out.length < count) {
    out.push({ caption: `${opts.idea} — Gölge Tesisat ile güvenli çözüm.`, hashtags: brand.default_hashtags });
  }
  return out.slice(0, count);
}

// ────────────────────────────────────────────────────────────────────────────
// Phase 10: Automation Rules Engine, Alerts & Audit (server helpers)
// ────────────────────────────────────────────────────────────────────────────

/** Whether the global automation kill-switch is on (defaults to on if no row). */
export async function isAutomationEnabled(): Promise<boolean> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("automation_settings")
    .select("master_enabled")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!data) return true;
  return (data as { master_enabled?: boolean }).master_enabled !== false;
}

/** Append an entry to the audit log. Best-effort: never throws. */
export async function writeAudit(
  actor: string,
  action: string,
  entity: string | null,
  entityId: string | null,
  detail: string | null,
): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("audit_log")
      .insert({ actor, action, entity, entity_id: entityId, detail } as never);
  } catch {
    /* never break a flow on audit failure */
  }
}

/** Raise an alert. Best-effort. */
export async function createAlert(
  severity: "info" | "warn" | "critical",
  title: string,
  body: string | null,
  ruleId: string | null = null,
): Promise<void> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin
      .from("automation_alerts")
      .insert({ severity, title, body, rule_id: ruleId } as never);
  } catch {
    /* ignore */
  }
}

export type RuleRunResult = { evaluated: number; triggered: number; alerts: number };

type RuleRow = {
  id: string;
  name: string;
  trigger: string;
  threshold: number;
  action: string;
  action_param: string | null;
  active: boolean;
};

/**
 * Evaluate all active automation rules and apply their actions.
 * Triggers:
 *  - failed_publish     → posts in 'failed' status within last 24h ≥ threshold
 *  - low_engagement     → posted items (last 7d) whose engagement < threshold
 *  - negative_comment   → open conversations flagged negative/escalated ≥ threshold
 *  - milestone          → cumulative engagement crosses threshold
 * Actions: notify (alert), pause_autopilot (disable autopilot), auto_reply (info note).
 */
export async function runAutomationRules(): Promise<RuleRunResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  if (!(await isAutomationEnabled())) {
    return { evaluated: 0, triggered: 0, alerts: 0 };
  }

  const { data: ruleRows } = await supabaseAdmin
    .from("automation_rules")
    .select("id, name, trigger, threshold, action, action_param, active")
    .eq("active", true);
  const rules = (ruleRows ?? []) as unknown as RuleRow[];

  let triggered = 0;
  let alerts = 0;
  const since24 = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  for (const rule of rules) {
    let fired = false;
    let alertTitle = "";
    let alertBody = "";
    let severity: "info" | "warn" | "critical" = "warn";

    if (rule.trigger === "failed_publish") {
      const { count } = await supabaseAdmin
        .from("social_posts")
        .select("id", { count: "exact", head: true })
        .eq("status", "failed")
        .gte("updated_at", since24);
      const n = count ?? 0;
      if (n >= Math.max(rule.threshold, 1)) {
        fired = true;
        severity = "critical";
        alertTitle = `${n} gönderi yayınlanamadı`;
        alertBody = `Son 24 saatte ${n} gönderi başarısız oldu (eşik: ${rule.threshold}).`;
      }
    } else if (rule.trigger === "low_engagement") {
      const { data: posts } = await supabaseAdmin
        .from("social_posts")
        .select("id")
        .eq("status", "posted")
        .gte("posted_at", since7d);
      const ids = ((posts ?? []) as { id: string }[]).map((p) => p.id);
      if (ids.length) {
        const { data: an } = await supabaseAdmin
          .from("post_analytics")
          .select("post_id, engagement")
          .in("post_id", ids);
        const byPost = new Map<string, number>();
        for (const a of (an ?? []) as { post_id: string; engagement: number | null }[]) {
          byPost.set(a.post_id, (byPost.get(a.post_id) ?? 0) + (a.engagement ?? 0));
        }
        const low = ids.filter((id) => (byPost.get(id) ?? 0) < rule.threshold).length;
        const minCount = Math.max(Number(rule.action_param) || 0, 1);
        if (low >= minCount) {
          fired = true;
          alertTitle = `${low} gönderi düşük etkileşim aldı`;
          alertBody = `Son 7 günde ${low} gönderi ${rule.threshold} etkileşimin altında kaldı.`;
        }
      }
    } else if (rule.trigger === "negative_comment") {
      const { count } = await supabaseAdmin
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .eq("status", "open")
        .or("sentiment.eq.negative,escalated.eq.true");
      const n = count ?? 0;
      if (n >= Math.max(rule.threshold, 1)) {
        fired = true;
        severity = "critical";
        alertTitle = `${n} olumsuz/öncelikli görüşme açık`;
        alertBody = `Gelen kutusunda ${n} olumsuz veya öncelikli görüşme bekliyor.`;
      }
    } else if (rule.trigger === "milestone") {
      const { data: an } = await supabaseAdmin.from("post_analytics").select("engagement").limit(5000);
      let total = 0;
      for (const a of (an ?? []) as { engagement: number | null }[]) total += a.engagement ?? 0;
      if (total >= rule.threshold && rule.threshold > 0) {
        fired = true;
        severity = "info";
        alertTitle = `🎉 ${total} toplam etkileşime ulaşıldı`;
        alertBody = `Hedef ${rule.threshold} etkileşim aşıldı (güncel: ${total}).`;
      }
    }

    if (!fired) continue;
    triggered++;

    // Throttle: skip if the same rule fired within the last 12h.
    const { data: recent } = await supabaseAdmin
      .from("automation_alerts")
      .select("id")
      .eq("rule_id", rule.id)
      .gte("created_at", new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString())
      .limit(1);
    if ((recent ?? []).length) continue;

    if (rule.action === "pause_autopilot") {
      const { data: ap } = await supabaseAdmin
        .from("autopilot_settings")
        .select("id")
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (ap) {
        await supabaseAdmin
          .from("autopilot_settings")
          .update({ enabled: false } as never)
          .eq("id", (ap as { id: string }).id);
      }
      await writeAudit("system", "autopilot_paused", "rule", rule.id, `Kural '${rule.name}' otopilotu durdurdu`);
      alertBody += " Otopilot otomatik olarak durduruldu.";
    }

    await createAlert(severity, `[${rule.name}] ${alertTitle}`, alertBody, rule.id);
    alerts++;
    await supabaseAdmin
      .from("automation_rules")
      .update({
        last_triggered_at: new Date().toISOString(),
        trigger_count: (await getRuleCount(supabaseAdmin, rule.id)) + 1,
      } as never)
      .eq("id", rule.id);
    await writeAudit("system", "rule_triggered", "rule", rule.id, alertTitle);
  }

  return { evaluated: rules.length, triggered, alerts };
}

async function getRuleCount(
  admin: Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"],
  id: string,
): Promise<number> {
  const { data } = await admin.from("automation_rules").select("trigger_count").eq("id", id).maybeSingle();
  return (data as { trigger_count?: number } | null)?.trigger_count ?? 0;
}

// ============= Idea & Topic Bank =============

export type GeneratedIdea = {
  title: string;
  notes: string;
  service: string;
  platform: string;
  priority: "low" | "medium" | "high";
};

/** Brainstorm a batch of fresh content ideas for the brand's services. */
export async function generateIdeasAI(opts: {
  topic?: string;
  service?: string;
  count?: number;
}): Promise<GeneratedIdea[]> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  const brand = await loadBrandProfile();
  const count = Math.min(Math.max(opts.count ?? 6, 1), 12);

  const system =
    `Sen '${brand.business_name}' adlı İstanbul merkezli su tesisatı, kombi, petek, ` +
    "tıkanıklık açma ve kaçak tespiti firması için sosyal medya strateji uzmanısın. " +
    `Dil: ${brand.language === "tr" ? "Türkçe" : brand.language}. Ton: ${brand.tone}.`;

  const focus = opts.topic?.trim()
    ? `Şu konuya odaklan: ${opts.topic.trim()}.`
    : opts.service?.trim()
      ? `Şu hizmete odaklan: ${opts.service.trim()}.`
      : "Firmanın tüm hizmetlerini kapsayan çeşitli fikirler üret.";

  const user =
    `${focus} ${count} adet özgün sosyal medya içerik fikri üret. ` +
    "Her fikir farklı bir açı veya hizmet hakkında olsun. " +
    'Şu JSON formatında dön: {"ideas": [{"title": "kısa çekici başlık", ' +
    '"notes": "fikrin 1-2 cümle açıklaması", "service": "ilgili hizmet", ' +
    '"platform": "facebook|instagram|both", "priority": "low|medium|high"}]}';

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI ideas failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: { ideas?: GeneratedIdea[] } = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }
  return (parsed.ideas ?? []).slice(0, count).map((i) => ({
    title: i.title?.trim() || "Tesisat içerik fikri",
    notes: i.notes?.trim() || "",
    service: i.service?.trim() || (opts.service ?? ""),
    platform: ["facebook", "instagram", "both"].includes(i.platform) ? i.platform : "both",
    priority: ["low", "medium", "high"].includes(i.priority) ? i.priority : "medium",
  }));
}

// ============= Hashtag & Keyword Studio =============

export type GeneratedHashtagSet = {
  name: string;
  hashtags: string[];
  keywords: string[];
  notes: string;
};

/** Normalize a hashtag string: strip spaces, ensure single leading '#'. */
function normalizeTag(raw: string): string {
  const t = raw.trim().replace(/^#+/, "").replace(/\s+/g, "");
  return t ? `#${t}` : "";
}

/**
 * Generate a niche hashtag + keyword set for the brand's plumbing services.
 * Returns a curated, deduplicated mix of broad, niche and local tags.
 */
export async function generateHashtagSetAI(opts: {
  topic?: string;
  service?: string;
  platform?: string;
  hashtagCount?: number;
  keywordCount?: number;
}): Promise<GeneratedHashtagSet> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  const brand = await loadBrandProfile();
  const hashtagCount = Math.min(Math.max(opts.hashtagCount ?? 18, 5), 30);
  const keywordCount = Math.min(Math.max(opts.keywordCount ?? 10, 3), 20);

  const platform =
    opts.platform && ["facebook", "instagram", "both"].includes(opts.platform)
      ? opts.platform
      : "both";

  const system =
    `Sen '${brand.business_name}' adlı İstanbul merkezli su tesisatı, kombi, petek, ` +
    "tıkanıklık açma ve kaçak tespiti firması için sosyal medya SEO ve hashtag uzmanısın. " +
    `Dil: ${brand.language === "tr" ? "Türkçe" : brand.language}. ` +
    "Hashtag ve anahtar kelimeler Türkçe ve yerel (İstanbul/ilçe) odaklı olmalı.";

  const focus = opts.topic?.trim()
    ? `Odak konu: ${opts.topic.trim()}.`
    : opts.service?.trim()
      ? `Odak hizmet: ${opts.service.trim()}.`
      : "Firmanın genel tesisat hizmetleri için.";

  const user =
    `${focus} Hedef platform: ${platform}. ` +
    `${hashtagCount} adet hashtag üret: geniş, niş ve yerel (İstanbul/ilçe) karışımı olsun, ` +
    "rakip-spam değil gerçekten kullanılan etiketler olsun. " +
    `Ayrıca SEO için ${keywordCount} adet arama anahtar kelimesi üret (hashtag değil, düz kelime öbeği). ` +
    'Şu JSON formatında dön: {"name": "set için kısa açıklayıcı ad", ' +
    '"hashtags": ["#etiket1", "#etiket2", ...], "keywords": ["anahtar kelime 1", ...], ' +
    '"notes": "bu seti ne zaman/nerede kullanmalı, 1 cümle"}';

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI hashtags failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: Partial<GeneratedHashtagSet> = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }

  const hashtags = Array.from(
    new Set((parsed.hashtags ?? []).map(normalizeTag).filter(Boolean)),
  ).slice(0, hashtagCount);
  const keywords = Array.from(
    new Set((parsed.keywords ?? []).map((k) => k.trim()).filter(Boolean)),
  ).slice(0, keywordCount);

  return {
    name:
      parsed.name?.trim() ||
      (opts.service?.trim() || opts.topic?.trim() || "Tesisat hashtag seti"),
    hashtags: hashtags.length
      ? hashtags
      : brand.default_hashtags.split(/\s+/).map(normalizeTag).filter(Boolean),
    keywords,
    notes: parsed.notes?.trim() || "",
  };
}

// ============= Content Templates Library =============

export type GeneratedTemplate = {
  name: string;
  category: string;
  description: string;
  structure: string;
  example_caption: string;
  hashtags: string[];
  cta: string;
};

/**
 * Generate a reusable post template (structure + example) for the brand.
 * Returns a fill-in-the-blanks outline plus an example caption.
 */
export async function generateTemplateAI(opts: {
  category?: string;
  service?: string;
  goal?: string;
}): Promise<GeneratedTemplate> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  const brand = await loadBrandProfile();

  const category = opts.category?.trim() || "general";

  const system =
    `Sen '${brand.business_name}' adlı İstanbul merkezli su tesisatı, kombi, petek, ` +
    "tıkanıklık açma ve kaçak tespiti firması için sosyal medya içerik şablonu uzmanısın. " +
    `Dil: ${brand.language === "tr" ? "Türkçe" : brand.language}. Ton: ${brand.tone}.`;

  const focus = [
    `Şablon türü/kategori: ${category}.`,
    opts.service?.trim() ? `İlgili hizmet: ${opts.service.trim()}.` : "",
    opts.goal?.trim() ? `Amaç: ${opts.goal.trim()}.` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const user =
    `${focus} Tekrar kullanılabilir bir sosyal medya gönderi ŞABLONU üret. ` +
    "Şablon, her seferinde yeniden doldurulabilen bir iskelet olmalı; değişken yerleri " +
    "{köşeli parantez} ile belirt (ör. {hizmet}, {bölge}, {fayda}). " +
    'Şu JSON formatında dön: {"name": "kısa şablon adı", ' +
    '"category": "tips|promo|before-after|emergency|education|testimonial|seasonal|general", ' +
    '"description": "şablonu ne zaman kullanmalı, 1 cümle", ' +
    '"structure": "satır satır gönderi iskeleti, değişkenler {} içinde, \\n ile ayır", ' +
    '"example_caption": "iskelet doldurulmuş gerçek bir örnek gönderi metni", ' +
    '"hashtags": ["#etiket1", "#etiket2"], ' +
    '"cta": "kısa çağrı-aksiyon cümlesi (telefon daveti olabilir)"}';

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI template failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: Partial<GeneratedTemplate> = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }

  const hashtags = Array.from(
    new Set((parsed.hashtags ?? []).map(normalizeTag).filter(Boolean)),
  ).slice(0, 30);

  return {
    name: parsed.name?.trim() || (opts.service?.trim() || "Tesisat şablonu"),
    category: parsed.category?.trim() || category,
    description: parsed.description?.trim() || "",
    structure: parsed.structure?.trim() || "",
    example_caption: parsed.example_caption?.trim() || "",
    hashtags: hashtags.length
      ? hashtags
      : brand.default_hashtags.split(/\s+/).map(normalizeTag).filter(Boolean),
    cta: parsed.cta?.trim() || "",
  };
}

/**
 * Generate a finished post (idea/caption/hashtags) from a saved template's
 * structure. Uses generateContentAI with the template as scaffolding.
 */
export async function generatePostFromTemplateAI(template: {
  name: string;
  category: string;
  service: string | null;
  structure: string;
  example_caption: string | null;
  cta: string | null;
}): Promise<GeneratedContent> {
  const brand = await loadBrandProfile();
  const topic = [
    `Şu içerik şablonunu temel alarak yeni bir gönderi yaz.`,
    `Şablon adı: ${template.name} (kategori: ${template.category}).`,
    template.service ? `Hizmet: ${template.service}.` : "",
    template.structure ? `İskelet:\n${template.structure}` : "",
    template.example_caption ? `Örnek:\n${template.example_caption}` : "",
    template.cta ? `Çağrı-aksiyon: ${template.cta}.` : "",
    "Tüm {değişkenleri} firmaya uygun gerçek değerlerle doldur.",
  ]
    .filter(Boolean)
    .join("\n");
  return generateContentAI(topic, brand);
}

// ============= Trend Radar & Mentions =============

export type GeneratedTrendSignal = {
  title: string;
  summary: string;
  category: string;
  score: number;
  keywords: string[];
  suggested_angle: string;
  sentiment: string;
  platform: string;
};

const TREND_CATEGORIES = ["trend", "mention", "seasonal", "question", "competitor"];
const TREND_SENTIMENTS = ["positive", "neutral", "negative"];
const TREND_PLATFORMS = ["facebook", "instagram", "both"];

/**
 * Generate niche trend / seasonal / FAQ "signals" for the plumbing brand.
 * These are AI-suggested content opportunities (not live scraping) tuned to
 * the season and the brand's Istanbul plumbing services.
 */
export async function generateTrendRadarAI(opts: {
  topic?: string;
  count?: number;
}): Promise<GeneratedTrendSignal[]> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  const brand = await loadBrandProfile();
  const count = Math.min(Math.max(opts.count ?? 6, 1), 12);

  const now = new Date();
  const monthName = now.toLocaleString("tr-TR", { month: "long" });

  const system =
    `Sen '${brand.business_name}' adlı İstanbul merkezli su tesisatı, kombi, petek, ` +
    "tıkanıklık açma ve kaçak tespiti firması için sosyal medya trend ve fırsat analistisin. " +
    `Dil: ${brand.language === "tr" ? "Türkçe" : brand.language}. Ton: ${brand.tone}. ` +
    `Şu an ${monthName} ayındayız; mevsimsel tesisat ihtiyaçlarını dikkate al.`;

  const focus = opts.topic?.trim()
    ? `Şu konuya/temaya odaklan: ${opts.topic.trim()}.`
    : "Mevsime ve sektöre uygun çeşitli içerik fırsatları üret.";

  const user =
    `${focus} ${count} adet güncel sosyal medya içerik fırsatı (trend sinyali) üret. ` +
    "Her sinyal; mevsimsel bir ihtiyaç, sık sorulan bir müşteri sorusu, yükselen bir arama eğilimi " +
    "veya rakip boşluğu olabilir. " +
    'Şu JSON formatında dön: {"signals": [{"title": "kısa çekici başlık", ' +
    '"summary": "neden şimdi önemli, 1-2 cümle", ' +
    '"category": "trend|seasonal|question|competitor|mention", ' +
    '"score": 0-100 arası aciliyet/ilgi puanı, ' +
    '"keywords": ["ilgili", "anahtar", "kelimeler"], ' +
    '"suggested_angle": "bu fırsattan nasıl içerik üretilir, tek cümle", ' +
    '"sentiment": "positive|neutral|negative", ' +
    '"platform": "facebook|instagram|both"}]}';

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI trend radar failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: { signals?: GeneratedTrendSignal[] } = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }
  return (parsed.signals ?? []).slice(0, count).map((s) => ({
    title: s.title?.trim() || "Tesisat içerik fırsatı",
    summary: s.summary?.trim() || "",
    category: TREND_CATEGORIES.includes(s.category) ? s.category : "trend",
    score: Math.min(Math.max(Math.round(Number(s.score) || 50), 0), 100),
    keywords: Array.isArray(s.keywords)
      ? s.keywords.map((k) => (typeof k === "string" ? k.trim() : "")).filter(Boolean).slice(0, 12)
      : [],
    suggested_angle: s.suggested_angle?.trim() || "",
    sentiment: TREND_SENTIMENTS.includes(s.sentiment) ? s.sentiment : "neutral",
    platform: TREND_PLATFORMS.includes(s.platform) ? s.platform : "both",
  }));
}

// ============= Social → Leads Bridge =============


export type LeadScore = {
  id: string;
  score: number;
  reason: string;
  intent: string;
  sentiment: string;
};

export type LeadDraft = {
  name: string;
  phone: string;
  service_slug: string | null;
  district_slug: string | null;
  notes: string;
  summary: string;
};

/**
 * Batch-score inbox conversations for purchase/lead intent. Returns one entry
 * per supplied conversation so the caller can persist the scores.
 */
export async function scoreLeadCandidatesAI(
  items: { id: string; name: string; text: string }[],
): Promise<LeadScore[]> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  if (!items.length) return [];
  const brand = await loadBrandProfile();

  const system =
    `Sen '${brand.business_name}' adlı İstanbul tesisat firması için satış/lead analistisin. ` +
    "Sana sosyal medya mesaj/yorum konuşmaları verilecek. Her konuşmanın bir müşteri adayı (lead) " +
    "olup olmadığını değerlendir. Yüksek puan: fiyat sorma, randevu/usta talebi, acil arıza, telefon " +
    "paylaşımı, ilçe/hizmet belirtme. Düşük puan: genel beğeni, teşekkür, alakasız yorum, spam.";

  const list = items
    .map((it, i) => `${i + 1}. [id:${it.id}] ${it.name}: ${it.text.slice(0, 400)}`)
    .join("\n");

  const user =
    `Aşağıdaki konuşmaları değerlendir:\n${list}\n\n` +
    'Şu JSON formatında dön: {"leads": [{"id": "konuşma id", ' +
    '"score": 0-100 lead olma ihtimali, ' +
    '"reason": "neden, tek kısa cümle Türkçe", ' +
    '"intent": "fiyat|randevu|acil|bilgi|sikayet|diger", ' +
    '"sentiment": "positive|neutral|negative"}]}';

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI lead scoring failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: { leads?: LeadScore[] } = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }
  const valid = new Set(items.map((i) => i.id));
  const intents = ["fiyat", "randevu", "acil", "bilgi", "sikayet", "diger"];
  const sentiments = ["positive", "neutral", "negative"];
  return (parsed.leads ?? [])
    .filter((l) => valid.has(l.id))
    .map((l) => ({
      id: l.id,
      score: Math.min(Math.max(Math.round(Number(l.score) || 0), 0), 100),
      reason: typeof l.reason === "string" ? l.reason.trim().slice(0, 240) : "",
      intent: intents.includes(l.intent) ? l.intent : "diger",
      sentiment: sentiments.includes(l.sentiment) ? l.sentiment : "neutral",
    }));
}

/**
 * Extract structured lead details (name, phone, service, district, notes) from
 * a single conversation transcript. Service/district are matched to the known
 * catalog slugs; anything unmatched comes back null for the admin to pick.
 */
export async function extractLeadDetailsAI(
  transcript: string,
  participantName: string | null,
): Promise<LeadDraft> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

  const serviceList = SERVICES.map((s) => `${s.slug} = ${s.name}`).join("; ");
  const districtList = DISTRICTS.map((d) => `${d.slug} = ${d.name}`).join("; ");

  const system =
    "Sen bir tesisat firması için müşteri adayı bilgisi çıkaran bir asistansın. " +
    "Konuşma metninden randevu/lead için gerekli alanları çıkar. Bilgi yoksa boş bırak.";

  const user =
    `Konuşma katılımcısı: ${participantName ?? "bilinmiyor"}\n` +
    `Konuşma metni:\n${transcript.slice(0, 4000)}\n\n` +
    `Geçerli hizmet slug'ları: ${serviceList}\n` +
    `Geçerli ilçe slug'ları: ${districtList}\n\n` +
    'Şu JSON formatında dön: {"name": "müşteri adı veya boş", ' +
    '"phone": "telefon numarası veya boş", ' +
    '"service_slug": "en uygun hizmet slug veya null", ' +
    '"district_slug": "en uygun ilçe slug veya null", ' +
    '"notes": "talebin kısa özeti Türkçe", ' +
    '"summary": "tek cümlelik lead özeti"}';

  const res = await fetch(`${AI_BASE}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI lead extraction failed [${res.status}]: ${body}`);
  }
  const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  let parsed: Partial<LeadDraft> = {};
  try {
    parsed = JSON.parse(json.choices?.[0]?.message?.content ?? "{}");
  } catch {
    parsed = {};
  }
  const serviceSlug =
    parsed.service_slug && SERVICES.some((s) => s.slug === parsed.service_slug)
      ? parsed.service_slug
      : null;
  const districtSlug =
    parsed.district_slug && DISTRICTS.some((d) => d.slug === parsed.district_slug)
      ? parsed.district_slug
      : null;
  return {
    name: typeof parsed.name === "string" ? parsed.name.trim().slice(0, 120) : "",
    phone: typeof parsed.phone === "string" ? parsed.phone.trim().slice(0, 40) : "",
    service_slug: serviceSlug,
    district_slug: districtSlug,
    notes: typeof parsed.notes === "string" ? parsed.notes.trim().slice(0, 600) : "",
    summary: typeof parsed.summary === "string" ? parsed.summary.trim().slice(0, 240) : "",
  };
}
