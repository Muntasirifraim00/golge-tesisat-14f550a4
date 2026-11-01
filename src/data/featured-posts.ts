// Lightweight summary of the homepage's featured blog posts.
// Kept separate from "@/data/blog" so the homepage does not have to load
// the full blog corpus (all post bodies) just to render 6 link cards.
// Generated from the matching posts in src/data/blog.ts.
export interface FeaturedPostSummary {
  slug: string;
  title: string;
  category: string;
  readMin: number;
}

export const FEATURED_POSTS: FeaturedPostSummary[] = [
  {
    "slug": "su-kacagi-nasil-anlasilir",
    "title": "Su Kaçağı Nasıl Anlaşılır? Belirtiler ve İlk Adımlar",
    "category": "Su Kaçağı & Tesisat",
    "readMin": 6
  },
  {
    "slug": "kombi-neden-calismiyor",
    "title": "Kombi Neden Çalışmıyor? 10 Yaygın Neden ve Çözüm Rehberi",
    "category": "Kombi",
    "readMin": 9
  },
  {
    "slug": "tuvalet-tikanikligi-nasil-acilir",
    "title": "Tuvalet Tıkanıklığı Nasıl Açılır? Evde Adım Adım Yöntemler",
    "category": "Tıkanıklık & Gider",
    "readMin": 11
  },
  {
    "slug": "petek-temizligi-nasil-yapilir",
    "title": "Petek Temizliği Nasıl Yapılır? Kalorifer Peteği Temizleme Rehberi",
    "category": "Isıtma & Kombi",
    "readMin": 13
  },
  {
    "slug": "kombi-ariza-kodlari-rehberi",
    "title": "Kombi Arıza Kodları Rehberi: Hangi Kod Ne Anlama Gelir?",
    "category": "Isıtma & Kombi",
    "readMin": 12
  },
  {
    "slug": "musluk-damlatma-nasil-onlenir",
    "title": "Musluk Damlatması Nasıl Önlenir? Nedenleri ve Çözümü",
    "category": "Su Tesisatı",
    "readMin": 5
  }
];
