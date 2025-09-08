// slide28.bundle.tsx
import { cubicBezier } from "framer-motion";

export const slide28Container: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  // padding: "40px",
  background: "#ffffff", // white background
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const thankYouTitle: React.CSSProperties = {
  fontSize: "clamp(2.8rem, 6vw, 5rem)",
  fontWeight: 700,
  color: "#4e83c3", // black title text
  textAlign: "center",
  margin: "auto",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};



export const EASE = cubicBezier(0.2, 0.65, 0.3, 0.9);
