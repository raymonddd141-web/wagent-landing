'use client'

import { motion } from 'framer-motion'
import { Receipt, Package, BarChart3, Wallet, Sparkles, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: Receipt,
    title: 'Smart Invoicing',
    body: 'Create, send, and print professional invoices. Deliver directly to customers via WhatsApp.',
  },
  {
    icon: Package,
    title: 'Stock Management',
    body: 'Track inventory in real time. Get low-stock alerts before you run out.',
  },
  {
    icon: BarChart3,
    title: 'Sales Analytics',
    body: 'Beautiful charts showing revenue, top customers, best and slow-moving products by day, month, and year.',
  },
  {
    icon: Wallet,
    title: 'Expense Tracker',
    body: 'Log and categorize business expenses. See exactly where your money goes.',
  },
  {
    icon: Sparkles,
    title: 'AI Flyer Generator',
    body: 'Upload a product image, pick a template. Python removes backgrounds, fills your design, AI writes the caption — one click posts to all platforms.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Notifications',
    body: 'Receive weekly business reports, low stock alerts, and revenue milestones directly on WhatsApp.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs font-mono tracking-wider uppercase text-gold mb-4">Features</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Everything your business needs
          </h2>
          <p className="text-lg text-ink/60 dark:text-cream/60">One platform. Zero confusion.</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative bg-parchment dark:bg-card-dark border border-border-light dark:border-border-dark rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-gold/5 overflow-hidden"
              >
                {/* Gold top border on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-ink/60 dark:text-cream/60 leading-relaxed">{f.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
