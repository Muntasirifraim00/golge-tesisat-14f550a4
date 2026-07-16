import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Activity, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.navigate({ to: "/admin" });
    } catch (e2) {
      const msg = e2 instanceof Error ? e2.message : "Login failed";
      setErr(msg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-red/15 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-brand-green/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <form
        onSubmit={handleLogin}
        className="relative w-full max-w-sm space-y-5 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        {/* gradient top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-red to-transparent" />

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-brand-red blur-md opacity-60" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-brand-red to-brand-red/70 text-brand-red-foreground">
              <Activity className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-tight">Shadow Admin</h1>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Secure access · v1
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card/40 px-3 py-2 text-xs text-muted-foreground">
          <ShieldCheck className="mr-1.5 inline h-3.5 w-3.5 text-brand-green" />
          Authorized login — please enter your credentials.
        </div>


        <label className="block">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-brand-red/60 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </label>

        <label className="block">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-brand-red/60 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </label>

        {err && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive">
            {err}
          </div>
        )}

        <button
          type="submit"
          disabled={busy}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-red to-brand-red/80 py-3 text-sm font-bold uppercase tracking-widest text-brand-red-foreground shadow-lg shadow-brand-red/20 transition hover:from-brand-red hover:to-brand-red disabled:opacity-50"
        >
          {busy ? "Signing in…" : "Enter Command Center"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </button>
      </form>
    </div>
  );
}
