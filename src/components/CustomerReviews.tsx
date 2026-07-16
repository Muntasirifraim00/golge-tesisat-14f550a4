import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type PublicReview = {
  id: string;
  name: string;
  district_name: string | null;
  rating: number;
  body: string;
  created_at: string;
};

// Phase 24 / per-district surfacing — displays approved, real customer reviews
// from the database. Complements the deterministic ReviewsTrust block; renders
// nothing until at least one approved review exists (so empty state never looks
// broken). Can be scoped by service and/or district for local social proof.
export function CustomerReviews({
  serviceSlug,
  districtSlug,
  districtName,
}: {
  serviceSlug?: string;
  districtSlug?: string;
  districtName?: string;
}) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [agg, setAgg] = useState<{ avg: number; count: number }>({ avg: 0, count: 0 });

  useEffect(() => {
    void (async () => {
      let list = supabase
        .from("reviews")
        .select("id, name, district_name, rating, body, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);
      let ratings = supabase
        .from("reviews")
        .select("rating")
        .eq("status", "approved")
        .limit(500);
      if (serviceSlug) {
        list = list.eq("service_slug", serviceSlug);
        ratings = ratings.eq("service_slug", serviceSlug);
      }
      if (districtSlug) {
        list = list.eq("district_slug", districtSlug);
        ratings = ratings.eq("district_slug", districtSlug);
      }
      const [{ data: listData }, { data: ratingData }] = await Promise.all([list, ratings]);
      setReviews((listData as PublicReview[]) ?? []);
      const rs = (ratingData as { rating: number }[]) ?? [];
      if (rs.length > 0) {
        const sum = rs.reduce((acc, r) => acc + (r.rating ?? 0), 0);
        setAgg({ avg: Math.round((sum / rs.length) * 10) / 10, count: rs.length });
      } else {
        setAgg({ avg: 0, count: 0 });
      }
    })();
  }, [serviceSlug, districtSlug]);

  if (reviews.length === 0) return null;

  const heading = districtName
    ? `${districtName} Müşterilerimiz Ne Diyor?`
    : "Müşterilerimiz Ne Diyor?";

  return (
    <section className="px-4 py-8" aria-label="Müşteri yorumları">
      <h2 className="text-center text-2xl font-extrabold">{heading}</h2>
      {agg.count > 0 && (
        <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 shadow-sm">
          <span className="flex items-center gap-0.5" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                className={`h-4 w-4 ${n <= Math.round(agg.avg) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
              />
            ))}
          </span>
          <span className="text-sm font-extrabold">{agg.avg.toFixed(1)}</span>
          <span className="text-xs font-semibold text-muted-foreground">
            · {agg.count} {districtName ? `${districtName} ` : ""}yorum
          </span>
        </div>
      )}
      <div className="mx-auto mt-5 grid max-w-3xl gap-3 sm:grid-cols-2">
        {reviews.map((r) => (
          <figure key={r.id} className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-0.5" aria-label={`${r.rating} yıldız`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  className={`h-4 w-4 ${n <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <blockquote className="mt-2 text-sm leading-relaxed text-foreground">{r.body}</blockquote>
            <figcaption className="mt-2 text-xs font-bold text-muted-foreground">
              {r.name}
              {r.district_name ? ` · ${r.district_name}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
