import { useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

// Google Ads trafiğini (gclid/gbraid/wbraid) hizmet sayfalarından ana sayfaya
// yönlendirir. Organik trafik etkilenmez, böylece SEO sıralamaları korunur.
const AD_LANDING_PREFIXES = ["/acil-tesisatci", "/hizmet/", "/hizmetler"];

export function AdTrafficRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const isAdClick =
      params.has("gclid") || params.has("gbraid") || params.has("wbraid");
    if (!isAdClick) return;

    const path = location.pathname;
    if (!AD_LANDING_PREFIXES.some((p) => path.startsWith(p))) return;

    const slug = path.replace(/^\/hizmet\//, "").replace(/^\//, "").split("/")[0];
    params.set("hizmet", slug);
    navigate({ to: "/", search: Object.fromEntries(params) as never, replace: true });
  }, [location.pathname, navigate]);

  return null;
}
