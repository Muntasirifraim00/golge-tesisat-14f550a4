# IL-7 Yamyamlık (Cannibalization) Kuralları — 2026-10-02
Seçim ölçütü: 1) GSC gösterim/sıra (varsa) 2) gelen blog linki 3) içerik derinliği.
Kural: tüm iç linkler + aynı anahtar kelimeli anchor'lar ANA yazıya gider. İkincil yazı ana yazıya üst bölümde 1 link verir, farklı alt-niyete (ör. "basit tamir", "neden") odaklanır; ikincile yalnızca ana yazıdan 1 bağlam linki. Silme/301 YOK (trafik kaybı riski) — yalnızca link sinyaliyle ayrıştırma; 90 gün sonra GSC ile tekrar değerlendirilir.

| Konu | ANA | İkincil(ler) | Gerekçe |
|---|---|---|---|
| kombi ateşleme | kombi-atesleme-yapmiyor-nedenleri-cozumu | kombi-atesleme-yapmiyor | 18 vs 8 gelen link |
| kombi su akıtıyor | kombi-su-akitiyor-nedenleri-cozumu | kombi-su-akitiyor, kombi-neden-su-akitir ("neden" alt niyeti) | 9 vs 2/5 |
| kombi sıcak su | kombi-sicak-su-vermiyor-nedenleri-cozumu | kombi-sicak-su-vermiyor | 11 vs 5 |
| arıza kodları | kombi-ariza-kodlari-rehberi (pillar) | kombi-ariza-kodlari-cozumleri | pillar, 11 vs 4 |
| foseptik | foseptik-cukuru-nedir-yapimi-temizligi | foseptik-cukuru-nedir-nasil-calisir | GSC 740 gösterim, sıra 9.5 |
| yerden ısıtma | yerden-isitma-nedir-nasil-yapilir | yerden-isitma-sistemi-rehberi | 18 vs 3 |
| termosifon ısıtmıyor | termosifon-su-isitmiyor | sofben-termosifon-suyu-isitmiyor-nedenleri-cozumu (şofben alt niyeti) | GSC 811 gösterim, sıra 8.1 |
| kombi montajı | kombi-montaji-nasil-yapilir-baglanti-rehberi | kombi-montaji-nasil-yapilir | GSC 980 gösterim, sıra 14.4, 0 link → boost |
| basınç düşüyor | kombi-basinci-dusuyor | kombi-basinci-neden-duser ("neden") | 17 vs 4 |
| kombi basıncı kaç | kombi-basinci-kac-olmali | kombi-bari-kac-olmali | 14 vs 4 |
| klozet su kaçırıyor | klozet-su-kaciriyor-nasil-tamir-edilir | klozet-su-kaciriyorsa-basit-tamiri ("basit tamir") | GSC 2.841 gösterim, sıra 10.7 |
| petekler ısınmıyor | kombi-calisiyor-petekler-isinmiyor | kombi-calisiyor-ama-petekler-isinmiyor | 20 vs 8 |

Motor kuralı (IL-9): ikincil yazıların `keyword`'ü INLINE_LINK_INDEX'te ana yazıya yönlendirilecek (CANONICAL_TARGET haritası).
