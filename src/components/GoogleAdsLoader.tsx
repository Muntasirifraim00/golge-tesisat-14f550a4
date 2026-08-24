import { useEffect } from "react";
import { initGoogleAds } from "@/lib/google-ads";

/** Loads Google Ads gtag.js once on the client (no-op until IDs are filled in). */
export function GoogleAdsLoader() {
  useEffect(() => {
    initGoogleAds();
  }, []);
  return null;
}
