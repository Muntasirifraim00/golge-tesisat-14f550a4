import { useState } from "react";
import { Phone, MessageCircle, Calculator, Check, ArrowRight, ArrowLeft, Droplet, Wrench, Flame, Thermometer, Zap, Camera, Clock, Sparkles } from "lucide-react";
import { DISTRICTS } from "@/data/districts";
import { useLang } from "@/i18n/LanguageProvider";

const PHONE_HREF = "tel:+905338960503";

type Service = { key: string; label: string; icon: React.ComponentType<{ className?: string }>; min: number; max: number };

const SERVICES_TR: Service[] = [
  { key: "leak",     label: "Su Kaçağı Tespiti",  icon: Droplet,     min: 450, max: 1200 },
  { key: "clog",     label: "Tıkanıklık Açma",    icon: Wrench,      min: 350, max: 900 },
  { key: "combi",    label: "Kombi Servisi",      icon: Flame,       min: 450, max: 1500 },
  { key: "radiator", label: "Petek Temizleme",    icon: Thermometer, min: 1500, max: 3500 },
  { key: "pipe",     label: "Tesisat Tamiri",     icon: Zap,         min: 500, max: 2000 },
  { key: "camera",   label: "Kamera Görüntüleme", icon: Camera,      min: 600, max: 1500 },
];
const SERVICES_EN: Service[] = [
  { key: "leak",     label: "Leak Detection",     icon: Droplet,     min: 450, max: 1200 },
  { key: "clog",     label: "Drain Unclogging",   icon: Wrench,      min: 350, max: 900 },
  { key: "combi",    label: "Boiler Service",     icon: Flame,       min: 450, max: 1500 },
  { key: "radiator", label: "Radiator Cleaning",  icon: Thermometer, min: 1500, max: 3500 },
  { key: "pipe",     label: "Pipe Repair",        icon: Zap,         min: 500, max: 2000 },
  { key: "camera",   label: "Camera Inspection",  icon: Camera,      min: 600, max: 1500 },
];

type Urgency = { key: string; label: string; sub: string; mult: number };
const URG_TR: Urgency[] = [
  { key: "now", label: "Şu an, acil", sub: "30 dk içinde", mult: 1.25 },
  { key: "today", label: "Bugün içinde", sub: "2-4 saat içinde", mult: 1.0 },
  { key: "flex", label: "Esnek / planlı", sub: "Yarın veya sonra", mult: 0.9 },
];
const URG_EN: Urgency[] = [
  { key: "now", label: "Right now, urgent", sub: "Within 30 min", mult: 1.25 },
  { key: "today", label: "Today", sub: "Within 2-4 hours", mult: 1.0 },
  { key: "flex", label: "Flexible / planned", sub: "Tomorrow or later", mult: 0.9 },
];

const DISTRICT_MULT: Record<string, number> = {
  kadikoy: 1.05, uskudar: 1.0, besiktas: 1.15, sisli: 1.10, bakirkoy: 1.05,
  atasehir: 1.05, umraniye: 1.0, maltepe: 1.0, kartal: 0.95, pendik: 0.95,
};

function isValidTrPhone(raw: string) {
  return /^(0|90)?5\d{9}$/.test(raw.replace(/\D/g, ""));
}

export function InstantQuote() {
  const { lang } = useLang();
  const en = lang === "en";
  const SERVICES = en ? SERVICES_EN : SERVICES_TR;
  const URGENCIES = en ? URG_EN : URG_TR;

  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [districtSlug, setDistrictSlug] = useState<string>("");
  const [urgency, setUrgency] = useState<Urgency | null>(null);
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const district = DISTRICTS.find((d) => d.slug === districtSlug);

  function reset() { setStep(0); setService(null); setDistrictSlug(""); setUrgency(null); setPhone(""); setPhoneErr(""); }

  function calcRange() {
    if (!service || !urgency) return { lo: 0, hi: 0 };
    const dMult = DISTRICT_MULT[districtSlug] ?? 1.0;
    const lo = Math.round((service.min * urgency.mult * dMult) / 10) * 10;
    const hi = Math.round((service.max * urgency.mult * dMult) / 10) * 10;
    return { lo, hi };
  }

  function submitPhone() {
    if (!isValidTrPhone(phone)) {
      setPhoneErr(en ? "Enter a valid mobile (e.g. 0532 xxx xx xx)" : "Geçerli bir cep telefonu girin (örn. 0532 xxx xx xx)");
      return;
    }
    setPhoneErr(""); setStep(4);
  }

  const { lo, hi } = calcRange();
  const waMsg = encodeURIComponent(
    en
      ? `Hi, I need ${service?.label ?? ""} in ${district?.name ?? ""}. Urgency: ${urgency?.label ?? ""}. Phone: ${phone}.`
      : `Merhaba, ${district?.name ?? ""} için ${service?.label ?? ""} hizmeti almak istiyorum. Aciliyet: ${urgency?.label ?? ""}. Telefon: ${phone}.`
  );
  const waHref = `https://wa.me/905338960503?text=${waMsg}`;
  const progress = ((step + 1) / 5) * 100;
  const numberLocale = en ? "en-US" : "tr-TR";

  return (
    <section className="px-4 py-8">
      <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-red">
        <span className="h-px w-6 bg-brand-red" /> {en ? "INSTANT PRICE QUOTE" : "ANINDA FİYAT TEKLİFİ"} <span className="h-px w-6 bg-brand-red" />
      </div>
      <h2 className="text-center text-[24px] font-extrabold leading-tight">
        {en ? <>30-Second <span className="text-brand-red">Price Range</span></> : <>30 Saniyede <span className="text-brand-red">Fiyat Aralığı</span></>}
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-center text-[12px] text-muted-foreground">
        {en ? "Pick service, district and urgency — see a transparent price range instantly." : "Hizmet, bölge ve aciliyet seçin — şeffaf fiyat aralığını anında görün."}
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg">
        <div className="h-1 bg-muted"><div className="h-full bg-brand-red transition-all" style={{ width: `${progress}%` }} /></div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground">
              <Calculator className="h-3.5 w-3.5 text-brand-red" />
              {en ? "Step" : "Adım"} {Math.min(step + 1, 4)} / 4
            </div>
            {step > 0 && step < 4 && (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-brand-red">
                <ArrowLeft className="h-3 w-3" /> {en ? "Back" : "Geri"}
              </button>
            )}
          </div>

          {step === 0 && (
            <div className="mt-3">
              <div className="text-[15px] font-extrabold">{en ? "Which service do you need?" : "Hangi hizmete ihtiyacınız var?"}</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {SERVICES.map((s) => (
                  <button key={s.key} onClick={() => { setService(s); setStep(1); }}
                    className={`flex flex-col items-start rounded-xl border p-3 text-left transition-colors ${service?.key === s.key ? "border-brand-red bg-brand-red/5" : "border-border bg-background hover:border-brand-red"}`}>
                    <s.icon className="h-5 w-5 text-brand-red" />
                    <div className="mt-2 text-[12px] font-extrabold leading-tight">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-3">
              <div className="text-[15px] font-extrabold">{en ? "Which district are you in?" : "Hangi ilçedesiniz?"}</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {DISTRICTS.map((d) => (
                  <button key={d.slug} onClick={() => { setDistrictSlug(d.slug); setStep(2); }}
                    className={`rounded-lg border px-3 py-2.5 text-left text-[12px] font-bold transition-colors ${districtSlug === d.slug ? "border-brand-red bg-brand-red/5" : "border-border bg-background hover:border-brand-red"}`}>
                    {d.name}
                    <div className="text-[10px] font-medium text-muted-foreground">{en ? (d.side === "Avrupa Yakası" ? "European Side" : "Asian Side") : d.side}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-3">
              <div className="text-[15px] font-extrabold">{en ? "When should we come?" : "Ne zaman gelmeliyiz?"}</div>
              <div className="mt-3 space-y-2">
                {URGENCIES.map((u) => (
                  <button key={u.key} onClick={() => { setUrgency(u); setStep(3); }}
                    className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors ${urgency?.key === u.key ? "border-brand-red bg-brand-red/5" : "border-border bg-background hover:border-brand-red"}`}>
                    <div>
                      <div className="text-[13px] font-extrabold">{u.label}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{u.sub}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-brand-red" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="mt-3">
              <div className="text-[15px] font-extrabold">{en ? "Last step — your phone number" : "Son adım — telefon numaranız"}</div>
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                {en ? "We collect your number before showing the price to send you a personal discount and check availability."
                    : "Fiyat aralığını göstermeden önce numaranızı alıyoruz; size özel indirim & uygunluk için kullanıyoruz."}
              </p>
              <div className="mt-3 rounded-lg border border-border bg-background p-3 text-[11.5px]">
                <div className="flex justify-between"><span className="text-muted-foreground">{en ? "Service" : "Hizmet"}</span><span className="font-bold">{service?.label}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-muted-foreground">{en ? "District" : "Bölge"}</span><span className="font-bold">{district?.name}</span></div>
                <div className="mt-1 flex justify-between"><span className="text-muted-foreground">{en ? "Urgency" : "Aciliyet"}</span><span className="font-bold">{urgency?.label}</span></div>
              </div>
              <label className="mt-3 block text-[11px] font-bold text-muted-foreground">{en ? "Mobile Number" : "Cep Telefonu"}</label>
              <input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value.slice(0, 18))} placeholder="0532 xxx xx xx"
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-3 text-[14px] font-semibold outline-none focus:border-brand-red" />
              {phoneErr && <div className="mt-1 text-[11px] font-semibold text-brand-red">{phoneErr}</div>}
              <button onClick={submitPhone} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white">
                {en ? "SHOW PRICE" : "FİYATI GÖSTER"} <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-2 text-[10px] text-muted-foreground text-center">
                {en ? "Your number is used only for the quote, never shared with third parties." : "Numaranız sadece teklif için kullanılır, üçüncü taraflarla paylaşılmaz."}
              </p>
            </div>
          )}

          {step === 4 && service && urgency && district && (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-emerald-600">
                <Check className="h-3.5 w-3.5" /> {en ? "Estimated Price Range" : "Tahmini Fiyat Aralığı"}
              </div>
              <div className="mt-2 rounded-2xl bg-gradient-to-br from-brand-red to-red-700 p-5 text-white">
                <div className="text-[11px] font-bold uppercase tracking-widest opacity-90">{service.label} • {district.name}</div>
                <div className="mt-2 text-[34px] font-extrabold leading-none">
                  {lo.toLocaleString(numberLocale)} – {hi.toLocaleString(numberLocale)} <span className="text-[18px]">₺</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-[11px] opacity-90">
                  <Sparkles className="h-3 w-3" />
                  {en ? "Urgency" : "Aciliyet"}: {urgency.label} • {en ? "VAT included" : "KDV dahil"}
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-dashed border-brand-red/50 bg-brand-red/5 p-3 text-[11.5px]">
                <span className="font-extrabold text-brand-red">{en ? "10% FIRST-JOB DISCOUNT" : "%10 İLK İŞ İNDİRİMİ"}</span>
                {en ? " code sent via SMS. Activate it instantly by calling below." : " kodu SMS ile gönderildi. Aşağıdan arayarak hemen aktif edebilirsiniz."}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-lg bg-foreground py-3 text-[13px] font-extrabold text-background">
                  <Phone className="h-4 w-4" /> {en ? "CALL" : "ARA"}
                </a>
                <a href={waHref} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-3 text-[13px] font-extrabold text-white">
                  <MessageCircle className="h-4 w-4" /> WHATSAPP
                </a>
              </div>
              <button onClick={reset} className="mt-3 w-full text-center text-[11px] font-bold text-muted-foreground hover:text-brand-red">
                {en ? "New quote" : "Yeni teklif al"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-600" /> {en ? "Transparent price" : "Şeffaf fiyat"}</span>
        <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-600" /> {en ? "VAT included" : "KDV dahil"}</span>
        <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-600" /> {en ? "2-year warranty" : "2 yıl garanti"}</span>
      </div>
    </section>
  );
}
