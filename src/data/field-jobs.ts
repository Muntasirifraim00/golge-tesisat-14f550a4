// "Sahadan" cards shown inside blog posts: a real job from our own team, matched to the post's topic.
// Photos are the company's own job photos (src/assets). District names for the before/after jobs come
// from the previous site's case files. The steps shown in the card are taken from the matching
// service's own `process` in services.ts (how we do this job), so nothing here is invented per post.
// To add a new real job: import its photos, add an entry below, and give it the matching keywords.
import leakBefore from "@/assets/casefiles/istanbul-su-kacagi-onarim-oncesi.jpg";
import leakAfter from "@/assets/casefiles/istanbul-su-kacagi-onarim-sonrasi.jpg";
import radBefore from "@/assets/casefiles/istanbul-petek-temizligi-oncesi.jpg";
import radAfter from "@/assets/casefiles/istanbul-petek-temizligi-sonrasi.jpg";
import boilerBefore from "@/assets/casefiles/istanbul-kombi-tamiri-oncesi.jpg";
import boilerAfter from "@/assets/casefiles/istanbul-kombi-tamiri-sonrasi.jpg";
import gasInstall from "@/assets/work-gas-install.jpg";
import gasWeld from "@/assets/work-gas-weld.jpg";
import gasDig from "@/assets/live-gas-line-excavation.jpg";
import bathBreakout from "@/assets/live-bathroom-breakout.jpg";
import floorProtection from "@/assets/live-floor-protection.jpg";
import protectionDetail from "@/assets/work-home-protection-detail.jpg";
import bathLeak from "@/assets/work-bath-leak.jpg";
import cleanHome from "@/assets/work-clean-home.jpg";
import ceilingAccess from "@/assets/work-ceiling-access.jpg";
import boilerWiring from "@/assets/live-boiler-wiring.jpg";
import boilerCommercial from "@/assets/work-boiler-commercial.jpg";
import mainline from "@/assets/live-exterior-mainline.jpg";

export type FieldPhoto = { src: string; alt: string };
export type FieldJob = {
  key: string;
  /** service slug whose `process` steps are shown, and whose page the card links to */
  serviceSlug: string;
  title: string; // may contain <em>…</em>
  location?: string;
  before?: FieldPhoto;
  after?: FieldPhoto;
  photos?: FieldPhoto[]; // used when there is no before/after pair
  photoNote: string;
  /** matched against the post's serviceSlug first, then category + title + keyword */
  services: string[];
  words: RegExp;
};

export const FIELD_JOBS: FieldJob[] = [
  {
    key: "leak",
    serviceSlug: "su-kacagi-tespiti",
    title: "Kadıköy’de su kaçağı onarımı: <em>önce ve sonra</em>",
    location: "Kadıköy / İstanbul",
    before: { src: leakBefore, alt: "Kadıköy su kaçağı onarımı öncesi — Gölge Tesisat" },
    after: { src: leakAfter, alt: "Kadıköy su kaçağı onarımı sonrası — Gölge Tesisat" },
    photoNote: "Kendi ekibimizin çektiği iş fotoğrafları · sürükleyerek karşılaştırın",
    services: ["su-kacagi-tespiti", "acil-tesisatci"],
    words: /kaçak|kacak|sızıntı|sizinti|nem|rutubet|küf|vana|sayaç|sayac|su faturası|patla|boru/i,
  },
  {
    key: "radiator",
    serviceSlug: "petek-temizligi",
    title: "Ataşehir’de petek temizliği: <em>önce ve sonra</em>",
    location: "Ataşehir / İstanbul",
    before: { src: radBefore, alt: "Ataşehir petek temizliği öncesi — Gölge Tesisat" },
    after: { src: radAfter, alt: "Ataşehir petek temizliği sonrası — Gölge Tesisat" },
    photoNote: "Kendi ekibimizin çektiği iş fotoğrafları · sürükleyerek karşılaştırın",
    services: ["petek-temizligi"],
    words: /petek|kalorifer|radyatör|radyator|ısınmıyor|isinmiyor|hava alma|yerden ısıtma|kollektör|kollektor/i,
  },
  {
    key: "boiler",
    serviceSlug: "kombi-servisi",
    title: "Beşiktaş’ta kombi tamiri: <em>önce ve sonra</em>",
    location: "Beşiktaş / İstanbul",
    before: { src: boilerBefore, alt: "Beşiktaş kombi tamiri öncesi — Gölge Tesisat" },
    after: { src: boilerAfter, alt: "Beşiktaş kombi tamiri sonrası — Gölge Tesisat" },
    photoNote: "Kendi ekibimizin çektiği iş fotoğrafları · sürükleyerek karşılaştırın",
    services: ["kombi-servisi", "kombi-montaji"],
    words: /kombi|şofben|sofben|termosifon|genleşme|genlesme|basınç|basinc|ısıtma|isitma/i,
  },
  {
    key: "gas",
    serviceSlug: "dogalgaz-tesisati",
    title: "Sahadan: <em>doğalgaz hattı</em> işlerimiz",
    photos: [
      { src: gasInstall, alt: "Doğalgaz tesisatı montajı — Gölge Tesisat ekibi" },
      { src: gasWeld, alt: "Doğalgaz hattı kaynak işlemi — Gölge Tesisat ekibi" },
      { src: gasDig, alt: "Doğalgaz hattı kazı müdahalesi — Gölge Tesisat ekibi" },
    ],
    photoNote: "Kendi ekibimizin sahadan fotoğrafları",
    services: ["dogalgaz-tesisati"],
    words: /doğalgaz|dogalgaz|gaz |gaz$|ocak|igdaş|igdas|sayacı/i,
  },
  {
    key: "drain",
    serviceSlug: "tikaniklik-acma",
    title: "Sahadan: <em>zemini koruyarak</em> gider ve banyo işleri",
    photos: [
      { src: bathBreakout, alt: "Banyo zemin altı onarımı — Gölge Tesisat ekibi" },
      { src: floorProtection, alt: "İşe başlamadan zemin koruma — Gölge Tesisat ekibi" },
      { src: protectionDetail, alt: "Ev içi zemin koruma detayı — Gölge Tesisat ekibi" },
    ],
    photoNote: "Kendi ekibimizin sahadan fotoğrafları",
    services: ["tikaniklik-acma", "kanalizasyon-acma", "tuvalet-tikanikligi-acma", "mutfak-gider-acma", "kanal-goruntuleme"],
    words: /tıkan|tikan|gider|lavabo|klozet|tuvalet|lağım|lagim|koku|rögar|rogar|kanal|sifon|süzgeç|suzgec|foseptik/i,
  },
  {
    key: "bath",
    serviceSlug: "musluk-batarya-degisimi",
    title: "Sahadan: <em>banyo ve armatür</em> işlerimiz",
    photos: [
      { src: bathLeak, alt: "Banyo altı tesisat işi — Gölge Tesisat ekibi" },
      { src: ceilingAccess, alt: "Tavandan hat tespiti — Gölge Tesisat ekibi" },
      { src: cleanHome, alt: "İş sonrası temiz teslim — Gölge Tesisat ekibi" },
    ],
    photoNote: "Kendi ekibimizin sahadan fotoğrafları",
    services: ["musluk-batarya-degisimi", "dusakabin-vitrifiye-montaji", "hidrofor-kurulumu"],
    words: /musluk|batarya|duş|dus|banyo|taharet|rezervuar|armatür|armatur|hidrofor|çamaşır|camasir|bulaşık|bulasik|ankastre/i,
  },
];

const FALLBACK: FieldJob = {
  key: "general",
  serviceSlug: "acil-tesisatci",
  title: "Sahadan: <em>İstanbul’daki</em> tesisat işlerimiz",
  photos: [
    { src: mainline, alt: "Dış ana hat müdahalesi — Gölge Tesisat ekibi" },
    { src: boilerWiring, alt: "Kombi bağlantı kontrolü — Gölge Tesisat ekibi" },
    { src: boilerCommercial, alt: "Ticari kombi işi — Gölge Tesisat ekibi" },
  ],
  photoNote: "Kendi ekibimizin sahadan fotoğrafları",
  services: [],
  words: /$^/,
};

/** Pick the real job that fits a post best: same service first, then topic words. */
export function fieldJobFor(post: { serviceSlug?: string; category?: string; title?: string; keyword?: string }): FieldJob {
  const text = `${post.category ?? ""} ${post.title ?? ""} ${post.keyword ?? ""}`.toLocaleLowerCase("tr");
  const order = ["radiator", "boiler", "gas", "leak", "drain", "bath"];
  const byWords = order.map((k) => FIELD_JOBS.find((j) => j.key === k)!).find((j) => j.words.test(text));
  const byService = FIELD_JOBS.find((j) => post.serviceSlug && j.services.includes(post.serviceSlug));
  // Topic words win when they clearly point elsewhere (e.g. a "kombi basıncı" post filed under leak detection).
  return byWords ?? byService ?? FALLBACK;
}
