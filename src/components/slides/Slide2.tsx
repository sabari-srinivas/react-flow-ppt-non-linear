
import React from 'react';
import { motion } from 'framer-motion';
import { slideContainer, titleStyle, subtitleStyle, cardContainer, cardStyle, cardTitleStyle, cardTextStyle } from '../../styles/slideStyles';

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: { opacity: 1, scale: 1, y: 0 },
};

const hoverMotion = { whileHover: { scale: 1.03, boxShadow: '0 0 18px rgba(56,189,248,0.3)' }, whileTap: { scale: 0.99 } };

function AnimatedBrain() {
  return (
    <svg width="80" height="80" viewBox="0 0 72 72" fill="none">
      <motion.circle 
        cx="36" 
        cy="36" 
        r="28" 
        stroke="#3b82f6" 
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.circle
          key={`b${i}`}
          r="4"
          fill="#3b82f6"
          initial={{ cx: 18, cy: 36, opacity: 0 }}
          animate={{ 
            cx: [18, 36, 54, 36, 18], 
            cy: [36, 18, 36, 54, 36], 
            opacity: [0, 1, 0.8, 0.6, 0] 
          }}
          transition={{ 
            duration: 3, 
            delay: i * 0.2, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      ))}
    </svg>
  );
}

function AnimatedPuzzle() {
  return (
    <svg width="80" height="80" viewBox="0 0 72 72" fill="none">
      <motion.rect 
        x="10" y="10" 
        width="24" height="24" 
        rx="6" 
        fill="#10b981" 
        initial={{ x: 6, y: 6, rotate: -8, opacity: 0 }} 
        animate={{ 
          x: [6, 10, 10], 
          y: [6, 10, 10], 
          rotate: [-8, 2, 0], 
          opacity: [0, 0.8, 1] 
        }} 
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          repeatType: 'reverse' 
        }} 
      />
      <motion.rect 
        x="38" y="10" 
        width="24" height="24" 
        rx="6" 
        fill="#10b981" 
        initial={{ x: 44, y: 6, rotate: 8, opacity: 0 }} 
        animate={{ 
          x: [44, 38, 38], 
          y: [6, 10, 10], 
          rotate: [8, -2, 0], 
          opacity: [0, 0.8, 1] 
        }} 
        transition={{ 
          duration: 1, 
          delay: 0.2, 
          repeat: Infinity, 
          repeatType: 'reverse' 
        }} 
      />
      <motion.rect 
        x="10" y="38" 
        width="24" height="24" 
        rx="6" 
        fill="#10b981" 
        initial={{ x: 6, y: 44, rotate: 6, opacity: 0 }} 
        animate={{ 
          x: [6, 10, 10], 
          y: [44, 38, 38], 
          rotate: [6, -1, 0], 
          opacity: [0, 0.8, 1] 
        }} 
        transition={{ 
          duration: 1, 
          delay: 0.4, 
          repeat: Infinity, 
          repeatType: 'reverse' 
        }} 
      />
      <motion.rect 
        x="38" y="38" 
        width="24" height="24" 
        rx="6" 
        fill="#10b981" 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ 
          scale: [0.8, 1.05, 1], 
          opacity: [0, 0.9, 1] 
        }} 
        transition={{ 
          duration: 1, 
          delay: 0.6, 
          repeat: Infinity, 
          repeatType: 'reverse' 
        }} 
      />
    </svg>
  );
}

function AnimatedLoop() {
  return (
    <svg width="80" height="80" viewBox="0 0 72 72" fill="none">
      <motion.path 
        d="M36 12 A 24 24 0 1 1 35.99 12" 
        stroke="#f59e0b" 
        strokeWidth="4" 
        strokeLinecap="round" 
        fill="transparent" 
        initial={{ pathLength: 0.25, rotate: 0, opacity: 0.8 }} 
        animate={{ 
          pathLength: 1, 
          rotate: 360, 
          opacity: [0.8, 1, 0.8] 
        }} 
        transition={{ 
          duration: 2.2, 
          ease: 'linear', 
          repeat: Infinity,
          opacity: {
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }
        }} 
      />
      <motion.circle 
        r="4" 
        fill="#f59e0b" 
        initial={{ 
          cx: 36, 
          cy: 12, 
          scale: 0.8 
        }} 
        animate={{ 
          cx: [36, 60, 36, 12, 36], 
          cy: [12, 36, 60, 36, 12],
          scale: [0.8, 1.2, 0.8]
        }} 
        transition={{ 
          duration: 2.2, 
          ease: 'easeInOut', 
          repeat: Infinity,
          scale: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }
        }} 
      />
    </svg>
  );
}

const CardBox = ({ title, text, icon, delay = 0 }: { title: string, text: string, icon: React.ReactNode, delay?: number }) => (
  <motion.div 
    variants={itemVariants} 
    transition={{ delay }}
    style={{
      ...cardStyle,
      padding: '30px',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}
  >
    <motion.div {...hoverMotion}>
      <div style={{ marginBottom: '20px' }}>{icon}</div>
      <h3 style={{ ...cardTitleStyle, marginBottom: '15px' }}>{title}</h3>
      <p style={cardTextStyle}>{text}</p>
    </motion.div>
  </motion.div>
);

const Slide2 = () => {
  return (
    <motion.div 
      style={slideContainer} 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      transition={{ staggerChildren: 0.12, duration: 0.5 }}
    >
      <motion.h1 
        style={titleStyle} 
        variants={itemVariants} 
        transition={{ duration: 0.4 }}
      >
        What is AI?
      </motion.h1>
      <motion.p 
        style={subtitleStyle} 
        variants={itemVariants} 
        transition={{ duration: 0.4 }}
      >
        Machines simulating human-like intelligence to learn, reason, and adapt.
      </motion.p>
      <div style={cardContainer}>
        <CardBox 
          title="Learning" 
          text="AI systems improve their performance by learning from data patterns and experiences." 
          icon={<AnimatedBrain />} 
          delay={0.1} 
        />
        <CardBox 
          title="Reasoning" 
          text="AI can process information, draw conclusions, and make informed decisions based on available data." 
          icon={<AnimatedPuzzle />} 
          delay={0.2} 
        />
        <CardBox 
          title="Self-correction" 
          text="AI systems continuously refine their algorithms and outputs based on feedback and new information." 
          icon={<AnimatedLoop />} 
          delay={0.3} 
        />
      </div>
    </motion.div>
  );
};

export default Slide2;
