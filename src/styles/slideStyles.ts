// Base container styles
export const slideContainer = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column' as const,
  padding: '40px',
  boxSizing: 'border-box' as const,
  textAlign: 'center' as const,
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
  borderRadius: '12px',
  overflow: 'hidden',
  position: 'relative' as const,
};

// Alternative container for full-bleed slides
export const fullBleedContainer = {
  ...slideContainer,
  padding: 0,
  borderRadius: 0,
  background: 'white',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};

// Typography styles
export const titleStyle = {
  fontSize: '4.5rem',
  color: '#1a365d',
  margin: '0 0 20px 0',
  fontWeight: 700,
  lineHeight: 1.2,
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const sectionTitleStyle = {
  ...titleStyle,
  fontSize: '3.5rem',
  marginBottom: '30px',
  color: '#2d3748',
};

export const subtitleStyle = {
  fontSize: '2rem',
  color: '#4a5568',
  margin: '0 0 40px 0',
  fontWeight: 400,
  maxWidth: '90%',
  lineHeight: 1.4,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const bodyTextStyle = {
  fontSize: '1.6rem',
  color: '#4a5568',
  lineHeight: 1.6,
  margin: '0 0 20px 0',
  maxWidth: '1000px',
  textAlign: 'left' as const,
};

// Layout containers
export const contentContainer = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  overflowY: 'auto' as const,
};

export const twoColumnLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '40px',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  alignItems: 'center',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
};

export const threeColumnLayout = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
  width: '100%',
  maxWidth: '1600px',
  margin: '0 auto',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
};

// Card components
export const cardContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '20px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    padding: '10px',
  },
};

export const featureCardContainer = {
  ...cardContainer,
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '25px',
  margin: '30px 0',
};

// Card styles
export const cardStyle = {
  background: 'white',
  borderRadius: '12px',
  padding: '30px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column' as const,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  },
};

export const featureCardStyle = {
  ...cardStyle,
  textAlign: 'left' as const,
  padding: '25px',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  },
};

export const imageCardStyle = {
  ...cardStyle,
  padding: 0,
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
  },
  '& > div': {
    padding: '20px',
  },
};

// Text styles for cards
export const cardTitleStyle = {
  fontSize: '1.8rem',
  color: '#2d3748',
  margin: '0 0 15px 0',
  fontWeight: 600,
  lineHeight: 1.3,
};

export const cardSubtitleStyle = {
  fontSize: '1.4rem',
  color: '#4a5568',
  margin: '0 0 15px 0',
  fontWeight: 500,
};

export const cardTextStyle = {
  fontSize: '1.2rem',
  color: '#4a5568',
  lineHeight: 1.6,
  margin: 0,
};

// Utility classes
export const centeredContent = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center' as const,
  height: '100%',
};

export const spacedChildren = (gap = '20px') => ({
  '& > *:not(:last-child)': {
    marginBottom: gap,
  },
});

// Animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Color themes
export const colorThemes = {
  primary: {
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    color: 'white',
  },
  secondary: {
    background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    color: 'white',
  },
  accent: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    color: 'white',
  },
};
