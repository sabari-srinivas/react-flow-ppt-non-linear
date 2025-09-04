import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { slideContainer, titleStyle } from "../../styles/slideStyles";

type Segment = "energy" | "trade" | "compute" | "skill";

interface Marker {
  x: number; // position along bar (0–100)
  year: string;
  title: string;
  align: "top" | "bottom";
  segment: Segment;
}

const markers: Marker[] = [
  { x: 12, year: "1800s", title: "Water Textiles\n& Iron", align: "top", segment: "energy" },
  { x: 28, year: "1900s", title: "Steam,\nRailway & Steel", align: "bottom", segment: "energy" },
  { x: 48, year: "1920s", title: "Electricity,\nChemicals & Cars", align: "top", segment: "trade" },
  { x: 67, year: "1980s", title: "Oil,\nElectronics & Aviation", align: "bottom", segment: "trade" },
  { x: 82, year: "2010s", title: "Software,\nInternet & Social Media", align: "top", segment: "compute" },
  { x: 93, year: "2020s", title: "AI & Robots", align: "bottom", segment: "skill" },
];

// Solid colors
const segmentColor: Record<Segment, string> = {
  energy: "#FFA500", // Orange
  trade:  "#E91E63", // Pink
  compute:"#2196F3", // Blue
  skill:  "#009688", // Teal
};

// Gradient backgrounds for hover effect
const gradientBg: Record<Segment, string> = {
  energy: "linear-gradient(135deg, #FFB347, #FF8C00)",
  trade:  "linear-gradient(135deg, #F48FB1, #E91E63)",
  compute:"linear-gradient(135deg, #64B5F6, #2196F3)",
  skill:  "linear-gradient(135deg, #80CBC4, #009688)",
};

// Segment geometry (exactly as in your code)
const segmentGeom: Record<Segment, { left: string; width: string }> = {
  energy:  { left: "0%",   width: "40%" },
  trade:   { left: "40%",  width: "35%" },
  compute: { left: "75%",  width: "15%" },
  skill:   { left: "90%",  width: "10%" },
};

const STORY_ORDER: Segment[] = ["energy", "trade", "compute", "skill"];

// --- Timing you asked for ---
const TOT_PER_SEGMENT = 5.0;       // 5 seconds per segment block (color + markers)
const SEGMENT_FADE_DURATION = 0.8; // color fade
const MARKERS_START_OFFSET = 1.0;  // markers begin ~1s into the block
const MARKER_STAGGER = 0.18;       // spacing between markers

export default function Slide3() {
  const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null);

  // Start the animation only when this slide is in view
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.35 });

  // precompute when each segment starts
  const revealAt: Record<Segment, number> = useMemo(() => {
    const times: Record<Segment, number> = {} as any;
    let t = 0;
    for (const s of STORY_ORDER) {
      times[s] = t;
      t += TOT_PER_SEGMENT;
    }
    return times;
  }, []);

  // group markers by segment to get stable per-segment order
  const markersBySegment = useMemo(() => {
    const map: Record<Segment, Marker[]> = {
      energy: [], trade: [], compute: [], skill: []
    };
    for (const m of markers) map[m.segment].push(m);
    return map;
  }, []);

  const markerIndexInSegment = (m: Marker) =>
    markersBySegment[m.segment].findIndex(mm => mm === m);

  // Animation clock: only runs while inView
  const [elapsed, setElapsed] = useState(0); // seconds since show began
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0); // preserves elapsed across visibility changes

  useEffect(() => {
    if (inView) {
      // start/resume
      const loop = (ts: number) => {
        if (startedRef.current == null) startedRef.current = ts;
        const secs = (ts - startedRef.current) / 1000 + accumulatedRef.current;
        setElapsed(secs);
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    } else {
      // pause (don’t reset), so it only “works” when viewed
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      if (startedRef.current != null) {
        accumulatedRef.current += (performance.now() - startedRef.current) / 1000;
        startedRef.current = null;
      }
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [inView]);

  // helper: 0→1 opacity for a segment color based on elapsed time
  const segmentOpacity = (s: Segment) => {
    const t0 = revealAt[s];
    const t1 = t0 + SEGMENT_FADE_DURATION;
    const t = Math.min(Math.max((elapsed - t0) / (t1 - t0), 0), 1);
    return t;
  };

  // when a given marker becomes visible
  const markerAppearAt = (m: Marker) =>
    revealAt[m.segment] + MARKERS_START_OFFSET + markerIndexInSegment(m) * MARKER_STAGGER;

  return (
    <div ref={ref} style={slideContainer}>
      {/* Title */}
      <h1
        style={{
          ...titleStyle,
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
        }}
      >
        Technology Era: 1700s → 2020s
      </h1>

      {/* Timeline Container */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% + 60px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Year Labels */}
<div
  style={{
    position: "absolute",
    top: -30,
    left: 0,
    fontSize: 14,
    fontWeight: 900,   // extra bold
    color: "#000",     // 🔥 dark black
    letterSpacing: 0.4,
  }}
>
  1700
</div>
<div
  style={{
    position: "absolute",
    top: -30,
    right: 0,
    fontSize: 14,
    fontWeight: 900,   // extra bold
    color: "#000",     // 🔥 dark black
    letterSpacing: 0.4,
  }}
>
  2020
</div>


        {/* Main Timeline Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            height: 20,
            borderRadius: 10,
            overflow: "hidden",
            position: "relative",
            transformOrigin: "left",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            width: "100%",
            background: "linear-gradient(90deg, #3b3b3b, #444)", // neutral base
          }}
        >
          {/* Colored overlays fade in one-by-one (5s blocks) */}
          {STORY_ORDER.map((seg) => {
            const geom = segmentGeom[seg];
            const isHovered = hoveredSegment === seg;
            return (
              <motion.div
                key={seg}
                style={{
                  position: "absolute",
                  left: geom.left,
                  width: geom.width,
                  height: "100%",
                  background: gradientBg[seg],
                  boxShadow: isHovered
                    ? `0 0 18px ${segmentColor[seg]}aa inset`
                    : `0 0 0 ${segmentColor[seg]}00 inset`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: segmentOpacity(seg) }}
                transition={{ ease: "easeOut" }}
                onMouseEnter={() => setHoveredSegment(seg)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </motion.div>

        {/* Segment Labels (fade in with their segment) */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "20%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 700,
            color: "#FFD700",
            whiteSpace: "nowrap",
            opacity: segmentOpacity("energy"),
            transition: "opacity 150ms linear",
          }}
        >
          Energy
        </div>
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "57.5%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 700,
            color: "#FF69B4",
            whiteSpace: "nowrap",
            opacity: segmentOpacity("trade"),
            transition: "opacity 150ms linear",
          }}
        >
          Trade
        </div>
        <div
          style={{
            position: "absolute",
            top: 28,
            left: "82.5%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 800,
            color: "#42A5F5",
            whiteSpace: "nowrap",
            textShadow: "0 1px 2px rgba(0,0,0,0.25)",
            opacity: segmentOpacity("compute"),
            transition: "opacity 150ms linear",
          }}
        >
          Compute &amp; Comms
        </div>
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "95%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 700,
            color: "#80CBC4",
            whiteSpace: "nowrap",
            opacity: segmentOpacity("skill"),
            transition: "opacity 150ms linear",
          }}
        >
          Skill
        </div>

        {/* Markers (pop after their segment starts, within the 5s window) */}
        <div style={{ position: "absolute", width: "100%" }}>
          {markers.map((m, i) => {
            const appearAt = markerAppearAt(m);
            const visible = elapsed >= appearAt;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  left: `${m.x}%`,
                  transform: "translateX(-50%)",
                  textAlign: "center",
                  cursor: "pointer",
                  zIndex: 10,
                }}
                onMouseEnter={() => setHoveredSegment(m.segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                aria-label={`${m.year}: ${m.title.replace("\n", " ")}`}
              >
                {/* Connector Line */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: m.align === "top" ? -60 : 20,
                    width: 2,
                    height: 60,
                    background: hoveredSegment === m.segment ? segmentColor[m.segment] : "#ccc",
                    borderRadius: 1,
                    transition: "background 200ms linear",
                  }}
                />

                {/* Year Circle */}
                <div
                  style={{
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
                    boxShadow: hoveredSegment === m.segment ? `0 0 18px ${segmentColor[m.segment]}aa` : "0 2px 6px rgba(0,0,0,0.3)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {m.year}
                </div>

                {/* Title */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: m.align === "top" ? -170 : 150,
                    width: 150,
                    color: "#2b2b2b",
                    fontSize: 12,
                    lineHeight: 1.4,
                    fontWeight: 700,
                    whiteSpace: "pre-line",
                    textAlign: "center",
                    textShadow: "0 1px 1px rgba(0,0,0,0.05)",
                  }}
                >
                  {m.title}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}