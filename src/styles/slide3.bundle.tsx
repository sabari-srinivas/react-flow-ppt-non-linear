// src/styles/slide3.bundle.ts
import type { CSSProperties } from "react";

export type Segment = "energy" | "trade" | "compute" | "skill";

export interface Marker {
  x: number;           // position along bar (0–100)
  year: string;
  title: string;
  align: "top" | "bottom";
  segment: Segment;
}

/* ---------------- Exact visual constants (unchanged) ---------------- */
export const segmentColor: Record<Segment, string> = {
  energy: "#FFA500",   // Orange
  trade:  "#E91E63",   // Pink
  compute:"#2196F3",   // Blue
  skill:  "#009688",   // Teal
};

export const gradientBg: Record<Segment, string> = {
  energy: "linear-gradient(135deg, #FFB347, #FF8C00)",
  trade:  "linear-gradient(135deg, #F48FB1, #E91E63)",
  compute:"linear-gradient(135deg, #64B5F6, #2196F3)",
  skill:  "linear-gradient(135deg, #80CBC4, #009688)",
};

export const segmentGeom: Record<Segment, { left: string; width: string }> = {
  energy:  { left: "0%",   width: "40%" },
  trade:   { left: "40%",  width: "35%" },
  compute: { left: "75%",  width: "15%" },
  skill:   { left: "90%",  width: "10%" },
};

export const STORY_ORDER: Segment[] = ["energy", "trade", "compute", "skill"];

/* ---------------- Exact timing (unchanged) ---------------- */
export const TOT_PER_SEGMENT = 5.0;       // 5 seconds per segment block (color + markers)
export const SEGMENT_FADE_DURATION = 0.8; // color fade
export const MARKERS_START_OFFSET = 1.0;  // markers begin ~1s into the block
export const MARKER_STAGGER = 0.18;       // spacing between markers

/* ---------------- Animation configs (unchanged values) ---------------- */
export const barGrow = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 1.2, ease: "easeOut" as const },
};

export const overlayFade = {
  initial: { opacity: 0 },
  transition: { ease: "easeOut" as const },
};

export const markerFade = {
  initial: { opacity: 0, scale: 0.8 },
  // animate is computed in-slide based on visibility
  transition: { duration: 0.35, ease: "easeOut" as const },
};

/* ---------------- Style helpers (return exactly your inline styles) ---------------- */
export const styles = {
  titleOverrides(): CSSProperties {
    return {
      position: "absolute",
      top: 24,
      left: "50%",
      transform: "translateX(-50%)",
      width: "min(92vw, 1000px)",
      textAlign: "center",
      margin: 0,
      lineHeight: 1.15,
      zIndex: 2,
      pointerEvents: "none",
      fontSize: "clamp(20px, 4vw, 36px)",
    };
  },

  timelineContainer(): CSSProperties {
    return {
      position: "absolute",
      top: "calc(50% + 60px)",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      maxWidth: "1000px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
  },

  yearLeft(): CSSProperties {
    return {
      position: "absolute",
      top: -30,
      left: 0,
      fontSize: 14,
      fontWeight: 900,
      color: "#000",
      letterSpacing: 0.4,
    };
  },

  yearRight(): CSSProperties {
    return {
      position: "absolute",
      top: -30,
      right: 0,
      fontSize: 14,
      fontWeight: 900,
      color: "#000",
      letterSpacing: 0.4,
    };
  },

  mainBar(): CSSProperties {
    return {
      height: 20,
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      transformOrigin: "left",
      boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
      width: "100%",
      background: "linear-gradient(90deg, #3b3b3b, #444)",
    };
  },

  overlayBase(seg: Segment, isHovered: boolean): CSSProperties {
    const geom = segmentGeom[seg];
    return {
      position: "absolute",
      left: geom.left,
      width: geom.width,
      height: "100%",
      background: gradientBg[seg],
      boxShadow: isHovered
        ? `0 0 18px ${segmentColor[seg]}aa inset`
        : `0 0 0 ${segmentColor[seg]}00 inset`,
    };
  },

  labelEnergy(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: -40,
      left: "20%",
      transform: "translateX(-50%)",
      fontSize: 14,
      fontWeight: 700,
      color: "#FFD700",
      whiteSpace: "nowrap",
      opacity,
      transition: "opacity 150ms linear",
    };
  },

  labelTrade(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: -40,
      left: "57.5%",
      transform: "translateX(-50%)",
      fontSize: 14,
      fontWeight: 700,
      color: "#FF69B4",
      whiteSpace: "nowrap",
      opacity,
      transition: "opacity 150ms linear",
    };
  },

  labelCompute(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: 28,
      left: "82.5%",
      transform: "translateX(-50%)",
      fontSize: 14,
      fontWeight: 800,
      color: "#42A5F5",
      whiteSpace: "nowrap",
      textShadow: "0 1px 2px rgba(0,0,0,0.25)",
      opacity,
      transition: "opacity 150ms linear",
    };
  },

  labelSkill(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: -40,
      left: "95%",
      transform: "translateX(-50%)",
      fontSize: 14,
      fontWeight: 700,
      color: "#80CBC4",
      whiteSpace: "nowrap",
      opacity,
      transition: "opacity 150ms linear",
    };
  },

  markersLayer(): CSSProperties {
    return { position: "absolute", width: "100%" };
  },

  markerWrapper(m: Marker): CSSProperties {
    return {
      position: "absolute",
      left: `${m.x}%`,
      transform: "translateX(-50%)",
      textAlign: "center" as const,
      cursor: "pointer",
      zIndex: 10,
    };
  },

  connectorLine(m: Marker, hoveredSegment: Segment | null): CSSProperties {
    return {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: m.align === "top" ? -60 : 20,
      width: 2,
      height: 60,
      background: hoveredSegment === m.segment ? segmentColor[m.segment] : "#ccc",
      borderRadius: 1,
      transition: "background 200ms linear",
    };
  },

  yearCircle(m: Marker, hoveredSegment: Segment | null): CSSProperties {
    return {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: m.align === "top" ? -110 : 80,
      width: 60,
      height: 60,
      borderRadius: "50%",
      border: `2px solid ${hoveredSegment === m.segment ? "#fff" : segmentColor[m.segment]}`,
      background: gradientBg[m.segment],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 800,
      fontSize: 14,
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "0.5px",
      boxShadow:
        hoveredSegment === m.segment
          ? `0 0 18px ${segmentColor[m.segment]}aa`
          : "0 2px 6px rgba(0,0,0,0.3)",
      transition: "all 0.3s ease",
    };
  },

  markerTitle(m: Marker): CSSProperties {
    return {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: m.align === "top" ? -170 : 150,
      width: 150,
      color: "#2b2b2b",
      fontSize: 12,
      lineHeight: 1.4,
      fontWeight: 700,
      whiteSpace: "pre-line" as const,
      textAlign: "center" as const,
      textShadow: "0 1px 1px rgba(0,0,0,0.05)",
    };
  },
};
