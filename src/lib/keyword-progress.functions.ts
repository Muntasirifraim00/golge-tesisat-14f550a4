import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ALL_KEYWORDS, TIER1_KEYWORDS } from "@/data/seo-keywords";

const SITE_URL = "https://golgetesisat.com/";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type KeywordStatus =
  | "page1" // avg position <= 10
  | "page2" // 11–20
  | "page3plus" // 21+
  | "impressions_only" // shows up but position unknown / very low
  | "no_data"; // not seen in GSC at all

export type KeywordTrendPoint = { date: string; position: number | null };

export type KeywordProgress = {
  keyword: string;
  tier: 1 | 2;
  volume: number;
  kdi: number;
  intent: string;
  target: string;
  // current 28-day window
  position: number | null;
  impressions: number;
  clicks: number;
  ctr: number;
  // delta vs previous 28-day window
  prevPosition: number | null;
  positionDelta: number | null; // <0 = improved (rank rose), >0 = dropped
  bestPosition: number | null;
  // matched GSC query (for transparency)
  matchedQuery: string | null;
  status: KeywordStatus;
  trend: KeywordTrendPoint[];
};

export type IndexCoverage = {
  available: boolean;
  submitted: number;
  indexed: number;
  pending: number;
  sitemaps: { path: string; lastSubmitted: string | null; isPending: boolean; errors: number; warnings: number }[];
};

export type KeywordProgressData = {
  configured: boolean;
  range: { startDate: string; endDate: string };
  prevRange: { startDate: string; endDate: string };
  summary: {
    tracked: number;
    ranking: number; // has any GSC data
    page1: number;
    avgPosition: number | null;
    improved: number;
    declined: number;
    totalImpressions: number;
    totalClicks: number;
  };
  keywords: KeywordProgress[];
  coverage: IndexCoverage;
};

type ScRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

/** Turkish-aware normalization for fuzzy keyword↔query matching. */
function normalize(s: string): string {
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Score how well a GSC query matches a target keyword (higher = better). */
function matchScore(keyword: string, query: string): number {
  const k = normalize(keyword);
  const q = normalize(query);
  if (!k || !q) return 0;
  if (k === q) return 100;
  if (q.includes(k)) return 80; // query contains full keyword
  if (k.includes(q)) return 50; // keyword contains query
  // token overlap
  const kt = new Set(k.split(" "));
  const qt = q.split(" ");
  const hits = qt.filter((t) => kt.has(t)).length;
  if (hits >= Math.max(2, kt.size - 1)) return 30 + hits;
  return 0;
}

function statusFor(position: number | null, impressions: number): KeywordStatus {
  if (position == null) return impressions > 0 ? "impressions_only" : "no_data";
  if (position <= 10) return "page1";
  if (position <= 20) return "page2";
  return "page3plus";
}

const TIER1_SET = new Set(TIER1_KEYWORDS.map((k) => k.keyword));

type AuthedContext = {
  userId: string;
  supabase: {
    from: (t: string) => {
      select: (c: string) => {
        eq: (k: string, v: string) => { eq: (k: string, v: string) => { maybeSingle: () => Promise<{ data: unknown }> } };
      };
    };
  };
};

async function assertAdmin(context: unknown): Promise<void> {
  const { userId, supabase } = context as AuthedContext;
  const { data } = await supabase
    .from("app_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (!data) throw new Response("Forbidden", { status: 403 });
}

// ---------------------------------------------------------------------------
// Server function
// ---------------------------------------------------------------------------

export async function computeKeywordProgress(): Promise<KeywordProgressData> {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const GSC_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;

    const range = { startDate: isoDaysAgo(28), endDate: isoDaysAgo(1) };
    const prevRange = { startDate: isoDaysAgo(56), endDate: isoDaysAgo(29) };

    const emptyCoverage: IndexCoverage = {
      available: false,
      submitted: 0,
      indexed: 0,
      pending: 0,
      sitemaps: [],
    };

    if (!LOVABLE_API_KEY || !GSC_KEY) {
      return {
        configured: false,
        range,
        prevRange,
        summary: {
          tracked: ALL_KEYWORDS.length,
          ranking: 0,
          page1: 0,
          avgPosition: null,
          improved: 0,
          declined: 0,
          totalImpressions: 0,
          totalClicks: 0,
        },
        keywords: [],
        coverage: emptyCoverage,
      };
    }

    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_KEY,
      "Content-Type": "application/json",
    };
    const queryEndpoint = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;

    async function scQuery(body: Record<string, unknown>): Promise<ScRow[]> {
      const res = await fetch(queryEndpoint, { method: "POST", headers, body: JSON.stringify(body) });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Search Console request failed (${res.status}): ${text.slice(0, 300)}`);
      }
      const json = (await res.json()) as { rows?: ScRow[] };
      return json.rows ?? [];
    }

    // Phase 1 + 2: current window, previous window, and daily-by-query trend.
    const [curRows, prevRows, dailyRows, coverage] = await Promise.all([
      scQuery({ ...range, dimensions: ["query"], rowLimit: 1000 }),
      scQuery({ ...prevRange, dimensions: ["query"], rowLimit: 1000 }),
      scQuery({ ...range, dimensions: ["query", "date"], rowLimit: 5000 }),
      fetchCoverage(headers).catch(() => emptyCoverage),
    ]);

    // Build per-keyword aggregation by picking the best-matching queries.
    function aggregate(rows: ScRow[], keyword: string): { row: ScRow | null; query: string | null } {
      let best: ScRow | null = null;
      let bestScore = 0;
      let bestImpr = 0;
      for (const r of rows) {
        const q = r.keys[0] ?? "";
        const score = matchScore(keyword, q);
        if (score === 0) continue;
        // prefer higher score, then higher impressions
        if (score > bestScore || (score === bestScore && r.impressions > bestImpr)) {
          best = r;
          bestScore = score;
          bestImpr = r.impressions;
        }
      }
      return { row: best, query: best ? best.keys[0] : null };
    }

    const keywords: KeywordProgress[] = ALL_KEYWORDS.map((k) => {
      const tier: 1 | 2 = TIER1_SET.has(k.keyword) ? 1 : 2;
      const { row: cur, query: matchedQuery } = aggregate(curRows, k.keyword);
      const { row: prev } = aggregate(prevRows, k.keyword);

      const position = cur ? round1(cur.position) : null;
      const prevPosition = prev ? round1(prev.position) : null;
      const positionDelta =
        position != null && prevPosition != null ? round1(position - prevPosition) : null;

      // daily trend for this keyword (best-matching query rows by date)
      const trendMap = new Map<string, { sumPos: number; sumImpr: number }>();
      for (const r of dailyRows) {
        const q = r.keys[0] ?? "";
        const date = r.keys[1] ?? "";
        if (matchScore(k.keyword, q) === 0) continue;
        const cell = trendMap.get(date) ?? { sumPos: 0, sumImpr: 0 };
        cell.sumPos += r.position * Math.max(1, r.impressions);
        cell.sumImpr += Math.max(1, r.impressions);
        trendMap.set(date, cell);
      }
      const trend: KeywordTrendPoint[] = [...trendMap.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, c]) => ({ date, position: round1(c.sumPos / c.sumImpr) }));

      const bestPosition = trend.length
        ? Math.min(...trend.map((t) => t.position ?? Infinity))
        : position;

      return {
        keyword: k.keyword,
        tier,
        volume: k.volume,
        kdi: k.kdi,
        intent: k.intent,
        target: k.target,
        position,
        impressions: cur?.impressions ?? 0,
        clicks: cur?.clicks ?? 0,
        ctr: cur?.ctr ?? 0,
        prevPosition,
        positionDelta,
        bestPosition: bestPosition === Infinity ? null : bestPosition,
        matchedQuery,
        status: statusFor(position, cur?.impressions ?? 0),
        trend,
      };
    });

    // sort: tier asc, then by ascending position (ranked first), then by KDI.
    keywords.sort((a, b) => {
      if (a.tier !== b.tier) return a.tier - b.tier;
      const ap = a.position ?? 999;
      const bp = b.position ?? 999;
      if (ap !== bp) return ap - bp;
      return a.kdi - b.kdi;
    });

    const ranked = keywords.filter((k) => k.position != null);
    const summary = {
      tracked: keywords.length,
      ranking: keywords.filter((k) => k.impressions > 0 || k.position != null).length,
      page1: keywords.filter((k) => k.status === "page1").length,
      avgPosition: ranked.length
        ? round1(ranked.reduce((s, k) => s + (k.position ?? 0), 0) / ranked.length)
        : null,
      improved: keywords.filter((k) => k.positionDelta != null && k.positionDelta < 0).length,
      declined: keywords.filter((k) => k.positionDelta != null && k.positionDelta > 0).length,
      totalImpressions: keywords.reduce((s, k) => s + k.impressions, 0),
      totalClicks: keywords.reduce((s, k) => s + k.clicks, 0),
    };

    return { configured: true, range, prevRange, summary, keywords, coverage };
}

export const getKeywordProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<KeywordProgressData> => {
    await assertAdmin(context);
    return computeKeywordProgress();
  });

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

// Phase 3 — index coverage via the Sitemaps API.
async function fetchCoverage(headers: Record<string, string>): Promise<IndexCoverage> {
  const listEndpoint = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps`;
  const res = await fetch(listEndpoint, { headers });
  if (!res.ok) throw new Error(`Sitemaps list failed (${res.status})`);
  const json = (await res.json()) as {
    sitemap?: {
      path: string;
      lastSubmitted?: string;
      isPending?: boolean;
      errors?: string;
      warnings?: string;
      contents?: { type: string; submitted?: string; indexed?: string }[];
    }[];
  };

  let submitted = 0;
  let indexed = 0;
  const sitemaps = (json.sitemap ?? []).map((sm) => {
    for (const c of sm.contents ?? []) {
      submitted += Number(c.submitted ?? 0);
      indexed += Number(c.indexed ?? 0);
    }
    return {
      path: sm.path.replace(SITE_URL.replace(/\/$/, ""), "") || sm.path,
      lastSubmitted: sm.lastSubmitted ?? null,
      isPending: Boolean(sm.isPending),
      errors: Number(sm.errors ?? 0),
      warnings: Number(sm.warnings ?? 0),
    };
  });

  return {
    available: true,
    submitted,
    indexed,
    pending: Math.max(0, submitted - indexed),
    sitemaps,
  };
}

// ---------------------------------------------------------------------------
// Phase 5 — historical snapshots
// ---------------------------------------------------------------------------

export type SnapshotResult = { captured: number; date: string };

export type KeywordHistoryPoint = {
  date: string;
  avgPosition: number | null;
  page1: number;
  tracked: number;
  indexed: number;
  submitted: number;
};

/** Capture today's progress into keyword_snapshots (one row per keyword, upserted). */
export const captureKeywordSnapshot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SnapshotResult> => {
    await assertAdmin(context);
    try {
      const { runKeywordSnapshot } = await import("@/lib/keyword-snapshot.server");
      return await runKeywordSnapshot();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Snapshot kaydedilemedi.";
      throw new Response(msg, { status: 400 });
    }
  });

/** Daily aggregated history for the trend chart (oldest → newest). */
export const getKeywordHistory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<KeywordHistoryPoint[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("keyword_snapshots")
      .select("captured_on, position, indexed_pages, submitted_pages")
      .order("captured_on", { ascending: true });
    if (error) throw new Error(error.message);

    const byDate = new Map<
      string,
      { sumPos: number; ranked: number; page1: number; tracked: number; indexed: number; submitted: number }
    >();
    for (const r of data ?? []) {
      const d = r.captured_on as string;
      const cell =
        byDate.get(d) ?? { sumPos: 0, ranked: 0, page1: 0, tracked: 0, indexed: 0, submitted: 0 };
      cell.tracked += 1;
      const pos = r.position == null ? null : Number(r.position);
      if (pos != null) {
        cell.sumPos += pos;
        cell.ranked += 1;
        if (pos <= 10) cell.page1 += 1;
      }
      cell.indexed = Math.max(cell.indexed, Number(r.indexed_pages ?? 0));
      cell.submitted = Math.max(cell.submitted, Number(r.submitted_pages ?? 0));
      byDate.set(d, cell);
    }

    return [...byDate.entries()].map(([date, c]) => ({
      date,
      avgPosition: c.ranked ? round1(c.sumPos / c.ranked) : null,
      page1: c.page1,
      tracked: c.tracked,
      indexed: c.indexed,
      submitted: c.submitted,
    }));
  });
