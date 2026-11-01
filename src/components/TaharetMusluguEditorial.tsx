import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Clock, Droplets, Home, Menu,
  MessageCircle, Phone, ShieldCheck, Sparkles, Wrench, Gauge, Search, Settings, Waves,
  CircleDot, Hammer, RefreshCw, ListChecks, MapPin, ThumbsUp,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/taharet/taharet-kapak.jpg";
import overview from "@/assets/taharet/taharet-system-overview.jpg";
import componentsImg from "@/assets/taharet/taharet-parcalari.jpg";
import tools from "@/assets/taharet/taharet-aletler.jpg";
import problems from "@/assets/taharet/taharet-problem-finder.jpg";
import preparation from "@/assets/taharet/taharet-preparation.jpg";
import installation from "@/assets/taharet/taharet-installation.jpg";
import leakTest from "@/assets/taharet/taharet-leak-test.jpg";
import removal from "@/assets/taharet/taharet-removal.jpg";
import oldNew from "@/assets/taharet/taharet-old-new.jpg";
import gasket from "@/assets/taharet/taharet-gasket.jpg";
import leverRepair from "@/assets/taharet/taharet-lever-repair.jpg";
import proService from "@/assets/taharet/taharet-profesyonel-servis.jpg";

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
  return <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">{items.map(([title, body], i) => <li key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-3.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{String(i + 1).padStart(2, "0")}</span><div className="min-w-0"><h3 className="text-[14px] font-extrabold">{title}</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{body}</p></div></li>)}</ol>;
}
function Warning({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-brand-red/50 bg-brand-red/10 p-4"><AlertTriangle className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold text-brand-red">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-foreground/80">{children}</div></div></div>;
}
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Profesyonel yardım mı lazım?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Taharet musluğu sorununuzu <span className="text-brand-red">büyümeden çözelim.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul genelinde 7/24 servis, ücretsiz keşif ve garantili işçilik.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={proService} alt="Taharet musluğunu kontrol eden profesyonel tesisatçı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

const problemsData = [
  ["Uçtan damlıyor", "İç conta, kartuş veya kapanma mekanizması aşınmış olabilir."],
  ["Hortum ekinden kaçırıyor", "Conta eksik, ezilmiş ya da bağlantı gevşek olabilir."],
  ["Kol suyu kesmiyor", "Kartuş, mil contası veya kumanda mekanizması kontrol edilir."],
  ["Duvardan su geliyor", "Ara musluk, dişli bağlantı veya gizli hat kaçağı olabilir."],
  ["Yeni montaj yapılacak", "Çıkış, hortum, conta ve ürün uyumu birlikte doğrulanır."],
];
const parts = [
  ["Fıskiye başlığı", "Suyu yönlendirir; uçtan damlamada iç mekanizma kontrol edilir."],
  ["Aç-kapa kolu", "Akışı başlatır ve durdurur; modele göre kartuş veya valf kullanır."],
  ["Örgülü hortum", "Su kaynağı ile başlığı birleştirir; ezik ve pas olmamalıdır."],
  ["Ara musluk", "Sistemi ana hattan ayırır; bakım öncesi mutlaka kapatılır."],
  ["Conta ve rakor", "Uyumlu bağlantılarda sızdırmazlığı sağlar; eski conta tekrar kullanılmaz."],
];

export function TaharetMusluguEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Banyo</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Taharet Musluğu Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Taharet Musluğu Nasıl <Hot>Takılır, Değiştirilir ve Tamir Edilir?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Montaj, değişim, damlatma sorunları ve güvenli tamir için eksiksiz adım adım rehber.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Modern banyoda krom taharet musluğu, hortum ve ara vana" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Orta · 3/5"],[Clock,"Tahmini süre","30–45 dakika"],[Wrench,"Gerekli alet","Anahtar, conta"],[AlertTriangle,"Ana risk","Duvar bağlantısı"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Giriş" title={<>Doğru Montaj <Hot>Neden Önemli?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="border-l-2 border-brand-red pl-4 text-[15px] leading-relaxed text-foreground/85">Taharet musluğu basit görünse de doğrudan evin su hattına bağlıdır. Yanlış oturan conta, gevşek hortum veya hasarlı ara musluk sürekli damlama ve fayans arkasında gizli neme yol açabilir.</p><div className="mt-4 grid gap-2">{[[Droplets,"Su kaçağını önler"],[Settings,"Akışı güvenilir biçimde kontrol eder"],[ShieldCheck,"Seramik ve duvar bağlantısını korur"]].map(([I,t])=>{const Icon=I as typeof Droplets; return <Card key={t as string} className="flex items-center gap-3 p-3"><Icon className="h-5 w-5 text-brand-red"/><b className="text-[13px]">{t as string}</b></Card>})}</div></div><Photo src={overview} alt="Taharet musluğunun vana, hortum ve başlıktan oluşan bağlantı sistemi" caption="Sistemi oluşturan parçaların tamamı erişilebilir ve kuru kalmalıdır." /></div>
      </Section>

      <Section n="03" label="Kısa Cevap" title={<>Kendiniz <Hot>Takabilir misiniz?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Standart ve görünür bir sistemde; ara musluk sağlamsa, duvar çıkışı hasarsızsa ve bağlantılar uyumluysa temel deneyimle montaj yapılabilir. Gömme tesisat, kapanmayan vana veya duvardan gelen su profesyonel müdahale ister.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">{[["01","Ara musluk","Suyu güvenle keser."],["02","Örgülü hortum","Besleme ile başlığı bağlar."],["03","Musluk gövdesi","Akışı açar ve kapatır."]].map(([n,t,d])=><Card key={n} className="p-4"><span className="text-[11px] font-black text-brand-red">{n}</span><h3 className="mt-2 font-extrabold">{t}</h3><p className="mt-1 text-[12.5px] text-muted-foreground">{d}</p></Card>)}</div>
        <Photo src={componentsImg} alt="Taharet musluğu başlığı, hortumu, ara vanası, kartuşu ve contalarının ayrılmış görünümü" className="mt-5" />
        <Steps items={[["Suyu kapatın","Ara musluğu kapatıp kalan basıncı boşaltın."],["Eski parçayı çıkarın","Bağlantıyı destekleyerek, zorlamadan sökün."],["Diş ve contaları inceleyin","Hasarlı, sertleşmiş veya eksik parçaları yenileyin."],["Yeni sistemi bağlayın","Dişleri elle başlatın; çapraz takmayın."],["Suyu yavaşça açın","Basıncı bir anda vermeyin."],["Kaçak testi yapın","Her eki kuru bezle ayrı ayrı kontrol edin."]]} />
      </Section>

      <Section n="04" label="Başlamadan Önce" title={<>Aletler, Malzemeler ve <Hot>Güvenlik</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr]"><Photo src={tools} alt="Taharet musluğu montajında gereken anahtar, teflon, conta, hortum ve bez" /><CheckList items={["Ayarlı anahtar veya kurbağacık", "Bağlantıya uygun conta ve yedek hortum", "Yalnızca uygun dişlerde kullanılacak PTFE bant", "Kuru mikrofiber bez ve küçük kap", "Mevcut ürüne uyumlu musluk veya kartuş", "Krom yüzeyi korumak için yumuşak bez"]} /></div>
        <Photo src={preparation} alt="Montaj öncesi ara musluğu kapatan tesisatçı" className="mt-5" caption="Sökmeden önce suyu kesin, basıncı boşaltın ve zemini koruyun." />
        <Warning title="Eski bağlantıyı zorlamayın">Paslı, kireçli veya dönmeyen ara musluğa aşırı kuvvet uygulamak duvar içindeki bağlantıyı kırabilir.</Warning>
      </Section>

      <Section n="05" label="Hızlı Teşhis" title={<>Hangi Sorunu <Hot>Yaşıyorsunuz?</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start"><div className="grid gap-2">{problemsData.map(([t,d],i)=><Card key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/50 text-[11px] font-black text-brand-red">0{i+1}</span><div><h3 className="text-[14px] font-extrabold">{t}</h3><p className="mt-1 text-[12px] text-muted-foreground">{d}</p></div></Card>)}</div><Photo src={problems} alt="Taharet musluğunda uç, hortum, kol ve duvar bağlantısı kaçak noktaları" /></div><CTA />
      </Section>

      <Section n="06" label="Parçalar" title={<>Taharet Musluğu <Hot>Nasıl Çalışır?</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{parts.map(([t,d],i)=><Card key={t} className="p-3"><CircleDot className="h-5 w-5 text-brand-red"/><span className="mt-2 block text-[10px] font-black text-brand-red">0{i+1}</span><h3 className="mt-1 text-[14px] font-extrabold">{t}</h3><p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{d}</p></Card>)}</div>
      </Section>

      <Section n="07" label="Sistem Tipleri" title={<>Açık, Gömme ve <Hot>Entegre Sistemler</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Açık duvar tipi","Bağlantılar görünür; bakım ve değişim daha kolaydır."],["Gömme sistem","Valf gövdesi duvar içindedir; erişim ve uyum uzmanlık ister."],["Entegre klozet","Ürüne özel bağlantı ve kontrol mekanizması kullanılabilir."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="font-extrabold text-brand-red">{t}</h3><p className="mt-2 text-[13px] text-muted-foreground">{d}</p></Card>)}</div><Warning title="Bağlantı ölçüsünü varsaymayın">Her ürün aynı diş ölçüsü, hortum veya conta düzenini kullanmaz. Mevcut parçayı sökmeden önce model ve üretici talimatını kontrol edin.</Warning>
      </Section>

      <Section n="08" label="Hazırlık" title={<>Yeni Montaja <Hot>Nasıl Hazırlanılır?</Hot></>}>
        <Steps items={[["Duvar çıkışını inceleyin","Korozyon, çatlak, kireç ve bozuk diş arayın."],["Ara musluğu kapatın","Kapanmıyorsa üst hattı güvenle izole edin."],["Kalan suyu boşaltın","Başlığı çalıştırarak hortumdaki basıncı alın."],["Alanı koruyun","Bağlantının altına bez ve kap yerleştirin."],["Uyumu doğrulayın","Yeni hortum, conta ve bağlantıyı eskisiyle karşılaştırın."]]} />
      </Section>

      <Section n="09" label="Montaj" title={<>Yeni Taharet Musluğu <Hot>Adım Adım</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><Steps items={[["Dişleri temizleyin","Kireç ve eski sızdırmazlık malzemesini tamamen çıkarın."],["Contayı yerleştirin","Hortum rakorunda uygun lastik contanın düz oturduğunu kontrol edin."],["PTFE'yi doğru yerde kullanın","Sadece uyumlu konik boru dişinde, sıkma yönünde uygulayın."],["Elle başlatın","Hortum ve gövdeyi çapraz diş kaptırmadan elle ilerletin."],["Kontrollü sıkın","Bağlantının tipine göre uygun anahtar kullanın; aşırı güç uygulamayın."]]} /><Photo src={installation} alt="Taharet musluğu hortumunu contasıyla ara vanaya bağlayan eller" caption="Conta ile sızdırmazlık sağlayan hortum rakoruna gelişigüzel teflon sarılmaz." /></div>
      </Section>

      <Section n="10" label="Son Kontrol" title={<>Montaj Sonrası <Hot>Kaçak Testi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><Steps items={[["Tüm ekleri gözden geçirin","Hortum, vana, gövde ve duvar çıkışını kontrol edin."],["Suyu yavaş açın","Yeni bağlantıya basıncı kademeli verin."],["Kuru bez testi yapın","Nem ilk hangi noktada oluşuyor görün."],["Kumandayı deneyin","Akışın başladığını ve tamamen durduğunu doğrulayın."],["Yeniden kontrol edin","Birkaç kullanımdan sonra bağlantılara tekrar bakın."]]} /></div><Photo src={leakTest} alt="Taharet musluğu bağlantısını kuru bezle kontrol eden tesisatçı" /></div>
      </Section>

      <Section n="11" label="Söküm" title={<>Eski Musluğu <Hot>Güvenle Çıkarın</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={removal} alt="Eski taharet musluğu bağlantısını karşı destekle söken tesisatçı" /><div><CheckList items={["Ara musluğu kapatıp akışın durduğunu doğrulayın.", "Başlığa basarak hortumdaki suyu boşaltın.", "Zemini kap ve bezle koruyun.", "Duvar bağlantısını karşı anahtarla destekleyin.", "Eski conta, çatlak hortum ve hasarlı rakoru tekrar kullanmayın."]} /></div></div>
      </Section>

      <Section n="12" label="Değişim Kararı" title={<>Ne Zaman Komple <Hot>Değiştirilmeli?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><CheckList items={["Gövde çatlak veya belirgin biçimde korozyonluysa", "Kumanda mekanizması ağır hasarlıysa", "Uygun kartuş veya conta bulunamıyorsa", "Dişler sıyrılmış ve bağlantı tutmuyorsa", "Onarımdan sonra kaçak tekrarlıyorsa"]} /></div><Photo src={oldNew} alt="Kireçli eski ve yeni krom taharet musluğu karşılaştırması" /></div>
      </Section>

      <Section n="13" label="Kaçak Noktası" title={<>Su Nereden <Hot>Kaçırıyor?</Hot></>}>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[12.5px]"><thead className="bg-brand-red text-brand-red-foreground"><tr><th className="p-3">Belirti</th><th className="p-3">Olası neden</th><th className="p-3">İlk işlem</th></tr></thead><tbody>{[["Uçtan damlama","Kartuş / iç conta","Ana hattı kapatıp mekanizmayı inceleyin"],["Hortum rakorunda su","Conta / gevşeklik","Contayı oturtup kontrollü sıkın"],["Kol dibinde nem","Mil contası / kartuş","Uyumlu iç parçayı yenileyin"],["Duvar rozetinde su","Ara musluk / gizli bağlantı","Suyu kesin, profesyonel tespit alın"]].map(r=><tr key={r[0]} className="border-t border-border odd:bg-surface/70">{r.map((c,i)=><td key={c} className={cn("p-3",i===0&&"font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="14" label="Conta Tamiri" title={<>Hasarlı Conta <Hot>Nasıl Değiştirilir?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={gasket} alt="Eski çatlamış conta ile yeni taharet musluğu contası" /><Steps items={[["Suyu kesin","Ara musluğu kapatıp basıncı boşaltın."],["Kaçıran eki sökün","Hortum veya rakoru zorlamadan ayırın."],["Eski contayı inceleyin","Sertleşme, ezilme ve çatlak arayın."],["Uyumlu yenisini takın","Doğru ölçüde contayı düz yerleştirin."],["Bağlayıp test edin","Suyu kademeli açıp kuru bezle kontrol edin."]]} /></div><Warning title="Conta her sorunu çözmez">Hasarlı diş, çatlak rakor veya bozuk kartuş yalnızca conta değiştirerek onarılamaz.</Warning><CTA />
      </Section>

      <Section n="15" label="Kol Tamiri" title={<>Aç-Kapa Kolu Suyu <Hot>Kesmiyorsa</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Sertleşen, gevşeyen veya suyu tamamen kesmeyen kolun nedeni iç conta, kartuş, gevşek kumanda ya da kireç olabilir. Ürün sökülebilir yapıdaysa uyumlu parça ile onarım yapılır.</p><CheckList items={["Suyu kapatın ve basıncı boşaltın.", "Kolu ve sabitleme parçasını üretici sırasıyla çıkarın.", "Kartuşta kireç, çatlak ve conta aşınması arayın.", "Yalnızca modele uyumlu parçayı takın.", "Toplayıp aç-kapa ve sızıntı testi yapın."]} /></div><Photo src={leverRepair} alt="Taharet musluğu kol mekanizması ve kartuşunu inceleyen eller" /></div>
      </Section>

      <Section n="16" label="Hatalar" title={<>Sık Hatalar ve <Hot>Usta Gereken Durumlar</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Contayı unutmak","Hortum rakoru doğru oturmaz ve ekten su kaçırır."],["Her dişe PTFE sarmak","Contalı rakorun yüzeye tam oturmasını engelleyebilir."],["Aşırı sıkmak","Dişi, rakoru veya sızdırmazlık yüzeyini bozabilir."],["Uyumsuz hortum takmak","Ölçü ve conta geometrisi farklıysa bağlantı güvenli olmaz."],["Duvar sızıntısını görmezden gelmek","Gizli kaçak fayans arkasında büyüyebilir."],["Kapanmayan vanayı zorlamak","Eski vana veya duvar bağlantısı kırılabilir."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><AlertTriangle className="h-4 w-4 text-brand-red" />{t}</h3><p className="mt-2 text-[12.5px] text-muted-foreground">{d}</p></Card>)}</div>
        <Warning title="Profesyonel yardım alın">Su güvenle kesilemiyorsa, duvar bağlantısı kaçırıyorsa, boru dişi hasarlıysa, fayans arkasında nem varsa veya gömme sistem açılacaksa işlemi durdurun.</Warning>
      </Section>

      <Section n="17" label="Profesyonel Destek" title={<>Montaj ve Tamirde <Hot>Yanınızdayız</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Taharet musluğu montajı, hortum ve conta değişimi, bozuk ara musluk, kartuş tamiri ve gizli kaçak kontrolünde İstanbul genelinde hizmet veriyoruz.</p><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Wrench,"Doğru montaj"],[Search,"Kaçak tespiti"],[RefreshCw,"Parça değişimi"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Wrench;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div><CTA final />
      </Section>

      {faq.length > 0 && <Section n="18" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"su-vanasi-nasil-kapatilir-acilir"}} className="font-bold text-brand-red underline">Su vanasını kapatma rehberi</Link><Link to="/blog/$slug" params={{slug:"ac-kapa-taharet-muslugu-conta-degisimi"}} className="font-bold text-brand-red underline">Conta değişimi rehberi</Link><Link to="/hizmet/$slug" params={{slug:"musluk-batarya-degisimi"}} className="font-bold text-brand-red underline">Musluk ve batarya servisi</Link></div></Section>}
    </main>
  </div>;
}
