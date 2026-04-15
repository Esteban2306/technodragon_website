'use client';

import { motion } from 'framer-motion';
import Plasma from '@/src/shared/components/Plasma';
import { contactData } from './contactData';
import InfoCard from './infoCard';
import MapEmbed from './mapEmbed';
import { useIsVisible } from '@/src/shared/hooks/useIsViseble';

export default function ContactSection() {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fromLeft = {
    hidden: {
      opacity: 0,
      x: -60,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const, 
      },
    },
  };

  const fromRight = {
    hidden: {
      opacity: 0,
      x: 60,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id='contact'
      ref={ref}
      className="relative text-white py-16 px-6 lg:px-20 overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="w-full h-full mask-[linear-gradient(to_top,black,transparent)]">
          <Plasma
            color="#ff1a1a"
            speed={3}
            isActive={isVisible}
            scale={1}
            opacity={1}
            mouseInteractive={false}
          />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start"
      >
        <motion.div variants={container}>
          <motion.h2
            variants={fromLeft}
            className="text-4xl font-bold mb-4"
          >
            Ubicación y contacto
          </motion.h2>

          <motion.p
            variants={fromLeft}
            className="text-gray-400 mb-2"
          >
            Visítanos en nuestra tienda o comunícate con nosotros para recibir
            asesorías y soporte técnico.
          </motion.p>

          <motion.p
            variants={fromLeft}
            className="text-gray-500 text-sm mb-8"
          >
            Somos tu tienda de tecnología de confianza para venta de laptops,
            reparación de computadores y servicio técnico.
          </motion.p>

          <motion.div
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {contactData.map((item, index) => (
              <motion.div key={index} variants={fromLeft}>
                <InfoCard {...item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fromRight}
          className="h-full"
        >
          <MapEmbed />
        </motion.div>
      </motion.div>
    </section>
  );
}