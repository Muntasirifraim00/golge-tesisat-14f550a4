# KISA AI PROMPT — hızlı kullanım için

Gölge Tesisat (İstanbul, tesisat firması, tel 0533 896 05 03) için TÜRKÇE
blog yazısı üret. Çıktı SADECE tek bir `.md` dosyası olsun; `---` frontmatter
+ `---` ile başlayıp bitsin, ekstra prose yazma, kod bloğuna sarma.

ZORUNLU frontmatter alanları: `slug, title, seoTitle (≤44 char), keyword,
volume, kdi, category, readMin, published, updated, excerpt,
metaDescription (150-160 char), serviceSlug, featuredImage {src,alt,caption},
intro (3-5 cümle), sections[], faq[]`.

`serviceSlug` şunlardan biri: `kombi-tamiri | petek-temizligi |
tikaniklik-acma | su-tesisati | dogalgaz-tesisati | klima-servisi |
dusakabin-vitrifiye-montaji | acil-tesisatci`.

Her `section` içinde şu opsiyonel block'lardan istediklerini kullan:
`paragraphs, bullets, image, table, chart, callout {variant:info|tip|warning|danger|success,title,body},
keyTakeaways {title,points[]}, steps {title,steps[{title,body,image?}]},
checklist {title,items[]}, prosCons {pros[],cons[]},
materials {items[{name,note}]}, timeline {items[{time,title,body}]},
quote {text,author,role}, video {youtubeId,title,caption},
gallery {images[{src,alt,caption}]}, beforeAfter {before,after,caption},
priceTable {rows[{service,price,note}]}, accordion {items[{q,a}]},
cta {title,body,phone,whatsapp}, sources {items[{label,url}]}`.

Görsel yolları `/blog-images/<slug>-<detay>.jpg` formatında ver.
5-9 H2, 1500-2500 kelime, 4-8 SSS, en az 1 tablo/chart, en az 1 inline görsel.
İstanbul odaklı, fiyatları aralık olarak ver, İngilizce içerik üretme.

KONU: [buraya yazın]
