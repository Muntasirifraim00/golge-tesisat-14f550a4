import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { Phone, MessageCircle, ArrowRight, Clock, Check, ShieldCheck, BookOpen, MapPin, ChevronDown, CalendarDays, ArrowUpRight, Menu, Home } from "lucide-react";
import { GtChrome } from "@/components/gt/GtShell";
import { GtPost } from "@/components/blog/GtPost";
import { SiteFooter } from "@/components/SiteFooter";
import { SuVanasiEditorial } from "@/components/SuVanasiEditorial";
import { TaharetMusluguEditorial } from "@/components/TaharetMusluguEditorial";
import { CamasirMakinesiEditorial } from "@/components/CamasirMakinesiEditorial";
import { LavaboSifonuEditorial } from "@/components/LavaboSifonuEditorial";
import { DogalgazSayaciEditorial } from "@/components/DogalgazSayaciEditorial";
import { MuslukBataryaEditorial } from "@/components/MuslukBataryaEditorial";
import { BanyoSicakSuEditorial } from "@/components/BanyoSicakSuEditorial";
import { KlozetMontajiEditorial } from "@/components/KlozetMontajiEditorial";
import { KlozetIcTakimiEditorial } from "@/components/KlozetIcTakimiEditorial";
import { ViessmannResetlemeEditorial } from "@/components/ViessmannResetlemeEditorial";
import { SuSayaciEditorial } from "@/components/SuSayaciEditorial";
import { YerSuzgeciEditorial } from "@/components/YerSuzgeciEditorial";
import { TuvaletKokusuEditorial } from "@/components/TuvaletKokusuEditorial";
import { GenlesmeTankiEditorial } from "@/components/GenlesmeTankiEditorial";
import { PetekHavaEditorial } from "@/components/PetekHavaEditorial";
import { SuKacagiEditorial } from "@/components/SuKacagiEditorial";
import { CamasirSuEditorial } from "@/components/CamasirSuEditorial";
import { GiderEditorial } from "@/components/GiderEditorial";
import { PetekSicakSogukEditorial } from "@/components/PetekSicakSogukEditorial";
import { MutfakTikanikEditorial } from "@/components/MutfakTikanikEditorial";
import { LavaboTikanikEditorial } from "@/components/LavaboTikanikEditorial";
import { LagimKokusuEditorial } from "@/components/LagimKokusuEditorial";
import { KombiCalismiyorEditorial } from "@/components/KombiCalismiyorEditorial";
import { KombiSicakSuEditorial } from "@/components/KombiSicakSuEditorial";
import { PetekIsinmiyorEditorial } from "@/components/PetekIsinmiyorEditorial";
import { KombiBasinciEditorial } from "@/components/KombiBasinciEditorial";
import { DusakabinEditorial } from "@/components/DusakabinEditorial";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleToc, type TocItem } from "@/components/ArticleToc";
import { BlogRichBlocks } from "@/components/BlogRichBlocks";
import { relatedPostsFor, siloNeighbors, findPost, INLINE_LINK_INDEX, CANONICAL_TARGET, type BlogPost, type BlogSection, type InlinePhrase } from "@/data/blog";
import { PILLAR_HUBS, CLUSTER_BOOST, BOOST_RESCUE } from "@/data/pillar-hubs";
import { findInlineMatch, lcTr } from "@/lib/inline-linker";
import { getGeneratedPost } from "@/lib/seo-writer/blog-public.functions";
import { findService } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import type { ReactNode } from "react";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

// Consolidated duplicate posts → canonical slug (301). Keeps link equity from
// the older redundant URLs after merging cannibalizing blog posts.
const REDIRECTS: Record<string, string> = {
  "petek-temizligi-kalorifer-rehberi": "petek-temizligi-nasil-yapilir",
  "musluk-batarya-tamiri-baslik-kartus-degisnim": "musluk-batarya-tamiri-baslik-kartus-degisimi",
  "su-saati-nasil-kapatilir-acilir": "su-vanasi-nasil-kapatilir-acilir",
  "petekler-nasil-acilir-alttan-isitmayan": "petekler-nasil-acilir",
  "petek-hava-alma-radyator-purj": "petekler-nasil-acilir",
  "tuvalet-tikanikligi-evde-adim-adim": "tuvalet-tikanikligi-nasil-acilir",
  "tuvalet-tikanikligi-evde-guvenli-yontemler": "tuvalet-tikanikligi-nasil-acilir",
  "kombi-atesleme-yapmiyor-cozumu": "kombi-atesleme-yapmiyor",
  // Duplicate rewrites folded into the canonical posts (2026-10-03)
  "klozet-cesitleri": "klozet-cesitleri-nedir-secim-rehberi",
  "klozet-su-kaciriyorsa-basit-tamiri": "klozet-su-kaciriyor-nasil-tamir-edilir",
  "dogalgaz-kacagi-nasil-anlasilir": "dogalgaz-kacagi",
  "su-vanasi-hangi-yone-kapanir": "su-vanasi-nasil-kapatilir-acilir",
  "donan-su-borusu-nasil-acilir": "donan-su-borusu-nasil-cozulur",
  "gider-acma-teli-susta-nasil-kullanilir": "gider-acma-teli-spiral-nasil-kullanilir",
  "giderlerden-gelen-lagim-kokusu-nasil-giderilir": "giderden-gelen-lagim-kokusu-nasil-giderilir",
  "hermetik-kombi-nedir": "hermetik-kombi-nedir-bacali-fark",
  "klozet-ic-takimi-nasil-degistirilir": "klozet-ic-takimi-degisimi",
  "kombi-ariza-kodlari-cozumleri": "kombi-ariza-kodlari-rehberi",
  "kombi-atesleme-yapmiyor-nedenleri-cozumu": "kombi-atesleme-yapmiyor",
  "kombi-basinci-kac-olmali": "kombi-bari-kac-olmali",
  "kombi-calisiyor-petekler-isinmiyor": "kombi-calisiyor-ama-petekler-isinmiyor",
  "kombi-fan-motoru-arizasi": "kombi-fan-motoru-nedir-arizasi",
  "kombi-montaji-nasil-yapilir": "kombi-montaji-nasil-yapilir-baglanti-rehberi",
  "kombi-sicak-su-vermiyor-nedenleri-cozumu": "kombi-sicak-su-vermiyor",
  "petekler-nasil-acilir-kapatilir": "petekler-nasil-acilir",
  "taharet-muslugu-nasil-degistirilir": "taharet-muslugu-nasil-takilir-degistirilir",
  "camasir-makinesi-su-almiyor": "camasir-makinesi-su-almiyor-nedenleri",
  // Misspelled URLs seen in Search Console (external typo links)
  "camasir-makasi-nasil-baglanir": "camasir-makinesi-nasil-baglanir",
  "dogalgaz-kacag1": "dogalgaz-kacagi",
  "bidet-taharet-muslugu-vedir": "bidet-taharet-muslugu-nedir",
};

// ---------------------------------------------------------------------------
// In-content auto-linker (Internal Linking — Steps 1 & 7)
// ---------------------------------------------------------------------------
// Deep-links the first natural mention of another guide's keyword inside body
// prose. Word-boundary aware (Turkish letters included), one link per phrase,
// one per target, capped per article so copy stays readable and unspammy.
// The matching core (incl. Turkish-safe lowercasing) lives in inline-linker.ts
// so it is unit-tested independently of React/router rendering.
type LinkifyCtx = { currentSlug: string; used: Set<string>; budget: { left: number }; services: { left: number } };

function linkifyParagraph(text: string, index: InlinePhrase[], ctx: LinkifyCtx): ReactNode {
  if (typeof text !== "string") return "";
  if (ctx.budget.left <= 0) return text;
  const best = findInlineMatch(
    text,
    index,
    (slug) => slug === ctx.currentSlug || ctx.used.has(slug) || (ctx.services.left <= 0 && !!findService(slug)),
  );
  if (!best) return text;
  ctx.used.add(best.slug);
  ctx.budget.left -= 1;
  if (findService(best.slug)) ctx.services.left -= 1;
  const head = text.slice(0, best.start);
  const match = text.slice(best.start, best.start + best.len);
  const tail = text.slice(best.start + best.len);
  const isService = !!findService(best.slug);
  return (
    <>
      {head}
      <Link
        to={isService ? "/hizmet/$slug" : "/blog/$slug"}
        params={{ slug: best.slug }}
        className="font-semibold text-brand-red underline decoration-brand-red/40 underline-offset-2 transition-colors hover:decoration-brand-red"
      >
        {match}
      </Link>
      {linkifyParagraph(tail, index, ctx)}
    </>
  );
}

// Markdown-style **bold** inside post text → <strong>; each piece still goes through the auto-linker.
function withBold(text: string, link: (t: string) => ReactNode): ReactNode {
  if (typeof text !== "string" || !text.includes("**")) return link(text);
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (part ? (i % 2 ? <strong key={i}>{link(part)}</strong> : <span key={i}>{link(part)}</span>) : null));
}

function list<T>(value: T[] | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function postSections(post: BlogPost): BlogSection[] {
  return list(post.sections);
}

function postFaq(post: BlogPost): BlogPost["faq"] {
  return list(post.faq).filter((item) => item.q && item.a);
}

function sectionParagraphs(section: BlogSection): string[] {
  return list(section.paragraphs).filter(Boolean);
}

function sectionBullets(section: BlogSection): string[] {
  return list(section.bullets).filter(Boolean);
}

function tableHeaders(section: BlogSection): string[] {
  return list(section.table?.headers).filter(Boolean);
}

function tableRows(section: BlogSection): string[][] {
  return list(section.table?.rows).filter((row) => Array.isArray(row) && row.length > 0);
}

function isChartBar(value: unknown): value is { label: string; value: number; note?: string } {
  if (!value || typeof value !== "object") return false;
  if (!("label" in value) || !("value" in value)) return false;
  return typeof value.label === "string" && typeof value.value === "number" && Number.isFinite(value.value);
}

function chartBars(chart: BlogSection["chart"]): { label: string; value: number; note?: string }[] {
  if (!chart) return [];
  const source = Array.isArray(chart.bars)
    ? chart.bars
    : "data" in chart && Array.isArray(chart.data)
      ? chart.data
      : [];
  return source.filter(isChartBar);
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const target = REDIRECTS[params.slug];
    if (target) {
      throw redirect({ to: "/blog/$slug", params: { slug: target }, statusCode: 301 });
    }
    const post = findPost(params.slug);
    if (post) return { post };
    const { post: generated } = await getGeneratedPost({ data: { slug: params.slug } }).catch(
      () => ({ post: null as BlogPost | null }),
    );
    if (!generated) throw notFound();
    return { post: generated };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return { meta: [{ title: "Blog — Gölge Tesisat" }] };
    const faq = postFaq(p);
    const title = `${p.seoTitle} | Gölge Tesisat`;
    const url = `https://golgetesisat.com/blog/${p.slug}`;
    const ogImage = `https://golgetesisat.com/og/${p.serviceSlug}.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: p.metaDescription },
        { name: "keywords", content: `${p.keyword}, ${p.category.toLowerCase()}, tesisat` },
        { property: "og:title", content: title },
        { property: "og:description", content: p.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:alt", content: p.title },
        { property: "og:locale", content: "tr_TR" },
        { property: "article:published_time", content: p.published },
        { property: "article:modified_time", content: p.updated ?? p.published },
        { property: "og:updated_time", content: p.updated ?? p.published },
        { property: "article:section", content: p.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: p.metaDescription },
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
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://golgetesisat.com/blog" },
              { "@type": "ListItem", position: 3, name: p.title, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.metaDescription,
            inLanguage: "tr",
            datePublished: p.published,
            dateModified: p.updated ?? p.published,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            image: { "@type": "ImageObject", url: ogImage, width: 1200, height: 630, caption: p.title },
            author: { "@type": "Organization", name: "Gölge Tesisat" },
            publisher: {
              "@type": "Organization",
              name: "Gölge Tesisat",
              logo: { "@type": "ImageObject", url: "https://golgetesisat.com/og-image.jpg" },
            },
          }),
        },
        // FAQPage schema only when the post actually has Q&A — an empty
        // mainEntity triggers "missing field" errors in Search Console.
        ...(faq.length > 0
          ? [
              {
                type: "application/ld+json",
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  inLanguage: "tr",
                  mainEntity: faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-2xl font-extrabold">Yazı bulunamadı</h1>
        <p className="mt-2 text-sm text-muted-foreground">Aradığınız blog yazısı hazırlanıyor.</p>
        <Link to="/blog" className="mt-4 inline-block rounded-md bg-brand-red px-4 py-2 text-sm font-bold text-white">Tüm Yazılar</Link>
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
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post: p } = Route.useLoaderData() as { post: BlogPost };
  const isBoschEditorial = p.slug === "bosch-kombi-resetleme";
  const service = findService(p.serviceSlug);
  const related = relatedPostsFor(p, 6);
  const silo = siloNeighbors(p);
  const sections = postSections(p);
  const faq = postFaq(p);
  // Locally relevant districts to deep-link from the guide (intent → local money
  // page). Rotated deterministically by slug so all 27 districts receive inlinks
  // across the blog rather than only the first four (Internal Linking — Step 6).
  const districtStart = [...p.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % DISTRICTS.length;
  const nearbyDistricts = Array.from({ length: 4 }, (_, k) => DISTRICTS[(districtStart + k) % DISTRICTS.length]);
  // Per-article budget for the in-content auto-linker (shared across intro,
  // body paragraphs, bullet lists and FAQ answers).
  const linkCtx: LinkifyCtx = { currentSlug: p.slug, used: new Set<string>(), budget: { left: 9 }, services: { left: 2 } };
  // Intro (≈ first 100 words) carries at most one link.
  const introCtx: LinkifyCtx = { ...linkCtx, budget: { left: 1 } };
  // Editor-curated inlineLinks (blog + service targets) ride on top of the
  // global auto-link index; service slugs are routed to /hizmet/ by linkifyParagraph.
  const linkIndex: InlinePhrase[] = p.inlineLinks?.length
    ? [
        // Some markdown posts write `href: "/blog/x"` instead of `slug: "x"`;
        // normalise both so no link renders as /blog/undefined.
        ...p.inlineLinks
          .map((l) => {
            const raw = l as { slug?: string; href?: string; anchor: string };
            const slug = raw.slug ?? raw.href?.replace(/^\/(blog|hizmet)\//, "").replace(/\/$/, "");
            return slug && raw.anchor ? { phrase: lcTr(raw.anchor), slug } : null;
          })
          .filter((x): x is InlinePhrase => x !== null),
        ...INLINE_LINK_INDEX,
      ]
    : INLINE_LINK_INDEX;
  const updatedLabel = new Date(p.updated ?? p.published).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Build the table of contents from section headings + the FAQ anchor.
  const tocItems: TocItem[] = [
    ...sections.map((s, i) => ({ id: `sec-${i}`, label: s.heading })),
    { id: "sss", label: "Sıkça Sorulan Sorular" },
  ];

  if (p.slug === "su-vanasi-nasil-kapatilir-acilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <SuVanasiEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "taharet-muslugu-nasil-takilir-degistirilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <TaharetMusluguEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "camasir-makinesi-nasil-baglanir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <CamasirMakinesiEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "lavabo-sifonu-nasil-takilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <LavaboSifonuEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "dogalgaz-sayaci-nasil-okunur") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <DogalgazSayaciEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "musluk-batarya-tamiri-baslik-kartus-degisimi") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <MuslukBataryaEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "banyoya-sicak-su-az-akiyor-nedenleri") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <BanyoSicakSuEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "klozet-montaji-nasil-yapilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <KlozetMontajiEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "klozet-ic-takimi-degisimi") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <KlozetIcTakimiEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "viessmann-kombi-resetleme") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <ViessmannResetlemeEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "su-sayaci-nasil-okunur") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <SuSayaciEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "yer-suzgeci-nedir-cesitleri-koku-onleme") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <YerSuzgeciEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "tuvalet-klozet-kokusu-nasil-giderilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <TuvaletKokusuEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "kombi-basinci-dusuyor") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <KombiBasinciEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "gider-tikanikligi-nasil-acilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <GiderEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "kombi-calisiyor-ama-petekler-isinmiyor") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <PetekIsinmiyorEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "kombi-sicak-su-vermiyor") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <KombiSicakSuEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "kombi-neden-calismiyor") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <KombiCalismiyorEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "giderden-gelen-lagim-kokusu-nasil-giderilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <LagimKokusuEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "lavabo-tikanikligi-nasil-acilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <LavaboTikanikEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "mutfak-tikanikligi-nasil-acilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <MutfakTikanikEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "petek-alttan-sicak-ustten-soguk") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <PetekSicakSogukEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "camasir-makinesi-su-bosaltmiyor") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <CamasirSuEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "kirmadan-su-kacagi-tespiti") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <SuKacagiEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "petek-isinmiyor-hava-alma") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <PetekHavaEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }
  if (p.slug === "kombi-genlesme-tanki-ne-ise-yarar") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <GenlesmeTankiEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  if (p.slug === "dusakabin-montaji-nasil-yapilir") {
    return (
      <article className="sp-light min-h-screen bg-background">
        <ReadingProgress />
        <DusakabinEditorial faq={faq} updatedLabel={updatedLabel} readMin={p.readMin} />
        <SiteFooter />
      </article>
    );
  }

  // New design template for every post without its own editorial layout (Bosch keeps its bespoke variant below).
  if (!isBoschEditorial) {
    const intro = (() => { const n = withBold(p.intro || p.excerpt || "", (x) => linkifyParagraph(x, linkIndex, introCtx)); linkCtx.budget.left -= 1 - introCtx.budget.left; return n; })();
    const canon = CANONICAL_TARGET[p.slug] ? findPost(CANONICAL_TARGET[p.slug]) : undefined;
    const pillarOf = Object.keys(PILLAR_HUBS).find((k) => k !== p.slug && PILLAR_HUBS[k].includes(p.slug));
    const pillar = pillarOf ? findPost(pillarOf) : undefined;
    const guideLinks = [canon && { post: canon, label: "Bu sorunun ayrıntılı rehberi" }, pillar && pillar.slug !== canon?.slug && { post: pillar, label: "Konunun ana rehberi" }].filter(Boolean) as { post: BlogPost; label: string }[];
    guideLinks.forEach((g) => linkCtx.used.add(g.post.slug));
    const siblings = () => {
      if (!pillarOf) return [] as BlogPost[];
      const ring = PILLAR_HUBS[pillarOf].filter((s) => !CANONICAL_TARGET[s] && !PILLAR_HUBS[s]);
      const idx = ring.indexOf(p.slug);
      const picks: BlogPost[] = [];
      for (let k = 1; k < ring.length && picks.length < 2; k++) {
        const s = ring[((idx < 0 ? 0 : idx) + k) % ring.length];
        if (s === p.slug || linkCtx.used.has(s)) continue;
        const post = findPost(s);
        if (post) picks.push(post);
      }
      const boost = CLUSTER_BOOST[pillarOf];
      if (boost && boost !== p.slug && !linkCtx.used.has(boost) && !picks.some((x) => x.slug === boost)) {
        const bp = findPost(boost);
        if (bp) picks.push(bp);
      }
      const rescue = PILLAR_HUBS[pillarOf].filter((s) => BOOST_RESCUE.has(s) && s !== p.slug && !linkCtx.used.has(s) && !picks.some((x) => x.slug === s));
      if (rescue.length) {
        const hash = [...p.slug].reduce((a, c) => a + c.charCodeAt(0), 0);
        const rp = findPost(rescue[hash % rescue.length]);
        if (rp) picks.push(rp);
      }
      return picks;
    };
    const hub = [...new Set(PILLAR_HUBS[p.slug] ?? [])].map((s) => findPost(s)).filter((x): x is BlogPost => !!x);
    return (
      <article className="min-h-screen bg-white">
        <GtChrome current="/blog" />
        <GtPost
          p={p}
          sections={sections}
          faq={faq}
          service={service}
          related={related}
          silo={silo}
          nearbyDistricts={nearbyDistricts}
          intro={intro}
          lk={(t) => withBold(t, (x) => linkifyParagraph(x, linkIndex, linkCtx))}
          guideLinks={guideLinks}
          siblings={siblings}
          hub={hub}
          updatedLabel={`Güncelleme: ${updatedLabel}`}
          dateIso={p.updated ?? p.published}
        />
        <SiteFooter />
      </article>
    );
  }

  return (
    <article className={`sp-light min-h-screen bg-background pb-24 ${isBoschEditorial ? "bosch-editorial" : ""}`}>
      <ReadingProgress />

      <GtChrome current="/blog" />

      <div className={`mx-auto grid gap-x-12 px-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-6 ${isBoschEditorial ? "max-w-[1180px]" : "max-w-5xl"}`}>
        {/* ---------- Main reading column ---------- */}
        <main className="min-w-0">
          <nav className={`${isBoschEditorial ? "pt-7 sm:pt-9" : "pt-5"} text-[11px] text-muted-foreground`} aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link to="/" className="inline-flex items-center gap-1 hover:text-foreground">{isBoschEditorial && <Home className="h-3.5 w-3.5" />} Ana Sayfa</Link></li>
              <li>›</li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              <li>›</li>
              <li className="font-semibold text-foreground">{p.category}</li>
            </ol>
          </nav>

          {/* Title block */}
          <div className={`${isBoschEditorial ? "bosch-title-block max-w-[880px] pt-7" : "max-w-[720px] pt-5"}`}>
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em]">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-red/15 px-2.5 py-1 text-brand-red">
                <BookOpen className="h-3 w-3" /> {p.category}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" /> {p.readMin} dk okuma
              </span>
            </div>

            <h1 className={`${isBoschEditorial ? "bosch-headline mt-5 text-[38px] leading-[1.03] sm:text-[54px] lg:text-[64px]" : "mt-4 text-[28px] leading-[1.15] sm:text-[34px]"} font-extrabold tracking-tight`}>
              {p.title}
            </h1>

            {isBoschEditorial && <p className="mt-4 max-w-[680px] text-[18px] leading-snug text-muted-foreground sm:text-[23px]">Reset tuşu nerede, modele göre nasıl uygulanır ve hangi durumda kesinlikle durmalısınız?</p>}

            <div className={`${isBoschEditorial ? "bosch-author mt-6 grid grid-cols-[auto_minmax(0,1fr)] sm:grid-cols-[auto_minmax(0,1fr)_auto_auto]" : "mt-4 flex"} items-center gap-3 border-y border-border py-3`}>
              <img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} className={`${isBoschEditorial ? "h-12 w-12" : "h-9 w-9"} rounded-full object-cover`} />
              <div className="leading-tight">
                <div className="text-[12px] font-bold">Gölge Tesisat Ekibi</div>
                <div className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  <time dateTime={p.updated ?? p.published}>Güncelleme: {updatedLabel}</time>
                </div>
              </div>
              {isBoschEditorial && <span className="hidden items-center gap-1.5 border-l border-border pl-4 text-[12px] font-semibold text-muted-foreground sm:flex"><Clock className="h-4 w-4 text-brand-red" /> {p.readMin} dk okuma</span>}
              {isBoschEditorial && <span className="hidden items-center gap-1.5 border-l border-border pl-4 text-[12px] font-semibold text-muted-foreground sm:flex"><BookOpen className="h-4 w-4 text-brand-red" /> {p.category}</span>}
            </div>
          </div>

          {/* Featured image (hero / LCP) */}
          {p.featuredImage && (
            <figure className={`${isBoschEditorial ? "bosch-hero mt-5" : "mt-6"}`}>
              <div className={`${isBoschEditorial ? "rounded-[6px] sm:rounded-xl" : "rounded-2xl"} overflow-hidden border border-border shadow-2xl shadow-black/30`}>
                <img
                  src={p.featuredImage.src}
                  alt={p.featuredImage.alt || `${p.keyword} — Gölge Tesisat`}
                  width={1280}
                  height={720}
                  fetchPriority="high"
                  decoding="async"
                  className={`${isBoschEditorial ? "aspect-[4/3] sm:aspect-[16/9]" : ""} w-full object-cover`}
                />
              </div>
              {p.featuredImage.caption && (
                <figcaption className="mt-2 px-1 text-[11px] italic text-muted-foreground">{p.featuredImage.caption}</figcaption>
              )}
            </figure>
          )}

          {/* Lead / intro with drop cap */}
          <p className={`${isBoschEditorial ? "bosch-intro mt-7 max-w-[860px] text-[17px] sm:text-[19px]" : "mt-6 max-w-[720px] text-[16.5px]"} leading-[1.75] text-foreground/90 first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-[52px] first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-brand-red`}>
            {(() => { const n = linkifyParagraph(p.intro || p.excerpt || "", linkIndex, introCtx); linkCtx.budget.left -= 1 - introCtx.budget.left; return n; })()}
          </p>

          {/* Quick answer — the gist up front for impatient/mobile readers */}
          {p.intro && p.excerpt && p.excerpt.trim() !== p.intro.trim() && (
            <div className="mt-5 max-w-[720px] rounded-xl border border-brand-red/30 bg-brand-red/5 px-4 py-3.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-red">
                <Check className="h-3.5 w-3.5" /> Kısa cevap
              </div>
              <p className="mt-1.5 text-[14px] font-semibold leading-relaxed text-foreground/90">{p.excerpt}</p>
            </div>
          )}

          {/* Spoke → pillar / secondary → canonical link (IL-7, IL-11) */}
          {(() => {
            const canon = CANONICAL_TARGET[p.slug] ? findPost(CANONICAL_TARGET[p.slug]) : undefined;
            const pillarSlug = Object.keys(PILLAR_HUBS).find((k) => k !== p.slug && PILLAR_HUBS[k].includes(p.slug));
            const pillar = pillarSlug ? findPost(pillarSlug) : undefined;
            const items = [canon && { post: canon, label: "Bu sorunun ayrıntılı rehberi" }, pillar && pillar.slug !== canon?.slug && { post: pillar, label: "Konunun ana rehberi" }].filter(Boolean) as { post: BlogPost; label: string }[];
            if (items.length === 0) return null;
            items.forEach((i) => linkCtx.used.add(i.post.slug));
            return (
              <div className="mt-4 max-w-[720px] space-y-1 border-l-2 border-brand-red/60 pl-3 text-[13.5px] text-muted-foreground">
                {items.map((i) => (
                  <p key={i.post.slug}>
                    {i.label}:{" "}
                    <Link to="/blog/$slug" params={{ slug: i.post.slug }} className="font-semibold text-foreground underline decoration-brand-red/40 underline-offset-2 hover:text-brand-red">
                      {i.post.title}
                    </Link>
                  </p>
                ))}
              </div>
            );
          })()}


          {/* Early contextual internal link — passes authority from high-traffic guides to the money page */}
          {service && p.slug === "su-patlamasi-ilk-mudahale" ? (
            <div className="mt-5 max-w-[720px] rounded-xl border-2 border-brand-red bg-brand-red px-4 py-4 shadow-lg shadow-brand-red/20">
              <p className="text-[15px] font-extrabold leading-snug text-white">
                Şu anda su akıtıyor musunuz? Ana vanayı kapattıktan sonra hemen arayın — acil müdahale, 7/24.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href={PHONE_HREF} className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[14px] font-extrabold text-brand-red transition-transform hover:scale-[1.02]">
                  <Phone className="h-4 w-4" /> Hemen Ara: {PHONE}
                </a>
                <a href={`https://wa.me/905338960503`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-white/25">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          ) : service ? (
            <Link
              to="/hizmet/$slug"
              params={{ slug: service.slug }}
              className="mt-5 flex max-w-[720px] items-center justify-between gap-3 rounded-xl border border-brand-red/30 bg-brand-red/5 px-4 py-3 transition-colors hover:border-brand-red/60"
            >
              <span className="text-[13.5px] leading-snug">
                <span className="font-bold text-brand-red">Usta mı lazım?</span>{" "}
                İstanbul'da profesyonel <strong>{service.name}</strong> hizmetimiz — ücretsiz keşif, 7/24.
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-red" />
            </Link>
          ) : null}

          {/* Mobile table of contents */}
          <details className={`group mt-6 border border-border bg-surface lg:hidden ${isBoschEditorial ? "rounded-[6px]" : "rounded-xl"}`}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-muted-foreground [&::-webkit-details-marker]:hidden">
              İçindekiler
              <ChevronDown className="h-4 w-4 text-brand-red transition-transform group-open:rotate-180" />
            </summary>
            <ol className="space-y-1 px-4 pb-4 text-[13px]">
              {tocItems.map((it, i) => (
                <li key={it.id}>
                  <a href={`#${it.id}`} className="flex gap-2 py-0.5 text-muted-foreground hover:text-foreground">
                    <span className="font-bold text-brand-red">{i + 1}.</span> {it.label}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          {/* Body sections */}
          {sections.map((sec, i) => (
            <section key={sec.heading} id={`sec-${i}`} className={`${isBoschEditorial ? "bosch-section pt-12 sm:pt-16" : "pt-10"} scroll-mt-24`}>
              {isBoschEditorial && <div className="mb-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> // BÖLÜM · {String(i + 1).padStart(2, "0")}</div>}
              <h2 className={`${isBoschEditorial ? "text-[30px] sm:text-[42px]" : "text-[21px]"} flex items-start gap-3 font-extrabold leading-[1.05] tracking-tight`}>
                <span className={`${isBoschEditorial ? "hidden" : "flex"} mt-0.5 h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-[12px] font-black text-brand-red`}>
                  {i + 1}
                </span>
                <span>{sec.heading}</span>
              </h2>

              <div className={`${isBoschEditorial ? "max-w-[860px]" : "max-w-[720px]"} mt-4 space-y-3.5`}>
                {sectionParagraphs(sec).map((para, pi) => (
                  <p key={pi} className={`${isBoschEditorial ? "text-[16px] sm:text-[17px]" : "text-[15.5px]"} leading-[1.78] text-foreground/80`}>{linkifyParagraph(para, linkIndex, linkCtx)}</p>
                ))}
              </div>

              {sectionBullets(sec).length > 0 && (
                <ul className={`${isBoschEditorial ? "bosch-check-grid gap-px overflow-hidden rounded-[6px] border border-border bg-border" : "gap-2"} mt-4 grid sm:grid-cols-2`}>
                  {sectionBullets(sec).map((b, bi) => (
                    <li
                      key={b}
                      className={`flex items-start gap-2.5 bg-surface p-3.5 scroll-mt-24 transition-colors hover:border-brand-red/40 ${isBoschEditorial ? "" : "rounded-xl border border-border"}`}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/15">
                        <Check className="h-3 w-3 text-brand-red" />
                      </span>
                      <span className="text-[13.5px] leading-snug">{linkifyParagraph(b, linkIndex, linkCtx)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Inline figure */}
              {sec.image && (
                <figure className={`${isBoschEditorial ? "bosch-inline-figure mt-7" : "mt-5"}`}>
                  <div className={`${isBoschEditorial ? "rounded-[6px]" : "rounded-xl"} overflow-hidden border border-border bg-surface`}>
                    <img
                      src={sec.image.src}
                      alt={sec.image.alt || `${p.keyword} — ${sec.heading}`}
                      width={1280}
                      height={720}
                      loading="lazy"
                      className={`${isBoschEditorial ? "aspect-[16/10] sm:aspect-[16/8]" : ""} w-full object-cover`}
                    />
                  </div>
                  {sec.image.caption && (
                    <figcaption className="mt-2 px-1 text-[11px] italic text-muted-foreground">{sec.image.caption}</figcaption>
                  )}
                </figure>
              )}

              {/* Comparison / spec table */}
              {sec.table && tableHeaders(sec).length > 0 && tableRows(sec).length > 0 && (
                <figure className={`${isBoschEditorial ? "bosch-table rounded-[6px]" : "rounded-xl"} mt-5 overflow-x-auto border border-border`}>
                  <table className="w-full border-collapse text-left text-[12.5px]">
                    <thead>
                      <tr className="bg-surface-2">
                        {tableHeaders(sec).map((h) => (
                          <th key={h} className="border-b border-border px-3.5 py-2.5 font-extrabold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows(sec).map((row, ri) => (
                        <tr key={ri} className="odd:bg-surface">
                          {row.map((cell, ci) => (
                            <td key={ci} className={`border-b border-border px-3.5 py-2.5 align-top ${ci === 0 ? "font-semibold text-foreground/90" : "text-muted-foreground"}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sec.table.caption && (
                    <figcaption className="border-t border-border bg-surface px-3.5 py-2 text-[11px] italic text-muted-foreground">{sec.table.caption}</figcaption>
                  )}
                </figure>
              )}

              {/* Simple bar chart */}
              {sec.chart && (() => {
                const bars = chartBars(sec.chart);
                if (bars.length === 0) return null;
                const max = Math.max(...bars.map((b) => b.value)) || 1;
                return (
                  <figure className="mt-5 rounded-xl border border-border bg-surface p-4">
                    {sec.chart.title && <figcaption className="mb-3 text-[12.5px] font-extrabold">{sec.chart.title}</figcaption>}
                    <div className="space-y-3">
                      {bars.map((b) => (
                        <div key={b.label}>
                          <div className="flex items-center justify-between text-[11.5px]">
                            <span className="font-semibold">{b.label}</span>
                            <span className="font-extrabold text-brand-red">{b.value}{sec.chart?.unit}</span>
                          </div>
                          <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
                            <div className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-red/70" style={{ width: `${(b.value / max) * 100}%` }} />
                          </div>
                          {b.note && <div className="mt-0.5 text-[10px] text-muted-foreground">{b.note}</div>}
                        </div>
                      ))}
                    </div>
                  </figure>
                );
              })()}


              <BlogRichBlocks section={sec} />

              {/* Mid-article conversion banner — after the 2nd section, where
                  readers who came with an urgent problem are ready to act */}
              {i === 1 && sections.length > 3 && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-brand-red/30 bg-brand-red/5 p-5">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-red">
                    <Phone className="h-3.5 w-3.5" /> Sorun devam mı ediyor?
                  </div>
                  <p className="mt-2 text-[14.5px] font-bold leading-snug">
                    Kendiniz uğraşmayın — ustamız ortalama {service?.responseMin ?? 45} dakikada kapınızda, keşif ücretsiz.
                  </p>
                  <div className="mt-3.5 grid grid-cols-2 gap-2">
                    <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-red py-2.5 text-[12.5px] font-extrabold text-white transition-transform hover:scale-[1.02]">
                      <Phone className="h-3.5 w-3.5" /> HEMEN ARA
                    </a>
                    <a href={WA_HREF} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2.5 text-[12.5px] font-extrabold text-white transition-transform hover:scale-[1.02]">
                      <MessageCircle className="h-3.5 w-3.5" /> WHATSAPP
                    </a>
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Conversion CTA — link down to matching service hub */}
          {service && (
            <section id="post-cta" className="mt-12 overflow-hidden rounded-2xl bg-foreground p-6 text-background shadow-xl shadow-black/20">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-red">
                <ShieldCheck className="h-3.5 w-3.5" /> Profesyonel destek
              </div>
              <div className="mt-2 text-[20px] font-extrabold leading-tight">
                {service.name} için profesyonel destek alın
              </div>
              <p className="mt-1.5 text-[12.5px] leading-relaxed opacity-80">
                Kendiniz çözemediğiniz durumlarda 7/24 açık hattımızı arayın; ortalama {service.responseMin} dakikada
                kapınızdayız, keşif ücretsiz.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-red py-3 text-[13px] font-extrabold text-white transition-transform hover:scale-[1.02]">
                  <Phone className="h-4 w-4" /> HEMEN ARA
                </a>
                <a href={WA_HREF} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-3 text-[13px] font-extrabold text-white transition-transform hover:scale-[1.02]">
                  <MessageCircle className="h-4 w-4" /> WHATSAPP
                </a>
              </div>
              <Link to="/hizmet/$slug" params={{ slug: service.slug }} className="mt-3 inline-flex items-center gap-1 text-[12px] font-bold text-background/90 underline">
                {service.name} hizmeti hakkında detaylı bilgi <ArrowRight className="h-3 w-3" />
              </Link>
            </section>
          )}

          {/* Sibling links — each spoke links its next two cluster neighbours, so
              every guide gets ≥2 in-cluster links (IL-12…IL-15) */}
          {(() => {
            const pillarSlug = Object.keys(PILLAR_HUBS).find((k) => k !== p.slug && PILLAR_HUBS[k].includes(p.slug));
            if (!pillarSlug) return null;
            const ring = PILLAR_HUBS[pillarSlug].filter((s) => !CANONICAL_TARGET[s] && !PILLAR_HUBS[s]);
            const i = ring.indexOf(p.slug);
            const picks: BlogPost[] = [];
            for (let k = 1; k < ring.length && picks.length < 2; k++) {
              const s = ring[((i < 0 ? 0 : i) + k) % ring.length];
              if (s === p.slug || linkCtx.used.has(s)) continue;
              const post = findPost(s);
              if (post) picks.push(post);
            }
            // High-impression, under-linked guide of this cluster (IL-3 boost list) rides along.
            const boost = CLUSTER_BOOST[pillarSlug];
            if (boost && boost !== p.slug && !linkCtx.used.has(boost) && !picks.some((x) => x.slug === boost)) {
              const bp = findPost(boost);
              if (bp) picks.push(bp);
            }
            // IL-16: one rotating under-linked boost guide from this cluster.
            const rescue = PILLAR_HUBS[pillarSlug].filter((s) => BOOST_RESCUE.has(s) && s !== p.slug && !linkCtx.used.has(s) && !picks.some((x) => x.slug === s));
            if (rescue.length) {
              const hash = [...p.slug].reduce((a, c) => a + c.charCodeAt(0), 0);
              const rp = findPost(rescue[hash % rescue.length]);
              if (rp) picks.push(rp);
            }
            if (picks.length === 0) return null;
            return (
              <aside className="mt-10 rounded-xl border border-border bg-surface p-4">
                <p className="text-[12px] font-bold uppercase tracking-wide text-brand-red">Bununla ilgili</p>
                <ul className="mt-2 space-y-1.5">
                  {picks.map((h) => (
                    <li key={h.slug}>
                      <Link to="/blog/$slug" params={{ slug: h.slug }} className="text-[14px] font-semibold text-foreground underline decoration-brand-red/40 underline-offset-2 hover:text-brand-red">
                        {h.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            );
          })()}

          {/* Pillar hub — every guide in this topic cluster (IL-10) */}
          {(() => {
            const hub = [...new Set(PILLAR_HUBS[p.slug] ?? [])].map((s) => findPost(s)).filter((x): x is BlogPost => !!x);
            if (hub.length === 0) return null;
            return (
              <section id="konu-rehberleri" className="scroll-mt-24 pt-12">
                <h2 className="text-[21px] font-extrabold tracking-tight">Bu Konudaki Tüm Rehberler</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">{hub.length} rehber · aradığınız soruna doğrudan gidin</p>
                <ul className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {hub.map((h) => (
                    <li key={h.slug}>
                      <Link to="/blog/$slug" params={{ slug: h.slug }} className="flex items-start gap-1.5 text-[13.5px] leading-snug text-foreground/80 transition-colors hover:text-brand-red">
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />
                        <span>{h.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })()}

          {/* FAQ */}
          <section id="sss" className="scroll-mt-24 pt-12">
            <h2 className="text-[21px] font-extrabold tracking-tight">Sıkça Sorulan Sorular</h2>
            <div className="mt-4 space-y-2.5">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-surface transition-colors open:border-brand-red/40 open:bg-surface-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[14px] font-bold leading-snug">{f.q}</h3>
                    <ChevronDown className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-4 pb-4 text-[13px] leading-relaxed text-muted-foreground">{linkifyParagraph(f.a, linkIndex, linkCtx)}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Striking-distance local links (GSC page-2 district targets) */}
          <section className="pt-12">
            <h2 className="text-[17px] font-extrabold tracking-tight">İstanbul'da Yakınınızdaki Tesisatçı</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { slug: "bagcilar", label: "Bağcılar tesisatçı" },
                { slug: "cekmekoy", label: "Çekmeköy tesisatçı" },
                { slug: "bahcelievler", label: "Bahçelievler tesisatçı" },
                { slug: "gaziosmanpasa", label: "Gaziosmanpaşa tesisatçı" },
                { slug: "kadikoy", label: "Kadıköy tesisatçı" },
                { slug: "atasehir", label: "Ataşehir tesisatçı" },
              ].map((d) => (
                <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-semibold hover:border-brand-red hover:text-brand-red">
                  {d.label}
                </Link>
              ))}
              {(service ? [
                { slug: "bagcilar", name: "Bağcılar" },
                { slug: "cekmekoy", name: "Çekmeköy" },
              ] : []).map((d) => (
                <Link key={`svc-${d.slug}`} to="/tesisatci/$slug/$service" params={{ slug: d.slug, service: service!.slug }} className="rounded-full border border-border bg-surface px-3 py-1.5 text-[13px] font-semibold hover:border-brand-red hover:text-brand-red">
                  {d.name} {service!.name.toLocaleLowerCase("tr")}
                </Link>
              ))}
            </div>
          </section>

          {/* Related posts */}
          <section className="pt-12">
            <h2 className="text-[17px] font-extrabold tracking-tight">İlgili Rehberler</h2>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group flex items-start justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-brand-red"
                >
                  <span className="text-[13px] font-bold leading-snug group-hover:text-brand-red">{r.title}</span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
                </Link>
              ))}
            </div>
            {(silo.prev || silo.next) && (
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {[silo.prev, silo.next].filter((x): x is BlogPost => !!x && !related.some((r) => r.slug === x.slug)).map((s, k) => (
                  <Link
                    key={s.slug}
                    to="/blog/$slug"
                    params={{ slug: s.slug }}
                    className="rounded-xl border border-dashed border-border px-4 py-3 transition-colors hover:border-brand-red"
                  >
                    <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-muted-foreground">{k === 0 && silo.prev?.slug === s.slug ? "Önceki rehber" : "Sonraki rehber"}</span>
                    <span className="text-[13px] font-bold leading-snug hover:text-brand-red">{s.title}</span>
                  </Link>
                ))}
              </div>
            )}
            <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-[11.5px] font-semibold text-brand-red">
              Tüm yazılar <ArrowRight className="h-3 w-3" />
            </Link>
          </section>

          {/* Local intent — link to nearby district hubs for this service */}
          {service && (
            <section className="pt-12">
              <h2 className="text-[17px] font-extrabold tracking-tight">{service.shortName} Hizmeti Verdiğimiz Bölgeler</h2>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {nearbyDistricts.map((dst) => (
                  <Link
                    key={dst.slug}
                    to="/tesisatci/$slug/$service"
                    params={{ slug: dst.slug, service: service.slug }}
                    className="flex items-center justify-between rounded-xl border border-border bg-surface px-3.5 py-2.5 text-[12px] font-bold transition-colors hover:border-brand-red"
                  >
                    <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-red" /> {dst.name} {service.shortName}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-brand-red" />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ---------- Sticky desktop sidebar ---------- */}
        <aside className="hidden pt-5 lg:block">
          <div className="sticky top-24 space-y-5">
            <ArticleToc items={tocItems} />
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red">7/24 Destek</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                Aklınıza takılan bir şey mi var? Hemen arayın, keşif ücretsiz.
              </p>
              <a href={PHONE_HREF} className="mt-3 flex items-center justify-center gap-1.5 rounded-lg bg-brand-red py-2.5 text-[12.5px] font-extrabold text-white transition-transform hover:scale-[1.02]">
                <Phone className="h-3.5 w-3.5" /> {PHONE}
              </a>
            </div>
          </div>
        </aside>
      </div>

      {!isBoschEditorial && <UrgencyCTA />}
      <SiteFooter />
    </article>
  );
}
