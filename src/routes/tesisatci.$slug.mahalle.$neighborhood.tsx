import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import {
  Phone, MessageCircle, MapPin, Clock, ShieldCheck, Check, ArrowRight,
  Droplet, Waves, Flame, Thermometer, Wind, ScanLine,
  ShowerHead, Droplets, Gauge,
} from "lucide-react";
import {
  DISTRICTS, findNeighborhood, slugifyTr, type District,
} from "@/data/districts";
import { SERVICES, type ServiceIcon } from "@/data/services";
import { buildNeighborhoodContent } from "@/lib/matrix-seo";
import { NEIGHBORHOOD_INDEXABLE } from "@/lib/matrix-tier";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { BUSINESS, DISTRICT_GEO } from "@/data/business";
import { buildReviews, reviewsToSchema } from "@/data/reviews";
import { ReviewsTrust } from "@/components/ReviewsTrust";
import { CustomerReviews } from "@/components/CustomerReviews";

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

export const Route = createFileRoute("/tesisatci/$slug/mahalle/$neighborhood")({
  loader: ({ params }) => {
    const match = findNeighborhood(params.slug, params.neighborhood);
    if (!match) throw notFound();
    return { district: match.district, neighborhood: match.neighborhood, neighborhoodSlug: match.neighborhoodSlug };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.district;
    const nb = loaderData?.neighborhood;
    if (!d || !nb) return { meta: [{ title: "Mahalle Tesisatçı — Gölge Tesisat" }] };
    const c = buildNeighborhoodContent(d, nb);
    const reviews = buildReviews(`${d.slug}:nb:${loaderData.neighborhoodSlug}`, nb, "acil tesisat", d.responseMin);
    const url = `https://golgetesisat.com/tesisatci/${d.slug}/mahalle/${loaderData.neighborhoodSlug}`;
    const geo = DISTRICT_GEO[d.slug] ?? BUSINESS.geo;
    return {
      meta: [
        { title: c.title },
        // Ultra-long-tail mahalle pages are noindexed for now to protect crawl
        // budget; they stay live for users and keep links followed.
        ...(NEIGHBORHOOD_INDEXABLE ? [] : [{ name: "robots", content: "noindex, follow" }]),
        { name: "description", content: c.metaDescription },
        { name: "keywords", content: `${nb} tesisatçı, ${nb} su kaçağı, ${nb} tıkanıklık açma, ${nb} kombi servisi, ${nb} acil tesisatçı` },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://golgetesisat.com/og-image.jpg" },
        { property: "og:locale", content: "tr_TR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: c.title },
        { name: "twitter:description", content: c.metaDescription },
        { name: "twitter:image", content: "https://golgetesisat.com/og-image.jpg" },
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
              { "@type": "ListItem", position: 3, name: `${nb} Tesisatçı`, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Plumber",
            name: `${BUSINESS.name} — ${nb}, ${d.name}`,
            description: c.intro,
            image: BUSINESS.image,
            url,
            telephone: BUSINESS.phoneE164,
            priceRange: BUSINESS.priceRange,
            areaServed: { "@type": "Place", name: `${nb}, ${d.name}, İstanbul` },
            address: {
              "@type": "PostalAddress",
              addressLocality: d.name,
              addressRegion: "İstanbul",
              addressCountry: "TR",
            },
            geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
            aggregateRating: { "@type": "AggregateRating", ratingValue: RATING_VALUE, reviewCount: String(REVIEW_COUNT) },
            review: reviewsToSchema(reviews),
            sameAs: BUSINESS.sameAs,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
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
        <h1 className="text-2xl font-extrabold">Mahalle bulunamadı</h1>
        <p className="mt-2 text-sm text-muted-foreground">Aradığınız mahalle için sayfa hazırlanıyor.</p>
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
  component: NeighborhoodPage,
});

function NeighborhoodPage() {
  const { district: d, neighborhood: nb } = Route.useLoaderData() as {
    district: District;
    neighborhood: string;
    neighborhoodSlug: string;
  };
  const c = buildNeighborhoodContent(d, nb);
  const reviews = buildReviews(`${d.slug}:nb:${slugifyTr(nb)}`, nb, "acil tesisat", d.responseMin);
  const otherNeighborhoods = d.neighborhoods.filter((n) => n !== nb).slice(0, 6);
  const nearbyDistricts = DISTRICTS.filter((x) => x.side === d.side && x.slug !== d.slug).slice(0, 6);

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
          <li className="font-semibold text-foreground">{nb}</li>
        </ol>
      </nav>

      <main>
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-red to-red-700 p-5 text-white shadow-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-widest">
            <MapPin className="h-3 w-3" /> {d.name.toUpperCase()} • {nb.toUpperCase()}
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

      {/* Local coverage paragraph */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{nb}'nde Tesisatçı</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.localParagraph}</p>
      </section>

      {/* Services in this neighborhood */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{nb}'nde Verdiğimiz Hizmetler</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SERVICES.map((s) => {
            const SIcon = ICONS[s.icon];
            return (
              <Link key={s.slug} to="/tesisatci/$slug/$service" params={{ slug: d.slug, service: s.slug }} className="rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                <SIcon className="h-5 w-5 text-brand-red" />
                <div className="mt-2 text-[13px] font-extrabold">{nb} {s.shortName}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{s.tagline}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why us */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Neden {nb}'nde Gölge Tesisat?</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{c.whyParagraph}</p>
        <ul className="mt-3 space-y-2">
          {d.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span className="text-[13px]">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Sıkça Sorulan Sorular</h2>
        <div className="mt-3 space-y-2">
          {c.faq.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-surface p-3">
              <h3 className="text-[13px] font-extrabold">{f.q}</h3>
              <p className="mt-1 text-[12px] text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews + E-E-A-T trust */}
      <ReviewsTrust
        ratingValue={RATING_VALUE}
        reviewCount={REVIEW_COUNT}
        reviews={reviews}
        heading={`${nb} Müşteri Yorumları`}
      />

      <CustomerReviews districtSlug={d.slug} districtName={d.name} />

      {/* CTA */}
      <section className="mx-4 mt-6 rounded-2xl bg-foreground p-5 text-background">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red">
          <Clock className="h-3.5 w-3.5" /> Şu an müsaitiz
        </div>
        <div className="mt-2 text-[20px] font-extrabold leading-tight">{nb}'nde tesisat sorununuz mu var?</div>
        <p className="mt-1 text-[12px] opacity-80">Hemen arayın, ortalama {d.responseMin} dakika içinde kapınızda olalım.</p>
        <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
      </section>

      {/* Other neighborhoods in this district */}
      {otherNeighborhoods.length > 0 && (
        <section className="px-4 pt-8">
          <h2 className="text-[16px] font-extrabold">{d.name}'de Diğer Mahalleler</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {otherNeighborhoods.map((n) => (
              <Link key={n} to="/tesisatci/$slug/mahalle/$neighborhood" params={{ slug: d.slug, neighborhood: slugifyTr(n) }} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red" /> {n}</span>
                <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
              </Link>
            ))}
          </div>
          <Link to="/tesisatci/$slug" params={{ slug: d.slug }} className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red">
            {d.name} tesisatçı sayfası <ArrowRight className="h-3 w-3" />
          </Link>
        </section>
      )}

      {/* Nearby districts */}
      <section className="px-4 pt-8">
        <h2 className="text-[16px] font-extrabold">Yakın Bölgeler</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {nearbyDistricts.map((nd) => (
            <Link key={nd.slug} to="/tesisatci/$slug" params={{ slug: nd.slug }} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red" /> {nd.name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
            </Link>
          ))}
        </div>
      </section>

      <UrgencyCTA />
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
