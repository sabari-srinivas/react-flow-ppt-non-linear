// src/styles/whatsnew.bundle.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ========== Types you may import in the slide file ========== */
export type Startup = {
  name: string;
  description: string;
  logo: string;
  delay: number;
};

export type Flash = {
  headline: string;
  example: string;
  steps: string[];
};

/* ========== Motion variants (exact values) ========== */
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const modalVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export const containerMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.8 },
};

export const titleMotion = {
  initial: { y: -40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const cardEnter = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

/* ========== Styles (Nunito Sans + white bg + black text) ========== */
export const styles = {
  root: {
    backgroundColor: "#ffffff", // was #f8f9fa
    padding: "40px 48px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    gap: 40,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000000", // default text color black
  },
  titleH2: {
    fontSize: "2.8rem",
    color: "#4e83c3", // black
    marginBottom: 10,
    textAlign: "center" as const,
  },
  row1: {
    display: "flex",
    justifyContent: "center" as const,
    gap: 40,
    flexWrap: "wrap" as const,
    width: "100%",
    maxWidth: 1000,
  },
  row2: {
    display: "flex",
    justifyContent: "center" as const,
    gap: 40,
    flexWrap: "wrap" as const,
    width: "100%",
    maxWidth: 700,
    marginTop: 10,
  },
  card: {
    flex: "1 1 0",
    maxWidth: 280,
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center" as const,
    justifyContent: "flex-start" as const,
    padding: 24,
    textAlign: "center" as const,
    border: "2px solid #4e83c3",
    minHeight: 260,
    margin: "0 auto",
    transition: "all 0.25s ease",
    cursor: "pointer",
    outline: "none",
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  cardImg: {
    width: 110,
    height: 110,
    marginBottom: 16,
    borderRadius: 16,
    objectFit: "contain" as const,
    background: "#ffffff",
    padding: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  modalBackdrop: {
    position: "fixed" as const,
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center" as const,
    justifyContent: "center" as const,
    zIndex: 50,
  },
  modal: {
    width: "min(720px, 92vw)",
    borderRadius: 16,
    background: "#fff",
    boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
    padding: 24,
    position: "relative" as const,
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  closeBtn: {
    position: "absolute" as const,
    top: 10,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "#fff",
    cursor: "pointer",
    fontSize: 18,
  },
  modalH3: {
    margin: 0,
    fontSize: "1.55rem",
    color: "#000000", // black
    fontWeight: 700,
  },
  modalP: { marginTop: 6, color: "#000000" }, // black
  exampleBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
  },
  exampleStrong: { color: "#000000" }, // black
  exampleText: { marginTop: 6, color: "#000000" }, // black
  stepsWrap: { marginTop: 18 },
  stepsStrong: { color: "#000000" }, // black
  stepsList: { marginTop: 8, color: "#000000", lineHeight: 1.55 }, // black
  stepsLi: { marginBottom: 6 },
  cardTitle: { margin: 0, color: "#000000", fontSize: "1.4rem", fontWeight: 700, letterSpacing: 0.2 }, // black
  cardDesc: { fontSize: "1rem", marginTop: 8, color: "#000000", lineHeight: 1.45 }, // black
};

/* ========== UI components (same visuals/animations) ========== */
export const Card: React.FC<
  Startup & { onOpen: (name: string) => void }
> = ({ logo, name, description, delay, onOpen }) => (
  <motion.div
    initial={cardEnter(delay).initial}
    animate={cardEnter(delay).animate}
    transition={cardEnter(delay).transition}
    whileHover={{ y: -10, scale: 1.05, boxShadow: "0 18px 36px rgba(0,0,0,0.15)" }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onOpen(name)}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen(name);
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`${name} details`}
    style={styles.card}
  >
    <motion.img
      src={logo}
      alt={name}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: delay + 0.1 }}
      style={styles.cardImg}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f4bb.svg";
      }}
    />
    <h3 style={styles.cardTitle}>{name}</h3>
    <p style={styles.cardDesc}>{description}</p>
  </motion.div>
);

export const FlashCard: React.FC<{
  openName: string | null;
  onClose: () => void;
  content: Record<string, Flash>;
}> = ({ openName, onClose, content }) => {
  const data = openName ? content[openName] : undefined;

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (openName) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openName, onClose]);

  return (
    <AnimatePresence>
      {openName && data && (
        <motion.div
          key="backdrop"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={styles.modalBackdrop}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            key="modal"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            style={styles.modal}
          >
            <button onClick={onClose} aria-label="Close" style={styles.closeBtn}>
              ✕
            </button>

            <h3 style={styles.modalH3}>{openName}</h3>
            <p style={styles.modalP}>{data.headline}</p>

            <div style={styles.exampleBox}>
              <strong style={styles.exampleStrong}>Example:</strong>
              <div style={styles.exampleText}>{data.example}</div>
            </div>

            <div style={styles.stepsWrap}>
              <strong style={styles.stepsStrong}>How it works</strong>
              <ul style={styles.stepsList}>
                {data.steps.map((s, idx) => (
                  <li key={idx} style={styles.stepsLi}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
