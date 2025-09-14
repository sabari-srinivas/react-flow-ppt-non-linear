import { motion } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

import {
  styles,
  containerMotion,
  titleMotion,
  topCardEnter,
  sheenMotion,
  statEnter,
  stripEnter,
  cardBg,
} from '../../styles/slide10.bundle';

export default function Slide10() {
  const topCards = [
    { title: 'Virtual Workers', desc: 'Automating human-intensive tasks entirely using AI agents.', bg: ['#c8ddf4', '#e1eff9'] },
    { title: 'Personalized Experiences', desc: 'Evolving personalization to AI-powered, hyper-personalized, segment-of-one experiences.', bg: ['#d2e3f6', '#e8f2fb'] },
    { title: 'Productivity', desc: 'Enhancing efficiency in cognitive and knowledge-intensive tasks.', bg: ['#bdd6f1', '#dcebf8'] },
    { title: 'Creativity & Content', desc: 'Accelerating creativity through AI-driven audio, visual, & video content generation.', bg: ['#d7e7f7', '#ebf4fc'] },
    { title: 'Insight Discovery', desc: 'Unlocking possibilities by AI-accelerated Data Science on structured & unstructured data together.', bg: ['#c3dbf3', '#dfeaf8'] },
  ] as const;

  const stats = [
    { value: '100%', label: 'Replacement of Human worker', color: '#4e83c3' },
    { value: '10x', label: 'More Real & Personalized', color: '#4e83c3'  },
    { value: '5x', label: 'Faster Execution', color: '#4e83c3'  },
    { value: '7x', label: 'Faster Content Production', color: '#4e83c3'  },
    { value: '3x', label: 'More Insights Uncovered', color: '#4e83c3'  },
  ] as const;

  const strips = [
    { text: 'Re-imagining Software Engineering with AI-Assisted Coding & Modernization → ', strong: '10x Engineers', color: '#4e83c3' },
    { text: 'Advanced chain of thought Reasoning', strong: '', color: '' },
  ] as const;

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
        style={styles.titleH2}
      >
        What can AI do in an Enterprise?
      </motion.h2>

      {/* Top Row - Cards */}
      <div style={styles.topGrid}>
        {topCards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={topCardEnter(i).initial}
            animate={topCardEnter(i).animate}
            transition={topCardEnter(i).transition}
            whileHover={topCardEnter(i).whileHover}
            whileTap={topCardEnter(i).whileTap}
            style={{ ...styles.cardBase, ...cardBg(c.bg[0], c.bg[1]) }}
          >
            {/* sheen */}
            <motion.div aria-hidden style={styles.sheenBase} {...sheenMotion(i)} />
            <h3 style={{ margin: '0 0 8px 0', color: '#0b0b0b', fontWeight: 700,fontSize: '1.5rem' }}>{c.title}</h3>
            <p style={{ fontSize: '1.3rem', margin: 0, color: '#111827',textAlign: 'left' as const }}>{c.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Middle Row - Stats */}
      <div style={styles.statsGrid}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={statEnter(i).initial} animate={statEnter(i).animate} transition={statEnter(i).transition}>
            <h2 style={{ color: s.color, margin: 0 }}>{s.value}</h2>
            <p style={{ margin: 0 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom Strips */}
      {strips.map((b, i) => (
        <motion.div key={i} initial={stripEnter(i).initial} animate={stripEnter(i).animate} transition={stripEnter(i).transition} style={styles.stripBox(i === 0)}>
          {b.text} {b.strong && <strong style={{ color: b.color }}>{b.strong}</strong>}
        </motion.div>
      ))}
    </motion.div>
  );
}
