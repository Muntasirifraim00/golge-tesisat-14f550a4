// Per-service cut-out (transparent) images for list items, keyed by service slug.
// Arrays align by index with the service's includes / highlights / process / priceFactors.
// File names are Turkish target keywords so the images can rank in image search.
import hInc1 from "@/assets/hidrofor/hidrofor-kurulumu-daire-tipi.png";
import hInc2 from "@/assets/hidrofor/hidrofor-montaji-devreye-alma.png";
import hInc3 from "@/assets/hidrofor/hidrofor-genlesme-tanki-basinc-ayari.png";
import hInc4 from "@/assets/hidrofor/hidrofor-motor-ariza-onarimi.png";
import hInc5 from "@/assets/hidrofor/hidrofor-presostat-membran-degisimi.png";
import hHl1 from "@/assets/hidrofor/hidrofor-sessiz-hidrofor-pompasi.png";
import hHl2 from "@/assets/hidrofor/hidrofor-basinc-gostergesi.png";
import hHl3 from "@/assets/hidrofor/hidrofor-garantili-hidrofor-servisi.png";
import hPr1 from "@/assets/hidrofor/hidrofor-su-basinci-olcumu.png";
import hPr2 from "@/assets/hidrofor/hidrofor-baglantisi-titresim-takozu.png";
import hPr3 from "@/assets/hidrofor/hidrofor-presostat-basinc-ayari.png";
import hPr4 from "@/assets/hidrofor/hidrofor-test-dus-basinci.png";
import hPf1 from "@/assets/hidrofor/hidrofor-servis-ekipmani.png";
import hPf2 from "@/assets/hidrofor/hidrofor-bina-tipi-hidrofor-kapasitesi.png";
import hPf3 from "@/assets/hidrofor/hidrofor-yedek-parca.png";
import hPf4 from "@/assets/hidrofor/hidrofor-tesisat-baglantisi.png";
import hPf5 from "@/assets/hidrofor/hidrofor-acil-hidrofor-servisi.png";

import skTermal from "@/assets/su-kacagi/su-kacagi-termal-kamera-ile-su-kacagi-tespiti.png";
import skAkustik from "@/assets/su-kacagi/su-kacagi-akustik-dinleme-cihazi-su-kacagi-bulma.png";
import skBasinc from "@/assets/su-kacagi/su-kacagi-basinc-testi-tesisat-sizinti-kontrolu.png";
import skKirmadan from "@/assets/su-kacagi/su-kacagi-kirmadan-su-kacagi-onarimi.png";
import skTamir from "@/assets/su-kacagi/su-kacagi-tamiri-boru-onarimi.png";
import skSayac from "@/assets/su-kacagi/su-sayaci-kontrolu-kacak-kesfi.png";
import skRapor from "@/assets/su-kacagi/su-kacagi-tespit-raporu-sigorta.png";
import skGaranti from "@/assets/su-kacagi/su-kacagi-garantili-su-kacagi-tespiti.png";
import skNem from "@/assets/su-kacagi/su-kacagi-duvarda-nem-kuf-su-kacagi-belirtisi.png";
import skDuvar from "@/assets/su-kacagi/su-kacagi-duvar-ici-boru-termal-tarama.png";
import skNokta from "@/assets/su-kacagi/su-kacagi-noktasal-su-kacagi-tespiti-zemin.png";
import skHat from "@/assets/su-kacagi/su-kacagi-temiz-su-gider-isitma-hatti-kacagi.png";
import skZemin from "@/assets/su-kacagi/su-kacagi-zemin-alti-su-kacagi-derinlik.png";
import skCihaz from "@/assets/su-kacagi/su-kacagi-tespit-cihazlari.png";
import skMalzeme from "@/assets/su-kacagi/su-kacagi-onarim-malzemeleri.png";
import skEski from "@/assets/su-kacagi/su-kacagi-eski-tesisat-boru-kacagi.png";

import tkSpiral from "@/assets/tikaniklik/tikaniklik-robotik-spiral-makine-gider-acma.png";
import tkJet from "@/assets/tikaniklik/tikaniklik-yuksek-basincli-su-jeti-kanal-acma.png";
import tkGider from "@/assets/tikaniklik/tikaniklik-lavabo-tuvalet-mutfak-gider-acma.png";
import tkKok from "@/assets/tikaniklik/tikaniklik-kok-kirec-tikanikligi-boru.png";
import tkAkis from "@/assets/tikaniklik/tikaniklik-gider-akis-kontrolu-su-akisi.png";
import tkKamera from "@/assets/tikaniklik/tikaniklik-kamera-ile-tikaniklik-neden-tespiti.png";
import tkTemiz from "@/assets/tikaniklik/tikaniklik-temiz-calisma-is-sonrasi-temizlik.png";
import tkFiyat from "@/assets/tikaniklik/tikaniklik-seffaf-fiyat-surpriz-ucret-yok.png";
import tkTespit from "@/assets/tikaniklik/tikaniklik-yeri-nedeni-tespiti.png";
import tkYontem from "@/assets/tikaniklik/tikaniklik-dogru-yontem-secimi-spiral-jet.png";
import tkAcim from "@/assets/tikaniklik/tikaniklik-acma-islemi-spiral.png";
import tkKontrol from "@/assets/tikaniklik/tikaniklik-akis-kontrolu-ve-oneri.png";
import tkAnaHat from "@/assets/tikaniklik/tikaniklik-yeri-ana-hat.png";
import tkEkipman from "@/assets/tikaniklik/tikaniklik-acma-ekipmanlari.png";
import tkNeden from "@/assets/tikaniklik/tikaniklik-yag-kirec-sac-tikaniklik-nedeni.png";
import tkBoru from "@/assets/tikaniklik/tikaniklik-boru-capi-hat-uzunlugu.png";
import tkAcil from "@/assets/tikaniklik/tikaniklik-acil-tikaniklik-servisi-7-24.png";

import kbAriza from "@/assets/kombi/kombi-ariza-tespiti-onarim.png";
import kbBakim from "@/assets/kombi/kombi-yillik-kombi-bakimi-temizlik.png";
import kbMontaj from "@/assets/kombi/kombi-yeni-kombi-montaji.png";
import kbBasinc from "@/assets/kombi/kombi-basinc-esenjor-kontrolu.png";
import kbParca from "@/assets/kombi/kombi-yedek-parca-temini.png";
import kbHata from "@/assets/kombi/kombi-hata-kodu-okuma.png";
import kbKis from "@/assets/kombi/kombi-kis-oncesi-kombi-bakimi.png";
import kbFatura from "@/assets/kombi/kombi-parca-garanti-fatura.png";
import kbKart from "@/assets/kombi/kombi-elektronik-kart-tespiti.png";
import kbPompa from "@/assets/kombi/kombi-pompa-sensor-kontrol.png";
import kbDegisim from "@/assets/kombi/kombi-parca-degisimi.png";
import kbBaca from "@/assets/kombi/kombi-baca-gazi-olcumu.png";
import kbTurler from "@/assets/kombi/kombi-bakim-onarim-montaj.png";
import kbEsenjor from "@/assets/kombi/kombi-kart-esenjor-pompa.png";
import kbMarka from "@/assets/kombi/kombi-marka-model-cesitleri.png";
import kbGaranti from "@/assets/kombi/kombi-garanti-yedek-parca.png";

import ptMakine from "@/assets/petek/petek-kapali-devre-basincli-petek-temizligi.png";
import ptCamur from "@/assets/petek/petek-tesisat-camuru-kirec-tahliyesi.png";
import ptHava from "@/assets/petek/petek-hava-alma-denge-ayari.png";
import ptVana from "@/assets/petek/petek-vana-baglanti-kontrolu.png";
import ptTest from "@/assets/petek/petek-isinma-testi.png";
import ptTesisat from "@/assets/petek/petek-tum-tesisat-petek-temizligi.png";
import ptTasarruf from "@/assets/petek/petek-yakit-tasarrufu-homojen-isinma.png";
import ptApartman from "@/assets/petek/petek-apartman-site-toplu-petek-temizligi.png";
import ptKontrol from "@/assets/petek/petek-tesisat-kontrolu-hazirlik.png";
import ptBaglanti from "@/assets/petek/petek-temizleme-makinesi-baglanti.png";
import ptSayi from "@/assets/petek/petek-dairedeki-petek-sayisi.png";
import ptYogunluk from "@/assets/petek/petek-tesisat-camur-kirec-yogunlugu.png";
import ptKazan from "@/assets/petek/petek-kombi-kazan-tipi-tesisat.png";
import ptVanaDegisim from "@/assets/petek/petek-vana-degisimi.png";

import dgDoseme from "@/assets/dogalgaz/dogalgaz-ic-tesisat-projesi-doseme.png";
import dgCihaz from "@/assets/dogalgaz/dogalgaz-kombi-ocak-sofben-gaz-baglantisi.png";
import dgKacak from "@/assets/dogalgaz/dogalgaz-gaz-kacagi-kontrolu-sizdirmazlik-testi.png";
import dgKolon from "@/assets/dogalgaz/dogalgaz-kolon-sayac-sonrasi-tesisat.png";
import dgBelge from "@/assets/dogalgaz/dogalgaz-standartlara-uygun-montaj-belgelendirme.png";
import dgEkip from "@/assets/dogalgaz/dogalgaz-yetkili-sigortali-dogalgaz-ekibi.png";
import dgAcil from "@/assets/dogalgaz/dogalgaz-gaz-kacagi-acil-mudahale.png";
import dgRapor from "@/assets/dogalgaz/dogalgaz-tesisat-sonrasi-test-raporu.png";
import dgKesif from "@/assets/dogalgaz/dogalgaz-kesif-ve-projelendirme.png";
import dgMetraj from "@/assets/dogalgaz/dogalgaz-tesisat-metraji-hat-guzergahi.png";
import dgMalzeme from "@/assets/dogalgaz/dogalgaz-tesisat-malzeme-kalitesi.png";
import dgDaire from "@/assets/dogalgaz/dogalgaz-daire-is-yeri-dogalgaz-tesisati.png";

import knRobot from "@/assets/kanal/kanal-robot-kamera-boru-ici-goruntuleme.png";
import knKirik from "@/assets/kanal/kanal-tikaniklik-kirik-noktasi-tespiti.png";
import knKok from "@/assets/kanal/kanal-kok-sarmasi-cokme-analizi.png";
import knGuzergah from "@/assets/kanal/kanal-hat-guzergahi-derinlik-belirleme.png";
import knRapor from "@/assets/kanal/kanal-goruntu-kaydi-raporlama.png";
import knTeshis from "@/assets/kanal/kanal-tekrarlayan-tikaniklik-kesin-teshis.png";
import knKazi from "@/assets/kanal/kanal-kazi-oncesi-nokta-tespiti.png";
import knRogar from "@/assets/kanal/kanal-rogar-erisim-hat-tespiti.png";
import knVerme from "@/assets/kanal/kanal-robot-kamera-hatta-verme.png";
import knUzunluk from "@/assets/kanal/kanal-hat-uzunlugu-boru-capi.png";
import knEkHizmet from "@/assets/tikaniklik/tikaniklik-acma-islemi-spiral.png";

import kzJet from "@/assets/kanalizasyon/kanalizasyon-yuksek-basincli-kanal-jeti-ana-hat-acma.png";
import kzRogar from "@/assets/kanalizasyon/kanalizasyon-rogar-kolon-pis-su-hatti-temizligi.png";
import kzTahliye from "@/assets/kanalizasyon/kanalizasyon-kanal-kok-yag-kirec-tahliyesi.png";
import kzApartman from "@/assets/kanalizasyon/kanalizasyon-apartman-site-toplu-kanal-temizligi.png";
import kzVerme from "@/assets/kanalizasyon/kanalizasyon-kanal-jeti-hatta-verme-basinc.png";
import kzTemizlik from "@/assets/kanalizasyon/kanalizasyon-kanal-tahliye-boru-temizligi.png";

import tvKlozet from "@/assets/tuvalet/tuvalet-klozet-alaturka-tuvalet-tikaniklik-acma.png";
import tvCisim from "@/assets/tuvalet/tuvalet-yabanci-cisim-cikarma.png";
import tvSifon from "@/assets/tuvalet/tuvalet-sifon-gider-baglanti-kontrolu.png";
import tvHasarsiz from "@/assets/tuvalet/tuvalet-klozet-sokmeden-hasarsiz-mudahale.png";
import tvHijyen from "@/assets/tuvalet/tuvalet-hijyenik-temiz-calisma.png";
import tvSokme from "@/assets/tuvalet/tuvalet-klozet-sokme-islemi.png";

import mtEvye from "@/assets/mutfak/mutfak-evye-lavabo-gider-acma.png";
import mtYer from "@/assets/mutfak/mutfak-yer-gideri-sifon-tikanikligi.png";
import mtYag from "@/assets/mutfak/mutfak-yag-kirec-sac-tablakasi-tahliye.png";
import mtSifon from "@/assets/mutfak/mutfak-sifon-baglanti-contasi-kontrolu.png";
import mtHasarsiz from "@/assets/mutfak/mutfak-boru-sifona-zarar-vermeden-mudahale.png";
import mtKalici from "@/assets/mutfak/mutfak-tekrarlayan-tikaniklik-kalici-cozum.png";
import dsKlozet from "@/assets/dusakabin/dusakabin-klozet-montaji-gider-borusu-baglantisi.png";
import dsTamir from "@/assets/dusakabin/dusakabin-klozet-tamiri-ic-takim-rezervuar.png";
import dsLavabo from "@/assets/dusakabin/dusakabin-lavabo-evye-hilton-montaji.png";
import dsDusakabin from "@/assets/dusakabin/dusakabin-montaji-cam-profil-kurulum.png";
import dsDusTamir from "@/assets/dusakabin/dusakabin-tamiri-teker-conta-miknatis.png";
import dsGomme from "@/assets/dusakabin/dusakabin-gomme-rezervuar-asma-klozet-montaji.png";
import dsSilikon from "@/assets/dusakabin/dusakabin-silikon-conta-sizdirmazlik-isciligi.png";
import dsKesif from "@/assets/dusakabin/dusakabin-ucretsiz-kesif-olcu-alma.png";
import dsSokum from "@/assets/dusakabin/dusakabin-eski-urun-sokumu-hazirlik.png";
import dsMontaj from "@/assets/dusakabin/dusakabin-montaj-terazi-sizdirmazlik.png";
import dsTest from "@/assets/dusakabin/dusakabin-su-testi-teslim-kontrol.png";
import kmYogusmali from "@/assets/kombi-montaj/kombi-montaj-yogusmali-kombi-montaji-kurulum.png";
import kmSokum from "@/assets/kombi-montaj/kombi-montaj-eski-kombi-sokumu-degisim.png";
import kmBacaGaz from "@/assets/kombi-montaj/kombi-montaj-baca-gaz-su-hatti-baglantisi.png";
import kmGenlesme from "@/assets/kombi-montaj/kombi-montaj-genlesme-tanki-basinc-ayari.png";
import kmDevreye from "@/assets/kombi-montaj/kombi-devreye-alma-ilk-calistirma.png";
import kmKondens from "@/assets/kombi-montaj/kombi-montaj-yogusma-suyu-kondens-tahliye-baglantisi.png";
import kmKesif from "@/assets/kombi-montaj/kombi-montaj-kesif-yer-tespiti.png";
import kmSabitleme from "@/assets/kombi-montaj/kombi-sabitleme-baglanti-montaj.png";
import msBatarya from "@/assets/musluk/musluk-mutfak-banyo-lavabo-batarya-degisimi.png";
import msDamlayan from "@/assets/musluk/musluk-damlayan-musluk-batarya-tamiri.png";
import msKartus from "@/assets/musluk/musluk-kartus-conta-perlator-degisimi.png";
import msAnkastre from "@/assets/musluk/musluk-ankastre-gomme-batarya-montaji.png";
import msHortum from "@/assets/musluk/musluk-su-giris-hortumu-ara-musluk-yenileme.png";
import msTasarruf from "@/assets/musluk/musluk-damlama-cozumu-su-faturasi-tasarruf.png";
import msSokum from "@/assets/musluk/musluk-su-girisi-kapatma-eski-batarya-sokum.png";
import msConta from "@/assets/musluk/musluk-baglanti-conta-kontrolu.png";
import msMontaj from "@/assets/musluk/musluk-yeni-batarya-montaji-sizdirmazlik.png";
import msTest from "@/assets/musluk/musluk-su-testi-teslim-akis-kontrol.png";
import dsMarka from "@/assets/dusakabin/dusakabin-marka-bagimsiz-vitrifiye-montaj.png";
import dsGaranti from "@/assets/dusakabin/dusakabin-iki-yil-iscilik-garantisi.png";

export type ServiceItemImages = {
  includes: string[];
  highlights: string[];
  process: string[];
  priceFactors: string[];
};

export const SERVICE_ITEM_IMAGES: Record<string, ServiceItemImages> = {
  "hidrofor-kurulumu": {
    includes: [hInc1, hInc2, hInc3, hInc4, hInc5],
    highlights: [hHl1, hHl2, hHl3],
    process: [hPr1, hPr2, hPr3, hPr4],
    priceFactors: [hPf1, hPf2, hPf3, hPf4, hPf5],
  },
  "su-kacagi-tespiti": {
    includes: [skTermal, skAkustik, skBasinc, skKirmadan, skTamir],
    highlights: [skSayac, skRapor, skGaranti],
    process: [skNem, skDuvar, skNokta, skTamir],
    priceFactors: [skHat, skZemin, skCihaz, skMalzeme, skEski],
  },
  "tikaniklik-acma": {
    includes: [tkSpiral, tkJet, tkGider, tkKok, tkAkis],
    highlights: [tkKamera, tkTemiz, tkFiyat],
    process: [tkTespit, tkYontem, tkAcim, tkKontrol],
    priceFactors: [tkAnaHat, tkEkipman, tkNeden, tkBoru, tkAcil],
  },
  "kombi-servisi": {
    includes: [kbAriza, kbBakim, kbMontaj, kbBasinc, kbParca],
    highlights: [kbHata, kbKis, kbFatura],
    process: [kbKart, kbPompa, kbDegisim, kbBaca],
    priceFactors: [kbTurler, kbEsenjor, kbMarka, kbBaca, kbGaranti],
  },
  "petek-temizligi": {
    includes: [ptMakine, ptCamur, ptHava, ptVana, ptTest],
    highlights: [ptTesisat, ptTasarruf, ptApartman],
    process: [ptKontrol, ptBaglanti, ptCamur, ptHava],
    priceFactors: [ptSayi, ptYogunluk, ptKazan, ptVanaDegisim, ptApartman],
  },
  "dogalgaz-tesisati": {
    includes: [dgDoseme, dgCihaz, dgKacak, dgKolon, dgBelge],
    highlights: [dgEkip, dgAcil, dgRapor],
    process: [dgKesif, dgDoseme, dgCihaz, dgRapor],
    priceFactors: [dgMetraj, dgCihaz, dgKolon, dgMalzeme, dgDaire],
  },
  "kanal-goruntuleme": {
    includes: [knRobot, knKirik, knKok, knGuzergah, knRapor],
    highlights: [knTeshis, knKazi, knRapor],
    process: [knRogar, knVerme, knKirik, knRapor],
    priceFactors: [knUzunluk, knRogar, knGuzergah, knRapor, knEkHizmet],
  },
  "kanalizasyon-acma": {
    includes: [kzJet, kzRogar, tkSpiral, kzTahliye, tkAkis],
    highlights: [kzApartman, knTeshis, tkTemiz],
    process: [knRogar, kzVerme, kzTemizlik, tkKontrol],
    priceFactors: [tkAnaHat, knUzunluk, tkKok, tkJet, kzApartman],
  },
  "tuvalet-tikanikligi-acma": {
    includes: [tvKlozet, tkSpiral, tvCisim, tvSifon, tkAkis],
    highlights: [tvHasarsiz, tvCisim, tvHijyen],
    process: [tkTespit, tkYontem, tkAcim, tkKontrol],
    priceFactors: [tvCisim, tkJet, tvSokme, knUzunluk, tkAcil],
  },
  "mutfak-gider-acma": {
    includes: [mtEvye, mtYer, tkSpiral, mtYag, mtSifon],
    highlights: [mtHasarsiz, mtKalici, tkTemiz],
    process: [tkTespit, tkYontem, tkAcim, tkKontrol],
    priceFactors: [mtYer, tkNeden, tkEkipman, knUzunluk, tkAcil],
  },
  "dusakabin-vitrifiye-montaji": {
    includes: [dsKlozet, dsTamir, dsLavabo, dsDusakabin, dsDusTamir, dsGomme, dsSilikon],
    highlights: [dsSilikon, dsMarka, dsGaranti],
    process: [dsKesif, dsSokum, dsMontaj, dsTest],
    priceFactors: [dsKlozet, dsSokum, dsSilikon, dsKesif, tkAcil],
  },
  "musluk-batarya-degisimi": {
    includes: [msBatarya, msDamlayan, msKartus, msAnkastre, msHortum],
    highlights: [msTasarruf, dsMarka, dsGaranti],
    process: [msSokum, msConta, msMontaj, msTest],
    priceFactors: [msKartus, msAnkastre, msHortum, msSokum, tkAcil],
  },
  "kombi-montaji": {
    includes: [kmYogusmali, kmSokum, kmBacaGaz, kmGenlesme, kmDevreye],
    highlights: [dgBelge, kmKondens, kbGaranti],
    process: [kmKesif, kmSokum, kmSabitleme, dgKacak],
    priceFactors: [kbTurler, kmBacaGaz, kmKondens, dgMalzeme, tkAcil],
  },
};
