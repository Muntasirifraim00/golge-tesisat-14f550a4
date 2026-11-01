import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Droplets, Ruler, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/dusakabin/dusakabin-kapak.jpg";
import malzemeler from "@/assets/dusakabin/dusakabin-malzemeler.jpg";
import terazi from "@/assets/dusakabin/dusakabin-terazi.jpg";
import delme from "@/assets/dusakabin/dusakabin-delme.jpg";
import silikon from "@/assets/dusakabin/dusakabin-silikon.jpg";
import temperliCam from "@/assets/dusakabin/dusakabin-temperli-cam.jpg";
import kuvetUstu from "@/assets/dusakabin/dusakabin-kuvet-ustu.jpg";
import sizintiTesti from "@/assets/dusakabin/dusakabin-sizinti-testi.jpg";
import ctaFinal from "@/assets/dusakabin/dusakabin-tesisatci-cagir.jpg";

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
  return <ol className="mt-5 grid gap-2">{items.map((s, i) => <li key={s.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-3.5"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-red text-[13px] font-black text-brand-red-foreground">{String(i + 1).padStart(2, "0")}</span><div><b className="text-[13.5px]">{s.title}</b><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{s.body}</p></div></li>)}</ol>;
}
function Warning({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-brand-red/50 bg-brand-red/10 p-4"><AlertTriangle className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold text-brand-red">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-foreground/80">{children}</div></div></div>;
}
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Montajı riske atmak istemiyor musunuz?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Sıfır sızıntı garantisiyle <span className="text-brand-red">aynı gün monte ediyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Duşakabin, klozet, lavabo ve tüm vitrifiye montajı; keşif ücretsiz, İstanbul genelinde 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Gece İstanbul'da yağmurlu sokakta apartman önünde kırmızı tesisat servis aracı; tesisatçı kapıya yürüyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function DusakabinEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Banyo & Vitrifiye</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Montaj Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Duşakabin Montajı <Hot>Nasıl Yapılır?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Montajın sırrı doğru ölçü, terazi ve kusursuz sızdırmazlıktır. Tekneli/teknesiz montaj, silikon zamanlaması ve su testi adım adım.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Koyu fayanslı banyoda çerçevesiz cam duşakabin monte ediliyor; eldivenli eller cam paneli yerleştiriyor" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Orta-Zor · 4/5"],[Clock,"Süre","2–3 saat + 24 saat kuruma"],[Wrench,"Gerekli","Elmas uç + terazi + silikon"],[ShieldAlert,"Ana risk","Temperli cam patlaması"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Tip Seçimi" title={<>Önce Tipi Belirleyin: <Hot>Tekneli mi, Teknesiz mi?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Bu seçim hem montaj yöntemini hem suyun nereye akacağını belirler. Tekneli duşakabinde camlar akrilik duş teknesinin üzerine monte edilir; su tekne içindeki gidere akar, montajı kolaydır ve zemin yalıtımı eksikse bile tekne ek güvenlik katmanı sağlar. Teknesiz (fayans üstü) duşakabinde camlar doğrudan fayanslı zemine sabitlenir, su yer giderine akar; modern ve ferah görünür ama zemin eğiminin gidere doğru verilmiş ve yalıtımın kusursuz olması şarttır.</p><CheckList items={["Tekneli → akrilik tekne üzerine montaj, ek güvenlik, kolay montaj", "Teknesiz → camlar zemine sabitlenir, modern görünüm, kusursuz eğim + yalıtım şart", "Zemin eğimi yoksa veya yalıtım zayıfsa → tekneli sistem daha güvenli", "Köşe, çeyrek daire, kare veya düz (tek cam) → form banyo planına göre seçilir"]} /></div><Photo src={kuvetUstu} alt="Akrilik küvetin kenarına alüminyum profil hizalanarak küvet üstü duşakabin monte ediliyor" caption="Küvet üstü kabin, küveti sökmeden duş çözümü sağlar; montaj mantığı fayans üstüyle aynıdır." /></div>
      </Section>

      <Section n="03" label="Ölçü" title={<>Doğru Ölçü Alma: <Hot>90x90, 80x80 ve Köşe Boşluğu</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">En sık yaşanan hayal kırıklığı, yanlış ölçüyle alınan kabinin köşeye oturmamasıdır. Ölçüyü hem zemin hizasından hem cam üst hizasından alın; duvarlar her zaman tam dik değildir. Çoğu kaliteli duşakabin, duvar düzgünsüzlüğünü tolere etmek için ayarlanabilir (teleskobik) profille gelir — bu pay 1–2 cm'lik sapmaları telafi eder. Kapının açılma yönünü ve önündeki boşluğu da hesaba katın; sürgülü kapı dar banyolarda, açılır kapı geniş banyolarda avantajlıdır.</p>
        <CheckList columns={2} items={["Köşe boşluğunu hem zeminden hem üst hizadan ölçün", "Ayarlanabilir (teleskobik) profilli model seçin", "Kapının açılma yönünü ve önündeki boş alanı kontrol edin", "Sifon/gider konumunu kabin tabanıyla uyumlu seçin"]} />
      </Section>

      <Section n="04" label="Malzemeler" title={<>Gerekli <Hot>Malzemeler</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={malzemeler} alt="Koyu zeminde duşakabin parçaları: alüminyum profiller, cam paneller, tekerlekler, vidalar, silikon" caption="Seramik delmek için elmas uç ve antibakteriyel banyo silikonu, montajın kaderini belirleyen iki kalemdir." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Fayans üstü montajda seramiği çatlatmamak için mutlaka seramik/granit matkap ucu (elmas uçlu) kullanın; normal beton ucu fayansı kırar. Silikonda mantar oluşumunu önleyen, banyo için üretilmiş antibakteriyel silikon tercih edin.</p><CheckList items={["Duşakabin seti (camlar, profiller, contalar, vidalar, dübeller)", "Antibakteriyel banyo silikonu + silikon tabancası", "Elmas uçlu seramik matkap ucu + darbesiz mod", "Su terazisi, metre, kalem, maskeleme bandı", "Tornavida/alyan takımı, paslanmaz vidalar", "Vantuz (cam taşımak için) + eldiven"]} /></div></div>
      </Section>

      <Section n="05" label="Montaj" title={<>Adım Adım <Hot>Duşakabin Montajı</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Adımlar hem tekneli hem teknesiz montaj için geçerlidir; tek fark, tekneli sistemde önce teknenin yerleştirilip teraziye alınmasıdır. Her adımda terazi kontrolü yapmak, kabini bir kez doğru monte etmenin anahtarıdır — acele etmeyin.</p>
        <Steps items={[
          { title: "Tekneli ise önce tekneyi yerleştirin", body: "Teraziye alın, gider bağlantısını yapıp sızdırmazlığını test edin." },
          { title: "Duvar profillerini dikey hizalayın", body: "Profili duvara dayayıp su terazisiyle dikey olduğunu doğrulayın, delik yerlerini işaretleyin." },
          { title: "Seramiği çatlatmadan delin", body: "Elmas uçla, düşük devirde, maskeleme bandı kullanarak delik açın; dübelleri yerleştirin." },
          { title: "Profilleri sabitleyin", body: "Duvar profillerini vidalayın, taban profilini (teknesizde zemine) hizalayıp tespit edin." },
          { title: "Camları takın", body: "Sabit camları profillere contalarıyla oturtun, ardından kapı/sürgü camını takıp ayarlayın." },
          { title: "Kapı boşluğunu ayarlayın", body: "Sürgülü sistemlerde tekerlek/rulman ayarıyla kapının düzgün kaymasını sağlayın." },
          { title: "Silikon çekin", body: "Tüm dış birleşim noktalarına (cam-profil, profil-duvar, taban) silikon uygulayın." },
          { title: "Kurumayı bekleyin", body: "Silikon tam kürlenene kadar (genelde 24 saat) duşakabini kullanmayın." },
          { title: "Su testi yapın", body: "24 saat sonra duşu açıp birleşim yerlerinden dışarı su sızıp sızmadığını kontrol edin." },
        ]} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2"><Photo src={terazi} alt="Duvara dayalı alüminyum duşakabin profilinin yanında kırmızı su terazisi; hava kabarcığı ortada" caption="Profilleri delmeden önce teraziyle iki kez kontrol edin — yamuk profil, camların kapanmaması demektir." /><Photo src={delme} alt="Eldivenli el şarjlı matkapla fayans duvarı deliyor; seramik tozu görünüyor" caption="Elmas uç, düşük devir, maskeleme bandı — seramiği çatlatmadan delmenin üç kuralı." /></div>
      </Section>

      <Section n="06" label="Su Testi" title={<>Montaj Sonrası <Hot>Su Testi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={sizintiTesti} alt="Cam duşakabinde duş çalışıyor; dışarıda biri el feneriyle taban birleşimlerinde sızıntı kontrolü yapıyor" caption="24 saat kuruma sonrası duşu açın ve tüm birleşimleri fenerle kontrol edin." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Silikon tam kürlendikten sonra duşu açıp cam-profil, profil-duvar ve taban birleşimlerinden dışarı su sızıp sızmadığını kontrol edin. Sızıntı varsa ilgili birleşimi kurutup yeniden silikonlayın; test temiz çıkana kadar kabini kullanıma açmayın.</p></div></div>
        <CTA />
      </Section>

      <Section n="07" label="Sızdırmazlık" title={<>Bir Numaralı Kural: Silikonu <Hot>Doğru Noktaya Çekmek</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Çoğu kişinin yanlış bildiği kural: silikon, kabinin <b className="text-foreground">DIŞ</b> birleşim noktalarına çekilir, içine değil. Kabinin içine giren su, profillerin altındaki tahliye kanallarından geri kabin içine akıp gidere gitmelidir. İç tarafı silikonla kapatırsanız biriken su dışarı çıkamaz; küf, koku ve sızıntıya dönüşür. Düzgün hat için birleşimin iki yanına maskeleme bandı yapıştırın, silikonu çekin, ıslak parmakla düzeltin ve bandı kurumadan kaldırın.</p></div><Photo src={silikon} alt="Silikon tabancasıyla cam duşakabinin taban birleşimine düzgün beyaz silikon hattı çekiliyor" caption="Silikon dış birleşimlere çekilir; iç tarafta suyun tahliyesine izin verilir." /></div>
        <Warning title="Kabin içine silikon çekmeyin">İç birleşimleri silikonla kapatmak, profil içinde biriken suyun tahliyesini engeller; zamanla küf, koku ve sızıntı yapar. Doğru uygulama: dış birleşimleri sızdırmaz yapmak, içte tahliyeyi açık bırakmak.</Warning>
      </Section>

      <Section n="08" label="Güvenlik" title={<>Cam Panelleri Taşırken: <Hot>Temperli Cam Güvenliği</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={temperliCam} alt="Temperli cam duş panelinin kenarında küçük bir kırık; kırmızı uyarı ışığı" caption="Temperli camın en zayıf noktası kenar ve köşeleridir — köşeyle zemine değdirmeyin." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Duşakabin camları temperli (güvenlik) camdır; kırıldığında keskin parçalar yerine küçük taneciklere ayrılır. Ancak camı sert zemine köşesiyle değdirmek ya da profile zorla oturtmak aniden patlamasına yol açabilir. 6–8 mm paneller tek kişinin taşıyacağından ağırdır; montajda mutlaka ikinci bir kişi bulundurun. Yere koymanız gerekirse altına battaniye ya da karton serin, fayansa doğrudan bırakmayın.</p></div></div>
        <CheckList columns={2} items={["Panelleri her zaman dik taşıyın, köşelerini koruyun", "Camı asla zorlayarak profile oturtmayın — ani patlama riski", "Montajda ikinci bir kişi şart", "Çocukları ve evcil hayvanları montaj alanından uzak tutun"]} />
      </Section>

      <Section n="09" label="Zorluk" title={<>Tiplere Göre <Hot>Montaj Zorluğu</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Genel kural: tekneli ve standart ölçülü modeller el becerisi olan biri için DIY yapılabilirken; teknesiz, ankastre ve özel ölçü/duvara sıfır sistemler hata payı düşük, profesyonel işlerdir.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Duşakabin tipi</th><th className="px-4 py-3">Montaj yöntemi</th><th className="px-4 py-3">Yalıtım hassasiyeti</th><th className="px-4 py-3">Zorluk</th></tr></thead><tbody className="divide-y divide-border">{[["Tekneli (akrilik tekne)","Tekne + cam montajı","Orta","Kolay-Orta"],["Teknesiz / fayans üstü","Zemine doğrudan montaj","Yüksek","Orta-Zor"],["Köşe / çeyrek daire (oval)","İki duvar + kavisli cam","Orta","Orta"],["Düz (tek cam / walk-in)","Tek panel sabitleme","Yüksek","Orta"],["Özel ölçü / duvara sıfır","Ölçüye göre üretim","Çok yüksek","Zor (profesyonel)"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="10" label="Karar" title={<>Kendiniz mi, <Hot>Profesyonel mi?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Tekneli, standart ölçülü bir duşakabinin montajı; matkap kullanmayı bilen, sabırlı biri için yapılabilir bir iştir. Ancak teknesiz montaj, duvara sıfır ve özel ölçü sistemler, zemin eğimi düzeltmesi gereken durumlar ve ağır temperli camların güvenli taşınması hata payı düşük işlerdir. Yanlış montajın bedeli çoğu zaman zemine su kaçağı ve alt katla komşuluk sorunlarıdır.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-success"><ThumbsUp className="h-5 w-5" /> DIY yapılabilir</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Tekneli, standart ölçülü duşakabin","Matkap deneyimi + ikinci bir kişi varsa","Zemin eğimi ve yalıtım zaten sağlamsa"].map(t=><li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>)}</ul></Card><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-brand-red"><XCircle className="h-5 w-5" /> Profesyonel çağırın</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Teknesiz / fayans üstü montaj","Duvara sıfır / özel ölçü sistemler","Zemin eğimi düzeltmesi gerekiyorsa","Ağır temperli cam taşıma + gider düzenlemesi"].map(t=><li key={t} className="flex gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{t}</li>)}</ul></Card></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Ruler,"Ücretsiz keşif + ölçü"],[Droplets,"Sıfır sızıntı garantisi"],[Clock,"Aynı gün montaj + su testi"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Ruler;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="11" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"dusakabin-silikonu-nasil-cekilir"}} className="font-bold text-brand-red underline">Duşakabin silikonu nasıl çekilir</Link><Link to="/blog/$slug" params={{slug:"dusakabin-su-kaciriyor-nedenleri-cozumu"}} className="font-bold text-brand-red underline">Duşakabin su kaçırıyor</Link><Link to="/hizmet/$slug" params={{slug:"dusakabin-vitrifiye-montaji"}} className="font-bold text-brand-red underline">Duşakabin ve vitrifiye montajı</Link></div></Section>}
    </main>
  </div>;
}
