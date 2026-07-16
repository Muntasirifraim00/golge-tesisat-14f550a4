import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  Radar,
  Loader2,
  Sparkles,
  Trash2,
  Wand2,
  Lightbulb,
  Bookmark,
  X,
  Check,
  TrendingUp,
  CalendarDays,
  HelpCircle,
  Swords,
  AtSign,
  Flame,
} from "lucide-react";
import {
  listTrendSignals,
  generateTrendSignals,
  updateTrendSignalStatus,
  deleteTrendSignal,
  convertTrendToIdea,
  type TrendSignal,
} from "@/lib/social.functions";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const CATEGORY_META: Record<
  string,
  { label: string; icon: typeof TrendingUp; cls: string }
> = {
  trend: { label: "Trend", icon: TrendingUp, cls: "border-sky-500/30 bg-sky-500/10 text-sky-300" },
  seasonal: {
    label: "Seasonal",
    icon: CalendarDays,
    cls: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  },
  question: {
    label: "FAQ",
    icon: HelpCircle,
    cls: "border-violet-500/30 bg-violet-500/10 text-violet-300",
  },
  competitor: {
    label: "Competitor",
    icon: Swords,
    cls: "border-rose-500/30 bg-rose-500/10 text-rose-300",
  },
  mention: {
    label: "Mention",
    icon: AtSign,
    cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  },
};

const SENTIMENT_DOT: Record<string, string> = {
  positive: "bg-emerald-400",
  neutral: "bg-muted-foreground",
  negative: "bg-rose-400",
};

type StatusFilter = "active" | "new" | "saved" | "dismissed" | "converted";

export function TrendRadarTab({
  notify,
  onIdeaCreated,
}: {
  notify: Notify;
  onIdeaCreated?: () => void;
}) {
  const fetchSignals = useServerFn(listTrendSignals);
  const generate = useServerFn(generateTrendSignals);
  const setStatus = useServerFn(updateTrendSignalStatus);
  const remove = useServerFn(deleteTrendSignal);
  const convert = useServerFn(convertTrendToIdea);

  const [signals, setSignals] = useState<TrendSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [topic, setTopic] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>("active");

  async function load() {
    setLoading(true);
    try {
      setSignals(await fetchSignals());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load signals");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onGenerate() {
    setAiBusy(true);
    try {
      const res = await generate({ data: { topic, count: 6 } });
      notify("ok", `${res.created} yeni sinyal bulundu`);
      setTopic("");
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Scan failed");
    } finally {
      setAiBusy(false);
    }
  }

  async function onStatus(id: string, status: TrendSignal["status"]) {
    setBusyId(id);
    try {
      await setStatus({ data: { id, status } });
      setSignals((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onConvert(id: string) {
    setBusyId(id);
    try {
      await convert({ data: { id } });
      setSignals((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: "converted" } : s)),
      );
      notify("ok", "Idea Bank'e eklendi 💡");
      onIdeaCreated?.();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Convert failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onDelete(id: string) {
    setBusyId(id);
    try {
      await remove({ data: { id } });
      setSignals((prev) => prev.filter((s) => s.id !== id));
      notify("ok", "Signal deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  const counts = useMemo(
    () => ({
      active: signals.filter((s) => s.status === "new" || s.status === "saved").length,
      new: signals.filter((s) => s.status === "new").length,
      saved: signals.filter((s) => s.status === "saved").length,
      dismissed: signals.filter((s) => s.status === "dismissed").length,
      converted: signals.filter((s) => s.status === "converted").length,
    }),
    [signals],
  );

  const visible = signals.filter((s) =>
    filter === "active" ? s.status === "new" || s.status === "saved" : s.status === filter,
  );

  const FILTERS: { id: StatusFilter; label: string }[] = [
    { id: "active", label: `Active (${counts.active})` },
    { id: "new", label: `New (${counts.new})` },
    { id: "saved", label: `Saved (${counts.saved})` },
    { id: "converted", label: `Converted (${counts.converted})` },
    { id: "dismissed", label: `Dismissed (${counts.dismissed})` },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Radar className="h-5 w-5 text-cyan-400" /> Trend Radar &amp; Mentions
          </h2>
          <p className="text-sm text-muted-foreground">
            Mevsime ve sektöre özel içerik fırsatlarını AI ile keşfet, kaydet ve fikir bankasına gönder.
          </p>
        </div>
      </div>

      {/* AI scan */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Wand2 className="h-4 w-4 text-brand-red" /> Scan for opportunities
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Theme (optional)</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. kış donması, kombi bakımı"
              className={INPUT_CLS}
            />
          </div>
          <button
            onClick={onGenerate}
            disabled={aiBusy}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {aiBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Radar className="h-4 w-4" />}
            Scan radar
          </button>
        </div>
      </div>

      {/* Filters */}
      {!loading && signals.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                filter === f.id
                  ? "border-brand-red/50 bg-brand-red/15 text-brand-red"
                  : "border-border/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : signals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 py-16 text-center text-sm text-muted-foreground">
          Henüz sinyal yok. Yukarıdan radarı tarayın.
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 py-12 text-center text-sm text-muted-foreground">
          Bu filtrede sinyal yok.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((s) => {
            const meta = CATEGORY_META[s.category] ?? CATEGORY_META.trend;
            const Icon = meta.icon;
            return (
              <div
                key={s.id}
                className="flex flex-col rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:border-brand-red/30"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold",
                        meta.cls,
                      )}
                    >
                      <Icon className="h-3 w-3" /> {meta.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className={cn("h-2 w-2 rounded-full", SENTIMENT_DOT[s.sentiment])} />
                      {s.sentiment}
                    </span>
                    {s.ai_generated && (
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-brand-red/30 px-1.5 py-0.5 text-[10px] text-brand-red">
                        <Sparkles className="h-2.5 w-2.5" /> AI
                      </span>
                    )}
                  </div>
                  <ScoreBadge score={s.score} />
                </div>

                <p className="text-sm font-bold">{s.title}</p>
                {s.summary && (
                  <p className="mt-1 text-xs text-muted-foreground">{s.summary}</p>
                )}

                {s.suggested_angle && (
                  <div className="mt-2 rounded-lg border border-border/50 bg-background/40 p-2.5">
                    <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                      <span>{s.suggested_angle}</span>
                    </p>
                  </div>
                )}

                {s.keywords.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {s.keywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-md border border-border/60 bg-background/40 px-1.5 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/40 pt-3">
                  {s.status !== "converted" && (
                    <button
                      onClick={() => onConvert(s.id)}
                      disabled={busyId === s.id}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red/15 px-2.5 py-1.5 text-xs font-semibold text-brand-red transition hover:bg-brand-red/25 disabled:opacity-50"
                    >
                      {busyId === s.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Lightbulb className="h-3.5 w-3.5" />
                      )}
                      To Idea Bank
                    </button>
                  )}
                  {s.status === "converted" && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                      <Check className="h-3.5 w-3.5" /> In Idea Bank
                    </span>
                  )}

                  {s.status !== "saved" && s.status !== "converted" && (
                    <button
                      onClick={() => onStatus(s.id, "saved")}
                      disabled={busyId === s.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground disabled:opacity-50"
                    >
                      <Bookmark className="h-3.5 w-3.5" /> Save
                    </button>
                  )}

                  {s.status !== "dismissed" && s.status !== "converted" && (
                    <button
                      onClick={() => onStatus(s.id, "dismissed")}
                      disabled={busyId === s.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" /> Dismiss
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(s.id)}
                    disabled={busyId === s.id}
                    className="ml-auto rounded-lg p-1.5 text-muted-foreground transition hover:text-destructive disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 70
      ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
      : score >= 40
        ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
        : "border-border/60 bg-background/40 text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-xs font-bold",
        tone,
      )}
      title="Opportunity score"
    >
      <Flame className="h-3.5 w-3.5" />
      {score}
    </span>
  );
}
