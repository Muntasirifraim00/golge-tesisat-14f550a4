ALTER PUBLICATION supabase_realtime ADD TABLE public.callback_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER TABLE public.callback_requests REPLICA IDENTITY FULL;
ALTER TABLE public.bookings REPLICA IDENTITY FULL;