// THIS IS SLIDE2.BUNDLE.TSX
// src/styles/slide2.bundle.tsx
import React from 'react';
import { motion } from 'framer-motion';

/* --------- Styles (exactly your inline values) --------- */
export const styles = {
  cardBox: {
    padding: '30px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    textAlign: 'center' as const,
  },
  iconMargin: { marginBottom: '20px' },
  cardTitleMargin: { marginBottom: '15px' },

  // NEW: bigger title text for "Learning / Reasoning / Self-correction"
  cardTitleLarge: {
    fontSize: '34px',
    fontWeight: 600,
    letterSpacing: '0.2px',
    lineHeight: 1.25,
  },

  // NEW: bigger body text under each title
  cardTextLarge: {
    fontSize: '24px',
    lineHeight: 1.6,
  },
};

/* --------- Animations (exactly your configs) --------- */
export const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: { opacity: 1, scale: 1, y: 0 },
};

export const hoverMotion = {
  whileHover: { scale: 1.03, boxShadow: '0 0 18px rgba(56,189,248,0.3)' },
  whileTap: { scale: 0.99 },
};

/* --------- Animated SVGs (same animations, just moved) --------- */
export function AnimatedBrain() {
  return (
    <svg width="80" height="80" viewBox="0 0 72 72" fill="none">
      <motion.circle
        cx="36" cy="36" r="28"
        stroke="#3b82f6" strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.circle
          key={`b${i}`}
          r="4" fill="#3b82f6"
          initial={{ cx: 18, cy: 36, opacity: 0 }}
          animate={{
            cx: [18, 36, 54, 36, 18],
            cy: [36, 18, 36, 54, 36],
            opacity: [0, 1, 0.8, 0.6, 0],
          }}
          transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

export function AnimatedPuzzle() {
  return (
    <svg width="80" height="80" viewBox="0 0 72 72" fill="none">
      <motion.rect
        x="10" y="10" width="24" height="24" rx="6" fill="#10b981"
        initial={{ x: 6, y: 6, rotate: -8, opacity: 0 }}
        animate={{ x: [6, 10, 10], y: [6, 10, 10], rotate: [-8, 2, 0], opacity: [0, 0.8, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.rect
        x="38" y="10" width="24" height="24" rx="6" fill="#10b981"
        initial={{ x: 44, y: 6, rotate: 8, opacity: 0 }}
        animate={{ x: [44, 38, 38], y: [6, 10, 10], rotate: [8, -2, 0], opacity: [0, 0.8, 1] }}
        transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.rect
        x="10" y="38" width="24" height="24" rx="6" fill="#10b981"
        initial={{ x: 6, y: 44, rotate: 6, opacity: 0 }}
        animate={{ x: [6, 10, 10], y: [44, 38, 38], rotate: [6, -1, 0], opacity: [0, 0.8, 1] }}
        transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.rect
        x="38" y="38" width="24" height="24" rx="6" fill="#10b981"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.05, 1], opacity: [0, 0.9, 1] }}
        transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      />
    </svg>
  );
}

export function AnimatedLoop() {
  return (
    <svg width="80" height="80" viewBox="0 0 72 72" fill="none">
      <motion.path
        d="M36 12 A 24 24 0 1 1 35.99 12"
        stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" fill="transparent"
        initial={{ pathLength: 0.25, rotate: 0, opacity: 0.8 }}
        animate={{ pathLength: 1, rotate: 360, opacity: [0.8, 1, 0.8] }}
        transition={{
          duration: 2.2, ease: 'linear', repeat: Infinity,
          opacity: { duration: 3, repeat: Infinity, repeatType: 'reverse' },
        }}
      />
      <motion.circle
        r="4" fill="#f59e0b"
        initial={{ cx: 36, cy: 12, scale: 0.8 }}
        animate={{
          cx: [36, 60, 36, 12, 36],
          cy: [12, 36, 60, 36, 12],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2.2, ease: 'easeInOut', repeat: Infinity,
          scale: { duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      />
    </svg>
  );
}
