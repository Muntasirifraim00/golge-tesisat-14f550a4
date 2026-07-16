import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

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
    <main className="mx-auto min-h-screen max-w-md bg-background px-4 py-6">
      <Link to="/" className="inline-flex items-center gap-1 text-[12px] font-bold text-brand-red">
        <ArrowLeft className="h-4 w-4" /> Ana Sayfa
      </Link>
      <h1 className="mt-4 text-[24px] font-extrabold text-foreground">Çerez Politikası</h1>
      <div className="mt-4 space-y-4 text-[13px] leading-relaxed text-muted-foreground">
        <p>
          Bu web sitesi, kullanıcı deneyiminizi geliştirmek ve hizmet kalitemizi artırmak amacıyla
          çerezler (cookies) kullanmaktadır.
        </p>
        <h2 className="text-[15px] font-extrabold text-foreground">Kullandığımız Çerezler</h2>
        <ul className="list-inside list-disc space-y-2">
          <li><strong className="text-foreground">Zorunlu çerezler:</strong> Sitenin temel işlevleri için gereklidir.</li>
          <li><strong className="text-foreground">Tercih çerezleri:</strong> Dil ve görüntü tercihlerinizi hatırlar.</li>
          <li><strong className="text-foreground">Analitik çerezler:</strong> Anonim ziyaret istatistikleri toplar.</li>
        </ul>
        <h2 className="text-[15px] font-extrabold text-foreground">Çerezleri Yönetme</h2>
        <p>Tarayıcı ayarlarınızdan çerezleri her zaman silebilir veya engelleyebilirsiniz. Bu durumda
          sitenin bazı özellikleri düzgün çalışmayabilir.</p>
      </div>
    </main>
  );
}
