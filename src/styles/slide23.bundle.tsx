import type * as React from "react";
import { cubicBezier } from "framer-motion";

/** Easings (typed) */
export const EASE = cubicBezier(0.2, 0.8, 0.2, 1);
export const EASE_SOFT = cubicBezier(0.2, 0.65, 0.3, 0.9);
export const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);
export const EASE_INOUT = cubicBezier(0.42, 0, 0.58, 1);

/** Centralized timing */
export const PHASE_DWELL_MS = 3200;
export const TRANS = {
  chip: 0.5,
  title: 0.8,
  progress: 1.2,
  card: 0.5,
  panel: 0.6,
  pulse: 2.4,
};

/** Data */
export type Step = {
  id: number;
  label: string;
  emoji: string;
  caption: string;
  exampleLines: string[];
};

export const STEPS: Step[] = [
  {
    id: 1,
    label: "User Prompt",
    emoji: "👤",
    caption: "You ask in plain language. No forms. No menus.",
    exampleLines: [
      'You: “Order my weekly groceries for tomorrow morning.”',
      "Notes: Family of 3. Budget ₹2,500.",
      "Items: milk, bread, eggs, tomatoes, spinach, rice.",
    ],
  },
  {
    id: 2,
    label: "Agent Planning",
    emoji: "🧠",
    caption:
      "The assistant selects a store, checks items, compares prices, and plans delivery.",
    exampleLines: [
      "Plan:",
      "• Store: BigBasket (fastest slot available)",
      "• Availability: All items in stock ✅",
      "• Substitutions: Baby spinach → regular spinach (if needed)",
      "• Delivery: Tomorrow 9–10 AM",
      "• Estimated total: ₹2,320",
    ],
  },
  {
    id: 3,
    label: "Action Execution",
    emoji: "⚡",
    caption: "It executes the steps: adds items, applies coupon, selects slot, pays.",
    exampleLines: [
      "Actions:",
      "• Add items to cart (quantities auto-calculated for a week)",
      "• Apply coupon “FRESH100” (₹100 off)",
      "• Select slot: Tomorrow 9–10 AM",
      "• Pay with saved UPI",
      "• Order placed successfully ✅",
    ],
  },
  {
    id: 4,
    label: "Result Returned",
    emoji: "✅",
    caption: "You receive a concise summary and the confirmation details.",
    exampleLines: [
      "Order Summary:",
      "• Total: ₹2,220 (after coupon)",
      "• ETA: Tomorrow 9–10 AM",
      "• Tracking link: sent to your phone",
      "• Tip: “Say ‘repeat next week’ to automate this.”",
    ],
  },
];

/** Styles */
export const pageStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "32px",
  gap: "22px",
  height: "100%",
  background: "#ffffff", // white container
  color: "#000000", // black text by default
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const h2Style: React.CSSProperties = {
  fontSize: "2.4rem",
  fontWeight: 800,
  color: "#000000",
  margin: 0,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const subStyle: React.CSSProperties = {
  color: "#000000",
  marginTop: 4,
  fontSize: 16,
  maxWidth: 840,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const chipsRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  marginTop: 4,
  flexWrap: "wrap",
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

export const progressWrap: React.CSSProperties = {
  width: 460,
  maxWidth: "90%",
  height: 8,
  borderRadius: 999,
  background: "#e5e7eb",
  overflow: "hidden",
};
export const progressFill: React.CSSProperties = {
  height: "100%",
  background: "linear-gradient(90deg,#ff2e63,#ff9f43)",
};

export const sceneWrap: React.CSSProperties = {
  position: "relative",
  width: "min(980px, 95vw)",
  minHeight: 260,
  padding: "56px 24px 72px",
  borderRadius: 16,
  background: "#ffffff", // white surface
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  border: "1px solid rgba(0,0,0,0.06)",
  overflow: "hidden",
};

export const cardsRow: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: 16,
  alignItems: "stretch",
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

export const cardGlow: React.CSSProperties = {
  position: "absolute",
  inset: -8,
  borderRadius: 16,
  background:
    "radial-gradient(circle, rgba(255,46,99,0.22), transparent 70%)",
  pointerEvents: "none",
};

export const cardEmoji: React.CSSProperties = {
  fontSize: 28,
};
export const cardTitle: React.CSSProperties = {
  fontWeight: 800,
  marginTop: 6,
  color: "#000000",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};
export const cardCaption: React.CSSProperties = {
  fontSize: 13,
  color: "#000000",
  marginTop: 6,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const exampleDock: React.CSSProperties = {
  position: "absolute",
  left: 16,
  right: 16,
  bottom: 12,
  display: "flex",
  justifyContent: "center",
};

export const examplePanel: React.CSSProperties = {
  background: "rgba(17,24,39,0.9)",
  color: "#e5e7eb",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 12,
  padding: "12px 14px",
  minWidth: 300,
  maxWidth: 740,
  width: "90%",
  boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", // keep monospace for code
  fontSize: 13.5,
  lineHeight: 1.5,
  textAlign: "left",
  position: "relative",
};

export const exampleBadge: React.CSSProperties = {
  position: "absolute",
  top: 8,
  right: 12,
  fontSize: 11,
  opacity: 0.7,
};

export const preStyle: React.CSSProperties = {
  margin: 0,
  whiteSpace: "pre-wrap",
};
export const caretStyle: React.CSSProperties = {
  opacity: 0.8,
};
