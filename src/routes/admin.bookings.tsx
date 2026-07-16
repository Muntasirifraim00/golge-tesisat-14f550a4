import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LeadTable } from "@/components/admin/LeadTable";

export const Route = createFileRoute("/admin/bookings")({
  component: BookingsPage,
});

type Booking = {
  id: string;
  created_at: string;
  deleted_at: string | null;
  name: string;
  phone: string;
  district_name: string;
  service_label: string;
  preferred_date: string | null;
  time_slot: string | null;
  address: string | null;
  notes: string | null;
  status: string;
};

const STATUSES = ["new", "contacted", "scheduled", "done", "cancelled"];

function BookingsPage() {
  const [rows, setRows] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      setRows((data as Booking[]) ?? []);
      setLoading(false);
    })();
  }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("bookings").update({ status: status as any }).eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  async function saveBooking(id: string, patch: Partial<Booking>) {
    const { error } = await supabase.from("bookings").update(patch as any).eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function trashBookings(ids: string[]) {
    const { error } = await supabase
      .from("bookings")
      .update({ deleted_at: new Date().toISOString() } as any)
      .in("id", ids);
    if (error) {
      alert(error.message);
      return;
    }
    const now = new Date().toISOString();
    setRows((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, deleted_at: now } : r)));
  }

  async function restoreBookings(ids: string[]) {
    const { error } = await supabase
      .from("bookings")
      .update({ deleted_at: null } as any)
      .in("id", ids);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, deleted_at: null } : r)));
  }

  async function purgeBookings(ids: string[]) {
    const { error } = await supabase.from("bookings").delete().in("id", ids);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
  }

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Bookings ({rows.length})</h1>
      <LeadTable
        rows={rows}
        exportName="bookings"
        searchKeys={["name", "phone", "district_name", "service_label", "address"]}
        onSave={saveBooking}
        onTrash={trashBookings}
        onRestore={restoreBookings}
        onPurge={purgeBookings}
        editFields={[
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone", type: "tel" },
          { key: "district_name", label: "District" },
          { key: "service_label", label: "Service" },
          { key: "preferred_date", label: "Preferred date", type: "date" },
          { key: "time_slot", label: "Time slot" },
          { key: "address", label: "Address", type: "textarea" },
          { key: "notes", label: "Notes", type: "textarea" },
          { key: "status", label: "Status", type: "select", options: STATUSES },
        ]}
        columns={[
          { key: "created_at", header: "When", render: (r) => new Date(r.created_at).toLocaleString() },
          { key: "name", header: "Name" },
          { key: "phone", header: "Phone", render: (r) => <a href={`tel:${r.phone}`} className="text-primary underline">{r.phone}</a> },
          { key: "service_label", header: "Service" },
          { key: "district_name", header: "District" },
          { key: "preferred_date", header: "Date", render: (r) => `${r.preferred_date ?? "—"}${r.time_slot ? ` · ${r.time_slot}` : ""}` },
          { key: "address", header: "Address" },
          { key: "notes", header: "Notes" },
          {
            key: "status",
            header: "Status",
            render: (r) => (
              <select
                value={r.status}
                onChange={(e) => updateStatus(r.id, e.target.value)}
                className="rounded border border-border bg-background px-2 py-1 text-xs"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            ),
          },
        ]}
      />
    </div>
  );
}
