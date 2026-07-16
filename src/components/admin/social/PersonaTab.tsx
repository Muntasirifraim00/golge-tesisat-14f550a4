import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Loader2,
  Drama,
  Plus,
  Trash2,
  Save,
  Pencil,
  X,
  Star,
  Check,
  Ban,
} from "lucide-react";
import {
  listVoiceProfiles,
  saveVoiceProfile,
  deleteVoiceProfile,
  type VoiceProfile,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const EMPTY = {
  id: undefined as string | undefined,
  name: "",
  description: "",
  tone: "Confident, premium, friendly yet professional",
  do_rules: "",
  dont_rules: "",
  sample_phrases: "",
  emoji_level: "medium",
  cta_style: "",
  language: "tr",
  is_default: false,
  active: true,
};

const EMOJI_LABELS: Record<string, string> = {
  none: "No emoji",
  low: "Few emojis",
  medium: "Medium emojis",
  high: "Many emojis",
};

export function PersonaTab({ notify }: { notify: Notify }) {
  const fetchProfiles = useServerFn(listVoiceProfiles);
  const save = useServerFn(saveVoiceProfile);
  const remove = useServerFn(deleteVoiceProfile);

  const [profiles, setProfiles] = useState<VoiceProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setProfiles(await fetchProfiles());
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

  function openNew() {
    setForm(EMPTY);
    setShowForm(true);
  }

  function openEdit(p: VoiceProfile) {
    setForm({
      id: p.id,
      name: p.name,
      description: p.description ?? "",
      tone: p.tone,
      do_rules: p.do_rules ?? "",
      dont_rules: p.dont_rules ?? "",
      sample_phrases: p.sample_phrases ?? "",
      emoji_level: p.emoji_level,
      cta_style: p.cta_style ?? "",
      language: p.language,
      is_default: p.is_default,
      active: p.active,
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      notify("err", "Persona name is required");
      return;
    }
    setSaving(true);
    try {
      await save({ data: form });
      notify("ok", "Persona saved");
      setShowForm(false);
      setForm(EMPTY);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this persona?")) return;
    try {
      await remove({ data: { id } });
      notify("ok", "Persona deleted");
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not delete");
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Drama className="h-4 w-4 text-brand-red" />
            Persona / Brand Voices
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Manage your brand voices to produce content with different tones and rules.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          New Persona
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">{form.id ? "Edit persona" : "New persona"}</span>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              className={INPUT_CLS}
              placeholder="Persona name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={INPUT_CLS}
              placeholder="Short description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <input
              className={`${INPUT_CLS} sm:col-span-2`}
              placeholder="Tone (e.g. energetic, friendly, corporate)"
              value={form.tone}
              onChange={(e) => setForm({ ...form, tone: e.target.value })}
            />
            <textarea
              className={INPUT_CLS}
              rows={2}
              placeholder="Things to do (do)"
              value={form.do_rules}
              onChange={(e) => setForm({ ...form, do_rules: e.target.value })}
            />
            <textarea
              className={INPUT_CLS}
              rows={2}
              placeholder="Things to avoid (don't)"
              value={form.dont_rules}
              onChange={(e) => setForm({ ...form, dont_rules: e.target.value })}
            />
            <input
              className={INPUT_CLS}
              placeholder="Sample phrases (comma-separated)"
              value={form.sample_phrases}
              onChange={(e) => setForm({ ...form, sample_phrases: e.target.value })}
            />
            <input
              className={INPUT_CLS}
              placeholder="Call-to-action style"
              value={form.cta_style}
              onChange={(e) => setForm({ ...form, cta_style: e.target.value })}
            />
            <select
              className={INPUT_CLS}
              value={form.emoji_level}
              onChange={(e) => setForm({ ...form, emoji_level: e.target.value })}
            >
              <option value="none">No emoji</option>
              <option value="low">Few emojis</option>
              <option value="medium">Medium emojis</option>
              <option value="high">Many emojis</option>
            </select>
            <select
              className={INPUT_CLS}
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            >
              <option value="tr">Turkish</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold">
              <input
                type="checkbox"
                checked={form.is_default}
                onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
              />
              Default persona
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Active
            </label>
            <button
              onClick={handleSave}
              disabled={saving}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-brand-red px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Save
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {profiles.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold">{p.name}</span>
                    {p.is_default && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-red/15 px-2 py-0.5 text-[10px] font-bold text-brand-red">
                        <Star className="h-2.5 w-2.5" /> Default
                      </span>
                    )}
                    {!p.active && (
                      <span className="shrink-0 rounded-full bg-background/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{p.tone}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => openEdit(p)}
                    className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-background/60 hover:text-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  {!p.is_default && (
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-background/60 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-2 space-y-1 text-[11px] text-muted-foreground">
                {p.do_rules && (
                  <p className="flex items-start gap-1">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" /> {p.do_rules}
                  </p>
                )}
                {p.dont_rules && (
                  <p className="flex items-start gap-1">
                    <Ban className="mt-0.5 h-3 w-3 shrink-0 text-destructive" /> {p.dont_rules}
                  </p>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                <span className="rounded-full bg-background/60 px-2 py-0.5">
                  {EMOJI_LABELS[p.emoji_level] ?? p.emoji_level}
                </span>
                <span className="rounded-full bg-background/60 px-2 py-0.5 uppercase">{p.language}</span>
                {p.cta_style && <span className="rounded-full bg-background/60 px-2 py-0.5">{p.cta_style}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
