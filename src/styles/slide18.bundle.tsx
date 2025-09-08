// src/styles/slideIndianGenAI.bundle.ts
import type { CSSProperties } from "react";

export const SIE = {
  root: {
    backgroundColor: "#ffffff", // white container
    color: "#000000", // black text by default
    fontFamily:
      "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    padding: "40px 48px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 40,
  } as CSSProperties,

  title: {
    fontSize: "2.8rem",
    color: "#4e83c3", // black
    marginBottom: 10,
    textAlign: "center",
    fontFamily:
      "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  row: {
    display: "flex",
    justifyContent: "center",
    gap: 40,
    flexWrap: "wrap",
    width: "100%",
  } as CSSProperties,

  rowMax1000: { maxWidth: 1000 } as CSSProperties,
  rowMax700: { maxWidth: 700, marginTop: 10 } as CSSProperties,

  card: {
    flex: "1 1 0",
    maxWidth: 280,
    borderRadius: 16,
    background: "#ffffff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    textAlign: "center",
    border: "2px solid #4e83c3",
    minHeight: 260,
    margin: "0 auto",
    transition: "all 0.25s ease",
    color: "#000000",
    fontFamily:
      "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  logo: {
    width: 110,
    height: 110,
    marginBottom: 16,
    borderRadius: 16,
    objectFit: "contain",
    background: "#ffffff",
    padding: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  } as CSSProperties,

  name: {
    margin: 0,
    color: "#000000", // black
    fontSize: "1.6rem",
    fontWeight: 700,
    letterSpacing: 0.2,
    fontFamily:
      "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,

  desc: {
    fontSize: "1.2rem",
    marginTop: 8,
    color: "#000000", // black
    lineHeight: 1.45,
    fontFamily:
      "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as CSSProperties,
};
