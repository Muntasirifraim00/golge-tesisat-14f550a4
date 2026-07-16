import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LeadTable } from "@/components/admin/LeadTable";

export const Route = createFileRoute("/admin/events")({
  component: EventsPage,
});

type EventRow = {
  id: string;
  created_at: string;
  event_name: string;
  label: string | null;
  path: string | null;
  lang: string | null;
  country: string | null;
  viewport: string | null;
  metadata: unknown;
};

function EventsPage() {
  const [rows, setRows] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventFilter, setEventFilter] = useState<string>("");

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from("analytics_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      setRows((data as EventRow[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const eventNames = useMemo(() => {
    const set = new Set(rows.map((r) => r.event_name));
    return [...set].sort();
  }, [rows]);

  const filtered = useMemo(
    () => (eventFilter ? rows.filter((r) => r.event_name === eventFilter) : rows),
    [rows, eventFilter]
  );

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Events ({filtered.length})</h1>

      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Filter:</span>
        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">All events</option>
          {eventNames.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <LeadTable
        rows={filtered}
        exportName="events"
        searchKeys={["event_name", "label", "path", "country"]}
        columns={[
          { key: "created_at", header: "When", render: (r) => new Date(r.created_at).toLocaleString() },
          { key: "event_name", header: "Event" },
          { key: "label", header: "Label" },
          { key: "path", header: "Path" },
          { key: "lang", header: "Lang" },
          { key: "country", header: "Country" },
          { key: "viewport", header: "Viewport" },
          {
            key: "metadata",
            header: "Meta",
            render: (r) => {
              const m = r.metadata;
              if (!m || (typeof m === "object" && Object.keys(m as object).length === 0)) return "—";
              return <code className="text-xs">{JSON.stringify(m)}</code>;
            },
          },
        ]}
      />
    </div>
  );
}
