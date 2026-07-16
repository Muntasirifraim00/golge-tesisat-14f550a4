import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Mount once at the app root. Delegates a single click listener on document
 * and emits a tracking event for known CTA patterns.
 */
export function GlobalClickTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    function handler(ev: MouseEvent) {
      const target = ev.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest<HTMLAnchorElement | HTMLButtonElement>("a, button");
      if (!a) return;

      const href = a.tagName === "A" ? (a as HTMLAnchorElement).getAttribute("href") || "" : "";
      const text = (a.textContent || "").trim().slice(0, 80);

      if (href.startsWith("tel:")) {
        trackEvent("cta_call", href.slice(4, 24), { text });
        return;
      }
      if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
        trackEvent("cta_whatsapp", "link", { text, href: href.slice(0, 200) });
        return;
      }
      if (href === "/randevu" || href.startsWith("/randevu")) {
        trackEvent("cta_book_now", "link", { text });
        return;
      }
      // Track other internal nav clicks lightly
      if (href.startsWith("/") && !href.startsWith("/admin")) {
        trackEvent("nav_click", href.slice(0, 60), { text });
      }
    }
    document.addEventListener("click", handler, { capture: true });
    return () => document.removeEventListener("click", handler, { capture: true } as any);
  }, []);
  return null;
}
