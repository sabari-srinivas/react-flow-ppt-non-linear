import * as React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";

/** Easings */
const EASE_SOFT: number[] = [0.2, 0.65, 0.3, 0.9];
const EASE_OUT: number[] = [0.16, 1, 0.3, 1];

/** Stages */
const STAGES = ["prompt", "draft", "review", "result"] as const;
type StageKey = typeof STAGES[number];

/** Content (Python) */
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

/** Page visibility */
function useDocumentVisible() {
  const [visible, setVisible] = React.useState<boolean>(!document.hidden);
  React.useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return visible;
}

/** Autoplay (runs only when enabled=true) */
function useAutoplay(maxStage: number, enabled: boolean, ms = 3400) {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setIdx((x) => (x + 1) % maxStage), ms);
    return () => clearInterval(id);
  }, [enabled, maxStage, ms]);
  return { idx, setIdx };
}

/** Typing effect once, then locks */
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
      {(locked ? text : text.slice(0, count))}
      {!locked && count < text.length ? <span style={{ opacity: 0.6 }}>▌</span> : null}
    </span>
  );
};

const CodeBlock: React.FC<{ children: React.ReactNode; accent?: string; ariaLabel?: string; maxHeight?: number }> = ({
  children,
  accent = "#e5e7eb",
  ariaLabel,
  maxHeight = 220,
}) => (
  <div
    aria-label={ariaLabel}
    style={{
      background: "#0b1220",
      color: "#e5e7eb",
      borderRadius: 14,
      padding: "14px 16px",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 14,
      lineHeight: 1.55,
      boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
      border: `1px solid ${accent}33`,
      position: "relative",
      overflow: "auto",
      maxHeight, // keeps content inside slide
      width: "100%",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(0deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
        pointerEvents: "none",
      }}
    />
    <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
      <code>{children}</code>
    </pre>
  </div>
);

/** Reveal list items one-by-one */
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
  const inView = useInView(rootRef, { amount: 0.6, margin: "0px" }); // start when ≥60% on screen
  const pageVisible = useDocumentVisible();

  // Hover to pause
  const [hoverPaused, setHoverPaused] = React.useState(false);

  // Prompt lock after typing
  const [promptLocked, setPromptLocked] = React.useState(false);

  // Autoplay runs only when slide is visible, tab visible, not hover-paused, AND prompt has finished typing
  const autoplayEnabled = inView && pageVisible && !hoverPaused && promptLocked;

  const { idx, setIdx } = useAutoplay(STAGES.length, autoplayEnabled, 3400);
  const stage: StageKey = STAGES[idx];

  const isPrompt = stage === "prompt";
  const isDraft = stage === "draft";
  const isReview = stage === "review";
  const isResult = stage === "result";

  // Start/reset when slide becomes visible; allow replay on re-entry
  const hasStartedRef = React.useRef(false);
  React.useEffect(() => {
    if (inView && pageVisible && !hasStartedRef.current) {
      hasStartedRef.current = true;
      setIdx(0);           // begin at "prompt"
      setPromptLocked(false);
    }
    if (!inView) {
      hasStartedRef.current = false; // allow restart on re-entry
    }
  }, [inView, pageVisible, setIdx]);

  // After prompt finishes typing, auto-advance to Draft (even before interval)
  React.useEffect(() => {
    if (promptLocked && STAGES[idx] === "prompt" && inView && pageVisible && !hoverPaused) {
      const t = setTimeout(() => setIdx(1), 800);
      return () => clearTimeout(t);
    }
  }, [promptLocked, idx, inView, pageVisible, hoverPaused, setIdx]);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{
        ...slideContainer,
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        padding: "36px 56px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_SOFT }}
        style={{
          ...titleStyle,
          fontSize: "3.2rem",
          marginBottom: 10,
          background:
            "linear-gradient(90deg, #6366f1, #3b82f6, #10b981, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        AI-Powered Code Generation — A Mini Story (Python)
      </motion.h2>

      {/* Narration bar */}
      <motion.div
        key={stage}
        initial={{ y: -6, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE_SOFT }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "rgba(255,255,255,0.98)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 14,
          padding: "10px 14px",
          boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
          marginBottom: 12,
          maxWidth: 980,
          width: "100%",
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: isPrompt
              ? "#3b82f6"
              : isDraft
              ? "#a78bfa"
              : isReview
              ? "#10b981"
              : "#f59e0b",
            boxShadow: "0 0 0 4px rgba(99,102,241,0.18)",
          }}
        />
        <div style={{ fontWeight: 900, color: "#0f172a" }}>
          {isPrompt && "1) You describe the task"}
          {isDraft && "2) AI writes a first draft"}
          {isReview && "3) You review & refine"}
          {isResult && "4) You see the result"}
        </div>
        <div style={{ color: "#475569" }}>
          ·{" "}
          {isPrompt
            ? "Plain English → Clear request"
            : isDraft
            ? "Fast starting point"
            : isReview
            ? "Human judgment + clarity"
            : "Confidence before shipping"}
        </div>
        <div
          aria-hidden
          style={{
            height: 6,
            flex: 1,
            background: "#e5e7eb",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <motion.div
            key={`progress-${stage}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
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
        <div style={{ fontSize: 12, color: "#64748b" }}>
          {inView && pageVisible
            ? hoverPaused
              ? "Paused (hover)"
              : promptLocked
              ? "Auto-plays"
              : "Typing prompt…"
            : "Paused (off-screen)"}
        </div>
      </motion.div>

      {/* Three panels */}
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          alignItems: "stretch",
        }}
      >
        {/* Panel A: Prompt (always visible and stays) */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: EASE_SOFT }}
          style={{
            background: "white",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            position: "relative",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <div style={{ fontWeight: 800, color: "#0f172a" }}>Your Prompt</div>

          <div
            style={{
              background: "#e0f2fe",
              color: "#075985",
              padding: "12px 14px",
              borderRadius: 12,
              fontSize: "1.05rem",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <TypingOnce
              text={PROMPT_TEXT}
              onDone={() => setPromptLocked(true)}
              active={inView && pageVisible} // type only when slide is visible
            />
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              color: isPrompt ? "#0ea5e9" : "#64748b",
            }}
          >
            What this step does: You describe the goal in plain English.
          </div>
        </motion.div>

        {/* Panel B: AI Draft + AI feel */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE_SOFT }}
          style={{
            background: "white",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minHeight: 260,
            position: "relative",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* AI scanning bar (subtle) */}
          <motion.div
            aria-hidden
            initial={false}
            animate={{
              x: isDraft && inView && pageVisible && !hoverPaused ? ["-120%", "120%"] : "-120%",
            }}
            transition={{
              duration: 2.1,
              repeat: isDraft && inView && pageVisible && !hoverPaused ? Infinity : 0,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "35%",
              background:
                "linear-gradient(90deg, rgba(99,102,241,0.0) 0%, rgba(99,102,241,0.12) 45%, rgba(99,102,241,0.0) 100%)",
              pointerEvents: "none",
            }}
          />
          {/* AI glow when drafting */}
          <motion.div
            aria-hidden
            animate={{
              boxShadow:
                isDraft && inView && pageVisible && !hoverPaused
                  ? "0 0 0 0 rgba(99,102,241,0.0), 0 0 36px 2px rgba(99,102,241,0.25)"
                  : "0 0 0 0 rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.6 }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              pointerEvents: "none",
            }}
          />

          <div style={{ fontWeight: 800, color: "#0f172a" }}>AI Draft (Python)</div>

          <AnimatePresence mode="wait">
            {(isDraft || isReview || isResult) && (
              <motion.div
                key="ai-draft-code"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_SOFT }}
              >
                <CodeBlock ariaLabel="AI draft code" accent="#6366f1" maxHeight={240}>
                  {AI_DRAFT_PY}
                </CodeBlock>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            style={{
              marginTop: 4,
              fontSize: 12,
              color: isDraft ? "#7c3aed" : "#64748b",
            }}
          >
            What this step does: AI proposes a fast first version.
          </div>
        </motion.div>

        {/* Panel C: Refined code & output */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: EASE_SOFT }}
          style={{
            background: "white",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
            border: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            minWidth: 0,
          }}
        >
          <div style={{ fontWeight: 800, color: "#0f172a" }}>Refined Code (Python)</div>

          <AnimatePresence mode="wait">
            {(isReview || isResult) && (
              <motion.div
                key="refined-code"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_SOFT }}
              >
                <CodeBlock ariaLabel="Refined code" accent="#10b981" maxHeight={240}>
                  {REFINED_PY}
                </CodeBlock>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Human review bullets appear during review/result */}
          <StaggerList items={REVIEW_NOTES} active={isReview || isResult} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, minWidth: 0 }}>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                padding: 10,
                fontSize: 13,
                color: "#0f172a",
                minWidth: 0,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Sample Input</div>
              <CodeBlock ariaLabel="Sample input" accent="#94a3b8" maxHeight={120}>
                {SAMPLE_INPUT}
              </CodeBlock>
            </div>

            <div
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: 10,
                padding: 10,
                fontSize: 13,
                color: "#0f172a",
                minWidth: 0,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Output</div>
              <AnimatePresence mode="wait">
                {isResult ? (
                  <motion.div
                    key="final-output"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease: EASE_SOFT }}
                    style={{
                      background: "#0b1220",
                      color: "#fef3c7",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
                      border: "1px solid #f59e0b33",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap", // keep it tidy inside panel
                    }}
                    title={SAMPLE_OUTPUT}
                  >
                    {SAMPLE_OUTPUT}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder-output"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0.6 }}
                    style={{
                      background: "#0b1220",
                      color: "#94a3b8",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      border: "1px dashed #64748b66",
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    (will appear here)
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 12,
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

      {/* Controls (optional manual nav) */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 12,
        }}
      >
        <button
          onClick={() => setIdx((p) => (p - 1 + STAGES.length) % STAGES.length)}
          style={{
            border: "1px solid #e5e7eb",
            background: "white",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          ◀ Prev
        </button>
        <button
          onClick={() => setIdx((p) => (p + 1) % STAGES.length)}
          style={{
            border: "1px solid #e5e7eb",
            background: "white",
            borderRadius: 8,
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          Next ▶
        </button>
        <div style={{ marginLeft: 6, fontSize: 12, color: "#64748b" }}>
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
