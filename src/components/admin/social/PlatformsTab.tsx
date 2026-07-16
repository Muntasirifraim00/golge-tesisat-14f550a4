import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Loader2,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Twitter,
  Linkedin,
  Music2,
  RefreshCw,
} from "lucide-react";
import { getPublishProviders, type ProviderStatus } from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const ICONS: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  google_business: MapPin,
  x: Twitter,
  linkedin: Linkedin,
  tiktok: Music2,
};

export function PlatformsTab({ notify }: { notify: Notify }) {
  const fetchProviders = useServerFn(getPublishProviders);
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      setProviders(await fetchProviders());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const live = providers.filter((p) => p.kind === "live");
  const soon = providers.filter((p) => p.kind === "soon");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold">Publishing Platforms</h3>
        <button
          onClick={load}
          className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-border/60 px-3 py-1.5 text-xs hover:border-brand-red/40"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      <p className="text-sm text-muted-foreground">
        A single idea generates platform-specific text for each platform. Active platforms are
        published automatically; new platforms become active as connections are added.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Active
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {live.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Coming Soon
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {soon.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProviderCard({ provider }: { provider: ProviderStatus }) {
  const Icon = ICONS[provider.id] ?? Facebook;
  const ready = provider.configured;
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border p-4 ${
        ready ? "border-emerald-500/30 bg-emerald-500/5" : "border-border/60 bg-card/40"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          ready ? "bg-emerald-500/15 text-emerald-500" : "bg-muted/60 text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{provider.label}</span>
          {provider.kind === "soon" ? (
            <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">
              Coming Soon
            </span>
          ) : ready ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-500">
              <CheckCircle2 className="h-3 w-3" /> Connected
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-500">
              <Clock className="h-3 w-3" /> Setup required
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{provider.detail}</p>
      </div>
    </div>
  );
}
