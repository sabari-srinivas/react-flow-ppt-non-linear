import type * as React from "react";
import { cubicBezier } from "framer-motion";

/** Typed easings (avoid string easings to satisfy TS) */
export const EASE = cubicBezier(0.2, 0.8, 0.2, 1);
export const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9);
export const EASE_INOUT = cubicBezier(0.42, 0, 0.58, 1);

/** Layout */
export const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "32px",
  height: "100%",
  gap: "20px",
  background: "#ffffff", // white container background
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/** Heading / copy */
export const h2Style: React.CSSProperties = {
  fontSize: "2.8rem",
  fontWeight: 700,
  color: "#4e83c3", // black text
  marginBottom: 0,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};
export const leadStyle: React.CSSProperties = {
  color: "#000000",
  marginTop: 6,
  fontSize: 28,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};
export const footNoteStyle: React.CSSProperties = {
  fontSize: 26,
  maxWidth: 760,
  color: "#000000",
  lineHeight: 1.5,
  marginTop: 6,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/** Step chips row */
export const stepRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginTop: 8,
};
export const stepArrowStyle: React.CSSProperties = {
  color: "#000000",
  fontSize: 12,
};

/** Step chip base */
export const stepChipBase: React.CSSProperties = {
  padding: "8px 14px",
  borderRadius: 999,
  fontWeight: 500,
  fontSize: 18,
  border: "1px solid rgba(0,0,0,0.06)",
  backdropFilter: "blur(4px)",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/** Progress bar */
export const progressTrackStyle: React.CSSProperties = {
  width: 420,
  maxWidth: "86%",
  height: 8,
  borderRadius: 999,
  background: "#e5e7eb",
  overflow: "hidden",
  marginTop: 6,
};
export const progressFillStyle: React.CSSProperties = {
  height: "100%",
  background: "linear-gradient(90deg,#ff2e63,#ff9f43)",
};

/** Scene (kitchen box) */
export const sceneBox: React.CSSProperties = {
  position: "relative",
  width: 760,
  maxWidth: "95%",
  height: 380,
  borderRadius: 16,
  overflow: "hidden",
  background: "#ffffff",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  border: "1px solid rgba(0,0,0,0.06)",
};

/** StepCard positioning (bottom center) */
export const stepCardDock: React.CSSProperties = {
  position: "absolute",
  bottom: 12,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 5,
  pointerEvents: "none",
};

/** StepCard styles */
export const stepCardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
  borderRadius: 12,
  padding: "10px 14px",
  minWidth: 240,
  maxWidth: 520,
};
export const stepCardTitle: React.CSSProperties = {
  fontWeight: 800,
  color: "#000000",
  marginBottom: 4,
};
export const stepCardLine: React.CSSProperties = {
  color: "#000000",
  fontSize: 18,
  lineHeight: 1.45,
};

/** Back wall / counter */
export const backWall: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "#ffffff",
};
export const counter: React.CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  height: 120,
  background: "#f8f9fa",
  borderTop: "1px solid rgba(0,0,0,0.06)",
};

/** Stove / heat / pot / lid */
export const stoveStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 120,
  left: "50%",
  transform: "translateX(-50%)",
  width: 240,
  height: 28,
  borderRadius: 8,
  background: "#475569",
  boxShadow: "inset 0 0 12px rgba(0,0,0,0.25)",
};
export const heatGlow: React.CSSProperties = {
  position: "absolute",
  bottom: 120,
  left: "50%",
  transform: "translateX(-50%)",
  width: 170,
  height: 10,
  borderRadius: 999,
  background:
    "radial-gradient(closest-side, rgba(255,159,67,0.9), rgba(255,46,99,0.2), transparent)",
  filter: "blur(6px)",
};
export const potStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  bottom: 140,
  transform: "translateX(-50%)",
  width: 120,
  height: 70,
  borderRadius: 16,
  background: "linear-gradient(180deg,#64748b,#475569)",
  boxShadow: "0 12px 20px rgba(0,0,0,0.22)",
  border: "1px solid rgba(255,255,255,0.2)",
};
export const lidStyle: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  bottom: 210,
  transform: "translateX(-50%)",
  width: 130,
  height: 12,
  borderRadius: 999,
  background: "#94a3b8",
  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
};

/** Steam area */
export const steamArea: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  bottom: 220,
  transform: "translateX(-50%)",
  width: 160,
  height: 140,
  pointerEvents: "none",
  opacity: 0,
};
export const steamBubbleBase: React.CSSProperties = {
  position: "absolute",
  bottom: 0,
  borderRadius: 999,
  background: "rgba(255,255,255,0.85)",
  filter: "blur(1px)",
};

/** Characters / props */
export const chefStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 34,
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: 44,
  textShadow: "0 4px 10px rgba(0,0,0,0.25)",
};
export const ingredientsStyle: React.CSSProperties = {
  position: "absolute",
  top: 34,
  left: 24,
  fontSize: 34,
  opacity: 0,
  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.12))",
};
export const decisionBubble: React.CSSProperties = {
  position: "absolute",
  top: 40,
  right: 30,
  padding: "10px 14px",
  borderRadius: 12,
  background: "rgba(255,255,255,0.95)",
  color: "#000000",
  fontSize: 16,
  boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
  border: "1px solid rgba(0,0,0,0.06)",
  opacity: 0,
  fontWeight:  100,
  zIndex: 4,
};
export const dishStyle: React.CSSProperties = {
  position: "absolute",
  bottom: 150,
  left: "50%",
  transform: "translateX(-50%)",
  fontSize: 34,
  opacity: 0,
  textShadow: "0 4px 8px rgba(0,0,0,0.12)",
};

/** SVG overlay */
export const svgOverlay: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};
