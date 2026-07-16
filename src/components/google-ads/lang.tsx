import { createContext, useContext, useState, type ReactNode } from "react";

export type GAdsLang = "en" | "tr";

const Ctx = createContext<{ lang: GAdsLang; setLang: (l: GAdsLang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function GAdsLangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<GAdsLang>("en");
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useGAdsLang() {
  return useContext(Ctx);
}

/** t(en, tr) helper — returns the right string based on context */
export function useT() {
  const { lang } = useGAdsLang();
  return (en: string, tr: string) => (lang === "tr" ? tr : en);
}

export function GAdsLangToggle() {
  const { lang, setLang } = useGAdsLang();
  return (
    <div className="inline-flex items-center gap-0 rounded-full border border-border/60 bg-card/60 p-0.5 backdrop-blur">
      {(["en", "tr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition ${
            lang === l
              ? "bg-brand-red text-white shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
