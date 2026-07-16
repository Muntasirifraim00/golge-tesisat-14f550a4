// Server-only research helpers: Firecrawl (Google search + page scrape) and
// Semrush (keyword metrics). Both degrade gracefully when their connector key
// is not configured, so the pipeline keeps running with AI-only fallbacks.

const FIRECRAWL_BASE = "https://api.firecrawl.dev/v2";
const SEMRUSH_GATEWAY = "https://connector-gateway.lovable.dev/semrush";

export type SerpResult = { url: string; title: string; description: string };

export type ScrapedPage = {
  url: string;
  title: string;
  metaDescription: string;
  headings: string[];
  wordCount: number;
  tableCount: number;
  listCount: number;
  faqs: string[];
  internalLinks: number;
  externalLinks: number;
  excerpt: string; // first ~1500 chars of markdown for AI context
};

export function hasFirecrawl(): boolean {
  return !!process.env.FIRECRAWL_API_KEY;
}
export function hasSemrush(): boolean {
  return !!(process.env.SEMRUSH_API_KEY && process.env.LOVABLE_API_KEY);
}

// ---- Firecrawl ----------------------------------------------------------

export async function firecrawlSearch(query: string, limit = 8): Promise<SerpResult[]> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch(`${FIRECRAWL_BASE}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ query, limit, sources: ["web"] }),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: unknown };
    const raw = json.data as { web?: unknown[] } | unknown[] | undefined;
    const rows: unknown[] = Array.isArray(raw) ? raw : (raw?.web ?? []);
    return rows
      .map((r) => {
        const o = r as Record<string, string>;
        return { url: o.url ?? "", title: o.title ?? "", description: o.description ?? "" };
      })
      .filter((r) => r.url);
  } catch {
    return [];
  }
}

function countMatches(text: string, re: RegExp): number {
  const m = text.match(re);
  return m ? m.length : 0;
}

export async function firecrawlScrape(url: string): Promise<ScrapedPage | null> {
  const key = process.env.FIRECRAWL_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${FIRECRAWL_BASE}/scrape`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ url, formats: ["markdown", "links"], onlyMainContent: true }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as {
      data?: {
        markdown?: string;
        links?: string[];
        metadata?: { title?: string; description?: string; sourceURL?: string };
      };
    };
    const d = json.data ?? {};
    const md = d.markdown ?? "";
    const headings = (md.match(/^#{1,4}\s+.+$/gm) ?? [])
      .map((h) => h.replace(/^#{1,4}\s+/, "").trim())
      .slice(0, 40);
    const words = md.split(/\s+/).filter(Boolean).length;
    const links = d.links ?? [];
    let host = "";
    try {
      host = new URL(url).hostname.replace(/^www\./, "");
    } catch {
      /* ignore */
    }
    let internal = 0;
    let external = 0;
    for (const l of links) {
      try {
        const h = new URL(l).hostname.replace(/^www\./, "");
        if (h === host) internal++;
        else external++;
      } catch {
        /* ignore */
      }
    }
    // crude FAQ detection: headings ending with "?"
    const faqs = headings.filter((h) => h.includes("?")).slice(0, 15);
    return {
      url: d.metadata?.sourceURL ?? url,
      title: d.metadata?.title ?? "",
      metaDescription: d.metadata?.description ?? "",
      headings,
      wordCount: words,
      tableCount: countMatches(md, /\n\|[^\n]+\|/g),
      listCount: countMatches(md, /^\s*[-*]\s+/gm),
      faqs,
      internalLinks: internal,
      externalLinks: external,
      excerpt: md.slice(0, 1500),
    };
  } catch {
    return null;
  }
}

// ---- Semrush (via Lovable connector gateway) ----------------------------

type SemrushRow = Record<string, string>;

async function semrushGet(path: string, params: Record<string, string>): Promise<SemrushRow[]> {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const semrushKey = process.env.SEMRUSH_API_KEY;
  if (!lovableKey || !semrushKey) return [];
  try {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${SEMRUSH_GATEWAY}/${path}?${qs}`, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": semrushKey,
        "Allow-Limit-Offset": "true",
      },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: { columnNames?: string[]; rows?: string[][] } };
    const cols = json.data?.columnNames ?? [];
    const rows = json.data?.rows ?? [];
    return rows.map((row) => {
      const obj: SemrushRow = {};
      cols.forEach((c, i) => (obj[c] = row[i]));
      return obj;
    });
  } catch {
    return [];
  }
}

export type KeywordMetric = { phrase: string; volume: number; difficulty: number; cpc?: number };

function toMetric(r: SemrushRow): KeywordMetric {
  return {
    phrase: r["Keyword"] ?? r["Ph"] ?? "",
    volume: Number(r["Search Volume"] ?? r["Nq"] ?? 0) || 0,
    difficulty: Number(r["Keyword Difficulty Index"] ?? r["Kd"] ?? 0) || 0,
    cpc: Number(r["CPC"] ?? r["Cp"] ?? 0) || 0,
  };
}

export async function semrushKeyword(phrase: string, database = "tr") {
  const cols = "Ph,Nq,Cp,Co,Nr,Kd";
  const [overview, related, questions] = await Promise.all([
    semrushGet("keywords/phrase_this", { phrase, database, export_columns: cols, display_limit: "1" }),
    semrushGet("keywords/phrase_related", {
      phrase,
      database,
      export_columns: "Ph,Nq,Kd,Cp",
      display_limit: "15",
    }),
    semrushGet("keywords/phrase_questions", {
      phrase,
      database,
      export_columns: "Ph,Nq,Kd",
      display_limit: "15",
    }),
  ]);
  return {
    primary: overview[0] ? toMetric(overview[0]) : null,
    related: related.map(toMetric).filter((m) => m.phrase),
    questions: questions.map(toMetric).filter((m) => m.phrase),
  };
}
