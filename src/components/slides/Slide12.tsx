import { motion } from 'framer-motion';
import { styles, variants } from '../../styles/slide12.bundle';

const Slide12 = () => {
  return (
    <motion.div
      variants={variants.container}
      initial="hidden"
      animate="show"
      exit="exit"
      style={styles.wrapper}
    >
      <motion.h1 variants={variants.title} style={styles.title}>
        Generative AI
      </motion.h1>
    </motion.div>
  );
};

export default Slide12;
