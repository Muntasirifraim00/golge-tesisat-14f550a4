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

const TITLE = "En Yakın Su Tesisatçısı İstanbul | 7/24 Gölge Tesisat";
const DESC = "İstanbul'da en yakın su tesisatçısı mı arıyorsunuz? 7/24 acil su kaçağı, tıkanıklık açma ve kombi servisi — bölgenizi seçin, ortalama 30 dakikada kapınızda.";
const URL = "https://golgetesisat.com/tesisatci";

const FAQS = [
  {
    q: "En yakın su tesisatçısına nasıl ulaşırım?",
    a: "İstanbul'un Anadolu ve Avrupa yakasındaki tüm ilçelerde sahada ekibimiz var. Bölgenizi yukarıdaki listeden seçin ya da doğrudan arayın; size en yakın ustayı anında yönlendiriyoruz. Konum paylaşımıyla adresinizi birebir tespit edip ortalama 30 dakikada kapınızda oluyoruz.",
  },
  {
    q: "Su tesisatçısı ortalama ne kadar sürede gelir?",
    a: "İstanbul içi yoğun bölgelerde ortalama varış süremiz 30 dakikadır. Ekipler ilçe bazlı konumlandığından, en yakın usta trafik durumuna göre çoğu zaman daha kısa sürede ulaşır. Su kaçağı gibi acil durumlarda önceliklendirme yapıp en hızlı ekibi yönlendiriyoruz.",
  },
  {
    q: "Gece, hafta sonu veya resmi tatilde en yakın tesisatçı bulabilir miyim?",
    a: "Evet. Gölge Tesisat 7 gün 24 saat kesintisiz hizmet verir; gece yarısı, hafta sonu ve resmi tatiller dahil her an arayabilirsiniz. Patlayan boru, tavandan su akması veya tıkanan gider gibi acil durumlarda nöbetçi ekibimiz aynı saatte yola çıkar.",
  },
  {
    q: "Tesisatçı gelmeden önce ne yapmalıyım?",
    a: "Su kaçağı varsa daire veya bina ana su vanasını kapatın, elektrikli cihazların ıslanmasını önleyin. Tıkanıklıkta gidere müdahale etmeyin; kimyasal dökmek boruya zarar verebilir. Sorunu telefonda kısaca tarif edin, ekibimiz doğru ekipmanla gelsin.",
  },
  {
    q: "En yakın su tesisatçısı ücreti ne kadar?",
    a: "Ücret; arızanın türüne, müdahale süresine ve kullanılan malzemeye göre değişir. Keşif ve fiyat bilgisini işlem öncesinde net olarak paylaşıyor, onayınız olmadan işleme başlamıyoruz. Sürpriz maliyet çıkarmadan, şeffaf fiyatlandırma uyguluyoruz.",
  },
];

export const Route = createFileRoute("/tesisatci/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "istanbul tesisatçı, su tesisatçısı, acil tesisatçı, istanbul su kaçağı tespiti, istanbul kombi servisi" },
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
            { "@type": "ListItem", position: 2, name: "Tesisatçı", item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Su Tesisatçısı",
          provider: { "@type": "LocalBusiness", name: "Gölge Tesisat", telephone: "+905338960503", url: "https://golgetesisat.com/" },
          areaServed: { "@type": "City", name: "İstanbul" },
          description: DESC,
          url: URL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: DistrictHub,
});

function DistrictHub() {
  const sides = ["Anadolu Yakası", "Avrupa Yakası"] as const;

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
          <li className="font-semibold text-foreground">Tesisatçı</li>
        </ol>
      </nav>

      <main>
      <section className="px-4 pt-4">
        <h1 className="text-[26px] font-extrabold leading-tight">İstanbul'da En Yakın Su Tesisatçısı</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{DESC}</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg border border-border bg-surface p-3 text-center">
            <div className="text-[18px] font-extrabold text-brand-red">~30 dk</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">Ortalama varış</div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3 text-center">
            <div className="text-[18px] font-extrabold text-brand-red">7/24</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">Kesintisiz servis</div>
          </div>
          <div className="rounded-lg border border-border bg-surface p-3 text-center">
            <div className="text-[18px] font-extrabold text-brand-red">39 ilçe</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">Saha ekibi</div>
          </div>
        </div>
        <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
          <Phone className="h-4 w-4" /> Hemen Ara — {PHONE}
        </a>
      </section>

      {/* Services */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Hizmetlerimiz</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <Link key={s.slug} to="/hizmet/$slug" params={{ slug: s.slug }} className="rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                <Icon className="h-5 w-5 text-brand-red" />
                <div className="mt-2 text-[13px] font-extrabold">{s.name}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{s.tagline}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Districts by side */}
      {sides.map((side) => (
        <section key={side} className="px-4 pt-8">
          <h2 className="text-[18px] font-extrabold">{side}</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {DISTRICTS.filter((d) => d.side === side).map((d) => (
              <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red" /> {d.name}</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="px-4 pt-8">
        <h2 className="text-[18px] font-extrabold">Sık Sorulan Sorular</h2>
        <div className="mt-3 space-y-2">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-lg border border-border bg-surface p-3.5">
              <summary className="flex cursor-pointer items-center justify-between text-[13px] font-bold">
                {f.q}
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-red transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-4 mt-8 rounded-2xl bg-foreground p-5 text-background">
        <div className="text-[20px] font-extrabold leading-tight">Bölgeniz listede yok mu?</div>
        <p className="mt-1 text-[12px] opacity-80">İstanbul genelinde 7/24 hizmet veriyoruz. Hemen arayın.</p>
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
