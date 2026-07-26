import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Copy,
  Check,
  FileText,
  Sparkles,
  BookOpen,
  Zap,
  Info,
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  ListChecks,
  Wrench,
  Clock,
  Quote,
  Youtube,
  Images,
  ArrowLeftRight,
  Tag,
  MessageSquare,
  Phone,
  Link2,
  Star,
  Table as TableIcon,
  BarChart3,
  ImageIcon,
} from "lucide-react";
import promptRaw from "@/content/blog/_templates/_AI_PROMPT.md?raw";
import promptQuickRaw from "@/content/blog/_templates/_AI_PROMPT_QUICK.md?raw";
import templateFullRaw from "@/content/blog/_templates/_TEMPLATE_FULL.md?raw";
import templateMinimalRaw from "@/content/blog/_templates/_TEMPLATE_MINIMAL.md?raw";

export const Route = createFileRoute("/blog-yazma-rehberi")({
  head: () => ({
    meta: [
      { title: "Blog Yazma Rehberi — Gölge Tesisat" },
      { name: "description", content: "Blog post yazma sistemi: kullanılabilecek tüm block türleri, template dosyaları ve AI'a verilecek hazır prompt." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Blog Yazma Rehberi" },
      { property: "og:description", content: "Blog post yazma sistemi — tüm block türleri ve AI prompt'ları." },
    ],
  }),
  component: BlogWritingGuide,
});

type Block = {
  key: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  when: string;
  snippet: string;
};

const BLOCKS: Block[] = [
  {
    key: "paragraphs",
    name: "Paragraphs (zorunlu)",
    icon: FileText,
    desc: "Bölümün ana metni. Her section'da en az bir paragraf olmalı.",
    when: "Her section — ana anlatım.",
    snippet: `paragraphs:
  - "İlk paragraf metni."
  - "İkinci paragraf metni."`,
  },
  {
    key: "bullets",
    name: "Bullets",
    icon: ListChecks,
    desc: "Kart görünümlü madde listesi (2 sütunlu grid).",
    when: "Kısa özellik/kural listesi.",
    snippet: `bullets:
  - "Birinci madde"
  - "İkinci madde"
  - "Üçüncü madde"`,
  },
  {
    key: "image",
    name: "Inline Image",
    icon: ImageIcon,
    desc: "Bölüm içi görsel + caption.",
    when: "Diagram, örnek fotoğraf, ekran görüntüsü.",
    snippet: `image:
  src: "/blog-images/ornek.jpg"
  alt: "Keyword içeren açıklama"
  caption: "Kısa altyazı"`,
  },
  {
    key: "table",
    name: "Table",
    icon: TableIcon,
    desc: "Karşılaştırma / spec tablosu.",
    when: "Yöntem/ürün karşılaştırma, teknik değerler.",
    snippet: `table:
  caption: "İki yöntemin karşılaştırması"
  headers: ["Kriter", "A", "B"]
  rows:
    - ["Süre", "10 dk", "20 dk"]
    - ["Maliyet", "Düşük", "Orta"]`,
  },
  {
    key: "chart",
    name: "Chart (Bar)",
    icon: BarChart3,
    desc: "CSS ile çizilen basit yatay bar chart.",
    when: "Yüzde dağılımı, sıklık, maliyet aralığı.",
    snippet: `chart:
  title: "Arıza Nedenleri"
  unit: "%"
  bars:
    - { label: "Çamur", value: 45 }
    - { label: "Hava", value: 30 }
    - { label: "Diğer", value: 25 }`,
  },
  {
    key: "callout",
    name: "Callout",
    icon: Info,
    desc: "Renkli dikkat kutusu: info / tip / warning / danger / success.",
    when: "Uyarı, ipucu, güvenlik notu.",
    snippet: `callout:
  variant: "warning"
  title: "Dikkat"
  body: "Doğalgaz kaçağı şüphesinde vanayı kapatın."`,
  },
  {
    key: "keyTakeaways",
    name: "Key Takeaways",
    icon: Sparkles,
    desc: "Özet kutusu — bölümün ana çıkarımları.",
    when: "Uzun bölümlerin başında veya sonunda.",
    snippet: `keyTakeaways:
  title: "Özet"
  points:
    - "Malzemeleri önceden hazırlayın"
    - "Ana vanayı kapatın"`,
  },
  {
    key: "steps",
    name: "Steps (HowTo)",
    icon: Lightbulb,
    desc: "Numaralı adım adım rehber. HowTo schema'ya dönüşür.",
    when: '"Nasıl yapılır" tipi yazılar.',
    snippet: `steps:
  title: "5 Adımda"
  steps:
    - { title: "Suyu kapatın", body: "Ana vanayı çevirin." }
    - { title: "Parçayı sökün" }
    - { title: "Yeniyi takın" }`,
  },
  {
    key: "checklist",
    name: "Checklist",
    icon: Check,
    desc: "İşaretlenebilir görünümlü kontrol listesi.",
    when: '"Başlamadan önce" kontrolleri.',
    snippet: `checklist:
  title: "Başlamadan Önce"
  items:
    - "Vana kapalı mı?"
    - "Yedek conta var mı?"`,
  },
  {
    key: "prosCons",
    name: "Pros / Cons",
    icon: ArrowLeftRight,
    desc: "Yanyana artı-eksi listesi (yeşil/kırmızı).",
    when: "Bir yöntemin avantaj-dezavantajı.",
    snippet: `prosCons:
  title: "Kimyasal Açıcı"
  pros: ["Hızlı", "Ucuz"]
  cons: ["Boru aşındırır", "Cilde tehlikeli"]`,
  },
  {
    key: "materials",
    name: "Materials",
    icon: Wrench,
    desc: "Gerekli malzemeler kart listesi.",
    when: '"Ne lazım?" bölümü.',
    snippet: `materials:
  title: "Gerekli Malzemeler"
  items:
    - { name: "Boru anahtarı", note: "24 mm" }
    - { name: "Teflon bant" }`,
  },
  {
    key: "timeline",
    name: "Timeline",
    icon: Clock,
    desc: "Dikey zaman çizelgesi.",
    when: "Servis süreci, aşamalı iş akışı.",
    snippet: `timeline:
  items:
    - { time: "0. dk", title: "Çağrı" }
    - { time: "20. dk", title: "Ekip kapıda" }`,
  },
  {
    key: "quote",
    name: "Quote",
    icon: Quote,
    desc: "Alıntı / usta veya müşteri sesi.",
    when: "Uzman görüşü, saha alıntısı.",
    snippet: `quote:
  text: "Petek altı ısıtmazsa çamurdur."
  author: "Mehmet Usta"
  role: "15 yıl deneyim"`,
  },
  {
    key: "video",
    name: "Video (YouTube)",
    icon: Youtube,
    desc: "Lazy-loaded YouTube embed (thumbnail + play).",
    when: "Görsel açıklama gerektiğinde.",
    snippet: `video:
  youtubeId: "dQw4w9WgXcQ"
  title: "Kombi bakımı"
  caption: "3 dk özet"`,
  },
  {
    key: "gallery",
    name: "Gallery",
    icon: Images,
    desc: "2-6 resim yanyana grid.",
    when: "Farklı senaryolar / örnekler.",
    snippet: `gallery:
  images:
    - { src: "/blog-images/g1.jpg", alt: "..." }
    - { src: "/blog-images/g2.jpg", alt: "..." }`,
  },
  {
    key: "beforeAfter",
    name: "Before / After",
    icon: ArrowLeftRight,
    desc: "Öncesi-sonrası split görsel.",
    when: "Temizlik, tamir sonucu.",
    snippet: `beforeAfter:
  before: { src: "/blog-images/kirli.jpg", alt: "Kirli" }
  after:  { src: "/blog-images/temiz.jpg", alt: "Temiz" }
  caption: "Petek temizliği"`,
  },
  {
    key: "priceTable",
    name: "Price Table",
    icon: Tag,
    desc: "Servis fiyat aralıkları tablosu (kırmızı vurgulu).",
    when: "Fiyat bölümü.",
    snippet: `priceTable:
  rows:
    - { service: "Petek temizliği", price: "₺1.500 – ₺3.500" }
    - { service: "Kombi bakımı",  price: "₺900 – ₺1.800" }`,
  },
  {
    key: "accordion",
    name: "Accordion",
    icon: MessageSquare,
    desc: "Katlanan Q&A blokları (SSS dışında da kullanılır).",
    when: "İkincil SSS, detay açılımı.",
    snippet: `accordion:
  items:
    - { q: "Kaç yılda bir?", a: "3-5 yılda bir." }`,
  },
  {
    key: "cta",
    name: "CTA",
    icon: Phone,
    desc: "Ara / WhatsApp buton kartı.",
    when: "Dönüşüm noktalarında.",
    snippet: `cta:
  title: "Yardım mı gerekli?"
  body: "30 dk içinde kapınızdayız."
  phone: true
  whatsapp: true`,
  },
  {
    key: "sources",
    name: "Sources",
    icon: Link2,
    desc: "Dış referans linkleri (nofollow).",
    when: "Yasal / teknik kaynak gösterme.",
    snippet: `sources:
  title: "Kaynaklar"
  items:
    - { label: "EPDK", url: "https://www.epdk.gov.tr" }`,
  },
];

function CopyBtn({ text, label = "Kopyala" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-3 py-1.5 text-[12px] font-bold text-white transition hover:opacity-90"
    >
      {ok ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {ok ? "Kopyalandı!" : label}
    </button>
  );
}

function BlogWritingGuide() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red">
            <BookOpen className="h-4 w-4" /> Editör Rehberi
          </div>
          <h1 className="mt-2 text-[30px] font-extrabold leading-tight sm:text-[36px]">
            Blog Post Yazma Rehberi
          </h1>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
            Yeni blog post'ları <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12.5px]">src/content/blog/</code> klasörüne
            <code className="mx-1 rounded bg-surface px-1.5 py-0.5 font-mono text-[12.5px]">.md</code> dosyası olarak ekleyebilirsiniz.
            Aşağıda hazır AI prompt'ları, template dosyaları ve kullanabileceğiniz tüm block türleri var.
          </p>
          <div className="mt-4 flex gap-2">
            <Link to="/blog" className="rounded-lg border border-border bg-background px-3 py-2 text-[12.5px] font-semibold hover:bg-surface">← Blog'a dön</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-10 px-4 pt-10">
        {/* Workflow */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <Zap className="h-5 w-5 text-brand-red" /> 3 Adımda Nasıl Post Eklenir
          </h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { n: 1, t: "AI Prompt'u Kopyala", b: "Aşağıdan tam veya kısa prompt'u kopyalayın; ChatGPT/Claude/Gemini'ye yapıştırın, konunuzu ekleyin." },
              { n: 2, t: "AI '.md' Üretir", b: "AI kurallara uygun `.md` dosyasını üretir. YAML frontmatter + section'lar hazır gelir." },
              { n: 3, t: "Dosyayı Ekle", b: "`src/content/blog/<slug>.md` olarak kaydedin. Sayfada otomatik yayında olur." },
            ].map((s) => (
              <li key={s.n} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-[13px] font-black text-white">{s.n}</div>
                <div className="mt-2 text-[14px] font-extrabold">{s.t}</div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{s.b}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Prompts */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <Sparkles className="h-5 w-5 text-brand-red" /> AI Prompt'ları (Kopyala → Yapıştır)
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-brand-red/40 bg-brand-red/6 p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[14px] font-extrabold">Tam Prompt (önerilen)</div>
                  <div className="text-[11.5px] text-muted-foreground">Tüm kurallar + block şeması + kalite kontrol.</div>
                </div>
                <CopyBtn text={promptRaw} />
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-[11.5px] font-semibold text-brand-red">Önizleme</summary>
                <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-background p-3 font-mono text-[10.5px] leading-relaxed">{promptRaw}</pre>
              </details>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[14px] font-extrabold">Kısa Prompt</div>
                  <div className="text-[11.5px] text-muted-foreground">Hızlı üretim için sıkıştırılmış versiyon.</div>
                </div>
                <CopyBtn text={promptQuickRaw} />
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-[11.5px] font-semibold text-brand-red">Önizleme</summary>
                <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-background p-3 font-mono text-[10.5px] leading-relaxed">{promptQuickRaw}</pre>
              </details>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <FileText className="h-5 w-5 text-brand-red" /> Template Dosyaları
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Elle yazmak isterseniz bu template'leri kopyalayıp <code className="rounded bg-surface px-1 font-mono text-[12px]">src/content/blog/&lt;slug&gt;.md</code> olarak kaydedin.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-extrabold">Full Template</div>
                  <div className="text-[11.5px] text-muted-foreground">Her block türünün örneği (referans).</div>
                </div>
                <CopyBtn text={templateFullRaw} />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-extrabold">Minimal Template</div>
                  <div className="text-[11.5px] text-muted-foreground">Sadece zorunlu alanlar.</div>
                </div>
                <CopyBtn text={templateMinimalRaw} />
              </div>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <ShieldCheck className="h-5 w-5 text-brand-red" /> Zorunlu Kurallar
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              "seoTitle ≤ 44 karakter",
              "metaDescription 150-160 karakter",
              "5-9 H2 (section) başlığı",
              "1500-2500 kelime hedefi",
              "En az 1 tablo VEYA chart",
              "En az 1 inline görsel",
              "4-8 SSS sorusu",
              "featuredImage zorunlu",
              "Sadece Türkçe içerik",
              "İstanbul odaklı",
              "Fiyatlar aralık olarak (₺X – ₺Y)",
              "Fake iddia yasak (\"en ucuz\", \"kesin garanti\")",
            ].map((r) => (
              <li key={r} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-2.5 text-[12.5px]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Blocks catalog */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <Star className="h-5 w-5 text-brand-red" /> Kullanabileceğiniz Block Türleri ({BLOCKS.length})
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Her block <strong>opsiyonel</strong>. Bir section'da istediğiniz kadarını birlikte kullanabilirsiniz — sıralama otomatiktir.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {BLOCKS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.key} className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[14px] font-extrabold">{b.name}</div>
                        <div className="font-mono text-[10.5px] text-muted-foreground">{b.key}</div>
                      </div>
                    </div>
                    <CopyBtn text={b.snippet} label="YAML" />
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed">{b.desc}</p>
                  <p className="mt-1 text-[11.5px] italic text-muted-foreground">Ne zaman: {b.when}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[11px] font-semibold text-brand-red">YAML örneği</summary>
                    <pre className="mt-2 overflow-x-auto rounded-lg bg-background p-2.5 font-mono text-[10.5px] leading-snug">{b.snippet}</pre>
                  </details>
                </div>
              );
            })}
          </div>
        </section>

        {/* Görseller */}
        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="flex items-center gap-2 text-[18px] font-extrabold">
            <ImageIcon className="h-5 w-5 text-brand-red" /> Görseller Nereye?
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            Görselleri <code className="rounded bg-background px-1 font-mono text-[12px]">public/blog-images/</code> klasörüne koyun.
            Frontmatter'da yol her zaman <code className="rounded bg-background px-1 font-mono text-[12px]">"/blog-images/dosya-adi.jpg"</code>
            şeklinde başında slash ile yazılır. Dosya adları küçük harf + tire olmalı, boşluk yok.
          </p>
        </section>

        {/* Uyarı */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/8 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="text-[12.5px] leading-relaxed">
            <strong>Not:</strong> Bu sayfa arama motorlarında indekslenmez (<code className="font-mono">noindex</code>).
            Sadece editör kullanımı içindir.
          </div>
        </div>
      </div>
    </div>
  );
}
