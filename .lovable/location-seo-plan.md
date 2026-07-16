# Location Pages (351) — Content Quality & Internal Linking Plan

**Scope:** 351 pages = 27 districts (ilçe) × 13 services, route `tesisatci/$slug/$service`.
Content engine: `src/lib/matrix-seo.ts`. Template: `src/routes/tesisatci.$slug.$service.tsx`.
Data: `src/data/services.ts`, `src/data/districts.ts`.

**Audit baseline (2026-06-24):**
- Avg ~441 body words/page (thin for local SEO; target 800+).
- "why" paragraph: only 162 unique of 351 → heavy duplication.
- Per-service static blocks (includes/process/priceFactors) identical across all 27 districts.
- Internal links: 4 services + 6 districts + 2 hizmet; no in-content / blog / mahalle links.
- GSC: indexed but avg position 17.8, CTR 0.6%.

**Workflow:** User says "Next" → execute the next unchecked part. Each service part = deep
SERP gap analysis (find İstanbul top-rankers for that service, list what they have that we
don't), then deepen that service's shared content block (propagates to all 27 district pages),
report which pages/blocks were edited and what gap was filled. Update this ledger after each part.

## Parts

- [x] **Part 1 — Engine & internal-linking foundation (all 351 pages). ✓ DONE**
  Rewrite `matrix-seo.ts` for longer (800+ word) genuinely-varied copy, kill the duplicate
  "why" paragraphs (per-pair deterministic variety), add a comparison/spec table + local data
  points. Add internal-linking layer: contextual in-content links, relevant blog-post links,
  district hub + mahalle links, related-service cluster. Verify build + word counts.
  **Edit log:** `src/lib/matrix-seo.ts` — added 3 new paragraphs (problem/response/guarantee),
  expanded intro/local/why pools (3→5/4/5 templates), why now woven from service+district
  highlights via dual seeds (kills the 162/351 duplication), +2 new FAQ, quickFacts table.
  Fixed signed-shift bug (`>>`→`>>>`) that produced negative array indices on large hashes.
  `src/routes/tesisatci.$slug.$service.tsx` — rendered quickFacts table, problem/response/
  guarantee paragraphs, mahalle deep-links (slugifyTr), and "{service} Rehberleri" blog-guide
  cards via `guidesForService`. Verified: 351/351 pairs render clean, body ~1300 words, 0 console
  errors on /tesisatci/kadikoy/tikaniklik-acma.
- [x] **Part 2 — su-kaçağı-tespiti** — SERP gap analysis + deepen service block (×27 districts). Added 4 new SERP-gap blocks: Belirtiler (6), Acil Önlemler (4), Cihaz & Yöntemler (5), Türlerine Göre Çözümler (5). Type extended with optional `symptoms/emergencySteps/tools/variants`; rendered conditionally on matrix pages. Gaps closed vs istanbultesisat.com.tr: symptom list, emergency action steps, named devices/methods, leak-type variants.
- [x] **Part 3 — tıkanıklık-açma** — Keyword-intent gap analysis (lavabo/tuvalet/mutfak/kanalizasyon clusters, DIY "açıcı" intent). Added 4 SERP-gap blocks: Belirtiler (6), Acil Önlemler incl. kimyasal-uyarısı (4), Cihaz & Yöntemler (4), Türlerine Göre Çözümler (5). Renders ×27 districts via shared block.
- [x] **Part 4 — kombi-servisi** — Gap analysis on "kombi servisi" (74k/mo, KD 21) + cluster (yanmıyor/ısıtmıyor/basınç düşüyor, hata kodu, acil/yetkili servis). Added 4 SERP-gap blocks: Belirtiler (6), Acil Önlemler incl. gaz-kokusu güvenlik uyarısı (4), Cihaz & Yöntemler — baca gazı analiz/manometre/multimetre/eşanjör (4), Türlerine Göre Çözümler (5: bakım, basınç/kaçak, sıcak su/3-yollu vana, kart/sensör, montaj). Renders ×27 districts.
- [x] **Part 5 — petek-temizliği / radyatör** — Gap analysis on "petek temizliği" cluster (petek temizleme 8.1k, nasıl yapılır 2.9k, kalorifer peteği, evde DIY intent). Added 4 SERP-gap blocks: Belirtiler (6: alt soğuk/üst sıcak, geç ısınma, çamurlu su, fatura artışı), Acil Önlemler — DIY hava alma + boşaltma uyarısı (4), Cihaz & Yöntemler — kapalı devre makine/kireç çözücü/termal kamera (4), Türlerine Göre (5: tek daire, apartman/kolon, kombi+petek, yerden ısıtma, sezon öncesi). Renders ×27 districts.
- [x] **Part 6 — doğalgaz tesisatı** — Gap analysis on "doğalgaz tesisatı" (8.1k/mo, KD 18) + cluster (döşeme/maliyet, proje ücreti, nasıl yapılır, bağlatma aşamaları, dönüşüm). Added 4 SERP-gap blocks: Belirtiler (6: gaz kokusu, sayaç tüketimi, tıslama, sarı alev, CO belirtileri, dönüşüm), Acil Önlemler — gaz güvenliği 4-adım (vana/ateş/havalandır/dışarıdan ara), Cihaz & Yöntemler — gaz dedektörü/basınç test pompası/pres-kaynak/CO ölçer (4), Türlerine Göre (5: sıfırdan döşeme, dönüşüm, cihaz bağlantı, kaçak tespit, tadilat/taşıma). Renders ×27 districts.
- [x] **Part 7 — kanal görüntüleme (kamera)** — Gap analysis on "kanal görüntüleme" cluster (kameralı gider açma, kanal görüntüleme kamerası/robotu, pimaş/kuyu/lavabo kamerası, brand intent Rothenberger/Ridgid). Added 4 SERP-gap blocks: Belirtiler (6: tekrar tıkanma, çoklu gider, koku, zemin çökmesi, kazısız tespit, alım öncesi kontrol), Acil Önlemler — kullanımı durdur/rögar/kimyasal uyarısı (4), Cihaz & Yöntemler — robot kamera/sonda-lokalizatör/kayıt sistemi/jetli entegrasyon (4), Türlerine Göre (5: pis su, pimaş/kolon, bahçe ana hat, kazı öncesi nokta tespiti, hasar/sigorta raporu). Renders ×27 districts.
- [x] **Part 8 — duş / banyo tesisatı (dusakabin-vitrifiye-montaji)** — Gap analysis on "duşakabin montajı" (1.9k, KD 29) + "klozet montajı" (1.6k) clusters: çıkış tipi (arkadan/alttan/yerden çıkışlı), asma klozet/gömme rezervuar, tekneli/teknesiz/fayans üstü duşakabin, montaj nasıl yapılır, vitra servis (brand). Added 4 SERP-gap blocks: Belirtiler (6: taban sızıntı/oynama, akıtan rezervuar, duşakabin köşe kaçağı, kapı/makara arızası, yeni montaj, çıkış tipi uyumsuzluğu), Montaj öncesi hazırlık (4: vana kapat, alan boşalt, ürün hazır, çıkış/ölçü doğrula), Cihaz & Yöntemler (4: lazer terazi, saniter silikon, flanş/rakor seti, karot makinesi), Türlerine Göre (5: klozet, asma klozet/gömme rezervuar, lavabo/hilton, duşakabin, duşakabin/klozet tamiri). Renders ×27 districts.
- [x] **Part 9 — musluk / batarya (musluk-batarya-degisimi)** — Gap analysis on "musluk tamiri" (880) + cluster (musluk 22.2k, aç kapa musluk 3.6k, musluk bataryası 3.6k, musluk contası 1.9k, aç kapa musluk contası nasıl değiştirilir 1k, mutfak bataryası tamiri 880, sökülmeyen musluk 880, aç kapa banyo bataryası tamiri 720, su damlatıyor 590). Added 4 SERP-gap blocks: Belirtiler (6: damlama/akıtma, aç-kapa conta sızıntısı, kireçli/zor dönen kol, düşük basınç/perlatör, sıcak-soğuk karışmama, dolap altı su birikintisi), Müdahale öncesi (4: ara musluk kapat, dolap boşalt/kurula, kireçli başlığı zorlama, batarya tipi/model paylaş), Cihaz & Yöntemler (4: kartuş sökme/alyan seti, orijinal kartuş-conta-salmastra stoğu, kireç çözücü/perlatör temizleme, teflon+tork montaj), Türlerine Göre (5: mutfak/evye, banyo/lavabo, kartuş-conta tamiri, ankastre gömme, perlatör/hortum/ara musluk). Renders ×27 districts.
- [x] **Part 10 — hidrofor / pompa (hidrofor-kurulumu)** — Gap analysis on "hidrofor" cluster (hidrofor arızası, sürekli çalışıyor/rölanti, basınç ayarı, presostat ayarı, membran değişimi, su basmıyor, titreşim/ses, daire/bina tipi). Added 4 SERP-gap blocks: Belirtiler (6: kat/saat basınç düşüşü, rölanti, sürekli çalışma, titreşim/su koçu, havalı kesik su, motor ısınma/sigorta), Müdahale öncesi (4: elektriği kes/kuru çalışma riski, ana vana, tank-presostat zorlama, marka-kapasite-belirti paylaş), Cihaz & Yöntemler (4: manometre/basınç seti, presostat kalibrasyon, membran-presostat-çek valf stoğu, titreşim takozu/esnek bağlantı), Türlerine Göre (5: daire tipi, bina/frekans kontrollü, sürekli çalışma arızası, membran-presostat-motor değişimi, depolu/şamandıra sistemi). Renders ×27 districts.
- [x] **Part 11 — kanalizasyon açma (kanalizasyon-acma)** — Gap analysis on "kanalizasyon açma" cluster (ana hat/kolon, rögar-logar tıkanıklığı, geri tepme/taşma, kanal jeti, kök sarması, vidanjör, apartman toplu hat). Added 4 SERP-gap blocks: Belirtiler (6: çoklu gider gitmemesi, alt kat geri tepme, rögar taşması, lağım kokusu/gurultu, tekrar tıkanma, yavaş akış/hava kabarcığı), Acil Önlemler (4: tüm binada su durdur, alt kat/bodrum koru, kimyasal dökme uyarısı, rögar/yönetici bilgilendir), Cihaz & Yöntemler (4: kanal jeti, robotik spiral, robot kamera/lokalizatör, vidanjör tahliye), Türlerine Göre (5: apartman ana kolon/rögar, bahçe/dış saha hattı, geri tepme acil, kök/çökme tespiti, işyeri yağ/atık hattı). Renders ×27 districts.
- [x] **Part 12 — tuvalet tıkanıklığı açma (tuvalet-tikanikligi-acma)** — Gap analysis on "tuvalet tıkanıklığı açma" cluster (klozet tıkanması, su taşıyor/geri tepiyor, yabancı cisim düştü, klozeti sökmeden açma, gömme rezervuar/sifon, alaturka hela). Added 4 SERP-gap blocks: Belirtiler (6: su yükseliyor gitmiyor, taşma/geri tepme, gurultu/fokurdama, yabancı cisim, koku/yavaş boşalma, eksik basan rezervuar), Acil Önlemler (4: sifon çekme/ara musluk kapat, cisim düştüyse su verme, kostik dökme uyarısı, belirti paylaş), Cihaz & Yöntemler (4: klozet pompası, klozet tipi spiral, yabancı cisim kapma aparatı, endoskopik kamera/jet), Türlerine Göre (5: asma/klasik klozet, alaturka/hela taşı, yabancı cisim çıkarma, gömme rezervuar/sifon, site/işyeri ortak tuvalet acil). Renders ×27 districts.
- [x] **Part 13 — mutfak & lavabo gider açma (mutfak-gider-acma)** — Gap analysis on "lavabo tıkanıklığı açma" + cluster (mutfak gideri tıkandı, evye gider açma, çift gözlü evye geri tepme, gider kokusu, sifon sızıntısı, su jeti vs spiral). Added 4 SERP-gap blocks: Belirtiler (6: yavaş inme, geri koku, çift göz geri tepme, gurultu, sifon sızıntısı, kısa sürede tekrar), Acil Önlemler (4: su kullanmayı bırak, kostik dökme, sifon zorla sökme, belirti paylaş), Cihaz & Yöntemler (4: robotik spiral, su jeti, sifon-conta-rakor seti, endoskopik kamera neden tespiti), Türlerine Göre (5: mutfak evyesi, banyo/hilton sifon, yer gideri, sifon sızıntı+tıkanma, işyeri mutfağı acil). Renders ×27 districts.
- [x] **Part 14 — Service blocks QA + FAQ depth pass across all 13 services.** QA found 2 gaps: (1) `kombi-montaji` had no SERP-gap blocks → added Belirtiler (6), Acil Önlemler (4), Cihaz & Yöntemler (4: gaz sızdırmazlık test pompası/dedektör, hermetik-yoğuşmalı baca + kondens, rakor-hortum-vana seti, manometre/su terazisi/devreye alma), Türlerine Göre (5: yeni montaj, söküm+değişim, yoğuşmalı dönüşüm, sadece montaj+devreye alma, baca/gaz hattı düzenleme). (2) 6 services had thin FAQ (4–5) → normalized all 13 to 6–7: tikaniklik (+mutfak/lavabo gider, kimyasal uyarısı), kombi-servisi (+hata kodu, gaz kokusu), petek (+kombiye zarar vermeden, alt soğuk/üst sıcak), dogalgaz (+tüp/soba dönüşüm, işçilik garanti), kanal-görüntüleme (+kazısız nokta tespiti, video/rapor), tuvalet (+gömme rezervuar/asma klozet). Now all 13/13: 4 gap blocks each, 6–7 FAQ each. tsgo temiz.
- [x] **Part 15 — District hub tier 1 (Kadıköy, Üsküdar, Beşiktaş, Şişli, Bakırköy).** Extended `District` type with optional deep-content fields (`localContext`, `commonIssues`, `faq`). Populated all 5 tier-1 ilçe with unique, building-stock-aware local content: 2 local-context paragraphs each (eski apartman vs sahil sitesi vs plaza/rezidans ayrımı, mahalle-bazlı sorun karakteri), 3 commonIssues each, 2 district-specific FAQ each. Hub page (`tesisatci.$slug.index.tsx`) now renders these conditionally (other ilçe fall back to template) and merges `d.faq` into FAQPage JSON-LD. tsgo temiz.
- [x] **Part 16 — District hub tier 2 (Ataşehir, Ümraniye, Maltepe, Kartal, Pendik).** Populated `localContext` (2 paragraphs), `commonIssues` (3) and district `faq` (2) for all 5 tier-2 ilçe, each tailored to local building stock (Finans Merkezi plaza/rezidans, Dudullu sanayi, sahil dolgu siteleri, kentsel dönüşüm kuleleri, Sabiha Gökçen çevresi). Same conditional rendering + FAQPage JSON-LD merge as tier-1. tsgo temiz.
- [x] **Part 17 — District hub tier 3 (Beylikdüzü, Sarıyer, Beyoğlu, Fatih, Beykoz).** Populated `localContext` (2 paragraphs), `commonIssues` (3) and district `faq` (2) for all 5 tier-3 ilçe, tailored to local building stock (Beylikdüzü planlı yeni siteler/villa + Marmara sahili korozyon, Sarıyer Maslak plaza + Boğaz yalı/villa, Beyoğlu tarihi taş bina + Galata/Karaköy otel-kafe, Fatih tarihi yarımada han/toptancı + eski galvaniz boru, Beykoz Kavacık ofis + Acarkent villa + Boğaz yalı). Same conditional rendering + FAQPage JSON-LD merge as tier-1/2. tsgo temiz.
- [x] **Part 18 — District hub tier 4 (Çekmeköy, Esenyurt, Bağcılar, Küçükçekmece, Avcılar).** Populated `localContext` (2), `commonIssues` (3) and district `faq` (2) for all 5 tier-4 ilçe, tailored to local building stock (Çekmeköy villa siteleri/müstakil + donan dış tesisat, Esenyurt yoğun site/rezidans + erken yıpranan boru, Bağcılar konut+Mahmutbey sanayi, Küçükçekmece Sefaköy/Halkalı + göl çevresi nem, Avcılar Marmara sahili korozyon + üniversite öğrenci dairesi). Same conditional rendering + FAQPage JSON-LD merge. tsgo temiz.
- [x] **Part 19 — District hub tier 5 + remaining (Başakşehir, Bahçelievler, Gaziosmanpaşa, Sultangazi, Sancaktepe, Sultanbeyli, Tuzla).** Populated `localContext` (2), `commonIssues` (3) and district `faq` (2) for the final 7 ilçe, tailored to local building stock (Başakşehir planlı TOKİ/Bahçeşehir villa, Bahçelievler orta yaşlı yoğun apartman, Gaziosmanpaşa kentsel dönüşüm eski+yeni, Sultangazi konut+doğalgaz dönüşüm, Sancaktepe yeni site/Sarıgazi-Samandıra, Sultanbeyli konut+doğalgaz dönüşüm, Tuzla sahil korozyon+organize sanayi+villa). Now all 27/27 ilçe have deep hub content. Same conditional rendering + FAQPage JSON-LD merge. tsgo temiz.
- [x] **Part 20 — Final QA: link-graph audit, schema validation, GSC re-inspection of a sample, sitemap re-submit. ✓ DONE**
  Sitemap: 697 URLs total, 351 service×district matrix pages, 0 duplicate `<loc>` entries, valid image:image extensions (226 KB). Schema: every matrix page emits 6 valid JSON-LD blocks (Plumber, WebSite, Organization, BreadcrumbList, Service, FAQPage) — all parse clean; district hubs also emit 6 valid blocks with merged district FAQ. Link graph (matrix page sample): 46 tesisatci + 28 hizmet + 12 blog + randevu/hizmetler/acil-tesisatci links; 82 unique internal links sampled, 0 returning non-200. tsgo --noEmit: 0 errors. **All 27/27 ilçe deep content + all 13/13 service gap blocks live; plan 20/20 complete.**
  Re-submit checklist (manual, outside code): GSC → Sitemaps → resubmit `https://golgetesisat.com/sitemap.xml`; use URL Inspection on a few matrix URLs (e.g. /tesisatci/kadikoy/tikaniklik-acma) → Request Indexing.

## Edit log (append per Next)
- Part 20: QA-only, no content edits. Verified sitemap.xml output, JSON-LD validity on matrix + hub routes, internal-link integrity, and type-safety. Ledger closed.
- Page 23: Enriched `avcilar:su-kacagi-tespiti` — Marmara sahili tuz-nem korozyonu (Denizköşkler/Ambarlı), 1999 öncesi oturmuş zemin döşeme altı sızıntı (Merkez/Tahtakale/Firuzköy), öğrenci dairesi batarya/hortum/gömme rezervuar kaçağı (Üniversite/Cihangir). Comparison table (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 24: Enriched `beyoglu:tikaniklik-acma` — tarihi taş bina dökme demir/galvaniz pas-kireç daralması (Galata/Şişhane/İstiklal), kafe-restoran/butik otel mutfak yağ tıkanması + kanal jeti/yağ tutucu (Karaköy/Taksim), eski apartman ortak kolon/pimaş (Cihangir/Tarlabaşı). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 25: Enriched `tuzla:hidrofor-kurulumu` — sahil villa/site basınç + tuza dayanıklı malzeme (İçmeler/Aydınlı/Şifa), apartman depo+hidrofor (Mimar Sinan/Postane), organize sanayi/tersane çok pompalı yedekli grup (Tepeören). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. Diversifies to underused hidrofor service. tsgo temiz.
- Page 26: Enriched `sultangazi:dogalgaz-tesisati` — geç doğalgaz altyapısı → dönüşüm ağırlıklı: tüp/sobalı sistemden geçiş + iç tesisat döşeme (Habipler/Cebeci/Gazi), kombi+baca+hat bağlantısı (50. Yıl/Esentepe), gaz kokusu güvenlik protokolü. Distinct from esenyurt (yeni site) & beykoz (villa/plaza). Comparison (4 rows), 5 price signals, 4 unique local FAQ, İGDAŞ/sertifikalı vurgusu, landmarks. tsgo temiz.
- Page 27: Enriched `zeytinburnu:dusakabin-vitrifiye-montaji` — kentsel dönüşüm dairelerinde sıfırdan banyo + ankastre vitrifiye (Seyitnizam/Beştelsiz/Sümer), eski yoğun apartmanda sızıntılı takım değişimi + alt kata inme riski (Telsiz/Çırpıcı/Merkezefendi), Kazlıçeşme karma konut-ticaret işyeri montajı. Distinct from beylikduzu (yeni site/villa). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 28: Enriched `gaziosmanpasa:mutfak-gider-acma` — eski apartman galvaniz yağ-kireç daralması + ortak kolon (Karayolları/Sarıgöl), çift gözlü evye geri tepme + sifon/koku (Yenidoğan/Mevlana/Karadeniz), cadde üzeri lokanta yağ + kanal jeti/yağ tutucu. Distinct from kucukcekmece mutfak-gider. Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 29: Enriched `esenler:tuvalet-tikanikligi-acma` — yoğun apartman klozet taşma/geri tepme + ortak kolon (Menderes/Oruçreis/Çiftehavuzlar), dönüşüm dairesinde gömme rezervuar/asma klozet + yabancı cisim (Fevzi Çakmak/Birlik), İstanbul Otogarı çevresi ticari ortak WC yoğun kullanım. Distinct from fatih tuvalet (tarihi). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 30: Enriched `sancaktepe:kanal-goruntuleme` — yeni sitelerde inşaat/montaj hatası (ters eğim, moloz, kaçık ek) erken tıkanma (Yenidoğan/Emek/Meclis), eski müstakil/bahçeli konutta ağaç kök sarması + toprak altı çökme, kazısız nokta tespiti (Sarıgazi/Samandıra/Osmangazi), karma konut-işyeri periyodik kontrol + iskân/müteahhit anlaşmazlığı için videolu rapor (Abdurrahmangazi/Akpınar). Distinct from kagithane kanal-goruntuleme (eğimli topografya/kentsel dönüşüm). Comparison (5 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 31: Enriched `bayrampasa:petek-temizligi` — yıllarca hiç temizlenmemiş orta yaşlı yoğun apartmanda kalın çamur/kireç + alttan ısıtmama (Yıldırım/Muratpaşa/Terazidere), merkezi/kat kaloriferinden bireysel kombiye dönmüş dairelerde eski tesisatta ağır çamur → devreye almadan temizlik+balans (Kartaltepe/Vatan/Cevatpaşa), yoğun blokta toplu program + kolon balansı + Otogar/toptancı işyeri (Altıntepsi/Kocatepe). Distinct from kartal petek (yeni kule vs eski apartman). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 32: Enriched `gungoren:kanalizasyon-acma` — çok yoğun eski apartman dokusunda ortak ana hat/kolon/rögar tıkanması + geri tepme (Güneştepe/Tozkoparan/Gençosman), Merter/Sanayi tekstil-konfeksiyon atölye/toptancıda iplik-kumaş artığı + yağ → jet + süzgeç + kurumsal sözleşme (Merter/Akıncılar), alçak eski dere yatağı kotunda yağışta bodrum/zemin geri tepme → kamera + çek valf önerisi. Distinct from bagcilar (atölye/İSKİ sorumluluk) & maltepe (sahil). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 33: Enriched `sultanbeyli:kombi-montaji` — sobalı/tüplü sistemden yeni doğalgaza geçen dairelerde ilk kez kombi + baca yok → hermetik baca açımı + sıfırdan iç tesisat & petek yerleşimi (Abdurrahmangazi/Mehmet Akif/Turgutreis), önceden dönmüş bloklarda eski kombi değişimi + yoğuşmalı geçiş kondens (Fatih/Hasanpaşa/Battalgazi), bütçeye duyarlı hane → şeffaf keşif/net maliyet + İGDAŞ standardı. Distinct from cekmekoy (villa/yerden ısıtma/don) & atasehir (plaza/rezidans). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 34: Enriched `adalar:hidrofor-kurulumu` — yokuşlu tarihi ahşap köşk/konakta üst kat basıncı + sessiz/titreşim takozlu pompa (Büyükada Nizam/Maden, Heybeliada), yaz nüfus patlamasında düşen şebeke → depo+hidrofor+kuru çalışma koruması, sezonluk yazlıkta kışın boşaltma+yaz devreye alma (Burgazada/Kınalıada), pansiyon/otel/restoran çok pompalı yedekli + ada lojistiği (vapur/elektrikli araç) + tuz korozyonu paslanmaz/PE-X. Distinct from tuzla (sanayi/villa) & umraniye (apartman). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 35: Enriched `silivri:musluk-batarya-degisimi` — sert/kireçli suda perlatör-kartuş-bağlantı tıkanması → kireç çözme + kartuş yenileme + hat filtresi (Alibey/Piri Mehmet Paşa/Yeni Mahalle), yazlık site/villada sezon açılışı conta kuruması damlama + deniz havası korozyon → iç takım + toplu kontrol (Selimpaşa/Gümüşyaka/Kavaklı), kırsal/kıyı bahçeli konutta dış musluk don/tuz → dona-tuza dayanıklı model (Değirmenköy/Semizkumlar). Distinct from besiktas (ithal ankastre/tarihi) & basaksehir (yeni site). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 36: Enriched `catalca:tuvalet-tikanikligi-acma` — kırsal/müstakil fosseptik bağlı konutta "geri tepme" çoğu kez tıkanıklık değil dolmuş fosseptik → hat kontrol + vidanjör koordinasyonu (Ferhatpaşa/Kaleiçi/İzzettin), eski köy evi alaturka + kuyu/sert su kireç → özel uçlu spiral (Ovayenice/Çakıl), yeni villa gömme rezervuar/asma klozet sökmeden kapaktan müdahale (Muratbey/Merkez), dağınık köylerde bölge planlama + kamera. Distinct from fatih (tarihi han/toptancı) & esenler (yoğun apartman otogar). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 37: Enriched `arnavutkoy:dusakabin-vitrifiye-montaji` — yeni TOKİ/site dairelerinde sıfırdan banyo (duşakabin+asma klozet+lavabo), gönye/teraziye alma (Taşoluk/Bolluca/Hadımköy), köy/müstakil banyo yenileme + kuyu/sert su uygun iç takım (Boğazköy/Ömerli/Baklalı), havalimanı-sanayi çevresi kiralık/işçi konutu dayanıklı-kolay bakım + Karaburun kıyısı silikon/küf yenileme. Distinct from beylikduzu (yerleşik yeni site/villa) & zeytinburnu (kentsel dönüşüm). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 38: Enriched `buyukcekmece:mutfak-gider-acma` — Kumburgaz/Mimarsinan sahil balık lokantası/kafe yoğun yağ + yaz yoğunluğu → kanal jeti + yağ tutucu + sözleşme, yazlık site/villa sezon açılışı kuru sifon kokusu + ankastre yağ → sifon/havalandırma + toplu bakım (Kamiloba/Celaliye/Karaağaç), yerleşik apartman çift gözlü evye geri tepme (Merkez/Mimarsinan/Atatürk). Distinct from kucukcekmece (Halkalı ankastre/göl çevresi) & gaziosmanpasa (eski apartman/cadde lokanta). Comparison (4 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz. Not: 39/39 ilçenin en az bir enrichment'ı var.
- Page 39: Enriched `kadikoy:kanal-goruntuleme` (Kadıköy'ün 2. sayfası; yüksek hacimli ilçe) — Moda/Caferağa/Yeldeğirmeni eski dökme pimaşta çökme/kireç/kaçık ek + yüksek değerli daire alım öncesi rapor, Fikirtepe/Dumlupınar kentsel dönüşüm yıkım-yapım öncesi/sonrası altyapı belgeleme + yeni blok montaj hatası, Kadife Sokak/çarşı kafe-bar-restoran periyodik kamera + Kozyatağı/Bostancı rezidans kolon taraması. Distinct from kagithane (eğimli) & sancaktepe (yeni site/bahçe kök). Comparison (5 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz.
- Page 40: Enriched `uskudar:su-kacagi-tespiti` (Üsküdar'ın 2. sayfası; yüksek hacimli ilçe) — Kuzguncuk/Çengelköy/Beylerbeyi/Kandilli tarihi ahşap köşk-konakta kırımsız termal+akustik+gaz tespiti (ahşap dokuyu koru), Bağlarbaşı/Ahmediye/Selamsız/Salacak eski apartman galvaniz/pik kolon ek yeri kaçağı → basınç testiyle hangi daire + komşu anlaşmazlığı için tarih-saatli rapor, Acıbadem/Altunizade/Ünalan/Kısıklı-Çamlıca yeni site gömme tesisat/yerden ısıtma serpantin/teras-otopark izolasyon → döşeme kırmadan tespit; yamaç/istinat duvarı zemin suyu vs tesisat ayrımı. Distinct from bakirkoy & avcilar & sisli su-kacagi. Comparison (5 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz. su-kacagi-tespiti artık 4 sayfa.
- Page 41: Enriched `umraniye:kombi-servisi` (Ümraniye'nin 2. sayfası; çok yüksek hacimli yoğun konut ilçesi) — Atakent/Çakmak/Site/FSM yeni site bloklarında yoğuşmalı kombide basınç düşmesi + kart/genleşme tankı/sızıntı teşhisi, İnkılap/Namık Kemal/Esenevler/Tantavi/Hekimbaşı yerleşik orta yaşlı apartmanda eski konvansiyonel + zayıf ortak baca çekişi kilitlenme + tamir/değişim dürüst kıyas, Aşağı/Yukarı Dudullu OSB atölye-fabrika-iş merkezi kaskad/endüstriyel randevulu-raporlu kurumsal bakım. Distinct from eyupsultan (baca eski bina/Göktürk villa) & pendik (yeni site/havalimanı/sahil nem) & sariyer (plaza/yalı/orman soğuk mikroklima). Comparison (5 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz. kombi-servisi artık 4 sayfa.
- Page 42: Enriched `bagcilar:tikaniklik-acma` (Bağcılar'ın 2. sayfası; İstanbul'un en yoğun nüfuslu ilçelerinden) — Yıldıztepe/Demirkapı/Kirazlı/Fatih/Barbaros sonradan kat eklenmiş 1980-2000 apartmanlarda aşırı yüklü dar ortak kolon geri tepme + daire içi/kolon ayrımı + jet, Güneşli/Mahmutbey/İSTOÇ tekstil-konfeksiyon-plastik-mobilya atölye + toptancıda iplik-kumaş lifi/alçı/boya/talaş/yağ → kanal jeti + süzgeç/yağ tutucu + periyodik sözleşme, Kazım Karabekir/Yenimahalle dar sokak erişim (uzun hortum/taşınabilir) + bodrum geri tepme acil. Distinct from kadikoy (yüz yıllık/Bağdat Cd. lokanta/site pimaş) & bahcelievler (orta yaşlı apartman kolon) & beyoglu (tarihi taş bina/kafe-otel mutfağı). Comparison (5 rows), 5 price signals, 4 unique local FAQ, landmarks. tsgo temiz. tikaniklik-acma artık 4 sayfa.

---

## Indexing / Tiering pass (crawl-budget odaklama) — `src/lib/matrix-tier.ts`

Sorun: ~507 district×service matrix + 3 mahalle sayfası, düşük otoriteli genç domainde büyük oranda "Crawled/Discovered – currently not indexed" kalıyor (template near-duplicate). Çözüm: sayfaları 3 tier'e bölüp crawl budget'ı yüksek değerli sayfalara odaklamak.

- **matrixTier(d,s)** = districtRank + serviceRank (2..6): `>=5 → Tier1`, `==4 → Tier2`, `<=3 → Tier3`.
  - Tier1 districts (rank3, 16): kadikoy, uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, maltepe, kartal, pendik, beylikduzu, sariyer, beyoglu, fatih, esenyurt, kucukcekmece.
  - Small districts (rank1, 6): adalar, sile, catalca, silivri, buyukcekmece, arnavutkoy. Diğerleri mid (rank2).
  - Core services (rank3, 6): su-kacagi-tespiti, tikaniklik-acma, kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma. Niche (rank1, 2): dusakabin-vitrifiye-montaji, hidrofor-kurulumu. Diğerleri secondary (rank2).
- **Dağılım:** Tier1=278, Tier2=153, Tier3=76. Indexable (T1+T2)=431, noindex+pruned=76 matrix + 3 mahalle.
- **Uygulama:**
  - `sitemap.xml.ts`: Tier3 ve mahalle sayfaları sitemap'ten çıkarıldı; priority tier'e göre (T1=0.6, T2=0.5).
  - `tesisatci.$slug.$service.tsx`: Tier3'te `robots: noindex, follow` (SSR'da doğrulandı).
  - `tesisatci.$slug.mahalle.$neighborhood.tsx`: `NEIGHBORHOOD_INDEXABLE=false` iken `noindex, follow`.
- **Ayar knob'u:** agresiflik tek yerden — matrix-tier.ts'teki setler + eşikler. Şu an orta; daha agresif prune istenirse Tier1 setini daraltıp eşik yükseltilebilir.
- **GSC sonraki adım (kullanıcı):** sitemap resubmit; Tier1 sayfalarında "Request indexing"; Coverage raporunda "Crawled – currently not indexed" düşüşünü izle.

---

## Part 3 — Tier 1 içerik zenginleştirme (Batch A) — `src/data/matrix-enrichment.ts`

Amaç: Tier 3 noindex sonrası crawl budget Tier 1'e akıyor; ancak Tier 1 sayfaları çoğunlukla template. Google'ın index etmesi için flagship sayfalara elle yazılmış, lokal + servis-özel derinlik eklendi.

- **Batch A tamamlandı: 32 yeni enrichment record** (top-10 yüksek talepli ilçe × 4 core servis kombinasyonlarının eksik olanları).
  - İlçeler: kadikoy, uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, maltepe, kartal, pendik.
  - Servisler: su-kacagi-tespiti, tikaniklik-acma, kombi-servisi, petek-temizligi.
- Her record: benzersiz intro + 2 localGuide paragrafı (ilçe bina dokusu + servis özelinde) + servis-özel comparison tablosu + 5 priceSignal + priceNote + 3 lokal FAQ + landmarks (gerçek mahalle/cadde).
- **Durum:** MATRIX_ENRICHMENT toplam 74 record; hepsinin intro'su benzersiz (74/74). Tier 1 enriched = 57/278. `tsgo` temiz. SSR doğrulandı (Bölgeye Özel Rehber + fiyat tablosu render, Tier 1'de noindex yok).
- **Sırada (Batch B/C):** kalan core servis × Tier 1 ilçeleri, ardından secondary servisler × Tier 1.
- **GSC (kullanıcı):** deploy sonrası Batch A sayfalarında "Request indexing"; sitemap resubmit; "Crawled – currently not indexed" düşüşünü izle.

## Part 3 — Tier 1 içerik zenginleştirme (Batch B) — `src/data/matrix-enrichment.ts`

- **Batch B tamamlandı: 19 yeni enrichment record** (kalan 2 core servis × top-demand Tier 1 ilçeleri).
  - `kanalizasyon-acma` (×9): kadikoy, uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, kartal, pendik (maltepe zaten vardı).
  - `tuvalet-tikanikligi-acma` (×10): kadikoy, uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, maltepe, kartal, pendik.
- Her record: benzersiz intro + 3 localGuide paragrafı (ilçe bina/coğrafya dokusu + servis özelinde: geri tepme/alçak kot, asma klozet/gömme rezervuar, yabancı cisim, yağ tutucu, kök) + comparison tablosu + 4-5 priceSignal + priceNote + 4 lokal FAQ + landmarks.
- **Durum:** MATRIX_ENRICHMENT toplam 93 record; hepsinin intro'su benzersiz (93/93). Tier 1 enriched = 76/278. `tsgo` temiz. SSR doğrulandı (Bölgeye Özel bloğu render, Tier 1'de noindex yok).
- **Sırada (Batch C):** secondary servisler (dogalgaz-tesisati, kanal-goruntuleme, kombi-montaji, musluk-batarya-degisimi, mutfak-gider-acma) × Tier 1 ilçeleri + kalan core servis × outer Tier 1 ilçeleri.
- **GSC (kullanıcı):** deploy sonrası Batch B URL'lerinde "Request indexing"; sitemap resubmit.

## Part 3 — Tier 1 içerik zenginleştirme (Batch C) — `src/data/matrix-enrichment.ts`

- **Batch C tamamlandı: 16 yeni enrichment record** (2 en yüksek ROI core servis × genişleme Tier 1 ilçeleri).
  - `su-kacagi-tespiti` (×9): beylikduzu, esenyurt, kucukcekmece, bahcelievler, fatih, beyoglu, sariyer, basaksehir, bagcilar (avcilar zaten vardı).
  - `tikaniklik-acma` (×7): beylikduzu, esenyurt, kucukcekmece, avcilar, fatih, sariyer, basaksehir (beyoglu/bagcilar/bahcelievler zaten vardı).
- Her record: benzersiz intro + 3 localGuide paragrafı (ilçe bina/coğrafya dokusuna özel: yeni site ankastre/gömme rezervuar, galvaniz korozyon, tarihi/tescilli hasarsız, göl/deniz nem, Maslak plaza vs Boğaz yalı, TOKİ montaj kaynaklı, sanayi/atölye) + priceSignals + priceNote + 3 lokal FAQ + landmarks.
- **Durum:** MATRIX_ENRICHMENT toplam 109 record; hepsinin intro'su benzersiz (109/109). Tier 1 enriched = 92/278 (kalan 186). `tsgo` temiz.
- **Sırada (Batch D):** kalan core servis × outer Tier 1 ilçeleri (gaziosmanpasa, sultangazi, tuzla, cekmekoy, beykoz, kagithane, zeytinburnu, eyupsultan, esenler, bayrampasa, gungoren, sancaktepe, sultanbeyli) + secondary servisler (dogalgaz-tesisati, kanal-goruntuleme, kombi-montaji, musluk-batarya-degisimi, mutfak-gider-acma) × Tier 1.
- **GSC (kullanıcı):** deploy sonrası Batch C URL'lerinde "Request indexing"; sitemap resubmit.

## Part 3 — Tier 1 içerik zenginleştirme (Batch D) — `src/data/matrix-enrichment.ts`

- **Batch D tamamlandı: 26 yeni enrichment record** (2 core servis × 13 outer Tier 1 ilçesi). Bununla birlikte `su-kacagi-tespiti` ve `tikaniklik-acma` artık **tüm Tier 1 ilçelerinde** eksiksiz.
  - `su-kacagi-tespiti` (×13): beykoz, cekmekoy, gaziosmanpasa, sultangazi, sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren.
  - `tikaniklik-acma` (×13): beykoz, cekmekoy, gaziosmanpasa, sultangazi, sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren.
- Her record: benzersiz intro + 3 localGuide paragrafı (ilçeye özel: Kavacık plaza/Boğaz yalı, villa yerden ısıtma/foseptik, kentsel dönüşüm eski↔yeni, doğalgaz dönüşümü, TOKİ montaj kaynaklı, tuzlu sahil korozyon/OSB endüstriyel, tarihi tescilli, bitişik nizam daireler arası, eğimli topografya, otogar/sebze hali/tekstil atölye ticari) + priceSignals + priceNote + 3 lokal FAQ + landmarks.
- **Durum:** MATRIX_ENRICHMENT toplam 135 record; hepsinin intro'su benzersiz (135/135). Tier 1 enriched = 118/278 (kalan 160). `tsgo` temiz. SSR doğrulandı (Bölgeye Özel Rehber render, Tier 1'de noindex yok).
- **Sırada (Batch E):** secondary servisler × Tier 1 ilçeleri — dogalgaz-tesisati, kanal-goruntuleme, kombi-montaji, musluk-batarya-degisimi, mutfak-gider-acma + kalan kanalizasyon-acma/kombi-servisi/petek-temizligi/tuvalet-tikanikligi-acma outer ilçeleri.
- **GSC (kullanıcı):** deploy sonrası Batch D URL'lerinde "Request indexing"; sitemap resubmit.

- [x] **Batch E — doğalgaz-tesisatı (Tier 1, 15 ilçe). ✓ DONE**
  Added 15 hand-written unique enrichment records for `dogalgaz-tesisati` across the remaining
  Tier 1 districts: kadikoy, uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, maltepe,
  kartal, pendik, beylikduzu, sariyer, beyoglu, fatih, kucukcekmece. This COMPLETES doğalgaz
  enrichment for all Tier 1 districts. Each record grounded in real building stock (Moda kâgir
  apartmanlar, Bebek/yalı cephe kısıtları, Nişantaşı tarihi yapı, Dudullu OSB ticari hat,
  Zekeriyaköy villa, Galata/Balat tescilli yapı, Eminönü han/lokanta ticari mutfak) with İGDAŞ
  proje + mukavemet-testi framing, comparison table, price signals, 4 unique local FAQ, landmarks.
  **Progress:** 150 total enrichment records; Tier 1 now 133/278 enriched (145 remaining).
  Verified: tsgo clean, SSR 200 + enrichment block renders + indexable (no noindex) on
  kadikoy/beyoglu/sariyer dogalgaz pages.

- [x] **Batch F — mutfak-gider-açma (Tier 1, 14 ilçe). ✓ DONE**
  Added 14 hand-written unique enrichment records for `mutfak-gider-acma` across top Tier 1
  districts: kadikoy, uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, maltepe, kartal,
  pendik, beylikduzu, sariyer, beyoglu, fatih. (kucukcekmece/gaziosmanpasa/buyukcekmece zaten vardı.)
  Her record ilçenin gerçek dokusuna göre farklılaştı: eski dökme (pimaş) hat spiral açımı, yoğun
  kafe-restoran/meyhane kanal jeti + yağ tutucu + periyodik bakım, çift gözlü ankastre evye
  geri tepme/eğim revizyonu, sahil balık lokantası yaz yoğunluğu, villa uzun hat/foseptik + kamera,
  tarihi/tescilli yapıda hasarsız çalışma, esnaf lokantası/otel ticari mutfak. Comparison tablosu,
  price signals, 3 lokal FAQ, landmarks içerir.
  **Progress:** 164 total enrichment records; Tier 1 now 147/278 enriched (131 remaining).
  Verified: tsgo clean, SSR 200 + "Bölgeye Özel" bloğu render + indexable (no noindex).
  **Sırada (Batch G):** kalan secondary servisler × Tier 1 — kanal-goruntuleme, kombi-montaji,
  musluk-batarya-degisimi + outer ilçe core servis boşlukları.

- [x] **Batch G — kombi-montajı (Tier 1, 14 ilçe). ✓ DONE**
  Added 14 hand-written unique enrichment records for `kombi-montaji` across top Tier 1
  districts: kadikoy, uskudar, besiktas, sisli, bakirkoy, umraniye, maltepe, kartal, pendik,
  beylikduzu, sariyer, beyoglu, fatih, kucukcekmece. (atasehir/cekmekoy/sultanbeyli zaten vardı.)
  Montaj odaklı, kombi-servisi'nden ayrışan içerik: kapasite (kW) hesabı, bacalı→hermetik
  yoğuşmalı geçiş + ortak/şönt baca uygunluğu, cephe/tarihi doku kısıtı (Galata/Balat/yalı),
  kombi yeri değişikliği (gaz+baca revizyonu), villa yüksek kapasite (Zekeriyaköy), ilk devreye
  alma + garanti. Comparison tablosu, price signals, 3 lokal FAQ, landmarks içerir.
  **Progress:** 178 total enrichment records; Tier 1 now 161/278 enriched (117 remaining).
  Verified: tsgo clean, SSR 200 + "Bölgeye Özel" bloğu render + indexable (no noindex).
  **Sırada (Batch H):** musluk-batarya-degisimi + kanal-goruntuleme × Tier 1 ilçeleri.

- [x] **Batch H — musluk-batarya-değişimi (Tier 1, 14 ilçe). ✓ DONE**
  Added 14 hand-written unique enrichment records for `musluk-batarya-degisimi` across top Tier 1
  districts: kadikoy, uskudar, sisli, bakirkoy, atasehir, umraniye, maltepe, kartal, pendik,
  beylikduzu, sariyer, beyoglu, fatih, kucukcekmece. (besiktas/basaksehir/silivri zaten vardı.)
  İçerik ayrışması: ankastre gömme batarya iç takım/kartuş değişimi vs komple değişim, kireçli-paslı
  ara musluk (köşe vana) yenileme (eski apartman), damla=kartuş/conta tamiri (komple değişim değil),
  tarihi/tescilli standart dışı bağlantı (Galata/Balat), kafe-otel yoğun kullanım dayanıklı armatür,
  villa çoklu/tasarım armatür (Zekeriyaköy), yeni site montaj/conta sızdırma. Comparison, price
  signals, 3 lokal FAQ, landmarks içerir.
  **Progress:** 192 total enrichment records; Tier 1 now 175/278 enriched (103 remaining).
  Verified: tsgo clean, SSR 200 + "Bölgeye Özel" bloğu render + indexable (no noindex).
  **Sırada (Batch I):** kanal-goruntuleme × Tier 1 + kalan secondary/core boşlukları.

- [x] **Batch I — kanal-görüntüleme (Tier 1, 14 ilçe). ✓ DONE**
  Added 14 hand-written unique enrichment records for `kanal-goruntuleme` across top Tier 1
  districts: uskudar, besiktas, sisli, bakirkoy, atasehir, umraniye, maltepe, kartal, pendik,
  beylikduzu, sariyer, beyoglu, fatih, kucukcekmece. (kadikoy/kagithane/sancaktepe zaten vardı.)
  İçerik robot kameralı tespit odaklı ve ilçe dokusuna göre farklılaştı: tescilli yalı/yüzyıllık
  yapıda hasarsız nokta tespiti + lokalizatör (Kuzguncuk/Bebek/Galata/Balat/Yeniköy), eski dökme
  (pimaş) hatta çökme/kaçık ek/kireç, yüksek blok/plaza ortak kolon (pimaş) taraması, yeni sitede
  inşaat kaynaklı montaj hatası + tarih-saatli videolu rapor, villa uzun bahçe/foseptik hattı,
  OSB endüstriyel hat (Dudullu/İkitelli), sahil/alçak kot geri tepme ayrımı, kafe-bar-meyhane
  periyodik ticari kontrol. Comparison tablosu, price signals, 3 lokal FAQ, landmarks içerir.
  **Progress:** 206 total enrichment records; Tier 1 now 189/278 enriched (89 remaining).
  Verified: tsgo clean, SSR 200 + "Bölgeye Özel" bloğu render + indexable (no noindex) on
  besiktas/fatih/beylikduzu kanal-goruntuleme pages.
  **Sırada (Batch J):** kalan secondary servisler × Tier 1 + outer ilçe core servis boşlukları.
  **GSC (kullanıcı):** deploy sonrası Batch I URL'lerinde "Request indexing"; sitemap resubmit.

- [x] **Batch J — Esenyurt flagship ilçe TAMAMLAMA (8 servis). ✓ DONE**
  Esenyurt (İstanbul'un en kalabalık ilçesi, Tier 1 flagship) tek ilçe olarak eksik kalan
  8 Tier 1 servisiyle tam kapatıldı: petek-temizligi, kombi-servisi, kanalizasyon-acma,
  tuvalet-tikanikligi-acma, kanal-goruntuleme, mutfak-gider-acma, musluk-batarya-degisimi,
  kombi-montaji. (dogalgaz-tesisati/su-kacagi-tespiti/tikaniklik-acma zaten vardı → Esenyurt
  artık 11/11 Tier 1 servisinde eksiksiz.)
  İçerik ilçenin dokusuna göre grounded: 2000 sonrası hızlı inşa edilmiş yoğun site/rezidans
  stoku (inşaat kaynaklı montaj hatası → erken tıkanma + videolu rapor), kireçli şebeke suyu
  (eşanjör/kartuş/ara musluk kireçlenmesi), ortak kolon (pimaş) yoğunluğu, Akçaburgaz/Kıraç
  sanayi hatları, kalabalık aile nüfusu (ıslak mendil/yağ kaynaklı tıkanma). Her kayıt intro +
  3 localGuide + comparison + priceSignals + 3 lokal FAQ + landmarks içerir.
  **Progress:** 214 total enrichment records; Tier 1 now 197/278 enriched (81 remaining).
  Verified: tsgo clean, gap script Esenyurt=0 missing; SSR 200 + "Bölgeye Özel" bloğu render +
  indexable (no noindex) on esenyurt petek-temizligi/kombi-montaji/kanal-goruntuleme.
  **Kalan 81 (Batch K+):** çoğunluğu core servisler × mid-tier ilçeler — petek-temizligi (21),
  kombi-servisi (20), kanalizasyon-acma (20), tuvalet-tikanikligi-acma (20).
  **GSC (kullanıcı):** deploy sonrası Batch J URL'lerinde "Request indexing"; sitemap resubmit.

- [x] **Batch K — kalan 5 Tier 1 ilçesi × core servis TAMAMLAMA (18 kayıt). ✓ DONE**
  Tüm 16 Tier 1 ilçesi artık eksiksiz. Eksik kalan core servisler eklendi:
  beylikduzu (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma),
  sariyer (petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma),
  beyoglu (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma),
  fatih (kombi-servisi, petek-temizligi, kanalizasyon-acma),
  kucukcekmece (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma).
  İçerik ilçe dokusuna grounded: Beylikdüzü yeni site/villa (Yakuplu-Gürpınar) + Marmara nem;
  Sarıyer yalı/villa (Yeniköy-Zekeriyaköy) + Maslak plaza + Boğaz eğim/kot; Beyoğlu ve Fatih
  tescilli yüzyıllık yapı (Galata/Cihangir, Balat/Süleymaniye) + meyhane/han-lokanta ticari hat;
  Küçükçekmece yeni site (Halkalı-Atakent) + İkitelli OSB + kireçli su. Her kayıt intro +
  3 localGuide + comparison + priceSignals + 3 lokal FAQ + landmarks içerir.
  **Progress:** 232 total enrichment records; Tier 1 now 215/278 enriched (63 remaining).
  **Milestone:** 16/16 Tier 1 ilçesinin tümü tüm Tier 1 servislerinde eksiksiz.
  Verified: tsgo clean, gap script Tier1 districts = 0 missing; SSR 200 + "Bölgeye Özel" render +
  indexable on beyoglu/kombi-servisi, fatih/kanalizasyon-acma, sariyer/petek-temizligi.
  **Kalan 63 (Batch L+):** yalnızca mid-tier (rank2) ilçeler × 4 core servis — beykoz, cekmekoy,
  bagcilar, avcilar, basaksehir, bahcelievler, gaziosmanpasa, sultangazi, sancaktepe, sultanbeyli,
  tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren.
  **GSC (kullanıcı):** deploy sonrası Batch K URL'lerinde "Request indexing"; sitemap resubmit.

- [x] **Batch L — beykoz + cekmekoy TAMAMLAMA (8 kayıt). ✓ DONE**
  İlk iki mid-tier (rank2) ilçe tam kapatıldı. Her ilçeye eksik 4 core servis eklendi:
  beykoz (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma),
  cekmekoy (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma).
  İçerik ilçe dokusuna grounded: Beykoz Kavacık plaza/ofis (kaskad kombi, mesai dışı) +
  Acarkent/Çubuklu lüks villa (yoğuşmalı, yerden ısıtma, çok petekli) + Boğaz yalıları
  (Paşabahçe/Anadolu Hisarı/Kanlıca: döküm radyatör, uzun baca, kot/eğim geri tepme);
  Çekmeköy Taşdelen/Alemdağ villa siteleri (yerden ısıtma, ağaç kökü) + Ömerli/Hamidiye
  müstakil (depo/kuyu suyu tortu-kireç, foseptik, şehir kanalına uzaklık) + kış donma riski.
  Her kayıt intro + 3 localGuide + (kombi'de comparison) + priceSignals + 3 lokal FAQ + landmarks.
  **Progress:** 240 total enrichment records; Tier 1 now 223/278 enriched (55 remaining).
  Verified: tsgo clean, gap script beykoz/cekmekoy=0 missing; SSR 200 + "Bölgeye Özel" render +
  indexable (no noindex) on beykoz/kombi-servisi, cekmekoy/kanalizasyon-acma,
  beykoz/tuvalet-tikanikligi-acma, cekmekoy/petek-temizligi.
  **Kalan 55 (Batch M+):** yalnızca mid-tier ilçeler × core servis — bagcilar, avcilar,
  basaksehir, bahcelievler, gaziosmanpasa, sultangazi, sancaktepe, sultanbeyli, tuzla,
  eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren.
  **GSC (kullanıcı):** deploy sonrası Batch L URL'lerinde "Request indexing"; sitemap resubmit.

- [x] **Batch M — bagcilar + avcilar + basaksehir TAMAMLAMA (11 kayıt). ✓ DONE**
  Üç mid-tier (rank2) ilçe tam kapatıldı. Eksik core servisler eklendi:
  bagcilar (kombi-servisi, petek-temizligi, tuvalet-tikanikligi-acma),
  avcilar (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma),
  basaksehir (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma).
  İçerik ilçe dokusuna grounded: Bağcılar yoğun konut + kireçli su + Mahmutbey sanayi/atölye +
  eski galvaniz kolon; Avcılar Marmara sahili nemi/tuz (Denizköşkler/Ambarlı) + 1999 öncesi
  oturmuş zemin (Merkez/Tahtakale/Firuzköy: kırık/çökme hat, geri tepme) + öğrenci yoğun daire
  (Üniversite/Cihangir); Başakşehir yeni TOKİ/site (Kayaşehir/Başak: montaj artığı, hidrofor
  basıncı, kaskad) + villa yerden ısıtma (Bahçeşehir/Şahintepe). Her kayıt intro + 3 localGuide +
  (kombi'de comparison) + priceSignals + 3 lokal FAQ + landmarks.
  **Progress:** 251 total enrichment records; Tier 1 now 234/278 enriched (44 remaining).
  Verified: tsgo clean, gap script bagcilar/avcilar/basaksehir=0 missing; SSR 200 + "Bölgeye Özel"
  render + indexable (no noindex) on bagcilar/kombi-servisi, avcilar/kanalizasyon-acma,
  basaksehir/petek-temizligi, bagcilar/tuvalet-tikanikligi-acma.
  **Kalan 44 (Batch N+):** bahcelievler, gaziosmanpasa, sultangazi, sancaktepe, sultanbeyli,
  tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren × core servis.
  **GSC (kullanıcı):** deploy sonrası Batch M URL'lerinde "Request indexing"; sitemap resubmit.

- [x] **Batch N — bahcelievler + gaziosmanpasa + sultangazi TAMAMLAMA (12 kayıt). ✓ DONE**
  Üç mid-tier ilçe tam kapatıldı; her birine eksik 4 core servis eklendi
  (kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma).
  İçerik ilçe dokusuna grounded: Bahçelievler 1980-2000 orta yaşlı apartman (Şirinevler/Yenibosna:
  galvaniz kolon, kireç, ortak baca) + Kocasinan/Çobançeşme dönüşüm; Gaziosmanpaşa hızlı kentsel
  dönüşüm (Karayolları/Sarıgöl eski + Yenidoğan/Mevlana/Karadeniz yeni: montaj/inşaat kalıntısı);
  Sultangazi yoğun konut + görece yeni doğalgaz dönüşümü + su sertliği (Habipler/Cebeci/Gazi/
  Uğur Mumcu/50. Yıl). Her kayıt intro + 3 localGuide + (kombi'de comparison) + priceSignals +
  3 lokal FAQ + landmarks.
  **Progress:** 263 total enrichment records; Tier 1 now 246/278 enriched (32 remaining).
  Verified: tsgo clean, gap script bahcelievler/gaziosmanpasa/sultangazi=0 missing; SSR 200 +
  "Bölgeye Özel" render + indexable (no noindex) on bahcelievler/kombi-servisi,
  gaziosmanpasa/petek-temizligi, sultangazi/kanalizasyon-acma, bahcelievler/tuvalet-tikanikligi-acma.
  **Kalan 32 (Batch O+):** sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane,
  esenler, bayrampasa, gungoren × core servis.
  **GSC (kullanıcı):** deploy sonrası Batch N URL'lerinde "Request indexing"; sitemap resubmit.

## Batch O (2026-07-13)
- Added 12 core-service enrichment records for **Sancaktepe**, **Sultanbeyli**, **Tuzla** (each: kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma).
- Grounding: Sancaktepe yeni site (Sarıgazi/Samandıra) + müstakil (Abdurrahmangazi/Eyüp Sultan) donan dış hat; Sultanbeyli konut + geç doğalgaz dönüşümü + küçük işyeri; Tuzla konut (Mimar Sinan/Postane) + sahil villa tuz korozyonu (İçmeler/Aydınlı) + organize sanayi endüstriyel hat.
- Each record: intro + 3 localGuide + comparison table (kombi/kanal/tuvalet) or priceSignals (petek) + priceNote + 3 unique local FAQ + landmarks.
- Verify: `gap.js` → 0 missing for sancaktepe/sultanbeyli/tuzla; **275 records, Tier1 258/278, 20 remaining**; tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok on 3 URLs.
- **Batch P+ remaining (20):** eyupsultan (petek, kanal, tuvalet), zeytinburnu (4), kagithane (4), esenler (kombi, petek, kanal), bayrampasa (kombi, kanal, tuvalet), gungoren (kombi, petek, tuvalet).
- **GSC (kullanıcı):** deploy sonrası Batch O URL'lerinde "Request indexing"; sitemap resubmit.

## Batch P (2026-07-13)
- Added 11 core-service enrichment records for **Eyüpsultan** (petek, kanal, tuvalet), **Zeytinburnu** (kombi, petek, kanal, tuvalet), **Kağıthane** (kombi, petek, kanal, tuvalet).
- Grounding: Eyüpsultan tarihi merkez + Göktürk/Kemerburgaz villa + Alibeyköy apartman + Topçular sanayi; Zeytinburnu yoğun apartman + Kazlıçeşme deri sanayi yağ hattı; Kağıthane kentsel dönüşüm (Seyrantepe/Çeliktepe yeni rezidans + Gültepe/Nurtepe eski yapı) + Çağlayan iş merkezleri + eğimli topografya.
- Verify: `gap.js` → **286 records, Tier1 269/278, 9 remaining**; tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok on 3 URLs.
- **Batch Q (final 9):** esenler (kombi, petek, kanal), bayrampasa (kombi, kanal, tuvalet), gungoren (kombi, petek, tuvalet).
- **GSC (kullanıcı):** deploy sonrası Batch P URL'lerinde "Request indexing"; sitemap resubmit.

## Batch Q — FINAL (2026-07-13)
- Added the last 9 core-service enrichment records: **Esenler** (kombi, petek, kanal), **Bayrampaşa** (kombi, kanal, tuvalet), **Güngören** (kombi, petek, tuvalet).
- Grounding: Esenler yoğun apartman + otogar ticari + Fevzi Çakmak dönüşüm; Bayrampaşa yoğun apartman + toptan sebze hali organik atık/yağ hattı; Güngören en yoğun bitişik nizam doku + Tozkoparan tekstil atölye + dar sokak erişimi.
- **✅ Tier 1 COMPLETE: gap.js → 0 missing, 295 enrichment records (278/278 Tier 1 core services covered).**
- Verify: tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok on 3 final URLs; Esenler landmark verisi districts.ts ile hizalandı (Ninçakmak).
- **GSC (kullanıcı):** deploy sonrası tüm Batch N-Q URL'lerinde "Request indexing"; sitemap.xml resubmit.
- **Sonraki adım önerisi:** Tier 2 (kalan servis×ilçe kombinasyonları — su-kaçağı, doğalgaz, hidrofor vb. için ilçe-özel enrichment) veya yayına alıp GSC indeksleme sonuçlarını izleme.

## ══ TIER 2 BAŞLADI ══ Batch R (2026-07-13)
- Tier 2 kapsamı (gap2.js): score==4 servis×ilçe = **153 kayıt hedef, 130 eksik** (Tier 1 tamamlandıktan sonra başladı).
- Batch R: **Adalar** (6 core) + **Şile** (6 core) = 12 kayıt eklendi — ikisi de en distinctive dış ilçeler.
- Grounding: Adalar = motorlu taşıt kısıtı + tarihi ahşap köşk (kırmadan tespit) + deniz nemi korozyonu + LPG'li kombi + yazlık/pansiyon sezonluk + 60 dk deniz ulaşımı. Şile = Karadeniz kıyısı yazlık/pansiyon + kuyu-hidrofor + fosseptik (vidanjör) + tuz korozyonu + LPG kombi + kırsal 60 dk ulaşım.
- Verify: gap2.js → Tier2 done 23 / missing 130; **307 toplam enrichment kaydı**; tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok (4 URL).
- **Tier 2 kalan gruplar:** SMALL dış ilçeler (arnavutkoy, buyukcekmece, catalca, silivri — her biri 5-6 core); T1 ilçelerin niş servisleri (dusakabin + hidrofor ×14 ilçe); T2 ilçelerin mid servisleri (dogalgaz, kanal-goruntuleme, mutfak-gider, musluk-batarya, kombi-montaji).
- **GSC (kullanıcı):** deploy sonrası Batch R URL'lerinde "Request indexing"; sitemap resubmit.

## Batch S (2026-07-13)
- Tier 2 SMALL dış ilçe kapatma: **Büyükçekmece** (6 core) + **Silivri** (6 core) = 12 kayıt eklendi (su-kacagi-tespiti, tikaniklik-acma, kombi-servisi, petek-temizligi, kanalizasyon-acma, tuvalet-tikanikligi-acma).
- Grounding: Büyükçekmece = Marmara sahil siteleri (Mimaroba/Sinanoba yüksek kat, basınç/hidrofor) + Kumburgaz yazlık sezonluk + tuz korozyonu + iç mahalle apartman ortak kolon. Silivri = uzun sahil şeridi yazlık site/villa + Selimpaşa/Gümüşyaka konut + Değirmenköy fosseptik/kuyu-hidrofor müstakil + tuz korozyonu + 50 dk planlı ulaşım.
- Her kayıt: intro + 3 localGuide + comparison/priceSignals + priceNote + 3 lokal FAQ + landmarks (district neighborhoods ile hizalı).
- Verify: **319 toplam enrichment kaydı** (307 → 319); tsgo temiz; SSR 200 + "Bölgeye Özel" render + noindex yok (buyukcekmece/kombi-servisi, silivri/kanalizasyon-acma, buyukcekmece/su-kacagi-tespiti).
- **Tier 2 kalan gruplar:** Çatalca + Arnavutköy (SMALL dış, her biri 6 core); T1 ilçelerin niş servisleri (dusakabin + hidrofor ×14 ilçe); T2 ilçelerin mid servisleri (dogalgaz, kanal-goruntuleme, mutfak-gider, musluk-batarya, kombi-montaji).
- **GSC (kullanıcı):** deploy sonrası Batch S URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch T (2026-07-13)
- Tier 2 SMALL dış ilçe kapatma: **Çatalca** (5 core — tuvalet zaten vardı) + **Arnavutköy** (6 core) = 11 kayıt.
- Grounding: Çatalca = kırsal müstakil/çiftlik + kuyu-hidrofor/depo + fosseptik + Kaleiçi eski yapı + ağaç kökü + LPG kombi + donma + 50 dk. Arnavutköy = Bolluca/Taşoluk müstakil kuyu-hidrofor + havalimanı çevresi yeni site + Hadımköy organize sanayi endüstriyel gider/yüksek kapasiteli hat + LPG/doğalgaz karışık + 45 dk.
- Her kayıt: intro + 3 localGuide + comparison/priceSignals + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı).
- Verify: **330 toplam enrichment kaydı** (319 → 330); tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok (catalca/kombi-servisi, arnavutkoy/kanalizasyon-acma, catalca/su-kacagi-tespiti).
- **✅ Tüm 6 dış/kırsal ilçe (Adalar, Şile, Büyükçekmece, Silivri, Çatalca, Arnavutköy) core servislerde tam kapandı.**
- **Tier 2 kalan gruplar:** T1 ilçelerin niş servisleri (dusakabin-vitrifiye-montaji + hidrofor-kurulumu ×ilçe); T2 ilçelerin mid servisleri (dogalgaz-tesisati, kanal-goruntuleme, mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji).
- **GSC (kullanıcı):** deploy sonrası Batch T URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch U (2026-07-13)
- Tier 2 mid-servis derinleştirme: **Bağcılar** — 5 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati). Bağcılar artık 11/11 serviste tam kapalı.
- Grounding: Güneşli/Kirazlı yerleşik eski apartman (galvaniz kolon, kireçli su, bacalıdan hermetiğe geçiş); Yıldıztepe/Bağlar/Yenimahalle yoğun konut; Mahmutbey/Demirkapı küçük sanayi-atölye-lokanta (yağ hattı, ticari gaz, endüstriyel gider); 35 dk ulaşım.
- Mevcut mid-servis kayıtlarıyla aynı derinlik: intro + 3 detaylı localGuide + comparison + priceSignals(4-5) + priceNote + 3-4 lokal FAQ + landmarks.
- Verify: **335 toplam kayıt** (330 → 335); tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok (bagcilar/dogalgaz-tesisati, /kombi-montaji, /kanal-goruntuleme).
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (gaziosmanpasa 4, sultangazi 4, bahcelievler, avcilar, basaksehir, sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu).
- **GSC (kullanıcı):** deploy sonrası Batch U URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch V (2026-07-14)
- Tier 2 mid-servis derinleştirme: **Gaziosmanpaşa** — 4 mid servis (kanal-goruntuleme, musluk-batarya-degisimi, kombi-montaji, dogalgaz-tesisati). GOP artık 11/11 serviste tam kapalı.
- Grounding: Karayolları/Sarıgöl eski çok katlı apartman + kentsel dönüşüm karışık doku (korozyon/çökme kolon, bacalıdan hermetiğe geçiş, kireçli su); Yenidoğan/Mevlana yeni dönüşüm daireleri (ankastre montaj, inşaat artığı/eğim); Karadeniz/Pazariçi dükkân-lokanta (yağ/kök, ticari gaz hattı); 40 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı).
- Verify: **339 toplam kayıt** (335 → 339); Tier2 done 51→55; tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok (gaziosmanpasa/dogalgaz-tesisati, /kombi-montaji, /kanal-goruntuleme).
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (sultangazi 4, bahcelievler, avcilar, basaksehir, sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji ×15, hidrofor-kurulumu ×15).
- **GSC (kullanıcı):** deploy sonrası Batch V URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch W (2026-07-14)
- Tier 2 mid-servis derinleştirme: **Sultangazi** — 4 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme). dogalgaz-tesisati zaten vardı; Sultangazi artık 11/11 serviste tam kapalı.
- Grounding: Habipler/Cebeci/Gazi eski yoğun apartman doku (yağ+kireç daralması, korozyon/çökme kolon, sobadan/bacalıdan hermetiğe geçiş, sert/kireçli su); Uğur Mumcu/50. Yıl yeni dönüşüm daireleri (ankastre montaj, inşaat artığı/eğim); Yayla/Esentepe/İsmetpaşa dükkân-lokanta (yağ/kök, grease trap); 40 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı).
- Verify: **343 toplam kayıt** (339 → 343); Tier2 done 55→59; tsgo temiz; SSR 200 + "Bölgeye Özel" + noindex yok (4 rotanın hepsi).
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (bahcelievler, avcilar, basaksehir, sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji ×15, hidrofor-kurulumu ×15).
- **GSC (kullanıcı):** deploy sonrası Batch W URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch X (2026-07-14)
- Tier 2 tam kapama: **Bahçelievler** — 5 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 7 kayıt. Bahçelievler artık 13/13 serviste tam kapalı.
- Grounding: Siyavuşpaşa/Cumhuriyet orta yaşlı yoğun apartman (yağ+kireç daralması, korozyon/çökme kolon, bacalıdan hermetiğe geçiş, kireçli su); Şirinevler/Yenibosna yoğun konut blokları (ortak kolon tıkanması, küvetten duşakabine dönüşüm, depo+hidrofor); Soğanlı/Kocasinan/Çobançeşme dükkân-lokanta (yağ/kök, grease trap, ticari gaz hattı); 35 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4-5) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı).
- **Tier motoru güncellemesi:** Tier 3 skorundaki niş kombinasyonlar artık el yazımı enrichment taşıyorsa index'e alınıyor. `tesisatci.$slug.$service.tsx`: `noindex = matrixTier===3 && !enrich`; `sitemap.xml.ts`: Tier 3 kombolar enrichment varsa sitemap'e dâhil. Böylece derin içerikli niş sayfalar (Bahçelievler dusakabin + hidrofor) index'e ve sitemap'e girdi.
- Verify: **350 toplam kayıt** (343 → 350); tsgo temiz; 7 rotanın hepsi SSR 200 + "Bölgeye Özel"; 5 mid + 2 niş noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (avcilar, basaksehir, sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch X URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch Y (2026-07-14)
- Tier 2 tam kapama: **Avcılar** — 5 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 7 kayıt. Avcılar artık 13/13 serviste tam kapalı.
- Grounding: Merkez/Cihangir/Firuzköy yoğun+eski apartman (yağ+kireç daralması, bacalıdan hermetiğe geçiş, sert su); sahil hattı zemin oturması → boru kayması/çökmesi (kanal görüntüleme); Üniversite (İÜ-Cerrahpaşa Avcılar kampüsü)/Gümüşpala öğrenci-kiralık daireleri (yoğun kullanım, küvetten duşakabine dönüşüm); Ambarlı liman/sanayi + Denizköşkler/Tahtakale dükkân-lokanta (grease trap, ticari gaz hattı); 40 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4-5) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfalar enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **357 toplam kayıt** (350 → 357); tsgo temiz; 7 rotanın hepsi SSR 200 + "Bölgeye Özel" + noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (basaksehir, sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch Y URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch Z (2026-07-14)
- Tier 2 tam kapama: **Başakşehir** — 4 mid servis (mutfak-gider-acma, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 6 kayıt. musluk-batarya-degisimi zaten vardı; Başakşehir artık 13/13 serviste tam kapalı.
- Grounding: Kayaşehir/Başak yüksek katlı TOKİ+site blokları (ortak kolon/pimaş yağ birikmesi, montaj kaynaklı bağlantı hataları, üst katlarda basınç düşmesi → frekans kontrollü hidrofor); Bahçeşehir/Şahintepe/Güvercintepe bahçeli müstakil+villa (bahçe/drenaj birleşimi tıkanması, yer altı kök/zemin oturması, büyük banyo özel ölçü duşakabin, çok cihazlı gaz projesi, depo+hidrofor/kuyu-bahçe pompası); Ziya Gökalp/Metrokent/Onurkent dükkân-lokanta (grease trap, ticari gaz); 40 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfalar enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **363 toplam kayıt** (357 → 363); tsgo temiz; 3 örnek rota (kombi-montaji, hidrofor-kurulumu, dusakabin-vitrifiye-montaji) SSR 200 + "Bölgeye Özel" + noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (sancaktepe, sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch Z URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch AA (2026-07-14)
- Tier 2 tam kapama: **Sancaktepe** — 4 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 6 kayıt. kanal-goruntuleme zaten vardı; Sancaktepe artık 13/13 serviste tam kapalı.
- Grounding: Sarıgazi/Samandıra hızla büyüyen yeni site dokusu (montaj kaynaklı kolon/ankastre kaçak, üst katlarda basınç düşmesi → frekans kontrollü hidrofor); Abdurrahmangazi/Eyüp Sultan/Veysel Karani müstakil+az katlı (bahçe/drenaj birleşimi tıkanması, sobadan gaza geçiş, eski kireçli ara musluk, depo+hidrofor/bahçe sulama pompası); Sarıgazi merkez dükkân-lokanta (grease trap); 40 dk ulaşım (Anadolu Yakası).
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfalar enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **369 toplam kayıt** (363 → 369); tsgo temiz; 3 örnek rota (kombi-montaji, hidrofor-kurulumu, dogalgaz-tesisati) SSR 200 + "Bölgeye Özel" + noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (sultanbeyli, tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch AA URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch BB (2026-07-14)
- Tier 2 tam kapama: **Sultanbeyli** — 4 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kanal-goruntuleme, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 6 kayıt. kombi-montaji zaten vardı; Sultanbeyli artık 13/13 serviste tam kapalı.
- Grounding: Mehmet Akif/Battalgazi/Fatih yoğun çok katlı konut + geç tamamlanan doğal gaz dönüşümü (sobadan gaza geçiş, ortak kolon/pimaş tıkanma, üst katlarda basınç düşmesi → frekans kontrollü hidrofor, kireçli su/ara musluk); Hamidiye/Turgutreis apartman (depo+hidrofor, banyo yenileme); Abdurrahmangazi işyeri (ticari gaz, grease trap, çok pompalı hidrofor); 45 dk ulaşım (Anadolu iç kesim).
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfalar enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **375 toplam kayıt** (369 → 375); tsgo temiz; 3 örnek rota (dogalgaz-tesisati, hidrofor-kurulumu, dusakabin-vitrifiye-montaji) SSR 200 + "Bölgeye Özel" + noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (tuzla, eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch BB URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch CC (2026-07-14)
- Tier 2 tam kapama: **Tuzla** — 5 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati) + 1 niş servis (dusakabin-vitrifiye-montaji) = 6 kayıt. hidrofor-kurulumu zaten vardı; Tuzla artık 13/13 serviste tam kapalı.
- Grounding: İçmeler/Aydınlı/Şifa sahil siteleri + villalar (tuzlu nem korozyonu → paslanmaz/PE-X, bahçe/drenaj birleşimi, büyük banyo özel ölçü duşakabin, yerden ısıtma villa kombi, çok cihazlı gaz projesi); Mimar Sinan/Postane/Cami konut apartman (ortak kolon/pimaş, kireçli su/ara musluk, banyo yenileme); Tepeören/organize sanayi/tersane (endüstriyel/ticari gaz hattı, yemekhane grease trap, yüksek kapasiteli gider denetimi); 45 dk ulaşım (Anadolu uç ilçe).
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfa enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **381 toplam kayıt** (375 → 381); tsgo temiz; 3 örnek rota (dogalgaz-tesisati, kombi-montaji, dusakabin-vitrifiye-montaji) SSR 200 + "Bölgeye Özel" + noindex yok; niş rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (eyupsultan, zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch CC URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch DD (2026-07-14)
- Tier 2 tam kapama: **Eyüpsultan** — 5 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 7 kayıt. Eyüpsultan artık 13/13 serviste tam kapalı.
- Grounding: Rami/Nişanca/Eyüp merkez tarihi-tescilli eski galvaniz/pik yapı (kireç+yağ daralması, korozyon/çökme, kırma-dökme riski, bacalıdan hermetiğe geçiş, sobadan gaza geçiş, düşük şebeke basıncı → konfor pompası); Göktürk/Kemerburgaz müstakil villa (yerden ısıtma kollektörü, bahçe/drenaj birleşimi + kök + zemin oturması, büyük banyo özel ölçü duşakabin, çok cihazlı gaz projesi, depo+hidrofor + bahçe/kuyu pompası); Alibeyköy/Silahtarağa yoğun apartman (ortak kolon/pimaş tıkanma, üst katlarda basınç düşmesi → frekans kontrollü hidrofor); Topçular sanayi/lokanta (grease trap, ticari/endüstriyel gaz hattı); 40 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfalar enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **388 toplam kayıt** (381 → 388); tsgo temiz; 3 örnek rota (dogalgaz-tesisati, hidrofor-kurulumu, dusakabin-vitrifiye-montaji) SSR 200 + "Bölgeye Özel" + noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (zeytinburnu, kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch DD URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch EE (2026-07-14)
- Tier 2 tam kapama: **Zeytinburnu** — 5 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati) + 1 niş servis (hidrofor-kurulumu) = 6 kayıt. dusakabin-vitrifiye-montaji zaten vardı; Zeytinburnu artık 13/13 serviste tam kapalı.
- Grounding: Telsiz/Seyitnizam/Çırpıcı çok yoğun bitişik nizam eski apartman (galvaniz kolon/pimaş, kireç+yağ daralması, korozyon/çökme, bacalıdan hermetiğe geçiş, üst katlarda basınç düşmesi → frekans kontrollü hidrofor, düşük şebeke basıncı → konfor pompası); Merkezefendi/Veliefendi karma yenilenen daireler (ankastre montaj, ocak/kombi bağlantısı); Kazlıçeşme/eski deri sanayi/Nuripaşa işletme-lokanta (grease trap, ticari/endüstriyel gaz hattı, depo+çok pompalı hidrofor, mesai dışı hat denetimi); 35 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfa enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **394 toplam kayıt** (388 → 394); tsgo temiz; 3 örnek rota (dogalgaz-tesisati, hidrofor-kurulumu, kanal-goruntuleme) SSR 200 + "Bölgeye Özel" + noindex yok; niş rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (kagithane, esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch EE URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch FF (2026-07-14)
- Tier 2 tam kapama: **Kağıthane** — 4 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 6 kayıt. kanal-goruntuleme zaten vardı; Kağıthane artık 13/13 serviste tam kapalı.
- Grounding: Seyrantepe/Çeliktepe hızlı dönüşümle yükselen yeni rezidans-iş merkezi (yüksek hidrofor basıncı → dayanıklı armatür/ankastre montaj + frekans kontrollü hidrofor, asma klozet/özel ölçü duşakabin, ankastre kombi, daire içi gaz tesisatı); Gültepe/Nurtepe dönüşüm bekleyen eski galvaniz yapı + eğimli topografya (çürümüş kolon/pimaş, bacalıdan hermetiğe geçiş, küvetten duşakabine dönüşüm, düşük şebeke basıncı → konfor pompası); Çağlayan/Sanayi/adliye çevresi lokanta-ofis-işyeri (grease trap, ticari gaz hattı, depo+çok pompalı hidrofor); 35 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfalar enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **400 toplam kayıt** (394 → 400); tsgo temiz; 3 örnek rota (dogalgaz-tesisati, hidrofor-kurulumu, dusakabin-vitrifiye-montaji) SSR 200 + "Bölgeye Özel" + noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (esenler, bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch FF URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch GG (2026-07-14)
- Tier 2 tam kapama: **Esenler** — 5 mid servis (mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati) + 2 niş servis (dusakabin-vitrifiye-montaji, hidrofor-kurulumu) = 7 kayıt. Esenler artık 13/13 serviste tam kapalı.
- Grounding: Menderes/Oruçreis/Çiftehavuzlar yoğun çok katlı eski apartman (galvaniz kolon/pimaş, kireç+yağ daralması, korozyon/çökme, bacalıdan hermetiğe geçiş, düşük şebeke basıncı → konfor pompası); Birlik/Fevzi Çakmak kentsel dönüşümle yenilenen yeni binalar (ankastre montaj, asma klozet/cam duşakabin, daire içi gaz tesisatı, üst katta basınç → frekans kontrollü hidrofor); İstanbul Otogarı/Havaalanı mahallesi çevresi lokanta-ofis-işyeri (grease trap, ticari gaz hattı, depo+çok pompalı hidrofor, mesai dışı hat denetimi); 40 dk ulaşım.
- Her kayıt: intro + 3 detaylı localGuide + comparison + priceSignals(4) + priceNote + 3 lokal FAQ + landmarks (neighborhoods ile hizalı). Niş sayfalar enrichment-aware tier motoru sayesinde index'e + sitemap'e girdi.
- Verify: **407 toplam kayıt** (400 → 407); tsgo temiz; 3 örnek rota (dogalgaz-tesisati, hidrofor-kurulumu, dusakabin-vitrifiye-montaji) SSR 200 + "Bölgeye Özel" + noindex yok; niş 2 rota sitemap.xml'de listelendi.
- **Tier 2 kalan gruplar:** mid servisleri eksik büyük ilçeler (bayrampasa, gungoren, beykoz, cekmekoy) + niş servisler (dusakabin-vitrifiye-montaji, hidrofor-kurulumu — kalan ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch GG URL'lerinde "Request indexing"; sitemap.xml resubmit.

## Batch HH — Bayrampaşa (tamamlandı ✅)
- **İlçe:** Bayrampaşa → 13/13 servis tam.
- **Eklenen 7 kayıt:** mutfak-gider-acma, musluk-batarya-degisimi, kombi-montaji, kanal-goruntuleme, dogalgaz-tesisati (mid-tier) + hidrofor-kurulumu, dusakabin-vitrifiye-montaji (niş).
- **Lokal grounding:** Yenidoğan/Muratpaşa/Terazidere/Cevatpaşa eski yoğun apartman dokusu (pimaş+galvaniz); Forum İstanbul çevresi kentsel dönüşüm/ankastre; İsmetpaşa/Kocatepe sanayi (ticari yağ/gaz/hidrofor).
- **Kayıt sayısı:** 407 → 414.
- **Doğrulama:** tsgo temiz; 4 rota /tesisatci/bayrampasa/* SSR 200 + "Bölgeye Özel" + noindex yok; niş rotalar sitemap.xml'de.
- **Sıradaki:** güngören (kalan Tier 2 ilçeler).
- **GSC (kullanıcı):** deploy sonrası Batch HH URL'lerinde "Request indexing"; sitemap.xml resubmit.
