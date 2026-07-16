import { createFileRoute, Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { Phone, MapPin, ArrowRight, Droplet, Waves, Flame, Thermometer, Wind, ScanLine, ShowerHead, Droplets, Gauge } from "lucide-react";
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

function ServiceHub() {
  const popularDistricts = DISTRICTS.slice(0, 10);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="flex items-center justify-between px-4 pt-5 pb-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Gölge Tesisat" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
          <div className="leading-tight">
            <div className="text-[15px] font-extrabold tracking-wide">GÖLGE TESİSAT</div>
            <div className="text-[10px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</div>
          </div>
        </Link>
        <a href={PHONE_HREF} className="flex items-center gap-1.5 rounded-lg bg-brand-red px-3 py-2 text-[12px] font-bold text-white">
          <Phone className="h-3.5 w-3.5" /> Ara
        </a>
      </header>

      <nav className="px-4 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-foreground">Ana Sayfa</Link></li>
          <li>›</li>
          <li className="font-semibold text-foreground">Hizmetler</li>
        </ol>
      </nav>

      <main>
      <section className="px-4 pt-4">
        <h1 className="text-[26px] font-extrabold leading-tight">Tesisat Hizmetlerimiz</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{DESC}</p>
      </section>

      <section className="px-4 pt-6">
        <div className="grid grid-cols-1 gap-2">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <Link key={s.slug} to="/hizmet/$slug" params={{ slug: s.slug }} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 hover:border-brand-red">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red/10">
                  <Icon className="h-5 w-5 text-brand-red" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-[14px] font-extrabold">{s.name}</h2>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-red" />
                  </div>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">{s.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-4 pt-8">
        <h2 className="text-[18px] font-extrabold">Hizmet Verdiğimiz Bölgeler</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {popularDistricts.map((d) => (
            <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red" /> {d.name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
            </Link>
          ))}
        </div>
        <Link to="/tesisatci" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red">
          Tüm bölgeler <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      <section className="px-4 pt-8">
        <h2 className="text-[18px] font-extrabold">Tesisat Rehberleri</h2>
        <p className="mt-1 text-[12px] text-muted-foreground">Petek temizliği, kombi bakımı ve tıkanıklık açma hakkında uzman ipuçları.</p>
        <Link to="/blog" className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
          Blog yazılarını oku <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
        </Link>
      </section>

      <section className="mx-4 mt-8 rounded-2xl bg-foreground p-5 text-background">
        <div className="text-[20px] font-extrabold leading-tight">Acil tesisat desteği mi lazım?</div>
        <p className="mt-1 text-[12px] opacity-80">7/24 açığız. Hemen arayın, en kısa sürede kapınızda olalım.</p>
        <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
      </section>
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
