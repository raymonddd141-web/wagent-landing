'use client'

import { motion } from 'framer-motion'

const businesses = [
  'Serwaa Fashion House',
  'Accra Electronics Hub',
  'Kente Heritage Co.',
  'Lagos Fresh Grocers',
  'Nairobi Coffee Works',
  'Osu Beauty Lounge',
  'Kumasi Textiles Ltd',
  'Abuja Stationery Co.',
  'Tema Spare Parts',
  'Legon Pharmacy',
]

export default function SocialProof() {
  return (
    <section className="py-16 border-y border-border-light dark:border-border-dark bg-parchment/50 dark:bg-card-dark/50">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-xs font-mono tracking-wider uppercase text-ink/60 dark:text-cream/60 mb-10"
      >
        Trusted by businesses across Ghana, Nigeria, Kenya and beyond
      </motion.p>

      <div className="relative overflow-hidden scrollbar-hide">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...businesses, ...businesses].map((name, i) => (
            <span
              key={i}
              className="font-display text-xl lg:text-2xl text-ink/40 dark:text-cream/40 hover:text-gold transition-colors flex-shrink-0"
            >
              {name}
            </span>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-parchment/50 dark:from-card-dark/50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-parchment/50 dark:from-card-dark/50 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
