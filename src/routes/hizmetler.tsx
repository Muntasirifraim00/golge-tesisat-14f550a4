import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GtChrome, GtMobileBar } from "@/components/gt/GtShell";
import { SiteFooter } from "@/components/SiteFooter";
import { DISTRICTS } from "@/data/districts";
import { SERVICES } from "@/data/services";
import { SVCS_MANIFOLD, SVCS_SPRITE } from "@/components/pages/svcs-sprite";

// All services hub — new design (20-All-Services), Turkish, built from the real service data so every
// card links to its /hizmet/<slug> page. Styles: .gt-svcs in src/styles/gt.css.
const PHONE_HREF = "tel:+905338960503";
const TITLE = "Tesisat Hizmetleri — Su Kaçağı, Kombi | Gölge Tesisat";
const DESC = "İstanbul'da 7/24 tesisat hizmetleri: su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği ve doğalgaz tesisatı. Ücretsiz keşif.";
const URL = "https://golgetesisat.com/hizmetler";

type CatKey = "leak" | "drain" | "heat" | "gas" | "fix";
const CATS: [CatKey | "all", string, string][] = [
  ["all", "Tüm hizmetler", "i-all"], ["leak", "Kaçak & boru", "s-leak"], ["drain", "Gider & kanal", "s-drain"],
  ["heat", "Isıtma & kombi", "s-boiler"], ["gas", "Doğalgaz", "s-gas"], ["fix", "Banyo & mutfak", "s-shower"],
];

// Per-service presentation: category, icon, popup service name and search words (what people type).
const META: Record<string, { c: CatKey; i: string; b: string; s: string[]; u?: "now" }> = {
  "acil-tesisatci": { c: "leak", i: "s-emg", b: "Diğer", u: "now", s: ["boru patladı", "su basıyor", "acil", "gece", "taşma", "tavandan su"] },
  "su-kacagi-tespiti": { c: "leak", i: "s-leak", b: "Su Kaçağı Tespiti", s: ["su faturası yüksek", "duvarda nem", "tavanda leke", "küf", "sayaç dönüyor"] },
  "tikaniklik-acma": { c: "drain", i: "s-drain", b: "Tıkanıklık Açma", s: ["tıkanık", "yavaş akıyor", "kötü koku", "gider", "lavabo"] },
  "kanalizasyon-acma": { c: "drain", i: "s-sewer", b: "Tıkanıklık Açma", s: ["kanalizasyon taştı", "lağım kokusu", "rögar", "ana hat"] },
  "tuvalet-tikanikligi-acma": { c: "drain", i: "s-toilet", b: "Tıkanıklık Açma", s: ["tuvalet tıkalı", "klozet taşıyor", "sifon çekmiyor"] },
  "mutfak-gider-acma": { c: "drain", i: "s-sink", b: "Tıkanıklık Açma", s: ["lavabo tıkalı", "mutfak gideri", "yavaş akıyor", "koku"] },
  "kanal-goruntuleme": { c: "drain", i: "s-cam", b: "Kamera ile İnceleme", s: ["sürekli tıkanma", "boru çatlak", "kamera", "tespit"] },
  "kombi-servisi": { c: "heat", i: "s-boiler", b: "Kombi Servisi", s: ["sıcak su yok", "kombi basıncı", "arıza kodu", "kombi çalışmıyor"] },
  "kombi-montaji": { c: "heat", i: "s-binst", b: "Kombi Servisi", s: ["yeni kombi", "kombi değişimi", "kombi kurulumu"] },
  "petek-temizligi": { c: "heat", i: "s-heat", b: "Petek Temizliği", s: ["petek ısınmıyor", "petek altı soğuk", "kalorifer", "gaz faturası"] },
  "dogalgaz-tesisati": { c: "gas", i: "s-gas", b: "Doğalgaz Tesisatı", s: ["gaz kokusu", "doğalgaz hattı", "ocak bağlantısı", "gaz sayacı"] },
  "dusakabin-vitrifiye-montaji": { c: "fix", i: "s-shower", b: "Diğer", s: ["duşakabin", "klozet montajı", "lavabo montajı", "banyo yenileme"] },
  "musluk-batarya-degisimi": { c: "fix", i: "s-tap", b: "Diğer", s: ["musluk damlatıyor", "batarya", "taharet musluğu", "armatür"] },
  "hidrofor-kurulumu": { c: "fix", i: "s-pump", b: "Diğer", s: ["su basıncı düşük", "hidrofor", "pompa sesi", "üst kata su çıkmıyor"] },
};

const PROBS: [string, string][] = [
  ["Yere su geliyor", "su basıyor"], ["Tavanda leke", "tavanda leke"], ["Su faturası yüksek", "su faturası yüksek"], ["Tuvalet tıkalı", "tuvalet tıkalı"],
  ["Lavabo yavaş akıyor", "yavaş akıyor"], ["Petek ısınmıyor", "petek ısınmıyor"], ["Sıcak su yok", "sıcak su yok"], ["Su basıncı düşük", "su basıncı düşük"], ["Gaz kokusu", "gaz kokusu"],
];

const FAQ: [string, string][] = [
  ["7/24 acil servis veriyor musunuz?", "Evet. Acil müdahale ekiplerimiz İstanbul’un iki yakasında 7/24 hazırdır; ortalama varış süremiz yaklaşık 30 dakikadır."],
  ["Keşif ücretli mi?", "Keşif ücretsiz ve taahhütsüzdür. İşe başlamadan önce KDV dahil net fiyatı görür, onaylarsınız."],
  ["İşçilik garantisi var mı?", "Evet. Yaptığımız işler yazılı işçilik garantisiyle teslim edilir; kapsamı iş türüne göre keşifte açıkça belirtilir."],
  ["Ödeme seçenekleri neler?", "Net ve şeffaf fiyatla nakit veya kartla ödeyebilirsiniz. Her hizmet için fatura düzenlenir."],
  ["Hangi hizmete ihtiyacım olduğunu bilmiyorum. Ne seçmeliyim?", "Size en yakın olanı seçin ya da bu sayfadaki “Seçmeme yardım et” bölümünü kullanın. WhatsApp’tan fotoğraf da gönderebilirsiniz — usta işe başlamadan doğru hizmeti teyit eder."],
  ["Şirketler ve site yönetimleriyle çalışıyor musunuz?", "Evet. Konut, dükkân, ofis ve plazalarda çalışıyoruz; her iş için fatura düzenler, istenirse fotoğraflı iş raporu veririz."],
];

export const Route = createFileRoute("/hizmetler")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "tesisat hizmetleri, su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği, doğalgaz tesisatı" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: "https://golgetesisat.com/og-image.jpg" },
      { property: "og:locale", content: "tr_TR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: "https://golgetesisat.com/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://golgetesisat.com/" }, { "@type": "ListItem", position: 2, name: "Hizmetler", item: URL }] }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `https://golgetesisat.com/hizmet/${s.slug}` })) }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", inLanguage: "tr", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }) },
    ],
  }),
  component: ServiceHub,
});

const norm = (s: string) => s.toLocaleLowerCase("tr").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ı/g, "i");
const firstSentence = (t: string) => { const m = t.match(/^.*?[.!?](\s|$)/); return (m ? m[0] : t).trim(); };

// Ordered like the design: emergency first, then by category.
const ORDER = ["acil-tesisatci", "su-kacagi-tespiti", "tikaniklik-acma", "kanalizasyon-acma", "tuvalet-tikanikligi-acma", "mutfak-gider-acma", "kanal-goruntuleme", "kombi-servisi", "kombi-montaji", "petek-temizligi", "dogalgaz-tesisati", "dusakabin-vitrifiye-montaji", "musluk-batarya-degisimi", "hidrofor-kurulumu"];
const LIST = ORDER.map((slug) => SERVICES.find((s) => s.slug === slug)).filter((s): s is (typeof SERVICES)[number] => !!s)
  .concat(SERVICES.filter((s) => !ORDER.includes(s.slug)))
  .map((s) => ({ s, m: META[s.slug] ?? { c: "fix" as CatKey, i: "s-pipe", b: "Diğer", s: [] } }));

const Q1: [string, string, string][] = [["Olmaması gereken yerde su var", "s-leak", "w"], ["Bir yer tıkalı", "s-drain", "b"], ["Isıtma veya sıcak su", "s-boiler", "h"], ["Doğalgaz", "s-gas", "g"], ["Montaj veya değişim", "s-tap", "i"], ["Acil bir durum", "s-emg", "e"]];
const Q2: Record<string, [string, string][]> = {
  w: [["Görünür: damlıyor veya patladı", "acil-tesisatci"], ["Gizli: leke, nem, yüksek fatura", "su-kacagi-tespiti"]],
  b: [["Tuvalet", "tuvalet-tikanikligi-acma"], ["Mutfak veya banyo lavabosu", "mutfak-gider-acma"], ["Bina / ana hat", "kanalizasyon-acma"], ["Sürekli tekrarlıyor", "kanal-goruntuleme"]],
  h: [["Kombi arızası veya sıcak su yok", "kombi-servisi"], ["Petekler soğuk veya dengesiz", "petek-temizligi"], ["Yeni kombi gerekiyor", "kombi-montaji"]],
  g: [["Şu anda gaz kokusu var", "GAS"], ["Yeni hat veya cihaz bağlantısı", "dogalgaz-tesisati"]],
  i: [["Musluk ve batarya", "musluk-batarya-degisimi"], ["Duşakabin, klozet, lavabo", "dusakabin-vitrifiye-montaji"], ["Su pompası / düşük basınç", "hidrofor-kurulumu"]],
};

function Svg({ id }: { id: string }) {
  return <svg><use href={`#${id}`} /></svg>;
}

function Chooser() {
  const [k, setK] = useState<string | null>(null);
  const [res, setRes] = useState<string | null>(null);
  const reset = () => { setK(null); setRes(null); };
  if (res === "GAS") {
    return (
      <div className="qres on">
        <p className="qn">ÖNCE GÜVENLİK</p>
        <h3>Binayı terk edin ve 187’yi arayın</h3>
        <p style={{ marginTop: 10, color: "#5A4200", background: "#FFF6DA", padding: 14, borderRadius: 14, fontWeight: 700 }}>Düğmelere ve aleve dokunmayın. Çıkarken pencereleri açın ve önce doğalgaz acil hattı 187’yi arayın. Güvenli olduğunda hattı biz onarırız.</p>
        <div className="acts"><a className="btn btn-red" href="tel:187">187’yi ara</a><a className="btn btn-ink" href={PHONE_HREF}>Sonra bizi arayın</a></div>
        <button type="button" className="qback" onClick={reset}>← Baştan başla</button>
      </div>
    );
  }
  if (res) {
    const it = LIST.find((x) => x.s.slug === res);
    if (!it) return null;
    return (
      <div className="qres on">
        <p className="qn">ÖNERİMİZ</p>
        <div className="pick"><span className="ic"><Svg id={it.m.i} /></span><div><b>{it.s.name}</b><span>{firstSentence(it.s.tagline)}</span></div></div>
        <div className="acts">
          <a className="btn btn-red" href="/randevu" data-book data-service={it.m.b} {...(it.m.u ? { "data-urgency": "now" } : {})}><svg className="ico"><use href="#i-cal" /></svg>Randevu al</a>
          <Link className="btn btn-ink" to="/hizmet/$slug" params={{ slug: it.s.slug }}>Detayları gör</Link>
        </div>
        <button type="button" className="qback" onClick={reset}>← Baştan başla</button>
      </div>
    );
  }
  if (k) {
    return (
      <>
        <div className="qprog"><i className="on" /><i className="on" /></div>
        <p className="qn" style={{ marginTop: 14 }}>SORU 2 / 2</p>
        <h3>Hangisi daha yakın?</h3>
        <div className="qopts">{Q2[k].map(([t, r]) => <button key={r} type="button" className="qo" onClick={() => setRes(r)}><Svg id="i-r" />{t}</button>)}</div>
        <button type="button" className="qback" onClick={reset}>← Geri</button>
      </>
    );
  }
  return (
    <>
      <div className="qprog"><i className="on" /><i /></div>
      <p className="qn" style={{ marginTop: 14 }}>SORU 1 / 2</p>
      <h3>Ne oluyor?</h3>
      <div className="qopts">{Q1.map(([t, ic, key]) => <button key={key} type="button" className="qo" onClick={() => (key === "e" ? setRes("acil-tesisatci") : setK(key))}><Svg id={ic} />{t}</button>)}</div>
    </>
  );
}

function ServiceHub() {
  const [cat, setCat] = useState<CatKey | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(0);
  const scored = useMemo(() => {
    const words = norm(q).split(/\s+/).filter((w) => w.length > 2);
    return LIST.map((it) => {
      const hay = norm(`${it.s.name} ${it.s.tagline} ${it.s.intro} ${it.m.s.join(" ")} ${it.s.includes.join(" ")}`);
      let sc = 0;
      words.forEach((w) => { if (hay.includes(w)) sc++; if (it.m.s.some((x) => norm(x).includes(w))) sc += 2; });
      return { ...it, sc };
    });
  }, [q]);
  const hasQ = norm(q).split(/\s+/).some((w) => w.length > 2);
  const best = Math.max(0, ...scored.map((x) => x.sc));
  const visible = scored.filter((x) => (cat === "all" || x.m.c === cat) && (!hasQ || x.sc > 0));
  const ordered = hasQ ? [...visible].sort((a, b) => b.sc - a.sc) : visible;
  const jump = () => { const t = document.getElementById("grid"); if (t) scrollTo({ top: t.getBoundingClientRect().top + scrollY - (innerWidth <= 640 ? 120 : 140), behavior: "smooth" }); };
  const total = LIST.length;

  return (
    <div className="min-h-screen bg-white">
      <GtChrome current="/hizmetler" />
      <div className="gt-svcs" lang="tr">
        <div dangerouslySetInnerHTML={{ __html: SVCS_SPRITE }} />
        <main>
          <section className="hero">
            <div className="wrap">
              <nav className="crumbs" aria-label="Breadcrumb"><ol><li><Link to="/">Ana Sayfa</Link></li><li aria-current="page">Hizmetler</li></ol></nav>
              <div className="hero-g">
                <div>
                  <span className="eyebrow" style={{ color: "#FF6B6B" }}>Tüm Hizmetler</span>
                  <h1 style={{ marginTop: 14 }}><span className="cnt num">{total}</span> tesisat hizmeti. <em>Arayacağınız tek ekip.</em></h1>
                  <p className="lead">Tüm tesisat ihtiyaçlarınız tek çözümde — <b>su kaçağı ve tıkanıklıktan</b> <b>kombi, petek ve doğalgaza</b> kadar. Deneyimli ustalar, doğru ekipman ve kalıcı onarım; İstanbul genelinde 7/24.</p>
                  <div className="finder">
                    <label className="sbox" htmlFor="q">
                      <Svg id="i-s" />
                      <input id="q" type="search" placeholder="Sorun ne? ör. tuvalet tıkalı, petek ısınmıyor" autoComplete="off" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); jump(); } }} />
                      <button type="button" className={`clr${q ? " on" : ""}`} aria-label="Temizle" onClick={() => setQ("")}><Svg id="i-x" /></button>
                      <a className="btn btn-red" href="#grid" onClick={(e) => { e.preventDefault(); jump(); }}><span>Hizmeti bul</span><Svg id="i-r" /></a>
                    </label>
                    <div className="probs" aria-label="Sık görülen sorunlar">
                      {PROBS.map(([t, v]) => (
                        <button key={v} type="button" className={`pb${v === "gaz kokusu" ? " gas" : ""}`} aria-pressed={q === v} onClick={() => { const on = q !== v; setQ(on ? v : ""); setCat("all"); if (on) setTimeout(jump, 150); }}>{t}</button>
                      ))}
                    </div>
                    <p className={`gasw${/gaz/i.test(q) ? " on" : ""}`}>⚠️ <b>Gaz kokusu mu var?</b> Düğmelere dokunmayın, pencereleri açın, binayı terk edin ve önce doğalgaz acil hattı <a href="tel:187">187</a>’yi arayın. Sonra onarım için bizi arayın.</p>
                  </div>
                </div>
                <div className="hstats rv">
                  <div className="hs red"><b className="num">~30 dk</b><span>Ortalama varış, iki yaka</span></div>
                  <div className="hs"><b className="num">7/24</b><span>Hafta sonu ve tatiller dahil</span></div>
                  <div className="hs"><b className="num">0 ₺</b><span>Keşif ücreti · taahhüt yok</span></div>
                  <div className="hs"><b className="num">39</b><span>İstanbul’da ilçe</span></div>
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: SVCS_MANIFOLD }} />
            </div>
          </section>

          <div className="rail" id="rail">
            <div className="wrap" role="tablist" aria-label="Hizmet kategorileri">
              {CATS.map(([k, label, ic]) => (
                <button key={k} type="button" className="cat" role="tab" aria-selected={cat === k} onClick={() => setCat(k)}>
                  <Svg id={ic} />{label}<small>{k === "all" ? total : LIST.filter((x) => x.m.c === k).length}</small>
                </button>
              ))}
              <span className="res num">{ordered.length} / {total} hizmet</span>
            </div>
          </div>

          <section className="grid-sec" id="grid" aria-label="Hizmet listesi">
            <div className="wrap">
              <div className="grid">
                {ordered.map(({ s, m, sc }, i) => {
                  const emg = s.slug === "acil-tesisatci";
                  const words = norm(q).split(/\s+/).filter((w) => w.length > 2);
                  const head = (
                    <div className="sc-top">
                      <span className="ic"><Svg id={m.i} /></span>
                      <div className="badges">
                        <span className="no">{String(LIST.findIndex((x) => x.s.slug === s.slug) + 1).padStart(2, "0")} / {total}</span>
                        {emg ? <span className="eta"><i />7/24 HEMEN</span> : <span className="eta"><i />~{s.responseMin} DK</span>}
                      </div>
                    </div>
                  );
                  const body = (
                    <div className="sc-b">
                      <h3><Link to="/hizmet/$slug" params={{ slug: s.slug }} style={{ textDecoration: "none", color: "inherit" }}>{s.name}</Link></h3>
                      <span className="cat-l">{CATS.find((c) => c[0] === m.c)?.[1].toLocaleUpperCase("tr")}</span>
                      <p className="d">{s.tagline}. {firstSentence(s.intro)}</p>
                      <ul>{s.includes.slice(0, 3).map((x) => <li key={x}><Svg id="i-ck" />{x}</li>)}</ul>
                      <div className="sym">{m.s.map((x) => <span key={x} className={words.length && words.some((w) => norm(x).includes(w)) ? "hit" : ""}>{x}</span>)}</div>
                    </div>
                  );
                  const foot = (
                    <div className="sc-f">
                      <Link className="btn more" to="/hizmet/$slug" params={{ slug: s.slug }}>{emg ? "Nasıl çalışıyoruz" : "Hizmeti incele"}</Link>
                      <a className="btn btn-red" href="/randevu" data-book data-service={m.b} {...(m.u ? { "data-urgency": m.u } : {})}>{emg ? "Hemen ekip iste" : "Randevu al"}</a>
                    </div>
                  );
                  const cls = `sc rv in${hasQ && sc === best && sc > 0 ? " match" : ""}`;
                  if (emg) {
                    return (
                      <article key={s.slug} className={`${cls} emg`} id={`svc-${s.slug}`} data-i={i}>
                        <span className="fill" />{head}
                        <div className="emg-in">{body}<div style={{ padding: "16px 22px 0" }}><div className="emg-num"><small>ACİL HAT · 7/24</small><b>0533 896 05 03</b><a className="btn btn-red" href={PHONE_HREF} style={{ width: "100%", marginTop: 10 }}><svg className="ico ring"><use href="#i-phone" /></svg>Hemen ara</a></div></div></div>
                        {foot}
                      </article>
                    );
                  }
                  return <article key={s.slug} className={cls} id={`svc-${s.slug}`}><span className="fill" />{head}{body}{foot}</article>;
                })}
                <div className={`empty${ordered.length === 0 ? " on" : ""}`}>
                  <h3>Tam eşleşme yok</h3>
                  <p>Sorunu anlatın, hangi hizmete ihtiyacınız olduğunu söyleyelim — 7/24 gerçek bir kişi yanıt verir.</p>
                  <a className="btn btn-wa" href={`https://wa.me/905338960503?text=${encodeURIComponent("Merhaba Gölge Tesisat, sorunum: " + q)}`} target="_blank" rel="noopener noreferrer"><svg className="ico"><use href="#i-wa" /></svg>WhatsApp’tan sorun</a>
                </div>
              </div>
            </div>
          </section>

          <section className="inc sec">
            <div className="wrap">
              <span className="eyebrow">Her hizmette, her seferinde</span>
              <h2 className="h2">Hangi hizmeti alırsanız alın, <em>bunlar dahil</em></h2>
              <div className="inc-g">
                <div className="ic5 rv"><span className="k">24<small>/7</small></span><h3>Gece &amp; gündüz</h3><p>Hafta sonu ve resmi tatiller dahil.</p></div>
                <div className="ic5 rv"><span className="k">~30<small>DK</small></span><h3>Hızlı varış</h3><p>İstanbul’un iki yakasında ortalama müdahale süresi.</p></div>
                <div className="ic5 rv"><span className="k">0<small>₺</small></span><h3>Ücretsiz keşif</h3><p>Taahhüt yok. Önce fiyatı siz onaylarsınız.</p></div>
                <div className="ic5 rv"><span className="k">KDV<small>DAHİL</small></span><h3>Net fiyat</h3><p>Şeffaf, KDV dahil. Nakit veya kart, her zaman faturalı.</p></div>
                <div className="ic5 rv"><span className="k">✓<small>YAZILI</small></span><h3>Garanti</h3><p>İşçilik yazılı garantiyle teslim edilir.</p></div>
              </div>
            </div>
          </section>

          <section className="sec" id="choose">
            <div className="wrap choose-g">
              <div>
                <span className="eyebrow">Ne gerektiğinden emin değil misiniz?</span>
                <h2 className="h2">İki soruya cevap verin. <em>Sizi yönlendirelim.</em></h2>
                <p className="lead">Hizmetin adını bilmeniz gerekmez. Sorunun nerede olduğunu ve neye benzediğini söyleyin — sizi doğru ekiple eşleştirelim. Ya da arayın: 7/24 gerçek bir kişi cevap verir.</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
                  <a className="btn btn-ink" href={PHONE_HREF}><svg className="ico"><use href="#i-phone" /></svg>0533 896 05 03</a>
                  <a className="btn btn-wa" href={`https://wa.me/905338960503?text=${encodeURIComponent("Merhaba Gölge Tesisat, hangi hizmete ihtiyacım olduğundan emin değilim.")}`} target="_blank" rel="noopener noreferrer"><svg className="ico"><use href="#i-wa" /></svg>WhatsApp’tan anlatın</a>
                </div>
              </div>
              <div className="qz rv" aria-live="polite"><Chooser /></div>
            </div>
          </section>

          <section className="sec" style={{ paddingTop: 0 }} id="areas">
            <div className="wrap seo-g">
              <div className="seo rv">
                <span className="eyebrow">Hizmetlerimiz hakkında</span>
                <h2 className="h2">İstanbul’da tesisat, <em>doğru şekilde</em></h2>
                <p style={{ marginTop: 18 }}>Gölge Tesisat, İstanbul’un Avrupa ve Anadolu yakasında evlere, dükkânlara, ofislere ve plazalara hizmet veren 7/24 tesisat ve ısıtma ekibidir. Kaçak, gider, kombi ve doğalgaz için ayrı ayrı firma aramak yerine tek ekip, tek telefon numarası ve tek garanti.</p>
                <p>Her iş aynı şekilde başlar: dinleriz, doğru ekipmanla — termal kamera, akustik dinleme cihazı, kanal kamerası ve basınç testi — teşhis koyarız ve işe başlamadan önce ne bulduğumuzu ve maliyetini söyleriz. Fiyat net ve KDV dahildir; siz onaylamadan hiçbir iş başlamaz.</p>
                <h3>Acil ya da planlı — aynı standart</h3>
                <p>Gece yarısı patlayan bir boru da haftalar önceden planlanan yıllık kombi bakımı da aynı disiplinle yapılır: önce zemin koruması, ölçülü müdahale, orijinal parça ve temiz teslim.</p>
                <h3>Şirketler ve site yönetimleri için</h3>
                <p>Kurumsal düzende çalışırız — her iş faturalıdır, istenirse fotoğraflı iş raporu veririz.</p>
              </div>
              <aside className="areas rv">
                <h3>39 ilçenin tamamında</h3>
                <p>Boğaz’ın iki yakasında ekiplerimiz görevde.</p>
                <div className="split"><div><b className="num">~28 dk</b><span>Avrupa Yakası ortalaması</span></div><div><b className="num">~32 dk</b><span>Anadolu Yakası ortalaması</span></div></div>
                <div className="dl">{[...DISTRICTS].sort((a, b) => a.name.localeCompare(b.name, "tr")).map((d) => <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} title={`${d.name} tesisatçı`}>{d.name}</Link>)}</div>
              </aside>
            </div>
          </section>

          <section className="faq sec" id="faq">
            <div className="wrap faq-g">
              <div><span className="eyebrow">Sorular</span><h2 className="h2">Randevudan <em>önce</em></h2><p className="lead">En sık duyduğumuz sorular, açık cevaplarla.</p></div>
              <div>
                {FAQ.map(([fq, fa], i) => (
                  <div key={fq} className={`qa${open === i ? " open" : ""}`}>
                    <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>{fq}<span className="pl"><Svg id="i-plus" /></span></button>
                    <div className="ans"><div><p>{fa}</p></div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="final">
            <div className="wrap">
              <h2>Sorunu anlatın.<br />Çözümü getirelim.</h2>
              <p>Herhangi bir hizmeti bir dakikada ayırtın ya da arayın — İstanbul genelinde 7/24 görevdeyiz.</p>
              <div className="cta">
                <a className="btn bw" href="/randevu" data-book><svg className="ico"><use href="#i-cal" /></svg>Randevu al</a>
                <a className="btn btn-ghost" href={PHONE_HREF}><svg className="ico"><use href="#i-phone" /></svg>0533 896 05 03</a>
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="gt gt-contents"><GtMobileBar /></div>
      <SiteFooter />
    </div>
  );
}
