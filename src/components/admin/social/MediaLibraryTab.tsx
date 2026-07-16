import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Loader2,
  Images,
  Upload,
  Sparkles,
  Trash2,
  Pencil,
  Save,
  X,
  Search,
  Plus,
  Tag,
  Wand2,
} from "lucide-react";
import {
  listMediaAssets,
  uploadMediaAsset,
  generateMediaAsset,
  updateMediaAsset,
  deleteMediaAsset,
  attachLibraryAssetToPost,
  type MediaAsset,
  type SocialPost,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function fmtBytes(n: number | null): string {
  if (!n) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaLibraryTab({
  notify,
  posts,
  onPostUpdated,
}: {
  notify: Notify;
  posts: SocialPost[];
  onPostUpdated: (post: SocialPost) => void;
}) {
  const fetchAssets = useServerFn(listMediaAssets);
  const upload = useServerFn(uploadMediaAsset);
  const generate = useServerFn(generateMediaAsset);
  const update = useServerFn(updateMediaAsset);
  const remove = useServerFn(deleteMediaAsset);
  const attach = useServerFn(attachLibraryAssetToPost);

  const fileRef = useRef<HTMLInputElement>(null);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | "upload" | "ai">("all");

  const [uploading, setUploading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", alt_text: "", tags: "" });

  async function load() {
    setLoading(true);
    try {
      setAssets(await fetchAssets());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    assets.forEach((a) => a.tags?.forEach((t) => set.add(t)));
    return [...set].sort();
  }, [assets]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return assets.filter((a) => {
      if (sourceFilter !== "all" && a.source !== sourceFilter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        (a.alt_text ?? "").toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [assets, search, sourceFilter]);

  async function onUploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue;
        const dataUrl = await fileToDataUrl(file);
        const created = await upload({
          data: { dataUrl, name: file.name.replace(/\.[^.]+$/, ""), mimeType: file.type },
        });
        setAssets((prev) => [created, ...prev]);
      }
      notify("ok", "Image(s) added to library 📚");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to upload");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function onGenerate() {
    if (!aiPrompt.trim()) return;
    setGenerating(true);
    try {
      const created = await generate({ data: { prompt: aiPrompt } });
      setAssets((prev) => [created, ...prev]);
      setAiPrompt("");
      notify("ok", "AI image generated 🎨");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to generate");
    } finally {
      setGenerating(false);
    }
  }

  function startEdit(a: MediaAsset) {
    setEditId(a.id);
    setEditForm({ name: a.name, alt_text: a.alt_text ?? "", tags: a.tags.join(", ") });
  }

  async function saveEdit() {
    if (!editId) return;
    setBusy(editId);
    try {
      const updated = await update({
        data: {
          id: editId,
          name: editForm.name,
          altText: editForm.alt_text,
          tags: editForm.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        },
      });
      setAssets((prev) => prev.map((a) => (a.id === editId ? updated : a)));
      setEditId(null);
      notify("ok", "Updated");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setBusy(null);
    }
  }

  async function onDelete(a: MediaAsset) {
    if (!confirm(`Delete "${a.name}"?`)) return;
    setBusy(a.id);
    try {
      await remove({ data: { id: a.id } });
      setAssets((prev) => prev.filter((x) => x.id !== a.id));
      notify("ok", "Deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setBusy(null);
    }
  }

  async function onAttach(a: MediaAsset, postId: string) {
    if (!postId) return;
    setBusy(a.id);
    try {
      const updated = await attach({ data: { postId, assetId: a.id } });
      onPostUpdated(updated);
      setAssets((prev) =>
        prev.map((x) => (x.id === a.id ? { ...x, usage_count: x.usage_count + 1 } : x)),
      );
      notify("ok", "Image added to post");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to add");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Images className="h-4 w-4 text-brand-red" /> Media Library
            <span className="text-muted-foreground font-normal">({assets.length})</span>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onUploadFiles(e.target.files)}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              Upload
            </button>
          </div>
        </div>

        {/* AI generate */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Wand2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onGenerate()}
              placeholder="Generate image with AI: e.g. 'modern bathroom plumbing repair, natural light'"
              className={`${INPUT_CLS} pl-9`}
            />
          </div>
          <button
            onClick={onGenerate}
            disabled={generating || !aiPrompt.trim()}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-red/40 bg-brand-red/10 px-4 py-2 text-sm font-medium text-brand-red disabled:opacity-60"
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate
          </button>
        </div>

        {/* Search & filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, tag or alt text…"
              className={`${INPUT_CLS} pl-9`}
            />
          </div>
          {(["all", "upload", "ai"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSourceFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                sourceFilter === s
                  ? "bg-brand-red text-white"
                  : "border border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All" : s === "upload" ? "Uploaded" : "AI"}
            </button>
          ))}
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <Tag className="h-3.5 w-3.5 text-muted-foreground" />
            {allTags.slice(0, 24).map((t) => (
              <button
                key={t}
                onClick={() => setSearch(t)}
                className="rounded-full border border-border/60 px-2 py-0.5 text-[11px] text-muted-foreground hover:border-brand-red/40 hover:text-foreground"
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 py-16 text-center text-sm text-muted-foreground">
          <Images className="mx-auto mb-3 h-8 w-8 opacity-50" />
          No images yet. Upload or generate with AI.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card/40"
            >
              <div className="relative aspect-square bg-muted/40">
                {a.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.url} alt={a.alt_text ?? a.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <Images className="h-8 w-8 opacity-40" />
                  </div>
                )}
                <span
                  className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    a.source === "ai" ? "bg-brand-red/90 text-white" : "bg-background/80 text-foreground"
                  }`}
                >
                  {a.source === "ai" ? "AI" : "Uploaded"}
                </span>
                {a.usage_count > 0 && (
                  <span className="absolute right-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[10px] text-muted-foreground">
                    Used {a.usage_count}×
                  </span>
                )}
              </div>

              {editId === a.id ? (
                <div className="space-y-2 p-3">
                  <input
                    value={editForm.name}
                    onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Name"
                    className={INPUT_CLS}
                  />
                  <input
                    value={editForm.alt_text}
                    onChange={(e) => setEditForm((f) => ({ ...f, alt_text: e.target.value }))}
                    placeholder="Alt text (SEO/accessibility)"
                    className={INPUT_CLS}
                  />
                  <input
                    value={editForm.tags}
                    onChange={(e) => setEditForm((f) => ({ ...f, tags: e.target.value }))}
                    placeholder="Tags (comma-separated)"
                    className={INPUT_CLS}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      disabled={busy === a.id}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl bg-brand-red px-2 py-1.5 text-xs font-medium text-white disabled:opacity-60"
                    >
                      {busy === a.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="inline-flex items-center justify-center rounded-xl border border-border/60 px-2 py-1.5 text-xs"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 p-3">
                  <div className="truncate text-sm font-medium" title={a.name}>
                    {a.name}
                  </div>
                  {a.alt_text && (
                    <div className="line-clamp-2 text-[11px] text-muted-foreground">{a.alt_text}</div>
                  )}
                  {a.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {a.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="text-[10px] text-muted-foreground">{fmtBytes(a.size_bytes)}</div>

                  <select
                    defaultValue=""
                    disabled={busy === a.id}
                    onChange={(e) => {
                      onAttach(a, e.target.value);
                      e.target.value = "";
                    }}
                    className="w-full rounded-lg border border-border/60 bg-background/60 px-2 py-1.5 text-xs outline-none"
                  >
                    <option value="">＋ Add to post…</option>
                    {posts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {(p.idea || p.caption || "Post").slice(0, 40)}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(a)}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-xl border border-border/60 px-2 py-1.5 text-xs hover:border-brand-red/40"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => onDelete(a)}
                      disabled={busy === a.id}
                      className="inline-flex items-center justify-center rounded-xl border border-border/60 px-2 py-1.5 text-xs text-red-500 hover:border-red-500/40 disabled:opacity-60"
                    >
                      {busy === a.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
