# Lavabo Sifonu Editorial Güncelleme Planı

## Hedef sayfa
`/blog/lavabo-sifonu-nasil-takilir` — 61 tıklama / 10.649 gösterim (90 gün), listede 4. sırada. Su Vanası ve Taharet Musluğu ile aynı editorial kalıp uygulanacak.

## Yapı (12 bölüm + SSS)
1. **Hero** — başlık, breadcrumb, yazar/güncelleme/okuma süresi, 4 özet kartı (zorluk, süre, alet, ana risk) + hero görseli
2. **Sifon Nedir, Ne İşe Yarar** — koku engelleme mantığı, su kilidi
3. **Kısa Cevap** — 6 maddelik hızlı özet + şema görseli
4. **Başlamadan Önce** — "Kendiniz takabilir misiniz?" tablosu (2/5) + alet kontrol listesi
5. **Hızlı Teşhis** — 4 sorun kartı (kaçak, koku, yavaş gider, gevşek bağlantı) + CTA #1
6. **Sifon Çeşitleri** — şişe sifon / boru sifon / esnek sifon karşılaştırma tablosu
7. **Malzemeler** — conta, somun, boru boyu tablosu
8. **Adım 1: Eski Sifonun Sökülmesi** — 6 adım + uyarı (kova hazır tutun)
9. **Adım 2: Yeni Sifonun Takılması** — conta yönü, elle sıkma kuralı
10. **Adım 3: Kaçak Testi** — kuru bez testi, taşıma kontrolü
11. **Ne Zaman Tesisatçı Gerekir** — 6 kart + CTA #2
12. **Son bölüm + Final CTA** — görsel + HEMEN ARA / WHATSAPP
13. **SSS** — mevcut FAQ korunur, en üstte satış sorusu

## Görseller (12 adet, 16:9, metinsiz, premium)
`src/assets/lavabo-sifonu/`: hero, sifon-mantigi, sema, aletler, sorunlar, sifon-cesitleri, malzemeler, sokum, montaj, kacak-testi, profesyonel, cta-final

## Teknik
- `src/components/LavaboSifonuEditorial.tsx` — SuVanasi/Taharet/Camasir kalıbı (tm-editorial sınıfları, Section/Kicker/Steps/CheckList/Warning/CTA bileşenleri)
- `blog.$slug.tsx` erken dönüş + `__root.tsx` hasOwnToggle
- blog.ts: `updated: 2026-10-03`, seoTitle/excerpt güncelleme
- Compact grid (sol metin / sağ görsel), boş kolon bırakılmaz
- TL/₺ fiyat yok; telefon sadece CTA'da; popup zaten bu sayfada aktif

## Doğrulama
Playwright mobil 390×844 + desktop 1280×1800: 200, 0 hata, taşma yok, build OK.
