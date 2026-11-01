import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/SiteFooter";
import { SpHome, HOME_FAQ } from "@/components/home/SpHome";

const SITE_URL = "https://golgetesisat.com";
// Sitewide LocalBusiness JSON-LD lives in __root.tsx; the homepage only adds its FAQ.
const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "İstanbul Tesisatçı | 7/24 Acil Servis - Gölge Tesisat" },
      { name: "description", content: "İstanbul'un her ilçesinde 7/24 acil tesisatçı: su kaçağı tespiti, tıkanıklık açma, kombi-petek servisi. Ortalama 30 dk'da kapınızda. Ücretsiz keşif." },
      { name: "keywords", content: "istanbul tesisatçı, acil tesisatçı, su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği, 7/24 tesisatçı" },
      { property: "og:title", content: "İstanbul Tesisatçı | 7/24 Acil Servis - Gölge Tesisat" },
      { property: "og:description", content: "Su kaçağı, tıkanıklık, kombi ve petek için 7/24 acil tesisatçı. Ortalama 30 dk'da kapınızda." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "İstanbul Tesisatçı 7/24 - Gölge Tesisat" },
      { name: "twitter:description", content: "Su kaçağı, tıkanıklık, kombi servisi. 30 dk'da kapınızda." },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "TR-34" },
      { name: "geo.placename", content: "İstanbul" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSONLD) },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen w-full overflow-x-clip">
      <SpHome />
      <SiteFooter />
    </main>
  );
}
