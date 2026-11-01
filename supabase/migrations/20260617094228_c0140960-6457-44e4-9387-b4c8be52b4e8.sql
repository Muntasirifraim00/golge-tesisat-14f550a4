ALTER TABLE public.social_posts
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS reviewed_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS review_note text;

ALTER TABLE public.campaigns
  ADD COLUMN IF NOT EXISTS require_approval boolean NOT NULL DEFAULT false;