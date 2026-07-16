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
