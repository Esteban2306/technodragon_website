import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { productApi } from '../api/product.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import { ProductDetail } from '@/src/shared/types/product.types';
import { ProductFilters } from '../types/product.payloads';

export const useProducts = (filters?: ProductFilters) => {
  return useQuery<ProductDetail[]>({
    queryKey: queryKeys.products(filters),
    queryFn: () => productApi.getAll(filters),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
  });
};

export const useProduct = (id: string) => {
  return useQuery<ProductDetail>({
    queryKey: queryKeys.product(id),
    queryFn: () => productApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });
};