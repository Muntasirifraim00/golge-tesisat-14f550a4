CREATE TABLE public.studio_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'info',
  title text NOT NULL,
  body text,
  section text,
  entity_id uuid,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.studio_notifications TO authenticated;
GRANT ALL ON public.studio_notifications TO service_role;

ALTER TABLE public.studio_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage studio notifications"
  ON public.studio_notifications FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX studio_notifications_unread_idx
  ON public.studio_notifications (created_at DESC)
  WHERE read = false;

CREATE TABLE public.post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  author_id uuid,
  author_name text NOT NULL DEFAULT 'Admin',
  body text NOT NULL,
  mentions text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.post_comments TO authenticated;
GRANT ALL ON public.post_comments TO service_role;

ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage post comments"
  ON public.post_comments FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX post_comments_post_idx ON public.post_comments (post_id, created_at DESC);

ALTER PUBLICATION supabase_realtime ADD TABLE public.studio_notifications;