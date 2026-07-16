import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Phone,
  ArrowRight,
  Search,
  MapPin,
  Wrench,
  BookOpen,
  Link2,
  CheckCircle2,
  TrendingUp,
  Globe,
  FileText,
  ShieldCheck,
  Map as MapIcon,
  Layers,
  Target,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { ALL_KEYWORDS, type KeywordCluster } from "@/data/seo-keywords";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES } from "@/data/services";
import { DISTRICTS } from "@/data/districts";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

// বাংলা ক্লাস্টার (বিষয় গ্রুপ) লেবেল — সহজে বোঝার জন্য।
const CLUSTER_LABELS: Record<KeywordCluster, string> = {
  "su-kacagi": "পানি লিক শনাক্তকরণ (Su Kaçağı)",
  tikaniklik: "ড্রেন/পাইপ খোলা (Tıkanıklık)",
  kombi: "কম্বি ও হিটিং (Kombi)",
  petek: "রেডিয়েটর ও ক্যালোরিফার (Petek)",
  dogalgaz: "গ্যাস লাইন (Doğalgaz)",
  kanal: "ক্যামেরায় পাইপ পরিদর্শন (Kanal)",
  tesisatci: "প্লাম্বার (সাধারণ)",
  acil: "জরুরি সার্ভিস",
  "banyo-vitrifiye": "বাথরুম ও স্যানিটারি",
  "musluk-batarya": "কল ও মিক্সার (Musluk)",
  hidrofor: "হাইড্রোফোর পাম্প",
};

function nf(n: number): string {
  return n.toLocaleString("en-US");
}

export const Route = createFileRoute("/SEO-overview-bangla")({
  head: () => {
    const title = "SEO কাজের সম্পূর্ণ বিবরণ (বাংলা) | Gölge Tesisat";
    const desc =
      "ওয়েবসাইটে করা সমস্ত SEO কাজের সহজ ও বিস্তারিত বাংলা সারসংক্ষেপ: কভার করা কীওয়ার্ড, এলাকা, ব্লগ গাইড এবং টেকনিক্যাল SEO কাজ।";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        // এটি ক্লায়েন্ট রিপোর্ট — সার্চ ইঞ্জিনে ইনডেক্স হবে না।
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: SeoOverviewBanglaPage,
});

function SeoOverviewBanglaPage() {
  const stats = useMemo(() => {
    const totalKeywords = ALL_KEYWORDS.length;
    const totalVolume = ALL_KEYWORDS.reduce((a, k) => a + (k.volume || 0), 0);

    const clusterMap = new Map<KeywordCluster, { count: number; volume: number }>();
    for (const k of ALL_KEYWORDS) {
      const c = clusterMap.get(k.cluster) ?? { count: 0, volume: 0 };
      c.count += 1;
      c.volume += k.volume || 0;
      clusterMap.set(k.cluster, c);
    }
    const clusters = [...clusterMap.entries()]
      .map(([cluster, v]) => ({ cluster, ...v }))
      .sort((a, b) => b.volume - a.volume);

    const catMap = new Map<string, typeof BLOG_POSTS>();
    for (const p of BLOG_POSTS) {
      const arr = catMap.get(p.category) ?? [];
      arr.push(p);
      catMap.set(p.category, arr);
    }
    const categories = [...catMap.entries()]
      .map(([category, posts]) => ({
        category,
        posts: [...posts].sort((a, b) => (b.volume || 0) - (a.volume || 0)),
      }))
      .sort((a, b) => b.posts.length - a.posts.length);

    const sides = {
      anadolu: DISTRICTS.filter((d) => d.side === "Anadolu Yakası"),
      avrupa: DISTRICTS.filter((d) => d.side === "Avrupa Yakası"),
    };
    const neighborhoods = DISTRICTS.reduce((a, d) => a + d.neighborhoods.length, 0);

    return {
      totalKeywords,
      totalVolume,
      clusters,
      categories,
      sides,
      neighborhoods,
      postCount: BLOG_POSTS.length,
      serviceCount: SERVICES.length,
      districtCount: DISTRICTS.length,
    };
  }, []);

  const heroStats = [
    { icon: Search, value: nf(stats.totalKeywords), label: "টার্গেট করা কীওয়ার্ড" },
    { icon: TrendingUp, value: nf(stats.totalVolume), label: "মাসিক মোট সার্চ ভলিউম" },
    { icon: BookOpen, value: nf(stats.postCount), label: "SEO ব্লগ গাইড" },
    { icon: Wrench, value: nf(stats.serviceCount), label: "সার্ভিস পেজ" },
    { icon: MapPin, value: nf(stats.districtCount), label: "ইস্তাম্বুল জেলা" },
    { icon: MapIcon, value: nf(stats.neighborhoods), label: "কভার করা মহল্লা" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" lang="bn">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-sm font-semibold text-foreground">
            Gölge Tesisat
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        {/* HERO */}
        <section className="py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> ক্লায়েন্ট রিপোর্ট — SEO কাজের বিবরণ
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            আপনার ওয়েবসাইটে করা সমস্ত SEO কাজ
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            এই পেজটি হলো Google-এ উপরের দিকে আসার জন্য আজ পর্যন্ত করা{" "}
            <strong className="text-foreground">প্রতিটি কাজের একটি সহজ হিসাব</strong>। SEO-এর
            টেকনিক্যাল শব্দ জানার দরকার নেই — প্রতিটি অংশে আমরা কী করেছি, কেন করেছি এবং কী ফলাফল
            চাই তা সহজ ভাষায় লিখেছি। নিচের বেশিরভাগ আইটেমের লিংকে ক্লিক করে আপনি সংশ্লিষ্ট পেজটি
            নিজের চোখে দেখতে পারবেন।
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-card p-4 text-card-foreground"
              >
                <s.icon className="h-5 w-5 text-brand-gold" />
                <div className="mt-2 text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO কী */}
        <Section icon={Globe} title="SEO কী? (১ মিনিটে)">
          <p>
            <strong className="text-foreground">SEO (সার্চ ইঞ্জিন অপটিমাইজেশন)</strong> হলো এমন একটি
            কাজ, যাতে কোনো গ্রাহক Google-এ যেমন <em>"kadıköy su kaçağı tespiti"</em> (কাদিকয় পানি লিক
            শনাক্তকরণ) লিখলে আপনার সাইট সবার উপরে আসে। বিজ্ঞাপন না দিয়ে স্বাভাবিক (অর্গানিক)
            ফলাফলে আসা মানে বিনামূল্যে ও স্থায়ী গ্রাহক।
          </p>
          <p>
            Google র‍্যাঙ্ক করার সময় তিনটি জিনিস দেখে:{" "}
            <strong className="text-foreground">(১)</strong> সাইটে ওই বিষয়ে মানসম্পন্ন কন্টেন্ট আছে
            কি না, <strong className="text-foreground">(২)</strong> সাইট টেকনিক্যালি ঠিক ও দ্রুত কি
            না, <strong className="text-foreground">(৩)</strong> মানুষ এই সাইটকে বিশ্বাস করে কি না।
            আমাদের সব কাজ এই তিনটি দিক শক্তিশালী করার জন্য। নিচে সবগুলো এক এক করে দেখানো হলো।
          </p>
        </Section>

        {/* চেকলিস্ট */}
        <Section icon={CheckCircle2} title="করা SEO কাজসমূহ (চেকলিস্ট)">
          <p className="mb-5">
            নিচের প্রতিটি আইটেম আপনার সাইটে{" "}
            <strong className="text-foreground">সম্পন্ন হওয়া</strong> একটি SEO কাজ। পাশের সবুজ
            চিহ্নের মানে "হয়ে গেছে"।
          </p>
          <div className="space-y-3">
            {CHECKLIST.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/60 bg-card p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* কীওয়ার্ড কভারেজ */}
        <Section icon={Target} title="কোন কোন কীওয়ার্ড কভার করেছি?">
          <p className="mb-2">
            <strong className="text-foreground">কীওয়ার্ড</strong> মানে গ্রাহকরা Google-এ যে কথা
            লিখে খোঁজে। আমরা মোট{" "}
            <strong className="text-foreground">{nf(stats.totalKeywords)}টি আলাদা সার্চ টার্ম</strong>{" "}
            টার্গেট করেছি। এই টার্মগুলো Google-এ মিলিয়ে মাসে প্রায়{" "}
            <strong className="text-foreground">~{nf(stats.totalVolume)} বার</strong> খোঁজা হয় বলে
            ধারণা করা হয় (সূত্র: Semrush)। বিষয় অনুযায়ী ভাগ করে দেখানো হলো:
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">বিষয় গ্রুপ</th>
                  <th className="px-4 py-3 text-right font-semibold">কীওয়ার্ড সংখ্যা</th>
                  <th className="px-4 py-3 text-right font-semibold">মাসিক সার্চ</th>
                </tr>
              </thead>
              <tbody>
                {stats.clusters.map((c, i) => (
                  <tr key={c.cluster} className={i % 2 ? "bg-card" : "bg-card/40"}>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {CLUSTER_LABELS[c.cluster] ?? c.cluster}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {nf(c.count)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {nf(c.volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-secondary/60 font-semibold text-foreground">
                  <td className="px-4 py-3">মোট</td>
                  <td className="px-4 py-3 text-right tabular-nums">{nf(stats.totalKeywords)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{nf(stats.totalVolume)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            নোট: সার্চের ধরনও ভারসাম্য রাখা হয়েছে — তথ্য খোঁজা (গাইড পড়া), বাণিজ্যিক (সার্ভিস
            খোঁজা) এবং স্থানীয় (এলাকা খোঁজা) — সব ধরনের টার্ম একসাথে টার্গেট করা হয়েছে।
          </p>
        </Section>

        {/* এলাকা কভারেজ */}
        <Section icon={MapPin} title={`কয়টি এলাকা কভার করেছি? (${nf(stats.districtCount)}টি জেলা)`}>
          <p className="mb-4">
            স্থানীয় গ্রাহক পাওয়ার জন্য ইস্তাম্বুলের{" "}
            <strong className="text-foreground">{nf(stats.districtCount)}টি জেলা</strong> এবং এই
            জেলাগুলোর{" "}
            <strong className="text-foreground">{nf(stats.neighborhoods)}টি মহল্লার</strong> জন্য
            আলাদা পেজ তৈরি করেছি। প্রতিটি জেলার পেজে ক্লিক করে দেখতে পারেন:
          </p>

          <h3 className="mb-2 mt-4 text-sm font-semibold text-brand-gold">এশীয় পাড় (Anadolu)</h3>
          <div className="flex flex-wrap gap-2">
            {stats.sides.anadolu.map((d) => (
              <Link
                key={d.slug}
                to="/tesisatci/$slug"
                params={{ slug: d.slug }}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {d.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>

          <h3 className="mb-2 mt-5 text-sm font-semibold text-brand-gold">ইউরোপীয় পাড় (Avrupa)</h3>
          <div className="flex flex-wrap gap-2">
            {stats.sides.avrupa.map((d) => (
              <Link
                key={d.slug}
                to="/tesisatci/$slug"
                params={{ slug: d.slug }}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {d.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </Section>

        {/* সার্ভিস পেজ */}
        <Section icon={Wrench} title={`সার্ভিস পেজ (${nf(stats.serviceCount)}টি)`}>
          <p className="mb-4">
            প্রতিটি মূল সার্ভিসের জন্য, সেই সার্ভিস Google-এ খোঁজা গ্রাহকের জন্য বিশেষভাবে অপটিমাইজ
            করা একটি পেজ ("হাব পেজ") তৈরি করেছি। লিংকে ক্লিক করে দেখুন:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/hizmet/$slug"
                params={{ slug: s.slug }}
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary"
              >
                <div>
                  <div className="font-semibold text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </Section>

        {/* ব্লগ লাইব্রেরি */}
        <Section icon={BookOpen} title={`ব্লগ গাইড লাইব্রেরি (${nf(stats.postCount)}টি লেখা)`}>
          <p className="mb-5">
            SEO-এর সবচেয়ে বড় শক্তি হলো কন্টেন্ট। গ্রাহকরা Google-এ যেসব প্রশ্ন করে তার উত্তর দেয়
            এমন <strong className="text-foreground">{nf(stats.postCount)}টি বিস্তারিত গাইড</strong>{" "}
            লিখেছি। প্রতিটি লেখা একটি টার্গেট কীওয়ার্ড, ছবি, টেবিল/চার্ট এবং সচরাচর জিজ্ঞাসিত
            প্রশ্নসহ তৈরি করা হয়েছে। নিচে বিষয় অনুযায়ী সাজানো সব লেখা এবং তাদের টার্গেট সার্চ টার্ম
            দেওয়া আছে। শিরোনামে ক্লিক করে লেখাটি খুলতে পারবেন।
          </p>
          <div className="space-y-6">
            {stats.categories.map((cat) => (
              <div key={cat.category}>
                <div className="mb-2 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-brand-gold" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {cat.category}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({cat.posts.length}টি লেখা)
                    </span>
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {cat.posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="group flex items-start justify-between gap-3 rounded-lg border border-border/50 bg-card px-3 py-2 transition-colors hover:border-primary"
                      >
                        <span className="text-sm text-foreground group-hover:text-primary">
                          {p.title}
                          {p.keyword ? (
                            <span className="ml-2 text-xs text-muted-foreground">
                              · টার্গেট: "{p.keyword}"
                            </span>
                          ) : null}
                        </span>
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ইন্টারনাল লিংকিং */}
        <Section icon={Link2} title="ইন্টারনাল লিংকিং (পেজগুলোকে একে অপরের সাথে যুক্ত করা)">
          <p>
            <strong className="text-foreground">ইন্টারনাল লিংকিং</strong> মানে আপনার সাইটের পেজগুলো
            একে অপরকে লিংক দেওয়া। এতে একদিকে ভিজিটর সহজে সংশ্লিষ্ট বিষয়ে যেতে পারে, অন্যদিকে Google
            আপনার সব পেজ খুঁজে পেয়ে "এই সাইট এই বিষয়ে অথরিটি" বলে স্বীকৃতি দেয়।
          </p>
          <p>
            আপনার সাইটে প্রতিটি ব্লগ লেখা স্বয়ংক্রিয়ভাবে সংশ্লিষ্ট সার্ভিস পেজ, সম্পর্কিত গাইড এবং
            এলাকা পেজের সাথে যুক্ত হয়। সিস্টেমটি নিয়মিত যাচাই করা হয়;{" "}
            <strong className="text-foreground">একটিও "এতিম" (লিংকবিহীন) পেজ থাকে না</strong> এবং
            প্রতিটি লেখা গড়ে ১০টির বেশি ইন্টারনাল লিংক পায়। এটি র‍্যাঙ্কিংয়ের অন্যতম শক্তিশালী
            সুবিধা।
          </p>
        </Section>

        {/* শব্দকোষ */}
        <Section icon={FileText} title="SEO শব্দকোষ (সহজ ব্যাখ্যা)">
          <p className="mb-5">
            রিপোর্টে থাকা টেকনিক্যাল শব্দগুলোর অর্থ জানতে চাইলে, সবগুলো সহজ ভাষায় এখানে লিখে
            দিয়েছি:
          </p>
          <div className="space-y-3">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-xl border border-border/60 bg-card p-4">
                <h3 className="font-semibold text-brand-gold">{g.term}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* কাপনিং CTA */}
        <section className="mt-12 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
          <h2 className="text-xl font-bold text-foreground">
            SEO একটি চলমান কাজ
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            উপরের ভিত্তি শক্ত করা হয়েছে; এরপর নিয়মিত নতুন গাইড যোগ হয়, র‍্যাঙ্কিং পর্যবেক্ষণ করা
            হয় এবং প্রতিযোগীদের নজরে রাখা হয়। যেকোনো প্রশ্নে আমাদের কল করতে পারেন।
          </p>
          <a
            href={PHONE_HREF}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
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

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/60 py-9">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground [&_p]:text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

// ─── কন্টেন্ট ডেটা ───────────────────────────────────────────────────────────

const CHECKLIST: { title: string; desc: string }[] = [
  {
    title: "কীওয়ার্ড গবেষণা ও কৌশল",
    desc: "গ্রাহকরা আসলে কী খোঁজে তা Semrush ডেটা দিয়ে গবেষণা করেছি। সার্চ ভলিউম ও প্রতিযোগিতার কঠিনতা অনুযায়ী, সবচেয়ে সহজে জেতা যায় এমন টার্ম থেকে শুরু করে একটি টার্গেট তালিকা (ledger) তৈরি করেছি। সব শিরোনাম ও লেখা এই তালিকা অনুসারে লেখা হয়।",
  },
  {
    title: "পেজ শিরোনাম (Title) ও বিবরণ (Meta Description)",
    desc: "প্রতিটি পেজের Google ফলাফলে দেখানো নীল শিরোনাম ও তার নিচের বর্ণনা একসাথে কীওয়ার্ড ধারণ করে এবং ক্লিক বাড়ায় এমনভাবে আলাদাভাবে লেখা হয়েছে। শিরোনাম ৬০ ও বিবরণ ১৬০ অক্ষরের সীমার মধ্যে অপটিমাইজ করা হয়েছে।",
  },
  {
    title: "একক H1 ও সাজানো শিরোনাম কাঠামো",
    desc: "প্রতিটি পেজে Google-এর 'এই পেজ কী নিয়ে' প্রশ্নের স্পষ্ট উত্তর দেয় এমন একটি মূল শিরোনাম (H1) এবং যৌক্তিক সাব-হেডিং ব্যবহার করা হয়েছে। এতে পঠনযোগ্যতা ও র‍্যাঙ্কিং দুটোই বাড়ে।",
  },
  {
    title: "লোকাল SEO — জেলা ও মহল্লা পেজ",
    desc: "স্থানীয় গ্রাহক টানতে ইস্তাম্বুলের ২৭টি জেলা ও সংশ্লিষ্ট মহল্লার জন্য আলাদা, মৌলিক কন্টেন্টসহ পেজ তৈরি হয়েছে। 'Kadıköy tesisatçı' মতো এলাকাভিত্তিক সার্চে এগিয়ে থাকার জন্য এটিই সবচেয়ে গুরুত্বপূর্ণ কাজ।",
  },
  {
    title: "সার্ভিস হাব পেজ",
    desc: "পানি লিক, পাইপ জ্যাম, কম্বি ইত্যাদি প্রতিটি মূল সার্ভিসের জন্য; কী করা হয়, প্রক্রিয়া কী এবং দামের যুক্তি কী—তা বোঝানো গভীর ও আস্থা-তৈরি করা পেজ বানানো হয়েছে।",
  },
  {
    title: "বিস্তৃত ব্লগ কন্টেন্ট লাইব্রেরি",
    desc: "গ্রাহকদের শত শত প্রশ্নের উত্তর দেয় এমন, ছবি + টেবিল + চার্টসহ গাইড লেখা হয়েছে। এই কন্টেন্ট সাইটকে 'বিষয়ভিত্তিক অথরিটি' দেয় এবং নিয়মিত নতুন ভিজিটর আনে।",
  },
  {
    title: "ইন্টারনাল লিংকিং সিস্টেম",
    desc: "সব পেজ বুদ্ধিমত্তার সাথে একে অপরের সাথে যুক্ত করা হয়েছে; কোনো এতিম (লিংকবিহীন) পেজ রাখা হয়নি। নিয়মিত অডিটে প্রতিটি লেখার যথেষ্ট ইন্টারনাল লিংক আছে কি না তা যাচাই করা হয়।",
  },
  {
    title: "স্ট্রাকচার্ড ডেটা (Schema / JSON-LD)",
    desc: "Google-কে 'এটি একটি লোকাল ব্যবসা, এটি একটি আর্টিকেল, এটি সচরাচর জিজ্ঞাসিত প্রশ্ন' বলে মেশিন-ভাষায় বোঝানো ট্যাগ যোগ করা হয়েছে। এতে সার্চ ফলাফলে সমৃদ্ধ চেহারা (স্টার, FAQ ড্রপডাউন) পাওয়ার সুযোগ তৈরি হয়।",
  },
  {
    title: "সাইটম্যাপ (Sitemap) ও robots.txt",
    desc: "Google যেন আপনার সব পেজ পূর্ণভাবে খুঁজে স্ক্যান করতে পারে, সেজন্য স্বয়ংক্রিয়ভাবে আপডেট হওয়া একটি সাইটম্যাপ এবং স্ক্যান নিয়ম নির্ধারণকারী robots.txt ফাইল বসানো হয়েছে।",
  },
  {
    title: "Canonical ট্যাগ",
    desc: "একই কন্টেন্টের পুনরাবৃত্তি যেন না ধরা হয়, সেজন্য প্রতিটি পেজের 'আসল ঠিকানা' Google-কে জানানো হয়েছে। এতে র‍্যাঙ্কিং শক্তি ভাগ হয়ে যাওয়া রোধ হয়।",
  },
  {
    title: "সোশ্যাল শেয়ার কার্ড (Open Graph)",
    desc: "সাইটের লিংক WhatsApp, Facebook বা X-এ শেয়ার করলে যেন সঠিক শিরোনাম, বর্ণনা ও ছবিসহ দেখায়, সেজন্য Open Graph ট্যাগ যোগ করা হয়েছে।",
  },
  {
    title: "মোবাইল উপযোগিতা ও গতি",
    desc: "বেশিরভাগ সার্চ ফোন থেকে হয় বলে সাইটটি মোবাইলে দ্রুত ও ঝামেলাহীন চলার মতো করে ডিজাইন করা হয়েছে; ছবিগুলো lazy loading দিয়ে অপটিমাইজ করা হয়েছে।",
  },
  {
    title: "তুর্কি ও ইস্তাম্বুল-কেন্দ্রিক কৌশল",
    desc: "পুরো কাজ ১০০% তুর্কি সার্চ ও ইস্তাম্বুল বাজারে কেন্দ্রীভূত। যে কন্টেন্টের টার্গেট অডিয়েন্সে চাহিদা নেই, তাতে রিসোর্স ব্যয় করা হয়নি।",
  },
  {
    title: "পারফরম্যান্স ট্র্যাকিং (Search Console)",
    desc: "সাইটের Google-এর ক্লিক, ইমপ্রেশন ও র‍্যাঙ্কিং ডেটা অ্যাডমিন প্যানেল থেকে দেখা হয়; কোন টার্মে উত্থান/পতন হচ্ছে তা পর্যবেক্ষণ করা হয়।",
  },
];

const GLOSSARY: { term: string; desc: string }[] = [
  {
    term: "কীওয়ার্ড (Keyword)",
    desc: "গ্রাহকরা Google সার্চ বক্সে যে শব্দ বা বাক্য লেখে। যেমন: 'üsküdar kombi servisi'। আমরা যে কীওয়ার্ড টার্গেট করি, তার প্রতিটি আপনার জন্য একজন সম্ভাব্য গ্রাহকের দরজা।",
  },
  {
    term: "সার্চ ভলিউম (Search Volume)",
    desc: "একটি কীওয়ার্ড Google-এ মাসে কতবার খোঁজা হয় তার আনুমানিক সংখ্যা। ভলিউম যত বেশি, সেই কীওয়ার্ডে উপরে থাকা মানে তত বেশি ভিজিটর।",
  },
  {
    term: "কঠিনতা স্কোর (KDI / Keyword Difficulty)",
    desc: "একটি কীওয়ার্ডে প্রথম পেজে আসা কতটা কঠিন তা ০–১০০ স্কেলে দেখায়। আমরা কম স্কোরের (সহজ) কীওয়ার্ড থেকে শুরু করে দ্রুত ফল পাওয়ার লক্ষ্য রাখি।",
  },
  {
    term: "অর্গানিক ট্রাফিক",
    desc: "বিজ্ঞাপন না দিয়ে, স্বাভাবিক সার্চ ফলাফল থেকে সাইটে আসা বিনামূল্যের ভিজিটর। SEO-এর মূল লক্ষ্য এই ট্রাফিক বাড়ানো।",
  },
  {
    term: "SERP (সার্চ রেজাল্ট পেজ)",
    desc: "Google-এ সার্চ করলে যে ফলাফলের তালিকা আসে। আমাদের লক্ষ্য এই তালিকার প্রথম পেজে, সম্ভব হলে প্রথম ৩-এ থাকা।",
  },
  {
    term: "মেটা টাইটেল (Title) ও মেটা ডিসক্রিপশন",
    desc: "Google ফলাফলে দেখানো নীল ক্লিকযোগ্য শিরোনাম ও তার নিচের ধূসর বর্ণনা। ভালোভাবে লেখা হলে র‍্যাঙ্কিং ও ক্লিক রেট দুটোই বাড়ে।",
  },
  {
    term: "স্ট্রাকচার্ড ডেটা (Schema / JSON-LD)",
    desc: "পেজের কন্টেন্ট Google-কে মেশিন-ভাষায় ব্যাখ্যা করা অদৃশ্য ট্যাগ। ব্যবসার তথ্য, আর্টিকেল, FAQ ইত্যাদি চিহ্নিত করে; সমৃদ্ধ ফলাফল চেহারা দেয়।",
  },
  {
    term: "সাইটম্যাপ (Sitemap)",
    desc: "আপনার সাইটের সব পেজের তালিকা থাকা একটি ফাইল। Google যেন কোনো পেজ বাদ না দিয়ে খুঁজে পায়, তা নিশ্চিত করে।",
  },
  {
    term: "robots.txt",
    desc: "সার্চ ইঞ্জিনকে কোন পেজ স্ক্যান করবে ও কোনটি করবে না তা জানিয়ে দেওয়া একটি ছোট নিয়ম-ফাইল।",
  },
  {
    term: "Canonical (আসল ঠিকানা) ট্যাগ",
    desc: "একই রকম কন্টেন্টের একাধিক পেজ থাকলে Google-কে 'আসল/অগ্রাধিকার ঠিকানা এটি' বলে জানানো ট্যাগ। ডুপ্লিকেট কন্টেন্ট জরিমানা ও শক্তি ভাগ হওয়া রোধ করে।",
  },
  {
    term: "ইন্টারনাল লিংকিং",
    desc: "নিজের পেজগুলোর একে অপরকে দেওয়া লিংক। ভিজিটরকে পথ দেখায় এবং Google-কে সাইটের গঠন বুঝতে সাহায্য করে।",
  },
  {
    term: "ব্যাকলিংক (Backlink)",
    desc: "অন্য সাইট আপনার সাইটকে দেওয়া লিংক। Google-এর কাছে এটি একটি 'ভোট/আস্থা' চিহ্ন; অথরিটি বাড়ায়।",
  },
  {
    term: "হাব ও ক্লাস্টার (Hub & Cluster)",
    desc: "একটি মূল সার্ভিস পেজ (হাব) ঘিরে, সেই বিষয়ে অনেক ব্লগ লেখার (ক্লাস্টার) জমা হওয়া। Google-কে দেখায় আপনি সেই বিষয়ে বিশেষজ্ঞ—একটি শক্তিশালী কাঠামো।",
  },
  {
    term: "লোকাল SEO (Local SEO)",
    desc: "নির্দিষ্ট শহর/জেলার সার্চে এগিয়ে থাকার কাজ। প্লাম্বিংয়ের মতো এলাকাভিত্তিক সার্ভিসে এটি সবচেয়ে মূল্যবান SEO ধরন।",
  },
  {
    term: "Open Graph",
    desc: "আপনার সাইট লিংক সোশ্যাল মিডিয়ায় শেয়ার করলে যে শিরোনাম, বর্ণনা ও ছবি দেখায় তা নির্ধারণকারী ট্যাগ। শেয়ারগুলো পেশাদার দেখায়।",
  },
  {
    term: "CTR (ক্লিক রেট)",
    desc: "আপনার পেজ Google-এ দেখানোর পর কত শতাংশ মানুষ ক্লিক করল তার অনুপাত। বেশি CTR ট্রাফিক ও পরোক্ষভাবে র‍্যাঙ্কিং—দুটোর জন্যই ভালো।",
  },
];
