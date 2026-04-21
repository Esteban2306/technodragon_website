export const queryKeys = {
  products: (filters?: unknown) => ['products', filters],
  product: (id: string) => ['product', id],

  brands: (params?: unknown) => ['brands', params],
  brand: (id: string) => ['brand', id],

  categories: () => ['categories'],
  category: (id: string) => ['category', id],
};