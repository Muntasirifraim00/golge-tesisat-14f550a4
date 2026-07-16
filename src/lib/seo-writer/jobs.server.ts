// Server-only helpers for the SEO Writing Agent pipeline: admin gate, job
// read/patch, slug utilities, and assembling the final BlogPost object.
import type { SupabaseClient } from "@supabase/supabase-js";
import { SERVICES } from "@/data/services";
import { BLOG_POSTS, type BlogPost, type BlogSection } from "@/data/blog";
import type { ProgressEntry, SeoJob } from "./types";

const SERVICE_SLUGS = new Set(SERVICES.map((s) => s.slug));

export async function assertAdmin(supabase: SupabaseClient, userId: string): Promise<void> {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(`Yetki kontrolü başarısız: ${error.message}`);
  if (!data) throw new Error("Bu işlem için admin yetkisi gerekiyor.");
}

export async function loadJob(supabase: SupabaseClient, id: string): Promise<SeoJob> {
  const { data, error } = await supabase.from("seo_writer_jobs").select("*").eq("id", id).single();
  if (error) throw new Error(`İş kaydı bulunamadı: ${error.message}`);
  return data as SeoJob;
}

export async function patchJob(
  supabase: SupabaseClient,
  id: string,
  patch: Record<string, unknown>,
): Promise<SeoJob> {
  const { data, error } = await supabase
    .from("seo_writer_jobs")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(`İş kaydı güncellenemedi: ${error.message}`);
  return data as SeoJob;
}

export function appendProgress(job: SeoJob, stage: string, message: string): ProgressEntry[] {
  const log = Array.isArray(job.progress_log) ? job.progress_log : [];
  return [...log, { at: new Date().toISOString(), stage, message }];
}

// Turkish-aware slugifier
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function resolveServiceSlug(candidate?: string): string {
  if (candidate && SERVICE_SLUGS.has(candidate)) return candidate;
  return "tikaniklik-acma"; // safe default hub
}

/** Validate AI-proposed internal links against real published posts. */
export function validInternalLinks(
  links: { slug: string; anchor: string }[] | undefined,
): { slug: string; anchor: string }[] {
  if (!links) return [];
  const known = new Set(BLOG_POSTS.map((p) => p.slug));
  const seen = new Set<string>();
  const out: { slug: string; anchor: string }[] = [];
  for (const l of links) {
    if (!l?.slug || !l?.anchor) continue;
    if (!known.has(l.slug) || seen.has(l.slug)) continue;
    seen.add(l.slug);
    out.push({ slug: l.slug, anchor: l.anchor });
    if (out.length >= 6) break;
  }
  return out;
}

type RawSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: { caption?: string; headers?: string[]; rows?: string[][] };
  chart?: { title?: string; unit?: string; bars?: { label: string; value: number; note?: string }[] };
};

function cleanSection(s: RawSection): BlogSection | null {
  const heading = (s.heading ?? "").trim();
  const paragraphs = (s.paragraphs ?? []).map((p) => String(p).trim()).filter(Boolean);
  if (!heading || paragraphs.length === 0) return null;
  const out: BlogSection = { heading, paragraphs };
  const bullets = (s.bullets ?? []).map((b) => String(b).trim()).filter(Boolean);
  if (bullets.length) out.bullets = bullets;
  if (s.table?.headers?.length && s.table?.rows?.length) {
    out.table = {
      caption: s.table.caption,
      headers: s.table.headers,
      rows: s.table.rows,
    };
  }
  if (s.chart?.bars?.length) {
    out.chart = { title: s.chart.title, unit: s.chart.unit, bars: s.chart.bars };
  }
  return out;
}

const PHONE = "0533 896 05 03";

/** Assemble a render-ready BlogPost from the accumulated job databases. */
export function buildBlogPost(job: SeoJob, slug: string): BlogPost {
  const topic = (job.topic_analysis ?? {}) as Record<string, unknown>;
  const seo = (job.seo_db ?? {}) as Record<string, unknown>;
  const draft = (job.draft ?? {}) as Record<string, unknown>;

  const rawSections = (draft.sections as RawSection[]) ?? [];
  const sections = rawSections.map(cleanSection).filter((x): x is BlogSection => x !== null);

  const totalWords = sections.reduce(
    (n, s) => n + s.paragraphs.join(" ").split(/\s+/).length,
    0,
  );
  const readMin = Math.max(4, Math.round(totalWords / 200));

  const keyword = String(topic.primaryKeyword ?? topic.keyword ?? job.input_value).trim();
  const title = String(seo.h1 ?? draft.title ?? keyword).trim();
  let seoTitle = String(seo.seoTitle ?? title).trim();
  if (seoTitle.length > 46) seoTitle = seoTitle.slice(0, 46).trim();

  let metaDescription = String(seo.metaDescription ?? "").trim();
  if (!metaDescription) {
    metaDescription = `${title} hakkında uzman rehberi. Tel: ${PHONE}.`;
  }
  if (metaDescription.length > 158) metaDescription = metaDescription.slice(0, 158).trim();

  const faqRaw = (draft.faq as { q?: string; a?: string }[]) ?? [];
  const faq = faqRaw
    .map((f) => ({ q: String(f.q ?? "").trim(), a: String(f.a ?? "").trim() }))
    .filter((f) => f.q && f.a)
    .slice(0, 8);

  const now = new Date().toISOString().slice(0, 10);

  return {
    slug,
    title,
    seoTitle,
    keyword,
    volume: Number(topic.volume ?? 0) || 0,
    kdi: Number(topic.kdi ?? topic.difficulty ?? 0) || 0,
    category: String(topic.category ?? "Tesisat Rehberi"),
    readMin,
    published: now,
    updated: now,
    excerpt: String(draft.excerpt ?? metaDescription).slice(0, 200),
    metaDescription,
    serviceSlug: resolveServiceSlug(String(topic.serviceSlug ?? "")),
    intro: String(draft.intro ?? "").trim(),
    sections,
    faq,
    inlineLinks: validInternalLinks(seo.internalLinks as { slug: string; anchor: string }[]),
  };
}
