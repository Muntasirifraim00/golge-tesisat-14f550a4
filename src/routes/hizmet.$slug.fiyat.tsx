import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import {
  Phone, MessageCircle, Clock, ShieldCheck, Check, ArrowRight, Tag,
  Droplet, Waves, Flame, Thermometer, ScanLine, Wind, Wallet, BadgeCheck,
  ShowerHead, Droplets, Gauge,
} from "lucide-react";
import { SERVICES, findService, type ServiceIcon, type Service } from "@/data/services";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { BUSINESS } from "@/data/business";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

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

// Pricing-intent FAQ built from each service's transparent factors.
function priceFaq(s: Service) {
  return [
    {
      q: `${s.name} fiyatları ne kadar?`,
      a: `${s.name.toLowerCase()} ücreti işin kapsamına göre değişir; bu yüzden sabit fiyat yerine yerinde ücretsiz keşif yapıp işe başlamadan net fiyatı onayınıza sunuyoruz. Sürpriz ücret çıkarmıyor, tüm işçiliği 2 yıl garanti ediyoruz.`,
    },
    {
      q: `${s.name} ücreti nasıl belirleniyor?`,
      a: `${s.priceIntro}`,
    },
    {
      q: `Keşif ve fiyat teklifi ücretli mi?`,
      a: `Hayır. ${s.name.toLowerCase()} için keşif ve fiyat teklifi tamamen ücretsizdir. Onayınız olmadan işlem başlatmıyoruz.`,
    },
    {
      q: `${s.name} için ödeme nasıl yapılıyor?`,
      a: `İş tamamlandıktan ve siz kontrol ettikten sonra nakit veya kartla ödeme alıyoruz. Faturalandırma talep eden kurumsal müşterilerimize fatura düzenliyoruz.`,
    },
  ];
}

export const Route = createFileRoute("/hizmet/$slug/fiyat")({
  loader: ({ params }) => {
    const service = findService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Fiyatlar — Gölge Tesisat" }] };
    const lc = s.name.toLowerCase();
    const title = `${s.name} Fiyatları 2026 — İstanbul Ücret | Gölge Tesisat`;
    const desc = `${s.name} fiyatları nasıl belirlenir? İstanbul'da ${lc} ücretini etkileyen faktörler, ücretsiz keşif ve şeffaf fiyatlandırma. Hemen arayın: ${PHONE}.`;
    const url = `https://golgetesisat.com/hizmet/${s.slug}/fiyat`;
    const ogImage = `https://golgetesisat.com/og/${s.slug}.jpg`;
    const faq = priceFaq(s);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${lc} fiyatları, ${lc} ücreti, ${s.shortName.toLowerCase()} fiyat, istanbul ${lc} fiyat, ${lc} ne kadar` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:alt", content: `${s.name} Fiyatları — Gölge Tesisat İstanbul` },
        { property: "og:locale", content: "tr_TR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: ogImage },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://golgetesisat.com/" },
              { "@type": "ListItem", position: 2, name: "Hizmetler", item: "https://golgetesisat.com/hizmetler" },
              { "@type": "ListItem", position: 3, name: s.name, item: `https://golgetesisat.com/hizmet/${s.slug}` },
              { "@type": "ListItem", position: 4, name: "Fiyatlar", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: `${s.name} Fiyatlandırma`,
            description: desc,
            url,
            areaServed: { "@type": "City", name: "İstanbul" },
            offers: {
              "@type": "Offer",
              priceCurrency: "TRY",
              priceSpecification: {
                "@type": "PriceSpecification",
                description: "Yerinde ücretsiz keşif sonrası şeffaf, işe özel fiyatlandırma. Sabit fiyat yoktur.",
              },
              availability: "https://schema.org/InStock",
            },
            provider: {
              "@type": "Plumber",
              name: BUSINESS.name,
              telephone: BUSINESS.phoneE164,
              image: BUSINESS.image,
              priceRange: BUSINESS.priceRange,
              areaServed: "İstanbul",
              sameAs: BUSINESS.sameAs,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Sayfa bulunamadı</h1>
        <p className="mt-2 text-sm text-muted-foreground">Aradığınız hizmet için fiyat sayfası hazırlanıyor.</p>
        <Link to="/" className="mt-4 inline-block rounded-md bg-brand-red px-4 py-2 text-sm font-bold text-white">Ana Sayfa</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-xl font-bold">Bir hata oluştu</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: PricingPage,
});

function PricingPage() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  const Icon = ICONS[s.icon];
  const lc = s.name.toLowerCase();
  const faq = priceFaq(s);
  const otherServices = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* TopBar */}
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

      {/* Breadcrumb */}
      <nav className="px-4 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link to="/" className="hover:text-foreground">Ana Sayfa</Link></li>
          <li>›</li>
          <li><Link to="/hizmetler" className="hover:text-foreground">Hizmetler</Link></li>
          <li>›</li>
          <li><Link to="/hizmet/$slug" params={{ slug: s.slug }} className="hover:text-foreground">{s.name}</Link></li>
          <li>›</li>
          <li className="font-semibold text-foreground">Fiyatlar</li>
        </ol>
      </nav>

      <main>
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-red to-red-700 p-5 text-white shadow-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-widest">
            <Wallet className="h-3 w-3" /> ŞEFFAF FİYAT • ÜCRETSİZ KEŞİF
          </div>
          <h1 className="mt-3 text-[26px] font-extrabold leading-tight">
            {s.name} Fiyatları
            <br />
            <span className="text-white/90 text-[18px] font-bold">İstanbul 2026 ücret rehberi</span>
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/90">
            {s.name} için sabit bir tarife yoktur; ücret işin kapsamına göre belirlenir. İşe başlamadan
            önce yerinde <strong>ücretsiz keşif</strong> yapıp net fiyatı onayınıza sunuyoruz —
            sürpriz ücret çıkarmıyoruz.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-3 text-[13px] font-extrabold text-brand-red">
              <Phone className="h-4 w-4" /> FİYAT AL
            </a>
            <a href={WA_HREF} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-3 text-[13px] font-extrabold text-white">
              <MessageCircle className="h-4 w-4" /> WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="px-4 pt-5">
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Wallet, t: "Ücretsiz", s: "Keşif & teklif" },
            { icon: BadgeCheck, t: "Şeffaf", s: "Sürpriz ücret yok" },
            { icon: ShieldCheck, t: "2 Yıl", s: "İşçilik garantisi" },
          ].map(({ icon: I, t, s: sub }) => (
            <div key={t} className="rounded-lg border border-border bg-surface p-3 text-center">
              <I className="mx-auto h-5 w-5 text-brand-red" />
              <div className="mt-1.5 text-[13px] font-extrabold">{t}</div>
              <div className="text-[10px] text-muted-foreground">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing factors */}
      <section className="px-4 pt-7">
        <h2 className="text-[18px] font-extrabold">{s.name} Fiyatını Etkileyen Faktörler</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.priceIntro}</p>
        <ul className="mt-3 space-y-2">
          {s.priceFactors.map((f) => (
            <li key={f} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span className="text-[13px]">{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why no fixed price — trust copy */}
      <section className="mx-4 mt-7 rounded-2xl border border-border bg-surface p-4">
        <div className="flex items-center gap-2 text-[13px] font-extrabold">
          <Icon className="h-4 w-4 text-brand-red" /> Neden sabit fiyat vermiyoruz?
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
          İnternette gördüğünüz sabit {lc} fiyatları çoğu zaman gerçeği yansıtmaz; sorun yerinde
          görülmeden verilen rakam ya çok yüksek ya da iş sırasında "ek ücret" olarak kabarır.
          Biz tam tersini yapıyoruz: önce ücretsiz keşifle sorunu net olarak tespit ediyor, ardından
          işe başlamadan kesin fiyatı yazılı olarak onayınıza sunuyoruz. Onaylamazsanız hiçbir ücret
          ödemezsiniz.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-4 pt-7">
        <h2 className="text-[18px] font-extrabold">{s.name} Fiyatları — Sıkça Sorulan Sorular</h2>
        <div className="mt-3 space-y-2">
          {faq.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-surface p-3">
              <h3 className="text-[13px] font-extrabold">{f.q}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-4 mt-7 rounded-2xl bg-foreground p-5 text-background">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red">
          <Clock className="h-3.5 w-3.5" /> Şu an müsaitiz
        </div>
        <div className="mt-2 text-[20px] font-extrabold leading-tight">{s.name} için ücretsiz fiyat alın</div>
        <p className="mt-1 text-[12px] opacity-80">Hemen arayın, durumu dinleyip aralık verelim; yerinde keşif sonrası net fiyatı onayınıza sunalım.</p>
        <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
      </section>

      {/* Back to service hub */}
      <section className="px-4 pt-6">
        <Link to="/hizmet/$slug" params={{ slug: s.slug }} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-[12px] font-bold hover:border-brand-red">
          <ArrowRight className="h-3.5 w-3.5 rotate-180 text-brand-red" /> {s.name} hizmet detayları
        </Link>
      </section>

      {/* Other services' pricing */}
      <section className="px-4 pt-8">
        <h2 className="text-[16px] font-extrabold">Diğer Hizmet Fiyatları</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {otherServices.map((o) => {
            const OIcon = ICONS[o.icon];
            return (
              <Link key={o.slug} to="/hizmet/$slug/fiyat" params={{ slug: o.slug }} className="rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                <OIcon className="h-5 w-5 text-brand-red" />
                <div className="mt-2 flex items-center gap-1 text-[13px] font-extrabold"><Tag className="h-3 w-3 text-brand-red" /> {o.name} Fiyatı</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{o.tagline}</div>
              </Link>
            );
          })}
        </div>
      </section>
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
