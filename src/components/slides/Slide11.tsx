import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { slideContainer, titleStyle, fadeInUp } from '../../styles/slideStyles';

// --- Data for All Chart Elements ---
const chartElements = [
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

const elementData = {
    'AI as a Tool': { description: 'Human Controls Task & uses AI to automate simple sub-tasks.' },
    'AI as a Consultant': { description: 'Human Controls Task with substantial help from AI, but only when envoked by human.', items: ['Financial Services Ops', 'Underwriting assist', 'Claims assist', 'Clinical study reports'] },
    'AI as a Collaborator': { description: 'Human & AI play equal & complementary roles in the co-ordination of goals & execution of tasks.', items: ['Sales, Onboarding', 'Content Generation for Marketing', 'Fraud Detection', 'Autonomous IT Ops'] },
    'AI as an Expert': { description: 'AI controls task & uses human for feedback, input, and to execute simple sub-tasks.' },
    'Autonomous AI': { description: 'AI does everything.', items: ['GenAI powered Marketing Ops', 'Autonomous claims processing', 'Reimagined Drug discovery'] },
};

// --- Style & Positioning ---
// This function returns precise absolute positions based on the NEW bar proportions.
const getElementStyle = (element) => {
    const baseStyle = { position: 'absolute', willChange: 'opacity, transform' };
    switch (element.type) {
        case 'card':
            if (element.subType === 'definition') {
                const positions = {
                    'AI as a Tool':         { top: '12%', left: '15%', width: '18%', height: '22%' },
                    'AI as a Consultant':   { top: '65%', left: '15%', width: '18%', height: '22%' },
                    'AI as a Collaborator': { top: '65%', left: '48%', width: '18%', height: '22%' },
                    'AI as an Expert':      { top: '12%', left: '77%', width: '18%', height: '22%' },
                    'Autonomous AI':      { top: '65%', left: '77%', width: '18%', height: '22%' },
                };
                return { ...baseStyle, ...positions[element.title] };
            } else { // list
                const positions = {
                    'AI as a Consultant':   { top: '65%', left: '34%', width: '13%', height: '22%' },
                    'AI as a Collaborator': { top: '65%', left: '67%', width: '13%', height: '22%' },
                    'Autonomous AI':      { top: '65%', left: '96%', width: '13%', height: '22%' },
                };
                return { ...baseStyle, ...positions[element.for] };
            }
        case 'connector':
            const positions = {
                'tool':         { top: '35%', left: '24%', height: '10%' },
                'consultant':   { top: '55%', left: '24%', height: '10%' },
                'collaborator': { top: '55%', left: '57%', height: '10%' },
                'expert':       { top: '35%', left: '86%', height: '10%' },
                'autonomous':   { top: '55%', left: '86%', height: '10%' },
            };
            return { ...baseStyle, ...positions[element.to], width: '2px', background: '#aaa' };
        default: return {};
    }
};

const cardBaseStyle = {
  padding: '15px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)',
  textAlign: 'left', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column'
};
const listCardStyle = { ...cardBaseStyle, background: 'rgba(230, 240, 255, 0.9)', fontSize: '0.9rem' };

// --- The Main Slide Component ---
const AIAutonomySlide = () => {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const slideRef = useRef(null);
  const isInView = useInView(slideRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView || visibleIndex >= chartElements.length - 1) return;
    const timer = setTimeout(() => {
      setVisibleIndex(prev => prev + 1);
    }, visibleIndex === -1 ? 500 : 3000);
    return () => clearTimeout(timer);
  }, [visibleIndex, isInView]);

  return (
    <div ref={slideRef} style={{ ...slideContainer, background: '#e4e8f0', justifyContent: 'flex-start' }}>
      <motion.h1 initial="hidden" animate={visibleIndex >= 0 ? 'visible' : 'hidden'} variants={fadeInUp} style={{...titleStyle, margin: '40px 0', textAlign: 'center'}}>
        Levels Of AI Autonomy
      </motion.h1>

      {/* Positioning Stage */}
      <div style={{ width: '100%', maxWidth: '1600px', flexGrow: 1, position: 'relative' }}>
        
        {/* The Bar - with NEW proportions as you suggested */}
        <motion.div initial="hidden" animate={visibleIndex >= 1 ? 'visible' : 'hidden'} variants={fadeInUp}
          style={{ position: 'absolute', top: '45%', left: '5%', width: '90%', height: '10%', display: 'flex', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
        >
          <div style={{ width: '10%', background: '#6c757d', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9em' }}>Human</div>
          <div style={{ width: '35%', background: '#3182CE', color: 'white', textAlign: 'center', padding: '10px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>80%</div><div>Assist</div>
          </div>
          <div style={{ width: '30%', background: '#63B3ED', color: 'white', textAlign: 'center', padding: '10px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>19%</div><div>Augment</div>
          </div>
          <div style={{ width: '25%', background: '#90CDF4', color: 'white', textAlign: 'center', padding: '10px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1%</div><div>Transform</div>
          </div>
        </motion.div>

        {/* Render Cards and Connectors */}
        {chartElements.filter(el => el.type !== 'title' && el.type !== 'bar').map(element => {
          const isVisible = element.id <= visibleIndex;
          const style = getElementStyle(element);

          return (
            <motion.div key={element.id} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={fadeInUp} style={style}>
              {element.type === 'card' && (
                <div style={{...(element.subType === 'list' ? listCardStyle : cardBaseStyle), height: '100%'}}>
                  {element.subType === 'definition' ? (
                    <>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#1a365d' }}>{element.title}</h3>
                      <p style={{ margin: 0, fontSize: '1rem', color: '#4a5568' }}>{elementData[element.title].description}</p>
                    </>
                  ) : (
                    <ul style={{ margin: 0, paddingLeft: '20px', color: '#4a5568' }}>
                      {elementData[element.for].items.map((item, i) => <li key={i} style={{marginBottom: '5px'}}>{item}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AIAutonomySlide;