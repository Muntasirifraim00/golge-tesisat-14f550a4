CREATE TABLE public.keyword_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  captured_on DATE NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  keyword TEXT NOT NULL,
  tier SMALLINT NOT NULL DEFAULT 1,
  position NUMERIC,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC NOT NULL DEFAULT 0,
  indexed_pages INTEGER,
  submitted_pages INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (captured_on, keyword)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.keyword_snapshots TO authenticated;
GRANT ALL ON public.keyword_snapshots TO service_role;

ALTER TABLE public.keyword_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view keyword snapshots"
  ON public.keyword_snapshots FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert keyword snapshots"
  ON public.keyword_snapshots FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update keyword snapshots"
  ON public.keyword_snapshots FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_keyword_snapshots_updated_at
  BEFORE UPDATE ON public.keyword_snapshots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();