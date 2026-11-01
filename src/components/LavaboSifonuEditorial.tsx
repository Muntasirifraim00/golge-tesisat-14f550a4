import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Droplets, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, Search, RefreshCw, ThumbsUp,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/lavabo-sifonu/lavabo-sifonu-kapak.jpg";
import sifonMantigi from "@/assets/lavabo-sifonu/lavabo-sifonu-sifon-mantigi.jpg";
import sema from "@/assets/lavabo-sifonu/lavabo-sifonu-sema.jpg";
import aletler from "@/assets/lavabo-sifonu/lavabo-sifonu-aletler.jpg";
import sorunlar from "@/assets/lavabo-sifonu/lavabo-sifonu-sorunlar.jpg";
import sifonCesitleri from "@/assets/lavabo-sifonu/lavabo-sifonu-sifon-cesitleri.jpg";
import malzemeler from "@/assets/lavabo-sifonu/lavabo-sifonu-malzemeler.jpg";
import sokum from "@/assets/lavabo-sifonu/lavabo-sifonu-sokum.jpg";
import montaj from "@/assets/lavabo-sifonu/lavabo-sifonu-montaj.jpg";
import kacakTesti from "@/assets/lavabo-sifonu/lavabo-sifonu-kacak-testi.jpg";
import profesyonel from "@/assets/lavabo-sifonu/lavabo-sifonu-profesyonel.jpg";
import ctaFinal from "@/assets/lavabo-sifonu/lavabo-sifonu-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Profesyonel montaj mı lazım?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Sifon bağlantınızı <span className="text-brand-red">sızdırmaz yapalım.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul genelinde 7/24 servis, ücretsiz keşif ve garantili işçilik.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Bitmiş lavabo sifonu montajının yanında güler yüzlü tesisatçı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

const problemsData = [
  ["Sifonun altından su damlıyor", "Sıkma somunu gevşemiş, conta ezilmiş veya ters takılmış olabilir."],
  ["Lavabodan koku geliyor", "Sifonun su kilidi boşalmış, conta kaçırıyor veya sifon yanlış monte edilmiş olabilir."],
  ["Su yavaş gidiyor", "Sifon içinde saç ve kir birikmiş veya boru hattında tıkanıklık başlamış olabilir."],
  ["Bağlantı sürekli gevşiyor", "Dişler yıpranmış veya somun aşırı sıkılıp çatlamış olabilir; parça değişimi gerekir."],
];

export function LavaboSifonuEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Tesisat</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Lavabo Sifonu Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Lavabo Sifonu <Hot>Nasıl Takılır?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Sifon seçimi, söküm, montaj ve kaçak testi için eksiksiz adım adım rehber.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Lavabo dolabının altında duvara bağlı krom şişe sifon" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay · 2/5"],[Clock,"Tahmini süre","20–30 dakika"],[Wrench,"Gerekli alet","Kova, bez, pense"],[AlertTriangle,"Ana risk","Ters takılan conta"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Giriş" title={<>Sifon Nedir, <Hot>Ne İşe Yarar?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="border-l-2 border-brand-red pl-4 text-[15px] leading-relaxed text-foreground/85">Sifon, lavabonun gideri ile duvar hattı arasındaki kavisli borudur. İçinde her zaman bir miktar su kalır; bu "su kilidi", kanalizasyondan gelen kokunun banyoya çıkmasını engeller.</p><div className="mt-4 grid gap-2">{[[Droplets,"Su kilidi: kavisin içinde kalan su kokuyu keser"],[Search,"Tıkanıklık yakalama: düşen yüzük, saç ve kir burada tutulur"],[RefreshCw,"Sökülebilir yapı: temizlik ve tamir için kolayca ayrılır"]].map(([I,t])=>{const Icon=I as typeof Droplets; return <Card key={t as string} className="flex items-center gap-3 p-3"><Icon className="h-5 w-5 text-brand-red"/><b className="text-[13px]">{t as string}</b></Card>})}</div></div><Photo src={sifonMantigi} alt="Sifonun kesit görünümü: kavisin içinde kalan su kilidi kokuyu engeller" caption="Sifonun içindeki su, gider hattından gelen kokunun önünde bir bariyerdir." /></div>
      </Section>

      <Section n="03" label="Kısa Cevap" title={<>Lavabo Sifonu <Hot>Nasıl Takılır?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Eski sifonu kova hazırken sökün, bağlantı yüzeylerini temizleyin, yeni sifonu contaları doğru yönde oturtarak takın, somunları elle sıkın ve musluğu açıp kuru bezle kaçak testi yapın.</p>
        <Photo src={sema} alt="Lavabo gider düzeneği: süzgeç, sifon ve duvar gider borusu" className="mt-5" />
        <CheckList columns={2} items={["Sökmeden önce sifonun altına mutlaka kova koyun", "Konik contanın sivri tarafı her zaman suyun gidiş yönüne bakar", "Somunları elle sıkın; penseyle en fazla çeyrek tur ekleyin", "Aşırı sıkmak plastik dişleri çatlatır ve kaçağa yol açar", "Montajdan sonra musluğu 1 dakika açık tutup tüm birleşimleri kuru bezle yoklayın", "Sifonun kavisi her zaman aşağı bakmalıdır; ters montaj su kilidi oluşturmaz"]} />
      </Section>

      <Section n="04" label="Başlamadan Önce" title={<>Kendiniz <Hot>Takabilir misiniz?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Sifon değişimi, evde yapılabilecek en kolay tesisat işlerinden biridir. Bağlantılar görünür durumdaysa ve duvar hattı sağlamsa özel alet gerekmez. Duvar içinde kaçak, çatlak boru veya hat değişimi gerekiyorsa iş ustaya kalır.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[12.5px]"><thead className="bg-brand-red text-brand-red-foreground"><tr><th className="p-3">Kriter</th><th className="p-3">Değerlendirme</th></tr></thead><tbody>{[["Zorluk","Kolay (2/5)"],["Tahmini süre","20–30 dakika"],["Gerekli aletler","Kova, bez, pense (çoğu bağlantı elle açılır)"],["Ana risk","Ters takılan conta kaçak ve koku yapar"]].map(r=><tr key={r[0]} className="border-t border-border odd:bg-surface/70">{r.map((c,i)=><td key={c} className={cn("p-3",i===0&&"font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr]"><Photo src={aletler} alt="Sifon değişimi için gereken aletler: pense, kova, contalar, somunlar, teflon bant, eldiven ve bez" /><CheckList items={["Sifonun altına sığacak bir kova hazırlayın", "Eski su için bez ve eldiven bulundurun", "Yeni sifonun çapının mevcut hatta uyduğunu kontrol edin", "Conta ve somunların eksiksiz olduğundan emin olun", "Dolabın içini boşaltıp çalışma alanı açın"]} /></div>
      </Section>

      <Section n="05" label="Hızlı Teşhis" title={<>Hangi Sorunu <Hot>Yaşıyorsunuz?</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start"><div className="grid gap-2">{problemsData.map(([t,d],i)=><Card key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/50 text-[11px] font-black text-brand-red">0{i+1}</span><div><h3 className="text-[14px] font-extrabold">{t}</h3><p className="mt-1 text-[12px] text-muted-foreground">{d}</p></div></Card>)}</div><Photo src={sorunlar} alt="Sifon sorunları: damlayan bağlantı, kuru sifon, tıkanmış sifon ve gevşek somun" /></div>
        <Warning title="Bunlar olası nedenlerdir">Kesin teşhis için sifonun sökülüp içinin ve duvar hattının birlikte kontrol edilmesi gerekir.</Warning><CTA />
      </Section>

      <Section n="06" label="Sifon Çeşitleri" title={<>Hangi Sifonu <Hot>Seçmelisiniz?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Lavabo için üç sifon tipi yaygındır. Görünür banyo dolaplarında krom şişe sifon estetiktir; kapalı dolaplarda plastik boru (P) sifon en pratik ve ekonomik çözümdür; esnek sifon ise sadece hizalama sorununda geçici çözüm olmalıdır.</p><CheckList items={["Şişe sifon: kompakt, estetik, krom veya plastik", "Boru (P) sifon: klasik, kolay temizlenir, dayanıklı", "Esnek sifon: hizalama sorununu çözer ama kıvrımları kir tutar", "Görünür montajda krom, kapalı dolapta plastik tercih edin", "Çap uyumunu kontrol edin: lavabo çıkışı ve duvar hattı aynı ölçüde olmalı"]} /></div><Photo src={sifonCesitleri} alt="Üç sifon tipi yan yana: krom şişe sifon, plastik P sifon ve esnek sifon" caption="Esnek sifon pratiktir ama kıvrımları kir biriktirir; zorunlu değilse düz boru tercih edin." /></div>
      </Section>

      <Section n="07" label="Malzemeler" title={<>Montajdan Önce <Hot>Neler Gerekli?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Yeni sifon setleri genellikle somun ve contalarıyla birlikte gelir. Yine de eski contaların yenilenmesi ve duvar bağlantısının kontrolü için yedek conta bulundurmak iyi olur.</p>
        <Photo src={malzemeler} alt="Yeni sifon seti parçaları: sifon gövdesi, somunlar, konik contalar, duvar borusu ve uzatma borusu" className="mt-5" />
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[12.5px]"><thead className="bg-brand-red text-brand-red-foreground"><tr><th className="p-3">Parça</th><th className="p-3">Görevi</th><th className="p-3">Önemli kural</th></tr></thead><tbody>{[["Sifon gövdesi","Su kilidini oluşturur","Kavis her zaman aşağı bakar"],["Konik conta","Birleşimi sızdırmaz yapar","Sivri taraf suyun gidiş yönüne bakar"],["Sıkma somunu","Parçaları birbirine kilitler","Elle sıkın, penseyle en fazla çeyrek tur"],["Duvar borusu","Sifonu hatta bağlar","Duvar ağzına tam oturmalı"],["Uzatma borusu","Mesafe farkını kapatır","Kısa kesmek yerine uygun boy seçin"]].map(r=><tr key={r[0]} className="border-t border-border odd:bg-surface/70">{r.map((c,i)=><td key={c} className={cn("p-3",i===0&&"font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="08" label="Adım 1" title={<>Eski Sifonun <Hot>Sökülmesi</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div><Steps items={[["Kovayı yerleştirin","Sifonun altına kova koyun; sökümde birikmiş su dökülecektir."],["Üst somunu gevşetin","Lavabo çıkışına bağlanan somunu sola çevirerek açın."],["Duvar tarafını gevşetin","Sifonun duvar hattına bağlanan somununu açın."],["Sifonu indirin","İçindeki suyu kovaya boşaltın; eski contaları çıkarın."],["Yüzeyleri temizleyin","Lavabo çıkışını ve duvar borusu ağzını bezle temizleyin."],["Duvar hattını kontrol edin","Çatlak, gevşeklik veya kırık varsa montajı erteleyip usta çağırın."]]} /><Warning title="Su dökülmesine hazırlıklı olun">Sifonun içinde her zaman su vardır. Kova koymadan somunları açarsanız dolabın içi ıslanır; eski su kirli olabilir, eldiven kullanın.</Warning></div><Photo src={sokum} alt="Eski sifonun somununu gevşeten eldivenli eller, altta su toplayan kova" caption="Sökümde kova şart: sifonun kavisinde biriken su somun açılır açılmaz dökülür." /></div>
      </Section>

      <Section n="09" label="Adım 2" title={<>Yeni Sifonun <Hot>Takılması</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={montaj} alt="Yeni P sifonun contası doğru yönde oturtularak elle takılması" caption="Konik contanın sivri tarafı suyun gidiş yönüne bakar; ters conta ilk kullanımda kaçırır." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Montajın sırrı conta yönündedir. Konik (kama) contaların sivri tarafı her zaman suyun akış yönüne, yani bir sonraki boruya bakar. Somunları önce elle sıkın; aletle aşırı sıkmak plastik dişleri çatlatır.</p><CheckList items={["Contaları doğru yönde ve düz oturtun", "Sifonun kavisinin aşağı baktığından emin olun", "Somunları elle, dişleri çaprazlamadan sıkın", "Duvar borusunu hatta sonuna kadar oturtun", "Aşırı sıkmayın: elle sıkın, gerekiyorsa penseyle çeyrek tur"]} /></div></div>
      </Section>

      <Section n="10" label="Adım 3" title={<>Kaçak <Hot>Testi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><Steps items={[["Musluğu açın","Suyu 1 dakika akıtın; tüm birleşimleri gözle izleyin."],["Kuru bezle yoklayın","Her somunu ve birleşimi kuru bezle tek tek silin."],["Lavaboyu doldurup boşaltın","Taşma deliğinden de su geçerek tam yük testi yapın."],["Damlayan noktayı sıkın","Bez ıslandıysa o somunu çeyrek tur daha sıkıp testi tekrarlayın."],["24 saat sonra bakın","Ertesi gün dolabın tabanını kontrol edin; yavaş kaçaklar geç belli olur."],["Koku kontrolü yapın","Su akarken koku geliyorsa conta yönü veya duvar bağlantısı yanlıştır."]]} /></div><Photo src={kacakTesti} alt="Musluk akarken yeni sifonun birleşimlerinin kuru bezle kaçak kontrolü" /></div>
      </Section>

      <Section n="11" label="Profesyonel Destek" title={<>Ne Zaman <Hot>Tesisatçı Gerekir?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Sifon değişimi çoğu zaman evde yapılabilir. Ancak sorun sifonun ötesindeyse profesyonel destek şarttır.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Duvar hattı çatlaksa","Boru tamiri veya hat yenileme usta işidir."],["Kaçak duvardan geliyorsa","Gizli kaçak, kırmadan tespit gerektirir."],["Gider sürekli tıkanıyorsa","Sorun sifonda değil, hattın ilerisinde olabilir."],["Koku kesilmiyorsa","Havalandırma veya hat sorunu profesyonel kontrol ister."],["Çaplar uyuşmuyorsa","Yanlış parçayla zorlanan bağlantı kısa sürede kaçırır."],["Dolap içi çürümüşse","Uzun süredir devam eden kaçak mobilyayı ve zemini yıpratmış olabilir."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><AlertTriangle className="h-4 w-4 text-brand-red" />{t}</h3><p className="mt-2 text-[12.5px] text-muted-foreground">{d}</p></Card>)}</div>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Gölge Tesisat olarak İstanbul genelinde sifon montajı ve değişimi, gider tıkanıklığı açma, kırmadan su kaçağı tespiti ve gider hattı onarımı hizmeti veriyoruz.</p>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Wrench,"Sifon montajı"],[Search,"Kaçak tespiti"],[RefreshCw,"Hat onarımı"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Wrench;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div><CTA final />
      </Section>

      {faq.length > 0 && <Section n="12" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"gider-tikanikligi-nasil-acilir"}} className="font-bold text-brand-red underline">Gider tıkanıklığı nasıl açılır?</Link><Link to="/blog/$slug" params={{slug:"su-kacagi-nasil-anlasilir"}} className="font-bold text-brand-red underline">Su kaçağı nasıl anlaşılır?</Link><Link to="/hizmet/$slug" params={{slug:"tikaniklik-acma"}} className="font-bold text-brand-red underline">Tıkanıklık açma hizmeti</Link></div></Section>}
    </main>
  </div>;
}
