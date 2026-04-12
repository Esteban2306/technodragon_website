import Plasma from '@/src/shared/components/Plasma';
import { contactData } from './contactData';
import InfoCard from './infoCard';
import MapEmbed from './mapEmbed';
import { useIsVisible } from '@/src/shared/hooks/useIsViseble';

export default function ContactSection() {

    const {ref, isVisible} = useIsVisible<HTMLDivElement>()
  return (
    <section 
    ref={ref}
    className="relative text-white py-16 px-6 lg:px-20 overflow-hidden">
      <div
        className="
            absolute bottom-0 left-0 w-full 
            h-full
            pointer-events-none 
            z-0
            "
      >
        <div
          className="
                w-full h-full 
                mask-[linear-gradient(to_top,black,transparent)]
            "
        >
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
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-4">Ubicación y contacto</h2>

          <p className="text-gray-400 mb-2">
            Visítanos en nuestra tienda o comunícate con nosotros para recibir
            asesorías y soporte técnico.
          </p>

          <p className="text-gray-500 text-sm mb-8">
            Somos tu tienda de tecnología de confianza para venta de laptops,
            reparación de computadores y servicio técnico.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactData.map((item, index) => (
              <InfoCard key={index} {...item} />
            ))}
          </div>
        </div>

        <div className="h-full">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
