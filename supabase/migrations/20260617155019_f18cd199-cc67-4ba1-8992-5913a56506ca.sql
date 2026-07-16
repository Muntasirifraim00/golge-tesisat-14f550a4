CREATE TABLE public.hashtag_sets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  service TEXT,
  platform TEXT NOT NULL DEFAULT 'both',
  hashtags TEXT[] NOT NULL DEFAULT '{}',
  keywords TEXT[] NOT NULL DEFAULT '{}',
  notes TEXT,
  ai_generated BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.hashtag_sets TO authenticated;
GRANT ALL ON public.hashtag_sets TO service_role;

ALTER TABLE public.hashtag_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage hashtag sets"
  ON public.hashtag_sets
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_hashtag_sets_updated_at
  BEFORE UPDATE ON public.hashtag_sets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();