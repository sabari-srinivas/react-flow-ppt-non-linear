import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { slideContainer, titleStyle } from '../../styles/slideStyles';

import {
  styles,
  containerMotion,
  titleMotion,
  gridStagger,
  Card,
  FlashCard,
  Startup,
  Flash,
} from '../../styles/slide8.bundle';

/* ---------- Flash card content per tile (CONTENT stays here) ---------- */
const useFlashContent = () =>
  useMemo<Record<string, Flash>>(
    () => ({
      'Generative Models': {
        headline: 'From prompt to output in seconds',
        example: '“Write a 120-word product teaser about a smart water bottle.”',
        steps: [
          'Model parses intent & entities in prompt',
          'Samples tokens guided by probability distribution',
          'Applies safety & style constraints',
          'Returns coherent, on-brand copy',
        ],
      },
      Accessibility: {
        headline: 'Enterprise features, consumer UX',
        example: 'Non-engineers set up a doc Q&A bot via UI—not code.',
        steps: [
          'Connects to Drive/SharePoint/Confluence',
          'Indexes with embeddings & chunking',
          'Few clicks to publish a secure bot',
          'SSO + audit logs for admins',
        ],
      },
      Multimodality: {
        headline: 'Reason across text, image, & audio',
        example: 'Upload receipt image + text question: “Is this reimbursable?”',
        steps: [
          'Vision encoder extracts key fields',
          'Text query fused with visual features',
          'Policy checker evaluates compliance',
          'Returns decision + rationale',
        ],
      },
      Scale: {
        headline: 'Go from pilot to global',
        example: 'Deploy an AI assistant to 30 countries with guardrails.',
        steps: [
          'Tenant isolation + rate controls',
          'Latency routing by region',
          'Usage caps & cost observability',
          'Continuous evals & rollback plan',
        ],
      },
    }),
    []
  );

/* ---------- Slide ---------- */
const WhatsNewDifferentAISlide = () => {
  const [openName, setOpenName] = useState<string | null>(null);
  const flash = useFlashContent();

  const startups: Startup[] = [
    {
      name: 'Generative Models',
      description: 'AI that creates text, images, audio, and video.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f3a8.svg',
      delay: 0.2,
    },
    {
      name: 'Accessibility',
      description: 'Powerful AI tools available to businesses & individuals.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f310.svg',
      delay: 0.3,
    },
    {
      name: 'Multimodality',
      description: 'Combining text, images, and audio for better results.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f3a4.svg',
      delay: 0.4,
    },
    {
      name: 'Scale',
      description: 'Applied across industries at global scale.',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f680.svg',
      delay: 0.5,
    },
  ];

  const open = useCallback((name: string) => setOpenName(name), []);
  const close = useCallback(() => setOpenName(null), []);

  return (
    <motion.div
      initial={containerMotion.initial}
      animate={containerMotion.animate}
      exit={containerMotion.exit}
      transition={containerMotion.transition}
      style={{ ...slideContainer, ...styles.root }}
    >
      {/* Title */}
      <motion.h2
        initial={titleMotion.initial}
        animate={titleMotion.animate}
        transition={titleMotion.transition}
        style={{ ...titleStyle, ...styles.titleH2 }}
      >
        What’s New and Different in AI?
      </motion.h2>

      {/* Row 1 – first 3 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={gridStagger}
        style={styles.row1}
      >
        {startups.slice(0, 3).map((s) => (
          <Card key={s.name} {...s} onOpen={open} />
        ))}
      </motion.div>

      {/* Row 2 – remaining */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={gridStagger}
        style={styles.row2}
      >
        {startups.slice(3).map((s) => (
          <Card key={s.name} {...s} onOpen={open} />
        ))}
      </motion.div>

      {/* Flash Card Modal */}
      <FlashCard openName={openName} onClose={close} content={flash} />
    </motion.div>
  );
};

export default WhatsNewDifferentAISlide;
