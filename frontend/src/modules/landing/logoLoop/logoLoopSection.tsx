import LogoLoop from '@/src/shared/components/LogoLoop';
import { Variants, motion } from 'framer-motion';
import { techLogo } from './data';
import { useIsVisible } from '@/src/shared/hooks/useIsViseble';

export default function LogoLoopSection() {

  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

  const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath:
      'polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%)',
  },
  visible: {
    opacity: 1,
    clipPath:
      'polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    clipPath:
      'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 1, 1],
    },
  },
};
  return (
   <section
      ref={ref}
      className="w-full overflow-hidden my-10 z-20"
    >
      <motion.div
        className="relative w-full"
        variants={revealVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        exit="exit"
      >
        <LogoLoop
          logos={techLogo}
          speed={100}
          direction="left"
          logoHeight={80}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#560F0F"
          ariaLabel="Technology partners"
          className="overflow-y-hidden"
        />
      </motion.div>
    </section>
  );
}
