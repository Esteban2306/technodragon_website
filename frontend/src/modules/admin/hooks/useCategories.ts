import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '../api/category.api';
import { queryKeys } from '@/src/core/providers/react-query/queryKeys';
import {
  Category,
  CategoryQueryParams,
  PaginatedCategories,
} from '../types/category.payloads';

export const useCategoriesPaginated = (params?: CategoryQueryParams) => {
  return useQuery<PaginatedCategories>({
    queryKey: [...queryKeys.categories(), 'paginated', params],
    queryFn: () => categoryApi.getAll(params),
  });
};

export const useCategories = (params?: CategoryQueryParams) => {
  return useQuery<Category[]>({
    queryKey: [...queryKeys.categories(), 'list', params],
    queryFn: () => categoryApi.getAllList(params),
    placeholderData: [],
  });
};

export const useCategoryTree = () => {
  return useQuery<Category[]>({
    queryKey: ['categories-tree'],
    queryFn: categoryApi.getTree,
  });
};
