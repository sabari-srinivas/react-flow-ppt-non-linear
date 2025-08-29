import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { slideContainer } from '../../styles/slideStyles'

// ---------- Data ----------
const CARDS = [
  {
    key: 'see',
    icon: '👁️',
    title: 'AI can SEE',
    accent: '#0ea5e9', // sky-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
    blurb: 'Like gaining thousands of expert eyes',
    details: [
      'Visual QA over charts, dashboards, and documents',
      'Detect anomalies in frames, framesets, or live feeds',
      'OCR + layout-aware understanding of PDFs and reports',
    ],
  },
  {
    key: 'touch',
    icon: '✋',
    title: 'AI can TOUCH',
    accent: '#10b981', // emerald-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    blurb: 'Creating digital experiences with physical impact',
    details: [
      'Trigger RPA/APIs to act on insights',
      'Drive robots, IoT and workflows with guardrails',
      'Human-in-the-loop approvals for high‑risk actions',
    ],
  },
  {
    key: 'speak',
    icon: '🗣️',
    title: 'AI can SPEAK',
    accent: '#f97316', // orange-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
    blurb: 'Not just responding, but understanding context',
    details: [
      'Realtime multilingual voice + emotion cues',
      'Memory to stay on topic across turns',
      'Grounded answers with source citations',
    ],
  },
  {
    key: 'analyse',
    icon: '🔍',
    title: 'AI can ANALYSE',
    accent: '#8b5cf6', // violet-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    blurb: "Finding patterns that humans can't see",
    details: [
      'Automatic pattern mining over large datasets',
      'Explainable KPIs with drill‑downs and what‑ifs',
      'Forecasts with confidence and scenario tests',
    ],
  },
] as const

type CardKey = typeof CARDS[number]['key']

// ---------- Motion Variants ----------
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    y: -6,
    boxShadow: '0 14px 30px rgba(0,0,0,0.15)',
    transition: { duration: 0.25 },
  },
}

const haloVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
}

const modalVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } },
}

export default function Slide9Interactive() {
  const [openKey, setOpenKey] = React.useState<CardKey | null>(null)

  React.useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenKey(null)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  return (
    <motion.div
      className="slide-container"
      style={{
        ...slideContainer,
        color: '#1f2937',
        padding: '40px 60px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      }}
    >
      {/* Top Section with Four Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))',
          gap: 24,
          width: '100%',
          maxWidth: 1400,
          margin: '0 auto 40px',
        }}
      >
        {CARDS.map((c, i) => (
          <motion.button
            key={c.key}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpenKey(c.key)}
            style={{
              background: c.bgGrad,
              borderRadius: 16,
              padding: 24,
              textAlign: 'center',
              border: `1px solid rgba(0,0,0,0.06)`,
              boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
              backdropFilter: 'blur(6px)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              outline: 'none',
            }}
          >
            {/* soft animated halo */}
            <motion.div
              variants={haloVariants}
              initial="initial"
              animate="animate"
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(120px 60px at 50% 0%, ${c.accent}22, transparent 60%)`,
                pointerEvents: 'none',
              }}
              animate={{ opacity: [0.65, 0.9, 0.65] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
            />

            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: `${c.accent}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 14px',
                fontSize: 26,
                color: '#0f172a',
                border: `1px solid ${c.accent}55`,
              }}
            >
              {c.icon}
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: '#111827' }}>{c.title}</h3>
            <p style={{ margin: 0, fontSize: '0.98rem', color: '#374151', lineHeight: 1.5 }}>{c.blurb}</p>

            {/* shimmering diagonal stripe */}
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                inset: -2,
                background:
                  'linear-gradient(120deg, transparent 0%, rgba(255,255,255,.25) 45%, rgba(255,255,255,.55) 50%, rgba(255,255,255,.25) 55%, transparent 100%)',
                transform: 'translateX(-60%)',
                mixBlendMode: 'screen',
              }}
              animate={{ x: ['-60%', '120%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          color: '#2563eb',
          textAlign: 'center',
          marginTop: 16,
          textShadow: 'none',
        }}
      >
        AI Can Learn & Reason
      </motion.div>

      {/* Modal for details */}
      <AnimatePresence>
        {openKey && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.38)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}
            onClick={() => setOpenKey(null)}
          >
            <motion.div
              key="sheet"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: 'min(720px, 90vw)',
                borderRadius: 16,
                background: '#ffffff',
                boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
                border: '1px solid rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              {(() => {
                const c = CARDS.find((x) => x.key === openKey)!
                return (
                  <div>
                    <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 12, background: c.bgGrad, borderBottom: `1px solid ${c.accent}33` }}>
                      <div style={{ width: 40, height: 40, borderRadius: 20, display: 'grid', placeItems: 'center', border: `1px solid ${c.accent}66`, background: `${c.accent}10`, fontSize: 20 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{c.title}</div>
                        <div style={{ fontSize: '0.95rem', color: '#334155' }}>{c.blurb}</div>
                      </div>
                      <button onClick={() => setOpenKey(null)} style={{ marginLeft: 'auto', border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer', color: '#334155' }}>✕</button>
                    </div>

                    <div style={{ padding: 20 }}>
                      <ul style={{ margin: 0, paddingLeft: 18, color: '#1f2937', lineHeight: 1.6 }}>
                        {c.details.map((d, i) => (
                          <li key={i} style={{ marginBottom: 8 }}>{d}</li>
                        ))}
                      </ul>

                      {/* subtle illustrative footer */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                          marginTop: 16,
                          padding: 12,
                          borderRadius: 12,
                          background: `radial-gradient(120px 60px at 20% 0%, ${c.accent}10, transparent 60%)`,
                          border: `1px dashed ${c.accent}44`,
                          color: '#334155',
                          fontSize: 14,
                        }}
                      >
                        Tip: combine <strong>{c.title}</strong> with Retrieval to ground responses in your data.
                      </motion.div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
