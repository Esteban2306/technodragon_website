import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../api/product.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import {
  UpdateBasicProductPayload,
  UpdateProductPayload,
} from '../types/product.payloads';

type Variant = {
  id: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
};

type Product = {
  id: string;
  name: string;
  description?: string;
  category: {
    id: string;
    name: string;
  }
  brand: {
    id: string
    name: string;
  }
  slug?: string;
  isActive: boolean;
  isFeatured: boolean;
  variants: Variant[];
};

type UpdateBasicProductContext = {
  prev?: Product;
};

type UpdateBasicProductVars = {
  id: string;
  data: UpdateBasicProductPayload;
};

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: productApi.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateBasicProduct = () => {
  const qc = useQueryClient();

  return useMutation<
    Product,
    Error,
    UpdateBasicProductVars,
    UpdateBasicProductContext
  >({
    mutationFn: async ({ id, data }) => {
      return await productApi.updateBasic(id, data);
    },

    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: queryKeys.product(id) });

      const prev = qc.getQueryData<Product>(queryKeys.product(id));

      qc.setQueryData<Product>(queryKeys.product(id), (old) => {
        if (!old) return old;

        return {
          ...old,
          name: data.name ?? old.name,
          description: data.description ?? old.description,
          slug: data.slug ?? old.slug,
        };
      });

      return { prev };
    },

    onError: (_err, { id }, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(queryKeys.product(id), ctx.prev);
      }
    },

    onSuccess: (data, { id }) => {
      qc.setQueryData(queryKeys.product(id), data);
    },

    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductPayload }) =>
      productApi.update(id, data),

    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: queryKeys.product(id) });

      const prev = qc.getQueryData<Product>(queryKeys.product(id));

      qc.setQueryData<Product>(queryKeys.product(id), (old) => {
        if (!old) return old;

        return {
          ...old,
          name: data.name,
          description: data.description,
          slug: data.slug,
          isFeatured: data.isFeatured ?? old.isFeatured,
          brand: {
            id: data.brandId,
            name: old.brand.name, // o búscalo del cache global si quieres hacerlo bien
          },

          category: {
            id: data.categoryId,
            name: old.category.name,
          },
          variants: data.variants.map((v, index) => ({
            id: v.id ?? old.variants[index]?.id ?? crypto.randomUUID(),
            sku: v.sku,
            price: v.price,
            stock: v.stock,
            isActive: v.stock > 0,
          })),
        };
      });

      return { prev };
    },

    onError: (_err, { id }, context) => {
      if (context?.prev) {
        qc.setQueryData(queryKeys.product(id), context.prev);
      }
    },

    onSuccess: (data, { id }) => {
      qc.setQueryData(queryKeys.product(id), data);
    },

    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: productApi.delete,

    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ['products'] });

      const prev = qc.getQueryData<Product[]>(['products']);

      qc.setQueryData<Product[]>(['products'], (old = []) =>
        old.filter((p) => p.id !== id),
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(['products'], ctx.prev);
      }
    },
  });
};

export const useMarkAsFeatured = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: productApi.markAsFeatured,

    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: ['products'] });
      await qc.cancelQueries({ queryKey: queryKeys.product(id) });

      const prevProducts = qc.getQueryData<Product[]>(['products']);
      const prevProduct = qc.getQueryData<Product>(queryKeys.product(id));

      qc.setQueryData<Product[]>(['products'], (old = []) =>
        old.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p)),
      );

      qc.setQueryData<Product>(queryKeys.product(id), (old) =>
        old ? { ...old, isFeatured: !old.isFeatured } : old,
      );

      return { prevProducts, prevProduct };
    },

    onError: (_err, id, ctx) => {
      if (ctx?.prevProducts) {
        qc.setQueryData(['products'], ctx.prevProducts);
      }
      if (ctx?.prevProduct) {
        qc.setQueryData(queryKeys.product(id), ctx.prevProduct);
      }
    },

    onSettled: (_data, _err, id) => {
      qc.invalidateQueries({ queryKey: ['products'] });
      qc.invalidateQueries({ queryKey: queryKeys.product(id) });
    },
  });
};

export const useUpdateStock = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ variantId, stock }: { variantId: string; stock: number }) =>
      productApi.updateStock(variantId, stock),

    onMutate: async ({ variantId, stock }) => {
      await qc.cancelQueries({ queryKey: ['products'] });

      const prev = qc.getQueryData<Product[]>(['products']);

      qc.setQueryData<Product[]>(['products'], (old = []) =>
        old.map((product) => ({
          ...product,
          variants: product.variants.map((v) =>
            v.id === variantId ? { ...v, stock, isActive: stock > 0 } : v,
          ),
        })),
      );

      return { prev };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        qc.setQueryData(['products'], ctx.prev);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useToggleProductStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      productApi.toggleProductStatus(id, isActive),

    onMutate: async ({ id, isActive }) => {
      await qc.cancelQueries({ queryKey: ['products'] });
      await qc.cancelQueries({ queryKey: queryKeys.product(id) });

      const prevProducts = qc.getQueryData<Product[]>(['products']);
      const prevProduct = qc.getQueryData<Product>(queryKeys.product(id));

      qc.setQueryData<Product[]>(['products'], (old = []) =>
        old.map((p) =>
          p.id === id
            ? {
                ...p,
                isActive,
                variants: p.variants.map((v) => ({
                  ...v,
                  isActive,
                })),
              }
            : p,
        ),
      );

      qc.setQueryData<Product>(queryKeys.product(id), (old) =>
        old
          ? {
              ...old,
              isActive,
              variants: old.variants.map((v) => ({
                ...v,
                isActive,
              })),
            }
          : old,
      );

      return { prevProducts, prevProduct };
    },

    onError: (_err, { id }, ctx) => {
      if (ctx?.prevProducts) {
        qc.setQueryData(['products'], ctx.prevProducts);
      }
      if (ctx?.prevProduct) {
        qc.setQueryData(queryKeys.product(id), ctx.prevProduct);
      }
    },

    onSettled: (_data, _err, { id }) => {
      qc.invalidateQueries({ queryKey: ['products'] });
      qc.invalidateQueries({ queryKey: queryKeys.product(id) });
    },
  });
};

export const useToggleVariantStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      variantId,
      isActive,
    }: {
      variantId: string;
      isActive: boolean;
    }) => productApi.toggleVariantStatus(variantId, isActive),

    onMutate: async ({ variantId, isActive }) => {
      await qc.cancelQueries({ queryKey: ['products'] });

      const prevProducts = qc.getQueryData<Product[]>(['products']);

      qc.setQueryData<Product[]>(['products'], (old = []) =>
        old.map((product) => ({
          ...product,
          variants: product.variants.map((v) =>
            v.id === variantId ? { ...v, isActive } : v,
          ),
        })),
      );

      return { prevProducts };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.prevProducts) {
        qc.setQueryData(['products'], ctx.prevProducts);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
