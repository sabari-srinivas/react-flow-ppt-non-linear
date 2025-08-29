import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import {
  slideContainer,
  titleStyle,
  subtitleStyle,
  contentContainer,
  fadeInUp,
  staggerContainer,
  colorThemes,
  sectionTitleStyle,
} from "../../styles/slideStyles";

type Box = { w: number; h: number };

export default function Slide4() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<Box>({ w: 1280, h: 720 });

  useLayoutEffect(() => {
    const update = () => {
      const r = rootRef.current?.getBoundingClientRect();
      if (!r) return;
      setBox({ w: r.width, h: r.height });
    };
    update();
    window.addEventListener("resize", update);

    const RO: typeof ResizeObserver | undefined = (window as any).ResizeObserver;
    const ro = RO ? new RO(update) : undefined;
    if (ro && rootRef.current) ro.observe(rootRef.current);

    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, []);

  const cards = [
    {
      title: "Generative Models",
      desc: "AI that creates text, images, and video.",
      theme: colorThemes.primary,
    },
    {
      title: "Accessibility",
      desc: "AI tools available to businesses & individuals.",
      theme: colorThemes.secondary,
    },
    {
      title: "Multimodality",
      desc: "Combining text, images, audio for better results.",
      theme: colorThemes.accent,
    },
    {
      title: "Scale",
      desc: "AI applied across industries at global scale.",
      theme: colorThemes.primary,
    },
  ];

  // 2×2 grid with larger gaps
  const twoByTwoGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "40px", // bigger gap
    width: "100%",
    maxWidth: "1100px",
    margin: "40px auto 0 auto", // margin before grid
  };

  return (
    <div ref={rootRef} style={slideContainer as React.CSSProperties}>
      <motion.div
        style={contentContainer as React.CSSProperties}
        initial="hidden"
        animate="show"
        variants={staggerContainer}
      >
        {/* Page Title */}
        <motion.h2
          variants={fadeInUp}
          style={{
            ...titleStyle,
            fontSize: "3.5rem",
            marginBottom: 12,
            color: "#1e293b",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: "center",
            textShadow: "none",
          }}
        >
          <Lightbulb size={44} color="#0891b2" />
          What’s New and Different in AI?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          style={{
            ...subtitleStyle,
            fontSize: "1.4rem",
            margin: "0 0 30px 0",
            color: "#334155",
            textAlign: "center",
          }}
        >
          AI today is far more adaptive, creative, and accessible than ever before.
        </motion.p>

        {/* Section Heading for Cards */}
        <motion.h3
          variants={fadeInUp}
          style={{
            ...sectionTitleStyle,
            fontSize: "2.2rem",
            marginBottom: "10px",
            color: "#0f172a",
          }}
        >
          Key Areas of Change
        </motion.h3>

        {/* 2×2 Card Grid */}
        <motion.div
          style={twoByTwoGrid}
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.15 },
            },
          }}
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                position: "relative",
                borderRadius: 16,
                padding: 2,
                background: c.theme.background,
                boxShadow: "0 8px 26px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: 14,
                  height: "100%",
                  padding: 24,
                }}
              >
                {/* Title Tag */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "8px 14px",
                    borderRadius: 12,
                    color: c.theme.color,
                    background: c.theme.background,
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: 0.2,
                    boxShadow: "0 6px 16px rgba(0,0,0,0.10)",
                  }}
                >
                  {c.title}
                </div>

                <p
                  style={{
                    marginTop: 14,
                    fontSize: "1.15rem",
                    lineHeight: 1.6,
                    color: "#1f2937",
                    textAlign: "left",
                  }}
                >
                  {c.desc}
                </p>

                {/* Glow */}
                <div
                  style={{
                    position: "absolute",
                    right: -18,
                    bottom: -18,
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    filter: "blur(30px)",
                    opacity: 0.35,
                    background: c.theme.background,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
