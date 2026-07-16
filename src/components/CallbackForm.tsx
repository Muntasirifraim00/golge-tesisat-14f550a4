import { useState, useMemo } from "react";
import { Phone, Calendar, Clock, Check, User, MapPin } from "lucide-react";
import { DISTRICTS } from "@/data/districts";
import { supabase } from "@/integrations/supabase/client";
import { useLang } from "@/i18n/LanguageProvider";
import { trackEvent } from "@/lib/analytics";

const TIME_SLOTS_TR = ["Şu an arasın", "30 dk içinde", "1 saat içinde", "Bugün öğleden sonra", "Yarın sabah", "Yarın öğleden sonra"];
const TIME_SLOTS_EN = ["Call me now", "Within 30 min", "Within 1 hour", "This afternoon", "Tomorrow morning", "Tomorrow afternoon"];

function isValidTrPhone(raw: string) {
  return /^(0|90)?5\d{9}$/.test(raw.replace(/\D/g, ""));
}

export function CallbackForm() {
  const { lang } = useLang();
  const en = lang === "en";
  const SLOTS = en ? TIME_SLOTS_EN : TIME_SLOTS_TR;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [districtSlug, setDistrictSlug] = useState("");
  const [slot, setSlot] = useState(SLOTS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const district = useMemo(() => DISTRICTS.find((d) => d.slug === districtSlug), [districtSlug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setError(en ? "Please enter your name." : "Lütfen isminizi girin.");
    if (!isValidTrPhone(phone)) return setError(en ? "Please enter a valid mobile number." : "Geçerli bir cep telefonu girin.");
    if (!districtSlug || !district) return setError(en ? "Select a district." : "Bölge seçin.");
    setError("");
    setSubmitting(true);
    // Fire-and-forget: log the request, but never block the WhatsApp redirect
    supabase.from("callback_requests").insert({
      name: name.trim(), phone: phone.replace(/\s/g, ""), district_slug: district.slug, district_name: district.name, time_slot: slot,
    }).then(({ error: insErr }) => { if (insErr) console.error(insErr); });
    trackEvent("callback_submit", district.slug, { slot });

    const lines = [
      en ? "📞 *NEW CALLBACK REQUEST*" : "📞 *YENİ GERİ ARAMA TALEBİ*",
      "",
      `*${en ? "Name" : "İsim"}:* ${name.trim()}`,
      `*${en ? "Phone" : "Telefon"}:* ${phone.replace(/\s/g, "")}`,
      `*${en ? "District" : "Bölge"}:* ${district.name} (${district.side})`,
      `*${en ? "When to call" : "Ne zaman arayalım"}:* ${slot}`,
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/905338960503?text=${msg}`, "_blank", "noopener");
    setSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="px-4 py-8">
        <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-6 text-center dark:bg-emerald-950/30">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-7 w-7" /></div>
          <h3 className="mt-3 text-[18px] font-extrabold">{en ? "Request received!" : "Talebiniz Alındı!"}</h3>
          <p className="mt-1 text-[12px] text-muted-foreground">
            {en ? <>We'll call you <span className="font-bold text-foreground">{slot}</span> at <span className="font-bold text-foreground">{phone}</span>.</>
                : <><span className="font-bold text-foreground">{slot}</span> sizi <span className="font-bold text-foreground">{phone}</span> numarasından arayacağız.</>}
          </p>
          <button onClick={() => { setSubmitted(false); setName(""); setPhone(""); setDistrictSlug(""); }} className="mt-4 text-[11px] font-bold text-emerald-700 underline">
            {en ? "New request" : "Yeni talep oluştur"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-red">
        <span className="h-px w-6 bg-brand-red" /> {en ? "WE'LL CALL YOU" : "SİZİ BİZ ARAYALIM"} <span className="h-px w-6 bg-brand-red" />
      </div>
      <h2 className="text-center text-[24px] font-extrabold leading-tight">
        {en ? <>We Call You <span className="text-brand-red">in 2 Minutes</span></> : <>2 Dakikada <span className="text-brand-red">Sizi Arayalım</span></>}
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-center text-[12px] text-muted-foreground">
        {en ? "Leave your number — we'll call you when it suits you." : "Numaranızı bırakın, size uygun zamanda biz arayalım."}
      </p>

      <form onSubmit={submit} className="mt-5 space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-lg">
        <Field icon={<User className="h-4 w-4" />} label={en ? "Name" : "İsim"}>
          <input value={name} onChange={(e) => setName(e.target.value.slice(0, 60))} placeholder={en ? "Your name" : "Adınız"} className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-muted-foreground" />
        </Field>
        <Field icon={<Phone className="h-4 w-4" />} label={en ? "Phone" : "Telefon"}>
          <input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value.slice(0, 18))} placeholder="0532 xxx xx xx" className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-muted-foreground" />
        </Field>
        <Field icon={<MapPin className="h-4 w-4" />} label={en ? "District" : "Bölge"}>
          <select value={districtSlug} onChange={(e) => setDistrictSlug(e.target.value)} className="w-full bg-transparent text-[14px] font-semibold outline-none">
            <option value="">{en ? "Select..." : "Seçin..."}</option>
            {DISTRICTS.map((d) => <option key={d.slug} value={d.slug}>{d.name} — {d.side}</option>)}
          </select>
        </Field>
        <div>
          <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {en ? "WHEN SHOULD WE CALL?" : "NE ZAMAN ARASIN?"}
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {SLOTS.map((s) => (
              <button key={s} type="button" onClick={() => setSlot(s)} className={`rounded-lg border px-2 py-2 text-[11.5px] font-bold transition-colors ${slot === s ? "border-brand-red bg-brand-red text-white" : "border-border bg-background hover:border-brand-red"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        {error && <div className="text-[11px] font-semibold text-brand-red">{error}</div>}
        <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-[14px] font-extrabold tracking-wider text-white disabled:opacity-50">
          <Calendar className="h-4 w-4" /> {submitting ? (en ? "SENDING..." : "GÖNDERİLİYOR...") : (en ? "CALL ME" : "BENİ ARAYIN")}
        </button>
        <p className="text-center text-[10px] text-muted-foreground">
          {en ? "Your info is used only to call you. No spam." : "Bilgileriniz sadece arama için kullanılır. Spam yok."}
        </p>
      </form>
    </section>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-lg border border-border bg-background px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        <span className="text-brand-red">{icon}</span>{label}
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}
