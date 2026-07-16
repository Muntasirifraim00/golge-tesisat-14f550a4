import { Phone, MessageCircle, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { BUSINESS } from "@/data/business";
import { trackEvent } from "@/lib/analytics";

// Phase 15 — sticky mobile conversion bar. Two large (≥48px) tap targets so
// the primary call / WhatsApp actions are always one thumb-tap away on mobile.
// Phase 23 (CRO) — added a compact trust strip (ücretsiz keşif · ort. süre ·
// 7/24) directly above the CTAs to reduce hesitation at the point of action.
// Hidden on desktop where the inline CTAs are already visible above the fold.
export function StickyCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-3 pb-[env(safe-area-inset-bottom)] pt-1.5 backdrop-blur md:hidden">
      <div className="mb-1.5 flex items-center justify-center gap-3 text-[10px] font-bold text-muted-foreground">
        <span className="flex items-center gap-1">
          <BadgeCheck className="h-3 w-3 text-emerald-500" /> Ücretsiz keşif
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-brand-red" /> Ort. 30 dk
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-emerald-500" /> 7/24 acil
        </span>
      </div>
      <div className="flex gap-2">
        <a
          href={BUSINESS.phoneHref}
          onClick={() => trackEvent("cta_call", "sticky_bar", { phone: BUSINESS.phoneE164 })}
          aria-label={`Telefonla ara: ${BUSINESS.phoneDisplay}`}
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-brand-red px-3 text-[14px] font-extrabold text-white shadow-lg active:scale-[0.98]"
        >
          <Phone className="h-5 w-5" /> Hemen Ara
        </a>
        <a
          href={BUSINESS.whatsappHref}
          target="_blank"
          rel="noopener"
          onClick={() => trackEvent("cta_whatsapp", "sticky_bar", {})}
          aria-label="WhatsApp ile yazın"
          className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 text-[14px] font-extrabold text-white shadow-lg active:scale-[0.98]"
        >
          <MessageCircle className="h-5 w-5" /> WhatsApp
        </a>
      </div>
    </div>
  );
}
