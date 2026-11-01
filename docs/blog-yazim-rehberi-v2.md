# Gölge Tesisat — Blog Post Yazım Rehberi v2 (AI için)

Güncelleme: 2 Ekim 2026

## 0. Nasıl kullanılır (AI ajanı için)

Bu rehberi baştan sona oku, sonra 3 aşamada çalış. Her aşamanın sonunda dur ve onay bekle; tüm postu tek seferde yazma.

**Sabitler:** Dil Türkçe (tr_TR). Bölge İstanbul + ilçe/mahalle. Marka Gölge Tesisat. Telefon 0533 896 05 03 (7/24). Site: golgetesisat.com.

**Çıktı:** 1 adet `{slug}.md` (YAML frontmatter + markdown gövde), 4-5 görsel için Image Brief, Self-Check raporu.

### Çalışma aşamaları

1. **Aşama A — Araştırma + Plan.** Brief'i (Bölüm 3) oku. Cannibalization kontrolü yap (Bölüm 2). Primary/secondary keyword, PAA soruları, 2 benzersiz açı ve H2/H3 taslak listesini ver. **Dur, onay bekle.**
2. **Aşama B — Yazım.** Onaylanan plana göre frontmatter + gövdeyi yaz (Bölüm 6-11). Image Brief'leri ekle (Bölüm 12).
3. **Aşama C — Kontrol.** Self-Check tablosunu doldur (Bölüm 13). Bir gate başarısızsa düzelt, sonra teslim et.

### Kural öncelik sırası

Kurallar çakışırsa üstteki kazanır:

1. Güvenlik (Bölüm 8) — okuyucuya tehlikeli iş yaptırma.
2. Doğruluk — Fact Sheet'te veya kaynakta olmayan sayı, fiyat, istatistik, sertifika YAZMA.
3. Okuyucu faydası ve doğal dil.
4. SEO sayıları (kelime sayısı, yoğunluk, link adedi).

### Bilgi eksikse

- Brief'te veya Fact Sheet'te olmayan bir bilgi gerekiyorsa uydurma. `[EKSİK: ...]` diye işaretle ve Aşama A sonunda kullanıcıya sor.
- Semrush, SERP veya GSC erişimin yoksa bunu açıkça söyle; tahmini değeri gerçek veri gibi sunma.

## 1. Marka Bilgi Kartı (Fact Sheet)

Postlarda kullanılabilecek tüm gerçek veriler yalnızca bu tablodan gelir. `DOLDURUN` yazan alanları site sahibi doldurur; AI boş alanı tahminle doldurmaz.

| Alan | Değer | Son güncelleme |
| --- | --- | --- |
| Firma adı | Gölge Tesisat | — |
| Telefon / WhatsApp | 0533 896 05 03 (7/24) | — |
| Hizmet bölgeleri (ilçeler) | DOLDURUN | DOLDURUN |
| Kuruluş yılı / deneyim (yıl) | 10 yıldan fazla | Ekim 2026 |
| Ekip büyüklüğü, usta sayısı | DOLDURUN | DOLDURUN |
| Sertifikalar (ad + kurum + no) | DOLDURUN (örn. İGDAŞ yetkili firma belgesi, MEB ustalık belgesi) | DOLDURUN |
| Garanti süresi ve kapsamı | DOLDURUN | DOLDURUN |
| Ortalama varış süresi | DOLDURUN | DOLDURUN |
| Kullanılan cihazlar (termal kamera, akışkan dinleme vb.) | DOLDURUN | DOLDURUN |
| Ödeme yöntemleri | DOLDURUN | DOLDURUN |
| Google yorum puanı / sayısı | DOLDURUN | DOLDURUN |
| Yazar bio ("Gölge Tesisat Teknik Ekibi") | DOLDURUN: 2-3 cümle, deneyim + uzmanlık | DOLDURUN |

### Fiyat politikası

Postlarda hiçbir şekilde TL fiyat, fiyat aralığı veya fiyat tablosu yazılmaz. Rakip ya da piyasa fiyatı da verilmez.

- Fiyat soran okuyucuya fiyatı etkileyen faktörler rakamsız anlatılır: sorunun yeri, tespit yöntemi, kırım/tadilat gerekip gerekmediği, malzeme, mesai dışı çağrı.
- Bu bölüm her zaman şu fikirle biter: net ücret keşif sonrası belirlenir; bilgi için 0533 896 05 03.
- "... fiyatları", "... ücreti" gibi keyword'ler hedeflenebilir; içerik bunlara faktörler + süreç + CTA ile cevap verir.

### Saha vakaları (E-E-A-T için)

Her cluster için en az 1 gerçek vaka ekleyin. AI, postta "sahadan bir örnek" kutusunda bunları kullanır.

| Cluster | İlçe/mahalle | Sorun | Tespit yöntemi | Çözüm + süre | Foto var mı? |
| --- | --- | --- | --- | --- | --- |
| su-kacagi | DOLDURUN | DOLDURUN | DOLDURUN | DOLDURUN | DOLDURUN |
| kombi | DOLDURUN | DOLDURUN | DOLDURUN | DOLDURUN | DOLDURUN |
| tikaniklik | DOLDURUN | DOLDURUN | DOLDURUN | DOLDURUN | DOLDURUN |

### Veri kuralı

- Bu kartta olmayan fiyat, yüzde, istatistik veya sertifika yazılmaz.
- Dış kaynaktan sayı kullanılırsa kaynağın linki aynı cümlede verilir.
- "15 yıllık saha verisi" gibi ifadeler yalnızca bu kartta ilgili veri varsa kullanılır.
- TL fiyat veya fiyat aralığı hiçbir bölümde, tabloda, FAQ'da veya görselde yazılmaz.

## 2. Topical Map ve mevcut postlar

Her post tek bir cluster'a aittir; `cluster`, `category` ve `serviceSlug` değerleri yalnızca aşağıdaki tablodan alınır. Central entity: Tesisatçı / Plumbing in Turkey (Koray Gübür: entity → cluster → pillar + cluster).

| cluster (kod) | category (frontmatter) | serviceSlug (frontmatter) | Service hub URL |
| --- | --- | --- | --- |
| kombi | Kombi | kombi-servisi | /hizmet/kombi-servisi |
| su-kacagi | Su Kaçağı | su-kacagi-tespiti | /hizmet/su-kacagi-tespiti |
| petek | Petek | petek-temizligi | /hizmet/petek-temizligi |
| dogalgaz | Doğalgaz | dogalgaz-tesisati | /hizmet/dogalgaz-tesisati |
| tikaniklik | Tıkanıklık | tikaniklik-acma | /hizmet/tikaniklik-acma |
| kanal | Kanalizasyon | kanal-goruntuleme | /hizmet/kanal-goruntuleme |
| banyo-vitrifiye | Banyo | dusakabin-vitrifiye-montaji | /hizmet/dusakabin-vitrifiye-montaji |
| musluk-batarya | Musluk & Batarya | musluk-batarya | /hizmet/musluk-batarya |
| hidrofor | Hidrofor | hidrofor | /hizmet/hidrofor |
| klima | Klima | klima-servisi (DOLDURUN: sitedeki slug'ı teyit edin) | /hizmet/klima-servisi |
| acil | Acil | acil-tesisatci | /hizmet/acil-tesisatci |
| tesisatci | Genel | (boş) — conversion linki /tesisatci | /tesisatci |

Klima cluster'ı aktiftir (montaj, bakım, gaz dolumu, arıza). Klima postlarında enerji verimi için Enerji Bakanlığı, F-gaz için Çevre Bakanlığı kaynakları kullanılır.

**Link formatı (tek kural):** Blog postları `/blog/{slug}`, hizmet sayfaları `/hizmet/{serviceSlug}`. `/preview/` kullanılmaz.

### Mevcut postlar listesi

AI cannibalization kontrolünü ve internal linkleri yalnızca bu listeye göre yapar. Listede olmayan bir slug'a link verilmez. Her yeni post yayınlanınca buraya bir satır eklenir.

| slug | Primary keyword | cluster | Tip | Durum | Yayın tarihi |
| --- | --- | --- | --- | --- | --- |
| DOLDURUN | DOLDURUN | DOLDURUN | Pillar / Cluster / How-To / FAQ / İlçe | completed | DOLDURUN |
| DOLDURUN | DOLDURUN | DOLDURUN | DOLDURUN | completed | DOLDURUN |

**Cannibalization kuralı:** Yeni primary keyword, listedeki bir keyword ile aynı veya aynı niyette ise yeni post yazılmaz; bunun yerine mevcut postun güncellenmesi önerilir.

**Entity coverage:** Her postta 15-25 ilgili entity/attribute doğal şekilde geçer (örn. su kaçağı için: termal kamera, akışkan dinleme cihazı, nem ölçer, PPRC boru, basınç testi, İSKİ sayaç, küf). Tanımlar Vikipedi (tr) ile doğrulanır.

## 3. Post Brief şablonu

Her yeni post için kullanıcı AI'a bu brief'i verir. Zorunlu alanlar boşsa AI Aşama A'da sorar; opsiyonel alanlar boşsa kendi araştırmasıyla doldurur ve "tahmini" diye işaretler.

```yaml
# Zorunlu
post_type: Cluster          # Pillar | Cluster | Service Page | How-To | FAQ | İlçe
cluster: su-kacagi          # Bölüm 2 tablosundan
primary_keyword: "su kaçağı tespiti"
search_intent: transactional  # informational | transactional | local

# Semrush'tan (yoksa boş bırak, AI uydurmaz)
volume: 
kdi: 
secondary_keywords: []      # 10-15 adet, volume ile

# Opsiyonel ama kaliteyi artırır
paa_questions: []           # Google "Diğer kullanıcılar şunları da sordu"
competitor_urls: []         # SERP top-5
unique_angle: "Kadıköy'deki gerçek vaka + tespit yöntemleri karşılaştırması"
district: ""                # İlçe postu ise zorunlu
field_case: ""              # Fact Sheet'teki vaka veya yeni bir gerçek vaka
photos_available: []        # Elde olan gerçek foto dosya adları
notes: ""                   # Özel istekler
```

## 4. Keyword Research

Primary keyword hedefi: Semrush database `tr`, KDI 7-25, volume 300-15.000/ay, niyeti SERP ile eşleşen tek keyword.

- 10-15 secondary/LSI keyword seç; bunlar H2/H3 başlıklarına ve FAQ'a dağıtılır. Toplam volume 5.000-30.000/ay idealdir.
- People Also Ask sorularını 3 seviye genişlet; H2'lere ve FAQ bloğuna eşle.
- Rakip gap: top-5 SERP sonucunda olmayan en az 2 açı bul (gerçek vaka, kontrol listesi, hesaplayıcı, gerçek foto, ilçeye özel bilgi).
- Intent kuralı: "fiyat", "ücret", "en yakın", ilçe adı → transactional/local (Service Page veya İlçe postu). Fiyat keyword'lerinde rakam yazılmaz (Bölüm 1, Fiyat politikası). "nedir", "neden", "nasıl" → informational (Cluster, How-To, FAQ).

| KDI | Anlamı |
| --- | --- |
| < 30 | Yeni site için gerçekçi |
| 30-50 | İyi içerik + zaman |
| 50-70 | İddialı, düzenli yayın gerekir |
| 70+ | Büyük site alanı — long-tail'e git |

### Araç erişimi yoksa

- Semrush/SERP erişimi olmayan AI volume ve KDI değeri UYDURMAZ. Frontmatter'da `volume: null`, `kdi: null` bırakır.
- Secondary keyword ve PAA önerilerini "tahmini, Semrush ile doğrulayın" notuyla listeler.
- Web arama aracı varsa top-5 sonucu gerçekten açıp okur; okumadığı sayfa hakkında yorum yapmaz.

## 5. Post tipleri ve kelime sayısı

Kelime sayısı hedefin %80'inin altına düşemez; ama dolgu cümleyle şişirilmez. Eksik kalıyorsa yeni bilgi ekle (vaka, tablo, PAA sorusu).

| Tip | Kelime | H2 sayısı | Zorunlu ekler | Schema |
| --- | --- | --- | --- | --- |
| Pillar | 3500-5000 | 15-20 | TOC, 10+ internal link, infografik, tüm cluster postlarına link | Article + FAQPage |
| Cluster | 1500-2500 | 7-10 | Pillar'a back-link, TOC | Article + FAQPage |
| Service Page | 1200-1800 | 6-8 | Fiyatı etkileyen faktörler (rakamsız), 3 yerde CTA, FAQ | Service + FAQPage |
| How-To | 1800-3000 | 7-10 | Araç/malzeme listesi, uyarı kutusu, numaralı adımlar | Article + HowTo + FAQPage |
| FAQ Post | 1000-1500 | — | 10-15 soru-cevap | FAQPage |
| İlçe/Mahalle | 800-1200 | 5-7 | En az 3 ilçeye özel bilgi, harita/GMB embed | Article + LocalBusiness |

- Yayın temposu hedefi: ayda 16 post (haftada 3 cluster + ayda 4 pillar/service).
- İlçe postları şablon kopyası olamaz (doorway page riski). Her biri en az 3 gerçek yerel bilgi içerir: bina tipi/yaşı, su basıncı sorunları, o ilçeden gerçek vaka, varış süresi. Bu bilgi yoksa İlçe postu yazılmaz.
- Pillar iddia eden post 3500 kelimenin altında kalırsa Cluster olarak işaretlenir.

## 6. Blog Skeleton

Bu sıra Cluster, Pillar ve How-To için varsayılandır; Service, FAQ ve İlçe postlarında konuya uymayan blok atılabilir ama 1, 2, 12 ve 13 her zaman vardır.

1. **Intro (150-250 kelime)** — okuyucunun sorunu + Fact Sheet'ten veya kaynaklı bir veri + bu yazının vaadi. Primary keyword ilk cümlede.
2. **Kısa Cevap / Key Takeaways** — 3-5 madde, her biri tek cümle. Ana soruya 40-60 kelimelik doğrudan cevap ilk madde olur (featured snippet + AI Overviews).
3. **Featured image** — Image Brief 1.
4. **İçindekiler (TOC)** — 7+ H2 varsa zorunlu.
5. **Tanım H2** — "X nedir?", parçalar, nasıl çalışır.
6. **Teşhis H2** — "X neden olur, belirtileri nelerdir" (belirti kartları görseli buraya).
7. **How-to H2** — numaralı adımlar; ev sahibinin güvenle yapabileceği adımlar ile ustanın yapacağı adımlar ayrı gösterilir (Bölüm 8).
8. **Karşılaştırma H2** — tablo (yöntem A vs B, eski vs yeni, malzeme tipleri).
9. **Fiyat H2** — rakam YOK; yalnızca fiyatı etkileyen faktörler + "net ücret keşif sonrası belirlenir" CTA'sı (Bölüm 1).
10. **Sahadan bir örnek** — Fact Sheet'teki gerçek vaka: ilçe, sorun, yöntem, süre. Vaka yoksa bu blok atılır, uydurulmaz.
11. **Sık hatalar + "Tesisatçı ne zaman çağrılır?"** — CTA 2.
12. **SSS (5-7 soru)** — PAA'dan; cevaplar 40-80 kelime, ilk cümle doğrudan cevap.
13. **Sonuç + CTA** — 0533 896 05 03 + 3-5 ilgili yazı (yalnızca Bölüm 2 listesinden).

CTA yerleşimi: intro sonu (yumuşak), sık hatalar bölümü (güçlü), sonuç (güçlü). Her CTA farklı cümleyle yazılır.

## 7. Dil, ton ve yasak ifadeler

Yazı, evinde sorun yaşayan birine deneyimli bir ustanın sakin ve net anlatımı gibi okunmalı.

- Hitap: **"siz"**. Okuyucuya doğrudan konuş ("Sayaç vanasını kapatın").
- Cümle ortalama 12-20 kelime; paragraf en fazla 3-4 satır.
- Her paragraf yeni bir bilgi verir; aynı fikri farklı kelimelerle tekrarlama.
- Teknik terimi ilk geçtiği yerde 1 cümleyle açıkla (örn. "akışkan dinleme cihazı, borudaki su sesini yükselterek kaçağın yerini bulur").
- Belirsiz sıfat yerine sayı ve somut detay kullan ("hızlı" değil "ortalama 45 dakikada" — yalnızca Fact Sheet'te varsa).
- Primary keyword doğal akışta geçer; zorla tekrar yok.
- Türkçe karakterler (ç ş ğ ı ö ü İ) her yerde doğru olmalı.

### Yasak ifadeler

Bu kalıplar metinde geçmez: "Bu yazıda", "Sonuç olarak", "Günümüzde", "Peki ya...?", "Hayati önem taşır", "Unutmamak gerekir ki", "Merak etmeyin", "Kapsamlı rehberimizde", "Birçok kişi", "Çok önemlidir", "Sürecin her aşamasında", "Çözüm ortaklarınız", "Alanında uzman ekibimiz" (kanıt olmadan).

Ayrıca yasak: TL fiyat veya fiyat aralığı, başka şehir veya firma adı, uydurma telefon, rakip firmaya link, emoji.

### Örnek

| Kötü (AI kokan) | İyi |
| --- | --- |
| Günümüzde su kaçağı birçok kişinin karşılaştığı ve hayati önem taşıyan bir sorundur. Merak etmeyin, bu yazıda her şeyi anlatacağız. | Su faturanız bir anda yükseldiyse ve tüm musluklar kapalıyken sayaç dönüyorsa, tesisatta kaçak olma ihtimali yüksektir. Bunu 2 dakikada kendiniz kontrol edebilirsiniz. |

## 8. Güvenlik kuralları (YMYL)

Tesisat konuları can ve mal güvenliğini etkiler; güvenlik kuralı SEO kuralından önce gelir.

- **Doğalgaz:** Kaçak, tesisat değişikliği, kombi iç aksamı için adım adım "kendin yap" anlatılmaz. Yalnızca acil ilk adımlar: vanayı kapat, elektrik anahtarına dokunma, pencereleri aç, binayı terk et, dışarıdan 187'yi ara. Doğalgaz tesisatı işlerinin yetkili firma tarafından yapılması gerektiği belirtilir.
- **Karbonmonoksit (CO):** Baş ağrısı, baş dönmesi, uyku hali belirtilerinde ortamı terk edip 112'yi arama tavsiyesi verilir.
- **Elektrik + su:** Islak alanda elektrikli cihaz/priz müdahalesi anlatılmaz; önce sigortayı kapat uyarısı verilir.
- **Kimyasal açıcılar:** Farklı kimyasalların karıştırılmaması uyarısı her zaman yer alır; tarif verilmez.
- **How-To postları:** Her adımın yanında kimin yapacağı belirtilir: "Siz yapabilirsiniz" veya "Usta gerekir". Tehlikeli adımlar kırmızı uyarı kutusunda (`> **Uyarı:**` blockquote).
- **Sağlık:** Küf, CO gibi konularda teşhis yapılmaz; Sağlık Bakanlığı kaynağına ve doktora yönlendirilir.
- **Garanti/hukuk:** Kiracı-ev sahibi sorumluluğu, sigorta gibi konularda kesin hüküm verilmez; "sözleşmenize ve sigorta poliçenize bakın" denir.

## 9. On-Page SEO Checklist

| Öğe | Kural |
| --- | --- |
| title | Primary keyword başta, 50-65 karakter, modifier (Rehber, 2026, Nedir, Nasıl) |
| seoTitle | En fazla 60 karakter (marka adı dahil değil) |
| metaDescription | 150-160 karakter: keyword + fayda + 0533 896 05 03 |
| slug | 3-5 kelime, sadece keyword, stop-word yok, Türkçe karakter yok (ç→c, ş→s, ğ→g, ı→i, ö→o, ü→u) |
| H1 | Sayfa bileşeni title'dan basar; gövdede H1 (`#`) KULLANILMAZ |
| Primary keyword | Title, ilk 100 kelime, en az 2 H2, meta description, alt metinlerden birinde. Yoğunluk yaklaşık %1, en fazla %1,5 |
| Secondary keyword | Her biri en az 1 kez, tercihen H2/H3 veya FAQ sorusunda |
| Internal link | En az 5: 1 service hub (serviceSlug) + 1 pillar + 3 cluster. Yalnızca Bölüm 2 listesindeki slug'lar |
| Anchor text | Açıklayıcı ve çeşitli; "buraya tıklayın" yok; aynı anchor 2 kez yok |
| External link | 2-3 otorite link (Bölüm 11), ilgili cümlenin içinde |
| Görsel alt | Her görselde açıklayıcı alt; en az birinde primary keyword |
| Tarih | Her güncellemede `updated` değişir |
| Yazar | "Gölge Tesisat Teknik Ekibi" + Fact Sheet bio + sertifika |

## 10. Frontmatter ve schema

Hedef proje (Turkey-Plumbing) içeriği frontmatter'dan okur; bu yüzden **frontmatter tek kaynaktır**. Tüm metin `intro`, `keyTakeaways`, `sections` ve `faq` içinde yazılır. Markdown gövde boş bırakılır; aynı içerik iki yere yazılmaz.

Dosya yolu: `src/content/blog/{slug}.md` (eski rehberdeki `src/content/posts/` artık kullanılmaz — projede farklıysa DOLDURUN).

```yaml
---
slug: "su-kacagi-tespiti"
title: "Su Kaçağı Tespiti 2026: Yöntemler ve İstanbul Rehberi"
seoTitle: "Su Kaçağı Tespiti 2026 | İstanbul Rehberi"
keyword: "su kaçağı tespiti"
secondaryKeywords: ["...", "..."]
volume: null            # Semrush yoksa null
kdi: null
postType: "Cluster"     # Pillar | Cluster | Service Page | How-To | FAQ | İlçe
cluster: "su-kacagi"
category: "Su Kaçağı"  # Bölüm 2 tablosundan
serviceSlug: "su-kacagi-tespiti"
district: ""            # İlçe postu ise
readMin: 9              # kelime / 200, yukarı yuvarla
published: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
author:
  name: "Gölge Tesisat Teknik Ekibi"
  bio: "Fact Sheet'ten"
  credentials: ["Fact Sheet'ten"]
excerpt: >
  1-2 cümle özet.
metaDescription: "150-160 karakter, keyword + fayda + 0533 896 05 03"
featuredImage:
  src: "/blog-images/{slug}-hero.jpg"
  alt: "keyword içeren alt"
  caption: "Gölge Tesisat İstanbul — ..."
intro: >
  150-250 kelime, ilk cümlede primary keyword.
keyTakeaways:
  - "Ana soruya 40-60 kelimelik doğrudan cevap."
  - "..."
sections:
  - heading: "H2 başlığı"
    id: "h2-anchor"                       # TOC için
    paragraphs: ["...", "..."]
    subsections:                          # opsiyonel H3
      - heading: "H3"
        paragraphs: ["..."]
    bullets: ["..."]                      # opsiyonel
    steps: [{ name: "...", text: "...", who: "Siz | Usta" }]  # How-To
    table: { headers: [...], rows: [[...]] }
    warning: "..."                        # opsiyonel uyarı kutusu
    image: { src, alt, caption }
howTo:                                    # yalnızca How-To postları
  totalTime: "PT30M"
  tools: ["..."]
  supplies: ["..."]
faq:
  - q: "Soru?"
    a: "Cevap."
manualRelated: ["slug-1", "slug-2", "slug-3"]   # Bölüm 2 listesinden
---
```

### Schema

Site schema'yı frontmatter'dan otomatik üretiyorsa AI ayrıca JSON-LD yazmaz (DOLDURUN: otomatik mi?). Üretmiyorsa şu tipler gerekir:

- `Article` (headline, datePublished, dateModified, author → `Person`/`Organization`, image, publisher)
- `BreadcrumbList` (Ana Sayfa › Blog › Kategori › Post)
- `FAQPage` (faq alanından birebir)
- `HowTo` (yalnızca How-To postlarında; steps + tools + supplies)
- `LocalBusiness` / `Plumber` (Service ve İlçe postlarında; ad, telefon, hizmet bölgesi)

Schema içindeki her bilgi sayfadaki görünür metinle aynı olmalı; sayfada olmayan FAQ veya yorum puanı schema'ya eklenmez.

## 11. Authority link kuralları

Her postta 2-3 dış otorite linki, ilgili cümlenin içinde verilir; sonda liste olarak yığılmaz.

| Konu | Kaynak | Alan adı |
| --- | --- | --- |
| Doğalgaz / gaz kaçağı | İGDAŞ, 187 Doğalgaz Acil, AFAD, Enerji Bakanlığı | igdas.istanbul, afad.gov.tr, enerji.gov.tr |
| Su / kanal / sayaç | İSKİ | iski.istanbul |
| Ürün / standart | TSE (TS EN standartları) | tse.org.tr |
| Klima / enerji verimi | Enerji Bakanlığı, Çevre Bakanlığı (F-gaz) | enerji.gov.tr, csb.gov.tr |
| Sağlık (CO, küf) | Sağlık Bakanlığı | saglik.gov.tr |
| Tanım / entity | Vikipedi (tr) | tr.wikipedia.org |

- Link verilen sayfa gerçekten açılıp kontrol edilmiş olmalı; ana sayfa yerine konuyla ilgili alt sayfa tercih edilir.
- Web erişimi olmayan AI tam URL uydurmaz; alan adını ve önerilen sayfa konusunu `[LİNK DOĞRULA: iski.istanbul — su kesintisi sayfası]` şeklinde işaretler.
- Rakip tesisat firmalarına, forumlara ve AI üretimi içerik sitelerine link verilmez.

## 12. Image Brief (post başına 4-5 görsel)

Yazı yazan AI genelde görsel üretemez; bu yüzden her görsel için hazır bir **Image Brief** verir. Gerçek saha fotoları (Brief'teki `photos_available`) varsa önce onlar kullanılır; en az 2 orijinal görsel zorunludur.

| # | Görsel | Stil | Boyut | Dosya adı |
| --- | --- | --- | --- | --- |
| 1 | Hero / Featured (OG image) | Foto-gerçekçi, sinematik, gerçek İstanbul dairesi; METİN YOK | 1200×630 | {slug}-hero.jpg |
| 2 | Süreç infografiği | Flat vektör, 5-8 numaralı adım, oklar; tehlikeli adımlar kırmızı | 1200×800 - 1200×1200 | {slug}-surec.jpg |
| 3 | Karşılaştırma | Postta olan tablonun görseli; 3-4 kolon, ömür/risk/süre rozeti | 1200×800 | {slug}-karsilastirma.jpg |
| 4 | Belirti kartları | 5 kart, minimal ikon + 2-3 kelime başlık + numara | 1200×1200 | {slug}-belirtiler.jpg |
| 5 | Veri grafiği | Yatay bar chart, editöryel stil; yalnızca Fact Sheet veya kaynaklı veri | 1200×800 | {slug}-veri.jpg |

### Brief formatı (her görsel için)

```text
Görsel #: 2 — Süreç infografiği
Dosya: {slug}-surec.jpg   Boyut: 1200x1200   Yer: "Nasıl yapılır" H2 altı
Prompt (EN): Flat vector infographic, 6 numbered steps in a vertical flow,
  deep blue (#0B3C77) and white, red (#D62828) for danger step, yellow (#F4B400)
  for caution, grey (#6B7280). Clean sans-serif, generous spacing, no logos.
Görseldeki Türkçe metinler (birebir):
  1. Sayaç vanasını kapatın
  2. ...
Veri (en az 3 sayı): ... (kaynak: Fact Sheet / link)
alt: "...primary keyword..."
caption: "Gölge Tesisat İstanbul — ..."
```

### Kurallar

- Hero dışındaki her görselde en az 3 sayısal veri (%, yıl, dakika, °C — TL fiyat yok); sayılar yalnızca Fact Sheet veya kaynaklı olur. Dekoratif görsel yasak.
- 5 saniye kuralı: bakan kişi ana mesajı 5 saniyede anlamalı.
- Türkçe metin içeren görseller metin render'ı iyi olan modelle üretilir; diakritik (ç ş ğ ı ö ü) hatalıysa yeniden üretilir.
- Palet: deep blue + beyaz + kırmızı (tehlike/CTA) + sarı (dikkat) + gri. En fazla 5 renk.
- JPG/WebP, 150-200 KB altı. Başka firmanın logosu, marka adı veya gerçek kişi yüzü yok.
- Yol: kaynak projede `src/assets/blog/`, hedef projede `public/blog-images/`; ad frontmatter `src` ile birebir aynı.

## 13. Quality Gates ve Self-Check raporu

Aşama C'de AI aşağıdaki tabloyu postun altına doldurur. "Gerçek" sütunu sayım veya listeyle doldurulur, tahminle değil. Herhangi bir satır "HAYIR" ise post YAYINLANMAZ; önce düzeltilir.

| # | Gate | Hedef | Gerçek | Geçti mi |
| --- | --- | --- | --- | --- |
| 1 | Kelime sayısı | Post tipinin %80'i ve üstü | (sayı) | |
| 2 | Primary keyword: title, ilk 100 kelime, 2+ H2, meta | Hepsi | (yerler) | |
| 3 | Key Takeaways (bullet) | 3-5 madde | (sayı) | |
| 4 | TOC | 7+ H2 varsa var | | |
| 5 | Internal link (slug listesi) | 5+, hepsi Bölüm 2'de | (liste) | |
| 6 | serviceSlug dolu ve tabloyla eşleşiyor | Evet | | |
| 7 | External authority link (URL listesi) | 2-3 | (liste) | |
| 8 | FAQ | 5-7 (FAQ postunda 10-15) | (sayı) | |
| 9 | Image Brief / orijinal görsel | 4-5 brief, 2+ orijinal | | |
| 10 | TL fiyat veya Fact Sheet dışı / kaynaksız sayı | 0 | (liste) | |
| 11 | Yasak ifade (Bölüm 7) | 0 | | |
| 12 | Güvenlik kuralları (Bölüm 8) | Uyuldu | | |
| 13 | Yazar bio + sertifika | Var | | |
| 14 | Gövdede H1 | 0 | | |
| 15 | seoTitle ≤ 60, meta 150-160 karakter | Evet | (karakter) | |
| 16 | Slug kurallara uygun | Evet | | |
| 17 | `[EKSİK]` / `[LİNK DOĞRULA]` işareti | Liste halinde kullanıcıya bildirildi | (liste) | |

Yayın sonrası (insan kontrol eder): schema geçerli (Rich Results Test), mobil Core Web Vitals ≥ 75.

### Yayın sonrası takip

| Zaman | Kontrol |
| --- | --- |
| Gün 1-7 | GSC index kontrolü, ilk impression + CTR |
| Gün 30 | Pozisyon, CWV, bounce — pozisyon 30'dan kötüyse refresh |
| Gün 90 | Backlink, kalma süresi, dönüşüm (arama/form) |
| Her 6 ay | Refresh: `updated` tarihi + yeni veri + FAQ genişletme |

## 14. Teslim, taşıma ve yayın

Bir post paketi = `{slug}.md` + görseller (veya Image Brief'ler) + Self-Check raporu + Bölüm 2 listesine eklenecek satır.

1. `.md` dosyası → hedef projede `src/content/blog/{slug}.md`.
2. Görseller → `public/blog-images/`; dosya adları frontmatter `src` ile birebir aynı.
3. Durum: planned → building → completed. Bölüm 2 listesine yeni satır eklenir.
4. Son kontrol: frontmatter sayfada metin olarak görünmüyor, tek H1 var, tüm linkler çalışıyor, görseller yükleniyor.
5. Yayın: GSC URL Inspection → indeks isteği, IndexNow, GMB'de paylaşım.
6. Yayınlanan posta 3-5 eski posttan geri link eklenir (yeni post yetim kalmaz).

**Geliştirici notu:** Bu sürümde frontmatter'a yeni alanlar eklendi: `keyTakeaways`, `secondaryKeywords`, `postType`, `cluster`, `district`, `author`, `sections[].id`, `subsections`, `steps`, `warning`, `howTo`. Hedef projenin content schema'sı (örn. Astro `content.config`) bu alanları okuyacak şekilde güncellenmeli; aksi halde bu alanlar sayfada görünmez.

## 15. Hazır master prompt

Herhangi bir AI'a bu rehberi verirken aşağıdaki metni kopyalayın; altına doldurulmuş Brief'i ekleyin.

```text
Sen Gölge Tesisat (İstanbul) için Türkçe blog yazan, tesisat konusunda deneyimli
bir SEO editörüsün. Ekteki "Blog Post Yazım Rehberi v2" tek kural kaynağındır.

Kurallar:
1. Rehberi baştan sona oku. Çakışmada öncelik: Güvenlik > Doğruluk > Okuyucu > SEO.
2. Fact Sheet'te veya kaynaklı linkte olmayan sayı, fiyat, istatistik, sertifika
   yazma. TL fiyat hiç yazma. Bilgi eksikse [EKSİK: ...] yaz.
3. Semrush/SERP erişimin yoksa volume/KDI uydurma; null bırak.
4. Internal linkleri yalnızca "Mevcut postlar listesi"ndeki slug'lara ver.

Çalışma:
- Aşama A: Brief'i analiz et, cannibalization kontrolü yap; primary + secondary
  keyword, PAA, 2 benzersiz açı, H2/H3 planı ve eksik bilgi listesini ver. DUR.
- (Onaydan sonra) Aşama B: frontmatter'ı Bölüm 10 formatında, tek bir .md dosyası
  olarak yaz. Gövde boş. Ardından 4-5 Image Brief.
- Aşama C: Bölüm 13 Self-Check tablosunu gerçek sayımlarla doldur; başarısız
  satır varsa düzelt ve tekrar kontrol et.

BRIEF:
[Bölüm 3 şablonunu buraya yapıştırın]
```

### Rehberi tamamlamak için yapılacaklar

- [ ] Bölüm 1 Fact Sheet: hizmet bölgeleri, sertifikalar, garanti, acil varış süresi, en az 3 saha vakası
- [ ] Bölüm 2: mevcut postlar listesi (slug + keyword + cluster)
- [ ] Bölüm 2: Klima serviceSlug'ını sitedeki URL ile teyit et
- [ ] Bölüm 10: dosya yolu ve schema otomatik mi, geliştiriciyle teyit
- [ ] Bölüm 14: content schema'ya yeni frontmatter alanlarının eklenmesi
- [ ] En iyi performans gösteren 1 postu "altın standart örnek" olarak bu rehbere ek yapmak
