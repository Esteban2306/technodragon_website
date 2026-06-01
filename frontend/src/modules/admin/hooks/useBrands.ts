import { useQuery } from '@tanstack/react-query';
import { brandApi } from '../api/brand.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import {
  Brand,
  BrandQueryParams,
  PaginatedBrands,
} from '../types/brand.payloads';

export const useBrandsPaginated = (params?: BrandQueryParams) => {
  return useQuery<PaginatedBrands>({
    queryKey: queryKeys.brands(params),
    queryFn: () => brandApi.getAll(params),
  });
};

export const useBrands = (params?: BrandQueryParams) => {
  return useQuery<Brand[]>({
    queryKey: [...queryKeys.brands(params), 'list'],
    queryFn: () => brandApi.getAllList(params),
  });
};
