CREATE POLICY "Admins manage social media images - select"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'social-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage social media images - insert"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'social-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage social media images - update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'social-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage social media images - delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'social-media' AND public.has_role(auth.uid(), 'admin'));