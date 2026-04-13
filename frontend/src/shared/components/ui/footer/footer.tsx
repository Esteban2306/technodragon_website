'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../../public/landing/logoPage.png';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/70 backdrop-blur-xl text-white">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none">
        <div className="h-[2px] bg-red-600/40" />
        <div className="h-[6px] bg-red-600/60 blur-md" />
        <div className="h-[30px] bg-gradient-to-b from-red-600/30 to-transparent blur-lg" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">

        <div className="flex flex-col gap-4">
          <Image src={logo} alt="logo technodragon" className="w-40" />
          <p className="text-sm text-gray-400 max-w-xs">
            Tecnología, estilo y precisión. Creamos experiencias digitales que no se sienten genéricas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <span className="font-semibold text-white">Navegación</span>
            <Link href="/" className="text-gray-400 hover:text-red-400 transition">Inicio</Link>
            <Link href="#" className="text-gray-400 hover:text-red-400 transition">Servicios</Link>
            <Link href="#" className="text-gray-400 hover:text-red-400 transition">Contacto</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-semibold text-white">Catálogo</span>
            <Link href="#" className="text-gray-400 hover:text-red-400 transition">Productos</Link>
            <Link href="#" className="text-gray-400 hover:text-red-400 transition">Ofertas</Link>
            <Link href="#" className="text-gray-400 hover:text-red-400 transition">Nuevos</Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-semibold">¿Listo para empezar?</span>

          <p className="text-sm text-gray-400">
            Contáctanos y lleva tu idea al siguiente nivel.
          </p>

          <Link
            href="#"
            className="
              w-fit px-5 py-2 rounded-xl
              bg-red-700 hover:bg-red-600
              transition-all duration-300
              shadow-[0_0_15px_rgba(220,38,38,0.4)]
            "
          >
            Contactar
          </Link>
        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TechnoDragon. Todos los derechos reservados.
      </div>

    </footer>
  );
}