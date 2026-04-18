import { Package, FileText, Image as ImageIcon, Upload } from 'lucide-react';

import { Props } from '../types/fromProps.types'; 

export default function StepBasicInfo({ form, setForm }: Props) {
  const handleMainImage = (file: File) => {
    const url = URL.createObjectURL(file);

    setForm({
      ...form,
      images: {
        ...form.images,
        main: url,
      },
    });
  };

  const handleGallery = (file: File) => {
    const url = URL.createObjectURL(file);

    if (form.images.gallery.length >= 3) return;

    setForm({
      ...form,
      images: {
        ...form.images,
        gallery: [...form.images.gallery, url],
      },
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="size-5 text-[#7a1c1c]" />
          <h2 className="text-lg font-semibold">Información básica</h2>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="size-4" />
            Nombre del producto
          </label>

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm outline-none focus:border-[#7a1c1c]"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <FileText className="size-4" />
            Descripción
          </label>

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm outline-none focus:border-[#7a1c1c]"
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-2 my-6">
          <ImageIcon className="size-5 text-[#7a1c1c]" />
          <h2 className="text-lg font-semibold">Imágenes</h2>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm text-gray-400 mb-10">
            <Upload className="size-4" />
            Imagen principal
          </p>

          <label className="flex justify-center m-auto items-center border max-w-lg h-40 border-dashed border-[#1a1a1a] rounded-lg cursor-pointer hover:border-[#7a1c1c] transition">
            {form.images.main ? (
              <img
                src={form.images.main}
                className="h-32 object-cover rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center gap-1 text-gray-500 text-sm">
                <Upload className="size-5" />
                Subir imagen
              </div>
            )}

            <input
              type="file"
              hidden
              onChange={(e) =>
                e.target.files && handleMainImage(e.target.files[0])
              }
            />
          </label>
        </div>

        <div>
          <p className="flex items-center gap-2 text-sm text-gray-400 mb-10">
            <ImageIcon className="size-4" />
            Imágenes secundarias (máx 3)
          </p>

          <div className="grid grid-cols-3 gap-3">
            {form.images.gallery.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className="h-28 w-full object-cover rounded-md"
              />
            ))}

            {form.images.gallery.length < 3 && (
              <label className="h-28 border border-dashed mb-6 border-[#1a1a1a] rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-[#7a1c1c] transition">
                <Upload className="size-5 mb-1" />
                <span className="text-xs ">Agregar</span>

                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    e.target.files && handleGallery(e.target.files[0])
                  }
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
