import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert,
  Droplets, XCircle, Info,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/lavabo-tikanik/lavabo-tikanik-kapak.jpg";
import teshis from "@/assets/lavabo-tikanik/lavabo-tikanik-teshis.jpg";
import guvenliSira from "@/assets/lavabo-tikanik/lavabo-tikanik-guvenli-sira.jpg";
import kimyasal from "@/assets/lavabo-tikanik/lavabo-tikanik-kimyasal.jpg";
import sifon from "@/assets/lavabo-tikanik/lavabo-tikanik-sifon.jpg";
import profesyonel from "@/assets/lavabo-tikanik/lavabo-tikanik-profesyonel.jpg";
import onleme from "@/assets/lavabo-tikanik/lavabo-tikanik-onleme.jpg";
import ctaFinal from "@/assets/lavabo-tikanik/lavabo-tikanik-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Lavabonuz açılmıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Motorlu spiral ve kamerayla <span className="text-brand-red">aynı gün açıyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul Avrupa ve Anadolu yakasında lavabo ve gider tıkanıklığı açma, kamera görüntüleme ve hat kontrolü; kaydını teslim ediyoruz. 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Alacakaranlıkta İstanbul sokağında kırmızı servis aracı; tesisatçı alet çantasıyla apartmana yürüyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function LavaboTikanikEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Tıkanıklık</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kapsamlı Rehber</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Lavabo Tıkanıklığı <Hot>Nasıl Açılır?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Saç, sabun ve kozmetik birikiminin tapada mı, sifonda mı yoksa duvar hattında mı olduğunu ayıran güvenli karar sırası.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Su dolu banyo lavabosunda tıkanıklık; eldivenli el saç dolanmış pop-up tapayı kaldırıyor" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay–Orta"],[Clock,"Süre","15–40 dakika"],[Wrench,"Gerekli","Pompa + eldiven"],[ShieldAlert,"Ana risk","Kimyasal sıçraması"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Kısa Cevap" title={<>30 Saniyelik <Hot>Karar Kartı</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Musluğu kapatın, lavabodaki birikmiş suyu alın ve tapa çevresindeki görünür saç ile sabun kalıntısını temizleyin. Diğer giderler normalse ve su yalnızca bu lavaboda yavaş gidiyorsa taşma deliğini ıslak bezle kapatıp uygun bir lavabo pompası deneyin. Sonuç alınamazsa, bağlantısını bildiğiniz erişilebilir sifonu kova üzerinde kontrol edebilirsiniz. Su hiç gitmiyor, geri yükseliyor, yan giderde fokurdama oluyor veya birden fazla gider aynı anda yavaşlıyorsa zorlamayın; bu tablo sorunun sifondan ileride ya da ortak hatta olduğunu düşündürür.</p>
        <CheckList columns={2} items={["İlk kontrol noktası pop-up tapa ve süzgeç çevresidir","Pompalarken taşma deliğini ıslak bezle kapatın","Sifonu yalnızca bağlantısını tanıyorsanız açın","Kimyasal döküldüyse pompa, tel ve sökme uygulamayın","Birden fazla gider etkileniyorsa ev müdahalesini bırakın","Tekrarlayan tıkanıklıkta konumu doğrulatın"]} />
        <Warning title="Kimyasal kullandıysanız burada durun">Gidere sirke, karbonat, çamaşır suyu, asit veya başka bir açıcı eklemeyin. Pompa sıçramaya, sifonu açmak ise aşındırıcı sıvının boşalmasına neden olabilir. Ürün ambalajını saklayın ve gelen uzmana ne kullandığınızı söyleyin.</Warning>
      </Section>

      <Section n="03" label="Teşhis" title={<>Banyo Lavabosu <Hot>Neden Tıkanır?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Banyo lavabosunda temel birikim yağlı yemek artığı değil; saç, sakal, sabun, diş macunu ve kozmetik ürünleridir. İnce saçlar pop-up tıpanın altındaki çubuğa dolanır; sabun ve krem kalıntısı bu lifleri birbirine yapıştırarak su geçişini yavaşlatan esnek bir tabaka oluşturur. Birikim sifonun kıvrımına ilerlediğinde koku ve fokurdama eklenebilir. Mutfak evyesinde baskın nedenler farklıdır; yağ ve yemek kalıntısı yaşayanlar <Link to="/blog/$slug" params={{ slug: "mutfak-tikanikligi-nasil-acilir" }} className="font-bold text-brand-red underline underline-offset-2">mutfak tıkanıklığı rehberini</Link> izlemelidir.</p>
        <DataTable caption="Belirti ve etkilenen gider sayısı, birikimin erişilebilir bölümde mi yoksa ortak hatta mı olduğunu ayırmaya yardım eder." headers={["Birikim","Genellikle görüldüğü yer","Tipik ipucu","İlk güvenli kontrol"]} rows={[["Saç ve sakal","Tapa kolu veya süzgeç","Su giderek yavaşlar","Görünür kalıntıyı eldivenle alın"],["Sabun ve diş macunu","Tapa gövdesi veya sifon","Yapışkan açık renkli tabaka","Sökülebilen tapayı temizleyin"],["Kozmetik kalıntısı","Sifon ve yakın boru","Koku ile yavaş akış birlikte","Erişilebilir sifonu değerlendirin"],["Yabancı cisim","Tapa altı veya dirsek","Akış aniden durur","Zorlamayın, konumu doğrulatın"],["Ortak hat daralması","Duvar içi hat","Birden fazla gider etkilenir","Ev müdahalesini bırakın"]]} />
        <Photo className="mt-5" src={teshis} alt="Lavabo altındaki şeffaf sifonda saç ve sabun birikimi; eldivenli el tıkanıklığın yerini gösteriyor" caption="Tıkanıklığın yeri çoğu zaman sifonun kıvrımıdır; şeffaf veya sökülebilir sifonda birikim doğrudan görülebilir." />
      </Section>

      <Section n="04" label="Konum Tespiti" title={<>Tapada mı, Sifonda mı, <Hot>Duvar Hattında mı?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Önce lavaboyu kullanmayı bırakın ve aynı banyodaki duş, yer süzgeci ve klozetin davranışını gözleyin. Yalnız lavabo yavaşsa sorun çoğunlukla tapa, sifon veya yakın bağlantıdadır. Duş gideri de yavaşlıyor, klozet kullanıldığında lavabodan ses geliyor ya da su başka bir giderden yükseliyorsa ortak hat ihtimali artar. Pop-up tıpayı kaldırdığınızda su belirgin biçimde hızlanıyorsa tapa çevresini kontrol edin; tapa çıkarıldığı halde su yavaşsa sifon veya duvar bağlantısı değerlendirilir. Sifondan su sızması, tıkanıklık kadar conta ve bağlantı sorununa da işaret edebilir.</p>
        <CheckList columns={2} items={["Yalnız lavabo yavaş → tapa veya sifon","Duş ve klozet de etkileniyor → ortak hat","Tapa açılınca akış hızlanıyor → tapa çevresi","Tapa çıkınca da yavaş → sifon veya duvar hattı","Sifondan sızıntı → conta ve bağlantı kontrolü","Su başka giderden yükseliyor → müdahaleyi bırakın"]} />
      </Section>

      <Section n="05" label="Uygulama" title={<>Evde Güvenle Denenebilecek <Hot>5 Adım</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Aşağıdaki sıra, yalnızca kimyasal bulunmayan ve tek banyo lavabosuyla sınırlı yakın birikimler içindir. Her adımdan sonra az miktarda suyla akışı gözleyin. Parça zorlanıyor, bağlantı dönüyor, sızıntı başlıyor veya su geri yükseliyorsa sonraki adıma geçmeyin.</p>
        <Steps items={[
          { title: "Suyu durdurun ve hazneyi boşaltın", body: "Musluğu kapatın. Biriken suyu küçük bir kapla alın; böylece gider ağzını görebilir ve sıçrama riskini azaltabilirsiniz. Eldiven kullanın." },
          { title: "Tapa ve süzgeç çevresini temizleyin", body: "Görünür saç, sakal ve sabun kalıntısını gidere itmeyin; yukarı doğru alıp kapalı bir çöpe atın. Tapa kolayca çıkmıyorsa zorlamayın." },
          { title: "Taşma deliğini kapatıp pompa uygulayın", body: "Lavaboda pompa lastiğini örtecek kadar su bırakın. Taşma deliğini ıslak bezle sıkıca kapatın, pompayı gider ağzına tam oturtun ve kontrollü dik hareketler uygulayın." },
          { title: "Erişilebilir sifonu kontrol edin", body: "Bağlantıyı biliyorsanız altına geniş bir kova ve bez koyun. Parçaların ve contaların sırasını kaydedin; birikimi çıkarıp bağlantıyı el sıkılığında geri kurun. Sonrasında düşük debide sızıntı testi yapın." },
          { title: "Akışı test edin veya durun", body: "Su rahat gidiyor ve bağlantı kuru kalıyorsa işlem tamamlanmıştır. Akış hâlâ yavaşsa, geri tepme varsa veya duvar bağlantısından şüpheleniyorsanız tel ve kimyasalla zorlamayın." },
        ]} />
        <Photo className="mt-5" src={guvenliSira} alt="Eldivenli kişi lavabo pompası uyguluyor; diğer eliyle taşma deliğini ıslak bezle kapatıyor" caption="Pompanın oluşturduğu basınç taşma deliği açıkken kaçar; deliği ıslak bezle kapatmak basıncı tıkaca yönlendirir." />
        <Warning title="Sifon sökülürken conta sırası önemlidir">Conta ters takılır, çapraz sıkılır veya eski conta yerinden oynarsa tıkanıklık açıldıktan sonra sızıntı başlayabilir. Bağlantı yapısını bilmiyorsanız <Link to="/blog/$slug" params={{ slug: "lavabo-sifonu-nasil-takilir" }} className="font-bold underline underline-offset-2">lavabo sifonu bağlantı rehberini</Link> inceleyin veya sökmeden destek alın.</Warning>
      </Section>

      <Section n="06" label="Yöntem Seçimi" title={<>Pompa, Saç Teli ve Sifon <Hot>Hangi Durumda?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Pompa, gider ağzına yakın ve su hareketiyle yer değiştirebilen birikimde işe yarayabilir; ancak çok sert pompalama gevşek sifon bağlantısında sızıntı başlatabilir. Plastik saç çıkarma şeridi yalnızca gider ağzına yakın saçları yukarı almak içindir; sert metal tel tapayı çizebilir veya birikimi duvar hattına taşıyabilir. Sifon, su perdesi oluşturarak kokunun yaşam alanına geçmesini sınırlar; parça çatlak veya duvar bağlantısı oynaksa evde sökme uygun değildir.</p>
        <DataTable headers={["Yöntem","Uygun olabileceği durum","Uygun olmadığı durum","Ana risk"]} rows={[["Elle yüzey temizliği","Görünür saç ve sabun","Keskin veya ulaşılamayan cisim","Birikim içeri itilebilir"],["Lavabo pompası","Tek lavaboda yakın tıkaç","Kimyasal bulunan gider","Sıçrama veya gevşek bağlantı"],["Plastik saç şeridi","Tapa altındaki saç","Derin ve sert engel","Contaya takılma"],["Sifon kontrolü","Erişilebilir sifon birikimi","Bağlantısı bilinmeyen sistem","Conta kayması ve sızıntı"],["Profesyonel spiral ve kamera","Derin veya tekrarlayan sorun","Kullanıcı müdahalesi değildir","Yanlış ekipmanla boru hasarı"]]} />
      </Section>

      <Section n="07" label="Kimyasallar" title={<>Karbonat, Sirke ve Açıcılar <Hot>Ne Kadar Etkili?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Karbonat ile sirkenin köpürmesi saç yumağını kesmez veya derindeki yabancı cismi çıkarmaz; hafif yüzey kalıntısı ve koku üzerinde sınırlı etkisi olabilir. Aşındırıcı lavabo açıcılar ciddi cilt ve göz hasarı riski taşır; ürünleri birbiriyle, çamaşır suyuyla veya asitle birleştirmek güvenli değildir. Kaynar su da plastik bağlantıyı ve contayı olumsuz etkileyebilir. Kimyasal dökülmüş bir gider açılmadığında tesisatçıya ürünün adı ve ne zaman kullanıldığı söylenmelidir.</p>
        <Photo className="mt-5" src={kimyasal} alt="Lavabo yanında kimyasal açıcı, sirke ve karbonat; eldivenli el dur işareti yapıyor" caption="Farklı ürünleri karıştırmak hiçbir durumda güvenli değildir; köpürme, saç tıkacını mekanik olarak çıkarmaz." />
        <DataTable headers={["Yaklaşım","Gerçekçi beklenti","Kullanmayın eğer","Daha güvenli seçenek"]} rows={[["Karbonat ve sirke","Hafif yüzey kalıntısı veya koku desteği","Başka ürün kullanıldıysa","Görünür birikimi mekanik alın"],["Kaynar su","Saç tıkacını çıkarmaz","Plastik veya hassas bağlantı varsa","Ilık suyla kontrollü durulama"],["Kimyasal açıcı","Sonuç ve uyumluluk ürüne bağlıdır","Ürün geçmişi bilinmiyorsa","Pompa veya profesyonel teşhis"],["Farklı ürünleri karıştırma","Güvenli bir faydası yoktur","Her durumda","Asla karıştırmayın"]]} />
        <Warning title="Temas veya zehirlenme şüphesinde">Ürünün etiketini yanınızda tutun, bölgeyi havalandırın ve etiketteki ilk yardım talimatını uygulayın. Türkiye'de Ulusal Zehir Danışma Merkezi 114, acil sağlık hizmetleri 112 üzerinden ulaşılabilir.</Warning>
      </Section>

      <Section n="08" label="Koku ve Ses" title={<>Koku ve Fokurdama <Hot>Ne Anlama Gelir?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Koku tek başına her zaman tam tıkanıklık anlamına gelmez. Sifondaki su perdesinin azalması, bağlantı sızıntısı, biriken organik kalıntı veya ortak hattaki hava hareketi koku oluşturabilir. Su akarken kabarcık ve fokurdama görülmesi, havanın daralmış bir hattan geri hareket ettiğini düşündürebilir. Önce sifonda su bulunduğunu ve bağlantı çevresinin kuru olduğunu kontrol edin; koku sürüyorsa <Link to="/blog/$slug" params={{ slug: "giderden-gelen-lagim-kokusu-nasil-giderilir" }} className="font-bold text-brand-red underline underline-offset-2">giderden gelen kanalizasyon kokusu</Link> rehberindeki su perdesi, conta ve havalandırma kontrollerini karşılaştırın.</p>
        <InfoBox title="Kokuyu parfümle bastırmak teşhis değildir">Koku giderici ürünler belirtinin kaynağını çözmez. Sifonun su tutması, contaların sızdırmaması ve hattın serbestçe hava-su hareketine izin vermesi gerekir.</InfoBox>
      </Section>

      <Section n="09" label="Güvenlik Sınırı" title={<>Hangi Belirtilerde <Hot>Müdahaleyi Bırakın?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Evde müdahalenin sınırı, erişilebilir ve tek gidere ait yakın birikimdir. Takı veya küçük bir parça gidere düştüyse pompa uygulamak parçayı daha derine taşıyabilir; sert bir cismin düştüğünü biliyorsanız suyu kullanmayın.</p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">{["Birden fazla gider aynı anda yavaşlıyor","Su başka bir noktadan geri çıkıyor","Duvar bağlantısında sızıntı görülüyor","Gidere kimyasal döküldü","Sert bir cisim veya takı düştü","Güvenli yüzey temizliği ve pompa sonuç vermedi","Sorun kısa sürede tekrarlıyor","Sifon veya duvar bağlantısında çatlak var"].map((item) => <li key={item} className="flex items-start gap-2.5 rounded-lg border border-brand-red/40 bg-brand-red/5 p-3 text-[13px] leading-snug"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{item}</span></li>)}</ul>
        <CTA />
      </Section>

      <Section n="10" label="Profesyonel Süreç" title={<>Profesyonel Lavabo Açma <Hot>Nasıl Yapılır?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Profesyonel işlem doğrudan makine kullanmakla başlamaz. Önce hangi giderlerin etkilendiği, kimyasal kullanılıp kullanılmadığı ve tıkanıklığın ne sıklıkta tekrar ettiği sorulur. Derin tıkanıklıklarda hatta uygun uçla motorlu spiral kullanılabilir; tekrarlayan sorunlarda kamera, boru içindeki kalıntıyı, bağlantı kusurunu veya yabancı cismi görmeye yardım eder. Amaç yalnız suya geçici bir yol açmak değil, tekrara neden olan bölgeyi belirlemektir.</p>
        <Photo className="mt-5" src={profesyonel} alt="Tesisatçı motorlu spiral makinesiyle banyo duvar hattına müdahale ediyor; yanında kamera monitörü" caption="Motorlu spiral ve kamera görüntüleme, derin ve tekrarlayan tıkanıklıklarda konum ve nedeni doğrular." />
        <DataTable headers={["Aşama","Kontrol edilen","Kullanılabilecek yöntem","Beklenen sonuç"]} rows={[["Ön görüşme","Etkilenen giderler ve kimyasal geçmişi","Belirti analizi","Güvenli çalışma sınırı belirlenir"],["Yakın hat kontrolü","Tapa ve sifon","Manuel temizlik","Erişilebilir birikim çıkarılır"],["Derin hat açma","Duvar içindeki daralma","Uygun uçlu motorlu spiral","Akış yolu kontrollü açılır"],["Tekrar nedeni","Boru iç yüzeyi ve bağlantılar","Kamera ile görüntüleme","Konum ve neden doğrulanır"],["Son test","Akış ve bağlantı sızdırmazlığı","Kontrollü su testi","Sonuç gözlenir"]]} />
      </Section>

      <Section n="11" label="Önleme" title={<>Yeniden Tıkanması <Hot>Nasıl Önlenir?</Hot></>}>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Tıkanıklığı önlemenin en etkili yolu saçı boruya gitmeden yakalamaktır. Tapa ve süzgeç çevresini düzenli olarak gözle kontrol edin; çıkan saçı lavaboya geri itmeyin. Tıraş sonrası sakalı önce kuru bir bezle toplayıp çöpe atın. Yoğun krem, kil maskesi ve makyaj kalıntısını doğrudan gidere yıkamak yerine önce kâğıt veya bezle alın. Sifonu gereksiz yere sık sökmek de doğru değildir; her sökme contanın yanlış oturma riskini artırır.</p>
        <Photo className="mt-5" src={onleme} alt="Lavabo giderine ince tel saç tutucu süzgeç yerleştiren el" caption="İnce telli saç tutucu, birikimi boruya ulaşmadan yakalamanın en basit yoludur." />
        <CheckList columns={2} items={["Tapa çevresini haftada bir gözle kontrol edin","Saçı ve sakalı gidere değil çöpe atın","Kozmetik kalıntısını önce bezle alın","Küçük takı ve kapakları lavabodan uzak tutun","Akış yavaşlamasını erken fark edin","Sifonu gereksiz yere sık sökmeyin"]} />
        <CTA final />
      </Section>

      <Section n="12" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}>
        <div className="mt-5 grid gap-2">{faq.map((f) => <details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90" /></summary><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div>
      </Section>
    </main>
  </div>;
}
