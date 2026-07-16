-- Allow admins to delete leads (bookings and callback requests)
GRANT DELETE ON public.bookings TO authenticated;
GRANT DELETE ON public.callback_requests TO authenticated;

CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete callback requests"
ON public.callback_requests
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));