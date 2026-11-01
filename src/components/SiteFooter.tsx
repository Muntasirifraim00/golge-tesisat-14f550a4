import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, ChevronDown, Clock, MapPin, MessageCircle, Navigation, Phone, ShieldCheck, Star } from "lucide-react";
import logoImg from "@/assets/logo.jpg";
import { BUSINESS, FULL_ADDRESS } from "@/data/business";
import { SERVICES } from "@/data/services";
import { DISTRICTS } from "@/data/districts";

// Lightweight static list — importing BLOG_POSTS here would pull the entire
// ~19k-line blog dataset (and all images) into every page that renders the footer.
const TOP_GUIDES: { slug: string; title: string }[] = [
  { slug: "taharet-muslugu-nasil-takilir-degistirilir", title: "Taharet Musluğu Nasıl Takılır, Değiştirilir ve Tamir Edilir?" },
  { slug: "bulasik-makinesi-nasil-baglanir", title: "Bulaşık Makinesi Nasıl Bağlanır? Su Girişi, Tahliye ve Sifon" },
  { slug: "kombi-bacasi-nedir-cesitleri-montaji", title: "Kombi Bacası Nedir? Çeşitleri, Montajı ve Güvenlik" },
  { slug: "kanal-goruntuleme-nedir-nasil-yapilir", title: "Kanal Görüntüleme Nedir? Nasıl Yapılır, Ne Zaman Gerekir?" },
  { slug: "kombi-montaji-nasil-yapilir-baglanti-rehberi", title: "Kombi Montajı Nasıl Yapılır? Bağlantı ve Kurulum Rehberi" },
  { slug: "radyator-nedir-cesitleri-secim-rehberi", title: "Radyatör Nedir? Çeşitleri, Farkları ve Seçim Rehberi" },
];

// Sitewide footer in the new Gölge Tesisat design. The visible NAP block keeps
// citation data identical to the LocalBusiness JSON-LD; the full link directory
// (services × districts × prices × guides) stays collapsed behind one accessible
// disclosure but is always in the DOM for crawlers.
export function SiteFooter() {
  const [linksOpen, setLinksOpen] = useState(false);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`;
  const year = new Date().getFullYear();

  return (
    <footer className="gt gtf">
      <div className="band">
        <div className="wrap">
          <div>
            <span className="live"><i />7/24 ACİL TESİSAT HATTI</span>
            <h2>Sorun büyümeden <em>hemen arayın.</em></h2>
            <p>İstanbul'un her noktasına ortalama 30 dakikada hızlı müdahale — su kaçağı, tıkanıklık, kombi ve petek için ruhsatlı ekibimiz hazır.</p>
          </div>
          <div className="acts">
            <a className="btn btn-red" href={BUSINESS.phoneHref}><Phone className="ico gt-ring" />{BUSINESS.phoneDisplay}</a>
            <a className="btn btn-wa" href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle className="ico" />WhatsApp</a>
            <Link className="btn btn-ghost" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="wrap">
          <div>
            <Link to="/" className="brand" style={{ textDecoration: "none", color: "inherit" }}>
              <img src={logoImg} alt="Gölge Tesisat logosu" width={46} height={46} loading="lazy" />
              <div><b>Gölge <em>Tesisat</em></b><small>GÜVENİLİR · HIZLI · GARANTİLİ</small></div>
            </Link>
            <p className="desc">{BUSINESS.description}</p>
            <div className="rate"><Star /><b>{BUSINESS.rating.value}</b><span>/ 5 · {BUSINESS.rating.count.toLocaleString("tr-TR")} değerlendirme</span></div>
            <address>
              <a className="r wide" href={mapsHref} target="_blank" rel="noopener noreferrer"><MapPin /><span>{FULL_ADDRESS}</span></a>
              <a className="r" href={BUSINESS.phoneHref}><Phone /><b>{BUSINESS.phoneDisplay}</b></a>
              <span className="r"><Clock /><span>7/24 açık — hafta sonu ve resmi tatil dahil</span></span>
              <a className="r" href={mapsHref} target="_blank" rel="noopener noreferrer"><Navigation /><span>Yol tarifi</span></a>
              <a className="r" href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle /><span>WhatsApp'tan yazın</span></a>
            </address>
            <div className="trust"><ShieldCheck />Ruhsatlı &amp; sigortalı ekip · 2 yıl işçilik garantisi</div>
          </div>

          <div className="dir">
            <h3>Hızlı bağlantılar</h3>
            <p>Hizmetler, bölgeler, fiyat sayfaları ve tesisat rehberleri.</p>
            <button type="button" aria-expanded={linksOpen} aria-controls="footer-link-directory" onClick={() => setLinksOpen((o) => !o)}>
              {linksOpen ? "Bağlantıları gizle" : "Tüm bağlantıları göster"}<ChevronDown />
            </button>
            <div className="cnt">
              <span><b>{SERVICES.length}</b>hizmet</span>
              <span><b>{DISTRICTS.length}</b>bölge</span>
              <span><b>{TOP_GUIDES.length}</b>rehber</span>
            </div>
          </div>
        </div>

        <div className="wrap">
          <div id="footer-link-directory" className={"links" + (linksOpen ? " open" : "")}>
            <div>
              <div className="cols">
                <div>
                  <h4>Hizmetler</h4>
                  <ul>
                    {SERVICES.map((s) => <li key={s.slug}><Link to="/hizmet/$slug" params={{ slug: s.slug }}>{s.name}</Link></li>)}
                    <li><Link to="/acil-tesisatci">Acil Tesisatçı 7/24</Link></li>
                    <li><Link className="more" to="/hizmetler">Tüm Hizmetler →</Link></li>
                  </ul>
                </div>
                <div>
                  <h4>Bölgeler</h4>
                  <ul>
                    {DISTRICTS.map((d) => <li key={d.slug}><Link to="/tesisatci/$slug" params={{ slug: d.slug }}>{d.name} Tesisatçı</Link></li>)}
                    <li><Link className="more" to="/tesisatci">Tüm Bölgeler →</Link></li>
                  </ul>
                </div>
                <div>
                  <h4>Fiyatlar</h4>
                  <ul>
                    {SERVICES.map((s) => <li key={s.slug}><Link to="/hizmet/$slug/fiyat" params={{ slug: s.slug }}>{s.name} Fiyatları</Link></li>)}
                    <li><Link className="more" to="/fiyatlar">Fiyatlar nasıl belirlenir →</Link></li>
                    <li><Link className="more" to="/randevu">Ücretsiz Keşif / Randevu →</Link></li>
                  </ul>
                </div>
                <div>
                  <h4>Rehberler</h4>
                  <ul>
                    {TOP_GUIDES.map((p) => <li key={p.slug}><Link to="/blog/$slug" params={{ slug: p.slug }}>{p.title}</Link></li>)}
                    <li><Link className="more" to="/blog">Tüm Yazılar <ArrowRight size={12} style={{ display: "inline" }} /></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="legal">
        <div className="wrap">
          <nav aria-label="Kurumsal">
            <Link to="/">Ana Sayfa</Link>
            <Link to="/hizmetler">Hizmetler</Link>
            <Link to="/tesisatci">Bölgeler</Link>
            <Link to="/fiyatlar">Fiyatlar</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/randevu">Randevu Al</Link>
            <Link to="/acil-tesisatci">Acil Tesisatçı</Link>
            <Link to="/kvkk">KVKK</Link>
            <Link to="/cerez-politikasi">Çerez Politikası</Link>
          </nav>
          <span>© {year} {BUSINESS.name}. Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  );
}
