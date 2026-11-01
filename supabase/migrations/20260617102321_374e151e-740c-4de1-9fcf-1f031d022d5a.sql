-- Phase 10: Automation Rules Engine, Alerts & Audit

-- 1. Master automation settings (singleton) — the global kill-switch.
CREATE TABLE public.automation_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  master_enabled boolean NOT NULL DEFAULT true,
  email_alerts boolean NOT NULL DEFAULT false,
  alert_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.automation_settings TO authenticated;
GRANT ALL ON public.automation_settings TO service_role;

ALTER TABLE public.automation_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage automation settings"
ON public.automation_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_automation_settings_updated_at
BEFORE UPDATE ON public.automation_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2. Automation rules (if-this-then-that).
CREATE TABLE public.automation_rules (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  trigger text NOT NULL DEFAULT 'failed_publish',
  threshold numeric NOT NULL DEFAULT 0,
  action text NOT NULL DEFAULT 'notify',
  action_param text,
  active boolean NOT NULL DEFAULT true,
  last_triggered_at timestamptz,
  trigger_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.automation_rules TO authenticated;
GRANT ALL ON public.automation_rules TO service_role;

ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage automation rules"
ON public.automation_rules FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_automation_rules_updated_at
BEFORE UPDATE ON public.automation_rules
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 3. Alerts raised by rules / the system.
CREATE TABLE public.automation_alerts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_id uuid REFERENCES public.automation_rules(id) ON DELETE SET NULL,
  severity text NOT NULL DEFAULT 'info',
  title text NOT NULL,
  body text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.automation_alerts TO authenticated;
GRANT ALL ON public.automation_alerts TO service_role;

ALTER TABLE public.automation_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage automation alerts"
ON public.automation_alerts FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_automation_alerts_created_at ON public.automation_alerts(created_at DESC);

-- 4. Audit log — who did what and when.
CREATE TABLE public.audit_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor text NOT NULL DEFAULT 'system',
  action text NOT NULL,
  entity text,
  entity_id uuid,
  detail text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read audit log"
ON public.audit_log FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_audit_log_created_at ON public.audit_log(created_at DESC);