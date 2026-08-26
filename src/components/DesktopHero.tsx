import type { CSSProperties } from "react";
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
  const nav =
    lang === "en"
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
            <img
              src={logoImg}
              alt={t.brand.name}
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>
          <div className="leading-tight">
            <div className="text-[17px] font-extrabold tracking-tight text-white uppercase">
              {t.brand.name}
            </div>
            <div className="text-[9.5px] text-slate-400 font-semibold tracking-[0.28em] uppercase mt-0.5">
              {t.brand.tagline}
            </div>
          </div>
        </div>

        {/* Center nav — flex-based (was absolute-centered, which overlapped the right toggle at ~1180–1260px viewports) */}
        <nav className="mx-6 flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-1.5 text-[13px] font-semibold text-slate-300">
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
            >
              TR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition ${lang === "en" ? "bg-brand-red text-white" : "text-slate-400 hover:text-white"}`}
            >
              EN
            </button>
          </div>
          <a
            href={PHONE_HREF}
            className="hidden lg:flex items-center gap-2 text-[13px] font-bold text-white transition-colors hover:text-brand-red"
          >
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
    { v: "2380+", l: en ? "Happy customers" : "Mutlu müşteri" },
    { v: "4.9", l: en ? "Google rating" : "Google puanı", star: true },
    { v: en ? "30 min" : "30 dk", l: en ? "Average arrival" : "Ortalama varış" },
    { v: "100%", l: en ? "Workmanship warranty" : "İşçilik garantisi" },
  ];

  const crew = [techAhmet, techEmre, techHasan, techMehmet];

  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

  return (
    <section className="hidden md:block relative overflow-hidden bg-[#06080d] text-slate-50">
      {/* ---------- atmosphere ---------- */}
      {/* drifting aurora field */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="dh-aurora-a absolute -top-40 right-[-12%] h-[720px] w-[720px] rounded-full bg-brand-red/20 blur-[160px]" />
        <div className="dh-aurora-b absolute top-[18%] left-[-10%] h-[560px] w-[560px] rounded-full bg-orange-500/[0.09] blur-[150px]" />
        <div className="dh-aurora-c absolute bottom-[-25%] left-[22%] h-[520px] w-[520px] rounded-full bg-emerald-500/[0.08] blur-[140px]" />
      </div>

      {/* grid that dissolves at the edges */}
      <div className="dh-grid-mask pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* overhead spotlight */}
      <div className="pointer-events-none absolute -top-px left-1/2 h-[420px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.09),transparent_70%)]" />

      {/* hairline of brand light along the very top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red/50 to-transparent" />

      {/* film grain */}
      <div className="dh-noise pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" />

      <div className="relative mx-auto max-w-[1280px] px-8 pt-[150px] pb-16 grid grid-cols-12 gap-12 xl:gap-16 items-center">
        {/* ---------- LEFT — editorial ---------- */}
        {/* 7/5 split: the English headline is much longer than the Turkish one
            and wraps to five lines in a 6-col column at this type size. */}
        <div className="col-span-7 flex flex-col">
          {/* status pill */}
          <div
            className="dh-rise inline-flex w-fit items-center gap-2.5 rounded-full border border-brand-red/30 bg-gradient-to-r from-brand-red/[0.14] to-brand-red/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-brand-red shadow-[0_0_28px_-8px_rgba(226,59,59,0.55)] backdrop-blur-xl"
            style={d(0)}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
            </span>
            {en ? "24/7 Emergency Response" : "7/24 Acil Müdahale"}
          </div>

          {/* headline with editorial accent rule */}
          <div className="dh-rise relative mt-7" style={d(90)}>
            <span className="absolute -left-8 top-2 hidden h-[calc(100%-1rem)] w-[3px] rounded-full bg-gradient-to-b from-brand-red via-brand-red/40 to-transparent xl:block" />
            <h1 className="text-[58px] xl:text-[70px] font-black leading-[0.95] tracking-[-0.035em] text-white [text-wrap:balance]">
              <span className="block">{t.hero.title1}</span>
              <span className="block bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
                {t.hero.title2}
              </span>
              <span className="relative block">
                {/* soft bloom behind the gradient line */}
                <span
                  aria-hidden
                  className="absolute inset-0 select-none text-brand-red/25 blur-[26px]"
                >
                  {t.hero.title3}
                </span>
                <span className="dh-sheen relative">{t.hero.title3}</span>
              </span>
            </h1>
          </div>

          <p
            className="dh-rise mt-7 max-w-xl text-[17px] leading-relaxed text-slate-300/90"
            style={d(170)}
          >
            {t.hero.descPre}
            <span className="font-bold text-brand-gold"> {t.hero.descBold} </span>
            {t.hero.descPost}
          </p>

          {/* CTA row */}
          <div className="dh-rise mt-9 flex flex-wrap items-center gap-3" style={d(250)}>
            <a
              href={PHONE_HREF}
              className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br from-[#f04747] via-brand-red to-[#c62b2b] px-6 py-4 font-bold text-white shadow-[0_24px_50px_-16px_rgba(226,59,59,0.8),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-16px_rgba(226,59,59,0.95),inset_0_1px_0_rgba(255,255,255,0.3)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-white/20 ring-1 ring-white/25">
                <Phone className="h-5 w-5" />
              </span>
              <span className="relative flex flex-col items-start leading-tight">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
                  {en ? "Call now" : "Hemen ara"}
                </span>
                <span className="text-[18px] tracking-tight">{PHONE}</span>
              </span>
            </a>
            <a
              href="https://wa.me/905338960503"
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-2.5 rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] px-6 py-4 font-bold text-emerald-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/[0.13] hover:shadow-[0_18px_36px_-18px_rgba(16,185,129,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]"
            >
              <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              WhatsApp
            </a>
            <Link
              to="/randevu"
              className="group flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/45 hover:bg-brand-gold/[0.07] hover:text-brand-gold"
            >
              {en ? "Get a quote" : "Fiyat Al"}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* trust row — collected into one glass bar */}
          <div
            className="dh-rise mt-10 flex w-fit flex-wrap items-center gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 backdrop-blur-xl"
            style={d(330)}
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {crew.map((c, i) => (
                  <img
                    key={i}
                    src={c}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-[#06080d] object-cover ring-1 ring-white/10 transition-transform duration-300 hover:-translate-y-1 hover:scale-105"
                  />
                ))}
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <div className="mt-0.5 text-[12px] text-slate-400">
                  <span className="font-bold text-white">2380+</span>{" "}
                  {en ? "satisfied customers" : "memnun müşteri"}
                </div>
              </div>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
            <div className="flex items-center gap-2 text-[12px] text-slate-300">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/10 ring-1 ring-emerald-400/20">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
              </span>
              <span>{en ? "Parts & labour warranty" : "Parça & işçilik garantisi"}</span>
            </div>
          </div>
        </div>

        {/* ---------- RIGHT — showcase ---------- */}
        <div className="dh-rise col-span-5 relative" style={d(200)}>
          {/* pedestal glow under the card */}
          <div className="pointer-events-none absolute -inset-x-6 -bottom-10 h-24 rounded-[50%] bg-brand-red/10 blur-[70px]" />

          {/* animated gradient ring → glass card.
              The inner panel is opaque: a translucent one lets the ring's
              conic gradient bleed through the whole card as a halo. */}
          <div className="dh-ring relative rounded-[30px] p-px shadow-[0_60px_120px_-45px_rgba(0,0,0,0.85)]">
            <div className="relative overflow-hidden rounded-[29px] bg-[#0a0d14] p-3">
              {/* glass sheen over the opaque base */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
              {/* travelling scan line */}
              <div className="dh-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
              <div className="relative overflow-hidden rounded-[22px]">
                <ProblemShowcase />
              </div>
            </div>
          </div>

          {/* floating workmanship badge */}
          <div className="animate-float-slow absolute -left-7 top-32 hidden xl:flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0e14]/85 px-4 py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gold/15 ring-1 ring-brand-gold/25">
              <ShieldCheck className="h-5 w-5 text-brand-gold" />
            </span>
            <div className="leading-tight">
              <div className="text-[18px] font-black text-white">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                {en ? "Guaranteed" : "Garantili"}
              </div>
            </div>
          </div>

          {/* floating ETA badge */}
          <div className="animate-float-slower absolute -right-5 bottom-8 hidden xl:flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0b0e14]/85 px-4 py-3 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/[0.06] backdrop-blur-2xl">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/15 ring-1 ring-emerald-400/25">
              <Clock className="h-5 w-5 text-emerald-400" />
            </span>
            <div className="leading-tight">
              <div className="text-[18px] font-black text-white">~30 {en ? "min" : "dk"}</div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">
                {en ? "Avg arrival" : "Ortalama varış"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- trust stat strip ---------- */}
      <div className="relative border-t border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent backdrop-blur-sm">
        <div className="mx-auto grid max-w-[1280px] grid-cols-4 divide-x divide-white/[0.06] px-8">
          {stats.map((s) => (
            <div
              key={s.l}
              className="group relative flex flex-col items-center justify-center gap-1.5 py-8 text-center transition-colors duration-300 hover:bg-white/[0.02]"
            >
              {/* accent bar that draws in on hover */}
              <span className="absolute inset-x-0 top-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-brand-red to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex items-baseline gap-1.5">
                <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-[36px] font-black tracking-tight text-transparent">
                  {s.v}
                </span>
                {s.star && <Star className="h-5 w-5 fill-brand-gold text-brand-gold" />}
              </div>
              <div className="text-[12px] font-medium uppercase tracking-wider text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
