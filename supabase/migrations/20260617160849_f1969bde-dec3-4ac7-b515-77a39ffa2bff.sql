CREATE OR REPLACE FUNCTION public.register_link_click(_code text, _referrer text DEFAULT NULL, _user_agent text DEFAULT NULL) RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $fn$
DECLARE
  _id uuid;
  _url text;
BEGIN
  SELECT id, target_url INTO _id, _url FROM public.tracked_links WHERE code = _code;
  IF _id IS NULL THEN
    RETURN NULL;
  END IF;
  UPDATE public.tracked_links SET clicks = clicks + 1, last_clicked_at = now() WHERE id = _id;
  INSERT INTO public.link_clicks (link_id, referrer, user_agent) VALUES (_id, _referrer, _user_agent);
  RETURN _url;
END;
$fn$;
REVOKE EXECUTE ON FUNCTION public.register_link_click(text, text, text) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.register_link_click(text, text, text) TO service_role;