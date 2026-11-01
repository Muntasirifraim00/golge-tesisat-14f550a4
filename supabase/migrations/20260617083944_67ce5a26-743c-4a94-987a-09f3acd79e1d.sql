CREATE TABLE IF NOT EXISTS public.auto_reply_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enabled boolean NOT NULL DEFAULT false,
  reply_to_comments boolean NOT NULL DEFAULT true,
  reply_to_messages boolean NOT NULL DEFAULT true,
  ai_enabled boolean NOT NULL DEFAULT true,
  fallback_reply text NOT NULL DEFAULT 'Merhaba! Mesajınız için teşekkürler. En kısa sürede size dönüş yapacağız. 📞',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.auto_reply_settings TO authenticated;
GRANT ALL ON public.auto_reply_settings TO service_role;
ALTER TABLE public.auto_reply_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage auto_reply_settings"
ON public.auto_reply_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.auto_reply_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  response text NOT NULL,
  platform text NOT NULL DEFAULT 'both',
  match_type text NOT NULL DEFAULT 'contains',
  channel text NOT NULL DEFAULT 'both',
  active boolean NOT NULL DEFAULT true,
  priority int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.auto_reply_rules TO authenticated;
GRANT ALL ON public.auto_reply_rules TO service_role;
ALTER TABLE public.auto_reply_rules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage auto_reply_rules"
ON public.auto_reply_rules FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.auto_reply_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  kind text NOT NULL,
  sender_id text,
  incoming_text text,
  reply_text text,
  matched_rule_id uuid,
  status text NOT NULL DEFAULT 'sent',
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.auto_reply_logs TO authenticated;
GRANT ALL ON public.auto_reply_logs TO service_role;
ALTER TABLE public.auto_reply_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read auto_reply_logs"
ON public.auto_reply_logs FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX IF NOT EXISTS idx_auto_reply_logs_created_at ON public.auto_reply_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_auto_reply_rules_active ON public.auto_reply_rules (active, priority DESC);

INSERT INTO public.auto_reply_settings (enabled) VALUES (false) ON CONFLICT DO NOTHING;