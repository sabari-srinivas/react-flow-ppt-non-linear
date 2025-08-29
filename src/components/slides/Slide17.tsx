import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";
import mistyVideo from "../../Misty_Forest_Sunrise_Cinematic_Shot.mp4";

const promptText = `A cinematic shot of a young man walking through a misty forest at sunrise. The golden rays of sunlight filter through tall pine trees, creating dramatic beams of light. The camera slowly tracks forward from behind, with a smooth dolly effect, adding depth and atmosphere. The mood is calm, mystical, and inspiring, with soft natural colors and realistic textures. Ultra-detailed, photorealistic, 4K quality`;

function useDocumentVisible() {
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => {
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return visible;
}

const Slide17: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.6 }); // starts when ≥60% visible
  const pageVisible = useDocumentVisible();

  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Start typing only when in view & tab visible; reset when out of view so it replays on revisit
  useEffect(() => {
    if (!inView || !pageVisible) {
      // reset when not in view or tab hidden
      setTyping(false);
      setDisplayedText("");
      setShowVideo(false);
      return;
    }

    // begin typing sequence
    setTyping(true);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setDisplayedText(promptText.slice(0, i));
      if (i >= promptText.length) {
        clearInterval(interval);
        setTyping(false);
        const t = setTimeout(() => setShowVideo(true), 700);
        return () => clearTimeout(t);
      }
      return;
    }, 28);

    return () => clearInterval(interval);
  }, [inView, pageVisible]);

  const rowStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    alignItems: "stretch",
    justifyContent: "center",
    padding: "20px",
    boxSizing: "border-box",
  };

  const cardBase: React.CSSProperties = {
    flex: "1 1 420px",
    minWidth: 320,
    maxWidth: 560,
    background: "#fff",
    borderRadius: 20,
    padding: 20,
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
  };

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        ...slideContainer,
        background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
        padding: "0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <motion.h2
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          ...titleStyle,
          fontSize: "3rem",
          marginBottom: 28,
          background:
            "linear-gradient(90deg, #1e3a8a, #3b82f6, #10b981, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        Video Generation by Veo3
      </motion.h2>

      <div style={rowStyle}>
        {/* Prompt card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            ...cardBase,
            boxShadow: "0 20px 40px rgba(37, 99, 235, 0.18)",
            border: "2px solid #2563eb",
          }}
        >
          <div
            style={{
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#2563eb",
              marginBottom: 12,
            }}
          >
            Prompt
          </div>

          <motion.div
            key={inView ? "typing-on" : "typing-off"}
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: 14,
              padding: "14px 16px",
              color: "#0f172a",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 15,
              lineHeight: 1.5,
              minHeight: 180,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
              overflowY: "auto",
            }}
          >
            {displayedText}
            <span
              style={{
                opacity: typing ? 0.7 : 0,
                transition: "opacity .2s",
                marginLeft: 2,
              }}
            >
              |
            </span>
          </motion.div>

          {/* Subtle animated border glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: 22,
              pointerEvents: "none",
              boxShadow:
                "0 0 0 0 rgba(37,99,235,0.0), 0 0 30px 2px rgba(37,99,235,0.18)",
            }}
          />
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            ...cardBase,
            boxShadow: "0 20px 40px rgba(5, 150, 105, 0.18)",
            border: "2px solid #059669",
          }}
        >
          <div
            style={{
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#059669",
              marginBottom: 12,
            }}
          >
            Generated Video
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              borderRadius: 14,
              overflow: "hidden",
              background: "#0b1220",
              border: "1px solid rgba(0,0,0,0.06)",
              minHeight: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {showVideo ? (
              <motion.video
                key="video"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={mistyVideo}
                controls
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  repeatType: "mirror",
                }}
                style={{ color: "#cbd5e1", fontSize: 14 }}
              >
                Preparing preview…
              </motion.div>
            )}
          </div>

          {/* Subtle animated border glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: 22,
              pointerEvents: "none",
              boxShadow:
                "0 0 0 0 rgba(5,150,105,0.0), 0 0 30px 2px rgba(5,150,105,0.18)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide17;
