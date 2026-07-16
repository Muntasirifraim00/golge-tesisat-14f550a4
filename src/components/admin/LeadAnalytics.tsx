import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, MapPin, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Row = { created_at: string; status: string | null; district_name: string | null };

const RANGES = [
  { key: 7, label: "7d" },
  { key: 14, label: "14d" },
  { key: 30, label: "30d" },
] as const;

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

export function LeadAnalytics() {
  const [days, setDays] = useState<7 | 14 | 30>(14);
  const [bookings, setBookings] = useState<Row[]>([]);
  const [callbacks, setCallbacks] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void (async () => {
      setLoading(true);
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      const [bk, cb] = await Promise.all([
        supabase.from("bookings").select("created_at, status, district_name").gte("created_at", since).limit(2000),
        supabase
          .from("callback_requests")
          .select("created_at, status, district_name")
          .gte("created_at", since)
          .limit(2000),
      ]);
      if (!active) return;
      setBookings((bk.data as Row[]) ?? []);
      setCallbacks((cb.data as Row[]) ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [days]);

  const trend = useMemo(() => {
    const map = new Map<string, { day: string; Requests: number; "Call Back": number }>();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      map.set(key, {
        day: d.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" }),
        Requests: 0,
        "Call Back": 0,
      });
    }
    for (const r of bookings) {
      const e = map.get(dayKey(r.created_at));
      if (e) e.Requests += 1;
    }
    for (const r of callbacks) {
      const e = map.get(dayKey(r.created_at));
      if (e) e["Call Back"] += 1;
    }
    return [...map.values()];
  }, [bookings, callbacks, days]);

  const all = useMemo(() => [...bookings, ...callbacks], [bookings, callbacks]);

  const topDistricts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of all) {
      const d = r.district_name ?? "Unknown";
      counts.set(d, (counts.get(d) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [all]);

  const conversion = useMemo(() => {
    const total = all.length;
    const done = all.filter((r) => r.status === "done").length;
    const cancelled = all.filter((r) => r.status === "cancelled").length;
    const open = total - done - cancelled;
    const rate = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, cancelled, open, rate };
  }, [all]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <TrendingUp className="h-4 w-4 text-brand-red" /> Lead Analytics
        </h2>
        <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-card/50 p-0.5">
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setDays(r.key)}
              className={`rounded-md px-2.5 py-1 text-xs font-bold transition ${
                days === r.key ? "bg-brand-red text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversion mini-stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MiniStat label="Total Leads" value={conversion.total} loading={loading} />
        <MiniStat label="Open" value={conversion.open} accent="text-amber-500" loading={loading} />
        <MiniStat label="Completed" value={conversion.done} accent="text-brand-green" loading={loading} />
        <MiniStat label="Conversion" value={`${conversion.rate}%`} accent="text-brand-red" loading={loading} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Trend chart */}
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
          <h3 className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Daily lead flow
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Requests" stackId="a" fill="var(--brand-red)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Call Back" stackId="a" fill="var(--brand-green)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top districts */}
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
          <h3 className="mb-3 flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            <MapPin className="h-3 w-3" /> Top districts by lead count
          </h3>
          {topDistricts.length === 0 ? (
            <div className="flex h-56 items-center justify-center text-sm text-muted-foreground">
              <Target className="mr-2 h-4 w-4" /> No data
            </div>
          ) : (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topDistricts} layout="vertical" margin={{ top: 0, right: 12, left: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="district" tick={{ fontSize: 10 }} width={70} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="count" name="Lead" fill="var(--brand-red)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
  accent,
  loading,
}: {
  label: string;
  value: string | number;
  accent?: string;
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur">
      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
      {loading ? (
        <div className="mt-2 h-6 w-12 animate-pulse rounded bg-muted" />
      ) : (
        <div className={`mt-1 text-2xl font-extrabold ${accent ?? ""}`}>{value}</div>
      )}
    </div>
  );
}
