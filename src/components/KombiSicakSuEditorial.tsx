import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, Droplets,
  XCircle, Info, Thermometer, Flame, RefreshCw,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/kombi-sicak-su/kombi-sicak-su-kapak.jpg";
import ayar from "@/assets/kombi-sicak-su/kombi-sicak-su-ayar.jpg";
import basinc from "@/assets/kombi-sicak-su/kombi-sicak-su-basinc.jpg";
import perlator from "@/assets/kombi-sicak-su/kombi-sicak-su-perlator.jpg";
import esanjor from "@/assets/kombi-sicak-su/kombi-sicak-su-esanjor.jpg";
import vanaSensor from "@/assets/kombi-sicak-su/kombi-sicak-su-vana-sensor.jpg";
import profesyonel from "@/assets/kombi-sicak-su/kombi-sicak-su-profesyonel.jpg";
import ctaFinal from "@/assets/kombi-sicak-su/kombi-sicak-su-tesisatci-cagir.jpg";

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
function InfoBox({ title, children }: { title: string; children: ReactNode }) {
  return <div className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border border-border bg-surface/70 p-4"><Info className="h-6 w-6 text-brand-red" /><div><h3 className="font-extrabold">{title}</h3><div className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{children}</div></div></div>;
}
function DataTable({ headers, rows, caption }: { headers: string[]; rows: string[][]; caption?: string }) {
  return <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[12.5px]"><thead><tr className="border-b border-border bg-surface">{headers.map((h) => <th key={h} className="px-3 py-2.5 font-extrabold">{h}</th>)}</tr></thead><tbody>{rows.map((r, i) => <tr key={i} className="border-b border-border/60 last:border-0">{r.map((c, j) => <td key={j} className={cn("px-3 py-2.5 align-top leading-snug", j === 0 ? "font-bold" : "text-muted-foreground")}>{c}</td>)}</tr>)}</tbody></table>{caption && <p className="border-t border-border px-3 py-2 text-[11px] text-muted-foreground">{caption}</p>}</div>;
}
function CTA({ final = false }: { final?: boolean }) {
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Sıcak su hâlâ gelmiyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Yerinde teşhisle aynı gün <span className="text-brand-red">sıcak suyu geri getiriyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul Avrupa ve Anadolu yakasında tüm markalarda kombi servisi. Eşanjör kireç temizliği, akış sensörü ve üç yollu vana değişimi garantili. 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Gölge Tesisat teknisyeni telefonda müşteriyle konuşuyor, arkasında servis aracı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function KombiSicakSuEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Isıtma &amp; Kombi</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kapsamlı Rehber</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Kombi <Hot>Sıcak Su</Hot> Vermiyor</h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Petekler ısınıyor ama musluktan sıcak su gelmiyor mu? Sorun sıcak su devresindedir: eşanjör kireci, akış sensörü veya üç yollu vana. Belirtilere göre ayırt edin, evde kontrolleri deneyin.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Mutfakta duvara monteli kombi; musluk simgeli ekranı açık, önde akan musluk ve arkada petek" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge, "Zorluk", "Kolay"], [Clock, "Süre", "10–20 dakika"], [Wrench, "Gerekli", "Aletsiz kontrol"], [ShieldAlert, "Ana risk", "Yanlış müdahale"]].map(([I, l, v]) => { const Icon = I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-1.5 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>; })}</div>
      </section>

      <Section n="01" label="Kısa Cevap" title="30 saniyede karar verin">
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Card className="p-4"><Thermometer className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Su hiç ısınmıyor</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Isıtma çalışırken su buz gibi akıyorsa şüpheliler: akış sensörü veya üç yollu vana. Kombi musluğun açıldığını algılamıyor.</p></Card>
          <Card className="p-4"><Flame className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Bir sıcak bir soğuk</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Sıcaklık zıplıyorsa tipik neden plakalı eşanjörün kireçlenmesidir; su kanallardan düzenli geçemiyor.</p></Card>
          <Card className="p-4"><Droplets className="h-5 w-5 text-brand-red" /><h3 className="mt-2 text-[14px] font-extrabold">Su ılık geliyor</h3><p className="mt-1 text-[12.5px] leading-snug text-muted-foreground">Önce paneldeki sıcak su ayarını ve musluk perlatörünü kontrol edin; çoğu zaman çözüm bu kadar basit.</p></Card>
        </div>
        <CheckList columns={2} items={[
          "Sıcak su (musluk simgeli) sıcaklık ayarını yükseltin",
          "Manometreden basıncı okuyun; 1–1,5 bar olmalı",
          "Başka bir muslukta deneyin; sorun tek muslukta ise tıkanıklık oradadır",
          "Musluk ve duş başlığının perlatörünü söküp kireçten temizleyin",
          "Suyu sonuna kadar açın; kısık akışta kombi sıcak su moduna geçmeyebilir",
          "Soğuk normal, sıcak hiç yoksa: eşanjör, akış sensörü veya üç yollu vana",
        ]} />
        <Warning title="Kombiyi kendiniz açmayın">Eşanjör, akış sensörü ve üç yollu vana cihazın içindedir. Kapağı açmak, devreyi boşaltmak veya parça sökmek sızıntıya, arızanın büyümesine ve garanti kaybına yol açar. İç parçalar yalnızca yetkili teknisyen tarafından test edilip değiştirilmelidir.</Warning>
      </Section>

      <Section n="02" label="Mantık" title="Petekler ısınıyorsa sorun nerede?">
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Kombi, ısıtma ve sıcak kullanım suyu için aynı brülörü kullanır ama bu iki devre birbirinden ayrıdır. Petekler ısınıyorsa gaz beslemesi, ateşleme ve ana eşanjör sağlam demektir; arıza yalnızca suyu musluğa ileten sıcak su (DHW) devresindedir. Bu, teşhisi çok kolaylaştırır: sorunu kombinin tamamında değil, birkaç parçada aramak yeterlidir.</p>
        <DataTable
          headers={["Parça", "Görevi", "Arıza belirtisi"]}
          rows={[
            ["Plakalı eşanjör", "Musluk suyunu anında ısıtır", "Su hiç ısınmıyor veya sıcaklık zıplıyor"],
            ["Akış (debi) sensörü", "Musluk açıldığını kombiye bildirir", "Su tamamen soğuk akar, kombi tepki vermez"],
            ["Üç yollu (divertör) vana", "Suyu ısıtma ile sıcak su arasında yönlendirir", "Isıtma konumunda takılı kalır, sıcak su gelmez"],
            ["Şebeke debisi / perlatör", "Yeterli su akışını sağlar", "Su cılız akar, kombi devreye girmez"],
          ]}
          caption="Isıtma çalışırken sıcak suyun gelmemesinin dört ana şüphelisi"
        />
      </Section>

      <Section n="03" label="Evde Kontrol" title="Servisten önce deneyin">
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Bu üç kontrol kombiyi açmayı gerektirmez ve sorunun basit mi yoksa parça değişimi isteyen bir arıza mı olduğunu gösterir.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div><Photo src={ayar} alt="Kombi panelinde musluk simgeli sıcak su sıcaklık düğmesini çeviren el" caption="1. Sıcak su ayarını yükseltin" /><p className="mt-2 text-[12.5px] leading-snug text-muted-foreground">Paneldeki musluk simgeli düğme yanlışlıkla kısılmış olabilir; 50–55 °C civarına getirip deneyin.</p></div>
          <div><Photo src={basinc} alt="Kombi manometresi, ibre yeşil bölgede 1,5 bar civarında" caption="2. Basıncı kontrol edin" /><p className="mt-2 text-[12.5px] leading-snug text-muted-foreground">Manometre 1–1,5 bar göstermeli. Düşükse dolum musluğundan yavaşça tamamlayın.</p></div>
          <div><Photo src={perlator} alt="Kireç kaplı musluk perlatörünü söken el" caption="3. Perlatörü temizleyin" /><p className="mt-2 text-[12.5px] leading-snug text-muted-foreground">Musluk ucundaki perlatörü söküp kireçten arındırın; tıkalı perlatör debiyi düşürür, kombi devreye girmez.</p></div>
        </div>
        <InfoBox title="Tek muslukta mı, hepsinde mi?">Sorun yalnızca bir muslukta ise tıkanıklık o musluktadır, kombide değil. Tüm musluklarda sıcak su yoksa arıza kombinin sıcak su devresindedir.</InfoBox>
      </Section>

      <Section n="04" label="En Yaygın Suçlu" title="Plakalı eşanjör kireçlenmesi">
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_.9fr] lg:items-start">
          <div>
            <p className="text-[14px] leading-relaxed text-muted-foreground">Sıcak kullanım suyu, plakalı eşanjör adı verilen küçük bir ısı değiştiricide anında ısıtılır. Özellikle suyu kireçli bölgelerde bu ince kanallar zamanla kireçle dolar ve su yeterince ısınamadan geçer. Tipik belirti: ısıtma kusursuz çalışırken sıcak su ya hiç gelmez ya da açıp kapadıkça bir sıcak bir soğuk akar.</p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">Çözüm, eşanjörün kimyasal olarak temizlenmesi (kireç sökme) veya ileri durumda değiştirilmesidir. İşlem kombinin açılmasını gerektirdiği için yetkili teknisyen tarafından yapılmalıdır. Tekrarını önlemek için periyodik kombi bakımı ve gerekirse tesisata kireç önleyici önerilir.</p>
          </div>
          <Photo src={esanjor} alt="İnce kanalları beyaz kireçle dolmuş plakalı eşanjör, eldivenli teknisyenin elinde" caption="Kireçle dolan eşanjör kanalları suyu ısıtamaz" />
        </div>
      </Section>

      <Section n="05" label="Diğer Şüpheliler" title="Akış sensörü ve üç yollu vana">
        <div className="mt-5 grid gap-6 lg:grid-cols-[.9fr_1fr] lg:items-start">
          <Photo src={vanaSensor} alt="Tezgâhta üç yollu vana, akış sensörü ve multimetre" caption="Her iki parça da yerinde ölçümle test edilir" />
          <div>
            <p className="text-[14px] leading-relaxed text-muted-foreground"><b className="text-foreground">Akış (debi) sensörü</b>, sıcak su musluğunu açtığınızda kombiye “su akıyor, sıcak su moduna geç” sinyalini gönderir. Arızalandığında kombi musluğun açıldığını anlamaz, brülörü sıcak su için devreye almaz; su soğuk akar.</p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground"><b className="text-foreground">Üç yollu (divertör) vana</b> suyu ısıtma ile sıcak su devresi arasında yönlendirir. Sıkıştığında kombi ısıtma konumunda kalır ve sıcak su tarafına geçemez. Belirti benzer olduğu için hangisinin arızalı olduğu yerinde ölçümle ayırt edilir.</p>
          </div>
        </div>
      </Section>

      <Section n="06" label="Ters Durum" title="Sıcak su var ama petekler ısınmıyorsa">
        <p className="mt-5 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Bazı kullanıcılarda durum tersinedir: musluktan sıcak su gelir ama radyatörler ısınmaz. Bu farklı bir arızadır ve ısıtma devresiyle ilgilidir: düşük su basıncı, peteklerde hava, kapalı radyatör vanaları veya oda termostatının kombiye komut göndermemesi.</p>
        <InfoBox title="İlgili rehberler">
          Peteklerin ısınmamasıyla ilgili adımlar için <Link to="/blog/$slug" params={{ slug: "kombi-calisiyor-ama-petekler-isinmiyor" }} className="font-bold text-brand-red underline underline-offset-2">kombi çalışıyor ama petekler ısınmıyor</Link> rehberimize; peteklerdeki havayı almak için <Link to="/blog/$slug" params={{ slug: "petek-havasi-nasil-alinir" }} className="font-bold text-brand-red underline underline-offset-2">petek havası nasıl alınır</Link> yazımıza göz atın.
        </InfoBox>
      </Section>

      <Section n="07" label="Güvenlik Sınırı" title="Bu noktada müdahaleyi bırakın">
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {[
            "Kombinin ön kapağını açmayın; iç parçalar elektrik ve gaz bağlantılıdır",
            "Eşanjörü kendiniz sökmeyin; devre boşaltma ve kimyasal dozajı uzmanlık ister",
            "Basıncı 2 barın üzerine çıkarmayın; emniyet ventili su atar",
            "Gaz kokusu alırsanız cihazı kapatın, ortamı havalandırın ve hemen arayın",
          ].map((t) => <li key={t} className="flex items-start gap-2.5 rounded-lg border border-brand-red/40 bg-brand-red/5 p-3 text-[13px] leading-snug"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{t}</span></li>)}
        </ul>
        <CTA />
      </Section>

      <Section n="08" label="Profesyonel Süreç" title="Serviste ne yapıyoruz?">
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_.9fr] lg:items-start">
          <div className="min-w-0">
            <DataTable
              headers={["Aşama", "İşlem"]}
              rows={[
                ["1. Teşhis", "Sıcak su devresi yerinde test edilir; akış sensörü ve üç yollu vana ölçülür"],
                ["2. Eşanjör kontrolü", "Plakalı eşanjör sökülür, kireç durumu incelenir"],
                ["3. Temizlik / değişim", "Eşanjör kimyasal kireç sökme ile temizlenir veya değiştirilir"],
                ["4. Parça değişimi", "Arızalı akış sensörü veya üç yollu vana orijinal parçayla değiştirilir"],
                ["5. Çift test", "İşlem sonunda hem sıcak su hem ısıtma testi birlikte yapılır"],
              ]}
            />
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">İstanbul Avrupa ve Anadolu yakasında tüm kombi markalarına aynı gün servis veriyoruz; yapılan işlem ve değişen parçalar garantilidir.</p>
          </div>
          <Photo src={profesyonel} alt="Açık kombi önünde multimetreyle ölçüm yapan teknisyen" caption="Yerinde ölçümle net teşhis, gereksiz parça değişimi yok" />
        </div>
        <CTA final />
      </Section>

      <Section n="09" label="SSS" title="Sıkça Sorulan Sorular" id="sss">
        <div className="mt-5 grid gap-2">
          {faq.map((f) => <details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90" /></summary><p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}
        </div>
      </Section>

      <footer className="border-t border-border/70 py-8 text-center text-[11px] text-muted-foreground">
        <p>Gölge Tesisat — İstanbul Avrupa &amp; Anadolu Yakası · 7/24 Acil Servis · <a href={PHONE} className="font-bold text-brand-red">0533 896 05 03</a></p>
      </footer>
    </main>
  </div>;
}
