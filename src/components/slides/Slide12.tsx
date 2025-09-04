import { motion } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

const Slide12 = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        ...slideContainer,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        padding: '40px 60px',
      }}
    >
      {/* Title */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          fontSize: '4rem',
          fontWeight: 900,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #1e3a8a, #3b82f6, #10b981, #f59e0b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Generative AI
      </motion.h1>
    </motion.div>
  );
};

export default Slide12;
