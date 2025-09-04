import { motion } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";

const Slide15 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        ...slideContainer,
        background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
        padding: "40px 60px",
      }}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          ...titleStyle,
          fontSize: "3rem",
          marginBottom: "50px",
          background:
            "linear-gradient(90deg, #7c3aed, #2563eb, #059669, #f59e0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Generative AI Model Types
      </motion.h2>

      {/* Grid Layout - Diffusion centered */}
      <div
        style={{
          display: "grid",
          gridTemplateAreas: `
            "gans diffusion vae"
            ". transformers ."
          `,
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
          justifyItems: "center",
        }}
      >
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
              <Box label="Generator" color="#3b82f6" x={[0, 50, 0]} />
              <Arrow />
              <Box label="Discriminator" color="#ef4444" x={[0, -50, 0]} />
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
              {[0.2, 0.5, 1].map((opacity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
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
              <Box label="Encoder" color="#10b981" x={[0, 40]} />
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
              <Box label="Decoder" color="#f59e0b" x={[0, -40]} />
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
                  key={i}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    background: "#7c3aed",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  {token}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Closing Summary */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          marginTop: "60px",
          fontSize: "1.2rem",
          fontWeight: 500,
          color: "#1f2937",
          textAlign: "center",
          maxWidth: "800px",
          marginInline: "auto",
        }}
      >
        Different models, same mission: <span style={{ color: "#2563eb" }}>teaching machines to create</span> — whether by competing, compressing, attending, or refining.
      </motion.p>
    </motion.div>
  );
};

/* 🔹 Reusable Card wrapper */
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
    initial={{ scale: 0.9, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.7 }}
    style={{
      background: "white",
      borderRadius: "16px",
      padding: "25px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      textAlign: "center",
      width: 320,
    }}
  >
    <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "20px" }}>
      {title}
    </h3>
    {children}
    <p style={{ marginTop: "20px", fontSize: "0.95rem", color: "#374151" }}>
      {desc}
    </p>
  </motion.div>
);

/* 🔹 Reusable Box */
const Box = ({
  label,
  color,
  x,
}: {
  label: string;
  color: string;
  x: number[];
}) => (
  <motion.div
    animate={{ x }}
    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
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

/* 🔹 Animated Arrow (SVG for clarity) */
const Arrow = () => (
  <motion.svg
    width="30"
    height="20"
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 1.5, repeat: Infinity }}
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
