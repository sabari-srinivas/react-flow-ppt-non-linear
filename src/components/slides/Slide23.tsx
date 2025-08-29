import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

type Step = {
  id: number;
  label: string;
  emoji: string;
  caption: string;
  exampleLines: string[]; // typed into the example panel
};

const STEPS: Step[] = [
  {
    id: 1,
    label: 'User Prompt',
    emoji: '👤',
    caption: 'You ask in plain language. No forms. No menus.',
    exampleLines: [
      'You: “Order my weekly groceries for tomorrow morning.”',
      'Notes: Family of 3. Budget ₹2,500.',
      'Items: milk, bread, eggs, tomatoes, spinach, rice.'
    ],
  },
  {
    id: 2,
    label: 'Agent Planning',
    emoji: '🧠',
    caption: 'The assistant selects a store, checks items, compares prices, and plans delivery.',
    exampleLines: [
      'Plan:',
      '• Store: BigBasket (fastest slot available)',
      '• Availability: All items in stock ✅',
      '• Substitutions: Baby spinach → regular spinach (if needed)',
      '• Delivery: Tomorrow 9–10 AM',
      '• Estimated total: ₹2,320'
    ],
  },
  {
    id: 3,
    label: 'Action Execution',
    emoji: '⚡',
    caption: 'It executes the steps: adds items, applies coupon, selects slot, pays.',
    exampleLines: [
      'Actions:',
      '• Add items to cart (quantities auto-calculated for a week)',
      '• Apply coupon “FRESH100” (₹100 off)',
      '• Select slot: Tomorrow 9–10 AM',
      '• Pay with saved UPI',
      '• Order placed successfully ✅'
    ],
  },
  {
    id: 4,
    label: 'Result Returned',
    emoji: '✅',
    caption: 'You receive a concise summary and the confirmation details.',
    exampleLines: [
      'Order Summary:',
      '• Total: ₹2,220 (after coupon)',
      '• ETA: Tomorrow 9–10 AM',
      '• Tracking link: sent to your phone',
      '• Tip: “Say ‘repeat next week’ to automate this.”'
    ],
  },
];

const EASE = [0.2, 0.8, 0.2, 1] as const;

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

const Slide23: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [typedText, setTypedText] = useState<string>(''); // example panel typing
  const [typingDone, setTypingDone] = useState(false);

  // refs & layout measurement
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const robotRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.5 });

  // robot animation controller
  const robotControls = useAnimation();

  // measure card centers for robot travel
  const positions = useMemo(() => ({ centers: [] as number[] }), []);
  const measure = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    positions.centers = [];
    cardsRef.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      positions.centers.push(r.left - cRect.left + r.width / 2);
    });
  }, [positions]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (containerRef.current) ro.observe(containerRef.current);
    cardsRef.current.forEach((el) => el && ro.observe(el));
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  // Typewriter for example panel (hardcoded content)
  useEffect(() => {
    const lines = STEPS[activeIdx].exampleLines;
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
    }, 16); // speed
    return () => clearInterval(id);
  }, [activeIdx]);

  // autoplay loop when in view
  useEffect(() => {
    let cancel = false;

    const run = async () => {
      while (!cancel) {
        if (!inView || isPaused) {
          await new Promise((r) => setTimeout(r, 200));
          continue;
        }
        for (let i = 0; i < STEPS.length; i++) {
          setActiveIdx(i);
          // move robot to card center (shift ~20px to roughly center the emoji width)
          const x = (positions.centers[i] ?? 0) - 20;
          await robotControls.start({ x, transition: { duration: 0.8, ease: EASE } });
          // linger a bit longer on steps where typing happens
          await new Promise((r) => setTimeout(r, 1300));
          if (cancel) return;
          if (!inView || isPaused) break;
        }
      }
    };
    run();
    return () => {
      cancel = true;
      robotControls.stop();
    };
  }, [inView, isPaused, positions, robotControls]);

  const activeStep = STEPS[activeIdx];

  return (
    <div
      style={{
        ...slideContainer,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '32px',
        gap: '22px',
        height: '100%',
        background:
          'radial-gradient(1200px 400px at 10% -10%, #f0f7ff 0%, transparent 60%),radial-gradient(1000px 380px at 120% 110%, #fff9f2 0%, transparent 60%)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Title */}
      <motion.h2
        style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Single Agent Workflow — Grocery Order Story
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ color: '#475569', marginTop: 4, fontSize: 16, maxWidth: 840 }}
      >
        Follow the assistant 🤖 as it goes from your <b>request</b>, to <b>planning</b>, to <b>doing</b>, and finally <b>reporting back</b>.
      </motion.p>

      {/* Step chips */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <StepChip label={s.label} active={activeIdx === i} idx={i} />
            {i < STEPS.length - 1 && <span style={{ color: '#94a3b8', fontSize: 12 }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: 460,
          maxWidth: '90%',
          height: 8,
          borderRadius: 999,
          background: '#e5e7eb',
          overflow: 'hidden',
        }}
        aria-label="Step progress"
      >
        <motion.div
          key={activeIdx}
          initial={{ width: '0%' }}
          animate={{ width: `${((activeIdx + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ height: '100%', background: 'linear-gradient(90deg,#ff2e63,#ff9f43)' }}
        />
      </div>

      {/* Scene */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: 'min(980px, 95vw)',
          minHeight: 260,
          padding: '56px 24px 72px',
          borderRadius: 16,
          background: 'linear-gradient(#f8fafc,#eef2f7)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Cards row (wrap on small screens) */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 16,
            alignItems: 'stretch',
          }}
        >
          {STEPS.map((step, i) => {
            const active = i === activeIdx;
            return (
              <motion.div
                key={step.id}
                ref={(el) => (cardsRef.current[i] = el)}
                initial={false}
                animate={{
                  y: active ? -4 : 0,
                  boxShadow: active
                    ? '0 16px 36px rgba(255,46,99,0.18)'
                    : '0 10px 24px rgba(0,0,0,0.08)',
                  borderColor: active ? 'rgba(255,46,99,0.35)' : 'rgba(0,0,0,0.06)',
                }}
                transition={{ duration: 0.3, ease: EASE }}
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
                {/* subtle active glow ring */}
                <motion.div
                  animate={active ? { opacity: [0.3, 0.12, 0.3], scale: [1, 1.04, 1] } : { opacity: 0 }}
                  transition={{ duration: 1.6, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    inset: -6,
                    borderRadius: 16,
                    background: 'radial-gradient(circle, rgba(255,46,99,0.18), transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ fontSize: 28 }}>{step.emoji}</div>
                <div style={{ fontWeight: 800, marginTop: 6, color: '#0f172a' }}>{step.label}</div>
                <div style={{ fontSize: 13, color: '#334155', marginTop: 6 }}>{step.caption}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Flow arrows (SVG overlay) */}
        <svg
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            left: 12,
            right: 12,
            top: 24,
            height: 80,
            pointerEvents: 'none',
            opacity: 0.95,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M ${100 + i * 280} 60 C ${170 + i * 280} 20, ${230 + i * 280} 100, ${300 + i * 280} 60`}
              fill="none"
              stroke={i < activeIdx ? '#ff9f43' : '#cbd5e1'}
              strokeWidth={3}
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          ))}
        </svg>

        {/* Robot */}
        <motion.div
          ref={robotRef}
          animate={robotControls}
          style={{
            position: 'absolute',
            top: 8,
            left: 0,
            fontSize: 32,
            textShadow: '0 4px 8px rgba(0,0,0,0.15)',
            zIndex: 3,
          }}
          aria-label={`Robot at step: ${activeStep.label}`}
        >
          🤖
        </motion.div>

        {/* Example Panel (typed) */}
        <div
          style={{
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 12,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
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
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 12,
                  fontSize: 11,
                  opacity: 0.7,
                }}
              >
                {activeStep.emoji} {activeStep.label}
              </div>
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

export default Slide23;
