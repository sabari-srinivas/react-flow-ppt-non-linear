'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  EASE,
  TRANS,
  DWELL_MS,
  STEPS,
  STEP_CONTENT,
  AGENTS,
  nextIndex,
  pageStyle,
  titleStyle,
  subtitleStyle,
  chipsRow,
  arrowStyle,
  chipBase,
  sceneWrap,
  cardsRow,
  cardBase,
  glowPulse,
  cardEmoji,
  cardTitle,
  cardList,
  panelDock,
  panelStyle,
  preStyle,
  caretStyle,
} from "../../styles/slide24.bundle";

/* Step chip */
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

const Slide24: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [isPaused, setPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { amount: 0.5 });

  /* Typewriter panel: current phase task lines across agents */
  useEffect(() => {
    if (!inView) return;
    const lines = AGENTS.map(
      (agent) => `${agent.emoji} ${agent.name}: ${agent.tasks[activeStepIdx]}`
    );
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
    }, 14);
    return () => window.clearInterval(id);
  }, [activeStepIdx, inView]);

  /* Main loop: cycle steps */
  useEffect(() => {
    if (!inView) return;
    let step = activeStepIdx;
    const id = window.setInterval(() => {
      if (isPaused) return;
      step = nextIndex(step, STEPS.length);
      setActiveStepIdx(step);
    }, DWELL_MS);
    return () => window.clearInterval(id);
  }, [inView, isPaused, activeStepIdx]);

  return (
    <div
      style={pageStyle}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.h2
        style={titleStyle}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: TRANS.title }}
      >
        Multi-Agent Workflow - Restaurant Order
      </motion.h2>

      <motion.p
        style={subtitleStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: TRANS.subtitle }}
      >
        Watch 🧑‍💼, 👨‍🍳, and 🚗 collaborate. Each step builds on the last:{" "}
        <b>Perceive → Plan → Act → Report</b>.
      </motion.p>

      {/* Step chips */}
      <div style={chipsRow}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <StepChip label={s.label} active={activeStepIdx === i} idx={i} />
            {i < STEPS.length - 1 && <span style={arrowStyle}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Scene */}
      <div ref={containerRef} style={sceneWrap}>
        <div style={cardsRow}>
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
                    ? "0 32px 80px rgba(255,46,99,0.35), 0 10px 24px rgba(0,0,0,0.12)"
                    : "0 8px 18px rgba(0,0,0,0.08)",
                  borderColor: active
                    ? "rgba(255,46,99,0.5)"
                    : "rgba(0,0,0,0.06)",
                }}
                transition={{ duration: TRANS.card, ease: EASE }}
                style={cardBase}
              >
                {/* Glow pulse overlay */}
                <motion.div
                  animate={
                    active
                      ? { opacity: [0.4, 0.18, 0.4], scale: [1, 1.05, 1] }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: TRANS.pulse,
                    repeat: active ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  style={glowPulse}
                />

                <div style={cardEmoji}>{step.emoji}</div>
                <div style={cardTitle}>{step.label}</div>

                {/* Cumulative content */}
                <AnimatePresence initial={false}>
                  {revealed && (
                    <motion.ul
                      key={`content-${i}-${revealed}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      style={cardList}
                    >
                      {STEP_CONTENT[i].slice(0, 3).map((line, k) => (
                        <li key={k} style={{ marginTop: k === 0 ? 0 : 6 }}>
                          • {line}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Example Panel (typed) */}
        <div style={panelDock}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -6, opacity: 0 }}
              transition={{ duration: TRANS.panel, ease: "easeOut" }}
              style={panelStyle}
            >
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

export function runSanityTests() {
  const results: { name: string; pass: boolean; info?: string }[] = [];
  results.push({
    name: "nextIndex wraps 3->0 for len=4",
    pass: nextIndex(3, 4) === 0,
  });
  results.push({ name: "nextIndex 0->1", pass: nextIndex(0, 4) === 1 });
  const allHave4 = AGENTS.every((a) => a.tasks.length === STEPS.length);
  results.push({ name: "agents cover all steps", pass: allHave4 });
  if (typeof window !== "undefined") console.table(results);
  return results;
}

export default Slide24;
