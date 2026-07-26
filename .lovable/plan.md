
# Blog Post Yazım Sistemini Genişletme Planı

## 1. Amaç

Şu an `.md` blog post'larında sadece **7 tür block** var: `intro`, `paragraphs`, `bullets`, `image`, `table`, `chart`, `faq`. Kullanıcı, kısıtlama olmadan **her tür zengin içerik** ekleyebilmeli — böylece dışarıdan (ChatGPT/Claude/Gemini) yazdırılan blog post'lar sınırsız zenginlikte olabilir.

## 2. Yeni Eklenecek Block Types (15+)

Tesisat/servis sektörüne özel olarak seçildi:

| # | Block | Kullanım |
|---|---|---|
| 1 | **callout** (info/tip/warning/danger/success) | "Dikkat", "Pro İpucu", "Uyarı" kutuları |
| 2 | **steps** (numaralı adım-adım) | "Nasıl yapılır" HowTo, ayrıca Google HowTo schema'ya bağlanır |
| 3 | **prosCons** | Yanyana artı/eksi listesi (karşılaştırma) |
| 4 | **checklist** | Interaktif görünümlü işaretlenebilir liste |
| 5 | **video** (YouTube embed) | Lazy-loaded YouTube iframe |
| 6 | **quote** | Alıntı/müşteri sesi |
| 7 | **gallery** (image grid) | 2-6 resim yanyana |
| 8 | **beforeAfter** | Öncesi/sonrası split resim |
| 9 | **priceTable** | Servis fiyat aralıkları (özel stil + Schema PriceRange) |
| 10 | **materialsList** | "Gerekli malzemeler" ikonlu kart listesi |
| 11 | **timeline** | Aşamalı zaman çizelgesi (ör. "3 günlük tamir süreci") |
| 12 | **accordion** | Katlanan bölümler (SSS dışında da) |
| 13 | **keyTakeaways** | Yazının en üstünde "Özet" kutusu |
| 14 | **cta** | Buton + telefon/WhatsApp çağrı kartı |
| 15 | **sources** | Dış referans/kaynak linkleri |
| 16 | **comparisonTable** | Ürün/marka/yöntem yanyana karşılaştırma (mevcut table'dan daha zengin) |
| 17 | **codeBlock** / **rawHtml** | Nadir teknik ihtiyaçlar için |

Hepsi **opsiyonel** — bir section istediği kadarını kullanır, hiçbirini kullanmayabilir.

## 3. Yapılacak İşler

### A) Type ve Renderer Genişletme
- `src/data/blog.ts` içindeki `BlogSection` tipine yeni opsiyonel alanlar eklenir (`callout?`, `steps?`, `prosCons?`, …).
- `src/routes/blog.$slug.tsx` içindeki section render'ına her yeni block için küçük component eklenir. Mevcut post'lar hiç değişmez (hepsi optional).
- Yeni block'lar için Tailwind ile mevcut design token'ları (brand-red, brand-green, muted vb.) kullanılır — hardcoded renk yok.

### B) Instruction Page: `/blog-yazma-rehberi`
- Yeni TanStack route: `src/routes/blog-yazma-rehberi.tsx`.
- Kullanıcı-dostu Türkçe sayfa: her block türünün ne olduğu, hangi durumda kullanılacağı, örnek YAML snippet'i (kopyala butonlu), rendered preview.
- Sayfanın altında **"Bu sayfayı AI'ya ver"** kutusu — tek tıkla tüm structure'ı clipboard'a kopyalar.

### C) Template Dosyaları (`src/content/blog/_templates/`)
Kullanıcı bunları kopyalayıp içerik doldurur veya AI'ya verir:

1. **`_TEMPLATE_FULL.md`** — kitchen-sink; her block türünün örneği (referans).
2. **`_TEMPLATE_MINIMAL.md`** — sadece zorunlu alanlar (hızlı post için).
3. **`_AI_PROMPT.md`** — herhangi bir AI'ya yapıştırılacak sistem prompt'u: "Sen bir SEO editörüsün, aşağıdaki YAML frontmatter structure'ında Türkçe blog post yaz…" + tüm schema tanımı + kurallar (uzunluk limitleri, keyword yerleşimi, İstanbul odağı, telefon numarası vb.) + iyi/kötü örnekler.
4. **`_AI_PROMPT_QUICK.md`** — kısa versiyon; hızlı istek için.

### D) Loader Güncellemesi
- `src/lib/blog-md.ts` — yeni field'lar zaten optional olarak type üzerinden geçtiği için değişiklik gerekmiyor; sadece `_templates/` klasörü glob'dan hariç tutulur (sonlarında `_` prefix yok, yeni prefix kontrolü eklenir).

## 4. Teslim Sonrası Kullanıcı Akışı

```text
1. /blog-yazma-rehberi sayfasını aç
2. "AI Prompt'unu Kopyala" butonuna tıkla
3. ChatGPT/Claude'a yapıştır + konu ver
4. AI, .md dosyasını üretir
5. src/content/blog/ altına yeni-post.md olarak koy
6. Site otomatik build → yayında
```

## 5. Teknik Detaylar

- **SEO uyumu**: `steps` block'u otomatik `HowTo` JSON-LD şemasına dönüşür (mevcut `howToFromPost` genişletilir). `faq` zaten `FAQPage` şemasında.
- **Backward compatibility**: Tüm mevcut 127 TS post + 1 aktif MD post etkilenmez, çünkü yeni alanlar opsiyonel.
- **Performance**: YouTube iframe'ler `loading="lazy"` + facade pattern (thumbnail + play button, tıklayınca iframe yüklenir).
- **Görsel**: `beforeAfter` ve `gallery` için `public/blog-images/` klasörü kullanılır — mevcut sistem korunur.
- **Bundle etkisi**: Yeni block'lar pure JSX, ekstra kütüphane yok (~4-6KB).

## 6. Onay Sonrası Sıra

1. Type + renderer (blog.ts + blog.$slug.tsx) — tek turda.
2. `_templates/` klasörü ve 4 dosya.
3. `/blog-yazma-rehberi` sayfası.
4. Build doğrulama + preview kontrolü.

Onaylarsanız uygulamaya başlıyorum.
