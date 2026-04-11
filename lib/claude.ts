import 'server-only'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface BusinessContext {
  businessName: string
  customInstructions?: string
  faqs?: Array<{ question: string; answer: string }>
  trainingDocs?: string[]
  handoffEnabled?: boolean
  handoffNumber?: string
}

export async function generateReply(
  customerMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }>,
  context: BusinessContext
): Promise<string> {
  const systemPrompt = buildSystemPrompt(context)

  // Merge consecutive same-role messages (e.g. customer sends "Hi" 5 times)
  // Claude API requires alternating user/assistant roles
  const raw = conversationHistory.slice(-20)
  const merged: Array<{ role: 'user' | 'assistant'; content: string }> = []
  for (const msg of raw) {
    if (!msg.content) continue
    const last = merged[merged.length - 1]
    if (last && last.role === msg.role) {
      last.content += '\n' + msg.content
    } else {
      merged.push({ role: msg.role, content: msg.content })
    }
  }

  // Ensure the conversation ends with a user message
  if (merged.length === 0 || merged[merged.length - 1].role !== 'user') {
    merged.push({ role: 'user', content: customerMessage })
  }

  // Ensure the conversation starts with a user message
  if (merged[0]?.role === 'assistant') {
    merged.shift()
  }

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 120,
    system: systemPrompt,
    messages: merged,
  })

  const block = response.content[0]
  return block.type === 'text' ? block.text : 'How can I help you?'
}

function buildSystemPrompt(context: BusinessContext): string {
  const { businessName, customInstructions, faqs, trainingDocs, handoffEnabled, handoffNumber } = context

  let prompt = customInstructions || `You are the WhatsApp AI assistant for ${businessName}.

CRITICAL RULES — follow these strictly:
- Keep replies SHORT: 1–2 sentences, under 40 words. WhatsApp is a chat, not email.
- READ THE FULL CONVERSATION HISTORY before replying. Never repeat information you or the customer already said.
- If the customer already knows something (location, price, hours), do NOT restate it.
- Sound human — like a helpful team member texting, not a corporate bot.
- No bullet points, numbered lists, or formal headers.
- No greetings after the first exchange — get straight to the point.
- Never end with "How may I assist you?" or similar robotic phrases.
- If the customer says something simple like "ok", "thanks", "I'm coming" — reply briefly (e.g. "See you soon!" or "You're welcome!"). Don't add extra info.
- Match the customer's energy: short messages get short replies.`

  if (handoffEnabled && handoffNumber) {
    prompt += `\n\nHUMAN HANDOFF:
- If the customer has a complaint, is angry, needs something outside your knowledge, or explicitly asks for a human, send them this message exactly: "Let me get someone from the team to help you. Chat them directly here: https://wa.me/${handoffNumber}"
- Only use this handoff message once — do not repeat it if they keep chatting.`
  }

  if (faqs && faqs.length > 0) {
    prompt += '\n\nFREQUENTLY ASKED QUESTIONS:\n'
    faqs.forEach(({ question, answer }) => {
      prompt += `Q: ${question}\nA: ${answer}\n\n`
    })
  }

  if (trainingDocs && trainingDocs.length > 0) {
    prompt += '\n\nBUSINESS INFORMATION:\n'
    trainingDocs.forEach(doc => { prompt += doc.slice(0, 2000) + '\n\n' })
  }

  return prompt
}

export async function generateDemoReply(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }>
): Promise<string> {
  const systemPrompt = `You are a demo AI assistant for WAgenT — an AI WhatsApp automation platform. You are acting as the AI agent for "Accra Electronics Hub", a fictional business, to demonstrate WAgenT's capabilities.

ABOUT ACCRA ELECTRONICS HUB:
- Sells CCTV systems, solar panels, inverters, and electronic accessories
- Hikvision 4-channel kit: GHS 850 (analogue), GHS 1,200 (IP cameras) — both include installation
- Nationwide delivery; Kumasi orders arrive within 48 hours
- Operating hours: Mon–Sat 8am–6pm, AI responds 24/7
- Location: Ring Road Central, Accra

Be concise (under 80 words), helpful, and professional. Show off what an AI agent can do.`

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 200,
    system: systemPrompt,
    messages: [
      ...history.slice(-4),
      { role: 'user', content: message },
    ],
  })

  const block = response.content[0]
  return block.type === 'text' ? block.text : 'Thank you for your message! How can I help you today?'
}
