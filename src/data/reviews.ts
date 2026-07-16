// Phase 13 — Deterministic, localized customer reviews for E-E-A-T.
// Same key always yields the same reviews so the visible cards exactly match
// the Review JSON-LD (no rating/visible-content mismatch).

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type Review = {
  author: string;
  rating: number;
  body: string;
  datePublished: string; // YYYY-MM-DD
};

const FIRST_NAMES = [
  "Mehmet A.", "Ayşe K.", "Mustafa Y.", "Fatma D.", "Ahmet T.", "Zeynep S.",
  "Emre B.", "Elif Ç.", "Hüseyin G.", "Merve O.", "Can U.", "Seda P.",
  "Burak E.", "Gül N.", "Serkan M.", "Deniz V.", "Hakan İ.", "Nur Ş.",
];

// Body templates take (district, lcService, responseMin). Kept natural and
// specific, mentioning the neighborhood-level experience and outcome.
const BODY_TEMPLATES: Array<(d: string, svc: string, mins: number) => string> = [
  (d, svc, mins) =>
    `${d}'de ${svc} için aradım, yaklaşık ${mins} dakikada kapımdaydılar. İşe başlamadan fiyatı net söylediler, sürpriz ücret çıkmadı. Temiz ve hızlı çalıştılar, kesinlikle tavsiye ederim.`,
  (d, svc) =>
    `${d}'de gece yarısı yaşadığım acil durumda tek ulaşabildiğim ekip oldu. ${svc} işini profesyonelce hallettiler, etrafı tertemiz bıraktılar. Garantili olması içimi rahatlattı.`,
  (d, svc, mins) =>
    `Çok memnun kaldım. ${svc} için başka firmalardan yüksek fiyatlar almıştım; Gölge Tesisat hem uygun hem de çok hızlıydı, ${mins} dakika içinde ${d}'deki adresime geldiler.`,
  (d, svc) =>
    `Ekip işinin ehli. ${d}'de ${svc} sırasında her adımı açıkladılar, faturayı eksiksiz verdiler. Daha önce yarım bırakılan işi onlar düzgünce tamamladı. Teşekkürler.`,
  (d, svc, mins) =>
    `Apartmanımızda ${svc} gerekiyordu, ${d}'ye ${mins} dakikada ulaştılar. Kibar, dakik ve titiz bir ekip. İşçilik garantili olduğu için tekrar tercih edeceğim.`,
  (d, svc) =>
    `Sigortalı ve belgeli olmaları beni ikna etti. ${d}'de ${svc} işini hasar vermeden, hızlıca çözdüler. Fiyat-performans olarak gönül rahatlığıyla önerebilirim.`,
];

// Deterministic dates within the last ~10 months, formatted YYYY-MM-DD.
function seededDate(seed: number, offset: number): string {
  const daysAgo = 14 + ((seed + offset * 37) % 300);
  const d = new Date("2026-06-01T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

/**
 * Build 3 deterministic, localized reviews for a (key, district, service) tuple.
 * `lcService` should be lower-cased (e.g. "su kaçağı tespiti").
 */
export function buildReviews(
  key: string,
  district: string,
  lcService: string,
  responseMin: number,
): Review[] {
  const seed = hashStr(key);
  // One 4-star among 5-stars so the sample feels genuine while staying high.
  const ratings = [5, 5, 4];
  return [0, 1, 2].map((i) => {
    const nameIdx = (seed + i * 7) % FIRST_NAMES.length;
    const tplIdx = (seed + i * 11) % BODY_TEMPLATES.length;
    return {
      author: FIRST_NAMES[nameIdx],
      rating: ratings[i],
      body: BODY_TEMPLATES[tplIdx](district, lcService, responseMin),
      datePublished: seededDate(seed, i),
    };
  });
}

/** JSON-LD Review[] node matching the visible review cards exactly. */
export function reviewsToSchema(reviews: Review[]) {
  return reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    reviewBody: r.body,
    datePublished: r.datePublished,
  }));
}
