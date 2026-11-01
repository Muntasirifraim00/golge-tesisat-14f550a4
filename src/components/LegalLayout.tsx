import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { GtChrome } from "@/components/gt/GtShell";
import { SiteFooter } from "@/components/SiteFooter";

// Legal pages in the new design (styles: .gt-legal in src/styles/gt.css): dark hero, tabs between the four
// legal pages, "in short" cards, a contents list built from the <h2> headings and a reading-progress bar.
type Card = { k: string; t: string; p: string };
type Props = { kicker: string; title: string; updated: string; lead?: string; cards?: Card[]; children: ReactNode };

const TABS = [
  { to: "/kvkk", label: "KVKK" },
  { to: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
  { to: "/cerez-politikasi", label: "Çerez Politikası" },
  { to: "/kullanim-kosullari", label: "Kullanım Koşulları" },
] as const;

const slug = (t: string) => t.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function LegalLayout({ kicker, title, updated, lead, cards, children }: Props) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const docRef = useRef<HTMLElement>(null);
  const [toc, setToc] = useState<{ id: string; label: string }[]>([]);
  const [cur, setCur] = useState(0);
  const [prog, setProg] = useState(0);
  const [fill, setFill] = useState(0);
  const tocRef = useRef<HTMLElement>(null);
  const [mins, setMins] = useState(1);

  useEffect(() => {
    const doc = docRef.current;
    if (!doc) return;
    const hs = [...doc.querySelectorAll("h2")];
    const items = hs.map((h, i) => { if (!h.id) h.id = slug(h.textContent || `bolum-${i + 1}`) || `bolum-${i + 1}`; return { id: h.id, label: (h.textContent || "").replace(/^\d+\.\s*/, "") }; });
    setToc(items);
    setMins(Math.max(1, Math.round((doc.innerText || "").split(/\s+/).length / 220)));
    const on = () => {
      let c = 0;
      hs.forEach((h, i) => { if (h.getBoundingClientRect().top < 140) c = i; });
      setCur(c);
      const r = doc.getBoundingClientRect();
      setProg(Math.min(1, Math.max(0, (innerHeight - r.top) / (r.height + innerHeight * 0.2))));
      const a = tocRef.current?.querySelectorAll("a")[c] as HTMLElement | undefined;
      if (a) setFill(a.offsetTop + a.offsetHeight - 4);
    };
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    on();
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, [path]);

  const go = (e: { preventDefault: () => void }, id: string) => {
    e.preventDefault();
    const t = document.getElementById(id);
    if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <GtChrome />
      <div className="gt-legal" lang="tr">
        <div className="progress" style={{ width: `${prog * 100}%` }} />
        <nav className="tabs" aria-label="Yasal sayfalar">
          <div className="wrap">
            {TABS.map((t) => (
              <Link key={t.to} className="tab" to={t.to} aria-current={path === t.to ? "page" : undefined}>{t.label}</Link>
            ))}
          </div>
        </nav>
        <main>
          <section className="hero">
            <div className="wrap">
              <nav className="crumbs" aria-label="Breadcrumb"><ol><li><Link to="/">Ana Sayfa</Link></li><li><Link to="/kvkk">Yasal</Link></li><li aria-current="page">{title}</li></ol></nav>
              <span className="kick">{kicker}</span>
              <h1>{title}</h1>
              {lead && <p className="lead">{lead}</p>}
              <div className="meta">
                <span>Son güncelleme <b>{updated}</b></span>
                <span><b>{mins} dk</b> okuma</span>
                {toc.length > 0 && <span><b>{toc.length}</b> bölüm</span>}
                <button type="button" className="btn btn-ghost" onClick={() => window.print()}>Yazdır / PDF</button>
              </div>
            </div>
          </section>
          {cards && cards.length > 0 && (
            <div className="wrap short">
              <div className="sg">{cards.map((c) => <div key={c.t} className="sc"><small>{c.k}</small><b>{c.t}</b><p>{c.p}</p></div>)}</div>
            </div>
          )}
          <div className="wrap body" style={cards && cards.length ? undefined : { paddingTop: 40 }}>
            <aside className="toc" aria-label="İçindekiler">
              <small>İÇİNDEKİLER</small>
              <nav className="tocl" ref={tocRef}>
                <span className="fill" style={{ height: fill }} />
                {toc.map((t, i) => <a key={t.id} href={`#${t.id}`} className={i === cur ? "on" : ""} onClick={(e) => go(e, t.id)}>{t.label}</a>)}
              </nav>
              <div className="side-cta">
                <b>Verilerinizle ilgili bir sorunuz mu var?</b>
                Bizi arayın veya WhatsApp’tan yazın — talebinizi en geç 30 gün içinde ücretsiz yanıtlarız.
                <a className="btn btn-ink" href="tel:+905338960503">0533 896 05 03</a>
              </div>
            </aside>
            <article className="doc" ref={docRef}>{children}</article>
          </div>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
