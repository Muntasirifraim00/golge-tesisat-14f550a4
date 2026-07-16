import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Star, ShieldCheck, Clock, ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import logoImg from "@/assets/logo.jpg";
import { ProblemShowcase } from "@/components/ProblemShowcase";
import techAhmet from "@/assets/tech-ahmet.jpg";
import techEmre from "@/assets/tech-emre.jpg";
import techHasan from "@/assets/tech-hasan.jpg";
import techMehmet from "@/assets/tech-mehmet.jpg";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:05338960503";

export function DesktopTopBar() {
  const { t, lang, setLang } = useLang();
  const nav = lang === "en"
    ? [
        { label: "Services", href: "#services" },
        { label: "Why Us", href: "#why-us" },
        { label: "Our Work", href: "#from-the-field" },
        { label: "Reviews", href: "#reviews" },
        { label: "FAQ", href: "#faq" },
        { label: "Contact", href: "#contact" },
      ]
    : [
        { label: "Hizmetler", href: "#services" },
        { label: "Neden Biz", href: "#why-us" },
        { label: "İşlerimiz", href: "#from-the-field" },
        { label: "Yorumlar", href: "#reviews" },
        { label: "SSS", href: "#faq" },
        { label: "İletişim", href: "#contact" },
      ];

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#06080d]/80 backdrop-blur-2xl">
      <div className="mx-auto max-w-[1320px] px-8 h-[72px] flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 rounded-2xl bg-white flex items-center justify-center shadow-lg ring-1 ring-white/10 overflow-hidden">
            <img src={logoImg} alt={t.brand.name} width={32} height={32} className="h-8 w-8 object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-[17px] font-extrabold tracking-tight text-white uppercase">{t.brand.name}</div>
            <div className="text-[9.5px] text-slate-400 font-semibold tracking-[0.28em] uppercase mt-0.5">{t.brand.tagline}</div>
          </div>
        </div>

        {/* Center nav */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-1.5 text-[13px] font-semibold text-slate-300">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-1.5 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {n.label}
            </a>
          ))}
          <Link
            to="/blog"
            className="rounded-full px-3.5 py-1.5 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            Blog
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-[11px] font-bold">
            <button
              onClick={() => setLang("tr")}
              className={`px-2.5 py-1 rounded-full transition ${lang === "tr" ? "bg-brand-red text-white" : "text-slate-400 hover:text-white"}`}
            >TR</button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition ${lang === "en" ? "bg-brand-red text-white" : "text-slate-400 hover:text-white"}`}
            >EN</button>
          </div>
          <a href={PHONE_HREF} className="hidden lg:flex items-center gap-2 text-[13px] font-bold text-white transition-colors hover:text-brand-red">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <Phone className="h-3.5 w-3.5 text-brand-red fill-brand-red" />
            </span>
            {PHONE}
          </a>
          <Link
            to="/randevu"
            className="group flex items-center gap-1.5 rounded-full bg-brand-red px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(226,59,59,0.8)] transition-all hover:-translate-y-0.5"
          >
            {lang === "en" ? "Book Now" : "Randevu Al"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export function DesktopHero() {
  const { t, lang } = useLang();
  const en = lang === "en";

  const stats = [
    { v: "10.000+", l: en ? "Happy customers" : "Mutlu müşteri" },
    { v: "4.9", l: en ? "Google rating" : "Google puanı", star: true },
    { v: en ? "30 min" : "30 dk", l: en ? "Average arrival" : "Ortalama varış" },
    { v: "100%", l: en ? "Workmanship warranty" : "İşçilik garantisi" },
  ];

  const crew = [techAhmet, techEmre, techHasan, techMehmet];

  return (
    <section className="hidden md:block relative overflow-hidden bg-[#06080d] text-slate-50">
      {/* soft grid + brand glow */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[680px] w-[680px] rounded-full bg-brand-red/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-20%] left-[-5%] h-[460px] w-[460px] rounded-full bg-emerald-500/[0.07] blur-[130px]" />

      <div className="relative mx-auto max-w-[1280px] px-8 pt-[148px] pb-24 grid grid-cols-12 gap-12 xl:gap-16 items-center">
        {/* LEFT — editorial */}
        <div className="col-span-6 flex flex-col">
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-brand-red/25 bg-brand-red/[0.08] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand-red">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
            </span>
            {en ? "24/7 Emergency Response" : "7/24 Acil Müdahale"}
          </div>

          <h1 className="mt-7 text-[64px] xl:text-[78px] font-black leading-[0.94] tracking-[-0.03em] text-white">
            <span className="block">{t.hero.title1}</span>
            <span className="block text-slate-400">{t.hero.title2}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-500 to-orange-400">
              {t.hero.title3}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-slate-300">
            {t.hero.descPre}
            <span className="font-bold text-brand-gold"> {t.hero.descBold} </span>
            {t.hero.descPost}
          </p>

          {/* CTA row */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={PHONE_HREF}
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-brand-red px-6 py-4 font-bold text-white shadow-[0_22px_44px_-16px_rgba(226,59,59,0.75)] transition-all hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
                <Phone className="h-5 w-5" />
              </span>
              <span className="relative flex flex-col items-start leading-tight">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">{en ? "Call now" : "Hemen ara"}</span>
                <span className="text-[18px]">{PHONE}</span>
              </span>
            </a>
            <a
              href="https://wa.me/905338960503"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] px-6 py-4 font-bold text-emerald-300 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-emerald-400/[0.12]"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <Link
              to="/randevu"
              className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-brand-gold/40 hover:text-brand-gold"
            >
              {en ? "Get a quote" : "Fiyat Al"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {crew.map((c, i) => (
                  <img key={i} src={c} alt="" className="h-10 w-10 rounded-full border-2 border-[#06080d] object-cover" />
                ))}
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <div className="mt-0.5 text-[12px] text-slate-400">
                  <span className="font-bold text-white">10.000+</span> {en ? "satisfied customers" : "memnun müşteri"}
                </div>
              </div>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-[12px] text-slate-300">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span>{en ? "Parts & labour warranty" : "Parça & işçilik garantisi"}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — showcase */}
        <div className="col-span-6 relative">
          <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-3 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="overflow-hidden rounded-[20px]">
              <ProblemShowcase />
            </div>
          </div>

          {/* floating workmanship badge */}
          <div className="absolute -left-6 top-8 hidden xl:flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0e14]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold/15">
              <ShieldCheck className="h-5 w-5 text-brand-gold" />
            </span>
            <div className="leading-tight">
              <div className="text-[18px] font-black text-white">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{en ? "Guaranteed" : "Garantili"}</div>
            </div>
          </div>

          {/* floating ETA badge */}
          <div className="absolute -right-5 bottom-8 hidden xl:flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0e14]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/15">
              <Clock className="h-5 w-5 text-emerald-400" />
            </span>
            <div className="leading-tight">
              <div className="text-[18px] font-black text-white">~30 {en ? "min" : "dk"}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{en ? "Avg arrival" : "Ortalama varış"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* trust stat strip */}
      <div className="relative border-t border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-4 divide-x divide-white/[0.06] px-8">
          {stats.map((s) => (
            <div key={s.l} className="flex flex-col items-center justify-center gap-1 py-7 text-center">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[34px] font-black tracking-tight text-white">{s.v}</span>
                {s.star && <Star className="h-5 w-5 fill-brand-gold text-brand-gold" />}
              </div>
              <div className="text-[12px] font-medium uppercase tracking-wider text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
