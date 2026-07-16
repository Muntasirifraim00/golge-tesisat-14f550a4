import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  FlaskConical,
  Loader2,
  Sparkles,
  Trophy,
  Trash2,
  Send,
  RefreshCw,
  RotateCcw,
  Crown,
  CheckCircle2,
} from "lucide-react";
import {
  listExperiments,
  createExperiment,
  completeExperiment,
  reopenExperiment,
  deleteExperiment,
  publishSocialPostNow,
  refreshAnalytics,
  listVoiceProfiles,
  listCampaigns,
  type Experiment,
  type ExperimentVariant,
  type VoiceProfile,
  type CampaignWithStats,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

export function ExperimentsTab({ notify }: { notify: Notify }) {
  const fetchList = useServerFn(listExperiments);
  const create = useServerFn(createExperiment);
  const complete = useServerFn(completeExperiment);
  const reopen = useServerFn(reopenExperiment);
  const remove = useServerFn(deleteExperiment);
  const publish = useServerFn(publishSocialPostNow);
  const refresh = useServerFn(refreshAnalytics);
  const fetchProfiles = useServerFn(listVoiceProfiles);
  const fetchCampaigns = useServerFn(listCampaigns);

  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [profiles, setProfiles] = useState<VoiceProfile[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  // Create form
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [variantCount, setVariantCount] = useState(2);
  const [platform, setPlatform] = useState<"both" | "facebook" | "instagram">("both");
  const [voiceId, setVoiceId] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [withImage, setWithImage] = useState(true);

  async function load() {
    try {
      const [exps, vps, camps] = await Promise.all([fetchList(), fetchProfiles(), fetchCampaigns()]);
      setExperiments(exps);
      setProfiles(vps);
      setCampaigns(camps);
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

  async function onCreate() {
    if (!name.trim()) {
      notify("err", "Experiment name is required");
      return;
    }
    setCreating(true);
    try {
      const exp = await create({
        data: {
          name: name.trim(),
          idea: idea.trim() || undefined,
          hypothesis: hypothesis.trim() || undefined,
          variantCount,
          platform,
          voiceProfileId: voiceId || null,
          campaignId: campaignId || null,
          withImage,
        },
      });
      setExperiments((prev) => [exp, ...prev]);
      setName("");
      setIdea("");
      setHypothesis("");
      notify("ok", "A/B experiment created 🧪");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to create");
    } finally {
      setCreating(false);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    try {
      const res = await refresh();
      notify("ok", `${res.updated} posts updated${res.failed ? `, ${res.failed} errors` : ""}`);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to update");
    } finally {
      setRefreshing(false);
    }
  }

  async function onPublish(v: ExperimentVariant) {
    if (!v.post_id) return;
    setBusyId(v.id);
    try {
      const res = await publish({ data: { id: v.post_id } });
      if (res.ok) {
        notify("ok", "Variant published ✅");
        await load();
      } else {
        notify("err", res.error ?? "Failed to publish");
      }
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to publish");
    } finally {
      setBusyId(null);
    }
  }

  async function onPickWinner(exp: Experiment, v: ExperimentVariant, promoteId: string) {
    if (!v.post_id) return;
    setBusyId(v.id);
    try {
      const updated = await complete({
        data: { id: exp.id, winnerPostId: v.post_id, promoteToVoiceProfileId: promoteId || null },
      });
      setExperiments((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      notify("ok", promoteId ? "Winner selected and persona updated 🏆" : "Winner selected 🏆");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to select");
    } finally {
      setBusyId(null);
    }
  }

  async function onReopen(exp: Experiment) {
    setBusyId(exp.id);
    try {
      const updated = await reopen({ data: { id: exp.id } });
      setExperiments((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      notify("ok", "Experiment reopened");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to reopen");
    } finally {
      setBusyId(null);
    }
  }

  async function onDelete(exp: Experiment) {
    if (!confirm(`Delete "${exp.name}" experiment? Unpublished variant drafts will also be deleted.`)) return;
    setBusyId(exp.id);
    try {
      await remove({ data: { id: exp.id } });
      setExperiments((prev) => prev.filter((e) => e.id !== exp.id));
      notify("ok", "Experiment deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setBusyId(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <FlaskConical className="h-5 w-5 text-primary" /> A/B Tests
          </h2>
          <p className="text-sm text-muted-foreground">
            Generate different text variants for a single idea, publish them, and choose the winner.
          </p>
        </div>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
        >
          {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Refresh Metrics
        </button>
      </div>

      {/* Create form */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" /> New Experiment
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Experiment name (e.g., Boiler maintenance hook)"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm sm:col-span-2"
          />
          <input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Idea / topic (AI chooses if left blank)"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <input
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
            placeholder="Hypothesis (e.g., Emphasizing urgency gets more engagement)"
            className="rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Variant:</span>
            <select
              value={variantCount}
              onChange={(e) => setVariantCount(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-2 py-2 text-sm"
            >
              {[2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Platform:</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as typeof platform)}
              className="rounded-md border border-border bg-background px-2 py-2 text-sm"
            >
              <option value="both">Facebook + Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Persona:</span>
            <select
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
              className="rounded-md border border-border bg-background px-2 py-2 text-sm"
            >
              <option value="">Default</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Campaign:</span>
            <select
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              className="rounded-md border border-border bg-background px-2 py-2 text-sm"
            >
              <option value="">None</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm sm:col-span-2">
            <input type="checkbox" checked={withImage} onChange={(e) => setWithImage(e.target.checked)} />
            <span>Generate a common AI image (all variants share the same image)</span>
          </label>
        </div>
        <div className="mt-3">
          <button
            onClick={onCreate}
            disabled={creating}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {creating ? "Generating…" : "Create Experiment"}
          </button>
        </div>
      </div>

      {/* Experiment list */}
      {experiments.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No experiments yet. Create your first A/B test from above.
        </div>
      ) : (
        <div className="space-y-4">
          {experiments.map((exp) => (
            <ExperimentCard
              key={exp.id}
              exp={exp}
              profiles={profiles}
              busyId={busyId}
              onPublish={onPublish}
              onPickWinner={onPickWinner}
              onReopen={onReopen}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ExperimentCard({
  exp,
  profiles,
  busyId,
  onPublish,
  onPickWinner,
  onReopen,
  onDelete,
}: {
  exp: Experiment;
  profiles: VoiceProfile[];
  busyId: string | null;
  onPublish: (v: ExperimentVariant) => void;
  onPickWinner: (exp: Experiment, v: ExperimentVariant, promoteId: string) => void;
  onReopen: (exp: Experiment) => void;
  onDelete: (exp: Experiment) => void;
}) {
  const [promoteId, setPromoteId] = useState("");
  const completed = exp.status === "completed";

  const best = useMemo(() => {
    let id: string | null = null;
    let max = -1;
    for (const v of exp.variants) {
      if (v.engagement > max) {
        max = v.engagement;
        id = v.id;
      }
    }
    return max > 0 ? id : null;
  }, [exp.variants]);

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{exp.name}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                completed ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"
              }`}
            >
              {completed ? "Completed" : "Running"}
            </span>
          </div>
          {exp.hypothesis && <p className="mt-1 text-sm text-muted-foreground">💡 {exp.hypothesis}</p>}
        </div>
        <div className="flex items-center gap-2">
          {completed && (
            <button
              onClick={() => onReopen(exp)}
              disabled={busyId === exp.id}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1.5 text-xs hover:bg-muted disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reopen
            </button>
          )}
          <button
            onClick={() => onDelete(exp)}
            disabled={busyId === exp.id}
            className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-2 py-1.5 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {exp.variants.map((v) => {
          const isWinner = completed && exp.winner_post_id === v.post_id;
          const isLeading = !completed && best === v.id;
          return (
            <div
              key={v.id}
              className={`flex flex-col rounded-md border p-3 ${
                isWinner ? "border-emerald-500 bg-emerald-500/5" : "border-border bg-background"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                    {v.label}
                  </span>
                  {v.is_control && <span className="text-xs text-muted-foreground">(control)</span>}
                  {isWinner && <Crown className="h-4 w-4 text-emerald-600" />}
                  {isLeading && <span className="text-xs text-amber-600">leading</span>}
                </span>
                <span className="text-sm font-semibold text-primary">{v.engagement} engagement</span>
              </div>

              {v.post?.image_url && (
                <img
                  src={v.post.image_url}
                  alt={v.label}
                  className="mb-2 h-28 w-full rounded object-cover"
                  loading="lazy"
                />
              )}
              <p className="line-clamp-4 flex-1 whitespace-pre-wrap text-sm text-foreground/90">
                {v.post?.caption ?? "—"}
              </p>
              {v.post?.hashtags && (
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{v.post.hashtags}</p>
              )}

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`rounded px-1.5 py-0.5 text-xs ${
                    v.post?.status === "posted"
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {v.post?.status === "posted" ? "Posted" : "Draft"}
                </span>
                {!completed && v.post?.status !== "posted" && (
                  <button
                    onClick={() => onPublish(v)}
                    disabled={busyId === v.id}
                    className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover:bg-muted disabled:opacity-50"
                  >
                    {busyId === v.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                    Publish
                  </button>
                )}
                {!completed && (
                  <button
                    onClick={() => onPickWinner(exp, v, promoteId)}
                    disabled={busyId === v.id || !v.post_id}
                    className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
                  >
                    <Trophy className="h-3.5 w-3.5" /> Pick Winner
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!completed && profiles.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Learn when picking winner →</span>
          <select
            value={promoteId}
            onChange={(e) => setPromoteId(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm"
          >
            <option value="">Do not update persona</option>
            {profiles.map((p) => (
              <option key={p.id} value={p.id}>
                Add to {p.name} persona
              </option>
            ))}
          </select>
        </div>
      )}

      {completed && exp.winner_post_id && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-600">
          <CheckCircle2 className="h-4 w-4" /> Winning variant selected and saved as example.
        </p>
      )}
    </div>
  );
}
