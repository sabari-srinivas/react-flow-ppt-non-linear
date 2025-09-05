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
    { title: "1.7 T Parameters", color: "#34d399" },
    { title: "1T Byte/s", sub: "8x More Bandwidth", color: "#34d399" },
    { title: "1300 MWh of Energy", sub: "H100 NVIDIA", color: "#34d399" },
  ];

  const rootRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<HTMLDivElement[]>([]);
  const rightRefs = useRef<HTMLDivElement[]>([]);
  leftRefs.current = [];
  rightRefs.current = [];

  const setLeftRef = (el: HTMLDivElement | null) => {
    if (el) leftRefs.current.push(el);
  };
  const setRightRef = (el: HTMLDivElement | null) => {
    if (el) rightRefs.current.push(el);
  };

  const [connectors, setConnectors] = useState<Conn[]>([]);

  const makeCurve = (sx: number, sy: number, ex: number, ey: number) => {
    const dx = ex - sx;
    const dy = ey - sy;
    const c = Math.max(Math.abs(dx) * 0.55, 80);
    const c1x = sx + c;
    const c2x = ex - c;
    const c1y = sy + dy * 0.1;
    const c2y = ey - dy * 0.1;
    return `M ${sx},${sy} C ${c1x},${c1y} ${c2x},${c2y} ${ex},${ey}`;
  };

  const recompute = () => {
    const root = rootRef.current;
    const circle = circleRef.current;
    if (!root || !circle) return;

    const rRect = root.getBoundingClientRect();
    const cRect = circle.getBoundingClientRect();
    const circleCx = cRect.left - rRect.left + cRect.width / 2;
    const circleCy = cRect.top - rRect.top + cRect.height / 2;
    const radius = cRect.width / 2;
    const pad = 4;

    const list: Conn[] = [];

    leftRefs.current.forEach((node, idx) => {
      const b = node.getBoundingClientRect();
      const sx = b.right - rRect.left;
      const sy = b.top - rRect.top + b.height / 2;
      const ex = circleCx - radius + pad;
      const maxDy = radius - 10;
      const ey = circleCy + Math.max(-maxDy, Math.min(maxDy, sy - circleCy));
      list.push({
        d: makeCurve(sx, sy, ex, ey),
        color: leftMetrics[idx]?.color || "#60a5fa",
        key: `L-${idx}`,
        sx,
        sy,
        ex,
        ey,
      });
    });

    rightRefs.current.forEach((node, idx) => {
      const b = node.getBoundingClientRect();
      const sx = b.left - rRect.left;
      const sy = b.top - rRect.top + b.height / 2;
      const ex = circleCx + radius - pad;
      const maxDy = radius - 10;
      const ey = circleCy + Math.max(-maxDy, Math.min(maxDy, sy - circleCy));
      list.push({
        d: makeCurve(sx, sy, ex, ey),
        color: rightMetrics[idx]?.color || "#34d399",
        key: `R-${idx}`,
        sx,
        sy,
        ex,
        ey,
      });
    });

    setConnectors(list);
  };

  useLayoutEffect(() => {
    recompute();
    const onResize = () => recompute();
    window.addEventListener("resize", onResize);

    const ResizeObs: typeof ResizeObserver | undefined = (window as any).ResizeObserver;
    const ro = ResizeObs ? new ResizeObs(() => recompute()) : undefined;
    if (ro && rootRef.current) ro.observe(rootRef.current);

    let rafId: number | null = null;
    if (!ResizeObs) {
      const tick = () => {
        recompute();
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      {/* SVG CONNECTORS */}
      <svg width="100%" height="100%" style={styles.svgLayer}>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
          </marker>
          {connectors.map(({ key, color }) => (
            <linearGradient
              id={`grad-${key}`}
              key={`grad-${key}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          ))}
        </defs>

        {connectors.map(({ d, key }, i) => (
          <motion.path
            key={key}
            d={d}
            fill="none"
            stroke={`url(#grad-${key})`}
            strokeWidth={5}
            strokeLinecap="round"
            markerEnd="url(#arrow)"
            initial={pathInitial}
            animate={pathAnimate}
            transition={pathTransition(i)}
          />
        ))}

        {connectors.map(({ sx, sy, ex, ey, color, key }) => (
          <g key={`dots-${key}`}>
            <circle cx={sx} cy={sy} r={5} fill="white" />
            <circle cx={sx} cy={sy} r={4} fill={color} />
            <circle cx={ex} cy={ey} r={5} fill="white" />
            <circle cx={ex} cy={ey} r={4} fill="#6366f1" />
          </g>
        ))}
      </svg>

      {/* Grid: [ Left | Circle | Right ] */}
      <div style={styles.grid}>
        {/* LEFT STACK */}
        <motion.div
          variants={listContainerVariantsMemo}
          initial="hidden"
          animate="show"
          style={styles.stackLeft}
        >
          {leftMetrics.map((m, idx) => (
            <motion.div
              key={`l-${idx}`}
              ref={setLeftRef}
              variants={leftItemVariantsMemo}
              {...floatAnim}
              whileHover={{ scale: 1.05, rotate: -1.5 }}
              whileTap={{ scale: 0.98 }}
              style={styles.cardLeft(m.color)}
            >
              <div style={styles.metricTitleLeft}>{m.title}</div>
            </motion.div>
          ))}
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
            <div style={{ fontSize: 18, fontWeight: 600, color: "#4a90e2" }}>
              HUMAN
            </div>
          </div>
          <div style={styles.divider} />
          <div style={styles.half}>
            <div style={{ fontSize: 48 }}>🤖</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#48bb78" }}>
              GPT-4o
            </div>
          </div>
        </motion.div>

        {/* RIGHT STACK */}
        <motion.div
          variants={listContainerVariantsMemo}
          initial="hidden"
          animate="show"
          style={styles.stackRight}
        >
          {rightMetrics.map((m, idx) => (
            <motion.div
              key={`r-${idx}`}
              ref={setRightRef}
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
        </motion.div>
      </div>
    </div>
  );
}
