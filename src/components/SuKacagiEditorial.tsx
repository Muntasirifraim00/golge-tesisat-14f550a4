import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  AlertTriangle, CheckCircle2, ChevronRight, Clock, Home, Menu,
  MessageCircle, Phone, Wrench, Gauge, ShieldAlert, ThumbsUp,
  Camera, FileText, XCircle,
} from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import hero from "@/assets/su-kacagi/su-kacagi-kapak.jpg";
import belirtiler from "@/assets/su-kacagi/su-kacagi-belirtiler.jpg";
import yontemler from "@/assets/su-kacagi/su-kacagi-yontemler.jpg";
import surec from "@/assets/su-kacagi/surec.jpg";
import katmanlar from "@/assets/su-kacagi/su-kacagi-katmanlar.jpg";
import onTestler from "@/assets/su-kacagi/su-kacagi-on-testler.jpg";
import tamir from "@/assets/su-kacagi/su-kacagi-tamir.jpg";
import tesisatci from "@/assets/su-kacagi/su-kacagi-tesisatci.jpg";
import ctaFinal from "@/assets/su-kacagi/su-kacagi-tesisatci-cagir.jpg";

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
  return <div className={cn("tm-cta mt-6 overflow-hidden rounded-lg border border-brand-red/50", final && "sm:grid sm:grid-cols-[1fr_.9fr]")}><div className="p-5 sm:p-6"><div className="text-[10px] font-black uppercase tracking-[0.2em]">Sayaç kapalıyken dönüyor mu?</div><h3 className="mt-2 text-[24px] font-black leading-tight">Kaçağı kırmadan, <span className="text-brand-red">noktasal buluyoruz.</span></h3><p className="mt-2 text-[13px] leading-relaxed text-foreground/75">Termal kamera, akustik dinleme ve gaz izleme ile tespit; fotoğraflı rapor. İstanbul genelinde 7/24.</p><div className="mt-4 grid grid-cols-2 gap-2"><a href={PHONE} className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-red px-3 text-[12px] font-black text-brand-red-foreground"><Phone className="h-4 w-4" /> HEMEN ARA</a><a href={WA} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-md bg-success px-3 text-[12px] font-black text-success-foreground"><MessageCircle className="h-4 w-4" /> WHATSAPP</a></div></div>{final && <img src={ctaFinal} alt="Gece İstanbul'da apartman önünde kırmızı servis aracı; teknisyen termal kamera çantasıyla binaya giriyor" loading="lazy" width={1536} height={864} className="h-full min-h-56 w-full object-cover" />}</div>;
}

export function SuKacagiEditorial({ faq, updatedLabel, readMin }: { faq: Faq[]; updatedLabel: string; readMin: number }) {
  return <div className="tm-editorial min-h-screen">
    <header className="sticky top-0 z-40 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link to="/" className="flex min-w-0 items-center gap-2.5"><img src={logoImg} alt="Gölge Tesisat" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-foreground object-contain" /><span className="min-w-0 leading-tight"><b className="block truncate text-[14px]">GÖLGE TESİSAT</b><span className="block truncate text-[9.5px] text-muted-foreground">Güvenilir. Hızlı. Garantili.</span></span></Link>
      <div className="flex shrink-0 items-center gap-2"><span className="hidden rounded-full border border-border p-1 text-[10px] font-black min-[430px]:block"><b className="rounded-full bg-brand-red px-2.5 py-1 text-brand-red-foreground">TR</b><span className="px-2 text-muted-foreground">EN</span></span><a href={PHONE} className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-[12px] font-black text-brand-red"><Phone className="h-4 w-4" /> 7/24</a><span className="flex h-10 w-10 items-center justify-center rounded-full border border-border"><Menu className="h-5 w-5" /></span></div>
    </header>
    <main className="mx-auto max-w-[1120px] px-4 sm:px-6">
      <section className="py-6 sm:py-10">
        <nav className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><Link to="/" className="flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Ana Sayfa</Link><ChevronRight className="h-3.5 w-3.5" /><Link to="/blog">Blog</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-brand-red">Su Kaçağı</span></nav>
        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_.95fr] lg:items-center">
          <div><div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-red"><span className="h-px w-7 bg-brand-red" /> Cihazlı Tespit Rehberi</div><h1 className="mt-4 text-[38px] font-black leading-[1.02] sm:text-[58px]">Kırmadan Su Kaçağı <Hot>Tespiti Nasıl Yapılır?</Hot></h1><p className="mt-4 max-w-2xl text-[17px] leading-snug text-muted-foreground sm:text-[20px]">Sıva altı, şap altı ve fayans altı kaçak; termal kamera, akustik dinleme ve gaz izleme ile tek fayans bile sökülmeden bulunur.</p><div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-3 text-[11px]"><img src={logoImg} alt="Gölge Tesisat uzman tesisatçı ekibi logosu" width={48} height={48} loading="lazy" className="h-10 w-10 rounded-full bg-foreground object-contain" /><b>Gölge Tesisat Ekibi</b><span className="text-muted-foreground">Güncelleme: {updatedLabel}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-brand-red" /> {readMin} dk</span></div></div>
          <Photo src={hero} alt="Tesisatçı banyo duvarını termal kamerayla tarıyor; ekranda sıcak su hattının ısı haritası" priority />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{[[Gauge,"Zorluk","Yok · cihazlı tespit"],[Clock,"Süre","Ortalama birkaç saat"],[Wrench,"Gerekli","Termal + akustik + gaz"],[ShieldAlert,"Ana risk","Rastgele kırma"]].map(([I,l,v])=>{const Icon=I as typeof Gauge; return <Card key={l as string} className="p-3"><Icon className="h-5 w-5 text-brand-red" /><span className="mt-2 block text-[10px] uppercase text-muted-foreground">{l as string}</span><b className="text-[13px]">{v as string}</b></Card>})}</div>
      </section>

      <Section n="02" label="Temel Bilgi" title={<>Kırmadan Tespit <Hot>Gerçekten Mümkün mü?</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Evet. Kaçan su üç iz bırakır: <b className="text-foreground">ses</b> (basınçlı suyun delikten çıkarken oluşturduğu yüksek frekanslı hışırtı), <b className="text-foreground">ısı</b> (sıcak su hattında zemin sıcaklık farkı) ve <b className="text-foreground">gaz</b> (hatta basılan izleme gazının yüzeye çıkışı). Cihazlar bu izlerden birini okuyarak noktayı bulur. Yaygın yanlış anlama: kırmadan tespit, kırmadan tamir demek değildir. Tespit tahribatsızdır; tamir çoğu durumda küçük bir noktanın açılmasını gerektirir — ama rastgele aramada metrekarelerce alan kırılırken, doğru tespitte tek nokta açılır.</p>
        <Warning title="Kırmadan tespit yapmayan tesisatçının klasik cümlesi">"Buradan başlayalım, çıkmazsa yandan bakarız." Bu cümleyi duyduğunuz anda durun. Bu bir tespit değil, deneme-yanılma kazısıdır ve masrafı size çıkar. Cihazsız gelen ekibe zemin açtırmayın.</Warning>
      </Section>

      <Section n="03" label="Belirtiler" title={<>Gizli Kaçağın <Hot>Erken Belirtileri</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Sıva altı ve şap altı kaçaklar günlerce sessiz ilerler. Aşağıdaki işaretlerden en az ikisi dairenizde varsa, tespit çağırmak beklemekten çok daha ucuzdur.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[620px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Belirti</th><th className="px-4 py-3">Muhtemel kaynak</th><th className="px-4 py-3">Aciliyet</th></tr></thead><tbody className="divide-y divide-border">{[["Tüm musluklar kapalıyken sayaç dönüyor","Basınçlı temiz su hattı (kolon veya şap altı)","Çok yüksek"],["Duvar dibinde genişleyen nemli leke / kabaran boya","Duvar içi sıva altı hat veya komşu daire","Yüksek"],["Zeminde çıplak ayakla hissedilen sıcak nokta","Sıcak su veya yerden ısıtma hattı","Yüksek"],["Su basıncı sebepsiz düştü","Hat üzerinde sürekli kaçak","Orta"],["Rutubet / küf kokusu, siyah nokta oluşumu","Uzun süredir devam eden yavaş sızıntı","Orta"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <Photo src={belirtiler} alt="El feneriyle aydınlatılan duvar dibinde genişleyen nemli leke ve kabaran boya" caption="Bu belirtilerden ikisi bile varsa gizli kaçak ihtimali yüksektir." className="mt-5" />
      </Section>

      <Section n="04" label="Yöntemler" title={<>Hangi Kaçakta <Hot>Hangi Yöntem Çalışır?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Piyasada dört ana yöntem kullanılır. Hiçbiri her kaçakta çalışmaz — bir tesisatçı hangi yöntemi neden seçtiğini size açıklayamıyorsa, muhtemelen elindeki tek cihazı kullanıyordur. Sahada doğru yaklaşım kombinasyondur: önce basınç testiyle hangi hattın kaçırdığı doğrulanır, sonra termal kamerayla alan daraltılır, en son akustik dinleme veya gazla nokta işaretlenir.</p></div><Photo src={yontemler} alt="Tespit cihazları: termal kamera, geofon ve kulaklık, gaz dedektörü, manometre seti" caption="Her yöntemin en iyi çalıştığı kaçak tipi farklıdır." /></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[640px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Yöntem</th><th className="px-4 py-3">Nasıl çalışır</th><th className="px-4 py-3">En iyi olduğu durum</th></tr></thead><tbody className="divide-y divide-border">{[["Termal kamera","Yüzey sıcaklık farkını ısı haritasına çevirir","Sıcak su, yerden ısıtma, kalorifer hattı"],["Akustik dinleme (geofon)","Delikten çıkan suyun yüksek frekanslı sesini büyütür","Basınçlı temiz su hattı, kolon, şap altı"],["Azot-hidrojen gaz izleme","Hatta izleme gazı basılır, yüzeye çıkan gaz taranır","Soğuk su, çok küçük sızıntı, beton içi hat"],["Basınç (manometre) testi","Hat izole edilip basınç düşüşü ölçülür","Kaçağın varlığını ve hangi hatta olduğunu doğrulama"],["Endoskopik kamera","Boru içine mini kamera girilir","Gider/pis su hattı, kanal içi kırık"],["Nem ölçer (higrometre)","Yüzeydeki nem yüzdesini haritalar","Yayılım alanını daraltma (destek yöntemi)"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="05" label="Süreç" title={<>Profesyonel Tespit <Hot>Adım Adım Nasıl İlerler?</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={surec} alt="Tesisatçı kulaklık takmış, geofon sensörünü fayans zemine bastırarak kaçağı dinliyor" caption="Akustik dinlemede ses şiddetinin en yüksek olduğu nokta kaçağın merkezidir." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Bir keşif randevusunda işlerin hangi sırayla yapıldığını bilmek, kötü hizmeti anında fark etmenizi sağlar. Standart profesyonel akış şöyledir:</p></div></div>
        <Steps items={[
          { title: "Ana vana ve tüketim kesimi", body: "Tüm musluk ve cihazlar kapatılır. Sayaç hâlâ dönüyorsa kaçak temiz su tarafındadır; dönmüyorsa pis su hattı veya dış kaynak araştırılır." },
          { title: "Sayaç ve kolon izolasyonu", body: "Daire girişi vanası kapatılıp sayaç yeniden izlenir. Durursa kaçak daire içinde, dönmeye devam ederse kolon veya bina hattındadır." },
          { title: "Basınç (manometre) testi", body: "Hat izole edilir, basınç verilir ve izlenir. Basınç düşüyorsa kaçak o hattadır; sıcak-soğuk hatlar ayrı test edilerek alan yarıya iner." },
          { title: "Termal kamera taraması", body: "Sıcak su hattına kısa süre sıcak su verilir, zemin ve duvarlar taranır. Isı izi kaçağın yayılım alanını gösterir — nokta değil, bölge verir." },
          { title: "Akustik dinleme ile nokta daraltma", body: "Geofon zemine düzenli aralıklarla temas ettirilir. Ses şiddetinin en yüksek olduğu nokta kaçağın merkezidir; sessiz ortam şarttır." },
          { title: "Gerekirse gaz izleme", body: "Kaçak damla seviyesindeyse su tahliye edilip hatta izleme gazı basılır. Gaz betondan geçip yüzeye çıkar ve dedektörle noktasal yakalanır." },
          { title: "Noktasal işaretleme ve rapor", body: "Nokta zemine işaretlenir, fotoğraf ve termal görüntülerle rapor teslim edilir. Bu rapor sigorta ve site yönetimi başvurularında belge olarak kullanılır." },
        ]} />
        <Warning title="Rapor istemeyi asla atlamayın">Fotoğraflı ve termal görüntülü tespit raporu olmadan sigorta ve site yönetimi talepleri çoğunlukla reddedilir. Alt komşuya zarar verdiyseniz bu rapor, tazminatın kime ait olduğunu belirleyen objektif belgedir.</Warning>
        <CTA />
      </Section>

      <Section n="06" label="Katmanlar" title={<>Sıva Altı, Şap Altı, Fayans Altı: <Hot>Üçü Aynı Şey Değil</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><CheckList items={["Sıva altı (duvar içi): boru duvardaki kanala gömülüdür; akustik dinleme çok başarılı, tamir en kolayı", "Fayans altı: boru fayans ile şap arasındadır; nadirdir, tek fayans sökülerek çözülür", "Şap altı (zemin içi): boru beton şapın içindedir; en zorlusu, gaz izleme veya termal kamera gerekir"]} /></div><Photo src={katmanlar} alt="Banyo duvar ve zemin kesiti: sıva altı, fayans altı ve şap altı borular" caption="Her katmanın tespit zorluğu ve tamir yöntemi farklıdır." /></div>
        <Warning title="Leke = kaçak noktası değildir">Sahada en sık yapılan hata, nemli lekenin göründüğü yeri kırmaktır. Su boru üzerinden yatay ilerler ve en kolay çıkış noktasından yüzeye vurur; gerçek delik lekenin uzağında olabilir. Cihazsız kırma çoğu zaman yanlış yeri açar.</Warning>
      </Section>

      <Section n="07" label="Ön Test" title={<>Kendi Başınıza Yapabileceğiniz <Hot>Ücretsiz Ön Testler</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={onTestler} alt="Kişi su sayacının kadranını telefonuyla fotoğraflıyor — ücretsiz sayaç testi" caption="Sayaç testi hiçbir cihaz gerektirmez ve tesisatçıya net kanıt sağlar." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Bu testler ücretsizdir ve tesisatçıya net bilgiyle gitmenizi sağlar — bu da hem süreyi hem maliyeti düşürür.</p></div></div>
        <CheckList columns={2} items={["Sayaç testi: tüm tüketimi kapatın, kadranı fotoğraflayın, 2 saat sonra karşılaştırın", "Rezervuar boya testi: hazneye gıda boyası damlatın; 30 dk sonra klozette renk varsa iç takım kaçırıyor", "Kâğıt havlu testi: şüpheli duvar dibine kuru havlu yapıştırın; nemleniyorsa sızıntı aktif", "Vana izolasyon testi: daire giriş vanasını kapatın; sayaç durmuyorsa sorun kolonda/binada", "Fatura karşılaştırma: son faturaların m³ tüketimini karşılaştırın; belirgin artış gizli kaçak göstergesi", "Komşu kontrolü: üst katın banyo/mutfak konumu lekenizle örtüşüyorsa kaynak sizde olmayabilir"]} />
        <Warning title="Kesinlikle yapmayın">Nemli duvarda elektrik prizi veya anahtar varsa o hattın sigortasını kapatın ve dokunmayın. Lekeyi boyayla kapatmak kaçağı gizler ama küf ve donatı korozyonunu hızlandırır — sorun büyüyerek geri döner.</Warning>
      </Section>

      <Section n="08" label="Tamir" title={<>Kırmadan Tamir Mümkün mü? <Hot>Relining, By-Pass, Noktasal Onarım</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_1.05fr] sm:items-center"><div><p className="text-[14px] leading-relaxed text-muted-foreground">Tespit tahribatsız yapıldıktan sonra tamir için üç seçenek vardır; hangisinin uygun olduğu boru malzemesi, yaşı ve kaçağın konumuna bağlıdır. Karar kuralı: boru nispeten yeni ve PPRC/PEX ise noktasal onarım yeterlidir; yaşlı veya galvanizse by-pass ya da komple yenileme mantıklıdır.</p></div><Photo src={tamir} alt="Tesisatçı fayans zeminde açılan tek küçük noktada boru parçası değiştiriyor" caption="Doğru tespitte tamir alanı tek küçük noktaya iner." /></div>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[600px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Yöntem</th><th className="px-4 py-3">Ne yapılır</th><th className="px-4 py-3">Kırma gerekir mi?</th></tr></thead><tbody className="divide-y divide-border">{[["Noktasal onarım","Sadece kaçak noktası açılır, boru parçası değişir","Evet — tek küçük nokta"],["By-pass (hat iptali)","Eski gömülü hat iptal edilir, yeni hat farklı güzergâhtan çekilir","Hayır (bağlantı noktaları hariç)"],["Relining (iç kaplama)","Boru içine epoksi/reçine astar çekilir","Hayır"],["Komple tesisat yenileme","Daire içi tüm temiz su hattı yenilenir","Evet — kapsamlı"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
      </Section>

      <Section n="09" label="Seçim" title={<>Tesisatçı Seçerken <Hot>Sorulacak Sorular</Hot></>}>
        <div className="mt-5 grid gap-5 sm:grid-cols-[1.05fr_1fr] sm:items-center"><Photo src={tesisatci} alt="Ev sahibi telefonda tesisatçıyla konuşuyor; elinde soru listesi olan not defteri" caption="Telefonda soracağınız sorular sizi gereksiz kırım masrafından korur." /><div><p className="text-[14px] leading-relaxed text-muted-foreground">Kırmadan tespit pazarında cihazı olmadan iş alan ekipler var. Bu soruları telefonda sorun:</p></div></div>
        <CheckList columns={2} items={["Hangi cihazları getiriyorsunuz? Termal kamera, geofon ve gaz dedektörü var mı?", "Soğuk su hattı kaçağında hangi yöntemi kullanıyorsunuz? (Sadece 'termal kamera' cevabı kırmızı bayraktır)", "Fotoğraflı ve termal görüntülü rapor veriyor musunuz?", "Tespit ücreti tamirde düşülüyor mu?", "Kaçağı bulamazsanız ücret alıyor musunuz?", "Tamir sonrası yazılı garanti veriyor musunuz?", "Fatura kesiyor musunuz? (Sigorta başvurusu için zorunlu)", "Aynı gün mü geliyorsunuz, net saat verebilir misiniz?"]} />
      </Section>

      <Section n="10" label="Sorumluluk" title={<>Kaçak Kimin Sorumluluğu? <Hot>Daire, Kolon, Alt Komşu</Hot></>}>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">Apartmanlarda en çok tartışma yaratan konu masrafın kime ait olduğudur. Kural nettir: kaçağın konumu sorumluyu belirler.</p>
        <div className="mt-5 overflow-x-auto rounded-lg border border-border"><table className="w-full min-w-[640px] text-left text-[13px]"><thead className="bg-surface text-[11px] uppercase tracking-wide text-muted-foreground"><tr><th className="px-4 py-3">Kaçağın konumu</th><th className="px-4 py-3">Sorumlu</th><th className="px-4 py-3">Not</th></tr></thead><tbody className="divide-y divide-border">{[["Daire içi tesisat (sayaç sonrası)","Daire sahibi / kullanıcı","Kiracı-mülk sahibi ayrımı sözleşmeye bağlıdır"],["Kolon / ana dikey hat","Tüm kat malikleri (aidat)","Ortak yer sayılır; yönetim karar defterine işlenmeli"],["Çatı, teras, dış cephe","Tüm kat malikleri","İzolasyon yenileme genel gider sayılır"],["Alt komşuya verilen zarar","Kaçağın çıktığı dairenin sahibi","Tespit raporu ispat belgesidir"],["Sayaç öncesi bina hattı","Yönetim / İSKİ","İSKİ'ye (185) bildirim gerekir"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i} className={cn("px-4 py-3", i===0 && "font-bold")}>{c}</td>)}</tr>)}</tbody></table></div>
        <Warning title="Alt komşuya sızıntı varsa ilk 24 saat kritiktir">Ana vanayı kapatın, tespit raporu alın, alt komşunun hasarını fotoğraflayın ve konut sigortanıza aynı gün bildirim yapın. Gecikmeli bildirim red sebebidir.</Warning>
        <div className="mt-5 grid gap-4 sm:grid-cols-2"><div className="grid grid-cols-2 gap-2">{[[Camera,"Termal kamera"],[Gauge,"Akustik dinleme + gaz"],[FileText,"Fotoğraflı rapor"],[ThumbsUp,"Garantili işçilik"]].map(([I,t])=>{const Icon=I as typeof Gauge;return <Card key={t as string} className="p-3 text-center"><Icon className="mx-auto h-5 w-5 text-brand-red"/><b className="mt-2 block text-[12px]">{t as string}</b></Card>})}</div><div className="flex flex-col justify-center gap-2 text-[13px] text-muted-foreground"><p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> Tespit ücreti tamirde düşülür</p><p className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> Kaçak bulunamazsa ücret yok</p><p className="flex gap-2"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" /> Cihazsız "deneme kazısı" yok</p></div></div>
        <CTA final />
      </Section>

      {faq.length > 0 && <Section n="11" label="SSS" title={<>Sıkça Sorulan <Hot>Sorular</Hot></>}><div className="mt-5 grid gap-2">{faq.map(f=><details key={f.q} className="group rounded-lg border border-border bg-surface/70 p-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-extrabold">{f.q}<ChevronRight className="h-4 w-4 shrink-0 text-brand-red transition-transform group-open:rotate-90"/></summary><p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p></details>)}</div><div className="mt-6 flex flex-wrap gap-3 text-[13px]"><Link to="/blog/$slug" params={{slug:"su-sayaci-donuyor-gizli-kacak"}} className="font-bold text-brand-red underline">Su sayacı dönüyor: gizli kaçak</Link><Link to="/blog/$slug" params={{slug:"termal-kamera-ile-su-kacagi-tespiti"}} className="font-bold text-brand-red underline">Termal kamera ile tespit</Link><Link to="/hizmet/$slug" params={{slug:"su-kacagi-tespiti"}} className="font-bold text-brand-red underline">Su kaçağı tespiti hizmeti</Link></div></Section>}
    </main>
  </div>;
}
