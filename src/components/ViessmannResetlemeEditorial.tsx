import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, Search, ShieldAlert,
  ThumbsUp, Flame, RotateCcw, FlameKindling,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/viessmann/viessmann-kapak.jpg";
import kombi from "@/assets/viessmann/viessmann-kombi.jpg";
import basinc from "@/assets/viessmann/viessmann-basinc.jpg";
import gazVanasi from "@/assets/viessmann/viessmann-gaz-vanasi.jpg";
import ekran from "@/assets/viessmann/viessmann-ekran.jpg";
import baca from "@/assets/viessmann/viessmann-baca.jpg";
import servisKapak from "@/assets/viessmann/viessmann-servis-kapak.jpg";
import hatalar from "@/assets/viessmann/viessmann-hatalar.jpg";
import profesyonel from "@/assets/viessmann/viessmann-profesyonel.jpg";
import ctaFinal from "@/assets/viessmann/viessmann-tesisatci-cagir.jpg";

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
  return <ol className="mt-5 grid gap-2.5 sm:grid-cols-2">{items.map(([title, body], i) => <li key={title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-3.5"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-[12px] font-black text-brand-red-foreground">{String(i + 1).padStart(2, "0")}</span><div className="min-w-0"><h3 className="text-[14px] font-extrabold">{title}</h3><p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{body}</p></div></li>)}
  </ol>;
}
function Warning({ title, children, danger }: { title: string; children: ReactNode; danger?: boolean }) {
  return <div className={cn("mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border p-4", danger ? "border-brand-red bg-brand-red/15" : "border-brand-red/50 bg-brand-red/10")}><AlertTriangle className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold text-brand-red">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-foreground/80">{children}</div></div></div>;
}
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Reset kodu temizlemiyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Arızayı <span className="text-brand-red">uzmana bırakın.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul genelinde 7/24 kombi servisi, ücretsiz keşif ve garantili işçilik.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Karlı bir İstanbul akşamında yolda ilerleyen kırmızı tesisat ve kombi servis aracı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function ViessmannResetlemeEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Kombi</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kombi Arıza Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Viessmann Kombi Resetleme: <Hot>Model Bazında Adım Adım</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Vitopend, Vitodens ve dijital ekranlı modellerde reset adımları, F2/F4/F5 arıza kodlarının anlamları ve güvenlik kuralları.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Viessmann kombinin ön panelindeki R reset düğmesine basan parmak; ekranda sıcaklık göstergesi" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Çok kolay · 1/5"],[Clock,"Tahmini süre","2 dakika"],[Wrench,"Gerekli alet","Alet gerekmez"],[ShieldAlert,"Ana risk","Tekrarlayan kodda zorlamak"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Kısa Cevap" title={<>Viessmann Kombi <Hot>Nasıl Resetlenir?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="border-l-2 border-brand-red pl-4 text-[15px] leading-relaxed text-foreground/85">Çoğu modelde ön paneldeki <b>R (reset) düğmesine</b> birkaç saniye basılarak yapılır. Dijital ekranlı modellerde arıza kodu ekrandayken <b>OK tuşuyla</b> onaylanır. Reset öncesi su basıncını ve gaz vanasını kontrol edin; gaz kokusu varsa kesinlikle reset yapmayın.</p><CheckList items={["Reset yalnızca geçici arızaları temizler", "Aynı kod tekrar ediyorsa sorun kalıcıdır, servis gerekir", "F2 ve F4 ateşleme/iyonizasyon, F5 baca ve hava akışı arızasıdır", "Arka arkaya birkaç resetten fazlası cihazı kilitler", "Gaz kokusu varsa reset değil, 187 Doğalgaz Acil aranır"]} /></div><Photo src={kombi} alt="Koyu renk modern mutfakta duvara monte beyaz kombi; ön panelde dijital ekran" caption="Reset, geçici arızalarda cihazı yeniden başlatmanın en hızlı yoludur — ama her arızayı çözmez." /></div>
      </Section>

      <Section n="03" label="Adım Adım" title={<>Viessmann Kombi <Hot>Resetleme Adımları</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Reset yöntemi modele göre küçük farklar gösterir; genel adımlar tüm serilerde aynı mantıkla ilerler. Basınç düşükse önce doldurma musluğuyla tamamlayın — <Link to="/blog/$slug" params={{slug:"kombi-basinci-dusuyor"}} className="font-bold text-brand-red underline">kombi basıncı düşüyor</Link> rehberimiz yardımcı olur.</p>
        <Steps items={[["Arıza kodunu not edin","Ekrandaki F kodunu (örneğin F2) bir yere yazın. Servis gerekirse bu kod teşhisi hızlandırır; reset kodu siler."],["Su basıncını kontrol edin","Basınç göstergesi yeşil aralıkta olmalı. Düşükse doldurma musluğuyla tamamlayın."],["Gaz vanasının açık olduğundan emin olun","Sayaç üzerindeki ve kombi altındaki gaz vanaları açık (kol boru yönünde) olmalı."],["R düğmesine birkaç saniye basın","Dijital ekranlı modellerde arıza kodu ekrandayken OK tuşuyla onaylayın. Butonsuz eski modellerde cihazı şalterinden kapatıp yarım dakika bekleyip açın."],["Cihazın devreye girmesini bekleyin","Kombi birkaç dakika içinde ateşleme dener. Kod geri gelmezse sorun geçiciydi; aynı kod tekrar ederse resetlemeyi bırakıp servis çağırın."]]} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><Photo src={basinc} alt="Kombi üzerindeki yuvarlak basınç göstergesi, ibre yeşil bölgede" caption="Resetten önce basınç göstergesinin yeşil aralıkta olduğunu kontrol edin." /><Photo src={gazVanasi} alt="Kombi altındaki sarı gaz vanası kolu boru yönünde (açık konum)" caption="Gaz vanası kolu boruyla aynı yöndeyse açık, dikse kapalıdır." /></div>
        <Warning title="Bu adımda zorlanıyorsanız">F2 veya F4 gibi kodlar resetten sonra tekrar ediyorsa sorun kalıcıdır ve cihazı zorlamak arızayı büyütebilir. Bu durumda profesyonel kombi servis hizmetimizden destek alabilirsiniz; arıza yerinde tespit edilip çözülür.</Warning><CTA />
      </Section>

      <Section n="04" label="Modeller" title={<>Model Bazında <Hot>Reset Farkları</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Viessmann serilerinde reset düğmesinin yeri ve yöntemi değişir. Modelinizin tam adı cihazın iç kapağındaki etikette yazar; kılavuzunuz yoksa üreticinin sitesinden model numarasıyla kullanım kılavuzunu indirebilirsiniz.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[480px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Model / Seri</th><th className="px-4 py-3">Reset Yöntemi</th></tr></thead><tbody className="divide-y divide-border">{[["Vitopend 100 (eski, butonlu)","Ön paneldeki R düğmesine birkaç saniye basılı tutun"],["Vitopend 100 (dijital ekranlı)","Arıza kodu ekrandayken OK tuşuyla onaylayın"],["Vitodens 050 / 100 / 111","Ekrandaki arıza kodunda OK ile onay; bazı modellerde menüden reset"],["Butonsuz eski modeller","Şalterden kapatın, yarım dakika bekleyin, tekrar açın"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="05" label="Arıza Kodları" title={<>Sık Görülen <Hot>Viessmann Arıza Kodları</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Resetten önce kodun ne anlama geldiğini bilmek önemlidir; bazı kodlarda reset çözüm değildir. F5 kodu alıyorsanız baca tıkanıklığı veya bağlantı sorunu olabilir — <Link to="/blog/$slug" params={{slug:"kombi-bacasi-nedir-cesitleri-montaji"}} className="font-bold text-brand-red underline">kombi bacası</Link> rehberimize bakabilirsiniz.</p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr] lg:items-start"><div className="overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[520px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Kod</th><th className="px-4 py-3">Anlamı</th><th className="px-4 py-3">Reset Yeterli mi?</th></tr></thead><tbody className="divide-y divide-border">{[["F2","Ateşleme/iyonizasyon arızası — alev algılanamıyor","Gaz vanası açıksa bir-iki reset denenebilir; tekrar ederse servis"],["F4","Ateşleme arızası — alev oluşmuyor","Tekrar ediyorsa servis şart"],["F5","Baca / hava akış arızası","Baca kontrolü gerekir; reset geçici çözüm"],["Fd","Ateşleme denemesi başarısız","Gaz basıncı/valf kontrolü; yetkili servis"],["Serv yazısı","Bakım zamanı hatırlatması","Arıza değildir; yıllık bakım yaptırın"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-black text-brand-red")}>{c}</td>)}</tr>)}</tbody></table></div><Photo src={ekran} alt="Kombi dijital ekranında kırmızı uyarı simgesi ve hata kodu; parmak OK tuşunda" caption="Dijital ekranlı modellerde reset, arıza kodu ekrandayken OK tuşuyla onaylanır." /></div>
      </Section>

      <Section n="06" label="Sınırlar" title={<>Reset Ne Zaman İşe Yarar, <Hot>Ne Zaman Yaramaz?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Reset, elektrik kesintisi veya gaz basınç dalgalanması gibi geçici durumların ardından cihazı normale döndürür. Ancak şu durumlarda reset çözüm değildir:</p>
        <CheckList columns={2} items={["Aynı kod resetten sonra tekrar ediyorsa: arıza kalıcıdır (elektrot, kart, valf, pompa)", "Su basıncı sürekli düşüyorsa: tesisatta kaçak veya genleşme tankı sorunu vardır", "Baca kaynaklı kodlarda (F5): baca açılmadan reset geçicidir", "Gaz kokusu varken: kesinlikle reset yapılmaz"]} />
      </Section>

      <Section n="07" label="Güvenlik" title={<>Gaz Kokusu Varsa <Hot>Reset Yapmayın</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><Warning danger title="Hayati uyarı">Gaz kokusu alırsanız kombiye ve hiçbir elektrikli düğmeye dokunmayın. Ortamı havalandırın, binayı terk edin ve dışarıdan <b>187 Doğalgaz Acil</b> hattını arayın. Arka arkaya birkaçtan fazla reset denemeyin; cihaz kendini kilitleyebilir veya arıza büyüyebilir.</Warning><p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">F5 kodu baca ve hava akışıyla ilgilidir; baca açılmadan yapılan reset yalnızca geçici çözümdür ve karbonmonoksit riski doğurabilir. Baca bağlantısında gevşeme, tıkanıklık veya dışarı kaçak şüphesi varsa cihazı kullanmayı bırakıp servis çağırın.</p></div><Photo src={baca} alt="Teknisyen el feneriyle kombinin üstündeki metal baca bağlantısını inceliyor" caption="F5 kodunda baca kontrolü şarttır; baca açılmadan reset geçicidir." /></div>
      </Section>

      <Section n="08" label="Servis" title={<>Servis Gerektiren <Hot>Durumlar</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Tekrarlayan F2/F4 kodları genellikle iyonizasyon elektrodu, gaz valfi veya anakart kaynaklıdır; F5 baca ve hava akışı sorunudur. Bunlar cihaz içi müdahale gerektirir ve yetkili servis işidir. Kombi hiç çalışmıyorsa <Link to="/blog/$slug" params={{slug:"kombi-neden-calismiyor"}} className="font-bold text-brand-red underline">kombi neden çalışmıyor</Link> rehberimiz diğer nedenleri kontrol etmenize yardımcı olur. Cihazın kapağını kendiniz açmayın; gaz yolu ve elektrik aksamı uzmanlık ister. Servis teknisyeni arıza koduyla geldiğinde teşhis çok daha hızlı ilerler — bu yüzden resetten önce kodu not etmeniz önemlidir.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><Photo src={servisKapak} alt="Teknisyen kombinin ön kapağını açıp iç aksamı inceliyor" caption="Cihaz içi arızalar kapak açılarak kontrol edilir; bu işlem servis işidir." /><Photo src={profesyonel} alt="Teknisyen açık kombinin içinde multimetreyle ölçüm yapıyor; brülörde mavi alev" caption="Yerinde arıza tespiti yapılır, gerekirse parça değişimiyle aynı gün çözüm üretilir." /></div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Search,"Ücretsiz keşif"],[Flame,"Aynı gün onarım"],[Clock,"7/24 servis"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Search;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div><CTA final />
      </Section>

      <Section n="09" label="Hatalar" title={<>Sık Yapılan <Hot>Hatalar</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={hatalar} alt="Kırmızı hata ışığı yanan kombinin yanında telefonla servis arayan ev sahibi" caption="Kod tekrar ediyorsa resetlemeyi bırakın; servis ekibi kodla birlikte çok daha hızlı teşhis koyar." /><CheckList items={["Arıza kodunu not etmeden resetlemek: servis geldiğinde teşhis zorlaşır", "Arka arkaya defalarca resetlemek: tekrarlayan kodda reset sorunu çözmez", "Basıncı kontrol etmeden resetlemek: düşük basınçta cihaz yine arızaya geçer", "Gaz kokusu varken reset denemek: hayati tehlikedir; 187 aranır", "F5 kodunda bacayı kontrol ettirmeden kullanmak: karbonmonoksit riski doğurur"]} /></div>
      </Section>

      {faq.length > 0 && <Section n="10" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"bosch-kombi-resetleme"}} className="font-bold text-brand-red underline">Bosch kombi resetleme</Link><Link to="/blog/$slug" params={{slug:"kombi-basinci-dusuyor"}} className="font-bold text-brand-red underline">Kombi basıncı düşüyor</Link><Link to="/hizmet/$slug" params={{slug:"kombi-servisi"}} className="font-bold text-brand-red underline">Kombi servisi hizmeti</Link></div></Section>}
    </main>
  </div>;
}
