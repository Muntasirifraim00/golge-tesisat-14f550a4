import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, X, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import type { Service } from "@/data/services";
import { getPromoForPost } from "@/lib/blog-promo";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS } from "@/data/business";

const DELAY_MS = 10_000;
const KEY = "gt_promo_dismissed";

function pushDL(event: string, data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push({ event, ...data });
}

export function ServicePromoToast({ post, service, hideWhenId }: { post: BlogPost; service?: Service; hideWhenId?: string }) {
  const promo = getPromoForPost(post, service);
  const [show, setShow] = useState(false);
  const [atCta, setAtCta] = useState(false);
  const meta = { post_slug: post.slug, service: promo.serviceSlug, intent: promo.intent };

  useEffect(() => {
    setShow(false);
    try {
      if (localStorage.getItem(KEY) === new Date().toDateString()) return;
    } catch { /* ignore */ }
    let elapsed = false;
    let scrolled = window.scrollY >= 150;
    let shown = false;
    const tryShow = () => {
      if (shown || !elapsed || !scrolled) return;
      shown = true;
      setShow(true);
      trackEvent("promo_view", post.slug, meta);
      pushDL("promo_view", meta);
    };
    const onScroll = () => {
      if (window.scrollY >= 150) { scrolled = true; tryShow(); }
    };
    const t = window.setTimeout(() => { elapsed = true; tryShow(); }, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  useEffect(() => {
    if (!hideWhenId) return;
    const el = document.getElementById(hideWhenId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setAtCta(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [hideWhenId, post.slug]);

  if (!show) return null;

  const dismiss = () => {
    setShow(false);
    try { localStorage.setItem(KEY, new Date().toDateString()); } catch { /* ignore */ }
    trackEvent("promo_dismiss", post.slug, meta);
    pushDL("promo_dismiss", meta);
  };
  const onCall = () => { trackEvent("promo_call", post.slug, meta); pushDL("promo_call", meta); };
  const onWa = () => { trackEvent("promo_whatsapp", post.slug, meta); pushDL("promo_whatsapp", meta); };

  const waHref = `${BUSINESS.whatsappHref}?text=${encodeURIComponent(`Merhaba, ${promo.serviceName} için bilgi almak istiyorum.`)}`;
  const callBtn = (
    <a href={BUSINESS.phoneHref} onClick={onCall} className="promo-btn-primary flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-red px-3 py-2.5 text-[13px] font-extrabold text-brand-red-foreground">
      <Phone className="h-3.5 w-3.5" /> Hemen Ara
    </a>
  );
  const waBtn = (primary: boolean) => (
    <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={onWa}
      className={primary
        ? "promo-btn-primary flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-whatsapp px-3 py-2.5 text-[13px] font-extrabold text-whatsapp-foreground"
        : "flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5 text-[13px] font-bold text-foreground hover:border-whatsapp hover:text-whatsapp"}>
      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
    </a>
  );
  const buttons = promo.primary === "whatsapp" ? <>{waBtn(true)}{callBtn}</> : <>{callBtn}{waBtn(false)}</>;

  return (
    <aside
      role="complementary"
      aria-label={`${promo.serviceName} kampanyası`}
      className={`promo-card fixed z-40 transition-[opacity,transform] duration-500 ${atCta ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"}
        inset-x-3 bottom-[108px] md:inset-x-auto md:bottom-6 md:right-6 md:w-[300px]`}
    >
      <div className="promo-glow relative overflow-hidden rounded-2xl border border-brand-red/30 bg-background/90 backdrop-blur-xl">
        <button onClick={dismiss} aria-label="Kapat"
          className="absolute right-2 top-2 z-10 grid h-7 w-7 place-items-center rounded-full bg-background/80 text-muted-foreground shadow-sm backdrop-blur hover:text-foreground">
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Image band — desktop square card only */}
        <div className="relative hidden h-[110px] overflow-hidden md:block">
          <img src={promo.image} alt={`İstanbul ${promo.serviceName} — Gölge Tesisat`} loading="lazy" className="promo-zoom h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-brand-red px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-red-foreground shadow">
            <span className="promo-live h-1.5 w-1.5 rounded-full bg-brand-red-foreground" /> {promo.badge}
          </span>
        </div>

        <div className="flex gap-3 p-3 md:block md:p-4 md:pt-1">
          <img src={promo.image} alt={`İstanbul ${promo.serviceName} — Gölge Tesisat`} loading="lazy" className="h-14 w-14 shrink-0 rounded-xl object-cover md:hidden" />
          <div className="min-w-0 flex-1 pr-6 md:pr-0">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-red">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              {promo.serviceName}
            </div>
            <p className="mt-1 text-[15px] font-extrabold leading-snug text-foreground md:text-[17px]">{promo.headline}</p>
            <p className="mt-1 hidden text-[12px] leading-snug text-muted-foreground md:block">{promo.sub}</p>
          </div>
        </div>

        <div className="hidden gap-2 px-4 pb-3 md:flex">{buttons}</div>
        <div className="-mt-1 pb-3 pl-[80px] md:mt-0 md:px-4">
          <Link to={promo.link.to} params={promo.link.slug ? { slug: promo.link.slug } : undefined as never}
            className="inline-flex items-center gap-1 text-[12px] font-bold text-muted-foreground hover:text-brand-red">
            {promo.link.label} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
