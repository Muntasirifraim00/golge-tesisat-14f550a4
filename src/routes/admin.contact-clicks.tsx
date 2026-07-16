import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Phone, MessageCircle, RefreshCw, Loader2, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/contact-clicks")({
  component: ContactClicksPage,
});

type ClickRow = {
  id: string;
  created_at: string;
  event_name: string;
  label: string | null;
  path: string | null;
  country: string | null;
};

/** Human label for where the click originated (button placement / target). */
function sourceLabel(r: ClickRow): string {
  const l = (r.label ?? "").trim();
  if (r.event_name === "cta_call") {
    if (l.startsWith("+") || /^\d{7,}$/.test(l)) return l; // phone number dialed
    if (l === "sticky_bar") return "Alt sabit çubuk";
    if (l === "link") return "Sayfa içi";
    return l || "Arama";
  }
  // whatsapp
  if (l === "sticky_bar") return "Alt sabit çubuk";
  if (l === "link") return "WhatsApp linki";
  return l || "WhatsApp";
}

function fmtDateTime(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" }),
    time: d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
  };
}

function ContactClicksPage() {
  const [rows, setRows] = useState<ClickRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [q, setQ] = useState("");

  async function load(refresh = false) {
    if (refresh) setRefreshing(true);
    const { data } = await supabase
      .from("analytics_events")
      .select("id, created_at, event_name, label, path, country")
      .in("event_name", ["cta_call", "cta_whatsapp"])
      .order("created_at", { ascending: false })
      .limit(2000);
    setRows((data as ClickRow[]) ?? []);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    void load();
  }, []);

  const { calls, whatsapps } = useMemo(() => {
    const term = q.trim().toLowerCase();
    const match = (r: ClickRow) =>
      !term ||
      [r.label, r.path, r.country].some((v) => (v ?? "").toLowerCase().includes(term));
    return {
      calls: rows.filter((r) => r.event_name === "cta_call" && match(r)),
      whatsapps: rows.filter((r) => r.event_name === "cta_whatsapp" && match(r)),
    };
  }, [rows, q]);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
          İletişim tıklamaları
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Arama &amp; <span className="text-brand-red">WhatsApp</span> tıklamaları
        </h1>
        <p className="text-sm text-muted-foreground">
          Kim, hangi tarih ve saatte telefonla aramak için ya da WhatsApp için tıkladı — tümü liste halinde.
        </p>
      </header>

      {/* Summary + controls */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <SummaryCard
          icon={Phone}
          label="Arama tıklaması"
          value={loading ? "—" : calls.length}
          accent="from-brand-red/30 to-brand-red/0"
        />
        <SummaryCard
          icon={MessageCircle}
          label="WhatsApp tıklaması"
          value={loading ? "—" : whatsapps.length}
          accent="from-brand-green/30 to-brand-green/0"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Sayfa, kaynak veya ülke ara…"
            className="w-full rounded-lg border border-border/60 bg-card/50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-brand-red/40"
          />
        </div>
        <button
          onClick={() => void load(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border/60 px-3 py-2 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40 disabled:opacity-50"
        >
          {refreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
          Yenile
        </button>
      </div>

      {loading ? (
        <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-card/50" />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <ClickList
            title="Arama butonu tıklamaları"
            icon={Phone}
            tone="red"
            rows={calls}
            emptyLabel="Henüz arama tıklaması yok."
          />
          <ClickList
            title="WhatsApp butonu tıklamaları"
            icon={MessageCircle}
            tone="green"
            rows={whatsapps}
            emptyLabel="Henüz WhatsApp tıklaması yok."
          />
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Phone;
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur sm:p-5">
      <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent} blur-2xl`} />
      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="relative mt-3 text-2xl font-extrabold sm:text-3xl">{value}</div>
    </div>
  );
}

function ClickList({
  title,
  icon: Icon,
  tone,
  rows,
  emptyLabel,
}: {
  title: string;
  icon: typeof Phone;
  tone: "red" | "green";
  rows: ClickRow[];
  emptyLabel: string;
}) {
  const toneText = tone === "red" ? "text-brand-red" : "text-brand-green";
  const toneDot = tone === "red" ? "bg-brand-red" : "bg-brand-green";
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
      <header className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <h2 className={`flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${toneText}`}>
          <Icon className="h-3.5 w-3.5" /> {title}
        </h2>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">{rows.length}</span>
      </header>

      {rows.length === 0 ? (
        <div className="p-8 text-center text-sm text-muted-foreground">{emptyLabel}</div>
      ) : (
        <div className="max-h-[560px] divide-y divide-border/30 overflow-y-auto">
          {rows.map((r) => {
            const { date, time } = fmtDateTime(r.created_at);
            return (
              <div key={r.id} className="flex items-start gap-3 px-4 py-3">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot}`} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{sourceLabel(r)}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {r.path || "/"}
                    {r.country ? ` · ${r.country}` : ""}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-xs font-bold tabular-nums">{time}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{date}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
