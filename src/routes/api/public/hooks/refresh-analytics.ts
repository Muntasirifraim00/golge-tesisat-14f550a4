import { createFileRoute } from "@tanstack/react-router";

// Scheduled analytics refresh. Called by pg_cron with the project anon key
// in the `apikey` header (same lightweight auth as publish-social).
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
    const { refreshAllAnalytics } = await import("@/lib/social.server");
    const result = await refreshAllAnalytics();
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

export const Route = createFileRoute("/api/public/hooks/refresh-analytics")({
  server: {
    handlers: {
      POST: async ({ request }) => handle(request),
      GET: async ({ request }) => handle(request),
    },
  },
});
