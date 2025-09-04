import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, cubicBezier, type Variants } from 'framer-motion';

// ---------- Types ----------
type TitleKey =
  | 'AI as a Tool'
  | 'AI as a Consultant'
  | 'AI as a Collaborator'
  | 'AI as an Expert'
  | 'Autonomous AI';

type TitleElement = { id: number; type: 'title'; text: string };
type BarElement = { id: number; type: 'bar' };
type ConnectorElement = {
  id: number;
  type: 'connector';
  to: 'tool' | 'consultant' | 'collaborator' | 'expert' | 'autonomous';
};
type DefinitionCardElement = {
  id: number;
  type: 'card';
  subType: 'definition';
  title: TitleKey;
};
type ListCardElement = {
  id: number;
  type: 'card';
  subType: 'list';
  for: TitleKey;
};

type ChartElement =
  | TitleElement
  | BarElement
  | ConnectorElement
  | DefinitionCardElement
  | ListCardElement;

// --- Inlined Styles for self-containment ---
const slideContainer: React.CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.8rem',
  fontWeight: 800,
  color: '#1a202c',
};

// Use cubicBezier to satisfy strict TS easing types
const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

// --- Data (unchanged) ---
const chartElements: ChartElement[] = [
  { id: 0, type: 'title', text: 'Levels Of AI Autonomy' },
  { id: 1, type: 'bar' },
  { id: 2, type: 'connector', to: 'tool' },
  { id: 3, type: 'card', subType: 'definition', title: 'AI as a Tool' },
  { id: 4, type: 'connector', to: 'consultant' },
  { id: 5, type: 'card', subType: 'definition', title: 'AI as a Consultant' },
  { id: 6, type: 'card', subType: 'list', for: 'AI as a Consultant' },
  { id: 7, type: 'connector', to: 'collaborator' },
  { id: 8, type: 'card', subType: 'definition', title: 'AI as a Collaborator' },
  { id: 9, type: 'card', subType: 'list', for: 'AI as a Collaborator' },
  { id: 10, type: 'connector', to: 'expert' },
  { id: 11, type: 'card', subType: 'definition', title: 'AI as an Expert' },
  { id: 12, type: 'connector', to: 'autonomous' },
  { id: 13, type: 'card', subType: 'definition', title: 'Autonomous AI' },
  { id: 14, type: 'card', subType: 'list', for: 'Autonomous AI' },
];

const elementData: Record<string, { description: string; items?: string[] }> = {
  'AI as a Tool': { description: 'Human Controls Task & uses AI to automate simple sub-tasks.' },
  'AI as a Consultant': {
    description: 'Human Controls Task with substantial help from AI, but only when envoked by human.',
    items: ['Financial Services Ops', 'Underwriting assist', 'Claims assist', 'Clinical study reports'],
  },
  'AI as a Collaborator': {
    description: 'Human & AI play equal & complementary roles in the co-ordination of goals & execution of tasks.',
    items: ['Sales, Onboarding', 'Content Generation for Marketing', 'Fraud Detection', 'Autonomous IT Ops'],
  },
  'AI as an Expert': { description: 'AI controls task & uses human for feedback, input, and to execute simple sub-tasks.' },
  'Autonomous AI': {
    description: 'AI does everything.',
    items: ['GenAI powered Marketing Ops', 'Autonomous claims processing', 'Reimagined Drug discovery'],
  },
};

// --- Styles (adjusted to avoid overlap) ---
const getElementStyle = (element: ChartElement): React.CSSProperties => {
  const baseStyle: React.CSSProperties = { position: 'absolute', willChange: 'opacity, transform' };

  switch (element.type) {
    case 'card': {
      if (element.subType === 'definition') {
        const positions: Record<TitleKey, React.CSSProperties> = {
          'AI as a Tool': { top: '12%', left: '10%', width: '18%', height: '22%' },
          'AI as a Consultant': { top: '65%', left: '10%', width: '18%', height: '22%' },
          'AI as a Collaborator': { top: '65%', left: '42%', width: '18%', height: '22%' },
          'AI as an Expert': { top: '12%', left: '74%', width: '18%', height: '22%' },
          'Autonomous AI': { top: '65%', left: '74%', width: '13%', height: '22%' },
        };
        return { ...baseStyle, ...positions[element.title] };
      } else {
        const positions: Record<TitleKey, React.CSSProperties> = {
          'AI as a Tool': { top: '0%', left: '0%', width: '0%', height: '0%' }, // not used
          'AI as a Consultant': { top: '65%', left: '30%', width: '10%', height: '22%' },
          'AI as a Collaborator': { top: '65%', left: '62%', width: '11%', height: '22%' },
          'AI as an Expert': { top: '0%', left: '0%', width: '0%', height: '0%' }, // not used
          'Autonomous AI': { top: '65%', left: '89%', width: '10%', height: '22%' },
        };
        return { ...baseStyle, ...positions[element.for] };
      }
    }
    case 'connector': {
      const positions: Record<ConnectorElement['to'], React.CSSProperties> = {
        tool: { top: '35%', left: '20%', height: '10%' },
        consultant: { top: '55%', left: '20%', height: '10%' },
        collaborator: { top: '55%', left: '51%', height: '10%' },
        expert: { top: '35%', left: '83%', height: '10%' },
        autonomous: { top: '55%', left: '80.5%', height: '10%' },
      };
      return { ...baseStyle, ...positions[element.to], width: '2px', background: '#aaa' };
    }
    default:
      return baseStyle;
  }
};

const cardBaseStyle: React.CSSProperties = {
  padding: '15px',
  borderRadius: '8px',
  background: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  border: '1px solid rgba(0,0,0,0.05)',
  textAlign: 'left',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
};

const listCardStyle: React.CSSProperties = {
  ...cardBaseStyle,
  background: 'rgba(230, 240, 255, 0.9)',
  fontSize: '0.8rem',
};

// --- Main Slide ---
const AIAutonomySlide = () => {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(slideRef, { once: false, amount: 0.5 });

  useEffect(() => {
    // Avoid NodeJS namespace: use ReturnType<typeof setInterval>
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isInView) {
      if (visibleIndex < chartElements.length - 1) {
        timer = setInterval(() => {
          setVisibleIndex((prev) => {
            if (prev < chartElements.length - 1) {
              return prev + 1;
            }
            if (timer) clearInterval(timer);
            return prev;
          });
        }, 600);
      }
    } else {
      setVisibleIndex(-1);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isInView, visibleIndex]);

  return (
    <div ref={slideRef} style={{ ...slideContainer, background: '#e4e8f0', justifyContent: 'flex-start' }}>
      <motion.h1
        initial="hidden"
        animate={visibleIndex >= 0 ? 'visible' : 'hidden'}
        variants={fadeInUp}
        style={{ ...titleStyle, margin: '40px 0', textAlign: 'center' }}
      >
        Levels Of AI Autonomy
      </motion.h1>

      <div style={{ width: '100%', maxWidth: '1600px', flexGrow: 1, position: 'relative' }}>
        {/* The Bar */}
        <motion.div
          initial="hidden"
          animate={visibleIndex >= 1 ? 'visible' : 'hidden'}
          variants={fadeInUp}
          style={{
            position: 'absolute',
            top: '45%',
            left: '5%',
            width: '90%',
            height: '10%',
            display: 'flex',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
        >
          <div
            style={{
              width: '10%',
              background: '#6c757d',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '0.9em',
            }}
          >
            Human
          </div>
          <div
            style={{
              width: '35%',
              background: '#3182CE',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>80%</div>
            <div style={{ fontSize: '0.9rem' }}>Assist</div>
          </div>
          <div
            style={{
              width: '30%',
              background: '#63B3ED',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>19%</div>
            <div style={{ fontSize: '0.9rem' }}>Augment</div>
          </div>
          <div
            style={{
              width: '25%',
              background: '#90CDF4',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5px',
            }}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1%</div>
            <div style={{ fontSize: '0.9rem' }}>Transform</div>
          </div>
        </motion.div>

        {/* Cards & Connectors */}
        {chartElements
          .filter((el) => el.type !== 'title' && el.type !== 'bar')
          .map((element) => (
            <motion.div
              key={element.id}
              initial="hidden"
              animate={element.id <= visibleIndex ? 'visible' : 'hidden'}
              variants={fadeInUp}
              style={getElementStyle(element)}
            >
              {element.type === 'card' && (
                <div
                  style={{
                    ...(element.subType === 'list' ? listCardStyle : cardBaseStyle),
                    height: '100%',
                  }}
                >
                  {element.subType === 'definition' ? (
                    <>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#1a365d' }}>
                        {element.title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '1rem', color: '#4a5568' }}>
                        {elementData[element.title].description}
                      </p>
                    </>
                  ) : (
                    elementData[element.for]?.items && (
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568' }}>
                        {elementData[element.for]!.items!.map((item, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              )}
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default AIAutonomySlide;
