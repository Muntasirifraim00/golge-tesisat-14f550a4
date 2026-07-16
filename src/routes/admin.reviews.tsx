import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { Check, X, RotateCcw, Star as StarIcon } from "lucide-react";
import { listAdminReviews, moderateReview, type AdminReview } from "@/lib/reviews.functions";

export const Route = createFileRoute("/admin/reviews")({
  component: AdminReviewsPage,
});

type Filter = "pending" | "approved" | "rejected" | "all";

function AdminReviewsPage() {
  const fetchReviews = useServerFn(listAdminReviews);
  const moderate = useServerFn(moderateReview);
  const [rows, setRows] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("pending");
  const [busy, setBusy] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      setRows(await fetchReviews());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? rows : rows.filter((r) => r.status === filter)),
    [rows, filter],
  );

  const counts = useMemo(
    () => ({
      pending: rows.filter((r) => r.status === "pending").length,
      approved: rows.filter((r) => r.status === "approved").length,
      rejected: rows.filter((r) => r.status === "rejected").length,
      all: rows.length,
    }),
    [rows],
  );

  async function setStatus(id: string, status: "approved" | "rejected" | "pending") {
    setBusy(id);
    try {
      await moderate({ data: { id, status } });
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-green" />
          Customer reviews
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Review <span className="text-brand-red">Moderation</span>
        </h1>
        <p className="text-sm text-muted-foreground">Approve or reject submitted reviews. Only approved reviews appear on the site.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {(["pending", "approved", "rejected", "all"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold capitalize transition ${
              filter === f
                ? "border-brand-red bg-brand-red text-white"
                : "border-border bg-card/40 text-muted-foreground hover:border-brand-red/40"
            }`}
          >
            {labelFor(f)} · {counts[f]}
          </button>
        ))}
      </div>

      {loading && <div className="h-32 animate-pulse rounded-2xl border border-border/60 bg-card/50" />}

      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
          No reviews in this view.
        </div>
      )}

      <div className="grid gap-3">
        {filtered.map((r) => (
          <article key={r.id} className="rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{r.name}</span>
                  <span className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <StarIcon
                        key={n}
                        className={`h-3.5 w-3.5 ${n <= r.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`}
                      />
                    ))}
                  </span>
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {[r.district_name, r.service_slug].filter(Boolean).join(" · ") || "—"} ·{" "}
                  {new Date(r.created_at).toLocaleDateString()}
                </div>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <p className="mt-2 text-sm leading-relaxed">{r.body}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {r.status !== "approved" && (
                <ActionBtn onClick={() => setStatus(r.id, "approved")} disabled={busy === r.id} tone="green">
                  <Check className="h-3.5 w-3.5" /> Approve
                </ActionBtn>
              )}
              {r.status !== "rejected" && (
                <ActionBtn onClick={() => setStatus(r.id, "rejected")} disabled={busy === r.id} tone="red">
                  <X className="h-3.5 w-3.5" /> Reject
                </ActionBtn>
              )}
              {r.status !== "pending" && (
                <ActionBtn onClick={() => setStatus(r.id, "pending")} disabled={busy === r.id} tone="muted">
                  <RotateCcw className="h-3.5 w-3.5" /> Set to pending
                </ActionBtn>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function labelFor(f: Filter): string {
  return { pending: "Pending", approved: "Approved", rejected: "Rejected", all: "All" }[f];
}

function StatusBadge({ status }: { status: AdminReview["status"] }) {
  const map = {
    pending: "border-amber-500/40 bg-amber-500/10 text-amber-600",
    approved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
    rejected: "border-destructive/40 bg-destructive/10 text-destructive",
  } as const;
  const label = { pending: "Pending", approved: "Approved", rejected: "Rejected" }[status];
  return <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${map[status]}`}>{label}</span>;
}

function ActionBtn({
  children,
  onClick,
  disabled,
  tone,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tone: "green" | "red" | "muted";
}) {
  const tones = {
    green: "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10",
    red: "border-destructive/40 text-destructive hover:bg-destructive/10",
    muted: "border-border text-muted-foreground hover:bg-accent/40",
  } as const;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold transition disabled:opacity-50 ${tones[tone]}`}
    >
      {children}
    </button>
  );
}
