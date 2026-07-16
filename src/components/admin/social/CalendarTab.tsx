import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CalendarRange,
  Sparkles,
  Clock,
  Facebook,
  Instagram,
  Layers,
  CalendarClock,
} from "lucide-react";
import type { SocialPost } from "@/lib/social.functions";
import { getBrandSettings } from "@/lib/brand.functions";

const STATUS_DOT: Record<string, string> = {
  draft: "bg-slate-400",
  pending_review: "bg-sky-400",
  approved: "bg-violet-400",
  scheduled: "bg-amber-400",
  posted: "bg-emerald-400",
  failed: "bg-destructive",
  rejected: "bg-rose-400",
};

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  pending_review: "Pending",
  approved: "Approved",
  scheduled: "Scheduled",
  posted: "Posted",
  failed: "Failed",
  rejected: "Rejected",
};

function platformMeta(platform: string) {
  switch (platform) {
    case "facebook":
      return { Icon: Facebook, tone: "text-sky-500", chip: "bg-sky-500/10 text-sky-600 border-sky-500/20" };
    case "instagram":
      return { Icon: Instagram, tone: "text-pink-500", chip: "bg-pink-500/10 text-pink-600 border-pink-500/20" };
    default:
      return { Icon: Layers, tone: "text-brand-red", chip: "bg-brand-red/10 text-brand-red border-brand-red/20" };
  }
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function isoFromDateTime(date: Date, time: string) {
  const [h, m] = time.split(":").map(Number);
  const d = new Date(date);
  d.setHours(h ?? 9, m ?? 0, 0, 0);
  return d.toISOString();
}

function timeOf(p: SocialPost): string | null {
  const ref = p.scheduled_for ?? p.posted_at;
  if (!ref) return null;
  const d = new Date(ref);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function CalendarTab({
  posts,
  onReschedule,
}: {
  posts: SocialPost[];
  onReschedule?: (postId: string, iso: string) => void | Promise<void>;
}) {
  const [view, setView] = useState<"month" | "week">("month");
  const [cursor, setCursor] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  });
  const [bestTimes, setBestTimes] = useState<string[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [hoverKey, setHoverKey] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchBrand = useServerFn(getBrandSettings);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        const b = await fetchBrand();
        if (active) {
          const t = (b?.best_times ?? []).filter((x) => /^\d{2}:\d{2}$/.test(x)).sort();
          setBestTimes(t.length ? t : ["09:00", "13:00", "18:00"]);
        }
      } catch {
        if (active) setBestTimes(["09:00", "13:00", "18:00"]);
      }
    })();
    return () => {
      active = false;
    };
  }, [fetchBrand]);

  const byDay = useMemo(() => {
    const map = new Map<string, SocialPost[]>();
    for (const p of posts) {
      const ref = p.scheduled_for ?? p.posted_at;
      if (!ref) continue;
      const key = new Date(ref).toDateString();
      const arr = map.get(key) ?? [];
      arr.push(p);
      map.set(key, arr);
    }
    for (const arr of map.values())
      arr.sort((a, b) => (timeOf(a) ?? "").localeCompare(timeOf(b) ?? ""));
    return map;
  }, [posts]);

  const todayStr = new Date().toDateString();

  // Build visible cells based on view
  const cells: (Date | null)[] = useMemo(() => {
    if (view === "week") {
      const start = new Date(cursor);
      const offset = (start.getDay() + 6) % 7; // Monday-first
      start.setDate(start.getDate() - offset);
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
      });
    }
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const out: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(year, month, d));
    return out;
  }, [view, cursor]);

  function shift(dir: number) {
    setCursor((c) => {
      const d = new Date(c);
      if (view === "week") d.setDate(d.getDate() + dir * 7);
      else d.setMonth(d.getMonth() + dir);
      return d;
    });
  }

  const headLabel =
    view === "week"
      ? (() => {
          const start = cells[0] as Date;
          const end = cells[6] as Date;
          const sameMonth = start.getMonth() === end.getMonth();
          return sameMonth
            ? `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.getDate()}, ${end.getFullYear()}`
            : `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
        })()
      : cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  async function dropOn(date: Date) {
    if (!dragId || !onReschedule) {
      setDragId(null);
      setHoverKey(null);
      return;
    }
    const post = posts.find((p) => p.id === dragId);
    if (!post) {
      setDragId(null);
      return;
    }
    const time = timeOf(post) ?? bestTimes[0] ?? "09:00";
    const iso = isoFromDateTime(date, time);
    setBusyId(dragId);
    try {
      await onReschedule(dragId, iso);
    } finally {
      setBusyId(null);
      setDragId(null);
      setHoverKey(null);
    }
  }

  const upcoming = useMemo(
    () =>
      posts
        .filter((p) => p.scheduled_for && new Date(p.scheduled_for).getTime() >= Date.now())
        .sort((a, b) => (a.scheduled_for ?? "").localeCompare(b.scheduled_for ?? ""))
        .slice(0, 5),
    [posts],
  );

  const cellHeight = view === "week" ? "min-h-[260px]" : "min-h-[104px]";

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-bold">
          <CalendarDays className="h-4 w-4 text-brand-red" /> Content Calendar
          {onReschedule && (
            <span className="ml-1 hidden items-center gap-1 rounded-full border border-border/60 bg-card/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
              <CalendarClock className="h-3 w-3" /> Drag to reschedule
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border/60 p-0.5">
            <button
              onClick={() => setView("month")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                view === "month" ? "bg-brand-red text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" /> Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                view === "week" ? "bg-brand-red text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarRange className="h-3.5 w-3.5" /> Week
            </button>
          </div>
          <button onClick={() => shift(-1)} className={navBtn}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[150px] text-center text-sm font-bold capitalize">{headLabel}</span>
          <button onClick={() => shift(1)} className={navBtn}>
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setCursor(new Date())}
            className="rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground"
          >
            Today
          </button>
        </div>
      </div>

      {/* Best-time strip */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-[11px]">
        <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
          <Sparkles className="h-3.5 w-3.5" /> Best time to post
        </span>
        {bestTimes.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-background/60 px-2 py-0.5 font-mono text-amber-700"
          >
            <Clock className="h-3 w-3" /> {t}
          </span>
        ))}
        <span className="text-muted-foreground">— configure in Brand settings</span>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`e${i}`} className={`${cellHeight} rounded-lg`} />;
          const key = date.toDateString();
          const items = byDay.get(key) ?? [];
          const isToday = key === todayStr;
          const isHover = hoverKey === key;
          const inMonth = view === "week" || date.getMonth() === cursor.getMonth();
          const maxShow = view === "week" ? 8 : 3;
          return (
            <div
              key={key}
              onDragOver={(e) => {
                if (dragId) {
                  e.preventDefault();
                  setHoverKey(key);
                }
              }}
              onDragLeave={() => setHoverKey((k) => (k === key ? null : k))}
              onDrop={() => void dropOn(date)}
              className={`${cellHeight} rounded-lg border p-1.5 text-left transition ${
                isHover
                  ? "border-brand-red bg-brand-red/10 ring-2 ring-brand-red/30"
                  : isToday
                    ? "border-brand-red/60 bg-brand-red/5"
                    : "border-border/50 bg-card/30"
              } ${!inMonth ? "opacity-40" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold ${isToday ? "text-brand-red" : "text-muted-foreground"}`}>
                  {date.getDate()}
                </span>
                {items.length > 0 && (
                  <span className="rounded-full bg-background/70 px-1.5 text-[9px] font-semibold text-muted-foreground">
                    {items.length}
                  </span>
                )}
              </div>
              <div className="mt-1 space-y-1">
                {items.slice(0, maxShow).map((p) => {
                  const meta = platformMeta(p.platform);
                  const t = timeOf(p);
                  const draggable = !!onReschedule && p.status !== "posted";
                  return (
                    <div
                      key={p.id}
                      draggable={draggable}
                      onDragStart={() => setDragId(p.id)}
                      onDragEnd={() => {
                        setDragId(null);
                        setHoverKey(null);
                      }}
                      title={`${STATUS_LABEL[p.status] ?? p.status} • ${p.idea ?? p.caption ?? ""}`}
                      className={`group flex items-center gap-1 rounded border border-border/40 bg-background/70 px-1 py-0.5 ${
                        draggable ? "cursor-grab active:cursor-grabbing" : ""
                      } ${busyId === p.id ? "opacity-50" : ""} ${dragId === p.id ? "ring-1 ring-brand-red/50" : ""}`}
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[p.status] ?? "bg-slate-400"}`} />
                      <meta.Icon className={`h-2.5 w-2.5 shrink-0 ${meta.tone}`} />
                      {t && <span className="shrink-0 font-mono text-[9px] text-foreground/70">{t}</span>}
                      <span className="truncate text-[9px] text-foreground/80">
                        {p.idea ?? p.caption ?? "Untitled"}
                      </span>
                    </div>
                  );
                })}
                {items.length > maxShow && (
                  <div className="px-1 text-[9px] text-muted-foreground">+{items.length - maxShow} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer: legend + upcoming queue */}
      <div className="grid gap-4 md:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
          {(["scheduled", "posted", "draft", "pending_review", "approved", "failed"] as const).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${STATUS_DOT[k]}`} /> {STATUS_LABEL[k]}
            </span>
          ))}
        </div>
      </div>

      {upcoming.length > 0 && (
        <div className="rounded-xl border border-border/60 bg-card/40 p-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <CalendarClock className="h-3.5 w-3.5 text-brand-red" /> Up next
          </div>
          <div className="space-y-1.5">
            {upcoming.map((p) => {
              const meta = platformMeta(p.platform);
              return (
                <div key={p.id} className="flex items-center gap-2 text-xs">
                  <span className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-semibold ${meta.chip}`}>
                    <meta.Icon className="h-3 w-3" /> {p.platform}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                    {new Date(p.scheduled_for!).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="truncate text-foreground/80">{p.idea ?? p.caption}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const navBtn =
  "flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:border-brand-red/40 hover:text-foreground";
