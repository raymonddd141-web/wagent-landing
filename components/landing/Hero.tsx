'use client'

import { motion } from 'framer-motion'
import { Download, Play, TrendingUp, FileText, Share2, ArrowUpRight } from 'lucide-react'
import { useWaitlist } from './WaitlistProvider'

export default function Hero() {
  const waitlist = useWaitlist()
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* African-inspired geometric pattern background */}
      <div className="absolute inset-0 bg-african-pattern opacity-60 pointer-events-none" aria-hidden />

      {/* Radial gold glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-30 dark:opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-xs font-mono tracking-wide mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="text-gold">Under development · Early access opening soon</span>
          </motion.div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight mb-6">
            Run Your Business.
            <br />
            <span className="gold-text">Smarter. Faster.</span>
            <br />
            Effortlessly.
          </h1>

          <p className="text-lg lg:text-xl text-ink/70 dark:text-cream/70 max-w-xl leading-relaxed mb-8">
            Invoices, stock management, sales analytics, AI flyer generation, and social media posting —
            all in one desktop app built for Africa.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => waitlist.open()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-light text-ink font-medium text-sm transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-gold/40"
            >
              <Download className="w-4 h-4" />
              Join the Waitlist
            </button>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-ink/20 dark:border-cream/20 hover:border-gold hover:text-gold font-medium text-sm transition-all"
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </a>
          </div>

          <p className="text-xs font-mono text-ink/50 dark:text-cream/50 tracking-wide">
            Be first in line · Early-access discount · Windows & Mac
          </p>
        </motion.div>

        {/* Right: dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="relative h-[480px] lg:h-[560px]"
        >
          {/* Main dashboard card */}
          <div className="absolute inset-0 rounded-2xl bg-navy dark:bg-card-dark border border-gold/20 p-5 gold-glow-strong overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10px] font-mono text-cream/60 tracking-wider uppercase">Wagent Desktop</div>
                <div className="text-cream font-display text-lg">Good morning, Kwame</div>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-cream/5 rounded-lg p-3 border border-cream/10">
                <div className="text-[9px] font-mono text-cream/50 uppercase tracking-wider">Revenue</div>
                <div className="text-cream font-display text-base mt-1">GHS 48,200</div>
              </div>
              <div className="bg-cream/5 rounded-lg p-3 border border-cream/10">
                <div className="text-[9px] font-mono text-cream/50 uppercase tracking-wider">Invoices</div>
                <div className="text-cream font-display text-base mt-1">128</div>
              </div>
              <div className="bg-gold/10 rounded-lg p-3 border border-gold/30">
                <div className="text-[9px] font-mono text-gold/80 uppercase tracking-wider">Stock</div>
                <div className="text-gold font-display text-base mt-1">412 items</div>
              </div>
            </div>

            {/* Mini chart */}
            <div className="bg-cream/5 rounded-lg p-4 border border-cream/10 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] font-mono text-cream/60 uppercase tracking-wider">Sales · 7 days</div>
                <span className="text-[10px] font-mono text-green-400">+24.6%</span>
              </div>
              <svg viewBox="0 0 200 60" className="w-full h-16">
                <defs>
                  <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 L25,40 L50,30 L75,35 L100,20 L125,25 L150,12 L175,18 L200,8 L200,60 L0,60 Z"
                  fill="url(#heroChart)"
                />
                <path
                  d="M0,45 L25,40 L50,30 L75,35 L100,20 L125,25 L150,12 L175,18 L200,8"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Mini flyer preview */}
            <div className="bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg p-3 border border-gold/20">
              <div className="text-[10px] font-mono text-gold uppercase tracking-wider mb-1">Latest Flyer</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded bg-gold/30 flex items-center justify-center flex-shrink-0">
                  <Share2 className="w-5 h-5 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-cream text-xs font-medium truncate">Mid-month sale — up to 30% off</div>
                  <div className="text-cream/50 text-[10px] font-mono mt-0.5">Posted to 4 platforms · 2 min ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating mini card 1 — revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -top-4 -left-4 lg:-left-10 animate-float"
          >
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <div className="text-[9px] font-mono text-ink/50 dark:text-cream/50 uppercase">This week</div>
                <div className="font-display text-sm font-semibold">GHS 12,400 revenue</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            </div>
          </motion.div>

          {/* Floating mini card 2 — invoices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute top-1/3 -right-4 lg:-right-8 animate-float-delayed"
          >
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="text-[9px] font-mono text-ink/50 dark:text-cream/50 uppercase">Today</div>
                <div className="font-display text-sm font-semibold">18 invoices sent</div>
              </div>
            </div>
          </motion.div>

          {/* Floating mini card 3 — flyer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="absolute -bottom-4 left-8 lg:-left-4 animate-float-slow"
          >
            <div className="bg-white dark:bg-card-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0">
                <Share2 className="w-4 h-4 text-ink" />
              </div>
              <div>
                <div className="text-[9px] font-mono text-ink/50 dark:text-cream/50 uppercase">Just now</div>
                <div className="font-display text-sm font-semibold">Flyer posted · 4 platforms ✓</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
