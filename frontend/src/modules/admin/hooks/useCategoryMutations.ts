import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryApi } from '../api/category.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import {
    Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from '../types/category.payloads';

export const useCreateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryPayload) =>
      categoryApi.create(data),

    onMutate: async (newCategory) => {
      await qc.cancelQueries({ queryKey: ['categories'] });

      const prev = qc.getQueryData<Category[]>(['categories']);

      const optimisticCategory: Category = {
        id: crypto.randomUUID(),
        name: newCategory.name,
        slug: newCategory.slug,
      };

      qc.setQueryData<Category[]>(['categories'], (old = []) => [
        ...old,
        optimisticCategory,
      ]);

      return { prev };
    },

    onError: (_err, _data, context) => {
      qc.setQueryData(['categories'], context?.prev);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      qc.invalidateQueries({ queryKey: ['categories-tree'] });
    },
  });
};

export const useUpdateCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryPayload }) =>
      categoryApi.update(id, data),

    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      qc.invalidateQueries({ queryKey: ['categories-tree'] });
      qc.invalidateQueries({ queryKey: queryKeys.category(id) });
    },
  });
};

export const useDeleteCategory = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => categoryApi.delete(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['categories'] });
      qc.invalidateQueries({ queryKey: ['categories-tree'] });
    },
  });
};