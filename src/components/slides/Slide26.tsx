import { motion } from "framer-motion";
import {
  slide28Container,
  thankYouTitle,
  subtitleText,
  EASE,
} from "../../styles/slide28.bundle";

const Slide28 = () => {
  return (
    <div style={slide28Container}>
      {/* Title */}
      <motion.h1
        style={thankYouTitle}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE }}
      >
        Thank You
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        style={subtitleText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: EASE }}
      >
        Questions?
      </motion.p>
    </div>
  );
};

export default Slide28;
