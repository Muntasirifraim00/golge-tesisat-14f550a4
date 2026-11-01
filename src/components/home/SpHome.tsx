import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Calendar, Camera, Check, ChevronDown, Droplet, Flame, Gauge, MapPin,
  Menu, MessageCircle, Phone, ShieldCheck, ShowerHead, Star, Thermometer, Truck, Wrench, X, Clock, Award, FileCheck,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import vanImg from "@/assets/golge-tesisat-van.jpg";
import svcLeak from "@/assets/svc-leak.jpg";
import svcClog from "@/assets/svc-clog.jpg";
import svcCombi from "@/assets/svc-combi.jpg";
import svcRadiator from "@/assets/svc-radiator.jpg";
import svcPipe from "@/assets/svc-pipe.jpg";
import svcCamera from "@/assets/svc-camera.jpg";
import cfLeakBefore from "@/assets/casefiles/istanbul-su-kacagi-onarim-oncesi.jpg";
import cfLeakAfter from "@/assets/casefiles/istanbul-su-kacagi-onarim-sonrasi.jpg";
import cfRadiatorBefore from "@/assets/casefiles/istanbul-petek-temizligi-oncesi.jpg";
import cfRadiatorAfter from "@/assets/casefiles/istanbul-petek-temizligi-sonrasi.jpg";
import cfBoilerBefore from "@/assets/casefiles/istanbul-kombi-tamiri-oncesi.jpg";
import cfBoilerAfter from "@/assets/casefiles/istanbul-kombi-tamiri-sonrasi.jpg";
import brandHousing from "@/assets/brands/golge-tesisat-konut-sitesi-tesisat.jpg";
import brandInsurance from "@/assets/brands/golge-tesisat-sigorta-hasar-tesisat.jpg";
import brandRealEstate from "@/assets/brands/golge-tesisat-emlak-tesisat.jpg";
import brandPublic from "@/assets/brands/golge-tesisat-kamu-binasi-tesisat.jpg";
import teamBekir from "@/assets/team/bekir-usta.jpg";
import teamCemil from "@/assets/team/cemil-usta.jpg";
import teamEmin from "@/assets/team/emin-usta.jpg";
import teamHasan from "@/assets/team/hasan-usta.jpg";
import liveBath from "@/assets/live-bathroom-breakout.jpg";
import liveBoiler from "@/assets/live-boiler-wiring.jpg";
import liveCeiling from "@/assets/live-ceiling-access.jpg";
import liveFloor from "@/assets/live-floor-protection.jpg";
import liveGas from "@/assets/live-gas-line-excavation.jpg";
import livePrep from "@/assets/live-jobsite-prep.jpg";
import { ProblemShowcase } from "@/components/ProblemShowcase";
import { SERVICES, type ServiceIcon } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import { FEATURED_POSTS } from "@/data/featured-posts";
import { buildReviews } from "@/data/reviews";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

const ICONS: Record<ServiceIcon, typeof Droplet> = {
  leak: Droplet, clog: Wrench, combi: Flame, radiator: Thermometer, gas: Gauge,
  camera: Camera, shower: ShowerHead, faucet: Droplet, pump: Gauge,
};
const SVC_IMG: Record<string, string> = {
  "su-kacagi-tespiti": svcLeak, "tikaniklik-acma": svcClog, "kombi-servisi": svcCombi,
  "petek-temizligi": svcRadiator, "kanal-goruntuleme": svcCamera,
};

export const HOME_FAQ = [
  { q: "İstanbul'da 7/24 acil tesisatçı hizmeti veriyor musunuz?", a: "Evet, İstanbul Anadolu ve Avrupa yakasında 7/24 acil tesisatçı hizmeti sunuyoruz. Ortalama 30 dakika içinde adresinizdeyiz." },
  { q: "Su kaçağı tespiti ne kadar sürer?", a: "Termal kamera ve akustik cihazlarla noktasal su kaçağı tespiti ortalama 30-60 dakika sürer; kırma-dökme yapılmadan tespit edilir." },
  { q: "Fiyat teklifi ücretsiz mi?", a: "Evet, keşif ve fiyat teklifi tamamen ücretsizdir. Onayınız olmadan işlem başlatılmaz." },
  { q: "Yapılan işe garanti veriyor musunuz?", a: "Evet, işçilik ve parça için 2 yıl yazılı garanti veriyoruz." },
];

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`sp-mono flex items-center gap-2 text-[10px] ${light ? "opacity-70" : "text-[var(--sp-red)]"}`}>
      <span className="h-0.5 w-6 bg-[var(--sp-red)]" /> {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/hizmetler", label: "Hizmetler" },
    { to: "/tesisatci", label: "Bölgeler" },
    { to: "/blog", label: "Blog" },
    { to: "/randevu", label: "Randevu" },
  ] as const;
  return (
    <>
      <div className="sp-btn-ink sp-mono flex items-center justify-between px-4 py-2 text-[10px]">
        <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-[var(--sp-green)]" /> 7/24 Acil Müdahale</span>
        <span className="text-[var(--sp-green)]">Ekip sahada · İstanbul</span>
      </div>
      <header className="sticky top-0 z-40 border-b border-[var(--sp-line)] bg-[var(--sp-paper)]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Gölge Tesisat logo" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
            <div className="sp-display text-[20px] leading-[.85]">GÖLGE<br /><span className="text-[var(--sp-red)]">TESİSAT</span></div>
          </Link>
          <nav className="hidden items-center gap-7 text-[14px] font-semibold md:flex">
            {nav.map((n) => <Link key={n.to} to={n.to} className="hover:text-[var(--sp-red)]">{n.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2">
            <a href={PHONE_HREF} aria-label="Ara" className="sp-btn-red flex h-11 items-center gap-2 rounded-xl px-3 text-[13px] font-bold">
              <Phone className="h-4 w-4" /> <span className="hidden md:inline">{PHONE}</span>
            </a>
            <button onClick={() => setOpen(!open)} aria-label="Menü" aria-expanded={open} className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--sp-line)] md:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-[var(--sp-line)] px-4 py-3 md:hidden">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="sp-display flex items-center justify-between border-b border-[var(--sp-line)] py-3 text-[24px] last:border-0">
                {n.label} <ArrowRight className="h-5 w-5 text-[var(--sp-red)]" />
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-10 pt-6 md:grid md:grid-cols-2 md:items-center md:gap-10 md:pt-12">
      <div>
        <div className="flex w-fit items-center gap-2 rounded-full border border-[var(--sp-line)] bg-[var(--sp-paper)] py-1 pl-1 pr-3 text-[12px] font-semibold">
          <span className="sp-btn-red sp-mono rounded-full px-2 py-0.5 text-[9px]">● CANLI</span> 7/24 Acil Müdahale
        </div>
        <div className="mt-5"><Eyebrow>Acil tesisat · Sorunlarınıza</Eyebrow></div>
        <h1 className="sp-display mt-3 text-[54px] md:text-[88px]">
          <span className="block">İstanbul Tesisatçı</span>
          <span className="block text-[var(--sp-red)]">Kalıcı Çözümler!</span>
        </h1>
        <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--sp-muted)]">
          Su kaçağı, tıkanıklık, doğal gaz arızası ve tüm tesisat problemlerinizde{" "}
          <strong className="text-[var(--sp-ink)]">30 dakikada adresinizdeyiz.</strong>
        </p>
        <a href={PHONE_HREF} className="sp-btn-red mt-6 flex items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-extrabold md:max-w-md">
          <Phone className="h-5 w-5" /> Hemen ara · {PHONE}
        </a>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5 md:max-w-md">
          <a href={WA_HREF} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--sp-wa)] py-3.5 text-[14px] font-extrabold text-[var(--sp-paper)]">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <Link to="/randevu" className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[var(--sp-ink)] bg-[var(--sp-paper)] py-3.5 text-[14px] font-extrabold">
            <Calendar className="h-4 w-4" /> Randevu Al
          </Link>
        </div>
      </div>
      <div className="mt-8 md:mt-0">
        <div className="sp-pipe mb-4" aria-hidden="true" />
        <ProblemShowcase />
      </div>
    </section>
  );
}

function Stats() {
  const items = [
    ["30 dk", "Ortalama varış"], ["7/24", "Kesintisiz hizmet"], ["4.9 ★", "Google puanı"], ["2 Yıl", "Yazılı garanti"],
  ];
  return (
    <section className="sp-hero px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <Eyebrow light>Sahadan rakamlar</Eyebrow>
        <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Basınç testinden geçmiş <span className="text-[var(--sp-red-hot)]">rakamlar.</span></h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.map(([v, l]) => (
            <div key={l} className="rounded-2xl border border-current/15 p-4">
              <div className="sp-display text-[44px] text-[var(--sp-red-hot)]">{v}</div>
              <div className="sp-mono mt-1 text-[9px] opacity-70">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-14">
      <Eyebrow>Hizmetlerimiz</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Tüm tesisat ihtiyaçlarınız <span className="text-[var(--sp-red)]">tek çözümde!</span></h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.icon] ?? Wrench;
          const img = SVC_IMG[s.slug];
          return (
            <Link key={s.slug} to="/hizmet/$slug" params={{ slug: s.slug }} className="group overflow-hidden rounded-[1.4rem] border border-[var(--sp-line)] bg-[var(--sp-paper)] transition hover:-translate-y-0.5 hover:border-[var(--sp-red)]">
              {img && <img src={img} alt={`${s.name} — Gölge Tesisat İstanbul`} width={640} height={360} loading="lazy" className="aspect-[16/8] w-full object-cover" />}
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--sp-red-tint)] text-[var(--sp-red)]"><Icon className="h-4 w-4" /></span>
                  <h3 className="sp-display text-[24px]">{s.name}</h3>
                </div>
                <p className="mt-2 text-[13px] text-[var(--sp-muted)]">{s.tagline}</p>
                <div className="sp-mono mt-3 flex items-center gap-1 text-[10px] text-[var(--sp-red)]">Detay <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" /></div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Fleet() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      <div className="overflow-hidden rounded-[1.6rem] bg-[var(--sp-paper)] md:grid md:grid-cols-2">
        <img src={vanImg} alt="Gölge Tesisat servis aracı İstanbul" width={1200} height={800} loading="lazy" className="h-full w-full object-cover" />
        <div className="p-6 md:p-10">
          <Eyebrow>Servis filosu</Eyebrow>
          <h2 className="sp-display mt-3 text-[40px]">Her an hazır <span className="text-[var(--sp-red)]">bir filo.</span></h2>
          <ul className="mt-4 space-y-2 text-[14px]">
            {["Tam donanımlı servis araçları", "Termal kamera ve akustik dinleme cihazı", "Kanal görüntüleme ve robot ekipmanı", "Plaka takipli, her iki yakada"].map((x) => (
              <li key={x} className="flex gap-2"><Truck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sp-red)]" /> {x}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  const sides = ["Anadolu Yakası", "Avrupa Yakası"] as const;
  return (
    <section className="sp-hero px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <Eyebrow light>Hizmet bölgeleri</Eyebrow>
        <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">İki kıta. <span className="text-[var(--sp-red-hot)]">Tek söz.</span></h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {sides.map((side) => (
            <div key={side} className="rounded-2xl border border-current/15 p-5">
              <div className="sp-mono flex items-center gap-2 text-[10px]"><MapPin className="h-3.5 w-3.5 text-[var(--sp-red-hot)]" /> {side}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {DISTRICTS.filter((d) => d.side === side).map((d) => (
                  <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} className="rounded-full border border-current/20 px-3 py-1.5 text-[12px] font-semibold hover:bg-[var(--sp-red)]">
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Arayın", "Telefon veya WhatsApp ile sorununuzu anlatın."],
    ["Yönlendirme", "Size en yakın ekip yola çıkar."],
    ["Ücretsiz keşif", "Cihazlarla tespit, net teklif — onayınız olmadan işlem yok."],
    ["Onarım", "Kırmadan, temiz ve hızlı müdahale."],
    ["Garanti", "İş sonu kontrol ve 2 yıl yazılı garanti."],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <Eyebrow>Nasıl çalışıyoruz</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Aramadan onarıma <span className="text-[var(--sp-red)]">beş net adım.</span></h2>
      <ol className="mt-6 grid gap-3 md:grid-cols-5">
        {steps.map(([t, d], i) => (
          <li key={t} className="rounded-2xl border border-[var(--sp-line)] bg-[var(--sp-paper)] p-4">
            <div className="sp-display text-[36px] text-[var(--sp-red)]">0{i + 1}</div>
            <div className="mt-1 text-[15px] font-bold">{t}</div>
            <p className="mt-1 text-[13px] text-[var(--sp-muted)]">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Proof() {
  const cases = [
    [cfLeakBefore, cfLeakAfter, "Su kaçağı onarımı", "Kadıköy"],
    [cfRadiatorBefore, cfRadiatorAfter, "Petek temizliği", "Ataşehir"],
    [cfBoilerBefore, cfBoilerAfter, "Kombi tamiri", "Beşiktaş"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 pb-14">
      <Eyebrow>Sahadan kanıt</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Portföy fotoğrafı değil. <span className="text-[var(--sp-red)]">Operasyon kanıtı.</span></h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cases.map(([b, a, t, d]) => (
          <figure key={t} className="overflow-hidden rounded-[1.4rem] border border-[var(--sp-line)] bg-[var(--sp-paper)]">
            <div className="grid grid-cols-2 gap-px bg-[var(--sp-line)]">
              {[[b, "Önce"], [a, "Sonra"]].map(([src, l]) => (
                <div key={l} className="relative">
                  <img src={src} alt={`${t} ${l.toLowerCase()} — ${d} tesisatçı`} width={400} height={400} loading="lazy" className="aspect-square w-full object-cover" />
                  <span className="sp-mono absolute left-2 top-2 rounded-full bg-[var(--sp-ink)] px-2 py-0.5 text-[9px] text-[var(--sp-paper)]">{l}</span>
                </div>
              ))}
            </div>
            <figcaption className="flex items-center justify-between p-4">
              <span className="font-bold">{t}</span>
              <span className="sp-mono text-[10px] text-[var(--sp-muted)]">{d}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = buildReviews("home", "İstanbul", "tesisat", 30).slice(0, 3);
  return (
    <section id="reviews" className="bg-[var(--sp-red-tint)] px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Müşteri yorumları</Eyebrow>
        <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Mutlu <span className="text-[var(--sp-red)]">müşterilerimiz</span></h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {reviews.map((r) => (
            <blockquote key={r.author + r.datePublished} className="rounded-2xl bg-[var(--sp-paper)] p-5">
              <div className="flex gap-0.5 text-[var(--sp-amber)]">{Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-3 text-[14px] leading-relaxed">“{r.body}”</p>
              <footer className="sp-mono mt-3 text-[10px] text-[var(--sp-muted)]">{r.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const items = [
    [brandHousing, "Konut siteleri"], [brandInsurance, "Sigorta hasar"], [brandRealEstate, "Emlak ofisleri"], [brandPublic, "Kamu binaları"],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <Eyebrow>İş ortaklıkları</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Güvenilir hizmet, <span className="text-[var(--sp-red)]">güçlü ortaklıklar.</span></h2>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map(([src, l]) => (
          <div key={l} className="overflow-hidden rounded-2xl border border-[var(--sp-line)] bg-[var(--sp-paper)]">
            <img src={src} alt={`${l} için tesisat hizmeti — Gölge Tesisat`} width={400} height={300} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-3 text-[13px] font-bold">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    [ShieldCheck, "2 yıl yazılı garanti", "İşçilik ve parça dahil."],
    [FileCheck, "Şeffaf teklif", "Ücretsiz keşif, onaysız işlem yok."],
    [Award, "Sertifikalı ekip", "Doğal gaz ve tesisat yetkili ustalar."],
    [Clock, "7/24 ulaşım", "Gece, hafta sonu ve bayram dahil."],
  ] as const;
  return (
    <section className="sp-hero px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <Eyebrow light>Neden biz</Eyebrow>
        <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Belgeler ve rakamlarla <span className="text-[var(--sp-red-hot)]">kanıtlanmış.</span></h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {items.map(([Icon, t, d]) => (
            <div key={t} className="rounded-2xl border border-current/15 p-5">
              <Icon className="h-6 w-6 text-[var(--sp-red-hot)]" />
              <div className="mt-3 font-bold">{t}</div>
              <p className="mt-1 text-[13px] opacity-70">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>Blog · Bilgi kütüphanesi</Eyebrow>
          <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Faydalı <span className="text-[var(--sp-red)]">bilgiler</span></h2>
        </div>
        <Link to="/blog" className="sp-mono hidden items-center gap-1 text-[10px] text-[var(--sp-red)] md:flex">Tümü <ArrowRight className="h-3 w-3" /></Link>
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {FEATURED_POSTS.slice(0, 6).map((p) => (
          <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group rounded-2xl border border-[var(--sp-line)] bg-[var(--sp-paper)] p-5 hover:border-[var(--sp-red)]">
            <div className="sp-mono text-[9px] text-[var(--sp-red)]">{p.category} · {p.readMin} dk</div>
            <h3 className="mt-2 text-[16px] font-bold leading-snug group-hover:text-[var(--sp-red)]">{p.title}</h3>
          </Link>
        ))}
      </div>
      <Link to="/blog" className="sp-btn-ink mt-4 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-[14px] font-bold md:hidden">Tüm yazılar <ArrowRight className="h-4 w-4" /></Link>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 pb-14">
      <Eyebrow>Sorular</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Sık sorulan <span className="text-[var(--sp-red)]">sorular</span></h2>
      <div className="mt-6 space-y-2">
        {HOME_FAQ.map((f, i) => (
          <div key={f.q} className="rounded-2xl border border-[var(--sp-line)] bg-[var(--sp-paper)]">
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-center justify-between gap-3 p-4 text-left text-[15px] font-bold">
              {f.q} <ChevronDown className={`h-5 w-5 shrink-0 text-[var(--sp-red)] transition ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="px-4 pb-4 text-[14px] text-[var(--sp-muted)]">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}


function Plans() {
  const plans = [
    ["01", "Temel Paket", "Yıllık kombi bakımı ve genel kontrol.", ["Kombi genel kontrolü", "Brülör ve eşanjör temizliği", "Gaz ayarı kontrolü", "Güvenlik ve sızdırmazlık kontrolü"]],
    ["02", "Standart Paket", "Yıllık bakım + öncelikli destek.", ["Temel paketin tamamı", "Petek hava alma ve dengeleme", "Öncelikli randevu", "Yıl içi ücretsiz kontrol ziyareti"]],
    ["03", "Premium Paket", "Tam kapsamlı bakım ve tesisat kontrolü.", ["Standart paketin tamamı", "Petek temizliği", "Tesisat basınç testi", "7/24 öncelikli acil hat"]],
  ] as const;
  return (
    <section id="plans" className="mx-auto max-w-6xl px-4 py-14">
      <Eyebrow>Bakım planları · 3 seviye</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Yaşam tarzınıza göre <span className="text-[var(--sp-red)]">bakım.</span></h2>
      <p className="mt-3 max-w-xl text-[14px] text-[var(--sp-muted)]">Yıllık içi rahatlıktan tam kapsamlı korumaya — ihtiyacınız olan ilgi seviyesini seçin.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {plans.map(([n, t, d, items]) => {
          const hot = n === "02";
          return (
            <div key={n} className={`relative rounded-[1.4rem] p-6 ${hot ? "sp-hero" : "border border-[var(--sp-line)] bg-[var(--sp-paper)]"}`}>
              {hot && <span className="sp-btn-red sp-mono absolute right-4 top-4 rounded-full px-2 py-0.5 text-[9px]">En çok tercih</span>}
              <div className={`sp-mono text-[10px] ${hot ? "text-[var(--sp-red-hot)]" : "text-[var(--sp-red)]"}`}>Seviye {n}</div>
              <h3 className="sp-display mt-2 text-[32px]">{t}</h3>
              <p className={`mt-1 text-[13px] ${hot ? "opacity-70" : "text-[var(--sp-muted)]"}`}>{d}</p>
              <ul className="mt-4 space-y-2 text-[14px]">
                {items.map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--sp-green)]" /> {x}</li>)}
              </ul>
              <a href={WA_HREF} target="_blank" rel="noopener" className={`mt-5 flex items-center justify-center gap-2 rounded-2xl py-3 text-[13px] font-extrabold ${hot ? "sp-btn-red" : "sp-btn-ink"}`}>Detaylı bilgi al <ArrowRight className="h-4 w-4" /></a>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Energy() {
  const habits = [
    ["Sıcaklık ayarı", "Kombiyi 20–22°C aralığında kullanmak enerji tasarrufu sağlar."],
    ["Petek bakımı", "Hava alınmış ve temiz petekler eşit ısınır, kombi daha az çalışır."],
    ["Basınç kontrolü", "Kombi basıncını 1,5–2 bar arasında tutmak arızaları önler."],
    ["Yıllık servis", "Düzenli bakım yanma verimini korur, ömrü uzatır."],
    ["Kaçak kontrolü", "Gizli su kaçağı faturayı ve yapıyı sessizce yıpratır."],
  ];
  const [on, setOn] = useState<number[]>([]);
  return (
    <section id="energy" className="sp-hero px-4 py-14">
      <div className="mx-auto max-w-6xl md:grid md:grid-cols-2 md:gap-10">
        <div>
          <Eyebrow light>Enerji verimliliği</Eyebrow>
          <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Daha düşük fatura. <span className="text-[var(--sp-red-hot)]">Daha fazla konfor.</span></h2>
          <p className="mt-3 text-[14px] opacity-70">Beş basit alışkanlık. Hangilerini uyguladığınızı işaretleyin.</p>
          <div className="mt-6 rounded-2xl border border-current/15 p-5">
            <div className="sp-mono text-[10px] opacity-70">Uygulanan alışkanlık</div>
            <div className="sp-display mt-1 text-[64px] text-[var(--sp-red-hot)]">{on.length} / 5</div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-current/15"><div className="h-full bg-[var(--sp-red-hot)] transition-all" style={{ width: `${on.length * 20}%` }} /></div>
            <Link to="/randevu" className="sp-btn-red mt-5 flex items-center justify-center gap-2 rounded-2xl py-3 text-[13px] font-extrabold">Ücretsiz kontrol iste <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <ul className="mt-6 space-y-2 md:mt-0">
          {habits.map(([t, d], i) => {
            const a = on.includes(i);
            return (
              <li key={t}>
                <button onClick={() => setOn(a ? on.filter((x) => x !== i) : [...on, i])} aria-pressed={a} className={`flex w-full gap-3 rounded-2xl border p-4 text-left transition ${a ? "border-[var(--sp-red-hot)] bg-current/5" : "border-current/15"}`}>
                  <span className="sp-display text-[28px] text-[var(--sp-red-hot)]">0{i + 1}</span>
                  <span className="flex-1"><span className="block font-bold">{t}</span><span className="block text-[13px] opacity-70">{d}</span></span>
                  <Check className={`h-5 w-5 shrink-0 ${a ? "text-[var(--sp-green)]" : "opacity-20"}`} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    [livePrep, "Kontrollü giriş · zemin hazırlığı"], [liveFloor, "Zemin koruma"], [liveBath, "Banyo tesisat müdahalesi"],
    [liveBoiler, "Kombi bağlantı kontrolü"], [liveCeiling, "Tavan erişimi ile kaçak onarımı"], [liveGas, "Doğal gaz hattı çalışması"],
  ];
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-4 py-14">
      <Eyebrow>Sahadan fotoğraflar</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Gerçek işin <span className="text-[var(--sp-red)]">ölçülebilir standardı.</span></h2>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map(([src, l], i) => (
          <figure key={l} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 md:col-span-1 md:row-span-2" : ""}`}>
            <img src={src} alt={`${l} — Gölge Tesisat İstanbul`} width={600} height={600} loading="lazy" className="h-full min-h-40 w-full object-cover transition group-hover:scale-105" />
            <figcaption className="sp-mono absolute inset-x-2 bottom-2 rounded-lg bg-[var(--sp-ink)]/80 px-2 py-1 text-[9px] text-[var(--sp-paper)]">{l}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Team() {
  const team = [[teamHasan, "Hasan Usta", "Su kaçağı uzmanı"], [teamBekir, "Bekir Usta", "Kombi & doğal gaz"], [teamEmin, "Emin Usta", "Tıkanıklık & kanal"], [teamCemil, "Cemil Usta", "Petek & ısıtma"]];
  return (
    <section id="team" className="bg-[var(--sp-red-tint)] px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <Eyebrow>Ekibimiz</Eyebrow>
        <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Kapınıza gelecek <span className="text-[var(--sp-red)]">ustalar.</span></h2>
        <div className="sp-mono mt-3 flex flex-wrap gap-2 text-[10px]">
          {["Sertifikalı", "Sigortalı", "Kimlikli"].map((x) => <span key={x} className="flex items-center gap-1 rounded-full bg-[var(--sp-paper)] px-3 py-1"><ShieldCheck className="h-3 w-3 text-[var(--sp-green)]" /> {x}</span>)}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {team.map(([src, n, r]) => (
            <div key={n} className="overflow-hidden rounded-2xl bg-[var(--sp-paper)]">
              <img src={src} alt={`${n} — Gölge Tesisat ${r}`} width={400} height={480} loading="lazy" className="aspect-[5/6] w-full object-cover" />
              <div className="p-3"><div className="sp-display text-[22px]">{n}</div><div className="sp-mono text-[9px] text-[var(--sp-muted)]">{r}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
      <Eyebrow>7/24 açık</Eyebrow>
      <h2 className="sp-display mt-3 text-[40px] md:text-[56px]">Bize ulaşmanın <span className="text-[var(--sp-red)]">üç yolu.</span></h2>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <a href={PHONE_HREF} className="sp-hero rounded-[1.4rem] p-6">
          <div className="sp-mono flex items-center justify-between text-[10px]"><span>Telefon · 7/24</span><span className="text-[var(--sp-green)]">● Açık</span></div>
          <Phone className="mt-4 h-8 w-8 text-[var(--sp-red-hot)]" />
          <div className="sp-display mt-3 text-[32px]">{PHONE}</div>
          <div className="sp-btn-red mt-4 rounded-xl py-2.5 text-center text-[13px] font-extrabold">Hemen ara</div>
        </a>
        <a href={WA_HREF} target="_blank" rel="noopener" className="rounded-[1.4rem] border border-[var(--sp-line)] bg-[var(--sp-paper)] p-6">
          <div className="sp-mono text-[10px] text-[var(--sp-muted)]">WhatsApp · hızlı dönüş</div>
          <MessageCircle className="mt-4 h-8 w-8 text-[var(--sp-wa)]" />
          <div className="mt-3 w-fit rounded-2xl rounded-bl-none bg-[var(--sp-red-tint)] px-3 py-2 text-[13px]">Merhaba, lavabom su kaçırıyor 💧</div>
          <div className="mt-4 rounded-xl bg-[var(--sp-wa)] py-2.5 text-center text-[13px] font-extrabold text-[var(--sp-paper)]">WhatsApp'ı aç</div>
        </a>
        <Link to="/randevu" className="rounded-[1.4rem] border border-[var(--sp-line)] bg-[var(--sp-paper)] p-6">
          <div className="sp-mono text-[10px] text-[var(--sp-muted)]">Online randevu · aynı gün</div>
          <Calendar className="mt-4 h-8 w-8 text-[var(--sp-red)]" />
          <div className="sp-display mt-3 text-[32px]">Saatinizi seçin.</div>
          <div className="sp-btn-ink mt-4 rounded-xl py-2.5 text-center text-[13px] font-extrabold">Randevu al</div>
        </Link>
      </div>
    </section>
  );
}

function Hotline() {
  const em = [
    ["Su kaçağı", "Ana vanayı kapatın, elektrikli cihazlardan uzak durun."],
    ["Tıkanıklık", "Suyu kullanmayı bırakın, kimyasal dökmeyin."],
    ["Kombi arızası", "Ekrandaki hata kodunu not edin, basıncı kontrol edin."],
    ["Gaz kokusu", "Gaz vanasını kapatın, pencereleri açın, elektrik düğmelerine dokunmayın, 187'yi arayın."],
  ];
  const [sel, setSel] = useState(0);
  return (
    <section id="hotline" className="px-4 pb-14">
      <div className="sp-hero mx-auto max-w-6xl rounded-[1.6rem] p-6 md:grid md:grid-cols-2 md:gap-10 md:p-12">
        <div>
          <div className="sp-mono flex items-center gap-2 text-[10px] text-[var(--sp-red-hot)]"><span className="h-2 w-2 animate-pulse rounded-full bg-[var(--sp-red-hot)]" /> Acil · canlı 7/24</div>
          <h2 className="sp-display mt-3 text-[44px] md:text-[64px]">7/24 Acil <span className="text-[var(--sp-red-hot)]">Tesisat Hattı</span></h2>
          <p className="mt-3 text-[14px] opacity-75">İstanbul'un her yerine ortalama 30 dakikada varış. Su kaçağı, tıkanıklık, kombi ve petek sorunlarında hemen arayın.</p>
          <a href={PHONE_HREF} className="sp-btn-red mt-5 flex items-center justify-center gap-2 rounded-2xl py-4 text-[16px] font-extrabold"><Phone className="h-5 w-5" /> {PHONE}</a>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[13px] opacity-80">
            {["Ücretsiz keşif", "30 dk varış", "2 yıl garanti"].map((x) => <li key={x} className="flex items-center gap-1"><Check className="h-4 w-4 text-[var(--sp-green)]" /> {x}</li>)}
          </ul>
        </div>
        <div className="mt-8 md:mt-0">
          <div className="font-bold">Ne oluyor?</div>
          <p className="text-[13px] opacity-70">Durumunuza dokunun — şimdi ne yapmanız gerektiğini gösterelim.</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {em.map(([t], i) => (
              <button key={t} onClick={() => setSel(i)} aria-pressed={sel === i} className={`rounded-xl border px-3 py-3 text-[13px] font-bold ${sel === i ? "border-[var(--sp-red-hot)] bg-[var(--sp-red)]" : "border-current/20"}`}>{t}</button>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-current/15 p-4 text-[14px]"><span className="sp-mono block text-[9px] text-[var(--sp-red-hot)]">Şimdi yapın</span>{em[sel][1]}</div>
        </div>
      </div>
    </section>
  );
}

export function SpHome() {
  return (
    <div className="sp">
      <Header />
      <Hero />
      <Stats />
      <Fleet />
      <Services />
      <Coverage />
      <HowItWorks />
      <Plans />
      <Energy />
      <Reviews />
      <Gallery />
      <Team />
      <Partners />
      <Proof />
      <Blog />
      <Trust />
      <Faq />
      <Contact />
      <Hotline />
    </div>
  );
}
