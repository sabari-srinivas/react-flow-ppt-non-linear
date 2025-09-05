import { motion } from "framer-motion";
import { slideContainer } from "../../styles/slideStyles";
import {
  slide21Container,
  titleStyle,
  subtitleStyle,
  titleVariants,
  subtitleVariants,
} from "../../styles/slide21.bundle";

const Slide21 = () => {
  return (
    <div style={{ ...slideContainer, ...slide21Container }}>
      {/* Title */}
      <motion.h1
        style={titleStyle}
        variants={titleVariants}
        initial="initial"
        animate="animate"
      >
        Agentic AI
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        style={subtitleStyle}
        variants={subtitleVariants}
        initial="initial"
        animate="animate"
      >
        Autonomous AI Systems
      </motion.p>
    </div>
  );
};

export default Slide21;
