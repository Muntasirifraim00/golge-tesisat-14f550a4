-- Phase 3: Autopilot Queue & Smart Scheduling

-- Weekly recurring posting slots (best times per platform per weekday)
CREATE TABLE public.posting_schedule (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL DEFAULT 'both',
  day_of_week smallint NOT NULL,
  time_of_day text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.posting_schedule TO authenticated;
GRANT ALL ON public.posting_schedule TO service_role;

ALTER TABLE public.posting_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage posting schedule"
  ON public.posting_schedule FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_posting_schedule_updated_at
  BEFORE UPDATE ON public.posting_schedule
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Singleton autopilot configuration
CREATE TABLE public.autopilot_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  enabled boolean NOT NULL DEFAULT false,
  cadence_per_week smallint NOT NULL DEFAULT 7,
  min_queue smallint NOT NULL DEFAULT 3,
  batch_size smallint NOT NULL DEFAULT 3,
  theme text,
  platform text NOT NULL DEFAULT 'both',
  voice_profile_id uuid REFERENCES public.voice_profiles(id) ON DELETE SET NULL,
  campaign_id uuid REFERENCES public.campaigns(id) ON DELETE SET NULL,
  last_run_at timestamp with time zone,
  last_run_summary text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.autopilot_settings TO authenticated;
GRANT ALL ON public.autopilot_settings TO service_role;

ALTER TABLE public.autopilot_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage autopilot settings"
  ON public.autopilot_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_autopilot_settings_updated_at
  BEFORE UPDATE ON public.autopilot_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default weekly slots (Mon-Sun, two slots a day)
INSERT INTO public.posting_schedule (platform, day_of_week, time_of_day) VALUES
  ('both', 1, '09:00'), ('both', 1, '18:00'),
  ('both', 3, '09:00'), ('both', 3, '18:00'),
  ('both', 5, '09:00'), ('both', 5, '18:00'),
  ('both', 6, '11:00');

-- Seed singleton autopilot settings row (disabled by default)
INSERT INTO public.autopilot_settings (enabled) VALUES (false);