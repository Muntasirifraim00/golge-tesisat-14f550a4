import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Phone, MessageCircle, ShieldCheck, MapPin, Clock, Wrench, Droplet, Flame,
  Camera, Settings, ChevronDown, ChevronRight, Star, Check, Headphones,
  Calendar, Search, Award, FileText, ThumbsUp, Eye, Target, Handshake,
  User, Users, Truck, Heart, Facebook, Instagram, Globe, Mail, Smile, Zap,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import svcLeak from "@/assets/svc-leak.jpg";
import svcClog from "@/assets/svc-clog.jpg";
import svcCombi from "@/assets/svc-combi.jpg";
import svcRadiator from "@/assets/svc-radiator.jpg";
import svcPipe from "@/assets/svc-pipe.jpg";
import svcCamera from "@/assets/svc-camera.jpg";
import problemLeak from "@/assets/problem-leak.jpg";
import problemClog from "@/assets/problem-clog.jpg";
import problemBoiler from "@/assets/problem-boiler.jpg";
import problemRadiator from "@/assets/problem-radiator.jpg";
import problemCamera from "@/assets/problem-camera.jpg";
import problemToilet from "@/assets/problem-toilet.jpg";
import techMehmet from "@/assets/tech-mehmet.jpg";
import techAhmet from "@/assets/tech-ahmet.jpg";
import techEmre from "@/assets/tech-emre.jpg";
import techHasan from "@/assets/tech-hasan.jpg";
import technician from "@/assets/technician.jpg";
import serviceVan from "@/assets/service-van.jpg";

export const Route = createFileRoute("/Desktop-view")({
  head: () => ({
    meta: [
      { title: "Gölge Tesisat — Desktop View" },
      { name: "description", content: "İstanbul 7/24 acil tesisat hizmetleri — su kaçağı, tıkanıklık, kombi, doğalgaz." },
      // Internal preview/duplicate of the home page — never index, and
      // consolidate any link equity to the canonical home page.
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://golgetesisat.com/" }],
  }),
  component: DesktopView,
});

const PHONE = "0533 896 05 03";
const PHONE_TEL = "+905338960503";

/* ---------- Section 1: HERO ---------- */
function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b1428] text-white">
      <div
        className="relative mx-auto max-w-[1400px] px-8 pt-6 pb-10"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Gölge Tesisatçı" className="h-14 w-14 object-contain" />
            <div className="leading-tight">
              <div className="text-[22px] font-extrabold tracking-wide">GÖLGE</div>
              <div className="text-[13px] font-semibold tracking-[0.3em] text-white/80">TESİSATÇI</div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <TopBadge icon={<Phone className="size-5" />} title="7/24" sub="Acil Servis" titleColor="text-[#ff3b3b]" />
            <TopBadge icon={<MapPin className="size-5" />} title="İstanbul" sub="Avrupa & Anadolu Yakası" titleColor="text-white" />
            <TopBadge icon={<ShieldCheck className="size-5" />} title="Garantili" sub="İşçilik ve Parça" titleColor="text-[#ff3b3b]" />
            <div className="text-right">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 rounded-xl bg-white px-5 py-3 text-[#0b1428] shadow-lg">
                <span className="grid place-items-center rounded-full bg-[#ef2b2b] p-2 text-white">
                  <Phone className="size-4" />
                </span>
                <span className="text-left">
                  <div className="text-[11px] font-bold text-[#ef2b2b]">HEMEN ARA</div>
                  <div className="text-[18px] font-extrabold tracking-tight">{PHONE}</div>
                </span>
              </a>
              <div className="mt-1 text-right text-[11px] text-white/70">7/24 Acil Tesisat Hizmeti</div>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-7 pt-6">
            <span className="inline-flex items-center gap-2 rounded-md bg-[#ef2b2b] px-3 py-1.5 text-[12px] font-extrabold tracking-wider text-white shadow-md">
              <Zap className="size-3.5 fill-white" /> 7/24 ACİL TESİSATÇI
            </span>
            <h1 className="mt-5 text-[56px] font-black leading-[1.05] tracking-tight">
              <span className="block">TIKANIKLIK MI VAR?</span>
              <span className="block">SU KAÇAĞI MI?</span>
              <span className="block text-[#ef2b2b]">HEMEN ÇÖZÜYORUZ!</span>
            </h1>
            <p className="mt-5 max-w-[560px] text-[16px] leading-relaxed text-white/80">
              Su kaçağı tespiti, tıkanıklık açma, kombi, petek, doğalgaz ve tüm tesisat
              işlerinizde hızlı, garantili ve kalıcı çözümler.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 rounded-xl bg-[#ef2b2b] px-6 py-4 shadow-[0_10px_30px_-10px_rgba(239,43,43,0.7)]">
                <span className="grid place-items-center rounded-full bg-white/20 p-2"><Phone className="size-5" /></span>
                <span className="text-left">
                  <div className="text-[11px] font-bold tracking-wider text-white/90">HEMEN ARA</div>
                  <div className="text-[20px] font-extrabold">{PHONE}</div>
                </span>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-xl bg-[#22c55e] px-6 py-4 shadow-[0_10px_30px_-10px_rgba(34,197,94,0.7)]">
                <span className="grid place-items-center rounded-full bg-white/20 p-2"><MessageCircle className="size-5" /></span>
                <span className="text-left">
                  <div className="text-[11px] font-bold tracking-wider text-white/90">WHATSAPP'TAN YAZ</div>
                  <div className="text-[18px] font-extrabold">Hızlı Destek Al</div>
                </span>
              </a>
            </div>
          </div>

          {/* Right image */}
          <div className="relative col-span-5">
            <img src={heroBg} alt="Tesisatçı" className="ml-auto h-[440px] w-full rounded-2xl object-cover" />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="grid h-[120px] w-[120px] place-items-center rounded-full border-4 border-[#d4a73a] bg-[#0b1428]/85 text-center shadow-xl">
                <div>
                  <div className="text-[22px] font-extrabold text-[#d4a73a]">%100</div>
                  <div className="text-[10px] font-bold text-white">MÜŞTERİ</div>
                  <div className="text-[10px] font-bold text-white">MEMNUNİYETİ</div>
                  <div className="mt-1 text-[10px] text-[#d4a73a]">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature row */}
        <div className="mt-10 grid grid-cols-6 divide-x divide-white/10 rounded-2xl border border-white/10 bg-[#0e1a33] px-2 py-5">
          <Feat icon={<Clock className="size-7 text-[#ef2b2b]" />} title="30 DAKİKADA MÜDAHALE" sub="En hızlı şekilde yanınızdayız." />
          <Feat icon={<ShieldCheck className="size-7 text-[#3b82f6]" />} title="GARANTİLİ ÇÖZÜM" sub="İşçilik ve parça garantisi." />
          <Feat icon={<Phone className="size-7 text-[#ef2b2b]" />} title="UZMAN EKİP" sub="Deneyimli ve eğitimli tesisat ustaları." />
          <Feat icon={<Settings className="size-7 text-[#3b82f6]" />} title="MODERN EKİPMAN" sub="Son teknoloji cihazlar ile kalıcı çözümler." />
          <Feat icon={<Phone className="size-7 text-[#ef2b2b]" />} title="7/24 HİZMET" sub="Gece gündüz acil tesisat desteği." />
          <Feat icon={<Award className="size-7 text-[#d4a73a]" />} title="%100 KALİTE" sub="Müşteri memnuniyeti önceliğimiz." />
        </div>

        {/* Bottom stat bar */}
        <div className="mt-5 grid grid-cols-3 items-center gap-4 rounded-2xl bg-white px-8 py-5 text-[#0b1428] shadow-xl">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img src={techAhmet} className="h-11 w-11 rounded-full border-2 border-white object-cover" alt="" />
              <img src={techEmre} className="h-11 w-11 rounded-full border-2 border-white object-cover" alt="" />
              <img src={techHasan} className="h-11 w-11 rounded-full border-2 border-white object-cover" alt="" />
            </div>
            <div>
              <div className="text-[20px] font-extrabold">10.000+</div>
              <div className="text-[12px] text-slate-500">Mutlu Müşteri</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 border-x border-slate-200 px-6">
            <MapPin className="size-7 text-[#ef2b2b]" />
            <div>
              <div className="text-[16px] font-extrabold">İSTANBUL GENELİ HİZMET</div>
              <div className="text-[12px] text-slate-500">Avrupa & Anadolu Yakası</div>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-[20px] font-extrabold shadow ring-1 ring-slate-200">
              <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] bg-clip-text text-transparent">G</span>
            </div>
            <div>
              <div className="text-[18px] font-extrabold">4.9/5 <span className="text-[#f5b400]">★★★★★</span></div>
              <div className="text-[12px] text-slate-500">Google'da 4.9 Puan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TopBadge({ icon, title, sub, titleColor }: { icon: React.ReactNode; title: string; sub: string; titleColor: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid place-items-center rounded-full border border-white/15 p-2 text-white/90">{icon}</span>
      <div className="leading-tight">
        <div className={`text-[14px] font-extrabold ${titleColor}`}>{title}</div>
        <div className="text-[11px] text-white/70">{sub}</div>
      </div>
    </div>
  );
}

function Feat({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 px-5">
      {icon}
      <div>
        <div className="text-[13px] font-extrabold">{title}</div>
        <div className="mt-0.5 text-[11px] text-white/60">{sub}</div>
      </div>
    </div>
  );
}

/* ---------- Section 2: SERVICES (15 cards) ---------- */
function ServicesGrid() {
  const services = [
    { img: svcLeak, icon: <Droplet />, title: "Su Kaçağı Tespiti", desc: "Modern cihazlarla kırmadan, nokta atışı kaçak tespiti." },
    { img: svcClog, icon: <Wrench />, title: "Tıkanıklık Açma", desc: "Lavabo, tuvalet, gider ve kanal tıkanıklıklarını açıyoruz." },
    { img: svcCamera, icon: <Camera />, title: "Kanal Görüntüleme", desc: "Kanal içi kamerayla arızayı tespit ediyor, kesin çözüm sunuyoruz." },
    { img: problemToilet, icon: <Wrench />, title: "Gömme Rezervuar Tamiri", desc: "Gömme rezervuar arızalarını hızlı ve garantili onarıyoruz." },
    { img: svcPipe, icon: <Flame />, title: "Pimaş & Boru Tamiri", desc: "Kırık, çatlak pimaş ve tüm boru arızalarını tamir ediyoruz." },
    { img: svcCamera, icon: <Settings />, title: "Makina ile Pimaş Yıkama", desc: "Yüksek basınçlı makinelerle pimaş ve giderleri temizliyoruz." },
    { img: problemBoiler, icon: <Flame />, title: "Doğalgaz Kaçağı Tespiti", desc: "Cihazla gaz kaçağını tespit ediyor, güvenliğinizi sağlıyoruz." },
    { img: svcLeak, icon: <Flame />, title: "Doğalgaz Kaçağı Tamiri", desc: "Kaçağın kaynağını bulup, doğalgaz tesisatını güvenle onarıyoruz." },
    { img: svcPipe, icon: <Flame />, title: "Yangın Tesisatı İşleri", desc: "Yangın tesisatı proje, montaj ve bakım hizmetleri." },
    { img: svcPipe, icon: <Wrench />, title: "Bakır Boru Tamiri", desc: "Bakır boru kaçak ve onarım işlerini profesyonelce yapıyoruz." },
    { img: svcCombi, icon: <Settings />, title: "Kombi Montaj & Değişim", desc: "Kombi montajı, değişimi ve kurulumlarını yapıyoruz." },
    { img: svcRadiator, icon: <Droplet />, title: "Radyatör (Petek) İşleri", desc: "Petek takma, değiştirme ve sistem kurulumu yapıyoruz." },
    { img: problemToilet, icon: <Droplet />, title: "Duşakabin İşleri", desc: "Duşakabin montajı, tamiri ve su kaçağı problemlerini çözüyoruz." },
    { img: problemToilet, icon: <Droplet />, title: "Vitrifiye İşleri", desc: "Klozet, lavabo, rezervuar ve tüm vitrifiye montajları yapıyoruz." },
    { img: svcCombi, icon: <Settings />, title: "Hidrofor Kurulumu", desc: "Hidrofor montajı, arıza ve bakım hizmetlerini sağlıyoruz." },
  ];
  return (
    <section className="bg-[#f6f8fb] py-16">
      <div className="mx-auto max-w-[1400px] px-8">
        <SectionHeader pillIcon={<Settings className="size-3.5" />} pillText="HİZMETLERİMİZ"
          title={<>Profesyonel <span className="text-[#ef2b2b]">Tesisat Çözümleri</span></>}
          subtitle="Eviniz, iş yeriniz veya projeniz için tüm tesisat ihtiyaçlarınıza profesyonel çözümler sunuyoruz." />
        <div className="mt-10 grid grid-cols-5 gap-5">
          {services.map((s, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.15)] ring-1 ring-slate-100">
              <div className="relative h-[150px] overflow-hidden">
                <img src={s.img} className="h-full w-full object-cover" alt={s.title} />
                <span className="absolute left-3 top-3 grid size-12 place-items-center rounded-full bg-white text-[#0b1428] shadow-md ring-1 ring-slate-200">
                  {s.icon}
                </span>
              </div>
              <div className="p-4">
                <div className="text-[15px] font-extrabold text-[#0b1428]">{s.title}</div>
                <div className="my-2 h-[3px] w-10 rounded bg-[#ef2b2b]" />
                <p className="text-[12px] leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-8 grid grid-cols-12 overflow-hidden rounded-2xl shadow-md">
          <a href={`tel:${PHONE_TEL}`} className="col-span-3 flex items-center gap-3 bg-[#ef2b2b] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-white/15"><Phone className="size-6" /></span>
            <div>
              <div className="text-[12px] font-bold">7/24 ACİL TESİSAT HİZMETİ</div>
              <div className="text-[20px] font-extrabold">{PHONE}</div>
              <div className="text-[10px] opacity-80">Acil durumlarda hemen arayın!</div>
            </div>
          </a>
          <a href="#" className="col-span-3 flex items-center gap-3 bg-[#0b1428] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-[#22c55e]"><MessageCircle className="size-6" /></span>
            <div>
              <div className="text-[12px] font-bold text-[#22c55e]">WHATSAPP'TAN YAZ</div>
              <div className="text-[16px] font-extrabold">Hızlı Destek Al</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px]">WhatsApp'a Git <ChevronRight className="size-3" /></div>
            </div>
          </a>
          <div className="col-span-6 grid grid-cols-4 items-center gap-2 bg-white px-6">
            <MiniStat icon={<Clock className="size-6 text-[#ef2b2b]" />} t="30 DAKİKADA" s="ADRESİNİZDE" b="En hızlı şekilde yanınızdayız." />
            <MiniStat icon={<ShieldCheck className="size-6 text-[#3b82f6]" />} t="GARANTİLİ" s="ÇÖZÜM" b="İşçilik ve parça garantisi." />
            <MiniStat icon={<Users className="size-6 text-[#ef2b2b]" />} t="UZMAN" s="EKİP" b="Alanında uzman ustalar." />
            <MiniStat icon={<Award className="size-6 text-[#d4a73a]" />} t="MÜŞTERİ" s="MEMNUNİYETİ" b="%100 müşteri memnuniyeti önceliğimizdir." />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ icon, t, s, b }: { icon: React.ReactNode; t: string; s: string; b: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-1 flex justify-center">{icon}</div>
      <div className="text-[11px] font-extrabold text-[#0b1428]">{t}</div>
      <div className="text-[11px] font-extrabold text-[#0b1428]">{s}</div>
      <div className="mt-1 text-[10px] text-slate-500">{b}</div>
    </div>
  );
}

function SectionHeader({ pillIcon, pillText, title, subtitle, dark = false }: { pillIcon: React.ReactNode; pillText: string; title: React.ReactNode; subtitle?: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#ef2b2b]/30 bg-white px-4 py-1.5 text-[11px] font-extrabold tracking-wider text-[#0b1428] shadow-sm">
        <span className="grid size-5 place-items-center rounded-full bg-[#ef2b2b] text-white">{pillIcon}</span>
        {pillText}
      </span>
      <h2 className={`mt-4 text-[44px] font-black leading-tight tracking-tight ${dark ? "text-white" : "text-[#0b1428]"}`}>{title}</h2>
      {subtitle && <p className={`mx-auto mt-3 max-w-[760px] text-[15px] ${dark ? "text-white/70" : "text-slate-500"}`}>{subtitle}</p>}
      <div className="mx-auto mt-4 flex w-44 items-center gap-2">
        <div className="h-[2px] flex-1 bg-[#ef2b2b]" />
        <Droplet className="size-4 fill-[#3b82f6] text-[#3b82f6]" />
        <div className="h-[2px] flex-1 bg-[#3b82f6]" />
      </div>
    </div>
  );
}

/* ---------- Section 3: WHY US — Bento Trust Grid ---------- */
function WhyUs() {
  const items = [
    { icon: Clock, t1: "30 Dakikada", t2: "Hızlı Müdahale", desc: "Acil durumlarda en hızlı şekilde adresinizdeyiz.", metric: "22 dk", metricLabel: "ort. varış" },
    { icon: ShieldCheck, t1: "Garantili", t2: "Hizmet", desc: "Tüm işlerimizde garanti ve müşteri memnuniyeti önceliğimizdir.", metric: "2 yıl", metricLabel: "işçilik" },
    { icon: User, t1: "Uzman", t2: "Kadromuz", desc: "Alanında deneyimli ve sertifikalı tesisat ustalarımız hizmetinizde.", metric: "15+ yıl", metricLabel: "deneyim" },
    { icon: Settings, t1: "Son Teknoloji", t2: "Ekipmanlar", desc: "Akustik cihazlar, robot makineler ve kameralar ile kesin çözümler.", metric: "12+", metricLabel: "cihaz tipi" },
    { icon: FileText, t1: "Şeffaf", t2: "Fiyat Anlayışı", desc: "İş öncesi net fiyat, sürpriz ücret yok. Adil fiyat politikası.", metric: "%0", metricLabel: "sürpriz" },
    { icon: Headphones, t1: "7/24", t2: "Destek", desc: "Gece gündüz, hafta sonu ve tatil demeden hizmetinizdeyiz.", metric: "24/7", metricLabel: "açık hat" },
  ];
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background flourish */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-[#ef2b2b]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#0b1428]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-8">
        {/* Header — asymmetric two-column */}
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#ef2b2b]/20 bg-[#ef2b2b]/[0.04] px-1 py-1 backdrop-blur">
              <span className="rounded-full bg-[#ef2b2b] px-3 py-1 text-[11px] font-extrabold tracking-widest text-white">03</span>
              <span className="flex items-center gap-1.5 px-3 text-[11px] font-extrabold tracking-[0.2em] text-[#0b1428]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                NEDEN BİZ?
              </span>
            </span>
            <h2 className="mt-5 text-[52px] font-black leading-[1.05] tracking-tight text-[#0b1428]">
              Tesisatın <span className="text-[#ef2b2b]">altı sütunu</span>,<br />
              tek bir ekipte.
            </h2>
          </div>
          <div className="col-span-5">
            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-[#0b1428] to-[#172445] p-5 text-white shadow-xl">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-white/60">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> CANLI PERFORMANS
              </div>
              <div className="mt-2 flex items-end gap-4">
                <div>
                  <div className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-[40px] font-black leading-none text-transparent">98%</div>
                  <div className="mt-1 text-[11px] text-white/60">Müşteri Memnuniyeti</div>
                </div>
                <div className="h-10 w-px bg-white/15" />
                <div>
                  <div className="text-[28px] font-black leading-none">4.9<span className="text-[#ef2b2b]">/5</span></div>
                  <div className="mt-1 text-[11px] text-white/60">Google · 2.500+ yorum</div>
                </div>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-[#ef2b2b] via-rose-400 to-amber-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Bento grid: featured big card + 5 tiles */}
        <div className="mt-12 grid grid-cols-12 grid-rows-2 gap-5">
          {/* Featured tile — col-span-5 row-span-2 */}
          <div className="group relative col-span-5 row-span-2 overflow-hidden rounded-3xl bg-gradient-to-br from-[#ef2b2b] via-[#e11d2b] to-[#a31221] p-8 text-white shadow-[0_30px_80px_-20px_rgba(239,43,43,0.45)]">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />

            <div className="relative flex h-full flex-col">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-extrabold tracking-widest backdrop-blur">
                  <Award className="size-3" /> #1 SEBEP
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-extrabold tracking-widest ring-1 ring-emerald-300/40">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" /> LIVE
                </span>
              </div>

              <div className="mt-6">
                <div className="grid size-20 place-items-center rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/30">
                  <Clock className="size-10" />
                </div>
                <h3 className="mt-6 text-[42px] font-black leading-[0.95] tracking-tight">
                  30 Dakika.<br />
                  <span className="text-white/80">Söz değil, ortalama.</span>
                </h3>
                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/80">
                  39 ilçede konuşlanmış mobil ekiplerimizle ortalama 22 dakikada
                  kapınızda oluyor, sorunu kırıp dökmeden tespit ediyoruz.
                </p>
              </div>

              <div className="mt-auto grid grid-cols-3 gap-3 pt-8">
                {[
                  { v: "22dk", l: "Ortalama" },
                  { v: "39", l: "İlçe canlı" },
                  { v: "24/7", l: "Hat açık" },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl bg-white/10 p-3 backdrop-blur ring-1 ring-white/15">
                    <div className="text-[22px] font-black leading-none">{s.v}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/70">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tile 2 — top right wide */}
          <div className="group relative col-span-4 row-span-1 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0b1428]/5 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-start gap-4">
              <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#0b1428] text-white shadow-md">
                <ShieldCheck className="size-7" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-slate-400">02 · GÜVENCE</div>
                <div className="mt-1 text-[20px] font-black leading-tight text-[#0b1428]">
                  Garantili <span className="text-[#ef2b2b]">Hizmet</span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                  İşçilik & parça garantisi, faturalı teslimat.
                </p>
              </div>
              <div className="ml-auto rounded-lg bg-emerald-50 px-2.5 py-1.5 text-center ring-1 ring-emerald-200">
                <div className="text-[14px] font-black text-emerald-700">2 yıl</div>
                <div className="text-[8.5px] font-bold uppercase tracking-widest text-emerald-700/70">işçilik</div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#ef2b2b] to-rose-400 transition-all duration-500 group-hover:w-full" />
          </div>

          {/* Tile 3 — small top far right */}
          <div className="group relative col-span-3 row-span-1 overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-br from-[#f6f8fb] to-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div className="grid size-12 place-items-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
                <User className="size-6 text-[#ef2b2b]" />
              </div>
              <span className="text-[10px] font-extrabold tracking-widest text-slate-400">03</span>
            </div>
            <div className="mt-3 text-[17px] font-black leading-tight text-[#0b1428]">Uzman Kadromuz</div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[24px] font-black text-[#ef2b2b]">15+</span>
              <span className="text-[11px] font-bold text-slate-500">yıl deneyim</span>
            </div>
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ef2b2b] transition-all duration-500 group-hover:w-full" />
          </div>

          {/* Tile 4 — bottom row */}
          <div className="group relative col-span-3 row-span-1 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <div className="grid size-12 place-items-center rounded-xl bg-[#ef2b2b]/10 ring-1 ring-[#ef2b2b]/20">
                <Settings className="size-6 text-[#ef2b2b]" />
              </div>
              <span className="text-[10px] font-extrabold tracking-widest text-slate-400">04</span>
            </div>
            <div className="mt-3 text-[17px] font-black leading-tight text-[#0b1428]">Son Teknoloji</div>
            <p className="mt-1.5 text-[11.5px] leading-snug text-slate-500">Akustik, kamera & robot cihazlar.</p>
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ef2b2b] transition-all duration-500 group-hover:w-full" />
          </div>

          {/* Tile 5 — bottom middle */}
          <div className="group relative col-span-2 row-span-1 overflow-hidden rounded-2xl border border-slate-100 bg-[#0b1428] p-6 text-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-[#ef2b2b]/30 blur-2xl" />
            <div className="relative">
              <FileText className="size-6 text-[#ef2b2b]" />
              <div className="mt-3 text-[15px] font-black leading-tight">Şeffaf Fiyat</div>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-black tracking-widest">
                %0 SÜRPRİZ
              </div>
            </div>
          </div>

          {/* Tile 6 — bottom right wide */}
          <div className="group relative col-span-2 row-span-1 overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <Headphones className="size-7 text-[#ef2b2b]" />
            <div className="mt-3 text-[15px] font-black leading-tight text-[#0b1428]">7/24 Destek</div>
            <div className="mt-1 flex items-center gap-1 text-[10.5px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Hat açık
            </div>
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <a href={`tel:${PHONE_TEL}`} className="group flex items-center gap-3 rounded-2xl bg-[#ef2b2b] p-4 text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-15px_rgba(239,43,43,0.6)]">
            <span className="grid size-12 place-items-center rounded-full bg-white/15 transition-transform group-hover:scale-110"><Phone className="size-6" /></span>
            <div>
              <div className="text-[11px] font-bold tracking-wider">HEMEN ARA</div>
              <div className="text-[20px] font-extrabold">{PHONE}</div>
            </div>
          </a>
          <a href="#" className="group flex items-center justify-between rounded-2xl bg-[#0b1428] p-4 text-white shadow-md transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-[#22c55e] transition-transform group-hover:scale-110"><MessageCircle className="size-6" /></span>
              <div>
                <div className="text-[11px] font-bold tracking-wider">WHATSAPP'TAN YAZ</div>
                <div className="text-[16px] font-extrabold">Hızlı Destek Al</div>
              </div>
            </div>
            <ChevronRight />
          </a>
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <Headphones className="size-10 text-[#ef2b2b]" />
            <div>
              <div className="text-[14px] font-extrabold text-[#0b1428]">7/24 ACİL TESİSAT HİZMETİ</div>
              <div className="text-[12px] text-slate-500">Acil durumlarda <b>bir telefon</b> kadar yakınız!</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l, icon }: { n: string; l: string; icon: React.ReactNode }) {
  return (
    <div className="px-4 text-center">
      <div className="mb-1 flex justify-center">{icon}</div>
      <div className="text-[26px] font-extrabold">{n}</div>
      <div className="text-[12px] text-white/70">{l}</div>
    </div>
  );
}

/* ---------- Section 4: BEFORE/AFTER ---------- */
function BeforeAfter() {
  const items = [
    { before: problemCamera, after: svcCamera, icon: <Droplet />, title: "Su Kaçağı Tespiti", desc: "Kırmadan, dökmeden nokta atışı kaçak tespiti ve kalıcı onarım." },
    { before: problemClog, after: svcClog, icon: <Wrench />, title: "Tıkanıklık Açma", desc: "Lavabo, tuvalet, gider ve kanal tıkanıklıklarını robotla açıyoruz." },
    { before: svcCamera, after: problemCamera, icon: <Camera />, title: "Kanal Görüntüleme", desc: "Kamera ile hat içi detaylı kontrol ve sorunun kaynağını tespit." },
    { before: problemToilet, after: svcCombi, icon: <Wrench />, title: "Gömme Rezervuar Tamiri", desc: "Arızalı rezervuarları onarıyor, su kaçaklarını önlüyoruz." },
    { before: svcPipe, after: svcLeak, icon: <Droplet />, title: "Pimaş & Boru Tamiri", desc: "Kırık, çatlak ve sızıntı yapan pimaş ve boruları onarıyoruz." },
    { before: problemBoiler, after: svcCombi, icon: <Flame />, title: "Doğalgaz Kaçağı", desc: "Cihazla kaçak tespit ediyor, güvenliğinizi sağlıyoruz." },
  ];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-8">
        <SectionHeader pillIcon={<Camera className="size-3" />} pillText="GERÇEK İŞLER, GERÇEK SONUÇLAR"
          title={<>Sorunları Tespit Ediyor, <span className="text-[#ef2b2b]">Kalıcı Çözümler Üretiyoruz!</span></>}
          subtitle="Modern ekipmanlarımız ve uzman kadromuzla tüm tesisat problemlerini kalıcı olarak çözüyoruz." />

        <div className="mt-10 grid grid-cols-6 gap-4">
          {items.map((it, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-100">
              <div className="relative h-[230px]">
                <div className="grid h-full grid-cols-2">
                  <div className="relative">
                    <img src={it.before} className="h-full w-full object-cover" alt="önce" />
                    <span className="absolute left-2 top-2 rounded-md bg-[#ef2b2b] px-2 py-0.5 text-[10px] font-extrabold text-white">ÖNCE</span>
                  </div>
                  <div className="relative">
                    <img src={it.after} className="h-full w-full object-cover" alt="sonra" />
                    <span className="absolute right-2 top-2 rounded-md bg-[#22c55e] px-2 py-0.5 text-[10px] font-extrabold text-white">SONRA</span>
                  </div>
                </div>
                <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#ef2b2b] text-white shadow-lg ring-4 ring-white">
                  <ChevronRight className="size-5" />
                </span>
                <span className="absolute -bottom-6 left-1/2 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-[#0b1428] text-white shadow-lg ring-4 ring-white">
                  {it.icon}
                </span>
              </div>
              <div className="px-3 pb-4 pt-8 text-center">
                <div className="text-[14px] font-extrabold text-[#0b1428]">{it.title}</div>
                <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* features bar */}
        <div className="mt-8 grid grid-cols-5 divide-x divide-white/10 rounded-2xl bg-[#0b1428] p-6 text-white">
          <FeatBar icon={<ShieldCheck />} t="%100 Kalıcı Çözüm" s="Sorunu kökten çözüyor, tekrarlamasını önlüyoruz." />
          <FeatBar icon={<Award />} t="İşçilik ve Parça Garantisi" s="Tüm işlerimizde işçilik ve parça garantisi veriyoruz." />
          <FeatBar icon={<Clock />} t="Aynı Gün Çözüm" s="Çoğu arızaya aynı gün içinde çözüm sağlıyoruz." />
          <FeatBar icon={<Settings />} t="Modern Ekipman" s="Son teknoloji cihazlarla hızlı ve doğru tespit." />
          <FeatBar icon={<User />} t="Uzman Kadro" s="Alanında deneyimli, eğitimli ustalarımız." />
        </div>

        {/* footer cta */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <a href={`tel:${PHONE_TEL}`} className="col-span-4 flex items-center gap-3 rounded-2xl bg-[#ef2b2b] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-white/15"><Phone className="size-6" /></span>
            <div>
              <div className="text-[11px] font-bold">7/24 ACİL TESİSAT HİZMETİ</div>
              <div className="text-[20px] font-extrabold">{PHONE}</div>
              <div className="text-[10px] opacity-80">Acil durumlarda hemen arayın!</div>
            </div>
          </a>
          <a href="#" className="col-span-3 flex items-center gap-3 rounded-2xl bg-[#22c55e] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-white/20"><MessageCircle className="size-6" /></span>
            <div>
              <div className="text-[11px] font-bold">WHATSAPP'TAN YAZ</div>
              <div className="text-[14px] font-extrabold">Hızlı Destek Al</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px]">WhatsApp'a Git <ChevronRight className="size-3" /></div>
            </div>
          </a>
          <div className="col-span-5 grid grid-cols-3 items-center rounded-2xl bg-white px-6 ring-1 ring-slate-200">
            <MiniStatBig icon={<User className="size-6 text-[#ef2b2b]" />} n="10.000+" l="Mutlu Müşteri" />
            <MiniStatBig icon={<Star className="size-6 fill-[#f5b400] text-[#f5b400]" />} n="4.9/5" l="Google Puanı" star />
            <MiniStatBig icon={<Award className="size-6 text-[#ef2b2b]" />} n="25.000+" l="Tamamlanan İş" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatBar({ icon, t, s }: { icon: React.ReactNode; t: string; s: string }) {
  return (
    <div className="flex items-start gap-3 px-4">
      <span className="text-[#ef2b2b] [&>svg]:size-7">{icon}</span>
      <div>
        <div className="text-[14px] font-extrabold">{t}</div>
        <div className="mt-1 text-[11px] text-white/60">{s}</div>
      </div>
    </div>
  );
}
function MiniStatBig({ icon, n, l, star }: { icon: React.ReactNode; n: string; l: string; star?: boolean }) {
  return (
    <div className="text-center">
      <div className="mb-1 flex justify-center">{icon}</div>
      <div className="text-[20px] font-extrabold text-[#0b1428]">{n}</div>
      {star && <div className="text-[#f5b400]">★★★★★</div>}
      <div className="text-[11px] text-slate-500">{l}</div>
    </div>
  );
}

/* ---------- Section 5: SERVICE AREAS ---------- */
function ServiceAreas() {
  const eu = ["Bebek", "Nişantaşı", "Etiler", "Levent", "Zekeriyaköy", "Ulus", "Ortaköy", "Kandilli", "Tarabya", "Acarkent", "Kemerburgaz", "Sarıyer", "Beşiktaş", "Şişli", "Eyüpsultan", "Fatih", "Göktürk", "Zeytinburnu", "Kağıthane", "Güngören", "Gaziosmanpaşa", "Beyoğlu", "Bayrampaşa", "Mahmutlar", "Bakırköy", "Bahçelievler", "Bağcılar"];
  const as = ["Kadıköy", "Moda", "Fikirtepe", "Erenköy", "Göztepe", "Üsküdar", "Çengelköy", "Kuzguncuk", "Kanlıca", "Varıkent", "Bağdat Caddesi", "Caddebostan", "Maltepe", "Ataşehir", "Ümraniye", "Kartal", "Pendik", "Tuzla"];
  return (
    <section className="bg-[#f6f8fb] py-16">
      <div className="mx-auto max-w-[1400px] px-8">
        <SectionHeader pillIcon={<MapPin className="size-3" />} pillText="HİZMET BÖLGELERİMİZ"
          title={<>İstanbul'un Her Noktasına <span className="text-[#ef2b2b]">Hızlı Ulaşıyoruz!</span></>}
          subtitle="Avrupa ve Anadolu Yakası'nın tüm semtlerinde 30 dakikada adresinizdeyiz." />

        {/* features bar */}
        <div className="mx-auto mt-8 grid max-w-[900px] grid-cols-4 divide-x divide-slate-200 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
          <SmallFeat icon={<Clock className="size-6 text-[#ef2b2b]" />} t="30 DAKİKADA" s="Hızlı Ulaşım" />
          <SmallFeat icon={<MapPin className="size-6 text-[#0b1428]" />} t="TÜM SEMTLERE" s="Kesintisiz Hizmet" />
          <SmallFeat icon={<Headphones className="size-6 text-[#ef2b2b]" />} t="7/24" s="Acil Destek" />
          <SmallFeat icon={<ShieldCheck className="size-6 text-[#0b1428]" />} t="YEREL USTALAR" s="Bölgenize En Yakın Ekip" />
        </div>

        <div className="mt-8 grid grid-cols-12 gap-5">
          {/* Europe */}
          <div className="col-span-4 rounded-2xl bg-white p-5 ring-1 ring-slate-100">
            <div className="mx-auto mb-4 w-fit rounded-full bg-[#0b1428] px-5 py-1.5 text-[12px] font-extrabold tracking-wider text-white">AVRUPA YAKASI</div>
            <div className="grid grid-cols-3 gap-3">
              {eu.map((n, i) => <AreaTile key={i} name={n} />)}
            </div>
          </div>
          {/* Map center */}
          <div className="col-span-4 relative rounded-2xl bg-gradient-to-b from-[#dbeafe] to-[#eff6ff] p-5 ring-1 ring-slate-100">
            <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-xl bg-[#0b1428] px-4 py-2 text-white shadow">
              <Clock className="size-5 text-[#ef2b2b]" />
              <div className="text-[13px] font-extrabold leading-tight">30 DAKİKADA<br /><span className="text-[11px] font-bold text-[#ef2b2b]">KAPINIZDAYIZ!</span></div>
            </div>
            <div className="relative h-[330px] rounded-xl bg-white/40">
              <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4 text-[12px] font-extrabold text-[#0b1428]/40">
                <div className="grid place-items-center">AVRUPA<br />YAKASI</div>
                <div className="grid place-items-center">ANADOLU<br />YAKASI</div>
              </div>
              <img src={serviceVan} className="absolute left-4 top-1/2 h-16 w-24 -translate-y-1/2 rounded object-cover shadow-lg" alt="" />
              <img src={serviceVan} className="absolute right-4 top-1/2 h-16 w-24 -translate-y-1/2 rounded object-cover shadow-lg" alt="" />
            </div>
            <div className="mt-3 rounded-xl bg-white p-3 text-center shadow ring-1 ring-slate-100">
              <div className="flex items-center justify-center gap-2">
                <Phone className="size-4 text-[#ef2b2b]" />
                <span className="text-[12px] font-bold text-[#0b1428]">NEREDE OLURSANIZ OLUN</span>
              </div>
              <div className="text-[14px] font-extrabold text-[#ef2b2b]">BİR TELEFON KADAR YAKINIZ!</div>
            </div>
          </div>
          {/* Asian */}
          <div className="col-span-4 rounded-2xl bg-white p-5 ring-1 ring-slate-100">
            <div className="mx-auto mb-4 w-fit rounded-full bg-[#ef2b2b] px-5 py-1.5 text-[12px] font-extrabold tracking-wider text-white">ANADOLU YAKASI</div>
            <div className="grid grid-cols-3 gap-3">
              {as.map((n, i) => <AreaTile key={i} name={n} />)}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 ring-1 ring-slate-100">
          <span className="grid size-9 place-items-center rounded-full bg-[#0b1428] text-white"><MapPin className="size-5" /></span>
          <p className="text-[13px] text-slate-600"><b>Eviniz, iş yeriniz veya projeniz</b> nerede olursa olsun, en yakın ekibimiz en kısa sürede yanınızda!</p>
        </div>

        {/* CTA */}
        <div className="mt-5 grid grid-cols-12 gap-4">
          <a href={`tel:${PHONE_TEL}`} className="col-span-4 flex items-center gap-3 rounded-2xl bg-[#0b1428] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-[#ef2b2b]"><Phone className="size-6" /></span>
            <div>
              <div className="text-[11px] font-bold">7/24 ACİL TESİSAT HİZMETİ</div>
              <div className="text-[20px] font-extrabold">{PHONE}</div>
              <div className="text-[10px] opacity-80">Acil durumlarda hemen arayın!</div>
            </div>
          </a>
          <a href="#" className="col-span-3 flex items-center gap-3 rounded-2xl bg-[#22c55e] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-white/20"><MessageCircle className="size-6" /></span>
            <div>
              <div className="text-[11px] font-bold">WHATSAPP'TAN YAZ</div>
              <div className="text-[14px] font-extrabold">Hızlı Destek Al</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px]">WhatsApp'a Git <ChevronRight className="size-3" /></div>
            </div>
          </a>
          <div className="col-span-5 flex items-center gap-3 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            <span className="grid size-12 place-items-center rounded-full bg-[#ef2b2b]/10"><MapPin className="size-6 text-[#ef2b2b]" /></span>
            <div className="flex-1">
              <div className="text-[14px] font-extrabold text-[#0b1428]">TÜM İSTANBUL'DA HİZMETİNİZDEYİZ</div>
              <div className="text-[12px] text-slate-500">Profesyonel ekibimiz ve donanımlı araçlarımızla 7/24 kesintisiz hizmet sunuyoruz.</div>
            </div>
            <img src={serviceVan} className="h-14 w-20 rounded object-cover" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SmallFeat({ icon, t, s }: { icon: React.ReactNode; t: string; s: string }) {
  return (
    <div className="flex items-center justify-center gap-3 px-3">
      {icon}
      <div className="text-left leading-tight">
        <div className="text-[12px] font-extrabold text-[#0b1428]">{t}</div>
        <div className="text-[11px] text-slate-500">{s}</div>
      </div>
    </div>
  );
}
function AreaTile({ name }: { name: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#f6f8fb] ring-1 ring-slate-100">
      <div className="h-12 w-full bg-gradient-to-br from-slate-300 to-slate-400" />
      <div className="p-2">
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-[#0b1428]"><MapPin className="size-3 text-[#ef2b2b]" />{name}</div>
        <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500"><Clock className="size-3" />30 Dakikada</div>
      </div>
    </div>
  );
}

/* ---------- Section 6: ABOUT / TEAM ---------- */
function About() {
  const team = [
    { img: techMehmet, name: "Murat G.", role: "Kurucu / Tesisat Ustası", years: "15+ Yıl Deneyim" },
    { img: techAhmet, name: "Faruk A.", role: "Kombi Uzmanı", years: "10+ Yıl Deneyim" },
    { img: techEmre, name: "Emre K.", role: "Su Kaçağı Uzmanı", years: "8+ Yıl Deneyim" },
    { img: techHasan, name: "Seda Y.", role: "Müşteri İletişim", years: "7/24 Destek" },
    { img: technician, name: "Ali T.", role: "Kanal Görüntüleme Uzmanı", years: "12+ Yıl Deneyim" },
  ];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ef2b2b]/30 bg-white px-4 py-1.5 text-[11px] font-extrabold text-[#0b1428] shadow-sm">
            <ShieldCheck className="size-4 text-[#ef2b2b]" /> HAKKIMIZDA
          </span>
          <h2 className="mt-4 text-[44px] font-black text-[#0b1428]">Biz Kimiz? <span className="text-[#ef2b2b]">Sizin İçin Buradayız!</span></h2>
          <p className="mx-auto mt-3 max-w-[800px] text-[14px] text-slate-500">Gölge Tesisat olarak misyonumuz; modern teknoloji, uzman kadro ve müşteri odaklı hizmet anlayışıyla yaşam alanlarınızı daha güvenli ve konforlu hale getirmektir.</p>
        </div>

        <div className="mt-8 grid grid-cols-4 gap-4">
          <ValueCard icon={<Target className="size-7 text-[#ef2b2b]" />} t="MİSYONUMUZ" d="Kaliteli, hızlı ve güvenilir tesisat çözümleri sunmak." />
          <ValueCard icon={<Eye className="size-7 text-white" />} dark t="VİZYONUMUZ" d="Tesisat sektöründe Türkiye'nin en çok tercih edilen firması olmak." />
          <ValueCard icon={<Users className="size-7 text-[#ef2b2b]" />} t="MÜŞTERİ ODAKLILIK" d="İhtiyaçlarınızı önemsiyor, size özel çözümler üretiyoruz." />
          <ValueCard icon={<Handshake className="size-7 text-white" />} dark t="GÜVEN & ŞEFFAFLIK" d="Dürüst hizmet anlayışıyla güveninizi kazanıyoruz." />
        </div>

        <div className="mt-8 grid grid-cols-12 gap-5">
          <div className="col-span-8 rounded-2xl bg-white p-6 ring-1 ring-slate-100">
            <div className="text-[16px] font-extrabold text-[#0b1428]">UZMAN KADROMUZ</div>
            <p className="text-[12px] text-slate-500">Alanında deneyimli, eğitimli ve sertifikalı ekibimizle her zaman yanınızdayız.</p>
            <div className="mt-5 grid grid-cols-5 gap-4">
              {team.map((t, i) => (
                <div key={i} className="text-center">
                  <img src={t.img} alt={t.name} className="mx-auto h-32 w-full rounded-xl object-cover ring-1 ring-slate-200" />
                  <div className="mt-2 text-[13px] font-extrabold text-[#0b1428]">{t.name}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                  <div className="mt-1 inline-block rounded-full bg-[#ef2b2b]/10 px-2 py-0.5 text-[10px] font-bold text-[#ef2b2b]">{t.years}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 rounded-2xl bg-[#0b1428] p-6 text-white">
            <div className="text-[16px] font-extrabold">NEDEN BİZ?</div>
            <ul className="mt-3 space-y-2 text-[13px]">
              {["Hızlı ve zamanında hizmet", "Uzman ve sertifikalı kadro", "Gelişmiş teknoloji ve ekipman", "Uygun fiyat, yüksek kalite", "İşçilik ve parça garantisi", "7/24 kesintisiz destek"].map((t, i) => (
                <li key={i} className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-full bg-[#ef2b2b]"><Check className="size-3" /></span>{t}</li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
              <img src={logoImg} className="h-12 w-12" alt="" />
              <div>
                <div className="text-[14px] font-extrabold">GÖLGE TESİSAT</div>
                <div className="text-[11px] text-white/70">Güvenilir. Hızlı. Garantili.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats banner */}
        <div className="mt-6 grid grid-cols-6 divide-x divide-white/10 rounded-2xl bg-[#0b1428] p-6 text-white">
          <BigStat icon={<Users className="size-6 text-[#ef2b2b]" />} n="10.000+" l="Mutlu Müşteri" star />
          <BigStat icon={<Calendar className="size-6 text-[#ef2b2b]" />} n="15+ YIL" l="Sektör Deneyimi" />
          <BigStat icon={<FileText className="size-6 text-[#ef2b2b]" />} n="50.000+" l="Tamamlanan Hizmet" />
          <BigStat icon={<MapPin className="size-6 text-[#ef2b2b]" />} n="İSTANBUL'UN" l="Tüm Semtlerinde Hizmet" />
          <BigStat icon={<Clock className="size-6 text-[#ef2b2b]" />} n="7/24" l="Kesintisiz Destek" />
          <BigStat icon={<ShieldCheck className="size-6 text-[#ef2b2b]" />} n="%100" l="Müşteri Memnuniyeti" />
        </div>
      </div>
    </section>
  );
}

function ValueCard({ icon, t, d, dark = false }: { icon: React.ReactNode; t: string; d: string; dark?: boolean }) {
  return (
    <div className={`flex items-start gap-4 rounded-2xl p-5 ring-1 ${dark ? "bg-[#0b1428] text-white ring-[#0b1428]" : "bg-white ring-slate-100"}`}>
      <div className={`grid size-14 shrink-0 place-items-center rounded-full ${dark ? "bg-[#ef2b2b]/20" : "bg-[#ef2b2b]/10"}`}>{icon}</div>
      <div>
        <div className={`text-[14px] font-extrabold ${dark ? "text-white" : "text-[#0b1428]"}`}>{t}</div>
        <p className={`mt-1 text-[12px] ${dark ? "text-white/70" : "text-slate-500"}`}>{d}</p>
      </div>
    </div>
  );
}
function BigStat({ icon, n, l, star }: { icon: React.ReactNode; n: string; l: string; star?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-4">
      {icon}
      <div>
        <div className="text-[18px] font-extrabold">{n}</div>
        <div className="text-[11px] text-white/70">{l}</div>
        {star && <div className="text-[12px] text-[#f5b400]">★★★★★</div>}
      </div>
    </div>
  );
}

/* ---------- Section 7: PROCESS + REVIEWS ---------- */
function ProcessReviews() {
  const reviews = [
    { img: techMehmet, name: "Mehmet D.", city: "Kadıköy", text: "Gece su kaçağım oldu, yarım saatte geldiler ve sorunu çözdüler. Gerçekten profesyonel ve ilgili bir ekip. Gölge Tesisat'a teşekkürler!" },
    { img: techHasan, name: "Seda K.", city: "Üsküdar", text: "Kombi bakımını yaptırdık, çok memnun kaldık. Hem fiyat hem hizmet kalitesi mükemmel. Gönül rahatlığıyla tercih edebilirsiniz." },
    { img: techEmre, name: "Ali Y.", city: "Bakırköy", text: "Tıkanıklık sorunumuz vardı, hızlı geldiler ve sorunu kısa sürede çözdüler. Ekip çok nazik ve işini iyi yapıyor." },
    { img: techAhmet, name: "Hülya T.", city: "Şişli", text: "Petek temizliği için geldiler, evimiz çok daha iyi ısınmaya başladı. İşlerinde gerçekten uzmanlar." },
  ];
  const steps = [
    { n: 1, icon: <Phone />, t: "İletişime Geçin", d: "Bizi arayın veya WhatsApp'tan yazın." },
    { n: 2, icon: <Calendar />, t: "Randevu Oluşturalım", d: "Size uygun gün ve saat için randevu oluşturalım." },
    { n: 3, icon: <User />, t: "Uzmanımız Gelsin", d: "Uzman ekibimiz adresinize gelsin." },
    { n: 4, icon: <Search />, t: "Tespiti Yapalım", d: "Sorunu tespit edelim, çözüm ve fiyat sunalım." },
    { n: 5, icon: <Wrench />, t: "Çözümü Uygulayalım", d: "Onayınızla birlikte hızlıca çözümü uygulayalım." },
    { n: 6, icon: <ShieldCheck />, t: "Kontrol & Garanti", d: "Kontrol edelim, garanti belgenizi verelim." },
  ];
  return (
    <section className="bg-[#f6f8fb] py-16">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ef2b2b]/30 bg-white px-4 py-1.5 text-[11px] font-extrabold text-[#0b1428] shadow-sm">
            <Star className="size-4 fill-[#ef2b2b] text-[#ef2b2b]" /> SİZİN İÇİN BURADAYIZ
          </span>
          <h2 className="mt-4 text-[40px] font-black text-[#0b1428]">Her An Yanınızdayız, <span className="text-[#ef2b2b]">Her Soruna Çözüm Üretiyoruz!</span></h2>
          <p className="mx-auto mt-3 max-w-[820px] text-[14px] text-slate-500">Gölge Tesisat olarak satış öncesi, satış sonrası ve <b>7/24</b> teknik destek hizmetlerimizle daima yanınızdayız.</p>
        </div>

        {/* feature row */}
        <div className="mt-8 grid grid-cols-5 gap-3">
          {[
            { icon: <Headphones className="size-7 text-white" />, bg: "bg-[#0b1428]", t: "7/24 Teknik Destek", s: "Acil durumlarda daima ulaşılabiliriz." },
            { icon: <Calendar className="size-7 text-white" />, bg: "bg-[#ef2b2b]", t: "Hızlı Randevu", s: "İhtiyacınıza uygun hızlı randevu imkanı." },
            { icon: <ShieldCheck className="size-7 text-white" />, bg: "bg-[#0b1428]", t: "Yerinde Keşif", s: "Uzman ekibimizle yerinde keşif hizmeti." },
            { icon: <FileText className="size-7 text-white" />, bg: "bg-[#ef2b2b]", t: "Şeffaf Raporlama", s: "Yapılan işlemler ve maliyetler şeffaf raporlanır." },
            { icon: <ThumbsUp className="size-7 text-white" />, bg: "bg-[#0b1428]", t: "%100 Memnuniyet", s: "Müşteri memnuniyeti bizim önceliğimizdir." },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-slate-100">
              <div className={`grid size-12 place-items-center rounded-full ${f.bg}`}>{f.icon}</div>
              <div>
                <div className="text-[13px] font-extrabold text-[#0b1428]">{f.t}</div>
                <div className="text-[11px] text-slate-500">{f.s}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-100">
          <div className="text-center text-[12px] font-extrabold tracking-[0.3em] text-[#0b1428]">— HİZMET ALMA SÜRECİMİZ —</div>
          <div className="mt-6 grid grid-cols-11 items-start gap-1">
            {steps.map((s, i) => (
              <Fragment key={s.n}>
                <div className="col-span-1 text-center">
                  <div className="relative mx-auto grid size-16 place-items-center rounded-full bg-[#f6f8fb] text-[#0b1428] ring-1 ring-slate-200">
                    {s.icon}
                    <span className="absolute -right-1 -top-1 grid size-6 place-items-center rounded-full bg-[#ef2b2b] text-[10px] font-extrabold text-white">{s.n}</span>
                  </div>
                  <div className="mt-2 text-[12px] font-extrabold text-[#0b1428]">{s.t}</div>
                  <div className="mt-1 text-[10px] text-slate-500">{s.d}</div>
                </div>
                {i < steps.length - 1 && (
                  <div className="col-span-1 grid h-16 place-items-center text-slate-300">
                    <ChevronRight className="size-6" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-slate-100">
          <div className="text-center text-[12px] font-extrabold tracking-[0.3em] text-[#0b1428]">— MÜŞTERİLERİMİZ NE DİYOR? —</div>
          <div className="mt-5 grid grid-cols-4 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-100 p-4">
                <div className="flex items-start gap-3">
                  <img src={r.img} className="size-12 rounded-full object-cover" alt="" />
                  <div>
                    <div className="text-[#f5b400]">★★★★★</div>
                    <p className="mt-1 text-[11px] leading-relaxed text-slate-600">{r.text}</p>
                  </div>
                </div>
                <div className="mt-3 text-right text-[12px]">
                  <span className="font-extrabold text-[#ef2b2b]">{r.name}</span>{" "}
                  <span className="text-slate-400">• {r.city}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="size-2 rounded-full bg-[#ef2b2b]" />
            <span className="size-2 rounded-full bg-slate-300" />
            <span className="size-2 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-6 grid grid-cols-12 overflow-hidden rounded-2xl shadow-md">
          <a href={`tel:${PHONE_TEL}`} className="col-span-3 flex items-center gap-3 bg-[#0b1428] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-white/10"><Phone className="size-6" /></span>
            <div>
              <div className="text-[10px] font-bold">ACİL TESİSATÇI MI ARIYORSUNUZ?</div>
              <div className="text-[18px] font-extrabold">{PHONE}</div>
              <div className="text-[10px] font-bold text-[#ef2b2b]">7/24 ACİL TESİSAT HİZMETİ</div>
            </div>
          </a>
          <a href="#" className="col-span-3 flex items-center gap-3 bg-[#22c55e] p-5 text-white">
            <span className="grid size-12 place-items-center rounded-full bg-white/20"><MessageCircle className="size-6" /></span>
            <div>
              <div className="text-[10px] font-bold">WHATSAPP'TAN HEMEN YAZIN!</div>
              <div className="text-[14px] font-extrabold">Hızlı Destek Alın</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[10px]">WhatsApp'a Git <ChevronRight className="size-3" /></div>
            </div>
          </a>
          <div className="col-span-3 flex items-center gap-3 bg-white p-5">
            <span className="grid size-12 place-items-center rounded-full bg-slate-100"><Truck className="size-6 text-[#0b1428]" /></span>
            <div>
              <div className="text-[14px] font-extrabold text-[#0b1428]">AYNI GÜN HİZMET İMKANI</div>
              <div className="text-[11px] text-slate-500">Aynı gün içinde çözüm ulaştırıyoruz.</div>
            </div>
          </div>
          <div className="col-span-3 flex items-center gap-3 bg-white p-5 ring-1 ring-slate-100">
            <img src={logoImg} className="h-12 w-12" alt="" />
            <div className="flex-1">
              <div className="text-[14px] font-extrabold text-[#0b1428]">GÖLGE TESİSAT</div>
              <div className="text-[11px] text-slate-500">Güvenilir. Hızlı. Garantili.</div>
              <div className="mt-1 flex gap-2">
                <Facebook className="size-4 text-[#0b1428]" />
                <Instagram className="size-4 text-[#0b1428]" />
                <Globe className="size-4 text-[#0b1428]" />
                <User className="size-4 text-[#0b1428]" />
              </div>
            </div>
          </div>
        </div>

        {/* contact strip */}
        <div className="mt-2 grid grid-cols-3 rounded-2xl bg-[#0b1428] p-4 text-white">
          <div className="flex items-center gap-2 px-4"><Globe className="size-4" /><span className="text-[12px]">www.golgetesisat.com</span></div>
          <div className="flex items-center gap-2 px-4"><Mail className="size-4" /><span className="text-[12px]">info@golgetesisat.com</span></div>
          <div className="flex items-center gap-2 px-4"><MapPin className="size-4 text-[#ef2b2b]" /><span className="text-[12px]">İstanbul'un tüm semtlerinde hizmetinizdeyiz!</span></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Section 8: FAQ + CONTACT ---------- */
function FaqContact() {
  const faqs = [
    { q: "Tesisat sorunlarına ne kadar sürede müdahale ediyorsunuz?", a: "İstanbul'un tüm semtlerine 7/24 hizmet veriyoruz. Ortalama 30 dakika içinde adresinizde oluyoruz.", open: true },
    { q: "Kanal açma işlemi sırasında kırma-dökme yapıyor musunuz?" },
    { q: "Yaptığınız işlemler garantili mi?" },
    { q: "Ödeme seçenekleriniz nelerdir?" },
    { q: "Gece veya hafta sonu hizmet ücretleri farklı mı?" },
  ];
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1400px] px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ef2b2b]/30 bg-white px-4 py-1.5 text-[11px] font-extrabold text-[#0b1428] shadow-sm">
            <span className="grid size-5 place-items-center rounded-full bg-[#ef2b2b] text-white">?</span> SIK SORULAN SORULAR
          </span>
          <h2 className="mt-4 text-[44px] font-black text-[#0b1428]">Merak Ettiklerinizin <span className="text-[#ef2b2b]">Cevapları Burada!</span></h2>
          <p className="mx-auto mt-3 max-w-[760px] text-[14px] text-slate-500">En çok sorulan sorulara hızlıca göz atın, aklınıza takılanları öğrenin.</p>
        </div>

        <div className="mt-8 grid grid-cols-12 gap-5">
          <div className="col-span-7 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className={`rounded-xl bg-white p-4 ring-1 transition ${f.open ? "ring-[#ef2b2b]/40 shadow-sm" : "ring-slate-200"}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid size-8 place-items-center rounded-full ${f.open ? "bg-[#ef2b2b] text-white" : "bg-[#0b1428] text-white"}`}>?</span>
                  <div className="flex-1 text-[13px] font-extrabold text-[#0b1428]">{f.q}</div>
                  <ChevronDown className={`size-5 ${f.open ? "rotate-180 text-[#ef2b2b]" : "text-slate-400"}`} />
                </div>
                {f.open && f.a && <p className="mt-2 pl-11 text-[12px] text-slate-600">{f.a}</p>}
              </div>
            ))}
          </div>
          <div className="relative col-span-5 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1428] to-[#13234a] p-6 text-white">
            <h3 className="text-[22px] font-extrabold leading-tight">7/24 Hazır Ekibimizle<br /><span>Hizmetinizdeyiz!</span></h3>
            <p className="mt-2 text-[12px] text-white/70">Tesisat problemlerinde zaman kaybetmeyin. Bizi arayın, profesyonel ekibimiz sorununuzu hemen çözelim!</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
              {[
                { icon: <Users className="size-4" />, t: "Deneyimli & Uzman", s: "Kadromuz" },
                { icon: <Settings className="size-4" />, t: "Son Teknoloji", s: "Ekipmanlar" },
                { icon: <Clock className="size-4" />, t: "Hızlı & Güvenilir", s: "Çözüm" },
                { icon: <Wallet className="size-4" />, t: "Uygun Fiyat,", s: "Yüksek Kalite" },
              ].map((x, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="grid size-7 place-items-center rounded-full border border-[#ef2b2b]/40 text-[#ef2b2b]">{x.icon}</span>
                  <div><div className="font-extrabold">{x.t}</div><div className="text-white/70">{x.s}</div></div>
                </div>
              ))}
            </div>
            <img src={technician} className="absolute -right-6 bottom-0 h-[230px] w-[200px] rounded-l-2xl object-cover opacity-90" alt="" />
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-6 grid grid-cols-12 items-center gap-4 rounded-2xl bg-[#0b1428] p-5 text-white">
          <div className="col-span-4 flex items-center gap-3">
            <span className="grid size-14 place-items-center rounded-full bg-[#ef2b2b]"><Phone className="size-7" /></span>
            <div>
              <div className="text-[11px] font-bold text-[#ef2b2b]">HEMEN ARAYIN</div>
              <div className="text-[26px] font-extrabold">{PHONE}</div>
              <div className="mt-0.5 inline-block rounded bg-[#ef2b2b] px-2 py-0.5 text-[10px] font-extrabold">7/24 ACİL TESİSAT HİZMETİ</div>
            </div>
          </div>
          <div className="col-span-3 flex items-center gap-3 border-l border-white/10 pl-5">
            <span className="grid size-14 place-items-center rounded-full bg-[#22c55e]"><MessageCircle className="size-7" /></span>
            <div>
              <div className="text-[11px] font-bold text-[#22c55e]">WHATSAPP'TAN YAZIN</div>
              <div className="text-[16px] font-extrabold">Hızlı Destek Alın!</div>
              <a className="mt-1 inline-flex items-center gap-1 rounded bg-[#22c55e] px-2 py-0.5 text-[10px] font-extrabold text-white">WhatsApp'a Git <ChevronRight className="size-3" /></a>
            </div>
          </div>
          <div className="col-span-5 grid grid-cols-3 divide-x divide-white/10">
            <div className="px-3 text-center"><Clock className="mx-auto size-6 text-[#ef2b2b]" /><div className="mt-1 text-[14px] font-extrabold">30 DAKİKADA</div><div className="text-[11px] text-white/60">Adresteyiz</div></div>
            <div className="px-3 text-center"><Calendar className="mx-auto size-6 text-[#ef2b2b]" /><div className="mt-1 text-[14px] font-extrabold">7/24</div><div className="text-[11px] text-white/60">Kesintisiz Hizmet</div></div>
            <div className="px-3 text-center"><ShieldCheck className="mx-auto size-6 text-[#ef2b2b]" /><div className="mt-1 text-[14px] font-extrabold">%100</div><div className="text-[11px] text-white/60">Müşteri Memnuniyeti</div></div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-5 grid grid-cols-12 gap-4 rounded-2xl bg-[#f6f8fb] p-5 ring-1 ring-slate-100">
          <div className="col-span-3">
            <div className="text-[20px] font-extrabold text-[#0b1428]">Gölge Tesisat ile</div>
            <div className="text-[20px] font-extrabold text-[#ef2b2b]">Güvendesiniz!</div>
            <p className="mt-2 text-[12px] text-slate-500">Kaliteli hizmet, uygun fiyat ve garanti ile içiniz rahat olsun.</p>
          </div>
          <div className="col-span-9 grid grid-cols-5 gap-4">
            {[
              { icon: <Award className="size-7 text-[#ef2b2b]" />, t: "%100 İşçilik ve Parça Garantisi", s: "Tüm işlerimiz garanti kapsamındadır." },
              { icon: <FileText className="size-7 text-[#ef2b2b]" />, t: "Şeffaf Fiyat Politikası", s: "İş öncesi net fiyat, sürpriz ödeme yok." },
              { icon: <User className="size-7 text-[#0b1428]" />, t: "Uzman ve Sertifikalı Ekip", s: "Alanında deneyimli ustalarımızla hizmet." },
              { icon: <ShieldCheck className="size-7 text-[#0b1428]" />, t: "Güvenli ve Kalıcı Çözümler", s: "Sorunları kökten çözer, tekrarını önleriz." },
              { icon: <ThumbsUp className="size-7 text-[#ef2b2b]" />, t: "Müşteri Odaklı Yaklaşım", s: "Sizin memnuniyetiniz en büyük önceliğimiz." },
            ].map((x, i) => (
              <div key={i} className="flex flex-col gap-1">
                {x.icon}
                <div className="text-[12px] font-extrabold text-[#0b1428]">{x.t}</div>
                <div className="text-[10px] text-slate-500">{x.s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Thanks */}
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#f6f8fb] px-6 py-5 ring-1 ring-slate-100">
          <div className="flex items-center gap-3">
            <Heart className="size-7 text-[#0b1428]" />
            <div>
              <div className="text-[16px] font-extrabold text-[#0b1428]">Tesisat problemlerinizde doğru adres <span className="text-[#ef2b2b]">Gölge Tesisat</span>.</div>
              <div className="text-[12px] text-slate-500">Hızlı, güvenilir ve kalıcı çözümler için her zaman yanınızdayız!</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[#ef2b2b]">
            <span className="font-cursive text-[28px] italic" style={{ fontFamily: "cursive" }}>Teşekkürler!</span>
            <Smile className="size-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Responsive scale wrapper ----------
   Preserves the exact 1400px desktop layout while shrinking it to fit any
   viewport (tablets/phones). Scales transform-origin top-left and adjusts
   the outer height so layout flow stays correct. */
function ResponsiveDesktopWrapper({ children }: { children: React.ReactNode }) {
  const DESKTOP_WIDTH = 1400;
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const s = w >= DESKTOP_WIDTH ? 1 : w / DESKTOP_WIDTH;
      setScale(s);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    if (!innerRef.current) return;
    const el = innerRef.current;
    const update = () => setHeight(el.offsetHeight * scale);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scale]);

  return (
    <div style={{ width: "100%", height, overflow: "hidden" }}>
      <div
        ref={innerRef}
        style={{
          width: DESKTOP_WIDTH,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
function DesktopView() {
  return (
    <ResponsiveDesktopWrapper>
      <main className="min-h-screen bg-white font-display antialiased">
        <Hero />
        <ServicesGrid />
        <WhyUs />
        <BeforeAfter />
        <ServiceAreas />
        <About />
        <ProcessReviews />
        <FaqContact />
      </main>
    </ResponsiveDesktopWrapper>
  );
}

/* tiny shim for missing icon import */
function Wallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0 0 4h16v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5" />
      <circle cx="17" cy="13" r="1.5" />
    </svg>
  );
}
