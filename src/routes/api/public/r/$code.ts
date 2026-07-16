import { createFileRoute } from "@tanstack/react-router";

// Public short-link redirect. Looks up the tracked link by its short code,
// records the click (count + referrer/user-agent) and 302-redirects the
// visitor to the full UTM destination URL.
async function handle(request: Request, code: string): Promise<Response> {
  const fallback = "https://golgetesisat.com";
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.rpc("register_link_click", {
      _code: code,
      _referrer: request.headers.get("referer") ?? undefined,
      _user_agent: request.headers.get("user-agent") ?? undefined,
    });
    const target = typeof data === "string" && data ? data : null;
    if (error || !target) {
      return Response.redirect(fallback, 302);
    }
    return Response.redirect(target, 302);
  } catch {
    return Response.redirect(fallback, 302);
  }
}

export const Route = createFileRoute("/api/public/r/$code")({
  server: {
    handlers: {
      GET: async ({ request, params }) => handle(request, params.code),
    },
  },
});
