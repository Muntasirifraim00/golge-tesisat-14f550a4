import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import {
  UserPlus,
  Loader2,
  Wand2,
  Check,
  CheckCircle2,
  MessageSquare,
  Phone,
  Sparkles,
  Flame,
  X,
} from "lucide-react";

import {
  listLeadCandidates,
  analyzeLeadCandidates,
  extractLeadFromConversation,
  createLeadFromConversation,
  type LeadCandidate,
  type LeadDraftResult,
} from "@/lib/social.functions";
import { SERVICES } from "@/data/services";
import { DISTRICTS } from "@/data/districts";
import { cn } from "@/lib/utils";

type Notify = (kind: "ok" | "err", msg: string) => void;

const INPUT_CLS =
  "w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm outline-none focus:border-brand-red/50";

const INTENT_META: Record<string, { label: string; cls: string }> = {
  fiyat: { label: "Fiyat", cls: "border-amber-500/30 bg-amber-500/10 text-amber-300" },
  randevu: { label: "Randevu", cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
  acil: { label: "Acil", cls: "border-rose-500/30 bg-rose-500/10 text-rose-300" },
  bilgi: { label: "Bilgi", cls: "border-sky-500/30 bg-sky-500/10 text-sky-300" },
  sikayet: { label: "Şikayet", cls: "border-orange-500/30 bg-orange-500/10 text-orange-300" },
  diger: { label: "Diğer", cls: "border-border/60 bg-background/40 text-muted-foreground" },
};

type Filter = "candidates" | "converted" | "all";

type DraftState = LeadDraftResult & { conversationId: string; participantName: string | null };

export function LeadsBridgeTab({
  notify,
  onLeadCreated,
}: {
  notify: Notify;
  onLeadCreated?: () => void;
}) {
  const fetchCandidates = useServerFn(listLeadCandidates);
  const analyze = useServerFn(analyzeLeadCandidates);
  const extract = useServerFn(extractLeadFromConversation);
  const createLead = useServerFn(createLeadFromConversation);

  const [candidates, setCandidates] = useState<LeadCandidate[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({ candidates: 0, converted: 0, all: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("candidates");
  const [aiBusy, setAiBusy] = useState(false);

  const [draft, setDraft] = useState<DraftState | null>(null);
  const [draftBusy, setDraftBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetchCandidates({ data: { filter } });
      setCandidates(res.candidates);
      setCounts(res.counts);
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Yüklenemedi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function onAnalyze() {
    setAiBusy(true);
    try {
      const res = await analyze({ data: { limit: 40 } });
      notify("ok", `${res.scanned} konuşma tarandı · ${res.qualified} potansiyel lead`);
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Tarama başarısız");
    } finally {
      setAiBusy(false);
    }
  }

  async function openDraft(c: LeadCandidate) {
    setBusyId(c.id);
    try {
      const d = await extract({ data: { id: c.id } });
      setDraft({ ...d, conversationId: c.id, participantName: c.participant_name });
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Bilgi çıkarılamadı");
    } finally {
      setBusyId(null);
    }
  }

  async function onSaveLead() {
    if (!draft) return;
    if (!draft.name.trim() || !draft.phone.trim() || !draft.service_slug || !draft.district_slug) {
      notify("err", "İsim, telefon, hizmet ve ilçe gerekli");
      return;
    }
    setSaving(true);
    try {
      await createLead({
        data: {
          conversationId: draft.conversationId,
          name: draft.name,
          phone: draft.phone,
          service_slug: draft.service_slug,
          district_slug: draft.district_slug,
          notes: draft.notes,
        },
      });
      notify("ok", "Lead pipeline'a eklendi 🎯");
      setDraft(null);
      onLeadCreated?.();
      await load();
    } catch (e) {
      notify("err", e instanceof Error ? e.message : "Lead oluşturulamadı");
    } finally {
      setSaving(false);
    }
  }

  const FILTERS: { id: Filter; label: string }[] = useMemo(
    () => [
      { id: "candidates", label: `Adaylar (${counts.candidates ?? 0})` },
      { id: "converted", label: `Dönüştürülen (${counts.converted ?? 0})` },
      { id: "all", label: `Tümü (${counts.all ?? 0})` },
    ],
    [counts],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <UserPlus className="h-5 w-5 text-emerald-400" /> Social → Leads Bridge
          </h2>
          <p className="text-sm text-muted-foreground">
            Inbox konuşmalarından potansiyel müşterileri bul ve tek tıkla iş leads pipeline'ına ekle.
          </p>
        </div>
        <button
          onClick={onAnalyze}
          disabled={aiBusy}
          className="inline-flex h-[42px] items-center justify-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {aiBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          AI ile tara
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition",
              filter === f.id
                ? "border-brand-red/50 bg-brand-red/15 text-brand-red"
                : "border-border/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : candidates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/50 py-16 text-center text-sm text-muted-foreground">
          {filter === "candidates"
            ? "Henüz lead adayı yok. Yukarıdan AI ile inbox'ı tarayın."
            : "Bu listede konuşma yok."}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {candidates.map((c) => {
            const intent = INTENT_META[c.intent ?? "diger"] ?? INTENT_META.diger;
            const converted = !!c.converted_booking_id;
            return (
              <div
                key={c.id}
                className="flex flex-col rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur transition hover:border-brand-red/30"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red/15 text-xs font-bold text-brand-red">
                      {(c.participant_name ?? "?").slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{c.participant_name ?? "Bilinmeyen"}</p>
                      <p className="flex items-center gap-1 text-[11px] capitalize text-muted-foreground">
                        <MessageSquare className="h-3 w-3" /> {c.platform} · {c.channel}
                      </p>
                    </div>
                  </div>
                  <ScoreBadge score={c.lead_score} />
                </div>

                {c.last_message_preview && (
                  <p className="line-clamp-2 rounded-lg border border-border/50 bg-background/40 p-2.5 text-xs text-muted-foreground">
                    “{c.last_message_preview}”
                  </p>
                )}

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold",
                      intent.cls,
                    )}
                  >
                    {intent.label}
                  </span>
                  {c.lead_reason && (
                    <span className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-brand-red" /> {c.lead_reason}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/40 pt-3">
                  {converted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Lead oluşturuldu
                    </span>
                  ) : (
                    <button
                      onClick={() => openDraft(c)}
                      disabled={busyId === c.id}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red/15 px-2.5 py-1.5 text-xs font-semibold text-brand-red transition hover:bg-brand-red/25 disabled:opacity-50"
                    >
                      {busyId === c.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <UserPlus className="h-3.5 w-3.5" />
                      )}
                      Lead'e dönüştür
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Conversion modal */}
      {draft && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => !saving && setDraft(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border/60 bg-card p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-base font-bold">
                <UserPlus className="h-4 w-4 text-emerald-400" /> Yeni Lead
              </h3>
              <button
                onClick={() => !saving && setDraft(null)}
                className="rounded-lg p-1 text-muted-foreground transition hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {draft.summary && (
              <p className="mb-3 flex items-start gap-1.5 rounded-lg border border-border/50 bg-background/40 p-2.5 text-xs text-muted-foreground">
                <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" /> {draft.summary}
              </p>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">İsim *</label>
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className={INPUT_CLS}
                  placeholder="Müşteri adı"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Telefon *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    className={cn(INPUT_CLS, "pl-8")}
                    placeholder="05xx xxx xx xx"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Hizmet *</label>
                <select
                  value={draft.service_slug ?? ""}
                  onChange={(e) => setDraft({ ...draft, service_slug: e.target.value || null })}
                  className={INPUT_CLS}
                >
                  <option value="">Seçin…</option>
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">İlçe *</label>
                <select
                  value={draft.district_slug ?? ""}
                  onChange={(e) => setDraft({ ...draft, district_slug: e.target.value || null })}
                  className={INPUT_CLS}
                >
                  <option value="">Seçin…</option>
                  {DISTRICTS.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="mb-1 block text-xs text-muted-foreground">Not</label>
              <textarea
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                rows={3}
                className={cn(INPUT_CLS, "resize-none")}
                placeholder="Talep detayı…"
              />
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setDraft(null)}
                disabled={saving}
                className="rounded-xl border border-border/60 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground disabled:opacity-50"
              >
                Vazgeç
              </button>
              <button
                onClick={onSaveLead}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                Lead oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 70
      ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
      : score >= 40
        ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
        : "border-border/60 bg-background/40 text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1 text-xs font-bold",
        tone,
      )}
      title="Lead skoru"
    >
      <Flame className="h-3.5 w-3.5" />
      {score}
    </span>
  );
}
