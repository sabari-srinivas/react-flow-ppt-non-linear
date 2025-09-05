// src/styles/Slide15.bundle.tsx
import type {
    Variants,
    Transition,
    RepeatType,
    HTMLMotionProps,
    SVGMotionProps,
  } from "framer-motion";
  
  /** Layout container for Slide 15 */
  export const slide15Container: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing: "border-box",
    background: "#ffffff", // white background
    padding: "40px 60px",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000000",
  };
  
  /** Title overrides (merge with global titleStyle) */
  export const slide15Title: React.CSSProperties = {
    fontSize: "3rem",
    marginBottom: "50px",
    color: "#000000", // black text
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };
  
  /** Grid with Diffusion centered */
  export const modelsGrid: React.CSSProperties = {
    display: "grid",
    gridTemplateAreas: `
      "gans diffusion vae"
      ". transformers ."
    `,
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    justifyItems: "center",
  };
  
  /** Card + typography */
  export const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    textAlign: "center",
    width: 320,
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#000000",
  };
  
  export const h3Style: React.CSSProperties = {
    fontSize: "1.4rem",
    fontWeight: 600,
    marginBottom: "20px",
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };
  
  export const descStyle: React.CSSProperties = {
    marginTop: "20px",
    fontSize: "0.95rem",
    color: "#000000",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };
  
  export const tokenTile: React.CSSProperties = {
    width: 60,
    height: 60,
    borderRadius: 10,
    background: "#000000", // solid black tile background
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: "0.9rem",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };
  
  export const summaryText: React.CSSProperties = {
    marginTop: "60px",
    fontSize: "1.2rem",
    fontWeight: 500,
    color: "#000000",
    textAlign: "center",
    maxWidth: "800px",
    marginInline: "auto",
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  };
  
  /* ------------------ Framer Motion (animations only) ------------------ */
  export const rootFade: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0 },
  };
  
  export const titleIn: Variants = {
    initial: { y: -30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  
  export const cardIn: Variants = {
    initial: { scale: 0.9, opacity: 0 },
    whileInView: { scale: 1, opacity: 1, transition: { duration: 0.7 } },
  };
  
  const repeatReverse: RepeatType = "reverse";
  
  /** Arrow wiggle props */
  export const arrowWiggleProps: Pick<
    SVGMotionProps<SVGSVGElement>,
    "animate" | "transition"
  > = {
    animate: { x: [0, 5, 0] },
    transition: { duration: 1.5, repeat: Infinity },
  };
  
  /** Horizontal oscillation for the colored boxes */
  export const getBoxOscillateProps = (
    distance = 40,
    reverse = false
  ): Pick<HTMLMotionProps<"div">, "animate" | "transition"> => {
    const transition: Transition = {
      duration: 2,
      repeat: Infinity,
      repeatType: repeatReverse,
    };
    return {
      animate: { x: reverse ? [0, -distance, 0] : [0, distance, 0] },
      transition,
    };
  };
  
  /** Diffusion square fade pulsation */
  export const getDiffusionSquareProps = (
    index: number
  ): Pick<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> => ({
    initial: { opacity: 0.2 },
    animate: { opacity: [0.2, 1, 0.2] },
    transition: { duration: 2, repeat: Infinity, delay: index * 0.5 },
  });
  
  /** Transformer token pulse */
  export const getTransformersPulseProps = (
    index: number
  ): Pick<HTMLMotionProps<"div">, "animate" | "transition"> => ({
    animate: { scale: [1, 1.3, 1] },
    transition: { duration: 1.5, repeat: Infinity, delay: index * 0.2 },
  });
  
  export const summaryIn: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } },
  };
  