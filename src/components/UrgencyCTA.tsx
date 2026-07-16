import { Link } from "@tanstack/react-router";
import { Siren, CalendarClock, ArrowRight } from "lucide-react";

/**
 * Sitewide conversion link strip. Sits on content pages (service, district,
 * blog) and channels link equity + users toward the two highest-intent routes:
 * the 7/24 emergency hub and the booking page. Keeps money pages ≤1 click from
 * any content page.
 */
export function UrgencyCTA() {
  return (
    <section className="px-4 pt-8">
      <div className="rounded-2xl border border-brand-red/30 bg-brand-red/5 p-4">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-red">
          <Siren className="h-3.5 w-3.5" /> Acil bir durum mu var?
        </div>
        <p className="mt-1.5 text-[13px] font-semibold leading-snug">
          Su kaçağı, patlak boru ya da tıkanıklık beklemez. 7/24 ekibimiz hazır.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            to="/acil-tesisatci"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-red px-3 py-2.5 text-[12px] font-extrabold text-white"
          >
            <Siren className="h-4 w-4" /> Acil Tesisatçı
          </Link>
          <Link
            to="/randevu"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-red px-3 py-2.5 text-[12px] font-extrabold text-brand-red hover:bg-brand-red/10"
          >
            <CalendarClock className="h-4 w-4" /> Randevu Al
          </Link>
        </div>
        <Link
          to="/hizmetler"
          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red"
        >
          Tüm hizmetleri gör <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}
