import { motion, cubicBezier } from 'framer-motion'
import { slideContainer } from '../../styles/slideStyles'

// Use EasingFunction via cubicBezier to satisfy strict TS types
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1)
const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9)

export default function Slide10() {
  const topCards = [
    { title: 'Virtual Workers', desc: 'Automating human-intensive tasks entirely using AI agents.', bg: ['#e57373', '#ef9a9a'] },
    { title: 'Personalized Experiences', desc: 'Evolving personalization to AI-powered, hyper-personalized, segment-of-one experiences.', bg: ['#9fa8da', '#c5cae9'] },
    { title: 'Productivity', desc: 'Enhancing efficiency in cognitive and knowledge-intensive tasks.', bg: ['#90caf9', '#bbdefb'] },
    { title: 'Creativity & Content', desc: 'Accelerating creativity through AI-driven audio, visual, & video content generation.', bg: ['#aed581', '#c5e1a5'] },
    { title: 'Insight Discovery', desc: 'Unlocking possibilities by AI-accelerated Data Science on structured & unstructured data together.', bg: ['#ffb74d', '#ffd180'] },
  ] as const

  const stats = [
    { value: '100%', label: 'Replacement of Human worker', color: '#e57373' },
    { value: '10x', label: 'More Real & Personalized', color: '#9fa8da' },
    { value: '5x', label: 'Faster Execution', color: '#90caf9' },
    { value: '7x', label: 'Faster Content Production', color: '#aed581' },
    { value: '3x', label: 'More Insights Uncovered', color: '#ffb74d' },
  ] as const

  const strips = [
    { text: 'Re-imagining Software Engineering with AI-Assisted Coding & Modernization → ', strong: '10x Engineers', color: '#00e5ff' },
    { text: 'Advanced chain of thought Reasoning', strong: '', color: '' },
  ] as const

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{
        ...slideContainer,
        padding: '40px 60px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        color: '#1f2937',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowY: 'auto',
      }}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE_SOFT }}
        style={{ fontSize: '2.5rem', marginBottom: 30, color: '#1f2937', textAlign: 'center' }}
      >
        What can AI do in an Enterprise?
      </motion.h2>

      {/* Top Row - Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18,
          width: '100%',
          marginBottom: 30,
          maxWidth: '1200px',
        }}
      >
        {topCards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 + i * 0.08 }}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.99 }}
            style={{
              position: 'relative',
              borderRadius: 14,
              padding: 18,
              textAlign: 'center',
              color: '#0b0b0b',
              background: `linear-gradient(135deg, ${c.bg[0]} 0%, ${c.bg[1]} 100%)`,
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 10px 26px rgba(0,0,0,0.10)',
              overflow: 'hidden',
            }}
          >
            {/* sheen */}
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                inset: -2,
                background:
                  'linear-gradient(120deg, transparent 0%, rgba(255,255,255,.28) 48%, rgba(255,255,255,.55) 52%, rgba(255,255,255,.28) 56%, transparent 100%)',
                transform: 'translateX(-60%)',
                mixBlendMode: 'screen',
              }}
              animate={{ x: ['-60%', '120%'] }}
              transition={{ duration: 2.2, ease: EASE_SOFT, repeat: Infinity, delay: i * 0.15 }}
            />

            <h3 style={{ margin: '0 0 8px 0', color: '#0b0b0b', fontWeight: 800 }}>{c.title}</h3>
            <p style={{ fontSize: '0.95rem', margin: 0, color: '#111827' }}>{c.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Middle Row - Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 20,
          width: '100%',
          margin: '0 auto 40px',
          maxWidth: '1000px',
        }}
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.1 + i * 0.08 }}
            style={{ textAlign: 'center' }}
          >
            <h2 style={{ color: s.color, margin: 0 }}>{s.value}</h2>
            <p style={{ margin: 0 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Strips */}
      {strips.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.2 + i * 0.1 }}
          style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: '#ffffff',
            padding: '12px 24px',
            borderRadius: 12,
            margin: i === 0 ? '0 auto 15px' : '0 auto',
            textAlign: 'center',
            fontSize: '1.1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            border: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          {b.text} {b.strong && <strong style={{ color: b.color }}>{b.strong}</strong>}
        </motion.div>
      ))}
    </motion.div>
  )
}
