import React from 'react';
import { motion } from 'framer-motion';
import { slideContainer, titleStyle } from '../../styles/slideStyles';

// ================= Icons (self-contained) =================
const DataEngineerIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0070c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const DataScientistIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0070c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v2m0 16v2m-9-9h2m16 0h2M5.64 5.64l1.41 1.41m10.3 10.3l1.41 1.41M5.64 18.36l1.41-1.41m10.3-10.3l1.41-1.41" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" />
  </svg>
);

const AIEngineerIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0070c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <text x="6" y="12" fontFamily="monospace" fontSize="6" fill="#0070c0">1010</text>
    <text x="6" y="18" fontFamily="monospace" fontSize="6" fill="#0070c0">1010</text>
  </svg>
);

const DeveloperIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0070c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <polyline points="7 8 9 10 7 12" />
    <polyline points="17 8 15 10 17 12" />
  </svg>
);

const TechLeadIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0070c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 5l-3 3 3 3" />
    <path d="M16 5l3 3-3 3" />
    <path d="M12 2v20" />
  </svg>
);

const ArchitectIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0070c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9l10 6 10-6-10-6-10 6z" />
    <path d="M2 15l10 6 10-6" />
    <path d="M2 9v6" />
    <path d="M22 9v6" />
    <path d="M12 3v18" />
  </svg>
);

const PractitionerIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0070c0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    <path d="M12 12v8" />
    <path d="M10 14h4" />
    <path d="M8 16h8" />
    <path d="M6 18h12" />
  </svg>
);

// ================= Role =================
interface RoleProps { icon: React.ReactNode; title: string; desc: string; delay?: number }
const Role: React.FC<RoleProps> = ({ icon, title, desc, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    style={{
      flex: 1,
      minWidth: 140,
      padding: '0 8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <div style={{ marginBottom: 10, color: '#0070c0', height: 48, display: 'flex', alignItems: 'center' }}>{icon}</div>
    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 6, color: '#333', textTransform: 'uppercase' }}>{title}</h3>
    <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.35, margin: 0 }}>{desc}</p>
  </motion.div>
);

// ================= Section Card =================
interface SectionProps {
  title: string;
  caption: string; // e.g., "≈ 1% of your staff"
  delay?: number;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, caption, delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
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
        background: 'linear-gradient(90deg, #f8f9fa 0%, #e9ecef 100%)', 
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}
    >
      <h3 style={{ 
        margin: 0, 
        fontSize: '1.05rem', 
        color: '#1a237e', 
        fontWeight: 700, 
        letterSpacing: '0.3px',
        textTransform: 'uppercase',
        textShadow: '0 1px 1px rgba(255,255,255,0.8)'
      }}>
        {title}
      </h3>
    </motion.div>
    <div style={{ 
      flex: 1, 
      minHeight: 0, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-around', 
      padding: '16px 12px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        transform: 'translateX(-100%)',
        animation: 'shimmer 2.5s infinite',
        zIndex: 1
      }} />
      {children}
    </div>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      style={{ 
        padding: '8px 16px', 
        borderTop: '1px dashed rgba(0, 112, 192, 0.3)', 
        background: 'rgba(240, 247, 255, 0.8)', 
        color: '#0d47a1', 
        fontSize: '0.9rem', 
        fontWeight: 600, 
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      {caption}
    </motion.div>
  </motion.div>
);

// ================= Slide =================
const Slide6: React.FC = () => {
  return (
    <motion.div 
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
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </motion.h2>

      {/* Main content container with padding */}
      <div style={{ 
        flex: 1, 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '1rem', 
        minHeight: 0,
        padding: '0.5rem 0',
        position: 'relative',
        zIndex: 1
      }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14, minHeight: 0 }}>
          <Section title="Build AI" caption="≈ 1% of your staff" delay={0.1}>
            <Role icon={<DataEngineerIcon />} title="DATA ENGINEER" desc="Prepares data for AI & analytics" />
            <Role icon={<DataScientistIcon />} title="DATA SCIENTIST" desc="Creates trusted, accurate models" />
            <Role icon={<AIEngineerIcon />} title="AI ENGINEER" desc="Ships apps using foundation models" />
          </Section>

          <Section title="Build with AI" caption="≈ 10% of your staff" delay={0.5}>
            <Role icon={<DeveloperIcon />} title="AI DEVELOPER" desc="Uses AI tools to code faster" />
            <Role icon={<TechLeadIcon />} title="TECH LEAD" desc="Guides teams with AI reviews" />
            <Role icon={<ArchitectIcon />} title="ARCHITECT" desc="Designs AI-first architectures" />
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <Section title="Use AI for work" caption="≈ 100% of your staff" delay={0.9}>
          <Role icon={<PractitionerIcon />} title="AI PRACTITIONER" desc="Applies AI daily to boost productivity & outcomes." />
        </Section>
      </div>
      
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        opacity: 0.1,
        background: 'radial-gradient(circle at 20% 30%, rgba(100, 181, 246, 0.4) 0%, transparent 40%)'
      }} />
    </motion.div>
  );
};

export default React.memo(Slide6);
