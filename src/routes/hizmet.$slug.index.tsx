import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import {
  Phone, MessageCircle, Clock, ShieldCheck, Check, ArrowRight,
  Droplet, Waves, Flame, Thermometer, ScanLine, Wind, MapPin, Tag, BookOpen,
  ShowerHead, Droplets, Gauge,
} from "lucide-react";
import { SERVICES, findService, relatedServicesFor, type ServiceIcon, type Service } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import { guidesForService } from "@/data/blog";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { buildReviews, reviewsToSchema } from "@/data/reviews";
import { ReviewsTrust } from "@/components/ReviewsTrust";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ReviewSubmitForm } from "@/components/ReviewSubmitForm";
import { BUSINESS } from "@/data/business";

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

export const Route = createFileRoute("/hizmet/$slug/")({
  loader: ({ params }) => {
    const service = findService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Hizmet — Gölge Tesisat" }] };
    const title = `${s.name} — İstanbul 7/24 | Gölge Tesisat`;
    const desc = `İstanbul ${s.name.toLowerCase()} hizmeti: ${s.tagline}. Ortalama ${s.responseMin} dakikada kapınızda, ücretsiz keşif. Telefon: ${PHONE}.`;
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
            image: ogImage,
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
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  const reviews = buildReviews(`hizmet:${s.slug}`, "İstanbul", s.name.toLowerCase(), s.responseMin);
  const Icon = ICONS[s.icon];
  const otherServices = SERVICES.filter((x) => x.slug !== s.slug);
  const popularDistricts = DISTRICTS.slice(0, 12);
  const relatedPosts = guidesForService(s.slug, 6);
  const relatedServices = relatedServicesFor(s.slug, 3);

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
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-foreground">Ana Sayfa</Link></li>
          <li>›</li>
          <li><Link to="/hizmetler" className="hover:text-foreground">Hizmetler</Link></li>
          <li>›</li>
          <li className="font-semibold text-foreground">{s.name}</li>
        </ol>
      </nav>

      <main>
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-red to-red-700 p-5 text-white shadow-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-widest">
            <Icon className="h-3 w-3" /> İSTANBUL 7/24
          </div>
          <h1 className="mt-3 text-[26px] font-extrabold leading-tight">
            {s.name}
            <br />
            <span className="text-white/90 text-[18px] font-bold">{s.tagline}</span>
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/90">{s.intro}</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-white/10 px-2 py-2 text-center">
              <div className="text-[18px] font-extrabold">{s.responseMin}<span className="text-[11px]">dk</span></div>
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

      {/* What's included */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{s.name} Hizmetimiz Neleri Kapsar?</h2>
        <ul className="mt-3 space-y-2">
          {s.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span className="text-[13px]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Highlights */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Neden Gölge Tesisat?</h2>
        <ul className="mt-3 space-y-2">
          {s.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-[13px]">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works — "nasıl yapılır" explainer */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{s.howTitle}</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{s.howIntro}</p>
        <ol className="mt-3 space-y-2">
          {s.process.map((p, i) => (
            <li key={p.step} id={`adim-${i + 1}`} className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3 scroll-mt-20">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-[12px] font-extrabold text-white">{i + 1}</span>
              <div>
                <div className="text-[13px] font-extrabold">{p.step}</div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{p.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Pricing factors — transparent, no fixed prices. Deep-links to /fiyat page. */}
      <section className="px-4 pt-6">
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
        <Link to="/hizmet/$slug/fiyat" params={{ slug: s.slug }} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-red px-3 py-2 text-[12px] font-bold text-brand-red hover:bg-brand-red/5">
          <Tag className="h-3.5 w-3.5" /> {s.name} fiyatları & ücret rehberi <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>

      {/* FAQ */}

      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Sıkça Sorulan Sorular</h2>
        <div className="mt-3 space-y-2">
          {s.faq.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-surface p-3">
              <div className="text-[13px] font-extrabold">{f.q}</div>
              <p className="mt-1 text-[12px] text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rehberler — blog cluster silo for this service (internal linking) */}
      {relatedPosts.length > 0 && (
        <section className="px-4 pt-7">
          <h2 className="text-[18px] font-extrabold">{s.name} Rehberleri</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">{s.name} hakkında bilmeniz gereken her şey — uzman ekibimizden pratik rehberler.</p>
          <div className="mt-3 space-y-2">
            {relatedPosts.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
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
        <section className="px-4 pt-7">
          <h2 className="text-[16px] font-extrabold">İlgili Hizmetler</h2>
          <p className="mt-1 text-[12px] text-muted-foreground">{s.shortName} ile birlikte en sık talep edilen çözümler.</p>
          <div className="mt-3 grid grid-cols-1 gap-2">
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
      <section className="mx-4 mt-6 rounded-2xl bg-foreground p-5 text-background">
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
      <section className="px-4 pt-8">
        <h2 className="text-[16px] font-extrabold">Diğer Hizmetlerimiz</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
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
      <section className="px-4 pt-8">
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
      <section className="px-4 pt-8">
        <ReviewSubmitForm serviceSlug={s.slug} />
      </section>

      <UrgencyCTA />
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
