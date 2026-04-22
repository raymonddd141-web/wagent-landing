import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, DM_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import WaitlistProvider from '@/components/landing/WaitlistProvider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const SITE_URL = 'https://wagent-africa.com'
const SITE_NAME = 'Wagent Africa'
const SITE_DESCRIPTION =
  'Desktop SaaS for African businesses. Invoices, stock, sales analytics, AI flyer generation with automatic social media posting — all in one app, built for Africa. Powered by Lytrix Consult.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Run Your Business. Smarter. Faster. Effortlessly.`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: [
    'Wagent Africa',
    'Wagent',
    'African business software',
    'invoice software Ghana',
    'invoice app Nigeria',
    'stock management Africa',
    'inventory software Kenya',
    'sales analytics for African SMEs',
    'AI flyer generator Africa',
    'social media posting app',
    'business automation Ghana',
    'expense tracker Africa',
    'SME software Africa',
    'Ghana POS alternative',
    'Lytrix Consult',
  ],
  authors: [{ name: 'Lytrix Consult', url: SITE_URL }],
  creator: 'Lytrix Consult',
  publisher: 'Lytrix Consult',
  category: 'Business Software',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-GH': SITE_URL,
      'en-NG': SITE_URL,
      'en-KE': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    alternateLocale: ['en_NG', 'en_KE', 'en_ZA', 'en_US'],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Business Software Built for Africa`,
    description:
      'Invoices, stock, analytics, AI flyer generation with automatic social posting — one beautiful desktop app for African businesses. Join the waitlist.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Wagent Africa — Business software for African SMEs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Business Software for Africa`,
    description:
      'Invoices · Stock · Analytics · AI Flyer Generator · Social Posting. One desktop app, built for Africa.',
    images: ['/opengraph-image'],
    creator: '@wagentafrica',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/favicon.ico' }],
  },
  manifest: '/manifest.json',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_NAME,
    'format-detection': 'telephone=no',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_URL}#software`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows, macOS',
      offers: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'GHS' },
        { '@type': 'Offer', name: 'Growth', price: '120', priceCurrency: 'GHS' },
        { '@type': 'Offer', name: 'Business', price: '280', priceCurrency: 'GHS' },
        { '@type': 'Offer', name: 'Enterprise', price: '600', priceCurrency: 'GHS' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '42',
      },
      featureList: [
        'Invoice management',
        'Stock & inventory',
        'Sales analytics',
        'Expense tracking',
        'AI flyer generation',
        'Social media auto-posting',
        'WhatsApp notifications',
      ],
      creator: {
        '@type': 'Organization',
        name: 'Lytrix Consult',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/lytrix.png`,
      description: SITE_DESCRIPTION,
      foundingLocation: 'Accra, Ghana',
      areaServed: ['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Africa'],
      parentOrganization: {
        '@type': 'Organization',
        name: 'Lytrix Consult',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: 'en-GH',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-white text-ink dark:bg-ink dark:text-cream">
        <ThemeProvider>
          <WaitlistProvider>{children}</WaitlistProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
