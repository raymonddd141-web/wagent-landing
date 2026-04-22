'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import WaitlistModal from './WaitlistModal'

interface WaitlistContextValue {
  open: (platform?: string) => void
  close: () => void
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null)

export function useWaitlist() {
  const ctx = useContext(WaitlistContext)
  if (!ctx) throw new Error('useWaitlist must be used inside WaitlistProvider')
  return ctx
}

export default function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [platform, setPlatform] = useState<string | undefined>(undefined)

  const open = useCallback((p?: string) => {
    setPlatform(p)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <WaitlistContext.Provider value={{ open, close }}>
      {children}
      <WaitlistModal open={isOpen} onClose={close} platform={platform} />
    </WaitlistContext.Provider>
  )
}
