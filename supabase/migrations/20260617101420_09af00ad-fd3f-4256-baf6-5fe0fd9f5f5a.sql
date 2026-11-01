-- Phase 9: A/B Testing & Optimization

CREATE TABLE public.experiments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  hypothesis text,
  status text NOT NULL DEFAULT 'running',
  base_idea text,
  metric text NOT NULL DEFAULT 'engagement',
  winner_post_id uuid REFERENCES public.social_posts(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.experiments TO authenticated;
GRANT ALL ON public.experiments TO service_role;

ALTER TABLE public.experiments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage experiments"
ON public.experiments FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_experiments_updated_at
BEFORE UPDATE ON public.experiments
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.experiment_variants (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  experiment_id uuid NOT NULL REFERENCES public.experiments(id) ON DELETE CASCADE,
  post_id uuid REFERENCES public.social_posts(id) ON DELETE SET NULL,
  label text NOT NULL DEFAULT 'A',
  is_control boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.experiment_variants TO authenticated;
GRANT ALL ON public.experiment_variants TO service_role;

ALTER TABLE public.experiment_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage experiment variants"
ON public.experiment_variants FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_experiment_variants_experiment_id ON public.experiment_variants(experiment_id);
CREATE INDEX idx_experiment_variants_post_id ON public.experiment_variants(post_id);