import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Star, Check, ArrowRight, Droplet, Waves, Flame, Thermometer, Wind, ScanLine, ShowerHead, Droplets, Gauge } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { DISTRICTS, findDistrict, slugifyTr } from "@/data/districts";
import { SERVICES, type ServiceIcon } from "@/data/services";
import { buildReviews, reviewsToSchema } from "@/data/reviews";
import { ReviewsTrust } from "@/components/ReviewsTrust";
import { CustomerReviews } from "@/components/CustomerReviews";

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

export const Route = createFileRoute("/tesisatci/$slug/")({
  loader: ({ params }) => {
    const district = findDistrict(params.slug);
    if (!district) throw notFound();
    return { district };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.district;
    if (!d) return { meta: [{ title: "Tesisatçı — Gölge Tesisat" }] };
    const title = `${d.name} Tesisatçı — 7/24 Acil Servis | Gölge Tesisat`;
    const desc = `${d.name} tesisatçı hizmeti: su kaçağı, tıkanıklık açma, kombi servisi ve petek temizliği. Ortalama ${d.responseMin} dakikada kapınızda. Telefon: ${PHONE}.`;
    const reviews = buildReviews(`bolge:${d.slug}`, d.name, "acil tesisat", d.responseMin);
    const url = `https://golgetesisat.com/tesisatci/${d.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${d.name} tesisatçı, ${d.name} su kaçağı, ${d.name} kombi servisi, ${d.name} acil tesisatçı, ${d.name} tıkanıklık açma` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://golgetesisat.com/og-image.jpg" },
        { property: "og:locale", content: "tr_TR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
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
              { "@type": "ListItem", position: 2, name: "Tesisatçı", item: "https://golgetesisat.com/tesisatci" },
              { "@type": "ListItem", position: 3, name: `${d.name} Tesisatçı`, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Plumber",
            name: `Gölge Tesisat — ${d.name}`,
            description: d.intro,
            image: "https://golgetesisat.com/og-image.jpg",
            url,
            telephone: "+905338960503",
            priceRange: "₺₺",
            areaServed: [{ "@type": "City", name: d.name }, ...d.neighborhoods.map((n) => ({ "@type": "Place", name: n }))],
            address: {
              "@type": "PostalAddress",
              addressLocality: d.name,
              addressRegion: "İstanbul",
              addressCountry: "TR",
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "00:00",
              closes: "23:59",
            },
            aggregateRating: { "@type": "AggregateRating", ratingValue: RATING_VALUE, reviewCount: String(REVIEW_COUNT) },
            review: reviewsToSchema(reviews),
            sameAs: ["https://wa.me/905338960503"],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `${d.name}'de acil tesisatçı ne kadar sürede gelir?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `${d.name} ve çevresinde acil çağrılara ortalama ${d.responseMin} dakika içinde müdahale ediyoruz. 7/24 hizmet veriyoruz.`,
                },
              },
              {
                "@type": "Question",
                name: `${d.name}'de hangi mahallelere hizmet veriyorsunuz?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `${d.name} genelinde ${d.neighborhoods.join(", ")} dahil tüm mahallelere tesisat hizmeti sunuyoruz.`,
                },
              },
              {
                "@type": "Question",
                name: `${d.name} tesisatçı fiyatları nasıl belirleniyor?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `İşleme başlamadan önce şeffaf fiyat veriyoruz; sürpriz ücret yok. Tüm işçiliğimiz garantilidir. Bilgi için ${PHONE} numarasını arayabilirsiniz.`,
                },
              },
              ...(d.faq ?? []).map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            ],

          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Bölge bulunamadı</h1>
        <p className="mt-2 text-sm text-muted-foreground">Aradığınız ilçe için sayfa hazırlanıyor.</p>
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
  component: DistrictPage,
});

function DistrictPage() {
  const { district: d } = Route.useLoaderData();
  const reviews = buildReviews(`bolge:${d.slug}`, d.name, "acil tesisat", d.responseMin);
  const otherDistricts = DISTRICTS.filter((x) => x.slug !== d.slug).slice(0, 6);

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
          <li><Link to="/tesisatci" className="hover:text-foreground">Tesisatçı</Link></li>
          <li>›</li>
          <li className="font-semibold text-foreground">{d.name}</li>
        </ol>
      </nav>

      <main>
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-red to-red-700 p-5 text-white shadow-xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold tracking-widest">
            <MapPin className="h-3 w-3" /> {d.side.toUpperCase()}
          </div>
          <h1 className="mt-3 text-[26px] font-extrabold leading-tight">
            {d.name} Tesisatçı
            <br />
            <span className="text-white/90 text-[18px] font-bold">7/24 Acil Servis</span>
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/90">{d.intro}</p>
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

      {/* Highlights */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Neden {d.name}'de Bizi Tercih Etmelisiniz?</h2>
        <ul className="mt-3 space-y-2">
          {d.highlights.map((h: string) => (
            <li key={h} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
              <span className="text-[13px]">{h}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Local context — unique deep content (tier-1 hubs) */}
      {d.localContext && d.localContext.length > 0 && (
        <section className="px-4 pt-6">
          <h2 className="text-[18px] font-extrabold">{d.name}'de Tesisat: Bölgeye Özel Yaklaşımımız</h2>
          <div className="mt-3 space-y-3">
            {d.localContext.map((p: string, i: number) => (
              <p key={i} className="text-[13px] leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Common issues — district-specific frequent problems (tier-1 hubs) */}
      {d.commonIssues && d.commonIssues.length > 0 && (
        <section className="px-4 pt-6">
          <h2 className="text-[18px] font-extrabold">{d.name}'de En Sık Karşılaşılan Sorunlar</h2>
          <div className="mt-3 space-y-2">
            {d.commonIssues.map((c: { title: string; detail: string }) => (
              <div key={c.title} className="rounded-lg border border-border bg-surface p-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                  <div>
                    <div className="text-[13px] font-extrabold">{c.title}</div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{c.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}



      {/* Services — link to hyper-local matrix pages */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">{d.name}'de Verdiğimiz Hizmetler</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SERVICES.map((s) => {
            const SIcon = ICONS[s.icon];
            return (
              <Link key={s.slug} to="/tesisatci/$slug/$service" params={{ slug: d.slug, service: s.slug }} className="rounded-lg border border-border bg-surface p-3 hover:border-brand-red">
                <SIcon className="h-5 w-5 text-brand-red" />
                <div className="mt-2 text-[13px] font-extrabold">{d.name} {s.shortName}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{s.tagline}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Neighborhoods — deep-link to hyper-local mahalle pages */}
      <section className="px-4 pt-6">
        <h2 className="text-[18px] font-extrabold">Hizmet Verdiğimiz Mahalleler</h2>
        <p className="mt-1 text-[12px] text-muted-foreground">{d.name} ilçesinin tüm mahallelerinde tesisatçı hizmeti.</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {d.neighborhoods.map((n: string) => (
            <Link
              key={n}
              to="/tesisatci/$slug/mahalle/$neighborhood"
              params={{ slug: d.slug, neighborhood: slugifyTr(n) }}
              className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold hover:border-brand-red"
            >
              {n} Tesisatçı
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews + E-E-A-T trust */}
      <ReviewsTrust
        ratingValue={RATING_VALUE}
        reviewCount={REVIEW_COUNT}
        reviews={reviews}
        heading={`${d.name} Müşteri Yorumları`}
      />

      {/* Real, approved customer reviews scoped to this district */}
      <CustomerReviews districtSlug={d.slug} districtName={d.name} />

      {/* District FAQ — unique Q&A (tier-1 hubs) */}
      {d.faq && d.faq.length > 0 && (
        <section className="px-4 pt-8">
          <h2 className="text-[18px] font-extrabold">{d.name} Tesisatçı — Sık Sorulan Sorular</h2>
          <div className="mt-3 space-y-2">
            {d.faq.map((f: { q: string; a: string }) => (
              <details key={f.q} className="group rounded-lg border border-border bg-surface p-3">
                <summary className="cursor-pointer list-none text-[13px] font-extrabold marker:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}





      {/* CTA */}
      <section className="mx-4 mt-6 rounded-2xl bg-foreground p-5 text-background">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red">
          <Clock className="h-3.5 w-3.5" /> Şu an müsaitiz
        </div>
        <div className="mt-2 text-[20px] font-extrabold leading-tight">{d.name}'de tesisat sorununuz mu var?</div>
        <p className="mt-1 text-[12px] opacity-80">Hemen arayın, ortalama {d.responseMin} dakika içinde kapınızda olalım.</p>
        <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
      </section>

      {/* Other districts */}
      <section className="px-4 pt-8">
        <h2 className="text-[16px] font-extrabold">Diğer Hizmet Bölgelerimiz</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {otherDistricts.map((o) => (
            <Link key={o.slug} to="/tesisatci/$slug" params={{ slug: o.slug }} className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red">
              <span>{o.name} Tesisatçı</span>
              <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
            </Link>
          ))}
        </div>
        <Link to="/tesisatci" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red">
          Tüm bölgeler <ArrowRight className="h-3 w-3" />
        </Link>
      </section>

      <UrgencyCTA />
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
