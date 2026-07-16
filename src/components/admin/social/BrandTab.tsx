import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Loader2, Save, Building2, Clock, Plus, Trash2 } from "lucide-react";
import { getBrandSettings, saveBrandSettings, type BrandSettings } from "@/lib/brand.functions";

export function BrandTab({ notify }: { notify: (kind: "ok" | "err", msg: string) => void }) {
  const fetchBrand = useServerFn(getBrandSettings);
  const save = useServerFn(saveBrandSettings);

  const [brand, setBrand] = useState<BrandSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setBrand(await fetchBrand());
      } catch (e) {
        notify("err", e instanceof Error ? e.message : "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function patch(p: Partial<BrandSettings>) {
    setBrand((b) => (b ? { ...b, ...p } : b));
  }

  async function onSave() {
    if (!brand) return;
    setSaving(true);
    try {
      await save({
        data: {
          id: brand.id,
          business_name: brand.business_name,
          tone: brand.tone,
          primary_color: brand.primary_color,
          phone: brand.phone,
          default_hashtags: brand.default_hashtags,
          language: brand.language,
          best_times: brand.best_times,
        },
      });
      notify("ok", "Brand settings saved");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-card/50" />;
  if (!brand) return null;

  const times = brand.best_times ?? [];

  return (
    <div className="max-w-2xl space-y-5">
      <div className="flex items-center gap-2 text-sm font-bold">
        <Building2 className="h-4 w-4 text-brand-red" /> Brand Profile
      </div>
      <p className="text-sm text-muted-foreground">
        All AI content is generated according to this profile — tone, phone, and tags are reflected in every post.
      </p>

      <Field label="Business name">
        <input value={brand.business_name} onChange={(e) => patch({ business_name: e.target.value })} className={input} />
      </Field>

      <Field label="Content tone">
        <textarea value={brand.tone} onChange={(e) => patch({ tone: e.target.value })} rows={2} className={input} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone">
          <input value={brand.phone} onChange={(e) => patch({ phone: e.target.value })} className={input} placeholder="0xxx xxx xx xx" />
        </Field>
        <Field label="Language">
          <input value={brand.language} onChange={(e) => patch({ language: e.target.value })} className={input} />
        </Field>
      </div>

      <Field label="Default hashtags">
        <input value={brand.default_hashtags} onChange={(e) => patch({ default_hashtags: e.target.value })} className={`${input} text-brand-red`} />
      </Field>

      <Field label="Brand color">
        <div className="flex items-center gap-2">
          <input type="color" value={brand.primary_color} onChange={(e) => patch({ primary_color: e.target.value })} className="h-10 w-14 rounded-lg border border-border/60 bg-transparent" />
          <input value={brand.primary_color} onChange={(e) => patch({ primary_color: e.target.value })} className={input} />
        </div>
      </Field>

      <Field label="Automatic sharing times (best times)">
        <div className="flex flex-wrap items-center gap-2">
          {times.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="time"
                value={t}
                onChange={(e) => patch({ best_times: times.map((x, xi) => (xi === i ? e.target.value : x)) })}
                className="bg-transparent outline-none"
              />
              <button onClick={() => patch({ best_times: times.filter((_, xi) => xi !== i) })} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          <button
            onClick={() => patch({ best_times: [...times, "12:00"] })}
            className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:border-brand-red/40"
          >
            <Plus className="h-3.5 w-3.5" /> Add time
          </button>
        </div>
      </Field>

      <button
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-brand-red-foreground transition hover:opacity-90 disabled:opacity-50"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
      </button>
    </div>
  );
}

const input =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-red/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
