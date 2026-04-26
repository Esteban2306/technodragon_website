export type Brand = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

export type CreateBrandPayload = {
  name: string;
  slug: string;
  logo?: string
  isActive: boolean;
};

export type UpdateBrandPayload = {
  name?: string;
  slug?: string;
};