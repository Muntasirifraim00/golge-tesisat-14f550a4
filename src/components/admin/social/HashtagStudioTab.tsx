import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Hash,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Wand2,
  X,
  Copy,
  Check,
  Tag,
  Search,
  Link2,
} from "lucide-react";
import {
  listHashtagSets,
  saveHashtagSet,
  deleteHashtagSet,
  generateHashtagSet,
  attachHashtagSetToPost,
  type HashtagSet,
  type SocialPost,
} from "@/lib/social.functions";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const PLATFORM_LABEL: Record<string, string> = {
  both: "Both",
  facebook: "Facebook",
  instagram: "Instagram",
};

type DraftSet = {
  id?: string;
  name: string;
  service: string;
  platform: string;
  hashtags: string[];
  keywords: string[];
  notes: string;
  ai_generated: boolean;
};

const EMPTY_DRAFT: DraftSet = {
  name: "",
  service: "",
  platform: "both",
  hashtags: [],
  keywords: [],
  notes: "",
  ai_generated: false,
};

function parseTokens(raw: string, isHashtag: boolean): string[] {
  return Array.from(
    new Set(
      raw
        .split(isHashtag ? /[\s,]+/ : /[\n,]+/)
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => (isHashtag ? `#${t.replace(/^#+/, "").replace(/\s+/g, "")}` : t)),
    ),
  );
}

export function HashtagStudioTab({
  notify,
  posts,
}: {
  notify: Notify;
  posts: SocialPost[];
}) {
  const fetchSets = useServerFn(listHashtagSets);
  const save = useServerFn(saveHashtagSet);
  const remove = useServerFn(deleteHashtagSet);
  const generate = useServerFn(generateHashtagSet);
  const attach = useServerFn(attachHashtagSetToPost);

  const [sets, setSets] = useState<HashtagSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  // AI generator
  const [aiTopic, setAiTopic] = useState("");
  const [aiService, setAiService] = useState("");
  const [aiPlatform, setAiPlatform] = useState("both");
  const [aiBusy, setAiBusy] = useState(false);

  // Draft editor (used for AI result + manual create/edit)
  const [draft, setDraft] = useState<DraftSet | null>(null);
  const [saving, setSaving] = useState(false);

  // attach-to-post selection per set
  const [attachOpen, setAttachOpen] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setSets(await fetchSets());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load sets");
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
        data: { topic: aiTopic, service: aiService, platform: aiPlatform },
      });
      setDraft({
        name: res.name,
        service: aiService,
        platform: aiPlatform,
        hashtags: res.hashtags,
        keywords: res.keywords,
        notes: res.notes,
        ai_generated: true,
      });
      notify("ok", "AI set generated — review &amp; save");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "AI generation failed");
    } finally {
      setAiBusy(false);
    }
  }

  async function onSaveDraft() {
    if (!draft) return;
    if (!draft.name.trim()) {
      notify("err", "Set name is required");
      return;
    }
    setSaving(true);
    try {
      await save({ data: draft });
      notify("ok", draft.id ? "Set updated" : "Set saved");
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
      setSets((prev) => prev.filter((s) => s.id !== id));
      notify("ok", "Set deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Delete failed");
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

  async function onAttach(setId: string, postId: string) {
    setBusyId(setId);
    try {
      await attach({ data: { setId, postId } });
      notify("ok", "Hashtags added to post");
      setAttachOpen(null);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Attach failed");
    } finally {
      setBusyId(null);
    }
  }

  const visible = sets.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      s.name.toLowerCase().includes(q) ||
      (s.service ?? "").toLowerCase().includes(q) ||
      s.hashtags.some((h) => h.toLowerCase().includes(q)) ||
      s.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const draftablePosts = posts.filter((p) => p.status === "draft" || p.status === "approved");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Hash className="h-5 w-5 text-sky-400" /> Hashtag &amp; Keyword Studio
          </h2>
          <p className="text-sm text-muted-foreground">
            AI ile niş hashtag &amp; anahtar kelime setleri üret, kaydet ve tek tıkla postlara ekle.
          </p>
        </div>
        <button
          onClick={() => setDraft({ ...EMPTY_DRAFT })}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3.5 py-2 text-sm font-semibold transition hover:border-brand-red/40"
        >
          <Plus className="h-4 w-4" /> New set
        </button>
      </div>

      {/* AI generator */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Wand2 className="h-4 w-4 text-brand-red" /> AI generate
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Service / niche</label>
            <input
              value={aiService}
              onChange={(e) => setAiService(e.target.value)}
              placeholder="e.g. Tıkanıklık açma"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Topic (optional)</label>
            <input
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. kış kampanyası"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Platform</label>
            <select
              value={aiPlatform}
              onChange={(e) => setAiPlatform(e.target.value)}
              className={INPUT_CLS}
            >
              <option value="both">Both</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </div>
          <button
            onClick={onGenerate}
            disabled={aiBusy}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {aiBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate set
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

      {/* Search */}
      {!loading && sets.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sets…"
            className={cn(INPUT_CLS, "pl-9")}
          />
        </div>
      )}

      {/* Saved sets */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : sets.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 py-16 text-center text-sm text-muted-foreground">
          Henüz kayıtlı set yok. Yukarıdan AI ile bir set üretin.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((s) => (
            <div
              key={s.id}
              className="flex flex-col rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:border-brand-red/30"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-bold">{s.name}</p>
                    {s.ai_generated && (
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-brand-red/30 px-1.5 py-0.5 text-[10px] text-brand-red">
                        <Sparkles className="h-2.5 w-2.5" /> AI
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span className="rounded-md border border-border/60 px-1.5 py-0.5">
                      {PLATFORM_LABEL[s.platform] ?? s.platform}
                    </span>
                    {s.service && (
                      <span className="rounded-md border border-border/60 px-1.5 py-0.5">{s.service}</span>
                    )}
                    <span className="rounded-md border border-border/60 px-1.5 py-0.5">
                      {s.hashtags.length} tags · {s.keywords.length} kw
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setDraft({
                      id: s.id,
                      name: s.name,
                      service: s.service ?? "",
                      platform: s.platform,
                      hashtags: s.hashtags,
                      keywords: s.keywords,
                      notes: s.notes ?? "",
                      ai_generated: s.ai_generated,
                    });
                  }}
                  className="shrink-0 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  Edit
                </button>
              </div>

              {/* Hashtags */}
              <div className="mb-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    <Hash className="h-3 w-3" /> Hashtags
                  </span>
                  <button
                    onClick={() => onCopy(`h-${s.id}`, s.hashtags.join(" "))}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground"
                  >
                    {copied === `h-${s.id}` ? (
                      <Check className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    Copy
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {s.hashtags.map((h) => (
                    <span
                      key={h}
                      className="rounded-md border border-sky-500/25 bg-sky-500/10 px-1.5 py-0.5 text-[11px] text-sky-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              {s.keywords.length > 0 && (
                <div className="mb-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                      <Tag className="h-3 w-3" /> Keywords
                    </span>
                    <button
                      onClick={() => onCopy(`k-${s.id}`, s.keywords.join(", "))}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground hover:text-foreground"
                    >
                      {copied === `k-${s.id}` ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                      Copy
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {s.keywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-md border border-border/60 bg-background/40 px-1.5 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {s.notes && <p className="mb-3 text-xs italic text-muted-foreground">{s.notes}</p>}

              {/* Actions */}
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/40 pt-3">
                <div className="relative">
                  <button
                    onClick={() => setAttachOpen((o) => (o === s.id ? null : s.id))}
                    disabled={busyId === s.id || draftablePosts.length === 0}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red/15 px-2.5 py-1.5 text-xs font-semibold text-brand-red transition hover:bg-brand-red/25 disabled:opacity-50"
                  >
                    {busyId === s.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Link2 className="h-3 w-3" />
                    )}
                    Attach to post
                  </button>
                  {attachOpen === s.id && draftablePosts.length > 0 && (
                    <div className="absolute bottom-full left-0 z-20 mb-2 max-h-56 w-64 overflow-y-auto rounded-xl border border-border/70 bg-card/95 p-1.5 shadow-2xl backdrop-blur">
                      {draftablePosts.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => onAttach(s.id, p.id)}
                          className="block w-full truncate rounded-lg px-2.5 py-2 text-left text-xs transition hover:bg-accent/40"
                        >
                          <span className="font-mono text-[9px] uppercase text-muted-foreground">
                            {p.status}
                          </span>
                          <span className="ml-2">
                            {(p.idea || p.caption || "Untitled").slice(0, 40)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onDelete(s.id)}
                  disabled={busyId === s.id}
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

function DraftEditor({
  draft,
  setDraft,
  saving,
  onSave,
  onCancel,
}: {
  draft: DraftSet;
  setDraft: (d: DraftSet) => void;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="rounded-2xl border border-brand-red/30 bg-card/50 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-semibold">
          {draft.ai_generated && !draft.id && <Sparkles className="h-4 w-4 text-brand-red" />}
          {draft.id ? "Edit set" : draft.ai_generated ? "Review AI set" : "New set"}
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
            className={INPUT_CLS}
            placeholder="Set name"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">Service</label>
            <input
              value={draft.service}
              onChange={(e) => setDraft({ ...draft, service: e.target.value })}
              className={INPUT_CLS}
              placeholder="e.g. Petek temizliği"
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
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted-foreground">
            Hashtags (space or comma separated)
          </label>
          <textarea
            value={draft.hashtags.join(" ")}
            onChange={(e) => setDraft({ ...draft, hashtags: parseTokens(e.target.value, true) })}
            rows={2}
            className={INPUT_CLS}
            placeholder="#tesisat #istanbul"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted-foreground">
            Keywords (one per line or comma separated)
          </label>
          <textarea
            value={draft.keywords.join(", ")}
            onChange={(e) => setDraft({ ...draft, keywords: parseTokens(e.target.value, false) })}
            rows={2}
            className={INPUT_CLS}
            placeholder="su kaçağı tespiti, kombi servisi"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted-foreground">Notes (optional)</label>
          <input
            value={draft.notes}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            className={INPUT_CLS}
            placeholder="When to use this set"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save set
        </button>
      </div>
    </div>
  );
}
