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
  padding: "40px",
  background: "#ffffff", // white background
  color: "#000000", // black text
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const thankYouTitle: React.CSSProperties = {
  fontSize: "clamp(3rem, 6vw, 5rem)",
  fontWeight: 800,
  color: "#000000", // black title text
  margin: 0,
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const subtitleText: React.CSSProperties = {
  fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
  color: "#000000", // black subtitle
  marginTop: "12px",
  fontFamily:
    "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const EASE = cubicBezier(0.2, 0.65, 0.3, 0.9);
