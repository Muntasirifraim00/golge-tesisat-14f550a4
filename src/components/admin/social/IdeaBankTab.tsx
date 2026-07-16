import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Lightbulb,
  Loader2,
  Plus,
  Sparkles,
  Trash2,
  Wand2,
  X,
  ArrowRight,
  GripVertical,
} from "lucide-react";
import {
  listContentIdeas,
  saveContentIdea,
  moveContentIdea,
  deleteContentIdea,
  brainstormContentIdeas,
  convertIdeaToPost,
  type ContentIdea,
} from "@/lib/social.functions";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;
type Status = ContentIdea["status"];

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const COLUMNS: { id: Status; label: string; hint: string; accent: string }[] = [
  { id: "idea", label: "Ideas", hint: "Raw concepts", accent: "border-sky-500/40 text-sky-400" },
  { id: "approved", label: "Approved", hint: "Ready to draft", accent: "border-amber-500/40 text-amber-400" },
  { id: "drafted", label: "Drafted", hint: "Turned into posts", accent: "border-violet-500/40 text-violet-400" },
  { id: "done", label: "Done", hint: "Published / closed", accent: "border-emerald-500/40 text-emerald-400" },
];

const PRIORITY_CLS: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  low: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

const EMPTY = {
  id: undefined as string | undefined,
  title: "",
  notes: "",
  service: "",
  platform: "both",
  priority: "medium",
  status: "idea" as Status,
};

export function IdeaBankTab({ notify }: { notify: Notify }) {
  const fetchIdeas = useServerFn(listContentIdeas);
  const save = useServerFn(saveContentIdea);
  const move = useServerFn(moveContentIdea);
  const remove = useServerFn(deleteContentIdea);
  const brainstorm = useServerFn(brainstormContentIdeas);
  const convert = useServerFn(convertIdeaToPost);

  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<Status | null>(null);

  const [aiTopic, setAiTopic] = useState("");
  const [aiCount, setAiCount] = useState(6);
  const [aiBusy, setAiBusy] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setIdeas(await fetchIdeas());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load ideas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSave() {
    if (!form.title.trim()) {
      notify("err", "Idea title is required");
      return;
    }
    setSaving(true);
    try {
      await save({ data: form });
      notify("ok", form.id ? "Idea updated" : "Idea added");
      setShowForm(false);
      setForm(EMPTY);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onBrainstorm() {
    setAiBusy(true);
    try {
      const res = await brainstorm({ data: { topic: aiTopic, count: aiCount } });
      notify("ok", `${res.created} ideas generated`);
      setAiTopic("");
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "AI brainstorm failed");
    } finally {
      setAiBusy(false);
    }
  }

  async function onDropTo(status: Status) {
    setOverCol(null);
    const id = dragId;
    setDragId(null);
    if (!id) return;
    const idea = ideas.find((i) => i.id === id);
    if (!idea || idea.status === status) return;
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    try {
      await move({ data: { id, status } });
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Move failed");
      await load();
    }
  }

  async function onConvert(idea: ContentIdea) {
    setBusyId(idea.id);
    try {
      await convert({ data: { id: idea.id } });
      notify("ok", "Draft post created from idea");
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Convert failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onDelete(id: string) {
    setBusyId(id);
    try {
      await remove({ data: { id } });
      setIdeas((prev) => prev.filter((i) => i.id !== id));
      notify("ok", "Idea deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Lightbulb className="h-5 w-5 text-amber-400" /> Idea &amp; Topic Bank
          </h2>
          <p className="text-sm text-muted-foreground">
            Brainstorm, organize and turn ideas into posts — drag cards between stages.
          </p>
        </div>
        <button
          onClick={() => {
            setForm(EMPTY);
            setShowForm((s) => !s);
          }}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3.5 py-2 text-sm font-semibold transition hover:border-brand-red/40"
        >
          <Plus className="h-4 w-4" /> New idea
        </button>
      </div>

      {/* AI brainstorm */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Wand2 className="h-4 w-4 text-brand-red" /> AI brainstorm
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <label className="mb-1 block text-xs text-muted-foreground">Topic / focus (optional)</label>
            <input
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. kombi bakımı, tıkanıklık açma"
              className={INPUT_CLS}
            />
          </div>
          <div className="w-28">
            <label className="mb-1 block text-xs text-muted-foreground">Count</label>
            <input
              type="number"
              min={1}
              max={12}
              value={aiCount}
              onChange={(e) => setAiCount(Number(e.target.value))}
              className={INPUT_CLS}
            />
          </div>
          <button
            onClick={onBrainstorm}
            disabled={aiBusy}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {aiBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate ideas
          </button>
        </div>
      </div>

      {/* Manual form */}
      {showForm && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold">{form.id ? "Edit idea" : "New idea"}</span>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs text-muted-foreground">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={INPUT_CLS}
                placeholder="Idea title"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs text-muted-foreground">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                className={INPUT_CLS}
                placeholder="Short description"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">Service</label>
              <input
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className={INPUT_CLS}
                placeholder="e.g. Tıkanıklık açma"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Platform</label>
                <select
                  value={form.platform}
                  onChange={(e) => setForm({ ...form, platform: e.target.value })}
                  className={INPUT_CLS}
                >
                  <option value="both">Both</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className={INPUT_CLS}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
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
              Save idea
            </button>
          </div>
        </div>
      )}

      {/* Kanban */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-4">
          {COLUMNS.map((col) => {
            const cards = ideas.filter((i) => i.status === col.id);
            return (
              <div
                key={col.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOverCol(col.id);
                }}
                onDragLeave={() => setOverCol((c) => (c === col.id ? null : c))}
                onDrop={() => onDropTo(col.id)}
                className={cn(
                  "flex flex-col rounded-2xl border bg-card/30 p-3 transition-colors",
                  overCol === col.id ? "border-brand-red/50 bg-card/60" : "border-border/50",
                )}
              >
                <div className={cn("mb-3 flex items-center justify-between rounded-lg border px-2.5 py-1.5", col.accent)}>
                  <span className="text-xs font-bold uppercase tracking-wide">{col.label}</span>
                  <span className="rounded-md bg-background/40 px-1.5 text-xs font-mono">{cards.length}</span>
                </div>
                <div className="flex min-h-[80px] flex-1 flex-col gap-2.5">
                  {cards.map((idea) => (
                    <div
                      key={idea.id}
                      draggable
                      onDragStart={() => setDragId(idea.id)}
                      onDragEnd={() => setDragId(null)}
                      className={cn(
                        "group rounded-xl border border-border/60 bg-background/60 p-3 transition",
                        dragId === idea.id ? "opacity-40" : "hover:border-brand-red/40",
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 cursor-grab text-muted-foreground/50" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold leading-snug">{idea.title}</p>
                          {idea.notes && (
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{idea.notes}</p>
                          )}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            <span
                              className={cn(
                                "rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase",
                                PRIORITY_CLS[idea.priority],
                              )}
                            >
                              {idea.priority}
                            </span>
                            {idea.service && (
                              <span className="rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                                {idea.service}
                              </span>
                            )}
                            {idea.ai_generated && (
                              <span className="inline-flex items-center gap-0.5 rounded-md border border-brand-red/30 px-1.5 py-0.5 text-[10px] text-brand-red">
                                <Sparkles className="h-2.5 w-2.5" /> AI
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-border/40 pt-2 opacity-0 transition group-hover:opacity-100">
                        <button
                          onClick={() => {
                            setForm({
                              id: idea.id,
                              title: idea.title,
                              notes: idea.notes ?? "",
                              service: idea.service ?? "",
                              platform: idea.platform ?? "both",
                              priority: idea.priority,
                              status: idea.status,
                            });
                            setShowForm(true);
                          }}
                          className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                        >
                          Edit
                        </button>
                        <div className="flex items-center gap-1.5">
                          {idea.status !== "drafted" && idea.status !== "done" && (
                            <button
                              onClick={() => onConvert(idea)}
                              disabled={busyId === idea.id}
                              className="inline-flex items-center gap-1 rounded-lg bg-brand-red/15 px-2 py-1 text-xs font-semibold text-brand-red transition hover:bg-brand-red/25 disabled:opacity-60"
                            >
                              {busyId === idea.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <ArrowRight className="h-3 w-3" />
                              )}
                              To post
                            </button>
                          )}
                          <button
                            onClick={() => onDelete(idea.id)}
                            disabled={busyId === idea.id}
                            className="rounded-lg p-1 text-muted-foreground transition hover:text-destructive disabled:opacity-60"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && (
                    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border/40 py-6 text-xs text-muted-foreground/60">
                      Drop here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
