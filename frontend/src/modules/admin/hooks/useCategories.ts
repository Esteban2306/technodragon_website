import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../api/category.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import { Category } from '../types/category.payloads';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: queryKeys.categories(),
    queryFn: categoryApi.getAll,
  });
};

export const useCategoryTree = () => {
  return useQuery<Category[]>({
    queryKey: ['categories-tree'],
    queryFn: categoryApi.getTree,
  });
};