import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Droplets, XCircle, Camera,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/gider/gider-kapak.jpg";
import teshis from "@/assets/gider/gider-teshis.jpg";
import evCozumleri from "@/assets/gider/gider-ev-cozumleri.jpg";
import hatalar from "@/assets/gider/gider-hatalar.jpg";
import turler from "@/assets/gider/gider-turler.jpg";
import ekipman from "@/assets/gider/gider-ekipman.jpg";
import onleme from "@/assets/gider/gider-onleme.jpg";
import ctaFinal from "@/assets/gider/gider-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Gideriniz açılmıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Motorlu spiral ve kamerayla <span className="text-brand-red">yerinde açıyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul geneli motorlu spiral, hidroblast ve kamera görüntüleme; kaydını teslim ediyoruz. 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Alacakaranlıkta İstanbul sokağında kırmızı servis aracı; tesisatçı alet çantasıyla apartmana yürüyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function GiderEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Tıkanıklık</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kapsamlı Rehber</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Gider Tıkanıklığı <Hot>Nasıl Açılır?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Lavabo, klozet ve banyo gideri için doğru sırayla ev tipi yöntemler, 6 tehlikeli hata ve profesyonel servis eşiği.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Su dolu lavaboda gider tıkanıklığını pistonla açmaya çalışan el" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Orta · 3/5"],[Clock,"Süre","15–45 dakika"],[Wrench,"Gerekli","Piston + karbonat"],[ShieldAlert,"Ana risk","Kimyasal + ısı şoku"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Teşhis" title={<>Tıkanma Tipine Göre <Hot>Teşhis</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Doğru yöntemi seçmek için önce tıkanmanın nerede ve neyden kaynaklandığını anlamak gerekir. Belirtiler çoğu zaman kaynağı doğrudan işaret eder.</p></div><Photo src={teshis} alt="Yavaş akan lavabo; gider deliğinde saç yığını, parmakla işaret ediliyor" caption="Belirtiye bakarak tıkanmanın konumunu ve aciliyetini tahmin edebilirsiniz." /></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[680px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Belirti</th><th className="px-4 py-3">Olası neden</th><th className="px-4 py-3">Aciliyet</th><th className="px-4 py-3">İlk çözüm</th></tr></thead><tbody className="divide-y divide-border">{[["Lavabo yavaş akıyor, hafif koku var","Saç + sabun kalıntısı sifonda","Düşük","Sifon sökümü"],["Mutfak lavabosu, sıcak suda daha kötü","Katılaşmış yağ tabakası","Orta","Kaynar su + karbonat"],["Klozet doluyor, yavaş boşalıyor","Kağıt / ıslak mendil tıkanması","Orta","Körüklü piston"],["Klozet + banyo aynı anda geri tepiyor","Ana kolon tıkanması","Yüksek","Profesyonel spiral"],["Duş süzgecinde su gölleniyor","Saç yığını","Düşük","Süzgeç sökümü"],["Duvardan veya tavandan sızıntı","Boru kaçağı","Kritik","Suyu kapat, kaçak tespiti"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="03" label="Ev Çözümleri" title={<>Ev Tipi Çözümler <Hot>(Doğru Sırayla)</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={evCozumleri} alt="Mutfak lavabosuna karbonat ve sirke dökülüyor; köpük tepkimesi, yanda kettle" caption="Sıralama, boruya en az zarar verenden en güçlü müdahaleye doğrudur." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Aşağıdaki yöntemleri sırayla deneyin; biri sonuç vermezse bir sonrakine geçin. Kimyasal açıcı en son çaredir.</p></div></div>
        <Steps items={[
          { title: "Kaynar su (yağ tıkanmalarında)", body: "Mutfak lavabosu tıkandıysa ilk deneme budur: 2 litre kaynar suyu yavaşça gidere dökün. Katılaşmış yağ eriyip akar. Klozete asla kaynar su dökmeyin; porselen ani ısı şokuyla çatlar." },
          { title: "Karbonat + sirke", body: "1 su bardağı karbonatı gider deliğine dökün, üzerine 1 su bardağı beyaz sirke ekleyin, ağzını kapatıp 15 dakika bekleyin ve 2 litre sıcak suyla durulayın. Metal ve PVC boruya zararsızdır." },
          { title: "Piston (pompa)", body: "Klozet tıkanmalarında altın standarttır. Körüklü klozet pistonunu deliğe tam oturtun, 15-20 kez sert ve düz basıp çekin. Lavabo pistonu ile klozet pistonu farklıdır; karıştırmayın." },
          { title: "Sifon sökümü (lavabo)", body: "Lavabo altındaki U-sifonu elle söküp içindeki saç yığınını temizleyin. Lavabo tıkanmalarının büyük bölümünde en etkili yöntem budur. Sökerken altına kova koymayı unutmayın." },
          { title: "Spiral tel (inatçı tıkanma)", body: "3-5 metrelik elle döner spiral tel, sifon sonrasındaki hatta ulaşır. Klozete uygulayacaksanız koruyucu kılıflı klozet spirali kullanın; çıplak tel porseleni çizer." },
        ]} />
      </Section>

      <Section n="04" label="Uyarı" title={<>Yapmayın: <Hot>6 Tehlikeli Hata</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Aşağıdaki hatalar tıkanıklığı çözmek yerine boruya, porselene veya sağlığınıza zarar verir.</p></div><Photo src={hatalar} alt="Kaynar su dökülen klozette ısı şoku çatlağı; yanda dumanlı kettle" caption="Klozete kaynar su: 1 saniyelik ısı şoku porseleni çatlatır." /></div>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">{["Kostik soda + sıcak su: buhar patlaması yapar, göze sıçrarsa kalıcı görme hasarına yol açar","Klozete kaynar su: ani ısı şoku porseleni çatlatır; klozet değişimi gerekir","Kimyasal açıcıyı pistonla birlikte kullanmak: basınçla sıvı yüze sıçrar","İki farklı kimyasalı karıştırmak (çamaşır suyu + asitli açıcı): zehirli klor gazı çıkar","PVC boruya kostik soda: 60 °C üzerinde boruyu yumuşatıp deler","Metal tel askıyı klozete sokmak: iç seramiği çizer, yüzey kalıcı olarak pürüzlenir"].map(t=><li key={t} className="flex items-start gap-2.5 rounded-lg border border-brand-red/40 bg-brand-red/5 p-3 text-[13px] leading-snug"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{t}</span></li>)}</ul>
        <Warning title="Kimyasal açıcı kullanacaksanız">Enzim bazlı ev tipi açıcıları tercih edin, eldiven ve gözlük takın, ortamı havalandırın. Kostik soda kullandıysanız üzerine asla sıcak su eklemeyin ve aynı gün piston uygulamayın.</Warning>
      </Section>

      <Section n="05" label="Tıkanma Türleri" title={<>Gider Tıkanıklığı <Hot>Türleri ve Belirtileri</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={turler} alt="Duş giderinden spiral aparatla saç ve sabun tortusu yığını çekiliyor" caption="Her türe farklı yöntem uygulanır: saç için spiral, yağ için basınçlı su, kireç için kireç çözücü." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tıkanmanın kaynağını bilmeden yapılan müdahale ya boruya zarar verir ya da sorunu geçici olarak öteler. Yabancı cisim düştüyse su çekmeyin; cisim sifon çıkışına kaçarsa iş ana kolona taşınır.</p></div></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Tıkanma tipi</th><th className="px-4 py-3">Belirti</th><th className="px-4 py-3">Konum</th></tr></thead><tbody className="divide-y divide-border">{[["Saç + sabun tortusu","Yavaş akış, hafif koku","Duş / lavabo sifonu"],["Yağ + yemek kalıntısı","Ani durma, gıcırtılı ses","Mutfak evyesi"],["Tuvalet kağıdı / ıslak mendil","Klozet doluyor, geri fışkırıyor","Klozet dirseği"],["Ağaç kökü","Bahçe rögarında yavaşlama, tekrarlayan tıkanma","Ana hat"],["Kireç + korozyon birikimi","Basınç düşer, boru kesiti daralır","Eski metal borular"],["Yabancı cisim (oyuncak, pil, havlu)","Ani tam tıkanma","Klozet, lavabo"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="06" label="Profesyonel" title={<>Profesyonel Servis <Hot>Ne Kullanır?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Servis ekipleri evde bulunmayan ekipmanlarla çalışır. Tekrarlayan tıkanmalarda kamera görüntüleme şarttır; kök girişi, boru çökmesi veya eğim hatası ancak böyle kesinleşir.</p></div><Photo src={ekipman} alt="Motorlu spiral makinesi ve endoskop kamera çalışma minderinde" caption="Motorlu spiral ve hidroblast, ev tipi yöntemlerin ulaşamadığı derinlikteki tıkanmaları açar." /></div>
        <CheckList columns={2} items={["Motorlu spiral makine (rooter): 15-45 metreye kadar iner; bıçaklı, saç yakalayıcı ve kök kesici uçları vardır","Hidroblast (jetter): 100-300 bar su basıncıyla döner uç, boru içini 360° temizler; yağ ve biyofilmde en etkili yöntemdir","Endoskop kamera: tıkanmanın konumunu ve nedenini görüntüler, kayıtla teslim edilir","Elektromanyetik lokatör: kamerayla birlikte tıkanmanın duvardan kaç metre içeride olduğunu işaretler"]} />
        <CTA />
      </Section>

      <Section n="07" label="Servis Eşiği" title={<>Ne Zaman Profesyonel <Hot>Servis Çağırmalı?</Hot></>}>
        <CheckList columns={2} items={["Aynı gider ay içinde birden fazla kez tıkanıyorsa (yapısal sorun işareti)","Klozet, banyo ve mutfak gideri aynı anda geri tepiyorsa (ana kolon tıkanması)","Piston + karbonat denemelerine rağmen 30 dakikada açılmıyorsa","Duvardan veya tavandan su izi geliyorsa","Kanalizasyon kokusu 24 saat içinde geçmiyorsa"]} />
        <Warning title="Ana kolon tıkanması bekletilmez">Ana kolon tıkalıyken su kullanmaya devam etmek, atık suyun en alçak noktadan (genelde banyo süzgeci) taşmasına yol açar. Suyu kısın, giderleri kullanmayın ve aynı gün servis çağırın.</Warning>
      </Section>

      <Section n="08" label="Önleme" title={<>Tıkanmayı Önleyen <Hot>Rutin</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={onleme} alt="Duş giderine saç yakalayıcı süzgeç aparatı takılıyor" caption="Haftalık süzgeç temizliği ve aylık karbonat bakımı, tıkanmaların çoğunu daha oluşmadan engeller." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tıkanıklığı açmaktan daha ucuz ve kolay olan tek şey, onu hiç oluşturmamaktır.</p><CheckList items={["Kızartma yağını asla lavaboya dökmeyin; soğutup kaba alın veya kağıt havluyla silip çöpe atın","Duş giderine saç yakalayıcı aparat takın","Klozete tuvalet kağıdı dışında hiçbir şey atmayın; ıslak mendil 'çözünür' yazsa bile boruda çözünmez"]} /></div></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[380px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">İşlem</th><th className="px-4 py-3">Sıklık</th></tr></thead><tbody className="divide-y divide-border">{[["Lavabo / duş süzgeci temizliği","Haftada 1"],["Karbonat + sirke bakımı","Ayda 1"],["Tüm giderlere 15 saniye sıcak su akıtma","Ayda 1"],["Sifon sökümlü temizlik","Yılda 1"],["Ana kolon kamera muayenesi (eski binalar)","3-5 yılda 1"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="09" label="Sonuç" title={<>Sonuç: <Hot>Doğru Sıra, Kalıcı Çözüm</Hot></>}>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{[[Droplets,"Doğru sıra","Kaynar su → karbonat + sirke → piston → sifon sökümü → spiral tel. Kimyasal açıcı en son çaredir."],[Camera,"Tekrarlayan tıkanma","Aynı gider ayda birden fazla tıkanıyorsa kamera ile hat görüntüleme gerekir; 'sürekli tıkanıyor' sorunu tek seferde çözülür."]].map(([I,t,b])=>{const Icon=I as typeof Gauge;return <Card key={t as string} className="p-4"><Icon className="h-5 w-5 text-brand-red"/><h3 className="mt-2 font-extrabold">{t as string}</h3><p className="mt-1 text-[13px] text-muted-foreground">{b as string}</p></Card>})}</div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="10" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"klozet-tasiyor-ana-gider-tikanikligi"}} className="font-bold text-brand-red underline">Ana kolon tıkanıklığı belirtileri</Link><Link to="/blog/$slug" params={{slug:"mutfak-tikanikligi-nasil-acilir"}} className="font-bold text-brand-red underline">Mutfak tıkanıklığı nasıl açılır</Link><Link to="/hizmet/$slug" params={{slug:"tikaniklik-acma"}} className="font-bold text-brand-red underline">Tıkanıklık açma hizmeti</Link></div></Section>}
    </main>
  </div>;
}
