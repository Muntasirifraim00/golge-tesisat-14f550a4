import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import {
  Loader2,
  ShieldCheck,
  Check,
  X,
  Clock,
  Facebook,
  Instagram,
  Inbox,
} from "lucide-react";
import {
  listPendingReview,
  approvePost,
  rejectPost,
  type SocialPost,
} from "@/lib/social.functions";

type Notify = (kind: "ok" | "err", msg: string) => void;

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "facebook") return <Facebook className="h-3.5 w-3.5 text-sky-500" />;
  if (platform === "instagram") return <Instagram className="h-3.5 w-3.5 text-pink-500" />;
  return (
    <span className="flex items-center gap-0.5">
      <Facebook className="h-3 w-3 text-sky-500" />
      <Instagram className="h-3 w-3 text-pink-500" />
    </span>
  );
}

export function ApprovalTab({ notify }: { notify: Notify }) {
  const fetchPending = useServerFn(listPendingReview);
  const approve = useServerFn(approvePost);
  const reject = useServerFn(rejectPost);

  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  async function load() {
    setLoading(true);
    try {
      setPosts(await fetchPending());
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onApprove(post: SocialPost) {
    setBusy(post.id);
    try {
      await approve({ data: { id: post.id, note: notes[post.id] ?? "" } });
      setPosts((p) => p.filter((x) => x.id !== post.id));
      notify("ok", "Approved ✅");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not approve");
    } finally {
      setBusy(null);
    }
  }

  async function onReject(post: SocialPost) {
    const note = notes[post.id]?.trim();
    if (!note) {
      notify("err", "Please write a reason for rejection");
      return;
    }
    setBusy(post.id);
    try {
      await reject({ data: { id: post.id, note } });
      setPosts((p) => p.filter((x) => x.id !== post.id));
      notify("ok", "Rejected");
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Could not reject");
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 text-sm font-bold">
          <ShieldCheck className="h-4 w-4 text-brand-red" />
          Approval Queue
          {posts.length > 0 && (
            <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-bold text-purple-400">
              {posts.length}
            </span>
          )}
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Posts requiring approval are reviewed here. Approved posts are published at the scheduled time.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border/60 py-16 text-center text-sm text-muted-foreground">
          <Inbox className="h-6 w-6" />
          No posts to review. Everything is under control.
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {posts.map((post) => (
            <div key={post.id} className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur">
              <div className="flex gap-3 p-3">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.idea ?? "Post image"}
                    className="h-24 w-24 shrink-0 rounded-xl object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <PlatformIcon platform={post.platform} />
                    {post.scheduled_for && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(post.scheduled_for).toLocaleString("tr-TR")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-3 text-xs text-foreground/90">{post.caption}</p>
                  {post.hashtags && (
                    <p className="mt-1 line-clamp-1 text-[10px] text-brand-red/80">{post.hashtags}</p>
                  )}
                </div>
              </div>
              <div className="border-t border-border/50 bg-background/30 p-3">
                <input
                  className="w-full rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs outline-none focus:border-brand-red/50"
                  placeholder="Note (required for rejection)"
                  value={notes[post.id] ?? ""}
                  onChange={(e) => setNotes((n) => ({ ...n, [post.id]: e.target.value }))}
                />
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => onApprove(post)}
                    disabled={busy === post.id}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50"
                  >
                    {busy === post.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                    Approve
                  </button>
                  <button
                    onClick={() => onReject(post)}
                    disabled={busy === post.id}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-rose-500/50 px-3 py-1.5 text-xs font-bold text-rose-400 transition hover:bg-rose-500/10 disabled:opacity-50"
                  >
                    <X className="h-3.5 w-3.5" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
