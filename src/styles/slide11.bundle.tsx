// src/styles/slide11.bundle.ts
import { cubicBezier, type Variants } from 'framer-motion';
import type { CSSProperties } from 'react';

/* ========= Easings (exact) ========= */
export const EASE_OUT = cubicBezier(0.16, 1, 0.3, 1);

/* ========= Variants (exact) ========= */
export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/* ========= Base slide layout styles (updated: Nunito Sans, white bg, black text) ========= */
export const styles = {
  slideContainer: {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    background: '#ffffff',
    color: '#000000',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  titleStyle: {
    fontSize: '2.8rem',
    fontWeight: 800,
    color: '#000000', // black
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as React.CSSProperties,
  rootBg: {
    background: '#ffffff', // was #e4e8f0
    justifyContent: 'flex-start' as const,
    color: '#000000',
  },
  stage: {
    width: '100%',
    maxWidth: '1600px',
    flexGrow: 1,
    position: 'relative' as const,
  },
  barWrap: {
    position: 'absolute' as const,
    top: '45%',
    left: '5%',
    width: '90%',
    height: '10%',
    display: 'flex',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  barHuman: {
    width: '10%',
    background: '#6c757d',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '0.9em',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  barAssist: {
    width: '35%',
    background: '#3182CE',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  barAugment: {
    width: '30%',
    background: '#63B3ED',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  barTransform: {
    width: '25%',
    background: '#90CDF4',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  /* Cards */
  cardBase: {
    padding: '15px',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.05)',
    textAlign: 'left' as const,
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    color: '#000000',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as React.CSSProperties,
  listCard: {
    padding: '15px',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.05)',
    textAlign: 'left' as const,
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    fontSize: '0.8rem',
    color: '#000000',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  } as React.CSSProperties,
};

/* ========= Element positioning (exact, unchanged) ========= */
export type TitleKey =
  | 'AI as a Tool'
  | 'AI as a Consultant'
  | 'AI as a Collaborator'
  | 'AI as an Expert'
  | 'Autonomous AI';

type ConnectorTo = 'tool' | 'consultant' | 'collaborator' | 'expert' | 'autonomous';

export const getElementStyle = (
  element:
    | { type: 'card'; subType: 'definition'; title: TitleKey }
    | { type: 'card'; subType: 'list'; for: TitleKey }
    | { type: 'connector'; to: ConnectorTo }
): CSSProperties => {
  const base: CSSProperties = { position: 'absolute', willChange: 'opacity, transform' };

  if (element.type === 'card' && element.subType === 'definition') {
    const pos: Record<TitleKey, CSSProperties> = {
      'AI as a Tool':        { top: '12%', left: '10%', width: '18%', height: '22%' },
      'AI as a Consultant':  { top: '65%', left: '10%', width: '18%', height: '22%' },
      'AI as a Collaborator':{ top: '65%', left: '42%', width: '18%', height: '22%' },
      'AI as an Expert':     { top: '12%', left: '74%', width: '18%', height: '22%' },
      'Autonomous AI':       { top: '65%', left: '74%', width: '13%', height: '22%' },
    };
    return { ...base, ...pos[element.title] };
  }

  if (element.type === 'card' && element.subType === 'list') {
    const pos: Record<TitleKey, CSSProperties> = {
      'AI as a Tool':        { top: '0%', left: '0%', width: '0%', height: '0%' },
      'AI as a Consultant':  { top: '65%', left: '30%', width: '10%', height: '22%' },
      'AI as a Collaborator':{ top: '65%', left: '62%', width: '11%', height: '22%' },
      'AI as an Expert':     { top: '0%', left: '0%', width: '0%', height: '0%' },
      'Autonomous AI':       { top: '65%', left: '89%', width: '10%', height: '22%' },
    };
    return { ...base, ...pos[element.for] };
  }

  // connector
  const pos: Record<ConnectorTo, CSSProperties> = {
    tool:        { top: '35%', left: '20%', height: '10%' },
    consultant:  { top: '55%', left: '20%', height: '10%' },
    collaborator:{ top: '55%', left: '51%', height: '10%' },
    expert:      { top: '35%', left: '83%', height: '10%' },
    autonomous:  { top: '55%', left: '80.5%', height: '10%' },
  };

  const key: ConnectorTo = element.to;
  return { ...base, ...pos[key], width: '2px', background: '#aaa' };
};
