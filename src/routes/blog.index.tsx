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
        { name: "keywords", content: "tesisat blog, petek temizliği, kombi bakımı, tıkanıklık açma, su kaçağı" },
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
    return [...extras, ...BLOG_POSTS];
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
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-9 text-[13px] outline-none focus:border-brand-red"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Aramayı temizle"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      <section className="px-4 pt-4">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-xl border border-border bg-surface p-4 text-center text-[13px] text-muted-foreground">
              "{query}" için sonuç bulunamadı.
            </p>
          ) : (
            filtered.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="block overflow-hidden rounded-xl border border-border bg-surface hover:border-brand-red"
            >
              {p.featuredImage && (
                <img
                  src={p.featuredImage.src}
                  alt={p.featuredImage.alt}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red">
                  <span>{p.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {p.readMin} dk</span>
                </div>
                <h2 className="mt-2 text-[16px] font-extrabold leading-tight">{p.title}</h2>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-brand-red">
                  Devamını oku <ArrowRight className="h-3 w-3" />
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
