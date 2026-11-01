import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/cerez-politikasi")({
  head: () => {
    const title = "Çerez Politikası | Gölge Tesisat";
    const desc = "Gölge Tesisat web sitesinde kullanılan çerezler hakkında bilgilendirme.";
    const url = "https://golgetesisat.com/cerez-politikasi";
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
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <LegalLayout kicker="Çerez kullanımı" title="Çerez Politikası" updated="Ekim 2026">
        <p>
          Bu web sitesi, kullanıcı deneyiminizi geliştirmek ve hizmet kalitemizi artırmak amacıyla
          çerezler (cookies) kullanmaktadır.
        </p>
        <h2>Kullandığımız Çerezler</h2>
        <ul>
          <li><strong>Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir.</li>
          <li><strong>Tercih çerezleri:</strong> Dil ve görüntü tercihlerinizi hatırlar.</li>
          <li><strong>Analitik çerezler:</strong> Anonim ziyaret istatistikleri toplar.</li>
        </ul>
        <h2>Çerezleri Yönetme</h2>
        <p>Tarayıcı ayarlarınızdan çerezleri her zaman silebilir veya engelleyebilirsiniz. Bu durumda
          sitenin bazı özellikleri düzgün çalışmayabilir.</p>
      </LegalLayout>
  );
}
