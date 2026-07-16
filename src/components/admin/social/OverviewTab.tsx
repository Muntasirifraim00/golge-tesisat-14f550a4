import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Loader2,
  RefreshCw,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Heart,
  MessageSquare,
  Share2,
  Eye,
  MessageCircle,
  Plug,
  Facebook,
  Instagram,
} from "lucide-react";
import { getDashboardStats, type DashboardStats } from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

export function OverviewTab({ notify }: { notify: Notify }) {
  const fetchStats = useServerFn(getDashboardStats);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setStats(await fetchStats());
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

  if (loading || !stats) {
    return <div className="h-80 animate-pulse rounded-2xl border border-border/60 bg-card/50" />;
  }

  const fmt = (n: number) => n.toLocaleString("tr-TR");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-muted-foreground">System Overview</div>
        <button
          onClick={() => void load()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {/* Post status cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard icon={FileText} label="Draft" value={fmt(stats.posts.draft)} tone="muted" />
        <StatCard icon={Clock} label="Scheduled" value={fmt(stats.posts.scheduled)} tone="amber" />
        <StatCard icon={CheckCircle2} label="Posted" value={fmt(stats.posts.posted)} tone="emerald" />
        <StatCard icon={XCircle} label="Failed" value={fmt(stats.posts.failed)} tone="red" />
      </div>

      {/* Engagement */}
      <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
        <div className="mb-4 text-sm font-bold">Total Engagement</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStat icon={Heart} label="Likes" value={fmt(stats.engagement.likes)} />
          <MiniStat icon={MessageSquare} label="Comments" value={fmt(stats.engagement.comments)} />
          <MiniStat icon={Share2} label="Shares" value={fmt(stats.engagement.shares)} />
          <MiniStat icon={Eye} label="Reach" value={fmt(stats.engagement.reach)} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Upcoming posts */}
        <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold">
            <Clock className="h-4 w-4 text-brand-red" /> Upcoming Posts
          </div>
          {stats.upcoming.length === 0 && (
            <p className="text-sm text-muted-foreground">No scheduled posts.</p>
          )}
          <div className="space-y-2">
            {stats.upcoming.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-3.5 py-2.5"
              >
                {p.platform === "instagram" ? (
                  <Instagram className="h-4 w-4 shrink-0 text-pink-500" />
                ) : (
                  <Facebook className="h-4 w-4 shrink-0 text-blue-500" />
                )}
                <p className="min-w-0 flex-1 truncate text-sm">{p.caption || "—"}</p>
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {p.scheduled_for ? new Date(p.scheduled_for).toLocaleString("tr-TR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-reply + connection */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold">
                <MessageCircle className="h-4 w-4 text-brand-red" /> Auto-Reply
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  stats.autoReply.enabled
                    ? "bg-emerald-500/15 text-emerald-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {stats.autoReply.enabled ? "ON" : "OFF"}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <MiniStat label="Total" value={fmt(stats.autoReply.total)} />
              <MiniStat label="Last 24h" value={fmt(stats.autoReply.last24h)} />
              <MiniStat label="Errors" value={fmt(stats.autoReply.errors)} />
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-bold">
              <Plug className="h-4 w-4 text-brand-red" /> Connection Status
            </div>
            <div className="space-y-2">
              <ConnRow icon={Facebook} label="Facebook Page Token" ok={stats.connection.hasPageToken} />
              <ConnRow icon={Instagram} label="Instagram Business Account" ok={stats.connection.hasInstagramId} />
            </div>
            {stats.lastPostedAt && (
              <p className="mt-3 text-xs text-muted-foreground">
                Last post: {new Date(stats.lastPostedAt).toLocaleString("tr-TR")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const TONES: Record<string, string> = {
  muted: "border-border/60 text-muted-foreground",
  amber: "border-amber-500/40 text-amber-500",
  emerald: "border-emerald-500/40 text-emerald-500",
  red: "border-destructive/40 text-destructive",
};

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
  tone: keyof typeof TONES;
}) {
  return (
    <div className={`rounded-2xl border bg-card/50 p-4 ${TONES[tone]}`}>
      <Icon className="h-5 w-5" />
      <div className="mt-2 text-2xl font-extrabold text-foreground">{value}</div>
      <div className="text-xs font-semibold text-muted-foreground">{label}</div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon?: typeof Heart; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5" />} {label}
      </div>
      <div className="mt-0.5 text-lg font-extrabold">{value}</div>
    </div>
  );
}

function ConnRow({ icon: Icon, label, ok }: { icon: typeof Facebook; label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/40 px-3.5 py-2.5 text-sm">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className={ok ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={`ml-auto inline-flex items-center gap-1 text-xs font-bold ${ok ? "text-emerald-500" : "text-amber-500"}`}>
        {ok ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
        {ok ? "Connected" : "Missing"}
      </span>
    </div>
  );
}
