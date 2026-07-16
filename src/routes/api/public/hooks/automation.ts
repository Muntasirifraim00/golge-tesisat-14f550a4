import { createFileRoute } from "@tanstack/react-router";

/**
 * Scheduled automation-rules evaluator. Called by pg_cron with the project's
 * publishable key in the `apikey` header. Evaluates all active automation rules
 * (failed publishes, low engagement, negative comments, milestones) and raises
 * alerts / applies actions. Respects the global automation kill-switch.
 */
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
    const { runAutomationRules } = await import("@/lib/social.server");
    const result = await runAutomationRules();
    return new Response(JSON.stringify({ ok: true, ...result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Bilinmeyen hata";
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const Route = createFileRoute("/api/public/hooks/automation")({
  server: {
    handlers: {
      POST: async ({ request }) => handle(request),
      GET: async ({ request }) => handle(request),
    },
  },
});
