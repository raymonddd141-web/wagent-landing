'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useWaitlist } from './WaitlistProvider'

type Plan = {
  name: string
  tag?: string
  monthly: number
  features: string[]
  cta: string
  popular?: boolean
}

const plans: Plan[] = [
  {
    name: 'Free',
    tag: 'Starter',
    monthly: 0,
    features: [
      'Up to 20 invoices/month',
      'Up to 50 products',
      'Basic dashboard',
      '1 user',
      'Wagent watermark',
    ],
    cta: 'Download free',
  },
  {
    name: 'Growth',
    monthly: 120,
    features: [
      'Unlimited invoices',
      '500 products',
      'Expense tracker',
      'Customer analytics',
      'WhatsApp invoice delivery',
      '10 flyers/month',
      '3 users',
    ],
    cta: 'Start 14-day trial',
    popular: true,
  },
  {
    name: 'Business',
    monthly: 280,
    features: [
      'Everything in Growth',
      'Unlimited flyers',
      'AI captions + hashtags',
      'Post to all social platforms',
      'Scheduled posting',
      'Post analytics',
      '10 users',
    ],
    cta: 'Start 14-day trial',
  },
  {
    name: 'Enterprise',
    monthly: 600,
    features: [
      'Everything in Business',
      'Unlimited users',
      'White-label outputs',
      'Multi-branch support',
      'Custom templates',
      'Dedicated account manager',
    ],
    cta: 'Talk to sales',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const multiplier = annual ? 10 : 1 // 2 months free on annual
  const waitlist = useWaitlist()

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="text-xs font-mono tracking-wider uppercase text-gold mb-4">Pricing</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Simple pricing. <span className="gold-text">No surprises.</span>
          </h2>
          <p className="text-lg text-ink/60 dark:text-cream/60 mb-4">
            Start free. Pay only for what your business actually uses.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/5 text-[11px] font-mono tracking-wide text-gold">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
            </span>
            Pricing locks in when you join the waitlist
          </div>
        </motion.div>

        {/* Billing toggle — segmented control */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3 mb-12"
        >
          <div className="relative inline-flex items-center p-1 rounded-full bg-parchment dark:bg-card-dark border border-border-light dark:border-border-dark">
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className="absolute top-1 bottom-1 rounded-full bg-gold shadow-md shadow-gold/30"
              style={{
                left: annual ? '50%' : '4px',
                right: annual ? '4px' : '50%',
              }}
            />
            <button
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={cn(
                'relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                !annual ? 'text-ink' : 'text-ink/60 dark:text-cream/60'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={cn(
                'relative z-10 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200',
                annual ? 'text-ink' : 'text-ink/60 dark:text-cream/60'
              )}
            >
              Annual
            </button>
          </div>
          <div className="text-xs font-mono text-gold tracking-wide">
            {annual ? '✓ 2 months free' : 'Save 2 months — pay annually'}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {plans.map((p) => (
            <motion.div
              key={p.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className={cn(
                'relative rounded-2xl border p-6 flex flex-col transition-all duration-300',
                p.popular
                  ? 'bg-navy dark:bg-card-dark border-gold lg:scale-[1.03] gold-glow z-10'
                  : 'bg-parchment dark:bg-card-dark border-border-light dark:border-border-dark hover:border-gold/40'
              )}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-ink px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 whitespace-nowrap">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className={cn('mb-5', p.popular && 'text-cream')}>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                  {p.tag && <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">{p.tag}</span>}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={annual ? 'a' : 'm'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-baseline gap-1.5 mt-3"
                  >
                    <span className="font-display text-4xl font-bold">
                      GHS {p.monthly === 0 ? '0' : (p.monthly * multiplier).toLocaleString()}
                    </span>
                    <span className="text-xs font-mono opacity-50">/{annual ? 'year' : 'month'}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className={cn('space-y-2.5 mb-6 flex-1', p.popular ? 'text-cream/80' : 'text-ink/70 dark:text-cream/70')}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className={cn('w-4 h-4 mt-0.5 flex-shrink-0', p.popular ? 'text-gold' : 'text-gold/80')}
                      strokeWidth={3}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => waitlist.open(p.name)}
                className={cn(
                  'w-full inline-flex items-center justify-center px-4 py-3 rounded-full font-medium text-sm transition-all',
                  p.popular
                    ? 'bg-gold text-ink hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30'
                    : 'border border-ink/20 dark:border-cream/20 hover:border-gold hover:text-gold'
                )}
              >
                Join waitlist
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
