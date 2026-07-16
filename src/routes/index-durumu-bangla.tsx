import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Phone,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  FileText,
  Link2,
  Map as MapIcon,
  ListChecks,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { SERVICES } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import { matrixTier } from "@/lib/matrix-tier";
import { MATRIX_ENRICHMENT } from "@/data/matrix-enrichment";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

function nf(n: number): string {
  return n.toLocaleString("en-US");
}

export const Route = createFileRoute("/index-durumu-bangla")({
  head: () => {
    const title = "Google Index সমস্যার কাজের অগ্রগতি (বাংলা) | Gölge Tesisat";
    const desc =
      "\"Crawled - currently not indexed\" সমস্যা ঠিক করতে এখন পর্যন্ত কী কী কাজ হয়েছে এবং কতটা বাকি — সম্পূর্ণ বাংলা রিপোর্ট।";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        // এটি অভ্যন্তরীণ রিপোর্ট — সার্চ ইঞ্জিনে ইনডেক্স হবে না।
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: IndexDurumuBanglaPage,
});

function IndexDurumuBanglaPage() {
  const stats = useMemo(() => {
    const tierTotals: Record<1 | 2 | 3, number> = { 1: 0, 2: 0, 3: 0 };
    const enrichedByTier: Record<1 | 2 | 3, number> = { 1: 0, 2: 0, 3: 0 };
    for (const d of DISTRICTS) {
      for (const s of SERVICES) {
        const t = matrixTier(d, s) as 1 | 2 | 3;
        tierTotals[t]++;
        if (MATRIX_ENRICHMENT[`${d.slug}:${s.slug}`]) enrichedByTier[t]++;
      }
    }
    const total = DISTRICTS.length * SERVICES.length;
    const tier1Remaining = tierTotals[1] - enrichedByTier[1];
    const tier2Remaining = tierTotals[2] - enrichedByTier[2];
    const enrichedTotal = Object.keys(MATRIX_ENRICHMENT).length;
    const tier1Pct = Math.round((enrichedByTier[1] / tierTotals[1]) * 100);
    return {
      total,
      districts: DISTRICTS.length,
      services: SERVICES.length,
      tierTotals,
      enrichedByTier,
      enrichedTotal,
      tier1Remaining,
      tier2Remaining,
      tier1Pct,
    };
  }, []);

  const doneItems: { icon: typeof CheckCircle2; title: string; body: string }[] = [
    {
      icon: Layers,
      title: "১. পেজ টায়ারিং সিস্টেম বানানো হয়েছে",
      body:
        `মোট ${nf(stats.total)}টি এলাকা × সার্ভিস পেজকে ৩টি টায়ারে ভাগ করা হয়েছে। কারণ নতুন/কম-অথরিটি ডোমেইনে হাজারো প্রায়-একরকম পেজ Google ইনডেক্স করে না — সব "Crawled/Discovered – currently not indexed" হয়ে পড়ে থাকে। তাই সবচেয়ে সম্ভাবনাময় পেজে crawl budget কেন্দ্রীভূত করা হয়েছে (matrix-tier.ts)।`,
    },
    {
      icon: Gauge,
      title: "২. পাতলা (thin) পেজগুলো noindex করা হয়েছে",
      body:
        `সবচেয়ে কম-চাহিদার Tier 3 পেজগুলো (${nf(stats.tierTotals[3])}টি) এবং সব মহল্লা (mahalle) পেজ "noindex, follow" করে sitemap থেকে বাদ দেওয়া হয়েছে। এতে Google-এর crawl budget ভালো পেজগুলোর দিকে যায় এবং সাইটের সামগ্রিক মান-সংকেত (quality signal) দুর্বল হয় না।`,
    },
    {
      icon: FileText,
      title: "৩. কনটেন্ট ইঞ্জিন নতুন করে লেখা হয়েছে (৫০৭ পেজ)",
      body:
        "matrix-seo.ts ইঞ্জিন rewrite করে প্রতি পেজে ৮০০+ (গড়ে ~১৩০০) শব্দের সত্যিকারের ভিন্ন কনটেন্ট আনা হয়েছে। ডুপ্লিকেট \"neden biz\" প্যারাগ্রাফ দূর করা হয়েছে (আগে ৩৫১-র মধ্যে মাত্র ১৬২ ইউনিক ছিল), তুলনামূলক টেবিল + লোকাল ডেটা যোগ হয়েছে।",
    },
    {
      icon: Search,
      title: "৪. প্রতিটি সার্ভিসে SERP গ্যাপ অ্যানালাইসিস (Part 2–14)",
      body:
        "১৩টি সার্ভিসের প্রতিটিতে İstanbul-এর টপ র‍্যাঙ্কিং সাইট বিশ্লেষণ করে ৪টি করে নতুন ব্লক যোগ হয়েছে: Belirtiler (লক্ষণ), Acil Önlemler (জরুরি পদক্ষেপ), Cihaz & Yöntemler (যন্ত্র ও পদ্ধতি), Türlerine Göre Çözümler। FAQ গভীরতাও ৬–৭-এ আনা হয়েছে।",
    },
    {
      icon: MapIcon,
      title: "৫. হাতে-লেখা এলাকা-নির্দিষ্ট (unique) কনটেন্ট — Batch A–D",
      body:
        `প্রতিটি পেজে যাতে টেমপ্লেট নয়, সত্যিকারের ইউনিক লোকাল কনটেন্ট থাকে সেজন্য ${nf(
          stats.enrichedTotal,
        )}টি পেজে হাতে-গবেষণা-করা enrichment রেকর্ড যোগ হয়েছে (এলাকার ভবন-কাঠামো, দাম-সংকেত, ল্যান্ডমার্ক, ইউনিক FAQ)।`,
    },
    {
      icon: Link2,
      title: "৬. অভ্যন্তরীণ লিংকিং সিস্টেম",
      body:
        "কনটেন্টের ভেতরে প্রাসঙ্গিক লিংক, ব্লগ গাইড কার্ড, এলাকা-হাব + মহল্লা লিংক, এবং সম্পর্কিত-সার্ভিস ক্লাস্টার যোগ হয়েছে — যাতে Google পেজগুলো সহজে খুঁজে পায় ও গুরুত্ব বোঝে।",
    },
  ];

  const remainingItems: {
    icon: typeof Clock;
    title: string;
    detail: string;
    count?: string;
    tone: "warn" | "info";
  }[] = [
    {
      icon: ListChecks,
      title: "Tier 1 পেজের বাকি enrichment",
      detail:
        "সবচেয়ে গুরুত্বপূর্ণ (উচ্চ-চাহিদা এলাকা × মূল সার্ভিস) পেজগুলোতে হাতে-লেখা ইউনিক কনটেন্ট এখনো বাকি।",
      count: `${nf(stats.tier1Remaining)} / ${nf(stats.tierTotals[1])} বাকি`,
      tone: "warn",
    },
    {
      icon: ListChecks,
      title: "Tier 2 পেজের enrichment",
      detail:
        "ইনডেক্সযোগ্য কিন্তু কম-priority Tier 2 পেজগুলোর হাতে-লেখা কনটেন্ট পরে যোগ করা হবে।",
      count: `${nf(stats.tier2Remaining)} / ${nf(stats.tierTotals[2])} বাকি`,
      tone: "warn",
    },
    {
      icon: Search,
      title: "Google Search Console-এ পুনরায় জমা দেওয়া",
      detail:
        "নতুন কনটেন্টসহ পেজগুলোর জন্য \"Request Indexing\" করা এবং sitemap.xml আবার submit করা দরকার।",
      tone: "info",
    },
    {
      icon: MapIcon,
      title: "মহল্লা (mahalle) পেজ নিয়ে সিদ্ধান্ত",
      detail:
        "মহল্লা পেজগুলো এখন noindex। ভবিষ্যতে সবচেয়ে বড় মহল্লাগুলোকে ইউনিক কনটেন্ট দিয়ে ইনডেক্সে ফেরানো যেতে পারে।",
      tone: "info",
    },
    {
      icon: Clock,
      title: "পুনরায় ক্রল ও ইনডেক্সের অপেক্ষা",
      detail:
        "কাজ করার পরও Google-এর আবার crawl করে ইনডেক্স করতে সাধারণত কয়েক সপ্তাহ লাগে। নিয়মিত GSC মনিটর করতে হবে।",
      tone: "info",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="border-b bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[12px] font-semibold text-primary">
            <Search className="h-3.5 w-3.5" /> অভ্যন্তরীণ রিপোর্ট (বাংলা)
          </div>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
            "Crawled – currently not indexed" সমস্যা: কী করা হয়েছে ও কী বাকি
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            Google Search Console-এ ৯০টি পেজ "Crawled/Discovered – currently not indexed"
            দেখাচ্ছিল। এর মূল কারণ: নতুন ডোমেইনে অনেক প্রায়-একরকম টেমপ্লেট পেজ। নিচে সেই
            সমস্যা সমাধানে করা কাজ ও বাকি কাজের সম্পূর্ণ তালিকা।
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* Progress snapshot */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="মোট ম্যাট্রিক্স পেজ" value={nf(stats.total)} sub={`${stats.districts} এলাকা × ${stats.services} সার্ভিস`} />
          <StatCard label="ইউনিক কনটেন্ট যোগ" value={nf(stats.enrichedTotal)} sub="পেজে হাতে-লেখা" />
          <StatCard label="Tier 1 সম্পন্ন" value={`${stats.tier1Pct}%`} sub={`${nf(stats.enrichedByTier[1])}/${nf(stats.tierTotals[1])} পেজ`} />
          <StatCard label="Tier 1 বাকি" value={nf(stats.tier1Remaining)} sub="পেজ enrichment" />
        </section>

        {/* Tier explainer */}
        <section className="mt-8 rounded-xl border bg-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-extrabold">
            <Layers className="h-5 w-5 text-primary" /> পেজগুলো কীভাবে ভাগ করা হয়েছে
          </h2>
          <div className="mt-4 space-y-3 text-[13px]">
            <TierRow
              color="bg-emerald-500"
              title={`Tier 1 — ${nf(stats.tierTotals[1])} পেজ`}
              body="উচ্চ-চাহিদা এলাকা × মূল সার্ভিস। ইনডেক্স + হাতে-লেখা ইউনিক কনটেন্ট।"
            />
            <TierRow
              color="bg-amber-500"
              title={`Tier 2 — ${nf(stats.tierTotals[2])} পেজ`}
              body="ইনডেক্সযোগ্য, কম sitemap priority। enrichment পরে যোগ হবে।"
            />
            <TierRow
              color="bg-muted-foreground/50"
              title={`Tier 3 — ${nf(stats.tierTotals[3])} পেজ + সব মহল্লা পেজ`}
              body="পাতলা লং-টেইল। noindex + sitemap থেকে বাদ, যাতে crawl budget ভালো পেজে যায়।"
            />
          </div>
        </section>

        {/* Done */}
        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-extrabold">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" /> এখন পর্যন্ত যা করা হয়েছে
          </h2>
          <div className="mt-4 space-y-3">
            {doneItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold">{item.title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Remaining */}
        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-lg font-extrabold">
            <Clock className="h-5 w-5 text-amber-500" /> যেসব কাজ এখনো বাকি
          </h2>
          <div className="mt-4 space-y-3">
            {remainingItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 rounded-lg p-2 ${
                          item.tone === "warn"
                            ? "bg-amber-500/10 text-amber-600"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold">{item.title}</h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                    {item.count && (
                      <span className="shrink-0 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-700">
                        {item.count}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why note */}
        <section className="mt-8 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <h2 className="flex items-center gap-2 text-[15px] font-extrabold text-amber-700">
            <AlertTriangle className="h-5 w-5" /> মনে রাখার মতো
          </h2>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-muted-foreground">
            <li className="flex gap-2">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              এটি একটি ধীর প্রক্রিয়া — কনটেন্ট উন্নত করার পরও Google-এর আবার ক্রল ও ইনডেক্স করতে কয়েক সপ্তাহ লাগে।
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              প্রতিটি "Next" ধাপে আরও পেজ enrich হচ্ছে; লক্ষ্য আগে সব Tier 1 পেজ শেষ করা।
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center">
          <p className="text-[13px] text-muted-foreground">সম্পূর্ণ SEO সারসংক্ষেপ দেখতে চান?</p>
          <Link
            to="/SEO-overview-bangla"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-[13px] font-bold text-primary-foreground"
          >
            <FileText className="h-4 w-4" /> পূর্ণ SEO রিপোর্ট (বাংলা)
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-[13px] font-semibold text-primary">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      </main>

      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="text-2xl font-extrabold text-primary">{value}</div>
      <div className="mt-1 text-[12px] font-semibold">{label}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function TierRow({ color, title, body }: { color: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${color}`} />
      <div>
        <div className="text-[13px] font-bold">{title}</div>
        <div className="text-[12px] text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}
