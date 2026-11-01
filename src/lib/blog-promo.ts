import type { BlogPost } from "@/data/blog";
import type { Service } from "@/data/services";

export type PromoIntent = "emergency" | "price" | "diy" | "info";

export type Promo = {
  intent: PromoIntent;
  serviceSlug: string;
  serviceName: string;
  image: string;
  badge: string;
  headline: string;
  sub: string;
  primary: "call" | "whatsapp";
  link: { to: "/hizmet/$slug" | "/hizmet/$slug/fiyat" | "/acil-tesisatci"; slug?: string; label: string };
};

type Copy = { emergency: string; price: string; diy: string; info: string };

const COPY: Record<string, Copy> = {
  "su-kacagi-tespiti": {
    emergency: "Su mu sızıyor? Kırmadan hemen bulalım",
    price: "Su kaçağı tespitinde net fiyat, gizli ücret yok",
    diy: "Duvarı kırmayın — kaçağı cihazla bulalım",
    info: "Kaçak mı var? Kırmadan, termal kamerayla bulalım",
  },
  "tikaniklik-acma": {
    emergency: "Gider taştı mı? 7/24 hemen açıyoruz",
    price: "Tıkanıklık açmada net fiyat, ücretsiz keşif",
    diy: "Kimyasalla uğraşmayın — robotla temiz açalım",
    info: "Tıkanıklığı kalıcı açalım, tekrar etmesin",
  },
  "kombi-servisi": {
    emergency: "Kombi durdu mu? Bugün çalıştıralım",
    price: "Kombi servisinde şeffaf fiyat, parça garantili",
    diy: "Hata kodu ile uğraşmayın — usta gelsin",
    info: "Kombiniz verimli çalışsın, faturanız düşsün",
  },
  "petek-temizligi": {
    emergency: "Petekler ısıtmıyor mu? Hemen bakalım",
    price: "Petek temizliğinde net fiyat, makineli yıkama",
    diy: "Sökmeden, makineyle tüm petekleri temizleyelim",
    info: "Petekler tam ısınsın, doğalgaz %30'a kadar düşsün",
  },
  "dogalgaz-tesisati": {
    emergency: "Gaz kokusu mu var? Hemen kontrol edelim",
    price: "Doğalgaz tesisatında net teklif, onaylı işçilik",
    diy: "Gaz hattına kendiniz dokunmayın — biz gelelim",
    info: "Güvenli, onaylı doğalgaz tesisatı",
  },
  "kanal-goruntuleme": {
    emergency: "Sorun boru içinde mi? Kamerayla görelim",
    price: "Kamera ile gider kontrolü — net fiyat",
    diy: "Tahmin etmeyin — borunun içini kamerayla görün",
    info: "Kameralı gider kontrolü, raporlu sonuç",
  },
  "kanalizasyon-acma": {
    emergency: "Kanalizasyon taştı mı? 7/24 açıyoruz",
    price: "Kanalizasyon açmada net fiyat, jet makinesi",
    diy: "Kanalizasyona kendiniz girmeyin — jetle açalım",
    info: "Kanalizasyonu basınçlı jetle kalıcı açalım",
  },
  "tuvalet-tikanikligi-acma": {
    emergency: "Tuvalet mi tıkandı? Hemen açalım",
    price: "Tuvalet açmada net fiyat, kırmadan",
    diy: "Pompayla uğraşmayın — klozeti kırmadan açalım",
    info: "Tuvalet tıkanıklığını kırmadan açalım",
  },
};

const FALLBACK: Copy = {
  emergency: "Acil tesisat sorunu mu? 7/24 kapınızdayız",
  price: "Ücretsiz keşif + net fiyat, sürpriz yok",
  diy: "Uğraşmayın, ustamız halletsin",
  info: "İstanbul'un 7/24 açık tesisat ustası",
};

const BADGE: Record<PromoIntent, string> = {
  emergency: "7/24 Acil",
  price: "Ücretsiz Keşif",
  diy: "Usta Gelsin",
  info: "7/24 Açık",
};

export function detectIntent(p: BlogPost): PromoIntent {
  const t = `${p.slug} ${p.title} ${p.category}`.toLocaleLowerCase("tr-TR");
  if (/acil|patlad|su bast|taşt|tast|gaz koku|kaçıyor|akıyor|ne yapmal/.test(t)) return "emergency";
  if (/fiyat|ücret|ucret|maliyet|kaç para|kac para|tl/.test(t)) return "price";
  if (/nasıl|nasil|rehber|evde|adım|adim|kendin|yöntem|yontem/.test(t)) return "diy";
  return "info";
}

export function getPromoForPost(p: BlogPost, service: Service | undefined): Promo {
  const intent = detectIntent(p);
  const copy = (service && COPY[service.slug]) || FALLBACK;
  const slug = service?.slug ?? "acil-tesisatci";
  const min = service?.responseMin ?? 45;
  const sub =
    intent === "price"
      ? "Yerinde ücretsiz keşif, işe başlamadan net fiyat."
      : intent === "diy"
        ? `Fotoğraf atın, ustamız ${min} dk içinde yol çıksın.`
        : `Ortalama ${min} dk'da kapınızda · garantili işçilik`;
  const link: Promo["link"] = service
    ? intent === "price"
      ? { to: "/hizmet/$slug/fiyat", slug, label: "Fiyatları incele" }
      : { to: "/hizmet/$slug", slug, label: "Hizmeti incele" }
    : { to: "/acil-tesisatci", label: "Hizmeti incele" };
  return {
    intent,
    serviceSlug: slug,
    serviceName: service?.name ?? "Acil Tesisatçı",
    image: `/og/${slug}.jpg`,
    badge: BADGE[intent],
    headline: copy[intent],
    sub,
    primary: intent === "diy" ? "whatsapp" : "call",
    link,
  };
}
