import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert,
  XCircle, Info, Thermometer, Flame, Snowflake, Settings,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/petek-isinmiyor/petek-isinmiyor-kapak.jpg";
import kombiModu from "@/assets/petek-isinmiyor/petek-isinmiyor-kombi-modu.jpg";
import basinc from "@/assets/petek-isinmiyor/petek-isinmiyor-basinc.jpg";
import havaAlma from "@/assets/petek-isinmiyor/petek-isinmiyor-hava-alma.jpg";
import vana from "@/assets/petek-isinmiyor/petek-isinmiyor-vana.jpg";
import camur from "@/assets/petek-isinmiyor/petek-isinmiyor-camur.jpg";
import profesyonel from "@/assets/petek-isinmiyor/petek-isinmiyor-profesyonel.jpg";
import ctaFinal from "@/assets/petek-isinmiyor/petek-isinmiyor-tesisatci-cagir.jpg";

const PHONE = "tel:+905338960503";
const WA = "https://wa.me/905338960503";
type Faq = { q: string; a: string };

const cn = (...v: Array<string | false | undefined>) => v.filter(Boolean).join(" ");
const Hot = ({ children }: { children: ReactNode }) => <span className="tm-hot">{children}</span>;
const Card = ({ children, className }: { children: ReactNode; className?: string }) => <div className={cn("rounded-lg border border-border bg-surface/75", className)}>{children}</div>;

function Kicker({ n, children }: { n: string; children: ReactNode }) {
  return <div className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> // {children} · {n}</div>;
}
function Section({ n, label, title, children, id }: { n: string; label: string; title: ReactNode; children: ReactNode; id?: string }) {
  return <section id={id} className="scroll-mt-20 border-t border-border/70 py-9 sm:py-12"><Kicker n={n}>{label}</Kicker><h2 className="max-w-4xl text-[30px] font-black leading-[1.05] sm:text-[42px]">{title}</h2>{children}</section>;
}
function Photo({ src, alt, caption, priority, className }: { src: string; alt: string; caption?: string; priority?: boolean; className?: string }) {
  return <figure className={cn("overflow-hidden rounded-lg border border-border bg-surface", className)}><img src={src} alt={alt} width={1536} height={864} loading={priority ? undefined : "lazy"} fetchPriority={priority ? "high" : undefined} className="aspect-video w-full object-cover" />{caption && <figcaption className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">{caption}</figcaption>}</figure>;
}
function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return <ul className={cn("mt-5 grid gap-2", columns === 2 && "sm:grid-cols-2")}>{items.map((item) => <li key={item} className="flex items-start gap-2.5 rounded-lg border border-border bg-surface/70 p-3 text-[13px] leading-snug"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{item}</span></li>)}</ul>;
}
function Warning({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-brand-red/50 bg-brand-red/10 p-4"><AlertTriangle className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold text-brand-red">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-foreground/80">{children}</div></div></div>;
}
function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-4"><Info className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{children}</div></div></div>;
}
function DataTable({ headers, rows, caption }: { headers: string[]; rows: string[][]; caption?: string }) {
  return <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[12.5px]"><thead><tr className="border-b border-border bg-surface">{headers.map((h) => <th key={h} className="px-3 py-2.5 font-extrabold">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-border/60 last:border-0">{r.map((c, j) => <td key={j} className={cn("px-3 py-2.5 align-top leading-snug", j === 0 ? "font-bold" : "text-muted-foreground")}>{c}</td>)}</tr>)}</tbody></table>{caption && <p className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">{caption}</p>}</div>;
}
function Steps({ items }: { items: { t: string; d: string }[] }) {
  return <ol className="mt-5 grid gap-2">{items.map((s, i) => <li key={s.t} className="flex gap-3 rounded-lg border border-border bg-surface/70 p-3.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{i + 1}</span><div><b className="text-[13.5px]">{s.t}</b><p className="mt-0.5 text-[12.5px] leading-snug text-muted-foreground">{s.d}</p></div></li>)}</ol>;
}
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Petekler hâlâ ısınmıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Yerinde teşhisle aynı gün <span className="text-brand-red">ısınmayı geri getiriyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul Avrupa ve Anadolu yakasında petek temizliği (power flush), pompa ve kombi servisi. Garantili işçilik, 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Gölge Tesisat teknisyeni telefonda müşteriyle konuşuyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function PetekIsinmiyorEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Isıtma &amp; Kombi</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kapsamlı Rehber</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Kombi Çalışıyor Ama <Hot>Petekler Isınmıyor</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Kombi çalışıyor, sıcak su bile var ama petekler soğuk mu? Nedeni tek değildir: yaz konumu, düşük basınç, hapsolmuş hava, kapalı vana, çamur veya pompa arızası. Adım adım ayırt edin.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Kış günü evinde soğuk kalan peteği eliyle kontrol eden kadın" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge, "Zorluk", "Kolay–Orta"], [Clock, "Süre", "10–30 dakika"], [Wrench, "Gerekli", "Purjör anahtarı"], [ShieldAlert, "Ana risk", "Yanlış teşhis"]].map(([I, l, v]) => { const Icon = I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>; })}</div>
      </section>

      <Section n="01" label="Kısa Cevap" title="30 saniyede karar verin">
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Card className="p-4"><Snowflake className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Tek petek soğuk</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Sorun o peteğe özeldir: hapsolmuş hava, kapalı/kısık vana veya peteğin içindeki çamur. Vanaları açın, havasını alın.</p></Card>
          <Card className="p-4"><Thermometer className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Bütün petekler soğuk</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Sorun sistem genelindedir: kombi yaz konumunda, basınç düşük, termostat kapalı veya sirkülasyon pompası dönmüyor.</p></Card>
          <Card className="p-4"><Flame className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Üstü sıcak, altı soğuk</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Önce hava alın. Hâlâ soğuksa alt kanallarda çamur/kireç birikintisi vardır — çözüm petek temizliğidir.</p></Card>
        </div>
        <CheckList columns={2} items={[
          "Petekleri tek tek elle yoklayıp soğuk olanları not edin",
          "Kombi modu kış (radyatör) konumunda mı kontrol edin",
          "Manometreye bakın: soğukken ideal ~1–1,5 bar",
          "Oda termostatı açık ve hedef sıcaklık odadan yüksek olmalı",
        ]} />
        <Warning title="Sürekli su eklemek zorunda kalıyorsanız">Basınç tek seferlik düştüyse normaldir; ama sürekli su basmak gerekiyorsa tesisatta gizli bir su kaçağı olabilir. Bunu görmezden gelmek hem faturayı şişirir hem de kombiye zarar verir — kaçak tespiti yaptırın.</Warning>
      </Section>

      <Section n="02" label="Teşhis" title="Önce ayırın: tek petek mi, hepsi mi soğuk?">
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Teşhisin en kritik adımı sorunun tek bir radyatörde mi yoksa tüm peteklerde mi olduğunu belirlemektir; çünkü bu iki durum tamamen farklı nedenlere işaret eder. Bu basit ayrım, sonraki tüm adımları doğru yöne yönlendirir.</p>
        <DataTable
          caption="Bu ayrımı yapmadan hava almak ya da su basmak çoğu zaman boşa giden emektir."
          headers={["Belirti", "Olası neden", "İlk müdahale"]}
          rows={[
            ["Tek/birkaç petek soğuk", "Hava, kapalı vana veya o petekte çamur", "Vanaları açın, purjörden hava alın"],
            ["Bütün petekler soğuk", "Kombi modu, basınç, termostat, pompa", "Mod + basınç + termostat kontrolü"],
            ["Üstü sıcak, altı soğuk", "Hava veya alt kanallarda çamur", "Önce hava alın; düzelmezse temizlik"],
            ["Havasını aldım, yine soğuk", "Peteğin içinde çamur/kireç birikintisi", "Profesyonel petek temizliği (power flush)"],
          ]}
        />
        <InfoBox title="Yerden ısıtmalı evlerde durum farklıdır">Yerden ısıtma sistemlerinde bölgesel soğukluk kolektör ayarı ve hat dengesizliğinden kaynaklanır; bu rehberdeki petek adımları orada geçerli değildir.</InfoBox>
      </Section>

      <Section n="03" label="Neden 1–2" title="Kombi modu ve su basıncı: en sık iki basit neden">
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <Photo src={kombiModu} alt="Kombinin kış (radyatör) konumuna alınan mod düğmesi" caption="Kombi yaz konumunda kalırsa sıcak su verir ama petekleri hiç ısıtmaz." />
            <Card className="mt-3 p-4"><Settings className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">1) Kombi yaz konumunda kalmış</h3><p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">Bütün petekler soğuksa kontrol edilecek ilk şey kombinin modudur. Kombiyi kış (radyatör) konumuna alın, ısıtma sıcaklık ayarını yükseltin ve oda termostatının açık olduğundan emin olun. Termostat hedefe &quot;ulaşıldı&quot; görüyorsa kombi ısıtmayı durdurur.</p></Card>
          </div>
          <div>
            <Photo src={basinc} alt="Kombi manometresi düşük kırmızı bölgede" caption="İbre kırmızı/düşük bölgedeyse kombi suyu peteklere gönderemez." />
            <Card className="mt-3 p-4"><Gauge className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">2) Su basıncı (bar) düşük</h3><p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">Soğukken ideal değer çoğu cihazda 1–1,5 bar civarıdır. Düşükse su doldurma musluğundan yavaşça su ekleyin. Basınç normalken petek soğuksa neden başka yerdedir; sürekli düşüyorsa gizli kaçak araştırılmalıdır.</p></Card>
          </div>
        </div>
      </Section>

      <Section n="04" label="Neden 3–4" title="Hapsolmuş hava ve kapalı vana: tek peteğin klasik nedenleri">
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <Photo src={havaAlma} alt="Purjör anahtarıyla peteğin havası alınıyor, altında kap ve bez" caption="Purjörden önce tıslayarak hava, ardından düzenli su gelmelidir." />
            <Card className="mt-3 p-4"><Thermometer className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">3) Petekte hava var</h3><p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">Tek petek soğuksa ya da üstü sıcak altı soğuksa klasik belirti havadır. Purjörü bez ve kap yardımıyla yavaşça açın; hava çıkışı durup düzenli su gelince kapatın. İşlem sonrası düşen kombi basıncını kontrol edip tamamlayın.</p></Card>
          </div>
          <div>
            <Photo src={vana} alt="Petek girişindeki krom vana açık konuma çevriliyor" caption="Tadilat veya temizlik sonrası vananın kısık kalması çok yaygındır." />
            <Card className="mt-3 p-4"><Wrench className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">4) Petek vanası kapalı veya kısık</h3><p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">Soğuk peteğin giriş (üst) ve dönüş (alt) vanalarını tam açık konuma getirin. Alt dönüşteki gizli denge vanası da kapalı olabilir. Vanalar açıkken petek hâlâ ısınmıyorsa sıradaki en olası neden içerideki çamur/kireçtir.</p></Card>
          </div>
        </div>
        <Steps items={[
          { t: "Peteğin iki ucundaki vanaları tam açın", d: "Giriş ve dönüş vanaları tam açık olmalı; denge vanasını da kontrol edin." },
          { t: "Purjörü bez + kap ile yavaşça açın", d: "Önce tıslayarak hava çıkar; düzenli su gelmeye başlayınca kapatın." },
          { t: "Kombi basıncını kontrol edin", d: "Hava alma sonrası basınç düşer; gerekirse 1–1,5 bara tamamlayın." },
          { t: "15–20 dakika bekleyip peteği yoklayın", d: "Hâlâ soğuksa neden hava değil, büyük olasılıkla çamur birikintisidir." },
        ]} />
      </Section>

      <Section n="05" label="Neden 5" title="Havasını aldım yine ısınmıyor: çamur ve kireç">
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <p className="text-[14px] leading-relaxed text-muted-foreground">En çok kafa karıştıran durum budur: havasını aldınız, vanalar açık, basınç normal — ama peteğin altı boydan boya hâlâ soğuk. Bu, neredeyse her zaman yıllar içinde biriken çamur, pas ve kireç anlamına gelir. Tortu peteğin alt kanallarını tıkar; sıcak su üstten dolaşsa bile alt bölüm ısınmaz.</p>
            <CheckList items={[
              "Belirti tipiktir: üst sıcak, alt soğuk ve hava almak işe yaramıyor",
              "Çözüm hava almak değil, çamurdan arındırmaktır",
              "Tek petekte söküp yıkama yeterli olabilir",
              "Sistem genelinde çamur için profesyonel petek temizliği (power flush) gerekir",
            ]} />
            <InfoBox title="Power flush ne sağlar?">Basınçlı su ve kimyasal sirkülasyonla yapılan temizlik hem ısınmayı geri getirir hem de kombinin ve pompanın ömrünü uzatır; çoğu evde ısınma faturasında hissedilir düşüş sağlar.</InfoBox>
          </div>
          <Photo src={camur} alt="Kesit görünümünde alt kanalları çamur ve pasla dolmuş panel petek" caption="Alt kanallardaki çamur tabakası sıcak suyun dolaşımını engeller." />
        </div>
        <CTA />
      </Section>

      <Section n="06" label="Neden 6" title="Sirkülasyon pompası dönmüyor: tüm petekler birden soğuk">
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Kombi çalıştığı, basınç ve mod doğru olduğu hâlde bütün petekler birden soğuksa, sıcak suyu sisteme basan sirkülasyon pompası dönmüyor olabilir. Pompa kombinin içindedir; arızası, kireçlenmesi ya da kış başlangıcında sıkışması yaygındır.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Card className="p-4"><Flame className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Pompa arızasının belirtileri</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Kombi ateşleme yapar ama su peteklere ulaşmaz; gidiş borusu kombi çıkışında sıcak, birkaç metre sonra soğuktur. Bazı cihazlarda pompa arıza kodu ekrana düşer.</p></Card>
          <Card className="p-4"><ShieldAlert className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Neden evde çözülmez?</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Pompa kombinin içindedir; kapağı açmak gaz ve elektrik güvenliği açısından yetkili servis işidir. Pompa tamiri veya değişimi garantili yapılmalıdır.</p></Card>
        </div>
        <Warning title="Kombi kapağını kendiniz açmayın">Kombi içindeki pompa, eşanjör veya sensör müdahalesi gaz kaçağı ve elektrik riski taşır; cihaz garantisini de geçersiz kılar. Bu aşamada yetkili teknik servis şarttır.</Warning>
      </Section>

      <Section n="07" label="Sınır" title="Bu noktada evde müdahaleyi bırakın">
        <div className="mt-5 grid gap-2">
          {[
            "Mod, basınç, termostat doğru; vanalar açık; hava alındı — ama petekler hâlâ soğuk",
            "Kombi ekranında tekrarlayan arıza kodu var",
            "Basınç sürekli düşüyor, sürekli su eklemek gerekiyor (gizli kaçak şüphesi)",
            "Kombiden olağandışı ses geliyor veya ateşleme yapıp hemen duruyor",
            "Peteklerin altı yıllardır soğuk; hava almak hiç işe yaramıyor (çamur)",
          ].map((t) => <div key={t} className="flex items-start gap-2.5 rounded-lg border border-brand-red/40 bg-brand-red/5 p-3 text-[13px] leading-snug"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{t}</span></div>)}
        </div>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Bu belirtilerden biri varsa sorun ayar değil, arıza veya tıkanmadır. Deneme yanılmayla geçen her gün kombiye ve pompaya ek yük bindirir; doğru teşhisle tek seferde çözülür.</p>
      </Section>

      <Section n="08" label="Profesyonel Süreç" title="Servis çağırdığınızda ne olur?">
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <Photo src={profesyonel} alt="Teknisyen sökülen peteğe power flush hortumlarını bağlıyor" caption="Power flush: basınçlı su ve kimyasal sirkülasyonla çamur arındırma." />
          <DataTable
            caption="İşlem çoğu evde aynı gün tamamlanır; ısınma farkı ilk gün hissedilir."
            headers={["Aşama", "Yapılan işlem"]}
            rows={[
              ["1. Teşhis", "Mod, basınç, termostat, vana ve pompa kontrolü; peteklerin ısı haritası"],
              ["2. Nedeni sabitleme", "Hava/ayar ise yerinde çözüm; pompa arızası ise parça değişimi"],
              ["3. Power flush", "Çamur varsa sistem basınçlı kimyasal sirkülasyonla temizlenir"],
              ["4. Dengeleme", "Petek vanaları dengelenir; her odanın eşit ısınması sağlanır"],
              ["5. Teslim", "Basınç ayarı, son kontrol ve bakım önerileriyle teslim"],
            ]}
          />
        </div>
        <CTA final />
      </Section>

      <Section n="09" label="SSS" title="Sıkça Sorulan Sorular" id="sss">
        <div className="mt-5 grid gap-2">
          {faq.map((f) => <details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90" /></summary><p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}
        </div>
      </Section>

      <footer className="border-t border-border/70 py-8 text-center text-[11px] text-muted-foreground">
        <p>Bu rehber Gölge Tesisat saha deneyimiyle hazırlanmıştır. Isıtma sorununuz çözülmediyse 7/24 bize ulaşın.</p>
        <div className="mt-3 flex justify-center gap-2"><a href={PHONE} className="rounded-full bg-brand-red px-4 py-2 font-black text-brand-red-foreground">0533 896 05 03</a><a href={WA} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-4 py-2 font-black">WhatsApp</a></div>
      </footer>
    </main>
  </div>;
}
