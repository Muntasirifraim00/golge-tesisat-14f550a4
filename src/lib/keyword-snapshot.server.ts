import { computeKeywordProgress, type SnapshotResult } from "@/lib/keyword-progress.functions";

/**
 * Compute the current keyword progress from Search Console and persist one row
 * per keyword into `keyword_snapshots` (upsert on captured_on+keyword).
 *
 * Server-only: uses the service-role client. Shared by the admin "capture now"
 * server function and the scheduled weekly cron hook so both write identical
 * rows. Throws if Search Console is not configured.
 */
export async function runKeywordSnapshot(): Promise<SnapshotResult> {
  const data = await computeKeywordProgress();
  if (!data.configured) {
    throw new Error("Search Console yapılandırılmadı.");
  }

  const date = new Date().toISOString().slice(0, 10);
  const rows = data.keywords.map((k) => ({
    captured_on: date,
    keyword: k.keyword,
    tier: k.tier,
    position: k.position,
    impressions: k.impressions,
    clicks: k.clicks,
    ctr: k.ctr,
    indexed_pages: data.coverage.available ? data.coverage.indexed : null,
    submitted_pages: data.coverage.available ? data.coverage.submitted : null,
  }));

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin
    .from("keyword_snapshots")
    .upsert(rows, { onConflict: "captured_on,keyword" });
  if (error) throw new Error(`Snapshot kaydedilemedi: ${error.message}`);

  return { captured: rows.length, date };
}
