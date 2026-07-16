import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, PhoneCall, Zap, TrendingUp, ArrowRight } from "lucide-react";
import { LeadAnalytics } from "@/components/admin/LeadAnalytics";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

type Stats = {
  bookings: number;
  callbacks: number;
  events24h: number;
  topCta: { event_name: string; count: number } | null;
};

function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentCallbacks, setRecentCallbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const [bk, cb, ev, evTop, recB, recC] = await Promise.all([
        supabase.from("bookings").select("id", { count: "exact", head: true }),
        supabase.from("callback_requests").select("id", { count: "exact", head: true }),
        supabase.from("analytics_events").select("id", { count: "exact", head: true }).gte("created_at", dayAgo),
        supabase.from("analytics_events").select("event_name").gte("created_at", dayAgo).limit(1000),
        supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("callback_requests").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      let topCta: Stats["topCta"] = null;
      if (evTop.data) {
        const counts = new Map<string, number>();
        for (const r of evTop.data as { event_name: string }[]) {
          counts.set(r.event_name, (counts.get(r.event_name) ?? 0) + 1);
        }
        const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
        if (sorted.length) topCta = { event_name: sorted[0][0], count: sorted[0][1] };
      }

      setStats({
        bookings: bk.count ?? 0,
        callbacks: cb.count ?? 0,
        events24h: ev.count ?? 0,
        topCta,
      });
      setRecentBookings(recB.data ?? []);
      setRecentCallbacks(recC.data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
          Live overview · {new Date().toLocaleDateString()}
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Command <span className="text-brand-red">Center</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Every lead, callback, and click — captured in real time.
        </p>
      </header>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Kpi
          icon={Calendar}
          label="Bookings"
          value={stats?.bookings ?? "—"}
          accent="from-brand-red/30 to-brand-red/0"
          loading={loading}
        />
        <Kpi
          icon={PhoneCall}
          label="Callbacks"
          value={stats?.callbacks ?? "—"}
          accent="from-brand-green/30 to-brand-green/0"
          loading={loading}
        />
        <Kpi
          icon={Zap}
          label="Events · 24h"
          value={stats?.events24h ?? "—"}
          accent="from-brand-gold/30 to-brand-gold/0"
          loading={loading}
        />
        <Kpi
          icon={TrendingUp}
          label="Top CTA · 24h"
          value={stats?.topCta?.event_name ?? "—"}
          sub={stats?.topCta ? `${stats.topCta.count} clicks` : undefined}
          accent="from-primary/30 to-primary/0"
          loading={loading}
          small
        />
      </div>

      {/* Lead analytics */}
      <LeadAnalytics />

      {/* Recent activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Recent bookings" href="/admin/bookings" emptyLabel="No bookings yet.">
          {recentBookings.map((b) => (
            <ActivityRow
              key={b.id}
              title={`${b.name} · ${b.service_label}`}
              meta={`${b.phone} · ${b.district_name}`}
              time={new Date(b.created_at).toLocaleString()}
              dotClass="bg-brand-red"
            />
          ))}
        </Panel>

        <Panel title="Recent callbacks" href="/admin/callbacks" emptyLabel="No callbacks yet.">
          {recentCallbacks.map((c) => (
            <ActivityRow
              key={c.id}
              title={`${c.name} · ${c.time_slot}`}
              meta={`${c.phone} · ${c.district_name}`}
              time={new Date(c.created_at).toLocaleString()}
              dotClass="bg-brand-green"
            />
          ))}
        </Panel>
      </div>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  accent,
  loading,
  small,
}: {
  icon: typeof Calendar;
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
  loading: boolean;
  small?: boolean;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur transition hover:border-brand-red/30 sm:p-5">
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground transition group-hover:text-brand-red" />
      </div>
      <div className="relative mt-3">
        {loading ? (
          <div className="h-7 w-16 animate-pulse rounded bg-muted" />
        ) : (
          <div className={small ? "truncate text-lg font-extrabold sm:text-xl" : "text-2xl font-extrabold sm:text-3xl"}>
            {value}
          </div>
        )}
        {sub && <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>}
      </div>
    </div>
  );
}

function Panel({
  title,
  href,
  children,
  emptyLabel,
}: {
  title: string;
  href: "/admin/bookings" | "/admin/callbacks";
  emptyLabel: string;
  children: React.ReactNode;
}) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
      <header className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{title}</h2>
        <Link
          to={href}
          className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-brand-red hover:underline"
        >
          All <ArrowRight className="h-3 w-3" />
        </Link>
      </header>
      <div className="divide-y divide-border/30">
        {hasChildren ? children : <div className="p-6 text-center text-sm text-muted-foreground">{emptyLabel}</div>}
      </div>
    </section>
  );
}

function ActivityRow({ title, meta, time, dotClass }: { title: string; meta: string; time: string; dotClass: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotClass}`} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{title}</div>
        <div className="truncate text-xs text-muted-foreground">{meta}</div>
      </div>
      <div className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {time.split(",")[0]}
      </div>
    </div>
  );
}
