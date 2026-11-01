import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Thermometer, Flame, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/petek-hava/petek-hava-kapak.jpg";
import teshis from "@/assets/petek-hava/petek-hava-teshis.jpg";
import purjor from "@/assets/petek-hava/petek-hava-purjor.jpg";
import camur from "@/assets/petek-hava/petek-hava-camur.jpg";
import vana from "@/assets/petek-hava/petek-hava-vana.jpg";
import pompa from "@/assets/petek-hava/petek-hava-pompa.jpg";
import denge from "@/assets/petek-hava/petek-hava-denge.jpg";
import temizlik from "@/assets/petek-hava/petek-hava-temizlik.jpg";
import ctaFinal from "@/assets/petek-hava/petek-hava-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Petekler hâlâ ısınmıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Teşhis edip <span className="text-brand-red">aynı gün çözüyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Petek hava alma, makineli petek temizliği, vana değişimi ve denge ayarı; İstanbul genelinde 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Karlı akşamda İstanbul sokağında apartmana yürüyen tesisatçı ve kırmızı servis aracı" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function PetekHavaEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Petek</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Petek & Isıtma Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Petek Isınmıyor: <Hot>Hava Alma ve Çözüm Rehberi</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Kombi çalışıyor ama petek soğuksa sorun dört nedenden birindedir. Peteğin neresi soğuksa teşhis oradan başlar.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Kombi çalışırken soğuk kalan peteğin üstünü elle kontrol eden ev sahibi" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Kolay · 2/5"],[Clock,"Süre","10–15 dakika"],[Wrench,"Gerekli","Purjör anahtarı + kap"],[ShieldAlert,"Ana risk","Yanlış teşhis"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Teşhis" title={<>On Saniyelik İlk Teşhis: <Hot>Peteğin Neresi Soğuk?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">En hızlı teşhis yöntemi elinizle peteğin farklı bölgelerine dokunmaktır. Soğuk bölgenin konumu, sorunun nedenini büyük ölçüde ele verir.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Soğuk bölge</th><th className="px-4 py-3">Olası neden</th><th className="px-4 py-3">İlk yapılacak</th></tr></thead><tbody className="divide-y divide-border">{[["Üstü soğuk, altı sıcak","Petek içinde hava birikimi","Purjör vanasından hava alma"],["Altı soğuk, üstü sıcak","Tabanda çamur ve kireç birikimi","Petek temizliği değerlendirmesi"],["Tek petek tamamen soğuk","Vana kapalı veya TRV sıkışmış","Vana kontrolleri"],["Tüm petekler soğuk","Kombi modu, kapalı vana veya pompa arızası","Kombi ve sistem kontrolü"],["Uzak petekler ılık, yakınlar sıcak","Hidrolik dengesizlik","Denge (reglaj) ayarı"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <Photo src={teshis} alt="Üstü soğuk altı sıcak peteğin elle kontrolü — sıcaklık farkı teşhisin ilk adımı" caption="Soğuk bölgenin konumu, sorunun nedenini büyük ölçüde gösterir." className="mt-5" />
      </Section>

      <Section n="03" label="Senaryo 1" title={<>Üstü Soğuk, Altı Sıcak: <Hot>Hava Kilidi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">En yaygın senaryodur. Sistemdeki suyun içindeki hava zamanla ayrışır ve peteklerin üst bölümünde birikir; sıcak su üst kanallara ulaşamaz. Çözümü ev sahibinin güvenle yapabileceği bir işlem olan hava almadır. Doğru sıra önemlidir: en üst kattaki veya kombiden en uzak petekten başlanır, kombiye doğru ilerlenir.</p></div><Photo src={purjor} alt="Purjör anahtarıyla peteğin hava alma vanası açılıyor; altında kap ve bez" caption="Purjör anahtarı vanaya takılır, çeyrek tur çevrilir; hava sesi bitip su gelince kapatılır." /></div>
        <Steps items={[
          { title: "Kombi basıncını kontrol edin", body: "Gösterge 1–1,5 bar aralığında olmalı. Düşükse önce doldurma vanasıyla basıncı tamamlayın." },
          { title: "Kombiyi kapatın ve birkaç dakika bekleyin", body: "Sirkülasyon dursun ki hava peteklerin üstünde toplanmış olsun." },
          { title: "En uzak veya en üst kattaki petekten başlayın", body: "Purjör anahtarını peteğin üst köşesindeki hava alma vanasına takın; altına küçük bir kap ve bez koyun." },
          { title: "Vanayı çeyrek tur açın", body: "Saat yönünün tersine çevirin. Önce hışırtılı hava sesi gelir; hava bitince su damlamaya başlar." },
          { title: "Su gelince vanayı kapatın", body: "Suyu boşaltmayın; düzenli akış başlar başlamaz vanayı sıkın." },
          { title: "Diğer peteklere aynı sırayla geçin", body: "Kombiye doğru ilerleyerek her petekte aynı işlemi tekrarlayın." },
          { title: "Basıncı tekrar kontrol edin", body: "Hava alma basıncı düşürür. Gösterge 1 barın altına indiyse doldurma vanasıyla 1,5 bara tamamlayın." },
        ]} />
        <Warning title="Hava alma işe yaramıyorsa">Hava aldıktan kısa süre sonra petek yine soğuyorsa, purjörden kirli veya siyah su geliyorsa ya da anahtar boşta dönüyorsa sorun basit bir hava kilidi değildir. Kirli su çamurlu sistemi, boşta dönen anahtar purjör arızasını, tekrarlayan hava ise sistemde kaçak olduğunu gösterir — bu durumda profesyonel kontrol gerekir.</Warning>
        <CTA />
      </Section>

      <Section n="04" label="Senaryo 2" title={<>Altı Soğuk, Üstü Sıcak: <Hot>Çamur ve Kireç</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={camur} alt="Petek kesitinde tabanda birikmiş koyu çamur ve kireç tabakası" caption="Tabandaki çamur tabakası sıcak suyun alt kanallara ulaşmasını engeller." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Peteğin üstü sıcak ama altı soğuksa sorun hava değildir. Yıllar içinde sistem suyundaki pas, kireç ve tortu peteğin tabanında çöker. Hava almak bu senaryoda işe yaramaz çünkü çıkan şey hava değil, birikintinin üstündeki sudur. Çözüm, cihazla yapılan kimyasal petek temizliğidir; işlem sonrası sisteme koruyucu kimyasal (inhibitor) eklenmesi birikimin tekrarını yavaşlatır.</p><CheckList items={["Üst-alt sıcaklık farkı elle bile hissedilir", "Sık sık hava alma ihtiyacı doğar", "Purjörden koyu renkli su gelir", "Kombi eskisine göre daha uzun çalışır"]} /></div></div>
      </Section>

      <Section n="05" label="Senaryo 3" title={<>Tek Petek Tamamen Soğuk: <Hot>Vana Sorunu</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Diğer petekler sıcakken tek bir petek tamamen soğuksa sorun büyük olasılıkla o peteğin vanalarındadır. Termostatik vanalarda en yaygın neden, başlığın altındaki pinin sıkışmasıdır.</p></div><Photo src={vana} alt="Termostatik vana başlığı sökülüyor; alttaki küçük pin görünüyor" caption="TRV başlığı sökülünce alttaki pin kontrol edilir: yaylanıyorsa sağlam, kımıldamıyorsa sıkışmıştır." /></div>
        <Steps items={[
          { title: "Giriş vanası açık mı?", body: "Manuel vanalarda kol boru yönündeyse vana açıktır. Kapalıysa sonuna kadar açın." },
          { title: "Termostatik vana (TRV) sıkışmış mı?", body: "Başlığı saat yönünün tersine çevirip sökün; alttaki pini nazikçe itip bırakın. Yaylanarak geri çıkıyorsa sağlam, kımıldamıyorsa sıkışmış demektir. Zorlamayın." },
          { title: "Lockshield (dönüş) vanası kısılmış mı?", body: "Peteğin diğer ucundaki kapaklı vananın kapağını söküp alyanla çeyrek tur açın. Tamamen kapalıysa petek hiç ısınmaz." },
          { title: "Vanalar açık ama petek hâlâ soğuk mu?", body: "Petek içi çamurla tıkanmış olabilir; çamur senaryosundaki temizlik değerlendirmesine geçin." },
        ]} />
      </Section>

      <Section n="06" label="Senaryo 4" title={<>Tüm Petekler Soğuk: <Hot>Sistem Kontrolü</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={pompa} alt="Kazan dairesinde bakır borular üzerinde sirkülasyon pompası" caption="Pompa arızalandığında kombi çalışır ama su peteklerde dolaşmaz." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Hiçbir petek ısınmıyorsa sorun tek bir petekte değil, sistemdedir. İlk üç kontrol ev sahibinin yapabileceği basit kontrollerdir; pompa tarafı ustaya aittir.</p></div></div>
        <Steps items={[
          { title: "Kombi kış modunda mı?", body: "Yaz modunda kombi yalnızca sıcak su üretir, peteklere su göndermez. Panelden kış moduna alın." },
          { title: "Kombi basıncı yeterli mi?", body: "Basınç 1 barın altındaysa kombi güvenlik gereği çalışmayı durdurabilir. Doldurma vanasıyla 1,5 bara tamamlayın." },
          { title: "Kombi altındaki vanalar açık mı?", body: "Kalorifer gidiş ve dönüş vanaları kapalıysa su peteklere ulaşmaz. Kollar boru yönünde olmalı." },
          { title: "Kombi hata kodu gösteriyor mu?", body: "Pompa veya debiyle ilgili kodlar sirkülasyon sorununa işaret eder; anlamına kullanım kılavuzundan bakın." },
          { title: "Sirkülasyon pompası çalışıyor mu?", body: "Kombi çalışırken hafif bir uğultu duyulmalı. Hiç ses yoksa veya aşırı titreşim varsa pompa arızalı olabilir; kontrol ve değişim ustaya aittir." },
        ]} />
      </Section>

      <Section n="07" label="Denge" title={<>Uzak Petekler Ilık, Yakınlar Sıcaksa: <Hot>Denge Ayarı</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Su en kısa yoldan dönmeyi tercih eder; denge ayarı yapılmamış sistemlerde yakın peteklerden hızla geçer ve uzak peteklere yeterli debi kalmaz. Çözüm, her peteğin dönüş tarafındaki lockshield vanasıyla yapılan reglaj ayarıdır: yakın peteklerin vanası kısılır, uzak peteklerinki tam açılır.</p></div><Photo src={denge} alt="Alyan anahtarıyla peteğin lockshield vanası ayarlanıyor" caption="Lockshield vanası debi ayarı içindir; yakın peteklerde kısılır, uzaklarda tam açılır." /></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Petek konumu</th><th className="px-4 py-3">Lockshield vanası</th><th className="px-4 py-3">Amaç</th></tr></thead><tbody className="divide-y divide-border">{[["Kombiye yakın petekler","Kısık (çeyrek–yarım tur açık)","Debi yavaşlatılır"],["Orta mesafe petekler","Yarım–bir tur açık","Dengeli akış"],["En uzak petekler","Tam açık","Maksimum debi"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="08" label="Karşılaştırma" title={<>Termostatik Vana mı, <Hot>Manuel Vana mı?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Termostatik vana (TRV) oda sıcaklığına göre su akışını otomatik kısıp açar; manuel vana elle ayarlanır. Oda termostatı olan evlerde, termostatın bulunduğu odadaki peteğe TRV takılmaz — iki cihaz birbiriyle çakışır.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Özellik</th><th className="px-4 py-3">Termostatik (TRV)</th><th className="px-4 py-3">Manuel</th></tr></thead><tbody className="divide-y divide-border">{[["Kontrol","Oda sıcaklığına göre otomatik","Elle ayar"],["Konfor","Oda oda sıcaklık ayarı","Tek tip ayar"],["Termostatlı odada","Kullanılmaz — çakışır","Uygundur"],["Yatak odası / az kullanılan oda","İdeal — oda ısınınca kısar","Elle kısmak gerekir"],["Arıza durumu","Pin sıkışması yaygın","Basit, az arıza"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="09" label="Pompa" title={<>Sirkülasyon Pompası <Hot>Arıza Sinyalleri</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Pompa, kombiden çıkan sıcak suyu peteklerde dolaştıran parçadır. Arızalandığında kombi çalışır ama su hareket etmez. Pompa tamiri ve değişimi kombi iç aksamına müdahale gerektirdiğinden yetkili servis veya deneyimli usta tarafından yapılmalıdır.</p>
        <CheckList columns={2} items={["Kombi çalışıyor ama hiçbir petek ısınmıyor ve pompa uğultusu gelmiyor", "Kombi kısa sürede aşırı ısınıp kendini kapatıyor", "Peteklerin yalnızca üst boruları ılık, gövdeleri soğuk", "Ekranda pompa veya debiyle ilgili hata kodu var", "Pompadan düzensiz tıkırtı, sürtme veya aşırı titreşim geliyor"]} />
      </Section>

      <Section n="10" label="Servis" title={<>Ne Zaman <Hot>Profesyonel Destek?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Hava alma, vana kontrolü ve basınç tamamlama ev sahibinin güvenle yapabileceği işlemlerdir. Ancak hava aldıktan kısa süre sonra petekler tekrar soğuyorsa (kaçak ihtimali), purjörden sürekli koyu su geliyorsa (çamurlu sistem), TRV pini sıkışmışsa, tüm petekler soğuk ve kombi hata kodu veriyorsa veya uzak petekler kronik olarak ılık kalıyorsa profesyonel müdahale gerekir.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><Photo src={temizlik} alt="Tesisatçı makineli petek temizliği için hortumları peteğe bağlıyor" caption="Makineli temizlik tüm tesisatı ve petekleri dolaşan suyla temizler." /><div className="grid grid-cols-2 gap-2">{[[Thermometer,"Makineli petek temizliği"],[Flame,"Kombi bakımı"],[Clock,"Aynı gün servis"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Gauge;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div></div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="11" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"petek-temizligi-nasil-yapilir"}} className="font-bold text-brand-red underline">Petek temizliği nasıl yapılır</Link><Link to="/blog/$slug" params={{slug:"petek-havasi-nasil-alinir"}} className="font-bold text-brand-red underline">Petek havası nasıl alınır</Link><Link to="/blog/$slug" params={{slug:"kombi-basinci-dusuyor"}} className="font-bold text-brand-red underline">Kombi basıncı düşüyor</Link><Link to="/hizmet/$slug" params={{slug:"petek-temizligi"}} className="font-bold text-brand-red underline">Petek temizliği hizmeti</Link></div></Section>}
    </main>
  </div>;
}
