ALTER TABLE public.social_posts
ADD COLUMN IF NOT EXISTS platform_variants JSONB NOT NULL DEFAULT '{}'::jsonb;