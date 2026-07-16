import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  Link2,
  Loader2,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  MousePointerClick,
  ExternalLink,
  X,
  BarChart3,
} from "lucide-react";
import {
  listTrackedLinks,
  saveTrackedLink,
  deleteTrackedLink,
  getLinkClickSeries,
  attachLinkToPost,
  type TrackedLink,
  type ClickPoint,
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

type DraftLink = {
  id?: string;
  name: string;
  destination_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  platform: string;
  post_id: string | null;
};

const EMPTY_DRAFT: DraftLink = {
  name: "",
  destination_url: "https://golgetesisat.com",
  utm_source: "facebook",
  utm_medium: "social",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
  platform: "both",
  post_id: null,
};

function shortUrlFor(code: string): string {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://golgetesisat.com";
  return `${origin}/api/public/r/${code}`;
}

export function UtmStudioTab({ notify, posts }: { notify: Notify; posts: SocialPost[] }) {
  const fetchLinks = useServerFn(listTrackedLinks);
  const save = useServerFn(saveTrackedLink);
  const remove = useServerFn(deleteTrackedLink);
  const fetchSeries = useServerFn(getLinkClickSeries);
  const attach = useServerFn(attachLinkToPost);

  const [links, setLinks] = useState<TrackedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [draft, setDraft] = useState<DraftLink | null>(null);
  const [saving, setSaving] = useState(false);

  const [attachOpen, setAttachOpen] = useState<string | null>(null);
  const [series, setSeries] = useState<{ id: string; data: ClickPoint[] } | null>(null);
  const [seriesLoading, setSeriesLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setLinks(await fetchLinks());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load links");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalClicks = useMemo(() => links.reduce((s, l) => s + l.clicks, 0), [links]);

  async function onSaveDraft() {
    if (!draft) return;
    if (!draft.name.trim()) return notify("err", "Link name is required");
    if (!draft.destination_url.trim()) return notify("err", "Destination URL is required");
    setSaving(true);
    try {
      await save({ data: draft });
      notify("ok", draft.id ? "Link updated" : "Link created");
      setDraft(null);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this tracked link? Its click history will be removed.")) return;
    setBusyId(id);
    try {
      await remove({ data: { id } });
      setLinks((prev) => prev.filter((l) => l.id !== id));
      notify("ok", "Link deleted");
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

  async function onAttach(linkId: string, code: string, postId: string) {
    setBusyId(linkId);
    try {
      await attach({ data: { postId, linkId, shortUrl: shortUrlFor(code) } });
      notify("ok", "Short link added to post");
      setAttachOpen(null);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Attach failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onShowSeries(id: string) {
    if (series?.id === id) {
      setSeries(null);
      return;
    }
    setSeriesLoading(true);
    try {
      const data = await fetchSeries({ data: { id, days: 30 } });
      setSeries({ id, data });
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load stats");
    } finally {
      setSeriesLoading(false);
    }
  }

  const visible = links.filter((l) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      l.name.toLowerCase().includes(q) ||
      l.destination_url.toLowerCase().includes(q) ||
      (l.utm_campaign ?? "").toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q)
    );
  });

  const draftablePosts = posts.filter((p) => p.status === "draft" || p.status === "approved");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Link2 className="h-5 w-5 text-emerald-400" /> UTM Link Builder &amp; Tracking
          </h2>
          <p className="text-sm text-muted-foreground">
            UTM etiketli kısa linkler oluştur, tıklamaları say ve hangi kanalın trafik getirdiğini gör.
          </p>
        </div>
        <button
          onClick={() => setDraft({ ...EMPTY_DRAFT })}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/50 px-3.5 py-2 text-sm font-semibold transition hover:border-brand-red/40"
        >
          <Plus className="h-4 w-4" /> New link
        </button>
      </div>

      {/* Stats */}
      {!loading && links.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard label="Tracked links" value={links.length.toString()} />
          <StatCard label="Total clicks" value={totalClicks.toLocaleString()} />
          <StatCard
            label="Top link"
            value={
              [...links].sort((a, b) => b.clicks - a.clicks)[0]?.name?.slice(0, 18) ?? "—"
            }
          />
        </div>
      )}

      {/* Draft editor */}
      {draft && (
        <LinkEditor
          draft={draft}
          setDraft={setDraft}
          saving={saving}
          onSave={onSaveDraft}
          onCancel={() => setDraft(null)}
        />
      )}

      {/* Search */}
      {!loading && links.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search links…"
            className={cn(INPUT_CLS, "pl-9")}
          />
        </div>
      )}

      {/* Links */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : links.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 py-16 text-center text-sm text-muted-foreground">
          Henüz takip linki yok. Yukarıdan yeni bir UTM linki oluşturun.
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((l) => {
            const shortUrl = shortUrlFor(l.code);
            return (
              <div
                key={l.id}
                className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:border-brand-red/30"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-bold">{l.name}</p>
                      <span className="rounded-md border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {PLATFORM_LABEL[l.platform] ?? l.platform}
                      </span>
                      {l.utm_campaign && (
                        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-300">
                          {l.utm_campaign}
                        </span>
                      )}
                    </div>

                    {/* Short link */}
                    <div className="mt-2 flex items-center gap-2">
                      <code className="truncate rounded-md bg-background/60 px-2 py-1 text-[11px] text-sky-300">
                        {shortUrl}
                      </code>
                      <button
                        onClick={() => onCopy(`s-${l.id}`, shortUrl)}
                        className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                      >
                        {copied === `s-${l.id}` ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Destination */}
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      <span className="truncate">{l.target_url}</span>
                      <button
                        onClick={() => onCopy(`t-${l.id}`, l.target_url)}
                        className="shrink-0 font-semibold hover:text-foreground"
                      >
                        {copied === `t-${l.id}` ? "Copied" : "Copy full"}
                      </button>
                    </div>
                  </div>

                  {/* Clicks badge */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-background/50 px-3 py-1.5">
                      <MousePointerClick className="h-4 w-4 text-emerald-400" />
                      <span className="text-base font-bold">{l.clicks.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground">clicks</span>
                    </div>
                    {l.last_clicked_at && (
                      <span className="text-[10px] text-muted-foreground">
                        last {new Date(l.last_clicked_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Click series */}
                {series?.id === l.id && (
                  <ClickChart data={series.data} loading={seriesLoading} />
                )}

                {/* Actions */}
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/40 pt-3">
                  <button
                    onClick={() => onShowSeries(l.id)}
                    disabled={seriesLoading && series?.id !== l.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    {series?.id === l.id ? "Hide stats" : "Stats"}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setAttachOpen((o) => (o === l.id ? null : l.id))}
                      disabled={busyId === l.id || draftablePosts.length === 0}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red/15 px-2.5 py-1.5 text-xs font-semibold text-brand-red transition hover:bg-brand-red/25 disabled:opacity-50"
                    >
                      {busyId === l.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Link2 className="h-3.5 w-3.5" />
                      )}
                      Add to post
                    </button>
                    {attachOpen === l.id && draftablePosts.length > 0 && (
                      <div className="absolute bottom-full left-0 z-20 mb-2 max-h-56 w-64 overflow-y-auto rounded-xl border border-border/70 bg-card/95 p-1.5 shadow-2xl backdrop-blur">
                        {draftablePosts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => onAttach(l.id, l.code, p.id)}
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
                    onClick={() =>
                      setDraft({
                        id: l.id,
                        name: l.name,
                        destination_url: l.destination_url,
                        utm_source: l.utm_source ?? "",
                        utm_medium: l.utm_medium ?? "",
                        utm_campaign: l.utm_campaign ?? "",
                        utm_term: l.utm_term ?? "",
                        utm_content: l.utm_content ?? "",
                        platform: l.platform,
                        post_id: l.post_id,
                      })
                    }
                    className="ml-auto text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(l.id)}
                    disabled={busyId === l.id}
                    className="rounded-lg p-1.5 text-muted-foreground transition hover:text-destructive disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-2xl font-bold">{value}</p>
    </div>
  );
}

function ClickChart({ data, loading }: { data: ClickPoint[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="mt-3 flex items-center justify-center rounded-xl border border-border/50 bg-background/40 py-8 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }
  const max = Math.max(1, ...data.map((d) => d.clicks));
  const total = data.reduce((s, d) => s + d.clicks, 0);
  return (
    <div className="mt-3 rounded-xl border border-border/50 bg-background/40 p-3">
      <div className="mb-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Last 30 days</span>
        <span>{total} clicks</span>
      </div>
      <div className="flex h-20 items-end gap-0.5">
        {data.map((d) => (
          <div key={d.date} className="group relative flex-1" title={`${d.date}: ${d.clicks}`}>
            <div
              className="w-full rounded-sm bg-emerald-500/40 transition group-hover:bg-emerald-400"
              style={{ height: `${Math.max(2, (d.clicks / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkEditor({
  draft,
  setDraft,
  saving,
  onSave,
  onCancel,
}: {
  draft: DraftLink;
  setDraft: (d: DraftLink) => void;
  saving: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  function set<K extends keyof DraftLink>(key: K, val: DraftLink[K]) {
    setDraft({ ...draft, [key]: val });
  }

  // Live preview of the composed UTM URL
  let preview = "";
  try {
    const base = /^https?:\/\//i.test(draft.destination_url.trim())
      ? draft.destination_url.trim()
      : `https://${draft.destination_url.trim()}`;
    const url = new URL(base);
    const pairs: [string, string][] = [
      ["utm_source", draft.utm_source],
      ["utm_medium", draft.utm_medium],
      ["utm_campaign", draft.utm_campaign],
      ["utm_term", draft.utm_term],
      ["utm_content", draft.utm_content],
    ];
    for (const [k, v] of pairs) if (v.trim()) url.searchParams.set(k, v.trim());
    preview = url.toString();
  } catch {
    preview = "Invalid destination URL";
  }

  return (
    <div className="rounded-2xl border border-brand-red/30 bg-card/50 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold">{draft.id ? "Edit link" : "New tracked link"}</span>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted-foreground">Link name *</label>
          <input
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Kış kampanyası — Facebook"
            className={INPUT_CLS}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-muted-foreground">Destination URL *</label>
          <input
            value={draft.destination_url}
            onChange={(e) => set("destination_url", e.target.value)}
            placeholder="https://golgetesisat.com/hizmetler"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">utm_source</label>
          <input
            value={draft.utm_source}
            onChange={(e) => set("utm_source", e.target.value)}
            placeholder="facebook"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">utm_medium</label>
          <input
            value={draft.utm_medium}
            onChange={(e) => set("utm_medium", e.target.value)}
            placeholder="social"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">utm_campaign</label>
          <input
            value={draft.utm_campaign}
            onChange={(e) => set("utm_campaign", e.target.value)}
            placeholder="kis_kampanyasi"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">Platform</label>
          <select
            value={draft.platform}
            onChange={(e) => set("platform", e.target.value)}
            className={INPUT_CLS}
          >
            <option value="both">Both</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">utm_term (optional)</label>
          <input
            value={draft.utm_term}
            onChange={(e) => set("utm_term", e.target.value)}
            placeholder="tikaniklik acma"
            className={INPUT_CLS}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-muted-foreground">utm_content (optional)</label>
          <input
            value={draft.utm_content}
            onChange={(e) => set("utm_content", e.target.value)}
            placeholder="story_cta"
            className={INPUT_CLS}
          />
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-border/50 bg-background/40 p-3">
        <p className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">Preview</p>
        <code className="block break-all text-[11px] text-emerald-300">{preview}</code>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {draft.id ? "Update link" : "Create link"}
        </button>
      </div>
    </div>
  );
}
