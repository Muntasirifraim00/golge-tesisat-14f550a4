import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Database,
  Search,
  TrendingUp,
  Target,
  FileText,
  Lightbulb,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  SEO_RESEARCH,
  CLUSTER_LABEL,
  STATUS_LABEL,
  type ResearchEntry,
  type ResearchStatus,
} from "@/data/seo-research";

export const Route = createFileRoute("/admin/seo-data")({
  component: SeoDataPage,
});

function fmtInt(n: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(n));
}

const STATUS_META: Record<ResearchStatus, { cls: string; icon: typeof CheckCircle2 }> = {
  optimized: { cls: "border-brand-green/40 bg-brand-green/10 text-brand-green", icon: Sparkles },
  completed: { cls: "border-primary/40 bg-primary/10 text-primary", icon: CheckCircle2 },
  planned: { cls: "border-brand-gold/40 bg-brand-gold/10 text-brand-gold", icon: Clock },
};

function kdiBadge(kdi: number): string {
  if (kdi < 20) return "border-brand-green/40 bg-brand-green/10 text-brand-green";
  if (kdi < 40) return "border-brand-gold/40 bg-brand-gold/10 text-brand-gold";
  return "border-brand-red/40 bg-brand-red/10 text-brand-red";
}

function SeoDataPage() {
  const stats = useMemo(() => {
    const written = SEO_RESEARCH.filter((r) => r.status !== "planned").length;
    const planned = SEO_RESEARCH.filter((r) => r.status === "planned").length;
    // Total addressable volume = primary + all secondary keyword volumes.
    const totalVolume = SEO_RESEARCH.reduce(
      (sum, r) => sum + r.volume + r.secondaryKeywords.reduce((s, k) => s + k.volume, 0),
      0,
    );
    const keywordCount = SEO_RESEARCH.reduce(
      (sum, r) => sum + 1 + r.secondaryKeywords.length,
      0,
    );
    return { written, planned, totalVolume, keywordCount };
  }, []);

  const optimized = SEO_RESEARCH.filter((r) => r.status === "optimized");
  const completed = SEO_RESEARCH.filter((r) => r.status === "completed");
  const planned = SEO_RESEARCH.filter((r) => r.status === "planned");

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <Database className="h-3.5 w-3.5 text-brand-red" />
          SEO Research · Semrush (database: tr)
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          SEO <span className="text-brand-red">Research Data</span>
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          İşletme için yapılan tüm anahtar kelime ve blog araştırmasının kaydı: hangi kelimeleri
          neden seçtik, aylık arama hacimleri, zorluk (KDI) ve rakip boşlukları. Yazılan ve sıradaki
          tüm içerikler burada.
        </p>
      </header>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Kpi icon={FileText} label="Yazılan İçerik" value={fmtInt(stats.written)} accent="from-brand-green/30 to-brand-green/0" />
        <Kpi icon={Clock} label="Sıradaki Hedef" value={fmtInt(stats.planned)} accent="from-brand-gold/30 to-brand-gold/0" />
        <Kpi icon={Target} label="Hedef Kelime" value={fmtInt(stats.keywordCount)} accent="from-primary/30 to-primary/0" />
        <Kpi icon={TrendingUp} label="Toplam Aylık Arama" value={fmtInt(stats.totalVolume)} accent="from-brand-red/30 to-brand-red/0" />
      </div>

      <Group title="Derin Optimize Edilen" hint="Rakip analiziyle yeniden yazıldı" items={optimized} />
      <Group title="Yazılan İçerikler" hint="Yayında" items={completed} />
      <Group title="Sıradaki Hedefler" hint="Araştırıldı, yazım bekliyor" items={planned} />
    </div>
  );
}

function Group({ title, hint, items }: { title: string; hint: string; items: ResearchEntry[] }) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 border-b border-border/40 pb-2">
        <h2 className="text-sm font-extrabold tracking-tight">{title}</h2>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">{hint}</span>
        <span className="ml-auto rounded-full border border-border/60 px-2 py-0.5 font-mono text-[9px] font-bold text-muted-foreground">
          {items.length}
        </span>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {items.map((r) => (
          <ResearchCard key={r.primaryKeyword} r={r} />
        ))}
      </div>
    </section>
  );
}

function ResearchCard({ r }: { r: ResearchEntry }) {
  const st = STATUS_META[r.status];
  const StatusIcon = st.icon;
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur transition hover:border-brand-red/30 sm:p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
            {CLUSTER_LABEL[r.cluster]}
          </span>
          <h3 className="mt-0.5 text-sm font-extrabold leading-snug">{r.title}</h3>
        </div>
        <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${st.cls}`}>
          <StatusIcon className="h-3 w-3" /> {STATUS_LABEL[r.status]}
        </span>
      </div>

      {/* Primary keyword metrics */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border/50 bg-background/40 px-3 py-2">
        <Search className="h-3.5 w-3.5 shrink-0 text-brand-red" />
        <span className="text-[13px] font-bold">{r.primaryKeyword}</span>
        <span className="ml-auto flex items-center gap-2">
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {fmtInt(r.volume)}/ay
          </span>
          <span className={`rounded-full border px-2 py-0.5 font-mono text-[9px] font-bold ${kdiBadge(r.kdi)}`}>
            KDI {r.kdi}
          </span>
        </span>
      </div>

      {/* Secondary keywords */}
      {r.secondaryKeywords.length > 0 && (
        <div>
          <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70">
            Yakaladığı yan kelimeler
          </div>
          <div className="flex flex-wrap gap-1.5">
            {r.secondaryKeywords.map((k) => (
              <span
                key={k.keyword}
                className="inline-flex items-center gap-1 rounded-md border border-border/50 bg-background/40 px-2 py-1 text-[11px]"
              >
                {k.keyword}
                <span className="font-mono text-[9px] tabular-nums text-muted-foreground">{fmtInt(k.volume)}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Rationale */}
      <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-3">
        <div className="mb-1 flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-brand-gold">
          <Lightbulb className="h-3 w-3" /> Neden seçildi
        </div>
        <p className="text-[12px] leading-relaxed text-muted-foreground">{r.rationale}</p>
      </div>

      {/* Competitor gaps */}
      {r.competitorGaps && r.competitorGaps.length > 0 && (
        <div>
          <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70">
            Rakip boşlukları (top 5)
          </div>
          <ul className="space-y-1">
            {r.competitorGaps.map((g) => (
              <li key={g} className="flex items-start gap-1.5 text-[12px] text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" />
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer link */}
      {r.slug && (
        <Link
          to="/blog/$slug"
          params={{ slug: r.slug }}
          target="_blank"
          className="mt-auto inline-flex items-center gap-1 text-[11px] font-bold text-brand-red hover:underline"
        >
          Yazıyı görüntüle <ArrowUpRight className="h-3 w-3" />
        </Link>
      )}
    </article>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Target;
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
