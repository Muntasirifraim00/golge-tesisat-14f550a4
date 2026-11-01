CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  district_slug text,
  district_name text,
  service_slug text,
  rating smallint NOT NULL DEFAULT 5,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT reviews_rating_range CHECK (rating BETWEEN 1 AND 5),
  CONSTRAINT reviews_status_values CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT reviews_body_len CHECK (char_length(body) BETWEEN 10 AND 1500),
  CONSTRAINT reviews_name_len CHECK (char_length(name) BETWEEN 2 AND 80)
);

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) may submit a review, but it must start as pending.
CREATE POLICY "Anyone can submit a pending review"
ON public.reviews
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'pending');

-- Anyone may read only approved reviews.
CREATE POLICY "Approved reviews are public"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Moderation (update/delete) is handled server-side with the service role, which bypasses RLS.

CREATE INDEX reviews_status_created_idx ON public.reviews (status, created_at DESC);
CREATE INDEX reviews_service_idx ON public.reviews (service_slug) WHERE status = 'approved';
CREATE INDEX reviews_district_idx ON public.reviews (district_slug) WHERE status = 'approved';

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();