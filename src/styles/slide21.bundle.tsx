import type * as React from "react";
import { cubicBezier, type Variants } from "framer-motion";

/** Base container style (Slide21) */
export const slide21Container: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px",
  height: "100%",
  background: "#ffffff", // white background
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/** Title & subtitle text styles */
export const titleStyle: React.CSSProperties = {
  fontSize: "5rem",
  fontWeight: "bold",
  marginBottom: "20px",
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const subtitleStyle: React.CSSProperties = {
  fontSize: "2rem",
  fontWeight: 500,
  marginTop: "10px",
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

/** Easing (typed) */
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

/** Motion variants */
export const titleVariants: Variants = {
  initial: { opacity: 0, y: -40 },
  animate: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
};

export const subtitleVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay: 0.3, ease: EASE_OUT },
  },
};
