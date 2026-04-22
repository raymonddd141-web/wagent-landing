'use client'

import { motion } from 'framer-motion'
import { Check, Crown, Package2 } from 'lucide-react'
import dynamic from 'next/dynamic'

const AnalyticsChart = dynamic(() => import('./AnalyticsChart'), {
  ssr: false,
  loading: () => <div className="h-56 rounded-xl bg-cream/5" />,
})

const bullets = [
  'Daily, monthly, yearly revenue charts',
  'Best customers of the year',
  'Most and least sold products',
  'Expense breakdown by category',
  'Invoice status tracking',
]

export default function AnalyticsShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-parchment/40 dark:bg-card-dark/40 border-y border-border-light dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xs font-mono tracking-wider uppercase text-gold mb-4">Analytics</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Your business, <span className="gold-text">visualized</span>
          </h2>
          <p className="text-lg text-ink/60 dark:text-cream/60 mb-8 leading-relaxed">
            Every sale, every customer, every cedi — laid out clearly. Make decisions based on what's actually
            happening, not guesses.
          </p>

          <ul className="space-y-3">
            {bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-gold" strokeWidth={3} />
                </div>
                <span className="text-sm text-ink/80 dark:text-cream/80">{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="bg-navy dark:bg-card-dark rounded-2xl border border-gold/20 p-6 gold-glow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-cream/50">Revenue · 2026</div>
                <div className="font-display text-cream text-2xl font-bold">GHS 284,600</div>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-green-400">
                <span>▲</span> +18.2%
              </div>
            </div>

            <div className="bg-cream/5 rounded-xl p-3 mb-4">
              <AnalyticsChart />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-3 h-3 text-gold" />
                  <div className="text-[9px] font-mono uppercase tracking-wider text-cream/50">Top customer</div>
                </div>
                <div className="text-cream font-display text-sm font-semibold">Ama Serwaa</div>
                <div className="text-gold text-xs font-mono">GHS 8,200</div>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Package2 className="w-3 h-3 text-gold" />
                  <div className="text-[9px] font-mono uppercase tracking-wider text-cream/50">Best product</div>
                </div>
                <div className="text-cream font-display text-sm font-semibold">Black Dress XL</div>
                <div className="text-gold text-xs font-mono">142 units</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
