ALTER TABLE public.conversations
  ADD COLUMN IF NOT EXISTS lead_score integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS lead_reason text,
  ADD COLUMN IF NOT EXISTS lead_scanned_at timestamptz,
  ADD COLUMN IF NOT EXISTS converted_booking_id uuid REFERENCES public.bookings(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS conversations_lead_score_idx
  ON public.conversations (lead_score DESC)
  WHERE lead_score > 0;