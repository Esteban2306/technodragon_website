import { Button } from '@/src/shared/components/button';
import RepairCardInfo from './RepairCardInfo';
import { servicesData } from './serviceData';
import StarBorder from '@/src/shared/components/StarBorder';

export default function RepairService() {
  return (
    <section className="flex flex-col gap-6 p-8">
      <div className="flex flex-col justify-center gap-6 text-center">
        <h4 className="text-3xl text-white max-w-212.5 mx-auto">
          Servicio profesional de reparación de portátiles y computadores
        </h4>

        <p className="text-lg text-red-600 max-w-162.5 mx-auto">
          Soporte técnico rápido, fiable y profesional para portátiles y
          computadores de mesa
        </p>

        <p className="text-sm text-gray-500 max-w-200 mx-auto">
          Reparamos, mantenemos y actualizamos portátiles y computadores
          utilizando herramientas profesionales y componentes certificados.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {servicesData.map((service, index) => (
          <RepairCardInfo key={index} {...service} />
        ))}
      </div>

      <StarBorder
        as="button"
        className="max-w-lg m-auto cursor-pointer"
        color="rgba(120, 0, 40, 0.1)"
        speed="5s"
        background="linear-gradient(180deg, #2a0a0f 0%, #120406 100%)"
      >
        Solicitud de Diagnositco
      </StarBorder>
    </section>
  );
}
