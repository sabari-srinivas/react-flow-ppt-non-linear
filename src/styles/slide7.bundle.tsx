// src/styles/slide7.bundle.tsx
'use client';

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ========= Types ========= */
export type Side = 'left' | 'right';

export type BoxSpec = {
  side: Side;
  icon: string;
  text: string;
  color: string; // bg color for the card
  delay: number;
};

export type AnchorState = {
  left: { x: number; y: number }[];
  right: { x: number; y: number }[];
  brainLx: number;
  brainRx: number;
  brainCy: number;
} | null;

/* ========= Constants (exact values) ========= */
export const CARD_W = 260;
export const CARD_H = 58;

export const brainSize = 180;

export const CONNECTOR = {
  ACTIVE: 2.5,
  INACTIVE: 1.5,
};

/* ========= Styles (updated: Nunito Sans + white bg + black text) ========= */
export const styles = {
  slideRoot: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    background: 'white', // was gradient
    padding: '20px 30px',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#000000', // default text color
  },

  h2: {
    fontSize: '2.5rem',
    color: '#4e83c3', 
    marginBottom: '6rem',
    textAlign: 'center' as const,
    fontWeight: 700,
    zIndex: 2,
  },

  measureFrame: { position: 'relative' as const, width: '100%', maxWidth: 1200, padding: '0 24px' },

  grid: {
    position: 'relative' as const,
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center' as const,
    justifyItems: 'center' as const,
    columnGap: 96,
    zIndex: 2,
  },

  leftCol: { flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end' as const, gap: 16 },
  rightCol:{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start' as const, gap: 16 },

  brainWrap: {
    width: brainSize,
    height: brainSize,
    borderRadius: '50%',
    border: '2px solid #333',
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontSize: '1.1rem',
    background: '#fff',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
    color: '#000000', // text inside brain default black
  },

  brainConic: {
    position: 'absolute' as const,
    inset: 0,
    borderRadius: '50%',
    mixBlendMode: 'multiply' as const,
    opacity: 0.5,
    background:
      'conic-gradient(from 0deg, rgba(231,76,60,.12), rgba(44,62,148,.12), rgba(231,76,60,.12))',
  },

  brainSplitLeft: {
    flex: 1,
    background: '#ff4d4d',
    color: '#ffffff', // black text
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontWeight: 600,
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  brainSplitRight: {
    flex: 1,
    background: '#4e83c3',
    color: '#ffffff', // black text
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    fontWeight: 600,
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },

  cardBase: {
    position: 'relative' as const,
    width: CARD_W,
    height: CARD_H,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: '10px 14px',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#ffffff', // black text on cards
    boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
    overflow: 'hidden' as const,
    cursor: 'pointer',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  leftText: {
    marginLeft: 10,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    flex: 1,
    textAlign: 'left' as const,
  },

  rightText: {
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden' as const,
    textOverflow: 'ellipsis' as const,
    flex: 1,
    textAlign: 'right' as const,
    marginRight: 10,
  },

  glossySweep: {
    position: 'absolute' as const,
    inset: -2,
    background:
      'linear-gradient(120deg, transparent 0%, #ffffff22 40%, #ffffff55 50%, #ffffff22 60%, transparent 100%)',
    transform: 'translateX(-60%)',
    mixBlendMode: 'screen' as const,
  },

  panelsGrid: {
    marginTop: 28,
    width: 'min(1100px, 92%)',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
  },

  panelCard: {
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 14px 34px rgba(0,0,0,0.12)',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden' as const,
    color: '#000000',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  panelHeaderUser: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 10,
    padding: '12px 16px',
    background: 'linear-gradient(90deg, #ffe7e3, #fff)',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    fontWeight: 700,
    color: '#000000', // black
  },
  panelHeaderAI: {
    display: 'flex',
    alignItems: 'center' as const,
    gap: 10,
    padding: '12px 16px',
    background: 'linear-gradient(90deg, #e6ecff, #fff)',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
    fontWeight: 700,
    color: '#000000', // black
  },

  panelBody: { padding: '16px 18px', color: '#000000', lineHeight: 1.55, fontSize: 18 },
};

/* ========= Motion snippets (exact values moved) ========= */
export const h2Intro = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const brainIntro = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, delay: 0.5 },
};

export const brainConicSpin = {
  animate: { rotate: 360 },
  transition: { duration: 16, repeat: Infinity, ease: 'linear' as const },
};

export const cardEnter = (side: Side, delay: number) => ({
  initial: { opacity: 0, x: side === 'left' ? -40 : 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay },
});

export const cardHover = (side: Side, color: string) => ({
  scale: 1.04,
  rotate: side === 'left' ? -1.5 : 1.5,
  boxShadow: `0 12px 30px ${color}66`,
});

export const glossySweepMotion = (idx: number) => ({
  animate: { x: ['-60%', '120%'] },
  transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' as const, delay: idx * 0.25 },
});

export const activeGlow = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  style: {
    position: 'absolute' as const,
    inset: -2,
    borderRadius: 12,
    boxShadow: `0 0 0 2px #ffffff88 inset, 0 0 24px currentColor`,
    pointerEvents: 'none' as const,
  },
};

export const panelPresence = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.3 },
};

/* ========= Helpers ========= */
export const TypingText: React.FC<{ text: string; speed?: number; restartKey?: string | number }> = ({
  text,
  speed = 18,
  restartKey,
}) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    setCount(0);
    if (!text) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, restartKey]);
  return <span>{text.slice(0, count)}</span>;
};

/* Smooth cubic between points (for connectors) */
export const cubicPath = (x1: number, y1: number, x2: number, y2: number) => {
  const mx = (x1 + x2) / 2;
  const c1x = (x1 + mx) / 2;
  const c2x = (x2 + mx) / 2;
  return `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`;
};

/* ========= Connector overlay component (animation+styles moved here) ========= */
export const ConnectorOverlay: React.FC<{
  anchors: AnchorState;
  activeIndex: number | null;
  showUser: boolean;
  showAI: boolean;
}> = ({ anchors, activeIndex, showUser, showAI }) => {
  if (!anchors) return null;
  const { left: L, right: R, brainLx, brainRx, brainCy } = anchors;

  return (
    <svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
    >
      {/* LEFT -> BRAIN */}
      {L.map((p, i) => {
        const isActive = activeIndex === i && (showUser || showAI);
        const stroke = '#e74c3c';
        const d = cubicPath(p.x, p.y, brainLx, brainCy);
        return (
          <motion.path
            key={`L-${i}`}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={isActive ? CONNECTOR.ACTIVE : CONNECTOR.INACTIVE}
            strokeDasharray="none"
            strokeOpacity={0.98}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.55 }}
            transition={{ duration: 0.25 }}
          />
        );
      })}

      {/* BRAIN -> RIGHT */}
      {R.map((p, i) => {
        const isActive = activeIndex === i && showAI;
        const stroke = '#2c3e94';
        const d = cubicPath(brainRx, brainCy, p.x, p.y);
        return (
          <motion.path
            key={`R-${i}`}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={isActive ? CONNECTOR.ACTIVE : CONNECTOR.INACTIVE}
            strokeDasharray="none"
            strokeOpacity={0.98}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ opacity: isActive ? 1 : 0.55 }}
            transition={{ duration: 0.25 }}
          />
        );
      })}
    </svg>
  );
};
