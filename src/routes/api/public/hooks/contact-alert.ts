import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const BodySchema = z.object({
  type: z.enum(["call", "whatsapp"]),
  path: z.string().max(500).optional(),
  label: z.string().max(200).optional(),
  country: z.string().max(120).optional(),
  userAgent: z.string().max(500).optional(),
});

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/public/hooks/contact-alert")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const lovableApiKey = process.env.LOVABLE_API_KEY;
        const resendApiKey = process.env.RESEND_API_KEY;
        const alertEmail = process.env.ALERT_EMAIL;

        // Yapılandırma eksikse siteyi asla bozma: sessizce başarılı dön,
        // sadece sunucu günlüğüne not düş (e-posta uyarısı atlanır).
        if (!lovableApiKey || !resendApiKey) {
          console.warn("contact-alert: missing gateway credentials — alert skipped");
          return Response.json({ ok: true, skipped: "not_configured" });
        }
        if (!alertEmail) {
          console.warn("contact-alert: ALERT_EMAIL not set — alert skipped");
          return Response.json({ ok: true, skipped: "no_recipient" });
        }

        let parsed: z.infer<typeof BodySchema>;
        try {
          parsed = BodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "bad_request" }, { status: 400 });
        }

        const isCall = parsed.type === "call";
        const kindTr = isCall ? "Telefon araması" : "WhatsApp mesajı";
        const emoji = isCall ? "📞" : "💬";
        const when = new Intl.DateTimeFormat("tr-TR", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: "Europe/Istanbul",
        }).format(new Date());

        const rows: Array<[string, string]> = [
          ["Tür", kindTr],
          ["Zaman", when],
          ["Sayfa", parsed.path || "/"],
          ["Kaynak", parsed.label || "-"],
          ["Ülke", parsed.country || "-"],
        ];

        const html = `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;padding:24px">
  <div style="font-size:22px;font-weight:800;color:#0f172a;margin-bottom:4px">${emoji} Yeni ${escapeHtml(
          kindTr,
        )}</div>
  <p style="color:#475569;font-size:14px;margin:0 0 16px">
    Web sitenizde biri iletişim için tıkladı.
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([k, v]) => `<tr>
      <td style="padding:8px 0;color:#64748b;width:120px;vertical-align:top">${escapeHtml(k)}</td>
      <td style="padding:8px 0;color:#0f172a;font-weight:600">${escapeHtml(v)}</td>
    </tr>`,
      )
      .join("")}
  </table>
  <p style="color:#94a3b8;font-size:12px;margin-top:20px">
    Gölge Tesisat — otomatik bildirim
  </p>
</div>`.trim();

        try {
          const res = await fetch(`${GATEWAY_URL}/emails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${lovableApiKey}`,
              "X-Connection-Api-Key": resendApiKey,
            },
            body: JSON.stringify({
              from: process.env.ALERT_FROM || "Gölge Tesisat <onboarding@resend.dev>",
              to: [alertEmail],
              subject: `${emoji} Yeni ${kindTr} — Gölge Tesisat`,
              html,
            }),
          });

          if (!res.ok) {
            const errBody = await res.text();
            console.error(`contact-alert: resend failed [${res.status}]: ${errBody}`);
            return Response.json({ ok: false, error: "send_failed", status: res.status });
          }

          return Response.json({ ok: true });
        } catch (err) {
          console.error("contact-alert: unexpected error", err);
          return Response.json({ ok: false, error: "send_failed" });
        }
      },
    },
  },
});
