// src/styles/slide14.bundle.ts
import type { CSSProperties } from 'react';
import type { Variants } from 'framer-motion';
import { cubicBezier } from 'framer-motion';
import { slideContainer, titleStyle } from './slideStyles';

/* ========= Easings ========= */
export const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9);
export const EASE_OUT  = cubicBezier(0.16, 1, 0.3, 1);
export const LINEAR = (t: number) => t;

/* ========= Variants for typewriter ========= */
export const charVariants: Variants = {
  hidden: { opacity: 0, y: 2 },
  show: { opacity: 1, y: 0, transition: { duration: 0.04, ease: EASE_SOFT } },
};
export const lineVariants = (stagger = 0.035): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, ease: EASE_SOFT } },
});

/* ========= Common transitions ========= */
export const containerTransition = { duration: 0.6, ease: EASE_OUT } as const;
export const titleTransition     = { duration: 0.7, ease: EASE_SOFT } as const;
export const narratorTransition  = { duration: 0.4, ease: EASE_SOFT } as const;
export const promptTransition    = { duration: 0.6, ease: EASE_SOFT } as const;
export const storyTransition     = { duration: 0.45, ease: EASE_SOFT } as const;

/* ========= Styles (updated: Nunito Sans + white bg + black text) ========= */
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
    marginBottom: 14,
    color: '#4e83c3', // black text instead of gradient
    textAlign: 'center',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  promptBubble: {
    background: '#ffffff',
    color: '#000000',
    padding: '12px 16px',
    borderRadius: 12,
    fontSize: '1.5rem',
    marginBottom: 16,
    boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
  },

  narratorWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 14,
    padding: '10px 14px',
    boxShadow: '0 10px 22px rgba(0,0,0,0.10)',
    marginBottom: 10,
    maxWidth: 900,
    width: '100%',
  },
  narratorEmoji: { fontSize: 20 },
  narratorTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#000000' },
  narratorProgressOuter: {
    height: 6, flex: 1, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden',
  },
  narratorRestartBtn: {
    border: 'none', background: 'transparent', color: '#000000', cursor: 'pointer', fontSize: 12, padding: '6px 8px',
  },

  pipelineGrid: {
    width: '100%',
    maxWidth: 1100,
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: 14,
    alignItems: 'stretch',
    margin: '8px 0 12px',
    fontSize: '1.1rem',
  },
  pipelineCardBase: {
    background: '#ffffff',
    border: '2px solid rgba(0,0,0,0.06)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
    borderRadius: 14,
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 130,
    position: 'relative',
  },
  pipelineActiveHalo: {
    position: 'absolute', inset: -2, borderRadius: 12,
  },
  stepBadge: {
    position: 'absolute',
    top: -10,
    left: -10,
    width: 28,
    height: 28,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    fontSize: 16,
    fontWeight: 800,
    color: '#ffffff',
    background: '#000000',
    boxShadow: '0 6px 12px rgba(0,0,0,0.12)',
  },
  emoji: { fontSize: 28, marginTop: 6 },
  cardTitle: { fontWeight: 800, color: '#000000', textAlign: 'center' },
  cardRole:  { fontSize: 18, color: '#000000', textAlign: 'center' },

  infoText: { marginBottom: 10, fontSize: 22, color: '#000000' },

  tokenLane: {
    position: 'relative',
    width: '100%',
    maxWidth: 1100,
    height: 26,
    marginBottom: 18,
    overflow: 'hidden',
    borderRadius: 999,
    background: '#f1f5f9',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)',
  },

  storyCard: {
    background: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 16,
    padding: '16px 18px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
    maxWidth: 900,
    width: '100%',
  },
  storyHeader: { display: 'flex', gap: 12, alignItems: 'flex-start' },
  storyAvatar: {
    width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', fontSize: 18,
  },
  storyBody: { flex: 1 },
  storyBlurb: {fontSize: 24, fontWeight: 600, color: '#000000', marginBottom: 4 },
  storyDetail: { color: '#000000', fontSize: 20, lineHeight: 1.55 },

  typedPoem: {
    marginTop: 10,
    background: '#fef3c7',
    padding: '12px 16px',
    borderRadius: 10,
    color: '#000000',
    fontSize: '1.05rem',
    fontStyle: 'italic',
    display: 'inline-flex',
    alignItems: 'center',
  },

  footerHint: { marginTop: 10, fontSize: 12, color: '#000000' },

  // Typewriter pieces
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
};
