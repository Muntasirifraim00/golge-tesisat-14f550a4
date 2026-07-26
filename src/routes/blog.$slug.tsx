import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { Phone, MessageCircle, ArrowRight, Clock, Check, ShieldCheck, BookOpen, MapPin, ChevronDown, CalendarDays, ArrowUpRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { UrgencyCTA } from "@/components/UrgencyCTA";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleToc, type TocItem } from "@/components/ArticleToc";
import { relatedPostsFor, findPost, howToFromPost, INLINE_LINK_INDEX, type BlogPost, type InlinePhrase } from "@/data/blog";
import { findInlineMatch } from "@/lib/inline-linker";
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
  "petekler-nasil-acilir-alttan-isitmayan": "petekler-nasil-acilir",
  "tuvalet-tikanikligi-evde-adim-adim": "tuvalet-tikanikligi-nasil-acilir",
  "tuvalet-tikanikligi-evde-guvenli-yontemler": "tuvalet-tikanikligi-nasil-acilir",
  "kombi-atesleme-yapmiyor-cozumu": "kombi-atesleme-yapmiyor",
};

// ---------------------------------------------------------------------------
// In-content auto-linker (Internal Linking — Steps 1 & 7)
// ---------------------------------------------------------------------------
// Deep-links the first natural mention of another guide's keyword inside body
// prose. Word-boundary aware (Turkish letters included), one link per phrase,
// one per target, capped per article so copy stays readable and unspammy.
// The matching core (incl. Turkish-safe lowercasing) lives in inline-linker.ts
// so it is unit-tested independently of React/router rendering.
type LinkifyCtx = { currentSlug: string; used: Set<string>; budget: { left: number } };

function linkifyParagraph(text: string, index: InlinePhrase[], ctx: LinkifyCtx): ReactNode {
  if (ctx.budget.left <= 0) return text;
  const best = findInlineMatch(
    text,
    index,
    (slug) => slug === ctx.currentSlug || ctx.used.has(slug),
  );
  if (!best) return text;
  ctx.used.add(best.slug);
  ctx.budget.left -= 1;
  const head = text.slice(0, best.start);
  const match = text.slice(best.start, best.start + best.len);
  const tail = text.slice(best.start + best.len);
  return (
    <>
      {head}
      <Link
        to="/blog/$slug"
        params={{ slug: best.slug }}
        className="font-semibold text-brand-red underline decoration-brand-red/40 underline-offset-2 transition-colors hover:decoration-brand-red"
      >
        {match}
      </Link>
      {linkifyParagraph(tail, index, ctx)}
    </>
  );
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
            datePublished: p.published,
            dateModified: p.updated ?? p.published,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            image: ogImage,
            author: { "@type": "Organization", name: "Gölge Tesisat" },
            publisher: {
              "@type": "Organization",
              name: "Gölge Tesisat",
              logo: { "@type": "ImageObject", url: "https://golgetesisat.com/og-image.jpg" },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faq.map((f: { q: string; a: string }) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        ...(() => {
          const howTo = howToFromPost(p);
          if (!howTo) return [];
          return [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: howTo.name,
                description: p.metaDescription,
                image: ogImage,
                totalTime: `PT${p.readMin}M`,
                step: howTo.steps.map((st, i) => ({
                  "@type": "HowToStep",
                  position: i + 1,
                  name: st.name,
                  text: st.text,
                  url: `${url}#adim-${i + 1}`,
                })),
              }),
            },
          ];
        })(),
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
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post: p } = Route.useLoaderData() as { post: BlogPost };
  const service = findService(p.serviceSlug);
  const related = relatedPostsFor(p, 4);
  // Locally relevant districts to deep-link from the guide (intent → local money
  // page). Rotated deterministically by slug so all 27 districts receive inlinks
  // across the blog rather than only the first four (Internal Linking — Step 6).
  const districtStart = [...p.slug].reduce((a, c) => a + c.charCodeAt(0), 0) % DISTRICTS.length;
  const nearbyDistricts = Array.from({ length: 4 }, (_, k) => DISTRICTS[(districtStart + k) % DISTRICTS.length]);
  // Per-article budget for the in-content auto-linker (shared across intro,
  // body paragraphs, bullet lists and FAQ answers).
  const linkCtx: LinkifyCtx = { currentSlug: p.slug, used: new Set<string>(), budget: { left: 9 } };
  // Heading of the section the HowTo schema draws its steps from, so on-page
  // anchors (#adim-N) line up with the HowToStep urls emitted in head().
  const howTo = howToFromPost(p);
  const stepHeading = howTo
    ? (p.sections.find((s) => /ad[ıi]m|aşama/i.test(s.heading) && s.bullets && s.bullets.length > 1) ??
        p.sections.find((s) => s.bullets && s.bullets.length > 2))?.heading
    : undefined;

  const updatedLabel = new Date(p.updated ?? p.published).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Build the table of contents from section headings + the FAQ anchor.
  const tocItems: TocItem[] = [
    ...p.sections.map((s, i) => ({ id: `sec-${i}`, label: s.heading })),
    { id: "sss", label: "Sıkça Sorulan Sorular" },
  ];

  return (
    <article className="min-h-screen bg-background pb-24">
      <ReadingProgress />

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoImg} alt="Gölge Tesisat" width={36} height={36} className="h-9 w-9 rounded-lg object-contain" />
          <div className="leading-tight">
            <div className="text-[14px] font-extrabold tracking-wide">GÖLGE TESİSAT</div>
            <div className="text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</div>
          </div>
        </Link>
        <a href={PHONE_HREF} className="flex items-center gap-1.5 rounded-lg bg-brand-red px-3 py-2 text-[12px] font-bold text-white transition-transform hover:scale-105">
          <Phone className="h-3.5 w-3.5" /> Ara
        </a>
      </header>

      <div className="mx-auto grid max-w-5xl gap-x-12 px-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:px-6">
        {/* ---------- Main reading column ---------- */}
        <main className="min-w-0">
          <nav className="pt-5 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link to="/" className="hover:text-foreground">Ana Sayfa</Link></li>
              <li>›</li>
              <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              <li>›</li>
              <li className="font-semibold text-foreground">{p.category}</li>
            </ol>
          </nav>

          {/* Title block */}
          <div className="max-w-[720px] pt-5">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em]">
              <span className="inline-flex items-center gap-1 rounded-full bg-brand-red/15 px-2.5 py-1 text-brand-red">
                <BookOpen className="h-3 w-3" /> {p.category}
              </span>
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" /> {p.readMin} dk okuma
              </span>
            </div>

            <h1 className="mt-4 text-[28px] font-extrabold leading-[1.15] tracking-tight sm:text-[34px]">
              {p.title}
            </h1>

            <div className="mt-4 flex items-center gap-3 border-y border-border py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red/15 text-[11px] font-black text-brand-red">
                GT
              </div>
              <div className="leading-tight">
                <div className="text-[12px] font-bold">Gölge Tesisat Ekibi</div>
                <div className="flex items-center gap-1 text-[10.5px] text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  <time dateTime={p.updated ?? p.published}>Güncelleme: {updatedLabel}</time>
                </div>
              </div>
            </div>
          </div>

          {/* Featured image (hero / LCP) */}
          {p.featuredImage && (
            <figure className="mt-6">
              <div className="overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/30">
                <img
                  src={p.featuredImage.src}
                  alt={p.featuredImage.alt}
                  width={1280}
                  height={720}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full object-cover"
                />
              </div>
              {p.featuredImage.caption && (
                <figcaption className="mt-2 px-1 text-[11px] italic text-muted-foreground">{p.featuredImage.caption}</figcaption>
              )}
            </figure>
          )}

          {/* Lead / intro with drop cap */}
          <p className="mt-6 max-w-[720px] text-[16.5px] leading-[1.75] text-foreground/90 first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-[52px] first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-brand-red">
            {linkifyParagraph(p.intro, INLINE_LINK_INDEX, linkCtx)}
          </p>

          {/* Mobile table of contents */}
          <details className="group mt-6 rounded-xl border border-border bg-surface lg:hidden">
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
          {p.sections.map((sec, i) => (
            <section key={sec.heading} id={`sec-${i}`} className="scroll-mt-24 pt-10">
              <h2 className="flex items-start gap-3 text-[21px] font-extrabold leading-tight tracking-tight">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-[12px] font-black text-brand-red">
                  {i + 1}
                </span>
                <span>{sec.heading}</span>
              </h2>

              <div className="mt-3 max-w-[720px] space-y-3.5">
                {sec.paragraphs.map((para, pi) => (
                  <p key={pi} className="text-[15.5px] leading-[1.78] text-foreground/80">{linkifyParagraph(para, INLINE_LINK_INDEX, linkCtx)}</p>
                ))}
              </div>

              {sec.bullets && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {sec.bullets.map((b, bi) => (
                    <li
                      key={b}
                      id={sec.heading === stepHeading ? `adim-${bi + 1}` : undefined}
                      className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-3.5 scroll-mt-24 transition-colors hover:border-brand-red/40"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red/15">
                        <Check className="h-3 w-3 text-brand-red" />
                      </span>
                      <span className="text-[13.5px] leading-snug">{linkifyParagraph(b, INLINE_LINK_INDEX, linkCtx)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Inline figure */}
              {sec.image && (
                <figure className="mt-5">
                  <div className="overflow-hidden rounded-xl border border-border bg-surface">
                    <img
                      src={sec.image.src}
                      alt={sec.image.alt}
                      width={1280}
                      height={720}
                      loading="lazy"
                      className="w-full object-cover"
                    />
                  </div>
                  {sec.image.caption && (
                    <figcaption className="mt-2 px-1 text-[11px] italic text-muted-foreground">{sec.image.caption}</figcaption>
                  )}
                </figure>
              )}

              {/* Comparison / spec table */}
              {sec.table && (
                <figure className="mt-5 overflow-x-auto rounded-xl border border-border">
                  <table className="w-full border-collapse text-left text-[12.5px]">
                    <thead>
                      <tr className="bg-surface-2">
                        {sec.table.headers.map((h) => (
                          <th key={h} className="border-b border-border px-3.5 py-2.5 font-extrabold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, ri) => (
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
              {sec.chart && (
                <figure className="mt-5 rounded-xl border border-border bg-surface p-4">
                  {sec.chart.title && <figcaption className="mb-3 text-[12.5px] font-extrabold">{sec.chart.title}</figcaption>}
                  <div className="space-y-3">
                    {(() => {
                      const max = Math.max(...sec.chart.bars.map((b) => b.value)) || 1;
                      return sec.chart.bars.map((b) => (
                        <div key={b.label}>
                          <div className="flex items-center justify-between text-[11.5px]">
                            <span className="font-semibold">{b.label}</span>
                            <span className="font-extrabold text-brand-red">{b.value}{sec.chart!.unit}</span>
                          </div>
                          <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
                            <div className="h-full rounded-full bg-gradient-to-r from-brand-red to-brand-red/70" style={{ width: `${(b.value / max) * 100}%` }} />
                          </div>
                          {b.note && <div className="mt-0.5 text-[10px] text-muted-foreground">{b.note}</div>}
                        </div>
                      ));
                    })()}
                  </div>
                </figure>
              )}


              <BlogRichBlocks section={sec} />
            </section>
          ))}

          {/* Conversion CTA — link down to matching service hub */}
          {service && (
            <section className="mt-12 overflow-hidden rounded-2xl bg-foreground p-6 text-background shadow-xl shadow-black/20">
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

          {/* FAQ */}
          <section id="sss" className="scroll-mt-24 pt-12">
            <h2 className="text-[21px] font-extrabold tracking-tight">Sıkça Sorulan Sorular</h2>
            <div className="mt-4 space-y-2.5">
              {p.faq.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-surface transition-colors open:border-brand-red/40 open:bg-surface-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[14px] font-bold leading-snug">{f.q}</h3>
                    <ChevronDown className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-4 pb-4 text-[13px] leading-relaxed text-muted-foreground">{linkifyParagraph(f.a, INLINE_LINK_INDEX, linkCtx)}</p>
                </details>
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

      <UrgencyCTA />
      <SiteFooter />
      <StickyCallBar />
    </article>
  );
}
