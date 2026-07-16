// Server-only Lovable AI Gateway helpers for the SEO Writing Agent.
// Calls the OpenAI-compatible gateway directly (no SDK) and returns parsed JSON.

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

export const FAST_MODEL = "google/gemini-3-flash-preview";
export const SMART_MODEL = "google/gemini-2.5-pro";

export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function getKey(): string {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("AI yapılandırması eksik (LOVABLE_API_KEY yok).");
  return key;
}

async function rawCall(messages: ChatMessage[], opts: { model?: string; json?: boolean; temperature?: number }) {
  const body: Record<string, unknown> = {
    model: opts.model ?? FAST_MODEL,
    messages,
    temperature: opts.temperature ?? 0.6,
  };
  if (opts.json) body.response_format = { type: "json_object" };

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": getKey(),
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 429) {
    throw new Error("AI hız sınırına ulaşıldı (429). Lütfen birkaç dakika sonra tekrar deneyin.");
  }
  if (res.status === 402) {
    throw new Error("AI kredisi tükendi (402). Workspace ayarlarından kredi ekleyin.");
  }
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`AI gateway hatası ${res.status}: ${txt.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}

/** Plain text completion. */
export async function callAIText(
  messages: ChatMessage[],
  opts: { model?: string; temperature?: number } = {},
): Promise<string> {
  return rawCall(messages, opts);
}

function extractJson(text: string): string {
  let t = text.trim();
  // strip ```json ... ``` fences
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) t = fence[1].trim();
  // grab the outermost { } or [ ]
  const firstObj = t.indexOf("{");
  const firstArr = t.indexOf("[");
  let start = -1;
  if (firstObj === -1) start = firstArr;
  else if (firstArr === -1) start = firstObj;
  else start = Math.min(firstObj, firstArr);
  if (start > 0) t = t.slice(start);
  const lastObj = t.lastIndexOf("}");
  const lastArr = t.lastIndexOf("]");
  const end = Math.max(lastObj, lastArr);
  if (end !== -1 && end < t.length - 1) t = t.slice(0, end + 1);
  return t;
}

/** JSON-mode completion with a forgiving parser. */
export async function callAIJson<T = unknown>(
  messages: ChatMessage[],
  opts: { model?: string; temperature?: number } = {},
): Promise<T> {
  const content = await rawCall(messages, { ...opts, json: true });
  try {
    return JSON.parse(content) as T;
  } catch {
    try {
      return JSON.parse(extractJson(content)) as T;
    } catch (e) {
      throw new Error(
        `AI geçersiz JSON döndürdü: ${(e as Error).message}. İlk 200 karakter: ${content.slice(0, 200)}`,
      );
    }
  }
}
