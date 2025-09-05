import type * as React from 'react';
import { cubicBezier, type Variants } from 'framer-motion';

/** Easing */
export const EASE = cubicBezier(0.2, 0.65, 0.3, 0.9);

/** Variants */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

/** Motion snippets */
export const cardHoverAnim = {
  y: -6,
  scale: 1.03,
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
} as const;

export const ambientLeftAnim = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 0.5, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8 },
} as const;

export const ambientRightAnim = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 0.45, scale: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, delay: 0.1 },
} as const;

export const titleAnim = {
  initial: { y: -16, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, amount: 0.7 },
  transition: { duration: 0.6, ease: EASE },
} as const;

export const subtitleAnim = {
  initial: { opacity: 0, y: -8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.5 },
} as const;

export const gridAnim = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.3 },
} as const;

export const bottomHintAnim = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay: 0.2 },
} as const;

/** Styles */
export const slide19RootStyle: React.CSSProperties = {
  background: "#ffffff", // white container
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  position: 'relative',
  overflow: 'hidden',
  padding: '48px 56px',
};

export const ambientOrbLeftStyle: React.CSSProperties = {
  position: 'absolute',
  width: 320,
  height: 320,
  borderRadius: '50%',
  filter: 'blur(30px)',
  background: 'radial-gradient(circle, rgba(59,130,246,0.28), transparent 60%)',
  top: 40,
  left: -80,
  pointerEvents: 'none',
};

export const ambientOrbRightStyle: React.CSSProperties = {
  position: 'absolute',
  width: 360,
  height: 360,
  borderRadius: '50%',
  filter: 'blur(34px)',
  background: 'radial-gradient(circle, rgba(34,197,94,0.22), transparent 60%)',
  bottom: -60,
  right: -60,
  pointerEvents: 'none',
};

export const titleGradientStyle: React.CSSProperties = {
  textAlign: 'center',
  fontSize: 'clamp(2.0rem, 4vw, 3.2rem)',
  marginBottom: 24,
  background: 'linear-gradient(90deg, #1e3a8a, #3b82f6, #10b981, #f59e0b)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  letterSpacing: 0.2,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const subtitleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000000', // black
  marginTop: -4,
  marginBottom: 28,
  fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const gridStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 1100,
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))',
  gap: 20,
};

export const cardStyle: React.CSSProperties = {
  borderRadius: 18,
  background: '#ffffff',
  color: '#000000',
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  boxShadow: '0 12px 30px rgba(0,0,0,0.10)',
  border: '1px solid rgba(0,0,0,0.06)',
  padding: '18px 18px 16px',
  display: 'grid',
  gridTemplateRows: 'auto auto auto',
  alignItems: 'start',
  gap: 8,
  minHeight: 160,
};

export const emojiWrapperStyle: React.CSSProperties = {
  fontSize: 'clamp(1.6rem, 3.5vw, 2rem)',
  width: 48,
  height: 48,
  display: 'grid',
  placeItems: 'center',
  borderRadius: 12,
  background:
    'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(16,185,129,0.12))',
  border: '1px solid rgba(15,23,42,0.06)',
};

export const cardHeadingStyle: React.CSSProperties = {
  fontWeight: 800,
  fontSize: 'clamp(1.0rem, 1.6vw, 1.05rem)',
  color: '#000000',
  letterSpacing: 0.2,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const cardBlurbStyle: React.CSSProperties = {
  color: '#000000',
  fontSize: 'clamp(0.9rem, 1.4vw, 0.95rem)',
  lineHeight: 1.45,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const bottomHintStyle: React.CSSProperties = {
  marginTop: 24,
  fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
  color: '#000000',
  textAlign: 'center',
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};
