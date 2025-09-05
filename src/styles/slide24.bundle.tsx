import type * as React from "react";
import { cubicBezier } from "framer-motion";

/* ===== Easing & Timings ===== */
export const EASE = cubicBezier(0.2, 0.8, 0.2, 1);
export const TRANS = {
  chip: 0.5,
  card: 0.4,
  title: 0.6,
  subtitle: 0.6,
  panel: 0.5,
  pulse: 2.0,
};
export const DWELL_MS = 2400;

/* ===== Data Types ===== */
export type Step = { id: number; label: string; emoji: string };
export type Agent = { id: number; name: string; emoji: string; tasks: string[] };

/* ===== Steps ===== */
export const STEPS: Step[] = [
  { id: 1, label: "Perceive", emoji: "👀" },
  { id: 2, label: "Plan", emoji: "📝" },
  { id: 3, label: "Act", emoji: "⚙️" },
  { id: 4, label: "Report", emoji: "✅" },
];

/* ===== Cumulative content per step ===== */
export const STEP_CONTENT: string[][] = [
  [
    "Read user intent & constraints.",
    "Pull recent orders and preferences.",
    "Detect gaps to clarify if needed.",
  ],
  [
    "Pick store, slot, and coupon strategy.",
    "Sequence tasks across roles.",
    "Estimate time & total cost.",
  ],
  [
    "Prepare items & package carefully.",
    "Schedule pickup and dispatch driver.",
    "Execute payment & confirmations.",
  ],
  [
    "Summarize order, savings, and ETA.",
    "Share tracking link & receipt.",
    "Offer “repeat next week”.",
  ],
];

/* ===== Agents ===== */
export const AGENTS: Agent[] = [
  {
    id: 1,
    name: "Manager",
    emoji: "🧑‍💼",
    tasks: [
      "Check new customer orders.",
      "Assign chef and delivery slot.",
      "Ensure order is packaged correctly.",
      "Send confirmation & tracking to customer.",
    ],
  },
  {
    id: 2,
    name: "Chef",
    emoji: "👨‍🍳",
    tasks: [
      "Receive order details and ingredients.",
      "Plan cooking schedule and prep work.",
      "Cook all dishes according to the order.",
      "Notify manager that the order is ready.",
    ],
  },
  {
    id: 3,
    name: "Driver",
    emoji: "🚗",
    tasks: [
      "Wait for an assigned delivery.",
      "Check the optimal route and timing.",
      "Pick up the correctly packaged food.",
      "Deliver the order to the customer’s door.",
    ],
  },
];

/* ===== Helpers ===== */
export function nextIndex(current: number, len: number) {
  return (current + 1) % Math.max(1, len);
}

/* ===== Styles ===== */
export const pageStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  padding: "32px",
  gap: "24px",
  background: "#ffffff", // white container
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const titleStyle: React.CSSProperties = {
  fontSize: "2.4rem",
  fontWeight: 800,
  color: "#000000",
  margin: 0,
  textAlign: "center",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const subtitleStyle: React.CSSProperties = {
  fontSize: 16,
  maxWidth: 840,
  color: "#000000",
  textAlign: "center",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const chipsRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "center",
};

export const arrowStyle: React.CSSProperties = {
  color: "#000000",
  fontSize: 12,
};

export const chipBase: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 999,
  fontWeight: 800,
  fontSize: 12,
  border: "1px solid rgba(0,0,0,0.06)",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  color: "#000000",
  background: "#ffffff",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const sceneWrap: React.CSSProperties = {
  position: "relative",
  width: "min(980px, 95vw)",
  minHeight: 320,
  padding: "56px 24px 100px",
  borderRadius: 16,
  background: "#ffffff", // white surface
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  border: "1px solid rgba(0,0,0,0.06)",
  overflow: "hidden",
};

export const cardsRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 16,
  flexWrap: "wrap",
};

export const cardBase: React.CSSProperties = {
  flex: "1 1 200px",
  minWidth: 200,
  maxWidth: 220,
  borderRadius: 14,
  background: "#ffffff",
  border: "1px solid rgba(0,0,0,0.06)",
  padding: 14,
  textAlign: "center",
  position: "relative",
  color: "#000000",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const glowPulse: React.CSSProperties = {
  position: "absolute",
  inset: -8,
  borderRadius: 16,
  background: "radial-gradient(circle, rgba(255,46,99,0.22), transparent 70%)",
  pointerEvents: "none",
};

export const cardEmoji: React.CSSProperties = { fontSize: 28 };

export const cardTitle: React.CSSProperties = {
  fontWeight: 800,
  marginTop: 6,
  color: "#000000",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const cardList: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "10px 0 0 0",
  color: "#000000",
  fontSize: 13,
  lineHeight: 1.45,
  textAlign: "left",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const panelDock: React.CSSProperties = {
  position: "absolute",
  left: 16,
  right: 16,
  bottom: 12,
  display: "flex",
  justifyContent: "center",
};

export const panelStyle: React.CSSProperties = {
  background: "rgba(17,24,39,0.9)",
  color: "#e5e7eb",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "12px 14px",
  minWidth: 300,
  maxWidth: 740,
  width: "90%",
  boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", // monospace for code/text panel
  fontSize: 13.5,
  lineHeight: 1.5,
  textAlign: "left",
};

export const preStyle: React.CSSProperties = { margin: 0, whiteSpace: "pre-wrap" };
export const caretStyle: React.CSSProperties = { opacity: 0.8 };
