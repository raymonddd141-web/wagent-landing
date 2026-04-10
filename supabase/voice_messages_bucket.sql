-- Create voice-messages bucket (run in Supabase SQL Editor)
INSERT INTO storage.buckets (id, name, public)
VALUES ('voice-messages', 'voice-messages', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload voice messages
CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'voice-messages');

-- Allow public reads for voice playback
CREATE POLICY "Allow public voice reads" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'voice-messages');

-- Allow service role full access (for webhook uploads)
CREATE POLICY "Allow service role voice access" ON storage.objects
  FOR ALL TO service_role
  USING (bucket_id = 'voice-messages');
