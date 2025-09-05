import * as React from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  styles,
  EASE_OUT,
  EASE_SOFT,
  charVariants,
  lineVariants,
  containerTransition,
  titleTransition,
  cardEnter,
  thinkingEnter,
  outputsEnter,
  ctaEnter,
} from '../../styles/slide13.bundle';

// --- Typewriter helpers (motion only; styles imported) ---
function TypeLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const chars = React.useMemo(() => Array.from(text), [text]);
  return (
    <motion.span initial="hidden" animate="show" variants={lineVariants()} transition={{ delay }} style={styles.typeSpan} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span key={i} variants={charVariants} style={styles.typeChar}>
          {c === ' ' ? '\u00A0' : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
function BlinkingCaret({ color = '#0b5' }: { color?: string }) {
  return (
    <motion.span
      aria-hidden
      style={{ ...styles.caret, background: color }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// --- Autoplay gated by visibility (logic unchanged) ---
function useAutoplay(steps: number, delayMs = 2200) {
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % steps), delayMs);
    return () => window.clearInterval(id);
  }, [playing, steps, delayMs]);
  const restart = React.useCallback(() => {
    setStep(0);
    setPlaying(true);
  }, []);
  const pause = React.useCallback(() => setPlaying(false), []);
  const play = React.useCallback(() => setPlaying(true), []);
  return { step, setStep, playing, setPlaying, restart, pause, play };
}

// --- Small UI helpers (styles pulled out) ---
const Card: React.FC<{
  title: string;
  badge: string;
  bg: string;
  border: string;
  children: React.ReactNode;
  delay?: number;
}> = ({ title, badge, bg, border, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.98 }}
    transition={{ ...cardEnter, delay }}
    style={{ ...styles.card, background: bg, border: `1px solid ${border}` }}
  >
    <div style={styles.cardBadge}>{badge}</div>
    <div style={styles.cardTitle}>{title}</div>
    <div style={styles.cardBody}>{children}</div>
  </motion.div>
);

const PromptBubble: React.FC<{ prompt: string; isTyping: boolean }> = ({ prompt, isTyping }) => (
  <motion.div
    key="prompt-bubble"
    initial={{ y: -8, opacity: 0, scale: 0.98 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: EASE_SOFT }}
    style={styles.promptBubble}
    aria-live="polite"
  >
    {isTyping ? (
      <>
        <TypeLine text={prompt} delay={0.15} />
        <BlinkingCaret />
      </>
    ) : (
      <span>{prompt}</span>
    )}
  </motion.div>
);

// --- Slide 13 ---
const Slide13: React.FC = () => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.6, margin: '0px 0px -10% 0px' });

  // Phases: 0 prompt → 1 thinking → 2 three outputs → 3 CTA
  const { step, setStep, playing, setPlaying, restart, pause, play } = useAutoplay(4, 2200);

  React.useEffect(() => {
    if (inView) {
      restart();
    } else {
      setStep(0);
      pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const prompt = '“Plan a team event for 60 people next Friday.”';

  return (
    <motion.div
      ref={rootRef}
      key="one-prompt-three-outputs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={containerTransition}
      style={styles.root}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => inView && setPlaying(true)}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={titleTransition}
        style={styles.title}
      >
        One Prompt → Three Outputs
      </motion.h2>

      {/* Controls */}
      <div style={styles.controlsWrap}>
        <div style={styles.controlsTitle}>Prompt → Agenda • Poster • Email</div>
        <div
          style={{
            ...styles.statusDot,
            background: playing ? '#10b981' : '#ef4444',
          }}
        />
        <button onClick={() => (playing ? pause() : play())} style={styles.btn}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => restart()} style={styles.btnAlt}>
          Restart
        </button>
      </div>

      {/* Prompt */}
      <PromptBubble prompt={prompt} isTyping={step === 0} />

      {/* Stage 1: Thinking shimmer */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={thinkingEnter}
            style={styles.thinkingWrap}
          >
            <motion.div
              animate={{ backgroundPositionX: ['0%', '100%'] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              style={styles.thinkingBgFill}
            />
            <div style={styles.thinkingLabel}>Thinking… organizing tasks…</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 2: Three outputs */}
      <AnimatePresence mode="wait">
        {step === 2 && (
          <motion.div
            key="outputs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={outputsEnter}
            style={styles.outputsGrid}
          >
            {/* Agenda */}
            <Card title="Agenda" badge="📋" bg="linear-gradient(180deg,#ffffff, #f8fafc)" border="rgba(0,0,0,0.06)" delay={0.02}>
              <ul style={styles.agendaList}>
                <li>3:00 PM — Welcome & icebreakers</li>
                <li>3:30 PM — Team challenge</li>
                <li>4:30 PM — Snacks & awards</li>
                <li>5:00 PM — Wrap-up & photos</li>
              </ul>
            </Card>

            {/* Poster */}
            <Card title="Poster" badge="🎨" bg="linear-gradient(180deg,#0ea5e9 0%, #06b6d4 60%, #fde68a 100%)" border="rgba(14,165,233,0.35)" delay={0.14}>
              <div style={styles.posterCanvas}>
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EASE_SOFT, delay: 0.05 }}
                  style={styles.posterSun}
                />
                {[0, 1].map((m) => (
                  <motion.div
                    key={m}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, ease: EASE_SOFT, delay: 0.1 + m * 0.05 }}
                    style={{
                      ...styles.posterMountainBase,
                      bottom: -8 + m * 6,
                      left: m * 16,
                      height: 80 + m * 18,
                      background: `linear-gradient(180deg, rgba(2,6,23,${0.25 + m * 0.18}) 0%, rgba(2,6,23,${0.55 + m * 0.18}) 100%)`,
                      clipPath: `polygon(0% 100%, ${16 + m * 6}% 60%, ${30 + m * 7}% 42%, ${44 + m * 8}% 70%, 100% 100%)`,
                    }}
                  />
                ))}
                <motion.div
                  initial={{ x: '-120%' }}
                  animate={{ x: '120%' }}
                  transition={{ duration: 1.6, ease: 'linear', repeat: Infinity, delay: 0.2 }}
                  style={styles.posterGloss}
                />
              </div>
              <div style={styles.posterCaption}>“Team Day • Friday 3–5 PM”</div>
            </Card>

            {/* Email Invite */}
            <Card title="Email Invite" badge="📧" bg="linear-gradient(180deg,#ffffff, #f8fafc)" border="rgba(0,0,0,0.06)" delay={0.26}>
              <div style={styles.emailBlock}>
                <div style={styles.emailDim}>Subject: You’re invited — Team Event (Fri)</div>
                <div style={{ height: 8 }} />
                <div>Hello team,</div>
                <div>Join us this Friday 3–5 PM for games, snacks, and awards.</div>
                <div>Venue: 5F Atrium. RSVP by Wednesday.</div>
                <div style={{ height: 8 }} />
                <div>— Org Committee</div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3: CTA */}
      <AnimatePresence mode="wait">
        {step === 3 && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={ctaEnter}
            style={styles.cta}
          >
            <div style={styles.ctaTitle}>One prompt, many outputs — that’s Generative AI’s superpower.</div>
            <div style={styles.ctaText}>
              Ask once. Get <strong>agenda</strong>, <strong>poster</strong>, and <strong>email</strong> ready to go — then refine with simple edits.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer hint */}
      <div style={styles.footerHint}>Auto-plays when visible • Hover to pause</div>
    </motion.div>
  );
};

export default Slide13;
