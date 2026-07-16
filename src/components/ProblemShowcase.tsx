import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageProvider";
import liveBoiler from "@/assets/live-boiler-wiring.jpg";
import liveFloor from "@/assets/live-floor-protection.jpg";
import liveJobsite from "@/assets/live-jobsite-prep.jpg";
import liveExterior from "@/assets/live-exterior-mainline.jpg";
import liveCeiling from "@/assets/live-ceiling-access.jpg";
import liveBathroom from "@/assets/live-bathroom-breakout.jpg";
import liveStorefront from "@/assets/live-storefront-linework.jpg";
import liveRoof from "@/assets/live-roof-drainage.jpg";
import liveGasLine from "@/assets/live-gas-line-excavation.jpg";
import liveCommercialShell from "@/assets/live-commercial-boiler-shell.jpg";

const SLIDES = [
  { img: liveBoiler,           tr: "Kombi Devreye Alma",         en: "Boiler Commissioning",      tagTr: "Sertifikalı Ekip",   tagEn: "Certified Crew",   subTr: "Kadıköy · bugün",      subEn: "Kadıköy · today" },
  { img: liveFloor,            tr: "Zemin Koruma Protokolü",     en: "No-Damage Floor Protocol",  tagTr: "Eve Zarar Yok",      tagEn: "Zero Damage",      subTr: "Beşiktaş · bugün",     subEn: "Beşiktaş · today" },
  { img: liveJobsite,          tr: "Şantiye Hazırlığı",          en: "Jobsite Prep",              tagTr: "Disiplinli Saha",    tagEn: "Disciplined Site", subTr: "Şişli · bugün",        subEn: "Şişli · today" },
  { img: liveExterior,         tr: "Dış Ana Hat Müdahalesi",     en: "Exterior Mainline Service", tagTr: "Şehir İçi Operasyon",tagEn: "City Operations",  subTr: "Üsküdar · bugün",      subEn: "Üsküdar · today" },
  { img: liveCeiling,          tr: "Tavan Açma · Hat Tespiti",   en: "Ceiling Access · Line ID",  tagTr: "Minimum Hasar",      tagEn: "Minimal Cutting",  subTr: "Bakırköy · bugün",     subEn: "Bakırköy · today" },
  { img: liveBathroom,         tr: "Banyo Alt Zemin Onarımı",    en: "Bathroom Subfloor Repair",  tagTr: "Tam Restorasyon",    tagEn: "Full Restore",     subTr: "Maltepe · bugün",      subEn: "Maltepe · today" },
  { img: liveStorefront,       tr: "İşyeri Tesisat Revizyonu",   en: "Storefront Linework",       tagTr: "Ticari Sınıf",       tagEn: "Commercial Grade", subTr: "Beyoğlu · bugün",      subEn: "Beyoğlu · today" },
  { img: liveRoof,             tr: "Çatı & Yağmur Hattı",        en: "Roof & Rainwater Lines",    tagTr: "Mevsim Hazırlığı",   tagEn: "Season Ready",     subTr: "Sarıyer · bugün",      subEn: "Sarıyer · today" },
  { img: liveGasLine,          tr: "Doğalgaz Hattı Onarımı",     en: "Gas Line Excavation",       tagTr: "Yetkili Müdahale",   tagEn: "Authorized Repair",subTr: "Ataşehir · bugün",     subEn: "Ataşehir · today" },
  { img: liveCommercialShell,  tr: "Ticari Kazan Revizyonu",     en: "Commercial Boiler Service", tagTr: "Endüstriyel Ekip",   tagEn: "Industrial Team",  subTr: "Levent · bugün",       subEn: "Levent · today" },
];

export function ProblemShowcase() {
  const { lang } = useLang();
  const en = lang === "en";
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[22rem]">
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-br from-brand-red/30 via-brand-gold/10 to-emerald-500/20 opacity-70 blur-xl" />

      <div className="relative h-[26rem] overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-white/5 backdrop-blur-md">
        {SLIDES.map((s, i) => (
          <img
            key={i}
            src={s.img}
            alt={en ? s.en : s.tr}
            width={1024}
            height={1024}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${
              i === idx ? "scale-100 opacity-100" : "scale-110 opacity-0"
            }`}
          />
        ))}

        {/* Bottom dark gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Top tag */}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 backdrop-blur-md">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
          <span className="text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-white">
            {en ? "FROM THE FIELD" : "SAHADAN"}
          </span>
        </div>

        {/* Counter */}
        <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 backdrop-blur-md">
          <span className="text-[10px] font-extrabold tabular-nums text-white">
            {String(idx + 1).padStart(2, "0")}
            <span className="text-white/50"> / {String(SLIDES.length).padStart(2, "0")}</span>
          </span>
        </div>

        {/* Bottom title block */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div key={idx} className="animate-fade-up">
            <div className="inline-block rounded-md bg-brand-red px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-white shadow-md">
              {en ? SLIDES[idx].tagEn : SLIDES[idx].tagTr}
            </div>
            <div className="mt-2 text-[20px] font-extrabold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {en ? SLIDES[idx].en : SLIDES[idx].tr}
            </div>
            <div className="mt-1 text-[11px] font-semibold text-slate-300">
              {en ? SLIDES[idx].subEn : SLIDES[idx].subTr} • {en ? "documented job" : "belgeli iş"}
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-3 flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === idx ? "w-7 bg-brand-red" : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
