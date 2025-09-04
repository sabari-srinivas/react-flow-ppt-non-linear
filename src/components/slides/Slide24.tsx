'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// Inlined styles to remove external dependencies
const slideContainer: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
};

type Step = {
  id: number;
  label: string;
  emoji: string;
};

// Content for the steps in the workflow
const STEPS: Step[] = [
  { id: 1, label: 'Perceive', labelKey: 'perceive', emoji: '👀' } as any,
  { id: 2, label: 'Plan',     labelKey: 'plan',     emoji: '📝' } as any,
  { id: 3, label: 'Act',      labelKey: 'act',      emoji: '⚙️' } as any,
  { id: 4, label: 'Report',   labelKey: 'report',   emoji: '✅' } as any,
] as unknown as Step[];

// 2–3 concise lines per phase, shown cumulatively
const STEP_CONTENT: string[][] = [
  [
    'Read user intent & constraints.',
    'Pull recent orders and preferences.',
    'Detect gaps to clarify if needed.',
  ],
  [
    'Pick store, slot, and coupon strategy.',
    'Sequence tasks across roles.',
    'Estimate time & total cost.',
  ],
  [
    'Prepare items & package carefully.',
    'Schedule pickup and dispatch driver.',
    'Execute payment & confirmations.',
  ],
  [
    'Summarize order, savings, and ETA.',
    'Share tracking link & receipt.',
    'Offer “repeat next week”.',
  ],
];

type Agent = {
  id: number;
  name: string;
  emoji: string;
  tasks: string[]; // Tasks per step, indexed the same as STEPS
};

// (kept for the typed panel)
const AGENTS: Agent[] = [
  {
    id: 1,
    name: 'Manager',
    emoji: '🧑‍💼',
    tasks: [
      'Check new customer orders.',
      'Assign chef and delivery slot.',
      'Ensure order is packaged correctly.',
      'Send confirmation & tracking to customer.',
    ],
  },
  {
    id: 2,
    name: 'Chef',
    emoji: '👨‍🍳',
    tasks: [
      'Receive order details and ingredients.',
      'Plan cooking schedule and prep work.',
      'Cook all dishes according to the order.',
      'Notify manager that the order is ready.',
    ],
  },
  {
    id: 3,
    name: 'Driver',
    emoji: '🚗',
    tasks: [
      'Wait for an assigned delivery.',
      'Check the optimal route and timing.',
      'Pick up the correctly packaged food.',
      'Deliver the order to the customer’s door.',
    ],
  },
];

const EASE = [0.2, 0.8, 0.2, 1] as const;

// A reusable styled chip component for displaying the current step
const StepChip = ({ label, active, idx }: { label: string; active: boolean; idx: number }) => (
  <motion.div
    initial={false}
    animate={{
      background: active ? 'linear-gradient(90deg,#ff2e63,#ff9f43)' : 'rgba(255,255,255,0.95)',
      color: active ? '#fff' : '#0f172a',
      scale: active ? 1.05 : 1,
      boxShadow: active ? '0 10px 20px rgba(255,46,99,0.25)' : '0 6px 14px rgba(0,0,0,0.08)',
    }}
    transition={{ duration: 0.5, ease: EASE }}
    style={{
      padding: '6px 12px',
      borderRadius: 999,
      fontWeight: 800,
      fontSize: 12,
      border: '1px solid rgba(0,0,0,0.06)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
    }}
    aria-current={active ? 'step' : undefined}
  >
    <span style={{ opacity: 0.7 }}>{idx + 1}.</span> {label}
  </motion.div>
);

// Small helper for cyclic index math
export function nextIndex(current: number, len: number) {
  return (current + 1) % Math.max(1, len);
}

const MultiAgentSlide: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0); // 0..3
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [isPaused, setPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.5 });

  // Typewriter panel: current phase task lines across agents
  useEffect(() => {
    if (!inView) return;
    const lines = AGENTS.map((agent) => `${agent.emoji} ${agent.name}: ${agent.tasks[activeStepIdx]}`);
    const full = lines.join('\n');
    let i = 0;
    setTypedText('');
    setTypingDone(false);

    const id = setInterval(() => {
      i++;
      setTypedText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setTypingDone(true);
      }
    }, 14);
    return () => clearInterval(id);
  }, [activeStepIdx, inView]);

  // Main loop: cycle steps
  useEffect(() => {
    if (!inView) return;
    let step = activeStepIdx;
    const dwell = 2400; // ms per phase
    const id = setInterval(() => {
      if (isPaused) return;
      step = nextIndex(step, STEPS.length);
      setActiveStepIdx(step);
    }, dwell);
    return () => clearInterval(id);
  }, [inView, isPaused, activeStepIdx]);

  return (
    <div
      style={{
        ...slideContainer,
        padding: '32px',
        gap: '24px',
        background:
          'radial-gradient(1200px 400px at 10% -10%, #f0f7ff 0%, transparent 60%),radial-gradient(1000px 380px at 120% 110%, #fff9f2 0%, transparent 60%)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.h2
        style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', margin: 0, textAlign: 'center' }}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Multi-Agent Workflow — Restaurant Order
      </motion.h2>

      <motion.p
        style={{ fontSize: 16, maxWidth: 840, color: '#475569', textAlign: 'center' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Watch 🧑‍💼, 👨‍🍳, and 🚗 collaborate. Each step builds on the last: <b>Perceive → Plan → Act → Report</b>.
      </motion.p>

      {/* Step chips */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <StepChip label={s.label} active={activeStepIdx === i} idx={i} />
            {i < STEPS.length - 1 && <span style={{ color: '#94a3b8', fontSize: 12 }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Main scene container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: 'min(980px, 95vw)',
          minHeight: 320,
          padding: '56px 24px 100px',
          borderRadius: 16,
          background: 'linear-gradient(#f8fafc,#eef2f7)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Step cards with stronger active shadow + glow pulse + cumulative content */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {STEPS.map((step, i) => {
            const active = activeStepIdx === i;
            const revealed = activeStepIdx >= i; // cumulative reveal
            return (
              <motion.div
                key={step.id}
                initial={false}
                animate={{
                  y: active ? -6 : 0,
                  scale: active ? 1.03 : 1,
                  boxShadow: active
                    ? '0 32px 80px rgba(255,46,99,0.35), 0 10px 24px rgba(0,0,0,0.12)'
                    : '0 8px 18px rgba(0,0,0,0.08)',
                  borderColor: active ? 'rgba(255,46,99,0.5)' : 'rgba(0,0,0,0.06)',
                }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  flex: '1 1 200px',
                  minWidth: 200,
                  maxWidth: 220,
                  borderRadius: 14,
                  background: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  padding: 14,
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                {/* Glow pulse overlay */}
                <motion.div
                  animate={active ? { opacity: [0.4, 0.18, 0.4], scale: [1, 1.05, 1] } : { opacity: 0 }}
                  transition={{ duration: 2.0, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: -8,
                    borderRadius: 16,
                    background: 'radial-gradient(circle, rgba(255,46,99,0.22), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ fontSize: 28 }}>{step.emoji}</div>
                <div style={{ fontWeight: 800, marginTop: 6, color: '#0f172a' }}>{step.label}</div>

                {/* Cumulative content: appears once the phase is reached, then stays */}
                <AnimatePresence initial={false}>
                  {revealed && (
                    <motion.ul
                      key={`content-${i}-${revealed}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '10px 0 0 0',
                        color: '#475569',
                        fontSize: 13,
                        lineHeight: 1.45,
                        textAlign: 'left',
                      }}
                    >
                      {STEP_CONTENT[i].slice(0, 3).map((line, k) => (
                        <li key={k} style={{ marginTop: k === 0 ? 0 : 6 }}>• {line}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Example Panel */}
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12, display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                background: 'rgba(17,24,39,0.9)',
                color: '#e5e7eb',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '12px 14px',
                minWidth: 300,
                maxWidth: 740,
                width: '90%',
                boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 13.5,
                lineHeight: 1.5,
                textAlign: 'left',
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {typedText}
                {!typingDone && <span style={{ opacity: 0.8 }}>▋</span>}
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- Lightweight Runtime Tests (opt-in) ---
export function runSanityTests() {
  const results: { name: string; pass: boolean; info?: string }[] = [];
  results.push({ name: 'nextIndex wraps 3->0 for len=4', pass: nextIndex(3, 4) === 0 });
  results.push({ name: 'nextIndex of 0->1', pass: nextIndex(0, 4) === 1 });
  const allHave4 = AGENTS.every((a) => a.tasks.length === STEPS.length);
  results.push({ name: 'each agent has tasks for all steps', pass: allHave4 });
  if (typeof window !== 'undefined') console.table(results);
  return results;
}

export default MultiAgentSlide;
