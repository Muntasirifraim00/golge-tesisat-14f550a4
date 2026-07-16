import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { DISTRICTS, NEIGHBORHOODS } from "@/data/districts";
import { SERVICES } from "@/data/services";
import { BLOG_POSTS } from "@/data/blog";
import { matrixTier, matrixPriority, NEIGHBORHOOD_INDEXABLE } from "@/lib/matrix-tier";
import { findEnrichment } from "@/data/matrix-enrichment";

const BASE_URL = "https://golgetesisat.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  image?: { loc: string; title: string };
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod },
          { path: "/hizmetler", changefreq: "monthly", priority: "0.8", lastmod },
          { path: "/tesisatci", changefreq: "monthly", priority: "0.8", lastmod },
          { path: "/acil-tesisatci", changefreq: "weekly", priority: "0.9", lastmod },
          { path: "/randevu", changefreq: "monthly", priority: "0.8", lastmod },
          { path: "/kvkk", changefreq: "yearly", priority: "0.3", lastmod },
          { path: "/cerez-politikasi", changefreq: "yearly", priority: "0.3", lastmod },
          { path: "/blog", changefreq: "weekly", priority: "0.7", lastmod },
          ...BLOG_POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
            lastmod: p.updated ?? p.published,
            image: { loc: `${BASE_URL}/og/${p.serviceSlug}.jpg`, title: p.title },
          })),
          ...SERVICES.map((s) => ({
            path: `/hizmet/${s.slug}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            lastmod,
            image: { loc: `${BASE_URL}/og/${s.slug}.jpg`, title: `${s.name} — İstanbul` },
          })),
          // Dedicated pricing pages — high commercial "fiyat/ücret" intent
          ...SERVICES.map((s) => ({
            path: `/hizmet/${s.slug}/fiyat`,
            changefreq: "monthly" as const,
            priority: "0.7",
            lastmod,
          })),
          ...DISTRICTS.map((d) => ({
            path: `/tesisatci/${d.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
            lastmod,
          })),
          // Service × district matrix — hyper-local pages. Tier 1/2 combos are
          // listed; Tier 3 (thin, low-demand) are excluded unless they carry
          // hand-written local enrichment, which promotes them to indexable.
          ...DISTRICTS.flatMap((d) =>
            SERVICES.flatMap((s) => {
              const tier = matrixTier(d, s);
              if (tier === 3 && !findEnrichment(d.slug, s.slug)) return [];
              return [
                {
                  path: `/tesisatci/${d.slug}/${s.slug}`,
                  changefreq: "monthly" as const,
                  priority: matrixPriority(tier),
                  lastmod,
                  image: { loc: `${BASE_URL}/og/${s.slug}.jpg`, title: `${d.name} ${s.name}` },
                },
              ];
            }),
          ),
          // Mahalle (neighborhood) pages — ultra long-tail; kept out of the
          // sitemap while they carry noindex (see NEIGHBORHOOD_INDEXABLE).
          ...(NEIGHBORHOOD_INDEXABLE
            ? NEIGHBORHOODS.map((n) => ({
                path: `/tesisatci/${n.district.slug}/mahalle/${n.neighborhoodSlug}`,
                changefreq: "monthly" as const,
                priority: "0.5",
                lastmod,
              }))
            : []),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            e.image ? `    <image:image>` : null,
            e.image ? `      <image:loc>${esc(e.image.loc)}</image:loc>` : null,
            e.image ? `      <image:title>${esc(e.image.title)}</image:title>` : null,
            e.image ? `    </image:image>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
