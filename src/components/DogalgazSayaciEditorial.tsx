import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, Search, Flame, ShieldAlert,
  FileText, Wind, ThumbsUp,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-kapak.jpg";
import neIseYarar from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-ne-ise-yarar.jpg";
import haneler from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-haneler.jpg";
import hesaplama from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-hesaplama.jpg";
import sayacTurleri from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-sayac-turleri.jpg";
import aboneNo from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-abone-no.jpg";
import vana from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-vana.jpg";
import kacakGuvenlik from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-kacak-guvenlik.jpg";
import profesyonel from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-profesyonel.jpg";
import takip from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-takip.jpg";
import sorunlar from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-sorunlar.jpg";
import ctaFinal from "@/assets/dogalgaz-sayaci/dogalgaz-sayaci-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Doğalgaz tesisatında şüphe mi var?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Kaçak kontrolünü <span className="text-brand-red">uzmana bırakın.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul genelinde 7/24 servis, ücretsiz keşif ve garantili işçilik.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="İstanbul'da bir apartmanın önünde duran kırmızı servis aracı ve elinde takım çantasıyla binaya yürüyen tesisatçı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

const problemsData = [
  ["Cihazlar kapalıyken sayaç ilerliyor", "Olası bir gaz kaçağının işaretidir; gazı kesip ortamı havalandırın ve acil hattı arayın."],
  ["Sayaç camında buğulanma var", "Gösterge içine nem girmiş olabilir; okuma zorlaşıyorsa dağıtım şirketine bildirin."],
  ["Sayaç çevresinde gaz kokusu", "Bağlantı noktasında kaçak olabilir; kıvılcım çıkarmadan gazı kesin ve dışarı çıkın."],
  ["Sayaç mührü kopuk görünüyor", "Mühür hasarı yetkisiz müdahale anlamına gelebilir; dağıtım şirketine haber verin."],
];

export function DogalgazSayaciEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Doğalgaz</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Doğalgaz Sayacı Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Doğalgaz Sayacı <Hot>Nasıl Okunur?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Siyah ve kırmızı haneler, m³ tüketimi, fatura hesabı ve sayaç güvenliği için eksiksiz rehber.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Duvara monte beyaz-gri körüklü doğalgaz sayacının rakam göstergesini işaret eden bir el; siyah ve kırmızı haneler görünüyor" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Yok · sadece okuma"],[Clock,"Tahmini süre","1 dakika"],[Wrench,"Gerekli alet","Göz + not defteri"],[ShieldAlert,"Ana risk","Gaz kaçağını gözden kaçırmak"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Giriş" title={<>Doğalgaz Sayacı <Hot>Ne İşe Yarar?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="border-l-2 border-brand-red pl-4 text-[15px] leading-relaxed text-foreground/85">Doğalgaz sayacı, eve giren gazın hacmini metreküp (m³) cinsinden ölçen cihazdır. Kombi, ocak ve şofben çalıştıkça içinden geçen gazı sayar; fatura, iki okuma arasındaki farkın enerji birimine (kWh) çevrilmesiyle hesaplanır.</p><div className="mt-4 grid gap-2">{[[Flame,"Cihazlar çalıştıkça gösterge rakamları artar"],[FileText,"Fatura, iki okuma farkının kWh'a çevrilmesiyle çıkar"],[Search,"Kendi okumanız tüketim takibi ve fatura kontrolü sağlar"],[AlertTriangle,"Anormal artış, olası bir arızanın erken işareti olabilir"]].map(([I,t])=>{const Icon=I as typeof Flame; return <Card key={t as string} className="flex items-center gap-3 p-3"><Icon className="h-5 w-5 text-brand-red"/><b className="text-[13px]">{t as string}</b></Card>})}</div></div><Photo src={neIseYarar} alt="Ev doğalgaz sistemi: duvara giren sarı gaz borusu, sayaç, kombi ve ocak bağlantısı" caption="Sayaç, şebekeden eve giren gazın kombi ve ocağa dağılmadan önce ölçüldüğü noktadır." /></div>
      </Section>

      <Section n="03" label="Kısa Cevap" title={<>Doğalgaz Sayacı <Hot>Nasıl Okunur?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Göstergedeki rakamlar soldan sağa okunur. Siyah haneler tükettiğiniz tam sayı m³ değeridir ve faturaya esas alınır; virgülden sonraki kırmızı haneler ondalık kısmı gösterir ve okumada dikkate alınmaz. Göstergede "01234,567" yazıyorsa okunacak değer 1234 m³'tür.</p>
        <CheckList columns={2} items={["Rakamlar soldan sağa doğru okunur", "Siyah haneler: tam sayı m³ — faturaya esas değer", "Kırmızı haneler: ondalık kısım — dikkate alınmaz", "Örnek: 01234,567 → okunan değer 1234 m³", "Yalnızca virgülden önceki kısmı not edin", "Abone/tesisat numarası sayaç üstü dağıtım etiketinde yazar"]} />
      </Section>

      <Section n="04" label="Başlamadan Önce" title={<>Okumayı <Hot>Alışkanlık Yapın</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Sayaç okumak için alet gerekmez; aylık düzenli okuma, tüketiminizi takip etmenin ve faturanızı kontrol etmenin en pratik yoludur. Her ay aynı gün okuyup not etmek, anormal tüketim artışlarını erkenden yakalamanızı sağlar.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={takip} alt="Koyu bir masada not defteri, kalem ve ekranında sayaç fotoğrafı olan bir telefon" caption="Her ay aynı gün sayacın fotoğrafını çekip not etmek, tüketim takibini kolaylaştırır." /><CheckList items={["Her ay aynı gün okuyun ve not edin", "Sayaç fotoğrafını telefonla çekin", "Geçen ayın değeriyle farkı karşılaştırın", "Beklenmedik artışta kombi ayarlarını gözden geçirin", "Fatura geldiğinde sayaç değeriyle tutarlılığını kontrol edin"]} /></div>
      </Section>

      <Section n="05" label="Hızlı Teşhis" title={<>Hangi Durumu <Hot>Yaşıyorsunuz?</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start"><div className="grid gap-2">{problemsData.map(([t,d],i)=><Card key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/50 text-[11px] font-black text-brand-red">0{i+1}</span><div><h3 className="text-[14px] font-extrabold">{t}</h3><p className="mt-1 text-[12px] text-muted-foreground">{d}</p></div></Card>)}</div><Photo src={sorunlar} alt="Doğalgaz sayacı sorunları: buğulanmış gösterge camı, gaz kokusu kontrolü, ilerleyen haneler ve kopuk mühür" /></div>
        <Warning title="Gaz kokusu varsa okuma yapmayı bırakın">Koku varsa sayaçla ilgilenmeyi bırakıp hemen gazı kesin, ortamı havalandırın ve kıvılcım oluşturacak hiçbir şeye dokunmadan dışarı çıkın.</Warning><CTA />
      </Section>

      <Section n="06" label="Sayaç Türleri" title={<>Mekanik mi, <Hot>Kartlı mı?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Türkiye'de iki sayaç tipi yaygındır: klasik mekanik (körüklü) sayaç ve ön ödemeli kartlı sayaç. Mekanik sayaçta tüketim analog hane çarklarından okunur; kartlı sayaçta ise dijital ekranda kalan kredi ve tüketim görülür, kart takılarak kredi yüklenir.</p><CheckList items={["Mekanik sayaç: siyah/kırmızı hane çarklarından okunur", "Kartlı sayaç: dijital ekranda kalan kredi ve tüketim görülür", "Kartlı sayaçta kredi bitince gaz otomatik kesilir", "Her iki tipte de okuma mantığı aynıdır: tam sayı m³ esastır", "Kartlı sayaç ekranı karardıysa butona basarak uyandırın"]} /></div><Photo src={sayacTurleri} alt="Yan yana iki doğalgaz sayacı: solda analog hane çarklı mekanik sayaç, sağda dijital ekranlı ve kart yuvalı ön ödemeli sayaç" caption="Mekanik sayaçta haneler, kartlı sayaçta dijital ekran okunur; ikisinde de tam sayı m³ esastır." /></div>
      </Section>

      <Section n="07" label="Okuma" title={<>Siyah ve Kırmızı <Hot>Hanelerin Anlamı</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div><Steps items={[["Göstergeyi bulun","Sayacın ön yüzündeki rakam penceresini bulun."],["Soldan sağa okuyun","Rakamları sırayla, soldan sağa doğru okuyun."],["Siyah haneleri alın","Virgülden önceki siyah haneler tam sayı m³ değeridir."],["Kırmızı haneleri atlayın","Virgülden sonraki kırmızı haneler ondalıktır; okumaya dahil edilmez."],["Değeri not edin","Örnek: 01234,567 görüyorsanız 1234 m³ yazın."],["Farkı hesaplayın","Bu ayki değerden geçen ayki değeri çıkarın; sonuç aylık tüketiminizdir."]]} /></div><Photo src={haneler} alt="Mekanik doğalgaz sayacı göstergesinin makro görünümü: beş siyah hane, virgül ve üç kırmızı hane" caption="Siyah haneler faturaya esas tam sayı m³'tür; kırmızı haneler ondalık olduğu için okumaya girmez." /></div>
      </Section>

      <Section n="08" label="Hesaplama" title={<>m³ Tüketimi <Hot>Faturaya Nasıl Döner?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div className="min-w-0"><p className="text-[14px] leading-relaxed text-muted-foreground">Aylık tüketim, bu ayki okumadan geçen ayki okumanın çıkarılmasıyla bulunur. Fatura doğrudan m³ üzerinden değil, gazın taşıdığı enerji (kWh) üzerinden hesaplanır: tüketilen m³, dağıtım şirketinin belirlediği üst ısıl değer katsayısıyla çarpılarak kWh'a çevrilir, ardından birim fiyatla çarpılır. Katsayı ve birim fiyatlar bölge ve döneme göre değişir; güncel değerler faturanızda yazar.</p><div className="mt-4 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[520px] text-left text-[12.5px]"><thead className="bg-brand-red text-brand-red-foreground"><tr><th className="p-3">Adım</th><th className="p-3">İşlem</th><th className="p-3">Örnek</th></tr></thead><tbody>{[["1","Bu ay okuma − geçen ay okuma","1234 − 1134 = 100 m³"],["2","m³ × üst ısıl değer katsayısı = kWh","100 × ~10,64 ≈ 1064 kWh"],["3","kWh × birim fiyat = enerji bedeli","1064 × birim fiyat"],["4","+ sabit/dağıtım bedeli","dönemsel sabit tutar"],["5","+ vergiler (KDV vb.)","yasal oranlar"]].map(r=><tr key={r[0]} className="border-t border-border odd:bg-surface/70">{r.map((c,i)=><td key={c} className={cn("p-3",i===0&&"font-bold")}>{c}</td>)}</tr>)}</tbody></table></div></div><Photo src={hesaplama} alt="Doğalgaz faturasını ve telefondaki hesap makinesini sayaçla karşılaştaran bir ev sahibi" caption="Fatura, m³ farkının kWh'a çevrilip birim fiyatla çarpılmasıyla oluşur; katsayılar faturanızda yazar." /></div>
      </Section>

      <Section n="09" label="Numaralar" title={<>Abone ve Tesisat Numarası <Hot>Nerede Yazar?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={aboneNo} alt="Doğalgaz sayacının üzerindeki metal künye plakası ve barkodlu etiket bölgesini işaret eden bir parmak" caption="Abone/tesisat numarası dağıtım etiketinde, sayaç numarası barkodlu künye etiketinde bulunur." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Online ödeme, abonelik sorgusu ve arıza bildiriminde istenen abone ve tesisat numarası, çoğu zaman sayaca yapıştırılmış dağıtım şirketi etiketinde yer alır. Sayaç numarası ise sayacın barkodlu künye etiketindedir; bu üç numara birbirine karıştırılmamalıdır. En kesin kaynak doğalgaz faturanızdır.</p><CheckList items={["Abone/tesisat numarası: sayaç üstü dağıtım etiketinde", "Sayaç numarası: barkodlu künye etiketinde", "Üçü farklı numaradır, karıştırmayın", "En kesin kaynak doğalgaz faturanızdır", "Rakamları eksiksiz ve doğru not edin"]} /></div></div>
      </Section>

      <Section n="10" label="Güvenlik" title={<>Kesme Vanası ve <Hot>Dikkat Edilecekler</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Sayacın hemen girişinde, gazı tümüyle kesmeye yarayan bir vana bulunur. Gaz kokusu aldığınızda bu vananın yerini bilmek hayati önem taşır: vana kolunu boruya dik konuma getirmek gazı keser. Sayaç ve bağlantılarına teknik müdahale (sökme, yer değiştirme, ek hat) kesinlikle yetkili kişilerce yapılmalıdır.</p><CheckList items={["Sayaç girişindeki kesme vanasının yerini öğrenin", "Vana kolu boruya dik = gaz kapalı", "Vana kolu boruyla paralel = gaz açık", "Cihazlar kapalıyken rakam ilerliyorsa dikkat", "Sayaca teknik müdahale yalnızca yetkili kişilerce yapılır"]} /></div><Photo src={vana} alt="Doğalgaz sayacı öncesindeki sarı kollu kesme vanası; kol boruya dik konumda, yani gaz kapalı" caption="Kesme vanası: kol boruya dik (90°) olduğunda gaz kapalı, boruyla paralel olduğunda açıktır." /></div>
      </Section>

      <Section n="11" label="Acil Durum" title={<>Gaz Kaçağından Şüphelenirseniz <Hot>Ne Yapmalı?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={kacakGuvenlik} alt="Mutfakta pencereyi açarak ortamı havalandıran bir kişi; arka planda sarı gaz boruları ve sayaç" caption="Gaz kokusunda ilk iş: gazı kesin, pencereleri açın, elektrikli hiçbir şeye dokunmayın." /><div><Steps items={[["Gazı kesin","Sayaç girişindeki vanayı boruya dik konuma getirin."],["Havalandırın","Pencere ve kapıları açarak ortamı havalandırın."],["Kıvılcım yapmayın","Elektrik düğmelerine, çakmak ve ateşe dokunmayın."],["Dışarı çıkın","Herkesi dışarı çıkarıp kapıyı açık bırakın."],["Acil hattı arayın","Dağıtım şirketinin doğalgaz acil hattını dışarıdan arayın."],["Uzman kontrolü isteyin","Kaçak kontrolü mutlaka yetkili servis tarafından yapılmalıdır."]]} /></div></div>
      </Section>

      <Section n="12" label="Profesyonel Destek" title={<>Ne Zaman <Hot>Uzman Gerekir?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Sayaç okumak herkesin yapabileceği bir iştir. Ancak sayacın ötesine geçen her durum profesyonel müdahale ister.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Gaz kaçağı şüphesi varsa","Kaçak tespiti ve onarımı yalnızca yetkili servis işidir."],["Sayaç arızalıysa","Gösterge arızası ve mühür işlemleri dağıtım şirketince yapılır."],["Sayaç yeri değişecekse","Sayaç taşıma ve hat değişimi projeli, yetkili iştir."],["Kombi bağlantısı yenilenecekse","Cihaz bağlantıları ve gaz hattı işleri uzmanlık ister."],["Tüketim anormal arttıysa","Ayarsız kombi veya gizli kaçak profesyonel kontrol ister."],["İç tesisat yenilenecekse","Daire içi doğalgaz tesisatı onaylı firmalarca yapılır."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><AlertTriangle className="h-4 w-4 text-brand-red" />{t}</h3><p className="mt-2 text-[12.5px] text-muted-foreground">{d}</p></Card>)}</div>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Gölge Tesisat olarak İstanbul genelinde doğalgaz iç tesisat, kombi bağlantısı, kaçak kontrolü ve tesisat onarımı hizmeti veriyoruz.</p>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Flame,"Doğalgaz tesisatı"],[Search,"Kaçak kontrolü"],[Wind,"Kombi bağlantısı"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Flame;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={profesyonel} alt="Eldivenli teknisyen, doğalgaz sayacı ve sarı borular üzerinde gaz kaçak dedektörü ve köpük testiyle kaçak kontrolü yapıyor" caption="Kaçak kontrolü, dedektör ve köpük testiyle uzman tarafından yapılır." /><p className="text-[14px] leading-relaxed text-muted-foreground">Doğalgazda "kendim hallederim" yaklaşımı güvenli değildir. Sayacı okumak ve vanayı kapatmak size kalır; gerisi uzmanlık ve yetki gerektirir. Şüpheli bir durumda vakit kaybetmeden profesyonel destek alın.</p></div><CTA final />
      </Section>

      {faq.length > 0 && <Section n="13" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"dogalgaz-kacagi"}} className="font-bold text-brand-red underline">Doğalgaz kaçağı nasıl anlaşılır?</Link><Link to="/blog/$slug" params={{slug:"kombi-bakimi-nasil-yapilir"}} className="font-bold text-brand-red underline">Kombi bakımı nasıl yapılır?</Link><Link to="/hizmet/$slug" params={{slug:"dogalgaz-tesisati"}} className="font-bold text-brand-red underline">Doğalgaz tesisatı hizmeti</Link></div></Section>}
    </main>
  </div>;
}
