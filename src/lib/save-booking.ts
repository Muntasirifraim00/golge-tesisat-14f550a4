// Saves a request from the new booking popup into the same `bookings` table the old /randevu form used,
// so it keeps showing up in the admin panel (admin.bookings). Shared by the homepage and site-wide popup.
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";
import { DISTRICTS, slugifyTr } from "@/data/districts";

export type BookingRecord = {
  wo?: string; svc?: string; when?: string; urgent?: boolean; start?: string | null;
  dist?: string; addr?: string; name?: string; phone?: string; note?: string; by?: string;
};

export function serviceKey(label: string) {
  const s = label.toLocaleLowerCase("tr");
  if (s.includes("kaçak")) return "leak";
  if (s.includes("tıkan") || s.includes("gider") || s.includes("tuvalet")) return "clog";
  if (s.includes("kamera") || s.includes("görüntü")) return "camera";
  if (s.includes("petek")) return "radiator";
  if (s.includes("kombi")) return "combi";
  if (s.includes("boru") || s.includes("tesisat")) return "pipe";
  return "other";
}

export async function saveBooking(rec: BookingRecord, source = "popup") {
  const dName = (rec.dist || "").trim();
  const d = DISTRICTS.find((x) => x.name.toLocaleLowerCase("tr") === dName.toLocaleLowerCase("tr"));
  const start = rec.start ? new Date(rec.start) : null;
  const pad = (n: number) => String(n).padStart(2, "0");
  const { error } = await supabase.from("bookings").insert({
    name: (rec.name || "").trim(),
    phone: (rec.phone || "").replace(/\s/g, ""),
    district_slug: d?.slug || slugifyTr(dName) || "istanbul",
    district_name: d?.name || dName || "İstanbul",
    service_key: serviceKey(rec.svc || ""),
    service_label: rec.svc || "Diğer",
    preferred_date: start ? `${start.getFullYear()}-${pad(start.getMonth() + 1)}-${pad(start.getDate())}` : null,
    time_slot: rec.urgent ? "ACİL — hemen" : rec.when || null,
    address: `${rec.addr || ""}, ${d?.name || dName} / İstanbul`,
    notes: [rec.wo ? `İş emri ${rec.wo}` : "", rec.by ? `İletişim: ${rec.by === "Phone call" ? "Telefon" : rec.by}` : "", rec.note || ""].filter(Boolean).join(" · ") || null,
  });
  if (error) console.warn("[booking insert]", error.message);
  else trackEvent("booking_submit", serviceKey(rec.svc || ""), { district: d?.slug, source });
}
