// Client-callable server functions for the SEO Blog Writing Agent.
// Thin wrappers only — all logic lives in *.server.ts modules.
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertAdmin, appendProgress } from "./jobs.server";
import { executeStage, loadJob } from "./pipeline.server";
import type { PipelineStepKey, SeoInputType } from "./types";

const STEP_KEYS = new Set<PipelineStepKey>([
  "analyze",
  "research",
  "audit",
  "knowledge",
  "outline",
  "write",
  "seo",
  "qa",
  "publish",
]);

export const createSeoJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { inputType: SeoInputType; inputValue: string }) => {
    const value = (data?.inputValue ?? "").trim();
    if (!value) throw new Error("Bir konu, anahtar kelime, URL veya metin girin.");
    const type: SeoInputType = ["topic", "keyword", "url", "text"].includes(data?.inputType)
      ? data.inputType
      : "topic";
    return { inputType: type, inputValue: value.slice(0, 8000) };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const { data: row, error } = await supabase
      .from("seo_writer_jobs")
      .insert({
        input_type: data.inputType,
        input_value: data.inputValue,
        status: "analyzing",
        language: "tr",
      })
      .select("*")
      .single();
    if (error) throw new Error(`İş oluşturulamadı: ${error.message}`);
    return { job: row };
  });

export const runSeoStage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; step: PipelineStepKey; index?: number }) => {
    if (!data?.id) throw new Error("İş kimliği gerekli.");
    if (!STEP_KEYS.has(data.step)) throw new Error("Geçersiz adım.");
    return { id: data.id, step: data.step, index: Number(data.index ?? 0) };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const job = await loadJob(supabase, data.id);
    try {
      return await executeStage(supabase, job, data.step, data.index);
    } catch (e) {
      const message = (e as Error).message;
      await supabase
        .from("seo_writer_jobs")
        .update({
          status: "error",
          error: message,
          progress_log: appendProgress(job, data.step, `Hata: ${message}`),
        })
        .eq("id", job.id);
      throw new Error(message);
    }
  });

export const listSeoJobs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const { data, error } = await supabase
      .from("seo_writer_jobs")
      .select(
        "id, status, input_type, input_value, scores, published_slug, created_at, updated_at",
      )
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    return { jobs: data ?? [] };
  });

export const getSeoJob = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("İş kimliği gerekli.");
    return { id: data.id };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    return { job: await loadJob(supabase, data.id) };
  });

export const deleteSeoJob = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => {
    if (!data?.id) throw new Error("İş kimliği gerekli.");
    return { id: data.id };
  })
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);
    const { error } = await supabase.from("seo_writer_jobs").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
