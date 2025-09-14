// src/styles/slide5.bundle.tsx
import { motion } from "framer-motion";
import type React from "react";

/* =================== Atomics =================== */
export const Neuron = ({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={15}
    fill="#4a90e2"
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
  />
);

export const PulseRing = ({
  x, y, color = "#4a90e2", delay = 0,
}: { x: number; y: number; color?: string; delay?: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={20}
    stroke={color}
    strokeWidth={2}
    fill="transparent"
    initial={{ opacity: 0, scale: 0.75 }}
    animate={{ opacity: [0, 0.6, 0], scale: [0.75, 1.1, 1.25] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay }}
  />
);

export const Connection = ({
  x1, y1, x2, y2, delay = 0,
}: { x1: number; y1: number; x2: number; y2: number; delay?: number }) => (
  <motion.line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#95a5a6"
    strokeWidth={2}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.6, delay }}
  />
);

export const DataDot = ({
  startX, startY, endX, endY, delay = 0,
}: { startX: number; startY: number; endX: number; endY: number; delay?: number }) => (
  <motion.circle
    r={5}
    fill="#f39c12"
    initial={{ cx: startX, cy: startY }}
    animate={{ cx: [startX, endX], cy: [startY, endY] }}
    transition={{ duration: 1.4, delay, repeat: Infinity, ease: "linear", repeatType: "loop" }}
  />
);

export const BackpropDot = ({
  startX, startY, endX, endY, delay = 0,
}: { startX: number; startY: number; endX: number; endY: number; delay?: number }) => (
  <motion.circle
    r={4}
    fill="#e74c3c"
    initial={{ cx: endX, cy: endY }}
    animate={{ cx: [endX, startX], cy: [endY, startY] }}
    transition={{ duration: 1.6, delay, repeat: Infinity, ease: "linear", repeatType: "loop" }}
  />
);

export const HeatPulse = ({
  x, y, base = "#60a5fa", highlight = "#1d4ed8", delay = 0,
}: { x: number; y: number; base?: string; highlight?: string; delay?: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={15}
    style={{ mixBlendMode: "multiply" }}
    initial={{ filter: "brightness(1)", opacity: 0.35 }}
    animate={{
      filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
      opacity: [0.35, 0.9, 0.35],
      fill: [base, highlight, base],
    }}
    transition={{ duration: 1.4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

export const GlowConnection = ({
  x1, y1, x2, y2, delay = 0,
}: { x1: number; y1: number; x2: number; y2: number; delay?: number }) => (
  <>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e74c3c22" strokeWidth={6} strokeLinecap="round" />
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#e74c3c"
      strokeWidth={4}
      strokeLinecap="round"
      strokeDasharray="1 240"
      initial={{ strokeDashoffset: 240, opacity: 0 }}
      animate={{ strokeDashoffset: [240, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, delay, repeat: Infinity, repeatDelay: 0.7, ease: "easeInOut" }}
    />
  </>
);

export const LossMini = ({ x = 360, y = 320 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect x={0} y={0} width={140} height={64} rx={8} ry={8} fill="#f8fafc" stroke="#e2e8f0" />
    <text
      x={10}
      y={16}
      fontSize={16}
      fill="#000000"
      style={{ fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      Loss
    </text>
    <motion.path
      d="M10,48 C35,30 60,40 85,26 S130,18 130,14"
      fill="none"
      stroke="#ef4444"
      strokeWidth={2}
      initial={{ pathLength: 0, opacity: 0.9 }}
      animate={{ pathLength: [0, 1], opacity: [0.9, 0.9] }}
      transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
    />
    <motion.g
      initial={{ opacity: 0.35, y: 0 }}
      animate={{ opacity: [0.35, 0.6, 0.35], y: [0, -2, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx={130} cy={14} r={3} fill="#ef4444" />
    </motion.g>
  </g>
);

/* =================== Variants & Animations =================== */
export const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* =================== Styles =================== */
export const styles = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as const,
    padding: "60px",
    boxSizing: "border-box" as const,
    // Default: LEFT-ALIGNED text
    textAlign: "left" as const,
    background: "white",
    borderRadius: "12px",
    overflow: "hidden" as const,
    position: "relative" as const,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000000",
  },

  /*backdrop: {
    position: "absolute" as const,
    inset: 0,
    background:
      "radial-gradient(1200px 400px at 20% -10%, #eaf6ff 0%, transparent 60%), radial-gradient(1000px 300px at 120% 110%, #fff9f0 0%, transparent 60%)",
  },*/

  // TITLE (centered)
  headerH2: {
    fontSize: "3.5rem",
    color: "#4E83C3",
    marginBottom: 780,
    position: "absolute" as const,
    zIndex: 1,
    textAlign: "center" as const, // keep centered
  },

  headerBar: {
    display: "none",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
    position: "relative" as const,
    zIndex: 1,
    height: "calc(100% - 92px)",
    minHeight: 10,
    marginTop: 100,
  },

  leftPanel: {
    background: "white",
    borderRadius: 12,
    padding: 16,
    border: "2px solid #4E83C3",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "space-between" as const,
    minHeight: 0,
    overflow: "hidden" as const,
  },

  // TITLE (centered)
  leftTitle: {
    color: "#000000",
    fontSize: "1.8rem",
    fontWeight: 500,
    marginBottom: 10,
    textAlign: "center" as const, // keep centered
  },

  // Body text (left-aligned)
  leftPara: { fontSize: "1.25rem", color: "#000000", marginBottom: 10 },
  leftList: { color: "#000000", paddingLeft: 16, lineHeight: 1.45, fontSize: "1.25rem", margin: 0 },

  miniTrainWrap: { marginTop: 10, height: 110, flexShrink: 0 },

  // Legend (left-aligned)
  legendWrap: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    justifyContent: "flex-start", // left
    paddingTop: 6,
  },

  legendDotFwd: { width: 10, height: 10, borderRadius: 5, background: "#f39c12", display: "inline-block" },
  legendDotBwd: { width: 10, height: 10, borderRadius: 5, background: "#e74c3c", display: "inline-block" },
  legendText: { fontSize: 16, color: "#000000" },

  rightPanel: {
    background: "white",
    borderRadius: 12,
    padding: 12,
    border: "2px solid #4E83C3",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    overflow: "hidden" as const,
    minHeight: 0,
    position: "relative" as const,
    fontSize: "1.25rem",
    color: "#000000",
    // SVG content is positioned by coordinates; no textAlign needed here.
  },

  bottomCaption: { fontSize: 11, fill: "#000000" as any },

  headerBarMotion: { width: 180, opacity: 1 },
};

/* =================== Motion snippets =================== */
export const headerIntro = {
  titleInitial: { y: -10, opacity: 0 },
  titleAnimate: { y: 0, opacity: 1 },
  titleTransition: { duration: 0.6 },
  barInitial: { width: 0, opacity: 0 },
  barAnimate: { width: 180, opacity: 1 },
  barTransition: { duration: 0.6, delay: 0.2 },
};

export const miniTrain = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.6 },
};

export const legendIntro = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.9 },
};
