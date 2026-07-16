import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const DISAVOW = `# Gölge Tesisat — Google disavow dosyası
# Hazırlanma: Semrush backlink analizi (Authority 0/100, 16 backlink, 11 referring domain — TAMAMI spam)
# Kullanım: Google Search Console > Disavow Tool (https://search.google.com/search-console/disavow-links)
#           -> golgetesisat.com property'sini seç -> bu .txt dosyasını yükle.
# Not: Tüm linkler nofollow + sahte "SEO/Fiverr" PBN domainlerinden. Ranking'e katkısı yok,
#      güven sinyalini zedeleyebilir. Domain bazında disavow ediyoruz.

domain:seo-growth-authority-boost-hub.shop
domain:seo-growth-optimization-hub.shop
domain:seopxl-organic-boost-lab.shop
domain:seopxl-performance-authority-engine.shop
domain:seopxl-ranking-boost-lab.shop
domain:fiverr-affordable-seo-services.site
domain:fiverr-cost-effective-seo.site
domain:fiverr-quality-seo-at-affordable-rates.site
domain:fiverr-seo-for-business-growth.site
domain:fiverr-seo-for-small-businesses.site
`;

export const Route = createFileRoute("/disavow")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(DISAVOW, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Content-Disposition": 'attachment; filename="golgetesisat-disavow.txt"',
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
