import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, lazy, Suspense } from "react";
import logoImg from "@/assets/logo.jpg";

const IstanbulServiceMap = lazy(() => import("@/components/IstanbulServiceMap"));
import { ServiceAreasSection, ProcessPackagesSection, CertsAndStatsSection, FaqReviewsContactSection } from "@/components/MockupSections";
import { InstantQuote } from "@/components/InstantQuote";
import { DesktopTopBar, DesktopHero } from "@/components/DesktopHero";
import { DesktopInstantQuote, DesktopServices, DesktopFleet, DesktopServiceAreas, DesktopServiceProcess, DesktopFromField, DesktopTechnicians, DesktopCertsStats, DesktopFaqReviewsContact, DesktopValuePackages, DesktopEfficiencyTips, DesktopBookingBanner } from "@/components/DesktopSections";
import { CallbackForm } from "@/components/CallbackForm";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

import { MeetTechnicians } from "@/components/MeetTechnicians";
import { FromTheField } from "@/components/FromTheField";
import { LiveService } from "@/components/LiveService";
import { Reveal } from "@/components/Reveal";
import { SiteFooter } from "@/components/SiteFooter";
import { BLOG_POSTS } from "@/data/blog";

// Curated, high-intent guides surfaced on the homepage with persuasive,
// trust-building teasers (TR) that turn casual readers into callers.
const FEATURED_BLOG: { slug: string; teaser: string }[] = [
  {
    slug: "su-kacagi-nasil-anlasilir",
    teaser:
      "Faturanız mı şişti, duvarda nem mi başladı? Kırıp dökmeden, dakikalar içinde su kaçağını nasıl bulduğumuzu adım adım gösteriyoruz.",
  },
  {
    slug: "kombi-neden-calismiyor",
    teaser:
      "Kombi soğuk mu kaldı? Servis çağırmadan önce 5 dakikada deneyebileceğiniz, çoğu zaman sorunu çözen kontrolleri sıraladık.",
  },
  {
    slug: "tuvalet-tikanikligi-nasil-acilir",
    teaser:
      "Pompayı çoğu kişinin yanlış kullandığı tek detay burada. Tuvaleti taşırmadan, güvenle açmanın pratik yolunu anlattık.",
  },
  {
    slug: "petek-temizligi-nasil-yapilir",
    teaser:
      "Petekler ısınmıyor, fatura artıyor mu? Evde yapabileceğiniz hava alma ile uzman temizliğin farkını net açıkladık.",
  },
  {
    slug: "kombi-ariza-kodlari-rehberi",
    teaser:
      "Ekranda bir hata kodu mu çıktı? En sık görülen kombi arıza kodlarının anlamını ve ne yapmanız gerektiğini tek tek yazdık.",
  },
  {
    slug: "musluk-damlatma-nasil-onlenir",
    teaser:
      "Tık tık damlayan musluk hem sinir bozucu hem para kaybı. Çoğu zaman tek bir parça değişimiyle nasıl bittiğini gösteriyoruz.",
  },
];
import {
  Phone,
  MessageCircle,
  Menu,
  Zap,
  Clock,
  ShieldCheck,
  Tag,
  Droplet,
  Wrench,
  Flame,
  Thermometer,
  Users,
  Star,
  Award,
  Headphones,
  MapPin,
  Wallet,
  FileText,
  ArrowRight,
  Camera,
  PencilRuler,
  CreditCard,
  ClipboardCheck,
  ThumbsUp,
  ChevronRight,
  Check,
  Calendar,
  Handshake,
  Settings,
  ClipboardList,
  User,
  Lightbulb,
  AlertTriangle,
  Gauge,
  MessageSquare,
  Activity,
  Truck,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import vanImg from "@/assets/golge-tesisat-van.jpg";
import { ProblemShowcase } from "@/components/ProblemShowcase";
import svcLeak from "@/assets/svc-leak.jpg";
import svcClog from "@/assets/svc-clog.jpg";
import svcCombi from "@/assets/svc-combi.jpg";
import svcRadiator from "@/assets/svc-radiator.jpg";
import svcPipe from "@/assets/svc-pipe.jpg";
import svcCamera from "@/assets/svc-camera.jpg";
import technician from "@/assets/technician.jpg";
import workLeak from "@/assets/problem-leak.jpg";
import workDrain from "@/assets/live-jobsite-prep.jpg";
import workBoiler from "@/assets/work-boiler-briefing.jpg";
import workRadiator from "@/assets/work-clean-home.jpg";
import workCommercial from "@/assets/work-boiler-commercial.jpg";
import workBathLeak from "@/assets/work-bath-leak.jpg";
import { useLang } from "@/i18n/LanguageProvider";

const SITE_URL = "https://golgetesisat.com";
// NOTE: the sitewide Plumber/LocalBusiness JSON-LD is emitted once in __root.tsx
// (review-backed) and renders on every page, so the homepage does not repeat it
// here — a single LocalBusiness entity per page avoids duplicate-node confusion.



const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "İstanbul'da 7/24 acil tesisatçı hizmeti veriyor musunuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet, İstanbul Anadolu ve Avrupa yakasında 7/24 acil tesisatçı hizmeti sunuyoruz. Ortalama 30 dakika içinde adresinizdeyiz.",
      },
    },
    {
      "@type": "Question",
      name: "Su kaçağı tespiti ne kadar sürer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Termal kamera ve akustik cihazlarla noktasal su kaçağı tespiti ortalama 30-60 dakika sürer; kırma-dökme yapılmadan tespit edilir.",
      },
    },
    {
      "@type": "Question",
      name: "Fiyat teklifi ücretsiz mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet, keşif ve fiyat teklifi tamamen ücretsizdir. Onayınız olmadan işlem başlatılmaz.",
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "İstanbul Tesisatçı | 7/24 Acil Servis - Gölge Tesisat" },
      { name: "description", content: "İstanbul'un her ilçesinde 7/24 acil tesisatçı: su kaçağı tespiti, tıkanıklık açma, kombi-petek servisi. Ortalama 30 dk'da kapınızda. Ücretsiz keşif." },
      { name: "keywords", content: "istanbul tesisatçı, acil tesisatçı, su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği, 7/24 tesisatçı" },
      { property: "og:title", content: "İstanbul Tesisatçı | 7/24 Acil Servis - Gölge Tesisat" },
      { property: "og:description", content: "Su kaçağı, tıkanıklık, kombi ve petek için 7/24 acil tesisatçı. Ortalama 30 dk'da kapınızda." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "İstanbul Tesisatçı 7/24 - Gölge Tesisat" },
      { name: "twitter:description", content: "Su kaçağı, tıkanıklık, kombi servisi. 30 dk'da kapınızda." },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "TR-34" },
      { name: "geo.placename", content: "İstanbul" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preload", as: "image", href: heroBg, fetchPriority: "high" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: Index,
});

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:05338960503";

function Logo() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-md ring-1 ring-border">
      <img src={logoImg} alt="GT Tesisat logo" width={36} height={36} className="h-9 w-9 object-contain" />
    </div>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center rounded-lg border border-border bg-surface p-0.5 text-[11px] font-extrabold">
      <button
        onClick={() => setLang("tr")}
        className={`rounded-md px-2 py-1 transition-colors ${lang === "tr" ? "bg-brand-red text-white" : "text-muted-foreground"}`}
        aria-pressed={lang === "tr"}
      >
        TR
      </button>
      <button
        onClick={() => setLang("en")}
        className={`rounded-md px-2 py-1 transition-colors ${lang === "en" ? "bg-brand-red text-white" : "text-muted-foreground"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

function TopBar() {
  const { t, lang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = lang === "en"
    ? [
        { label: "Services", href: "#services" },
        { label: "Why Us", href: "#why-us" },
        { label: "Our Work", href: "#from-the-field" },
        { label: "Reviews", href: "#reviews" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Hizmetler", href: "#services" },
        { label: "Neden Biz", href: "#why-us" },
        { label: "İşlerimiz", href: "#from-the-field" },
        { label: "Yorumlar", href: "#reviews" },
        { label: "SSS", href: "#faq" },
        { label: "İletişim", href: "#contact" },
      ];
  return (
    <header className="relative z-20 bg-background md:hidden">
      <div className="flex items-center justify-between gap-2 px-3 pt-5 pb-3 md:mx-auto md:max-w-[1320px] md:px-8 md:py-4">
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          <Logo />
          <div className="min-w-0 leading-tight">
            <div className="truncate text-[15px] font-extrabold tracking-wide text-foreground md:text-[20px]">{t.brand.name}</div>
            <div className="truncate text-[10px] text-muted-foreground md:text-[12px]">{t.brand.tagline}</div>
          </div>
        </div>

        {/* Desktop nav (lg+) */}
        <nav className="hidden md:flex items-center gap-7">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-[13px] font-bold text-foreground/80 transition-colors hover:text-brand-red">
              {n.label}
            </a>
          ))}
          <Link to="/blog" className="text-[13px] font-bold text-foreground/80 transition-colors hover:text-brand-red">
            Blog
          </Link>
          <Link to="/google-ads" className="text-[13px] font-bold text-foreground/80 transition-colors hover:text-brand-red">
            Google Ads
          </Link>
          <Link to="/admin" className="rounded-lg border border-border px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-foreground/80 transition-colors hover:border-brand-red/50 hover:text-brand-red">
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Inline TR/EN toggle on mobile (desktop uses global floating toggle) */}
          <div className="md:hidden">
            <LangToggle />
          </div>
          <a href={PHONE_HREF} className="flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-1.5 shadow md:px-4 md:py-2.5 md:shadow-md md:gap-2">
            <Phone className="h-4 w-4 fill-brand-red text-brand-red md:h-5 md:w-5" />
            <div className="text-left leading-tight">
              <div className="whitespace-nowrap text-[10px] font-bold text-brand-red md:text-[10px] md:uppercase md:tracking-wider">{t.topbar.emergency}</div>
              <div className="hidden md:block text-[14px] font-extrabold text-brand-red">{PHONE}</div>
            </div>
          </a>
          <Link
            to="/randevu"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-[13px] font-extrabold text-white shadow-md hover:brightness-110 transition"
          >
            <Calendar className="h-4 w-4" />
            {lang === "en" ? "Book Now" : "Randevu Al"}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface md:hidden"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
          <nav className="absolute right-4 top-[72px] z-50 w-56 rounded-2xl border border-border bg-surface p-2 shadow-2xl md:hidden">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-[13px] font-semibold text-foreground hover:bg-surface-2"
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className="mt-1 block rounded-lg px-3 py-2.5 text-[13px] font-semibold text-foreground hover:bg-surface-2"
            >
              Blog
            </Link>
            <Link
              to="/google-ads"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-[13px] font-semibold text-foreground hover:bg-surface-2"
            >
              Google Ads
            </Link>
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-[13px] font-semibold text-foreground hover:bg-surface-2"
            >
              Admin
            </Link>
            <Link
              to="/randevu"
              onClick={() => setMenuOpen(false)}
              className="mt-1 block rounded-lg bg-brand-red px-3 py-2.5 text-center text-[13px] font-extrabold text-white"
            >
              {lang === "en" ? "Book Now" : "Randevu Al"}
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}


function Hero() {
  const { t, lang } = useLang();
  const quickIcons = [
    <Droplet className="h-5 w-5 text-brand-red" />,
    <PencilRuler className="h-5 w-5 text-brand-red" />,
    <Flame className="h-5 w-5 text-brand-red" />,
    <Thermometer className="h-5 w-5 text-brand-red" />,
    <Wrench className="h-5 w-5 text-brand-red" />,
  ];
  return (
    <section className="relative overflow-hidden bg-[#06080d] text-white md:hidden">
      {/* Background photograph kept, heavily layered */}
      <div
        className="absolute inset-0 bg-no-repeat opacity-[0.55]"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center 30%" }}
      />
      {/* Diagonal cut overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06080d] via-[#06080d]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-[#06080d]/70" />
      {/* Engineering grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px]" />
      {/* Brand glow */}
      <div className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-brand-red/30 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-32 -left-20 h-64 w-64 rounded-full bg-emerald-500/15 blur-[100px]" />

      <div className="relative px-4 pt-5 pb-8">
        {/* Status command bar */}
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
              {lang === "en" ? "24/7 · UNIT ON-CALL" : "7/24 · EKİP HAZIR"}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
            IST · 24/7
          </span>
        </div>

        {/* Serial + meta */}
        <div className="mt-5 flex items-end justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-slate-500">— 001 / DISPATCH</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold">EST. 2014</span>
        </div>

        {/* Display headline with vertical brand rail */}
        <div className="mt-3 flex gap-3">
          <div className="relative flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-brand-red shadow-[0_0_18px_rgba(226,59,59,0.7)]" />
            <div className="mt-1 w-px flex-1 bg-gradient-to-b from-brand-red via-brand-red/40 to-transparent" />
          </div>
          <h1 className="text-[42px] font-black leading-[0.95] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            <span className="block animate-fade-up" style={{ animationDelay: "80ms" }}>{t.hero.title1}</span>
            <span className="block animate-fade-up text-slate-300" style={{ animationDelay: "160ms" }}>{t.hero.title2}</span>
            <span
              className="block animate-fade-up bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent"
              style={{ animationDelay: "240ms" }}
            >
              {t.hero.title3}
            </span>
          </h1>
        </div>

        {/* Description with quote rail */}
        <p className="mt-5 border-l-2 border-brand-red/50 pl-3 text-[14px] leading-relaxed text-slate-300">
          {t.hero.descPre}{" "}
          <span className="font-bold text-brand-gold">{t.hero.descBold}</span>
          {t.hero.descPost}
        </p>

        {/* Slider — kept */}
        <div className="mt-6">
          <ProblemShowcase />
        </div>

        {/* Metric strip — terminal style */}
        <Reveal className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 px-3 py-1.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">// KEY STATS</span>
            <span className="font-mono text-[9px] text-emerald-400">●</span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/5">
            <div className="px-2 py-3 text-center">
              <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{t.hero.trust[0].s}</div>
              <div className="mt-1 text-[22px] font-black tracking-tight">{t.hero.trust[0].t}</div>
            </div>
            <div className="px-2 py-3 text-center">
              <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">{t.hero.trust[1].s}</div>
              <div className="mt-1 text-[22px] font-black tracking-tight">{t.hero.trust[1].t}</div>
            </div>
            <div className="px-2 py-3 text-center">
              <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Google</div>
              <div className="mt-1 flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
                <div className="text-[22px] font-black tracking-tight text-brand-gold">4.9</div>
              </div>
            </div>
          </div>
          {/* animated rail */}
          <div className="h-[2px] w-full overflow-hidden bg-white/5">
            <div className="h-full w-24 bg-gradient-to-r from-transparent via-brand-red to-transparent animate-[flow-move_3s_linear_infinite]" />
          </div>
        </Reveal>

        {/* Primary CTA — large + secondary row */}
        <Reveal delay={100} className="mt-5">
          <a
            href={PHONE_HREF}
            className="group relative block overflow-hidden rounded-2xl border border-brand-red/40 bg-gradient-to-br from-brand-red to-[#a01818] p-4 shadow-[0_20px_50px_-20px_rgba(226,59,59,0.7)] active:scale-[0.98] transition"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-center gap-3">
              <span className="pulse-ring text-white flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30">
                <Phone className="h-6 w-6 text-white" />
              </span>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {lang === "en" ? "DIRECT LINE · 30 MIN ETA" : "DOĞRUDAN HAT · 30 DK VARIŞ"}
                </div>
                <div className="text-[20px] font-black leading-tight tracking-tight text-white">{PHONE}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-white/80 transition-transform group-active:translate-x-1" />
            </div>
          </a>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href="https://wa.me/905338960503"
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-3 text-[12px] font-extrabold uppercase tracking-wider text-emerald-300 backdrop-blur-xl active:scale-[0.97] transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <Link
              to="/randevu"
              className="flex items-center justify-center gap-2 rounded-xl border border-brand-gold/40 bg-brand-gold/10 px-3 py-3 text-[12px] font-extrabold uppercase tracking-wider text-brand-gold backdrop-blur-xl active:scale-[0.97] transition"
            >
              <Calendar className="h-4 w-4" />
              {lang === "en" ? "Book" : "Randevu"}
            </Link>
          </div>
        </Reveal>

        {/* Service index strip */}
        <Reveal delay={180} className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">// INDEX</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">5 UNITS</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {t.hero.quickServices.map((s, i) => (
              <div key={i} className="group flex flex-col items-center text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-black/40 transition group-hover:border-brand-red/40 group-hover:bg-brand-red/10">
                  {quickIcons[i]}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold leading-tight text-slate-300">{s.l1}</div>
                <div className="text-[10px] font-semibold leading-tight text-slate-300">{s.l2}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
    </section>
  );
}

const SERVICE_IMAGES = [svcLeak, svcClog, svcCombi, svcRadiator, svcPipe, svcCamera];
const SERVICE_ICONS = [
  <Droplet className="h-6 w-6 text-white" />,
  <PencilRuler className="h-6 w-6 text-white" />,
  <Gauge className="h-6 w-6 text-white" />,
  <Thermometer className="h-6 w-6 text-white" />,
  <Wrench className="h-6 w-6 text-white" />,
  <Camera className="h-6 w-6 text-white" />,
];

function Services() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const responseTimes = ["~28dk", "~35dk", "~40dk", "~45dk", "~32dk", "~30dk"];
  return (
    <section id="services" className="relative overflow-hidden bg-[#0B0E14] px-4 py-12 text-white">
      {/* ambient */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-red/15 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative">
        {/* meta header */}
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-brand-red">
          <div className="flex items-center gap-2 font-mono">
            <span className="h-px w-6 bg-brand-red" /> // DOSSIER · 02
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-emerald-300">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {en ? "CERTIFIED" : "BELGELİ"}
          </div>
        </div>

        <h2 className="mt-3 text-[28px] font-black leading-[1] tracking-tight text-white">
          {t.services.title1}
          <br />
          <span className="bg-gradient-to-r from-brand-red via-orange-400 to-brand-red bg-clip-text text-transparent">
            {t.services.title2}
          </span>
        </h2>
        <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-slate-400">{t.services.desc}</p>

        {/* progress rail */}
        <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
          <div className="h-full w-1/3 bg-gradient-to-r from-brand-red via-orange-400 to-transparent animate-[flow-move_3s_linear_infinite]" />
        </div>

        {/* SERVICE INDEX — numbered rows */}
        <ol className="mt-5 divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          {t.services.items.map((it, i) => {
            const Icon = [Droplet, PencilRuler, Gauge, Thermometer, Wrench, Camera][i];
            return (
              <li key={i}>
                <a
                  href={PHONE_HREF}
                  className="group relative flex items-stretch gap-3 px-3 py-3 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="absolute left-0 top-0 h-full w-[3px] bg-brand-red opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex flex-col items-center justify-center px-1 font-mono">
                    <span className="text-[9px] font-bold tracking-widest text-slate-500">SVC</span>
                    <span className="text-[16px] font-black leading-none text-white">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 ring-1 ring-brand-red/30">
                    <Icon className="h-5 w-5 text-brand-red" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate text-[13.5px] font-extrabold text-white">{it.t}</div>
                      <span className="shrink-0 rounded-md bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                        {responseTimes[i]}
                      </span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-400">{it.d}</p>
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-red">
                      {en ? "Open file" : "Dosyayı aç"} <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ol>

        {/* dual CTA dossier footer */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand-red px-3 py-3 text-[12px] font-black uppercase tracking-wider text-white shadow-[0_12px_30px_-12px_rgba(226,59,59,0.7)]"
          >
            <Phone className="h-4 w-4" /> {en ? "Dispatch" : "Yolla"}
          </a>
          <a
            href="https://wa.me/905338960503"
            target="_blank"
            rel="noopener"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-[12px] font-black uppercase tracking-wider text-white"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp
          </a>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-[10px] tracking-widest text-slate-500">
          <span>SSL · KVKK · 2 {en ? "yr warranty" : "yıl garanti"}</span>
          <span className="text-emerald-300">ONLINE</span>
        </div>
      </div>
    </section>
  );
}


// On-the-job project photos (AI-generated) paired with each review — shows the
// actual work performed instead of stock portraits.
const WORK_SCENES = [
  { src: workLeak, tr: "Patlak boru onarımı", en: "Burst pipe repair" },
  { src: workDrain, tr: "Kamerayla tıkanıklık tespiti", en: "Camera drain inspection" },
  { src: workBoiler, tr: "Kombi arıza & montaj", en: "Boiler service & install" },
  { src: workRadiator, tr: "Petek temizliği", en: "Radiator flushing" },
  { src: workCommercial, tr: "Kurumsal su kaçağı tespiti", en: "Commercial leak detection" },
  { src: workBathLeak, tr: "Kırmadan kaçak tespiti", en: "No-demolition leak detection" },
];

function ReviewsLarge() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState(0);
  const reviews = t.reviews;
  const total = reviews.length;
  const scene = WORK_SCENES[active % WORK_SCENES.length];
  const sceneLabel = (s: typeof scene) => (en ? s.en : s.tr);
  const featured = reviews[active];
  const barIcons = [
    <Headphones className="h-5 w-5 text-brand-red" />,
    <MapPin className="h-5 w-5 text-brand-red" />,
    <Wallet className="h-5 w-5 text-brand-red" />,
    <FileText className="h-5 w-5 text-brand-red" />,
  ];

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#0B0E14] px-4 py-12 text-slate-50 sm:px-6 md:py-20">
      {/* Ambient glow + fine grid for a more premium, technical backdrop */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[380px] w-[380px] rounded-full bg-brand-red/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-brand-gold/10 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="mb-6 flex flex-col items-start gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-brand-red">
              <span className="h-px w-6 bg-brand-red" />
              {t.reviewsLarge.eyebrow}
            </div>
            <h2 className="mt-3 text-[26px] font-black leading-[1.05] tracking-tight text-white sm:text-[34px] md:text-[44px]">
              {t.reviewsLarge.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-orange-400">
                {t.reviewsLarge.title.split(" ").slice(-1)}
              </span>
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-400 sm:text-[14.5px]">{t.reviewsLarge.desc}</p>
          </div>

          {/* Google rating chip — no portraits, pure rating proof */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[15px] font-black">
              <span className="text-[#4285F4]">G</span>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                ))}
                <span className="ml-1 text-[13px] font-black text-white">4.9</span>
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-widest text-slate-400">
                {en ? "1,240+ Google reviews" : "1.240+ Google yorumu"}
              </div>
            </div>
          </div>
        </div>

        {/* Featured testimonial — project work photo + the customer's own words */}
        <div className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] md:grid-cols-[1.05fr_1fr]">
          {/* On-the-job project photo (AI) */}
          <div className="relative h-56 w-full overflow-hidden sm:h-72 md:h-full md:min-h-[380px]">
            <img
              key={scene.src}
              src={scene.src}
              alt={sceneLabel(scene)}
              width={720}
              height={560}
              loading="lazy"
              className="h-full w-full animate-fade-in-soft object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0B0E14]/80" />
            {/* Service label badge */}
            <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(226,59,59,0.9)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">{sceneLabel(scene)}</span>
            </div>
            {/* Verified chip */}
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-md bg-emerald-500/90 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-white">
              <Check className="h-3 w-3" /> {en ? "Real job · Verified" : "Gerçek iş · Doğrulandı"}
            </div>
          </div>

          {/* Quote */}
          <div className="flex flex-col justify-between p-5 sm:p-7 md:p-9">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-400">5.0 · {featured.time}</span>
              </div>
              <svg className="mb-2 h-7 w-7 text-brand-red/60" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <p className="text-[15px] leading-relaxed text-slate-100 sm:text-[17px] md:text-[19px]">
                {featured.text}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <div className="text-[14px] font-black text-white">{featured.name}</div>
                <div className="text-[11px] text-slate-400">{featured.area} · {en ? "Verified homeowner" : "Doğrulanmış müşteri"}</div>
              </div>
              {/* Step counter + arrows for a more advanced, controllable feel */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={en ? "Previous review" : "Önceki yorum"}
                  onClick={() => setActive((active - 1 + total) % total)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-brand-red/60 hover:bg-brand-red/10"
                >
                  ‹
                </button>
                <span className="min-w-[42px] text-center text-[11px] font-bold tabular-nums text-slate-400">
                  {active + 1} / {total}
                </span>
                <button
                  type="button"
                  aria-label={en ? "Next review" : "Sonraki yorum"}
                  onClick={() => setActive((active + 1) % total)}
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-brand-red/60 hover:bg-brand-red/10"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selector — project work thumbnails (mobile scroll, desktop grid) */}
        <div className="mt-4 -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 sm:overflow-visible md:mt-6">
          <div className="flex min-w-max gap-2.5 sm:min-w-0 sm:grid sm:grid-cols-3 sm:gap-3 md:grid-cols-6">
            {reviews.map((r, i) => {
              const s = WORK_SCENES[i % WORK_SCENES.length];
              const isActive = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`${r.name} - ${sceneLabel(s)}`}
                  className={`group relative aspect-[4/3] w-[150px] shrink-0 overflow-hidden rounded-xl border text-left transition-all sm:w-auto ${
                    isActive
                      ? "border-brand-red/70 shadow-[0_8px_24px_-12px_rgba(226,59,59,0.6)]"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <img
                    src={s.src}
                    alt={sceneLabel(s)}
                    width={200}
                    height={150}
                    loading="lazy"
                    className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${isActive ? "" : "opacity-70 grayscale-[35%] group-hover:opacity-100 group-hover:grayscale-0"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/20 to-transparent" />
                  <div className="absolute inset-x-2 bottom-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="h-2.5 w-2.5 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] font-black text-white">{sceneLabel(s)}</div>
                    <div className="truncate text-[9.5px] text-slate-300">{r.name} · {r.area}</div>
                  </div>
                  {isActive && <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-brand-red shadow-[0_0_8px_rgba(226,59,59,0.9)]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trust bar */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm md:mt-10 md:p-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {t.reviewsLarge.bar.map((b, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-red/10 border border-brand-red/20">
                  {barIcons[i]}
                </div>
                <div className="leading-tight">
                  <div className="text-[12.5px] font-black text-white sm:text-[13.5px]">{b.t}</div>
                  <div className="mt-0.5 text-[10.5px] text-slate-400 sm:text-[11.5px]">{b.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function BookingBanner() {
  const { lang } = useLang();
  const en = lang === "en";

  // Build the next 7 days for the mini date strip.
  // Anchored to Europe/Istanbul so SSR and client render identically.
  const dayShortEN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayShortTR = ["PAZ", "PZT", "SAL", "ÇAR", "PER", "CUM", "CMT"];
  const istanbulNow = new Date(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Istanbul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(new Date())
      .reduce<Record<string, string>>((acc, p) => ({ ...acc, [p.type]: p.value }), {} as Record<string, string>)
      .year +
      "-" +
      new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Istanbul", month: "2-digit" }).format(new Date()) +
      "-" +
      new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Istanbul", day: "2-digit" }).format(new Date()) +
      "T00:00:00Z",
  );
  const today = istanbulNow;
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(istanbulNow.getTime() + i * 86400000);
    return {
      wd: (en ? dayShortEN : dayShortTR)[d.getUTCDay()],
      dn: d.getUTCDate(),
    };
  });

  const selectedDayIdx = 2;
  const slots = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];
  const bookedIdx = [0, 3];
  const selectedSlotIdx = 4;

  return (
    <section className="md:hidden px-4 py-8">
      <Link
        to="/randevu"
        className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-all md:mx-auto md:max-w-[1320px] md:p-10 lg:p-14 md:hover:-translate-y-0.5 md:hover:shadow-[0_30px_80px_-20px_rgba(229,25,55,0.45)]"
      >
        {/* radial red glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 0%, color-mix(in oklab, var(--brand-red) 28%, transparent), transparent 55%), radial-gradient(circle at 0% 100%, color-mix(in oklab, var(--brand-red) 14%, transparent), transparent 50%)",
          }}
        />
        {/* grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative grid gap-6 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12">
          {/* RIGHT on desktop, TOP on mobile — live preview widget */}
          <div className="order-first md:order-last">
            <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl md:p-5 shadow-[0_20px_60px_-20px_rgba(229,25,55,0.35)]">
              {/* LIVE badge */}
              <div className="absolute -top-2.5 right-4 flex items-center gap-1.5 rounded-full bg-brand-red px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                <Calendar className="h-2.5 w-2.5" />
                {en ? "BOOKING" : "RANDEVU"}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60">
                  <Calendar className="h-3 w-3" />
                  {en ? "Next 7 days" : "Önümüzdeki 7 gün"}
                </div>
                <div className="text-[10px] font-bold text-white/40">
                  {today.toLocaleDateString(en ? "en-GB" : "tr-TR", { month: "short", year: "numeric" })}
                </div>
              </div>

              {/* date strip */}
              <div className="mt-3 grid grid-cols-7 gap-1.5">
                {days.map((d, i) => {
                  const isSel = i === selectedDayIdx;
                  return (
                    <div
                      key={i}
                      className={[
                        "flex flex-col items-center rounded-lg border py-1.5 transition-colors",
                        isSel
                          ? "border-brand-red bg-brand-red text-white shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_25%,transparent)]"
                          : "border-white/10 bg-white/[0.02] text-white/70",
                      ].join(" ")}
                    >
                      <div className={`text-[8.5px] font-bold tracking-wider ${isSel ? "text-white/90" : "text-white/40"}`}>{d.wd}</div>
                      <div className="text-[13px] font-black leading-tight md:text-[15px]">{d.dn}</div>
                    </div>
                  );
                })}
              </div>

              {/* divider */}
              <div className="my-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <Clock className="h-3 w-3" />
                <span>{en ? "Available times" : "Uygun saatler"}</span>
                <div className="ml-auto h-px flex-1 bg-white/10" />
              </div>

              {/* time chips */}
              <div className="grid grid-cols-3 gap-1.5">
                {slots.map((s, i) => {
                  const booked = bookedIdx.includes(i);
                  const sel = i === selectedSlotIdx;
                  return (
                    <div
                      key={s}
                      className={[
                        "rounded-lg border px-2 py-2 text-center text-[12px] font-bold transition-colors",
                        sel
                          ? "border-brand-red bg-brand-red text-white shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_25%,transparent)]"
                          : booked
                          ? "border-white/5 bg-white/[0.02] text-white/25 line-through"
                          : "border-white/10 bg-white/[0.03] text-white/80",
                      ].join(" ")}
                    >
                      {s}
                    </div>
                  );
                })}
              </div>

              {/* status row */}
              <div className="mt-4 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-white/80">
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  {en ? "Technicians available daily" : "Ustalar her gün müsait"}
                </div>
                <MessageSquare className="h-3.5 w-3.5 text-white/40" />
              </div>
            </div>
          </div>

          {/* LEFT on desktop, BOTTOM on mobile — copy + CTA */}
          <div className="md:order-first">
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-brand-red md:text-[12px]">
              <Calendar className="h-3 w-3" />
              {en ? "ONLINE BOOKING · 24/7" : "ONLİNE RANDEVU · 7/24"}
            </div>

            <h2 className="mt-3 text-[24px] font-black leading-[1.05] tracking-tight text-white md:text-[40px] lg:text-[46px]">
              {en ? (
                <>
                  Pick a date and time,{" "}
                  <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">
                    we'll be there.
                  </span>
                </>
              ) : (
                <>
                  Tarih ve saati seçin,{" "}
                  <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">
                    biz gelelim.
                  </span>
                </>
              )}
            </h2>

            <p className="mt-3 text-[13px] leading-relaxed text-white/65 md:text-[15px] md:max-w-md">
              {en
                ? "SMS confirmation in minutes. No callbacks, no waiting on hold — your technician is dispatched the moment you confirm."
                : "Dakikalar içinde SMS onayı. Geri arama yok, beklemek yok — onayladığınız anda ustanız yola çıkar."}
            </p>

            {/* trust chips */}
            <div className="mt-4 flex flex-wrap gap-1.5 md:gap-2">
              {[
                { i: <ShieldCheck className="h-3 w-3" />, t: en ? "Free estimate" : "Ücretsiz keşif" },
                { i: <Zap className="h-3 w-3" />, t: en ? "Same-day slots" : "Aynı gün randevu" },
                { i: <MessageSquare className="h-3 w-3" />, t: en ? "SMS confirmation" : "SMS onayı" },
              ].map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-bold text-white/75 md:text-[11.5px]"
                >
                  <span className="text-brand-red">{c.i}</span>
                  {c.t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-2 md:mt-7 md:flex-row md:items-center md:gap-4">
              <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3.5 text-[13px] font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_-10px_rgba(229,25,55,0.7)] transition-transform md:w-auto md:px-7 md:py-4 md:text-[14px] group-hover:translate-x-0.5">
                {en ? "BOOK APPOINTMENT" : "RANDEVU OLUŞTUR"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-white/55 md:text-[12px]">
                <Zap className="h-3.5 w-3.5 text-brand-red" />
                {en ? "Avg. confirmation: 4 min" : "Ortalama onay: 4 dk"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}



const FLOW_ICONS = [
  <Phone className="h-5 w-5 text-brand-red" />,
  <ClipboardList className="h-5 w-5 text-brand-red" />,
  <FileText className="h-5 w-5 text-brand-red" />,
  <Wrench className="h-5 w-5 text-brand-red" />,
  <ShieldCheck className="h-5 w-5 text-brand-red" />,
];

function BrandsProjects() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const partners = [
    { n: "DOĞUŞ GRUBU", k: en ? "Holding" : "Holding" },
    { n: "AVIVA SA", k: en ? "Insurance" : "Sigorta" },
    { n: "EMAAR", k: en ? "Real Estate" : "Gayrimenkul" },
    { n: "TOKİ", k: en ? "Public" : "Kamu" },
    { n: "VESTEL", k: en ? "Industrial" : "Endüstri" },
    { n: "İSKİ", k: en ? "Municipal" : "Belediye" },
  ];
  return (
    <section className="bg-background px-4 py-10 md:py-20">
      <div className="md:mx-auto md:max-w-[1320px] md:px-8">
        {/* ===== BRANDS — Editorial trust ledger ===== */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-surface to-surface-2 p-5 md:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "22px 22px" }} />
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-red/20 blur-3xl" />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-brand-red md:text-[11px]">
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red" />
                {t.brandsProjects.eyebrow}
              </div>
              <h2 className="mt-3 text-[24px] font-extrabold leading-[1.05] tracking-tight text-foreground md:text-[44px]">
                {t.brandsProjects.title1}{" "}
                <span className="bg-gradient-to-r from-brand-red to-rose-400 bg-clip-text text-transparent">{t.brandsProjects.title2}</span>
              </h2>
              <p className="mt-2 max-w-md text-[13px] text-muted-foreground md:text-[15px]">{t.brandsProjects.desc}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur md:self-auto md:p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red/15 text-brand-red md:h-12 md:w-12">
                <ShieldCheck className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div>
                <div className="text-[18px] font-black leading-none text-foreground md:text-[22px]">120<span className="text-brand-red">+</span></div>
                <div className="mt-1 text-[10px] font-semibold tracking-wide text-muted-foreground md:text-[11px]">{en ? "ACTIVE CONTRACTS" : "AKTİF SÖZLEŞME"}</div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-2 gap-2 md:mt-8 md:grid-cols-6 md:gap-3">
            {partners.map((p, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-3 transition-all hover:border-brand-red/40 hover:from-brand-red/10 md:p-4"
              >
                <div className="absolute left-0 top-0 h-full w-[2px] bg-brand-red/0 transition-all group-hover:bg-brand-red" />
                <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-brand-red/70 md:text-[10px]">{String(i + 1).padStart(2, "0")} · {p.k}</div>
                <div className="mt-1.5 text-[12px] font-black leading-tight tracking-tight text-foreground md:mt-2 md:text-[14px]">{p.n}</div>
                <div className="mt-2 h-px w-8 bg-gradient-to-r from-brand-red/60 to-transparent transition-all group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>



        <div className="mt-8 rounded-2xl border border-border bg-surface p-5 md:mt-16 md:p-8">
          <div className="text-center">
            <div className="text-[12px] font-bold tracking-[0.2em] text-brand-red">{t.brandsProjects.flowEyebrow}</div>
            <h3 className="mt-1 text-[20px] font-extrabold text-foreground md:text-[30px]">{t.brandsProjects.flowTitle}</h3>
          </div>
          <div className="mt-5 grid grid-cols-5 gap-1.5 md:mt-10 md:gap-4 md:relative">
            {t.brandsProjects.flow.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                {/* connecting line on desktop */}
                {i < t.brandsProjects.flow.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] right-[-40%] h-[2px] bg-gradient-to-r from-brand-red/40 to-brand-red/10 z-0" />
                )}
                <div className="relative z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-red bg-surface md:h-14 md:w-14 md:bg-background md:shadow-md">
                    {FLOW_ICONS[i]}
                  </div>
                  <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-black text-white md:h-6 md:w-6 md:text-[11px]">
                    {i + 1}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-extrabold text-foreground leading-tight md:mt-4 md:text-[14px]">{f.t}</div>
                <div className="mt-1 text-[9px] text-muted-foreground leading-tight md:text-[12px]">{f.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-2xl border border-border bg-surface md:mt-10">
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-cover bg-center md:w-2/5"
            style={{ backgroundImage: `url(${technician})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/20" />
          <div className="relative p-5 md:p-12">
            <h3 className="text-[18px] font-extrabold leading-tight text-foreground md:text-[32px]">
              {t.brandsProjects.ctaTitle1}<br />{t.brandsProjects.ctaTitle2}
            </h3>
            <p className="mt-2 max-w-[13rem] text-[11px] text-muted-foreground md:max-w-md md:mt-4 md:text-[15px]">{t.brandsProjects.ctaDesc}</p>
            <a href={PHONE_HREF} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 shadow-lg md:mt-6 md:px-6 md:py-4 hover:brightness-110 transition">
              <Phone className="h-4 w-4 text-white md:h-5 md:w-5" />
              <span className="text-[12px] font-extrabold tracking-wide text-white md:text-[15px]">{t.common.callNow} · {PHONE}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard({
  img,
  label,
  location,
  title,
  beforeText,
  afterText,
  caseNo,
  total,
  result,
}: {
  img: string;
  label: string;
  location: string;
  title: string;
  beforeText: string;
  afterText: string;
  caseNo: number;
  total: number;
  result: string;
}) {
  const [pos, setPos] = useState(50);
  return (
    <div className="group/card relative overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors hover:border-brand-red/40">
      {/* corner accents */}
      <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 rounded-tl-[20px] border-l-2 border-t-2 border-brand-red/60" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 rounded-br-[20px] border-b-2 border-r-2 border-brand-red/60" />

      <div className="relative h-48 w-full overflow-hidden rounded-2xl">
        <img src={img} alt={title} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
        {/* before (grayscale) reveal */}
        <div className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white/90 shadow-[2px_0_12px_rgba(0,0,0,0.5)]" style={{ width: `${pos}%` }}>
          <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover grayscale brightness-[0.6] contrast-110" style={{ width: `${(100 / pos) * 100}%` }} />
        </div>

        {/* top meta row */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2.5">
          <span className="rounded-lg bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-lg">{label}</span>
          <span className="flex items-center gap-1 rounded-lg border border-emerald-400/40 bg-black/50 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-300 backdrop-blur-md">
            <ShieldCheck className="h-3 w-3" /> {caseNo.toString().padStart(2, "0")}/{total.toString().padStart(2, "0")}
          </span>
        </div>

        {/* before/after labels */}
        <span className="absolute bottom-2.5 left-2.5 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-black tracking-wider text-white/90 backdrop-blur-sm">{beforeText}</span>
        <span className="absolute bottom-2.5 right-2.5 rounded-md bg-brand-red px-2 py-0.5 text-[10px] font-black tracking-wider text-white">{afterText}</span>

        <input
          type="range"
          min={5}
          max={95}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          aria-label={`${beforeText}/${afterText}`}
        />
        {/* slider handle */}
        <div className="pointer-events-none absolute top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.5)] ring-2 ring-brand-red/30" style={{ left: `calc(${pos}% - 18px)` }}>
          <ChevronRight className="h-4 w-4 -rotate-180 text-brand-red" />
          <ChevronRight className="-ml-1.5 h-4 w-4 text-brand-red" />
        </div>
      </div>

      <div className="px-3 pb-3 pt-3">
        <div className="flex items-center gap-1.5 text-[13px] font-black text-white">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-red" /> {location}
        </div>
        <div className="mt-0.5 text-[11.5px] leading-snug text-slate-400">{title}</div>
        <div className="mt-2.5 flex items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.07] px-2 py-1.5">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span className="text-[10.5px] font-bold text-emerald-200">{result}</span>
        </div>
      </div>
    </div>
  );
}

const BEFORE_AFTER_IMAGES = [svcLeak, svcRadiator, svcCombi];
const STAT_ICONS = [
  <Users className="h-6 w-6 text-brand-red" />,
  <Calendar className="h-6 w-6 text-brand-red" />,
  <Award className="h-6 w-6 text-brand-red" />,
  <MapPin className="h-6 w-6 text-brand-red" />,
];

function ProjectsBlogForm() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const featuredPosts = FEATURED_BLOG
    .map((f) => {
      const post = BLOG_POSTS.find((p) => p.slug === f.slug);
      return post ? { ...post, teaser: f.teaser } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
  return (
    <section id="contact" className="bg-background px-4 py-10 md:py-20">
      <div className="md:mx-auto md:max-w-[1320px] md:px-8">
        {/* CASE FILES — premium editorial */}
        <div className="relative -mx-4 mb-8 overflow-hidden bg-[#0B0E14] px-4 py-10 md:mx-0 md:rounded-3xl md:px-10 md:py-14">
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-red/15 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative">
            {/* header row */}
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.25em] text-brand-red">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> CASE FILES
              </div>
              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                20.000+ {en ? "jobs done" : "iş tamamlandı"}
              </div>
            </div>

            <h2 className="mt-4 text-[30px] font-black leading-[0.98] tracking-tight text-white md:text-[46px]">
              {t.projects.title1}
              <br />
              <span className="bg-gradient-to-r from-brand-red via-orange-400 to-brand-red bg-clip-text text-transparent">
                {t.projects.title2}
              </span>
            </h2>
            <p className="mt-2.5 max-w-sm text-[13px] leading-relaxed text-slate-400 md:max-w-xl md:text-[15px]">{t.projects.desc}</p>

            {/* premium stats strip */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 md:mt-8 md:grid-cols-4 md:gap-4">
              {t.projects.stats.map((s, i) => (
                <div
                  key={i}
                  className="group/stat relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-3.5 backdrop-blur-xl transition-colors hover:border-brand-red/40 md:p-4"
                >
                  <span className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-brand-red/10 blur-2xl transition-opacity group-hover/stat:opacity-100" />
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10 ring-1 ring-brand-red/25">
                    {STAT_ICONS[i % STAT_ICONS.length]}
                  </div>
                  <div className="relative mt-2.5 text-[20px] font-black leading-none text-white md:text-[26px]">{s.v}</div>
                  <div className="relative mt-1 text-[10.5px] font-semibold leading-tight text-slate-400 md:text-[12px]">{s.l}</div>
                </div>
              ))}
            </div>

            {/* dossier carousel */}
            <div className="mt-7 flex gap-3.5 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none md:mt-9 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:mx-0 md:px-0">
              {t.projects.items.map((b, i) => (
                <div key={i} className="w-[280px] shrink-0 snap-start md:w-auto">
                  <BeforeAfterCard
                    img={BEFORE_AFTER_IMAGES[i]}
                    label={b.label}
                    location={b.location}
                    title={b.title}
                    beforeText={t.projects.before}
                    afterText={t.projects.after}
                    caseNo={i + 1}
                    total={t.projects.items.length}
                    result={
                      (en
                        ? ["Leak located · permanent repair", "Radiators flushed · full heating", "Boiler serviced · warranted"]
                        : ["Kaçak tespit edildi · kalıcı onarım", "Petekler temizlendi · tam ısınma", "Kombi bakımı · garantili"])[i] ?? (en ? "Resolved · warranted" : "Çözüldü · garantili")
                    }
                  />
                </div>
              ))}
            </div>

            {/* guarantee footer bar */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-xl sm:grid-cols-3">
              {(en
                ? [
                    { icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />, t: "Workmanship warranty" },
                    { icon: <Clock className="h-4 w-4 text-brand-red" />, t: "Same-day response" },
                    { icon: <Star className="h-4 w-4 text-orange-400" />, t: "Verified field photos" },
                  ]
                : [
                    { icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />, t: "İşçilik garantisi" },
                    { icon: <Clock className="h-4 w-4 text-brand-red" />, t: "Aynı gün müdahale" },
                    { icon: <Star className="h-4 w-4 text-orange-400" />, t: "Doğrulanmış saha fotoğrafları" },
                  ]
              ).map((f, i) => (
                <div key={i} className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] px-3 py-2">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10">{f.icon}</span>
                  <span className="text-[12px] font-bold text-white/90">{f.t}</span>
                </div>
              ))}
            </div>
          </div>

        </div>


        <div className="mt-8 text-center md:mt-16">
          <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-brand-red">
            <span className="h-px w-6 bg-brand-red" /> {t.projects.blogEyebrow} <span className="h-px w-6 bg-brand-red" />
          </div>
          <h3 className="mt-2 text-[22px] font-extrabold leading-tight text-foreground md:text-[34px]">{t.projects.blogTitle}</h3>
          <p className="mx-auto mt-2 max-w-sm text-[12px] text-muted-foreground md:max-w-2xl md:text-[15px]">{t.projects.blogDesc}</p>
        </div>

        <div className="mt-4 space-y-3 md:mt-8 md:grid md:grid-cols-3 md:gap-5 md:space-y-0">
          {featuredPosts.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-4 transition-all hover:border-brand-red hover:shadow-2xl md:p-5"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red md:text-[11px]">
                <span>{p.category}</span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" /> {p.readMin} dk
                </span>
              </div>
              <h4 className="mt-2 text-[15px] font-extrabold leading-snug text-foreground md:text-[17px]">
                {p.title}
              </h4>
              <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">
                {p.teaser}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-brand-red md:text-[13px]">
                {t.common.readMore}
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          to="/blog"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-3 transition-colors hover:border-brand-red md:mt-8 md:mx-auto md:max-w-sm md:py-4"
        >
          <FileText className="h-4 w-4 text-brand-red" />
          <span className="text-[13px] font-extrabold text-foreground md:text-[14px]">{t.projects.viewAllPosts}</span>
          <ArrowRight className="h-4 w-4 text-brand-red" />
        </Link>

        <div className="md:mt-12 md:max-w-2xl md:mx-auto">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}

function AppointmentForm() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");
  const barIcons = [
    <Clock className="h-5 w-5 text-brand-red" />,
    <ShieldCheck className="h-5 w-5 text-brand-red" />,
  ];
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const lines = [
          "🛠️ *NEW APPOINTMENT REQUEST / YENİ RANDEVU TALEBİ*",
          "",
          `*Name / İsim:* ${name || "-"}`,
          `*Phone / Telefon:* ${phone || "-"}`,
          `*Address / Adres:* ${address || "-"}`,
          `*Service / Hizmet:* ${service || "-"}`,
          note.trim() ? `*Note / Not:* ${note.trim()}` : "",
        ].filter(Boolean);
        const msg = encodeURIComponent(lines.join("\n"));
        window.open(`https://wa.me/905338960503?text=${msg}`, "_blank", "noopener");
        setSubmitted(true);
      }}
      className="relative mt-6 overflow-hidden rounded-2xl border border-border bg-surface p-5"
    >
      <div>
        <div className="text-[12px] font-bold tracking-[0.2em] text-brand-red">{t.form.eyebrow}</div>
        <h3 className="mt-1 text-[22px] font-extrabold leading-tight text-foreground">
          {t.form.title1}<br />{t.form.title2}
        </h3>
        <p className="mt-2 text-[12px] text-muted-foreground">{t.form.desc}</p>
      </div>

      <div className="mt-4 space-y-2.5">
        <FormField icon={<User className="h-4 w-4 text-muted-foreground" />} placeholder={t.form.fields.name} value={name} onChange={setName} />
        <FormField icon={<Phone className="h-4 w-4 text-muted-foreground" />} placeholder={t.form.fields.phone} type="tel" value={phone} onChange={setPhone} />
        <FormField icon={<MapPin className="h-4 w-4 text-muted-foreground" />} placeholder={t.form.fields.address} value={address} onChange={setAddress} />
        <FormField icon={<Wrench className="h-4 w-4 text-muted-foreground" />} placeholder={t.form.fields.service} value={service} onChange={setService} />
        <FormField icon={<FileText className="h-4 w-4 text-muted-foreground" />} placeholder={t.form.fields.note} value={note} onChange={setNote} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {t.form.bar.map((b, i) => (
          <div key={i} className="flex items-center gap-2">
            {barIcons[i]}
            <div className="leading-tight">
              <div className="text-[11px] font-bold text-foreground">{b.t}</div>
              <div className="text-[10px] text-muted-foreground">{b.s}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-3 shadow-lg"
      >
        <Calendar className="h-4 w-4 text-white" />
        <span className="text-[13px] font-extrabold tracking-wide text-white">
          {submitted ? t.form.submitted : t.form.submit}
        </span>
      </button>
    </form>
  );
}

function FormField({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2.5 focus-within:border-brand-red">
      {icon}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none"
      />
    </label>
  );
}

function StickyCTA() {
  const { t } = useLang();
  return (
    <div className="sticky bottom-0 z-30 grid grid-cols-2 gap-2 bg-background px-3 py-3 border-t border-border md:hidden">
      <a href={PHONE_HREF} className="flex items-center justify-center gap-3 rounded-xl bg-brand-red py-3 shadow-lg">
        <Phone className="h-5 w-5 text-white" />
        <div className="text-left leading-tight">
          <div className="text-[13px] font-extrabold tracking-wide text-white">{t.common.callNow}</div>
          <div className="text-[12px] text-white">{PHONE}</div>
        </div>
      </a>
      <a href="https://wa.me/905338960503" target="_blank" rel="noopener" className="flex items-center justify-center gap-3 rounded-xl bg-brand-green py-3 shadow-lg">
        <MessageCircle className="h-5 w-5 text-white" />
        <div className="text-left leading-tight">
          <div className="text-[13px] font-extrabold tracking-wide text-white">{t.common.whatsapp}</div>
          <div className="text-[12px] text-white">{t.common.whatsappShort}</div>
        </div>
      </a>
    </div>
  );
}

function FleetVan() {
  const { lang } = useLang();
  const en = lang === "en";
  const fleet = [
    { id: "GT-01", model: "Mercedes Sprinter", area: "Beşiktaş", live: true },
    { id: "GT-04", model: "Ford Transit", area: "Kadıköy", live: true },
    { id: "GT-07", model: "Iveco Daily", area: "Şişli", live: false },
  ];
  const tools: { icon: typeof Camera; slug: string; label: string }[] = [
    { icon: Camera, slug: "kanal-goruntuleme", label: en ? "Camera inspection" : "Kamera ile görüntüleme" },
    { icon: Activity, slug: "su-kacagi-tespiti", label: en ? "Leak detection" : "Su kaçağı tespiti" },
    { icon: Wrench, slug: "tikaniklik-acma", label: en ? "Unclogging" : "Tıkanıklık açma" },
    { icon: Droplet, slug: "musluk-batarya-degisimi", label: en ? "Faucet & fittings" : "Musluk & batarya" },
    { icon: Gauge, slug: "hidrofor-kurulumu", label: en ? "Hydrophore" : "Hidrofor" },
    { icon: Settings, slug: "kombi-servisi", label: en ? "Boiler service" : "Kombi servisi" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#0B0E14] px-4 py-12 text-white">
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-red/15 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.25em] text-brand-red">
          <div className="flex items-center gap-2 font-mono">
            <span className="h-px w-6 bg-brand-red" /> // HANGAR 03
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-brand-red/30 bg-brand-red/10 px-2.5 py-1 text-brand-red">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-red" />
            7 {en ? "ACTIVE" : "AKTİF"}
          </div>
        </div>

        <h2 className="mt-3 text-[28px] font-black leading-[1] tracking-tight">
          {en ? "Operations" : "Operasyon"}
          <br />
          <span className="bg-gradient-to-r from-brand-red via-orange-400 to-brand-red bg-clip-text text-transparent">
            {en ? "Hangar" : "Üssü"}
          </span>
        </h2>
        <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-slate-400">
          {en
            ? "Fully equipped service vans patrolling Istanbul 24/7 — a tracked fleet, plate by plate."
            : "İstanbul'da 7/24 sahada, tam donanımlı servis araçları — plaka plaka takipli filo."}
        </p>

        {/* FEATURED van card */}
        <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <div className="relative aspect-[4/3]">
            <img src={vanImg} alt="Gölge Tesisat fleet" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/20 to-transparent" />
            {/* plate */}
            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-md border-2 border-white bg-white px-2 py-1 font-mono text-[12px] font-black text-slate-900 shadow-lg">
              <span className="text-[8px] text-slate-500">TR</span>
              <span>34 GT 001</span>
            </div>
            {/* live pill */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-brand-red px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              {en ? "ACTIVE" : "AKTİF"}
            </div>
            {/* bottom data band */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/50 px-3.5 py-2.5 backdrop-blur-md">
              <div className="min-w-0">
                <div className="text-[15px] font-extrabold text-white">Mercedes Sprinter</div>
                <div className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-brand-red" /> Beşiktaş
                </div>
              </div>
              <Link
                to="/hizmetler"
                aria-label={en ? "View fleet services" : "Filo hizmetlerini gör"}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* quick service toolbar */}
        <div className="mt-4 grid grid-cols-6 gap-2">
          {tools.map((t, i) => (
            <Link
              key={t.slug}
              to="/hizmet/$slug"
              params={{ slug: t.slug }}
              aria-label={t.label}
              className={`grid aspect-square place-items-center rounded-xl border transition-colors ${
                i === 0
                  ? "border-brand-red/50 bg-brand-red/15 text-brand-red shadow-[0_0_24px_-8px_var(--tw-shadow-color)] shadow-brand-red"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              <t.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>

        {/* mini fleet list */}
        <div className="mt-4 space-y-2.5">
          {fleet.slice(1).map((v) => (
            <div key={v.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-xl">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-red/10 ring-1 ring-brand-red/30">
                <Truck className="h-6 w-6 text-brand-red" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-extrabold text-white">{v.model}</div>
                <div className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" /> {v.area}
                </div>
              </div>
              <a
                href={PHONE_HREF}
                aria-label={en ? "Call" : "Ara"}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brand-red/30 bg-brand-red/10 transition-colors hover:bg-brand-red/20"
              >
                <Phone className="h-4 w-4 text-brand-red" />
              </a>
              <Link to="/hizmetler" aria-label={en ? "Details" : "Detay"} className="shrink-0 text-slate-500 transition-colors hover:text-white">
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <main className="mx-auto min-h-screen max-w-md bg-background md:max-w-none">
      <TopBar />
      <DesktopTopBar />
      <Hero />
      <DesktopHero />
      <DesktopInstantQuote />
      <div className="md:hidden"><Reveal><FleetVan /></Reveal></div>
      <DesktopFleet />
      <div className="md:hidden"><Reveal><Services /></Reveal></div>
      <DesktopServices />
      <div className="md:hidden"><Reveal><InstantQuote /></Reveal></div>
      <div className="md:hidden"><Reveal><BookingBanner /></Reveal></div>
      <DesktopBookingBanner />

      <div className="md:hidden"><Reveal><ServiceAreasSection /></Reveal></div>
      <DesktopServiceAreas />
      <div className="md:hidden"><Reveal><ProcessPackagesSection /></Reveal></div>
      <DesktopServiceProcess />
      <DesktopValuePackages />
      <DesktopEfficiencyTips />
      <Reveal><ReviewsLarge /></Reveal>
      <div className="md:hidden"><Reveal><FromTheField /></Reveal></div>
      <DesktopFromField />
      <Reveal><LiveService /></Reveal>
      <div className="md:hidden"><Reveal><MeetTechnicians /></Reveal></div>
      <DesktopTechnicians />
      <Reveal><BrandsProjects /></Reveal>
      <Reveal><ProjectsBlogForm /></Reveal>
      <div className="md:hidden"><Reveal><CertsAndStatsSection /></Reveal></div>
      <DesktopCertsStats />
      <div className="md:hidden"><Reveal><CallbackForm /></Reveal></div>
      <div className="md:hidden"><Reveal><FaqReviewsContactSection /></Reveal></div>
      <DesktopFaqReviewsContact />
      
      <SiteFooter />
    </main>
  );
}
