export type District = {
  slug: string;
  name: string;
  side: "Anadolu Yakası" | "Avrupa Yakası";
  neighborhoods: string[];
  responseMin: number;
  intro: string;
  highlights: string[];
  // Optional deep-content fields for tier-1 hub pages (Part 15). When present,
  // the hub page renders unique local context, common issues and district FAQ
  // instead of the templated minimum. Other districts fall back gracefully.
  localContext?: string[];
  commonIssues?: { title: string; detail: string }[];
  faq?: { q: string; a: string }[];
};


export const DISTRICTS: District[] = [
  {
    slug: "kadikoy",
    name: "Kadıköy",
    side: "Anadolu Yakası",
    neighborhoods: ["Caddebostan", "Fenerbahçe", "Göztepe", "Bostancı", "Suadiye", "Moda", "Bağdat Caddesi"],
    responseMin: 25,
    intro: "Kadıköy ve çevresinde 7/24 acil tesisatçı hizmeti. Su kaçağı tespiti, tıkanıklık açma, kombi servisi ve petek temizliğinde ortalama 25 dakikada kapınızdayız.",
    highlights: ["Caddebostan & Bağdat Caddesi'nde 7/24 servis", "Sahil hattındaki sitelerde özel anlaşmalı fiyat", "Yüksek katlı binalarda basınç & sıcak su uzmanlığı"],
    localContext: [
      "Kadıköy, İstanbul'un Anadolu Yakası'nda hem yüz yıllık apartmanların hem de Bağdat Caddesi ve Caddebostan hattındaki lüks sitelerin bir arada bulunduğu bir ilçedir. Bu yapı çeşitliliği, tesisat sorunlarının da çok farklı karakterde olması anlamına gelir: Moda ve eski Kadıköy çekirdeğindeki binalarda korozyona uğramış galvaniz borular ve gizli su kaçakları öne çıkarken, sahil hattındaki yeni sitelerde yüksek katlardaki basınç dengesizliği ve hidrofor arızaları daha sık görülür.",
      "Caddebostan, Suadiye ve Bostancı'daki yüksek katlı rezidanslarda sıcak su sirkülasyonu ve kat kaloriferi/merkezi sistem dönüşümleri sık talep edilir. Fenerbahçe ve Göztepe'deki müstakil ve az katlı yapılarda ise bahçe drenajı, ana gider hattı tıkanıklıkları ve doğalgaz tesisat yenileme işleri yoğunlukludur. Ekibimiz Kadıköy'ün her mahallesindeki bina tipini bildiği için müdahale süresini kısaltır.",
    ],
    commonIssues: [
      { title: "Eski apartmanlarda gizli su kaçağı", detail: "Moda ve Kadıköy çarşı çevresindeki yapılarda galvaniz boruların çürümesi duvar içi sızıntılara yol açar; termal kamera ve akustik dinleme ile kırmadan tespit ederiz." },
      { title: "Sahil sitelerinde basınç düşüklüğü", detail: "Caddebostan ve Suadiye'deki yüksek katlarda hidrofor ve basınç düşürücü ayarsızlıkları çözeriz." },
      { title: "Bağdat Caddesi dükkânlarında acil tıkanıklık", detail: "Cadde üzerindeki kafe ve mağazalarda yağ kaynaklı gider tıkanıklıklarını kanal jeti ile hızla açarız." },
    ],
    faq: [
      { q: "Kadıköy'de gece acil tesisatçı buluyor musunuz?", a: "Evet, Kadıköy genelinde 7/24 acil servis veriyoruz. Gece yarısı dahil su kaçağı, patlak boru ve tıkanıklık çağrılarına ortalama 25 dakikada müdahale ediyoruz." },
      { q: "Caddebostan'daki sitelere bakım sözleşmesi yapıyor musunuz?", a: "Evet, Caddebostan ve Bağdat Caddesi hattındaki sitelere periyodik bakım ve önceliklendirilmiş acil servis sözleşmesi sunuyoruz." },
    ],
  },
  {
    slug: "uskudar",
    name: "Üsküdar",
    side: "Anadolu Yakası",
    neighborhoods: ["Çengelköy", "Beylerbeyi", "Kuzguncuk", "Acıbadem", "Altunizade", "Bağlarbaşı"],
    responseMin: 25,
    intro: "Üsküdar'ın tüm mahallelerinde acil tesisat ve ısıtma çözümleri. Tarihi binalardan modern sitelere kadar her tip yapıda tecrübeli ekip.",
    highlights: ["Tarihi binalarda hasarsız müdahale", "Çengelköy & Beylerbeyi sahilinde hızlı ulaşım", "Boğaz manzaralı sitelerde özel servis"],
    localContext: [
      "Üsküdar, Boğaz kıyısındaki tarihi ahşap ve kâgir yapılarla Altunizade ve Acıbadem'deki modern plaza ve rezidansları aynı ilçede buluşturur. Kuzguncuk ve Beylerbeyi'ndeki korunması gereken eski binalarda tesisat müdahalesi büyük dikkat ister; bizler bu yapılarda mümkün olduğunca kırmadan, hasarsız yöntemlerle çalışırız.",
      "Çengelköy ve Beylerbeyi sahil hattında nem ve rutubet kaynaklı boru korozyonu, Acıbadem ve Altunizade'deki yüksek katlı binalarda ise merkezi ısıtma, petek temizliği ve sıcak su basıncı sorunları öne çıkar. Bağlarbaşı ve çevresindeki yoğun apartman dokusunda ana gider hattı tıkanıklıkları sık yaşanır.",
    ],
    commonIssues: [
      { title: "Tarihi yapılarda hasarsız müdahale", detail: "Kuzguncuk ve Beylerbeyi'ndeki eski binalarda duvar ve döşemeyi koruyarak, noktasal tespit ve onarım yaparız." },
      { title: "Sahil hattında rutubet ve boru korozyonu", detail: "Çengelköy sahilindeki nemli ortamda çürüyen boruları paslanmaz/pe-x malzeme ile yenileriz." },
      { title: "Acıbadem rezidanslarında petek & ısıtma", detail: "Altunizade ve Acıbadem'deki yüksek katlı binalarda petek temizliği ve kombi/merkezi sistem arızalarını çözeriz." },
    ],
    faq: [
      { q: "Üsküdar'daki tarihi binada kırmadan su kaçağı bulur musunuz?", a: "Evet, Kuzguncuk ve Beylerbeyi gibi tarihi dokuda termal kamera ve akustik cihazlarla kırmadan kaçak tespiti yapıyor, sadece gereken noktayı açıyoruz." },
      { q: "Üsküdar'da kombi ve petek bakımı yapıyor musunuz?", a: "Evet, Acıbadem ve Altunizade başta olmak üzere Üsküdar genelinde kombi servisi ve petek temizliği hizmeti veriyoruz." },
    ],
  },
  {
    slug: "besiktas",
    name: "Beşiktaş",
    side: "Avrupa Yakası",
    neighborhoods: ["Etiler", "Levent", "Bebek", "Ortaköy", "Arnavutköy", "Akatlar", "Ulus"],
    responseMin: 30,
    intro: "Beşiktaş, Etiler ve Levent çevresinde profesyonel tesisat servisi. Lüks rezidans ve plaza projelerinde referanslı ekip.",
    highlights: ["Lüks rezidans deneyimi", "Etiler & Levent'te plaza tesisat bakımı", "Tarihi yapılar için özel ekipman"],
    localContext: [
      "Beşiktaş; Levent ve Etiler'deki gökdelen ve plazalarla Bebek, Arnavutköy ve Ortaköy'deki Boğaz kıyısı yalı ve butik binaları bir arada barındırır. Levent hattındaki yüksek katlı yapılarda basınçlandırma, yangın hattı ve merkezi sistem işleri uzmanlık gerektirirken, Bebek ve Arnavutköy'deki tarihi yapılarda hassas, hasarsız müdahale önceliklidir.",
      "Etiler ve Akatlar'daki lüks rezidanslarda gizli su kaçağı, ankastre batarya ve duşakabin sorunları sık görülür. Ortaköy ve sahil hattındaki işletmelerde ise yoğun kullanımdan kaynaklı gider tıkanıklıkları ve sıcak su sistemleri öne çıkar. Ekibimiz bu prestijli bölgelerde temiz, randevulu ve raporlu çalışma prensibiyle hizmet verir.",
    ],
    commonIssues: [
      { title: "Yüksek katlı binalarda basınç & sıcak su", detail: "Levent ve Etiler'deki gökdelen ve rezidanslarda basınçlandırma ve sirkülasyon sorunlarını çözeriz." },
      { title: "Tarihi yalılarda hasarsız onarım", detail: "Bebek ve Arnavutköy'deki Boğaz kıyısı yapılarda özel ekipmanla kırmadan müdahale ederiz." },
      { title: "Ankastre sistem & lüks vitrifiye", detail: "Etiler ve Akatlar'da gizli sıva altı batarya, duşakabin ve ankastre tesisat işlerini titizlikle yaparız." },
    ],
    faq: [
      { q: "Etiler ve Levent'te plaza/rezidanslara servis veriyor musunuz?", a: "Evet, Levent ve Etiler'deki plaza ve rezidanslara kurumsal bakım sözleşmesi ve önceliklendirilmiş acil servis sağlıyoruz." },
      { q: "Bebek'teki tarihi binada tesisat yeniler misiniz?", a: "Evet, Bebek ve Arnavutköy'deki tarihi yapılarda yapıyı koruyarak tesisat yenileme ve onarım yapıyoruz." },
    ],
  },
  {
    slug: "sisli",
    name: "Şişli",
    side: "Avrupa Yakası",
    neighborhoods: ["Mecidiyeköy", "Nişantaşı", "Bomonti", "Fulya", "Esentepe", "Gayrettepe"],
    responseMin: 30,
    intro: "Şişli ve Mecidiyeköy bölgesinde 7/24 acil tesisat. AVM, plaza ve rezidanslarda kurumsal hizmet.",
    highlights: ["AVM & plazalara kurumsal sözleşme", "Nişantaşı butik mağaza tesisatı", "Yüksek katlı bina su tesisatı"],
    localContext: [
      "Şişli, İstanbul'un en yoğun iş ve ticaret merkezlerinden biridir. Mecidiyeköy, Esentepe ve Gayrettepe'deki plaza ve ofis kuleleri, Nişantaşı'ndaki butik mağaza ve eski apartmanlar, Bomonti ve Fulya'daki yeni rezidanslar bir arada bulunur. Bu ticari yoğunluk, hızlı ve kesintisiz tesisat servisini zorunlu kılar; bir tıkanıklık ya da su kaçağı işletmeler için doğrudan gelir kaybı demektir.",
      "Nişantaşı'ndaki tarihi apartmanlarda eski boru hatları ve gizli kaçaklar, Mecidiyeköy ve Esentepe'deki yüksek katlı plazalarda ise basınçlandırma, ana kolon ve merkezi sistem işleri öne çıkar. Bomonti'deki yeni nesil rezidanslarda ankastre ve sıva altı tesisat sorunları sık görülür.",
    ],
    commonIssues: [
      { title: "Plaza ve ofislerde acil tıkanıklık", detail: "Mecidiyeköy ve Esentepe'deki iş merkezlerinde gider ve kolon tıkanıklıklarını mesai kaybı yaşatmadan açarız." },
      { title: "Nişantaşı mağazalarında su kaçağı", detail: "Butik mağaza ve eski apartmanlarda gizli kaçağı kırmadan tespit eder, hızlı onarırız." },
      { title: "Yüksek katlı binalarda basınç & kolon", detail: "Esentepe ve Gayrettepe'deki kulelerde basınçlandırma ve ana kolon sorunlarını çözeriz." },
    ],
    faq: [
      { q: "Şişli'deki iş yerine mesai saatleri dışında geliyor musunuz?", a: "Evet, Mecidiyeköy ve Şişli genelindeki iş yerlerine gece ve hafta sonu dahil 7/24 acil servis veriyoruz; işletmenizi durdurmadan müdahale ederiz." },
      { q: "AVM ve plazalara sözleşmeli bakım yapıyor musunuz?", a: "Evet, Şişli'deki AVM, plaza ve ofis binalarına periyodik bakım ve öncelikli acil servis sözleşmesi sunuyoruz." },
    ],
  },
  {
    slug: "bakirkoy",
    name: "Bakırköy",
    side: "Avrupa Yakası",
    neighborhoods: ["Ataköy", "Yeşilköy", "Yeşilyurt", "Florya", "Şirinevler", "Zeytinburnu"],
    responseMin: 35,
    intro: "Bakırköy, Ataköy ve Florya hattında acil tesisat ve kombi servisi. Sahil sitelerinde tuzlu havadan kaynaklı bakım uzmanlığı.",
    highlights: ["Sahil hattı tuza dayanıklı tesisat", "Ataköy site bakım sözleşmeleri", "Yeşilköy havalimanı çevresine 30 dk"],
    localContext: [
      "Bakırköy, Marmara kıyısı boyunca uzanan Ataköy, Yeşilköy, Yeşilyurt ve Florya hattı ile geniş site yerleşimlerinin bulunduğu bir ilçedir. Sahil hattındaki tuzlu ve nemli hava, boru ve metal tesisat elemanlarında korozyonu hızlandırır; bu nedenle bölgede paslanmaz ve PE-X malzeme tercih edilmeli, periyodik bakım ihmal edilmemelidir.",
      "Ataköy'deki büyük site bloklarında merkezi sistem, hidrofor ve ana kolon işleri yoğundur. Yeşilköy ve Florya'daki müstakil ve az katlı yapılarda ise bahçe drenajı, gider hattı tıkanıklıkları ve doğalgaz tesisatı talepleri öne çıkar. Şirinevler tarafındaki yoğun apartman dokusunda acil tıkanıklık ve su kaçağı çağrıları sıktır.",
    ],
    commonIssues: [
      { title: "Sahil hattında tuz kaynaklı korozyon", detail: "Ataköy ve Florya'daki sahil yapılarında çürüyen boruları korozyona dayanıklı malzeme ile yeniler, periyodik bakım planlarız." },
      { title: "Site bloklarında hidrofor & merkezi sistem", detail: "Ataköy site bloklarında hidrofor, basınçlandırma ve merkezi ısıtma arızalarını çözeriz." },
      { title: "Yeşilköy & Florya'da bahçe drenajı", detail: "Müstakil yapılarda bahçe gideri ve drenaj tıkanıklıklarını kanal jeti ve görüntüleme ile açarız." },
    ],
    faq: [
      { q: "Ataköy sitelerine bakım sözleşmesi yapıyor musunuz?", a: "Evet, Ataköy ve Bakırköy genelindeki sitelere periyodik bakım, hidrofor kontrolü ve öncelikli acil servis sözleşmesi sunuyoruz." },
      { q: "Yeşilköy ve Florya'ya ne kadar sürede geliyorsunuz?", a: "Yeşilköy, Yeşilyurt ve Florya hattına acil çağrılarda ortalama 35 dakika içinde ulaşıyoruz; 7/24 hizmet veriyoruz." },
    ],
  },

  {
    slug: "atasehir",
    name: "Ataşehir",
    side: "Anadolu Yakası",
    neighborhoods: ["Barbaros", "Küçükbakkalköy", "İçerenköy", "Kayışdağı", "Finans Merkezi"],
    responseMin: 25,
    intro: "Ataşehir Finans Merkezi ve çevresindeki rezidans + plazalara özel tesisat hizmeti. Kurumsal ve bireysel müşterilere 7/24 destek.",
    highlights: ["Finans Merkezi plaza servisi", "Site & rezidans yıllık bakım", "Hızlı kombi & klima tesisatı"],
    localContext: [
      "Ataşehir, İstanbul Finans Merkezi'nin yükseldiği, son yılların en hızlı gelişen iş ve konut bölgelerinden biridir. Barbaros ve Finans Merkezi hattındaki yüksek katlı rezidans ve plazalarda basınçlandırma, sıcak su sirkülasyonu ve merkezi sistem işleri öne çıkarken, Küçükbakkalköy ve İçerenköy'deki daha eski apartman dokusunda gizli su kaçağı ve gider hattı tıkanıklıkları sık yaşanır.",
      "Kayışdağı ve çevresindeki yeni site projelerinde ankastre tesisat, hidrofor ve ısıtma sistemleri yoğun talep görür. Ekibimiz hem Finans Merkezi'ndeki kurumsal yapılarda randevulu, raporlu çalışır hem de bireysel konutlarda 7/24 acil servis verir.",
    ],
    commonIssues: [
      { title: "Finans Merkezi plazalarında basınç & sıcak su", detail: "Yüksek katlı plaza ve rezidanslarda basınçlandırma ve sirkülasyon sorunlarını çözeriz." },
      { title: "İçerenköy apartmanlarında gizli kaçak", detail: "Eski yapılarda termal kamera ile kırmadan su kaçağı tespiti yaparız." },
      { title: "Yeni sitelerde hidrofor & ankastre", detail: "Kayışdağı'ndaki site projelerinde hidrofor ve sıva altı tesisat işlerini titizlikle yaparız." },
    ],
    faq: [
      { q: "Ataşehir Finans Merkezi'ndeki ofise servis veriyor musunuz?", a: "Evet, Finans Merkezi ve Barbaros hattındaki plaza ve ofislere kurumsal bakım sözleşmesi ve 7/24 öncelikli acil servis sağlıyoruz." },
      { q: "Ataşehir'de ne kadar sürede gelirsiniz?", a: "Ataşehir genelindeki acil çağrılara ortalama 25 dakika içinde müdahale ediyoruz." },
    ],
  },
  {
    slug: "umraniye",
    name: "Ümraniye",
    side: "Anadolu Yakası",
    neighborhoods: ["Çakmak", "Atakent", "Site Mahallesi", "Tantavi", "Dudullu"],
    responseMin: 30,
    intro: "Ümraniye genelinde acil tesisatçı, kombi ve doğalgaz tesisatı. Sanayi bölgesinde de profesyonel servis.",
    highlights: ["Sanayi bölgesi tesisat bakımı", "Yeni site projelerinde garantili kurulum", "Doğalgaz & kombi yetkili servis"],
    localContext: [
      "Ümraniye, geniş konut siteleri ile Dudullu Organize Sanayi Bölgesi'ni aynı ilçede buluşturur. Çakmak ve Atakent'teki yeni site projelerinde ankastre tesisat, doğalgaz hatları ve kombi kurulumları yoğunken, Dudullu sanayi hattında atölye ve fabrikaların basınçlı su, gider ve endüstriyel tesisat ihtiyaçları öne çıkar.",
      "Site Mahallesi ve Tantavi gibi yoğun konut bölgelerinde ana gider hattı tıkanıklıkları ve kombi/petek arızaları sık görülür. Hem konut hem sanayi yapılarında deneyimli ekibimiz, doğalgaz ve ısıtma işlerinde yetkili servis kalitesiyle çalışır.",
    ],
    commonIssues: [
      { title: "Sanayi bölgesinde endüstriyel tesisat", detail: "Dudullu'daki atölye ve işletmelerde basınçlı su, gider ve endüstriyel tesisat bakımını yaparız." },
      { title: "Yeni sitelerde doğalgaz & kombi kurulumu", detail: "Çakmak ve Atakent'teki sitelerde garantili doğalgaz hattı ve kombi montajı yaparız." },
      { title: "Konutlarda ana hat tıkanıklığı", detail: "Site Mahallesi ve Tantavi'de ana gider kolonu tıkanıklıklarını kanal jeti ile açarız." },
    ],
    faq: [
      { q: "Ümraniye'de doğalgaz ve kombi montajı yapıyor musunuz?", a: "Evet, Ümraniye genelinde yetkili servis kalitesinde doğalgaz tesisatı ve kombi montajı/servisi yapıyoruz." },
      { q: "Dudullu Sanayi'deki iş yerine servis veriyor musunuz?", a: "Evet, Dudullu Organize Sanayi'deki atölye ve fabrikalara endüstriyel tesisat ve acil servis sağlıyoruz." },
    ],
  },
  {
    slug: "maltepe",
    name: "Maltepe",
    side: "Anadolu Yakası",
    neighborhoods: ["Cevizli", "Küçükyalı", "Altayçeşme", "Bağlarbaşı", "İdealtepe"],
    responseMin: 30,
    intro: "Maltepe sahil ve iç mahallelerde acil tesisatçı hizmeti. Su kaçağı, tıkanıklık ve petek temizliğinde hızlı çözüm.",
    highlights: ["Sahil hattında 30 dk müdahale", "Site & apartman bakım anlaşmaları", "Şeffaf fiyat, garantili işçilik"],
    localContext: [
      "Maltepe, sahil dolgu alanındaki yeni sitelerle iç kesimlerdeki yerleşik apartman dokusunu bir arada barındırır. Küçükyalı ve İdealtepe sahil hattındaki sitelerde nem ve tuzlu havadan kaynaklı boru korozyonu ile hidrofor arızaları görülürken, Cevizli ve Altayçeşme'deki eski apartmanlarda gizli su kaçağı ve gider hattı sorunları sık yaşanır.",
      "Bağlarbaşı ve çevresindeki yoğun konut bölgelerinde kombi, petek temizliği ve doğalgaz işleri yoğunluklu talep görür. Ekibimiz hem sahil sitelerinde hem iç mahallelerde 30 dakika ortalama müdahale süresiyle hizmet verir.",
    ],
    commonIssues: [
      { title: "Sahil sitelerinde korozyon & hidrofor", detail: "Küçükyalı ve İdealtepe sahilindeki sitelerde çürüyen boruları yeniler, hidrofor arızalarını çözeriz." },
      { title: "Eski apartmanlarda gizli kaçak", detail: "Cevizli ve Altayçeşme'deki yapılarda kırmadan su kaçağı tespiti yaparız." },
      { title: "Konutlarda petek & kombi bakımı", detail: "Bağlarbaşı çevresinde petek temizliği ve kombi servisini hızlıca yaparız." },
    ],
    faq: [
      { q: "Maltepe sahildeki siteye ne kadar sürede gelirsiniz?", a: "Küçükyalı ve İdealtepe sahil hattına acil çağrılarda ortalama 30 dakikada ulaşıyoruz; 7/24 hizmet veriyoruz." },
      { q: "Maltepe'de apartman bakım anlaşması yapıyor musunuz?", a: "Evet, Maltepe genelindeki site ve apartmanlara periyodik bakım ve öncelikli acil servis sözleşmesi sunuyoruz." },
    ],
  },
  {
    slug: "kartal",
    name: "Kartal",
    side: "Anadolu Yakası",
    neighborhoods: ["Soğanlık", "Yakacık", "Cevizli", "Esentepe", "Orhantepe"],
    responseMin: 35,
    intro: "Kartal ve çevresinde 7/24 tesisatçı. Yüksek katlı sitelerde basınç ve su tesisatı uzmanlığı.",
    highlights: ["E-5 üzerinde hızlı ulaşım", "Yüksek katlı sitelerde basınç çözümü", "Ortalama 35 dk müdahale"],
    localContext: [
      "Kartal, son yıllarda kentsel dönüşümle yükselen çok sayıda yüksek katlı site ve rezidansa ev sahipliği yapar. Soğanlık ve Yakacık'taki yeni kulelerde basınçlandırma, hidrofor ve merkezi sistem işleri öne çıkarken, Cevizli ve Orhantepe'deki yerleşik apartmanlarda gizli su kaçağı ve gider tıkanıklıkları sık görülür.",
      "Esentepe ve çevresindeki konut yoğunluğunda kombi, petek ve doğalgaz işleri yoğun taleptedir. E-5 ve sahil yolu üzerindeki konumumuz sayesinde Kartal genelindeki çağrılara hızlı ulaşırız.",
    ],
    commonIssues: [
      { title: "Yüksek katlı sitelerde basınç & hidrofor", detail: "Soğanlık ve Yakacık'taki kulelerde basınçlandırma ve hidrofor sorunlarını çözeriz." },
      { title: "Eski apartmanlarda gizli kaçak", detail: "Cevizli ve Orhantepe'de kırmadan su kaçağı tespiti yaparız." },
      { title: "Konutlarda kombi & petek", detail: "Esentepe çevresinde kombi servisi ve petek temizliği yaparız." },
    ],
    faq: [
      { q: "Kartal'daki yüksek katlı sitede basınç sorununa bakıyor musunuz?", a: "Evet, Soğanlık ve Yakacık'taki yüksek katlı sitelerde basınçlandırma ve hidrofor arızalarını çözüyoruz." },
      { q: "Kartal'a ne kadar sürede gelirsiniz?", a: "Kartal genelindeki acil çağrılara ortalama 35 dakika içinde müdahale ediyoruz." },
    ],
  },
  {
    slug: "pendik",
    name: "Pendik",
    side: "Anadolu Yakası",
    neighborhoods: ["Kurtköy", "Çamlık", "Yenişehir", "Velibaba", "Esenyalı"],
    responseMin: 40,
    intro: "Pendik, Kurtköy ve Sabiha Gökçen çevresinde acil tesisatçı. Konut ve işyerlerine 7/24 hizmet.",
    highlights: ["Sabiha Gökçen çevresi 7/24", "Kurtköy site bakım anlaşmaları", "Hızlı kombi servisi"],
    localContext: [
      "Pendik, Sabiha Gökçen Havalimanı'na yakınlığıyla hızla büyüyen, yeni site projeleri ve işyerleriyle dolu bir ilçedir. Kurtköy ve Çamlık'taki yeni sitelerde ankastre tesisat, hidrofor ve doğalgaz işleri öne çıkarken, Yenişehir ve Velibaba'daki yerleşik konutlarda gider hattı tıkanıklıkları ve kombi arızaları sık görülür.",
      "Esenyalı ve sahil hattındaki yapılarda nem kaynaklı boru sorunları ve su kaçakları yaşanır. Geniş bir bölge olmasına rağmen ekibimiz Pendik genelindeki çağrılara ortalama 40 dakikada ulaşır ve havalimanı çevresindeki işletmelere 7/24 destek verir.",
    ],
    commonIssues: [
      { title: "Yeni sitelerde hidrofor & doğalgaz", detail: "Kurtköy ve Çamlık'taki site projelerinde hidrofor, ankastre ve doğalgaz tesisatı yaparız." },
      { title: "Konutlarda gider & kombi arızası", detail: "Yenişehir ve Velibaba'da gider tıkanıklıkları ve kombi servisini yaparız." },
      { title: "Sahil hattında nem & su kaçağı", detail: "Esenyalı çevresindeki yapılarda nem kaynaklı boru sorunlarını ve kaçakları çözeriz." },
    ],
    faq: [
      { q: "Sabiha Gökçen çevresindeki iş yerine geliyor musunuz?", a: "Evet, Kurtköy ve Sabiha Gökçen Havalimanı çevresindeki konut ve işletmelere 7/24 acil servis sağlıyoruz." },
      { q: "Pendik'e ne kadar sürede ulaşıyorsunuz?", a: "Pendik geniş bir ilçe olsa da acil çağrılara ortalama 40 dakika içinde ulaşıyoruz." },
    ],
  },

  {
    slug: "beylikduzu",
    name: "Beylikdüzü",
    side: "Avrupa Yakası",
    neighborhoods: ["Adnan Kahveci", "Gürpınar", "Yakuplu", "Cumhuriyet", "Barış", "Marmara"],
    responseMin: 40,
    intro: "Beylikdüzü'nün yeni nesil sitelerinde ve villalarda 7/24 acil tesisat. Su kaçağı, tıkanıklık ve kombi servisinde şeffaf fiyat, garantili işçilik.",
    highlights: ["Yeni site & rezidanslarda garantili kurulum", "Marmara sahili hattında hızlı müdahale", "Villa tesisatı ve petek temizliğinde uzman ekip"],
    localContext: [
      "Beylikdüzü, son yirmi yılda hızla gelişmiş, neredeyse tamamı yeni site ve rezidanslardan oluşan planlı bir ilçedir. Adnan Kahveci ve Cumhuriyet'teki büyük site projelerinde ankastre tesisat arızaları, hidrofor basınç sorunları ve gömme rezervuar kaçakları en sık karşılaştığımız işlerdir.",
      "Gürpınar ve Yakuplu'daki villa ve müstakil konutlarda doğalgaz ve yerden ısıtma tesisatı öne çıkarken, Marmara sahili hattındaki yapılarda nem ve tuzlu hava kaynaklı boru korozyonu görülür. Geniş bir ilçe olmasına rağmen ekibimiz çağrılara ortalama 40 dakikada ulaşır.",
    ],
    commonIssues: [
      { title: "Sitelerde hidrofor & ankastre arıza", detail: "Adnan Kahveci ve Cumhuriyet'teki sitelerde hidrofor basıncı, ankastre batarya ve gömme rezervuar kaçaklarını çözeriz." },
      { title: "Villalarda doğalgaz & yerden ısıtma", detail: "Gürpınar ve Yakuplu villalarında doğalgaz tesisatı ve yerden ısıtma bakımı yaparız." },
      { title: "Sahil hattında korozyon & kaçak", detail: "Marmara sahili çevresindeki yapılarda nem kaynaklı boru korozyonu ve su kaçaklarını gideririz." },
    ],
    faq: [
      { q: "Beylikdüzü'ndeki yeni siteme ankastre tesisat servisi veriyor musunuz?", a: "Evet, Adnan Kahveci ve Cumhuriyet başta olmak üzere tüm yeni site ve rezidanslara ankastre batarya, hidrofor ve gömme rezervuar servisi sağlıyoruz." },
      { q: "Beylikdüzü'ne ne kadar sürede ulaşıyorsunuz?", a: "Beylikdüzü geniş bir ilçe olsa da acil çağrılara ortalama 40 dakika içinde ulaşıyoruz." },
    ],
  },
  {
    slug: "sariyer",
    name: "Sarıyer",
    side: "Avrupa Yakası",
    neighborhoods: ["Maslak", "Tarabya", "Yeniköy", "İstinye", "Zekeriyaköy", "Bahçeköy", "Emirgan"],
    responseMin: 35,
    intro: "Sarıyer, Maslak ve Boğaz hattındaki villalarda profesyonel tesisat hizmeti. Plaza ve lüks konutlarda referanslı, titiz işçilik.",
    highlights: ["Maslak plaza & ofis tesisat bakımı", "Boğaz villalarında hasarsız müdahale", "Zekeriyaköy & Bahçeköy'e 7/24 ulaşım"],
    localContext: [
      "Sarıyer, Maslak'taki gökdelen ve plazalardan Boğaz hattındaki tarihi yalı ve lüks villalara kadar çok farklı yapı stoğunu bir arada barındırır. Maslak'ta plaza ve ofislerde ana kolon arızaları, basınçlandırma ve ısıtma-soğutma tesisat bakımı öne çıkar; titiz, kurumsal ve mesai dışı çalışma gerektirir.",
      "Tarabya, Yeniköy ve Emirgan'daki yalı ve villalarda gizli boru kaçakları, doğalgaz ve yerden ısıtma işleri ağırlıktadır; bu değerli yapılarda kırma-dökme yapmadan termal kamera ve akustik dinleme ile çalışırız. Zekeriyaköy ve Bahçeköy'deki müstakil site konutlarına 7/24 ulaşırız.",
    ],
    commonIssues: [
      { title: "Maslak plazalarda kolon & basınç", detail: "Maslak'taki ofis ve plazalarda ana kolon arızaları, basınçlandırma ve ısıtma tesisatı bakımını mesai dışı yaparız." },
      { title: "Boğaz villalarında hasarsız kaçak tespiti", detail: "Tarabya, Yeniköy ve Emirgan'daki yalı ve villalarda termal kamerayla kırmadan su kaçağı buluruz." },
      { title: "Site konutlarında doğalgaz & ısıtma", detail: "Zekeriyaköy ve Bahçeköy villalarında doğalgaz ve yerden ısıtma tesisatı kurarız." },
    ],
    faq: [
      { q: "Maslak'taki ofisimize mesai dışı servis veriyor musunuz?", a: "Evet, Maslak plaza ve ofislerine akşam ve hafta sonu dahil 7/24 kurumsal tesisat servisi sağlıyoruz." },
      { q: "Boğaz'daki villada kırmadan kaçak bulabiliyor musunuz?", a: "Evet, Tarabya ve Yeniköy'deki yalı ve villalarda termal kamera ve akustik dinleme ile kırma-dökme yapmadan kaçak tespiti yapıyoruz." },
    ],
  },
  {
    slug: "beyoglu",
    name: "Beyoğlu",
    side: "Avrupa Yakası",
    neighborhoods: ["Taksim", "Cihangir", "Galata", "Karaköy", "Şişhane", "Tarlabaşı", "Cevizlibağ"],
    responseMin: 30,
    intro: "Beyoğlu, Taksim ve Galata çevresinde 7/24 acil tesisatçı. Tarihi binalardan butik otellere kadar her yapıda tecrübeli ekip.",
    highlights: ["Tarihi yapılarda özel ekipmanla müdahale", "Otel & kafe işletmelerine kurumsal servis", "Cihangir & Galata'ya 30 dk içinde"],
    localContext: [
      "Beyoğlu, Galata ve Şişhane'deki yüz yıllık taş binalardan Cihangir'in eski apartmanlarına ve Taksim-Karaköy hattındaki yoğun ticari işletmelere uzanan, İstanbul'un en karmaşık yapı stoğuna sahip ilçelerindendir. Tarihi binalarda dökme demir gider hatları, eskimiş galvaniz borular ve gizli kaçaklar en sık görülen sorunlardır.",
      "Karaköy ve Galata'daki butik otel, kafe ve restoranlarda yoğun kullanım nedeniyle mutfak gider tıkanıklıkları, yağ kaynaklı kanal sorunları ve acil su kesintileri sıkça yaşanır; bu işletmelere kesintiyi en aza indirecek hızlı müdahale ederiz. Dar sokaklara ve tarihi dokuya rağmen çağrılara 30 dakikada ulaşırız.",
    ],
    commonIssues: [
      { title: "Tarihi binalarda eski boru & kaçak", detail: "Galata ve Cihangir'deki eski yapılarda galvaniz/dökme demir boru kaçaklarını kırmadan tespit edip yenileriz." },
      { title: "Otel & kafelerde mutfak gider tıkanıklığı", detail: "Karaköy ve Taksim'deki işletmelerde yağ kaynaklı mutfak gideri ve kanal tıkanıklıklarını jetle açarız." },
      { title: "Yoğun ticari hatlarda acil su kesintisi", detail: "Beyoğlu'ndaki işyerlerinde ana hat arızalarına işletmeyi durdurmadan hızlı müdahale ederiz." },
    ],
    faq: [
      { q: "Beyoğlu'ndaki tarihi binada kırmadan kaçak bulabiliyor musunuz?", a: "Evet, Galata ve Cihangir'deki tarihi yapılarda termal kamera ve akustik cihazlarla kırma-dökme yapmadan su kaçağı tespiti yapıyoruz." },
      { q: "Kafe ve restoranıma kapatmadan servis veriyor musunuz?", a: "Evet, Karaköy ve Taksim'deki işletmelere kesintiyi en aza indirecek şekilde, çoğunlukla mesai dışı saatlerde de hizmet veriyoruz." },
    ],
  },
  {
    slug: "fatih",
    name: "Fatih",
    side: "Avrupa Yakası",
    neighborhoods: ["Aksaray", "Çapa", "Fındıkzade", "Sultanahmet", "Balat", "Eminönü", "Çarşamba"],
    responseMin: 35,
    intro: "Fatih'in tarihi yarımadasında acil tesisat ve ısıtma çözümleri. Eski binalarda su kaçağı ve gizli boru tespitinde kırma-dökme yapmadan müdahale.",
    highlights: ["Tarihi binalarda hasarsız su kaçağı tespiti", "Han & işyerlerine kurumsal bakım", "Aksaray & Çapa'ya hızlı ulaşım"],
    localContext: [
      "Fatih, İstanbul'un tarihi yarımadasında yüzyıllık binaların, hanların ve toptancı işyerlerinin yoğun olduğu bir ilçedir. Aksaray, Çapa ve Fındıkzade'deki eski apartmanlarda galvaniz boru korozyonu, kat aralarına sızan gizli kaçaklar ve eskiyen kolon hatları en sık çözdüğümüz sorunlardır.",
      "Eminönü ve çevresindeki han ve toptancı işyerlerinde yoğun su kullanımı, eski tesisat altyapısıyla birleşince sık tıkanıklık ve basınç sorunları yaratır. Balat ve Çarşamba'daki tescilli yapılarda kırma-dökme yapmadan, termal kamera ile çalışarak tarihi dokuyu korur, çağrılara hızla ulaşırız.",
    ],
    commonIssues: [
      { title: "Eski binalarda boru korozyonu & kaçak", detail: "Aksaray ve Çapa'daki eski apartmanlarda galvaniz boru korozyonu ve gizli kaçakları kırmadan tespit edip yenileriz." },
      { title: "Han & işyerlerinde tıkanıklık & basınç", detail: "Eminönü'ndeki han ve toptancı işyerlerinde yoğun kullanıma bağlı tıkanıklık ve basınç sorunlarını çözeriz." },
      { title: "Tescilli yapılarda hasarsız müdahale", detail: "Balat ve Çarşamba'daki tarihi yapılarda termal kamerayla kırma-dökme yapmadan müdahale ederiz." },
    ],
    faq: [
      { q: "Fatih'teki eski binamda kırmadan su kaçağı bulabiliyor musunuz?", a: "Evet, Aksaray ve Çapa'daki eski apartmanlarda termal kamera ve akustik dinleme ile kırma-dökme yapmadan kaçak tespiti yapıyoruz." },
      { q: "Eminönü'ndeki iş yerime kurumsal bakım veriyor musunuz?", a: "Evet, Eminönü'ndeki han ve toptancı işyerlerine düzenli bakım anlaşması ve acil servis sağlıyoruz." },
    ],
  },
  {
    slug: "beykoz",
    name: "Beykoz",
    side: "Anadolu Yakası",
    neighborhoods: ["Kavacık", "Paşabahçe", "Anadolu Hisarı", "Çubuklu", "Acarkent", "Kanlıca"],
    responseMin: 40,
    intro: "Beykoz, Kavacık ve Boğaz hattındaki sitelerde acil tesisatçı. Villa ve müstakil konutlarda doğalgaz, kombi ve su tesisatı uzmanlığı.",
    highlights: ["Kavacık plaza & ofis tesisatı", "Acarkent villalarında yıllık bakım", "Boğaz hattında hızlı müdahale"],
    localContext: [
      "Beykoz, Kavacık'taki plaza ve ofis bölgesinden Acarkent ve Çubuklu'daki lüks villa sitelerine, Boğaz hattındaki tarihi yalılara kadar geniş bir yapı çeşitliliğine sahiptir. Kavacık'ta kurumsal ofislerde ana hat ve ısıtma tesisat bakımı, villa sitelerinde ise doğalgaz, hidrofor ve yerden ısıtma işleri öne çıkar.",
      "Paşabahçe, Anadolu Hisarı ve Kanlıca'daki yerleşik konutlarda ve yalılarda nem kaynaklı boru sorunları ve gizli su kaçakları görülür; değerli yapılarda kırma-dökme yapmadan termal kamerayla çalışırız. Geniş ve yeşil bir ilçe olmasına rağmen çağrılara ortalama 40 dakikada ulaşırız.",
    ],
    commonIssues: [
      { title: "Kavacık ofislerde ana hat & ısıtma", detail: "Kavacık'taki plaza ve ofislerde ana kolon arızaları ve ısıtma tesisat bakımını yaparız." },
      { title: "Villa sitelerinde doğalgaz & hidrofor", detail: "Acarkent ve Çubuklu villalarında doğalgaz, hidrofor ve yerden ısıtma tesisatı kurar, yıllık bakım yaparız." },
      { title: "Yalı & konutlarda nem & gizli kaçak", detail: "Paşabahçe ve Kanlıca'daki yapılarda nem kaynaklı boru sorunlarını ve gizli kaçakları kırmadan gideririz." },
    ],
    faq: [
      { q: "Acarkent'teki villama yıllık bakım anlaşması yapıyor musunuz?", a: "Evet, Acarkent ve Çubuklu'daki villalara doğalgaz, kombi ve su tesisatı için düzenli yıllık bakım anlaşması sunuyoruz." },
      { q: "Beykoz'a ne kadar sürede ulaşıyorsunuz?", a: "Beykoz geniş bir ilçe olsa da acil çağrılara ortalama 40 dakika içinde ulaşıyoruz." },
    ],
  },
  {
    slug: "cekmekoy",
    name: "Çekmeköy",
    side: "Anadolu Yakası",
    neighborhoods: ["Taşdelen", "Alemdağ", "Ömerli", "Mimar Sinan", "Merkez", "Hamidiye"],
    responseMin: 40,
    intro: "Çekmeköy ve çevresindeki villa sitelerinde 7/24 acil tesisat. Müstakil konutlarda su tesisatı, doğalgaz ve petek temizliğinde garantili hizmet.",
    highlights: ["Villa & müstakil konut tesisatı", "Taşdelen & Alemdağ site bakım anlaşmaları", "Şeffaf fiyat, garantili işçilik"],
    localContext: [
      "Çekmeköy, son yıllarda hızla gelişen, ağırlıklı olarak villa siteleri ve müstakil konutlardan oluşan yeşil bir ilçedir. Taşdelen ve Alemdağ'daki villa sitelerinde doğalgaz tesisatı, yerden ısıtma, hidrofor ve bahçe sulama hatları en sık yaptığımız işlerdir.",
      "Ömerli ve Hamidiye çevresindeki müstakil konutlarda kuyu/depo bağlantılı su sistemleri, kış aylarında donan dış tesisat ve petek temizliği öne çıkar. Geniş ve dağınık bir yerleşim olmasına rağmen ekibimiz çağrılara ortalama 40 dakikada ulaşır.",
    ],
    commonIssues: [
      { title: "Villalarda doğalgaz & yerden ısıtma", detail: "Taşdelen ve Alemdağ'daki villa sitelerinde doğalgaz tesisatı ve yerden ısıtma kurar, bakımını yaparız." },
      { title: "Müstakil konutlarda depo & hidrofor", detail: "Ömerli ve Hamidiye'deki konutlarda kuyu/depo bağlantılı su sistemleri ve hidrofor arızalarını çözeriz." },
      { title: "Kışın donan dış tesisat", detail: "Soğuk aylarda donan bahçe ve dış mekan boru hatlarını onarır, yalıtım önerileri sunarız." },
    ],
    faq: [
      { q: "Çekmeköy'deki villama doğalgaz ve yerden ısıtma kuruyor musunuz?", a: "Evet, Taşdelen ve Alemdağ başta olmak üzere villa sitelerine doğalgaz tesisatı ve yerden ısıtma kurulumu yapıyoruz." },
      { q: "Çekmeköy'e ne kadar sürede ulaşıyorsunuz?", a: "Çekmeköy geniş ve dağınık bir ilçe olsa da acil çağrılara ortalama 40 dakika içinde ulaşıyoruz." },
    ],
  },
  {
    slug: "esenyurt",
    name: "Esenyurt",
    side: "Avrupa Yakası",
    neighborhoods: ["Talatpaşa", "Yeşilkent", "İncirtepe", "Saadetdere", "Mehterçeşme", "Pınar", "Bağlarçeşme"],
    responseMin: 40,
    intro: "Esenyurt'un yoğun site ve rezidans bölgelerinde 7/24 acil tesisatçı. Su kaçağı tespiti, tıkanıklık açma ve kombi servisinde şeffaf fiyat, garantili işçilik.",
    highlights: ["Yoğun site ve rezidanslarda hızlı ulaşım", "Apartman & site yıllık bakım anlaşmaları", "7/24 acil çağrıya ortalama 40 dk"],
    localContext: [
      "Esenyurt, İstanbul'un en yoğun nüfuslu ilçelerinden biridir ve büyük ölçüde son on beş yılda yapılmış yoğun site ve rezidanslardan oluşur. Talatpaşa, Yeşilkent ve İncirtepe'deki bu yapılarda ankastre tesisat arızaları, gömme rezervuar kaçakları ve hidrofor basınç sorunları en sık karşılaştığımız işlerdir.",
      "Hızlı ve düşük maliyetli yapılaşma nedeniyle bazı binalarda erken görülen boru ve gider hattı sorunları, kat aralarındaki gizli su kaçakları sıkça yaşanır. Saadetdere ve Mehterçeşme dahil ilçe genelindeki çağrılara ortalama 40 dakikada ulaşır, apartman ve sitelere yıllık bakım anlaşması sunarız.",
    ],
    commonIssues: [
      { title: "Sitelerde ankastre & rezervuar kaçağı", detail: "Talatpaşa ve Yeşilkent'teki sitelerde ankastre batarya ve gömme rezervuar kaçaklarını duvar açmadan onarırız." },
      { title: "Hidrofor basınç & su gelmeme", detail: "İncirtepe ve Saadetdere'deki rezidanslarda hidrofor basınç sorunları ve dairelere su gelmemesini çözeriz." },
      { title: "Erken yıpranan boru & gider hatları", detail: "Yeni ama hızlı yapılmış binalarda erken görülen boru ve gider hattı sorunlarını gideririz." },
    ],
    faq: [
      { q: "Esenyurt'taki siteme yıllık bakım anlaşması yapıyor musunuz?", a: "Evet, Esenyurt'taki apartman ve sitelere düzenli kontrol ve öncelikli servis içeren yıllık bakım anlaşmaları sunuyoruz." },
      { q: "Esenyurt'a ne kadar sürede ulaşıyorsunuz?", a: "Esenyurt yoğun ve geniş bir ilçe olsa da acil çağrılara ortalama 40 dakika içinde ulaşıyoruz." },
    ],
  },
  {
    slug: "bagcilar",
    name: "Bağcılar",
    side: "Avrupa Yakası",
    neighborhoods: ["Güneşli", "Kirazlı", "Yıldıztepe", "Demirkapı", "Mahmutbey", "Bağlar", "Yenimahalle"],
    responseMin: 35,
    intro: "Bağcılar genelinde acil tesisatçı, kombi ve doğalgaz tesisatı. Konut ve işyerlerinde su kaçağı, tıkanıklık ve petek temizliğinde hızlı çözüm.",
    highlights: ["Konut & işyeri tesisat servisi", "Mahmutbey sanayi çevresinde tecrübe", "Şeffaf fiyat, garantili işçilik"],
    localContext: [
      "Bağcılar, yoğun konut dokusu ile küçük sanayi ve atölyelerin iç içe geçtiği kalabalık bir ilçedir. Güneşli ve Kirazlı'daki yerleşik apartmanlarda eskiyen kolon hatları, gider tıkanıklıkları ve kombi arızaları en sık çözdüğümüz sorunlardır.",
      "Mahmutbey ve Demirkapı çevresindeki sanayi ve işyerlerinde yoğun kullanıma bağlı tıkanıklıklar, basınç sorunları ve endüstriyel su hatları öne çıkar. Yoğun trafiğe rağmen ekibimiz konut ve işyeri çağrılarına ortalama 35 dakikada ulaşır.",
    ],
    commonIssues: [
      { title: "Apartmanlarda kolon & gider tıkanıklığı", detail: "Güneşli ve Kirazlı'daki binalarda eskiyen kolon hatları ve gider tıkanıklıklarını jetle açarız." },
      { title: "Sanayide yoğun kullanım & basınç", detail: "Mahmutbey çevresindeki işyeri ve atölyelerde yoğun kullanıma bağlı tıkanıklık ve basınç sorunlarını çözeriz." },
      { title: "Kombi & doğalgaz arızaları", detail: "Bağcılar genelindeki konutlarda kombi servisi ve doğalgaz tesisat onarımı yaparız." },
    ],
    faq: [
      { q: "Bağcılar'daki iş yerime/atölyeme servis veriyor musunuz?", a: "Evet, Mahmutbey ve Demirkapı çevresindeki işyeri ve atölyelere tıkanıklık, basınç ve su hattı sorunları için servis sağlıyoruz." },
      { q: "Bağcılar'a ne kadar sürede ulaşıyorsunuz?", a: "Yoğun trafiğe rağmen Bağcılar genelindeki acil çağrılara ortalama 35 dakika içinde ulaşıyoruz." },
    ],
  },
  {
    slug: "kucukcekmece",
    name: "Küçükçekmece",
    side: "Avrupa Yakası",
    neighborhoods: ["Sefaköy", "Halkalı", "Cennet", "Kartaltepe", "İnönü", "Atakent", "Söğütlüçeşme"],
    responseMin: 40,
    intro: "Küçükçekmece, Sefaköy ve Halkalı hattında 7/24 acil tesisat. Su kaçağı tespiti, kombi servisi ve petek temizliğinde sertifikalı ekip.",
    highlights: ["Halkalı yeni site projelerinde garantili kurulum", "Sefaköy hattında hızlı müdahale", "Göl çevresi nemli yapı tesisat uzmanlığı"],
    localContext: [
      "Küçükçekmece, Sefaköy'ün yerleşik apartman dokusundan Halkalı'daki yeni site projelerine ve göl çevresindeki konutlara kadar karışık bir yapı stoğuna sahiptir. Halkalı ve Atakent'teki yeni sitelerde ankastre tesisat, hidrofor ve doğalgaz işleri öne çıkar.",
      "Sefaköy ve Kartaltepe'deki yerleşik binalarda eskiyen borular, gider tıkanıklıkları ve kombi arızaları sıkça görülür. Küçükçekmece Gölü çevresindeki nemli yapılarda boru korozyonu ve nem kaynaklı sorunlar yaşanır; ekibimiz çağrılara ortalama 40 dakikada ulaşır.",
    ],
    commonIssues: [
      { title: "Yeni sitelerde ankastre & hidrofor", detail: "Halkalı ve Atakent'teki yeni sitelerde ankastre tesisat, hidrofor ve doğalgaz işlerini yaparız." },
      { title: "Yerleşik binalarda eski boru & gider", detail: "Sefaköy ve Kartaltepe'deki binalarda eskiyen boru ve gider tıkanıklıklarını gideririz." },
      { title: "Göl çevresinde nem & korozyon", detail: "Küçükçekmece Gölü çevresindeki nemli yapılarda boru korozyonu ve nem kaynaklı kaçakları çözeriz." },
    ],
    faq: [
      { q: "Halkalı'daki yeni siteme tesisat servisi veriyor musunuz?", a: "Evet, Halkalı ve Atakent'teki yeni sitelere ankastre tesisat, hidrofor ve doğalgaz kurulumu ile servisi sağlıyoruz." },
      { q: "Küçükçekmece'ye ne kadar sürede ulaşıyorsunuz?", a: "Sefaköy ve Halkalı dahil ilçe genelindeki acil çağrılara ortalama 40 dakika içinde ulaşıyoruz." },
    ],
  },
  {
    slug: "avcilar",
    name: "Avcılar",
    side: "Avrupa Yakası",
    neighborhoods: ["Ambarlı", "Denizköşkler", "Merkez", "Üniversite", "Cihangir", "Tahtakale", "Firuzköy"],
    responseMin: 40,
    intro: "Avcılar ve çevresinde acil tesisatçı hizmeti. Sahil hattındaki sitelerde su kaçağı, tıkanıklık ve kombi servisinde şeffaf fiyat.",
    highlights: ["Sahil hattı sitelerinde tecrübe", "Üniversite çevresine 7/24 servis", "Apartman & site bakım anlaşmaları"],
    localContext: [
      "Avcılar, Marmara sahili boyunca uzanan, yerleşik apartmanlar ve İstanbul Üniversitesi-Cerrahpaşa kampüsü çevresinde yoğun öğrenci konutları barındıran bir ilçedir. Denizköşkler ve Ambarlı'daki sahil hattı yapılarında nem ve tuzlu hava kaynaklı boru korozyonu en sık çözdüğümüz sorundur.",
      "Üniversite ve Cihangir çevresindeki yoğun kullanılan öğrenci dairelerinde gider tıkanıklıkları, batarya arızaları ve kombi sorunları sıkça yaşanır. Firuzköy ve Tahtakale'deki yerleşik konutlar dahil ilçe genelindeki çağrılara ortalama 40 dakikada ulaşırız.",
    ],
    commonIssues: [
      { title: "Sahil hattında korozyon & kaçak", detail: "Denizköşkler ve Ambarlı'daki sahil yapılarında nem kaynaklı boru korozyonu ve su kaçaklarını gideririz." },
      { title: "Öğrenci dairelerinde tıkanıklık & batarya", detail: "Üniversite çevresindeki yoğun kullanılan dairelerde gider tıkanıklığı ve batarya arızalarını çözeriz." },
      { title: "Yerleşik konutlarda kombi & petek", detail: "Firuzköy ve Tahtakale'deki binalarda kombi servisi ve petek temizliği yaparız." },
    ],
    faq: [
      { q: "Avcılar sahilindeki sitemde boru korozyonu sorununu çözüyor musunuz?", a: "Evet, Denizköşkler ve Ambarlı'daki sahil hattı yapılarında nem ve tuz kaynaklı boru korozyonunu onarır, dayanıklı malzemeyle yenileriz." },
      { q: "Avcılar'a ne kadar sürede ulaşıyorsunuz?", a: "Üniversite çevresi dahil ilçe genelindeki acil çağrılara ortalama 40 dakika içinde ulaşıyoruz." },
    ],
  },
  {
    slug: "basaksehir",
    name: "Başakşehir",
    side: "Avrupa Yakası",
    neighborhoods: ["Kayaşehir", "Başak", "Güvercintepe", "Şahintepe", "Bahçeşehir", "Ziya Gökalp"],
    responseMin: 40,
    intro: "Başakşehir ve Bahçeşehir'in modern site projelerinde 7/24 acil tesisat. Yeni yapı tesisatında garantili kurulum, kombi ve petek servisinde uzman ekip.",
    highlights: ["Yeni site & rezidanslarda garantili kurulum", "Bahçeşehir villa tesisatı", "Kayaşehir bölgesine hızlı ulaşım"],
    localContext: [
      "Başakşehir, İstanbul'un en planlı gelişen ilçelerinden biridir; Kayaşehir'deki büyük TOKİ ve site projelerinden Bahçeşehir'deki villa ve müstakil konutlara kadar ağırlıkla yeni yapı stoğuna sahiptir. Bu nedenle tesisat sorunları genellikle eskime değil, montaj ve proje kaynaklı olur: yeni sitelerde kolon bağlantı hataları, gömme rezervuar ve ankastre batarya montaj kaçakları, yerden ısıtma kollektör sorunları sık karşılaştığımız konulardır.",
      "Bahçeşehir ve Şahintepe'deki bahçeli müstakil yapılarda kış aylarında donan dış tesisat hatları, bahçe sulama ve drenaj sorunları öne çıkarken; Kayaşehir ve Başak mahallesindeki yüksek katlı bloklarda hidrofor basınç dengesizliği ve sıcak su sirkülasyon arızaları yoğundur. Ekibimiz ilçenin geniş site dokusunu bildiği için blok ve kapı bazında en kısa sürede ulaşır.",
    ],
    commonIssues: [
      { title: "Yeni sitelerde montaj kaynaklı kaçak", detail: "Kayaşehir ve Başak'taki yeni dairelerde gömme rezervuar, ankastre batarya ve kollektör bağlantılarındaki montaj kaçaklarını kırmadan tespit edip onarırız." },
      { title: "Villalarda donan dış tesisat", detail: "Bahçeşehir ve Şahintepe'deki bahçeli evlerde kışın donup patlayan dış hatları yeniler, izolasyon ve donma koruması uygularız." },
      { title: "Yüksek bloklarda basınç & sıcak su", detail: "Kayaşehir'deki yüksek katlı bloklarda hidrofor ve sirkülasyon pompası ayarlarıyla basınç ve sıcak su sorunlarını çözeriz." },
    ],
    faq: [
      { q: "Başakşehir'de yeni dairemde su kaçağını kırmadan bulur musunuz?", a: "Evet, Kayaşehir ve Bahçeşehir'deki yeni konutlarda termal kamera ve akustik dinleme ile gömme tesisat kaçaklarını kırmadan tespit ediyor, sadece gereken noktayı açıyoruz." },
      { q: "Bahçeşehir'deki villaya yıllık bakım sözleşmesi yapıyor musunuz?", a: "Evet, Bahçeşehir ve Şahintepe'deki villa ve sitelere kış öncesi donma koruması dahil periyodik bakım sözleşmesi sunuyoruz." },
    ],
  },
  {
    slug: "bahcelievler",
    name: "Bahçelievler",
    side: "Avrupa Yakası",
    neighborhoods: ["Şirinevler", "Yenibosna", "Soğanlı", "Kocasinan", "Zafer", "Çobançeşme"],
    responseMin: 35,
    intro: "Bahçelievler genelinde acil tesisatçı, su kaçağı tespiti ve kombi servisi. Şirinevler ve Yenibosna hattında ortalama 35 dakikada kapınızda.",
    highlights: ["Şirinevler & Yenibosna'da hızlı müdahale", "Apartman & site bakım sözleşmeleri", "Şeffaf fiyat, garantili işçilik"],
    localContext: [
      "Bahçelievler, Avrupa Yakası'nın yoğun apartman dokusuna sahip ilçelerinden biridir; Şirinevler, Yenibosna ve Soğanlı hattında 1980-2000 arası yapılmış orta yaşlı apartmanlar baskındır. Bu yaş grubundaki binalarda kolon ve ana gider hatlarındaki yıpranma, galvaniz boruların kireçlenip daralması ve mutfak-banyo gider tıkanıklıkları en sık karşılaştığımız sorunlardır.",
      "Metro ve toplu ulaşım hatlarına yakın Şirinevler ve Çobançeşme çevresindeki yoğun konut bloklarında ortak kolon tıkanıklıkları ve geri tepme şikâyetleri yaygındır. Kocasinan ve Zafer mahallelerindeki apartmanlarda ise kombi ve petek ısıtma arızaları yoğun talep görür. Ekibimiz bu mahallelerdeki bina tiplerini bildiğinden müdahaleyi hızlandırır.",
    ],
    commonIssues: [
      { title: "Orta yaşlı apartmanlarda kolon yıpranması", detail: "Şirinevler ve Soğanlı'daki apartmanlarda çürüyen kolon ve gider hatlarını noktasal tespitle yenileriz." },
      { title: "Ortak hat tıkanıklığı & geri tepme", detail: "Yoğun konut bloklarında ana kolon tıkanıklığını kanal jeti ve robotik spiralle açar, geri tepmeyi önleriz." },
      { title: "Kombi & petek ısıtma arızaları", detail: "Kocasinan ve Zafer'deki dairelerde kombi servisi ve petek temizliği ile ısınma sorunlarını gideririz." },
    ],
    faq: [
      { q: "Bahçelievler'de apartman ortak hattı tıkanıklığına bakıyor musunuz?", a: "Evet, Şirinevler ve Yenibosna'daki apartmanlarda ortak kolon ve ana gider tıkanıklıklarını kanal jeti ile açıyor, yönetimlerle toplu çalışıyoruz." },
      { q: "Bahçelievler'de aynı gün su kaçağı tespiti yapılır mı?", a: "Evet, Bahçelievler genelinde aynı gün, ortalama 35 dakikada su kaçağı tespiti ve onarımı için ekip yönlendiriyoruz." },
    ],
  },
  {
    slug: "gaziosmanpasa",
    name: "Gaziosmanpaşa",
    side: "Avrupa Yakası",
    neighborhoods: ["Karayolları", "Yenidoğan", "Sarıgöl", "Karadeniz", "Mevlana", "Pazariçi"],
    responseMin: 40,
    intro: "Gaziosmanpaşa ve çevresinde 7/24 acil tesisatçı. Eski ve yeni yapılarda su kaçağı, tıkanıklık ve kombi servisinde garantili işçilik.",
    highlights: ["Eski binalarda hasarsız su kaçağı tespiti", "Konut & işyeri tesisat servisi", "7/24 acil çağrı desteği"],
    localContext: [
      "Gaziosmanpaşa, hızlı kentsel dönüşüm yaşayan bir ilçedir; Karayolları ve Sarıgöl gibi mahallelerdeki eski, çok katlı apartmanlar ile yeni yapılan dönüşüm binaları yan yana bulunur. Eski yapı stoğunda korozyona uğramış demir/galvaniz borular, duvar içi gizli kaçaklar ve daralan kolon hatları öne çıkarken, yeni dönüşüm binalarında montaj kaynaklı tesisat sorunları görülür.",
      "Yenidoğan, Mevlana ve Karadeniz mahallelerindeki yoğun apartman dokusunda mutfak-banyo gider tıkanıklıkları ve ana hat sorunları sıktır. Bölgedeki ticari alanlarda ise işyeri tesisatı, yağ kaynaklı gider tıkanıklığı ve acil su kesintisi müdahaleleri talep görür. Ekibimiz hem eski hem yeni yapı tiplerine uygun yöntemlerle çalışır.",
    ],
    commonIssues: [
      { title: "Eski binalarda korozyon & gizli kaçak", detail: "Karayolları ve Sarıgöl'deki eski apartmanlarda çürüyen boruları termal kamerayla bulur, kırmadan onarırız." },
      { title: "Dönüşüm binalarında montaj sorunları", detail: "Yeni yapılan dönüşüm dairelerinde gömme tesisat ve batarya montaj kaçaklarını giderir, garantili çalışırız." },
      { title: "İşyeri & ticari gider tıkanıklığı", detail: "Bölgedeki dükkân ve lokantalarda yağ kaynaklı gider tıkanıklıklarını kanal jeti ile hızla açarız." },
    ],
    faq: [
      { q: "Gaziosmanpaşa'da eski binada kırmadan su kaçağı bulunur mu?", a: "Evet, Karayolları ve Sarıgöl gibi eski yapı dokusunda termal kamera ve akustik cihazlarla kırmadan kaçak tespiti yapıyor, sadece gereken noktayı açıyoruz." },
      { q: "Gaziosmanpaşa'da 7/24 acil tesisatçı var mı?", a: "Evet, Gaziosmanpaşa genelinde gece dahil 7/24 acil servis veriyor, patlak boru ve tıkanıklık çağrılarına hızla müdahale ediyoruz." },
    ],
  },
  {
    slug: "sultangazi",
    name: "Sultangazi",
    side: "Avrupa Yakası",
    neighborhoods: ["Habipler", "Cebeci", "Uğur Mumcu", "50. Yıl", "Gazi", "Esentepe"],
    responseMin: 40,
    intro: "Sultangazi genelinde acil tesisatçı, kombi ve doğalgaz tesisatı. Konutlarda su kaçağı, tıkanıklık açma ve petek temizliğinde hızlı çözüm.",
    highlights: ["Konut tesisat & doğalgaz servisi", "Şeffaf fiyat, garantili işçilik", "7/24 acil müdahale"],
    localContext: [
      "Sultangazi, ağırlıkla konut ağırlıklı ve yoğun nüfuslu bir ilçedir; Habipler, Cebeci ve Gazi mahallelerinde çok katlı apartmanlar baskındır. Bölgenin bir kısmı sonradan imara açılan ve doğalgaz dönüşümü görece yeni tamamlanan yapılardan oluştuğu için doğalgaz tesisatı, kombi montajı ve dönüşüm işleri yoğun talep görür.",
      "Uğur Mumcu ve 50. Yıl mahallelerindeki apartmanlarda kombi ve petek ısıtma arızaları kış aylarında öne çıkarken, yoğun konut dokusunda mutfak-banyo gider tıkanıklıkları ve ana hat sorunları yıl boyu sürer. Ekibimiz ilçenin yapı karakterine uygun, hem ekonomik hem garantili çözümler sunar.",
    ],
    commonIssues: [
      { title: "Doğalgaz tesisatı & dönüşüm", detail: "Habipler ve Cebeci'deki binalarda tüp/sobadan doğalgaza dönüşüm, gaz hattı döşeme ve kombi montajını sertifikalı ekiple yaparız." },
      { title: "Kış aylarında kombi & petek arızası", detail: "Uğur Mumcu ve Gazi mahallesindeki dairelerde kombi servisi ve petek temizliği ile ısınma sorunlarını gideririz." },
      { title: "Yoğun konutta gider tıkanıklığı", detail: "Apartmanlarda mutfak, banyo ve ana kolon tıkanıklıklarını robotik spiral ve kanal jeti ile açarız." },
    ],
    faq: [
      { q: "Sultangazi'de doğalgaz tesisatı ve kombi montajı yapıyor musunuz?", a: "Evet, Sultangazi genelinde sertifikalı ekiple doğalgaz iç tesisat döşeme, dönüşüm ve kombi montajı yapıyor, devreye alma dahil garantili teslim ediyoruz." },
      { q: "Sultangazi'de uygun fiyatlı acil tesisatçı bulunur mu?", a: "Evet, Sultangazi'de şeffaf ve sürprizsiz fiyatla 7/24 acil tesisat hizmeti veriyor, işlem öncesi net fiyat bildiriyoruz." },
    ],
  },
  {
    slug: "sancaktepe",
    name: "Sancaktepe",
    side: "Anadolu Yakası",
    neighborhoods: ["Sarıgazi", "Yenidoğan", "Samandıra", "Abdurrahmangazi", "Eyüp Sultan", "Veysel Karani"],
    responseMin: 40,
    intro: "Sancaktepe ve çevresindeki yeni site projelerinde 7/24 acil tesisat. Su kaçağı tespiti, kombi servisi ve petek temizliğinde garantili hizmet.",
    highlights: ["Yeni site projelerinde garantili kurulum", "Sarıgazi & Samandıra'ya hızlı ulaşım", "Şeffaf fiyat, garantili işçilik"],
    localContext: [
      "Sancaktepe, Anadolu Yakası'nda hızla büyüyen, yeni site ve konut projelerinin yoğunlaştığı bir ilçedir; Sarıgazi ve Samandıra hattındaki yeni yapı stoğu ağırlıktadır. Bu nedenle tesisat sorunları çoğunlukla yeni montaj kaynaklıdır: gömme rezervuar ve ankastre batarya kaçakları, yerden ısıtma kollektör sorunları ve site kolon bağlantı hataları sık görülür.",
      "Abdurrahmangazi ve Eyüp Sultan mahallelerindeki müstakil ve az katlı yapılarda kışın donan dış tesisat ve bahçe drenaj sorunları öne çıkarken, yeni sitelerde hidrofor basıncı ve sıcak su sirkülasyonu sorunları yaşanır. Ekibimiz ilçenin gelişen site dokusunu yakından takip eder ve blok bazında hızlı ulaşır.",
    ],
    commonIssues: [
      { title: "Yeni sitelerde montaj kaçağı", detail: "Sarıgazi ve Samandıra'daki yeni dairelerde gömme tesisat ve batarya montaj kaçaklarını kırmadan tespit edip onarırız." },
      { title: "Müstakil yapılarda donan dış hat", detail: "Abdurrahmangazi ve Eyüp Sultan'daki bahçeli evlerde kışın donan dış tesisatı yeniler, donma koruması uygularız." },
      { title: "Sitelerde basınç & sıcak su", detail: "Yeni sitelerde hidrofor ve sirkülasyon pompası ayarlarıyla basınç ve sıcak su sorunlarını çözeriz." },
    ],
    faq: [
      { q: "Sancaktepe'deki yeni sitede su kaçağını kırmadan bulur musunuz?", a: "Evet, Sarıgazi ve Samandıra'daki yeni konutlarda termal kamera ve akustik dinleme ile gömme tesisat kaçaklarını kırmadan tespit ediyoruz." },
      { q: "Sancaktepe'ye ne kadar sürede ulaşıyorsunuz?", a: "Sancaktepe genelinde acil çağrılara ortalama 40 dakikada müdahale ediyor, Sarıgazi ve Samandıra hattına öncelikli ulaşıyoruz." },
    ],
  },
  {
    slug: "sultanbeyli",
    name: "Sultanbeyli",
    side: "Anadolu Yakası",
    neighborhoods: ["Abdurrahmangazi", "Mehmet Akif", "Battalgazi", "Fatih", "Hamidiye", "Turgutreis"],
    responseMin: 45,
    intro: "Sultanbeyli genelinde acil tesisatçı, kombi ve doğalgaz tesisatı. Konut ve işyerlerinde su kaçağı, tıkanıklık ve petek temizliğinde garantili işçilik.",
    highlights: ["Konut & işyeri tesisat servisi", "Doğalgaz & kombi yetkili servis", "Şeffaf fiyat, sürpriz ücret yok"],
    localContext: [
      "Sultanbeyli, Anadolu Yakası'nın iç kesiminde, ağırlıkla konut ağırlıklı ve sonradan planlı gelişen bir ilçedir; Mehmet Akif, Battalgazi ve Fatih mahallelerinde çok katlı apartmanlar baskındır. Doğalgaz dönüşümü görece geç tamamlanan bölgelerde doğalgaz iç tesisatı, kombi montajı ve dönüşüm işleri yoğun talep görür.",
      "Hamidiye ve Turgutreis mahallelerindeki apartmanlarda kış aylarında kombi ve petek ısıtma arızaları öne çıkarken, yoğun konut dokusunda mutfak-banyo gider tıkanıklıkları yıl boyu sürer. Bölgedeki küçük işyerlerinde ise ticari tesisat ve acil su müdahaleleri talep görür. Ekibimiz hem konut hem işyeri için garantili çözüm sunar.",
    ],
    commonIssues: [
      { title: "Doğalgaz tesisatı & dönüşüm", detail: "Battalgazi ve Mehmet Akif'teki binalarda sobadan doğalgaza dönüşüm, gaz hattı döşeme ve kombi montajını sertifikalı ekiple yaparız." },
      { title: "Kış aylarında kombi & petek", detail: "Hamidiye ve Fatih mahallesindeki dairelerde kombi servisi ve petek temizliği ile ısınma sorunlarını gideririz." },
      { title: "Konut & işyerinde gider tıkanıklığı", detail: "Apartman ve dükkânlarda mutfak, banyo ve ana hat tıkanıklıklarını robotik spiral ve kanal jeti ile açarız." },
    ],
    faq: [
      { q: "Sultanbeyli'de doğalgaz tesisatı ve kombi montajı yapıyor musunuz?", a: "Evet, Sultanbeyli genelinde sertifikalı ekiple doğalgaz iç tesisat döşeme, dönüşüm ve kombi montajı yapıyor, devreye alma dahil garantili teslim ediyoruz." },
      { q: "Sultanbeyli'de işyeri tesisatına bakıyor musunuz?", a: "Evet, Sultanbeyli'deki dükkân ve işyerlerinde tesisat kurulumu, tıkanıklık açma ve acil su müdahalelerini şeffaf fiyatla yapıyoruz." },
    ],
  },
  {
    slug: "tuzla",
    name: "Tuzla",
    side: "Anadolu Yakası",
    neighborhoods: ["Aydınlı", "Şifa", "İçmeler", "Postane", "Cami", "Mimar Sinan", "Tepeören"],
    responseMin: 45,
    intro: "Tuzla sahil ve iç mahallelerde 7/24 acil tesisat. Sanayi bölgesi ve villalarda su kaçağı, kombi ve doğalgaz tesisatında uzman ekip.",
    highlights: ["Sanayi bölgesi tesisat bakımı", "Sahil hattı tuza dayanıklı tesisat", "Villa & site yıllık bakım"],
    localContext: [
      "Tuzla, Anadolu Yakası'nın en uç ilçelerinden biridir ve çok farklı yapı karakterlerini bir arada barındırır: İçmeler ve Aydınlı'daki sahil siteleri ve villalar, Tepeören ve organize sanayi bölgesindeki ticari/endüstriyel tesisler, Mimar Sinan ve Postane'deki konut dokusu. Bu çeşitlilik, tesisat ihtiyaçlarının da çok yönlü olmasını gerektirir.",
      "Marmara kıyısındaki sahil hattında tuzlu nem kaynaklı boru korozyonu ve metal tesisatın hızlı yıpranması öne çıkar; bu bölgede paslanmaz ve PE-X gibi tuza dayanıklı malzeme tercih ederiz. Organize sanayi ve tersane çevresindeki tesislerde endüstriyel tesisat bakımı, yüksek kapasiteli hat ve pompa sistemleri talep görürken, villalarda kışın donan dış tesisat ve bahçe sistemleri öne çıkar.",
    ],
    commonIssues: [
      { title: "Sahil hattında tuz kaynaklı korozyon", detail: "İçmeler ve Aydınlı sahilindeki yapılarda tuzlu nemle çürüyen boruları paslanmaz/PE-X malzeme ile yenileriz." },
      { title: "Sanayi & işyerinde endüstriyel tesisat", detail: "Tepeören ve organize sanayideki tesislerde yüksek kapasiteli hat, pompa ve gider sistemlerinin bakım ve onarımını yaparız." },
      { title: "Villalarda donan dış tesisat & bahçe", detail: "İçmeler ve Şifa'daki villalarda kışın donan dış hatları yeniler, bahçe sulama ve drenaj sistemlerini bakarız." },
    ],
    faq: [
      { q: "Tuzla sahilindeki villaya tuza dayanıklı tesisat yapıyor musunuz?", a: "Evet, İçmeler ve Aydınlı sahil hattındaki villa ve sitelerde tuzlu neme dayanıklı paslanmaz ve PE-X malzemeyle tesisat yeniliyor, korozyona karşı kalıcı çözüm sunuyoruz." },
      { q: "Tuzla sanayi bölgesinde işyeri tesisat bakımı yapılır mı?", a: "Evet, Tepeören ve organize sanayi bölgesindeki tesislerde endüstriyel tesisat bakımı, pompa ve yüksek kapasiteli hat servisini periyodik sözleşmeyle veriyoruz." },
    ],
  },
  {
    slug: "eyupsultan",
    name: "Eyüpsultan",
    side: "Avrupa Yakası",
    neighborhoods: ["Alibeyköy", "Göktürk", "Kemerburgaz", "Rami", "Nişanca", "Topçular", "Silahtarağa"],
    responseMin: 35,
    intro: "Eyüpsultan ve tüm mahallelerinde 7/24 acil tesisatçı. Tarihi yarımada dokusundan Göktürk'teki modern villalara kadar su kaçağı, tıkanıklık ve kombi servisinde uzman ekip.",
    highlights: ["Tarihi binalarda hasarsız müdahale", "Göktürk & Kemerburgaz villalarında özel servis", "Alibeyköy sanayi & konut hattında hızlı ulaşım"],
    localContext: [
      "Eyüpsultan, Haliç kıyısındaki yüzlerce yıllık tarihi dokuyla Göktürk ve Kemerburgaz'daki modern villa ve site yaşamını aynı ilçede buluşturan geniş bir bölgedir. Rami, Nişanca ve Eyüp merkezindeki eski yapılarda korozyona uğramış galvaniz borular ve gizli su kaçakları öne çıkarken, Göktürk hattındaki müstakil evlerde bahçe drenajı, dış tesisat ve yüksek konfor sistemleri talep görür.",
      "Alibeyköy ve Silahtarağa çevresindeki yoğun apartman dokusunda ana gider hattı tıkanıklıkları ve kolon arızaları sıkça yaşanırken, Topçular sanayi bölgesindeki işyerlerinde endüstriyel tesisat bakımı ihtiyaçları oluşur. Ekiplerimiz Eyüpsultan'ın hem tarihi hem modern yapı tiplerini bildiği için müdahale süresini kısaltır.",
    ],
    commonIssues: [
      { title: "Tarihi yapılarda gizli su kaçağı", detail: "Eyüp merkez ve Nişanca'daki eski binalarda termal kamera ve akustik dinleme ile kırmadan kaçak tespiti yaparız." },
      { title: "Göktürk villalarında dış tesisat & bahçe", detail: "Göktürk ve Kemerburgaz'daki müstakil evlerde donan dış hatları, bahçe sulama ve drenaj sistemlerini bakar ve yenileriz." },
      { title: "Alibeyköy apartmanlarında kolon tıkanıklığı", detail: "Alibeyköy ve Rami'deki yoğun apartmanlarda ana gider ve kolon tıkanıklıklarını kanal jeti ile hızla açarız." },
    ],
    faq: [
      { q: "Eyüpsultan'da gece acil tesisatçı buluyor musunuz?", a: "Evet, Eyüpsultan genelinde 7/24 acil servis veriyoruz. Gece yarısı dahil su kaçağı, patlak boru ve tıkanıklık çağrılarına ortalama 35 dakikada müdahale ediyoruz." },
      { q: "Göktürk'teki villalara tesisat bakım sözleşmesi yapıyor musunuz?", a: "Evet, Göktürk ve Kemerburgaz hattındaki villa ve sitelere periyodik bakım ve önceliklendirilmiş acil servis sözleşmesi sunuyoruz." },
    ],
  },
  {
    slug: "zeytinburnu",
    name: "Zeytinburnu",
    side: "Avrupa Yakası",
    neighborhoods: ["Merkezefendi", "Seyitnizam", "Telsiz", "Çırpıcı", "Veliefendi", "Kazlıçeşme", "Sümer"],
    responseMin: 30,
    intro: "Zeytinburnu ve çevresinde 7/24 acil tesisatçı hizmeti. Yoğun apartman dokusu ve ticari hatlarda su kaçağı, tıkanıklık açma ve kombi servisinde ortalama 30 dakikada kapınızdayız.",
    highlights: ["Yoğun apartman dokusunda hızlı müdahale", "Kazlıçeşme & deri sanayi hattında işyeri servisi", "Sahil yolu ve E5 hattına yakın konumlanma"],
    localContext: [
      "Zeytinburnu, İstanbul'un en yoğun yerleşim dokularından birine sahip, çok katlı apartmanların ve ticari binaların iç içe geçtiği bir ilçedir. Telsiz, Seyitnizam ve Çırpıcı'daki sık apartman yapısında kolon ve ana gider hattı tıkanıklıkları, basınç sorunları ve daireler arası su kaçakları öne çıkar.",
      "Kazlıçeşme ve eski deri sanayi çevresindeki ticari yapılarda yağ ve atık kaynaklı gider tıkanıklıkları ile yüksek kapasiteli hat ihtiyaçları sık görülür. Merkezefendi ve Veliefendi hattındaki karma konut-ticaret dokusunda ise doğalgaz tesisatı ve kombi servisi talepleri yoğunlukludur.",
    ],
    commonIssues: [
      { title: "Apartmanlarda kolon & ana hat tıkanıklığı", detail: "Telsiz ve Seyitnizam'daki yoğun apartmanlarda kolon ve ana gider tıkanıklıklarını kanal jeti ve robotik spiral ile açarız." },
      { title: "Daireler arası su kaçağı", detail: "Çırpıcı ve Sümer'deki çok katlı binalarda alt kata sızan kaçakları termal kamera ile kırmadan tespit ederiz." },
      { title: "Ticari hatlarda yağ kaynaklı tıkanıklık", detail: "Kazlıçeşme çevresindeki işyeri ve atölyelerde yağ-atık kaynaklı gider tıkanıklıklarını kanal jeti ile temizleriz." },
    ],
    faq: [
      { q: "Zeytinburnu'nda apartman kolonundaki tıkanıklığı açıyor musunuz?", a: "Evet, Zeytinburnu genelinde apartman kolon ve ana gider hattı tıkanıklıklarını kanal jeti ve robotik spiral ile ortalama 30 dakikada müdahale ederek açıyoruz." },
      { q: "Zeytinburnu'nda işyeri için tesisat servisi veriyor musunuz?", a: "Evet, Kazlıçeşme ve çevresindeki dükkan, atölye ve işyerlerine yağ kaynaklı tıkanıklık, su kaçağı ve doğalgaz tesisat hizmeti veriyoruz." },
    ],
  },
  {
    slug: "kagithane",
    name: "Kağıthane",
    side: "Avrupa Yakası",
    neighborhoods: ["Çağlayan", "Gültepe", "Seyrantepe", "Sanayi", "Talatpaşa", "Nurtepe", "Çeliktepe"],
    responseMin: 30,
    intro: "Kağıthane'nin tüm mahallelerinde 7/24 acil tesisat ve ısıtma çözümleri. Eski gecekondu dönüşümünden yeni rezidanslara kadar her yapıda tecrübeli ekip.",
    highlights: ["Yeni rezidanslarda basınç & sıcak su uzmanlığı", "Çağlayan iş merkezleri hattında işyeri servisi", "Eğimli mahallelerde hızlı ulaşım"],
    localContext: [
      "Kağıthane, son yıllarda hızlı kentsel dönüşümle eski yapıların yerini yüksek katlı rezidans ve iş merkezlerine bıraktığı, eğimli bir topografyaya sahip ilçedir. Seyrantepe ve Çeliktepe'deki yeni yüksek binalarda basınçlandırma, hidrofor ve sıcak su sirkülasyonu sorunları öne çıkar.",
      "Gültepe ve Nurtepe'deki dönüşüm bekleyen eski yapılarda çürümüş borular ve gizli kaçaklar sık görülürken, Çağlayan'daki adliye ve iş merkezleri çevresindeki ticari binalarda yüksek kapasiteli tesisat ve acil servis ihtiyacı yoğundur. Eğimli sokakları iyi bilen ekiplerimiz gecikmeden ulaşır.",
    ],
    commonIssues: [
      { title: "Yeni rezidanslarda basınç düşüklüğü", detail: "Seyrantepe ve Çeliktepe'deki yüksek katlarda hidrofor ve basınç düşürücü ayarsızlıklarını çözeriz." },
      { title: "Eski yapılarda çürük boru & kaçak", detail: "Gültepe ve Nurtepe'deki dönüşüm bekleyen binalarda çürümüş galvaniz boruları yeniler, gizli kaçakları tespit ederiz." },
      { title: "İş merkezlerinde acil tesisat", detail: "Çağlayan'daki ofis ve iş merkezlerinde acil su kesintisi, tıkanıklık ve kaçak sorunlarına öncelikli müdahale ederiz." },
    ],
    faq: [
      { q: "Kağıthane'deki yeni binada su basıncı sorununu çözüyor musunuz?", a: "Evet, Seyrantepe ve Çeliktepe başta olmak üzere Kağıthane'deki yüksek katlı binalarda hidrofor kurulumu ve basınç ayarı yaparak sıcak-soğuk su basıncı sorunlarını gideriyoruz." },
      { q: "Kağıthane'de işyeri ve ofislere acil tesisat servisi var mı?", a: "Evet, Çağlayan iş merkezleri hattı başta olmak üzere Kağıthane genelindeki ofis ve işyerlerine 7/24 acil tesisat servisi veriyoruz." },
    ],
  },
  {
    slug: "esenler",
    name: "Esenler",
    side: "Avrupa Yakası",
    neighborhoods: ["Menderes", "Oruçreis", "Fevzi Çakmak", "Çiftehavuzlar", "Birlik", "Havaalanı", "Ninçakmak"],
    responseMin: 35,
    intro: "Esenler ve tüm mahallelerinde 7/24 acil tesisatçı. Yoğun konut dokusu ve otogar çevresinde su kaçağı, tıkanıklık açma ve kombi servisinde hızlı ekip.",
    highlights: ["Yoğun apartman dokusunda hızlı müdahale", "Otogar & ticari hatta işyeri servisi", "Kentsel dönüşüm binalarında tesisat yenileme"],
    localContext: [
      "Esenler, sık apartman dokusu ve İstanbul Otogarı'nı barındıran, yoğun konut ve ticaretin iç içe olduğu bir ilçedir. Menderes, Oruçreis ve Çiftehavuzlar'daki çok katlı binalarda kolon tıkanıklıkları, basınç düşüklüğü ve daireler arası su kaçakları en sık karşılaştığımız sorunlardır.",
      "Otogar ve çevresindeki ticari yapılar ile Havaalanı mahallesindeki karma dokuda yüksek kapasiteli tesisat ve acil servis talebi yoğundur. Kentsel dönüşümle yenilenen Birlik ve Fevzi Çakmak hattında ise sıfırdan tesisat döşeme ve doğalgaz dönüşümü işleri öne çıkar.",
    ],
    commonIssues: [
      { title: "Apartmanlarda kolon tıkanıklığı", detail: "Menderes ve Oruçreis'teki yoğun apartmanlarda ana gider ve kolon tıkanıklıklarını kanal jeti ile hızla açarız." },
      { title: "Çok katlı binada su kaçağı", detail: "Çiftehavuzlar ve Birlik'teki binalarda alt kata sızan gizli kaçakları termal kamera ile kırmadan tespit ederiz." },
      { title: "Dönüşüm yapılarında tesisat yenileme", detail: "Fevzi Çakmak hattındaki yeni binalarda sıfırdan temiz/pis su ve doğalgaz tesisatı döşeriz." },
    ],
    faq: [
      { q: "Esenler'de gece acil tıkanıklık açma yapıyor musunuz?", a: "Evet, Esenler genelinde 7/24 acil tıkanıklık açma hizmeti veriyoruz. Gece dahil kolon ve ana gider tıkanıklıklarına ortalama 35 dakikada müdahale ediyoruz." },
      { q: "Esenler'de kentsel dönüşüm binasına sıfır tesisat döşüyor musunuz?", a: "Evet, Esenler'deki yeni ve dönüşüm binalarında sıfırdan temiz su, pis su ve doğalgaz tesisatı projelendirip döşüyoruz." },
    ],
  },
  {
    slug: "bayrampasa",
    name: "Bayrampaşa",
    side: "Avrupa Yakası",
    neighborhoods: ["Kartaltepe", "Yıldırım", "Vatan", "Cevatpaşa", "Muratpaşa", "Terazidere", "Altıntepsi"],
    responseMin: 30,
    intro: "Bayrampaşa'nın tüm mahallelerinde 7/24 acil tesisat hizmeti. Yoğun konut ve sebze hali çevresindeki ticari hatlarda su kaçağı, tıkanıklık ve kombi servisinde uzman ekip.",
    highlights: ["Sebze hali & ticari hatta işyeri servisi", "Yoğun apartman dokusunda hızlı müdahale", "E5 ve metro hattına yakın konumlanma"],
    localContext: [
      "Bayrampaşa, İstanbul'un toptan sebze-meyve halini barındıran, yoğun apartman dokusuyla ticaretin iç içe geçtiği merkezi bir ilçedir. Kartaltepe, Yıldırım ve Cevatpaşa'daki çok katlı binalarda kolon tıkanıklıkları, basınç sorunları ve daireler arası kaçaklar sıkça yaşanır.",
      "Sebze hali ve çevresindeki ticari yapılarda yüksek kapasiteli gider hatları ve yağ-atık kaynaklı tıkanıklıklar öne çıkar. Terazidere ve Altıntepsi hattındaki karma dokuda ise kombi servisi, petek temizliği ve doğalgaz tesisatı talepleri yoğunlukludur.",
    ],
    commonIssues: [
      { title: "Ticari hatta yüksek kapasiteli tıkanıklık", detail: "Sebze hali çevresindeki işyerlerinde yoğun atık kaynaklı gider tıkanıklıklarını kanal jeti ile temizleriz." },
      { title: "Apartmanlarda daireler arası kaçak", detail: "Kartaltepe ve Yıldırım'daki çok katlı binalarda alt kata sızan kaçakları termal kamera ile kırmadan buluruz." },
      { title: "Kombi & petek arızaları", detail: "Cevatpaşa ve Muratpaşa'daki dairelerde kombi servisi, petek temizliği ve ısıtma sorunlarını çözeriz." },
    ],
    faq: [
      { q: "Bayrampaşa sebze hali çevresinde işyeri tesisatı yapıyor musunuz?", a: "Evet, Bayrampaşa hali ve çevresindeki işyerlerine yüksek kapasiteli gider açma, su kaçağı ve doğalgaz tesisat servisi veriyoruz." },
      { q: "Bayrampaşa'da kombi ve petek bakımı yapıyor musunuz?", a: "Evet, Bayrampaşa genelinde kombi servisi, petek temizliği ve ısıtma sistemi bakımı hizmeti veriyoruz." },
    ],
  },
  {
    slug: "gungoren",
    name: "Güngören",
    side: "Avrupa Yakası",
    neighborhoods: ["Merkez", "Akıncılar", "Gençosman", "Güneştepe", "Mareşal Çakmak", "Tozkoparan", "Haznedar"],
    responseMin: 30,
    intro: "Güngören ve çevresinde 7/24 acil tesisatçı. İstanbul'un en yoğun yerleşim dokularından birinde su kaçağı, tıkanıklık açma ve kombi servisinde ortalama 30 dakikada kapınızdayız.",
    highlights: ["Çok yoğun apartman dokusunda hızlı müdahale", "Tekstil & ticari atölye hattında işyeri servisi", "Dar sokaklara hâkim deneyimli ekip"],
    localContext: [
      "Güngören, İstanbul'un birim alana en çok bina düşen, son derece yoğun bir yerleşim dokusuna sahip ilçesidir. Merkez, Akıncılar ve Gençosman'daki bitişik nizam çok katlı binalarda kolon tıkanıklıkları, basınç dengesizliği ve komşu daireye sızan su kaçakları başlıca sorunlardır.",
      "Tozkoparan ve Haznedar çevresindeki tekstil atölyeleri ve ticari yapılarda yüksek su tüketimi, yağ-atık kaynaklı gider tıkanıklıkları görülür. Dar ve sık sokaklı yapıyı iyi bilen ekiplerimiz, en kısa rotayı kullanarak gecikmeden ulaşır.",
    ],
    commonIssues: [
      { title: "Bitişik binalarda kolon tıkanıklığı", detail: "Merkez ve Akıncılar'daki yoğun apartmanlarda ortak kolon ve ana gider tıkanıklıklarını kanal jeti ile açarız." },
      { title: "Komşu daireye su kaçağı", detail: "Gençosman ve Güneştepe'deki çok katlı binalarda alt/yan daireye sızan kaçakları termal kamera ile kırmadan tespit ederiz." },
      { title: "Atölyelerde yüksek kapasiteli gider", detail: "Tozkoparan'daki tekstil atölyelerinde yoğun atık kaynaklı tıkanıklıkları ve gider hattı sorunlarını gideririz." },
    ],
    faq: [
      { q: "Güngören'de dar sokaktaki binaya hızlı ulaşıyor musunuz?", a: "Evet, Güngören'in yoğun ve dar sokaklı dokusuna hâkim ekiplerimizle acil çağrılara ortalama 30 dakikada müdahale ediyoruz." },
      { q: "Güngören'de komşuya sızan su kaçağını kırmadan buluyor musunuz?", a: "Evet, termal kamera ve akustik dinleme cihazlarıyla daireler arası gizli kaçakları kırmadan tespit edip sadece gereken noktayı açıyoruz." },
    ],
  },
  {
    slug: "arnavutkoy",
    name: "Arnavutköy",
    side: "Avrupa Yakası",
    neighborhoods: ["Hadımköy", "Taşoluk", "Bolluca", "Haraççı", "Boğazköy", "Yeşilbayır", "İmrahor"],
    responseMin: 45,
    intro: "Arnavutköy ve geniş köy-mahalle ağında 7/24 acil tesisat. Müstakil evler, siteler ve sanayi tesislerinde su kaçağı, kombi ve doğalgaz tesisatında uzman ekip.",
    highlights: ["Müstakil ev & villa dış tesisat uzmanlığı", "Hadımköy sanayi hattında işyeri servisi", "Geniş bölgeye planlı hızlı ulaşım"],
    localContext: [
      "Arnavutköy, İstanbul'un kuzeybatısında geniş bir alana yayılan, müstakil evlerin, yeni sitelerin ve sanayi tesislerinin bir arada bulunduğu ilçedir. Bolluca, Taşoluk ve Yeşilbayır'daki müstakil ve az katlı yapılarda kuyu-hidrofor sistemleri, bahçe drenajı ve donan dış tesisat sık karşılaşılan konulardır.",
      "Hadımköy organize sanayi ve lojistik tesislerinde yüksek kapasiteli hat, pompa ve endüstriyel gider sistemleri talep görür. Yeni havalimanı çevresindeki gelişen konut bölgelerinde ise sıfırdan tesisat döşeme ve doğalgaz altyapısı işleri yoğunlukludur. Geniş bölgeye günlük planlı rotalarla ulaşırız.",
    ],
    commonIssues: [
      { title: "Müstakil evlerde hidrofor & kuyu sistemi", detail: "Bolluca ve Taşoluk'taki müstakil evlerde hidrofor, kuyu pompası ve depo sistemlerini kurar ve bakarız." },
      { title: "Sanayide endüstriyel tesisat", detail: "Hadımköy organize sanayideki tesislerde yüksek kapasiteli hat, pompa ve gider sistemlerinin bakım ve onarımını yaparız." },
      { title: "Kışın donan dış tesisat", detail: "Haraççı ve Boğazköy'deki müstakil yapılarda kışın donan dış hatları yeniler, izolasyon ve drenaj çözümü uygularız." },
    ],
    faq: [
      { q: "Arnavutköy'deki müstakil eve hidrofor kuruyor musunuz?", a: "Evet, Bolluca, Taşoluk ve çevresindeki müstakil ev ve villalarda hidrofor, kuyu pompası ve su deposu sistemleri kurup basınç sorunlarını çözüyoruz." },
      { q: "Hadımköy sanayi bölgesine endüstriyel tesisat servisi var mı?", a: "Evet, Hadımköy organize sanayi ve lojistik tesislerine yüksek kapasiteli hat, pompa ve gider sistemi bakımını periyodik sözleşmeyle veriyoruz." },
    ],
  },
  {
    slug: "buyukcekmece",
    name: "Büyükçekmece",
    side: "Avrupa Yakası",
    neighborhoods: ["Mimaroba", "Sinanoba", "Kumburgaz", "Atatürk", "Cumhuriyet", "Türkoba", "Karaağaç"],
    responseMin: 45,
    intro: "Büyükçekmece sahil ve iç mahallelerinde 7/24 acil tesisat. Sahil siteleri ve villalarda su kaçağı, kombi servisi ve doğalgaz tesisatında deneyimli ekip.",
    highlights: ["Sahil sitelerinde özel anlaşmalı servis", "Villa & müstakil ev dış tesisat uzmanlığı", "Kumburgaz hattı sezonluk konut servisi"],
    localContext: [
      "Büyükçekmece, Marmara kıyısındaki sahil siteleri, Mimaroba-Sinanoba hattındaki villalar ve iç mahallelerdeki konut dokusunu bir arada barındıran geniş bir ilçedir. Sahil hattındaki yüksek katlı sitelerde basınçlandırma, hidrofor ve sıcak su sirkülasyonu sorunları öne çıkar.",
      "Kumburgaz ve sahil çevresindeki yazlık-sezonluk konutlarda kışa hazırlık, dış tesisat boşaltma ve donma kaynaklı arızalar sıkça yaşanır. Tuzlu deniz nemi, sahil yapılarında metal tesisatın hızlı yıpranmasına yol açtığı için paslanmaz ve PE-X malzeme tercih ederiz.",
    ],
    commonIssues: [
      { title: "Sahil sitelerinde basınç & hidrofor", detail: "Mimaroba ve Sinanoba'daki yüksek katlı sitelerde hidrofor ve basınç sistemlerinin arızalarını çözeriz." },
      { title: "Sezonluk konutlarda kışa hazırlık", detail: "Kumburgaz'daki yazlık konutlarda dış tesisat boşaltma, donma önleme ve sezon açılışı kontrolü yaparız." },
      { title: "Sahil hattında tuz kaynaklı korozyon", detail: "Deniz nemiyle çürüyen metal boruları paslanmaz ve PE-X malzeme ile yenileriz." },
    ],
    faq: [
      { q: "Büyükçekmece sahilindeki siteye bakım sözleşmesi yapıyor musunuz?", a: "Evet, Mimaroba, Sinanoba ve sahil hattındaki sitelere periyodik bakım ve önceliklendirilmiş acil servis sözleşmesi sunuyoruz." },
      { q: "Kumburgaz'daki yazlık için kışa hazırlık tesisat servisi var mı?", a: "Evet, Kumburgaz ve sahil çevresindeki sezonluk konutlarda dış tesisat boşaltma, donma önleme ve sezon açılış kontrolü hizmeti veriyoruz." },
    ],
  },
  {
    slug: "catalca",
    name: "Çatalca",
    side: "Avrupa Yakası",
    neighborhoods: ["Ferhatpaşa", "Kaleiçi", "Çakıl", "Muratbey", "Subaşı", "Kabakça", "İnceğiz"],
    responseMin: 50,
    intro: "Çatalca merkez ve köy-mahallelerinde 7/24 tesisat hizmeti. Müstakil evler, çiftlikler ve bağ evlerinde su kaçağı, kuyu-hidrofor ve doğalgaz tesisatında uzman ekip.",
    highlights: ["Müstakil ev & çiftlik dış tesisat uzmanlığı", "Kuyu, hidrofor & depo sistemleri", "Geniş kırsal bölgeye planlı ulaşım"],
    localContext: [
      "Çatalca, İstanbul'un kırsal karakteri en güçlü ilçelerinden biridir; müstakil evler, bağ-bahçe yapıları ve çiftlikler ağırlıktadır. Bu yapıda şebeke suyunun yanı sıra kuyu ve depo bağlantılı hidrofor sistemleri, bahçe sulama hatları ve donan dış tesisat en sık karşılaşılan konulardır.",
      "Merkez ve Kaleiçi'ndeki eski yapılarda çürümüş borular ve gizli kaçaklar görülürken, köy-mahallelerdeki müstakil evlerde sıfırdan tesisat döşeme, fosseptik-arıtma bağlantısı ve doğalgaz altyapısı işleri öne çıkar. Geniş bölgeye günlük planlı rotalarla ulaşırız.",
    ],
    commonIssues: [
      { title: "Kuyu & hidrofor sistemleri", detail: "Müstakil ev ve çiftliklerde kuyu pompası, hidrofor ve su deposu sistemlerini kurar, basınç sorunlarını çözeriz." },
      { title: "Kışın donan dış tesisat", detail: "Bağ ve bahçe evlerinde kışın donan dış hatları yeniler, izolasyon ve boşaltma sistemi kurarız." },
      { title: "Köy yapılarında sıfır tesisat & drenaj", detail: "Köy-mahallelerdeki müstakil evlerde sıfırdan tesisat döşeme, fosseptik ve drenaj bağlantısı yaparız." },
    ],
    faq: [
      { q: "Çatalca'daki müstakil eve kuyu-hidrofor sistemi kuruyor musunuz?", a: "Evet, Çatalca merkez ve köy-mahallelerindeki müstakil ev ve çiftliklerde kuyu pompası, hidrofor ve depo sistemleri kurup su basıncı sorunlarını çözüyoruz." },
      { q: "Çatalca'ya ne kadar sürede ulaşıyorsunuz?", a: "Çatalca geniş ve kırsal bir bölge olduğu için acil çağrılara ortalama 50 dakika içinde ulaşıyor, günlük planlı rotalarla 7/24 hizmet veriyoruz." },
    ],
  },
  {
    slug: "silivri",
    name: "Silivri",
    side: "Avrupa Yakası",
    neighborhoods: ["Alibey", "Piri Mehmet Paşa", "Mimar Sinan", "Selimpaşa", "Gümüşyaka", "Değirmenköy", "Kavaklı"],
    responseMin: 50,
    intro: "Silivri sahil ve iç mahallelerinde 7/24 tesisat hizmeti. Yazlık siteler, villalar ve müstakil evlerde su kaçağı, hidrofor ve doğalgaz tesisatında deneyimli ekip.",
    highlights: ["Yazlık site & villa sezonluk servisi", "Sahil hattı tuza dayanıklı tesisat", "Geniş sahil şeridine planlı ulaşım"],
    localContext: [
      "Silivri, uzun Marmara sahil şeridi boyunca sıralanan yazlık siteler, villalar ve Selimpaşa-Gümüşyaka hattındaki konut dokusunu barındıran geniş bir ilçedir. Sahil sitelerinde basınçlandırma, hidrofor ve sıcak su sirkülasyonu sorunları öne çıkarken, yazlık konutlarda sezona bağlı kışa hazırlık ve donma arızaları sıkça yaşanır.",
      "Deniz nemi, sahil yapılarındaki metal tesisatın hızlı yıpranmasına neden olduğu için paslanmaz ve PE-X malzeme tercih ederiz. İç mahallelerdeki müstakil evlerde ise kuyu-hidrofor sistemleri, bahçe sulama hatları ve doğalgaz dönüşüm işleri yoğunlukludur.",
    ],
    commonIssues: [
      { title: "Yazlık konutlarda sezonluk hazırlık", detail: "Sahil sitelerindeki yazlık konutlarda dış tesisat boşaltma, donma önleme ve sezon açılış kontrolü yaparız." },
      { title: "Sahil hattında tuz kaynaklı korozyon", detail: "Deniz nemiyle çürüyen metal boruları paslanmaz ve PE-X malzeme ile yenileriz." },
      { title: "Müstakil evlerde hidrofor & bahçe sistemi", detail: "Selimpaşa ve Değirmenköy'deki müstakil evlerde hidrofor, kuyu pompası ve bahçe sulama hatlarını kurar ve bakarız." },
    ],
    faq: [
      { q: "Silivri'deki yazlık siteye sezonluk tesisat servisi veriyor musunuz?", a: "Evet, Silivri sahil hattındaki yazlık site ve villalarda dış tesisat boşaltma, donma önleme ve sezon açılış kontrolü hizmeti veriyoruz." },
      { q: "Silivri'ye ne kadar sürede ulaşıyorsunuz?", a: "Silivri geniş bir sahil şeridine yayıldığı için acil çağrılara ortalama 50 dakika içinde ulaşıyor, günlük planlı rotalarla 7/24 hizmet veriyoruz." },
    ],
  },
  {
    slug: "sile",
    name: "Şile",
    side: "Anadolu Yakası",
    neighborhoods: ["Çayırbaşı", "Ahmetli", "Kumbaba", "Balibey", "Hacılı", "Ağva", "Doğancılı"],
    responseMin: 60,
    intro: "Şile merkez, Ağva ve köy-mahallelerinde 7/24 tesisat hizmeti. Yazlık evler, pansiyonlar ve müstakil yapılarda su kaçağı, hidrofor ve doğalgaz tesisatında uzman ekip.",
    highlights: ["Yazlık ev & pansiyon sezonluk servisi", "Kuyu, hidrofor & depo sistemleri", "Karadeniz sahil hattı tuza dayanıklı tesisat"],
    localContext: [
      "Şile, Karadeniz kıyısında yazlık evler, pansiyonlar ve küçük oteller ile Ağva çevresindeki turistik konaklama yapılarının yoğun olduğu, kırsal karakterli bir ilçedir. Kumbaba ve Ağva hattındaki konaklama tesislerinde yoğun sezonda yüksek su tüketimi, sıcak su ve gider hattı sorunları öne çıkar.",
      "Köy-mahallelerdeki müstakil evlerde kuyu-hidrofor sistemleri, bahçe sulama ve kışa hazırlık işleri yaygındır. Karadeniz nemi ve tuzlu hava, sahil yapılarındaki metal tesisatı hızla yıprattığı için paslanmaz ve PE-X malzeme tercih ederiz.",
    ],
    commonIssues: [
      { title: "Pansiyon & otelde sezonluk tesisat", detail: "Ağva ve Kumbaba'daki pansiyon ve otellerde yoğun sezon öncesi sıcak su, gider ve basınç sistemlerini bakar ve hazırlarız." },
      { title: "Müstakil evlerde kuyu & hidrofor", detail: "Köy-mahallelerdeki müstakil ve yazlık evlerde kuyu pompası, hidrofor ve depo sistemleri kurar ve bakarız." },
      { title: "Sahil yapılarında tuz kaynaklı korozyon", detail: "Karadeniz nemiyle çürüyen metal boruları paslanmaz ve PE-X malzeme ile yenileriz." },
    ],
    faq: [
      { q: "Ağva'daki pansiyona sezon öncesi tesisat bakımı yapıyor musunuz?", a: "Evet, Ağva ve Kumbaba'daki pansiyon, otel ve konaklama tesislerine sezon öncesi sıcak su, gider hattı ve basınç sistemi bakımı veriyoruz." },
      { q: "Şile'ye ne kadar sürede ulaşıyorsunuz?", a: "Şile şehir merkezine uzak ve kırsal bir bölge olduğu için acil çağrılara ortalama 60 dakika içinde ulaşıyor, günlük planlı rotalarla 7/24 hizmet veriyoruz." },
    ],
  },
  {
    slug: "adalar",
    name: "Adalar",
    side: "Anadolu Yakası",
    neighborhoods: ["Büyükada", "Heybeliada", "Burgazada", "Kınalıada", "Sedef Adası", "Maden", "Nizam"],
    responseMin: 60,
    intro: "Adalar'da (Büyükada, Heybeliada, Burgazada, Kınalıada) 7/24 tesisat hizmeti. Tarihi köşkler, pansiyonlar ve yazlık konutlarda su kaçağı, kombi ve doğalgaz tesisatında deneyimli ekip.",
    highlights: ["Tarihi ahşap köşklerde hasarsız müdahale", "Pansiyon & yazlık konut sezonluk servisi", "Deniz nemine dayanıklı tesisat çözümleri"],
    localContext: [
      "Adalar, motorlu taşıtın sınırlı olduğu, tarihi ahşap köşkler, pansiyonlar ve yazlık konutların ağırlıkta olduğu özel bir ilçedir. Büyükada ve Heybeliada'daki yüzyıllık ahşap yapılarda tesisat müdahalesi büyük özen ister; bu yapılarda mümkün olduğunca kırmadan, hasarsız yöntemlerle çalışırız.",
      "Deniz nemi ve tuzlu hava, ada yapılarındaki metal tesisatı hızla yıprattığından paslanmaz ve PE-X malzeme tercih ederiz. Yoğun yaz sezonunda pansiyon ve yazlık konutlarda sıcak su, basınç ve gider hattı sorunları artar; ada ulaşım koşullarına uygun planlama ile ekibimizi ve malzemeyi önceden hazırlayarak gideriz.",
    ],
    commonIssues: [
      { title: "Tarihi köşklerde hasarsız müdahale", detail: "Büyükada ve Heybeliada'daki ahşap köşklerde duvar ve döşemeyi koruyarak noktasal tespit ve onarım yaparız." },
      { title: "Deniz nemine bağlı korozyon", detail: "Ada yapılarında tuzlu nemle çürüyen metal boruları paslanmaz ve PE-X malzeme ile yenileriz." },
      { title: "Pansiyon & yazlıkta sezonluk tesisat", detail: "Yaz sezonunda pansiyon ve yazlık konutlarda sıcak su, basınç ve gider hattı sistemlerini bakar ve hazırlarız." },
    ],
    faq: [
      { q: "Büyükada'daki tarihi ahşap köşke kırmadan müdahale yapıyor musunuz?", a: "Evet, Büyükada ve Heybeliada'daki tarihi ahşap yapılarda termal kamera ve akustik cihazlarla kırmadan kaçak tespiti yapıyor, yapıya zarar vermeden sadece gereken noktayı açıyoruz." },
      { q: "Adalar'a ne kadar sürede ulaşıyorsunuz?", a: "Adalar'a ulaşım deniz yoluyla olduğu için acil çağrılara ortalama 60 dakika içinde ulaşıyor, ada koşullarına uygun planlama ile 7/24 hizmet veriyoruz." },
    ],
  },
];

export function findDistrict(slug: string) {
  return DISTRICTS.find((d) => d.slug === slug);
}

// Turkish-aware slugifier so mahalle names become clean, ASCII URL slugs.
export function slugifyTr(input: string): string {
  const map: Record<string, string> = {
    ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o",
    ş: "s", Ş: "s", ü: "u", Ü: "u", â: "a", î: "i", û: "u",
  };
  return input
    .replace(/[çÇğĞıİöÖşŞüÜâîû]/g, (ch) => map[ch] ?? ch)
    .toLocaleLowerCase("tr")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type NeighborhoodMatch = {
  district: District;
  neighborhood: string;
  neighborhoodSlug: string;
};

// Every (district, neighborhood) pair flattened — used for routing + sitemap.
export const NEIGHBORHOODS: NeighborhoodMatch[] = DISTRICTS.flatMap((district) =>
  district.neighborhoods.map((neighborhood) => ({
    district,
    neighborhood,
    neighborhoodSlug: slugifyTr(neighborhood),
  })),
);

export function findNeighborhood(
  districtSlug: string,
  neighborhoodSlug: string,
): NeighborhoodMatch | undefined {
  const district = findDistrict(districtSlug);
  if (!district) return undefined;
  const neighborhood = district.neighborhoods.find(
    (n) => slugifyTr(n) === neighborhoodSlug,
  );
  if (!neighborhood) return undefined;
  return { district, neighborhood, neighborhoodSlug };
}
