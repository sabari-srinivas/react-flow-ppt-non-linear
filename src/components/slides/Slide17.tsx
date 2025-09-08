import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, cubicBezier } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";
import { S17 } from "../../styles/slide17.bundle";
import mistyVideo from "../../Misty_Forest_Sunrise_Cinematic_Shot.mp4";

// use cubicBezier to satisfy TS-friendly easing if needed
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

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
  const inView = useInView(rootRef, { amount: 0.6 });
  const pageVisible = useDocumentVisible();

  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // type when visible; reset when hidden/out of view
  useEffect(() => {
    if (!inView || !pageVisible) {
      setTyping(false);
      setDisplayedText("");
      setShowVideo(false);
      return;
    }
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
    }, 28);
    return () => clearInterval(interval);
  }, [inView, pageVisible]);

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{ ...slideContainer, ...S17.container }}
    >
      <motion.h2
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        style={{ ...titleStyle, ...S17.title }}
      >
        Video Generation by Veo3
      </motion.h2>

      <div style={S17.row}>
        {/* Prompt card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            ...S17.cardBase,
            
            border: "2px solid #2563eb",
          }}
        >
          <div style={S17.cardTitleBlue}>Prompt</div>

          <motion.div
            key={inView ? "typing-on" : "typing-off"}
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={S17.promptBox}
          >
            {displayedText}
            <span
              style={{
                opacity: typing ? 0.7 : 0, // dynamic
                transition: "opacity .2s",
                marginLeft: 2,
              }}
            >
              |
            </span>
          </motion.div>

          {/* blue glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={S17.blueGlow}
          />
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            ...S17.cardBase,
            
            border: "2px solid #059669",
          }}
        >
          <div style={S17.cardTitleGreen}>Generated Video</div>

          <div style={S17.videoShell}>
            {showVideo ? (
              <motion.video
                key="video"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={mistyVideo}
                controls
                style={S17.videoEl}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.2, repeatType: "mirror" }}
                style={S17.loadingText}
              >
                Preparing preview…
              </motion.div>
            )}
          </div>

          {/* green glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            style={S17.greenGlow}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide17;
