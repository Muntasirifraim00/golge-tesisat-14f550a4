import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  LayoutTemplate,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Wand2,
  X,
  Copy,
  Check,
  Hash,
  Search,
  Megaphone,
  FileText,
} from "lucide-react";
import {
  listContentTemplates,
  saveContentTemplate,
  deleteContentTemplate,
  generateContentTemplate,
  createPostFromTemplate,
  type ContentTemplate,
} from "@/lib/social.functions";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const CATEGORIES = [
  "tips",
  "promo",
  "before-after",
  "emergency",
  "education",
  "testimonial",
  "seasonal",
  "general",
];

const CATEGORY_TONE: Record<string, string> = {
  tips: "border-sky-500/30 bg-sky-500/10 text-sky-300",
  promo: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  "before-after": "border-violet-500/30 bg-violet-500/10 text-violet-300",
  emergency: "border-red-500/30 bg-red-500/10 text-red-300",
  education: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  testimonial: "border-pink-500/30 bg-pink-500/10 text-pink-300",
  seasonal: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  general: "border-border/60 bg-background/40 text-muted-foreground",
};

const PLATFORM_LABEL: Record<string, string> = {
  both: "Both",
  facebook: "Facebook",
  instagram: "Instagram",
};

type DraftTemplate = {
  id?: string;
  name: string;
  category: string;
  service: string;
  platform: string;
  description: string;
  structure: string;
  example_caption: string;
  hashtags: string[];
  cta: string;
  ai_generated: boolean;
};

const EMPTY_DRAFT: DraftTemplate = {
  name: "",
  category: "general",
  service: "",
  platform: "both",
  description: "",
  structure: "",
  example_caption: "",
  hashtags: [],
  cta: "",
  ai_generated: false,
};

function parseTags(raw: string): string[] {
  return Array.from(
    new Set(
      raw
        .split(/[\s,]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => `#${t.replace(/^#+/, "").replace(/\s+/g, "")}`),
    ),
  );
}

export function TemplatesTab({
  notify,
  onPostCreated,
}: {
  notify: Notify;
  onPostCreated?: () => void;
}) {
  const fetchTemplates = useServerFn(listContentTemplates);
  const save = useServerFn(saveContentTemplate);
  const remove = useServerFn(deleteContentTemplate);
  const generate = useServerFn(generateContentTemplate);
  const toPost = useServerFn(createPostFromTemplate);

  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");

  // AI generator
  const [aiCategory, setAiCategory] = useState("tips");
  const [aiService, setAiService] = useState("");
  const [aiGoal, setAiGoal] = useState("");
  const [aiBusy, setAiBusy] = useState(false);

  const [draft, setDraft] = useState<DraftTemplate | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setTemplates(await fetchTemplates());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load templates");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onGenerate() {
    setAiBusy(true);
    try {
      const res = await generate({
        data: { category: aiCategory, service: aiService, goal: aiGoal },
      });
      setDraft({
        name: res.name,
        category: res.category || aiCategory,
        service: aiService,
        platform: "both",
        description: res.description,
        structure: res.structure,
        example_caption: res.example_caption,
        hashtags: res.hashtags,
        cta: res.cta,
        ai_generated: true,
      });
      notify("ok", "AI template generated — review &amp; save");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "AI generation failed");
    } finally {
      setAiBusy(false);
    }
  }

  async function onSaveDraft() {
    if (!draft) return;
    if (!draft.name.trim()) {
      notify("err", "Template name is required");
      return;
    }
    setSaving(true);
    try {
      await save({ data: draft });
      notify("ok", draft.id ? "Template updated" : "Template saved");
      setDraft(null);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    setBusyId(id);
    try {
      await remove({ data: { id } });
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      notify("ok", "Template deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onUse(id: string) {
    setBusyId(id);
    try {
      await toPost({ data: { id } });
      notify("ok", "Draft post created from template");
      setTemplates((prev) =>
        prev.map((t) => (t.id === id ? { ...t, use_count: (t.use_count ?? 0) + 1 } : t)),
      );
      onPostCreated?.();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not create post");
    } finally {
      setBusyId(null);
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

  const visible = templates.filter((t) => {
    if (catFilter !== "all" && t.category !== catFilter) return false;
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      (t.service ?? "").toLowerCase().includes(q) ||
      (t.description ?? "").toLowerCase().includes(q) ||
      t.structure.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <LayoutTemplate className="h-5 w-5 text-violet-400" /> Content Templates
          </h2>
          <p className="text-sm text-muted-foreground">
            Tekrar kullanılabilir gönderi formatları oluştur, kaydet ve tek tıkla yeni post üret.
          </p>
        </div>
        <button
          onClick={() => setDraft({ ...EMPTY_DRAFT })}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3.5 py-2 text-sm font-semibold transition hover:border-brand-red/40"
        >
          <Plus className="h-4 w-4" /> New template
        </button>
      </div>

      {/* AI generator */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Wand2 className="h-4 w-4 text-brand-red" /> AI generate template
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Category</label>
            <select
              value={aiCategory}
              onChange={(e) => setAiCategory(e.target.value)}
              className={INPUT_CLS}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Service / niche</label>
            <input
              value={aiService}
              onChange={(e) => setAiService(e.target.value)}
              placeholder="e.g. Kombi bakımı"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Goal (optional)</label>
            <input
              value={aiGoal}
              onChange={(e) => setAiGoal(e.target.value)}
              placeholder="e.g. acil servis daveti"
              className={INPUT_CLS}
            />
          </div>
          <button
            onClick={onGenerate}
            disabled={aiBusy}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {aiBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate
          </button>
        </div>
      </div>

      {/* Draft editor */}
      {draft && (
        <DraftEditor
          draft={draft}
          setDraft={setDraft}
          saving={saving}
          onSave={onSaveDraft}
          onCancel={() => setDraft(null)}
        />
      )}

      {/* Filters */}
      {!loading && templates.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates…"
              className={cn(INPUT_CLS, "pl-9")}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <FilterChip active={catFilter === "all"} onClick={() => setCatFilter("all")}>
              All
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c} active={catFilter === c} onClick={() => setCatFilter(c)}>
                {c}
              </FilterChip>
            ))}
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : templates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 py-16 text-center text-sm text-muted-foreground">
          Henüz şablon yok. Yukarıdan AI ile bir şablon üretin.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:border-brand-red/30"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-bold">{t.name}</p>
                    {t.ai_generated && (
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-brand-red/30 px-1.5 py-0.5 text-[10px] text-brand-red">
                        <Sparkles className="h-2.5 w-2.5" /> AI
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span
                      className={cn(
                        "rounded-md border px-1.5 py-0.5",
                        CATEGORY_TONE[t.category] ?? CATEGORY_TONE.general,
                      )}
                    >
                      {t.category}
                    </span>
                    <span className="rounded-md border border-border/60 px-1.5 py-0.5">
                      {PLATFORM_LABEL[t.platform] ?? t.platform}
                    </span>
                    {t.service && (
                      <span className="rounded-md border border-border/60 px-1.5 py-0.5">
                        {t.service}
                      </span>
                    )}
                    {t.use_count > 0 && (
                      <span className="rounded-md border border-border/60 px-1.5 py-0.5">
                        used {t.use_count}×
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setDraft({
                      id: t.id,
                      name: t.name,
                      category: t.category,
                      service: t.service ?? "",
                      platform: t.platform,
                      description: t.description ?? "",
                      structure: t.structure,
                      example_caption: t.example_caption ?? "",
                      hashtags: t.hashtags,
                      cta: t.cta ?? "",
                      ai_generated: t.ai_generated,
                    })
                  }
                  className="shrink-0 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Edit
                </button>
              </div>

              {t.description && (
                <p className="mb-3 text-xs italic text-muted-foreground">{t.description}</p>
              )}

              {/* Structure */}
              {t.structure && (
                <div className="mb-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      <FileText className="h-3 w-3" /> Structure
                    </span>
                    <button
                      onClick={() => onCopy(`s-${t.id}`, t.structure)}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {copied === `s-${t.id}` ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      Copy
                    </button>
                  </div>
                  <pre className="max-h-32 overflow-y-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-background/40 p-2.5 text-[11px] leading-relaxed text-muted-foreground">
                    {t.structure}
                  </pre>
                </div>
              )}

              {/* CTA + hashtags */}
              {t.cta && (
                <p className="mb-2 flex items-start gap-1.5 text-xs text-foreground">
                  <Megaphone className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                  <span>{t.cta}</span>
                </p>
              )}
              {t.hashtags.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {t.hashtags.slice(0, 12).map((h) => (
                    <span
                      key={h}
                      className="rounded-md border border-sky-500/25 bg-sky-500/10 px-1.5 py-0.5 text-[10px] text-sky-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 pt-3">
                <button
                  onClick={() => onUse(t.id)}
                  disabled={busyId === t.id}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red/15 px-2.5 py-1.5 text-xs font-semibold text-brand-red transition hover:bg-brand-red/25 disabled:opacity-50"
                >
                  {busyId === t.id ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <Sparkles className="h-3 w-3" />
                  )}
                  Use → draft post
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  disabled={busyId === t.id}
                  className="rounded-lg p-1.5 text-muted-foreground transition hover:text-destructive disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition",
        active
          ? "border-brand-red/50 bg-brand-red/15 text-brand-red"
          : "border-border/60 bg-card/40 text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function DraftEditor({
  draft,
  setDraft,
  saving,
  onSave,
  onCancel,
}: {
  draft: DraftTemplate;
  setDraft: (d: DraftTemplate) => void;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [tagInput, setTagInput] = useState(draft.hashtags.join(" "));

  return (
    <div className="rounded-2xl border border-brand-red/30 bg-card/50 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold">
          {draft.ai_generated && !draft.id && <Sparkles className="h-4 w-4 text-brand-red" />}
          {draft.id ? "Edit template" : draft.ai_generated ? "Review AI template" : "New template"}
        </span>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Name</label>
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="Template name"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Category</label>
          <select
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            className={INPUT_CLS}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Service / niche</label>
          <input
            value={draft.service}
            onChange={(e) => setDraft({ ...draft, service: e.target.value })}
            placeholder="e.g. Tıkanıklık açma"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Platform</label>
          <select
            value={draft.platform}
            onChange={(e) => setDraft({ ...draft, platform: e.target.value })}
            className={INPUT_CLS}
          >
            <option value="both">Both</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs text-muted-foreground">Description</label>
        <input
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          placeholder="When to use this template"
          className={INPUT_CLS}
        />
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs text-muted-foreground">
          Structure (use {"{variables}"})
        </label>
        <textarea
          value={draft.structure}
          onChange={(e) => setDraft({ ...draft, structure: e.target.value })}
          rows={5}
          placeholder={"🔧 {hizmet} mi gerekiyor?\n{problem} mı yaşıyorsunuz?\n{fayda}\n📞 {telefon}"}
          className={cn(INPUT_CLS, "resize-y font-mono text-xs leading-relaxed")}
        />
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs text-muted-foreground">Example caption</label>
        <textarea
          value={draft.example_caption}
          onChange={(e) => setDraft({ ...draft, example_caption: e.target.value })}
          rows={3}
          placeholder="A filled-in example of this template"
          className={cn(INPUT_CLS, "resize-y")}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Call to action</label>
          <input
            value={draft.cta}
            onChange={(e) => setDraft({ ...draft, cta: e.target.value })}
            placeholder="e.g. Hemen arayın: 0xxx"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" /> Hashtags
          </label>
          <input
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
              setDraft({ ...draft, hashtags: parseTags(e.target.value) });
            }}
            placeholder="#tesisat #istanbul"
            className={INPUT_CLS}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          Save template
        </button>
      </div>
    </div>
  );
}
