ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
ALTER TABLE public.callback_requests ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_bookings_deleted_at ON public.bookings (deleted_at);
CREATE INDEX IF NOT EXISTS idx_callback_requests_deleted_at ON public.callback_requests (deleted_at);