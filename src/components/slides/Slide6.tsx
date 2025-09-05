import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideContainer, titleStyle } from "../../styles/slideStyles";

import {
  COLORS,
  styles,
  headerMotion,
  shimmerKeyframes,
  Section,
  Role,
  DataEngineerIcon,
  DataScientistIcon,
  AIEngineerIcon,
  DeveloperIcon,
  TechLeadIcon,
  ArchitectIcon,
  VibecoderIcon,
  AIContentGenIcon,
  PractitionerIcon,
} from "../../styles/slide6.bundle";

/* ================== Slide ================== */
const Slide6: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.35,
  });

  return (
    <motion.div
      ref={ref}
      className="slide-container"
      style={{ ...slideContainer, ...styles.containerExtra }}
    >
      {/* Keyframes for shimmer (moved to bundle) */}
      <style>{shimmerKeyframes}</style>

      <motion.h2
        initial={headerMotion.titleInitial}
        animate={inView ? headerMotion.titleAnimate : headerMotion.titleInitial}
        transition={headerMotion.titleTransition}
        style={{ ...titleStyle, ...styles.headerH2 }}
      >
        Who uses AI?
        <motion.div
          style={styles.headerUnderline}
          initial={headerMotion.underlineInitial}
          animate={inView ? headerMotion.underlineAnimate : headerMotion.underlineInitial}
          transition={headerMotion.underlineTransition}
        />
      </motion.h2>

      {/* Main content container with padding */}
      <div style={styles.mainGrid}>
        {/* LEFT COLUMN */}
        <div style={styles.leftRows}>
          {/* Build AI (Blue) */}
          <Section title="Build AI" caption="≈ 1% of your staff" delay={0.1} theme="blue" active={inView}>
            {inView && (
              <>
                <Role icon={<DataEngineerIcon color={COLORS.buildAI} />} title="DATA ENGINEER" desc="Prepares data for AI & analytics" durationSec={5} accent={COLORS.buildAI} active />
                <Role icon={<DataScientistIcon color={COLORS.buildAI} />} title="DATA SCIENTIST" desc="Creates trusted, accurate models" durationSec={5} accent={COLORS.buildAI} active />
                <Role icon={<AIEngineerIcon color={COLORS.buildAI} />} title="AI ENGINEER" desc="Ships apps using foundation models" durationSec={5} accent={COLORS.buildAI} active />
              </>
            )}
          </Section>

          {/* Build with AI (Orange) */}
          <Section title="Build with AI" caption="≈ 10% of your staff" delay={0.5} theme="orange" active={inView}>
            {inView && (
              <>
                <Role icon={<DeveloperIcon color={COLORS.buildWithAI} />} title="AI DEVELOPER" desc="Uses AI tools to code faster" durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<TechLeadIcon color={COLORS.buildWithAI} />} title="TECH LEAD" desc="Guides teams with AI reviews" durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<ArchitectIcon color={COLORS.buildWithAI} />} title="ARCHITECT" desc="Designs AI-first architectures" durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<VibecoderIcon color={COLORS.buildWithAI} />} title="VIBECODER" desc="Turns vibes into code: scaffold, refactor & align UI to intent." durationSec={5} accent={COLORS.buildWithAI} active />
                <Role icon={<AIContentGenIcon color={COLORS.buildWithAI} />} title="AI CONTENT GENERATION" desc="Creates on-brand copy, docs, and media with human-in-the-loop." durationSec={5} accent={COLORS.buildWithAI} active />
              </>
            )}
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <Section title="Use AI for work" caption="≈ 100% of your staff" delay={0.9} theme="green" active={inView}>
          {inView && (
            <Role
              icon={<PractitionerIcon color={COLORS.practitioner} />}
              title="AI PRACTITIONER"
              desc="Applies AI daily to boost productivity & outcomes."
              durationSec={5}
              accent={COLORS.practitioner}
              active
            />
          )}
        </Section>
      </div>

      {/* Decorative elements */}
      <div style={styles.decorativeBg} />
    </motion.div>
  );
};

export default React.memo(Slide6);
