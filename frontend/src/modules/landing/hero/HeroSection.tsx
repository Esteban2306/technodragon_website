import Image from 'next/image';
import dragonImage from '../../../../public/landing/hero/dragon.png';

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src={dragonImage}
          alt="dragon"
          fill
          priority
          className="
        object-contain
        opacity-80
        scale-[1.3]
        translate-x-[25%]
        translate-y-[8%]
      "
        />
      </div>
      <div className="max-w-8xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 px-6">
        <div className="flex flex-col justify-center space-y-6 w-xl">
          <span className="text-sm text-muted-foreground">
            Venta de laptops, computadores y accesorios
          </span>

          <h1 className="text-3xl md:text-5xl leading-tight font-heading">
            <span className="block w-fit">Laptops y</span>
            <span className="block   w-fit">Computadores</span>
            <span className="block b w-fit">Nuevos y Usados al</span>
            <span className="block  w-fit">Mejor Precio</span>
          </h1>

          <p className="text-lg text-muted-foreground w-full">
            Equipos de las mejores marcas, accesorios y servicio técnico
            especializado.
          </p>

          <div className="flex gap-4">
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition cursor-pointer">
              Ver Productos
            </button>
            <button className="bg-white/10 px-6 py-3 rounded-lg hover:bg-white/20 transition cursor-pointer">
              Servicio Técnico
            </button>
          </div>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Equipos verificados</li>
            <li>✓ Garantía incluida</li>
            <li>✓ Marcas reconocidas</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
