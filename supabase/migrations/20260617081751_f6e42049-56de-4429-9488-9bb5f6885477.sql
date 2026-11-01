-- 1. Extend social_posts
ALTER TABLE public.social_posts
  ADD COLUMN IF NOT EXISTS media_type text NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS media_paths text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS variant_group uuid,
  ADD COLUMN IF NOT EXISTS retry_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS batch_id uuid,
  ADD COLUMN IF NOT EXISTS analytics jsonb NOT NULL DEFAULT '{}'::jsonb;

-- 2. brand_settings (single profile row, admin managed)
CREATE TABLE public.brand_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL DEFAULT 'Gölge Tesisat',
  tone text NOT NULL DEFAULT 'Güven veren, premium, samimi ama profesyonel',
  primary_color text NOT NULL DEFAULT '#e11d48',
  phone text NOT NULL DEFAULT '',
  logo_path text,
  default_hashtags text NOT NULL DEFAULT '#tesisat #istanbul #kombi #suTesisatı',
  language text NOT NULL DEFAULT 'tr',
  best_times jsonb NOT NULL DEFAULT '["09:00","18:00"]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.brand_settings TO authenticated;
GRANT ALL ON public.brand_settings TO service_role;
ALTER TABLE public.brand_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage brand settings"
ON public.brand_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_brand_settings_updated_at
BEFORE UPDATE ON public.brand_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. content_batches
CREATE TABLE public.content_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme text NOT NULL DEFAULT '',
  platform text NOT NULL DEFAULT 'both',
  total integer NOT NULL DEFAULT 0,
  completed integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'generating',
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_batches TO authenticated;
GRANT ALL ON public.content_batches TO service_role;
ALTER TABLE public.content_batches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage content batches"
ON public.content_batches FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_content_batches_updated_at
BEFORE UPDATE ON public.content_batches
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. post_analytics
CREATE TABLE public.post_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  platform text NOT NULL,
  likes integer NOT NULL DEFAULT 0,
  comments integer NOT NULL DEFAULT 0,
  shares integer NOT NULL DEFAULT 0,
  reach integer NOT NULL DEFAULT 0,
  impressions integer NOT NULL DEFAULT 0,
  engagement integer NOT NULL DEFAULT 0,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_post_analytics_post_id ON public.post_analytics(post_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_analytics TO authenticated;
GRANT ALL ON public.post_analytics TO service_role;
ALTER TABLE public.post_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view analytics"
ON public.post_analytics FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. social_logs
CREATE TABLE public.social_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid,
  action text NOT NULL,
  level text NOT NULL DEFAULT 'info',
  message text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_social_logs_created_at ON public.social_logs(created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.social_logs TO authenticated;
GRANT ALL ON public.social_logs TO service_role;
ALTER TABLE public.social_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view logs"
ON public.social_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Seed a default brand settings row
INSERT INTO public.brand_settings (business_name, phone)
VALUES ('Gölge Tesisat', '');