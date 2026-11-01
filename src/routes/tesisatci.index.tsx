import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Droplet, Droplets, Flame, Gauge, MessageCircle, Phone, ScanLine, Search, ShowerHead, Thermometer, Waves, Wind } from "lucide-react";
import { GtFaq, GtPage, useReveal } from "@/components/gt/GtShell";
import { BUSINESS } from "@/data/business";
import { DISTRICTS, type District } from "@/data/districts";
import { SERVICES, type ServiceIcon } from "@/data/services";

const ICONS: Record<ServiceIcon, React.ComponentType<{ size?: number; className?: string }>> = {
  leak: Droplet, clog: Waves, combi: Flame, radiator: Thermometer, gas: Wind,
  camera: ScanLine, shower: ShowerHead, faucet: Droplets, pump: Gauge,
};

const TITLE = "En Yakın Su Tesisatçısı İstanbul | 7/24 Gölge Tesisat";
const DESC = "İstanbul'da en yakın su tesisatçısı mı arıyorsunuz? 7/24 acil su kaçağı, tıkanıklık açma ve kombi servisi — bölgenizi seçin, ortalama 30 dakikada kapınızda.";
const URL = "https://golgetesisat.com/tesisatci";

const FAQS = [
  {
    q: "En yakın su tesisatçısına nasıl ulaşırım?",
    a: "İstanbul'un Anadolu ve Avrupa yakasındaki tüm ilçelerde sahada ekibimiz var. Bölgenizi yukarıdaki listeden seçin ya da doğrudan arayın; size en yakın ustayı anında yönlendiriyoruz. Konum paylaşımıyla adresinizi birebir tespit edip ortalama 30 dakikada kapınızda oluyoruz.",
  },
  {
    q: "Su tesisatçısı ortalama ne kadar sürede gelir?",
    a: "İstanbul içi yoğun bölgelerde ortalama varış süremiz 30 dakikadır. Ekipler ilçe bazlı konumlandığından, en yakın usta trafik durumuna göre çoğu zaman daha kısa sürede ulaşır. Su kaçağı gibi acil durumlarda önceliklendirme yapıp en hızlı ekibi yönlendiriyoruz.",
  },
  {
    q: "Gece, hafta sonu veya resmi tatilde en yakın tesisatçı bulabilir miyim?",
    a: "Evet. Gölge Tesisat 7 gün 24 saat kesintisiz hizmet verir; gece yarısı, hafta sonu ve resmi tatiller dahil her an arayabilirsiniz. Patlayan boru, tavandan su akması veya tıkanan gider gibi acil durumlarda nöbetçi ekibimiz aynı saatte yola çıkar.",
  },
  {
    q: "Tesisatçı gelmeden önce ne yapmalıyım?",
    a: "Su kaçağı varsa daire veya bina ana su vanasını kapatın, elektrikli cihazların ıslanmasını önleyin. Tıkanıklıkta gidere müdahale etmeyin; kimyasal dökmek boruya zarar verebilir. Sorunu telefonda kısaca tarif edin, ekibimiz doğru ekipmanla gelsin.",
  },
  {
    q: "En yakın su tesisatçısı ücreti ne kadar?",
    a: "Ücret; arızanın türüne, müdahale süresine ve kullanılan malzemeye göre değişir. Keşif ve fiyat bilgisini işlem öncesinde net olarak paylaşıyor, onayınız olmadan işleme başlamıyoruz. Sürpriz maliyet çıkarmadan, şeffaf fiyatlandırma uyguluyoruz.",
  },
];

export const Route = createFileRoute("/tesisatci/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "istanbul tesisatçı, su tesisatçısı, acil tesisatçı, istanbul su kaçağı tespiti, istanbul kombi servisi" },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://golgetesisat.com/" },
            { "@type": "ListItem", position: 2, name: "Tesisatçı", item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Su Tesisatçısı",
          provider: { "@type": "LocalBusiness", name: "Gölge Tesisat", telephone: "+905338960503", url: "https://golgetesisat.com/" },
          areaServed: { "@type": "City", name: "İstanbul" },
          description: DESC,
          url: URL,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: DistrictHub,
});

// ---------- Hex map geometry (schematic, not exact borders) ----------
// Approximate district centres used only to place hexagons on the schematic map.
const MAP_GEO: Record<string, [number, number]> = {
  adalar: [40.87, 29.09], arnavutkoy: [41.18, 28.74], atasehir: [40.99, 29.12], avcilar: [40.98, 28.72],
  bagcilar: [41.04, 28.84], bahcelievler: [41.0, 28.86], bakirkoy: [40.98, 28.87], basaksehir: [41.09, 28.8],
  bayrampasa: [41.04, 28.91], besiktas: [41.06, 29.01], beykoz: [41.13, 29.1], beylikduzu: [40.99, 28.64],
  beyoglu: [41.03, 28.97], buyukcekmece: [41.02, 28.58], catalca: [41.14, 28.46], cekmekoy: [41.04, 29.18],
  esenler: [41.04, 28.88], esenyurt: [41.03, 28.67], eyupsultan: [41.15, 28.9], fatih: [41.01, 28.95],
  gaziosmanpasa: [41.07, 28.91], gungoren: [41.02, 28.88], kadikoy: [40.99, 29.03], kagithane: [41.08, 28.97],
  kartal: [40.89, 29.19], kucukcekmece: [41.0, 28.78], maltepe: [40.93, 29.13], pendik: [40.88, 29.25],
  sancaktepe: [41.0, 29.23], sariyer: [41.17, 29.05], silivri: [41.07, 28.25], sultanbeyli: [40.96, 29.27],
  sultangazi: [41.11, 28.87], sile: [41.17, 29.61], sisli: [41.06, 28.99], tuzla: [40.82, 29.3],
  umraniye: [41.02, 29.12], uskudar: [41.02, 29.02], zeytinburnu: [40.99, 28.9],
};
const VW = 760, VH = 560, R = 21, HW = Math.sqrt(3) * R, VS = 1.5 * R;
const EU = "#D50A0A", AS = "#2D7DD2";

type Hex = District & { eu: boolean; x: number; y: number };

function proj(lat: number, lon: number): [number, number] {
  let dx = lon - 29.0;
  dx = Math.sign(dx) * Math.pow(Math.abs(dx), 0.62);
  return [VW / 2 + dx * 560 - 10, (41.22 - lat) * 1120 + 30];
}
const BOS: [number, number][] = [[30, 393], [150, 398], [230, 392], [300, 384], [350, 380], [420, 383], [520, 388]];
function bosX(y: number) {
  for (let i = 1; i < BOS.length; i++) if (y <= BOS[i][0]) { const k = (y - BOS[i - 1][0]) / (BOS[i][0] - BOS[i - 1][0]); return BOS[i - 1][1] + (BOS[i][1] - BOS[i - 1][1]) * k; }
  return BOS[BOS.length - 1][1];
}
const cellXY = (c: number, r: number): [number, number] => [c * HW + (r % 2 ? HW / 2 : 0) + 20, r * VS + 30];
function layoutHexes(): Hex[] {
  const used = new Set<string>();
  const list = DISTRICTS.filter((d) => MAP_GEO[d.slug]).map((d) => ({ ...d, eu: d.side === "Avrupa Yakası", x: 0, y: 0 }));
  const p0 = (d: Hex) => proj(...MAP_GEO[d.slug]);
  [...list].sort((a, b) => Math.abs(p0(a)[0] - VW / 2) - Math.abs(p0(b)[0] - VW / 2)).forEach((d) => {
    const p = p0(d);
    const r0 = Math.round((p[1] - 30) / VS), c0 = Math.round((p[0] - 20 - (r0 % 2 ? HW / 2 : 0)) / HW);
    let best: [number, number, number, number] | null = null, bd = 1e9;
    for (let dr = -5; dr <= 5; dr++) for (let dc = -6; dc <= 6; dc++) {
      const c = c0 + dc, r = r0 + dr;
      if (r < 0 || c < 0 || used.has(c + "," + r)) continue;
      const [x, y] = cellXY(c, r);
      if (x > VW - 24 || y > VH - 60) continue;
      if ((x < bosX(y)) !== d.eu) continue;
      const dist = Math.hypot(x - p[0], y - p[1]);
      if (dist < bd) { bd = dist; best = [c, r, x, y]; }
    }
    if (best) { used.add(best[0] + "," + best[1]); d.x = best[2]; d.y = best[3]; }
  });
  return list;
}
function hexPath(x: number, y: number, r: number) {
  let s = "";
  for (let i = 0; i < 6; i++) { const a = (Math.PI / 180) * (60 * i - 30); s += (i ? "L" : "M") + (x + r * Math.cos(a)).toFixed(1) + " " + (y + r * Math.sin(a)).toFixed(1); }
  return s + "Z";
}
const shortName = (n: string) => (n.length > 7 ? n.slice(0, 5) + "." : n);
const norm = (s: string) => s.toLocaleLowerCase("tr").replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c").replace(/i̇/g, "i");
const avg = (a: number[]) => Math.round(a.reduce((x, y) => x + y, 0) / Math.max(1, a.length));

function DistrictHub() {
  const HEX = useMemo(layoutHexes, []);
  const HQ = HEX.find((d) => d.slug === "kadikoy")!;
  const euList = HEX.filter((d) => d.eu), asList = HEX.filter((d) => !d.eu);
  const euAvg = avg(euList.map((d) => d.responseMin)), asAvg = avg(asList.map((d) => d.responseMin));
  const [side, setSide] = useState<"all" | "eu" | "as">("all");
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState<string | null>("kadikoy");
  const [sugOpen, setSugOpen] = useState(false);
  const [si, setSi] = useState(-1);
  const [popped, setPopped] = useState(false);
  const detRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  useReveal();
  useEffect(() => { const t = setTimeout(() => setPopped(true), 60); return () => clearTimeout(t); }, []);

  const qn = norm(query.trim());
  const match = (d: Hex) => (side === "all" || (side === "eu") === d.eu) && (!qn || norm(d.name).includes(qn));
  const dirList = HEX.filter(match).sort((a, b) => a.name.localeCompare(b.name, "tr"));
  const sugg = qn ? HEX.filter((d) => norm(d.name).includes(qn)).slice(0, 6) : [];
  const cur = HEX.find((d) => d.slug === sel) || null;

  const pick = (slug: string, scroll: boolean) => {
    setSel(slug); setSugOpen(false);
    if (scroll && typeof window !== "undefined" && innerWidth < 980) setTimeout(() => mapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };
  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSi((v) => Math.min(sugg.length - 1, v + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSi((v) => Math.max(0, v - 1)); }
    else if (e.key === "Enter") { e.preventDefault(); if (sugg.length) { const d = sugg[Math.max(0, si)]; setQuery(d.name); pick(d.slug, true); setQuery(""); } }
    else if (e.key === "Escape") setSugOpen(false);
  };
  useEffect(() => {
    const f = (e: MouseEvent) => { if (!(e.target as HTMLElement).closest?.(".search")) setSugOpen(false); };
    document.addEventListener("click", f);
    return () => document.removeEventListener("click", f);
  }, []);

  let bos = "M" + bosX(30).toFixed(0) + " 0";
  for (let y = 30; y <= 400; y += 10) bos += " L" + bosX(y).toFixed(1) + " " + y;

  return (
    <GtPage current="/tesisatci" top={{ left: "7/24 · Boğaz'ın iki yakasında ekip", mid: <>Avrupa Yakası ort. <b>~{euAvg} dk</b> · Anadolu Yakası ort. <b>~{asAvg} dk</b></> }}>
      <main>
        <section className="hero" id="harita">
          <div className="wrap">
            <nav className="crumbs" aria-label="Breadcrumb"><ol><li><Link to="/">Ana Sayfa</Link></li><li aria-current="page">Tesisatçı</li></ol></nav>
            <div className="rg-g">
              <div>
                <span className="tag"><b>{HEX.length}</b>İstanbul'un tüm ilçeleri</span>
                <h1>İstanbul'da en yakın <em>su tesisatçısı.</em><small>{euList.length} Avrupa Yakası · {asList.length} Anadolu Yakası · tek ekip, 7/24</small></h1>
                <p className="lead">Silivri'den Şile'ye, Sarıyer'den Tuzla'ya — Gölge Tesisat Boğaz'ın iki yakasında <b>{HEX.length} ilçenin tamamında</b> gece gündüz hizmet veriyor. Haritadan veya aramadan <b>ilçenizi bulun</b>; ortalama varış süresini ve size en yakın ekibi görün.</p>
                <div className="search">
                  <Search aria-hidden="true" />
                  <input type="search" value={query} placeholder="İlçenizi arayın — örn. Beşiktaş, Kadıköy…" autoComplete="off" aria-label="İlçe ara" aria-controls="sugg"
                    onChange={(e) => { setQuery(e.target.value); setSugOpen(true); setSi(-1); }} onKeyDown={onKey} onFocus={() => setSugOpen(true)} />
                  {sugOpen && sugg.length > 0 && (
                    <div className="sugg" id="sugg" role="listbox">
                      {sugg.map((d, k) => (
                        <button key={d.slug} type="button" role="option" aria-selected={k === si} className={k === si ? "on" : ""} onClick={() => { pick(d.slug, true); setQuery(""); }}>
                          {d.name}<small>{d.eu ? "AVRUPA" : "ANADOLU"} · ~{d.responseMin} DK</small>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="sides" role="group" aria-label="Yakaya göre filtrele">
                  <button type="button" aria-pressed={side === "all"} onClick={() => setSide("all")}><i style={{ background: `linear-gradient(90deg,${EU} 50%,${AS} 50%)` }} />Tümü · {HEX.length}</button>
                  <button type="button" aria-pressed={side === "eu"} onClick={() => setSide("eu")} style={{ ["--c" as string]: EU }}><i />Avrupa Yakası · {euList.length}</button>
                  <button type="button" aria-pressed={side === "as"} onClick={() => setSide("as")} style={{ ["--c" as string]: AS }}><i />Anadolu Yakası · {asList.length}</button>
                </div>
                <div className="stat3">
                  <div><b className="num">{HEX.length}</b><span>Hizmet verilen ilçe</span></div>
                  <div><b className="num">~{euAvg}'</b><span>Avrupa Yakası ort.</span></div>
                  <div><b className="num">~{asAvg}'</b><span>Anadolu Yakası ort.</span></div>
                </div>
                <div className="cta">
                  <Link className="btn btn-red" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
                  <a className="btn btn-ink" href={BUSINESS.phoneHref}><Phone className="ico gt-ring" />{BUSINESS.phoneDisplay}</a>
                </div>
              </div>

              <div className="mapc" ref={mapRef} aria-label="İstanbul'un 39 ilçesinin etkileşimli haritası">
                <svg viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label="İstanbul ilçeleri altıgen harita: Avrupa Yakası kırmızı, Anadolu Yakası mavi, ortada İstanbul Boğazı">
                  <defs>
                    <radialGradient id="rg-glow" cx="50%" cy="50%"><stop offset="0" stopColor={EU} stopOpacity=".35" /><stop offset="1" stopColor={EU} stopOpacity="0" /></radialGradient>
                    <linearGradient id="rg-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1A2A3A" /><stop offset="1" stopColor="#14202C" /></linearGradient>
                  </defs>
                  <rect width={VW} height={VH} fill="#110D0D" />
                  <rect x="0" y="0" width={VW} height="26" fill="url(#rg-sea)" />
                  <text x="380" y="18" textAnchor="middle" className="mlab">KARADENİZ</text>
                  <path d="M0 430 Q 200 410 380 425 Q 560 445 760 520 V560 H0Z" fill="url(#rg-sea)" />
                  <text x="200" y="490" textAnchor="middle" className="mlab">MARMARA DENİZİ</text>
                  <path d={bos} fill="none" stroke="#1F3448" strokeWidth="16" strokeLinecap="round" />
                  <path d={bos} fill="none" stroke={AS} strokeWidth="2" strokeDasharray="4 8" opacity=".6" />
                  <text x={bosX(60) + 14} y="52" className="mlab">İSTANBUL BOĞAZI ↓</text>
                  <circle cx={HQ.x} cy={HQ.y} r="90" fill="url(#rg-glow)" />
                  {cur && cur !== HQ && (
                    <path className="route" d={`M${HQ.x} ${HQ.y} Q ${(HQ.x + cur.x) / 2} ${Math.min(HQ.y, cur.y) - 60} ${cur.x} ${cur.y}`} fill="none" stroke="#fff" strokeWidth="2.5" />
                  )}
                  {HEX.map((d) => {
                    const dist = Math.hypot(d.x - HQ.x, d.y - HQ.y);
                    return (
                      <g key={d.slug} className={"hx" + (match(d) ? "" : " dim") + (sel === d.slug ? " on" : "")} tabIndex={0} role="button"
                        aria-label={`${d.name}, ${d.side}`} aria-pressed={sel === d.slug}
                        onClick={() => pick(d.slug, true)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(d.slug, true); } }}>
                        <path d={hexPath(d.x, d.y, R - 1.5)} fill={d.eu ? "#B8121A" : "#1F63AE"} stroke="#110D0D" strokeWidth="2"
                          style={{ transform: popped ? undefined : "scale(0)", transition: `transform .5s cubic-bezier(.2,1.4,.4,1) ${Math.round(150 + dist * 2.2)}ms, fill .25s` }} />
                        <text x={d.x} y={d.y + 4} textAnchor="middle" fontSize={shortName(d.name).length > 6 ? 8.5 : 10.5}>{shortName(d.name)}</text>
                      </g>
                    );
                  })}
                  <circle className="hq" cx={HQ.x + R * 0.7} cy={HQ.y - R * 0.6} r="5" fill="#fff" />
                  <circle cx={HQ.x + R * 0.7} cy={HQ.y - R * 0.6} r="4" fill="#fff" stroke={EU} strokeWidth="2" />
                </svg>
                <div className="legend">
                  <span style={{ ["--c" as string]: EU }}><i />AVRUPA YAKASI</span>
                  <span style={{ ["--c" as string]: AS }}><i />ANADOLU YAKASI</span>
                  <span style={{ ["--c" as string]: "#fff" }}><i style={{ borderRadius: "50%" }} />OFİSİMİZ · KADIKÖY</span>
                </div>
                <div ref={detRef}>
                  {cur && (
                    <div className="det" role="region" aria-label={cur.name} key={cur.slug}>
                      <button className="x" type="button" aria-label="Kapat" onClick={() => setSel(null)}>×</button>
                      <small style={{ color: cur.eu ? EU : AS }}>{cur.eu ? "AVRUPA YAKASI" : "ANADOLU YAKASI"}</small>
                      <h3>{cur.name} Tesisatçı</h3>
                      <p>{cur.slug === "kadikoy" ? "Ofisimiz burada, Moda Caddesi'nde. Tüm hizmetler 7/24." : cur.intro}</p>
                      <div className="eta"><b className="num">~{cur.responseMin}'</b><span>{cur.name} için ortalama varış süresi</span></div>
                      <div className="acts">
                        <Link className="btn btn-red" to="/tesisatci/$slug" params={{ slug: cur.slug }}>İlçe sayfası</Link>
                        <a className="btn btn-wa" href={`${BUSINESS.whatsappHref}?text=${encodeURIComponent(`Merhaba Gölge Tesisat, ${cur.name}'dayım ve tesisatçıya ihtiyacım var.`)}`} target="_blank" rel="noopener">WhatsApp</a>
                        <a className="btn btn-ink" href={BUSINESS.phoneHref}>Ara</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="strip" aria-hidden="true"><div className="lane">{[...HEX, ...HEX].map((d, i) => <span key={i}>{d.name}</span>)}</div></div>

        <section className="sec" id="ilceler">
          <div className="wrap">
            <div className="ddir-h">
              <div><span className="eyebrow">İlçe rehberi</span><h2 className="h2">{HEX.length} ilçe, <em>A'dan Z'ye</em></h2></div>
              <p className="lead" style={{ margin: 0, maxWidth: 420 }}>Her ilçede aynı hizmetler, işlem öncesi net fiyat ve 2 yıl yazılı garanti. İlçenize dokunun, yerel sayfasını açın.</p>
            </div>
            <div className="ddir">
              {dirList.map((d) => (
                <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} className={"dc" + (d.slug === "kadikoy" ? " hq" : "")} style={{ textDecoration: "none", color: "inherit" }}>
                  {d.slug === "kadikoy" && <span className="badge">OFİSİMİZ</span>}
                  <span className="sd" style={{ ["--c" as string]: d.eu ? EU : AS }}><i />{d.eu ? "AVRUPA" : "ANADOLU"} · ~{d.responseMin} DK</span>
                  <b>{d.name}</b>
                  <span className="tr">{d.neighborhoods.slice(0, 3).join(" · ")}</span>
                  <em>{d.name} tesisatçı →</em>
                </Link>
              ))}
            </div>
            {dirList.length === 0 && <div className="empty">Aramanıza uyan ilçe yok — farklı bir yazım deneyin ya da arayın: İstanbul'un tamamına hizmet veriyoruz.</div>}
          </div>
        </section>

        <section className="sec mist" id="yakalar">
          <div className="wrap">
            <span className="eyebrow">İki kıta, tek ekip</span>
            <h2 className="h2">Boğaz'ın <em>iki yakasında</em></h2>
            <p className="lead">Kimse köprü trafiğinde beklemesin diye iki yakada da ekip tutuyoruz. Süreler ortalamadır — trafik, hava ve saat etkiler; telefonda size her zaman gerçekçi bir süre söyleriz.</p>
            <div className="sc">
              {[{ l: euList, c: EU, tr: "AVRUPA YAKASI", h: "Avrupa Yakası", a: euAvg, p: "Tarihi yarımada ve Şişli–Beşiktaş iş merkezlerinden hızla büyüyen batıya — Esenyurt, Beylikdüzü, Büyükçekmece — ve Silivri, Çatalca'ya kadar." },
                { l: asList, c: AS, tr: "ANADOLU YAKASI", h: "Anadolu Yakası", a: asAvg, p: "Ofisimizin bulunduğu Kadıköy Moda'dan Üsküdar ve Ataşehir'e, sahil boyunca Tuzla'ya, Ümraniye ve Sancaktepe'den Beykoz, Şile ve Adalar'a." }].map((x) => (
                <div key={x.h} className="rv" style={{ ["--c" as string]: x.c }}>
                  <span className="tr">{x.tr}</span><h3>{x.h}</h3>
                  <div className="big"><b className="num">~{x.a}'</b><span>ortalama varış · {x.l.length} ilçe</span></div>
                  <p>{x.p}</p>
                  <div className="chips2">{[...x.l].sort((a, b) => a.name.localeCompare(b.name, "tr")).map((d) => <Link key={d.slug} to="/tesisatci/$slug" params={{ slug: d.slug }} style={{ textDecoration: "none", color: "inherit" }}><span>{d.name}</span></Link>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec gt-dark" id="hizmetler">
          <div className="wrap">
            <span className="eyebrow">Her ilçede</span>
            <h2 className="h2">{SERVICES.length} hizmet, <em>{HEX.length} ilçe</em></h2>
            <p className="lead">İstanbul'un neresinde olursanız olun tüm hizmetlerimiz geçerli — ücretsiz keşif, işlem öncesi net fiyat ve 2 yıl yazılı garanti.</p>
            <div className="sm">
              {SERVICES.map((s) => {
                const I = ICONS[s.icon] || Droplet;
                return <Link key={s.slug} to="/hizmet/$slug" params={{ slug: s.slug }} className="rv"><i><I size={22} /></i>{s.name}<span>{HEX.length} İLÇEDE</span></Link>;
              })}
            </div>
          </div>
        </section>

        <section className="sec" style={{ background: "var(--ink)", color: "#F4EEEC" }}>
          <div className="wrap">
            <span className="eyebrow" style={{ color: "#FF6B6B" }}>Nasıl çalışıyoruz</span>
            <h2 className="h2" style={{ color: "#fff" }}>Her ilçede <em style={{ color: "var(--red-hot)" }}>aynı süreç</em></h2>
            <Timeline />
          </div>
        </section>

        <section className="sec mist" id="sss">
          <div className="wrap faq-g">
            <div>
              <span className="eyebrow">Sorular</span><h2 className="h2">Sık sorulan <em>sorular</em></h2>
              <div className="fside rv">
                <h3>Bölgeniz listede yok mu?</h3>
                <p>Konumunuzu WhatsApp'tan gönderin — hemen teyit edip gerçekçi varış süresini söyleyelim.</p>
                <a className="btn btn-wa" href={`${BUSINESS.whatsappHref}?text=${encodeURIComponent("Merhaba, adresime hizmet veriyor musunuz?")}`} target="_blank" rel="noopener"><MessageCircle className="ico" />Konumumu gönder</a>
                <Link className="btn btn-red" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
              </div>
            </div>
            <GtFaq items={FAQS} />
          </div>
        </section>

        <section className="final">
          <div className="wrap">
            <h2>Neredeyseniz. <em>Yakınınızdayız.</em></h2>
            <p>{HEX.length} ilçe, Boğaz'ın iki yakası, günün 24 saati.</p>
            <div className="cta">
              <Link className="btn btn-red" to="/randevu"><CalendarCheck className="ico" />Randevu al</Link>
              <a className="btn btn-ghost" href={BUSINESS.phoneHref}><Phone className="ico gt-ring" />{BUSINESS.phoneDisplay}</a>
            </div>
            <p className="tiny">● ÜCRETSİZ KEŞİF · İŞLEM ÖNCESİ NET FİYAT · 2 YIL GARANTİ</p>
          </div>
        </section>
      </main>
    </GtPage>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { el.classList.add("in"); o.disconnect(); } }), { threshold: 0.3 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const S = [
    ["İletişim", "Arayın, WhatsApp'tan yazın veya online randevu alın — ilçenizi ve sorunu söyleyin.", "7/24 YANIT"],
    ["En yakın ekip", "Boğaz'ın sizin yakanızdaki en yakın ekip yola çıkar.", "ORT. 25–60 DK"],
    ["Net fiyat", "Keşif sonrası işlem öncesi şeffaf fiyat. Onayınız olmadan başlamayız.", "KARAR SİZİN"],
    ["Temiz iş", "Zemin korunur, doğru ekipmanla iş eksiksiz yapılır.", "ÇOĞU ZAMAN TEK ZİYARET"],
    ["Garanti", "Test edilir, temizlenir, faturalanır — 2 yıl yazılı garanti.", "YAZILI GARANTİ"],
  ];
  return (
    <div className="tlp" ref={ref}>
      <span className="fill" />
      {S.map((s, i) => <div className="ts" key={s[0]}><span className="k">0{i + 1}</span><h3>{s[0]}</h3><p>{s[1]}</p><span className="tm">{s[2]}</span></div>)}
    </div>
  );
}
