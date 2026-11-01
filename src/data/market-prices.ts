// Published market reference ranges (NOT Gölge Tesisat prices).
// Source: Armut.com average price ranges ("Ortalama Fiyat"), checked on CHECKED.
// scope "İstanbul" = Istanbul-specific page; "Türkiye" = country-wide (no Istanbul figure published).
// null = no comparable published range found — the page shows "—".
// Update or remove freely; nothing else depends on these numbers.

export const MARKET_CHECKED = "2026-11-01";

export type MarketRange = { min: number; max: number; scope: "İstanbul" | "Türkiye"; src: string; label: string };

export const MARKET_PRICES: Record<string, MarketRange | null> = {
  "su-kacagi-tespiti": { min: 400, max: 16000, scope: "Türkiye", src: "https://armut.com/fiyatlari/su-kacagi-tespiti_6471", label: "Su kaçağı tespiti" },
  "tikaniklik-acma": { min: 500, max: 17000, scope: "Türkiye", src: "https://armut.com/fiyatlari/tikaniklik-acma_566", label: "Tıkanıklık açma" },
  "kombi-servisi": { min: 750, max: 2000, scope: "İstanbul", src: "https://armut.com/fiyatlari/istanbul-kombi-bakim_460_34", label: "Kombi bakım" },
  "petek-temizligi": { min: 1500, max: 3000, scope: "İstanbul", src: "https://armut.com/fiyatlari/istanbul-petek-temizleme_1320_34", label: "Petek temizleme" },
  "dogalgaz-tesisati": { min: 5000, max: 185000, scope: "İstanbul", src: "https://armut.com/fiyatlari/istanbul-daire-ici-ve-bina-ici-dogalgaz-tesisati_844_34", label: "Daire içi ve bina içi doğalgaz tesisatı" },
  "kanal-goruntuleme": null,
  "kanalizasyon-acma": null,
  "tuvalet-tikanikligi-acma": { min: 2000, max: 3500, scope: "İstanbul", src: "https://armut.com/istanbul-tuvalet-tikanikligi-acma", label: "Tuvalet tıkanıklığı açma" },
  "mutfak-gider-acma": { min: 1500, max: 6000, scope: "İstanbul", src: "https://armut.com/fiyatlari/istanbul-mutfak-lavabosu-acma_85329_34", label: "Mutfak lavabosu açma" },
  "dusakabin-vitrifiye-montaji": null,
  "musluk-batarya-degisimi": { min: 750, max: 6500, scope: "Türkiye", src: "https://armut.com/fiyatlari/musluk-degistirme_77384", label: "Musluk değiştirme" },
  "hidrofor-kurulumu": null,
  "kombi-montaji": { min: 2500, max: 110000, scope: "Türkiye", src: "https://armut.com/fiyatlari/kombi-montaj_5660", label: "Kombi montaj (cihaz dahil/hariç karışık)" },
  "acil-tesisatci": null,
};

export const tl = (n: number) => "₺" + n.toLocaleString("tr-TR");
