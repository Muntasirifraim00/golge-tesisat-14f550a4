import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Droplets, Home, Menu,
  MessageCircle, Phone, ShieldCheck, Wrench, Gauge, Search, Settings,
  CircleDot, RefreshCw, MapPin, ThumbsUp, Plug, ArrowDownUp, Zap,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/camasir/camasir-makinesi-musluk-kapak.jpg";
import threeConnections from "@/assets/camasir/camasir-makinesi-musluk-uc-baglanti.jpg";
import diagram from "@/assets/camasir/camasir-makinesi-musluk-baglanti-semasi.jpg";
import tools from "@/assets/camasir/camasir-makinesi-musluk-aletler.jpg";
import problems from "@/assets/camasir/camasir-makinesi-musluk-sorunlar.jpg";
import tapDirections from "@/assets/camasir/camasir-makinesi-musluk-musluk-yonleri.jpg";
import componentsImg from "@/assets/camasir/camasir-makinesi-musluk-parcalari.jpg";
import inletHose from "@/assets/camasir/camasir-makinesi-musluk-su-giris-hortumu.jpg";
import drainHose from "@/assets/camasir/camasir-makinesi-musluk-tahliye-hortumu.jpg";
import testing from "@/assets/camasir/camasir-makinesi-musluk-test.jpg";
import singleDouble from "@/assets/camasir/camasir-makinesi-musluk-tekli-ciftli-musluk.jpg";
import proService from "@/assets/camasir/camasir-makinesi-musluk-profesyonel-servis.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Profesyonel montaj mı lazım?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Çamaşır makinesi bağlantınızı <span className="text-brand-red">sızdırmaz yapalım.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul genelinde 7/24 servis, ücretsiz keşif ve garantili işçilik.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={proService} alt="Çamaşır makinesi bağlantısını kontrol eden profesyonel tesisatçı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

const problemsData = [
  ["Makineye su gelmiyor", "Musluk kapalı veya yarım açık olabilir; giriş hortumu bükülmüş ya da conta yanlış oturmuş olabilir."],
  ["Makinenin arkasından su kaçırıyor", "Hortum bağlantısı gevşek, conta eksik veya hasarlı, bağlantı aşırı sıkılmış olabilir."],
  ["Makine suyu boşaltmıyor", "Tahliye hortumu bükülmüş, gider tıkalı veya hortum yanlış yükseklikte olabilir."],
  ["Sürekli su alıp boşaltıyor", "Tahliye hortumu çok alçaktaysa sifon etkisiyle su kendiliğinden boşalır."],
];

export function CamasirMakinesiEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Tesisat</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Çamaşır Makinesi Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Çamaşır Makinesi <Hot>Nasıl Bağlanır?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Musluk, su giriş hortumu, gider bağlantısı ve güvenli kurulum için eksiksiz rehber.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Modern çamaşır odasında musluk, giriş hortumu ve gider bağlantısı görünen çamaşır makinesi" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Orta · 3/5"],[Clock,"Tahmini süre","45–60 dakika"],[Wrench,"Gerekli alet","Pense, kova, bez"],[AlertTriangle,"Ana risk","Yanlış gider bağlantısı"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Giriş" title={<>Üç Temel Bağlantıyı <Hot>Anlayın</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="border-l-2 border-brand-red pl-4 text-[15px] leading-relaxed text-foreground/85">Yeni bir çamaşır makinesi kurulumu üç ayrı sistemin bağlanmasından oluşur. Küçük bir montaj hatası bile su kaçağına, tahliye sorununa veya makine arızasına yol açabilir.</p><div className="mt-4 grid gap-2">{[[Droplets,"Su girişi: musluk ve giriş hortumuyla temiz su"],[ArrowDownUp,"Gider: tahliye hortumuyla atık su uzaklaştırılır"],[Plug,"Elektrik: makinenin çalışması için güvenli besleme"]].map(([I,t])=>{const Icon=I as typeof Droplets; return <Card key={t as string} className="flex items-center gap-3 p-3"><Icon className="h-5 w-5 text-brand-red"/><b className="text-[13px]">{t as string}</b></Card>})}</div></div><Photo src={threeConnections} alt="Çamaşır makinesinin su girişi, gider ve elektrik bağlantı noktaları" caption="Yanlış takılan musluk, eksik conta veya hatalı konumlanan tahliye hortumu kaçağa neden olur." /></div>
      </Section>

      <Section n="03" label="Kısa Cevap" title={<>Çamaşır Makinesi <Hot>Nasıl Bağlanır?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Üç ana bağlantı gerekir: giriş hortumunu doğru musluğa bağlayın, tahliye hortumunu uygun gider ağzına takın ve makineyi uygun elektrik hattına bağlayın. İlk yıkamadan önce mutlaka kaçak kontrolü yapın.</p>
        <Photo src={diagram} alt="Çamaşır makinesinin temiz su, atık su ve elektrik bağlantı şeması" className="mt-5" />
        <CheckList columns={2} items={["Musluğu açmak için sola (saat yönünün tersine) çevirin", "Kapatmak için sağa (saat yönünde) çevirin", "Musluğu yarım değil, tam açık bırakın", "Giriş hortumunun lastik contasının yerinde olduğundan emin olun", "Tahliye hortumunu üreticinin önerdiği yükseklikte tutun (genellikle 60–100 cm)", "İlk önce kısa ve boş bir program çalıştırıp kaçak kontrolü yapın"]} />
      </Section>

      <Section n="04" label="Başlamadan Önce" title={<>Kendiniz <Hot>Bağlayabilir misiniz?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">Evinizde uygun bir musluk ve gider ağzı zaten varsa, dikkatli bir hazırlıkla bağlantı genellikle yapılabilir. Yeni su hattı çekmek, hasarlı vana değiştirmek veya yeni gider bağlantısı oluşturmak ise profesyonel destek ister.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[12.5px]"><thead className="bg-brand-red text-brand-red-foreground"><tr><th className="p-3">Kriter</th><th className="p-3">Değerlendirme</th></tr></thead><tbody>{[["Zorluk","Orta (3/5)"],["Tahmini süre","45–60 dakika"],["Gerekli aletler","Pense, kova, bez"],["Ana risk","Yanlış gider bağlantısı su taşmasına ve makine arızasına yol açar"]].map(r=><tr key={r[0]} className="border-t border-border odd:bg-surface/70">{r.map((c,i)=><td key={c} className={cn("p-3",i===0&&"font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr]"><Photo src={tools} alt="Çamaşır makinesi bağlantısında gereken pense, anahtar, conta, hortum ve bez" /><CheckList items={["Su hattının erişilebilir olduğunu kontrol edin", "Mevcut çamaşır makinesi musluğunu inceleyin", "Giriş ve tahliye hortumlarını kontrol edin", "Lastik contaların yerinde olduğundan emin olun", "Kalan su için kova ve bez hazırlayın"]} /></div>
      </Section>

      <Section n="05" label="Hızlı Teşhis" title={<>Hangi Sorunu <Hot>Yaşıyorsunuz?</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr] lg:items-start"><div className="grid gap-2">{problemsData.map(([t,d],i)=><Card key={t} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-red/50 text-[11px] font-black text-brand-red">0{i+1}</span><div><h3 className="text-[14px] font-extrabold">{t}</h3><p className="mt-1 text-[12px] text-muted-foreground">{d}</p></div></Card>)}</div><Photo src={problems} alt="Çamaşır makinesinde kapalı musluk, hortum kaçağı, bükülmüş ve alçak tahliye hortumu sorunları" /></div>
        <Warning title="Bunlar olası nedenlerdir">Kesin teşhis için makinenin montaj talimatını ve mevcut tesisat bağlantılarını birlikte kontrol etmek gerekir.</Warning><CTA />
      </Section>

      <Section n="06" label="Musluk Yönü" title={<>Musluk Hangi Yöne <Hot>Açılır?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Standart vidalı musluklarda kural basittir: sola çevirince açılır, sağa çevirince kapanır. Kollu çeyrek tur vanalarda ise kol boruya paralelse açık, dikse (90°) kapalıdır.</p><CheckList items={["Vidalı musluk: sola = açık, sağa = kapalı", "Kollu vana: kol boruya paralel = açık, dik = kapalı", "Musluğu tam açın; makine su alımını kendi iç vanasıyla ayarlar", "Yarım açık musluk yavaş doluma ve su hatasına yol açabilir", "Vidalı muslukta tam açtıktan sonra çeyrek tur geri almak kolun sıkışmasını önler", "Uzun süre evde olmayacaksanız musluğu kapatın"]} /></div><Photo src={tapDirections} alt="Vidalı musluk ve kollu vananın açık-kapalı konumları" caption="Makine su alımını iç vanasıyla kontrol eder; dış musluk tam açık kalmalıdır." /></div>
      </Section>

      <Section n="07" label="Malzemeler" title={<>Bağlantıdan Önce <Hot>Neler Gerekli?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Çoğu çamaşır makinesinin kutusundan su giriş hortumu ve tahliye hortumu çıkar. Mevcut tesisata göre ayrıca çamaşır makinesi musluğu ve uygun lastik contalar gerekebilir. Çamaşır ve bulaşık makinesini tek noktaya bağlamak için iki çıkışlı çatal (ikili) musluk kullanılır.</p>
        <Photo src={componentsImg} alt="Çamaşır makinesi musluğu, giriş hortumu, contalar, tahliye hortumu ve çift çıkışlı musluk" className="mt-5" />
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[12.5px]"><thead className="bg-brand-red text-brand-red-foreground"><tr><th className="p-3">Bağlantı</th><th className="p-3">Nereye bağlanır</th><th className="p-3">Önemli kural</th></tr></thead><tbody>{[["Su musluğu","Mevcut su hattı çıkışı","Uygun sızdırmaz bağlantı kullanın"],["Giriş hortumu","Musluk ile makine girişi arası","Lastik contanın yerinde olduğundan emin olun"],["Tahliye hortumu","Gider ağzı veya lavabo sifonu","Üreticinin yükseklik talimatına uyun"],["Musluk yönü","Su kontrolü","Sol = açık, sağa = kapalı"]].map(r=><tr key={r[0]} className="border-t border-border odd:bg-surface/70">{r.map((c,i)=><td key={c} className={cn("p-3",i===0&&"font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="08" label="Adım 1" title={<>Su Girişi: Musluk ve <Hot>Giriş Hortumu</Hot></>}>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-start"><div><Steps items={[["Musluğu takın","Uygun conta veya PTFE bantla bağlayın; aşırı güç uygulamayın."],["Hortumun bir ucunu musluğa bağlayın","Dişleri elle başlatın; çapraz takmayın."],["Diğer ucu makineye bağlayın","Makinenin arkasındaki su giriş vanasına takın."],["Contaları kontrol edin","Lastik contaların düz oturduğundan emin olun."],["Elle sıkın","Çoğu giriş hortumu aletsiz takılabilir."],["Musluğu açıp inceleyin","Her iki bağlantı noktasını kuru bezle kontrol edin."]]} /><Warning title="Aşırı sıkmayın">Aşırı kuvvet dişleri ve sızdırmazlık yüzeyini bozarak kaçağa neden olabilir. Hafif nem bile yanlış oturan bağlantının işaretidir.</Warning></div><Photo src={inletHose} alt="Örgülü giriş hortumunu contasıyla krom musluğa bağlayan eller" caption="Kurudan sonra açılan muslukta her bağlantıyı kuru bezle ayrı ayrı kontrol edin." /></div>
      </Section>

      <Section n="09" label="Adım 2" title={<>Tahliye Hortumu <Hot>Bağlantısı</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={drainHose} alt="Doğru ve yanlış tahliye hortumu yükseklikleri karşılaştırması" caption="Hortum çok alçaksa sifon etkisiyle su sürekli boşalır; çok yüksekse pompa zorlanır." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tahliye hortumu doğrudan duvar gider borusuna veya lavabo sifonundaki makine çıkışına bağlanabilir. Üreticiler genellikle yerden 60–100 cm yükseklik önerir; kendi modelinizin talimatını esas alın.</p><CheckList items={["Hortumu gider borusuna çok derin sokmayın", "Bükülme ve ezilme olmadığından emin olun", "Hortumu sabitleyin; tahliye sırasında yerinden çıkmasın", "Gerekiyorsa uygun hava boşluğu bırakın", "Hortum tekrar tekrar çıkıyor veya su geri tepiyorsa profesyonel kontrol alın"]} /></div></div>
      </Section>

      <Section n="10" label="Adım 3" title={<>İlk Çalıştırma ve <Hot>Kaçak Kontrolü</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><Steps items={[["Su musluğunu açın","Giriş bağlantılarını gözden geçirin."],["Elektriği bağlayın","Üreticinin elektrik güvenliği talimatına uyun."],["Kısa veya boş program başlatın","Çamaşır koymadan durulama programı çalıştırın."],["Su girişini izleyin","Dolum sırasında musluk ve hortumda damla arayın."],["Tahliyeyi izleyin","Boşaltma sırasında kaçak, taşma veya geri tepme olmamalı."],["Dengeyi kontrol edin","Ayakları ayarlayın; sallanan makine hortumları zorlar."]]} /></div><Photo src={testing} alt="İlk test programı sırasında hortum bağlantılarını kontrol eden tesisatçı" /></div>
      </Section>

      <Section n="11" label="Su Girişi Tipi" title={<>Tek mi, Çift mi: <Hot>Sıcak Su Gerekir mi?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Türkiye'de satılan çoğu çamaşır makinesi tek su girişlidir ve soğuk suya bağlanır; suyu kendi rezistansıyla ısıtır. İthal veya üst segment bazı modellerde sıcak ve soğuk olmak üzere iki giriş bulunur.</p><CheckList items={["Çoğu makine tek soğuk su girişi kullanır", "Makine suyu kendi içinde ısıtır", "Çift girişli modellerde üretici talimatı esastır", "Kullanılmayan giriş, belirtilen kör tapayla kapatılır", "Lavabo altı kurulumda yeterli boşluk ve ezilmeyen hortum şarttır"]} /></div><Photo src={singleDouble} alt="Tek girişli ve çift girişli çamaşır makinesi arka bağlantı panelleri" /></div>
      </Section>

      <Section n="12" label="Profesyonel Destek" title={<>Ne Zaman <Hot>Tesisatçı Gerekir?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Uygun musluk ve gider varsa bağlantı genellikle kendiniz yapılabilir. Ancak bazı durumlar profesyonel tesisat işi gerektirir.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">{[["Yeni musluk gerekiyorsa","Yeni su hattı veya hasarlı musluk değişimi tesisat işidir."],["Yeni gider ağzı gerekiyorsa","Gider borusunda değişiklik dikkatle yapılmalıdır."],["Eski vana bozuksa","Korozyona uğramış veya kaçıran vana değiştirilmelidir."],["Çift musluk takılacaksa","İki cihazı tek noktaya bağlamak uygun çatal musluk ister."],["Kaçak sürüyorsa","Temel kontrollerden sonra kaçak devam ediyorsa hat incelenmelidir."],["Makine sürekli doldurup boşaltıyorsa","Hatalı bağlantı sürekli su alımına veya tahliyeye neden olabilir."]].map(([t,d])=><Card key={t} className="p-4"><h3 className="flex items-center gap-2 font-extrabold"><AlertTriangle className="h-4 w-4 text-brand-red" />{t}</h3><p className="mt-2 text-[12.5px] text-muted-foreground">{d}</p></Card>)}</div>
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Gölge Tesisat olarak İstanbul genelinde çamaşır ve bulaşık makinesi su girişi ve gider bağlantısı, çift musluk montajı, hasarlı vana değişimi, kaçak kontrolü ve bağlantı testi hizmeti veriyoruz.</p>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Wrench,"Musluk montajı"],[Search,"Kaçak kontrolü"],[RefreshCw,"Vana değişimi"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Wrench;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div><CTA final />
      </Section>

      {faq.length > 0 && <Section n="13" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"camasir-makinesi-su-bosaltmiyor-nedenleri"}} className="font-bold text-brand-red underline">Makine suyu boşaltmıyorsa</Link><Link to="/blog/$slug" params={{slug:"su-vanasi-nasil-kapatilir-acilir"}} className="font-bold text-brand-red underline">Su vanasını kapatma rehberi</Link><Link to="/hizmet/$slug" params={{slug:"tikaniklik-acma"}} className="font-bold text-brand-red underline">Gider tıkanıklığı açma hizmeti</Link></div></Section>}
    </main>
  </div>;
}
