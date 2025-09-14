// src/styles/slide3.bundle.ts
import type { CSSProperties } from "react";

export type Segment = "energy" | "trade" | "compute" | "skill";

export interface Marker {
  x: number;           
  year: string;
  title: string;
  align: "top" | "bottom";
  segment: Segment;
}

/* ---------------- Blue palette ---------------- */
// Accent color for borders/hover/labels
export const segmentColor: Record<Segment, string> = {
  energy: "#2c6da4",
  trade:  "#2c6da4",
  compute:"#2c6da4",
  skill:  "#2c6da4",
};

// Solid fills for each segment
export const gradientBg: Record<Segment, string> = {
  energy: "#83cbeb",  // light blue
  trade:  "#46b1e1",  // medium blue
  compute:"#3b96d6",  // darker medium blue
  skill:  "#2f73c6",  // medium-dark (lighter than before)
};

export const segmentGeom: Record<Segment, { left: string; width: string }> = {
  energy:  { left: "0%",   width: "40%" },
  trade:   { left: "40%",  width: "35%" },
  compute: { left: "75%",  width: "15%" },
  skill:   { left: "90%",  width: "10%" },
};

export const STORY_ORDER: Segment[] = ["energy", "trade", "compute", "skill"];

/* ---------------- Timing ---------------- */
export const TOT_PER_SEGMENT = 2.0;
export const SEGMENT_FADE_DURATION = 0.8;
export const MARKERS_START_OFFSET = 1.0;
export const MARKER_STAGGER = 0.18;

/* ---------------- Animation configs ---------------- */
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
  transition: { duration: 0.35, ease: "easeOut" as const },
};

/* ---------------- Styles ---------------- */
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
      fontSize: "clamp(22px, 4.5vw, 42px)",
    };
  },

  timelineContainer(): CSSProperties {
    return {
      position: "absolute",
      top: "calc(50% + 60px)",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "110%",
      maxWidth: "1200px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
  },

  yearLeft(): CSSProperties {
    return {
      position: "absolute",
      top: -40,
      left: -40,
      fontSize: 22,
      fontWeight: 900,
      color: "#000",
      letterSpacing: 0.8,
    };
  },

  yearRight(): CSSProperties {
    return {
      position: "absolute",
      top: -40,
      right: -40,
      fontSize: 22,
      fontWeight: 900,
      color: "#000",
      letterSpacing: 0.8,
    };
  },

  mainBar(): CSSProperties {
    return {
      height: 30,
      borderRadius: 15,
      overflow: "hidden",
      position: "relative",
      transformOrigin: "left",
      boxShadow: "0 6px 18px rgba(0,0,0,0.55)",
      width: "100%",
      background: "#ADD8E6", // base underlay
    };
  },

  overlayBase(seg: Segment, isHovered: boolean): CSSProperties {
    const geom = segmentGeom[seg];
    return {
      position: "absolute",
      left: geom.left,
      width: geom.width,
      height: "100%",
      background: gradientBg[seg],  // solid blue
      boxShadow: isHovered
        ? `0 0 14px ${segmentColor[seg]}66 inset`
        : `0 0 0 ${segmentColor[seg]}00 inset`,
    };
  },

  labelEnergy(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: -55,
      left: "20%",
      transform: "translateX(-50%)",
      fontSize: 25,
      fontWeight: 700,
      color: "#2c6da4",
      opacity,
    };
  },

  labelTrade(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: -55,
      left: "57.5%",
      transform: "translateX(-50%)",
      fontSize: 25,
      fontWeight: 700,
      color: "#2c6da4",
      opacity,
    };
  },

  labelCompute(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: 36,
      left: "82.5%",
      transform: "translateX(-50%)",
      fontSize: 25,
      fontWeight: 700,
      color: "#2c6da4",
      opacity,
    };
  },

  labelSkill(opacity: number): CSSProperties {
    return {
      position: "absolute",
      top: -55,
      left: "95%",
      transform: "translateX(-50%)",
      fontSize: 25,
      fontWeight: 700,
      color: "#2c6da4",
      opacity,
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
      top: m.align === "top" ? -80 : 30,
      width: 3.5,
      height: 75,
      background: hoveredSegment === m.segment ? segmentColor[m.segment] : "#a3a3a3",
      borderRadius: 2,
      transition: "background 200ms linear",
    };
  },

  yearCircle(m: Marker, hoveredSegment: Segment | null): CSSProperties {
    return {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: m.align === "top" ? -140 : 95,
      width: 78,
      height: 78,
      borderRadius: "50%",
      border: `3px solid ${hoveredSegment === m.segment ? "#fff" : segmentColor[m.segment]}`,
      background: gradientBg[m.segment],
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: 800,
      fontSize: 18,
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: "0.8px",
      boxShadow:
        hoveredSegment === m.segment
          ? `0 0 14px ${segmentColor[m.segment]}55`
          : "0 2px 6px rgba(0,0,0,0.25)", // softened shadow
      transition: "all 0.3s ease",
    };
  },

  markerTitle(m: Marker): CSSProperties {
    return {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      top: m.align === "top" ? -220 : 190,
      width: 200,
      color: "#2b2b2b",
      fontSize: 20,
      lineHeight: 1,
      fontWeight: 700,
      whiteSpace: "pre-line" as const,
      textAlign: "center" as const,
    };
  },
};
