import * as React from 'react';
import { motion } from 'framer-motion';
import { slideContainer, titleStyle } from '../../styles/slideStyles';
import {
  EASE,
  containerVariants,
  itemVariants,
  cardHoverAnim,
  ambientLeftAnim,
  ambientRightAnim,
  titleAnim,
  subtitleAnim,
  gridAnim,
  bottomHintAnim,
  slide19RootStyle,
  ambientOrbLeftStyle,
  ambientOrbRightStyle,
  titleGradientStyle,
  subtitleStyle,
  gridStyle,
  cardStyle,
  emojiWrapperStyle,
  cardHeadingStyle,
  cardBlurbStyle,
  bottomHintStyle,
} from '../../styles/slide19.bundle';

type UseCase = {
  emoji: string;
  name: string;
  blurb: string;
  delay: number;
};

const cases: UseCase[] = [
  { emoji: '🧠', name: 'Healthcare', blurb: 'Summarizes patient notes, flags risks, drafts discharge & prior-auth letters.', delay: 0.15 },
  { emoji: '🏦', name: 'Banking', blurb: 'Automates KYC checks, fraud triage, and personalized portfolio nudges.', delay: 0.25 },
  { emoji: '🛍️', name: 'Retail', blurb: 'Creates shoppable content, chat-based product guides, and smart offers.', delay: 0.35 },
  { emoji: '🏭', name: 'Manufacturing', blurb: 'Generates work instructions, detects defects from images, plans spare parts.', delay: 0.45 },
  { emoji: '✈️', name: 'Travel & Hospitality', blurb: 'Builds itineraries, handles service queries, and writes property listings.', delay: 0.55 },
  { emoji: '📚', name: 'Education', blurb: 'Creates adaptive lessons, instant feedback, and study plans per learner.', delay: 0.65 },
  { emoji: '💻', name: 'Software', blurb: 'Writes boilerplate, unit tests, and migration scripts with code reviews.', delay: 0.75 },
  { emoji: '📰', name: 'Media & Marketing', blurb: 'Generates on-brand copy, storyboards, and multilingual campaigns.', delay: 0.85 },
];

const Slide19: React.FC = () => {
  return (
    <div style={{ ...slideContainer, ...slide19RootStyle }}>
      {/* ambient orbs */}
      <motion.div {...ambientLeftAnim} style={ambientOrbLeftStyle} />
      <motion.div {...ambientRightAnim} style={ambientOrbRightStyle} />

      {/* Title */}
      <motion.h2 {...titleAnim} style={{ ...titleStyle, ...titleGradientStyle }}>
        GEN AI Use Cases
      </motion.h2>

      {/* Subtitle */}
      <motion.p {...subtitleAnim} style={subtitleStyle}>
        A quick tour of how different industries put generative AI to work—practically, today.
      </motion.p>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        {...gridAnim}
        style={gridStyle}
      >
        {cases.map(({ emoji, name, blurb, delay }) => (
          <motion.div
            key={name}
            variants={itemVariants}
            transition={{ delay }}
            whileHover={cardHoverAnim}
            style={cardStyle}
          >
            <motion.div
              aria-hidden
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: EASE }}
              style={emojiWrapperStyle}
            >
              {emoji}
            </motion.div>

            <div style={cardHeadingStyle}>{name}</div>
            <div style={cardBlurbStyle}>{blurb}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom hint */}
      <motion.div {...bottomHintAnim} style={bottomHintStyle}>
        Tip: Start with a narrow workflow, measure lift, then scale across adjacent processes.
      </motion.div>
    </div>
  );
};

export default Slide19;
