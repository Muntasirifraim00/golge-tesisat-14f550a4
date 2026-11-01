-- Autonomous SEO Blog Writing Agent storage

CREATE TABLE public.seo_writer_jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  status text NOT NULL DEFAULT 'queued',
  input_type text NOT NULL DEFAULT 'topic',
  input_value text NOT NULL,
  language text NOT NULL DEFAULT 'tr',
  topic_analysis jsonb,
  research_db jsonb,
  serp_db jsonb,
  competitor_db jsonb,
  knowledge_base jsonb,
  statistics_db jsonb,
  entity_db jsonb,
  outline jsonb,
  writing_notes jsonb,
  draft jsonb,
  seo_db jsonb,
  qa_report jsonb,
  final jsonb,
  scores jsonb,
  progress_log jsonb NOT NULL DEFAULT '[]'::jsonb,
  error text,
  published_slug text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_writer_jobs TO authenticated;
GRANT ALL ON public.seo_writer_jobs TO service_role;

ALTER TABLE public.seo_writer_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage seo_writer_jobs"
ON public.seo_writer_jobs FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_seo_writer_jobs_updated_at
BEFORE UPDATE ON public.seo_writer_jobs
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Published runtime blog posts (rendered by the public blog alongside static posts)
CREATE TABLE public.blog_posts_generated (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  data jsonb NOT NULL,
  source_job_id uuid REFERENCES public.seo_writer_jobs(id) ON DELETE SET NULL,
  published boolean NOT NULL DEFAULT true,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts_generated TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts_generated TO authenticated;
GRANT ALL ON public.blog_posts_generated TO service_role;

ALTER TABLE public.blog_posts_generated ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published generated posts"
ON public.blog_posts_generated FOR SELECT
TO anon
USING (published = true);

CREATE POLICY "Authenticated can read generated posts"
ON public.blog_posts_generated FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins manage generated posts"
ON public.blog_posts_generated FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_blog_posts_generated_updated_at
BEFORE UPDATE ON public.blog_posts_generated
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();