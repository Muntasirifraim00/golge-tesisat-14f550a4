import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarCheck, MessageCircle, Phone, Search, X } from "lucide-react";
import { GtPage, useReveal } from "@/components/gt/GtShell";
import { BUSINESS } from "@/data/business";
import { BLOG_POSTS, type BlogPost } from "@/data/blog";
import { listGeneratedPosts } from "@/lib/seo-writer/blog-public.functions";

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

// ---------- Topics: the raw categories are free-text, so group them for filtering ----------
type TopicKey = "su" | "tikaniklik" | "kombi" | "isitma" | "dogalgaz" | "banyo" | "diger";
const TOPICS: Record<TopicKey, { label: string; color: string }> = {
  su: { label: "Su & Kaçak", color: "#2D7DD2" },
  tikaniklik: { label: "Tıkanıklık & Gider", color: "#8A6A3A" },
  kombi: { label: "Kombi", color: "#D50A0A" },
  isitma: { label: "Petek & Isıtma", color: "#FF7A1A" },
  dogalgaz: { label: "Doğalgaz", color: "#F5B400" },
  banyo: { label: "Banyo & Musluk", color: "#1D8A4E" },
  diger: { label: "Diğer", color: "#6E5AD2" },
};
function topicOf(p: BlogPost): TopicKey {
  const c = normalizeTr(p.category + " " + p.title);
  if (/dogalgaz/.test(c)) return "dogalgaz";
  if (/tikanik|gider|kanal|lagim/.test(c)) return "tikaniklik";
  if (/banyo|vitrifiye|klozet|tuvalet|dusakabin|musluk|batarya|taharet|lavabo/.test(c)) return "banyo";
  if (/kombi/.test(c)) return "kombi";
  if (/petek|kalorifer|radyator|isitma|sicak su/.test(c)) return "isitma";
  if (/su |su$|kacak|tesisat|hidrofor|acil|vana|sayac/.test(c)) return "su";
  return "diger";
}

// Animated topic artwork for posts without a featured photo (inline SVG, no stock images).
function artSvg(t: TopicKey, seed: number) {
  const c = TOPICS[t].color, s = seed % 5;
  let g = "";
  if (t === "su") g = '<rect y="120" width="400" height="40" fill="#59616A"/><rect y="124" width="400" height="6" fill="#8E979F"/><g fill="#8CC4F5"><circle cx="' + (180 + s * 10) + '" cy="160" r="5"><animate attributeName="cy" values="160;230" dur="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.1s" repeatCount="indefinite"/></circle><circle cx="' + (186 + s * 10) + '" cy="160" r="4"><animate attributeName="cy" values="160;230" dur="1.1s" begin=".5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.1s" begin=".5s" repeatCount="indefinite"/></circle></g><ellipse cx="' + (183 + s * 10) + '" cy="210" rx="70" ry="10" fill="#2D7DD2" opacity=".4"/>';
  else if (t === "tikaniklik") g = '<path d="M120 40v80q0 40 40 40h240" stroke="#59616A" stroke-width="40" fill="none"/><path d="M120 40v80q0 40 40 40h240" stroke="#2A2E34" stroke-width="28" fill="none"/><ellipse cx="' + (240 + s * 14) + '" cy="160" rx="26" ry="12" fill="#C9A64A"/><g fill="#8CC4F5"><circle cx="160" cy="160" r="4"><animate attributeName="cx" values="130;' + (212 + s * 14) + '" dur="1.4s" repeatCount="indefinite"/></circle></g>';
  else if (t === "kombi") g = '<rect x="140" y="30" width="120" height="170" rx="14" fill="#ECEDEF"/><rect x="164" y="70" width="72" height="44" rx="6" fill="#110D0D"/><g fill="#5AA9E6">' + [0, 1, 2, 3, 4].map((i) => '<path d="M' + (172 + i * 13) + ' 108q4-16 8 0z"><animate attributeName="d" values="M' + (172 + i * 13) + ' 108q4-16 8 0z;M' + (172 + i * 13) + ' 108q4-22 8 0z;M' + (172 + i * 13) + ' 108q4-16 8 0z" dur=".6s" begin="' + i * 0.1 + 's" repeatCount="indefinite"/></path>').join("") + '</g><rect x="170" y="150" width="60" height="22" rx="4" fill="#22262E"/><text x="200" y="166" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" font-weight="700" fill="#7BE0A6">1.5 bar</text>';
  else if (t === "isitma") g = '<g>' + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => '<rect x="' + (110 + i * 24) + '" y="60" width="18" height="130" rx="9" fill="url(#hg' + seed + ')"/>').join("") + '</g><defs><linearGradient id="hg' + seed + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF7A1A"/><stop offset="' + (0.5 + s * 0.08) + '" stop-color="#D50A0A"/><stop offset="1" stop-color="#2D5DA8"/></linearGradient></defs>';
  else if (t === "dogalgaz") g = '<path d="M0 120h260v80" stroke="#F5B400" stroke-width="16" fill="none"/><rect x="240" y="100" width="40" height="40" rx="6" fill="#59616A"/><rect x="226" y="92" width="68" height="10" rx="5" fill="#F5B400"/><g fill="#5AA9E6">' + [0, 1, 2, 3].map((i) => '<ellipse cx="' + (300 + i * 18) + '" cy="210" rx="5" ry="10"><animate attributeName="ry" values="10;14;10" dur=".5s" begin="' + i * 0.1 + 's" repeatCount="indefinite"/></ellipse>').join("") + '</g>';
  else if (t === "banyo") g = '<rect x="150" y="40" width="26" height="110" rx="10" fill="#DCE2E6"/><path d="M163 60h90q20 0 20 20v14" stroke="#DCE2E6" stroke-width="20" fill="none" stroke-linecap="round"/><g fill="#8CC4F5"><ellipse cx="273" cy="104" rx="5" ry="7"><animate attributeName="cy" values="104;200" dur="1.2s" repeatCount="indefinite"/></ellipse></g><ellipse cx="270" cy="205" rx="110" ry="18" fill="#F4F4F4"/>';
  else g = '<rect x="60" y="20" width="110" height="180" fill="#EFE8E0"/>' + [0, 1, 2, 3, 4].map((i) => '<rect x="80" y="' + (36 + i * 32) + '" width="' + (70 - i * 12) + '" height="10" rx="5" fill="' + (i < 2 ? "#D50A0A" : "#2BD46E") + '"/>').join("") + '<rect x="230" y="150" width="70" height="44" rx="8" fill="#D50A0A"/><circle cx="265" cy="172" r="12" fill="#110D0D"/><rect x="320" y="110" width="36" height="84" rx="18" fill="#2D7DD2"/>';
  return '<svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><radialGradient id="bg' + seed + '" cx="70%" cy="20%"><stop offset="0" stop-color="' + c + '" stop-opacity=".45"/><stop offset="1" stop-color="#110D0D" stop-opacity="0"/></radialGradient></defs><rect width="400" height="225" fill="#1B1515"/><rect width="400" height="225" fill="url(#bg' + seed + ')"/>' + g + "</svg>";
}

function PostArt({ p, t, seed, eager }: { p: BlogPost; t: TopicKey; seed: number; eager?: boolean }) {
  if (p.featuredImage) return <img src={p.featuredImage.src} alt={p.featuredImage.alt} width={1280} height={720} loading={eager ? "eager" : "lazy"} />;
  return <span style={{ position: "absolute", inset: 0 }} dangerouslySetInnerHTML={{ __html: artSvg(t, seed) }} />;
}

const fmtDate = (d?: string) => {
  if (!d) return "";
  try { return new Date(d + (d.length === 10 ? "T12:00:00" : "")).toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" }); } catch { return d; }
};
const PAGE = 12;

function BlogIndex() {
  const { generated } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicKey | "all">("all");
  const [sort, setSort] = useState<"new" | "quick" | "popular">("new");
  const [shown, setShown] = useState(PAGE);
  const barRef = useRef<HTMLDivElement>(null);
  useReveal();

  const allPosts = useMemo(() => {
    const staticSlugs = new Set(BLOG_POSTS.map((p) => p.slug));
    const extras = (generated || []).filter((p: BlogPost) => !staticSlugs.has(p.slug));
    return [...extras, ...BLOG_POSTS]
      .map((p, i) => ({ p, t: topicOf(p), i }))
      .sort((a, b) => (b.p.published ? new Date(b.p.published).getTime() : 0) - (a.p.published ? new Date(a.p.published).getTime() : 0));
  }, [generated]);

  const featured = useMemo(() => allPosts.find((x) => x.p.featuredImage) || allPosts[0], [allPosts]);
  const counts = useMemo(() => { const c: Partial<Record<TopicKey, number>> = {}; allPosts.forEach((x) => (c[x.t] = (c[x.t] || 0) + 1)); return c; }, [allPosts]);
  const popular = useMemo(() => [...allPosts].sort((a, b) => (b.p.volume || 0) - (a.p.volume || 0)).slice(0, 6), [allPosts]);

  const q = normalizeTr(query);
  const list = useMemo(() => {
    const L = allPosts.filter((x) => (topic === "all" || x.t === topic) && (!q || [x.p.title, x.p.excerpt, x.p.category, x.p.keyword].some((f) => normalizeTr(f).includes(q))))
      .filter((x) => !(x === featured && topic === "all" && !q));
    if (sort === "quick") L.sort((a, b) => a.p.readMin - b.p.readMin);
    if (sort === "popular") L.sort((a, b) => (b.p.volume || 0) - (a.p.volume || 0));
    return L;
  }, [allPosts, topic, q, sort, featured]);
  const vis = list.slice(0, shown);
  const pickTopic = (t: TopicKey | "all", scroll?: boolean) => { setTopic(t); setShown(PAGE); if (scroll) barRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  const F = featured;
  return (
    <GtPage current="/blog" top={{ left: "7/24 · Acil durum mu? Okumayın — arayın", mid: "Rehberler İstanbul'daki ustalarımızın sahadan deneyimiyle yazıldı" }}>
      <main>
        <section className="bh">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb"><ol><li><Link to="/">Ana Sayfa</Link></li><li aria-current="page">Blog</li></ol></nav>
            <div className="bh-top">
              <h1>Tesisat <em>rehberleri.</em></h1>
              <p className="lead">Petek temizliğinden kombi bakımına, tıkanıklık açmadan su kaçağına kadar en çok merak edilen tesisat sorularına ekibimizden adım adım, güvenilir cevaplar — ne zaman kendiniz bakabilirsiniz, ne zaman usta çağırmalısınız.</p>
            </div>
            {F && (
              <Link className="feat" to="/blog/$slug" params={{ slug: F.p.slug }}>
                <div className="art"><PostArt p={F.p} t={F.t} seed={999} eager /><div className="fl"><span className="pill red">ÖNE ÇIKAN</span></div></div>
                <div className="b">
                  <span className="pill lt" style={{ alignSelf: "flex-start" }}>{F.p.category.toLocaleUpperCase("tr")}</span>
                  <h2>{F.p.title}</h2>
                  <p>{F.p.excerpt}</p>
                  <div className="meta"><span>{fmtDate(F.p.updated || F.p.published)}</span><span>· {F.p.readMin} DK OKUMA</span><span>· GÖLGE TESİSAT</span></div>
                  <span className="go">Rehberi oku <ArrowRight size={16} /></span>
                </div>
              </Link>
            )}
          </div>
        </section>

        <div className="tb2" ref={barRef}>
          <div className="wrap">
            <div className="cats" role="group" aria-label="Konuya göre filtrele">
              <button type="button" aria-pressed={topic === "all"} onClick={() => pickTopic("all")}>Tümü <span>{allPosts.length}</span></button>
              {(Object.keys(TOPICS) as TopicKey[]).filter((k) => counts[k]).map((k) => (
                <button key={k} type="button" aria-pressed={topic === k} onClick={() => pickTopic(k)}>{TOPICS[k].label} <span>{counts[k]}</span></button>
              ))}
            </div>
            <div className="sr">
              <Search aria-hidden="true" />
              <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }} placeholder="Rehberlerde ara…" aria-label="Blog yazılarında ara" />
              {query && <button type="button" className="clr" aria-label="Aramayı temizle" onClick={() => setQuery("")}><X size={14} /></button>}
            </div>
            <select className="sort" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} aria-label="Sırala">
              <option value="new">En yeni</option>
              <option value="quick">En kısa okuma</option>
              <option value="popular">En çok aranan</option>
            </select>
          </div>
        </div>

        <section className="sec" style={{ paddingTop: 36 }}>
          <div className="wrap bl">
            <div>
              {query && <p className="found">{list.length} sonuç bulundu</p>}
              <div className="cards" aria-live="polite">
                {list.length === 0 && <div className="none">“{query}” için sonuç bulunamadı — farklı bir kelime deneyin ya da sorunuzu WhatsApp'tan sorun, her soruya cevap veriyoruz.</div>}
                {vis.map((x, k) => (
                  <Fragment key={x.p.slug}>
                    {k === 4 && (
                      <div className="adc">
                        <div><b>Beklemek istemiyor musunuz?</b><span>39 ilçede 7/24 nöbetçi ekip — işlem öncesi net fiyat, 2 yıl garanti.</span></div>
                        <Link className="btn" to="/randevu">Randevu al</Link>
                      </div>
                    )}
                    <Link className="pc" to="/blog/$slug" params={{ slug: x.p.slug }} style={{ animationDelay: `${(k % PAGE) * 0.04}s` }}>
                      <div className="art"><PostArt p={x.p} t={x.t} seed={x.i} /></div>
                      <div className="b">
                        <span className="cat">{x.p.category.toLocaleUpperCase("tr")}</span>
                        <h3>{x.p.title}</h3>
                        <p>{x.p.excerpt}</p>
                        <div className="meta"><span>{fmtDate(x.p.updated || x.p.published)}</span><span>· {x.p.readMin} DK OKUMA</span></div>
                      </div>
                    </Link>
                  </Fragment>
                ))}
              </div>
              {list.length > shown && (
                <div className="more"><button className="btn btn-line" type="button" onClick={() => setShown((v) => v + PAGE)}>Daha fazla rehber göster ({list.length - shown})</button></div>
              )}
            </div>
            <aside className="side">
              <div className="sbox dk">
                <h3>Sorun şu an mı var?</h3>
                <p>Doğru yazıyı aramakla vakit kaybetmeyin — 7/24 gerçek bir kişi cevap verir, biz yoldayken ne yapmanız gerektiğini söyler.</p>
                <a className="btn btn-red" href={BUSINESS.phoneHref}><Phone className="ico gt-ring" />{BUSINESS.phoneDisplay}</a>
                <a className="btn btn-wa" href={BUSINESS.whatsappHref} target="_blank" rel="noopener"><MessageCircle className="ico" />WhatsApp'tan fotoğraf gönder</a>
              </div>
              <div className="sbox">
                <h3>En çok arananlar</h3>
                <ol className="pop">
                  {popular.map((x) => (
                    <li key={x.p.slug}><div><Link to="/blog/$slug" params={{ slug: x.p.slug }}>{x.p.title}</Link><small>{x.p.readMin} DK · {TOPICS[x.t].label.toLocaleUpperCase("tr")}</small></div></li>
                  ))}
                </ol>
              </div>
              <div className="sbox">
                <h3>Konular</h3>
                <div className="tags">
                  {(Object.keys(TOPICS) as TopicKey[]).filter((k) => counts[k]).map((k) => (
                    <button key={k} type="button" onClick={() => pickTopic(k, true)}>#{TOPICS[k].label.toLocaleLowerCase("tr").replace(/ & /g, "-").replace(/ /g, "-")}</button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <h2>Okuyun. Ya da <em>biz çözelim.</em></h2>
            <p>Ücretsiz keşif, işlem öncesi net fiyat, 2 yıl yazılı garanti — 39 ilçede, 7/24.</p>
            <div className="cta">
              <Link className="btn btn-red" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
              <a className="btn btn-ghost" href={BUSINESS.phoneHref}><Phone className="ico gt-ring" />{BUSINESS.phoneDisplay}</a>
            </div>
            <p className="tiny">● ÜCRETSİZ KEŞİF · İŞLEM ÖNCESİ NET FİYAT · 2 YIL GARANTİ</p>
          </div>
        </section>
      </main>
    </GtPage>
  );
}
