import type * as React from "react";
import { cubicBezier, type Variants } from "framer-motion";

/* ===== Easing ===== */
export const EASE_CB = cubicBezier(0.2, 0.65, 0.3, 0.9);

/* ===== Styles ===== */
export const themeSlideContainer: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "48px 56px",
  boxSizing: "border-box",
  textAlign: "center",
  borderRadius: "12px",
  overflow: "hidden",
  position: "relative",
  background: "#ffffff",              // white container
  color: "#000000",                   // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const titleStyle: React.CSSProperties = {
  textAlign: "center",
  fontWeight: 800,
  letterSpacing: 0.2,
  color: "#000000",                   // black title
  fontSize: "clamp(2.0rem, 4vw, 3.2rem)",
  marginBottom: 24,
};

export const subtitleStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#000000",                   // black subtitle
  marginTop: -4,
  marginBottom: 28,
  fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
};

export const gridStyle: React.CSSProperties = {
  width: "100%",
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
  gap: 20,
};

export const cardStyle: React.CSSProperties = {
  borderRadius: 18,
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
  border: "1px solid rgba(0,0,0,0.06)",
  padding: "18px 18px 16px",
  display: "grid",
  gridTemplateRows: "auto auto auto",
  alignItems: "start",
  gap: 8,
  minHeight: 160,
  height: "100%",
  boxSizing: "border-box",
  color: "#000000",                   // ensure black text inside cards
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/* ===== Variants ===== */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: "beforeChildren" },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE_CB },
  },
};

/* ===== Data ===== */
export type UseCasePattern = {
  emoji: string;
  name: string;
  blurb: string;
  delay: number;
};

export const patterns: UseCasePattern[] = [
  { emoji: "🧠", name: "Reflection & Self-Correction", blurb: "Agents review their actions, identify errors, and refine their approach to improve performance.", delay: 0.15 },
  { emoji: "🔧", name: "Tool Augmentation", blurb: "Agents use external tools like APIs or code interpreters to perform complex, real-world actions.", delay: 0.25 },
  { emoji: "🔀", name: "Task Decomposition", blurb: "A primary agent breaks down a complex goal into smaller sub-tasks for specialized agents to execute.", delay: 0.35 },
  { emoji: "🤝", name: "Human-in-the-Loop", blurb: "Agents collaborate with humans, requesting feedback, clarification, or approval for critical decisions.", delay: 0.45 },
  { emoji: "📚", name: "Memory & Learning", blurb: "Utilizes short and long-term memory to learn from past interactions and build context for future tasks.", delay: 0.55 },
  { emoji: "👥", name: "Multi-Agent Collaboration", blurb: "Specialized agents with different roles (e.g., planner, critic) work together to achieve a common goal.", delay: 0.65 },
  { emoji: "🌐", name: "Environment Interaction", blurb: "Agents perceive and act within digital environments, such as browsing websites or managing systems.", delay: 0.75 },
  { emoji: "🤖", name: "Autonomous Systems", blurb: "Complex, multi-agent systems that collaborate to manage entire workflows or research projects.", delay: 0.85 },
];
