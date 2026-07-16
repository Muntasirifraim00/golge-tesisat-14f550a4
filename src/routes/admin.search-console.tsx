import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { Search, MousePointerClick, Eye, Percent, Gauge, ArrowUpRight } from "lucide-react";
import { getSearchConsoleStats, type SearchConsoleStats } from "@/lib/search-console.functions";

export const Route = createFileRoute("/admin/search-console")({
  component: SearchConsolePage,
});

function fmtInt(n: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(n));
}
function fmtPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}
function fmtPos(n: number): string {
  return n ? n.toFixed(1) : "—";
}

function SearchConsolePage() {
  const fetchStats = useServerFn(getSearchConsoleStats);
  const [data, setData] = useState<SearchConsoleStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetchStats();
        setData(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to retrieve data.");
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchStats]);

  const maxClicks = useMemo(
    () => Math.max(1, ...(data?.byDate ?? []).map((r) => r.clicks)),
    [data],
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
          Google Search Console · last 28 days
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Search <span className="text-brand-red">Performance</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          golgetesisat.com — Clicks, impressions, and rankings on Google.
        </p>
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
          <p className="font-semibold">Failed to retrieve Search Console data.</p>
          <p className="mt-1 break-words text-destructive/80">{error}</p>
        </div>
      )}

      {!loading && data && !data.configured && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 text-sm text-muted-foreground">
          The Search Console connection has not been configured yet. Data will appear here after the connector is added.
        </div>
      )}

      {!loading && data && data.configured && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            <Kpi icon={MousePointerClick} label="Clicks" value={fmtInt(data.totals.clicks)} accent="from-brand-red/30 to-brand-red/0" />
            <Kpi icon={Eye} label="Impressions" value={fmtInt(data.totals.impressions)} accent="from-brand-green/30 to-brand-green/0" />
            <Kpi icon={Percent} label="Avg. CTR" value={fmtPct(data.totals.ctr)} accent="from-brand-gold/30 to-brand-gold/0" />
            <Kpi icon={Gauge} label="Avg. Position" value={fmtPos(data.totals.position)} accent="from-primary/30 to-primary/0" />
          </div>

          {data.byDate.length > 0 && (
            <section className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur sm:p-5">
              <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Daily Clicks
              </h2>
              <div className="mt-4 flex h-32 items-end gap-1">
                {data.byDate.map((r) => (
                  <div
                    key={r.keys[0]}
                    className="flex-1 rounded-t bg-brand-red/70 transition hover:bg-brand-red"
                    style={{ height: `${Math.max(2, (r.clicks / maxClicks) * 100)}%` }}
                    title={`${r.keys[0]}: ${fmtInt(r.clicks)} clicks`}
                  />
                ))}
              </div>
            </section>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <TablePanel title="Top search queries" icon={Search} rows={data.topQueries} labelKey={(r) => r.keys[0]} />
            <TablePanel
              title="Top clicked pages"
              icon={ArrowUpRight}
              rows={data.topPages}
              labelKey={(r) => r.keys[0].replace("https://golgetesisat.com", "") || "/"}
            />
          </div>
        </>
      )}
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Search;
  label: string;
  value: string;
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
    </div>
  );
}

function TablePanel({
  title,
  icon: Icon,
  rows,
  labelKey,
}: {
  title: string;
  icon: typeof Search;
  rows: SearchConsoleStats["topQueries"];
  labelKey: (r: SearchConsoleStats["topQueries"][number]) => string;
}) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
      <header className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <h2 className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          <Icon className="h-3.5 w-3.5" /> {title}
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">Clicks · Impr · Pos</span>
      </header>
      <div className="divide-y divide-border/30">
        {rows.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No data yet.</div>}
        {rows.map((r) => (
          <div key={labelKey(r)} className="flex items-center gap-3 px-4 py-2.5">
            <span className="min-w-0 flex-1 truncate text-sm font-medium" title={labelKey(r)}>
              {labelKey(r)}
            </span>
            <span className="shrink-0 font-mono text-xs tabular-nums text-foreground">{fmtInt(r.clicks)}</span>
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{fmtInt(r.impressions)}</span>
            <span className="shrink-0 font-mono text-xs tabular-nums text-brand-green">{fmtPos(r.position)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
