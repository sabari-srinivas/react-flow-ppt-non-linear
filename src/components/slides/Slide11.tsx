import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import {
  styles,
  fadeInUp,
  getElementStyle,
  type TitleKey,
} from '../../styles/slide11.bundle';

/* ---------- Types that remain for content ---------- */
type TitleElement = { id: number; type: 'title'; text: string };
type BarElement = { id: number; type: 'bar' };
type ConnectorElement = { id: number; type: 'connector'; to: 'tool' | 'consultant' | 'collaborator' | 'expert' | 'autonomous' };
type DefinitionCardElement = { id: number; type: 'card'; subType: 'definition'; title: TitleKey };
type ListCardElement = { id: number; type: 'card'; subType: 'list'; for: TitleKey };

type ChartElement =
  | TitleElement
  | BarElement
  | ConnectorElement
  | DefinitionCardElement
  | ListCardElement;

/* ---------- Data (unchanged) ---------- */
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

/* ---------- Slide ---------- */
const AIAutonomySlide = () => {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(slideRef, { once: false, amount: 0.5 });

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    if (isInView) {
      if (visibleIndex < chartElements.length - 1) {
        timer = setInterval(() => {
          setVisibleIndex(prev => {
            if (prev < chartElements.length - 1) return prev + 1;
            if (timer) clearInterval(timer);
            return prev;
          });
        }, 600);
      }
    } else {
      setVisibleIndex(-1);
    }

    return () => { if (timer) clearInterval(timer); };
  }, [isInView, visibleIndex]);

  return (
    <div
      ref={slideRef}
      style={{ ...styles.slideContainer, ...styles.rootBg }}
    >
      <motion.h1
        initial="hidden"
        animate={visibleIndex >= 0 ? 'visible' : 'hidden'}
        variants={fadeInUp}
        style={{ ...styles.titleStyle, margin: '40px 0', textAlign: 'center' }}
      >
        Levels Of AI Autonomy
      </motion.h1>

      <div style={styles.stage}>
        {/* The Bar */}
        <motion.div
          initial="hidden"
          animate={visibleIndex >= 1 ? 'visible' : 'hidden'}
          variants={fadeInUp}
          style={styles.barWrap}
        >
          <div style={styles.barHuman}>
            Human
          </div>
          <div style={styles.barAssist}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>80%</div>
            <div style={{ fontSize: '0.9rem' }}>Assist</div>
          </div>
          <div style={styles.barAugment}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>19%</div>
            <div style={{ fontSize: '0.9rem' }}>Augment</div>
          </div>
          <div style={styles.barTransform}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>1%</div>
            <div style={{ fontSize: '0.9rem' }}>Transform</div>
          </div>
        </motion.div>

        {/* Cards & Connectors */}
        {chartElements
          .filter(el => el.type !== 'title' && el.type !== 'bar')
          .map(element => (
            <motion.div
              key={element.id}
              initial="hidden"
              animate={element.id <= visibleIndex ? 'visible' : 'hidden'}
              variants={fadeInUp}
              style={
                element.type === 'card'
                  ? getElementStyle(element.subType === 'definition'
                      ? { type: 'card', subType: 'definition', title: (element as any).title }
                      : { type: 'card', subType: 'list', for: (element as any).for })
                  : getElementStyle({ type: 'connector', to: (element as any).to })
              }
            >
              {element.type === 'card' && (
                <div style={element.subType === 'list' ? styles.listCard : styles.cardBase}>
                  {element.subType === 'definition' ? (
                    <>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#1a365d' }}>
                        {(element as DefinitionCardElement).title}
                      </h3>
                      <p style={{ margin: 0, fontSize: '1rem', color: '#4a5568' }}>
                        {elementData[(element as DefinitionCardElement).title].description}
                      </p>
                    </>
                  ) : (
                    elementData[(element as ListCardElement).for]?.items && (
                      <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568' }}>
                        {elementData[(element as ListCardElement).for]!.items!.map((item, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>{item}</li>
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
