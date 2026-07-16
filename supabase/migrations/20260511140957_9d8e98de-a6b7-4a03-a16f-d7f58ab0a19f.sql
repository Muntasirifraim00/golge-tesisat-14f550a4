
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'completed', 'cancelled');

CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  district_slug TEXT NOT NULL,
  district_name TEXT NOT NULL,
  service_key TEXT NOT NULL,
  service_label TEXT NOT NULL,
  preferred_date DATE,
  time_slot TEXT,
  address TEXT,
  notes TEXT,
  status public.lead_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.callback_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  district_slug TEXT NOT NULL,
  district_name TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  status public.lead_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon + authenticated) to insert leads from the public website
CREATE POLICY "Anyone can submit a booking"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(phone) BETWEEN 10 AND 20
    AND char_length(service_key) BETWEEN 1 AND 50
    AND char_length(district_slug) BETWEEN 1 AND 50
  );

CREATE POLICY "Anyone can submit a callback request"
  ON public.callback_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 2 AND 100
    AND char_length(phone) BETWEEN 10 AND 20
    AND char_length(district_slug) BETWEEN 1 AND 50
  );

-- No SELECT/UPDATE/DELETE policies — the public website cannot read these
-- Admin access is via the Cloud dashboard (service role bypasses RLS)

CREATE INDEX idx_bookings_created_at ON public.bookings (created_at DESC);
CREATE INDEX idx_bookings_status ON public.bookings (status);
CREATE INDEX idx_callback_created_at ON public.callback_requests (created_at DESC);
CREATE INDEX idx_callback_status ON public.callback_requests (status);
