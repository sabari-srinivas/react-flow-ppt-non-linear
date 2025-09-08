import { motion } from "framer-motion";
import {
  slide28Container,
  thankYouTitle,
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

  
    </div>
  );
};

export default Slide28;
