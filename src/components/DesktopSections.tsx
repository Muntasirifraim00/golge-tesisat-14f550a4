import { useState } from "react";
import {
  Phone, MessageCircle, ArrowRight, ArrowLeft, Check, Sparkles, Calculator, Clock, Calendar, ClipboardCheck,
  Droplet, Wrench, Flame, Thermometer, Zap, Camera, ShieldCheck, Truck, MapPin, Gauge, ChevronRight, Award, Headphones, Star, BadgeCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageProvider";
import { DISTRICTS } from "@/data/districts";
import vanImg from "@/assets/golge-tesisat-van.jpg";
import svcLeak from "@/assets/svc-leak.jpg";
import svcClog from "@/assets/svc-clog.jpg";
import svcCombi from "@/assets/svc-combi.jpg";
import svcRadiator from "@/assets/svc-radiator.jpg";
import svcPipe from "@/assets/svc-pipe.jpg";
import svcCamera from "@/assets/svc-camera.jpg";
import boilerCommercial from "@/assets/work-boiler-commercial.jpg";
import gasWeld from "@/assets/work-gas-weld.jpg";
import gasInstall from "@/assets/work-gas-install.jpg";
import bathLeak from "@/assets/work-bath-leak.jpg";
import villaExterior from "@/assets/work-villa-exterior.jpg";
import cleanHome from "@/assets/work-clean-home.jpg";
import techMehmet from "@/assets/tech-mehmet.jpg";
import techAhmet from "@/assets/tech-ahmet.jpg";
import techHasan from "@/assets/tech-hasan.jpg";
import techEmre from "@/assets/tech-emre.jpg";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

/* ============================================================
   DESKTOP — INSTANT QUOTE (compact 3-step wizard, premium dark)
============================================================ */
type Service = { key: string; label: string; icon: React.ComponentType<{ className?: string }>; min: number; max: number };
const SERVICES_TR: Service[] = [
  { key: "leak", label: "Su Kaçağı", icon: Droplet, min: 450, max: 1200 },
  { key: "clog", label: "Tıkanıklık", icon: Wrench, min: 350, max: 900 },
  { key: "combi", label: "Kombi", icon: Flame, min: 450, max: 1500 },
  { key: "radiator", label: "Petek Temizleme", icon: Thermometer, min: 1500, max: 3500 },
  { key: "pipe", label: "Tesisat Tamiri", icon: Zap, min: 500, max: 2000 },
  { key: "camera", label: "Kamera", icon: Camera, min: 600, max: 1500 },
];
const SERVICES_EN: Service[] = [
  { key: "leak", label: "Leak", icon: Droplet, min: 450, max: 1200 },
  { key: "clog", label: "Unclogging", icon: Wrench, min: 350, max: 900 },
  { key: "combi", label: "Boiler", icon: Flame, min: 450, max: 1500 },
  { key: "radiator", label: "Radiator", icon: Thermometer, min: 1500, max: 3500 },
  { key: "pipe", label: "Pipe Repair", icon: Zap, min: 500, max: 2000 },
  { key: "camera", label: "Camera", icon: Camera, min: 600, max: 1500 },
];
type Urgency = { key: string; label: string; sub: string; mult: number };
const URG_TR: Urgency[] = [
  { key: "now", label: "Şu an, acil", sub: "30 dk", mult: 1.25 },
  { key: "today", label: "Bugün", sub: "2-4 saat", mult: 1.0 },
  { key: "flex", label: "Esnek", sub: "Yarın+", mult: 0.9 },
];
const URG_EN: Urgency[] = [
  { key: "now", label: "Right now", sub: "30 min", mult: 1.25 },
  { key: "today", label: "Today", sub: "2-4 h", mult: 1.0 },
  { key: "flex", label: "Flexible", sub: "Tomorrow+", mult: 0.9 },
];
const DISTRICT_MULT: Record<string, number> = {
  kadikoy: 1.05, uskudar: 1.0, besiktas: 1.15, sisli: 1.1, bakirkoy: 1.05,
  atasehir: 1.05, umraniye: 1.0, maltepe: 1.0, kartal: 0.95, pendik: 0.95,
};

export function DesktopInstantQuote() {
  const { lang } = useLang();
  const en = lang === "en";
  const SERVICES = en ? SERVICES_EN : SERVICES_TR;
  const URGENCIES = en ? URG_EN : URG_TR;
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [districtSlug, setDistrictSlug] = useState("");
  const [urgency, setUrgency] = useState<Urgency | null>(null);
  const district = DISTRICTS.find((d) => d.slug === districtSlug);
  const dMult = DISTRICT_MULT[districtSlug] ?? 1;
  const lo = service && urgency ? Math.round((service.min * urgency.mult * dMult) / 10) * 10 : 0;
  const hi = service && urgency ? Math.round((service.max * urgency.mult * dMult) / 10) * 10 : 0;
  const numberLocale = en ? "en-US" : "tr-TR";
  const waMsg = encodeURIComponent(
    en ? `Hi, I need ${service?.label ?? ""} in ${district?.name ?? ""}. Urgency: ${urgency?.label ?? ""}.`
       : `Merhaba, ${district?.name ?? ""} için ${service?.label ?? ""}. Aciliyet: ${urgency?.label ?? ""}.`
  );
  function reset() { setStep(0); setService(null); setDistrictSlug(""); setUrgency(null); }

  return (
    <section className="hidden md:block relative overflow-hidden bg-[#06080d] py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none absolute -top-24 right-[-8%] h-[520px] w-[520px] rounded-full bg-brand-red/12 blur-[140px]" />

      <div className="relative mx-auto max-w-[1280px] px-8">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/25 bg-brand-red/[0.08] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand-red">
            <Calculator className="h-3.5 w-3.5" /> {en ? "Instant Price Quote" : "Anında Fiyat Teklifi"}
          </div>
          <h2 className="mt-5 text-[44px] xl:text-[54px] font-black leading-[0.96] tracking-[-0.03em] text-white">
            {en ? <>30 seconds to a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">transparent price</span></>
                : <>30 saniyede <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">şeffaf fiyat</span></>}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-slate-400">
            {en ? "Pick service, district and urgency — see a verified, VAT-included range with no surprises."
                : "Hizmet, ilçe ve aciliyeti seçin — KDV dahil, sürprizsiz, garantili fiyat aralığını görün."}
          </p>
        </div>

        {/* unified configurator */}
        <div className="mt-12 grid grid-cols-12 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          {/* LEFT — pitch panel */}
          <div className="relative col-span-5 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-red/[0.14] via-[#0b0e14] to-[#0b0e14] p-9">
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-brand-red/15 blur-[90px]" />
            <div className="relative">
              <div className="text-[12px] font-black uppercase tracking-[0.2em] text-brand-gold">
                {en ? "No call-out surprises" : "Sürpriz yok"}
              </div>
              <h3 className="mt-3 text-[28px] font-black leading-tight tracking-tight text-white">
                {en ? "Know the price before we knock." : "Kapıya gelmeden fiyatı bilin."}
              </h3>
              <div className="mt-7 space-y-3.5">
                {[
                  en ? "Transparent, VAT-included pricing" : "KDV dahil şeffaf fiyatlandırma",
                  en ? "2-year workmanship warranty" : "2 yıl işçilik garantisi",
                  en ? "Same-day arrival across Istanbul" : "İstanbul genelinde aynı gün varış",
                  en ? "Free inspection, no commitment" : "Ücretsiz keşif, taahhütsüz",
                ].map((x) => (
                  <div key={x} className="flex items-start gap-3 text-[14px] text-slate-200">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                    {x}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gold/15">
                <Star className="h-5 w-5 fill-brand-gold text-brand-gold" />
              </span>
              <div className="leading-tight">
                <div className="text-[15px] font-black text-white">4.9 / 5 · Google</div>
                <div className="text-[12px] text-slate-400">{en ? "From 10.000+ jobs" : "10.000+ iş üzerinden"}</div>
              </div>
            </div>
          </div>

          {/* RIGHT — wizard */}
          <div className="col-span-7 p-9">
            {/* Stepper */}
            <div className="mb-7 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? "w-10 bg-brand-red" : "w-6 bg-white/10"}`} />
                ))}
              </div>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                {en ? "Step" : "Adım"} {Math.min(step + 1, 4)}/4
              </div>
            </div>

            {step === 0 && (
              <div>
                <div className="mb-4 text-[19px] font-black text-white">{en ? "What do you need?" : "Hangi hizmet?"}</div>
                <div className="grid grid-cols-3 gap-3">
                  {SERVICES.map((s) => (
                    <button key={s.key} onClick={() => { setService(s); setStep(1); }}
                      className="group flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand-red/40 hover:bg-brand-red/10">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/15 transition-colors group-hover:bg-brand-red">
                        <s.icon className="h-5 w-5 text-brand-red group-hover:text-white" />
                      </div>
                      <div className="text-[13px] font-black leading-tight text-white">{s.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[19px] font-black text-white">{en ? "Your district?" : "İlçeniz?"}</div>
                  <button onClick={() => setStep(0)} className="flex items-center gap-1 text-[12px] font-bold text-slate-400 hover:text-brand-red"><ArrowLeft className="h-3.5 w-3.5" />{en ? "Back" : "Geri"}</button>
                </div>
                <div className="grid max-h-[280px] grid-cols-4 gap-2 overflow-y-auto pr-1">
                  {DISTRICTS.map((d) => (
                    <button key={d.slug} onClick={() => { setDistrictSlug(d.slug); setStep(2); }}
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left text-[12px] font-bold text-white transition-all hover:border-brand-red/40 hover:bg-brand-red/10">
                      {d.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[19px] font-black text-white">{en ? "When?" : "Ne zaman?"}</div>
                  <button onClick={() => setStep(1)} className="flex items-center gap-1 text-[12px] font-bold text-slate-400 hover:text-brand-red"><ArrowLeft className="h-3.5 w-3.5" />{en ? "Back" : "Geri"}</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {URGENCIES.map((u) => (
                    <button key={u.key} onClick={() => { setUrgency(u); setStep(3); }}
                      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition-all hover:-translate-y-0.5 hover:border-brand-red/40 hover:bg-brand-red/10">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-red/15">
                        <Clock className="h-5 w-5 text-brand-red" />
                      </span>
                      <div className="mt-3 text-[14px] font-black text-white">{u.label}</div>
                      <div className="mt-0.5 text-[11px] text-slate-400">{u.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && service && urgency && district && (
              <div>
                <div className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  <Check className="h-3.5 w-3.5" /> {en ? "Estimated Range" : "Tahmini Aralık"}
                </div>
                <div className="rounded-3xl bg-gradient-to-br from-brand-red via-red-600 to-red-800 p-7 text-white shadow-[0_24px_60px_-18px_rgba(226,59,59,0.6)]">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-90">{service.label} • {district.name}</div>
                  <div className="mt-2 text-[52px] font-black leading-none tracking-tight">
                    {lo.toLocaleString(numberLocale)}–{hi.toLocaleString(numberLocale)} <span className="text-[24px] opacity-80">₺</span>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-[12px] opacity-90">
                    <Sparkles className="h-3.5 w-3.5" /> {urgency.label} • {en ? "VAT included" : "KDV dahil"} • {en ? "2y warranty" : "2 yıl garanti"}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <a href={PHONE_HREF} className="flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-[14px] font-black text-black transition-transform hover:scale-[1.02]">
                    <Phone className="h-4 w-4 fill-brand-red text-brand-red" /> {PHONE}
                  </a>
                  <a href={`https://wa.me/905338960503?text=${waMsg}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-[14px] font-black text-white transition-transform hover:scale-[1.02]">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
                <button onClick={reset} className="mt-3 w-full text-center text-[12px] font-bold text-slate-400 hover:text-brand-red">
                  ↻ {en ? "New quote" : "Yeni teklif"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — OUR SERVICES (compact bento, premium dark)
============================================================ */
const SVC_IMAGES = [svcLeak, svcClog, svcCombi, svcRadiator, svcPipe, svcCamera];
const SVC_ICONS = [Droplet, Wrench, Flame, Thermometer, Zap, Camera];

export function DesktopServices() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const responses = en ? ["~28 min", "~35 min", "~40 min", "~45 min", "~32 min", "~30 min"] : ["~28 dk", "~35 dk", "~40 dk", "~45 dk", "~32 dk", "~30 dk"];

  return (
    <section id="services" className="hidden md:block relative overflow-hidden bg-[#0B0E14] py-24">
      <div className="pointer-events-none absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-brand-red/10 blur-[150px]" />
      <div className="pointer-events-none absolute -top-20 left-0 h-[360px] w-[440px] rounded-full bg-brand-gold/5 blur-[140px]" />

      <div className="relative mx-auto max-w-[1320px] px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold tracking-wide text-slate-300">
              <Wrench className="h-3.5 w-3.5 text-brand-red" />
              {en ? "Full-service plumbing & heating" : "Tam kapsamlı tesisat ve ısıtma"}
            </div>
            <h2 className="mt-6 text-[52px] xl:text-[60px] font-black leading-[0.95] tracking-tight text-white">
              {t.services.title1}{" "}
              <span className="bg-gradient-to-r from-brand-red to-orange-400 bg-clip-text text-transparent">
                {t.services.title2}
              </span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-slate-400">{t.services.desc}</p>
          </div>
          <div className="hidden shrink-0 items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 xl:flex">
            <div>
              <div className="text-[12px] font-medium tracking-wide text-slate-500">{en ? "Avg. response" : "Ort. yanıt"}</div>
              <div className="mt-1 text-[38px] font-black leading-none text-white">
                30<span className="ml-1 text-[15px] text-brand-red">{en ? "min" : "dk"}</span>
              </div>
            </div>
            <a href={PHONE_HREF} className="flex h-12 items-center gap-2 rounded-full bg-brand-red px-5 text-[13px] font-black text-white shadow-[0_14px_34px_-14px_rgba(226,59,59,0.8)] transition-transform hover:-translate-y-0.5">
              <Phone className="h-4 w-4" /> {en ? "Call" : "Ara"}
            </a>
          </div>
        </div>

        {/* Service grid — icon-first cards */}
        <div className="mt-14 grid grid-cols-3 gap-6">
          {t.services.items.map((s, i) => {
            const SIcon = SVC_ICONS[i];
            return (
              <article
                key={i}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-red/40 hover:shadow-[0_30px_60px_-30px_rgba(226,59,59,0.45)]"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={SVC_IMAGES[i]} alt={s.t} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-transparent" />
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/40 backdrop-blur-md transition-colors group-hover:border-brand-red group-hover:bg-brand-red">
                    <SIcon className="h-5 w-5 text-brand-red transition-colors group-hover:text-white" />
                  </div>
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold text-emerald-300 backdrop-blur-md">
                    <Clock className="h-3 w-3" /> {responses[i]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[19px] font-black leading-tight text-white">{s.t}</h3>
                  <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-400">{s.d}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-300">
                      <BadgeCheck className="h-4 w-4 text-emerald-400" />
                      {en ? "2-yr warranty" : "2 yıl garanti"}
                    </span>
                    <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 text-[13px] font-black text-brand-red transition-all group-hover:gap-2.5">
                      {en ? "Get help" : "Yardım al"} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA band */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-[24px] border border-white/10 bg-gradient-to-r from-brand-red/[0.1] via-white/[0.02] to-transparent px-8 py-6">
          <div>
            <div className="text-[20px] font-black text-white">{en ? "Not sure which service you need?" : "Hangi hizmete ihtiyacınız var emin değil misiniz?"}</div>
            <div className="mt-1 text-[14px] text-slate-400">{en ? "Tell us the problem — we'll guide you and quote on the spot." : "Sorunu anlatın — yönlendirelim ve anında fiyat verelim."}</div>
          </div>
          <div className="flex items-center gap-3">
            <a href={PHONE_HREF} className="flex items-center gap-2 rounded-2xl bg-brand-red px-6 py-3.5 text-[14px] font-black text-white shadow-[0_16px_36px_-16px_rgba(226,59,59,0.8)] transition-transform hover:-translate-y-0.5">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a href="https://wa.me/905338960503" target="_blank" rel="noopener" className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-[14px] font-black text-white transition-colors hover:bg-white/[0.08]">
              <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — OUR SERVICE AREAS (compact split, premium dark)
============================================================ */
export function DesktopServiceAreas() {
  const { lang } = useLang();
  const en = lang === "en";
  const eu = ["Beşiktaş","Şişli","Bakırköy","Beylikdüzü","Sarıyer","Beyoğlu","Fatih","Bahçelievler","Eyüpsultan","Kağıthane","Zeytinburnu","Bağcılar"];
  const asia = ["Kadıköy","Üsküdar","Ataşehir","Maltepe","Ümraniye","Kartal","Pendik","Beykoz","Çekmeköy","Tuzla","Sancaktepe","Sultanbeyli"];
  const slugByName: Record<string, string> = Object.fromEntries(DISTRICTS.map((d) => [d.name, d.slug]));
  const chipCls = "px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[12px] font-semibold text-slate-200 hover:border-brand-red/50 hover:bg-brand-red/10 hover:text-white transition-all";

  return (
    <section className="hidden md:block relative bg-[#0B0E14] py-24 overflow-hidden">
      {/* ambient */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[540px] h-[420px] bg-brand-red/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[440px] h-[340px] bg-brand-gold/[0.06] blur-[130px] rounded-full" />

      <div className="relative mx-auto max-w-[1320px] px-8">
        {/* Header */}
        <div className="grid grid-cols-12 items-end gap-10 mb-12">
          <div className="col-span-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-[11px] font-semibold tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-brand-red" /> {en ? "Service coverage · 41 districts" : "Hizmet kapsamı · 41 ilçe"}
            </div>
            <h2 className="mt-6 text-[48px] xl:text-[58px] font-black leading-[0.95] tracking-tight text-white">
              {en ? <>Two continents.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">One promise.</span></>
                  : <>İki kıta.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">Tek söz.</span></>}
            </h2>
            <p className="mt-5 text-[15px] text-slate-400 max-w-xl leading-relaxed">
              {en ? "From the Bosphorus shores to the city outskirts — a fully equipped van is already on your side of the bridge, ready to reach you within the half hour."
                  : "Boğaz kıyılarından şehrin uzak ilçelerine — tam donanımlı bir araç zaten köprünün sizin tarafınızda, yarım saat içinde yanınızda."}
            </p>
          </div>
          <div className="col-span-4 flex justify-end gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-right">
              <div className="text-[11px] font-medium tracking-wide text-slate-500">{en ? "Covered" : "Kapsanan"}</div>
              <div className="mt-1.5 text-[30px] font-black text-white leading-none">41<span className="text-[15px] text-slate-400 ml-1">{en ? "districts" : "ilçe"}</span></div>
            </div>
            <div className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-6 py-5 text-right">
              <div className="text-[11px] font-medium tracking-wide text-brand-red">{en ? "Avg. arrival" : "Ort. varış"}</div>
              <div className="mt-1.5 text-[30px] font-black text-white leading-none">30<span className="text-[15px] text-brand-red ml-1">{en ? "min" : "dk"}</span></div>
            </div>
          </div>
        </div>

        {/* Bosphorus split panel */}
        <div className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent overflow-hidden">
          {/* SVG Bosphorus curve divider */}
          <svg className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-[200px] pointer-events-none" viewBox="0 0 180 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="bosphorus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.0" />
                <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.14" />
                <stop offset="55%" stopColor="#38bdf8" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d="M 60 0 C 110 150, 30 300, 90 420 S 130 540, 100 600 L 130 600 C 160 540, 130 480, 110 380 S 70 200, 130 0 Z" fill="url(#bosphorus)" />
            <path d="M 60 0 C 110 150, 30 300, 90 420 S 130 540, 100 600" stroke="rgba(56,189,248,0.28)" strokeWidth="1" strokeDasharray="3 6" fill="none" />
            <path d="M 130 0 C 70 200, 110 320, 110 380 S 160 540, 130 600" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="3 6" fill="none" />
          </svg>

          {/* Center bridge medallion */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative w-[140px] h-[140px] rounded-full bg-gradient-to-br from-brand-red to-[#7a1313] border-4 border-[#0B0E14] flex flex-col items-center justify-center text-white shadow-[0_25px_60px_-15px_rgba(226,59,59,0.7)]">
              <Clock className="w-5 h-5 mb-1 opacity-90" />
              <div className="text-[34px] font-black leading-none">30</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] mt-1 opacity-90">{en ? "min avg" : "dk ort."}</div>
            </div>
          </div>

          <div className="relative grid grid-cols-2">
            {/* European Side */}
            <div className="p-9 pr-28">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300/80 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-300" /> {en ? "European Side" : "Avrupa Yakası"}
              </div>
              <div className="text-[26px] font-black text-white tracking-tight">{en ? "West of the strait" : "Boğazın batısı"}</div>
              <div className="mt-1 text-[12px] text-slate-500">{en ? "27 districts covered" : "27 ilçe kapsamda"}</div>

              <div className="mt-7 flex flex-wrap gap-2">
                {eu.map((d) => {
                  const slug = slugByName[d];
                  return slug
                    ? <Link key={d} to="/tesisatci/$slug" params={{ slug }} className={`${chipCls} cursor-pointer`}>{d}</Link>
                    : <span key={d} className={`${chipCls} cursor-default`}>{d}</span>;
                })}
                <span className="px-3 py-1.5 text-[12px] font-black text-brand-red">+15 {en ? "more" : "daha"}</span>
              </div>

              <div className="mt-7 inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                <Truck className="w-4 h-4 text-brand-red" />
                <span className="text-[12px] text-slate-200 font-semibold">{en ? "4 vans on the European side now" : "Avrupa yakasında şu an 4 araç"}</span>
              </div>
            </div>

            {/* Asian Side */}
            <div className="p-9 pl-28 text-right">
              <div className="flex items-center justify-end gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300/80 mb-2">
                {en ? "Asian Side" : "Anadolu Yakası"} <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
              </div>
              <div className="text-[26px] font-black text-white tracking-tight">{en ? "East of the strait" : "Boğazın doğusu"}</div>
              <div className="mt-1 text-[12px] text-slate-500">{en ? "14 districts covered" : "14 ilçe kapsamda"}</div>

              <div className="mt-7 flex flex-wrap gap-2 justify-end">
                {asia.map((d) => {
                  const slug = slugByName[d];
                  return slug
                    ? <Link key={d} to="/tesisatci/$slug" params={{ slug }} className={`${chipCls} cursor-pointer`}>{d}</Link>
                    : <span key={d} className={`${chipCls} cursor-default`}>{d}</span>;
                })}
                <span className="px-3 py-1.5 text-[12px] font-black text-brand-red">+2 {en ? "more" : "daha"}</span>
              </div>

              <div className="mt-7 inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                <Truck className="w-4 h-4 text-brand-red" />
                <span className="text-[12px] text-slate-200 font-semibold">{en ? "3 vans on the Asian side now" : "Anadolu yakasında şu an 3 araç"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA + coupon strip */}
        <div className="mt-6 grid grid-cols-12 gap-3">
          <a href={PHONE_HREF} className="col-span-4 group flex items-center gap-3 rounded-2xl bg-brand-red hover:bg-[#c12a2a] p-5 text-white transition-all hover:-translate-y-0.5 shadow-[0_14px_34px_-14px_rgba(226,59,59,0.8)]">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0"><Phone className="w-4 h-4" /></div>
            <div className="flex-1 leading-tight">
              <div className="text-[11px] font-semibold uppercase tracking-wide opacity-90">{en ? "Call now" : "Hemen ara"}</div>
              <div className="text-[16px] font-black">{PHONE}</div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="https://wa.me/905338960503" target="_blank" rel="noopener" className="col-span-4 group flex items-center gap-3 rounded-2xl bg-[#25D366] hover:bg-[#1fb355] p-5 text-white transition-all hover:-translate-y-0.5 shadow-[0_14px_34px_-14px_rgba(37,211,102,0.5)]">
            <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0"><MessageCircle className="w-4 h-4" /></div>
            <div className="flex-1 leading-tight">
              <div className="text-[11px] font-semibold uppercase tracking-wide opacity-90">WhatsApp</div>
              <div className="text-[16px] font-black">{en ? "Get instant support" : "Anında destek al"}</div>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          {/* Coupon ticket */}
          <div className="col-span-4 relative overflow-hidden rounded-2xl border border-brand-red/40 bg-gradient-to-br from-brand-red/25 via-brand-red/5 to-transparent p-5 flex items-center gap-3">
            <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B0E14]" />
            <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0B0E14]" />
            <div className="flex h-13 w-13 shrink-0 flex-col items-center justify-center rounded-full border-2 border-dashed border-brand-red bg-brand-red/15 px-3 py-3 text-white">
              <div className="text-[14px] font-black leading-none">{en ? "15%" : "%15"}</div>
              <div className="text-[7px] font-bold tracking-widest mt-0.5">{en ? "OFF" : "İND."}</div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[9px] font-bold tracking-widest text-brand-red">{en ? "WEBSITE EXCLUSIVE" : "WEB SİTEMİZE ÖZEL"}</div>
              <div className="text-[14px] font-black text-white leading-tight mt-0.5">{en ? "First service discount" : "İlk hizmette indirim"}</div>
              <div className="mt-1 text-[15px] font-black tracking-[0.25em] text-brand-red">TESISAT15</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — OUR SERVICE PROCESS (horizontal timeline)
============================================================ */
export function DesktopServiceProcess() {
  const { lang } = useLang();
  const en = lang === "en";
  const steps = en ? [
    { t: "Get in Touch", d: "Call us. Describe your need in 30 seconds.", meta: "~30 sec" },
    { t: "Book a Slot", d: "We pick a time that fits your schedule.", meta: "Same day" },
    { t: "Pro Arrives", d: "Certified expert at your door, on time.", meta: "On time" },
    { t: "Inspect & Fix", d: "Diagnose, quote, repair on approval.", meta: "Approved" },
    { t: "Test & Hand Over", d: "Full test, clean up, 2-year warranty.", meta: "2-yr warranty" },
  ] : [
    { t: "İletişime Geçin", d: "Bizi arayın, ihtiyacınızı 30 saniyede anlatın.", meta: "~30 sn" },
    { t: "Randevu Alın", d: "Planınıza uygun zamanı birlikte seçelim.", meta: "Aynı gün" },
    { t: "Uzman Gelir", d: "Sertifikalı uzmanımız zamanında kapınızda.", meta: "Zamanında" },
    { t: "Kontrol & Onarım", d: "Tespit, teklif ve onayınızla onarım.", meta: "Onaylı" },
    { t: "Test & Teslim", d: "Tam test, temizlik, 2 yıl garanti.", meta: "2 yıl garanti" },
  ];
  const Icons = [Phone, Calendar, Truck, Wrench, ShieldCheck];
  const activeIdx = 2;

  return (
    <section className="hidden md:block relative bg-[#0B0E14] py-20 overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute top-10 right-1/4 w-[520px] h-[420px] bg-brand-red/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[420px] h-[320px] bg-orange-500/5 blur-[120px] rounded-full" />
      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="relative mx-auto max-w-[1320px] px-8">
        {/* Header — asymmetric */}
        <div className="grid grid-cols-12 items-end gap-10 mb-14">
          <div className="col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-[11px] font-semibold tracking-wide">
              <ClipboardCheck className="w-3.5 h-3.5 text-brand-red" />
              {en ? "How it works · 5 steps" : "Nasıl çalışır · 5 adım"}
            </div>
            <h2 className="mt-6 text-[48px] xl:text-[58px] font-black leading-[0.95] tracking-tight text-white">
              {en ? <>From call to fix,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">in five precise moves.</span></>
                  : <>Aramadan tamire,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">tam beş net adımda.</span></>}
            </h2>
          </div>
          <div className="col-span-5 flex justify-end gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur px-5 py-4 text-right">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">{en ? "Avg. completion" : "Ort. tamamlama"}</div>
              <div className="mt-1 text-[28px] font-black text-white leading-none"><span className="text-brand-red">94</span> <span className="text-[14px] text-slate-400">{en ? "min" : "dk"}</span></div>
            </div>
            <div className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-5 py-4 text-right">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-red">{en ? "Satisfaction" : "Memnuniyet"}</div>
              <div className="mt-1 text-[28px] font-black text-white leading-none">98<span className="text-[14px] text-brand-red">%</span></div>
            </div>
          </div>
        </div>

        {/* Mission-control track */}
        <div className="relative">
          {/* SVG flowing track */}
          <svg className="absolute inset-x-0 top-[112px] w-full h-[80px] pointer-events-none" viewBox="0 0 1240 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#e23b3b" stopOpacity="0" />
                <stop offset="15%" stopColor="#e23b3b" stopOpacity="0.7" />
                <stop offset="85%" stopColor="#e23b3b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#e23b3b" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 60 40 C 200 -10, 360 90, 500 40 S 800 -10, 940 40 S 1180 90, 1240 40" stroke="url(#trackGrad)" strokeWidth="2" fill="none" strokeDasharray="6 6" />
          </svg>

          <div className="grid grid-cols-5 gap-5 relative">
            {steps.map((s, i) => {
              const Ic = Icons[i];
              const isActive = i === activeIdx;
              const isDone = i < activeIdx;
              const liftClass = i % 2 === 0 ? "translate-y-0" : "translate-y-10";
              return (
                <div key={i} className={`group relative ${liftClass}`}>
                  {/* station node */}
                  <div className="relative flex items-center justify-center h-[110px]">
                    <div className={`relative w-20 h-20 rounded-[28%] rotate-45 flex items-center justify-center transition-transform group-hover:scale-110 ${
                      isActive ? "bg-gradient-to-br from-brand-red to-[#7a1313] shadow-[0_20px_50px_-10px_rgba(226,59,59,0.85)]" :
                      isDone ? "bg-gradient-to-br from-brand-red/80 to-[#7a1313]/70 shadow-[0_12px_30px_-10px_rgba(226,59,59,0.5)]" :
                      "bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10"}`}>
                      <Ic className={`w-7 h-7 -rotate-45 ${isActive || isDone ? "text-white" : "text-slate-300"}`} />
                    </div>
                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest ${
                      isActive ? "bg-brand-red text-white" : isDone ? "bg-white/10 text-slate-300" : "bg-white/5 text-slate-400 border border-white/10"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* card */}
                  <div className={`mt-3 rounded-2xl border p-5 transition-all hover:-translate-y-1 ${
                    isActive ? "border-brand-red/40 bg-gradient-to-br from-brand-red/10 to-transparent shadow-[0_20px_60px_-25px_rgba(226,59,59,0.5)]" :
                    "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}>
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-brand-red">
                      <Clock className="w-3 h-3" /> {s.meta}
                    </div>
                    <div className="mt-2 text-[15px] font-black text-white leading-tight">{s.t}</div>
                    <p className="mt-2 text-[11.5px] text-slate-400 leading-snug">{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur px-6 py-5">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-red">{en ? "Ready when you are" : "Sen hazırsan biz hazırız"}</div>
            <div className="mt-1 text-[18px] font-black text-white">{en ? "Start step 01 in under 30 seconds." : "01. adımı 30 saniyenin altında başlatın."}</div>
          </div>
          <div className="flex items-center gap-3">
            <a href={PHONE_HREF} className="px-6 py-3 bg-brand-red hover:bg-[#c12a2a] text-white rounded-xl font-black text-[13px] flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-[0_12px_30px_-12px_rgba(226,59,59,0.7)]">
              <Phone className="w-4 h-4" /> {en ? "Call now" : "Hemen ara"}
            </a>
            <Link to="/randevu" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[13px] border border-white/10 flex items-center gap-2 transition-all hover:-translate-y-0.5">
              {en ? "Book online" : "Online randevu"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — OUR FLEET ("Fleet Grid", premium editorial)
============================================================ */
export function DesktopFleet() {
  const { lang } = useLang();
  const en = lang === "en";
  const fleet = [
    { id: "01", model: "Mercedes Sprinter", area: en ? "Beşiktaş" : "Beşiktaş", status: en ? "On site" : "Sahada", live: true },
    { id: "04", model: "Ford Transit", area: en ? "Kadıköy" : "Kadıköy", status: en ? "On the way" : "Yolda", live: true },
    { id: "07", model: "Iveco Daily", area: en ? "Şişli hub" : "Şişli üs", status: en ? "Standby" : "Hazır", live: false },
    { id: "09", model: "VW Crafter", area: en ? "Üsküdar" : "Üsküdar", status: en ? "Returning" : "Dönüş", live: true },
    { id: "11", model: "Mercedes Vito", area: en ? "Ataşehir" : "Ataşehir", status: en ? "On site" : "Sahada", live: true },
  ];
  const equipment = en
    ? ["Thermal camera", "Acoustic leak detector", "Pipe inspection scope", "Welding kit", "High-pressure unit", "OEM spare parts", "Gas detector", "Boiler service kit"]
    : ["Termal kamera", "Akustik kaçak dedektörü", "Boru kamerası", "Kaynak seti", "Yüksek basınç ünitesi", "Orijinal yedek parça", "Gaz dedektörü", "Kombi servis seti"];

  return (
    <section className="hidden md:block relative overflow-hidden bg-[#0B0E14] py-24">
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-[460px] w-[560px] rounded-full bg-brand-red/10 blur-[150px]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[380px] w-[460px] rounded-full bg-brand-gold/5 blur-[140px]" />

      <div className="relative mx-auto max-w-[1320px] px-8">
        {/* Header */}
        <div className="flex items-end justify-between gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5">
              <Truck className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-semibold tracking-wide text-slate-300">
                {en ? "7 vans on duty across Istanbul" : "İstanbul genelinde 7 araç görevde"}
              </span>
            </div>
            <h2 className="mt-6 text-[52px] xl:text-[60px] font-black leading-[0.95] tracking-tight text-white">
              {en ? "A fleet built to" : "Her zaman hazır"}{" "}
              <span className="bg-gradient-to-r from-brand-red to-orange-400 bg-clip-text text-transparent">
                {en ? "reach you fast" : "bir filo"}
              </span>
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-slate-400">
              {en
                ? "Twelve fully equipped service units patrol Istanbul around the clock — so a certified technician with the right tools is never far from your door."
                : "On iki tam donanımlı servis ünitesi İstanbul'da 7/24 sahada — doğru ekipmanla gelen sertifikalı teknisyen kapınızdan hiçbir zaman uzakta değil."}
            </p>
          </div>
          {/* Stats */}
          <div className="hidden shrink-0 grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] xl:grid">
            {[
              { v: "12+", l: en ? "Service vans" : "Servis aracı" },
              { v: "30 min", l: en ? "Avg. arrival" : "Ort. varış" },
              { v: "39", l: en ? "Districts" : "İlçe" },
              { v: "24/7", l: en ? "On the road" : "Sahada" },
            ].map((s) => (
              <div key={s.l} className="bg-[#0B0E14] px-7 py-5 text-center">
                <div className="text-[26px] font-black leading-none text-white">{s.v}</div>
                <div className="mt-2 text-[11px] font-medium tracking-wide text-slate-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="mt-12 grid grid-cols-12 gap-6">
          {/* Featured vehicle */}
          <div className="col-span-7 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={vanImg} alt={en ? "Gölge Tesisat service van" : "Gölge Tesisat servis aracı"} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/25 to-transparent" />
              <div className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur">
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                {en ? "Active unit" : "Aktif araç"}
              </div>
              <div className="absolute bottom-7 left-7 right-7">
                <div className="text-[13px] font-semibold tracking-wide text-brand-red">{en ? "Unit 01 · Beşiktaş" : "Araç 01 · Beşiktaş"}</div>
                <div className="mt-1.5 text-[30px] font-black leading-tight text-white">Mercedes Sprinter</div>
                <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-slate-300">
                  {en
                    ? "Our flagship unit — a mobile workshop carrying everything from thermal cameras to OEM parts."
                    : "Amiral aracımız — termal kameradan orijinal parçaya kadar her şeyi taşıyan mobil atölye."}
                </p>
              </div>
            </div>
            {/* Equipment */}
            <div className="border-t border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-bold uppercase tracking-wider text-slate-400">{en ? "On-board equipment" : "Araç donanımı"}</div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                  <BadgeCheck className="h-3.5 w-3.5" /> {en ? "Verified & calibrated" : "Doğrulandı ve kalibre"}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {equipment.map((c) => (
                  <div key={c} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                    <span className="truncate text-[12.5px] font-semibold text-slate-200">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Roster */}
          <div className="col-span-5 flex flex-col rounded-[28px] border border-white/10 bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="text-[12px] font-bold uppercase tracking-wider text-slate-400">{en ? "Active units" : "Aktif araçlar"}</div>
              <div className="text-[11px] text-slate-500">
                <span className="font-bold text-emerald-300">{fleet.filter((v) => v.live).length}</span> / {fleet.length} {en ? "live" : "canlı"}
              </div>
            </div>
            <ul className="flex-1 divide-y divide-white/5">
              {fleet.map((v) => (
                <li key={v.id} className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.03]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-red/10 ring-1 ring-brand-red/25 transition-transform group-hover:scale-105">
                    <Truck className="h-5 w-5 text-brand-red" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[14px] font-extrabold text-white">{v.model}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[12px] text-slate-400">
                      <MapPin className="h-3 w-3 text-slate-500" />
                      {v.area}
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${v.live ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-slate-500"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${v.live ? "bg-emerald-400" : "bg-slate-500"}`} />
                    {v.status}
                  </div>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-2.5 border-t border-white/10 p-4">
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-4 py-3 text-[13px] font-black text-white shadow-[0_14px_34px_-14px_rgba(226,59,59,0.8)] transition-transform hover:-translate-y-0.5">
                <Phone className="h-4 w-4" /> {en ? "Call now" : "Hemen ara"}
              </a>
              <Link to="/randevu" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[13px] font-black text-white transition-colors hover:bg-white/[0.08]">
                {en ? "Book a slot" : "Randevu al"} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — FROM THE FIELD (compact editorial bento, premium dark)
============================================================ */



export function DesktopFromField() {
  const { lang } = useLang();
  const en = lang === "en";
  const items = [
    { img: boilerCommercial, tag: en ? "COMMERCIAL" : "TİCARİ", title: en ? "Boiler at Office Entry" : "Ofis Girişinde Kazan", span: "col-span-6 row-span-2" },
    { img: gasWeld, tag: en ? "GAS LINE" : "DOĞALGAZ", title: en ? "Certified Welding" : "Sertifikalı Kaynak", span: "col-span-3 row-span-1" },
    { img: bathLeak, tag: en ? "LEAK" : "KAÇAK", title: en ? "Under-Bath Leak" : "Banyo Altı Kaçak", span: "col-span-3 row-span-1" },
    { img: villaExterior, tag: en ? "VILLA" : "VİLLA", title: en ? "Exterior Line Opening" : "Dış Hat Açımı", span: "col-span-3 row-span-1" },
    { img: gasInstall, tag: en ? "EXTERIOR" : "DIŞ CEPHE", title: en ? "Meter-to-Unit Install" : "Sayaçtan Cihaza Hat", span: "col-span-3 row-span-1" },
    { img: cleanHome, tag: en ? "RESPECT" : "DİSİPLİN", title: en ? "Floor Protection First" : "Önce Zemin Koruma", span: "col-span-6 row-span-1" },
  ];
  return (
    <section className="hidden md:block bg-[#0a0a0a] py-14 px-8 relative overflow-hidden">
      <div className="absolute -top-40 -right-32 w-[420px] h-[420px] rounded-full bg-brand-red/10 blur-[140px]" />
      <div className="mx-auto max-w-[1280px] relative">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-red/15 border border-brand-red/30 rounded-full">
              <Camera className="w-3 h-3 text-brand-red" />
              <span className="text-[10px] font-extrabold tracking-[0.18em] text-brand-red uppercase">{en ? "FROM THE FIELD" : "SAHADAN KARELER"}</span>
            </div>
            <h2 className="mt-3 text-[40px] font-black leading-[0.95] text-white tracking-tight">
              {en ? <>Real work, <span className="text-brand-red italic">measurable standard</span></> : <>Gerçek iş, <span className="text-brand-red italic">ölçülebilir standart</span></>}
            </h2>
          </div>
          <p className="max-w-sm text-[13px] leading-relaxed text-slate-400">
            {en ? "Disciplined entry, controlled intervention, an orderly site on the way out." : "Kontrollü giriş, ölçülü müdahale, arkamızda düzen bırakan bir teslim."}
          </p>
        </div>

        <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[460px]">
          {items.map((it) => (
            <article key={it.title} className={`group relative overflow-hidden rounded-2xl ${it.span} bg-white/5 border border-white/10 hover:border-brand-red/40 transition-all`}>
              <img src={it.img} alt={it.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-3 left-3 px-2 py-0.5 bg-brand-red rounded-full text-[8.5px] font-extrabold tracking-[0.14em] text-white shadow-lg">{it.tag}</div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-[14px] font-bold text-white leading-tight drop-shadow">{it.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-brand-red/90">
                  <ShieldCheck className="w-2.5 h-2.5" /> {en ? "Site standard" : "Saha standardı"}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — MEET TECHNICIANS (compact roster strip, premium dark)
============================================================ */
export function DesktopTechnicians() {
  const { lang } = useLang();
  const en = lang === "en";
  const list = [
    { name: en ? "Hasan" : "Hasan Usta", photo: techHasan, role: en ? "Lead Plumber" : "Baş Tesisat Ustası", years: 22, jobs: en ? "3,400+" : "3.400+", rating: 4.9, tags: en ? ["Leak", "Main Line", "Gas"] : ["Su Kaçağı", "Ana Boru", "Doğalgaz"] },
    { name: en ? "Mehmet" : "Mehmet Usta", photo: techMehmet, role: en ? "Boiler Specialist" : "Kombi Uzmanı", years: 14, jobs: en ? "2,100+" : "2.100+", rating: 4.9, tags: en ? ["Boiler", "Radiator", "Heat"] : ["Kombi", "Petek", "Radyatör"] },
    { name: en ? "Ahmet" : "Ahmet Usta", photo: techAhmet, role: en ? "Emergency Lead" : "Acil Müdahale Şefi", years: 11, jobs: en ? "1,850+" : "1.850+", rating: 5.0, tags: en ? ["Unclog", "Sewer", "Camera"] : ["Tıkanıklık", "Pissu", "Kamera"] },
    { name: en ? "Emre" : "Emre Usta", photo: techEmre, role: en ? "Junior Technician" : "Genç Teknisyen", years: 6, jobs: en ? "920+" : "920+", rating: 4.8, tags: en ? ["AC", "Bath", "Fixtures"] : ["Klima", "Banyo", "Armatür"] },
  ];
  return (
    <section className="hidden md:block bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f] py-14 px-8 relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-brand-gold/8 blur-[140px]" />
      <div className="mx-auto max-w-[1280px] relative">
        <div className="flex items-end justify-between mb-7">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Award className="w-3 h-3 text-brand-gold" />
              <span className="text-[10px] font-extrabold tracking-[0.18em] text-slate-300 uppercase">{en ? "OUR TEAM" : "EKİBİMİZ"}</span>
            </div>
            <h2 className="mt-3 text-[40px] font-black leading-[0.95] text-white tracking-tight">
              {en ? <>Meet the <span className="text-brand-red italic">technicians</span></> : <>Kapınıza gelecek <span className="text-brand-red italic">ustalar</span></>}
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span className="text-[11px] text-slate-300"><strong className="text-white">TSE</strong> {en ? "certified · insured · ID-carded" : "belgeli · sigortalı · kimlikli"}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {list.map((t) => (
            <article key={t.name} className="group relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 hover:border-brand-red/40 hover:-translate-y-1 transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={t.photo} alt={`${t.name} - ${t.role}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur border border-white/10">
                  <Star className="w-2.5 h-2.5 fill-brand-gold text-brand-gold" />
                  <span className="text-[10px] font-extrabold text-white">{t.rating}</span>
                </div>
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-brand-red text-[9.5px] font-extrabold text-white">
                  {t.years} {en ? "yrs" : "yıl"}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-[16px] font-extrabold text-white tracking-tight">{t.name}</h3>
                  <p className="text-[11px] font-semibold text-brand-red/90">{t.role}</p>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Wrench className="w-3 h-3 text-brand-red" />
                  <span><strong className="text-slate-200">{t.jobs}</strong> {en ? "jobs" : "iş"}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {t.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-semibold text-slate-300">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — CERTS & STATS (compact premium dark)
============================================================ */
export function DesktopCertsStats() {
  const { lang } = useLang();
  const en = lang === "en";

  const certs = en
    ? [
        { t: "TSE Certified", d: "Turkish Standards Institute" },
        { t: "Gas Authorized", d: "IGDAS licensed installer" },
        { t: "ISO 9001", d: "Quality management" },
        { t: "Insured Service", d: "Liability covered" },
        { t: "Award 2024", d: "Customer satisfaction" },
        { t: "Chamber Member", d: "Plumbers Chamber" },
      ]
    : [
        { t: "TSE Belgeli", d: "Türk Standartları Enstitüsü" },
        { t: "Doğalgaz Yetkili", d: "İGDAŞ lisanslı uygulayıcı" },
        { t: "ISO 9001", d: "Kalite yönetimi" },
        { t: "Sigortalı Hizmet", d: "Sorumluluk teminatı" },
        { t: "Ödül 2024", d: "Müşteri memnuniyeti" },
        { t: "Oda Üyesi", d: "Tesisatçılar Odası" },
      ];

  const why = en
    ? [
        { t: "12,000+ jobs", d: "Documented operations across Istanbul", Icon: Award },
        { t: "30-min arrival", d: "Average response, both shores", Icon: Clock },
        { t: "2-year warranty", d: "Workmanship & parts covered", Icon: ShieldCheck },
        { t: "Always-on desk", d: "7/24 phone & WhatsApp desk", Icon: Headphones },
      ]
    : [
        { t: "12.000+ iş", d: "İstanbul genelinde belgeli operasyon", Icon: Award },
        { t: "30 dk varış", d: "Her iki yakada ortalama süre", Icon: Clock },
        { t: "2 yıl garanti", d: "İşçilik ve parça teminatı", Icon: ShieldCheck },
        { t: "Kesintisiz masa", d: "7/24 telefon & WhatsApp masası", Icon: Headphones },
      ];

  const stats = en
    ? [
        { v: "12k+", l: "Completed Jobs" },
        { v: "4.9★", l: "Google Rating" },
        { v: "39", l: "Districts Served" },
        { v: "98%", l: "Same-Day Fix" },
      ]
    : [
        { v: "12k+", l: "Tamamlanan İş" },
        { v: "4.9★", l: "Google Puanı" },
        { v: "39", l: "Hizmet İlçesi" },
        { v: "98%", l: "Aynı Gün Çözüm" },
      ];

  return (
    <section className="hidden md:block relative bg-[#0B0E14] text-slate-50 py-16 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-brand-red/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-0 right-0 w-[300px] h-[300px] bg-brand-gold/5 blur-[100px] rounded-full" />

      <div className="relative mx-auto max-w-[1280px] px-8">
        {/* Eyebrow */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-3">
              <span className="h-px w-8 bg-brand-red" />
              {en ? "Credentials & Numbers" : "Belgeler & Rakamlar"}
            </div>
            <h2 className="text-[36px] font-black leading-[1] tracking-tight text-white">
              {en ? "Built on " : "Belgeyle, "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">
                {en ? "proof, not promises" : "rakamla kanıtlı"}
              </span>
            </h2>
          </div>
          <p className="text-[13px] text-slate-400 max-w-xs text-right">
            {en
              ? "Every claim on this page is backed by a license, a logbook or a satisfied homeowner."
              : "Bu sayfadaki her iddia bir lisans, bir kayıt veya memnun bir müşteriyle desteklenir."}
          </p>
        </div>

        {/* Certs row */}
        <div className="grid grid-cols-6 gap-3 mb-10">
          {certs.map((c, i) => (
            <div key={i} className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center hover:border-brand-red/40 hover:bg-white/[0.06] transition-all hover:-translate-y-0.5">
              <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-brand-red/20 to-brand-red/5 ring-1 ring-brand-red/20">
                {i === 4 ? <Award className="h-6 w-6 text-brand-gold" /> : <ShieldCheck className="h-6 w-6 text-brand-red" />}
              </div>
              <div className="text-[11px] font-black text-white">{c.t}</div>
              <div className="text-[9.5px] text-slate-500 mt-0.5">{c.d}</div>
            </div>
          ))}
        </div>

        {/* WHY US — Bento Trust Grid (12 cols, asymmetric) */}
        <div className="mb-6">
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">
                <span className="h-px w-8 bg-brand-red" />
                {en ? "Why Gölge Tesisat" : "Neden Gölge Tesisat"}
              </div>
              <h3 className="text-[30px] font-black tracking-tight text-white leading-none">
                {en ? <>Trust that <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">measures up.</span></>
                    : <>Ölçülebilir <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">güven.</span></>}
              </h3>
            </div>
            <div className="flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              <div className="text-[11px] font-black text-emerald-400 tracking-wider">{en ? "98% SATISFACTION RATE" : "%98 MEMNUNİYET ORANI"}</div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* FEATURED — 30 min arrival (col-span-5, 2 rows) */}
            <div className="col-span-5 row-span-2 relative overflow-hidden rounded-3xl border border-brand-red/40 bg-gradient-to-br from-brand-red/25 via-[#1a0f12] to-[#0B0E14] p-7 flex flex-col">
              <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-brand-red/30 blur-[80px] rounded-full" />
              <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

              <div className="relative">
                <div className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-brand-red mb-3">
                  <Clock className="w-3 h-3" />
                  {en ? "Average response window" : "Ortalama yanıt penceresi"}
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-200 to-brand-red text-[140px] font-black leading-[0.8] tracking-tighter">
                    30
                  </div>
                  <div className="pb-5 text-[20px] font-black text-white/80">{en ? "min" : "dk"}</div>
                </div>
                <p className="mt-2 text-[13px] text-slate-300 leading-relaxed max-w-xs">
                  {en ? "Average arrival across both shores. Tracked dispatch, ETA confirmed on call." : "Her iki yakada ortalama varış. İzlenebilir görev, telefonda ETA."}
                </p>

                {/* Mini dashboard */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{en ? "EU Side avg" : "Avrupa ort."}</div>
                    <div className="mt-1 text-[20px] font-black text-white">28 <span className="text-[12px] text-slate-400">{en ? "min" : "dk"}</span></div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{en ? "Asia Side avg" : "Asya ort."}</div>
                    <div className="mt-1 text-[20px] font-black text-white">32 <span className="text-[12px] text-slate-400">{en ? "min" : "dk"}</span></div>
                  </div>
                </div>
              </div>

              <a href={PHONE_HREF} className="relative mt-auto pt-6 flex items-center gap-3 rounded-xl bg-white text-black px-4 py-3.5 font-black hover:scale-[1.02] transition-transform shadow-xl shadow-brand-red/30">
                <Phone className="h-4 w-4 text-brand-red fill-brand-red" />
                <span className="flex-1 text-[14px]">{PHONE}</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">7/24</span>
              </a>
            </div>

            {/* Tile 1 — 2-year warranty */}
            <div className="col-span-4 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-brand-red/40 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-red/15 ring-1 ring-brand-red/30 shrink-0">
                  <ShieldCheck className="h-5 w-5 text-brand-red" />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-black text-white">{en ? "2-year warranty" : "2 yıl garanti"}</div>
                  <p className="text-[11.5px] text-slate-400 mt-1 leading-snug">{en ? "Labor & parts covered, in writing." : "İşçilik ve parça, yazılı teminat."}</p>
                </div>
                <div className="text-right">
                  <div className="text-[22px] font-black text-white leading-none">24</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{en ? "months" : "ay"}</div>
                </div>
              </div>
            </div>

            {/* Tile 2 — Expert staff */}
            <div className="col-span-3 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-brand-red/40 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-red/15 ring-1 ring-brand-red/30">
                <Award className="h-5 w-5 text-brand-red" />
              </div>
              <div className="mt-3">
                <div className="text-[14px] font-black text-white">{en ? "Expert staff" : "Uzman kadro"}</div>
                <p className="text-[11.5px] text-slate-400 mt-1 leading-snug">{en ? "Certified, trained, vetted." : "Sertifikalı, eğitimli ekip."}</p>
              </div>
            </div>

            {/* Tile 3 — Technology */}
            <div className="col-span-3 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-brand-red/40 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-red/15 ring-1 ring-brand-red/30">
                <Gauge className="h-5 w-5 text-brand-red" />
              </div>
              <div className="mt-3">
                <div className="text-[14px] font-black text-white">{en ? "Modern tech" : "Modern teknoloji"}</div>
                <p className="text-[11.5px] text-slate-400 mt-1 leading-snug">{en ? "Cameras, thermal, leak sensors." : "Kamera, termal, kaçak sensörü."}</p>
              </div>
            </div>

            {/* Tile 4 — Transparent pricing */}
            <div className="col-span-4 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-brand-red/40 hover:bg-white/[0.05] hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-red/15 ring-1 ring-brand-red/30 shrink-0">
                  <BadgeCheck className="h-5 w-5 text-brand-red" />
                </div>
                <div className="min-w-0">
                  <div className="text-[14px] font-black text-white">{en ? "Transparent pricing" : "Şeffaf fiyat"}</div>
                  <p className="text-[11.5px] text-slate-400 mt-1 leading-snug">{en ? "Quoted before we touch a wrench." : "Anahtara dokunmadan önce teklif."}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row — CTA strip */}
          <div className="mt-4 grid grid-cols-12 gap-4">
            <a href={PHONE_HREF} className="col-span-5 group flex items-center gap-3 rounded-2xl bg-brand-red hover:bg-[#c12a2a] p-4 text-white transition-all hover:-translate-y-0.5 shadow-[0_15px_35px_-12px_rgba(226,59,59,0.7)]">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><Phone className="h-5 w-5" /></div>
              <div className="flex-1 leading-tight">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-90">{en ? "Talk to a dispatcher in 8s" : "8 sn'de operatör"}</div>
                <div className="text-[17px] font-black">{PHONE}</div>
              </div>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="https://wa.me/905338960503" target="_blank" rel="noopener" className="col-span-4 group flex items-center gap-3 rounded-2xl bg-[#25D366] hover:bg-[#1fb355] p-4 text-white transition-all hover:-translate-y-0.5 shadow-[0_15px_35px_-12px_rgba(37,211,102,0.5)]">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-white/15"><MessageCircle className="h-5 w-5" /></div>
              <div className="flex-1 leading-tight">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-90">WhatsApp</div>
                <div className="text-[14px] font-black">{en ? "Reply in ~2 minutes" : "≈2 dakikada dönüş"}</div>
              </div>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="col-span-3 flex items-center gap-3 rounded-2xl border border-brand-red/30 bg-brand-red/5 px-4 py-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-brand-red/15 ring-1 ring-brand-red/30">
                <Headphones className="h-5 w-5 text-brand-red" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] font-black uppercase tracking-widest text-brand-red">{en ? "Emergency line" : "Acil hat"}</div>
                <div className="text-[13px] font-black text-white">{en ? "Open 24/7 · all year" : "7/24 · yıl boyu"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-2">
          {stats.map((s, i) => (
            <div key={i} className={`rounded-xl p-5 text-center ${i !== 3 ? "border-r border-white/5" : ""}`}>
              <div className="text-[32px] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 leading-none">{s.v}</div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — FAQ + REVIEWS + CONTACT (premium dark, 3-zone)
============================================================ */
const FAQ_TR = [
  { q: "7/24 acil servis veriyor musunuz?", a: "Evet. İstanbul'un her iki yakasında 7/24 acil müdahale ekiplerimiz hazırdır; ortalama varış süremiz 30 dakikadır." },
  { q: "Keşif ücretli mi?", a: "Standart keşif ücretsizdir. Onayınız olmadan hiçbir işlem başlatılmaz, fiyat sabitlenir." },
  { q: "İşçilik garantisi var mı?", a: "Tüm işçilik 2 yıl, kullandığımız parçalar üretici garantisi ile teslim edilir." },
  { q: "Ödeme seçenekleri neler?", a: "Nakit, kredi kartı ve havale kabul ediyoruz; kurumsal müşteriler için fatura ve cari hesap açıyoruz." },
];
const FAQ_EN = [
  { q: "Do you offer 24/7 emergency service?", a: "Yes. We dispatch emergency crews across both sides of Istanbul, 24/7, with a 30-minute average arrival window." },
  { q: "Is the inspection free?", a: "Standard inspections are free. Nothing starts without your approval and the quoted price is locked in." },
  { q: "Do you guarantee workmanship?", a: "All labor is covered for 2 years; parts carry their original manufacturer warranty." },
  { q: "What payment methods do you accept?", a: "Cash, card and bank transfer. Corporate clients get invoicing and account terms." },
];
const REVIEWS_TR = [
  { n: "Ayşe K.", d: "Kadıköy", t: "Gece 11'de aradım, 25 dakikada kapımdaydılar. Kaçağı kırmadan buldular, fiyat baştan netti." },
  { n: "Mehmet T.", d: "Beşiktaş", t: "Kombimiz kışın ortasında durdu. Aynı gün ustayı gönderdiler, garantili parça taktılar. Profesyonel." },
  { n: "Selin A.", d: "Şişli", t: "Plaza tesisatı için çalıştık. Saha disiplini, rapor, fotoğraflı teslim — kurumsal standartta." },
];
const REVIEWS_EN = [
  { n: "Ayşe K.", d: "Kadıköy", t: "Called at 11pm, they were at my door in 25 minutes. Found the leak without breaking tiles, price was upfront." },
  { n: "Mehmet T.", d: "Beşiktaş", t: "Boiler died mid-winter. Same-day dispatch, warrantied part installed. Truly professional." },
  { n: "Selin A.", d: "Şişli", t: "Used them for a plaza retrofit. Site discipline, photo handover, full report — enterprise grade." },
];

export function DesktopFaqReviewsContact() {
  const { lang } = useLang();
  const en = lang === "en";
  const [open, setOpen] = useState<number | null>(0);
  const faqs = en ? FAQ_EN : FAQ_TR;
  const reviews = en ? REVIEWS_EN : REVIEWS_TR;

  return (
    <section className="hidden md:block relative bg-[#0B0E14] text-slate-50 py-16 overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-red/8 blur-[140px] rounded-full" />

      <div className="relative mx-auto max-w-[1280px] px-8">
        {/* Reviews strip — top */}
        <div className="mb-10">
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">
                <span className="h-px w-8 bg-brand-red" />
                {en ? "Verified Reviews" : "Doğrulanmış Yorumlar"}
              </div>
              <h2 className="text-[30px] font-black tracking-tight text-white leading-none">
                {en ? "What homeowners actually say" : "Müşteriler gerçekten ne söylüyor"}
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              <div className="text-[13px] font-black text-white">4.9</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">· 1,240 Google</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-brand-red/30 hover:bg-white/[0.05] transition-all">
                <div className="flex">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <p className="mt-3 text-[13px] text-slate-200 leading-relaxed">"{r.t}"</p>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-[12px] font-black text-white">{r.n}</div>
                    <div className="text-[10px] text-slate-500">{r.d}</div>
                  </div>
                  <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Google</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ + Contact split */}
        <div className="grid grid-cols-12 gap-6">
          {/* FAQ — 7 cols */}
          <div className="col-span-7">
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">
              <span className="h-px w-8 bg-brand-red" />
              {en ? "Frequently Asked" : "Sıkça Sorulanlar"}
            </div>
            <h2 className="text-[30px] font-black tracking-tight text-white leading-none mb-5">
              {en ? "Answers, before you call" : "Aramadan önce cevaplar"}
            </h2>
            <div className="space-y-2">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <button
                    key={i}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className={`w-full text-left rounded-xl border p-4 transition-all ${
                      isOpen ? "border-brand-red/40 bg-brand-red/[0.06]" : "border-white/10 bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`grid h-7 w-7 place-items-center rounded-full text-[11px] font-black shrink-0 ${
                        isOpen ? "bg-brand-red text-white" : "bg-white/5 text-slate-400"
                      }`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 text-[14px] font-black text-white">{f.q}</div>
                      <ChevronRight className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? "rotate-90 text-brand-red" : ""}`} />
                    </div>
                    {isOpen && (
                      <p className="mt-3 pl-10 text-[12.5px] text-slate-400 leading-relaxed">{f.a}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact — 5 cols */}
          <div className="col-span-5">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 overflow-hidden relative">
              <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 bg-brand-red/20 blur-[80px] rounded-full" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">
                  <Headphones className="h-3.5 w-3.5" />
                  {en ? "Open 24/7" : "7/24 açık"}
                </div>
                <h3 className="text-[24px] font-black text-white leading-tight">
                  {en ? "Three ways to reach us." : "Bize ulaşmanın üç yolu."}
                </h3>
                <p className="text-[12px] text-slate-400 mt-2">
                  {en ? "Pick the channel — we respond on all three in under 2 minutes." : "Kanalı seçin — üçünde de 2 dakika içinde dönüyoruz."}
                </p>

                <div className="mt-5 space-y-2.5">
                  <a href={PHONE_HREF} className="group flex items-center gap-3 rounded-xl bg-brand-red hover:bg-[#c12a2a] px-4 py-3 transition-all">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{en ? "Call · 7/24" : "Ara · 7/24"}</div>
                      <div className="text-[15px] font-black text-white">{PHONE}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a href="https://wa.me/905338960503" target="_blank" rel="noopener" className="group flex items-center gap-3 rounded-xl bg-[#25D366] hover:bg-[#1fb355] px-4 py-3 transition-all">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/15">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-white/80 uppercase tracking-widest">WhatsApp</div>
                      <div className="text-[13px] font-black text-white">{en ? "Reply in ~2 minutes" : "≈2 dakikada dönüş"}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </a>

                  <Link to="/randevu" className="group flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-4 py-3 transition-all">
                    <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{en ? "Book online" : "Online randevu"}</div>
                      <div className="text-[13px] font-black text-white">{en ? "Choose your slot" : "Saatinizi seçin"}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Office strip */}
                <div className="mt-5 pt-5 border-t border-white/10 grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 uppercase tracking-wider text-[9px] font-bold mb-1">
                      <MapPin className="h-3 w-3" /> {en ? "Office" : "Ofis"}
                    </div>
                    <div className="text-slate-300 font-semibold leading-snug">Kadıköy, İstanbul</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-500 uppercase tracking-wider text-[9px] font-bold mb-1">
                      <Clock className="h-3 w-3" /> {en ? "Hours" : "Çalışma"}
                    </div>
                    <div className="text-slate-300 font-semibold leading-snug">{en ? "24/7 dispatch" : "7/24 hizmet"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — VALUE PACKAGES (3-tier care row, no pricing)
============================================================ */
const PACKS_TR = [
  { t: "TEMEL PAKET", desc: "Yıllık kombi bakım ve kontrol hizmeti.", features: ["Kombi genel kontrol", "Brülör ve eşanjör temizliği", "Gaz ayar kontrolü", "Emniyet ve kaçak kontrolü"] },
  { t: "STANDART PAKET", desc: "Yıllık bakım + öncelikli destek avantajı.", features: ["Temel paket tüm içerikler", "Öncelikli randevu desteği", "7/24 telefon desteği", "Ücretsiz danışmanlık"] },
  { t: "PREMİUM PAKET", desc: "Yıllık bakım + parça ve işçilik güvencesi.", features: ["Standart paket tüm içerikler", "İşçilik garantisi", "Parça garantisi", "Yılda 1 kez ücretsiz kontrol"] },
];
const PACKS_EN = [
  { t: "ESSENTIAL", desc: "Annual boiler maintenance and inspection.", features: ["General boiler check", "Burner & exchanger cleaning", "Gas adjustment check", "Safety & leak check"] },
  { t: "PERFORMANCE", desc: "Yearly maintenance + priority support.", features: ["All Essential content", "Priority booking", "24/7 phone support", "Free consultancy"] },
  { t: "ELITE", desc: "Yearly maintenance + parts & labor warranty.", features: ["All Performance content", "Workmanship warranty", "Parts warranty", "1 free check per year"] },
];

export function DesktopValuePackages() {
  const { lang } = useLang();
  const en = lang === "en";
  const items = en ? PACKS_EN : PACKS_TR;
  const tierMeta = [
    { Icon: ShieldCheck, label: "01", accent: "from-sky-500 to-sky-400", ring: "ring-sky-500/30", glow: "" },
    { Icon: Zap, label: "02", accent: "from-brand-red to-rose-500", ring: "ring-brand-red/40", glow: "shadow-[0_30px_70px_-20px_rgba(226,59,59,0.55)]" },
    { Icon: Award, label: "03", accent: "from-amber-400 to-yellow-500", ring: "ring-amber-400/40", glow: "" },
  ];

  return (
    <section className="hidden md:block relative bg-[#0B0E14] py-20 overflow-hidden">
      <div className="pointer-events-none absolute top-10 left-1/3 w-[520px] h-[420px] bg-brand-red/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[420px] h-[320px] bg-amber-500/5 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-[1320px] px-8">
        {/* Header */}
        <div className="grid grid-cols-12 items-end gap-10 mb-12">
          <div className="col-span-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 text-[11px] font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-red" /> {en ? "Care plans · 3 levels" : "Bakım planları · 3 kademe"}
            </div>
            <h2 className="mt-6 text-[48px] xl:text-[58px] font-black leading-[0.95] tracking-tight text-white">
              {en ? <>Care that scales,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-400">to how you live.</span></>
                  : <>Yaşamınıza göre,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-orange-400 to-brand-red">ölçeklenen bakım.</span></>}
            </h2>
            <p className="mt-4 text-[14px] text-slate-400 max-w-xl leading-relaxed">
              {en ? "Pick the level of attention you want — from annual peace-of-mind to full parts & labor coverage."
                  : "İstediğiniz ilgi seviyesini seçin — yıllık huzurdan tam parça ve işçilik güvencesine kadar."}
            </p>
          </div>
          <div className="col-span-4 flex justify-end gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur px-5 py-4 text-right">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">{en ? "Avg. lifespan ↑" : "Ort. ömür ↑"}</div>
              <div className="mt-1 text-[28px] font-black text-white leading-none">+38<span className="text-[14px] text-slate-400 ml-1">%</span></div>
            </div>
            <div className="rounded-2xl border border-brand-red/30 bg-brand-red/10 px-5 py-4 text-right">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-red">{en ? "Breakdowns ↓" : "Arıza ↓"}</div>
              <div className="mt-1 text-[28px] font-black text-white leading-none">−72<span className="text-[14px] text-brand-red">%</span></div>
            </div>
          </div>
        </div>

        {/* Tier row — 3 columns, middle elevated */}
        <div className="grid grid-cols-3 gap-5 items-stretch">
          {items.map((p, i) => {
            const meta = tierMeta[i];
            const isPick = i === 1;
            const TierIcon = meta.Icon;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent transition-all hover:-translate-y-1 ${
                  isPick ? `border-brand-red/50 ${meta.glow} md:-translate-y-3 hover:md:-translate-y-4` : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Top gradient stripe */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${meta.accent}`} />
                {/* Subtle grid texture */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize: "26px 26px" }} />

                {isPick && (
                  <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-brand-red px-3 py-1 text-[9px] font-black tracking-widest text-white shadow-lg shadow-brand-red/40">
                    <Star className="h-2.5 w-2.5 fill-white text-white" />
                    {en ? "MOST PICKED" : "EN ÇOK TERCİH"}
                  </div>
                )}

                <div className="relative p-7">
                  {/* Tier badge + icon */}
                  <div className="flex items-start justify-between">
                    <div className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white ring-4 ${meta.ring}`}>
                      <TierIcon className="h-7 w-7" strokeWidth={2.4} />
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-black tracking-[0.25em] ${isPick ? "text-brand-red" : "text-slate-500"}`}>TIER</div>
                      <div className="text-[28px] font-black leading-none text-white tabular-nums">{meta.label}</div>
                    </div>
                  </div>

                  {/* Title + desc */}
                  <div className="mt-6">
                    <div className="text-[18px] font-black tracking-wider text-white">{p.t}</div>
                    <p className="mt-1.5 text-[12.5px] text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {p.features.map((f, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-[12.5px] leading-snug">
                        <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gradient-to-br ${meta.accent} text-white`}>
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </span>
                        <span className="text-slate-200">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a
                    href="https://wa.me/905338960503"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 flex items-center justify-between rounded-xl px-4 py-3.5 transition-all group/cta ${
                      isPick
                        ? "bg-gradient-to-r from-brand-red to-rose-500 text-white shadow-[0_15px_30px_-10px_rgba(226,59,59,0.5)]"
                        : "border border-white/15 bg-white/[0.03] text-white hover:border-brand-red/40 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="text-[11px] font-black tracking-[0.2em]">
                      {en ? "REQUEST DETAILS" : "DETAYLI BİLGİ AL"}
                    </span>
                    <span className={`grid h-8 w-8 place-items-center rounded-full transition-transform group-hover/cta:translate-x-1 ${
                      isPick ? "bg-white/15" : "bg-brand-red text-white"
                    }`}>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          {[
            { Ic: ShieldCheck, t: en ? "Guaranteed" : "Garantili", s: en ? "Workmanship covered" : "İşçilik teminatlı" },
            { Ic: Clock, t: "7/24", s: en ? "Always-on dispatch" : "Sürekli ulaşılabilir" },
            { Ic: BadgeCheck, t: en ? "Invoiced" : "Faturalı", s: en ? "Corporate-ready paperwork" : "Kurumsal evrak" },
          ].map((x, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand-red/15 ring-1 ring-brand-red/30">
                <x.Ic className="h-5 w-5 text-brand-red" />
              </div>
              <div>
                <div className="text-[13px] font-black text-white">{x.t}</div>
                <div className="text-[10.5px] text-slate-500">{x.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — EFFICIENCY TIPS (Energy Savings Lab, split)
============================================================ */
const TIPS_TR = [
  { t: "Sıcaklık Ayarı", d: "Kombinizi 20-22°C arasında kullanarak tasarruf edebilirsiniz.", impact: "−12%" },
  { t: "Petek Bakımı", d: "Peteklerinizi düzenli temizletin, ısınız eşit dağılsın.", impact: "−8%" },
  { t: "Isı Kaybını Önleyin", d: "Kapı ve pencerelerde ısı yalıtımına dikkat edin.", impact: "−15%" },
  { t: "Basınç Kontrolü", d: "Kombi basıncınızı 1-1,5 bar arasında tutun.", impact: "−5%" },
  { t: "Düzenli Bakım", d: "Yılda en az 1 kez bakım yaptırarak arıza riskini azaltın.", impact: "−20%" },
];
const TIPS_EN = [
  { t: "Temperature Setting", d: "Keep your boiler at 20-22°C to save energy.", impact: "−12%" },
  { t: "Radiator Care", d: "Clean radiators regularly for even heating.", impact: "−8%" },
  { t: "Prevent Heat Loss", d: "Mind the insulation around doors and windows.", impact: "−15%" },
  { t: "Pressure Check", d: "Keep boiler pressure between 1 - 1.5 bar.", impact: "−5%" },
  { t: "Regular Maintenance", d: "At least one annual service reduces breakdowns.", impact: "−20%" },
];

export function DesktopEfficiencyTips() {
  const { lang } = useLang();
  const en = lang === "en";
  const tips = en ? TIPS_EN : TIPS_TR;
  const Icons = [Thermometer, Wrench, ShieldCheck, Gauge, Calendar];

  return (
    <section className="hidden md:block relative bg-[#0B0E14] py-20 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 w-[520px] h-[420px] bg-emerald-500/8 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-[420px] h-[320px] bg-brand-red/10 blur-[120px] rounded-full" />

      <div className="relative mx-auto max-w-[1320px] px-8">
        {/* Header */}
        <div className="grid grid-cols-12 items-end gap-10 mb-12">
          <div className="col-span-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] font-semibold tracking-wide">
              <Gauge className="w-3.5 h-3.5" />
              {en ? "Energy savings, proven" : "Kanıtlanmış enerji tasarrufu"}
            </div>
            <h2 className="mt-6 text-[48px] xl:text-[58px] font-black leading-[0.95] tracking-tight text-white">
              {en ? <>Lower bills.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-red to-orange-400">Higher comfort.</span></>
                  : <>Daha düşük fatura.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-brand-red to-orange-400">Daha yüksek konfor.</span></>}
            </h2>
            <p className="mt-4 text-[14px] text-slate-400 max-w-xl leading-relaxed">
              {en ? "Five precise habits, audited across 2,500+ households. Compound them and the meter slows."
                  : "Beş net alışkanlık, 2.500'den fazla evde denetlendi. Birleştirin, saatiniz yavaşlasın."}
            </p>
          </div>
          <div className="col-span-4 flex justify-end gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur px-5 py-4 text-right">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500">{en ? "Audited homes" : "Denetlenen ev"}</div>
              <div className="mt-1 text-[28px] font-black text-white leading-none">2.5k<span className="text-[14px] text-slate-400 ml-1">+</span></div>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-right">
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-400">{en ? "Avg. saving" : "Ort. tasarruf"}</div>
              <div className="mt-1 text-[28px] font-black text-white leading-none">32<span className="text-[14px] text-emerald-400">%</span></div>
            </div>
          </div>
        </div>

        {/* Split layout: 5/7 — meter panel + tips rail */}
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT — Savings meter dashboard */}
          <div className="col-span-5 relative overflow-hidden rounded-3xl border border-brand-red/30 bg-gradient-to-br from-brand-red/15 via-[#1a0f12] to-[#0B0E14] p-7 flex flex-col">
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 bg-brand-red/30 blur-[80px] rounded-full" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,.5) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

            <div className="relative">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-red">
                {en ? "Potential Annual Saving" : "Yıllık Potansiyel Tasarruf"}
              </div>
              <div className="mt-3 flex items-end gap-3">
                <div className="text-transparent bg-clip-text bg-gradient-to-br from-white via-rose-200 to-brand-red text-[120px] font-black leading-[0.85] tracking-tighter">
                  32%
                </div>
                <div className="pb-4 flex items-center gap-1 text-emerald-400 text-[14px] font-extrabold">
                  ↓ avg.
                </div>
              </div>
              <p className="mt-2 text-[12px] text-slate-400 max-w-xs leading-relaxed">
                {en ? "Based on 2,500+ household audits across Istanbul, applying all 5 habits below."
                    : "İstanbul genelinde 2.500+ ev denetimine dayanmaktadır; aşağıdaki 5 alışkanlığı uygulayanlarda."}
              </p>

              {/* Progress rail */}
              <div className="relative mt-6">
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-emerald-400 via-brand-red to-amber-300" />
                </div>
                <div className="mt-1.5 flex justify-between text-[9.5px] font-bold tracking-widest text-slate-500 uppercase">
                  <span>0%</span><span>32% NOW</span><span>50%+</span>
                </div>
              </div>

              {/* Mini KPIs */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { v: "₺4,2k", l: en ? "Avg. yearly cut" : "Ort. yıllık" },
                  { v: "−18°", l: en ? "Heat loss prevented" : "Isı kaybı önlenen" },
                  { v: "1.2t", l: en ? "CO₂ saved / yr" : "Yıllık CO₂" },
                ].map((k, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <div className="text-[16px] font-black text-white leading-none">{k.v}</div>
                    <div className="mt-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-500 leading-tight">{k.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a href={PHONE_HREF} className="relative mt-auto pt-6">
              <div className="flex items-center gap-3 rounded-xl bg-white text-black px-4 py-3.5 font-black hover:scale-[1.02] transition-transform shadow-2xl shadow-brand-red/20">
                <Phone className="h-4 w-4 text-brand-red fill-brand-red" />
                <span className="flex-1 text-[14px]">{en ? "Book a free audit" : "Ücretsiz denetim alın"}</span>
                <ArrowRight className="h-4 w-4 text-brand-red" />
              </div>
            </a>
          </div>

          {/* RIGHT — Numbered tip rail */}
          <div className="col-span-7 space-y-3">
            {tips.map((t, i) => {
              const Ic = Icons[i];
              return (
                <div
                  key={i}
                  className="group relative flex items-stretch gap-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-brand-red/40 hover:bg-white/[0.05] transition-all hover:-translate-y-0.5"
                >
                  {/* Numbered ribbon */}
                  <div className="relative w-16 shrink-0 bg-gradient-to-b from-brand-red/25 via-brand-red/10 to-transparent">
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="text-[28px] font-black tabular-nums text-brand-red leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-brand-red/50 via-white/10 to-transparent" />
                  </div>

                  <div className="flex flex-1 items-center gap-5 px-6 py-5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-red/20 to-brand-red/5 ring-1 ring-brand-red/30">
                      <Ic className="h-7 w-7 text-brand-red" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="text-[16px] font-black text-white leading-tight">{t.t}</div>
                        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/15 ring-1 ring-emerald-500/30 px-2 py-0.5 text-[10px] font-black tracking-wider text-emerald-400">
                          <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
                          {t.impact}
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-400">{t.d}</p>
                    </div>

                    {/* mini status pill */}
                    <div className="hidden lg:flex shrink-0 flex-col items-end gap-1 text-right">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{en ? "Status" : "Durum"}</div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black tracking-wider text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {en ? "AUDITED" : "ONAYLI"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP — BOOKING ("Booking Bridge", premium scheduling band)
============================================================ */
export function DesktopBookingBanner() {
  const { lang } = useLang();
  const en = lang === "en";

  const today = new Date();
  const dayShortEN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayShortTR = ["PAZ", "PZT", "SAL", "ÇAR", "PER", "CUM", "CMT"];
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { wd: (en ? dayShortEN : dayShortTR)[d.getDay()], dn: d.getDate() };
  });
  const selectedDayIdx = 2;
  const slots = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];
  const bookedIdx = [0, 3];
  const selectedSlotIdx = 4;

  return (
    <section className="hidden md:block px-8 py-16">
      <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] border border-white/10 bg-[#0B0E14] p-12 lg:p-16">
        {/* ambient */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[460px] w-[460px] rounded-full bg-brand-red/15 blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-[380px] w-[420px] rounded-full bg-brand-gold/[0.06] blur-[140px]" />

        <div className="relative grid grid-cols-12 items-center gap-14">
          {/* LEFT — copy + CTA */}
          <div className="col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/25 bg-brand-red/[0.08] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-brand-red">
              <Calendar className="h-3.5 w-3.5" />
              {en ? "Online booking · 24/7" : "Online randevu · 7/24"}
            </div>

            <h2 className="mt-6 text-[46px] xl:text-[56px] font-black leading-[0.96] tracking-tight text-white">
              {en ? "Pick a date and time," : "Tarih ve saati seçin,"}{" "}
              <span className="bg-gradient-to-r from-brand-red to-orange-400 bg-clip-text text-transparent">
                {en ? "we'll be there." : "biz gelelim."}
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate-400">
              {en
                ? "SMS confirmation in minutes. No callbacks, no waiting on hold — your technician is dispatched the moment you confirm."
                : "Dakikalar içinde SMS onayı. Geri arama yok, beklemek yok — onayladığınız anda ustanız yola çıkar."}
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                { i: <ShieldCheck className="h-3.5 w-3.5" />, t: en ? "Free estimate" : "Ücretsiz keşif" },
                { i: <Zap className="h-3.5 w-3.5" />, t: en ? "Same-day slots" : "Aynı gün randevu" },
                { i: <MessageCircle className="h-3.5 w-3.5" />, t: en ? "SMS confirmation" : "SMS onayı" },
              ].map((c, i) => (
                <span key={i} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[12.5px] font-semibold text-slate-200">
                  <span className="text-brand-red">{c.i}</span>
                  {c.t}
                </span>
              ))}
            </div>

            <div className="mt-9 flex items-center gap-5">
              <Link to="/randevu" className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand-red px-8 py-4 text-[15px] font-black text-white shadow-[0_18px_40px_-16px_rgba(226,59,59,0.8)] transition-transform hover:-translate-y-0.5">
                {en ? "Book appointment" : "Randevu oluştur"}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex items-center gap-2 text-[13px] font-semibold text-slate-400">
                <Zap className="h-4 w-4 text-brand-red" />
                {en ? "Avg. confirmation: 4 min" : "Ortalama onay: 4 dk"}
              </div>
            </div>
          </div>

          {/* RIGHT — scheduling card */}
          <div className="col-span-6">
            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-7 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-brand-red" />
                  {en ? "Next 7 days" : "Önümüzdeki 7 gün"}
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-[11px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {en ? "Live availability" : "Canlı uygunluk"}
                </div>
              </div>

              {/* date strip */}
              <div className="mt-5 grid grid-cols-7 gap-2">
                {days.map((d, i) => {
                  const isSel = i === selectedDayIdx;
                  return (
                    <div key={i} className={`flex flex-col items-center rounded-xl border py-2.5 transition-colors ${isSel ? "border-brand-red bg-brand-red text-white" : "border-white/10 bg-white/[0.02] text-slate-300"}`}>
                      <div className={`text-[9.5px] font-bold tracking-wider ${isSel ? "text-white/90" : "text-slate-500"}`}>{d.wd}</div>
                      <div className="mt-0.5 text-[17px] font-black leading-tight">{d.dn}</div>
                    </div>
                  );
                })}
              </div>

              <div className="my-5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                <span>{en ? "Available times" : "Uygun saatler"}</span>
                <div className="ml-auto h-px flex-1 bg-white/10" />
              </div>

              {/* time chips */}
              <div className="grid grid-cols-3 gap-2.5">
                {slots.map((s, i) => {
                  const booked = bookedIdx.includes(i);
                  const sel = i === selectedSlotIdx;
                  return (
                    <div key={s} className={`rounded-xl border px-3 py-3 text-center text-[14px] font-bold transition-colors ${sel ? "border-brand-red bg-brand-red text-white" : booked ? "border-white/5 bg-white/[0.02] text-slate-600 line-through" : "border-white/10 bg-white/[0.03] text-slate-200"}`}>
                      {s}
                    </div>
                  );
                })}
              </div>

              {/* status row */}
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3.5">
                <div className="flex items-center gap-2.5 text-[13px] font-semibold text-slate-200">
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  {en ? "Technicians available daily" : "Ustalar her gün müsait"}
                </div>
                <Star className="h-4 w-4 fill-brand-gold text-brand-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
