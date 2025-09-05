import { motion, cubicBezier } from "framer-motion";
import { slideContainer, titleStyle } from "../../styles/slideStyles";
import { SIE } from "../../styles/slide18.bundle";

type Startup = {
  name: string;
  description: string;
  logo: string;
  delay: number;
};

// TS-safe easing instead of the string "easeOut"
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

const Card = ({ logo, name, description, delay }: Startup) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    whileHover={{
      y: -10,
      scale: 1.05,
      boxShadow: "0 18px 36px rgba(0,0,0,0.15)",
    }}
    style={SIE.card}
  >
    <motion.img
      src={logo}
      alt={name}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: delay + 0.1, ease: EASE_OUT }}
      style={SIE.logo}
      onError={(e) => {
        const img = e.currentTarget as HTMLImageElement;
        img.src =
          "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f4bb.svg";
      }}
    />
    <h3 style={SIE.name}>{name}</h3>
    <p style={SIE.desc}>{description}</p>
  </motion.div>
);

const IndianGenAISlide = () => {
  const startups: Startup[] = [
    {
      name: "Sarvam AI",
      description: "Open-source Hindi AI models",
      logo:
        "https://pbs.twimg.com/profile_images/1733035250408935424/-FNrHc2E_400x400.jpg",
      delay: 0.2,
    },
    {
      name: "Dave.AI",
      description: "AI personalization for retail",
      logo:
        "data:image/png;base64,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",
      delay: 0.3,
    },
    {
      name: "Paraspeak",
      description: "AI for speech disorders",
      logo:
        "https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f5e3.svg",
      delay: 0.4,
    },
    {
      name: "Almonds AI",
      description: "Loyalty & analytics AI",
      logo:
        "data:image/png;base64,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",
      delay: 0.5,
    },
    {
      name: "KOGO AI",
      description: "Enterprise engagement AI",
      logo:
        "data:image/png;base64,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",
      delay: 0.6,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      style={{ ...slideContainer, ...SIE.root }}
    >
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        style={{ ...titleStyle, ...SIE.title }}
      >
        Indian Gen AI Ecosystem
      </motion.h2>

      {/* Row 1 – first 3 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        style={{ ...SIE.row, ...SIE.rowMax1000 }}
      >
        {startups.slice(0, 3).map((s) => (
          <Card key={s.name} {...s} />
        ))}
      </motion.div>

      {/* Row 2 – next 2 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        style={{ ...SIE.row, ...SIE.rowMax700 }}
      >
        {startups.slice(3).map((s) => (
          <Card key={s.name} {...s} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default IndianGenAISlide;
