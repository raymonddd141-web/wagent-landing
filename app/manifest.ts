import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wagent Africa',
    short_name: 'Wagent',
    description:
      'Desktop SaaS for African businesses. Invoices, stock, analytics, AI flyers and social posting — all in one.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0D0D',
    theme_color: '#D4AF37',
    orientation: 'portrait',
    categories: ['business', 'productivity', 'finance'],
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/lytrix.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
}
