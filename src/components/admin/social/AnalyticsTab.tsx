import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { BarChart3, Heart, MessageCircle, Share2, Eye, Loader2, RefreshCw, TrendingUp } from "lucide-react";
import { getAnalytics, refreshAnalytics, type AnalyticsSummary } from "@/lib/social.functions";

export function AnalyticsTab({ notify }: { notify: (kind: "ok" | "err", msg: string) => void }) {
  const fetchData = useServerFn(getAnalytics);
  const refresh = useServerFn(refreshAnalytics);

  const [data, setData] = useState<AnalyticsSummary | null>(null);
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

  if (loading) return <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-card/50" />;

  const t = data?.totals;
  const rows = data?.rows ?? [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold">
          <BarChart3 className="h-4 w-4 text-brand-red" /> Performance Analysis
        </div>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40 disabled:opacity-50"
        >
          {refreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Update from Meta
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Heart} label="Likes" value={t?.likes ?? 0} />
        <Stat icon={MessageCircle} label="Comments" value={t?.comments ?? 0} />
        <Stat icon={Share2} label="Shares" value={t?.shares ?? 0} />
        <Stat icon={Eye} label="Reach" value={t?.reach ?? 0} />
      </div>

      <div className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-4">
        <div className="flex items-center gap-2 text-sm font-bold">
          <TrendingUp className="h-4 w-4 text-brand-red" /> Total engagement
        </div>
        <div className="mt-1 text-3xl font-extrabold text-brand-red">{(t?.engagement ?? 0).toLocaleString("tr-TR")}</div>
        <p className="text-xs text-muted-foreground">from {t?.posts ?? 0} published posts</p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
          No posts published yet. After publishing, fetch statistics with "Update from Meta".
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <div className="hidden grid-cols-[1fr_repeat(4,64px)] gap-2 border-b border-border/40 bg-card/50 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:grid">
            <span>Post</span>
            <span className="text-right">Likes</span>
            <span className="text-right">Comments</span>
            <span className="text-right">Reach</span>
            <span className="text-right">Engagement</span>
          </div>
          {rows.map((r) => (
            <div
              key={r.post_id}
              className="grid grid-cols-2 gap-2 border-b border-border/40 bg-card/30 px-4 py-3 last:border-0 sm:grid-cols-[1fr_repeat(4,64px)] sm:items-center"
            >
              <div className="col-span-2 flex items-center gap-2.5 sm:col-span-1">
                {r.image_url ? (
                  <img src={r.image_url} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover" loading="lazy" />
                ) : (
                  <div className="h-9 w-9 shrink-0 rounded-lg bg-background/60" />
                )}
                <span className="truncate text-xs font-semibold">{r.idea ?? "Post"}</span>
              </div>
              <Cell label="Likes" value={r.likes} />
              <Cell label="Comments" value={r.comments} />
              <Cell label="Reach" value={r.reach} />
              <Cell label="Engagement" value={r.engagement} strong />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Heart; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="mt-2 text-2xl font-extrabold">{value.toLocaleString("tr-TR")}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Cell({ label, value, strong }: { label: string; value: number; strong?: boolean }) {
  return (
    <span className="text-xs sm:text-right">
      <span className="text-muted-foreground sm:hidden">{label}: </span>
      <span className={strong ? "font-extrabold text-brand-red" : "font-semibold"}>{value.toLocaleString("tr-TR")}</span>
    </span>
  );
}
