import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideContainer, titleStyle } from '../../styles/slideStyles';

type Startup = {
  name: string;
  description: string;
  logo: string;
  delay: number;
};

type Flash = {
  headline: string;
  example: string;
  steps: string[];
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

/* ---------- Flash card content per tile ---------- */
const useFlashContent = () => useMemo<Record<string, Flash>>(
  () => ({
    'Generative Models': {
      headline: 'From prompt to output in seconds',
      example: '“Write a 120-word product teaser about a smart water bottle.”',
      steps: [
        'Model parses intent & entities in prompt',
        'Samples tokens guided by probability distribution',
        'Applies safety & style constraints',
        'Returns coherent, on-brand copy'
      ],
    },
    'Accessibility': {
      headline: 'Enterprise features, consumer UX',
      example: 'Non-engineers set up a doc Q&A bot via UI—not code.',
      steps: [
        'Connects to Drive/SharePoint/Confluence',
        'Indexes with embeddings & chunking',
        'Few clicks to publish a secure bot',
        'SSO + audit logs for admins'
      ],
    },
    'Multimodality': {
      headline: 'Reason across text, image, & audio',
      example: 'Upload receipt image + text question: “Is this reimbursable?”',
      steps: [
        'Vision encoder extracts key fields',
        'Text query fused with visual features',
        'Policy checker evaluates compliance',
        'Returns decision + rationale'
      ],
    },
    'Scale': {
      headline: 'Go from pilot to global',
      example: 'Deploy an AI assistant to 30 countries with guardrails.',
      steps: [
        'Tenant isolation + rate controls',
        'Latency routing by region',
        'Usage caps & cost observability',
        'Continuous evals & rollback plan'
      ],
    },
  }),
  []
);

/* ---------- Card ---------- */
const Card = ({
  logo, name, description, delay, onOpen,
}: Startup & { onOpen: (name: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10, scale: 1.05, boxShadow: '0 18px 36px rgba(0,0,0,0.15)' }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onOpen(name)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onOpen(name);
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={`${name} details`}
    style={{
      flex: '1 1 0',
      maxWidth: 280,
      borderRadius: 16,
      background: '#fff',
      boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 24,
      textAlign: 'center',
      border: '1px solid rgba(0,0,0,0.06)',
      minHeight: 260,
      margin: '0 auto',
      transition: 'all 0.25s ease',
      cursor: 'pointer',
      outline: 'none',
    }}
  >
    <motion.img
      src={logo}
      alt={name}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: delay + 0.1 }}
      style={{
        width: 110,
        height: 110,
        marginBottom: 16,
        borderRadius: 16,
        objectFit: 'contain',
        background: '#ffffff',
        padding: 10,
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src =
          'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f4bb.svg';
      }}
    />
    <h3
      style={{
        margin: 0,
        color: '#1f2937',
        fontSize: '1.1rem',
        fontWeight: 700,
        letterSpacing: 0.2,
      }}
    >
      {name}
    </h3>
    <p style={{ fontSize: '0.92rem', marginTop: 8, color: '#6b7280', lineHeight: 1.45 }}>
      {description}
    </p>
  </motion.div>
);

/* ---------- FlashCard Modal ---------- */
const FlashCard = ({
  openName,
  onClose,
  content,
}: {
  openName: string | null;
  onClose: () => void;
  content: Record<string, Flash>;
}) => {
  const data = openName ? content[openName] : undefined;

  // close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (openName) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openName, onClose]);

  return (
    <AnimatePresence>
      {openName && data && (
        <motion.div
          key="backdrop"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            key="modal"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(720px, 92vw)',
              borderRadius: 16,
              background: '#fff',
              boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
              padding: 24,
              position: 'relative',
            }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 10,
                right: 12,
                width: 36,
                height: 36,
                borderRadius: 999,
                border: '1px solid rgba(0,0,0,0.12)',
                background: '#fff',
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              ✕
            </button>

            <h3
              style={{
                margin: 0,
                fontSize: '1.35rem',
                color: '#0f172a',
                fontWeight: 800,
              }}
            >
              {openName}
            </h3>
            <p style={{ marginTop: 6, color: '#374151' }}>{data.headline}</p>

            <div
              style={{
                marginTop: 16,
                padding: 14,
                borderRadius: 12,
                background: '#f8fafc',
                border: '1px solid #e5e7eb',
              }}
            >
              <strong style={{ color: '#111827' }}>Example:</strong>
              <div style={{ marginTop: 6, color: '#334155' }}>{data.example}</div>
            </div>

            <div style={{ marginTop: 18 }}>
              <strong style={{ color: '#111827' }}>How it works</strong>
              <ul style={{ marginTop: 8, color: '#334155', lineHeight: 1.55 }}>
                {data.steps.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        ...slideContainer,
        backgroundColor: '#f8f9fa',
        padding: '40px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 40,
      }}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          ...titleStyle,
          fontSize: '2.8rem',
          color: '#111827',
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        What’s New and Different in AI?
      </motion.h2>

      {/* Row 1 – first 3 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 1000,
        }}
      >
        {startups.slice(0, 3).map((s) => (
          <Card key={s.name} {...s} onOpen={open} />
        ))}
      </motion.div>

      {/* Row 2 – remaining */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: 700,
          marginTop: 10,
        }}
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
