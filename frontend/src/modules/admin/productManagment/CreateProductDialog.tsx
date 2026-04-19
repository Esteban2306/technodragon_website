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

type Mode = 'brand' | 'category';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateBrand?: (data: any) => void;
  onCreateCategory?: (data: any) => void;
};

export default function CreateMetaDialog({
  open,
  onOpenChange,
  onCreateBrand,
  onCreateCategory,
}: Props) {
  const [mode, setMode] = useState<Mode>('brand');

  const [form, setForm] = useState({
    name: '',
    slug: '',
    logo: '',
    parentId: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSubmit = () => {
    if (mode === 'brand') {
      const payload = {
        name: form.name,
        slug: form.slug,
        logo: form.logo,
        isActive: true,
      };

      console.log('CREATE_BRAND', payload);
      onCreateBrand?.(payload);
    }

    if (mode === 'category') {
      const payload = {
        name: form.name,
        slug: form.slug,
        parentId: form.parentId || null,
      };

      console.log('CREATE_CATEGORY', payload);
      onCreateCategory?.(payload);
    }

    onOpenChange(false);

    setForm({
      name: '',
      slug: '',
      logo: '',
      parentId: '',
    });
    setMode('brand');
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
            disabled={!isValid}
            onClick={handleSubmit}
            className="cursor-pointer"
          >
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
