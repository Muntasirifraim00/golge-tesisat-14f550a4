import { useEffect, useRef, useState, type ReactNode } from "react";

// Animated problem → fix scene for each service, served as a self-contained
// widget from /public/sim/{slug}.html (canvas + its own CSS/JS, Turkish text).
// Embedded in an iframe so the heavy canvas code never touches the React bundle;
// the widget reports its height and is paused while scrolled off-screen.
export const SIM_SLUGS = new Set([
  "su-kacagi-tespiti", "tikaniklik-acma", "kombi-servisi", "petek-temizligi", "dogalgaz-tesisati",
  "kanal-goruntuleme", "kanalizasyon-acma", "tuvalet-tikanikligi-acma", "mutfak-gider-acma",
  "dusakabin-vitrifiye-montaji", "musluk-batarya-degisimi", "hidrofor-kurulumu", "kombi-montaji", "acil-tesisatci",
]);

export function ServiceSim({ slug, title, fallback }: { slug: string; title: string; fallback?: ReactNode }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [h, setH] = useState<number | null>(null);
  const src = `/sim/${slug}.html`;

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.source !== ref.current?.contentWindow) return;
      const d = e.data as { gtSimH?: number };
      if (d && typeof d.gtSimH === "number" && d.gtSimH > 100) setH(d.gtSimH + 4);
    };
    addEventListener("message", onMsg);
    const el = ref.current;
    let io: IntersectionObserver | null = null;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((x) => el.contentWindow?.postMessage({ gtSim: x.isIntersecting }, "*")), { threshold: 0.1 });
      io.observe(el);
    }
    return () => { removeEventListener("message", onMsg); io?.disconnect(); };
  }, [slug]);

  if (!SIM_SLUGS.has(slug)) return <>{fallback}</>;
  return (
    <div className="gt-sim" style={{ minHeight: h ? undefined : 420 }}>
      <iframe ref={ref} src={src} title={title} loading="eager" scrolling="no" style={{ height: h ?? undefined }} />
    </div>
  );
}
