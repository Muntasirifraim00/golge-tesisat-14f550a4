---
# ------------------------------------------------------------------
# Example blog post — copy this file, rename to <your-slug>.md,
# fill in every field. Delete this comment block before publishing.
# NOTE: this file has NO `slug` field so the loader ignores it.
# When you copy it for a real post, add `slug: your-post-slug` as
# the FIRST field.
# ------------------------------------------------------------------
title: "Örnek Rehber Başlığı (H1)"
seoTitle: "Örnek Rehber Başlığı"       # ≤44 chars — appears in <title>
keyword: "örnek anahtar kelime"
volume: 320
kdi: 28
category: "Kombi & Kalorifer"
readMin: 8
published: "2026-08-01"
updated: "2026-08-01"
excerpt: >
  Kısa, ilgi çekici bir özet paragrafı — blog listeleme kartında ve meta description
  fallback olarak kullanılır. 2-3 cümle, primary keyword doğal biçimde geçmeli.
metaDescription: "Meta description — 150-160 karakter, keyword içermeli, CTR odaklı. Telefon: 0533 896 05 03."
serviceSlug: "kombi-tamiri"            # must match a hub in src/data/services.ts
featuredImage:
  src: "/blog-images/ornek-featured.jpg"
  alt: "Görsel için açıklayıcı, keyword içeren alt metni"
  caption: "Görsel altında görünen kısa açıklama."
intro: >
  Giriş paragrafı — konuyu tanıt, kullanıcının derdini isimlendir, ne öğreneceğini
  vaat et. 3-5 cümle. Keyword doğal biçimde ilk 1-2 cümlede geçsin.
sections:
  - heading: "İlk Bölüm Başlığı (H2)"
    paragraphs:
      - "Birinci paragraf metni."
      - "İkinci paragraf metni. Uzun paragraflar TR okuyucu için yorucudur — 3-4 cümlede bir kesin."
    bullets:
      - "Madde 1"
      - "Madde 2"
      - "Madde 3"
  - heading: "İkinci Bölüm — Karşılaştırma Tablolu"
    paragraphs:
      - "Bu bölümde bir karşılaştırma tablosu var."
    table:
      caption: "Tablo başlığı"
      headers: ["Sütun A", "Sütun B", "Sütun C"]
      rows:
        - ["a1", "b1", "c1"]
        - ["a2", "b2", "c2"]
  - heading: "Üçüncü Bölüm — Grafikli"
    paragraphs:
      - "Bu bölümde basit bir bar chart var."
    chart:
      title: "Örnek Dağılım"
      unit: "%"
      bars:
        - { label: "Sebep 1", value: 45 }
        - { label: "Sebep 2", value: 30 }
        - { label: "Diğer",   value: 25 }
  - heading: "Dördüncü Bölüm — Inline Görselli"
    paragraphs:
      - "İçerikte gösterilecek bir diagram."
    image:
      src: "/blog-images/ornek-diagram.jpg"
      alt: "Diagram için açıklayıcı alt metin"
      caption: "Diagram altındaki açıklama."
faq:
  - q: "İlk SSS sorusu?"
    a: "İlk SSS cevabı — 1-3 cümle, doğrudan cevap."
  - q: "İkinci SSS sorusu?"
    a: "İkinci SSS cevabı."
manualRelated:
  - "kombi-atesleme-yapmiyor"
linkAliases:
  - "ek anchor phrase 1"
  - "ek anchor phrase 2"
---

Bu satırın altındaki metin YAML'ın dışında; loader tarafından yok sayılır.
Buraya yazarın kendi notları, taslak, referanslar konabilir — public site'da görünmez.
