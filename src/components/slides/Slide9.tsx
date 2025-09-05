import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

import {
  styles,
  cardVariants,
  modalVariants,
  topGridIntro,
  bottomTextIntro,
  overlayFade,
  cardButtonStyle,
  iconCircleStyle,
  haloStyle,
  haloMotion,
  shimmerMotion,
  headerRowStyle,
  headerIconStyle,
  headerTitle,
  headerSub,
  closeBtn,
  footerTipStyle,
} from '../../styles/slide9.bundle';

// ---------- Data (CONTENT stays in the slide) ----------
const CARDS = [
  {
    key: 'see',
    icon: '👁️',
    title: 'AI can SEE',
    accent: '#0ea5e9', // sky-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
    blurb: 'Like gaining thousands of expert eyes',
    details: [
      'Visual QA over charts, dashboards, and documents',
      'Detect anomalies in frames, framesets, or live feeds',
      'OCR + layout-aware understanding of PDFs and reports',
    ],
  },
  {
    key: 'touch',
    icon: '✋',
    title: 'AI can TOUCH',
    accent: '#10b981', // emerald-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
    blurb: 'Creating digital experiences with physical impact',
    details: [
      'Trigger RPA/APIs to act on insights',
      'Drive robots, IoT and workflows with guardrails',
      'Human-in-the-loop approvals for high-risk actions',
    ],
  },
  {
    key: 'speak',
    icon: '🗣️',
    title: 'AI can SPEAK',
    accent: '#f97316', // orange-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 100%)',
    blurb: 'Not just responding, but understanding context',
    details: [
      'Realtime multilingual voice + emotion cues',
      'Memory to stay on topic across turns',
      'Grounded answers with source citations',
    ],
  },
  {
    key: 'analyse',
    icon: '🔍',
    title: 'AI can ANALYSE',
    accent: '#8b5cf6', // violet-500
    bgGrad: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)',
    blurb: "Finding patterns that humans can't see",
    details: [
      'Automatic pattern mining over large datasets',
      'Explainable KPIs with drill-downs and what-ifs',
      'Forecasts with confidence and scenario tests',
    ],
  },
] as const;

type CardKey = typeof CARDS[number]['key'];

export default function Slide9Interactive() {
  const [openKey, setOpenKey] = React.useState<CardKey | null>(null);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpenKey(null);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <motion.div className="slide-container" style={{ ...slideContainer, ...styles.root }}>
      {/* Top Section with Four Cards */}
      <motion.div initial={topGridIntro.initial} animate={topGridIntro.animate} transition={topGridIntro.transition} style={styles.grid4}>
        {CARDS.map((c, i) => (
          <motion.button
            key={c.key}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpenKey(c.key)}
            style={{ ...styles.buttonBase, ...cardButtonStyle(c.bgGrad) }}
          >
            {/* soft animated halo */}
            <motion.div {...haloMotion(i)} style={haloStyle(c.accent)} />

            <div style={iconCircleStyle(c.accent)}>{c.icon}</div>

            <h3 style={styles.cardTitle}>{c.title}</h3>
            <p style={styles.cardBlurb}>{c.blurb}</p>

            {/* shimmering diagonal stripe */}
            <motion.div aria-hidden style={styles.shimmerBase} {...shimmerMotion(i)} />
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom Text */}
      <motion.div initial={bottomTextIntro.initial} animate={bottomTextIntro.animate} transition={bottomTextIntro.transition} style={styles.bottomHeadline}>
        AI Can Learn & Reason
      </motion.div>

      {/* Modal for details */}
      <AnimatePresence>
        {openKey && (
          <motion.div key="overlay" initial={overlayFade.initial} animate={overlayFade.animate} exit={overlayFade.exit} style={styles.overlay} onClick={() => setOpenKey(null)}>
            <motion.div
              key="sheet"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={styles.sheet}
            >
              {(() => {
                const c = CARDS.find((x) => x.key === openKey)!;
                return (
                  <div>
                    <div style={headerRowStyle(c.accent, c.bgGrad)}>
                      <div style={headerIconStyle(c.accent)}>{c.icon}</div>
                      <div>
                        <div style={headerTitle}>{c.title}</div>
                        <div style={headerSub}>{c.blurb}</div>
                      </div>
                      <button onClick={() => setOpenKey(null)} style={closeBtn}>✕</button>
                    </div>

                    <div style={styles.sheetBody}>
                      <ul style={styles.sheetList}>
                        {c.details.map((d, i) => (
                          <li key={i} style={styles.sheetListItem}>{d}</li>
                        ))}
                      </ul>

                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={footerTipStyle(c.accent)}>
                        Tip: combine <strong>{c.title}</strong> with Retrieval to ground responses in your data.
                      </motion.div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
