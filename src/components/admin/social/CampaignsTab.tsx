import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Loader2,
  Megaphone,
  Plus,
  Trash2,
  Save,
  Pencil,
  X,
  Target,
  TrendingUp,
  FileText,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import {
  listCampaigns,
  saveCampaign,
  deleteCampaign,
  type CampaignWithStats,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const EMPTY = {
  id: undefined as string | undefined,
  name: "",
  goal: "",
  description: "",
  target_service: "",
  target_district: "",
  color: "#ef4444",
  status: "active",
  require_approval: false,
  starts_on: "",
  ends_on: "",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  paused: "Paused",
  completed: "Completed",
};

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6"];

export function CampaignsTab({ notify }: { notify: Notify }) {
  const fetchCampaigns = useServerFn(listCampaigns);
  const save = useServerFn(saveCampaign);
  const remove = useServerFn(deleteCampaign);

  const [campaigns, setCampaigns] = useState<CampaignWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<typeof EMPTY>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      setCampaigns(await fetchCampaigns());
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

  function openNew() {
    setForm(EMPTY);
    setShowForm(true);
  }

  function openEdit(c: CampaignWithStats) {
    setForm({
      id: c.id,
      name: c.name,
      goal: c.goal ?? "",
      description: c.description ?? "",
      target_service: c.target_service ?? "",
      target_district: c.target_district ?? "",
      color: c.color,
      status: c.status,
      require_approval: c.require_approval,
      starts_on: c.starts_on ?? "",
      ends_on: c.ends_on ?? "",
    });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      notify("err", "Campaign name is required");
      return;
    }
    setSaving(true);
    try {
      await save({ data: form });
      notify("ok", "Campaign saved");
      setShowForm(false);
      setForm(EMPTY);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this campaign? Posts will not be deleted, only the association will be removed.")) return;
    try {
      await remove({ data: { id } });
      notify("ok", "Campaign deleted");
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to delete");
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Megaphone className="h-4 w-4 text-brand-red" />
            Campaigns
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Group posts under strategic campaigns and track performance together.
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-xs font-bold text-white transition hover:opacity-90"
        >
          <Plus className="h-3.5 w-3.5" />
          New Campaign
        </button>
      </div>

      {showForm && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">{form.id ? "Edit campaign" : "New campaign"}</span>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input
              className={INPUT_CLS}
              placeholder="Campaign name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={INPUT_CLS}
              placeholder="Goal (e.g. Winter boiler maintenance)"
              value={form.goal}
              onChange={(e) => setForm({ ...form, goal: e.target.value })}
            />
            <input
              className={INPUT_CLS}
              placeholder="Target service (e.g. boiler repair)"
              value={form.target_service}
              onChange={(e) => setForm({ ...form, target_service: e.target.value })}
            />
            <input
              className={INPUT_CLS}
              placeholder="Target district (e.g. Kadıköy)"
              value={form.target_district}
              onChange={(e) => setForm({ ...form, target_district: e.target.value })}
            />
            <label className="text-xs text-muted-foreground">
              Start Date
              <input
                type="date"
                className={INPUT_CLS}
                value={form.starts_on}
                onChange={(e) => setForm({ ...form, starts_on: e.target.value })}
              />
            </label>
            <label className="text-xs text-muted-foreground">
              End Date
              <input
                type="date"
                className={INPUT_CLS}
                value={form.ends_on}
                onChange={(e) => setForm({ ...form, ends_on: e.target.value })}
              />
            </label>
            <select
              className={INPUT_CLS}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
            <div className="flex items-center gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm({ ...form, color: c })}
                  className={`h-6 w-6 rounded-full border-2 transition ${
                    form.color === c ? "border-foreground scale-110" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          <textarea
            className={`${INPUT_CLS} mt-3`}
            rows={2}
            placeholder="Description / notes"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <label className="mt-3 flex items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={form.require_approval}
              onChange={(e) => setForm({ ...form, require_approval: e.target.checked })}
            />
            Require approval before publishing (posts for this campaign will go to the review queue first)
          </label>
          <div className="mt-3 flex justify-end">

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
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
      ) : campaigns.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 py-16 text-center text-sm text-muted-foreground">
          No campaigns yet. Create your first campaign.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur"
              style={{ borderLeft: `4px solid ${c.color}` }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold">{c.name}</span>
                    <span className="shrink-0 rounded-full bg-background/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {STATUS_LABELS[c.status] ?? c.status}
                    </span>
                    {c.require_approval && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-bold text-purple-400">
                        <ShieldCheck className="h-2.5 w-2.5" /> Approved
                      </span>
                    )}
                  </div>
                  {c.goal && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Target className="h-3 w-3" /> {c.goal}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={() => openEdit(c)}
                    className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-background/60 hover:text-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-background/60 hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {(c.target_service || c.target_district || c.starts_on) && (
                <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
                  {c.target_service && (
                    <span className="rounded-full bg-background/60 px-2 py-0.5">{c.target_service}</span>
                  )}
                  {c.target_district && (
                    <span className="rounded-full bg-background/60 px-2 py-0.5">{c.target_district}</span>
                  )}
                  {(c.starts_on || c.ends_on) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-background/60 px-2 py-0.5">
                      <CalendarDays className="h-2.5 w-2.5" />
                      {c.starts_on ?? "?"} → {c.ends_on ?? "?"}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <Stat icon={FileText} label="Post" value={c.stats.total} />
                <Stat icon={CalendarDays} label="Scheduled" value={c.stats.scheduled} />
                <Stat icon={TrendingUp} label="Engagement" value={c.stats.engagement} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl bg-background/40 px-2 py-2">
      <Icon className="mx-auto h-3.5 w-3.5 text-brand-red" />
      <div className="mt-1 text-sm font-bold">{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
