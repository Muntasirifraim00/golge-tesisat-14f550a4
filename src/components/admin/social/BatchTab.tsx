import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Layers, Sparkles, Facebook, Instagram } from "lucide-react";
import { generateContentBatch } from "@/lib/social.functions";

type PlatformOpt = "both" | "facebook" | "instagram";

export function BatchTab({
  notify,
  onDone,
}: {
  notify: (kind: "ok" | "err", msg: string) => void;
  onDone: () => void;
}) {
  const batch = useServerFn(generateContentBatch);

  const [theme, setTheme] = useState("");
  const [platform, setPlatform] = useState<PlatformOpt>("both");
  const [count, setCount] = useState(7);
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true);
    try {
      const res = await batch({ data: { theme, platform, count, autoSchedule } });
      notify("ok", `${res.created} content generated${res.failed ? `, ${res.failed} errors` : ""} 🎉`);
      onDone();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Batch generation failed");
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-2 text-sm font-bold">
        <Layers className="h-4 w-4 text-brand-red" /> Batch Content Generation
      </div>
      <p className="text-sm text-muted-foreground">
        Generate a week or a month's worth of content at once with AI. Optionally, it can be automatically scheduled according to brand hours.
      </p>

      <label className="block space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">Theme (optional)</span>
        <input
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Leave blank to select various plumbing topics"
          className="w-full rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-red/60"
        />
      </label>

      <div className="space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">Platform</span>
        <div className="flex gap-2">
          {(["both", "facebook", "instagram"] as PlatformOpt[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-bold transition ${
                platform === p
                  ? "border-brand-red bg-brand-red/15 text-brand-red"
                  : "border-border/60 bg-background/40 text-muted-foreground hover:border-brand-red/40"
              }`}
            >
              {p === "facebook" && <Facebook className="h-3.5 w-3.5" />}
              {p === "instagram" && <Instagram className="h-3.5 w-3.5" />}
              {{ both: "Both", facebook: "Facebook", instagram: "Instagram" }[p]}
            </button>
          ))}
        </div>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">How many posts? ({count})</span>
        <input
          type="range"
          min={1}
          max={30}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full accent-[var(--brand-red)]"
        />
        <div className="flex justify-between font-mono text-[10px] text-muted-foreground">
          <span>1</span>
          <span>30</span>
        </div>
      </label>

      <label className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background/40 px-3.5 py-3 text-sm">
        <input type="checkbox" checked={autoSchedule} onChange={(e) => setAutoSchedule(e.target.checked)} className="h-4 w-4 accent-[var(--brand-red)]" />
        <span>
          <span className="font-semibold">Auto-schedule</span>
          <span className="block text-xs text-muted-foreground">Distribute according to the best hours in brand settings</span>
        </span>
      </label>

      <button
        onClick={run}
        disabled={running}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-brand-red-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {running ? "Generating… (this may take a while)" : `Generate ${count} Content`}
      </button>
    </div>
  );
}
