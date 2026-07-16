import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
    <main className="mx-auto min-h-screen max-w-md bg-background px-4 py-6">
      <Link to="/" className="inline-flex items-center gap-1 text-[12px] font-bold text-brand-red">
        <ArrowLeft className="h-4 w-4" /> Ana Sayfa
      </Link>
      <h1 className="mt-4 text-[24px] font-extrabold text-foreground">KVKK Aydınlatma Metni</h1>
      <div className="mt-4 space-y-4 text-[13px] leading-relaxed text-muted-foreground">
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Gölge Tesisat ("Şirket")
          olarak veri sorumlusu sıfatıyla, sizden topladığımız kişisel verilerinizi aşağıda
          açıklanan amaçlarla işlemekteyiz.
        </p>
        <h2 className="text-[15px] font-extrabold text-foreground">1. İşlenen Kişisel Veriler</h2>
        <p>Ad-soyad, telefon numarası, adres, hizmet talebi içeriği ve iletişim tercihleri.</p>
        <h2 className="text-[15px] font-extrabold text-foreground">2. İşleme Amaçları</h2>
        <p>Talep ettiğiniz tesisat hizmetinin sunulması, randevu organizasyonu, fatura düzenlenmesi,
          müşteri memnuniyeti ölçümü ve yasal yükümlülüklerin yerine getirilmesi.</p>
        <h2 className="text-[15px] font-extrabold text-foreground">3. Aktarım</h2>
        <p>Verileriniz, hizmetin ifası için zorunlu olduğu ölçüde saha ekiplerimiz ve yetkili kamu
          kurumları ile paylaşılabilir; üçüncü kişilere pazarlama amacıyla aktarılmaz.</p>
        <h2 className="text-[15px] font-extrabold text-foreground">4. Haklarınız</h2>
        <p>KVKK 11. madde kapsamında verilerinize erişme, düzeltme, silme ve işlemeye itiraz hakkınız
          bulunmaktadır. Başvurularınızı 0533 896 05 03 numaralı telefondan iletebilirsiniz.</p>
      </div>
    </main>
  );
}
