import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SITE_URL = "https://golgetesisat.com/";
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

export type ScRow = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

export type SearchConsoleStats = {
  configured: boolean;
  range: { startDate: string; endDate: string };
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  byDate: ScRow[];
  topQueries: ScRow[];
  topPages: ScRow[];
};

function isoDaysAgo(days: number): string {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export const getSearchConsoleStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SearchConsoleStats> => {
    // Authorize: caller must be an admin.
    const { userId, supabase } = context as unknown as {
      userId: string;
      supabase: {
        from: (t: string) => {
          select: (c: string) => {
            eq: (
              k: string,
              v: string,
            ) => { eq: (k: string, v: string) => { maybeSingle: () => Promise<{ data: unknown }> } };
          };
        };
      };
    };

    const { data: roleRow } = await supabase
      .from("app_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      throw new Response("Forbidden", { status: 403 });
    }

    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const GSC_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;

    const range = { startDate: isoDaysAgo(28), endDate: isoDaysAgo(1) };

    if (!LOVABLE_API_KEY || !GSC_KEY) {
      return {
        configured: false,
        range,
        totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
        byDate: [],
        topQueries: [],
        topPages: [],
      };
    }

    const endpoint = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
    const headers = {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_KEY,
      "Content-Type": "application/json",
    };

    async function query(body: Record<string, unknown>): Promise<ScRow[]> {
      const res = await fetch(endpoint, { method: "POST", headers, body: JSON.stringify(body) });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Search Console request failed (${res.status}): ${text.slice(0, 300)}`);
      }
      const json = (await res.json()) as { rows?: ScRow[] };
      return json.rows ?? [];
    }

    const [totalsRows, byDate, topQueries, topPages] = await Promise.all([
      query({ ...range, dimensions: [] }),
      query({ ...range, dimensions: ["date"], rowLimit: 60 }),
      query({ ...range, dimensions: ["query"], rowLimit: 25 }),
      query({ ...range, dimensions: ["page"], rowLimit: 25 }),
    ]);

    const t = totalsRows[0];
    return {
      configured: true,
      range,
      totals: {
        clicks: t?.clicks ?? 0,
        impressions: t?.impressions ?? 0,
        ctr: t?.ctr ?? 0,
        position: t?.position ?? 0,
      },
      byDate,
      topQueries,
      topPages,
    };
  });

// ---------------------------------------------------------------------------
// Sitemap submission — tells Google to (re)read https://golgetesisat.com/sitemap.xml
// via the same Lovable Search Console connector. Admin only.
// ---------------------------------------------------------------------------
const SITEMAP_URL = "https://golgetesisat.com/sitemap.xml";

export type SitemapStatus = {
  configured: boolean;
  submitted: boolean;
  message: string;
  lastSubmitted?: string;
  lastDownloaded?: string;
  isPending?: boolean;
  warnings?: number;
  errors?: number;
  urls?: number;
};

type AdminCtx = {
  userId: string;
  supabase: { from: (t: string) => { select: (c: string) => { eq: (k: string, v: string) => { eq: (k: string, v: string) => { maybeSingle: () => Promise<{ data: unknown }> } } } } };
};

async function assertAdmin(context: unknown) {
  const { userId, supabase } = context as AdminCtx;
  const { data } = await supabase.from("app_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!data) throw new Response("Forbidden", { status: 403 });
}

async function sitemapCall(submit: boolean): Promise<SitemapStatus> {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const GSC_KEY = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY;
  if (!LOVABLE_API_KEY || !GSC_KEY) return { configured: false, submitted: false, message: "Search Console bağlantısı yapılandırılmamış." };
  const url = `${GATEWAY}/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`;
  const headers = { Authorization: `Bearer ${LOVABLE_API_KEY}`, "X-Connection-Api-Key": GSC_KEY };
  let submitted = false;
  let message = "";
  if (submit) {
    const put = await fetch(url, { method: "PUT", headers });
    if (put.ok) { submitted = true; message = "Sitemap Google Search Console’a gönderildi."; }
    else {
      const t = (await put.text()).slice(0, 300);
      message = put.status === 403
        ? `Google gönderimi reddetti (403). Bağlantının yalnızca okuma izni olabilir — sitemap’i Search Console’da elle gönderin. ${t}`
        : `Gönderim başarısız (${put.status}): ${t}`;
    }
  }
  const get = await fetch(url, { headers });
  if (get.ok) {
    const j = (await get.json()) as { lastSubmitted?: string; lastDownloaded?: string; isPending?: boolean; warnings?: string; errors?: string; contents?: { submitted?: string }[] };
    return {
      configured: true, submitted, message: message || "Sitemap durumu alındı.",
      lastSubmitted: j.lastSubmitted, lastDownloaded: j.lastDownloaded, isPending: j.isPending,
      warnings: Number(j.warnings ?? 0), errors: Number(j.errors ?? 0),
      urls: (j.contents ?? []).reduce((a, c) => a + Number(c.submitted ?? 0), 0),
    };
  }
  return { configured: true, submitted, message: message || `Sitemap durumu alınamadı (${get.status}).` };
}

export const getSitemapStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SitemapStatus> => { await assertAdmin(context); return sitemapCall(false); });

export const submitSitemap = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SitemapStatus> => { await assertAdmin(context); return sitemapCall(true); });
