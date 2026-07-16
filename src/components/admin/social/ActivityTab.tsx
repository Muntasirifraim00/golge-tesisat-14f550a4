import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Loader2,
  RefreshCw,
  CheckCheck,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  UserPlus,
  AtSign,
  Inbox,
  Info,
  MessageSquarePlus,
  Send,
  Dot,
} from "lucide-react";
import {
  listStudioNotifications,
  markNotificationsRead,
  deleteStudioNotification,
  syncStudioNotifications,
  listActivityComments,
  addPostComment,
  deletePostComment,
  type StudioNotification,
  type ActivityComment,
  type SocialPost,
} from "@/lib/social.functions";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;

const TYPE_META: Record<
  string,
  { icon: typeof Info; cls: string }
> = {
  approval: { icon: ShieldCheck, cls: "text-amber-400" },
  failed: { icon: AlertTriangle, cls: "text-rose-400" },
  lead: { icon: UserPlus, cls: "text-emerald-400" },
  mention: { icon: AtSign, cls: "text-violet-400" },
  inbox: { icon: Inbox, cls: "text-sky-400" },
  info: { icon: Info, cls: "text-muted-foreground" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "şimdi";
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} sa önce`;
  return `${Math.floor(h / 24)} gün önce`;
}

function renderMentions(body: string) {
  return body.split(/(@[\p{L}0-9_.-]+)/gu).map((part, i) =>
    part.startsWith("@") ? (
      <span key={i} className="font-semibold text-brand-red">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function ActivityTab({
  notify,
  posts,
  onNavigate,
}: {
  notify: Notify;
  posts: SocialPost[];
  onNavigate?: (section: string) => void;
}) {
  const fetchNotifs = useServerFn(listStudioNotifications);
  const markRead = useServerFn(markNotificationsRead);
  const removeNotif = useServerFn(deleteStudioNotification);
  const sync = useServerFn(syncStudioNotifications);
  const fetchActivity = useServerFn(listActivityComments);
  const addComment = useServerFn(addPostComment);
  const removeComment = useServerFn(deletePostComment);

  const [notifs, setNotifs] = useState<StudioNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [activity, setActivity] = useState<ActivityComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [postId, setPostId] = useState("");
  const [note, setNote] = useState("");
  const [posting, setPosting] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [n, a] = await Promise.all([fetchNotifs({ data: {} }), fetchActivity()]);
      setNotifs(n.items);
      setUnread(n.unread);
      setActivity(a);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Yüklenemedi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSync() {
    setSyncing(true);
    try {
      const res = await sync();
      notify("ok", res.created ? `${res.created} yeni bildirim` : "Her şey güncel");
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Tarama başarısız");
    } finally {
      setSyncing(false);
    }
  }

  async function onMarkAll() {
    try {
      await markRead({ data: { all: true } });
      setNotifs((p) => p.map((n) => ({ ...n, read: true })));
      setUnread(0);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Hata");
    }
  }

  async function onOpen(n: StudioNotification) {
    if (!n.read) {
      void markRead({ data: { id: n.id } });
      setNotifs((p) => p.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
      setUnread((u) => Math.max(0, u - 1));
    }
    if (n.section && n.section !== "activity" && onNavigate) onNavigate(n.section);
  }

  async function onDeleteNotif(id: string) {
    setBusyId(id);
    try {
      await removeNotif({ data: { id } });
      setNotifs((p) => p.filter((n) => n.id !== id));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Silinemedi");
    } finally {
      setBusyId(null);
    }
  }

  async function onAddNote() {
    if (!postId) {
      notify("err", "Bir gönderi seçin");
      return;
    }
    if (!note.trim()) return;
    setPosting(true);
    try {
      await addComment({ data: { postId, body: note } });
      setNote("");
      notify("ok", "Not eklendi");
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Not eklenemedi");
    } finally {
      setPosting(false);
    }
  }

  async function onDeleteNote(id: string) {
    setBusyId(id);
    try {
      await removeComment({ data: { id } });
      setActivity((p) => p.filter((c) => c.id !== id));
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Silinemedi");
    } finally {
      setBusyId(null);
    }
  }

  const postOptions = useMemo(
    () =>
      posts.map((p) => ({
        id: p.id,
        label: `${p.platform} · ${(p.caption || p.idea || "Gönderi").slice(0, 50)}`,
      })),
    [posts],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Bell className="h-5 w-5 text-amber-400" /> Activity &amp; Notifications
            {unread > 0 && (
              <span className="rounded-full bg-brand-red px-2 py-0.5 text-xs font-bold text-white">{unread}</span>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            Onay, başarısız gönderi, yeni lead ve mesaj bildirimleri + ekip notları ve @etiketleme.
          </p>
        </div>
        <button
          onClick={onSync}
          disabled={syncing}
          className="inline-flex h-[40px] items-center gap-2 rounded-xl bg-brand-red px-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {syncing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Bildirimleri tara
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Notification center */}
          <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Bell className="h-4 w-4 text-brand-red" /> Bildirim Merkezi
              </h3>
              {unread > 0 && (
                <button
                  onClick={onMarkAll}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Tümünü okundu yap
                </button>
              )}
            </div>
            {notifs.length === 0 ? (
              <p className="py-10 text-center text-xs text-muted-foreground">
                Bildirim yok. Yukarıdan tarayın.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {notifs.map((n) => {
                  const meta = TYPE_META[n.type] ?? TYPE_META.info;
                  const Icon = meta.icon;
                  return (
                    <li
                      key={n.id}
                      className={cn(
                        "group flex items-start gap-2.5 rounded-xl border p-2.5 transition",
                        n.read
                          ? "border-border/40 bg-transparent"
                          : "border-brand-red/30 bg-brand-red/5",
                      )}
                    >
                      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", meta.cls)} />
                      <button onClick={() => onOpen(n)} className="min-w-0 flex-1 text-left">
                        <p className="flex items-center gap-1 text-sm font-semibold">
                          {!n.read && <Dot className="h-4 w-4 shrink-0 text-brand-red" />}
                          <span className="truncate">{n.title}</span>
                        </p>
                        {n.body && <p className="truncate text-xs text-muted-foreground">{n.body}</p>}
                        <p className="mt-0.5 text-[11px] text-muted-foreground/70">{timeAgo(n.created_at)}</p>
                      </button>
                      <button
                        onClick={() => onDeleteNotif(n.id)}
                        disabled={busyId === n.id}
                        className="rounded-lg p-1 text-muted-foreground opacity-0 transition hover:text-destructive group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Team notes */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <MessageSquarePlus className="h-4 w-4 text-brand-red" /> Ekip Notu Ekle
              </h3>
              <select
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
                className="mb-2 w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50"
              >
                <option value="">Gönderi seçin…</option>
                {postOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Not yazın… @isim ile etiketleyin"
                className="w-full resize-none rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">@isim etiketlenenlere bildirim gönderir</span>
                <button
                  onClick={onAddNote}
                  disabled={posting || !postId || !note.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-brand-red px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {posting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Gönder
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <MessageSquarePlus className="h-4 w-4 text-brand-red" /> Aktivite Akışı
              </h3>
              {activity.length === 0 ? (
                <p className="py-8 text-center text-xs text-muted-foreground">Henüz not yok.</p>
              ) : (
                <ul className="space-y-3">
                  {activity.map((c) => (
                    <li key={c.id} className="group border-b border-border/30 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-2 text-xs">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/15 text-[10px] font-bold text-brand-red">
                            {c.author_name.slice(0, 1).toUpperCase()}
                          </span>
                          <span className="font-semibold">{c.author_name}</span>
                          <span className="text-muted-foreground/70">{timeAgo(c.created_at)}</span>
                        </span>
                        <button
                          onClick={() => onDeleteNote(c.id)}
                          disabled={busyId === c.id}
                          className="rounded-lg p-1 text-muted-foreground opacity-0 transition hover:text-destructive group-hover:opacity-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="mt-1 whitespace-pre-wrap text-sm">{renderMentions(c.body)}</p>
                      {c.post_caption && (
                        <p className="mt-1 truncate rounded-md bg-background/40 px-2 py-1 text-[11px] text-muted-foreground">
                          ↳ {c.post_caption.slice(0, 70)}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
