import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Layers,
  FileCheck2,
  Gauge,
  ArrowUpRight,
  RefreshCw,
  CalendarClock,
  CameraIcon,
  LineChart,
} from "lucide-react";
import {
  getKeywordProgress,
  captureKeywordSnapshot,
  getKeywordHistory,
  type KeywordProgressData,
  type KeywordProgress,
  type KeywordStatus,
  type KeywordHistoryPoint,
} from "@/lib/keyword-progress.functions";

export const Route = createFileRoute("/admin/keywords")({
  component: KeywordProgressPage,
});

function fmtInt(n: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(n));
}
function fmtPos(n: number | null): string {
  return n == null ? "—" : n.toFixed(1);
}

const STATUS_META: Record<KeywordStatus, { label: string; cls: string }> = {
  page1: { label: "Page 1", cls: "border-brand-green/40 bg-brand-green/10 text-brand-green" },
  page2: { label: "Page 2", cls: "border-brand-gold/40 bg-brand-gold/10 text-brand-gold" },
  page3plus: { label: "Page 3+", cls: "border-brand-red/40 bg-brand-red/10 text-brand-red" },
  impressions_only: { label: "Impressions only", cls: "border-primary/40 bg-primary/10 text-primary" },
  no_data: { label: "No data", cls: "border-border bg-muted/30 text-muted-foreground" },
};

function KeywordProgressPage() {
  const fetchProgress = useServerFn(getKeywordProgress);
  const [data, setData] = useState<KeywordProgressData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [history, setHistory] = useState<KeywordHistoryPoint[]>([]);
  const [capturing, setCapturing] = useState(false);
  const [captureMsg, setCaptureMsg] = useState<string | null>(null);
  const fetchHistory = useServerFn(getKeywordHistory);
  const captureSnapshot = useServerFn(captureKeywordSnapshot);

  async function loadHistory() {
    try {
      setHistory(await fetchHistory());
    } catch {
      /* history is best-effort */
    }
  }

  async function onCapture() {
    setCapturing(true);
    setCaptureMsg(null);
    try {
      const res = await captureSnapshot();
      setCaptureMsg(`${res.captured} keywords captured (${res.date}).`);
      await loadHistory();
    } catch (e) {
      setCaptureMsg(e instanceof Error ? e.message : "Capture failed.");
    } finally {
      setCapturing(false);
    }
  }

  async function load(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await fetchProgress();
      setData(res);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch data.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    void load();
    void loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tier1 = useMemo(() => (data?.keywords ?? []).filter((k) => k.tier === 1), [data]);
  const tier2 = useMemo(() => (data?.keywords ?? []).filter((k) => k.tier === 2), [data]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
            Keyword Tracking · last 28 days
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Keyword <span className="text-brand-red">Progress</span>
          </h1>
          <p className="text-sm text-muted-foreground">
            Google ranking, tier status, and indexed pages for target keywords.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex items-center gap-2">
            <button
              onClick={() => void onCapture()}
              disabled={capturing}
              className="inline-flex items-center gap-2 rounded-lg border border-brand-green/40 bg-brand-green/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-brand-green transition hover:bg-brand-green/20 disabled:opacity-50"
            >
              <CameraIcon className={`h-3.5 w-3.5 ${capturing ? "animate-pulse" : ""}`} /> Capture Snapshot
            </button>
            <button
              onClick={() => void load(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold uppercase tracking-widest transition hover:border-brand-red/40 hover:text-brand-red disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
          {captureMsg && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{captureMsg}</span>
          )}
        </div>
      </header>

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl border border-border/60 bg-card/50" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 text-sm text-destructive">
          <p className="font-semibold">Failed to retrieve keyword data.</p>
          <p className="mt-1 break-words text-destructive/80">{error}</p>
        </div>
      )}

      {!loading && data && !data.configured && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 text-sm text-muted-foreground">
          No ranking data because Search Console connection is not configured. Keywords will be automatically tracked once the connector is added.
        </div>
      )}

      {!loading && data && data.configured && (
        <>
          {/* KPI row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <Kpi icon={Target} label="Tracked Keywords" value={fmtInt(data.summary.tracked)} accent="from-primary/30 to-primary/0" />
            <Kpi icon={Trophy} label="On Page 1" value={fmtInt(data.summary.page1)} sub={`${fmtInt(data.summary.ranking)} active keywords`} accent="from-brand-green/30 to-brand-green/0" />
            <Kpi icon={Gauge} label="Avg. Position" value={fmtPos(data.summary.avgPosition)} accent="from-brand-gold/30 to-brand-gold/0" />
            <Kpi
              icon={FileCheck2}
              label="Indexed"
              value={data.coverage.available ? `${fmtInt(data.coverage.indexed)}/${fmtInt(data.coverage.submitted)}` : "—"}
              sub={data.coverage.available ? `${fmtInt(data.coverage.pending)} pending` : "no data"}
              accent="from-brand-red/30 to-brand-red/0"
            />
          </div>

          {/* Movement strip */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <MoveStat icon={TrendingUp} label="Improved" value={data.summary.improved} cls="text-brand-green" />
            <MoveStat icon={TrendingDown} label="Declined" value={data.summary.declined} cls="text-brand-red" />
            <MoveStat icon={ArrowUpRight} label="Impressions" value={data.summary.totalImpressions} cls="text-foreground" fmt />
          </div>

          <HistoryPanel history={history} />

          <TierTable title="Tier 1 — Win first" tier={1} rows={tier1} />
          <TierTable title="Tier 2 — Next target" tier={2} rows={tier2} />

          {data.coverage.available && data.coverage.sitemaps.length > 0 && (
            <CoveragePanel data={data} />
          )}
        </>
      )}
    </div>
  );
}

function HistoryPanel({ history }: { history: KeywordHistoryPoint[] }) {
  if (history.length === 0) {
    return (
      <section className="flex items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/30 p-4 text-sm text-muted-foreground">
        <CalendarClock className="h-4 w-4 shrink-0" />
        No history records yet. Click <span className="font-semibold text-foreground">Capture Snapshot</span> to archive today's rankings — your progress over time will be charted here.
      </section>
    );
  }

  const points = history.filter((h) => h.avgPosition != null);
  const positions = points.map((h) => h.avgPosition as number);
  const min = positions.length ? Math.min(...positions) : 0;
  const max = positions.length ? Math.max(...positions) : 1;
  const range = Math.max(1, max - min);
  const w = 600;
  const h = 120;
  const path = points
    .map((p, i) => {
      const x = points.length === 1 ? w / 2 : (i / (points.length - 1)) * w;
      const y = (((p.avgPosition as number) - min) / range) * (h - 16) + 8;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const latest = history[history.length - 1];

  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur sm:p-5">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
        <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          <LineChart className="h-3.5 w-3.5" /> History Progress · {history.length} records
        </h2>
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Latest avg. pos: <b className="text-foreground">{latest.avgPosition?.toFixed(1) ?? "—"}</b></span>
          <span>Page 1: <b className="text-brand-green">{latest.page1}</b></span>
        </div>
      </header>
      {points.length >= 2 ? (
        <div className="mt-4 overflow-x-auto">
          <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full min-w-[320px]" preserveAspectRatio="none">
            {/* lower position = better; chart inverted so a downward slope = improving rank */}
            <path d={path} fill="none" stroke="currentColor" strokeWidth={2} className="text-brand-green" />
          </svg>
          <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            <span>{points[0].date}</span>
            <span>lower line = better rank</span>
            <span>{points[points.length - 1].date}</span>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">
          At least 2 days of records are needed for the chart. Keep capturing regularly.
        </p>
      )}
    </section>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur transition hover:border-brand-red/30 sm:p-5">
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground transition group-hover:text-brand-red" />
      </div>
      <div className="relative mt-3 text-2xl font-extrabold sm:text-3xl">{value}</div>
      {sub && <div className="relative mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{sub}</div>}
    </div>
  );
}

function MoveStat({
  icon: Icon,
  label,
  value,
  cls,
  fmt,
}: {
  icon: typeof Target;
  label: string;
  value: number;
  cls: string;
  fmt?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur">
      <Icon className={`h-5 w-5 shrink-0 ${cls}`} />
      <div className="min-w-0">
        <div className={`text-lg font-extrabold ${cls}`}>{fmt ? fmtInt(value) : value}</div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function DeltaBadge({ delta }: { delta: number | null }) {
  if (delta == null) return <span className="text-muted-foreground/60">—</span>;
  if (delta === 0)
    return (
      <span className="inline-flex items-center gap-1 text-muted-foreground">
        <Minus className="h-3 w-3" /> 0
      </span>
    );
  // delta < 0 means position number dropped => rank improved
  const improved = delta < 0;
  return (
    <span className={`inline-flex items-center gap-1 font-semibold ${improved ? "text-brand-green" : "text-brand-red"}`}>
      {improved ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      {Math.abs(delta).toFixed(1)}
    </span>
  );
}

function Sparkline({ points }: { points: { position: number | null }[] }) {
  const vals = points.map((p) => p.position).filter((v): v is number => v != null);
  if (vals.length < 2) return <div className="h-6 w-20 rounded bg-muted/20" />;
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = Math.max(1, max - min);
  const w = 80;
  const h = 24;
  // lower position = better => invert so "up" = better visually
  const d = vals
    .map((v, i) => {
      const x = (i / (vals.length - 1)) * w;
      const y = ((v - min) / range) * (h - 4) + 2; // higher number lower on chart
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const trendUp = vals[vals.length - 1] <= vals[0];
  return (
    <svg width={w} height={h} className="overflow-visible">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={1.5} className={trendUp ? "text-brand-green" : "text-brand-red"} />
    </svg>
  );
}

function TierTable({ title, tier, rows }: { title: string; tier: 1 | 2; rows: KeywordProgress[] }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
      <header className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          <Layers className="h-3.5 w-3.5" /> {title}
        </h2>
        <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest ${tier === 1 ? "border-brand-green/40 text-brand-green" : "border-brand-gold/40 text-brand-gold"}`}>
          Tier {tier} · {rows.length}
        </span>
      </header>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead className="bg-background/40 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-bold">Keyword</th>
              <th className="px-4 py-3 text-right font-bold">Volume</th>
              <th className="px-4 py-3 text-right font-bold">KDI</th>
              <th className="px-4 py-3 text-right font-bold">Position</th>
              <th className="px-4 py-3 text-right font-bold">Change</th>
              <th className="px-4 py-3 text-right font-bold">Best</th>
              <th className="px-4 py-3 text-center font-bold">Trend</th>
              <th className="px-4 py-3 text-right font-bold">Imp.</th>
              <th className="px-4 py-3 text-center font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((k) => (
              <tr key={k.keyword} className="border-t border-border/40 transition hover:bg-accent/30">
                <td className="px-4 py-3">
                  <div className="font-semibold">{k.keyword}</div>
                  {k.matchedQuery && k.matchedQuery !== k.keyword && (
                    <div className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground" title={k.matchedQuery}>
                      ↳ {k.matchedQuery}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{fmtInt(k.volume)}</td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{k.kdi}</td>
                <td className="px-4 py-3 text-right font-bold tabular-nums">{fmtPos(k.position)}</td>
                <td className="px-4 py-3 text-right tabular-nums"><DeltaBadge delta={k.positionDelta} /></td>
                <td className="px-4 py-3 text-right tabular-nums text-brand-green">{fmtPos(k.bestPosition)}</td>
                <td className="px-4 py-3 text-center"><div className="flex justify-center"><Sparkline points={k.trend} /></div></td>
                <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">{fmtInt(k.impressions)}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_META[k.status].cls}`}>
                    {STATUS_META[k.status].label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 p-3 md:hidden">
        {rows.map((k) => (
          <article key={k.keyword} className="rounded-xl border border-border/60 bg-card/40 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="font-semibold leading-tight">{k.keyword}</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Volume {fmtInt(k.volume)} · KDI {k.kdi}
                </div>
              </div>
              <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${STATUS_META[k.status].cls}`}>
                {STATUS_META[k.status].label}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-center">
              <Cell label="Pos." value={fmtPos(k.position)} bold />
              <div className="rounded-lg border border-border/40 bg-background/40 px-1 py-1.5">
                <div className="text-sm font-bold"><DeltaBadge delta={k.positionDelta} /></div>
                <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">Change</div>
              </div>
              <Cell label="Best" value={fmtPos(k.bestPosition)} />
              <Cell label="Imp." value={fmtInt(k.impressions)} />
            </div>
            <div className="mt-2 flex justify-center"><Sparkline points={k.trend} /></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Cell({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="rounded-lg border border-border/40 bg-background/40 px-1 py-1.5">
      <div className={`text-sm ${bold ? "font-extrabold" : "font-semibold"}`}>{value}</div>
      <div className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function CoveragePanel({ data }: { data: KeywordProgressData }) {
  const pct = data.coverage.submitted
    ? Math.round((data.coverage.indexed / data.coverage.submitted) * 100)
    : 0;
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur sm:p-5">
      <header className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          <FileCheck2 className="h-3.5 w-3.5" /> Indexing Coverage
        </h2>
        <span className="font-mono text-xs font-bold tabular-nums text-brand-green">%{pct}</span>
      </header>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted/30">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-green/60" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>{fmtInt(data.coverage.indexed)} indexed</span>
        <span>{fmtInt(data.coverage.submitted)} submitted</span>
      </div>
      <ul className="mt-4 divide-y divide-border/30">
        {data.coverage.sitemaps.map((sm) => (
          <li key={sm.path} className="flex items-center justify-between gap-3 py-2 text-sm">
            <span className="min-w-0 flex-1 truncate font-mono text-xs" title={sm.path}>{sm.path}</span>
            {sm.isPending ? (
              <span className="shrink-0 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2 py-0.5 text-[10px] font-bold text-brand-gold">Processing</span>
            ) : (
              <span className="shrink-0 rounded-full border border-brand-green/40 bg-brand-green/10 px-2 py-0.5 text-[10px] font-bold text-brand-green">Complete</span>
            )}
            {(sm.errors > 0 || sm.warnings > 0) && (
              <span className="shrink-0 font-mono text-[10px] text-brand-red">{sm.errors}E · {sm.warnings}W</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
