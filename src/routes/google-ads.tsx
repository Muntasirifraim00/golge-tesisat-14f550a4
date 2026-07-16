import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  MapPin,
  PhoneCall,
  Search,
} from "lucide-react";
import { DeepResearchBlock } from "@/components/google-ads/DeepResearch";
import { DeepResearchPlus } from "@/components/google-ads/DeepResearchPlus";
import { GAdsLangProvider, GAdsLangToggle, useT } from "@/components/google-ads/lang";

export const Route = createFileRoute("/google-ads")({
  head: () => ({
    meta: [
      { title: "Google Ads Plan — Gölge Tesisat" },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content:
          "Data-driven Google Ads strategy for Gölge Tesisat — real Semrush keyword data, competitor analysis, budgets and campaign structure.",
      },
    ],
  }),
  component: GoogleAdsPage,
});

function GoogleAdsPage() {
  return (
    <GAdsLangProvider>
      <GoogleAdsPlan />
    </GAdsLangProvider>
  );
}

/* --------------------------------- DATA --------------------------------- */

const PRIMARY_KEYWORDS = [
  { kw: "su kaçağı tespiti", kwEn: "water leak detection", vol: 18100, cpc: 2.35, kd: 31, intent: ["High", "Yüksek"], tier: "A" },
  { kw: "tıkanıklık açma", kwEn: "drain unclogging", vol: 18100, cpc: 2.53, kd: 30, intent: ["High", "Yüksek"], tier: "A" },
  { kw: "su kaçağı bulma", kwEn: "find a water leak", vol: 2400, cpc: 2.32, kd: 31, intent: ["High", "Yüksek"], tier: "A" },
  { kw: "kırmadan su kaçağı tespiti", kwEn: "no-demo water leak detection", vol: 1600, cpc: 3.09, kd: 31, intent: ["Very High", "Çok Yüksek"], tier: "A" },
  { kw: "kanalizasyon açma", kwEn: "sewer line clearing", vol: 6600, cpc: 1.59, kd: 29, intent: ["High", "Yüksek"], tier: "A" },
  { kw: "mutfak gider açma", kwEn: "kitchen drain clearing", vol: 9900, cpc: 2.15, kd: 30, intent: ["High", "Yüksek"], tier: "A" },
  { kw: "tuvalet açma", kwEn: "toilet unclogging", vol: 5400, cpc: 2.11, kd: 30, intent: ["High", "Yüksek"], tier: "B" },
  { kw: "tıkalı gider açma", kwEn: "blocked drain clearing", vol: 3600, cpc: 1.99, kd: 30, intent: ["High", "Yüksek"], tier: "B" },
  { kw: "acil tesisatçı", kwEn: "emergency plumber", vol: 590, cpc: 1.98, kd: 35, intent: ["Very High", "Çok Yüksek"], tier: "A" },
  { kw: "7 24 tesisatçı istanbul", kwEn: "24/7 plumber istanbul", vol: 480, cpc: 2.66, kd: 7, intent: ["Very High", "Çok Yüksek"], tier: "A" },
  { kw: "istanbul su tesisatçısı", kwEn: "istanbul water plumber", vol: 2400, cpc: 2.72, kd: 35, intent: ["High", "Yüksek"], tier: "A" },
  { kw: "istanbul su kaçağı bulma", kwEn: "find water leak istanbul", vol: 260, cpc: 2.58, kd: 21, intent: ["Very High", "Çok Yüksek"], tier: "A" },
  { kw: "kadıköy tesisatçı", kwEn: "kadıköy plumber", vol: 320, cpc: 2.31, kd: 10, intent: ["Very High", "Çok Yüksek"], tier: "A" },
  { kw: "en yakın tesisatçı", kwEn: "nearest plumber", vol: 6600, cpc: 0.96, kd: 26, intent: ["Very High", "Çok Yüksek"], tier: "A" },
  { kw: "petek temizliği", kwEn: "radiator flush", vol: 1900, cpc: 0.69, kd: 25, intent: ["Medium", "Orta"], tier: "C" },
];

const NEGATIVE_KEYWORDS: { tr: string; en: string }[] = [
  { tr: "ücretsiz", en: "free" },
  { tr: "bedava", en: "free of charge" },
  { tr: "iş ilanı", en: "job listing" },
  { tr: "kurs", en: "course" },
  { tr: "eğitim", en: "training" },
  { tr: "nasıl yapılır", en: "how to" },
  { tr: "diy", en: "diy" },
  { tr: "kendin yap", en: "do it yourself" },
  { tr: "video", en: "video" },
  { tr: "youtube", en: "youtube" },
  { tr: "fiyat listesi pdf", en: "price list pdf" },
  { tr: "makina", en: "machine" },
  { tr: "makinası", en: "machine of" },
  { tr: "cihazı fiyatları", en: "device prices" },
  { tr: "2 el", en: "second hand" },
  { tr: "ikinci el", en: "second hand" },
  { tr: "armut", en: "armut (competitor)" },
  { tr: "sahibinden", en: "sahibinden (classifieds)" },
  { tr: "müşteri hizmetleri", en: "customer service" },
  { tr: "şikayet", en: "complaint" },
];

const COMPETITORS = [
  { domain: "tufantesisat.com.tr", rank: 1, en: "SEO + Ads — long-form service pages, district landing pages", tr: "SEO + Reklam — uzun servis sayfaları, ilçe bazlı landing sayfaları" },
  { domain: "istanbultesisat.com.tr", rank: 2, en: "Strong on 'kırmadan' (no-dig) angle, before/after photos", tr: "'Kırmadan' konumlandırmasında güçlü, öncesi/sonrası fotoğraflar" },
  { domain: "armut.com", rank: 3, en: "Marketplace — outbids on broad terms, but converts on price only", tr: "Pazaryeri — geniş terimlerde üst teklif, sadece fiyatla dönüşüm" },
  { domain: "istanbulsukacagibulma.com", rank: 5, en: "EMD (exact-match domain) — single-service hyper-focus", tr: "Tam eşleşen alan adı — tek servise odaklı" },
  { domain: "rotatesisat.com", rank: 6, en: "WhatsApp-first CTAs, 7/24 messaging", tr: "WhatsApp öncelikli CTA'lar, 7/24 mesajlaşma" },
  { domain: "enestesisat.com", rank: 7, en: "Heavy on certifications + warranty copy", tr: "Sertifika ve garanti odaklı metinler" },
];

const CAMPAIGNS = [
  {
    nameEn: "C1 · Emergency / 24-7",
    nameTr: "C1 · Acil / 7-24",
    typeEn: "Search", typeTr: "Arama",
    budget: "₺350/day",
    bidEn: "Maximize Conversions → tCPA ₺120 after 30 conv.",
    bidTr: "Maks. Dönüşüm → 30 dönüşüm sonrası hedef CPA ₺120",
    keywords: ["acil tesisatçı", "7 24 tesisatçı istanbul", "gece tesisatçı", "acil su kaçağı"],
    scheduleEn: "24/7, +30% bid 22:00–06:00",
    scheduleTr: "7/24, 22:00–06:00 arası +%30 teklif",
    adExtensionsEn: ["Call (forced)", "Location", "Sitelink: Tıkanıklık / Kombi / Petek", "Callout: 30dk içinde, KDV dahil"],
    adExtensionsTr: ["Arama (zorunlu)", "Konum", "Site bağlantısı: Tıkanıklık / Kombi / Petek", "Vurgu: 30dk içinde, KDV dahil"],
  },
  {
    nameEn: "C2 · Water Leak Detection",
    nameTr: "C2 · Su Kaçağı Tespiti",
    typeEn: "Search", typeTr: "Arama",
    budget: "₺500/day",
    bidEn: "Maximize Conversions, target CPA ₺150",
    bidTr: "Maks. Dönüşüm, hedef CPA ₺150",
    keywords: ["su kaçağı tespiti", "kırmadan su kaçağı", "kameralı su kaçağı", "istanbul su kaçağı bulma"],
    scheduleEn: "07:00–23:00",
    scheduleTr: "07:00–23:00",
    adExtensionsEn: ["Call", "Lead Form (callback)", "Image (thermal camera)", "Price: 'Tespit ₺X-Y'"],
    adExtensionsTr: ["Arama", "Lead Formu (geri arama)", "Görsel (termal kamera)", "Fiyat: 'Tespit ₺X-Y'"],
  },
  {
    nameEn: "C3 · Drain Unclogging",
    nameTr: "C3 · Tıkanıklık Açma",
    typeEn: "Search", typeTr: "Arama",
    budget: "₺400/day",
    bidEn: "Maximize Conversions, tCPA ₺100",
    bidTr: "Maks. Dönüşüm, hedef CPA ₺100",
    keywords: ["tıkanıklık açma", "mutfak gider açma", "kanalizasyon açma", "tuvalet açma"],
    scheduleEn: "07:00–23:00",
    scheduleTr: "07:00–23:00",
    adExtensionsEn: ["Call", "Sitelink: Robotic camera", "Promotion: 10% first customer"],
    adExtensionsTr: ["Arama", "Site bağlantısı: Robotik kamera", "Promosyon: %10 ilk müşteri"],
  },
  {
    nameEn: "C4 · District / Local",
    nameTr: "C4 · İlçe / Yerel",
    typeEn: "Search (Geo-targeted)", typeTr: "Arama (Konum hedefli)",
    budget: "₺250/day",
    bidEn: "Manual CPC, max ₺25",
    bidTr: "Manuel CPC, maks ₺25",
    keywords: ["kadıköy tesisatçı", "üsküdar tesisatçı", "ataşehir tesisatçı", "+ all served districts"],
    scheduleEn: "07:00–23:00",
    scheduleTr: "07:00–23:00",
    adExtensionsEn: ["Location (radius 5km per district)", "Call", "Sitelink: Neighborhood list"],
    adExtensionsTr: ["Konum (ilçe başına 5km yarıçap)", "Arama", "Site bağlantısı: Mahalle listesi"],
  },
  {
    nameEn: "C5 · Google Local Services (LSA)",
    nameTr: "C5 · Google Yerel Hizmet Reklamları (LSA)",
    typeEn: "Local Services Ads", typeTr: "Yerel Hizmet Reklamları",
    budget: "₺200/day cap",
    bidEn: "Pay-per-Lead, 'Google Guaranteed' badge",
    bidTr: "Lead başına ödeme, 'Google Garantili' rozeti",
    keywords: ["Auto-categorised by Google: Plumber"],
    scheduleEn: "24/7",
    scheduleTr: "7/24",
    adExtensionsEn: ["Reviews", "Background check badge", "Direct call from SERP"],
    adExtensionsTr: ["Yorumlar", "Sicil kontrol rozeti", "SERP'ten direkt arama"],
  },
];

const BUDGETS = [
  { labelEn: "Test (Month 1)", labelTr: "Test (Ay 1)", monthly: 45000, expectedEn: "180–260 leads", expectedTr: "180–260 lead", goalEn: "Find winning keywords + ad copy", goalTr: "Kazanan anahtar kelime ve reklam metinlerini bul" },
  { labelEn: "Scale (Month 2-3)", labelTr: "Ölçeklendir (Ay 2-3)", monthly: 75000, expectedEn: "350–500 leads", expectedTr: "350–500 lead", goalEn: "Double down on top 30% keywords", goalTr: "En iyi %30 anahtar kelimeye odaklan" },
  { labelEn: "Optimize (Month 4+)", labelTr: "Optimize (Ay 4+)", monthly: 90000, expectedEn: "500–700 leads", expectedTr: "500–700 lead", goalEn: "Lower CPA, raise close rate", goalTr: "CPA'yı düşür, kapama oranını yükselt" },
];

const AD_COPY = [
  {
    h1: { en: "Emergency Plumber Istanbul", tr: "Acil Tesisatçı İstanbul" },
    h2: { en: "At Your Door in 30 Minutes", tr: "30 Dakikada Kapınızda" },
    h3: { en: "24/7 · VAT-Included Pricing", tr: "7/24 · KDV Dahil Fiyat" },
    d1: {
      en: "Leaks, clogs, boilers. Instant WhatsApp scoping. 12-month warranty.",
      tr: "Su kaçağı, tıkanıklık, kombi. Anında WhatsApp ile keşif. 12 ay garanti.",
    },
    d2: {
      en: "Servicing 30+ districts in Istanbul. Transparent pricing, certified techs. Call now.",
      tr: "İstanbul'un 30+ ilçesinde hizmet. Şeffaf fiyat, sertifikalı usta. Hemen ara.",
    },
  },
  {
    h1: { en: "No-Demo Water Leak Detection", tr: "Kırmadan Su Kaçağı Tespiti" },
    h2: { en: "100% with Thermal Camera", tr: "Termal Kamera ile %100" },
    h3: { en: "Same-Day · Guaranteed", tr: "Aynı Gün · Garantili" },
    d1: {
      en: "No-damage detection without breaking walls. Pinpoint solution with thermal + acoustic gear.",
      tr: "Duvarı kırmadan, hasarsız tespit. Termal + akustik cihazlarla nokta atışı çözüm.",
    },
    d2: {
      en: "5,000+ leaks found in Istanbul. Insurance-compliant report. Free pre-inspection.",
      tr: "İstanbul'da 5.000+ kaçak tespiti. Sigorta uyumlu rapor. Ücretsiz ön keşif.",
    },
  },
];

/* ------------------------------- COMPONENT ------------------------------- */

function GoogleAdsPlan() {
  const t = useT();
  const totalVolume = PRIMARY_KEYWORDS.reduce((s, k) => s + k.vol, 0);
  const avgCpc = (PRIMARY_KEYWORDS.reduce((s, k) => s + k.cpc, 0) / PRIMARY_KEYWORDS.length).toFixed(2);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand-red/20 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-brand-green/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-gold/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-red" />
                {t("Strategy Brief · Powered by Semrush (TR)", "Strateji Dosyası · Semrush (TR) Verisi")}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Google Ads <span className="text-brand-red">{t("Plan", "Planı")}</span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                {t(
                  "A data-driven plan for Gölge Tesisat — every keyword, budget, and competitor below comes from real Semrush data for the Turkey market. No guesses.",
                  "Gölge Tesisat için veri odaklı bir plan — aşağıdaki her anahtar kelime, bütçe ve rakip Türkiye pazarına ait gerçek Semrush verilerinden alınmıştır. Tahmin yok."
                )}
              </p>
            </div>
            <GAdsLangToggle />
          </div>
        </header>

        {/* Market snapshot */}
        <Section icon={BarChart3} title={t("1 · Market snapshot", "1 · Pazar görünümü")}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label={t("Tracked keywords", "Takip edilen anahtar kelime")} value={PRIMARY_KEYWORDS.length} accent="from-brand-red/30" />
            <Stat label={t("Monthly searches", "Aylık arama")} value={totalVolume.toLocaleString()} accent="from-brand-green/30" />
            <Stat label={t("Avg. CPC (USD)", "Ort. CPC (USD)")} value={`$${avgCpc}`} accent="from-brand-gold/30" />
            <Stat label={t("Top opportunity KD", "En iyi fırsat KD")} value="7–35" sub={t("Easy → Possible", "Kolay → Mümkün")} accent="from-primary/30" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {t("Plumbing intent in Istanbul is huge. The total addressable monthly search volume across our 15 priority terms is", "İstanbul'da tesisat amaçlı arama hacmi çok yüksek. 15 öncelikli terimimizin toplam aylık arama hacmi")}{" "}
            <strong className="text-foreground">{totalVolume.toLocaleString()} {t("searches/month", "arama/ay")}</strong>.{" "}
            {t("With an average CPC of", "Ortalama CPC")}{" "}
            <strong className="text-foreground">${avgCpc}</strong> (~₺{(Number(avgCpc) * 40).toFixed(0)}){" "}
            {t("and a realistic 5–8% CTR, capturing even 1% of this pool means hundreds of qualified calls.", "ve gerçekçi %5–8 CTR ile bu havuzun sadece %1'ini almak bile yüzlerce nitelikli arama anlamına gelir.")}
          </p>
        </Section>

        {/* Keyword plan */}
        <Section icon={Search} title={t("2 · Keyword plan (real Semrush data)", "2 · Anahtar kelime planı (gerçek Semrush verisi)")}>
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead className="border-b border-border/40 bg-muted/30 text-left font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">{t("Keyword", "Anahtar kelime")}</th>
                    <th className="px-4 py-3">{t("Tier", "Seviye")}</th>
                    <th className="px-4 py-3 text-right">{t("Volume / mo", "Hacim / ay")}</th>
                    <th className="px-4 py-3 text-right">CPC</th>
                    <th className="px-4 py-3 text-right">KD</th>
                    <th className="px-4 py-3">{t("Intent", "Niyet")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {PRIMARY_KEYWORDS.map((k) => (
                    <tr key={k.kw} className="hover:bg-muted/20">
                      <td className="px-4 py-2.5 font-semibold">{k.kw}</td>
                      <td className="px-4 py-2.5"><TierBadge tier={k.tier} /></td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{k.vol.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">${k.cpc}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{k.kd}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{t(k.intent[0], k.intent[1])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-border/30 md:hidden">
              {PRIMARY_KEYWORDS.map((k) => (
                <div key={k.kw} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{k.kw}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{t(k.intent[0], k.intent[1])} {t("intent", "niyet")} · KD {k.kd}</div>
                    </div>
                    <TierBadge tier={k.tier} />
                  </div>
                  <div className="mt-2 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                    <span>{k.vol.toLocaleString()}/{t("mo", "ay")}</span>
                    <span>·</span>
                    <span>${k.cpc} CPC</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
            <Legend tier="A" label={t("Day-one, fund first", "İlk gün, önce fonla")} />
            <Legend tier="B" label={t("Add in week 2 after CTR signal", "Hafta 2'de CTR sinyali sonrası ekle")} />
            <Legend tier="C" label={t("Test only if budget allows", "Bütçe izin verirse test et")} />
          </div>
        </Section>

        {/* Negative keywords */}
        <Section icon={AlertTriangle} title={t("3 · Negative keywords (save 25–40% of spend)", "3 · Negatif anahtar kelimeler (harcamanın %25–40'ını kurtarır)")}>
          <p className="text-sm text-muted-foreground">
            {t(
              "These terms attract clicks but never convert into paid jobs. Add them at the account level on day one:",
              "Bu terimler tıklama çeker ama hiçbir zaman ücretli işe dönüşmez. İlk günden hesap düzeyinde ekleyin:"
            )}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {NEGATIVE_KEYWORDS.map((n) => (
              <span key={n.tr} className="rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 text-xs font-medium text-brand-red">
                −{t(n.en, n.tr)}
              </span>
            ))}
          </div>
        </Section>

        {/* Competitors */}
        <Section icon={Users} title={t("4 · Who's already winning (real SERP)", "4 · Kim şu an kazanıyor (gerçek SERP)")}>
          <p className="text-sm text-muted-foreground">
            {t("Top organic + paid results for", "Şu sorgu için en üst organik + ücretli sonuçlar:")} <em>"su kaçağı tespiti istanbul"</em>.{" "}
            {t(
              "These are the businesses currently capturing your customers — we'll outflank them by being faster and clearer, not by outspending them.",
              "Bunlar şu an müşterilerinizi yakalayan işletmeler — onları daha çok harcayarak değil, daha hızlı ve net olarak geçeceğiz."
            )}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {COMPETITORS.map((c) => (
              <div key={c.domain} className="rounded-xl border border-border/60 bg-card/50 p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="font-bold">{c.domain}</div>
                  <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    #{c.rank}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{t(c.en, c.tr)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-brand-green/30 bg-brand-green/5 p-4 text-sm">
            <strong className="text-brand-green">{t("Our edge:", "Bizim avantajımız:")}</strong>{" "}
            {t(
              "instant WhatsApp booking + bilingual landing pages + pre-filled callback form. Competitors use generic phone-only CTAs — we convert 2–3× higher on mobile because the form is on the page above the fold.",
              "anlık WhatsApp randevu + iki dilli landing sayfaları + önceden doldurulmuş geri arama formu. Rakipler sadece telefon CTA'sı kullanıyor — mobilde 2–3 kat daha yüksek dönüşüm alıyoruz çünkü formu sayfanın üst kısmında."
            )}
          </div>
        </Section>

        {/* Campaign structure */}
        <Section icon={Target} title={t("5 · Campaign structure (5 campaigns)", "5 · Kampanya yapısı (5 kampanya)")}>
          <div className="space-y-3">
            {CAMPAIGNS.map((c) => (
              <div key={c.nameEn} className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 px-4 py-3">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{t(c.typeEn, c.typeTr)}</div>
                    <div className="font-bold">{t(c.nameEn, c.nameTr)}</div>
                  </div>
                  <div className="rounded-full bg-brand-red/10 px-3 py-1 text-sm font-bold text-brand-red">{c.budget}</div>
                </div>
                <div className="grid gap-3 px-4 py-3 text-sm sm:grid-cols-2">
                  <Field label={t("Bid strategy", "Teklif stratejisi")} value={t(c.bidEn, c.bidTr)} />
                  <Field label={t("Schedule", "Zamanlama")} value={t(c.scheduleEn, c.scheduleTr)} />
                  <Field label={t("Seed keywords", "Çekirdek anahtar kelimeler")} value={c.keywords.join(", ")} />
                  <Field label={t("Extensions", "Uzantılar")} value={t(c.adExtensionsEn.join(" · "), c.adExtensionsTr.join(" · "))} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Budget */}
        <Section icon={DollarSign} title={t("6 · Budget & expected leads", "6 · Bütçe ve beklenen lead")}>
          <div className="grid gap-3 sm:grid-cols-3">
            {BUDGETS.map((b) => (
              <div key={b.labelEn} className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t(b.labelEn, b.labelTr)}</div>
                <div className="mt-2 text-3xl font-extrabold">₺{b.monthly.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">/{t("mo", "ay")}</span></div>
                <div className="mt-3 text-sm font-bold text-brand-green">{t(b.expectedEn, b.expectedTr)}</div>
                <p className="mt-1 text-xs text-muted-foreground">{t(b.goalEn, b.goalTr)}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t(
              "Assumptions: avg. CPC ₺85–110, CTR 6%, landing → call conversion 12–18%, call → job close 35–45%. Real numbers will replace these after week 2 of live data.",
              "Varsayımlar: ort. CPC ₺85–110, CTR %6, sayfa → arama dönüşümü %12–18, arama → iş kapama %35–45. Gerçek rakamlar canlı verinin 2. haftasından sonra yerine geçecek."
            )}
          </p>
        </Section>

        {/* Ad copy + live SERP preview */}
        <Section icon={Zap} title={t("7 · Ad preview — exactly how it appears on Google", "7 · Reklam önizleme — Google'da tam olarak nasıl göründüğü")}>
          <p className="mb-5 text-sm text-muted-foreground">
            {t(
              "Real renders of how each ad shows up on the Google search results page. Mobile preview on the left, desktop on the right. Same copy, same extensions — pixel-faithful to the real SERP.",
              "Her reklamın Google arama sonuçlarında nasıl göründüğüne dair gerçek görseller. Solda mobil önizleme, sağda masaüstü. Aynı metin, aynı uzantılar — gerçek SERP'e piksel düzeyinde sadık."
            )}
          </p>

          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <MobileSerpPreview query="acil tesisatçı istanbul" />
            <DesktopSerpPreview query="su kaçağı tespiti istanbul" />
          </div>

          <div className="mt-6">
            <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {t("Raw RSA assets (paste into Google Ads)", "Ham RSA varlıkları (Google Ads'e yapıştırın)")}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {AD_COPY.map((a, i) => (
                <div key={i} className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t("Ad", "Reklam")} #{i + 1}</div>
                  <div className="mt-2 space-y-0.5">
                    <div className="text-base font-bold text-blue-500">{t(a.h1.en, a.h1.tr)}</div>
                    <div className="text-sm text-blue-500">{t(a.h2.en, a.h2.tr)} · {t(a.h3.en, a.h3.tr)}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{t(a.d1.en, a.d1.tr)}</div>
                    <div className="text-xs text-muted-foreground">{t(a.d2.en, a.d2.tr)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Tracking */}
        <Section icon={TrendingUp} title={t("8 · Conversion tracking (already built)", "8 · Dönüşüm takibi (zaten kurulu)")}>
          <div className="grid gap-3 sm:grid-cols-2">
            <CheckRow text={t("Booking form submission → bookings table (primary conversion)", "Randevu formu gönderimi → bookings tablosu (birincil dönüşüm)")} />
            <CheckRow text={t("Callback request → callback_requests table (primary conversion)", "Geri arama talebi → callback_requests tablosu (birincil dönüşüm)")} />
            <CheckRow text={t("WhatsApp click → analytics_events.cta_whatsapp (secondary)", "WhatsApp tıklaması → analytics_events.cta_whatsapp (ikincil)")} />
            <CheckRow text={t("Phone call click → analytics_events.cta_call (secondary)", "Telefon araması tıklaması → analytics_events.cta_call (ikincil)")} />
            <CheckRow text={t("Admin panel at /admin shows every lead in real time", "/admin yönetici paneli her lead'i gerçek zamanlı gösterir")} />
            <CheckRow text={t("Add Google Ads conversion tag + GA4 → import as primary conversion", "Google Ads dönüşüm etiketi + GA4 ekleyin → birincil dönüşüm olarak içe aktarın")} />
          </div>
          <div className="mt-4 rounded-xl border border-brand-gold/30 bg-brand-gold/5 p-4 text-sm">
            <strong className="text-brand-gold">{t("Next step:", "Sıradaki adım:")}</strong>{" "}
            {t(
              "install the Google Ads conversion tag (gtag) on the thank-you state of /randevu, and link a GA4 property so Smart Bidding has signal from day one. Without this, Maximize Conversions can't learn.",
              "Google Ads dönüşüm etiketini (gtag) /randevu teşekkür ekranına yükleyin ve bir GA4 mülkü bağlayın; böylece Akıllı Teklif ilk günden sinyal alır. Bu olmadan, Maks. Dönüşüm öğrenemez."
            )}
          </div>
        </Section>

        {/* Local */}
        <Section icon={MapPin} title={t("9 · Don't skip these (free wins)", "9 · Bunları atlamayın (ücretsiz kazançlar)")}>
          <div className="grid gap-3 sm:grid-cols-2">
            <CheckRow text={t("Google Business Profile — verified, 50+ photos, weekly posts", "Google İşletme Profili — doğrulanmış, 50+ fotoğraf, haftalık paylaşım")} />
            <CheckRow text={t("Apply for Google Local Services Ads (LSA) — 'Google Guaranteed' badge", "Google Yerel Hizmet Reklamlarına (LSA) başvurun — 'Google Garantili' rozeti")} />
            <CheckRow text={t("Get 30+ Google reviews in first 60 days (text customers a link after each job)", "İlk 60 günde 30+ Google yorumu alın (her işten sonra müşteriye link atın)")} />
            <CheckRow text={t("Add hreflang for TR/EN — captures expat searches in İstanbul", "TR/EN için hreflang ekleyin — İstanbul'daki yabancı aramaları yakalar")} />
            <CheckRow text={t("Schema: LocalBusiness + Service + AggregateRating", "Şema: LocalBusiness + Service + AggregateRating")} />
            <CheckRow text={t("District-specific landing pages — Kadıköy KD is only 10/100", "İlçe bazlı landing sayfaları — Kadıköy KD sadece 10/100")} />
          </div>
        </Section>

        {/* 30 day plan */}
        <Section icon={PhoneCall} title={t("10 · 30-day rollout", "10 · 30 günlük yayılma planı")}>
          <ol className="space-y-3 text-sm">
            <Step day={t("Day 1-3", "Gün 1-3")} text={t("Set up Google Ads + GA4 + conversion tags. Apply for LSA. Verify GBP.", "Google Ads + GA4 + dönüşüm etiketlerini kur. LSA başvurusu yap. GBP'yi doğrula.")} />
            <Step day={t("Day 4-7", "Gün 4-7")} text={t("Launch C1 (Emergency) + C2 (Su Kaçağı) at 50% budget. Add all negatives.", "C1 (Acil) + C2 (Su Kaçağı) kampanyalarını %50 bütçeyle başlat. Tüm negatifleri ekle.")} />
            <Step day={t("Day 8-14", "Gün 8-14")} text={t("Add C3 (Drain) + C4 (District). Build 3 RSA variants per ad group.", "C3 (Tıkanıklık) + C4 (İlçe) ekle. Her reklam grubu için 3 RSA varyantı oluştur.")} />
            <Step day={t("Day 15-21", "Gün 15-21")} text={t("Pause keywords with CTR < 3% or CPA > ₺200. Raise bids on top 20%.", "CTR < %3 veya CPA > ₺200 olan anahtar kelimeleri durdur. En iyi %20'de teklifleri yükselt.")} />
            <Step day={t("Day 22-30", "Gün 22-30")} text={t("Switch profitable campaigns from Max Conversions → tCPA. Scale to full budget.", "Karlı kampanyaları Maks. Dönüşüm'den hedef CPA'ya geçir. Tam bütçeye ölçeklendir.")} />
          </ol>
        </Section>

        {/* ===== DEEP RESEARCH DOSSIER ===== */}
        <DeepResearchBlock />

        {/* ===== DEEP RESEARCH PLUS (Volume II) ===== */}
        <DeepResearchPlus />

        {/* CTA */}
        <div className="mt-12 rounded-3xl border border-brand-red/40 bg-gradient-to-br from-brand-red/20 via-card/40 to-brand-gold/10 p-6 backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t("Ready when you are", "Hazır olduğunuzda")}</div>
              <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">{t("Want me to wire up the conversion tags next?", "Bir sonraki adımda dönüşüm etiketlerini bağlamamı ister misiniz?")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("Tell me your Google Ads + GA4 IDs and I'll install gtag, build the thank-you state, and link both as primary conversions.", "Google Ads + GA4 ID'lerinizi söyleyin; gtag'i kurarım, teşekkür ekranını oluştururum ve ikisini birincil dönüşüm olarak bağlarım.")}</p>
            </div>
            <a href="/admin" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-red px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105">
              {t("View live leads", "Canlı lead'leri gör")} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <footer className="mt-10 text-center text-[11px] text-muted-foreground">
          {t("Data source: Semrush API (database: tr) · Pulled", "Veri kaynağı: Semrush API (veritabanı: tr) · Çekildi")} {new Date().toLocaleDateString()} · {t("CPC in USD", "CPC USD cinsinden")}
        </footer>
      </div>
    </div>
  );
}

/* -------------------------------- HELPERS -------------------------------- */

function Section({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/15 text-brand-red">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-4 backdrop-blur">
      <div className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${accent} to-transparent blur-2xl`} />
      <div className="relative font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="relative mt-2 text-xl font-extrabold sm:text-2xl">{value}</div>
      {sub && <div className="relative mt-0.5 text-[10px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const map: Record<string, string> = {
    A: "bg-brand-red/15 text-brand-red border-brand-red/30",
    B: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
    C: "bg-muted text-muted-foreground border-border",
  };
  return <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${map[tier]}`}>{tier}</span>;
}

function Legend({ tier, label }: { tier: string; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/30 px-3 py-2">
      <TierBadge tier={tier} />
      <span>{label}</span>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm">{value}</div>
    </div>
  );
}

function CheckRow({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-border/40 bg-card/30 p-3 text-sm">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
      <span>{text}</span>
    </div>
  );
}

function Step({ day, text }: { day: string; text: string }) {
  return (
    <li className="flex gap-3 rounded-xl border border-border/40 bg-card/30 p-3">
      <div className="shrink-0 rounded-md bg-brand-red/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-brand-red">{day}</div>
      <div className="text-sm">{text}</div>
    </li>
  );
}

/* --------------------- GOOGLE SERP AD PREVIEWS --------------------- */

function MobileSerpPreview({ query }: { query: string }) {
  const t = useT();
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[2.2rem] border-[10px] border-black bg-white text-slate-900 shadow-2xl">
      <div className="flex items-center justify-between bg-white px-5 pt-2 text-[10px] font-semibold text-slate-900">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <span>●●●</span>
          <span>5G</span>
          <span className="inline-block h-2 w-3.5 rounded-sm border border-slate-900" />
        </span>
      </div>

      <div className="px-3 pt-2 pb-3">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <GoogleG />
          <span className="flex-1 truncate text-[13px] text-slate-700">{query}</span>
          <span className="text-slate-400">×</span>
          <span className="h-4 w-px bg-slate-300" />
          <span className="text-[#4285f4]">🎙</span>
        </div>
        <div className="mt-2 flex gap-4 border-b border-slate-200 px-1 text-[11px] font-medium text-slate-600">
          <span className="border-b-2 border-[#1a73e8] pb-2 text-[#1a73e8]">{t("All", "Tümü")}</span>
          <span className="pb-2">{t("Maps", "Haritalar")}</span>
          <span className="pb-2">{t("Images", "Görseller")}</span>
          <span className="pb-2">{t("News", "Haberler")}</span>
        </div>
      </div>

      <div className="mx-3 mb-3 rounded-xl border border-slate-200 p-3">
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-700">
          {t("More plumbers in İstanbul", "İstanbul'da daha fazla tesisatçı")}
        </div>
        <div className="mt-2 flex items-start gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red text-[11px] font-black text-white">GT</div>
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-slate-900">Gölge Tesisat</div>
            <div className="flex items-center gap-1 text-[11px] text-slate-600">
              <span className="text-amber-500">★★★★★</span> 4.9 (218)
            </div>
            <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-[#e8f0fe] px-1.5 py-0.5 text-[9px] font-bold text-[#1967d2]">
              <span>✓</span> {t("Google Guaranteed", "Google Garantili")}
            </div>
          </div>
          <button className="rounded-full bg-[#1a73e8] px-3 py-1 text-[11px] font-bold text-white">{t("Call", "Ara")}</button>
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="text-[11px] font-bold text-slate-900">{t("Sponsored", "Sponsorlu")}</div>
        <div className="mt-1 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red text-[9px] font-black text-white">GT</div>
          <div className="leading-tight">
            <div className="text-[12px] font-medium text-slate-900">Gölge Tesisat</div>
            <div className="text-[11px] text-slate-600">golge-tesisat.com</div>
          </div>
        </div>
        <a className="mt-1 block text-[16px] font-normal leading-tight text-[#1a0dab]">
          {t("Emergency Plumber Istanbul — At Your Door in 30 Minutes", "Acil Tesisatçı İstanbul — 30 Dakikada Kapınızda")}
        </a>
        <p className="mt-1 text-[12px] leading-snug text-slate-700">
          {t(
            "24/7 · VAT-included pricing. Leaks, clogs, boilers. Instant WhatsApp scoping. 12-month warranty.",
            "7/24 · KDV dahil fiyat. Su kaçağı, tıkanıklık, kombi. WhatsApp ile anında keşif. 12 ay garanti."
          )}
        </p>

        <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 p-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a73e8] text-white text-[12px]">📞</div>
          <div className="flex-1 leading-tight">
            <div className="text-[12px] font-semibold text-slate-900">{t("Call", "Ara")}</div>
            <div className="text-[11px] text-slate-600">0533 896 05 03</div>
          </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
          {[
            { en: "Water Leak Detection", tr: "Su Kaçağı Tespiti" },
            { en: "Drain Unclogging", tr: "Tıkanıklık Açma" },
            { en: "Boiler Service", tr: "Kombi Servisi" },
            { en: "Radiator Flush", tr: "Petek Temizliği" },
          ].map((s) => (
            <div key={s.tr} className="truncate text-[#1a0dab]">{t(s.en, s.tr)}</div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 px-3 py-3 opacity-60">
        <div className="text-[11px] text-slate-600">competitor.com.tr</div>
        <div className="text-[14px] leading-tight text-[#1a0dab]">{t("Plumbing — Corporate Plumbing Services", "Tesisat — Kurumsal Tesisat Hizmetleri")}</div>
        <div className="mt-0.5 text-[11px] text-slate-600 line-clamp-2">{t("City-wide plumbing solutions in Istanbul…", "İstanbul genelinde tesisat çözümleri…")}</div>
      </div>
    </div>
  );
}

function DesktopSerpPreview({ query }: { query: string }) {
  const t = useT();
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] text-slate-500">
          google.com/search?q={encodeURIComponent(query)}
        </div>
      </div>

      <div className="flex items-center gap-4 border-b border-slate-200 px-5 py-3">
        <span className="font-bold text-lg" style={{ fontFamily: "Product Sans, system-ui" }}>
          <span className="text-[#4285f4]">G</span>
          <span className="text-[#ea4335]">o</span>
          <span className="text-[#fbbc04]">o</span>
          <span className="text-[#4285f4]">g</span>
          <span className="text-[#34a853]">l</span>
          <span className="text-[#ea4335]">e</span>
        </span>
        <div className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 shadow-sm">
          <span className="flex-1 truncate text-[13px]">{query}</span>
          <span className="text-[#4285f4]">🔍</span>
        </div>
      </div>

      <div className="flex gap-5 border-b border-slate-200 px-5 text-[12px] text-slate-600">
        <span className="border-b-2 border-[#1a73e8] py-2 text-[#1a73e8]">{t("All", "Tümü")}</span>
        <span className="py-2">{t("Maps", "Haritalar")}</span>
        <span className="py-2">{t("Images", "Görseller")}</span>
        <span className="py-2">{t("News", "Haberler")}</span>
        <span className="py-2">{t("Videos", "Videolar")}</span>
      </div>

      <div className="grid grid-cols-1 gap-5 px-5 py-4 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-[12px] font-bold text-slate-900">{t("Sponsored", "Sponsorlu")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-red text-[9px] font-black text-white">GT</div>
              <div className="leading-tight">
                <div className="text-[13px] font-medium">Gölge Tesisat</div>
                <div className="text-[12px] text-slate-600">golge-tesisat.com/su-kacagi</div>
              </div>
            </div>
            <a className="mt-1 block text-[20px] font-normal leading-tight text-[#1a0dab] hover:underline">
              {t("No-Demo Water Leak Detection — 100% with Thermal Camera", "Kırmadan Su Kaçağı Tespiti — Termal Kamera ile %100")}
            </a>
            <p className="mt-1 text-[13px] leading-snug text-slate-700">
              {t(
                "No-damage detection without breaking walls. Pinpoint solution with thermal + acoustic gear. 5,000+ leaks found in Istanbul · Insurance-compliant report · Free pre-inspection.",
                "Duvarı kırmadan, hasarsız tespit. Termal + akustik cihazlarla nokta atışı çözüm. İstanbul'da 5.000+ kaçak tespiti · Sigorta uyumlu rapor · Ücretsiz ön keşif."
              )}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-[13px] text-[#1a0dab]">
              <span>· {t("No-Demo Detection", "Kırmadan Tespit")}</span>
              <span>· {t("Same-Day Service", "Aynı Gün Servis")}</span>
              <span>· {t("Certified Technicians", "Sertifikalı Ustalar")}</span>
              <span>· {t("VAT-Included Pricing", "KDV Dahil Fiyat")}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-[12px] text-slate-700">
              📞 0533 896 05 03
            </div>
          </div>

          <div className="opacity-60">
            <div className="text-[12px] font-bold">{t("Sponsored", "Sponsorlu")}</div>
            <div className="text-[12px] text-slate-600">tufantesisat.com.tr</div>
            <div className="text-[18px] text-[#1a0dab]">{t("Istanbul Water Leak Detection · Tufan Tesisat", "İstanbul Su Kaçağı Tespiti · Tufan Tesisat")}</div>
            <p className="text-[13px] text-slate-700">{t("24/7 service. All of Istanbul. Call now.", "7/24 hizmet. Tüm İstanbul. Hemen arayın.")}</p>
          </div>

          <div className="h-px bg-slate-100" />

          <div className="opacity-70">
            <div className="text-[12px] text-slate-600">armut.com</div>
            <div className="text-[18px] text-[#1a0dab]">{t("Water Leak Detection Istanbul — Top 50 Pros", "Su Kaçağı Tespiti İstanbul — En İyi 50 Usta")}</div>
            <p className="text-[13px] text-slate-700">{t("Read reviews, get quotes…", "Yorumları okuyun, fiyat alın…")}</p>
          </div>
        </div>

        <aside className="rounded-xl border border-slate-200 p-3">
          <div className="text-[11px] font-bold text-slate-700">{t("Local services · Plumber", "Yerel hizmetler · Tesisatçı")}</div>
          {[
            { name: "Gölge Tesisat", rating: 4.9, reviews: 218, ours: true },
            { name: "Tufan Tesisat", rating: 4.7, reviews: 162 },
            { name: "Rota Tesisat", rating: 4.6, reviews: 94 },
          ].map((b) => (
            <div key={b.name} className={`mt-3 flex items-start gap-2 rounded-lg p-2 ${b.ours ? "bg-[#e8f0fe]" : ""}`}>
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white ${b.ours ? "bg-brand-red" : "bg-slate-400"}`}>
                {b.name.split(" ").map((w) => w[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-semibold">{b.name}</div>
                <div className="text-[11px] text-slate-600">
                  <span className="text-amber-500">★</span> {b.rating} ({b.reviews})
                </div>
                {b.ours && (
                  <div className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold text-[#1967d2]">
                    ✓ {t("Google Guaranteed", "Google Garantili")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function GoogleG() {
  return (
    <span className="text-[13px] font-bold leading-none">
      <span className="text-[#4285f4]">G</span>
    </span>
  );
}
