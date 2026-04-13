'use client';

import { motion, spring } from 'framer-motion';
import { Check } from 'lucide-react';
import BorderGlow from '@/src/shared/components/BorderGlow';

type Props = {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  descriptions: string[];
  index?: number;
};

export default function RepairCardInfo({
  icon: Icon,
  title,
  subtitle,
  descriptions,
  index = 0,
}: Props) {
  const baseDelay = index * 0.12;

  const container = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.96,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: baseDelay,
        type: spring,
        stiffness: 80,
        damping: 18,
        mass: 0.6,
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.35,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        margin: '-100px',
        amount: 0.2,
      }}
      className="transform-gpu will-change-[transform,opacity,filter] overflow-hidden"
    >
      <BorderGlow
        edgeSensitivity={69}
        glowColor="350 60% 35%"
        backgroundColor="#060010"
        borderRadius={28}
        glowRadius={50}
        glowIntensity={2}
        coneSpread={25}
        animated={false}
        colors={[
          'rgba(120, 0, 40, 0.9)',
          'rgba(180, 0, 60, 0.7)',
          'rgba(60, 0, 20, 0.8)',
        ]}
      >
        <motion.div
          variants={container}
          className="relative bg-[#1B1B1B]/70 w-full min-h-100 h-full max-w-100 rounded-3xl p-5 sm:p-6 border m-auto border-[#2A2A2A] overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-[#1B1B1B]/60 via-[#FB0000]/80 to-[#1B1B1B]/60" />

          <div className="flex flex-col gap-4">
            
            <motion.div variants={item}>
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#27181C]">
                <Icon className="text-red-600" size={24} />
              </div>
            </motion.div>

            <motion.h5 variants={item} className="text-white text-xl font-semibold">
              {title}
            </motion.h5>

            <motion.p variants={item} className="text-[#797979] text-sm leading-relaxed">
              {subtitle}
            </motion.p>
          </div>

          <motion.ul
            className="mt-6 flex flex-col gap-3"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {descriptions.map((itemText, i) => (
              <motion.li
                key={i}
                variants={item}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <Check className="text-red-600" size={16} />
                {itemText}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </BorderGlow>
    </motion.div>
  );
}