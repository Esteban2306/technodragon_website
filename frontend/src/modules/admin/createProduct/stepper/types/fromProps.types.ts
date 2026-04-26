import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export type Classification = {
  brand: string;
  category: string;
};

export type FormType = {
  classification: Classification;
};

export type CreateProductForm = {
  name: string;
  description: string;

  classification: {
    brandId: string;     
    categoryId: string;  
  };

  images: {
    main: string;
    gallery: string[];
  };

  variants: CreateVariantForm[];
};

export type CreateVariantForm = {
  id?: string;
  sku: string;
  price: number;
  stock: number;
  condition: ProductCondition;

  attributes: {
    name: string;
    value: string;
  }[];

  isActive: boolean;
};

export type Props = {
  form: CreateProductForm;
  setForm: React.Dispatch<React.SetStateAction<CreateProductForm>>;
};