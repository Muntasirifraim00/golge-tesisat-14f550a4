import { createFileRoute, Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { Phone, MapPin, Clock, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { DISTRICTS } from "@/data/districts";
import { SERVICES } from "@/data/services";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

const TITLE = "Acil Su Tesisatçısı İstanbul — 7/24 Servis";
const DESC =
  "Acil su tesisatçısı mı arıyorsunuz? İstanbul'da su kaçağı, patlayan boru, tıkanıklık ve kombi arızasına 7/24 ortalama 30 dakikada müdahale. Acil hat: 0533 896 05 03.";
const URL = "https://golgetesisat.com/acil-tesisatci";

const EMERGENCIES = [
  { t: "Patlayan veya donan boru", s: "Tavandan/duvardan su akışı, ani basınç kaybı" },
  { t: "Gizli su kaçağı", s: "Su faturasında artış, nemli duvar, küf kokusu" },
  { t: "Taşan tuvalet veya gider", s: "Ana giderde tıkanma, lavabo/küvet geri tepmesi" },
  { t: "Yanmayan kombi", s: "Isınmayan petekler, sıcak su kesintisi" },
  { t: "Doğalgaz kaçağı şüphesi", s: "Gaz kokusu — önce vanayı kapatın, sonra arayın" },
  { t: "Su sayacı / vana arızası", s: "Kapanmayan vana, sızdıran sayaç bağlantısı" },
];

const FAQ = [
  {
    q: "Gece veya hafta sonu acil tesisatçı buluyor musunuz?",
    a: "Evet, 7/24 kesintisiz hizmet veriyoruz. Gece, hafta sonu ve resmî tatil dahil her saat acil çağrılara çıkıyoruz.",
  },
  {
    q: "En yakın su tesisatçısı ne kadar sürede gelir?",
    a: "İstanbul genelinde ilçenize en yakın ekibi yönlendiriyoruz; acil çağrılara ortalama 30 dakikada adresinizdeyiz.",
  },
  {
    q: "Acil durumda hangi sorunlara müdahale ediyorsunuz?",
    a: "Patlayan veya donan boru, su kaçağı, taşan tuvalet, tıkalı ana gider, yanmayan kombi ve doğalgaz kaçağı şüphesi gibi tüm acil durumlara müdahale ediyoruz.",
  },
  {
    q: "Acil hizmette fiyat nasıl belirleniyor?",
    a: "Telefonda durumu dinleyip aralık veririz; yerinde ücretsiz keşif sonrası işe başlamadan net fiyatı onayınıza sunarız, sürpriz ücret çıkarmayız.",
  },
];

export const Route = createFileRoute("/acil-tesisatci")({
  head: () => ({
    meta: [
      { title: TITLE + " | Gölge Tesisat" },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "acil tesisatçı, acil su tesisatçısı, en yakın su tesisatçısı, acil kombi servisi, 7/24 tesisatçı istanbul",
      },
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
          "@type": "EmergencyService",
          name: "Gölge Tesisat — 7/24 Acil Tesisatçı",
          description: DESC,
          telephone: "+905338960503",
          url: URL,
          areaServed: DISTRICTS.map((d) => ({
            "@type": "City",
            name: `${d.name}, İstanbul`,
          })),
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
          availableLanguage: "Turkish",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://golgetesisat.com/" },
            { "@type": "ListItem", position: 2, name: "Acil Tesisatçı", item: URL },
          ],
        }),
      },
    ],
  }),
  component: AcilHub,
});

function AcilHub() {
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
        <a
          href={PHONE_HREF}
          className="flex items-center gap-1.5 rounded-lg bg-brand-red px-3 py-2 text-[12px] font-bold text-white"
        >
          <Phone className="h-3.5 w-3.5" /> Ara
        </a>
      </header>

      <nav className="px-4 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          <li>
            <Link to="/" className="hover:text-foreground">
              Ana Sayfa
            </Link>
          </li>
          <li>›</li>
          <li className="font-semibold text-foreground">Acil Tesisatçı</li>
        </ol>
      </nav>

      <main>
        {/* Hero with immediate call CTA */}
        <section className="px-4 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 px-3 py-1 text-[11px] font-bold text-brand-red">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-red" /> 7/24 ŞU AN AÇIK
          </span>
          <h1 className="mt-3 text-[26px] font-extrabold leading-tight">
            Acil Tesisatçı İstanbul — En Yakın Su Tesisatçısı
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{DESC}</p>
          <a
            href={PHONE_HREF}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3.5 text-[15px] font-extrabold tracking-wider text-white"
          >
            <Phone className="h-4 w-4" /> HEMEN ARA — {PHONE}
          </a>
        </section>

        {/* Trust strip */}
        <section className="px-4 pt-5">
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Clock, t: "Ort. 30 dk", s: "Hızlı varış" },
              { icon: Zap, t: "7/24", s: "Kesintisiz" },
              { icon: ShieldCheck, t: "Garantili", s: "İşçilik" },
            ].map(({ icon: Icon, t, s }) => (
              <div key={t} className="rounded-lg border border-border bg-surface p-3 text-center">
                <Icon className="mx-auto h-5 w-5 text-brand-red" />
                <div className="mt-1.5 text-[13px] font-extrabold">{t}</div>
                <div className="text-[10px] text-muted-foreground">{s}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Which situations are emergencies */}
        <section className="px-4 pt-7">
          <h2 className="text-[18px] font-extrabold">Hangi Durumlar Acil Sayılır?</h2>
          <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
            Su tesisatında bazı arızalar bekledikçe büyür; eve ve komşu dairelere zarar vermeden hızlı müdahale gerekir.
            Aşağıdaki durumlardan biriyle karşılaştıysanız vakit kaybetmeden İstanbul'daki acil su tesisatçısı ekibimizi arayın.
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            {EMERGENCIES.map((e) => (
              <div key={e.t} className="flex items-start gap-2.5 rounded-lg border border-border bg-surface p-3">
                <Zap className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                <div>
                  <div className="text-[13px] font-extrabold">{e.t}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{e.s}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before the plumber arrives */}
        <section className="px-4 pt-7">
          <h2 className="text-[18px] font-extrabold">Acil Tesisatçı Gelmeden Önce Ne Yapmalısınız?</h2>
          <ol className="mt-3 space-y-2.5">
            {[
              "Su kaçağı varsa daire ya da bina ana su vanasını kapatın; akışı durdurmak hasarı en aza indirir.",
              "Elektrik panosu veya prizlere su ulaşıyorsa ilgili sigortayı indirip elektrikli cihazları uzaklaştırın.",
              "Gaz kokusu alıyorsanız doğalgaz vanasını kapatın, ateş yakmayın, elektrik düğmelerine dokunmayın ve pencereleri açın.",
              "Tıkanan gidere kimyasal dökmeyin; boruya zarar verip işlemi zorlaştırabilir.",
              "Bizi arayıp sorunu kısaca tarif edin — ekibimiz doğru ekipmanla yola çıksın.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-[12px] font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-[12px] leading-relaxed text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </section>



        {/* Emergency services */}
        <section className="px-4 pt-7">
          <h2 className="text-[18px] font-extrabold">Acil Hizmetlerimiz</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/hizmet/$slug"
                params={{ slug: s.slug }}
                className="rounded-lg border border-border bg-surface p-3 hover:border-brand-red"
              >
                <div className="text-[13px] font-extrabold">{s.name}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{s.tagline}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Districts */}
        {sides.map((side) => (
          <section key={side} className="px-4 pt-7">
            <h2 className="text-[18px] font-extrabold">{side} — Acil Servis</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {DISTRICTS.filter((d) => d.side === side).map((d) => (
                <Link
                  key={d.slug}
                  to="/tesisatci/$slug"
                  params={{ slug: d.slug }}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-[12px] font-bold hover:border-brand-red"
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-brand-red" /> {d.name}
                  </span>
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
            {FAQ.map((f) => (
              <details key={f.q} className="rounded-lg border border-border bg-surface p-3">
                <summary className="cursor-pointer text-[13px] font-bold">{f.q}</summary>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-4 mt-8 rounded-2xl bg-foreground p-5 text-background">
          <div className="text-[20px] font-extrabold leading-tight">Acil durumunuz mu var?</div>
          <p className="mt-1 text-[12px] opacity-80">
            İstanbul genelinde 7/24 hizmet veriyoruz. Beklemeyin, hemen arayın.
          </p>
          <a
            href={PHONE_HREF}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </section>
      </main>
      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
