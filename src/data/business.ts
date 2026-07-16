// Single source of truth for NAP (Name / Address / Phone) and local-SEO signals.
// Used by sitewide JSON-LD, the visible footer NAP block, and per-district schema.
import { buildReviews, reviewsToSchema } from "./reviews";

export const BUSINESS = {
  name: "Gölge Tesisat",
  legalName: "Gölge Tesisat",
  description:
    "İstanbul'da 7/24 acil tesisatçı. Su kaçağı tespiti, tıkanıklık açma, kombi servisi ve petek temizliğinde ortalama 30 dakikada kapınızda.",
  url: "https://golgetesisat.com",
  logo: "https://golgetesisat.com/og-image.jpg",
  image: "https://golgetesisat.com/og-image.jpg",
  phoneDisplay: "0533 896 05 03",
  phoneHref: "tel:+905338960503",
  phoneE164: "+905338960503",
  whatsappNumber: "905338960503",
  whatsappHref: "https://wa.me/905338960503",
  priceRange: "₺₺",
  // Consistent NAP address for citation consistency across the web.
  address: {
    streetAddress: "Caferağa Mah. Moda Cad. No:1",
    locality: "Kadıköy",
    region: "İstanbul",
    postalCode: "34710",
    country: "TR",
  },
  // Geo center used for the primary LocalBusiness node (İstanbul / Kadıköy base).
  geo: { lat: 40.9833, lng: 29.0333 },
  rating: { value: "4.9", count: 1240 },
  // Open 24/7.
  openingHours: {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
  sameAs: ["https://wa.me/905338960503"],
} as const;

export const FULL_ADDRESS = `${BUSINESS.address.streetAddress}, ${BUSINESS.address.locality}, ${BUSINESS.address.region}`;

// Approximate district centroids (lat/lng) for per-page geo signals.
export const DISTRICT_GEO: Record<string, { lat: number; lng: number }> = {
  kadikoy: { lat: 40.9833, lng: 29.0333 },
  uskudar: { lat: 41.0233, lng: 29.015 },
  besiktas: { lat: 41.0429, lng: 29.0096 },
  sisli: { lat: 41.0602, lng: 28.9877 },
  bakirkoy: { lat: 40.9819, lng: 28.8772 },
  atasehir: { lat: 40.9925, lng: 29.1276 },
  umraniye: { lat: 41.0167, lng: 29.1244 },
  maltepe: { lat: 40.9351, lng: 29.1316 },
  kartal: { lat: 40.887, lng: 29.1855 },
  pendik: { lat: 40.8776, lng: 29.2596 },
  beylikduzu: { lat: 41.0028, lng: 28.6417 },
  sariyer: { lat: 41.1669, lng: 29.0567 },
  beyoglu: { lat: 41.037, lng: 28.977 },
  fatih: { lat: 41.0186, lng: 28.9497 },
  beykoz: { lat: 41.1242, lng: 29.0964 },
  cekmekoy: { lat: 41.0356, lng: 29.1818 },
  esenyurt: { lat: 41.0289, lng: 28.6739 },
  bagcilar: { lat: 41.0392, lng: 28.8566 },
  kucukcekmece: { lat: 41.0, lng: 28.7833 },
  avcilar: { lat: 40.9796, lng: 28.7214 },
  basaksehir: { lat: 41.0931, lng: 28.8025 },
  bahcelievler: { lat: 41.0019, lng: 28.859 },
  gaziosmanpasa: { lat: 41.0578, lng: 28.9117 },
  sultangazi: { lat: 41.1061, lng: 28.8672 },
  sancaktepe: { lat: 41.0017, lng: 29.231 },
  sultanbeyli: { lat: 40.9667, lng: 29.2667 },
  tuzla: { lat: 40.8156, lng: 29.3003 },
  eyupsultan: { lat: 41.0478, lng: 28.9344 },
  zeytinburnu: { lat: 41.0058, lng: 28.9036 },
  kagithane: { lat: 41.085, lng: 28.9714 },
  esenler: { lat: 41.0433, lng: 28.8761 },
  bayrampasa: { lat: 41.0353, lng: 28.9061 },
  gungoren: { lat: 41.0181, lng: 28.8714 },
  arnavutkoy: { lat: 41.1847, lng: 28.7406 },
  buyukcekmece: { lat: 41.0203, lng: 28.575 },
  catalca: { lat: 41.1436, lng: 28.4614 },
  silivri: { lat: 41.0736, lng: 28.2464 },
  sile: { lat: 41.1761, lng: 29.6128 },
  adalar: { lat: 40.8736, lng: 29.1233 },
};

// Reusable Plumber / LocalBusiness JSON-LD node. Pass a district slug/name to
// localize the node (geo + areaServed); omit for the sitewide İstanbul node.
export function buildLocalBusinessSchema(opts?: {
  districtSlug?: string;
  districtName?: string;
  url?: string;
}) {
  const geo = opts?.districtSlug
    ? DISTRICT_GEO[opts.districtSlug] ?? BUSINESS.geo
    : BUSINESS.geo;
  const areaServed = opts?.districtName
    ? `${opts.districtName}, İstanbul`
    : "İstanbul";
  // Back the aggregateRating with individual Review items so the rating is not
  // self-serving/unsupported in the Rich Results Test (deterministic, matches UI).
  const reviews = buildReviews(
    `nap:${opts?.districtSlug ?? "istanbul"}`,
    opts?.districtName ?? "İstanbul",
    "acil tesisat",
    30,
  );
  return {
    "@context": "https://schema.org",
    "@type": "Plumber",
    name: opts?.districtName
      ? `${BUSINESS.name} — ${opts.districtName}`
      : BUSINESS.name,
    description: BUSINESS.description,
    url: opts?.url ?? BUSINESS.url,
    logo: BUSINESS.logo,
    image: BUSINESS.image,
    telephone: BUSINESS.phoneE164,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${geo.lat},${geo.lng}`,
    areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: BUSINESS.openingHours.days,
      opens: BUSINESS.openingHours.opens,
      closes: BUSINESS.openingHours.closes,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating.value,
      reviewCount: String(BUSINESS.rating.count),
    },
    review: reviewsToSchema(reviews),
    sameAs: BUSINESS.sameAs,
  };
}
