'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Download } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/cn'
import { useWaitlist } from './WaitlistProvider'

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Security', href: '#security' },
  { label: 'Waitlist', href: '#download' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const waitlist = useWaitlist()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass bg-white/70 dark:bg-ink/70 border-b border-border-light dark:border-border-dark'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-baseline gap-1.5">
          <span className="font-display font-bold text-2xl tracking-tight">Wagent</span>
          <span className="font-display italic text-xl gold-text">Africa</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="gold-border-hover text-sm font-medium text-ink/70 dark:text-cream/70 hover:text-ink dark:hover:text-cream transition-colors py-2"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-parchment dark:hover:bg-card-dark transition-colors border border-border-light dark:border-border-dark"
          >
            {mounted && (theme === 'dark' ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4" />)}
          </button>
          <button
            onClick={() => waitlist.open()}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold hover:bg-gold-light text-ink font-medium text-sm transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-gold/30"
          >
            <Download className="w-4 h-4" />
            Join the Waitlist
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-parchment dark:hover:bg-card-dark border border-border-light dark:border-border-dark"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden glass bg-white/95 dark:bg-ink/95 border-b border-border-light dark:border-border-dark overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium border-b border-border-light dark:border-border-dark last:border-0"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false)
                  waitlist.open()
                }}
                className="mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gold text-ink font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                Join the Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
