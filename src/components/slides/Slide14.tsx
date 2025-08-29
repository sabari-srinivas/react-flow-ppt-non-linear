import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";

// Gentle easings
const EASE_SOFT: number[] = [0.2, 0.65, 0.3, 0.9];
const EASE_OUT: number[] = [0.16, 1, 0.3, 1];

// Story beats (unchanged except the final beat shows typed poem)
type Beat = {
  id: number;
  step: number;
  title: string;
  role: string;
  emoji: string;
  color: string;
  blurb: string;
  detail?: string;
};

const BEATS: Beat[] = [
  { id: 0, step: 1, title: "Your Request", role: "You speak", emoji: "🗣️", color: "#38bdf8", blurb: "You ask for a short poem about the ocean.", detail: "Plain English in, no special commands needed." },
  { id: 1, step: 2, title: "Break It Down", role: "Librarian", emoji: "📚", color: "#22c55e", blurb: "The request is split into small, tidy pieces.", detail: "Like making index cards for each word and idea." },
  { id: 2, step: 3, title: "Find the Meaning", role: "Translator", emoji: "🧩", color: "#a78bfa", blurb: "Those pieces become meanings the AI can compare.", detail: "Similar ideas sit closer together on a ‘map’." },
  { id: 3, step: 4, title: "Focus on What Matters", role: "Think Tank", emoji: "🧠", color: "#f59e0b", blurb: "The AI pays extra attention to the important parts.", detail: "Words like “poem” and “ocean” guide the result." },
  { id: 4, step: 5, title: "Write the Draft", role: "Poet", emoji: "📝", color: "#ef4444", blurb: "The model writes, one word at a time, checking the flow.", detail: "Awkward words get replaced by smoother ones." },
  { id: 5, step: 6, title: "Your Result", role: "Back to You", emoji: "✨", color: "#10b981", blurb: "You receive a neat little ocean poem.", detail: "Short, clear, and based on your request." },
];

// --- Typewriter components ---
const charVariants = {
  hidden: { opacity: 0, y: 2 },
  show: { opacity: 1, y: 0, transition: { duration: 0.04, ease: EASE_SOFT } },
};

const lineVariants = (stagger = 0.035) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, ease: EASE_SOFT },
  },
});

function TypeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  // Split text into visible characters (preserve spaces)
  const chars = React.useMemo(() => Array.from(text), [text]);
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={lineVariants()}
      style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
      transition={{ delay }}
      aria-label={text}
    >
      {chars.map((c, i) => (
        <motion.span key={i} variants={charVariants} style={{ display: "inline-block" }}>
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
}

function BlinkingCaret({ color = "#92400e" }: { color?: string }) {
  return (
    <motion.span
      aria-hidden
      style={{ display: "inline-block", width: 10, marginLeft: 4, borderRadius: 1, height: "1.1em", verticalAlign: "text-bottom", background: color, opacity: 0.85 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  );
}

// autoplay helper (hover to pause)
function useAutoplay(length: number, delayMs = 2500) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delayMs);
    return () => clearInterval(id);
  }, [paused, length, delayMs]);
  return { index, setIndex, paused, setPaused };
}

const Slide14: React.FC = () => {
  const { index, setIndex, paused, setPaused } = useAutoplay(BEATS.length, 2500);
  const active = BEATS[index];
  const poem = "“The ocean whispers in gentle waves…”";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{
        ...slideContainer,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        padding: "36px 56px",
        overflow: "hidden",
        position: "relative",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_SOFT }}
        style={{
          ...titleStyle,
          fontSize: "3rem",
          marginBottom: 14,
          background: "linear-gradient(90deg, #2563eb, #10b981, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        How Generative AI Processes a Prompt
      </motion.h2>

      {/* Prompt bubble */}
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_SOFT }}
        style={{
          background: "#e0f2fe",
          color: "#075985",
          padding: "12px 16px",
          borderRadius: 12,
          fontSize: "1.05rem",
          marginBottom: 16,
          boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
        }}
      >
        “Write a short poem about the ocean”
      </motion.div>

      {/* Compact narrator (auto-advances) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`narr-${active.id}`}
          initial={{ y: -6, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -6, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_SOFT }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "rgba(255,255,255,0.95)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 14,
            padding: "10px 14px",
            boxShadow: "0 10px 22px rgba(0,0,0,0.10)",
            marginBottom: 10,
            maxWidth: 900,
          }}
        >
          <div style={{ fontSize: 20 }}>{active.emoji}</div>
          <div style={{ fontWeight: 800, color: "#0f172a" }}>
            Step {active.step}: {active.title}{" "}
            <span style={{ fontWeight: 700, color: active.color }}>· {active.role}</span>
          </div>
          <div aria-hidden style={{ height: 6, flex: 1, background: "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
            <motion.div
              key={`progress-${active.id}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: EASE_SOFT }}
              style={{ height: "100%", background: `linear-gradient(90deg, ${active.color}, #60a5fa)` }}
            />
          </div>
          <button
            onClick={() => setIndex(0)}
            title="Restart"
            style={{ border: "none", background: "transparent", color: "#64748b", cursor: "pointer", fontSize: 12, padding: "6px 8px" }}
          >
            Restart
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Numbered pipeline */}
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 14,
          alignItems: "stretch",
          margin: "8px 0 12px",
        }}
      >
        {BEATS.map((b, i) => {
          const isActive = i === index;
          return (
            <motion.div
              key={b.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.03, duration: 0.45, ease: EASE_SOFT }}
              style={{
                background: isActive ? "white" : "rgba(255,255,255,0.9)",
                border: `2px solid ${isActive ? b.color : "rgba(0,0,0,0.06)"}`,
                boxShadow: isActive ? "0 12px 28px rgba(0,0,0,0.14)" : "0 6px 16px rgba(0,0,0,0.08)",
                borderRadius: 14,
                padding: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 130,
                position: "relative",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="active-halo"
                  style={{ position: "absolute", inset: -2, borderRadius: 12, boxShadow: `0 0 0 3px ${b.color}22` }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  left: -10,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  background: b.color,
                  color: "white",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
                }}
              >
                {b.step}
              </div>
              <div style={{ fontSize: 28, marginTop: 6 }}>{b.emoji}</div>
              <div style={{ fontWeight: 800, color: "#0f172a", textAlign: "center" as const, marginTop: 4 }}>{b.title}</div>
              <div style={{ fontSize: 12, color: "#475569", textAlign: "center" as const }}>{b.role}</div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ marginBottom: 10, fontSize: 13, color: "#64748b" }}>
        The request moves left → right, one simple step at a time
      </div>

      {/* Token lane */}
      <div
        aria-hidden
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          height: 26,
          marginBottom: 18,
          overflow: "hidden",
          borderRadius: 999,
          background: "linear-gradient(90deg, #e5e7eb, #f1f5f9)",
          boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        {[...Array(16)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ x: -80 - i * 30 }}
            animate={{ x: 1150 }}
            transition={{ duration: 5.2, delay: (i % 8) * 0.25, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              top: 4 + ((i * 6) % 14),
              left: 0,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: i % 4 === 0 ? "#38bdf8" : i % 4 === 1 ? "#a78bfa" : i % 4 === 2 ? "#f59e0b" : "#10b981",
              boxShadow: "0 0 0 2px rgba(255,255,255,0.85)",
            }}
          />
        ))}
      </div>

      {/* Story card with typewriter on final step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`story-${active.id}`}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_SOFT }}
          style={{
            background: "rgba(255,255,255,0.98)",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 16,
            padding: "16px 18px",
            boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
            maxWidth: 900,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                background: `${active.color}22`,
                border: `1px solid ${active.color}55`,
                fontSize: 18,
              }}
            >
              {active.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>{active.blurb}</div>
              {active.detail && (
                <div style={{ color: "#334155", fontSize: 14, lineHeight: 1.55 }}>{active.detail}</div>
              )}

              {/* Typed reveal when final beat is active */}
              {active.id === 5 && (
                <motion.div
                  key={`poem-${active.id}-${index}`} // re-run typing whenever we hit this step again
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  style={{
                    marginTop: 10,
                    background: "#fef3c7",
                    padding: "12px 16px",
                    borderRadius: 10,
                    color: "#92400e",
                    fontSize: "1.05rem",
                    fontStyle: "italic",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <TypeLine text={poem} delay={0.2} />
                  <BlinkingCaret />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div style={{ marginTop: 10, fontSize: 12, color: "#94a3b8" }}>Auto-plays · Hover to pause</div>
    </motion.div>
  );
};

export default Slide14;
