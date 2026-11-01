import { createFileRoute } from "@tanstack/react-router";
import { GtChrome } from "@/components/gt/GtShell";
import { SiteFooter } from "@/components/SiteFooter";

// /randevu — the booking page now uses the new booking popup (mounted site-wide by GtBookingHost in
// __root). Visiting this URL opens it automatically; every old link to /randevu keeps working.
export const Route = createFileRoute("/randevu")({
  head: () => ({
    meta: [
      { title: "Online Randevu — Gölge Tesisat İstanbul" },
      { name: "description", content: "Gölge Tesisat online randevu: hizmeti, ilçeyi ve saati seçin, talebiniz hemen ekibimize ulaşsın. İstanbul genelinde 7/24, ortalama 30 dakikada kapınızdayız." },
      { property: "og:title", content: "Online Randevu — Gölge Tesisat" },
      { property: "og:description", content: "Birkaç adımda tesisat randevusu oluşturun. İstanbul genelinde 7/24 acil servis." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Gölge Tesisat" },
      { property: "og:locale", content: "tr_TR" },
      { property: "og:url", content: "https://golgetesisat.com/randevu" },
      { property: "og:image", content: "https://golgetesisat.com/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Online Randevu — Gölge Tesisat" },
      { name: "twitter:description", content: "Birkaç adımda tesisat randevusu oluşturun. İstanbul genelinde 7/24 acil servis." },
      { name: "twitter:image", content: "https://golgetesisat.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://golgetesisat.com/randevu" }],
  }),
  component: BookingPage,
});

const WA = "https://wa.me/905338960503?text=" + encodeURIComponent("Merhaba Gölge Tesisat, randevu almak istiyorum.");

function BookingPage() {
  return (
    <div className="min-h-screen bg-white">
      <GtChrome current="/randevu" />
      <div className="gt-ty" lang="tr">
        <section className="hero">
          <div className="wrap hero-in" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <span className="kick"><i />7/24 · ONLINE RANDEVU</span>
              <h1>Randevunuzu <em>bir dakikada</em> oluşturun.</h1>
              <p className="lead">Hizmeti, ilçenizi ve size uyan saati seçin; talebiniz iş emri olarak hazırlanır ve ekibimize ulaşır. Acil bir durum varsa doğrudan arayın — 7/24 açığız.</p>
              <div className="cta">
                <a className="btn btn-red" href="/randevu" data-book>Randevu formunu aç</a>
                <a className="btn btn-wa" href={WA} target="_blank" rel="noopener noreferrer">WhatsApp’tan yazın</a>
                <a className="btn btn-ghost" href="tel:+905338960503">0533 896 05 03</a>
              </div>
            </div>
          </div>
        </section>
        <div className="wrap" style={{ paddingBottom: 70 }}>
          <div className="prom">
            <div className="pc"><b>1 · Hizmet</b><span>Sorununuza uygun hizmeti seçin</span></div>
            <div className="pc"><b>2 · Zaman</b><span>Hemen, bugün ya da size uyan gün ve saat</span></div>
            <div className="pc"><b>3 · Adres</b><span>İlçe ve adres — iş emriniz hazırlanır</span></div>
            <div className="pc"><b>4 · Teyit</b><span>Ekibimiz ustayı ve saati teyit eder</span></div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
