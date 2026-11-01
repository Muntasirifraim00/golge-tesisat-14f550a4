import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import leakImg from "@/assets/svc2/su-kacagi-tespiti.jpg";
import drainImg from "@/assets/svc2/tikaniklik-acma.jpg";
import gasImg from "@/assets/svc2/dogalgaz-tesisati.jpg";
import radiatorImg from "@/assets/svc2/petek-temizligi.jpg";
import pipeImg from "@/assets/svc2/boru-tamiri.jpg";
import cameraImg from "@/assets/svc2/kanal-goruntuleme.jpg";
import {
  Phone, MessageCircle, Clock, ShieldCheck, Check, ArrowRight, Search, Menu, Grid2X2,
  Droplet, Waves, Flame, Thermometer, ScanLine, Wind, MapPin, Tag, BookOpen,
  ShowerHead, Droplets, Gauge,
} from "lucide-react";
import { SERVICES, findService, relatedServicesFor, type ServiceIcon, type Service } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import { guidesForService } from "@/data/blog";
import { SiteFooter } from "@/components/SiteFooter";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { buildReviews, reviewsToSchema } from "@/data/reviews";
import { ReviewsTrust } from "@/components/ReviewsTrust";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ReviewSubmitForm } from "@/components/ReviewSubmitForm";
import { BUSINESS } from "@/data/business";
import { SERVICE_ITEM_IMAGES } from "@/data/service-item-images";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

// Single source of truth for rating signals so visible content matches JSON-LD.
const RATING_VALUE = "4.9";
const REVIEW_COUNT = 1240;

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

const SERVICE_IMAGES: Record<ServiceIcon, string> = {
  leak: leakImg,
  clog: drainImg,
  combi: gasImg,
  radiator: radiatorImg,
  gas: pipeImg,
  camera: cameraImg,
  shower: pipeImg,
  faucet: leakImg,
  pump: cameraImg,
};

export const Route = createFileRoute("/hizmet/$slug/")({
  loader: ({ params }) => {
    const service = findService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Hizmet — Gölge Tesisat" }] };
    const title = `${s.name} İstanbul — ${s.responseMin} Dk'da Kapınızda, ★${RATING_VALUE}`;
    const desc = `★${RATING_VALUE} (${REVIEW_COUNT.toLocaleString("tr-TR")} yorum) İstanbul ${s.name.toLowerCase()}: ${s.tagline}. 7/24 açık, ücretsiz keşif, garantili işçilik. Hemen arayın: ${PHONE}.`;
    const reviews = buildReviews(`hizmet:${s.slug}`, "İstanbul", s.name.toLowerCase(), s.responseMin);
    const url = `https://golgetesisat.com/hizmet/${s.slug}`;
    const ogImage = `https://golgetesisat.com/og/${s.slug}.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${s.name}, istanbul ${s.shortName.toLowerCase()}, acil ${s.shortName.toLowerCase()}, 7/24 ${s.name.toLowerCase()}` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:alt", content: `${s.name} — Gölge Tesisat İstanbul` },
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
              { "@type": "ListItem", position: 3, name: s.name, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: s.name,
            description: s.intro,
            url,
            areaServed: { "@type": "City", name: "İstanbul" },
            provider: {
              "@type": "Plumber",
              name: BUSINESS.name,
              telephone: BUSINESS.phoneE164,
              image: BUSINESS.image,
              priceRange: BUSINESS.priceRange,
              areaServed: "İstanbul",
              aggregateRating: { "@type": "AggregateRating", ratingValue: RATING_VALUE, reviewCount: String(REVIEW_COUNT) },
              review: reviewsToSchema(reviews),
              sameAs: BUSINESS.sameAs,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: s.howTitle,
            description: s.howIntro,
            image: { "@type": "ImageObject", url: ogImage, width: 1200, height: 630, caption: `İstanbul ${s.name.toLowerCase()} — Gölge Tesisat`, contentLocation: { "@type": "Place", name: "İstanbul" } },
            step: s.process.map((p, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: p.step,
              text: p.detail,
              url: `${url}#adim-${i + 1}`,
            })),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Hizmet bulunamadı</h1>
        <p className="mt-2 text-sm text-muted-foreground">Aradığınız hizmet için sayfa hazırlanıyor.</p>
        <Link to="/" className="mt-4 inline-block rounded-md bg-brand-red px-4 py-2 text-sm font-bold text-white">Ana Sayfa</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-xl font-bold">Bir hata oluştu</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    </div>
  ),
  component: ServicePage,
});

function ImgRow({ img, index, title, detail, id, reverse, stacked, alt }: { img?: string; alt?: string; index: number; title: string; detail?: string; id?: string; reverse?: boolean; stacked?: boolean }) {
  return (
    <li id={id} className={`svc-img-row${reverse ? " is-reverse" : ""}${stacked ? " is-stacked" : ""}`}>
      <div className="svc-img-text">
        <span className="svc-img-num">{String(index + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
        {detail && <p>{detail}</p>}
      </div>
      <div className="svc-img-orb">
        {img ? <img src={img} alt={alt ? `${title} – ${alt}` : title} title={title} loading="lazy" decoding="async" width={816} height={816} /> : <Check />}
      </div>
    </li>
  );
}

function ServicePage() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  const reviews = buildReviews(`hizmet:${s.slug}`, "İstanbul", s.name.toLowerCase(), s.responseMin);
  const Icon = ICONS[s.icon];
  const otherServices = SERVICES.filter((x) => x.slug !== s.slug);
  const popularDistricts = DISTRICTS.slice(0, 12);
  const relatedPosts = guidesForService(s.slug, 6);
  const relatedServices = relatedServicesFor(s.slug, 3);

  const featuredServices = [s, ...relatedServices].slice(0, 3);
  const itemImages = SERVICE_ITEM_IMAGES[s.slug];

  return (
    <div className="sp service-page min-h-screen overflow-x-clip pb-24">
      <div className="bg-[var(--sp-ink)] text-[var(--sp-paper)]">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 px-4 py-2 text-[11px] font-semibold md:px-8 md:text-[12px]">
          <span className="flex items-center gap-1.5 text-[var(--sp-green)]"><span className="h-2 w-2 animate-pulse rounded-full bg-[var(--sp-green)]" />7/24 · {s.shortName} ekipleri görevde</span>
          <span className="hidden opacity-80 md:block">Ort. varış <b>~{s.responseMin} dk</b> · <b>2 yıl</b> yazılı garanti</span>
          <a href={PHONE_HREF} className="font-bold">{PHONE}</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[var(--sp-line)] bg-[var(--sp-paper)]">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between gap-3 px-4 md:h-[74px] md:px-8">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Gölge Tesisat ana sayfa">
            <img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-10 w-10 rounded-lg object-contain md:h-11 md:w-11" />
            <span className="leading-tight">
              <span className="sp-display block text-[20px]">Gölge Tesisat</span>
              <span className="sp-mono block text-[9px] text-[var(--sp-muted)]">Shadow Plumbing</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-[14px] font-semibold text-[var(--sp-muted)] lg:flex">
            <a href="#adim-1" className="px-3 py-2 hover:text-[var(--sp-ink)]">Süreç</a>
            <Link to="/hizmetler" className="px-3 py-2 hover:text-[var(--sp-ink)]">Hizmetler</Link>
            <Link to="/tesisatci" className="px-3 py-2 hover:text-[var(--sp-ink)]">Bölgeler</Link>
            <Link to="/blog" className="px-3 py-2 hover:text-[var(--sp-ink)]">Rehber</Link>
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_HREF} className="sp-btn-ink flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13px] font-bold"><Phone className="h-4 w-4" /> Ara</a>
            <Link to="/randevu" className="sp-btn-red hidden rounded-xl px-4 py-2.5 text-[13px] font-bold sm:block">Randevu al</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[var(--sp-paper)]">
          <div className="relative mx-auto grid max-w-[1180px] gap-10 px-4 pb-12 pt-6 md:px-8 md:pt-8 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <nav className="text-[12px] font-semibold text-[var(--sp-muted)]" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2">
                  <li><Link to="/" className="hover:text-[var(--sp-ink)]">Ana Sayfa</Link></li><li>›</li>
                  <li><Link to="/hizmetler" className="hover:text-[var(--sp-ink)]">Hizmetler</Link></li><li>›</li>
                  <li className="text-[var(--sp-ink)]">{s.shortName}</li>
                </ol>
              </nav>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--sp-red-tint)] py-1.5 pl-1.5 pr-4 text-[13px] font-bold text-[var(--sp-red)]">
                <span className="sp-mono rounded-full bg-[var(--sp-red)] px-2 py-0.5 text-[10px] text-[var(--sp-paper)]">7/24</span> {s.shortName} · İstanbul
              </div>
              <h1 className="sp-display mt-5 text-[50px] md:text-[78px]">
                {s.name.split(" — ")[0]}<br /><span className="text-[var(--sp-red)]">{s.tagline.split(" ").slice(0, 4).join(" ")}</span>
              </h1>
              <p className="sp-display mt-3 text-[22px] text-[var(--sp-muted)] md:text-[28px]">İstanbul · iki yaka · gece gündüz</p>
              <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-[var(--sp-muted)] md:text-[17px]">{s.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/randevu" className="sp-btn-red flex items-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-bold"><Clock className="h-4 w-4" /> Randevu al</Link>
                <a href={PHONE_HREF} className="sp-btn-ink flex items-center gap-2 rounded-xl px-5 py-3.5 text-[15px] font-bold"><Phone className="h-4 w-4" /> {PHONE}</a>
                <a href={WA_HREF} className="flex items-center gap-2 rounded-xl bg-[var(--sp-wa)] px-5 py-3.5 text-[15px] font-bold text-[var(--sp-paper)]"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-dashed border-[var(--sp-line)] pt-6 sm:grid-cols-4">
                {[[`~${s.responseMin} dk`, "Ortalama varış"], ["4.9", "★★★★★ Google"], ["2 yıl", "İşçilik + parça garantisi"], [String(DISTRICTS.length), "Hizmet bölgesi"]].map(([v, l]) => (
                  <div key={l}><div className="sp-display text-[32px]">{v}</div><div className="text-[12px] font-semibold text-[var(--sp-muted)]">{l}</div></div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-[var(--sp-ink)] p-4 text-[var(--sp-paper)] shadow-2xl">
              <div className="sp-mono flex justify-between px-1 pb-3 text-[11px] font-bold"><span className="flex items-center gap-1.5 text-[var(--sp-red-hot)]"><span className="h-2 w-2 animate-pulse rounded-full bg-[var(--sp-red-hot)]" />Saha · canlı</span><span className="opacity-60">{String(SERVICES.findIndex((x) => x.slug === s.slug) + 1).padStart(2, "0")} / {SERVICES.length}</span></div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={SERVICE_IMAGES[s.icon]} alt={`İstanbul ${s.name.toLowerCase()} — Gölge Tesisat ustası işbaşında`} title={`${s.name} İstanbul`} fetchPriority="high" decoding="async" className="h-full w-full object-cover" />
                <span className="sp-btn-red absolute left-1/2 top-4 -translate-x-1/2 w-[88%] text-center rounded-xl px-4 py-2 text-[13px] font-bold">{s.highlights[0]}</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[["Varış", `~${s.responseMin} dk`], ["Keşif", "Ücretsiz"], ["Durum", "7/24"]].map(([k, v], i) => (
                  <div key={k} className="rounded-xl border border-[var(--sp-edge)] p-3"><div className="sp-mono text-[10px] opacity-70">{k}</div><div className={`sp-display mt-1 text-[24px] ${i === 2 ? "text-[var(--sp-red-hot)]" : ""}`}>{v}</div></div>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-hidden bg-[var(--sp-ink)] py-4 text-[var(--sp-paper)]">
            <div className="sp-display flex w-max animate-[sp-marquee_40s_linear_infinite] gap-10 whitespace-nowrap text-[22px] md:text-[26px]">
              {[...s.includes, ...s.includes].map((t, i) => <span key={i} className="flex items-center gap-10">{t}<span className="h-2.5 w-2.5 rounded-full bg-[var(--sp-red-hot)]" /></span>)}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-5 md:px-8 md:py-8" aria-label="Öne çıkan hizmetler">
          <div className="space-y-3">
            {featuredServices.map((item, index) => {
              const CardIcon = ICONS[item.icon];
              return (
                <Link key={item.slug} to="/hizmet/$slug" params={{ slug: item.slug }} className="service-feature-card group relative grid min-h-[154px] grid-cols-[92px_1fr_42px] items-center overflow-hidden border border-border p-3 md:min-h-[178px] md:grid-cols-[116px_1fr_58px] md:p-5">
                  <img src={SERVICE_IMAGES[item.icon]} alt={`${item.name} İstanbul — Gölge Tesisat uygulaması`} title={item.name} loading={index === 0 ? "eager" : "lazy"} decoding="async" className="absolute inset-y-0 right-0 h-full w-[46%] object-cover opacity-65 transition-transform duration-700 group-hover:scale-105" />
                  <div className="service-card-shade absolute inset-0" />
                  <span className="relative flex h-[74px] w-[74px] items-center justify-center rounded-2xl border border-brand-red/25 bg-brand-red/15 md:h-[94px] md:w-[94px]">
                    <CardIcon className="h-9 w-9 text-brand-red md:h-12 md:w-12" />
                  </span>
                  <span className="relative min-w-0 pr-1">
                    <span className="block font-display text-[18px] font-black leading-tight md:text-[26px]">{item.name}</span>
                    <span className="mt-1 block max-w-[430px] text-[12px] leading-snug text-muted-foreground md:text-[15px]">{item.tagline}</span>
                    <span className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[10px] font-semibold text-foreground md:text-xs">
                      <Check className="h-3.5 w-3.5 shrink-0 text-brand-red" /> {index === 0 ? "Kırmadan, noktasal çözüm" : item.highlights[0]}
                    </span>
                  </span>
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/90 text-brand-red transition-transform group-hover:translate-x-1 md:h-14 md:w-14">
                    <ArrowRight className="h-6 w-6 md:h-8 md:w-8" />
                  </span>
                </Link>
              );
            })}
          </div>

          <Link to="/hizmetler" className="service-all-button mt-4 flex h-16 items-center justify-center gap-4 border border-brand-red px-5 font-display text-base font-black md:h-20 md:text-xl">
            <Grid2X2 className="h-6 w-6" /> Tüm Hizmetleri Gör <ArrowRight className="ml-auto h-6 w-6 text-brand-red" />
          </Link>

          <div className="mt-5 grid grid-cols-3 divide-x divide-border py-3 text-center">
            {[
              [ShieldCheck, "Ücretsiz keşif", "Onaylı işlem"],
              [Clock, `Yaklaşık ${s.responseMin} dk`, "Hızlı müdahale"],
              [Phone, "7/24 acil", "Kesintisiz destek"],
            ].map(([TrustIcon, title, detail]) => {
              const TI = TrustIcon as React.ComponentType<{ className?: string }>;
              return <div key={String(title)} className="px-2"><TI className="mx-auto h-6 w-6 text-brand-red" /><div className="mt-2 text-[11px] font-extrabold md:text-sm">{String(title)}</div><div className="mt-0.5 hidden text-[10px] text-muted-foreground sm:block">{String(detail)}</div></div>;
            })}
          </div>
        </section>

        <div className="service-content mx-auto max-w-[1180px] px-4 pb-10 md:px-8">
          {itemImages ? (
            <>
              <section className="service-panel svc-premium">
                <p className="service-kicker">Kapsam</p><h2>{s.name} Hizmetimiz Neleri Kapsar?</h2>
                <ul className="svc-img-grid">{s.includes.map((item, i) => <ImgRow alt={`${s.name} İstanbul`} key={item} img={itemImages.includes[i]} index={i} title={item} />)}</ul>
              </section>
              <section className="service-panel svc-premium mt-4">
                <p className="service-kicker">Güvence</p><h2>Neden Gölge Tesisat?</h2>
                <ul className="svc-img-grid is-three">{s.highlights.map((item, i) => <ImgRow alt={`${s.name} İstanbul`} key={item} img={itemImages.highlights[i]} index={i} title={item} stacked />)}</ul>
              </section>
              <section className="service-panel svc-premium mt-4">
                <p className="service-kicker">Uygulama</p><h2>{s.howTitle}</h2><p>{s.howIntro}</p>
                <ol className="svc-img-grid svc-timeline">{s.process.map((p, i) => <ImgRow alt={`${s.name} İstanbul`} key={p.step} id={`adim-${i + 1}`} img={itemImages.process[i]} index={i} title={p.step} detail={p.detail} reverse={i % 2 === 1} />)}</ol>
              </section>
              <section className="service-panel svc-premium mt-4">
                <p className="service-kicker">Şeffaf Teklif</p><h2>{s.name} Fiyatını Etkileyen Faktörler</h2><p>{s.priceIntro}</p>
                <ul className="svc-img-grid">{s.priceFactors.map((item, i) => <ImgRow alt={`${s.name} İstanbul`} key={item} img={itemImages.priceFactors[i]} index={i} title={item} />)}</ul>
                <Link to="/hizmet/$slug/fiyat" params={{ slug: s.slug }} className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-red px-4 py-2 text-xs font-bold text-brand-red"><Tag className="h-4 w-4" /> Fiyat ve ücret rehberi <ArrowRight className="h-4 w-4" /></Link>
              </section>
              {s.symptoms && s.symptoms.length > 0 && (
                <section className="service-panel svc-premium mt-4">
                  <p className="service-kicker">Belirtiler</p><h2>{s.name} Gerektiren Belirtiler</h2>
                  <ul className="svc-info-grid">{s.symptoms.map((x) => <li key={x.title}><h3>{x.title}</h3><p>{x.detail}</p></li>)}</ul>
                </section>
              )}
              {s.emergencySteps && s.emergencySteps.length > 0 && (
                <section className="service-panel svc-premium svc-alert mt-4">
                  <p className="service-kicker">İlk Müdahale</p><h2>Usta Gelene Kadar Yapmanız Gerekenler</h2>
                  <ol className="svc-info-grid is-steps">{s.emergencySteps.map((x, i) => <li key={x.step}><span className="svc-img-num">{String(i + 1).padStart(2, "0")}</span><h3>{x.step}</h3><p>{x.detail}</p></li>)}</ol>
                  <a href={PHONE_HREF} className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-extrabold text-brand-red-foreground"><Phone className="h-4 w-4" /> Hemen Ara: {PHONE}</a>
                </section>
              )}
              {s.tools && s.tools.length > 0 && (
                <section className="service-panel svc-premium mt-4">
                  <p className="service-kicker">Ekipman</p><h2>{s.name} İçin Kullandığımız Cihazlar</h2>
                  <ul className="svc-info-grid">{s.tools.map((x) => <li key={x.name}><h3>{x.name}</h3><p>{x.detail}</p></li>)}</ul>
                </section>
              )}
              {s.variants && s.variants.length > 0 && (
                <section className="service-panel svc-premium mt-4">
                  <p className="service-kicker">Türler</p><h2>Hangi Durumlarda Hizmet Veriyoruz?</h2>
                  <ul className="svc-info-grid">{s.variants.map((x) => <li key={x.title}><h3>{x.title}</h3><p>{x.detail}</p></li>)}</ul>
                </section>
              )}
            </>
          ) : (<>
          <div className="grid gap-4 lg:grid-cols-2">
            <section className="service-panel">
              <p className="service-kicker">Kapsam</p><h2>{s.name} Hizmetimiz Neleri Kapsar?</h2>
              <ul className="service-check-grid">{s.includes.map((item) => <li key={item}><Check />{item}</li>)}</ul>
            </section>
            <section className="service-panel">
              <p className="service-kicker">Güvence</p><h2>Neden Gölge Tesisat?</h2>
              <ul className="service-check-grid">{s.highlights.map((item) => <li key={item}><ShieldCheck />{item}</li>)}</ul>
            </section>
          </div>

          <section className="service-panel mt-4">
            <p className="service-kicker">Uygulama</p><h2>{s.howTitle}</h2><p>{s.howIntro}</p>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">{s.process.map((p, i) => <li key={p.step} id={`adim-${i + 1}`} className="service-step"><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{p.step}</h3><p>{p.detail}</p></div></li>)}</ol>
          </section>

          <section className="service-panel mt-4">
            <p className="service-kicker">Şeffaf Teklif</p><h2>{s.name} Fiyatını Etkileyen Faktörler</h2><p>{s.priceIntro}</p>
            <ul className="service-check-grid md:grid-cols-2">{s.priceFactors.map((item) => <li key={item}><Check />{item}</li>)}</ul>
            <Link to="/hizmet/$slug/fiyat" params={{ slug: s.slug }} className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-red px-4 py-2 text-xs font-bold text-brand-red"><Tag className="h-4 w-4" /> Fiyat ve ücret rehberi <ArrowRight className="h-4 w-4" /></Link>
          </section>
          </>)}

          <section className="service-panel mt-4">
            <p className="service-kicker">Merak Edilenler</p><h2>Sıkça Sorulan Sorular</h2>
            <div className="mt-4 grid gap-2 md:grid-cols-2">{s.faq.map((f) => <details key={f.q} className="service-faq group"><summary>{f.q}<span>+</span></summary><p>{f.a}</p></details>)}</div>
          </section>

      {/* Rehberler — blog cluster silo for this service (internal linking) */}
      {relatedPosts.length > 0 && (
        <section className="service-panel mt-4">
          <h2 className="text-[18px] font-extrabold">{s.name} Rehberleri</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">{s.name} hakkında bilmeniz gereken her şey — uzman ekibimizden pratik rehberler.</p>
           <div className="mt-3 grid gap-2 md:grid-cols-2">
            {relatedPosts.map((p) => (
               <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3 hover:border-brand-red">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <div>
                  <div className="text-[13px] font-extrabold">{p.title}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{p.readMin} dk okuma · {p.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* İlgili Hizmetler — horizontal hub↔hub links (internal linking) */}
      {relatedServices.length > 0 && (
        <section className="service-panel mt-4">
          <h2 className="text-[16px] font-extrabold">İlgili Hizmetler</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">{s.shortName} ile birlikte en sık talep edilen çözümler.</p>
           <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-3">
            {relatedServices.map((r) => {
              const RIcon = ICONS[r.icon];
              return (
                <Link key={r.slug} to="/hizmet/$slug" params={{ slug: r.slug }} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/10">
                    <RIcon className="h-5 w-5 text-brand-red" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-extrabold">{r.name}</span>
                    <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">{r.tagline}</span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-brand-red" />
                </Link>
              );
            })}
          </div>
        </section>
      )}



      {/* Reviews + E-E-A-T trust */}
      <ReviewsTrust
        ratingValue={RATING_VALUE}
        reviewCount={REVIEW_COUNT}
        reviews={reviews}
        heading={`${s.name} Müşteri Yorumları`}
      />

      {/* Phase 24 — real, approved customer reviews from the database */}
      <CustomerReviews serviceSlug={s.slug} />



      {/* CTA */}
       <section className="service-cta mt-4 p-5 md:p-8">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red">
          <Clock className="h-3.5 w-3.5" /> Şu an müsaitiz
        </div>
        <div className="mt-2 text-[20px] font-extrabold leading-tight">{s.name} için hemen destek alın</div>
        <p className="mt-1 text-[12px] opacity-80">Hemen arayın, ortalama {s.responseMin} dakika içinde kapınızda olalım.</p>
        <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
      </section>

      {/* Other services */}
       <section className="service-panel mt-4">
        <h2 className="text-[16px] font-extrabold">Diğer Hizmetlerimiz</h2>
         <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
          {otherServices.map((o) => {
            const OIcon = ICONS[o.icon];
            return (
              <Link key={o.slug} to="/hizmet/$slug" params={{ slug: o.slug }} className="rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                <OIcon className="h-5 w-5 text-brand-red" />
                <div className="mt-2 text-[13px] font-extrabold">{o.name}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{o.tagline}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Service areas — deep-link to hyper-local matrix pages */}
       <section className="service-panel mt-4">
        <h2 className="text-[16px] font-extrabold">{s.name} Hizmeti Verdiğimiz Bölgeler</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {popularDistricts.map((dst) => (
            <Link key={dst.slug} to="/tesisatci/$slug/$service" params={{ slug: dst.slug, service: s.slug }} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red" /> {dst.name} {s.shortName}</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
            </Link>
          ))}
        </div>
        <Link to="/tesisatci" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red">
          Tüm bölgeler <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      {/* Phase 24 — let real customers submit a review */}
       <section className="service-panel mt-4">
        <ReviewSubmitForm serviceSlug={s.slug} />
      </section>

          <UrgencyCTA />
        </div>
      </main>
      <SiteFooter />
      <div className="service-contact-bar fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border p-3 md:static md:mx-auto md:mb-8 md:mt-4 md:max-w-[1120px] md:rounded-2xl md:border">
        <a href={PHONE_HREF} className="flex h-14 items-center justify-center gap-2 rounded-xl bg-brand-red font-display text-lg font-black text-brand-red-foreground"><Phone className="h-6 w-6" /> Hemen Ara</a>
        <a href={WA_HREF} target="_blank" rel="noopener" className="flex h-14 items-center justify-center gap-2 rounded-xl bg-brand-green font-display text-lg font-black text-brand-green-foreground"><MessageCircle className="h-6 w-6" /> WhatsApp</a>
      </div>
    </div>
  );
}
