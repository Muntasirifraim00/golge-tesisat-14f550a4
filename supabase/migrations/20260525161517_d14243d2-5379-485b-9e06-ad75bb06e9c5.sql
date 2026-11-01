
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.no_admin_exists() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.no_admin_exists() TO authenticated;
