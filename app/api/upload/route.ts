import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string // 'image' | 'document' | 'audio'

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
    }

    const { data: business } = await supabase.from('businesses').select('id').eq('user_id', user.id).single()
    if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const ext = file.name.split('.').pop() || 'bin'
    const folder = type === 'audio' ? 'voice' : type === 'image' ? 'images' : 'documents'
    const filename = `${folder}/${business.id}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${ext}`
    const bucket = 'chat-media'

    const buffer = Buffer.from(await file.arrayBuffer())
    const { error } = await serviceClient.storage.from(bucket).upload(filename, buffer, {
      contentType: file.type,
    })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }

    const { data: { publicUrl } } = serviceClient.storage.from(bucket).getPublicUrl(filename)

    return NextResponse.json({ url: publicUrl, filename: file.name })
  } catch (e) {
    console.error('Upload error:', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
