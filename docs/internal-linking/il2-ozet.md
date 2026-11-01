# IL-2 Orphan / Zayıf Sayfalar + Kırık Linkler — 2026-10-02
## Kırık link (DÜZELTİLDİ)
- 18 yazıda /blog/undefined vardı. Neden: 16 MD dosyası inlineLinks'i `href:` ile yazmış, render `slug:` bekliyordu.
- Çözüm: blog.$slug.tsx her iki formatı da kabul ediyor. 18 sayfa tekrar tarandı: 0 undefined, 142 link hepsi 200.
## Gerçek orphan yok
- "0 gelen" görünen 6 yazı (kombi-bacasi, bulasik-makinesi-nasil-baglanir, radyator-nedir, kanal-goruntuleme-nedir, taharet-muslugu, kombi-montaji-nasil-yapilir) aslında tüm sayfalardaki ortak bloktan link alıyor; yazı içinden link almıyor → IL-16'da yazı içi link eklenecek.
## Zayıf (yazı içinden ≤2 gelen) — öncelikli hedefler
klozet-ic-takimi-nasil-degistirilir, kombi-kac-kw-olmali, kombi-su-akitiyor, kombi-su-almiyor-nedenleri-cozumu, petekler-nasil-acilir-kapatilir, soguk-su-muslugundan-sicak-su-geliyor, su-deposu-temizligi-nasil-yapilir, sular-kesikken-kombi-calisir-mi, termosifon-montaji-nasil-yapilir
- ≤5 gelen: 85 yazı (liste: il1-link-inventory.csv, in_blog sütunu)
