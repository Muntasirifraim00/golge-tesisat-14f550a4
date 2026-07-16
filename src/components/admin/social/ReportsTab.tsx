import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  FileBarChart,
  Loader2,
  Download,
  Printer,
  CalendarRange,
  FileText,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Users,
  MousePointerClick,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { getReportData, type ReportData } from "@/lib/social.functions";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;

const PRESETS: { id: string; label: string; days: number }[] = [
  { id: "7", label: "Son 7 gün", days: 7 },
  { id: "30", label: "Son 30 gün", days: 30 },
  { id: "90", label: "Son 90 gün", days: 90 },
];

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}
function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function downloadCsv(filename: string, rows: (string | number)[][]) {
  const esc = (v: string | number) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = rows.map((r) => r.map(esc).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ReportsTab({ notify }: { notify: Notify }) {
  const fetchReport = useServerFn(getReportData);

  const [from, setFrom] = useState(isoDaysAgo(29));
  const [to, setTo] = useState(todayIso());
  const [activePreset, setActivePreset] = useState("30");
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  async function load(f = from, t = to) {
    setLoading(true);
    try {
      setReport(await fetchReport({ data: { from: f, to: t } }));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Rapor yüklenemedi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyPreset(p: { id: string; days: number }) {
    const f = isoDaysAgo(p.days - 1);
    const t = todayIso();
    setActivePreset(p.id);
    setFrom(f);
    setTo(t);
    void load(f, t);
  }

  const engBars = useMemo(() => {
    if (!report) return [];
    const e = report.engagement;
    return [
      { label: "Beğeni", value: e.likes, icon: Heart, cls: "bg-rose-400" },
      { label: "Yorum", value: e.comments, icon: MessageCircle, cls: "bg-sky-400" },
      { label: "Paylaşım", value: e.shares, icon: Share2, cls: "bg-emerald-400" },
      { label: "Erişim", value: e.reach, icon: Eye, cls: "bg-amber-400" },
    ];
  }, [report]);
  const engMax = Math.max(1, ...engBars.map((b) => b.value));
  const dayMax = Math.max(1, ...(report?.posts.byDay.map((d) => d.count) ?? [1]));

  function exportCsv() {
    if (!report) return;
    const rows: (string | number)[][] = [];
    rows.push(["Gölge Tesisat — Sosyal Medya Raporu"]);
    rows.push(["Dönem", report.range.from.slice(0, 10), report.range.to.slice(0, 10)]);
    rows.push([]);
    rows.push(["Özet"]);
    rows.push(["Yayınlanan gönderi", report.posts.total]);
    rows.push(["Toplam etkileşim", report.engagement.total]);
    rows.push(["Beğeni", report.engagement.likes]);
    rows.push(["Yorum", report.engagement.comments]);
    rows.push(["Paylaşım", report.engagement.shares]);
    rows.push(["Erişim", report.engagement.reach]);
    rows.push(["Gösterim", report.engagement.impressions]);
    rows.push(["Lead (toplam)", report.leads.total]);
    rows.push(["Lead (sosyal kaynaklı)", report.leads.fromSocial]);
    rows.push(["Link tıklaması", report.clicks.total]);
    rows.push([]);
    rows.push(["Platform", "Gönderi"]);
    report.posts.byPlatform.forEach((p) => rows.push([p.platform, p.count]));
    rows.push([]);
    rows.push(["Lead durumu", "Adet"]);
    report.leads.byStatus.forEach((s) => rows.push([s.status, s.count]));
    rows.push([]);
    rows.push(["Hizmet", "Lead"]);
    report.leads.byService.forEach((s) => rows.push([s.service, s.count]));
    rows.push([]);
    rows.push(["En iyi gönderiler", "Platform", "Etkileşim", "Tarih"]);
    report.topPosts.forEach((p) =>
      rows.push([p.caption, p.platform, p.engagement, p.posted_at?.slice(0, 10) ?? ""]),
    );
    downloadCsv(`sosyal-rapor-${report.range.from.slice(0, 10)}.csv`, rows);
    notify("ok", "CSV indirildi");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <FileBarChart className="h-5 w-5 text-violet-400" /> Reports &amp; Export Center
          </h2>
          <p className="text-sm text-muted-foreground">
            Seçili dönem için gönderi, etkileşim, lead ve tıklama performansı — ekranda gör, CSV/PDF al.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            disabled={!report}
            className="inline-flex h-[40px] items-center gap-2 rounded-xl border border-border/60 px-3 text-sm font-semibold transition hover:border-brand-red/40 disabled:opacity-50"
          >
            <Download className="h-4 w-4" /> CSV
          </button>
          <button
            onClick={() => window.print()}
            disabled={!report}
            className="inline-flex h-[40px] items-center gap-2 rounded-xl bg-brand-red px-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            <Printer className="h-4 w-4" /> PDF / Yazdır
          </button>
        </div>
      </div>

      {/* Range controls */}
      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur print:hidden">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
                activePreset === p.id
                  ? "border-brand-red/50 bg-brand-red/15 text-brand-red"
                  : "border-border/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex flex-wrap items-end gap-2">
          <div>
            <label className="mb-1 block text-[11px] text-muted-foreground">Başlangıç</label>
            <input
              type="date"
              value={from}
              max={to}
              onChange={(e) => {
                setFrom(e.target.value);
                setActivePreset("");
              }}
              className="rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] text-muted-foreground">Bitiş</label>
            <input
              type="date"
              value={to}
              max={todayIso()}
              onChange={(e) => {
                setTo(e.target.value);
                setActivePreset("");
              }}
              className="rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50"
            />
          </div>
          <button
            onClick={() => load()}
            className="inline-flex h-[40px] items-center gap-2 rounded-xl border border-border/60 px-3 text-sm font-semibold transition hover:border-brand-red/40"
          >
            <CalendarRange className="h-4 w-4" /> Uygula
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : !report ? (
        <div className="rounded-2xl border border-dashed border-border/50 py-16 text-center text-sm text-muted-foreground">
          Veri yok.
        </div>
      ) : (
        <div className="space-y-6">
          {/* Print title */}
          <div className="hidden print:block">
            <h1 className="text-xl font-bold">Gölge Tesisat — Sosyal Medya Raporu</h1>
            <p className="text-sm text-muted-foreground">
              {report.range.from.slice(0, 10)} → {report.range.to.slice(0, 10)} ({report.range.days} gün)
            </p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi icon={FileText} label="Yayınlanan gönderi" value={report.posts.total} tone="text-sky-400" />
            <Kpi icon={TrendingUp} label="Toplam etkileşim" value={report.engagement.total} tone="text-emerald-400" />
            <Kpi icon={Users} label="Lead" value={report.leads.total} sub={`${report.leads.fromSocial} sosyal`} tone="text-amber-400" />
            <Kpi icon={MousePointerClick} label="Link tıklaması" value={report.clicks.total} tone="text-violet-400" />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Engagement breakdown */}
            <Panel title="Etkileşim dağılımı" icon={Heart}>
              {engBars.every((b) => b.value === 0) ? (
                <Empty text="Bu dönemde etkileşim verisi yok." />
              ) : (
                <div className="space-y-3">
                  {engBars.map((b) => {
                    const Icon = b.icon;
                    return (
                      <div key={b.label}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 text-muted-foreground">
                            <Icon className="h-3.5 w-3.5" /> {b.label}
                          </span>
                          <span className="font-semibold tabular-nums">{b.value.toLocaleString("tr-TR")}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-background/60">
                          <div className={cn("h-full rounded-full", b.cls)} style={{ width: `${(b.value / engMax) * 100}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Panel>

            {/* Posts per day */}
            <Panel title="Günlük gönderi" icon={CalendarRange}>
              {report.posts.byDay.length === 0 ? (
                <Empty text="Bu dönemde yayınlanan gönderi yok." />
              ) : (
                <div className="flex h-36 items-end gap-1">
                  {report.posts.byDay.map((d) => (
                    <div key={d.date} className="group flex flex-1 flex-col items-center justify-end" title={`${d.date}: ${d.count}`}>
                      <div
                        className="w-full rounded-t bg-brand-red/70 transition group-hover:bg-brand-red"
                        style={{ height: `${(d.count / dayMax) * 100}%`, minHeight: 3 }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Panel>

            {/* Leads by status */}
            <Panel title="Lead durumu" icon={Users}>
              {report.leads.byStatus.length === 0 ? (
                <Empty text="Bu dönemde lead yok." />
              ) : (
                <BarList items={report.leads.byStatus.map((s) => ({ label: s.status, value: s.count }))} />
              )}
            </Panel>

            {/* Top platforms */}
            <Panel title="Platform dağılımı" icon={Share2}>
              {report.posts.byPlatform.length === 0 ? (
                <Empty text="Veri yok." />
              ) : (
                <BarList items={report.posts.byPlatform.map((p) => ({ label: p.platform, value: p.count }))} />
              )}
            </Panel>
          </div>

          {/* Top posts */}
          <Panel title="En iyi gönderiler" icon={Sparkles}>
            {report.topPosts.length === 0 ? (
              <Empty text="Bu dönemde etkileşim alan gönderi yok." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50 text-left text-xs text-muted-foreground">
                      <th className="py-2 pr-3 font-medium">Gönderi</th>
                      <th className="py-2 pr-3 font-medium">Platform</th>
                      <th className="py-2 pr-3 text-right font-medium">Etkileşim</th>
                      <th className="py-2 font-medium">Tarih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.topPosts.map((p) => (
                      <tr key={p.id} className="border-b border-border/30 last:border-0">
                        <td className="max-w-[320px] truncate py-2 pr-3">{p.caption || "—"}</td>
                        <td className="py-2 pr-3 capitalize text-muted-foreground">{p.platform}</td>
                        <td className="py-2 pr-3 text-right font-semibold tabular-nums">{p.engagement.toLocaleString("tr-TR")}</td>
                        <td className="py-2 text-muted-foreground">{p.posted_at?.slice(0, 10) ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>

          {/* Top links */}
          {report.clicks.topLinks.length > 0 && (
            <Panel title="En çok tıklanan linkler" icon={MousePointerClick}>
              <BarList items={report.clicks.topLinks.map((l) => ({ label: l.label, value: l.clicks }))} />
            </Panel>
          )}
        </div>
      )}
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
  sub?: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
      <Icon className={cn("h-5 w-5", tone)} />
      <p className="mt-2 text-2xl font-bold tabular-nums">{value.toLocaleString("tr-TR")}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      {sub && <p className="mt-0.5 text-[11px] text-brand-red">{sub}</p>}
    </div>
  );
}

function Panel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof FileText;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-brand-red" /> {title}
      </div>
      {children}
    </div>
  );
}

function BarList({ items }: { items: { label: string; value: number }[] }) {
  const max = Math.max(1, ...items.map((i) => i.value));
  return (
    <div className="space-y-2.5">
      {items.map((i) => (
        <div key={i.label}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="capitalize text-muted-foreground">{i.label}</span>
            <span className="font-semibold tabular-nums">{i.value.toLocaleString("tr-TR")}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-background/60">
            <div className="h-full rounded-full bg-brand-red/70" style={{ width: `${(i.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="py-6 text-center text-xs text-muted-foreground">{text}</p>;
}
