'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/src/shared/components/dialog';

import { Button } from '@/src/shared/components/button';
import { Input } from '@/src/shared/components/input';
import { Textarea } from '@/src/shared/components/textarea';

import VariantList from '../variants/VariantList';

import type { ProductCardData } from '../cards/mockProducts';
import type { CreateVariantForm } from '../../createProduct/stepper/types/fromProps.types';
import { Upload, X } from 'lucide-react';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductCardData | null;
};

type FormState = {
  name: string;
  description: string;
  brand: string;
  category: string;
  images: string[];
  variants: CreateVariantForm[];
};

export default function EditProductDialog({
  open,
  onOpenChange,
  product,
}: Props) {
  const [form, setForm] = useState<FormState | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || selectedIndex === null) return;

    const preview = URL.createObjectURL(file);

    setForm((prev) => {
      if (!prev) return prev;

      const newImages = [...prev.images];

      if (newImages[selectedIndex]) {
        newImages[selectedIndex] = preview;
      } else {
        newImages.push(preview);
      }

      return { ...prev, images: newImages.slice(0, 4) };
    });
  };

  const removeImage = (index: number) => {
    setForm((prev) => {
      if (!prev) return prev;

      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages };
    });
  };

  useEffect(() => {
    if (!product) return;

    const mappedVariants: CreateVariantForm[] = product.variants.map((v) => ({
      id: v.id,
      price: v.price,
      stock: v.stock,
      isActive: v.isActive ?? true,
      sku: v.sku ?? '',
      attributes: v.attributes,
    }));

    setForm({
      name: product.name,
      description: product.description ?? '',
      brand: product.brand,
      category: product.category,
      images: [product.image],
      variants: mappedVariants,
    });
  }, [product]);

  if (!form) return null;

  const handleChange = (field: keyof FormState, value: any) => {
    setForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleSave = () => {
    console.log('UPDATE_PRODUCT_PAYLOAD', form);

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-full h-[85vh] text-white overflow-hidden flex flex-col bg-[#0b0b0c] border border-[#1a1a1a]">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Nombre del producto"
            />

            <Input
              value={form.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
              placeholder="Marca"
            />

            <Input
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              placeholder="Categoría"
            />

            <div />
          </div>

          <Textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Descripción del producto"
          />

          <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 space-y-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Imágenes (máx 4)
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => {
                const img = form.images[i];

                return (
                  <div
                    key={i}
                    onClick={() => handleImageClick(i)}
                    className="
            relative aspect-square rounded-lg overflow-hidden
            border border-[#222]
            cursor-pointer group
            bg-[#0b0b0c]
            hover:border-gray-500 transition
          "
                  >
                    {img ? (
                      <>
                        <Image
                          src={img}
                          alt="product"
                          fill
                          className="object-cover group-hover:scale-105 transition"
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Upload className="size-5 text-white" />
                        </div>

                        {/* delete */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(i);
                          }}
                          className="
                  absolute top-1 right-1
                  bg-black/70 hover:bg-red-600
                  p-1 rounded
                  opacity-0 group-hover:opacity-100 transition
                "
                        >
                          <X className="size-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-xs gap-1">
                        <Upload className="size-5" />
                        Subir
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-400">Variantes</p>

            <VariantList variants={form.variants} setForm={setForm as any} />
          </div>
        </div>

        <DialogFooter className='border-t-2 border-t-gray-500'>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>

          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
