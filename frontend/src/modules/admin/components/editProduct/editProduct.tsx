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
import type {
  CreateVariantForm,
  CreateProductForm,
} from '../../createProduct/stepper/types/fromProps.types';
import { Upload, X } from 'lucide-react';
import {
  useUpdateBasicProduct,
  useUpdateProduct,
} from '../../hooks/useProductMutations';
import { ProductCondition } from '@/src/shared/types/product-condition.enum';

import BrandCategorySelector from './BrandCategorySelector';
import AddVariantButton from './AddVariantButton';
import { useBrands } from '../../hooks/useBrands';
import { useCategories } from '../../hooks/useCategories';
import { useUploadImage } from '@/src/modules/hooks/useUploadImage';
import { EditProductForm } from '../../types/editProductForm.types';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductCardData | null;
};

export default function EditProductDialog({
  open,
  onOpenChange,
  product,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updateBasic = useUpdateBasicProduct();
  const updateFull = useUpdateProduct();

  const { data: brands = [] } = useBrands();
  const { data: categories = [] } = useCategories();

  const [form, setForm] = useState<EditProductForm | null>(null);
  const selectedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name,
      slug: product.slug ?? '',
      description: product.description ?? '',
      images: product.images?.map((img) => img.url) ?? [],
      brand: product.brand,
      category: product.category,
      variants: product.variants.map((v) => ({
        id: v.id,
        price: v.price,
        stock: v.stock,
        isActive: v.isActive ?? true,
        sku: v.sku ?? '',
        condition: v.condition as ProductCondition,
        attributes: v.attributes,
      })),
    });
  }, [product]);

  const uploadImageMutation = useUploadImage({
    onSuccess: (data) => {
      console.log('Uploaded:', data.url);
    },
  });

  if (!form || !product) return null;

  const handleChange = <K extends keyof EditProductForm>(
    field: K,
    value: EditProductForm[K],
  ) => {
    setForm((prev) => prev && { ...prev, [field]: value });
  };

  const handleImageClick = (index: number) => {
    selectedIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || selectedIndexRef.current === null) return;

    const index = selectedIndexRef.current;
    const preview = URL.createObjectURL(file);

    setForm((prev) => {
      if (!prev) return prev;
      const newImages = [...prev.images];
      newImages[index] = preview;
      return { ...prev, images: newImages };
    });

    try {
      const result = await uploadImageMutation.mutateAsync({ file });

      setForm((prev) => {
        if (!prev) return prev;
        const newImages = [...prev.images];
        newImages[index] = result.url;
        return { ...prev, images: newImages };
      });
    } catch (error) {
      console.error('Upload failed:', error);

      setForm((prev) => {
        if (!prev) return prev;
        const newImages = [...prev.images];
        newImages.splice(index, 1);
        return { ...prev, images: newImages };
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      };
    });
  };

  const handleSave = async () => {
    const validImages = form.images.filter(
      (img) => img && img.startsWith('http'),
    );

    const imagesToSend =
      validImages.length > 0
        ? validImages
        : (product.images?.map((img) => img.url) ?? []);

    const basicPayload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
    };

    const originalImages = product.images ?? [];

    const fullPayload = {
      ...basicPayload,
      brandId: form.brand.id,
      categoryId: form.category.id,
      isFeatured: product.isFeatured ?? false,

      variants: form.variants.map((v) => ({
        id: v.id,
        sku: v.sku,
        price: v.price,
        stock: v.stock,
        isActive: v.stock > 0,
        condition: v.condition as ProductCondition,
        attributes: v.attributes,
      })),

      images: imagesToSend.map((img, i) => {
        const existingImage = originalImages.find((o) => o.url === img);

        return {
          id: existingImage?.id ?? crypto.randomUUID(),
          url: img,
          isMain: i === 0,
        };
      }),
    };

    const onlyBasicChanged =
      form.name !== product.name ||
      form.description !== (product.description ?? '') ||
      form.slug !== (product.slug ?? '');

    const brandChanged = form.brand.id !== product.brand.id;
    const categoryChanged = form.category.id !== product.category.id;

    const imagesChanged =
      JSON.stringify(imagesToSend.sort()) !==
      JSON.stringify(originalImages.sort());

    console.log('FORM IMAGES:', form.images);
    console.log('SENDING IMAGES:', imagesToSend);

    const shouldUseFullUpdate =
      brandChanged || categoryChanged || imagesChanged || onlyBasicChanged;

    try {
      if (shouldUseFullUpdate) {
        await updateFull.mutateAsync({ id: product.id, data: fullPayload });
      } else {
        await updateBasic.mutateAsync({ id: product.id, data: basicPayload });
      }

      onOpenChange(false);
    } catch (err) {
      console.error('Save failed:', err);
    }
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
              className="w-85 "
            />
            <div />
          </div>

          <div className="flex justify-between">
            <BrandCategorySelector
              label="Marca"
              value={form.brand.id}
              options={brands}
              onChange={(id) => {
                const selected = brands.find((b) => b.id === id);
                if (selected) handleChange('brand', selected);
              }}
            />

            <BrandCategorySelector
              label="Categoría"
              value={form.category.id}
              options={categories}
              onChange={(id) => {
                const selected = categories.find((c) => c.id === id);
                if (selected) handleChange('category', selected);
              }}
            />
          </div>

          <div>
            <Input
              value={form.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="Slug del producto"
            />
          </div>

          <Textarea
            value={form.description}
            onChange={(e) => {
              const value = e.target.value;
              handleChange('description', value);
            }}
            placeholder="Descripción del producto"
          />

          <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-4 space-y-4">
            <p className="text-xs text-gray-400 uppercase">Imágenes (máx 4)</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => {
                const img = form.images[i];

                return (
                  <div
                    key={i}
                    onClick={() => handleImageClick(i)}
                    className="relative aspect-square rounded-lg overflow-hidden border border-[#222] cursor-pointer group bg-[#0b0b0c]"
                  >
                    {img ? (
                      <>
                        <Image
                          src={img}
                          alt="product"
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                          <Upload className="size-5 text-white" />
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(i);
                          }}
                          className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 p-1 rounded"
                        >
                          <X className="size-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                        <Upload className="size-5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <VariantList variants={form.variants} setForm={setForm} />
          <div className="flex justify-end">
            <AddVariantButton setForm={setForm} />
          </div>
        </div>

        <DialogFooter className="border-t border-gray-700">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>

          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
