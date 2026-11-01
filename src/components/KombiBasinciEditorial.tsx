import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/kombi-basinc/kombi-basinc-kapak.jpg";
import suEkleme from "@/assets/kombi-basinc/kombi-basinc-su-ekleme.jpg";
import kacak from "@/assets/kombi-basinc/kombi-basinc-kacak.jpg";
import profesyonel from "@/assets/kombi-basinc/kombi-basinc-profesyonel.jpg";
import ctaFinal from "@/assets/genlesme-tanki/genlesme-tanki-tesisatci-cagir.jpg";
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
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Her hafta su mu ekliyorsunuz?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Kaçağı kırmadan bulup <span className="text-brand-red">aynı gün çözüyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Kombi basınç arızası, gizli kaçak tespiti ve kombi bakımı; İstanbul genelinde 7/24. Keşif ücretsizdir.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Karlı gece İstanbul sokağında apartman önünde kırmızı tesisat servis aracı; tesisatçı zili çalıyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function KombiBasinciEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Kombi</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kombi Arıza Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Kombi Basıncı <Hot>Sürekli Düşüyor mu?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Nedenleri, kombiye güvenli su ekleme ve kaçağın yerini evde daraltma — kalıcı çözüm rehberi.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Kombi ön panelinde kırmızı bölgede düşük basınç gösteren manometre" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay · 2/5"],[Clock,"Su ekleme","5 dakika"],[Wrench,"Gerekli","Alet gerekmez"],[ShieldAlert,"Ana risk","Gizli kaçağı ihmal"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Kısa Cevap" title={<>Basınç Neden Düşünce <Hot>Kombi Durur?</Hot></>}>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><p className="text-[14px] leading-relaxed text-muted-foreground">Kombinin ısıtma tarafı; kombi, borular ve peteklerden oluşan kapalı bir devredir. Basınç belirli seviyenin altına inince kombi, eşanjörün aşırı ısınmasını önlemek için kendini durdurur ve hata kodu verir. Yani durmak bir arıza değil, korumadır. Doğru basınç aralığı markaya göre değişir; en güvenilir kaynak kullanım kılavuzu ve göstergedeki yeşil bölgedir.</p>
        <Card className="overflow-hidden"><table className="w-full text-[12.5px]"><thead className="bg-surface"><tr>{["Gösterge","Anlamı","Ne yapmalı?"].map(h=><th key={h} className="p-2.5 text-left font-black">{h}</th>)}</tr></thead><tbody>{[["Yeşil aralıkta","Normal","Bir şey gerekmez"],["Yeşilin altında","Düşük","Soğukken su ekleyin"],["Sık sık düşüyor","Su kaybı var","Kaçağı arayın"],["Kırmızı üst bölge","Yüksek","Kombiyi kapatın, servis"]].map(r=><tr key={r[0]} className="border-t border-border">{r.map(c=><td key={c} className="p-2.5">{c}</td>)}</tr>)}</tbody></table></Card></div>
      </Section>

      <Section n="03" label="Teşhis" title={<>Normal Düşüş mü, <Hot>Sorun mu?</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><CheckCircle2 className="h-5 w-5 text-success" /> Normal sayılır</h3><CheckList items={["Petek havası alındıktan sonra bir kez düşmesi","Yılda birkaç kez az miktarda su eklemek","Uzun süre kapalı kalan kombinin ilk çalıştırması"]} /></Card><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><XCircle className="h-5 w-5 text-brand-red" /> Sorun işareti</h3><CheckList items={["Her birkaç günde bir su eklemek gerekiyor","Su ekledikten kısa süre sonra yine düşüyor","Kombi altında, duvarda ya da tavanda nem lekesi","Isınınca çok yükselip soğuyunca çok düşüyor"]} /></Card></div>
      </Section>

      <Section n="04" label="Nedenler" title={<>Kombi Basıncı <Hot>Neden Düşer?</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">{[["Petek havası","Hava alındıktan sonra boşalan hacim basıncı düşürür; bir kez su eklemek yeter."],["Petek vanası kaçağı","Vana somunlarındaki küçük damlalar zamanla belirgin su kaybı yapar."],["Kombi altı bağlantılar","Rakor ve contalardaki sızıntı genellikle kombinin altında iz bırakır."],["Emniyet ventili","Ventil su kaçırıyorsa tahliye borusundan su gelir; çoğu zaman tank kaynaklıdır."],["Genleşme tankı","Havası biten tank basınç dalgalanmasına ve ventilden su atmaya yol açar."],["Gizli boru kaçağı","Duvar veya zemin içindeki kaçak görünmez; kırmadan tespit gerekir."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="font-extrabold text-brand-red">{t}</h3><p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{d}</p></Card>)}</div>
        <Warning title="Bu adımda zorlanıyorsanız">Kaynağı göremiyorsanız tahmin yürütmeyin; sürekli su eklemek eşanjörü kireçlendirir ve korozyonu hızlandırır.</Warning>
        <CTA />
      </Section>

      <Section n="05" label="Adım Adım" title={<>Kombiye <Hot>Güvenli Su Ekleme</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-start"><ol className="grid gap-2">{[["Kombiyi kapatın ve soğumasını bekleyin","Sıcak tesisatta gösterge yanıltır; su eklemeyi her zaman soğukken yapın."],["Hedef aralığı belirleyin","Kılavuzdaki değere veya göstergedeki yeşil bölgeye bakın."],["Doldurma vanasını yavaşça açın","Kombinin altındaki genellikle mavi musluğu az açıp göstergeyi izleyin."],["Hedefe gelince tamamen kapatın","Vanayı sıkıca kapatın; açık kalırsa basınç yükselir ve ventil su atar."],["Kombiyi açın, gerekiyorsa resetleyin","Hata kodu sürüyorsa bir kez resetleyin ve basıncı birkaç gün takip edin."]].map(([t,d],i)=><li key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{i+1}</span><div><b className="text-[13.5px]">{t}</b><p className="mt-0.5 text-[12.5px] text-muted-foreground">{d}</p></div></li>)}</ol><Photo src={suEkleme} alt="Kombinin altındaki mavi doldurma vanası elle yavaşça açılıyor, üstte basınç göstergesi" caption="Vanayı az açın, göstergeden gözünüzü ayırmayın." /></div>
      </Section>

      <Section n="06" label="Kaçak Arama" title={<>Kaçağın Yerini <Hot>Evde Daraltın</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={kacak} alt="Petek vanası altına tutulan kuru kağıt havluyla damla kontrolü" caption="Kuru kağıt havlu, gözle görülmeyen damlayı da yakalar." /><CheckList items={["Kombinin altını ve bağlantı rakorlarını kuru kağıtla silin","Her petek vanasını ve hava pürjörünü tek tek kontrol edin","Emniyet ventili tahliye borusunun ucunda su izi arayın","Duvar, zemin ve alt kat tavanında nem lekesi kontrol edin","Su ekleme tarihlerini not edin; sıklık kaçağın büyüklüğünü gösterir"]} /></div>
      </Section>

      <Section n="07" label="Dikkat" title={<>En Sık Yapılan <Hot>Hatalar</Hot></>}>
        <CheckList columns={2} items={["Kombi sıcakken su eklemek","Doldurma vanasını açık unutmak","Sürekli su ekleyip kaynağı aramamak","Ventilden gelen suyu tıkamaya çalışmak","Kombi kapağını açıp iç parçalara müdahale etmek","Hata kodunu not etmeden defalarca resetlemek"]} />
      </Section>

      <Section n="08" label="Karar" title={<>Su Eklemek mi, <Hot>Kaçak Tespiti mi?</Hot></>}>
        <Card className="mt-5 overflow-hidden"><table className="w-full text-[12.5px]"><thead className="bg-surface"><tr>{["Durum","Doğru adım"].map(h=><th key={h} className="p-2.5 text-left font-black">{h}</th>)}</tr></thead><tbody>{[["Hava alma sonrası tek düşüş","Bir kez su ekleyin"],["Haftada bir veya daha sık düşüş","Kaçak tespiti"],["Görünür damla var","Vana/rakor tamiri"],["Ventilden su geliyor","Tank ve ventil kontrolü"],["Nem lekesi var, damla yok","Kırmadan kaçak tespiti"]].map(r=><tr key={r[0]} className="border-t border-border">{r.map(c=><td key={c} className="p-2.5">{c}</td>)}</tr>)}</tbody></table></Card>
      </Section>

      <Section n="09" label="Servis" title={<>Ne Zaman <Hot>Servis Çağırmalı?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><CheckList items={["Su ekledikten sonra birkaç gün içinde yine düşüyorsa","Emniyet ventilinden sürekli su geliyorsa","Kaynağı bulamadığınız nem lekesi varsa","Basınç ısınınca kırmızı bölgeye çıkıyorsa","Hata kodu resetle geçmiyorsa"]} /><Photo src={profesyonel} alt="Tesisatçı termal kamerayla zemindeki gizli ısıtma borusu kaçağını arıyor" caption="Termal kamera ile kaçak, zemin kırılmadan bulunur." /></div>
        <p className="mt-4 text-[13.5px] text-muted-foreground">Gizli kaçaklarda <Link to="/hizmet/$slug" params={{slug:"su-kacagi-tespiti"}} className="font-bold text-brand-red underline">su kaçağı tespiti</Link> hizmetimiz devreye girer; keşif ücretsizdir.</p>
        <CTA final />
      </Section>
      {faq.length > 0 && <Section n="10" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"kombi-genlesme-tanki-ne-ise-yarar"}} className="font-bold text-brand-red underline">Genleşme tankı ne işe yarar</Link><Link to="/blog/$slug" params={{slug:"kombi-neden-calismiyor"}} className="font-bold text-brand-red underline">Kombi neden çalışmıyor</Link><Link to="/hizmet/$slug" params={{slug:"kombi-servisi"}} className="font-bold text-brand-red underline">Kombi servisi hizmeti</Link></div></Section>}
    </main>
  </div>;
}
