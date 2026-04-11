'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

export default function WhatsAppSupportButton() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [pulse, setPulse] = useState(true)
  const [waLink, setWaLink] = useState('#')
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const dragRef = useRef(false)
  const startRef = useRef({ x: 0, y: 0, px: 0, py: 0 })
  const btnRef = useRef<HTMLDivElement>(null)
  const movedRef = useRef(false)

  // Initialize position to bottom-right
  useEffect(() => {
    setPos({ x: window.innerWidth - 80, y: window.innerHeight - 80 })
  }, [])

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(d => {
        const num = d.lytrix_wa_number || process.env.NEXT_PUBLIC_LYTRIX_WA_NUMBER || '233XXXXXXXXX'
        const msg = encodeURIComponent("Hi LYTRIX CONSULT, I need help setting up WAgenT for my business.")
        setWaLink(`https://wa.me/${num}?text=${msg}`)
      })
      .catch(() => {
        const num = process.env.NEXT_PUBLIC_LYTRIX_WA_NUMBER || '233XXXXXXXXX'
        const msg = encodeURIComponent("Hi LYTRIX CONSULT, I need help setting up WAgenT for my business.")
        setWaLink(`https://wa.me/${num}?text=${msg}`)
      })
    const t = setTimeout(() => setVisible(true), 2000)
    const t2 = setTimeout(() => setPulse(false), 8000)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    dragRef.current = true
    movedRef.current = false
    startRef.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y }
    setDragging(true)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [pos])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - startRef.current.x
    const dy = e.clientY - startRef.current.y
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) movedRef.current = true
    const newX = Math.max(8, Math.min(window.innerWidth - 64, startRef.current.px + dx))
    const newY = Math.max(8, Math.min(window.innerHeight - 64, startRef.current.py + dy))
    setPos({ x: newX, y: newY })
  }, [])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragRef.current = false
    setDragging(false)
    // Snap to nearest edge (left or right)
    setPos(prev => ({
      x: prev.x < window.innerWidth / 2 ? 16 : window.innerWidth - 72,
      y: prev.y,
    }))
    // If it was a click (not a drag), open the link
    if (!movedRef.current) {
      window.open(waLink, '_blank', 'noopener,noreferrer')
    }
  }, [waLink])

  return (
    <div
      ref={btnRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onMouseEnter={() => { if (!dragging) setShowTooltip(true) }}
      onMouseLeave={() => setShowTooltip(false)}
      className={`fixed z-50 flex flex-col items-end gap-3 select-none ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{
        left: pos.x,
        top: pos.y,
        transition: dragging ? 'none' : 'left 0.3s ease, top 0.05s ease, opacity 0.5s ease',
        touchAction: 'none',
        cursor: dragging ? 'grabbing' : 'grab',
      }}
    >
      {/* Tooltip */}
      {showTooltip && !dragging && (
        <div
          className="absolute bottom-[64px] right-0 bg-[#1f2c34] border border-[#374045] rounded-2xl px-4 py-3 shadow-2xl max-w-[220px] text-right whitespace-nowrap"
          style={{ animation: 'fadeUp 0.2s ease-out' }}
        >
          <p className="text-[#e9edef] text-sm font-medium">Need help with setup?</p>
          <p className="text-[#8696a0] text-xs mt-0.5">Chat with LYTRIX CONSULT</p>
        </div>
      )}

      {/* Button */}
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,168,132,0.35)] hover:shadow-[0_8px_40px_rgba(0,168,132,0.55)] transition-shadow duration-200"
        style={{ background: 'linear-gradient(135deg, #00c49a 0%, #00a884 100%)' }}
      >
        {pulse && <span className="absolute inset-0 rounded-full bg-[#00a884] animate-ping opacity-40" />}
        <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
