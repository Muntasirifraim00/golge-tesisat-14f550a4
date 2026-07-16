import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";

const KEY = "kvkk-cookie-consent-v1";

export function CookieBanner() {
  const { lang } = useLang();
  const en = lang === "en";
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { if (!localStorage.getItem(KEY)) setShow(true); } catch {}
  }, []);

  const decide = (value: "accept" | "reject") => {
    try { localStorage.setItem(KEY, value); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-[76px] z-40 px-3 sm:bottom-4">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface/95 p-4 shadow-2xl backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-red/10">
            <Cookie className="h-5 w-5 text-brand-red" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <div className="text-[13px] font-extrabold text-foreground">
                {en ? "Cookie & Privacy Notice" : "Çerez ve KVKK Bilgilendirmesi"}
              </div>
              <button onClick={() => decide("reject")} aria-label={en ? "Close" : "Kapat"} className="rounded-md p-1 text-muted-foreground hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-[11.5px] leading-snug text-muted-foreground">
              {en ? (
                <>Our site uses cookies to improve your experience. By continuing you accept our{" "}
                  <a href="/kvkk" className="font-bold text-brand-red underline">Privacy Notice</a> and{" "}
                  <a href="/cerez-politikasi" className="font-bold text-brand-red underline">Cookie Policy</a>.</>
              ) : (
                <>Sitemiz, deneyiminizi iyileştirmek ve hizmetlerimizi geliştirmek için çerezler kullanır.
                  Devam ederek <a href="/kvkk" className="font-bold text-brand-red underline">KVKK Aydınlatma Metni</a>'ni
                  ve <a href="/cerez-politikasi" className="font-bold text-brand-red underline">Çerez Politikası</a>'nı kabul etmiş olursunuz.</>
              )}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => decide("reject")} className="rounded-xl border border-border bg-surface-2 py-2 text-[12px] font-bold text-foreground">
                {en ? "Only Necessary" : "Sadece Gerekli"}
              </button>
              <button onClick={() => decide("accept")} className="rounded-xl bg-brand-red py-2 text-[12px] font-extrabold text-white shadow-lg shadow-brand-red/30">
                {en ? "Accept All" : "Tümünü Kabul Et"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
