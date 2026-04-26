'use client';

import { motion } from 'framer-motion';
import MagicBento from '@/src/shared/components/MagicBento';

export default function BusinessAreasSection() {
  
  const container = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 40,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const, // easing GOD
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      y: -30,
      filter: 'blur(8px)',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1] as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.25,
        }}
        className="transform-gpu will-change-[transform,opacity,filter]"
      >
        <MagicBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt
          enableMagnetism={false}
          clickEffect
          spotlightRadius={180}
          particleCount={12}
          glowColor="120, 0, 40"
          disableAnimations={false}
        />
      </motion.div>
    </section>
  );
}