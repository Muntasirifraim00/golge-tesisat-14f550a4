import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import logoImg from "@/assets/logo.jpg";
import { Phone, MapPin, ArrowRight, Search, Check, CalendarDays, LayoutGrid, Droplet, Waves, Flame, Thermometer, Wind, ScanLine, ShowerHead, Droplets, Gauge } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { DISTRICTS } from "@/data/districts";
import { SERVICES, type ServiceIcon } from "@/data/services";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

const ICONS: Record<ServiceIcon, React.ComponentType<{ className?: string }>> = {
  leak: Droplet,
  clog: Waves,
  combi: Flame,
  radiator: Thermometer,
  gas: Wind,
  camera: ScanLine,
  shower: ShowerHead,
  faucet: Droplets,
  pump: Gauge,
};

const TITLE = "Tesisat Hizmetleri — Su Kaçağı, Kombi | Gölge Tesisat";
const DESC = "İstanbul'da 7/24 tesisat hizmetleri: su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği ve doğalgaz tesisatı. Ücretsiz keşif.";
const URL = "https://golgetesisat.com/hizmetler";

export const Route = createFileRoute("/hizmetler")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "tesisat hizmetleri, su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği, doğalgaz tesisatı" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://golgetesisat.com/og-image.jpg" },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: "https://golgetesisat.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://golgetesisat.com/" },
            { "@type": "ListItem", position: 2, name: "Hizmetler", item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: SERVICES.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `https://golgetesisat.com/hizmet/${s.slug}`,
          })),
        }),
      },
    ],
  }),
  component: ServiceHub,
});

type Cat = "all" | "leak" | "drain" | "heat" | "gas" | "bath";
const CAT_OF: Record<ServiceIcon, Exclude<Cat, "all">> = {
  leak: "leak", clog: "drain", camera: "drain", combi: "heat", radiator: "heat", pump: "heat", gas: "gas", shower: "bath", faucet: "bath",
};
const CATS: { id: Cat; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "all", label: "Tüm hizmetler", Icon: LayoutGrid },
  { id: "leak", label: "Kaçak & boru", Icon: Droplet },
  { id: "drain", label: "Gider & kanalizasyon", Icon: Waves },
  { id: "heat", label: "Isıtma & kombi", Icon: Flame },
  { id: "gas", label: "Doğalgaz", Icon: Wind },
  { id: "bath", label: "Banyo & mutfak", Icon: ShowerHead },
];
const CHIPS = ["su kaçağı", "tavanda leke", "fatura yüksek", "tuvalet tıkalı", "lavabo yavaş", "petek ısınmıyor", "sıcak su yok", "basınç düşük", "gaz kokusu"];
const CHIP_MAP: Record<string, string> = {
  "su kaçağı": "kaçak", "tavanda leke": "kaçak", "fatura yüksek": "kaçak", "tuvalet tıkalı": "tuvalet", "lavabo yavaş": "gider",
  "petek ısınmıyor": "petek", "sıcak su yok": "kombi", "basınç düşük": "hidrofor", "gaz kokusu": "doğalgaz",
};

function ServiceHub() {
  const popularDistricts = DISTRICTS.slice(0, 12);
  const [cat, setCat] = useState<Cat>("all");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase("tr");
    return SERVICES.filter((s) => {
      if (cat !== "all" && CAT_OF[s.icon] !== cat) return false;
      if (!needle) return true;
      const hay = `${s.name} ${s.shortName} ${s.tagline} ${s.intro}`.toLocaleLowerCase("tr");
      return needle.split(/\s+/).some((w) => w.length > 2 && hay.includes(w));
    });
  }, [cat, q]);
  const count = (c: Cat) => (c === "all" ? SERVICES.length : SERVICES.filter((s) => CAT_OF[s.icon] === c).length);

  return (
    <div className="sp min-h-screen pb-24">
      <div className="bg-[var(--sp-ink)] text-[var(--sp-paper)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold sm:px-8 sm:text-[12px]">
          <span className="flex items-center gap-1.5 text-[var(--sp-green)]"><span className="h-2 w-2 animate-pulse rounded-full bg-[var(--sp-green)]" />7/24 · iki yakada nöbetçi ekip</span>
          <span className="hidden opacity-80 md:block">Ücretsiz keşif · KDV dahil sabit fiyat · <b>2 yıl</b> garanti</span>
          <a href={PHONE_HREF} className="font-bold">{PHONE}</a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[var(--sp-line)] bg-[var(--sp-paper)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoImg} alt="Gölge Tesisat logo" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
            <div className="leading-tight">
              <div className="sp-display text-[20px]">Gölge Tesisat</div>
              <div className="sp-mono text-[9px] text-[var(--sp-muted)]">Shadow Plumbing</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 text-[14px] font-semibold text-[var(--sp-muted)] lg:flex">
            <span className="rounded-lg bg-[var(--sp-mist)] px-3 py-2 text-[var(--sp-ink)]">Hizmetler</span>
            <a href="#bolgeler" className="px-3 py-2 hover:text-[var(--sp-ink)]">Bölgeler</a>
            <a href="#bul" className="px-3 py-2 hover:text-[var(--sp-ink)]">Sorunu bul</a>
            <Link to="/fiyatlar" className="px-3 py-2 hover:text-[var(--sp-ink)]">Fiyatlar</Link>
            <Link to="/blog" className="px-3 py-2 hover:text-[var(--sp-ink)]">Rehber</Link>
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_HREF} className="sp-btn-ink flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13px] font-bold"><Phone className="h-4 w-4" /> Ara</a>
            <Link to="/randevu" className="sp-btn-red hidden rounded-xl px-4 py-2.5 text-[13px] font-bold sm:block">Randevu al</Link>
          </div>
        </div>
      </header>

      <main>
        <section id="bul" className="sp-hero relative overflow-hidden">
          <div className="sp-grid-bg absolute inset-0" aria-hidden />
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-8 sm:pt-8">
            <nav aria-label="Breadcrumb" className="text-[12px] font-semibold opacity-80">
              <Link to="/">Ana Sayfa</Link> <span className="mx-1 opacity-50">›</span> <span className="text-[var(--sp-paper)]">Tüm Hizmetler</span>
            </nav>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end">
              <div>
                <div className="sp-mono flex items-center gap-2 text-[12px] font-bold text-[var(--sp-red-hot)]"><span className="h-1 w-7 rounded bg-[var(--sp-red-hot)]" />Tüm hizmetler</div>
                <h1 className="sp-display mt-4 text-[52px] sm:text-[84px]">
                  {SERVICES.length} tesisat hizmeti.<br /><span className="text-[var(--sp-red-hot)]">Tek bir güvenilir ekip.</span>
                </h1>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed opacity-80 sm:text-[17px]">
                  Su kaçağı ve tıkanıklıktan <b>kombi, petek ve doğalgaza</b> kadar tüm tesisat işleriniz tek çatı altında — deneyimli ustalar, ileri teknoloji cihazlar ve kalıcı onarım, İstanbul genelinde 7/24.
                </p>
                <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex items-center gap-2 rounded-2xl bg-[var(--sp-paper)] p-2 text-[var(--sp-ink)]">
                  <Search className="ml-2 h-5 w-5 shrink-0 text-[var(--sp-muted)]" />
                  <label htmlFor="svc-q" className="sr-only">Sorununuz nedir?</label>
                  <input id="svc-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Sorun nedir? ör. tıkalı tuvalet, soğuk petek" className="min-w-0 flex-1 bg-transparent py-2 text-[15px] outline-none" />
                  <a href="#liste" className="sp-btn-red flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-[14px] font-bold">Bul <ArrowRight className="h-4 w-4" /></a>
                </form>
                <div className="mt-4 flex flex-wrap gap-2">
                  {CHIPS.map((c) => (
                    <button key={c} type="button" onClick={() => { setQ(CHIP_MAP[c]); setCat("all"); }} className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition ${c === "gaz kokusu" ? "border-[var(--sp-amber)] text-[var(--sp-amber)]" : "border-[var(--sp-edge)] hover:border-[var(--sp-red-hot)]"}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[var(--sp-red)] p-5"><div className="sp-display text-[40px]">~30 dk</div><div className="mt-1 text-[12px] font-bold">Ortalama varış, iki yaka</div></div>
                <div className="rounded-2xl border border-[var(--sp-edge)] bg-[var(--sp-ink-2)] p-5"><div className="sp-display text-[40px]">4.9</div><div className="mt-1 text-[12px] font-bold"><span className="text-[var(--sp-amber)]">★★★★★</span> Google yorumları</div></div>
                <div className="rounded-2xl border border-[var(--sp-edge)] bg-[var(--sp-ink-2)] p-5"><div className="sp-display text-[40px]">2 yıl</div><div className="mt-1 text-[12px] font-bold opacity-80">Yazılı garanti · işçilik + parça</div></div>
                <div className="rounded-2xl border border-[var(--sp-edge)] bg-[var(--sp-ink-2)] p-5"><div className="sp-display text-[40px]">{DISTRICTS.length}</div><div className="mt-1 text-[12px] font-bold opacity-80">İstanbul'da hizmet bölgesi</div></div>
              </div>
            </div>
            <div className="sp-pipe mt-10" aria-hidden />
          </div>
        </section>

        <div className="sticky top-[65px] z-30 border-b border-[var(--sp-line)] bg-[var(--sp-paper)]">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-8">
            {CATS.map(({ id, label, Icon }) => (
              <button key={id} type="button" onClick={() => setCat(id)} aria-pressed={cat === id}
                className={`flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2 text-[14px] font-bold transition ${cat === id ? "sp-btn-ink border-transparent" : "border-[var(--sp-line)] hover:border-[var(--sp-red)]"}`}>
                <Icon className={`h-4 w-4 ${cat === id ? "" : "text-[var(--sp-red)]"}`} /> {label}
                <span className={`rounded-md px-1.5 text-[11px] ${cat === id ? "bg-[var(--sp-edge)]" : "bg-[var(--sp-mist)] text-[var(--sp-muted)]"}`}>{count(id)}</span>
              </button>
            ))}
          </div>
        </div>

        <section id="liste" className="mx-auto max-w-7xl scroll-mt-32 px-4 py-10 sm:px-8">
          {list.length === 0 ? (
            <div className="rounded-2xl border border-[var(--sp-line)] bg-[var(--sp-paper)] p-8 text-center">
              <p className="font-semibold">Bu aramaya uygun hizmet bulamadık.</p>
              <a href={PHONE_HREF} className="sp-btn-red mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold"><Phone className="h-4 w-4" /> Bizi arayın, birlikte bulalım</a>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {list.map((s, i) => {
                const Icon = ICONS[s.icon];
                const featured = s.slug === "acil-tesisatci";
                const num = SERVICES.indexOf(s) + 1;
                return (
                  <article key={s.slug} className={`relative flex flex-col rounded-3xl border p-6 ${featured ? "border-transparent bg-[var(--sp-ink)] text-[var(--sp-paper)] lg:col-span-2" : "border-[var(--sp-line)] bg-[var(--sp-paper)]"}`}>
                    <div className="flex items-start justify-between">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${featured ? "bg-[var(--sp-red)]" : "bg-[var(--sp-red-tint)] text-[var(--sp-red)]"}`}><Icon className="h-6 w-6" /></div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="sp-mono text-[11px] opacity-60">{String(num).padStart(2, "0")} / {SERVICES.length}</span>
                        <span className="sp-mono flex items-center gap-1 rounded-full bg-[var(--sp-ink)] px-2 py-1 text-[10px] font-bold text-[var(--sp-paper)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--sp-green)]" />~{s.responseMin} dk</span>
                        {i < 3 && !featured && <span className="sp-mono rounded-md bg-[color-mix(in_oklab,var(--sp-amber)_25%,transparent)] px-2 py-0.5 text-[10px] font-bold">Çok tercih edilen</span>}
                      </div>
                    </div>
                    <h2 className="sp-display mt-5 text-[30px]">{s.shortName}</h2>
                    <div className="sp-mono mt-1 text-[10px] font-bold text-[var(--sp-red-hot)]">{CATS.find((c) => c.id === CAT_OF[s.icon])?.label}</div>
                    <p className={`mt-3 text-[14px] leading-relaxed ${featured ? "opacity-80" : "text-[var(--sp-muted)]"}`}>{s.tagline}. {s.intro.split(". ")[0]}.</p>
                    <ul className="mt-4 space-y-2">
                      {s.includes.slice(0, 3).map((it) => (
                        <li key={it} className="flex gap-2 text-[14px] font-semibold"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sp-green)]" />{it}</li>
                      ))}
                    </ul>
                    <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
                      <Link to="/hizmet/$slug" params={{ slug: s.slug }} className={`rounded-xl border py-3 text-center text-[14px] font-bold ${featured ? "border-[var(--sp-edge)]" : "border-[var(--sp-line)] hover:border-[var(--sp-ink)]"}`}>Hizmeti incele</Link>
                      {featured
                        ? <a href={PHONE_HREF} className="sp-btn-red flex items-center justify-center gap-1.5 rounded-xl py-3 text-[14px] font-bold"><Phone className="h-4 w-4" /> Hemen ara</a>
                        : <Link to="/randevu" className="sp-btn-red flex items-center justify-center gap-1.5 rounded-xl py-3 text-[14px] font-bold"><CalendarDays className="h-4 w-4" /> Randevu</Link>}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section id="bolgeler" className="mx-auto max-w-7xl px-4 pb-10 sm:px-8">
          <div className="sp-mono flex items-center gap-2 text-[12px] font-bold text-[var(--sp-red)]"><span className="h-1 w-7 rounded bg-[var(--sp-red)]" />Hizmet bölgeleri</div>
          <h2 className="sp-display mt-3 text-[40px] sm:text-[56px]">İstanbul'un iki yakası, <span className="text-[var(--sp-red)]">tek ekip</span></h2>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {popularDistricts.map((d) => (
              <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} className="flex items-center justify-between rounded-xl border border-[var(--sp-line)] bg-[var(--sp-paper)] px-3 py-3 text-[13px] font-bold hover:border-[var(--sp-red)]">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[var(--sp-red)]" />{d.name}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--sp-red)]" />
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-[13px] font-bold text-[var(--sp-red)]">
            <Link to="/tesisatci" className="inline-flex items-center gap-1">Tüm bölgeler <ArrowRight className="h-3.5 w-3.5" /></Link>
            <Link to="/blog" className="inline-flex items-center gap-1">Tesisat rehberleri <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </section>

        <section className="sp-hero relative mx-4 mb-10 overflow-hidden rounded-3xl sm:mx-8">
          <div className="sp-grid-bg absolute inset-0" aria-hidden />
          <div className="relative flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <div className="sp-mono text-[11px] font-bold text-[var(--sp-red-hot)]">Acil hat · 7/24</div>
              <div className="sp-display mt-2 text-[40px] sm:text-[56px]">Acil tesisat desteği mi lazım?</div>
              <p className="mt-2 opacity-80">Gece, hafta sonu, bayram — en yakın ekip yola çıkar.</p>
            </div>
            <a href={PHONE_HREF} className="sp-btn-red flex shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-4 text-[18px] font-extrabold"><Phone className="h-5 w-5" /> {PHONE}</a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
