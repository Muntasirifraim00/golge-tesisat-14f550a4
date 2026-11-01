import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Droplets, Zap, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/camasir-su/camasir-su-kapak.jpg";
import filtre from "@/assets/camasir-su/camasir-su-filtre.jpg";
import hortum from "@/assets/camasir-su/camasir-su-hortum.jpg";
import pompa from "@/assets/camasir-su/camasir-su-pompa.jpg";
import gider from "@/assets/camasir-su/camasir-su-gider.jpg";
import servis from "@/assets/camasir-su/camasir-su-servis.jpg";
import ctaFinal from "@/assets/camasir-su/camasir-su-tesisatci-cagir.jpg";

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
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Makine suyu boşaltmıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Gideri kırmadan açıyor, <span className="text-brand-red">aynı gün çözüyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Gider açma, kameralı hat kontrolü ve bağlantı işleri; İstanbul genelinde 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Akşam İstanbul sokağında kırmızı servis aracı; tesisatçı alet çantasıyla apartmana yürüyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function CamasirSuEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Tesisat Arızaları</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Arıza Çözüm Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Çamaşır Makinesi <Hot>Su Boşaltmıyor</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Program bitiyor ama makinede su kalıyorsa sebep çoğu zaman pompa filtresi, tahliye hortumu veya gider tıkanıklığıdır.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Kazanında su birikmiş çamaşır makinesinin önünde endişeyle duran ev sahibi" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay · 2/5"],[Clock,"Süre","15–30 dakika"],[Wrench,"Gerekli","Bez + sığ kap"],[ShieldAlert,"Ana risk","Fiş takılı müdahale"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="İlk Kontrol" title={<>Önce Bu <Hot>Basit Kontrolleri</Hot> Yapın</>}>
        <CheckList items={["Program gerçekten bitti mi? Bazı programlar 'su durdurma' (kırışık önleme) adımında suyu makinede tutar; sıkma/tahliye programı seçip çalıştırın", "Elektrik kesintisi veya yarıda kalan program olduysa fişi çekip birkaç dakika bekleyin, yeniden takıp tahliye programını başlatın", "Tahliye hortumunun ucu yerden 60–100 cm yükseklikte olmalı; çok alçak bağlantı suyun geri kaçmasına, çok yüksek bağlantı boşaltamamaya yol açar"]} />
      </Section>

      <Section n="03" label="En Yaygın Neden" title={<>Pompa Filtresi <Hot>Nasıl Temizlenir?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Su boşaltma sorunlarının büyük bölümü tıkalı pompa filtresinden kaynaklanır. Filtre, makinenin sağ alt köşesindeki küçük kapağın arkasındadır; bozuk para, düğme, saç tokası ve tiftik burada birikir ve suyun pompaya ulaşmasını engeller.</p></div><Photo src={filtre} alt="Pompa filtresi sökülüyor; içinde bozuk para ve tiftik, altında kap ve havlu" caption="Filtreyi açmadan önce altına havlu ve sığ bir kap koyun; birikmiş su boşalacaktır." /></div>
        <Steps items={[
          { title: "Makinenin fişini çekin", body: "Güvenlik için önce elektrik bağlantısını kesin. Su ve elektrik bir aradayken asla fiş takılı çalışmayın." },
          { title: "Bez ve kap hazırlayın", body: "Filtre kapağının önüne kalın bir bez serin ve sığ bir kap yerleştirin; çıkacak suyu toplayacaktır." },
          { title: "Filtre kapağını açın", body: "Sağ alttaki küçük kapağı açın. Varsa tahliye hortumunun tıpasını çıkarıp suyu kaba boşaltın." },
          { title: "Filtreyi söküp temizleyin", body: "Filtreyi saat yönünün tersine çevirerek çıkarın. Cisimleri ayıklayın, filtreyi yıkayın, yuvayı kontrol edin." },
          { title: "Pervaneyi kontrol edin", body: "Yuvanın içindeki pompa pervanesinin serbest döndüğünden emin olun. Takılıysa cisim kaçmış olabilir." },
          { title: "Filtreyi takıp test edin", body: "Filtreyi sıkıca takın, kapağı kapatın ve tahliye programını çalıştırarak suyun boşaldığını izleyin." },
        ]} />
      </Section>

      <Section n="04" label="İkinci Şüpheli" title={<>Tahliye Hortumu ve <Hot>Gider Bağlantısı</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={hortum} alt="Makinenin arkasından çıkarılan kıvrımlı tahliye hortumu kovaya yönlendirilmiş" caption="Hortumu giderden çıkarıp kovaya yönlendirin; su güçlü akıyorsa hortum sağlamdır." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Filtre temizse ikinci şüpheli tahliye hortumudur. Makineyi hafifçe öne çekip hortumun kıvrılmadığını, ezilmediğini ve arkada sıkışmadığını kontrol edin. Hortum gider borusuna bağlıysa tıkanıklık gider tarafında olabilir. Yeni sifon takıldıysa rekorun içindeki kör tıpanın açılmamış olması sık yapılan bir montaj hatasıdır.</p></div></div>
      </Section>

      <Section n="05" label="Pompa Arızası" title={<>Tahliye Pompası Arızası <Hot>Nasıl Anlaşılır?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Filtre temiz, hortum açık ama makine yine suyu boşaltmıyorsa sorun tahliye pompasındadır. Pompa ölçümü ve değişimi cihazın elektrik devresine müdahale gerektirdiği için teknik servis işidir. Bazı modellerde durum ekranda hata kodu olarak görünür; kodun anlamı markaya göre değişir.</p></div><Photo src={pompa} alt="Eldivenli elde çamaşır makinesi tahliye pompası; kırık pervane kanadı görünüyor" caption="Uğultu var ama su gitmiyorsa pervane kırık veya yuvada cisim olabilir." /></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Belirti</th><th className="px-4 py-3">Olası neden</th><th className="px-4 py-3">Ne yapmalı</th></tr></thead><tbody className="divide-y divide-border">{[["Su kalıyor, tahliyede ses yok","Pompa bobini arızası, elektrik ulaşmıyor","Teknik servis çağırın"],["Uğultu var ama su gitmiyor","Pervane kırık veya yuvada cisim var","Filtreyi açıp pervaneyi kontrol edin"],["Hortumdan kovaya su güçlü akıyor","Gider hattı tıkalı","Gider açma yöntemlerini uygulayın"],["Filtre bölgesinden su kaçıyor","Filtre contası hasarlı veya filtre gevşek","Filtreyi sıkın; contayı yenileyin"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="06" label="Gider Hattı" title={<>Sorun Makinede Değil, <Hot>Gider Hattında Olabilir</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={gider} alt="Tıkalı ana gider nedeniyle lavabodan ve yer süzgecinden su geri taşıyor" caption="Makine basınçlı su gönderdiği için tıkalı hat suyu en yakın açık noktadan geri taşırır." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Çamaşır makinesi gideri çoğu evde mutfak veya banyo hattına bağlıdır. Hat tıkandığında makine suyu boşaltamaz. Makine tahliye olurken lavabodan su taşıyorsa veya yer süzgecinden su geri geliyorsa ana gider hattında tıkanıklık vardır — bu durumda tesisat müdahalesi gerekir.</p></div></div>
        <Warning title="Kimyasal açıcı kullanmayın">Kimyasal açıcılar hem borulara hem makine hortumuna zarar verebilir. Ayrıca filtre sökerken veya hortum çıkarırken makinenin fişi mutlaka çekili olmalıdır; makinede su varken kapıyı zorlamayın. Pompa, kablo veya kart arızası şüphesinde cihazın içini açmayın — elektrik çarpma riski vardır.</Warning>
        <CTA />
      </Section>

      <Section n="07" label="Karar" title={<>Ne Zaman Teknik Servis, <Hot>Ne Zaman Tesisatçı?</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><Zap className="h-5 w-5 text-brand-red" /> Teknik servis (cihaz)</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Filtre ve hortum temiz ama su boşalmıyor", "Pompadan hiç ses gelmiyor", "Ekranda hata kodu yanıyor", "Pompa değişimi ve elektrik kontrolü gerekli"].map(t=><li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{t}</li>)}</ul></Card><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><Droplets className="h-5 w-5 text-brand-red" /> Tesisatçı (gider hattı)</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Makine suyu hortumdan sağlıklı boşaltıyor ama gider kabul etmiyor", "Lavabo da yavaş akıyor", "Giderden geri taşma oluyor", "Tekrarlayan tıkanıklıkta kameralı hat kontrolü"].map(t=><li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{t}</li>)}</ul></Card></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><Photo src={servis} alt="Teknisyen multimetreyle çamaşır makinesinin pompa kablolarını ölçüyor" caption="Pompa ve elektrik kontrolü cihazın yetkili servisinin işidir." /><div className="grid grid-cols-2 gap-2">{[[Droplets,"Kırmadan gider açma"],[Gauge,"Kameralı hat kontrolü"],[Clock,"Aynı gün servis"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Gauge;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div></div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="08" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"gider-tikanikligi-nasil-acilir"}} className="font-bold text-brand-red underline">Gider tıkanıklığı nasıl açılır</Link><Link to="/blog/$slug" params={{slug:"camasir-makinesi-tahliye-hortumu-degistirme"}} className="font-bold text-brand-red underline">Tahliye hortumu değiştirme</Link><Link to="/hizmet/$slug" params={{slug:"tikaniklik-acma"}} className="font-bold text-brand-red underline">Tıkanıklık açma hizmeti</Link></div></Section>}
    </main>
  </div>;
}
