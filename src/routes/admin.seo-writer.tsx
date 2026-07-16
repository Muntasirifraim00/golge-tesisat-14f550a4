import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  PenLine,
  Loader2,
  Play,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  createSeoJob,
  runSeoStage,
  listSeoJobs,
  getSeoJob,
  deleteSeoJob,
} from "@/lib/seo-writer/seo-writer.functions";
import { PIPELINE_STEPS, type SeoInputType, type SeoJob, type SeoJobSummary } from "@/lib/seo-writer/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/seo-writer")({
  component: SeoWriterPage,
});

const INPUT_TYPES: { value: SeoInputType; label: string; placeholder: string }[] = [
  { value: "topic", label: "Konu", placeholder: "Örn: Kombi peteği nasıl temizlenir" },
  { value: "keyword", label: "Anahtar Kelime", placeholder: "Örn: petek temizliği fiyatları" },
  { value: "url", label: "URL", placeholder: "https://rakip-site.com/makale" },
  { value: "text", label: "Metin", placeholder: "İşlenecek ham metni buraya yapıştırın…" },
];

const STEP_KEYS = PIPELINE_STEPS.map((s) => s.key);

function statusLabel(status: string): string {
  const step = PIPELINE_STEPS.find((s) => s.status === status);
  if (step) return step.label;
  if (status === "done") return "Tamamlandı";
  if (status === "error") return "Hata";
  if (status === "queued") return "Sırada";
  return status;
}

function SeoWriterPage() {
  const create = useServerFn(createSeoJob);
  const runStage = useServerFn(runSeoStage);
  const list = useServerFn(listSeoJobs);
  const getJob = useServerFn(getSeoJob);
  const removeJob = useServerFn(deleteSeoJob);

  const [jobs, setJobs] = useState<SeoJobSummary[]>([]);
  const [active, setActive] = useState<SeoJob | null>(null);
  const [inputType, setInputType] = useState<SeoInputType>("topic");
  const [inputValue, setInputValue] = useState("");
  const [running, setRunning] = useState(false);
  const [creating, setCreating] = useState(false);
  const cancelRef = useRef(false);

  const refreshList = useCallback(async () => {
    try {
      const { jobs } = await list();
      setJobs(jobs as unknown as SeoJobSummary[]);
    } catch (e) {
      toast.error((e as Error).message);
    }
  }, [list]);

  useEffect(() => {
    void refreshList();
  }, [refreshList]);

  const openJob = useCallback(
    async (id: string) => {
      try {
        const { job } = await getJob({ data: { id } });
        setActive(job as unknown as SeoJob);
      } catch (e) {
        toast.error((e as Error).message);
      }
    },
    [getJob],
  );

  // Runs the full 9-step pipeline for a job, looping the "write" step until
  // every section is drafted. Stops on cancel or error.
  const runPipeline = useCallback(
    async (jobId: string) => {
      setRunning(true);
      cancelRef.current = false;
      try {
        for (const step of STEP_KEYS) {
          if (cancelRef.current) break;
          if (step === "write") {
            let index = 0;
            // eslint-disable-next-line no-constant-condition
            while (true) {
              if (cancelRef.current) break;
              const res = await runStage({ data: { id: jobId, step, index } });
              setActive(res.job as unknown as SeoJob);
              if (res.meta?.done) break;
              index = res.meta?.written ?? index + 1;
            }
          } else {
            const res = await runStage({ data: { id: jobId, step } });
            setActive(res.job as unknown as SeoJob);
          }
        }
        await refreshList();
        const fresh = await getJob({ data: { id: jobId } });
        setActive(fresh.job as unknown as SeoJob);
        if (fresh.job.status === "done") {
          toast.success("Blog yazısı oluşturuldu ve yayınlandı.");
        }
      } catch (e) {
        toast.error((e as Error).message);
        await openJob(jobId);
      } finally {
        setRunning(false);
      }
    },
    [runStage, refreshList, getJob, openJob],
  );

  async function handleCreate() {
    const value = inputValue.trim();
    if (!value) {
      toast.error("Bir konu, anahtar kelime, URL veya metin girin.");
      return;
    }
    setCreating(true);
    try {
      const { job } = await create({ data: { inputType, inputValue: value } });
      setActive(job as unknown as SeoJob);
      setInputValue("");
      await refreshList();
      await runPipeline(job.id);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu işi silmek istediğinize emin misiniz?")) return;
    try {
      await removeJob({ data: { id } });
      if (active?.id === id) setActive(null);
      await refreshList();
    } catch (e) {
      toast.error((e as Error).message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/12 text-brand-red ring-1 ring-inset ring-brand-red/20">
          <PenLine className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold leading-tight">AI Blog Yazarı</h1>
          <p className="text-sm text-muted-foreground">
            Konu ver → araştırma, taslak, SEO ve kalite kontrolden geçir → otomatik yayınla.
          </p>
        </div>
      </div>

      {/* Composer */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-5">
        <div className="flex flex-wrap gap-2">
          {INPUT_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setInputType(t.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition",
                inputType === t.value
                  ? "border-brand-red/50 bg-brand-red/12 text-brand-red"
                  : "border-border/60 bg-card/50 text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={INPUT_TYPES.find((t) => t.value === inputType)?.placeholder}
          rows={inputType === "text" ? 6 : 2}
          className="mt-3 w-full resize-y rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-brand-red"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={handleCreate}
            disabled={creating || running}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-bold text-white transition disabled:opacity-50"
          >
            {creating || running ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {running ? "Yazılıyor…" : "Yazıyı Oluştur"}
          </button>
          {running && (
            <button
              onClick={() => {
                cancelRef.current = true;
              }}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Durdur
            </button>
          )}
          <button
            onClick={() => void refreshList()}
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Yenile
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Jobs list */}
        <div className="space-y-2">
          <h2 className="px-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
            İşler ({jobs.length})
          </h2>
          {jobs.length === 0 && (
            <p className="rounded-xl border border-border/60 bg-card/40 p-4 text-center text-xs text-muted-foreground">
              Henüz iş yok.
            </p>
          )}
          {jobs.map((j) => (
            <button
              key={j.id}
              onClick={() => void openJob(j.id)}
              className={cn(
                "flex w-full items-start gap-2 rounded-xl border p-3 text-left transition",
                active?.id === j.id
                  ? "border-brand-red/50 bg-brand-red/8"
                  : "border-border/60 bg-card/40 hover:border-brand-red/30",
              )}
            >
              <span className="mt-0.5">
                {j.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4 text-brand-green" />
                ) : j.status === "error" ? (
                  <AlertTriangle className="h-4 w-4 text-brand-red" />
                ) : (
                  <Loader2 className="h-4 w-4 text-muted-foreground" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{j.input_value}</span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                  {statusLabel(j.status)} · {new Date(j.created_at).toLocaleDateString("tr-TR")}
                </span>
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  void handleDelete(j.id);
                }}
                aria-label="Sil"
                className="text-muted-foreground hover:text-brand-red"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </button>
          ))}
        </div>

        {/* Active job detail */}
        <div>
          {!active ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-border/60 text-sm text-muted-foreground">
              Bir iş seçin veya yeni bir yazı oluşturun.
            </div>
          ) : (
            <JobDetail
              job={active}
              running={running}
              onResume={() => void runPipeline(active.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function JobDetail({
  job,
  running,
  onResume,
}: {
  job: SeoJob;
  running: boolean;
  onResume: () => void;
}) {
  const currentIdx = PIPELINE_STEPS.findIndex((s) => s.status === job.status);
  const log = job.progress_log ?? [];

  return (
    <div className="space-y-5 rounded-2xl border border-border/60 bg-card/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-lg font-extrabold">{job.input_value}</h2>
          <p className="text-xs text-muted-foreground">{statusLabel(job.status)}</p>
        </div>
        <div className="flex items-center gap-2">
          {job.published_slug && (
            <a
              href={`/blog/${job.published_slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-green/15 px-3 py-2 text-xs font-bold text-brand-green"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Yazıyı Gör
            </a>
          )}
          {job.status === "error" && !running && (
            <button
              onClick={onResume}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-3 py-2 text-xs font-bold text-white"
            >
              <Play className="h-3.5 w-3.5" /> Devam Et
            </button>
          )}
        </div>
      </div>

      {/* Pipeline steps */}
      <ol className="grid gap-1.5 sm:grid-cols-3">
        {PIPELINE_STEPS.map((s, i) => {
          const isDone = job.status === "done" || (currentIdx >= 0 && i < currentIdx);
          const isCurrent = i === currentIdx && job.status !== "done" && job.status !== "error";
          return (
            <li
              key={s.key}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[11px] font-semibold",
                isDone
                  ? "border-brand-green/30 bg-brand-green/8 text-brand-green"
                  : isCurrent
                    ? "border-brand-red/40 bg-brand-red/8 text-brand-red"
                    : "border-border/50 bg-card/30 text-muted-foreground",
              )}
            >
              {isDone ? (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              ) : isCurrent && running ? (
                <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
              ) : (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
              )}
              <span className="truncate">{s.label}</span>
            </li>
          );
        })}
      </ol>

      {job.error && (
        <div className="flex items-start gap-2 rounded-lg border border-brand-red/30 bg-brand-red/8 p-3 text-xs text-brand-red">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{job.error}</span>
        </div>
      )}

      {/* Scores */}
      {job.scores && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "İçerik", value: job.scores.content },
            { label: "SEO", value: job.scores.seo },
            { label: "Okunabilirlik", value: job.scores.readability },
            { label: "Yayın", value: job.scores.publishReadiness },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border/60 bg-background/40 p-3 text-center">
              <div className="text-xl font-extrabold">{m.value}</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Progress log */}
      {log.length > 0 && (
        <div className="max-h-64 overflow-y-auto rounded-xl border border-border/60 bg-background/40 p-3">
          <ul className="space-y-1.5 font-mono text-[11px]">
            {[...log].reverse().map((entry, i) => (
              <li key={i} className="flex gap-2 text-muted-foreground">
                <span className="shrink-0 text-muted-foreground/50">
                  {new Date(entry.at).toLocaleTimeString("tr-TR")}
                </span>
                <span className="text-foreground/80">{entry.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
