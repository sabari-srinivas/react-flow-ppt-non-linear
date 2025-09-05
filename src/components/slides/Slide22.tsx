import { motion, useAnimation, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { slideContainer } from "../../styles/slideStyles";
import {
  EASE,
  EASE_INOUT,
  containerStyle,
  h2Style,
  leadStyle,
  footNoteStyle,
  stepRowStyle,
  stepArrowStyle,
  stepChipBase,
  progressTrackStyle,
  progressFillStyle,
  sceneBox,
  stepCardDock,
  stepCardStyle,
  stepCardTitle,
  stepCardLine,
  backWall,
  counter,
  stoveStyle,
  heatGlow,
  potStyle,
  lidStyle,
  steamArea,
  steamBubbleBase,
  chefStyle,
  ingredientsStyle,
  decisionBubble,
  dishStyle,
  svgOverlay,
} from "../../styles/slide22.bundle";

/** Small presentational bits (now using imported styles) */
const StepChip = ({ label, active }: { label: string; active: boolean }) => (
  <motion.div
    initial={false}
    animate={{
      background: active
        ? "linear-gradient(90deg,#ff2e63,#ff9f43)"
        : "rgba(255,255,255,0.9)",
      color: active ? "#fff" : "#0f172a",
      scale: active ? 1.04 : 1,
      boxShadow: active
        ? "0 10px 20px rgba(255,46,99,0.25)"
        : "0 4px 12px rgba(0,0,0,0.08)",
    }}
    transition={{ duration: 0.35, ease: EASE }}
    style={stepChipBase}
  >
    {label}
  </motion.div>
);

const StepCard = ({ title, line }: { title: string; line: string }) => (
  <motion.div
    initial={{ y: 12, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -8, opacity: 0 }}
    transition={{ duration: 0.35, ease: EASE }}
    style={stepCardStyle}
  >
    <div style={stepCardTitle}>{title}</div>
    <div style={stepCardLine}>{line}</div>
  </motion.div>
);

const Slide22 = () => {
  const chefControls = useAnimation();
  const ingredientControls = useAnimation();
  const decisionControls = useAnimation();
  const dishControls = useAnimation();
  const potControls = useAnimation();
  const steamControls = useAnimation();
  const glowControls = useAnimation();

  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [cycleKey, setCycleKey] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rootRef, { amount: 0.5, margin: "0px", once: false });

  useEffect(() => {
    let cancelled = false;

    const startLoop = async () => {
      while (!cancelled) {
        setCycleKey((k) => k + 1);

        await Promise.all([
          ingredientControls.start({ opacity: 0, x: 0, y: 0, scale: 1, transition: { duration: 0 } }),
          decisionControls.start({ opacity: 0, scale: 0.95, transition: { duration: 0 } }),
          dishControls.start({ opacity: 0, y: 0, transition: { duration: 0 } }),
          potControls.start({ scale: 1, transition: { duration: 0 } }),
          steamControls.start({ opacity: 0, transition: { duration: 0 } }),
          glowControls.start({ opacity: 0, transition: { duration: 0 } }),
          chefControls.start({ x: 0, transition: { duration: 0 } }),
        ]);

        // STEP 1 — PERCEIVE
        setStep(0);
        await ingredientControls.start({
          opacity: 1,
          x: [-60, 0, 0],
          y: [0, -6, 0],
          scale: [0.95, 1.02, 1],
          transition: { duration: 1.1, ease: EASE },
        });
        await chefControls.start({ x: -80, transition: { duration: 0.6, ease: EASE } });
        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) break;

        // STEP 2 — REASON
        setStep(1);
        await decisionControls.start({
          opacity: 1,
          scale: [0.95, 1.05, 1],
          transition: { duration: 0.9, ease: EASE },
        });
        await chefControls.start({ x: 0, transition: { duration: 0.6, ease: EASE } });
        await new Promise((r) => setTimeout(r, 600));
        if (cancelled) break;

        // STEP 3 — ACT
        setStep(2);
        glowControls.start({
          opacity: [0, 1, 0.6, 1],
          transition: { duration: 1.2, ease: EASE_INOUT, repeat: 2, repeatType: "mirror" },
        });
        potControls.start({
          scale: [1, 1.03, 1],
          transition: { duration: 0.6, repeat: 3, repeatType: "mirror", ease: EASE },
        });
        steamControls.start({
          opacity: [0, 0.9, 0.6, 0.9],
          transition: { duration: 1.4, repeat: 2, repeatType: "mirror", ease: EASE_INOUT },
        });
        await dishControls.start({
          opacity: 1,
          y: [-10, 0],
          transition: { duration: 0.8, ease: EASE },
        });

        await new Promise((r) => setTimeout(r, 1200));
        if (cancelled) break;
      }
    };

    if (inView) {
      cancelled = false;
      startLoop();
    } else {
      cancelled = true;
      ingredientControls.stop();
      decisionControls.stop();
      dishControls.stop();
      potControls.stop();
      steamControls.stop();
      glowControls.stop();
      chefControls.stop();
      setStep(0);
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const stepCard =
    step === 0
      ? { title: "Perceive", line: "Chef notices ingredients: 🥕 🍅 🥦 (inputs from the world)." }
      : step === 1
      ? { title: "Reason", line: "Chef plans a recipe: sauté → simmer → season (decides next actions)." }
      : { title: "Act", line: "Chef cooks and plates the dish 🍲 (executes the plan)." };

  return (
    <div ref={rootRef} style={{ ...slideContainer, ...containerStyle }}>
      <motion.h2
        style={h2Style}
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        AI Agent Workflow — A Kitchen Story
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        style={leadStyle}
      >
        An AI agent behaves like a chef: it <b>perceives</b> ingredients, <b>reasons</b> a recipe, and <b>acts</b> to serve a dish.
      </motion.p>

      <div style={stepRowStyle}>
        <StepChip label="Perceive" active={step === 0} />
        <span style={stepArrowStyle}>→</span>
        <StepChip label="Reason" active={step === 1} />
        <span style={stepArrowStyle}>→</span>
        <StepChip label="Act" active={step === 2} />
      </div>

      <div style={progressTrackStyle}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={step + "-" + cycleKey}
            initial={{ width: "0%" }}
            animate={{ width: step === 0 ? "33%" : step === 1 ? "66%" : "100%" }}
            transition={{ duration: 0.6, ease: EASE }}
            style={progressFillStyle}
          />
        </AnimatePresence>
      </div>

      <motion.div
        style={sceneBox}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Step explainer card */}
        <div style={stepCardDock}>
          <AnimatePresence mode="wait">
            <StepCard key={step + "-" + cycleKey} title={stepCard.title} line={stepCard.line} />
          </AnimatePresence>
        </div>

        {/* Back wall & counter */}
        <div style={backWall} />
        <div style={counter} />

        {/* Stove & effects */}
        <div style={stoveStyle} />
        <motion.div animate={glowControls} style={heatGlow} />
        <motion.div animate={potControls} style={potStyle} />
        <div style={lidStyle} />
        <motion.div animate={steamControls} style={steamArea}>
          <motion.div
            animate={{ y: [-4, -18, -4], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: EASE_INOUT }}
            style={{ ...steamBubbleBase, left: 20, width: 24, height: 24 }}
          />
          <motion.div
            animate={{ y: [-6, -22, -6], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: EASE_INOUT, delay: 0.2 }}
            style={{ ...steamBubbleBase, left: 68, width: 26, height: 26 }}
          />
          <motion.div
            animate={{ y: [-5, -20, -5], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: EASE_INOUT, delay: 0.35 }}
            style={{ ...steamBubbleBase, left: 112, width: 22, height: 22 }}
          />
        </motion.div>

        {/* Chef & props */}
        <motion.div style={chefStyle} animate={chefControls}>
          👨‍🍳
        </motion.div>

        <motion.div style={ingredientsStyle} animate={ingredientControls}>
          🥕 🍅 🥦
        </motion.div>

        {/* Decision bubble */}
        <motion.div style={decisionBubble} animate={decisionControls}>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Recipe Plan 🧠</div>
          <div style={{ fontSize: 12, color: "#475569" }}>Sauté veggies → simmer → season → plate</div>
        </motion.div>

        {/* Dish */}
        <motion.div style={dishStyle} animate={dishControls}>
          🍲
        </motion.div>

        {/* Flow overlay */}
        <svg style={svgOverlay} viewBox="0 0 760 380" preserveAspectRatio="none">
          <motion.path
            d="M 120 80 C 260 100 500 80 640 100"
            fill="none"
            stroke="#ff2e63"
            strokeWidth="3"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, ease: EASE_INOUT, repeat: Infinity, repeatType: "mirror" }}
          />
          <motion.path
            d="M 640 100 C 520 180 420 230 380 260"
            fill="none"
            stroke="#ff9f43"
            strokeWidth="3"
            strokeDasharray="6 6"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: 0.9 }}
            transition={{ duration: 1.2, ease: EASE_INOUT, repeat: Infinity, repeatType: "mirror", delay: 0.4 }}
          />
        </svg>
      </motion.div>

      <motion.p
        style={footNoteStyle}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <b>Perceive:</b> the chef reads the kitchen (inputs) • <b>Reason:</b> plans the recipe (decision) • <b>Act:</b> cooks & serves (action).
      </motion.p>
    </div>
  );
};

export default Slide22;
