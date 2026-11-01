import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Droplets, Wind, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/tuvalet-kokusu/tuvalet-kokusu-kapak.jpg";
import kesit from "@/assets/tuvalet-kokusu/tuvalet-kokusu-kesit.jpg";
import conta from "@/assets/tuvalet-kokusu/tuvalet-kokusu-conta.jpg";
import mumConta from "@/assets/tuvalet-kokusu/tuvalet-kokusu-mum-conta.jpg";
import havalandirma from "@/assets/tuvalet-kokusu/tuvalet-kokusu-havalandirma.jpg";
import rezervuar from "@/assets/tuvalet-kokusu/tuvalet-kokusu-rezervuar.jpg";
import temizlik from "@/assets/tuvalet-kokusu/tuvalet-kokusu-temizlik.jpg";
import ctaFinal from "@/assets/tuvalet-kokusu/tuvalet-kokusu-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Koku bir türlü geçmiyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Kaynağı bulup <span className="text-brand-red">kalıcı çözüyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Klozet sökme-montaj, taban contası, rezervuar contası ve havalandırma kaynaklı kokular; İstanbul genelinde 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Gece İstanbul'da yağmurlu sokakta apartman önünde kırmızı tesisat servis aracı; tesisatçı zili çalıyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function TuvaletKokusuEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Tıkanıklık</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Koku Giderme Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Tuvalet ve Klozet Kokusu <Hot>Nasıl Giderilir?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Sürekli koku, spreyle örtülecek bir kirden farklıdır; neredeyse her zaman kuruyan sifon, taban contası, rezervuar veya havalandırma kaynaklıdır. Kalıcı çözüm adım adım.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Koyu fayanslı banyoda klozetin yanında çömelmiş, burnunu tutan kişi; klozet tabanında kırmızı uyarı ışığı" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay · 2/5"],[Clock,"Teşhis süresi","5–30 dakika"],[Wrench,"Gerekli","El feneri + eldiven"],[ShieldAlert,"Ana risk","Kimyasal karıştırmak"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Mantık" title={<>Önce Anlayın: Kokuyu Tutan <Hot>Su Bariyeridir</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Klozetin ve her giderin içinde sürekli bir miktar su tutan kıvrımlı bir bölüm (sifon / su bariyeri) vardır. Bu su, kanalizasyon gazlarının eve geri gelmesini fiziksel olarak engeller. Klozette bu bariyer, haznede her zaman gördüğünüz durgun sudur. Sürekli koku varsa bariyer ya devre dışı kalmıştır ya da koku bariyeri atlayan bir yoldan (bozuk taban contası, sızdıran rezervuar, havalandırma) geliyordur. "Kokuyu nasıl örterim?" yerine "su bariyeri nerede delindi?" diye sormak kalıcı çözümün anahtarıdır.</p><CheckList items={["Klozetteki durgun su = kanalizasyon gazını kesen koku bariyeridir", "Bariyer kurur/boşalırsa ya da etrafından koku sızarsa koku başlar", "Sprey/jel kokuyu örter ama kaynağı çözmez; koku saatler içinde geri gelir", "Kalıcı çözüm için kaynağı (taban/sifon/rezervuar/havalandırma) bulmak şarttır"]} /></div><Photo src={kesit} alt="Klozetin kesit görünümü: iç sifonda biriken su tabakası kanalizasyon gazını kesiyor" caption="Su bariyeri dolu sifon kokuyu geçirmez; kuruyan sifon gazın odaya yükselmesine izin verir." /></div>
      </Section>

      <Section n="03" label="En Sık Kaynak" title={<>Klozet Tabanı Contası: <Hot>En Sık Kaynak</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Klozet, zemindeki gider borusuna bir conta (tahliye manşonu) ve çevresine çekilen silikon ile bağlanır. Zamanla conta sertleşip büzülür ya da silikon çatlar; klozet hafifçe oynamaya başlar ve tabanla zemin arasından kanalizasyon gazı sızar. Kokuyu özellikle klozete yaklaştığınızda ve sifonu çektikten sonra daha yoğun hissedersiniz.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><Photo src={conta} alt="Klozet tabanındaki eski çatlak silikon sökülüyor; zeminde su lekesi görünüyor" caption="Klozet oynuyorsa taban contası/silikonu bozulmuştur — koku oradan sızar." /><Photo src={mumConta} alt="Kaldırılmış klozetin altından eski mum conta çıkarılıyor; yeni siyah kauçuk conta bekliyor" caption="Kalıcı çözüm: klozeti söküp taban contasını (manşonu) yenilemek." /></div>
        <CheckList columns={2} items={["Klozetin oynayıp oynamadığını nazikçe kontrol edin", "Koku sifonu çektikten sonra artıyorsa taban contası şüphesi güçlüdür", "Geçici çözüm: taban çevresini temizleyip yeni silikon çekmek", "Kalıcı çözüm: taban contası/manşonu yenilemek (montaj işi)"]} />
        <CTA />
      </Section>

      <Section n="04" label="Kuruyan Sifon" title={<>Az Kullanılan Tuvaletlerde <Hot>Kuruyan Sifon</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Uzun süre kullanılmayan bir tuvalette (yazlık, misafir banyosu, az girilen WC) klozetteki ya da yer süzgecindeki su zamanla buharlaşır; bariyer kuruyunca kanalizasyon gazı doğrudan içeri dolar. Bu, en kolay çözülen nedendir: klozeti birkaç kez sifonlayın ve yer süzgecine bir miktar su dökün; bariyer yeniden dolunca koku kesilir. Buharlaşmayı yavaşlatmak için yer süzgecine kapak ya da koku önleyici aparat takmak kalıcı fayda sağlar.</p>
        <CheckList columns={2} items={["Az kullanılan tuvalette su bariyeri buharlaşır → koku içeri dolar", "Çözüm: klozeti sifonlayın, yer süzgecine su ekleyin", "Önlem: yer süzgecine kapak / koku önleyici aparat takın", "Düzenli kullanımda bariyer kendiliğinden dolu kalır"]} />
      </Section>

      <Section n="05" label="Rezervuar" title={<>Rezervuar ve Yer Süzgeci <Hot>Kaynaklı Koku</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={rezervuar} alt="Klozet rezervuarının kapağı kaldırılıyor; iç takım ve su seviyesi görünüyor" caption="Rezervuar lastiği/iç takımı sızdırıyorsa nem + koku yapar; kireç izi contanın bittiğini gösterir." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Koku her zaman klozetin altından gelmez. Rezervuarın klozete bağlandığı conta bozulduğunda ya da iç takım sızdırdığında sızan su hem nem hem koku yapar. Yer süzgeci de bağımsız bir koku kaynağıdır: altında su tutan sifon yoksa koku oradan gelir; koku önleyici çek valfli bir süzgeçle değiştirmek en pratik çözümdür. Detaylar <Link to="/blog/$slug" params={{slug:"yer-suzgeci-nedir-cesitleri-koku-onleme"}} className="font-bold text-brand-red underline">yer süzgeci rehberimizde</Link>.</p></div></div>
      </Section>

      <Section n="06" label="Tanı Tablosu" title={<>Lavabo ve Gider Kokusu: <Hot>Aynı Mantık</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Koku her zaman tuvaletten gelmez; lavabo, evye ve banyo giderinde de mantık tıpatıp aynıdır: her giderin altında su tutan bir sifon vardır. Çözüm sırası nettir: önce bol su akıtıp sifonu doldurun; geçmiyorsa bağlantı ve contaları kontrol edin; sifonsuz giderlerde sifonlu set ya da koku önleyici çek valf takın. Sifonu söküp temizlemek çoğu zaman tek başına sorunu çözer.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Koku kaynağı</th><th className="px-4 py-3">Tipik belirti</th><th className="px-4 py-3">Kalıcı çözüm</th></tr></thead><tbody className="divide-y divide-border">{[["Kuruyan sifon (az kullanım)","Ara sıra kullanılan WC/lavaboda ani koku","Bol su akıt, bariyeri doldur; çek valf"],["Klozet tabanı contası","Klozet oynuyor, sifon çekince koku artıyor","Klozeti sök, taban contası/manşonu yenile"],["Rezervuar lastiği","Klozet arkasında nem, kireç izi","Rezervuar contası değişimi"],["Lavabo / evye sifonu","Dolap içinde nem, giderden koku","Sifon temizliği veya değişimi"],["Sifonsuz yer süzgeci","Banyo giderinden sürekli lağım kokusu","Sifonlu/çek valfli süzgeçle değiştir"],["Gider havalandırması","Sifon çekince guruldama + koku","Havalandırma/menfez kontrolü (profesyonel)"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <Photo src={temizlik} alt="Eldivenli el klozetin iç kenarını fırçayla temizliyor; köpük görünüyor" caption="Düzenli temizlik yüzeysel kokuyu alır ama yapısal kaynağı çözmez." className="mt-5" />
      </Section>

      <Section n="07" label="Havalandırma" title={<>Rüzgârlı Havada Artıyorsa: <Hot>Havalandırma Bacası</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={havalandirma} alt="Tesisatçı banyo duvarındaki havalandırma kanalını el feneriyle inceliyor" caption="Rüzgârlı havada veya komşu sifon çekince artan koku, bina havalandırma hattına işaret eder." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Pis su boruları çatıya kadar uzanan bir havalandırma borusuyla dışarıya açılır; bu boru tıkalıysa ya da yetersizse basınç dengesi bozulur ve kanalizasyon gazı en zayıf noktadan içeri basılır. Üst katlarda hızla akan su, alt kat sifonlarındaki suyu emebilir (sifonaj); bariyeri boşalan gider açık bir kanalizasyon ağzı gibi çalışır. Çözüm baca çıkışının kontrolü ve gider ağzına koku önleyici çek valf takılmasıdır; apartman yönetimiyle birlikte teyit edilmelidir.</p></div></div>
        <Warning title="Sağlık notu: ertelemeyin">Kanalizasyon gazı metan ve hidrojen sülfür (çürük yumurta kokusu) içerir. Kapalı ve küçük hacimlerde biriktiğinde baş ağrısı ve mide bulantısı yapabilir; sürekli lağım kokusu alınan bir tuvaleti "alışılır" bir sorun saymayın — kaynağı bulunana kadar mekânı havalandırın.</Warning>
      </Section>

      <Section n="08" label="Alaturka" title={<>Alaturka Tuvalette <Hot>"Es Sifon" Eksikliği</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Alaturka tuvaletlerde kokunun en yaygın nedeni, taşın altındaki gider borusunda "es sifon" (S biçimli su tutucu) bulunmamasıdır. Klozetlerde su bariyeri seramiğin içinde hazır gelir; alaturka taşlarda bariyeri yeraltındaki boru sağlamalıdır. Kontrol basittir: taşın deliğinden aşağı bakınca su görünmüyorsa es sifon yok demektir. Kalıcı çözüm, gider hattına es sifon eklenmesi ya da taşın sifonlu bir modelle değiştirilmesidir; kırma gerektirdiği için profesyonel montaj ister.</p>
        <CheckList columns={2} items={["Alaturka taşın altında es sifon yoksa koku kalıcıdır", "Kontrol: delikten bakınca su görünmüyorsa sifon yok demektir", "Kalıcı çözüm: es sifon ekleme veya sifonlu taşla değiştirme", "Kırma/montaj gerektirdiği için profesyonel işçilik ister"]} />
      </Section>

      <Section n="09" label="Kalıcı Çözüm" title={<>Koku Önleyici Aparat (Çek Valf) <Hot>Nasıl Takılır?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Su bariyerinin kuruduğu ya da olmadığı noktalarda en kalıcı çözüm, gidere tek yönlü çalışan bir koku önleyici (çek valf) aparat takmaktır. Su aşağı akar, kanalizasyon gazı yukarı çıkamaz; bariyer kurusa bile koku gelmez. Takmadan önce süzgeci söküp gider ağzını temizleyin, çap uygunluğunu kontrol edin ve aparatı akış yönüne göre contasıyla sızdırmaz biçimde oturtun. Yanlış çap ya da ters montaj hem akışı engeller hem kokuyu çözmez.</p>
        <CheckList columns={2} items={["Çek valf, suyu geçirir ama kanalizasyon gazını geri vermez", "Gider ağzını temizleyip aparat çapının uygunluğunu kontrol edin", "Aparatı akış yönüne göre, contasıyla sızdırmaz biçimde yerleştirin", "Az kullanılan WC ve yer süzgeçlerinde en kalıcı çözümdür"]} />
      </Section>

      <Section n="10" label="Yapılmayacaklar" title={<>Yapmamanız Gerekenler ve <Hot>Ne Zaman Tesisatçı?</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-brand-red"><XCircle className="h-5 w-5" /> Asla yapmayın</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Çamaşır suyu + asit/tuz ruhu karıştırmayın (zehirli gaz açığa çıkar)","Kokuyu sadece sprey/jel ile örtmeye çalışmayın","Klozet tabanını tüm yönlerden silikonlayıp tahliyeyi kapatmayın","Güçlü kimyasalla bastırmak contaları yıpratır"].map(t=><li key={t} className="flex gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{t}</li>)}</ul></Card><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-success"><ThumbsUp className="h-5 w-5" /> Profesyonel çağırın</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Klozet oynuyor ve taban contası yenilenmesi gerekiyorsa","Koku tüm kontrollere rağmen sürüyorsa","Kokuyla birlikte zeminde nem/kabarma varsa","Koku gizli bir kaçaktan geliyorsa → kırmadan tespit"].map(t=><li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>)}</ul></Card></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Droplets,"Taban contası yenileme"],[Wind,"Havalandırma kontrolü"],[Clock,"7/24 acil servis"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Droplets;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="11" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"tuvalet-tikanikligi-nasil-acilir"}} className="font-bold text-brand-red underline">Tuvalet tıkanıklığı nasıl açılır</Link><Link to="/blog/$slug" params={{slug:"yer-suzgeci-nedir-cesitleri-koku-onleme"}} className="font-bold text-brand-red underline">Yer süzgeci ve koku önleme</Link><Link to="/hizmet/$slug" params={{slug:"tuvalet-tikanikligi-acma"}} className="font-bold text-brand-red underline">Tuvalet tıkanıklığı açma hizmeti</Link></div></Section>}
    </main>
  </div>;
}
