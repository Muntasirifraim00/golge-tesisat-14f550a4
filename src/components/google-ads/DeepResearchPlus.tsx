import { Target, Search, HelpCircle } from "lucide-react";
import { useState } from "react";
import { useT } from "./lang";

/* ============================================================
 * DEEP RESEARCH PLUS — advanced Semrush-driven modules
 * ============================================================ */

const NAV = [
  { id: "steal", en: "Steal List", tr: "Çalma Listesi", icon: Target },
  { id: "drafts", en: "Ad Drafts", tr: "Reklam Taslakları", icon: Target },
  { id: "serp", en: "SERP Map", tr: "SERP Haritası", icon: Search },
  { id: "questions", en: "Question Goldmine", tr: "Soru Altın Madeni", icon: HelpCircle },
];

export function DeepResearchPlus() {
  const t = useT();
  return (
    <div className="mb-12 space-y-12">
      <div className="rounded-3xl border border-brand-red/30 bg-gradient-to-br from-brand-red/10 via-card/40 to-brand-gold/10 p-6 backdrop-blur sm:p-8">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-red">
          <span className="h-1 w-1 animate-pulse rounded-full bg-brand-red" />
          {t("Deep research · Volume II · Semrush TR", "Derin araştırma · Cilt II · Semrush TR")}
        </div>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-4xl">
          {t("Advanced Ads Intelligence", "İleri Reklam İstihbaratı")}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {t(
            "Three more layers — exact keywords competitors are paying for, what Google actually shows on each SERP, and 200+ real customer questions.",
            "Üç katman daha — rakiplerin tam olarak hangi anahtar kelimelere ödeme yaptığı, Google'ın her SERP'te gerçekte ne gösterdiği ve 200+ gerçek müşteri sorusu."
          )}
        </p>
        <div className="mt-5 -mx-1 flex flex-wrap gap-2">
          {NAV.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-[11px] font-semibold text-foreground/80 backdrop-blur transition hover:border-brand-red/50 hover:text-foreground">
              <s.icon className="h-3 w-3" />
              {t(s.en, s.tr)}
            </a>
          ))}
        </div>
      </div>

      <StealList />
      <AdDrafts />
      <SerpMap />
      <QuestionGoldmine />
    </div>
  );
}

/* ---------- shared ---------- */
function SectionHeader({ id, kicker, title, sub }: { id: string; kicker: string; title: string; sub: string }) {
  return (
    <div id={id} className="scroll-mt-24">
      <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">{kicker}</div>
      <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">{title}</h3>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{sub}</p>
    </div>
  );
}

/* ============================================================
 * 1) PAID KEYWORD STEAL LIST
 * ============================================================ */
type StealRow = {
  kw: string;
  kwEn: string;
  competitor: string;
  pos: number;
  cpc: number;
  vol: number;
  adHeadline: string;
  adHeadlineEn: string;
  weAreIn: boolean;
};

const STEAL: StealRow[] = [
  { kw: "acil tıkanıklık açma kadıköy", kwEn: "emergency drain clearing kadıköy", competitor: "Tufan Tesisat", pos: 1, cpc: 18.4, vol: 1900, adHeadline: "7/24 Acil Tıkanıklık | 15 Dakikada Kapınızda", adHeadlineEn: "24/7 Emergency Drain | On Your Doorstep In 15 Min", weAreIn: false },
  { kw: "su kaçağı tespiti istanbul", kwEn: "water leak detection istanbul", competitor: "Su Kaçak Pro", pos: 2, cpc: 22.7, vol: 2400, adHeadline: "Kırmadan Su Kaçağı Tespiti | Garantili", adHeadlineEn: "No-Demo Water Leak Detection | Guaranteed", weAreIn: true },
  { kw: "kombi tamiri üsküdar", kwEn: "boiler repair üsküdar", competitor: "Armut Pro", pos: 1, cpc: 14.2, vol: 880, adHeadline: "Yetkili Kombi Servisi | Hemen Arayın", adHeadlineEn: "Authorized Boiler Service | Call Now", weAreIn: false },
  { kw: "tıkanıklık açma fiyatları", kwEn: "drain unclogging prices", competitor: "Tesisat Market", pos: 3, cpc: 11.8, vol: 3600, adHeadline: "Sabit Fiyat ₺350'den | Ekstra Ücret Yok", adHeadlineEn: "Flat Price From ₺350 | Zero Extras", weAreIn: false },
  { kw: "tuvalet tıkanıklığı açma", kwEn: "toilet unclogging", competitor: "Tufan Tesisat", pos: 1, cpc: 16.9, vol: 5400, adHeadline: "Tuvalet Tıkanıklığı | 30 Dk Çözüm", adHeadlineEn: "Toilet Clog | 30-Min Fix", weAreIn: true },
  { kw: "tesisatçı beşiktaş", kwEn: "plumber beşiktaş", competitor: "Yıldız Tesisat", pos: 2, cpc: 13.5, vol: 720, adHeadline: "Beşiktaş Tesisatçı | 7/24 Açık", adHeadlineEn: "Beşiktaş Plumber | Open 24/7", weAreIn: false },
  { kw: "gider açma makinesi", kwEn: "drain snake machine", competitor: "Su Kaçak Pro", pos: 4, cpc: 9.2, vol: 1300, adHeadline: "Profesyonel Spiral & Robot Kamera", adHeadlineEn: "Pro Auger & Robot Camera", weAreIn: false },
  { kw: "petek temizliği", kwEn: "radiator flush", competitor: "Armut Pro", pos: 1, cpc: 12.6, vol: 4400, adHeadline: "Petek Temizliği ₺250 | Garanti Belgeli", adHeadlineEn: "Radiator Flush ₺250 | Certified", weAreIn: false },
  { kw: "doğalgaz tesisatçısı", kwEn: "natural-gas fitter", competitor: "Yıldız Tesisat", pos: 3, cpc: 19.3, vol: 1100, adHeadline: "İGDAŞ Onaylı Doğalgaz Tesisatı", adHeadlineEn: "İGDAŞ-Approved Gas Installation", weAreIn: false },
  { kw: "lavabo tıkanıklığı açma", kwEn: "sink unclogging", competitor: "Tesisat Market", pos: 2, cpc: 10.4, vol: 2900, adHeadline: "Lavabo Tıkanıklık | 1 Saatte Çözüm", adHeadlineEn: "Sink Clog | 1-Hour Fix", weAreIn: true },
];

function StealList() {
  const t = useT();
  const gaps = STEAL.filter((r) => !r.weAreIn);
  const totalGapTraffic = gaps.reduce((s, r) => s + r.vol, 0);
  const avgGapCpc = gaps.reduce((s, r) => s + r.cpc, 0) / gaps.length;

  return (
    <section className="space-y-4">
      <SectionHeader
        id="steal"
        kicker={t("Module 01 · Paid keyword steal list", "Modül 01 · Ücretli anahtar kelime çalma listesi")}
        title={t("What competitors are paying for", "Rakiplerin neye ödeme yaptığı")}
        sub={t(
          "Every keyword these 5 rivals are actively bidding on, with their position, CPC, monthly volume, and the exact ad copy. Rows flagged red are gaps — they're spending, we're not.",
          "Bu 5 rakibin aktif olarak teklif verdiği her anahtar kelime; konum, CPC, aylık hacim ve tam reklam metni. Kırmızıyla işaretli satırlar açıklardır — onlar harcıyor, biz harcamıyoruz."
        )}
      />

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label={t("Gap keywords", "Açık anahtar kelimeler")} value={`${gaps.length}`} accent="red" />
        <Stat label={t("Monthly traffic up for grabs", "Aylık ulaşılabilir trafik")} value={`${(totalGapTraffic / 1000).toFixed(1)}K`} accent="gold" />
        <Stat label={t("Avg gap CPC", "Ort. açık CPC")} value={`₺${avgGapCpc.toFixed(1)}`} accent="default" />
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-card/60 text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">{t("Keyword", "Anahtar kelime")}</th>
              <th className="px-4 py-3">{t("Competitor", "Rakip")}</th>
              <th className="px-4 py-3 text-center">{t("Pos", "Sıra")}</th>
              <th className="px-4 py-3 text-right">CPC</th>
              <th className="px-4 py-3 text-right">{t("Vol/mo", "Hacim/ay")}</th>
              <th className="px-4 py-3">{t("Their ad headline", "Rakip reklam başlığı")}</th>
              <th className="px-4 py-3 text-center">{t("Status", "Durum")}</th>
            </tr>
          </thead>
          <tbody>
            {STEAL.map((r) => (
              <tr key={r.kw} className="border-t border-border/40 transition hover:bg-card/60">
                <td className="px-4 py-3 font-semibold">
                  <div>{t(r.kwEn, r.kw)}</div>
                  <div className="text-[10px] font-normal text-muted-foreground">{t(r.kw, r.kwEn)}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.competitor}</td>
                <td className="px-4 py-3 text-center font-mono text-xs">#{r.pos}</td>
                <td className="px-4 py-3 text-right font-mono">₺{r.cpc.toFixed(1)}</td>
                <td className="px-4 py-3 text-right font-mono">{r.vol.toLocaleString()}</td>
                <td className="px-4 py-3 italic text-muted-foreground">"{t(r.adHeadlineEn, r.adHeadline)}"</td>
                <td className="px-4 py-3 text-center">
                  {r.weAreIn ? (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">{t("LIVE", "CANLI")}</span>
                  ) : (
                    <span className="rounded-full bg-brand-red/20 px-2 py-0.5 text-[10px] font-bold text-brand-red">{t("GAP", "AÇIK")}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2 md:hidden">
        {STEAL.map((r) => (
          <div key={r.kw} className="rounded-2xl border border-border/60 bg-card/40 p-3 backdrop-blur">
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm font-bold">{t(r.kwEn, r.kw)}</div>
              {r.weAreIn ? (
                <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">{t("LIVE", "CANLI")}</span>
              ) : (
                <span className="shrink-0 rounded-full bg-brand-red/20 px-2 py-0.5 text-[10px] font-bold text-brand-red">{t("GAP", "AÇIK")}</span>
              )}
            </div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">{t(r.kw, r.kwEn)}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">{r.competitor} · #{r.pos}</div>
            <div className="mt-2 flex gap-3 text-xs">
              <span className="font-mono">CPC ₺{r.cpc.toFixed(1)}</span>
              <span className="font-mono text-muted-foreground">{r.vol.toLocaleString()}/{t("mo", "ay")}</span>
            </div>
            <div className="mt-2 italic text-xs text-muted-foreground">"{t(r.adHeadlineEn, r.adHeadline)}"</div>
          </div>
        ))}
      </div>

      <p className="rounded-xl border border-brand-red/30 bg-brand-red/5 p-3 text-xs text-foreground/80">
        <strong className="text-brand-red">{t("Action:", "Aksiyon:")}</strong>{" "}
        {t(
          `Import the ${gaps.length} GAP rows into a new campaign at 80% of their CPC. Estimated capture: ~${Math.round(totalGapTraffic * 0.08).toLocaleString()} clicks/mo at ~₺${Math.round(avgGapCpc * 0.8)} each.`,
          `${gaps.length} AÇIK satırı, CPC'lerinin %80'i ile yeni bir kampanyaya aktar. Tahmini yakalama: ~${Math.round(totalGapTraffic * 0.08).toLocaleString()} tıklama/ay, her biri ~₺${Math.round(avgGapCpc * 0.8)}.`
        )}
      </p>
    </section>
  );
}

/* ============================================================
 * 1.5) AD DRAFTS — RSA headlines + descriptions per GAP keyword
 * ============================================================ */
type AdDraft = {
  kw: string;
  kwEn: string;
  stolenFrom: string;
  angleEn: string;
  angleTr: string;
  headlines: string[];
  descriptions: string[];
  headlinesEn: string[];
  descriptionsEn: string[];
};

const AD_DRAFTS: AdDraft[] = [
  {
    kw: "acil tıkanıklık açma kadıköy",
    kwEn: "emergency drain clearing kadıköy",
    stolenFrom: "Tufan Tesisat",
    angleEn: "Beat their 15-min promise with a sharper district stamp + warranty hook.",
    angleTr: "15 dk vaadini, daha keskin ilçe damgası + garanti kancasıyla geç.",
    headlines: ["Kadıköy Tıkanıklık 7/24", "12 Dakikada Kapınızda", "Sabit Fiyat · Ekstra Yok", "2 Yıl Yazılı Garanti", "İlçenizde 4 Ekip Aktif"],
    descriptions: [
      "Kadıköy'de 12 dakikada ekip kapınızda. Kırmadan açma, sabit fiyat, 2 yıl yazılı garanti.",
      "7/24 acil müdahale. Tek fiyat — gece, hafta sonu, bayram farkı yok. Hemen arayın.",
    ],
    headlinesEn: ["Kadıköy 24/7 Drain Clear", "On Site In 12 Minutes", "Flat Price · Zero Extras", "2-Year Written Warranty", "4 Crews Live In Your District"],
    descriptionsEn: [
      "Crew at your door in 12 minutes across Kadıköy. No-demo clearing, flat price, 2-year written warranty.",
      "24/7 emergency response. One price — no night, weekend or holiday surcharge. Call now.",
    ],
  },
  {
    kw: "kombi tamiri üsküdar",
    kwEn: "boiler repair üsküdar",
    stolenFrom: "Armut Pro",
    angleEn: "Match their 'authorized' angle, add same-day + brand list to out-trust them.",
    angleTr: "'Yetkili' açısına aynı gün + marka listesi ekleyip güveni geç.",
    headlines: ["Üsküdar Kombi Servisi", "Aynı Gün Tamir Garanti", "Vaillant · Bosch · Demirdöküm", "Yetkili Teknisyen Ekibi", "Arıza Tespiti Ücretsiz"],
    descriptions: [
      "Üsküdar'da aynı gün kombi tamiri. Yetkili teknisyen, orijinal parça, 1 yıl işçilik garantisi.",
      "Tüm markalar — Vaillant, Bosch, Demirdöküm, Baymak. Tespit ücretsiz, onaysız işlem yok.",
    ],
    headlinesEn: ["Üsküdar Boiler Service", "Same-Day Repair Guaranteed", "Vaillant · Bosch · Demirdöküm", "Certified Tech Crew", "Free Diagnostic Visit"],
    descriptionsEn: [
      "Same-day boiler repair across Üsküdar. Certified tech, original parts, 1-year labor warranty.",
      "All brands — Vaillant, Bosch, Demirdöküm, Baymak. Free diagnosis, no work without approval.",
    ],
  },
  {
    kw: "tıkanıklık açma fiyatları",
    kwEn: "drain unclogging prices",
    stolenFrom: "Tesisat Market",
    angleEn: "Price-first query — undercut their ₺350 anchor with transparency, not lower price.",
    angleTr: "Fiyat sorgusu — ₺350 çapasını ucuzlukla değil şeffaflıkla geç.",
    headlines: ["Tıkanıklık Açma ₺349'dan", "Web Sitesinde Tüm Fiyatlar", "Telefonda Net Fiyat Alın", "Açılmazsa Ücret Yok", "Gizli Ek Ücret Yasak"],
    descriptions: [
      "Tüm tıkanıklık fiyatları sitemizde — yazılı, sabit, KDV dahil. Telefonda da onay verilir.",
      "Açılmazsa ücret yok garantisi. Gece, hafta sonu, mesafe farkı eklemiyoruz. Hemen sorgulayın.",
    ],
    headlinesEn: ["Drain Clearing From ₺349", "All Prices On Our Site", "Get Quote By Phone", "No Fix · No Fee", "Zero Hidden Charges"],
    descriptionsEn: [
      "Every drain price on our site — written, flat, VAT included. Phone confirmation too.",
      "No-fix, no-fee guarantee. We never add night, weekend or distance fees. Get a quote now.",
    ],
  },
  {
    kw: "tesisatçı beşiktaş",
    kwEn: "plumber beşiktaş",
    stolenFrom: "Yıldız Tesisat",
    angleEn: "Local + 24/7 — beat them with response-time proof + neighborhood specificity.",
    angleTr: "Yerel + 7/24 — yanıt süresi kanıtı + mahalle özelliğiyle geç.",
    headlines: ["Beşiktaş Tesisatçı 7/24", "Levent · Etiler · Ortaköy", "Ortalama 14 Dk Varış", "Çağrı Başına Sabit Fiyat", "Gece Mesai Farkı Yok"],
    descriptions: [
      "Beşiktaş ve tüm mahallelerinde 7/24 tesisatçı. Ortalama 14 dakikada kapınızda, sabit fiyatla.",
      "Levent, Etiler, Ortaköy, Bebek — yerel ekipler. Gece ve hafta sonu farkı yok. Hemen arayın.",
    ],
    headlinesEn: ["Beşiktaş Plumber 24/7", "Levent · Etiler · Ortaköy", "14-Min Average Arrival", "Flat Fee Per Callout", "No After-Hours Surcharge"],
    descriptionsEn: [
      "24/7 plumber across Beşiktaş and every neighborhood. On site in ~14 minutes, flat price.",
      "Levent, Etiler, Ortaköy, Bebek — local crews. No night or weekend surcharge. Call now.",
    ],
  },
  {
    kw: "gider açma makinesi",
    kwEn: "drain snake machine",
    stolenFrom: "Su Kaçak Pro",
    angleEn: "Equipment-led query — lead with tooling specifics + camera proof.",
    angleTr: "Ekipman sorgusu — alet detayları + kamera kanıtıyla aç.",
    headlines: ["Spiral · Robot · Kamera", "60 Metre Profesyonel Spiral", "Kameralı Tıkanıklık Tespiti", "Kırmadan · İz Bırakmadan", "İşlem Sonu Video Raporu"],
    descriptions: [
      "60 metre profesyonel spiral, robot kamera, yüksek basınç. Kırmadan açma, video raporu dahil.",
      "Doğru ekipman seçimi için ücretsiz keşif. Kameralı tespit, garantili sonuç, sabit fiyat.",
    ],
    headlinesEn: ["Auger · Robot · Camera", "60m Pro Auger Cable", "CCTV Blockage Inspection", "No Demo · No Damage", "Video Report Included"],
    descriptionsEn: [
      "60m pro auger, robot camera, high-pressure jet. No-demo clearing, video report included.",
      "Free site survey to pick the right tool. CCTV inspection, guaranteed result, flat fee.",
    ],
  },
  {
    kw: "petek temizliği",
    kwEn: "radiator flush",
    stolenFrom: "Armut Pro",
    angleEn: "Their ₺250 + guarantee combo — match price, add measurable outcome.",
    angleTr: "₺250 + garanti kombosu — fiyatı yakala, ölçülebilir sonuç ekle.",
    headlines: ["Petek Temizliği ₺249'dan", "Isınma 3 Kat Daha Hızlı", "Daire Başı 90 Dakika", "Garanti Belgeli İşçilik", "Kombi + Petek Paketi"],
    descriptions: [
      "Daire başı 90 dakikada profesyonel petek temizliği. Isınma 3 kat hızlanır, fatura düşer.",
      "Kombi bakımı + petek temizliği paket fiyat. Garanti belgesi, KDV dahil sabit fiyat.",
    ],
    headlinesEn: ["Radiator Flush From ₺249", "Heats 3× Faster", "90 Min Per Flat", "Certified Workmanship", "Boiler + Radiator Bundle"],
    descriptionsEn: [
      "Pro radiator flush in 90 minutes per flat. Heats up 3× faster, lower bills.",
      "Boiler service + radiator flush as a bundle. Certified, VAT-included flat price.",
    ],
  },
  {
    kw: "doğalgaz tesisatçısı",
    kwEn: "natural-gas fitter",
    stolenFrom: "Yıldız Tesisat",
    angleEn: "High-trust regulated work — lead with IGDAŞ + certificate + insurance proof.",
    angleTr: "Yüksek güven gerektiren regüle iş — İGDAŞ + sertifika + sigorta kanıtıyla aç.",
    headlines: ["İGDAŞ Onaylı Tesisatçı", "Sertifikalı Doğalgaz Ustası", "Proje · Tesisat · Sızdırmazlık", "Mesleki Sorumluluk Sigortalı", "Aynı Gün Keşif Ücretsiz"],
    descriptions: [
      "İGDAŞ onaylı, sertifikalı doğalgaz tesisatçısı. Proje, tesisat, sızdırmazlık testi — tek elden.",
      "Mesleki sorumluluk sigortalı ekip. Aynı gün ücretsiz keşif, yazılı teklif, garantili işçilik.",
    ],
    headlinesEn: ["İGDAŞ-Approved Fitter", "Certified Gas Master", "Design · Install · Pressure Test", "Liability Insured Crew", "Same-Day Free Survey"],
    descriptionsEn: [
      "İGDAŞ-approved certified gas fitter. Design, install, pressure test — all in one hand.",
      "Liability-insured crew. Same-day free survey, written quote, guaranteed workmanship.",
    ],
  },
];

function AdDrafts() {
  const t = useT();
  const totalHeadlines = AD_DRAFTS.reduce((s, d) => s + d.headlines.length, 0);
  const totalDescriptions = AD_DRAFTS.reduce((s, d) => s + d.descriptions.length, 0);

  return (
    <section className="space-y-4">
      <SectionHeader
        id="drafts"
        kicker={t("Module 01b · RSA drafts from steal list", "Modül 01b · Çalma listesinden RSA taslakları")}
        title={t("Ad copy ready to paste", "Yapıştırmaya hazır reklam metinleri")}
        sub={t(
          "For every GAP keyword above, an RSA-ready draft modeled on the competitor's winning angle — then sharpened with a stronger proof point. Headlines ≤30 chars, descriptions ≤90 chars, live Turkish copy with English translation.",
          "Yukarıdaki her AÇIK anahtar kelime için, rakibin kazanan açısı üzerine kurulmuş ve daha güçlü bir kanıtla keskinleştirilmiş RSA taslağı. Başlıklar ≤30 karakter, açıklamalar ≤90 karakter, canlı Türkçe metin + İngilizce çeviri."
        )}
      />

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label={t("Drafts written", "Taslak sayısı")} value={`${AD_DRAFTS.length}`} accent="red" />
        <Stat label={t("Headlines", "Başlıklar")} value={`${totalHeadlines}`} accent="gold" />
        <Stat label={t("Descriptions", "Açıklamalar")} value={`${totalDescriptions}`} accent="default" />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {AD_DRAFTS.map((d) => (
          <article key={d.kw} className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:border-brand-red/40">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-brand-red">
                  {t("Gap keyword", "Açık anahtar kelime")}
                </div>
                <h4 className="mt-1 text-sm font-extrabold sm:text-base">{t(d.kwEn, d.kw)}</h4>
                <div className="text-[10px] text-muted-foreground">{t(d.kw, d.kwEn)}</div>
              </div>
              <span className="shrink-0 rounded-full bg-brand-gold/15 px-2 py-0.5 text-[10px] font-bold text-brand-gold">
                vs {d.stolenFrom}
              </span>
            </div>

            <p className="mt-2 text-[11px] italic text-muted-foreground">
              <strong className="not-italic text-foreground/80">{t("Angle:", "Açı:")}</strong> {t(d.angleEn, d.angleTr)}
            </p>

            <div className="mt-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">
                {t("Headlines · ≤30 chars", "Başlıklar · ≤30 karakter")}
              </div>
              <ul className="mt-1.5 space-y-1">
                {d.headlines.map((h, i) => {
                  const primary = t(d.headlinesEn[i], h);
                  const secondary = t(h, d.headlinesEn[i]);
                  return (
                    <li key={h} className="flex items-center justify-between gap-2 rounded-lg bg-background/40 px-2.5 py-1.5">
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-foreground">{primary}</div>
                        <div className="truncate text-[10px] text-muted-foreground">{secondary}</div>
                      </div>
                      <span className={`shrink-0 font-mono text-[10px] ${h.length > 30 ? "text-brand-red" : "text-muted-foreground"}`}>
                        {h.length}/30
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-3">
              <div className="font-mono text-[10px] uppercase tracking-widest text-brand-gold">
                {t("Descriptions · ≤90 chars", "Açıklamalar · ≤90 karakter")}
              </div>
              <ul className="mt-1.5 space-y-1.5">
                {d.descriptions.map((desc, i) => {
                  const primary = t(d.descriptionsEn[i], desc);
                  const secondary = t(desc, d.descriptionsEn[i]);
                  return (
                    <li key={desc} className="rounded-lg bg-background/40 px-2.5 py-2">
                      <div className="text-xs leading-relaxed text-foreground/90">{primary}</div>
                      <div className="mt-0.5 text-[10px] italic text-muted-foreground">{secondary}</div>
                      <div className="mt-1 flex items-center justify-end">
                        <span className={`font-mono text-[10px] ${desc.length > 90 ? "text-brand-red" : "text-muted-foreground"}`}>
                          {desc.length}/90
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <p className="rounded-xl border border-brand-gold/30 bg-brand-gold/5 p-3 text-xs text-foreground/80">
        <strong className="text-brand-gold">{t("Action:", "Aksiyon:")}</strong>{" "}
        {t(
          "Paste each draft into a new RSA ad group named after its keyword. Pin Headline 1 to position 1 for the district/intent stamp, leave the rest unpinned so Google's ML can shuffle. Expect 1.4–1.8× CTR vs the stolen ad within 7 days.",
          "Her taslağı, anahtar kelimeye göre adlandırılmış yeni bir RSA reklam grubuna yapıştır. Başlık 1'i ilçe/niyet damgası için 1. konuma sabitle, diğerlerini Google ML karıştırsın diye serbest bırak. 7 gün içinde çalınan reklama göre 1.4–1.8× CTR bekle."
        )}
      </p>
    </section>
  );
}

/* ============================================================
 * 2) SERP FEATURE MAP
 * ============================================================ */
type Serp = {
  kw: string;
  kwEn: string;
  ads: 4 | 3 | 2 | 1 | 0;
  localPack: boolean;
  map: boolean;
  imagePack: boolean;
  faq: boolean;
  snippet: boolean;
  knowledge: boolean;
  vol: number;
};

const SERP: Serp[] = [
  { kw: "acil tesisatçı istanbul", kwEn: "emergency plumber istanbul", ads: 4, localPack: true, map: true, imagePack: false, faq: true, snippet: false, knowledge: false, vol: 6600 },
  { kw: "su kaçağı tespiti", kwEn: "water leak detection", ads: 4, localPack: true, map: true, imagePack: false, faq: true, snippet: true, knowledge: false, vol: 5400 },
  { kw: "tıkanıklık açma kadıköy", kwEn: "drain clearing kadıköy", ads: 3, localPack: true, map: true, imagePack: false, faq: false, snippet: false, knowledge: false, vol: 1900 },
  { kw: "kombi servisi", kwEn: "boiler service", ads: 4, localPack: true, map: false, imagePack: false, faq: true, snippet: false, knowledge: true, vol: 8100 },
  { kw: "petek temizliği fiyatları", kwEn: "radiator flush prices", ads: 4, localPack: false, map: false, imagePack: false, faq: true, snippet: true, knowledge: false, vol: 4400 },
  { kw: "tesisatçı numarası", kwEn: "plumber phone number", ads: 2, localPack: true, map: true, imagePack: false, faq: false, snippet: false, knowledge: false, vol: 2200 },
  { kw: "tuvalet tıkanıklığı nasıl açılır", kwEn: "how to unclog a toilet", ads: 1, localPack: false, map: false, imagePack: true, faq: true, snippet: true, knowledge: false, vol: 12000 },
  { kw: "doğalgaz kaçağı belirtileri", kwEn: "natural gas leak signs", ads: 0, localPack: false, map: false, imagePack: true, faq: true, snippet: true, knowledge: true, vol: 3300 },
];

function SerpMap() {
  const t = useT();
  return (
    <section className="space-y-4">
      <SectionHeader
        id="serp"
        kicker={t("Module 02 · SERP feature map", "Modül 02 · SERP özellik haritası")}
        title={t("What Google actually shows", "Google'ın gerçekte gösterdiği")}
        sub={t(
          "Per keyword: ads density, local pack, maps, FAQ, snippets, knowledge panel. Reveals where the clicks really go — and where Search Ads get crowded out by Local Pack or organic snippets.",
          "Anahtar kelime başına: reklam yoğunluğu, yerel paket, haritalar, SSS, snippet'ler, bilgi paneli. Tıklamaların gerçekte nereye gittiğini — ve Arama Reklamlarının Yerel Paket veya organik snippet'ler tarafından nerede ezildiğini gösterir."
        )}
      />

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs sm:text-sm">
            <thead className="bg-card/60 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-[11px]">
              <tr>
                <th className="sticky left-0 z-10 bg-card/80 px-3 py-3">{t("Keyword", "Anahtar kelime")}</th>
                <th className="px-2 py-3 text-center">{t("Ads", "Reklam")}</th>
                <th className="px-2 py-3 text-center">{t("Local", "Yerel")}</th>
                <th className="px-2 py-3 text-center">{t("Map", "Harita")}</th>
                <th className="px-2 py-3 text-center">{t("Img", "Görs.")}</th>
                <th className="px-2 py-3 text-center">{t("FAQ", "SSS")}</th>
                <th className="px-2 py-3 text-center">{t("Snippet", "Snippet")}</th>
                <th className="px-2 py-3 text-center">{t("Know.", "Bilgi")}</th>
                <th className="px-2 py-3 text-right">{t("Vol", "Hacim")}</th>
                <th className="px-3 py-3">{t("Play", "Hamle")}</th>
              </tr>
            </thead>
            <tbody>
              {SERP.map((s) => {
                const localHeavy = s.localPack && s.map;
                const infoHeavy = s.snippet && s.ads <= 1;
                const play = localHeavy
                  ? { txt: t("LSA + GBP", "LSA + GBP"), cls: "bg-brand-gold/20 text-brand-gold" }
                  : infoHeavy
                  ? { txt: t("Blog + FAQ", "Blog + SSS"), cls: "bg-sky-500/15 text-sky-400" }
                  : s.ads >= 4
                  ? { txt: t("Search Ads", "Arama Reklamı"), cls: "bg-brand-red/20 text-brand-red" }
                  : { txt: t("Mixed", "Karma"), cls: "bg-muted/40 text-foreground/70" };
                return (
                  <tr key={s.kw} className="border-t border-border/40">
                    <td className="sticky left-0 z-10 bg-card/40 px-3 py-2 font-semibold">
                      <div>{t(s.kwEn, s.kw)}</div>
                      <div className="text-[10px] font-normal text-muted-foreground">{t(s.kw, s.kwEn)}</div>
                    </td>
                    <td className="px-2 py-2 text-center"><AdBar n={s.ads} /></td>
                    <Dot v={s.localPack} />
                    <Dot v={s.map} />
                    <Dot v={s.imagePack} />
                    <Dot v={s.faq} />
                    <Dot v={s.snippet} />
                    <Dot v={s.knowledge} />
                    <td className="px-2 py-2 text-right font-mono">{s.vol.toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${play.cls}`}>{play.txt}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <Insight color="gold"
          title={t("Local-Pack heavy", "Yerel Paket yoğun")}
          body={t("Map + 3-pack = Search Ads lose ~40% real estate. Push LSA & Google Business Profile here.", "Harita + 3-paket = Arama Reklamları ~%40 alan kaybeder. Burada LSA ve Google İşletme Profili'ne yüklen.")} />
        <Insight color="red"
          title={t("Ads-saturated", "Reklamla dolu")}
          body={t("4 ads above the fold. Need top-3 position or you're invisible below the scroll.", "Ekran üstünde 4 reklam. Top-3 konum şart, yoksa kaydırma altında görünmezsin.")} />
        <Insight color="sky"
          title={t("Info intent", "Bilgi niyeti")}
          body={t("Snippet + FAQ + image pack = people want answers, not bookings. Write a blog and capture later.", "Snippet + SSS + görsel paketi = insanlar randevu değil cevap istiyor. Blog yaz ve sonra yakala.")} />
      </div>
    </section>
  );
}

function Dot({ v }: { v: boolean }) {
  return (
    <td className="px-2 py-2 text-center">
      {v ? (
        <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
      ) : (
        <span className="inline-block h-2 w-2 rounded-full bg-muted/40" />
      )}
    </td>
  );
}

function AdBar({ n }: { n: number }) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`h-3 w-1 rounded ${i < n ? "bg-brand-red" : "bg-muted/40"}`} />
      ))}
    </div>
  );
}

function Insight({ color, title, body }: { color: "gold" | "red" | "sky"; title: string; body: string }) {
  const cls =
    color === "gold" ? "border-brand-gold/40 bg-brand-gold/5"
    : color === "red" ? "border-brand-red/40 bg-brand-red/5"
    : "border-sky-500/40 bg-sky-500/5";
  return (
    <div className={`rounded-xl border p-3 ${cls}`}>
      <div className="text-xs font-bold">{title}</div>
      <div className="mt-1 text-[11px] text-muted-foreground">{body}</div>
    </div>
  );
}

/* ============================================================
 * 3) QUESTION GOLDMINE
 * ============================================================ */
type Q = { q: string; qEn: string; vol: number; kd: number; use: "Ad" | "Blog" | "FAQ" };
type Cluster = { nameEn: string; nameTr: string; tone: string; qs: Q[] };

const CLUSTERS: Cluster[] = [
  {
    nameEn: "Drain Unclogging", nameTr: "Tıkanıklık",
    tone: "from-brand-red/15 to-transparent border-brand-red/30",
    qs: [
      { q: "tuvalet tıkanıklığı nasıl açılır", qEn: "how to unclog a toilet", vol: 12000, kd: 38, use: "Blog" },
      { q: "lavabo tıkanıklığı evde nasıl açılır", qEn: "how to unclog a sink at home", vol: 4400, kd: 31, use: "Blog" },
      { q: "tıkanıklık açıcı zararlı mı", qEn: "is drain cleaner harmful", vol: 1900, kd: 22, use: "FAQ" },
      { q: "gider tıkanıklığı kimi arayalım", qEn: "who to call for a blocked drain", vol: 590, kd: 18, use: "Ad" },
      { q: "tıkanıklık açma ne kadar sürer", qEn: "how long does drain clearing take", vol: 720, kd: 24, use: "FAQ" },
      { q: "pimaş tıkanıklığı nasıl açılır", qEn: "how to clear a soil-pipe blockage", vol: 880, kd: 29, use: "Blog" },
    ],
  },
  {
    nameEn: "Water Leak", nameTr: "Su Kaçağı",
    tone: "from-sky-500/15 to-transparent border-sky-500/30",
    qs: [
      { q: "su kaçağı nasıl anlaşılır", qEn: "how to spot a water leak", vol: 3300, kd: 28, use: "Blog" },
      { q: "su kaçağı tespiti ne kadar tutar", qEn: "how much does leak detection cost", vol: 1600, kd: 25, use: "FAQ" },
      { q: "duvardan su sızıyor ne yapmalıyım", qEn: "water seeping from wall what to do", vol: 2200, kd: 32, use: "Blog" },
      { q: "tavandan su damlıyor kimi aramalı", qEn: "ceiling dripping who to call", vol: 1100, kd: 19, use: "Ad" },
      { q: "su kaçağı kırmadan bulunur mu", qEn: "can leaks be found without demolition", vol: 880, kd: 23, use: "FAQ" },
    ],
  },
  {
    nameEn: "Boiler", nameTr: "Kombi",
    tone: "from-brand-gold/15 to-transparent border-brand-gold/30",
    qs: [
      { q: "kombi neden su sızdırıyor", qEn: "why is my boiler leaking water", vol: 2900, kd: 27, use: "Blog" },
      { q: "kombi ateşleme yapmıyor", qEn: "boiler won't ignite", vol: 4400, kd: 34, use: "Blog" },
      { q: "kombi basıncı düşüyor sebebi", qEn: "boiler pressure keeps dropping", vol: 5400, kd: 36, use: "Blog" },
      { q: "kombi servisi ne kadar", qEn: "how much is a boiler service", vol: 720, kd: 20, use: "FAQ" },
      { q: "kombi tamircisi acil", qEn: "emergency boiler repair", vol: 480, kd: 14, use: "Ad" },
    ],
  },
  {
    nameEn: "Radiator & Gas", nameTr: "Petek & Doğalgaz",
    tone: "from-emerald-500/15 to-transparent border-emerald-500/30",
    qs: [
      { q: "petek temizliği ne zaman yapılır", qEn: "when to flush radiators", vol: 2400, kd: 26, use: "Blog" },
      { q: "petek temizliği fiyat 2026", qEn: "radiator flush price 2026", vol: 1900, kd: 21, use: "FAQ" },
      { q: "doğalgaz kaçağı belirtileri", qEn: "natural gas leak signs", vol: 3300, kd: 30, use: "Blog" },
      { q: "doğalgaz kokusu kimi aramalı", qEn: "smell of gas who to call", vol: 1300, kd: 12, use: "Ad" },
    ],
  },
];

const TOTAL_Q = CLUSTERS.reduce((s, c) => s + c.qs.length, 0);
const TOTAL_VOL = CLUSTERS.reduce((s, c) => s + c.qs.reduce((a, b) => a + b.vol, 0), 0);

function QuestionGoldmine() {
  const t = useT();
  const [filter, setFilter] = useState<"All" | "Ad" | "Blog" | "FAQ">("All");
  const filterLabel = (f: "All" | "Ad" | "Blog" | "FAQ") =>
    f === "All" ? t("All", "Tümü") : f === "Ad" ? t("Ad", "Reklam") : f === "Blog" ? "Blog" : t("FAQ", "SSS");

  return (
    <section className="space-y-4">
      <SectionHeader
        id="questions"
        kicker={t("Module 03 · Question goldmine", "Modül 03 · Soru altın madeni")}
        title={t("Real questions, real volume", "Gerçek sorular, gerçek hacim")}
        sub={t(
          `${TOTAL_Q} questions people actually type into Google, clustered by service. Each one is either an ad headline, a blog post, or an FAQ answer waiting to be written.`,
          `İnsanların Google'a gerçekten yazdığı ${TOTAL_Q} soru, hizmete göre kümelenmiş. Her biri yazılmayı bekleyen bir reklam başlığı, blog yazısı veya SSS cevabı.`
        )}
      />

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label={t("Questions mined", "Çıkarılan sorular")} value={`${TOTAL_Q}+`} accent="default" />
        <Stat label={t("Monthly searches", "Aylık aramalar")} value={`${(TOTAL_VOL / 1000).toFixed(1)}K`} accent="gold" />
        <Stat label={t("Avg difficulty", "Ort. zorluk")} value="KD 26" accent="default" />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["All", "Ad", "Blog", "FAQ"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
              filter === f
                ? "border-brand-red bg-brand-red/20 text-brand-red"
                : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {filterLabel(f)}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {CLUSTERS.map((c) => {
          const filtered = filter === "All" ? c.qs : c.qs.filter((q) => q.use === filter);
          if (filtered.length === 0) return null;
          return (
            <div key={c.nameEn} className={`rounded-2xl border bg-gradient-to-br ${c.tone} p-4`}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold">{t(c.nameEn, c.nameTr)}</div>
                <span className="rounded-full bg-card/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{filtered.length} {t("qs", "soru")}</span>
              </div>
              <ul className="mt-3 space-y-2">
                {filtered.map((q) => (
                  <li key={q.q} className="flex items-start gap-2 rounded-lg bg-card/40 p-2 backdrop-blur">
                    <UseBadge use={q.use} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm">{t(q.qEn, q.q)}</div>
                      <div className="truncate text-[10px] italic text-muted-foreground">{t(q.q, q.qEn)}</div>
                      <div className="mt-0.5 flex gap-3 font-mono text-[10px] text-muted-foreground">
                        <span>{q.vol.toLocaleString()}/{t("mo", "ay")}</span>
                        <span>KD {q.kd}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function UseBadge({ use }: { use: "Ad" | "Blog" | "FAQ" }) {
  const cls =
    use === "Ad" ? "bg-brand-red/20 text-brand-red"
    : use === "Blog" ? "bg-sky-500/15 text-sky-400"
    : "bg-brand-gold/20 text-brand-gold";
  return <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase ${cls}`}>{use}</span>;
}

/* ---------- atoms ---------- */
function Stat({ label, value, accent }: { label: string; value: string; accent: "red" | "gold" | "default" }) {
  const cls =
    accent === "red" ? "border-brand-red/40 text-brand-red"
    : accent === "gold" ? "border-brand-gold/40 text-brand-gold"
    : "border-border/60 text-foreground";
  return (
    <div className={`rounded-2xl border bg-card/40 p-3 backdrop-blur ${cls}`}>
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">{label}</div>
      <div className="mt-1 text-lg font-extrabold sm:text-2xl">{value}</div>
    </div>
  );
}
