import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ScrollText, Info, AlertTriangle, XCircle } from "lucide-react";
import { listSocialLogs, type SocialLog } from "@/lib/social.functions";

export function LogsTab({ notify }: { notify: (kind: "ok" | "err", msg: string) => void }) {
  const fetchLogs = useServerFn(listSocialLogs);
  const [logs, setLogs] = useState<SocialLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLogs(await fetchLogs());
      } catch (e) {
        notify("err", e instanceof Error ? e.message : "Could not load");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold">
        <ScrollText className="h-4 w-4 text-brand-red" /> Automation Log
      </div>

      {loading && <div className="h-40 animate-pulse rounded-2xl border border-border/60 bg-card/50" />}

      {!loading && logs.length === 0 && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
          No records yet.
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-border/60">
        {logs.map((l) => (
          <div key={l.id} className="flex items-start gap-3 border-b border-border/40 bg-card/30 px-4 py-3 last:border-0">
            <LevelIcon level={l.level} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l.action}</span>
                <span className="text-[10px] text-muted-foreground">{new Date(l.created_at).toLocaleString("tr-TR")}</span>
              </div>
              <p className="mt-0.5 text-sm">{l.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LevelIcon({ level }: { level: string }) {
  if (level === "error") return <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />;
  if (level === "warn") return <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />;
  return <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />;
}
