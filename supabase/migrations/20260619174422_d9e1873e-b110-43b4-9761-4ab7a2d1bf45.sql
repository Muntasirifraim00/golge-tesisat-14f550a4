-- 1. Remove sensitive tables from the Realtime publication (PII + internal alerts)
ALTER PUBLICATION supabase_realtime DROP TABLE public.bookings;
ALTER PUBLICATION supabase_realtime DROP TABLE public.callback_requests;
ALTER PUBLICATION supabase_realtime DROP TABLE public.studio_notifications;

-- 2. Lock down app_roles writes to admins only (prevents privilege escalation)
CREATE POLICY "Admins can insert roles"
  ON public.app_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
  ON public.app_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.app_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Restrict SECURITY DEFINER bootstrap helper to trusted server roles only
REVOKE EXECUTE ON FUNCTION public.no_admin_exists() FROM anon, authenticated, public;