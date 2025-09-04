'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

// ---------- Types ----------
type Side = 'left' | 'right';

type BoxSpec = {
  side: Side;
  icon: string;
  text: string;
  color: string; // bg color for the card
  delay: number;
};

// ---------- Styles & Constants ----------
const CARD_W = 260;
const CARD_H = 58;

const cardBase: React.CSSProperties = {
  position: 'relative',
  width: CARD_W,
  height: CARD_H,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 14px',
  fontSize: '1rem',
  fontWeight: 600,
  color: '#fff',
  boxShadow: '0 8px 22px rgba(0,0,0,0.12)',
  overflow: 'hidden',
  cursor: 'pointer',
};

const brainSize = 180;

// Thicker, more visible connectors (no dots needed now)
const CONNECTOR = {
  ACTIVE: 2.5,
  INACTIVE: 1.5,
};

// Typing helper
const TypingText: React.FC<{ text: string; speed?: number; restartKey?: string | number }> = ({
  text,
  speed = 18,
  restartKey,
}) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
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

export default function Slide7_Boxes_ClickToStory_BothPanels_WithConnectorsThicker() {
  const left: BoxSpec[] = [
    { side: 'left', icon: '💡', text: 'Framing', delay: 0.2, color: '#e74c3c' },
    { side: 'left', icon: '📊', text: 'Assessment', delay: 0.35, color: '#e74c3c' },
    { side: 'left', icon: '🗂️', text: 'Curation', delay: 0.5, color: '#e74c3c' },
    { side: 'left', icon: '🔎', text: 'Synthesis & Sensemaking', delay: 0.65, color: '#e74c3c' },
    { side: 'left', icon: '🌐', text: 'Networks', delay: 0.8, color: '#e74c3c' },
    { side: 'left', icon: '🤝', text: 'Engagement', delay: 0.95, color: '#e74c3c' },
  ];
  const right: BoxSpec[] = [
    { side: 'right', icon: '🛠️', text: 'Generation', delay: 0.2, color: '#2c3e94' },
    { side: 'right', icon: '✨', text: 'Inspiration', delay: 0.35, color: '#2c3e94' },
    { side: 'right', icon: '🧩', text: 'Diagnostics', delay: 0.5, color: '#2c3e94' },
    { side: 'right', icon: '📈', text: 'Analysis', delay: 0.65, color: '#2c3e94' },
    { side: 'right', icon: '🔄', text: 'Adaptation', delay: 0.8, color: '#2c3e94' },
    { side: 'right', icon: 'ℹ️', text: 'Information', delay: 0.95, color: '#2c3e94' },
  ];

  // Example stories (pair-wise)
  const stories = useMemo(
    () => [
      {
        user: 'User: We need to launch a summer promo. Who is it for and what should it emphasize?',
        ai: 'AI (Generation): Target first-time visitors with a 10% off welcome bundle. Emphasize fast setup and 24/7 support.',
      },
      {
        user: 'User: Our Q2 NPS dipped by 6 points. What should we look at first?',
        ai: 'AI (Inspiration): Start with ticket tags “latency” and “billing.” Run a quick cohort chart by plan to spot regression.',
      },
      {
        user: 'User: I have 200 blog ideas. Which ones should make the cut?',
        ai: 'AI (Diagnostics): Cluster ideas by search intent; prioritize “how-to” topics with mid-funnel keywords and low KD.',
      },
      {
        user: 'User: We saw sign-ups rise but activations stall. Why?',
        ai: 'AI (Analysis): Funnel shows a drop on step 2 (import data). Add sample dataset and inline helper to reduce friction.',
      },
      {
        user: 'User: The market shifted overnight—how should the plan change?',
        ai: 'AI (Adaptation): Swap webinar for a live demo series; update copy to address new pricing norms and value guarantees.',
      },
      {
        user: 'User: Field team needs quick facts during calls.',
        ai: 'AI (Information): Surface a one-pager with pricing, SLAs, competitive angles, and 3 objection rebuttals.',
      },
    ],
    []
  );

  // State: which pair is active, and whether each panel is shown
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showUser, setShowUser] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // Refs for precise connector anchoring
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rightRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const brainRef = useRef<HTMLDivElement | null>(null);

  // Normalized (0–100) connector anchors computed from DOM
  const [anchors, setAnchors] = useState<{
    left: { x: number; y: number }[];
    right: { x: number; y: number }[];
    brainLx: number;
    brainRx: number;
    brainCy: number;
  } | null>(null);

  // Compute anchors on mount/resize
  useEffect(() => {
    const compute = () => {
      if (!containerRef.current || !brainRef.current) return;

      const frame = containerRef.current.getBoundingClientRect();
      const toN = (x: number, y: number) => ({
        nx: ((x - frame.left) / frame.width) * 100,
        ny: ((y - frame.top) / frame.height) * 100,
      });

      const lPts: { x: number; y: number }[] = [];
      const rPts: { x: number; y: number }[] = [];

      leftRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const midY = r.top + r.height / 2;
        const connectX = r.right + 12;
        const { nx, ny } = toN(connectX, midY);
        lPts[i] = { x: nx, y: ny };
      });

      rightRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const midY = r.top + r.height / 2;
        const connectX = r.left - 12;
        const { nx, ny } = toN(connectX, midY);
        rPts[i] = { x: nx, y: ny };
      });

      const br = brainRef.current.getBoundingClientRect();
      const brainCx = br.left + br.width / 2;
      const brainCy = br.top + br.height / 2;
      const radius = br.width / 2;
      const leftEdge = brainCx - radius + 4;
      const rightEdge = brainCx + radius - 4;

      const { nx: brainLx } = toN(leftEdge, brainCy);
      const { nx: brainRx } = toN(rightEdge, brainCy);
      const { ny: brainCyn } = toN(brainCx, brainCy);

      setAnchors({
        left: lPts,
        right: rPts,
        brainLx,
        brainRx,
        brainCy: brainCyn,
      });
    };

    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    if (brainRef.current) ro.observe(brainRef.current);
    leftRefs.current.forEach((el) => el && ro.observe(el));
    rightRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener('resize', compute);
    compute();

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, []);

  // On click left card -> show user panel immediately; schedule AI panel
  const handleLeftClick = (idx: number) => {
    setActiveIndex(idx);
    setShowUser(true);
    setShowAI(false);
  };

  // When user panel shows, bring AI panel after delay (both remain visible)
  useEffect(() => {
    if (!showUser || activeIndex === null) return;
    const userText = stories[activeIndex].user;
    const ms = Math.min(2500, Math.max(1200, userText.length * 18));
    const id = setTimeout(() => setShowAI(true), ms);
    return () => clearTimeout(id);
  }, [showUser, activeIndex, stories]);

  // ----- Card renderer -----
  const renderCard = (
    b: BoxSpec,
    idx: number,
    side: Side,
    refCB: (el: HTMLButtonElement | null) => void
  ) => {
    const isLeftActive = side === 'left' && activeIndex === idx && showUser;
    const isRightActive = side === 'right' && activeIndex === idx && showAI;

    return (
      <motion.button
        ref={refCB}
        key={`${side}-${idx}`}
        initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: b.delay }}
        whileHover={{
          scale: 1.04,
          rotate: side === 'left' ? -1.5 : 1.5,
          boxShadow: `0 12px 30px ${b.color}66`,
        }}
        onClick={() => side === 'left' && handleLeftClick(idx)}
        style={{
          ...cardBase,
          background: b.color,
          outline: 'none',
          border: 'none',
          cursor: side === 'left' ? 'pointer' : 'default',
        }}
      >
        {/* active glow */}
        <AnimatePresence>
          {(isLeftActive || isRightActive) && (
            <motion.div
              key="active-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: 12,
                boxShadow: `0 0 0 2px #ffffff88 inset, 0 0 24px ${b.color}`,
                pointerEvents: 'none',
              }}
            />
          )}
        </AnimatePresence>

        {side === 'left' ? (
          <>
            <span style={{ fontSize: 18 }}>{b.icon}</span>
            <span
              style={{
                marginLeft: 10,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
                textAlign: 'left',
              }}
            >
              {b.text}
            </span>
          </>
        ) : (
          <>
            <span
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flex: 1,
                textAlign: 'right',
                marginRight: 10,
              }}
            >
              {b.text}
            </span>
            <span style={{ fontSize: 18 }}>{b.icon}</span>
          </>
        )}

        {/* glossy sweep */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: -2,
            background:
              'linear-gradient(120deg, transparent 0%, #ffffff22 40%, #ffffff55 50%, #ffffff22 60%, transparent 100%)',
            transform: 'translateX(-60%)',
            mixBlendMode: 'screen',
          }}
          animate={{ x: ['-60%', '120%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.25 }}
        />
      </motion.button>
    );
  };

  // --- Solid, connected lines (no dots, no draw-on effect) ---
  const ConnectorOverlay = () => {
    if (!anchors) return null;
    const { left: L, right: R, brainLx, brainRx, brainCy } = anchors;

    // helper to make a smooth cubic bezier between two points
    const cubic = (x1: number, y1: number, x2: number, y2: number) => {
      const mx = (x1 + x2) / 2;
      // pull control points toward the middle for a nice “S” curve
      const c1x = (x1 + mx) / 2;
      const c2x = (x2 + mx) / 2;
      return `M ${x1} ${y1} C ${c1x} ${y1}, ${c2x} ${y2}, ${x2} ${y2}`;
    };

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
          const d = cubic(p.x, p.y, brainLx, brainCy);

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
          const d = cubic(brainRx, brainCy, p.x, p.y);

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

  return (
    <motion.div
      className="slide-container"
      style={{
        ...slideContainer,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        padding: '40px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontSize: '2.2rem',
          color: '#1a237e',
          marginBottom: '2rem',
          textAlign: 'center',
          fontWeight: 700,
          zIndex: 2,
        }}
      >
        Human + AI Collaboration
      </motion.h2>

      {/* Measurement frame wraps overlay + content */}
      <div
        ref={containerRef}
        style={{ position: 'relative', width: '100%', maxWidth: 1200, padding: '0 24px' }}
      >
        {/* Connector overlay (behind content) */}
        <ConnectorOverlay />

        {/* Content grid above overlay */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            justifyItems: 'center',
            columnGap: 96,
            zIndex: 2,
          }}
        >
          {/* Left column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
            {left.map((b, idx) => renderCard(b, idx, 'left', (el) => (leftRefs.current[idx] = el)))}
          </div>

          {/* Center brain */}
          <motion.div
            ref={brainRef}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              width: brainSize,
              height: brainSize,
              borderRadius: '50%',
              border: '2px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              background: '#fff',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            }}
          >
            <motion.div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                mixBlendMode: 'multiply',
                opacity: 0.5,
                background:
                  'conic-gradient(from 0deg, rgba(231,76,60,.12), rgba(44,62,148,.12), rgba(231,76,60,.12))',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            />
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              <div
                style={{
                  flex: 1,
                  background: '#e74c3c',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  borderTopLeftRadius: '50%',
                  borderBottomLeftRadius: '50%',
                }}
              >
                HUMAN
              </div>
              <div style={{ width: 1, background: 'rgba(0,0,0,0.08)' }} />
              <div
                style={{
                  flex: 1,
                  background: '#2c3e94',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  borderTopRightRadius: '50%',
                  borderBottomRightRadius: '50%',
                }}
              >
                AI
              </div>
            </div>
          </motion.div>

          {/* Right column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            {right.map((b, idx) => renderCard(b, idx, 'right', (el) => (rightRefs.current[idx] = el)))}
          </div>
        </div>
      </div>

      {/* Dual story panels */}
      <div
        style={{
          marginTop: 28,
          width: 'min(1100px, 92%)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
        }}
      >
        <AnimatePresence>
          {activeIndex !== null && showUser && (
            <motion.div
              key={`user-${activeIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#fff',
                borderRadius: 14,
                boxShadow: '0 14px 34px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  background: 'linear-gradient(90deg, #ffe7e3, #fff)',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                <span style={{ fontSize: 18 }}>{left[activeIndex].icon}</span>
                <span>{left[activeIndex].text} — User request</span>
              </div>
              <div style={{ padding: '16px 18px', color: '#374151', lineHeight: 1.55, fontSize: 16 }}>
                <TypingText text={stories[activeIndex].user} restartKey={`u-${activeIndex}`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeIndex !== null && showAI && (
            <motion.div
              key={`ai-${activeIndex}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              style={{
                background: '#fff',
                borderRadius: 14,
                boxShadow: '0 14px 34px rgba(0,0,0,0.12)',
                border: '1px solid rgba(0,0,0,0.06)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  background: 'linear-gradient(90deg, #e6ecff, #fff)',
                  borderBottom: '1px solid rgba(0,0,0,0.06)',
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                <span style={{ fontSize: 18 }}>{right[activeIndex].icon}</span>
                <span>{right[activeIndex].text} — AI output</span>
              </div>
              <div style={{ padding: '16px 18px', color: '#374151', lineHeight: 1.55, fontSize: 16 }}>
                <TypingText text={stories[activeIndex].ai} restartKey={`a-${activeIndex}`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}