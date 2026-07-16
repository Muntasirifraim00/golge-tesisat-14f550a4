import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, X, MapPin, Calendar as CalIcon, Clock, User, Phone, Mail,
  MessageSquare, Pencil, Lock, Info, Droplet, Thermometer, Flame, Wrench, ChevronDown, CheckCircle2,
  Waves, ScanLine, Shield, Sparkles, Sunrise, Sun, Moon, Activity,
} from "lucide-react";
import { DISTRICTS } from "@/data/districts";
import { useLang } from "@/i18n/LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

const WA_NUMBER = "905338960503";
const PHONE_HREF = "tel:+905338960503";

export const Route = createFileRoute("/randevu")({
  head: () => ({
    meta: [
      { title: "Online Randevu — Gölge Tesisat İstanbul" },
      { name: "description", content: "Gölge Tesisat online randevu: 6 adımda tesisat hizmeti talebi oluşturun. İstanbul'un her noktasına ortalama 30 dakikada sertifikalı ekiplerle geliyoruz." },
      { property: "og:title", content: "Online Randevu — Gölge Tesisat" },
      { property: "og:description", content: "6 adımda tesisat randevusu oluşturun. İstanbul genelinde 7/24 acil servis." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Gölge Tesisat" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:url", content: "https://golgetesisat.com/randevu" },
      { property: "og:image", content: "https://golgetesisat.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Online Randevu — Gölge Tesisat" },
      { name: "twitter:description", content: "6 adımda tesisat randevusu oluşturun. İstanbul genelinde 7/24 acil servis." },
      { name: "twitter:image", content: "https://golgetesisat.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://golgetesisat.com/randevu" }],
  }),
  component: BookingPage,
});

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  leak: Droplet,
  clog: Waves,
  camera: ScanLine,
  pipe: Wrench,
  radiator: Thermometer,
  combi: Flame,
  other: Info,
};

const STR = {
  tr: {
    title: "RANDEVU TALEP ET",
    consoleTitle: "RANDEVU KONSOLU",
    consoleSub: "İstanbul'un her noktasına sertifikalı, sigortalı ekiplerle ortalama 30 dk içinde geliyoruz.",
    live: "Çevrimiçi",
    liveSub: "~30 dk ortalama yanıt",
    kpiAvg: "Ortalama varış",
    kpiOnline: "Aktif teknisyen",
    kpiBookings: "Bugünkü randevu",
    quickContact: "Hızlı iletişim",
    callNow: "Hemen Ara",
    whatsappNow: "WhatsApp",
    services: [
      { key: "leak",     label: "Su Kaçağı Tespiti", desc: "Su kaçağı tespiti ve onarımı" },
      { key: "clog",     label: "Tıkanıklık Açma",   desc: "Gider, lavabo, tuvalet tıkanıklığı açma" },
      { key: "camera",   label: "Kanal Görüntüleme", desc: "Robot kamera ile kanal/boru görüntüleme" },
      { key: "pipe",     label: "Tesisat İşleri",    desc: "Tesisat kurulum ve onarım işlemleri" },
      { key: "radiator", label: "Petek Temizleme",   desc: "Petek temizleme ve ısınma çözümü" },
      { key: "other",    label: "Diğer Hizmetler",   desc: "Diğer tüm tesisat ihtiyaçlarınız" },
    ],
    stepLabels: ["Hizmet\nSeçimi","Adres\nBilgileri","Tarih & Saat\nSeçimi","Kişisel\nBilgiler","Önizleme","Onay"],
    stepShort: ["Hizmet","Adres","Tarih","Bilgiler","Önizleme","Onay"],
    stepDesc: ["İhtiyacınıza uygun hizmeti seçin.","Hizmet adresinizi girin.","Uygun tarih ve saat aralığını seçin.","Sizinle iletişime geçebilmemiz için bilgilerinizi girin.","Bilgilerinizi kontrol edin. Düzenlemek için Düzenle butonlarına tıklayabilirsiniz.","Bilgilerinizi son bir kez kontrol edin ve randevu talebinizi onaylayın."],
    contactPrefs: ["Telefon","WhatsApp","E-posta"],
    months: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
    daysLong: ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],
    daysShort: ["PZT","SAL","ÇAR","PER","CUM","CMT","PAZ"],
    selectCity: "İl", selectDistrict: "İlçe", selectNeighborhood: "Mahalle", openAddress: "Açık Adres",
    pickDistrict: "İlçe seçin", pickNeighborhood: "Mahalle seçin", pickFirst: "Önce ilçe seçin",
    addrPlaceholder: "Cadde, sokak, bina no, daire no...",
    safe: "Bilgileriniz güvende", safeDesc: "Adres bilgileriniz sadece hizmet sağlamak için kullanılır ve üçüncü kişilerle paylaşılmaz.",
    coverage: "Kapsama Alanı", coverageHint: "Seçtiğiniz bölgede aktif ekibimiz bulunuyor.",
    pickDate: "Tarih Seçin", pickTime: "Saat Seçin",
    timeNote: "Seçilen saat aralığında uzman ekibimiz adresinizde olacaktır.",
    reminder: "Hatırlatma", reminderDesc: "Randevu talebinizi tamamladıktan sonra ekibimiz onay için sizinle iletişime geçecektir.",
    today: "Bugün", selected: "Seçili Tarih", unavail: "Uygun Değil",
    partMorning: "Sabah", partAfternoon: "Öğleden Sonra", partEvening: "Akşam",
    fields: { name: "Ad Soyad", namePh: "Adınız Soyadınız", phone: "Telefon Numarası", email: "E-posta Adresi", emailPh: "ornek@mail.com", contact: "İletişim Tercihi", notes: "Ek Notlar (İsteğe Bağlı)", notesPh: "Eklemek istediğiniz notlar..." },
    kvkk: "KVKK Aydınlatma Metni", kvkkDesc: "Kişisel verileriniz, hizmet sunumu amacıyla işlenmekte olup KVKK kapsamında korunmaktadır.",
    selectedService: "Seçilen Hizmet", addrInfo: "Adres Bilgileri", dateTime: "Tarih & Saat", personalInfo: "Kişisel Bilgiler", extraNotes: "Ek Notlar",
    contactPref: "İletişim Tercihi", extraNote: "Ek Not",
    edit: "Düzenle", checkInfo: "Bilgilerinizi kontrol edin",
    confirmInfo: "Onayladıktan sonra randevu talebiniz ekibimize iletilir ve en kısa sürede sizinle iletişime geçeriz.",
    agree1: "",
    agree2: "",
    confirmNote: "Onayladığınızda randevu talebiniz kaydedilir ve ekibimiz en kısa sürede sizinle iletişime geçer.",
    next: "Devam Et", back: "Geri", confirmCta: "Randevu Talebini Onayla",
    step: "Adım", ssl: "256-bit SSL", kvkkBadge: "KVKK Uyumlu", warrantyBadge: "2 Yıl Garanti",
    successTitle: "Randevu talebiniz iletildi!", successDesc: "Talebiniz ekibimize ulaştı. En kısa sürede tarafınıza dönüş yapacağız.",
    summary: "Randevu Talep Özeti", service: "Hizmet", address: "Adres", phoneL: "Telefon", emailL: "E-posta", nameL: "Ad Soyad",
    backHome: "Ana Sayfaya Dön",
    waHeader: "🛠️ *YENİ RANDEVU TALEBİ*", waService: "Hizmet", waAddress: "Adres", waDateTime: "Tarih & Saat", waPersonal: "👤 *Kişisel Bilgiler*", waName: "Ad Soyad", waPhone: "Telefon", waEmail: "E-posta", waContactPref: "İletişim Tercihi", waNote: "Ek Not",
    afterChoose: "Hizmeti seçtikten sonra,", afterChooseSub: "adres, tarih ve iletişim bilgilerinizi adım adım belirleyeceksiniz.",
    err: { svc: "Lütfen bir hizmet seçin.", dist: "Lütfen bir ilçe seçin.", neigh: "Lütfen mahalle seçin.", addr: "Lütfen açık adres girin.", date: "Lütfen bir tarih seçin.", slot: "Lütfen saat aralığı seçin.", name: "Ad soyad girin.", phone: "Geçerli bir telefon girin.", email: "Geçerli bir e-posta girin.", agree: "Lütfen onayları işaretleyin." },
  },
  en: {
    title: "BOOK APPOINTMENT",
    consoleTitle: "BOOKING CONSOLE",
    consoleSub: "Certified, insured crews dispatched anywhere in Istanbul — average arrival 30 minutes.",
    live: "Online",
    liveSub: "~30 min avg response",
    kpiAvg: "Avg. arrival",
    kpiOnline: "Active technicians",
    kpiBookings: "Bookings today",
    quickContact: "Quick contact",
    callNow: "Call Now",
    whatsappNow: "WhatsApp",
    services: [
      { key: "leak",     label: "Leak Detection",    desc: "Water leak detection and repair" },
      { key: "clog",     label: "Drain Unclogging",  desc: "Drain, sink and toilet unclogging" },
      { key: "camera",   label: "Pipe Camera Inspection", desc: "Robotic camera inspection of drains/pipes" },
      { key: "pipe",     label: "Plumbing Work",     desc: "Plumbing installation and repair" },
      { key: "radiator", label: "Radiator Cleaning", desc: "Radiator cleaning & heating solution" },
      { key: "other",    label: "Other Services",    desc: "All other plumbing needs" },
    ],
    stepLabels: ["Service\nSelection","Address\nDetails","Date & Time\nSelection","Personal\nDetails","Review","Confirm"],
    stepShort: ["Service","Address","Date","Details","Review","Confirm"],
    stepDesc: ["Choose the service that fits your need.","Enter your service address.","Pick a suitable date and time slot.","Enter your details so we can reach you.","Review your info. Tap Edit to change anything.","Review one last time and confirm your booking request."],
    contactPrefs: ["Phone","WhatsApp","Email"],
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    daysLong: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    daysShort: ["MON","TUE","WED","THU","FRI","SAT","SUN"],
    selectCity: "City", selectDistrict: "District", selectNeighborhood: "Neighborhood", openAddress: "Full Address",
    pickDistrict: "Select district", pickNeighborhood: "Select neighborhood", pickFirst: "Select district first",
    addrPlaceholder: "Street, building no, apartment no...",
    safe: "Your data is safe", safeDesc: "Address info is used only to deliver the service and is never shared with third parties.",
    coverage: "Coverage Area", coverageHint: "An active crew is available in your selected zone.",
    pickDate: "Pick a Date", pickTime: "Pick a Time",
    timeNote: "Our team will be at your address within the selected time window.",
    reminder: "Reminder", reminderDesc: "Our team will contact you to confirm your booking once you finish.",
    today: "Today", selected: "Selected Date", unavail: "Unavailable",
    partMorning: "Morning", partAfternoon: "Afternoon", partEvening: "Evening",
    fields: { name: "Full Name", namePh: "Your full name", phone: "Phone Number", email: "Email Address", emailPh: "name@mail.com", contact: "Preferred Contact", notes: "Additional Notes (Optional)", notesPh: "Anything we should know..." },
    kvkk: "Privacy Notice", kvkkDesc: "Your personal data is processed only to deliver the service and is protected under privacy law.",
    selectedService: "Selected Service", addrInfo: "Address Details", dateTime: "Date & Time", personalInfo: "Personal Details", extraNotes: "Additional Notes",
    contactPref: "Preferred Contact", extraNote: "Note",
    edit: "Edit", checkInfo: "Review your information",
    confirmInfo: "Once confirmed, your booking request is sent to our team and we'll contact you shortly.",
    agree1: "",
    agree2: "",
    confirmNote: "When you confirm, your booking request is saved and our team will contact you shortly.",
    next: "Continue", back: "Back", confirmCta: "Confirm Booking Request",
    step: "Step", ssl: "256-bit SSL", kvkkBadge: "GDPR Aligned", warrantyBadge: "2-Year Warranty",
    successTitle: "Your booking request has been sent!", successDesc: "Your request has reached our team. We'll get back to you shortly.",
    summary: "Booking Request Summary", service: "Service", address: "Address", phoneL: "Phone", emailL: "Email", nameL: "Full Name",
    backHome: "Back to Home",
    waHeader: "🛠️ *NEW BOOKING REQUEST*", waService: "Service", waAddress: "Address", waDateTime: "Date & Time", waPersonal: "👤 *Personal Details*", waName: "Full Name", waPhone: "Phone", waEmail: "Email", waContactPref: "Preferred Contact", waNote: "Note",
    afterChoose: "After choosing your service,", afterChooseSub: "you'll set address, date and contact details step by step.",
    err: { svc: "Please select a service.", dist: "Please select a district.", neigh: "Please select a neighborhood.", addr: "Please enter the full address.", date: "Please select a date.", slot: "Please select a time slot.", name: "Enter your full name.", phone: "Enter a valid phone.", email: "Enter a valid email.", agree: "Please tick the agreement boxes." },
  },
};

type TDict = typeof STR.tr;

const TIME_SLOTS = [
  "08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00",
  "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00",
  "20:00 - 22:00", "22:00 - 24:00",
];

function isValidTrPhone(raw: string) {
  return /^(0|90)?5\d{9}$/.test(raw.replace(/\D/g, ""));
}

const pad2 = (n: number) => String(n).padStart(2, "0");

function BookingPage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const t: TDict = STR[lang] as unknown as TDict;
  const fmtFullDate = (d: Date) =>
    `${d.getDate()} ${t.months[d.getMonth()]} ${d.getFullYear()} ${t.daysLong[d.getDay()]}`;

  const [step, setStep] = useState(0);
  const [serviceKey, setServiceKey] = useState("");
  const [il, setIl] = useState("İstanbul");
  const [districtSlug, setDistrictSlug] = useState("");
  const [mahalle, setMahalle] = useState("");
  const [address, setAddress] = useState("");
  const today = useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d; }, []);
  const [calMonth, setCalMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactPref, setContactPref] = useState<string>(t.contactPrefs[0]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const service = t.services.find((s) => s.key === serviceKey);
  const district = DISTRICTS.find((d) => d.slug === districtSlug);

  function validateStep(): string | null {
    if (step === 0 && !serviceKey) return t.err.svc;
    if (step === 1) {
      if (!districtSlug) return t.err.dist;
      if (!mahalle) return t.err.neigh;
      if (address.trim().length < 5) return t.err.addr;
    }
    if (step === 2) {
      if (!date) return t.err.date;
      if (!slot) return t.err.slot;
    }
    if (step === 3) {
      if (name.trim().length < 2) return t.err.name;
      if (!isValidTrPhone(phone)) return t.err.phone;
      if (!/^\S+@\S+\.\S+$/.test(email)) return t.err.email;
    }
    // No agreement checkboxes required anymore.
    return null;
  }

  function next() {
    const e = validateStep();
    if (e) { setError(e); return; }
    setError("");
    setStep((s) => Math.min(s + 1, 5));
  }
  function back() { setError(""); setStep((s) => Math.max(s - 1, 0)); }

  async function confirm() {
    const e = validateStep();
    if (e) { setError(e); return; }
    setError("");

    if (!district || !service) return;

    setSubmitting(true);
    // Save the booking to the database — this is what shows up in the admin panel.
    const { error: insErr } = await supabase
      .from("bookings")
      .insert({
        name: name.trim(),
        phone: phone.replace(/\s/g, ""),
        district_slug: district.slug,
        district_name: district.name,
        service_key: service.key,
        service_label: service.label,
        preferred_date: date ? `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}` : null,
        time_slot: slot || null,
        address: `${address}, ${mahalle}, ${district.name} / ${il}`,
        notes: notes.trim() || null,
      });
    setSubmitting(false);

    if (insErr) {
      console.warn("[booking insert]", insErr.message);
      setError(lang === "tr" ? "Bir sorun oluştu, lütfen tekrar deneyin." : "Something went wrong, please try again.");
      return;
    }

    trackEvent("booking_submit", service?.key, { district: district?.slug, slot });
    setSubmitted(true);
  }

  const progressPct = ((step + 1) / 6) * 100;
  const waHref = `https://wa.me/${WA_NUMBER}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Atmospheric layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_85%_-10%,rgba(220,38,38,0.18),transparent_70%),radial-gradient(50%_35%_at_10%_10%,rgba(220,38,38,0.10),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:40px_40px]" />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-md items-center justify-between px-4 pt-5 pb-3 lg:max-w-6xl lg:px-8 lg:pt-6">
        <button
          onClick={step === 0 || submitted ? () => navigate({ to: "/" }) : back}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:border-brand-red/40 hover:bg-brand-red/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-brand-red/15 text-brand-red lg:flex">
            <Sparkles className="h-4 w-4" />
          </div>
          <h1 className="text-[13px] font-extrabold tracking-[0.22em] lg:text-[14px]">{t.title}</h1>
        </div>
        <Link to="/" aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors hover:border-brand-red/40 hover:bg-brand-red/10">
          <X className="h-5 w-5" />
        </Link>
      </header>

      <div className="relative z-10 mx-auto w-full max-w-md px-4 pb-40 lg:max-w-6xl lg:px-8 lg:pb-16">
        {submitted ? (
          <SuccessView
            t={t}
            service={service?.label || ""}
            address={`${address}, ${mahalle}, ${district?.name} / ${il}`}
            date={date ? fmtFullDate(date) : ""}
            slot={slot}
            name={name} phone={phone} email={email} notes={notes}
            waHref={waHref}
          />
        ) : (
          <div className="lg:grid lg:grid-cols-[340px_1fr] lg:gap-8 lg:pt-2">
            {/* Desktop side rail */}
            <SideRail t={t} step={step} onJump={setStep} waHref={waHref} />

            {/* Right / main panel */}
            <div className="min-w-0">
              {/* Mobile chip stepper */}
              <MobileStepBar t={t} step={step} progressPct={progressPct} />

              {/* Active step panel */}
              <section
                key={step}
                className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-xl lg:mt-0 lg:p-8 animate-in fade-in slide-in-from-bottom-1 duration-300"
              >
                <div className="pointer-events-none absolute -top-24 right-[-10%] h-56 w-56 rounded-full bg-brand-red/20 blur-3xl" />

                <StepHeader t={t} step={step} />

                <div className="relative mt-6">
                  {step === 0 && (
                    <ServiceStep t={t} serviceKey={serviceKey} setServiceKey={setServiceKey} />
                  )}

                  {step === 1 && (
                    <AddressStep
                      t={t} il={il} setIl={setIl}
                      districtSlug={districtSlug} setDistrictSlug={(v) => { setDistrictSlug(v); setMahalle(""); }}
                      district={district} mahalle={mahalle} setMahalle={setMahalle}
                      address={address} setAddress={setAddress} lang={lang}
                    />
                  )}

                  {step === 2 && (
                    <DateTimeStep
                      t={t} calMonth={calMonth} setCalMonth={setCalMonth}
                      date={date} setDate={setDate} today={today}
                      slot={slot} setSlot={setSlot}
                    />
                  )}

                  {step === 3 && (
                    <PersonalStep
                      t={t}
                      name={name} setName={setName}
                      phone={phone} setPhone={setPhone}
                      email={email} setEmail={setEmail}
                      contactPref={contactPref} setContactPref={setContactPref}
                      notes={notes} setNotes={setNotes}
                    />
                  )}

                  {step === 4 && (
                    <ReviewStep
                      t={t} service={service} address={address} mahalle={mahalle}
                      district={district} il={il} date={date} fmtFullDate={fmtFullDate}
                      slot={slot} name={name} phone={phone} email={email}
                      contactPref={contactPref} notes={notes} onEditStep={setStep}
                    />
                  )}

                  {step === 5 && (
                    <ConfirmStep
                      t={t} service={service} address={address} mahalle={mahalle}
                      district={district} il={il} date={date} fmtFullDate={fmtFullDate}
                      slot={slot} name={name} phone={phone} email={email}
                      contactPref={contactPref} notes={notes} onEditStep={setStep}
                    />
                  )}
                </div>

                {error && (
                  <div className="mt-5 flex items-start gap-2 rounded-xl border border-brand-red/30 bg-brand-red/10 px-3 py-2.5 text-[12.5px] font-semibold text-brand-red">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" /> {error}
                  </div>
                )}

                {/* Desktop inline action bar */}
                <div className="mt-7 hidden items-center justify-between gap-3 border-t border-white/10 pt-5 lg:flex">
                  <div className="flex items-center gap-4 text-[11px] text-white/55">
                    <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-brand-red" /> {t.ssl}</span>
                    <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-brand-red" /> {t.kvkkBadge}</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> {t.warrantyBadge}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {step > 0 && (
                      <button onClick={back} className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[13px] font-bold text-white/85 transition-colors hover:border-white/30 hover:bg-white/10">
                        {t.back}
                      </button>
                    )}
                    <button
                      onClick={step === 5 ? confirm : next}
                      disabled={step === 5 && submitting}
                      className={`group flex items-center gap-2 rounded-xl px-6 py-3 text-[13.5px] font-extrabold tracking-wide text-white shadow-[0_10px_30px_-12px_rgba(220,38,38,0.7)] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 ${step === 5 ? "bg-emerald-600 hover:bg-emerald-500" : "bg-brand-red hover:brightness-110"}`}
                    >
                      {step === 5 ? (submitting ? "..." : t.confirmCta) : t.next}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>

      {/* Mobile sticky action bar */}
      {!submitted && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#0a0a0a]/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-md">
            <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/55">
              <span>{t.step} {pad2(step + 1)} / 06</span>
              <span>{Math.round(progressPct)}%</span>
            </div>
            <div className="mb-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-red via-rose-500 to-brand-red bg-[length:200%_100%] animate-[flow-move_3s_linear_infinite] transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="flex items-center gap-2">
              {step > 0 && (
                <button onClick={back} aria-label="Back" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={step === 5 ? confirm : next}
                disabled={step === 5 && submitting}
                className={`flex flex-1 items-center justify-center gap-2.5 rounded-2xl py-3.5 text-[14.5px] font-extrabold tracking-wide text-white shadow-[0_10px_28px_-10px_rgba(220,38,38,0.7)] disabled:cursor-not-allowed disabled:opacity-60 ${step === 5 ? "bg-emerald-600" : "bg-brand-red"}`}
              >
                {step === 5 ? (submitting ? "..." : t.confirmCta) : t.next}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-3 text-[10px] text-white/45">
              <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-brand-red" /> {t.ssl}</span>
              <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-brand-red" /> {t.kvkkBadge}</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> {t.warrantyBadge}</span>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes flow-move{0%{background-position:0% 50%}100%{background-position:200% 50%}}`}</style>
    </div>
  );
}

/* ---------- Side rail (desktop) ---------- */

function SideRail({ t, step, onJump, waHref }: { t: TDict; step: number; onJump: (n: number) => void; waHref: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-6 space-y-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-red/25 blur-3xl" />
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.live}
          </div>
          <h2 className="mt-3 text-[22px] font-extrabold leading-tight">{t.consoleTitle}</h2>
          <p className="mt-1.5 text-[12px] leading-relaxed text-white/60">{t.consoleSub}</p>

          {/* KPI grid */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Kpi label={t.kpiAvg} value="30dk" />
            <Kpi label={t.kpiOnline} value="18" />
            <Kpi label={t.kpiBookings} value="42" />
          </div>
        </div>

        {/* Vertical stepper */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <div className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">
            {t.step} {pad2(step + 1)} / 06
          </div>
          <ol className="relative">
            <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10" />
            <div className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-brand-red to-rose-500 transition-all duration-500" style={{ height: `calc(${(step / 5) * 100}% - 0px)` }} />
            {t.stepShort.map((label, i) => {
              const done = i < step;
              const current = i === step;
              const reachable = i <= step;
              return (
                <li key={i} className="relative flex items-start gap-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => reachable && onJump(i)}
                    disabled={!reachable}
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-extrabold transition-all ${
                      done ? "border-brand-red bg-brand-red text-white"
                        : current ? "border-brand-red bg-brand-red/20 text-white shadow-[0_0_0_4px_rgba(220,38,38,0.18)]"
                        : "border-white/15 bg-[#0a0a0a] text-white/45"
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : pad2(i + 1)}
                  </button>
                  <div className="min-w-0 pt-1">
                    <div className={`text-[12.5px] font-extrabold leading-tight ${current ? "text-white" : done ? "text-white/85" : "text-white/45"}`}>{label}</div>
                    {current && <div className="mt-0.5 text-[10.5px] text-white/55 line-clamp-2">{t.stepDesc[i]}</div>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Quick contact */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
          <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/45">{t.quickContact}</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-red px-3 py-3 text-[12px] font-extrabold text-white shadow-[0_8px_22px_-10px_rgba(220,38,38,0.7)]">
              <Phone className="h-4 w-4" /> {t.callNow}
            </a>
            <a href={waHref} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-3 text-[12px] font-extrabold text-white">
              <MessageSquare className="h-4 w-4" /> {t.whatsappNow}
            </a>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10.5px] text-white/55">
            <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-brand-red" /> {t.ssl}</span>
            <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-brand-red" /> {t.kvkkBadge}</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-emerald-400" /> {t.warrantyBadge}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-center">
      <div className="text-[16px] font-extrabold text-white">{value}</div>
      <div className="mt-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white/50 leading-tight">{label}</div>
    </div>
  );
}

/* ---------- Mobile step bar ---------- */

function MobileStepBar({ t, step, progressPct }: { t: TDict; step: number; progressPct: number }) {
  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-emerald-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {t.live} · {t.liveSub}
        </div>
        <div className="text-[10px] font-extrabold tracking-[0.18em] text-white/50">{pad2(step + 1)} / 06</div>
      </div>
      <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-brand-red via-rose-500 to-brand-red bg-[length:200%_100%] animate-[flow-move_3s_linear_infinite] transition-all" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="-mx-4 mt-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-1.5">
          {t.stepShort.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <div key={i} className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-extrabold transition-colors ${
                current ? "border-brand-red bg-brand-red/15 text-white"
                  : done ? "border-white/15 bg-white/5 text-white/80"
                  : "border-white/10 bg-white/[0.02] text-white/40"
              }`}>
                <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-extrabold ${done ? "bg-brand-red text-white" : current ? "bg-brand-red text-white" : "bg-white/10 text-white/55"}`}>
                  {done ? <Check className="h-2.5 w-2.5" /> : i + 1}
                </span>
                {label}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Step header (inside panel) ---------- */

function StepHeader({ t, step }: { t: TDict; step: number }) {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-brand-red">
        <span className="h-px w-6 bg-brand-red" />
        {t.step} {pad2(step + 1)} / 06
      </div>
      <h2 className="mt-2 text-[22px] font-extrabold leading-tight lg:text-[28px]">
        {t.stepLabels[step].replace("\n", " ")}
      </h2>
      <p className="mt-1.5 text-[13px] leading-relaxed text-white/60 lg:text-[14px]">{t.stepDesc[step]}</p>
    </div>
  );
}

/* ---------- STEP 0 — Service ---------- */

function ServiceStep({ t, serviceKey, setServiceKey }: { t: TDict; serviceKey: string; setServiceKey: (v: string) => void }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-3">
        {t.services.map((s) => {
          const sel = serviceKey === s.key;
          const Icon = SERVICE_ICONS[s.key] || Info;
          return (
            <button
              key={s.key}
              onClick={() => setServiceKey(s.key)}
              className={`group relative flex flex-col items-start gap-2 overflow-hidden rounded-2xl border p-3.5 text-left transition-all lg:gap-3 lg:p-5 ${
                sel
                  ? "border-brand-red bg-brand-red/10 shadow-[0_0_0_1px_rgba(220,38,38,0.6),0_18px_40px_-18px_rgba(220,38,38,0.65)] -translate-y-0.5"
                  : "border-white/10 bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              {sel && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(220,38,38,0.25),transparent_70%)]" />}
              <div className={`relative flex h-11 w-11 items-center justify-center rounded-xl transition-colors lg:h-12 lg:w-12 ${sel ? "bg-brand-red text-white" : "bg-white/5 text-white/80 group-hover:bg-white/10"}`}>
                <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
              <div className="relative flex-1">
                <div className="text-[13.5px] font-extrabold leading-tight lg:text-[15px]">{s.label}</div>
                <div className="mt-1 line-clamp-2 text-[11px] text-white/55 lg:text-[12px]">{s.desc}</div>
              </div>
              <div className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${sel ? "border-brand-red bg-brand-red" : "border-white/25 group-hover:border-white/50"}`}>
                {sel && <Check className="h-3 w-3 text-white" />}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
        <div>
          <div className="text-[12.5px] font-extrabold">{t.afterChoose}</div>
          <div className="text-[11.5px] text-white/55">{t.afterChooseSub}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STEP 1 — Address ---------- */

function AddressStep({
  t, il, setIl, districtSlug, setDistrictSlug, district, mahalle, setMahalle, address, setAddress, lang,
}: {
  t: TDict; il: string; setIl: (v: string) => void;
  districtSlug: string; setDistrictSlug: (v: string) => void;
  district: typeof DISTRICTS[number] | undefined;
  mahalle: string; setMahalle: (v: string) => void;
  address: string; setAddress: (v: string) => void;
  lang: string;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
      <div className="space-y-3.5">
        <GlassSelect label={t.selectCity} value={il} onChange={setIl} options={["İstanbul"]} icon={<MapPin className="h-4 w-4" />} />
        <GlassSelect
          label={t.selectDistrict}
          value={districtSlug}
          onChange={setDistrictSlug}
          options={DISTRICTS.map((d) => ({ value: d.slug, label: d.name }))}
          placeholder={t.pickDistrict}
          icon={<MapPin className="h-4 w-4" />}
        />
        <GlassSelect
          label={t.selectNeighborhood}
          value={mahalle}
          onChange={setMahalle}
          options={(district?.neighborhoods || []).map((n) => ({ value: n, label: n + (lang === "tr" ? " Mah." : "") }))}
          placeholder={district ? t.pickNeighborhood : t.pickFirst}
          disabled={!district}
          icon={<MapPin className="h-4 w-4" />}
        />
        <div>
          <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white/55">{t.openAddress}</div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors focus-within:border-brand-red/60">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/45" />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value.slice(0, 200))}
                rows={3}
                placeholder={t.addrPlaceholder}
                className="w-full resize-none bg-transparent text-[14px] outline-none placeholder:text-white/35"
              />
            </div>
            <div className="mt-1 text-right text-[11px] text-white/40">{address.length}/200</div>
          </div>
        </div>
      </div>

      {/* Right: coverage / safety panel */}
      <div className="space-y-3.5">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-5">
          <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.8)_1px,transparent_0)] [background-size:18px_18px]" />
          <div className="relative flex items-center justify-between">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/50">{t.coverage}</div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-emerald-300">
              <Activity className="h-3 w-3" /> Live
            </div>
          </div>
          <div className="relative mt-3 text-[18px] font-extrabold leading-tight">
            {district ? district.name : "İstanbul"}
            {mahalle && <span className="text-white/60"> · {mahalle}</span>}
          </div>
          <div className="relative mt-1 text-[12px] text-white/55">{t.coverageHint}</div>

          <div className="relative mt-4 grid grid-cols-3 gap-2">
            <Kpi label={t.kpiAvg} value="30dk" />
            <Kpi label={t.kpiOnline} value="18" />
            <Kpi label="SLA" value="2h" />
          </div>
        </div>

        <div className="rounded-2xl border-l-2 border-brand-red bg-white/[0.03] p-4">
          <div className="flex gap-2.5">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
            <div>
              <div className="text-[13px] font-extrabold">{t.safe}</div>
              <div className="text-[12px] text-white/55">{t.safeDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassSelect({
  label, value, onChange, options, placeholder, disabled, icon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[] | { value: string; label: string }[];
  placeholder?: string; disabled?: boolean; icon?: React.ReactNode;
}) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white/55">{label}</div>
      <div className={`relative flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-3.5 transition-colors focus-within:border-brand-red/60 ${disabled ? "opacity-50" : ""}`}>
        <div className="text-white/45">{icon}</div>
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-transparent text-[14px] font-semibold outline-none"
        >
          {placeholder && <option value="" className="bg-[#0a0a0a]">{placeholder}</option>}
          {opts.map((o) => (
            <option key={o.value} value={o.value} className="bg-[#0a0a0a]">{o.label}</option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 text-white/45" />
      </div>
    </div>
  );
}

/* ---------- STEP 2 — Date & Time ---------- */

function DateTimeStep({
  t, calMonth, setCalMonth, date, setDate, today, slot, setSlot,
}: {
  t: TDict; calMonth: Date; setCalMonth: (d: Date) => void;
  date: Date | null; setDate: (d: Date) => void; today: Date;
  slot: string; setSlot: (s: string) => void;
}) {
  const groups: { key: string; label: string; icon: React.ComponentType<{ className?: string }>; slots: string[] }[] = [
    { key: "morning",   label: t.partMorning,   icon: Sunrise, slots: TIME_SLOTS.filter(s => { const h = parseInt(s); return h >= 8 && h < 12; }) },
    { key: "afternoon", label: t.partAfternoon, icon: Sun,     slots: TIME_SLOTS.filter(s => { const h = parseInt(s); return h >= 12 && h < 18; }) },
    { key: "evening",   label: t.partEvening,   icon: Moon,    slots: TIME_SLOTS.filter(s => { const h = parseInt(s); return h >= 18; }) },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
      <CalendarPicker
        month={calMonth} onMonthChange={setCalMonth}
        selected={date} onSelect={setDate} today={today}
        months={t.months} daysShort={t.daysShort}
        pickDateLabel={t.pickDate}
        selectedLabel={t.selected} todayLabel={t.today} unavailLabel={t.unavail}
      />

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
        <div className="flex items-center justify-between">
          <div className="text-[14px] font-extrabold">{t.pickTime}</div>
          {date && (
            <div className="rounded-full border border-brand-red/30 bg-brand-red/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-red">
              {date.getDate()}/{pad2(date.getMonth() + 1)}
            </div>
          )}
        </div>

        <div className="mt-3 space-y-3.5">
          {groups.map((g) => (
            <div key={g.key}>
              <div className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-widest text-white/55">
                <g.icon className="h-3.5 w-3.5 text-brand-red" /> {g.label}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {g.slots.map((s) => {
                  const isLate = s === "22:00 - 24:00";
                  const sel = slot === s;
                  return (
                    <button
                      key={s}
                      disabled={isLate}
                      onClick={() => setSlot(s)}
                      className={`flex items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-[11.5px] font-extrabold transition-all ${
                        sel
                          ? "border-brand-red bg-brand-red text-white shadow-[0_8px_22px_-10px_rgba(220,38,38,0.7)] -translate-y-0.5"
                          : isLate
                            ? "border-white/5 bg-white/[0.02] text-white/25"
                            : "border-white/10 bg-white/[0.02] text-white/85 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.05]"
                      }`}
                    >
                      <Clock className="h-3 w-3 opacity-80" />
                      {s.replace(" - ", "–")}
                      {isLate && <Lock className="h-2.5 w-2.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-[11.5px] text-white/60">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />
          <div>
            <div className="font-extrabold text-white/85">{t.reminder}</div>
            {t.timeNote}
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarPicker({
  month, onMonthChange, selected, onSelect, today, months, daysShort, pickDateLabel, selectedLabel, todayLabel, unavailLabel,
}: {
  month: Date; onMonthChange: (d: Date) => void; selected: Date | null; onSelect: (d: Date) => void; today: Date;
  months: readonly string[]; daysShort: readonly string[]; pickDateLabel: string; selectedLabel: string; todayLabel: string; unavailLabel: string;
}) {
  const year = month.getFullYear();
  const m = month.getMonth();
  const firstDay = new Date(year, m, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, m + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(new Date(year, m, i - startOffset + 1));
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(year, m, i));
  while (cells.length % 7 !== 0) cells.push(new Date(year, m, daysInMonth + (cells.length - startOffset - daysInMonth + 1)));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 lg:p-5">
      <div className="flex items-center justify-between">
        <div className="text-[14px] font-extrabold">{pickDateLabel}</div>
        <div className="flex items-center gap-1">
          <button onClick={() => onMonthChange(new Date(year, m - 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5"><ArrowLeft className="h-4 w-4" /></button>
          <div className="min-w-[110px] text-center text-[12.5px] font-extrabold">{months[m]} {year}</div>
          <button onClick={() => onMonthChange(new Date(year, m + 1, 1))} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 hover:bg-white/5"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold uppercase tracking-wider text-white/45">
        {daysShort.map((d, i) => <div key={d} className={i >= 5 ? "text-brand-red/80" : ""}>{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const isOtherMonth = d.getMonth() !== m;
          const isToday = d.getTime() === today.getTime();
          const isSel = selected && d.getTime() === selected.getTime();
          // No date restrictions — the user can freely pick any day.
          return (
            <button
              key={i}
              disabled={isOtherMonth}
              onClick={() => onSelect(d)}
              className={`flex h-10 items-center justify-center rounded-xl text-[12.5px] font-extrabold transition-all ${
                isSel
                  ? "bg-brand-red text-white shadow-[0_8px_22px_-10px_rgba(220,38,38,0.7)] -translate-y-0.5"
                  : isToday
                    ? "border border-brand-red/50 text-white"
                    : isOtherMonth
                      ? "text-white/15"
                      : "text-white/85 hover:bg-white/5"
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px] text-white/55">
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-brand-red" /> {selectedLabel}</span>
        <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full border border-brand-red/50" /> {todayLabel}</span>
        
      </div>
    </div>
  );
}

/* ---------- STEP 3 — Personal ---------- */

function PersonalStep({
  t, name, setName, phone, setPhone, email, setEmail, contactPref, setContactPref, notes, setNotes,
}: {
  t: TDict;
  name: string; setName: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  contactPref: string; setContactPref: (v: string) => void;
  notes: string; setNotes: (v: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
      <FloatField icon={<User className="h-4 w-4" />} label={t.fields.name}>
        <input value={name} onChange={(e) => setName(e.target.value.slice(0, 60))} placeholder={t.fields.namePh}
          className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:text-white/30" />
      </FloatField>
      <FloatField icon={<Phone className="h-4 w-4" />} label={t.fields.phone}>
        <input type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value.slice(0, 18))} placeholder="0532 xxx xx xx"
          className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:text-white/30" />
      </FloatField>
      <FloatField icon={<Mail className="h-4 w-4" />} label={t.fields.email} className="lg:col-span-2">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value.slice(0, 80))} placeholder={t.fields.emailPh}
          className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:text-white/30" />
      </FloatField>

      <div className="lg:col-span-2">
        <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white/55">{t.fields.contact}</div>
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          {t.contactPrefs.map((p) => {
            const sel = contactPref === p;
            return (
              <button key={p} onClick={() => setContactPref(p)}
                className={`rounded-xl px-3 py-2.5 text-[12.5px] font-extrabold transition-all ${sel ? "bg-brand-red text-white shadow-[0_6px_18px_-8px_rgba(220,38,38,0.7)]" : "text-white/70 hover:bg-white/5"}`}>
                {p}
              </button>
            );
          })}
        </div>
      </div>

      <FloatField icon={<Pencil className="h-4 w-4" />} label={t.fields.notes} className="lg:col-span-2">
        <textarea value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 200))} rows={2} placeholder={t.fields.notesPh}
          className="w-full resize-none bg-transparent text-[14px] font-medium outline-none placeholder:text-white/30" />
        <div className="mt-1 text-right text-[11px] text-white/40">{notes.length}/200</div>
      </FloatField>

      <div className="lg:col-span-2">
        <div className="flex items-start gap-2.5 rounded-2xl border-l-2 border-brand-red bg-white/[0.03] p-3.5">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />
          <div>
            <div className="text-[12.5px] font-extrabold">{t.kvkk}</div>
            <div className="text-[11.5px] text-white/55">{t.kvkkDesc}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FloatField({ icon, label, children, className = "" }: { icon: React.ReactNode; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors focus-within:border-brand-red/60 ${className}`}>
      <div className="flex gap-3">
        <div className="mt-0.5 text-white/45">{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-white/50">{label}</div>
          <div className="mt-0.5">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- STEP 4 — Review ---------- */

function ReviewStep(props: {
  t: TDict; service: { label: string; desc: string } | undefined;
  address: string; mahalle: string; district: typeof DISTRICTS[number] | undefined; il: string;
  date: Date | null; fmtFullDate: (d: Date) => string; slot: string;
  name: string; phone: string; email: string; contactPref: string; notes: string;
  onEditStep: (n: number) => void;
}) {
  const { t, service, address, mahalle, district, il, date, fmtFullDate, slot, name, phone, email, contactPref, notes, onEditStep } = props;
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
      <SummaryCard editLabel={t.edit} icon={<Droplet className="h-4 w-4 text-brand-red" />} title={t.selectedService}
        body={<><div className="text-[14px] font-extrabold">{service?.label}</div><div className="text-[12px] text-white/55">{service?.desc}</div></>}
        onEdit={() => onEditStep(0)} />
      <SummaryCard editLabel={t.edit} icon={<MapPin className="h-4 w-4 text-brand-red" />} title={t.addrInfo}
        body={<div className="text-[12.5px] leading-relaxed">{address}<br />{mahalle}, {district?.name} / {il}</div>}
        onEdit={() => onEditStep(1)} />
      <SummaryCard editLabel={t.edit} icon={<CalIcon className="h-4 w-4 text-brand-red" />} title={t.dateTime}
        body={<div className="text-[12.5px] leading-relaxed">{date ? fmtFullDate(date) : "-"}<br />{slot}</div>}
        onEdit={() => onEditStep(2)} />
      <SummaryCard editLabel={t.edit} icon={<User className="h-4 w-4 text-brand-red" />} title={t.personalInfo}
        body={
          <div className="text-[12.5px] leading-relaxed space-y-0.5">
            <div>{name}</div><div>{phone}</div><div className="break-all">{email}</div>
            <div className="text-white/65">{t.contactPref}: <span className="font-extrabold text-white">{contactPref}</span></div>
            {notes && <div className="text-white/65">{t.extraNote}: {notes}</div>}
          </div>
        }
        onEdit={() => onEditStep(3)} />

      <div className="lg:col-span-2 rounded-2xl border border-blue-500/30 bg-blue-500/[0.07] p-4">
        <div className="flex gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-300" />
          <div>
            <div className="text-[13px] font-extrabold">{t.checkInfo}</div>
            <div className="text-[12px] text-white/65">{t.confirmInfo}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, body, onEdit, editLabel }: { icon: React.ReactNode; title: string; body: React.ReactNode; onEdit: () => void; editLabel: string }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-white/20">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-red/15">{icon}</div>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-extrabold uppercase tracking-wider text-white/55">{title}</div>
          <div className="mt-1 text-white">{body}</div>
        </div>
        <button onClick={onEdit} className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-extrabold text-brand-red transition-colors hover:border-brand-red/40 hover:bg-brand-red/10">
          <Pencil className="h-3 w-3" /> {editLabel}
        </button>
      </div>
    </div>
  );
}

/* ---------- STEP 5 — Confirm ---------- */

function ConfirmStep(props: {
  t: TDict; service: { label: string; desc: string } | undefined;
  address: string; mahalle: string; district: typeof DISTRICTS[number] | undefined; il: string;
  date: Date | null; fmtFullDate: (d: Date) => string; slot: string;
  name: string; phone: string; email: string; contactPref: string; notes: string;
  onEditStep: (n: number) => void;
}) {
  const { t, service, address, mahalle, district, il, date, fmtFullDate, slot, name, phone, email, contactPref, notes, onEditStep } = props;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
        <SummaryCard editLabel={t.edit} icon={<Droplet className="h-4 w-4 text-brand-red" />} title={t.service}
          body={<div className="text-[14px] font-extrabold">{service?.label}</div>} onEdit={() => onEditStep(0)} />
        <SummaryCard editLabel={t.edit} icon={<MapPin className="h-4 w-4 text-brand-red" />} title={t.address}
          body={<div className="text-[12.5px] leading-relaxed">{address}<br />{mahalle}, {district?.name} / {il}</div>} onEdit={() => onEditStep(1)} />
        <SummaryCard editLabel={t.edit} icon={<CalIcon className="h-4 w-4 text-brand-red" />} title={t.dateTime}
          body={<div className="text-[12.5px] leading-relaxed">{date ? fmtFullDate(date) : "-"}<br />{slot}</div>} onEdit={() => onEditStep(2)} />
        <SummaryCard editLabel={t.edit} icon={<User className="h-4 w-4 text-brand-red" />} title={t.personalInfo}
          body={
            <div className="text-[12.5px] leading-relaxed space-y-0.5">
              <div>{name}</div><div>{phone}</div><div className="break-all">{email}</div>
              <div className="text-white/65">{t.contactPref}: <span className="font-extrabold text-white">{contactPref}</span></div>
            </div>
          } onEdit={() => onEditStep(3)} />
        {notes && (
          <div className="lg:col-span-2">
            <SummaryCard editLabel={t.edit} icon={<MessageSquare className="h-4 w-4 text-brand-red" />} title={t.extraNotes}
              body={<div className="text-[12.5px]">{notes}</div>} onEdit={() => onEditStep(3)} />
          </div>
        )}
      </div>


      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.07] p-4">
        <div className="flex gap-2.5">
          <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
          <div className="text-[12.5px] text-white/85">{t.confirmNote}</div>
        </div>
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-3.5 text-left transition-colors hover:bg-white/[0.03] active:bg-white/[0.06]"
    >
      <span
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${checked ? "border-brand-red bg-brand-red" : "border-white/30"}`}
      >
        {checked && <Check className="h-4 w-4 text-white" />}
      </span>
      <span className="text-[13px] leading-snug text-white/85">{label}</span>
    </button>
  );
}

/* ---------- Success ---------- */

function SuccessView({
  t, service, address, date, slot, name, phone, email, notes, waHref,
}: { t: TDict; service: string; address: string; date: string; slot: string; name: string; phone: string; email: string; notes: string; waHref: string }) {
  return (
    <div className="mx-auto max-w-2xl pt-4 text-center lg:pt-10">
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-emerald-500/40" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-500 bg-emerald-500/10">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
      </div>
      <h2 className="mt-5 text-[24px] font-extrabold lg:text-[30px]">{t.successTitle}</h2>
      <p className="mx-auto mt-2 max-w-md text-[13px] text-white/60 lg:text-[14px]">{t.successDesc}</p>

      <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-left backdrop-blur-xl lg:p-7">
        <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-brand-red">
          <span className="h-px w-6 bg-brand-red" /> {t.summary}
        </div>
        <div className="mt-4 grid gap-3 text-[12.5px] sm:grid-cols-2">
          <Row icon={<Droplet className="h-4 w-4 text-brand-red" />} label={t.service} value={service} />
          <Row icon={<MapPin className="h-4 w-4 text-brand-red" />} label={t.address} value={address} />
          <Row icon={<CalIcon className="h-4 w-4 text-brand-red" />} label={t.dateTime} value={`${date}, ${slot}`} />
          <Row icon={<User className="h-4 w-4 text-brand-red" />} label={t.nameL} value={name} />
          <Row icon={<Phone className="h-4 w-4 text-brand-red" />} label={t.phoneL} value={phone} />
          <Row icon={<Mail className="h-4 w-4 text-brand-red" />} label={t.emailL} value={email} />
          {notes && <Row icon={<MessageSquare className="h-4 w-4 text-brand-red" />} label={t.extraNote} value={notes} />}
        </div>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <a href={waHref} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-[14px] font-extrabold text-white shadow-[0_10px_28px_-12px_rgba(16,185,129,0.7)]">
          <MessageSquare className="h-4 w-4" /> WhatsApp
        </a>
        <Link to="/" className="flex items-center justify-center gap-2 rounded-2xl bg-brand-red px-5 py-3.5 text-[14px] font-extrabold text-white shadow-[0_10px_28px_-12px_rgba(220,38,38,0.7)]">
          {t.backHome} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="mt-0.5">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-white/50">{label}</div>
        <div className="mt-0.5 break-words font-semibold text-white">{value}</div>
      </div>
    </div>
  );
}
