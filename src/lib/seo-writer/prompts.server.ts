// Server-only prompt builders for each pipeline stage. Turkish output,
// İstanbul-focused, matching the site's SEO strategy. Each returns the
// chat messages for a JSON-mode AI call.
import { SERVICES } from "@/data/services";
import { BLOG_POSTS } from "@/data/blog";
import type { ChatMessage } from "./ai.server";
import type { SeoJob } from "./types";

const BRAND = "Gölge Tesisat (İstanbul tesisat ustası), telefon 0533 896 05 03";
const SERVICE_LIST = SERVICES.map((s) => s.slug).join(", ");

const SYS = `Sen kıdemli bir Türkçe SEO içerik stratejisti ve tesisat sektörü uzmanısın. ${BRAND}.
Tüm çıktılar Türkçe, İstanbul yerel hizmet odaklı ve E-E-A-T uyumlu olmalı.
Sadece geçerli JSON döndür; açıklama, markdown veya kod bloğu ekleme.`;

function j(v: unknown, max = 6000): string {
  const s = JSON.stringify(v ?? null);
  return s.length > max ? s.slice(0, max) + "…" : s;
}

export function analyzePrompt(job: SeoJob): ChatMessage[] {
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Girdi türü: ${job.input_type}. Girdi: """${job.input_value}"""

Bu girdiyi bir SEO uzmanı gibi analiz et ve şu JSON şemasını doldur:
{
 "primaryKeyword": string,
 "secondaryKeywords": string[],
 "longTailKeywords": string[],
 "semanticKeywords": string[],
 "searchIntent": "bilgilendirici|işlemsel|gezinme|ticari",
 "targetAudience": string,
 "searchStage": "farkındalık|değerlendirme|karar",
 "industry": "tesisat",
 "language": "tr",
 "country": "TR",
 "category": string,
 "serviceSlug": "şu listeden EN UYGUN olanı seç: ${SERVICE_LIST}",
 "estimatedDifficulty": number,
 "summary": string
}`,
    },
  ];
}

export function keywordGapPrompt(job: SeoJob): ChatMessage[] {
  const topic = (job.topic_analysis ?? {}) as Record<string, unknown>;
  const serp = (job.serp_db ?? {}) as Record<string, unknown>;
  const competitor = (job.competitor_db ?? {}) as Record<string, unknown>;
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Ana anahtar kelime: ${j(topic.primaryKeyword ?? job.input_value, 200)}
Canlı SERP sonuçları (başlık + açıklama): ${j(serp.results, 3500)}
Rakip sayfa başlıkları (H2/H3) ve SSS'leri: ${j(
        (competitor.pages as Record<string, unknown>[])?.map((p) => ({
          title: p.title,
          headings: p.headings,
          faqs: p.faqs,
        })),
        4000,
      )}

Bu CANLI SERP ve rakip başlıklarını analiz et. Rakiplerin sıralandığı ama bizim
makalemizde mutlaka olması gereken anahtar kelime/alt konu BOŞLUKLARINI çıkar.
Tahmin etme; yalnızca yukarıdaki verilerden türet. JSON döndür:
{
 "primaryGap": string,
 "keywordGaps": [ { "keyword": string, "intent": "bilgilendirici|işlemsel|ticari", "evidence": string, "priority": "yüksek|orta|düşük" } ],
 "questionGaps": string[],
 "relatedKeywords": string[],
 "longTailGaps": string[],
 "subtopicsToCover": string[]
}`,
    },
  ];
}

export function auditPrompt(job: SeoJob): ChatMessage[] {
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Konu analizi: ${j(job.topic_analysis, 2000)}
SERP verisi (üst sonuçlar + ilgili aramalar): ${j(job.serp_db, 2500)}
Rakip sayfa verileri (başlıklar, kelime sayısı, tablolar, SSS): ${j(job.competitor_db, 6000)}

Rakipleri derinlemesine denetle ve şu JSON'u üret:
{
 "contentDepth": { "averageWordCount": number, "recommendedWordCount": number, "notes": string[] },
 "contentGapMatrix": { "missingTopics": string[], "weakSections": string[], "missingFaqs": string[], "missingComparisons": string[], "missingExamples": string[] },
 "serpFeatures": { "featuredSnippetOpportunity": string, "paaOpportunities": string[], "imageOpportunities": string[], "videoOpportunities": string[] },
 "seoWeaknesses": string[],
 "semantic": { "entities": string[], "lsiKeywords": string[], "tfidfTerms": string[], "topicClusters": string[] },
 "userIntent": { "openQuestions": string[], "painPoints": string[], "beginnerNeeds": string[], "advancedNeeds": string[] },
 "statistics": string[],
 "dashboard": [ { "competitor": string, "score": number, "strengths": string[], "weaknesses": string[], "opportunities": string[], "threats": string[] } ]
}`,
    },
  ];
}

export function knowledgePrompt(job: SeoJob): ChatMessage[] {
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Konu: ${j(job.topic_analysis, 1800)}
SERP: ${j(job.serp_db, 1800)}
Rakip denetimi: ${j(job.competitor_db && (job.competitor_db as Record<string, unknown>).audit, 4000)}

Yazım öncesi tek bir yapılandırılmış BİLGİ BANKASI oluştur. Yazar her bölümden önce buradan okuyacak.
JSON:
{
 "facts": string[],
 "definitions": [ { "term": string, "definition": string } ],
 "statistics": string[],
 "entities": string[],
 "userQuestions": string[],
 "expertTips": string[],
 "commonMistakes": string[],
 "tablesToInclude": string[],
 "anglesToWin": string[],
 "references": string[]
}`,
    },
  ];
}

export function outlinePrompt(job: SeoJob): ChatMessage[] {
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Konu: ${j(job.topic_analysis, 1500)}
Bilgi bankası: ${j(job.knowledge_base, 5000)}

Rakipleri geçecek kapsamlı bir SEO taslağı üret. 8-12 ana bölüm hedefle.
JSON:
{
 "h1": string,
 "slug": "kısa-türkçe-slug",
 "intro": "2-3 cümlelik güçlü giriş paragrafı",
 "excerpt": "150 karakterlik özet",
 "sections": [ { "heading": string, "goal": string, "points": string[], "table": boolean, "chart": boolean } ],
 "faqQuestions": string[],
 "checklist": string[],
 "commonMistakes": string[],
 "summary": string,
 "cta": string
}`,
    },
  ];
}

export function sectionPrompt(job: SeoJob, index: number): ChatMessage[] {
  const outline = (job.outline ?? {}) as Record<string, unknown>;
  const sections = (outline.sections as Record<string, unknown>[]) ?? [];
  const sec = sections[index] ?? {};
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Bilgi bankası (her zaman buradan oku, ezberden yazma): ${j(job.knowledge_base, 4500)}
Makale konusu: ${j(job.topic_analysis && (job.topic_analysis as Record<string, unknown>).primaryKeyword, 200)}
Yazılacak bölüm (#${index + 1}): ${j(sec, 1200)}

Bu bölümü özgün, derin ve okunabilir Türkçe ile yaz. Rakipleri kopyalama; benzersiz içgörü, örnek ve İstanbul yerel bağlamı ekle.
JSON:
{
 "heading": string,
 "paragraphs": string[2-4 paragraf],
 "bullets": string[] (uygunsa, yoksa boş),
 "table": ${(sec as Record<string, unknown>).table ? `{ "caption": string, "headers": string[], "rows": string[][] }` : "null"},
 "chart": ${(sec as Record<string, unknown>).chart ? `{ "title": string, "unit": string, "bars": [ { "label": string, "value": number, "note": string } ] }` : "null"}
}`,
    },
  ];
}

export function seoPrompt(job: SeoJob): ChatMessage[] {
  const outline = (job.outline ?? {}) as Record<string, unknown>;
  // candidate internal-link targets: same service hub + a sample of titles
  const topic = (job.topic_analysis ?? {}) as Record<string, unknown>;
  const candidates = BLOG_POSTS.filter((p) => p.serviceSlug === topic.serviceSlug)
    .slice(0, 20)
    .map((p) => ({ slug: p.slug, title: p.title }));
  const fallback = BLOG_POSTS.slice(0, 20).map((p) => ({ slug: p.slug, title: p.title }));
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Konu: ${j(topic, 1200)}
Taslak bölümleri (başlıklar): ${j(((job.draft as Record<string, unknown>)?.sections as Record<string, unknown>[])?.map((s) => s.heading), 1500)}
SSS soruları: ${j(outline.faqQuestions, 800)}
İç link için GERÇEK aday gönderiler (yalnızca bu slug'ları kullan): ${j(candidates.length ? candidates : fallback, 2500)}

Şu JSON'u üret:
{
 "h1": string,
 "seoTitle": "≤44 karakter, anahtar kelime önde",
 "metaDescription": "≤155 karakter, '0533 896 05 03' içersin",
 "slug": "türkçe-slug",
 "faq": [ { "q": string, "a": string } ] (SSS sorularına net cevaplar, 5-8 adet),
 "internalLinks": [ { "slug": "yukarıdaki listeden", "anchor": string } ] (3-6 adet),
 "externalLinks": [ { "url": string, "anchor": string } ] (otoriter kaynaklar),
 "imageRecommendations": [ { "description": string, "altText": string } ],
 "schemaTypes": ["Article","FAQPage","BreadcrumbList"]
}`,
    },
  ];
}

export function qaPrompt(job: SeoJob): ChatMessage[] {
  const draft = (job.draft ?? {}) as Record<string, unknown>;
  return [
    { role: "system", content: SYS },
    {
      role: "user",
      content: `Aşağıdaki makaleyi bir editör gibi denetle.
Giriş: ${j(draft.intro, 800)}
Bölümler: ${j(draft.sections, 6000)}
SSS: ${j(draft.faq, 1500)}
Anahtar kelime: ${j((job.topic_analysis as Record<string, unknown>)?.primaryKeyword, 200)}

JSON döndür:
{
 "scores": { "content": number(0-100), "seo": number, "readability": number, "publishReadiness": number },
 "issues": string[],
 "passedChecks": string[],
 "improvements": string[],
 "eeatNotes": string
}`,
    },
  ];
}
