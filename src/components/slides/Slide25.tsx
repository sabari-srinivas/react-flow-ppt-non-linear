import * as React from 'react';
import { motion, cubicBezier } from 'framer-motion';

// This is the style object that was previously in the external file.
// It's now included here so the component is self-contained.
const themeSlideContainer: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column' as const,
  padding: '40px',
  boxSizing: 'border-box' as const,
  textAlign: 'center' as const,
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative' as const,
};

// Original styles from your component
const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  fontWeight: 800,
  letterSpacing: '-0.025em',
  color: '#1e293b',
};

// MODIFICATION: Added height and boxSizing to ensure card fills the grid cell
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
  height: '100%', // Make card fill the entire grid cell
  boxSizing: 'border-box',
};

type UseCasePattern = {
  emoji: string;
  name: string;
  blurb: string;
  delay: number;
};

// Original patterns array with delay property
const patterns: UseCasePattern[] = [
  { emoji: '🧠', name: 'Reflection & Self-Correction', blurb: 'Agents review their actions, identify errors, and refine their approach to improve performance.', delay: 0.15 },
  { emoji: '🔧', name: 'Tool Augmentation', blurb: 'Agents use external tools like APIs or code interpreters to perform complex, real-world actions.', delay: 0.25 },
  { emoji: '🔀', name: 'Task Decomposition', blurb: 'A primary agent breaks down a complex goal into smaller sub-tasks for specialized agents to execute.', delay: 0.35 },
  { emoji: '🤝', name: 'Human-in-the-Loop', blurb: 'Agents collaborate with humans, requesting feedback, clarification, or approval for critical decisions.', delay: 0.45 },
  { emoji: '📚', name: 'Memory & Learning', blurb: 'Utilizes short and long-term memory to learn from past interactions and build context for future tasks.', delay: 0.55 },
  { emoji: '👥', name: 'Multi-Agent Collaboration', blurb: 'Specialized agents with different roles (e.g., planner, critic) work together to achieve a common goal.', delay: 0.65 },
  { emoji: '🌐', name: 'Environment Interaction', blurb: 'Agents perceive and act within digital environments, such as browsing websites or managing systems.', delay: 0.75 },
  { emoji: '🤖', name: 'Autonomous Systems', blurb: 'Complex, multi-agent systems that collaborate to manage entire workflows or research projects.', delay: 0.85 },
];

// --- Typed easing (fixes TS error with motion-dom Variants) ---
const EASE_CB = cubicBezier(0.2, 0.65, 0.3, 0.9);

// Original animation variants (ease updated to EASE_CB)
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
    transition: { duration: 0.45, ease: EASE_CB },
  },
};

const AgenticPatternsSlide: React.FC = () => {
  // Use flexbox to fill 100% of the slide height
  const slideContainer: React.CSSProperties = {
    ...themeSlideContainer,
    height: '100%', // Use full height
    width: '100%', // Use full width
    display: 'flex', // Use flexbox for vertical distribution
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    padding: '48px 56px',
    background:
      'radial-gradient(900px 500px at -10% -20%, #e0f2fe 0%, transparent 50%), radial-gradient(1000px 600px at 110% 120%, #fef3c7 0%, transparent 55%), linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%)',
  };

  return (
    <div style={slideContainer}>
      {/* ambient orbs (unchanged) */}
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

      {/* Title (unchanged, ease updated) */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, ease: EASE_CB }}
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
        Agentic AI Use Case Patterns
      </motion.h2>

      {/* Subtitle line (unchanged) */}
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
        Core design patterns for building capable and reliable autonomous AI agents.
      </motion.p>

      {/* Changed to a 4x2 grid that fills remaining space */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          width: '100%',
          flex: 1, // Allow this grid to grow and fill available vertical space
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns
          gridTemplateRows: 'repeat(2, 1fr)', // 2 rows
          gap: 20,
        }}
      >
        {patterns.map(({ emoji, name, blurb, delay }) => (
          <motion.div
            key={name}
            variants={itemVariants}
            transition={{ delay }}
            whileHover={{ y: -6, scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
            style={cardStyle} // cardStyle now includes height: 100%
          >
            {/* Icon (unchanged, ease updated) */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: EASE_CB }}
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

            {/* Heading (unchanged) */}
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

            {/* One-liner (unchanged) */}
            <div style={{ color: '#334155', fontSize: 'clamp(0.9rem, 1.4vw, 0.95rem)', lineHeight: 1.45 }}>
              {blurb}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom hint / takeaway (unchanged) */}
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
        Tip: Combine patterns like Tool Augmentation and Human-in-the-Loop for robust solutions.
      </motion.div>
    </div>
  );
};

export default AgenticPatternsSlide;
