select cron.schedule(
  'weekly-keyword-snapshot',
  '0 4 * * 1',
  $$
  select net.http_post(
    url:='https://project--22b17fa8-b906-4743-9525-eef69bc6a522.lovable.app/api/public/hooks/keyword-snapshot',
    headers:='{"Content-Type": "application/json", "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFreGJwcHJ6dXpya2Vxdmp0ZXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MDQ2NDYsImV4cCI6MjA5NDA4MDY0Nn0.3iDHGpvfE2C3qpm7XFB7gyooXtT4N8xJH-44ap41lPM"}'::jsonb,
    body:='{}'::jsonb
  ) as request_id;
  $$
);