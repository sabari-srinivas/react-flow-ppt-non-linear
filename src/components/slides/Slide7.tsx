'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

import {
  BoxSpec,
  Side,
  AnchorState,
  styles,
  CARD_W,
  CARD_H,
  CONNECTOR,
  brainSize,
  h2Intro,
  brainIntro,
  brainConicSpin,
  cardEnter,
  cardHover,
  glossySweepMotion,
  activeGlow,
  panelPresence,
  TypingText,
  ConnectorOverlay,
} from '../../styles/slide7.bundle';

export default function Slide7_Boxes_ClickToStory_BothPanels_WithConnectorsThicker() {
  const left: BoxSpec[] = [
    { side: 'left', icon: '💡', text: 'Framing', delay: 0.2, color: '#ff4d4d' },
    { side: 'left', icon: '📊', text: 'Assessment', delay: 0.35, color: '#ff4d4d' },
    { side: 'left', icon: '🗂️', text: 'Curation', delay: 0.5, color: '#ff4d4d' },
    { side: 'left', icon: '🔎', text: 'Synthesis & Sensemaking', delay: 0.65, color: '#ff4d4d' },
    { side: 'left', icon: '🌐', text: 'Networks', delay: 0.8, color: '#ff4d4d' },
    { side: 'left', icon: '🤝', text: 'Engagement', delay: 0.95, color: '#ff4d4d' },
  ];
  const right: BoxSpec[] = [
    { side: 'right', icon: '🛠️', text: 'Generation', delay: 0.2, color: '#4e83c3' },
    { side: 'right', icon: '✨', text: 'Inspiration', delay: 0.35, color: '#4e83c3' },
    { side: 'right', icon: '🧩', text: 'Diagnostics', delay: 0.5, color: '#4e83c3' },
    { side: 'right', icon: '📈', text: 'Analysis', delay: 0.65, color: '#4e83c3' },
    { side: 'right', icon: '🔄', text: 'Adaptation', delay: 0.8, color: '#4e83c3' },
    { side: 'right', icon: 'ℹ️', text: 'Information', delay: 0.95, color: '#4e83c3' },
  ];

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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showUser, setShowUser] = useState(false);
  const [showAI,   setShowAI]   = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rightRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const brainRef = useRef<HTMLDivElement | null>(null);

  const [anchors, setAnchors] = useState<AnchorState>(null);

  // Compute anchors on mount/resize (unchanged math, moved helpers in bundle)
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

  const handleLeftClick = (idx: number) => {
    setActiveIndex(idx);
    setShowUser(true);
    setShowAI(false);
  };

  useEffect(() => {
    if (!showUser || activeIndex === null) return;
    const userText = stories[activeIndex].user;
    const ms = Math.min(2500, Math.max(1200, userText.length * 18));
    const id = setTimeout(() => setShowAI(true), ms);
    return () => clearTimeout(id);
  }, [showUser, activeIndex, stories]);

  // Card renderer (styles + motion imported)
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
        initial={cardEnter(side, b.delay).initial}
        animate={cardEnter(side, b.delay).animate}
        transition={cardEnter(side, b.delay).transition}
        whileHover={cardHover(side, b.color)}
        onClick={() => side === 'left' && handleLeftClick(idx)}
        style={{ ...styles.cardBase, background: b.color, outline: 'none', border: 'none', cursor: side === 'left' ? 'pointer' : 'default' }}
      >
        <AnimatePresence>
          {(isLeftActive || isRightActive) && (
            <motion.div
              key="active-glow"
              initial={activeGlow.initial}
              animate={activeGlow.animate}
              exit={activeGlow.exit}
              style={{ ...activeGlow.style, boxShadow: `0 0 0 2px #ffffff88 inset, 0 0 24px ${b.color}` }}
            />
          )}
        </AnimatePresence>

        {side === 'left' ? (
          <>
            <span style={{ fontSize: 18 }}>{b.icon}</span>
            <span style={styles.leftText}>{b.text}</span>
          </>
        ) : (
          <>
            <span style={styles.rightText}>{b.text}</span>
            <span style={{ fontSize: 18 }}>{b.icon}</span>
          </>
        )}

        <motion.div aria-hidden style={styles.glossySweep} {...glossySweepMotion(idx)} />
      </motion.button>
    );
  };

  return (
    <motion.div className="slide-container" style={{ ...slideContainer, ...styles.slideRoot }}>
      <motion.h2 initial={h2Intro.initial} animate={h2Intro.animate} transition={h2Intro.transition} style={styles.h2}>
        Human + AI Collaboration
      </motion.h2>

      {/* Measurement frame wraps overlay + content */}
      <div ref={containerRef} style={styles.measureFrame}>
        {/* Connector overlay (behind content) */}
        <ConnectorOverlay anchors={anchors} activeIndex={activeIndex} showUser={showUser} showAI={showAI} />

        {/* Content grid above overlay */}
        <div style={styles.grid}>
          {/* Left column */}
          <div style={styles.leftCol}>
            {left.map((b, idx) => renderCard(b, idx, 'left', (el) => (leftRefs.current[idx] = el)))}
          </div>

          {/* Center brain */}
          <motion.div ref={brainRef} initial={brainIntro.initial} animate={brainIntro.animate} transition={brainIntro.transition} style={styles.brainWrap}>
            <motion.div aria-hidden style={styles.brainConic} animate={brainConicSpin.animate} transition={brainConicSpin.transition} />
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
              <div style={styles.brainSplitLeft}>HUMAN</div>
              <div style={{ width: 1, background: 'rgba(0,0,0,0.08)' }} />
              <div style={styles.brainSplitRight}>AI</div>
            </div>
          </motion.div>

          {/* Right column */}
          <div style={styles.rightCol}>
            {right.map((b, idx) => renderCard(b, idx, 'right', (el) => (rightRefs.current[idx] = el)))}
          </div>
        </div>
      </div>

      {/* Dual story panels */}
      <div style={styles.panelsGrid}>
        <AnimatePresence>
          {activeIndex !== null && showUser && (
            <motion.div key={`user-${activeIndex}`} initial={panelPresence.initial} animate={panelPresence.animate} exit={panelPresence.exit} transition={panelPresence.transition} style={styles.panelCard}>
              <div style={styles.panelHeaderUser}>
                <span style={{ fontSize: 18 }}>{left[activeIndex].icon}</span>
                <span>{left[activeIndex].text} — User request</span>
              </div>
              <div style={styles.panelBody}>
                <TypingText text={stories[activeIndex].user} restartKey={`u-${activeIndex}`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeIndex !== null && showAI && (
            <motion.div key={`ai-${activeIndex}`} initial={panelPresence.initial} animate={panelPresence.animate} exit={panelPresence.exit} transition={panelPresence.transition} style={styles.panelCard}>
              <div style={styles.panelHeaderAI}>
                <span style={{ fontSize: 18 }}>{right[activeIndex].icon}</span>
                <span>{right[activeIndex].text} — AI output</span>
              </div>
              <div style={styles.panelBody}>
                <TypingText text={stories[activeIndex].ai} restartKey={`a-${activeIndex}`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
