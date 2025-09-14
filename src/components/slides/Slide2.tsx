// THIS IS SLIDE2.TSX
import React from 'react';
import { motion } from 'framer-motion';
import {
  slideContainer,
  titleStyle,
  subtitleStyle,
  cardContainer,
  cardStyle,
  cardTitleStyle,
  cardTextStyle
} from '../../styles/slideStyles';

import {
  styles,
  containerVariants,
  itemVariants,
  hoverMotion,
  AnimatedBrain,
  AnimatedPuzzle,
  AnimatedLoop
} from '../../styles/slide2.bundle';

const CardBox = ({
  title,
  text,
  icon,
  delay = 0
}: { title: string; text: string; icon: React.ReactNode; delay?: number }) => (
  <motion.div
    variants={itemVariants}
    transition={{ delay }}
    style={{ ...cardStyle, ...styles.cardBox }}
  >
    <motion.div {...hoverMotion}>
      <div style={styles.iconMargin}>{icon}</div>
      <h3
        style={{
          ...cardTitleStyle,
          ...styles.cardTitleMargin,
          ...styles.cardTitleLarge, // increased title size
        }}
      >
        {title}
      </h3>
      <p
        style={{
          ...cardTextStyle,
          ...styles.cardTextLarge, // increased body text size
        }}
      >
        {text}
      </p>
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
      <motion.h1 style={titleStyle} variants={itemVariants} transition={{ duration: 0.4 }}>
        What is AI?
      </motion.h1>
      <motion.p style={subtitleStyle} variants={itemVariants} transition={{ duration: 0.4 }}>
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
