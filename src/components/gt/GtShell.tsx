import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarCheck, Menu, MessageCircle, Phone, X } from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import { BUSINESS } from "@/data/business";
import { SiteFooter } from "@/components/SiteFooter";

// Shared shell for pages built on the new Gölge Tesisat design (.gt scope in src/styles/gt.css).
// Top bar → sticky header → page → site footer → mobile call bar.

export const NAV = [
  { to: "/hizmetler", label: "Hizmetler" },
  { to: "/tesisatci", label: "Bölgeler" },
  { to: "/fiyatlar", label: "Fiyatlar" },
  { to: "/blog", label: "Blog" },
  { to: "/acil-tesisatci", label: "Acil" },
] as const;

export function GtTopBar({ left, mid }: { left?: ReactNode; mid?: ReactNode }) {
  return (
    <div className="top">
      <div className="wrap">
        <span className="live"><i />{left ?? "7/24 açık · İstanbul'un iki yakası"}</span>
        <span className="gt-hide-s">{mid ?? "Ücretsiz keşif · KDV dahil sabit fiyat · 2 yıl garanti"}</span>
        <a href={BUSINESS.phoneHref} style={{ textDecoration: "none" }}><b>{BUSINESS.phoneDisplay}</b></a>
      </div>
    </div>
  );
}

export function GtHeader({ current, bookHref = "/randevu" }: { current?: string; bookHref?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className="head">
      <div className="wrap">
        <Link className="logo" to="/" aria-label="Gölge Tesisat — Ana sayfa">
          <img src={logoImg} alt="Gölge Tesisat logosu" width={40} height={40} />
          <div><b>Gölge Tesisat</b><small>İSTANBUL · 7/24</small></div>
        </Link>
        <nav className="nav" aria-label="Site">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} aria-current={current === n.to ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <a className="btn btn-ink" href={BUSINESS.phoneHref}><Phone className="ico gt-ring" />Ara</a>
        <a className="btn btn-red" href={bookHref}>Randevu al</a>
        <button type="button" className="menu-btn" aria-label="Menüyü aç" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={20} /></button>
      </div>
      {open && (
        <div className="mnav" role="dialog" aria-modal="true" aria-label="Menü" onClick={() => setOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <button type="button" className="x" aria-label="Menüyü kapat" onClick={() => setOpen(false)}><X size={20} /></button>
            <Link to="/" onClick={() => setOpen(false)}>Ana Sayfa</Link>
            {NAV.map((n) => <Link key={n.to} to={n.to} onClick={() => setOpen(false)}>{n.label}</Link>)}
            <Link to="/randevu" onClick={() => setOpen(false)}>Randevu Al</Link>
            <a className="btn btn-red" href={BUSINESS.phoneHref} style={{ marginTop: 10 }}><Phone className="ico" />{BUSINESS.phoneDisplay}</a>
            <a className="btn btn-wa" href={BUSINESS.whatsappHref} target="_blank" rel="noopener"><MessageCircle className="ico" />WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  );
}

export function GtMobileBar({ bookHref = "/randevu" }: { bookHref?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const f = () => setOn(scrollY > 380);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <div className={"mbar" + (on ? " on" : "")}>
      <a className="btn btn-ink" href={BUSINESS.phoneHref}><Phone className="ico" />Ara</a>
      <a className="btn btn-wa" href={BUSINESS.whatsappHref} target="_blank" rel="noopener"><MessageCircle className="ico" />WhatsApp</a>
      <a className="btn btn-red" href={bookHref}><CalendarCheck className="ico" />Randevu</a>
    </div>
  );
}

/** Reveal-on-scroll for elements with class "rv" inside the page. */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".gt .rv:not(.in)"));
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } }), { threshold: 0.1 });
    els.forEach((e) => o.observe(e));
    return () => o.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function GtPage({ children, current, bookHref, top }: { children: ReactNode; current?: string; bookHref?: string; top?: { left?: ReactNode; mid?: ReactNode } }) {
  return (
    <div className="gt">
      <GtTopBar {...top} />
      <GtHeader current={current} bookHref={bookHref} />
      {children}
      <SiteFooter />
      <GtMobileBar bookHref={bookHref} />
    </div>
  );
}

/** FAQ accordion in the new design. Keep `items` identical to the FAQPage JSON-LD. */
export function GtFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {items.map((x, i) => (
        <div key={x.q} className={"qa" + (open === i ? " open" : "")}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            {x.q}<span className="pl">+</span>
          </button>
          <div className="ans"><div><p>{x.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

/** New-design top bar + sticky header for pages that are not wrapped in .gt (legacy layouts). */
export function GtChrome({ current, bookHref, top }: { current?: string; bookHref?: string; top?: { left?: ReactNode; mid?: ReactNode } }) {
  return (
    <div className="gt gt-contents">
      <GtTopBar {...top} />
      <GtHeader current={current} bookHref={bookHref} />
    </div>
  );
}
