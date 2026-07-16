import { Award, Wrench, Star } from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";
import techMehmet from "@/assets/tech-mehmet.jpg";
import techAhmet from "@/assets/tech-ahmet.jpg";
import techHasan from "@/assets/tech-hasan.jpg";
import techEmre from "@/assets/tech-emre.jpg";

const TECHNICIANS_TR = [
  { name: "Rahmi Usta", photo: techHasan, role: "Baş Tesisat Ustası", years: 24, jobs: "3.600+", rating: 5.0, specialties: ["Su Kaçağı Tespiti", "Ana Boru", "Doğalgaz"] },
  { name: "Haşim Usta", photo: techMehmet, role: "Kombi & Petek Uzmanı", years: 18, jobs: "2.450+", rating: 4.9, specialties: ["Kombi Servisi", "Petek Temizliği", "Radyatör"] },
  { name: "Hasan Usta", photo: techAhmet, role: "Acil Müdahale Şefi", years: 15, jobs: "2.100+", rating: 5.0, specialties: ["Tıkanıklık", "Pissu Hattı", "Kamera Görüntüleme"] },
  { name: "Bekir Usta", photo: techEmre, role: "Doğalgaz Uzmanı", years: 12, jobs: "1.700+", rating: 4.9, specialties: ["Doğalgaz Tesisatı", "Sızıntı Testi", "Sayaç"] },
  { name: "Emin Usta", photo: techHasan, role: "Kamera Tespit Uzmanı", years: 13, jobs: "1.550+", rating: 4.9, specialties: ["Robotik Kamera", "Nokta Tespit", "Su Kaçağı"] },
  { name: "Hüseyin Usta", photo: techMehmet, role: "Banyo & Tadilat Ustası", years: 17, jobs: "1.900+", rating: 4.9, specialties: ["Banyo Tadilatı", "Seramik", "Armatür"] },
  { name: "Cemil Usta", photo: techAhmet, role: "Pissu Hattı Uzmanı", years: 14, jobs: "1.800+", rating: 4.8, specialties: ["Tıkanıklık Açma", "Yüksek Basınç", "Rögar"] },
  { name: "Hayrettin Usta", photo: techEmre, role: "Genç Teknisyen", years: 7, jobs: "1.050+", rating: 4.8, specialties: ["Klima Tesisatı", "Acil Müdahale", "Armatür"] },
];
const TECHNICIANS_EN = [
  { name: "Rahmi", photo: techHasan, role: "Lead Plumber", years: 24, jobs: "3,600+", rating: 5.0, specialties: ["Leak Detection", "Main Line", "Natural Gas"] },
  { name: "Haşim", photo: techMehmet, role: "Boiler & Radiator Specialist", years: 18, jobs: "2,450+", rating: 4.9, specialties: ["Boiler Service", "Radiator Cleaning", "Heating"] },
  { name: "Hasan", photo: techAhmet, role: "Emergency Response Lead", years: 15, jobs: "2,100+", rating: 5.0, specialties: ["Unclogging", "Sewer Line", "Camera Inspection"] },
  { name: "Bekir", photo: techEmre, role: "Natural Gas Specialist", years: 12, jobs: "1,700+", rating: 4.9, specialties: ["Gas Installation", "Leak Testing", "Meters"] },
  { name: "Emin", photo: techHasan, role: "Camera Inspection Expert", years: 13, jobs: "1,550+", rating: 4.9, specialties: ["Robotic Camera", "Pinpoint Detection", "Leak Tracing"] },
  { name: "Hüseyin", photo: techMehmet, role: "Bath & Renovation Pro", years: 17, jobs: "1,900+", rating: 4.9, specialties: ["Bath Renovation", "Tiling", "Fixtures"] },
  { name: "Cemil", photo: techAhmet, role: "Sewer Line Specialist", years: 14, jobs: "1,800+", rating: 4.8, specialties: ["Drain Clearing", "Hydro Jetting", "Manholes"] },
  { name: "Hayrettin", photo: techEmre, role: "Junior Technician", years: 7, jobs: "1,050+", rating: 4.8, specialties: ["AC Plumbing", "Emergency Calls", "Fixtures"] },
];

export function MeetTechnicians() {
  const { lang } = useLang();
  const en = lang === "en";
  const list = en ? TECHNICIANS_EN : TECHNICIANS_TR;
  return (
    <section className="bg-background px-5 py-10 lg:py-20">
      <div className="lg:mx-auto lg:max-w-[1320px] lg:px-8">
      <div className="mb-6 text-center lg:mb-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary lg:text-[12px]">
          {en ? "Our Team" : "Ekibimiz"}
        </span>
        <h2 className="mt-2 text-2xl font-bold leading-tight text-foreground lg:text-[40px]">
          {en ? <>Meet the <span className="text-primary">Technicians</span></> : <>Kapınıza Gelecek <span className="text-primary">Ustalarımız</span></>}
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground lg:max-w-2xl lg:text-[16px]">
          {en ? "Insured, certified, ID-carded. Each pro has years of expertise." : "Sigortalı, sertifikalı, kimlik kartlı. Her usta yıllarca alanında uzmanlaştı."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {list.map((t) => (
          <article key={t.name} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="relative aspect-[4/5] bg-muted">
              <img src={t.photo} alt={`${t.name} - ${t.role}`} width={512} height={640} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur">
                <Star className="h-2.5 w-2.5 fill-yellow-500 text-yellow-500" />
                {t.rating}
              </div>
              <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                {t.years} {en ? "yrs" : "yıl"}
              </div>
            </div>

            <div className="p-3">
              <h3 className="text-sm font-bold text-foreground">{t.name}</h3>
              <p className="text-[11px] font-medium text-primary">{t.role}</p>

              <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground">
                <Wrench className="h-3 w-3" />
                <span>{t.jobs} {en ? "jobs completed" : "tamamlanan iş"}</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {t.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-medium text-foreground">{s}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-3 text-center">
        <Award className="h-4 w-4 shrink-0 text-primary" />
        <p className="text-[11px] text-foreground">
          {en ? <>All our pros are <strong>TSE certified</strong> and <strong>insured</strong>. They show ID on arrival.</>
              : <>Tüm ustalarımız <strong>TSE belgeli</strong> ve <strong>sigortalıdır</strong>. Geldiklerinde kimlik kartı gösterirler.</>}
        </p>
      </div>
      </div>
    </section>
  );
}
