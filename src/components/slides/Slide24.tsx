import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';

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

type Agent = {
  id: number;
  name: string;
  emoji: string;
  tasks: string[]; // Tasks per step, indexed the same as STEPS
};

// Content for the steps in the workflow
const STEPS: Step[] = [
  { id: 1, label: 'Perceive', emoji: '👀' },
  { id: 2, label: 'Plan', emoji: '📝' },
  { id: 3, label: 'Act', emoji: '⚙️' },
  { id: 4, label: 'Report', emoji: '✅' },
];

// Content for the different agents
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
const EMOJI_HALF = 16; // fontSize 32 -> half width ~16px for centering

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
    transition={{ duration: 0.3, ease: EASE }}
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

// Small helper for cyclic index math (also used in tests)
export function nextIndex(current: number, len: number) {
  return (current + 1) % Math.max(1, len);
}

const MultiAgentSlide: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [typingDone, setTypingDone] = useState(false);
  const [isPaused, setPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const inView = useInView(containerRef, { amount: 0.5 });

  const agentControls = AGENTS.map(() => useAnimation());
  const positions = useMemo(() => ({ centers: [] as number[], width: 0 }), []);

  // Measures the center position of each step card for agent animation & arrows
  const measure = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    positions.centers = [];
    positions.width = cRect.width;
    cardsRef.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      positions.centers.push(r.left - cRect.left + r.width / 2);
    });

    // Re-center agents immediately on resize to avoid drift
    if (positions.centers.length) {
      const cx = positions.centers[activeStepIdx] - EMOJI_HALF;
      agentControls.forEach((ctrl) => ctrl.start({ x: cx, transition: { duration: 0 } }));
    }
  }, [positions, activeStepIdx, agentControls]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // Controls the typewriter effect in the bottom panel
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
    }, 12);
    return () => clearInterval(id);
  }, [activeStepIdx, inView]);

  // Ensure agents start centered on the first step once measured
  useEffect(() => {
    if (!inView || positions.centers.length === 0) return;
    const x = positions.centers[activeStepIdx] - EMOJI_HALF;
    agentControls.forEach((ctrl) => ctrl.start({ x, y: 0, scale: 1, transition: { duration: 0 } }));
  }, [inView, positions.centers.length]);

  // Main animation loop for the agents
  useEffect(() => {
    if (!inView) return;

    let step = activeStepIdx;
    const intervalId = setInterval(async () => {
      if (isPaused || positions.centers.length === 0) return;
      step = nextIndex(step, STEPS.length); // cyclic
      setActiveStepIdx(step);

      const targetX = positions.centers[step] - EMOJI_HALF;
      const moveAnimations = AGENTS.map((_, i) =>
        agentControls[i].start({
          x: targetX,
          y: [0, -28, 0], // arc motion
          scale: 1,
          transition: { duration: 0.7, delay: 0.08 + i * 0.08, ease: EASE },
        })
      );
      await Promise.all(moveAnimations);
    }, 2400);

    return () => clearInterval(intervalId);
  }, [inView, isPaused, positions, agentControls, activeStepIdx]);

  // Arrow layer draws dynamic paths from card center -> next card center + wrap-around
  const ArrowLayer: React.FC = () => {
    if (positions.centers.length < 4) return null;
    const yTop = 72;
    const yBottom = 104;

    const forward = positions.centers.slice(0, -1).map((c, i) => {
      const n = positions.centers[i + 1];
      const d = `M ${c} ${yTop} C ${c + (n - c) * 0.25} ${yTop - 40}, ${c + (n - c) * 0.75} ${yTop + 40}, ${n} ${yTop}`;
      return { d, i };
    });

    const last = positions.centers[positions.centers.length - 1];
    const first = positions.centers[0];
    const wrapD = `M ${last} ${yTop} C ${last - (last - first) * 0.15} ${yBottom + 20}, ${first + (last - first) * 0.15} ${yBottom + 20}, ${first} ${yTop}`;

    return (
      <svg
        width="100%"
        height={140}
        viewBox={`0 0 ${positions.width} 140`}
        preserveAspectRatio="none"
        style={{ position: 'absolute', left: 0, right: 0, top: 24, height: 120, pointerEvents: 'none', opacity: 0.95 }}
      >
        <defs>
          <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff2e63" />
            <stop offset="100%" stopColor="#ff9f43" />
          </linearGradient>
        </defs>

        {/* Forward arrows */}
        {forward.map(({ d, i }) => (
          <g key={`f-${i}`}>
            <path d={d} fill="none" stroke="#e2e8f0" strokeWidth={3} strokeDasharray="6 6" />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#arrow-gradient)"
              strokeWidth={3}
              strokeDasharray="6 6"
              initial={false}
              animate={{ pathLength: activeStepIdx > i ? 1 : 0, opacity: activeStepIdx > i ? 1 : 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </g>
        ))}

        {/* Wrap arrow for cyclic transition (Report -> Perceive) */}
        <g key="wrap">
          <path d={wrapD} fill="none" stroke="#e2e8f0" strokeWidth={3} strokeDasharray="6 6" />
          <motion.path
            d={wrapD}
            fill="none"
            stroke="url(#arrow-gradient)"
            strokeWidth={3}
            strokeDasharray="6 6"
            initial={false}
            animate={{ pathLength: activeStepIdx === 0 ? 1 : 0, opacity: activeStepIdx === 0 ? 1 : 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          />
        </g>
      </svg>
    );
  };

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
        Watch {AGENTS[0].emoji}, {AGENTS[1].emoji}, and {AGENTS[2].emoji} collaborate to fulfill an order. Each agent completes its tasks at every step: <b>Perceive → Plan → Act → Report</b>.
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
          minHeight: 280,
          padding: '56px 24px 100px',
          borderRadius: 16,
          background: 'linear-gradient(#f8fafc,#eef2f7)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.id}
              ref={(el) => (cardsRef.current[i] = el)}
              animate={{
                y: activeStepIdx === i ? -6 : 0,
                scale: activeStepIdx === i ? 1.05 : 1,
                boxShadow: activeStepIdx === i ? '0 16px 36px rgba(255,46,99,0.18)' : '0 10px 24px rgba(0,0,0,0.08)',
                borderColor: activeStepIdx === i ? 'rgba(255,46,99,0.35)' : 'rgba(0,0,0,0.06)',
              }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                flex: '1 1 200px', minWidth: 200, maxWidth: 220, borderRadius: 14,
                background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', padding: 14,
                textAlign: 'center', position: 'relative',
              }}
            >
              <div style={{ fontSize: 28 }}>{step.emoji}</div>
              <div style={{ fontWeight: 800, marginTop: 6, color: '#0f172a' }}>{step.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Flow arrows */}
        <ArrowLayer />

        {/* Animating Agents */}
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            animate={agentControls[i]}
            style={{
              position: 'absolute',
              top: 8 + i * 40,
              left: 0,
              fontSize: 32,
              textShadow: '0 4px 8px rgba(0,0,0,0.15)',
              zIndex: 3,
            }}
          >
            {agent.emoji}
          </motion.div>
        ))}

        {/* Example Panel */}
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 12, display: 'flex', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                background: 'rgba(17,24,39,0.9)', color: '#e5e7eb', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '12px 14px', minWidth: 300, maxWidth: 740, width: '90%',
                boxShadow: '0 12px 24px rgba(0,0,0,0.25)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 13.5, lineHeight: 1.5, textAlign: 'left',
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
// These do not run automatically. Call runSanityTests() from your app to see results in console.
export function runSanityTests() {
  const results: { name: string; pass: boolean; info?: string }[] = [];

  // Test: nextIndex cycles correctly
  results.push({ name: 'nextIndex wraps 3->0 for len=4', pass: nextIndex(3, 4) === 0 });
  results.push({ name: 'nextIndex of 0->1', pass: nextIndex(0, 4) === 1 });

  // Test: centers computed from rects
  const containerLeft = 0;
  const cardLeft = 10, cardWidth = 100;
  const center = cardLeft - containerLeft + cardWidth / 2; // 60
  results.push({ name: 'center calc basic', pass: center === 60, info: `got ${center}` });

  // Test: Arrow path string shape
  const sampleC = 100, sampleN = 300, yTop = 72;
  const d = `M ${sampleC} ${yTop} C ${sampleC + (sampleN - sampleC) * 0.25} ${yTop - 40}, ${sampleC + (sampleN - sampleC) * 0.75} ${yTop + 40}, ${sampleN} ${yTop}`;
  results.push({ name: 'arrow path starts with M', pass: d.startsWith('M ') });

  // Test: Agents count equals tasks array lengths
  const allHave4 = AGENTS.every((a) => a.tasks.length === STEPS.length);
  results.push({ name: 'each agent has tasks for all steps', pass: allHave4 });

  // Log to console for quick visibility
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.table(results);
  }

  return results;
}

export default MultiAgentSlide;