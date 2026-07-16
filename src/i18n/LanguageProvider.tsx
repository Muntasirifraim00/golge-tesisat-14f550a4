import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { dictionary, type Dict, type Lang } from "./dictionary";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx | null>(null);

const GEO_CACHE_KEY = "geo_country";
const GEO_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

function readStored(): Lang | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem("lang") as Lang | null;
    if (saved === "tr" || saved === "en") return saved;
  } catch {
    // ignore
  }
  return null;
}

function detectFromNavigator(): Lang {
  const nav = typeof navigator !== "undefined" ? navigator.language?.toLowerCase() ?? "" : "";
  return nav.startsWith("tr") ? "tr" : "en";
}

function readCachedGeo(): string | null {
  try {
    const raw = window.localStorage.getItem(GEO_CACHE_KEY);
    if (!raw) return null;
    const { country, ts } = JSON.parse(raw) as { country: string; ts: number };
    if (Date.now() - ts > GEO_CACHE_TTL) return null;
    return country || null;
  } catch {
    return null;
  }
}

function writeCachedGeo(country: string) {
  try {
    window.localStorage.setItem(GEO_CACHE_KEY, JSON.stringify({ country, ts: Date.now() }));
  } catch {
    // ignore
  }
}

async function detectFromGeo(): Promise<string | null> {
  const cached = readCachedGeo();
  if (cached) return cached;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch("https://ipapi.co/country/", { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const country = (await res.text()).trim().toUpperCase();
    if (country && country.length === 2) {
      writeCachedGeo(country);
      return country;
    }
  } catch {
    // ignore
  }
  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR-safe: start with "tr" (Turkish business default), then refine on mount.
  const [lang, setLangState] = useState<Lang>("tr");
  const [userPicked, setUserPicked] = useState(false);

  // Step 1: synchronous detection from storage / navigator on mount.
  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setLangState(stored);
      setUserPicked(true);
      return;
    }
    setLangState(detectFromNavigator());
  }, []);

  // Step 2: async geo lookup overrides navigator default (but never overrides user choice).
  useEffect(() => {
    if (userPicked) return;
    let cancelled = false;
    detectFromGeo().then((country) => {
      if (cancelled || !country) return;
      // Re-check userPicked at resolution time
      if (readStored()) return;
      if (country === "TR") setLangState("tr");
      else setLangState((prev) => (prev === "tr" && !readStored() ? detectFromNavigator() : prev));
    });
    return () => {
      cancelled = true;
    };
  }, [userPicked]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    try {
      window.localStorage.setItem("lang", l);
    } catch {
      // ignore
    }
    setUserPicked(true);
    setLangState(l);
  };

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: dictionary[lang] as Dict }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

/** Global floating TR/EN toggle. Renders on every route. */
export function GlobalLangToggle({ hideOnPaths = [] }: { hideOnPaths?: string[] }) {
  const { lang, setLang } = useLang();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setHidden(hideOnPaths.includes(window.location.pathname));
    check();
    window.addEventListener("popstate", check);
    return () => window.removeEventListener("popstate", check);
  }, [hideOnPaths]);

  if (hidden) return null;

  return (
    <div className="fixed right-3 top-3 z-[100] hidden md:inline-flex items-center rounded-lg border border-border bg-surface/95 p-0.5 text-[11px] font-extrabold shadow-md backdrop-blur">
      <button
        onClick={() => { setLang("tr"); void import("@/lib/analytics").then((m) => m.trackEvent("lang_toggle", "tr")); }}
        className={`rounded-md px-2 py-1 transition-colors ${lang === "tr" ? "bg-brand-red text-white" : "text-muted-foreground"}`}
        aria-pressed={lang === "tr"}
      >
        TR
      </button>
      <button
        onClick={() => { setLang("en"); void import("@/lib/analytics").then((m) => m.trackEvent("lang_toggle", "en")); }}
        className={`rounded-md px-2 py-1 transition-colors ${lang === "en" ? "bg-brand-red text-white" : "text-muted-foreground"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
