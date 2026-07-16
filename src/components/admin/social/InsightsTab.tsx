import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  Lightbulb,
  Loader2,
  TrendingUp,
  TrendingDown,
  Download,
  Sparkles,
  Clock,
  CalendarDays,
  Film,
  Drama,
  Megaphone,
  RefreshCw,
} from "lucide-react";
import {
  getInsights,
  refreshAnalytics,
  type InsightsReport,
  type Breakdown,
  type AutoInsight,
} from "@/lib/social.functions";

export function InsightsTab({ notify }: { notify: (kind: "ok" | "err", msg: string) => void }) {
  const fetchData = useServerFn(getInsights);
  const refresh = useServerFn(refreshAnalytics);

  const [data, setData] = useState<InsightsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function load() {
    try {
      setData(await fetchData());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onRefresh() {
    setRefreshing(true);
    try {
      const res = await refresh();
      notify("ok", `${res.updated} posts updated${res.failed ? `, ${res.failed} errors` : ""}`);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to update");
    } finally {
      setRefreshing(false);
    }
  }

  function exportCsv() {
    if (!data) return;
    const lines: string[] = [];
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    lines.push("Section,Key,Posts,Total Engagement,Average,Reach");
    const section = (name: string, rows: Breakdown[]) => {
      for (const r of rows) lines.push([name, r.label, r.posts, r.engagement, r.avg, r.reach].map(esc).join(","));
    };
    section("Format", data.byFormat);
    section("Hour", data.byHour);
    section("Day", data.byDay);
    section("Persona", data.byPersona);
    section("Campaign", data.byCampaign);
    lines.push("");
    lines.push("Date,Engagement,Reach,Posts");
    for (const t of data.trend) lines.push([t.date, t.engagement, t.reach, t.posts].map(esc).join(","));
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `social-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    notify("ok", "CSV downloaded");
  }

  if (loading) return <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-card/50" />;

  const d = data!;
  const t = d.totals;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Lightbulb className="h-4 w-4 text-brand-red" /> Insights and Trends
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            disabled={t.posts === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40 disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40 disabled:opacity-50"
          >
            {refreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Update from Meta
          </button>
        </div>
      </div>

      {/* Auto-insights */}
      <div className="grid gap-3 sm:grid-cols-2">
        {d.insights.map((ins, i) => (
          <InsightCard key={i} ins={ins} />
        ))}
      </div>

      {/* Totals */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Posts" value={t.posts} />
        <Stat label="Total Engagement" value={t.engagement} accent />
        <Stat label="Avg. / Post" value={t.avgEngagement} />
        <Stat label="Reach" value={t.reach} />
      </div>

      {/* Trend chart */}
      <TrendChart points={d.trend} />

      {/* Breakdowns */}
      <div className="grid gap-4 lg:grid-cols-2">
        <BreakdownCard icon={Film} title="By format" rows={d.byFormat} unit="avg." />
        <BreakdownCard icon={Clock} title="By hour" rows={d.byHour.slice(0, 6)} unit="avg." />
        <BreakdownCard icon={CalendarDays} title="By day" rows={d.byDay} unit="avg." />
        <BreakdownCard icon={Drama} title="By persona" rows={d.byPersona} unit="avg." />
        <BreakdownCard icon={Megaphone} title="By campaign" rows={d.byCampaign} unit="total" valueKey="engagement" />
      </div>
    </div>
  );
}

function InsightCard({ ins }: { ins: AutoInsight }) {
  const tone =
    ins.tone === "good"
      ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400"
      : ins.tone === "warn"
        ? "border-amber-500/30 bg-amber-500/5 text-amber-600 dark:text-amber-400"
        : "border-brand-red/25 bg-brand-red/5 text-brand-red";
  const Icon = ins.tone === "warn" ? TrendingDown : ins.tone === "good" ? TrendingUp : Sparkles;
  return (
    <div className={`flex items-start gap-2.5 rounded-2xl border p-3.5 ${tone}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="text-xs font-semibold leading-relaxed text-foreground/90">{ins.text}</p>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${accent ? "border-brand-red/30 bg-brand-red/5" : "border-border/60 bg-card/40"}`}>
      <div className={`text-2xl font-extrabold ${accent ? "text-brand-red" : ""}`}>{value.toLocaleString("en-US")}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function TrendChart({ points }: { points: InsightsReport["trend"] }) {
  const max = useMemo(() => Math.max(1, ...points.map((p) => p.engagement)), [points]);
  if (points.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
        Not enough data for trend chart.
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5" /> Engagement trend
      </div>
      <div className="flex h-36 items-end gap-1.5">
        {points.map((p) => (
          <div key={p.date} className="group relative flex flex-1 flex-col items-center justify-end">
            <div
              className="w-full rounded-t bg-brand-red/70 transition group-hover:bg-brand-red"
              style={{ height: `${Math.max(4, (p.engagement / max) * 100)}%` }}
            />
            <div className="pointer-events-none absolute -top-8 z-10 hidden whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-bold text-background group-hover:block">
              {p.engagement.toLocaleString("en-US")} · {new Date(p.date).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BreakdownCard({
  icon: Icon,
  title,
  rows,
  unit,
  valueKey = "avg",
}: {
  icon: typeof Film;
  title: string;
  rows: Breakdown[];
  unit: string;
  valueKey?: "avg" | "engagement";
}) {
  const max = Math.max(1, ...rows.map((r) => r[valueKey]));
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-bold">
        <Icon className="h-3.5 w-3.5 text-brand-red" /> {title}
      </div>
      {rows.length === 0 ? (
        <p className="py-4 text-center text-xs text-muted-foreground">No data</p>
      ) : (
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div key={r.key}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold">{r.label}</span>
                <span className="text-muted-foreground">
                  {r[valueKey].toLocaleString("en-US")} <span className="text-[10px]">{unit}</span>
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-background/60">
                <div className="h-full rounded-full bg-brand-red/70" style={{ width: `${(r[valueKey] / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
