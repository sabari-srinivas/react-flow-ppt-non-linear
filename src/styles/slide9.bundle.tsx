// src/styles/slide9.bundle.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import React from 'react';

/* ===== Motion (exact values from your file) ===== */
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { y: -6, boxShadow: '0 14px 30px rgba(0,0,0,0.15)', transition: { duration: 0.25 } },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } },
};

export const topGridIntro = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const bottomTextIntro = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.8 },
};

export const overlayFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/* ===== Base styles (updated: Nunito Sans + white bg + black text) ===== */
export const styles = {
  root: {
    color: '#000000',
    padding: '40px 60px',
    background: '#ffffff',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as React.CSSProperties,

  grid4: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(220px, 1fr))',
    gap: 24,
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto 40px',
  } as React.CSSProperties,

  buttonBase: {
    borderRadius: 16,
    padding: 24,
    textAlign: 'left' as const, // LEFT align everything by default
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 8px 22px rgba(0,0,0,0.06)',
    backdropFilter: 'blur(6px)',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    outline: 'none',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#000000',
  } as React.CSSProperties,

  iconCircleBase: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 14px', // ICON stays centered
    fontSize: 26,
    color: '#000000',
  } as React.CSSProperties,

  cardTitle: {
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: '0 0 8px 0',
    color: '#000000',
    textAlign: 'center' as const, // TITLE stays centered
    width: '100%',
  } as React.CSSProperties,

  cardBlurb: {
    margin: 0,
    fontSize: '22px', // Updated to 22px
    color: '#000000',
    lineHeight: 1.5,
    textAlign: 'left' as const, // LEFT-aligned as requested
  } as React.CSSProperties,

  shimmerBase: {
    position: 'absolute' as const,
    inset: -2,
    background:
      'linear-gradient(120deg, transparent 0%, rgba(255,255,255,.25) 45%, rgba(255,255,255,.55) 50%, rgba(255,255,255,.25) 55%, transparent 100%)',
    transform: 'translateX(-60%)',
    mixBlendMode: 'screen' as const,
  },

  bottomHeadline: {
    fontSize: '2.3rem',
    fontWeight: 700,
    color: '#4e83c3',
    textAlign: 'center' as const,
    marginTop: 16,
    textShadow: 'none',
  } as React.CSSProperties,

  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(15,23,42,0.38)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },

  sheet: {
    width: 'min(720px, 90vw)',
    borderRadius: 16,
    background: '#ffffff',
    boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#000000',
  } as React.CSSProperties,

  sheetBody: { 
    padding: 20, 
    color: '#000000' 
  } as React.CSSProperties,

  sheetList: { 
    margin: 0, 
    paddingLeft: 18, 
    color: '#000000', 
    lineHeight: 1.6,
    textAlign: 'left' as const, // Ensure list is left-aligned
  } as React.CSSProperties,

  sheetListItem: { 
    marginBottom: 8,
    fontSize: '26px', // Updated to 22px
    textAlign: 'left' as const, // Ensure list items are left-aligned
  } as React.CSSProperties,
};

/* ===== Per-card style helpers (accents preserved) ===== */
export const cardButtonStyle = (bgGrad: string): React.CSSProperties => ({ 
  background: bgGrad 
});

export const iconCircleStyle = (accent: string): React.CSSProperties => ({
  ...styles.iconCircleBase,
  background: `${accent}15`,
  border: `1px solid ${accent}55`,
});

export const haloStyle = (accent: string): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(120px 60px at 50% 0%, ${accent}22, transparent 60%)`,
  pointerEvents: 'none',
});

export const haloMotion = (i: number) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: [0.65, 0.9, 0.65], scale: 1 },
  transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.15 },
});

export const shimmerMotion = (i: number) => ({
  animate: { x: ['-60%', '120%'] },
  transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const, delay: i * 0.2 },
});

export const headerRowStyle = (accent: string, bgGrad: string): React.CSSProperties => ({
  padding: '18px 20px',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  background: bgGrad,
  borderBottom: `1px solid ${accent}33`,
});

export const headerIconStyle = (accent: string): React.CSSProperties => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  display: 'grid',
  placeItems: 'center',
  border: `1px solid ${accent}66`,
  background: `${accent}10`,
  fontSize: 20,
});

export const headerTitle = { 
  fontSize: '1.7rem', 
  fontWeight: 700, 
  color: '#000000',
  textAlign: 'left' as const,
} as React.CSSProperties;

export const headerSub = { 
  fontSize: '20px', // Updated to 22px for consistency
  color: '#000000',
  textAlign: 'left' as const, // Ensure left alignment
} as React.CSSProperties;

export const closeBtn = {
  marginLeft: 'auto',
  border: 'none',
  background: 'transparent',
  fontSize: 20,
  cursor: 'pointer',
  color: '#000000',
} as React.CSSProperties;

export const footerTipStyle = (accent: string): React.CSSProperties => ({
  marginTop: 16,
  padding: 12,
  borderRadius: 12,
  background: `radial-gradient(120px 60px at 20% 0%, ${accent}10, transparent 60%)`,
  border: `1px dashed ${accent}44`,
  color: '#000000',
  fontSize: '20px', // Updated to 22px
  textAlign: 'left' as const, // Ensure left alignment
});
