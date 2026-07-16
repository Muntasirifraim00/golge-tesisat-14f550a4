import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminReview = {
  id: string;
  name: string;
  district_slug: string | null;
  district_name: string | null;
  service_slug: string | null;
  rating: number;
  body: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

type AuthedContext = {
  userId: string;
  supabase: {
    from: (t: string) => {
      select: (c: string) => {
        eq: (k: string, v: string) => { eq: (k: string, v: string) => { maybeSingle: () => Promise<{ data: unknown }> } };
      };
    };
  };
};

async function assertAdmin(context: unknown): Promise<void> {
  const { userId, supabase } = context as AuthedContext;
  const { data } = await supabase.from("app_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!data) throw new Response("Forbidden", { status: 403 });
}

export const listAdminReviews = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminReview[]> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .select("id, name, district_slug, district_name, service_slug, rating, body, status, created_at")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw new Error(error.message);
    return (data ?? []) as AdminReview[];
  });

export const moderateReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; status: "approved" | "rejected" | "pending" }) => {
    if (!data?.id || !["approved", "rejected", "pending"].includes(data.status)) {
      throw new Error("Invalid input");
    }
    return data;
  })
  .handler(async ({ context, data }): Promise<{ ok: true }> => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("reviews").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
