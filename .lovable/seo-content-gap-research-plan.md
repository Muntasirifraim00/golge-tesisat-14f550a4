# SEO Content-Gap Research Plan (reusable)

A repeatable method to take any blog post from low rankings (page 3+) toward
page 1. Run this for one keyword at a time. It was first validated on
**"klima neden su akıtır"** (worked example at the bottom).

Database for all Semrush calls: **tr**. Voice: premium, trust-building Turkish.

---

## STEP 0 — Pick the target keyword
- Source: a post in `src/data/blog.ts` or a `planned`/`building` keyword in
  `src/data/seo-keywords.ts` that is NOT yet deep-optimized.
- Prefer **high volume + low KDI (≤30)** where we currently rank low (pos 20+).
- Record: keyword, monthly volume, KDI, current position, our slug.

## STEP 1 — Read OUR content A→Z
Read the full post object in `src/data/blog.ts`:
- `title`, `seoTitle`, `metaDescription`, `intro`
- every `sections[].heading` + paragraphs + bullets
- every `faq` Q/A
- `serviceSlug` (internal conversion link)
Note word count, number of H2 sections, FAQ count, media, and which
sub-keywords are already covered.

## STEP 2 — Map the live SERP
- `semrush--serp_analysis` → top 10 domains + KDI.
- `semrush--keyword_research` (display_limit 25) → volume + all related
  sub-keywords/questions (these are the search intents to cover).
Classify the top 10: brand/manufacturer pages, marketplaces, true content
competitors. We compete against the **content competitors**, not the brands.

## STEP 3 — Read the top 5 ranking pages
Fetch the top 3–5 URLs (`code--fetch_website`, markdown). For each, extract:
- All H2/H3 headings (their topic coverage)
- Whether they answer the high-volume sub-keywords from Step 2
- Media (images, diagrams, video), tables, step lists
- Schema signals, internal links, freshness date, author/E-E-A-T signals
- Conversion elements (phone, WhatsApp, service CTA)

## STEP 4 — Gap analysis (the core)
Build two lists:
- **They have / we don't** — headings, sub-keywords, questions, media,
  schema, or trust signals present in top results but missing from our post.
- **We have / they don't** — our advantages (real local service, phone,
  step-by-step DIY, FAQ) to keep and amplify.
Prioritise gaps by the **search volume** of the sub-keyword each gap captures.

## STEP 5 — Rewrite to win
In `src/data/blog.ts`, upgrade the post:
- Front-load the exact keyword in `title`/`seoTitle`/`intro`.
- Add a dedicated H2 section for each high-volume gap sub-keyword.
- Target ~1,200–1,500 words, structured sections + bullets, 6+ FAQ
  (each FAQ should answer a real "question" keyword from Step 2).
- Keep our edge: local service trust, phone `0533 896 05 03`, WhatsApp,
  `serviceSlug` internal link, "ne zaman profesyonel çağırmalı".
- Keep mobile-friendly: short paragraphs, scannable bullets.

## STEP 6 — Update the ledgers
- Fix KDI/volume and add new sub-keywords in `src/data/seo-keywords.ts`.
- Update the decision record in `src/data/seo-research.ts` (gaps closed).
- New/updated posts auto-flow into blog index + sitemap + schema
  (Breadcrumb + Article + FAQPage, HowTo when the keyword is a "nasıl" phrase).

## STEP 7 — Verify
Confirm the post builds, renders, and the FAQ/HowTo schema is present.
Re-check rankings after Google re-crawls (track in `/admin/keywords`).

---

## WORKED EXAMPLE — "klima neden su akıtır"
- Volume **5,400/mo**, KDI **16 (easy)**, our position ~79 (page 8).
- Our post: 5 H2 sections + 5 FAQ, ~10 min. Strong on the core diagnosis
  (normal vs arıza, tıkalı drenaj, DIY steps, when to call a pro).

**Top 5 ranking pages:** Trendyol (marketplace blog), Bosch, Daikin, Arçelik
(brand support), Starakim (content competitor, ~9 H2 + images).

**They have / we don't (prioritised by sub-keyword volume):**
1. "klima iç üniteden su gelmesi" (2,400/mo) — needs to be an explicit H2, not
   just inside a section.
2. "klima su tahliye hortumundan su gelmiyor" (1,600/mo) — give it its own
   heading (we mention it; competitors title it).
3. "klima dış ünite su akıtıyor" / "klimanın dış ünitesinden su akıyor"
   (1,300/mo each) — a dedicated dış-ünite section.
4. "klima su akıtıyor tehlikeli mi" (720/mo) + "klima suyu içilir mi"
   (1,000/mo) — health/safety angle as its own H2 (Starakim ranks on this).
5. "klimanın su akıtması yazın daha mı sık" — seasonal section (Starakim has it).
6. "klima su kaçağına karşı önlemler" + "bakım su sızıntısını önler mi" —
   prevention/maintenance section.
7. Brand-specific intent: "arçelik klima su akıtıyor" (390/mo) — a short
   brand-notes block covering common brands.
8. Visual media (diagram of drenaj path) — competitors use images; we have none.

**We have / they don't (keep + amplify):** real step-by-step safe DIY list,
genuine local service + phone/WhatsApp CTA, "ne zaman profesyonel" section,
structured FAQPage schema. Brand pages mostly upsell products (Bosch lists
its own klima models) — weak service intent we can beat on helpfulness.

**Verdict:** content exists but is thin on the long-tail sub-keywords that
carry ~9,000 extra monthly searches. Adding 5–6 targeted H2 sections + 1–2
diagrams + expanded FAQ should move it up significantly given KDI 16.
