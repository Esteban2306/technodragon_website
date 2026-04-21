import { useQuery } from '@tanstack/react-query';
import { brandApi } from '../api/brand.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import { Brand } from '../types/brand.payloads';

export const useBrands = (params?: {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}) => {
  return useQuery<Brand[]>({
    queryKey: queryKeys.brands(params),
    queryFn: () => brandApi.getAll(params),
  });
};