import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, Layers, Sparkles, Save, ChevronDown, ChevronUp } from "lucide-react";
import { generatePostVariants, savePostVariant, type SocialPost } from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const PLATFORMS: { id: string; label: string }[] = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "google_business", label: "Google Business" },
  { id: "x", label: "X (Twitter)" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "tiktok", label: "TikTok" },
];

export function PostVariantsPanel({
  post,
  notify,
  onUpdated,
}: {
  post: SocialPost;
  notify: Notify;
  onUpdated: (patch: Partial<SocialPost>) => void;
}) {
  const generate = useServerFn(generatePostVariants);
  const saveVariant = useServerFn(savePostVariant);

  const [open, setOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [savingFor, setSavingFor] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>(["facebook", "instagram", "x", "linkedin"]);
  const variants = post.platform_variants ?? {};
  const variantCount = Object.keys(variants).length;

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  async function onGenerate() {
    setGenerating(true);
    try {
      const updated = await generate({ data: { id: post.id, platforms: selected } });
      onUpdated({ platform_variants: updated.platform_variants });
      notify("ok", "Platform variants generated ✨");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not be generated");
    } finally {
      setGenerating(false);
    }
  }

  async function onSaveVariant(platform: string, caption: string, hashtags: string) {
    setSavingFor(platform);
    try {
      const updated = await saveVariant({ data: { id: post.id, platform, caption, hashtags } });
      onUpdated({ platform_variants: updated.platform_variants });
      notify("ok", "Variant saved");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not be saved");
    } finally {
      setSavingFor(null);
    }
  }

  return (
    <div className="rounded-xl border border-border/60 bg-background/40">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium"
      >
        <Layers className="h-4 w-4 text-brand-red" />
        Platform variants
        {variantCount > 0 && (
          <span className="rounded-full bg-brand-red/15 px-2 py-0.5 text-[11px] text-brand-red">
            {variantCount}
          </span>
        )}
        {open ? <ChevronUp className="ml-auto h-4 w-4" /> : <ChevronDown className="ml-auto h-4 w-4" />}
      </button>

      {open && (
        <div className="space-y-3 border-t border-border/60 p-3">
          <div className="flex flex-wrap gap-1.5">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                  selected.includes(p.id)
                    ? "bg-brand-red text-white"
                    : "border border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={onGenerate}
            disabled={generating || selected.length === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-brand-red/40 bg-brand-red/10 px-3 py-1.5 text-xs font-medium text-brand-red disabled:opacity-60"
          >
            {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
            Generate for selected platforms
          </button>

          {PLATFORMS.filter((p) => variants[p.id]).map((p) => (
            <VariantEditor
              key={p.id}
              label={p.label}
              caption={variants[p.id]?.caption ?? ""}
              hashtags={variants[p.id]?.hashtags ?? ""}
              saving={savingFor === p.id}
              onSave={(c, h) => onSaveVariant(p.id, c, h)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function VariantEditor({
  label,
  caption,
  hashtags,
  saving,
  onSave,
}: {
  label: string;
  caption: string;
  hashtags: string;
  saving: boolean;
  onSave: (caption: string, hashtags: string) => void;
}) {
  const [cap, setCap] = useState(caption);
  const [tags, setTags] = useState(hashtags);
  const dirty = cap !== caption || tags !== hashtags;
  const inputCls =
    "w-full rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs outline-none focus:border-brand-red/50";

  return (
    <div className="space-y-1.5 rounded-lg border border-border/50 bg-card/30 p-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">{label}</span>
        <span className="text-[10px] text-muted-foreground">{cap.length} characters</span>
      </div>
      <textarea value={cap} onChange={(e) => setCap(e.target.value)} rows={3} className={inputCls} />
      <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="#hashtags" className={inputCls} />
      <button
        onClick={() => onSave(cap, tags)}
        disabled={saving || !dirty}
        className="inline-flex items-center gap-1 rounded-lg bg-brand-red px-2.5 py-1 text-[11px] font-medium text-white disabled:opacity-50"
      >
        {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
        Save
      </button>
    </div>
  );
}
