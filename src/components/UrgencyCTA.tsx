import { Link } from "@tanstack/react-router";
import { Siren, CalendarClock, ArrowRight } from "lucide-react";

/**
 * Sitewide conversion link strip. Sits on content pages (service, district,
 * blog) and channels link equity + users toward the two highest-intent routes:
 * the 7/24 emergency hub and the booking page. Keeps money pages ≤1 click from
 * any content page.
 *
 * Layout: a single rounded box card with a left "live" dot + label, headline,
 * sub-copy, and a responsive CTA row (filled primary + outlined secondary +
 * tertiary text link). On md+ the card grows padding and switches to a 2-col
 * grid (copy on the left, CTAs stacked on the right) so it stays balanced next
 * to wider sidebars.
 */
export function UrgencyCTA() {
  return (
    <section className="px-4 pt-6 md:px-6 md:pt-10">
      <div className="mx-auto max-w-5xl rounded-2xl border border-brand-red/30 bg-gradient-to-br from-brand-red/10 via-brand-red/5 to-transparent p-4 shadow-sm md:rounded-3xl md:p-6">
        <div className="grid gap-4 md:grid-cols-[1.4fr_auto] md:items-center md:gap-8">
          {/* Left: copy */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-red md:text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-red" />
              </span>
              Acil bir durum mu var?
            </div>

            <h3 className="mt-2 text-[14px] font-extrabold leading-tight md:text-[20px]">
              Su kaçağı, patlak boru ya da tıkanıklık{" "}
              <span className="text-brand-red">beklemez.</span>
            </h3>

            <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted-foreground md:text-[13px]">
              7/24 ruhsatlı ekibimiz İstanbul'un her noktasına ortalama 30 dakikada ulaşır — keşif ücretsiz.
            </p>
          </div>

          {/* Right: CTA stack */}
          <div className="grid grid-cols-2 gap-2 md:w-[260px] md:grid-cols-1 md:gap-2.5">
            <Link
              to="/acil-tesisatci"
              className="group flex items-center justify-center gap-1.5 rounded-lg bg-brand-red px-3 py-2.5 text-[12px] font-extrabold text-white shadow-md shadow-brand-red/20 transition hover:brightness-110 md:rounded-xl md:py-3 md:text-[13px]"
            >
              <Siren className="h-4 w-4" /> Acil Tesisatçı
              <ArrowRight className="hidden h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 md:inline" />
            </Link>
            <Link
              to="/randevu"
              className="flex items-center justify-center gap-1.5 rounded-lg border border-brand-red/60 bg-background px-3 py-2.5 text-[12px] font-extrabold text-brand-red transition hover:bg-brand-red/10 md:rounded-xl md:py-3 md:text-[13px]"
            >
              <CalendarClock className="h-4 w-4" /> Randevu Al
            </Link>
            <Link
              to="/hizmetler"
              className="col-span-2 inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-brand-red hover:underline md:col-span-1 md:justify-start"
            >
              Tüm hizmetleri gör <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
