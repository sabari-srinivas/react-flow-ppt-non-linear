'use client';

import { motion } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";
import {
  slide15Container,
  slide15Title,
  modelsGrid,
  cardStyle,
  h3Style,
  descStyle,
  tokenTile,
  summaryText,
  rootFade,
  titleIn,
  cardIn,
  arrowWiggleProps,
  getBoxOscillateProps,
  getDiffusionSquareProps,
  getTransformersPulseProps,
  summaryIn,
} from "../../styles/slide15.bundle";

const Slide15 = () => {
  return (
    <motion.div
      variants={rootFade}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ ...slideContainer, ...slide15Container }}
    >
      {/* Title */}
      <motion.h2 variants={titleIn} style={{ ...titleStyle, ...slide15Title }}>
        Generative AI Model Types
      </motion.h2>

      {/* Grid Layout - Diffusion centered */}
      <div style={modelsGrid}>
        {/* GANs */}
        <div style={{ gridArea: "gans" }}>
          <Card
            title="GANs"
            desc="Two models challenge each other until results look real. Like an art contest."
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box label="Generator" color="#3b82f6" distance={50} />
              <Arrow />
              <Box label="Discriminator" color="#ef4444" distance={50} reverse />
            </div>
          </Card>
        </div>

        {/* Diffusion (center spotlight) */}
        <div style={{ gridArea: "diffusion" }}>
          <Card
            title="Diffusion Models"
            desc="They start with noise and refine step by step. Like sharpening a blurry photo."
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  {...getDiffusionSquareProps(i)}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 8,
                    background: "#2563eb",
                  }}
                />
              ))}
            </div>
          </Card>
        </div>

        {/* VAEs */}
        <div style={{ gridArea: "vae" }}>
          <Card
            title="VAEs"
            desc="They shrink data, store it, then rebuild. Like zipping & unzipping a file."
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box label="Encoder" color="#10b981" distance={40} />
              <Arrow />
              <motion.div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#6b7280",
                  margin: "0 10px",
                }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Arrow />
              <Box label="Decoder" color="#f59e0b" distance={40} reverse />
            </div>
          </Card>
        </div>

        {/* Transformers */}
        <div style={{ gridArea: "transformers" }}>
          <Card
            title="Transformers"
            desc="They look at all words at once. Like reading a whole paragraph, not just one word."
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 60px)",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {["A", "B", "C", "D", "E", "F"].map((token, i) => (
                <motion.div
                  key={token}
                  {...getTransformersPulseProps(i)}
                  style={tokenTile}
                >
                  {token}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Closing Summary */}
      <motion.p variants={summaryIn} style={summaryText}>
        Different models, same mission:{" "}
        <span style={{ color: "#2563eb" }}>teaching machines to create</span> — whether by competing, compressing, attending, or refining.
      </motion.p>
    </motion.div>
  );
};

/* ────────── Content-only subcomponents (no CSS/animation definitions here) ────────── */
const Card = ({
  title,
  children,
  desc,
}: {
  title: string;
  children: React.ReactNode;
  desc: string;
}) => (
  <motion.div
    variants={cardIn}
    initial="initial"
    whileInView="whileInView"
    style={cardStyle}
  >
    <h3 style={h3Style}>{title}</h3>
    {children}
    <p style={descStyle}>{desc}</p>
  </motion.div>
);

const Box = ({
  label,
  color,
  distance = 40,
  reverse = false,
}: {
  label: string;
  color: string;
  distance?: number;
  reverse?: boolean;
}) => (
  <motion.div
    {...getBoxOscillateProps(distance, reverse)}
    style={{
      width: 110,
      height: 60,
      borderRadius: 10,
      background: color,
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 500,
      margin: "0 10px",
    }}
  >
    {label}
  </motion.div>
);

const Arrow = () => (
  <motion.svg
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...arrowWiggleProps}
    style={{ margin: "0 10px" }}
  >
    <path
      d="M0 10 H25 M20 5 L25 10 L20 15"
      stroke="#374151"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </motion.svg>
);

export default Slide15;
