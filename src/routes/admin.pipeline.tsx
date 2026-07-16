import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Phone, MessageCircle, Calendar, PhoneCall, Clock, ChevronRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/pipeline")({
  component: PipelinePage,
});

type LeadSource = "callback" | "booking";
type Status = "new" | "contacted" | "scheduled" | "done" | "cancelled";

type Lead = {
  uid: string;
  id: string;
  source: LeadSource;
  name: string;
  phone: string;
  district: string | null;
  detail: string;
  status: Status;
  createdAt: string;
};

const COLUMNS: { key: Status; label: string; accent: string }[] = [
  { key: "new", label: "New", accent: "border-brand-red/60" },
  { key: "contacted", label: "Contacted", accent: "border-amber-500/60" },
  { key: "scheduled", label: "Scheduled", accent: "border-sky-500/60" },
  { key: "done", label: "Completed", accent: "border-brand-green/60" },
];

const NEXT: Partial<Record<Status, Status>> = {
  new: "contacted",
  contacted: "scheduled",
  scheduled: "done",
};

const NEXT_LABEL: Partial<Record<Status, string>> = {
  new: "Contacted",
  contacted: "Scheduled",
  scheduled: "Completed",
};

function normalizePhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.startsWith("90")) return d;
  if (d.startsWith("0")) return `9${d}`;
  if (d.startsWith("5")) return `90${d}`;
  return d;
}

function timeAgo(iso: string): string {
  const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  return `${Math.floor(hr / 24)} days ago`;
}

function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Load leads from both tables. RLS restricts this to admins; realtime is
  // intentionally disabled on these tables so customer PII is never broadcast.
  const load = useCallback(async () => {
    const [cb, bk] = await Promise.all([
      supabase
        .from("callback_requests")
        .select("id, name, phone, district_name, time_slot, status, created_at")
        .order("created_at", { ascending: false })
        .limit(300),
      supabase
        .from("bookings")
        .select("id, name, phone, district_name, service_label, status, created_at")
        .order("created_at", { ascending: false })
        .limit(300),
    ]);
    const callbacks: Lead[] = (cb.data ?? []).map((r) => ({
      uid: `cb-${r.id}`,
      id: r.id as string,
      source: "callback",
      name: (r.name as string) ?? "Customer",
      phone: (r.phone as string) ?? "",
      district: (r.district_name as string) ?? null,
      detail: (r.time_slot as string) ?? "Callback request",
      status: ((r.status as Status) ?? "new"),
      createdAt: r.created_at as string,
    }));
    const bookings: Lead[] = (bk.data ?? []).map((r) => ({
      uid: `bk-${r.id}`,
      id: r.id as string,
      source: "booking",
      name: (r.name as string) ?? "Customer",
      phone: (r.phone as string) ?? "",
      district: (r.district_name as string) ?? null,
      detail: (r.service_label as string) ?? "Service request",
      status: ((r.status as Status) ?? "new"),
      createdAt: r.created_at as string,
    }));
    setLeads(
      [...callbacks, ...bookings].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
    setLoading(false);
  }, []);

  // Initial load, then poll for new/updated leads.
  useEffect(() => {
    void load();
    const interval = setInterval(() => void load(), 30000);
    return () => clearInterval(interval);
  }, [load]);


  const setStatus = useCallback(async (lead: Lead, status: Status) => {
    setLeads((prev) => prev.map((l) => (l.uid === lead.uid ? { ...l, status } : l)));
    const table = lead.source === "callback" ? "callback_requests" : "bookings";
    const { error } = await supabase.from(table).update({ status: status as never }).eq("id", lead.id);
    if (error) {
      // revert on failure
      setLeads((prev) => prev.map((l) => (l.uid === lead.uid ? { ...l, status: lead.status } : l)));
      alert(error.message);
    }
  }, []);

  const grouped = useMemo(() => {
    const map: Record<Status, Lead[]> = { new: [], contacted: [], scheduled: [], done: [], cancelled: [] };
    for (const l of leads) (map[l.status] ?? map.new).push(l);
    return map;
  }, [leads]);

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  const openCount = grouped.new.length + grouped.contacted.length + grouped.scheduled.length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-extrabold">Workflow</h1>
          <p className="text-sm text-muted-foreground">
            {openCount} open requests · {leads.length} total
          </p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <div key={col.key} className="flex flex-col">
            <div className={cn("mb-2 flex items-center justify-between border-b-2 pb-1.5", col.accent)}>
              <span className="text-sm font-bold">{col.label}</span>
              <span className="rounded-full bg-card px-2 py-0.5 text-xs font-bold text-muted-foreground">
                {grouped[col.key].length}
              </span>
            </div>
            <div className="space-y-2">
              {grouped[col.key].length === 0 ? (
                <div className="rounded-lg border border-dashed border-border/60 px-3 py-6 text-center text-xs text-muted-foreground">
                  Empty
                </div>
              ) : (
                grouped[col.key].map((lead) => (
                  <LeadCard key={lead.uid} lead={lead} onStatus={setStatus} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {grouped.cancelled.length > 0 && (
        <details className="rounded-lg border border-border/60 bg-card/40 px-4 py-3">
          <summary className="cursor-pointer text-sm font-bold text-muted-foreground">
            Cancelled ({grouped.cancelled.length})
          </summary>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {grouped.cancelled.map((lead) => (
              <LeadCard key={lead.uid} lead={lead} onStatus={setStatus} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

function LeadCard({ lead, onStatus }: { lead: Lead; onStatus: (l: Lead, s: Status) => void }) {
  const next = NEXT[lead.status];
  const phone = normalizePhone(lead.phone);
  const waText = encodeURIComponent(
    `Hello ${lead.name}, we are calling from Gölge Tesisat. We would like to discuss your request for ${lead.detail}.`,
  );

  return (
    <div className="rounded-xl border border-border bg-background p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded",
                lead.source === "callback" ? "bg-brand-red/12 text-brand-red" : "bg-brand-green/12 text-brand-green",
              )}
            >
              {lead.source === "callback" ? <PhoneCall className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
            </span>
            <p className="truncate text-sm font-bold">{lead.name}</p>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {lead.detail}
            {lead.district ? ` · ${lead.district}` : ""}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="h-3 w-3" />
          {timeAgo(lead.createdAt)}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <a
          href={`tel:${phone}`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand-red py-1.5 text-[11px] font-bold text-white"
        >
          <Phone className="h-3 w-3" /> Call
        </a>
        <a
          href={`https://wa.me/${phone}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-brand-green py-1.5 text-[11px] font-bold text-white"
        >
          <MessageCircle className="h-3 w-3" /> WhatsApp
        </a>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5">
        {next && (
          <button
            onClick={() => onStatus(lead, next)}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-card py-1.5 text-[11px] font-bold transition hover:border-brand-green hover:text-brand-green"
          >
            {lead.status === "scheduled" ? <Check className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            {NEXT_LABEL[lead.status]}
          </button>
        )}
        {lead.status !== "cancelled" && lead.status !== "done" && (
          <button
            onClick={() => onStatus(lead, "cancelled")}
            className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px] font-bold text-muted-foreground transition hover:border-brand-red hover:text-brand-red"
          >
            Cancel
          </button>
        )}
        {(lead.status === "done" || lead.status === "cancelled") && (
          <button
            onClick={() => onStatus(lead, "new")}
            className="rounded-lg border border-border bg-card px-2.5 py-1.5 text-[11px] font-bold text-muted-foreground transition hover:text-foreground"
          >
            Revert
          </button>
        )}
      </div>
    </div>
  );
}
