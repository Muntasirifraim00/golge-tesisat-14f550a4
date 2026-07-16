import { createFileRoute } from "@tanstack/react-router";

// Scheduled weekly keyword-rank snapshot (Phase 9 — measurement).
// Called by pg_cron with the project anon key in the `apikey` header
// (same lightweight auth as refresh-analytics / publish-social).
// Captures one keyword_snapshots row per ledger keyword so the admin
// keyword tracker can chart position/coverage history over time.
async function handle(request: Request): Promise<Response> {
  const apikey = request.headers.get("apikey") ?? "";
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY ?? "";
  if (!expected || apikey !== expected) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { runKeywordSnapshot } = await import("@/lib/keyword-snapshot.server");
    const result = await runKeywordSnapshot();
    return new Response(JSON.stringify({ ok: true, ...result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const Route = createFileRoute("/api/public/hooks/keyword-snapshot")({
  server: {
    handlers: {
      POST: async ({ request }) => handle(request),
      GET: async ({ request }) => handle(request),
    },
  },
});
