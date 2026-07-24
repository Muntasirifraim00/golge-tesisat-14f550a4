import { createFileRoute, Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.jpg";
import { useMemo, useState } from "react";
import { Phone, ArrowRight, BookOpen, Clock, Search, X } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { BLOG_POSTS, type BlogPost } from "@/data/blog";
import { listGeneratedPosts } from "@/lib/seo-writer/blog-public.functions";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

// Turkish-insensitive normalizer: folds ı/i/İ/I, ş, ğ, ü, ö, ç and diacritics
function normalizeTr(s?: string): string {
  if (!s) return "";
  return s
    .replace(/İ/g, "i")
    .replace(/I/g, "i")
    .replace(/ı/g, "i")
    .replace(/Ş/g, "s").replace(/ş/g, "s")
    .replace(/Ğ/g, "g").replace(/ğ/g, "g")
    .replace(/Ü/g, "u").replace(/ü/g, "u")
    .replace(/Ö/g, "o").replace(/ö/g, "o")
    .replace(/Ç/g, "c").replace(/ç/g, "c")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}


export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const { posts } = await listGeneratedPosts().catch(() => ({ posts: [] as BlogPost[] }));
    return { generated: posts };
  },
  head: () => {
    const title = "Tesisat Blog — Petek, Kombi Rehberleri | Gölge Tesisat";
    const desc =
      "Petek temizliği, kombi bakımı ve tıkanıklık açma hakkında uzman rehberler. Sık sorulan tesisat sorularına adım adım, güvenilir cevaplar.";
    const url = "https://golgetesisat.com/blog";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: "tesisat blog, petek temizliği, kombi bakımı, tıkanıklık açma, su kaçağı, su borusu patladı, acil tesisat" },
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
              { "@type": "ListItem", position: 2, name: "Blog", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Gölge Tesisat Blog",
            url,
            blogPost: BLOG_POSTS.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              datePublished: p.published,
              url: `https://golgetesisat.com/blog/${p.slug}`,
            })),
          }),
        },
      ],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { generated } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const allPosts = useMemo(() => {
    const staticSlugs = new Set(BLOG_POSTS.map((p) => p.slug));
    const extras = generated.filter((p: BlogPost) => !staticSlugs.has(p.slug));
    const combined = [...extras, ...BLOG_POSTS];
    // Sort by published date descending (newest first)
    return combined.sort((a, b) => {
      const dateA = a.published ? new Date(a.published).getTime() : 0;
      const dateB = b.published ? new Date(b.published).getTime() : 0;
      return dateB - dateA;
    });
  }, [generated]);
  const filtered = useMemo(() => {
    const q = normalizeTr(query);
    if (!q) return allPosts;
    return allPosts.filter((p) =>
      [p.title, p.excerpt, p.category, p.keyword].some((f) => normalizeTr(f).includes(q)),
    );
  }, [query, allPosts]);


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
        <a href={PHONE_HREF} className="flex items-center gap-1.5 rounded-lg bg-brand-red px-3 py-2 text-[12px] font-bold text-white">
          <Phone className="h-3.5 w-3.5" /> Ara
        </a>
      </header>

      <nav className="px-4 text-[11px] text-muted-foreground" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1">
          <li><Link to="/" className="hover:text-foreground">Ana Sayfa</Link></li>
          <li>›</li>
          <li className="font-semibold text-foreground">Blog</li>
        </ol>
      </nav>

      <main>
      <section className="px-4 pt-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 px-2.5 py-1 text-[10px] font-bold tracking-widest text-brand-red">
          <BookOpen className="h-3 w-3" /> TESİSAT REHBERLERİ
        </div>
        <h1 className="mt-3 text-[26px] font-extrabold leading-tight">Tesisat Blog</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Petek temizliğinden kombi bakımına, tıkanıklık açmadan su kaçağına kadar en çok merak edilen tesisat
          sorularına uzman ekibimizden adım adım, güvenilir cevaplar.
        </p>
      </section>

      <section className="px-4 pt-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Yazılarda ara..."
            aria-label="Blog yazılarında ara"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-9 text-[13px] outline-none shadow-sm transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 md:py-3 md:text-[14px]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Aramayı temizle"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {query && (
          <div className="mt-2 text-center text-[12px] text-muted-foreground md:text-[13px]">
            {filtered.length} sonuç bulundu
          </div>
        )}
      </section>

      <section className="px-4 pt-6 md:pt-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full rounded-2xl border border-border bg-surface p-8 text-center text-[13px] text-muted-foreground md:p-12">
              <Search className="mx-auto mb-3 h-8 w-8 opacity-50" />
              "{query}" için sonuç bulunamadı. <br />
              <span className="text-[12px]">Farklı bir arama terimi deneyin.</span>
            </p>
          ) : (
            filtered.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand-red hover:shadow-2xl hover:shadow-brand-red/10"
            >
              {p.featuredImage && (
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <img
                    src={p.featuredImage.src}
                    alt={p.featuredImage.alt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-red">
                    {p.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                    <Clock className="h-3 w-3" /> {p.readMin} dk
                  </span>
                </div>
                <h2 className="text-[16px] font-extrabold leading-tight transition-colors group-hover:text-brand-red md:text-[17px]">
                  {p.title}
                </h2>
                <p className="line-clamp-2 text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">
                  {p.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-bold text-brand-red transition-transform group-hover:gap-2">
                  Devamını oku <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
            ))
          )}
        </div>
      </section>
      </main>

      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}
