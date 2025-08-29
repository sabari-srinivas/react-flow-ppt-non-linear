import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const hoverMotion = {
  whileHover: { scale: 1.03, boxShadow: '0 0 24px rgba(56, 189, 248, 0.35)' },
  whileTap: { scale: 0.99 },
};

const Panel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      borderRadius: 24,
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(6px)',
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

function AnimatedBrain() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.circle cx="36" cy="36" r="28" stroke="#60a5fa" strokeWidth="2" />
      {Array.from({ length: 5 }).map((_, i) => {
        const t = i * 0.15;
        return (
          <motion.circle
            key={`brain-dot-${i}`}
            r="3"
            fill="#60a5fa"
            initial={{ cx: 18, cy: 36, opacity: 0 }}
            animate={{ cx: [18, 36, 54], cy: [36, 24, 36], opacity: [0, 1, 0] }}
            transition={{ duration: 2.1, delay: 0.2 + t, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
      <motion.path
        d="M22 32 C 30 22, 42 22, 50 32"
        stroke="#60a5fa"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <motion.path
        d="M22 40 C 30 50, 42 50, 50 40"
        stroke="#60a5fa"
        strokeWidth="2"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
      />
    </svg>
  );
}

function AnimatedPuzzle() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.rect x="10" y="10" width="22" height="22" rx="4" fill="#34d399" initial={{ x: 6, y: 6, rotate: -5, opacity: 0 }} animate={{ x: 10, y: 10, rotate: 0, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} />
      <motion.rect x="40" y="10" width="22" height="22" rx="4" fill="#34d399" initial={{ x: 46, y: 6, rotate: 5, opacity: 0 }} animate={{ x: 40, y: 10, rotate: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }} />
      <motion.rect x="10" y="40" width="22" height="22" rx="4" fill="#34d399" initial={{ x: 6, y: 46, rotate: 3, opacity: 0 }} animate={{ x: 10, y: 40, rotate: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }} />
      <motion.rect x="40" y="40" width="22" height="22" rx="4" fill="#34d399" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }} />
    </svg>
  );
}

function AnimatedLoop() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <motion.path d="M36 12 A 24 24 0 1 1 35.99 12" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="transparent" initial={{ pathLength: 0.25, rotate: 0 }} animate={{ pathLength: 1, rotate: 360 }} transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }} />
      <motion.circle r="4" fill="#f59e0b" initial={{ cx: 36, cy: 12 }} animate={{ cx: [36, 60, 36, 12, 36], cy: [12, 36, 60, 36, 12] }} transition={{ duration: 2.4, ease: 'linear', repeat: Infinity }} />
    </svg>
  );
}

const CardBox: React.FC<{ title: string; text: string; accent: string; icon: React.ReactNode }> = ({ title, text, accent, icon }) => (
  <motion.div {...hoverMotion} style={{ borderRadius: 16 }}>
    <div
      style={{
        border: `1px solid ${accent}4D`,
        background: 'rgba(10,15,25,0.5)',
        borderRadius: 16,
        padding: 16,
        minHeight: 160,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        {icon}
        <h3 style={{ color: 'white', margin: 0 }}>{title}</h3>
      </div>
      <p style={{ color: '#cbd5e1', margin: 0 }}>{text}</p>
    </div>
  </motion.div>
);

export default function AIIntroInteractive() {
  const [stage, setStage] = useState<'title' | 'cards'>('title');

  useEffect(() => {
    const t = setTimeout(() => setStage('cards'), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: 'radial-gradient(1200px 600px at 50% -20%, #0b1220, #070c16, #000)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <AnimatePresence initial={false} mode="wait">
          {stage === 'title' ? (
            <motion.div
              key="title"
              layoutId="ai-hero"
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -12 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Panel>
                <motion.h1
                  style={{ color: 'white', fontSize: 48, fontWeight: 800, margin: 0 }}
                  initial={{ letterSpacing: '-0.02em' }}
                  animate={{ letterSpacing: ['-0.02em', '-0.01em', '-0.02em'] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror' }}
                >
                  What is AI?
                </motion.h1>
                <motion.p style={{ color: '#cbd5e1', marginTop: 8, fontSize: 18 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.45 }}>
                  Machines simulating human-like intelligence to learn, reason, and adapt.
                </motion.p>
              </Panel>
            </motion.div>
          ) : (
            <motion.div key="cards" layoutId="ai-hero" variants={containerVariants} initial="hidden" animate="show">
              <Panel style={{ marginBottom: 16 }}>
                <motion.div variants={itemVariants}>
                  <h2 style={{ color: 'white', margin: 0, fontSize: 28, fontWeight: 700 }}>What is AI?</h2>
                  <p style={{ color: '#cbd5e1', margin: 0 }}>Machines simulating human-like intelligence to learn, reason, and adapt.</p>
                </motion.div>
              </Panel>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
                <motion.div variants={itemVariants}>
                  <CardBox title="Learning" text="Improving with data." accent="#22d3ee" icon={<AnimatedBrain />} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardBox title="Reasoning" text="Making informed decisions." accent="#10b981" icon={<AnimatedPuzzle />} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <CardBox title="Self-correction" text="Refining over time." accent="#f59e0b" icon={<AnimatedLoop />} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


