import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { GtFaq, GtPage, useReveal } from "@/components/gt/GtShell";
import { PriceTicket } from "@/components/gt/PriceTicket";
import { MarketBar, fmtChecked } from "@/components/gt/MarketBar";
import { MARKET_PRICES, tl } from "@/data/market-prices";
import {
  Phone, MessageCircle, Clock, ShieldCheck, Check, ArrowRight, Tag,
  Droplet, Waves, Flame, Thermometer, ScanLine, Wind, Wallet, BadgeCheck,
  ShowerHead, Droplets, Gauge, CalendarCheck,
} from "lucide-react";
import { SERVICES, findService, type ServiceIcon, type Service } from "@/data/services";
import { BLOG_POSTS } from "@/data/blog";
import { BUSINESS } from "@/data/business";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

const ICONS: Record<ServiceIcon, React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>> = {
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
    const title = `${s.name} Ücreti 2026 — İstanbul Fiyatları | Gölge Tesisat`;
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
        <p className="mt-2 text-sm text-muted-foreground">{error instanceof Error ? error.message : String(error)}</p>
      </div>
    </div>
  ),
  component: PricingPage,
});

function PricingPage() {
  const { service: s } = Route.useLoaderData() as { service: Service };
  const Icon = ICONS[s.icon];
  const lc = s.name.toLocaleLowerCase("tr");
  const faq = priceFaq(s);
  const otherServices = SERVICES.filter((x) => x.slug !== s.slug);
  const relatedPosts = BLOG_POSTS.filter((p) => p.serviceSlug === s.slug).slice(0, 6);
  const m = MARKET_PRICES[s.slug] || null;
  const wa = `${WA_HREF}?text=${encodeURIComponent(`Merhaba Gölge Tesisat, ${s.name} için fiyat almak istiyorum. (Fotoğraf gönderebilirim.)`)}`;
  useReveal();

  return (
    <GtPage current="/fiyatlar" top={{ left: "7/24 · İşten önce net fiyat", mid: "Ücretsiz keşif · Onayınız olmadan işlem yok · 2 yıl garanti" }}>
      <main>
        <section className="ph">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb"><ol>
              <li><Link to="/">Ana Sayfa</Link></li><li><Link to="/hizmetler">Hizmetler</Link></li>
              <li><Link to="/hizmet/$slug" params={{ slug: s.slug }}>{s.name}</Link></li><li aria-current="page">Fiyatlar</li>
            </ol></nav>
            <div className="ph-g">
              <div>
                <span className="eyebrow">Şeffaf fiyat · ücretsiz keşif</span>
                <h1>{s.name} fiyatları <em>İstanbul 2026</em></h1>
                <p className="lead">{s.name} için sabit bir tarife yoktur; ücret işin kapsamına göre belirlenir. İşe başlamadan önce <b>ücretsiz keşif</b> yapıp net fiyatı onayınıza sunuyoruz — sürpriz ücret çıkarmıyoruz.</p>
                <ul className="prom">
                  <li><i>✓</i><div>Ücretsiz keşif <span>— telefonda, WhatsApp'ta veya yerinde</span></div></li>
                  <li><i>✓</i><div>İşten önce net fiyat <span>— onayınız olmadan başlamayız</span></div></li>
                  <li><i>✓</i><div>2 yıl işçilik garantisi <span>— yaptığımız işe yazılı</span></div></li>
                </ul>
                <div className="cta">
                  <a className="btn btn-red" href={PHONE_HREF}><Phone className="ico gt-ring" />Fiyat al · {PHONE}</a>
                  <a className="btn btn-wa" href={wa} target="_blank" rel="noopener"><MessageCircle className="ico" />WhatsApp'tan sor</a>
                </div>
              </div>
              <PriceTicket title={`${s.shortName.toLocaleUpperCase("tr")} TEKLİFİ`} />
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <span className="eyebrow">Nasıl fiyatlandırıyoruz</span>
            <h2 className="h2">Dört adım. <em>Sürpriz yok.</em></h2>
            <p className="lead">Fiyat üçüncü adımda kesinleşir. Sonrasında onayınız olmadan hiçbir şey eklenmez.</p>
            <div className="steps">
              <div className="st rv"><h3>Sorunu anlatın</h3><p>Arayın, WhatsApp'tan fotoğraf veya video gönderin ya da online randevu alın.</p></div>
              <div className="st rv"><h3>Ücretsiz keşif</h3><p>Gizli sorunlarda (kaçak, tıkanıklık) usta önce nedeni tespit eder.</p></div>
              <div className="st lock rv"><h3>Net fiyat</h3><p>Tüm iş için tek fiyat onayınıza sunulur. Kabul etmezseniz ücret ödemezsiniz.</p></div>
              <div className="st rv"><h3>İş &amp; garanti</h3><p>Onaylanan iş, onaylanan fiyata yapılır; 2 yıl yazılı işçilik garantisi.</p></div>
            </div>
          </div>
        </section>

        <section className="sec gt-dark">
          <div className="wrap">
            <span className="eyebrow">Fiyatı ne belirler</span>
            <h2 className="h2">{s.name} fiyatını <em>etkileyen faktörler</em></h2>
            <p className="lead">{s.priceIntro}</p>
            <div className="fac">
              {s.priceFactors.map((f, i) => (
                <div className="fc rv" key={f}><b>0{i + 1}</b><h3>{f}</h3></div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec mist">
          <div className="wrap">
            <span className="eyebrow">Karşılaştırma için</span>
            <h2 className="h2">Piyasa <em>referansı</em></h2>
            <div className="inc">
              <div className="ib rv">
                <h3>{m ? "Yayınlanmış piyasa aralığı" : "Yayınlanmış aralık yok"}</h3>
                {m ? (
                  <>
                    <div className="mref"><b>{tl(m.min)} – {tl(m.max)}</b><span className="smp">{m.scope.toLocaleUpperCase("tr")}</span></div>
                    <MarketBar min={m.min} max={m.max} />
                    <p className="src">Armut.com'un "{m.label}" için yayınladığı ortalama fiyat aralığı ({fmtChecked()} tarihinde kontrol edildi). Farklı hizmet verenlerin tekliflerini gösterir — <b>Gölge Tesisat fiyatı değildir</b>, gerçek işler bu aralığın dışında kalabilir. <a href={m.src} target="_blank" rel="noopener nofollow">Kaynak ↗</a></p>
                  </>
                ) : (
                  <p className="src">{s.name} için karşılaştırılabilir, yayınlanmış bir piyasa aralığı bulamadık. Uydurma bir rakam yazmak yerine sorunu dinleyip size net fiyat veriyoruz.</p>
                )}
              </div>
              <div className="ib dk rv">
                <h3><Icon size={20} style={{ display: "inline", verticalAlign: "-3px", marginRight: 8 }} />Neden sabit fiyat vermiyoruz?</h3>
                <p style={{ color: "var(--soft)" }}>İnternette gördüğünüz sabit {lc} fiyatları çoğu zaman gerçeği yansıtmaz; sorun yerinde görülmeden verilen rakam ya çok yüksek olur ya da iş sırasında "ek ücret" olarak kabarır. Biz tam tersini yapıyoruz: önce ücretsiz keşifle sorunu net olarak tespit ediyor, ardından işe başlamadan kesin fiyatı yazılı olarak onayınıza sunuyoruz. Onaylamazsanız hiçbir ücret ödemezsiniz.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <span className="eyebrow">Ne ödersiniz</span>
            <h2 className="h2">Her teklifte <em>olanlar</em></h2>
            <div className="inc">
              <div className="ib rv"><h3>Her zaman dahil</h3><ul>
                <li><i>✓</i><div><b>Ücretsiz keşif ve teklif</b><span>Telefonda, WhatsApp'ta veya yerinde.</span></div></li>
                <li><i>✓</i><div><b>İşten önce net fiyat</b><span>Onayınız olmadan işlem başlatılmaz.</span></div></li>
                <li><i>✓</i><div><b>2 yıl işçilik garantisi</b><span>Yaptığımız işe yazılı garanti.</span></div></li>
                <li><i>✓</i><div><b>Ödeme iş bitince</b><span>Siz kontrol ettikten sonra nakit veya kartla.</span></div></li>
              </ul></div>
              <div className="ib dk rv"><h3>Sadece onayınızla</h3><ul>
                <li><i>!</i><div><b>İkinci bir sorun çıkarsa</b><span>Durur, gösterir, ayrıca fiyatlandırırız. Karar sizin.</span></div></li>
                <li><i>!</i><div><b>İşi değiştirmek isterseniz</b><span>Farklı ürün veya ek iş — önce yeniden fiyat veririz.</span></div></li>
                <li><i>!</i><div><b>Duvar veya fayans açılması gerekirse</b><span>Önceden söyler, onarımın dahil olup olmadığını belirtiriz.</span></div></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec mist" id="sss">
          <div className="wrap faq-g">
            <div>
              <span className="eyebrow">Sorular</span><h2 className="h2">{s.name} fiyatları — <em>SSS</em></h2>
              <div className="fside rv">
                <h3>Kesin rakam mı istiyorsunuz?</h3>
                <p>WhatsApp'tan fotoğraf veya kısa video gönderin. Net fiyat verelim ya da önce görmemiz gerekiyorsa dürüstçe söyleyelim.</p>
                <a className="btn btn-wa" href={wa} target="_blank" rel="noopener"><MessageCircle className="ico" />Fotoğraf gönder</a>
                <Link className="btn btn-red" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
              </div>
            </div>
            <GtFaq items={faq} />
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            {relatedPosts.length > 0 && (
              <>
                <span className="eyebrow">Rehberler</span>
                <h2 className="h2">{s.name} hakkında <em>faydalı rehberler</em></h2>
                <div className="plinks">
                  {relatedPosts.map((p) => (
                    <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }}><b>{p.title}</b><ArrowRight size={16} /></Link>
                  ))}
                </div>
              </>
            )}
            <div style={{ marginTop: relatedPosts.length ? 48 : 0 }}>
              <span className="eyebrow">Diğer hizmetler</span>
              <h2 className="h2">Diğer hizmet <em>fiyatları</em></h2>
              <div className="plinks">
                <Link to="/hizmet/$slug" params={{ slug: s.slug }} className="hl"><b>← {s.name} hizmet detayları</b></Link>
                {otherServices.map((o) => {
                  const OIcon = ICONS[o.icon];
                  return <Link key={o.slug} to="/hizmet/$slug/fiyat" params={{ slug: o.slug }}><OIcon size={18} /><b>{o.name} fiyatı</b><ArrowRight size={16} /></Link>;
                })}
                <Link to="/fiyatlar" className="hl"><b>Tüm fiyatlar &amp; piyasa karşılaştırması →</b></Link>
              </div>
            </div>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <h2>Tek fiyat. <em>Sizin onayınız. Sonra iş.</em></h2>
            <p>{s.name} için ücretsiz keşif ve işten önce net fiyat — 39 ilçede, günün 24 saati.</p>
            <div className="cta">
              <a className="btn btn-red" href={PHONE_HREF}><Phone className="ico gt-ring" />{PHONE}</a>
              <Link className="btn btn-ghost" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
            </div>
            <p className="tiny">● ÜCRETSİZ KEŞİF · İŞTEN ÖNCE NET FİYAT · 2 YIL GARANTİ</p>
          </div>
        </section>
      </main>
    </GtPage>
  );
}
