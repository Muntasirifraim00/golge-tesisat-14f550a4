import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

// Meta (Facebook/Instagram) webhook for auto-reply to comments & messages.
//   GET  → verification handshake (hub.challenge)
//   POST → incoming comment/message events
// Configure in Meta App dashboard with:
//   Callback URL: https://<your-domain>/api/public/hooks/meta-webhook
//   Verify token: value of META_WEBHOOK_VERIFY_TOKEN secret
//   App secret  : value of META_APP_SECRET secret (used to verify signatures)

function verifySignature(appSecret: string, signatureHeader: string | null, body: string): boolean {
  if (!signatureHeader) return false;
  const expected = "sha256=" + createHmac("sha256", appSecret).update(body).digest("hex");
  const a = Buffer.from(signatureHeader);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const Route = createFileRoute("/api/public/hooks/meta-webhook")({
  server: {
    handlers: {
      // Verification handshake
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");
        const expected = process.env.META_WEBHOOK_VERIFY_TOKEN ?? "";

        if (mode === "subscribe" && expected && token === expected && challenge) {
          return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
        }
        return new Response("Forbidden", { status: 403 });
      },

      // Event delivery
      POST: async ({ request }) => {
        const body = await request.text();
        const appSecret = process.env.META_APP_SECRET ?? "";

        // When an app secret is configured, signatures MUST be valid.
        if (appSecret) {
          const sig = request.headers.get("x-hub-signature-256");
          if (!verifySignature(appSecret, sig, body)) {
            return new Response("Invalid signature", { status: 401 });
          }
        }

        let payload: unknown;
        try {
          payload = JSON.parse(body);
        } catch {
          return new Response("Bad payload", { status: 400 });
        }

        // Always ack fast; process best-effort and never throw.
        try {
          const { processWebhookPayload } = await import("@/lib/social.server");
          await processWebhookPayload(payload);
        } catch {
          /* swallow — Meta retries on non-200, so we always return 200 */
        }

        return new Response("EVENT_RECEIVED", { status: 200 });
      },
    },
  },
});
