import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type BrandSettings = {
  id: string;
  business_name: string;
  tone: string;
  primary_color: string;
  phone: string;
  logo_path: string | null;
  logo_url?: string | null;
  default_hashtags: string;
  language: string;
  best_times: string[];
  created_at: string;
  updated_at: string;
};

const BUCKET = "social-media";

async function assertAdmin(context: unknown): Promise<void> {
  const { userId, supabase } = context as {
    userId: string;
    supabase: { rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown }> };
  };
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (data !== true) throw new Response("Forbidden", { status: 403 });
}

/** Read the single brand-settings row (creates a default one if missing). */
export const getBrandSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<BrandSettings> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let { data } = await supabaseAdmin
      .from("brand_settings")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!data) {
      const { data: created, error } = await supabaseAdmin
        .from("brand_settings")
        .insert({ business_name: "Gölge Tesisat" } as never)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      data = created;
    }

    const row = data as BrandSettings;
    let logo_url: string | null = null;
    if (row.logo_path) {
      const { data: signed } = await supabaseAdmin.storage
        .from(BUCKET)
        .createSignedUrl(row.logo_path, 60 * 60 * 6);
      logo_url = signed?.signedUrl ?? null;
    }
    return { ...row, logo_url };
  });

/** Update editable brand-settings fields. */
export const saveBrandSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (data: {
      id: string;
      business_name?: string;
      tone?: string;
      primary_color?: string;
      phone?: string;
      default_hashtags?: string;
      language?: string;
      best_times?: string[];
    }) => {
      if (!data?.id) throw new Error("id gerekli");
      return data;
    },
  )
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (typeof data.business_name === "string") patch.business_name = data.business_name.slice(0, 120);
    if (typeof data.tone === "string") patch.tone = data.tone.slice(0, 400);
    if (typeof data.primary_color === "string") patch.primary_color = data.primary_color.slice(0, 32);
    if (typeof data.phone === "string") patch.phone = data.phone.slice(0, 40);
    if (typeof data.default_hashtags === "string") patch.default_hashtags = data.default_hashtags.slice(0, 400);
    if (typeof data.language === "string") patch.language = data.language.slice(0, 8);
    if (Array.isArray(data.best_times))
      patch.best_times = data.best_times.filter((t) => /^\d{2}:\d{2}$/.test(t)).slice(0, 12);

    const { error } = await supabaseAdmin
      .from("brand_settings")
      .update(patch as never)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
