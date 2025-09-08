// src/styles/slide13.bundle.ts
import type { CSSProperties } from 'react';
import type { Variants } from 'framer-motion';
import { cubicBezier } from 'framer-motion';
import { slideContainer, titleStyle } from './slideStyles';

// === Easing (unchanged) ===
export const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9);
export const EASE_OUT  = cubicBezier(0.16, 1, 0.3, 1);

// === Variants (unchanged logic) ===
export const charVariants: Variants = {
  hidden: { opacity: 0, y: 2 },
  show: { opacity: 1, y: 0, transition: { duration: 0.04, ease: EASE_SOFT } },
};
export const lineVariants = (stagger = 0.035): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, ease: EASE_SOFT } },
});

export const containerTransition = { duration: 0.6, ease: EASE_OUT } as const;
export const titleTransition = { duration: 0.7, ease: EASE_SOFT } as const;
export const cardEnter = { duration: 0.5, ease: EASE_SOFT } as const;
export const thinkingEnter = { duration: 0.5, ease: EASE_SOFT } as const;
export const outputsEnter = { duration: 0.55, ease: EASE_SOFT } as const;
export const ctaEnter = { duration: 0.45, ease: EASE_SOFT } as const;

// === Styles (updated: Nunito Sans + white bg + black text) ===
export const styles: Record<string, CSSProperties> = {
  root: {
    ...slideContainer,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: '#ffffff', // white background
    padding: '36px 56px',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#000000',
  },

  title: {
    ...titleStyle,
    fontSize: '3rem',
    marginBottom: 10,
    color: '#4e83c3', // black instead of gradient
    textAlign: 'center',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  controlsWrap: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    marginBottom: 18,
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 12,
    padding: '8px 12px',
    boxShadow: '0 10px 22px rgba(0,0,0,0.08)',
  },
  controlsTitle: { fontSize: '1.1rem', fontWeight: 600, color: '#000000' },
  statusDot: { width: 6, height: 6, borderRadius: 999, marginLeft: 8 },
  btn: { border: 'none', background: '#f1f5f9', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' },
  btnAlt: { border: 'none', background: '#eef2ff', borderRadius: 8, padding: '6px 10px', cursor: 'pointer' },

  promptBubble: {
    background: '#e0f2fe',
    color: '#000000', // black text
    padding: '14px 18px',
    borderRadius: 14,
    fontSize: '1.6rem',
    marginBottom: 18,
    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    maxWidth: 920,
    width: 'fit-content',
  },
  typeSpan: { whiteSpace: 'pre-wrap', display: 'inline-block' },
  typeChar: { display: 'inline-block' },
  caret: {
    display: 'inline-block',
    width: 10,
    marginLeft: 4,
    borderRadius: 1,
    height: '1.1em',
    verticalAlign: 'text-bottom',
    background: '#000000',
    opacity: 0.85,
  },

  thinkingWrap: {
    width: 920,
    maxWidth: '92vw',
    height: 140,
    borderRadius: 16,
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    position: 'relative',
    overflow: 'hidden',
  },
  thinkingBgFill: { position: 'absolute', inset: 0, background: 'inherit' },
  thinkingLabel: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: '1.2rem',
    color: '#000000',
    fontWeight: 600,
    background: 'rgba(255,255,255,0.75)',
    padding: '6px 10px',
    borderRadius: 8,
  },

  outputsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))',
    gap: 16,
    width: 920,
    maxWidth: '92vw',
    alignItems: 'stretch',
  },

  // Card
  card: {
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 16,
    padding: 16,
    boxShadow: '0 14px 32px rgba(0,0,0,0.10)',
    position: 'relative',
    minHeight: 160,
    color: '#000000',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  cardBadge: {
    position: 'absolute',
    top: -10,
    left: -10,
    background: '#0ea5e9',
    color: '#ffffff',
    fontWeight: 800,
    fontSize: 12,
    padding: '6px 10px',
    borderRadius: 999,
    boxShadow: '0 8px 18px rgba(14,165,233,0.35)',
  },
  cardTitle: { fontWeight: 900, color: '#000000', marginBottom: 8 },
  cardBody: { color: '#000000', lineHeight: 1.55 },

  agendaList: { fontSize: '1.2rem', paddingLeft: 18, margin: 0 },

  posterCanvas: {
    borderRadius: 12,
    height: 130,
    background: '#ffffff',
    position: 'relative',
    overflow: 'hidden',
  },
  posterSun: {
    position: 'absolute',
    top: 10,
    left: 14,
    width: 50,
    height: 50,
    borderRadius: '50%',
    background: '#facc15',
    filter: 'blur(0.5px)',
  },
  posterMountainBase: { position: 'absolute', right: 0 },
  posterGloss: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '28%',
    background: 'rgba(255,255,255,0.3)',
    transform: 'skewX(-10deg)',
  },
  posterCaption: { marginTop: 8, fontWeight: 700, color: '#000000' },

  emailBlock: {
    fontFamily: "'Nunito Sans', monospace",
    background: '#f1f5f9',
    padding: 10,
    borderRadius: 10,
    color: '#000000',
    fontSize: '1.1rem',
  },
  emailDim: { opacity: 0.8 },

  cta: {
    marginTop: 10,
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 14,
    padding: '12px 16px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
    maxWidth: 920,
  },
  ctaTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#000000', marginBottom: 4 },
  ctaText: {fontSize: '1rem', color: '#000000',fontWeight: 500},

  footerHint: { marginTop: 12, fontSize: 16, color: '#000000' },
};
