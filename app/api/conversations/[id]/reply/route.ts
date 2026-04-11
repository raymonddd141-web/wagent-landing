import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendTextMessage, sendImageMessage, sendDocumentMessage, sendAudioMessage } from '@/lib/whatsapp'
import { sanitizeInput } from '@/lib/utils'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { content, message_type = 'text', media_url, filename } = body

    const { data: business } = await supabase.from('businesses').select('id, phone_number_id, whatsapp_access_token').eq('user_id', user.id).single()
    if (!business) return NextResponse.json({ error: 'Business not found' }, { status: 404 })

    const { data: conversation } = await supabase.from('conversations').select('id, customer_phone, status').eq('id', params.id).eq('business_id', business.id).single()
    if (!conversation) return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })

    // Send via WhatsApp
    if (business.phone_number_id && business.whatsapp_access_token) {
      if (message_type === 'image' && media_url) {
        await sendImageMessage(business.phone_number_id, business.whatsapp_access_token, conversation.customer_phone, media_url, content || undefined)
      } else if (message_type === 'document' && media_url) {
        await sendDocumentMessage(business.phone_number_id, business.whatsapp_access_token, conversation.customer_phone, media_url, filename || 'document')
      } else if (message_type === 'audio' && media_url) {
        await sendAudioMessage(business.phone_number_id, business.whatsapp_access_token, conversation.customer_phone, media_url)
      } else if (content) {
        const sanitized = sanitizeInput(content.trim())
        await sendTextMessage(business.phone_number_id, business.whatsapp_access_token, conversation.customer_phone, sanitized)
      }
    }

    const serviceClient = createServiceClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const displayContent = message_type === 'image' ? (content || 'Photo') : message_type === 'document' ? (filename || 'Document') : message_type === 'audio' ? 'Voice message' : sanitizeInput((content || '').trim())

    await serviceClient.from('messages').insert({
      conversation_id: params.id,
      business_id: business.id,
      from_role: 'staff',
      message_type,
      content: displayContent,
      audio_url: message_type !== 'text' ? media_url : null,
      status: 'sent',
    })

    await serviceClient.from('conversations').update({
      last_message: displayContent,
      last_message_at: new Date().toISOString(),
    }).eq('id', params.id)

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
