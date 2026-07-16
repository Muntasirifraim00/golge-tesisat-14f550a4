// Phase 3 — Deterministic, unique content generator for the service × district
// matrix. Same (district, service) always yields the same copy, but different
// pairs get genuinely varied phrasing so Google sees unique, useful pages.

import type { District } from "@/data/districts";
import type { Service } from "@/data/services";

function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: number): T {
  const i = Math.abs(Math.trunc(seed)) % arr.length;
  return arr[i];
}

export type MatrixContent = {
  title: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  intro: string;
  localParagraph: string;
  whyParagraph: string;
  problemParagraph: string;
  responseParagraph: string;
  guaranteeParagraph: string;
  quickFacts: { label: string; value: string }[];
  faq: { q: string; a: string }[];
};

export function buildMatrixContent(d: District, s: Service): MatrixContent {
  const seed = hashStr(`${d.slug}:${s.slug}`);
  const nb = d.neighborhoods;
  const nbSample = [nb[seed % nb.length], nb[(seed + 1) % nb.length]].filter(Boolean);
  const nbSample2 = [nb[(seed >>> 6) % nb.length], nb[(seed >>> 8) % nb.length]].filter(Boolean);
  const nbList = nb.join(", ");
  const lcService = s.name.toLowerCase();
  const sh = s.highlights;
  const dh = d.highlights;
  const shA = sh[seed % sh.length];
  const shB = sh[(seed + 1) % sh.length];
  const dhA = dh[(seed >>> 4) % dh.length];
  const dhB = dh[(seed >>> 5) % dh.length];

  // Phase 10 — keyword front-loaded title (≤60 chars) + benefit-driven meta (≤155 chars
  // with response time + ücretsiz keşif + phone). Trimmed to avoid SERP truncation.
  const title = `${d.name} ${s.name} — 7/24 | Gölge Tesisat`;
  const metaDescription = `${d.name} ${lcService}: ortalama ${d.responseMin} dk'da kapınızda, ücretsiz keşif ve garantili işçilik. 7/24 acil hat: 0533 896 05 03.`;

  const heroSubs = [
    `${d.name} genelinde 7/24 ${lcService}`,
    `${s.tagline} — ${d.name}`,
    `${d.name} ve tüm mahallelerde 7/24`,
  ];

  const introTemplates = [
    () =>
      `${d.name} bölgesinde ${lcService} arıyorsanız doğru yerdesiniz. ${s.intro} ${d.name} ve çevresindeki acil çağrılara ortalama ${d.responseMin} dakika içinde müdahale ediyor, işe başlamadan önce şeffaf fiyat veriyoruz.`,
    () =>
      `Gölge Tesisat, ${d.name} ilçesinde profesyonel ${lcService} hizmeti sunar. ${s.intro} Ekiplerimiz ${d.name} hattını yakından bildiği için ortalama ${d.responseMin} dakikada adresinizde olur.`,
    () =>
      `${d.name}'de ${lcService} ihtiyacınız mı var? ${s.intro} 7/24 açık hattımızı arayın; ${d.name} ve çevresine ortalama ${d.responseMin} dakikada ulaşıyor, tüm işçiliğimizi 2 yıl garanti ediyoruz.`,
    () =>
      `${d.name} ${s.name} için 7/24 hizmet veriyoruz. ${s.intro} ${d.name} sınırları içindeki tüm mahallelere hızlı ulaşım, ücretsiz keşif ve garantili işçilik sağlıyoruz.`,
    () =>
      `${d.name}'de güvenilir bir ${lcService} ekibi mi arıyorsunuz? ${s.intro} ${shA} ${d.name} ve mahallelerine ortalama ${d.responseMin} dakikada ulaşıyoruz.`,
  ];

  const localTemplates = [
    () =>
      `${nbSample.join(" ve ")} başta olmak üzere ${d.name}'nin tüm mahallelerinde ${lcService} yapıyoruz: ${nbList}. ${d.side} hattındaki yoğun trafikte bile ekiplerimiz en kısa rotayı kullanarak hızla ulaşır.`,
    () =>
      `${d.name} ilçesinde ${nbSample.join(", ")} ve ${nbList} dahil her mahalleye servis veriyoruz. Bölgeyi iyi tanıyan ekiplerimiz sayesinde ${lcService} işiniz aynı gün tamamlanır.`,
    () =>
      `Hizmet ağımız ${d.name}'nin tamamını kapsar: ${nbList}. Özellikle ${nbSample.join(" ve ")} çevresinde sık çalıştığımız için ${lcService} taleplerine çok hızlı yanıt veriyoruz.`,
    () =>
      `${d.name}'de ${nbSample.join(", ")} ve diğer mahallelerde (${nbList}) düzenli olarak ${lcService} işi yapıyoruz. ${d.side} tarafındaki kısa yollara hâkim ekiplerimiz gecikmeden kapınızda olur.`,
  ];

  // why — woven from service + district highlights so each (district, service)
  // pair is genuinely distinct, not a name-swap of one paragraph.
  const whyTemplates = [
    () =>
      `${d.name}'de bizi tercih edenler şeffaf fiyat, hızlı müdahale ve garantili işçilik için geliyor. ${dhA} ${shA} Sürpriz ücret çıkarmıyor, işi tek seferde doğru yapıyoruz.`,
    () =>
      `${d.name} ${s.name} hizmetimizde ${shA.toLowerCase()} Ayrıca ${dhA.toLowerCase()} Tüm işçiliğimiz 2 yıl garantilidir ve keşif tamamen ücretsizdir.`,
    () =>
      `Yetkili ve sigortalı ekibimizle ${d.name}'de ${lcService} işini titizlikle yürütüyoruz. ${shB} ${dhB} Memnuniyetiniz bizim için önceliklidir.`,
    () =>
      `${d.name}'de ${lcService} denince akla gelen farkımız net: ${shA.toLowerCase()} ${dhB} Faturalı, garantili ve şeffaf çalışıyoruz.`,
    () =>
      `${shA} ${d.name} özelinde ise ${dhA.toLowerCase()} İşi uzatmadan, doğru teşhis ve kalıcı çözümle tamamlıyoruz.`,
  ];

  const problemTemplates = [
    () =>
      `${d.name}'de ${s.shortName.toLowerCase()} sorununu ertelemek çoğu zaman daha büyük masrafa yol açar. Küçük bir arıza kısa sürede zemine, eşyaya veya komşu daireye zarar verebilir; bu yüzden ${nbSample.join(" ve ")} çevresindeki çağrılara öncelik verip sorunu büyümeden çözüyoruz.`,
    () =>
      `${s.shortName} kaynaklı sorunlar ilk başta küçük görünse de hızla büyür. ${d.name}'de erken müdahale hem onarım maliyetini hem de su/ısı kaybını düşürür; ekiplerimiz bu nedenle ortalama ${d.responseMin} dakikada adresinizde olur.`,
    () =>
      `${d.name} ${nbSample2.join(", ")} hattında en sık karşılaştığımız talep ${lcService}. Belirtileri görmezden gelmek tesisatın geneline yayılan bir hasara dönüşebilir; biz sorunu kaynağında teşhis edip kalıcı şekilde gideriyoruz.`,
    () =>
      `${lcService} gerektiren arızalarda zaman önemlidir. ${d.name}'de geç kalınan bir müdahale, basit bir tamiri kapsamlı bir yenilemeye çevirebilir. Bu yüzden 7/24 açık hattımızla hızlı ve doğru çözüm sunuyoruz.`,
  ];

  const responseTemplates = [
    () =>
      `${d.name} ${d.side} tarafında konumlandığımız için ${nbList} dahil tüm mahallelere ortalama ${d.responseMin} dakikada ulaşıyoruz. Çağrınızı aldığımız anda size en yakın ekibi yönlendiriyor, yoldayken telefonda ön bilgi alıyoruz.`,
    () =>
      `Ekip planlamamız ${d.name} özelinde yapılır: ${nbSample.join(" ve ")} gibi yoğun noktalara gün içinde hazır ekip bulundururuz. Böylece acil ${lcService} taleplerine 7/24, hafta sonu ve resmî tatiller dahil yanıt veririz.`,
    () =>
      `${d.name} hattındaki kısa yolları ve trafiği bilen ekiplerimiz, ortalama ${d.responseMin} dakika içinde kapınızda olur. Gece veya gündüz fark etmeksizin ${nbList} bölgelerine aynı hızla ulaşırız.`,
  ];

  const guaranteeTemplates = [
    () =>
      `Yaptığımız her ${lcService} işi faturalı, sigortalı ve 2 yıl işçilik garantilidir. ${d.name}'de keşif ve fiyat teklifi ücretsizdir; onayınız olmadan işleme başlamayız, kullandığımız malzemeyi açıkça belirtiriz.`,
    () =>
      `${d.name} ${s.name} hizmetimizde şeffaflık esastır: işe başlamadan net fiyat, iş bitiminde fatura ve 2 yıl garanti veririz. Aynı sorun garanti süresinde tekrar ederse ücretsiz tekrar müdahale ederiz.`,
    () =>
      `Tüm işçiliğimiz 2 yıl garanti altındadır ve ekiplerimiz sigortalıdır. ${d.name}'de ücretsiz keşif sonrası onayınızla çalışır, gizli ücret çıkarmadan tek seferde kalıcı çözüm sunarız.`,
  ];

  const quickFacts: { label: string; value: string }[] = [
    { label: `${d.name}'de ortalama varış`, value: `${d.responseMin} dakika` },
    { label: "Keşif & fiyat teklifi", value: "Ücretsiz" },
    { label: "İşçilik garantisi", value: "2 yıl" },
    { label: "Çalışma saatleri", value: "7/24 (gece & hafta sonu dahil)" },
    { label: "Hizmet bölgesi", value: `${d.name} ve tüm mahalleleri` },
    { label: "Ödeme", value: "Nakit, kredi kartı, havale" },
  ];

  const faq: { q: string; a: string }[] = [
    {
      q: `${d.name}'de ${lcService} ne kadar sürede yapılır?`,
      a: `${d.name} ve çevresindeki acil çağrılara ortalama ${d.responseMin} dakika içinde müdahale ediyoruz. ${s.faq[0]?.a ?? "İşlem süresi sorunun büyüklüğüne göre değişir."}`,
    },
    {
      q: `${d.name}'de ${lcService} fiyatları nasıl belirleniyor?`,
      a: `İşleme başlamadan önce yerinde ücretsiz keşif yapıp şeffaf fiyat veriyoruz; ${d.name}'de sürpriz ücret çıkarmıyoruz. Tüm işçiliğimiz garantilidir.`,
    },
    {
      q: `${d.name}'nin hangi mahallelerine ${lcService} için geliyorsunuz?`,
      a: `${nbList} dahil ${d.name}'nin tüm mahallelerine 7/24 ${lcService} hizmeti veriyoruz.`,
    },
    {
      q: `${d.name}'de gece veya hafta sonu ${lcService} yapıyor musunuz?`,
      a: `Evet. ${d.name}'de hafta içi, hafta sonu ve resmî tatiller dahil 7/24 hizmet veriyoruz; gece acil çağrılarına da aynı ekip standardıyla yanıt veriyoruz.`,
    },
    ...(s.faq[1] ? [s.faq[1]] : []),
  ];

  return {
    title,
    metaDescription,
    h1: `${d.name} ${s.name}`,
    heroSub: pick(heroSubs, seed >> 2),
    intro: pick(introTemplates, seed)(),
    localParagraph: pick(localTemplates, seed >> 3)(),
    whyParagraph: pick(whyTemplates, seed >> 5)(),
    problemParagraph: pick(problemTemplates, seed >> 7)(),
    responseParagraph: pick(responseTemplates, seed >> 9)(),
    guaranteeParagraph: pick(guaranteeTemplates, seed >> 11)(),
    quickFacts,
    faq,
  };
}

// Phase 5 — hyper-local mahalle (neighborhood) content. Same (district,
// neighborhood) always yields the same copy; different pairs get varied
// phrasing so each ultra-long-tail page is genuinely unique for crawlers.
export type NeighborhoodContent = {
  title: string;
  metaDescription: string;
  h1: string;
  heroSub: string;
  intro: string;
  localParagraph: string;
  whyParagraph: string;
  faq: { q: string; a: string }[];
};

export function buildNeighborhoodContent(
  d: District,
  neighborhood: string,
): NeighborhoodContent {
  const seed = hashStr(`${d.slug}:nb:${neighborhood}`);
  const others = d.neighborhoods.filter((n) => n !== neighborhood);
  const nearby = [
    others[seed % Math.max(others.length, 1)],
    others[(seed + 1) % Math.max(others.length, 1)],
  ].filter(Boolean);
  const nearbyText = nearby.length ? nearby.join(" ve ") : d.name;

  // Keyword front-loaded title (≤60 chars) + benefit-driven meta (≤155).
  const title = `${neighborhood} Tesisatçı — 7/24 Acil | Gölge Tesisat`;
  const metaDescription = `${neighborhood} (${d.name}) tesisatçı: su kaçağı, tıkanıklık açma ve kombi servisinde ortalama ${d.responseMin} dk'da kapınızda. Ücretsiz keşif: 0533 896 05 03.`;

  const heroSubs = [
    `${neighborhood} mahallesinde 7/24 acil tesisat`,
    `${neighborhood} • ${d.name} — 7/24 su tesisatçısı`,
    `${neighborhood}'nde ortalama ${d.responseMin} dakikada kapınızda`,
  ];

  const introTemplates = [
    () =>
      `${neighborhood} mahallesinde tesisatçı mı arıyorsunuz? Gölge Tesisat, ${d.name} ${neighborhood}'nde su kaçağı tespiti, tıkanıklık açma, kombi servisi ve petek temizliği dahil tüm tesisat işlerinde 7/24 hizmet veriyor. Acil çağrılara ortalama ${d.responseMin} dakikada ulaşıyoruz.`,
    () =>
      `${d.name} ${neighborhood} bölgesindeki ev ve işyerlerine en yakın su tesisatçısı Gölge Tesisat'tır. ${neighborhood} sokaklarını yakından bilen ekiplerimiz, çağrınızdan ortalama ${d.responseMin} dakika sonra adresinizde olur; işe başlamadan önce ücretsiz keşif ve şeffaf fiyat sunarız.`,
    () =>
      `${neighborhood}'nde acil tesisat sorunlarınıza 7/24 çözüm üretiyoruz. Patlayan boru, su kaçağı, tıkalı gider veya yanmayan kombi — ${d.name} ${neighborhood} hattındaki ekibimiz ortalama ${d.responseMin} dakikada müdahale eder, tüm işçiliği 2 yıl garanti eder.`,
  ];

  const localTemplates = [
    () =>
      `${neighborhood} ve çevresindeki ${nearbyText} taraflarında sık çalıştığımız için bölgeyi avucumuzun içi gibi biliriz. Bu sayede ${d.name} ${neighborhood}'nde tesisat arızalarına en kısa rotayı kullanarak hızla ulaşır, işi aynı gün tamamlarız.`,
    () =>
      `Hizmet ağımız ${neighborhood} mahallesinin tüm sokaklarını kapsar; ${nearbyText} gibi komşu noktalara da aynı hızla gideriz. ${d.name} ${neighborhood}'ndeki apartman, site ve müstakil yapılarda tecrübeliyiz.`,
    () =>
      `${neighborhood}'nde yıllardır hizmet veriyoruz; ${nearbyText} hattındaki yoğunlukta bile ekiplerimiz hızlı ulaşır. ${d.name} ${neighborhood} özelinde eski ve yeni tesisat tiplerinin tamamına hâkimiz.`,
  ];

  const whyTemplates = [
    () =>
      `${neighborhood}'nde bizi tercih edenler şeffaf fiyat, hızlı müdahale ve garantili işçilik için geliyor. ${d.highlights[0]} Sürpriz ücret çıkarmaz, işi tek seferde doğru yaparız.`,
    () =>
      `${neighborhood} ${d.name} tesisat hizmetimizde ${d.highlights[0].toLowerCase()} Tüm işçiliğimiz 2 yıl garantilidir ve yerinde keşif tamamen ücretsizdir.`,
    () =>
      `Yetkili ve sigortalı ekibimizle ${neighborhood}'nde tesisat işlerini titizlikle yürütürüz. ${d.highlights[1] ?? d.highlights[0]} Memnuniyetiniz önceliğimizdir.`,
  ];

  const faq: { q: string; a: string }[] = [
    {
      q: `${neighborhood}'nde tesisatçı ne kadar sürede gelir?`,
      a: `${d.name} ${neighborhood} ve çevresindeki acil çağrılara ortalama ${d.responseMin} dakika içinde müdahale ediyoruz. 7/24, gece ve hafta sonu dahil hizmet veriyoruz.`,
    },
    {
      q: `${neighborhood}'nde hangi tesisat işlerini yapıyorsunuz?`,
      a: `Su kaçağı tespiti, tıkanıklık açma, kombi servisi, petek temizliği, doğalgaz tesisatı ve kanal görüntüleme dahil tüm tesisat hizmetlerini ${neighborhood}'nde sunuyoruz.`,
    },
    {
      q: `${neighborhood} tesisatçı fiyatları nasıl belirleniyor?`,
      a: `İşleme başlamadan önce yerinde ücretsiz keşif yapıp şeffaf fiyat veriyoruz; ${neighborhood}'nde sürpriz ücret çıkarmıyoruz. Tüm işçiliğimiz garantilidir.`,
    },
  ];

  return {
    title,
    metaDescription,
    h1: `${neighborhood} Tesisatçı`,
    heroSub: pick(heroSubs, seed >> 2),
    intro: pick(introTemplates, seed)(),
    localParagraph: pick(localTemplates, seed >> 3)(),
    whyParagraph: pick(whyTemplates, seed >> 5)(),
    faq,
  };
}
