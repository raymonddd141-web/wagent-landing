'use client'

import { motion } from 'framer-motion'
import { useWaitlist } from './WaitlistProvider'

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 5.5L11 4v8H3V5.5zM12 3.9L22 2v10H12V3.9zM3 13h8v7.5L3 19V13zm9 0h10v8l-10-1.5V13z" />
    </svg>
  )
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.5 12.5c0-3 2.4-4.4 2.5-4.5-1.4-2-3.5-2.3-4.3-2.3-1.8-.2-3.6 1.1-4.5 1.1-.9 0-2.4-1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12 1 1.5 2.2 3.1 3.8 3 1.6-.1 2.1-1 4-1s2.4 1 4 1 2.7-1.5 3.7-3c1.2-1.7 1.6-3.4 1.7-3.5-.1 0-3.4-1.3-3.4-5.1zM14.6 4.2c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z" />
    </svg>
  )
}

export default function DownloadCTA() {
  const waitlist = useWaitlist()

  return (
    <section id="download" className="py-24 lg:py-32 bg-ink text-cream relative overflow-hidden">
      {/* Gold gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 60%)' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-african-pattern opacity-30 pointer-events-none" aria-hidden />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-[11px] font-mono tracking-wide mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gold" />
            </span>
            <span className="text-gold uppercase tracking-wider">Launching soon</span>
          </div>

          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-tight mb-4">
            Ready to take control of <span className="gold-text">your business?</span>
          </h2>
          <p className="text-lg lg:text-xl text-cream/70 mb-10 max-w-2xl mx-auto">
            Wagent Africa is under active development. Join the waitlist today and be among the first to get it
            when we launch — with an exclusive early-access discount.
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col sm:flex-row justify-center gap-3 mb-6"
          >
            <motion.button
              onClick={() => waitlist.open('Windows')}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-gold hover:bg-gold-light text-ink font-medium text-base transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-gold/40"
            >
              <WindowsIcon className="w-5 h-5" />
              Waitlist · Windows
            </motion.button>
            <motion.button
              onClick={() => waitlist.open('Mac')}
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full border border-cream/20 hover:border-gold hover:text-gold font-medium text-base transition-all"
            >
              <AppleIcon className="w-5 h-5" />
              Waitlist · Mac
            </motion.button>
          </motion.div>

          <p className="text-xs font-mono text-cream/50 tracking-wider">
            No spam · Unsubscribe anytime · One email when we launch
          </p>
        </motion.div>
      </div>
    </section>
  )
}
