import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackPageView, trackFormStart, trackBlogReadComplete, segmentsFor } from "@/lib/ga4";

/**
 * GA4 gelişmiş ölçüm: SPA sayfa görüntüleme, form_start ve blog okuma tamamlama.
 * Scroll derinliği, outbound tıklama ve 30 sn etkileşim GTM tarafında ölçülür.
 */
export function GA4Tracker() {
  const location = useLocation();
  const path = location.pathname;
  const startedForms = useRef<Set<string>>(new Set());
  const readSent = useRef<string>("");

  // SPA page_view
  useEffect(() => {
    const id = window.setTimeout(() => trackPageView(path), 60);
    return () => window.clearTimeout(id);
  }, [path]);

  // form_start (ilk odak / ilk yazma)
  useEffect(() => {
    startedForms.current = new Set();
    function onFocus(ev: Event) {
      const el = ev.target as HTMLElement | null;
      if (!el) return;
      if (!/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      const form = el.closest("form");
      const name =
        form?.getAttribute("data-form-name") ||
        form?.getAttribute("id") ||
        form?.getAttribute("name") ||
        (path.includes("randevu") ? "booking_form" : "site_form");
      if (startedForms.current.has(name)) return;
      startedForms.current.add(name);
      trackFormStart(name);
    }
    document.addEventListener("focusin", onFocus, true);
    return () => document.removeEventListener("focusin", onFocus, true);
  }, [path]);

  // blog_read_complete (yazının %90'ı görüldüğünde)
  useEffect(() => {
    const { blogSlug } = segmentsFor(path);
    if (!blogSlug) return;
    function onScroll() {
      const doc = document.documentElement;
      const pct = (window.scrollY + window.innerHeight) / doc.scrollHeight;
      if (pct >= 0.9 && readSent.current !== blogSlug) {
        readSent.current = blogSlug;
        trackBlogReadComplete(blogSlug);
        window.removeEventListener("scroll", onScroll);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [path]);

  return null;
}
