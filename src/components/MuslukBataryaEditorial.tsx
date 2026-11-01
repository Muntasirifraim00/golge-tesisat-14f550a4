import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, Search, Droplets, ShieldAlert,
  FileText, ThumbsUp, Settings,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/musluk-batarya/musluk-batarya-kapak.jpg";
import tipler from "@/assets/musluk-batarya/musluk-batarya-tipler.jpg";
import suKapama from "@/assets/musluk-batarya/musluk-batarya-su-kapama.jpg";
import sorunlar from "@/assets/musluk-batarya/musluk-batarya-sorunlar.jpg";
import baslik from "@/assets/musluk-batarya/musluk-batarya-baslik.jpg";
import kartus from "@/assets/musluk-batarya/musluk-batarya-kartus.jpg";
import perlator from "@/assets/musluk-batarya/musluk-batarya-perlator.jpg";
import conta from "@/assets/musluk-batarya/musluk-batarya-conta.jpg";
import sikismis from "@/assets/musluk-batarya/musluk-batarya-sikismis.jpg";
import tamirDegisim from "@/assets/musluk-batarya/musluk-batarya-tamir-degisim.jpg";
import profesyonel from "@/assets/musluk-batarya/musluk-batarya-profesyonel.jpg";
import ctaFinal from "@/assets/musluk-batarya/musluk-batarya-tesisatci-cagir.jpg";

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
function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  return <ul className={cn("mt-5 grid gap-2", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-3")}>{items.map((item) => <li key={item} className="flex items-start gap-2.5 rounded-lg border border-border bg-surface/70 p-3 text-[13px] leading-snug"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{item}</span></li>)}</ul>;
}
function Steps({ items }: { items: Array<[string, string]> }) {
  return <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">{items.map(([title, body], i) => <li key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-3.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{String(i + 1).padStart(2, "0")}</span><div className="min-w-0"><h3 className="text-[14px] font-extrabold">{title}</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{body}</p></div></li>)}
  </ol>;
}
function Warning({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-brand-red/50 bg-brand-red/10 p-4"><AlertTriangle className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold text-brand-red">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-foreground/80">{children}</div></div></div>;
}
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Musluk hâlâ damlatıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Tamir işini <span className="text-brand-red">uzmana bırakın.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul genelinde 7/24 servis, ücretsiz keşif ve garantili işçilik.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="İstanbul'da bir apartmanın önünde duran servis aracı ve elinde takım çantasıyla binaya yürüyen tesisatçı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

const problemsData = [
  ["Kapalıyken damlıyor (aç-kapa)", "Aşınmış salmastra/conta — başlık değişimi çözer."],
  ["Kapalıyken damlıyor (tek kollu)", "Yıpranmış seramik kartuş — aynı ölçü kartuşla değişin."],
  ["Kol sertleşmiş / zor dönüyor", "Kireçlenmiş veya bozuk kartuş — kartuş değişimi gerekir."],
  ["Su zayıf / sıçratarak akıyor", "Kireç tıkalı süzgeç — perlatör temizliği veya değişimi."],
  ["Bağlantıdan (rakor) sızıyor", "Gevşek diş / eski conta — teflon bant + conta."],
  ["Gövde çatlamış / diş sıyrılmış", "Eskime, aşırı sıkma — komple armatür değişimi."],
];

export function MuslukBataryaEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Su Tesisatı</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Musluk ve Batarya Tamir Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Musluk ve Batarya Tamiri: <Hot>Başlık ve Kartuş Değişimi</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Damlayan, sertleşen ya da gevşeyen muslukların çoğu, ucuz bir başlık, kartuş veya conta değişimiyle dakikalar içinde tamir edilir.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Bir kişinin elinde pense ile tek kollu krom lavabo bataryasının seramik kartuşunu sökmesi; sökülen parçalar lavabo kenarına sırayla dizilmiş" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Orta · 3/5"],[Clock,"Tahmini süre","30–60 dakika"],[Wrench,"Gerekli alet","Anahtar seti + yedek parça"],[ShieldAlert,"Ana risk","Yanlış kartuş / gevşek bağlantı"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Teşhis" title={<>Önce Tipini Belirleyin: <Hot>Aç-Kapa mı, Tek Kollu mu?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="border-l-2 border-brand-red pl-4 text-[15px] leading-relaxed text-foreground/85">Tamir yöntemi armatürün tipine göre değişir. İki ayrı yuvarlak musluğu elinizle birkaç tur çevirerek açıp kapatıyorsanız bu klasik aç-kapa (başlıklı) musluktur; suyu içindeki başlık ve salmastra keser. Tek bir kolu yukarı-aşağı ve sağa-sola oynatıyorsanız bu tek kollu (kartuşlu) bir bataryadır; akışı seramik kartuş yönetir.</p><div className="mt-4 grid gap-2">{[[Droplets,"Aç-kapa muslukta sorun çoğunlukla başlık/salmastradadır"],[Settings,"Tek kollu bataryada sorun çoğunlukla kartuştadır"],[AlertTriangle,"Duvara gömülü ankastre batarya uzman işidir"],[Search,"Tipi bilmek, doğru yedek parçayı almanın anahtarıdır"]].map(([I,t])=>{const Icon=I as typeof Droplets; return <Card key={t as string} className="flex items-center gap-3 p-3"><Icon className="h-5 w-5 text-brand-red"/><b className="text-[13px]">{t as string}</b></Card>})}</div></div><Photo src={tipler} alt="Solda klasik iki volanlı aç-kapa musluk ve pirinç başlığı, sağda tek kollu batarya ve seramik kartuşu" caption="Solda aç-kapa musluk: damlama pirinç başlıktaki salmastradan olur. Sağda tek kollu batarya: damlama seramik kartuştan kaynaklanır." /></div>
        <div className="mt-5 min-w-0 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[12.5px]"><thead className="bg-brand-red text-brand-red-foreground"><tr><th className="p-3">Özellik</th><th className="p-3">Salmastralı başlık (aç-kapa)</th><th className="p-3">Seramik kartuş (tek kollu)</th></tr></thead><tbody>{[["Nasıl açılır?","Birkaç tur çevrilerek","Kol çeyrek tur / yukarı-aşağı"],["Damlatma nedeni","Lastik pul (salmastra) aşınması","Seramik disk çizilmesi / kireç"],["Yedek parça","Başlık veya salmastra pulu","Aynı ölçü ve marka kartuş"],["Ölçü nasıl alınır?","Diş sayısı ve başlık boyu","Çap (35/40 mm) ve diş sayısı"],["Zorluk","Kolay","Orta"]].map(r=><tr key={r[0]} className="border-t border-border odd:bg-surface/70">{r.map((c,i)=><td key={c} className={cn("p-3",i===0&&"font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="03" label="Kısa Cevap" title={<>Musluk Damlatıyorsa <Hot>Ne Değişir?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Su akıtan bir musluk ya da kapalıyken damlayan bir batarya, çoğu evde yaşanan ama büyük tamir gerektirmeyen bir sorundur. Arızaların neredeyse tamamı pahalı bir armatür değişimiyle değil, içindeki ucuz bir parçanın — aç-kapa musluklarda başlık (salmastra), tek kollu bataryalarda kartuş, çıkışta perlatör veya bağlantıda conta — yenilenmesiyle çözülür.</p>
        <CheckList columns={2} items={["Aç-kapa musluk damlatıyorsa: başlık (salmastra) değişimi", "Tek kollu batarya damlatıyorsa: seramik kartuş değişimi", "Su zayıf/sıçrıyorsa: perlatör temizliği veya değişimi", "Bağlantıdan sızıyorsa: teflon bant + conta", "Yedek parçayı alırken eskisini örnek götürün", "Gövde çatlaksa tamir değil, komple değişim gerekir"]} />
      </Section>

      <Section n="04" label="Başlamadan Önce" title={<>İlk Adım: <Hot>Su Girişini Kapatın</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={suKapama} alt="Lavabo altındaki sıcak ve soğuk su ara musluklarından (köşe vanası) birini kapatan bir el" caption="Çoğu lavabo ve evyenin altında sıcak ve soğuk için ayrı iki ara musluk (köşe vanası) bulunur." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Her musluk ve batarya tamirinin ilk adımı, o armatüre giden suyu kesmektir. Lavabo altındaki ara muslukları saat yönünde çevirerek kapatın; ara musluk yoksa dairenin ana su vanasını kapatın. Ardından musluğu açıp hattaki kalan suyu boşaltın ve kesintiyi doğrulayın.</p><CheckList items={["Lavabo altındaki sıcak/soğuk ara muslukları kapatın", "Ara musluk yoksa dairenin ana su vanasını kapatın", "Musluğu açıp hattaki kalan suyu boşaltın", "Gideri bezle tıkayın; küçük vidalar kaçmasın", "Söktüğünüz parçaları sırayla bir kenara dizin"]} /></div></div>
      </Section>

      <Section n="05" label="Hızlı Teşhis" title={<>Hangi Belirtiyi <Hot>Yaşıyorsunuz?</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start"><div className="grid gap-2">{problemsData.map(([t,d],i)=><Card key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/50 text-[11px] font-black text-brand-red">0{i+1}</span><div><h3 className="text-[14px] font-extrabold">{t}</h3><p className="mt-1 text-[12px] text-muted-foreground">{d}</p></div></Card>)}</div><Photo src={sorunlar} alt="Dört yaygın musluk sorunu: damlayan musluk, zor dönen kol, yana sıçratan perlatör ve bağlantıdan sızan su" /></div>
        <Warning title="Bu adımda zorlanıyorsanız">Kartuş yuvaya tam oturmazsa veya sıcak-soğuk yönü karışırsa batarya damlatmaya devam eder. Eski bataryalarda vida ve rekorlar paslı olabilir; zorlamayın. Profesyonel ekibimizden destek alabilirsiniz.</Warning><CTA />
      </Section>

      <Section n="06" label="Aç-Kapa Musluk" title={<>Başlık (Salmastra) <Hot>Değişimi</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Aç-kapa bir musluk kapalıyken damlıyorsa neden, içindeki başlığın conta/salmastrasının aşınmasıdır. Musluğun üstündeki kapakçığı (kırmızı/mavi renk göstergesi) ince bir tornavidayla kaldırın, altındaki vidayı söküp volanı çıkarın; pirinç başlık görünür hâle gelir. Başlığı uygun boy anahtarla (genellikle 17–19 mm) saat yönünün tersine çevirerek sökün.</p><Steps items={[["Kapakçığı kaldırın","Üstteki renk göstergesini ince tornavidayla kaldırıp altındaki vidayı sökün."],["Volanı çıkarın","Vidayı söktükten sonra kolu/volanı yukarı çekerek çıkarın."],["Başlığı sökün","Pirinç başlığı uygun anahtarla saat yönünün tersine çevirerek sökün."],["Yenisini takın","Başlığın tamamını aynı ölçüde yenisiyle değiştirin; çaprazlamadan, aşırı sıkmadan oturtun."]]} /></div><Photo src={baslik} alt="Elinde aşınmış lastik contalı eski pirinç musluk başlığı; yanında yepyeni aynı ölçüde başlık" caption="Conta yerine başlığın tamamını aynı ölçüde yenisiyle değiştirmek en sağlıklısıdır; başlıklar çok ucuzdur." /></div>
      </Section>

      <Section n="07" label="Tek Kollu Batarya" title={<>Seramik Kartuş <Hot>Değişimi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={kartus} alt="Tek kollu bataryadan eski seramik kartuşu düz çekerek çıkaran eller; yanında yeni kartuş" caption="Yeni kartuşu alırken eskisini yanınızda götürün: kartuşlar çap (35/40 mm) ve oturma şekli olarak farklıdır." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tek kollu bir batarya damlıyor, kolu sertleşmiş ya da sıcak-soğuğu düzgün ayarlamıyorsa sorun seramik kartuştadır. Kolun yan/alt tarafındaki gizli vida kapağını açıp kolu yukarı çekin; kromaj bileziği ve plastik halkayı söktüğünüzde kartuşu tutan büyük somun görünür.</p><CheckList items={["Koldaki gizli imbus vidasını açıp kolu yukarı çekin", "Bilezik ve halkayı söküp kartuş somununu açın", "Kartuşu düz çekerek çıkarın; yenisini alırken eskisini götürün", "Çap ve yön çentiği uyumlu kartuşu oturtup somunu sıkın", "Suyu açıp sızdırmazlığı ve sıcak-soğuk yönünü test edin"]} /></div></div>
      </Section>

      <Section n="08" label="Zayıf Akış" title={<>Perlatör Temizliği <Hot>veya Değişimi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Musluğun ucundan gelen su zayıfladıysa, her yöne sıçrıyorsa veya kireç tortusuyla düzensiz akıyorsa sorun büyük ihtimalle musluk ucundaki küçük süzgeç olan perlatördür. Perlatör suya hava katarak yumuşak akış sağlar; içindeki elek zamanla kireç ve tortuyla tıkanır. Bu küçük bakım, çoğu zaman "su basıncım düştü" sanılan sorunu tek başına çözer.</p><CheckList items={["Ucundaki perlatörü saat tersine çevirerek sökün", "Sirkeli suda bekletip diş fırçasıyla kireci temizleyin", "Deforme/tıkalı eleği komple yeni perlatörle değiştirin", "Geri takarken contasını unutmayın ve elle sıkın", "Çoğu 'basınç düşüklüğü' aslında tıkalı perlatördür"]} /></div><Photo src={perlator} alt="Parçalarına ayrılmış kireçli musluk perlatörü: elek, plastik gövde ve metal halka; yanında sirke kabı ve diş fırçası" caption="Perlatörü sirkeli suda bekletip diş fırçasıyla temizlemek çoğu zayıf akış sorununu çözer." /></div>
      </Section>

      <Section n="09" label="Ara Musluk" title={<>Taharet Musluğu / Ara Musluk <Hot>Contası Değişimi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={conta} alt="Küçük krom ara musluğun dişlerine beyaz teflon bant saran eller; yanında aşınmış lastik conta" caption="Bağlantıdan sızıyorsa dişlere dönüş yönünde 3–4 tur teflon bant sarmak çoğu zaman sorunu çözer." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Taharet musluğu veya lavabo altındaki ara musluk damlıyorsa çözüm yine içindeki contayı veya başlığı yenilemektir. Önce o hatta giden suyu kapatın; volanı söküp başlığı çıkarın ve uçtaki aşınmış lastik contayı aynı ölçüde yenisiyle değiştirin.</p><CheckList items={["Önce o hatta giden suyu kapatın", "Volanı/başlığı söküp aşınmış lastik contayı yenileyin", "Bağlantıdan sızıyorsa dişlere teflon bant sarın", "Bandı dişin döndüğü yönde 3–4 tur sarın", "Plastik rakorları aşırı sıkmayın; çatlayabilir"]} /></div></div>
      </Section>

      <Section n="10" label="Zor Durum" title={<>Sökülmeyen, Sıkışmış Musluğu <Hot>Nasıl Sökersiniz?</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tamirin en sinir bozucu anı, kartuş somununun veya pirinç başlığın yıllardır kireçlenip adeta kaynamış gibi dönmemesidir. En büyük hata kaba kuvvettir: zorlanan krom gövde çatlar, dişler sıyrılır ve basit bir tamir komple armatür değişimine dönüşür. Doğru yöntem kuvvet değil, kireci çözmek ve metali genleştirmektir.</p><CheckList items={["Kaba kuvvet uygulamayın; gövde çatlar, dişler sıyrılır", "Sıkışan dişe kireç çözücü/sirke damlatıp 15–30 dk bekleyin", "Somunu saç kurutma makinesiyle ısıtın; metal genleşip gevşer", "Tam oturan anahtar kullanın; krom yüzeye bez sarın", "Zorlamak gövdeyi kıracaksa durun; servis daha ucuza gelir"]} /></div><Photo src={sikismis} alt="Kireçlenmiş musluk somununa sirke damlatılırken saç kurutma makinesiyle ısıtılıyor; anahtarın altına bez sarılmış" caption="Kireci çözücüyle yumuşatıp metali ısıtmak, kaba kuvvetten çok daha etkilidir." /></div>
      </Section>

      <Section n="11" label="Karar" title={<>Tamir mi, <Hot>Komple Değişim mi?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Her arıza tamir edilmez; bazen yeni bir batarya almak hem daha ucuz hem daha mantıklıdır. Genel kural: sorun değişebilir bir iç parçadaysa (kartuş, başlık, salmastra, perlatör, conta) tamir edin — maliyeti çok düşüktür ve dakikalar sürer. Sorun bizzat gövdedeyse — krom dökülmüş, gövde çatlamış, gözenekten sızıyor ya da yedek parçası bulunamıyorsa — komple değişim daha doğrudur.</p><CheckList items={["İç parça arızası (kartuş/başlık/conta/perlatör): tamir et", "Gövde çatlağı, dökülmüş krom, gözenekten sızma: değiştir", "Çok eski + yedek parçası yok: değişim daha mantıklı", "Ankastre (duvara gömülü) sistemde değişim uzman işidir"]} /></div><Photo src={tamirDegisim} alt="Koyu tezgâhta terazi: bir yanda tamir edilmiş eski musluk ve yeni kartuş, diğer yanda kutusunda yeni mat siyah batarya" caption="Vakaların büyük çoğunluğu ucuz bir kartuş veya başlık değişimiyle çözülür; gövde arızalarında değişim gerekir." /></div>
      </Section>

      <Section n="12" label="Profesyonel Destek" title={<>Ne Zaman <Hot>Uzman Gerekir?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Sorun duvara gömülü (ankastre) bir bataryadaysa, sızıntı duvar içinden geliyorsa, bağlantı dişleri sıyrılmış ya da gövde çatlamışsa, bu basit bir parça değişiminin ötesine geçer. Ankastre bataryalarda yanlış müdahale duvarın açılmasına ve çok daha pahalı bir tamire yol açabilir.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Ankastre (gömme) batarya arızası","Mekanizma sıvanın içindedir; duvara zarar vermeden değişim uzman işidir."],["Duvar içinden gelen sızıntı","Gizli kaçağın yeri cihazla tespit edilip noktasal müdahale edilir."],["Sıyrılmış bağlantı dişleri","Kalıcı çözüm için bağlantının yenilenmesi gerekir."],["Gövde çatlağı","Tamir geçici kalır; komple armatür değişimi gerekir."],["Yedek parça bulunamıyorsa","Uygun yeni armatür seçimi ve montajı yapılır."],["Birden fazla armatür arızalıysa","Tesisat genel kontrolüyle kök neden bulunur."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><AlertTriangle className="h-4 w-4 text-brand-red" />{t}</h3><p className="mt-2 text-[12.5px] text-muted-foreground">{d}</p></Card>)}</div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Wrench,"Batarya tamiri"],[Search,"Kaçak tespiti"],[Droplets,"Musluk değişimi"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Wrench;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={profesyonel} alt="Eldivenli teknisyen, duvara gömülü ankastre bataryanın iç mekanizmasını tornavidayla onarıyor" caption="Ankastre batarya kartuşu/iç gövde değişimi duvara zarar vermeden yapılır." /><p className="text-[14px] leading-relaxed text-muted-foreground">Ekibimiz ankastre batarya kartuşu ve iç gövde değişimini duvara zarar vermeden yapar, sıyrılmış bağlantıları kalıcı biçimde yeniler ve duvar içinden gelen gizli sızıntılarda kaçağın yerini cihazla tespit eder. Basit bir başlık/kartuş değişiminin yeterli olduğu durumlarda ise sizi doğru yönlendirir, gereksiz işlem önermeyiz.</p></div><CTA final />
      </Section>

      {faq.length > 0 && <Section n="13" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"taharet-muslugu-nasil-takilir-degistirilir"}} className="font-bold text-brand-red underline">Taharet musluğu nasıl takılır?</Link><Link to="/blog/$slug" params={{slug:"su-vanasi-nasil-kapatilir-acilir"}} className="font-bold text-brand-red underline">Su vanası nasıl kapatılır?</Link><Link to="/hizmet/$slug" params={{slug:"musluk-batarya-degisimi"}} className="font-bold text-brand-red underline">Musluk ve batarya değişimi hizmeti</Link></div></Section>}
    </main>
  </div>;
}
