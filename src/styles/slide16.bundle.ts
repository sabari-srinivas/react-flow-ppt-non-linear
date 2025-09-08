// src/styles/slide16.bundle.ts
import type { CSSProperties } from "react";

// Reuse your shared slideContainer/titleStyle if you want,
// but this bundle keeps Slide16-specific pieces together.

export const S16 = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    background: "#ffffff", // white container
    padding: "40px 64px",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000000", // default text color black
  } as CSSProperties,

  title: {
    fontSize: "3.4rem",
    marginBottom: 12,
    color: "#4e83c3", // black (replaces gradient text)
    textAlign: "center",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  narrBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#ffffff",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 14,
    padding: "12px 16px",
    boxShadow: "0 12px 26px rgba(0,0,0,0.10)",
    marginBottom: 14,
    maxWidth: 1180,
    width: "100%",
  } as CSSProperties,

  narrDotBase: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    boxShadow: "0 0 0 4px rgba(99,102,241,0.18)",
  } as CSSProperties,

  narrTitle: {
    fontWeight: 700,
    fontSize: "1.2rem",
    color: "#000000",
  } as CSSProperties,

  narrSub: {
    color: "#000000",
  } as CSSProperties,

  narrProgressTrack: {
    height: 6,
    flex: 1,
    background: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
  } as CSSProperties,

  narrRightStatus: {
    fontSize: 20,
    color: "#000000",
  } as CSSProperties,

  // three panels grid
  panelsGrid: {
    width: "100%",
    maxWidth: 1180,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 20,
    alignItems: "stretch",
  } as CSSProperties,

  panelBase: {
    background: "#ffffff",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 12px 26px rgba(0,0,0,0.10)",
    border: "2px solid #4e83c3",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    position: "relative",
    overflow: "hidden",
    minWidth: 0,
  } as CSSProperties,

  panelHeading: {
    fontWeight: 700,
    color: "#000000",
    fontSize: "1.2rem",
  } as CSSProperties,

  promptBubble: {
    background: "#ffffff",
    color: "#000000",
    padding: "12px 14px",
    borderRadius: 12,
    fontSize: "1.05rem",
    boxShadow: "inset 0 1px 0 rgba(0,0,0,0.06)",
  } as CSSProperties,

  stepHint: {
    marginTop: 4,
    fontSize: 12,
    color: "#000000",
  } as CSSProperties,

  // panel B “AI scanning bar”
  scanBar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "35%",
    background:
      "linear-gradient(90deg, rgba(99,102,241,0.0) 0%, rgba(99,102,241,0.12) 45%, rgba(99,102,241,0.0) 100%)",
    pointerEvents: "none",
  } as CSSProperties,

  aiGlow: {
    position: "absolute",
    inset: 0,
    borderRadius: 16,
    pointerEvents: "none",
  } as CSSProperties,

  // panel C lower grid
  ioGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    minWidth: 0,
  } as CSSProperties,

  sampleBox: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: "#000000",
    minWidth: 0,
  } as CSSProperties,

  sampleTitle: {
    fontWeight: 700,
    marginBottom: 6,
    color: "#000000",
  } as CSSProperties,

  outputBox: {
    background: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: "#000000",
    minWidth: 0,
  } as CSSProperties,

  outputFinal: {
    background: "#0b1220",
    color: "#fef3c7",
    borderRadius: 12,
    padding: "10px 12px",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
    border: "1px solid #f59e0b33",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } as CSSProperties,

  outputPlaceholder: {
    background: "#0b1220",
    color: "#94a3b8",
    borderRadius: 12,
    padding: "10px 12px",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    border: "1px dashed #64748b66",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  } as CSSProperties,

  controlsRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  } as CSSProperties,

  btn: {
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  controlsHint: {
    marginLeft: 6,
    fontSize: 12,
    color: "#000000",
  } as CSSProperties,

  // shared code block
  codeBlock: {
    background: "#0b1220",
    color: "#e5e7eb",
    borderRadius: 14,
    padding: "16px 18px",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: 14,
    lineHeight: 1.55,
    boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
    position: "relative",
    overflow: "auto",
    width: "100%",
  } as CSSProperties,

  codeSheen: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(0deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
    pointerEvents: "none",
  } as CSSProperties,
};

export type S16Type = typeof S16;
