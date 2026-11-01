-- Phase 2: Voice Profiles (AI Personas)

CREATE TABLE public.voice_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  tone text NOT NULL DEFAULT 'Güven veren, premium, samimi ama profesyonel',
  do_rules text,
  dont_rules text,
  sample_phrases text,
  emoji_level text NOT NULL DEFAULT 'medium',
  cta_style text,
  language text NOT NULL DEFAULT 'tr',
  is_default boolean NOT NULL DEFAULT false,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.voice_profiles TO authenticated;
GRANT ALL ON public.voice_profiles TO service_role;

ALTER TABLE public.voice_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage voice profiles"
ON public.voice_profiles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_voice_profiles_updated_at
BEFORE UPDATE ON public.voice_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Link persona to posts and campaigns
ALTER TABLE public.social_posts
  ADD COLUMN voice_profile_id uuid REFERENCES public.voice_profiles(id) ON DELETE SET NULL;
ALTER TABLE public.campaigns
  ADD COLUMN voice_profile_id uuid REFERENCES public.voice_profiles(id) ON DELETE SET NULL;

-- Seed a default persona
INSERT INTO public.voice_profiles (name, description, tone, do_rules, dont_rules, sample_phrases, emoji_level, cta_style, language, is_default)
VALUES (
  'Varsayılan Marka Sesi',
  'Gölge Tesisat ana marka tonu',
  'Güven veren, premium, samimi ama profesyonel',
  'Net fayda vurgula, hızlı çözüm ve güven ver, telefonla aramaya davet et',
  'Abartılı vaatlerden kaçın, çok fazla emoji kullanma, teknik jargonu sadeleştir',
  '7/24 hizmet, Aynı gün çözüm, Garantili işçilik',
  'medium',
  'Telefonla hemen ara / WhatsApp''tan yaz',
  'tr',
  true
);