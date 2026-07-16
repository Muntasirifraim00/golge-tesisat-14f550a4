import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Loader2,
  MessageCircle,
  Plus,
  Trash2,
  Save,
  Power,
  Sparkles,
  RefreshCw,
  MessageSquare,
  AtSign,
  Pencil,
} from "lucide-react";
import {
  getAutoReplySettings,
  saveAutoReplySettings,
  listAutoReplyRules,
  saveAutoReplyRule,
  deleteAutoReplyRule,
  listAutoReplyLogs,
  type AutoReplySettings,
  type AutoReplyRule,
  type AutoReplyLog,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const EMPTY_RULE = {
  id: undefined as string | undefined,
  keyword: "",
  response: "",
  platform: "both",
  match_type: "contains",
  channel: "both",
  active: true,
  priority: 0,
};

export function AutoReplyTab({ notify }: { notify: Notify }) {
  const fetchSettings = useServerFn(getAutoReplySettings);
  const saveSettings = useServerFn(saveAutoReplySettings);
  const fetchRules = useServerFn(listAutoReplyRules);
  const saveRule = useServerFn(saveAutoReplyRule);
  const removeRule = useServerFn(deleteAutoReplyRule);
  const fetchLogs = useServerFn(listAutoReplyLogs);

  const [settings, setSettings] = useState<AutoReplySettings | null>(null);
  const [rules, setRules] = useState<AutoReplyRule[]>([]);
  const [logs, setLogs] = useState<AutoReplyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [form, setForm] = useState<typeof EMPTY_RULE>(EMPTY_RULE);
  const [savingRule, setSavingRule] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [s, r, l] = await Promise.all([fetchSettings(), fetchRules(), fetchLogs()]);
      setSettings(s);
      setRules(r);
      setLogs(l);
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

  async function persistSettings(next: AutoReplySettings) {
    setSettings(next);
    setSavingSettings(true);
    try {
      await saveSettings({ data: next });
      notify("ok", "Settings saved");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSavingSettings(false);
    }
  }

  async function submitRule() {
    setSavingRule(true);
    try {
      await saveRule({ data: form });
      notify("ok", form.id ? "Rule updated" : "Rule added");
      setForm(EMPTY_RULE);
      setRules(await fetchRules());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to save rule");
    } finally {
      setSavingRule(false);
    }
  }

  async function onDeleteRule(id: string) {
    try {
      await removeRule({ data: { id } });
      setRules((prev) => prev.filter((r) => r.id !== id));
      if (form.id === id) setForm(EMPTY_RULE);
      notify("ok", "Rule deleted");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to delete");
    }
  }

  if (loading) {
    return <div className="h-72 animate-pulse rounded-2xl border border-border/60 bg-card/50" />;
  }

  return (
    <div className="space-y-6">
      {/* Settings */}
      {settings && (
        <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold">
              <MessageCircle className="h-4 w-4 text-brand-red" /> Auto-Reply Engine
            </div>
            {savingSettings && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>

          <button
            onClick={() => persistSettings({ ...settings, enabled: !settings.enabled })}
            className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
              settings.enabled
                ? "border-emerald-500/40 bg-emerald-500/10"
                : "border-border/60 bg-background/40"
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              <Power className={`h-5 w-5 ${settings.enabled ? "text-emerald-500" : "text-muted-foreground"}`} />
              {settings.enabled ? "Auto-reply ON" : "Auto-reply OFF"}
            </div>
            <span
              className={`relative h-6 w-11 rounded-full transition ${
                settings.enabled ? "bg-emerald-500" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                  settings.enabled ? "left-[22px]" : "left-0.5"
                }`}
              />
            </span>
          </button>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Toggle
              label="Reply to comments"
              icon={AtSign}
              on={settings.reply_to_comments}
              onClick={() => persistSettings({ ...settings, reply_to_comments: !settings.reply_to_comments })}
            />
            <Toggle
              label="Reply to messages"
              icon={MessageSquare}
              on={settings.reply_to_messages}
              onClick={() => persistSettings({ ...settings, reply_to_messages: !settings.reply_to_messages })}
            />
            <Toggle
              label="AI reply generation"
              icon={Sparkles}
              on={settings.ai_enabled}
              onClick={() => persistSettings({ ...settings, ai_enabled: !settings.ai_enabled })}
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs font-bold text-muted-foreground">
              Fallback reply (if no rule matches and AI is off)
            </label>
            <textarea
              value={settings.fallback_reply}
              onChange={(e) => setSettings({ ...settings, fallback_reply: e.target.value })}
              onBlur={() => persistSettings(settings)}
              rows={2}
              className="w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50"
            />
          </div>
        </div>
      )}

      {/* Rule editor */}
      <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-bold">
          <Pencil className="h-4 w-4 text-brand-red" /> {form.id ? "Edit Rule" : "New Rule"}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Keyword">
            <input
              value={form.keyword}
              onChange={(e) => setForm({ ...form, keyword: e.target.value })}
              placeholder="e.g. price, appointment, urgent"
              className={INPUT_CLS}
            />
          </Field>
          <Field label="Match type">
            <select
              value={form.match_type}
              onChange={(e) => setForm({ ...form, match_type: e.target.value })}
              className={INPUT_CLS}
            >
              <option value="contains">Contains</option>
              <option value="exact">Exact match</option>
              <option value="starts_with">Starts with</option>
            </select>
          </Field>
          <Field label="Platform">
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className={INPUT_CLS}
            >
              <option value="both">Both</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
            </select>
          </Field>
          <Field label="Channel">
            <select
              value={form.channel}
              onChange={(e) => setForm({ ...form, channel: e.target.value })}
              className={INPUT_CLS}
            >
              <option value="both">Comment + Message</option>
              <option value="comment">Only comment</option>
              <option value="message">Only message</option>
            </select>
          </Field>
          <Field label="Priority (higher first)">
            <input
              type="number"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: Number(e.target.value) || 0 })}
              className={INPUT_CLS}
            />
          </Field>
          <div className="flex items-end">
            <Toggle
              label={form.active ? "Active" : "Inactive"}
              icon={Power}
              on={form.active}
              onClick={() => setForm({ ...form, active: !form.active })}
            />
          </div>
        </div>
        <Field label="Reply text" className="mt-3">
          <textarea
            value={form.response}
            onChange={(e) => setForm({ ...form, response: e.target.value })}
            rows={2}
            placeholder="Pre-written response to send when this rule matches"
            className={INPUT_CLS}
          />
        </Field>
        <div className="mt-3 flex gap-2">
          <button
            onClick={submitRule}
            disabled={savingRule}
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {savingRule ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : form.id ? <Save className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            {form.id ? "Update" : "Add Rule"}
          </button>
          {form.id && (
            <button
              onClick={() => setForm(EMPTY_RULE)}
              className="rounded-lg border border-border/60 px-4 py-2 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Rules list */}
      <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
        <div className="mb-3 text-sm font-bold">Rules ({rules.length})</div>
        {rules.length === 0 && <p className="text-sm text-muted-foreground">No rules yet.</p>}
        <div className="space-y-2">
          {rules.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 px-3.5 py-3"
            >
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${r.active ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 text-sm font-semibold">
                  <span className="truncate">{r.keyword}</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                    {r.match_type}
                  </span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                    {r.platform}
                  </span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                    {r.channel}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.response}</p>
              </div>
              <button
                onClick={() =>
                  setForm({
                    id: r.id,
                    keyword: r.keyword,
                    response: r.response,
                    platform: r.platform,
                    match_type: r.match_type,
                    channel: r.channel,
                    active: r.active,
                    priority: r.priority,
                  })
                }
                className="rounded-lg p-1.5 text-muted-foreground transition hover:text-brand-red"
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDeleteRule(r.id)}
                className="rounded-lg p-1.5 text-muted-foreground transition hover:text-destructive"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent auto-replies */}
      <div className="rounded-2xl border border-border/60 bg-card/50 p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-bold">Recent Auto-Replies</div>
          <button
            onClick={() => void load()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
        {logs.length === 0 && <p className="text-sm text-muted-foreground">No auto-replies sent yet.</p>}
        <div className="space-y-2">
          {logs.map((l) => (
            <div key={l.id} className="rounded-xl border border-border/60 bg-background/40 px-3.5 py-2.5 text-sm">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="rounded bg-muted px-1.5 py-0.5 font-bold uppercase text-muted-foreground">
                  {l.platform}
                </span>
                <span className="rounded bg-muted px-1.5 py-0.5 font-bold uppercase text-muted-foreground">
                  {l.kind === "comment" ? "comment" : "message"}
                </span>
                <span
                  className={`rounded px-1.5 py-0.5 font-bold uppercase ${
                    l.status === "sent" ? "bg-emerald-500/15 text-emerald-500" : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {l.status === "sent" ? "sent" : "error"}
                </span>
                <span className="ml-auto text-muted-foreground">
                  {new Date(l.created_at).toLocaleString("en-US")}
                </span>
              </div>
              {l.incoming_text && <p className="mt-1 text-muted-foreground">💬 {l.incoming_text}</p>}
              {l.reply_text && <p className="mt-0.5 font-medium">↳ {l.reply_text}</p>}
              {l.error && <p className="mt-0.5 text-xs text-destructive">{l.error}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Toggle({
  label,
  icon: Icon,
  on,
  onClick,
}: {
  label: string;
  icon: typeof Power;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-xl border px-3.5 py-3 text-sm font-bold transition ${
        on ? "border-brand-red/40 bg-brand-red/10 text-foreground" : "border-border/60 bg-background/40 text-muted-foreground"
      }`}
    >
      <Icon className={`h-4 w-4 ${on ? "text-brand-red" : ""}`} />
      <span className="truncate">{label}</span>
      <span className={`ml-auto h-2 w-2 rounded-full ${on ? "bg-brand-red" : "bg-muted-foreground/40"}`} />
    </button>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-bold text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
