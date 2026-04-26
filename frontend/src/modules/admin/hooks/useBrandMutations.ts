import { useMutation, useQueryClient } from '@tanstack/react-query';
import { brandApi } from '../api/brand.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import {
  CreateBrandPayload,
  UpdateBrandPayload,
} from '../types/brand.payloads';

export const useCreateBrand = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBrandPayload) => brandApi.create(data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['brands'] });
      qc.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateBrand = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBrandPayload }) =>
      brandApi.update(id, data),

    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ['brands'] });
      qc.invalidateQueries({ queryKey: queryKeys.brand(id) });
    },
  });
};

export const useActivateBrand = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => brandApi.activate(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

export const useDeactivateBrand = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => brandApi.deactivate(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};

export const useDeleteBrand = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => brandApi.delete(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['brands'] });
    },
  });
};
