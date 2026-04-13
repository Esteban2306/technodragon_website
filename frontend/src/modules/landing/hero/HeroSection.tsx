'use client';

import Image from 'next/image';
import { motion, easeOut, easeIn } from 'framer-motion';
import dragonImage from '../../../../public/landing/hero/dragon.png';
import Orb from '@/src/shared/components/Orb';
import { useIsVisible } from '@/src/shared/hooks/useIsViseble';

export default function HeroSection() {
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      x: -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  const dragonAnim = {
    hidden: {
      opacity: 0,
      y: 80,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
      },
    },
    exit: {
      opacity: 0,
      y: -80,
      transition: {
        duration: 0.6,
        ease: easeIn,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full min-h-screen flex items-start md:items-center relative pt-16 md:pt-0 overflow-visible max-w-full pb-40 md:pb-0"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full blur-[25px]">
          <Orb backgroundColor="#000000" isActive={isVisible} />
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={dragonAnim}
      >
        <div className="absolute bottom-[-10%] left-0 w-full h-[60%] md:hidden overflow-visible">
          <Image
            src={dragonImage}
            alt="dragon"
            fill
            priority
            className="mt-20 object-contain object-bottom scale-[1.25] opacity-80"
          />
        </div>

        <div className="hidden md:block absolute right-[-10%] top-0 w-[70%] h-[120%] overflow-visible">
          <Image
            src={dragonImage}
            alt="dragon"
            fill
            priority
            className="object-contain object-center scale-[1.3] opacity-90"
          />
        </div>
      </motion.div>

      <motion.div
        className="max-w-8xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 px-6 z-20"
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="flex flex-col justify-center space-y-6 max-w-xl w-full ml-0 sm:ml-10">
          
          <motion.span
            variants={item}
            className="text-sm text-muted-foreground mt-10"
          >
            Venta de laptops, computadores y accesorios
          </motion.span>

          <motion.h1
            variants={item}
            className="text-3xl md:text-5xl md:min-w-132.5 w-full leading-[1.1] font-heading"
          >
            <span className="block w-fit">Laptops y</span>
            <span className="block w-fit">Computadores</span>
            <span className="block max-w-full">
              Nuevos y Usados <span className="whitespace-nowrap">al</span>
            </span>
            <span className="block w-fit">Mejor Precio</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-lg text-muted-foreground w-full"
          >
            Equipos de las mejores marcas, accesorios y servicio técnico
            especializado.
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 max-w-75 sm:max-w-125"
          >
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition cursor-pointer">
              Ver Productos
            </button>
            <button className="bg-white/10 px-6 py-3 rounded-lg hover:bg-white/20 transition cursor-pointer">
              Servicio Técnico
            </button>
          </motion.div>

          <motion.ul
            variants={item}
            className="space-y-2 text-sm text-muted-foreground"
          >
            <li>✓ Equipos verificados</li>
            <li>✓ Garantía incluida</li>
            <li>✓ Marcas reconocidas</li>
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}