import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Droplets, Flame, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/genlesme-tanki/genlesme-tanki-kapak.jpg";
import kesit from "@/assets/genlesme-tanki/genlesme-tanki-kesit.jpg";
import basinc from "@/assets/genlesme-tanki/genlesme-tanki-basinc.jpg";
import havaKontrol from "@/assets/genlesme-tanki/genlesme-tanki-hava-kontrol.jpg";
import emniyetVentili from "@/assets/genlesme-tanki/genlesme-tanki-emniyet-ventili.jpg";
import kontrol from "@/assets/genlesme-tanki/genlesme-tanki-kontrol.jpg";
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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Basınç bir yükselip bir düşüyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Tankı ölçüp <span className="text-brand-red">aynı gün çözüyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Genleşme tankı hava basma, değişim ve kombi bakımı; İstanbul genelinde 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Karlı gece İstanbul sokağında apartman önünde kırmızı tesisat servis aracı; tesisatçı zili çalıyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function GenlesmeTankiEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Kombi</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kombi Bakım Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Kombi Genleşme Tankı <Hot>Nedir, Ne İşe Yarar?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Basınç dalgalanması ve emniyet ventili kaçağının arkasındaki genleşme tankı arızasını teşhis etme, hava basma ve değişim rehberi.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Duvara monteli kombinin yanında kırmızı yuvarlak genleşme tankı ve manometre" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Yok · sadece takip"],[Clock,"Kontrol süresi","Bakımda 10 dk"],[Wrench,"Gerekli","Gözlem yeterli"],[ShieldAlert,"Ana risk","Basınç darbesi"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Temel Bilgi" title={<>Genleşme Tankı Nedir ve <Hot>Ne İşe Yarar?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Genleşme tankı, kombinin içinde bulunan, ortasından esnek bir diyaframla ikiye bölünmüş kapalı bir kaptır. Diyaframın bir tarafında tesisat suyu, diğer tarafında basınçlı hava bulunur. Tank genellikle yuvarlak ve kırmızıdır; ön panel açıldığında arkada görülür. Görevi fizik kurallarından gelir: su ısındıkça genleşir ve kapalı tesisatta bu genleşmenin gidecek yeri yoktur. Tank, artan su hacmini diyaframı esneterek karşılar; su soğuyunca hava tarafı suyu geri iter. Böylece basınç ısınma-soğuma döngüsünde sabit kalır.</p><CheckList items={["Isınan suyun fazla basıncını emerek tesisatı ve kombiyi korur", "Olmasa her ısınmada basınç tehlikeli seviyeye çıkar", "Diyafram bir tarafında su, diğer tarafında basınçlı hava taşır", "Yuvarlak, kırmızı; kombinin içinde, panelin arkasındadır"]} /></div><Photo src={kesit} alt="Kırmızı genleşme tankının kesit görünümü: kauçuk diyafram hava ve su odacıklarını ayırıyor" caption="Diyafram bir tarafta su, diğer tarafta basınçlı hava tutar; basıncı dengeleyen budur." /></div>
      </Section>

      <Section n="03" label="Teşhis" title={<>Arıza Belirtileri: <Hot>Basınç Dalgalanması</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Genleşme tankı arızası kendini neredeyse her zaman basınç dalgalanması olarak gösterir. En tipik belirti: kombi ısıtınca basınç 3 bara fırlar, soğuyunca 1 barın altına düşer.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Belirti</th><th className="px-4 py-3">Muhtemel durum</th><th className="px-4 py-3">İlk kontrol</th></tr></thead><tbody className="divide-y divide-border">{[["Isıtınca basınç 3 bara çıkıyor, soğuyunca 1 barın altına düşüyor","Tank havası kaçmış veya diyafram yırtık","Tank hava basıncını ölçtürün"],["Emniyet ventilinden sürekli su damlıyor","Basınç yükselmesini tank karşılayamıyor","Ventil değil tank kontrol edilmeli"],["Kombi sık sık basınç arızasına geçiyor","Tank görev yapamıyor","Basınç dalgalanmasını izleyin"],["Tankın hava supabından su geliyor","Diyafram yırtık, su hava tarafına geçmiş","Değişim gerekir"],["Tanka vurunca bir taraf tok, diğer taraf su sesi","Diyafram bütünlüğü bozulmuş olabilir","Servis kontrolü"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <Photo src={basinc} alt="Isıtma sistemindeki yuvarlak manometre; ibre yeşil bölgede" caption="Isınınca makul yükselip soğuyunca eski değerine dönen basınç = sağlıklı tank." className="mt-5" />
      </Section>

      <Section n="04" label="Nedenler" title={<>Genleşme Tankı <Hot>Neden Arızalanır?</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><Droplets className="h-5 w-5 text-brand-red" /> 1) Hava kaçağı (en yaygın)</h3><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">Hava, supap contasından yıllar içinde yavaş yavaş kaçar; basınç düştükçe diyafram su tarafına gerilir ve tank genleşme payını karşılayamaz. Tank sağlamdır — sadece hava basılması yeterlidir.</p></Card><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><XCircle className="h-5 w-5 text-brand-red" /> 2) Diyafram yırtılması</h3><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">Sürekli esneyip büzüşen diyafram yorulur ve yırtılır; su hava tarafına dolar, tank işlevini kaybeder. Kesin işaret: hava supabına basınca hava yerine su gelmesi. Bu durumda hava basmak çözüm değildir; tank değişmelidir. Kireçli su ve bakımsızlık diyafram ömrünü kısaltır.</p></Card></div>
      </Section>

      <Section n="05" label="Bakım" title={<>Genleşme Tankına Hava <Hot>Nasıl Basılır?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={havaKontrol} alt="Eldivenli el kırmızı genleşme tankının hava supabına lastik manometresi bastırıyor" caption="Tank basıncı hava supabından ölçülür; tank su doluyken ölçüm yanıltıcıdır." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">İşlem basit görünse de doğru sırayla yapılmalıdır: önce kombi kapatılır ve elektriği kesilir, tesisat suyu boşaltılarak tankın su tarafı boşaltılır. Sonra hava supabına (araba lastiği supabına benzer) pompa veya kompresör bağlanır. Hava basıldıktan sonra tesisat yeniden doldurulur, basınç 1,5 bara ayarlanır ve kombi ısıtılarak basıncın sabit kalıp kalmadığı izlenir.</p></div></div>
        <Warning title="Supaptan su geliyorsa pompalamayı bırakın">Hava basılırken supaptan su geliyorsa diyafram yırtıktır; bu tank değişecek demektir. Ayrıca tank kombinin içindedir — gaz ve elektrik bağlantıları nedeniyle sökme ve hava basma işlemleri yetkili servisin işidir.</Warning>
        <CTA />
      </Section>

      <Section n="06" label="Değerler" title={<>Tank Basıncı <Hot>Kaç Olmalı?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Genel kural: tank hava basıncı, soğuk tesisat basıncının biraz altında olmalıdır. Soğuk tesisat 1–1,5 bar civarında çalıştığı için tank basıncı çoğu kombide <b className="text-foreground">0,8–1 bar</b> olarak ayarlanır. Çok düşükse diyafram sürekli su tarafına yaslanır ve tank devreye giremez; çok yüksekse su tanka giremez ve genleşme yine karşılanamaz. Kesin değer marka ve modele göre değişir — kullanım kitapçığındaki değer esas alınmalıdır. Ayar sonrası kombi birkaç ısıtma-soğuma döngüsünde izlenmelidir.</p>
      </Section>

      <Section n="07" label="Karar" title={<>Tamir mi, <Hot>Değişim mi?</Hot></>}>
        <div className="mt-5 grid gap-3 sm:grid-cols-2"><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-success"><ThumbsUp className="h-5 w-5" /> Hava basmak yeterli</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Tankın havası kaçmış ama diyafram sağlamsa","Hava bastıktan sonra basınç haftalarca sabit kalıyorsa","Supap contası kaçırıyorsa → supap çekirdeği değiştirilebilir"].map(t=><li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>)}</ul></Card><Card className="p-4"><h3 className="flex items-center gap-2 font-extrabold text-brand-red"><XCircle className="h-5 w-5" /> Değişim şart</h3><ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">{["Diyafram yırtıksa (supaptan su geliyorsa)","Gövdede korozyon veya su kaçağı varsa","Tank çok eskiyse","Değişimde modele uygun, doğru hacimli tank seçilmeli"].map(t=><li key={t} className="flex gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" />{t}</li>)}</ul></Card></div>
      </Section>

      <Section n="08" label="Güvenlik" title={<>Kombinin İçine <Hot>Müdahale Etmeyin</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><Photo src={kontrol} alt="Tesisatçı el feneriyle kombinin arkasındaki kırmızı genleşme tankını inceliyor" caption="Tank kombinin içindedir; panele ulaşmak gaz ve elektrik bağlantılarına yaklaşmak demektir." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tanka ulaşmak için ön panelin açılması gerekir; kombinin içinde gaz hattı, elektrik bağlantıları ve hassas elektronik kart bulunur. Panelsiz çalıştırma, yanlış söküm veya gaz bağlantısına temas ciddi güvenlik riskidir. Evde güvenle yapılabilecekler: basınç göstergesini izlemek, emniyet ventili kaçağını not etmek ve belirtileri servise aktarmak.</p></div></div>
        <Warning title="Gaz kokusu hissederseniz">Hiçbir işlem yapmadan ortamı havalandırın, elektrikli cihazlara dokunmayın ve dışarıdan 187 Doğalgaz Acil hattını arayın.</Warning>
      </Section>

      <Section n="09" label="Servis" title={<>Ne Zaman <Hot>Kombi Servisi?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Basınç ısınınca 3 bara fırlayıp soğuyunca 1 barın altına düşüyorsa, emniyet ventili sürekli su kaçırıyorsa, kombi tekrarlayan basınç arızası veriyorsa veya hava basmadan sonra sorun kısa sürede geri döndüyse servis çağırın. Servis, tank basıncını ölçer, diyafram bütünlüğünü kontrol eder ve gerekiyorsa hava basar veya tankı değiştirir. İhmal edilen tank arızası sürekli basınç darbesiyle eşanjör, pompa ve bağlantıları yorar; küçük bir bakım işlemi pahalı bir arızaya dönüşebilir.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><Photo src={emniyetVentili} alt="Isıtma sistemindeki pirinç emniyet ventilinden su damlıyor; zeminde birikinti" caption="Emniyet ventili kaçırıyorsa asıl sorun çoğu zaman ventil değil, genleşme tankıdır." /><div className="grid grid-cols-2 gap-2">{[[Gauge,"Tank basıncı ölçümü"],[Flame,"Kombi bakımı"],[Clock,"Aynı gün servis"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Gauge;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div></div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="10" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"kombi-basinci-dusuyor"}} className="font-bold text-brand-red underline">Kombi basıncı düşüyor</Link><Link to="/blog/$slug" params={{slug:"kombi-neden-calismiyor"}} className="font-bold text-brand-red underline">Kombi neden çalışmıyor</Link><Link to="/hizmet/$slug" params={{slug:"kombi-servisi"}} className="font-bold text-brand-red underline">Kombi servisi hizmeti</Link></div></Section>}
    </main>
  </div>;
}
