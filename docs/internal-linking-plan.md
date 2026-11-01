# Internal Linking — Nihai Plan (IL-8) — 2026-10-02
Kaynaklar: docs/internal-linking/ (il1 envanter, il2 özet, il3 boost, il4 kümeler, il5 anchor, il6 hizmet, il7 yamyamlık).

## Genel kurallar
1. Yazı başına gövde içi en fazla 9 link (blog + hizmet); en fazla 2 hizmet linki.
2. İlk ~100 kelimede en fazla 1 link (tercihen pillar veya ana hizmet).
3. Aynı hedef URL bir yazıda bir kez; kendine link yok.
4. Anchor: min 2 kelime, cümlenin doğal parçası; aynı hedefe aynı anchor sitede ≤%40; il5 alias listesi.
5. Hizmet niyetli anchor → /hizmet/{slug}; bilgi niyetli → /blog/{slug}.
6. Yamyamlık ikincilleri: anchor'ları ana yazıya yönlenir (il7).
7. Başlık (H2/H3), FAQ sorusu, uyarı kutusu başlığı ve tablo başlığına link yok.

## Küme yapısı (hub & spoke)
- Her yazı → kendi pillar'ına 1 link.
- Pillar → kümedeki tüm yazılara ("İlgili rehberler" bölümü, IL-10).
- Küme içi kardeşler arası 2–4 link.
- Küme → il6'daki hizmet sayfası.

## Öncelik sırası (uygulama)
1. Boost hedefleri (il3, ilk 15): taharet musluğu, su vanası, bulaşık makinesi bağlama, kombi bacası, kombi montajı (rehber), radyatör, musluk batarya tamiri, klozet iç takımı, klozet su kaçırıyor…  Hedef: her biri ≥8 gövde içi gelen link.
2. Pillar'lar: ≥15 gelen link.
3. Az linkli 85 yazı: ≥5 gelen link; 9 kritik yazı (≤2 link) önce.

## Uygulama adımları
- IL-9 motor: linkAliases (il5), CANONICAL_TARGET (il7), pillar önceliği, hizmet tavanı 2, ilk-100-kelime kuralı, hedef başına tek link, anchor çeşitlemesi.
- IL-10 pillar hub bölümleri.
- IL-11 kombi+doğalgaz, IL-12 petek, IL-13 su kaçağı+musluk/vana, IL-14 tıkanıklık, IL-15 banyo+beyaz eşya+su arıtma+diğer.
- IL-16 orphan/boost kurtarma (gerekirse metne doğal cümle ekleme).
- IL-17 hizmet sayfası + anasayfa → blog ters linkleri.
- IL-18 tam tarama: kırık link 0, tavan aşımı 0, önce/sonra karşılaştırma.

## Başarı ölçütleri
- 0 kırık iç link; 0 yazı <3 gövde içi gelen link.
- Boost hedefleri ≥8, pillar'lar ≥15 gelen link.
- 90 gün sonra GSC: boost hedeflerinde ortalama sıra iyileşmesi takibi.
