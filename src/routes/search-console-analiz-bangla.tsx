import { createFileRoute, Link } from "@tanstack/react-router";
import { GSC } from "@/data/gsc-analysis";

export const Route = createFileRoute("/search-console-analiz-bangla")({
  head: () => {
    const title = "Search Console ৩ মাসের বিশ্লেষণ (বাংলা) | Gölge Tesisat";
    const desc =
      "গত ৩ মাসের Google Search Console ডেটা: কোন কিওয়ার্ডে কত ক্লিক, কোথায় impression বেশি কিন্তু ক্লিক কম, প্রতিটি পেজের করণীয় আর নতুন ব্লগ পরিকল্পনা।";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: Page,
});

const nf = (n: number) => n.toLocaleString("en-US");

type Row = { q: string; c: number; i: number; ctr: number; pos: number };

function QTable({ rows }: { rows: readonly Row[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left text-muted-foreground">
          <tr>
            <th className="p-2">কিওয়ার্ড</th>
            <th className="p-2 text-right">ক্লিক</th>
            <th className="p-2 text-right">Impression</th>
            <th className="p-2 text-right">CTR %</th>
            <th className="p-2 text-right">র‍্যাংক</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.q} className="border-t border-border">
              <td className="p-2">{r.q}</td>
              <td className="p-2 text-right">{r.c}</td>
              <td className="p-2 text-right">{nf(r.i)}</td>
              <td className="p-2 text-right">{r.ctr}</td>
              <td className={`p-2 text-right font-semibold ${r.pos <= 5 ? "text-primary" : r.pos > 10 ? "text-destructive" : ""}`}>
                {r.pos}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 scroll-mt-6 border-b border-border pb-2 text-2xl font-bold text-foreground">
      {children}
    </h2>
  );
}

/** প্রতিটি পেজের জন্য করণীয় — ডেটা দেখে হাতে লেখা। */
const ACTIONS: Record<string, { diag: string; todo: string[]; newPost?: string }> = {
  "/blog/su-vanasi-nasil-kapatilir-acilir": {
    diag: "সাইটের সবচেয়ে বড় পেজ (৩৩,৮৯৫ impression)। কিন্তু মূল প্রশ্ন \"su vanası hangi yöne kapanır\" (১,৩৯৫) আর \"hangi yöne açılır\" (৬৮৩)-এ র‍্যাংক ৭–৮, ক্লিক প্রায় শূন্য। মানুষ এক লাইনের উত্তর চায় — Google সেটা নিজেই উপরে দেখিয়ে দিচ্ছে।",
    todo: [
      "টাইটেলে সরাসরি উত্তর দিন: \"Su Vanası Hangi Yöne Kapanır? Saat Yönünde (Resimli)\" ধরনের।",
      "পোস্টের একদম প্রথম ২ লাইনে বোল্ড উত্তর: \"Saat yönünde (sağa) çevirince kapanır, tersine açılır. Kollu vanada kol boruya dik olunca kapalıdır.\"",
      "কোলু (küresel) vana আর তাপ (çark) vana — দুটোর আলাদা ছোট ছবি + ছক যোগ করুন; Google Images ট্রাফিকও আসবে।",
      "\"musluk hangi yöne kapanır / açılır\" প্রশ্নগুলো এই পেজ আর çamaşır makinesi পেজ — দুটোতেই আসছে (একে অপরের সাথে প্রতিযোগিতা)। এগুলোর জন্য আলাদা ছোট পোস্ট বানিয়ে দুই পেজ থেকে লিংক দিন।",
      "FAQ-তে যোগ করুন: \"Ana su vanası nerede olur?\", \"Kombi su vanası nasıl kapatılır?\", \"Su saati vanası hangi yöne açılır?\" — এগুলোতে ইতিমধ্যে impression আছে।",
      "পেজের মাঝে Su Kaçağı Tespiti সার্ভিসে লিংক ও কল বোতাম (vana kapatmanın kারণ সাধারণত kaçak/patlama)।",
    ],
    newPost: "Musluk/çeşme hangi yöne açılır? (ছোট, ছবিসহ উত্তর পোস্ট)",
  },
  "/blog/taharet-muslugu-nasil-takilir-degistirilir": {
    diag: "১৯,১৯৭ impression, CTR ০.৬৩%। একসাথে ৪টা আলাদা কাজের প্রশ্ন এখানে আসছে: uç takma, komple değiştirme, conta değişimi, aç-kapa tamiri। একটা পেজ সবগুলোর সেরা উত্তর হতে পারছে না।",
    todo: [
      "টাইটেল: \"Taharet Musluğu Nasıl Takılır ve Değiştirilir? (Uç, Conta, Aç-Kapa)\" — তিনটা উপ-বিষয় নামেই থাকুক।",
      "শুরুতে একটা ‘কোন সমস্যা আপনার?’ বক্স: Uç değişimi → Conta → Aç-kapa sökme → Komple değişim — প্রতিটা অংশে জাম্প লিংক।",
      "\"taharet musluğu contası nasıl değiştirilir\" (৮৩০, র‍্যাংক ৫.৯) আর \"aç kapa ... conta değişimi\" (৪৯৯, র‍্যাংক ৪.৫) — এগুলোর জন্য আলাদা গভীর পোস্ট লিখলে দ্রুত টপ ৩-এ যেতে পারে।",
      "ধাপে ধাপে ছবি (ভাল্‌ভ বন্ধ → পুরনো খোলা → টেফলন → লাগানো) এবং HowTo অংশ পূর্ণ রাখুন।",
      "Musluk/Batarya Değişimi সার্ভিসের দামের পেজে লিংক — এই পাঠকরা কিনতে প্রস্তুত।",
    ],
    newPost: "Taharet musluğu contası nasıl değiştirilir? / Aç-kapa taharet musluğu nasıl sökülür ve tamir edilir?",
  },
  "/blog/camasir-makinesi-nasil-baglanir": {
    diag: "সবচেয়ে ভালো CTR-এর বড় পেজ (১.০৮%)। তবে বেশি impression আসছে \"musluk hangi yöne açılır\" থেকে, যেটা পেজের মূল বিষয় না।",
    todo: [
      "\"Çamaşır makinesi musluğu hangi yöne açılır\" (র‍্যাংক ৩.৯, CTR ৩%) — এটা ভালো চলছে; H2 হিসেবে আরো উপরে আনুন।",
      "\"Tek su girişli\" আর \"çift su girişli\" মেশিন — আলাদা দুটো H2 করে ছবি দিন (দুটোতেই impression আছে)।",
      "সাধারণ \"musluk hangi yöne\" প্রশ্নগুলো নতুন আলাদা পোস্টে পাঠান (উপরে দেখুন), এখান থেকে লিংক দিন।",
      "Gider bağlantısı (sifon/rakor) অংশে lavabo-sifonu পোস্টে লিংক।",
    ],
  },
  "/blog/lavabo-sifonu-nasil-takilir": {
    diag: "১০,৫৪০ impression, CTR ০.৫৭%। মানুষ নির্দিষ্ট ধরন খুঁজছে: ‘ikili’ (৭৩৯), ‘geniş ağızlı’ (৭২৭), ‘mutfak lavabo altı’ (৫০৪)। সবগুলোতে র‍্যাংক ৭–৮।",
    todo: [
      "টাইটেল: \"Lavabo Gider Borusu (Sifon) Nasıl Takılır? İkili, Geniş Ağızlı, Mutfak\"",
      "তিনটা আলাদা H2: Banyo lavabo sifonu / Mutfak evye ikili sifon / Geniş ağızlı sifon — প্রতিটায় পার্টসের নামসহ ছবি।",
      "‘Mutfak evye sifonu’-র জন্য আলাদা পোস্ট লিখুন (মোট ~১,২০০ impression ছড়িয়ে আছে)।",
      "Tıkanıklık Açma সার্ভিসে লিংক: ‘Sifon taktınız ama gider yine yavaş mı?’",
    ],
    newPost: "Mutfak evye sifonu (ikili gider borusu) nasıl takılır?",
  },
  "/blog/musluk-batarya-tamiri-baslik-kartus-degisimi": {
    diag: "৭,১৫৩ impression, র‍্যাংক ৮.৫। ‘aç kapa musluk başlığı nasıl sökülür’, ‘ECA başlık’, ‘kartuş değişimi’ — ব্র্যান্ড/মডেল-নির্দিষ্ট প্রশ্ন।",
    todo: [
      "‘Aç-kapa başlık nasıl sökülür’ অংশ শুরুতে আনুন, ধাপে ধাপে ছবি দিন।",
      "ECA, Artema, Vitra ব্র্যান্ডের নাম ও কোথায় স্ক্রু লুকানো থাকে — এক লাইনের ব্র্যান্ড টিপস (শুধু নিশ্চিত তথ্য)।",
      "‘Salmastra tamiri’ ও ‘kartuş değişimi’-র পার্থক্য ছকে।",
      "musluk-damliyor-tamiri পোস্টের সাথে দুই দিকে লিংক।",
    ],
  },
  "/blog/banyoya-sicak-su-az-akiyor-nedenleri": {
    diag: "CTR ১.৫৯% — ভালো। কিন্তু ‘termosifon/kombi sıcak su az akıyor’ প্রশ্নে র‍্যাংক ১৩–২৩।",
    todo: [
      "‘Kombiden az geliyorsa’ আর ‘Termosifondan az geliyorsa’ — দুটো আলাদা H2 যোগ করুন।",
      "sicak-su-gelmiyor-tesis ও kombi-basinci-dusuyor পোস্টে লিংক।",
      "Petek Temizleme/কম্বি সার্ভিসে CTA।",
    ],
  },
  "/blog/dogalgaz-sayaci-nasil-okunur": {
    diag: "সবচেয়ে বেশি impression ‘doğalgaz sayaç numarası’ (২৮২) আর ‘nerede yazar’ — ক্লিক ০। মানুষ নম্বর কোথায় লেখা তা খুঁজছে, পেজ সেটার উত্তর উপরে দিচ্ছে না।",
    todo: [
      "শুরুতে বড় অংশ: ‘Doğalgaz sayaç numarası ve tesisat numarası nerede yazar?’ — ছবিতে চিহ্ন দিয়ে।",
      "টাইটেলে ‘Sayaç Numarası Nerede?’ যোগ করুন।",
      "আলাদা ছোট পোস্ট: ‘Doğalgaz tesisat numarası nasıl öğrenilir?’ (İGDAŞ সূত্রসহ)।",
    ],
    newPost: "Doğalgaz sayaç ve tesisat numarası nerede yazar, nasıl öğrenilir?",
  },
  "/blog/bosch-kombi-resetleme": {
    diag: "‘bosch kombi resetleme’ — ১,৬৭০ impression, র‍্যাংক ৭, মাত্র ৩ ক্লিক। অথচ ‘bosch kombi 227 hatası’-তে র‍্যাংক ৩.৯, ১৩ ক্লিক — এটাই সাইটের সেরা কিওয়ার্ড।",
    todo: [
      "টাইটেল: \"Bosch Kombi Resetleme Nasıl Yapılır? (227 Hatası Çözümü)\"",
      "প্রথম লাইনে উত্তর: কোন বোতাম, কত সেকেন্ড চাপতে হয়, মডেল অনুযায়ী।",
      "227 hatası-র জন্য আলাদা পূর্ণ পোস্ট লিখুন — ইতিমধ্যে টপ ৫, আলাদা পেজ পেলে টপ ১–২ হতে পারে।",
      "Bosch-এর অন্য সাধারণ কোড (EA, 224, 2P ইত্যাদি) — শুধু নিশ্চিত তথ্য দিয়ে।",
    ],
    newPost: "Bosch kombi 227 hatası nedir, nasıl giderilir? + Bosch kombi arıza kodları listesi",
  },
  "/blog/klozet-montaji-nasil-yapilir": {
    diag: "‘arkadan/alttan çıkışlı klozet montajı’ — চারটা বানানে মিলিয়ে ~৬০০ impression, প্রায় ০ ক্লিক। ‘klozet körüğü nasıl takılır’ ৩৪০ impression, র‍্যাংক ৫.৭।",
    todo: [
      "দুটো স্পষ্ট H2: ‘Arkadan çıkışlı klozet montajı’ / ‘Alttan çıkışlı klozet montajı’ — ছবিসহ।",
      "‘Klozet körüğü nasıl takılır’ আলাদা পোস্ট — দ্রুত টপ ৩ সম্ভব।",
      "‘Duvara sıfır’ মডেলের জন্য ছোট নোট (৩ ক্লিক এসেছে)।",
    ],
    newPost: "Klozet körüğü (gider bağlantısı) nasıl takılır?",
  },
  "/blog/klozet-ic-takimi-degisimi": {
    diag: "৪,৩৪৭ impression কিন্তু অল্প query দেখা যায় — অনেক ছোট ছোট প্রশ্ন। ‘basmalı sifon nasıl takılır’ র‍্যাংক ৬.৮।",
    todo: [
      "‘Basmalı sifon’ ও ‘şamandıra’ অংশ আলাদা H2 করে উপরে আনুন।",
      "‘Klozet parçaları isimleri’ — লেবেল-দেওয়া ছবি যোগ করুন।",
      "rezervuar-surekli-su-akiyor পোস্টে লিংক।",
    ],
  },
  "/blog/su-sayaci-nasil-okunur": {
    diag: "২,৪১৯ impression, র‍্যাংক ৮.১। মূল কিওয়ার্ডে র‍্যাংক ১৬।",
    todo: [
      "শুরুতে ছবি: কালো/লাল সংখ্যা কী বোঝায়।",
      "‘Su kartı nasıl okutulur’ (কার্ডওয়ালা মিটার) অংশ যোগ করুন।",
      "su-sayaci-donuyor-gizli-kacak পোস্টে লিংক → Su Kaçağı সার্ভিস।",
    ],
  },
  "/blog/viessmann-kombi-resetleme": {
    diag: "CTR ১.৭৩% — ব্র্যান্ড রিসেট পেজগুলোর মধ্যে সেরা।",
    todo: ["F2 hatası সহ সাধারণ কোডের ছোট ছক।", "অন্য ব্র্যান্ড রিসেট পেজেও এই কাঠামো কপি করুন।"],
  },
  "/blog/klozet-su-kaciriyor-nasil-tamir-edilir": {
    diag: "র‍্যাংক ১০.৭ — দ্বিতীয় পাতার কিনারায়।",
    todo: [
      "‘Klozet alttan su kaçırıyor’ — শিরোনাম ও প্রথম অংশে এই কথা।",
      "‘Gömme klozet’ ও ‘conta’ আলাদা H2।",
      "klozet-montaji ও klozet-ic-takimi থেকে এখানে লিংক।",
    ],
  },
  "/blog/klozet-cesitleri-nedir-secim-rehberi": {
    diag: "‘klozet çeşitleri’ ২৭০, ‘klozet nedir’ ১৪৯ — ক্লিক ০, র‍্যাংক ৯–১১।",
    todo: [
      "শুরুতে ছবিসহ একটা তুলনা ছক (ayaklı, asma, gömme rezervuarlı, akıllı)।",
      "টাইটেল: \"Klozet Çeşitleri ve Tipleri: Hangisini Seçmeli?\"",
      "গোম্মে রেজারভুয়ার ও klozet-montaji পোস্টে লিংক।",
    ],
  },
  "/blog/klozet-rezervuar-su-dolmuyor": {
    diag: "২,০৭১ impression, র‍্যাংক ৮।",
    todo: ["প্রথমে ৩ কারণের দ্রুত তালিকা (vana, şamandıra, filtre)।", "rezervuar-surekli-su-akiyor পোস্টে লিংক।"],
  },
  "/hizmet/musluk-batarya-degisimi/fiyat": {
    diag: "সার্ভিস পেজের মধ্যে সবচেয়ে বেশি ক্লিক (১৩)। ‘musluk takma ücreti’ র‍্যাংক ৬.৮ — বিক্রির কিওয়ার্ড!",
    todo: [
      "টাইটেলে ‘Ücreti’ শব্দ যোগ করুন (দাম না লিখে)।",
      "taharet, musluk-batarya-tamiri, banyo-bataryasi পোস্ট থেকে এই পেজে লিংক বাড়ান।",
    ],
  },
  "/blog/banyo-bataryasi-nasil-takilir": {
    diag: "মূল কিওয়ার্ডে র‍্যাংক ১৬.৫, ‘lavabo bataryası montajı’ ৩৭।",
    todo: ["‘Banyo batarya arası kaç cm’ (র‍্যাংক ৩.২) — মাপের ছক উপরে আনুন।", "লাভাবো বাতারিয়া ও দুশ বাতারিয়া আলাদা H2।"],
  },
  "/blog/klozet-kapagi-nasil-takilir": {
    diag: "১,৪৪৫ impression, র‍্যাংক ৯।",
    todo: ["‘Üstten vidalı / amortisörlü’ — দুই ধরন ছবি দিয়ে আলাদা করুন।"],
  },
  "/blog/kombi-bacasi-nedir-cesitleri-montaji": {
    diag: "১,১৯৭ impression, র‍্যাংক ৮.৫।",
    todo: ["হারমেটিক বনাম বাজালি — hermetik-kombi পোস্টের সাথে লিংক।", "নিরাপত্তা নোট (CO, ১১২)।"],
  },
  "/blog/su-patlamasi-ilk-mudahale": {
    diag: "CTR প্রায় ১% — জরুরি পাঠক, কিনতে প্রস্তুত।",
    todo: ["প্রথম স্ক্রিনেই কল বোতাম ও ‘Acil Tesisatçı 7/24’ লিংক।", "su-vanasi পোস্ট থেকে এখানে লিংক।"],
  },
  "/blog/yer-suzgeci-nedir-cesitleri-koku-onleme": {
    diag: "র‍্যাংক ১০.২।",
    todo: ["‘Yer süzgecinden koku geliyor’ অংশ শুরুতে।", "giderden-gelen-lagim-kokusu পোস্টে লিংক।"],
  },
  "/blog/bulasik-makinesi-nasil-baglanir": {
    diag: "১,৬৫৬ impression, ক্লিক কম; সংযোগ সম্পর্কিত প্রশ্নে র‍্যাংক ২০+।",
    todo: ["‘Temiz su hortumu’ ও ‘gider bağlantısı’ আলাদা H2 + ছবি।", "camasir-makinesi পোস্টের কাঠামো অনুসরণ করুন।"],
  },
  "/blog/giderden-gelen-lagim-kokusu-nasil-giderilir": {
    diag: "CTR ১.৫% কিন্তু র‍্যাংক ১০.৫, অনেক প্রশ্নে ৩০+।",
    todo: ["‘Lağım kokusu giderme’ — টাইটেল ও H1-এ।", "Kamera ile Gider Kontrolü সার্ভিসে লিংক।"],
  },
  "/blog/basinc-dusurucu-nedir-su-basinci-ayari": {
    diag: "‘İSKİ su basıncı kaç bar’ র‍্যাংক ৬.৬।",
    todo: ["İSKİ সূত্রসহ চাপের তথ্য আলাদা অংশে।", "‘su arıtma basınç düşürücü’ নিয়ে ছোট H2।"],
  },
};

const CLUSTERS: { name: string; pillar: string; posts: string[] }[] = [
  {
    name: "১. Vana ও Musluk (সবচেয়ে বড় ক্লাস্টার)",
    pillar: "/blog/su-vanasi-nasil-kapatilir-acilir",
    posts: [
      "Musluk / çeşme hangi yöne açılır, hangi yöne kapanır? (ছোট উত্তর পোস্ট)",
      "Ana su vanası nerede olur? Daire ve bina vanası nasıl bulunur",
      "Kombi su vanası (dolum musluğu) nasıl kapatılır ve açılır",
      "Su saati (sayaç) vanası hangi yöne açılır?",
      "Küresel vana mı, çarklı vana mı? Değişim belirtileri",
    ],
  },
  {
    name: "২. Taharet ও Batarya",
    pillar: "/blog/taharet-muslugu-nasil-takilir-degistirilir",
    posts: [
      "Taharet musluğu contası nasıl değiştirilir?",
      "Aç-kapa taharet musluğu nasıl sökülür ve tamir edilir?",
      "Taharet musluğu ucu (aparatı) nasıl takılır?",
      "Aç-kapa musluk başlığı nasıl sökülür? (ECA ve diğer markalar)",
      "Banyo bataryası tesisat ölçüleri: iki giriş arası kaç cm?",
    ],
  },
  {
    name: "৩. Klozet",
    pillar: "/blog/klozet-montaji-nasil-yapilir",
    posts: [
      "Arkadan çıkışlı klozet montajı adım adım",
      "Klozet körüğü (gider bağlantısı) nasıl takılır?",
      "Basmalı sifon ve şamandıra nasıl takılır?",
      "Klozet parçaları isimleri (resimli)",
    ],
  },
  {
    name: "৪. Lavabo / Evye Gideri",
    pillar: "/blog/lavabo-sifonu-nasil-takilir",
    posts: [
      "Mutfak evye sifonu (ikili gider borusu) nasıl takılır?",
      "Geniş ağızlı lavabo gider borusu montajı",
      "Lavabo sifonu koku yapıyor: nedenleri ve çözüm",
    ],
  },
  {
    name: "৫. Kombi Arıza ও Reset",
    pillar: "/blog/bosch-kombi-resetleme",
    posts: [
      "Bosch kombi 227 hatası nedir, nasıl giderilir?",
      "Bosch kombi arıza kodları listesi",
      "Demirdöküm / Baymak / Daikin kombi hata kodları (বর্তমান রিসেট পেজগুলো ০ ক্লিক — আগে সেগুলো উন্নত করুন)",
    ],
  },
  {
    name: "৬. Sayaç ও Abonelik",
    pillar: "/blog/dogalgaz-sayaci-nasil-okunur",
    posts: [
      "Doğalgaz sayaç ve tesisat numarası nerede yazar?",
      "Kartlı su sayacı nasıl okutulur?",
    ],
  },
  {
    name: "৭. Duşakabin",
    pillar: "/blog/dusakabin-montaji-nasil-yapilir",
    posts: ["Fayans üstü duşakabin montajı", "Teknesiz kare duşakabin montajı nasıl yapılır"],
  },
];

function Page() {
  const totalC = GSC.months.reduce((s, m) => s + m.c, 0);
  const totalI = GSC.months.reduce((s, m) => s + m.i, 0);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm text-muted-foreground">অভ্যন্তরীণ রিপোর্ট · golgetesisat.com · ৪ জুলাই – ১ অক্টোবর ২০২৬ (সর্বশেষ ডেটা)</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Search Console — ৩ মাসের পূর্ণ বিশ্লেষণ</h1>

        <nav className="mt-6 flex flex-wrap gap-2 text-sm">
          {[
            ["summary", "সারাংশ"],
            ["best", "যেখানে ক্লিক আসছে"],
            ["noclick", "Impression আছে, ক্লিক নেই"],
            ["rank", "র‍্যাংকিং অবস্থা"],
            ["pages", "প্রতিটি পেজের করণীয়"],
            ["local", "লোকাল পেজ"],
            ["tech", "টেকনিক্যাল সমস্যা"],
            ["map", "নতুন ব্লগ (Topical Map)"],
            ["order", "কাজের ক্রম"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-border bg-card px-3 py-1 hover:bg-muted">
              {label}
            </a>
          ))}
        </nav>

        <H2 id="summary">১. সারাংশ</H2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ["মোট ক্লিক", nf(totalC)],
            ["মোট Impression", nf(totalI)],
            ["গড় CTR", `${((totalC / totalI) * 100).toFixed(2)}%`],
            ["কিওয়ার্ড (টপ ১০০০)", "1000"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-card p-4">
              <div className="text-xs text-muted-foreground">{k}</div>
              <div className="text-2xl font-bold">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-muted-foreground">
              <tr><th className="p-2">মাস</th><th className="p-2 text-right">ক্লিক</th><th className="p-2 text-right">Impression</th><th className="p-2 text-right">গড় র‍্যাংক</th></tr>
            </thead>
            <tbody>
              {GSC.months.map((m) => (
                <tr key={m.m} className="border-t border-border">
                  <td className="p-2">{m.m}</td><td className="p-2 text-right">{m.c}</td><td className="p-2 text-right">{nf(m.i)}</td><td className="p-2 text-right">{m.pos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li><b>দারুণ বৃদ্ধি:</b> জুলাইয়ে ১৫৮ ক্লিক → সেপ্টেম্বরে ৬৮৫ ক্লিক (৪ গুণের বেশি)। গড় র‍্যাংক ৯.৭ থেকে ৮.৩-এ উঠেছে।</li>
          <li><b>মূল সমস্যা — CTR খুব কম (০.৭৩%):</b> সাধারণত ৬–৮ নম্বরে থাকলে ২–৪% ক্লিক আসে। আপনার বেশিরভাগ কিওয়ার্ড “nasıl / hangi yöne” ধরনের — Google নিজেই উপরে উত্তর বক্স, ভিডিও আর “অন্যরা যা জিজ্ঞেস করে” দেখায়, তাই ৬–৮ নম্বর পর্যন্ত মানুষ নামে না। সমাধান: টপ ৩-এ ওঠা আর টাইটেলে কৌতূহল জাগানো।</li>
          <li><b>র‍্যাংক বিতরণ (টপ ১০০০ কিওয়ার্ড):</b> ১–৩ নম্বরে {GSC.buckets["1-3"]}টা, ৪–৫-এ {GSC.buckets["4-5"]}টা, ৬–১০-এ {GSC.buckets["6-10"]}টা, ১১–২০-এ {GSC.buckets["11-20"]}টা, ২০-এর পরে {GSC.buckets["21+"]}টা। মানে বেশিরভাগ কিওয়ার্ড প্রথম পাতার নিচের অংশে — একটু ধাক্কা দিলেই উপরে উঠবে।</li>
          <li><b>প্রায় সব ক্লিক ব্লগ থেকে।</b> সার্ভিস ও এলাকা পেজ থেকে খুব অল্প — এগুলোতে ব্লগ থেকে লিংক পাঠানো জরুরি।</li>
          <li>নোট: Search Console খুব কম খোঁজা শব্দ গোপন রাখে, তাই কিওয়ার্ডের যোগফল পেজের যোগফলের চেয়ে কম দেখায়।</li>
        </ul>

        <H2 id="best">২. কোন কিওয়ার্ডে সবচেয়ে বেশি ভিজিটর আসছে</H2>
        <div className="mt-4"><QTable rows={GSC.best} /></div>
        <H2 id="top3">টপ ৫-এ থাকা কিওয়ার্ড (এগুলো রক্ষা করুন)</H2>
        <div className="mt-4"><QTable rows={GSC.top3} /></div>

        <H2 id="noclick">৩. Impression অনেক, কিন্তু ক্লিক প্রায় নেই (CTR ১%-এর নিচে)</H2>
        <p className="mt-3 text-muted-foreground">এগুলোই সবচেয়ে বড় সুযোগ — মানুষ আপনাকে দেখছে কিন্তু ক্লিক করছে না।</p>
        <div className="mt-4"><QTable rows={GSC.noclick} /></div>

        <H2 id="rank">৪. সবচেয়ে বেশি দেখা কিওয়ার্ড ও তাদের র‍্যাংক</H2>
        <p className="mt-3 text-muted-foreground">সবুজ = টপ ৫, লাল = দ্বিতীয় পাতা। গড় ৬–৮ মানে টপ ৩ থেকে ৪–৫ ধাপ পিছিয়ে।</p>
        <div className="mt-4"><QTable rows={GSC.top} /></div>
        <h3 className="mt-8 text-xl font-bold">দ্বিতীয় পাতায় আটকে থাকা কিওয়ার্ড (র‍্যাংক ৮–২০)</h3>
        <div className="mt-4"><QTable rows={GSC.striking} /></div>

        <H2 id="pages">৫. প্রতিটি পেজের আলাদা বিশ্লেষণ ও করণীয়</H2>
        <p className="mt-3 text-muted-foreground">সব পেজে একই নিয়ম প্রযোজ্য: (ক) টাইটেলে মানুষের আসল প্রশ্নের শব্দ, (খ) প্রথম ২ লাইনে সরাসরি উত্তর, (গ) ছবিসহ ধাপ, (ঘ) সংশ্লিষ্ট সার্ভিসে লিংক। নিচে প্রতিটির বিশেষ কাজ।</p>
        <div className="mt-6 space-y-6">
          {GSC.pages.map((p, idx) => {
            const a = ACTIONS[p.path];
            return (
              <section key={p.path} className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold">
                    {idx + 1}. <a href={p.path} className="text-primary underline-offset-2 hover:underline">{p.path}</a>
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {p.c} ক্লিক · {nf(p.i)} impression · CTR {p.ctr}% · র‍্যাংক {p.pos}
                  </div>
                </div>
                {a && <p className="mt-3 leading-relaxed"><b>সমস্যা:</b> {a.diag}</p>}
                {p.queries.length > 0 && <div className="mt-3"><QTable rows={p.queries.map((x) => ({ ...x }))} /></div>}
                {a ? (
                  <>
                    <p className="mt-4 font-semibold">করণীয়:</p>
                    <ul className="mt-1 list-disc space-y-1 pl-6 leading-relaxed">
                      {a.todo.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                    {a.newPost && <p className="mt-3 rounded-lg bg-muted p-3 text-sm"><b>নতুন সহায়ক পোস্ট:</b> {a.newPost}</p>}
                  </>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">সাধারণ নিয়মগুলো প্রয়োগ করুন।</p>
                )}
              </section>
            );
          })}
        </div>

        <H2 id="local">৬. লোকাল ও সার্ভিস পেজ</H2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li><b>“bağcılar tesisatçı”</b> — ৫১০ impression, র‍্যাংক ১২.৬ (দ্বিতীয় পাতা)। এটা সরাসরি গ্রাহক আনার কিওয়ার্ড। /tesisatci/bagcilar পেজে আরো আসল কন্টেন্ট (কোন মহল্লায় যান, সাধারণ সমস্যা, রিভিউ), আর সংশ্লিষ্ট ব্লগ থেকে লিংক দিন।</li>
          <li><b>“çekmeköy tesisatçı”</b> (১১৫, র‍্যাংক ১৪.৮), <b>“bahçelievler tesisatçı”</b> (১০৪, ১১.৪), <b>“gaziosmanpaşa tesisatçı”</b> (৪৬, ১০.৭) — একই কাজ।</li>
          <li>Google Business Profile-এ এই এলাকাগুলো সার্ভিস এরিয়া হিসেবে যোগ করুন এবং রিভিউ চান — লোকাল র‍্যাংকে সবচেয়ে বড় প্রভাব ফেলে।</li>
          <li>“musluk-batarya-degisimi” এলাকা পেজগুলো (Esenyurt, Pendik, Maltepe…) ক্লিক পাচ্ছে — এগুলোতে ব্যবহৃত কাঠামো অন্য সার্ভিসেও প্রয়োগ করুন।</li>
          <li>“su kaçağı tespiti”, “tıkanıklık açma” ধরনের সার্ভিস কিওয়ার্ডে র‍্যাংক ৩০–৮০ — এগুলোতে Ads চালানোটা সঠিক সিদ্ধান্ত; অর্গানিকে উঠতে সময় লাগবে।</li>
        </ul>

        <H2 id="tech">৭. টেকনিক্যাল সমস্যা যা ডেটায় ধরা পড়েছে</H2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li><b>ভুল বানানের URL Google-এ দেখা যাচ্ছে:</b> যেমন /blog/camasir-makasi-nasil-baglanir, /blog/dogalgaz-kacag1, /blog/golgetesisat.com/blog/…, /blog/bidet-taharet-muslugu-vedir। এগুলো কোনো বাইরের সাইটের ভুল লিংক থেকে আসছে। এগুলো সঠিক পোস্টে স্থায়ী রিডাইরেক্ট করলে লিংকের শক্তি ফেরত আসবে।</li>
          <li><b>একই প্রশ্নে দুটো পেজ প্রতিযোগিতা করছে:</b> “musluk hangi yöne açılır/kapanır” — su-vanasi আর camasir-makinesi দুই পেজেই। আলাদা পোস্ট বানিয়ে সমাধান।</li>
          <li><b>০ ক্লিকের পেজ:</b> demirdokum-kombi-resetleme (২৩১ impression), daikin (২০০, র‍্যাংক ৫.৯!), baymak (১৭২), genlesme-tanki (৩৬৭, র‍্যাংক ২৪.৭), bulasik-makinesi-nasil-temizlenir (৩১৫) — টাইটেল/শুরুর উত্তর নতুন করে লিখুন।</li>
          <li>হোমপেজ মাত্র ১১৩ impression — ব্র্যান্ড নাম (“Gölge Tesisat”) ও “İstanbul tesisatçı”-তে খুব দুর্বল। Google Business Profile ও লোকাল ডিরেক্টরিতে নাম ছড়ানো দরকার।</li>
        </ul>

        <H2 id="map">৮. Topical Map অনুযায়ী নতুন ব্লগ পোস্ট</H2>
        <p className="mt-3 text-muted-foreground">প্রতিটি ক্লাস্টারে একটা মূল পেজ (Pillar) আছে যেটা ইতিমধ্যে impression পাচ্ছে। নতুন পোস্টগুলো মূল পেজকে শক্তি দেবে — প্রতিটা নতুন পোস্ট মূল পেজে লিংক দেবে, মূল পেজও সবগুলোতে। লেখা হবে আপনার ব্লগ রেহবের v2 অনুযায়ী (আগে প্ল্যান → আপনার অনুমতি)।</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {CLUSTERS.map((c) => (
            <section key={c.name} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-bold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">মূল পেজ: <a className="text-primary" href={c.pillar}>{c.pillar}</a></p>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm leading-relaxed">
                {c.posts.map((t) => <li key={t}>{t}</li>)}
              </ol>
            </section>
          ))}
        </div>

        <H2 id="order">৯. কোনটা আগে করবেন (অগ্রাধিকার)</H2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed">
          <li><b>সপ্তাহ ১:</b> টপ ১০ পেজের টাইটেল + প্রথম ২ লাইনের সরাসরি উত্তর (su-vanasi, taharet, lavabo-sifonu, bosch, klozet-montaji, dogalgaz-sayaci আগে)। <b className="text-green-600">✅ সম্পন্ন (১ অক্টোবর ২০২৬)</b></li>
          <li><b>সপ্তাহ ১:</b> ভুল বানানের URL রিডাইরেক্ট। <b className="text-green-600">✅ সম্পন্ন</b></li>
          <li><b>সপ্তাহ ২–৩:</b> সবচেয়ে বেশি impression-এর ৫টা নতুন পোস্ট: Bosch 227 hatası, Musluk hangi yöne açılır, Taharet conta değişimi, Arkadan çıkışlı klozet montajı, Doğalgaz sayaç numarası nerede। <b>⏳ চলছে</b> — পরের ধাপগুলোতে রিসার্চ করে একটার পর একটা লেখা হবে।</li>
          <li><b>সপ্তাহ ৩–৪:</b> ০-ক্লিকের কম্বি রিসেট পেজগুলো ঠিক করা + লোকাল পেজ (Bağcılar, Çekmeköy, Bahçelievler, Gaziosmanpaşa)। <b className="text-green-600">✅ সম্পন্ন</b></li>
          <li><b>৪ সপ্তাহ পর:</b> আবার Search Console মিলিয়ে দেখা — CTR ও র‍্যাংক কতটা বদলেছে। <b>⏳ অপেক্ষায়</b> (নভেম্বর ২০২৬)।</li>
        </ol>

        <H2 id="done">১০. কোন কাজগুলো শেষ হয়েছে (১ অক্টোবর ২০২৬)</H2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li><b>২৬টা পোস্টের টাইটেল ও শুরুর উত্তর নতুন করে লেখা:</b> প্রতিটা টাইটেলে এখন মানুষের আসল প্রশ্নের শব্দ, আর প্রথম লাইনে “Kısa cevap: …” দিয়ে সরাসরি উত্তর। সবগুলোর আপডেট তারিখ ১ অক্টোবর ২০২৬।</li>
          <li><b>০-ক্লিকের ৭টা পেজ মেরামত:</b> Daikin, Demirdöküm, Baymak, Buderus/Vaillant/ECA কম্বি রিসেট, genleşme tankı, bulaşık makinesi temizliği — প্রতিটায় নতুন টাইটেল ও সরাসরি উত্তর।</li>
          <li><b>ভুল বানানের ৪টা লিংক স্থায়ী রিডাইরেক্ট:</b> camasir-makasi, dogalgaz-kacag1, bidet-taharet-muslugu-vedir আর /blog/golgetesisat.com/blog/… — সব এখন সঠিক পোস্টে যায়।</li>
          <li><b>“musluk hangi yöne” দুই পেজের লড়াই শেষ:</b> মূল পেজ এখন su vanası গাইড; çamaşır makinesi পোস্টের টাইটেল ও বিবরণ থেকে ওই কথা সরানো হয়েছে।</li>
          <li><b>৪টা এলাকার পেজ শক্ত করা:</b> Bağcılar (২২ মহল্লা), Çekmeköy (২১), Bahçelievler (১১), Gaziosmanpaşa (১৬) — নতুন পরিচিতি, মহল্লার তালিকা, সাধারণ সমস্যা আর প্রশ্ন-উত্তর।</li>
          <li><b>ব্লগ থেকে এলাকা পেজে লিংক:</b> প্রতিটা পোস্টের নিচে এখন পোস্টের বিষয় অনুযায়ী এলাকার সার্ভিস লিংক (যেমন রেডিয়েটরের পোস্টে “Bağcılar petek temizliği”)।</li>
          <li><b>১৩টা পেজ ব্রাউজারে খুলে যাচাই:</b> সব পেজ ঠিকভাবে খোলে, টাইটেল-শিরোনাম-স্কিমা আছে, রিডাইরেক্ট কাজ করে। যাচাইয়ের সময় পাওয়া ২টা সমস্যা (doğalgaz পোস্টের শিরোনামে তুর্কি অক্ষর ছিল না, çamaşır makinesi-র পুরনো টাইটেল) সঙ্গে সঙ্গে ঠিক করা হয়েছে।</li>
        </ul>
        <p className="mt-4 rounded-lg bg-muted p-4 text-sm leading-relaxed"><b>পরের ধাপ:</b> এখন থেকে প্রতিবার “next” বললে রিসার্চ করে একটা নতুন ব্লগ বিষয় বাছাই করা হবে (উপরের ৮ নম্বর অংশের Topical Map থেকে), আর আপনার ব্লগ রেহবের v2 অনুযায়ী প্ল্যান → অনুমতি → লেখা → যাচাই করে পোস্ট তৈরি হবে।</p>

        <p className="mt-10 text-sm text-muted-foreground">
          <Link to="/" className="text-primary">← হোমপেজ</Link>
        </p>
      </div>
    </main>
  );
}
