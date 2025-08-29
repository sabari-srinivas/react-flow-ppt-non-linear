import * as React from 'react';
import { motion } from 'framer-motion';
import { slideContainer, titleStyle } from '../../styles/slideStyles';

type UseCase = {
  emoji: string;
  name: string;
  blurb: string;
  delay: number;
};

const cases: UseCase[] = [
  {
    emoji: '🧠',
    name: 'Healthcare',
    blurb: 'Summarizes patient notes, flags risks, drafts discharge & prior-auth letters.',
    delay: 0.15,
  },
  {
    emoji: '🏦',
    name: 'Banking',
    blurb: 'Automates KYC checks, fraud triage, and personalized portfolio nudges.',
    delay: 0.25,
  },
  {
    emoji: '🛍️',
    name: 'Retail',
    blurb: 'Creates shoppable content, chat-based product guides, and smart offers.',
    delay: 0.35,
  },
  {
    emoji: '🏭',
    name: 'Manufacturing',
    blurb: 'Generates work instructions, detects defects from images, plans spare parts.',
    delay: 0.45,
  },
  {
    emoji: '✈️',
    name: 'Travel & Hospitality',
    blurb: 'Builds itineraries, handles service queries, and writes property listings.',
    delay: 0.55,
  },
  {
    emoji: '📚',
    name: 'Education',
    blurb: 'Creates adaptive lessons, instant feedback, and study plans per learner.',
    delay: 0.65,
  },
  {
    emoji: '💻',
    name: 'Software',
    blurb: 'Writes boilerplate, unit tests, and migration scripts with code reviews.',
    delay: 0.75,
  },
  {
    emoji: '📰',
    name: 'Media & Marketing',
    blurb: 'Generates on-brand copy, storyboards, and multilingual campaigns.',
    delay: 0.85,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] },
  },
};

const cardStyle: React.CSSProperties = {
  borderRadius: 18,
  background: 'rgba(255,255,255,0.92)',
  boxShadow: '0 12px 30px rgba(0,0,0,0.10)',
  border: '1px solid rgba(0,0,0,0.06)',
  padding: '18px 18px 16px',
  display: 'grid',
  gridTemplateRows: 'auto auto auto',
  alignItems: 'start',
  gap: 8,
  minHeight: 160,
};

const Slide19: React.FC = () => {
  return (
    <div
      style={{
        ...slideContainer,
        // soft backdrop
        background:
          'radial-gradient(900px 500px at -10% -20%, #e0f2fe 0%, transparent 50%), radial-gradient(1000px 600px at 110% 120%, #fef3c7 0%, transparent 55%), linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '48px 56px',
      }}
    >
      {/* ambient orbs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          filter: 'blur(30px)',
          background: 'radial-gradient(circle, rgba(59,130,246,0.28), transparent 60%)',
          top: 40,
          left: -80,
          pointerEvents: 'none',
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: 'absolute',
          width: 360,
          height: 360,
          borderRadius: '50%',
          filter: 'blur(34px)',
          background: 'radial-gradient(circle, rgba(34,197,94,0.22), transparent 60%)',
          bottom: -60,
          right: -60,
          pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] }}
        style={{
          ...titleStyle,
          textAlign: 'center',
          fontSize: 'clamp(2.0rem, 4vw, 3.2rem)',
          marginBottom: 24,
          background: 'linear-gradient(90deg, #1e3a8a, #3b82f6, #10b981, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 0.2,
        }}
      >
        GEN AI Use Cases
      </motion.h2>

      {/* Subtitle line */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center',
          color: '#475569',
          marginTop: -4,
          marginBottom: 28,
          fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
        }}
      >
        A quick tour of how different industries put generative AI to work—practically, today.
      </motion.p>

      {/* Grid of use-cases */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          width: '100%',
          maxWidth: 1100,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))',
          gap: 20,
        }}
      >
        {cases.map(({ emoji, name, blurb, delay }) => (
          <motion.div
            key={name}
            variants={itemVariants}
            transition={{ delay }}
            whileHover={{
              y: -6,
              scale: 1.03,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }}
            style={cardStyle}
          >
            {/* Icon */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: [0.2, 0.65, 0.3, 0.9] }}
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
                width: 48,
                height: 48,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 12,
                background:
                  'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(16,185,129,0.12))',
                border: '1px solid rgba(15,23,42,0.06)',
              }}
            >
              {emoji}
            </motion.div>

            {/* Heading */}
            <div
              style={{
                fontWeight: 800,
                fontSize: 'clamp(1.0rem, 1.6vw, 1.05rem)',
                color: '#0f172a',
                letterSpacing: 0.2,
              }}
            >
              {name}
            </div>

            {/* One-liner */}
            <div style={{ color: '#334155', fontSize: 'clamp(0.9rem, 1.4vw, 0.95rem)', lineHeight: 1.45 }}>
              {blurb}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom hint / takeaway */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          marginTop: 24,
          fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
          color: '#475569',
          textAlign: 'center',
        }}
      >
        Tip: Start with a narrow workflow, measure lift, then scale across adjacent processes.
      </motion.div>
    </div>
  );
};

export default Slide19;
