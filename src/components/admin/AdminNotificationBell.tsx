import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, Calendar, PhoneCall, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type LeadKind = "callback" | "booking";

type LeadNotification = {
  id: string;
  kind: LeadKind;
  name: string;
  detail: string;
  district: string | null;
  createdAt: string;
};

const LAST_SEEN_KEY = "admin-notif-last-seen";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  return `${Math.floor(hr / 24)} days ago`;
}

export function AdminNotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<LeadNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const lastSeenRef = useRef<number>(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Load the last-seen marker once on mount.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(LAST_SEEN_KEY) : null;
    lastSeenRef.current = saved ? Number(saved) || 0 : 0;
  }, []);

  const markAllRead = useCallback(() => {
    const now = Date.now();
    lastSeenRef.current = now;
    if (typeof window !== "undefined") window.localStorage.setItem(LAST_SEEN_KEY, String(now));
    setUnread(0);
  }, []);

  // Fetch recent leads from both tables. RLS limits this to admins; realtime is
  // intentionally disabled on these tables so customer PII is not broadcast.
  const seededRef = useRef(false);
  const refresh = useCallback(async () => {
    const [cb, bk] = await Promise.all([
      supabase
        .from("callback_requests")
        .select("id, name, district_name, time_slot, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase
        .from("bookings")
        .select("id, name, district_name, service_label, created_at")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);
    const callbacks: LeadNotification[] = (cb.data ?? []).map((r) => ({
      id: `cb-${r.id}`,
      kind: "callback",
      name: r.name ?? "Customer",
      detail: r.time_slot ?? "Callback request",
      district: r.district_name ?? null,
      createdAt: r.created_at as string,
    }));
    const bookings: LeadNotification[] = (bk.data ?? []).map((r) => ({
      id: `bk-${r.id}`,
      kind: "booking",
      name: r.name ?? "Customer",
      detail: r.service_label ?? "Service request",
      district: r.district_name ?? null,
      createdAt: r.created_at as string,
    }));
    const merged = [...callbacks, ...bookings]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 15);
    setItems((prev) => {
      if (seededRef.current) {
        const known = new Set(prev.map((p) => p.id));
        const fresh = merged.filter((n) => !known.has(n.id));
        if (fresh.length > 0) {
          setUnread((u) => u + fresh.length);
          const n = fresh[0];
          toast(n.kind === "callback" ? "📞 New callback request" : "📅 New service request", {
            description: `${n.name}${n.district ? ` · ${n.district}` : ""} — ${n.detail}`,
          });
        }
      } else {
        setUnread(merged.filter((n) => new Date(n.createdAt).getTime() > lastSeenRef.current).length);
      }
      return merged;
    });
    seededRef.current = true;
  }, []);

  // Seed on mount, then poll periodically for new leads.
  useEffect(() => {
    void refresh();
    const interval = setInterval(() => void refresh(), 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  function toggle() {
    setOpen((o) => {
      const next = !o;
      if (next) markAllRead();
      return next;
    });
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={toggle}
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card/50 text-muted-foreground transition hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[9px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <span className="text-sm font-bold">Notifications</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Recent requests
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center text-muted-foreground">
                <Check className="h-6 w-6" />
                <p className="text-xs">No requests yet.</p>
              </div>
            ) : (
              items.map((n) => (
                <Link
                  key={n.id}
                  to={n.kind === "callback" ? "/admin/callbacks" : "/admin/bookings"}
                  onClick={() => setOpen(false)}
                  className="flex items-start gap-3 border-b border-border/40 px-4 py-3 transition hover:bg-card/60"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      n.kind === "callback"
                        ? "bg-brand-red/12 text-brand-red"
                        : "bg-brand-green/12 text-brand-green",
                    )}
                  >
                    {n.kind === "callback" ? (
                      <PhoneCall className="h-4 w-4" />
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{n.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {n.detail}
                      {n.district ? ` · ${n.district}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">{timeAgo(n.createdAt)}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
