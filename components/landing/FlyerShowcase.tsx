'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Upload, Scissors, LayoutTemplate, PenLine, Share2, CheckCircle2, ArrowRight } from 'lucide-react'

const steps = [
  { icon: Upload, label: 'Upload photo', desc: 'Drop your product image' },
  { icon: Scissors, label: 'Remove background', desc: 'Instant, clean cutout' },
  { icon: LayoutTemplate, label: 'Pick a template', desc: 'Beautiful designs' },
  { icon: PenLine, label: 'AI writes caption', desc: 'Captions + hashtags' },
  { icon: Share2, label: 'Post everywhere', desc: 'All platforms, one click' },
]

export default function FlyerShowcase() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs font-mono tracking-wider uppercase text-gold mb-4">AI Flyer Generator</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-4">
            From photo to posted — <span className="gold-text">in seconds</span>
          </h2>
          <p className="text-lg text-ink/60 dark:text-cream/60">
            Five steps. One click. Every platform.
          </p>
        </motion.div>

        {/* Horizontal step flow */}
        <div className="relative mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-2 relative"
          >
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="relative flex flex-col items-center text-center px-2"
                >
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-parchment dark:bg-card-dark border border-gold/30 flex items-center justify-center gold-glow">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-ink text-xs font-mono font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>
                  <div className="font-display font-semibold text-sm lg:text-base mb-1">{s.label}</div>
                  <div className="text-xs text-ink/50 dark:text-cream/50">{s.desc}</div>

                  {i < steps.length - 1 && (
                    <ArrowRight className="hidden md:block absolute top-5 -right-3 w-5 h-5 text-gold/40" />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Before / after card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative bg-navy dark:bg-card-dark rounded-3xl border border-gold/30 p-6 lg:p-8 gold-glow-strong overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-20 pointer-events-none" aria-hidden />

            <div className="relative grid md:grid-cols-2 gap-6 items-stretch">
              {/* Before: raw photo */}
              <div className="flex flex-col">
                <div className="text-[10px] font-mono tracking-wider uppercase text-cream/50 mb-2">Before · Raw photo</div>
                <div className="relative flex-1 rounded-2xl border border-cream/10 bg-cream/5 overflow-hidden min-h-[320px]">
                  <Image
                    src="/img.jpg"
                    alt="Raw product photo"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* After: finished flyer */}
              <div className="flex flex-col">
                <div className="text-[10px] font-mono tracking-wider uppercase text-gold mb-2">After · Flyer design</div>
                <div className="relative flex-1 rounded-2xl border border-gold/40 bg-cream/5 overflow-hidden min-h-[320px]">
                  <Image
                    src="/TRITECH1.jpg"
                    alt="Finished flyer design"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Floating "posted to 5 platforms" badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4, type: 'spring' }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-gold text-ink px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-medium text-sm whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4" />
            Posted to 5 platforms in 1 click
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
