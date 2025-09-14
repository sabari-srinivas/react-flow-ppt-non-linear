import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  styles,
  listContainerVariants,
  leftItemVariants,
  rightItemVariants,
  floatAnim,
  pathInitial,
  pathAnimate,
  pathTransition,
  titleInitial,
  titleAnimate,
  titleTransition,
  type Metric,
  type Conn,
} from "../../styles/slide4.bundle";

export default function Slide4() {
  const leftMetrics: Metric[] = [
    { title: "86 B Parameters", color: "#60a5fa" },
    { title: "1T bit/s", color: "#60a5fa" },
    { title: "20 W of Power", color: "#60a5fa" },
  ];

  const rightMetrics: Metric[] = [
    { title: "1.7 T Parameters", color: "#4E83C3" },
    { title: "1T Byte/s", sub: "8x More Bandwidth", color: "#4E83C3" },
    { title: "1300 MWh of Energy", sub: "H100 NVIDIA", color: "#4E83C3" },
  ];

  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const leftWrapperRef = useRef<HTMLDivElement>(null);
  const rightWrapperRef = useRef<HTMLDivElement>(null);

  const [connectors, setConnectors] = useState<Conn[]>([]);

  const makeStraightLine = (sx: number, sy: number, ex: number, ey: number) => {
    return `M ${sx},${sy} L ${ex},${ey}`;
  };

  const recompute = () => {
    const root = rootRef.current;
    const circle = circleRef.current;
    const leftWrapper = leftWrapperRef.current;
    const rightWrapper = rightWrapperRef.current;
    
    if (!root || !circle || !leftWrapper || !rightWrapper) return;

    const rRect = root.getBoundingClientRect();
    const cRect = circle.getBoundingClientRect();
    const lRect = leftWrapper.getBoundingClientRect();
    const rRect2 = rightWrapper.getBoundingClientRect();

    const circleCx = cRect.left - rRect.left + cRect.width / 2;
    const circleCy = cRect.top - rRect.top + cRect.height / 2;
    const radius = cRect.width / 2;

    const list: Conn[] = [];

    // Human to Left Wrapper connection
    const leftCx = lRect.left - rRect.left + lRect.width;
    const leftCy = lRect.top - rRect.top + lRect.height / 2;
    const humanStartX = circleCx - radius * 0.4;
    const humanStartY = circleCy;

    list.push({
      d: makeStraightLine(humanStartX, humanStartY, leftCx, leftCy),
      color: "#60a5fa",
      key: "Human-to-Left",
      sx: humanStartX,
      sy: humanStartY,
      ex: leftCx,
      ey: leftCy,
    });

    // GPT-4o to Right Wrapper connection
    const rightCx = rRect2.left - rRect.left;
    const rightCy = rRect2.top - rRect.top + rRect2.height / 2;
    const gptStartX = circleCx + radius * 0.4;
    const gptStartY = circleCy;

    list.push({
      d: makeStraightLine(gptStartX, gptStartY, rightCx, rightCy),
      color: "#4E83C3",
      key: "GPT-to-Right",
      sx: gptStartX,
      sy: gptStartY,
      ex: rightCx,
      ey: rightCy,
    });

    setConnectors(list);
  };

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      recompute();
    }, 800);

    const onResize = () => {
      setTimeout(recompute, 100);
    };
    
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const listContainerVariantsMemo = useMemo(() => listContainerVariants, []);
  const leftItemVariantsMemo = useMemo(() => leftItemVariants, []);
  const rightItemVariantsMemo = useMemo(() => rightItemVariants, []);

  return (
    <div ref={rootRef} style={styles.rootBox}>
      {/* --- Centered Slide Title --- */}
      <motion.h1
        initial={titleInitial}
        animate={titleAnimate}
        transition={titleTransition}
        style={styles.title}
      >
        2 Neural Networks
      </motion.h1>

      {/* Grid: [ Left | Circle | Right ] */}
      <div style={styles.grid}>
        {/* LEFT WRAPPER */}
        <motion.div
          ref={leftWrapperRef}
          variants={listContainerVariantsMemo}
          initial="hidden"
          animate="show"
          style={styles.wrapperLeft}
        >
          <div style={styles.wrapperTitle}>HUMAN Capabilities</div>
          <div style={styles.stackLeft}>
            {leftMetrics.map((m, idx) => (
              <motion.div
                key={`l-${idx}`}
                variants={leftItemVariantsMemo}
                {...floatAnim}
                whileHover={{ scale: 1.05, rotate: -1.5 }}
                whileTap={{ scale: 0.98 }}
                style={styles.cardLeft(m.color)}
              >
                <div style={styles.metricTitleLeft}>{m.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CENTER CIRCLE */}
        <motion.div
          ref={circleRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.centerCircle}
        >
          <div style={styles.half}>
            <div style={{ fontSize: 48 }}>🧠</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#4a90e2" }}>
              HUMAN
            </div>
          </div>
          <div style={styles.divider} />
          <div style={styles.half}>
            <div style={{ fontSize: 48 }}>🤖</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#4E83C3" }}>
              GPT-4o
            </div>
          </div>
        </motion.div>

        {/* RIGHT WRAPPER */}
        <motion.div
          ref={rightWrapperRef}
          variants={listContainerVariantsMemo}
          initial="hidden"
          animate="show"
          style={styles.wrapperRight}
        >
          <div style={styles.wrapperTitle}>GPT-4o Capabilities</div>
          <div style={styles.stackRight}>
            {rightMetrics.map((m, idx) => (
              <motion.div
                key={`r-${idx}`}
                variants={rightItemVariantsMemo}
                {...floatAnim}
                whileHover={{ scale: 1.05, rotate: 1.5 }}
                whileTap={{ scale: 0.98 }}
                style={styles.cardRight(m.color)}
              >
                <div style={styles.metricTitleRight}>{m.title}</div>
                {m.sub && <div style={styles.metricSubRight}>{m.sub}</div>}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* SVG CONNECTORS - Fixed arrow alignment */}
      <svg width="100%" height="100%" style={styles.svgLayerTop}>
        <defs>
          <marker
            id="arrow-blue"
            viewBox="0 0 10 10"
            refX="8"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#60a5fa" />
          </marker>
          <marker
            id="arrow-darkblue"
            viewBox="0 0 10 10"
            refX="8"
            refY="3"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#4E83C3" />
          </marker>
        </defs>
        
        {connectors.map(({ d, key, color }, i) => (
          <motion.path
            key={key}
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeOpacity={0.9}
            markerEnd={color === "#60a5fa" ? "url(#arrow-blue)" : "url(#arrow-darkblue)"}
            initial={pathInitial}
            animate={pathAnimate}
            transition={{ duration: 1.5, delay: 2 + i * 0.5 }}
          />
        ))}
        
        {connectors.map(({ sx, sy, ex, ey, color, key }) => (
          <g key={`dots-${key}`}>
            <circle cx={sx} cy={sy} r={8} fill={color} opacity={0.9} />
            <circle cx={ex} cy={ey} r={8} fill={color} opacity={0.9} />
          </g>
        ))}
      </svg>
    </div>
  );
}
