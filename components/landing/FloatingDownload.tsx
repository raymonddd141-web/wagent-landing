'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useWaitlist } from './WaitlistProvider'

export default function FloatingDownload() {
  const [visible, setVisible] = useState(false)
  const waitlist = useWaitlist()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => waitlist.open()}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gold text-ink font-medium text-sm shadow-2xl shadow-gold/30 hover:bg-gold-light hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          Join waitlist
        </motion.button>
      )}
    </AnimatePresence>
  )
}
