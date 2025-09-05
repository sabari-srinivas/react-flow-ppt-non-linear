'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { slideContainer } from "../../styles/slideStyles";
import {
  EASE,
  EASE_OUT,
  EASE_INOUT,
  TRANS,
  PHASE_DWELL_MS,
  STEPS,
  pageStyle,
  h2Style,
  subStyle,
  chipsRow,
  arrowStyle,
  chipBase,
  progressWrap,
  progressFill,
  sceneWrap,
  cardsRow,
  cardBase,
  cardGlow,
  cardEmoji,
  cardTitle,
  cardCaption,
  exampleDock,
  examplePanel,
  exampleBadge,
  preStyle,
  caretStyle,
} from "../../styles/slide23.bundle";

/** Step chip */
const StepChip = ({
  label,
  active,
  idx,
}: {
  label: string;
  active: boolean;
  idx: number;
}) => (
  <motion.div
    initial={false}
    animate={{
      background: active
        ? "linear-gradient(90deg,#ff2e63,#ff9f43)"
        : "rgba(255,255,255,0.95)",
      color: active ? "#fff" : "#0f172a",
      scale: active ? 1.05 : 1,
      boxShadow: active
        ? "0 10px 20px rgba(255,46,99,0.25)"
        : "0 6px 14px rgba(0,0,0,0.08)",
    }}
    transition={{ duration: TRANS.chip, ease: EASE }}
    style={chipBase}
    aria-current={active ? "step" : undefined}
  >
    <span style={{ opacity: 0.7 }}>{idx + 1}.</span> {label}
  </motion.div>
);

const Slide23: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const [typedText, setTypedText] = useState<string>("");
  const [typingDone, setTypingDone] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.5 });

  /** ===== Pause/Resume-able phase timer ===== */
  const timerRef = useRef<number | null>(null);
  const phaseStartRef = useRef<number>(0);
  const remainingRef = useRef<number>(PHASE_DWELL_MS);
  const runningRef = useRef<boolean>(false);
  const pausedRef = useRef<boolean>(isPaused);
  const inViewRef = useRef<boolean>(inView);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);
  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const tickRef = useRef<(() => void) | null>(null);
  tickRef.current = () => {
    setActiveIdx((prev) => (prev + 1) % STEPS.length);
    phaseStartRef.current = Date.now();
    remainingRef.current = PHASE_DWELL_MS;

    if (inViewRef.current && !pausedRef.current) {
      clearTimer();
      timerRef.current = window.setTimeout(
        () => tickRef.current && tickRef.current(),
        PHASE_DWELL_MS
      );
      runningRef.current = true;
    } else {
      runningRef.current = false;
      clearTimer();
    }
  };

  useEffect(() => {
    if (!inView || isPaused) {
      if (runningRef.current) {
        const elapsed = Date.now() - phaseStartRef.current;
        remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      }
      clearTimer();
      runningRef.current = false;
      return;
    }

    if (!runningRef.current) {
      const delay = Math.max(0, remainingRef.current);
      phaseStartRef.current = Date.now();
      clearTimer();
      timerRef.current = window.setTimeout(
        () => tickRef.current && tickRef.current(),
        delay
      );
      runningRef.current = true;
    }
    // cleanup handled elsewhere
  }, [inView, isPaused]);

  useEffect(() => () => clearTimer(), []);

  /** ===== Typewriter for example panel ===== */
  useEffect(() => {
    const lines = STEPS[activeIdx].exampleLines;
    const full = lines.join("\n");
    let i = 0;
    setTypedText("");
    setTypingDone(false);
    const id = window.setInterval(() => {
      i++;
      setTypedText(full.slice(0, i));
      if (i >= full.length) {
        window.clearInterval(id);
        setTypingDone(true);
      }
    }, 16);
    return () => window.clearInterval(id);
  }, [activeIdx]);

  const activeStep = STEPS[activeIdx];

  return (
    <div
      style={{ ...slideContainer, ...pageStyle }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Title */}
      <motion.h2
        style={h2Style}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: TRANS.title, ease: EASE_OUT }}
      >
        Single Agent Workflow — Grocery Order Story
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: TRANS.title, ease: EASE_OUT }}
        style={subStyle}
      >
        Follow the assistant as it goes from your <b>request</b>, to{" "}
        <b>planning</b>, to <b>doing</b>, and finally <b>reporting back</b>.
      </motion.p>

      {/* Step chips */}
      <div style={chipsRow}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <StepChip label={s.label} active={activeIdx === i} idx={i} />
            {i < STEPS.length - 1 && <span style={arrowStyle}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Progress bar */}
      <div style={progressWrap} aria-label="Step progress">
        <motion.div
          key={activeIdx}
          initial={{ width: "0%" }}
          animate={{ width: `${((activeIdx + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: TRANS.progress, ease: EASE }}
          style={progressFill}
        />
      </div>

      {/* Scene */}
      <div ref={containerRef} style={sceneWrap}>
        {/* Cards */}
        <div style={cardsRow}>
          {STEPS.map((step, i) => {
            const active = i === activeIdx;
            return (
              <motion.div
                key={step.id}
                initial={false}
                animate={{
                  y: active ? -6 : 0,
                  scale: active ? 1.03 : 1,
                  boxShadow: active
                    ? "0 32px 80px rgba(255,46,99,0.35), 0 10px 24px rgba(0,0,0,0.12)"
                    : "0 8px 18px rgba(0,0,0,0.08)",
                  borderColor: active ? "rgba(255,46,99,0.5)" : "rgba(0,0,0,0.06)",
                }}
                transition={{ duration: TRANS.card, ease: EASE }}
                style={cardBase}
              >
                <motion.div
                  animate={
                    active
                      ? { opacity: [0.4, 0.18, 0.4], scale: [1, 1.05, 1] }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: TRANS.pulse,
                    repeat: active ? Infinity : 0,
                    ease: EASE_INOUT,
                  }}
                  style={cardGlow}
                />
                <div style={cardEmoji}>{step.emoji}</div>
                <div style={cardTitle}>{step.label}</div>
                <div style={cardCaption}>{step.caption}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Example Panel (typed) */}
        <div style={exampleDock}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: TRANS.panel, ease: EASE_OUT }}
              style={examplePanel}
            >
              <div style={exampleBadge}>
                {activeStep.emoji} {activeStep.label}
              </div>
              <pre style={preStyle}>
                {typedText}
                {!typingDone && <span style={caretStyle}>▋</span>}
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Slide23;
