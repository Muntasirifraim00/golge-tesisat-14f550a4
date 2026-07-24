# Akıllı WiFi Oda Termostatı: Kurulum, Kombi Uyumu ve Fatura Etkisi (2026)

**Kısa cevap:** Akıllı WiFi oda termostatı, evin sıcaklığını **öğrenerek ve program üzerinden** yönetir; kombiyi sadece gerektiğinde çalıştırır. Ortalama bir dairede **%15–25 doğalgaz tasarrufu** sağlar, kendini **1–2 kış sezonunda** amorti eder. Kurulum sadece **2 kablo** işidir; her modern yoğuşmalı kombiye takılır. En büyük hata, cihazı **kombiyi gördüğü duvara** ya da **güneşe** monte etmektir — o zaman ne ölçüm doğru olur, ne tasarruf.

Bu rehberde WiFi termostatın nasıl çalıştığını, hangi kombilere hangi bağlantı ile takıldığını, doğru montaj yerini, ayar mantığını ve marka bazlı karşılaştırmayı net biçimde anlatıyoruz.

## Akıllı WiFi Termostat Nedir? Klasikten Farkı

Klasik oda termostatı: ayarlanan sıcaklığın altına düşünce kontak kapatır, üstüne çıkınca açar. Programsız, sadece **aç-kapa**.

Programlanabilir termostat: haftalık program yapılabilir ama internete bağlanmaz.

**Akıllı (WiFi) termostat:**

- Telefondan uzaktan kontrol edilir (Bosch EasyControl, Vaillant vSMART, Netatmo, Honeywell Lyric, Tado°, Ecobee, Nest gibi).
- **Coğrafi konum (geofencing)** ile evden çıkıldığında sıcaklığı düşürür.
- **Öğrenme (learning)** — evin ısınma hızını, dış hava etkisini modelleyip **erken başlar**.
- **OpenTherm / eBUS / OT+** ile kombiyi *sadece açıp kapamaz*, **modülasyonu yönetir** (alevi kısıp açar).
- Ses asistanı (Alexa, Google, Siri) entegrasyonu.
- Fatura raporu, kullanım grafiği.

## Klasik vs WiFi Termostat: Rakamsal Fark

| Kriter | Klasik | Programlı | Akıllı WiFi |
|---|---|---|---|
| Uzaktan kontrol | ❌ | ❌ | ✅ |
| Haftalık program | ❌ | ✅ | ✅ |
| Öğrenme algoritması | ❌ | ❌ | ✅ |
| Geofencing | ❌ | ❌ | ✅ |
| Modülasyon kontrolü (OT/eBUS) | ❌ | ❌ | ✅ (uyumlu modelde) |
| Ortalama tasarruf | Referans | %8–12 | **%15–25** |
| Ortalama fiyat | 300–800 TL | 800–1.500 TL | 2.500–7.000 TL |
| Amorti süresi | — | 2–3 sezon | **1–2 sezon** |

## Bağlantı Tipleri: Aç-Kapa vs OpenTherm/eBUS

Termostatın kombiye nasıl konuştuğu, tasarrufun **yarısını** belirler.

### 1) Aç-Kapa (kuru kontak) — 2 kablo

- Termostat "aç" der, kombi tam güçle yanar. "Kapa" der, tamamen söner.
- Modülasyon **kullanılamaz**.
- Her marka kombiye uyumlu (evrensel).
- Tasarruf: %10–15.

### 2) OpenTherm (OT+) — 2 kablo, dijital

- Termostat, kombiye "şu an 45 °C'ye modüle et" der.
- Kombi minimum güçte stabil çalışır → aç-kapa yok, verim yüksek.
- **Bosch, Buderus, Baymak, DemirDöküm, ECA, Ferroli** modellerinin çoğu OT+ destekler.
- Tasarruf: %20–25.

### 3) eBUS (Vaillant) / BUS (Viessmann)

- Marka özel dijital protokol. Sadece marka termostatıyla çalışır (vSMART, ViCare).
- Modülasyon + dış hava kompanzasyonu + boyler yönetimi.
- Tasarruf: %20–30.

> **Karar kuralı:** Yeni yoğuşmalı kombiniz varsa **kesinlikle modülasyonlu (OT+/eBUS) termostat** seçin. Aç-kapa termostat yoğuşmalının bütün avantajını harcar.

## Kablolama: Sadece 2 Kablo

Kombinin arka panelinde/dip klemensinde **"Room Stat" / "TA" / "Oda termostatı"** yazan 2 klemens vardır. Termostat bu iki klemense bağlanır. Fabrika çıkışında bu iki nokta **köprülü**dür (jumper) — köprü sökülüp yerine termostat kablosu takılır.

```
Kombi klemens:  [ TA ] ── kablo ── [ termostat girişi ]
                [ TA ] ── kablo ── [ termostat girişi ]
```

- Kablo tipi: **2×0.75 mm² veya 2×1 mm² zayıf akım kablosu**.
- Uzunluk: 30 metreye kadar sorunsuz. Sıva altı geçirilir.
- 220 V değil — düşük gerilimli sinyal hattıdır, çocuk / dokunma tehlikesi yok.
- WiFi termostat ayrıca **pil** ya da **220 V adaptör** ile beslenir; kombi klemensi sadece sinyal içindir.

## Doğru Montaj Yeri (En Kritik Karar)

Termostat evi doğru "hissetmelidir". Yer seçimi ısınma konforunu ve faturayı doğrudan belirler.

### ✅ Doğru yer

- **Yerden 1.5 m yükseklik**, iç duvar.
- **Salon veya en çok kullanılan oda.** Termostat bu odayı hedef sıcaklığa getirir.
- Hava sirkülasyonu olan yer.
- Kapıdan, pencereden **en az 1.5 m** uzak.

### ❌ Yanlış yer

- **Radyatör / peteğin hemen üstü veya karşısı** → petek ısısını okur, kombiyi erken kapatır.
- **Güneş vuran duvar** → sıcak sanır, kombi çalışmaz.
- **Mutfak / banyo** → nem ve pişirme ısısı yanıltır.
- **Ana giriş kapısı yanı** → her açılışta soğuk hava vurur.
- **TV, kombi, fırın gibi ısı yayan cihazın yanı.**

## Fatura Etkisi: 100 m² Örnek Hesap

```
Klasik termostat:      1450 m³/yıl gaz tüketimi
Programlı termostat:   1300 m³/yıl (-%10)
Akıllı OT+ termostat:  1120 m³/yıl (-%23)

Fark (Klasik → Akıllı): 330 m³/yıl
2026 birim fiyatı ~7 TL/m³ → yıllık ~2310 TL tasarruf
```

3.500 TL'lik bir termostat, bu senaryoda **1.5 sezonda** kendini öder. Yerden ısıtmalı evde tasarruf daha yüksek (%25–30) olduğu için amorti daha da hızlanır.

## Marka Karşılaştırma (2026)

| Termostat | Protokol | Fiyat aralığı | Öne çıkan |
|---|---|---|---|
| Bosch EasyControl CT 200 | OT+ | 5.500–7.000 TL | Bosch/Buderus'a native |
| Vaillant vSMART VRT 380f | eBUS | 6.500–8.000 TL | Vaillant özel |
| Viessmann ViCare | Vitocom | 7.000–9.000 TL | Viessmann özel |
| Tado° V3+ | OT+ | 4.500–6.500 TL | Petek başı vana desteği |
| Netatmo Smart | OT+ | 3.500–5.000 TL | Apple HomeKit |
| Honeywell Lyric T6R | OT+ / aç-kapa | 3.000–4.500 TL | Geofencing güçlü |
| Baymak Helo | OT+ | 2.500–3.500 TL | En uygun yerli |
| Xiaomi Aqara / Sonoff | Aç-kapa | 800–1.500 TL | Sadece aç-kapa, ekonomik |

> Kombi hangi markaysa, aynı marka termostat en yüksek tasarrufu verir (eBUS/BUS protokolü açılır). Farklı marka kullanılacaksa **OT+** desteğini şart koşun.

## Kurulum Adım Adım

1. **Kombiyi kapat**, elektriği prizden çek.
2. Kombinin **oda termostatı klemensini** (TA) bul → köprüyü sök.
3. **2×0.75 mm² kablo** ile termostat konumuna kadar sıva altı çek.
4. Termostatın backplate'ini duvara sabitle (1.5 m yüksekliğe).
5. Kabloyu klemense bağla (kutuplu bağlantı istiyorsa üretici talimatına göre).
6. Termostatın pilini/adaptörünü tak.
7. Kombiyi aç → termostat "kombi bağlı" ışığını yakmalı.
8. Uygulamayı indir → WiFi'ye bağla → hesap oluştur.
9. Modülasyonlu ise kombinin menüsünden "OT+ mode" açık olduğundan emin ol.
10. Salon hedef sıcaklık **20–21 °C**, gece **17–18 °C**, evden dışarı **15 °C** programını gir.

## En Sık Yapılan 5 Hata

1. **Yanlış montaj yeri.** Peteğin üstü, güneşe bakan duvar veya mutfak → yanlış ölçüm → sürekli aşırı ısınma veya soğuk oda.
2. **Aç-kapa termostat + yoğuşmalı kombi.** Modülasyon devre dışı kalır; yoğuşmalı prim harcanmış olur.
3. **Hedef sıcaklığı 25 °C yapmak.** Her +1 °C, faturayı ~%7 artırır. 20–21 °C konforludur.
4. **Kombi klemensindeki köprüyü sökmeden kablo takmak.** Termostat kapalıyken bile kombi sürekli çalışır.
5. **WiFi bağlantısı kombinin ısıtma açık/kapalı durumunu değil, sadece uzaktan kontrolü etkiler.** WiFi kopsa da termostat lokal olarak çalışmaya devam eder — bunu bilmeyenler cihazı gereksiz iade eder.

## Sıkça Sorulan Sorular

### Akıllı WiFi termostat gerçekten fatura düşürür mü?
Evet. Ortalama bir dairede **%15–25 doğalgaz tasarrufu** sağlar. Modülasyon destekleyen (OT+/eBUS) modellerde %25'e kadar çıkar.

### Her kombiye WiFi termostat takılır mı?
Aç-kapa (kuru kontak) modeli neredeyse her kombiye takılır. Modülasyon (OT+/eBUS) için kombinin bu protokolü desteklemesi gerekir; 2018 sonrası yoğuşmalıların çoğu destekler.

### Kurulum ne kadar sürer, kim yapar?
Kablo çekilecekse 1–2 saat, kablo hazırsa 20 dk. Yetkili kombi servisi veya elektrikçi yapabilir. Kendi başınıza da yapılabilir; 220 V yoktur.

### WiFi kopunca kombi ne olur?
Termostat lokal moda geçer, son ayarlarla çalışmaya devam eder. Sadece **telefondan kontrol** ve **öğrenme özellikleri** durur.

### En iyi WiFi termostat markası hangisi?
Kombiniz Bosch/Buderus ise **EasyControl**, Vaillant ise **vSMART**, farklı marka ise **Tado° veya Netatmo** genellikle en dengeli seçimlerdir.

### Hedef sıcaklık kaç olmalı?
Salon **20–21 °C**, yatak odası **18–19 °C**, gece **17 °C**, evde yokken **15 °C**. Her +1 °C fatura yaklaşık %7 artar.

---

**Sonuç:** Akıllı WiFi termostat, kombi yatırımının **en yüksek geri dönüşlü** aksesuarıdır. Yoğuşmalı kombiye **modülasyon destekli (OT+ veya eBUS)** bir termostat takıldığında yıllık fatura **%20'nin üzerinde** düşer ve cihaz kendini bir kışta öder. Cihaz seçerken markanın uygulaması, geofencing kalitesi ve kombinizle olan protokol uyumu belirleyicidir. Kurulumdan önce **doğru montaj yerini** planlayın — yanlış duvar en pahalı hatadır. Doğru cihaz + doğru yer + 20–21 °C konfor ayarı = uzun ömürlü kombi + düşük fatura.

## Otoriter Kaynaklar ve Referanslar

- [Enerji Verimliliği Portalı — EİGM](https://enerji.gov.tr/eigm-enerji-verimliligi-genel-mudurlugu)
- [Wikipedia — Kombi](https://tr.wikipedia.org/wiki/Kombi)
- [TS 825 — Binalarda Isı Yalıtım Kuralları](https://intweb.tse.org.tr/standard/standard/Standard.aspx?081118051115108051104119110104055047105102120088111043113104073117092071083085079066074114)

