import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { slideContainer, titleStyle } from '../../styles/slideStyles';

/* ================== THEME COLORS ================== */
const COLORS = {
  buildAI: '#0070c0',     // blue (unchanged)
  buildWithAI: '#ff7a00', // orange
  practitioner: '#2e7d32' // green
};

/* ================== Icons (colorable) ================== */
type IconProps = { color?: string };

const DataEngineerIcon: React.FC<IconProps> = ({ color = COLORS.buildAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const DataScientistIcon: React.FC<IconProps> = ({ color = COLORS.buildAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v2m0 16v2m-9-9h2m16 0h2M5.64 5.64l1.41 1.41m10.3 10.3l1.41 1.41M5.64 18.36l1.41-1.41m10.3-10.3l1.41-1.41" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
  </svg>
);

const AIEngineerIcon: React.FC<IconProps> = ({ color = COLORS.buildAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <text x="6" y="12" fontFamily="monospace" fontSize="6" fill={color}>1010</text>
    <text x="6" y="18" fontFamily="monospace" fontSize="6" fill={color}>1010</text>
  </svg>
);

const DeveloperIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <polyline points="7 8 9 10 7 12" />
    <polyline points="17 8 15 10 17 12" />
  </svg>
);

const TechLeadIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 5l-3 3 3 3" />
    <path d="M16 5l3 3-3 3" />
    <path d="M12 2v20" />
  </svg>
);

const ArchitectIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9l10 6 10-6-10-6-10 6z" />
    <path d="M2 15l10 6 10-6" />
    <path d="M2 9v6" />
    <path d="M22 9v6" />
    <path d="M12 3v18" />
  </svg>
);

const PractitionerIcon: React.FC<IconProps> = ({ color = COLORS.practitioner }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    <path d="M12 12v8" />
    <path d="M10 14h4" />
    <path d="M8 16h8" />
    <path d="M6 18h12" />
  </svg>
);

/* New icons for additional Build with AI roles */
const VibecoderIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h18" />
    <path d="M6 16h12" />
    <path d="M8 12h8" />
    <circle cx="4" cy="8" r="1.2" fill={color} />
    <circle cx="20" cy="16" r="1.2" fill={color} />
  </svg>
);

const AIContentGenIcon: React.FC<IconProps> = ({ color = COLORS.buildWithAI }) => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="14" height="16" rx="2" />
    <path d="M7 8h6M7 12h10M7 16h8" />
    <path d="M19 4v6l2 2" />
  </svg>
);

/* ================== Role ================== */
interface RoleProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
  durationSec?: number;        // transition length
  accent?: string;             // underline color
  active?: boolean;            // animate only when true
}
const Role: React.FC<RoleProps> = ({
  icon, title, desc, delay = 0, durationSec = 5, accent = COLORS.buildAI, active = false
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.98 }}
    animate={active ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.98 }}
    transition={{ duration: durationSec, delay, ease: 'easeOut' }} // 5s per card
    style={{
      flex: 1,
      minWidth: 140,
      padding: '0 8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
    whileHover={active ? { y: -4, transition: { duration: 0.25 } } : {}}
  >
    <div style={{ marginBottom: 10, height: 48, display: 'flex', alignItems: 'center' }}>{icon}</div>
    <h3
      style={{
        fontSize: '0.9rem',
        fontWeight: 800,
        marginBottom: 6,
        color: '#222',
        textTransform: 'uppercase',
        borderBottom: `2px solid ${accent}`,
        paddingBottom: 4,
      }}
    >
      {title}
    </h3>
    <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.35, margin: 0 }}>{desc}</p>
  </motion.div>
);

/* ================== Section Card ================== */
interface SectionProps {
  title: string;
  caption: string; // e.g., "≈ 1% of your staff"
  delay?: number;
  children: React.ReactNode;
  theme?: 'blue' | 'orange' | 'green';
  active?: boolean; // animate only when true
}

const themeToColors = (theme: SectionProps['theme']) => {
  switch (theme) {
    case 'orange':
      return {
        headerFrom: '#ffe0cc',
        headerTo: '#fff3e6',
        headerText: '#9c3d00',
        accent: 'rgba(255,122,0,0.45)',
        shimmer: 'rgba(255, 186, 122, 0.35)',
        captionBg: 'rgba(255, 239, 224, 0.9)',
        captionBorder: 'rgba(255, 122, 0, 0.45)',
      };
    case 'green':
      return {
        headerFrom: '#dff3e6',
        headerTo: '#eefaf2',
        headerText: '#1b5e20',
        accent: 'rgba(46,125,50,0.45)',
        shimmer: 'rgba(178, 223, 186, 0.35)',
        captionBg: 'rgba(232, 245, 233, 0.9)',
        captionBorder: 'rgba(46, 125, 50, 0.45)',
      };
    default: // blue
      return {
        headerFrom: '#f0f5ff',
        headerTo: '#e9f0ff',
        headerText: '#1a237e',
        accent: 'rgba(0,112,192,0.45)',
        shimmer: 'rgba(120, 170, 240, 0.35)',
        captionBg: 'rgba(240, 247, 255, 0.9)',
        captionBorder: 'rgba(0, 112, 192, 0.45)',
      };
  }
};

const Section: React.FC<SectionProps> = ({ title, caption, delay = 0, children, theme = 'blue', active = false }) => {
  const C = themeToColors(theme);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay, duration: 0.6 }}
      style={{
        border: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.85)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(4px)',
      }}
    >
      <motion.div
        style={{
          padding: '12px 16px',
          background: `linear-gradient(90deg, ${C.headerFrom} 0%, ${C.headerTo} 100%)`,
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '1.05rem',
            color: C.headerText,
            fontWeight: 800,
            letterSpacing: '0.3px',
            textTransform: 'uppercase',
            textShadow: '0 1px 1px rgba(255,255,255,0.8)',
          }}
        >
          {title}
        </h3>
      </motion.div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '16px 12px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: `linear-gradient(90deg, transparent, ${C.shimmer}, transparent)`,
            transform: 'translateX(-100%)',
            animation: 'shimmer 2.5s infinite',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {children}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          padding: '8px 16px',
          borderTop: `1px dashed ${C.captionBorder}`,
          background: C.captionBg,
          color: C.headerText,
          fontSize: '0.9rem',
          fontWeight: 700,
          textAlign: 'right',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {caption}
      </motion.div>
    </motion.div>
  );
};

/* ================== Slide ================== */
const Slide6: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,     // play once when the slide is first seen
    threshold: 0.35,       // start when ~35% visible
  });

  return (
    <motion.div
      ref={ref}
      className="slide-container"
      style={{
        ...slideContainer,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      }}
    >
      {/* Keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
        style={{
          ...titleStyle,
          fontSize: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'left',
          background: 'linear-gradient(90deg, #1a237e, #0d47a1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          display: 'inline-block',
          width: 'auto',
          paddingBottom: '0.5rem',
        }}
      >
        Who uses AI?
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '3px',
            background: 'linear-gradient(90deg, #1a73e8, #34a853)',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </motion.h2>

      {/* Main content container with padding */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1rem',
          minHeight: 0,
          padding: '0.5rem 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          {/* Build AI (Blue - unchanged) */}
          <Section title="Build AI" caption="≈ 1% of your staff" delay={0.1} theme="blue" active={inView}>
            {inView && (
              <>
                <Role icon={<DataEngineerIcon color={COLORS.buildAI} />} title="DATA ENGINEER" desc="Prepares data for AI & analytics" durationSec={5} accent={COLORS.buildAI} active />
                <Role icon={<DataScientistIcon color={COLORS.buildAI} />} title="DATA SCIENTIST" desc="Creates trusted, accurate models" durationSec={5} accent={COLORS.buildAI} active />
                <Role icon={<AIEngineerIcon color={COLORS.buildAI} />} title="AI ENGINEER" desc="Ships apps using foundation models" durationSec={5} accent={COLORS.buildAI} active />
              </>
            )}
          </Section>

          {/* Build with AI (Orange) */}
          <Section title="Build with AI" caption="≈ 10% of your staff" delay={0.5} theme="orange" active={inView}>
            {inView && (
              <>
                <Role icon={<DeveloperIcon color={COLORS.buildWithAI} />} title="AI DEVELOPER" desc="Uses AI tools to code faster" durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<TechLeadIcon color={COLORS.buildWithAI} />} title="TECH LEAD" desc="Guides teams with AI reviews" durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<ArchitectIcon color={COLORS.buildWithAI} />} title="ARCHITECT" desc="Designs AI-first architectures" durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<VibecoderIcon color={COLORS.buildWithAI} />} title="VIBECODER" desc="Turns vibes into code: scaffold, refactor & align UI to intent." durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<AIContentGenIcon color={COLORS.buildWithAI} />} title="AI CONTENT GENERATION" desc="Creates on-brand copy, docs, and media with human-in-the-loop." durationSec={5} accent={COLORS.buildWithAI} active />
              </>
            )}
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        {/* Use AI for work (Green) */}
        <Section title="Use AI for work" caption="≈ 100% of your staff" delay={0.9} theme="green" active={inView}>
          {inView && (
            <Role
              icon={<PractitionerIcon color={COLORS.practitioner} />}
              title="AI PRACTITIONER"
              desc="Applies AI daily to boost productivity & outcomes."
              durationSec={5}
              accent={COLORS.practitioner}
              active
            />
          )}
        </Section>
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.1,
          background: 'radial-gradient(circle at 20% 30%, rgba(100, 181, 246, 0.4) 0%, transparent 40%)',
        }}
      />
    </motion.div>
  );
};

export default React.memo(Slide6);
