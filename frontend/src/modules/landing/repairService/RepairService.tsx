'use client';

import { motion } from 'framer-motion';
import RepairCardInfo from './RepairCardInfo';
import { servicesData } from './serviceData';
import StarBorder from '@/src/shared/components/StarBorder';
import SoftAurora from '@/src/shared/components/SoftAurora';
import { useIsVisible } from '@/src/shared/hooks/useIsViseble';

export default function RepairService() {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: -30,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const, 
      },
    },
  };

  const buttonAnim = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section ref={ref} id='service' className="flex flex-col gap-6 p-8 overflow-hidden">

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="flex flex-col justify-center gap-6 text-center"
      >
        <motion.h4
          variants={item}
          className="text-3xl text-white max-w-212.5 mx-auto"
        >
          Servicio profesional de reparación de portátiles y computadores
        </motion.h4>

        <motion.p
          variants={item}
          className="text-lg text-red-600 max-w-162.5 mx-auto"
        >
          Soporte técnico rápido, fiable y profesional para portátiles y computadores de mesa
        </motion.p>

        <motion.p
          variants={item}
          className="text-sm text-gray-500 max-w-200 mx-auto"
        >
          Reparamos, mantenemos y actualizamos portátiles y computadores utilizando herramientas profesionales y componentes certificados.
        </motion.p>
      </motion.div>

      <div className="relative mt-12">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[120%] h-[140%] opacity-30 blur-lg">
            <SoftAurora
              color1="#FC0000"
              color2="#FC0000"
              brightness={2}
              isActive={isVisible}
              speed={3.5}
              scale={0.5}
              bandHeight={0.5}
              bandSpread={1}
              layerOffset={0.5}
              colorSpeed={1}
              enableMouseInteraction={false}
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap justify-center gap-6">
          {servicesData.map((service, index) => (
            <RepairCardInfo key={index} {...service} index={index} />
          ))}
        </div>
      </div>

      {/* 🔥 BOTÓN */}
      <motion.div
        variants={buttonAnim}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.4 }}
        className="flex justify-center"
      >
        <StarBorder
          as="button"
          className="max-w-lg m-auto cursor-pointer"
          color="rgba(120, 0, 40, 0.1)"
          speed="5s"
          background="linear-gradient(180deg, #2a0a0f 0%, #120406 100%)"
        >
          Solicitud de Diagnostico
        </StarBorder>
      </motion.div>
    </section>
  );
}