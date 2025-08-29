import { motion } from "framer-motion";
import { useState } from "react";
import { slideContainer, titleStyle } from "../../styles/slideStyles";

type Segment = "energy" | "trade" | "compute" | "skill";

interface Marker {
  x: number; // position along bar (0–100)
  year: string;
  title: string;
  align: "top" | "bottom";
  segment: Segment;
}

const markers: Marker[] = [
  { x: 12, year: "1800s", title: "Water Textiles\n& Iron", align: "top", segment: "energy" },
  { x: 28, year: "1900s", title: "Steam,\nRailway & Steel", align: "bottom", segment: "energy" },
  { x: 48, year: "1920s", title: "Electricity,\nChemicals & Cars", align: "top", segment: "trade" },
  { x: 67, year: "1980s", title: "Oil,\nElectronics & Aviation", align: "bottom", segment: "trade" },
  { x: 82, year: "2010s", title: "Software,\nInternet & Social Media", align: "top", segment: "compute" },
  { x: 93, year: "2020s", title: "AI & Robots", align: "bottom", segment: "skill" },
];

// Solid colors
const segmentColor: Record<Segment, string> = {
  energy: "#FFA500", // Orange
  trade: "#E91E63", // Pink
  compute: "#2196F3", // Blue
  skill: "#009688", // Teal
};

// Gradient backgrounds for hover effect
const gradientBg: Record<Segment, string> = {
  energy: "linear-gradient(135deg, #FFB347, #FF8C00)",
  trade: "linear-gradient(135deg, #F48FB1, #E91E63)",
  compute: "linear-gradient(135deg, #64B5F6, #2196F3)",
  skill: "linear-gradient(135deg, #80CBC4, #009688)",
};

export default function Slide3() {
  const [hoveredSegment, setHoveredSegment] = useState<Segment | null>(null);

  return (
    <div style={slideContainer}>
      {/* Title */}
      <h1
        style={{
          ...titleStyle,
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(92vw, 1000px)",
          textAlign: "center",
          margin: 0,
          lineHeight: 1.15,
          zIndex: 2,
          pointerEvents: "none",
          fontSize: "clamp(20px, 4vw, 36px)",
        }}
      >
        Technology Era: 1700s → 2020s
      </h1>

      {/* Timeline Container */}
      <div
        style={{
          position: "absolute",
          top: "calc(50% + 60px)",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Year Labels on the bar */}
        <div
          style={{
            position: "absolute",
            top: -30,
            left: 0,
            fontSize: 12,
            fontWeight: 800, // bolder
            color: "#ddd",
            letterSpacing: 0.4,
          }}
        >
          1700
        </div>
        <div
          style={{
            position: "absolute",
            top: -30,
            right: 0,
            fontSize: 12,
            fontWeight: 800, // bolder
            color: "#ddd",
            letterSpacing: 0.4,
          }}
        >
          2020
        </div>

        {/* Main Timeline Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            height: 20,
            borderRadius: 10,
            overflow: "hidden",
            position: "relative",
            transformOrigin: "left",
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            width: "100%",
          }}
        >
          {/* Segments */}
          <div
            style={{
              position: "absolute",
              left: 0,
              width: "40%",
              height: "100%",
              background: hoveredSegment === "energy" ? gradientBg.energy : "linear-gradient(90deg, #FFA500, #FF8C00)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "40%",
              width: "35%",
              height: "100%",
              background: hoveredSegment === "trade" ? gradientBg.trade : "linear-gradient(90deg, #E91E63, #D84315)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "75%",
              width: "15%",
              height: "100%",
              background: hoveredSegment === "compute" ? gradientBg.compute : "linear-gradient(90deg, #2196F3, #1976D2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "90%",
              width: "10%",
              height: "100%",
              background: hoveredSegment === "skill" ? gradientBg.skill : "linear-gradient(90deg, #009688, #00796B)",
            }}
          />
        </motion.div>

        {/* Segment Labels */}
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "20%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 700, // a bit bolder
            color: "#FFD700",
            whiteSpace: "nowrap",
          }}
        >
          Energy
        </div>
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "57.5%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 700, // a bit bolder
            color: "#FF69B4",
            whiteSpace: "nowrap",
          }}
        >
          Trade
        </div>
        {/* Moved BELOW the blue bar for clarity */}
        <div
          style={{
            position: "absolute",
            top: 28, // below the timeline bar so it's visible
            left: "82.5%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 800, // strong emphasis for clarity
            color: "#42A5F5",
            whiteSpace: "nowrap",
            textShadow: "0 1px 2px rgba(0,0,0,0.25)",
          }}
        >
          Compute &amp; Comms
        </div>
        <div
          style={{
            position: "absolute",
            top: -40,
            left: "95%",
            transform: "translateX(-50%)",
            fontSize: 14,
            fontWeight: 700, // a bit bolder
            color: "#80CBC4",
            whiteSpace: "nowrap",
          }}
        >
          Skill
        </div>

        {/* Markers */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          style={{ position: "absolute", width: "100%" }}
        >
          {markers.map((m, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
              style={{
                position: "absolute",
                left: `${m.x}%`,
                transform: "translateX(-50%)",
                textAlign: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
              onMouseEnter={() => setHoveredSegment(m.segment)}
              onMouseLeave={() => setHoveredSegment(null)}
              aria-label={`${m.year}: ${m.title.replace("\n", " ")}`}
            >
              {/* Connector Line */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: m.align === "top" ? -60 : 20,
                  width: 2,
                  height: 60,
                  background: hoveredSegment === m.segment ? segmentColor[m.segment] : "#ccc",
                  borderRadius: 1,
                }}
              />

              {/* Year Circle */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: m.align === "top" ? -110 : 80,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: `2px solid ${hoveredSegment === m.segment ? "#fff" : segmentColor[m.segment]}`,
                  background: gradientBg[m.segment],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                  boxShadow:
                    hoveredSegment === m.segment
                      ? `0 0 18px ${segmentColor[m.segment]}aa`
                      : "0 2px 6px rgba(0,0,0,0.3)",
                  transition: "all 0.3s ease",
                }}
              >
                {m.year}
              </div>

              {/* Title (outside the circle) */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  top: m.align === "top" ? -170 : 150,
                  width: 150,
                  color: "#2b2b2b",
                  fontSize: 12,
                  lineHeight: 1.4,
                  fontWeight: 700, // made a little bolder
                  whiteSpace: "pre-line",
                  textAlign: "center",
                  textShadow: "0 1px 1px rgba(0,0,0,0.05)",
                }}
              >
                {m.title}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
