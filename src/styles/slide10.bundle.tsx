// src/styles/slide10.bundle.ts
import { cubicBezier } from 'framer-motion';

/* ===== Easings (exact) ===== */
export const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);
export const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9);

/* ===== Container motions ===== */
export const containerMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease: EASE_OUT },
};

export const titleMotion = {
  initial: { y: -16, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.55, ease: EASE_SOFT },
};

/* ===== Item motions (helpers) ===== */
export const topCardEnter = (i: number) => ({
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: EASE_OUT, delay: 0.1 + i * 0.08 },
  whileHover: { y: -4, scale: 1.03 },
  whileTap: { scale: 0.99 },
});

export const sheenMotion = (i: number) => ({
  animate: { x: ['-60%', '120%'] },
  transition: { duration: 2.2, ease: EASE_SOFT, repeat: Infinity, delay: i * 0.15 },
});

export const statEnter = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_OUT, delay: 0.1 + i * 0.08 },
});

export const stripEnter = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: EASE_SOFT, delay: 0.2 + i * 0.1 },
});

/* ===== Styles (Nunito Sans + white bg + black text) ===== */
export const styles = {
  root: {
    padding: '40px 60px',
    background: '#ffffff', // was gradient
    color: '#000000',      // default text color black
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'flex-start' as const,
    overflowY: 'auto' as const,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  titleH2: {
    fontSize: '2.5rem',
    marginBottom: 30,
    color: '#4e83c3', // black
    textAlign: 'center' as const,
  },

  topGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 18,
    width: '100%',
    marginBottom: 30,
    maxWidth: '1200px',
  },

  cardBase: {
    position: 'relative' as const,
    borderRadius: 14,
    padding: 18,
    textAlign: 'center' as const,
    color: '#000000', // black text on cards
    border: '1px solid rgba(0,0,0,0.05)',
    boxShadow: '0 10px 26px rgba(0,0,0,0.10)',
    overflow: 'hidden' as const,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  sheenBase: {
    position: 'absolute' as const,
    inset: -2,
    background:
      'linear-gradient(120deg, transparent 0%, rgba(255,255,255,.28) 48%, rgba(255,255,255,.55) 52%, rgba(255,255,255,.28) 56%, transparent 100%)',
    transform: 'translateX(-60%)',
    mixBlendMode: 'screen' as const,
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 20,
    width: '100%',
    margin: '0 auto 40px',
    maxWidth: '1000px',
    textAlign: 'center' as const,
    fontSize: '1.3rem',
  },

  stripBox: (isFirst: boolean) =>
    ({
      width: '100%',
      maxWidth: '800px',
      backgroundColor: '#ffffff',
      padding: '12px 24px',
      borderRadius: 12,
      margin: isFirst ? '0 auto 15px' : '0 auto',
      textAlign: 'center',
      fontSize: '1.3rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.05)',
      color: '#000000', // black
      fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }) as React.CSSProperties,
} as const;

/* ===== Per-item style helpers ===== */
export const cardBg = (from: string, to: string) =>
  ({ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }) as React.CSSProperties;
