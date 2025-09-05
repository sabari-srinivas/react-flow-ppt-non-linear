import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { slideContainer, titleStyle } from "../../styles/slideStyles";

import {
  Segment,
  Marker,
  STORY_ORDER,
  TOT_PER_SEGMENT,
  SEGMENT_FADE_DURATION,
  MARKERS_START_OFFSET,
  MARKER_STAGGER,
  segmentGeom,
  segmentColor,
  gradientBg,
  styles,
  barGrow,
  overlayFade,
  markerFade,
} from "../../styles/slide3.bundle";

const markers: Marker[] = [
  { x: 12, year: "1800s", title: "Water Textiles\n& Iron", align: "top", segment: "energy" },
  { x: 28, year: "1900s", title: "Steam,\nRailway & Steel", align: "bottom", segment: "energy" },
  { x: 48, year: "1920s", title: "Electricity,\nChemicals & Cars", align: "top", segment: "trade" },
  { x: 67, year: "1980s", title: "Oil,\nElectronics & Aviation", align: "bottom", segment: "trade" },
  { x: 82, year: "2010s", title: "Software,\nInternet & Social Media", align: "top", segment: "compute" },
  { x: 93, year: "2020s", title: "AI & Robots", align: "bottom", segment: "skill" },
];

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
      <h1 style={{ ...titleStyle, ...styles.titleOverrides() }}>
        Technology Era: 1700s → 2020s
      </h1>

      {/* Timeline Container */}
      <div style={styles.timelineContainer()}>
        {/* Year Labels */}
        <div style={styles.yearLeft()}>1700</div>
        <div style={styles.yearRight()}>2020</div>

        {/* Main Timeline Bar */}
        <motion.div
          initial={barGrow.initial}
          animate={barGrow.animate}
          transition={barGrow.transition}
          style={styles.mainBar()}
        >
          {/* Colored overlays fade in one-by-one (5s blocks) */}
          {STORY_ORDER.map((seg) => {
            const isHovered = hoveredSegment === seg;
            return (
              <motion.div
                key={seg}
                style={styles.overlayBase(seg, isHovered)}
                initial={overlayFade.initial}
                animate={{ opacity: segmentOpacity(seg) }}
                transition={overlayFade.transition}
                onMouseEnter={() => setHoveredSegment(seg)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            );
          })}
        </motion.div>

        {/* Segment Labels (fade in with their segment) */}
        <div style={styles.labelEnergy(segmentOpacity("energy"))}>Energy</div>
        <div style={styles.labelTrade(segmentOpacity("trade"))}>Trade</div>
        <div style={styles.labelCompute(segmentOpacity("compute"))}>Compute &amp; Comms</div>
        <div style={styles.labelSkill(segmentOpacity("skill"))}>Skill</div>

        {/* Markers */}
        <div style={styles.markersLayer()}>
          {markers.map((m, i) => {
            const appearAt = markerAppearAt(m);
            const visible = elapsed >= appearAt;
            return (
              <motion.div
                key={i}
                initial={markerFade.initial}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
                transition={markerFade.transition}
                style={styles.markerWrapper(m)}
                onMouseEnter={() => setHoveredSegment(m.segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                aria-label={`${m.year}: ${m.title.replace("\n", " ")}`}
              >
                {/* Connector Line */}
                <div style={styles.connectorLine(m, hoveredSegment)} />

                {/* Year Circle */}
                <div style={styles.yearCircle(m, hoveredSegment)}>
                  {m.year}
                </div>

                {/* Title */}
                <div style={styles.markerTitle(m)}>
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
