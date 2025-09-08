// src/styles/slide12.bundle.ts
import type { CSSProperties } from 'react';
import type { Variants } from 'framer-motion';

import { slideContainer } from './slideStyles';

export const styles: Record<'wrapper' | 'title', CSSProperties> = {
  wrapper: {
    ...slideContainer,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff', // white background
    padding: '40px 60px',
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: '#000000', // default text color black
  },
  title: {
    fontSize: '4rem',
    fontWeight: 700,
    textAlign: 'center',
    color: '#4e83c3', // black instead of gradient
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

export const variants: Record<'container' | 'title', Variants> = {
  container: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0 },
  },
  title: {
    hidden: { y: -30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  },
};
