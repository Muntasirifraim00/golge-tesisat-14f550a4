// Generic blog post template in the new Gölge Tesisat design (scoped CSS: .gt-post in src/styles/gt.css).
// Used for every post that does NOT have its own *Editorial component. All content comes from the
// post data (sections, rich blocks, FAQ); internal-linking blocks from the previous template are kept.
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, CalendarDays, Clock, Link2, MapPin, MessageCircle, Phone, Play, Printer, Share2, Wrench,
} from "lucide-react";
import type { BlogPost, BlogSection } from "@/data/blog";

const PHONE = "0533 896 05 03";
const PHONE_HREF = "tel:+905338960503";
const WA = "https://wa.me/905338960503";

type Svc = { slug: string; name: string; shortName: string; responseMin: number };
type District = { slug: string; name: string };

export type GtPostCtx = {
  p: BlogPost;
  sections: BlogSection[];
  faq: { q: string; a: string }[];
  service?: Svc;
  related: BlogPost[];
  silo: { prev?: BlogPost; next?: BlogPost };
  nearbyDistricts: District[];
  intro: ReactNode;
  lk: (text: string) => ReactNode;
  guideLinks: { post: BlogPost; label: string }[];
  siblings: () => BlogPost[];
  hub: BlogPost[];
  updatedLabel: string;
  dateIso: string;
};

const plain = (t: unknown) => String(t ?? "").replace(/\*\*/g, "");
const arr = <T,>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);

/** Highlight the end of the first clause of the title in red, like the design ("How to Detect a <em>Water Leak?</em> …"). */
function Title({ t }: { t: string }) {
  const m = t.search(/[?:]/);
  const clause = m > 0 ? t.slice(0, m + 1) : t;
  const rest = m > 0 ? t.slice(m + 1) : "";
  const w = clause.split(" ");
  if (w.length < 3) return <>{t}</>;
  const k = w.length - 2;
  return (
    <>
      {w.slice(0, k).join(" ")} <em>{w.slice(k).join(" ")}</em>
      {rest}
    </>
  );
}

function Ico({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  );
}

/* ---------------- interactive pieces ---------------- */
function Faq({ items, lk }: { items: { q: string; a: string }[]; lk: (t: string) => ReactNode }) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div>
      {items.map((f, i) => (
        <div key={f.q} className={`qa${open === i ? " open" : ""}`}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <h3>{f.q}</h3>
            <span className="pl">+</span>
          </button>
          <div className="ans"><div><p>{lk(f.a)}</p></div></div>
        </div>
      ))}
    </div>
  );
}

function Steps({ block }: { block: NonNullable<BlogSection["steps"]> }) {
  const steps = arr(block.steps).filter((s) => s && s.title);
  const [done, setDone] = useState<Set<number>>(new Set());
  if (!steps.length) return null;
  return (
    <div className="blk">
      {block.title && <small>{block.title}</small>}
      <ol className="steps rich">
        {steps.map((s, i) => (
          <li key={i} className={done.has(i) ? "done" : ""} onClick={() => setDone((d) => { const n = new Set(d); n.has(i) ? n.delete(i) : n.add(i); return n; })}>
            <div>
              <b>{s.title}</b>
              {s.body && <span>{s.body}</span>}
              {s.image?.src && <img src={s.image.src} alt={s.image.alt || s.title} loading="lazy" />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Checklist({ block }: { block: NonNullable<BlogSection["checklist"]> }) {
  const items = arr(block.items).filter(Boolean);
  const [on, setOn] = useState<Set<number>>(new Set());
  if (!items.length) return null;
  return (
    <div className="blk">
      {block.title && <small>{block.title}</small>}
      <div className="chk">
        {items.map((t, i) => (
          <button key={i} type="button" className="ck" aria-pressed={on.has(i)} onClick={() => setOn((d) => { const n = new Set(d); n.has(i) ? n.delete(i) : n.add(i); return n; })}>
            <span className="bx"><Ico d="M5 12l5 5L20 7" /></span>
            <span><b>{plain(t)}</b></span>
            <em>{String(i + 1).padStart(2, "0")}</em>
          </button>
        ))}
      </div>
      <div className="chkbar"><span>{on.size} / {items.length} işaretlendi</span><i style={{ ["--w" as string]: `${(on.size / items.length) * 100}%` }} /></div>
    </div>
  );
}

function BeforeAfter({ block }: { block: NonNullable<BlogSection["beforeAfter"]> }) {
  const [x, setX] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  if (!block.before?.src || !block.after?.src) return null;
  const at = (cx: number) => { const r = ref.current?.getBoundingClientRect(); if (r) setX(Math.max(0, Math.min(100, ((cx - r.left) / r.width) * 100))); };
  return (
    <figure>
      <div
        ref={ref} className="ba" role="slider" tabIndex={0} aria-label="Öncesi / sonrası" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(x)}
        style={{ ["--x" as string]: `${x}%` }}
        onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); at(e.clientX); }}
        onPointerMove={(e) => { if (drag.current) at(e.clientX); }}
        onPointerUp={() => { drag.current = false; }}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") setX((v) => Math.max(0, v - 5)); if (e.key === "ArrowRight") setX((v) => Math.min(100, v + 5)); }}
      >
        <div className="lay"><img src={block.before.src} alt={block.before.alt} loading="lazy" /></div>
        <div className="lay aft"><img src={block.after.src} alt={block.after.alt} loading="lazy" /></div>
        <span className="tg b">ÖNCESİ</span><span className="tg a">SONRASI</span><span className="bar" /><span className="knob">⇆</span>
      </div>
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}

function Video({ block }: { block: NonNullable<BlogSection["video"]> }) {
  const [play, setPlay] = useState(false);
  if (!block.youtubeId) return null;
  return (
    <figure>
      <div className="vid">
        {play ? (
          <iframe src={`https://www.youtube.com/embed/${block.youtubeId}?autoplay=1`} title={block.title ?? "Video"} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setPlay(true)} aria-label={`Videoyu oynat: ${block.title ?? ""}`}>
            <img src={`https://img.youtube.com/vi/${block.youtubeId}/hqdefault.jpg`} alt={block.title ?? "Video önizleme"} loading="lazy" />
            <span className="pl"><Play fill="currentColor" /></span>
          </button>
        )}
      </div>
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>
  );
}

function Share({ title }: { title: string }) {
  const [msg, setMsg] = useState("");
  const url = () => (typeof location !== "undefined" ? location.href.split("#")[0] : "");
  const toast = (t: string) => { setMsg(t); setTimeout(() => setMsg(""), 1800); };
  return (
    <div className="share">
      <button type="button" aria-label="Bağlantıyı kopyala" onClick={() => { try { navigator.clipboard.writeText(url()).then(() => toast("Bağlantı kopyalandı"), () => toast(url())); } catch { toast(url()); } }}><Link2 /></button>
      <a aria-label="WhatsApp ile paylaş" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(title)}`} onClick={(e) => { e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(`${title} — ${url()}`)}`; }}><MessageCircle /></a>
      <button type="button" aria-label="Paylaş" onClick={() => { if (navigator.share) navigator.share({ title, url: url() }).catch(() => {}); else { try { navigator.clipboard.writeText(url()); toast("Bağlantı kopyalandı"); } catch { /* ignore */ } } }}><Share2 /></button>
      <button type="button" aria-label="Yazdır" onClick={() => window.print()}><Printer /></button>
      <div className={`toast${msg ? " on" : ""}`} role="status">{msg}</div>
    </div>
  );
}

function Helpful() {
  const [v, setV] = useState<"y" | "n" | null>(null);
  return (
    <div className="help">
      <b>Bu rehber işinize yaradı mı?</b>
      <button type="button" className={v === "y" ? "on" : ""} onClick={() => setV("y")}>👍 Evet</button>
      <button type="button" className={v === "n" ? "on" : ""} onClick={() => setV("n")}>👎 Pek değil</button>
      {v && (
        <p className="m">
          {v === "y" ? "Teşekkürler! İhtiyacı olabilecek biriyle paylaşabilirsiniz." : <>Üzgünüz — sorunuzu <a href={`${WA}?text=${encodeURIComponent("Merhaba, rehberinizi okudum ama hâlâ bir sorum var:")}`} target="_blank" rel="noopener noreferrer">WhatsApp’tan yazın</a>, yardımcı olalım.</>}
        </p>
      )}
    </div>
  );
}

/** Reading progress pipe, table-of-contents highlight, "minutes left" and the mobile contents pill + sheet. */
function usePostFx(toc: { id: string; label: string }[], readMin: number): { bar: ReactNode; side: ReactNode; mobile: ReactNode } {
  const [cur, setCur] = useState(0);
  const [p, setP] = useState(0);
  const [pill, setPill] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [fill, setFill] = useState(0);
  const listRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const on = () => {
      const post = document.getElementById("post");
      if (!post) return;
      const r = post.getBoundingClientRect();
      const v = Math.min(1, Math.max(0, (innerHeight * 0.35 - r.top) / (r.height - innerHeight * 0.3)));
      setP(v);
      let c = 0;
      toc.forEach((t, i) => { const h = document.getElementById(t.id); if (h && h.getBoundingClientRect().top < 160) c = i; });
      setCur(c);
      setPill(r.top < 0 && r.bottom > innerHeight * 0.6);
      const a = listRef.current?.querySelectorAll("a")[c] as HTMLElement | undefined;
      if (a) setFill(a.offsetTop + a.offsetHeight - 4);
    };
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    on();
    const close = (e: MouseEvent) => { const t = e.target as HTMLElement; if (!t.closest(".sheet") && !t.closest(".mtoc")) setSheet(false); };
    document.addEventListener("click", close);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); document.removeEventListener("click", close); };
  }, [toc]);
  const jump = (e: MouseEvent | { preventDefault: () => void }, id: string) => {
    e.preventDefault();
    const t = document.getElementById(id);
    if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: "smooth" });
    setSheet(false);
  };
  const left = p >= 0.98 ? "Bitti ✓" : `${Math.max(1, Math.ceil(readMin * (1 - p)))} dk kaldı`;
  const links = toc.map((t, i) => (
    <a key={t.id} href={`#${t.id}`} className={i === cur ? "on" : ""} onClick={(e) => jump(e, t.id)}>{t.label}</a>
  ));
  return {
    bar: <div className="prog" aria-hidden="true"><i style={{ width: `${p * 100}%` }} /></div>,
    side: (
      <aside className="toc" aria-label="İçindekiler">
        <small>BU REHBERDE</small>
        <nav className="tocl" ref={listRef}><span className="fill" style={{ height: fill }} />{links}</nav>
        <p className="mins">{left}</p>
      </aside>
    ),
    mobile: (
      <>
        <div className={`mtoc${pill ? " on" : ""}`}><span>{toc[cur]?.label}</span><button type="button" onClick={() => setSheet((s) => !s)}>İçindekiler</button></div>
        <div className={`sheet${sheet ? " on" : ""}`} role="dialog" aria-label="İçindekiler"><div className="gr" /><nav>{links}</nav></div>
      </>
    ),
  };
}

/** Wrapper so PostFx's three placements share one state. */
function WithFx({ toc, readMin, children }: { toc: { id: string; label: string }[]; readMin: number; children: (fx: { bar: ReactNode; side: ReactNode; mobile: ReactNode }) => ReactNode }) {
  const fx = usePostFx(toc, readMin);
  return <>{children(fx)}</>;
}

/* ---------------- static blocks ---------------- */
const CALL: Record<string, { cls: string; ic: string; t: string }> = {
  info: { cls: "tip", ic: "i", t: "Bilgi" },
  tip: { cls: "tip", ic: "i", t: "İpucu" },
  warning: { cls: "warn", ic: "⚠", t: "Dikkat" },
  danger: { cls: "danger", ic: "!", t: "Önemli uyarı" },
  success: { cls: "ok", ic: "✓", t: "İyi haber" },
};

function SectionBlocks({ s, lk }: { s: BlogSection; lk: (t: string) => ReactNode }) {
  const c = s.callout;
  const kt = s.keyTakeaways ? arr(s.keyTakeaways.points).filter(Boolean) : [];
  const pros = s.prosCons ? arr(s.prosCons.pros) : [];
  const cons = s.prosCons ? arr(s.prosCons.cons) : [];
  const mats = s.materials ? arr(s.materials.items).filter((m) => m && m.name) : [];
  const tl = s.timeline ? arr(s.timeline.items).filter((m) => m && m.title) : [];
  const gal = s.gallery ? arr(s.gallery.images).filter((m) => m && m.src) : [];
  const price = s.priceTable ? arr(s.priceTable.rows) : [];
  const acc = s.accordion ? arr(s.accordion.items).filter((m) => m && m.q && m.a) : [];
  const src = s.sources ? arr(s.sources.items).filter((m) => m && m.url) : [];
  return (
    <>
      {c?.body && (() => { const st = CALL[c.variant ?? "info"] ?? CALL.info; return <div className={`call ${st.cls}`}><span className="ic">{st.ic}</span><div><b>{c.title || st.t}</b>{lk(c.body)}</div></div>; })()}
      {kt.length > 0 && (
        <div className="key"><small>{(s.keyTakeaways?.title || "Öne çıkanlar").toLocaleUpperCase("tr")}</small><ul>{kt.map((t, i) => <li key={i}><i><Ico d="M5 12l5 5L20 7" /></i>{plain(t)}</li>)}</ul></div>
      )}
      {s.steps && <Steps block={s.steps} />}
      {s.checklist && <Checklist block={s.checklist} />}
      {(pros.length > 0 || cons.length > 0) && (
        <div className="blk">
          {s.prosCons?.title && <small>{s.prosCons.title}</small>}
          <div className="pc">
            {pros.length > 0 && <div className="p"><b>Artıları</b><ul>{pros.map((t, i) => <li key={i}><i>✓</i>{plain(t)}</li>)}</ul></div>}
            {cons.length > 0 && <div className="c"><b>Eksileri</b><ul>{cons.map((t, i) => <li key={i}><i>✕</i>{plain(t)}</li>)}</ul></div>}
          </div>
        </div>
      )}
      {mats.length > 0 && (
        <div className="blk">
          <small>{s.materials?.title || "Gerekli malzemeler"}</small>
          <div className="mat">{mats.map((m, i) => <div key={i}><span className="ic"><Wrench /></span><div><b>{m.name}</b>{m.note && <span>{m.note}</span>}</div></div>)}</div>
        </div>
      )}
      {tl.length > 0 && (
        <div className="blk">
          {s.timeline?.title && <small>{s.timeline.title}</small>}
          <ol className="tl">{tl.map((m, i) => <li key={i}><small>{m.time}</small><b>{m.title}</b>{m.body && <p>{m.body}</p>}</li>)}</ol>
        </div>
      )}
      {s.quote?.text && (
        <blockquote className="pq">“{s.quote.text}”{(s.quote.author || s.quote.role) && <cite>— {s.quote.author}{s.quote.role ? `, ${s.quote.role}` : ""}</cite>}</blockquote>
      )}
      {s.video && <Video block={s.video} />}
      {gal.length > 0 && (
        <div className="gal">{gal.map((im, i) => <figure key={i}><img src={im.src} alt={im.alt || ""} loading="lazy" />{im.caption && <figcaption>{im.caption}</figcaption>}</figure>)}</div>
      )}
      {s.beforeAfter && <BeforeAfter block={s.beforeAfter} />}
      {price.length > 0 && (
        <div className="tw">
          <table>
            <thead><tr><th>Hizmet</th><th>Fiyat</th><th>Not</th></tr></thead>
            <tbody>{price.map((r, i) => <tr key={i}><td>{r.service}</td><td className="y">{r.price}</td><td>{r.note ?? ""}</td></tr>)}</tbody>
          </table>
          {s.priceTable?.caption && <div className="cap">{s.priceTable.caption}</div>}
        </div>
      )}
      {acc.length > 0 && <div className="blk"><Faq items={acc} lk={(t) => t} /></div>}
      {s.cta?.title && (
        <div className="icta">
          <div><b>{s.cta.title}</b>{s.cta.body && <span>{s.cta.body}</span>}</div>
          <div className="r">
            {s.cta.phone !== false && <a className="btn bw" href={PHONE_HREF}><Phone />{PHONE}</a>}
            {s.cta.whatsapp !== false && <a className="btn bg" href={WA} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a>}
          </div>
        </div>
      )}
      {src.length > 0 && (
        <div className="src"><b>{s.sources?.title || "Kaynaklar"}</b><ol>{src.map((x, i) => <li key={i}><a href={x.url} target="_blank" rel="noopener noreferrer nofollow">{x.label}</a></li>)}</ol></div>
      )}
      {s.rawHtml?.html && <div dangerouslySetInnerHTML={{ __html: s.rawHtml.html }} />}
    </>
  );
}

function Section({ s, i, lk, alt }: { s: BlogSection; i: number; lk: (t: string) => ReactNode; alt: string }) {
  const paras = arr(s.paragraphs).filter(Boolean);
  const bullets = arr(s.bullets).filter(Boolean);
  const headers = arr(s.table?.headers).filter(Boolean);
  const rows = arr(s.table?.rows).filter((r) => Array.isArray(r) && r.length > 0);
  const bars = (() => {
    const ch = s.chart as (BlogSection["chart"] & { data?: unknown[] }) | undefined;
    if (!ch) return [] as { label: string; value: number; note?: string }[];
    const src = Array.isArray(ch.bars) ? ch.bars : Array.isArray(ch.data) ? ch.data : [];
    return (src as { label: string; value: number; note?: string }[]).filter((b) => b && typeof b.label === "string" && typeof b.value === "number" && Number.isFinite(b.value));
  })();
  const max = Math.max(1, ...bars.map((b) => b.value));
  const extra = s as BlogSection & { paragraphsEnd?: string[]; images?: { src: string; alt?: string; caption?: string }[] };
  return (
    <section className="sec" id={`sec-${i}`}>
      <h2><span className="n">{i + 1}</span>{s.heading}</h2>
      {paras.map((t, k) => <p key={k}>{lk(t)}</p>)}
      {bullets.length > 0 && <ul>{bullets.map((b, k) => <li key={k}>{lk(b)}</li>)}</ul>}
      {s.image?.src && (
        <figure>
          <div className="pic"><img src={s.image.src} alt={s.image.alt || `${alt} — ${s.heading}`} width={1280} height={720} loading="lazy" decoding="async" /></div>
          {s.image.caption && <figcaption>{s.image.caption}</figcaption>}
        </figure>
      )}
      {headers.length > 0 && rows.length > 0 && (
        <div className="tw">
          <table>
            <thead><tr>{headers.map((h, k) => <th key={k}>{h}</th>)}</tr></thead>
            <tbody>{rows.map((r, k) => <tr key={k}>{r.map((c, j) => <td key={j}>{plain(c)}</td>)}</tr>)}</tbody>
          </table>
          {s.table?.caption && <div className="cap">{s.table.caption}</div>}
        </div>
      )}
      {bars.length > 0 && (
        <div className="bars">
          {s.chart?.title && <small>{s.chart.title}</small>}
          {bars.map((b, k) => (
            <div className="bar" key={k}>
              <div className="l"><span>{b.label}</span><b>{b.value}{s.chart?.unit ?? ""}</b></div>
              <div className="t"><i style={{ width: `${(b.value / max) * 100}%` }} /></div>
              {b.note && <div className="nt">{b.note}</div>}
            </div>
          ))}
        </div>
      )}
      {SectionBlocks({ s, lk })}
      {arr(extra.images).filter((im) => im && im.src).length > 0 && (
        <div className="gal">{arr(extra.images).filter((im) => im && im.src).map((im, k) => <figure key={k}><img src={im.src} alt={im.alt || s.heading} loading="lazy" />{im.caption && <figcaption>{im.caption}</figcaption>}</figure>)}</div>
      )}
      {arr(extra.paragraphsEnd).filter(Boolean).map((t, k) => <p key={`e${k}`}>{lk(t)}</p>)}
    </section>
  );
}

const STRIKING = [
  { slug: "bagcilar", label: "Bağcılar tesisatçı" },
  { slug: "cekmekoy", label: "Çekmeköy tesisatçı" },
  { slug: "bahcelievler", label: "Bahçelievler tesisatçı" },
  { slug: "gaziosmanpasa", label: "Gaziosmanpaşa tesisatçı" },
  { slug: "kadikoy", label: "Kadıköy tesisatçı" },
  { slug: "atasehir", label: "Ataşehir tesisatçı" },
];

/* ---------------- page ---------------- */
export function GtPost(ctx: GtPostCtx) {
  const { p, sections, faq, service, related, silo, nearbyDistricts, lk } = ctx;
  const toc = [...sections.map((s, i) => ({ id: `sec-${i}`, label: s.heading })), ...(faq.length ? [{ id: "sss", label: "Sıkça Sorulan Sorular" }] : [])];
  const tLen = p.title.length;
  const resp = service?.responseMin ?? 30;
  const showShort = !!(p.intro && p.excerpt && p.excerpt.trim() !== p.intro.trim());
  const bookHref = "/randevu";
  const svcWa = `${WA}?text=${encodeURIComponent(`Merhaba Gölge Tesisat, "${p.title}" rehberinizi okudum. Destek almak istiyorum.`)}`;
  return (
    <WithFx toc={toc} readMin={p.readMin || 5}>
      {(fx) => {
        // Body is built in reading order so the shared in-content link budget is spent top-down.
        const body = sections.map((s, i) => (
          <div key={`${i}-${s.heading}`}>
            {Section({ s, i, lk, alt: p.keyword || p.title })}
            {i === 1 && sections.length > 3 && (
              <div className="icta">
                <div><b>Sorun devam mı ediyor?</b><span>Kendiniz uğraşmayın — ustamız ortalama {resp} dakikada kapınızda, keşif ücretsiz. 7/24 açığız.</span></div>
                <div className="r">
                  <a className="btn bw" href={PHONE_HREF}><Phone />Hemen ara</a>
                  <a className="btn bg" href={svcWa} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        ));
        const faqNode = faq.length > 0 ? (
          <section className="sec" id="sss"><h2><span className="n">{sections.length + 1}</span>Sıkça Sorulan Sorular</h2><Faq items={faq} lk={lk} /></section>
        ) : null;
        const sibs = ctx.siblings();
        const prevNext = [silo.prev, silo.next].filter((x): x is BlogPost => !!x && !related.some((r) => r.slug === x.slug));
        return (
          <div className="gt-post">
            {fx.bar}
            <section className="hero">
              <div className="wrap">
                <nav className="crumbs" aria-label="Breadcrumb">
                  <ol>
                    <li><Link to="/">Ana Sayfa</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li>{p.category}</li>
                    <li aria-current="page">{p.title.length > 48 ? `${p.title.slice(0, 46).trim()}…` : p.title}</li>
                  </ol>
                </nav>
                <div className="hero-g">
                  <div>
                    <Link className="cat" to="/blog"><b>REHBER</b>{p.category}</Link>
                    <h1 className={tLen > 80 ? "xlong" : tLen > 55 ? "long" : ""}><Title t={p.title} /></h1>
                    {(p.excerpt || p.metaDescription) && <p className="dek">{plain(p.excerpt || p.metaDescription)}</p>}
                    <div className="byline">
                      <div className="au"><span className="av">GT</span><div><b>Gölge Tesisat Ekibi</b><small>Tesisat rehberleri · İstanbul</small></div></div>
                      <div className="meta">
                        <span><CalendarDays size={14} /><time dateTime={ctx.dateIso}>{ctx.updatedLabel}</time></span>
                        <span><Clock size={14} /><b className="num">{p.readMin}</b>&nbsp;dk okuma</span>
                      </div>
                      <Share title={p.title} />
                    </div>
                  </div>
                  {p.featuredImage?.src ? (
                    <div className="art">
                      <img src={p.featuredImage.src} alt={p.featuredImage.alt || `${p.keyword} — Gölge Tesisat`} width={1280} height={720} fetchPriority="high" decoding="async" />
                      {p.featuredImage.caption && <span className="tag"><i />{p.featuredImage.caption}</span>}
                    </div>
                  ) : (
                    <div className="art ph" aria-hidden="true"><b>{p.category}<br /><em>Rehberi</em></b><span className="tag"><i />Gölge Tesisat · 7/24</span></div>
                  )}
                </div>
              </div>
            </section>

            <div className="wrap layout">
              {fx.side}
              <article className="art-body" id="post">
                <p className="lede">{ctx.intro}</p>
                {showShort && <div className="short"><small>KISA CEVAP</small><p>{plain(p.excerpt)}</p></div>}
                {ctx.guideLinks.length > 0 && (
                  <div className="glinks">
                    {ctx.guideLinks.map((g) => <span key={g.post.slug}>{g.label}: <Link to="/blog/$slug" params={{ slug: g.post.slug }}>{g.post.title}</Link></span>)}
                  </div>
                )}
                {service && p.slug === "su-patlamasi-ilk-mudahale" ? (
                  <div className="urgent">
                    <p>Şu anda su akıtıyor musunuz? Ana vanayı kapattıktan sonra hemen arayın — acil müdahale, 7/24.</p>
                    <div className="r"><a className="btn bw" href={PHONE_HREF}><Phone size={18} />Hemen ara: {PHONE}</a><a className="btn bg" href={WA} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp</a></div>
                  </div>
                ) : service ? (
                  <Link className="svc" to="/hizmet/$slug" params={{ slug: service.slug }}>
                    <span className="ic"><Wrench /></span>
                    <span><b>Usta mı lazım?</b> İstanbul’da profesyonel <strong>{service.name}</strong> hizmetimiz — ücretsiz keşif, 7/24.</span>
                    <em>→</em>
                  </Link>
                ) : null}

                {body}

                {service && (
                  <div className="icta ink" id="post-cta">
                    <div><b>{service.name} için profesyonel destek</b><span>Kendiniz çözemediğiniz durumlarda 7/24 açık hattımızı arayın; ortalama {service.responseMin} dakikada kapınızdayız, keşif ücretsiz.</span></div>
                    <div className="r">
                      <a className="btn btn-red" href={PHONE_HREF}><Phone size={18} />{PHONE}</a>
                      <a className="btn btn-wa" href={svcWa} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp</a>
                    </div>
                    <Link className="lnk" to="/hizmet/$slug" params={{ slug: service.slug }}>{service.name} hizmeti hakkında detaylı bilgi →</Link>
                  </div>
                )}

                {faqNode}

                <div className="end">
                  {sibs.length > 0 && (
                    <div className="hub"><b>Bununla ilgili</b><ul>{sibs.map((h) => <li key={h.slug}><Link to="/blog/$slug" params={{ slug: h.slug }}>{h.title}</Link></li>)}</ul></div>
                  )}
                  {ctx.hub.length > 0 && (
                    <div className="hub" id="konu-rehberleri"><b>Bu konudaki tüm rehberler</b><small>{ctx.hub.length} rehber · aradığınız soruna doğrudan gidin</small><ul>{ctx.hub.map((h) => <li key={h.slug}><Link to="/blog/$slug" params={{ slug: h.slug }}>{h.title}</Link></li>)}</ul></div>
                  )}
                  <Helpful />
                  <div className="abox"><span className="av">GT</span><div><b>Gölge Tesisat Ekibi</b><p>İstanbul’daki saha ekiplerimizin deneyimiyle hazırlanan tesisat ve ısıtma rehberleri — güvenle kendiniz kontrol edebilmeniz ve ne zaman usta çağırmanız gerektiğini bilmeniz için.</p></div></div>
                  {prevNext.length > 0 && (
                    <div className="pn">
                      {prevNext.map((s) => (
                        <Link key={s.slug} to="/blog/$slug" params={{ slug: s.slug }}>
                          <small>{silo.prev?.slug === s.slug ? "← ÖNCEKİ REHBER" : "SONRAKİ REHBER →"}</small><b>{s.title}</b>
                        </Link>
                      ))}
                    </div>
                  )}
                  <div className="hub">
                    <b>İstanbul’da yakınınızdaki tesisatçı</b>
                    <div className="chips">
                      {STRIKING.map((d) => <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }}><MapPin />{d.label}</Link>)}
                      {service && [{ slug: "bagcilar", name: "Bağcılar" }, { slug: "cekmekoy", name: "Çekmeköy" }].map((d) => (
                        <Link key={`s-${d.slug}`} to="/tesisatci/$slug/$service" params={{ slug: d.slug, service: service.slug }}><MapPin />{d.name} {service.name.toLocaleLowerCase("tr")}</Link>
                      ))}
                    </div>
                  </div>
                  {service && (
                    <div className="hub">
                      <b>{service.shortName} hizmeti verdiğimiz bölgeler</b>
                      <div className="chips">
                        {nearbyDistricts.map((d) => <Link key={d.slug} to="/tesisatci/$slug/$service" params={{ slug: d.slug, service: service.slug }}><MapPin />{d.name} {service.shortName}</Link>)}
                      </div>
                    </div>
                  )}
                </div>
              </article>

              <aside className="rail" aria-label="Yardım">
                <div className="rcard">
                  <small><i />7/24 · EKİPLER SAHADA</small>
                  <b>{service ? `${service.shortName} için yardım mı lazım?` : "Yardım mı lazım?"}</b>
                  <p>Ücretsiz keşif. İşe başlamadan önce net fiyat. Ortalama {resp} dakikada kapınızda.</p>
                  <a className="btn btn-red" href={PHONE_HREF}><Phone />{PHONE}</a>
                  <a className="btn btn-wa" href={svcWa} target="_blank" rel="noopener noreferrer"><MessageCircle />Fotoğraf gönder</a>
                  <Link className="btn btn-line" to={bookHref}>Randevu al</Link>
                </div>
                <div className="mini">
                  <small>NEDEN GÖLGE TESİSAT</small>
                  <div className="row">
                    <div><b className="num">~{resp}</b><span>dk varış</span></div>
                    <div><b className="num">7/24</b><span>açık hat</span></div>
                    <div><b className="num">39</b><span>ilçe</span></div>
                    <div><b className="num">0 ₺</b><span>keşif</span></div>
                  </div>
                </div>
              </aside>
            </div>

            {related.length > 0 && (
              <section className="rel">
                <div className="wrap">
                  <h2>Okumaya <em>devam edin</em></h2>
                  <div className="rg">
                    {related.map((r) => (
                      <Link key={r.slug} className="rc" to="/blog/$slug" params={{ slug: r.slug }}>
                        {r.featuredImage?.src
                          ? <div className="th"><img src={r.featuredImage.src} alt={r.featuredImage.alt || r.title} loading="lazy" /></div>
                          : <div className="th ph"><span>{r.category}</span></div>}
                        <div className="bd"><small>{(r.category || "REHBER").toLocaleUpperCase("tr")} · {r.readMin} DK</small><b>{r.title}</b><em>Oku →</em></div>
                      </Link>
                    ))}
                  </div>
                  <div className="more"><Link className="btn btn-red" to="/blog">Tüm yazılar <ArrowRight size={18} /></Link></div>
                </div>
              </section>
            )}
            {fx.mobile}
          </div>
        );
      }}
    </WithFx>
  );
}

