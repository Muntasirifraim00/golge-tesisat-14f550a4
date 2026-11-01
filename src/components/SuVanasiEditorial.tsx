import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Phone, MessageCircle, ArrowRight, Home, ChevronRight, Clock, Folder, Droplet, Coins, House, Wrench,
  ShieldCheck, Zap, Lock, Unlock, RotateCw, RotateCcw, CheckCircle2, Settings, MapPin, Search, Eye,
  AlertTriangle, BarChart3, Timer, Lightbulb, X, Gauge, ShowerHead, Flame, WashingMachine, Trees, Menu, ListChecks,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/su-vanasi/su-vanasi-kapak.jpg";
import valveCloseup from "@/assets/su-vanasi/su-vanasi-valve-closeup.jpg";
import leakRoom from "@/assets/su-vanasi/su-vanasi-leak-room.jpg";
import plumberVan from "@/assets/su-vanasi/su-vanasi-plumber-van.jpg";
import tHand from "@/assets/su-vanasi/su-vanasi-type-handwheel.jpg";
import tLever from "@/assets/su-vanasi/su-vanasi-type-lever.jpg";
import tSink from "@/assets/su-vanasi/su-vanasi-type-undersink.jpg";
import tMeter from "@/assets/su-vanasi/su-vanasi-type-meter.jpg";
import tapTest from "@/assets/su-vanasi/su-vanasi-tap-test.jpg";
import stuck from "@/assets/su-vanasi/su-vanasi-stuck-valve.jpg";
import burst from "@/assets/su-vanasi/su-vanasi-burst-pipe.jpg";
import locMeter from "@/assets/su-vanasi/su-vanasi-loc-meter.jpg";
import plumberValve from "@/assets/su-vanasi/su-vanasi-plumber-valve.jpg";
import house from "@/assets/su-vanasi/su-vanasi-house-cutaway.jpg";
import locSink from "@/assets/su-vanasi/su-vanasi-loc-undersink.jpg";
import locBoiler from "@/assets/su-vanasi/su-vanasi-loc-boiler.jpg";
import locWasher from "@/assets/su-vanasi/su-vanasi-loc-washer.jpg";
import locOutdoor from "@/assets/su-vanasi/su-vanasi-loc-outdoor.jpg";
import locApt from "@/assets/su-vanasi/su-vanasi-loc-apartment.jpg";

const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

type Faq = { q: string; a: string };

/* ---------- small building blocks ---------- */
function Kicker({ label, n }: { label: string; n: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-brand-red">
        <span className="h-px w-8 bg-brand-red" /> // {label} <span className="text-foreground/40">·</span> {n}
      </div>
      <span className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] min-[420px]:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-red" /> Tesisat Rehberi
      </span>
    </div>
  );
}
const Hot = ({ children }: { children: ReactNode }) => <span className="sv-grad">{children}</span>;
const Red = ({ children }: { children: ReactNode }) => <span className="text-brand-red">{children}</span>;

function Badge({ open, label }: { open?: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold ${open ? "bg-success text-success-foreground" : "bg-brand-red text-brand-red-foreground"}`}>
      {open ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />} = {label}
    </span>
  );
}

function ValveState({ img, caption, open, label, rotate }: { img: string; caption: string; open?: boolean; label: string; rotate?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="min-h-[28px] text-[10.5px] font-bold leading-tight">{caption}</div>
      <div className="relative">
        <img src={img} alt={caption} loading="lazy" width={816} height={816} className={`h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24 ${rotate ? "rotate-90" : ""}`} />
        {open ? <RotateCcw className="absolute -right-2 -top-2 h-5 w-5 text-success" /> : <RotateCw className="absolute -right-2 -top-2 h-5 w-5 text-brand-red" />}
      </div>
      <Badge open={open} label={label} />
    </div>
  );
}

function CtaBlock({ big }: { big?: boolean }) {
  return (
    <div className="sv-cta mt-8 grid gap-4 rounded-2xl border border-brand-red/40 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
      <span className="hidden h-16 w-16 items-center justify-center rounded-full border border-brand-red/60 sm:flex"><Zap className="h-7 w-7 text-brand-red" /></span>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/70">Su kaçağı mı var? Hemen yardım mı lazım?</div>
        <div className="mt-1 text-[20px] font-extrabold leading-tight sm:text-[22px]">Ekibimiz ortalama <Red>30 dakikada</Red> kapınızda.</div>
        {big && <p className="mt-2 text-[13px] text-foreground/75">İstanbul genelinde 7/24 hizmet, ücretsiz keşif ve profesyonel çözüm.</p>}
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-[12.5px] font-extrabold text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA <ArrowRight className="h-4 w-4" /></a>
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-success px-4 py-2.5 text-[12.5px] font-extrabold text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP <ArrowRight className="h-4 w-4" /></a>
        </div>
      </div>
      <ul className="grid gap-2 border-t border-border pt-3 text-[12px] sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-brand-red" /> 7/24 Acil Servis</li>
        <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-red" /> Tüm İstanbul</li>
        <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-red" /> Garantili İşçilik</li>
      </ul>
    </div>
  );
}

const Card = ({ className = "", children }: { className?: string; children: ReactNode }) => (
  <div className={`rounded-2xl border border-border bg-surface/70 ${className}`}>{children}</div>
);

const Section = ({ id, children }: { id: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-20 border-t border-border/60 py-7 sm:py-10 lg:py-12">{children}</section>
);

/* ---------- data ---------- */
const BENEFITS = [
  { icon: Droplet, t: "Su Hasarını Önler" },
  { icon: Coins, t: "Fatura ve Tamir Masrafı" },
  { icon: House, t: "Evinizi Korur" },
  { icon: Wrench, t: "Acil Duruma Hazırlık" },
];

const TYPES = [
  { n: "01", icon: Settings, name: "Yuvarlak Volanlı Vana", img: tHand, desc: "En yaygın vana tipidir. Ana su hatlarında, bodrumda veya su saatinin yanında bulunur.", chips: ["Yaygın", "Çok tur"], how: [{ c: "Sağa çevir", open: false, l: "KAPALI" }, { c: "Sola çevir", open: true, l: "AÇIK" }], rotate: false,
    know: ["Durana kadar çevirin.", "Volan dönüp sıkılaşıyorsa kapanmıştır.", "Tam kapattıktan sonra sıkışmaması için çeyrek tur geri alın.", "Tam açıp kapamak için birkaç tur gerekebilir."] },
  { n: "02", icon: Wrench, name: "Kollu / Kelebek (Küresel) Vana", img: tLever, desc: "Kol 90° döndürülerek açılır veya kapanır. Ana hatlarda, sayaçlarda ve cihaz bağlantılarında sık kullanılır.", chips: ["Çok yaygın", "Çeyrek tur"], how: [{ c: "Kol boruya dik (90°)", open: false, l: "KAPALI" }, { c: "Kol boruya paralel", open: true, l: "AÇIK" }], rotate: true,
    know: ["Dik = kapalı.", "Paralel = açık.", "Sadece 1/4 tur (90°).", "Evlerde ve apartmanlarda çok yaygındır."] },
  { n: "03", icon: ShowerHead, name: "Ara Musluk (Batarya Altı)", img: tSink, desc: "Lavabo, klozet ve evye altındaki küçük vanalardır; tek bir armatürün suyunu keser.", chips: ["Yaygın", "Farklı tipler"], how: [{ c: "Sağa çevir", open: false, l: "KAPALI" }, { c: "Sola çevir", open: true, l: "AÇIK" }], rotate: false,
    know: ["Genellikle 1–2 tur yeterlidir.", "Tek bir noktanın (lavabo, klozet) suyunu keser.", "Çevirdikten sonra sızıntı kontrolü yapın."] },
  { n: "04", icon: Gauge, name: "Su Saati Vanası", img: tMeter, desc: "Genellikle su sayacının yanındaki kelebek kollu vanadır; eve giren tüm suyu kontrol eden ana vanadır.", chips: ["Yaygın", "Çeyrek tur"], how: [{ c: "Kol boruya dik (90°)", open: false, l: "KAPALI" }, { c: "Kol boruya paralel", open: true, l: "AÇIK" }], rotate: true,
    know: ["Çoğu sayaçta küçük kelebek kol vardır.", "90° dik = kapalı.", "Paralel = açık.", "Sayaç dolabında veya bina girişindedir."] },
];

const LOCATIONS = [
  { n: "01", icon: Gauge, name: "Su Saati (Ana) Vanası", img: locMeter, desc: "Genellikle su sayacının yanında, ev dışında veya bina girişindedir. Eve giren tüm suyu kontrol eden ana vanadır.", where: "Sayaç dolabı, bina girişi veya mülk dışı" },
  { n: "02", icon: House, name: "Daire Giriş Vanası", img: locApt, desc: "Apartmanlarda dairenizin girişinde ayrı bir ana vana bulunur ve yalnızca sizin dairenizin suyunu keser.", where: "Daire girişi (tesisat dolabı veya duvar paneli)" },
  { n: "03", icon: ShowerHead, name: "Batarya Altı Ara Musluklar", img: locSink, desc: "Lavabo, evye ve klozet altındaki küçük vanalar tek bir noktanın suyunu keser; tamir ve değişimde işe yarar.", where: "Mutfak evyesi, banyo lavabosu, klozet rezervuarı" },
  { n: "04", icon: Flame, name: "Kombi Vanaları", img: locBoiler, desc: "Kombinin altında soğuk su girişi için ayrı vanalar vardır; bakım veya tamirde yalnızca kombinin suyunu kesersiniz.", where: "Kombinin altında veya yanında" },
  { n: "05", icon: WashingMachine, name: "Çamaşır / Bulaşık Makinesi Vanası", img: locWasher, desc: "Makineye özel ara musluk, evin geri kalanını etkilemeden cihazın suyunu durdurmanızı sağlar.", where: "Çamaşır veya bulaşık makinesinin arkası" },
  { n: "06", icon: Trees, name: "Bahçe / Dış Musluk Vanası", img: locOutdoor, desc: "Dış musluğu besleyen bir kesme vanası çoğu zaman evin içindedir; kışın don riskine karşı kapatılır.", where: "Ev içinde, dış duvara yakın veya tesisat alanında" },
];

/* ---------- main ---------- */
export function SuVanasiEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return (
    <div className="sv-editorial">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-xl bg-foreground object-contain" />
          <div className="leading-tight">
            <div className="truncate text-[14px] font-extrabold tracking-wide sm:text-[16px]">GÖLGE TESİSAT</div>
            <div className="truncate text-[10px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</div>
          </div>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden rounded-full border border-border p-1 text-[11px] font-extrabold min-[440px]:flex">
            <span className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</span><span className="px-2.5 py-1 text-muted-foreground">EN</span>
          </div>
          <a href={PHONE_HREF} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[13px] font-extrabold text-brand-red"><Phone className="h-4 w-4" /> 7/24</a>
          <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* ===== 01 HERO ===== */}
        <section className="relative pb-10 pt-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px]">
            <Link to="/" className="flex items-center gap-1.5"><Home className="h-4 w-4" /> Ana Sayfa</Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <Link to="/blog">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-brand-red">Su Tesisatı</span>
          </nav>
          <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10">
            <div className="relative z-10">
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.2em]">
                  <span className="h-px w-8 bg-brand-red" /><span className="text-brand-red">Su Tesisatı</span><span>·</span><span>{readMin} dk okuma</span>
                </div>
                <span className="rounded border border-brand-red/60 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.2em] text-brand-red">7/24 SERVİS</span>
              </div>
              <h1 className="mt-4 text-[40px] font-black leading-[1.02] tracking-tight sm:text-[56px]">
                Su vanası nasıl <Hot>kapatılır ve açılır?</Hot>
              </h1>
              <p className="mt-4 text-[18px] leading-snug text-muted-foreground sm:text-[21px]">Ana vana nerede ve hangi yöne çevrilmeli?</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                <div className="flex items-center gap-3">
                  <img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full bg-foreground object-contain" />
                  <div><div className="text-[14px] font-extrabold">Gölge Tesisat Ekibi</div><div className="text-[12px] text-muted-foreground">Güncelleme: {updatedLabel}</div></div>
                </div>
                <span className="flex items-center gap-1.5 text-[13px]"><Timer className="h-4 w-4" /> {readMin} dk okuma</span>
                <span className="flex items-center gap-1.5 border-l border-border pl-4 text-[13px]"><Folder className="h-4 w-4" /> Su Tesisatı</span>
              </div>
            </div>
            <div className="relative -mx-4 mt-6 sm:mx-0 lg:mt-0">
              <img src={hero} alt="Kırmızı volanlı ana su vanasını eliyle çeviren kişi" width={1088} height={1360} className="sv-fade aspect-[4/5] w-full object-cover sm:rounded-2xl" />
              <div className="absolute bottom-5 left-4 rounded-2xl border border-border bg-background/85 p-4 backdrop-blur">
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground"><span className="h-2 w-2 rounded-full bg-success" /> Su Kontrolü</div>
                <div className="mt-2 flex items-center gap-3"><ShieldCheck className="h-8 w-8 text-brand-red" /><div className="text-[14px] leading-tight">Küçük Hareket.<br /><b>Büyük Koruma.</b></div></div>
              </div>
            </div>
          </div>
          <Card className="mt-6 grid grid-cols-4 divide-x divide-border py-4">
            {BENEFITS.map(({ icon: I, t }) => (
              <div key={t} className="flex flex-col items-center gap-2 px-1.5 text-center"><I className="h-6 w-6 text-brand-red" /><span className="text-[11px] font-semibold leading-tight sm:text-[13px]">{t}</span></div>
            ))}
          </Card>
          <CtaBlock />
        </section>

        {/* ===== 02 INTRO ===== */}
        <Section id="giris">
          <Kicker label="Giriş" n="02" />
          <div className="mt-5 grid grid-cols-[minmax(0,1.15fr)_minmax(120px,.85fr)] items-center gap-4 sm:gap-6">
            <div>
              <h2 className="text-[27px] font-black leading-[1.05] tracking-tight sm:text-[44px]">Su Vananızı Tanımak <Hot>Neden Bu Kadar</Hot> <Red>Önemli?</Red></h2>
              <p className="mt-3 border-l-2 border-brand-red pl-3 text-[13px] leading-relaxed text-foreground/85 sm:mt-5 sm:pl-4 sm:text-[15.5px]">Su vanası evinize gelen suyu kontrol eder. Onu bulmayı ve kullanmayı bilmek; özellikle bir su kaçağı veya patlak boru anında büyük hasarı önler, para kazandırır ve size huzur verir.</p>
            </div>
            <img src={valveCloseup} alt="Pirinç boru üzerinde kırmızı volanlı vana" loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full rounded-xl object-cover sm:aspect-square sm:rounded-2xl" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BENEFITS.map(({ icon: I, t }) => (
              <Card key={t} className="flex flex-col items-center gap-2 p-4 text-center"><I className="h-7 w-7 text-brand-red" /><span className="text-[13px] font-semibold">{t}</span></Card>
            ))}
          </div>
          <Card className="mt-5 grid grid-cols-[minmax(125px,.9fr)_minmax(0,1.1fr)] overflow-hidden sm:grid-cols-2">
            <div className="relative min-h-48"><img src={leakRoom} alt="Tavandaki borudan sızan suyla dolan salon" loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover ring-2 ring-inset ring-brand-red" /><span className="absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-red bg-background/70 text-[16px] font-black text-brand-red sm:h-10 sm:w-10 sm:text-[20px]">!</span></div>
            <div className="p-3.5 sm:p-5">
              <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-6 bg-brand-red" /> Risk Gerçek</div>
              <h3 className="mt-2 text-[18px] font-black leading-tight sm:text-[24px]">Küçük Bir Sızıntı <Red>Büyük Bir Soruna</Red> Dönüşebilir</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-[14px]">Patlayan bir boru veya sızdıran bir musluk evinizi hızla su basmasına, zemin, duvar ve eşyaların zarar görmesine, hatta alt komşunuzun etkilenmesine yol açabilir. Su ne kadar uzun akarsa onarım masrafı ve hasar o kadar büyür.</p>
            </div>
          </Card>
          <Card className="mt-5 grid grid-cols-[minmax(0,1fr)_minmax(145px,.9fr)] gap-3 p-3.5 sm:gap-5 sm:p-5">
            <div>
              <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-6 bg-brand-red" /> Bu Rehberde Öğrenecekleriniz</div>
              <h3 className="mt-2 text-[18px] font-black leading-tight sm:text-[24px]">Su Vanaları Hakkında <Red>Bilmeniz Gereken Her Şey</Red></h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground sm:mt-3 sm:text-[14px]">Ana vananızı nasıl bulacağınızı, evdeki vana türlerini, hangi yöne çevrileceklerini, acil durumda ne yapacağınızı ve ne zaman profesyonel tesisatçı çağırmanız gerektiğini adım adım anlatıyoruz.</p>
            </div>
            <ul className="grid gap-2">
              {[
                [CheckCircle2, "Ana su vananızı bulun", "#bul"], [Settings, "Farklı vana tiplerini açıp kapatın", "#yon"], [Droplet, "Acil durumda suyu kesin", "#ozet"],
                [Wrench, "Sıkışan vanayı güvenle açın", "#baslamadan"], [ShieldCheck, "Tatil ve uzun süreli güvenlik", "#nerede"],
              ].map(([I, t, h]) => { const Icon = I as typeof CheckCircle2; return (
                <li key={t as string}><a href={h as string} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-lg border border-border bg-background/60 px-2 py-2 text-[11px] sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-[13px]"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-brand-red/50 sm:h-8 sm:w-8"><Icon className="h-4 w-4 text-brand-red" /></span><span className="min-w-0">{t as string}</span><ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" /></a></li>
              ); })}
            </ul>
          </Card>
          <div className="sv-cta relative mt-5 grid grid-cols-[minmax(0,1.15fr)_minmax(125px,.85fr)] overflow-hidden rounded-2xl border border-brand-red/40">
            <div className="relative z-10 p-3.5 sm:p-5">
              <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.2em]"><span className="h-px w-6 bg-brand-red" /> Profesyonel Yardım mı Lazım?</div>
              <h3 className="mt-2 text-[20px] font-black sm:text-[26px]">Su Kaçağı mı? <Red>Beklemeyin!</Red></h3>
              <p className="mt-2 text-[11.5px] text-foreground/80 sm:text-[13.5px]">Ustalarımız 7/24 hizmet verir ve İstanbul'un her yerine ortalama 30 dakikada ulaşır. Ücretsiz keşif, profesyonel çözüm.</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-[12.5px] font-extrabold text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-success px-4 py-2.5 text-[12.5px] font-extrabold text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a>
              </div>
            </div>
            <img src={plumberVan} alt="Servis aracının yanında tesisat ustası" loading="lazy" width={1024} height={768} className="h-full min-h-56 w-full object-cover" />
          </div>
        </Section>

        {/* ===== 03 QUICK ANSWER ===== */}
        <Section id="kisa-cevap">
          <Kicker label="Kısa Cevap" n="03" />
          <div className="mt-5 grid gap-5 sm:grid-cols-[1.5fr_1fr] sm:items-start">
            <div>
              <h2 className="text-[38px] font-black leading-none sm:text-[48px]">Kısa <Hot>Cevap</Hot></h2>
              <p className="mt-4 text-[17px] leading-snug">Su vanası saat yönünde (sağa) çevrilince <b>KAPANIR</b>, saat yönünün tersine (sola) çevrilince <b>AÇILIR</b>.</p>
              <p className="mt-3 text-[13.5px] text-muted-foreground">Kollu (kelebek/küresel) vanada kol boruya dik duruyorsa vana kapalı, boruyla aynı hizadaysa açıktır.</p>
            </div>
            <Card className="flex items-center gap-4 p-4"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-red"><Zap className="h-6 w-6 text-brand-red" /></span><div className="text-[15px] font-bold leading-snug"><Red>Unutmayın:</Red><br />Sağa = Kapalı<br />Sola = Açık</div></Card>
          </div>
          <div className="mt-6 grid gap-3">
            {TYPES.map((t, i) => (
              <Card key={t.n} className={`grid gap-4 p-4 sm:grid-cols-[1fr_1.2fr_1fr] sm:items-center ${i === 0 ? "border-brand-red/50" : ""}`}>
                <div>
                  <t.icon className="h-8 w-8 rounded-full border border-brand-red/40 p-1.5 text-brand-red" />
                  <div className="mt-3 flex items-start gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{i + 1}</span><h3 className="text-[18px] font-extrabold leading-tight">{t.name}</h3></div>
                  <p className="mt-2 text-[13px] text-muted-foreground">{t.desc.split(".")[0]}.</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:border-x sm:border-border sm:px-3">
                  {t.how.map((h) => <ValveState key={h.c} img={t.img} caption={h.c} open={h.open} label={h.l} rotate={t.rotate && h.open} />)}
                </div>
                <div className="rounded-xl bg-background/50 p-3">
                  <div className="text-[14px] font-extrabold text-brand-red">Nasıl anlarsınız?</div>
                  <ul className="mt-2 grid gap-1.5">{t.know.slice(0, 3).map((k) => <li key={k} className="flex gap-2 text-[12.5px]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{k}</li>)}</ul>
                </div>
              </Card>
            ))}
          </div>
          <Card className="mt-4 grid overflow-hidden sm:grid-cols-[1.4fr_1fr]">
            <div className="flex gap-4 p-5"><CheckCircle2 className="h-10 w-10 shrink-0 rounded-xl bg-success/20 p-2 text-success" /><div><h3 className="text-[22px] font-black">Kapattıktan Sonra <Hot>Mutlaka Test Edin</Hot></h3><p className="mt-2 text-[13.5px] text-muted-foreground">Herhangi bir vanayı kapattıktan sonra bir musluğu açarak suyun tamamen kesildiğini doğrulayın.</p></div></div>
            <div className="relative"><img src={tapTest} alt="Musluk altında suyu test eden el" loading="lazy" width={1024} height={768} className="h-44 w-full object-cover sm:h-full" /><span className="absolute bottom-3 right-3 rounded-lg border border-brand-red bg-background/85 px-3 py-2 text-[12px] font-bold">Su gelmiyorsa<br />= vana doğru kapalı</span></div>
          </Card>
          <CtaBlock />
        </Section>

        {/* ===== 04 KEY TAKEAWAYS ===== */}
        <Section id="ozet">
          <Kicker label="Önemli Noktalar" n="04" />
          <div className="mt-5 grid gap-5 sm:grid-cols-[1.5fr_1fr] sm:items-start">
            <div>
              <h2 className="text-[36px] font-black leading-[1.02] sm:text-[46px]">Unutulmaması Gereken <Red>4 Önemli Nokta</Red></h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground">Bu özet; suyu hızlı ve güvenli kontrol etmenize, hasarı önlemenize ve ne zaman profesyonel çağırmanız gerektiğini bilmenize yardımcı olur.</p>
            </div>
            <Card className="flex items-center gap-4 border-brand-red/50 p-4"><Lightbulb className="h-12 w-12 shrink-0 rounded-full border border-brand-red p-2.5 text-brand-red" /><div className="text-[14px]"><b className="text-brand-red">Unutmayın:</b><br />Birkaç dakikalık müdahale büyük hasarı önleyebilir.</div></Card>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              { n: "01", I: Settings, t: "Doğru Yönü Bilin", d: "Çoğu vanada saat yönünde (sağa) çevirmek kapatır, tersine (sola) çevirmek açar. Kollu vanada boruya dik = kapalı, paralel = açık.", img: valveCloseup },
              { n: "02", I: MapPin, t: "Vanalarınızı Şimdiden Bulun", d: "Ana vanayı, daire giriş vanasını ve batarya altı musluklarını bir kaçak olmadan önce bulun. Yerlerini bilmek acil anda değerli zaman kazandırır.", img: locMeter },
              { n: "03", I: ShieldCheck, t: "Kaçakta Suyu Hemen Kesin", d: "Boru patlarsa veya büyük bir kaçak olursa önce en yakın vanayı kapatın. Gerekirse daire ana vanasını veya su saati vanasını kapatarak akışı durdurun.", img: burst },
              { n: "04", I: Wrench, t: "Sıkışan Vanayı Zorlamayın", d: "Vana sıkışmışsa aşırı güç uygulamayın. Hafif ileri-geri hareketler deneyin, gerekirse kireç çözücü kullanın; yine dönmüyorsa bir ustayı arayın.", img: stuck, x: true },
            ].map((k) => (
              <Card key={k.n} className="relative grid grid-cols-[1.25fr_1fr] overflow-hidden">
                <div className="p-4">
                  <span className="rounded-full bg-brand-red px-2 py-0.5 text-[12px] font-black text-brand-red-foreground">{k.n}</span>
                  <k.I className="mt-3 h-6 w-6 text-brand-red" />
                  <h3 className="mt-2 text-[17px] font-extrabold leading-tight">{k.t}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{k.d}</p>
                </div>
                <img src={k.img} alt={k.t} loading="lazy" width={768} height={1024} className="sv-fade-l h-full w-full object-cover" />
                {k.x && <X className="absolute right-3 top-3 h-9 w-9 rounded-full bg-brand-red p-2 text-brand-red-foreground" />}
              </Card>
            ))}
          </div>
          <Card className="mt-4 p-4">
            <div className="flex items-center justify-between"><h3 className="flex items-center gap-3 text-[20px] font-black"><CheckCircle2 className="h-8 w-8 rounded-lg bg-success p-1.5 text-success-foreground" /> Hızlı <Red>Kontrol Listesi</Red></h3><span className="hidden rounded-full border border-border px-3 py-1 text-[10px] font-extrabold tracking-[0.18em] min-[420px]:inline">● HAZIRLIKLI OL</span></div>
            <div className="mt-4 grid grid-cols-5 divide-x divide-border">
              {[[Search, "Ana vanayı bul"], [Settings, "Doğru yönü öğren"], [Droplet, "Kapattıktan sonra test et"], [ShieldCheck, "Sıkışanı zorlama"], [House, "Tatilde suyu kapat"]].map(([I, t]) => { const Icon = I as typeof Search; return (
                <div key={t as string} className="flex flex-col items-center gap-2 px-1 text-center"><Icon className="h-6 w-6 text-brand-red" /><span className="text-[10.5px] font-semibold leading-tight sm:text-[12.5px]">{t as string}</span></div>
              ); })}
            </div>
          </Card>
          <CtaBlock />
        </Section>

        {/* ===== 05 BEFORE YOU START ===== */}
        <Section id="baslamadan">
          <Kicker label="Başlamadan Önce" n="05" />
          <div className="mt-5 grid items-center gap-5 sm:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-[38px] font-black leading-[1.02] sm:text-[50px]">Bunu Kendiniz <Hot>Yapabilir misiniz?</Hot></h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground">Çoğu durumda su vanasını açıp kapatmak kendi başınıza yapabileceğiniz basit ve hızlı bir iştir. Yine de başlamadan önce zorluk seviyesini, süreyi ve olası riskleri bilmeniz önemlidir.</p>
            </div>
            <div className="relative"><img src={plumberValve} alt="Su saati yanındaki kırmızı vanayı çeviren tesisat ustası" loading="lazy" width={1024} height={1024} className="aspect-square w-full rounded-2xl object-cover" /><span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-xl border border-border bg-background/85 px-3 py-2 text-[11.5px]"><CheckCircle2 className="h-5 w-5 text-success" /> Basit bir hareket büyük hasarı önler.</span></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { I: BarChart3, l: "Zorluk", v: <>Kolay <span className="text-warning">(2/5)</span></>, d: "Çoğu kişi profesyonel yardım olmadan yapabilir." },
              { I: Clock, l: "Tahmini Süre", v: "5 Dakika", d: "Vanayı bulup çevirmek genellikle birkaç dakika sürer." },
              { I: Wrench, l: "Gerekli Alet", v: "Yok", d: "Çoğu vanayı açıp kapatmak için özel alet gerekmez." },
              { I: AlertTriangle, l: "Ana Risk", v: <Red>Eski / Sıkışmış Vana</Red>, d: "Yıllardır kullanılmayan vana sıkışmış veya kırılgan olabilir. Zorlamayın." },
            ].map((s) => (
              <Card key={s.l} className="p-4"><s.I className="h-8 w-8 text-brand-red" /><div className="mt-3 text-[13px] font-semibold">{s.l}</div><div className="mt-1 text-[24px] font-black leading-tight">{s.v}</div><p className="mt-2 text-[12.5px] text-muted-foreground">{s.d}</p></Card>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Card className="p-4">
              <h3 className="flex items-center gap-2 text-[17px] font-extrabold text-brand-red"><span className="h-px w-6 bg-brand-red" /> Önce Neyi Kontrol Etmelisiniz?</h3>
              <ol className="mt-3 grid gap-2">
                {[[MapPin, "Ana su vananızın yerini öğrenin."], [Eye, "Vana tipini belirleyin (volanlı mı, kollu mu)."], [Droplet, "Görünür sızıntı veya hasar var mı bakın."], [ShieldCheck, "Vananın zorlamadan, rahat döndüğünden emin olun."], [ShowerHead, "Kapattıktan sonra bir musluğu açıp suyun kesildiğini doğrulayın."]].map(([I, t], i) => { const Icon = I as typeof MapPin; return (
                  <li key={i} className="flex items-center gap-3 border-b border-border/60 pb-2 text-[13px] last:border-0"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-[11px] font-black text-brand-red-foreground">0{i + 1}</span><Icon className="h-5 w-5 shrink-0 text-brand-red" />{t as string}</li>
                ); })}
              </ol>
            </Card>
            <div className="overflow-hidden rounded-2xl border border-brand-red/50">
              <img src={hero} alt="Vana çeviren el" loading="lazy" width={1088} height={1360} className="h-44 w-full object-cover" />
              <div className="sv-cta p-4"><h3 className="flex items-center gap-2 text-[20px] font-black"><AlertTriangle className="h-7 w-7 rounded-full bg-brand-red p-1.5 text-brand-red-foreground" /> Önemli</h3><p className="mt-2 text-[13.5px] leading-relaxed">Vana sıkışmışsa, hasarlıysa veya kapattıktan sonra hâlâ sızdırıyorsa zorlamayın. Eski bir vanayı zorlamak onu kırıp çok daha büyük bir kaçağa yol açabilir. Bu durumda profesyonel bir tesisatçı arayın.</p></div>
            </div>
          </div>
          <CtaBlock />
        </Section>

        {/* ===== 06 VALVE TYPES ===== */}
        <Section id="tipler">
          <Kicker label="Vana Tipleri" n="06" />
          <div className="mt-5 grid items-center gap-5 sm:grid-cols-[1.5fr_1fr]">
            <div>
              <h2 className="text-[38px] font-black leading-[1.02] sm:text-[50px]">Evdeki Yaygın <Hot>Su Vanası Tipleri</Hot></h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground">Bir evde birkaç farklı vana bulunur. Her biri farklı çalışır ve kendi açma-kapama yöntemi vardır. En sık karşılaşacağınız tipler şunlardır:</p>
            </div>
            <img src={valveCloseup} alt="Ana su vanası yakın çekim - su vanası nerede" loading="lazy" width={1024} height={1024} className="hidden aspect-square w-full rounded-2xl object-cover sm:block" />
          </div>
          <div className="mt-6 grid gap-3">
            {TYPES.map((t) => (
              <Card key={t.n} className="grid overflow-hidden sm:grid-cols-[1.3fr_1fr]">
                <div className="grid grid-cols-[1.2fr_1fr]">
                  <div className="p-4">
                    <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-[14px] font-black text-brand-red-foreground">{t.n}</span><t.icon className="h-6 w-6 text-brand-red" /></div>
                    <h3 className="mt-3 text-[18px] font-extrabold leading-tight">{t.name}</h3>
                    <p className="mt-2 text-[12.5px] text-muted-foreground">{t.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">{t.chips.map((c, ci) => <span key={c} className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px]">{ci === 0 ? <span className="h-2 w-2 rounded-full bg-success" /> : <ListChecks className="h-3 w-3" />}{c}</span>)}</div>
                  </div>
                  <img src={t.img} alt={t.name} loading="lazy" width={816} height={816} className="sv-fade-l h-full w-full object-cover" />
                </div>
                <div className="border-t border-border p-3 sm:border-l sm:border-t-0">
                  <div className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-6 bg-brand-red" /> Nasıl Çalışır</div>
                  <div className="mt-3 grid grid-cols-2 gap-2">{t.how.map((h) => <div key={h.c} className="rounded-xl border border-border bg-background/50 p-2"><ValveState img={t.img} caption={h.c} open={h.open} label={h.l} rotate={t.rotate && h.open} /></div>)}</div>
                </div>
              </Card>
            ))}
          </div>
          <CtaBlock />
        </Section>

        {/* ===== 07 DIRECTION ===== */}
        <Section id="yon">
          <Kicker label="Açma & Kapama Yönü" n="07" />
          <div className="mt-5 grid gap-5 sm:grid-cols-[1.4fr_1fr] sm:items-start">
            <div>
              <h2 className="text-[36px] font-black leading-[1.02] sm:text-[48px]">Her Vana Tipi <Hot>Nasıl Açılır</Hot> ve Kapanır?</h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground">Farklı vana tiplerinin açma-kapama yönleri farklıdır. Doğru yöne çevirmek için aşağıdaki rehberi izleyin.</p>
            </div>
            <Card className="border-brand-red/50 p-4"><div className="flex items-center gap-3"><Lightbulb className="h-12 w-12 shrink-0 rounded-full border border-brand-red p-2.5 text-brand-red" /><div className="text-[14px] font-bold"><Red>Genel Kural:</Red><br />Saat yönü = Kapalı<br />Saat yönü tersi = Açık</div></div><p className="mt-3 text-[12.5px] text-muted-foreground">Bu kural çoğu yuvarlak volanlı vana için geçerlidir. Kollu ve küresel vanalar farklı çalışır (aşağıya bakın).</p></Card>
          </div>
          <div className="mt-6 grid gap-3">
            {TYPES.map((t) => (
              <Card key={t.n} className="grid gap-3 p-4 sm:grid-cols-[1fr_1.2fr_1fr] sm:items-center">
                <div><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-[14px] font-black text-brand-red-foreground">{t.n}</span><t.icon className="h-7 w-7 text-brand-red" /></div><h3 className="mt-3 text-[18px] font-extrabold">{t.name}</h3><p className="mt-1.5 text-[12.5px] text-muted-foreground">{t.desc}</p></div>
                <div className="grid grid-cols-2 gap-2">{t.how.map((h) => <ValveState key={h.c} img={t.img} caption={h.c} open={h.open} label={h.l} rotate={t.rotate && h.open} />)}</div>
                <div className="rounded-xl bg-background/50 p-3"><div className="text-[14px] font-extrabold text-brand-red">Bilmeniz Gerekenler</div><ul className="mt-2 grid gap-1.5">{t.know.map((k) => <li key={k} className="flex gap-2 text-[12.5px]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{k}</li>)}</ul></div>
              </Card>
            ))}
          </div>
          <Card className="mt-4 p-4">
            <h3 className="flex items-center gap-2 text-[18px] font-black"><ListChecks className="h-6 w-6 text-brand-red" /> Hızlı Karşılaştırma</h3>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-[12px]">
                <thead className="text-muted-foreground"><tr>{["Vana Tipi", "Kapatma", "Açma", "Kol (Kapalı)", "Kol (Açık)", "Tur"].map((h) => <th key={h} className="border-b border-border py-2 pr-3 font-semibold">{h}</th>)}</tr></thead>
                <tbody>
                  {[["Yuvarlak Volanlı", "Saat yönü (sağa)", "Saat yönü tersi (sola)", "Sonuna kadar", "Sonuna kadar", "Çok tur"], ["Kollu / Küresel", "Boruya 90°", "Boruya paralel", "Dik", "Paralel", "1/4 tur (90°)"], ["Ara Musluk", "Saat yönü (sağa)", "Saat yönü tersi (sola)", "Sonuna kadar", "Sonuna kadar", "1–2 tur"], ["Su Saati", "Boruya 90°", "Boruya paralel", "Dik", "Paralel", "1/4 tur (90°)"]].map((r) => (
                    <tr key={r[0]}>{r.map((c, ci) => <td key={ci} className={`border-b border-border/60 py-2 pr-3 ${ci === 0 ? "font-bold" : ""}`}>{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <CtaBlock />
        </Section>

        {/* ===== 08 LOCATIONS ===== */}
        <Section id="nerede">
          <Kicker label="Vanaların Yerleri" n="08" />
          <div className="mt-5 grid items-center gap-5 sm:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-[36px] font-black leading-[1.02] sm:text-[46px]">Evde Su Vanaları <Red>Nerede</Red> Bulunur?</h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground">Su vanaları türüne ve amacına göre farklı yerlerde bulunabilir. En yaygın konumlar şunlardır:</p>
            </div>
            <HouseMap />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {LOCATIONS.map((l) => (
              <Card key={l.n} className="relative grid grid-cols-[1.25fr_1fr] overflow-hidden">
                <div className="relative z-10 p-4">
                  <div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-[13px] font-black text-brand-red-foreground">{l.n}</span><l.icon className="h-6 w-6 text-brand-red" /></div>
                  <h3 className="mt-3 text-[17px] font-extrabold leading-tight">{l.name}</h3>
                  <p className="mt-2 text-[12.5px] text-muted-foreground">{l.desc}</p>
                  <div className="mt-3 flex gap-2 rounded-xl border border-border bg-background/70 p-2 text-[11.5px]"><MapPin className="h-4 w-4 shrink-0 text-brand-red" />{l.where}</div>
                </div>
                <img src={l.img} alt={l.name} loading="lazy" width={1024} height={768} className="sv-fade-l h-full w-full object-cover" />
              </Card>
            ))}
          </div>
          <Card className="mt-4 p-4">
            <h3 className="flex items-center gap-3 text-[20px] font-black"><CheckCircle2 className="h-8 w-8 rounded-lg bg-success p-1.5 text-success-foreground" /> Hızlı İpuçları</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[[Search, "Kolu Arayın", "Çoğu vananın yuvarlak volanı veya kolu vardır."], [Eye, "Boruyu Takip Edin", "En yakın vanayı bulmak için boruyu izleyin."], [House, "Tesisat Alanlarına Bakın", "Sayaç dolabı, tesisat dolabı ve lavabo altlarına bakın."], [Wrench, "Emin Değil misiniz?", "Vanayı bulamazsanız profesyonel bir tesisatçıya danışın."]].map(([I, t, d]) => { const Icon = I as typeof Search; return (
                <div key={t as string} className="text-center"><Icon className="mx-auto h-7 w-7 text-brand-red" /><div className="mt-2 text-[13px] font-extrabold">{t as string}</div><p className="mt-1 text-[12px] text-muted-foreground">{d as string}</p></div>
              ); })}
            </div>
          </Card>
          <CtaBlock />
        </Section>

        {/* ===== 09 FIND MAIN VALVE ===== */}
        <Section id="bul">
          <Kicker label="Ana Vanayı Bulun" n="09" />
          <div className="mt-5 grid items-center gap-5 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="text-[36px] font-black leading-[1.02] sm:text-[50px]"><Red>Ana Su Vananızı</Red> <Hot>Nasıl Bulursunuz?</Hot></h2>
              <p className="mt-4 text-[15.5px] text-muted-foreground">Ana su vanası eve giren tüm suyu kontrol eder. Genellikle su sayacının yanında veya ana besleme hattı üzerindedir. Kontrol etmeniz gereken en yaygın yerler:</p>
            </div>
            <HouseMap />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[["01", "Su Saati Kutusu", locMeter, "Genellikle ev dışında, sayaç kutusunda, bina girişinde veya sokağa yakın yerdedir."], ["02", "Daire Girişi", locApt, "Apartmanlarda ana vana çoğunlukla girişte, tesisat dolabında veya duvar panelindedir."], ["03", "Lavabo Altı", locSink, "Küçük kesme vanaları mutfak evyesi, banyo lavabosu ve klozet altındadır."], ["04", "Kombi Alanı", locBoiler, "Kombinin soğuk ve sıcak su için ayrı vanaları vardır; yalnızca kombinin suyunu keser."], ["05", "Cihaz Bağlantıları", locWasher, "Çamaşır ve bulaşık makinelerinin arkada kendi kesme vanaları bulunur."]].map(([n, t, img, d]) => (
              <Card key={n} className="overflow-hidden p-2.5 last:col-span-2 lg:last:col-span-1">
                <div className="flex items-center gap-2"><span className="rounded-lg bg-brand-red px-1.5 py-0.5 text-[12px] font-black text-brand-red-foreground">{n}</span><h3 className="text-[13.5px] font-extrabold">{t}</h3></div>
                <img src={img} alt={t} loading="lazy" width={1024} height={768} className="mt-2 aspect-[4/3] w-full rounded-lg object-cover" />
                <p className="mt-2 text-[12px] text-muted-foreground">{d}</p>
              </Card>
            ))}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-[2fr_1fr]">
            <Card className="p-4">
              <h3 className="flex items-center gap-2 text-[19px] font-black"><Search className="h-7 w-7 rounded-lg bg-brand-red p-1.5 text-brand-red-foreground" /> Adım Adım: <Red>Nasıl Bulunur?</Red></h3>
              <ol className="mt-4 grid gap-3 sm:grid-cols-4">
                {[[House, "Dışarıya bakın", "Mülkünüzün yakınında su sayacı kutusu arayın."], [Home, "Girişi kontrol edin", "Apartmanlarda giriş alanına veya tesisat dolabına bakın."], [ShowerHead, "Boruyu izleyin", "Ana besleme borusunun eve girdiği yeri takip edin."], [Search, "Kolu bulun", "Ana hat üzerinde yuvarlak volan veya kollu vana arayın."]].map(([I, t, d], i) => { const Icon = I as typeof House; return (
                  <li key={i} className="flex gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{i + 1}</span><div><Icon className="h-6 w-6 text-brand-red" /><div className="mt-1 text-[13px] font-extrabold">{t as string}</div><p className="text-[12px] text-muted-foreground">{d as string}</p></div></li>
                ); })}
              </ol>
            </Card>
            <Card className="border-success/40 p-4">
              <h3 className="flex items-center gap-2 text-[19px] font-black"><Lightbulb className="h-6 w-6 text-success" /> Hızlı İpuçları</h3>
              <ul className="mt-3 grid gap-2 text-[12.5px]">{["Ana vana genellikle su sayacının yanındadır.", "Yuvarlak volan veya kol arayın.", "Bir kutunun, dolabın içinde veya lavabo altında olabilir.", "Bulamazsanız yukarıdaki tüm alanları kontrol edin.", "Emin değilseniz profesyonel bir tesisatçıya danışın."].map((t) => <li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>)}</ul>
            </Card>
          </div>
          <CtaBlock big />
        </Section>

        {/* ===== FAQ ===== */}
        {faq.length > 0 && (
          <Section id="sss">
            <Kicker label="Sıkça Sorulan Sorular" n="10" />
            <h2 className="mt-5 text-[34px] font-black leading-tight sm:text-[44px]">Merak <Hot>Edilenler</Hot></h2>
            <div className="mt-5 grid gap-2.5">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-surface/70 p-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[15px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90" /></summary>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-[13.5px] text-muted-foreground">Vana kırıldı veya su kesilemiyor mu? <Link to="/hizmet/$slug" params={{ slug: "su-kacagi-tespiti" }} className="font-bold text-brand-red underline">Su kaçağı tespiti</Link> ve <Link to="/hizmet/$slug" params={{ slug: "musluk-batarya-degisimi" }} className="font-bold text-brand-red underline">musluk ve vana değişimi</Link> için bize ulaşın; keşif ücretsizdir.</p>
          </Section>
        )}
      </div>
    </div>
  );
}

function HouseMap() {
  const pins = [
    { t: "Banyo (Lavabo Altı)", x: "22%", y: "28%" },
    { t: "Kombi Vanaları", x: "70%", y: "55%" },
    { t: "Çamaşır Makinesi", x: "50%", y: "70%" },
    { t: "Ana Su Saati", x: "84%", y: "84%" },
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img src={house} alt="Evde vanaların yerlerini gösteren kesit görünüm" loading="lazy" width={1536} height={864} className="aspect-[16/9] w-full object-cover" />
      {pins.map((p) => (
        <span key={p.t} style={{ left: p.x, top: p.y }} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-md border border-brand-red bg-background/85 px-1.5 py-0.5 text-[9.5px] font-bold sm:text-[11px]">
          <MapPin className="h-3 w-3 text-brand-red" /> {p.t}
        </span>
      ))}
    </div>
  );
}
