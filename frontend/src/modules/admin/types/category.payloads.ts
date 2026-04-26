export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
};

export type CreateCategoryPayload = {
  name: string;
  slug: string;
  parentId?: string;
};

export type UpdateCategoryPayload = {
  name?: string;
  slug?: string;
  parentId?: string ;
};