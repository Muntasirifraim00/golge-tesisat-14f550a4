import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/kullanim-kosullari")({
  head: () => {
    const title = "Kullanım Koşulları | Gölge Tesisat";
    const desc = "Gölge Tesisat kullanım koşulları: web sitesinin kullanımı ile İstanbul’da sunduğumuz tesisat, ısıtma ve doğalgaz hizmetlerine ilişkin koşullar.";
    const url = "https://golgetesisat.com/kullanim-kosullari";
    const image = "https://golgetesisat.com/og-image.jpg";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { property: "og:locale", content: "tr_TR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: Page,
});

const CARDS = [
  { k: "KEŞİF", t: "Ücretsiz keşif", p: "Taahhüt yok; işe başlamadan önce fiyatı görürsünüz." },
  { k: "FİYAT", t: "Önce onay", p: "KDV dahil net fiyatı onaylamadan iş başlamaz." },
  { k: "GARANTİ", t: "Yazılı garanti", p: "Kapsam ve süre teklif / faturada belirtilir." },
  { k: "HAKLARINIZ", t: "Tüketici hakları", p: "6502 sayılı Kanun’daki haklarınız saklıdır." },
];

function Page() {
  return (
    <LegalLayout kicker="Web sitesi ve hizmetler" title="Kullanım Koşulları" updated="1 Kasım 2026" cards={CARDS}
      lead="Web sitemizin kullanımına ve İstanbul’da sunduğumuz tesisat, ısıtma ve doğalgaz hizmetlerine ilişkin koşullar — anlaşılır bir dille.">
      <h2>1. Biz kimiz ve bu koşullar</h2>
      <p>Bu koşullar siz ile <b>Gölge Tesisat</b> (Caferağa Mah. Moda Cad. No:1, Kadıköy, İstanbul · 0533 896 05 03; “biz”) arasında geçerlidir ve bu web sitesinin kullanımını ve İstanbul’da sunduğumuz tesisat, ısıtma ve doğalgaz hizmetlerini kapsar. Web sitesini kullanarak veya hizmet talep ederek bu koşulları kabul etmiş olursunuz. Tüketiciyseniz bu koşulların hiçbir hükmü 6502 sayılı Tüketicinin Korunması Hakkında Kanun’dan veya diğer emredici mevzuattan doğan haklarınızı sınırlamaz.</p>

      <h2>2. Randevu talepleri</h2>
      <p>Web sitesi, WhatsApp veya telefon üzerinden yapılan randevu bir <b>taleptir</b>, henüz sözleşme değildir. Talebinizi sizi arayarak veya size yazarak teyit ederiz. Varış aralıkları ve “ortalama varış” süreleri (ör. ~30 dakika) ortalama ve tahminidir, garanti değildir; trafik, hava durumu ve acil işler bunları etkileyebilir ve sizi bilgilendiririz.</p>

      <h2>3. Keşif, teklif ve fiyat</h2>
      <ul>
        <li><b>Keşif ücretsizdir</b> ve taahhüt gerektirmez.</li>
        <li>Herhangi bir işe başlamadan önce, kararlaştırılan kapsam için <b>KDV dahil, şeffaf ve net bir fiyat</b> veririz. İş ancak siz onayladıktan sonra başlar.</li>
        <li>İş sırasında kararlaştırılan kapsamın dışında bir sorun bulursak durur, açıklar ve yeni fiyat veririz. Onayınız olmadan ek iş yapılmaz ve ücretlendirilmez.</li>
      </ul>

      <h2>4. Ödeme ve fatura</h2>
      <p>Aksi kararlaştırılmadıkça ödemeyi iş bitiminde nakit veya kartla yapabilirsiniz. Her hizmet faturalandırılır. Sigorta kapsamındaki işlerde, sigortacınız bize doğrudan ödeme yapmayı yazılı olarak kabul etmedikçe ödemeden siz sorumlusunuz.</p>

      <h2>5. Sizden beklediklerimiz</h2>
      <ul>
        <li>Sorun ve adres hakkında doğru bilgi vermeniz.</li>
        <li>Ustalarımıza çalışma alanına, suya ve elektriğe güvenli erişim sağlamanız ve tehlikeli bir durum varsa bildirmeniz.</li>
        <li>Ortak alanlardaki işler için ev sahibinizden, bina yönetiminden veya komşularınızdan gerekli izni almanız.</li>
        <li>Mümkünse değerli ve kırılabilir eşyaları çalışma alanından uzaklaştırmanız.</li>
      </ul>

      <h2>6. Evinizde nasıl çalışırız</h2>
      <p>Başlamadan önce zemini ve çevreyi koruruz. Duvarda, zeminde veya fayansta açma gerekiyorsa önce tespit ekipmanıyla sorunu buluruz, nereyi ve neden açmamız gerektiğini söyleriz ve yalnızca onayınızla devam ederiz. Çalışma alanını teklifte kararlaştırıldığı şekilde kapatır ve temizleriz; kararlaştırılan kapsamın dışındaki fayans, boya veya ince işler belirtilmedikçe dahil değildir.</p>

      <h2>7. Gaz güvenliği</h2>
      <p><b>Gaz kokusu alırsanız binayı terk edin, elektrik düğmelerini ve ateşi kullanmayın ve önce doğalgaz acil hattı 187’yi arayın.</b> Doğalgaz işlerini dağıtım şirketinin kurallarına uygun şekilde yaparız. Güvenli veya yasal olmayan işleri reddedebilir ya da durdurabiliriz.</p>

      <h2>8. Garanti</h2>
      <p>Yaptığımız işler yazılı garantiyle teslim edilir; garantinin süresi ve kapsamı teklifte veya faturada belirtilir. Garanti kapsamında bir arıza ortaya çıkarsa bize ulaşın, ücretsiz onarırız.</p>
      <p>Garanti şunları kapsamaz: hatalı kullanım, kaza, donma veya üçüncü kişi müdahalesinden kaynaklanan hasarlar; sizin temin ettiğiniz parça veya malzemeler; size bildirdiğimiz, işimizin kapsamı dışındaki mevcut sorunlar; sarf malzemelerinin olağan aşınması; sonradan başkası tarafından değiştirilen işler. Bu garanti yasal haklarınıza ek olup onları azaltmaz.</p>

      <h2>9. Sorumluluk</h2>
      <p>İşi yaparken kusurumuzdan kaynaklanan zararlardan Türk hukukuna göre sorumluyuz. Makul şekilde tespit edilemeyecek mevcut tesisattaki gizli kusurlardan, kontrolümüz dışındaki gecikmelerden veya verdiğimiz güvenlik tavsiyelerine uyulmamasından kaynaklanan kayıplardan sorumlu değiliz. Bu koşulların hiçbir hükmü, kasıt veya ağır ihmal dahil kanunen kaldırılamayan sorumluluğu ortadan kaldırmaz.</p>

      <h2>10. Bu web sitesinin kullanımı</h2>
      <p>Sitedeki içerik (metin, tasarım, görseller, logo) bize aittir veya izinle kullanılmaktadır ve yazılı iznimiz olmadan ticari amaçla kopyalanamaz. Bilgilerin doğru olması için çalışırız; ancak hizmet açıklamaları, ortalama süreler ve sitedeki araçlar (ör. fiyat sihirbazı, piyasa fiyatları, belirti kontrolü) yalnızca bilgilendirme amaçlıdır — bağlayıcı fiyat, işe başlamadan önce size verdiğimiz fiyattır. Üçüncü taraf hizmetlerine (WhatsApp, Google Haritalar) verilen bağlantılar kolaylık içindir; bu hizmetlerin kendi koşulları geçerlidir.</p>

      <h2>11. Şikâyetler ve uyuşmazlıklar</h2>
      <p>Lütfen önce bize bildirin — <b>0533 896 05 03</b>’ü arayın veya WhatsApp’tan yazın — sorunu hızla çözmeye çalışalım. Bu koşullar Türkiye Cumhuriyeti kanunlarına tabidir. Tüketiciyseniz, her yıl belirlenen parasal sınırlar dahilinde yerleşim yerinizdeki <b>Tüketici Hakem Heyeti</b>’ne veya <b>Tüketici Mahkemesi</b>’ne başvurabilirsiniz. Tüketici olmayan müşteriler için İstanbul (Anadolu) mahkemeleri ve icra daireleri yetkilidir.</p>

      <h2>12. Değişiklikler</h2>
      <p>Bu koşulları güncelleyebiliriz; güncellemeden sonra yapılan randevulara bu sayfadaki sürüm uygulanır. Son güncelleme: <b>1 Kasım 2026</b>.</p>
    </LegalLayout>
  );
}
