import { PackageCheck } from "lucide-react";
import { CreateProductForm } from "../types/fromProps.types";
type Props = {
  onFinish: () => void;
  setForm: React.Dispatch<React.SetStateAction<CreateProductForm>>;
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StepFinished({ onFinish, setForm, setCompleted }: Props) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 bg-[#0b0b0c] border border-[#1a1a1a] rounded-2xl text-white space-y-6 text-center">
        <div className="flex justify-center">
          <div className="bg-[#7a1c1c]/20 p-4 rounded-full">
            <PackageCheck className="size-8 text-[#7a1c1c]" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Producto creado correctamente
          </h2>
          <p className="text-sm text-gray-400 mt-1">¿Qué deseas hacer ahora?</p>
        </div>

        <div className="flex gap-3 justify-center pt-4">
          <button
            onClick={onFinish}
            className="px-4 py-2 cursor-pointer rounded-md border border-[#1a1a1a] hover:border-white text-sm"
          >
            Ir a gestión
          </button>

          <button
            onClick={() => {
              setForm({
                name: '',
                slug: '',
                description: '',
                classification: {
                  brandId: '',
                  categoryId: '',
                },
                images: {
                  main: '',
                  gallery: [],
                },
                variants: [],
              });

              setCompleted(false);
            }}
            className="px-4 py-2 rounded-md bg-[#7a1c1c] hover:bg-[#5c1515] text-sm"
          >
            Crear otro producto
          </button>
        </div>
      </div>
    );
}