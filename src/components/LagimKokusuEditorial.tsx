import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, Wind,
  Droplets, XCircle, Info,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/lagim-kokusu/lagim-kokusu-kapak.jpg";
import sifonMantik from "@/assets/lagim-kokusu/lagim-kokusu-sifon-mantik.jpg";
import kuruSifon from "@/assets/lagim-kokusu/lagim-kokusu-kuru-sifon.jpg";
import conta from "@/assets/lagim-kokusu/lagim-kokusu-conta.jpg";
import tikanikCamur from "@/assets/lagim-kokusu/lagim-kokusu-tikanik-camur.jpg";
import baca from "@/assets/lagim-kokusu/lagim-kokusu-baca.jpg";
import profesyonel from "@/assets/lagim-kokusu/lagim-kokusu-profesyonel.jpg";
import ctaFinal from "@/assets/lagim-kokusu/lagim-kokusu-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Koku bir türlü geçmiyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Kaynağını kamerayla bulup <span className="text-brand-red">kalıcı çözüyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul Avrupa ve Anadolu yakasında kanal görüntüleme, spiral/hidrojet temizliği, conta değişimi ve havalandırma çözümü. 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Koku sorunu çözülmüş, tertemiz ve ferah modern bir banyo" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function LagimKokusuEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Tıkanıklık &amp; Gider</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kapsamlı Rehber</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Giderden Gelen Lağım Kokusu <Hot>Nasıl Giderilir?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Kuru sifon, çürük conta, boru içi çamur ve baca sorununu ayıran; kokuyu bastırmak yerine kaynağında bitiren kalıcı çözüm rehberi.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Banyo yer süzgecinden yükselen lağım kokusu; karanlık fayanslı modern banyo" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay–Orta"],[Clock,"Süre","10–30 dakika"],[Wrench,"Gerekli","Su + eldiven"],[ShieldAlert,"Ana risk","Yanlış teşhis"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Kısa Cevap" title={<>30 Saniyelik <Hot>Karar Kartı</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Giderden gelen lağım kokusunun en sık dört nedeni kuruyan sifon, çürümüş conta, boru içi birikinti (tıkanıklık) ve havalandırma (baca) sorunudur. Önce kokan gidere bol su döküp sifonu doldurun; koku geri geliyorsa conta ve tıkanıklık kontrolü, hâlâ sürüyorsa kanal görüntüleme ile kaynağın bulunması gerekir. Kokuya parfüm, çamaşır suyu ya da koku gidericilerle saldırmak yalnızca birkaç saat kazandırır; çünkü kokunun çıktığı yer giderin kendisidir.</p>
        <CheckList columns={2} items={["Koku tek giderden mi, tüm giderlerden mi — önce bunu tespit edin","İlk deneme: kokan gidere 1-2 litre su dökün","Koku kullanımdan bağımsız ve sürekliyse contaya bakın","Yavaş akışla birlikte koku varsa tıkanıklık düşünün","Bir gider çalışınca başka gider fokurduyorsa baca sorunu olabilir","Koku geri geliyorsa bastırmayı bırakıp kaynağı arayın"]} />
        <Warning title="Koku gidericiyle örtmek çözüm değildir">Parfüm ve koku gidericiler belirtiyi birkaç saat maskeler; kanalizasyon gazı içeri sızmaya devam eder. Sürekli ve keskin lağım kokusu uzun süre solunmamalıdır; ortamı havalandırın ve kaynağı bulun.</Warning>
      </Section>

      <Section n="03" label="Mantık" title={<>Lağım Kokusu <Hot>Nereden Gelir?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Her gider noktasının altında, içinde sürekli su bulunduran bir sifon (su tutucu/koku kapanı) vardır. Bu su, kanalizasyon boşluğu ile eviniz arasında görünmez bir tıkaç görevi görür: pis su aşağı akar, ama yukarıdan gelen koku ve gazlar bu su perdesini geçemez. Yani sağlıklı bir tesisatta koku, içerideki suyun varlığıyla durdurulur. Eve lağım kokusu geliyorsa, bu su perdesi bir noktada bozulmuş demektir: ya sifondaki su buharlaşıp kurumuştur, ya bir conta/bağlantı eskiyip kanalizasyon havasının sızmasına izin vermektedir, ya borularda biriken çamur kokmaktadır ya da tesisatın havalandırması (çatı bacası) sorunludur.</p>
        <Photo className="mt-5" src={sifonMantik} alt="Lavabo altındaki sifonun kesit görünümü; su perdesi kanalizasyon gazını bloke ediyor" caption="Sifondaki su perdesi, kanalizasyon gazının eve geçmesini engelleyen tek bariyerdir; bu perde bozulunca koku doğrudan içeri girer." />
        <DataTable caption="Kokunun karakteri, dört ana nedenden hangisine işaret ettiğini büyük ölçüde ele verir." headers={["Neden","Tipik belirti","Ne zaman artar","Evde çözülebilir mi"]} rows={[["Kuru sifon","Az kullanılan giderden koku","Uzun süre su akmayınca","Evet — su dökerek"],["Çürük/eksik conta","Sürekli, kullanımdan bağımsız koku","Gün boyu sabit","Kısmen — conta değişimi"],["Boru içi çamur","Yavaş akış + koku birlikte","Su kullanıldıkça","Hafifse evet"],["Havalandırma (baca)","Fokurtu ve rüzgârla artan koku","Rüzgârlı havalarda","Hayır — tesisat işi"]]} />
      </Section>

      <Section n="04" label="Neden 1" title={<>Kuruyan Sifon: <Hot>En Sık ve En Kolay Neden</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Az kullanılan bir lavabo, yedek banyo, yer süzgeci ya da çamaşır makinesi giderinde su uzun süre kullanılmazsa sifondaki su buharlaşır. Su perdesi kaybolunca kanalizasyon kokusu doğrudan eve geçer. Bu, özellikle yazlıklarda, misafir banyolarında ve nadiren kullanılan yer süzgeçlerinde en yaygın koku nedenidir. Çözüm son derece basittir: o gidere bol su dökerek sifonu yeniden doldurmak. Koku birkaç saat içinde geri gelmiyorsa neden buydu demektir; gelmeye devam ediyorsa sonraki nedenlere geçin.</p>
        <Steps items={[
          { title: "Kokan gidere 1-2 litre su dökün", body: "Sifonun yeniden dolmasını sağlayın. Su perdesi oluştuysa koku dakikalar içinde kesilmelidir." },
          { title: "Buharlaşmayı yavaşlatın", body: "Az kullanılan giderlerde suyun üzerine bir kapak sıvı yağ ekleyin; yağ tabakası buharlaşmayı yavaşlatır ve koku kapanını uzun süre korur." },
          { title: "Yer süzgeçlerini düzenli sulayın", body: "Nadiren kullanılan süzgeçlere haftada bir su dökerek sifonun kurumasını önleyin." },
          { title: "Sonucu gözleyin", body: "Koku gittiyse sorun kuru sifondu. Birkaç saat içinde geri geliyorsa conta veya tıkanıklık kontrolüne geçin." },
        ]} />
        <Photo className="mt-5" src={kuruSifon} alt="Az kullanılan banyo yer süzgecine kovayla su dökülüyor; kuruyan sifon yeniden dolduruluyor" caption="Az kullanılan giderlere düzenli su dökmek, kuru sifon kaynaklı kokunun en basit ve kalıcı önlemidir." />
      </Section>

      <Section n="05" label="Neden 2" title={<>Çürük veya Eksik Conta: <Hot>Sürekli Sızan Koku</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Sifon takıldığı yerde, klozetin tabana bağlandığı noktada ve boru ek yerlerinde lastik contalar bulunur. Bu contalar zamanla sertleşir, çatlar veya yerinden kayar. Conta görevini yapamayınca kanalizasyon havası bağlantı boşluğundan içeri sızar ve koku kullanımdan bağımsız olarak, gün boyu hissedilir. Klozet tabanından gelen ısrarlı koku neredeyse her zaman çürük taban contasına işaret eder. Sifonun gevşemiş rakorunu elle sıkmak ya da kuruyan körük/conta değişimi çoğu durumda kalıcı çözüm sağlar; ancak klozet taban contasının değişimi klozetin sökülüp sızdırmaz biçimde yeniden monte edilmesini gerektirir.</p>
        <CheckList columns={2} items={["Sifon rakoru gevşekse elle (zorlamadan) sıkın","Sertleşmiş/çatlamış körük ve contaları yenisiyle değiştirin","Klozet tabanından koku geliyorsa taban contası büyük olasılıkla çürümüştür","Conta değişimi sonrası su dökerek sızdırmazlığı test edin","Sifon bağlantısını bilmiyorsanız sökmeden destek alın","Taban contası değişimi genellikle uzman işidir"]} />
        <Photo className="mt-5" src={conta} alt="Tesisatçı lavabo sifonu bağlantısındaki eski lastik contayı yenisiyle değiştiriyor" caption="Sertleşmiş veya çatlamış conta, su sızdırmadan bile kanalizasyon havasını içeri geçirir; koku kullanımdan bağımsız hissedilir." />
        <InfoBox title="Klozet taban kokusu ayrı bir konudur">Klozetin tabanından gelen ısrarlı koku ve nem, taban contası arızasına işaret eder. Bu durumun detaylı teşhis ve çözümünü <Link to="/blog/$slug" params={{ slug: "tuvalet-klozet-kokusu-nasil-giderilir" }} className="font-bold text-brand-red underline underline-offset-2">tuvalet ve klozet kokusu rehberinde</Link> anlattık.</InfoBox>
      </Section>

      <Section n="06" label="Neden 3" title={<>Tıkanıklık ve Boru İçi Çamur: <Hot>Yavaş Akış + Koku</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Gider yavaş akıyor, bazen "glu glu" ses çıkarıyor ve bununla birlikte koku da geliyorsa, sorun büyük olasılıkla boru içinde biriken yağ, saç, sabun ve organik atık tabakasıdır. Bu birikinti hem suyun akışını yavaşlatır hem de çürüyerek koku üretir. Yüzeydeki kokuyu temizlemek burada işe yaramaz; kokunun kaynağı boru cidarındaki çamurdur. Hafif birikintilerde sıcak su + karbonat/sirke kombinasyonu ve mekanik pompa ile yağ tabakası gevşetilebilir; ancak tekrarlayan veya birden fazla gideri etkileyen tıkanıklıklarda spiral makinesi veya basınçlı su (hidrojet) ile borunun cidarına kadar temizlenmesi gerekir.</p>
        <CheckList columns={2} items={["Aşındırıcı asit bazlı açıcıları sık kullanmayın; borulara ve contalara zarar verir","Tek gideri etkiliyorsa karbonat-sirke + sıcak su + pompa deneyin","Birden çok gider birden yavaşlıyorsa sorun ana hatta olabilir","Tekrarlayan tıkanıklık + koku: profesyonel spiral/hidrojet temizliği gerekir","Koku tıkanıklıkla birlikte başladıysa kaynak boru içindedir","Kamerayla görüntüleme, kokunun tam yerini gösterir"]} />
        <Photo className="mt-5" src={tikanikCamur} alt="Tesisatçı motorlu spiral makinesiyle banyo giderindeki çamur tabakasını temizliyor" caption="Boru cidarına yapışan çamur tabakası hem akışı yavaşlatır hem koku üretir; spiral veya hidrojetle kökten temizlenir." />
        <Warning title="Kimyasal açıcı döktüyseniz durun">Gidere asit bazlı açıcı, çamaşır suyu veya başka kimyasal eklediyseniz pompa ve sökme işlemi uygulamayın; sıçrama ve yanık riski vardır. Kullandığınız ürünü gelen uzmana mutlaka söyleyin.</Warning>
      </Section>

      <Section n="07" label="Neden 4" title={<>Havalandırma (Baca) Sorunu: <Hot>Sifonu Boşaltan Gizli Neden</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Tesisatın çatıdaki havalandırma borusu (pis su bacası), borularda akış sırasında oluşan basıncı dengeler. Bu baca tıkalıysa veya hiç yoksa, bir yerde su boşaldığında oluşan emiş başka bir giderdeki sifon suyunu içeri çeker. Sonuç: hiç dokunmadığınız bir giderden, özellikle başka bir su tesisatı çalışırken veya rüzgâr estiğinde, aniden koku gelmesidir. Belirtisi tipiktir: bir yerde sifonu çektiğinizde başka bir giderden "fokurtu" duyulur. Havalandırma kaynaklı kokular kullanıcı müdahalesiyle çözülmez; bacanın açılması veya havalandırma vanası (mekanik havalık) eklenmesi gibi tesisat işlemleri gerektirir.</p>
        <CheckList columns={2} items={["Belirti: bir gider çalışınca başka giderden fokurtu/koku gelir","Rüzgârlı havalarda artan koku çoğu zaman baca kaynaklıdır","Çözüm: pis su bacasının açılması veya havalandırma vanası montajı","Bu sorun evde kalıcı çözülemez; tesisat müdahalesi gerekir","Defalarca sifon doldurmanıza rağmen koku dönüyorsa bacayı düşünün","Yanlış teşhis, aylarca süren gereksiz denemelere yol açar"]} />
        <Photo className="mt-5" src={baca} alt="Apartman çatısındaki pis su havalandırma bacası; şehir manzarası fonunda" caption="Çatıdaki pis su bacası tıkandığında, giderlerdeki sifon suyu emişle boşalır ve koku hiç dokunulmayan giderlerden bile içeri girer." />
      </Section>

      <Section n="08" label="Güvenlik Sınırı" title={<>Hangi Belirtilerde <Hot>Denemeyi Bırakın?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Sifonu doldurmanıza ve görünür contaları kontrol etmenize rağmen koku geri geliyorsa, sorun artık yüzeyin altındadır: ya boru içinde temizlenmesi gereken bir çamur tabakası, ya değişmesi gereken bir taban contası, ya da düzeltilmesi gereken bir havalandırma sorunu vardır. Bu noktada denemeyi sürdürmek zaman ve para kaybıdır.</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">{["Sifon doldurulduğu hâlde koku saatler içinde geri geliyor","Koku birden fazla giderden aynı anda geliyor","Gider yavaş akıyor ve fokurduyor","Klozet tabanında nem veya ıslaklık var","Rüzgâr estikçe koku şiddetleniyor","Gidere kimyasal döküldü ve koku sürüyor","Koku haftalardır kesilmiyor","Alt kattan veya ortak hattan şikâyet geliyor"].map((item) => <li key={item} className="flex items-start gap-2.5 rounded-lg border border-brand-red/40 bg-brand-red/5 p-3 text-[13px] leading-snug"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{item}</span></li>)}</ul>
        <CTA />
      </Section>

      <Section n="09" label="Profesyonel Süreç" title={<>Kalıcı Çözüm: <Hot>Kaynağı Bulup Bitirmek</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Ekibimiz kokunun kaynağını sistemli biçimde tespit eder: gerekirse kanal görüntüleme kamerasıyla boru içini inceler, spiral veya hidrojetle çamur tabakasını söker, eskiyen conta ve körükleri değiştirir ve havalandırma eksikliğini giderir. İşlem sonunda kokunun tekrar etmeyeceğinden emin olmak için tüm gider noktalarını birlikte test ederiz — amacımız kokuyu birkaç günlüğüne değil, kalıcı olarak bitirmektir.</p>
        <Photo className="mt-5" src={profesyonel} alt="Tesisatçı kanal görüntüleme kamerasıyla banyo giderinin içini monitörde inceliyor" caption="Kamera görüntüleme, kokunun tam yerini ve nedenini tahmine değil görüntüye dayalı olarak doğrular." />
        <DataTable headers={["Aşama","Kontrol edilen","Kullanılan yöntem","Beklenen sonuç"]} rows={[["Ön görüşme","Kokunun yeri, süresi ve karakteri","Belirti analizi","Olası neden daraltılır"],["Sifon ve conta kontrolü","Tüm gider noktaları","Gözle ve su testiyle inceleme","Yüzeysel nedenler elenir"],["Boru içi inceleme","Çamur, tıkanıklık, hasar","Kamera ile kanal görüntüleme","Kaynak görüntüyle doğrulanır"],["Temizlik / onarım","Tespit edilen bölge","Spiral, hidrojet, conta değişimi","Koku kaynağı ortadan kaldırılır"],["Son test","Tüm gider noktaları","Kontrollü su ve akış testi","Kalıcı sonuç teyit edilir"]]} />
        <InfoBox title="Kokuyla birlikte tıkanıklık da varsa">Yavaş akış ve koku birlikteyse sorun büyük olasılıkla boru içi birikintidir; adım adım açma yöntemlerini <Link to="/blog/$slug" params={{ slug: "gider-tikanikligi-nasil-acilir" }} className="font-bold text-brand-red underline underline-offset-2">gider tıkanıklığı açma rehberinde</Link> bulabilirsiniz.</InfoBox>
        <CTA final />
      </Section>

      <Section n="10" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}>
        <div className="mt-5 grid gap-2">{faq.map((f) => <details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90" /></summary><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div>
      </Section>
    </main>
  </div>;
}
