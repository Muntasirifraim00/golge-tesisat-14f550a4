/**
 * GA4 (G-PYX3G19381) — GTM dataLayer üzerinden gelişmiş ölçüm.
 * Tüm olaylar GTM'e (GTM-M89R8DRZ) push edilir; GA4 etiketleri GTM içinde tanımlıdır.
 */

export const GA4_MEASUREMENT_ID = "G-PYX3G19381";

/** Güvenli dataLayer push — asla hata fırlatmaz. */
export function pushDL(payload: Record<string, unknown>) {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
  } catch {
    /* tracking must never break the UI */
  }
}

/** URL yoluna göre GA4 içerik grubu (content_group). */
export function contentGroupFor(path: string): string {
  if (path === "/") return "anasayfa";
  if (path.startsWith("/blog")) return "blog";
  if (path.startsWith("/hizmet")) return "hizmet";
  if (path.startsWith("/tesisatci")) return "lokasyon";
  if (path.startsWith("/randevu")) return "randevu";
  if (path.startsWith("/acil")) return "acil";
  if (path.startsWith("/admin") || path.startsWith("/studio")) return "admin";
  return "diger";
}

/** /hizmet/{slug} veya /tesisatci/{ilce}/{hizmet} yollarından hizmet & ilçe çıkarımı. */
export function segmentsFor(path: string): { service: string; district: string; blogSlug: string } {
  const p = path.split("?")[0]!.split("#")[0]!.split("/").filter(Boolean);
  let service = "(not set)";
  let district = "(not set)";
  let blogSlug = "";
  if (p[0] === "hizmet" && p[1]) service = p[1];
  if (p[0] === "tesisatci" && p[1]) {
    district = p[1];
    if (p[2] && p[2] !== "mahalle") service = p[2];
  }
  if (p[0] === "blog" && p[1]) blogSlug = p[1];
  return { service, district, blogSlug };
}

/** SPA sayfa görüntüleme — her rota değişiminde çağrılır. */
export function trackPageView(path: string, title?: string) {
  const { service, district, blogSlug } = segmentsFor(path);
  pushDL({
    event: "virtual_page_view",
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : "",
    page_title: title ?? (typeof document !== "undefined" ? document.title : ""),
    content_group: contentGroupFor(path),
    service,
    district,
    blog_slug: blogSlug,
  });
}

/** Form ilk etkileşimi (form_start). */
export function trackFormStart(formName: string) {
  pushDL({ event: "form_start", form_name: formName });
}

/** Fiyat hesaplayıcı kullanımı. */
export function trackQuoteCalculated(service: string, value?: number) {
  pushDL({
    event: "quote_calculated",
    service,
    conv_value: value ?? 0,
    conv_currency: "TRY",
  });
}

/** Blog yazısının sonuna ulaşan okuyucu. */
export function trackBlogReadComplete(slug: string) {
  pushDL({ event: "blog_read_complete", blog_slug: slug });
}
