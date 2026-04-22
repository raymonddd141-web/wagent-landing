'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'

interface WaitlistModalProps {
  open: boolean
  onClose: () => void
  platform?: string
}

const countries = ['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Uganda', 'Tanzania', 'Rwanda', 'Ivory Coast', 'Senegal', 'Other']

export default function WaitlistModal({ open, onClose, platform }: WaitlistModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('Ghana')
  const [businessType, setBusinessType] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, country, businessType, platform }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }
      setSuccess(true)
      setLoading(false)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  const handleClose = () => {
    onClose()
    // Reset after close animation
    setTimeout(() => {
      if (!open) {
        setSuccess(false)
        setError('')
        setName('')
        setEmail('')
        setBusinessType('')
      }
    }, 400)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-ink/70 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-white dark:bg-card-dark rounded-2xl shadow-2xl border border-border-light dark:border-border-dark pointer-events-auto overflow-hidden"
            >
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-parchment dark:hover:bg-ink/50 transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {success ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.1 }}
                    className="w-16 h-16 mx-auto rounded-full bg-gold flex items-center justify-center mb-5 gold-glow"
                  >
                    <Check className="w-8 h-8 text-ink" strokeWidth={3} />
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold mb-2">You're on the list.</h3>
                  <p className="text-sm text-ink/60 dark:text-cream/60 leading-relaxed">
                    We'll email you when Wagent Africa launches — plus an exclusive early-access discount just
                    for joining today.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-5 py-2.5 rounded-full bg-gold hover:bg-gold-light text-ink text-sm font-medium transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <div className="p-7">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gold mb-3">
                      <Sparkles className="w-3 h-3" />
                      Early access
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-1.5 leading-tight">
                      Join the <span className="gold-text">waitlist</span>
                    </h3>
                    <p className="text-sm text-ink/60 dark:text-cream/60 leading-relaxed">
                      Wagent Africa is almost ready. Get notified the moment we launch — and lock in an
                      early-access discount.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-ink/50 dark:text-cream/50 mb-1.5 block">
                        Full name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Kwame Mensah"
                        className="w-full px-4 py-2.5 rounded-lg bg-parchment dark:bg-ink/50 border border-border-light dark:border-border-dark text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-ink/50 dark:text-cream/50 mb-1.5 block">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@business.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-parchment dark:bg-ink/50 border border-border-light dark:border-border-dark text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-ink/50 dark:text-cream/50 mb-1.5 block">
                          Country
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg bg-parchment dark:bg-ink/50 border border-border-light dark:border-border-dark text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        >
                          {countries.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-mono uppercase tracking-wider text-ink/50 dark:text-cream/50 mb-1.5 block">
                          Business type
                        </label>
                        <input
                          type="text"
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          placeholder="Retail, fashion, etc."
                          className="w-full px-3 py-2.5 rounded-lg bg-parchment dark:bg-ink/50 border border-border-light dark:border-border-dark text-sm focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className={cn(
                        'w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gold hover:bg-gold-light text-ink font-medium text-sm transition-all',
                        loading && 'opacity-70 cursor-not-allowed'
                      )}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        'Join the waitlist'
                      )}
                    </button>

                    <p className="text-[11px] font-mono text-ink/40 dark:text-cream/40 text-center mt-2">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
