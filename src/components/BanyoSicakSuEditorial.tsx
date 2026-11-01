import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, Search, Droplets, ShieldAlert,
  ThumbsUp, Thermometer, ShowerHead, Flame,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/banyo-sicak-su/banyo-sicak-su-kapak.jpg";
import teshis from "@/assets/banyo-sicak-su/banyo-sicak-su-teshis.jpg";
import nedenler from "@/assets/banyo-sicak-su/banyo-sicak-su-nedenler.jpg";
import perlator from "@/assets/banyo-sicak-su/banyo-sicak-su-perlator.jpg";
import dusBasligi from "@/assets/banyo-sicak-su/banyo-sicak-su-dus-basligi.jpg";
import kartus from "@/assets/banyo-sicak-su/banyo-sicak-su-kartus.jpg";
import esanjor from "@/assets/banyo-sicak-su/banyo-sicak-su-esanjor.jpg";
import termosifon from "@/assets/banyo-sicak-su/banyo-sicak-su-termosifon.jpg";
import basinc from "@/assets/banyo-sicak-su/banyo-sicak-su-basinc.jpg";
import kontrol from "@/assets/banyo-sicak-su/banyo-sicak-su-kontrol.jpg";
import profesyonel from "@/assets/banyo-sicak-su/banyo-sicak-su-profesyonel.jpg";
import ctaFinal from "@/assets/banyo-sicak-su/banyo-sicak-su-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Sıcak su hâlâ zayıf mı?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Teşhisi ve çözümü <span className="text-brand-red">uzmana bırakın.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul genelinde 7/24 servis, ücretsiz keşif ve garantili işçilik.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="İstanbul sokaklarında gün batımında duran kırmızı tesisat servis aracı; kapısında oturan tesisatçı ve arkada takım çantaları" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

const nedenlerData = [
  ["Perlatör (musluk ucu) kireci", "En yaygın ve en kolay çözülen neden; kireç süzgeci tıkar, akış inceler."],
  ["Duş başlığı kireçlenmesi", "Duşta zayıf, lavaboda normalse büyük olasılıkla duş başlığı veya spiral hortum tıkalıdır."],
  ["Batarya kartuşu arızası", "Tek kollu bataryalarda kartuş aşınınca sıcak taraf kısılır; soğuk normal akar."],
  ["Kombi plakalı eşanjör kireci", "Tüm evde sıcak su hem az hem değişken sıcaklıkta gelir (bir sıcak bir soğuk)."],
  ["Çek valf / mikser arızası", "Sıcak su soğuk hatta kaçar, musluğa ulaşan sıcak debi düşer."],
  ["Düşük bina/şebeke basıncı", "Özellikle üst katlarda hem sıcak hem soğuk zayıf akar; hidrofor gerekebilir."],
];

export function BanyoSicakSuEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Su Tesisatı</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Sıcak Su Sorun Giderme Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Banyoya Sıcak Su Az Akıyor: <Hot>Nedenleri ve Çözümü</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Soğuk su normal akarken sıcak su ince geliyorsa sorun çoğunlukla kombide değil, sıcak su yolundaki basit bir daralmadadır: perlatör, duş başlığı, kartuş veya eşanjör kireci.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Duş başlığından zayıf, ince bir su akışı gelirken elini suya uzatan ve şaşkınlıkla bakan bir kişi" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay · 2/5"],[Clock,"Tahmini süre","5–30 dakika"],[Wrench,"Gerekli alet","Sirke + diş fırçası"],[ShieldAlert,"Ana risk","Kombi eşanjörü kireci"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Teşhis" title={<>Önce Şunu Belirleyin: <Hot>Sorun Sıcakta mı, Tüm Tesisatta mı?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="border-l-2 border-brand-red pl-4 text-[15px] leading-relaxed text-foreground/85">Doğru teşhisin ilk adımı, sorunun yalnızca sıcak suda mı yoksa hem sıcak hem soğukta mı olduğunu anlamaktır. Aynı musluktan soğuk su güçlü akarken sıcak su ince geliyorsa evin genel basıncı sağlıklıdır; daralma sıcak su yolundadır. Bir de şunu deneyin: sorun tek muslukta mı, yoksa evdeki tüm sıcak su noktalarında mı var?</p><div className="mt-4 grid gap-2">{[[Thermometer,"Soğuk normal, sıcak ince → daralma sıcak su yolunda"],[Droplets,"Hem sıcak hem soğuk zayıf → musluk veya bina basıncı"],[Search,"Sorun tek muslukta → perlatör/kartuş/hortum"],[Flame,"Tüm evde sıcak zayıf → kombi eşanjörü veya sıcak su hattı"]].map(([I,t])=>{const Icon=I as typeof Thermometer; return <Card key={t as string} className="flex items-center gap-3 p-3"><Icon className="h-5 w-5 text-brand-red"/><b className="text-[13px]">{t as string}</b></Card>})}</div></div><Photo src={teshis} alt="İki aynı lavabo bataryası yan yana: soldaki soğuk taraftan güçlü su akıyor, sağdaki sıcak taraftan ince bir damla akışı geliyor" caption="Soğuk güçlü, sıcak ince akıyorsa sorun evin basıncında değil, sıcak su yolundaki bir daralmadadır." /></div>
      </Section>

      <Section n="03" label="Kısa Cevap" title={<>Sıcak Su Az Akıyorsa <Hot>İlk Bakılacak Yer Neresi?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Sıcak suyun az akmasının arkasında genellikle birkaç nedenden biri bulunur ve belirtiler hangisinin sorumlu olduğunu büyük ölçüde ele verir. En olasıdan başlayarak kontrol etmek zaman kazandırır: önce musluk ucundaki perlatör ve duş başlığı, sonra batarya kartuşu ve köşe vanası, en sonda kombi eşanjörü ve bina basıncı.</p>
        <CheckList columns={2} items={["Tek muslukta zayıf → perlatör veya duş başlığı kireci", "Perlatör temizse tek muslukta → batarya kartuşu", "Tüm evde zayıf + sıcaklık zıplıyor → kombi eşanjörü", "Hem sıcak hem soğuk zayıf (üst kat) → bina basıncı", "Köşe vanasının tam açık olduğunu kontrol edin", "Kombide hiç sıcak su yoksa ayrı bir arıza vardır"]} />
      </Section>

      <Section n="04" label="Nedenler" title={<>Sıcak Su Az Akmasının <Hot>En Sık Nedenleri</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start"><div className="grid gap-2">{nedenlerData.map(([t,d],i)=><Card key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/50 text-[11px] font-black text-brand-red">0{i+1}</span><div><h3 className="text-[14px] font-extrabold">{t}</h3><p className="mt-1 text-[12px] text-muted-foreground">{d}</p></div></Card>)}</div><Photo src={nedenler} alt="Dört yaygın neden yan yana: kireçli perlatör, kireçle tıkanmış duş başlığı, kapağı açık kombi ve düşük basınç gösteren manometre" /></div>
        <Warning title="Bu adımda zorlanıyorsanız">Kireç temizliği ve filtre kontrolünden sonra sorun devam ediyorsa neden kombi eşanjöründe, basınç düşürücüde veya tesisat içindedir; bunlar cihazla kontrol gerektirir. Profesyonel ekibimizden destek alabilirsiniz; arıza yerinde tespit edilir.</Warning><CTA />
      </Section>

      <Section n="05" label="En Yaygın Suçlu" title={<>Perlatör ve Duş Başlığı <Hot>Kireci</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={perlator} alt="Kireç kaplı duş başlığını sirke dolu cam kâseye batıran eller; yanında diş fırçası" caption="Perlatörü ve duş başlığını sirkeli suda bekletip fırçalamak çoğu zaman akışı anında düzeltir." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Musluğun ucundaki küçük süzgece perlatör denir; suyu havalandırıp düzgün akıtırken gelen tortu ve kireci tutar. Zamanla bu süzgeç kireçle dolar ve özellikle sıcak su tarafında akışı belirgin biçimde kısar (sıcak su kireç bırakmaya daha yatkındır). Aynı durum duş başlığının deliklerinde de yaşanır. İyi haber: bu en sık neden, aynı zamanda evde en kolay çözülenidir.</p><CheckList items={["Perlatörü elle sökün, süzgeci sirke/kireç çözücüde bekletin", "Fırçayla temizleyip durulayın ve geri takın", "Duş başlığını sökün, deliklerini kireçten arındırın", "Spiral hortumun kıvrılmadığını/ezilmediğini kontrol edin"]} /></div></div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Duşta su zayıf ama lavaboda normalse, şüpheli neredeyse kesinlikle duş başlığı veya spiral hortumdur. Başlığı söküp hortumu doğrudan açın: hortumdan güçlü su geliyorsa sorun başlıktadır; hortumdan da zayıf geliyorsa sorun bataryanın içinde (kartuş) veya hattadır.</p><CheckList items={["Duş başlığını söküp hortumu doğrudan açarak test edin", "Hortumdan güçlü geliyorsa → başlık tıkalı", "Hortumdan da zayıfsa → kartuş veya hat şüphelisi", "Başlık deliklerini iğneyle ve sirkeyle temizleyin"]} /></div><Photo src={dusBasligi} alt="Yarısı kireçle tıkanmış krom duş başlığından düzensiz ve zayıf su jetleri akıyor" caption="Deliklerinin yarısı kireçle tıkanmış bir duş başlığı, suyu düzensiz ve zayıf akıtır." /></div>
      </Section>

      <Section n="06" label="Tek Musluk" title={<>Batarya Kartuşu ve <Hot>Köşe Vanası</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Perlatörü temizlediğiniz hâlde yalnızca o muslukta sıcak su az geliyorsa, sıradaki şüpheli tek kollu bataryanın içindeki kartuştur. Kartuş aşındığında veya içine kireç/tortu kaçtığında sıcak su kanalı kısılır; soğuk normal akarken sıcak ince gelir. Bir başka basit neden de musluğun altındaki köşe (ara) musluğunun tam açık olmamasıdır; tadilat sonrası yarı kapalı bırakılmış olabilir.</p><CheckList items={["Sorun tek muslukta ve perlatör temizse → kartuş şüphelisi", "Sıcak su besleme (köşe) vanasının tam açık olduğunu kontrol edin", "Kartuş aşınması sıcak tarafı kısar, soğuk normal kalır", "Kartuş değişimi doğru ölçü ve montaj gerektirir"]} /></div><Photo src={kartus} alt="Solda tek kollu bataryadan sökülmüş seramik kartuşu tutan el, sağda lavabo altındaki köşe vanasını kontrol eden el" caption="Solda kartuş kontrolü, sağda köşe vanası kontrolü: ikisi de dakikalar içinde yapılır." /></div>
      </Section>

      <Section n="07" label="Tüm Evde" title={<>Kombi Eşanjörü ve <Hot>Sıcak Su Hattı</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={esanjor} alt="Kombinin kapağı açık; eldivenli teknisyen beyaz kireç tabakasıyla kaplanmış plakalı eşanjörü gösteriyor" caption="Plakalı eşanjörün ince kanalları kireçle dolduğunda su hem yavaşlar hem de yeterince ısınamadan geçer." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tek tek musluklarda değil, evdeki tüm sıcak su noktalarında akış az ve sıcaklık dengesizse (bir sıcak bir soğuk), ortak nokta olan kombi devreye girer. Kombilerde kullanım suyu, plakalı eşanjör adı verilen küçük bir ısı değiştiricide anında ısıtılır. Suyu kireçli bölgelerde bu eşanjörün ince kanalları kireçle dolar. Tipik belirti: sıcak su hem az gelir hem de açıp kapadıkça sıcaklığı zıplar. Eşanjör kireç sökme kombinin açılmasını gerektirdiği için yetkili teknisyen işidir.</p><CheckList items={["Tüm evde sıcak az + sıcaklık zıplıyor → plakalı eşanjör kireci", "Eşanjör kireç sökme/değişimi yetkili teknisyen işidir", "Bozuk çek valf sıcak suyu soğuk hatta kaçırabilir", "Periyodik kombi bakımı kireçlenmeyi geciktirir"]} /></div></div>
      </Section>

      <Section n="08" label="Termosifon / Şofben" title={<>Termosifon veya Şofbenle <Hot>Sıcak Su Az Akıyorsa</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Evde kombi değil termosifon kullanıyorsanız, sıcak suyun az akması çoğunlukla tankın dibindeki kireç ve tortudan ya da giriş tarafındaki emniyet ventilinin tıkanmasından kaynaklanır. Önce termosifonun giriş vanasının sonuna kadar açık olduğunu kontrol edin; ardından yıllık tank temizliği ve magnezyum anot kontrolü yaptırın. Kombili evlerde sıcak su hiç gelmiyorsa sorun akışta değil kombinin kendisindedir.</p><CheckList items={["Termosifon giriş vanası tam açık mı?", "Tank dibinde kireç/tortu birikmiş olabilir", "Emniyet ventili tıkalıysa akış düşer", "Kombide hiç sıcak su yoksa ayrı bir arıza vardır"]} /></div><Photo src={termosifon} alt="Banyo duvarına monteli beyaz termosifon; altındaki emniyet ventilinden kireçli su damlıyor" caption="Termosifonun emniyet ventili tıkandığında veya tank dibi kireçle dolduğunda sıcak su akışı düşer." /></div>
      </Section>

      <Section n="09" label="Basınç" title={<>Üst Katlarda Hem Sıcak Hem Soğuk Zayıfsa: <Hot>Basınç Sorunu</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={basinc} alt="Apartman bodrumunda basınç göstergesi düşük bölgede olan pirinç hidrofor pompası ve borular" caption="Düşük bina basıncında kalıcı çözüm, doğru kapasiteli bir hidroforun kurulması veya mevcut hidroforun ayarlanmasıdır." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Sorun yalnızca sıcakta değil, hem sıcak hem soğukta yaşanıyor ve özellikle binanın üst katlarındaysa, sebep büyük olasılıkla düşük şebeke/bina basıncıdır. Su yükseldikçe basınç düşer; üst katlarda musluklar zayıf akar. Bu durumda perlatör temizliği çözüm getirmez. Kalıcı çözüm, basıncı dengeleyen bir hidroforun doğru kapasiteyle kurulması veya mevcut hidroforun basınç ayarının düzenlenmesidir.</p><CheckList items={["Hem sıcak hem soğuk zayıf + üst kat → bina basıncı", "Perlatör temizliği basınç sorununu çözmez", "Hidrofor kurulumu veya basınç ayarı kalıcı çözümdür", "Doğru kapasite seçimi için tesisatçı desteği önerilir"]} /></div></div>
      </Section>

      <Section n="10" label="Evde Kontrol" title={<>Servis Çağırmadan Önce <Hot>Evde Yapabilecekleriniz</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Aşağıdaki sırayla ilerleyin; çoğu sorun ilk iki adımda çözülür. Her adımdan sonra musluğu açıp akışı yeniden test edin.</p><Steps items={[["Tek musluk mu, tüm ev mi?","Sorunun kapsamını belirleyin; tek noktadaysa o armatüre, tüm evdeyse kombiye odaklanın."],["Perlatörü temizleyin","Musluk ucundaki süzgeci söküp sirkede bekletin, fırçalayın, geri takın."],["Duş başlığını test edin","Başlığı söküp hortumu doğrudan açın; güçlü geliyorsa başlığı temizleyin."],["Köşe vanasını kontrol edin","Lavabo altındaki sıcak su ara musluğunun sonuna kadar açık olduğundan emin olun."],["Kartuşu kontrol edin","Tek kollu bataryada sıcak taraf kısılmışsa kartuş değişimi gerekebilir."],["Kombiyi gözlemleyin","Sıcaklık zıplıyorsa ve tüm evde akış azsa eşanjör kireci şüphelidir; bakım yaptırın."]]} /></div><Photo src={kontrol} alt="Musluk ucundaki perlatörü söken eller; içindeki kireçli küçük elek görünüyor" caption="Perlatör kontrolü birkaç dakika sürer ve çoğu 'basınç düştü' şikâyetini tek başına çözer." /></div>
      </Section>

      <Section n="11" label="Profesyonel Destek" title={<>Ne Zaman <Hot>Uzman Gerekir?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Perlatör, duş başlığı ve köşe vanası kontrollerinden sonra sorun devam ediyorsa, neden artık evde çözülemeyecek bir noktadadır: kombi eşanjörü, çek valf, basınç düşürücü veya tesisat içi bir daralma. Bu aşamada cihazla teşhis ve profesyonel müdahale gerekir.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Kombi eşanjörü kireçlenmesi","Eşanjör özel solüsyonla yıkanır veya değiştirilir; kombinin açılması gerekir."],["Çek valf / üç yollu vana arızası","Sıcak suyun soğuk hatta kaçması parça değişimiyle çözülür."],["Düşük bina basıncı","Hidrofor kurulumu veya basınç ayarıyla kalıcı çözüm sağlanır."],["Tesisat içi daralma","Boru içi kireç/tortu birikimi cihazla tespit edilip temizlenir."],["Termosifon tank temizliği","Tank dibi kireç ve tortu temizlenir, anot kontrol edilir."],["Sıcak su hiç gelmiyorsa","Kombi tarafında ayrı bir arıza vardır; yerinde teşhis gerekir."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><AlertTriangle className="h-4 w-4 text-brand-red" />{t}</h3><p className="mt-2 text-[12.5px] text-muted-foreground">{d}</p></Card>)}</div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Flame,"Kombi bakımı"],[Gauge,"Basınç çözümü"],[Search,"Arıza tespiti"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Flame;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={profesyonel} alt="Eldivenli teknisyen, kombinin plakalı eşanjörünü özel yıkama cihazı ve hortumlarla kireçten arındırıyor" caption="Eşanjör kireç temizliği özel yıkama cihazıyla, kombiye zarar vermeden yapılır." /><p className="text-[14px] leading-relaxed text-muted-foreground">Ekibimiz kombi eşanjörünü özel yıkama cihazıyla kireçten arındırır, arızalı çek valf ve üç yollu vanayı değiştirir, düşük bina basıncında hidrofor kurulumu ve ayarı yapar. Basit bir perlatör temizliğinin yeterli olduğu durumlarda ise sizi doğru yönlendirir, gereksiz işlem önermeyiz.</p></div><CTA final />
      </Section>

      {faq.length > 0 && <Section n="12" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"kombi-sicak-su-vermiyor"}} className="font-bold text-brand-red underline">Kombi sıcak su vermiyor: çözümler</Link><Link to="/blog/$slug" params={{slug:"termosifon-su-isitmiyor"}} className="font-bold text-brand-red underline">Termosifon su ısıtmıyor</Link><Link to="/hizmet/$slug" params={{slug:"kombi-servisi"}} className="font-bold text-brand-red underline">Kombi bakım ve servis hizmeti</Link></div></Section>}
    </main>
  </div>;
}
