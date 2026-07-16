import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Recycle,
  Loader2,
  Sparkles,
  Wand2,
  Copy,
  Check,
  FileText,
  FilePlus2,
  Facebook,
  Instagram,
  MapPin,
  Twitter,
  Linkedin,
  Music2,
} from "lucide-react";
import {
  repurposeContent,
  createDraftFromRepurpose,
  type RepurposeVariant,
  type SocialPost,
} from "@/lib/social.functions";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const PLATFORMS: {
  id: string;
  label: string;
  icon: typeof Facebook;
  tone: string;
}[] = [
  { id: "facebook", label: "Facebook", icon: Facebook, tone: "text-blue-400" },
  { id: "instagram", label: "Instagram", icon: Instagram, tone: "text-pink-400" },
  { id: "google_business", label: "Google İşletme", icon: MapPin, tone: "text-emerald-400" },
  { id: "x", label: "X (Twitter)", icon: Twitter, tone: "text-foreground" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, tone: "text-sky-400" },
  { id: "tiktok", label: "TikTok", icon: Music2, tone: "text-violet-400" },
];

const PLATFORM_META: Record<string, { label: string; icon: typeof Facebook; tone: string }> =
  Object.fromEntries(PLATFORMS.map((p) => [p.id, { label: p.label, icon: p.icon, tone: p.tone }]));

export function RepurposeTab({
  notify,
  posts,
  onPostCreated,
}: {
  notify: Notify;
  posts: SocialPost[];
  onPostCreated?: () => void;
}) {
  const repurpose = useServerFn(repurposeContent);
  const createDraft = useServerFn(createDraftFromRepurpose);

  const [mode, setMode] = useState<"paste" | "post">("paste");
  const [source, setSource] = useState("");
  const [sourcePostId, setSourcePostId] = useState("");
  const [selected, setSelected] = useState<string[]>(["facebook", "instagram", "google_business"]);
  const [busy, setBusy] = useState(false);
  const [creating, setCreating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const [idea, setIdea] = useState("");
  const [variants, setVariants] = useState<RepurposeVariant[]>([]);

  const sourceablePosts = posts.filter((p) => p.caption || p.idea);

  function togglePlatform(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }

  async function onGenerate() {
    if (mode === "paste" && !source.trim()) {
      notify("err", "Paste some source content first");
      return;
    }
    if (mode === "post" && !sourcePostId) {
      notify("err", "Pick a source post first");
      return;
    }
    if (selected.length === 0) {
      notify("err", "Select at least one platform");
      return;
    }
    setBusy(true);
    try {
      const res = await repurpose({
        data: {
          source: mode === "paste" ? source : undefined,
          sourcePostId: mode === "post" ? sourcePostId : undefined,
          platforms: selected,
        },
      });
      setIdea(res.idea);
      setVariants(res.variants);
      if (res.variants.length === 0) notify("err", "No variants returned, try again");
      else notify("ok", `${res.variants.length} platform varyantı üretildi`);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Repurpose failed");
    } finally {
      setBusy(false);
    }
  }

  function updateVariant(platform: string, patch: Partial<RepurposeVariant>) {
    setVariants((prev) =>
      prev.map((v) => (v.platform === platform ? { ...v, ...patch } : v)),
    );
  }

  async function onCreateDraft() {
    if (variants.length === 0) return;
    setCreating(true);
    try {
      await createDraft({ data: { idea, variants } });
      notify("ok", "Draft post created with all variants");
      onPostCreated?.();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not create draft");
    } finally {
      setCreating(false);
    }
  }

  async function onCopy(key: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1500);
    } catch {
      notify("err", "Copy failed");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <Recycle className="h-5 w-5 text-emerald-400" /> Repurpose Engine
        </h2>
        <p className="text-sm text-muted-foreground">
          Tek bir içeriği (blog, metin veya mevcut gönderi) tüm platformlar için yeniden yaz.
        </p>
      </div>

      {/* Source */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        {/* Mode toggle */}
        <div className="mb-4 inline-flex rounded-xl border border-border/60 bg-background/40 p-1 text-xs font-semibold">
          <button
            onClick={() => setMode("paste")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition",
              mode === "paste" ? "bg-brand-red text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <FileText className="h-3.5 w-3.5" /> Paste text
          </button>
          <button
            onClick={() => setMode("post")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition",
              mode === "post" ? "bg-brand-red text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Sparkles className="h-3.5 w-3.5" /> From existing post
          </button>
        </div>

        {mode === "paste" ? (
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            rows={5}
            placeholder="Blog yazısı, hizmet açıklaması veya herhangi bir metni buraya yapıştırın…"
            className={cn(INPUT_CLS, "resize-y")}
          />
        ) : (
          <select
            value={sourcePostId}
            onChange={(e) => setSourcePostId(e.target.value)}
            className={INPUT_CLS}
          >
            <option value="">Select a post…</option>
            {sourceablePosts.map((p) => (
              <option key={p.id} value={p.id}>
                [{p.status}] {(p.idea || p.caption || "Untitled").slice(0, 60)}
              </option>
            ))}
          </select>
        )}

        {/* Platforms */}
        <div className="mt-4">
          <label className="mb-2 block text-xs font-semibold text-muted-foreground">
            Target platforms
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const Icon = p.icon;
              const on = selected.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition",
                    on
                      ? "border-brand-red/50 bg-brand-red/15 text-foreground"
                      : "border-border/60 bg-background/40 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", on ? p.tone : "")} /> {p.label}
                  {on && <Check className="h-3 w-3 text-brand-red" />}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={busy}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          Repurpose content
        </button>
      </div>

      {/* Results */}
      {variants.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-bold">Variants ({variants.length})</h3>
            <button
              onClick={onCreateDraft}
              disabled={creating}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25 disabled:opacity-60"
            >
              {creating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FilePlus2 className="h-4 w-4" />
              )}
              Save as draft post
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {variants.map((v) => {
              const meta = PLATFORM_META[v.platform] ?? {
                label: v.platform,
                icon: FileText,
                tone: "text-muted-foreground",
              };
              const Icon = meta.icon;
              const full = [v.caption, v.hashtags].filter(Boolean).join("\n\n");
              return (
                <div
                  key={v.platform}
                  className="flex flex-col rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <Icon className={cn("h-4 w-4", meta.tone)} /> {meta.label}
                    </span>
                    <button
                      onClick={() => onCopy(v.platform, full)}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {copied === v.platform ? (
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      Copy
                    </button>
                  </div>
                  <textarea
                    value={v.caption}
                    onChange={(e) => updateVariant(v.platform, { caption: e.target.value })}
                    rows={5}
                    className={cn(INPUT_CLS, "mb-2 resize-y text-xs leading-relaxed")}
                  />
                  <input
                    value={v.hashtags}
                    onChange={(e) => updateVariant(v.platform, { hashtags: e.target.value })}
                    placeholder="#hashtags"
                    className={cn(INPUT_CLS, "text-xs text-sky-300")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
