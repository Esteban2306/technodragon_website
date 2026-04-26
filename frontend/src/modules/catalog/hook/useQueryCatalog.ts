import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { catalogApi } from '../api/catalog.api';
import { CatalogFilters } from '../types/filter.type';
import { mapCatalogToPreview } from '@/src/shared/helper/catalog.mapper';

function normalizeFilters(filters?: CatalogFilters) {
  if (!filters) return {};

  const sortedAttributes = filters.attributes
    ? Object.keys(filters.attributes)
        .sort()
        .reduce<Record<string, string[]>>((acc, key) => {
          acc[key] = [...filters.attributes![key]].sort();
          return acc;
        }, {})
    : undefined;

  return {
    ...filters,
    attributes:
      sortedAttributes && Object.keys(sortedAttributes).length > 0
        ? sortedAttributes
        : undefined,
  };
}

function catalogQueryKey(filters?: CatalogFilters) {
  return ['catalog', normalizeFilters(filters)];
}

export const useCatalog = (filters?: CatalogFilters) => {
  const queryClient = useQueryClient();

  const stableFilters = useMemo(() => normalizeFilters(filters), [filters]);

  const query = useQuery({
    queryKey: ['catalog', stableFilters],

    queryFn: ({ signal }) => catalogApi.getAll(stableFilters, signal),

    select: (data) => {
      try {
        const mapped = mapCatalogToPreview(data.data);

        return {
          ...data,
          data: mapped,
        };
      } catch (error) {
        console.error('ERROR EN MAPEO:', error);

        return {
          ...data,
          data: [],
        };
      }
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!query.data?.meta.hasNextPage) return;

    const nextPageFilters = {
      ...filters,
      page: (filters?.page ?? 1) + 1,
    };

    queryClient.prefetchQuery({
      queryKey: catalogQueryKey(nextPageFilters),
      queryFn: ({ signal }) => catalogApi.getAll(nextPageFilters, signal),
      staleTime: 1000 * 60 * 5,
    });
  }, [query.data, query.isLoading, query.isError, filters, queryClient]);

  return query;
};

export const useCatalogItem = (id: string) => {
  return useQuery({
    queryKey: ['catalog-item', id],
    queryFn: () => catalogApi.getById(id),

    staleTime: 1000 * 60 * 10,
    enabled: !!id,
  });
};

export const usePrefetchCatalog = () => {
  const qc = useQueryClient();

  return (filters: CatalogFilters) => {
    qc.prefetchQuery({
      queryKey: catalogQueryKey(filters),
      queryFn: () => catalogApi.getAll(filters),
      staleTime: 1000 * 60 * 5,
    });
  };
};
