import { createFileRoute } from "@tanstack/react-router";
import { Download, CheckCircle2, AlertTriangle, MapPin, FileSpreadsheet } from "lucide-react";

export const Route = createFileRoute("/google-ads-kurulum")({
  head: () => ({
    meta: [
      { title: "Google Ads Kurulum Rehberi — Gölge Tesisat" },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content:
          "Gölge Tesisat Google Ads kampanyalarının Google Ads Editor ile içe aktarılması, konum hedefleme ve yayına alma adımları.",
      },
    ],
  }),
  component: Page,
});

const FILES = [
  {
    file: "1-kampanya-adgroup-keyword.csv",
    title: "Kampanya + Reklam Grubu + Anahtar Kelime",
    desc: "12 kampanya (6 hizmet × Avrupa/Anadolu), 34 reklam grubu, ~320 anahtar kelime (Phrase + Exact). Kampanyalar PAUSED gelir.",
  },
  {
    file: "2-responsive-search-ads.csv",
    title: "Responsive Search Ads (RSA)",
    desc: "Her reklam grubu için 12 başlık + 4 açıklamalı RSA. Final URL'ler ilgili hizmet sayfasına gider.",
  },
  {
    file: "3-negatif-kelimeler.csv",
    title: "Negatif Anahtar Kelimeler",
    desc: "56 negatif kelime (iş ilanı, DIY, diğer şehirler, ürün satın alma vb.) tüm kampanyalara uygulanır.",
  },
  {
    file: "4-konum-hedefleme.csv",
    title: "Konum Hedefleme Listesi",
    desc: "58 bölge: ilçeler doğrudan hedeflenir, semt/mahalleler (Bebek, Nişantaşı, Moda...) 3 km yarıçapla eklenir.",
  },
  {
    file: "5-uzantilar-sitelink-callout-call.csv",
    title: "Uzantılar (Sitelink / Callout / Snippet / Call)",
    desc: "6 sitelink, 8 callout, hizmet snippet'i ve arama uzantısı. Tek dosyada 4 blok halinde.",
  },
];

const GTM_FILE = {
  file: "golgetesisat-gtm-container.json",
  title: "Google Tag Manager Container (JSON)",
  desc: "GTM-M89R8DRZ için hazır container: Conversion Linker, Remarketing ve 4 dönüşüm etiketi (Telefon, WhatsApp, Geri Arama, Randevu) + tetikleyiciler ve dataLayer değişkenleri.",
};


const SERVICES = [
  ["Acil Tesisatçı / 7/24", "/acil-tesisatci", "₺500/gün"],
  ["Su Kaçağı Tespiti / Kırmadan", "/hizmet/su-kacagi-tespiti", "₺600/gün"],
  ["Tıkanıklık Açma / Lavabo-Tuvalet", "/hizmet/tikaniklik-acma", "₺500/gün"],
  ["Petek Temizleme", "/hizmet/petek-temizligi", "₺300/gün"],
  ["Boru ve Tesisat Tamiri", "/acil-tesisatci", "₺400/gün"],
  ["Kamera ile Gider/Boru Kontrolü", "/hizmet/kanal-goruntuleme", "₺250/gün"],
];

function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Google Ads Kurulum Rehberi
      </h1>
      <p className="mt-3 text-muted-foreground">
        Hesap: <strong>475-562-1868</strong> · Dönüşüm ID:{" "}
        <strong>AW-18366033946</strong> · Sitedeki dönüşüm takibi (telefon,
        WhatsApp, geri arama, randevu) aktif.
      </p>

      {/* Downloads */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" /> 1) İndirilecek dosyalar
        </h2>
        <div className="mt-4 grid gap-3">
          {FILES.map((f) => (
            <a
              key={f.file}
              href={`/google-ads/${f.file}`}
              download
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 hover:bg-accent transition-colors"
            >
              <Download className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
              <span>
                <span className="block font-medium">{f.title}</span>
                <span className="block text-sm text-muted-foreground">
                  {f.desc}
                </span>
                <span className="block text-xs mt-1 font-mono text-primary">
                  /google-ads/{f.file}
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Structure */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">2) Kampanya yapısı</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Her hizmet için 2 kampanya: <em>Avrupa</em> ve <em>Anadolu</em>. Bütçe
          ikiye bölünmüş olarak gelir; dilediğiniz gibi değiştirebilirsiniz.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-2">Hizmet</th>
                <th className="text-left p-2">Landing page</th>
                <th className="text-left p-2">Önerilen bütçe (toplam)</th>
              </tr>
            </thead>
            <tbody>
              {SERVICES.map(([n, u, b]) => (
                <tr key={n} className="border-t border-border">
                  <td className="p-2">{n}</td>
                  <td className="p-2 font-mono text-xs">{u}</td>
                  <td className="p-2">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Steps */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">3) Adım adım içe aktarma</h2>
        <ol className="mt-4 space-y-4 text-sm leading-relaxed">
          <li>
            <strong>Google Ads Editor'ü indirin</strong> —{" "}
            <a
              className="text-primary underline"
              href="https://ads.google.com/intl/tr_tr/home/tools/ads-editor/"
              target="_blank"
              rel="noreferrer"
            >
              ads.google.com/home/tools/ads-editor
            </a>
            . Kurulum sonrası hesabınızla giriş yapıp{" "}
            <strong>475-562-1868</strong> hesabını indirin (Get recent changes →
            All campaigns).
          </li>
          <li>
            <strong>Dosya 1'i içe aktarın</strong> — Editor'de{" "}
            <em>Account → Import → From file</em> → “1-kampanya-adgroup-keyword.csv”.
            Alan eşleştirme ekranında Google alanları otomatik tanır; “Campaign”,
            “Ad Group”, “Keyword”, “Criterion Type”, “Final URL” eşleşmiş
            olmalı. <em>Preview changes</em> → <em>Apply</em>.
          </li>
          <li>
            <strong>Dosya 2 (reklamlar)</strong> — aynı yolla içe aktarın. Ad
            type sütunu “Responsive search ad” olarak gelir.
          </li>
          <li>
            <strong>Dosya 3 (negatifler)</strong> — aynı yolla; “Campaign
            Negative Broad” kampanya seviyesinde uygulanır.
          </li>
          <li>
            <strong>Dosya 5 (uzantılar)</strong> — dosya 4 blok içerir. Editor
            tek seferde tek varlık türü aldığı için blokları ayrı ayrı kopyalayıp
            ayrı CSV olarak aktarın ya da Editor'de Sitelink / Callout /
            Structured snippet / Call bölümlerine yapıştırın.
          </li>
          <li>
            <strong>Post changes</strong> — sağ üstten <em>Post</em> deyip
            değişiklikleri hesaba gönderin. Kampanyalar <em>Paused</em> gelir,
            konum ayarını yapmadan başlatmayın.
          </li>
        </ol>
      </section>

      {/* Locations */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" /> 4) Konum hedefleme (kritik)
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Konumlar CSV ile güvenilir şekilde aktarılmaz; web arayüzünden bir kez
          yapıp diğer kampanyalara kopyalamak en hızlısı.
        </p>
        <ol className="mt-4 space-y-3 text-sm leading-relaxed">
          <li>
            Google Ads web arayüzü → kampanya → <em>Settings → Locations →
            Enter another location</em>.
          </li>
          <li>
            Dosya 4'teki <strong>ilçeleri</strong> (Beşiktaş, Şişli, Kadıköy...)
            arayıp <em>Target</em> ile ekleyin.
          </li>
          <li>
            <strong>Semt/mahalleleri</strong> (Bebek, Nişantaşı, Etiler, Moda,
            Bağdat Caddesi, Acarkent...) <em>Advanced search → Radius</em> ile
            3 km yarıçap olarak ekleyin.
          </li>
          <li>
            <strong>Location options</strong>: “Presence: People in or regularly
            in your targeted locations” seçin (Presence or interest DEĞİL).
          </li>
          <li>
            Türkiye'nin geri kalanı hedeflenmesin diye ülke/şehir seviyesinde
            (İstanbul geneli, Türkiye) hedef <em>eklemeyin</em>.
          </li>
        </ol>
      </section>

      {/* Conversions */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> 5) Dönüşüm ve teklif
        </h2>
        <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
          <li>
            Sitede 4 dönüşüm aktif: Phone Click, WhatsApp Click, Callback Form,
            Booking Form (AW-18366033946).
          </li>
          <li>
            Primary conversion olarak <strong>Callback Form + Booking Form +
            Phone Click</strong> bırakın; WhatsApp'ı “Secondary” yapın (çift
            sayımı önler).
          </li>
          <li>
            İlk 2 hafta <strong>Maximize Clicks + Max CPC ₺25 limiti</strong>
            ile öğrenme; 30+ dönüşüm sonrası{" "}
            <strong>Maximize Conversions / Target CPA</strong>'ya geçin.
          </li>
          <li>
            Reklam programı: 7/24 açık; 22:00–07:00 arası bid adjustment +%20
            (acil aramalar).
          </li>
          <li>Cihaz: Mobil +%20, tablet −%50.</li>
        </ul>
      </section>

      {/* Go live */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">6) Yayına alma kontrol listesi</h2>
        <ul className="mt-3 space-y-2 text-sm list-disc pl-5">
          <li>Ödeme yöntemi tanımlı ve hesap aktif mi?</li>
          <li>Konumlar eklendi, “Presence” seçildi mi?</li>
          <li>Negatif listeler kampanyalara uygulandı mı?</li>
          <li>Call asset (0533 896 05 03) ve sitelink'ler onaylandı mı?</li>
          <li>
            Google Business Profile hesaba bağlandı mı (Linked accounts →
            Business Profile)?
          </li>
          <li>
            Dönüşüm durumları “Recording conversions” görünene kadar test edin
            (telefon linkine tıklayıp Ads → Conversions ekranını kontrol edin).
          </li>
          <li>
            Hepsi tamamsa kampanyaları <strong>Enabled</strong> yapın.
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-lg border border-border bg-muted/40 p-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" /> Notlar
        </h2>
        <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
          <li>
            Bütçeler örnek; toplam ~₺2.550/gün. Tek başlangıç önerisi: sadece
            Acil Tesisatçı + Su Kaçağı + Tıkanıklık kampanyalarını açın.
          </li>
          <li>
            Broad match yok — bilinçli tercih. Search terms raporunu haftada 2
            kez kontrol edip yeni negatif ekleyin.
          </li>
          <li>
            Yeni bölge/hizmet gerekirse CSV'leri güncelleyebiliriz.
          </li>
        </ul>
      </section>
    </main>
  );
}
