import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { GtFaq, GtPage, useReveal } from "@/components/gt/GtShell";
import { PriceTicket } from "@/components/gt/PriceTicket";
import { MarketBar, Ticks, fmtChecked } from "@/components/gt/MarketBar";
import { MARKET_PRICES, tl } from "@/data/market-prices";
import { BUSINESS } from "@/data/business";
import { SERVICES } from "@/data/services";

const TITLE = "Tesisat Fiyatları 2026 İstanbul — Nasıl Belirlenir? | Gölge Tesisat";
const DESC = "İstanbul'da tesisat fiyatları nasıl belirlenir? Ücretsiz keşif, işe başlamadan net fiyat, 2 yıl garanti. 14 hizmet için fiyatı etkileyen faktörler ve yayınlanmış piyasa aralıkları.";
const URL = "https://golgetesisat.com/fiyatlar";

const FAQS = [
  { q: "Neden her hizmet için tek bir sabit fiyat göstermiyorsunuz?", a: "Aynı hizmet 20 dakikalık bir iş de olabilir, tam günlük bir iş de. İnternette verilen sabit fiyatlar çoğu zaman yerinde artar. Biz ücretsiz keşiften sonra gerçek işiniz için tek ve net bir fiyatı, işe başlamadan onayınıza sunuyoruz." },
  { q: "Keşif ve fiyat teklifi ücretli mi?", a: "Hayır. Telefonda anlatmanız, WhatsApp'tan fotoğraf göndermeniz veya yerinde keşif tamamen ücretsizdir ve sizi hiçbir şeye bağlamaz." },
  { q: "İşe başladıktan sonra fiyat artabilir mi?", a: "Onayınız olmadan hayır. İkinci bir sorun çıkarsa veya işi değiştirmek isterseniz durur, açıklar ve ayrıca fiyatlandırırız. Karar sizindir." },
  { q: "Bu sayfadaki piyasa aralıkları nedir?", a: "Armut.com pazar yerinin her iş türü için yayınladığı ortalama fiyat aralıklarıdır. Farklı hizmet verenlerin tekliflerini gösterir — Gölge Tesisat fiyatı değildir ve gerçek işler bu aralığın dışında kalabilir." },
  { q: "İlçeye göre fiyat değişir mi?", a: "39 ilçenin tamamında aynı söz geçerli: ücretsiz keşif, işten önce net fiyat ve 2 yıl yazılı işçilik garantisi. Fiyatı işin kendisi belirler." },
  { q: "Fotoğraftan fiyat alabilir miyim?", a: "Çoğu zaman evet — damlatan musluk, tıkalı lavabo veya petek temizliği gibi görünür işlerde. Duvar içindeki kaçak gibi gizli sorunlarda önce tespit gerektiğini dürüstçe söyleriz." },
  { q: "Ödemeyi ne zaman yapıyorum?", a: "İş tamamlandıktan ve siz kontrol ettikten sonra nakit veya kartla. Talep eden kurumsal müşterilerimize fatura düzenliyoruz." },
];

export const Route = createFileRoute("/fiyatlar")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "tesisat fiyatları, tesisatçı fiyatları istanbul, su kaçağı tespiti fiyatı, kombi bakım fiyatı 2026, petek temizleme fiyatı, tıkanıklık açma fiyatı" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://golgetesisat.com/og-image.jpg" },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://golgetesisat.com/" },
            { "@type": "ListItem", position: 2, name: "Fiyatlar", item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: PricesHub,
});

const URG = ["Hemen", "Bugün", "Planlı"] as const;
const SIDES = ["Avrupa Yakası", "Anadolu Yakası"] as const;

function PricesHub() {
  const [cur, setCur] = useState(0);
  const [urg, setUrg] = useState<(typeof URG)[number]>("Hemen");
  const [side, setSide] = useState<(typeof SIDES)[number]>("Avrupa Yakası");
  const [showMk, setShowMk] = useState(true);
  const [tableIn, setTableIn] = useState(false);
  useReveal();
  const s = SERVICES[cur];
  const m = MARKET_PRICES[s.slug] || null;
  const wa = `${BUSINESS.whatsappHref}?text=${encodeURIComponent(`Merhaba Gölge Tesisat, şu iş için net fiyat almak istiyorum: ${s.name} · ${urg} · ${side}. (Fotoğraf gönderebilirim.)`)}`;

  return (
    <GtPage current="/fiyatlar" top={{ left: "7/24 · İşten önce net fiyat", mid: "Ücretsiz keşif · Onayınız olmadan işlem yok · 2 yıl garanti" }}>
      <main>
        <section className="ph">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb"><ol><li><Link to="/">Ana Sayfa</Link></li><li aria-current="page">Fiyatlar</li></ol></nav>
            <div className="ph-g">
              <div>
                <span className="eyebrow">Tesisat fiyatları · İstanbul 2026</span>
                <h1>Fiyatı <em>işten önce öğrenin.</em></h1>
                <p className="lead">Her tesisat işi farklıdır; bu yüzden fiyat listesi ancak tahmin edebilir. Biz tersini yapıyoruz: sorununuza bakıyor, tek ve net bir fiyat veriyor, ancak siz "evet" deyince başlıyoruz.</p>
                <ul className="prom">
                  <li><i>✓</i><div>Ücretsiz keşif <span>— anlatın ya da fotoğraf gönderin</span></div></li>
                  <li><i>✓</i><div>İşten önce net fiyat <span>— onayınız olmadan işlem yok</span></div></li>
                  <li><i>✓</i><div>2 yıl yazılı garanti <span>— yaptığımız işe</span></div></li>
                </ul>
                <div className="cta">
                  <a className="btn btn-red" href="#hesapla">İşimi hesapla <ArrowRight className="ico" /></a>
                  <a className="btn btn-wa" href={`${BUSINESS.whatsappHref}?text=${encodeURIComponent("Merhaba, bir tesisat işi için net fiyat almak istiyorum.")}`} target="_blank" rel="noopener"><MessageCircle className="ico" />WhatsApp'tan fiyat al</a>
                </div>
              </div>
              <PriceTicket />
            </div>
          </div>
        </section>

        <section className="sec">
          <div className="wrap">
            <span className="eyebrow">Nasıl fiyatlandırıyoruz</span>
            <h2 className="h2">Dört adım. <em>Sürpriz yok.</em></h2>
            <p className="lead">Fiyat üçüncü adımda kesinleşir. Sonrasında onayınız olmadan hiçbir şey eklenmez.</p>
            <div className="steps">
              <div className="st rv"><h3>Sorunu anlatın</h3><p>Arayın, WhatsApp'tan fotoğraf veya video gönderin ya da online randevu alın. İlçenizi ve gördüğünüzü söyleyin.</p></div>
              <div className="st rv"><h3>Ücretsiz keşif</h3><p>Gizli sorunlarda — kaçak, tıkanık hat — usta önce nedeni tespit eder.</p></div>
              <div className="st lock rv"><h3>Net fiyat</h3><p>Tüm iş için tek fiyat. Karar sizin, hiçbir yükümlülük yok.</p></div>
              <div className="st rv"><h3>İş &amp; garanti</h3><p>Onaylanan iş, onaylanan fiyata yapılır; 2 yıl yazılı işçilik garantisi.</p></div>
            </div>
          </div>
        </section>

        <section className="sec mist" id="hesapla">
          <div className="wrap">
            <span className="eyebrow">Fiyat hesaplayıcı</span>
            <h2 className="h2">İşim <em>ne tutar?</em></h2>
            <p className="lead">Bir hizmet seçin: fiyatı neyin belirlediğini ve karşılaştırma için yayınlanmış piyasa aralığını görün.</p>
            <div className="est">
              <div className="in">
                <label className="l" id="l1">1 · Hizmet</label>
                <div className="svs" role="group" aria-labelledby="l1">
                  {SERVICES.map((x, i) => (
                    <button key={x.slug} type="button" aria-pressed={i === cur} onClick={() => setCur(i)}><span>{x.name}</span></button>
                  ))}
                </div>
                <label className="l" id="l2">2 · Ne zaman</label>
                <div className="seg2" role="group" aria-labelledby="l2">
                  {URG.map((u) => <button key={u} type="button" aria-pressed={urg === u} onClick={() => setUrg(u)}>{u === "Hemen" ? "🚨 Hemen" : u}</button>)}
                </div>
                <label className="l" id="l3">3 · İstanbul'un hangi yakası</label>
                <div className="seg2" role="group" aria-labelledby="l3">
                  {SIDES.map((x) => <button key={x} type="button" aria-pressed={side === x} onClick={() => setSide(x)}>{x}</button>)}
                </div>
              </div>
              <div className="out" aria-live="polite">
                <div><div className="o-k">FİYATIMIZ · {s.name.toLocaleUpperCase("tr")}</div><div className="o-v">Keşif sonrası net fiyat</div></div>
                <p className="o-n">Her {s.name.toLocaleLowerCase("tr")} işi farklıdır — ücretsiz keşiften sonra, işe başlamadan tek ve net bir fiyat veriyoruz.</p>
                <div><div className="o-k" style={{ marginBottom: 8 }}>FİYATI DEĞİŞTİREN</div><ul className="fx2">{s.priceFactors.slice(0, 4).map((f) => <li key={f}>{f}</li>)}</ul></div>
                <div className="mk">
                  <div className="o-k">PİYASA REFERANSI · BİZİM FİYATIMIZ DEĞİL</div>
                  <div className="rng">{m ? `${tl(m.min)} – ${tl(m.max)} (${m.scope})` : "Yayınlanmış aralık yok"}</div>
                  {m && <a href={m.src} target="_blank" rel="noopener nofollow">Kaynak: Armut.com ortalama aralığı ↗</a>}
                </div>
                <div className="cta">
                  <a className="btn btn-red" href={BUSINESS.phoneHref}><Phone className="ico" />Net fiyat al</a>
                  <a className="btn btn-wa" href={wa} target="_blank" rel="noopener"><MessageCircle className="ico" />WhatsApp</a>
                  <Link className="btn btn-ghost" to="/hizmet/$slug/fiyat" params={{ slug: s.slug }}>Detaylı fiyat sayfası →</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="tablo">
          <div className="wrap">
            <div className="pt-h">
              <div><span className="eyebrow">{SERVICES.length} hizmet</span><h2 className="h2">Fiyatlar &amp; <em>piyasa aralıkları</em></h2></div>
              <label className="tgl"><input type="checkbox" checked={showMk} onChange={(e) => setShowMk(e.target.checked)} />Piyasa referansını göster</label>
            </div>
            <InView onIn={() => setTableIn(true)}>
              <div className={"pt" + (tableIn ? " in" : "") + (showMk ? "" : " nomk")}>
                <div className="pr hd"><span>HİZMET</span><span>FİYATIMIZ</span><div><span>PİYASA ARALIĞI (LOG ÖLÇEK, ₺)</span><Ticks /></div><span /></div>
                {SERVICES.map((x, i) => {
                  const mm = MARKET_PRICES[x.slug] || null;
                  return (
                    <div className="pr" key={x.slug}>
                      <div className="n"><div>{x.name}<small>İŞTEN ÖNCE NET FİYAT</small></div></div>
                      <div className="ours q">Keşif sonrası</div>
                      {mm ? (
                        <div><MarketBar min={mm.min} max={mm.max} label={`${mm.scope} piyasa aralığı`} delay={i * 60} /><span className="sc2">{mm.scope.toLocaleUpperCase("tr")}</span></div>
                      ) : (
                        <div className="bar"><div className="ax" /><span className="na">— yayınlanmış aralık yok</span></div>
                      )}
                      <Link className="btn btn-line go" to="/hizmet/$slug/fiyat" params={{ slug: x.slug }}>Fiyat sayfası</Link>
                    </div>
                  );
                })}
              </div>
            </InView>
            <p className="src"><b>Piyasa aralıkları hakkında:</b> Armut.com pazar yerinin her iş türü için yayınladığı ortalama fiyat aralıklarıdır ({fmtChecked()} tarihinde kontrol edildi). Farklı hizmet verenlerin tekliflerini gösterir — <b>Gölge Tesisat fiyatları değildir</b>. <span className="smp">TÜRKİYE</span> işaretli aralıklar, İstanbul'a özel rakam yayınlanmadığı için ülke geneline aittir. Yayınlanmış aralık yoksa "—" gösteriyoruz. Fiyatlar sık değişir; her zaman net fiyatınızı sorun.</p>
          </div>
        </section>

        <section className="sec mist">
          <div className="wrap">
            <span className="eyebrow">Ne ödersiniz</span>
            <h2 className="h2">Her teklifte olanlar, <em>ve onu ne değiştirir</em></h2>
            <div className="inc">
              <div className="ib rv"><h3>Her zaman dahil</h3><ul>
                <li><i>✓</i><div><b>Ücretsiz keşif</b><span>Telefonda, WhatsApp'ta veya online randevuda.</span></div></li>
                <li><i>✓</i><div><b>İşten önce net fiyat</b><span>Onayınız olmadan işlem başlatılmaz.</span></div></li>
                <li><i>✓</i><div><b>2 yıl yazılı garanti</b><span>Yaptığımız işe.</span></div></li>
                <li><i>✓</i><div><b>39 ilçede aynı söz</b><span>Avrupa ve Anadolu Yakası, 7/24.</span></div></li>
              </ul></div>
              <div className="ib dk rv"><h3>Sadece onayınızla</h3><ul>
                <li><i>!</i><div><b>İkinci bir sorun çıkarsa</b><span>Durur, gösterir, ayrıca fiyatlandırırız. Karar sizin.</span></div></li>
                <li><i>!</i><div><b>İşi değiştirirseniz</b><span>Farklı batarya, ek petek, başka kombi modeli — önce yeniden fiyat.</span></div></li>
                <li><i>!</i><div><b>Duvar veya fayans açılacaksa</b><span>Önceden söyler, onarımın dahil olup olmadığını belirtiriz.</span></div></li>
              </ul></div>
            </div>
          </div>
        </section>

        <section className="sec gt-dark">
          <div className="wrap">
            <span className="eyebrow">Fiyatlar neden farklı</span>
            <h2 className="h2">Fiyatı <em>dört şey</em> belirler</h2>
            <div className="fac">
              <div className="fc rv"><b>01</b><h3>Nedeni bulmak</h3><p>Görünen bir damla hızlıdır. Fayans arkasındaki gizli kaçak veya hattın derinindeki tıkanıklık cihaz ve zaman ister.</p></div>
              <div className="fc rv"><b>02</b><h3>İşin büyüklüğü</h3><p>Petek sayısı, boru metresi, daire sayısı, armatür sayısı.</p></div>
              <div className="fc rv"><b>03</b><h3>Parça &amp; malzeme</h3><p>Parça gerekip gerekmediği, seçtiğiniz marka ve malzemeyi sizin temin edip etmediğiniz.</p></div>
              <div className="fc rv"><b>04</b><h3>Erişim</h3><p>Kat, bina, şaft veya bahçe erişimi; duvar ya da fayans açılması gerekip gerekmediği.</p></div>
            </div>
          </div>
        </section>

        <section className="sec" id="sss">
          <div className="wrap faq-g">
            <div>
              <span className="eyebrow">Sorular</span><h2 className="h2">Fiyat <em>SSS</em></h2>
              <div className="fside rv">
                <h3>Kesin rakam mı istiyorsunuz?</h3>
                <p>WhatsApp'tan fotoğraf veya kısa video gönderin. Net fiyat verelim ya da önce görmemiz gerekiyorsa dürüstçe söyleyelim.</p>
                <a className="btn btn-wa" href={`${BUSINESS.whatsappHref}?text=${encodeURIComponent("Merhaba, sorunun fotoğrafını gönderiyorum — ne kadar tutar?")}`} target="_blank" rel="noopener"><MessageCircle className="ico" />Fotoğraf gönder</a>
                <Link className="btn btn-red" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
              </div>
            </div>
            <GtFaq items={FAQS} />
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <h2>Tek fiyat. <em>Sizin onayınız. Sonra iş.</em></h2>
            <p>Ücretsiz keşif ve işten önce net fiyat — 39 ilçede, günün 24 saati.</p>
            <div className="cta">
              <a className="btn btn-red" href={BUSINESS.phoneHref}><Phone className="ico gt-ring" />{BUSINESS.phoneDisplay}</a>
              <Link className="btn btn-ghost" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
            </div>
            <p className="tiny">● ÜCRETSİZ KEŞİF · İŞTEN ÖNCE NET FİYAT · 2 YIL GARANTİ</p>
          </div>
        </section>
      </main>
    </GtPage>
  );
}

function InView({ children, onIn }: { children: React.ReactNode; onIn: () => void }) {
  return (
    <div ref={(el) => {
      if (!el || (el as HTMLDivElement & { _io?: boolean })._io) return;
      (el as HTMLDivElement & { _io?: boolean })._io = true;
      if (!("IntersectionObserver" in window)) { onIn(); return; }
      const o = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { onIn(); o.disconnect(); } }, { threshold: 0.1 });
      o.observe(el);
    }}>{children}</div>
  );
}
