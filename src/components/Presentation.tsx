import type React from 'react';
import { useEffect } from 'react';
import ReactFlow, { Background, Controls, type Node, type Edge, ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';

import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import Slide8 from './slides/Slide8';
import Slide9 from './slides/Slide9';
import Slide10 from './slides/Slide10';
import Slide11 from './slides/Slide11';
import Slide12 from './slides/Slide12';
import Slide13 from './slides/Slide13';
import Slide14 from './slides/Slide14';
import Slide15 from './slides/Slide15';
import Slide16 from './slides/Slide16';
import Slide17 from './slides/Slide17';
import Slide18 from './slides/Slide18';
import Slide19 from './slides/Slide19';
import Slide20 from './slides/Slide20';
import Slide21 from './slides/Slide21';
import Slide22 from './slides/Slide22';
import Slide23 from './slides/Slide23';
import Slide24 from './slides/Slide24';
import Slide25 from './slides/Slide25';
import Slide26 from './slides/Slide26';
import Slide27 from './slides/Slide27';
import { useStore } from '../store';

const nodeTypes = {
  slideNode: ({ data }: { data: { component: React.ReactNode } }) => {
    return (
      <div style={{ width: 1600, height: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <div style={{ width: '95%', height: '95%', position: 'relative' }}>
          {data.component}
        </div>
      </div>
    );
  },
};

const initialNodes: Node[] = [
  { id: '1', type: 'slideNode', position: { x: 0, y: 0 }, width: 1600, height: 900, data: { component: <Slide1 /> } },
  { id: '2', type: 'slideNode', position: { x: 1800, y: 0 }, width: 1600, height: 900, data: { component: <Slide2 /> } },
  { id: '3', type: 'slideNode', position: { x: 3600, y: 0 }, width: 1600, height: 900, data: { component: <Slide3 /> } },
  { id: '4', type: 'slideNode', position: { x: 0, y: 1200 }, width: 1600, height: 900, data: { component: <Slide4 /> } },
  { id: '5', type: 'slideNode', position: { x: 1800, y: 1200 }, width: 1600, height: 900, data: { component: <Slide5 /> } },
  { id: '6', type: 'slideNode', position: { x: 3600, y: 1200 }, width: 1600, height: 900, data: { component: <Slide6 /> } },
  { id: '7', type: 'slideNode', position: { x: 0, y: 2400 }, width: 1600, height: 900, data: { component: <Slide7 /> } },
  { id: '8', type: 'slideNode', position: { x: 1800, y: 2400 }, width: 1600, height: 900, data: { component: <Slide8 /> } },
  { id: '9', type: 'slideNode', position: { x: 3600, y: 2400 }, width: 1600, height: 900, data: { component: <Slide9 /> } },
  { id: '10', type: 'slideNode', position: { x: 0, y: 3600 }, width: 1600, height: 900, data: { component: <Slide10 /> } },
  { id: '11', type: 'slideNode', position: { x: 1800, y: 3600 }, width: 1600, height: 900, data: { component: <Slide11 /> } },
  { id: '12', type: 'slideNode', position: { x: 3600, y: 3600 }, width: 1600, height: 900, data: { component: <Slide12 /> } },
  { id: '13', type: 'slideNode', position: { x: 0, y: 4800 }, width: 1600, height: 900, data: { component: <Slide13 /> } },
  { id: '14', type: 'slideNode', position: { x: 1800, y: 4800 }, width: 1600, height: 900, data: { component: <Slide14 /> } },
  { id: '15', type: 'slideNode', position: { x: 3600, y: 4800 }, width: 1600, height: 900, data: { component: <Slide15 /> } },
  { id: '16', type: 'slideNode', position: { x: 0, y: 6000 }, width: 1600, height: 900, data: { component: <Slide16 /> } },
  { id: '17', type: 'slideNode', position: { x: 1800, y: 6000 }, width: 1600, height: 900, data: { component: <Slide17 /> } },
  { id: '18', type: 'slideNode', position: { x: 3600, y: 6000 }, width: 1600, height: 900, data: { component: <Slide18 /> } },
  { id: '19', type: 'slideNode', position: { x: 0, y: 7200 }, width: 1600, height: 900, data: { component: <Slide19 /> } },
  { id: '20', type: 'slideNode', position: { x: 1800, y: 7200 }, width: 1600, height: 900, data: { component: <Slide20 /> } },
  { id: '21', type: 'slideNode', position: { x: 3600, y: 7200 }, width: 1600, height: 900, data: { component: <Slide21 /> } },
  { id: '22', type: 'slideNode', position: { x: 0, y: 8400 }, width: 1600, height: 900, data: { component: <Slide22 /> } },
  { id: '23', type: 'slideNode', position: { x: 1800, y: 8400 }, width: 1600, height: 900, data: { component: <Slide23 /> } },
  { id: '24', type: 'slideNode', position: { x: 3600, y: 8400 }, width: 1600, height: 900, data: { component: <Slide24 /> } },
  { id: '25', type: 'slideNode', position: { x: 0, y: 9600 }, width: 1600, height: 900, data: { component: <Slide25 /> } },
  { id: '26', type: 'slideNode', position: { x: 1800, y: 9600 }, width: 1600, height: 900, data: { component: <Slide26 /> } },
  { id: '27', type: 'slideNode', position: { x: 3600, y: 9600 }, width: 1600, height: 900, data: { component: <Slide27 /> } },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },
    { id: 'e6-7', source: '6', target: '7', animated: true },
    { id: 'e7-8', source: '7', target: '8', animated: true },
    { id: 'e8-9', source: '8', target: '9', animated: true },
    { id: 'e9-10', source: '9', target: '10', animated: true },
    { id: 'e10-11', source: '10', target: '11', animated: true },
    { id: 'e11-12', source: '11', target: '12', animated: true },
    { id: 'e12-13', source: '12', target: '13', animated: true },
    { id: 'e13-14', source: '13', target: '14', animated: true },
    { id: 'e14-15', source: '14', target: '15', animated: true },
    { id: 'e15-16', source: '15', target: '16', animated: true },
    { id: 'e16-17', source: '16', target: '17', animated: true },
    { id: 'e17-18', source: '17', target: '18', animated: true },
    { id: 'e18-19', source: '18', target: '19', animated: true },
    { id: 'e19-20', source: '19', target: '20', animated: true },
    { id: 'e20-21', source: '20', target: '21', animated: true },
    { id: 'e21-22', source: '21', target: '22', animated: true },
    { id: 'e22-23', source: '22', target: '23', animated: true },
    { id: 'e23-24', source: '23', target: '24', animated: true },
    { id: 'e24-25', source: '24', target: '25', animated: true },
    { id: 'e25-26', source: '25', target: '26', animated: true },
    { id: 'e26-27', source: '26', target: '27', animated: true },
];

// Define non-linear navigation relationships
const childrenMap: Record<string, string[]> = {
    // Core branch focused on early narrative
    '1': ['2', '4'],           // Intro -> What is AI? or Types of AI
    '5': ['11', '16'],         // From Neural Networks -> LLMs or AI Agents

    // Keep light continuity for later slides (can be refined later)
    '6': ['7'],
    '7': ['8'],
    '8': ['9'],
    '9': ['10'],
    '10': ['11'],
    '11': ['12'],
    '12': ['13'],
    '13': ['14'],
    '14': ['15'],
    '15': ['16'],
    '16': ['17'],
    '17': ['18'],
    '18': ['19'],
    '19': ['20'],
    '20': ['21'],
    '21': ['22'],
    '22': ['23'],
    '23': ['24'],
    '24': ['25'],
    '25': ['26'],
    '26': ['27'],
    '27': ['28'],
};

const parentMap: Record<string, string | undefined> = Object.keys(childrenMap).reduce((acc, key) => {
    for (const child of childrenMap[key]) {
        acc[child] = acc[child] ?? key;
    }
    return acc;
}, {} as Record<string, string | undefined>);

// Buttons removed; using keyboard navigation only

const Presentation = () => {
    const { fitView } = useReactFlow();
    const currentSlide = useStore((state) => state.currentSlide);
    const next = useStore((state) => state.actions.next);
    const prev = useStore((state) => state.actions.prev);
    const goTo = useStore((state) => state.actions.goTo);

    useEffect(() => {
        // Ensure the canvas initially fits all slides
        fitView({ padding: 0.2, duration: 500 });
    }, [fitView]);

    useEffect(() => {
        // Focus the current slide when it changes
        fitView({ nodes: [{ id: currentSlide }], duration: 800, padding: 0.2 });
    }, [currentSlide, fitView]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                next();
            } else if (e.key === 'ArrowLeft') {
                prev();
            } else if (e.key === 'ArrowDown') {
                const children = childrenMap[currentSlide] || [];
                if (children[0]) {
                    goTo(children[0]);
                }
            } else if (e.key === 'ArrowUp') {
                const parent = parentMap[currentSlide];
                if (parent) {
                    goTo(parent);
                }
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currentSlide, next, prev, goTo]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {/* Keyboard navigation only; on-screen buttons removed */}
    </div>
  );
};

const PresentationWrapper = () => (
    <ReactFlowProvider>
        <Presentation />
    </ReactFlowProvider>
)

export default PresentationWrapper;
