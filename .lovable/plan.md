# Plan: Tier 1 Pages Enrich (Part 3)

## Amaç
Tier 3 pages `noindex` করা হয়ে গেছে, crawl budget এখন Tier 1-এ যাচ্ছে। কিন্তু Tier 1 পেজগুলো এখনো বেশিরভাগ **template-generated** কন্টেন্ট। Google-কে index করাতে হলে এই flagship পেজগুলোতে **হাতে-লেখা, বাস্তব, লোকাল ও সার্ভিস-নির্দিষ্ট depth** যোগ করতে হবে — শুধু নাম-swap নয়।

## বর্তমান অবস্থা (verify করা)
- **Tier 1: 278 পেজ** (39 ইলçে × 13 সার্ভিস থেকে score ≥ 5)।
- **Enrichment record আছে মাত্র 42টি**, যার মধ্যে **25টি Tier 1**।
- অর্থাৎ **~253 Tier 1 পেজ এখনো enrich হয়নি** — এগুলোই "Discovered/Crawled – not indexed" ঝুঁকিতে।
- Infrastructure প্রস্তুত: `src/data/matrix-enrichment.ts`-এ record থাকলে route (`tesisatci.$slug.$service.tsx`) স্বয়ংক্রিয়ভাবে "Bölgeye Özel" block + comparison table + price table + লোকাল FAQ (visible + FAQPage schema) render করে। **কোনো নতুন কম্পোনেন্ট লাগবে না** — শুধু data যোগ করতে হবে।

## কৌশল: priority অনুযায়ী ব্যাচে enrich
সব 253 একসাথে নয়। ROI অনুযায়ী ব্যাচ:

### Batch A — Core service × top districts (সর্বোচ্চ priority, ~40 পেজ)
- ইলçে: kadikoy, uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, maltepe, kartal, pendik (top-10 high-demand)।
- সার্ভিস: su-kacagi-tespiti, tikaniklik-acma, kombi-servisi, petek-temizligi (4 core)।
- এগুলোই সবচেয়ে বেশি search volume + call intent — আগে index হলে দ্রুত ট্রাফিক।

### Batch B — বাকি core service × বাকি Tier 1 ইলçে
### Batch C — secondary service × Tier 1 ইলçে (kanalizasyon, tuvalet, mutfak-gider ইত্যাদি)

প্রতিটি enrich record-এ (বিদ্যমান schema মেনে):
- **`intro`** — ইলçের বাস্তব যাপ/bina dokusu + সার্ভিসের নির্দিষ্ট সমস্যা (নাম-swap নয়, প্রতি ইলçে ভিন্ন)।
- **`localGuide`** (2–3 প্যারা) — মহল্লা-নির্দিষ্ট সমস্যা + আমরা কীভাবে সমাধান করি।
- **`comparison`** — সার্ভিস-নির্দিষ্ট তুলনা/spec টেবিল (যেমন yöntem, malzeme)।
- **`priceSignals` + `priceNote`** — "fiyat" intent ধরতে বাস্তব ব্যাপ্তি (keşifle netleşir স্টাইল, misleading নয়)।
- **`faq`** (3–4) — শুধু এই ইলçে+সার্ভিসের জন্য ইউনিক প্রশ্ন।
- **`landmarks`** — বাস্তব মহল্লা/cadde/site নাম (`districts.ts`-এর neighborhoods থেকে)।

## ডেটা উৎস (হ্যালুসিনেশন এড়াতে)
- ইলçে building stock, মহল্লা, response সময়: `src/data/districts.ts` (localContext, neighborhoods, highlights)।
- সার্ভিস process, tools, symptoms, variants, price factors: `src/data/services.ts`।
- বিদ্যমান 42টি record-এর টোন ও গভীরতা reference হিসেবে (যেমন `umraniye:hidrofor-kurulumu`)।
- প্রয়োজনে Semrush SERP gap analysis (serp_analysis / keyword) দিয়ে টার্গেট কম্বোর সঠিক intent যাচাই।

## Verification (প্রতি ব্যাচ শেষে)
1. `tsgo` typecheck — record schema ঠিক আছে কিনা।
2. `curl` দিয়ে ২-৩টি enrich করা পেজের SSR HTML চেক — "Bölgeye Özel" block, price table, লোকাল FAQ render হচ্ছে কিনা এবং robots-এ noindex নেই তা নিশ্চিত।
3. প্রতিটি record ইউনিক — কোনো দুই পেজে identical প্যারা নেই তা যাচাই।
4. Enriched Tier 1 কতটা হলো তা ট্র্যাক: `.lovable/location-seo-plan.md` ledger আপডেট।

## GSC-তে করণীয় (ব্যবহারকারীকে জানানো)
- Deploy-এর পর Batch A পেজগুলোতে **Request Indexing**।
- Sitemap resubmit (Tier 1 আগেই priority 0.6)।
- Coverage রিপোর্টে "Crawled – currently not indexed" কমছে কিনা মনিটর।

## এই টার্নে কী করব (next)
**Batch A (~40 পেজ)** থেকে শুরু — top-10 ইলçে × 4 core সার্ভিসের যেগুলো এখনো enrich হয়নি সেগুলোর জন্য হাতে-লেখা `MatrixEnrichment` record যোগ, তারপর typecheck + SSR যাচাই। এরপর ধাপে ধাপে Batch B ও C।

## Technical details
- একমাত্র পরিবর্তনযোগ্য ফাইল: **`src/data/matrix-enrichment.ts`** (`MATRIX_ENRICHMENT` map-এ নতুন key যোগ)। Route/schema/কম্পোনেন্ট অপরিবর্তিত।
- Key format: `` `${districtSlug}:${serviceSlug}` `` — বিদ্যমান `findEnrichment()` লুকআপ ব্যবহার করে।
- কোনো business logic ভাঙবে না; record না থাকলে পেজ আগের মতোই template কন্টেন্টে fallback করে।
- বড় ফাইল হওয়ায় (2160+ লাইন) parallel না করে ব্যাচে append; typecheck দিয়ে গার্ড।
