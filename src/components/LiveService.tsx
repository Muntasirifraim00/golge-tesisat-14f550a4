import { Radio, ShieldCheck, MapPin, Clock } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import liveBoiler from "@/assets/live-boiler-wiring.jpg";
import liveFloor from "@/assets/live-floor-protection.jpg";
import liveJobsite from "@/assets/live-jobsite-prep.jpg";
import liveExterior from "@/assets/live-exterior-mainline.jpg";
import liveCeiling from "@/assets/live-ceiling-access.jpg";
import liveBathroom from "@/assets/live-bathroom-breakout.jpg";
import liveStorefront from "@/assets/live-storefront-linework.jpg";
import liveRoof from "@/assets/live-roof-drainage.jpg";
import liveGasLine from "@/assets/live-gas-line-excavation.jpg";
import liveCommercialShell from "@/assets/live-commercial-boiler-shell.jpg";

type Shot = {
  img: string;
  badge: string;
  title: string;
  body: string;
  meta: string;
  district: string;
  alt: string;
  featured?: boolean;
};

const TR: Shot[] = [
  {
    img: liveBoiler,
    badge: "TİCARİ KAZAN DAİRESİ",
    title: "Müşteri Önünde, Kabloya Kadar Şeffaf",
    body: "Plaza girişinde çalışan bir sistemin başındayız. Yönetici içeride, ustamız ölçümü canlı yapıyor. Ne yaptığımız anlaşılmadan tek vida sökülmez; çünkü kurumsal müşterinin satın aldığı şey yalnızca tamir değil, kontrol hissidir.",
    meta: "Ortalama saha varışı: 28 dk",
    district: "Levent · A+ Plaza",
    alt: "Gölge Tesisat ustası ticari plazada sıcak su kazanını canlı denetliyor",
    featured: true,
  },
  {
    img: liveFloor,
    badge: "EVE ZARAR YOK PROTOKOLÜ",
    title: "İçeri Girmeden Önce Evinize Saygı Girer",
    body: "Markalı zemin koruma serilmeden ekipman ilerlemez. Mermerinize çizik, paspasa çamur, koridora moloz bırakmamak bizim için nezaket değil; premium servis standardıdır.",
    meta: "Her ziyarette uygulanır",
    district: "Etiler · Villa",
    alt: "Gölge Tesisat ekibi müşteri zeminine markalı koruyucu karton seriyor",
  },
  {
    img: liveJobsite,
    badge: "EKİP — TEK BAŞINA DEĞİL",
    title: "Tek Usta Değil, Senkronize Bir Müdahale Ekibi",
    body: "Sahaya iki teknisyen ve tam ekipmanla gireriz. Biri teşhis koyarken diğeri hattı, zemini ve ekipmanı hazırlar. İş bölünmez, süre uzamaz, müşteri bir kişiyi beklerken bütün günü kaybetmez.",
    meta: "2 teknisyen · tam yük araç",
    district: "Beşiktaş · Konut",
    alt: "Gölge Tesisat iki kişilik ekibi tesisat servisi için sahaya hazırlanıyor",
  },
  {
    img: liveExterior,
    badge: "DIŞ HAT & RÖGAR MÜDAHALESİ",
    title: "Bahçede de Aynı Hassasiyet, Aynı Disiplin",
    body: "Villa dış hattında karot, rögar ve ana hat çalışması. Ölçü alınır, sınır çizilir, peyzaj korunur. Büyük iş yapıyoruz diye kaba çalışmıyoruz; tam tersine, hata payı küçüldükçe ustalık büyür.",
    meta: "Karot + nokta tespit",
    district: "Sarıyer · Müstakil",
    alt: "Gölge Tesisat ekibi villa bahçesinde rögar ve ana su hattı çalışması yapıyor",
  },
  {
    img: liveCeiling,
    badge: "ASMA TAVAN · GİZLİ HAT",
    title: "Sızıntının Kaynağına, En Az Açılımla İneriz",
    body: "Tavandaki iz, çoğu zaman sorunun başladığı nokta değildir. Termal ve akustik okumadan sonra yalnızca gerektiği kadar açarız. Gereksiz kırımı azaltmak, hem bütçeyi hem dekorasyonu korur.",
    meta: "Minimum kırım prensibi",
    district: "Kadıköy · İşyeri",
    alt: "Gölge Tesisat ustası asma tavandan gizli su hattını kontrol ediyor",
  },
  {
    img: liveBathroom,
    badge: "BANYO İÇİ ALTYAPI",
    title: "Seramiğin Altını Açıyorsak, Sebebi Kesindir",
    body: "Banyo içinde kırımlı müdahale gerekiyorsa, bu rastgele değil; teyit edilmiş kaçak veya hat revizyonu içindir. Hangi bölgenin neden açıldığını açıklarız, sürpriz alan yaratmayız, işi yarım bırakmayız.",
    meta: "Noktasal kırımlı müdahale",
    district: "Ataşehir · Daire",
    alt: "Gölge Tesisat ustası banyoda kırımlı altyapı müdahalesi yapıyor",
  },
  {
    img: liveStorefront,
    badge: "MAĞAZA CEPHESİ HAT ÇALIŞMASI",
    title: "Açık Alanda Bile Dağınık Değil, Düzenli Çalışırız",
    body: "Dış cephede hat geçişi yapılırken kelepçeden el aletine kadar her şey görünür biçimde düzenlenir. Bu görüntü küçük detay gibi görünür; aslında iş güvenliği, hız ve hata oranı burada başlar.",
    meta: "Saha düzeni · görünür disiplin",
    district: "Ümraniye · Ticari Ünite",
    alt: "Gölge Tesisat ustası mağaza önünde dış hat bağlantısı yapıyor",
  },
  {
    img: liveRoof,
    badge: "ÇATI & YAĞMUR SUYU HATTI",
    title: "Yüksekte Çalışırken de Altımızda Prosedür Var",
    body: "Çatı oluğu ve yağmur suyu inişinde üç kişilik koordinasyonla ilerliyoruz. Biri uygulamada, biri destekte, biri güvenlik ve akış kontrolünde. Çünkü yüksek işlerde hız değil, güvenli hız satın alınır.",
    meta: "3 kişilik saha koordinasyonu",
    district: "Çamlıca · Sosyal Tesis",
    alt: "Gölge Tesisat ekibi binanın çatısında yağmur suyu hattı çalışması yapıyor",
  },
  {
    img: liveGasLine,
    badge: "GAZ HATTI KAZILI MÜDAHALE",
    title: "Zor Hatlarda Çekip Gitmeyiz; Sonuna Kadar İneriz",
    body: "Zemin açılmışsa iş zorlaşmıştır; ama tam da bu yüzden ekip sahayı terk etmez. Hattın altına girer, bağlantıyı temizler, geçişi kontrol eder ve sistemi güvenle teslim ederiz. Ağır iş, ağırbaşlı yönetim ister.",
    meta: "Kazılı derin hat onarımı",
    district: "Sancaktepe · Market Önü",
    alt: "Gölge Tesisat ustası kazılı alanda gaz hattı üzerinde çalışıyor",
  },
  {
    img: liveCommercialShell,
    badge: "TİCARİ EKİPMAN REVİZYONU",
    title: "Endüstriyel Gövdede Çalışırken Acele Değil, Hakimiyet Gerekir",
    body: "Büyük ekipman söküm ve revizyonunda elin değil, kararın titrememesi gerekir. Ölçüm, bağlantı ve tekrar devreye alma sırası bellidir. Bu yüzden kurumsal işler bize emanet edilir; hızımız kadar güvenilirliğimiz yüzünden.",
    meta: "Revizyon + tekrar devreye alma",
    district: "Maslak · Ticari Giriş",
    alt: "Gölge Tesisat ustası ticari girişte büyük ekipman üzerinde revizyon yapıyor",
  },
];

const EN: Shot[] = [
  {
    img: liveBoiler,
    badge: "COMMERCIAL BOILER ROOM",
    title: "In Front of the Client, Clear Down to the Wiring",
    body: "We are working on a live commercial system, not a closed-backroom mystery. The manager stays in the room, diagnostics happen in real time, and no part is touched before the logic is clear. Premium service means visible control.",
    meta: "Average arrival: 28 min",
    district: "Levent · Grade A+ Plaza",
    alt: "Gölge Tesisat technician inspects a live commercial boiler in front of the client",
    featured: true,
  },
  {
    img: liveFloor,
    badge: "NO-DAMAGE-TO-HOME PROTOCOL",
    title: "Respect Enters Your Home Before the Tools Do",
    body: "No tool moves past the threshold until branded floor protection is in place. No scratched marble. No mud on the runner. No rubble trail in the hallway. For us, this is not courtesy theatre; it is baseline premium service.",
    meta: "Applied on every visit",
    district: "Etiler · Villa",
    alt: "Gölge Tesisat crew laying branded protective floor board before entering the home",
  },
  {
    img: liveJobsite,
    badge: "A CREW — NOT A LONE HAND",
    title: "Not One Plumber. A Synchronized Response Team.",
    body: "We enter with two technicians and a full equipment loadout. One diagnoses while the other prepares the line, surface and machinery. The work does not stall, the clock does not drift, and the client does not lose a day waiting on one pair of hands.",
    meta: "2 technicians · full loadout",
    district: "Beşiktaş · Residence",
    alt: "Two Gölge Tesisat technicians preparing equipment on a residential job site",
  },
  {
    img: liveExterior,
    badge: "MAIN LINE & MANHOLE",
    title: "Same Precision Outside, Same Discipline Below Ground",
    body: "Exterior main-line and manhole work at a villa site, with cuts measured, borders respected and landscape protected. Bigger work does not excuse rough work. If anything, the larger the scope, the tighter the standards.",
    meta: "Core-cut + pinpoint tracing",
    district: "Sarıyer · Detached Home",
    alt: "Gölge Tesisat crew working on a manhole and main line in a villa garden",
  },
  {
    img: liveCeiling,
    badge: "CEILING · HIDDEN LINE",
    title: "We Go to the Source of the Leak With the Smallest Opening Possible",
    body: "What shows on the ceiling is rarely where the fault begins. After thermal and acoustic tracing, we open only what is justified. Less damage protects not just the structure, but the budget and the finish.",
    meta: "Minimum-opening principle",
    district: "Kadıköy · Office",
    alt: "Gölge Tesisat technician inspecting a hidden water line through a ceiling access",
  },
  {
    img: liveBathroom,
    badge: "BATHROOM SUBFLOOR WORK",
    title: "If We Open the Tile, There Is a Proven Reason",
    body: "When a bathroom floor is opened, it is never a guess. It follows a confirmed leak path or a line revision requirement. We explain exactly what is being opened and why, so the customer is never left with surprise damage or an unfinished scene.",
    meta: "Targeted breakout only",
    district: "Ataşehir · Apartment",
    alt: "Gölge Tesisat technician performing a targeted bathroom floor breakout",
  },
  {
    img: liveStorefront,
    badge: "STOREFRONT LINEWORK",
    title: "Even in Open-Site Work, We Operate in Order",
    body: "On an exterior storefront line, every clamp, wrench and fitting is laid out with intent. It may look like a small detail, but site order is where safety, speed and low error rates begin. Good work leaves evidence before the repair is even finished.",
    meta: "Site order · visible discipline",
    district: "Ümraniye · Retail Unit",
    alt: "Gölge Tesisat technician working on an exterior storefront service line",
  },
  {
    img: liveRoof,
    badge: "ROOF & RAINWATER LINE",
    title: "At Height, We Sell Safe Speed — Not Just Speed",
    body: "Roof gutter and rainwater line intervention is handled with a three-person field rhythm: one executing, one supporting, one controlling safety and flow. High work should never feel improvised. It should feel managed.",
    meta: "3-person field coordination",
    district: "Çamlıca · Social Facility",
    alt: "Gölge Tesisat team working on roof rainwater drainage lines",
  },
  {
    img: liveGasLine,
    badge: "EXCAVATED GAS LINE",
    title: "When the Line Gets Hard, We Go Deeper — Not Home",
    body: "If the ground is open, the job has already become serious. That is exactly when the crew stays composed, gets under the line, cleans the connection and restores the system safely. Difficult work requires calm management more than bravado.",
    meta: "Deep-line repair under excavation",
    district: "Sancaktepe · Storefront",
    alt: "Gölge Tesisat technician working under an excavated gas line",
  },
  {
    img: liveCommercialShell,
    badge: "COMMERCIAL EQUIPMENT REVISION",
    title: "On Industrial Shells, Speed Matters Less Than Command",
    body: "Large equipment revision is not about rushing the hands. It is about controlling the sequence: measurement, connection, isolation and recommissioning. Corporate clients trust us not only because we move fast, but because we remain dependable under pressure.",
    meta: "Revision + recommissioning",
    district: "Maslak · Commercial Entrance",
    alt: "Gölge Tesisat technician performing a commercial equipment shell revision",
  },
];

export function LiveService() {
  const { lang } = useLang();
  const en = lang === "en";
  const items = en ? EN : TR;

  return (
    <section id="live-service" className="relative overflow-hidden bg-[#06080d] px-4 py-12 text-white lg:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brand-red/25 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-[110px]" />

      <div className="relative lg:mx-auto lg:max-w-[1320px] lg:px-8">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
              {en ? "REAL JOB SITE PHOTOS" : "GERÇEK SAHA KARELERİ"}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <Radio className="mr-1 inline h-3 w-3" /> IST · 24/7
          </span>
        </div>

        <div className="mt-6 max-w-3xl">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-gold">
            — 002 / FIELD PROOF
          </span>
          <h2 className="mt-2 text-[30px] font-black leading-[1.05] tracking-tight lg:text-[44px]">
            {en ? (
              <>
                Not Portfolio Shots.{' '}
                <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
                  Operational Proof.
                </span>
              </>
            ) : (
              <>
                Portföy Fotoğrafı Değil.{' '}
                <span className="bg-gradient-to-r from-red-400 via-orange-300 to-red-500 bg-clip-text text-transparent">
                  Operasyon Kanıtı.
                </span>
              </>
            )}
          </h2>
          <p className="mt-3 border-l-2 border-brand-red/60 pl-3 text-[14px] leading-relaxed text-slate-300 lg:text-[16px]">
            {en
              ? "Every frame below is from a real Gölge Tesisat site: real uniforms, real dust, real protective prep, real heavy-line work. No stock imagery. No staged poses. Just the standard your property receives when the team arrives."
              : "Aşağıdaki her kare gerçek bir Gölge Tesisat sahasından gelir: gerçek üniforma, gerçek toz, gerçek zemin koruma, gerçek ağır hat işi. Stok görsel yok. Kurgulanmış poz yok. Ekibimiz geldiğinde mülkünüze uygulanan standardın kendisi var."}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((s, i) => (
            <article
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-transform hover:-translate-y-0.5 ${
                s.featured ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className={`relative w-full overflow-hidden ${s.featured ? "aspect-[4/5] lg:h-[620px] lg:aspect-auto" : "aspect-[4/5]"}`}>
                <img
                  src={s.img}
                  alt={s.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/30 to-transparent" />

                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-brand-red/95 px-2 py-1 font-mono text-[9px] font-extrabold uppercase tracking-[0.15em] text-white shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  {en ? "FIELD" : "SAHA"}
                </div>
                <div className="absolute right-3 top-3 max-w-[60%] rounded-md bg-black/60 px-2 py-1 text-right font-mono text-[9px] font-bold uppercase tracking-wider text-brand-gold backdrop-blur">
                  {s.badge}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5">
                <h3 className="text-[16px] font-extrabold leading-tight text-white lg:text-[18px]">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-300 lg:text-[13.5px]">
                  {s.body}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3 text-brand-red" /> {s.meta}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-brand-red" /> {s.district}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur-xl lg:items-center">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-red lg:mt-0" />
          <p className="text-[11.5px] leading-snug text-slate-300 lg:text-[13px]">
            {en ? (
              <>
                <span className="font-bold text-white">Insured crew. Branded protection. Same-day visual reporting.</span>{" "}
                The photos are taken on duty, on site, during real interventions. They do not decorate the service — they document the standard.
              </>
            ) : (
              <>
                <span className="font-bold text-white">Sigortalı ekip. Markalı koruma. Aynı gün görsel raporlama.</span>{" "}
                Fotoğraflar gerçek müdahale anında, görevli ekip tarafından çekilir. Hizmeti süslemek için değil, standardı belgelemesi için vardır.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
