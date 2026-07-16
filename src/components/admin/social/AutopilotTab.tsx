import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Rocket,
  Plus,
  Trash2,
  Save,
  Play,
  Power,
  Clock,
  Gauge,
  CalendarClock,
} from "lucide-react";
import {
  listScheduleSlots,
  saveScheduleSlot,
  deleteScheduleSlot,
  getAutopilotSettings,
  saveAutopilotSettings,
  runAutopilotNow,
  listVoiceProfiles,
  listCampaigns,
  type ScheduleSlot,
  type AutopilotSettings,
  type VoiceProfile,
  type CampaignWithStats,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const PLATFORM_LABELS: Record<string, string> = {
  both: "Facebook + Instagram",
  facebook: "Facebook",
  instagram: "Instagram",
};

export function AutopilotTab({ notify }: { notify: Notify }) {
  const fetchSettings = useServerFn(getAutopilotSettings);
  const saveSettings = useServerFn(saveAutopilotSettings);
  const runNow = useServerFn(runAutopilotNow);
  const fetchSlots = useServerFn(listScheduleSlots);
  const saveSlot = useServerFn(saveScheduleSlot);
  const removeSlot = useServerFn(deleteScheduleSlot);
  const fetchProfiles = useServerFn(listVoiceProfiles);
  const fetchCampaigns = useServerFn(listCampaigns);

  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<(AutopilotSettings & { queueDepth: number }) | null>(null);
  const [slots, setSlots] = useState<ScheduleSlot[]>([]);
  const [profiles, setProfiles] = useState<VoiceProfile[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignWithStats[]>([]);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [newSlot, setNewSlot] = useState({ platform: "both", day_of_week: 1, time_of_day: "09:00" });

  async function load() {
    setLoading(true);
    try {
      const [s, sl, vp, c] = await Promise.all([
        fetchSettings(),
        fetchSlots(),
        fetchProfiles(),
        fetchCampaigns(),
      ]);
      setSettings(s);
      setSlots(sl);
      setProfiles(vp);
      setCampaigns(c);
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

  function patch(p: Partial<AutopilotSettings>) {
    setSettings((s) => (s ? { ...s, ...p } : s));
  }

  async function persist(p: Partial<AutopilotSettings>) {
    if (!settings) return;
    patch(p);
    setSaving(true);
    try {
      await saveSettings({ data: { id: settings.id, ...p } });
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
      void load();
    } finally {
      setSaving(false);
    }
  }

  async function onSaveAll() {
    if (!settings) return;
    setSaving(true);
    try {
      await saveSettings({
        data: {
          id: settings.id,
          enabled: settings.enabled,
          cadence_per_week: settings.cadence_per_week,
          min_queue: settings.min_queue,
          batch_size: settings.batch_size,
          theme: settings.theme,
          platform: settings.platform,
          voice_profile_id: settings.voice_profile_id,
          campaign_id: settings.campaign_id,
        },
      });
      notify("ok", "Autopilot settings saved");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  async function onRunNow() {
    setRunning(true);
    try {
      const res = await runNow();
      notify(
        res.generated > 0 ? "ok" : "err",
        res.generated > 0
          ? `${res.generated} content generated and added to queue`
          : `No content generated (${res.reason})`,
      );
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to run");
    } finally {
      setRunning(false);
    }
  }

  async function onAddSlot() {
    try {
      await saveSlot({ data: newSlot });
      notify("ok", "Time slot added");
      setSlots(await fetchSlots());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to add");
    }
  }

  async function onToggleSlot(slot: ScheduleSlot) {
    try {
      await saveSlot({
        data: {
          id: slot.id,
          platform: slot.platform,
          day_of_week: slot.day_of_week,
          time_of_day: slot.time_of_day,
          active: !slot.active,
        },
      });
      setSlots((prev) => prev.map((s) => (s.id === slot.id ? { ...s, active: !s.active } : s)));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to update");
    }
  }

  async function onDeleteSlot(id: string) {
    try {
      await removeSlot({ data: { id } });
      setSlots((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to delete");
    }
  }

  const slotsByDay = useMemo(() => {
    const map = new Map<number, ScheduleSlot[]>();
    for (const s of slots) {
      const arr = map.get(s.day_of_week) ?? [];
      arr.push(s);
      map.set(s.day_of_week, arr);
    }
    return map;
  }, [slots]);

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  const queueLow = settings.queueDepth < settings.min_queue;

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-bold">
            <Rocket className="h-4 w-4 text-brand-red" />
            Autopilot & Smart Scheduling
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            When the queue is low, the system automatically generates content and schedules it for optimal times.
          </p>
        </div>
        <button
          onClick={onRunNow}
          disabled={running}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1.5 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
          Run Now
        </button>
      </div>

      {/* Master switch + status */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-3">
            <button
              onClick={() => persist({ enabled: !settings.enabled })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                settings.enabled ? "bg-brand-red" : "bg-background/80 border border-border/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  settings.enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="flex items-center gap-1.5 text-sm font-bold">
              <Power className="h-3.5 w-3.5" />
              Autopilot is {settings.enabled ? "on" : "off"}
            </span>
          </label>
          <div className="flex items-center gap-3 text-xs">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-bold ${
                queueLow ? "bg-amber-500/15 text-amber-500" : "bg-emerald-500/15 text-emerald-500"
              }`}
            >
              <CalendarClock className="h-3 w-3" />
              {settings.queueDepth} scheduled posts in queue
            </span>
          </div>
        </div>
        {settings.last_run_summary && (
          <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            Last run{settings.last_run_at ? ` (${new Date(settings.last_run_at).toLocaleString("en-US")})` : ""}:{" "}
            {settings.last_run_summary}
          </p>
        )}
      </div>

      {/* Cadence controls */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        <h3 className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
          <Gauge className="h-3.5 w-3.5" />
          Generation Rules
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Weekly post count</span>
            <input
              type="number"
              min={1}
              max={30}
              className={INPUT_CLS}
              value={settings.cadence_per_week}
              onChange={(e) => patch({ cadence_per_week: Number(e.target.value) })}
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Min. queue threshold</span>
            <input
              type="number"
              min={1}
              max={30}
              className={INPUT_CLS}
              value={settings.min_queue}
              onChange={(e) => patch({ min_queue: Number(e.target.value) })}
            />
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Generation per run (batch)</span>
            <input
              type="number"
              min={1}
              max={10}
              className={INPUT_CLS}
              value={settings.batch_size}
              onChange={(e) => patch({ batch_size: Number(e.target.value) })}
            />
          </label>
          <label className="space-y-1 sm:col-span-2 lg:col-span-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Platform</span>
            <select
              className={INPUT_CLS}
              value={settings.platform}
              onChange={(e) => patch({ platform: e.target.value })}
            >
              <option value="both">Facebook + Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Persona</span>
            <select
              className={INPUT_CLS}
              value={settings.voice_profile_id ?? ""}
              onChange={(e) => patch({ voice_profile_id: e.target.value || null })}
            >
              <option value="">Default</option>
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground">Campaign</span>
            <select
              className={INPUT_CLS}
              value={settings.campaign_id ?? ""}
              onChange={(e) => patch({ campaign_id: e.target.value || null })}
            >
              <option value="">None</option>
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1 sm:col-span-2 lg:col-span-3">
            <span className="text-[11px] font-semibold text-muted-foreground">Theme (leave empty for various angles)</span>
            <input
              className={INPUT_CLS}
              placeholder="e.g. winter boiler maintenance campaign"
              value={settings.theme ?? ""}
              onChange={(e) => patch({ theme: e.target.value })}
            />
          </label>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            onClick={onSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            Save Settings
          </button>
        </div>
      </div>

      {/* Weekly schedule */}
      <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
        <h3 className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          Weekly Publishing Times
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Generated content is placed into these time slots sequentially.
        </p>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <select
            className={`${INPUT_CLS} w-auto`}
            value={newSlot.day_of_week}
            onChange={(e) => setNewSlot({ ...newSlot, day_of_week: Number(e.target.value) })}
          >
            {DAYS.map((d, i) => (
              <option key={i} value={i}>
                {d}
              </option>
            ))}
          </select>
          <input
            type="time"
            className={`${INPUT_CLS} w-auto`}
            value={newSlot.time_of_day}
            onChange={(e) => setNewSlot({ ...newSlot, time_of_day: e.target.value })}
          />
          <select
            className={`${INPUT_CLS} w-auto`}
            value={newSlot.platform}
            onChange={(e) => setNewSlot({ ...newSlot, platform: e.target.value })}
          >
            <option value="both">Both</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
          </select>
          <button
            onClick={onAddSlot}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground/90 px-3.5 py-2 text-xs font-bold text-background transition hover:opacity-90"
          >
            <Plus className="h-3.5 w-3.5" />
            Add
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DAYS.map((day, i) => {
            const daySlots = slotsByDay.get(i) ?? [];
            if (daySlots.length === 0) return null;
            return (
              <div key={i} className="rounded-xl border border-border/50 bg-background/40 p-3">
                <span className="text-xs font-bold">{day}</span>
                <div className="mt-2 space-y-1.5">
                  {daySlots.map((s) => (
                    <div
                      key={s.id}
                      className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1 text-[11px] ${
                        s.active ? "bg-card/60" : "bg-card/30 opacity-50"
                      }`}
                    >
                      <span className="font-mono font-semibold">{s.time_of_day}</span>
                      <span className="truncate text-muted-foreground">{PLATFORM_LABELS[s.platform]}</span>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          onClick={() => onToggleSlot(s)}
                          className="rounded p-1 text-muted-foreground transition hover:text-foreground"
                          title={s.active ? "Deactivate" : "Activate"}
                        >
                          <Power className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => onDeleteSlot(s.id)}
                          className="rounded p-1 text-muted-foreground transition hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {slots.length === 0 && (
            <p className="text-xs text-muted-foreground">No time slots yet. Add some above.</p>
          )}
        </div>
      </div>
    </section>
  );
}
