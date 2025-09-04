import { motion, useAnimation, AnimatePresence, useInView, cubicBezier } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { slideContainer } from '../../styles/slideStyles';

// Use a typed easing function instead of number[]
const EASE = cubicBezier(0.2, 0.8, 0.2, 1);

const StepChip = ({ label, active }: { label: string; active: boolean }) => (
  <motion.div
    initial={false}
    animate={{
      background: active ? 'linear-gradient(90deg,#ff2e63,#ff9f43)' : 'rgba(255,255,255,0.9)',
      color: active ? '#fff' : '#0f172a',
      scale: active ? 1.04 : 1,
      boxShadow: active ? '0 10px 20px rgba(255,46,99,0.25)' : '0 4px 12px rgba(0,0,0,0.08)',
    }}
    transition={{ duration: 0.35, ease: EASE }}
    style={{
      padding: '8px 14px',
      borderRadius: 999,
      fontWeight: 700,
      fontSize: 14,
      border: '1px solid rgba(0,0,0,0.06)',
      backdropFilter: 'blur(4px)',
    }}
  >
    {label}
  </motion.div>
);

const StepCard = ({ title, line }: { title: string; line: string }) => (
  <motion.div
    initial={{ y: 12, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -8, opacity: 0 }}
    transition={{ duration: 0.35, ease: EASE }}
    style={{
      background: 'rgba(255,255,255,0.95)',
      border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
      borderRadius: 12,
      padding: '10px 14px',
      minWidth: 240,
      maxWidth: 520,
    }}
  >
    <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{title}</div>
    <div style={{ color: '#334155', fontSize: 14, lineHeight: 1.45 }}>{line}</div>
  </motion.div>
);

const Slide22 = () => {
  const chefControls = useAnimation();
  const ingredientControls = useAnimation();
  const decisionControls = useAnimation();
  const dishControls = useAnimation();
  const potControls = useAnimation();
  const steamControls = useAnimation();
  const glowControls = useAnimation();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [cycleKey, setCycleKey] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.5, margin: '0px', once: false });

  useEffect(() => {
    let cancelled = false;

    const startLoop = async () => {
      while (!cancelled) {
        setCycleKey((k) => k + 1);

        await Promise.all([
          ingredientControls.start({ opacity: 0, x: 0, y: 0, scale: 1, transition: { duration: 0 } }),
          decisionControls.start({ opacity: 0, scale: 0.95, transition: { duration: 0 } }),
          dishControls.start({ opacity: 0, y: 0, transition: { duration: 0 } }),
          potControls.start({ scale: 1, transition: { duration: 0 } }),
          steamControls.start({ opacity: 0, transition: { duration: 0 } }),
          glowControls.start({ opacity: 0, transition: { duration: 0 } }),
          chefControls.start({ x: 0, transition: { duration: 0 } }),
        ]);

        // STEP 1 — PERCEIVE
        setStep(0);
        await ingredientControls.start({
          opacity: 1,
          x: [-60, 0, 0],
          y: [0, -6, 0],
          scale: [0.95, 1.02, 1],
          transition: { duration: 1.1, ease: EASE },
        });
        await chefControls.start({ x: -80, transition: { duration: 0.6, ease: EASE } });
        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) break;

        // STEP 2 — REASON
        setStep(1);
        await decisionControls.start({
          opacity: 1,
          scale: [0.95, 1.05, 1],
          transition: { duration: 0.9, ease: EASE },
        });
        await chefControls.start({ x: 0, transition: { duration: 0.6, ease: EASE } });
        await new Promise((r) => setTimeout(r, 600));
        if (cancelled) break;

        // STEP 3 — ACT
        setStep(2);
        glowControls.start({
          opacity: [0, 1, 0.6, 1],
          transition: { duration: 1.2, ease: 'easeInOut', repeat: 2, repeatType: 'mirror' },
        });
        potControls.start({
          scale: [1, 1.03, 1],
          transition: { duration: 0.6, repeat: 3, repeatType: 'mirror', ease: EASE },
        });
        steamControls.start({
          opacity: [0, 0.9, 0.6, 0.9],
          transition: { duration: 1.4, repeat: 2, repeatType: 'mirror', ease: 'easeInOut' },
        });
        await dishControls.start({
          opacity: 1,
          y: [-10, 0],
          transition: { duration: 0.8, ease: EASE },
        });

        await new Promise((r) => setTimeout(r, 1200));
        if (cancelled) break;
      }
    };

    if (inView) {
      cancelled = false;
      startLoop();
    } else {
      cancelled = true;
      ingredientControls.stop();
      decisionControls.stop();
      dishControls.stop();
      potControls.stop();
      steamControls.stop();
      glowControls.stop();
      chefControls.stop();
      setStep(0);
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const stepCard =
    step === 0
      ? { title: 'Perceive', line: 'Chef notices ingredients: 🥕 🍅 🥦 (inputs from the world).' }
      : step === 1
      ? { title: 'Reason', line: 'Chef plans a recipe: sauté → simmer → season (decides next actions).' }
      : { title: 'Act', line: 'Chef cooks and plates the dish 🍲 (executes the plan).' };

  return (
    <div
      ref={rootRef}
      style={{
        ...slideContainer,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '32px',
        height: '100%',
        gap: '20px',
        background:
          'radial-gradient(1200px 400px at 10% -10%, #f0f7ff 0%, transparent 60%),radial-gradient(1000px 380px at 120% 110%, #fff9f2 0%, transparent 60%)',
      }}
    >
      <motion.h2
        style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', marginBottom: 0 }}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        AI Agent Workflow — A Kitchen Story
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ color: '#475569', marginTop: 6, fontSize: 16 }}
      >
        An AI agent behaves like a chef: it <b>perceives</b> ingredients, <b>reasons</b> a recipe, and <b>acts</b> to serve a dish.
      </motion.p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        <StepChip label="Perceive" active={step === 0} />
        <span style={{ color: '#94a3b8', fontSize: 12 }}>→</span>
        <StepChip label="Reason" active={step === 1} />
        <span style={{ color: '#94a3b8', fontSize: 12 }}>→</span>
        <StepChip label="Act" active={step === 2} />
      </div>

      <div
        style={{
          width: 420,
          maxWidth: '86%',
          height: 8,
          borderRadius: 999,
          background: '#e5e7eb',
          overflow: 'hidden',
          marginTop: 6,
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={step + '-' + cycleKey}
            initial={{ width: '0%' }}
            animate={{ width: step === 0 ? '33%' : step === 1 ? '66%' : '100%' }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg,#ff2e63,#ff9f43)',
            }}
          />
        </AnimatePresence>
      </div>

      <motion.div
        style={{
          position: 'relative',
          width: 760,
          maxWidth: '95%',
          height: 380,
          borderRadius: 16,
          overflow: 'hidden',
          background: 'linear-gradient(#f8fafc, #eef2f7)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
          border: '1px solid rgba(0,0,0,0.06)',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Step explainer card — moved to BOTTOM CENTER to avoid overlap */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <AnimatePresence mode="wait">
            <StepCard key={step + '-' + cycleKey} title={stepCard.title} line={stepCard.line} />
          </AnimatePresence>
        </div>

        {/* Back wall & counter */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(148,163,184,0.08), transparent 40%), repeating-linear-gradient(90deg, rgba(30,41,59,0.05) 0 1px, transparent 1px 64px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 120,
            background: 'linear-gradient(#e2e8f0,#cbd5e1)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
          }}
        />

        {/* Stove & effects */}
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 240,
            height: 28,
            borderRadius: 8,
            background: '#475569',
            boxShadow: 'inset 0 0 12px rgba(0,0,0,0.25)',
          }}
        />
        <motion.div
          animate={glowControls}
          style={{
            position: 'absolute',
            bottom: 120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 170,
            height: 10,
            borderRadius: 999,
            background: 'radial-gradient(closest-side, rgba(255,159,67,0.9), rgba(255,46,99,0.2), transparent)',
            filter: 'blur(6px)',
          }}
        />
        <motion.div
          animate={potControls}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 140,
            transform: 'translateX(-50%)',
            width: 120,
            height: 70,
            borderRadius: 16,
            background: 'linear-gradient(180deg,#64748b,#475569)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.22)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 210,
            transform: 'translateX(-50%)',
            width: 130,
            height: 12,
            borderRadius: 999,
            background: 'linear-gradient(#94a3b8,#64748b)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          }}
        />
        <motion.div
          animate={steamControls}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 220,
            transform: 'translateX(-50%)',
            width: 160,
            height: 140,
            pointerEvents: 'none',
            opacity: 0,
          }}
        >
          <motion.div
            animate={{ y: [-4, -18, -4], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: 20,
              bottom: 0,
              width: 24,
              height: 24,
              borderRadius: 999,
              background: 'radial-gradient(circle, rgba(255,255,255,0.85), transparent 60%)',
              filter: 'blur(1px)',
            }}
          />
          <motion.div
            animate={{ y: [-6, -22, -6], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            style={{
              position: 'absolute',
              left: 68,
              bottom: 0,
              width: 26,
              height: 26,
              borderRadius: 999,
              background: 'radial-gradient(circle, rgba(255,255,255,0.85), transparent 60%)',
              filter: 'blur(1px)',
            }}
          />
          <motion.div
            animate={{ y: [-5, -20, -5], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
            style={{
              position: 'absolute',
              left: 112,
              bottom: 0,
              width: 22,
              height: 22,
              borderRadius: 999,
              background: 'radial-gradient(circle, rgba(255,255,255,0.85), transparent 60%)',
              filter: 'blur(1px)',
            }}
          />
        </motion.div>

        {/* Chef & props */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 34,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 44,
            textShadow: '0 4px 10px rgba(0,0,0,0.25)',
          }}
          animate={chefControls}
        >
          👨‍🍳
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            top: 34,
            left: 24,
            fontSize: 34,
            opacity: 0,
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12))',
          }}
          animate={ingredientControls}
        >
          🥕 🍅 🥦
        </motion.div>

        {/* Decision bubble stays TOP-RIGHT */}
        <motion.div
          style={{
            position: 'absolute',
            top: 40,
            right: 30,
            padding: '10px 14px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.95)',
            color: '#0f172a',
            fontSize: 14,
            boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.06)',
            opacity: 0,
            zIndex: 4,
          }}
          animate={decisionControls}
        >
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Recipe Plan 🧠</div>
          <div style={{ fontSize: 12, color: '#475569' }}>Sauté veggies → simmer → season → plate</div>
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: 150,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 34,
            opacity: 0,
            textShadow: '0 4px 8px rgba(0,0,0,0.12)',
          }}
          animate={dishControls}
        >
          🍲
        </motion.div>

        <svg
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          viewBox="0 0 760 380"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 120 80 C 260 100 500 80 640 100"
            fill="none"
            stroke="#ff2e63"
            strokeWidth="3"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
          />
          <motion.path
            d="M 640 100 C 520 180 420 230 380 260"
            fill="none"
            stroke="#ff9f43"
            strokeWidth="3"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 0.4 }}
          />
        </svg>
      </motion.div>

      <motion.p
        style={{ fontSize: 16, maxWidth: 760, color: '#334155', lineHeight: 1.5, marginTop: 6 }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <b>Perceive:</b> the chef reads the kitchen (inputs) • <b>Reason:</b> plans the recipe (decision) • <b>Act:</b> cooks & serves (action).
      </motion.p>
    </div>
  );
};

export default Slide22;
