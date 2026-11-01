import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, Zap,
  Flame, XCircle, Info, Thermometer, Droplets, RotateCcw,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/kombi-calismiyor/kombi-calismiyor-kapak.jpg";
import elektrik from "@/assets/kombi-calismiyor/kombi-calismiyor-elektrik.jpg";
import basinc from "@/assets/kombi-calismiyor/kombi-calismiyor-basinc.jpg";
import gazVanasi from "@/assets/kombi-calismiyor/kombi-calismiyor-gaz-vanasi.jpg";
import arizaKodu from "@/assets/kombi-calismiyor/kombi-calismiyor-ariza-kodu.jpg";
import termostat from "@/assets/kombi-calismiyor/kombi-calismiyor-termostat.jpg";
import profesyonel from "@/assets/kombi-calismiyor/kombi-calismiyor-profesyonel.jpg";
import ctaFinal from "@/assets/kombi-calismiyor/kombi-calismiyor-tesisatci-cagir.jpg";

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
function Steps({ items }: { items: { title: string; body: string }[] }) {
  return <ol className="mt-5 grid gap-2">{items.map((s, i) => <li key={s.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-4"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-red text-[13px] font-black text-brand-red-foreground">{i + 1}</span><div><h3 className="text-[14px] font-extrabold">{s.title}</h3><p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.body}</p></div></li>)}</ol>;
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
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Kombi hâlâ çalışmıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Cihazlı teşhisle aynı gün <span className="text-brand-red">devreye alıyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul Avrupa ve Anadolu yakasında tüm markalarda acil kombi servisi. Arıza kodunu söyleyin, doğru parçayla gelelim. 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Gölge Tesisat teknisyeni telefonda müşteriyle konuşuyor, arkasında servis aracı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function KombiCalismiyorEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Kombi</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kapsamlı Rehber</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Kombi Neden <Hot>Çalışmıyor?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Ekranı sönük, ateşleme yapmayan veya arıza kodu veren kombinin en sık 10 nedenini; servis çağırmadan önce güvenle deneyebileceğiniz kontrollerle birlikte sıraladık.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Ekranı tamamen sönük bir kombi; kullanıcı açma düğmesine basıyor" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay"],[Clock,"Süre","5–15 dakika"],[Wrench,"Gerekli","Aletsiz kontrol"],[ShieldAlert,"Ana risk","Gaz &amp; elektrik"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="block text-[13px]" dangerouslySetInnerHTML={{ __html: v as string }} /></Card>;})}</div>
      </section>

      <Section n="02" label="Kısa Cevap" title={<>Önce 30 Saniyelik <Hot>Karar</Hot></>}>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_.9fr] lg:items-start">
          <div>
            <Card className="p-4"><p className="text-[14px] leading-relaxed">Kombi &ldquo;çalışmıyor&rdquo; dediğimizde aslında üç farklı durum vardır ve her birinin nedeni farklıdır. Doğru çözüme ulaşmanın ilk adımı, kombinizin tam olarak nasıl çalışmadığını tespit etmektir.</p></Card>
            <CheckList columns={2} items={["Ekran tamamen sönük → elektrik, sigorta veya priz sorununa bakın","Ekran yanıyor, ateşleme yok → gaz, su basıncı veya pompa sorununa bakın","Hata kodu var → kodu not edin, arıza koduna göre ilerleyin","Sıcak su var, kalorifer yok (veya tersi) → kısmi arıza, parça odaklı bakın"]} />
          </div>
          <Warning title="Gaz kokusu alıyorsanız">Hiçbir elektrikli düğmeye dokunmayın, kombiyi kurcalamayın. Gaz vanasını kapatın, ortamı havalandırın ve dışarıdan 0533 896 05 03 numaralı hattı arayın.</Warning>
        </div>
      </Section>

      <Section n="03" label="Neden 1–3" title={<>Elektrik, Basınç ve <Hot>Gaz</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Kombi arızalarının büyük bölümü bu üç temel beslemeden kaynaklanır ve çoğu aletsiz, birkaç dakikada kontrol edilebilir.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4"><Zap className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">1. Elektrik, Sigorta veya Priz</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Ekranı tamamen sönük kombide ilk şüpheli elektriktir. Sigortanın atmadığını, fişin tam oturduğunu ve kombinin açma/kapama düğmesinin açık olduğunu doğrulayın.</p></Card>
          <Card className="p-4"><Gauge className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">2. Su Basıncı Düşük (En Sık)</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Ekran yanıyor ama devreye girmiyorsa manometreye bakın: ibre 1 bar altındaysa doldurma musluğunu yavaşça açıp basıncı 1,5 bar'a getirin.</p></Card>
          <Card className="p-4"><Flame className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">3. Gaz Vanası Kapalı</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Ateşleme sesi yoksa gaz vanasını kontrol edin. Ocağı deneyin: ocak da yanmıyorsa sorun binadaki gaz kesintisidir.</p></Card>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Photo src={elektrik} alt="Sigorta kutusunda kombi sigortası kontrol ediliyor" caption="Ekran tamamen sönükse ilk durak sigorta kutusudur." />
          <Photo src={basinc} alt="Kombi manometresinde ibre kırmızı bölgede, 1 bar altında" caption="İdeal basınç soğukken 1–1,5 bar arasıdır." />
          <Photo src={gazVanasi} alt="Kombiye giden sarı doğalgaz vanası açık konuma çevriliyor" caption="Bakım veya tadilat sonrası vana kapalı kalmış olabilir." />
        </div>
        <InfoBox title="Basınç sürekli düşüyorsa">Doldurmaya rağmen basınç tekrar düşüyorsa sistemde su kaçağı vardır; <Link to="/blog/$slug" params={{ slug: "kombi-basinci-neden-duser" }} className="font-bold text-brand-red underline underline-offset-2">kombi basıncı neden düşer</Link> rehberinde ayrıntılı anlattık.</InfoBox>
      </Section>

      <Section n="04" label="Neden 4–7" title={<>Arıza Kodu, Ateşleme, Hava ve <Hot>Termostat</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Card className="p-4"><RotateCcw className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">4. Kombi Arıza Kodu Gösteriyor</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Ekrandaki kodu not edin ve reset düğmesiyle bir kez yeniden başlatın. Kod tekrar ediyorsa üst üste reset atmayın; markaya özel anlamını araştırıp servise bildirin.</p></Card>
          <Card className="p-4"><Flame className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">5. Ateşleme Yapmıyor</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">&ldquo;Tık tık&rdquo; sesi var ama alev tutmuyorsa ateşleme elektrodu veya alev sensörü sorunlu olabilir. Gaz ve basınç sağlamsa bu teknik servis işidir.</p></Card>
          <Card className="p-4"><Droplets className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">6. Hava Yapmış / Pompa Sıkışmış</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Yaz sonrası ilk çalıştırmada sistem hava yapabilir. Peteklerin havasını alın; pompa hâlâ çalışmıyorsa servis müdahalesi gerekir.</p></Card>
          <Card className="p-4"><Thermometer className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">7. Termostat Ayarı veya Pili</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Kablosuz oda termostatının pili bitmiş ya da mod &lsquo;yaz&rsquo; konumunda kalmış olabilir. Termostatı yüksek değere alıp kombiyi test edin.</p></Card>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Photo src={arizaKodu} alt="Kombi ekranında kırmızı arıza uyarısı, kullanıcı reset düğmesine basıyor" caption="Kodu not edin; bir kez reset yeterlidir, tekrar ediyorsa servis gerekir." />
          <Photo src={termostat} alt="Kablosuz oda termostatının pilleri değiştiriliyor" caption="En sık atlanan neden: bitik termostat pili." />
        </div>
        <InfoBox title="Peteklerin havasını almak">Hava alma işlemini kendiniz güvenle yapabilirsiniz; adım adım <Link to="/blog/$slug" params={{ slug: "petek-havasi-nasil-alinir" }} className="font-bold text-brand-red underline underline-offset-2">petek hava alma rehberine</Link> bakın. İşlem sonrası basıncı tekrar kontrol edin.</InfoBox>
      </Section>

      <Section n="05" label="Neden 8–10" title={<>Kısmi Arıza, Kaçak ve <Hot>Ana Kart</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4"><Wrench className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">8. Sadece Sıcak Su veya Sadece Kalorifer Yok</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Tek fonksiyon çalışmıyorsa sorun genelde üç yollu vana, eşanjör veya sensördür. Önce yaz/kış modunu doğrulayın; sürüyorsa parça düzeyinde arızadır.</p></Card>
          <Card className="p-4"><Droplets className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">9. Kaçak Nedeniyle Basınç Tutmuyor</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Basınç sürekli düşüyorsa kombi altı, petek vanaları ve zeminde nem arayın. Görünür kaçak yoksa gömülü boruda olabilir; cihazlı tespit gerekir.</p></Card>
          <Card className="p-4"><ShieldAlert className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[15px] font-extrabold">10. Eski Kombi / Ana Kart Arızası</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">Tüm kontroller başarısızsa elektronik kart, fan veya gaz valfi arızalı olabilir. 10+ yaş kombilerde tekrarlayan arıza parça yorgunluğudur.</p></Card>
        </div>
        <InfoBox title="Gizli kaçak şüphesi">Görünmeyen kaçaklar kırmadan, termal kamera ve akustik cihazla noktasal bulunur: <Link to="/blog/$slug" params={{ slug: "kirmadan-su-kacagi-tespiti" }} className="font-bold text-brand-red underline underline-offset-2">kırmadan su kaçağı tespiti</Link>.</InfoBox>
      </Section>

      <Section n="06" label="Kontrol Listesi" title={<>Servis Çağırmadan Önce <Hot>Hızlı Kontrol</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Aşağıdaki adımları sırayla denediğinizde kombi arızalarının büyük bölümünü servis çağırmadan çözebilirsiniz. Liste bittiğinde sorun devam ediyorsa, güvenli ve doğru çözüm profesyonel servistir.</p>
        <Steps items={[
          { title: "Elektrik, sigorta, priz", body: "Kombi besleniyor mu? Sigorta atmamış, fiş tam oturmuş ve açma düğmesi açık olmalı." },
          { title: "Manometre", body: "Basınç 1–1,5 bar mı? Düşükse doldurma musluğuyla 1,5 bar'a getirin." },
          { title: "Gaz vanası ve ocak", body: "Vana açık mı? Ocak yanmıyorsa binada gaz kesintisi vardır." },
          { title: "Hata kodu", body: "Ekranda kod var mı? Not edin ve bir kez reset deneyin." },
          { title: "Oda termostatı", body: "Açık, pili sağlam ve mod 'kış' konumunda mı?" },
        ]} />
        <CTA />
      </Section>

      <Section n="07" label="Güvenlik Sınırı" title={<>Bunları <Hot>Kendiniz Yapmayın</Hot></>}>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {["Gaz hattını, gaz valfini veya brülörü sökmeyin","Kombinin iç kapağını açıp elektrot/sensör kurcalamayın","Üst üste reset atmayın; alttaki sorunu büyütür","Basıncı 2 bar üzerine çıkarmayın","Gaz kokusunda elektrikli hiçbir düğmeye dokunmayın","Ana kart ve fan müdahalesi yalnızca yetkili servis işidir"].map((t) => <li key={t} className="flex items-start gap-2.5 rounded-lg border border-brand-red/40 bg-brand-red/5 p-3 text-[13px] leading-snug"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{t}</span></li>)}
        </ul>
        <Warning title="Tekrarlayan arıza = profesyonel teşhis">Aynı kod sürekli dönüyorsa sorun parça düzeyindedir. Doğru teşhis, gereksiz parça değişiminin önüne geçer; çok eski kombilerde tamir maliyeti yüksekse cihaz değişimi de değerlendirilmelidir.</Warning>
      </Section>

      <Section n="08" label="Profesyonel Süreç" title={<>Servis Geldiğinde <Hot>Ne Olur?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Ekibimiz arızayı tahmine değil ölçüme dayalı teşhis eder: arıza kodu okunur, gaz basıncı ve ateşleme test edilir, pompa ve eşanjör kontrol edilir. Markası ne olursa olsun kombinizi cihazlı teşhisle hızlıca devreye alırız; gerekli parça değişimini onayınızla ve garantili yaparız.</p>
        <Photo className="mt-5" src={profesyonel} alt="Teknisyen tablet ile açık kombinin iç bileşenlerini teşhis ediyor" caption="Cihazlı teşhis, arızanın tam yerini görüntüye ve ölçüme dayalı olarak doğrular." />
        <DataTable headers={["Aşama","Kontrol edilen","Yöntem","Sonuç"]} rows={[["Ön görüşme","Arıza kodu ve belirtiler","Belirti analizi","Olası neden daraltılır"],["Besleme kontrolü","Elektrik, gaz, su basıncı","Ölçüm ve test","Dış nedenler elenir"],["İç teşhis","Pompa, eşanjör, elektrot, kart","Cihazlı test ve görüntüleme","Arızalı parça doğrulanır"],["Onarım","Tespit edilen parça","Orijinal parça değişimi","Sorun kaynağında çözülür"],["Son test","Tüm fonksiyonlar","Kontrollü çalıştırma","Kalıcı sonuç teyit edilir"]]} />
        <CTA final />
      </Section>

      <Section n="09" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}>
        <div className="mt-5 grid gap-2">{faq.map((f) => <details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90" /></summary><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div>
      </Section>
    </main>
  </div>;
}
