// src/styles/slide17.bundle.ts
import type { CSSProperties } from "react";

export const S17 = {
  container: {
    background: "#ffffff", // white container
    color: "#000000", // default text color black
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  } as CSSProperties,

  title: {
    fontSize: "3rem",
    marginBottom: 28,
    color: "#000000", // black (replaces gradient text)
    textAlign: "center",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  row: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 20,
    boxSizing: "border-box",
  } as CSSProperties,

  cardBase: {
    flex: "1 1 420px",
    minWidth: 320,
    maxWidth: 560,
    background: "#ffffff",
    borderRadius: 20,
    padding: 20,
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  cardTitleBlue: {
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "#2563eb",
    marginBottom: 12,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  cardTitleGreen: {
    fontSize: "1.35rem",
    fontWeight: 700,
    color: "#059669",
    marginBottom: 12,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  promptBox: {
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 14,
    padding: "14px 16px",
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 15,
    lineHeight: 1.5,
    minHeight: 180,
    boxShadow: "inset 0 1px 0 rgba(0,0,0,0.06)",
    overflowY: "auto",
  } as CSSProperties,

  blueGlow: {
    position: "absolute",
    inset: -2,
    borderRadius: 22,
    pointerEvents: "none",
    boxShadow: "0 0 0 0 rgba(37,99,235,0.0), 0 0 30px 2px rgba(37,99,235,0.18)",
  } as CSSProperties,

  greenGlow: {
    position: "absolute",
    inset: -2,
    borderRadius: 22,
    pointerEvents: "none",
    boxShadow: "0 0 0 0 rgba(5,150,105,0.0), 0 0 30px 2px rgba(5,150,105,0.18)",
  } as CSSProperties,

  videoCardBase: {
    // use cardBase + these two overrides on the card wrapper
  } as CSSProperties,

  videoShell: {
    position: "relative",
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    background: "#0b1220",
    border: "1px solid rgba(0,0,0,0.06)",
    minHeight: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,

  videoEl: {
    width: "100%",
    height: "auto",
    display: "block",
  } as CSSProperties,

  loadingText: {
    color: "#000000", // black text
    fontSize: 14,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,
};

export type S17Type = typeof S17;
