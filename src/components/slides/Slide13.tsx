import * as React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";
// ✅ 1) Add this import
import { cubicBezier } from "framer-motion";

// Easing
const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9);
const EASE_OUT  = cubicBezier(0.16, 1, 0.3, 1);


// ---- Typewriter helpers ----
const charVariants = {
  hidden: { opacity: 0, y: 2 },
  show: { opacity: 1, y: 0, transition: { duration: 0.04, ease: EASE_SOFT } },
};
const lineVariants = (stagger = 0.035) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, ease: EASE_SOFT } },
});
function TypeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const chars = React.useMemo(() => Array.from(text), [text]);
  return (
    <motion.span
      initial="hidden"
      animate="show"
      variants={lineVariants()}
      transition={{ delay }}
      style={{ whiteSpace: "pre-wrap", display: "inline-block" }}
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
function BlinkingCaret({ color = "#0b5" }: { color?: string }) {
  return (
    <motion.span
      aria-hidden
      style={{ display: "inline-block", width: 10, marginLeft: 4, borderRadius: 1, height: "1.1em", verticalAlign: "text-bottom", background: color, opacity: 0.85 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  );
}

// ---- Autoplay gated by visibility ----
function useAutoplay(steps: number, delayMs = 2200) {
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(false); // gated by inView
  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), delayMs);
    return () => window.clearInterval(id);
  }, [playing, steps, delayMs]);
  const restart = React.useCallback(() => {
    setStep(0);
    setPlaying(true);
  }, []);
  const pause = React.useCallback(() => setPlaying(false), []);
  const play = React.useCallback(() => setPlaying(true), []);
  return { step, setStep, playing, setPlaying, restart, pause, play };
}

// ---- Small UI helpers ----
const Card: React.FC<{
  title: string;
  badge: string;
  bg: string;
  border: string;
  children: React.ReactNode;
  delay?: number;
}> = ({ title, badge, bg, border, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.98 }}
    transition={{ duration: 0.5, ease: EASE_SOFT, delay }}
    style={{
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: 16,
      padding: 16,
      boxShadow: "0 14px 32px rgba(0,0,0,0.10)",
      position: "relative",
      minHeight: 160,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -10,
        left: -10,
        background: "#0ea5e9",
        color: "white",
        fontWeight: 800,
        fontSize: 12,
        padding: "6px 10px",
        borderRadius: 999,
        boxShadow: "0 8px 18px rgba(14,165,233,0.35)",
      }}
    >
      {badge}
    </div>
    <div style={{ fontWeight: 900, color: "#0f172a", marginBottom: 8 }}>{title}</div>
    <div style={{ color: "#334155", lineHeight: 1.55 }}>{children}</div>
  </motion.div>
);

// ---- Prompt bubble (ALWAYS VISIBLE) ----
const PromptBubble: React.FC<{ prompt: string; isTyping: boolean }> = ({ prompt, isTyping }) => {
  return (
    <motion.div
      key="prompt-bubble"
      initial={{ y: -8, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE_SOFT }}
      style={{
        background: "#e0f2fe",
        color: "#075985",
        padding: "14px 18px",
        borderRadius: 14,
        fontSize: "1.1rem",
        marginBottom: 18,
        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        maxWidth: 920,
        width: "fit-content",
      }}
      aria-live="polite"
    >
      {isTyping ? (
        <>
          <TypeLine text={prompt} delay={0.15} />
          <BlinkingCaret />
        </>
      ) : (
        <span>{prompt}</span>
      )}
    </motion.div>
  );
};

// ---- Slide 13: One Prompt → Three Outputs ----
const Slide13: React.FC = () => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.6, margin: "0px 0px -10% 0px" });

  // Phases: 0 Prompt typing → 1 “Thinking” shimmer → 2 Split into 3 outputs → 3 CTA
  const { step, setStep, playing, setPlaying, restart, pause, play } = useAutoplay(4, 2200);

  // Start ONLY when visible; reset/pause when not
  React.useEffect(() => {
    if (inView) {
      restart();
    } else {
      setStep(0);
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const prompt = "“Plan a team event for 60 people next Friday.”";

  return (
    <motion.div
      ref={rootRef}
      key="one-prompt-three-outputs"
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
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => inView && setPlaying(true)}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_SOFT }}
        style={{
          ...titleStyle,
          fontSize: "3rem",
          marginBottom: 10,
          background: "linear-gradient(90deg, #2563eb, #10b981, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        One Prompt → Three Outputs
      </motion.h2>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 18,
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 12,
          padding: "8px 12px",
          boxShadow: "0 10px 22px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ fontWeight: 800, color: "#0f172a" }}>Prompt → Agenda • Poster • Email</div>
        <div style={{ width: 6, height: 6, borderRadius: 999, background: playing ? "#10b981" : "#ef4444", marginLeft: 8 }} />
        <button onClick={() => (playing ? pause() : play())} style={{ border: "none", background: "#f1f5f9", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>
          {playing ? "Pause" : "Play"}
        </button>
        <button onClick={() => restart()} style={{ border: "none", background: "#eef2ff", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}>
          Restart
        </button>
      </div>

      {/* PROMPT: Always visible. Type on step 0; static thereafter */}
      <PromptBubble prompt={prompt} isTyping={step === 0} />

      {/* Stage 1: “Thinking” shimmer */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE_SOFT }}
            style={{
              width: 920,
              maxWidth: "92vw",
              height: 140,
              borderRadius: 16,
              background:
                "linear-gradient(90deg, rgba(226,232,240,0.6) 25%, rgba(203,213,225,0.8) 37%, rgba(226,232,240,0.6) 63%)",
              backgroundSize: "400% 100%",
              border: "1px solid rgba(0,0,0,0.06)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ backgroundPositionX: ["0%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: 0, background: "inherit" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 12,
                left: 12,
                color: "#334155",
                fontWeight: 600,
                background: "rgba(255,255,255,0.75)",
                padding: "6px 10px",
                borderRadius: 8,
              }}
            >
              Thinking… organizing tasks…
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Split into three outputs */}
      <AnimatePresence mode="wait">
        {step === 2 && (
          <motion.div
            key="outputs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: EASE_SOFT }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(220px, 1fr))",
              gap: 16,
              width: 920,
              maxWidth: "92vw",
              alignItems: "stretch",
            }}
          >
            {/* 📋 Agenda */}
            <Card title="Agenda" badge="📋" bg="linear-gradient(180deg,#ffffff, #f8fafc)" border="rgba(0,0,0,0.06)" delay={0.02}>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>3:00 PM — Welcome & icebreakers</li>
                <li>3:30 PM — Team challenge</li>
                <li>4:30 PM — Snacks & awards</li>
                <li>5:00 PM — Wrap-up & photos</li>
              </ul>
            </Card>

            {/* 🎨 Poster (color card) */}
            <Card title="Poster" badge="🎨" bg="linear-gradient(180deg,#0ea5e9 0%, #06b6d4 60%, #fde68a 100%)" border="rgba(14,165,233,0.35)" delay={0.14}>
              <div
                style={{
                  borderRadius: 12,
                  height: 130,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(0,0,0,0.12))",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative sun + mountains (CSS art) */}
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.05 }}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 14,
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    background: "radial-gradient(circle,#fde68a 0%, #f59e0b 70%, rgba(0,0,0,0) 71%)",
                    filter: "blur(0.5px)",
                  }}
                />
                {[0, 1].map((m) => (
                  <motion.div
                    key={m}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, ease: EASE_SOFT, delay: 0.1 + m * 0.05 }}
                    style={{
                      position: "absolute",
                      bottom: -8 + m * 6,
                      left: m * 16,
                      right: 0,
                      height: 80 + m * 18,
                      background: `linear-gradient(180deg, rgba(2,6,23,${0.25 + m * 0.18}) 0%, rgba(2,6,23,${0.55 + m * 0.18}) 100%)`,
                      clipPath: `polygon(0% 100%, ${16 + m * 6}% 60%, ${30 + m * 7}% 42%, ${44 + m * 8}% 70%, 100% 100%)`,
                    }}
                  />
                ))}
                {/* Sweep gloss */}
                <motion.div
                  initial={{ x: "-120%" }}
                  animate={{ x: "120%" }}
                  transition={{ duration: 1.6, ease: "linear", repeat: Infinity, delay: 0.2 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "28%",
                    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)",
                    transform: "skewX(-10deg)",
                  }}
                />
              </div>
              <div style={{ marginTop: 8, fontWeight: 700, color: "#0f172a" }}>“Team Day • Friday 3–5 PM”</div>
            </Card>

            {/* 📧 Email invite */}
            <Card title="Email Invite" badge="📧" bg="linear-gradient(180deg,#ffffff, #f8fafc)" border="rgba(0,0,0,0.06)" delay={0.26}>
              <div style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", background: "#f1f5f9", padding: 10, borderRadius: 10 }}>
                <div style={{ opacity: 0.8 }}>Subject: You’re invited — Team Event (Fri)</div>
                <div style={{ height: 8 }} />
                <div>Hello team,</div>
                <div>Join us this Friday 3–5 PM for games, snacks, and awards.</div>
                <div>Venue: 5F Atrium. RSVP by Wednesday.</div>
                <div style={{ height: 8 }} />
                <div>— Org Committee</div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: CTA / Message */}
      <AnimatePresence mode="wait">
        {step === 3 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE_SOFT }}
            style={{
              marginTop: 10,
              background: "rgba(255,255,255,0.95)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 14,
              padding: "12px 16px",
              boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
              maxWidth: 920,
            }}
          >
            <div style={{ fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>
              One prompt, many outputs — that’s Generative AI’s superpower.
            </div>
            <div style={{ color: "#334155" }}>
              Ask once. Get <strong>agenda</strong>, <strong>poster</strong>, and <strong>email</strong> ready to go — then refine with simple edits.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer hint */}
      <div style={{ marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
        Auto-plays when visible • Hover to pause
      </div>
    </motion.div>
  );
};

export default Slide13;