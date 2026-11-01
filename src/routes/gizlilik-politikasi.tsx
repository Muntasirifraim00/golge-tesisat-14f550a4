import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/gizlilik-politikasi")({
  head: () => {
    const title = "Gizlilik Politikası | Gölge Tesisat";
    const desc = "Gölge Tesisat gizlilik politikası: web sitesinde, telefonda, WhatsApp’ta ve adresinizde kişisel bilgilerinizi nasıl işlediğimizin sade özeti.";
    const url = "https://golgetesisat.com/gizlilik-politikasi";
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
  { k: "SATIŞ YOK", t: "Veri satmayız", p: "Kişisel verilerinizi satmayız ve başkalarının reklamı için paylaşmayız." },
  { k: "SADECE GEREKENİ", t: "Gerekeni alırız", p: "Ad, telefon, adres ve yapılacak iş." },
  { k: "SİZ KARAR VERİRSİNİZ", t: "Tercih sizde", p: "İsteğe bağlı depolama ve çerezler sizin onayınızla." },
  { k: "HER ZAMAN SORUN", t: "Hakkınız", p: "Verilerinizi görme, düzeltme veya sildirme — ücretsiz." },
];

function Page() {
  return (
    <LegalLayout kicker="Sade dille özet" title="Gizlilik Politikası" updated="1 Kasım 2026" cards={CARDS}
      lead="Bilgilerinizi web sitesinde, telefonda, WhatsApp’ta ve adresinizde nasıl ele aldığımızın kısa ve anlaşılır özeti. Türk hukukuna göre tam aydınlatma metni KVKK Aydınlatma Metnimizdir.">
      <h2>1. Bu politika neyi kapsar</h2>
      <p>Bu politika, <b>Gölge Tesisat</b>’ın web sitemizi ziyaret ettiğinizde, hizmet talep ettiğinizde, bizi aradığınızda veya bize yazdığınızda ve ustalarımız adresinizde çalışırken kişisel bilgilerinizi nasıl işlediğini açıklar. Bir özettir; bağlayıcı ayrıntılar <Link to="/kvkk">KVKK Aydınlatma Metni</Link>’ndedir ve bir fark olursa o metin esas alınır.</p>

      <h2>2. Hangi bilgileri alıyoruz</h2>
      <h3>Randevu talep ettiğinizde</h3>
      <p>Ad soyad, telefon numarası, ilçe ve adres, ihtiyaç duyduğunuz hizmet, tercih ettiğiniz zaman ve eklediğiniz not.</p>
      <h3>İşi yaparken</h3>
      <p>Tespit ettiklerimiz, onayladığınız teklif, yapılan iş, kullanılan parçalar, çalışma alanının fotoğrafları, fatura ve garanti bilgileri.</p>
      <h3>Siteyi ziyaret ettiğinizde</h3>
      <p>Tarayıcınızın gönderdiği temel teknik veriler (ör. IP adresi) ve <Link to="/cerez-politikasi">Çerez Politikası</Link>’nda açıklanan çerezler ve ölçüm araçları.</p>
      <p>Randevu için T.C. kimlik numaranızı istemeyiz; web sitesinde kart bilgisi de istemeyiz.</p>

      <h2>3. Randevu formu nasıl çalışır</h2>
      <ol>
        <li><b>Formu kendi cihazınızda doldurursunuz.</b> Yazarken hiçbir şey gönderilmez.</li>
        <li><b>“İşlevsel” depolamaya izin verirseniz</b> yarım kalan formunuz cihazınızda saklanır; izin vermezseniz saklanmaz.</li>
        <li><b>Talebi gönderdiğinizde</b> bilgileriniz randevu kaydı olarak güvenli veri tabanımıza kaydedilir ve mesaj, kontrol edip göndermeniz için kendi WhatsApp’ınızda açılır. İsterseniz bizi doğrudan da arayabilirsiniz.</li>
      </ol>

      <h2>4. Bilgileri ne için kullanıyoruz</h2>
      <ul>
        <li>Doğru ustayı, doğru adrese, kararlaştırılan zamanda göndermek ve varış hakkında sizinle iletişim kurmak için.</li>
        <li>İşe başlamadan önce net fiyat vermek ve onayladığınız teklifi kayıt altına almak için.</li>
        <li>İşi faturalamak ve vergi ile muhasebe yükümlülüklerimizi yerine getirmek için.</li>
        <li>Garanti kapsamındaki taleplerinizi ve şikâyetlerinizi karşılamak için.</li>
        <li>Sitemizin ve reklamlarımızın performansını ölçmek için — yalnızca Çerez Politikası’nda açıklanan şekilde.</li>
        <li>Yalnızca ayrıca izin verirseniz: bakım hatırlatmaları veya kampanyalar göndermek için. Bunu istediğiniz zaman durdurabilirsiniz.</li>
      </ul>

      <h2>5. Bilgileri kimler görür</h2>
      <p>Kendi ekibimiz, yalnızca işinin gerektirdiği kadarıyla. Şirket dışında: mali müşavirimiz, kanunun gerektirdiği durumlarda resmi kurumlar, doğalgaz projelerinde gerektiğinde dağıtım şirketi ve — yalnızca siz isterseniz — sigortacınız veya bina yöneticiniz. Barındırma, veri tabanı, iletişim ve ölçüm hizmeti sağlayıcılarımız verileri bizim adımıza işler. Ayrıntılar KVKK Aydınlatma Metni’ndedir.</p>
      <p><b>Kişisel verileri asla satmayız ve başkalarının reklamı için paylaşmayız.</b></p>

      <h2>6. WhatsApp, telefon ve diğer hizmetler</h2>
      <p>Bize WhatsApp’tan yazarsanız o yazışmaya WhatsApp / Meta’nın kendi gizlilik koşulları da uygulanır ve veriler Türkiye dışında işlenebilir. İstemiyorsanız bizi <b>0533 896 05 03</b>’ten arayabilirsiniz. “Yol tarifi” butonlarımız Google Haritalar’ı açar; sitedeki yazı tipleri Google Fonts’tan yüklenir; ziyaret ölçümü ve reklam ölçümü için Google araçları kullanılır. Bu hizmetler verileri kendi politikalarına göre işler.</p>

      <h2>7. Evinizin fotoğrafları</h2>
      <p>Ustalarımız kalite kontrolü, garantiniz ve — siz isterseniz — sigortacınız veya bina yönetimi için işten önce ve sonra çalışma alanının fotoğrafını çekebilir. Kişileri değil, tesisatı ve işi fotoğraflarız. <b>Evinizin fotoğraflarını izniniz olmadan web sitemizde veya sosyal medyada yayınlamayız</b> ve adresinizi belli edebilecek her şeyi çıkarırız.</p>

      <h2>8. Ne kadar süre saklıyoruz</h2>
      <p>Yalnızca gerektiği kadar: iş ve garanti kayıtlarını garanti süresi ve yasal zamanaşımı süreleri boyunca; faturaları vergi ve ticaret mevzuatının gerektirdiği süre boyunca; işe dönüşmeyen randevu taleplerini yalnızca kısa bir süre.</p>

      <h2>9. Güvenlik</h2>
      <p>Verilere yalnızca ihtiyacı olan kişiler erişir, cihaz ve hesaplarımız korunur, ustalarımız yalnızca işin gerektirdiği bilgileri taşır. Hiçbir sistem kusursuz değildir; bir sorun olursa kanunun gerektirdiği şekilde sizi ve yetkili kurumları bilgilendiririz.</p>

      <h2>10. Tercihleriniz ve haklarınız</h2>
      <p>Hakkınızda hangi bilgileri tuttuğumuzu sorabilir, düzeltilmesini veya silinmesini isteyebilir, işlemeye itiraz edebilir ya da verdiğiniz onayı geri alabilirsiniz — ücretsiz olarak, en geç 30 gün içinde yanıtlanır. Talepleriniz için <b>0533 896 05 03</b> numarasını arayabilir veya WhatsApp’tan yazabilirsiniz. Başvuru yöntemleri KVKK Aydınlatma Metni’nde yer alır.</p>

      <h2>11. Çocuklar</h2>
      <p>Hizmetlerimizi yetişkinler talep eder. 18 yaşından küçükseniz lütfen ebeveyninizden veya velinizden bizimle iletişime geçmesini isteyin.</p>

      <h2>12. Değişiklikler</h2>
      <p>Verileri işleme şeklimizi değiştirirsek bu sayfayı ve güncelleme tarihini yenileriz. Son güncelleme: <b>1 Kasım 2026</b>.</p>
    </LegalLayout>
  );
}
