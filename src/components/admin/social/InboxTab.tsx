import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import {
  Inbox,
  Loader2,
  Send,
  Sparkles,
  Facebook,
  Instagram,
  MessageCircle,
  MessageSquare,
  Smile,
  Frown,
  Meh,
  Flame,
  UserPlus,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import {
  listConversations,
  getConversation,
  suggestConversationReply,
  sendConversationReply,
  updateConversation,
  type Conversation,
  type ConversationMessage,
  type InboxFilter,
} from "@/lib/social.functions";

const FILTERS: { id: InboxFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "open", label: "Open" },
  { id: "escalated", label: "Prioritized" },
  { id: "leads", label: "Leads" },
  { id: "handled", label: "Resolved" },
];

export function InboxTab({ notify }: { notify: (kind: "ok" | "err", msg: string) => void }) {
  const fetchList = useServerFn(listConversations);
  const fetchOne = useServerFn(getConversation);
  const suggest = useServerFn(suggestConversationReply);
  const sendReply = useServerFn(sendConversationReply);
  const update = useServerFn(updateConversation);

  const [filter, setFilter] = useState<InboxFilter>("all");
  const [list, setList] = useState<Conversation[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [active, setActive] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [draft, setDraft] = useState("");
  const [suggesting, setSuggesting] = useState(false);
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  async function loadList() {
    try {
      const res = await fetchList({ data: { filter } });
      setList(res.conversations);
      setCounts(res.counts);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    void loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function openThread(id: string) {
    setActiveId(id);
    setLoadingThread(true);
    setDraft("");
    try {
      const res = await fetchOne({ data: { id } });
      setActive(res.conversation);
      setMessages(res.messages);
      void loadList();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not open chat");
    } finally {
      setLoadingThread(false);
    }
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function onSuggest() {
    if (!activeId) return;
    setSuggesting(true);
    try {
      const res = await suggest({ data: { id: activeId } });
      setDraft(res.suggestion);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not get suggestion");
    } finally {
      setSuggesting(false);
    }
  }

  async function onSend() {
    if (!activeId || !draft.trim()) return;
    setSending(true);
    try {
      const res = await sendReply({ data: { id: activeId, text: draft } });
      setActive(res.conversation);
      setMessages(res.messages);
      setDraft("");
      notify("ok", "Reply sent");
      void loadList();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not send");
    } finally {
      setSending(false);
    }
  }

  async function patch(p: { status?: "open" | "handled"; is_lead?: boolean }) {
    if (!activeId) return;
    try {
      const updated = await update({ data: { id: activeId, ...p } });
      setActive(updated);
      void loadList();
      notify("ok", "Updated");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not update");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-bold">
          <Inbox className="h-4 w-4 text-brand-red" /> Inbox
          {counts.unread ? (
            <span className="rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-extrabold text-white">{counts.unread} new</span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                filter === f.id ? "bg-brand-red text-white" : "border border-border/60 text-muted-foreground hover:border-brand-red/40"
              }`}
            >
              {f.label}
              {counts[f.id] ? <span className="ml-1 opacity-70">{counts[f.id]}</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        {/* List */}
        <div className="space-y-2">
          {loading ? (
            <div className="h-64 animate-pulse rounded-2xl border border-border/60 bg-card/50" />
          ) : list.length === 0 ? (
            <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
              No conversations in this filter. Comments and messages will appear here as they arrive.
            </div>
          ) : (
            list.map((c) => (
              <button
                key={c.id}
                onClick={() => openThread(c.id)}
                className={`w-full rounded-2xl border p-3 text-left transition ${
                  activeId === c.id ? "border-brand-red/50 bg-brand-red/5" : "border-border/60 bg-card/40 hover:border-brand-red/30"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <PlatformIcon platform={c.platform} />
                    {c.channel === "comment" ? (
                      <MessageSquare className="h-3 w-3 shrink-0 text-muted-foreground" />
                    ) : (
                      <MessageCircle className="h-3 w-3 shrink-0 text-muted-foreground" />
                    )}
                    <span className="truncate text-xs font-bold">{c.participant_name || "User"}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <SentimentIcon sentiment={c.sentiment} />
                    {c.escalated && <Flame className="h-3 w-3 text-amber-500" />}
                    {c.is_lead && <UserPlus className="h-3 w-3 text-emerald-500" />}
                    {c.unread_count > 0 && <span className="h-2 w-2 rounded-full bg-brand-red" />}
                  </div>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {c.last_direction === "outbound" ? "You: " : ""}
                  {c.last_message_preview}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  {c.intent && <Tag>{intentLabel(c.intent)}</Tag>}
                  {c.status === "handled" && <Tag tone="ok">Resolved</Tag>}
                </div>
              </button>
            ))
          )}
        </div>

        {/* Thread */}
        <div className="rounded-2xl border border-border/60 bg-card/40">
          {!activeId ? (
            <div className="flex h-full min-h-[300px] items-center justify-center p-8 text-center text-sm text-muted-foreground">
              Select a conversation to view.
            </div>
          ) : loadingThread ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-brand-red" />
            </div>
          ) : (
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 p-3">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={active?.platform ?? ""} />
                  <span className="text-sm font-bold">{active?.participant_name || "User"}</span>
                  <SentimentIcon sentiment={active?.sentiment ?? null} />
                  {active?.intent && <Tag>{intentLabel(active.intent)}</Tag>}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => patch({ is_lead: !active?.is_lead })}
                    className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11px] font-bold transition ${
                      active?.is_lead ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600" : "border-border/60 text-muted-foreground hover:border-emerald-500/40"
                    }`}
                  >
                    <UserPlus className="h-3 w-3" /> {active?.is_lead ? "Lead" : "Mark as lead"}
                  </button>
                  {active?.status === "handled" ? (
                    <button
                      onClick={() => patch({ status: "open" })}
                      className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-2 py-1 text-[11px] font-bold text-muted-foreground transition hover:border-brand-red/40"
                    >
                      <RotateCcw className="h-3 w-3" /> Reopen
                    </button>
                  ) : (
                    <button
                      onClick={() => patch({ status: "handled" })}
                      className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-2 py-1 text-[11px] font-bold text-muted-foreground transition hover:border-emerald-500/40"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Resolve
                    </button>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div className="max-h-[42vh] min-h-[200px] flex-1 space-y-2.5 overflow-y-auto p-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.direction === "outbound" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${
                        m.direction === "outbound" ? "bg-brand-red text-white" : "bg-background/70 text-foreground"
                      }`}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{m.body}</p>
                      <div className={`mt-1 text-[9px] ${m.direction === "outbound" ? "text-white/70" : "text-muted-foreground"}`}>
                        {new Date(m.created_at).toLocaleString("en-US", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={endRef} />
              </div>

              {/* Composer */}
              <div className="space-y-2 border-t border-border/50 p-3">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Write your reply or get a suggestion from AI…"
                  rows={2}
                  className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-xs outline-none focus:border-brand-red/40"
                />
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={onSuggest}
                    disabled={suggesting}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-bold text-muted-foreground transition hover:border-brand-red/40 disabled:opacity-50"
                  >
                    {suggesting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                    AI suggestion
                  </button>
                  <button
                    onClick={onSend}
                    disabled={sending || !draft.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-4 py-1.5 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                  >
                    {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  return platform === "instagram" ? (
    <Instagram className="h-3.5 w-3.5 shrink-0 text-pink-500" />
  ) : (
    <Facebook className="h-3.5 w-3.5 shrink-0 text-blue-500" />
  );
}

function SentimentIcon({ sentiment }: { sentiment: string | null }) {
  if (sentiment === "positive") return <Smile className="h-3.5 w-3.5 text-emerald-500" />;
  if (sentiment === "negative") return <Frown className="h-3.5 w-3.5 text-red-500" />;
  return <Meh className="h-3.5 w-3.5 text-muted-foreground" />;
}

function Tag({ children, tone }: { children: React.ReactNode; tone?: "ok" }) {
  return (
    <span
      className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
        tone === "ok" ? "bg-emerald-500/15 text-emerald-600" : "bg-background/70 text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

function intentLabel(intent: string): string {
  const map: Record<string, string> = {
    lead: "Lead",
    question: "Question",
    complaint: "Complaint",
    praise: "Praise",
    spam: "Spam",
    other: "Other",
  };
  return map[intent] ?? intent;
}
