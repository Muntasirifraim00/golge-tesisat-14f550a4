import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Navigation,
  ArrowRight,
  Star,
  Wrench,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { BUSINESS, FULL_ADDRESS } from "@/data/business";
import { SERVICES } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import { Button } from "@/components/ui/button";
// Lightweight static list — importing BLOG_POSTS here would pull the entire
// ~19k-line blog dataset (and all images) into every page that renders the footer.
const TOP_GUIDES: { slug: string; title: string }[] = [
  { slug: "taharet-muslugu-nasil-takilir-degistirilir", title: "Taharet Musluğu Nasıl Takılır, Değiştirilir ve Tamir Edilir?" },
  { slug: "bulasik-makinesi-nasil-baglanir", title: "Bulaşık Makinesi Nasıl Bağlanır? Su Girişi, Tahliye ve Sifon" },
  { slug: "kombi-bacasi-nedir-cesitleri-montaji", title: "Kombi Bacası Nedir? Çeşitleri, Montajı ve Güvenlik" },
  { slug: "kanal-goruntuleme-nedir-nasil-yapilir", title: "Kanal Görüntüleme Nedir? Nasıl Yapılır, Ne Zaman Gerekir?" },
  { slug: "kombi-montaji-nasil-yapilir-baglanti-rehberi", title: "Kombi Montajı Nasıl Yapılır? Bağlantı ve Kurulum Rehberi" },
  { slug: "radyator-nedir-cesitleri-secim-rehberi", title: "Radyatör Nedir? Çeşitleri, Farkları ve Seçim Rehberi" },
];

// Comprehensive sitewide footer — visible NAP (Name / Address / Phone) block
// keeps citation data consistent with the LocalBusiness JSON-LD for local SEO,
// while the multi-column mega-nav (services × districts × guides × corporate)
// deepens internal linking for crawl reach, mirroring a full business website.
export function SiteFooter() {
  const [linksOpen, setLinksOpen] = useState(false);
  const allDistricts = DISTRICTS;
  const topGuides = TOP_GUIDES;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border bg-surface">
      {/* ===== Top emergency CTA band ===== */}
      <div className="px-4 pt-3 md:px-8 md:pt-4">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-xl border border-brand-red/40 bg-brand-red px-5 py-5 shadow-xl shadow-brand-red/20 md:px-8 md:py-6">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-brand-gold/15 to-transparent" />
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              <h2 className="text-[17px] font-extrabold uppercase tracking-tight text-brand-red-foreground md:text-[20px]">
                7/24 Acil Tesisat Hattı
              </h2>
            </div>
            <p className="mt-1.5 max-w-xl text-[12px] leading-relaxed text-brand-red-foreground/85 md:text-[13px]">
              İstanbul'un her noktasına ortalama 30 dakikada hızlı müdahale — su kaçağı, tıkanıklık, kombi ve petek için
              ruhsatlı ekibimizi hemen arayın.
            </p>
          </div>
          <div className="grid shrink-0 grid-cols-2 gap-3 md:flex">
            <a
              href={BUSINESS.phoneHref}
               className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red-foreground px-5 py-3 text-[13px] font-extrabold text-brand-red shadow-lg transition hover:opacity-90 md:text-[14px]"
            >
              <Phone className="h-4 w-4" /> Hemen Ara
            </a>
            <a
              href={BUSINESS.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-[13px] font-bold text-brand-green-foreground shadow-lg transition hover:brightness-110 md:text-[14px]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* ===== Main footer grid ===== */}
      <div className="mx-auto max-w-[1320px] px-4 pb-5 pt-7 md:px-8 md:pt-8">
        <div className="grid gap-7 md:grid-cols-[1.2fr_.8fr] md:items-start md:gap-12">
          {/* Brand + NAP */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red shadow-md">
                <span className="text-[11px] font-black text-white">GT</span>
              </div>
              <div className="leading-tight">
                <div className="text-[18px] font-extrabold tracking-tight">
                  GÖLGE <span className="text-brand-red">TESİSAT</span>
                </div>
                <div className="text-[10px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</div>
              </div>
            </div>

            <p className="mt-3 max-w-xl text-[12px] leading-relaxed text-muted-foreground">
              {BUSINESS.description}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5">
              <Star className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
              <span className="text-[12px] font-bold text-foreground">{BUSINESS.rating.value}</span>
              <span className="text-[11px] text-muted-foreground">
                / 5 · {BUSINESS.rating.count.toLocaleString("tr-TR")} değerlendirme
              </span>
            </div>

            {/* Contact rows with icon tiles */}
            <address className="mt-4 grid gap-2.5 not-italic text-[12px] text-muted-foreground sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-brand-red">
                  <MapPin className="h-4 w-4" />
                </span>
                <p className="self-center text-foreground/90">{FULL_ADDRESS}</p>
              </div>
              <div className="flex items-center gap-3 sm:col-span-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-brand-red">
                  <Phone className="h-4 w-4" />
                </span>
                <a href={BUSINESS.phoneHref} className="font-bold text-foreground hover:text-brand-red">
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-brand-red">
                  <Clock className="h-4 w-4" />
                </span>
                <span>7/24 açık — hafta sonu ve resmi tatil dahil</span>
              </div>
            </address>

            {/* Trust badge */}
            <div className="mt-4 flex items-center gap-3 rounded-lg border border-brand-green/20 bg-brand-green/10 p-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <span className="text-[12px] font-medium text-foreground/90">
                Ruhsatlı &amp; sigortalı ekip · 2 yıl işçilik garantisi
              </span>
            </div>

            {/* Quick actions */}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-2 py-3 text-[12px] font-bold text-foreground transition hover:border-brand-red"
              >
                <Navigation className="h-3.5 w-3.5 text-brand-red" /> Yol Tarifi
              </a>
              <a
                href={BUSINESS.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-green/20 bg-brand-green/10 py-3 text-[12px] font-bold text-brand-green transition hover:bg-brand-green/20"
              >
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-2/60 p-4 md:p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/15 text-brand-red">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[13px] font-extrabold text-foreground">Hızlı Bağlantılar</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Hizmetler, bölgeler, fiyat sayfaları ve tesisat rehberleri.
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              aria-expanded={linksOpen}
              aria-controls="footer-link-directory"
              onClick={() => setLinksOpen((open) => !open)}
              className="mt-4 h-11 w-full justify-between border-border bg-background px-4 text-[12px] font-bold hover:border-brand-red hover:bg-brand-red/10"
            >
              {linksOpen ? "Bağlantıları gizle" : "Tüm bağlantıları göster"}
              <ChevronDown className={`h-4 w-4 text-brand-red transition-transform duration-300 ${linksOpen ? "rotate-180" : ""}`} />
            </Button>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-muted-foreground">
              <span>{SERVICES.length}+ hizmet</span>
              <span>{allDistricts.length} bölge</span>
              <span>{topGuides.length} rehber</span>
            </div>
          </div>
        </div>

        <div
          id="footer-link-directory"
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${linksOpen ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 border-t border-border pt-7 md:grid-cols-4 md:gap-8">
          {/* Hizmetler */}
          <div>
            <h2 className="border-l-2 border-brand-red pl-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-foreground">
              <Wrench className="mr-1.5 inline h-3.5 w-3.5 text-brand-red" />Hizmetler
            </h2>
            <ul className="mt-4 space-y-2.5 text-[12px] text-muted-foreground">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to="/hizmet/$slug" params={{ slug: s.slug }} className="hover:text-brand-red">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/acil-tesisatci" className="font-semibold text-brand-red hover:underline">
                  Acil Tesisatçı 7/24
                </Link>
              </li>
              <li>
                <Link to="/hizmetler" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-brand-red">
                  Tüm Hizmetler <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Popüler Bölgeler */}
          <div>
            <h2 className="border-l-2 border-brand-red pl-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-foreground">
              <MapPin className="mr-1.5 inline h-3.5 w-3.5 text-brand-red" />Bölgeler
            </h2>
            <ul className="mt-4 space-y-2.5 text-[12px] text-muted-foreground">
              {allDistricts.map((d) => (
                <li key={d.slug}>
                  <Link to="/tesisatci/$slug" params={{ slug: d.slug }} className="hover:text-brand-red">
                    {d.name} Tesisatçı
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/tesisatci" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-brand-red">
                  Tüm Bölgeler <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Fiyatlar */}
          <div>
            <h2 className="border-l-2 border-brand-red pl-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-foreground">
              Fiyatlar
            </h2>
            <ul className="mt-4 space-y-2.5 text-[12px] text-muted-foreground">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to="/hizmet/$slug/fiyat" params={{ slug: s.slug }} className="hover:text-brand-red">
                    {s.name} Fiyatları
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/randevu" className="inline-flex items-center gap-1 font-semibold text-brand-red hover:underline">
                  Ücretsiz Keşif / Randevu <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Rehberler / Blog */}
          <div>
            <h2 className="border-l-2 border-brand-red pl-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-foreground">
              <BookOpen className="mr-1.5 inline h-3.5 w-3.5 text-brand-red" />Rehberler
            </h2>
            <ul className="mt-4 space-y-2.5 text-[12px] text-muted-foreground">
              {topGuides.map((p) => (
                <li key={p.slug}>
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="line-clamp-2 hover:text-brand-red">
                    {p.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-brand-red">
                  Tüm Yazılar <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
            </div>
          </div>
        </div>

        {/* ===== Corporate / legal row ===== */}
        <div className="mt-6 border-t border-border pt-4">
          <nav aria-label="Kurumsal" className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-muted-foreground">
            <Link to="/" className="hover:text-brand-red">Ana Sayfa</Link>
            <Link to="/hizmetler" className="hover:text-brand-red">Hizmetler</Link>
            <Link to="/tesisatci" className="hover:text-brand-red">Bölgeler</Link>
            <Link to="/blog" className="hover:text-brand-red">Blog</Link>
            <Link to="/randevu" className="hover:text-brand-red">Randevu Al</Link>
            <Link to="/acil-tesisatci" className="hover:text-brand-red">Acil Tesisatçı</Link>
            <Link to="/kvkk" className="hover:text-brand-red">KVKK</Link>
            <Link to="/cerez-politikasi" className="hover:text-brand-red">Çerez Politikası</Link>
          </nav>
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="border-t border-border bg-background px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-2 text-[11px] text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {BUSINESS.name}. Tüm hakları saklıdır.
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-red" />
            İstanbul geneli 7/24 acil tesisat hizmeti
          </p>
        </div>
      </div>
    </footer>
  );
}
