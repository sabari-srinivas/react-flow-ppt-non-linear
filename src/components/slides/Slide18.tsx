import { motion } from 'framer-motion';
import { slideContainer, titleStyle } from '../../styles/slideStyles';

type Startup = {
  name: string;
  description: string;
  logo: string;
  delay: number;
};

const Card = ({ logo, name, description, delay }: Startup) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{
      y: -10,
      scale: 1.05,
      boxShadow: '0 18px 36px rgba(0,0,0,0.15)',
    }}
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
      minHeight: 260, // a bit taller to accommodate larger logos nicely
      margin: '0 auto',
      transition: 'all 0.25s ease',
    }}
  >
    {/* Logo with a gentle pop-in */}
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
        // graceful fallback if an external image fails to load
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

const IndianGenAISlide = () => {
  const startups: Startup[] = [
    {
      name: 'Sarvam AI',
      description: 'Open-source Hindi AI models',
      logo:
        'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202503/67d9219443c9e-sarvam-ai-183230392-16x9.jpg?size=948:533',
      delay: 0.2,
    },
    {
      name: 'Dave.AI',
      description: 'AI personalization for retail',
      logo:
        'https://images.yourstory.com/cs/images/companies/logo-1586419571285.jpg?fm=auto&ar=1:1&mode=fill&fill=solid&fill-color=fff',
      delay: 0.3,
    },
    {
      name: 'Paraspeak',
      description: 'AI for speech disorders',
      logo: 'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f5e3.svg',
      delay: 0.4,
    },
    {
      name: 'Almonds AI',
      description: 'Loyalty & analytics AI',
      logo: 'https://www.mediainfoline.com/wp-content/uploads/2024/02/Almonds-AI-Logo-mediainfoli.jpg',
      delay: 0.5,
    },
    {
      name: 'KOGO AI',
      description: 'Enterprise engagement AI',
      logo:
        'data:image/png;base64,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',
      delay: 0.6,
    },
  ];

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
        Indian Gen AI Ecosystem
      </motion.h2>

      {/* Row 1 – first 3 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
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
          <Card key={s.name} {...s} />
        ))}
      </motion.div>

      {/* Row 2 – next 2 */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
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
          <Card key={s.name} {...s} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default IndianGenAISlide;
