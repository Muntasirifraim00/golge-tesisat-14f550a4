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
  Languages,
} from "lucide-react";
import promptRaw from "@/content/blog/_templates/_AI_PROMPT.md?raw";
import promptQuickRaw from "@/content/blog/_templates/_AI_PROMPT_QUICK.md?raw";
import templateFullRaw from "@/content/blog/_templates/_TEMPLATE_FULL.md?raw";
import templateMinimalRaw from "@/content/blog/_templates/_TEMPLATE_MINIMAL.md?raw";

export const Route = createFileRoute("/blog-yazma-rehberi")({
  head: () => ({
    meta: [
      { title: "Blog Writing Guide — Gölge Tesisat" },
      { name: "description", content: "Editor guide: block types, template files and ready-to-use AI prompts for new blog posts." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Blog Writing Guide" },
      { property: "og:description", content: "Editor guide for adding new blog posts." },
    ],
  }),
  component: BlogWritingGuide,
});

type Lang = "tr" | "en";

type Block = {
  key: string;
  name: { tr: string; en: string };
  icon: React.ComponentType<{ className?: string }>;
  desc: { tr: string; en: string };
  when: { tr: string; en: string };
  snippet: string;
};

const BLOCKS: Block[] = [
  {
    key: "paragraphs",
    name: { tr: "Paragraphs (zorunlu)", en: "Paragraphs (required)" },
    icon: FileText,
    desc: { tr: "Bölümün ana metni. Her section'da en az bir paragraf olmalı.", en: "Main body text. Every section needs at least one paragraph." },
    when: { tr: "Her section — ana anlatım.", en: "Every section — the core narrative." },
    snippet: `paragraphs:
  - "First paragraph."
  - "Second paragraph."`,
  },
  {
    key: "bullets",
    name: { tr: "Bullets", en: "Bullets" },
    icon: ListChecks,
    desc: { tr: "Kart görünümlü madde listesi (2 sütunlu grid).", en: "Card-style bullet list (2-column grid)." },
    when: { tr: "Kısa özellik/kural listesi.", en: "Short feature or rule list." },
    snippet: `bullets:
  - "First point"
  - "Second point"
  - "Third point"`,
  },
  {
    key: "image",
    name: { tr: "Inline Image", en: "Inline Image" },
    icon: ImageIcon,
    desc: { tr: "Bölüm içi görsel + caption.", en: "In-section image with a caption." },
    when: { tr: "Diagram, örnek fotoğraf, ekran görüntüsü.", en: "Diagrams, sample photos, screenshots." },
    snippet: `image:
  src: "/blog-images/example.jpg"
  alt: "Keyword-rich description"
  caption: "Short caption"`,
  },
  {
    key: "table",
    name: { tr: "Table", en: "Table" },
    icon: TableIcon,
    desc: { tr: "Karşılaştırma / spec tablosu.", en: "Comparison / spec table." },
    when: { tr: "Yöntem/ürün karşılaştırma, teknik değerler.", en: "Method/product comparison, technical specs." },
    snippet: `table:
  caption: "Comparison of two methods"
  headers: ["Criterion", "A", "B"]
  rows:
    - ["Time", "10 min", "20 min"]
    - ["Cost", "Low", "Medium"]`,
  },
  {
    key: "chart",
    name: { tr: "Chart (Bar)", en: "Chart (Bar)" },
    icon: BarChart3,
    desc: { tr: "CSS ile çizilen basit yatay bar chart.", en: "Simple CSS-drawn horizontal bar chart." },
    when: { tr: "Yüzde dağılımı, sıklık, maliyet aralığı.", en: "Percent distribution, frequency, cost ranges." },
    snippet: `chart:
  title: "Failure causes"
  unit: "%"
  bars:
    - { label: "Sludge", value: 45 }
    - { label: "Air", value: 30 }
    - { label: "Other", value: 25 }`,
  },
  {
    key: "callout",
    name: { tr: "Callout", en: "Callout" },
    icon: Info,
    desc: { tr: "Renkli dikkat kutusu: info / tip / warning / danger / success.", en: "Colored notice box: info / tip / warning / danger / success." },
    when: { tr: "Uyarı, ipucu, güvenlik notu.", en: "Warnings, tips, safety notes." },
    snippet: `callout:
  variant: "warning"
  title: "Warning"
  body: "If you suspect a gas leak, close the main valve."`,
  },
  {
    key: "keyTakeaways",
    name: { tr: "Key Takeaways", en: "Key Takeaways" },
    icon: Sparkles,
    desc: { tr: "Özet kutusu — bölümün ana çıkarımları.", en: "Summary box — the key takeaways of a section." },
    when: { tr: "Uzun bölümlerin başında veya sonunda.", en: "At the start or end of long sections." },
    snippet: `keyTakeaways:
  title: "Summary"
  points:
    - "Prep your materials"
    - "Close the main valve"`,
  },
  {
    key: "steps",
    name: { tr: "Steps (HowTo)", en: "Steps (HowTo)" },
    icon: Lightbulb,
    desc: { tr: "Numaralı adım adım rehber. HowTo schema'ya dönüşür.", en: "Numbered step-by-step guide. Rendered as HowTo schema." },
    when: { tr: '"Nasıl yapılır" tipi yazılar.', en: '"How-to" style posts.' },
    snippet: `steps:
  title: "In 5 steps"
  steps:
    - { title: "Shut water", body: "Turn the main valve." }
    - { title: "Remove part" }
    - { title: "Install new one" }`,
  },
  {
    key: "checklist",
    name: { tr: "Checklist", en: "Checklist" },
    icon: Check,
    desc: { tr: "İşaretlenebilir görünümlü kontrol listesi.", en: "Checkbox-style checklist." },
    when: { tr: '"Başlamadan önce" kontrolleri.', en: '"Before you start" checks.' },
    snippet: `checklist:
  title: "Before you start"
  items:
    - "Valve closed?"
    - "Spare gasket ready?"`,
  },
  {
    key: "prosCons",
    name: { tr: "Pros / Cons", en: "Pros / Cons" },
    icon: ArrowLeftRight,
    desc: { tr: "Yanyana artı-eksi listesi (yeşil/kırmızı).", en: "Side-by-side pros/cons list (green/red)." },
    when: { tr: "Bir yöntemin avantaj-dezavantajı.", en: "Advantages/disadvantages of a method." },
    snippet: `prosCons:
  title: "Chemical drain opener"
  pros: ["Fast", "Cheap"]
  cons: ["Corrodes pipes", "Skin hazard"]`,
  },
  {
    key: "materials",
    name: { tr: "Materials", en: "Materials" },
    icon: Wrench,
    desc: { tr: "Gerekli malzemeler kart listesi.", en: "Card list of required materials." },
    when: { tr: '"Ne lazım?" bölümü.', en: '"What you need" section.' },
    snippet: `materials:
  title: "Required materials"
  items:
    - { name: "Pipe wrench", note: "24 mm" }
    - { name: "Teflon tape" }`,
  },
  {
    key: "timeline",
    name: { tr: "Timeline", en: "Timeline" },
    icon: Clock,
    desc: { tr: "Dikey zaman çizelgesi.", en: "Vertical timeline." },
    when: { tr: "Servis süreci, aşamalı iş akışı.", en: "Service process, staged workflow." },
    snippet: `timeline:
  items:
    - { time: "0 min", title: "Call received" }
    - { time: "20 min", title: "Team on-site" }`,
  },
  {
    key: "quote",
    name: { tr: "Quote", en: "Quote" },
    icon: Quote,
    desc: { tr: "Alıntı / usta veya müşteri sesi.", en: "Quote / technician or customer voice." },
    when: { tr: "Uzman görüşü, saha alıntısı.", en: "Expert opinion, field quote." },
    snippet: `quote:
  text: "If the radiator bottom stays cold, it's sludge."
  author: "Mehmet Usta"
  role: "15 years experience"`,
  },
  {
    key: "video",
    name: { tr: "Video (YouTube)", en: "Video (YouTube)" },
    icon: Youtube,
    desc: { tr: "Lazy-loaded YouTube embed (thumbnail + play).", en: "Lazy-loaded YouTube embed (thumbnail + play)." },
    when: { tr: "Görsel açıklama gerektiğinde.", en: "When visual explanation helps." },
    snippet: `video:
  youtubeId: "dQw4w9WgXcQ"
  title: "Boiler maintenance"
  caption: "3-minute summary"`,
  },
  {
    key: "gallery",
    name: { tr: "Gallery", en: "Gallery" },
    icon: Images,
    desc: { tr: "2-6 resim yanyana grid.", en: "2-6 images in a grid." },
    when: { tr: "Farklı senaryolar / örnekler.", en: "Different scenarios / examples." },
    snippet: `gallery:
  images:
    - { src: "/blog-images/g1.jpg", alt: "..." }
    - { src: "/blog-images/g2.jpg", alt: "..." }`,
  },
  {
    key: "beforeAfter",
    name: { tr: "Before / After", en: "Before / After" },
    icon: ArrowLeftRight,
    desc: { tr: "Öncesi-sonrası split görsel.", en: "Before/after split image." },
    when: { tr: "Temizlik, tamir sonucu.", en: "Cleaning or repair results." },
    snippet: `beforeAfter:
  before: { src: "/blog-images/dirty.jpg", alt: "Dirty" }
  after:  { src: "/blog-images/clean.jpg", alt: "Clean" }
  caption: "Radiator cleaning"`,
  },
  {
    key: "priceTable",
    name: { tr: "Price Table", en: "Price Table" },
    icon: Tag,
    desc: { tr: "Servis fiyat aralıkları tablosu (kırmızı vurgulu).", en: "Service price-range table (red accent)." },
    when: { tr: "Fiyat bölümü.", en: "Pricing sections." },
    snippet: `priceTable:
  rows:
    - { service: "Radiator cleaning", price: "₺1,500 – ₺3,500" }
    - { service: "Boiler service",   price: "₺900 – ₺1,800" }`,
  },
  {
    key: "accordion",
    name: { tr: "Accordion", en: "Accordion" },
    icon: MessageSquare,
    desc: { tr: "Katlanan Q&A blokları (SSS dışında da kullanılır).", en: "Collapsible Q&A blocks (outside main FAQ)." },
    when: { tr: "İkincil SSS, detay açılımı.", en: "Secondary FAQ, detail expansion." },
    snippet: `accordion:
  items:
    - { q: "How often?", a: "Every 3-5 years." }`,
  },
  {
    key: "cta",
    name: { tr: "CTA", en: "CTA" },
    icon: Phone,
    desc: { tr: "Ara / WhatsApp buton kartı.", en: "Call / WhatsApp button card." },
    when: { tr: "Dönüşüm noktalarında.", en: "At conversion points." },
    snippet: `cta:
  title: "Need help?"
  body: "We arrive within 30 minutes."
  phone: true
  whatsapp: true`,
  },
  {
    key: "sources",
    name: { tr: "Sources", en: "Sources" },
    icon: Link2,
    desc: { tr: "Dış referans linkleri (nofollow).", en: "External reference links (nofollow)." },
    when: { tr: "Yasal / teknik kaynak gösterme.", en: "Citing legal / technical sources." },
    snippet: `sources:
  title: "References"
  items:
    - { label: "EPDK", url: "https://www.epdk.gov.tr" }`,
  },
];

const T = {
  eyebrow: { tr: "Editör Rehberi", en: "Editor Guide" },
  h1: { tr: "Blog Post Yazma Rehberi", en: "Blog Post Writing Guide" },
  intro: {
    tr: (
      <>
        Yeni blog post'ları <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12.5px]">src/content/blog/</code> klasörüne
        <code className="mx-1 rounded bg-surface px-1.5 py-0.5 font-mono text-[12.5px]">.md</code> dosyası olarak ekleyebilirsiniz.
        Aşağıda hazır AI prompt'ları, template dosyaları ve kullanabileceğiniz tüm block türleri var.
      </>
    ),
    en: (
      <>
        Add new blog posts as <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12.5px]">.md</code> files
        inside <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[12.5px]">src/content/blog/</code>.
        Below you'll find ready-to-use AI prompts, template files and every block type you can use.
      </>
    ),
  },
  back: { tr: "← Blog'a dön", en: "← Back to blog" },
  workflowH: { tr: "3 Adımda Nasıl Post Eklenir", en: "Add a Post in 3 Steps" },
  workflow: {
    tr: [
      { t: "AI Prompt'u Kopyala", b: "Aşağıdan tam veya kısa prompt'u kopyalayın; ChatGPT/Claude/Gemini'ye yapıştırın, konunuzu ekleyin." },
      { t: "AI '.md' Üretir", b: "AI kurallara uygun `.md` dosyasını üretir. YAML frontmatter + section'lar hazır gelir." },
      { t: "Dosyayı Ekle", b: "`src/content/blog/<slug>.md` olarak kaydedin. Sayfada otomatik yayında olur." },
    ],
    en: [
      { t: "Copy the AI prompt", b: "Copy the full or quick prompt below, paste it into ChatGPT / Claude / Gemini, then add your topic." },
      { t: "AI generates the .md", b: "The AI returns a fully-formed `.md` with YAML frontmatter and sections that match the rules." },
      { t: "Add the file", b: "Save it as `src/content/blog/<slug>.md`. It goes live automatically." },
    ],
  },
  promptsH: { tr: "AI Prompt'ları (Kopyala → Yapıştır)", en: "AI Prompts (Copy → Paste)" },
  promptFullT: { tr: "Tam Prompt (önerilen)", en: "Full Prompt (recommended)" },
  promptFullD: { tr: "Tüm kurallar + block şeması + kalite kontrol.", en: "All rules + block schema + QA checklist." },
  promptQuickT: { tr: "Kısa Prompt", en: "Quick Prompt" },
  promptQuickD: { tr: "Hızlı üretim için sıkıştırılmış versiyon.", en: "Compressed version for fast drafting." },
  preview: { tr: "Önizleme", en: "Preview" },
  templatesH: { tr: "Template Dosyaları", en: "Template Files" },
  templatesIntro: {
    tr: (
      <>
        Elle yazmak isterseniz bu template'leri kopyalayıp <code className="rounded bg-surface px-1 font-mono text-[12px]">src/content/blog/&lt;slug&gt;.md</code> olarak kaydedin.
      </>
    ),
    en: (
      <>
        Prefer to write manually? Copy these templates and save them as <code className="rounded bg-surface px-1 font-mono text-[12px]">src/content/blog/&lt;slug&gt;.md</code>.
      </>
    ),
  },
  tplFullT: { tr: "Full Template", en: "Full Template" },
  tplFullD: { tr: "Her block türünün örneği (referans).", en: "Every block type as reference." },
  tplMinT: { tr: "Minimal Template", en: "Minimal Template" },
  tplMinD: { tr: "Sadece zorunlu alanlar.", en: "Required fields only." },
  rulesH: { tr: "Zorunlu Kurallar", en: "Required Rules" },
  rules: {
    tr: [
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
      'Fake iddia yasak ("en ucuz", "kesin garanti")',
    ],
    en: [
      "seoTitle ≤ 44 characters",
      "metaDescription 150-160 characters",
      "5-9 H2 (section) headings",
      "Target 1,500-2,500 words",
      "At least 1 table OR chart",
      "At least 1 inline image",
      "4-8 FAQ questions",
      "featuredImage is required",
      "Turkish content only (site language)",
      "İstanbul focus",
      "Prices as a range (₺X – ₺Y)",
      'No fake claims ("cheapest", "guaranteed 100%")',
    ],
  },
  blocksH: { tr: "Kullanabileceğiniz Block Türleri", en: "Available Block Types" },
  blocksIntro: {
    tr: (
      <>Her block <strong>opsiyonel</strong>. Bir section'da istediğiniz kadarını birlikte kullanabilirsiniz — sıralama otomatiktir.</>
    ),
    en: (
      <>Every block is <strong>optional</strong>. Combine as many as you want per section — the render order is automatic.</>
    ),
  },
  whenLabel: { tr: "Ne zaman:", en: "When to use:" },
  yamlEx: { tr: "YAML örneği", en: "YAML example" },
  copy: { tr: "Kopyala", en: "Copy" },
  copied: { tr: "Kopyalandı!", en: "Copied!" },
  imagesH: { tr: "Görseller Nereye?", en: "Where do images go?" },
  imagesBody: {
    tr: (
      <>
        Görselleri <code className="rounded bg-background px-1 font-mono text-[12px]">public/blog-images/</code> klasörüne koyun.
        Frontmatter'da yol her zaman <code className="rounded bg-background px-1 font-mono text-[12px]">"/blog-images/dosya-adi.jpg"</code>
        şeklinde başında slash ile yazılır. Dosya adları küçük harf + tire olmalı, boşluk yok.
      </>
    ),
    en: (
      <>
        Place images in <code className="rounded bg-background px-1 font-mono text-[12px]">public/blog-images/</code>.
        In the frontmatter the path is always written with a leading slash, e.g. <code className="rounded bg-background px-1 font-mono text-[12px]">"/blog-images/file-name.jpg"</code>.
        File names must be lowercase with hyphens — no spaces.
      </>
    ),
  },
  noteLabel: { tr: "Not:", en: "Note:" },
  noteBody: {
    tr: (
      <>Bu sayfa arama motorlarında indekslenmez (<code className="font-mono">noindex</code>). Sadece editör kullanımı içindir.</>
    ),
    en: (
      <>This page is not indexed by search engines (<code className="font-mono">noindex</code>). It is for editor use only.</>
    ),
  },
};

function CopyBtn({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
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
      {ok ? copiedLabel : label}
    </button>
  );
}

function BlogWritingGuide() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = <K extends keyof typeof T>(k: K) => (T[k] as Record<Lang, unknown>)[lang] as (typeof T)[K]["tr"];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border bg-surface/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red">
              <BookOpen className="h-4 w-4" /> {t("eyebrow") as string}
            </div>
            <div className="inline-flex overflow-hidden rounded-lg border border-border bg-background text-[11.5px] font-bold">
              <button
                onClick={() => setLang("tr")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 ${lang === "tr" ? "bg-brand-red text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Languages className="h-3.5 w-3.5" /> TR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 ${lang === "en" ? "bg-brand-red text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </button>
            </div>
          </div>
          <h1 className="mt-2 text-[30px] font-extrabold leading-tight sm:text-[36px]">{t("h1") as string}</h1>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">{t("intro") as React.ReactNode}</p>
          <div className="mt-4 flex gap-2">
            <Link to="/blog" className="rounded-lg border border-border bg-background px-3 py-2 text-[12.5px] font-semibold hover:bg-surface">{t("back") as string}</Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-10 px-4 pt-10">
        {/* Workflow */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <Zap className="h-5 w-5 text-brand-red" /> {t("workflowH") as string}
          </h2>
          <ol className="mt-4 grid gap-3 sm:grid-cols-3">
            {(t("workflow") as { t: string; b: string }[]).map((s, i) => (
              <li key={i} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red text-[13px] font-black text-white">{i + 1}</div>
                <div className="mt-2 text-[14px] font-extrabold">{s.t}</div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{s.b}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Prompts */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <Sparkles className="h-5 w-5 text-brand-red" /> {t("promptsH") as string}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-brand-red/40 bg-brand-red/6 p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[14px] font-extrabold">{t("promptFullT") as string}</div>
                  <div className="text-[11.5px] text-muted-foreground">{t("promptFullD") as string}</div>
                </div>
                <CopyBtn text={promptRaw} label={t("copy") as string} copiedLabel={t("copied") as string} />
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-[11.5px] font-semibold text-brand-red">{t("preview") as string}</summary>
                <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-background p-3 font-mono text-[10.5px] leading-relaxed">{promptRaw}</pre>
              </details>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[14px] font-extrabold">{t("promptQuickT") as string}</div>
                  <div className="text-[11.5px] text-muted-foreground">{t("promptQuickD") as string}</div>
                </div>
                <CopyBtn text={promptQuickRaw} label={t("copy") as string} copiedLabel={t("copied") as string} />
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer text-[11.5px] font-semibold text-brand-red">{t("preview") as string}</summary>
                <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-background p-3 font-mono text-[10.5px] leading-relaxed">{promptQuickRaw}</pre>
              </details>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <FileText className="h-5 w-5 text-brand-red" /> {t("templatesH") as string}
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">{t("templatesIntro") as React.ReactNode}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-extrabold">{t("tplFullT") as string}</div>
                  <div className="text-[11.5px] text-muted-foreground">{t("tplFullD") as string}</div>
                </div>
                <CopyBtn text={templateFullRaw} label={t("copy") as string} copiedLabel={t("copied") as string} />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[14px] font-extrabold">{t("tplMinT") as string}</div>
                  <div className="text-[11.5px] text-muted-foreground">{t("tplMinD") as string}</div>
                </div>
                <CopyBtn text={templateMinimalRaw} label={t("copy") as string} copiedLabel={t("copied") as string} />
              </div>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <ShieldCheck className="h-5 w-5 text-brand-red" /> {t("rulesH") as string}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {(t("rules") as string[]).map((r) => (
              <li key={r} className="flex items-start gap-2 rounded-lg border border-border bg-surface p-2.5 text-[12.5px]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Blocks catalog */}
        <section>
          <h2 className="flex items-center gap-2 text-[20px] font-extrabold">
            <Star className="h-5 w-5 text-brand-red" /> {t("blocksH") as string} ({BLOCKS.length})
          </h2>
          <p className="mt-2 text-[13px] text-muted-foreground">{t("blocksIntro") as React.ReactNode}</p>
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
                        <div className="text-[14px] font-extrabold">{b.name[lang]}</div>
                        <div className="font-mono text-[10.5px] text-muted-foreground">{b.key}</div>
                      </div>
                    </div>
                    <CopyBtn text={b.snippet} label="YAML" copiedLabel={t("copied") as string} />
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed">{b.desc[lang]}</p>
                  <p className="mt-1 text-[11.5px] italic text-muted-foreground">{t("whenLabel") as string} {b.when[lang]}</p>
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[11px] font-semibold text-brand-red">{t("yamlEx") as string}</summary>
                    <pre className="mt-2 overflow-x-auto rounded-lg bg-background p-2.5 font-mono text-[10.5px] leading-snug">{b.snippet}</pre>
                  </details>
                </div>
              );
            })}
          </div>
        </section>

        {/* Images */}
        <section className="rounded-2xl border border-border bg-surface p-5">
          <h2 className="flex items-center gap-2 text-[18px] font-extrabold">
            <ImageIcon className="h-5 w-5 text-brand-red" /> {t("imagesH") as string}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{t("imagesBody") as React.ReactNode}</p>
        </section>

        {/* Note */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/8 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="text-[12.5px] leading-relaxed">
            <strong>{t("noteLabel") as string}</strong> {t("noteBody") as React.ReactNode}
          </div>
        </div>
      </div>
    </div>
  );
}
