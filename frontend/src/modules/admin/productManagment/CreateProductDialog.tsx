'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/src/shared/components/dialog';

import { Button } from '@/src/shared/components/button';
import { Input } from '@/src/shared/components/input';
import { Label } from '@/src/shared/components/label';
import { useCreateBrand } from '../hooks/useBrandMutations';
import { useCreateCategory } from '../hooks/useCategoryMutations';

type Mode = 'brand' | 'category';

type FormFields = {
  name: string;
  slug: string;
  logo: string;
  parentId: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateMetaDialog({ open, onOpenChange }: Props) {
  const [mode, setMode] = useState<Mode>('brand');

  const [form, setForm] = useState<FormFields>({
    name: '',
    slug: '',
    logo: '',
    parentId: '',
  });

  const handleChange = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const { mutate: createBrand, isPending: isCreatingBrand } = useCreateBrand();

  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory();

  const isLoading = mode === 'brand' ? isCreatingBrand : isCreatingCategory;

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleNameChange = (value: string) => {
    handleChange('name', value);
    handleChange('slug', generateSlug(value));
  };

  const resetForm = () => {
    setForm({
      name: '',
      slug: '',
      logo: '',
      parentId: '',
    });
    setMode('brand');
  };

  const handleSubmit = () => {
    if (!isValid) return;

    if (mode === 'brand') {
      createBrand(
        {
          name: form.name,
          slug: form.slug,
          logo: form.logo,
          isActive: true,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        },
      );
    }

    if (mode === 'category') {
      console.log('calling createCategory with:', form.name, form.slug);
      createCategory(
        {
          name: form.name,
          slug: form.slug,
          parentId: form.parentId || undefined,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            resetForm();
          },
        },
      );
    }
  };

  const isValid = form.name.trim() !== '' && form.slug.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full bg-[#0b0b0c] border border-[#1a1a1a] text-white">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-lg">Crear recurso</DialogTitle>

          <div className="flex bg-[#111] rounded-md p-1 w-fit">
            <button
              onClick={() => setMode('brand')}
              className={`
                px-4 py-1.5 text-sm rounded-md transition-all
                ${
                  mode === 'brand'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }
              `}
            >
              Marca
            </button>

            <button
              onClick={() => setMode('category')}
              className={`
                px-4 py-1.5 text-sm rounded-md transition-all
                ${
                  mode === 'category'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }
              `}
            >
              Categoría
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label>Nombre</Label>
            <Input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder={mode === 'brand' ? 'Ej: Nike' : 'Ej: Zapatillas'}
            />
          </div>

          <div className="space-y-1">
            <Label>Slug</Label>
            <Input
              value={form.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder="auto-generado"
            />
          </div>

          {mode === 'brand' && (
            <div className="space-y-1">
              <Label>Logo (URL)</Label>
              <Input
                value={form.logo}
                onChange={(e) => handleChange('logo', e.target.value)}
                placeholder="https://..."
              />
            </div>
          )}

          {mode === 'category' && (
            <div className="space-y-1">
              <Label>Parent ID (opcional)</Label>
              <Input
                value={form.parentId}
                onChange={(e) => handleChange('parentId', e.target.value)}
                placeholder="Categoría padre"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          >
            Cancelar
          </Button>

          <Button
            disabled={!isValid || isLoading}
            onClick={handleSubmit}
            className="cursor-pointer"
          >
            {isLoading ? 'Creando...' : 'Crear'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
