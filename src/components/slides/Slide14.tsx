import * as React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  styles,
  EASE_OUT,
  EASE_SOFT,
  LINEAR,
  charVariants,
  lineVariants,
  containerTransition,
  titleTransition,
  narratorTransition,
  promptTransition,
  storyTransition,
} from '../../styles/slide14.bundle';

type Beat = {
  id: number;
  step: number;
  title: string;
  role: string;
  emoji: string;
  color: string;
  blurb: string;
  detail?: string;
};

const BEATS: Beat[] = [
  { id: 0, step: 1, title: 'Your Request', role: 'You speak', emoji: '🗣️', color: '#38bdf8', blurb: 'You ask for a short poem about the ocean.', detail: 'Plain English in, no special commands needed.' },
  { id: 1, step: 2, title: 'Break It Down', role: 'Librarian', emoji: '📚', color: '#22c55e', blurb: 'The request is split into small, tidy pieces.', detail: 'Like making index cards for each word and idea.' },
  { id: 2, step: 3, title: 'Find the Meaning', role: 'Translator', emoji: '🧩', color: '#a78bfa', blurb: 'Those pieces become meanings the AI can compare.', detail: 'Similar ideas sit closer together on a ‘map’.' },
  { id: 3, step: 4, title: 'Focus on What Matters', role: 'Think Tank', emoji: '🧠', color: '#f59e0b', blurb: 'The AI pays extra attention to the important parts.', detail: 'Words like “poem” and “ocean” guide the result.' },
  { id: 4, step: 5, title: 'Write the Draft', role: 'Poet', emoji: '📝', color: '#ef4444', blurb: 'The model writes, one word at a time, checking the flow.', detail: 'Awkward words get replaced by smoother ones.' },
  { id: 5, step: 6, title: 'Your Result', role: 'Back to You', emoji: '✨', color: '#10b981', blurb: 'You receive a neat little ocean poem.', detail: 'Short, clear, and based on your request.' },
];

/* ========== Typewriter helpers (motion-only) ========== */
function TypeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const chars = React.useMemo(() => Array.from(text), [text]);
  return (
    <motion.span initial="hidden" animate="show" variants={lineVariants()} style={styles.typeSpan} transition={{ delay }} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span key={i} variants={charVariants} style={styles.typeChar}>
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
function BlinkingCaret({ color = '#92400e' }: { color?: string }) {
  return (
    <motion.span
      aria-hidden
      style={{ ...styles.caret, background: color }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: LINEAR }}
    />
  );
}

/* ========== autoplay helper (hover to pause) ========== */
function useAutoplay(length: number, delayMs = 2500) {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(true);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delayMs);
    return () => clearInterval(id);
  }, [paused, length, delayMs]);

  const reset   = React.useCallback(() => setIndex(0), []);
  const start   = React.useCallback(() => setPaused(false), []);
  const pause   = React.useCallback(() => setPaused(true), []);
  const restart = React.useCallback(() => { setIndex(0); setPaused(false); }, []);

  return { index, setIndex, setPaused, reset, start, pause, restart };
}

/* ========== Slide ========== */
const Slide14: React.FC = () => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.6, margin: '0px 0px -10% 0px' });

  const { index, setIndex, setPaused, restart, reset } = useAutoplay(BEATS.length, 2500);
  const active = BEATS[index];
  const poem = '“The ocean whispers in gentle waves…”';

  React.useEffect(() => {
    if (inView) {
      restart();
    } else {
      reset();
      setPaused(true);
    }
  }, [inView, restart, reset, setPaused]);

  return (
    <motion.div
      ref={rootRef}
      key="slide14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={containerTransition}
      style={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => inView && setPaused(false)}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={titleTransition}
        style={styles.title}
      >
        How Generative AI Processes a Prompt
      </motion.h2>

      {/* Prompt bubble */}
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={promptTransition}
        style={styles.promptBubble}
      >
        “Write a short poem about the ocean”
      </motion.div>

      {/* Compact narrator */}
      <AnimatePresence mode="wait">
        {inView && (
          <motion.div
            key={`narr-${active.id}`}
            initial={{ y: -6, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={narratorTransition}
            style={styles.narratorWrap}
          >
            <div style={styles.narratorEmoji}>{active.emoji}</div>
            <div style={styles.narratorTitle}>
              Step {active.step}: {active.title}{' '}
              <span style={{ fontWeight: 700, color: active.color }}>· {active.role}</span>
            </div>
            <div aria-hidden style={styles.narratorProgressOuter}>
              <motion.div
                key={`progress-${active.id}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.8, ease: EASE_SOFT }}
                style={{ height: '100%', background: `linear-gradient(90deg, ${active.color}, #60a5fa)` }}
              />
            </div>
            <button onClick={() => setIndex(0)} title="Restart" style={styles.narratorRestartBtn}>
              Restart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Numbered pipeline */}
      <div style={styles.pipelineGrid}>
        {BEATS.map((b, i) => {
          const isActive = i === index && inView;
          return (
            <motion.div
              key={b.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.03, duration: 0.45, ease: EASE_SOFT }}
              style={{
                ...styles.pipelineCardBase,
                background: isActive ? 'white' : styles.pipelineCardBase.background,
                border: `2px solid ${isActive ? b.color : 'rgba(0,0,0,0.06)'}`,
                boxShadow: isActive ? '0 12px 28px rgba(0,0,0,0.14)' : styles.pipelineCardBase.boxShadow!,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="active-halo"
                  style={{ ...styles.pipelineActiveHalo, boxShadow: `0 0 0 3px ${b.color}22` }}
                />
              )}
              <div
                style={{
                  ...styles.stepBadge,
                  background: b.color,
                }}
              >
                {b.step}
              </div>
              <div style={styles.emoji}>{b.emoji}</div>
              <div style={styles.cardTitle}>{b.title}</div>
              <div style={styles.cardRole}>{b.role}</div>
            </motion.div>
          );
        })}
      </div>

      <div style={styles.infoText}>The request moves left → right, one simple step at a time</div>

      {/* Token lane */}
      <div aria-hidden style={styles.tokenLane}>
        {inView &&
          [...Array(16)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ x: -80 - i * 30 }}
              animate={{ x: 1150 }}
              transition={{ duration: 5.2, delay: (i % 8) * 0.25, repeat: Infinity, ease: LINEAR }}
              style={{
                position: 'absolute',
                top: 4 + ((i * 6) % 14),
                left: 0,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: i % 4 === 0 ? '#38bdf8' : i % 4 === 1 ? '#a78bfa' : i % 4 === 2 ? '#f59e0b' : '#10b981',
                boxShadow: '0 0 0 2px rgba(255,255,255,0.85)',
              }}
            />
          ))}
      </div>

      {/* Story card */}
      <AnimatePresence mode="wait">
        {inView && (
          <motion.div
            key={`story-${active.id}`}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={storyTransition}
            style={styles.storyCard}
          >
            <div style={styles.storyHeader}>
              <div
                style={{
                  ...styles.storyAvatar,
                  background: `${active.color}22`,
                  border: `1px solid ${active.color}55`,
                }}
              >
                {active.emoji}
              </div>
              <div style={styles.storyBody}>
                <div style={styles.storyBlurb}>{active.blurb}</div>
                {active.detail && <div style={styles.storyDetail}>{active.detail}</div>}

                {active.id === 5 && (
                  <motion.div
                    key={`poem-${active.id}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    style={styles.typedPoem}
                  >
                    <TypeLine text={'“The ocean whispers in gentle waves…”'} delay={0.2} />
                    <BlinkingCaret />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={styles.footerHint}>Auto-plays when visible · Hover to pause</div>
    </motion.div>
  );
};

export default Slide14;
