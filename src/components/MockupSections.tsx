import { lazy, Suspense, useState } from "react";
import {
  Phone, MessageCircle, MapPin, Clock, ShieldCheck, Wallet, Calendar, Mail,
  ChevronDown, ChevronLeft, ChevronRight, Star, Headphones, Award, ThumbsUp,
  Wrench, ClipboardCheck, FileText, Search, CheckCircle2, Send, Lock,
  Users, BadgeCheck, Leaf, Home, Thermometer, Gauge, Zap, ArrowRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLang } from "@/i18n/LanguageProvider";
import { DISTRICTS } from "@/data/districts";
import techThumbs from "@/assets/tech-thumbs.jpg";
import serviceVan from "@/assets/golge-tesisat-van.jpg";

const DISTRICT_SLUGS: Record<string, string> = Object.fromEntries(
  DISTRICTS.map((d) => [d.name, d.slug])
);

const IstanbulServiceMap = lazy(() => import("@/components/IstanbulServiceMap"));

const PHONE = "0533 896 05 03";
const PHONE_TEL = "tel:+905338960503";
const WA = "https://wa.me/905338960503";

const T = {
  tr: {
    areas: {
      eyebrow: "HİZMET BÖLGELERİMİZ",
      title: "İstanbul'un Her Noktasındayız!",
      desc: "Avrupa ve Anadolu Yakası'nın tüm ilçelerinde hızlı ve profesyonel tesisat hizmeti sunuyoruz.",
      eu: "AVRUPA YAKASI",
      asia: "ANADOLU YAKASI",
      more: "ve daha fazlası…",
      avg: "Ortalama Varış Süremiz",
      min: "DAKİKA",
      avgDesc: "En yakın ekibimizle en kısa sürede yanınızdayız.",
      coupon: { off: "%15", offLabel: "İNDİRİM", small: "WEB SİTEMİZE ÖZEL", title: "İLK HİZMETİNİZDE İNDİRİM!", desc: "Hemen randevunuzu alın, kaliteli hizmeti avantajlı fiyatlarla deneyimleyin.", code: "KUPON KODU", value: "TESISAT15", note: "*Detaylı bilgi için bizimle iletişime geçin." },
      whyTitle: "NEDEN BİZ?",
      why: [
        { t: "Uzman Ekip", d: "Alanında deneyimli ve sertifikalı uzman kadro." },
        { t: "Kaliteli Hizmet", d: "Modern ekipmanlar ile kalıcı çözümler sunuyoruz." },
        { t: "Şeffaf Fiyat", d: "İşlem öncesi net fiyat bilgisi, sürpriz ücret yok." },
        { t: "Garantili Hizmet", d: "Tüm işlerimizde garanti ve müşteri memnuniyeti." },
      ],
      callTitle: "HEMEN ARAYIN", callSub: "7/24 Acil Destek Hattı",
      waTitle: "WHATSAPP'TAN YAZIN", waSub: "Anında Destek Alın",
    },
    faq: {
      eyebrow: "SIK SORULAN SORULAR",
      title: "Merak Ettikleriniz",
      desc: "En çok sorulan sorulara hızlıca göz atın.",
      items: [
        { q: "Tesisat hizmeti ne kadar sürede tamamlanır?", a: "Hizmetin kapsamına göre değişmekle birlikte, çoğu işlemi aynı gün içerisinde tamamlıyoruz. Detaylı bilgi için bizimle iletişime geçebilirsiniz." },
        { q: "Yaptığınız işlere garanti veriyor musunuz?", a: "Evet, tüm işlerimizde işçilik ve parça garantisi sunuyoruz." },
        { q: "Ödeme seçenekleriniz nelerdir?", a: "Nakit, kredi kartı ve havale/EFT ile ödeme yapabilirsiniz." },
        { q: "Haftanın her günü hizmet veriyor musunuz?", a: "Evet, 7/24 acil destek hattımız ve haftanın her günü hizmetinizdeyiz." },
      ],
    },
    happy: {
      eyebrow: "MÜŞTERİ YORUMLARI",
      title: "Sizden Gelen Mutluluk",
      desc: "Bizi tercih eden müşterilerimizin değerli yorumları.",
      items: [
        { name: "Murat K.", area: "Kadıköy", text: "Gece su kaçağı için aradım, yarım saat içinde geldiler. Sorunu hızlıca çözüp açıkladılar. Gerçekten profesyonel bir ekip!" },
        { name: "Zeynep A.", area: "Üsküdar", text: "Petek temizliği hizmeti aldık. Tüm petekler ısındı ve fatura düşüşü yaşadık. Çok memnun kaldık, teşekkürler." },
        { name: "Emre D.", area: "Maltepe", text: "Kombi arızası için geldiler, parça teminini aynı gün sağladılar ve sorunu kalıcı olarak çözdüler. Kesinlikle tavsiye ediyorum." },
        { name: "Selin Y.", area: "Şişli", text: "Hızlı, temiz ve dürüst bir hizmet aldım. Fiyat konusunda sürpriz yok. Teşekkür ederim." },
      ],
    },
    news: { eyebrow: "BİZDEN HABERDAR OLUN", title: "Kampanya ve Duyurulardan İlk Siz Haberdar Olun!", desc: "E-posta adresinizi bırakın, fırsatları kaçırmayın.", placeholder: "E-posta adresiniz", cta: "KAYIT OL", footer: "Kişisel verileriniz güvenle korunur. İstediğiniz zaman çıkış yapabilirsiniz." },
    contact: { eyebrow: "BİZE ULAŞIN", title: "İletişimde Kalalım", desc: "Her türlü soru ve talepleriniz için bize ulaşabilirsiniz.", phone: "7/24 Acil Destek Hattı", waTitle: "WhatsApp'tan Yazın", wa: "Anında Destek Alın", email: "info@golgetesisat.com.tr", emailDesc: "E-posta ile bize ulaşın", office: "Merkez Ofis", address: "Atatürk Mah. Tesisat Sk. No:12/4 34760 Ümraniye / İstanbul" },
    bottomBar: [
      { t: "7/24 Acil Destek", s: "Her an yanınızdayız." },
      { t: "Hızlı Çözüm", s: "En kısa sürede çözüm sunuyoruz." },
      { t: "%100 Güven", s: "Memnuniyetiniz önceliğimizdir." },
      { t: "Uzman Ekip", s: "Deneyimli ve sertifikalı profesyoneller." },
    ],
    process: {
      eyebrow: "HİZMET SÜRECİMİZ",
      title: "Adım Adım Profesyonel Hizmet",
      desc: "Siz rahat edin, tüm süreci biz yönetelim.",
      steps: [
        { t: "İletişime Geçin", d: "Bizi arayın, ihtiyacınızı anlatın. Size en uygun zamanı birlikte belirleyelim." },
        { t: "Randevunuzu Alın", d: "Planınıza uygun randevu oluşturalım, sizi bilgilendirelim." },
        { t: "Uzmanımız Gelsin", d: "Uzman ekibimiz belirlenen adreste, zamanında hazır olsun." },
        { t: "Kontrol & Onarım", d: "Detaylı kontrol, arıza tespiti ve onayınızla birlikte onarım işlemi." },
        { t: "Test & Teslim", d: "Testleri yapalım, cihazınızı güvenle teslim edelim." },
      ],
    },
    packs: {
      eyebrow: "AVANTAJLI PAKETLER",
      title: "İhtiyacınıza Uygun Paketler",
      desc: "Düzenli bakım, daha uzun ömür ve daha az arıza demek.",
      mostPicked: "EN ÇOK TERCİH EDİLEN",
      yearly: "YILLIK",
      items: [
        { t: "TEMEL PAKET", desc: "Yıllık kombi bakım ve arıntrol hizmeti.", price: "₺1.250", color: "blue", features: ["Kombi genel kontrol", "Brülör ve eşanjör temizliği", "Gaz ayar kontrolü", "Emniyet ve kaçak kontrolü"] },
        { t: "STANDART PAKET", desc: "Yıllık bakım + öncelikli destek avantajı.", price: "₺1.950", color: "red", features: ["Temel paket tüm içerikler", "Öncelikli randevu desteği", "7/24 telefon desteği", "Ücretsiz danışmanlık"] },
        { t: "PREMİUM PAKET", desc: "Yıllık bakım + parça ve işçilik güvencesi.", price: "₺2.950", color: "gold", features: ["Standart paket tüm içerikler", "İşçilik garantisi", "Parça garantisi", "Yılda 1 kez ücretsiz kontrol"] },
      ],
    },
    tips: {
      eyebrow: "VERİMLİLİK İPUÇLARI",
      title: "Daha Az Fatura, Daha Yüksek Verim İçin",
      desc: "Küçük önlemlerle büyük tasarruf sağlayın.",
      items: [
        { t: "Sıcaklık Ayarı", d: "Kombinizi 20-22°C arasında kullanarak tasarruf edebilirsiniz." },
        { t: "Petek Bakımı", d: "Peteklerinizi düzenli temizletin, ısınız eşit dağılsın." },
        { t: "Isı Kaybını Önleyin", d: "Kapı ve pencerelerde ısı yalıtımına dikkat edin." },
        { t: "Basınç Kontrolü", d: "Kombi basıncınızı 1 - 1,5 bar arasında tutun." },
        { t: "Düzenli Bakım", d: "Yılda en az 1 kez bakım yaptırarak arıza riskini azaltın." },
      ],
    },
    emergency: { title: "Acil Durumlarda Yanınızdayız!", desc: "7/24 Acil Destek Hattımızla bir telefon kadar yakınız.", b1: "7/24 Acil Destek", b2: "30 Dakika Ortalama Varış Süresi", b3: "Uzman Ekip Garantili Çözüm", cta: "HEMEN ARA", phoneSub: "7/24 Acil Destek Hattı" },
    certs: {
      eyebrow: "BELGELERİMİZ & BAŞARILARIMIZ",
      title: "Kalite Belgelerimiz, Güveninizin Teminatı",
      desc: "Sahip olduğumuz belgeler ve aldığımız ödüllerle hizmet kalitemizi tescilliyoruz.",
      items: [
        { t: "ISO 9001:2015", d: "Kalite Yönetim Sistemi" },
        { t: "ISO 14001:2015", d: "Çevre Yönetim Sistemi" },
        { t: "ISO 45001:2018", d: "İş Sağlığı ve Güvenliği" },
        { t: "TÜRKAK", d: "Akreditasyonlu Hizmet" },
        { t: "Müşteri Memnuniyeti", d: "Başarı Ödülü" },
      ],
    },
    flow: {
      eyebrow: "HİZMET SÜRECİMİZ",
      title: "Siz Rahat Edin, Biz Her Şeyi Planlayalım",
      steps: [
        { t: "İletişim", d: "Bize ulaşın, ihtiyacınızı anlayalım." },
        { t: "Keşif", d: "Uzman ekibimiz adrese gelip keşif yapsın." },
        { t: "Teklif", d: "Size özel en uygun teklifi sunalım." },
        { t: "Planlama", d: "Uygun zamanınızı belirleyip planlayalım." },
        { t: "Uygulama", d: "Profesyonel ekibimiz işlemi gerçekleştirsin." },
        { t: "Kontrol & Teslim", d: "Kontrol edelim ve teslim edelim." },
      ],
    },
    whyBig: {
      eyebrow: "NEDEN GÖLGE TESİSAT?",
      items: [
        { t: "Deneyimli Ekip", d: "Alanında uzman, sürekli eğitim alan profesyonel kadromuzla hizmet veriyoruz." },
        { t: "Kaliteli Malzeme", d: "Tüm işlemlerimizde birinci sınıf malzeme ve ekipman kullanıyoruz." },
        { t: "Zamanında Hizmet", d: "Söz verdiğimiz zamanda işinizi tamamlıyor, zamanınıza değer veriyoruz." },
        { t: "Uygun Fiyat", d: "Kaliteli hizmeti adil ve şeffaf fiyatlarla sunuyoruz." },
        { t: "7/24 Destek", d: "Acil durumlarda her an yanınızdayız, destek hattımız 7/24 açık." },
        { t: "Çevreye Duyarlı", d: "Doğaya ve çevreye saygılı, sürdürülebilir çözümler üretiyoruz." },
      ],
    },
    bigCta: { eyebrow: "HEMEN İLETİŞİME GEÇİN", title: "Sorunlarınız İçin Çözüm Bizde!", desc: "Uzman ekibimiz en kısa sürede size ulaşsın, içiniz rahat olsun." },
    stats: [
      { v: "10.000+", l: "Mutlu Müşteri" },
      { v: "20.000+", l: "Tamamlanan İş" },
      { v: "Tüm İstanbul", l: "Avrupa & Anadolu Yakası" },
      { v: "15+", l: "Yıllık Deneyim" },
      { v: "7/24", l: "Acil Destek" },
    ],
  },
  en: {
    areas: {
      eyebrow: "OUR SERVICE AREAS",
      title: "We're All Across Istanbul!",
      desc: "Fast, professional plumbing service across every district on both the European and Asian sides.",
      eu: "EUROPEAN SIDE",
      asia: "ASIAN SIDE",
      more: "and more…",
      avg: "Average Arrival Time",
      min: "MINUTES",
      avgDesc: "Our nearest team reaches you in the shortest time.",
      coupon: { off: "15%", offLabel: "OFF", small: "WEBSITE EXCLUSIVE", title: "DISCOUNT ON YOUR FIRST SERVICE!", desc: "Book your appointment now, enjoy quality service at advantageous prices.", code: "COUPON CODE", value: "TESISAT15", note: "*Contact us for details." },
      whyTitle: "WHY US?",
      why: [
        { t: "Expert Team", d: "Experienced and certified specialists in their field." },
        { t: "Quality Service", d: "Lasting solutions with modern equipment." },
        { t: "Transparent Pricing", d: "Clear quotes upfront, no surprise fees." },
        { t: "Guaranteed Service", d: "Workmanship guarantee on every job." },
      ],
      callTitle: "CALL NOW", callSub: "24/7 Emergency Hotline",
      waTitle: "MESSAGE ON WHATSAPP", waSub: "Get instant support",
    },
    faq: {
      eyebrow: "FREQUENTLY ASKED QUESTIONS",
      title: "What You're Wondering",
      desc: "A quick look at the most common questions.",
      items: [
        { q: "How long does the service take?", a: "It varies by scope, but most jobs are completed the same day. Contact us for details." },
        { q: "Do you guarantee your work?", a: "Yes, we offer workmanship and parts warranty on all jobs." },
        { q: "What payment options do you accept?", a: "Cash, credit card, and bank transfer/EFT." },
        { q: "Are you available every day?", a: "Yes, our 24/7 emergency line operates every day of the week." },
      ],
    },
    happy: {
      eyebrow: "CUSTOMER REVIEWS",
      title: "Happiness From You",
      desc: "Valuable reviews from customers who chose us.",
      items: [
        { name: "Murat K.", area: "Kadıköy", text: "I called at night for a water leak — they arrived within half an hour and explained the fix. Truly professional!" },
        { name: "Zeynep A.", area: "Üsküdar", text: "We had radiator cleaning. All radiators heat evenly and our bill dropped. Very satisfied, thank you." },
        { name: "Emre D.", area: "Maltepe", text: "They came for a boiler issue, sourced the part the same day and fixed it permanently. Highly recommend." },
        { name: "Selin Y.", area: "Şişli", text: "Fast, clean and honest service. No surprises on price. Thank you." },
      ],
    },
    news: { eyebrow: "STAY INFORMED", title: "Be the First to Hear Campaigns & Announcements!", desc: "Drop your email and don't miss the deals.", placeholder: "Your email address", cta: "SIGN UP", footer: "Your data is kept safe. You can unsubscribe anytime." },
    contact: { eyebrow: "REACH US", title: "Let's Stay In Touch", desc: "Reach us for any questions or requests.", phone: "24/7 Emergency Hotline", waTitle: "Message on WhatsApp", wa: "Get instant support", email: "info@golgetesisat.com.tr", emailDesc: "Email us", office: "Head Office", address: "Atatürk Mah. Tesisat Sk. No:12/4 34760 Ümraniye / İstanbul" },
    bottomBar: [
      { t: "24/7 Emergency", s: "Always by your side." },
      { t: "Quick Solution", s: "Fastest possible resolution." },
      { t: "100% Trust", s: "Your satisfaction is our priority." },
      { t: "Expert Team", s: "Experienced certified pros." },
    ],
    process: {
      eyebrow: "OUR SERVICE PROCESS",
      title: "Step by Step Professional Service",
      desc: "Sit back — we manage the whole process.",
      steps: [
        { t: "Get In Touch", d: "Call us, describe your need. Let's pick the best time together." },
        { t: "Book Your Slot", d: "We set an appointment that fits your schedule." },
        { t: "Our Pro Arrives", d: "Our expert team is at your address on time." },
        { t: "Inspect & Repair", d: "Detailed inspection, diagnosis, repair on your approval." },
        { t: "Test & Hand Over", d: "We run tests and safely hand over your equipment." },
      ],
    },
    packs: {
      eyebrow: "VALUE PACKAGES",
      title: "Packages That Fit You",
      desc: "Regular maintenance means longer life and fewer breakdowns.",
      mostPicked: "MOST PICKED",
      yearly: "YEARLY",
      items: [
        { t: "BASIC PACKAGE", desc: "Annual boiler maintenance and inspection.", price: "₺1,250", color: "blue", features: ["General boiler check", "Burner & exchanger cleaning", "Gas adjustment check", "Safety & leak check"] },
        { t: "STANDARD PACKAGE", desc: "Yearly maintenance + priority support.", price: "₺1,950", color: "red", features: ["All Basic content", "Priority booking", "24/7 phone support", "Free consultancy"] },
        { t: "PREMIUM PACKAGE", desc: "Yearly maintenance + parts & labor warranty.", price: "₺2,950", color: "gold", features: ["All Standard content", "Workmanship warranty", "Parts warranty", "1 free check per year"] },
      ],
    },
    tips: {
      eyebrow: "EFFICIENCY TIPS",
      title: "For Lower Bills and Higher Efficiency",
      desc: "Big savings with small precautions.",
      items: [
        { t: "Temperature Setting", d: "Keep your boiler at 20-22°C to save energy." },
        { t: "Radiator Care", d: "Clean radiators regularly for even heating." },
        { t: "Prevent Heat Loss", d: "Mind the insulation around doors and windows." },
        { t: "Pressure Check", d: "Keep boiler pressure between 1 - 1.5 bar." },
        { t: "Regular Maintenance", d: "At least one annual service reduces breakdowns." },
      ],
    },
    emergency: { title: "We're With You In Emergencies!", desc: "Our 24/7 hotline is just a phone call away.", b1: "24/7 Emergency", b2: "30-Min Average Arrival", b3: "Expert Team Guaranteed", cta: "CALL NOW", phoneSub: "24/7 Emergency Hotline" },
    certs: {
      eyebrow: "CERTIFICATES & ACHIEVEMENTS",
      title: "Our Quality Certificates, Your Trust Guaranteed",
      desc: "We back our service quality with certifications and awards.",
      items: [
        { t: "ISO 9001:2015", d: "Quality Management System" },
        { t: "ISO 14001:2015", d: "Environmental Management" },
        { t: "ISO 45001:2018", d: "Occupational H&S" },
        { t: "TÜRKAK", d: "Accredited Service" },
        { t: "Customer Satisfaction", d: "Achievement Award" },
      ],
    },
    flow: {
      eyebrow: "OUR SERVICE PROCESS",
      title: "Sit Back — We'll Plan Everything",
      steps: [
        { t: "Contact", d: "Reach out — we'll understand your need." },
        { t: "Survey", d: "Our team visits and surveys on site." },
        { t: "Quote", d: "We present the best tailored offer." },
        { t: "Plan", d: "We pick a time that suits you." },
        { t: "Execute", d: "Our pros carry out the job." },
        { t: "Check & Deliver", d: "Final check and handover." },
      ],
    },
    whyBig: {
      eyebrow: "WHY GÖLGE TESİSAT?",
      items: [
        { t: "Experienced Team", d: "Continually trained, experienced specialists." },
        { t: "Quality Materials", d: "Top-tier materials and equipment on every job." },
        { t: "On Time", d: "We deliver when promised — your time matters." },
        { t: "Fair Pricing", d: "Quality at fair, transparent prices." },
        { t: "24/7 Support", d: "Always there in emergencies, line open 24/7." },
        { t: "Eco Friendly", d: "Sustainable, environment-respecting solutions." },
      ],
    },
    bigCta: { eyebrow: "GET IN TOUCH NOW", title: "We Have the Solution!", desc: "Our expert team will reach you fast — relax." },
    stats: [
      { v: "10,000+", l: "Happy Customers" },
      { v: "20,000+", l: "Jobs Completed" },
      { v: "All Istanbul", l: "Both Sides" },
      { v: "15+", l: "Years Experience" },
      { v: "24/7", l: "Emergency" },
    ],
  },
};

function useM() {
  const { lang } = useLang();
  return T[lang];
}

// ===== 1. SERVICE AREAS =====
export function ServiceAreasSection() {
  const m = useM();
  const eu = [
    "Beşiktaş", "Şişli", "Bakırköy", "Beylikdüzü", "Sarıyer", "Beyoğlu", "Fatih",
    "Etiler", "Levent", "Nişantaşı", "Bebek", "Ortaköy", "Eyüpsultan",
    "Zeytinburnu", "Kağıthane", "Bahçelievler", "Bağcılar",
  ];
  const asia = [
    "Kadıköy", "Üsküdar", "Maltepe", "Ataşehir", "Ümraniye", "Kartal", "Pendik",
    "Beykoz", "Çekmeköy", "Moda", "Göztepe", "Çengelköy", "Bağdat Caddesi",
    "Caddebostan", "Tuzla",
  ];
  return (
    <section className="px-4 py-12 relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 bg-brand-red/15 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute bottom-20 -left-10 w-56 h-56 bg-cyan-500/8 blur-[90px] rounded-full" />

      {/* Header */}
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-black tracking-[0.22em]">
          <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-red" /></span>
          {m.areas.eyebrow}
        </div>
        <h2 className="mt-3 text-[30px] font-black leading-[0.95] tracking-tight">{m.areas.title}</h2>
        <p className="mt-2 text-[12.5px] text-muted-foreground leading-snug">{m.areas.desc}</p>
      </div>

      {/* Bosphorus split card */}
      <div className="relative mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent overflow-hidden">
        {/* horizontal Bosphorus wave */}
        <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-20 pointer-events-none" viewBox="0 0 400 80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="boshM" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0ea5b7" stopOpacity="0" />
              <stop offset="50%" stopColor="#0ea5b7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0ea5b7" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 40 C 80 10, 160 70, 240 30 S 360 50, 400 40 L 400 80 L 0 80 Z" fill="url(#boshM)" />
          <path d="M 0 40 C 80 10, 160 70, 240 30 S 360 50, 400 40" stroke="rgba(14,165,183,0.35)" strokeWidth="1" strokeDasharray="3 4" fill="none" />
        </svg>

        {/* European top half */}
        <div className="relative p-4 pb-12">
          <div className="flex items-center gap-1.5 text-[9.5px] font-black tracking-[0.22em] text-cyan-300/80">
            <span className="w-1 h-1 rounded-full bg-cyan-300" /> {m.areas.eu}
          </div>
          <div className="mt-1 text-[18px] font-black leading-tight">{eu.length} <span className="text-muted-foreground text-[12px] font-bold">{m.areas.more.includes("daha") ? "ilçe" : "districts"}</span></div>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {eu.slice(0, 10).map((d) => {
              const slug = DISTRICT_SLUGS[d];
              const chip = <span className="px-2 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[10.5px] font-bold text-slate-200 hover:border-brand-red/50 hover:text-brand-red transition-all">{d}</span>;
              return slug ? <Link key={d} to="/tesisatci/$slug" params={{ slug }}>{chip}</Link> : <span key={d}>{chip}</span>;
            })}
            <span className="px-2 py-1 text-[10.5px] font-black text-brand-red">+{eu.length - 10}</span>
          </div>
        </div>

        {/* Center medallion */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative w-[88px] h-[88px] rounded-full bg-gradient-to-br from-brand-red to-[#7a1313] border-[3px] border-background flex flex-col items-center justify-center text-white shadow-[0_15px_40px_-10px_rgba(226,59,59,0.7)]">
            <span className="absolute inset-0 rounded-full border-2 border-brand-red/40 animate-ping" />
            <Clock className="w-3.5 h-3.5 mb-0.5 opacity-90" />
            <div className="text-[22px] font-black leading-none">30</div>
            <div className="text-[8px] font-black tracking-[0.18em] opacity-90">{m.areas.min}</div>
          </div>
        </div>

        {/* Asian bottom half */}
        <div className="relative p-4 pt-12 text-right">
          <div className="flex items-center justify-end gap-1.5 text-[9.5px] font-black tracking-[0.22em] text-cyan-300/80">
            {m.areas.asia} <span className="w-1 h-1 rounded-full bg-cyan-300" />
          </div>
          <div className="mt-1 text-[18px] font-black leading-tight">{asia.length} <span className="text-muted-foreground text-[12px] font-bold">{m.areas.more.includes("daha") ? "ilçe" : "districts"}</span></div>
          <div className="mt-2.5 flex flex-wrap gap-1 justify-end">
            {asia.slice(0, 10).map((d) => {
              const slug = DISTRICT_SLUGS[d];
              const chip = <span className="px-2 py-1 rounded-md bg-white/[0.05] border border-white/10 text-[10.5px] font-bold text-slate-200 hover:border-brand-red/50 hover:text-brand-red transition-all">{d}</span>;
              return slug ? <Link key={d} to="/tesisatci/$slug" params={{ slug }}>{chip}</Link> : <span key={d}>{chip}</span>;
            })}
            <span className="px-2 py-1 text-[10.5px] font-black text-brand-red">+{asia.length - 10}</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-4 rounded-2xl border border-border bg-surface p-3">
        <Suspense fallback={<div className="h-56 rounded-xl bg-surface-2 animate-pulse" />}>
          <IstanbulServiceMap />
        </Suspense>
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-3 py-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-red/15 text-brand-red shrink-0"><Clock className="h-4 w-4" /></div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{m.areas.avg}</div>
            <div className="text-[16px] font-extrabold leading-tight"><span className="text-brand-red">30</span> {m.areas.min}</div>
          </div>
          <div className="text-[9.5px] leading-tight text-muted-foreground max-w-[7.5rem] text-right">{m.areas.avgDesc}</div>
        </div>
      </div>

      {/* Coupon — ticket style */}
      <div className="relative mt-5 overflow-hidden rounded-2xl border border-brand-red/40 bg-gradient-to-br from-brand-red/30 via-surface to-surface p-4">
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background" />
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background" />
        <div className="flex items-center gap-3">
          <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full border-2 border-dashed border-brand-red bg-brand-red/15 text-brand-red">
            <div className="text-[18px] font-extrabold leading-none">{m.areas.coupon.off}</div>
            <div className="text-[9px] font-bold tracking-wider mt-0.5">{m.areas.coupon.offLabel}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold tracking-widest text-brand-red">{m.areas.coupon.small}</div>
            <div className="mt-0.5 text-[15px] font-extrabold leading-tight">{m.areas.coupon.title}</div>
            <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{m.areas.coupon.desc}</p>
          </div>
        </div>
        <div className="mt-3 rounded-xl border-2 border-dashed border-brand-red/70 bg-brand-red/10 p-3 text-center">
          <div className="text-[10px] font-bold tracking-widest text-muted-foreground">{m.areas.coupon.code}</div>
          <div className="mt-1 text-[20px] font-extrabold tracking-widest text-brand-red">{m.areas.coupon.value}</div>
        </div>
        <div className="mt-2 text-right text-[9.5px] text-muted-foreground">{m.areas.coupon.note}</div>
      </div>

      {/* Call/WA bottom */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <a href={PHONE_TEL} className="flex items-center gap-2 rounded-2xl bg-brand-red p-3 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Phone className="h-4 w-4" /></span>
          <div className="leading-tight min-w-0">
            <div className="text-[10px] font-bold tracking-widest">{m.areas.callTitle}</div>
            <div className="text-[12px] font-extrabold truncate">{PHONE}</div>
            <div className="text-[9px] opacity-90 truncate">{m.areas.callSub}</div>
          </div>
        </a>
        <a href={WA} className="flex items-center gap-2 rounded-2xl bg-brand-green p-3 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><MessageCircle className="h-4 w-4" /></span>
          <div className="leading-tight min-w-0 flex-1">
            <div className="text-[10px] font-bold tracking-widest">{m.areas.waTitle}</div>
            <div className="text-[9.5px] opacity-90 mt-0.5">{m.areas.waSub}</div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </section>
  );
}

function DistrictCard({ icon, title, list, more }: { icon: string; title: string; list: string[]; more: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-3">
      <div className="flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <div className="text-[11px] font-extrabold tracking-wider">{title}</div>
      </div>
      <ul className="mt-2 space-y-1">
        {list.map((d) => {
          const slug = DISTRICT_SLUGS[d];
          const inner = (
            <>
              <CheckCircle2 className="h-3 w-3 text-brand-red shrink-0" />
              <span>{d}</span>
            </>
          );
          return (
            <li key={d} className="text-[11.5px]">
              {slug ? (
                <Link to="/tesisatci/$slug" params={{ slug }} className="flex items-center gap-1.5 hover:text-brand-red">
                  {inner}
                </Link>
              ) : (
                <span className="flex items-center gap-1.5">{inner}</span>
              )}
            </li>
          );
        })}
        <li className="text-[10px] text-muted-foreground italic mt-1">{more}</li>
      </ul>
    </div>
  );
}

// ===== 2. FAQ + Reviews + Newsletter + Contact + Bottom Bar =====
export function FaqReviewsContactSection() {
  const m = useM();
  const [open, setOpen] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  return (
    <section className="px-4 py-10">
      {/* FAQ */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-brand-red">
          <span className="h-px w-6 bg-brand-red" />{m.faq.eyebrow}<span className="h-px w-6 bg-brand-red" />
        </div>
        <h2 className="mt-2 text-[26px] font-extrabold leading-tight">{m.faq.title}</h2>
        <p className="mt-2 text-[13px] text-muted-foreground">{m.faq.desc}</p>
      </div>
      <div className="mt-4 space-y-3">
        {m.faq.items.map((f, i) => {
          const Icons = [Clock, ShieldCheck, Wallet, Calendar];
          const Ic = Icons[i];
          const isOpen = open === i;
          return (
            <button key={i} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-start gap-3 rounded-xl border border-border bg-surface p-3 text-left">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-red/15 text-brand-red shrink-0"><Ic className="h-4 w-4" /></span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-extrabold">{f.q}</div>
                {isOpen && <p className="mt-1 text-[11.5px] text-muted-foreground leading-snug">{f.a}</p>}
              </div>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
          );
        })}
      </div>


      {/* Newsletter */}
      <div className="mt-8 rounded-2xl border border-border bg-surface p-4">
        <div className="text-[10px] font-bold tracking-widest text-brand-red">{m.news.eyebrow}</div>
        <h3 className="mt-1 text-[18px] font-extrabold leading-tight">{m.news.title}</h3>
        <p className="mt-1 text-[12px] text-muted-foreground">{m.news.desc}</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2.5">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={m.news.placeholder} className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-muted-foreground" />
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red py-3 text-[13px] font-extrabold text-white">
          {m.news.cta} <ChevronRight className="h-4 w-4" />
        </button>
        <div className="mt-2 flex items-start gap-1.5 text-[10px] text-muted-foreground">
          <Lock className="h-3 w-3 shrink-0 mt-0.5" />
          <span>{m.news.footer}</span>
        </div>
      </div>

      {/* Contact card */}
      <div className="mt-4 rounded-2xl border border-border bg-surface p-4">
        <div className="text-[10px] font-bold tracking-widest text-brand-red">{m.contact.eyebrow}</div>
        <h3 className="mt-1 text-[18px] font-extrabold">{m.contact.title}</h3>
        <p className="mt-1 text-[12px] text-muted-foreground">{m.contact.desc}</p>
        <ul className="mt-3 space-y-3">
          <ContactRow icon={<Phone className="h-4 w-4" />} top={PHONE} bottom={m.contact.phone} />
          <ContactRow icon={<MessageCircle className="h-4 w-4" />} top={m.contact.waTitle} bottom={m.contact.wa} />
          <ContactRow icon={<Mail className="h-4 w-4" />} top={m.contact.email} bottom={m.contact.emailDesc} />
          <ContactRow icon={<MapPin className="h-4 w-4" />} top={m.contact.office} bottom={m.contact.address} />
        </ul>
      </div>

    </section>
  );
}

function ContactRow({ icon, top, bottom }: { icon: React.ReactNode; top: string; bottom: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-red/15 text-brand-red shrink-0">{icon}</span>
      <div className="leading-tight min-w-0">
        <div className="text-[13px] font-extrabold">{top}</div>
        <div className="text-[11px] text-muted-foreground">{bottom}</div>
      </div>
    </li>
  );
}

// ===== 3. Process steps + Packages + Tips + Emergency =====
export function ProcessPackagesSection() {
  const m = useM();
  return (
    <section className="px-4 py-12 relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-10 -left-10 w-64 h-64 bg-brand-red/15 blur-[100px] rounded-full" />

      {/* Process header */}
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-black tracking-[0.22em]">
          <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-red" /></span>
          {m.process.eyebrow}
        </div>
        <h2 className="mt-3 text-[28px] font-black leading-[0.95] tracking-tight">{m.process.title}</h2>
        <p className="mt-2 text-[12.5px] text-muted-foreground leading-snug">{m.process.desc}</p>
      </div>

      {/* Vertical neon rail timeline */}
      <div className="relative mt-6 pl-12">
        {/* continuous rail */}
        <div className="absolute left-[22px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-brand-red/0 via-brand-red/70 to-brand-red/0" />
        <div className="space-y-3">
          {m.process.steps.map((s, i) => {
            const Icons = [Phone, Calendar, Wrench, ClipboardCheck, ShieldCheck];
            const Ic = Icons[i];
            const isActive = i === 2;
            const isDone = i < 2;
            return (
              <div key={i} className="relative">
                {/* station node */}
                <div className={`absolute -left-12 top-2 w-11 h-11 rounded-[28%] rotate-45 flex items-center justify-center transition-transform ${
                  isActive ? "bg-gradient-to-br from-brand-red to-[#7a1313] shadow-[0_10px_25px_-5px_rgba(226,59,59,0.7)]" :
                  isDone ? "bg-gradient-to-br from-brand-red/80 to-[#7a1313]/70" :
                  "bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10"
                }`}>
                  <Ic className={`w-4 h-4 -rotate-45 ${isActive || isDone ? "text-white" : "text-slate-300"}`} />
                  {isActive && <span className="absolute inset-0 rounded-[28%] border-2 border-brand-red/60 animate-ping" />}
                  <span className={`absolute -top-1.5 -right-1.5 grid h-4 w-4 -rotate-45 place-items-center rounded-full text-[8px] font-black ${
                    isActive ? "bg-white text-brand-red" : isDone ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                  }`}>{i + 1}</span>
                </div>

                {/* card */}
                <div className={`rounded-2xl border p-3.5 transition-all ${
                  isActive ? "border-brand-red/40 bg-gradient-to-br from-brand-red/10 to-transparent shadow-[0_15px_40px_-15px_rgba(226,59,59,0.4)]" :
                  "border-border bg-surface"
                }`}>
                  <div className="text-[13.5px] font-extrabold leading-tight">{s.t}</div>
                  <p className="mt-1 text-[11.5px] text-muted-foreground leading-snug">{s.d}</p>
                  {isActive && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-black text-brand-red">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                      {m.areas.min === "dk" ? "ŞU AN GERÇEKLEŞİYOR" : "HAPPENING NOW"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Care Tiers — premium, no-pricing design */}
      <div className="mt-12 relative">
        <div className="absolute -inset-x-4 -top-4 -bottom-4 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(226,59,59,0.10),transparent_60%)]" />
        <div className="inline-flex items-center gap-2 rounded-full border border-brand-red/30 bg-brand-red/10 px-3 py-1 text-[10.5px] font-black tracking-[0.22em] text-brand-red">
          <ShieldCheck className="h-3 w-3" />{m.packs.eyebrow}
        </div>
        <h2 className="mt-3 text-[24px] font-black leading-[1.1] tracking-tight">{m.packs.title}</h2>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">{m.packs.desc}</p>
      </div>

      <div className="mt-5 space-y-4">
        {m.packs.items.map((p, i) => {
          const isPick = i === 1;
          const tierMeta = [
            { Icon: ShieldCheck, label: "01", accent: "from-sky-500 to-sky-400", ring: "ring-sky-500/30", glow: "shadow-[0_20px_50px_-25px_rgba(14,165,233,0.55)]" },
            { Icon: Zap, label: "02", accent: "from-brand-red to-rose-500", ring: "ring-brand-red/40", glow: "shadow-[0_25px_60px_-20px_rgba(226,59,59,0.55)]" },
            { Icon: Award, label: "03", accent: "from-amber-400 to-yellow-500", ring: "ring-amber-400/40", glow: "shadow-[0_20px_50px_-25px_rgba(245,158,11,0.55)]" },
          ][i];
          const { Icon: TierIcon } = tierMeta;
          const isTR = m.areas.min === "dk";
          return (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border bg-surface/80 backdrop-blur-sm transition-all ${
                isPick ? `border-brand-red/50 ${tierMeta.glow}` : "border-border"
              }`}
            >
              {/* Left tier stripe */}
              <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${tierMeta.accent}`} />
              {/* Subtle grid texture */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] [background-size:18px_18px]" />

              {isPick && (
                <div className="absolute right-0 top-0 flex items-center gap-1.5 rounded-bl-2xl bg-brand-red px-3 py-1.5 text-[9px] font-black tracking-widest text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  {m.packs.mostPicked}
                </div>
              )}

              <div className="relative pl-5 pr-4 pt-4 pb-4">
                {/* Header row */}
                <div className="flex items-start gap-3">
                  <div className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${tierMeta.accent} text-white ring-4 ${tierMeta.ring}`}>
                    <TierIcon className="h-5 w-5" strokeWidth={2.4} />
                    <span className="absolute -bottom-1.5 -right-1.5 grid h-5 w-5 place-items-center rounded-md bg-slate-900 text-[8.5px] font-black tracking-wider text-white ring-2 ring-surface">
                      {tierMeta.label}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-black tracking-wider text-foreground">{p.t}</div>
                    <p className="mt-0.5 text-[11.5px] text-muted-foreground leading-snug">{p.desc}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                {/* Features — 2 columns for density */}
                <ul className="grid grid-cols-1 gap-1.5">
                  {p.features.map((f, k) => (
                    <li key={k} className="flex items-start gap-2 text-[12px] leading-snug">
                      <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gradient-to-br ${tierMeta.accent} text-white`}>
                        <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA row — no pricing */}
                <a
                  href={WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                    isPick
                      ? "border-transparent bg-gradient-to-r from-brand-red to-rose-500 text-white"
                      : "border-border bg-surface-2 text-foreground hover:border-brand-red/40"
                  }`}
                >
                  <span className="text-[11px] font-black tracking-[0.18em]">
                    {isTR ? "DETAYLI BİLGİ AL" : "REQUEST DETAILS"}
                  </span>
                  <span className={`grid h-7 w-7 place-items-center rounded-full ${isPick ? "bg-white/15" : "bg-brand-red text-white"}`}>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer trust strip */}
      <div className="mt-4 flex items-center justify-center gap-4 rounded-xl border border-border bg-surface-2/60 px-3 py-2.5 text-[10.5px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-brand-red" /> {m.areas.min === "dk" ? "Garantili" : "Guaranteed"}</span>
        <span className="h-3 w-px bg-border" />
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand-red" /> 7/24</span>
        <span className="h-3 w-px bg-border" />
        <span className="inline-flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-brand-red" /> {m.areas.min === "dk" ? "Faturalı" : "Invoiced"}</span>
      </div>

      {/* Efficiency tips — Energy Savings Lab */}
      <div className="mt-12">
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-brand-red">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-red/15">
            <Gauge className="h-3 w-3" />
          </span>
          {m.tips.eyebrow}
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-extrabold tracking-widest text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            LIVE METRIC
          </span>
        </div>
        <h2 className="mt-2 text-[24px] font-black leading-[1.1] tracking-tight">
          {m.tips.title}
        </h2>
        <p className="mt-1.5 text-[12.5px] text-muted-foreground">{m.tips.desc}</p>

        {/* Savings meter card */}
        <div className="relative mt-4 overflow-hidden rounded-2xl border border-brand-red/30 bg-gradient-to-br from-brand-red/15 via-surface to-surface p-4">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-red/20 blur-3xl" />
          <div className="relative flex items-end justify-between">
            <div>
              <div className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Potential Annual Saving
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="bg-gradient-to-br from-brand-red to-rose-400 bg-clip-text text-[40px] font-black leading-none text-transparent">
                  %32
                </span>
                <span className="text-[11px] font-bold text-emerald-400">↓ avg.</span>
              </div>
              <div className="mt-1 text-[10.5px] text-muted-foreground">
                Based on 2.500+ household audits
              </div>
            </div>
            <div className="relative grid h-16 w-16 place-items-center">
              <svg viewBox="0 0 40 40" className="absolute inset-0 -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
                <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="32" className="text-brand-red" />
              </svg>
              <Gauge className="h-6 w-6 text-brand-red" />
            </div>
          </div>
          <div className="relative mt-3 h-1 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand-red via-rose-400 to-amber-300" />
          </div>
        </div>

        {/* Tips as numbered ribbon list */}
        <div className="mt-3 space-y-2">
          {m.tips.items.map((t, i) => {
            const Icons = [Home, Thermometer, Zap, Gauge, Calendar];
            const Ic = Icons[i] || Calendar;
            const impacts = ["−12%", "−8%", "−15%", "−5%", "−20%"];
            return (
              <div
                key={i}
                className="group relative flex items-stretch gap-0 overflow-hidden rounded-xl border border-border bg-surface"
              >
                <div className="relative w-9 shrink-0 bg-gradient-to-b from-brand-red/20 to-transparent">
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="text-[14px] font-black tabular-nums text-brand-red">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-brand-red/40 via-border to-transparent" />
                </div>
                <div className="flex flex-1 items-center gap-3 px-3 py-2.5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 ring-1 ring-border">
                    <Ic className="h-4 w-4 text-brand-red" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-[12.5px] font-extrabold leading-tight">{t.t}</div>
                      <span className="ml-auto rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-black tracking-wider text-emerald-400">
                        {impacts[i]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10.5px] leading-snug text-muted-foreground">{t.d}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Emergency banner */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-red/40 bg-gradient-to-br from-brand-red/40 via-surface to-surface p-4">
        <div className="flex items-center gap-3">
          <img src={techThumbs} alt="" loading="lazy" width={120} height={120} className="h-20 w-20 rounded-xl object-cover shrink-0" />
          <div className="min-w-0">
            <h3 className="text-[16px] font-extrabold leading-tight">{m.emergency.title}</h3>
            <p className="mt-1 text-[11.5px] text-muted-foreground">{m.emergency.desc}</p>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[m.emergency.b1, m.emergency.b2, m.emergency.b3].map((b, i) => {
            const Icons = [Headphones, Clock, ShieldCheck];
            const Ic = Icons[i];
            return (
              <div key={i} className="rounded-lg border border-border bg-surface-2 p-2 text-center">
                <Ic className="mx-auto h-4 w-4 text-brand-red" />
                <div className="mt-1 text-[10px] font-bold leading-tight">{b}</div>
              </div>
            );
          })}
        </div>
        <a href={PHONE_TEL} className="mt-3 flex items-center justify-center gap-3 rounded-xl bg-brand-red px-4 py-3 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Phone className="h-4 w-4" /></span>
          <div className="leading-tight">
            <div className="text-[10px] font-bold tracking-widest">{m.emergency.cta}</div>
            <div className="text-[14px] font-extrabold">{PHONE}</div>
            <div className="text-[9px] opacity-90">{m.emergency.phoneSub}</div>
          </div>
        </a>
      </div>
    </section>
  );
}

// ===== 4. Certificates + 6-step + Why Big + Big CTA + Stats =====
export function CertsAndStatsSection() {
  const m = useM();
  return (
    <section className="px-4 py-10">
      {/* Certificates */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.2em] text-brand-red">
          <span className="h-px w-6 bg-brand-red" />{m.certs.eyebrow}<span className="h-px w-6 bg-brand-red" />
        </div>
        <h2 className="mt-2 text-[22px] font-extrabold leading-tight">{m.certs.title}</h2>
        <p className="mt-2 text-[12.5px] text-muted-foreground">{m.certs.desc}</p>
      </div>
      <div className="mt-4 -mx-4 overflow-x-auto scrollbar-none">
        <div className="flex w-max gap-3 px-4">
          {m.certs.items.map((c, i) => (
            <div key={i} className="w-[140px] shrink-0 rounded-xl border border-border bg-surface p-3 text-center">
              <div className="mx-auto grid h-20 w-full place-items-center rounded-lg bg-gradient-to-br from-surface-2 to-surface text-brand-red">
                {i === 4 ? <Award className="h-10 w-10 text-brand-gold" /> : <BadgeCheck className="h-10 w-10" />}
              </div>
              <div className="mt-2 text-[11px] font-extrabold">{c.t}</div>
              <div className="text-[9.5px] text-muted-foreground">{c.d}</div>
            </div>
          ))}
        </div>
      </div>


      {/* Why big — Asymmetric trust bento */}
      <div className="mt-12">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] text-brand-red">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-red text-white">
              <ShieldCheck className="h-3 w-3" />
            </span>
            {m.whyBig.eyebrow}
          </div>
          <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[9px] font-extrabold tracking-widest text-muted-foreground">
            06 REASONS
          </span>
        </div>

        {/* Featured hero tile */}
        <div className="relative mt-3 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-red/25 via-surface to-surface p-4">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-red/30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative flex items-start gap-3">
            <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-red text-white shadow-[0_12px_30px_-10px_rgba(229,25,55,0.6)]">
              <Users className="h-7 w-7" />
              <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[9px] font-black text-brand-red ring-2 ring-surface">
                ★
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[8.5px] font-extrabold tracking-widest text-white/90 ring-1 ring-white/15">
                <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" /> #1 PILLAR
              </div>
              <div className="mt-1.5 text-[14px] font-black leading-tight">{m.whyBig.items[0].t}</div>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                {m.whyBig.items[0].d}
              </p>
            </div>
          </div>
          <div className="relative mt-3 grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
            {[
              { v: "15+", l: "Years" },
              { v: "98%", l: "Repeat" },
              { v: "22m", l: "Arrival" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-[15px] font-black leading-none text-brand-red">{s.v}</div>
                <div className="mt-0.5 text-[8.5px] font-bold uppercase tracking-widest text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining 5 tiles in asymmetric grid */}
        <div className="mt-3 grid grid-cols-6 gap-2.5">
          {m.whyBig.items.slice(1).map((w, i) => {
            const Icons = [ShieldCheck, Clock, Wallet, Headphones, Leaf];
            const Ic = Icons[i];
            // 2 wide + 3 small: tile 0,1 = col-span-3; tiles 2,3,4 = col-span-2
            const wide = i < 2;
            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-xl border border-border bg-surface p-3 ${
                  wide ? "col-span-3" : "col-span-2"
                }`}
              >
                <div className="absolute right-0 top-0 h-12 w-12 -translate-y-4 translate-x-4 rounded-full bg-brand-red/10 blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-1.5">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-red/10 ring-1 ring-brand-red/20">
                      <Ic className="h-3.5 w-3.5 text-brand-red" />
                    </span>
                    <span className="text-[8.5px] font-black tabular-nums text-muted-foreground/70">
                      0{i + 2}
                    </span>
                  </div>
                  <div className={`mt-2 font-extrabold leading-tight ${wide ? "text-[12px]" : "text-[10.5px]"}`}>
                    {w.t}
                  </div>
                  {wide && (
                    <p className="mt-1 text-[10px] leading-snug text-muted-foreground line-clamp-2">{w.d}</p>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-brand-red to-rose-400 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Big CTA with van image */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="relative h-48 w-full bg-surface-2">
          <img src={serviceVan} alt="Gölge Tesisat Service Van" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
        </div>
        <div className="p-4">
          <div className="text-[10px] font-bold tracking-widest text-brand-red">{m.bigCta.eyebrow}</div>
          <h3 className="mt-1 text-[20px] font-extrabold leading-tight">{m.bigCta.title}</h3>
          <p className="mt-1 text-[12px] text-muted-foreground">{m.bigCta.desc}</p>
          <a href={PHONE_TEL} className="mt-3 flex items-center gap-3 rounded-xl bg-brand-red px-3 py-3 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15"><Phone className="h-4 w-4" /></span>
            <div className="leading-tight flex-1">
              <div className="text-[10px] font-bold tracking-widest">{m.areas.callTitle}</div>
              <div className="text-[14px] font-extrabold">{PHONE}</div>
            </div>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="mt-5 rounded-2xl border border-border bg-surface p-3">
        <div className="grid grid-cols-2 gap-3">
          {m.stats.map((s, i) => (
            <div key={i} className="rounded-lg bg-surface-2 p-3">
              <div className="text-[15px] font-extrabold text-brand-red">{s.v}</div>
              <div className="text-[10.5px] text-muted-foreground leading-tight mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
