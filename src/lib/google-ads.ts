/**
 * Google Ads conversion tracking (gtag.js)
 * ----------------------------------------
 * Google Ads hesabı: 475-562-1868
 *
 * BURAYA YAZILACAKLAR (Google Ads > Araçlar > Dönüşümler ekranından alınır):
 *   1. CONVERSION_ID   -> "AW-XXXXXXXXXX"  (tüm dönüşümlerde aynıdır)
 *   2. Her dönüşüm için LABEL -> "abcDEfgh12IjKlm" (etiket, her biri farklıdır)
 *
 * Etiketler girilene kadar hiçbir şey gönderilmez; site normal çalışır.
 */

export const GOOGLE_ADS_CONVERSION_ID = "AW-18366033946"; // আপনার Google Ads Conversion ID

/** Site içi olay adı -> Google Ads dönüşüm etiketi + varsayılan değer (TRY) */
export const GOOGLE_ADS_CONVERSIONS: Record<
  string,
  { label: string; value: number; currency: string }
> = {
  // 1) Telefon araması (tel: tıklaması)
  cta_call: { label: "FCjVCP_u3-YcEJrgzbVE", value: 300, currency: "TRY" },
  // 2) WhatsApp tıklaması
  cta_whatsapp: { label: "39fZCP_m4OYJrgzbVE", value: 200, currency: "TRY" },
  // 3) "Sizi arayalım" formu gönderimi
  callback_submit: { label: "8fAMCJn77uYcEJrgzbVE", value: 250, currency: "TRY" },
  // 4) Randevu formu gönderimi
  booking_submit: { label: "dLluCISB4eYcEJrgzbVE", value: 400, currency: "TRY" },
};

const PLACEHOLDER = /X{6,}|_LABEL$/;

export function isAdsConfigured() {
  return !PLACEHOLDER.test(GOOGLE_ADS_CONVERSION_ID);
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Loads gtag.js once, on the client. Safe to call multiple times. */
export function initGoogleAds() {
  if (typeof window === "undefined" || !isAdsConfigured()) return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  } as unknown as (...args: unknown[]) => void;

  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_CONVERSION_ID);

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_CONVERSION_ID}`;
  document.head.appendChild(s);
}

// Aynı tıklamanın birden fazla yerden tetiklenmesini engelle
const lastSent: Record<string, number> = {};

/** Fires a Google Ads conversion for a known site event. Never throws. */
export function fireAdsConversion(eventName: string, metadata?: Record<string, unknown>) {
  try {
    if (typeof window === "undefined" || !isAdsConfigured()) return;
    const conv = GOOGLE_ADS_CONVERSIONS[eventName];
    if (!conv || PLACEHOLDER.test(conv.label)) return;

    const now = Date.now();
    if (now - (lastSent[eventName] ?? 0) < 8000) return;
    lastSent[eventName] = now;

    initGoogleAds();
    window.gtag?.("event", "conversion", {
      send_to: `${GOOGLE_ADS_CONVERSION_ID}/${conv.label}`,
      value: conv.value,
      currency: conv.currency,
      transaction_id: `${eventName}-${now}`,
      ...(metadata ?? {}),
    });
  } catch {
    /* tracking must never break the UI */
  }
}
