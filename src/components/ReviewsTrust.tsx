import { Star, ShieldCheck, Award, BadgeCheck, Clock } from "lucide-react";
import type { Review } from "@/data/reviews";

type Props = {
  ratingValue: string;
  reviewCount: number;
  reviews: Review[];
  /** Heading for the reviews block, e.g. "Kadıköy Müşteri Yorumları". */
  heading?: string;
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= count
              ? "h-4 w-4 fill-amber-400 text-amber-400"
              : "h-4 w-4 text-muted-foreground/40"
          }
        />
      ))}
    </div>
  );
}

// Phase 13 — visible reviews that match the Review JSON-LD, plus E-E-A-T
// credential signals (licensed/insured, experience, certification, guarantee).
export function ReviewsTrust({ ratingValue, reviewCount, reviews, heading = "Müşteri Yorumları" }: Props) {
  return (
    <section className="px-4 pt-8" aria-label="Müşteri yorumları ve güven">
      <h2 className="text-[16px] font-extrabold">{heading}</h2>

      <div className="mt-2 flex items-center gap-2">
        <Stars count={5} />
        <span className="text-[12px] font-bold">{ratingValue} / 5.0</span>
        <span className="text-[11px] text-muted-foreground">
          ({reviewCount.toLocaleString("tr-TR")}+ değerlendirme)
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {reviews.map((r, idx) => (
          <figure key={idx} className="rounded-xl border border-border bg-surface p-3">
            <div className="flex items-center justify-between">
              <figcaption className="text-[13px] font-extrabold">{r.author}</figcaption>
              <Stars count={r.rating} />
            </div>
            <blockquote className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
              "{r.body}"
            </blockquote>
            <time className="mt-1.5 block text-[10px] text-muted-foreground/70" dateTime={r.datePublished}>
              {new Date(r.datePublished).toLocaleDateString("tr-TR", { year: "numeric", month: "long" })}
            </time>
          </figure>
        ))}
      </div>

      {/* E-E-A-T credential signals */}
      <ul className="mt-4 grid grid-cols-2 gap-2">
        <li className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-[11px] font-semibold">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" /> Ruhsatlı &amp; sigortalı ekip
        </li>
        <li className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-[11px] font-semibold">
          <Award className="h-4 w-4 shrink-0 text-brand-red" /> 15+ yıl saha tecrübesi
        </li>
        <li className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-[11px] font-semibold">
          <BadgeCheck className="h-4 w-4 shrink-0 text-brand-red" /> Sertifikalı doğalgaz ustası
        </li>
        <li className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-[11px] font-semibold">
          <Clock className="h-4 w-4 shrink-0 text-emerald-600" /> 2 yıl işçilik garantisi
        </li>
      </ul>
    </section>
  );
}
