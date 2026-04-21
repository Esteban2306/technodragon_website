import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/product.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: productApi.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      productApi.update(id, data),

    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: queryKeys.product(id) });

      const prev = qc.getQueryData(queryKeys.product(id));

      qc.setQueryData(queryKeys.product(id), (old: any) => ({
        ...old,
        ...data,
      }));

      return { prev };
    },

    onError: (_err, { id }, context) => {
      qc.setQueryData(queryKeys.product(id), context?.prev);
    },

    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.product(id) });
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: productApi.delete,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useMarkAsFeatured = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: productApi.markAsFeatured,

    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: queryKeys.product(id) });
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateStock = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ variantId, stock }: { variantId: string; stock: number }) =>
      productApi.updateStock(variantId, stock),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};