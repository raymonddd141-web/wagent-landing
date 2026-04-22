'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Search, KeyRound } from 'lucide-react'

const pillars = [
  {
    icon: KeyRound,
    title: 'Phone Verification',
    body: 'One account per phone number. No abuse. No duplicate trials.',
  },
  {
    icon: ShieldCheck,
    title: 'Encrypted & Isolated',
    body: "Every business's data is fully isolated. Row-level security means no one sees what isn't theirs.",
  },
  {
    icon: Search,
    title: 'Threat Detection',
    body: 'Suspicious signups flagged by IP, device, and behavior patterns.',
  },
  {
    icon: Lock,
    title: 'End-to-End Protection',
    body: 'TLS 1.3, MFA support, signed app updates, and Cloudflare DDoS protection.',
  },
]

export default function Security() {
  return (
    <section id="security" className="py-24 lg:py-32 bg-ink text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-african-pattern opacity-30 pointer-events-none" aria-hidden />
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs font-mono tracking-wider uppercase text-gold mb-4">Security</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Your data. <span className="gold-text">Locked down.</span>
          </h2>
          <p className="text-lg text-cream/70">
            Security is not an afterthought at Wagent Africa — it's the foundation.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          {pillars.map((p) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="group relative bg-card-dark border border-border-dark rounded-2xl p-7 hover:border-gold/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                    <p className="text-sm text-cream/60 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
