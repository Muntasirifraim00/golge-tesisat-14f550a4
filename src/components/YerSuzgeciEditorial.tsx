import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Droplets, Camera, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/yer-suzgeci/yer-suzgeci-kapak.jpg";
import kesit from "@/assets/yer-suzgeci/yer-suzgeci-kesit.jpg";
import cesitler from "@/assets/yer-suzgeci/yer-suzgeci-cesitler.jpg";
import koku from "@/assets/yer-suzgeci/yer-suzgeci-koku.jpg";
import montaj from "@/assets/yer-suzgeci/yer-suzgeci-montaj.jpg";
import temizlik from "@/assets/yer-suzgeci/yer-suzgeci-temizlik.jpg";
import cekvalf from "@/assets/yer-suzgeci/yer-suzgeci-cekvalf.jpg";
import tikaniklik from "@/assets/yer-suzgeci/yer-suzgeci-tikaniklik.jpg";
import ctaFinal from "@/assets/yer-suzgeci/yer-suzgeci-tesisatci-cagir.jpg";

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
function Steps({ items }: { items: Array<[string, string]> }) {
  return <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">{items.map(([title, body], i) => <li key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-3.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{String(i + 1).padStart(2, "0")}</span><div className="min-w-0"><h3 className="text-[14px] font-extrabold">{title}</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{body}</p></div></li>)}</ol>;
}
function Warning({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-brand-red/50 bg-brand-red/10 p-4"><AlertTriangle className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold text-brand-red">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-foreground/80">{children}</div></div></div>;
}
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Koku veya tıkanıklık geçmiyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Sorunun kaynağını görüp <span className="text-brand-red">kalıcı çözüm üretiyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Süzgeç değişimi, robotla tıkanıklık açma ve kamera ile görüntüleme; İstanbul genelinde 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Gece İstanbul'da yağmurlu bir sokakta apartmanın önünde duran kırmızı tesisat servis aracı; tesisatçı takım çantasıyla kapıya yürüyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function YerSuzgeciEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Banyo</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Banyo Tesisatı Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Yer Süzgeci Nedir? <Hot>Çeşitleri ve Koku Önleme</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Doğru seçilen yer süzgeci hem suyu hızlı çeker hem lağım kokusunu keser. Çeşitler, seçim kriterleri, bakım adımları ve koku önleme bu rehberde.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Modern koyu fayanslı banyo zemininde krom kare yer süzgeci; su süzgece doğru akıyor" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay · 2/5"],[Clock,"Bakım süresi","10 dakika"],[Wrench,"Gerekli","Eldiven + bir bardak su"],[ShieldAlert,"Ana risk","Yanlış gövde seçimi"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Hızlı Teşhis" title={<>30 Saniyede <Hot>Kontrol Kartı</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Sorunu teşhis etmek için şu beş soruyu kontrol edin; her biri farklı bir arızaya işaret eder.</p>
        <CheckList items={["Banyodan lağım kokusu geliyor mu? Sifon suyu kurumuş olabilir; bir bardak su döküp bekleyin.", "Su zeminde birikiyor, yavaş çekiyor mu? Sepette saç ve kir birikimi var.", "Duştan sonra su uzun süre zeminde kalıyor mu? Süzgeç kapasitesi zemine yetmiyor olabilir.", "Süzgeç kapağını kaldırdığınızda içi kuru mu görünüyor? Sifonsuz model kullanıyorsunuz demektir.", "Koku su dökünce kesiliyor ama birkaç günde geri mi geliyor? Sifon suyu hızlı buharlaşıyor; fermetürlü model düşünün."]} />
        <CTA />
      </Section>

      <Section n="03" label="Temel Bilgi" title={<>Yer Süzgeci Nedir ve <Hot>Nasıl Çalışır?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Yer süzgeci, banyo ve tuvalet zeminindeki suyu toplayıp gider borusuna aktaran, üzeri ızgaralı tesisat parçasıdır. Su ızgaradan geçer, saç ve kaba kir sepette tutulur, su gider hattına iner. Kritik ikinci görevi koku bariyeridir: sifonlu modellerde süzgecin içinde her zaman bir miktar su durur; bu su tabakası (su kilidi) lağım kokusunun banyoya çıkmasını engeller. Sifonsuz düz modellerde bu bariyer yoktur. Zeminde görünen ızgaralı kısım süzgeç, altındaki su kapanlı gövde ise yer sifonudur — <Link to="/blog/$slug" params={{slug:"yer-sifonu-nedir-nasil-temizlenir"}} className="font-bold text-brand-red underline">yer sifonu rehberimizde</Link> detaylı anlattık.</p></div><Photo src={kesit} alt="Yer süzgecinin kesit görünümü: ızgaranın altında su tutan sifon haznesi ve gider borusu" caption="Sifonlu süzgeçte içteki su tabakası, gider kokusunun yukarı çıkmasını engeller." /></div>
      </Section>

      <Section n="04" label="Çeşitler" title={<>Yer Süzgeci <Hot>Çeşitleri</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Piyasada dört temel model vardır. Koku önleyici özellik modelden çok iç yapıya bağlıdır: sifonlu veya fermetürlü (mekanik kapakçıklı) iç gövde kokuyu keser. Alışverişte yalnızca dış görünüme değil, iç gövdenin sifonlu olup olmadığına bakın.</p>
        <Photo src={cesitler} alt="Dört farklı yer süzgeci modeli: kare krom ızgara, yuvarlak pirinç ızgara, lineer duş kanalı ve fayans kaplamalı gizli süzgeç" className="mt-5" />
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Model</th><th className="px-4 py-3">Görünüm</th><th className="px-4 py-3">Koku Performansı</th><th className="px-4 py-3">Hangi Durumda Uygun?</th></tr></thead><tbody className="divide-y divide-border">{[["Klasik kapaklı süzgeç","Kare/yuvarlak metal ızgara","Sifonsuzsa zayıf","Eski binalar, standart banyolar"],["Sifonlu (koku önleyici) süzgeç","Klasik görünüm, içte su haznesi","Güçlü — su kilidi kokuyu keser","Koku sorunu olan banyolar"],["Duş kanalı (lineer süzgeç)","Uzun ince kanal, duvar dibine monte","Modele göre sifonlu seçenek var","Modern banyolar, duşakabin önü"],["Fayans kaplamalı (gizli) süzgeç","Üzerine fayans oturur, görünmez","Modele göre değişir","Estetik öncelikli tadilatlar"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="05" label="Koku Sorunu" title={<>Banyodan Koku Gelmesinin <Hot>Asıl Nedeni</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={koku} alt="Banyo zemin süzgecine kovayla su dökülüyor; kurumuş sifon tazeleniyor" caption="Az kullanılan banyoda süzgece haftada bir bardak su dökmek sifonun kurumasını önler." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Banyo giderinden koku geliyorsa sorun çoğu zaman lağımda değil, süzgeçtedir. Koku lavabo giderinden geliyorsa <Link to="/blog/$slug" params={{slug:"lavabo-koku-giderici-aparat-nasil-takilir"}} className="font-bold text-brand-red underline">lavabo koku giderici aparat</Link> yazımız geçerlidir; tüm giderlerden yayılıyorsa <Link to="/blog/$slug" params={{slug:"giderden-gelen-lagim-kokusu-nasil-giderilir"}} className="font-bold text-brand-red underline">lağım kokusu nasıl giderilir</Link> rehberimizi inceleyin.</p><CheckList items={["Sifonsuz süzgeç: su kilidi yoktur; koku doğrudan yukarı çıkar. Çözüm: sifonlu veya fermetürlü iç gövde.", "Kurumuş sifon suyu: az kullanılan banyoda su buharlaşır; bir bardak su sorunu anında çözer.", "Tıkanmış süzgeç sepeti: saç ve kir birikimi hem suyu yavaşlatır hem çürüyerek koku yapar."]} /></div></div>
      </Section>

      <Section n="06" label="Bakım" title={<>Evde Yapabileceğiniz <Hot>Bakım Adımları</Hot></>}>
        <Steps items={[["Süzgeç kapağını ve sepetini temizleyin","Kapağı kaldırın, sepeti çıkarın; biriken saç ve kiri eldivenle temizleyip sepeti yıkayın. Ayda bir tekrarlamak tıkanıklığı önler."],["Sifon suyunu tazeleyin","Az kullanılan banyoda süzgece haftada bir bir bardak su dökün. Su kilidi taze kalırsa koku bariyeri çalışmaya devam eder."],["Akış hızını gözleyin","Su zeminde birikiyorsa süzgeç veya gider hattı tıkanıyor demektir. Sepet temizliği çözmediyse gider tıkanıklığı yöntemlerini deneyin."]]} />
        <Photo src={temizlik} alt="Eldivenli el yer süzgecinin ızgarasını kaldırıp birikmiş saç ve kir yığınını çıkarıyor" caption="Sepet temizliği aletsiz, risksizdir ve kokuların çoğunu önler." className="mt-5" />
        <Warning title="Kimyasal gider açıcıları karıştırmayın">Gider açıcı kimyasalları birbirine karıştırmayın; zehirli gaz çıkışı ve boru hasarı riski vardır. Tek ürün kullanın, dozunu aşmayın ve üzerine sıcak su dökmeden önce ürün talimatını okuyun.</Warning>
      </Section>

      <Section n="07" label="Seçim" title={<>Doğru Süzgeç Seçimi: <Hot>Çap, Malzeme, Konum</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">İlk kontrol edilecek ölçü çıkış çapıdır: konut banyolarında gider borusu genellikle 50 mm'dir ve süzgecin çıkışı bu boruyla uyumlu olmalıdır. Tadilatta eski süzgeci söküp çıkış çapını ölçmeden yeni ürün almayın. Malzemede 304 kalite paslanmaz çelik, plastiğe göre korozyona dayanıklı ve uzun ömürlüdür; krom kaplama sürekli ıslak ortamda uzun vadede daha risklidir. İdeal konum klozet-duş arası, duvara yakın bir noktadır; zemin eğimi süzgece doğru verilmelidir.</p>
        <CheckList columns={2} items={["Çıkış çapı gider borusuyla uyumlu olmalı — konutta genellikle 50 mm", "304 paslanmaz çelik, plastiğe göre korozyona dayanıklı ve uzun ömürlüdür", "İdeal konum: klozet-duş arası, duvara yakın; zemin eğimi süzgece doğru", "Silikon tam kurumadan (12–24 saat) su dökülmemeli"]} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><Photo src={cekvalf} alt="Yer süzgecinin içine siyah kauçuk çek valf (fermetür) aparatı yerleştiriliyor" caption="Fermetürlü (çek valfli) aparat, su kuruması sorunu olmadan kokuyu keser; az kullanılan banyolar için idealdir." /><Photo src={montaj} alt="Tesisatçı banyo tadilatında yeni süzgeç gövdesini harç yatağına oturtuyor; yanında su terazisi" caption="Gövde değişimi zemin kırma, bağlantı ve yalıtım yenileme gerektiren bir usta işidir." /></div>
      </Section>

      <Section n="08" label="Siz mi Usta mı?" title={<>Hangi İşlemi <Hot>Kendiniz Yapabilirsiniz?</Hot></>}>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[520px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">İşlem</th><th className="px-4 py-3">Kim Yapmalı?</th><th className="px-4 py-3">Neden?</th></tr></thead><tbody className="divide-y divide-border">{([["Kapak ve sepet temizliği","Siz","Aletsiz, risksiz bakım"],["Sifon suyu tazeleme","Siz","Bir bardak su yeterli"],["Üst kapak / ızgara değişimi","Siz","Gövdeye dokunulmaz"],["İç gövde değişimi","Usta","Zemin altı bağlantı sökülür"],["Sifonsuzdan sifonluya geçiş","Usta","Fayans kırma ve yalıtım gerekir"],["Geri tepen su / hat tıkanıklığı","Usta","Profesyonel gider açma gerekir"]] as const).map(([islem, kim, neden]) => (<tr key={islem}><td className="px-4 py-3 font-bold">{islem}</td><td className={cn("px-4 py-3 font-black", kim === "Usta" ? "text-brand-red" : "text-success")}>{kim}</td><td className="px-4 py-3">{neden}</td></tr>))}</tbody></table></div>
      </Section>

      <Section n="09" label="Hatalar" title={<>Sık Yapılan <Hot>Hatalar</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-success"><ThumbsUp className="h-5 w-5" /> Yapın</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Az kullanılan banyoda haftada bir bardak su dökün","Sepeti ayda bir temizleyin","Koku sorununda sifonlu veya fermetürlü gövdeye geçin","Tadilatta gövdenin sifonlu olup olmadığını kontrol ettirin","Süzgeç değişiminde yalıtımı yeniletin"].map(t=><li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>)}</ul></Card><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-brand-red"><XCircle className="h-5 w-5" /> Yapmayın</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Kokuyu oda spreyiyle bastırmaya çalışmayın","Kimyasal açıcıları birbirine karıştırmayın","Süzgeç sepetini hiç temizlememezlik etmeyin","Gövde değişimini yalıtımsız yaptırmayın","Geri tepen suyu görmezden gelmeyin"].map(t=><li key={t} className="flex gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{t}</li>)}</ul></Card></div>
      </Section>

      <Section n="10" label="Ne Zaman Servis" title={<>Geri Tepen Su ve <Hot>Hat Tıkanıklığı</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={tikaniklik} alt="Banyo zemini su basmış; tıkalı yer süzgecinden su geri tepiyor, ev sahibi telefonla yardım çağırıyor" caption="Süzgeçten su geri tepiyorsa ana gider hattında tıkanıklık vardır; su kullanımını hemen durdurun." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Süzgeçten su geri tepiyorsa, koku sepet temizliği ve sifon tazeleme ile kesilmiyorsa veya sifonsuz gövdeden sifonlu modele geçmek istiyorsanız profesyonel destek alın. Geri tepen su, ana gider hattında tıkanıklığa işaret eder; <Link to="/hizmet/$slug" params={{slug:"tikaniklik-acma"}} className="font-bold text-brand-red underline">robotla tıkanıklık açma</Link> ve kamera ile görüntüleme sorunun kaynağını net gösterir. Yanlış monte edilen süzgeç ise alt kata sızıntıyla sonuçlanır.</p><div className="mt-4 grid grid-cols-2 gap-2">{[[Camera,"Kamera ile görüntüleme"],[Droplets,"Robotla tıkanıklık açma"],[Clock,"7/24 acil servis"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Camera;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div></div></div><CTA final />
      </Section>

      {faq.length > 0 && <Section n="11" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"yer-sifonu-nedir-nasil-temizlenir"}} className="font-bold text-brand-red underline">Yer sifonu nasıl temizlenir</Link><Link to="/blog/$slug" params={{slug:"gider-tikanikligi-nasil-acilir"}} className="font-bold text-brand-red underline">Gider tıkanıklığı nasıl açılır</Link><Link to="/hizmet/$slug" params={{slug:"tikaniklik-acma"}} className="font-bold text-brand-red underline">Tıkanıklık açma hizmeti</Link></div></Section>}
    </main>
  </div>;
}
