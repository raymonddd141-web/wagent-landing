import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Wagent Africa — Business software for African SMEs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'radial-gradient(circle at 30% 20%, rgba(212,175,55,0.25) 0%, transparent 60%), #0D0D0D',
          padding: 80,
          position: 'relative',
          color: '#F5F5F0',
        }}
      >
        {/* Gold top rule */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1 }}>Wagent</div>
          <div
            style={{
              fontSize: 36,
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #D4AF37 0%, #E6C35A 50%, #B8942F 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Africa
          </div>
        </div>

        {/* Eyebrow */}
        <div style={{ marginTop: 50, display: 'flex' }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#D4AF37',
              border: '1px solid rgba(212,175,55,0.4)',
              padding: '8px 16px',
              borderRadius: 999,
              background: 'rgba(212,175,55,0.05)',
            }}
          >
            🌍 Built for African Businesses
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 36,
            letterSpacing: -2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Run Your Business.</span>
          <span
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #E6C35A 50%, #B8942F 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Smarter. Faster.
          </span>
          <span>Effortlessly.</span>
        </div>

        {/* Footer row */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 24, color: 'rgba(245,245,240,0.7)' }}>
            Invoices · Stock · Analytics · AI Flyers · Social Posting
          </div>
          <div style={{ fontSize: 18, color: 'rgba(212,175,55,0.7)', letterSpacing: 2 }}>
            WAGENT-AFRICA.COM
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
