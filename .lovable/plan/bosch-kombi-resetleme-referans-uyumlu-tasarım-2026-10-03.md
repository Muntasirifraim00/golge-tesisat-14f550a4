# Bosch Kombi Resetleme — Referans Uyumlu Tasarım

## Amaç
Yalnızca `/blog/bosch-kombi-resetleme` sayfasını, sağlanan referanslardaki koyu teknik editoryal stile dönüştürmek. Mobil görünümde metin, görsel ve kart sırasını referansla eşleştirmek; masaüstünde aynı tasarım dilini daha geniş ve okunabilir bir düzene uyarlamak.

## Uygulama
- Bosch sayfasına özel bir sunum bileşeni oluşturulacak; diğer blog sayfaları değişmeyecek.
- Mobilde referansın düzeni izlenecek: güçlü başlık alanı, tam genişlik kombi görseli, numaralı bölüm başlıkları, kırmızı vurgu, koyu bilgi kartları, tablolar, güvenlik uyarıları ve ilgili bölüm içi görseller.
- Mevcut Türkçe Bosch içeriğinin aynı sırası ve anlamı korunacak; referanstaki İngilizce su vanası metni kopyalanmayacak.
- Masaüstünde geniş ana içerik, sabit içindekiler/yardım alanı ve iki sütunlu bilgi blokları kullanılacak.
- Telefon ve WhatsApp çağrıları mevcut iş bilgilerini kullanacak; mevcut 3,5 saniyelik küçük sağ-alt görsel korunacak.
- Küresel dil düğmesinin bu özel sayfayla çakışması engellenecek.

## Teknik Ayrıntılar
- Sayfaya özel koşullu render ile mevcut blog veri yapısı korunacak.
- Renkler ve gölgeler global semantik tasarım tokenları üzerinden tanımlanacak.
- Mevcut Bosch görselleri kullanılacak; yeni genel içerik veya yeni blog yazısı oluşturulmayacak.
- Sonuç 509×863 mobil ve 1280×1800 masaüstü ekranlarda görsel olarak kontrol edilecek; konsol ve derleme hataları doğrulanacak.
