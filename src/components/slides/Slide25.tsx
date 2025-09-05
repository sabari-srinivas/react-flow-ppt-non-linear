'use client';

import * as React from "react";
import { motion } from "framer-motion";
import {
  EASE_CB,
  themeSlideContainer,
  titleStyle,
  subtitleStyle,
  gridStyle,
  cardStyle,
  containerVariants,
  itemVariants,
  patterns,
} from "../../styles/slide25.bundle";

const AgenticPatternsSlide: React.FC = () => {
  return (
    <div style={themeSlideContainer}>
      {/* ambient orbs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.5, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          filter: "blur(30px)",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.28), transparent 60%)",
          top: 40,
          left: -80,
          pointerEvents: "none",
        }}
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.45, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          borderRadius: "50%",
          filter: "blur(34px)",
          background:
            "radial-gradient(circle, rgba(34,197,94,0.22), transparent 60%)",
          bottom: -60,
          right: -60,
          pointerEvents: "none",
        }}
      />

      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.6, ease: EASE_CB }}
        style={titleStyle}
      >
        Agentic AI Use Case Patterns
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        style={subtitleStyle}
      >
        Core design patterns for building capable and reliable autonomous AI agents.
      </motion.p>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        style={gridStyle}
      >
        {patterns.map(({ emoji, name, blurb, delay }) => (
          <motion.div
            key={name}
            variants={itemVariants}
            transition={{ delay }}
            whileHover={{
              y: -6,
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            }}
            style={cardStyle}
          >
            {/* Icon */}
            <motion.div
              aria-hidden
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: EASE_CB }}
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2rem)",
                width: 48,
                height: 48,
                display: "grid",
                placeItems: "center",
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(16,185,129,0.12))",
                border: "1px solid rgba(15,23,42,0.06)",
              }}
            >
              {emoji}
            </motion.div>

            {/* Heading */}
            <div
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.0rem, 1.6vw, 1.05rem)",
                color: "#0f172a",
                letterSpacing: 0.2,
              }}
            >
              {name}
            </div>

            {/* Blurb */}
            <div
              style={{
                color: "#334155",
                fontSize: "clamp(0.9rem, 1.4vw, 0.95rem)",
                lineHeight: 1.45,
              }}
            >
              {blurb}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer tip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          marginTop: 24,
          fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
          color: "#475569",
          textAlign: "center",
        }}
      >
        Tip: Combine patterns like Tool Augmentation and Human-in-the-Loop for robust solutions.
      </motion.div>
    </div>
  );
};

export default AgenticPatternsSlide;
