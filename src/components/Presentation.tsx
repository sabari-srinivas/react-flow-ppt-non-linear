import React, { useState, useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  ReactFlowProvider,
  useReactFlow,
  type NodeProps,
} from 'reactflow';
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

type SlideNodeData = {
  component: React.ReactNode;
  color?: string;
  isHub?: boolean;
};

const SlideNode = ({ data, isFocused }: NodeProps<SlideNodeData> & { isFocused: boolean }) => {
  const wrapperStyle: React.CSSProperties = {
    width: 1600,
    height: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    border: data.isHub ? '8px solid black' : '2px solid #ddd',
    borderColor: data.color || '#ddd',
    borderRadius: '8px',
    boxShadow: isFocused ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)' : '0 8px 24px rgba(0,0,0,0.15)',
    transition: 'all 300ms ease-in-out',
    transform: isFocused ? 'scale(1.1)' : 'scale(1)',
    zIndex: isFocused ? 100 : 1,
    pointerEvents: 'auto',
  };

  const innerStyle: React.CSSProperties = {
    width: '95%',
    height: '95%',
    position: 'relative',
    pointerEvents: 'auto',
    overflow: 'hidden',
  };

  const stopAll = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <div style={wrapperStyle}>
      <div
        className="nodrag nopan nowheel"
        style={innerStyle}
        onPointerDown={stopAll}
        onMouseDown={stopAll}
        onMouseUp={stopAll}
        onClick={stopAll}
        onDoubleClick={stopAll}
        onContextMenu={stopAll}
        onWheel={stopAll}
      >
        {data.component}
      </div>
    </div>
  );
};

const slideComponents = [
  <Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />, <Slide6 />, <Slide7 />, <Slide8 />, <Slide9 />, <Slide10 />,
  <Slide11 />, <Slide12 />, <Slide13 />, <Slide14 />, <Slide15 />, <Slide16 />, <Slide17 />, <Slide18 />, <Slide19 />, <Slide20 />,
  <Slide21 />, <Slide22 />, <Slide23 />, <Slide24 />, <Slide25 />, <Slide26 />, <Slide27 />
];

const X_GAP = 2000;
const Y_GAP = 1200;

const initialNodes: Node<SlideNodeData>[] = [
  // --- MIDDLE STACK (blue) ---
  { id: '1',  type: 'slideNode', position: { x: 0, y: -2 * Y_GAP }, data: { component: slideComponents[0],  color: '#3b82f6' } },
  { id: '2',  type: 'slideNode', position: { x: 0, y: -1 * Y_GAP }, data: { component: slideComponents[1],  color: '#3b82f6', isHub: true } },
  { id: '4',  type: 'slideNode', position: { x: 0, y: 0 },            data: { component: slideComponents[3],  color: '#3b82f6' } },
  { id: '6',  type: 'slideNode', position: { x: 0, y: 1 * Y_GAP },   data: { component: slideComponents[5],  color: '#3b82f6' } },
  { id: '10', type: 'slideNode', position: { x: 0, y: 2 * Y_GAP },   data: { component: slideComponents[9],  color: '#3b82f6' } },
  { id: '11', type: 'slideNode', position: { x: 0, y: 3 * Y_GAP },   data: { component: slideComponents[10], color: '#3b82f6' } },
  { id: '3',  type: 'slideNode', position: { x: 1 * X_GAP, y: -1 * Y_GAP }, data: { component: slideComponents[2],  color: '#3b82f6' } },
  { id: '5',  type: 'slideNode', position: { x: 1 * X_GAP, y: 0 },            data: { component: slideComponents[4],  color: '#3b82f6' } },
  { id: '7',  type: 'slideNode', position: { x: 1 * X_GAP, y: 1 * Y_GAP },   data: { component: slideComponents[6],  color: '#3b82f6' } },
  { id: '8',  type: 'slideNode', position: { x: 2 * X_GAP, y: 1 * Y_GAP },   data: { component: slideComponents[7],  color: '#3b82f6' } },
  { id: '9',  type: 'slideNode', position: { x: 3 * X_GAP, y: 1 * Y_GAP },   data: { component: slideComponents[8],  color: '#3b82f6' } },

  // --- LEFT STACK (green) ---
  { id: '12', type: 'slideNode', position: { x: -3 * X_GAP, y: -2 * Y_GAP }, data: { component: slideComponents[11], color: '#22c55e', isHub: true } },
  { id: '13', type: 'slideNode', position: { x: -3 * X_GAP, y: -1 * Y_GAP }, data: { component: slideComponents[12], color: '#22c55e' } },
  { id: '15', type: 'slideNode', position: { x: -3 * X_GAP,   y: 0 },          data: { component: slideComponents[14], color: '#22c55e' } },
  { id: '18', type: 'slideNode', position: { x: -3 * X_GAP,   y: 1 * Y_GAP },  data: { component: slideComponents[17], color: '#22c55e' } },
  { id: '19', type: 'slideNode', position: { x: -3 * X_GAP,   y: 2 * Y_GAP },  data: { component: slideComponents[18], color: '#22c55e' } },
  { id: '20', type: 'slideNode', position: { x: -3 * X_GAP,   y: 3 * Y_GAP },  data: { component: slideComponents[19], color: '#22c55e' } },
  // left branches (16 & 17 spaced apart)
  { id: '14', type: 'slideNode', position: { x: -1.5 * X_GAP, y: -1 * Y_GAP }, data: { component: slideComponents[13], color: '#22c55e' } },
 
 { id: '16', type: 'slideNode', position: { x: -2 * X_GAP, y: 0.3 * Y_GAP }, data: { component: slideComponents[15], color: '#22c55e' } },
 { id: '17', type: 'slideNode', position: { x: -1.0 * X_GAP, y: 0.3 * Y_GAP }, data: { component: slideComponents[16], color: '#22c55e' } },

  // --- RIGHT STACK (purple → grey) ---
  { id: '21', type: 'slideNode', position: { x: 4 * X_GAP, y: -2 * Y_GAP },    data: { component: slideComponents[20], color: '#a855f7', isHub: true } },
  { id: '22', type: 'slideNode', position: { x: 4 * X_GAP, y: -1 * Y_GAP },    data: { component: slideComponents[21], color: '#a855f7' } },
  { id: '23', type: 'slideNode', position: { x: 3.5 * X_GAP, y: 0 },          data: { component: slideComponents[22], color: '#a855f7' } },
  { id: '24', type: 'slideNode', position: { x: 4.5 * X_GAP, y: 0 },          data: { component: slideComponents[23], color: '#a855f7' } },
  { id: '25', type: 'slideNode', position: { x: 4 * X_GAP, y: 1 * Y_GAP },    data: { component: slideComponents[24], color: '#6b7280' } },
  { id: '26', type: 'slideNode', position: { x: 4 * X_GAP, y: 2 * Y_GAP },    data: { component: slideComponents[25], color: '#6b7280' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e6-10', source: '6', target: '10' },
  { id: 'e10-11', source: '10', target: '11' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
  { id: 'e12-13', source: '12', target: '13' },
  { id: 'e13-15', source: '13', target: '15' },
  { id: 'e15-18', source: '15', target: '18' },
  { id: 'e18-19', source: '18', target: '19' },
  { id: 'e19-20', source: '19', target: '20' },
  { id: 'e13-14', source: '13', target: '14' },
  { id: 'e16-17', source: '16', target: '17' },
  { id: 'e14-17', source: '14', target: '17' },
  { id: 'e21-22', source: '21', target: '22' },
  { id: 'e22-23', source: '22', target: '23' },
  { id: 'e22-24', source: '22', target: '24' },
  { id: 'e23-25', source: '23', target: '25' },
  { id: 'e24-25', source: '24', target: '25' },
  { id: 'e25-26', source: '25', target: '26' },
];

const Presentation = () => {
  const { fitView } = useReactFlow();
  const currentSlide = useStore((s) => s.currentSlide);
  const goTo = useStore((s) => s.actions.goTo);
  const next = useStore((s) => s.actions.next);
  const prev = useStore((s) => s.actions.prev);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const memoizedEdges = useMemo(
    () =>
      initialEdges.map((edge) => ({
        ...edge,
        animated: edge.source === hoveredNodeId,
        style: {
          stroke: edge.source === hoveredNodeId ? '#e11d48' : '#b1b1b7',
          strokeWidth: edge.source === hoveredNodeId ? 3 : 2,
        },
      })),
    [hoveredNodeId]
  );

  const nodeTypes = useMemo(
    () => ({
      slideNode: (props: NodeProps<SlideNodeData>) => (
        <SlideNode {...props} isFocused={props.id === focusedNodeId} />
      ),
    }),
    [focusedNodeId]
  );

  const handleNodeClick = (_: React.MouseEvent, node: Node) => {
    setFocusedNodeId(focusedNodeId === node.id ? null : node.id);
  };

  const handlePaneClick = () => setFocusedNodeId(null);

  const handleMinimapNodeClick = (_: React.MouseEvent, node: Node) => {
    goTo(node.id);
    fitView({ nodes: [{ id: node.id }], duration: 800, padding: 0.2 });
  };

  const nodeColor = (node: Node) => (node.id === currentSlide ? '#ef4444' : node.data?.color || '#6b7280');
  const nodeStrokeColor = (node: Node) => (node.data?.isHub ? '#000000' : node.data?.color || '#6b7280');

  // This effect focuses the view on the current slide
  useEffect(() => {
    // A small delay can prevent race conditions on initial load
    setTimeout(() => {
        fitView({ nodes: [{ id: currentSlide }], duration: 800, padding: 0.2 });
    }, 10);
  }, [currentSlide, fitView]);

  // ADDED: This effect sets the initial slide to '1' when the component mounts
  useEffect(() => {
    goTo('1');
  }, [goTo]); // The goTo function is stable, so this effect runs only once

  // This effect handles keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        const editable = target.isContentEditable;
        if (editable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
          return;
        }
      }

      const k = e.key;
      if (k === 'ArrowRight' || k === 'ArrowDown') {
        e.preventDefault();
        next();
      } else if (k === 'ArrowLeft' || k === 'ArrowUp') {
        e.preventDefault();
        prev();
      } else if (k === 'm' || k === 'M') {
        setIsMapVisible(v => !v);
      }
    };

    const listenerOptions: AddEventListenerOptions = { capture: true };
    window.addEventListener('keydown', onKeyDown, listenerOptions);
    return () => window.removeEventListener('keydown', onKeyDown, listenerOptions);
  }, [next, prev]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <button
        onClick={() => fitView({ duration: 800 })}
        style={{
          position: 'absolute',
          top: '70px',
          left: '10px',
          zIndex: 101,
          padding: '8px 12px',
          cursor: 'pointer',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          fontSize: '14px',
        }}
      >
        Reset View
      </button>

      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 101,
          padding: '4px 8px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          borderRadius: '4px',
          fontSize: '12px',
        }}
      >
        Press 'M' to toggle map
      </div>

      <ReactFlow
        nodes={initialNodes}
        edges={memoizedEdges}
        nodeTypes={nodeTypes}
        // REMOVED the fitView prop to prevent showing all slides initially
        proOptions={{ hideAttribution: true }}
        onNodeMouseEnter={(_, node) => setHoveredNodeId(node.id)}
        onNodeMouseLeave={() => setHoveredNodeId(null)}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        selectionOnDrag={false}
        panOnDrag={[1, 2]}
        zoomOnScroll={false}
        zoomOnPinch={true}
        panOnScroll={false}
      >
        <Background />
        <Controls />

        {isMapVisible && (
          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeColor={nodeStrokeColor}
            nodeStrokeWidth={4}
            nodeBorderRadius={3}
            onNodeClick={handleMinimapNodeClick}
            style={{
              width: 600,
              height: 450,
              border: '4px solid #1f2937',
              borderRadius: '16px',
              backgroundColor: '#f9fafb',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              zIndex: 50,
            }}
            pannable
            zoomable
            maskColor="rgba(100, 116, 139, 0.1)"
          />
        )}
      </ReactFlow>
    </div>
  );
};

const PresentationWrapper = () => (
  <ReactFlowProvider>
    <Presentation />
  </ReactFlowProvider>
);

export default PresentationWrapper;