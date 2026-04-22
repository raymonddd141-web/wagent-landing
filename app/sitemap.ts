import type { MetadataRoute } from 'next'

const BASE = 'https://wagent-africa.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/#features`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/#pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/#security`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/#download`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ]
}
