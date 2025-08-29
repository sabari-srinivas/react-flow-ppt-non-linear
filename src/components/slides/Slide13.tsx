import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideContainer } from '../../styles/slideStyles';

// Easing (TS-safe cubic beziers)
const EASE_OUT: number[] = [0.16, 1, 0.3, 1];
const EASE_SOFT: number[] = [0.2, 0.65, 0.3, 0.9];

type Anchor = 'left' | 'right' | 'top' | 'bottom';

type NodeGeo = {
  city: string;
  country: string;
  lat: number;   // -90..90
  lon: number;   // -180..180
  emoji: string;
  title: string;
  blurb: string;
  anchor?: Anchor; // optional override
};

type NodePlaced = NodeGeo & {
  leftPct: number;  // 0..100
  topPct: number;   // 0..100
};

// -------- Real cities & actions --------
const GEO_NODES: NodeGeo[] = [
  { city: 'Los Angeles', country: 'USA', lat: 34.0522, lon: -118.2437, emoji: '📝', title: 'Content Creation', blurb: 'From briefs to finished drafts—models transform sparse prompts into on-brand, multi-format content in minutes.' },
  { city: 'Boston', country: 'USA', lat: 42.3601, lon: -71.0589, emoji: '💊', title: 'Drug Discovery', blurb: 'Generative chemistry proposes novel candidates; lab results feed back to guide the next round—faster, smarter pipelines.' },
  { city: 'Bengaluru', country: 'India', lat: 12.9716, lon: 77.5946, emoji: '💻', title: 'Software Development', blurb: 'Natural language to code, code to tests, tests to fixes—developers steer, AI accelerates across the stack.' },
  { city: 'Helsinki', country: 'Finland', lat: 60.1699, lon: 24.9384, emoji: '🎓', title: 'Personalized Education', blurb: 'Adaptive tutors tailor practice in real time, explaining concepts in each learner’s language and pace.' },
  { city: 'Manila', country: 'Philippines', lat: 14.5995, lon: 120.9842, emoji: '🛟', title: 'Customer Support', blurb: '24/7 assistants triage, resolve, and summarize cases; agents get suggested replies and next steps.' },
  { city: 'Shenzhen', country: 'China', lat: 22.5431, lon: 114.0579, emoji: '🚚', title: 'Supply Chain', blurb: 'Generative scenario planning anticipates demand shifts and suggests resilient fulfillment strategies.' },
  { city: 'London', country: 'UK', lat: 51.5074, lon: -0.1278, emoji: '🛡️', title: 'Fraud Detection', blurb: 'Generative profiles model normal vs. abnormal behavior; anomalies trigger explainable alerts.' },
  { city: 'San Francisco', country: 'USA', lat: 37.7749, lon: -122.4194, emoji: '🎨', title: 'Design & Prototyping', blurb: 'From sketches to renderings—AI proposes variants, styles, and quick iterations grounded in constraints.' },
  { city: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060, emoji: '📣', title: 'Marketing Optimization', blurb: 'Campaign copy, imagery, and audiences co-optimized; lift simulated before spend.' },
  { city: 'Zurich', country: 'Switzerland', lat: 47.3769, lon: 8.5417, emoji: '📊', title: 'Financial Analysis', blurb: 'Narratives from numbers—models explain variance, surface risks, and draft board-ready insights.' },
  { city: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050, emoji: '🔎', title: 'Knowledge Mining', blurb: 'Search → answers; docs → insights. Retrieval + synthesis turns silos into a living knowledge graph.' },
  { city: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503, emoji: '🤖', title: 'Robotics & Automation', blurb: 'Language-to-action plans let robots adapt on the fly; perception + policy improve with feedback.' },
];

// ---- Map helpers (equirectangular projection) ----
// x% = (lon+180)/360 * 100; y% = (90-lat)/180 * 100  (works with the Wikimedia map)
function lonLatToPercents(lon: number, lat: number) {
  const leftPct = ((lon + 180) / 360) * 100;
  const topPct = ((90 - lat) / 180) * 100;
  return { leftPct, topPct };
}

function pctClamp(n: number) {
  return Math.max(0, Math.min(100, n));
}

type AnchorPick = Anchor;
function pickAnchor(leftPct: number, topPct: number): AnchorPick {
  if (topPct < 22) return 'bottom';
  if (topPct > 78) return 'top';
  if (leftPct < 28) return 'right';
  if (leftPct > 72) return 'left';
  return 'bottom';
}

// For overlay SVG (viewBox 0..100 x 0..50), convert top% to half-scale
function toSvgCoords(leftPct: number, topPct: number) {
  return { x: leftPct, y: (topPct / 100) * 50 };
}

function connectorPath(x: number, y: number, anchor: Anchor) {
  const len = 10; // % length in SVG space
  switch (anchor) {
    case 'left':   return `M ${x} ${y} C ${x - len * 0.4} ${y}, ${x - len * 0.8} ${y}, ${x - len} ${y}`;
    case 'right':  return `M ${x} ${y} C ${x + len * 0.4} ${y}, ${x + len * 0.8} ${y}, ${x + len} ${y}`;
    case 'top':    return `M ${x} ${y} C ${x} ${y - len * 0.4}, ${x} ${y - len * 0.8}, ${x} ${y - len}`;
    case 'bottom':
    default:       return `M ${x} ${y} C ${x} ${y + len * 0.4}, ${x} ${y + len * 0.8}, ${x} ${y + len}`;
  }
}

const Badge: React.FC<{ title: string; anchor: Anchor }> = ({ title, anchor }) => {
  const pos: React.CSSProperties =
    anchor === 'left'
      ? { right: '115%', top: '50%', transform: 'translateY(-50%)' }
      : anchor === 'right'
      ? { left: '115%', top: '50%', transform: 'translateY(-50%)' }
      : anchor === 'bottom'
      ? { top: '120%', left: '50%', transform: 'translateX(-50%)' }
      : { bottom: '120%', left: '50%', transform: 'translateX(-50%)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_SOFT }}
      style={{
        position: 'absolute',
        padding: '6px 10px',
        borderRadius: 999,
        fontSize: 12,
        background: 'rgba(255,255,255,0.92)',
        color: '#334155',
        boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
        border: '1px solid rgba(0,0,0,0.06)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        ...pos,
      }}
    >
      {title}
    </motion.div>
  );
};

export default function Slide13() {
  // Place nodes using lon/lat → %
  const nodes: NodePlaced[] = React.useMemo(() => {
    return GEO_NODES.map(n => {
      const { leftPct, topPct } = lonLatToPercents(n.lon, n.lat);
      return {
        ...n,
        leftPct: pctClamp(leftPct),
        topPct: pctClamp(topPct),
      };
    });
  }, []);

  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  // Auto-advance every ~4s; pause on hover
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(i => (i + 1) % nodes.length), 4000);
    return () => clearInterval(id);
  }, [paused, nodes.length]);

  const activeNode = nodes[active];
  const activeAnchor: Anchor = activeNode.anchor ?? pickAnchor(activeNode.leftPct, activeNode.topPct);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      style={{
        ...slideContainer,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '40px 60px',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_SOFT }}
        style={{ fontSize: '3rem', color: '#1f2937', marginBottom: 10, textAlign: 'center' }}
      >
        Generative AI in Action
      </motion.h2>

      {/* Auto-advancing spotlight card (syncs with active node) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.title}
          initial={{ y: -8, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -6, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_SOFT }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 10px 24px rgba(0,0,0,0.10)',
            marginBottom: 8,
            maxWidth: 720,
          }}
        >
          <div style={{ fontSize: 18 }}>{activeNode.emoji}</div>
          <div style={{ fontWeight: 800, color: '#0f172a' }}>
            {activeNode.title} — <span style={{ fontWeight: 600, color: '#334155' }}>{activeNode.city}, {activeNode.country}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator */}
      <div style={{ width: '60%', maxWidth: 520, height: 6, borderRadius: 4, background: '#e2e8f0', overflow: 'hidden', marginBottom: 12 }}>
        <motion.div
          key={active}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3.6, ease: EASE_SOFT }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #22c55e)' }}
        />
      </div>
      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
        Chapter {active + 1}/{nodes.length}
      </div>

      {/* Map stage (2:1 aspect ratio) */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 1200, margin: '14px 0 26px' }}>
        <div style={{ width: '100%', paddingTop: '50%', position: 'relative' }}>
          {/* Map image */}
          <motion.img
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt="World Map"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(10%)',
              pointerEvents: 'none',
            }}
          />

          {/* Overlay SVG for glow + connectors (percentage coordinate space) */}
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <defs>
              <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
                <stop offset="60%" stopColor="rgba(34,197,94,0.25)" />
                <stop offset="100%" stopColor="rgba(34,197,94,0)" />
              </radialGradient>
            </defs>

            {/* ambient glow tracking active node */}
            <AnimatePresence>
              <motion.circle
                key={`glow-${active}`}
                cx={toSvgCoords(activeNode.leftPct, activeNode.topPct).x}
                cy={toSvgCoords(activeNode.leftPct, activeNode.topPct).y}
                r={10}
                fill="url(#glowGrad)"
                initial={{ opacity: 0, r: 7 }}
                animate={{ opacity: 0.5, r: 11 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE_SOFT }}
              />
            </AnimatePresence>

            {/* Active dashed connector */}
            <motion.path
              key={`conn-${active}`}
              d={connectorPath(
                toSvgCoords(activeNode.leftPct, activeNode.topPct).x,
                toSvgCoords(activeNode.leftPct, activeNode.topPct).y,
                activeAnchor
              )}
              fill="none"
              stroke="#64748b"
              strokeWidth={0.6}
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            />
          </svg>

          {/* HTML nodes (badges & emoji) */}
          {nodes.map((n, i) => {
            const isActive = i === active;
            const anchor = n.anchor ?? pickAnchor(n.leftPct, n.topPct);
            return (
              <div
                key={`${n.city}-${n.title}`}
                onClick={() => setActive(i)}
                style={{
                  position: 'absolute',
                  left: `${n.leftPct}%`,
                  top: `${n.topPct}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                }}
                title={`${n.title} — ${n.city}, ${n.country}`}
              >
                {/* ripples */}
                <motion.span
                  style={{
                    position: 'absolute',
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid rgba(59,130,246,0.35)',
                  }}
                  animate={isActive ? { scale: [0.9, 1.2, 1.35], opacity: [0.6, 0.35, 0] } : { opacity: 0 }}
                  transition={{ duration: 1.6, repeat: isActive ? Infinity : 0, ease: EASE_SOFT }}
                />
                <motion.span
                  style={{
                    position: 'absolute',
                    width: 78,
                    height: 78,
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid rgba(34,197,94,0.28)',
                  }}
                  animate={isActive ? { scale: [0.9, 1.35, 1.6], opacity: [0.5, 0.25, 0] } : { opacity: 0 }}
                  transition={{ duration: 2.2, repeat: isActive ? Infinity : 0, ease: EASE_SOFT }}
                />

                {/* icon */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    boxShadow: isActive ? '0 14px 36px rgba(0,0,0,0.20)' : '0 10px 26px rgba(0,0,0,0.12)',
                  }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '1.5rem',
                    background: 'white',
                    border: '1px solid rgba(0,0,0,0.06)',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: EASE_SOFT, delay: 0.2 }}>
                    {n.emoji}
                  </motion.span>
                </motion.div>

                {/* badge */}
                <Badge title={n.title} anchor={anchor} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Narrator panel (auto-advances) */}
      <div style={{ position: 'absolute', bottom: 40, width: '90%', maxWidth: 1200, left: '50%', transform: 'translateX(-50%)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.title}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_SOFT }}
            style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
              borderRadius: 14,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <div style={{ fontSize: 20, lineHeight: '24px' }}>{activeNode.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
                {activeNode.title} — <span style={{ fontWeight: 600, color: '#334155' }}>{activeNode.city}, {activeNode.country}</span>
              </div>
              <div style={{ color: '#334155', fontSize: 14, lineHeight: 1.5 }}>{activeNode.blurb}</div>
            </div>
            <motion.button
              onClick={() => setActive((i) => (i + 1) % nodes.length)}
              whileTap={{ scale: 0.98 }}
              style={{
                border: 'none',
                background: 'linear-gradient(90deg, #3b82f6, #22c55e)',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 999,
                fontSize: 12,
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              }}
              aria-label="Next chapter"
            >
              Next →
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
