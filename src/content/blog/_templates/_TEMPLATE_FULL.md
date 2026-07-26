---
# ============================================================
# FULL TEMPLATE — Gölge Tesisat blog post
# Her block türünün örneğini içerir. Kullanmadığınız block'ları silin.
# Dosyayı kopyalayın → src/content/blog/<slug>.md olarak kaydedin.
# ============================================================

slug: "ornek-tam-rehber"
title: "Örnek Tam Rehber (H1) — Tüm Block Türleri"
seoTitle: "Örnek Tam Rehber"            # ≤44 karakter
keyword: "örnek anahtar kelime"
volume: 320
kdi: 28
category: "Kombi & Kalorifer"           # src/data/services.ts kategorileri
readMin: 10
published: "2026-08-01"                 # ISO tarih (YYYY-MM-DD)
updated: "2026-08-01"
excerpt: >
  Kartlarda ve meta description fallback olarak gösterilen 2-3 cümlelik özet.
  Primary keyword doğal biçimde geçmeli.
metaDescription: "150-160 karakter meta description. Keyword içermeli, CTR odaklı. Telefon: 0533 896 05 03."
serviceSlug: "kombi-tamiri"             # src/data/services.ts'de bir hub slug'ı olmalı

featuredImage:
  src: "/blog-images/ornek-hero.jpg"
  alt: "Keyword içeren, açıklayıcı alt metni"
  caption: "Görselin altında görünen kısa açıklama."

intro: >
  3-5 cümlelik giriş. Konuyu tanıtın, kullanıcının derdini isimlendirin, ne
  öğreneceğini vaat edin. Keyword ilk 1-2 cümlede geçsin.

sections:
  # ---------- 1. BÖLÜM — Metin + bullets + callout ----------
  - heading: "Klasik Bölüm — Paragraf + Madde + Uyarı Kutusu"
    paragraphs:
      - "Birinci paragraf metni. 3-4 cümlede bir kesin, TR okuyucu uzun paragrafta yorulur."
      - "İkinci paragraf metni."
    bullets:
      - "İlk madde"
      - "İkinci madde"
      - "Üçüncü madde"
    callout:
      variant: "warning"                # info | tip | warning | danger | success
      title: "Dikkat"
      body: "Doğalgaz kaçağı şüphesinde önce vanayı kapatın, kıvılcım oluşturacak hiçbir şeye dokunmayın."

  # ---------- 2. BÖLÜM — Özet kutusu + adım adım rehber ----------
  - heading: "Adım Adım Nasıl Yapılır"
    paragraphs:
      - "Bu bölüm HowTo schema'ya otomatik dönüşür."
    keyTakeaways:
      title: "Bu Bölümün Özeti"
      points:
        - "Malzemeleri önceden hazırlayın"
        - "Ana vanayı mutlaka kapatın"
        - "Sızdırmazlığı test etmeden bitirmeyin"
    steps:
      title: "5 Adımda Kurulum"
      steps:
        - title: "Ana suyu kapatın"
          body: "Kombiye giden ana su vanasını saat yönünde çevirerek kapatın."
        - title: "Basıncı boşaltın"
          body: "Sistemin basıncını sıfırlayın ve kalan suyu bir kaba boşaltın."
        - title: "Eski parçayı sökün"
        - title: "Yeni parçayı takın"
          image:
            src: "/blog-images/adim-4-montaj.jpg"
            alt: "Yeni conta montajı"
        - title: "Sızdırmazlığı test edin"

  # ---------- 3. BÖLÜM — Checklist + malzeme listesi ----------
  - heading: "Kontrol Listesi ve Gerekli Malzemeler"
    paragraphs:
      - "İşe başlamadan önce şu kontrolleri yapın."
    checklist:
      title: "Başlamadan Önce"
      items:
        - "Ana vana kapalı mı?"
        - "Yedek conta var mı?"
        - "Kova ve bez hazır mı?"
    materials:
      title: "Gerekli Malzemeler"
      items:
        - { name: "Boru anahtarı", note: "24 mm uygun" }
        - { name: "Teflon bant" }
        - { name: "Yedek O-ring conta" }
        - { name: "Silikon" }

  # ---------- 4. BÖLÜM — Pros/Cons + Karşılaştırma tablosu ----------
  - heading: "Karşılaştırma: Yöntem A vs Yöntem B"
    paragraphs:
      - "İki yaygın yöntemi karşılaştıralım."
    prosCons:
      title: "Kimyasal Açıcı Kullanımı"
      pros:
        - "Hızlı sonuç verir"
        - "Ucuz"
      cons:
        - "Boruları uzun vadede aşındırır"
        - "Cilde temas ederse tehlikeli"
    table:
      caption: "Yöntemlerin karşılaştırması"
      headers: ["Kriter", "Kimyasal", "Mekanik (Spiral)"]
      rows:
        - ["Süre", "10 dk", "20 dk"]
        - ["Maliyet", "50 ₺", "250 ₺"]
        - ["Boruya zarar", "Yüksek", "Düşük"]

  # ---------- 5. BÖLÜM — Fiyat tablosu + timeline ----------
  - heading: "Fiyatlar ve Süreç"
    paragraphs:
      - "İstanbul'da güncel fiyat aralıkları ve tipik iş akışı."
    priceTable:
      caption: "İstanbul geneli tahmini fiyatlar, keşif dahil değildir."
      rows:
        - { service: "Petek temizliği (daire)", price: "₺1.500 – ₺3.500", note: "Radyatör sayısına göre" }
        - { service: "Kombi bakımı", price: "₺900 – ₺1.800" }
        - { service: "Sıcaklık valfi değişimi", price: "₺450 – ₺900" }
    timeline:
      title: "Tipik Servis Süreci"
      items:
        - { time: "0. dk", title: "Çağrı alınır", body: "Adres ve arıza bilgisi." }
        - { time: "20. dk", title: "Ekip kapıda", body: "Ortalama İstanbul yanıt süremiz." }
        - { time: "45. dk", title: "Keşif tamam", body: "Fiyat onayı alınır." }
        - { time: "2. saat", title: "İş tesliminden sonra", body: "6 ay garanti başlar." }

  # ---------- 6. BÖLÜM — Görsel + galeri + öncesi/sonrası ----------
  - heading: "Görsel Örnekler"
    paragraphs:
      - "Farklı senaryolar için görseller."
    image:
      src: "/blog-images/tek-diagram.jpg"
      alt: "Diagram alt metni"
      caption: "Tek diagram."
    gallery:
      images:
        - { src: "/blog-images/g1.jpg", alt: "Örnek 1" }
        - { src: "/blog-images/g2.jpg", alt: "Örnek 2" }
        - { src: "/blog-images/g3.jpg", alt: "Örnek 3" }
    beforeAfter:
      before: { src: "/blog-images/kirli-petek.jpg", alt: "Kirli petek" }
      after:  { src: "/blog-images/temiz-petek.jpg", alt: "Temiz petek" }
      caption: "Petek temizliği öncesi ve sonrası."

  # ---------- 7. BÖLÜM — Video + alıntı + grafik ----------
  - heading: "Uzman Yorumu ve Video"
    paragraphs:
      - "Bir video ve saha alıntısı."
    video:
      youtubeId: "dQw4w9WgXcQ"          # YouTube video ID
      title: "Kombi bakımı adım adım"
      caption: "3 dakikalık özet."
    quote:
      text: "Peteklerin altı ısıtmazsa çoğunlukla hava değil, çamurdur. Basınç düşerken bile ısınmıyorsa temizlik zorunlu."
      author: "Mehmet Usta"
      role: "15 yıllık kombi teknisyeni"
    chart:
      title: "Arıza Nedenleri Dağılımı"
      unit: "%"
      bars:
        - { label: "Çamur birikimi", value: 45 }
        - { label: "Hava boşluğu", value: 30 }
        - { label: "Diğer", value: 25 }

  # ---------- 8. BÖLÜM — Accordion + Sources + CTA + rawHtml ----------
  - heading: "Ekstra Detaylar ve Kaynaklar"
    paragraphs:
      - "Katlanan bölümler ve dış referanslar."
    accordion:
      items:
        - { q: "Petek temizliği kaç yılda bir yapılmalı?", a: "Ortalama 3-5 yılda bir yeterlidir." }
        - { q: "Kombi bakımı yasal zorunlu mu?", a: "Doğalgaz kombileri için yıllık bakım tavsiye edilir." }
    sources:
      title: "Referanslar"
      items:
        - { label: "EPDK doğalgaz güvenlik kılavuzu", url: "https://www.epdk.gov.tr" }
        - { label: "TSE kombi standartları", url: "https://www.tse.org.tr" }
    cta:
      title: "Yardım mı gerekli?"
      body: "İstanbul'un her yerinde 30 dakikada kapınızdayız. Keşif ücretsiz."
      phone: true
      whatsapp: true
    rawHtml:
      html: "<p><strong>Not:</strong> Yalnızca çok özel durumlarda kullanın.</p>"

faq:
  - q: "İlk SSS sorusu?"
    a: "Doğrudan 1-3 cümlelik cevap."
  - q: "İkinci SSS sorusu?"
    a: "Kısa ve net cevap."

manualRelated:
  - "kombi-atesleme-yapmiyor"

linkAliases:
  - "ek anchor phrase 1"
  - "ek anchor phrase 2"
---

Frontmatter dışındaki metin loader tarafından yok sayılır — buraya taslak/notlar yazabilirsiniz.
