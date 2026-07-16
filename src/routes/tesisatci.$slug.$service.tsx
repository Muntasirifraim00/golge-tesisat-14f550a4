import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Star, Check, ArrowRight, Droplet, Waves, Flame, Thermometer, Wind, ScanLine, ShowerHead, Droplets, Gauge, AlertTriangle, Wrench, Layers } from "lucide-react";
import { DISTRICTS, findDistrict, slugifyTr } from "@/data/districts";
import { SERVICES, findService, type ServiceIcon, type Service } from "@/data/services";
import type { District } from "@/data/districts";
import { buildMatrixContent } from "@/lib/matrix-seo";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { BUSINESS, DISTRICT_GEO } from "@/data/business";
import { buildReviews, reviewsToSchema } from "@/data/reviews";
import { ReviewsTrust } from "@/components/ReviewsTrust";
import { CustomerReviews } from "@/components/CustomerReviews";
import { guidesForService } from "@/data/blog";
import { findEnrichment } from "@/data/matrix-enrichment";
import { matrixTier } from "@/lib/matrix-tier";
import { BookOpen } from "lucide-react";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

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

export const Route = createFileRoute("/tesisatci/$slug/$service")({
  loader: ({ params }) => {
    const district = findDistrict(params.slug);
    const service = findService(params.service);
    if (!district || !service) throw notFound();
    return { district, service };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.district;
    const s = loaderData?.service;
    if (!d || !s) return { meta: [{ title: "Tesisat Hizmeti — Gölge Tesisat" }] };
    const c = buildMatrixContent(d, s);
    const enrich = findEnrichment(d.slug, s.slug);
    const faqAll = enrich ? [...c.faq, ...enrich.faq] : c.faq;
    const reviews = buildReviews(`${d.slug}:${s.slug}`, d.name, s.name.toLowerCase(), d.responseMin);
    const url = `https://golgetesisat.com/tesisatci/${d.slug}/${s.slug}`;
    const ogImage = `https://golgetesisat.com/og/${s.slug}.jpg`;
    // Tier 3 (thin, low-demand) combos are noindexed so crawl budget flows to
    // the high-value Tier 1/2 pages. "follow" keeps their internal links live.
    // Exception: a combo that has hand-written local enrichment is no longer
    // thin, so it earns indexing regardless of its base tier score.
    const noindex = matrixTier(d, s) === 3 && !enrich;
    return {
      meta: [
        { title: c.title },
        ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
        { name: "description", content: c.metaDescription },
        { name: "keywords", content: `${d.name} ${s.name.toLowerCase()}, ${d.name} ${s.shortName.toLowerCase()}, ${s.name.toLowerCase()} ${d.name}, ${d.name} acil tesisatçı` },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:alt", content: `${d.name} ${s.name} — Gölge Tesisat` },
        { property: "og:locale", content: "tr_TR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: c.title },
        { name: "twitter:description", content: c.metaDescription },
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
              { "@type": "ListItem", position: 2, name: `${d.name} Tesisatçı`, item: `https://golgetesisat.com/tesisatci/${d.slug}` },
              { "@type": "ListItem", position: 3, name: c.h1, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: `${d.name} ${s.name}`,
            description: c.intro,
            url,
            areaServed: [{ "@type": "City", name: d.name }, ...d.neighborhoods.map((n) => ({ "@type": "Place", name: n }))],
            provider: {
              "@type": "Plumber",
              name: `${BUSINESS.name} — ${d.name}`,
              telephone: BUSINESS.phoneE164,
              image: BUSINESS.image,
              priceRange: BUSINESS.priceRange,
              address: {
                "@type": "PostalAddress",
                streetAddress: BUSINESS.address.streetAddress,
                addressLocality: BUSINESS.address.locality,
                addressRegion: BUSINESS.address.region,
                postalCode: BUSINESS.address.postalCode,
                addressCountry: BUSINESS.address.country,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: (DISTRICT_GEO[d.slug] ?? BUSINESS.geo).lat,
                longitude: (DISTRICT_GEO[d.slug] ?? BUSINESS.geo).lng,
              },
              hasMap: `https://www.google.com/maps/search/?api=1&query=${(DISTRICT_GEO[d.slug] ?? BUSINESS.geo).lat},${(DISTRICT_GEO[d.slug] ?? BUSINESS.geo).lng}`,
              areaServed: `${d.name}, İstanbul`,
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: BUSINESS.openingHours.days,
                opens: BUSINESS.openingHours.opens,
                closes: BUSINESS.openingHours.closes,
              },
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
            mainEntity: faqAll.map((f) => ({
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
        <p className="mt-2 text-sm text-muted-foreground">Aradığınız hizmet/bölge için sayfa hazırlanıyor.</p>
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
  component: MatrixPage,
});

function MatrixPage() {
  const { district: d, service: s } = Route.useLoaderData() as { district: District; service: Service };
  const c = buildMatrixContent(d, s);
  const reviews = buildReviews(`${d.slug}:${s.slug}`, d.name, s.name.toLowerCase(), d.responseMin);
  const Icon = ICONS[s.icon];
  const otherServices = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 4);
  const nearbyDistricts = DISTRICTS.filter((x) => x.side === d.side && x.slug !== d.slug).slice(0, 6);
  const guides = guidesForService(s.slug, 4);
  const mahalleler = d.neighborhoods.slice(0, 6);
  const enrich = findEnrichment(d.slug, s.slug);
  const faqAll = enrich ? [...c.faq, ...enrich.faq] : c.faq;

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
          <li><Link to="/tesisatci/$slug" params={{ slug: d.slug }} className="hover:text-foreground">{d.name}</Link></li>
          <li>›</li>
          <li className="font-semibold text-foreground">{s.name}</li>
        </ol>
      </nav>

      <main>
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-red to-red-700 p-5 text-white shadow-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-widest">
            <Icon className="h-3 w-3" /> {d.side.toUpperCase()} • {d.name.toUpperCase()}
          </div>
          <h1 className="mt-3 text-[26px] font-extrabold leading-tight">
            {c.h1}
            <br />
            <span className="text-white/90 text-[18px] font-bold">{c.heroSub}</span>
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/90">{c.intro}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-white/10 px-2 py-2 text-center">
              <div className="text-[18px] font-extrabold">{d.responseMin}<span className="text-[11px]">dk</span></div>
              <div className="text-[9px] opacity-90">Ortalama Müdahale</div>
            </div>
            <div className="rounded-lg bg-white/10 px-2 py-2 text-center">
              <div className="text-[18px] font-extrabold">7/24</div>
              <div className="text-[9px] opacity-90">Hizmet</div>
            </div>
            <div className="rounded-lg bg-white/10 px-2 py-2 text-center">
              <div className="text-[18px] font-extrabold">2 Yıl</div>
              <div className="text-[9px] opacity-90">Garanti</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-lg bg-white py-3 text-[13px] font-extrabold text-brand-red">
              <Phone className="h-4 w-4" /> HEMEN ARA
            </a>
            <a href={WA_HREF} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-3 text-[13px] font-extrabold text-white">
              <MessageCircle className="h-4 w-4" /> WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* Quick facts table */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{d.name} {s.name} — Özet Bilgiler</h2>
        <div className="mt-3 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-[12.5px]">
            <tbody>
              {c.quickFacts.map((f, i) => (
                <tr key={f.label} className={i % 2 ? "bg-surface" : "bg-background"}>
                  <th scope="row" className="border-b border-border px-3 py-2.5 text-left font-semibold text-foreground">{f.label}</th>
                  <td className="border-b border-border px-3 py-2.5 text-muted-foreground">{f.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Local coverage paragraph */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{d.name}'de {s.name}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.localParagraph}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.problemParagraph}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.responseParagraph}</p>
        {mahalleler.length > 0 && (
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            Mahalle bazında hizmet:{" "}
            {mahalleler.map((m, i) => (
              <span key={m}>
                <Link to="/tesisatci/$slug/mahalle/$neighborhood" params={{ slug: d.slug, neighborhood: slugifyTr(m) }} className="font-semibold text-brand-red hover:underline">{m}</Link>
                {i < mahalleler.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        )}
      </section>

      {/* Bölgeye özel — hand-researched local enrichment (per-page uniqueness) */}
      {enrich && (
        <section className="px-4 pt-6">
          <div className="rounded-2xl border border-brand-red/20 bg-brand-red/5 p-4">
            <h2 className="flex items-center gap-2 text-[18px] font-extrabold">
              <MapPin className="h-4 w-4 text-brand-red" /> {d.name} {s.name} — Bölgeye Özel Rehber
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{enrich.intro}</p>
            <div className="mt-3 space-y-2">
              {enrich.localGuide.map((para, i) => (
                <p key={i} className="text-[13px] leading-relaxed text-muted-foreground">{para}</p>
              ))}
            </div>
            {enrich.landmarks && enrich.landmarks.length > 0 && (
              <p className="mt-3 text-[12px] text-muted-foreground">
                <span className="font-semibold text-foreground">Sık çalıştığımız bölgeler:</span> {enrich.landmarks.join(" • ")}
              </p>
            )}
          </div>

          {enrich.comparison && (
            <div className="mt-5">
              <h3 className="text-[16px] font-extrabold">{enrich.comparison.heading}</h3>
              {enrich.comparison.caption && (
                <p className="mt-1 text-[12px] text-muted-foreground">{enrich.comparison.caption}</p>
              )}
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="bg-foreground text-background">
                      {enrich.comparison.columns.map((col) => (
                        <th key={col} className="px-3 py-2.5 text-left font-bold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {enrich.comparison.rows.map((row, i) => (
                      <tr key={row.label} className={i % 2 ? "bg-surface" : "bg-background"}>
                        <th scope="row" className="border-b border-border px-3 py-2.5 text-left font-semibold text-foreground">{row.label}</th>
                        <td className="border-b border-border px-3 py-2.5 text-muted-foreground">{row.a}</td>
                        <td className="border-b border-border px-3 py-2.5 text-muted-foreground">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {enrich.priceSignals && enrich.priceSignals.length > 0 && (
            <div className="mt-5">
              <h3 className="text-[16px] font-extrabold">{d.name} {s.name} Fiyat Aralıkları</h3>
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <table className="w-full text-[12px]">
                  <tbody>
                    {enrich.priceSignals.map((p, i) => (
                      <tr key={p.job} className={i % 2 ? "bg-surface" : "bg-background"}>
                        <th scope="row" className="border-b border-border px-3 py-2.5 text-left font-semibold text-foreground">
                          {p.job}
                          {p.note && <span className="block text-[11px] font-normal text-muted-foreground">{p.note}</span>}
                        </th>
                        <td className="whitespace-nowrap border-b border-border px-3 py-2.5 text-right font-bold text-brand-red">{p.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {enrich.priceNote && <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{enrich.priceNote}</p>}
            </div>
          )}
        </section>
      )}


      {/* What's included */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Hizmetimiz Neleri Kapsar?</h2>
        <ul className="mt-3 space-y-2">
          {s.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span className="text-[13px]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why us */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Neden {d.name}'de Gölge Tesisat?</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.whyParagraph}</p>
        <ul className="mt-3 space-y-2">
          {s.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-[13px]">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Warning signs / belirtiler — SERP gap depth */}
      {s.symptoms && s.symptoms.length > 0 && (
        <section className="px-4 pt-6">
          <h2 className="text-[18px] font-extrabold">{d.name}'de {s.shortName} Belirtileri</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">Aşağıdaki işaretlerden biri bile varsa {d.name} ekibimizden ücretsiz kontrol isteyin; erken müdahale hasarı büyümeden çözer.</p>
          <ul className="mt-3 space-y-2">
            {s.symptoms.map((sym) => (
              <li key={sym.title} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <div>
                  <h3 className="text-[13px] font-extrabold">{sym.title}</h3>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{sym.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Emergency steps — actionable, high-intent */}
      {s.emergencySteps && s.emergencySteps.length > 0 && (
        <section className="px-4 pt-6">
          <h2 className="text-[18px] font-extrabold">Ekip Gelene Kadar Yapmanız Gerekenler</h2>
          <ol className="mt-3 space-y-2">
            {s.emergencySteps.map((e, i) => (
              <li key={e.step} className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[12px] font-extrabold text-white">{i + 1}</span>
                <div>
                  <h3 className="text-[13px] font-extrabold">{e.step}</h3>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Tools / methods — E-E-A-T equipment authority */}
      {s.tools && s.tools.length > 0 && (
        <section className="px-4 pt-6">
          <h2 className="text-[18px] font-extrabold">Kullandığımız Cihaz ve Yöntemler</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{d.name} {s.name.toLowerCase()} işlemini doğru cihaz ve tecrübeli usta birleşimiyle, kırma-dökme yapmadan yürütürüz.</p>
          <ul className="mt-3 space-y-2">
            {s.tools.map((t) => (
              <li key={t.name} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
                <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <div>
                  <h3 className="text-[13px] font-extrabold">{t.name}</h3>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{t.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Variants — leak types / scenarios */}
      {s.variants && s.variants.length > 0 && (
        <section className="px-4 pt-6">
          <h2 className="text-[18px] font-extrabold">Türlerine Göre {s.name} Çözümleri</h2>
          <div className="mt-3 space-y-2">
            {s.variants.map((v) => (
              <div key={v.title} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
                <Layers className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <div>
                  <h3 className="text-[13px] font-extrabold">{v.title}</h3>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{v.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}



      {/* How it's done — process depth (E-E-A-T) */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{d.name}'de {s.howTitle}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.howIntro}</p>
        <ol className="mt-3 space-y-2">
          {s.process.map((p, i) => (
            <li key={p.step} className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-[12px] font-extrabold text-white">{i + 1}</span>
              <div>
                <h3 className="text-[13px] font-extrabold">{p.step}</h3>
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{p.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing logic — transparency depth */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{d.name}'de {s.name} Fiyatları</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.priceIntro}</p>
        <ul className="mt-3 space-y-2">
          {s.priceFactors.map((f) => (
            <li key={f} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span className="text-[13px]">{f}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{c.guaranteeParagraph}</p>
        <p className="mt-3 text-[12px] text-muted-foreground">
          Net fiyat için <a href={PHONE_HREF} className="font-bold text-brand-red">{PHONE}</a> numarasını arayabilir veya{" "}
          <Link to="/hizmet/$slug/fiyat" params={{ slug: s.slug }} className="font-bold text-brand-red">{s.name.toLowerCase()} fiyat detaylarını</Link>{" "}inceleyebilirsiniz.
        </p>
      </section>

      {/* FAQ */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{d.name} {s.name} — Sıkça Sorulan Sorular</h2>
        <div className="mt-3 space-y-2">
          {faqAll.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-surface p-3">
              <h3 className="text-[13px] font-extrabold">{f.q}</h3>
              <p className="mt-1 text-[12px] text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related blog guides — topical authority + internal linking */}
      {guides.length > 0 && (
        <section className="px-4 pt-6">
          <h2 className="text-[18px] font-extrabold">{s.name} Rehberleri</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">{s.name} hakkında uzman ipuçları ve adım adım çözümler:</p>
          <div className="mt-3 space-y-2">
            {guides.map((g) => (
              <Link key={g.slug} to="/blog/$slug" params={{ slug: g.slug }} className="flex items-start gap-2.5 rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <div>
                  <h3 className="text-[13px] font-extrabold leading-snug">{g.title}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">{g.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}



      {/* Reviews + E-E-A-T trust */}
      <ReviewsTrust
        ratingValue={RATING_VALUE}
        reviewCount={REVIEW_COUNT}
        reviews={reviews}
        heading={`${d.name} ${s.name} Müşteri Yorumları`}
      />

      {/* Real, approved customer reviews scoped to this district + service */}
      <CustomerReviews serviceSlug={s.slug} districtSlug={d.slug} districtName={d.name} />



      {/* CTA */}
      <section className="mx-4 mt-6 rounded-2xl bg-foreground p-5 text-background">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red">
          <Clock className="h-3.5 w-3.5" /> Şu an müsaitiz
        </div>
        <div className="mt-2 text-[20px] font-extrabold leading-tight">{d.name}'de {s.name.toLowerCase()} mi gerekiyor?</div>
        <p className="mt-1 text-[12px] opacity-80">Hemen arayın, ortalama {d.responseMin} dakika içinde kapınızda olalım.</p>
        <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
      </section>

      {/* Other services in this district */}
      <section className="px-4 pt-8">
        <h2 className="text-[16px] font-extrabold">{d.name}'de Diğer Hizmetlerimiz</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {otherServices.map((o) => {
            const OIcon = ICONS[o.icon];
            return (
              <Link key={o.slug} to="/tesisatci/$slug/$service" params={{ slug: d.slug, service: o.slug }} className="rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                <OIcon className="h-5 w-5 text-brand-red" />
                <div className="mt-2 text-[13px] font-extrabold">{d.name} {o.shortName}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{o.tagline}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Same service in nearby districts */}
      <section className="px-4 pt-8">
        <h2 className="text-[16px] font-extrabold">{s.name} — Yakın Bölgeler</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {nearbyDistricts.map((nd) => (
            <Link key={nd.slug} to="/tesisatci/$slug/$service" params={{ slug: nd.slug, service: s.slug }} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red" /> {nd.name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
            </Link>
          ))}
        </div>
        <Link to="/hizmet/$slug" params={{ slug: s.slug }} className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red">
          {s.name} hakkında detaylı bilgi <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      <UrgencyCTA />
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
