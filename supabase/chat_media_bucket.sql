-- Create chat-media bucket for images, documents, and voice recordings
-- Run in Supabase SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-media', 'chat-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated uploads
CREATE POLICY "Allow authenticated uploads to chat-media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'chat-media');

-- Allow public reads
CREATE POLICY "Allow public reads on chat-media" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'chat-media');

-- Allow service role full access
CREATE POLICY "Allow service role on chat-media" ON storage.objects
  FOR ALL TO service_role
  USING (bucket_id = 'chat-media');
