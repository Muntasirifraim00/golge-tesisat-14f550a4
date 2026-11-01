import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/kvkk")({
  head: () => {
    const title = "KVKK Aydınlatma Metni | Gölge Tesisat";
    const desc = "Gölge Tesisat KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.";
    const url = "https://golgetesisat.com/kvkk";
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
  component: KvkkPage,
});

function KvkkPage() {
  return (
    <LegalLayout kicker="6698 sayılı KVKK" title="KVKK Aydınlatma Metni" updated="Ekim 2026">
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Gölge Tesisat ("Şirket")
          olarak veri sorumlusu sıfatıyla, sizden topladığımız kişisel verilerinizi aşağıda
          açıklanan amaçlarla işlemekteyiz.
        </p>
        <h2>1. İşlenen Kişisel Veriler</h2>
        <p>Ad-soyad, telefon numarası, adres, hizmet talebi içeriği ve iletişim tercihleri.</p>
        <h2>2. İşleme Amaçları</h2>
        <p>Talep ettiğiniz tesisat hizmetinin sunulması, randevu organizasyonu, fatura düzenlenmesi,
          müşteri memnuniyeti ölçümü ve yasal yükümlülüklerin yerine getirilmesi.</p>
        <h2>3. Aktarım</h2>
        <p>Verileriniz, hizmetin ifası için zorunlu olduğu ölçüde saha ekiplerimiz ve yetkili kamu
          kurumları ile paylaşılabilir; üçüncü kişilere pazarlama amacıyla aktarılmaz.</p>
        <h2>4. Haklarınız</h2>
        <p>KVKK 11. madde kapsamında verilerinize erişme, düzeltme, silme ve işlemeye itiraz hakkınız
          bulunmaktadır. Başvurularınızı 0533 896 05 03 numaralı telefondan iletebilirsiniz.</p>
      </LegalLayout>
  );
}
