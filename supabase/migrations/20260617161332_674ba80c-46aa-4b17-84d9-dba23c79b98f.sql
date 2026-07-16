CREATE TABLE public.trend_signals (id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY, title text NOT NULL, summary text, category text NOT NULL DEFAULT 'trend', source text, score integer NOT NULL DEFAULT 50, keywords text[] NOT NULL DEFAULT '{}', suggested_angle text, sentiment text NOT NULL DEFAULT 'neutral', platform text NOT NULL DEFAULT 'both', status text NOT NULL DEFAULT 'new', ai_generated boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trend_signals TO authenticated;
GRANT ALL ON public.trend_signals TO service_role;
ALTER TABLE public.trend_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage trend signals" ON public.trend_signals FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE INDEX idx_trend_signals_status ON public.trend_signals(status);
CREATE TRIGGER update_trend_signals_updated_at BEFORE UPDATE ON public.trend_signals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();