-- Phase 8: Unified Inbox & AI Engagement
-- Aggregates social comments + DMs into conversations with messages.

CREATE TABLE public.conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  platform text NOT NULL,
  channel text NOT NULL,
  participant_id text NOT NULL,
  participant_name text,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  last_message_preview text,
  last_direction text NOT NULL DEFAULT 'inbound',
  status text NOT NULL DEFAULT 'open',
  sentiment text,
  intent text,
  is_lead boolean NOT NULL DEFAULT false,
  escalated boolean NOT NULL DEFAULT false,
  unread_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (platform, channel, participant_id)
);

CREATE TABLE public.conversation_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  direction text NOT NULL,
  body text NOT NULL,
  external_id text,
  author text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_conv_messages_conversation ON public.conversation_messages(conversation_id, created_at);
CREATE INDEX idx_conversations_last_message ON public.conversations(last_message_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversations TO authenticated;
GRANT ALL ON public.conversations TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.conversation_messages TO authenticated;
GRANT ALL ON public.conversation_messages TO service_role;

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage conversations"
  ON public.conversations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage conversation messages"
  ON public.conversation_messages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();