// src/styles/slide4.bundle.tsx
import type React from "react";

/* ===================== Types ===================== */
export type Metric = { title: string; sub?: string; color: string };
export type Conn = {
  d: string;
  color: string;
  key: string;
  sx: number;
  sy: number;
  ex: number;
  ey: number;
};

/* ===================== Styles (exact values) ===================== */
export const styles = {
  rootBox: {
    width: "100%",
    height: "100%",
    position: "relative" as const,
    padding: 24,
    boxSizing: "border-box" as const,
    background: "white",
    borderRadius: 12,
    overflow: "hidden" as const,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000000",
  },

  title: {
    position: "absolute" as const,
    top: "4%",
    left: "35%",
    transform: "translateX(-50%)",
    fontSize: "3.8rem",
    fontWeight: 700,
    margin: 0,
    color: "#4E83C3",
    textAlign: "center" as const,
    letterSpacing: "-1px",
    zIndex: 20,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  svgLayer: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 2,
    pointerEvents: "none" as const,
  },

  svgLayerTop: {
    position: "absolute" as const,
    inset: 250,
    zIndex: 10,
    pointerEvents: "none" as const,
  },

  grid: {
    position: "absolute" as const,
    inset: 0,
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    justifyItems: "center",
    padding: "120px 24px 24px",
    gap: 24,
    pointerEvents: "none" as const,
    zIndex: 3,
  },

  // NEW: Wrapper styles for left and right sections
  wrapperLeft: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start" as const,
    justifyContent: "center" as const,
    pointerEvents: "auto" as const,
    padding: "20px 24px",
    borderRadius: 16,
    background: "rgba(96, 165, 250, 0.08)",
    border: "2px solid rgba(96, 165, 250, 0.3)",
    boxShadow: "0 8px 25px rgba(96, 165, 250, 0.15)",
    backdropFilter: "blur(8px)",
  },

  wrapperRight: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-end" as const,
    justifyContent: "center" as const,
    pointerEvents: "auto" as const,
    padding: "20px 24px",
    borderRadius: 16,
    background: "rgba(78, 131, 195, 0.08)",
    border: "2px solid rgba(78, 131, 195, 0.3)",
    boxShadow: "0 8px 25px rgba(78, 131, 195, 0.15)",
    backdropFilter: "blur(8px)",
  },

  wrapperTitle: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: "#000000",
    marginBottom: 16,
    textAlign: "center" as const,
    width: "100%",
  },

  stackLeft: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
    alignItems: "flex-start" as const,
    justifyContent: "center" as const,
    pointerEvents: "auto" as const,
  },

  stackRight: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 16,
    alignItems: "flex-end" as const,
    justifyContent: "center" as const,
    pointerEvents: "auto" as const,
  },

  cardBase: {
    position: "relative" as const,
    borderRadius: 12,
    padding: "16px 20px",
    width: 240,
    minHeight: 80,
    boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
    background: "rgba(255, 255, 255, 0.95)",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    transition: "transform .25s ease, box-shadow .25s ease, border-color .25s ease",
    border: "1px solid rgba(0,0,0,0.06)",
    backdropFilter: "blur(2px)",
    overflow: "hidden" as const,
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  cardLeft: (color: string): React.CSSProperties => ({
    ...styles.cardBase,
    border: `2px solid ${color}`,
    alignItems: "flex-start",
  }),

  cardRight: (color: string): React.CSSProperties => ({
    ...styles.cardBase,
    border: `2px solid ${color}`,
    alignItems: "flex-end",
    textAlign: "right",
  }),

  centerCircle: {
    width: 260,
    height: 260,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 30% 30%, rgba(96,165,250,.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(78,131,195,.18), transparent 45%), #fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "1px solid rgba(0,0,0,0.05)",
    display: "flex",
    position: "relative" as const,
    pointerEvents: "auto" as const,
  },

  half: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },

  divider: {
    width: 1,
    background: "#e2e8f0",
    margin: "20px 0",
  },

  metricTitleLeft: { fontSize: 22, fontWeight: 700 },
  metricTitleRight: { fontSize: 22, fontWeight: 700 },
  metricSubRight: { fontSize: 18, color: "#000000", fontWeight: 400 },
};

/* ===================== Animations (exact values) ===================== */
export const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
  },
};

export const leftItemVariants = {
  hidden: { opacity: 0, x: 0, rotate: 1 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export const rightItemVariants = {
  hidden: { opacity: 0, x:0, rotate: 1 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export const floatAnim = {
  animate: { y: [0, -6, 0] },
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
};

export const pathInitial = { pathLength: 0, opacity: 0 };
export const pathAnimate = { pathLength: 1, opacity: 1 };
export const pathTransition = (i: number) => ({
  duration: 0.9,
  delay: 0.15 + i * 0.1,
  ease: "easeOut" as const,
});

export const titleInitial = { opacity: 0, scale: 0.95 };
export const titleAnimate = { opacity: 1, scale: 1 };
export const titleTransition = { duration: 0.6 };
