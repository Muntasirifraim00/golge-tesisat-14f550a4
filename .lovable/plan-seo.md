# SEO Expansion Plan — Gölge Tesisat (golgetesisat.com)

A long, multi-phase plan to grow organic reach beyond the current footprint
(6 services × 28 districts = 168 matrix pages, 9 blog posts, keyword ledger).
Every phase is independently shippable and ordered by effort-to-reward.
All volumes/KDI from Semrush (database: tr), June 2026.

---

## Current footprint (baseline)
- **Services (6):** su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği, doğalgaz tesisatı, kanal görüntüleme.
- **Districts (28):** Kadıköy → Tuzla (full İstanbul coverage).
- **Matrix:** `/tesisatci/$district/$service` — deterministic unique copy (`matrix-seo.ts`).
- **Blog (9):** informational low-KDI cluster → service hubs.
- **Ledger:** `src/data/seo-keywords.ts` (Tier 1 + Tier 2).

---

## Phase 1 — Keyword ledger overhaul (foundation)
Rewrite `src/data/seo-keywords.ts` into 3 tiers with the new Semrush data so
every later phase pulls from one source of truth. Add `cluster` + `status`
("ranking" | "building" | "planned") fields for tracking.

**New high-value, low/medium-KDI targets to add:**

| Keyword | Vol/mo | KDI | Intent | Maps to |
|---|---|---|---|---|
| tesisatçı | 40,500 | low | transactional | /tesisatci |
| su tesisatçısı | 27,100 | 29 | transactional | /tesisatci |
| kombi servisi | 74,000 | 33 | transactional | /hizmet/kombi-servisi |
| kombi servis | 22,200 | low | transactional | /hizmet/kombi-servisi |
| gider açma | 12,100 | 30 | transactional | /hizmet/tikaniklik-acma |
| doğalgaz tesisatı | 8,100 | 16 | transactional | /hizmet/dogalgaz-tesisati |
| petek temizleme | 8,100 | medium | transactional | /hizmet/petek-temizligi |
| kanalizasyon açma | 6,600 | medium | transactional | new hub |
| mutfak gider açma | 5,400 | medium | transactional | new hub |
| en yakın su tesisatçısı | 4,400 | medium | local | /tesisatci |
| tesisat su kaçağı tespiti | 4,400 | low | transactional | /hizmet/su-kacagi-tespiti |
| tuvalet açma | 2,900 | medium | transactional | new hub |
| acil kombi servisi | 2,900 | low | transactional | /hizmet/kombi-servisi |
| kırmadan su kaçağı tespiti | 1,600 | medium | transactional | /hizmet/su-kacagi-tespiti |
| istanbul su tesisatçısı | 2,400 | medium | local | /tesisatci |

---

## Phase 2 — New service hubs (high-volume intent pages)
The keyword data shows large sub-intents the current 6 services don't directly
target. Add 3 new entries to `src/data/services.ts` (full hub depth: intro,
includes, process, price factors, FAQ) — each auto-joins the district matrix
(+84 new matrix pages: 3 × 28):

1. **Kanalizasyon Açma** — `kanalizasyon-acma` (6,600 + "ana hat" + "kanal jeti").
2. **Tuvalet / Klozet Tıkanıklığı Açma** — `tuvalet-tikanikligi-acma` (2,900 "tuvalet açma" + 1,900 + 1,600 variants).
3. **Mutfak & Lavabo Gider Açma** — `mutfak-gider-acma` (5,400 + 3,600 + 1,300).

These are close cousins of "tıkanıklık açma" but win their own dedicated
high-intent SERPs and cross-link to the parent service.

---

## Phase 3 — Pricing / "fiyat" intent pages
High commercial intent, currently uncovered. Add a `/hizmet/$slug/fiyat`
sub-route (or a strong pricing section with its own canonical anchor) targeting:
- su kaçağı tespiti fiyatları (1,600) · petek temizliği fiyat (1,000) ·
  kombi servis ücreti (480) · doğalgaz tesisat fiyatları (390).
Transparent "ücret nasıl belirlenir" copy (already in `priceFactors`) reused +
FAQ schema. No fixed prices — keep the "ücretsiz keşif" trust angle.

---

## Phase 4 — Blog cluster expansion (informational top-of-funnel)
Add ~8 new low-KDI posts to `src/data/blog.ts`, each linking down to a service:

| Post keyword | Vol | KDI | → service |
|---|---|---|---|
| kalorifer peteği nasıl temizlenir | 1,600 | 24 | petek-temizligi |
| evde petek temizliği nasıl yapılır | 1,000 | 17 | petek-temizligi |
| kombi temizliği nasıl yapılır | 1,000 | 26 | kombi-servisi |
| daire içi doğalgaz tesisatı nasıl yapılır | 320 | 14 | dogalgaz-tesisati |
| mutfak tıkanıklığı nasıl açılır | (cluster) | low | mutfak-gider-acma |
| kırmadan su kaçağı nasıl bulunur | (cluster) | low | su-kacagi-tespiti |
| doğalgaz maliyeti / hesaplama | 590 | low | dogalgaz-tesisati |
| kombi hata kodları rehberi | (cluster) | low | kombi-servisi |

---

## Phase 5 — Hyper-local neighborhood (mahalle) pages
Biggest long-tail unlock. Districts already list `neighborhoods` (e.g.
Caddebostan, Etiler, Nişantaşı). Add `/tesisatci/$district/$neighborhood`
generating unique copy per mahalle for the flagship service, targeting
ultra-low-competition local terms ("caddebostan tesisatçı", "etiler su kaçağı").
~150+ mahalle entries × deterministic templating in `matrix-seo.ts`.
Wire into sitemap + internal links from district pages.

---

## Phase 6 — "Acil" & "en yakın" intent layer
Capture urgency + near-me searches ("acil su tesisatçısı" 720, "en yakın
su tesisatçısı" 4,400, "acil kombi servisi" 2,900).
- Dedicated `/acil-tesisatci` hub + per-district "7/24 acil" angle reinforced.
- LocalBusiness + `areaServed` schema with all 28 districts, opening hours
  `Mo-Su 00:00-23:59`, phone CTA above the fold.

---

## Phase 7 — Schema & technical SEO deepening
- **FAQPage** JSON-LD on every service, matrix, and blog page (FAQs already exist in data).
- **HowTo** schema on service `process` steps + "nasıl yapılır" blog posts.
- **BreadcrumbList** on all deep routes (district → service → neighborhood).
- **Service** + **LocalBusiness** schema on hubs; **AggregateRating** from reviews data.
- Image SEO: descriptive alt + `/og/$slug.jpg` per service (already in sitemap).

---

## Phase 8 — Internal linking & topical authority
- Auto "ilgili hizmetler" + "yakın ilçeler" link blocks on every matrix page.
- Blog → service → district silo links (intent funnel).
- Service hub → its blog cluster ("rehberler") section.
- Footer mega-nav with top districts × services for crawl depth.

---

## Phase 9 — Measurement & iteration
- Use existing Search Console integration (`search-console.functions.ts`) +
  `admin.keywords.tsx` to track each ledger keyword's position weekly.
- Mark ledger `status` ranking/building; rewrite/expand pages stuck on page 2.
- Refresh `lastmod` + content on underperformers; promote winners' angles.
- Quarterly Semrush gap re-scan to refill the ledger.

---

## Technical notes
- Keyword ledger stays the single source of truth (`src/data/seo-keywords.ts`).
- New services/neighborhoods auto-extend the matrix + `sitemap[.]xml.ts` entries.
- Per-route `head()` for title/meta/canonical/og + JSON-LD (leaf-only canonical/og:image).
- Keep premium, trust-building, mobile-friendly copy per project memory.
- Titles ≤60 chars keyword-front-loaded; meta ≤155 with response time + ücretsiz keşif + phone.

## Suggested sequencing
Phase 1 (ledger) first — it feeds everything. Then 2 + 4 (new hubs + blog) for
the fastest volume gains, 5 (mahalle) for the long-tail moat, 3 + 6 for high
intent, 7 + 8 for authority, 9 ongoing.

---

## Progress log
- **Phase 1 ✅** Ledger overhauled (`seo-keywords.ts`): 3 tiers + `cluster`/`status`, fresh Semrush data, backward-compatible exports.
- **Phase 2 ✅** 3 new service hubs added (`kanalizasyon-acma`, `tuvalet-tikanikligi-acma`, `mutfak-gider-acma`) → +84 matrix pages, auto in sitemap.
- **Phase 4 ✅** 4 new blog posts (kalorifer peteği, kombi temizliği, mutfak tıkanıklığı, daire içi doğalgaz).
- **Phase 6 ✅ (core)** `/acil-tesisatci` hub with EmergencyService + FAQPage + Breadcrumb schema, added to sitemap.
- **Phase 5 ✅** Hyper-local mahalle pages `/tesisatci/$district/mahalle/$neighborhood` (~180 pages): Turkish-aware `slugifyTr` + `findNeighborhood`/`NEIGHBORHOODS` in `districts.ts`, deterministic `buildNeighborhoodContent` in `matrix-seo.ts`, Plumber + FAQPage + Breadcrumb schema, district pills now deep-link, all entries in sitemap.
- **Phase 3 ✅** Dedicated pricing pages `/hizmet/$slug/fiyat` (one per service): converted `hizmet.$slug` to a pass-through layout (`+ .index` leaf), pricing-intent FAQ, Service+Offer (TRY, no fixed price) + FAQPage + Breadcrumb schema, "ücretsiz keşif / şeffaf fiyat" trust angle, deep-linked from service hubs, all in sitemap.
- **Phase 8 ✅** Internal linking & topical authority: footer upgraded to a 4-column mega-nav (all services × top 10 districts × acil/fiyat × kurumsal) for crawl depth; service hubs now carry a "Rehberler" blog-cluster silo via new `postsForService()` helper (blog ↔ service silo); matrix pages already cross-link related services + nearby districts.
- **Phase 7 ✅** Schema deepening: added **HowTo** JSON-LD to every service hub (built from `process` steps) and to "nasıl yapılır" blog guides (via new `howToFromPost()` helper that derives ordered `HowToStep`s from the post's step section). On-page anchors (`#adim-N` + `scroll-mt`) line up with the schema step URLs. FAQPage + BreadcrumbList + Service/Plumber/AggregateRating already cover all service, matrix, neighborhood, blog and pricing routes.
- **OG images ✅** Generated branded 1216×640 OG/Twitter images for the 3 new service hubs (`kanalizasyon-acma`, `tuvalet-tikanikligi-acma`, `mutfak-gider-acma`) at `/og/$slug.jpg` — previously 404ing references now resolve.
- **Phase 9 ✅ (automation)** Measurement & iteration: keyword tracker already computes per-keyword position, prev-window delta, best position, trend, index coverage (`keyword-progress.functions.ts`) + manual snapshot capture + history. Added **automated weekly snapshot**: extracted shared `runKeywordSnapshot()` (`keyword-snapshot.server.ts`) reused by the admin "capture now" server fn and a new public cron hook `/api/public/hooks/keyword-snapshot` (anon-key `apikey` header auth, same pattern as refresh-analytics). Scheduled via pg_cron `weekly-keyword-snapshot` every Monday 04:00. The tracker now builds position/coverage history automatically. Remaining is purely ongoing iteration (rewrite page-2 stragglers, quarterly Semrush gap re-scan) — driven by the data this now collects.
- **Blog backlog ✅ COMPLETE** All planned blog keywords written (last: `doğalgaz dedektörü`). Ledger 571/571 "building".
