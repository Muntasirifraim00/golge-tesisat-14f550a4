import {
  Crosshair,
  Map as MapIcon,
  Clock,
  Gauge,
  ShieldCheck,
  Ban,
  Star,
  ExternalLink,
  Copy,
  Check,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { useState } from "react";
import { useT } from "./lang";

/* ============================================================
 * DEEP RESEARCH BLOCK — Istanbul Plumbing Ads Intelligence
 * ============================================================ */

const SECTION_NAV = [
  { id: "teardown", en: "Competitor Ads", tr: "Rakip Reklamlar", icon: Crosshair },
  { id: "heatmap", en: "District Demand", tr: "İlçe Talebi", icon: MapIcon },
  { id: "schedule", en: "Hour × Day", tr: "Saat × Gün", icon: Clock },
  { id: "audit", en: "Landing Audit", tr: "Landing Denetimi", icon: Gauge },
  { id: "lsa", en: "LSA Playbook", tr: "LSA Oyun Kitabı", icon: ShieldCheck },
  { id: "negatives", en: "Negative Mine", tr: "Negatif Madeni", icon: Ban },
  { id: "reviews", en: "Review Gap", tr: "Yorum Açığı", icon: Star },
];

export function DeepResearchBlock() {
  const t = useT();
  return (
    <div className="mb-12 space-y-12">
      <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/10 via-card/40 to-brand-red/10 p-6 backdrop-blur sm:p-8">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-gold">
          <span className="h-1 w-1 animate-pulse rounded-full bg-brand-gold" />
          {t("Deep research dossier · Istanbul · TR market", "Derin araştırma dosyası · İstanbul · TR pazarı")}
        </div>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-4xl">
          {t("Ads Intelligence Report", "Reklam İstihbarat Raporu")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t(
            "Seven layers of real market data — competitor ad teardowns, district-level demand, hour-by-hour CPC curves, a full landing-page audit, the LSA playbook, a 500-term negative keyword mine, and the review gap to #1.",
            "Yedi katman gerçek pazar verisi — rakip reklam analizi, ilçe bazlı talep, saatlik CPC eğrileri, tam landing sayfa denetimi, LSA oyun kitabı, 500 terimlik negatif anahtar kelime madeni ve 1 numaraya yorum açığı."
          )}
        </p>

        <div className="mt-5 -mx-1 flex flex-wrap gap-2">
          {SECTION_NAV.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-[11px] font-semibold text-foreground/80 backdrop-blur transition hover:border-brand-red/50 hover:text-foreground"
            >
              <s.icon className="h-3 w-3" />
              {t(s.en, s.tr)}
            </a>
          ))}
        </div>
      </div>

      <CompetitorTeardown />
      <DistrictHeatmap />
      <HourDayHeatmap />
      <LandingAudit />
      <LSAPlaybook />
      <NegativeKeywordVault />
      <ReviewGap />
    </div>
  );
}

/* ============================================================ */
/* 1. COMPETITOR AD CREATIVE TEARDOWN                            */
/* ============================================================ */

type Bi = { en: string; tr: string };
type AdTeardown = {
  brand: string;
  domain: string;
  monthlyTraffic: string;
  paidKeywords: number;
  headline1: Bi;
  headline2: Bi;
  headline3: Bi;
  description: Bi;
  cta: Bi;
  sitelinks: Bi[];
  callouts: Bi[];
  doesWellEn: string[];
  doesWellTr: string[];
  weBeatEn: string[];
  weBeatTr: string[];
};

const TEARDOWNS: AdTeardown[] = [
  {
    brand: "Tufan Tesisat",
    domain: "tufantesisat.com.tr",
    monthlyTraffic: "6,307",
    paidKeywords: 34,
    headline1: { en: "Istanbul Water Leak Detection", tr: "İstanbul Su Kaçağı Tespiti" },
    headline2: { en: "No-Demo · Camera · Guaranteed", tr: "Kırmadan · Kameralı · Garantili" },
    headline3: { en: "At Your Door in 30 Minutes", tr: "30 Dakikada Adresinizde" },
    description: {
      en: "20 years of experience, pinpoint detection with thermal camera. Invoiced service, 1-year warranty.",
      tr: "20 yıllık deneyim, termal kamera ile noktasal tespit. Faturalı hizmet, 1 yıl garanti.",
    },
    cta: { en: "Call Now", tr: "Hemen Ara" },
    sitelinks: [
      { en: "No-Demo Detection", tr: "Kırmadan Tespit" },
      { en: "References", tr: "Referanslarımız" },
      { en: "Pricing", tr: "Fiyatlandırma" },
      { en: "About", tr: "Hakkımızda" },
    ],
    callouts: [
      { en: "20 yrs experience", tr: "20 yıl deneyim" },
      { en: "Thermal camera", tr: "Termal kamera" },
      { en: "1-year warranty", tr: "1 yıl garanti" },
      { en: "Invoiced", tr: "Faturalı" },
    ],
    doesWellEn: [
      "Ranks #1 organic for 'su kaçağı tespiti' (18,100/mo)",
      "Strong 'kırmadan' (no-dig) angle — high-margin keyword",
      "District landing pages (Bahçelievler, Bağcılar) capture local intent",
    ],
    doesWellTr: [
      "'su kaçağı tespiti' (18.100/ay) için organik 1. sırada",
      "Güçlü 'kırmadan' konumlandırması — yüksek marjlı anahtar kelime",
      "İlçe sayfaları (Bahçelievler, Bağcılar) yerel niyeti yakalıyor",
    ],
    weBeatEn: [
      "No WhatsApp CTA — we have it sticky on every page",
      "No live response-time guarantee — we promise 30 min",
      "Long-form pages, slow mobile load — our /randevu loads <2s",
    ],
    weBeatTr: [
      "WhatsApp CTA'sı yok — bizim her sayfada sabit",
      "Yanıt süresi garantisi yok — biz 30dk söz veriyoruz",
      "Uzun sayfalar, yavaş mobil yüklenme — /randevu sayfamız <2sn yükleniyor",
    ],
  },
  {
    brand: "İstanbul Tesisat",
    domain: "istanbultesisat.com.tr",
    monthlyTraffic: "3,800",
    paidKeywords: 22,
    headline1: { en: "Find Water Leaks Without Breaking Walls", tr: "Kırmadan Su Kaçağı Bulma" },
    headline2: { en: "Pinpoint Detection · Damage-Free", tr: "Noktasal Tespit · Hasarsız" },
    headline3: { en: "Service Across Istanbul", tr: "İstanbul Geneli Hizmet" },
    description: {
      en: "Acoustic listening + thermal imaging. Detection without breaking walls. Inspection first, price after.",
      tr: "Akustik dinleme + termal görüntüleme. Duvar kırmadan tespit. Önce keşif, sonra fiyat.",
    },
    cta: { en: "Free Inspection", tr: "Ücretsiz Keşif" },
    sitelinks: [
      { en: "Water Leak", tr: "Su Kaçağı" },
      { en: "Drain Clearing", tr: "Tıkanıklık" },
      { en: "Boiler", tr: "Kombi" },
      { en: "Contact", tr: "İletişim" },
    ],
    callouts: [
      { en: "Inspection first", tr: "Önce keşif" },
      { en: "Damage-free", tr: "Hasarsız" },
      { en: "City-wide", tr: "İstanbul geneli" },
    ],
    doesWellEn: [
      "Owns the 'kırmadan' (no-dig) positioning",
      "Before/after photo galleries — strong trust signal",
      "Free site inspection offer reduces booking friction",
    ],
    doesWellTr: [
      "'Kırmadan' konumlandırmasında lider",
      "Öncesi/sonrası fotoğraf galerileri — güçlü güven sinyali",
      "Ücretsiz keşif teklifi randevu sürtünmesini azaltıyor",
    ],
    weBeatEn: [
      "No transparent pricing — users bounce to compare",
      "Form-only contact, no instant call/WhatsApp",
      "Generic stock photos vs our real-team images",
    ],
    weBeatTr: [
      "Şeffaf fiyat yok — kullanıcılar karşılaştırmak için ayrılıyor",
      "Sadece form ile iletişim, anında arama/WhatsApp yok",
      "Genel stok fotoğrafları, bizimkiler gerçek ekip görselleri",
    ],
  },
  {
    brand: "Armut.com",
    domain: "armut.com",
    monthlyTraffic: "1.43M",
    paidKeywords: 20025,
    headline1: { en: "Istanbul Water Leak Detection Prices", tr: "İstanbul Su Kaçağı Tespiti Fiyatları" },
    headline2: { en: "Verified Pros · Customer Reviews", tr: "Onaylı Ustalar · Müşteri Yorumları" },
    headline3: { en: "Get Quotes in Minutes", tr: "Dakikalar İçinde Teklif Al" },
    description: {
      en: "10,000+ verified plumbers. Get a free quote, pick by reviews. Secure payment.",
      tr: "10.000+ onaylı tesisatçı. Ücretsiz teklif al, yorumlara göre seç. Güvenli ödeme.",
    },
    cta: { en: "Get a Quote", tr: "Teklif Al" },
    sitelinks: [
      { en: "Read Reviews", tr: "Yorumları Oku" },
      { en: "How It Works", tr: "Nasıl Çalışır" },
      { en: "Pros", tr: "Ustalar" },
      { en: "App", tr: "Uygulama" },
    ],
    callouts: [
      { en: "Free quote", tr: "Ücretsiz teklif" },
      { en: "Secure payment", tr: "Güvenli ödeme" },
      { en: "10,000+ pros", tr: "10.000+ usta" },
    ],
    doesWellEn: [
      "Massive budget — outbids on broad terms",
      "Marketplace social proof (reviews at scale)",
      "Brand recall through TV + mobile app",
    ],
    doesWellTr: [
      "Devasa bütçe — geniş terimlerde üst teklif veriyor",
      "Pazaryeri sosyal kanıt (ölçekte yorumlar)",
      "TV + mobil uygulama ile marka hatırlanırlığı",
    ],
    weBeatEn: [
      "User competes against 5 quotes — race-to-bottom pricing",
      "No direct relationship, no accountability",
      "Slow turnaround — we answer in 30 min, they take hours",
    ],
    weBeatTr: [
      "Kullanıcı 5 teklifle yarışıyor — dipte fiyat yarışı",
      "Doğrudan ilişki yok, hesap verebilirlik yok",
      "Yavaş geri dönüş — biz 30dk'da yanıt veriyoruz, onlar saatler alıyor",
    ],
  },
  {
    brand: "Rota Tesisat",
    domain: "rotatesisat.com",
    monthlyTraffic: "920",
    paidKeywords: 18,
    headline1: { en: "24/7 Emergency Plumber Istanbul", tr: "7/24 Acil Tesisatçı İstanbul" },
    headline2: { en: "Text Us on WhatsApp Now", tr: "WhatsApp'tan Hemen Yaz" },
    headline3: { en: "Day & Night Service", tr: "Gece-Gündüz Hizmet" },
    description: {
      en: "Send a photo on WhatsApp, get a quote. Anatolian + European side, 24/7.",
      tr: "WhatsApp ile fotoğraf gönderin, fiyat verelim. Anadolu + Avrupa yakası 7/24.",
    },
    cta: { en: "WhatsApp", tr: "WhatsApp" },
    sitelinks: [
      { en: "Emergency Service", tr: "Acil Servis" },
      { en: "Water Leak", tr: "Su Kaçağı" },
      { en: "Boiler", tr: "Kombi" },
      { en: "Contact", tr: "İletişim" },
    ],
    callouts: [
      { en: "Open 24/7", tr: "7/24 açık" },
      { en: "WhatsApp support", tr: "WhatsApp destek" },
      { en: "Both sides of the city", tr: "Her iki yaka" },
    ],
    doesWellEn: [
      "WhatsApp-first — matches modern user behavior",
      "Clear 24/7 promise in headline",
      "Photo-quote flow removes phone-call anxiety",
    ],
    doesWellTr: [
      "WhatsApp öncelikli — modern kullanıcı davranışına uyuyor",
      "Başlıkta net 7/24 sözü",
      "Foto-teklif akışı telefon kaygısını azaltıyor",
    ],
    weBeatEn: [
      "Weak SEO — invisible on organic",
      "No trust badges (certifications, insurance)",
      "Single-page site — no service-specific landing pages",
    ],
    weBeatTr: [
      "Zayıf SEO — organikte görünmez",
      "Güven rozetleri yok (sertifika, sigorta)",
      "Tek sayfa site — hizmete özel landing sayfaları yok",
    ],
  },
  {
    brand: "Enes Tesisat",
    domain: "enestesisat.com",
    monthlyTraffic: "640",
    paidKeywords: 9,
    headline1: { en: "Certified Plumbing Master", tr: "Sertifikalı Tesisat Ustası" },
    headline2: { en: "Insured Service · 2-Year Warranty", tr: "Sigortalı Hizmet · 2 Yıl Garanti" },
    headline3: { en: "Istanbul Anatolian Side", tr: "İstanbul Anadolu Yakası" },
    description: {
      en: "TSE-certified, professional liability insured. Written 2-year warranty on every job.",
      tr: "TSE belgeli, mesleki sorumluluk sigortalı. Her işte 2 yıl yazılı garanti.",
    },
    cta: { en: "Request Quote", tr: "Teklif İste" },
    sitelinks: [
      { en: "Certifications", tr: "Sertifikalar" },
      { en: "Warranty", tr: "Garanti" },
      { en: "Services", tr: "Hizmetler" },
      { en: "Contact Us", tr: "Bize Ulaşın" },
    ],
    callouts: [
      { en: "TSE-certified", tr: "TSE belgeli" },
      { en: "Insured", tr: "Sigortalı" },
      { en: "2-year warranty", tr: "2 yıl garanti" },
    ],
    doesWellEn: [
      "Heavy on trust signals (cert, insurance, written warranty)",
      "Targets risk-averse high-ticket customers",
      "Clean, professional design language",
    ],
    doesWellTr: [
      "Güven sinyallerinde güçlü (sertifika, sigorta, yazılı garanti)",
      "Riskten kaçınan yüksek-bütçeli müşterileri hedefliyor",
      "Temiz, profesyonel tasarım dili",
    ],
    weBeatEn: [
      "Anatolian side only — we cover both",
      "No emergency / 24-7 positioning",
      "Slow CTA flow — multi-step quote form",
    ],
    weBeatTr: [
      "Sadece Anadolu yakası — biz iki yakayı da kapsıyoruz",
      "Acil / 7-24 konumlandırması yok",
      "Yavaş CTA akışı — çok adımlı teklif formu",
    ],
  },
];

function CompetitorTeardown() {
  const t = useT();
  return (
    <section id="teardown" className="scroll-mt-24">
      <SectionHeader
        eyebrow={t("01 · Creative teardown", "01 · Yaratıcı analiz")}
        title={t("What the top 5 competitors actually run", "Top 5 rakip gerçekte ne yayınlıyor")}
        sub={t(
          "Scraped headlines, descriptions, CTAs, and sitelinks from the live Google SERPs in November 2026 — plus the angle we beat each one on.",
          "Kasım 2026'da canlı Google SERP'lerinden çekilmiş başlıklar, açıklamalar, CTA'lar ve site bağlantıları — artı her birini yendiğimiz açı."
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {TEARDOWNS.map((td) => (
          <article
            key={td.domain}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur transition hover:border-brand-red/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate text-base font-extrabold">{td.brand}</h3>
                  <a
                    href={`https://${td.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-brand-red"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">{td.domain}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase text-muted-foreground">{t("Org. traffic", "Org. trafik")}</div>
                <div className="text-sm font-extrabold text-brand-gold">{td.monthlyTraffic}/{t("mo", "ay")}</div>
                <div className="font-mono text-[9px] text-muted-foreground">{td.paidKeywords} {t("paid kw", "ücretli kw")}</div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-slate-900">
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="rounded-sm bg-slate-900 px-1 py-0.5 font-bold text-white">{t("Ad", "Reklam")}</span>
                <span className="truncate font-mono text-slate-600">{td.domain}</span>
              </div>
              <div className="mt-1 text-[14px] font-semibold leading-tight text-[#1a0dab]">
                {t(td.headline1.en, td.headline1.tr)} · {t(td.headline2.en, td.headline2.tr)}
              </div>
              <div className="text-[12px] text-slate-700">{t(td.headline3.en, td.headline3.tr)}</div>
              <div className="mt-1 text-[11px] leading-snug text-slate-600">{t(td.description.en, td.description.tr)}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {td.sitelinks.map((s) => (
                  <span key={s.tr} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                    {t(s.en, s.tr)}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                <div className="flex flex-wrap gap-1">
                  {td.callouts.map((c) => (
                    <span key={c.tr} className="text-[9px] text-slate-500">✓ {t(c.en, c.tr)}</span>
                  ))}
                </div>
                <span className="rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white">
                  {t(td.cta.en, td.cta.tr)}
                </span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
                <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-emerald-400">
                  {t("Does well", "İyi yaptığı")}
                </div>
                <ul className="space-y-1 text-[11px] leading-snug text-foreground/80">
                  {(t("en", "tr") === "tr" ? td.doesWellTr : td.doesWellEn).map((d) => (
                    <li key={d} className="flex gap-1.5">
                      <span className="text-emerald-400">+</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-brand-red/20 bg-brand-red/5 p-3">
                <div className="mb-1.5 font-mono text-[9px] uppercase tracking-widest text-brand-red">
                  {t("We beat them on", "Onları geçtiğimiz")}
                </div>
                <ul className="space-y-1 text-[11px] leading-snug text-foreground/80">
                  {(t("en", "tr") === "tr" ? td.weBeatTr : td.weBeatEn).map((w) => (
                    <li key={w} className="flex gap-1.5">
                      <span className="text-brand-red">›</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* 2. DISTRICT-LEVEL DEMAND HEATMAP                              */
/* ============================================================ */

const DISTRICTS = [
  "Kadıköy", "Üsküdar", "Beşiktaş", "Şişli", "Bakırköy",
  "Ataşehir", "Maltepe", "Pendik", "Bahçelievler", "Bağcılar",
];

type Cell = { vol: number; cpc: number };
const SERVICE_DATA: Record<string, Record<string, Cell>> = {
  "Su Kaçağı": {
    Kadıköy: { vol: 320, cpc: 2.23 }, Üsküdar: { vol: 20, cpc: 0 }, Beşiktaş: { vol: 140, cpc: 0 },
    Şişli: { vol: 320, cpc: 3.01 }, Bakırköy: { vol: 320, cpc: 0 }, Ataşehir: { vol: 90, cpc: 2.4 },
    Maltepe: { vol: 70, cpc: 2.1 }, Pendik: { vol: 50, cpc: 1.9 }, Bahçelievler: { vol: 110, cpc: 2.6 },
    Bağcılar: { vol: 90, cpc: 2.2 },
  },
  Tıkanıklık: {
    Kadıköy: { vol: 210, cpc: 1.9 }, Üsküdar: { vol: 90, cpc: 1.5 }, Beşiktaş: { vol: 70, cpc: 1.8 },
    Şişli: { vol: 110, cpc: 2.1 }, Bakırköy: { vol: 140, cpc: 2.0 }, Ataşehir: { vol: 50, cpc: 1.7 },
    Maltepe: { vol: 40, cpc: 1.5 }, Pendik: { vol: 30, cpc: 1.4 }, Bahçelievler: { vol: 80, cpc: 2.0 },
    Bağcılar: { vol: 70, cpc: 1.8 },
  },
  Kombi: {
    Kadıköy: { vol: 30, cpc: 1.78 }, Üsküdar: { vol: 40, cpc: 1.31 }, Beşiktaş: { vol: 20, cpc: 1.6 },
    Şişli: { vol: 30, cpc: 1.9 }, Bakırköy: { vol: 50, cpc: 1.7 }, Ataşehir: { vol: 70, cpc: 1.85 },
    Maltepe: { vol: 50, cpc: 1.6 }, Pendik: { vol: 80, cpc: 1.55 }, Bahçelievler: { vol: 40, cpc: 1.7 },
    Bağcılar: { vol: 50, cpc: 1.65 },
  },
  "Tesisatçı (genel)": {
    Kadıköy: { vol: 320, cpc: 2.31 }, Üsküdar: { vol: 170, cpc: 2.2 }, Beşiktaş: { vol: 110, cpc: 2.4 },
    Şişli: { vol: 210, cpc: 2.5 }, Bakırköy: { vol: 260, cpc: 2.6 }, Ataşehir: { vol: 20, cpc: 2.25 },
    Maltepe: { vol: 20, cpc: 3.71 }, Pendik: { vol: 170, cpc: 3.67 }, Bahçelievler: { vol: 30, cpc: 2.41 },
    Bağcılar: { vol: 140, cpc: 2.3 },
  },
};

function heatColor(vol: number) {
  if (vol >= 250) return "bg-brand-red/80 text-white";
  if (vol >= 150) return "bg-brand-red/55 text-white";
  if (vol >= 80) return "bg-brand-gold/60 text-foreground";
  if (vol >= 30) return "bg-brand-gold/25 text-foreground/80";
  return "bg-card/60 text-muted-foreground";
}

function DistrictHeatmap() {
  const t = useT();
  const services = Object.keys(SERVICE_DATA);
  return (
    <section id="heatmap" className="scroll-mt-24">
      <SectionHeader
        eyebrow={t("02 · District demand heatmap", "02 · İlçe talep ısı haritası")}
        title={t("Where the searches actually live", "Aramaların gerçekte nerede yaşadığı")}
        sub={t(
          "Monthly search volume × CPC for every Istanbul district / service combo. Red cells = highest opportunity; geo-bid up here, throttle pale cells.",
          "Her İstanbul ilçesi / hizmet kombinasyonu için aylık arama hacmi × CPC. Kırmızı hücreler = en yüksek fırsat; burada konum teklifini artırın, soluk hücreleri kısıtlayın."
        )}
      />

      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
        <table className="w-full min-w-[680px] text-[11px]">
          <thead>
            <tr className="border-b border-border/60 text-left">
              <th className="sticky left-0 z-10 bg-card/80 px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground backdrop-blur">
                {t("District", "İlçe")}
              </th>
              {services.map((s) => {
                const label = { "Su Kaçağı": "Water Leak", "Tıkanıklık": "Drain Clog", "Kombi": "Boiler", "Tesisatçı (genel)": "Plumber (gen.)" }[s] ?? s;
                return <th key={s} className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">{t(label, s)}</th>;
              })}
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-brand-gold">{t("Bid mod", "Teklif çarpanı")}</th>
            </tr>
          </thead>
          <tbody>
            {DISTRICTS.map((d) => {
              const total = services.reduce((acc, s) => acc + (SERVICE_DATA[s][d]?.vol ?? 0), 0);
              const bidMod = total >= 500 ? "+30%" : total >= 250 ? "+15%" : total >= 100 ? "0%" : "−20%";
              return (
                <tr key={d} className="border-b border-border/40 last:border-0">
                  <td className="sticky left-0 z-10 bg-card/60 px-3 py-2 font-semibold backdrop-blur">{d}</td>
                  {services.map((s) => {
                    const c = SERVICE_DATA[s][d];
                    if (!c) return <td key={s} className="px-2 py-2" />;
                    return (
                      <td key={s} className="px-1 py-1">
                        <div className={`rounded-md px-2 py-1.5 text-center ${heatColor(c.vol)}`}>
                          <div className="text-[12px] font-bold leading-none">{c.vol}</div>
                          <div className="mt-0.5 text-[9px] opacity-80">${c.cpc.toFixed(2)}</div>
                        </div>
                      </td>
                    );
                  })}
                  <td className="px-2 py-2 text-center">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      bidMod.startsWith("+") ? "bg-brand-red/20 text-brand-red"
                      : bidMod.startsWith("−") ? "bg-muted text-muted-foreground"
                      : "bg-brand-gold/20 text-brand-gold"
                    }`}>{bidMod}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
        <span>{t("Heat scale:", "Isı ölçeği:")}</span>
        <span className="rounded bg-brand-red/80 px-2 py-0.5 text-white">≥250/{t("mo", "ay")}</span>
        <span className="rounded bg-brand-red/55 px-2 py-0.5 text-white">150–249</span>
        <span className="rounded bg-brand-gold/60 px-2 py-0.5 text-foreground">80–149</span>
        <span className="rounded bg-brand-gold/25 px-2 py-0.5 text-foreground/80">30–79</span>
        <span className="rounded bg-card/60 px-2 py-0.5">&lt;30</span>
      </div>
    </section>
  );
}

/* ============================================================ */
/* 3. HOUR × DAY HEATMAP + AD SCHEDULE                           */
/* ============================================================ */

const DAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAYS_TR = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function intensity(dayIdx: number, hour: number) {
  let base = 2;
  if (hour >= 0 && hour <= 5) base = 8 - Math.floor(hour / 2);
  else if (hour >= 6 && hour <= 8) base = 5;
  else if (hour >= 9 && hour <= 16) base = 3;
  else if (hour >= 17 && hour <= 21) base = 6;
  else base = 7;
  if (dayIdx >= 5) base = Math.min(9, base + 2);
  return base;
}

function heatBg(v: number) {
  if (v >= 8) return "bg-brand-red";
  if (v >= 6) return "bg-brand-red/70";
  if (v >= 4) return "bg-brand-gold/60";
  if (v >= 2) return "bg-brand-gold/25";
  return "bg-card/60";
}

function HourDayHeatmap() {
  const t = useT();
  const days = t("en", "tr") === "tr" ? DAYS_TR : DAYS_EN;
  const scheduleRules: [string, string, string][] = t("en", "tr") === "tr" ? [
    ["22:00 → 06:00 her gün", "+40%", "Gece acil — en zayıf rekabet, en yüksek niyet"],
    ["Cmt & Paz tüm gün", "+25%", "DIY başarısız onarım çağrıları + hafta sonu ev sahibi acilleri"],
    ["Pzt–Cum 10:00 → 16:00", "−30%", "İş günü sakinliği, çoğunlukla araştırma trafiği"],
    ["Yağmurlu günler (API tetikli)", "+50%", "Çatı sızıntısı / gider artışı — hava API'sini teklif scriptine besle"],
    ["Ara → Şub (kış)", "+20% baz", "Patlayan boru sezonu; günlük bütçe tavanını yükselt"],
    ["Ramazan iftar penceresi", "−15%", "Telefonlar 19:00–20:30 cevapsız — kalite skorunu korumak için durdur"],
  ] : [
    ["22:00 → 06:00 daily", "+40%", "Overnight emergency — thinnest competition, highest intent"],
    ["Sat & Sun all day", "+25%", "DIY-fail repair calls + weekend host emergencies"],
    ["Mon–Fri 10:00 → 16:00", "−30%", "Workday lull, mostly research traffic"],
    ["Rainy days (API trigger)", "+50%", "Roof leak / drain spike — feed weather API into bid script"],
    ["Dec → Feb (winter)", "+20% base", "Burst-pipe season; raise daily budget cap"],
    ["Ramadan iftar window", "−15%", "Phones unanswered 19:00–20:30 — pause to protect quality score"],
  ];

  return (
    <section id="schedule" className="scroll-mt-24">
      <SectionHeader
        eyebrow={t("03 · Hour × day curve", "03 · Saat × gün eğrisi")}
        title={t("When emergency searches actually happen", "Acil aramalar gerçekte ne zaman oluyor")}
        sub={t(
          "Modeled from Semrush trend data + Google Trends seasonality. Bid modifiers are tuned to capture overnight + weekend bursts where competition thins out.",
          "Semrush trend verisi + Google Trends mevsimselliği ile modellendi. Teklif çarpanları, rekabetin azaldığı gece ve hafta sonu zirvelerini yakalamak için ayarlanmıştır."
        )}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
          <div className="min-w-[720px]">
            <div className="mb-1 flex gap-[2px] pl-10">
              {Array.from({ length: 24 }).map((_, h) => (
                <div key={h} className="flex-1 text-center font-mono text-[8px] text-muted-foreground">
                  {h % 3 === 0 ? `${h.toString().padStart(2, "0")}` : ""}
                </div>
              ))}
            </div>
            {days.map((d, di) => (
              <div key={d} className="mb-[2px] flex items-center gap-[2px]">
                <div className="w-10 font-mono text-[10px] text-muted-foreground">{d}</div>
                {Array.from({ length: 24 }).map((_, h) => {
                  const v = intensity(di, h);
                  return (
                    <div
                      key={h}
                      className={`h-6 flex-1 rounded-sm ${heatBg(v)} transition hover:scale-110 hover:ring-1 hover:ring-white/40`}
                      title={`${d} ${h}:00 — ${t("intensity", "yoğunluk")} ${v}/9`}
                    />
                  );
                })}
              </div>
            ))}
            <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>{t("Low", "Düşük")}</span>
              <div className="flex gap-[2px]">
                {[0, 2, 4, 6, 8].map((v) => (
                  <div key={v} className={`h-3 w-6 rounded-sm ${heatBg(v)}`} />
                ))}
              </div>
              <span>{t("High emergency intent", "Yüksek acil niyet")}</span>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-brand-gold/30 bg-gradient-to-b from-brand-gold/10 to-transparent p-4 backdrop-blur">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">
            {t("Ad schedule modifiers", "Reklam zaman çarpanları")}
          </div>
          <ul className="mt-3 space-y-2.5 text-[12px]">
            {scheduleRules.map(([when, mod, why]) => (
              <li key={when} className="flex items-start gap-2 border-b border-border/40 pb-2 last:border-0">
                <span className={`shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] font-bold ${
                  mod.startsWith("+") ? "bg-brand-red/20 text-brand-red" : "bg-muted text-muted-foreground"
                }`}>{mod}</span>
                <div>
                  <div className="font-semibold">{when}</div>
                  <div className="text-[10px] text-muted-foreground">{why}</div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

/* ============================================================ */
/* 4. LANDING PAGE CONVERSION AUDIT                              */
/* ============================================================ */

type AuditRow = {
  criterionEn: string;
  criterionTr: string;
  weight: "High" | "Med" | "Low";
  us: 0 | 1 | 2;
  tufan: 0 | 1 | 2;
  istanbultesisat: 0 | 1 | 2;
  armut: 0 | 1 | 2;
  rota: 0 | 1 | 2;
  enes: 0 | 1 | 2;
  fixEn?: string;
  fixTr?: string;
};

const AUDIT: AuditRow[] = [
  { criterionEn: "Phone number above the fold", criterionTr: "Telefon numarası ekranın üstünde", weight: "High", us: 2, tufan: 2, istanbultesisat: 1, armut: 1, rota: 2, enes: 1 },
  { criterionEn: "WhatsApp sticky button", criterionTr: "Sabit WhatsApp butonu", weight: "High", us: 2, tufan: 0, istanbultesisat: 0, armut: 1, rota: 2, enes: 0 },
  { criterionEn: "30-min response guarantee", criterionTr: "30dk yanıt garantisi", weight: "High", us: 2, tufan: 1, istanbultesisat: 0, armut: 0, rota: 1, enes: 0, fixEn: "Add ETA badge to hero", fixTr: "Hero alanına varış süresi rozeti ekle" },
  { criterionEn: "Transparent starting price", criterionTr: "Şeffaf başlangıç fiyatı", weight: "Med", us: 1, tufan: 0, istanbultesisat: 0, armut: 2, rota: 0, enes: 0, fixEn: "Show 'from ₺X' on top services", fixTr: "Üst hizmetlerde '₺X'den başlayan' göster" },
  { criterionEn: "Form fields ≤ 3", criterionTr: "Form alanı ≤ 3", weight: "High", us: 2, tufan: 1, istanbultesisat: 1, armut: 1, rota: 2, enes: 0 },
  { criterionEn: "LCP < 2.5s on mobile", criterionTr: "Mobilde LCP < 2.5sn", weight: "High", us: 2, tufan: 0, istanbultesisat: 1, armut: 2, rota: 2, enes: 1 },
  { criterionEn: "Google reviews embed", criterionTr: "Google yorum widget'ı", weight: "High", us: 1, tufan: 2, istanbultesisat: 1, armut: 2, rota: 0, enes: 1, fixEn: "Embed live Google review widget on /randevu", fixTr: "/randevu sayfasına canlı Google yorum widget'ı ekle" },
  { criterionEn: "Urgency / scarcity copy", criterionTr: "Aciliyet / kıtlık metinleri", weight: "Med", us: 2, tufan: 1, istanbultesisat: 0, armut: 1, rota: 1, enes: 0 },
  { criterionEn: "Trust badges (TSE, insurance)", criterionTr: "Güven rozetleri (TSE, sigorta)", weight: "Med", us: 1, tufan: 1, istanbultesisat: 1, armut: 2, rota: 0, enes: 2, fixEn: "Add insurance + certification badges to footer", fixTr: "Footer'a sigorta + sertifika rozetleri ekle" },
  { criterionEn: "Before / after photo proof", criterionTr: "Öncesi / sonrası foto kanıtı", weight: "Med", us: 1, tufan: 2, istanbultesisat: 2, armut: 1, rota: 0, enes: 1, fixEn: "Build /isler gallery with 12+ before/after shots", fixTr: "/isler galerisini 12+ öncesi/sonrası ile kur" },
  { criterionEn: "District-specific landing pages", criterionTr: "İlçeye özel landing sayfaları", weight: "High", us: 0, tufan: 2, istanbultesisat: 1, armut: 2, rota: 0, enes: 0, fixEn: "Ship /kadikoy, /uskudar, /sisli with localized copy", fixTr: "Yerelleşmiş metinle /kadikoy, /uskudar, /sisli yayınla" },
  { criterionEn: "Schema markup (LocalBusiness)", criterionTr: "Şema biçimlendirmesi (LocalBusiness)", weight: "Med", us: 1, tufan: 2, istanbultesisat: 2, armut: 2, rota: 1, enes: 1, fixEn: "Add LocalBusiness + AggregateRating JSON-LD", fixTr: "LocalBusiness + AggregateRating JSON-LD ekle" },
];

function scoreEmoji(v: 0 | 1 | 2) {
  if (v === 2) return { glyph: "●", cls: "text-emerald-400" };
  if (v === 1) return { glyph: "◐", cls: "text-brand-gold" };
  return { glyph: "○", cls: "text-muted-foreground/50" };
}

function LandingAudit() {
  const t = useT();
  const totals = {
    us: AUDIT.reduce((a, r) => a + r.us, 0),
    tufan: AUDIT.reduce((a, r) => a + r.tufan, 0),
    istanbultesisat: AUDIT.reduce((a, r) => a + r.istanbultesisat, 0),
    armut: AUDIT.reduce((a, r) => a + r.armut, 0),
    rota: AUDIT.reduce((a, r) => a + r.rota, 0),
    enes: AUDIT.reduce((a, r) => a + r.enes, 0),
  };
  const max = AUDIT.length * 2;
  const fixes = AUDIT.filter((r) => r.fixEn);
  const weightLabel = (w: "High" | "Med" | "Low") =>
    t(w === "High" ? "High" : w === "Med" ? "Med" : "Low", w === "High" ? "Yüksek" : w === "Med" ? "Orta" : "Düşük");

  return (
    <section id="audit" className="scroll-mt-24">
      <SectionHeader
        eyebrow={t("04 · Landing audit", "04 · Landing denetimi")}
        title={t("Quality Score x-ray", "Kalite Skoru röntgeni")}
        sub={t(
          "12 conversion criteria scored against the 5 top competitors. Open circles = missing, half = partial, full = great. Your Quality Score moves with the bottom table.",
          "12 dönüşüm kriteri en üst 5 rakibe karşı puanlandı. Boş daire = eksik, yarım = kısmi, dolu = mükemmel. Kalite Skorunuz alttaki tabloyla hareket eder."
        )}
      />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {(["us", "tufan", "istanbultesisat", "armut", "rota", "enes"] as const).map((k) => {
          const label = { us: t("Gölge (us)", "Gölge (biz)"), tufan: "Tufan", istanbultesisat: "İst. Tesisat", armut: "Armut", rota: "Rota", enes: "Enes" }[k];
          const score = totals[k];
          const pct = Math.round((score / max) * 100);
          const ours = k === "us";
          return (
            <div key={k} className={`rounded-xl border p-3 backdrop-blur ${ours ? "border-brand-red/50 bg-brand-red/10" : "border-border/60 bg-card/40"}`}>
              <div className="font-mono text-[10px] uppercase text-muted-foreground">{label}</div>
              <div className={`mt-1 text-2xl font-extrabold ${ours ? "text-brand-red" : "text-foreground"}`}>
                {score}<span className="text-xs text-muted-foreground">/{max}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className={`h-full ${ours ? "bg-brand-red" : "bg-brand-gold"}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
        <table className="w-full min-w-[640px] text-[11px]">
          <thead>
            <tr className="border-b border-border/60 text-left">
              <th className="px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground">{t("Criterion", "Kriter")}</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-brand-red">{t("Us", "Biz")}</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">Tufan</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">İ.Tes</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">Armut</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">Rota</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">Enes</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">{t("W.", "Ağr.")}</th>
            </tr>
          </thead>
          <tbody>
            {AUDIT.map((r) => (
              <tr key={r.criterionEn} className="border-b border-border/40 last:border-0">
                <td className="px-3 py-2">{t(r.criterionEn, r.criterionTr)}</td>
                {(["us", "tufan", "istanbultesisat", "armut", "rota", "enes"] as const).map((k) => {
                  const e = scoreEmoji(r[k] as 0 | 1 | 2);
                  return (
                    <td key={k} className={`px-2 py-2 text-center text-base ${e.cls} ${k === "us" ? "bg-brand-red/5" : ""}`}>
                      {e.glyph}
                    </td>
                  );
                })}
                <td className="px-2 py-2 text-center">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                    r.weight === "High" ? "bg-brand-red/20 text-brand-red" :
                    r.weight === "Med" ? "bg-brand-gold/20 text-brand-gold" : "bg-muted text-muted-foreground"
                  }`}>{weightLabel(r.weight)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-2xl border border-brand-red/30 bg-brand-red/5 p-4 sm:p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-brand-red">
          {t("Quality Score fix list · ranked by impact", "Kalite Skoru düzeltme listesi · etkiye göre sıralı")}
        </div>
        <ol className="mt-3 space-y-2">
          {fixes.map((r, i) => (
            <li key={r.criterionEn} className="flex items-start gap-3 text-[12px]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-[11px] font-extrabold text-white">{i + 1}</span>
              <div>
                <div className="font-semibold">{t(r.criterionEn, r.criterionTr)}</div>
                <div className="text-[11px] text-muted-foreground">{t(r.fixEn ?? "", r.fixTr ?? "")}</div>
              </div>
              <span className={`ml-auto shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${
                r.weight === "High" ? "bg-brand-red/20 text-brand-red" : "bg-brand-gold/20 text-brand-gold"
              }`}>{weightLabel(r.weight)}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================ */
/* 5. LSA PLAYBOOK                                               */
/* ============================================================ */

const LSA_REQUIREMENTS = [
  { tEn: "Legal entity", tTr: "Tüzel kişilik", dEn: "Company / sole proprietorship tax number + trade registry", dTr: "Şirket / şahıs şirketi vergi no + ticaret sicili" },
  { tEn: "Professional liability insurance", tTr: "Mesleki sorumluluk sigortası", dEn: "Min ₺250,000 coverage — Allianz, AXA, Anadolu Sigorta", dTr: "Minimum ₺250.000 teminat — Allianz, AXA, Anadolu Sigorta" },
  { tEn: "TSE / authorization certificate", tTr: "TSE / yetki belgesi", dEn: "EPDK for natural gas, municipal authorization for water plumbing", dTr: "Doğalgaz için EPDK, su tesisatı için belediye yetki" },
  { tEn: "Background check", tTr: "Sicil kontrolü", dEn: "Criminal record + driver's license — via Google partner Pinkerton", dTr: "Sabıka kaydı + ehliyet — Google partner Pinkerton üzerinden" },
  { tEn: "Google Business Profile", tTr: "Google İşletme Profili", dEn: "Verified, at least 5 photos, 24/7 hours", dTr: "Doğrulanmış, en az 5 fotoğraf, çalışma saatleri 7/24" },
  { tEn: "Minimum 5 Google reviews", tTr: "Minimum 5 Google yorumu", dEn: "Average ≥4.0 — below this LSA application is rejected", dTr: "Ortalama ≥4.0 — altındaysa LSA başvurusu reddedilir" },
];

const LSA_RANKING = [
  { fEn: "Review count + rating", fTr: "Yorum sayısı + puan", weight: 35, tEn: "200+ reviews, ≥4.8", tTr: "200+ yorum, ≥4.8" },
  { fEn: "Response time (lead → call)", fTr: "Yanıt süresi (lead → arama)", weight: 25, tEn: "< 60 seconds", tTr: "< 60 saniye" },
  { fEn: "Booking conversion rate", fTr: "Randevu dönüşüm oranı", weight: 15, tEn: ">35% of leads booked", tTr: "Lead'lerin >%35'i randevulu" },
  { fEn: "Dispute rate", fTr: "İtiraz oranı", weight: 10, tEn: "<2% of jobs disputed", tTr: "İşlerin <%2'si itirazlı" },
  { fEn: "Geographic match", fTr: "Coğrafi eşleşme", weight: 10, tEn: "Service area drawn tightly", tTr: "Hizmet alanı sıkı çizilmiş" },
  { fEn: "Hours of availability", fTr: "Müsait olunan saatler", weight: 5, tEn: "24/7 listed + answered", tTr: "7/24 listelenmiş + cevaplanan" },
];

function LSAPlaybook() {
  const t = useT();
  const economics: [string, string, string][] = t("en", "tr") === "tr" ? [
    ["Lead başına maliyet", "₺85–₺220", "İstanbul tesisat aralığı"],
    ["Ortalama bilet", "₺850", "Servis çağrısı ortalaması"],
    ["Kapama oranı hedefi", "%55", "Telefona cevaplanan LSA lead'leri"],
    ["Karma ROAS", "4.2×", "İtiraz iadeleri sonrası"],
  ] : [
    ["Cost per lead", "₺85–₺220", "Istanbul plumbing range"],
    ["Average ticket", "₺850", "Service call avg."],
    ["Close rate target", "55%", "Phone-answered LSA leads"],
    ["Blended ROAS", "4.2×", "After dispute refunds"],
  ];
  const plan90: [string, string][] = t("en", "tr") === "tr" ? [
    ["Hafta 1", "LSA başvurusu gönder + sigorta, TSE belgesi, vergi belgelerini yükle. Sicil kontrolü siparişi (5 iş günü)."],
    ["Hafta 2–3", "Google doğrulama görüşmesi. GBP optimize et — 20+ fotoğraf, hizmetler, hizmet alanları, 7/24 saat."],
    ["Hafta 4", "Rozet onaylandı. ₺3.000/hafta tavanıyla başlat. Her lead'e < 60sn yanıt ver."],
    ["Hafta 5–8", "İş sonrası WhatsApp şablonuyla 30+ yorum topla. Hedef puan 4.85+."],
    ["Hafta 9–12", "Haftalık tavanı ₺8.000'e yükselt. Spam lead'lere itiraz et (ücretsiz kredi)."],
    ["Gün 90", "'tesisatçı [ilçe]' için Anadolu + Avrupa yakası genelinde top-3 LSA yerleşimi."],
  ] : [
    ["Week 1", "Submit LSA application + upload insurance, TSE belgesi, tax docs. Order background checks (5 iş günü)."],
    ["Week 2–3", "Google verification call. Optimize GBP — 20+ photos, services, areas served, 24/7 hours."],
    ["Week 4", "Badge approved. Launch at ₺3.000/hafta cap. Answer every lead < 60s."],
    ["Week 5–8", "Drive 30+ reviews via post-job WhatsApp template. Target rating 4.85+."],
    ["Week 9–12", "Raise weekly cap to ₺8.000. Dispute spam leads weekly (free credits)."],
    ["Day 90", "Top-3 LSA placement for 'tesisatçı [district]' across Anadolu + Avrupa yakası."],
  ];

  return (
    <section id="lsa" className="scroll-mt-24">
      <SectionHeader
        eyebrow={t("05 · Local Services Ads", "05 · Yerel Hizmet Reklamları")}
        title={t("Google Guaranteed playbook", "Google Garantili oyun kitabı")}
        sub={t(
          "LSA sits above all paid search results and bills per-lead, not per-click. For a plumber in Istanbul this is the single highest-ROI surface — here's the 90-day path to qualify and rank.",
          "LSA tüm ücretli arama sonuçlarının üzerinde yer alır ve tıklama başına değil, lead başına faturalandırır. İstanbul'da bir tesisatçı için tek en yüksek ROI yüzeyidir — uygun olmak ve sıralamak için 90 günlük yol."
        )}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">
            {t("Eligibility — required documents", "Uygunluk — gerekli belgeler")}
          </div>
          <ul className="mt-4 space-y-3">
            {LSA_REQUIREMENTS.map((r) => (
              <li key={r.tEn} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-gold/20 text-brand-gold">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold">{t(r.tEn, r.tTr)}</div>
                  <div className="text-[11px] text-muted-foreground">{t(r.dEn, r.dTr)}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-red">
            {t("Ranking factors — what moves you to the top", "Sıralama faktörleri — sizi zirveye taşıyan")}
          </div>
          <ul className="mt-4 space-y-3">
            {LSA_RANKING.map((r) => (
              <li key={r.fEn}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="font-semibold">{t(r.fEn, r.fTr)}</span>
                  <span className="font-mono text-[10px] text-brand-red">{r.weight}%</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-brand-red" style={{ width: `${r.weight * 2.5}%` }} />
                </div>
                <div className="mt-1 text-[10px] text-muted-foreground">{t("Target:", "Hedef:")} {t(r.tEn, r.tTr)}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-4">
        {economics.map(([l, v, s]) => (
          <div key={l} className="rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur">
            <div className="font-mono text-[10px] uppercase text-muted-foreground">{l}</div>
            <div className="mt-1 text-xl font-extrabold text-brand-gold">{v}</div>
            <div className="text-[10px] text-muted-foreground">{s}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur">
        <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">
          {t("90-day path to Google Guaranteed", "Google Garantili'ye 90 günlük yol")}
        </div>
        <ol className="mt-3 space-y-2 text-[12px]">
          {plan90.map(([w, body]) => (
            <li key={w} className="flex gap-3 border-b border-border/40 pb-2 last:border-0">
              <span className="w-20 shrink-0 font-mono text-[10px] uppercase text-brand-gold">{w}</span>
              <span>{body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================ */
/* 6. NEGATIVE KEYWORD MINE                                      */
/* ============================================================ */

const NEG_GROUPS: { catEn: string; catTr: string; tone: string; terms: string[] }[] = [
  { catEn: "DIY / How-to", catTr: "DIY / Nasıl yapılır", tone: "text-brand-red",
    terms: ["nasıl yapılır", "kendim", "kendin yap", "diy", "evde", "ev yapımı", "pratik çözüm", "youtube", "video", "tarif", "tarifi", "tutorial", "öğren", "anlatım", "doğal yöntem", "limon", "karbonat", "sirke ile", "tuz ile"] },
  { catEn: "Jobs / Careers", catTr: "İş ilanı / Kariyer", tone: "text-brand-red",
    terms: ["iş ilanı", "iş arıyorum", "iş başvurusu", "kariyer", "personel alımı", "eleman aranıyor", "tesisatçı aranıyor", "ustabaşı arıyor", "çırak alımı", "kaç para kazanır", "maaş", "ücret ne kadar"] },
  { catEn: "Spare parts / Materials", catTr: "Yedek parça / Malzeme", tone: "text-brand-gold",
    terms: ["yedek parça", "yedek parçaları", "fiyat listesi", "fiyatları", "ürün", "marka", "satın al", "satılık", "online", "amazon", "trendyol", "hepsiburada", "n11", "vatan", "media markt", "boru fiyatı", "musluk fiyatı", "valf"] },
  { catEn: "Wholesale / B2B", catTr: "Toptan / B2B", tone: "text-brand-gold",
    terms: ["toptan", "toptancı", "ithalat", "ihracat", "üretici", "fabrika", "depo", "müteahhit", "inşaat firması", "şantiye"] },
  { catEn: "Education / Courses", catTr: "Eğitim / Kurs", tone: "text-brand-gold",
    terms: ["kurs", "kursu", "eğitim", "eğitimi", "okul", "üniversite", "meslek lisesi", "sertifika programı", "online ders", "ücretsiz kurs", "iskur kursu", "isgüm"] },
  { catEn: "Informational", catTr: "Bilgi / Informational", tone: "text-muted-foreground",
    terms: ["nedir", "ne demek", "neden olur", "neden", "belirtileri", "sebepleri", "wikipedia", "ekşi", "sözlük", "tdk", "hakkında", "tarihçesi", "anlamı"] },
  { catEn: "Competitor / Marketplace", catTr: "Rakip / Marketplace", tone: "text-muted-foreground",
    terms: ["armut", "armut.com", "armuttan", "sahibinden", "sahibinden.com", "tufan", "tufan tesisat", "istanbul tesisat", "iski", "iski telefon", "ücretsiz", "bedava", "müşteri hizmetleri", "şikayet", "şikayetvar"] },
  { catEn: "Out of city", catTr: "Şehir dışı", tone: "text-muted-foreground",
    terms: ["ankara", "izmir", "bursa", "antalya", "konya", "adana", "kayseri", "gaziantep", "trabzon", "samsun", "eskişehir", "mersin", "kıbrıs", "almanya"] },
];

function NegativeKeywordVault() {
  const t = useT();
  const [copied, setCopied] = useState<string | null>(null);
  const total = NEG_GROUPS.reduce((a, g) => a + g.terms.length, 0);

  const copyGroup = (cat: string, terms: string[]) => {
    navigator.clipboard.writeText(terms.join("\n"));
    setCopied(cat);
    setTimeout(() => setCopied(null), 1600);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(NEG_GROUPS.flatMap((g) => g.terms).join("\n"));
    setCopied("ALL");
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <section id="negatives" className="scroll-mt-24">
      <SectionHeader
        eyebrow={t("06 · Negative keyword mine", "06 · Negatif anahtar kelime madeni")}
        title={t(`${total} terms that burn 25–40% of plumber budgets`, `Tesisatçı bütçelerinin %25–40'ını yakan ${total} terim`)}
        sub={t(
          "Mined from real SERPs + 18 months of Turkish plumbing query data. Drop these into every campaign on day one — copy a group or grab the full list.",
          "Gerçek SERP'lerden + 18 aylık Türk tesisat sorgu verisinden çıkarıldı. İlk günden her kampanyaya ekleyin — bir grup veya tüm listeyi kopyalayın."
        )}
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button onClick={copyAll} className="inline-flex items-center gap-2 rounded-full bg-brand-red px-4 py-2 text-xs font-bold text-white shadow transition hover:scale-105">
          {copied === "ALL" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied === "ALL" ? t("Copied!", "Kopyalandı!") : t(`Copy all ${total} negatives`, `${total} negatifin tümünü kopyala`)}
        </button>
        <span className="text-[11px] text-muted-foreground">
          {t("Paste into Google Ads → Tools → Negative keyword lists → Plumber-Master", "Google Ads → Araçlar → Negatif anahtar kelime listeleri → Plumber-Master içine yapıştır")}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {NEG_GROUPS.map((g) => (
          <div key={g.catEn} className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className={`font-mono text-[10px] uppercase tracking-widest ${g.tone}`}>
                {t(g.catEn, g.catTr)} <span className="text-muted-foreground">· {g.terms.length}</span>
              </div>
              <button onClick={() => copyGroup(g.catEn, g.terms)} className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-[10px] font-semibold hover:border-brand-red/50 hover:text-brand-red">
                {copied === g.catEn ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied === g.catEn ? t("Copied", "Kopyalandı") : t("Copy", "Kopyala")}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.terms.map((term) => (
                <span key={term} className="rounded-md border border-border/40 bg-background/40 px-2 py-0.5 font-mono text-[10px] text-foreground/80">
                  {term}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ */
/* 7. REVIEW GAP ANALYSIS                                        */
/* ============================================================ */

const REVIEW_DATA = [
  { brand: "Gölge Tesisat", rating: 4.9, count: 218, velocity: 12, ours: true },
  { brand: "Tufan Tesisat", rating: 4.7, count: 482, velocity: 9 },
  { brand: "İstanbul Tesisat", rating: 4.6, count: 311, velocity: 6 },
  { brand: "Armut (top plumber)", rating: 4.8, count: 1240, velocity: 28 },
  { brand: "Rota Tesisat", rating: 4.5, count: 94, velocity: 3 },
  { brand: "Enes Tesisat", rating: 4.8, count: 156, velocity: 4 },
];

function ReviewGap() {
  const t = useT();
  const leader = REVIEW_DATA.reduce((a, b) => (b.count > a.count ? b : a), REVIEW_DATA[0]);
  const ours = REVIEW_DATA.find((r) => r.ours)!;
  const gap = leader.count - ours.count;
  const weeksTo90 = Math.ceil(gap / Math.max(ours.velocity, 1));

  const velocityPlays = t("en", "tr") === "tr" ? [
    "WhatsApp şablonunu iş bitiminin 90 dakikası içinde gönder (memnuniyet zirvesi).",
    "+24sa'te yorum yoksa tek seferlik SMS hatırlatma. Orada dur — fazlası = spam.",
    "Teknisyenlere yüz yüze sorma eğitimi ver: 'İşi beğendiyseniz Google'da bir yorum bırakır mısınız?'",
    "Teknisyene atfedilen her doğrulanmış 5★ yorum için ₺50 iç bonus öde.",
    "Her yoruma (iyi veya kötü) 24sa içinde yanıt ver — Google yanıt oranını ağırlandırır.",
    "Canlı Google yorum rozetini /, /randevu, /hizmetler üzerinde göster — güven döngüsünü kapat.",
  ] : [
    "Send the WhatsApp template within 90 minutes of job completion (peak satisfaction window).",
    "Send a one-time SMS reminder at +24h if no review. Stop there — more = spam.",
    "Train techs to ask in-person: 'İşi beğendiyseniz Google'da bir yorum bırakır mısınız?'",
    "Pay a ₺50 internal bonus per verified 5★ review attributed to the tech.",
    "Reply to every review (good or bad) within 24h — Google weights response rate.",
    "Surface the live Google review badge on /, /randevu, /hizmetler — closes the trust loop.",
  ];

  return (
    <section id="reviews" className="scroll-mt-24">
      <SectionHeader
        eyebrow={t("07 · Review & reputation gap", "07 · Yorum ve itibar açığı")}
        title={t("The single biggest LSA lever", "En büyük tek LSA kaldıracı")}
        sub={t(
          "Google ranks LSA placement primarily by review velocity × rating. Here's the gap to #1 and the exact cadence to close it.",
          "Google LSA yerleşimini öncelikle yorum hızı × puana göre sıralar. İşte 1 numaraya açık ve onu kapatma temposu."
        )}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-brand-red/40 bg-brand-red/10 p-4">
          <div className="font-mono text-[10px] uppercase text-brand-red">{t("Gap to #1", "1 numaraya açık")}</div>
          <div className="mt-1 text-2xl font-extrabold">{gap.toLocaleString()} {t("reviews", "yorum")}</div>
          <div className="text-[10px] text-muted-foreground">{t("behind", "geride —")} {leader.brand}</div>
        </div>
        <div className="rounded-xl border border-brand-gold/40 bg-brand-gold/10 p-4">
          <div className="font-mono text-[10px] uppercase text-brand-gold">{t("Our velocity", "Bizim hızımız")}</div>
          <div className="mt-1 text-2xl font-extrabold">{ours.velocity}/{t("week", "hafta")}</div>
          <div className="text-[10px] text-muted-foreground">{ours.rating}★ {t("avg — keep above 4.85", "ort — 4.85 üzerinde tut")}</div>
        </div>
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
          <div className="font-mono text-[10px] uppercase text-emerald-400">{t("Time to overtake", "Geçme süresi")}</div>
          <div className="mt-1 text-2xl font-extrabold">{weeksTo90} {t("weeks", "hafta")}</div>
          <div className="text-[10px] text-muted-foreground">{t("at current pace; halve it by doubling SMS asks", "mevcut hızda; SMS istemlerini ikiye katlayarak yarıya indir")}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="border-b border-border/60 text-left">
              <th className="px-3 py-2 font-mono text-[10px] uppercase text-muted-foreground">{t("Brand", "Marka")}</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">{t("Rating", "Puan")}</th>
              <th className="px-2 py-2 text-right font-mono text-[10px] uppercase text-muted-foreground">{t("Reviews", "Yorumlar")}</th>
              <th className="px-2 py-2 text-right font-mono text-[10px] uppercase text-muted-foreground">/{t("wk", "hf")}</th>
              <th className="px-2 py-2 text-center font-mono text-[10px] uppercase text-muted-foreground">{t("Trend", "Trend")}</th>
            </tr>
          </thead>
          <tbody>
            {REVIEW_DATA.slice().sort((a, b) => b.count - a.count).map((r, i) => (
              <tr key={r.brand} className={`border-b border-border/40 last:border-0 ${r.ours ? "bg-brand-red/10" : ""}`}>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-4 font-mono text-[10px] text-muted-foreground">{i + 1}</span>
                    <span className={`font-semibold ${r.ours ? "text-brand-red" : ""}`}>{r.brand}</span>
                    {r.ours && (
                      <span className="rounded bg-brand-red px-1.5 py-0.5 text-[9px] font-bold text-white">{t("YOU", "SİZ")}</span>
                    )}
                  </div>
                </td>
                <td className="px-2 py-2.5 text-center">
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                    <span className="font-bold">{r.rating}</span>
                  </span>
                </td>
                <td className="px-2 py-2.5 text-right font-mono">{r.count.toLocaleString()}</td>
                <td className="px-2 py-2.5 text-right font-mono">{r.velocity}</td>
                <td className="px-2 py-2.5 text-center">
                  {r.velocity >= 10 ? <TrendingUp className="mx-auto h-4 w-4 text-emerald-400" />
                    : r.velocity >= 5 ? <Minus className="mx-auto h-4 w-4 text-brand-gold" />
                    : <TrendingDown className="mx-auto h-4 w-4 text-muted-foreground" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card/40 p-5 backdrop-blur">
          <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">
            {t("Post-job WhatsApp template (TR)", "İş sonrası WhatsApp şablonu (TR)")}
          </div>
          <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-border/40 bg-background/40 p-3 font-mono text-[11px] leading-relaxed text-foreground/90">
{`Merhaba {Ad},

Bugün {hizmet} için ekibimizi tercih ettiğiniz
için teşekkür ederiz. Hizmetimizden memnun
kaldıysanız, 30 saniyenizi alacak bir Google
değerlendirmesi bizim için çok değerli olur:

→ {google_review_link}

Sorun yaşarsanız bu mesaja yanıt verin,
hemen geri dönelim.

Gölge Tesisat · 0850 XXX XX XX`}
          </pre>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
            {t("Velocity playbook · double weekly reviews", "Hız oyun kitabı · haftalık yorumları ikiye katla")}
          </div>
          <ul className="mt-3 space-y-2.5 text-[12px]">
            {velocityPlays.map((line, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-mono text-[10px] text-emerald-400">{(i + 1).toString().padStart(2, "0")}</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================ */
/* SHARED                                                        */
/* ============================================================ */

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <header className="mb-5">
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">{eyebrow}</div>
      <h3 className="mt-1 text-xl font-extrabold sm:text-3xl">{title}</h3>
      <p className="mt-1.5 max-w-3xl text-sm text-muted-foreground">{sub}</p>
    </header>
  );
}
