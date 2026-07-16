// Shared (client + server safe) types for the SEO Blog Writing Agent.
// Section payloads are intentionally loose (the AI fills rich JSON); a few
// fields are typed where the UI/render depends on them.

export type SeoJobStatus =
  | "queued"
  | "analyzing"
  | "researching"
  | "auditing"
  | "knowledge"
  | "outlining"
  | "writing"
  | "optimizing"
  | "qa"
  | "publishing"
  | "done"
  | "error";

export type SeoInputType = "topic" | "keyword" | "url" | "text";

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
export type JsonObject = { [key: string]: JsonValue };

export type ProgressEntry = { at: string; stage: string; message: string };

export type SeoScores = {
  content: number;
  seo: number;
  readability: number;
  publishReadiness: number;
};

export type OutlineSection = {
  heading: string;
  goal?: string;
  points?: string[];
  table?: boolean;
  chart?: boolean;
};

export type SeoJob = {
  id: string;
  status: SeoJobStatus;
  input_type: SeoInputType;
  input_value: string;
  language: string;
  topic_analysis: JsonObject | null;
  research_db: JsonObject | null;
  serp_db: JsonObject | null;
  competitor_db: JsonObject | null;
  knowledge_base: JsonObject | null;
  statistics_db: JsonObject | null;
  entity_db: JsonObject | null;
  outline: JsonObject | null;
  writing_notes: JsonObject | null;
  draft: JsonObject | null;
  seo_db: JsonObject | null;
  qa_report: JsonObject | null;
  final: JsonObject | null;
  scores: SeoScores | null;
  progress_log: ProgressEntry[];
  error: string | null;
  published_slug: string | null;
  created_at: string;
  updated_at: string;
};

export type SeoJobSummary = Pick<
  SeoJob,
  "id" | "status" | "input_type" | "input_value" | "scores" | "published_slug" | "created_at" | "updated_at"
>;

// Ordered pipeline steps used by the admin UI orchestrator.
export const PIPELINE_STEPS = [
  { key: "analyze", label: "1 · Konu Analizi", status: "analyzing" as const },
  { key: "research", label: "2 · Google Araştırma", status: "researching" as const },
  { key: "audit", label: "3 · Rakip Denetimi", status: "auditing" as const },
  { key: "knowledge", label: "4 · Bilgi Bankası", status: "knowledge" as const },
  { key: "outline", label: "5 · SEO Taslak", status: "outlining" as const },
  { key: "write", label: "6 · İçerik Yazımı", status: "writing" as const },
  { key: "seo", label: "7 · SEO Optimizasyon", status: "optimizing" as const },
  { key: "qa", label: "8 · Kalite Kontrol", status: "qa" as const },
  { key: "publish", label: "9 · Yayınla", status: "publishing" as const },
] as const;

export type PipelineStepKey = (typeof PIPELINE_STEPS)[number]["key"];
