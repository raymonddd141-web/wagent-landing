'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const templates = [
  { src: '/TRITECH1.jpg', alt: 'Tritech flyer template 1' },
  { src: '/TRITECH02.jpg', alt: 'Tritech flyer template 2' },
  { src: '/TRITECH04.jpg', alt: 'Tritech flyer template 4' },
  { src: '/hilook tritech5.jpg', alt: 'Hilook Tritech flyer template' },
]

export default function TemplateGallery() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="text-xs font-mono tracking-wider uppercase text-gold mb-4">Template Gallery</div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Pick a design. <span className="gold-text">Make it yours.</span>
          </h2>
          <p className="text-lg text-ink/60 dark:text-cream/60">
            Dozens of ready-made templates designed for African businesses. Drop in your product and post.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"
        >
          {templates.map((t, i) => (
            <motion.div
              key={t.src}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group relative rounded-2xl overflow-hidden border border-border-light dark:border-border-dark bg-parchment dark:bg-card-dark cursor-pointer hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10 transition-all"
            >
              <div className="relative aspect-[4/3] w-full bg-ink/5 dark:bg-cream/5 flex items-center justify-center">
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain"
                  priority={i < 2}
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Hover CTA */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold text-ink text-xs font-medium">
                    Use template
                  </div>
                </div>

                {/* Template number badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-ink/70 backdrop-blur-sm text-cream text-[10px] font-mono tracking-wider">
                  0{i + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-sm font-mono text-ink/50 dark:text-cream/50 tracking-wide">
            + 40 more templates in the app · New designs every week
          </p>
        </motion.div>
      </div>
    </section>
  )
}
