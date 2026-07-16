// Server-only pipeline executor for the SEO Writing Agent. One entry point,
// `executeStage`, runs a single stage, persists its output to the job row,
// and advances status. Kept out of the .functions.ts file so the
// server-fn splitter never hits undefined-sibling references.
import type { SupabaseClient } from "@supabase/supabase-js";
import { BLOG_POSTS } from "@/data/blog";
import { callAIJson, FAST_MODEL, SMART_MODEL } from "./ai.server";
import {
  firecrawlSearch,
  firecrawlScrape,
  semrushKeyword,
  hasFirecrawl,
  hasSemrush,
  type ScrapedPage,
} from "./research.server";
import {
  analyzePrompt,
  keywordGapPrompt,
  auditPrompt,
  knowledgePrompt,
  outlinePrompt,
  sectionPrompt,
  seoPrompt,
  qaPrompt,
} from "./prompts.server";
import { appendProgress, buildBlogPost, loadJob, patchJob, slugify } from "./jobs.server";
import type { PipelineStepKey, SeoJob } from "./types";

const STATIC_SLUGS = new Set(BLOG_POSTS.map((p) => p.slug));

async function uniqueSlug(supabase: SupabaseClient, base: string): Promise<string> {
  let slug = slugify(base) || "tesisat-rehberi";
  let n = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const candidate = n === 1 ? slug : `${slug}-${n}`;
    if (!STATIC_SLUGS.has(candidate)) {
      const { data } = await supabase
        .from("blog_posts_generated")
        .select("id")
        .eq("slug", candidate)
        .maybeSingle();
      if (!data) return candidate;
    }
    n++;
    if (n > 50) return `${slug}-${Date.now()}`;
  }
}

export type StageResult = {
  job: SeoJob;
  meta?: { written?: number; total?: number; done?: boolean; slug?: string };
};

export async function executeStage(
  supabase: SupabaseClient,
  jobIn: SeoJob,
  step: PipelineStepKey,
  index = 0,
): Promise<StageResult> {
  let job = jobIn;

  switch (step) {
    case "analyze": {
      const analysis = await callAIJson<Record<string, unknown>>(analyzePrompt(job), {
        model: FAST_MODEL,
      });
      let volume = Number(analysis.estimatedVolume ?? 0) || 0;
      let kdi = Number(analysis.estimatedDifficulty ?? 0) || 0;
      let semrush: unknown = null;
      if (hasSemrush()) {
        const km = await semrushKeyword(String(analysis.primaryKeyword ?? job.input_value));
        semrush = km;
        if (km.primary) {
          volume = km.primary.volume || volume;
          kdi = km.primary.difficulty || kdi;
        }
      }
      job = await patchJob(supabase, job.id, {
        topic_analysis: { ...analysis, volume, kdi, semrush },
        status: "researching",
        progress_log: appendProgress(
          job,
          "analyze",
          `Konu analizi tamam. Anahtar kelime: "${analysis.primaryKeyword}"${
            hasSemrush() ? ` · Semrush hacim ${volume}, KD ${kdi}` : " · Semrush bağlı değil"
          }`,
        ),
      });
      return { job };
    }

    case "research": {
      const topic = (job.topic_analysis ?? {}) as Record<string, unknown>;
      const primary = String(topic.primaryKeyword ?? job.input_value);
      const results = await firecrawlSearch(primary, 8);
      const top = results.slice(0, 5);
      const scraped = (await Promise.all(top.map((r) => firecrawlScrape(r.url)))).filter(
        (p): p is ScrapedPage => p !== null,
      );
      const sem = (topic.semrush ?? null) as {
        related?: { phrase: string }[];
        questions?: { phrase: string }[];
      } | null;
      // Persist live SERP + scraped competitors first so the gap extractor reads them.
      job = await patchJob(supabase, job.id, {
        serp_db: {
          query: primary,
          results,
          relatedSearches: sem?.related?.map((r) => r.phrase) ?? [],
          paaQuestions: sem?.questions?.map((q) => q.phrase) ?? [],
        },
        competitor_db: { pages: scraped },
      });

      // Live keyword-gap extraction from the real SERP + competitor headings.
      // Runs every time SERP data exists, independent of Semrush availability.
      let gaps: Record<string, unknown> | null = null;
      if (results.length > 0) {
        try {
          gaps = await callAIJson<Record<string, unknown>>(keywordGapPrompt(job), {
            model: FAST_MODEL,
          });
        } catch {
          gaps = null;
        }
      }
      const gapCount = Array.isArray(gaps?.keywordGaps) ? (gaps!.keywordGaps as unknown[]).length : 0;

      job = await patchJob(supabase, job.id, {
        serp_db: {
          query: primary,
          results,
          relatedSearches: gaps?.relatedKeywords ?? sem?.related?.map((r) => r.phrase) ?? [],
          paaQuestions: gaps?.questionGaps ?? sem?.questions?.map((q) => q.phrase) ?? [],
          keywordGaps: gaps?.keywordGaps ?? [],
          longTailGaps: gaps?.longTailGaps ?? [],
          subtopicsToCover: gaps?.subtopicsToCover ?? [],
          primaryGap: gaps?.primaryGap ?? null,
        },
        competitor_db: { pages: scraped },
        research_db: {
          firecrawlUsed: hasFirecrawl(),
          semrushUsed: hasSemrush(),
          resultCount: results.length,
          scrapedCount: scraped.length,
          keywordGapCount: gapCount,
          fetchedAt: new Date().toISOString(),
        },
        status: "auditing",
        progress_log: appendProgress(
          job,
          "research",
          hasFirecrawl()
            ? `Canlı SERP: ${results.length} sonuç, ${scraped.length} rakip tarandı · ${gapCount} anahtar kelime boşluğu çıkarıldı.`
            : "Firecrawl bağlı değil — canlı SERP atlandı, AI bilgisiyle devam.",
        ),
      });
      return { job };
    }

    case "audit": {
      const audit = await callAIJson<Record<string, unknown>>(auditPrompt(job), { model: FAST_MODEL });
      const semantic = (audit.semantic ?? {}) as Record<string, unknown>;
      const competitor = (job.competitor_db ?? {}) as Record<string, unknown>;
      job = await patchJob(supabase, job.id, {
        competitor_db: { ...competitor, audit },
        entity_db: { entities: semantic.entities ?? [], lsiKeywords: semantic.lsiKeywords ?? [] },
        statistics_db: { statistics: audit.statistics ?? [] },
        status: "knowledge",
        progress_log: appendProgress(
          job,
          "audit",
          `Rakip denetimi tamam · ${(audit.dashboard as unknown[])?.length ?? 0} rakip skorlandı, içerik boşlukları çıkarıldı.`,
        ),
      });
      return { job };
    }

    case "knowledge": {
      const kb = await callAIJson<Record<string, unknown>>(knowledgePrompt(job), { model: FAST_MODEL });
      job = await patchJob(supabase, job.id, {
        knowledge_base: kb,
        status: "outlining",
        progress_log: appendProgress(
          job,
          "knowledge",
          `Bilgi bankası oluşturuldu · ${(kb.facts as unknown[])?.length ?? 0} bilgi, ${
            (kb.userQuestions as unknown[])?.length ?? 0
          } soru.`,
        ),
      });
      return { job };
    }

    case "outline": {
      const outline = await callAIJson<Record<string, unknown>>(outlinePrompt(job), { model: FAST_MODEL });
      job = await patchJob(supabase, job.id, {
        outline,
        draft: {
          title: outline.h1 ?? "",
          intro: outline.intro ?? "",
          excerpt: outline.excerpt ?? "",
          sections: [],
          faq: [],
        },
        status: "writing",
        progress_log: appendProgress(
          job,
          "outline",
          `Taslak hazır · ${(outline.sections as unknown[])?.length ?? 0} bölüm planlandı.`,
        ),
      });
      return { job };
    }

    case "write": {
      const outline = (job.outline ?? {}) as Record<string, unknown>;
      const sections = (outline.sections as unknown[]) ?? [];
      const total = sections.length;
      if (total === 0) {
        job = await patchJob(supabase, job.id, { status: "optimizing" });
        return { job, meta: { written: 0, total: 0, done: true } };
      }
      const section = await callAIJson<Record<string, unknown>>(sectionPrompt(job, index), {
        model: FAST_MODEL,
        temperature: 0.7,
      });
      const draft = (job.draft ?? {}) as Record<string, unknown>;
      const draftSections = Array.isArray(draft.sections) ? [...(draft.sections as unknown[])] : [];
      draftSections[index] = section;
      const done = index + 1 >= total;
      job = await patchJob(supabase, job.id, {
        draft: { ...draft, sections: draftSections },
        status: done ? "optimizing" : "writing",
        progress_log: appendProgress(job, "write", `Bölüm ${index + 1}/${total} yazıldı.`),
      });
      return { job, meta: { written: index + 1, total, done } };
    }

    case "seo": {
      const seo = await callAIJson<Record<string, unknown>>(seoPrompt(job), { model: FAST_MODEL });
      const draft = (job.draft ?? {}) as Record<string, unknown>;
      job = await patchJob(supabase, job.id, {
        seo_db: seo,
        draft: { ...draft, faq: seo.faq ?? [] },
        status: "qa",
        progress_log: appendProgress(
          job,
          "seo",
          `SEO optimizasyonu tamam · başlık, meta, ${(seo.internalLinks as unknown[])?.length ?? 0} iç link, şema.`,
        ),
      });
      return { job };
    }

    case "qa": {
      const qa = await callAIJson<Record<string, unknown>>(qaPrompt(job), { model: SMART_MODEL });
      const scores = (qa.scores ?? {}) as Record<string, number>;
      job = await patchJob(supabase, job.id, {
        qa_report: qa,
        scores: {
          content: scores.content ?? 0,
          seo: scores.seo ?? 0,
          readability: scores.readability ?? 0,
          publishReadiness: scores.publishReadiness ?? 0,
        },
        status: "publishing",
        progress_log: appendProgress(
          job,
          "qa",
          `Kalite kontrol · yayın hazırlığı %${scores.publishReadiness ?? 0}.`,
        ),
      });
      return { job };
    }

    case "publish": {
      const topic = (job.topic_analysis ?? {}) as Record<string, unknown>;
      const seo = (job.seo_db ?? {}) as Record<string, unknown>;
      const outline = (job.outline ?? {}) as Record<string, unknown>;
      const base = String(seo.slug ?? outline.slug ?? topic.primaryKeyword ?? job.input_value);
      const slug = await uniqueSlug(supabase, base);
      const post = buildBlogPost(job, slug);
      const { error } = await supabase.from("blog_posts_generated").insert({
        slug,
        data: post,
        source_job_id: job.id,
        published: true,
      });
      if (error) throw new Error(`Yayınlama başarısız: ${error.message}`);
      job = await patchJob(supabase, job.id, {
        final: post,
        published_slug: slug,
        status: "done",
        progress_log: appendProgress(job, "publish", `Yayınlandı · /blog/${slug}`),
      });
      return { job, meta: { slug } };
    }

    default:
      throw new Error(`Bilinmeyen adım: ${step}`);
  }
}

// Re-export for the functions file to reload a fresh job before each stage.
export { loadJob };
