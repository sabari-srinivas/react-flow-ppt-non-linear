// src/styles/slide6.bundle.tsx
import React from "react";
import { motion } from "framer-motion";

/* ================== THEME COLORS (unchanged) ================== */
export const COLORS = {
  buildAI: "#0070c0",     // blue
  buildWithAI: "#ff7a00", // orange
  practitioner: "#2e7d32" // green
};

/* ================== Icons (Updated Tech Lead & Practitioner) ================== */
type IconProps = { color?: string };

export const DataEngineerIcon: React.FC<IconProps> = ({ color = COLORS.buildAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

export const DataScientistIcon: React.FC<IconProps> = ({ color = COLORS.buildAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v2m0 16v2m-9-9h2m16 0h2M5.64 5.64l1.41 1.41m10.3 10.3l1.41 1.41M5.64 18.36l1.41-1.41m10.3-10.3l1.41-1.41" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
  </svg>
);

export const AIEngineerIcon: React.FC<IconProps> = ({ color = COLORS.buildAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
    <text x="5" y="11" fontFamily="monospace" fontSize="7">1010</text>
    <text x="5" y="19" fontFamily="monospace" fontSize="7">1010</text>
  </svg>
);

export const DeveloperIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.56a1 1 0 0 1-.8 1.44H3.52a1 1 0 0 1-.8-1.44L4 16" />
  </svg>
);

// New Icon: Tie
export const TechLeadIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 5l-3 3 3 3" />
    <path d="M16 5l3 3-3 3" />
    <path d="M12 2v20" />
  </svg>
);

export const ArchitectIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12.38 12 17l10-4.62" />
    <path d="M2 8.38 12 13l10-4.62" />
    <path d="M12 2 2 7l10 5 10-5-10-5z" />
  </svg>
);

// New Icon: Brain
export const PractitionerIcon: React.FC<IconProps> = ({ color = COLORS.practitioner }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    <path d="M12 12v8" />
    <path d="M10 14h4" />
    <path d="M8 16h8" />
    <path d="M6 18h12" />
  </svg>
);

export const VibecoderIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h18" />
    <path d="M6 16h12" />
    <path d="M8 12h8" />
    <circle cx="4" cy="8" r="1.2" fill={color} />
    <circle cx="20" cy="16" r="1.2" fill={color} />
  </svg>
);

export const AIContentGenIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

/* ================== Styles ================== */
export const styles = {
  containerExtra: {
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden" as const,
    position: "relative" as const,
    background: "white",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000000",
  },

  headerH2: {
    fontSize: "2.7rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
    textAlign: "left" as const,
    color: "#4E83C3",
    position: "relative" as const,
    display: "inline-block",
    width: "auto",
    paddingBottom: "0.5rem",
  },

  headerUnderline: {
    display: "none",
  },

  mainGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "1rem",
    minHeight: 0,
    padding: "0.5rem 0",
    position: "relative" as const,
    zIndex: 1,
  },

  leftRows: { display: "grid", gridTemplateRows: "1fr 1fr", gap: 14, minHeight: 0 },

  decorativeBg: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    opacity: 0.1,
    background:
      "radial-gradient(circle at 20% 30%, rgba(100, 181, 246, 0.4) 0%, transparent 40%)",
  },
};

/* ================== Header motion ================== */
export const headerMotion = {
  titleInitial: { opacity: 0, y: -20 },
  titleAnimate: { opacity: 1, y: 0 },
  titleTransition: { duration: 0.6 },
  underlineInitial: { scaleX: 0 },
  underlineAnimate: { scaleX: 1 },
  underlineTransition: { duration: 0.6, delay: 0.3 },
};

/* ================== Keyframes (shimmer) ================== */
export const shimmerKeyframes = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(100%); }
}
`;

/* ================== Section + Role ================== */
type Theme = "blue" | "orange" | "green";

export const themeToColors = (theme: Theme) => {
  switch (theme) {
    case "orange":
      return {
        headerFrom: "#ffe0cc",
        headerTo: "#fff3e6",
        headerText: "#000000",
        accent: "rgba(255,122,0,0.45)",
        shimmer: "rgba(255, 186, 122, 0.35)",
        captionBg: "rgba(255, 239, 224, 0.9)",
        captionBorder: "rgba(255, 122, 0, 0.45)",
      };
    case "green":
      return {
        headerFrom: "#dff3e6",
        headerTo: "#eefaf2",
        headerText: "#000000",
        accent: "rgba(46,125,50,0.45)",
        shimmer: "rgba(178, 223, 186, 0.35)",
        captionBg: "rgba(232, 245, 233, 0.9)",
        captionBorder: "rgba(46, 125, 50, 0.45)",
      };
    default: // blue
      return {
        headerFrom: "#f0f5ff",
        headerTo: "#e9f0ff",
        headerText: "#000000",
        accent: "rgba(0,112,192,0.45)",
        shimmer: "rgba(120, 170, 240, 0.35)",
        captionBg: "rgba(240, 247, 255, 0.9)",
        captionBorder: "rgba(0, 112, 192, 0.45)",
      };
  }
};

export interface RoleProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
  durationSec?: number;
  accent?: string;
  active?: boolean;
}

export const Role: React.FC<RoleProps> = ({
  icon, title, desc, delay = 0, durationSec = 5, accent = COLORS.buildAI, active = false
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.98 }}
    animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
    transition={{ duration: durationSec, delay, ease: "easeOut" }}
    style={{
      flex: 1,
      minWidth: 140,
      padding: "0 8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center" as const,
      fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      color: "#000000",
    }}
    whileHover={active ? { y: -4, transition: { duration: 0.25 } } : {}}
  >
    <div style={{ marginBottom: 10, height: 48, display: "flex", alignItems: "center" }}>{icon}</div>
    <h3
      style={{
        fontSize: "1.3rem",
        fontWeight: 700,
        marginBottom: 6,
        color: "#000000",
        textTransform: "uppercase",
        borderBottom: `2px solid ${accent}`,
        paddingBottom: 4,
      }}
    >
      {title}
    </h3>
    <p style={{ fontSize: "1.1rem", color: "#000000", lineHeight: 1.35, margin: 0 }}>{desc}</p>
  </motion.div>
);

export interface SectionProps {
  title: string;
  caption: string;
  delay?: number;
  children: React.ReactNode;
  theme?: Theme;
  active?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  title, caption, delay = 0, children, theme = "blue", active = false
}) => {
  const C = themeToColors(theme);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
      style={{
        border: "1px solid rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        overflow: "hidden",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        background: "rgba(255, 255, 255, 0.85)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
        transition: "all 0.3s ease",
        backdropFilter: "blur(4px)",
        fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#000000",
      }}
    >
      <motion.div
        style={{
          padding: "12px 16px",
          background: `linear-gradient(90deg, ${C.headerFrom} 0%, ${C.headerTo} 100%)`,
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.5rem",
            color: "#000000",
            fontWeight: 700,
            letterSpacing: "0.3px",
            textTransform: "uppercase" as const,
            textShadow: "0 1px 1px rgba(255,255,255,0.8)",
          }}
        >
          {title}
        </h3>
      </motion.div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "16px 12px",
          position: "relative",
          overflow: "hidden",
          color: "#000000",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100%",
            background: `linear-gradient(90deg, transparent, ${C.shimmer}, transparent)`,
            transform: "translateX(-100%)",
            animation: "shimmer 2.5s infinite",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
        {children}
      </div>

      {/* FOOTER CAPTION — centered */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          padding: "8px 16px",
          borderTop: `1px dashed ${C.captionBorder}`,
          background: C.captionBg,
          color: "#000000",
          fontSize: "1.3rem",
          fontWeight: 700,
          textAlign: "center" as const,      // << centered
          display: "flex",
          justifyContent: "center",           // << centered
          alignItems: "center",
        }}
      >
        {caption}
      </motion.div>
    </motion.div>
  );
};
