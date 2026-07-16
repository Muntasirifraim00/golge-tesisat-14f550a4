-- Phase 1: Campaign & Strategy Layer

CREATE TABLE public.campaigns (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  goal text,
  description text,
  target_service text,
  target_district text,
  color text NOT NULL DEFAULT '#ef4444',
  status text NOT NULL DEFAULT 'active',
  starts_on date,
  ends_on date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.campaigns TO authenticated;
GRANT ALL ON public.campaigns TO service_role;

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage campaigns"
ON public.campaigns FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Link posts to campaigns
ALTER TABLE public.social_posts
  ADD COLUMN campaign_id uuid REFERENCES public.campaigns(id) ON DELETE SET NULL;

CREATE INDEX idx_social_posts_campaign_id ON public.social_posts(campaign_id);