import { supabase } from "@/integrations/supabase/client";

// De-dupe alert emails: one click can fire trackEvent from several code paths.
const lastAlertAt: Record<string, number> = {};

/** Send an email alert to the owner when a call/WhatsApp CTA is clicked. */
function maybeSendContactAlert(
  event_name: string,
  label?: string,
  country?: string | null,
) {
  const type =
    event_name === "cta_call" ? "call" : event_name === "cta_whatsapp" ? "whatsapp" : null;
  if (!type) return;

  const now = Date.now();
  if (now - (lastAlertAt[type] ?? 0) < 8000) return; // debounce duplicate clicks
  lastAlertAt[type] = now;

  try {
    void fetch("/api/public/hooks/contact-alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        type,
        path: window.location.pathname.slice(0, 500),
        label: label ?? null,
        country: country ?? null,
        userAgent: navigator.userAgent.slice(0, 500),
      }),
    }).catch(() => {});
  } catch {
    /* ignore */
  }
}

/**
 * Fire-and-forget click / event tracking.
 * Never throws. Never blocks navigation or UI.
 */
export function trackEvent(
  event_name: string,
  label?: string,
  metadata?: Record<string, unknown>

) {
  if (typeof window === "undefined") return;
  try {
    let country: string | null = null;
    try {
      const raw = window.localStorage.getItem("geo_country");
      if (raw) {
        const parsed = JSON.parse(raw) as { country?: string };
        country = parsed?.country ?? null;
      }
    } catch {
      /* ignore */
    }

    let lang: string | null = null;
    try {
      lang = window.localStorage.getItem("lang");
    } catch {
      /* ignore */
    }

    const payload = {
      event_name: event_name.slice(0, 80),
      label: label ? label.slice(0, 200) : null,
      path: window.location.pathname.slice(0, 500),
      referrer: document.referrer ? document.referrer.slice(0, 500) : null,
      lang,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      country,
      user_agent: navigator.userAgent.slice(0, 500),
      metadata: (metadata ?? {}) as never,
    };

    void supabase
      .from("analytics_events")
      .insert(payload)
      .then(({ error }) => {
        if (error) console.warn("[analytics]", error.message);
      });

    maybeSendContactAlert(event_name, label, country);

  } catch (err) {
    console.warn("[analytics] failed", err);
  }
}
