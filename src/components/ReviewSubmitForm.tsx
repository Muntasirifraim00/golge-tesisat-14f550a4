import { useState } from "react";
import { Star, Check, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DISTRICTS } from "@/data/districts";
import { trackEvent } from "@/lib/analytics";

// Phase 24 — public review submission. Inserts a `pending` review (RLS allows
// anon/authenticated insert only when status = 'pending'); it becomes visible
// after an admin approves it in /admin/reviews.
export function ReviewSubmitForm({
  serviceSlug,
  defaultDistrictSlug,
}: {
  serviceSlug?: string;
  defaultDistrictSlug?: string;
}) {
  const [name, setName] = useState("");
  const [districtSlug, setDistrictSlug] = useState(defaultDistrictSlug ?? "");
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Lütfen isminizi girin.");
    if (body.trim().length < 10) return setError("Yorumunuz en az 10 karakter olmalı.");
    setError("");
    setSubmitting(true);
    const district = DISTRICTS.find((d) => d.slug === districtSlug);
    const { error: insErr } = await supabase.from("reviews").insert({
      name: name.trim().slice(0, 80),
      body: body.trim().slice(0, 1500),
      rating,
      service_slug: serviceSlug ?? null,
      district_slug: district?.slug ?? null,
      district_name: district?.name ?? null,
      status: "pending",
    });
    setSubmitting(false);
    if (insErr) {
      setError("Yorum gönderilemedi, lütfen tekrar deneyin.");
      return;
    }
    trackEvent("review_submit", serviceSlug ?? "general", { rating });
    setDone(true);
  }

  if (done) {
    return (
      <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-6 text-center dark:bg-emerald-950/30">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="mt-3 text-lg font-extrabold">Yorumunuz için teşekkürler!</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Değerlendirmeniz kontrol edildikten sonra yayınlanacaktır.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-border bg-surface p-5 shadow-sm">
      <h3 className="text-lg font-extrabold">Deneyiminizi paylaşın</h3>
      <p className="text-sm text-muted-foreground">Hizmetimizi değerlendirin; yorumunuz onaylandıktan sonra yayınlanır.</p>

      <div className="flex items-center gap-1" role="radiogroup" aria-label="Puan">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} yıldız`}
            aria-checked={rating === n}
            role="radio"
            onClick={() => setRating(n)}
            className="p-1"
          >
            <Star className={`h-7 w-7 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
          </button>
        ))}
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value.slice(0, 80))}
        placeholder="Adınız"
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand-red"
      />

      <select
        value={districtSlug}
        onChange={(e) => setDistrictSlug(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-semibold outline-none focus:border-brand-red"
      >
        <option value="">Bölge (opsiyonel)</option>
        {DISTRICTS.map((d) => (
          <option key={d.slug} value={d.slug}>
            {d.name} — {d.side}
          </option>
        ))}
      </select>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value.slice(0, 1500))}
        placeholder="Aldığınız hizmeti birkaç cümleyle anlatın…"
        rows={4}
        className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand-red"
      />

      {error && <p className="text-sm font-semibold text-brand-red">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-3 text-sm font-extrabold tracking-wide text-white disabled:opacity-50"
      >
        <Send className="h-4 w-4" /> {submitting ? "Gönderiliyor…" : "Yorumu Gönder"}
      </button>
    </form>
  );
}
