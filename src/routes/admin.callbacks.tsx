import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LeadTable } from "@/components/admin/LeadTable";

export const Route = createFileRoute("/admin/callbacks")({
  component: CallbacksPage,
});

type Callback = {
  id: string;
  created_at: string;
  deleted_at: string | null;
  name: string;
  phone: string;
  district_name: string;
  time_slot: string;
  status: string;
};

const STATUSES = ["new", "contacted", "scheduled", "done", "cancelled"];

function CallbacksPage() {
  const [rows, setRows] = useState<Callback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const { data } = await supabase
        .from("callback_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      setRows((data as Callback[]) ?? []);
      setLoading(false);
    })();
  }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase
      .from("callback_requests")
      .update({ status: status as any })
      .eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  async function saveCallback(id: string, patch: Partial<Callback>) {
    const { error } = await supabase.from("callback_requests").update(patch as any).eq("id", id);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function trashCallbacks(ids: string[]) {
    const { error } = await supabase
      .from("callback_requests")
      .update({ deleted_at: new Date().toISOString() } as any)
      .in("id", ids);
    if (error) {
      alert(error.message);
      return;
    }
    const now = new Date().toISOString();
    setRows((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, deleted_at: now } : r)));
  }

  async function restoreCallbacks(ids: string[]) {
    const { error } = await supabase
      .from("callback_requests")
      .update({ deleted_at: null } as any)
      .in("id", ids);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, deleted_at: null } : r)));
  }

  async function purgeCallbacks(ids: string[]) {
    const { error } = await supabase.from("callback_requests").delete().in("id", ids);
    if (error) {
      alert(error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => !ids.includes(r.id)));
  }

  if (loading) return <div className="text-muted-foreground">Loading…</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Callback Requests ({rows.length})</h1>
      <LeadTable
        rows={rows}
        exportName="callbacks"
        searchKeys={["name", "phone", "district_name", "time_slot"]}
        onSave={saveCallback}
        onTrash={trashCallbacks}
        onRestore={restoreCallbacks}
        onPurge={purgeCallbacks}
        editFields={[
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone", type: "tel" },
          { key: "district_name", label: "District" },
          { key: "time_slot", label: "When to call" },
          { key: "status", label: "Status", type: "select", options: STATUSES },
        ]}
        columns={[
          { key: "created_at", header: "When", render: (r) => new Date(r.created_at).toLocaleString() },
          { key: "name", header: "Name" },
          { key: "phone", header: "Phone", render: (r) => <a href={`tel:${r.phone}`} className="text-primary underline">{r.phone}</a> },
          { key: "district_name", header: "District" },
          { key: "time_slot", header: "When to call" },
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
