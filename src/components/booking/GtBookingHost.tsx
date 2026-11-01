// Site-wide booking popup: the same popup as the homepage, mounted once in the root layout on every
// public page except the homepage (which ships its own) and internal tools. Any link to /randevu or
// element with [data-book] opens it; requests are saved to `bookings` (admin panel) and the visitor
// then lands on /tesekkurler.
import { useEffect } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { BOOKING_HTML } from "./booking-html";
import { saveBooking, type BookingRecord } from "@/lib/save-booking";

const SKIP = /^\/(admin|studio|google-ads|SEO-overview|index-durumu|search-console|Desktop-view|blog-yazma-rehberi|lovable)/;

let scriptPromise: Promise<void> | null = null;
function loadScript() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "/booking/gt-booking.js?v=1";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => { scriptPromise = null; reject(new Error("booking popup failed to load")); };
    document.body.appendChild(s);
  });
  return scriptPromise;
}

export function useBookingHostVisible() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return path !== "/" && !SKIP.test(path);
}

export function GtBookingHost({ autoOpen = false }: { autoOpen?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    const w = window as unknown as Record<string, unknown> & { GTBooking?: { init: () => void }; openBooking?: (o?: object) => void };
    w.GT_THANKYOU_URL = "/tesekkurler";
    w.GT_NAVIGATE = (u: string) => { router.history.push(u); };
    w.GT_SAVE_BOOKING = (rec: BookingRecord) => saveBooking(rec, "site_popup");
    let alive = true;
    loadScript()
      .then(() => { if (alive) { w.GTBooking?.init(); w.__gtBookingReady = true; window.dispatchEvent(new Event("gt-booking-ready")); } })
      .catch((e) => console.warn(e));
    return () => { alive = false; w.__gtBookingReady = false; };
  }, [router]);
  useEffect(() => {
    if (!autoOpen) return;
    const w = window as unknown as { __gtBookingReady?: boolean; openBooking?: (o?: object) => void };
    const go = () => setTimeout(() => w.openBooking?.({}), 120);
    if (w.__gtBookingReady) { go(); return; }
    window.addEventListener("gt-booking-ready", go, { once: true });
    return () => window.removeEventListener("gt-booking-ready", go);
  }, [autoOpen]);
  return <div id="gt-booking-host" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: BOOKING_HTML }} />;
}
