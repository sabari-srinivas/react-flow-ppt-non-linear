import * as React from "react";
import { motion, AnimatePresence, useInView, cubicBezier } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";
import { S16 } from "../../styles/slide16.bundle";

// Easings
const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9);
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);
const LINEAR = (t: number) => t;

// Stages
const STAGES = ["prompt", "draft", "review", "result"] as const;
type StageKey = typeof STAGES[number];

// Content
const PROMPT_TEXT =
  `“Add up these shopping cart prices and return the total in rupees with two decimals.”`;

const AI_DRAFT_PY = `def sum_prices(prices):
    total = 0
    for p in prices:
        total += p
    return f"₹{total:.2f}"

# Example:
sum_prices([1499, 299, 50])  # "₹1848.00"
`;

const REVIEW_NOTES = [
  "What if values are invalid? (e.g., None, 'N/A')",
  "Use a clearer function name for teammates.",
  "Format with locale-safe currency (₹) reliably."
];

const REFINED_PY = `from typing import Iterable

def format_cart_total(items: Iterable[float | int | str | None]) -> str:
    def valid(n):
        return isinstance(n, (int, float)) and float("-inf") < float(n) < float("inf")

    total = sum(float(n) for n in items if valid(n))
    # en-IN digit grouping look-alike without locale deps
    return "₹ " + f"{total:,.2f}"

# Example:
format_cart_total([1499, 299, 50, "N/A"])  # "₹ 1,848.00"
`;

const SAMPLE_INPUT = `[1499, 299, 50, "N/A"]`;
const SAMPLE_OUTPUT = `₹ 1,848.00`;

// Page visibility
function useDocumentVisible() {
  const [visible, setVisible] = React.useState<boolean>(!document.hidden);
  React.useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return visible;
}

// Autoplay
function useAutoplay(maxStage: number, enabled: boolean, ms = 3400) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setIdx((x) => (x + 1) % maxStage), ms);
    return () => clearInterval(id);
  }, [enabled, maxStage, ms]);
  return { idx, setIdx };
}

// Typing effect
const TypingOnce: React.FC<{ text: string; speed?: number; onDone?: () => void; active: boolean }> = ({
  text,
  speed = 22,
  onDone,
  active,
}) => {
  const [count, setCount] = React.useState(0);
  const doneRef = React.useRef(false);

  React.useEffect(() => {
    if (!active || doneRef.current) return;
    setCount(0);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(id);
          doneRef.current = true;
          onDone?.();
          return c;
        }
        return c + 1;
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active, onDone]);

  const locked = doneRef.current;
  return (
    <span>
      {locked ? text : text.slice(0, count)}
      {!locked && count < text.length ? <span style={{ opacity: 0.6 }}>▌</span> : null}
    </span>
  );
};

// CodeBlock
const CodeBlock: React.FC<{ children: React.ReactNode; accent?: string; ariaLabel?: string; maxHeight?: number }> = ({
  children,
  accent = "#e5e7eb",
  ariaLabel,
  maxHeight = 220,
}) => (
  <div
    aria-label={ariaLabel}
    style={{ ...S16.codeBlock, border: `1px solid ${accent}33`, maxHeight }}
  >
    <div style={S16.codeSheen} />
    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
      <code>{children}</code>
    </pre>
  </div>
);

// Stagger list
const StaggerList: React.FC<{ items: string[]; active: boolean }> = ({ items, active }) => {
  return (
    <div>
      {items.map((txt, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: active ? 1 : 0, y: active ? 0 : 4 }}
          transition={{ duration: 0.25, delay: active ? i * 0.18 : 0 }}
          style={{ color: "#334155", fontSize: 14, marginBottom: 6 }}
        >
          • {txt}
        </motion.div>
      ))}
    </div>
  );
};

const Slide16: React.FC = () => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.6, margin: "0px", once: false });
  const pageVisible = useDocumentVisible();

  const [hoverPaused, setHoverPaused] = React.useState(false);
  const [promptLocked, setPromptLocked] = React.useState(false);
  const [startCycle, setStartCycle] = React.useState(0);

  const autoplayEnabled = inView && pageVisible && !hoverPaused && promptLocked;
  const { idx, setIdx } = useAutoplay(STAGES.length, autoplayEnabled, 3400);
  const stage: StageKey = STAGES[idx];

  const isPrompt = stage === "prompt";
  const isDraft = stage === "draft";
  const isReview = stage === "review";
  const isResult = stage === "result";

  const hasStartedRef = React.useRef(false);
  React.useEffect(() => {
    if (inView && pageVisible && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setIdx(0);
      setPromptLocked(false);
      setStartCycle((k) => k + 1);
    }
    if (!inView) hasStartedRef.current = false;
  }, [inView, pageVisible, setIdx]);

  React.useEffect(() => {
    if (promptLocked && STAGES[idx] === "prompt" && inView && pageVisible && !hoverPaused) {
      const t = setTimeout(() => setIdx(1), 800);
      return () => clearTimeout(t);
    }
  }, [promptLocked, idx, inView, pageVisible, hoverPaused, setIdx]);

  const progressActive = inView && pageVisible && !hoverPaused;

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{ ...slideContainer, ...S16.container }}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      {/* Title */}
      <motion.h2
        initial={false}
        animate={inView ? { y: 0, opacity: 1 } : { y: -16, opacity: 0 }}
        transition={{ duration: 0.7, ease: EASE_SOFT }}
        style={{ ...titleStyle, ...S16.title }}
      >
        AI-Powered Code Generation — A Mini Story (Python)
      </motion.h2>

      {/* Narration bar */}
      <motion.div
        key={stage + String(startCycle)}
        initial={{ y: -6, opacity: 0, scale: 0.98 }}
        animate={{ y: inView ? 0 : -6, opacity: inView ? 1 : 0, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE_SOFT }}
        style={S16.narrBar}
      >
        <div
          style={{
            ...S16.narrDotBase,
            background: isPrompt ? "#3b82f6" : isDraft ? "#a78bfa" : isReview ? "#10b981" : "#f59e0b",
          }}
        />
        <div style={S16.narrTitle}>
          {isPrompt && "1) You describe the task"}
          {isDraft && "2) AI writes a first draft"}
          {isReview && "3) You review & refine"}
          {isResult && "4) You see the result"}
        </div>
        <div style={S16.narrSub}>
          ·{" "}
          {isPrompt
            ? "Plain English → Clear request"
            : isDraft
            ? "Fast starting point"
            : isReview
            ? "Human judgment + clarity"
            : "Confidence before shipping"}
        </div>

        <div aria-hidden style={S16.narrProgressTrack}>
          <motion.div
            key={`progress-${stage}-${progressActive}`}
            initial={{ width: "0%" }}
            animate={{ width: progressActive ? "100%" : "0%" }}
            transition={{ duration: 2.4, ease: EASE_SOFT }}
            style={{
              height: "100%",
              background: isPrompt
                ? "linear-gradient(90deg, #3b82f6, #60a5fa)"
                : isDraft
                ? "linear-gradient(90deg, #a78bfa, #60a5fa)"
                : isReview
                ? "linear-gradient(90deg, #10b981, #34d399)"
                : "linear-gradient(90deg, #f59e0b, #fbbf24)",
            }}
          />
        </div>

        <div style={S16.narrRightStatus}>
          {inView && pageVisible
            ? hoverPaused
              ? "Paused (hover)"
              : promptLocked
              ? "Auto-plays"
              : "Typing prompt…"
            : "Paused (off-screen)"}
        </div>
      </motion.div>

      {/* Panels */}
      <div style={S16.panelsGrid}>
        {/* Panel A */}
        <motion.div
          initial={false}
          animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_SOFT }}
          style={{ ...S16.panelBase, gap: 10 }}
        >
          <div style={S16.panelHeading}>Your Prompt</div>

          <div style={S16.promptBubble}>
            <TypingOnce
              key={startCycle}
              text={PROMPT_TEXT}
              onDone={() => setPromptLocked(true)}
              active={inView && pageVisible}
            />
          </div>

          <div
            style={{
              ...S16.stepHint,
              color: isPrompt ? "#0ea5e9" : "#64748b",
            }}
          >
            What this step does: You describe the goal in plain English.
          </div>
        </motion.div>

        {/* Panel B */}
        <motion.div
          initial={false}
          animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_SOFT }}
          style={{ ...S16.panelBase, minHeight: 280 }}
        >
          <motion.div
            aria-hidden
            initial={false}
            animate={{
              x:
                isDraft && inView && pageVisible && !hoverPaused
                  ? ["-120%", "120%"]
                  : "-120%",
            }}
            transition={{
              duration: 2.1,
              repeat:
                isDraft && inView && pageVisible && !hoverPaused ? Infinity : 0,
              ease: LINEAR,
            }}
            style={S16.scanBar}
          />
          <motion.div
            aria-hidden
            animate={{
              boxShadow:
                isDraft && inView && pageVisible && !hoverPaused
                  ? "0 0 0 0 rgba(99,102,241,0.0), 0 0 36px 2px rgba(99,102,241,0.25)"
                  : "0 0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.6 }}
            style={S16.aiGlow}
          />

          <div style={S16.panelHeading}>AI Draft (Python)</div>

          <AnimatePresence mode="wait">
            {(isDraft || isReview || isResult) && (
              <motion.div
                key={"ai-draft-code-" + startCycle}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_SOFT }}
              >
                <CodeBlock ariaLabel="AI draft code" accent="#6366f1" maxHeight={260}>
                  {AI_DRAFT_PY}
                </CodeBlock>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            style={{
              ...S16.stepHint,
              color: isDraft ? "#7c3aed" : "#64748b",
            }}
          >
            What this step does: AI proposes a fast first version.
          </div>
        </motion.div>

        {/* Panel C */}
        <motion.div
          initial={false}
          animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE_SOFT }}
          style={S16.panelBase}
        >
          <div style={S16.panelHeading}>Refined Code (Python)</div>

          <AnimatePresence mode="wait">
            {(isReview || isResult) && (
              <motion.div
                key={"refined-code-" + startCycle}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_SOFT }}
              >
                <CodeBlock ariaLabel="Refined code" accent="#10b981" maxHeight={260}>
                  {REFINED_PY}
                </CodeBlock>
              </motion.div>
            )}
          </AnimatePresence>

          <StaggerList items={REVIEW_NOTES} active={isReview || isResult} />

          <div style={S16.ioGrid}>
            <div style={S16.sampleBox}>
              <div style={S16.sampleTitle}>Sample Input</div>
              <CodeBlock ariaLabel="Sample input" accent="#94a3b8" maxHeight={132}>
                {SAMPLE_INPUT}
              </CodeBlock>
            </div>

            <div style={S16.outputBox}>
              <div style={S16.sampleTitle}>Output</div>
              <AnimatePresence mode="wait">
                {isResult ? (
                  <motion.div
                    key={"final-output-" + startCycle}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE_SOFT }}
                    style={S16.outputFinal}
                    title={SAMPLE_OUTPUT}
                  >
                    {SAMPLE_OUTPUT}
                  </motion.div>
                ) : (
                  <motion.div
                    key={"placeholder-output-" + startCycle}
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0.6 }}
                    style={S16.outputPlaceholder}
                  >
                    (will appear here)
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div
            style={{
              ...S16.stepHint,
              color: isResult ? "#d97706" : isReview ? "#0ea5e9" : "#64748b",
            }}
          >
            {isReview
              ? "What this step does: You refine names, add checks, and make it robust."
              : isResult
              ? "What this step does: You verify the output and ship with confidence."
              : "What this step does: (awaiting next stage…)"}
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div style={S16.controlsRow}>
        <button
          onClick={() => setIdx((p) => (p - 1 + STAGES.length) % STAGES.length)}
          style={S16.btn}
        >
          ◀ Prev
        </button>
        <button
          onClick={() => setIdx((p) => (p + 1) % STAGES.length)}
          style={S16.btn}
        >
          Next ▶
        </button>
        <div style={S16.controlsHint}>
          {inView && pageVisible
            ? hoverPaused
              ? "(Paused · Hover)"
              : promptLocked
              ? "(Auto-plays)"
              : "(Typing prompt…)"
            : "(Paused · Off-screen)"}
        </div>
      </div>
    </motion.div>
  );
};

export default Slide16;
