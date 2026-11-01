import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { Phone, MessageCircle, MapPin, Clock, ShieldCheck, Star, Check, ArrowRight, Droplet, Waves, Flame, Thermometer, Wind, ScanLine, ShowerHead, Droplets, Gauge } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { DISTRICTS, findDistrict, slugifyTr } from "@/data/districts";
import { DISTRICT_IMAGES } from "@/data/district-images";
import { SERVICES, type ServiceIcon } from "@/data/services";
import { buildReviews, reviewsToSchema } from "@/data/reviews";
import { ReviewsTrust } from "@/components/ReviewsTrust";
import { CustomerReviews } from "@/components/CustomerReviews";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

// Single source for district FAQ: visible section and FAQPage JSON-LD must match.
function buildDistrictFaq(d: {
  name: string;
  side: string;
  responseMin: number;
  neighborhoods: string[];
  faq?: { q: string; a: string }[];
}) {
  const n = d.neighborhoods ?? [];
  const sample = n.slice(0, 3).join(", ");
  const base = [
    { q: `${d.name}'de acil tesisatçı ne kadar sürede gelir?`, a: `${d.name} ve çevresinde acil çağrılara ortalama ${d.responseMin} dakika içinde müdahale ediyoruz. 7/24 hizmet veriyoruz.` },
    { q: `${d.name}'de hangi mahallelere hizmet veriyorsunuz?`, a: `${d.name} genelinde ${n.join(", ")} dahil tüm mahallelere tesisat hizmeti sunuyoruz.` },
    { q: `${d.name} tesisatçı fiyatları nasıl belirleniyor?`, a: `İşleme başlamadan önce şeffaf fiyat veriyoruz; sürpriz ücret yok. Tüm işçiliğimiz garantilidir. Bilgi için ${PHONE} numarasını arayabilirsiniz.` },
    { q: `${d.name}'de kırmadan su kaçağı tespiti yapıyor musunuz?`, a: `Evet. ${sample ? sample + " dahil " : ""}${d.name} genelinde termal kamera, akustik dinleme ve gaz ile kırmadan su kaçağı tespiti yapıyoruz; sadece kaçağın olduğu noktada müdahale ediyoruz.` },
    { q: `${d.name}'de gece veya hafta sonu tıkanıklık açma hizmeti var mı?`, a: `Evet, ${d.name} ve ${d.side} genelinde gece, hafta sonu ve bayramlarda dahil 7/24 lavabo, tuvalet, mutfak ve kanalizasyon tıkanıklığı açıyoruz. Kamera ile kontrol de yapılabilir.` },
    { q: `${d.name}'de keşif ücretli mi?`, a: `Hayır. ${d.name} adreslerinde keşif ücretsizdir; arızayı görüp fiyatı söyledikten sonra onayınızla işe başlarız.` },
  ];
  const seen = new Set(base.map((f) => f.q));
  return [...base, ...(d.faq ?? []).filter((f) => f?.q && f?.a && !seen.has(f.q))];
}
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
    const title = `${d.name} Tesisatçı — ${d.responseMin} Dk'da Kapınızda, 7/24 ★${RATING_VALUE}`;
    const desc = `★${RATING_VALUE} (${REVIEW_COUNT.toLocaleString("tr-TR")} yorum) ${d.name} tesisatçı: su kaçağı tespiti, tıkanıklık açma, kombi ve petek temizliği. Ortalama ${d.responseMin} dakikada kapınızda, ücretsiz keşif, garantili işçilik. Ara: ${PHONE}.`;
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
        { property: "og:image:alt", content: `${d.name} tesisatçı — Gölge Tesisat` },
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
            image: { "@type": "ImageObject", url: "https://golgetesisat.com/og-image.jpg", width: 1200, height: 630, caption: `${d.name} tesisatçı — Gölge Tesisat 7/24 acil tesisat servisi`, contentLocation: { "@type": "Place", name: `${d.name}, İstanbul` } },
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
            inLanguage: "tr-TR",
            mainEntity: buildDistrictFaq(d).map((f) => ({
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
        <p className="mt-2 text-sm text-muted-foreground">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    </div>
  ),
  component: DistrictPage,
});

function DistrictPage() {
  const { district: d } = Route.useLoaderData();
  const images = DISTRICT_IMAGES[d.slug];
  const reviews = buildReviews(`bolge:${d.slug}`, d.name, "acil tesisat", d.responseMin);
  const otherDistricts = DISTRICTS.filter((x) => x.slug !== d.slug).slice(0, 6);

  return (
    <div className="sp service-page district-page min-h-screen bg-background pb-24">
      {/* Top strip */}
      <div className="sp-btn-ink sp-mono flex items-center justify-center gap-2 px-4 py-2 text-[10px]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
        {d.name} · 7/24 açık · ort. {d.responseMin} dk varış
      </div>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between border-b border-border px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Gölge Tesisat" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
          <div className="leading-tight">
            <div className="sp-display text-[20px]">GÖLGE TESİSAT</div>
            <div className="sp-mono text-[9px] text-muted-foreground">{d.side}</div>
          </div>
        </Link>
        <a href={PHONE_HREF} className="sp-btn-red flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-bold">
          <Phone className="h-3.5 w-3.5" /> Ara
        </a>
      </header>

      {/* Breadcrumb */}
      <nav className="sp-mono mx-auto max-w-6xl px-4 pt-3 text-[10px] text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-foreground">Ana Sayfa</Link></li>
          <li>/</li>
          <li><Link to="/tesisatci" className="hover:text-foreground">Tesisatçı</Link></li>
          <li>/</li>
          <li className="font-semibold text-foreground">{d.name}</li>
        </ol>
      </nav>

      <main>
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="sp-hero relative mx-auto max-w-6xl overflow-hidden rounded-[1.6rem] p-5 md:grid md:grid-cols-2 md:gap-8 md:p-10">
          <div className="relative">
            <div className="sp-mono inline-flex items-center gap-1.5 rounded-full border border-current/20 px-3 py-1 text-[10px] opacity-90">
              <MapPin className="h-3 w-3" /> {d.name} · İstanbul
            </div>
            <h1 className="sp-display mt-4 text-[46px] md:text-[72px]">
              {d.name} Tesisatçı
              <span className="mt-1 block text-[var(--sp-red)]">7/24 kapınızda</span>
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed opacity-85">{d.intro}</p>
            <div className="mt-5 grid grid-cols-2 gap-2 md:max-w-md">
              <a href={PHONE_HREF} className="sp-btn-red flex items-center justify-center gap-1.5 rounded-full py-3 text-[13px] font-extrabold">
                <Phone className="h-4 w-4" /> HEMEN ARA
              </a>
              <a href={WA_HREF} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-full border border-current/30 py-3 text-[13px] font-extrabold">
                <MessageCircle className="h-4 w-4" /> WHATSAPP
              </a>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 md:max-w-md">
              {[
                [`${d.responseMin} dk`, "Ort. varış"],
                ["7/24", "Hizmet"],
                ["2 Yıl", "Garanti"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-current/15 px-2 py-2 text-center">
                  <div className="sp-display text-[24px]">{v}</div>
                  <div className="sp-mono text-[8px] opacity-75">{l}</div>
                </div>
              ))}
            </div>
          </div>
          {images && (
            <div className="relative mt-6 self-center md:mt-0">
              <img src={images.hero} alt={images.heroAlt} width={1280} height={720} loading="eager" fetchPriority="high" decoding="async" sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover" />
              <div className="sp-mono absolute bottom-3 left-3 rounded-full bg-background px-3 py-1.5 text-[10px] text-foreground">
                ● Ekip {d.name} bölgesinde
              </div>
            </div>
          )}
        </div>
        <div className="sp-pipe mx-auto mt-4 max-w-6xl" aria-hidden="true" />
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
            {d.commonIssues.map((c: { title: string; detail: string }, ci: number) => (
              <div key={c.title} className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                    <div className="text-[13px] font-extrabold">{c.title}</div>
                  </div>
                  <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{c.detail}</p>
                </div>
                {images?.issues[ci] && (
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-brand-red/60 bg-gradient-to-br from-red-950/40 to-amber-950/20 p-1.5">
                    <img src={images.issues[ci]} alt={`${d.name} — ${c.title}`} width={512} height={512} loading="lazy" className="h-full w-full object-contain" />
                  </div>
                )}
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

      {/* District FAQ — same list as FAQPage schema */}
      {(
        <section className="px-4 pt-8">
          <h2 className="text-[18px] font-extrabold">{d.name} Tesisatçı — Sık Sorulan Sorular</h2>
          <div className="mt-3 space-y-2">
            {buildDistrictFaq(d).map((f) => (
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
