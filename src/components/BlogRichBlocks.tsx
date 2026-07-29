// Renders every optional "rich block" attached to a BlogSection.
// All blocks are optional; nothing renders if a section uses none of them.
import { useState } from "react";
import {
  Info,
  Lightbulb,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Check,
  X,
  Quote as QuoteIcon,
  Play,
  Wrench,
  Phone,
  MessageCircle,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import type { BlogSection } from "@/data/blog";

const PHONE_HREF = "tel:+905338960503";
const WA_HREF = "https://wa.me/905338960503";

function list<T>(value: T[] | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

const CALLOUT_STYLES = {
  info: { icon: Info, ring: "border-blue-500/30 bg-blue-500/8", text: "text-blue-600 dark:text-blue-400" },
  tip: { icon: Lightbulb, ring: "border-amber-500/30 bg-amber-500/8", text: "text-amber-600 dark:text-amber-400" },
  warning: { icon: AlertTriangle, ring: "border-brand-red/30 bg-brand-red/8", text: "text-brand-red" },
  danger: { icon: ShieldAlert, ring: "border-brand-red/50 bg-brand-red/12", text: "text-brand-red" },
  success: { icon: CheckCircle2, ring: "border-brand-green/30 bg-brand-green/8", text: "text-brand-green" },
} as const;

function Callout({ block }: { block: NonNullable<BlogSection["callout"]> }) {
  const style = CALLOUT_STYLES[block.variant ?? "info"];
  const Icon = style.icon;
  return (
    <aside className={`mt-5 flex gap-3 rounded-xl border p-4 ${style.ring}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${style.text}`} />
      <div className="min-w-0 flex-1">
        {block.title && <div className={`text-[13px] font-extrabold ${style.text}`}>{block.title}</div>}
        <p className="mt-0.5 text-[13.5px] leading-relaxed text-foreground/85">{block.body}</p>
      </div>
    </aside>
  );
}

function KeyTakeaways({ block }: { block: NonNullable<BlogSection["keyTakeaways"]> }) {
  const points = list(block.points);
  if (points.length === 0) return null;
  return (
    <aside className="mt-5 rounded-xl border border-brand-red/25 bg-brand-red/6 p-4">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-red">
        <Sparkles className="h-3.5 w-3.5" /> {block.title ?? "Özet"}
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2 text-[13.5px] leading-snug">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" /> {p}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Steps({ block }: { block: NonNullable<BlogSection["steps"]> }) {
  const steps = list(block.steps);
  if (steps.length === 0) return null;
  return (
    <div className="mt-5">
      {block.title && <div className="mb-3 text-[13px] font-extrabold uppercase tracking-wide text-muted-foreground">{block.title}</div>}
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-[13px] font-black text-white">{i + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-extrabold">{s.title}</div>
              {s.body && <p className="mt-1 text-[13.5px] leading-relaxed text-foreground/80">{s.body}</p>}
              {s.image && (
                <figure className="mt-2.5 overflow-hidden rounded-lg border border-border">
                  <img src={s.image.src} alt={s.image.alt} loading="lazy" className="w-full object-cover" />
                  {s.image.caption && <figcaption className="border-t border-border bg-surface px-3 py-1.5 text-[10.5px] italic text-muted-foreground">{s.image.caption}</figcaption>}
                </figure>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Checklist({ block }: { block: NonNullable<BlogSection["checklist"]> }) {
  const items = list(block.items);
  if (items.length === 0) return null;
  return (
    <div className="mt-5 rounded-xl border border-border bg-surface p-4">
      {block.title && <div className="mb-2 text-[13px] font-extrabold">{block.title}</div>}
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-[13.5px]">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-brand-red/40 bg-background">
              <Check className="h-3 w-3 text-brand-red" />
            </span>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProsCons({ block }: { block: NonNullable<BlogSection["prosCons"]> }) {
  const pros = list(block.pros);
  const cons = list(block.cons);
  if (pros.length === 0 && cons.length === 0) return null;
  return (
    <div className="mt-5">
      {block.title && <div className="mb-3 text-[13px] font-extrabold uppercase tracking-wide text-muted-foreground">{block.title}</div>}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-brand-green/30 bg-brand-green/6 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wide text-brand-green">
            <Check className="h-3.5 w-3.5" /> Artılar
          </div>
          <ul className="space-y-1.5">
            {pros.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px]">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-green" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-brand-red/30 bg-brand-red/6 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wide text-brand-red">
            <X className="h-3.5 w-3.5" /> Eksiler
          </div>
          <ul className="space-y-1.5">
            {cons.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px]">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Materials({ block }: { block: NonNullable<BlogSection["materials"]> }) {
  const items = list(block.items);
  if (items.length === 0) return null;
  return (
    <div className="mt-5 rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wide text-muted-foreground">
        <Wrench className="h-3.5 w-3.5" /> {block.title ?? "Gerekli Malzemeler"}
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-background/50 p-2.5">
            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold">{it.name}</div>
              {it.note && <div className="text-[11.5px] text-muted-foreground">{it.note}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Timeline({ block }: { block: NonNullable<BlogSection["timeline"]> }) {
  const items = list(block.items);
  if (items.length === 0) return null;
  return (
    <div className="mt-5">
      {block.title && <div className="mb-3 text-[13px] font-extrabold uppercase tracking-wide text-muted-foreground">{block.title}</div>}
      <ol className="relative space-y-4 border-l-2 border-brand-red/30 pl-5">
        {items.map((it, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[27px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-white ring-4 ring-background" />
            <div className="text-[11px] font-bold uppercase tracking-wide text-brand-red">{it.time}</div>
            <div className="text-[14px] font-extrabold">{it.title}</div>
            {it.body && <p className="mt-0.5 text-[13px] leading-relaxed text-foreground/80">{it.body}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Quote({ block }: { block: NonNullable<BlogSection["quote"]> }) {
  return (
    <blockquote className="mt-5 rounded-xl border-l-4 border-brand-red bg-surface p-5">
      <QuoteIcon className="h-6 w-6 text-brand-red/40" />
      <p className="mt-2 text-[15px] font-medium italic leading-relaxed text-foreground/90">"{block.text}"</p>
      {(block.author || block.role) && (
        <footer className="mt-3 text-[12px] text-muted-foreground">
          — <span className="font-semibold text-foreground">{block.author}</span>
          {block.role && <span className="opacity-70">, {block.role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

function Video({ block }: { block: NonNullable<BlogSection["video"]> }) {
  const [play, setPlay] = useState(false);
  if (!block.youtubeId) return null;
  const thumb = `https://img.youtube.com/vi/${block.youtubeId}/hqdefault.jpg`;
  return (
    <figure className="mt-5">
      <div className="relative overflow-hidden rounded-xl border border-border bg-black" style={{ aspectRatio: "16/9" }}>
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${block.youtubeId}?autoplay=1`}
            title={block.title ?? "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : (
          <button onClick={() => setPlay(true)} className="group relative block h-full w-full" aria-label={`Videoyu oynat: ${block.title ?? ""}`}>
            <img src={thumb} alt={block.title ?? "Video önizleme"} loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition group-hover:bg-black/40">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red text-white shadow-2xl">
                <Play className="h-7 w-7 fill-white" />
              </span>
            </span>
          </button>
        )}
      </div>
      {block.caption && <figcaption className="mt-2 px-1 text-[11px] italic text-muted-foreground">{block.caption}</figcaption>}
    </figure>
  );
}

function Gallery({ block }: { block: NonNullable<BlogSection["gallery"]> }) {
  const images = list(block.images).filter((im) => im.src && im.alt);
  if (images.length === 0) return null;
  const cols = images.length === 2 ? "sm:grid-cols-2" : images.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-3";
  return (
    <div className={`mt-5 grid gap-2 ${cols}`}>
      {images.map((im, i) => (
        <figure key={i} className="overflow-hidden rounded-lg border border-border">
          <img src={im.src} alt={im.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          {im.caption && <figcaption className="border-t border-border bg-surface px-2 py-1 text-[10.5px] italic text-muted-foreground">{im.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

function BeforeAfter({ block }: { block: NonNullable<BlogSection["beforeAfter"]> }) {
  if (!block.before?.src || !block.after?.src) return null;
  return (
    <figure className="mt-5">
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          { label: "Öncesi", img: block.before, tone: "text-brand-red border-brand-red/30" },
          { label: "Sonrası", img: block.after, tone: "text-brand-green border-brand-green/30" },
        ].map((s) => (
          <div key={s.label} className={`overflow-hidden rounded-xl border ${s.tone.split(" ")[1]}`}>
            <div className={`px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide ${s.tone.split(" ")[0]} bg-surface`}>{s.label}</div>
            <img src={s.img.src} alt={s.img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        ))}
      </div>
      {block.caption && <figcaption className="mt-2 px-1 text-[11px] italic text-muted-foreground">{block.caption}</figcaption>}
    </figure>
  );
}

function PriceTable({ block }: { block: NonNullable<BlogSection["priceTable"]> }) {
  const rows = list(block.rows);
  if (rows.length === 0) return null;
  return (
    <figure className="mt-5 overflow-x-auto rounded-xl border border-brand-red/25">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr className="bg-brand-red/8 text-brand-red">
            <th className="px-3.5 py-2.5 font-extrabold">Hizmet</th>
            <th className="px-3.5 py-2.5 text-right font-extrabold">Fiyat Aralığı</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border odd:bg-surface">
              <td className="px-3.5 py-2.5">
                <div className="font-semibold">{r.service}</div>
                {r.note && <div className="text-[11px] text-muted-foreground">{r.note}</div>}
              </td>
              <td className="px-3.5 py-2.5 text-right font-extrabold text-brand-red">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {block.caption && <figcaption className="border-t border-border bg-surface px-3.5 py-2 text-[11px] italic text-muted-foreground">{block.caption}</figcaption>}
    </figure>
  );
}

function Accordion({ block }: { block: NonNullable<BlogSection["accordion"]> }) {
  const items = list(block.items);
  if (items.length === 0) return null;
  return (
    <div className="mt-5 space-y-2">
      {items.map((it, i) => (
        <details key={i} className="group rounded-xl border border-border bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-[13.5px] font-bold [&::-webkit-details-marker]:hidden">
            {it.q}
            <ChevronDown className="h-4 w-4 text-brand-red transition-transform group-open:rotate-180" />
          </summary>
          <div className="border-t border-border px-4 py-3 text-[13px] leading-relaxed text-foreground/80">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

function Cta({ block }: { block: NonNullable<BlogSection["cta"]> }) {
  return (
    <aside className="mt-5 rounded-2xl bg-foreground p-5 text-background">
      <div className="text-[16px] font-extrabold">{block.title}</div>
      {block.body && <p className="mt-1.5 text-[12.5px] leading-relaxed opacity-80">{block.body}</p>}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {block.phone !== false && (
          <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-red py-2.5 text-[12.5px] font-extrabold text-white">
            <Phone className="h-4 w-4" /> Ara
          </a>
        )}
        {block.whatsapp !== false && (
          <a href={WA_HREF} className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-green py-2.5 text-[12.5px] font-extrabold text-white">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        )}
      </div>
    </aside>
  );
}

function Sources({ block }: { block: NonNullable<BlogSection["sources"]> }) {
  const items = list(block.items);
  if (items.length === 0) return null;
  return (
    <div className="mt-5 rounded-xl border border-border bg-surface p-4">
      <div className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-muted-foreground">{block.title ?? "Kaynaklar"}</div>
      <ul className="space-y-1">
        {items.map((it, i) => (
          <li key={i}>
            <a href={it.url} target="_blank" rel="noopener nofollow" className="inline-flex items-center gap-1 text-[12.5px] text-brand-red hover:underline">
              <ExternalLink className="h-3 w-3" /> {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BlogRichBlocks({ section }: { section: BlogSection }) {
  return (
    <>
      {section.callout && <Callout block={section.callout} />}
      {section.keyTakeaways && <KeyTakeaways block={section.keyTakeaways} />}
      {section.steps && <Steps block={section.steps} />}
      {section.checklist && <Checklist block={section.checklist} />}
      {section.prosCons && <ProsCons block={section.prosCons} />}
      {section.materials && <Materials block={section.materials} />}
      {section.timeline && <Timeline block={section.timeline} />}
      {section.quote && <Quote block={section.quote} />}
      {section.video && <Video block={section.video} />}
      {section.gallery && <Gallery block={section.gallery} />}
      {section.beforeAfter && <BeforeAfter block={section.beforeAfter} />}
      {section.priceTable && <PriceTable block={section.priceTable} />}
      {section.accordion && <Accordion block={section.accordion} />}
      {section.cta && <Cta block={section.cta} />}
      {section.sources && <Sources block={section.sources} />}
      {section.rawHtml && (
        <div className="mt-5 [&_a]:text-brand-red [&_a]:underline" dangerouslySetInnerHTML={{ __html: section.rawHtml.html }} />
      )}
    </>
  );
}
