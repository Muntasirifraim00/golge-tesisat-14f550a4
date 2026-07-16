import { useEffect, useMemo, useState } from "react";
import { Search, Download, Pencil, Trash2, X, RotateCcw, Inbox } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  /** Hide this column in the mobile card view */
  hideOnMobile?: boolean;
  /** Mark as the "title" field for mobile card */
  primary?: boolean;
};

export type EditField<T> = {
  key: keyof T;
  label: string;
  type?: "text" | "tel" | "date" | "textarea" | "select";
  /** Options for a select field */
  options?: string[];
};

type LeadRow = { id: string; created_at: string; deleted_at?: string | null };

export function LeadTable<T extends LeadRow>({
  rows,
  columns,
  searchKeys,
  exportName,
  editFields,
  onSave,
  onTrash,
  onRestore,
  onPurge,
}: {
  rows: T[];
  columns: Column<T>[];
  searchKeys: (keyof T)[];
  exportName: string;
  /** When provided together with onSave, an Edit action is shown per row. */
  editFields?: EditField<T>[];
  onSave?: (id: string, patch: Partial<T>) => Promise<void> | void;
  /** Move leads to Trash (soft delete). Enables per-row + bulk "Delete". */
  onTrash?: (ids: string[]) => Promise<void> | void;
  /** Restore leads from Trash. */
  onRestore?: (ids: string[]) => Promise<void> | void;
  /** Permanently delete leads (empty trash). */
  onPurge?: (ids: string[]) => Promise<void> | void;
}) {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"active" | "trash">("active");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<T | null>(null);
  const [draft, setDraft] = useState<Partial<T>>({});
  const [saving, setSaving] = useState(false);
  // pending confirmation: list of ids + a label + the action to run on confirm
  const [pending, setPending] = useState<
    { ids: string[]; label: string; mode: "trash" | "purge" } | null
  >(null);
  const [busy, setBusy] = useState(false);

  const canEdit = Boolean(editFields && editFields.length > 0 && onSave);
  const canTrash = Boolean(onTrash);
  const canManageTrash = Boolean(onRestore && onPurge);

  const activeRows = useMemo(() => rows.filter((r) => !r.deleted_at), [rows]);
  const trashRows = useMemo(() => rows.filter((r) => r.deleted_at), [rows]);

  // Reset selection whenever the view changes
  useEffect(() => {
    setSelected(new Set());
    setQ("");
  }, [view]);

  const base = view === "active" ? activeRows : trashRows;

  const filtered = useMemo(() => {
    if (!q.trim()) return base;
    const needle = q.toLowerCase();
    return base.filter((r) =>
      searchKeys.some((k) => String(r[k] ?? "").toLowerCase().includes(needle)),
    );
  }, [base, q, searchKeys]);

  const inTrashView = view === "trash";
  const hasActions = canEdit || canTrash || canManageTrash;
  const showCheckbox = inTrashView ? canManageTrash : canTrash;

  const allVisibleSelected = filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllVisible() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) {
        filtered.forEach((r) => next.delete(r.id));
      } else {
        filtered.forEach((r) => next.add(r.id));
      }
      return next;
    });
  }

  function openEdit(row: T) {
    setEditing(row);
    const initial: Partial<T> = {};
    (editFields ?? []).forEach((f) => {
      initial[f.key] = row[f.key];
    });
    setDraft(initial);
  }

  async function saveEdit() {
    if (!editing || !onSave) return;
    setSaving(true);
    try {
      await onSave(editing.id, draft);
      setEditing(null);
    } finally {
      setSaving(false);
    }
  }

  function clearSelection(ids: string[]) {
    setSelected((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  }

  async function doRestore(ids: string[]) {
    if (!onRestore) return;
    setBusy(true);
    try {
      await onRestore(ids);
      clearSelection(ids);
    } finally {
      setBusy(false);
    }
  }

  async function confirmPending() {
    if (!pending) return;
    setBusy(true);
    try {
      if (pending.mode === "trash" && onTrash) await onTrash(pending.ids);
      if (pending.mode === "purge" && onPurge) await onPurge(pending.ids);
      clearSelection(pending.ids);
      setPending(null);
    } finally {
      setBusy(false);
    }
  }

  function exportCsv() {
    const header = columns.map((c) => c.header).join(",");
    const lines = filtered.map((row) =>
      columns
        .map((c) => {
          const v = (row as any)[c.key] ?? "";
          const s = String(v).replace(/"/g, '""');
          return `"${s}"`;
        })
        .join(","),
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}-${view}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const primaryCol = columns.find((c) => c.primary) ?? columns[1] ?? columns[0];
  const mobileCols = columns.filter((c) => !c.hideOnMobile && c !== primaryCol);
  const selectedCount = selected.size;

  return (
    <div className="space-y-4">
      {/* View switcher (Active / Trash) */}
      {canManageTrash && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("active")}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-widest transition ${
              view === "active"
                ? "border-brand-red/50 bg-brand-red/10 text-brand-red"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <Inbox className="h-3.5 w-3.5" /> Active ({activeRows.length})
          </button>
          <button
            onClick={() => setView("trash")}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-widest transition ${
              view === "trash"
                ? "border-destructive/50 bg-destructive/10 text-destructive"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <Trash2 className="h-3.5 w-3.5" /> Trash ({trashRows.length})
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, phone, district…"
            className="w-full rounded-lg border border-border bg-card/40 py-2.5 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-brand-red/60 focus:outline-none focus:ring-2 focus:ring-brand-red/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {filtered.length} / {base.length}
          </span>
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold uppercase tracking-widest hover:border-brand-red/40 hover:text-brand-red"
          >
            <Download className="h-3.5 w-3.5" /> CSV
          </button>
          {!inTrashView && canTrash && activeRows.length > 0 && (
            <button
              onClick={() =>
                setPending({
                  ids: activeRows.map((r) => r.id),
                  label: `all ${activeRows.length}`,
                  mode: "trash",
                })
              }
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" /> Trash all
            </button>
          )}
          {inTrashView && canManageTrash && trashRows.length > 0 && (
            <button
              onClick={() =>
                setPending({
                  ids: trashRows.map((r) => r.id),
                  label: `all ${trashRows.length} trashed`,
                  mode: "purge",
                })
              }
              className="inline-flex items-center gap-2 rounded-lg border border-destructive/60 bg-destructive/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-destructive hover:bg-destructive/20"
            >
              <Trash2 className="h-3.5 w-3.5" /> Empty trash
            </button>
          )}
        </div>
      </div>

      {/* Bulk action bar */}
      {showCheckbox && selectedCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-brand-red/40 bg-brand-red/5 px-3 py-2">
          <span className="text-xs font-bold">{selectedCount} selected</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelected(new Set())}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
            {inTrashView ? (
              <>
                <button
                  onClick={() => void doRestore([...selected])}
                  disabled={busy}
                  className="inline-flex items-center gap-1 rounded-md border border-brand-green/40 bg-brand-green/10 px-2.5 py-1.5 text-xs font-bold text-brand-green hover:bg-brand-green/20 disabled:opacity-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Restore
                </button>
                <button
                  onClick={() =>
                    setPending({ ids: [...selected], label: `${selectedCount} selected`, mode: "purge" })
                  }
                  className="inline-flex items-center gap-1 rounded-md border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/20"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete forever
                </button>
              </>
            ) : (
              <button
                onClick={() =>
                  setPending({ ids: [...selected], label: `${selectedCount} selected`, mode: "trash" })
                }
                className="inline-flex items-center gap-1 rounded-md border border-destructive/40 bg-destructive/10 px-2.5 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/20"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            )}
          </div>
        </div>
      )}

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-xl border border-border/60 bg-card/30 backdrop-blur md:block">
        <table className="w-full text-sm">
          <thead className="bg-background/40 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              {showCheckbox && (
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={allVisibleSelected}
                    onChange={toggleAllVisible}
                    className="h-4 w-4 cursor-pointer accent-brand-red"
                  />
                </th>
              )}
              {columns.map((c) => (
                <th key={String(c.key)} className="px-4 py-3 text-left font-bold">{c.header}</th>
              ))}
              {hasActions && <th className="px-4 py-3 text-right font-bold">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showCheckbox ? 1 : 0) + (hasActions ? 1 : 0)}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  {inTrashView ? "Trash is empty." : "No rows."}
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row.id} className="border-t border-border/40 align-top transition hover:bg-accent/30">
                  {showCheckbox && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select row"
                        checked={selected.has(row.id)}
                        onChange={() => toggleOne(row.id)}
                        className="h-4 w-4 cursor-pointer accent-brand-red"
                      />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={String(c.key)} className="px-4 py-3">
                      {c.render ? c.render(row) : String((row as any)[c.key] ?? "")}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {inTrashView ? (
                          canManageTrash && (
                            <>
                              <button
                                onClick={() => void doRestore([row.id])}
                                disabled={busy}
                                aria-label="Restore"
                                className="inline-flex items-center gap-1 rounded-md border border-brand-green/40 bg-brand-green/5 px-2 py-1 text-xs font-bold text-brand-green hover:bg-brand-green/10 disabled:opacity-50"
                              >
                                <RotateCcw className="h-3.5 w-3.5" /> Restore
                              </button>
                              <button
                                onClick={() => setPending({ ids: [row.id], label: "this lead", mode: "purge" })}
                                aria-label="Delete forever"
                                className="inline-flex items-center gap-1 rounded-md border border-destructive/40 bg-destructive/5 px-2 py-1 text-xs font-bold text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </>
                          )
                        ) : (
                          <>
                            {canEdit && (
                              <button
                                onClick={() => openEdit(row)}
                                aria-label="Edit"
                                className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-xs font-bold text-muted-foreground hover:border-brand-red/40 hover:text-brand-red"
                              >
                                <Pencil className="h-3.5 w-3.5" /> Edit
                              </button>
                            )}
                            {canTrash && (
                              <button
                                onClick={() => setPending({ ids: [row.id], label: "this lead", mode: "trash" })}
                                aria-label="Delete"
                                className="inline-flex items-center gap-1 rounded-md border border-destructive/40 bg-destructive/5 px-2 py-1 text-xs font-bold text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border/60 bg-card/30 p-8 text-center text-sm text-muted-foreground">
            {inTrashView ? "Trash is empty." : "No rows."}
          </div>
        ) : (
          filtered.map((row) => (
            <article
              key={row.id}
              className="relative overflow-hidden rounded-xl border border-border/60 bg-card/40 p-4 backdrop-blur"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-red to-brand-green" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-2.5">
                  {showCheckbox && (
                    <input
                      type="checkbox"
                      aria-label="Select row"
                      checked={selected.has(row.id)}
                      onChange={() => toggleOne(row.id)}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-brand-red"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-extrabold leading-tight">
                      {primaryCol.render ? primaryCol.render(row) : String((row as any)[primaryCol.key] ?? "")}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {new Date(row.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <dl className="mt-3 grid grid-cols-1 gap-x-3 gap-y-2 text-sm">
                {mobileCols.map((c) => {
                  const value = c.render ? c.render(row) : String((row as any)[c.key] ?? "");
                  if (value === "" || value === "—" || value == null) return null;
                  return (
                    <div key={String(c.key)} className="flex items-start justify-between gap-3 border-t border-border/30 pt-2 first:border-t-0 first:pt-0">
                      <dt className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {c.header}
                      </dt>
                      <dd className="min-w-0 break-words text-right">{value}</dd>
                    </div>
                  );
                })}
              </dl>

              {hasActions && (
                <div className="mt-3 flex items-center gap-2 border-t border-border/30 pt-3">
                  {inTrashView ? (
                    canManageTrash && (
                      <>
                        <button
                          onClick={() => void doRestore([row.id])}
                          disabled={busy}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-brand-green/40 bg-brand-green/5 px-2 py-1.5 text-xs font-bold text-brand-green hover:bg-brand-green/10 disabled:opacity-50"
                        >
                          <RotateCcw className="h-3.5 w-3.5" /> Restore
                        </button>
                        <button
                          onClick={() => setPending({ ids: [row.id], label: "this lead", mode: "purge" })}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/5 px-2 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete forever
                        </button>
                      </>
                    )
                  ) : (
                    <>
                      {canEdit && (
                        <button
                          onClick={() => openEdit(row)}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5 text-xs font-bold text-muted-foreground hover:border-brand-red/40 hover:text-brand-red"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                      )}
                      {canTrash && (
                        <button
                          onClick={() => setPending({ ids: [row.id], label: "this lead", mode: "trash" })}
                          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/5 px-2 py-1.5 text-xs font-bold text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </article>
          ))
        )}
      </div>

      {/* Edit dialog */}
      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {(editFields ?? []).map((f) => {
              const value = (draft[f.key] as unknown as string) ?? "";
              const id = `edit-${String(f.key)}`;
              return (
                <div key={String(f.key)} className="space-y-1.5">
                  <Label htmlFor={id}>{f.label}</Label>
                  {f.type === "textarea" ? (
                    <Textarea
                      id={id}
                      value={value}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value as any }))}
                    />
                  ) : f.type === "select" ? (
                    <select
                      id={id}
                      value={value}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value as any }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {(f.options ?? []).map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={id}
                      type={f.type === "date" ? "date" : f.type === "tel" ? "tel" : "text"}
                      value={value}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value as any }))}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={saveEdit} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation (double-check) */}
      <AlertDialog open={pending !== null} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pending?.mode === "purge" ? "Delete permanently?" : "Move to trash?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.mode === "purge" ? (
                <>You are about to permanently delete {pending?.label}. This action cannot be undone.</>
              ) : (
                <>You are about to move {pending?.label} to the Trash. You can restore later from the Trash tab.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                void confirmPending();
              }}
              disabled={busy}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {busy
                ? pending?.mode === "purge"
                  ? "Deleting…"
                  : "Moving…"
                : pending?.mode === "purge"
                  ? "Yes, delete forever"
                  : "Yes, move to trash"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
