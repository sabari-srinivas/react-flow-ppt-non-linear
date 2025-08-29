import { motion } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

const Slide21 = () => {
  return (
    <div
      style={{
        ...slideContainer,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
        height: '100%',
      }}
    >
      {/* Title */}
      <motion.h1
        style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#0d1b2a',
        }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Agentic AI
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        style={{
          fontSize: '2rem',
          fontWeight: 500,
          marginTop: '10px',
          color: '#1b263b',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Autonomous AI Systems
      </motion.p>
    </div>
  );
};

export default Slide21;
