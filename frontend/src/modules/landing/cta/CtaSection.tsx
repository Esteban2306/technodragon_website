import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-16 ">
      <div className="relative w-full max-w-4xl bg-[#121317] rounded-2xl px-6 sm:px-10 py-10 sm:py-14 text-center overflow-hidden border border-white/5">
        
        <div className="absolute -right-15 -top-15 w-56 h-56 bg-red-600/20 rounded-full blur-3xl" />

        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-red-500/40 text-red-400 text-sm">
          Siguiente paso
        </div>

        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-4">
          Encuentra el equipo perfecto para
          <br className="hidden sm:block" />
          tu trabajo o estudio
        </h2>

        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          Explora nuestras elección de portátiles, componentes de computador y
          accesorios o solicita asesoría técnica para encontrar la mejor solución
          para tus necesidades.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link
            href="/productos"
            className="px-6 py-3 rounded-xl bg-red-600 text-white text-sm font-medium shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all"
          >
            ver productos
          </Link>

          <Link
            href="/servicios"
            className="text-gray-300 text-sm hover:text-white transition-colors"
          >
            solicitar un servicio
          </Link>

        </div>

        <div className="absolute -left-12.5 -bottom-20 w-56 h-56 bg-red-600/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}