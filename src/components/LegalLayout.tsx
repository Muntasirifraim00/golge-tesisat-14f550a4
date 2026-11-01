import { Link } from "@tanstack/react-router";
import { ArrowLeft, Phone, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { GtChrome } from "@/components/gt/GtShell";
import { SiteFooter } from "@/components/SiteFooter";

type Props = { kicker: string; title: string; updated: string; children: ReactNode };

export function LegalLayout({ kicker, title, updated, children }: Props) {
  return (
    <div className="sp min-h-screen">
      <GtChrome />
      <section className="sp-hero px-4 pb-10 pt-6">
        <div className="mx-auto max-w-3xl">
          <Link to="/" className="sp-mono inline-flex items-center gap-1 text-[10px] opacity-80 hover:opacity-100">
            <ArrowLeft className="h-3.5 w-3.5" /> Ana Sayfa
          </Link>
          <div className="sp-mono mt-6 flex w-fit items-center gap-1.5 rounded-full border border-current/20 px-3 py-1 text-[10px]">
            <ShieldCheck className="h-3.5 w-3.5" /> {kicker}
          </div>
          <h1 className="sp-display mt-4 text-[44px] md:text-[68px]">{title}</h1>
          <p className="sp-mono mt-3 text-[10px] opacity-70">Son güncelleme: {updated}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-4">
        <div className="sp-pipe -mt-1" aria-hidden="true" />
        <article className="sp-legal mt-6 rounded-[1.6rem] border border-[var(--sp-line)] bg-[var(--sp-paper)] p-5 text-[14px] leading-relaxed md:p-10">
          {children}
        </article>
        <div className="sp-btn-ink mt-6 flex flex-col items-start justify-between gap-3 rounded-[1.6rem] p-5 md:flex-row md:items-center">
          <div>
            <div className="sp-display text-[26px]">Sorunuz mu var?</div>
            <p className="text-[13px] opacity-80">Verilerinizle ilgili her talep için bize ulaşın.</p>
          </div>
          <a href="tel:+905338960503" className="sp-btn-red inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[13px] font-extrabold">
            <Phone className="h-4 w-4" /> 0533 896 05 03
          </a>
        </div>
      </div>
      <div className="mt-16"><SiteFooter /></div>
    </div>
  );
}
