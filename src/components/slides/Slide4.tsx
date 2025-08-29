import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Metric = { title: string; sub?: string; color: string }

const cardStyleBase: React.CSSProperties = {
  position: 'relative',
  borderRadius: 14,
  padding: '18px 22px',
  width: 260,
  minHeight: 96,
  boxShadow: '0 8px 22px rgba(0,0,0,0.10)',
  background: 'rgba(255, 255, 255, 0.94)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
  border: '1px solid rgba(0,0,0,0.06)',
  backdropFilter: 'blur(2px)',
  overflow: 'hidden'
}

type Conn = {
  d: string
  color: string
  key: string
  sx: number
  sy: number
  ex: number
  ey: number
}

export default function Slide4() {
  const leftMetrics: Metric[] = [
    { title: '86 B Parameters', color: '#60a5fa' },
    { title: '1T bit/s', color: '#60a5fa' },
    { title: '20 W of Power', color: '#60a5fa' },
  ]
  const rightMetrics: Metric[] = [
    { title: '1.7 T Parameters', color: '#34d399' },
    { title: '1T Byte/s', sub: '8x More Bandwidth', color: '#34d399' },
    { title: '1300 MWh of Energy', sub: 'H100 NVIDIA', color: '#34d399' },
  ]

  const rootRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const leftRefs = useRef<HTMLDivElement[]>([])
  const rightRefs = useRef<HTMLDivElement[]>([])
  leftRefs.current = []
  rightRefs.current = []

  const setLeftRef = (el: HTMLDivElement | null) => el && leftRefs.current.push(el)
  const setRightRef = (el: HTMLDivElement | null) => el && rightRefs.current.push(el)

  const [connectors, setConnectors] = useState<Conn[]>([])

  const makeCurve = (sx: number, sy: number, ex: number, ey: number) => {
    const dx = ex - sx
    const dy = ey - sy
    const c = Math.max(Math.abs(dx) * 0.55, 80)
    const c1x = sx + c
    const c2x = ex - c
    const c1y = sy + dy * 0.1
    const c2y = ey - dy * 0.1
    return `M ${sx},${sy} C ${c1x},${c1y} ${c2x},${c2y} ${ex},${ey}`
  }

  const recompute = () => {
    const root = rootRef.current
    const circle = circleRef.current
    if (!root || !circle) return

    const rRect = root.getBoundingClientRect()
    const cRect = circle.getBoundingClientRect()
    const circleCx = cRect.left - rRect.left + cRect.width / 2
    const circleCy = cRect.top - rRect.top + cRect.height / 2
    const radius = cRect.width / 2
    const pad = 4

    const list: Conn[] = []

    leftRefs.current.forEach((node, idx) => {
      const b = node.getBoundingClientRect()
      const sx = b.right - rRect.left
      const sy = b.top - rRect.top + b.height / 2
      const ex = circleCx - radius + pad
      const maxDy = radius - 10
      const ey = circleCy + Math.max(-maxDy, Math.min(maxDy, sy - circleCy))
      list.push({ d: makeCurve(sx, sy, ex, ey), color: leftMetrics[idx]?.color || '#60a5fa', key: `L-${idx}`, sx, sy, ex, ey })
    })

    rightRefs.current.forEach((node, idx) => {
      const b = node.getBoundingClientRect()
      const sx = b.left - rRect.left
      const sy = b.top - rRect.top + b.height / 2
      const ex = circleCx + radius - pad
      const maxDy = radius - 10
      const ey = circleCy + Math.max(-maxDy, Math.min(maxDy, sy - circleCy))
      list.push({ d: makeCurve(sx, sy, ex, ey), color: rightMetrics[idx]?.color || '#34d399', key: `R-${idx}`, sx, sy, ex, ey })
    })

    setConnectors(list)
  }

  useLayoutEffect(() => {
    recompute()
    const onResize = () => recompute()
    window.addEventListener('resize', onResize)

    const ResizeObs: typeof ResizeObserver | undefined = (window as any).ResizeObserver
    const ro = ResizeObs ? new ResizeObs(() => recompute()) : undefined
    if (ro && rootRef.current) ro.observe(rootRef.current)

    let rafId: number | null = null
    if (!ResizeObs) {
      const tick = () => {
        recompute()
        rafId = requestAnimationFrame(tick)
      }
      rafId = requestAnimationFrame(tick)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      if (ro) ro.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const listContainerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.25 } },
  }), [])

  const leftItemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -40, rotate: -1 },
    show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }), [])

  const rightItemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: 40, rotate: 1 },
    show: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  }), [])

  const floatAnim = {
    animate: { y: [0, -6, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const }
  }

  return (
    <div ref={rootRef} style={{ width: '100%', height: '100%', position: 'relative', padding: 24, boxSizing: 'border-box', background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)', borderRadius: 12, overflow: 'hidden' }}>
      
      {/* --- Centered Slide Title --- */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: 'absolute',
          top: '4%',
          left: '35%',
          transform: 'translateX(-50%)',
          fontSize: '3.8rem',
          fontWeight: 900,
          margin: 0,
          color: '#1a365d',
          textAlign: 'center',
          letterSpacing: '-1px',
          zIndex: 20,
        }}
      >
        Human vs GPT
      </motion.h1>

      {/* SVG CONNECTORS */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
          </marker>
          {connectors.map(({ key, color }) => (
            <linearGradient id={`grad-${key}`} key={`grad-${key}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          ))}
        </defs>
        {connectors.map(({ d, key }, i) => (
          <motion.path
            key={key}
            d={d}
            fill="none"
            stroke={`url(#grad-${key})`}
            strokeWidth={5}
            strokeLinecap="round"
            markerEnd="url(#arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: 'easeOut' }}
          />
        ))}
        {connectors.map(({ sx, sy, ex, ey, color, key }) => (
          <g key={`dots-${key}`}>
            <circle cx={sx} cy={sy} r={5} fill="white" />
            <circle cx={sx} cy={sy} r={4} fill={color} />
            <circle cx={ex} cy={ey} r={5} fill="white" />
            <circle cx={ex} cy={ey} r={4} fill="#6366f1" />
          </g>
        ))}
      </svg>

      {/* Grid: [ Left | Circle | Right ] */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', justifyItems: 'center', padding: '120px 24px 24px', gap: 24, pointerEvents: 'none', zIndex: 3 }}>
        
        {/* LEFT STACK */}
        <motion.div variants={listContainerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start', justifyContent: 'center', pointerEvents: 'auto' }}>
          {leftMetrics.map((m, idx) => (
            <motion.div key={`l-${idx}`} ref={setLeftRef} variants={leftItemVariants} {...floatAnim} whileHover={{ scale: 1.05, rotate: -1.5 }} whileTap={{ scale: 0.98 }} style={{ ...cardStyleBase, color: m.color, border: `2px solid ${m.color}`, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 22, fontWeight: 850 }}>{m.title}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CENTER CIRCLE */}
        <motion.div ref={circleRef} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, rgba(96,165,250,.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(52,211,153,.18), transparent 45%), #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', position: 'relative', pointerEvents: 'auto' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 48 }}>🧠</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#4a90e2' }}>HUMAN</div>
          </div>
          <div style={{ width: 1, background: '#e2e8f0', margin: '20px 0' }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 48 }}>🤖</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#48bb78' }}>GPT-4o</div>
          </div>
        </motion.div>

        {/* RIGHT STACK */}
        <motion.div variants={listContainerVariants} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-end', justifyContent: 'center', pointerEvents: 'auto' }}>
          {rightMetrics.map((m, idx) => (
            <motion.div key={`r-${idx}`} ref={setRightRef} variants={rightItemVariants} {...floatAnim} whileHover={{ scale: 1.05, rotate: 1.5 }} whileTap={{ scale: 0.98 }} style={{ ...cardStyleBase, color: m.color, border: `2px solid ${m.color}`, alignItems: 'flex-end', textAlign: 'right' }}>
              <div style={{ fontSize: 20, fontWeight: 850 }}>{m.title}</div>
              {m.sub && <div style={{ fontSize: 13, color: '#718096', fontWeight: 600 }}>{m.sub}</div>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
