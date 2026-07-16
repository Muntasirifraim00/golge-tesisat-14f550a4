import { Camera, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import boilerCommercial from "@/assets/work-boiler-commercial.jpg";
import gasWeld from "@/assets/work-gas-weld.jpg";
import gasInstall from "@/assets/work-gas-install.jpg";
import mosque from "@/assets/work-mosque.jpg";
import cleanHome from "@/assets/work-clean-home.jpg";
import bathLeak from "@/assets/work-bath-leak.jpg";
import ceilingAccess from "@/assets/work-ceiling-access.jpg";
import villaExterior from "@/assets/work-villa-exterior.jpg";
import homeProtectionEntry from "@/assets/work-home-protection-entry.jpg";
import homeProtectionDetail from "@/assets/work-home-protection-detail.jpg";
import boilerBriefing from "@/assets/work-boiler-briefing.jpg";
import boilerLift from "@/assets/work-boiler-lift.jpg";

type Item = {
  img: string;
  tag: string;
  title: string;
  outcome: string;
  alt: string;
};

const TR: Item[] = [
  {
    img: boilerCommercial,
    tag: "TİCARİ TESİSAT",
    title: "Ofis Girişinde Kazan Müdahalesi",
    outcome: "Yaya akışını durdurmadan, kontrollü söküm ve aynı gün devreye alma.",
    alt: "Gölge Tesisat ekibi plaza girişinde sıcak su kazanı onarımı yapıyor",
  },
  {
    img: boilerBriefing,
    tag: "KURUMSAL SAHA",
    title: "Arıza Öncesi Değil, Süreç Boyunca Bilgilendirme",
    outcome: "Sahada yalnızca onarım değil; iş planı, risk ve teslim adımları da net konuşulur.",
    alt: "Gölge Tesisat ustası ticari alanda kazan önünde müşteriye bilgi veriyor",
  },
  {
    img: boilerLift,
    tag: "AĞIR EKİPMAN",
    title: "Eski Boylerin Güvenli Sökümü",
    outcome: "Dar alan, ağır yük, kontrollü taşıma — ekipman ve alan güvenliği birlikte yönetilir.",
    alt: "Gölge Tesisat ekibi ticari binada büyük boyler sökümü yapıyor",
  },
  {
    img: gasWeld,
    tag: "DOĞALGAZ HATTI",
    title: "Sertifikalı Kaynak, Testli Teslim",
    outcome: "Sahada estetik değil güven konuşur; hat, ölçü ve basınç kontrolüyle tamamlanır.",
    alt: "Gölge Tesisat ustası sarı doğalgaz hattında kaynak yapıyor",
  },
  {
    img: gasInstall,
    tag: "DIŞ CEPHE TESİSATI",
    title: "Sayaçtan Cihaza Kadar Disiplinli Hat Kurulumu",
    outcome: "Bağlantı noktaları düzenli, taşıyıcılar sağlam, uygulama uzun ömür odaklı.",
    alt: "Gölge Tesisat ustası bina dış cephesinde doğalgaz hattı montajı yapıyor",
  },
  {
    img: villaExterior,
    tag: "VİLLA PROJESİ",
    title: "Dış Hat Açımı ve Altyapı Hazırlığı",
    outcome: "Kazı, yön tayini ve uygulama akışı tek ekipte toplanır; iş yarım bırakılmaz.",
    alt: "Gölge Tesisat ekibi villa dış hattında altyapı hazırlığı yapıyor",
  },
  {
    img: mosque,
    tag: "KURUMSAL PROJE",
    title: "Cami Yağmur Oluğu Yenileme",
    outcome: "Sökümden montaja kadar tek gün içinde düzenli, kontrollü ve temiz ilerleme.",
    alt: "Gölge Tesisat ekibi camide yağmur oluğu montajı yapıyor",
  },
  {
    img: ceilingAccess,
    tag: "TAVAN ÜSTÜ HAT",
    title: "Kapalı Tesisatta Nokta Erişim",
    outcome: "Gereksiz kırım yerine doğru noktadan açılım; içeride hız, sonrasında düzen.",
    alt: "Gölge Tesisat ustası tavandaki tesisat hattına müdahale ediyor",
  },
  {
    img: cleanHome,
    tag: "EVE SAYGI",
    title: "Kapıdan İçeri Hizmet Disipliniyle Gireriz",
    outcome: "Ayakkabı koruyucu, geçiş planı ve zemin koruması işin başında devreye alınır.",
    alt: "Gölge Tesisat ustası eve girerken yer örtüsü ve ayakkabı koruyucu kullanıyor",
  },
  {
    img: homeProtectionEntry,
    tag: "TEMİZ ÇALIŞMA",
    title: "İç Mekânda İlk Adım: Koruma",
    outcome: "Onarım başlamadan önce evin geçiş hattı korunur; konforunuz ikinci plana atılmaz.",
    alt: "Gölge Tesisat ekibi ev içine koruyucu yer örtüsü seriyor",
  },
  {
    img: homeProtectionDetail,
    tag: "DETAY STANDARDI",
    title: "Sadece Arızayı Değil, Evi de Koruyoruz",
    outcome: "Sahadaki kalite, çözüm kadar bıraktığımız düzenle de ölçülür.",
    alt: "Gölge Tesisat ekibi ev içi zemin korumasını detaylı şekilde hazırlıyor",
  },
  {
    img: bathLeak,
    tag: "SU KAÇAĞI",
    title: "Banyo Altı Kaçakta Hassas Müdahale",
    outcome: "Soruna ulaşmak için minimum açılım, çözümden sonra toparlı bir teslim.",
    alt: "Gölge Tesisat ustası banyoda su kaçağı tespiti ve onarımı yapıyor",
  },
];

const EN: Item[] = [
  {
    img: boilerCommercial,
    tag: "COMMERCIAL PLUMBING",
    title: "Boiler Intervention at an Office Entrance",
    outcome: "Controlled removal and same-day restart without shutting down circulation.",
    alt: "Gölge Tesisat crew repairing a commercial boiler at an office entrance",
  },
  {
    img: boilerBriefing,
    tag: "ENTERPRISE SITE",
    title: "Clear Briefing, Not Just Repair",
    outcome: "On site, we explain the plan, the risk points and the delivery path — not only the fix.",
    alt: "Gölge Tesisat technician briefing a client in front of a commercial boiler",
  },
  {
    img: boilerLift,
    tag: "HEAVY EQUIPMENT",
    title: "Safe Removal of an Old Boiler Tank",
    outcome: "Tight space, heavy load, controlled handling — safety for both site and equipment.",
    alt: "Gölge Tesisat team removing a large boiler tank inside a commercial building",
  },
  {
    img: gasWeld,
    tag: "GAS LINE",
    title: "Certified Welding, Tested Delivery",
    outcome: "On gas work, appearance comes second — line accuracy and pressure control come first.",
    alt: "Gölge Tesisat technician welding a yellow natural gas line",
  },
  {
    img: gasInstall,
    tag: "EXTERIOR PIPEWORK",
    title: "Disciplined Installation from Meter to Unit",
    outcome: "Clean routing, secure supports and a long-life application standard.",
    alt: "Gölge Tesisat technician installing exterior gas pipework",
  },
  {
    img: villaExterior,
    tag: "VILLA PROJECT",
    title: "Exterior Line Opening & Infrastructure Prep",
    outcome: "Excavation, routing and execution stay under one team — no fragmented handoff.",
    alt: "Gölge Tesisat crew preparing exterior plumbing infrastructure at a villa",
  },
  {
    img: mosque,
    tag: "INSTITUTIONAL PROJECT",
    title: "Mosque Rain-Gutter Renewal",
    outcome: "From removal to installation, the entire sequence moves in one controlled day.",
    alt: "Gölge Tesisat crew installing rain gutters at a mosque",
  },
  {
    img: ceilingAccess,
    tag: "CEILING LINE",
    title: "Point Access in a Closed Ceiling System",
    outcome: "Access opened exactly where needed — less break-out, faster recovery, cleaner finish.",
    alt: "Gölge Tesisat technician accessing a plumbing line through the ceiling",
  },
  {
    img: cleanHome,
    tag: "RESPECT FOR HOME",
    title: "Service Enters with Discipline",
    outcome: "Shoe protection, route planning and floor care start before the tools do.",
    alt: "Gölge Tesisat technician using floor protection while entering a home",
  },
  {
    img: homeProtectionEntry,
    tag: "CLEAN WORK",
    title: "First Step Indoors: Protection",
    outcome: "Before repair begins, the path through the home is protected end to end.",
    alt: "Gölge Tesisat team laying protective floor covering inside a home",
  },
  {
    img: homeProtectionDetail,
    tag: "DETAIL STANDARD",
    title: "We Protect the Home, Not Only the Fix",
    outcome: "Quality on site is measured by the order we leave behind as much as the repair itself.",
    alt: "Gölge Tesisat team carefully preparing floor protection indoors",
  },
  {
    img: bathLeak,
    tag: "WATER LEAK",
    title: "Precise Intervention for an Under-Bath Leak",
    outcome: "Minimal opening to reach the issue, orderly handover once the repair is complete.",
    alt: "Gölge Tesisat technician fixing an under-bath water leak",
  },
];

export function FromTheField() {
  const { lang } = useLang();
  const en = lang === "en";
  const list = en ? EN : TR;

  return (
    <section className="bg-background px-5 py-10">
      <div className="mb-6 text-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          <Camera className="h-3 w-3" />
          {en ? "FROM THE FIELD" : "SAHADAN KARELER"}
        </span>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-foreground">
          {en ? (
            <>
              Real work, <span className="text-primary">real operating standards</span>
            </>
          ) : (
            <>
              Gerçek iş, <span className="text-primary">gerçek çalışma standardı</span>
            </>
          )}
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          {en
            ? "Every frame shows the same thing: disciplined entry, measured intervention and a site we leave behind in order."
            : "Her kare aynı şeyi gösteriyor: kontrollü giriş, ölçülü müdahale ve arkamızda düzen bırakan bir çalışma disiplini."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {list.map((it, i) => (
          <article
            key={it.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted to-muted/60">
              <img
                src={it.img}
                alt={it.alt}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute left-2 top-2 rounded-full bg-brand-red px-2 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.12em] text-white shadow-md ring-1 ring-white/20">
                {it.tag}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-2.5">
              <h3 className="text-[12px] font-bold leading-snug text-foreground">
                {it.title}
              </h3>
              <p className="text-[10.5px] leading-snug text-muted-foreground">
                {it.outcome}
              </p>
              <div className="mt-auto flex items-center gap-1 border-t border-border/60 pt-1.5 text-[8.5px] font-semibold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-2.5 w-2.5" />
                {en ? "Site standard" : "Saha standardı"}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
