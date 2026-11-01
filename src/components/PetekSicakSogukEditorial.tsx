import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, Thermometer,
  Droplets, XCircle, Magnet,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/petek-sicak-soguk/petek-sicak-soguk-kapak.jpg";
import teshis from "@/assets/petek-sicak-soguk/petek-sicak-soguk-teshis.jpg";
import havaKilidi from "@/assets/petek-sicak-soguk/petek-sicak-soguk-hava-kilidi.jpg";
import camur from "@/assets/petek-sicak-soguk/petek-sicak-soguk-camur.jpg";
import debi from "@/assets/petek-sicak-soguk/petek-sicak-soguk-debi.jpg";
import yikama from "@/assets/petek-sicak-soguk/petek-sicak-soguk-yikama.jpg";
import filtre from "@/assets/petek-sicak-soguk/petek-sicak-soguk-filtre.jpg";
import ctaFinal from "@/assets/petek-sicak-soguk/petek-sicak-soguk-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Petekleriniz eşit ısınmıyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Kimyasal temizlik ve hava alma, <span className="text-brand-red">aynı gün yerinde.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">İstanbul geneli petek temizliği, powerflush ve ısıtma sistemi kontrolü; net ücret keşif sonrası. 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Alacakaranlıkta İstanbul sokağında kırmızı servis aracı; tesisatçı alet çantasıyla apartmana yürüyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function PetekSicakSogukEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Isıtma</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Kapsamlı Rehber</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Petek Alttan Sıcak <Hot>Üstten Soğuk</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Alttan sıcak üstten soğuksa hava kilidi, üstten sıcak alttan soğuksa çamur birikimi. İki simetrik arızanın teşhisi ve çözümü farklıdır.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Sıcaklık dağılımı bozulmuş bir panel radyatörü elle kontrol eden kişi" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge, "Zorluk", "Kolay · 2/5"], [Clock, "Süre", "10–30 dakika"], [Wrench, "Gerekli", "Purj anahtarı + kap"], [ShieldAlert, "Ana risk", "Basınç düşüklüğü"]].map(([I, l, v]) => { const Icon = I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card> })}
        </div>
      </section>

      <Section n="02" label="Teşhis" title={<>Hızlı <Hot>Teşhis Tablosu</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Elinizi radyatörün farklı noktalarına dokundurarak birkaç saniyede ön teşhis koyabilirsiniz. Alt-üst sıcaklık farkı arızanın türünü ele verir.</p></div><Photo src={teshis} alt="Radyatörün alt ve üst bölgeleri arasındaki sıcaklık farkını elle kontrol eden kişi" caption="Sıcaklık dağılımına bakarak arızanın türünü tahmin edebilirsiniz." /></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Gözlem</th><th className="px-4 py-3">Olası neden</th><th className="px-4 py-3">İlk kontrol</th></tr></thead><tbody className="divide-y divide-border">{[["Alt sıcak, üst soğuk", "Hava kilidi", "Purj vanasından hava sesi geliyor mu?"], ["Üst sıcak, alt soğuk", "Çamur / tortu birikimi", "Peteğin yaşı ve son temizlik tarihi"], ["Ortası sıcak, uçlar soğuk", "Düşük debi", "Pompa kademesi ve basınç"], ["Petek tamamen soğuk", "Vana kapalı veya hat tıkalı", "Giriş ve dönüş vanaları açık mı?"]].map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={cn("px-4 py-3", i === 0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="03" label="Senaryo 1" title={<>Alttan Sıcak, Üstten Soğuk: <Hot>Hava Kilidi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={havaKilidi} alt="Purj anahtarıyla radyatör hava alma vanası açılıyor; altta kap ve bez" caption="Hava kabarcığı peteğin üst yarısında toplanır; sıcak su yukarı ulaşamaz." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Suyun içindeki hava zamanla peteğin üst kısmında toplanır ve sıcak suyun üst yarıya ulaşmasını fiziksel olarak engeller. Tetikleyiciler: sisteme yeni su basılması, basınç düşüklüğü, uzun süre kapalı kalan petek, sezon başı ilk çalıştırma.</p></div></div>
        <Steps items={[
          { title: "Kombiyi kapatın ve peteğin soğumasını bekleyin", body: "Sıcak yüzeye dokunmadan çalışmak için 15-20 dakika bekleyin." },
          { title: "Purj anahtarıyla vanayı yavaşça açın", body: "Peteğin üst köşesindeki purj vidasını çeyrek tur çevirin; altına küçük bir kap ve bez koyun." },
          { title: "Hava sesi bitene kadar bekleyin", body: "Önce hışırtılı hava gelir; düzenli su akmaya başlayınca vidayı sıkın." },
          { title: "Kombi basıncını kontrol edin", body: "Purj sonrası manometre düştüyse doldurma musluğundan 1,5 bar seviyesine tamamlayın." },
          { title: "Peteği yeniden çalıştırıp kontrol edin", body: "10-15 dakika sonra üst kısım da ısınmışsa sorun çözülmüştür." },
        ]} />
      </Section>

      <Section n="04" label="Senaryo 2" title={<>Üstten Sıcak, Alttan Soğuk: <Hot>Çamur / Tortu</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Yıllar içinde tesisat suyunda manyetit (siyah çamur), kireç ve pas birikir. Bu ağır tortu peteğin alt kısmına çöker; sıcak su üstten sirküle olur, alt kısım soğuk kalır. Purj bu sorunu çözmez.</p></div><Photo src={camur} alt="Bahçede hortumla yıkanan eski radyatörden siyah çamurlu su akıyor" caption="Hafif tortuda petek sökülüp basınçlı suyla içten yıkanabilir." /></div>
        <CheckList columns={2} items={["Tetikleyiciler: eski tesisat, manyetik filtre olmaması, sık su tamamlama, musluk suyuyla doldurulmuş sistem", "Purj vanasından gelen su siyah veya kahverengiyse çamur teşhisi kesinleşir", "Hafif tortuda petek sökülüp bahçede basınçlı suyla içten yıkanabilir", "Yaygın birikimde profesyonel kimyasal temizlik (powerflush) gerekir; tüm tesisat devridaim ettirilerek yıkanır"]} />
        <Warning title="Alttan soğuk peteğe tekrar tekrar purj yapmayın">Belirti alttan soğukluksa sorun hava değil çamurdur; purj geçici rahatlama bile sağlamaz. Çamur kimyasal temizlik veya petek sökümü ister.</Warning>
      </Section>

      <Section n="05" label="Senaryo 3" title={<>Ortadan Sıcak, Uçlar Soğuk: <Hot>Düşük Debi</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={debi} alt="Kombi tesisatındaki sirkülasyon pompasının kademe seçicisi ayarlanıyor" caption="Pompa kademesi düşükse su peteğin ortasından hızlı geçip uçlara yayılamaz." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Sirkülasyon pompasının kademesi düşükse veya kanatları çamurdan yorulmuşsa su peteğin ortasından hızlı geçip uçlara yayılamaz. Sorun petekte değil, sistemin debisindedir.</p></div></div>
        <CheckList items={["Pompa kademe seçicisini kontrol edin; çok katlı veya uzun hatlı sistemlerde yüksek kademe gerekir", "Kombi manometresi 1 barın altındaysa sisteme su tamamlayın", "Pompa çalışma sesi değiştiyse veya petek giriş borusu sıcak ama petek ılıksa pompa kontrolü gerekir"]} />
      </Section>

      <Section n="06" label="Uyarı" title={<>Sık Yapılan <Hot>Hatalar</Hot></>}>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">{["Alttan soğuk peteğe tekrar tekrar purj yapmak: hava değil çamur sorunudur, purj çözmez", "Purj sonrası basıncı tamamlamayı unutmak: kombi düşük basınç arızasına geçer", "Tek peteği tamamen kapatıp tasarruf beklemek: sistem debisi bozulur, diğer petekler etkilenir", "Çamurlu sisteme kimyasal döküp kendi haline bırakmak: tortu gevşer ama tahliye edilmezse eşanjörü tıkar", "Peteğin önünü koltuk veya perdeyle kapatmak: ısı odaya yayılamaz, petek arızalı sanılır", "Her sezon tesisat suyunu tamamen boşaltmak: taze su yeni oksijen demektir, korozyonu hızlandırır"].map(t => <li key={t} className="flex items-start gap-2.5 rounded-lg border border-brand-red/40 bg-brand-red/5 p-3 text-[13px] leading-snug"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /><span>{t}</span></li>)}</ul>
      </Section>

      <Section n="07" label="Temizlik" title={<>Sistem Yıkama <Hot>Yöntemleri</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Yöntem seçimi birikimin yaygınlığına bağlıdır. Tek petekteki lokal tortu ile tüm tesisata yayılmış çamur aynı müdahaleyi gerektirmez.</p></div><Photo src={yikama} alt="Profesyonel tesisatçı powerflush kimyasal temizlik makinesini kombi tesisatına bağlıyor" caption="Powerflush, tüm tesisatı devridaim ettirerek yıkar; yaygın çamurda tek kalıcı çözümdür." /></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[560px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Yöntem</th><th className="px-4 py-3">Ne zaman yeterli</th><th className="px-4 py-3">Sınırlaması</th></tr></thead><tbody className="divide-y divide-border">{[["Purj (hava alma)", "Hava kilidi", "Çamura etkisi yok"], ["Tek petek söküp yıkama", "Tek petekte lokal tortu", "Tesisatın geri kalanı temizlenmez"], ["Kimyasal temizlik (powerflush)", "Yaygın çamur birikimi", "Profesyonel ekipman ister"], ["Powerflush + manyetik filtre", "Kalıcı koruma", "İlk kurulum maliyeti"]].map(r => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={cn("px-4 py-3", i === 0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <CTA />
      </Section>

      <Section n="08" label="Koruma" title={<>Manyetik Filtre ve <Hot>Önleyici Bakım</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={filtre} alt="Kombi dönüş hattındaki manyetik filtre açılıyor; mıknatısta birikmiş siyah demir tozu" caption="Manyetik filtre, demir tozunu eşanjöre ulaşmadan tutar; altı ayda bir temizlenir." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Kombi dönüş hattına monte edilen manyetik filtre, suyla taşınan demir tozunu eşanjöre ulaşmadan tutar. Kimyasal temizlik sonrası takılırsa temizliğin ömrü uzar.</p></div></div>
        <CheckList columns={2} items={["Sezon başı (Eylül-Ekim): tüm peteklerin havasını alın, basıncı 1,5 bara ayarlayın", "Kış ortası: her peteğin alt-üst sıcaklık farkını elle kontrol edin", "Yılda bir: kombi bakımı sırasında tesisat suyunun rengini kontrol ettirin", "Birkaç yılda bir: sistemin durumuna göre kimyasal temizlik ve inhibitor yenilemesi yaptırın", "Manyetik filtre varsa: altı ayda bir açıp biriken demir tozunu temizleyin", "Kullanılmayan oda peteğini asla tam kapatmayın; 1 kademede (donma koruması) bırakın"]} />
      </Section>

      <Section n="09" label="Sonuç" title={<>Sonuç: <Hot>Belirtiye Göre Doğru Çözüm</Hot></>}>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{[[Thermometer, "Alttan sıcak, üstten soğuk", "Hava kilidi: birkaç dakikalık purj işlemiyle çözülür. Purj sonrası basıncı 1,5 bara tamamlamayı unutmayın."], [Droplets, "Üstten sıcak, alttan soğuk", "Çamur birikimi: purj çözmez. Hafifse petek sökülüp yıkanır, yaygınsa profesyonel kimyasal temizlik gerekir."], [Magnet, "Kalıcı koruma", "Manyetik filtre + yıllık kombi bakımı + doğru sıcaklık ayarı kombinasyonu radyatörlerin ömrünü uzatır."], [ShieldAlert, "Tekrarlayan sorun", "Temizliğe rağmen aynı petek soğuk kalıyorsa hat tıkanıklığı veya dengeleme sorunu olabilir; profesyonel teşhis gerekir."]].map(([I, t, b]) => { const Icon = I as typeof Gauge; return <Card key={t as string} className="p-4"><Icon className="h-5 w-5 text-brand-red" /><h3 className="mt-2 font-extrabold">{t as string}</h3><p className="mt-1 text-[13px] text-muted-foreground">{b as string}</p></Card> })}</div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="10" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f => <details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90" /></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{ slug: "petek-isinmiyor-hava-alma" }} className="font-bold text-brand-red underline">Petek havası nasıl alınır</Link><Link to="/blog/$slug" params={{ slug: "kombi-basinci-dusuyor" }} className="font-bold text-brand-red underline">Kombi basıncı düşüyor</Link><Link to="/hizmet/$slug" params={{ slug: "petek-temizligi" }} className="font-bold text-brand-red underline">Petek temizliği hizmeti</Link></div></Section>}
    </main>
  </div>;
}
