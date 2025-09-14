import React from "react";
import { motion } from "framer-motion";

import {
  styles,
  containerVariants,
  itemVariants,
  Neuron,
  PulseRing,
  Connection,
  DataDot,
  BackpropDot,
  HeatPulse,
  GlowConnection,
  LossMini,
  headerIntro,
  miniTrain,
  legendIntro,
} from "../../styles/slide5.bundle";

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
    <div style={styles.root}>
      {/* Backdrop */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        /* style={styles.backdrop} */
      />

      {/* Header (TITLE - centered) */}
      <motion.h2
        style={styles.headerH2}
        initial={headerIntro.titleInitial}
        animate={headerIntro.titleAnimate}
        transition={headerIntro.titleTransition}
      >
        Neural Networks
      </motion.h2>
      <motion.div
        initial={headerIntro.barInitial}
        animate={headerIntro.barAnimate}
        transition={headerIntro.barTransition}
        style={styles.headerBar}
      />

      {/* Content Row */}
      <div style={styles.row}>
        {/* LEFT: explainer */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={styles.leftPanel}
        >
          <div>
            {/* Section title (TITLE - centered) */}
            <motion.h3 variants={itemVariants} style={styles.leftTitle}>
              Neural Networks
            </motion.h3>

            {/* Body text (left-aligned) */}
            <motion.p variants={itemVariants} style={styles.leftPara}>
              A stack of layers where each neuron applies a weighted sum and
              non-linear activation. Parameters (weights & biases) are learned
              to minimize a loss via backpropagation and an optimizer (e.g.,
              Adam).
            </motion.p>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={styles.leftList}
            >
              <motion.li variants={itemVariants}>
                <strong>Input → Hidden → Output</strong> with non-linear
                activations.
              </motion.li>
              <motion.li variants={itemVariants}>
                <strong>Forward pass</strong>: compute predictions;{" "}
                <strong>Loss</strong>: measure error.
              </motion.li>
              <motion.li variants={itemVariants}>
                <strong>Backprop + Update</strong>: propagate gradients and
                adjust weights.
              </motion.li>
            </motion.ul>
          </div>

          {/* Mini training-loop animation */}
          <motion.div
            initial={miniTrain.initial}
            animate={miniTrain.animate}
            transition={miniTrain.transition}
            style={styles.miniTrainWrap}
          >
            <svg
              width="100%"
              height="110"
              viewBox="0 0 300 110"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path
                d="M20,90 Q100,40 280,20"
                stroke="#e74c3c"
                strokeWidth={3}
                fill="transparent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />
              <text x="10" y="105" fontSize="12" fill="#7f8c8d">
                Epochs
              </text>
              <text x="250" y="36" fontSize="12" fill="#7f8c8d">
                Loss ↓
              </text>
            </svg>
          </motion.div>

          {/* Legend (left-aligned) */}
          <motion.div
            initial={legendIntro.initial}
            animate={legendIntro.animate}
            transition={legendIntro.transition}
            style={styles.legendWrap}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={styles.legendDotFwd} />
              <span style={styles.legendText}>Forward activations</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={styles.legendDotBwd} />
              <span style={styles.legendText}>Backprop gradients</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Diagram */}
        <div style={styles.rightPanel}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 520 400"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Column labels (SVG positioned text) */}
            <motion.text
              x="70"
              y="40"
              fontSize="14"
              fill="#34495e"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Input
            </motion.text>
            <motion.text
              x="235"
              y="40"
              fontSize="14"
              fill="#34495e"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              Hidden
            </motion.text>
            <motion.text
              x="390"
              y="40"
              fontSize="14"
              fill="#34495e"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Output
            </motion.text>

            {/* Forward/back labels */}
            <motion.text
              x="140"
              y="70"
              fontSize="12"
              fill="#f39c12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Forward pass: activations →
            </motion.text>
            <motion.text
              x="300"
              y="70"
              fontSize="12"
              fill="#f39c12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Forward to logits →
            </motion.text>
            <motion.text
              x="160"
              y="58"
              fontSize="11"
              fill="#e74c3c"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 1.2 }}
            >
              ← Backpropagating gradients
            </motion.text>

            {/* Connections (base) */}
            {[
              ...inputLayer.flatMap((inputNeuron, i) =>
                hiddenLayer1.map((hiddenNeuron, j) => ({
                  key: `c-in-${i}-h-${j}`,
                  x1: inputNeuron.x,
                  y1: inputNeuron.y,
                  x2: hiddenNeuron.x,
                  y2: hiddenNeuron.y,
                  delay: 0.45 + i * 0.05,
                }))
              ),
              ...hiddenLayer1.flatMap((hiddenNeuron, i) =>
                outputLayer.map((outputNeuron, j) => ({
                  key: `c-h-${i}-out-${j}`,
                  x1: hiddenNeuron.x,
                  y1: hiddenNeuron.y,
                  x2: outputNeuron.x,
                  y2: outputNeuron.y,
                  delay: 0.9 + i * 0.05,
                }))
              ),
            ].map(({ key, x1, y1, x2, y2, delay }) => (
              <Connection
                key={key}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                delay={delay}
              />
            ))}

            {/* Backprop glow overlays */}
            {[
              ...hiddenLayer1.flatMap((hiddenNeuron, i) =>
                inputLayer.map((inputNeuron, j) => ({
                  key: `glow-h-${i}-in-${j}`,
                  x1: hiddenNeuron.x,
                  y1: hiddenNeuron.y,
                  x2: inputNeuron.x,
                  y2: inputNeuron.y,
                  delay: 1.0 + i * 0.2 + j * 0.05,
                }))
              ),
              ...outputLayer.flatMap((outputNeuron, i) =>
                hiddenLayer1.map((hiddenNeuron, j) => ({
                  key: `glow-out-${i}-h-${j}`,
                  x1: outputNeuron.x,
                  y1: outputNeuron.y,
                  x2: hiddenNeuron.x,
                  y2: hiddenNeuron.y,
                  delay: 0.9 + i * 0.2 + j * 0.08,
                }))
              ),
            ].map(({ key, x1, y1, x2, y2, delay }) => (
              <GlowConnection
                key={key}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                delay={delay}
              />
            ))}

            {/* Forward activations */}
            {[
              ...inputLayer.flatMap((inputNeuron, i) =>
                hiddenLayer1.map((hiddenNeuron, j) => ({
                  key: `d-in-${i}-h-${j}`,
                  startX: inputNeuron.x,
                  startY: inputNeuron.y,
                  endX: hiddenNeuron.x,
                  endY: hiddenNeuron.y,
                  delay: 0.4 + i * 0.15,
                }))
              ),
              ...hiddenLayer1.flatMap((hiddenNeuron, i) =>
                outputLayer.map((outputNeuron, j) => ({
                  key: `d-h-${i}-out-${j}`,
                  startX: hiddenNeuron.x,
                  startY: hiddenNeuron.y,
                  endX: outputNeuron.x,
                  endY: outputNeuron.y,
                  delay: 0.8 + i * 0.15,
                }))
              ),
            ].map(({ key, startX, startY, endX, endY, delay }) => (
              <DataDot
                key={key}
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
                delay={delay}
              />
            ))}

            {/* Backprop dots */}
            {[
              ...hiddenLayer1.flatMap((hiddenNeuron, i) =>
                inputLayer.map((inputNeuron, j) => ({
                  key: `bd-h-${i}-in-${j}`,
                  startX: inputNeuron.x,
                  startY: inputNeuron.y,
                  endX: hiddenNeuron.x,
                  endY: hiddenNeuron.y,
                  delay: 1.0 + i * 0.1,
                }))
              ),
              ...outputLayer.flatMap((outputNeuron, i) =>
                hiddenLayer1.map((hiddenNeuron, j) => ({
                  key: `bd-out-${i}-h-${j}`,
                  startX: hiddenNeuron.x,
                  startY: hiddenNeuron.y,
                  endX: outputNeuron.x,
                  endY: outputNeuron.y,
                  delay: 1.2 + i * 0.1,
                }))
              ),
            ].map(({ key, startX, startY, endX, endY, delay }) => (
              <BackpropDot
                key={key}
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
                delay={delay}
              />
            ))}

            {/* Neurons + activation heat pulses */}
            {inputLayer.map((n, i) => (
              <g key={`input-${i}`}>
                <Neuron {...n} delay={i * 0.1} />
                <HeatPulse x={n.x} y={n.y} delay={0.2 + i * 0.6} />
                <PulseRing x={n.x} y={n.y} color="#4a90e2" delay={0.2 + i * 0.6} />
              </g>
            ))}
            {hiddenLayer1.map((n, i) => (
              <g key={`hidden1-${i}`}>
                <Neuron {...n} delay={0.5 + i * 0.1} />
                <HeatPulse
                  x={n.x}
                  y={n.y}
                  base="#93c5fd"
                  highlight="#3b82f6"
                  delay={0.6 + i * 0.75}
                />
                <PulseRing x={n.x} y={n.y} color="#3b82f6" delay={0.6 + i * 0.75} />
              </g>
            ))}
            {outputLayer.map((n, i) => (
              <g key={`output-${i}`}>
                <Neuron {...n} delay={1 + i * 0.1} />
                <HeatPulse
                  x={n.x}
                  y={n.y}
                  base="#86efac"
                  highlight="#10b981"
                  delay={1.0}
                />
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={20}
                  stroke="#4a90e2"
                  strokeWidth={2}
                  fill="transparent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.8, 1.1, 1.25] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 1.0,
                  }}
                />
              </g>
            ))}

            <motion.text
              x="30"
              y="360"
              fontSize={11}
              fill="#7f8c8d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              features → weighted sums → activation → logits
            </motion.text>

            {/* Mini loss preview */}
            <LossMini x={360} y={316} />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Slide5;
