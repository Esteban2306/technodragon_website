import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productApi } from '../api/product.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import { ProductDetail } from '@/src/shared/types/product.types';
import { ProductFilters } from '../types/product.payloads';
import { ProductPreview } from '@/src/shared/types/catalog.types';
import { mapProductToPreview } from '@/src/shared/helper/mapProductToPreview';

export const useProducts = (filters?: ProductFilters) => {
  return useQuery<ProductDetail[]>({
    queryKey: queryKeys.products(filters),
    queryFn: () => productApi.getAll(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,

    select: (products) =>
      products.map(product => ({
        ...product,
        variants: product.variants.filter(v => v.isActive),
      })),
  });
};

export const useFeaturedProducts = () => {
  return useQuery<ProductDetail[], Error, ProductPreview[]>({
    queryKey: queryKeys.products({ isFeatured: true }),

    queryFn: () =>
      productApi.getAll({
        isFeatured: true,
      }),

    staleTime: 1000 * 60 * 5,

    select: (products) => {
      const featured = products.filter(p => p.isFeatured);

      const activeProducts = featured.map(product => ({
        ...product,
        variants: product.variants.filter(v => v.isActive),
      }));

      return mapProductToPreview(activeProducts);
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery<ProductDetail>({
    queryKey: queryKeys.product(id),
    queryFn: () => productApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,

    select: (data) => {
      return {
        ...data,
        variants: data.variants.filter(v => v.isActive),
      };
    },
  });
};