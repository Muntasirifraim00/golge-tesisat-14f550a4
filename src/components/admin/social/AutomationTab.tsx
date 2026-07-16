import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  ShieldAlert,
  Power,
  Loader2,
  Plus,
  Trash2,
  Play,
  Bell,
  ScrollText,
  AlertTriangle,
  Info,
  Zap,
  Check,
  Mail,
} from "lucide-react";
import {
  getAutomationSettings,
  saveAutomationSettings,
  listAutomationRules,
  saveAutomationRule,
  deleteAutomationRule,
  runAutomationNow,
  listAlerts,
  markAlertsRead,
  clearAlerts,
  listAuditLog,
  type AutomationSettings,
  type AutomationRule,
  type AutomationAlert,
  type AuditEntry,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const TRIGGERS: { id: string; label: string; help: string; unit: string }[] = [
  { id: "failed_publish", label: "Failed publish", help: "When the threshold of failed posts in the last 24 hours is exceeded", unit: "count" },
  { id: "low_engagement", label: "Low engagement", help: "Posts below this engagement in the last 7 days", unit: "engagement" },
  { id: "negative_comment", label: "Negative comment/DM", help: "Number of open negative or priority conversations", unit: "count" },
  { id: "milestone", label: "Milestone", help: "Celebrate when total engagement exceeds this number", unit: "engagement" },
];

const ACTIONS: { id: string; label: string }[] = [
  { id: "notify", label: "Create alert" },
  { id: "pause_autopilot", label: "Pause autopilot + alert" },
];

function triggerLabel(id: string) {
  return TRIGGERS.find((t) => t.id === id)?.label ?? id;
}
function actionLabel(id: string) {
  return ACTIONS.find((a) => a.id === id)?.label ?? id;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  return `${Math.floor(hr / 24)} days ago`;
}

export function AutomationTab({ notify }: { notify: Notify }) {
  const fetchSettings = useServerFn(getAutomationSettings);
  const saveSettings = useServerFn(saveAutomationSettings);
  const fetchRules = useServerFn(listAutomationRules);
  const saveRule = useServerFn(saveAutomationRule);
  const removeRule = useServerFn(deleteAutomationRule);
  const runNow = useServerFn(runAutomationNow);
  const fetchAlerts = useServerFn(listAlerts);
  const markRead = useServerFn(markAlertsRead);
  const clearAll = useServerFn(clearAlerts);
  const fetchAudit = useServerFn(listAuditLog);

  const [settings, setSettings] = useState<AutomationSettings | null>(null);
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [alerts, setAlerts] = useState<AutomationAlert[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);

  // New rule form
  const [showForm, setShowForm] = useState(false);
  const [rName, setRName] = useState("");
  const [rTrigger, setRTrigger] = useState("failed_publish");
  const [rThreshold, setRThreshold] = useState(1);
  const [rAction, setRAction] = useState("notify");

  async function load() {
    try {
      const [s, r, a, au] = await Promise.all([fetchSettings(), fetchRules(), fetchAlerts(), fetchAudit()]);
      setSettings(s);
      setRules(r);
      setAlerts(a.alerts);
      setAudit(au);
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

  async function persistSettings(patch: Partial<AutomationSettings>) {
    if (!settings) return;
    const next = { ...settings, ...patch };
    setSettings(next);
    setSaving(true);
    try {
      const saved = await saveSettings({
        data: {
          id: next.id,
          master_enabled: next.master_enabled,
          email_alerts: next.email_alerts,
          alert_email: next.alert_email ?? "",
        },
      });
      setSettings(saved);
      notify("ok", patch.master_enabled === false ? "All automation stopped 🛑" : "Saved");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
      void load();
    } finally {
      setSaving(false);
    }
  }

  async function onAddRule() {
    if (!rName.trim()) {
      notify("err", "Rule name is required");
      return;
    }
    try {
      const created = await saveRule({
        data: { name: rName.trim(), trigger: rTrigger, threshold: rThreshold, action: rAction },
      });
      setRules((prev) => [created, ...prev]);
      setRName("");
      setRThreshold(1);
      setShowForm(false);
      notify("ok", "Rule added");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to add");
    }
  }

  async function onToggleRule(rule: AutomationRule) {
    try {
      const updated = await saveRule({
        data: {
          id: rule.id,
          name: rule.name,
          trigger: rule.trigger,
          threshold: rule.threshold,
          action: rule.action,
          action_param: rule.action_param ?? undefined,
          active: !rule.active,
        },
      });
      setRules((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to update");
    }
  }

  async function onDeleteRule(rule: AutomationRule) {
    if (!confirm(`Delete rule "${rule.name}"?`)) return;
    try {
      await removeRule({ data: { id: rule.id } });
      setRules((prev) => prev.filter((r) => r.id !== rule.id));
      notify("ok", "Rule deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to delete");
    }
  }

  async function onRunNow() {
    setRunning(true);
    try {
      const res = await runNow({});
      notify("ok", `${res.evaluated} rules evaluated, ${res.triggered} triggered`);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to run");
    } finally {
      setRunning(false);
    }
  }

  async function onMarkAllRead() {
    try {
      await markRead({ data: { all: true } });
      setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Error");
    }
  }

  async function onClearAlerts() {
    if (!confirm("Clear all alerts?")) return;
    try {
      await clearAll({});
      setAlerts([]);
      notify("ok", "Alerts cleared");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Error");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
      </div>
    );
  }

  const halted = settings ? !settings.master_enabled : false;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <ShieldAlert className="h-5 w-5 text-primary" /> Automation & Control
        </h2>
        <p className="text-sm text-muted-foreground">
          Master switch, "if this happens, do that" rules, alerts, and audit log.
        </p>
      </div>

      {/* Master kill-switch */}
      <div
        className={`rounded-lg border p-4 shadow-sm ${
          halted ? "border-destructive bg-destructive/5" : "border-emerald-500/40 bg-emerald-500/5"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-full ${
                halted ? "bg-destructive/15 text-destructive" : "bg-emerald-500/15 text-emerald-600"
              }`}
            >
              <Power className="h-5 w-5" />
            </span>
            <div>
              <p className="font-semibold">{halted ? "Automation STOPPED" : "Automation Active"}</p>
              <p className="text-sm text-muted-foreground">
                {halted
                  ? "All automatic generation, publishing, and rules are paused."
                  : "Autopilot, scheduled publishing, and rules are operating normally."}
              </p>
            </div>
          </div>
          <button
            onClick={() => persistSettings({ master_enabled: halted })}
            disabled={saving}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 ${
              halted ? "bg-emerald-600 hover:opacity-90" : "bg-destructive hover:opacity-90"
            }`}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Power className="h-4 w-4" />}
            {halted ? "Enable Automation" : "Emergency Stop"}
          </button>
        </div>

        {settings && (
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border/40 pt-3 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.email_alerts}
                onChange={(e) => persistSettings({ email_alerts: e.target.checked })}
              />
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>Send email for critical alerts</span>
            </label>
            {settings.email_alerts && (
              <input
                type="email"
                value={settings.alert_email ?? ""}
                onChange={(e) => setSettings({ ...settings, alert_email: e.target.value })}
                onBlur={(e) => persistSettings({ alert_email: e.target.value })}
                placeholder="alert@shadowsystems.com"
                className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
              />
            )}
          </div>
        )}
      </div>

      {/* Rules */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Zap className="h-4 w-4 text-primary" /> Rules
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onRunNow}
              disabled={running}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-50"
            >
              {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
              Evaluate Now
            </button>
            <button
              onClick={() => setShowForm((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> New Rule
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-4 grid gap-3 rounded-md border border-border bg-background p-3 sm:grid-cols-2">
            <input
              value={rName}
              onChange={(e) => setRName(e.target.value)}
              placeholder="Rule name"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm sm:col-span-2"
            />
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              Trigger
              <select
                value={rTrigger}
                onChange={(e) => setRTrigger(e.target.value)}
                className="rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
              >
                {TRIGGERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs text-muted-foreground">
              Threshold ({TRIGGERS.find((t) => t.id === rTrigger)?.unit})
              <input
                type="number"
                min={0}
                value={rThreshold}
                onChange={(e) => setRThreshold(Number(e.target.value))}
                className="rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
              />
            </label>
            <label className="flex flex-col gap-1 text-xs text-muted-foreground sm:col-span-2">
              Action
              <select
                value={rAction}
                onChange={(e) => setRAction(e.target.value)}
                className="rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
              >
                {ACTIONS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-xs text-muted-foreground sm:col-span-2">
              {TRIGGERS.find((t) => t.id === rTrigger)?.help}
            </p>
            <div className="sm:col-span-2">
              <button
                onClick={onAddRule}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Check className="h-4 w-4" /> Save Rule
              </button>
            </div>
          </div>
        )}

        {rules.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No rules yet.</p>
        ) : (
          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    {rule.name}
                    {!rule.active && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">inactive</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {triggerLabel(rule.trigger)} ≥ {rule.threshold} → {actionLabel(rule.action)}
                    {rule.trigger_count > 0 && ` · triggered ${rule.trigger_count}x`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleRule(rule)}
                    className="rounded-md border border-border px-2 py-1 text-xs hover:bg-muted"
                  >
                    {rule.active ? "Pause" : "Activate"}
                  </button>
                  <button
                    onClick={() => onDeleteRule(rule)}
                    className="rounded-md border border-destructive/40 p-1.5 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Alerts */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Bell className="h-4 w-4 text-primary" /> Alerts
            {alerts.some((a) => !a.read) && (
              <span className="rounded-full bg-brand-red px-1.5 py-0.5 text-[10px] font-bold text-white">
                {alerts.filter((a) => !a.read).length}
              </span>
            )}
          </h3>
          {alerts.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <button onClick={onMarkAllRead} className="rounded-md border border-border px-2 py-1 hover:bg-muted">
                Mark all as read
              </button>
              <button
                onClick={onClearAlerts}
                className="rounded-md border border-border px-2 py-1 hover:bg-muted"
              >
                Clear
              </button>
            </div>
          )}
        </div>
        {alerts.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No alerts. Everything is fine ✅</p>
        ) : (
          <div className="space-y-2">
            {alerts.map((a) => (
              <div
                key={a.id}
                className={`flex items-start gap-3 rounded-md border px-3 py-2 ${
                  a.read ? "border-border bg-background" : "border-primary/30 bg-primary/5"
                }`}
              >
                <span
                  className={`mt-0.5 ${
                    a.severity === "critical"
                      ? "text-destructive"
                      : a.severity === "warn"
                        ? "text-amber-600"
                        : "text-sky-600"
                  }`}
                >
                  {a.severity === "info" ? <Info className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{a.title}</p>
                  {a.body && <p className="text-xs text-muted-foreground">{a.body}</p>}
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(a.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Audit log */}
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <ScrollText className="h-4 w-4 text-primary" /> Audit Log
        </h3>
        {audit.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No entries yet.</p>
        ) : (
          <div className="max-h-80 space-y-1 overflow-y-auto">
            {audit.map((e) => (
              <div key={e.id} className="flex items-center gap-3 border-b border-border/40 py-1.5 text-xs last:border-0">
                <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {e.actor === "system" ? "system" : "admin"}
                </span>
                <span className="min-w-0 flex-1 truncate text-foreground/90">
                  <span className="font-medium">{e.action}</span>
                  {e.detail ? ` — ${e.detail}` : ""}
                </span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(e.created_at)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
