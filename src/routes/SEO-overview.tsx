import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Phone,
  ArrowRight,
  Search,
  MapPin,
  Wrench,
  BookOpen,
  Link2,
  CheckCircle2,
  TrendingUp,
  Globe,
  FileText,
  ShieldCheck,
  Map as MapIcon,
  Layers,
  Target,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { ALL_KEYWORDS, type KeywordCluster } from "@/data/seo-keywords";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES } from "@/data/services";
import { DISTRICTS } from "@/data/districts";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";

// Türkçe küme (cluster) etiketleri — müşteriye anlaşılır başlıklar.
const CLUSTER_LABELS: Record<KeywordCluster, string> = {
  "su-kacagi": "Su Kaçağı Tespiti",
  tikaniklik: "Tıkanıklık Açma",
  kombi: "Kombi & Isıtma",
  petek: "Petek & Kalorifer",
  dogalgaz: "Doğalgaz Tesisatı",
  kanal: "Kanal Görüntüleme",
  tesisatci: "Tesisatçı (Genel)",
  acil: "Acil Servis",
  "banyo-vitrifiye": "Banyo & Vitrifiye",
  "musluk-batarya": "Musluk & Batarya",
  hidrofor: "Hidrofor",
};

function nf(n: number): string {
  return n.toLocaleString("tr-TR");
}

export const Route = createFileRoute("/SEO-overview")({
  head: () => {
    const title = "SEO Çalışması Genel Bakış | Gölge Tesisat";
    const desc =
      "Web sitesi için yapılan tüm SEO çalışmalarının sade ve anlaşılır özeti: kapsanan anahtar kelimeler, bölgeler, blog rehberleri ve teknik SEO işlemleri.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        // Bu sayfa müşteri raporu — arama motorlarında indekslenmesin.
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: SeoOverviewPage,
});

function SeoOverviewPage() {
  const stats = useMemo(() => {
    const totalKeywords = ALL_KEYWORDS.length;
    const totalVolume = ALL_KEYWORDS.reduce((a, k) => a + (k.volume || 0), 0);

    // Küme bazında özet
    const clusterMap = new Map<KeywordCluster, { count: number; volume: number }>();
    for (const k of ALL_KEYWORDS) {
      const c = clusterMap.get(k.cluster) ?? { count: 0, volume: 0 };
      c.count += 1;
      c.volume += k.volume || 0;
      clusterMap.set(k.cluster, c);
    }
    const clusters = [...clusterMap.entries()]
      .map(([cluster, v]) => ({ cluster, ...v }))
      .sort((a, b) => b.volume - a.volume);

    // Niyet (intent) dağılımı
    const intentMap = new Map<string, number>();
    for (const k of ALL_KEYWORDS) intentMap.set(k.intent, (intentMap.get(k.intent) ?? 0) + 1);

    // Blog kategorileri
    const catMap = new Map<string, typeof BLOG_POSTS>();
    for (const p of BLOG_POSTS) {
      const arr = catMap.get(p.category) ?? [];
      arr.push(p);
      catMap.set(p.category, arr);
    }
    const categories = [...catMap.entries()]
      .map(([category, posts]) => ({
        category,
        posts: [...posts].sort((a, b) => (b.volume || 0) - (a.volume || 0)),
      }))
      .sort((a, b) => b.posts.length - a.posts.length);

    const sides = {
      anadolu: DISTRICTS.filter((d) => d.side === "Anadolu Yakası"),
      avrupa: DISTRICTS.filter((d) => d.side === "Avrupa Yakası"),
    };
    const neighborhoods = DISTRICTS.reduce((a, d) => a + d.neighborhoods.length, 0);

    return {
      totalKeywords,
      totalVolume,
      clusters,
      intentMap,
      categories,
      sides,
      neighborhoods,
      postCount: BLOG_POSTS.length,
      serviceCount: SERVICES.length,
      districtCount: DISTRICTS.length,
    };
  }, []);

  const heroStats = [
    { icon: Search, value: nf(stats.totalKeywords), label: "Hedeflenen Anahtar Kelime" },
    { icon: TrendingUp, value: nf(stats.totalVolume), label: "Aylık Toplam Arama Hacmi" },
    { icon: BookOpen, value: nf(stats.postCount), label: "SEO Blog Rehberi" },
    { icon: Wrench, value: nf(stats.serviceCount), label: "Hizmet Sayfası" },
    { icon: MapPin, value: nf(stats.districtCount), label: "İstanbul İlçesi" },
    { icon: MapIcon, value: nf(stats.neighborhoods), label: "Kapsanan Mahalle" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Üst bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-sm font-semibold text-foreground">
            Gölge Tesisat
          </Link>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        {/* HERO */}
        <section className="py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-xs font-medium text-brand-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> Müşteri Raporu — SEO Çalışması
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            Web Sitenizde Yapılan Tüm SEO Çalışmaları
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            Bu sayfa, sitenizde Google'da daha üst sıralarda çıkmak için bugüne kadar yapılan{" "}
            <strong className="text-foreground">her bir çalışmanın sade bir özetidir</strong>. SEO
            terimlerini bilmenize gerek yok — her bölümde ne yaptığımızı, neden yaptığımızı ve
            hangi sonucu hedeflediğimizi günlük dille açıkladık. Aşağıdaki başlıkların
            çoğundaki bağlantılara tıklayarak ilgili sayfayı kendi gözünüzle görebilirsiniz.
          </p>

          {/* Hızlı istatistikler */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/60 bg-card p-4 text-card-foreground"
              >
                <s.icon className="h-5 w-5 text-brand-gold" />
                <div className="mt-2 text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SEO NEDİR */}
        <Section icon={Globe} title="SEO nedir? (1 dakikada özet)">
          <p>
            <strong className="text-foreground">SEO (Arama Motoru Optimizasyonu)</strong>, bir
            müşteri Google'a örneğin <em>"kadıköy su kaçağı tespiti"</em> yazdığında sitenizin en
            üstlerde çıkmasını sağlama işidir. Reklam vermeden, doğal (organik) sonuçlarda görünmek
            ücretsiz ve kalıcı müşteri demektir.
          </p>
          <p>
            Google sıralamayı yaparken üç şeye bakar:{" "}
            <strong className="text-foreground">(1)</strong> sitede o konuyla ilgili kaliteli içerik
            var mı, <strong className="text-foreground">(2)</strong> site teknik olarak düzgün ve
            hızlı mı, <strong className="text-foreground">(3)</strong> insanlar bu sitede güveniyor
            mu. Bizim yaptığımız tüm çalışmalar bu üç maddeyi güçlendirmeye yöneliktir. Aşağıda
            hepsini tek tek görebilirsiniz.
          </p>
        </Section>

        {/* YAPILAN İŞLER — TEKNİK SEO CHECKLIST */}
        <Section icon={CheckCircle2} title="Yapılan SEO Çalışmaları (Kontrol Listesi)">
          <p className="mb-5">
            Aşağıdaki her madde, sitenizde <strong className="text-foreground">tamamlanmış</strong>{" "}
            bir SEO işidir. Yanındaki yeşil işaret "yapıldı" demektir.
          </p>
          <div className="space-y-3">
            {CHECKLIST.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/60 bg-card p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ANAHTAR KELİME KAPSAMI */}
        <Section icon={Target} title="Hangi Anahtar Kelimeleri Kapsadık?">
          <p className="mb-2">
            <strong className="text-foreground">Anahtar kelime</strong>, müşterilerin Google'a yazdığı
            arama cümlesidir. Toplam{" "}
            <strong className="text-foreground">{nf(stats.totalKeywords)} farklı arama terimini</strong>{" "}
            hedefledik. Bu terimlerin Google'da birlikte aylık{" "}
            <strong className="text-foreground">~{nf(stats.totalVolume)} kez</strong> arandığı tahmin
            ediliyor (kaynak: Semrush). Konularına göre gruplandırılmış hâli:
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="px-4 py-3 font-semibold">Konu Grubu</th>
                  <th className="px-4 py-3 text-right font-semibold">Kelime Sayısı</th>
                  <th className="px-4 py-3 text-right font-semibold">Aylık Arama</th>
                </tr>
              </thead>
              <tbody>
                {stats.clusters.map((c, i) => (
                  <tr
                    key={c.cluster}
                    className={i % 2 ? "bg-card" : "bg-card/40"}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {CLUSTER_LABELS[c.cluster] ?? c.cluster}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {nf(c.count)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {nf(c.volume)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-secondary/60 font-semibold text-foreground">
                  <td className="px-4 py-3">Toplam</td>
                  <td className="px-4 py-3 text-right tabular-nums">{nf(stats.totalKeywords)}</td>
                  <td className="px-4 py-3 text-right tabular-nums">{nf(stats.totalVolume)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Not: Aramaların türü de dengelendi — bilgi amaçlı (rehber okuyan), ticari (hizmet arayan)
            ve yerel (bölge arayan) terimler birlikte hedeflendi.
          </p>
        </Section>

        {/* BÖLGE KAPSAMI */}
        <Section icon={MapPin} title={`Kaç Bölgeyi Kapsadık? (${stats.districtCount} İlçe)`}>
          <p className="mb-4">
            Yerel müşteri çekmek için İstanbul'un{" "}
            <strong className="text-foreground">{nf(stats.districtCount)} ilçesi</strong> ve bu
            ilçelere bağlı <strong className="text-foreground">{nf(stats.neighborhoods)} mahalle</strong>{" "}
            için ayrı sayfalar hazırladık. Her ilçe sayfasına tıklayıp görebilirsiniz:
          </p>

          <h3 className="mb-2 mt-4 text-sm font-semibold text-brand-gold">Anadolu Yakası</h3>
          <div className="flex flex-wrap gap-2">
            {stats.sides.anadolu.map((d) => (
              <Link
                key={d.slug}
                to="/tesisatci/$slug"
                params={{ slug: d.slug }}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {d.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>

          <h3 className="mb-2 mt-5 text-sm font-semibold text-brand-gold">Avrupa Yakası</h3>
          <div className="flex flex-wrap gap-2">
            {stats.sides.avrupa.map((d) => (
              <Link
                key={d.slug}
                to="/tesisatci/$slug"
                params={{ slug: d.slug }}
                className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {d.name} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </Section>

        {/* HİZMET SAYFALARI */}
        <Section icon={Wrench} title={`Hizmet Sayfaları (${stats.serviceCount} Adet)`}>
          <p className="mb-4">
            Her ana hizmet için, o hizmeti Google'da arayan müşteriye özel optimize edilmiş bir sayfa
            ("hub sayfası") oluşturduk. Bağlantıya tıklayarak inceleyebilirsiniz:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/hizmet/$slug"
                params={{ slug: s.slug }}
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card p-4 transition-colors hover:border-primary"
              >
                <div>
                  <div className="font-semibold text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.tagline}</div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            ))}
          </div>
        </Section>

        {/* BLOG KÜTÜPHANESİ */}
        <Section icon={BookOpen} title={`Blog Rehber Kütüphanesi (${stats.postCount} Yazı)`}>
          <p className="mb-5">
            SEO'nun en büyük gücü içeriktir. Müşterilerin Google'da sorduğu sorulara cevap veren{" "}
            <strong className="text-foreground">{nf(stats.postCount)} ayrıntılı rehber</strong> yazdık.
            Her yazı; bir hedef anahtar kelime, görseller, tablo/grafik ve sıkça sorulan sorularla
            hazırlandı. Aşağıda konuya göre gruplanmış tüm yazılar ve hedefledikleri arama terimi
            yer alıyor. Başlığa tıklayarak yazıyı açabilirsiniz.
          </p>
          <div className="space-y-6">
            {stats.categories.map((cat) => (
              <div key={cat.category}>
                <div className="mb-2 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-brand-gold" />
                  <h3 className="text-sm font-semibold text-foreground">
                    {cat.category}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({cat.posts.length} yazı)
                    </span>
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {cat.posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="group flex items-start justify-between gap-3 rounded-lg border border-border/50 bg-card px-3 py-2 transition-colors hover:border-primary"
                      >
                        <span className="text-sm text-foreground group-hover:text-primary">
                          {p.title}
                          {p.keyword ? (
                            <span className="ml-2 text-xs text-muted-foreground">
                              · hedef: "{p.keyword}"
                            </span>
                          ) : null}
                        </span>
                        <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* İÇ LİNKLEME */}
        <Section icon={Link2} title="İç Linkleme (Sayfaları Birbirine Bağlama)">
          <p>
            <strong className="text-foreground">İç linkleme</strong>, sitenizdeki sayfaların birbirine
            bağlantı vermesidir. Bu hem ziyaretçinin ilgili konuya kolayca geçmesini, hem de
            Google'ın tüm sayfalarınızı keşfedip "bu site bu konuda otorite" demesini sağlar.
          </p>
          <p>
            Sitenizde her blog yazısı; ilgili hizmet sayfasına, kardeş rehberlere ve bölge
            sayfalarına otomatik olarak bağlanır. Sistem düzenli olarak denetlenir;{" "}
            <strong className="text-foreground">tek bir "yetim" (bağlantısız) sayfa kalmaz</strong> ve
            her yazı ortalama 10'dan fazla iç bağlantı alır. Bu, sıralama için en güçlü
            avantajlardan biridir.
          </p>
        </Section>

        {/* SÖZLÜK */}
        <Section icon={FileText} title="SEO Terimleri Sözlüğü (Sade Açıklama)">
          <p className="mb-5">
            Raporda geçen teknik kelimelerin ne anlama geldiğini merak ederseniz, hepsini günlük
            dille buraya yazdık:
          </p>
          <div className="space-y-3">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="rounded-xl border border-border/60 bg-card p-4">
                <h3 className="font-semibold text-brand-gold">{g.term}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* KAPANIŞ CTA */}
        <section className="mt-12 rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center">
          <h2 className="text-xl font-bold text-foreground">
            SEO, sürekli devam eden bir çalışmadır
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Yukarıdaki temel sağlamlaştırıldı; bundan sonra düzenli olarak yeni rehberler eklenir,
            sıralamalar takip edilir ve rakipler izlenir. Sorularınız için bizi arayabilirsiniz.
          </p>
          <a
            href={PHONE_HREF}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </section>
      </main>

      <SiteFooter />
      <StickyCallBar />
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/60 py-9">
      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground sm:text-2xl">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground [&_p]:text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

// ─── İçerik verileri ────────────────────────────────────────────────────────

const CHECKLIST: { title: string; desc: string }[] = [
  {
    title: "Anahtar kelime araştırması ve strateji",
    desc: "Müşterilerin gerçekten ne aradığını Semrush verisiyle araştırdık. Arama hacmi ve rekabet zorluğuna göre, en kolay kazanılacak terimlerden başlayan bir hedef listesi (ledger) oluşturduk. Tüm başlıklar ve metinler bu listeye göre yazılıyor.",
  },
  {
    title: "Sayfa başlıkları (Title) ve açıklamalar (Meta Description)",
    desc: "Her sayfanın Google sonuçlarında görünen mavi başlığı ve altındaki açıklama metni, hem anahtar kelimeyi içerecek hem de tıklanmayı artıracak şekilde tek tek yazıldı. Başlıklar 60, açıklamalar 160 karakter sınırına göre optimize edildi.",
  },
  {
    title: "Tek H1 ve düzenli başlık hiyerarşisi",
    desc: "Her sayfada Google'ın 'bu sayfa ne hakkında' sorusuna net cevap veren tek bir ana başlık (H1) ve mantıklı alt başlıklar kullanıldı. Bu, hem okunabilirliği hem sıralamayı artırır.",
  },
  {
    title: "Yerel SEO — ilçe ve mahalle sayfaları",
    desc: "İstanbul'un 27 ilçesi ve bağlı mahalleler için ayrı, özgün içerikli sayfalar oluşturuldu. 'Kadıköy tesisatçı' gibi bölgesel aramalarda öne çıkmak için en kritik çalışma budur.",
  },
  {
    title: "Hizmet hub sayfaları",
    desc: "Su kaçağı, tıkanıklık, kombi gibi her ana hizmet için; ne yapıldığını, süreci ve fiyat mantığını anlatan derin ve ikna edici sayfalar hazırlandı.",
  },
  {
    title: "Kapsamlı blog içerik kütüphanesi",
    desc: "Müşterilerin sorduğu yüzlerce soruya cevap veren, görsel + tablo + grafik içeren rehberler yazıldı. Bu içerikler siteye 'konu otoritesi' kazandırır ve sürekli yeni ziyaretçi getirir.",
  },
  {
    title: "İç linkleme sistemi",
    desc: "Tüm sayfalar birbirine akıllıca bağlandı; yetim (bağlantısız) sayfa bırakılmadı. Düzenli denetimle her yazının yeterli iç bağlantı aldığı kontrol ediliyor.",
  },
  {
    title: "Yapısal veri (Schema / JSON-LD)",
    desc: "Google'a 'bu bir yerel işletme, bu bir makale, bu sıkça sorulan sorular' diye makine diliyle anlatan etiketler eklendi. Bu, arama sonuçlarında zengin görünüm (yıldız, SSS açılır kutu) şansı verir.",
  },
  {
    title: "Sitemap (site haritası) ve robots.txt",
    desc: "Google'ın tüm sayfalarınızı eksiksiz bulup taraması için otomatik güncellenen bir site haritası ve tarama kurallarını belirleyen robots.txt dosyası kuruldu.",
  },
  {
    title: "Canonical etiketleri",
    desc: "Aynı içeriğin tekrarı sayılmamak için her sayfanın 'asıl adresi' Google'a bildirildi. Bu, sıralama gücünün bölünmesini engeller.",
  },
  {
    title: "Sosyal paylaşım kartları (Open Graph)",
    desc: "Site linki WhatsApp, Facebook veya X'te paylaşıldığında düzgün başlık, açıklama ve görselle çıkması için Open Graph etiketleri eklendi.",
  },
  {
    title: "Mobil uyum ve hız",
    desc: "Aramaların büyük kısmı telefondan yapıldığı için site mobilde hızlı ve sorunsuz çalışacak şekilde tasarlandı; görseller geç yükleme (lazy loading) ile optimize edildi.",
  },
  {
    title: "Türkçe ve İstanbul odaklı strateji",
    desc: "Tüm çalışma %100 Türkçe arama ve İstanbul pazarına odaklandı. Hedef kitlede karşılığı olmayan içeriklere kaynak harcanmadı.",
  },
  {
    title: "Performans takibi (Search Console)",
    desc: "Sitenin Google'daki tıklanma, gösterim ve sıralama verileri yönetim panelinden izleniyor; hangi terimde yükseliş/düşüş olduğu takip ediliyor.",
  },
];

const GLOSSARY: { term: string; desc: string }[] = [
  {
    term: "Anahtar Kelime (Keyword)",
    desc: "Müşterilerin Google arama kutusuna yazdığı kelime veya cümle. Örn: 'üsküdar kombi servisi'. Hedeflediğimiz her kelime, sitenize potansiyel bir müşteri kapısıdır.",
  },
  {
    term: "Arama Hacmi (Search Volume)",
    desc: "Bir kelimenin Google'da ayda kaç kez arandığının tahmini. Hacim ne kadar yüksekse, o kelimede üst sırada çıkmak o kadar çok ziyaretçi demektir.",
  },
  {
    term: "Zorluk Skoru (KDI / Keyword Difficulty)",
    desc: "Bir kelimede ilk sayfaya çıkmanın ne kadar zor olduğunu 0–100 arası gösterir. Düşük skorlu (kolay) kelimelerden başlayıp hızlı kazanımlar elde etmeyi hedefliyoruz.",
  },
  {
    term: "Organik Trafik",
    desc: "Reklam vermeden, doğal arama sonuçlarından sitenize gelen ücretsiz ziyaretçiler. SEO'nun asıl amacı bu trafiği büyütmektir.",
  },
  {
    term: "SERP (Arama Sonuç Sayfası)",
    desc: "Google'da arama yaptığınızda çıkan sonuç listesi. Hedefimiz bu listenin ilk sayfasında, mümkünse ilk 3 sırada yer almak.",
  },
  {
    term: "Meta Başlık (Title) & Meta Açıklama",
    desc: "Google sonuçlarında görünen mavi tıklanabilir başlık ve altındaki gri açıklama metni. İyi yazılmış olması hem sıralamayı hem tıklanma oranını artırır.",
  },
  {
    term: "Yapısal Veri (Schema / JSON-LD)",
    desc: "Sayfanın içeriğini Google'a makine diliyle açıklayan görünmez etiketler. İşletme bilgisi, makale, SSS gibi içerikleri tanımlar; zengin sonuç görünümü sağlar.",
  },
  {
    term: "Sitemap (Site Haritası)",
    desc: "Sitenizdeki tüm sayfaların listelendiği bir dosya. Google'ın hiçbir sayfayı atlamadan bulmasını sağlar.",
  },
  {
    term: "robots.txt",
    desc: "Arama motorlarına hangi sayfaları tarayıp hangilerini taramayacağını söyleyen küçük bir kural dosyası.",
  },
  {
    term: "Canonical (Asıl Adres) Etiketi",
    desc: "Benzer içerikli sayfalar olduğunda Google'a 'gerçek/öncelikli adres budur' diyen etiket. Tekrar içerik cezasını ve güç bölünmesini önler.",
  },
  {
    term: "İç Linkleme",
    desc: "Kendi sayfalarınızın birbirine verdiği bağlantılar. Ziyaretçiyi yönlendirir ve Google'ın site yapısını anlamasına yardımcı olur.",
  },
  {
    term: "Backlink (Dış Bağlantı)",
    desc: "Başka sitelerin sizin sitenize verdiği bağlantı. Google için bir 'oy/güven' işaretidir; otoriteyi artırır.",
  },
  {
    term: "Hub & Cluster (Çatı ve Küme)",
    desc: "Bir ana hizmet sayfası (çatı) etrafında, o konuyla ilgili çok sayıda blog yazısının (küme) toplanması. Google'a o konuda uzman olduğunuzu gösteren güçlü bir yapı.",
  },
  {
    term: "Yerel SEO (Local SEO)",
    desc: "Belirli bir şehir/ilçe için aramalarda öne çıkma çalışması. Tesisat gibi bölgesel hizmetlerde en değerli SEO türüdür.",
  },
  {
    term: "Open Graph",
    desc: "Site linkiniz sosyal medyada paylaşıldığında çıkan başlık, açıklama ve görseli belirleyen etiketler. Paylaşımların profesyonel görünmesini sağlar.",
  },
  {
    term: "CTR (Tıklanma Oranı)",
    desc: "Sayfanız Google'da gösterildiğinde kaç kişinin tıkladığının oranı. Yüksek CTR, hem trafik hem de dolaylı olarak sıralama için iyidir.",
  },
];
