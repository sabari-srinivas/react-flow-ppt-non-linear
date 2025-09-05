import type * as React from "react";

/** Inline styles moved out of Slide20 */
export const styles: Record<string, React.CSSProperties> = {
  slideContainer: {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "20px",
    padding: "20px",
    boxSizing: "border-box",
    backgroundColor: "#030712",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    backgroundColor: "rgba(31, 41, 55, 0.5)",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(8px)",
    color: "#E5E7EB",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    overflow: "auto",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "white",
  },
  cardParagraph: {
    color: "#9CA3AF",
    marginBottom: "24px",
    fontSize: "0.9rem",
    lineHeight: 1.6,
  },
  button: {
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.2s, opacity 0.2s",
    border: "none",
    outline: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  input: {
    flexGrow: 1,
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    border: "1px solid #4B5563",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "white",
    fontSize: "0.9rem",
  },
  icon: { width: "24px", height: "24px" },
  smallIcon: { width: "16px", height: "16px" },

  loadingContainer: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: "#D1D5DB",
  },
  outputContainer: {
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
  },
  outputTitle: {
    fontWeight: "bold",
    fontSize: "1rem",
    marginBottom: "8px",
    color: "#F3F4F6",
  },
  outputText: {
    color: "#D1D5DB",
    lineHeight: 1.6,
    fontSize: "0.9rem",
    whiteSpace: "pre-wrap",
  },

  // Images grid (2x3)
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  imageCard: {
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    paddingBottom: "66%", // 3:2
    overflow: "hidden",
  },
  imageTag: {
    position: "absolute",
    bottom: "8px",
    left: "8px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    fontSize: "0.75rem",
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  // Talk to Your Data charts
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "12px",
  },
  chartCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "12px",
  },
  chartTitle: {
    fontSize: "0.9rem",
    color: "#E5E7EB",
    marginBottom: "8px",
    fontWeight: 600,
  },
  svgWrap: { width: "100%", height: "160px" },
};

/** Global keyframes used by multiple cards */
export const KEYFRAMES_CSS = `
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
`;
