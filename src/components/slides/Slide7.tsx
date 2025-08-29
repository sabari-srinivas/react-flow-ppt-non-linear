import React from 'react';
import { motion } from 'framer-motion';
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

// ---------- Styles ----------
const CARD_W = 260;
const CARD_H = 58; // consistent height for all boxes

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
};

const brainSize = 180;

export default function Slide7_Boxes_NoConnectors() {
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

  const renderCard = (b: BoxSpec, idx: number) => (
    <motion.div
      key={`${b.side}-${idx}`}
      initial={{ opacity: 0, x: b.side === 'left' ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: b.delay }}
      whileHover={{
        scale: 1.04,
        rotate: b.side === 'left' ? -1.5 : 1.5,
        boxShadow: `0 12px 30px ${b.color}66`,
      }}
      style={{ ...cardBase, background: b.color }}
    >
      {b.side === 'left' ? (
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
    </motion.div>
  );

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

      {/* Equal spacing grid: [Left | Brain | Right] */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          justifyItems: 'center',
          width: '100%',
          maxWidth: 1200,
          columnGap: 96,
          padding: '0 24px',
        }}
      >
        {/* Left column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 16,
            zIndex: 2,
          }}
        >
          {left.map((b, idx) => renderCard(b, idx))}
        </div>

        {/* Center brain (animated) */}
        <motion.div
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
            zIndex: 2,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
          }}
        >
          {/* soft rotating glow */}
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
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 16,
            zIndex: 2,
          }}
        >
          {right.map((b, idx) => renderCard(b, idx))}
        </div>
      </div>
    </motion.div>
  );
}
