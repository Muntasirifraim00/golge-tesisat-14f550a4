export type ServiceIcon =
  | "leak"
  | "clog"
  | "combi"
  | "radiator"
  | "gas"
  | "camera"
  | "shower"
  | "faucet"
  | "pump";

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: ServiceIcon;
  responseMin: number;
  tagline: string;
  intro: string;
  includes: string[];
  highlights: string[];
  faq: { q: string; a: string }[];
  // Phase 6 — service hub depth: "nasıl yapılır" explainer + transparent pricing logic.
  howTitle: string;
  howIntro: string;
  process: { step: string; detail: string }[];
  priceIntro: string;
  priceFactors: string[];
  // Phase 11 — SERP gap deep-content blocks (optional; populated per-service as the
  // 13-part location plan deepens each one). Render conditionally on location pages.
  symptoms?: { title: string; detail: string }[];
  emergencySteps?: { step: string; detail: string }[];
  tools?: { name: string; detail: string }[];
  variants?: { title: string; detail: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "su-kacagi-tespiti",
    name: "Su Kaçağı Tespiti",
    shortName: "Su Kaçağı",
    icon: "leak",
    responseMin: 30,
    tagline: "Kırma-dökme yapmadan noktasal tespit",
    intro:
      "İstanbul genelinde termal kamera ve akustik dinleme cihazlarıyla su kaçağını milimetrik hassasiyetle tespit ediyoruz. Duvarı, zemini gereksiz yere kırmadan kaçağın tam noktasını bulur, onarımı aynı gün tamamlarız.",
    includes: [
      "Termal kamera ile gizli boru taraması",
      "Akustik dinleme cihazıyla noktasal tespit",
      "Basınç testi ile sızıntı doğrulaması",
      "Hasarsız müdahale, minimum kırım",
      "Tespit sonrası onarım ve garanti",
    ],
    highlights: [
      "Faturanız normalden yüksek geliyorsa ücretsiz ön değerlendirme",
      "Tespit raporu sigorta başvurularında geçerli",
      "Tüm işçilik 2 yıl garantili",
    ],
    faq: [
      {
        q: "Su kaçağı tespiti ne kadar sürer?",
        a: "Termal kamera ve akustik cihazlarla noktasal tespit ortalama 30-60 dakika sürer ve kırma-dökme yapılmadan gerçekleştirilir.",
      },
      {
        q: "Duvarı kırmadan kaçak bulunur mu?",
        a: "Evet. Termal görüntüleme ve akustik dinleme ile kaçağın tam noktasını buluruz; sadece o noktaya müdahale ederiz, gereksiz kırım yapmayız.",
      },
      {
        q: "Tespit için ücret alıyor musunuz?",
        a: "Keşif ve fiyat teklifi ücretsizdir. Onayınız olmadan işlem başlatılmaz.",
      },
      {
        q: "Su kaçağı olduğu nasıl anlaşılır?",
        a: "En sık görülen belirtiler: tüm musluklar kapalıyken su sayacının dönmeye devam etmesi, faturanın açıklanamayan şekilde artması, duvar veya tavanda nem-küf lekesi ve kabaran boya, sıva altından gelen sürekli akma sesi, sıcak su hattı kaçağında ısınan zemin ve düşen su basıncıdır. Bu işaretlerden biri varsa tesisat su kaçağı tespiti yaptırmak, hasar büyümeden çözmenizi sağlar.",
      },
      {
        q: "Kameralı (termal) su kaçağı tespiti yapıyor musunuz?",
        a: "Evet. Termal kamera ve akustik dinleme cihazlarıyla gizli boru hatlarını tarıyor, kaçağın güzergâhını ve tam noktasını görüntüleyerek belirliyoruz; gerekli durumlarda boru içi kamerayla gider hattını da inceliyoruz.",
      },
      {
        q: "Su kaçağı tespiti fiyatları neye göre belirlenir?",
        a: "Fiyat; kaçağın türüne (temiz su, gider veya ısıtma hattı), yerine ve derinliğine, kullanılan tespit yöntemine ve onarımın kapsamına göre değişir. Keşif ücretsizdir; kesin fiyatı işe başlamadan önce net olarak onayınıza sunarız.",
      },
    ],
    howTitle: "Su Kaçağı Tespiti Nasıl Yapılır?",
    howIntro:
      "Su kaçağı tespiti tahminle değil, ölçümle yapılır. Cihaz destekli yöntemimiz sayesinde kaçağın tam noktasını duvarı baştan sona kırmadan bulur, yalnızca gereken noktaya müdahale ederiz.",
    process: [
      {
        step: "Ücretsiz keşif ve ön değerlendirme",
        detail:
          "Su sayacı, tesisat hattı ve şüpheli alanları inceleyip kaçağın hangi sistemde (temiz su, gider, ısıtma) olduğunu belirleriz.",
      },
      {
        step: "Termal kamera ile tarama",
        detail:
          "Duvar ve zemin yüzeyindeki ısı farklarını görüntüleyerek sıcak/soğuk su kaçağının izlediği güzergâhı haritalandırırız.",
      },
      {
        step: "Akustik dinleme ile noktasal tespit",
        detail:
          "Hassas dinleme cihazıyla borudan gelen kaçak sesini dinler, kaçağın tam noktasını santim hassasiyetinde işaretleriz.",
      },
      {
        step: "Doğrulama, onarım ve garanti",
        detail:
          "Basınç testiyle teşhisi doğrular, onayınızdan sonra yalnızca o noktayı açarak onarımı yapar ve işçiliği garanti altına alırız.",
      },
    ],
    priceIntro:
      "Su kaçağı tespitinde sabit bir liste fiyatı vermek doğru olmaz; ücret kaçağın türüne ve erişim zorluğuna göre değişir. Keşif ücretsizdir ve işe başlamadan net fiyatı onayınıza sunarız.",
    priceFactors: [
      "Kaçağın türü: temiz su, gider veya ısıtma (petek) hattı",
      "Kaçağın yeri ve derinliği (duvar içi, zemin altı, kat farkı)",
      "Kullanılan tespit yöntemi (termal kamera, akustik, basınç testi)",
      "Onarımın kapsamı ve değişecek malzeme",
      "Erişim zorluğu ve mevcut tesisatın durumu",
    ],
    symptoms: [
      {
        title: "Sayaç kapalıyken dönüyor",
        detail: "Evdeki tüm musluklar kapalı olmasına rağmen su sayacının kırmızı ibresi dönmeye devam ediyorsa, bu gizli bir su kaçağının en kesin işaretidir.",
      },
      {
        title: "Açıklanamayan yüksek fatura",
        detail: "Ortalama bir hane ayda 8-12 m³ su tüketir. Faturanız kullanım alışkanlığınız değişmediği halde 20 m³'ü aşıyorsa kaçak araştırması şarttır.",
      },
      {
        title: "Duvar/tavanda nem, küf ve kabaran boya",
        detail: "Genellikle duvarın alt kısımlarında başlayan boya kabarması, sararma ve küf, sızıntının en az 1-2 haftadır devam ettiğini gösterir.",
      },
      {
        title: "Derz ve fayans aralarında kararma",
        detail: "Seramik aralarındaki derz dolgularının siyahlaşması ya da renk değiştirmesi, zeminin altındaki sürekli nemlenmenin açık göstergesidir.",
      },
      {
        title: "Alt kat tavanından damlama",
        detail: "Banyonuza tadilat yaptırdığınız halde alt katın tavanındaki sararma veya damlama sürüyorsa, kaçak hâlâ aktif demektir.",
      },
      {
        title: "Düşen su basıncı / kombi basıncı",
        detail: "Musluktan gelen suyun basıncının düşmesi ya da kombi barometresinin sürekli düşmesi, sıcak su veya ısıtma hattında kaçak olduğuna işarettir.",
      },
    ],
    emergencySteps: [
      {
        step: "Ana vanayı kapatın",
        detail: "Su saatinin yanındaki ana vanayı çevirerek kapatın. Bu tek adım bile sızıntının yayılmasını anında durdurur.",
      },
      {
        step: "Elektriği kesin",
        detail: "Islaklık priz, lamba veya pano çevresindeyse ilgili sigortaları indirin. Su ile elektriğin birleşimi hayati tehlike oluşturur.",
      },
      {
        step: "Kombiyi durdurun",
        detail: "Kombi basıncı sürekli düşüyorsa cihazı kapatın. Kaçaklı bir sistemde kombiyi çalıştırmak hem arızayı hem faturayı büyütür.",
      },
      {
        step: "Komşunuzu bilgilendirin",
        detail: "Su üst kattan geliyorsa komşunuzdan vanasını kapatmasını rica edin. İş birliği, onarım sürecini ortalama 2 saat kısaltır.",
      },
    ],
    tools: [
      {
        name: "Akustik dinleme cihazı",
        detail: "Birincil tespit cihazımızdır. Boru güzergâhı boyunca suyun sızıntı noktasında çıkardığı frekans değişimini dinleyerek kaçağın tam noktasını verir; sert zeminli şebeke hatlarında en hassas sonucu sağlar.",
      },
      {
        name: "Termal (kızılötesi) kamera",
        detail: "Sıcak su ve kalorifer hatlarında ısı haritası çıkarır. Duvar ve zemindeki sıcaklık farklarını görüntüye dönüştürerek kaçağın izlediği güzergâhı daraltır; akustik dinleme ile teyit edilir.",
      },
      {
        name: "Boru içi (gider) kamerası",
        detail: "Pis su hatlarındaki kırık, çökme veya conta sıyrılması gibi fiziksel hasarları esnek kabloyla borunun içine girerek canlı görüntüler ve ekranda size gösteririz.",
      },
      {
        name: "Nem ölçer",
        detail: "Duvar ve zemin yüzeyinin birkaç santim derinliğine kadar nem seviyesini dijital ölçer; sızıntının yoğunlaştığı bölgeyi hızla daraltmaya yarar.",
      },
      {
        name: "Basınç test pompası",
        detail: "Onarım sonrası tesisata basınç uygulayarak sızdırmazlığı doğrularız. Başarılı test sonucunda işçiliğe garanti belgesi düzenlenir.",
      },
    ],
    variants: [
      {
        title: "Banyo ve tuvalet kaçakları",
        detail: "Evde en çok boru banyodadır. Duş gideri contaları, derz dolgusu bozulması ve yer süzgeci izolasyonunun çökmesi en sık kaçak sebepleridir; çoğu kez fayans kırılmadan onarılır.",
      },
      {
        title: "Gömme rezervuar (asma klozet) kaçağı",
        detail: "Duvar içine gizlenen rezervuar deposundaki sızıntı ve klozetin pis su borusuna tam oturmaması dışarıdan fark edilmez; çoğu kez kötü koku ilk uyarıdır.",
      },
      {
        title: "Kalorifer ve kombi tesisatı kaçağı",
        detail: "Kapalı devre ısıtmada, özellikle yerden ısıtmalı sistemlerde kırmadan kimyasal sızdırmazlık yöntemiyle kaçağı içeriden kapatarak binlerce liralık kırım maliyetini önleriz.",
      },
      {
        title: "Parke / zemin altı kaçağı",
        detail: "Parke altındaki izolasyon dinlemeyi zorlaştırsa da kaçağı eksiksiz tespit ederiz. Onarımdan sonra zemin tam kurumadan kapatılırsa parkede kabarma olur; kuruma 3-7 gün sürebilir.",
      },
      {
        title: "Dış alan ve bahçe kaçağı",
        detail: "Toprak veya beton altından geçen ana hat kaçaklarında 3 metre derinliğe kadar etkili geniş alan mikrofonlu cihazlarla, site bahçesi ve bina dışı hatlarda dahi noktasal tespit yaparız.",
      },
    ],
  },
  {
    slug: "tikaniklik-acma",
    name: "Tıkanıklık Açma",
    shortName: "Tıkanıklık",
    icon: "clog",
    responseMin: 30,
    tagline: "Robotik makineyle hızlı gider açma",
    intro:
      "Lavabo, tuvalet, mutfak gideri ve ana pis su hattındaki tıkanıklıkları robotik spiral makineler ve yüksek basınçlı su jetiyle açıyoruz. 7/24 acil çağrılara ortalama 30 dakikada müdahale ediyoruz.",
    includes: [
      "Robotik spiral makine ile gider açma",
      "Yüksek basınçlı su jeti (kanal jeti)",
      "Lavabo, tuvalet, mutfak ve ana hat",
      "Kök ve kireç tıkanıklıklarına müdahale",
      "Açım sonrası akış kontrolü",
    ],
    highlights: [
      "Tekrarlayan tıkanıklıklarda kamera ile neden tespiti",
      "Temiz çalışma, iş sonrası alan temizliği",
      "Şeffaf fiyat, sürpriz ücret yok",
    ],
    faq: [
      {
        q: "Tıkanıklık açma ne kadar sürer?",
        a: "Çoğu tıkanıklık 30-60 dakika içinde açılır. Ana hat ve kök kaynaklı tıkanıklıklarda kanal jeti kullanılır.",
      },
      {
        q: "Tuvalet tıkanıklığını açıyor musunuz?",
        a: "Evet, tuvalet, lavabo, mutfak gideri ve ana pis su hattındaki tüm tıkanıklıkları açıyoruz.",
      },
      {
        q: "Tekrar tıkanırsa ne yapıyorsunuz?",
        a: "Tekrarlayan tıkanıklıklarda robot kamera ile borunun içini görüntüler, kök ya da kırık kaynaklı sorunu kalıcı çözeriz.",
      },
      {
        q: "Mutfak, lavabo ve yer giderini de açıyor musunuz?",
        a: "Evet. Mutfak evyesi, banyo lavabosu, yer gideri ve sifon tıkanıklıklarını robotik spiral ve yüksek basınçlı su jetiyle açıyoruz. Yağ, kireç ve saç kaynaklı birikintileri boruya zarar vermeden tahliye eder, tekrarı önlemek için bakım önerisi sunarız.",
      },
      {
        q: "Kimyasal açıcı dökmem sakıncalı mı?",
        a: "Kostik ve asit bazlı açıcılar çoğu tıkanıklığı çözmez, biriken suda bekleyip sıçrayarak cilt yanığına yol açabilir ve boru/sifon contasına zarar verir. Bu yüzden mekanik (spiral/jet) açımı öneririz; gelmeden önce kimyasal döktüyseniz mutlaka bize haber verin.",
      },
    ],
    howTitle: "Tıkanıklık Açma Nasıl Yapılır?",
    howIntro:
      "Doğru yöntem, tıkanıklığın yerine ve nedenine göre seçilir. Hattı zorlamadan, boruya zarar vermeden açar ve sorunun tekrar etmemesi için kaynağını kontrol ederiz.",
    process: [
      {
        step: "Tıkanıklığın yeri ve nedeni tespiti",
        detail:
          "Sorunun tek bir gider mi yoksa ana hat mı kaynaklı olduğunu belirler, kök/kireç/yağ gibi nedeni değerlendiririz.",
      },
      {
        step: "Doğru yöntemin seçimi",
        detail:
          "Hafif tıkanıklıklarda robotik spiral makine, ağır ve ana hat tıkanıklıklarında yüksek basınçlı kanal jeti kullanırız.",
      },
      {
        step: "Açım işlemi",
        detail:
          "Boru çapına uygun ekipmanla tıkanıklığı parçalar ve hattan tamamen uzaklaştırırız; çalışma alanını kirletmeyiz.",
      },
      {
        step: "Akış kontrolü ve öneri",
        detail:
          "Bol su vererek akışı test eder, tekrarlayan durumlarda kanal görüntüleme ile kalıcı çözüm öneririz.",
      },
    ],
    priceIntro:
      "Tıkanıklık açma fiyatı sorunun yerine ve kullanılan ekipmana göre belirlenir. Telefonda durumu dinleyip aralık veririz; kesin fiyatı yerinde, işe başlamadan önce onayınıza sunarız.",
    priceFactors: [
      "Tıkanıklığın yeri (lavabo, tuvalet, mutfak veya ana pis su hattı)",
      "Kullanılan ekipman (spiral makine veya yüksek basınçlı kanal jeti)",
      "Tıkanıklığın nedeni (kök sarması, kireç, yağ veya yabancı cisim)",
      "Açılması gereken hat uzunluğu ve boru çapı",
      "Aciliyet ve hizmet saati (gece/hafta sonu acil çağrı)",
    ],
    symptoms: [
      {
        title: "Su yavaş iniyor veya birikiyor",
        detail: "Lavabo, duş ya da küvette su normalden yavaş çekiliyor veya gözde birikiyorsa, hat içinde yağ-kireç-saç birikintisi başlamış demektir.",
      },
      {
        title: "Gider veya klozetten kötü koku",
        detail: "Gidere yaklaşınca gelen kanalizasyon kokusu, biriken atıkların çürümesinden ve sifon suyunun çekilmesinden kaynaklanır; tıkanıklığın habercisidir.",
      },
      {
        title: "Lokur lokur / fokurdama sesi",
        detail: "Su boşalırken gelen hava kabarcığı sesi, hattın bir bölümünün daralıp havayı zorla geçirdiğini gösterir.",
      },
      {
        title: "Klozette su seviyesi yükseliyor",
        detail: "Sifonu çektiğinizde su inmek yerine yükseliyorsa, tuvalet veya ana hatta ciddi bir tıkanıklık vardır; kimyasal dökmeden müdahale gerekir.",
      },
      {
        title: "Geri tepme / taşma",
        detail: "Bir gideri kullanınca başka bir giderden (örneğin duş tavasından) su gelmesi, ana pis su hattının tıkandığına işarettir ve acildir.",
      },
      {
        title: "Tekrarlayan tıkanma",
        detail: "Aynı gider kısa aralıklarla tekrar tıkanıyorsa, sorun yüzeysel değildir; boru içi kamerayla kök sarması veya kırık-çökme araştırılmalıdır.",
      },
    ],
    emergencySteps: [
      {
        step: "Su kullanmayı durdurun",
        detail: "Tıkalı giderden su geri geliyorsa o noktadaki musluk, klozet ve makineleri kullanmayı bırakın; su vermeye devam etmek taşmaya yol açar.",
      },
      {
        step: "Kimyasal açıcı dökmeyin",
        detail: "Asitli 'lavabo/tuvalet açıcı' ürünler contaları ve boruyu eritip kalıcı hasar verir, üstelik biriken suyun altında işimizi zorlaştırır. Mekanik açma her zaman daha güvenlidir.",
      },
      {
        step: "Sıcak su ve pistonu deneyin",
        detail: "Hafif tıkanmalarda kaynar olmayan sıcak su ve lastik pompa (pompalı vantuz) yüzeysel birikintiyi çözebilir; sonuç alamazsanız zorlamayın.",
      },
      {
        step: "Ana hat tıkanıklığında bizi arayın",
        detail: "Birden fazla giderde aynı anda sorun varsa müdahaleyi bekleyin; ana hattı amatör tellerle zorlamak boruyu deler ve maliyeti büyütür.",
      },
    ],
    tools: [
      {
        name: "Robotik spiral (yay) makinesi",
        detail: "Lavabo, mutfak ve banyo giderlerindeki yağ, saç ve kireç birikintisini döner spiral uçla parçalayıp hattan temizleyen birincil cihazımızdır.",
      },
      {
        name: "Yüksek basınçlı kanal jeti",
        detail: "Ana pis su hattı ve kanalizasyon tıkanıklıklarında, yüksek basınçlı su püskürten özel başlıklarla boruyu içeriden yıkayarak kökten açar.",
      },
      {
        name: "Boru içi (endoskopik) kamera",
        detail: "Tekrarlayan tıkanmalarda borunun içini canlı görüntüleyerek kök sarması, kireç tabakası, kırık veya çökme gibi asıl nedeni ekranda gösteririz.",
      },
      {
        name: "Pompalı / kompresörlü açıcı",
        detail: "Klozet ve yer süzgeci gibi noktalarda basınçlı hava darbesiyle yüzeysel tıkanıklığı iter; boruya zarar vermeden hızlı sonuç verir.",
      },
    ],
    variants: [
      {
        title: "Lavabo ve mutfak gideri tıkanıklığı",
        detail: "En sık neden biriken yemek yağı, kireç ve sabun artığıdır. Spiral makineyle sifon ve dikey hattı temizler, contaları kontrol ederiz.",
      },
      {
        title: "Tuvalet (klozet) tıkanıklığı",
        detail: "Islak mendil, bez ve kireç en yaygın sebeptir. Klozeti sökmeden pompalı ekipman ve uygun spiralle açar, taşma riskini ortadan kaldırırız.",
      },
      {
        title: "Banyo gideri ve yer süzgeci",
        detail: "Saç ve sabun köpüğü süzgeç altında topaklaşır. Süzgeci açıp hattı temizler, koku yapan kuru sifonları suyla doldururuz.",
      },
      {
        title: "Ana pis su hattı ve kanalizasyon",
        detail: "Birden çok giderin aynı anda tıkanması ana hat sorunudur. Yüksek basınçlı kanal jetiyle borunun tüm kesitini içeriden yıkayarak açarız.",
      },
      {
        title: "Rögar ve kök sarması tıkanıklığı",
        detail: "Bahçeli binalarda ağaç kökleri boru eklerinden içeri girer. Kamerayla teşhis eder, jet ve kesici uçlarla kökü temizleyip kalıcı çözüm öneririz.",
      },
    ],
  },
  {
    slug: "kombi-servisi",
    name: "Kombi Servisi",
    shortName: "Kombi",
    icon: "combi",
    responseMin: 35,
    tagline: "Tüm markalarda bakım, onarım ve montaj",
    intro:
      "Tüm marka kombilerde bakım, arıza onarımı, montaj ve baca gazı ölçümü yapıyoruz. Yanmayan, ısıtmayan veya basınç düşüren kombilerinize yetkili tecrübeyle aynı gün çözüm sunuyoruz.",
    includes: [
      "Kombi arıza tespiti ve onarımı",
      "Yıllık bakım ve temizlik",
      "Yeni kombi montajı ve devreye alma",
      "Basınç ve eşanjör kontrolü",
      "Tüm marka yedek parça temini",
    ],
    highlights: [
      "Hata kodu okuma ve elektronik kart kontrolü",
      "Kış öncesi bakımda öncelikli randevu",
      "Değişen parçalarda fatura ve garanti",
    ],
    faq: [
      {
        q: "Hangi marka kombilere bakıyorsunuz?",
        a: "Tüm marka ve modellerde bakım, onarım ve montaj yapıyoruz; orijinal ve muadil yedek parça temin ediyoruz.",
      },
      {
        q: "Kombi yanmıyor, aynı gün gelebilir misiniz?",
        a: "Evet, acil kombi arızalarına 7/24 hizmet veriyoruz ve ortalama 35 dakikada adresinizdeyiz.",
      },
      {
        q: "Kombi bakımı ne işe yarar?",
        a: "Düzenli bakım yakıt tüketimini düşürür, arıza riskini azaltır ve cihazın ömrünü uzatır.",
      },
      {
        q: "Kombi hata kodu veriyor, ne yapmalıyım?",
        a: "Ekranda görünen hata kodunu (örneğin basınç, alev veya sensör arızası) bize iletin. Çoğu kodun nedeni; düşük su basıncı, arızalı sensör, tıkalı eşanjör veya elektronik kart kaynaklıdır. Cihazı sürekli sıfırlamayın; arızanın nedenini yerinde tespit edip ilgili parçayı değiştirerek kalıcı çözüm sağlarız.",
      },
      {
        q: "Kombiden gaz kokusu geliyorsa ne yapmalıyım?",
        a: "Gaz kokusu alıyorsanız önce gaz vanasını kapatın, ateş/elektrik düğmelerine dokunmayın, pencereleri açıp ortamı havalandırın ve dışarıdan bizi veya acil hattı arayın. Kombiyi çalıştırmadan müdahale eder, gaz hattı ve cihaz bağlantılarının sızdırmazlığını test ederiz.",
      },
    ],
    howTitle: "Kombi Servisi Nasıl Yapılır?",
    howIntro:
      "Kombi arızalarında doğru teşhis, gereksiz parça değişiminin önüne geçer. Cihazı önce dinler, hata kodunu okur ve sorunun kaynağını belirledikten sonra çözüm sunarız.",
    process: [
      {
        step: "Arıza dinleme ve hata kodu okuma",
        detail:
          "Cihazın belirtilerini dinler, ekrandaki hata kodunu ve elektronik kart verilerini okuyarak ön teşhis koyarız.",
      },
      {
        step: "Tespit ve kontrol",
        detail:
          "Basınç, eşanjör, sirkülasyon pompası, gaz valfi ve sensörleri kontrol ederek arızanın gerçek nedenini buluruz.",
      },
      {
        step: "Onarım veya parça değişimi",
        detail:
          "Gereken parçayı orijinal/muadil olarak temin eder, onayınızdan sonra değiştirir ve faturasını veririz.",
      },
      {
        step: "Test ve devreye alma",
        detail:
          "Cihazı çalıştırıp ısınma, sıcak su ve basınç değerlerini test eder, gerekli baca gazı ölçümünü yaparız.",
      },
    ],
    priceIntro:
      "Kombi servisi ücreti; sorunun bakım mı yoksa onarım mı olduğuna ve değişecek parçaya göre değişir. Standart bakım için net fiyat, arızalarda ise tespit sonrası onaylı fiyat veririz.",
    priceFactors: [
      "İşlem türü (yıllık bakım, arıza onarımı veya yeni montaj)",
      "Değişmesi gereken parça (kart, eşanjör, pompa, sensör vb.)",
      "Kombinin markası ve modeli",
      "Bakımın kapsamı (temizlik, baca gazı ölçümü, basınç ayarı)",
      "Garanti ve yedek parça tedarik durumu",
    ],
    symptoms: [
      {
        title: "Kombi yanmıyor / sönüyor",
        detail: "Cihaz hiç ateşlemiyor ya da kısa süre sonra sönüyorsa; gaz valfi, ateşleme elektrotu veya iyonizasyon sensörü kaynaklı olabilir. Çoğu modelde ekranda arıza kodu görünür.",
      },
      {
        title: "Isıtıyor ama sıcak su yok (veya tersi)",
        detail: "Petekler ısınırken musluktan sıcak su gelmiyorsa üç yollu vana veya plakalı eşanjör; sıcak su varken ısıtma yoksa ısıtma devresi sorunludur.",
      },
      {
        title: "Basınç sürekli düşüyor",
        detail: "Manometre 1-1,5 bar altına iniyor ve su eklemenize rağmen düşmeye devam ediyorsa, tesisatta veya kombide kaçak ya da genleşme tankı arızası vardır.",
      },
      {
        title: "Ekranda arıza (hata) kodu",
        detail: "Markaya göre değişen E/F kodları (örn. düşük basınç, alev yok, fan/NTC arızası) sorunun yönünü gösterir; doğru okuma gereksiz parça değişimini önler.",
      },
      {
        title: "Su damlatma ve gürültü",
        detail: "Cihazın altından su damlaması, kireçlenmiş eşanjör veya pompa kaynaklı 'guruldama' ve titreşim sesleri bakım gerektiğinin işaretidir.",
      },
      {
        title: "Radyatörler eşit ısınmıyor",
        detail: "Üstte sıcak altta soğuk kalan veya hiç ısınmayan petekler, sistemde hava veya çamur birikimine işaret eder; çoğu kez petek temizliğiyle birlikte çözülür.",
      },
    ],
    emergencySteps: [
      {
        step: "Gaz/yanık kokusu varsa gazı kapatın",
        detail: "Yanık ya da gaz kokusu alıyorsanız ana gaz vanasını kapatın, pencereleri açın, elektrik düğmelerine ve çakmağa dokunmayın ve hemen bizi arayın.",
      },
      {
        step: "Basınç düşükse su takviyesi yapın",
        detail: "Manometre 1 barın altındaysa kombinin doldurma musluğundan ibre 1,5 bara gelene kadar yavaşça su ekleyin; sürekli düşüyorsa müdahale gerekir.",
      },
      {
        step: "Arıza kodunu not edin",
        detail: "Ekranda görünen hata kodunu ve cihazın markası/modelini not alın; bu bilgiyi paylaşmanız teşhisi ve doğru parça temini hızlandırır.",
      },
      {
        step: "Reset deneyin, zorlamayın",
        detail: "Cihazı bir kez reset tuşuyla sıfırlamayı deneyin. Tekrar aynı hatayı veriyorsa cihazı çalıştırmaya zorlamayın; defalarca reset elektronik kartı yorar.",
      },
    ],
    tools: [
      {
        name: "Baca gazı analiz cihazı",
        detail: "Yanma verimini, CO ve CO₂ değerlerini ölçerek cihazın güvenli ve tasarruflu yanıp yanmadığını belgeleriz; periyodik bakımın zorunlu adımıdır.",
      },
      {
        name: "Dijital manometre ve basınç seti",
        detail: "Gaz giriş basıncını ve tesisat su basıncını ölçerek düşük basınç, gaz valfi ayarı ve genleşme tankı sorunlarını net olarak tespit ederiz.",
      },
      {
        name: "Multimetre ve hata kodu okuyucu",
        detail: "Elektronik kart, NTC sensörleri, fan ve ateşleme devresini ölçerek arızanın elektronik mi yoksa mekanik mi olduğunu ayırt ederiz.",
      },
      {
        name: "Eşanjör temizleme (kireç sökücü) seti",
        detail: "Plakalı ve ana eşanjördeki kireç tabakasını özel pompa ve çözücüyle temizleyerek sıcak su veriminizi ve ısınmayı eski haline getiririz.",
      },
    ],
    variants: [
      {
        title: "Yıllık periyodik bakım",
        detail: "Eşanjör ve brülör temizliği, baca gazı ölçümü, basınç ve conta kontrolü. Kış öncesi yaptırmak yakıt tüketimini düşürür ve arızayı önler.",
      },
      {
        title: "Basınç / kaçak arızaları",
        detail: "Sürekli düşen basıncın kaynağını (genleşme tankı, hidrolik grup, conta veya tesisat kaçağı) bulur, gereksiz parça değiştirmeden çözeriz.",
      },
      {
        title: "Sıcak su / üç yollu vana arızaları",
        detail: "Sıcak su gelmemesi veya akışta dalgalanmada üç yollu vana, akış sensörü ve plakalı eşanjörü kontrol eder, gerekirse yenileriz.",
      },
      {
        title: "Elektronik kart ve sensör arızaları",
        detail: "Tekrarlayan hata kodları, ani sönmeler ve fan sorunlarında kart, NTC ve ateşleme grubunu test eder, sadece arızalı bileşeni değiştiririz.",
      },
      {
        title: "Yeni kombi montajı ve devreye alma",
        detail: "Tüm marka kombilerin montajı, baca bağlantısı, devreye alma ve ilk ayarlarını standartlara uygun yapar, kullanım eğitimini veririz.",
      },
    ],
  },
  {
    slug: "petek-temizligi",
    name: "Petek Temizliği",
    shortName: "Petek",
    icon: "radiator",
    responseMin: 35,
    tagline: "Basınçlı sistemle alttan ısıtmayan peteklere çözüm",
    intro:
      "Alttan ısıtmayan, üstte sıcak altta soğuk kalan radyatörleri kapalı devre basınçlı temizleme makinesiyle çamur ve kireçten arındırıyoruz. Isınma performansınızı artırır, yakıt tüketiminizi düşürürüz.",
    includes: [
      "Kapalı devre basınçlı petek temizliği",
      "Tesisat çamuru ve kireç tahliyesi",
      "Hava alma ve denge ayarı",
      "Vana ve bağlantı kontrolü",
      "İşlem sonrası ısınma testi",
    ],
    highlights: [
      "Tek tek petek değil, tüm tesisat temizliği",
      "Yakıt tasarrufu ve homojen ısınma",
      "Apartman ve site için toplu fiyat",
    ],
    faq: [
      {
        q: "Petek temizliği ne zaman gerekir?",
        a: "Radyatörün altı soğuk üstü sıcaksa, ısınma geç oluyorsa veya su sirkülasyonunda ses varsa petek temizliği gerekir.",
      },
      {
        q: "Petek temizliği ne kadar sürer?",
        a: "Daire büyüklüğüne göre ortalama 1-2 saat sürer; işlem kapalı devre makineyle yapıldığı için ortalık kirlenmez.",
      },
      {
        q: "Temizlik yakıt tasarrufu sağlar mı?",
        a: "Evet, çamur ve kireçten arınan tesisat daha verimli ısınır ve doğalgaz tüketimini belirgin biçimde azaltır.",
      },
      {
        q: "Petek temizliğini kombiye zarar vermeden mi yapıyorsunuz?",
        a: "Evet. Kapalı devre petek temizleme makinesiyle tesisatı sökmeden, basınçlı su ve uygun kireç/çamur çözücüyle yıkarız. İşlem kombi ve tesisata zarar vermez; sonrasında sistemin havasını alır ve basıncını doğru değere ayarlarız.",
      },
      {
        q: "Alt kısmı soğuk, üstü sıcak olan petekte sorun ne?",
        a: "Peteğin altının soğuk, üstünün sıcak kalması genelde içeride biriken çamur ve kireç tabakasının suyun dolaşımını engellemesinden kaynaklanır. Bu durumda kapalı devre temizlik en etkili çözümdür; sürekli tekrarlıyorsa peteğin hava yapıp yapmadığını da kontrol ederiz.",
      },
    ],
    howTitle: "Petek Temizliği Nasıl Yapılır?",
    howIntro:
      "Tek tek peteği boşaltmak kalıcı çözüm değildir. Biz kapalı devre basınçlı makineyle tüm tesisatı baştan sona dolaştırır, çamur ve kireci sistemden tamamen tahliye ederiz.",
    process: [
      {
        step: "Tesisat kontrolü ve hazırlık",
        detail:
          "Petekleri, vanaları ve kombi bağlantısını kontrol eder, hangi noktadan temizlik yapılacağını belirleriz.",
      },
      {
        step: "Basınçlı makinenin bağlanması",
        detail:
          "Kapalı devre temizleme makinesini tesisata bağlar, su ve hava karışımıyla devreyi basınç altında çalıştırırız.",
      },
      {
        step: "Çamur ve kireç tahliyesi",
        detail:
          "Petek içindeki birikmiş çamur, pas ve kireci her radyatörden tek tek tahliye ederek tesisatı temizleriz.",
      },
      {
        step: "Hava alma ve ısınma testi",
        detail:
          "Tesisatın havasını alır, denge ayarını yapar ve tüm peteklerin alttan üste homojen ısındığını test ederiz.",
      },
    ],
    priceIntro:
      "Petek temizliği fiyatı, dairedeki petek sayısına ve tesisatın kirlilik durumuna göre belirlenir. Apartman ve sitelerde toplu iş için avantajlı fiyat sunarız.",
    priceFactors: [
      "Dairedeki petek (radyatör) sayısı ve daire büyüklüğü",
      "Tesisattaki çamur ve kireç birikimi yoğunluğu",
      "Kombi/kazan tipi ve tesisat bağlantı yapısı",
      "Vana veya bağlantı değişimi gerekip gerekmediği",
      "Toplu iş (apartman/site) veya tek daire olması",
    ],
    symptoms: [
      {
        title: "Petek altı soğuk, üstü sıcak",
        detail: "Radyatörün üst kısmı ısınırken alt bölümü soğuk kalıyorsa, petek içinde çamur ve tortu birikmiştir; suyun dolaşımı engellenir ve ısınma düşer.",
      },
      {
        title: "Bazı petekler hiç ısınmıyor",
        detail: "Aynı dairede kimi radyatörler ısınırken bir kısmının soğuk kalması, tıkanma veya tesisat dengesinin bozulduğunu gösterir.",
      },
      {
        title: "Isınma çok geç oluyor",
        detail: "Kombi açıldıktan uzun süre sonra ısı hissediliyorsa, kireç ve çamur tabakası ısı transferini yavaşlatıyordur; yakıt tüketimi de artar.",
      },
      {
        title: "Tesisatta hava ve gurultu sesi",
        detail: "Peteklerden su şırıltısı veya 'guruldama' sesi gelmesi sistemde hava ile birlikte tortu biriktiğinin işaretidir.",
      },
      {
        title: "Doğalgaz faturası beklenmedik arttı",
        detail: "Kirli tesisat aynı sıcaklık için daha çok yakıt harcar; faturadaki artış çoğu zaman petek temizliği ihtiyacının habercisidir.",
      },
      {
        title: "Petek suyu koyu/çamurlu geliyor",
        detail: "Hava alırken çıkan suyun siyaha yakın ve bulanık olması, sistemde ileri düzeyde çamur ve pas birikimi olduğunu gösterir.",
      },
    ],
    emergencySteps: [
      {
        step: "Önce peteklerin havasını alın",
        detail: "Üstü sıcak altı soğuksa sorun çoğu kez havadır. Petek üzerindeki hava alma vidasını bez tutarak yavaşça açıp su gelene kadar havayı boşaltın.",
      },
      {
        step: "Kombi basıncını kontrol edin",
        detail: "Hava aldıktan sonra manometre 1 barın altına inerse, doldurma musluğundan ibre 1,5 bara gelene kadar su ekleyin.",
      },
      {
        step: "Vanaların tam açık olduğundan emin olun",
        detail: "Radyatör giriş ve dönüş vanalarının sonuna kadar açık olduğunu kontrol edin; yarı kapalı vana o peteğin ısınmasını engeller.",
      },
      {
        step: "Sökmeyi/boşaltmayı kendiniz denemeyin",
        detail: "Peteği yerinden sökmek veya tesisatı tamamen boşaltmak kalıcı çözüm değildir ve su basması riski taşır; basınçlı kapalı devre temizlik gerekir.",
      },
    ],
    tools: [
      {
        name: "Kapalı devre basınçlı temizleme makinesi",
        detail: "Su ve hava karışımını yüksek basınçla tüm tesisatta dolaştırarak çamur ve kireci her petekten söker; ortalığı kirletmeden sistemi baştan sona temizler.",
      },
      {
        name: "Kireç çözücü ve kimyasal sirkülasyon seti",
        detail: "İleri kireçlenmede tesisata uygun çözücü kimyasalı kontrollü olarak sirküle eder, eşanjör ve petek içindeki sert kireç tabakasını çözeriz.",
      },
      {
        name: "Termal (kızılötesi) kamera",
        detail: "İşlem öncesi ve sonrası petek yüzey sıcaklıklarını görüntüleyerek soğuk bölgeleri tespit eder ve temizliğin etkisini görünür şekilde belgeleriz.",
      },
      {
        name: "Hava alma ve denge ayar takımı",
        detail: "Temizlik sonrası tüm peteklerin havasını alır, vana denge ayarını yaparak dairedeki ısınmayı homojen hale getiririz.",
      },
    ],
    variants: [
      {
        title: "Tek daire petek temizliği",
        detail: "Dairedeki tüm radyatörlerin kapalı devre makineyle temizliği, hava alma ve ısınma testi dahil; ortalama 1-2 saatte tamamlanır.",
      },
      {
        title: "Apartman / kolon tesisat temizliği",
        detail: "Merkezi sistem ve kolon hatlarının toplu temizliği; site ve apartmanlar için avantajlı toplu fiyatla tüm blokta verim artışı sağlarız.",
      },
      {
        title: "Kombi (eşanjör) + petek temizliği",
        detail: "Sadece petekler değil, kombinin plakalı ve ana eşanjöründeki kireç de temizlenerek sıcak su ve ısıtma verimi birlikte iyileştirilir.",
      },
      {
        title: "Yerden ısıtma hattı temizliği",
        detail: "Yerden ısıtma borularındaki çamur ve tortu, kapalı devre basınçlı yöntemle tahliye edilerek geç ısınma ve soğuk bölge sorunları giderilir.",
      },
      {
        title: "Sezon öncesi bakım temizliği",
        detail: "Kış başlamadan yapılan periyodik temizlik, ilk gün tam verimli ısınma ve sezon boyunca daha düşük yakıt tüketimi sağlar.",
      },
    ],
  },
  {
    slug: "dogalgaz-tesisati",
    name: "Doğalgaz Tesisatı",
    shortName: "Doğalgaz",
    icon: "gas",
    responseMin: 40,
    tagline: "Sertifikalı doğalgaz iç tesisat ve dönüşüm",
    intro:
      "Doğalgaz iç tesisat projelendirme, döşeme, kombi ve ocak bağlantısı ile kaçak kontrolünü sertifikalı ekiplerle yapıyoruz. Tüm işlemler ilgili standartlara ve gaz dağıtım şirketi onayına uygun yürütülür.",
    includes: [
      "Doğalgaz iç tesisat projesi ve döşeme",
      "Kombi, ocak ve şofben bağlantısı",
      "Gaz kaçağı kontrolü ve sızdırmazlık testi",
      "Kolon ve sayaç sonrası tesisat",
      "Standartlara uygun montaj ve belgelendirme",
    ],
    highlights: [
      "Yetkili ve sigortalı doğalgaz ekibi",
      "Kaçak şüphesinde acil müdahale",
      "Tesisat sonrası test raporu",
    ],
    faq: [
      {
        q: "Doğalgaz tesisatı için sertifikalı mısınız?",
        a: "Evet, doğalgaz iç tesisat işlemleri sertifikalı ekiplerimizce, ilgili standart ve dağıtım şirketi kurallarına uygun yapılır.",
      },
      {
        q: "Gaz kokusu alıyorum, ne yapmalıyım?",
        a: "Hiçbir elektrikli düğmeye dokunmadan vanayı kapatın, pencereleri açın ve bizi arayın; acil kaçak kontrolüne en kısa sürede geliriz.",
      },
      {
        q: "Ocak veya kombi bağlantısı yapıyor musunuz?",
        a: "Evet, ocak, kombi ve şofben gibi cihazların doğalgaz bağlantısını standartlara uygun şekilde yapıyoruz.",
      },
      {
        q: "Tüpten / sobadan doğalgaza dönüşüm yapıyor musunuz?",
        a: "Evet. Mevcut konutta tüplü veya sobalı sistemden doğalgaza geçişte gerekli iç tesisat projesini, hat döşemesini, cihaz bağlantılarını ve gaz açım sürecini standartlara uygun şekilde yürütürüz. Dönüşümde abonelik ve onay aşamalarında da yönlendirme yaparız.",
      },
      {
        q: "Doğalgaz tesisatı işçiliği garantili mi?",
        a: "Tüm doğalgaz tesisatı işçiliğimiz garantilidir. Hat montajı sonrası basınç (sızdırmazlık) testini yapar, gaz dağıtım firmasının kontrolüne uygun şekilde teslim eder ve kullanılan malzemelerin standartlara uygunluğunu belgeleriz.",
      },
    ],
    howTitle: "Doğalgaz Tesisatı Nasıl Yapılır?",
    howIntro:
      "Doğalgaz işleri can güvenliği işidir; bu yüzden her adım standartlara ve dağıtım şirketi onayına uygun, sertifikalı ekiplerce yürütülür. Tesisatı projeden teste kadar belgeli teslim ederiz.",
    process: [
      {
        step: "Keşif ve projelendirme",
        detail:
          "Mekânı inceler, cihaz konumlarını ve hat güzergâhını belirleyip standartlara uygun iç tesisat projesini hazırlarız.",
      },
      {
        step: "Tesisat döşeme",
        detail:
          "Sayaç sonrası boru hattını uygun malzemeyle, güvenli ve standartlara uygun şekilde döşeriz.",
      },
      {
        step: "Cihaz bağlantısı",
        detail:
          "Kombi, ocak ve şofben gibi cihazların bağlantılarını kurallara uygun yapar, devreye alırız.",
      },
      {
        step: "Sızdırmazlık testi ve belgelendirme",
        detail:
          "Hattı basınç altında test eder, sızdırmazlığı doğrular ve gerekli test raporunu/belgelendirmeyi tamamlarız.",
      },
    ],
    priceIntro:
      "Doğalgaz tesisatı fiyatı tamamen projeye özeldir; tesisat metrajına, cihaz sayısına ve malzemeye göre belirlenir. Keşif sonrası standartlara uygun, kalemli ve şeffaf bir teklif sunarız.",
    priceFactors: [
      "Döşenecek tesisat metrajı ve hat güzergâhı",
      "Bağlanacak cihaz sayısı (kombi, ocak, şofben)",
      "Kolon ve sayaç sonrası mevcut altyapının durumu",
      "Kullanılan malzeme kalitesi ve standardı",
      "Proje, onay ve belgelendirme süreçleri",
    ],
    symptoms: [
      {
        title: "Yumurta/çürük koku (gaz kokusu)",
        detail: "Doğalgaza eklenen kokulandırıcı sayesinde sızıntı çürük yumurta gibi kokar. Bu kokuyu alıyorsanız sızıntı vardır ve acil müdahale gerekir.",
      },
      {
        title: "Sayaçta sürekli tüketim",
        detail: "Tüm cihazlar kapalıyken doğalgaz sayacının dönmeye/ilerlemeye devam etmesi, hatta gizli bir kaçak olduğunun güçlü işaretidir.",
      },
      {
        title: "Bağlantı noktasında tıslama sesi",
        detail: "Boru ek yerlerinden veya cihaz bağlantısından gelen ince tıslama/fısıltı sesi, basınçlı gazın dışarı sızdığını gösterir.",
      },
      {
        title: "Cihaz sarı/dalgalı alevle yanıyor",
        detail: "Ocak veya kombinin mavi yerine sarı-turuncu alevle yanması eksik yanma ve baca/hava sorununa işaret eder; karbonmonoksit riski taşır.",
      },
      {
        title: "Baş ağrısı, baş dönmesi, halsizlik",
        detail: "Cihaz çalışırken evdekilerde baş ağrısı ve mide bulantısı oluyorsa karbonmonoksit sızıntısı olabilir; cihazı kapatıp havalandırın ve kontrol ettirin.",
      },
      {
        title: "Yeni daire / dönüşüm ihtiyacı",
        detail: "Doğalgazı olmayan ya da elektrik/kömürden dönüşüm yapılacak konutlarda sayaç sonrası iç tesisatın projeyle döşenmesi gerekir.",
      },
    ],
    emergencySteps: [
      {
        step: "Ana gaz vanasını kapatın",
        detail: "Gaz kokusu alır almaz sayaç veya cihaz girişindeki ana vanayı kapatarak gaz akışını durdurun.",
      },
      {
        step: "Elektriğe ve ateşe dokunmayın",
        detail: "Hiçbir elektrik düğmesine, prize, çakmağa veya kapı ziline dokunmayın; en küçük kıvılcım bile patlamaya yol açabilir.",
      },
      {
        step: "Pencereleri açıp ortamı havalandırın",
        detail: "Kapı ve pencereleri açarak ortamdaki gazı dışarı atın ve mekânı boşaltın; havalandırma için aspiratör/fan çalıştırmayın.",
      },
      {
        step: "Dışarıdan arayın",
        detail: "Binadan uzaklaşıp güvenli bir yerden acil gaz hattını ve bizi arayın; sertifikalı ekip sızdırmazlık testiyle kaçağı tespit edip giderir.",
      },
    ],
    tools: [
      {
        name: "Elektronik gaz kaçağı dedektörü",
        detail: "Hassas sensörlü cihazla boru ek yerlerini ve cihaz bağlantılarını tarayarak gözle görülmeyen en küçük sızıntıyı bile tespit ederiz.",
      },
      {
        name: "Sızdırmazlık (basınç) test pompası",
        detail: "Tesisatı manometreyle basınç altına alır, belirli süre basınç düşüşünü izleyerek hattın gaz sızdırmazlığını standartlara göre belgeleriz.",
      },
      {
        name: "Pres/kaynak ve boru bağlantı ekipmanı",
        detail: "Çelik ve uygun boruları standarda uygun ek ve bağlantılarla döşer, sızdırmaz ve dayanıklı bir hat oluştururuz.",
      },
      {
        name: "Karbonmonoksit (CO) ve baca gazı ölçer",
        detail: "Cihaz devreye alındıktan sonra yanma verimini ve CO seviyesini ölçerek güvenli çalıştığını test eder, raporlarız.",
      },
    ],
    variants: [
      {
        title: "Sıfırdan iç tesisat döşeme",
        detail: "Sayaç sonrası komple iç tesisat projelendirme ve döşeme; kombi, ocak ve şofben hatlarının standartlara uygun kurulumu ve belgelendirmesi.",
      },
      {
        title: "Doğalgaza dönüşüm",
        detail: "Elektrik, kömür veya tüpten doğalgaza geçişte gerekli proje, hat döşeme ve cihaz bağlantılarını eksiksiz yaparız.",
      },
      {
        title: "Cihaz bağlantısı ve devreye alma",
        detail: "Yeni kombi, ocak veya şofbenin mevcut hatta kurallara uygun bağlanması, ilk çalıştırma ve güvenlik kontrolü.",
      },
      {
        title: "Gaz kaçağı tespiti ve onarımı",
        detail: "Koku veya sayaç tüketimi şüphesinde dedektör ve basınç testiyle kaçağın yerini bulur, sızdıran bağlantıyı onarırız.",
      },
      {
        title: "Tesisat tadilatı / hat taşıma",
        detail: "Tadilat, mutfak yenileme veya cihaz yeri değişiminde mevcut doğalgaz hattının güvenli şekilde taşınması ve yeniden test edilmesi.",
      },
    ],
  },
  {
    slug: "kanal-goruntuleme",
    name: "Kanal Görüntüleme",
    shortName: "Kanal Kamera",
    icon: "camera",
    responseMin: 40,
    tagline: "Robot kamerayla boru içi tespit",
    intro:
      "Pis su ve atık hatlarını robot kamerayla görüntüleyerek tıkanıklığın, kırığın veya kök sarmasının tam yerini ve derinliğini belirliyoruz. Tahmine değil, görüntüye dayalı kalıcı çözüm sunuyoruz.",
    includes: [
      "Robot kamera ile boru içi görüntüleme",
      "Tıkanıklık ve kırık noktası tespiti",
      "Kök sarması ve çökme analizi",
      "Hat güzergâhı ve derinlik belirleme",
      "Görüntü kaydı ve raporlama",
    ],
    highlights: [
      "Tekrarlayan tıkanıklıklarda kesin teşhis",
      "Kazı öncesi tam nokta tespiti, gereksiz kazı yok",
      "Görüntü kaydı sizinle paylaşılır",
    ],
    faq: [
      {
        q: "Kanal görüntüleme ne işe yarar?",
        a: "Borunun içini robot kamerayla görerek tıkanıklığın, kırığın veya kök sarmasının tam yerini belirler; gereksiz kazıyı önler.",
      },
      {
        q: "Görüntü kaydını alabiliyor muyum?",
        a: "Evet, görüntüleme kaydını ve tespit raporunu sizinle paylaşıyoruz.",
      },
      {
        q: "Hangi hatları görüntülüyorsunuz?",
        a: "Pis su, yağmur suyu ve atık hatlarını uygun çaplarda robot kamerayla görüntüleyebiliyoruz.",
      },
      {
        q: "Kazı yapmadan tıkanıklığın yerini tespit edebiliyor musunuz?",
        a: "Evet. Kanal robotu kamerasıyla hattı içeriden görüntüler, sonda-lokalizatör cihazıyla tıkanıklığın veya kırığın zemindeki tam noktasını ve derinliğini işaretleriz. Böylece gereksiz kırım yapılmadan yalnızca sorunlu noktaya müdahale edilir.",
      },
      {
        q: "Görüntüleme sonrası rapor veya video alabiliyor muyum?",
        a: "İsteğe bağlı olarak görüntülemenin video kaydını ve bulguları içeren bir özet rapor veririz. Bu kayıt, ev alım-satımı, sigorta talebi ve yönetim/komşu arasında masraf paylaşımında belge olarak kullanılabilir.",
      },
    ],
    howTitle: "Kanal Görüntüleme Nasıl Yapılır?",
    howIntro:
      "Boru içini görmeden yapılan müdahale çoğu zaman geçici kalır. Robot kamerayla hattın içini canlı izler, sorunun tam yerini ve nedenini görüntüye dayalı olarak belgeleriz.",
    process: [
      {
        step: "Erişim noktası ve hat tespiti",
        detail:
          "Rögar, gider veya temizleme ağzından hatta erişir, görüntülenecek güzergâhı belirleriz.",
      },
      {
        step: "Robot kameranın hatta verilmesi",
        detail:
          "Boru çapına uygun robot kamerayı hatta ilerletir, içeriyi canlı ekrandan izleriz.",
      },
      {
        step: "Görüntüleme ve analiz",
        detail:
          "Tıkanıklık, kırık, çökme veya kök sarmasının tam yerini ve derinliğini tespit ederiz.",
      },
      {
        step: "Rapor ve çözüm önerisi",
        detail:
          "Görüntü kaydını sizinle paylaşır, soruna uygun açım veya onarım yöntemini öneririz.",
      },
    ],
    priceIntro:
      "Kanal görüntüleme fiyatı, görüntülenecek hat uzunluğuna ve erişim koşullarına göre belirlenir. Açım işlemiyle birlikte yapıldığında avantajlı paket fiyat sunarız.",
    priceFactors: [
      "Görüntülenecek hat uzunluğu ve boru çapı",
      "Erişim noktasının durumu (rögar, temizleme ağzı)",
      "Görüntüleme süresi ve hattın karmaşıklığı",
      "Görüntü kaydı ve yazılı rapor talebi",
      "Birlikte yapılacak ek hizmet (tıkanıklık açma vb.)",
    ],
    symptoms: [
      {
        title: "Aynı gider tekrar tekrar tıkanıyor",
        detail: "Açıldıktan kısa süre sonra yeniden tıkanan hatlarda görünmeyen bir kırık, çökme veya kök sarması vardır; kamerayla nedeni net olarak görülür.",
      },
      {
        title: "Birden fazla gider aynı anda tıkanık",
        detail: "Lavabo, tuvalet ve yer süzgeci aynı anda geri tepiyorsa sorun ana hatta veya kolondadır; görüntüleme tıkanıklığın seviyesini bulur.",
      },
      {
        title: "Sürekli lağım/koku geri geliyor",
        detail: "Giderlerden inatçı pis koku geliyorsa hatta birikme, çatlak ya da bağlantı bozukluğu olabilir; kamera kokunun kaynağını gösterir.",
      },
      {
        title: "Zemin/bahçede çökme veya nem",
        detail: "Hat güzergâhında zeminde çökme, ıslaklık veya çimde yeşillenme, gömülü boruda kırık ve sızıntıya işaret eder.",
      },
      {
        title: "Kazı yapmadan arıza yerini bulmak",
        detail: "Tüm zemini kazmadan tıkanıklığın veya kırığın tam yerini ve derinliğini öğrenmek istiyorsanız robot kamera doğru adımdır.",
      },
      {
        title: "Satın alma / tadilat öncesi hat kontrolü",
        detail: "Konut alımı veya tadilat öncesi atık hattının durumunu görüntüyle belgelemek, ileride çıkacak masrafları önceden görmenizi sağlar.",
      },
    ],
    emergencySteps: [
      {
        step: "Tıkalı gideri kullanmayı durdurun",
        detail: "Geri tepme varsa o gideri ve bağlı tuvalet/lavaboyu kullanmayı bırakın; suyun taşması ve temiz alana yayılmasını önlersiniz.",
      },
      {
        step: "Erişim noktasını (rögar) açık tutun",
        detail: "Varsa rögar veya temizleme ağzının yerini gösterin; kameranın hatta hızlı verilebilmesi görüntülemeyi kolaylaştırır.",
      },
      {
        step: "Kimyasal açıcı dökmeyin",
        detail: "Görüntüleme öncesi asit/kostik açıcı dökmeyin; hem ekip için tehlikeli olur hem kamera lensi ve boru için zararlıdır, net görüntüyü de bozar.",
      },
      {
        step: "Şikayet geçmişini not edin",
        detail: "Tıkanıklığın ne sıklıkla olduğunu ve hangi giderleri etkilediğini iletin; bu bilgi güzergâhı ve olası kırık noktasını daraltır.",
      },
    ],
    tools: [
      {
        name: "Renkli kafalı robot kamera (push/araç)",
        detail: "Boru çapına uygun, ışıklı ve renkli kameralı robotla hattın içini canlı izler; tıkanıklık, kırık ve kök sarmasını net görüntüleriz.",
      },
      {
        name: "Sonda (lokalizatör) ve derinlik bulucu",
        detail: "Kamera kafasındaki vericiyi yüzeyden takip ederek arıza noktasının zemindeki tam yerini ve derinliğini santim hassasiyetinde işaretleriz.",
      },
      {
        name: "Dijital kayıt ve raporlama sistemi",
        detail: "Görüntüleri metraj bilgisiyle kaydeder, tespit raporunu video kaydıyla birlikte size teslim ederiz; yapılacak işin kanıtı olur.",
      },
      {
        name: "Kameralı + jetli açım entegrasyonu",
        detail: "Görüntülemeyle birlikte yüksek basınçlı kanal jeti kullanarak tıkanıklığı görerek açar, açım sonrası hattı tekrar kontrol ederiz.",
      },
    ],
    variants: [
      {
        title: "Pis su / atık hattı görüntüleme",
        detail: "Mutfak, banyo ve tuvalet bağlantılarından ana hatta kadar atık borularının robot kamerayla görüntülenmesi ve raporlanması.",
      },
      {
        title: "Pimaş / kolon (dikey hat) görüntüleme",
        detail: "Binadaki dikey atık kolonlarının içini görüntüleyerek katlar arası tıkanma, birikme ve kırık noktalarını tespit ederiz.",
      },
      {
        title: "Bahçe / ana kanalizasyon hattı",
        detail: "Bina çıkışından şebekeye kadar gömülü ana hattın görüntülenmesi; çökme, kök sarması ve kırıkların yeri kazı öncesi belirlenir.",
      },
      {
        title: "Kazı öncesi nokta ve derinlik tespiti",
        detail: "Sonda ile arıza noktasının zemindeki tam yeri ve derinliği işaretlenir; sadece gereken nokta kazılır, gereksiz kazı önlenir.",
      },
      {
        title: "Hasar tespit ve sigorta raporu",
        detail: "Su baskını, çatlak veya kırık şüphesinde görüntülü hasar tespiti yapar, sigorta ve apartman yönetimi için yazılı/videolu rapor sunarız.",
      },
    ],
  },
  {
    slug: "kanalizasyon-acma",
    name: "Kanalizasyon Açma",
    shortName: "Kanalizasyon",
    icon: "clog",
    responseMin: 35,
    tagline: "Yüksek basınçlı kanal jetiyle ana hat açma",
    intro:
      "Apartman, site ve işyeri ana pis su hatlarındaki ağır kanalizasyon tıkanıklıklarını yüksek basınçlı kanal jeti (su jeti) ve robotik makinelerle açıyoruz. Rögardan ana kolona kadar tüm hattı zorlamadan, boruya zarar vermeden temizler, taşma ve geri tepme sorununu aynı gün çözeriz.",
    includes: [
      "Yüksek basınçlı kanal jeti ile ana hat açma",
      "Rögar, kolon ve ana pis su hattı temizliği",
      "Robotik spiral makine ile destekli müdahale",
      "Kök sarması, kireç ve yağ tabakası tahliyesi",
      "Açım sonrası akış ve geri tepme kontrolü",
    ],
    highlights: [
      "Apartman ve sitelerde toplu hat için avantajlı fiyat",
      "Tekrarlayan tıkanıklıkta kamera ile neden tespiti",
      "Temiz çalışma, iş sonrası alan temizliği",
    ],
    faq: [
      {
        q: "Kanalizasyon açma ile gider açma farkı nedir?",
        a: "Gider açma tek bir noktayı (lavabo, tuvalet) hedefler; kanalizasyon açma ise rögardan ana kolona kadar binanın tüm pis su hattını yüksek basınçlı kanal jetiyle temizler.",
      },
      {
        q: "Ana hat tıkanıklığına ne kadar sürede geliyorsunuz?",
        a: "7/24 acil çağrılara ortalama 35 dakikada müdahale ediyoruz; taşma ve geri tepme durumlarına öncelik veriyoruz.",
      },
      {
        q: "Apartman ana hattı için toplu fiyat var mı?",
        a: "Evet, apartman ve sitelerde ana hat temizliği için avantajlı toplu fiyat ve düzenli bakım anlaşması sunuyoruz.",
      },
      {
        q: "Kanalizasyon kırmadan açılır mı?",
        a: "Evet. Ana hat tıkanıklıklarının büyük çoğunluğunu duvar veya zemin kırmadan, rögar ve mevcut temizleme kapaklarından girerek yüksek basınçlı kanal jeti ve robotik spiralle açıyoruz. Kırım, yalnızca borunun çökmüş ya da kırılmış olduğu kamerayla tespit edilen özel durumlarda gündeme gelir; bunu da önceden bilgilendirerek yaparız.",
      },
      {
        q: "Evde kanalizasyon açma yöntemleri işe yarar mı?",
        a: "Karbonat-sirke, kaynar su veya market tipi kimyasal açıcılar yalnızca yüzeysel, hafif tıkanıklıklarda kısa süreli rahatlama sağlar; ana hatta biriken yağ, kireç, kök sarması ve katı atığı çözemez, hatta kimyasallar boruya ve contalara zarar verebilir. Geri tepme, taşma veya birden fazla giderin aynı anda gitmemesi ana hat tıkanıklığı işaretidir; bu durumda kanal jeti ve robotik spiralle profesyonel müdahale gerekir.",
      },
      {
        q: "Rögar (logar) ve pimaş tıkanıklığı açıyor musunuz?",
        a: "Evet. Rögar (logar), pimaş ve ana kolon tıkanıklıklarını yüksek basınçlı kanal jeti ve robotik makinelerle açıyor, tekrarlayan hatlarda robot kamerayla nedenini tespit ediyoruz.",
      },
    ],
    howTitle: "Kanalizasyon Açma Nasıl Yapılır?",
    howIntro:
      "Ana hat tıkanıklıkları tek bir gidere müdahaleyle çözülmez. Hattın tamamını rögardan kolona kadar yüksek basınçlı su jetiyle dolaşır, birikintiyi sistemden tamamen tahliye eder ve sorunun kaynağını kontrol ederiz.",
    process: [
      {
        step: "Hat ve rögar tespiti",
        detail:
          "Tıkanıklığın tek daire mi yoksa ana kolon/rögar kaynaklı mı olduğunu belirler, en uygun erişim noktasını seçeriz.",
      },
      {
        step: "Kanal jetinin hatta verilmesi",
        detail:
          "Boru çapına uygun yüksek basınçlı su jeti başlığını hatta ilerletir, birikinti ve tabakayı basınçla parçalarız.",
      },
      {
        step: "Tahliye ve temizlik",
        detail:
          "Kök, yağ, kireç ve katı birikintiyi hattan tamamen uzaklaştırır, boru cidarını temizleriz; çalışma alanını kirletmeyiz.",
      },
      {
        step: "Akış kontrolü ve öneri",
        detail:
          "Bol su vererek akışı test eder, tekrarlayan hatlarda robot kamerayla görüntüleme ve kalıcı çözüm öneririz.",
      },
    ],
    priceIntro:
      "Kanalizasyon açma fiyatı hattın uzunluğuna, tıkanıklığın yoğunluğuna ve kullanılan ekipmana göre belirlenir. Telefonda durumu dinleyip aralık veririz; kesin fiyatı yerinde, işe başlamadan onayınıza sunarız.",
    priceFactors: [
      "Tıkanıklığın yeri (daire gideri, ana kolon veya rögar hattı)",
      "Açılması gereken hat uzunluğu ve boru çapı",
      "Tıkanıklığın nedeni (kök sarması, yağ, kireç, katı atık)",
      "Kullanılan ekipman (kanal jeti veya robotik makine)",
      "Tek daire veya apartman/site toplu hat olması",
    ],
    symptoms: [
      {
        title: "Birden fazla gider aynı anda gitmiyor",
        detail: "Tuvalet, banyo ve mutfak giderlerinin aynı anda yavaşlaması ya da hiç akmaması tek nokta değil, ana kolon/rögar hattının tıkandığını gösterir.",
      },
      {
        title: "En alt kattan veya zemin süzgecinden geri tepme",
        detail: "Üst katlar su kullanınca alt kat tuvaletinden, banyo süzgecinden veya çamaşır makinesi giderinden pis su geri basıyorsa ana hat dolmuş demektir.",
      },
      {
        title: "Rögar / logar taşması ve bahçeye sızma",
        detail: "Bina çıkışındaki rögarın dolup taşması, bahçede veya bodrumda pis su birikmesi ana kanalizasyon hattının tıkalı olduğunun en net işaretidir.",
      },
      {
        title: "Lağım kokusu ve gurultu sesi",
        detail: "Giderlerden gelen yoğun kanalizasyon kokusu ve su çekilirken duyulan 'gurultu/fokurdama' sesi, hattın hava almadığını ve tıkanmaya başladığını gösterir.",
      },
      {
        title: "Tekrar tekrar tıkanan, kısa sürede dolan hat",
        detail: "Açtırdıktan kısa süre sonra yeniden tıkanan hat; kök sarması, çökmüş boru veya kireç-yağ tabakası gibi kalıcı bir nedenin habercisidir.",
      },
      {
        title: "Yavaş akış ve sifonlarda hava kabarcığı",
        detail: "Klozet ve lavaboların yavaş boşalması, su seviyesinin inip çıkması ana hatta kısmi bir daralma olduğunu, tam tıkanmadan önce müdahale gerektiğini gösterir.",
      },
    ],
    emergencySteps: [
      {
        step: "Su kullanımını tüm binada durdurun",
        detail: "Geri tepme veya rögar taşması varsa tuvalet, çamaşır/bulaşık makinesi ve muslukları kullanmayı bırakın; her su kullanımı taşmayı artırır.",
      },
      {
        step: "Alt kat ve bodrumu koruyun",
        detail: "Geri basan giderin önüne bez/çuval koyup eşya ve elektrik prizlerini su seviyesinden uzaklaştırın; pis suyla temastan kaçının.",
      },
      {
        step: "Kimyasal açıcı dökmeyin",
        detail: "Ana hat tıkanıklığında asit/kostik bazlı açıcılar işe yaramaz; biriken suyla karışıp boruya ve contalara zarar verir, ekip için de tehlike oluşturur.",
      },
      {
        step: "Rögar kapağını ve bina yöneticisini bilgilendirin",
        detail: "Apartman/site ana hattıysa yöneticiyle iletişime geçin; rögar konumunu ve belirtiyi bize iletin, kanal jetli ekiple öncelikli geliriz.",
      },
    ],
    tools: [
      {
        name: "Yüksek basınçlı kanal jeti (su jeti)",
        detail: "Boru çapına uygun başlıklarla 100+ bar basınçta su vererek yağ, kireç, çamur ve kök birikintisini parçalar; ana hattı boru cidarına kadar temizleriz.",
      },
      {
        name: "Robotik / motorlu spiral makine",
        detail: "Sert tıkaç, bez ve katı atık sıkışmalarında güçlü spiralle hattı deler ve birikintiyi sökeriz; kanal jetiyle birlikte kalıcı sonuç verir.",
      },
      {
        name: "Robot kamera ve sonda-lokalizatör",
        detail: "Tekrarlayan tıkanıklıkta hattı görüntüler, kırık/çökme/kök sarması noktasını ve derinliğini metreyle belirleyerek kazısız çözüm planlarız.",
      },
      {
        name: "Vidanjör / atık tahliye desteği",
        detail: "Dolu rögar ve foseptiklerde gerektiğinde vidanjörle tahliye yaparak hattı boşaltır, ardından jetle temizleyip akışı eski haline getiririz.",
      },
    ],
    variants: [
      {
        title: "Apartman / site ana kolon ve rögar hattı",
        detail: "Bina geneli pis su kolonunun ve rögardan şehir şebekesine giden ana hattın kanal jetiyle temizliği; toplu hat için avantajlı fiyat.",
      },
      {
        title: "Bahçe / dış saha ana kanalizasyon hattı",
        detail: "Bahçe, otopark ve site içi yağmur/pis su hatlarındaki tıkanıklıkların kazısız jetle açılması ve kök sarması temizliği.",
      },
      {
        title: "Geri tepme ve taşma acil müdahalesi",
        detail: "Alt kattan geri basan, rögarı taşan hatlara 7/24 öncelikli müdahale; taşmayı durdurup hattı hızla devreye alma.",
      },
      {
        title: "Kök sarması ve çökmüş boru tespiti",
        detail: "Tekrarlayan tıkanıklıkta robot kamerayla kök/kırık tespiti, mekanik kök kesme ve gerektiğinde noktasal onarım yönlendirmesi.",
      },
      {
        title: "İşyeri / endüstriyel yağ ve atık hattı",
        detail: "Restoran, kafe ve üretim tesislerinde yağ tutucu (grease trap) ve atık hatlarının düzenli jetle temizliği ve bakım anlaşması.",
      },
    ],
  },
  {

    slug: "tuvalet-tikanikligi-acma",
    name: "Tuvalet Tıkanıklığı Açma",
    shortName: "Tuvalet Açma",
    icon: "clog",
    responseMin: 30,
    tagline: "Klozet ve tuvalet tıkanıklığına hızlı çözüm",
    intro:
      "Taşan, su çeken ama gitmeyen tuvalet ve klozet tıkanıklıklarını boruya ve kloze zarar vermeden açıyoruz. Pompa, robotik spiral ve gerektiğinde kanal jetiyle yabancı cisim, kâğıt ve kireç kaynaklı tıkanıklıkları 7/24 ortalama 30 dakikada gideriyoruz.",
    includes: [
      "Klozet ve alaturka tuvalet tıkanıklığı açma",
      "Robotik spiral makine ile noktasal müdahale",
      "Yabancı cisim ve kâğıt kaynaklı tıkanıklık",
      "Sifon ve gider bağlantısı kontrolü",
      "Açım sonrası akış ve sızdırmazlık kontrolü",
    ],
    highlights: [
      "Klozeti sökmeden, hasarsız müdahale",
      "Yabancı cisim takılmasında özel ekipman",
      "Temiz ve hijyenik çalışma",
    ],
    faq: [
      {
        q: "Tuvalet tıkanıklığını klozeti sökmeden açıyor musunuz?",
        a: "Çoğu tıkanıklığı robotik spiral ve pompayla klozeti sökmeden açıyoruz; yalnızca yabancı cisim sıkışmasının gerektirdiği durumlarda sökme yöntemine başvururuz.",
      },
      {
        q: "Tuvalete düşen cisim çıkarılır mı?",
        a: "Evet, klozete düşen telefon, oyuncak gibi yabancı cisimleri özel ekipmanla, boruya zarar vermeden çıkarıyoruz.",
      },
      {
        q: "Acil tuvalet tıkanıklığına ne kadar sürede geliyorsunuz?",
        a: "7/24 hizmet veriyoruz ve acil çağrılara ortalama 30 dakikada adresinizdeyiz.",
      },
      {
        q: "Evde tuvalet açma yöntemleri işe yarar mı?",
        a: "Hafif kâğıt birikintilerinde pompa (lastik açacak), bol sıcak su ve deterjan ya da klozet pompasıyla geçici sonuç alabilirsiniz. Ancak karbonat-sirke ve kimyasal açıcılar çoğu kez yüzeysel kalır, kireç ve yabancı cisim kaynaklı tıkanıklığı çözmez; kostik bazlı kimyasallar conta ve boruya zarar verir. Kalıcı tuvalet açma için robotik spiral veya kanal jetiyle yapılan profesyonel müdahale gerekir.",
      },
      {
        q: "Gömme rezervuarlı (asma) klozette tıkanıklık nasıl açılıyor?",
        a: "Asma klozetlerde gider boğazı ve çıkışındaki tıkanıklığı, klozeti yerinden sökmeden klozet tipi spiral ve gerektiğinde endoskopik kamerayla açıyoruz. Rezervuar yetersiz su basıyorsa onu da kontrol eder, hem tıkanmayı hem de nedenini birlikte çözeriz.",
      },
    ],
    howTitle: "Tuvalet Tıkanıklığı Nasıl Açılır?",
    howIntro:
      "Tuvalet tıkanıklığında doğru yöntem, tıkanıklığın nedenine göre seçilir. Kloze ve boruya zarar vermeden, hijyen kurallarına uygun çalışır ve sorunun tekrar etmemesi için kaynağını kontrol ederiz.",
    process: [
      {
        step: "Tıkanıklığın nedeni tespiti",
        detail:
          "Sorunun kâğıt/kireç birikintisi mi yoksa sıkışmış yabancı cisim mi olduğunu belirler, uygun yöntemi seçeriz.",
      },
      {
        step: "Doğru ekipmanın seçimi",
        detail:
          "Hafif tıkanıklıkta pompa ve robotik spiral, ağır ve derin tıkanıklıkta yüksek basınçlı su jeti kullanırız.",
      },
      {
        step: "Açım işlemi",
        detail:
          "Tıkanıklığı parçalar ya da yabancı cismi çıkarır, hattan tamamen uzaklaştırırız; alanı hijyenik tutarız.",
      },
      {
        step: "Akış kontrolü",
        detail:
          "Sifonu birkaç kez çalıştırarak akışı test eder, sızdırmazlığı kontrol eder ve gerekirse koruyucu öneri sunarız.",
      },
    ],
    priceIntro:
      "Tuvalet tıkanıklığı açma fiyatı, tıkanıklığın nedenine ve kullanılan ekipmana göre belirlenir. Telefonda durumu dinleyip aralık veririz; kesin fiyatı işe başlamadan önce onayınıza sunarız.",
    priceFactors: [
      "Tıkanıklığın nedeni (kâğıt/kireç birikimi veya yabancı cisim)",
      "Kullanılan yöntem (pompa, robotik spiral, kanal jeti)",
      "Klozetin sökülmesinin gerekip gerekmediği",
      "Tıkanıklığın derinliği ve hat durumu",
      "Aciliyet ve hizmet saati (gece/hafta sonu acil çağrı)",
    ],
    symptoms: [
      {
        title: "Sifon çekince su yükseliyor ama gitmiyor",
        detail: "Klozetteki suyun çekildiğinde alçalmak yerine yükselip yavaş inmesi, gider çıkışında kâğıt veya yabancı cisim kaynaklı bir tıkanmanın başladığını gösterir.",
      },
      {
        title: "Klozet taşıyor / geri tepiyor",
        detail: "Sifon basınca pis suyun taşması veya banyo süzgecinden geri gelmesi, tıkanıklığın klozetin ötesinde gider hattında olduğunu gösterir; acil müdahale gerekir.",
      },
      {
        title: "Su çekilirken gurultu ve fokurdama sesi",
        detail: "Sifon sonrası duyulan hava kabarcığı/fokurdama sesi, hattın hava alamadığını ve kısmi tıkanıklık oluştuğunu işaret eder.",
      },
      {
        title: "Klozete yabancı cisim düştü",
        detail: "Telefon, oyuncak, bez, ıslak mendil veya hijyenik ped düşmesi sonrası tıkanma; kimyasalla çözülmez, cismin özel ekipmanla çıkarılması gerekir.",
      },
      {
        title: "Kötü koku ve yavaş boşalma",
        detail: "Klozetten yükselen kanalizasyon kokusu ve suyun her seferinde yavaş inmesi, gider boğazında kireç ve birikinti tabakası oluştuğunu gösterir.",
      },
      {
        title: "Sürekli akan / eksik basan rezervuar tıkanmayı gizliyor",
        detail: "Yetersiz su basan rezervuar atığı tam itemediği için tıkanma sıklaşır; hem rezervuar hem gider birlikte değerlendirilmelidir.",
      },
    ],
    emergencySteps: [
      {
        step: "Sifonu tekrar tekrar çekmeyin",
        detail: "Su gitmiyorsa sifona basmaya devam etmek taşmaya yol açar; haznedeki su seviyesi yükseldiyse rezervuar musluğunu (ara musluk) kapatın.",
      },
      {
        step: "Yabancı cisim düştüyse su vermeyin",
        detail: "Klozete cisim düştüyse sifonu çekmeyin; su basıncı cismi hatta daha derine iter ve çıkarmayı zorlaştırır. Mümkünse görünür cismi eldivenle alın.",
      },
      {
        step: "Kostik/asit açıcı dökmeyin",
        detail: "Kimyasal açıcılar yabancı cisim ve kireç tıkanıklığını çözmez; biriken suda bekleyip sıçrayarak cilt yanığına ve klozet contasına zarar verebilir.",
      },
      {
        step: "Belirtiyi paylaşın",
        detail: "'Yabancı cisim düştü / su taşıyor / yavaş gidiyor' gibi belirtiyi bize iletin; klozeti sökmeden çözecek doğru ekipmanla 7/24 ortalama 30 dakikada geliriz.",
      },
    ],
    tools: [
      {
        name: "Klozet (akustik/kademeli) pompası",
        detail: "Hava ve su basıncıyla yüzeysel kâğıt birikintilerini iterek hafif tıkanıklıkları klozete zarar vermeden hızla açarız.",
      },
      {
        name: "Klozet tipi robotik / elektrikli spiral",
        detail: "Klozet boğazına uygun başlıklı spiralle kâğıt, kireç ve sıkışmış birikintiyi delerek hattı açar; klozeti sökmeden çalışır.",
      },
      {
        name: "Yabancı cisim çıkarma (kanca/kapma) aparatları",
        detail: "Klozete düşen telefon, oyuncak ve sert cisimleri tutucu ve kamera destekli aparatlarla boruya zarar vermeden çıkarırız.",
      },
      {
        name: "Endoskopik kamera ve kanal jeti desteği",
        detail: "Tekrarlayan veya derin tıkanıklıkta gideri kamerayla görüntüler, gerektiğinde yüksek basınçlı su jetiyle hattı tam temizleriz.",
      },
    ],
    variants: [
      {
        title: "Asma / klasik klozet tıkanıklığı",
        detail: "Yere monte ve asma (gömme rezervuarlı) klozetlerde gider boğazı ve çıkış tıkanıklığının klozet sökülmeden açılması.",
      },
      {
        title: "Alaturka tuvalet ve hela taşı açma",
        detail: "Alaturka tuvalet ve hela taşı giderlerindeki kâğıt, kireç ve katı birikinti tıkanıklıklarının spiral ve jetle giderilmesi.",
      },
      {
        title: "Yabancı cisim çıkarma",
        detail: "Klozete düşen telefon, oyuncak, bez ve hijyenik ürünlerin kamera ve özel kapma aparatıyla hasarsız çıkarılması.",
      },
      {
        title: "Gömme rezervuar ve sifon kaynaklı tıkanma",
        detail: "Yetersiz basan rezervuar, arızalı sifon ve iç gider bağlantısından kaynaklı tekrarlayan tıkanıklıkların kalıcı çözümü.",
      },
      {
        title: "Site / işyeri ortak tuvalet acil açma",
        detail: "AVM, ofis, kafe ve okul gibi yoğun kullanılan ortak tuvaletlerde 7/24 öncelikli açma ve düzenli bakım anlaşması.",
      },
    ],
  },
  {

    slug: "mutfak-gider-acma",
    name: "Mutfak & Lavabo Gider Açma",
    shortName: "Gider Açma",
    icon: "clog",
    responseMin: 30,
    tagline: "Yağ ve kireç tıkanıklığına robotik açım",
    intro:
      "Mutfak evyesi, banyo lavabosu ve yer giderlerindeki yağ, kireç ve saç kaynaklı tıkanıklıkları robotik spiral makine ve yüksek basınçlı su jetiyle açıyoruz. Yavaş akan veya hiç gitmeyen giderlerinize 7/24 ortalama 30 dakikada müdahale ediyoruz.",
    includes: [
      "Mutfak evyesi ve banyo lavabosu gider açma",
      "Yer gideri ve sifon tıkanıklığı",
      "Robotik spiral makine ile noktasal açım",
      "Yağ, kireç ve saç tabakası tahliyesi",
      "Sifon ve bağlantı contası kontrolü",
    ],
    highlights: [
      "Boru ve sifona zarar vermeden müdahale",
      "Tekrarlayan tıkanıklıkta kalıcı çözüm önerisi",
      "Temiz çalışma, iş sonrası alan temizliği",
    ],
    faq: [
      {
        q: "Mutfak gideri neden sık tıkanır?",
        a: "Mutfak giderlerinde zamanla biriken yağ ve yemek artığı boru cidarına yapışarak akışı daraltır; bu yüzden düzenli ve doğru yöntemle açım gerekir.",
      },
      {
        q: "Lavabo tıkanıklığını ne kadar sürede açıyorsunuz?",
        a: "Çoğu lavabo ve evye tıkanıklığını 30-60 dakika içinde, boruya zarar vermeden açıyoruz.",
      },
      {
        q: "Tekrar tıkanırsa ne yapıyorsunuz?",
        a: "Tekrarlayan tıkanıklıklarda hattı kontrol eder, gerekirse kamera ile neden tespiti yaparak kalıcı çözüm öneririz.",
      },
      {
        q: "Evde lavabo tıkanıklığı açma yöntemleri yeterli mi?",
        a: "Karbonat-sirke, kaynar su ya da pompayla yüzeysel saç ve sabun birikintilerini geçici olarak açabilirsiniz. Fakat mutfak giderindeki sertleşmiş yağ ve kireç tabakası bu yöntemlerle çözülmez; kimyasal açıcılar boru cidarına ve sifon contasına zarar verebilir. Kalıcı lavabo tıkanıklığı açma için robotik spiral ve yüksek basınçlı su jetiyle yapılan mekanik temizlik en sağlıklı çözümdür.",
      },
      {
        q: "Mutfak gideri açma teli veya makinesiyle kendim açabilir miyim?",
        a: "Gider açma teli veya küçük el makineleri yüzeysel saç ve sabun birikintisinde işe yarayabilir; ancak yanlış kullanımda telin boru içinde dolanması, sifonun zarar görmesi ya da tıkanıklığın daha derine itilmesi sık görülür. Mutfak gideri açma işini profesyonel robotik spiralle yaptığınızda yağ-kireç tabakası boru cidarından tamamen sökülür ve tekrarlama riski azalır.",
      },
    ],
    howTitle: "Mutfak & Lavabo Gideri Nasıl Açılır?",
    howIntro:
      "Lavabo ve mutfak gideri tıkanıklığında kimyasal dökmek çoğu zaman boruya zarar verir ve kalıcı çözüm sağlamaz. Biz hattı mekanik yöntemle açar, birikintiyi tamamen tahliye eder ve sorunun kaynağını kontrol ederiz.",
    process: [
      {
        step: "Tıkanıklığın yeri tespiti",
        detail:
          "Sorunun sifonda mı yoksa gider hattında mı olduğunu belirler, en uygun açım noktasını seçeriz.",
      },
      {
        step: "Doğru ekipmanın seçimi",
        detail:
          "Yüzeysel tıkanıklıkta robotik spiral, yağ/kireç tabakasında yüksek basınçlı su jeti kullanırız.",
      },
      {
        step: "Açım ve temizlik",
        detail:
          "Boru cidarındaki yağ, kireç ve saç birikintisini parçalar, hattan tamamen uzaklaştırırız; tezgâh altını kirletmeyiz.",
      },
      {
        step: "Akış kontrolü ve öneri",
        detail:
          "Bol su vererek akışı test eder, sifon contasını kontrol eder ve tekrarı önlemek için bakım önerisi sunarız.",
      },
    ],
    priceIntro:
      "Mutfak ve lavabo gider açma fiyatı, tıkanıklığın yerine ve kullanılan ekipmana göre belirlenir. Telefonda durumu dinleyip aralık veririz; kesin fiyatı işe başlamadan önce onayınıza sunarız.",
    priceFactors: [
      "Tıkanıklığın yeri (evye, lavabo, yer gideri veya sifon)",
      "Tıkanıklığın nedeni (yağ, kireç, saç veya yabancı cisim)",
      "Kullanılan ekipman (robotik spiral veya su jeti)",
      "Açılması gereken hat uzunluğu",
      "Aciliyet ve hizmet saati (gece/hafta sonu acil çağrı)",
    ],
    symptoms: [
      {
        title: "Su evyede / lavaboda birikip yavaş iniyor",
        detail: "Bulaşık veya el yıkarken suyun gidere hemen inmeyip biriktikten sonra yavaşça çekilmesi, boru cidarında yağ-kireç tabakasının daraldığını gösterir.",
      },
      {
        title: "Giderden geri koku geliyor",
        detail: "Evye veya lavabo süzgecinden yükselen küflü/lağım kokusu, sifon ve hat içinde çürüyen yağ ve yemek artığı birikintisinin işaretidir.",
      },
      {
        title: "Çift gözlü evyede diğer göze su geri çıkıyor",
        detail: "Bir gözden boşaltılan suyun yan gözden veya bulaşık makinesi bağlantısından geri tepmesi, ortak gider hattında tıkanma olduğunu gösterir.",
      },
      {
        title: "Gurultu ve hava kabarcığı sesi",
        detail: "Su inerken duyulan fokurdama, hattın hava alamadığını ve kısmi tıkanıklık oluştuğunu işaret eder; tam tıkanmadan müdahale gerekir.",
      },
      {
        title: "Tezgâh altı sifon bağlantısından sızıntı",
        detail: "Dolap altında nem, su lekesi veya damlama; tıkanıklık nedeniyle artan basınç ya da gevşeyen/çatlamış sifon contasından kaynaklanır.",
      },
      {
        title: "Açtıktan kısa süre sonra tekrar tıkanıyor",
        detail: "Yüzeysel açımla geçici rahatlama ama kısa sürede tekrarlama, boru cidarındaki sertleşmiş yağ tabakasının tam temizlenmediğini gösterir.",
      },
    ],
    emergencySteps: [
      {
        step: "Suyu kullanmayı bırakın",
        detail: "Gider gitmiyorsa bulaşık makinesi/musluğu çalıştırmayın; biriken su tezgâh altından taşıp dolaba ve zemine zarar verebilir.",
      },
      {
        step: "Kostik/asit açıcı dökmeyin",
        detail: "Kimyasal açıcılar yağ-kireç tabakasını çözmez, biriken suda bekleyip sıçrayarak cilt yanığına, sifon contasına ve plastik boruya zarar verir.",
      },
      {
        step: "Sifonu zorla sökmeye çalışmayın",
        detail: "Dolu hatta sifonu sökmek dolap içine pis su boşaltır; gerekiyorsa sifon altına kova koyup ara musluğu kapatın, birikintiyi kurcalamayın.",
      },
      {
        step: "Belirtiyi paylaşın",
        detail: "'Evye gitmiyor / geri tepiyor / koku var' gibi belirtiyi iletin; boru ve sifona zarar vermeden açacak doğru ekipmanla 7/24 ortalama 30 dakikada geliriz.",
      },
    ],
    tools: [
      {
        name: "Robotik / elektrikli spiral makine",
        detail: "Değişken başlıklı spiralle boru cidarındaki yağ, saç ve kireç tabakasını söker; sifondan veya kolon hattından noktasal açım yapar.",
      },
      {
        name: "Yüksek basınçlı su jeti",
        detail: "Sertleşmiş yağ ve kireç tabakasını yüksek basınçlı suyla parçalayıp hattan tamamen uzaklaştırır; tekrarlama riskini en aza indirir.",
      },
      {
        name: "Sifon sökme ve conta-rakor seti",
        detail: "Tıkanıklık sifonda ise körüklü/şişe sifonu söküp temizler, gevşeyen veya çatlayan bağlantı contalarını yenisiyle değiştiririz.",
      },
      {
        name: "Endoskopik kamera ile neden tespiti",
        detail: "Tekrarlayan tıkanıklıkta hattı kamerayla görüntüler, çökme/yağ tabakası/yanlış eğim gibi kök nedeni belirleyip kalıcı çözüm öneririz.",
      },
    ],
    variants: [
      {
        title: "Mutfak evyesi gider açma",
        detail: "Çift gözlü evye, bulaşık makinesi bağlantısı ve mutfak kolon hattındaki yağ-kireç kaynaklı tıkanıklıkların robotik spiral ve jetle açılması.",
      },
      {
        title: "Banyo lavabosu ve hilton sifon açma",
        detail: "Lavabodaki saç, sabun ve kireç birikintisinin açılması; tıkanan dekoratif (hilton) sifonların temizliği veya değişimi.",
      },
      {
        title: "Yer gideri ve süzgeç tıkanıklığı",
        detail: "Banyo, balkon ve çamaşır odası yer giderlerindeki saç ve kireç tıkanıklığının açılması, koku yapan kuru süzgeçlerin kontrolü.",
      },
      {
        title: "Sifon ve bağlantı kaynaklı sızıntı + tıkanma",
        detail: "Gevşek/çatlak sifon, yanlış eğimli bağlantı ve contadan sızıntıyla birlikte görülen tekrarlayan tıkanıklıkların kalıcı çözümü.",
      },
      {
        title: "İşyeri mutfağı ve ortak alan acil açma",
        detail: "Restoran, kafe ve ofis mutfaklarındaki yoğun yağ kaynaklı tıkanıklıklarda 7/24 öncelikli açma ve düzenli bakım anlaşması.",
      },
    ],
  },

  {
    slug: "dusakabin-vitrifiye-montaji",
    name: "Duşakabin & Vitrifiye Montajı",
    shortName: "Duşakabin & Vitrifiye",
    icon: "shower",
    responseMin: 60,
    tagline: "Klozet, lavabo, duşakabin profesyonel montaj",
    intro:
      "Klozet, lavabo, duşakabin ve tüm vitrifiye ürünlerinin montaj, değişim ve tamirini su kaçırmayan, kusursuz işçilikle yapıyoruz. Eski takımı söker, gider bağlantılarını yeniler, contaları sızdırmaz şekilde keser ve montajı aynı gün tamamlarız.",
    includes: [
      "Klozet montajı, değişimi ve gider borusu bağlantısı",
      "Klozet tamiri: iç takım, rezervuar ve sızdırmazlık onarımı",
      "Lavabo montajı, evye ve hilton lavabo montajı",
      "Duşakabin montajı, kurulumu, cam ve profil montajı",
      "Duşakabin tamiri: teker, conta, mıknatıs ve profil değişimi",
      "Vitrifiye montajı: gömme rezervuar ve asma klozet",
      "Silikon, conta ve sızdırmazlık işçiliği",
    ],
    highlights: [
      "Sıfır su sızıntısı garantisi, temiz işçilik",
      "Marka bağımsız tüm vitrifiye ürünlerine montaj",
      "Tüm işçilik 2 yıl garantili",
    ],
    faq: [
      {
        q: "Klozet montajı ne kadar sürer?",
        a: "Standart bir klozet montajı ortalama 1-2 saatte tamamlanır; asma klozet ve gömme rezervuarlı sistemlerde süre montaj kapsamına göre değişir.",
      },
      {
        q: "Eski duşakabini söküp yenisini takıyor musunuz?",
        a: "Evet. Eski duşakabini söker, zemin ve duvar yüzeyini hazırlar, yeni duşakabini su kaçırmayacak şekilde monte eder ve silikon işçiliğini tamamlarız.",
      },
      {
        q: "Klozet tamiri mi gerekir, değişim mi?",
        a: "Sürekli akıtan rezervuar, gevşeyen klozet veya bozulan iç takım çoğu zaman klozet tamiri ile (iç takım, conta veya rezervuar mekanizması değişimi) çözülür; klozet gövdesi çatlamış veya gider bağlantısı bozulmuşsa değişim daha sağlıklı olur. En uygun yöntemi yerinde belirleriz.",
      },
      {
        q: "Duşakabin tamiri yapıyor musunuz?",
        a: "Evet. Duşakabin tamirinde kayan tekerlek (makara), conta, mıknatıs lastiği, kapı profili ve menteşe gibi yıpranan parçaları değiştirir, su sızdıran köşeleri yeniden silikonlarız. Çoğu arıza kabini komple değiştirmeden çözülür.",
      },
      {
        q: "Montaj için ürünü siz mi temin ediyorsunuz?",
        a: "Dilerseniz ürünü siz alırsınız, dilerseniz ihtiyacınıza uygun ürün önerip temin ederiz. Keşif ve fiyat teklifi ücretsizdir.",
      },
    ],
    howTitle: "Klozet & Duşakabin Montajı Nasıl Yapılır?",
    howIntro:
      "Vitrifiye montajında en kritik nokta sızdırmazlıktır. Yanlış bağlanan bir gider borusu veya kötü kesilmiş bir conta zamanla alt kata su kaçağına yol açar. Biz montajı doğru ölçü ve doğru contayla yapar, sonunda su testiyle doğrularız.",
    process: [
      {
        step: "Ücretsiz keşif ve ölçü alma",
        detail:
          "Montaj yapılacak alanı, gider çıkışını ve su giriş noktalarını ölçer, ürünün yerine tam uyacağını doğrularız.",
      },
      {
        step: "Eski ürünün sökümü ve hazırlık",
        detail:
          "Varsa eski klozet/lavabo/duşakabini söker, gider ve su bağlantılarını temizler, yüzeyi montaja hazır hale getiririz.",
      },
      {
        step: "Montaj ve sızdırmazlık",
        detail:
          "Ürünü teraziyle hizalayıp sabitler, gider contası ve silikon ile sızdırmazlığı sağlar, batarya ve rezervuar bağlantılarını yaparız.",
      },
      {
        step: "Su testi ve teslim",
        detail:
          "Su verip sızıntı kontrolü yapar, akışı test eder ve alanı temizleyerek teslim ederiz. İşçilik garantilidir.",
      },
    ],
    priceIntro:
      "Duşakabin ve vitrifiye montaj fiyatı, ürün tipine ve montajın kapsamına göre değişir. Telefonda durumu dinleyip aralık verir, kesin fiyatı yerinde keşiften sonra onayınıza sunarız.",
    priceFactors: [
      "Montaj türü: klozet, lavabo, duşakabin veya gömme rezervuar",
      "Eski ürünün sökümü ve gider hattı düzenlemesi",
      "Gerekli bağlantı, conta ve sızdırmazlık malzemesi",
      "Duvar/zemin yüzeyinin durumu ve hazırlık ihtiyacı",
      "Aciliyet ve hizmet saati",
    ],
    symptoms: [
      {
        title: "Klozet zemininden sızıntı / oynama",
        detail: "Klozet tabanından su sızması, gevşeme veya sallanma; gider contasının (flanş) bozulduğunu ya da montajın yanlış sabitlendiğini gösterir, alt kata kaçak riski taşır.",
      },
      {
        title: "Sürekli akıtan / dolan rezervuar",
        detail: "İç takım, flatör veya alttan/yandan dolan mekanizmanın arızası rezervuarın sürekli su almasına yol açar; hem su faturasını artırır hem de damlama yapar.",
      },
      {
        title: "Duşakabin köşelerinden su kaçırma",
        detail: "Eskiyen silikon, bozulan conta veya hizasız profil yüzünden duşakabin köşelerinden ve kapı altından su sızar, banyo zeminini ıslatır.",
      },
      {
        title: "Duşakabin kapısı zor kayıyor / düşmüş",
        detail: "Makara (teker), ray veya menteşe aşınması kapının takılmasına, sürtmesine ya da camın hizasından çıkmasına neden olur; güvenlik açısından erken müdahale gerekir.",
      },
      {
        title: "Yeni montaj / komple yenileme ihtiyacı",
        detail: "Banyo tadilatı, eski takımın değişimi veya sıfır daire teslimi gibi durumlarda klozet, lavabo ve duşakabinin sızdırmaz şekilde monte edilmesi gerekir.",
      },
      {
        title: "Çıkış tipi uyumsuzluğu (arkadan/alttan)",
        detail: "Alınan klozetin gider çıkış tipi (arkadan, alttan veya yerden çıkışlı) mevcut tesisata uymadığında montaj öncesi adaptör/rakor ile doğru bağlantının kurulması gerekir.",
      },
    ],
    emergencySteps: [
      {
        step: "Su giriş vanasını kapatın",
        detail: "Klozet, lavabo veya duşakabinde sızıntı varsa ilgili köşe vanasını (ara musluk) kapatarak su akışını durdurun; vana yoksa dairenin ana vanasını kapatın.",
      },
      {
        step: "Montaj alanını boşaltın ve temizleyin",
        detail: "Ekip gelmeden önce eski ürünün çevresini, dolap ve eşyaları boşaltın; çalışma alanının açık olması montajı hızlandırır ve süreyi kısaltır.",
      },
      {
        step: "Ürün ve aksesuarları hazır bulundurun",
        detail: "Monte edilecek klozet, lavabo veya duşakabini kutusu, contaları ve montaj aparatlarıyla birlikte hazır tutun; eksik parça varsa keşifte tamamlarız.",
      },
      {
        step: "Çıkış tipi ve ölçüyü doğrulayın",
        detail: "Mümkünse gider çıkış tipini (arkadan/alttan/yerden) ve montaj alanının ölçüsünü bizimle paylaşın; doğru rakor ve conta ile tek seferde sızdırmaz montaj yaparız.",
      },
    ],
    tools: [
      {
        name: "Lazer terazi ve hizalama seti",
        detail: "Klozet, lavabo ve duşakabin profilini lazer teraziyle hizalar, ürünün düz ve dengeli oturmasını sağlayarak ileride oynama ve sızıntıyı önleriz.",
      },
      {
        name: "Profesyonel sızdırmazlık (silikon) ekipmanı",
        detail: "Antibakteriyel saniter silikon ve düzgün çekim aparatlarıyla köşe ve birleşim noktalarını temiz, kalıcı ve su geçirmez şekilde mühürleriz.",
      },
      {
        name: "Gider flanşı, conta ve rakor seti",
        detail: "Arkadan, alttan ve yerden çıkışlı klozetlere uygun flanş, körük ve contalarla gider bağlantısını koku ve su sızdırmayacak şekilde kurarız.",
      },
      {
        name: "Karot ve hassas delme makinesi",
        detail: "Fayans ve granit yüzeyleri çatlatmadan karot ucu ve düşük devirle deler, asma klozet/gömme rezervuar taşıyıcısını sağlam şekilde sabitleriz.",
      },
    ],
    variants: [
      {
        title: "Klozet montajı ve değişimi",
        detail: "Arkadan, alttan ve yerden çıkışlı klozetlerin sökümü, yeni klozet montajı, gider bağlantısı ve sızdırmaz tabana oturtma işçiliği.",
      },
      {
        title: "Asma klozet & gömme rezervuar",
        detail: "Gömme rezervuar taşıyıcı kasanın duvara montajı, asma klozetin hizalı sabitlenmesi ve panel/buton bağlantısının yapılması.",
      },
      {
        title: "Lavabo & hilton lavabo montajı",
        detail: "Tezgâh üstü, tezgâha sıfır ve ayaklı/hilton lavaboların montajı, sifon ve batarya bağlantısı ile sızdırmazlık işçiliği.",
      },
      {
        title: "Duşakabin montajı ve kurulumu",
        detail: "Tekneli, teknesiz ve fayans üstü duşakabinlerin profil, cam ve kapı montajı; teraziyle hizalama ve köşe silikon işçiliği.",
      },
      {
        title: "Duşakabin & klozet tamiri",
        detail: "Duşakabinde makara, conta, mıknatıs ve profil değişimi; klozette iç takım, rezervuar ve sızdırmazlık onarımı ile ürünü değiştirmeden çözüm.",
      },
    ],
  },
  {
    slug: "musluk-batarya-degisimi",
    name: "Musluk & Batarya Değişimi",
    shortName: "Musluk & Batarya",
    icon: "faucet",
    responseMin: 45,
    tagline: "Damlayan musluğa hızlı, kalıcı çözüm",
    intro:
      "Mutfak, banyo ve lavabo bataryalarının değişimi, tamiri ve damlama arızalarını hızla çözüyoruz. Aşınan kartuş ve contaları yeniler, kireçlenen bataryaları temizler, yeni bataryayı su kaçırmayacak şekilde monte ederiz.",
    includes: [
      "Mutfak, banyo ve lavabo bataryası değişimi",
      "Damlayan musluk ve batarya tamiri",
      "Kartuş, conta ve perlatör değişimi",
      "Ankastre (gömme) batarya montajı",
      "Su giriş hortumu ve ara musluk yenileme",
    ],
    highlights: [
      "Damlama ve sızıntıya kalıcı çözüm, su faturasında tasarruf",
      "Marka bağımsız tüm bataryalara servis",
      "Tüm işçilik 2 yıl garantili",
    ],
    faq: [
      {
        q: "Damlayan musluk tamir mi edilir, değişir mi?",
        a: "Çoğu damlama, kartuş veya conta değişimiyle çözülür. Batarya gövdesi kireçten ileri derecede aşınmışsa değişimi daha ekonomik olur; en uygun yöntemi yerinde belirleriz.",
      },
      {
        q: "Batarya değişimi ne kadar sürer?",
        a: "Standart bir batarya değişimi ortalama 30-45 dakikada tamamlanır; ankastre bataryalarda süre montaj tipine göre değişir.",
      },
      {
        q: "Bataryayı siz mi temin ediyorsunuz?",
        a: "Ürünü siz alabilir ya da ihtiyacınıza uygun batarya önerip temin edebiliriz. Keşif ve fiyat teklifi ücretsizdir.",
      },
      {
        q: "Damlayan musluk evde nasıl tamir edilir?",
        a: "Aç-kapa (vidalı) musluklarda sorun çoğunlukla salmastra ya da contadır; klasik musluklarda ise üst başlık sökülüp conta değiştirilebilir. Tek kollu (kartuşlu) bataryalarda damlamanın kaynağı genellikle aşınan seramik kartuştur ve kartuşun komple değişmesi gerekir. Ana vanayı kapatmadan ve doğru yedek parça takılmadan yapılan müdahaleler çoğu zaman damlamayı artırır. Parçayı kısa sürede bulamıyor, kireçlenmiş başlığı söküp zorlanıyorsanız bataryaya zarar vermemek için ekibimizi çağırın; doğru kartuş ve contayla kalıcı çözüm sağlarız.",
      },
      {
        q: "Aç kapa musluk tamiri yapıyor musunuz?",
        a: "Evet. Aç-kapa (vidalı) mutfak, banyo ve taharet musluklarında salmastra, conta ve başlık değişimini, gerekirse komple musluk değişimini yerinde yapıyoruz. Kireçlenmiş ya da sıkışmış başlıkları zarar vermeden söker, sızdırmaz şekilde yeniden monte ederiz.",
      },
    ],
    howTitle: "Musluk & Batarya Değişimi Nasıl Yapılır?",
    howIntro:
      "Batarya değişiminde su girişinin doğru kapatılması ve bağlantıların sızdırmaz yapılması esastır. Aceleyle sıkılan bir rakor ya da yanlış conta, kısa sürede damlamaya ve dolap altında su birikmesine yol açar. Biz montajı kurallı yapar, su testiyle bitiririz.",
    process: [
      {
        step: "Su girişini kapatma ve söküm",
        detail:
          "Ara muslukları veya ana vanayı kapatır, eski bataryayı söker, bağlantı yüzeylerini temizleriz.",
      },
      {
        step: "Bağlantı ve conta kontrolü",
        detail:
          "Su giriş hortumlarını, ara muslukları ve contaları kontrol eder, aşınmış parçaları yenileriz.",
      },
      {
        step: "Yeni bataryanın montajı",
        detail:
          "Yeni bataryayı sızdırmazlık bandı ve contalarıyla bağlar, sağlam ve düzgün hizada sabitleriz.",
      },
      {
        step: "Su testi ve teslim",
        detail:
          "Su verip sıcak/soğuk akışı ve damlama kontrolü yapar, çalışmayı garanti altına alarak teslim ederiz.",
      },
    ],
    priceIntro:
      "Musluk ve batarya değişim fiyatı, batarya tipine ve tamir mi değişim mi gerektiğine göre belirlenir. Durumu telefonda dinler, kesin fiyatı işe başlamadan onayınıza sunarız.",
    priceFactors: [
      "İşlem türü: tamir, kartuş değişimi veya komple batarya değişimi",
      "Batarya tipi: standart, ankastre (gömme) veya özel sistem",
      "Değişecek yedek parça (kartuş, conta, hortum, ara musluk)",
      "Mevcut tesisat ve bağlantıların durumu",
      "Aciliyet ve hizmet saati",
    ],
    symptoms: [
      {
        title: "Musluk sürekli damlatıyor / akıtıyor",
        detail: "Kapalıyken bile damlayan musluk genelde aşınan seramik kartuş veya bozulan contadan kaynaklanır; günde litrelerce su kaybettirir ve su faturasını artırır.",
      },
      {
        title: "Aç-kapa musluk contadan sızıyor",
        detail: "Aç-kapa (vidalı) musluklarda başlık altından veya salmastradan su sızması, salmastra ipinin/contanın yıprandığını gösterir; sıkmak çözmez, conta yenilenmelidir.",
      },
      {
        title: "Kola/volan zor dönüyor, kireç tutmuş",
        detail: "Kolun sertleşmesi, gıcırdaması veya tam kapanmaması bataryanın içine kireç birikip kartuşu kilitlediğine işaret eder; zorlamak kartuşu kırabilir.",
      },
      {
        title: "Su basıncı düşük / perlatör tıkalı",
        detail: "Musluktan zayıf veya dağınık akış, ucundaki perlatörün (süzgeç) kireç ve tortuyla tıkandığını gösterir; temizlik veya perlatör değişimiyle düzelir.",
      },
      {
        title: "Sıcak-soğuk karışmıyor / ters akıyor",
        detail: "Tek kollu bataryada sıcak ve soğuğun ayarlanamaması ya da ters gelmesi, kartuş arızasına veya montajda giriş hortumlarının yer değiştirmesine işaret eder.",
      },
      {
        title: "Batarya altında / dolap içinde su birikintisi",
        detail: "Evye ya da lavabo dolabında nem ve su birikmesi; gevşeyen rakor, çatlayan giriş hortumu veya bozulan ara musluktan sızıntı olduğunu gösterir.",
      },
    ],
    emergencySteps: [
      {
        step: "Ara musluğu / ana vanayı kapatın",
        detail: "Damlama veya sızıntıda batarya altındaki sıcak-soğuk ara muslukları kapatın; yoksa dairenin ana su vanasını kapatarak akışı durdurun.",
      },
      {
        step: "Dolap altını boşaltıp kurulayın",
        detail: "Evye/lavabo dolabındaki eşyaları çıkarıp zemini kurulayın; böylece sızıntının kaynağını net görür, şişme ve küfü önlersiniz.",
      },
      {
        step: "Kireçli başlığı zorlamayın",
        detail: "Sıkışan aç-kapa başlığını veya kartuşu pense/kuvvetle zorlamayın; krom kaplama çizilir, somun sıyrılır ve tamir maliyeti artar. Doğru anahtarla biz sökeriz.",
      },
      {
        step: "Batarya tipini / modeli paylaşın",
        detail: "Mümkünse batarya markasını, tek kollu mu aç-kapa mı olduğunu ve mutfak/banyo/lavabo ayrımını bize iletin; doğru kartuş ve contayı yanımızda getirip tek seferde çözeriz.",
      },
    ],
    tools: [
      {
        name: "Kartuş sökme ve batarya anahtar seti",
        detail: "Allen (alyan) anahtarları, kartuş çıkarma ve uzun pipo anahtarlarıyla bataryayı zarar vermeden söker, sıkışan parçaları güvenle çıkarırız.",
      },
      {
        name: "Orijinal kartuş, conta ve salmastra stoğu",
        detail: "Tek kollu seramik kartuş, aç-kapa salmastra, o-ring ve perlatör çeşitlerini araçta bulundurur, çoğu arızayı tek gelişte kalıcı olarak çözeriz.",
      },
      {
        name: "Kireç çözücü ve perlatör temizleme seti",
        detail: "Kireçlenen başlık, perlatör ve iç parçaları çözücüyle temizleyerek su basıncını ve akış düzenini eski haline getiririz.",
      },
      {
        name: "Sızdırmazlık bandı ve tork kontrollü montaj",
        detail: "Teflon bant ve uygun contalarla rakor bağlantılarını ölçülü sıkar, ne sızdıran ne de zorlanıp çatlayan sağlam bir montaj yaparız.",
      },
    ],
    variants: [
      {
        title: "Mutfak / evye bataryası değişimi",
        detail: "Standart, spiralli (bulaşık duşlu) ve yüksek tip mutfak bataryalarının sökümü, yeni batarya montajı ve giriş hortumu/ara musluk yenilemesi.",
      },
      {
        title: "Banyo & lavabo bataryası değişimi",
        detail: "Lavabo, banyo ve duş bataryalarının değişimi; tek kollu ve aç-kapa modellerde sızdırmaz montaj ve hizalama işçiliği.",
      },
      {
        title: "Kartuş & conta değişimi (tamir)",
        detail: "Damlayan tek kollu bataryalarda seramik kartuş, aç-kapa musluklarda salmastra/conta değişimiyle bataryayı değiştirmeden kalıcı çözüm.",
      },
      {
        title: "Ankastre (gömme) batarya montajı",
        detail: "Duvar içi ankastre batarya ve duş sistemlerinin gövde, kartuş ve kapak montajı; sızdırmazlık ve doğru sıcaklık ayarının kurulması.",
      },
      {
        title: "Perlatör, hortum ve ara musluk yenileme",
        detail: "Tıkanan perlatörün temizliği/değişimi, çatlayan giriş hortumlarının ve bozulan ara muslukların yenilenmesiyle sızıntının önlenmesi.",
      },
    ],
  },
  {
    slug: "hidrofor-kurulumu",
    name: "Hidrofor Kurulumu & Arıza",
    shortName: "Hidrofor",
    icon: "pump",
    responseMin: 60,
    tagline: "Düşük su basıncına kalıcı çözüm",
    intro:
      "Düşük su basıncı, sürekli çalışan veya basınç tutmayan hidroforlar için kurulum, montaj, basınç ayarı ve arıza onarımı yapıyoruz. Bina ve daire tipi hidroforları doğru kapasiteyle seçer, sessiz ve verimli çalışacak şekilde devreye alırız.",
    includes: [
      "Daire ve bina tipi hidrofor kurulumu",
      "Hidrofor montajı ve devreye alma",
      "Basınç ayarı ve genleşme tankı kontrolü",
      "Sürekli çalışma ve basınç tutmama arızası onarımı",
      "Presostat, membran ve motor parça değişimi",
    ],
    highlights: [
      "Doğru kapasite seçimiyle sessiz ve verimli çalışma",
      "Sürekli devreye giren hidrofora kalıcı çözüm",
      "Tüm işçilik 2 yıl garantili",
    ],
    faq: [
      {
        q: "Hidrofor neden sürekli çalışıyor?",
        a: "Genellikle genleşme tankındaki hava basıncının düşmesi, membran arızası veya tesisattaki bir kaçak buna yol açar. Nedenini yerinde tespit eder, en uygun çözümü uygularız.",
      },
      {
        q: "Daireme hidrofor takılır mı?",
        a: "Evet. Su basıncınızı ve kullanım ihtiyacınızı değerlendirip daireye uygun kapasitede, sessiz çalışan bir hidrofor seçer ve kurarız.",
      },
      {
        q: "Hidrofor kurulumu için ücret alıyor musunuz?",
        a: "Keşif ve fiyat teklifi ücretsizdir. Kapasite önerisi ve net fiyatı onayınıza sunmadan işleme başlamayız.",
      },
      {
        q: "Hidroforda en sık karşılaşılan arızalar nelerdir?",
        a: "En yaygın hidrofor arızaları: presostatın (basınç şalteri) ayarsız kalması ya da bozulması, genleşme tankı membranının patlaması, su basıncı tutmaması, hidroforun sürekli çalışıp durması (rölanti yapması), aşırı titreşim ve gürültü, motorun ısınması veya hiç çalışmamasıdır. Çoğu arıza presostat ayarı, membran ya da parça değişimiyle çözülür; nedenini yerinde tespit edip en ekonomik çözümü uygularız.",
      },
      {
        q: "Hidrofor su deposuyla birlikte mi kurulur?",
        a: "Şebeke basıncının düşük veya kesintili olduğu binalarda hidrofor genellikle bir su deposundan (ör. 3 tonluk depo) emiş yapacak şekilde kurulur; şamandıra ve elektrik bağlantısıyla birlikte devreye alınır. İhtiyacınıza göre depolu ya da doğrudan hat üzerinden kurulumu doğru kapasiteyle planlarız.",
      },
    ],
    howTitle: "Hidrofor Kurulumu Nasıl Yapılır?",
    howIntro:
      "Doğru hidrofor, ihtiyaca göre seçilen kapasiteyle başlar. Yanlış seçilen bir hidrofor ya yetersiz basınç verir ya da sürekli devreye girip hem ses çıkarır hem de ömrünü kısaltır. Biz kapasiteyi doğru hesaplar, basıncı tesisata göre ayarlarız.",
    process: [
      {
        step: "Su basıncı ve ihtiyaç analizi",
        detail:
          "Mevcut su basıncını ölçer, daire/bina ihtiyacını ve çıkış sayısını değerlendirerek doğru kapasiteyi belirleriz.",
      },
      {
        step: "Montaj ve bağlantı",
        detail:
          "Hidroforu uygun noktaya, titreşim ve ses yapmayacak şekilde monte eder, emiş ve basma hatlarını bağlarız.",
      },
      {
        step: "Basınç ayarı ve devreye alma",
        detail:
          "Genleşme tankı hava basıncını ve presostatı ayarlar, hidroforu devreye alıp çalışma aralığını optimize ederiz.",
      },
      {
        step: "Test ve teslim",
        detail:
          "Tüm çıkışlarda basıncı test eder, sızdırmazlığı ve sessiz çalışmayı kontrol ederek garantili teslim ederiz.",
      },
    ],
    priceIntro:
      "Hidrofor kurulum ve arıza fiyatı, cihaz kapasitesine ve işin kapsamına (kurulum mu, arıza onarımı mı) göre değişir. Durumu dinleyip aralık verir, kesin fiyatı keşiften sonra onayınıza sunarız.",
    priceFactors: [
      "İşlem türü: yeni kurulum, montaj veya arıza onarımı",
      "Hidrofor kapasitesi ve tipi (daire/bina)",
      "Değişecek parça (presostat, membran, genleşme tankı, motor)",
      "Tesisat bağlantısının ve montaj noktasının durumu",
      "Aciliyet ve hizmet saati",
    ],
    symptoms: [
      {
        title: "Üst katlarda / sabah-akşam basınç düşüyor",
        detail: "Birden fazla musluk açıldığında veya yoğun kullanım saatlerinde duş ve batarya basıncının zayıflaması, şebeke veya mevcut hidroforun ihtiyacı karşılayamadığını gösterir.",
      },
      {
        title: "Hidrofor sürekli devreye girip duruyor (rölanti)",
        detail: "Hiç su kullanılmazken bile motorun sık sık çalışıp durması (kısa aralıklarla 'tık tık' devreye girme), genleşme tankı hava basıncının düşmesinin veya tesisatta sızıntının habercisidir.",
      },
      {
        title: "Hidrofor hiç durmadan çalışıyor",
        detail: "Basıncı bir türlü tutturamayıp sürekli dönen hidrofor; presostat ayarsızlığı, çek valf arızası veya emiş hattında hava kaçağı anlamına gelir ve motoru yakabilir.",
      },
      {
        title: "Aşırı titreşim, gürültü ve su darbesi",
        detail: "Çalışırken sarsılan, ses yapan veya muslukları açıp kapatınca borularda 'gümbürtü' (su koçu) oluşturan hidrofor; yanlış montaj, gevşek bağlantı veya tank basıncı sorununa işaret eder.",
      },
      {
        title: "Musluktan kesik kesik / havalı su geliyor",
        detail: "Su tıslayarak, sıçrayarak ve aralıklı gelmesi tankta hava-su dengesinin bozulduğunu ya da emişte hava karıştığını gösterir.",
      },
      {
        title: "Motor ısınıyor, sigorta attırıyor veya hiç çalışmıyor",
        detail: "Aşırı ısınan, koku yapan ya da devreye girince sigorta attıran hidrofor elektriksel/mekanik arıza taşır; zorlamadan kapatıp kontrol ettirmek gerekir.",
      },
    ],
    emergencySteps: [
      {
        step: "Hidroforun elektriğini kesin",
        detail: "Sürekli çalışan, ısınan veya su kaçıran hidroforda önce sigortayı/fişi kapatın; kuru çalışan pompa motoru kısa sürede yanabilir.",
      },
      {
        step: "Ana su vanasını kontrol edin",
        detail: "Görünür bir kaçak veya su birikintisi varsa hidrofor giriş/çıkış vanasını kapatıp ortamı kuru tutun, elektrik panosuna su ulaşmasını engelleyin.",
      },
      {
        step: "Tank ve presostat ayarını zorlamayın",
        detail: "Genleşme tankı supabına veya presostat vidalarına bilgisiz müdahale dengeyi büsbütün bozar; tahmini ayarla kurcalamak yerine ölçümle düzeltilmelidir.",
      },
      {
        step: "Marka, kapasite ve arıza belirtisini paylaşın",
        detail: "Hidrofor markası, daire/bina tipi ve 'sürekli çalışıyor / basınç yok / ses yapıyor' gibi belirtiyi bize iletin; doğru parça ve ekiple tek seferde geliriz.",
      },
    ],
    tools: [
      {
        name: "Manometre ve basınç ölçüm seti",
        detail: "Şebeke ve tesisat basıncını ölçerek doğru hidrofor kapasitesini belirler, genleşme tankı hava ön-basıncını üretici değerine göre ayarlarız.",
      },
      {
        name: "Presostat (basınç şalteri) ayar ve test ekipmanı",
        detail: "Devreye girme/çıkma basınç aralığını (start-stop) tesisata göre kalibre eder, hidroforun gereksiz rölanti yapmasını önleriz.",
      },
      {
        name: "Genleşme tankı / membran ve presostat yedek stoğu",
        detail: "Patlamış membran, hava tutmayan tank, bozuk presostat ve çek valf gibi en sık arızalı parçaları araçta bulundurur, çoğu onarımı tek ziyarette tamamlarız.",
      },
      {
        name: "Titreşim takozu ve esnek bağlantı elemanları",
        detail: "Hidroforu titreşim takozları ve flexible (esnek) rakorlarla bağlayarak ses ve su darbesini düşürür, sessiz ve uzun ömürlü çalışma sağlarız.",
      },
    ],
    variants: [
      {
        title: "Daire tipi hidrofor kurulumu",
        detail: "Üst katlarda veya bağımsız dairelerde düşük basınca çözüm; sessiz, kompakt ve daire ihtiyacına uygun kapasitede hidrofor seçimi ve montajı.",
      },
      {
        title: "Bina / apartman hidrofor sistemi",
        detail: "Çok katlı binalarda depodan emişli, frekans kontrollü (hız ayarlı) veya çoklu pompalı sistemlerin doğru kapasiteyle kurulumu ve devreye alınması.",
      },
      {
        title: "Sürekli çalışma ve basınç tutmama arızası",
        detail: "Rölanti yapan ya da hiç durmayan hidroforda presostat ayarı, genleşme tankı/membran ve çek valf kontrolüyle kalıcı çözüm.",
      },
      {
        title: "Membran, presostat ve motor parça değişimi",
        detail: "Patlamış membran, bozuk basınç şalteri, arızalı motor veya kapasitör değişimini orijinaline uygun parçayla yapar, garantili teslim ederiz.",
      },
      {
        title: "Depolu sistem, şamandıra ve su deposu bağlantısı",
        detail: "Şebeke basıncının düşük/kesintili olduğu binalarda su deposu, şamandıra ve hidrofor entegrasyonu; kuru çalışmaya karşı koruma tertibatı kurulumu.",
      },
    ],
  },
  {

    slug: "kombi-montaji",
    name: "Kombi Montajı",
    shortName: "Kombi Montajı",
    icon: "combi",
    responseMin: 60,
    tagline: "Yetkili işçilikle kombi kurulumu",
    intro:
      "Yeni kombi montajı, eski kombi değişimi ve yoğuşmalı kombi kurulumunu yetkili işçilikle yapıyoruz. Baca, gaz ve su bağlantılarını standartlara uygun kurar, cihazı devreye alır ve ilk çalıştırma ayarlarını yaparız.",
    includes: [
      "Yeni kombi ve yoğuşmalı kombi montajı",
      "Eski kombi sökümü ve değişimi",
      "Baca, gaz ve su hattı bağlantısı",
      "Genleşme tankı ve basınç ayarı",
      "Devreye alma ve ilk çalıştırma kontrolü",
    ],
    highlights: [
      "Standartlara uygun, güvenli baca ve gaz bağlantısı",
      "Yoğuşmalı sistemlerde doğru yoğuşma suyu tahliyesi",
      "Tüm işçilik 2 yıl garantili",
    ],
    faq: [
      {
        q: "Kombi montajı ne kadar sürer?",
        a: "Standart bir kombi montajı ortalama 2-3 saatte tamamlanır; eski kombi değişimi ve baca/gaz hattı düzenlemesi gerektiğinde süre artabilir.",
      },
      {
        q: "Eski kombimi söküp yenisini takıyor musunuz?",
        a: "Evet. Eski kombiyi güvenle söker, bağlantıları kontrol eder ve yeni kombiyi su, gaz ve baca standartlarına uygun şekilde monte ederiz.",
      },
      {
        q: "Kombi montajında baca bağlantısı yapıyor musunuz?",
        a: "Evet. Hermetik ve yoğuşmalı kombilerde baca bağlantısını ve yoğuşma suyu tahliyesini standartlara uygun şekilde kurarız.",
      },
      {
        q: "Yoğuşmalı kombi montajı standart kombiden farklı mı?",
        a: "Evet. Yoğuşmalı kombi montajında en kritik fark yoğuşma suyu (kondens) tahliyesidir; tahliye hortumu doğru eğimle ve donmayacak şekilde gidere bağlanmazsa cihaz arıza verir ve verim düşer. Biz yoğuşma giderini, hermetik bacayı ve gaz hattını standartlara uygun kurar, devreye almadan önce tüm bağlantıları test ederiz.",
      },
      {
        q: "Kombi montajı için proje gerekli mi?",
        a: "Yeni doğalgaz aboneliği veya hat değişikliği gerektiren kurulumlarda yetkili firma onaylı proje istenir; mevcut hatta birebir kombi değişiminde çoğu zaman proje gerekmez. Durumunuzu keşifte netleştirir, gereken evrak ve onay sürecinde yönlendiririz.",
      },
      {
        q: "Kombi montaj ücreti ne kadar?",
        a: "Kombi montaj ücreti; yeni kurulum mu yoksa eski kombi değişimi mi olduğuna, baca ve gaz hattı düzenleme ihtiyacına ve kullanılacak bağlantı setine göre değişir. Durumu telefonda dinleyip aralık verir, kesin fiyatı keşiften sonra işe başlamadan onayınıza sunarız.",
      },
    ],
    howTitle: "Kombi Montajı Nasıl Yapılır?",
    howIntro:
      "Kombi montajı, güvenlik gerektiren bir iştir: gaz, baca ve su bağlantıları standartlara uygun yapılmazsa hem verim düşer hem de risk doğar. Biz montajı kurallı yapar, devreye almadan önce sızdırmazlık ve baca kontrolünü tamamlarız.",
    process: [
      {
        step: "Keşif ve yer tespiti",
        detail:
          "Montaj noktasını, baca çıkışını, gaz ve su hatlarını inceler; cihazın konumunu güvenlik ve verim açısından belirleriz.",
      },
      {
        step: "Eski cihazın sökümü (gerekirse)",
        detail:
          "Varsa eski kombiyi güvenle söker, hatları kapatır ve yeni montaj için bağlantıları hazırlarız.",
      },
      {
        step: "Montaj ve bağlantılar",
        detail:
          "Kombiyi sabitler; su, gaz ve baca bağlantılarını standartlara uygun yapar, genleşme tankı ve basıncı ayarlarız.",
      },
      {
        step: "Devreye alma ve test",
        detail:
          "Gaz sızdırmazlığını ve baca çekişini kontrol eder, cihazı çalıştırıp sıcak su ve ısıtmayı test ederek garantili teslim ederiz.",
      },
    ],
    priceIntro:
      "Kombi montaj ücreti, montajın kapsamına (yeni kurulum mu, değişim mi) ve baca/gaz hattı düzenleme ihtiyacına göre belirlenir. Durumu dinleyip aralık verir, kesin fiyatı keşiften sonra onayınıza sunarız.",
    priceFactors: [
      "İşlem türü: yeni montaj, eski kombi değişimi veya yoğuşmalı kurulum",
      "Baca tipi ve baca/gaz hattı düzenleme ihtiyacı",
      "Su, gaz ve yoğuşma tahliye bağlantılarının durumu",
      "Kullanılacak bağlantı ve sızdırmazlık malzemesi",
      "Aciliyet ve hizmet saati",
    ],
    symptoms: [
      {
        title: "Eski kombi sık arıza veriyor / verim düşük",
        detail: "Sürekli basınç düşmesi, ısınmama ve artan fatura, eski cihazın ekonomik ömrünü tamamladığını ve yoğuşmalı bir modelle değişimin daha verimli olacağını gösterir.",
      },
      {
        title: "Yeni daire / yeni doğalgaz aboneliği",
        detail: "Sıfır konut veya ilk kez doğalgaz bağlanan dairede kombi, baca ve gaz hattının standartlara uygun ilk montajı gerekir.",
      },
      {
        title: "Kombi yeri / baca çıkışı uygun değil",
        detail: "Cihazın bulunduğu yerin havalandırma, baca çıkışı veya su-gaz hattı açısından uygun olmaması; montaj öncesi yer ve baca planlaması yapılmasını gerektirir.",
      },
      {
        title: "Yoğuşmalı kombiye geçiş yapılacak",
        detail: "Konvansiyonel kombiden yoğuşmalıya geçişte yoğuşma suyu (kondens) tahliyesi ve farklı baca tipi gerektiğinden uzman montaj şarttır.",
      },
      {
        title: "Eski montajda kaçak / sızdırmazlık şüphesi",
        detail: "Önceki montajdan kalan gaz kokusu, su damlaması veya baca çekiş sorunu; cihazın sökülüp standartlara uygun yeniden bağlanmasını gerektirir.",
      },
      {
        title: "Cihaz var ama bağlantı/devreye alma eksik",
        detail: "Kullanıcı tarafından alınmış kombinin yalnızca montaj, gaz açımı ve ilk çalıştırma ayarlarının yetkili işçilikle tamamlanması gereken durum.",
      },
    ],
    emergencySteps: [
      {
        step: "Cihazı kendiniz bağlamayın",
        detail: "Gaz ve baca bağlantısı uzmanlık ister; hatalı montaj gaz kaçağı ve karbonmonoksit riski doğurur. Cihazı çalıştırmadan bizi arayın.",
      },
      {
        step: "Gaz vanasını kapalı tutun",
        detail: "Montaj tamamlanıp sızdırmazlık testi yapılmadan gaz vanasını açmayın; kutusundaki cihazı nemden ve darbeden koruyun.",
      },
      {
        step: "Cihaz ve evraklarını hazır edin",
        detail: "Kombinin kutusu, montaj aparatları ve garanti belgesini hazır bulundurun; doğalgaz abonelik/proje evrakları varsa keşifte paylaşın.",
      },
      {
        step: "Model ve mekânı paylaşın",
        detail: "'Yeni montaj mı, değişim mi', kombi markası/modeli ve baca durumunu iletin; doğru ekip ve malzemeyle gelip işçilik garantili teslim edelim.",
      },
    ],
    tools: [
      {
        name: "Gaz sızdırmazlık test pompası & dedektör",
        detail: "Montaj sonrası gaz hattını basınçla test eder, dedektörle bağlantı noktalarını kontrol ederek sızdırmaz teslim ederiz.",
      },
      {
        name: "Hermetik/yoğuşmalı baca seti ve kondens tahliyesi",
        detail: "Cihaz tipine uygun baca borusu ve yoğuşma suyu tahliyesini doğru eğimle, donmaya karşı korumalı şekilde kurarız.",
      },
      {
        name: "Bağlantı seti: rakor, esnek hortum, vana",
        detail: "Su, gaz ve kalorifer bağlantıları için standartlara uygun rakor, filtreli ara musluk ve esnek bağlantı elemanları kullanırız.",
      },
      {
        name: "Manometre, su terazisi ve devreye alma cihazı",
        detail: "Genleşme tankı basıncını ayarlar, cihazı terazisinde sabitler, devreye alıp sıcak su ve ısıtma parametrelerini kontrol ederiz.",
      },
    ],
    variants: [
      {
        title: "Yeni kombi ilk montajı",
        detail: "Sıfır daire veya ilk doğalgaz aboneliğinde kombi, baca ve gaz/su hattının standartlara uygun komple kurulumu ve devreye alınması.",
      },
      {
        title: "Eski kombi sökümü + yeni kombi değişimi",
        detail: "Mevcut hatta eski cihazın güvenle sökülüp yeni kombinin montajı; bağlantı ve baca uyumunun kontrolüyle aynı gün teslim.",
      },
      {
        title: "Yoğuşmalı kombi montajı / dönüşüm",
        detail: "Konvansiyonelden yoğuşmalıya geçişte kondens tahliyesi, uygun baca ve hidrolik bağlantıların yeniden düzenlenmesi.",
      },
      {
        title: "Sadece montaj & devreye alma",
        detail: "Cihazı kendiniz aldıysanız yalnızca yetkili montaj, gaz açımı, sızdırmazlık testi ve ilk çalıştırma ayarlarının yapılması.",
      },
      {
        title: "Baca / gaz hattı düzenleme ile montaj",
        detail: "Uygun olmayan baca çıkışı veya gaz hattının standartlara getirilip kombinin güvenli şekilde monte edilmesi.",
      },
    ],
  },
];



export function findService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

// Horizontal hub↔hub links (Internal Linking — Step 5). Curated map of the most
// related service silos so equity flows sideways across the silo graph instead
// of pooling in one hub. Falls back to filling with any remaining services.
const RELATED_SERVICES: Record<string, string[]> = {
  "su-kacagi-tespiti": ["tikaniklik-acma", "kanal-goruntuleme", "petek-temizligi"],
  "tikaniklik-acma": ["kanalizasyon-acma", "mutfak-gider-acma", "tuvalet-tikanikligi-acma"],
  "kombi-servisi": ["kombi-montaji", "petek-temizligi", "dogalgaz-tesisati"],
  "petek-temizligi": ["kombi-servisi", "su-kacagi-tespiti", "hidrofor-kurulumu"],
  "dogalgaz-tesisati": ["kombi-montaji", "kombi-servisi", "su-kacagi-tespiti"],
  "kanal-goruntuleme": ["kanalizasyon-acma", "tikaniklik-acma", "su-kacagi-tespiti"],
  "kanalizasyon-acma": ["kanal-goruntuleme", "tikaniklik-acma", "mutfak-gider-acma"],
  "tuvalet-tikanikligi-acma": ["tikaniklik-acma", "kanalizasyon-acma", "mutfak-gider-acma"],
  "mutfak-gider-acma": ["tikaniklik-acma", "tuvalet-tikanikligi-acma", "kanalizasyon-acma"],
  "dusakabin-vitrifiye-montaji": ["musluk-batarya-degisimi", "su-kacagi-tespiti", "tikaniklik-acma"],
  "musluk-batarya-degisimi": ["dusakabin-vitrifiye-montaji", "su-kacagi-tespiti", "tikaniklik-acma"],
  "hidrofor-kurulumu": ["su-kacagi-tespiti", "petek-temizligi", "kombi-servisi"],
  "kombi-montaji": ["kombi-servisi", "dogalgaz-tesisati", "petek-temizligi"],
};

export function relatedServicesFor(slug: string, limit = 3): Service[] {
  const ids = RELATED_SERVICES[slug] ?? [];
  const picked = ids
    .map((id) => findService(id))
    .filter((x): x is Service => Boolean(x));
  if (picked.length >= limit) return picked.slice(0, limit);
  const have = new Set([slug, ...picked.map((p) => p.slug)]);
  const fill = SERVICES.filter((x) => !have.has(x.slug));
  return [...picked, ...fill].slice(0, limit);
}

