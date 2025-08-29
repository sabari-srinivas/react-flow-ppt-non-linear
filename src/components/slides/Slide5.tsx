import { motion } from 'framer-motion';

// === Atomics ===
const Neuron = ({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={15}
    fill="#4a90e2"
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
  />
);

const PulseRing = ({ x, y, color = '#4a90e2', delay = 0 }: { x: number; y: number; color?: string; delay?: number }) => (
  <motion.circle
    cx={x}
    cy={y}
    r={20}
    stroke={color}
    strokeWidth={2}
    fill="transparent"
    initial={{ opacity: 0, scale: 0.75 }}
    animate={{ opacity: [0, 0.6, 0], scale: [0.75, 1.1, 1.25] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay }}
  />
);

const Connection = ({
  x1, y1, x2, y2, delay = 0,
}: { x1: number; y1: number; x2: number; y2: number; delay?: number }) => (
  <motion.line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#95a5a6"
    strokeWidth={2}
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 0.6, delay }}
  />
);

const DataDot = ({
  startX, startY, endX, endY, delay = 0,
}: { startX: number; startY: number; endX: number; endY: number; delay?: number }) => (
  <motion.circle
    r={5}
    fill="#f39c12"
    initial={{ cx: startX, cy: startY }}
    animate={{ cx: [startX, endX], cy: [startY, endY] }}
    transition={{ duration: 1.4, delay, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
  />
);

// reverse-moving dot to depict backprop gradients
const BackpropDot = ({
  startX, startY, endX, endY, delay = 0,
}: { startX: number; startY: number; endX: number; endY: number; delay?: number }) => (
  <motion.circle
    r={4}
    fill="#e74c3c"
    initial={{ cx: endX, cy: endY }}
    animate={{ cx: [endX, startX], cy: [endY, startY] }}
    transition={{ duration: 1.6, delay, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
  />
);

// === Variants ===
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const Slide5 = () => {
  const inputLayer = [
    { x: 100, y: 100 },
    { x: 100, y: 200 },
    { x: 100, y: 300 },
  ];
  const hiddenLayer1 = [
    { x: 250, y: 150 },
    { x: 250, y: 250 },
  ];
  const outputLayer = [{ x: 400, y: 200 }];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '40px',
        boxSizing: 'border-box',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Backdrop */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(1200px 400px at 20% -10%, #eaf6ff 0%, transparent 60%), radial-gradient(1000px 300px at 120% 110%, #fff9f0 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <motion.h2
        style={{
          fontSize: '2.5rem',
          color: '#2c3e50',
          marginBottom: 8,
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Neural Networks
      </motion.h2>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 180, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ height: 5, background: '#4a90e2', borderRadius: 4, margin: '0 auto 12px' }}
      />

      {/* Content Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          position: 'relative',
          zIndex: 1,
          height: 'calc(100% - 92px)',
          minHeight: 0,
        }}
      >
        {/* Left: Neural Networks (keep existing) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{
            background: 'white',
            borderRadius: 12,
            padding: 16,
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <div>
            <motion.h3 variants={itemVariants} style={{ color: '#2c3e50', marginBottom: 6 }}>
              Neural Networks
            </motion.h3>
            <motion.p variants={itemVariants} style={{ fontSize: '0.98rem', color: '#34495e', marginBottom: 10 }}>
              A stack of layers where each neuron applies a weighted sum and non-linear activation. Parameters (weights & biases) are learned to minimize a loss via backpropagation and an optimizer (e.g., Adam).
            </motion.p>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{ color: '#2c3e50', paddingLeft: 16, lineHeight: 1.45, fontSize: '0.92rem', margin: 0 }}
            >
              <motion.li variants={itemVariants}>
                <strong>Input → Hidden → Output</strong> with non-linear activations.
              </motion.li>
              <motion.li variants={itemVariants}>
                <strong>Forward pass</strong>: compute predictions; <strong>Loss</strong>: measure error.
              </motion.li>
              <motion.li variants={itemVariants}>
                <strong>Backprop + Update</strong>: propagate gradients and adjust weights.
              </motion.li>
            </motion.ul>
          </div>

          {/* Mini training-loop animation (existing) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: 10, height: 110, flexShrink: 0 }}
          >
            <svg width="100%" height="110" viewBox="0 0 300 110" preserveAspectRatio="xMidYMid meet">
              <motion.path
                d="M20,90 Q100,40 280,20"
                stroke="#e74c3c"
                strokeWidth={3}
                fill="transparent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
              />
              <text x="10" y="105" fontSize="12" fill="#7f8c8d">
                Epochs
              </text>
              <text x="250" y="36" fontSize="12" fill="#7f8c8d">
                Loss ↓
              </text>
            </svg>
          </motion.div>

          {/* Legend (new) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 5, background: '#f39c12', display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: '#7f8c8d' }}>Forward activations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 5, background: '#e74c3c', display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: '#7f8c8d' }}>Backprop gradients</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Diagram (kept, plus labels & extra anims) */}
        <div
          style={{
            background: 'white',
            borderRadius: 12,
            padding: 12,
            boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            minHeight: 0,
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 520 400" preserveAspectRatio="xMidYMid meet">
            {/* Column labels */}
            <motion.text x="70" y="40" fontSize="14" fill="#34495e" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              Input
            </motion.text>
            <motion.text x="235" y="40" fontSize="14" fill="#34495e" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              Hidden
            </motion.text>
            <motion.text x="390" y="40" fontSize="14" fill="#34495e" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              Output
            </motion.text>

            {/* Labels above the arrow animations (NEW) */}
            <motion.text x="140" y="70" fontSize="12" fill="#f39c12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Forward pass: activations →
            </motion.text>
            <motion.text x="300" y="70" fontSize="12" fill="#f39c12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Forward to logits →
            </motion.text>
            <motion.text x="160" y="58" fontSize="11" fill="#e74c3c" initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 1.2 }}>
              ← Backpropagating gradients
            </motion.text>

            {/* Connections (existing) */}
            {inputLayer.map((inputNeuron, i) =>
              hiddenLayer1.map((hiddenNeuron, j) => (
                <Connection
                  key={`c-in-${i}-h-${j}`}
                  x1={inputNeuron.x}
                  y1={inputNeuron.y}
                  x2={hiddenNeuron.x}
                  y2={hiddenNeuron.y}
                  delay={0.45 + i * 0.05}
                />
              )),
            )}
            {hiddenLayer1.map((hiddenNeuron, i) =>
              outputLayer.map((outputNeuron, j) => (
                <Connection
                  key={`c-h-${i}-out-${j}`}
                  x1={hiddenNeuron.x}
                  y1={hiddenNeuron.y}
                  x2={outputNeuron.x}
                  y2={outputNeuron.y}
                  delay={0.9 + i * 0.05}
                />
              )),
            )}

            {/* Forward activations (existing) */}
            {inputLayer.map((inputNeuron, i) =>
              hiddenLayer1.map((hiddenNeuron, j) => (
                <DataDot
                  key={`d-in-${i}-h-${j}`}
                  startX={inputNeuron.x}
                  startY={inputNeuron.y}
                  endX={hiddenNeuron.x}
                  endY={hiddenNeuron.y}
                  delay={0.4 + i * 0.15}
                />
              )),
            )}
            {hiddenLayer1.map((hiddenNeuron, i) =>
              outputLayer.map((outputNeuron, j) => (
                <DataDot
                  key={`d-h-${i}-out-${j}`}
                  startX={hiddenNeuron.x}
                  startY={hiddenNeuron.y}
                  endX={outputNeuron.x}
                  endY={outputNeuron.y}
                  delay={0.8 + i * 0.15}
                />
              )),
            )}

            {/* Backprop gradients (NEW, reverse direction) */}
            {hiddenLayer1.map((hiddenNeuron, i) =>
              inputLayer.map((inputNeuron, j) => (
                <BackpropDot
                  key={`bd-h-${i}-in-${j}`}
                  startX={inputNeuron.x}
                  startY={inputNeuron.y}
                  endX={hiddenNeuron.x}
                  endY={hiddenNeuron.y}
                  delay={1.0 + i * 0.1}
                />
              )),
            )}
            {outputLayer.map((outputNeuron, i) =>
              hiddenLayer1.map((hiddenNeuron, j) => (
                <BackpropDot
                  key={`bd-out-${i}-h-${j}`}
                  startX={hiddenNeuron.x}
                  startY={hiddenNeuron.y}
                  endX={outputNeuron.x}
                  endY={outputNeuron.y}
                  delay={1.2 + i * 0.1}
                />
              )),
            )}

            {/* Neurons (existing + new pulse rings) */}
            {inputLayer.map((neuron, i) => (
              <g key={`input-${i}`}>
                <Neuron {...neuron} delay={i * 0.1} />
                <PulseRing x={neuron.x} y={neuron.y} color="#4a90e2" delay={0.2 + i * 0.6} />
              </g>
            ))}
            {hiddenLayer1.map((neuron, i) => (
              <g key={`hidden1-${i}`}>
                <Neuron {...neuron} delay={0.5 + i * 0.1} />
                <PulseRing x={neuron.x} y={neuron.y} color="#3b82f6" delay={0.6 + i * 0.75} />
              </g>
            ))}
            {outputLayer.map((neuron, i) => (
              <g key={`output-${i}`}>
                <Neuron {...neuron} delay={1 + i * 0.1} />
                <motion.circle
                  cx={neuron.x}
                  cy={neuron.y}
                  r={20}
                  stroke="#4a90e2"
                  strokeWidth={2}
                  fill="transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.1, 1.25] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 1.0 }}
                />
              </g>
            ))}

            <motion.text
              x={30}
              y={360}
              fontSize={11}
              fill="#7f8c8d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              features → weighted sums → activation → logits
            </motion.text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Slide5;
