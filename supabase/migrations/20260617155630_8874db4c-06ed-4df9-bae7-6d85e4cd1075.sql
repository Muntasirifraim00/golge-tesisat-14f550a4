CREATE TABLE public.content_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  service TEXT,
  platform TEXT NOT NULL DEFAULT 'both',
  description TEXT,
  structure TEXT NOT NULL DEFAULT '',
  example_caption TEXT,
  hashtags TEXT[] NOT NULL DEFAULT '{}',
  cta TEXT,
  ai_generated BOOLEAN NOT NULL DEFAULT false,
  use_count INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_templates TO authenticated;
GRANT ALL ON public.content_templates TO service_role;

ALTER TABLE public.content_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage content templates"
ON public.content_templates
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_content_templates_updated_at
BEFORE UPDATE ON public.content_templates
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();